// ==UserScript==
// @name           MouseHunt History
// @namespace      hirak99
// @description    Monitor your gold, cheese, and points over time!
// @version        1.05
// @include        http://apps.facebook.com/mousehunt/*
// @require        http://code.jquery.com/jquery.js
// @require        http://people.iola.dk/olau/flot/jquery.flot.js
// ==/UserScript==

var timeDiffs = [
	[24*60,30],	// 30 minutes till one day ago
	[7*24*60,60],  // an hour for day to week
	[15*24*60,6*60], // 6 hours till 15 days ago
	[30*24*60,12*60], // 12 hours till month ago
	[,24*60] // 24 hours before that
	];

var stats = JSON.parse(GM_getValue('stats','[]'));
var labels = document.getElementsByClassName('hudstatlabel');

function getTimeDiff(minutes) {
	for (var i=0; i<timeDiffs.length-1; ++i) {
		if (minutes<=timeDiffs[i][0]) break;
	}
	return timeDiffs[i][1];
}

function compactStats(stats) {
	if (stats.length==0) return [];
	
	var now = (new Date());
	now = Math.floor(now.getTime()/(1000*60));
	
	var result=[stats[0]];
	
	var prev = stats[0];

	for (var i=1; i<stats.length; ++i) {
		var diff = Math.floor((stats[i][0]-prev[0])/1000/60);
		var ago = now - Math.floor(stats[i][0]/1000/60);
		var allowedMinDiff = getTimeDiff(ago);
		if (diff>=allowedMinDiff) {result.push(stats[i]); prev=stats[i];}
	}
	
	return result;
}

function getStat(statname) {
	var labels = document.getElementsByClassName('hudstatlabel');
	for (var i=0; i<labels.length; ++i) {
		if (labels[i].innerHTML==statname+':') {
			var x=labels[i].parentNode.innerHTML;
			var y=x.lastIndexOf('&nbsp;');
			var z = x.substr(y+6);
			if (z.indexOf('None!')>-1) return 'None! (0)';
			else return z;
		}
	}
	return null;
}

function objectsAreSame(x, y) { 
	var objectsAreSame = true; 
	for(var propertyName in x) { 
		if(x[propertyName] !== y[propertyName]) { 
			objectsAreSame = false; 
			break; 
		} 
	} 
	return objectsAreSame; 
} 

function updateStats() {
	var lastTime = (stats.length == 0 ? 0 : stats[stats.length-1][0]);

	var time = (new Date()).getTime();

	if (time - lastTime >= getTimeDiff(0) * 60 * 1000) {
		var snap = {};
		snap.location = getStat('Location');
		snap.cheeseName = getStat('Cheese').match('^[^(]+').toString().trim();
		snap.cheese = parseInt(getStat('Cheese').replace(/,/g,'').match('[0-9]+').toString());
		snap.gold = parseInt(getStat('Gold').replace(/,/g,''));
		snap.points = parseInt(getStat('Points').replace(/,/g,''));

		// If the same configuration is present for last two, remove the intermediate
		if (stats.length>=2) {
			var last1 = stats[stats.length-1][1];
			var last2 = stats[stats.length-2][1];
			if (objectsAreSame(last1,last2) && objectsAreSame(last1,snap)) {
				stats=stats.slice(0,stats.length-1);
			}
		}

		stats.push([time,snap]);

		GM_setValue('stats',JSON.stringify(stats));
	}
}

stats = compactStats(stats);
updateStats();

// Insert place holder

function createPlaceHolder(name) {
	var placeHolder = document.createElement('div');
	placeHolder.setAttribute('id',name);
	placeHolder.style.setProperty('width','600px','');
	placeHolder.style.setProperty('height','300px','');
	placeHolder.style.setProperty('align','center','');
	return placeHolder;
}

var hud = document.getElementById('app10337532241_hud');
var btn = document.createElement('div');
btn.innerHTML='<a style="color:#FFFF7F">[History]</a>';
btn.style.setProperty('position','relative','');
btn.style.setProperty('top','-30px','');
btn.style.setProperty('left','600px','');
btn.style.width='0px';
btn.style.height='0px';
hud.appendChild(btn);
//btn.setAttribute('onclick',"alert('clicked!');");
btn.addEventListener('click',toggleCharts,false);

var graphDrawn = false;
function toggleCharts() {
	if (!graphDrawn) {
		graphDrawn=true;
		drawCharts();
	} else {
		var x = $('#graphContainer');
		if (x.is(':visible')) x.slideUp('slow');
		else x.slideDown('slow');
	}
}

function interpolate(timePoint,statName) {
	for (var i=0; i<stats.length; ++i)
		if (stats[i][0]>timePoint) break;
	if (i==0) i=1;
	else if (i==stats.length) i=stats.length-1;
	var a=i-1,b=i;
	var p=(timePoint-stats[a][0])/(stats[b][0]-stats[a][0]);
	return stats[a][1][statName]*(1-p)+stats[b][1][statName]*p;
}

