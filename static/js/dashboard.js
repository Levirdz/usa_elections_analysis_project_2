
//First, checking if I am able to read the data
d3.json("/api/states/").then((data) => {
  console.log("This is the complete file information")
  console.log(data);
  console.log(data[0]);
  var state_list = [];
  for (var i = 0; i < data.length; i++) {
  // Add each state to a list
  var current = data[i]["state"];
         
      if (i === data.length-1){
          state_list.push(current);
       }   
      else
       {  if (current != data[i+1]["state"]) {
          state_list.push(current);
          }
       }
  };
  //asigna los valores de los estados para seleccionarlos
  var option = d3.select("#selDataset");
  var sampleName= state_list;
  sampleName.forEach((sample)=> {
    option.append("option").text(sample).property("value",sample);
  });
});    

function tableInfo(numID){
  d3.json("/api/demographics/").then((data) => {

          //parse information
      data.forEach(function(dato) {
      dato["_votes"] = +dato["_votes"];
      dato["population"] = +dato["population"];
      dato["percentage of voters"] = +dato["percentage of voters"];
      dato[" per_population_18"] = +dato[" per_population_18"];
      dato["per_population_mal_18"] = +dato["per_population_mal_18"];
      dato["per_population_fem_18"] = +dato["per_population_fem_18"];
      dato["per_poverty_rate"] = +dato["per_poverty_rate"];
      dato["per_pop_white"] = +dato["per_pop_white"];
      dato["per_pop_black_afr_american"] = +dato["per_pop_black_afr_american"];
      dato["per_pop_american_indian_alaska"] = +dato["per_pop_american_indian_alaska"];
      dato["per_pop_asian"] = +dato["per_pop_asian"];
      dato["per_pop_native_hawaiian_pacific_islands"] = +dato["per_pop_native_hawaiian_pacific_islands"];
      });
     
     var selectedInfo= data.filter(datos => datos['state'] == numID);
    console.log(selectedInfo);
    console.log(selectedInfo[0]["population"]);
     //select the Table from the HTML file
     var TABLA =d3.select("#sample-metadata");
     // clear the existing output
     TABLA.html("");
     TABLA.append("h6").text(`Population: ${selectedInfo[0]["population"]}`);
     TABLA.append("h6").text(`Male 18+: ${selectedInfo[0]["per_population_mal_18"]}`);
     TABLA.append("h6").text(`Female 18+: ${selectedInfo[0]["per_population_fem_18"]}`);
     TABLA.append("h6").text(`Poverty rate: ${selectedInfo[0]["per_poverty_rate"]}`);


     });
  };
 
function chartInfo(numID){
    d3.json(`/api/county/${numID}`).then((data) => {
    //parse votes
;


})};

//grafica por candidato
function barChart(numID){
  d3.json("/api/demographics/").then((data) => {
            //parse information
        data.forEach(function(dato) {
        dato["per_pop_white"] = +dato["per_pop_white"];
        dato["per_pop_black_afr_american"] = +dato["per_pop_black_afr_american"];
        dato["per_pop_american_indian_alaska"] = +dato["per_pop_american_indian_alaska"];
        dato["per_pop_asian"] = +dato["per_pop_asian"];
        dato["per_pop_native_hawaiian_pacific_islands"] = +dato["per_pop_native_hawaiian_pacific_islands"];
        });
       
       var selectedInfo= data.filter(datos => datos['state'] == numID);

    var white = selectedInfo[0]["per_pop_white"];
    var black = selectedInfo[0]["per_pop_black_afr_american"];
    var indian = selectedInfo[0]["per_pop_american_indian_alaska"];
    var asian = selectedInfo[0]["per_pop_asian"];
    var hawaii = selectedInfo[0]["per_pop_native_hawaiian_pacific_islands"];

    var trace1 = {
      x: ['White', 'Black/afro', 'Indian/Alaska', 'Asian', 'Native Hawaiian'],
      y: [white, black, indian, asian, hawaii],
      type: 'bar',
      marker: {
        color: 'rgb(142,124,195)'
      }
    };

    var data3 = [trace1];

    var barLayout = {
      title: 'Race Distribution',
      font:{
      family: 'Raleway, sans-serif'
     },
      showlegend: false,
      xaxis: {
      tickangle: -45
      },
      yaxis: {
        zeroline: false,
        gridwidth: 2
      },
      bargap :0.05
    };

Plotly.newPlot('barchart', data3, barLayout);

});//estos son los iniciales

}



