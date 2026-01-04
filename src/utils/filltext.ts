import { PDFName, PDFNull } from "pdf-lib";
import type { IFillText, IRemoveBG } from "../types/index.js";
import wrapText from "./wraptext.js";

const removeBG = ({ field, pdf }: IRemoveBG): void => {
    try {
        for (const widget of field.acroField.getWidgets()) {
            widget.dict.set(PDFName.of('MK'), pdf.context.obj({ BG: PDFNull, BC: PDFNull }))
        }
    } catch (e) {
        return;
    }
}

const fillText = ({ pdf, field, text, page, color, fontSize, font, maxWidth, fontHeight = 22, coords, center }: IFillText) => {
    removeBG({ field, pdf });

    for (const widget of field.acroField.getWidgets()) {
        const { x, y } = widget.getRectangle();
        const lines = wrapText({ fontSize, text, font, maxWidth });
        const { width } = page.getSize()

        let height = y;
        let counter = 0;
        for (const line of lines) {
            const textWidth = font.widthOfTextAtSize(line, fontSize);
            const coordX = center ? (width - textWidth) / 2 : coords.x ? x + maxWidth - textWidth + coords.x : x + maxWidth - textWidth;
            const coordY = counter === 0 ? (coords.y ? coords.y + y : y) : (coords.y ? coords.y + height : height);
            console.log(text, coordX, center);

            page.drawText(line, {
                x: coordX,
                y: coordY,
                font,
                size: fontSize,
                color,
            });
            height -= fontHeight;
            counter++;
        }
    }
}

export default fillText;