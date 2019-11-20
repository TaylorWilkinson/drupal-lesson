$(function () {
  // Show loading message
  $(".mapcontainer span").html("Loading JSON data").css({"color":"blue", "font-weight":"bold"});
  // We need a setTimeout (~200ms) in order to allow the UI to be refreshed for the message to be shown
  setTimeout(function(){
    // Get the data
    $.getJSON("https://ressources.data.sncf.com/api/records/1.0/search/?dataset=referentiel-gares-voyageurs&rows=500&sort=intitule_gare&facet=agence_gare&facet=region_sncf&facet=unite_gare&facet=departement&facet=segment_drg", function (data) {
      // Success
      // This variable will hold all the plots of our map
      var plots = {};
      var plotsColors = chroma.scale("Blues");
      data = data.records;
      // Parse each elements
      $.each(data, function (id, elem) {
        // Check if we have the GPS position of the element
        if (elem.fields.wgs_84) {
          // Will hold the plot information
          var plot = {};
          // Assign position
          plot.latitude = elem.fields.wgs_84[0];
          plot.longitude = elem.fields.wgs_84[1];
          // Assign some information inside the tooltip
          plot.tooltip = {
            content: "<span style='font-weight:bold;'>" +
              elem.fields.intitule_gare + " (" + elem.fields.code_postal + ")" +
              "</span>" +
              "<br/>Level " + elem.fields.niveau_de_service + " station in " + elem.fields.commune + " (" + elem.fields.departement + ")"
          };
          // Assign the background color randomize from a scale
          plot.attrs = {
            fill: plotsColors(Math.random())
          };
          // Set plot element to array
          plots[id] = plot;
        }
      });
      // Create map
      $(".mapcontainer").mapael({
        map: {
          name: "france_departments",
          defaultPlot: {
            size: 10
          }
        },
        plots: plots
      });
    }).fail(function() {
      // Error
      $(".mapcontainer span").html("Failed to load JSON data").css({"color":"red"});
    });
  }, 200);
});
