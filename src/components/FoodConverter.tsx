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
      'chicken breast': 0.75,
      beef: 0.7,
      pork: 0.65,
    },
  },
  fish: {
    label: {en: 'Fish', sk: 'Ryby'},
    items: {
      salmon: 0.8,
      tuna: 0.85,
    },
  },
  sides: {
    label: {en: 'Sides', sk: 'Prílohy'},
    items: {
      potatoes: 0.9,
      rice: 2.5,
      pasta: 2.3,
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
  const [language, setLanguage] = useState('en');
  const [rawWeight, setRawWeight] = useState(100);
  const [foodType, setFoodType] = useState('chicken breast');
  const [cookedWeight, setCookedWeight] = useState(null);

  const t = translations[language];

  const handleConvert = () => {
    let rate = null;
    for (const group of Object.values(conversionGroups)) {
      if (foodType in group.items) {
        rate = group.items[foodType];
        break;
      }
    }
    if (rate !== null) {
      const cooked = rawWeight * rate;
      setCookedWeight(cooked.toFixed(1));
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-4 font-mono">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold border-b pb-2">{t.title}</h1>
        <select value={language} onChange={e => setLanguage(e.target.value)} className="border-2 border-black p-2">
          <option value="en">English</option>
          <option value="sk">Slovenčina</option>
        </select>
      </div>

      <Card className="max-w-md border-2 border-black">
        <CardContent className="space-y-4 p-6">
          <div>
            <Label htmlFor="weight">{t.rawLabel}</Label>
            <Input
              id="weight"
              type="number"
              min="1"
              value={rawWeight}
              onChange={e => setRawWeight(e.target.value)}
              className="border-2 border-black text-lg"
            />
          </div>

          <div>
            <Label htmlFor="food">{t.foodType}</Label>
            <select
              id="food"
              value={foodType}
              onChange={e => setFoodType(e.target.value)}
              className="border-2 border-black p-2 w-full text-lg">
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
            className="border-2 border-black bg-gray-100 hover:bg-gray-300 text-black w-full text-lg">
            {t.convert}
          </Button>

          {cookedWeight && (
            <div className="text-xl font-bold border-t pt-4 border-black">
              {t.result}: {cookedWeight} grams
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
