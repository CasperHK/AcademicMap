export const SUPPORTED_LOCALES = ["en", "zh-HK"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export function parseLocale(value: string | undefined): Locale {
  if (value === "zh-HK") {
    return "zh-HK";
  }

  return "en";
}

export const UI_COPY: Record<
  Locale,
  {
    title: string;
    subtitle: string;
    loading: string;
    selected: string;
    viewDetails: string;
    langLabel: string;
    enLabel: string;
    zhHkLabel: string;
    intro: string;
    relatedAcademics: string;
    topUniversities: string;
    firstLevelGraph: string;
    notFound: string;
    backToMap: string;
    academicCode: string;
    relation: string;
    directionIncoming: string;
    directionOutgoing: string;
    noRankings: string;
    noRelated: string;
    university: string;
    country: string;
    typeField: string;
    typeMajor: string;
    typeResearch: string;
  }
> = {
  en: {
    title: "Academic Map",
    subtitle: "Academic System Relationship Map",
    loading: "Loading map...",
    selected: "Selected",
    viewDetails: "View details",
    langLabel: "Language",
    enLabel: "EN",
    zhHkLabel: "zh-HK",
    intro: "Introduction",
    relatedAcademics: "Related academics",
    topUniversities: "Top universities in this subject",
    firstLevelGraph: "Direct first-level academic graph",
    notFound: "Academic subject not found.",
    backToMap: "Back to map",
    academicCode: "Academic code",
    relation: "Relation",
    directionIncoming: "Related from",
    directionOutgoing: "Leads to",
    noRankings: "No university ranking data yet.",
    noRelated: "No directly related academics found.",
    university: "University",
    country: "Country",
    typeField: "Field",
    typeMajor: "Major",
    typeResearch: "Research",
  },
  "zh-HK": {
    title: "學術地圖",
    subtitle: "學術體系關係圖",
    loading: "正在載入地圖...",
    selected: "已選",
    viewDetails: "查看詳情",
    langLabel: "語言",
    enLabel: "英文",
    zhHkLabel: "繁體中文",
    intro: "學科簡介",
    relatedAcademics: "相關學科",
    topUniversities: "此學科知名大學排名",
    firstLevelGraph: "直接第一層相關學科圖",
    notFound: "找不到該學科。",
    backToMap: "返回地圖",
    academicCode: "學科代碼",
    relation: "關係",
    directionIncoming: "由以下學科關聯而來",
    directionOutgoing: "延伸至",
    noRankings: "暫時未有大學排名資料。",
    noRelated: "暫時未有直接相關學科。",
    university: "大學",
    country: "國家",
    typeField: "學科領域",
    typeMajor: "主修方向",
    typeResearch: "研究方向",
  },
};
