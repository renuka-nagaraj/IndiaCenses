 //setting the margin
 var margin = {
         top: 100
         , right: 30
         , bottom: 140
         , left: 100
     }
     , width = 1500 - margin.left - margin.right
     , height = 600 - margin.top - margin.bottom;
 //Setting Scale for both x and y axis
 var x = d3.scale.ordinal().rangeRoundBands([0, width], .2);
 var y = d3.scale.linear().range([height, 0]);
 var xAxis = d3.svg.axis().scale(x).orient("bottom");
 var yAxis = d3.svg.axis().scale(y).orient("left");
 var tip = d3.tip().attr('class', 'd3-tip').offset([-10, 0]).html(function (d) {
     return "<strong>Population:</strong> <span style='color:red'>" + d.LiteratePerson + "</span>";
 });
 //Appending svg to body
 var svg = d3.select("body").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 svg.call(tip);
 //Reading json file
 d3.json("output/age.json", function (error, data) {
     x.domain(data.map(function (d) {
         return d.AgeGroup;
     }));
     y.domain([0, d3.max(data, function (d) {
         return d.LiteratePerson;
     })]);
     //Appending group for x axis
     svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis).selectAll("text").style("text-anchor", "end").attr("dx", "-.8em").attr("dy", "-.60em").attr("transform", "rotate(-65)").style("font-size", "15px");
     //Text for x-axis
     svg.append("text").attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")").style("text-anchor", "middle").style("font-size", "20px").text("Age Group");
     //Appending group for y axis
     svg.append("g").attr("class", "y axis").call(yAxis);
     //Text for y-axis
     svg.append("text").attr("transform", "rotate(-90)").attr("y", 10 - margin.left).attr("x", -200 - (height / 2)).attr("dy", "2em").style("text-anchor", "end").style("font-size", "20px").text("Total Persons");
     //Bar Dimensions
     svg.selectAll(".bar").data(data).enter().append("rect").attr("class", "bar").attr("x", function (d) {
         return x(d.AgeGroup);
     }).attr("width", x.rangeBand()).attr("y", function (d) {
         return y(d.LiteratePerson);
     }).attr("height", function (d) {
         return height - y(d.LiteratePerson);
     }).on('mouseover', tip.show).on('mouseout', tip.hide)
 });

 function foreach(d) {
     d.LiteratePerson = +d.LiteratePerson;
     return d;
 }