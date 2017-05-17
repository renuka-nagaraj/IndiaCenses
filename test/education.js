//Reading the File
var readline = require('readline');
const fs = require('fs');
var path=require("path");
var flag=true;
var header=[];
var json = [];
var start,end;
var checkRow=["All ages","Total"];
var rl = readline.createInterface({
input: fs.createReadStream('final.csv')
});
//Reading the file line by line
rl.on('line',function(line){
     compute(line);     
});
//Closing CSV file 
rl.on("close",function()
{
    var finalJson=[];
    var x=start;
    for(let iter=0;iter<json[0].length;iter++)
    {
        var tmp={};
        tmp["catogories"]=header[x].substring(20,header[x].length);
        tmp["population"]=json[0][iter];
         finalJson.push(tmp);
         x+=3;
    }
    //Output file path
    var outPath = path.join(__dirname, 'json/education.json');
    // Convert object to string, write json to file
    fs.writeFileSync(outPath, JSON.stringify(finalJson), 'utf8', 
        function(err){console.log(err);});
});
function compute(line)
{
    if(flag)
     {
       header=line.split(",");
       flag=false;
     }
     else
     {
        var tempArray=[]; 
        var row = line.split(",");
         for(var iter = 0; iter < header.length; iter++)
            if(header[iter]=="Educational level - Literate without educational level - Persons")
                start=iter;
         else if(header[iter]=="Educational level - Unclassified - Persons") 
                end=iter;

        if(row[5]==checkRow[0] && row[4]==checkRow[1])
        {
            for(let row_iter = start; row_iter <= end; row_iter+=3)
               tempArray.push(parseInt(row[row_iter]));
        // Add object to list 
            if(json.length!=0)
                for(let j=0;j<tempArray.length;j++)
                    json[0][j]=json[0][j]+tempArray[j];
            else
            json.push(tempArray);
        }
      }
  }