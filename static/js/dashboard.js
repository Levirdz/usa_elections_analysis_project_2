
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
       TABLA.append("h6").text(`population: ${selectedInfo[0]["population"]}`);
       TABLA.append("h6").text(`% voters:   ${selectedInfo[0]["percentage of voters"]}`);
       TABLA.append("h6").text(`%_pop 18+:  ${selectedInfo[0][" per_population_18"]}`);
       TABLA.append("h6").text(`% male 18+: ${selectedInfo[0]["per_population_mal_18"]}`);
       TABLA.append("h6").text(`% female 18+: ${selectedInfo[0]["per_population_fem_18"]}`);
       TABLA.append("h6").text(`% poverty : ${selectedInfo[0]["per_poverty_rate"]}`);
       TABLA.append("h6").text(`% race white: ${selectedInfo[0]["per_pop_white"]}`);
       TABLA.append("h6").text(`% race afr-ame: ${selectedInfo[0]["per_pop_black_afr_american"]}`);
       TABLA.append("h6").text(`% ame indian alaska:  ${selectedInfo[0]["per_pop_american_indian_alaska"]}`);
       TABLA.append("h6").text(`% asian: ${selectedInfo[0]["per_pop_asian"]}`);
       TABLA.append("h6").text(`% hawaiian_pacific_islands: ${selectedInfo[0]["per_pop_native_hawaiian_pacific_islands"]}`);


       });
    };
   





function chartInfo(numID){
  console.log("NUMID");
  console.log(numID);
    d3.json(`/api/county/${numID}`).then((data) => {
    //parse votes
    data.forEach(function(dato) {
    dato["total_votes"] = +dato["total_votes"];
    });

// on the csv, look for the state selected list
//var selectedInfo= data.filter(datos => datos['state'] == numID);
//assign the dictionary selected to result, and then obtain the dictionaries value.
// console.log("CHART_INFO")
// console.log(data);
//crear el listado de los counties
var county_info = [];

for (var i = 0; i < data.length; i++) {
    // Add each state to a list
    var current = data[i]["county"];
    console.log(current);       
        var total = 0
        if (i === data.length-1){
            // console.log(i);
            // console.log(data[i]["state"]);
            county_info.push(current);
        } 
        else
         {  // console.log("este es el else",i);
            if (current != data[i+1]["county"]) {
                county_info.push(current);
              
            }
         }
    }
   console.log(county_info)

   var votes=[] 
   var total = 0
   var j=0
   
   for(var j=0; j< county_info.length; j++){
    total = 0;
      for (var i=0; i < data.length; i++){
        var current = data[i]["county"];
        if ( current === county_info[j]){
           console.log("este es selected" ,data[i]["county"]);
           console.log("este es el county info",data[j]);
            total += data[i]["total_votes"];
        };
        
       };
       votes[j]=total;
    console.log(votes);
    etiquetas={}
    etiquetas["condado"]= county_info;
    etiquetas["votos"]= votes;

   };

   
   var ids = etiquetas.condado;
   var labels = county_info;
   var values =votes;

// Bar chart

var dataBar = [
{
 y:ids.slice(0,10).reverse(),
 x:values.slice(0,10).map(votos => `Votes ${votos}` ).reverse(),
 text:labels.slice(0,10).reverse(),
 type:"bar",
 orientation:"h"
}];

var layoutBar = {
title: "Votes per county" ,
margin: { t:25, 1:150}
};

Plotly.newPlot("bar",dataBar,layoutBar);
})};

