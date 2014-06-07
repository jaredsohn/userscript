// ==UserScript==
// @name       Ngram Geometric Mean
// @namespace  http://ehsankia.com
// @version    0.1
// @description  It computes the geometric mean of two Ngrams
// @match      http://books.google.com/ngrams/graph?*
// @copyright  2012+, Ehsan Kia
// ==/UserScript==


function geometric_mean(){
    // Gets the inline script and extract the data
	var script = document.body.getElementsByTagName('script')[5];
	var parsed = JSON.parse(script.innerHTML.match(/ \[(.*)\] /g)[0]);

    // Grabs the names of the two first columns
	var col1 = script.innerHTML.match(/, '(.*)'/g)[2];
	col1 = col1.substring(3,col1.length-1);
	var col2 = script.innerHTML.match(/, '(.*)'/g)[3]
	col2 = col2.substring(3,col2.length-1);

    // Adds the geometric mean (and gets rid of extra columns
	for (var i=0; i<parsed.length; i++){
        parsed[i] = parsed[i].slice(0,3);
		parsed[i].push(Math.sqrt(parsed[i][1]*parsed[i][2]))
	}

    // Redraws the chart
	redrawChart(col1, col2, parsed);
}

// Copied almost exactly from the Ngram script
function redrawChart(col1, col2, newData) {
	chart_div.innerHTML = "";

	var data = new google.visualization.DataTable();

	// Add column headings, with escaping for JS strings.  
	data.addColumn('number', 'Year');
	data.addColumn('number', col1);
	data.addColumn('number', col2);
	data.addColumn('number', "Geometric Mean");  

	// Add graph data, without autoescaping.
	data.addRows(newData);

	// Format the data columns.
	var formatter =	new google.visualization.NumberFormat({ pattern: '0.0000######%' });
	for (col = 1; col < data.getNumberOfColumns(); col++) {
		formatter.format(data, col);
	}

	// Set general chart options.
	var options = {
		chartArea: { left: 100, width: "85%" },
		focusTarget: 'category',
		legend: { position: 'top' },
		tooltip: { isHtml: true },
		hAxis: { format: '####', gridlines: { count: -1 } },
		vAxis: {
		  format: '0.00########%',
		  gridlines: { count: 6 },
		  minValue: 0,
		  baselineColor: 'black'
		}
	}

	function selectHandler() {
		chart.setSelection(null);
	}

	// Draw the chart.
	var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
	google.visualization.events.addListener(chart, 'select', selectHandler);
	chart.draw(data, options);
}

// Binds the function as a global variable
unsafeWindow.geometric_mean = geometric_mean;