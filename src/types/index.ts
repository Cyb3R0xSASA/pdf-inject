import type { ObjectId } from "mongodb";
import type { PDFFont, PDFDocument, PDFPage, PDFField, RGB } from "pdf-lib";

export interface IWrapText {
    text: string;
    font: PDFFont;
    fontSize: number;
    maxWidth: number
}

export interface IFillText {
    pdf: PDFDocument;
    field: PDFField;
    text: string | string[];
    page: PDFPage;
    color: RGB;
    fontSize: number;
    maxWidth: number;
    font: PDFFont;
    fontHeight?: number;
    coords: {
        x?: number;
        y?: number;
    }
    center: boolean;
}

export interface IDrawText {
    text: string;
    page: PDFPage;
    color: RGB;
    fontSize: number;
    maxWidth: number;
    font: PDFFont;
    fontHeight?: number;
    coords: {
        x?: number;
        y?: number;
    }
    center: boolean;
    dir?: 'rtl' | 'ltr'
}

export interface IRemoveBG {
    field: PDFField;
    pdf: PDFDocument;
}

export interface ITemplateItem {
    id: number;
    fontSize: number;
    maxWidth: number;
    text: string | string[];
    fontHeight: number;
    color: [number, number, number];
    coords: {
        x: number;
        y: number;
    };
    center: boolean;
}

export interface IStage {
    name: string;
    id: number;
};

export interface IItem {
    _id: ObjectId;
    id: number;
    title: string;
};

export interface IMain {
    output: string;
    grade: string;
    subject: string;
    data: ITemplateItem[]
};

export interface IBaseData {
    school?: string;
    subject?: string;
    grade?: string;
    principle?: string;
    teacher?: string;
    lessons: string[][];
};

export interface ILesson {
    weeks: {
        unit: string;
        lesson: string;
    }[][]
}