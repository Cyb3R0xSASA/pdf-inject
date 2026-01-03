import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { PDFDocument, rgb } from "pdf-lib";
import * as fontkit from 'fontkit'
import data from '../data/template.data.json' with {type: 'json'}

import fillText from "./utils/filltext.js";

const baseFont = readFileSync(join(process.cwd(), '/fonts/Cairo-VariableFont_slnt,wght.ttf'));
const pdfDoc = readFileSync(join(process.cwd(), '/templates/temp3.pdf'))


const pdf = await PDFDocument.load(pdfDoc);
pdf.registerFontkit(fontkit);
const font = await pdf.embedFont(baseFont);

const page = pdf.getPage(0);
const form = pdf.getForm();

for (const { id, color, coords, fontHeight, fontSize, maxWidth, text } of data) {
    const field = form.getTextField(`Text${id}`)
    field.setText('');
    const colors = rgb(0, 0, 0);

    fillText({ pdf, field, color: colors, font, fontSize, maxWidth, page, text: `النص رقم: ${id}`, coords });
}

form.flatten();

const bytes = await pdf.save();
writeFileSync(join(process.cwd(), '/out/temp1.pdf'), bytes);