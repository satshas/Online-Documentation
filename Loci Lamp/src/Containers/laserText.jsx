import axios from "axios"
import { useState, useEffect, useContext } from "react";
import { ModelContext } from "/Components/ModelContext";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

let filteredArr = new Array();
let tempArray = [];
 let counter = 0;
 let bomCounter = 0;
let laserArray = new Array();
let bomArray = new Array();
let defaultData;

export default function LaserText() {

    const [laserTitle, setLaserTitle] = useState([]);
    const [laserTextArray, setLaserTextArray] = useState([]);
    const [bomTitleArray, setBomTitleArray] = useState([]);
    const [sectionArray, setSectionArray] = useState([])
    let {path, laserTitleArray, setLaserTitleArray, laserMenuCount, setLaserCount, setClickedPath} = useContext(ModelContext)
    const [csvData, setCsvData] = useState([]);

    function parseCSV(csvText) {
    const rows = csvText.split(/\r?\n/); // Split CSV text into rows, handling '\r' characters
    const headers = rows[0].split(','); // Extract headers (assumes the first row is the header row)
setBomTitleArray(headers)
    const data = []; // Initialize an array to store parsed data
   /*  for (let i = 1; i < rows.length; i++) {
        const rowData = rows[i].split(',(?=[^\"])'); // Split the row, handling '\r' characters
        const rowObject = {};
        for (let j = 0; j < headers.length; j++) {
            rowObject[headers[j]] = rowData[j];
        }
        data.push(rowObject);
    }
    return data; */

     const result = [];
  
  // Step 2: Process each row
  for (let i = 1; i < rows.length; i++) {
    // Skip empty rows (optional: adjust based on needs)
    //if (rows[i].trim() === '') continue;

    // Step 3: Extract fields using the CSV regex
    const fields = [];
    const matches = rows[i].match(/"((?:[^"])*)"|([^",\n]+)/g);

    if (matches) {
       const rowObject = {}

      for (const match of matches) {

        // Skip empty matches (from split artifacts)
        if (!match) continue;
        
        let field;
        if (match.startsWith('"')) {
          // Quoted field: remove surrounding quotes and unescape ""
          field = match.slice(1, -1).replace(/""/g, '"');
        } else {
          // Non-quoted field: use as-is (trim optional)
          field = match; // .trim() if you want to remove whitespace
        }
fields.push(field)
        
      }
       for (let j = 0; j < headers.length; j++) {
            rowObject[headers[j]] = fields[j];
        }
        result.push(rowObject);

      
    }
    
    //result.push(fields);
  }
  
  return result;
}

    const fetchData = async () =>{
        try{
            const response = await axios.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vQWud7yHH3g1cAPJvzxsQePnKx0l3GJQWH_PJjGYbjaZ-zfcvUxY3e5tKrE_zElcfdFqLYGLTySNaAl/pub?output=csv')
        const parsedCsvData = parseCSV(response.data);
        setCsvData(parsedCsvData);

        }
        catch (error) {
      console.error("Error fetching data:", error);
    }

    }
    
    

useEffect(() =>{
//Workbook - Laser tab
        axios.get('https://sheets.googleapis.com/v4/spreadsheets/11ayVTVvDEbOezJJSL6N2_ct-rm7NgKWlpBPqqtvVh5U/values/Laser?key=AIzaSyCqcO7MQv4dsj76ps3nNJnMwTT8Cvqv-eM')
            .then(response => {
                let bufferArray = new Array();
                const ourData = response.data.values || [];
                for (const row of ourData) {
                    if (counter > 0 && row[0] != '') {
                        bufferArray = new Array();
                        bufferArray.push(row);
                        laserArray.push(bufferArray);

                    } else {
                        bufferArray.push(row);
                    }
                    ++counter;                    
                }
  let textArray = []
                  let tempSectionArray = []

                const tempLaserTitle = laserArray.reduce((title, arr) => {
                    if (arr[0].includes(`${laserArray[0][0][0]}`)) {
                        const currentTitle = arr[0][1]
                         for (const row of arr){
                            tempSectionArray.push(row)

                            textArray.push(row[2])
                         }
setSectionArray(tempSectionArray)

                        title.push(currentTitle)
                    }

                    return title
                }, [])

                setLaserTitle(tempLaserTitle[0])
                setLaserTextArray(textArray);  
                            })


//BOM
fetchData();
}, [])

//BOM Table 
const columnHelper = createColumnHelper()
const columns = []

for (let i = 0; i < bomTitleArray.length; i++){
columns.push(
  columnHelper.accessor(bomTitleArray[i], {
        id: `${bomTitleArray[i]}`,
    cell: info => info.getValue(),
    header: `${bomTitleArray[i]}`,

  })
  )

}

  const table = useReactTable({
    data: csvData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

//Laser Text
    useEffect(() => {
                let textArray = []
                let tempSectionArray = []
if (path){ 
  let index = laserTitleArray.indexOf(`${path}`)
setLaserCount(index)
}
                                 
                const tempLaserTitle = laserArray.reduce((title, arr, index) => {
                    if (arr[0].includes(`${path}`)) {
                        
                        const currentTitle = arr[0][1]
                         for (const row of arr){
tempSectionArray.push(row)
                            textArray.push(row[2])
                         }
setSectionArray(tempSectionArray)
                        title.push(currentTitle)
                        setLaserTitle(title)
                    }
                    return title
                }, [])

                setLaserTextArray(textArray);  
    }, [path]);

    useEffect(() =>{
setClickedPath(`${laserTitleArray[laserMenuCount]}`)
    }, [laserMenuCount])



    return <>
        <div className="sectionLaser" >
            <ul>
                {sectionArray ? sectionArray.map((name, index) => <li key={index}> 
                                <h1 className='sectionTitle' style={{marginTop : "30px"}}>{name[1] ? `${name[1]}` : null}</h1>
{name[2]} 
{name[3]  ? <img src={name[3]} className="sectionImage"/>: null} 
{name[4]? <a href={name[4]} style={{textDecoration: "none"}} target="blank"><button className="btn" style={{display: "block", margin: "auto", marginTop: "30px", textDecoration: "none"}}>{`${name[5]}`}</button></a>: null}
{name[6]? <iframe src={`${name[6]}`}  className="iFrame" name="myiFrame" allowFullScreen="allowfullscreen"></iframe>: null}
{name[7] && csvData ?   <table className="bomTable">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
    
      </table>:null}
</li>) : null}
            </ul>
        </div>
    </>
}