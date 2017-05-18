// var donut  = function() {
//     var width = 960,
//     height = 500,
//     radius = Math.min(width, height) / 2,
//      margin = {
//                 left: 70,
//                 bottom: 50,
//                 top: 30,
//                 right: 10,
//             },
//         color = d3.scaleOrdinal(d3.schemeCategory20c),
//         title = 'Example Title',
//         delayNum = 900;

//     var chart = function(selection) {
//         var arc = d3.svg.arc()
//             .outerRadius(radius - 10)
//             .innerRadius(radius - 70);
        
//         var outerArc = d3.arc()
// 			.outerRadius(radius - 5)
// 			.innerRadius(radius - 5);

//         var pie = d3.layout.pie()
//             .sort(null)
//             .value(function(d) { return d.value; });

//         selection.each(function(data) {
//             console.log(data);
//             var ele = d3.select(this);
//             var svg = ele.selectAll("svg").data([data]);

//             var svgEnter = svg.enter()
//                 .append("svg")
//                 .attr('width', width + margin.left + margin.right)
//                 .attr("height", height + margin.top + margin.bottom)
            
//             svg.append('text')
//                 .attr('transform', 'translate(' + (width  / 2) + ',' + 20 + ')')
//                 .text(title)
//                 .attr('class', 'chart-title');

// 			svgEnter.append('g')
// 				.attr('class', 'sliceLabel')
// 				.attr('width', width)
// 				.attr('height', height)
// 				.attr('transform', 'translate(' + (width / 2) + ',' + height / 2 + ')');

// 			svgEnter.append('g')
// 				.attr('transform', 'translate(' + (width  / 2) + ',' + height/2 + ')')
// 				.attr('class', 'chartG');

// 			svgEnter.append('g')
// 				.attr('class', 'lines')
// 				.attr('transform', 'translate(' + (width  / 2) + ',' + height/2 + ')');
            
//             var path = ele.select('.chartG').selectAll('path')
//                 .data(pie(data[0]))
// 				.enter().append('path')
// 				.attr('fill', function(d) { return color(d.data.key); })
// 				.transition()
// 				.delay(function(d,i) { return i * 800; })
// 				.duration(800)
// 				.attrTween('d', function(d) {
// 					var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
// 					return function(t) {
// 						d.endAngle = i(t);
// 						return arc(d);
// 					}
// 				});
            
//             var label = ele.select('.sliceLabel').selectAll('text')
// 				.data(pie(data[0])).enter()
// 				.append('text')
// 				//.attr('transform', function(d) {return 'translate(' + arc.centroid(d) + ')'; })
// 				.transition()
// 				.delay(function(d,i) { return i * 800; })
// 				.attr('transform', labelTransform)
// 				.attr('dy', '.35em')
// 				//.text(function(d) { return d.data.key; })
// 				.text(function(d) { return (d.data.key) + ': ' + (d.data.value); })
// 				.style('fill', '#000')
// 				.style('text-anchor', function(d) {
// 					return (midAngle(d)) < Math.PI ? 'start' : 'end';
// 				});

//             function labelTransform(d, i) {
// 				var pos = outerArc.centroid(d);
// 				pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1: -1);
// 				return 'translate(' + pos + ')';
// 			};

//             function midAngle(d) { return d.startAngle + (d.endAngle - d.startAngle) / 2; }
			
// 			// Add lines connecting text labels to the slices of the donut chart
// 			var polyline = ele.select('.lines').selectAll('polyline')
// 				.data(pie(data[0]))
// 				.enter().append('polyline')
// 				.transition()
// 				.delay(function(d,i) { return i * 800; })
// 				.attr('points', calculatePoints)
// 				.attr('fill', 'none')
// 				.attr('stroke-width', 1)
// 				.attr('stroke', '#808080');

// 			// Caculate the exact position to draw polylines
// 			function calculatePoints(d) {
// 				var pos = outerArc.centroid(d);
// 				pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
// 				return [arc.centroid(d), outerArc.centroid(d), pos];
// 			}

                

//             // ele.select('chartG')
//             //     .data(pie(data)[0])
//             //     .enter().append("g")
//             //     .attr("class", "arc");
            
//             // ele.select("chartG").append("path")
//             //     .attr("d", arc)
//             //     .style("fill", function(d) { return color(d.data[0]);});
            
//             // ele.select("chartG").append("text")
//             //     .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
//             //     .attr("dy", ".35em")
//             //     .text(function(d) { return d.data[1]; });
            
//         });

//     }

