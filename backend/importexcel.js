const Excel = require('exceljs');
const fs = require('fs');

const wb = new Excel.Workbook();
const excelPathAndFileName = './backend/data/flashcards.xlsx';
const jsonPathAndFileName = './js/data/flashcards.json';

wb.xlsx.readFile(excelPathAndFileName).then(() => {
	const flashcards = [];
	const ws = wb.getWorksheet('flashcards');
	for (let row = 2; row <= 1000; row++) {
		const frontCell = `A${row}`;
		const backCell = `B${row}`;
		const front = ws.getCell(frontCell).value;
		const back = ws.getCell(backCell).value;
		if (front === null) {
			break;
		} else {
			flashcards.push({ front, back })
		}
	}
	const jsonText = JSON.stringify(flashcards,null, 2);
	fs.writeFile(jsonPathAndFileName, jsonText, 'utf8', (err) => {
		if (err) {
			console.log('problem writing JSON file');
			console.log(err);
		}
		console.log('JSON file saved');
	} )
});

