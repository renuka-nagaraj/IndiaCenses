//Reading the File
var readline = require('readline');
var fs = require('fs');
var path=require("path");
var flag=true;
var header=[];
var json = [];
var checkRow=["All ages","Total"];
var rl = readline.createInterface({
input: fs.createReadStream('csv/India2011.csv')
});
//Reading File 1
rl.on('line',function(line){
     compute(line);
});
//Closing CSV file
rl.on("close",function()
{
  var rl1 = readline.createInterface({
input: fs.createReadStream('csv/IndiaSC2011.csv')
});
//Reading File 2
rl1.on('line',function(line){
  compute1(line);
  });

rl1.on("close",function(){
var rl2 = readline.createInterface({
input: fs.createReadStream('csv/IndiaST2011.csv')
});
//Reading the file 3
rl2.on('line',function(line){
  compute1(line);
  });

rl2.on("close",function()
{
  var finalJson=[];
  for(var population in json)
  {
      var tmp={};
      tmp["AreaName"]=json[population][0];
      tmp["Males"]=json[population][1];
      tmp["Females"]=json[population][2];
      finalJson.push(tmp);
  }
//Output file path
var outPath = path.join(__dirname, 'json/graduation.json');
// Convert object to string, write json to file
fs.writeFileSync(outPath, JSON.stringify(finalJson), 'utf8',
    function(err){console.log(err);});
});
});
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
        if(row[5]==checkRow[0] && row[4]==checkRow[1])
        {
          for(let row_iter = 0; row_iter < header.length; row_iter++)
         if(header[row_iter]=="Area Name")
           tempArray.push(row[row_iter]);
         else if(header[row_iter]=="Educational level - Graduate & above - Males")
            tempArray.push(parseInt(row[row_iter]));
         else if(header[row_iter]=="Educational level - Graduate & above - Females")
            tempArray.push(parseInt(row[row_iter]));
            json.push(tempArray);
        }
    }
}

function compute1(line)
{
  var tempArray=[];
    row = line.split(",");
    if(row[5]==checkRow[0] && row[4]==checkRow[1])
    {
        for(let row_iter = 0; row_iter < header.length; row_iter++)
         if(header[row_iter]=="Area Name")
           tempArray.push(row[row_iter]);
         else if(header[row_iter]=="Educational level - Graduate & above - Males")
            tempArray.push(parseInt(row[row_iter]));
         else if(header[row_iter]=="Educational level - Graduate & above - Females")
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