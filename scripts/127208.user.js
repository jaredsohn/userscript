// ==UserScript==
// @name           Dailyburn Weight Moving Average
// @description    Display all your weight entries and a 20-day moving average in a pretty graph. 
// @namespace      http://tracker.dailyburn.com
// @include        http://tracker.dailyburn.com/locker_room*
// @require				 http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require        http://flot.googlecode.com/svn/trunk/jquery.flot.js
// ==/UserScript==

$.noConflict();
jQuery(document).ready(function() {
	var doc = jQuery(decodeURIComponent( unsafeWindow.flashvars.chart_settings ));
	
	//console.log( doc );
	//console.log( doc.find('settings').find('data_sets').find('data_set').find('csv').find('columns') );
	//console.log( doc.find('data_sets').find('data_set').find('csv').find('data').text() );
	
	var csv = doc.find('data_sets').find('data_set').find('csv').find('data').text();
	
	var arr = CSVToArray(csv);
	//console.log(arr);
	
	jQuery('#tracker_chart_container').append('<div id="gm-flot-placeholder" style="height: 200px"></div>');
	
	// Graph data
	var weightdata = [];
	var movingavg = [];
	
	// Moving average days
	var ma_days = 20;
	
	for (var i in arr) {
		var date   = arr[i][0];
		var weight = arr[i][1];
		
		if  (date == null || weight == null) {
			continue;
		}
		
		// Convert the date from YYYY-MM-DD to epoch milliseconds
		var epoch = new Date(date + "T00:00").getTime();
		
		var d = [epoch, weight];
		
		weightdata.push(d);
		
		//moving_total = parseInt(moving_total) + parseInt(weight);
		//var moving_weight = moving_total / c; 
		var c = 1;
		var moving_total = weight;
		
		for (j = i-1; j > i - ma_days; j--) {
			if (j < 0) { break; }
			
			var ma_d = arr[j][1];
			if (ma_d == null) {
				ma_d++;
			}
			
			moving_total = parseInt(moving_total) + parseInt(ma_d);
			
			c++;
		}
		var moving_weight = moving_total / c;
		
		var ma = [epoch, moving_weight];
		
		movingavg.push(ma);
	}
	
	//weightdata.pop(); // remove the last, invalid element
	//movingavg.pop();
	//console.log(movingavg);
	
	//jQuery.plot($("#gm-flot-placeholder"), [ d1, d2, d3 ]);
	jQuery.plot(jQuery("#gm-flot-placeholder"),
		[
			{
				data: weightdata,
				label: "Weights",
				points: { show: true },
			},
			{
				data: movingavg,
				label: "Moving average",
				hoverable: false,
			},
		],
		{
			xaxis: { mode: "time" },
			series: {
				lines: { show: true },
			},
			grid: { hoverable: true },
			legend: {
				position: "sw"
			}
		}
	);
	
	var previousPoint = null;
	jQuery("#gm-flot-placeholder").bind("plothover", function (event, pos, item) {
    if (item) {
        if (previousPoint != item.dataIndex) {
            previousPoint = item.dataIndex;
            
            jQuery("#tooltip").remove();
            var x = item.datapoint[0].toFixed(2),
                y = item.datapoint[1].toFixed(2);
            
            var date = new Date(Math.floor(x)).toDateString();
            
            showTooltip(item.pageX, item.pageY, date + " - " + y);
        }
    }
    else {
        jQuery("#tooltip").remove();
        previousPoint = null;            
    }
	});
});

function showTooltip(x, y, contents) {
    jQuery('<div id="tooltip">' + contents + '</div>').css( {
        position: 'absolute',
        display: 'none',
        top: y + 5,
        left: x + 5,
        border: '1px solid #fdd',
        padding: '2px',
        'background-color': '#fee',
        opacity: 0.80
    }).appendTo("body").fadeIn(200);
}



// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
function CSVToArray( strData, strDelimiter ){
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
            (
                    // Delimiters.
                    "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

                    // Quoted fields.
                    "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

                    // Standard fields.
                    "([^\"\\" + strDelimiter + "\\r\\n]*))"
            ),
            "gi"
            );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){

            // Get the delimiter that was found.
            var strMatchedDelimiter = arrMatches[ 1 ];

            // Check to see if the given delimiter has a length
            // (is not the start of string) and if it matches
            // field delimiter. If id does not, then we know
            // that this delimiter is a row delimiter.
            if (
                    strMatchedDelimiter.length &&
                    (strMatchedDelimiter != strDelimiter)
                    ){

                    // Since we have reached a new row of data,
                    // add an empty row to our data array.
                    arrData.push( [] );

            }


            // Now that we have our delimiter out of the way,
            // let's check to see which kind of value we
            // captured (quoted or unquoted).
            if (arrMatches[ 2 ]){

                    // We found a quoted value. When we capture
                    // this value, unescape any double quotes.
                    var strMatchedValue = arrMatches[ 2 ].replace(
                            new RegExp( "\"\"", "g" ),
                            "\""
                            );

            } else {

                    // We found a non-quoted value.
                    var strMatchedValue = arrMatches[ 3 ];

            }


            // Now that we have our value string, let's add
            // it to the data array.
            arrData[ arrData.length - 1 ].push( strMatchedValue );
    }

    // Return the parsed data.
    return( arrData );
}