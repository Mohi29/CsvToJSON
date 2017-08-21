  const readline = require('readline')
  const fs = require('fs')
  const rl = readline.createInterface({
   input: fs.createReadStream('India2011.csv','utf-8')
 })
  let count = 0;
  let value1=0,value2=0,value3=0,value4=0,value5=0,value6=0;
  let value11=[],value12=[],value13=[],value14=[],value21=[],value22=[];
  let index=[],index1=[];
  let IndiaLiteracy={},SevenStateLiteracy={},statewiseLiteracy={};

  rl.on('line', (line) => {
    count++;
    if(count!=1) {
      line.split('\n')
      let arr = line.split(',');
      let total=arr[4],age=arr[5],state=arr[3],stateCode=arr[1];
      if(total=="Total" && age=="All ages") {
        value1+=parseInt(arr[13]);
        value2+=parseInt(arr[14]);
        value3+=parseInt(arr[10]);
        value4+=parseInt(arr[11]);
        value5+=parseInt(arr[7]);
        value6+=parseInt(arr[8]);
        index.push(state);
        value21.push(arr[12]);
        value22.push(arr[9]);
      }
      if((stateCode==12 || stateCode==13 || stateCode==14 || stateCode==15 || stateCode==16 || stateCode==17 || stateCode==18)
        && (total=="Total" && age=="All ages")) {
      index1.push(state);
      value11.push(arr[13]);
      value12.push(arr[14]);
      value13.push(arr[10]);
      value14.push(arr[11]);
      }
    }
  });

  rl.on('close', () => {
    IndiaLiteracy['INDIA'] = IndiaLiteracy['INDIA'] || []
    IndiaLiteracy['INDIA'].push({
     "Total Males" : value5,
     "Literate Male" : value1,
     "Illiterate Male" : value3,
     "Total Females" : value6,
     "Literate Female" : value2,
     "Illiterate Female" : value4
   })
    for(let i in index1) {
      SevenStateLiteracy[index1[i]] = [];
      SevenStateLiteracy[index1[i]].push({
       "Literate Male" : value11[i],
       "Literate Female" : value12[i],
       "Illiterate Male" : value13[i],
       "Illiterate Female" : value14[i]
     })
    }
    for(let i in index) {
      statewiseLiteracy[index[i]] = [];
      statewiseLiteracy[index[i]].push({
       "Literate Persons" : value21[i],
       "Illiterate Persons" : value22[i]
     })
    }
    fs.createWriteStream('IndiaLiteracy.json').write(JSON.stringify(IndiaLiteracy,null,2));
    fs.createWriteStream('SevenStateLiteracy.json').write(JSON.stringify(SevenStateLiteracy,null,2));
    fs.createWriteStream('statewiseLiteracy.json').write(JSON.stringify(statewiseLiteracy,null,2));
  });