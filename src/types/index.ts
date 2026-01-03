import { PDFFont } from "pdf-lib";

export interface IWrapText {
    text: string;
    font: PDFFont;
    fontSize: number;
    maxWidth: number
}