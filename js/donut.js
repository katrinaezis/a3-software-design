var donut  = function() {
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
        var arc = d3.svg.arc()
            .outerRadius(radius - 10)
            .innerRadius(radius - 70);
        
        var outerArc = d3.arc()
			.outerRadius(radius - 5)
			.innerRadius(radius - 5);

        var pie = d3.layout.pie()
            .sort(null)
            .value(function(d) { return d.value; });

        selection.each(function(data) {
            console.log(data);
            var ele = d3.select(this);
            var svg = ele.selectAll("svg").data([data]);

            var svgEnter = svg.enter()
                .append("svg")
                .attr('width', width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            
            svg.append('text')
                .attr('transform', 'translate(' + (width  / 2) + ',' + 20 + ')')
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
            
            var path = ele.select('.chartG').selectAll('path')
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
            
            var label = ele.select('.sliceLabel').selectAll('text')
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

            function labelTransform(d, i) {
				var pos = outerArc.centroid(d);
				pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1: -1);
				return 'translate(' + pos + ')';
			};

            function midAngle(d) { return d.startAngle + (d.endAngle - d.startAngle) / 2; }
			
			// Add lines connecting text labels to the slices of the donut chart
			var polyline = ele.select('.lines').selectAll('polyline')
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

                

            // ele.select('chartG')
            //     .data(pie(data)[0])
            //     .enter().append("g")
            //     .attr("class", "arc");
            
            // ele.select("chartG").append("path")
            //     .attr("d", arc)
            //     .style("fill", function(d) { return color(d.data[0]);});
            
            // ele.select("chartG").append("text")
            //     .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
            //     .attr("dy", ".35em")
            //     .text(function(d) { return d.data[1]; });
            
        });

    }

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



