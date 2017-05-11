var DonutChart = function() {
	// Set defaults vars
	var height = 450,
		width = 960,
		margin = {top: 10, right: 10, bottom: 10, left: 10},
		radius = Math.min(width, height) / 2,
		title = 'Chart Title',
		color = d3.scaleOrdinal(d3.schemeCategory20c);
	

	// Internal function that gets returned
	var chart = function(selection) {
		// Constructs an arc generator
		var arc = d3.arc()
			.innerRadius(radius * 0.8)
			.outerRadius(radius * 0.6);

		// The outerArc is used in caculating text label positions
		var outerArc = d3.arc()
			.outerRadius(radius * 0.9)
			.innerRadius(radius * 0.9);

		// Creates a new pie generator
		var pie = d3.pie()
			.value(function(d) { return d.value; })   // change the attribute name if needed
			.sort(null);

		// For each selected element, perform the function (optional)
		selection.each(function(data) {
			var element = d3.select(this);
			var svg = element.selectAll('svg').data(data);
		
			var svgEnter = svg.enter()
				.append('svg')
				.attr('width', width + margin.left + margin.right)
				.attr('height', height + margin.top + margin.bottom);

			svgEnter.append('text')
				.attr('transform', 'translate(' + (width / 2) + ',' + 10 + ')')
				.text(title)
				.attr('class', 'chart-title');

			svgEnter.append('g')
				.attr('class', 'sliceLabel')
				.attr('width', width)
				.attr('height', height)
				.attr('transform', 'translate(' + (width / 2) + ',' + height / 2 + ')');

			svgEnter.append('g')
				.attr('transform', 'translate(' + (width  / 2) + ',' + height/2 + ')')
				.attr('class', 'chartG');

			svgEnter.append('g')
				.attr('class', 'lines')
				.attr('transform', 'translate(' + (width  / 2) + ',' + height/2 + ')');

			// Draw donut chart
			var path = element.select('.chartG').selectAll('path')
				.data(pie(data[0]))
				.enter().append('path')
				.attr('fill', function(d) { return color(d.data.key); })
				.transition()
				.delay(function(d,i) { return i * 800; })
				.duration(800)
				.attrTween('d', function(d) {
					var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
					return function(t) {
						d.endAngle = i(t);
						return arc(d);
					}
				});

			// Add text labels
			var label = element.select('.sliceLabel').selectAll('text')
				.data(pie(data[0])).enter()
				.append('text')
				//.attr('transform', function(d) {return 'translate(' + arc.centroid(d) + ')'; })
				.transition()
				.delay(function(d,i) { return i * 800; })
				.attr('transform', labelTransform)
				.attr('dy', '.35em')
				//.text(function(d) { return d.data.key; })
				.text(function(d) { return (d.data.key) + ': ' + (d.data.value); })
				.style('fill', '#000')
				.style('text-anchor', function(d) {
					return (midAngle(d)) < Math.PI ? 'start' : 'end';
				});

			// For positioning text labels
			function labelTransform(d, i) {
				var pos = outerArc.centroid(d);
				pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1: -1);
				return 'translate(' + pos + ')';
			};

			// Calculate the midAngel for positioning text labels
			function midAngle(d) { return d.startAngle + (d.endAngle - d.startAngle) / 2; }
			
			// Add lines connecting text labels to the slices of the donut chart
			var polyline = element.select('.lines').selectAll('polyline')
				.data(pie(data[0]))
				.enter().append('polyline')
				.transition()
				.delay(function(d,i) { return i * 800; })
				.attr('points', calculatePoints)
				.attr('fill', 'none')
				.attr('stroke-width', 1)
				.attr('stroke', '#808080');

			// Caculate the exact position to draw polylines
			function calculatePoints(d) {
				var pos = outerArc.centroid(d);
				pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
				return [arc.centroid(d), outerArc.centroid(d), pos];
			}
		});
	};

	// Getter and setter functions
	chart.height = function(value) {
		if (!argument.length) return height;
		height = value;
		return chart;
	};

	chart.width = function(value) {
		if (!argument.length) return width;
		width = value;
		return chart;
	};

	chart.radius = function(value) {
		if (!argument.length) return radius;
		radius = value;
		return chart;
	};

	chart.color = function(value) {
		if (!argument.length) return color;
		color = value;
		return chart;
	};

	chart.title = function(value) {
		if (!argument.length) return title;
		tile = value;
		return chart;
	};

	return chart;
};

