export enum MysteryType {
  JOYFUL = 'Gozosos',
  SORROWFUL = 'Dolorosos',
  GLORIOUS = 'Gloriosos',
  LUMINOUS = 'Luminosos'
}

export interface Mystery {
  title: string;
  description: string;
}

export interface DailyContent {
  reflection?: string;
  prayer?: string;
  action?: string;
}

export interface DayPlan {
  day: number;
  title: string;
  theme: string;
  weekTheme: string;
  mysteryType: MysteryType;
  mysteries: Mystery[];
  staticContent?: DailyContent;
}