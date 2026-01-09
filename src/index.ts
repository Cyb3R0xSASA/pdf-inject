import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { PDFDocument, rgb } from "pdf-lib";
import * as fontkit from 'fontkit'
import rawData from '../data/template.data.json' with { type: 'json' };
import type { TemplateItem } from "./types/index.js";

const data = rawData as TemplateItem[];

import fillText from "./utils/filltext.js";

const baseFont = readFileSync(join(process.cwd(), '/fonts/Cairo-VariableFont_slnt,wght.ttf'));
const pdfDoc = readFileSync(join(process.cwd(), '/templates/temp3.pdf'))


const pdf = await PDFDocument.load(pdfDoc);
pdf.registerFontkit(fontkit);
const font = await pdf.embedFont(baseFont);

const page = pdf.getPage(0);
const form = pdf.getForm();

for (const { id, color, coords, fontHeight, fontSize, maxWidth, text, center } of data) {
    const field = form.getTextField(`Text${id}`);
    field.setText('');
    const colors = rgb(...color);

    fillText({ pdf, field, color: colors, font, fontSize, maxWidth, page, text, coords, center, fontHeight });
}

form.flatten();

const bytes = await pdf.save();
writeFileSync(join(process.cwd(), '/out/temp1.pdf'), bytes);