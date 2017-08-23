  const readline = require('readline')             //reading of a stream (such as STDIN) one line at a time
  const fs = require('fs')                         //including the File System module
  const rl = readline.createInterface({
   input: fs.createReadStream('../csv/India2011.csv','utf-8')  //input csv file to be read line by line
  })
  let count =0,count1 =0,li_mal_Sw =0,li_fem_Sw =0,ill_mal_Sw =0,ill_fem_Sw = 0;
  let li_mal_In =0,li_fem_In =0,ill_mal_In =0,ill_fem_In =0,tot_mal_In =0,tot_fem_In = 0;
  let state =[],li_per =[],ill_per =[],val =[],val1 =[],val2 =[],val3 =[];  //creating empty arrays
  let IndiaLiteracy =[],SevenStateLiteracy =[],statewiseLiteracy = [];  //empty array for 1,2 and 3rd json

  rl.on('line', (line) => {                        //reading data line by line
  	count++;
    if(count!=1) {                                 //heading(first) line is ignored present in csv file
    	line.split('\n')                             
      let arr = line.split(',');                   //spliting line and creating array on basis of ,(comma)
      if(arr[4]=="Total" && arr[5]=="All ages") {  //matching condition for execution
        li_mal_In+= parseInt(arr[13]);             //pushing and adding literate male in li_mal_In
        li_fem_In+=parseInt(arr[14]);              //pushing and adding literate female in li_fem_In
        ill_mal_In+=parseInt(arr[10]);             //pushing and adding illiterate male in ill_mal_In
        ill_fem_In+=parseInt(arr[11]);             //pushing and adding illiterate female in ill_fem_In
        tot_mal_In+=parseInt(arr[7]);              //pushing and adding male in tot_mal_In 
        tot_fem_In+=parseInt(arr[8]);              //pushing and adding female in tot_fem_In 
        state.push(arr[3]);                        //pushing state Name in state array
        li_per.push(parseInt(arr[12]));            //pushing literate person in li_per array
        ill_per.push(parseInt(arr[9]));            //pushing illiterate person in ill_per array
        if(arr[1]==12 || arr[1]==13 || arr[1]==14 || arr[1]==15 || arr[1]==16 || arr[1]==17 || arr[1]==18) {  //matching statecode
          li_mal_Sw+=parseInt(arr[13]);            //pushing and adding literate male in li_mal_Sw statewise
          li_fem_Sw+=parseInt(arr[14]);            //pushing and adding literate female in li_fem_Sw statewise
          ill_mal_Sw+=parseInt(arr[10]);           //pushing and adding illiterate male in ill_mal_Sw statewise
          ill_fem_Sw+=parseInt(arr[11]);           //pushing and adding illiterate female in ill_fem_Sw statewise
        }
      }
    }
  })
  .on('close', () => {   			                     //execute after reading csv file line by line
	  val.push(					                             //providing data to 1st JSON
	  	{ "value": li_mal_In,"Gender" : "Male"},
	  	{ "value": li_fem_In,"Gender" : "Female"})  
	  val1.push(
	  	{ "value": ill_mal_In,"Gender" : "Male"},
	  	{ "value": ill_fem_In,"Gender" : "Female"})
    IndiaLiteracy.push(    		   	                 //pushing data in 1st JSON
    	{ "category" : "Literate","values": val.map((i)=>i)},
    	{ "category" : "Illiterate","values": val1.map((i)=>i)})
    val2.push(				                            //providing data to 2nd JSON
    	{ "value": li_mal_Sw,"Gender" : "Male"},
    	{ "value": li_fem_Sw,"Gender" : "Female"})  
    val3.push(
    	{ "value": ill_mal_Sw,"Gender" : "Male"},
    	{ "value": ill_fem_Sw,"Gender" : "Female"})  
    SevenStateLiteracy.push(                       //pushing data in 2nd JSON
    	{ "category" : "Literate","values": val2.map((i)=>i)},
    	{ "category" : "Illiterate","values": val3.map((i)=>i)})  
    state.map((l) => {                             //high-order function map is used for creating 3rd JSON
      statewiseLiteracy.push({                     //pushing data one by one into array creating 3rd JSON
      	"StateName": l,
      	"LiteratePersons" : li_per[count1],
      	"IlliteratePersons" : ill_per[count1]
      })
      count1++;
    })
    fs.createWriteStream('../JSON/IndiaLiteracy.json').write(JSON.stringify(IndiaLiteracy,null,2));   //writing in 1st JSON as output
    fs.createWriteStream('../JSON/SevenStateLiteracy.json').write(JSON.stringify(SevenStateLiteracy,null,2));  //writing in 2nd JSON as output
    fs.createWriteStream('../JSON/statewiseLiteracy.json').write(JSON.stringify(statewiseLiteracy,null,2));    //writing in 3rd JSON as output
  });
