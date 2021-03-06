import { Component, OnInit, ViewChild } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Angular7AppReadCSV';
  isDataLoaded = false;
  isDataProcessed = false;

  public header_array: any[] = [];
  public data_array: any[] = [];

  @ViewChild('csvReader') csvReader: any;

  uploadListener($event: any): void {
    this.isDataLoaded = false;
    this.isDataProcessed = false;

    let files = $event.srcElement.files;

    if (this.isValidCSVFile(files[0])) {
      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        this.header_array = this.getHeaderArray(csvRecordsArray);
        this.data_array = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, this.header_array);
        this.isDataLoaded = true
      };

      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };

    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerArray: any) {
    let csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
      let obj_data: any = new Object()
      if (curruntRecord.length == headerArray.length) {
        for (let j = 0; j < headerArray.length; j++) {
          obj_data[headerArray[j]] = curruntRecord[j].trim();
        }
        csvArr.push(obj_data);
      }
    }
    return csvArr;
  }

  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset() {
    this.csvReader.nativeElement.value = "";
    this.data_array = [];
  }

  ngOnInit() {

  }

  Check_CSV(header_array: any, data_array: any) {
    let main1 = ["Year", "Population", "Violent", "Property", "Murder", "Forcible_Rape", "Robbery", "Aggravated_assault", "Burglary", "Larceny_Theft", "Vehicle_Theft"]
    let main2 = ["age", "occupation"]
    let main3 = ["Team", "Yellow Cards", "Red Cards"]


    if (this.check_CSV_Header(header_array, main1)) {

      let res_Year = []
      let data = data_array;
      let sum_Array_Violent = [];
      let sum_Array_Property = [];
      let sum_Array_Murder = [];
      let sum_Array_Forcible_Rape = [];
      let sum_Array_Robbery = [];
      let sum_Array_Aggravated_assault = [];
      let sum_Array_Burglary = [];
      let sum_Array_Larceny_Theft = []
      let sum_Array_Vehicle_Theft = []
      for (let i = 0; i < data.length; i++) {

        if (i == 0) {
          res_Year.push(data[i]['Year'])
        }
        if (data[i]['Year'] % 10 == 0) {
          if (res_Year.indexOf(data[i]['Year']) == -1)
            res_Year.push(data[i]['Year'])
        }
      }
      if (res_Year.indexOf(data[data.length - 1]['Year']) == -1) {
        res_Year.push(data[data.length - 1]['Year'])
      }
      let max_Array = []
      for (let i = 1; i < res_Year.length; i++) {
        let max_Population = -1;
        let sum_Violent = 0;
        let sum_Property = 0;
        let sum_Murder = 0;
        let sum_Forcible_Rape = 0;
        let sum_Robbery = 0;
        let sum_Aggravated_assault = 0;
        let sum_Burglary = 0;
        let sum_Larceny_Theft = 0;
        let sum_Vehicle_Theft = 0;

        for (let j = 0; j < data.length; j++) {
          let j_current_Year = data[j]['Year']
          if (i + 1 == res_Year.length) {

            if (data[j]['Year'] <= res_Year[i] && max_Population < data[j]['Population']) {
              max_Population = data[j]['Population']
            }
            if (j_current_Year >= res_Year[i - 1] && j_current_Year <= res_Year[i]) {
              sum_Violent = sum_Violent + parseInt(data[j]['Violent'])
              sum_Property = sum_Property + parseInt(data[j]['Property'])
              sum_Murder = sum_Murder + parseInt(data[j]['Murder'])
              sum_Forcible_Rape = sum_Forcible_Rape + parseInt(data[j]['Forcible_Rape'])
              sum_Robbery = sum_Robbery + parseInt(data[j]['Robbery'])
              sum_Aggravated_assault = sum_Aggravated_assault + parseInt(data[j]['Aggravated_assault'])
              sum_Burglary = sum_Burglary + parseInt(data[j]['Burglary'])
              sum_Larceny_Theft = sum_Larceny_Theft + parseInt(data[j]['Larceny_Theft'])
              sum_Vehicle_Theft = sum_Vehicle_Theft + parseInt(data[j]['Vehicle_Theft'])

            }
          } else {
            if (data[j]['Year'] < res_Year[i] && max_Population < data[j]['Population']) {
              max_Population = data[j]['Population']
            }
            if (j_current_Year >= res_Year[i - 1] && j_current_Year < res_Year[i]) {
              sum_Violent = sum_Violent + parseInt(data[j]['Violent'])
              sum_Property = sum_Property + parseInt(data[j]['Property'])
              sum_Murder = sum_Murder + parseInt(data[j]['Murder'])
              sum_Forcible_Rape = sum_Forcible_Rape + parseInt(data[j]['Forcible_Rape'])
              sum_Robbery = sum_Robbery + parseInt(data[j]['Robbery'])
              sum_Aggravated_assault = sum_Aggravated_assault + parseInt(data[j]['Aggravated_assault'])
              sum_Burglary = sum_Burglary + parseInt(data[j]['Burglary'])
              sum_Larceny_Theft = sum_Larceny_Theft + parseInt(data[j]['Larceny_Theft'])
              sum_Vehicle_Theft = sum_Vehicle_Theft + parseInt(data[j]['Vehicle_Theft'])

            }
          }
        }
        max_Array.push(max_Population)
        sum_Array_Violent.push(sum_Violent)
        sum_Array_Property.push(sum_Property)
        sum_Array_Murder.push(sum_Murder)
        sum_Array_Forcible_Rape.push(sum_Forcible_Rape)
        sum_Array_Robbery.push(sum_Robbery)
        sum_Array_Aggravated_assault.push(sum_Aggravated_assault)
        sum_Array_Burglary.push(sum_Burglary)
        sum_Array_Larceny_Theft.push(sum_Larceny_Theft)
        sum_Array_Vehicle_Theft.push(sum_Vehicle_Theft)
      }
      if (max_Array.length == sum_Array_Violent.length && sum_Array_Violent.length == sum_Array_Property.length &&
        sum_Array_Property.length == sum_Array_Murder.length &&
        sum_Array_Murder.length == sum_Array_Forcible_Rape.length &&
        sum_Array_Forcible_Rape.length == sum_Array_Robbery.length &&
        sum_Array_Robbery.length == sum_Array_Aggravated_assault.length &&
        sum_Array_Aggravated_assault.length == sum_Array_Burglary.length &&
        sum_Array_Burglary.length == sum_Array_Larceny_Theft.length &&
        sum_Array_Larceny_Theft.length == sum_Array_Vehicle_Theft.length &&
        sum_Array_Vehicle_Theft.length <= res_Year.length
      ) {
        let output_Object_Array = []
        for (let i = 0; i < sum_Array_Property.length; i++) {
          let output_Obj: any = new Object()
          output_Obj['Year'] = res_Year[i]
          output_Obj['Population'] = max_Array[i]
          output_Obj['Violent'] = sum_Array_Violent[i]
          output_Obj['Property'] = sum_Array_Property[i]
          output_Obj['Murder'] = sum_Array_Murder[i]
          output_Obj['Forcible_Rape'] = sum_Array_Forcible_Rape[i]
          output_Obj['Robbery'] = sum_Array_Robbery[i]
          output_Obj['Aggravated_assault'] = sum_Array_Aggravated_assault[i]
          output_Obj['Burglary'] = sum_Array_Burglary[i]
          output_Obj['Larceny_Theft'] = sum_Array_Larceny_Theft[i]
          output_Obj['Vehicle_Theft'] = sum_Array_Vehicle_Theft[i]
          output_Object_Array.push(output_Obj)
        }
        this.header_array = main1
        this.data_array = output_Object_Array
      }


    }
    if (this.check_CSV_Header(header_array, main2)) {

      let data_occupation = [];
      for (let i = 0; i <= data_array.length - 1; i++) {
        if (data_occupation.indexOf(data_array[i]["occupation"]) == -1) {
          data_occupation.push(data_array[i]["occupation"])
        }
      };

      let data_occ;
      data_occ = data_occupation.sort()

      let age_max = [];
      let age_min = [];
      for (let i = 0; i <= data_occ.length; i++) {
        let array2: any | string = [];
        for (let j = 0; j < data_array.length - 1; j++) {
          if (data_occ[i] == data_array[j]['occupation']) {
            array2.push(data_array[j]['age']);
          }
        }

        let array2_number = array2.map(Number);
        age_max.push(Math.max(...array2_number));
        age_min.push(Math.min(...array2_number));

      }

      let output_Object_Array = []
      for (let i = 0; i < data_occ.length; i++) {
        let output_Obj: any = new Object()
        output_Obj['occupation'] = data_occ[i]
        output_Obj['min'] = age_min[i]
        output_Obj['max'] = age_max[i]
        output_Object_Array.push(output_Obj)
      }
      this.header_array = ["occupation", "min", "max"];
      this.data_array = output_Object_Array
    }
    if (this.check_CSV_Header(header_array, main3)) {

      data_array.sort(function (a: any, b: any) {
        return a["Red Cards"] - b["Red Cards"] || a["Yellow Cards"] - b["Yellow Cards"] || b["Team"].localeCompare(a["Team"]);
      }).reverse();


      let output_Object_Array = []
      for (let i = 0; i < data_array.length; i++) {
        let output_Obj: any = new Object()
        output_Obj["Team"] = data_array[i]["Team"];
        output_Obj["Yellow Cards"] = data_array[i]["Yellow Cards"];
        output_Obj["Red Cards"] = data_array[i]["Red Cards"];
        output_Object_Array.push(output_Obj)
      }
      this.header_array = main3;
      this.data_array = output_Object_Array
    }
    this.isDataProcessed = true
  }
  check_CSV_Header(header_array: any[], main: any[]) {
    let bool_main = false
    if (header_array.length > 0) {
      for (let i = 0; i < main.length; i++) {
        if (header_array.indexOf(main[i]) != -1) {
          bool_main = true;
        } else {
          bool_main = false;
          break;
        }
      }
    }
    return bool_main
  }

  Download_CSV(data: any) {
    const replacer = (key: any, value: any) => value === null ? '' : value;
    const header = Object.keys(data[0]);
    let csv = data.map((row: { [x: string]: any; }) => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));

    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    var blob = new Blob([csvArray], { type: 'text/csv' })
    saveAs(blob, "myFile.csv");
  }
  isNum(val: any) {
    return !isNaN(val)
  }

}


