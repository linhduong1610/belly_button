function buildMetadata(sample) {
  d3.json("/metadata/" + sample).then(function(data){
    // Use d3 to select the panel with id of `#sample-metadata`
    var sample_metadata = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    sample_metadata.html("");


    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(data).forEach(([key, value]) => {
      sample_metadata.append("h6").text(`${key}: ${value}`);
    })
  })
  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`

    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {
  d3.json("/samples/" + sample).then(function(data) {

    // @TODO: Build a Bubble Chart using the sample data

    var trace1 = {
      x: data.otu_ids,
      y: data.sample_values,
      text: data.otu_labels,
      mode: 'markers',
      marker: {
        color: data.otu_ids,
        size: data.sample_values,
        colorscale: "Earth"
      }

    };
  
    var trace1 = [trace1];
    var layout = {
      showlegend: false,
      xaxis: { title: "OTU ID"},
      height: 600,
      width: 1500
    };

    Plotly.newPlot('bubble', trace1, layout);
   

    // @TODO: Build a Pie Chart
    
    var pievalues = data.sample_values.slice(0,10);
    var pielabels = data.otu_ids.slice(0,10);
    var piehover = data.otu_labels.slice(0,10);

    var trace2 = [{
      values: pievalues,
      labels: pielabels,
      hovertext: piehover,
      type: 'pie'
      }];

    Plotly.Plot('pie', trace2);

  })

  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
