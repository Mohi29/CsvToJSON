  const readline = require('readline')
  const fs = require('fs')
  const rl = readline.createInterface({
   input: fs.createReadStream('India2011.csv','utf-8')
 })
  let count =0,count1 = 0;
  let value1 =0,value2 =0,value3 =0,value4 =0,value5 =0,value6 =0,value11 =0,value12 =0,value13 =0,value14 = 0;
  let index =[],value21 =[],value22 = [];
  let IndiaLiteracy ={},SevenStateLiteracy ={},statewiseLiteracy = {};

  rl.on('line', (line) => {
    count++;
    if(count!=1) {
      line.split('\n')
      let arr = line.split(',');
      let total=arr[4],age=arr[5],state=arr[3],stateCode=arr[1];
      if(total=="Total" && age=="All ages") {
        value1+= parseInt(arr[13]);
        value2+=parseInt(arr[14]);
        value3+=parseInt(arr[10]);
        value4+=parseInt(arr[11]);
        value5+=parseInt(arr[7]);
        value6+=parseInt(arr[8]);
        index.push(state);
        value21.push(parseInt(arr[12]));
        value22.push(parseInt(arr[9]));
        if(stateCode==12 || stateCode==13 || stateCode==14 || stateCode==15 || stateCode==16 || stateCode==17 || stateCode==18) {
          value11+=parseInt(arr[13]);
          value12+=parseInt(arr[14]);
          value13+=parseInt(arr[10]);
          value14+=parseInt(arr[11]);
        }
      }
    }
  })
  .on('close', () => {
    IndiaLiteracy['INDIA'] = [];
    IndiaLiteracy['INDIA'].push({
     "Total Males" : value5,
     "Literate Male" : value1,
     "Illiterate Male" : value3,
     "Total Females" : value6,
     "Literate Female" : value2,
     "Illiterate Female" : value4
   })
      SevenStateLiteracy["Seven NorthEast State"] = [];
      SevenStateLiteracy["Seven NorthEast State"].push({
       "Literate Male" : value11,
       "Literate Female" : value12,
       "Illiterate Male" : value13,
       "Illiterate Female" : value14
     })
    index.map((l) => {
      count1++;
      statewiseLiteracy[l] = [];
      statewiseLiteracy[l].push({
       "Literate Persons" : value21[count1-1],
       "Illiterate Persons" : value22[count1-1]
     })
        statewiseLiteracy;
    })
    fs.createWriteStream('IndiaLiteracy.json').write(JSON.stringify(IndiaLiteracy,null,2));
    fs.createWriteStream('SevenStateLiteracy.json').write(JSON.stringify(SevenStateLiteracy,null,2));
    fs.createWriteStream('statewiseLiteracy.json').write(JSON.stringify(statewiseLiteracy,null,2));
  });