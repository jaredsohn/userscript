// ==UserScript==
// @name        CoinGeneration - Advanced Stats
// @namespace   coingeneration_advanced_stats
// @description Provide advanced stats for the coingeneration website, which allows you to earn from 1$ per day to 100$ per day.
// @grant       none
// @include     https://coingeneration.com/stat/
// @updateURL	http://userscripts.org/scripts/source/175328.meta.js
// @version     1.1
// ==/UserScript==

// Append google visualization API
var script = document.createElement('script');
script.src = "https://www.google.com/jsapi?autoload=%7B%0A%20%20%22modules%22%20%3A%20%5B%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22name%22%20%3A%20%22visualization%22%2C%0A%20%20%20%20%20%20%22version%22%20%3A%20%221.0%22%2C%0A%20%20%20%20%20%20%22language%22%20%3A%20%22en%22%2C%0A%22callback%22%3A%22AdvGraph_initialize%22%2C%0A%22packages%22%3A%5B%22corechart%22%5D%0A%20%20%20%20%7D%0A%5D%0A%7D&sensor=false";
var head = document.getElementsByTagName("head")[0];
(head || document.body).appendChild(script);

// Append CSS style
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = 'dt{ font-weight: bold; float: left; width: 160px; margin-right:6px; display:block; min-height:36px; margin-bottom:6px; } dd{ float: left; width: 160px; display:block; min-height:36px;  margin-bottom:6px; }';
(head || document.body).appendChild(style);

function round(value, precision, mode) {
  var m, f, isHalf, sgn;
  precision |= 0;
  m = Math.pow(10, precision);
  value *= m;
  sgn = (value > 0) | -(value < 0);
  isHalf = value % 1 === 0.5 * sgn;
  f = Math.floor(value);
  if (isHalf) {
      value = f + (sgn > 0);
  }
  return (isHalf ? value : Math.round(value)) / m;
}

// Once ready callback
unsafeWindow.AdvGraph_initialize = function (){
	// Create window vars alias and methods
	var google = unsafeWindow.google;
	$.fn.reverse = [].reverse;
	
	// Create graph div.
	var stats_dl = $('<dl></dl>');
	
	$("h2.statImg").after('<div id="line_chart_div"></div>');
	$("h2.statImg").after('<div style="clear:both;">&nbsp;</div>');
	$("h2.statImg").after(stats_dl);
	
	
	// Retrieve data
	var balance = parseFloat($("li.userBalance b:eq(0)").html()) + parseFloat($("li.userBalance b:eq(1)").html());
	var data = [['Date','Threads','Referrals','Earnings']];
	var tds = $(".mainCont .page-container table:eq(0) tr:not(:first-child):not(:last-child)").reverse();
	var total = {
		threads: 0,
		referrals: 0,
		earnings: 0
	};
	$(tds).each(function(index, element) {
		data.push([
			$(element).find('td:eq(0)').html(),
			parseFloat($(element).find('td:eq(1)').html()),
			parseFloat($(element).find('td:eq(2)').html()),
			parseFloat($(element).find('td:eq(3)').html())
		]);
		total.threads += parseFloat($(element).find('td:eq(1)').html());
		total.referrals += parseFloat($(element).find('td:eq(2)').html());
		total.earnings += parseFloat($(element).find('td:eq(3)').html());
	});
	if(data[data.length - 1][3] == 0){ 
		data.pop();
	}
	
	// Last 5 days data
	var last5 = {
		threads: 0,
		referrals: 0,
		earnings: 0
	};
	if(data.length >= 5){
		for(var i = data.length - 5; i < data.length; i++){
			last5.threads += data[i][1];
			last5.referrals += data[i][2];
			last5.earnings += data[i][3];
		}
	}
	
	unsafeWindow.AdvGraph_data = data;
	
	// Average from data.
	var a = total.earnings/data.length;
	stats_dl.append('<dt>Average daily earning:</dt><dd>'+round(a,4)+' $</dd>');
	
	var a = 50/(total.earnings/data.length);
	stats_dl.append('<dt>Days to collect 50$:</dt><dd>'+round(a)+' days</dd>');
	
	if(balance < 50){
		var a = (50-balance)/(total.earnings/data.length);
		stats_dl.append('<dt>Remaining days to collect 50$:</dt><dd>'+round(a)+' days</dd>');
	}
	
	// Based on last 5 days
	if(data.length >= 5){
		var a = last5.earnings/5;
		stats_dl.append('<dt>Average last 5 days earning:</dt><dd>'+round(a,4)+' $</dd>');
		
		var a = 50/(last5.earnings/5);
		stats_dl.append('<dt>Days to collect 50$ on 5 days average:</dt><dd>'+round(a)+' days</dd>');
		
		if(balance < 50){
			var a = (50-balance)/(last5.earnings/5);
			stats_dl.append('<dt>Remaining days to collect 50$ on 5 days average:</dt><dd>'+round(a)+' days</dd>');
		}
	}

	// Create chart.
	var line_data = google.visualization.arrayToDataTable(data);
	
	var line_options = {
		title: 'Advanced Stats:',
		width:980,
		height:250,
	};
	
	var line_chart = new google.visualization.LineChart(document.getElementById('line_chart_div'));
	line_chart.draw(line_data, line_options);
};