//     chart.height = function(value) {
// 		if (!argument.length) return height;
// 		height = value;
// 		return chart;
// 	};

// 	chart.width = function(value) {
// 		if (!argument.length) return width;
// 		width = value;
// 		return chart;
// 	};

// 	chart.radius = function(value) {
// 		if (!argument.length) return radius;
// 		radius = value;
// 		return chart;
// 	};

// 	chart.color = function(value) {
// 		if (!argument.length) return color;
// 		color = value;
// 		return chart;
// 	};

// 	chart.title = function(value) {
// 		if (!argument.length) return title;
// 		tile = value;
// 		return chart;
// 	};
//     return chart;

    
// };

function donutChart() {
	var width = 960,
    height = 500,
	radius = Math.min(width, height) / 2,
    margin = {
		left: 10,
		bottom: 30,
		top: 10,
		right: 10,
	},
	color = d3.scaleOrdinal(d3.schemeCategory20c),
	variable,
	category,
	padAngle,
	floatFormat = d3.format('.4r'),
	cornerRadius,
	percentFormat = d3.format(',.2%');

	function chart(selection) {
		selection.each(function(data) {
			var pie = d3.pie()
				.value(function(d) {
					return floatFormat(d[variable]);
				})
				.sort(null);
			
			var arc = d3.arc()
				.outerRadius(radius * 0.8)
				.innerRadius(radius * 0.6)
				.cornerRadius(cornerRadius)
				.padAngle(padAngle);
			
			var outerArc = d3.arc()
				.outerRadius(radius * 0.9)
				.innerRadius(radius * 0.9);
			
			var svg = selection.append('svg')
				.attr('width', width + margin.left + margin.right)
				.attr('height', height + margin.top + margin.bottom)
				.append('g')
					.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
			
			svg.append('g').attr('class', 'slices');
			svg.append('g').attr('class', 'labelName');
			svg.append('g').attr('class', 'lines');

			var path = svg.select('.slices')
				.datum(data).selectAll('path')
				.data(pie)
				.enter().append('path')
					.attr('fill', function(d) { 
							return color(d.data[category]);
						})
					.attr('d', arc);
			
			
			var label = svg.select('.labelName').selectAll('text')
				.data(pie)
				.enter().append('text')
					.attr('dy', '.35em')
					.html(function(d) {
						return d.data[category] + ': <tspan>' + percentFormat(d.data[variable]) +
							'</tspan>';
					})
					.attr('transform', function(d) {
						var pos = outerArc.centroid(d)
						pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
						return 'translate(' + pos + ')';
					})
					.style('text-anchor', function(d) {
						return (midAngle(d)) < Math.PI ? 'start' : 'end'
					})
			
			var polyline = svg.select('.lines')
				.selectAll('polyline')
				.data(pie)
				.enter().append('polyline')
				.attr('points', function(d) {
					var pos = outerArc.centroid(d);
					pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
					return [arc.centroid(d), outerArc.centroid(d), pos]
				});
			
			d3.selectAll('.labelName text, .slices path').call(toolTip)

			function midAngle(d) {
				return d.startAngle + (d.endAngle - d.startAngle) / 2;
			}

			function toolTip(selection) {
				var tip = '',
					i = 0;
				for (var key in data.data) {
					var value = (!isNaN(parseFloat(data.data[key]))) ? percentFormat(data.data[key]) : data.data[key];
					if (i == 0) {
						tip += '<tspan x="0">' + key + ': ' + value + '</tspan>';
					} else { 
						tip += '<tspan x="0" dy="1.2em">' + key + ': ' + value + '</tspan>';
					}
					i++;
				}
			}
		});
	}
	chart.width = function(value) {
        if (!arguments.length) return width;
        width = value;
        return chart;
    };

    chart.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        return chart;
    };

    chart.margin = function(value) {
        if (!arguments.length) return margin;
        margin = value;
        return chart;
    };

    chart.radius = function(value) {
        if (!arguments.length) return radius;
        radius = value;
        return chart;
    };

    chart.padAngle = function(value) {
        if (!arguments.length) return padAngle;
        padAngle = value;
        return chart;
    };

    chart.cornerRadius = function(value) {
        if (!arguments.length) return cornerRadius;
        cornerRadius = value;
        return chart;
    };

    chart.colour = function(value) {
        if (!arguments.length) return colour;
        colour = value;
        return chart;
    };

    chart.variable = function(value) {
        if (!arguments.length) return variable;
        variable = value;
        return chart;
    };

    chart.category = function(value) {
        if (!arguments.length) return category;
        category = value;
        return chart;
    };

    return chart;
}


