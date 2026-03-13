import { useContext, useState, useEffect } from 'react'
import { ModelContext } from '/Components/ModelContext.jsx';
import axios from 'axios';
import { LuAlertCircle } from "react-icons/lu";
import useInterface from '/stores/useInterface.jsx';

let counter = 1;
let counterDE = 1;

let stepArray = new Array();
let stepArrayDE = new Array();
let stepRemarksArray = new Array();
let arrayNumber = 0;
let filteredArr = new Array();
let stepRemarks;
let remarksTitle

//Get data from the Workbook
axios.get('https://sheets.googleapis.com/v4/spreadsheets/11ayVTVvDEbOezJJSL6N2_ct-rm7NgKWlpBPqqtvVh5U/values/Workbook?key=AIzaSyCqcO7MQv4dsj76ps3nNJnMwTT8Cvqv-eM')
    .then(response => {

        let ourData = response.data.values;
        let bufferArray = new Array();

        for (const row of ourData) {
            if (counter > 2 && row[1] != '') {
                stepArray.push(bufferArray);
                bufferArray = new Array();
                bufferArray.push(row);
            } else {
                bufferArray.push(row);
            }
            ++counter;
        }

    })
axios.get('https://sheets.googleapis.com/v4/spreadsheets/11ayVTVvDEbOezJJSL6N2_ct-rm7NgKWlpBPqqtvVh5U/values/Workbook-DE?key=AIzaSyCqcO7MQv4dsj76ps3nNJnMwTT8Cvqv-eM')
    .then(response => {

        let ourDataDE = response.data.values;
        let bufferArrayDE = new Array();

        for (const row of ourDataDE) {
            if (counterDE > 2 && row[1] != '') {
                stepArrayDE.push(bufferArrayDE);
                bufferArrayDE = new Array();
                bufferArrayDE.push(row);
            } else {
                bufferArrayDE.push(row);
            }
            ++counterDE;
        }

    })
    

export default function StepRemarks() {

    let { stepCount } = useContext(ModelContext)
    const boxVisibility = useInterface((state) => { return state.isVisible })
    const language = useInterface((state) => { return state.language })

     const [stepRemarksTitleArray, setStepRemarksTitleArray] = useState();

    const isNotVisibleToggle = useInterface((state) => { return state.isNotVisibleToggle })
    const isVisibleToggle = useInterface((state) => { return state.isVisibleToggle })

 useEffect(()=>{
    if (language == 'EN'){
                remarksTitle = "Remarks"
    }
        if (language == 'DE'){
                remarksTitle = "Bemerkungen"     
    }
 },[language])

    useEffect(() => {

        stepRemarks = new Array();
        
if (language == 'EN'){
        //Change list of remarks
        for (const row of stepArray[stepCount + 1]) {
            if (row[10] != '' && row[10] != undefined) {
                filteredArr = new Array();
                filteredArr.push(row[10]);
                stepRemarks.push(filteredArr);
            }
            ++counter;
        };

}

if (language == 'DE'){
        //Change list of remarks
        for (const row of stepArrayDE[stepCount + 1]) {
            if (row[10] != '' && row[10] != undefined) {
                filteredArr = new Array();
                filteredArr.push(row[10]);
                stepRemarks.push(filteredArr);
            }
            ++counterDE;
        };
        
}

    }, [stepCount])

        useEffect(() => {
        let tempArray = [];

       // if (stepRemarks != undefined) {
             
            //setStepRemarksTitleArray(tempArray)
            if (stepRemarks.length === 0) {
                isNotVisibleToggle()
            }
            else {
                isVisibleToggle()
            }
       // }
    }, [stepCount])

    return <>
        {stepRemarks ? <div>
            <div id='RemarksTitle' style={{ alignContent: 'baseline', visibility: `${boxVisibility}` }} >
                <h3> <LuAlertCircle /> {remarksTitle}</h3> <br />
            </div>
            <ul>
                {stepRemarks.map((name, index) => <li key={index}> {name}</li>)}

            </ul>
        </div> : null}
    </>


}