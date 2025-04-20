'use client';

import React, {useState} from 'react';
import {Card, CardContent} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';

const conversionGroups = {
  meat: {
    label: {en: 'Meat', sk: 'Mäso'},
    items: {
      'mäso na nudličky': 0.7,
      'mäso mleté restované': 0.6,
      'mäso dusené': 0.65,
      'mäso pečené': 0.6,
      'steak medium': 0.8,
      'steak prepečený': 0.75,
    },
  },
  fish: {
    label: {en: 'Fish', sk: 'Ryby'},
    items: {
      ryba: 0.9,
      krevety: 0.75,
    },
  },
  sides: {
    label: {en: 'Sides', sk: 'Prílohy'},
    items: {
      'Zemiaky / batáty varené': 1.0,
      'zemiaky / batáty pečené (na plátky alebo mesiačiky)': 0.6,
      'zemiakové hranolky pečené v trúbe': 0.6,
      'zemiakové gnocchi': 1.1,
      cestoviny: 2.3,
      kuskus: 3.0,
      ryža: 2.5,
      bulgur: 2.8,
      krúpy: 2.8,
      pohánka: 2.8,
      strukoviny: 2.5,
    },
  },
};

const translations = {
  en: {
    title: 'Food Weight Converter',
    rawLabel: 'Raw Food Weight (grams)',
    foodType: 'Food Type',
    convert: 'Convert',
    result: 'Cooked Weight',
  },
  sk: {
    title: 'Konvertor Hmotnosti Jedla',
    rawLabel: 'Hmotnosť surového jedla (gramy)',
    foodType: 'Typ jedla',
    convert: 'Prepočítať',
    result: 'Hmotnosť po uvarení',
  },
};

export default function FoodConverter() {
  const [language] = useState<keyof typeof translations>('sk');
  const [rawWeight, setRawWeight] = useState(100);
  const [foodType, setFoodType] = useState('chicken breast');
  const [cookedWeight, setCookedWeight] = useState<string | null>(null);

  const t = translations[language];

  const handleConvert = () => {
    let rate = null;
    for (const group of Object.values(conversionGroups)) {
      if (foodType in group.items) {
        rate = group.items[foodType as keyof typeof group.items];
        break;
      }
    }
    if (rate !== null) {
      const cooked = rawWeight * rate;
      setCookedWeight(cooked.toFixed(1));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white text-slate-800 font-mono">
      {/* title */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold pb-4 text-center">{t.title}</h1>

        {/* <select
          value={language}
          onChange={e => setLanguage(e.target.value as 'en' | 'sk')}
          className="border-2 border-black p-2">
          <option value="en">English</option>
          <option value="sk">Slovenčina</option>
        </select> */}
      </div>

      <Card className="max-w-lg border-2 border-black w-full">
        <CardContent className="px-6 py-4">
          <div className="mb-6">
            <Label htmlFor="weight" className="mb-2">
              {t.rawLabel}
            </Label>
            <Input
              id="weight"
              type="number"
              min="1"
              value={rawWeight}
              onChange={e => setRawWeight(Number(e.target.value))}
              className="border-2 border-black text-lg tw-w-full h-11 rounded-none"
            />
          </div>

          <div className="mb-8">
            <Label htmlFor="food" className="mb-2">
              {t.foodType}
            </Label>
            <select
              id="food"
              value={foodType}
              onChange={e => setFoodType(e.target.value)}
              className="border-2 border-black p-2 w-full text-lg h-11">
              {Object.entries(conversionGroups).map(([groupKey, group]) => (
                <optgroup key={groupKey} label={group.label[language]}>
                  {Object.entries(group.items).map(([food]) => (
                    <option key={food} value={food}>
                      {food.charAt(0).toUpperCase() + food.slice(1)}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <Button
            onClick={handleConvert}
            className="border-2 border-black bg-gradient-to-r from-emerald-400 to-green-400 hover:from-emerald-300 hover:to-green-500 text-black w-full text-lg  h-11 rounded-none transition-colors duration-500 ease-in-out hover:cursor-pointer">
            {t.convert}
          </Button>

          {/* {cookedWeight && (
            <div className="text-xl font-bold pt-4">
              {t.result}: {cookedWeight} grams
            </div>
          )} */}

          {cookedWeight && (
            <div className="mt-4">
              <span className="text-lg">{t.result}:</span>
              <span className="ml-2 text-2xl font-bold">{cookedWeight} grams</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