// 
// 
// 
// 


function donutChart() {

    // Set default values
    var width = 600, 
        height = 600, 
        margin = {top: 150, right:30, bottom:30, left:30},
        color = d3.scaleOrdinal(d3.schemeCategory20c),
        padAngle = 0,
        cornerRadius = 0,
        sliceVal,
        sliceCat,
        title,
        showTooltip = true, // Boolean for tooltip
        showLabels = true // Boolean for labels
        ;
        
        // Function returned by chart
        function chart(selection) {
            // Chart dimension variables
            var chartWidth = (width - margin.left - margin.right);
            var chartHeight = (height - margin.top - margin.bottom);

            // Radius variable
            var radius = Math.min(chartWidth, chartHeight)/2;

            // Create pie generator
            // Returns value or 0 if data is missing
            var pie = d3.pie()
                .value(function(d) { return +d[sliceVal] || 0; })
                .sort(null)
            ;
            
            // Create arc generator for slices
            var arc = d3.arc()
                .outerRadius(radius)
                .innerRadius(radius - 50)
                .cornerRadius(cornerRadius)
                .padAngle(padAngle)
            ;
            
            // Create arc generator for labels
            var label = d3.arc()
                .outerRadius(radius + 10)
                .innerRadius(radius + 10)
            ;

            // Iterate through selections
            selection.each(function(data) {

                // Append svg through data-join if necessary
                var ele = d3.select(this);
                var svg = ele.selectAll('svg').data(data);                

                // Append svg to selection
                var svgEnter = svg.enter().append('svg')
                    .attr('width', width)
                    .attr('height', height)
                ;

                // Append chart title to svg
                svgEnter.append('text')
                    .attr('transform', 'translate(' + ((width - margin.left)/2) + ',' + 30 + ')')
                    .text(title)
                    .attr('class', 'chart-title')
                ;

                // Append tooltip text and style
                // http://bl.ocks.org/nnattawat/9368297
                var tooltip = svgEnter.append('text')
                    .attr('class', 'tooltip')
                    .attr('transform', 'translate(' + (width)/2 + ',' + height/2 + ')')
                    .style('text-anchor', 'middle')
                    .attr('font-weight', 'bold')
                    .style('font-size', '1.5em')
                ;
                
                // Append g to svg
                var g = svgEnter.append('g')
                    .attr('transform', 'translate(' + width/2 + "," + height/2 + ')')
                    .attr('class', 'chart-g')
                ;
                
                // Enter paths
                var path = g.selectAll('.path')
                    .datum(data).data(pie)
                    .enter().append('g')
                    .attr('class', 'path')
                        .append('path')
                        .attr('d', arc)
                        .attr('fill', function(d) {return color(d.data[sliceCat]); })
                ;

                // Update paths
                path.transition().duration(750)
                    .attrTween('d', arcTween);

                // Exit paths
                path.exit().remove();

                // Store angles and interpolate from current to new angles
                function arcTween(a) {
			        var i = d3.interpolate(this._current, a);
			        this._current = i(0);
			            return function(t) {
			                return arc(i(t));
			        };
			    };


                // If showTooltip is true, display tooltip
                if(showTooltip) {
                    // Show tooltip on mouseover
                    path.on('mouseover', function(d) {
                        tooltip.html(d.data[sliceCat] + ': <tspan x="0" dy="1.2em">' + d.data[sliceVal] + '</tspan')
                            .style('display', 'block')
                            .attr('fill', color(d.data[sliceCat]))  
                        ;
                    })
            
                    // Hide tooltip on mouseout
                    path.on('mouseout', function() {
                        tooltip.style('display', 'none');
                    })
                }

                // Function to calculate angle for text
                var getAngle = function (d) {
                    return (180 / Math.PI * (d.startAngle + d.endAngle) / 2 - 90);
                };

                // If showLabels is true, append text
                if(showLabels) {
                    // Rotate to prevent overlap
                    // http://stackoverflow.com/questions/14534024/preventing-overlap-of-text-in-d3-pie-chart
                    g.selectAll('.path').append('text')
                        .attr("transform", function(d) { 
                            return "translate(" + label.centroid(d) + ") " + "rotate(" + getAngle(d) + ")"; 
                        }) 
                        .attr("dy", 5) 
                        .style("text-anchor", "start")
                        .text(function(d) {
                            return d.data[sliceVal] == 0 ? "" : d.data[sliceCat];
                        })
                }
            });
        };

    // Define accessors for variables
    // If called without argument, method returns variable value

    // Width accessor
    chart.width = function(value) {
        if(!arguments.length) {return width;}
        width = value;
        return chart;
    };

    // Height accessor
    chart.height = function(value) {
        if(!arguments.length) {return height};
        height = value;
        return chart; 
    };

    // Chart title accessor
    chart.title = function(value) {
        if(!arguments.length) {return title;}
        title = value;
        return chart;
    };

    // Color accessor
    chart.color = function(value) {
        if(!arguments.length) {return color;}
        color = value;
        return chart;
    };

    // Slice values accessor
    chart.sliceVal = function(value) {
        if(!arguments.length) {return sliceVal;}
        sliceVal = value;
        return chart;
    };

    // Pad angle accessor
    chart.padAngle = function(value) {
        if(!arguments.length) {return padAngle;}
        padAngle = value;
        return chart;
    };

    // Slice category accessor
    chart.sliceCat = function(value) {
        if(!arguments.length) {return sliceCat;}
        sliceCat = value;
        return chart;
    };

    // Corner radius accessor
    chart.cornerRadius = function(value) {
        if(!arguments.length) {return cornerRadius;}
        cornerRadius = value;
        return chart;
    }

    // Show labels accessor
    chart.showLabels = function(value) {
        if(!arguments.length) {return showLabels;}
        showLabels = value;
        return chart;
    }

    // Show tooltip accessor
    chart.showTooltip = function(value) {
        if(!arguments.length) {return showTooltip;}
        showTooltip = value;
        return chart;
    }

    return chart;
};

