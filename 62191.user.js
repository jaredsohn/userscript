// ==UserScript==
// @name           MouseHunt Friend's History
// @namespace      hirak99
// @version        4
// @include        http://apps.facebook.com/mousehunt/scoreboard.php*
// @require        http://code.jquery.com/jquery.js
// @require        http://people.iola.dk/olau/flot/jquery.flot.js
// ==/UserScript==

var timeDiffs = [
	[12*60,1*60],	// 1 hours till half a day
	[24*60,3*60],	// 3 hours till one day ago
	[7*24*60,12*60],  // half day for day to week
	[30*24*60,24*60], // a day beyond week till month
	[6*30*24*60,3*24*60], // 3 days till 6 months
	[,7*24*60] // 7 days beyond that
	];

function getTimeDiff(minutes) {
	for (var i=0; i<timeDiffs.length-1; ++i) {
		if (minutes<=timeDiffs[i][0]) break;
	}
	return timeDiffs[i][1];
}

var fullHistory = JSON.parse(GM_getValue('fullHistory','{}'));

var updateFrequency = 3*60;  // In minutes

function updatefullHistory(id,time,vars) {
	var stats;
	if (fullHistory[id]!=null) {
		stats=fullHistory[id];
		//if (time-stats[stats.length-1][0]<updateFrequency) return;
	}
	else stats = [];
	stats.push([time,vars]);
	fullHistory[id]=stats;
}

var displayedIds=[];
function update() {
	var time = Math.floor(new Date().getTime()/(1000*60));	// In minutes
	var table=document.getElementsByClassName('scoretable');
	if (table.length==0) return;
	var trs = table[0].getElementsByTagName('tr');
	for (var i=1; i<trs.length-1; ++i) {
		var tr = trs[i];
		var id = tr.className.substr(4);
		displayedIds.push(id);
		var td = tr.getElementsByTagName('td');
		var vars={};
		//vars.rank = td[0].innerHTML;
		vars.title = td[1].getAttribute('title');
		vars.name = td[2].getElementsByTagName('a')[0].innerHTML;
		vars.points = parseInt(td[3].innerHTML.replace(/,/g,''));
		vars.gold = parseInt(td[4].innerHTML.replace(/,/g,''));
		vars.mice = parseInt(td[5].innerHTML.replace(/,/g,''));
		//print(JSON.stringify(vars));
		updatefullHistory(id,time,vars);
	}
	//print(JSON.stringify(fullHistory));
}

function getLastStat(id,stat) {
	var hist = fullHistory[id];
	return hist[hist.length-1][1][stat];
}

function getName(id) {
	return getLastStat(id,'name');
}

function createData(id,stat) {
	var time=new Date();
	var tzOffset = time.getTimezoneOffset();
	var hist=fullHistory[id];
	var label=getName(id);
	var result = [];
	for (var i=0; i<hist.length; ++i)
		result.push([(hist[i][0]-tzOffset)*60*1000,hist[i][1][stat]]);
	var last = result[result.length-1];
	//result.push([time.getTime()-tzOffset*60*1000,last[1]]);
	return {label:label,data:result};
}

function plot(stat) {
	$('div.scorediv').before('<div class="frhist"><div class="frhistgr" style="width:700px;height:600px;margin-left:auto;margin-right:auto;"/></div>');
	var allData=[];
	for (var k=0; k<displayedIds.length; ++k)
		allData.push(createData(displayedIds[k],stat));
	//alert(JSON.stringify(allData));
	$.plot($('div.frhistgr'), 
			allData,
			{
				xaxis: {mode: 'time'},
				legend: {position: 'nw', noColumns: 2}
				//,yaxis: {min: 5000000,max: 10000000}
			});
	//alert(forecastHtml(stat));
	$('div.frhist').append(forecastHtml(stat));
	$('div.frhist').hide();
	$('div.frhist').slideDown('slow');
}

function getAlphaBeta(id,period,stat,time /* in minutes */) {
	// Returns alpha & beta from current time as base
	// period: atleast this many minutes will be considered for forecast
	var hist = fullHistory[id];
	if (hist.length<2) return null;
	var l1=hist.length-1,l2=hist.length-1;
	while (l1>=0 && (hist[l2][0]-hist[l1][0]<period)) l1--;
	if (l1<0) l1=0;
	var x1=hist[l1][0]-time,x2=hist[l2][0]-time;
	var y1=hist[l1][1][stat],y2=hist[l2][1][stat];
	var beta = (y2-y1)/(x2-x1);
	var alpha = y1-beta*x1;
	return [alpha,beta];
}

