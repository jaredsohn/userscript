// ==UserScript==
// @name           Salary Share Graph
// @namespace      http://userscripts.org/users/72838
// @include        http://www.salaryshare.me/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// @require		   http://www.c0bra.net/js/flot/jquery.flot.min.js
// @version		   0.01
// ==/UserScript==

// Create the graph div
$('#contents').prepend('<div id="graph" style="position: absolute; top: 230px; left: 675px; width:600px; height:300px"></div>');

$(function () {
	var d1 = [];
	
	var sals = {};
    $('.results').find('li').each(function (){
    	var sal = $(this).html();
    	sal = sal.replace(/^\$(\d+)/, '$1');
    	
    	if (sal > 1000000) { return; }
    	
    	var c = sals[sal] || 0;
    	sals[sal] = c + 1;
	});
	
	for (c in sals) {
		d1.push([c, sals[c]]);
	}
	
	if (d1.length == 0) {
		return;
	}
    
    $.plot($("#graph"),
    	[
	    	{
				data: d1,
				lines: { show: true, fill: false },
				points: { show: true },
			}
    	],
    	{
    		xaxis: {
				ticks: [0, 10000, 100000, 300000, 1000000, 10000000],
				tickFormatter: function(val, axis) {
					val += '';
					x = val.split('.');
					x1 = x[0];
					x2 = x.length > 1 ? '.' + x[1] : '';
					var rgx = /(\d+)(\d{3})/;
					while (rgx.test(x1)) {
						x1 = x1.replace(rgx, '$1' + ',' + '$2');
					}
					return "$" + x1 + x2;
				},
				transform: function (v) { return .5 * Math.pow(v, .3); },
			},
			colors: ["#809FFE", "#919733"]
    	}
    );
});