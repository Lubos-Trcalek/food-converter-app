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
      'hovädzia pečeň': 0.6,
      'hovädzie mäso': 0.7,
      'hydinová pečeň': 0.65,
      'kuracie mäso bez kože': 0.75,
      'kuracie srdcia': 0.725,
      'kuracie žalúdky': 0.725,
      'mäso dusené': 0.65,
      'mäso mleté restované': 0.6,
      'mäso na nudličky': 0.7,
      'mäso pečené': 0.6,
      'morčacie mäso bez koze': 0.75,
      'šunka s min. 95% masa': 0.75,
      'telacie mäso': 0.7,
      zverina: 0.7,
    },
  },
  fish: {
    label: {en: 'Fish', sk: 'Ryby'},
    items: {
      krevety: 0.75,
      losos: 0.8,
      pangasius: 0.8,
      pstruh: 0.85,
      ryba: 0.9,
      treska: 0.8,
    },
  },
  sides: {
    label: {en: 'Sides', sk: 'Prílohy'},
    items: {
      bulgur: 2.8,
      cestoviny: 2.3,
      krúpy: 2.8,
      kuskus: 3.0,
      pohánka: 2.8,
      quinoa: 2.75,
      ryža: 2.5,
      strukoviny: 2.5,
      'Zemiaky / batáty varené': 1.0,
      'zemiakové gnocchi': 1.1,
      'zemiakové hranolky pečené v trúbe': 0.6,
      'zemiaky / batáty pečené (na plátky alebo mesiačiky)': 0.6,
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
    title: 'Konvertor hmotnosti jedla',
    rawLabel: 'Hmotnosť surového jedla (gramy)',
    foodType: 'Typ jedla',
    convert: 'Prepočítať',
    result: 'Hmotnosť po uvarení',
  },
};

export default function FoodConverter() {
  const [language] = useState<keyof typeof translations>('sk');
  const [rawWeight, setRawWeight] = useState('');
  const [foodType, setFoodType] = useState('hydinová pečeň');
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
      const cooked = Number(rawWeight) * rate;
      setCookedWeight(cooked.toFixed(1));
    }
  };

  return (
    <div className="container flex flex-col justify-center items-center min-h-screen min-w-screen bg-white text-slate-800 font-mono px-4">
      {/* <select
        value={language}
        onChange={e => setLanguage(e.target.value as 'en' | 'sk')}
        className="border-2 border-black p-2">
        <option value="en">English</option>
        <option value="sk">Slovenčina</option>
      </select> */}

      {/* title */}
      <div>
        <h1 className="text-4xl font-bold pb-4 text-center text-slate-800 font-sans">{t.title}</h1>
      </div>

      {/* Card converter */}
      <Card className="max-w-lg border-2 border-zinc-800 w-full drop-shadow-2xl ">
        <CardContent className="px-10 py-8">
          <form
            onSubmit={e => {
              e.preventDefault(); // prevent page reload
              handleConvert();
            }}>
            <div className="mb-6">
              <Label htmlFor="food" className="mb-2">
                {t.foodType}
              </Label>
              <select
                id="food"
                value={foodType}
                onChange={e => {
                  setFoodType(e.target.value);
                  setCookedWeight(null);
                  setRawWeight('');
                }}
                className="border-2 border-black px-2 w-full text-lg h-14">
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

            <div className="mb-8">
              <Label htmlFor="weight" className="mb-2">
                {t.rawLabel}
              </Label>
              <Input
                id="weight"
                type="number"
                min="1"
                inputMode="numeric"
                value={rawWeight}
                onChange={e => {
                  const val = e.target.value;
                  if (/^\d*$/.test(val)) {
                    setRawWeight(val);
                  }
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.currentTarget.blur(); // this will hide the keyboard on iOS
                    handleConvert(); // trigger conversion on Enter as well
                  }
                }}
                className="border-2 border-black  h-14 rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:border-green-200"
              />
            </div>

            <Button
              type="submit"
              className=" border-2 border-black text-slate-50 bg-emerald-700 w-full text-xl uppercase font-bold h-16 rounded-md transition-colors duration-200 ease-in-out hover:cursor-pointer hover:bg-emerald-600">
              {t.convert}
            </Button>
          </form>

          {cookedWeight && (
            <div className="border border-slate-200 rounded-sm mt-6 text-slate-700 bg-slate-100 p-4">
              {/* <hr className="my-6 h-0.5 bg-slate-300" /> */}
              <span className="text-base">{t.result}:</span>
              <span className="ml-1 text-2xl font-bold text-slate-900">{cookedWeight}g</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
