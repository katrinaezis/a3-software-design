# :doughnut: An Adoughable Donut Chart :doughnut:
donut.js is a JS + D3 library capable of 
visualizing all the data in a super wonderful, 
state-of-the-art donut chart.
But doughnut just take it from me, check it out for yourself!

## Getting Started
In order for this ish to work, you gotta get a hole bunch of stuff.
In the `<head>` of your index.html put the following:
```html
<!-- jquery 4 dayz -->
<script src="https://code.jquery.com/jquery.min.js"></script>

<!-- d3 4 u -->
<script src="https://d3js.org/d3.v4.min.js"></script>

<!-- the cream filling aka my library -->
<script src="js/donut.js"></script>

<!-- I like my graphs pretty -->
<script src="js/main.js"></script>
```

## Dat Data Dough 
donut.js uses any sort of data, alls you need the
name of what you want to visualize (category) and its
value (variable). That way you can take in dope data like this:
```
name, value
Katrina, 150
Mike, 200
Vincent, 130
Life, 0
MyGrade, 0
```
and chart that ish. We just need to put a lil prep in 
your step and you'll be off to the races!
```javascript
d3.csv('../path/to/data', function(data) {
        d3.select('#yourDiv')
            .datum(data) // bind data
            .call(donut); // draw 
    });
 ```
 If you have lots of properties you'll have to tell
 donut what's what like this:
 ```javascript
  var donut = donutChart()
        .variable('value')
        .category('name');
```
This tells donut which properties to look at. Helpful 
for huge ass data sets. 

## Gettin' Artsy Af
You're pretty much ready to draw your graph, 
just throw it in a function, hook it up to your main and 
you're golden.
```javascript
$(function() {
     var donut = donutChart()
        .width($('#vis').parent().width() - 100) // recommended addition
        .height(500) // also recommended
        .variable('value') // we learned this!
        .category('name') // and this!
        .title('donuts 4 dayz'); // dope title for a dope graph

    d3.csv('../path/to/data', function(data) { //back at it with the data
        d3.select('#yourDiv')
            .datum(data) // bind data
            .call(donut); // draw 
    });
});
```

## Choose your own adventure

#### .title 
P self explanatory. Set your title to something
dope, donut let me down!

#### .width
Does what you think it does. Sets the width
of your graph.

#### .height
Man I really made this easy on you. Sets the height
of your graph.

#### .radius
What is the plural form of radius? Radi? Radii?
Well set all your radii here!

#### .color
Put some sprinkles on your donut! This changes the color 
scheme.

#### .variable 
We explained this one earlier, but incase u a dum-dum here it 
is again: variable allows you to choose which parameter to take
is as your % of the donut value.

#### .category
I swear I explained this one too! But whatevs, this sets the names
of your donut pieces. That was it's v easy to switch between 
parameters and all that jazz.  

## You done boo! Go forth and :doughnut: 