function gaugeChart(numID){
  d3.json("/api/demographics/").then((data) => {
            //parse information
        data.forEach(function(dato) {
        dato["per_poverty_rate"] = +dato["per_poverty_rate"];
        });
       
       var selectedInfo= data.filter(datos => datos['state'] == numID);

    var meta = selectedInfo[0]["per_poverty_rate"];
    var data1 = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: meta,
            title: { text: "Poverty Rate" },
            type: "indicator",
            mode: "gauge+number",
            gauge: { axis: { range: [null, 20] },
            bar:{color: "orange"},
               steps: [
                { range: [0, 5], color: "rgba(183, 205, 143, 1)"},
                { range: [5, 10], color: "rgba(229, 232, 176, 1)"},
                { range: [10, 15], color: "rgba(233, 230, 201, 1)"},
                { range: [15, 20], color: "rgba(244, 241, 228, 1)"}
              ]}
        }
    ];
    
    var gaugeLayout = { width: 500, height: 400};
    Plotly.newPlot("gauge", data1, gaugeLayout);



});//estos son los iniciales

}

function pieChart(numID){
  d3.json("/api/demographics/").then((data) => {
            //parse information
        data.forEach(function(dato) {
        dato["per_population_mal_18"] = +dato["per_population_mal_18"];
        dato["per_population_fem_18"] = +dato["per_population_fem_18"];
        });
       
       var selectedInfo= data.filter(datos => datos['state'] == numID);

    var male = selectedInfo[0]["per_population_mal_18"];
    var female = selectedInfo[0]["per_population_fem_18"];
    var data2 = [{
      values: [male, female],
      title: { text: "Gender Distribution" },
      labels: ['Male rate', 'Female rate'],
      type: 'pie'
    }];

    var pieLayout = {
      height: 500,
      width: 400
    };

Plotly.newPlot("pie", data2, pieLayout);

});//estos son los iniciales

}

function chartInfo2(numID){
  d3.json(`/api/county/${numID}`).then((data) => {
  //parse votes
  data.forEach(function(dato) {
  dato["total_votes"] = +dato["total_votes"];
  });
// on the csv, look for the state selected list
var selectedInfo= data.filter(datos => datos['state'] == numID);
//assign the dictionary selected to result, and then obtain the dictionaries value.
console.log("este es el selectedinfo para la grafica x candidatos");
console.log(selectedInfo);
//crear el listado de los candidatos
var candidate_info = [];
for (var i = 0; i < selectedInfo.length; i++) {
  // Add each candidate to a list
  var current = selectedInfo[i]["candidate"];
  //console.log(current);       
      var total = 0;
      if (candidate_info.includes(current)){
          console.log(" no se agrega");
          // console.log(data[i]["state"]);
          //candidate_info.push(current);
      } 
      else
       { candidate_info.push(current);
          }
  };
  console.log("informacion de la lista candidatos para graf x cand");   
  console.log(candidate_info);
 var votes=[];
 var total = 0;
 var j=0;
 for(var j=0; j< candidate_info.length; j++){
  total = 0;
    for (var i=0; i < selectedInfo.length; i++){
      var current = selectedInfo[i]["candidate"];
      if ( current === candidate_info[j]){
        //  console.log("este es selected" ,selectedInfo[i]["county"]);
        //  console.log("este es el county info",candidate_info[j]);
          total += selectedInfo[i]["total_votes"];
      };
     };
     votes[j]=total;
 console.log("array votes");   
     console.log(votes);
  etiquetas={}
  etiquetas["candidate"]= candidate_info;
  etiquetas["votos"]= votes;
 };
 console.log("este es el diccionario etiquetas pra la graf x cand");
 console.log(etiquetas);
 var ids = etiquetas.candidate;
 var labels = etiquetas.candidate;
 var values = etiquetas.votos;
var minimo =Math.min(values);
console.log(minimo);
var maximo = Math.max(values);
console.log(maximo);
// Bar chart
var trace1 = 
{
x:[ids[0], ids[1]],
y:[values[0], values[1]],
mode: 'markers', 
type:"bar",
text: ids,
};
var data4 = [trace1];
var layout = {
  height: 400,
  width: 400,
xaxis:{
  type:'category',
  title: "Candidates",
},
yaxis:{
  autorange:true,
  title: "total votes",
},
title: "Votes per candidate" ,
//margin: { t:25, 1:150},
};
Plotly.newPlot("winnervotes",data4,layout);
})};

function optionChanged(newID) {
  chartInfo2(newID);
  chartInfo(newID);
  barChart(newID);
  tableInfo(newID);
  gaugeChart(newID);
  pieChart(newID);
  presidentChange(newID);
  }