function getAllForecasts(stat,period) {
	var forecasts=[];
	var time = new Date().getTime()/1000/60;
	for (var i=0; i<displayedIds.length; ++i) {
		var id1=displayedIds[i];
		var albe1=getAlphaBeta(id1,period,stat,time);
		if (albe1==null) continue;
		for (var j=i+1; j<displayedIds.length; ++j) {
			var id2=displayedIds[j];
			var albe2=getAlphaBeta(id2,period,stat,time);
			if (albe2==null) continue;
			var x = ((albe1[1]==albe2[1])?null:-(albe1[0]-albe2[0])/(albe1[1]-albe2[1]));
			if (x>0) {
				var y = albe1[0]+albe1[1]*x;
				var swap = getLastStat(id1,stat)>getLastStat(id2,stat);
				forecast={id1:(swap?id2:id1),id2:(swap?id1:id2),time:x,stat:y}
				forecasts.push(forecast);
			}
		}
	}
	return forecasts;
}

function minutesString(number) {
	number = Math.floor(number);
	var units = ["minute",60,"hour",24,"day",30,"month"];
	var result = "";
	for (var i=0; i<=(units.length-1)/2; ++i) {
		var modby=(2*i+1>=units.length?number+1:units[2*i+1]);
		var t = number % modby;
		if (t>0) result = t + " " + units[2*i] + (t>1?'s ':' ') + result;
		number=Math.floor(number/modby);
	}
	return result;
}
//alert(minutesString(30*24*60));

function randomColor() {
	var r,g,b;
	do {
		r = Math.floor(Math.random()*256);
		g = Math.floor(Math.random()*256);
		b = Math.floor(Math.random()*256);
	} while ((r+g+b)/3>200 || (r+g+b)/3<70);
	return 'rgb('+r+','+g+','+b+')';
}

var colors={};
function stringColor(str) {
	var sum=0;
	for (var i=0; i<str.length; ++i) sum+=str.charCodeAt(i);
	if (colors[sum]==null) colors[sum]=randomColor();
	return '<font style="color:'+colors[sum]+'">'+str+'</font>';
}

function nameColor(name) {
	var color = getColorByName(name);
	return '<font style="color:'+color+'">'+name+'</font>';
}

function forecastHtml(stat) {
	var limit = 2*30*24*60;
	var forecasts = getAllForecasts(stat,3*24*60);
	forecasts.sort(function(a,b) {return a.time-b.time;});
	//alert(JSON.stringify(forecasts));
	var result="<p><u>Forecast for the next "+minutesString(limit)+"</u></p>";
	for (var i=0; i<forecasts.length; ++i) {
		if (forecasts[i].time>limit) continue;
		result+='<p>'
			+ '<b>' + nameColor(getName(forecasts[i].id1)) + '</b>' +' ('+getLastStat(forecasts[i].id1,stat)+')'
			+ ' to overtake '
			+ '<b>' + nameColor(getName(forecasts[i].id2)) + '</b>' +' ('+getLastStat(forecasts[i].id2,stat)+')'
			+ ' in '
			+ minutesString(forecasts[i].time)
			+ ' (at mutual '+stat+' '+Math.floor(forecasts[i].stat)+')'
			+ '</p>';
	}
	//alert(result);
	return result;
}

function compactHistory(hist) {
	if (hist.length==0) return [];
	
	var now = (new Date());
	now = Math.floor(now.getTime()/(1000*60));
	
	var result=[hist[0]];
	
	var prev = hist[0];

	for (var i=1; i<hist.length; ++i) {
		var diff = hist[i][0]-prev[0];
		var ago = now - hist[i][0];
		var allowedMinDiff = getTimeDiff(ago);
		if (diff>=allowedMinDiff) {result.push(hist[i]); prev=hist[i];}
	}
	
	return result;
}

function compactFullHistory() {
	var result = {};
	for(var key in fullHistory)
		result[key]=compactHistory(fullHistory[key]);
	fullHistory=result;
}

function getColorByName(name) {
	var labels = $('div.frhistgr').find('td.legendLabel');
	for (var i=0; i<labels.length; ++i)
		if (labels[i].innerHTML==name) break;
	if (i==labels.length) return '#000';
	var color = $('div.frhistgr').find('td.legendColorBox');
	color = color[i].childNodes[0].childNodes[0].style.border;
	color = color.match(/rgb(.*)/)[0];
	//alert(color);
	return color;
}

update();
//alert(JSON.stringify(fullHistory));
plot('points');

//console.log(fullHistory);
compactFullHistory();
//console.log(fullHistory);

GM_setValue('fullHistory',JSON.stringify(fullHistory));
