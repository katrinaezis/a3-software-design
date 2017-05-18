$(function() {
    console.log("hello")

     var donut = donutChart()
        .width(960)
        .height(500)
        .cornerRadius(3) // sets how rounded the corners are on each slice
        .padAngle(0.015) // effectively dictates the gap between slices
        .variable('Probability')
        .category('Species');

    d3.tsv('../data/species.tsv', function(error, data) {
        console.log(data);
        if (error) throw error;
        d3.select('#vis')
            .datum(data) // bind data to the div
            .call(donut); // draw chart in div
    });
});
    // d3.csv("data/data.csv", type, function(error, data) {
        // var prepData = function() {
        //     chartData = data.map(function(d) {
        //         return {
        //             name: d[age],
        //             value: d[population]
        //         }
        //     })
        // }
        // prepData();

    //     var d = donut();

    //     var c = d3.select("#vis")
    //         .datum([data])
    //         .call(d);
        
        
    // })
    // function type(d) {
    //     d.population = +d.population;
    //     return d;
    // } 
        // var arc = d3.svg.arc()
        //     .outerRadius(radius - 10)
        //     .innerRadius(radius - 70);

        // var pie = d3.layout.pie()
        //     .sort(null)
        //     .value(function(d) { return d.population; });

        // var svg = d3.select("body").append("svg")
        //     .attr("width", width)
        //     .attr("height", height)
        // .append("g")
        //     .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        // d3.csv("data/data.csv", type, function(error, data) {
        // if (error) throw error;

        // var g = svg.selectAll(".arc")
        //     .data(pie(data))
        //     .enter().append("g")
        //     .attr("class", "arc");

        // g.append("path")
        //     .attr("d", arc)
        //     .style("fill", function(d) { return color(d.data.age); });

            

        // g.append("text")
        //     .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
        //     .attr("dy", ".35em")
        //     .text(function(d) { return d.data.age; });
        // });

        // function type(d) {
        // d.population = +d.population;
        // return d;
        // } 