// 
// 
// 
// 
// 
// 


  var width = 960,
        height = 500,
        radius = Math.min(width, height) / 2,
        margin = {
                left: 70,
                bottom: 50,
                top: 30,
                right: 10,
            },
        color = d3.scaleOrdinal(d3.schemeCategory20c),
        title = 'Example Title',
        delayNum = 900;

    var chart = function(selection) {
        var chartHeight = height - margin.bottom - margin.top;
        var chartWidth = width - margin.left - margin.right;

        var arc = d3.svg.arc()
            .outerRadius(radius - 10)
            .innerRadius(radius - 70);

        var pie = d3.layout.pie()
            .sort(null)
            .value(function(d) { return d.value; });
        
        selection.each(function(data) {
            var element = d3.select(this);
            var svg = element.selectAll('svg').data(data);

            var svgEnter = svg.enter()
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom);


            svgEnter.append('text')
                .attr('transform', 'translate(' + (width / 2) + ',' + 10 + ')')
                .text(title)
                .attr('class', 'chart-title');
            
            svgEnter.append('g')
				.attr('class', 'sliceLabel')
				.attr('width', width)
				.attr('height', height)
				.attr('transform', 'translate(' + (width / 2) + ',' + height / 2 + ')');
            
            svgEnter.append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                .attr('width', width)
                .attr('height', height)
                .attr("class", 'chartG');
            
            svgEnter.append('g')
				.attr('class', 'lines')
				.attr('transform', 'translate(' + (width  / 2) + ',' + height/2 + ')');
            
            var path = element.select('.chartG').selectAll('path')
				.data(pie(data[0]))
				.enter().append('path')
				.attr('fill', function(d) { return color(d.data.key); })
				.transition()
				.delay(function(d, i) { return i * delayNum; })
				.duration(delayNum)
				.attrTween('d', function(d) {
					var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
					return function(t) {
						d.endAngle = i(t);
						return arc(d);
					}
				}); 
        )};     
    };

        chart.width = function(value) {
            if(!arguments.length) {return width;}
            width = value;
            return chart;
        };

        chart.height = function(value) {
            if(!arguments.length) {return height};
            height = value;
            return chart; 
        };

        chart.title = function(value) {
            if(!arguments.length) {return title;}
            title = value;
            return chart;
        };

        chart.color = function(value) {
            if(!arguments.length) {return color;}
            color = value;
            return chart;
        };

        chart.radius = function(value) {
            if(!arguments.length) {return radius;}
            radius = value;
            return chart;
        };

        chart.delay = function(value) {
            if(!arguments.length) {return delayNum;}
            delayNum = value;
            return chart;
        }

        return chart;  