function plotTill(hours) {
	// Draw Graph
	var gold = [],points = [],cheese = [];
	var offset = (new Date()).getTimezoneOffset()*60*1000;
	var time = (new Date()).getTime();
	var cheeseName = '',location='';
	var events = [],markings=[];
	for (var i=0; i<stats.length; ++i) {
		// To start plotting from the previous point since where the points are within boundary
		if (i==stats.length-1 || (time-stats[i+1][0])/1000/60/60 < hours) {
			var x = stats[i][0]-offset;
			if (cheeseName!=stats[i][1].cheeseName) {
				if (cheeseName!='')
					markings.push({color: '#88f', lineWidth: 1,xaxis: {from: x, to: x}});
				cheeseName=stats[i][1].cheeseName;
				events.push([x,cheeseName,0]);
				cheese.push(null);
			}
			if (location!=stats[i][1].location) {
				if (location!='')
					markings.push({color: '#f88', lineWidth: 1,xaxis: {from: x, to: x}});
				location=stats[i][1].location;
				events.push([x,location,1]);
			}
			gold.push([x,stats[i][1].gold]);
			cheese.push([x,stats[i][1].cheese]);
			points.push([x,stats[i][1].points]);
		}
	}
	
	var start = time-offset-hours*60*60*1000<points[0][0]?points[0][0]:time-offset-hours*60*60*1000;
	var days = (points[points.length-1][0] - start)/1000/60/60/24;
	var statsMsg='';
	statsMsg+='<p>Points per day: '+((points[points.length-1][1] - interpolate(start+offset,'points'))/days).toFixed(0)+'</p>';
	statsMsg+='<p>Gold per day: '+((gold[gold.length-1][1] - interpolate(start+offset,'gold'))/days).toFixed(0)+'</p>';
	//statsMsg+='<p>Points per day: '+((points[points.length-1][1] - points[0][1])/days).toFixed(0)+'</p>';
	//statsMsg+='<p>Gold per day: '+((gold[gold.length-1][1] - gold[0][1])/days).toFixed(0)+'</p>';
	document.getElementById('historyStats').innerHTML=statsMsg;
    
	var options = {xaxis: {mode: 'time', max:time-offset},legend: {position: 'se'},grid: {markings: markings}};
	//alert(hours);
	options.xaxis.min=hours<99999?time-offset-hours*60*60*1000:points[0][0];

	var plot1=$.plot($("#PlotPlace1"), 
		[{data:points, label: 'Points'}],
		options);
	var plot2=$.plot($("#PlotPlace2"), 
		[{data:cheese, label: 'Cheese'},{data:gold, label: 'Gold',yaxis: 2}],
		options);
	//alert(events.join(','));
	for (var g=1; g<=2; ++g) {
		var bounds = [1e5,1e5];
		for (var i=events.length-1; i>=0; --i) {
			var o = ([plot1,plot2][g-1]).pointOffset({x: events[i][0], y: 0});
			$("#PlotPlace"+g).prepend('<div style="position:absolute;left:' + (o.left + 4) + 'px;top:' 
				+ (events[i][2]==0?20:40) + 'px;color:#'+(events[i][2]==0?'88f':'f88')+';font-size:smaller">'+events[i][1]+'</div>');
			var x = $("#PlotPlace"+g).children('div:first-child');
			if (o.left+4+x.width()<bounds[events[i][2]]) {
				bounds[events[i][2]]=o.left+4;
			}
			else x.hide();
		}
	}
}

function drawCharts() {
	var container = document.createElement('div');
	container.setAttribute('id','graphContainer');
	var footer = document.getElementById('app10337532241_contentcontainer');
	footer.parentNode.insertBefore(container,footer);
	var commands = document.createElement('div');
	var commandHTML = '';
	var periods = [[99999*24,'Full'],[12,'12 Hours'],[24,'1 Day'],[48,'2 Days'],[7*24,'7 Days'],[30*24,'1 Month'],
		[90*24,'3 Month'],[180*24,'6 Month'],[365*24,'1 Year'],[365*24*2,'2 Years']];

	var time = (new Date()).getTime();
	var maxDays = (time - stats[0][0])/1000/60/60;
	for (var i=0; i<periods.length; ++i) {
		commandHTML += '<a '
			+((i>=1 && periods[i][0]>maxDays)?'style="color:#DDDDDD;"':'')
			+'id="historyPeriod'+i+'">['+periods[i][1]+']</a> ';
	}
	commands.innerHTML = '<p>'+commandHTML+'</p><div id="historyStats"/>';
	container.appendChild(commands);
	//container.append('<div><p>'+commandHTML+'</p></div>');
	container.appendChild(createPlaceHolder('PlotPlace1'));
	container.appendChild(createPlaceHolder('PlotPlace2'));
	for (var i=0; i<periods.length; ++i) {
		var x = periods[i][0];
		(function(x) {
			document.getElementById('historyPeriod'+i).addEventListener('click',function() {plotTill(x);},false);
		}(x));
	}
	plotTill(99999);
	$('#graphContainer').hide();
	$('#graphContainer').slideDown('slow');
}