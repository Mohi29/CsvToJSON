  const readline = require('readline')             //reading of a stream (such as STDIN) one line at a time
  const fs = require('fs')                         //including the File System module
  const rl = readline.createInterface({
   input: fs.createReadStream('India2011.csv','utf-8')  //input csv file to be read line by line
 })
  let count =0,count1 = 0;
  let value1 =0,value2 =0,value3 =0,value4 =0,value5 =0,value6 =0,value11 =0,value12 =0,value13 =0,value14 = 0;
  let index =[],value21 =[],value22 = [];          //creating empty array for 3rd json
  let IndiaLiteracy =[],SevenStateLiteracy =[],statewiseLiteracy = [];  //empty array for 1,2 and 3rd json

  rl.on('line', (line) => {                        //reading data line by line
    count++;
    if(count!=1) {                                 //heading(first) line is ignored present in csv file
      line.split('\n')                             
      let arr = line.split(',');                   //spliting line and creating array on basis of ,(comma)
      if(arr[4]=="Total" && arr[5]=="All ages") {  //matching condition for execution
        value1+= parseInt(arr[13]);                //pushing and adding literate male in value1
        value2+=parseInt(arr[14]);                 //pushing and adding literate female in value2
        value3+=parseInt(arr[10]);                 //pushing and adding illiterate male in value3
        value4+=parseInt(arr[11]);                 //pushing and adding illiterate female in value4
        value5+=parseInt(arr[7]);                  //pushing and adding male in value5 
        value6+=parseInt(arr[8]);                  //pushing and adding female in value6 
        index.push(arr[3]);                        //pushing state Name in index array
        value21.push(parseInt(arr[12]));           //pushing literate person in value21 array
        value22.push(parseInt(arr[9]));            //pushing illiterate person in value22 array
        if(arr[1]==12 || arr[1]==13 || arr[1]==14 || arr[1]==15 || arr[1]==16 || arr[1]==17 || arr[1]==18) {  //matching statecode
          value11+=parseInt(arr[13]);              //pushing and adding literate male in value11 statewise
          value12+=parseInt(arr[14]);              //pushing and adding literate female in value12 statewise
          value13+=parseInt(arr[10]);              //pushing and adding illiterate male in value13 statewise
          value14+=parseInt(arr[11]);              //pushing and adding illiterate female in value14 statewise
        }
      }
    }
  })
  .on('close', () => {                             //execute after reading csv file line by line  
    IndiaLiteracy.push({                           //pushing data into array creating 1st JSON
     "Total Males" : value5,
     "Literate Male" : value1,
     "Illiterate Male" : value3,
     "Total Females" : value6,
     "Literate Female" : value2,
     "Illiterate Female" : value4
   })
    SevenStateLiteracy.push({                      //pushing data into array creating 2nd JSON                          
     "Literate Male" : value11,
     "Literate Female" : value12,
     "Illiterate Male" : value13,
     "Illiterate Female" : value14
   })
    index.map((l) => {                             //high-order function map is used for creating 3rd JSON
      statewiseLiteracy.push({                     //pushing data one by one into array creating 3rd JSON
       "state Name": l,
       "Literate Persons" : value21[count1],
       "Illiterate Persons" : value22[count1]
     })
      count1++;
    })
    fs.createWriteStream('IndiaLiteracy.json').write(JSON.stringify(IndiaLiteracy,null,2));   //writing in 1st JSON as output
    fs.createWriteStream('SevenStateLiteracy.json').write(JSON.stringify(SevenStateLiteracy,null,2));  //writing in 2nd JSON as output
    fs.createWriteStream('statewiseLiteracy.json').write(JSON.stringify(statewiseLiteracy,null,2));    //writing in 3rd JSON as output
  });