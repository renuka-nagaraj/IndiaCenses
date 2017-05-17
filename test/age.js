//Reading the File
const fs = require('fs');
var readline = require('readline');
const path=require("path");
var flag=true;
var header=[];
var json = [];
var checkRow=["Total"];
var rl = readline.createInterface({
input: fs.createReadStream('final.csv')
});

//Reading the file line by line
rl.on('line',function(line){
    compute(line);
  });

rl.on("close",function()
{
	json.shift();
  var finalJson=[];
for(var age in json)//filterations
{
    var tmp={};
    tmp["AgeGroup"]=json[age][0];
    tmp["LiteratePerson"]=json[age][1];
    finalJson.push(tmp);
}

//Output file path
var outPath = path.join(__dirname, 'json/age.json');
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
       if(row[4]==checkRow[0])
        {
         for(let row_iter = 0; row_iter < header.length; row_iter++)
            if(header[row_iter]=="Age-group")
              tempArray.push(row[row_iter]);
         else if(header[row_iter]=="Literate - Persons")
              tempArray.push(parseInt(row[row_iter]));
        // Add object to list
            if(json.length!=0)
            {
                let check=0;
                let index=-1;
                for(let j=0;j<json.length;j++)
                {
                    if(json[j].includes(tempArray[0])==true)
                    {
                        check=1;
                        index=j;
                        break;
                    }
                }
                if(check==1)
                    json[index][1]=json[index][1]+tempArray[1];
                else
                  json.push(tempArray);
            }
            else
            json.push(tempArray);
      }
    }
  }