//grafica por candidato
function chartInfo2(numID){
    d3.json(`/api/county/${numID}`).then((data) => {
    //parse votes
    data.forEach(function(dato) {
    dato["total_votes"] = +dato["total_votes"];
    });

// on the csv, look for the state selected list
var selectedInfo= data.filter(datos => datos['state'] == numID);
//assign the dictionary selected to result, and then obtain the dictionaries value.
console.log(selectedInfo)
//crear el listado de los candidatos
var candidate_info = [];

for (var i = 0; i < selectedInfo.length; i++) {
    // Add each candidate to a list
    var current = selectedInfo[i]["candidate"];
    //console.log(current);       
        var total = 0
        if (i === selectedInfo.length-1){
            // console.log(i);
            // console.log(data[i]["state"]);
            candidate_info.push(current);
        } 
        else
         {  // console.log("este es el else",i);
            if (current != selectedInfo[i+1]["candidate"]) {
                candidate_info.push(current);
            }
         }
    }
   console.log(candidate_info)

   var votes=[] 
   var total = 0
   var j=0
   
   for(var j=0; j< candidate_info.length; j++){
    total = 0;
      for (var i=0; i < selectedInfo.length; i++){
        var current = selectedInfo[i]["candidate"];
        if ( current === candidate_info[j]){
           console.log("este es selected" ,selectedInfo[i]["county"]);
           console.log("este es el county info",candidate_info[j]);
            total += selectedInfo[i]["total_votes"];
        };
        
       };
       votes[j]=total;
    console.log(votes);
    etiquetas={}
    etiquetas["candidate"]= candidate_info;
    etiquetas["votos"]= votes;

   };

   
   var ids = etiquetas.candidate;
   var labels = candidate_info;
   var values =votes;

// Bar chart

var dataBar = [
{
 x:ids.slice(0,10).reverse(),
 y:values.slice(0,10).map(votos => `Votes ${votos}` ).reverse(),
 text:labels.slice(0,10).reverse(),
 type:"bar",
 //orientation:"h"
}];

var layoutBar = {
title: "Votes per candidate" ,
margin: { t:25, 1:150}
};

Plotly.newPlot("gauge",dataBar,layoutBar);
})};


function gaugeChart(numID){
    d3.json(`/api/county/${numID}`).then((data) => {

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
    console.log(selectedInfo[0]["per_poverty_rate"]);
            var washNumber = selectedInfo[0]["per_poverty_rate"]
            console.log("este es el poverty",washNumber);
        var level = parseFloat(washNumber)* 100;


// I obtained the code for the gauge chart from here:
// source: https://community.plotly.com/t/plotly-js-gauge-pie-chart-data-order/8686

    var degrees = 180 - level;
    var radius = 0.5;
    var radians = (degrees * Math.PI) / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);
     console.log("esto vale x", x);
     console.log("esto vale y", y);
    var mainPath = 'M -.0 -0.035 L .0 0.035 L ',
     pathX = String(x),
     space = ' ',
     pathY = String(y),
     pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);

 //create the data variable   
var data = [
    {
      type: "scatter",
      x: [0],
      y: [0],
      marker: { size: 12, color: "850000" },
      showlegend: false,
      name: "Rate",
      text: level,
      hoverinfo: "text+name"
    },
    {
      //values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
        values: [100 / 5, 100 / 5, 100 / 5, 100 / 5, 100 /5, 100 ],
      rotation: 90,
      text: ["20%-25%", "15-20", "10-15", "5-10", "0-5", ""],
      textinfo: "text",
      textposition: "inside",
      marker: {
        colors: [
          "rgba(0, 105, 11, .5)",
          "rgba(10, 120, 22, .5)",
          "rgba(14, 127, 0, .5)",
          "rgba(110, 154, 22, .5)",
          "rgba(170, 202, 42, .5)",
          "rgba(255, 255, 255, 0)",
          //"rgba(202, 209, 95, .5)",
          //"rgba(210, 206, 145, .5)",
          //"rgba(232, 226, 202, .5)",
          //"rgba(240, 230, 215, .5)",
          //"rgba(255, 255, 255, 0)"
        ]
      },
      labels: ["20%-25%", "15-20", "10-15", "5-10", "0-5", ""],
      hoverinfo: "label",
      hole: 0.5,
      type: "pie",
      showlegend: false
    }

  ];


  
 //create the layout variable  
  var layout = {
    
    shapes: [
      {
        type: "path",
        path: path,
        fillcolor: "850000",
        line: {
          color: "850000"
        }
      }
    ],
    title: "<b>Poverty Rate</b> <br> by State",
    height: 500,
    width: 500,
    xaxis: {
      zeroline: false,
      showticklabels: false,
      showgrid: false,
      range: [-1, 1]
    },
    yaxis: {
      zeroline: false,
      showticklabels: false,
      showgrid: false,
      range: [-1, 1]
    }

  };
  
  Plotly.newPlot("bubble", data, layout);
});//estos son los iniciales

}





function optionChanged(newID) {
    console.log(newID);
    chartInfo(newID);
    chartInfo2(newID);
    tableInfo(newID);
    gaugeChart(newID);
    }








