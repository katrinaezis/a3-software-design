// Katrina Ezis
// INFO474 Donut Chart Reusable Example
// Adopted from http://bit.ly/2qUix6I
// as well as from http://bit.ly/1qUOxB1
// as well as from http://bit.ly/2qU9oL
function donutChart() {
	var width = 960,
    height = 500,
	radius,
    margin = {
		left: 10,
		bottom: 30,
		top: 100,
		right: 10,
	},
	color = d3.scaleOrdinal(d3.schemeCategory20c),
	variable,
	title = 'Dank Donuts',
	category,
	floatFormat = d3.format('.4r'),
	percentFormat = d3.format(',.2%');

	function chart(selection) {
		var chartHeight = height - margin.bottom - margin.top;
        var chartWidth = width - margin.left - margin.right;
		var radius = Math.min(chartWidth, chartHeight) /2;
		selection.each(function(data) {
			var pie = d3.pie()
				.value(function(d) {
					return floatFormat(d[variable]);
				})
				.sort(null);
			
			var arc = d3.arc()
				.outerRadius(radius * 0.8)
				.innerRadius(radius * 0.6);
			
			var outerArc = d3.arc()
				.outerRadius(radius * 0.9)
				.innerRadius(radius * 0.9);

			var ele = d3.select(this);
			var svg = ele.selectAll('svg').data([data]);

			var svgEnter = svg.enter()
				.append("svg")
				.attr('width', chartWidth)
				.attr('height', chartHeight)
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			
			svgEnter.append('text')
				.attr('transform', 'translate(' + ((chartWidth - margin.left) / 2) + ',' + 20 + ')')
                .text(title)
                .attr('class', 'chart-title');
			
			 svgEnter.append('g')
                    .attr('transform', 'translate(' + chartWidth/2 + "," + chartHeight/2 + ')')
                    .attr('class', 'chart-g');

			svgEnter.append('g').attr('class', 'slices')
				.attr("transform", "translate(" + width/2 + "," + height/2 + ")");
			svgEnter.append('g').attr('class', 'labelName')
				.attr("transform", "translate(" + width/2 + "," + height/2 + ")");
			svgEnter.append('g').attr('class', 'lines')
				.attr("transform", "translate(" + width/2 + "," + height/2 + ")");
			
			var path = ele.select('.slices')
				.datum(data).selectAll('path')
				.data(pie)
				.enter().append('path')
					.attr('fill', function(d) { 
							return color(d.data[category]);
						})
					.attr('d', arc)

			var label = ele.select('.labelName').selectAll('text')
				.data(pie)
				.enter().append('text')
					.attr('dy', '.35em')
					
					.html(function(d) {
						return d.data[category] + ': ' + percentFormat(d.data[variable]);
					})
					.attr('transform', function(d) {
						var pos = outerArc.centroid(d)
						pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
						return 'translate(' + pos + ')';
					})
					.style('text-anchor', function(d) {
						return (midAngle(d)) < Math.PI ? 'start' : 'end'
					})
			
			var polyline = ele.select('.lines')
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
			}
		});
	}
	chart.title = function(value) {
		if (!arguments.length) return title;
        title = value;
        return chart;
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

    chart.radius = function(value) {
        if (!arguments.length) return radius;
        radius = value;
        return chart;
    };

    chart.color = function(value) {
        if (!arguments.length) return color;
        color = value;
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


