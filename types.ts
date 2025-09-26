export enum AppState {
    Initial,
    Generating,
    Generated,
    Error,
}

export interface GeneratedContent {
    italianArticle: string;
    englishArticle: string;
    seoTitles: string[];
    italianSeoKeywords: string;
    englishSeoKeywords: string;
}