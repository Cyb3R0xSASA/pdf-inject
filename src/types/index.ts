import type { PDFFont, PDFDocument, PDFPage, PDFField, RGB, PDFAcroField } from "pdf-lib";

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
    link?: string;
}

export interface IRemoveBG {
    field: PDFField;
    pdf: PDFDocument;
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
    link?: string;
    dir?: 'rtl' | 'ltr'
}