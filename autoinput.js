const excelToJson = require('convert-excel-to-json');
const JsonRecords = require('json-records');

const jr = new JsonRecords('data.json');

var data = []

const result = excelToJson({
    sourceFile: 'data.xlsx',
    // range :'A128:K128',
    range :'A6:K128',
    sheets : ["Sheet2"],
    header:{
        rows :1
    },
});
 
console.log(result.Sheet2.length);

let mapData = result.Sheet2.map(el => {
    if(el.E){
        let change = el.E
        console.log("asdasda"+el.E);
        el.E = change.replace("/", "-")
    }

    let destruct = {
        NoDefinitif : el.A,
        UnitPengelolah : "Dinas Kearsipan dan Perpuastakaan  Kabupaten Semarang",
        KodeKlasifikasi : el.C,
        TanggalSurat : el.E? el.E : "",

    }
    return destruct
})

console.log(mapData);
// jr.add(result)