export type TimeOfDay = 'day' | 'sunset' | 'night' | 'rain';

export type ScreenId = 'cabin' | 'laptop' | 'journal' | 'atmosphere' | 'gallery';

export type BeverageType = 'cocoa' | 'matcha' | 'coffee' | 'chai';

export interface BeverageInfo {
  id: BeverageType;
  name: string;
  steamColor: string;
  aromaNote: string;
  temp: string;
  icon: string;
}

export interface TaskItem {
  id: string;
  text: string;
  completed: boolean;
  tag: string;
  createdAt: number;
}

export interface JournalNote {
  id: string;
  title: string;
  content: string;
  category: 'code' | 'thought' | 'scenery' | 'routine';
  updatedAt: number;
}

export interface CodePreset {
  id: string;
  title: string;
  description: string;
  html: string;
  css: string;
  js: string;
}
