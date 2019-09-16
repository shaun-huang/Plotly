// Fetch the JSON data and console log it
d3.json("data/samples.json")
    .then(function(data) {
        console.log(data);
        var list = data.samples; //placeholder for data array
        console.log(list);
        var id = data.names; //placeholder for array of id.
        var info = data.metadata;
        console.log(id);
        d3.select('#selDataset') //select dropdown box using d3.
            .data(id)
            .append("option")
            .text(d => d);
        d3.select('select')
            .selectAll('option')
            .data(id)
            .enter()
            .append('option')
            .attr('value', index => index)
            .text(d => d);
        console.log(list[0]) //test if list comprehension is correct.
        var x_data = list[0].otu_ids;
        var y_data = list[0].sample_values;
        var hover_text = list[0].otu_labels;
        // create trace for bar chart
        var trace = {
            y: x_data
                .map(d => `OTU ${d}`),
            x: y_data
                .slice(0, 10)
                .sort(function(a, b) {
                    return a - b
                }),
            type: 'bar',
            orientation: 'h',
            text: hover_text
        };
        //create the data array for bar chart
        var data = [trace];
        //define the plot layout
        var layout = {};
        //Plot the bar chart to a div tag with id 'bar
        Plotly.newPlot('bar', data, layout);
        // plot trace for bubble chart
        var trace1 = {
            x: x_data,
            y: y_data,
            marker: {
                size: y_data,
                color:x_data
            },
            mode: 'markers'
        };
        var data1 = [trace1];
        //Plot the bubble chart to a div tag with id bubble.
        Plotly.newPlot('bubble', data1);
        //Plot the gauge chart
        var data2 = [{
            domain: {
                x: [0, 1],
                y: [0, 1]
            },
            value: info[0].wfreq,
            title: {
                text: "Belly Button Washing Frequency"
            },
            type: "indicator",
            mode: "gauge+number+delta",
            gauge: {
                axis: {
                    range: [null, 8]
                },
                steps: [{
                        range: [0, 1],
                        color: "white"
                    },
                    {
                        range: [1, 2],
                        color: "lightyellow"
                    },
                    {
                        range: [2, 3],
                        color: "lightyellow"
                    },
                    {
                        range: [3, 4],
                        color: "lightyellow"
                    },
                    {
                        range: [5, 6],
                        color: "yellow"
                    },
                    {
                        range: [6, 7],
                        color: "green"
                    },
                    {
                        range: [7, 8],
                        color: "green"
                    },
                ],
                threshold: {
                    line: {
                        color: "red",
                        width: 4
                    },
                    thickness: 0.75,
                    value: 490
                }
            }
        }];
        Plotly.newPlot('gauge', data2)
        // Fill out the Demographic Info Sector
        console.log(info[0])
        var metadata_panel = d3.select("#sample-metadata");
        metadata_panel.html("");
        Object.entries(info[0]).forEach(([key, value]) => {
        metadata_panel.append("p").text(`${key}: ${value}`);
    });
  });

var optionChanged = function(new) {
  d3.json("data/samples.json").then(function(data) {
    
  })
}