// create drawChart function to plot all the plots.
var drawChart = function(x_data, y_data, hoverText, metadata) {   //chart take in four variables.

    //Demographic Info Panel - take in metadata.
    var metadata_panel = d3.select("#sample-metadata");    //select demographic_info panel
    metadata_panel.html("");                               //clears contents inside demographic_info
    Object.entries(metadata).forEach(([key, value]) => {   // for each key and value in metadata
        metadata_panel.append("p").text(`${key}: ${value}`);       //append them to demographic_info as key:value in <p> format.
    });
    //Create Bar Chart - take in x_data,y_data, and hoverText.
    var trace = {                                 
        x: y_data
            .slice(0,10)
            .sort(function(a,b){
                return a-b
            }),
        y: x_data
            .map(d => `OTU ${d}`),
        text: hoverText,
        type: 'bar',
        orientation: 'h'
    };

    var data = [trace];

    Plotly.newPlot('bar', data);
    //Create Bubble Chart - take in x_data,y_data, and hoverText
    var trace2 = {
        x: x_data,
        y: y_data,
        text: hoverText,
        mode: 'markers',
        marker: {
            size: y_data,
            color: x_data
        }
    };

    var data2 = [trace2];

    Plotly.newPlot('bubble', data2);
    


};
// Create Function populateDropdown that append names to dropdown box.
var populateDropdown = function(names) {     //function take in one variable "names".

    var selectTag = d3.select("#selDataset");      //select id selDataset
    var options = selectTag.selectAll('option').data(names);      //select all options and upload data in "names"
    //enter and append each item from names with options id = name
    options.enter()
        .append('option')
        .attr('value', function(d) {
            return d;
        })
        .text(function(d) {
            return d;
        });

};
// Create Function optionChanged for event handler of dropdown box.
var optionChanged = function(newValue) {                   //takes in newValue

    d3.json("data/samples.json").then(function(data) {     //read json data

    sample_new = data["samples"].filter(function(sample) {     //sample_new is created as placeholder

        return sample.id == newValue;                       //newValue is now the id key in sample.

    });
    
    metadata_new = data["metadata"].filter(function(metadata) {   //metadata_new is created as placeholder

        return metadata.id == newValue;                    //newValue is now the id key in metadata.

    });
    
    
    x_data = sample_new[0]["otu_ids"];                    // x_data is updated
    y_data = sample_new[0]["sample_values"];             // y_data is updated
    hoverText = sample_new[0]["otu_labels"];             // hoverText is updated
    
    console.log(x_data);
    console.log(y_data);
    console.log(hoverText);
    
    drawChart(x_data, y_data, hoverText, metadata_new[0]);     //perform drawChart function with updated var.
    });
};
//Initial Display before any event.
d3.json("data/samples.json").then(function(data) {     //read json file

    //Populate dropdown with names
    populateDropdown(data["names"]);                  //populate dropdown

    //Populate the page with the first value, four variables are defined.
    x_data = data["samples"][0]["otu_ids"];
    y_data = data["samples"][0]["sample_values"];
    hoverText = data["samples"][0]["otu_labels"];
    metadata = data["metadata"][0];

    //Draw the chart on load
    drawChart(x_data, y_data, hoverText, metadata);


});