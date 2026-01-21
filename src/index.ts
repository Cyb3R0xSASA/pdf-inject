import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { PDFDocument, rgb } from "pdf-lib";
import * as fontkit from 'fontkit'
import type { IItem, ILesson, IMain } from "./types/index.js";
import fillText, { drawLinkedText } from "./utils/filltext.js";
import { baseData, stages } from "./data/data.js";
import pullData from "./utils/db.js";


const main = async ({ output, grade, subject, data }: IMain): Promise<void> => {
    const baseFont = readFileSync(join(process.cwd(), './src/fonts/Cairo-VariableFont_slnt,wght.ttf'));
    const pdfName = 'temp1.0.0.pdf'
    const pdfDoc = readFileSync(join(process.cwd(), './src/templates/' + pdfName));


    const pdf = await PDFDocument.load(pdfDoc);
    pdf.registerFontkit(fontkit);
    const font = await pdf.embedFont(baseFont);

    const page = pdf.getPage(0);
    const form = pdf.getForm();

    for (const { id, color, coords, fontHeight, fontSize, maxWidth, text, center } of data) {
        const field = form.getTextField(`Text${id <= 6 || pdfName !== 'temp1.1.0.pdf' ? id : id + 1}`);
        field.setText('');
        const colors = rgb(...color);

        fillText({ pdf, field, color: colors, font, fontSize, maxWidth, page, text, coords, center, fontHeight });
        drawLinkedText(
            page,
            pdf,
            " ".repeat(210),
            215,
            4,
            font,
            9,
            'https://ynafs.com',
        );
    }

    form.flatten();

    const bytes = await pdf.save();
    const [gradeOutput, subjectOutPut] = [join(output, grade.trim()), join(output, subject.trim())];
    if (!existsSync(gradeOutput))
        mkdirSync(gradeOutput, { recursive: true });
    writeFileSync(join(gradeOutput, `${subject}-${grade}.pdf`), bytes);

    if (!existsSync(subjectOutPut))
        mkdirSync(subjectOutPut);
    writeFileSync(join(subjectOutPut, `${subject}-${grade}.pdf`), bytes);
};


const run = async () => {
    for (const stage of stages) {
        const grades = await pullData<IItem>('grades', { stage_id: stage.id });
        for (const grade of grades) {
            const terms = await pullData<IItem>('terms', stage.id === 3 && grade.title === 'السنة الأولى المشتركة' ? { track_id: grade.id } : { grade_id: grade._id.toString() })
            for (const term of terms) {
                const subjects = await pullData<IItem>('subjects', { term_id: term._id.toString() })
                for (const subj of subjects) {
                    const lessons = (await pullData<ILesson>('lessons', { subject_id: subj.id, term_id: term.id }))
                    [0]?.weeks.map(week => week.map(lesson => `× ${lesson.unit} ${lesson.lesson ? `- ${lesson.lesson?.replaceAll(')', '').replaceAll('(', '')}` : ''}`))

                    lessons?.push(['اختبارات شفهية وعملية'], ['اختبارات نهائية'])
                    const output = join(process.cwd(), 'src', 'out-pdf')
                    await main({ output, grade: grade.title, subject: subj.title.includes('-') ? (subj.title.split('-')[0] as string) : subj.title, data: baseData({ grade: grade.title, subject: subj.title, lessons: lessons as string[][] }) });
                }
            }
        }
    }
}

await run();