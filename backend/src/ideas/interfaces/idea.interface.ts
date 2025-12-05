export interface Idea {
    title: string;
    description: string;
    stack: string;
    type: IdeaType;
}

export enum IdeaType {
    WebApp = "WebApp",
    MobileApp = "MobileApp",
    Game = "Game",
    Automation = "Automation",
}