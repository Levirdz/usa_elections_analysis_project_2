
//First, checking if I am able to read the data
d3.csv("president_county_candidate.csv").then((data) => {
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
    d3.csv("presidential_info_demogra.csv").then((data) => {

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
    d3.csv("president_county_candidate.csv").then((data) => {
    //parse votes
    data.forEach(function(dato) {
    dato["total_votes"] = +dato["total_votes"];
    });

// on the csv, look for the state selected list
var selectedInfo= data.filter(datos => datos['state'] == numID);
//assign the dictionary selected to result, and then obtain the dictionaries value.
console.log(selectedInfo)
//crear el listado de los counties
var county_info = [];

for (var i = 0; i < selectedInfo.length; i++) {
    // Add each state to a list
    var current = selectedInfo[i]["county"];
    //console.log(current);       
        var total = 0
        if (i === selectedInfo.length-1){
            // console.log(i);
            // console.log(data[i]["state"]);
            county_info.push(current);
        } 
        else
         {  // console.log("este es el else",i);
            if (current != selectedInfo[i+1]["county"]) {
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
      for (var i=0; i < selectedInfo.length; i++){
        var current = selectedInfo[i]["county"];
        if ( current === county_info[j]){
           console.log("este es selected" ,selectedInfo[i]["county"]);
           console.log("este es el county info",county_info[j]);
            total += selectedInfo[i]["total_votes"];
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
    d3.csv("president_county_candidate.csv").then((data) => {
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
    // Add each state to a list
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




function optionChanged(newID) {
    console.log(newID);
    chartInfo(newID);
    chartInfo2(newID);
    tableInfo(newID);
    // gaugeChart(newID);
    }
   

    







