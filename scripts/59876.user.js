// ==UserScript==
// @name           Research Time Remain
// @namespace      none
// @description    Details the remaining time for research
// @include        http://*.ikariam.*/index.php?view=researchAdvisor*
// @exclude        http://board.ikariam.com/*
// ==/UserScript==


var liList = document.getElementsByTagName("li");
var points = -1;
var perHour = -1;

for(var i=0;liList.length>i;i++) {
	var tag = liList.item(i);

	if(tag.className == 'points') {
		var tmp = tag.innerHTML.split(' ')[2];
		var a = tmp.split(',');
		if(a.length>1) {
			points = "";
			for(var j=0;a.length>j;j++)
			points = points + "" + a[j];
		} else {
			points = a[0];
		}
	} else if(tag.className == 'time') {
		var tmp = tag.innerHTML.split(' ')[2];
		var a = tmp.split(',');
		if(a.length>1) {
			perHour = a[0] + "" + a[1];
		} else {
			perHour = a[0];
		}
	} 
	if(points != -1 && perHour != -1) {
		break;
	}
}	

for(var i=0;liList.length>i;i++) {
	var tag = liList.item(i);

	if(tag.className == 'researchPoints') {
		var researchPoints = '';
		var rawPoints = tag.innerHTML;
		var a = rawPoints.split(',');

		if(a.length>1) {
			for(var j=0;a.length>j;j++)
			researchPoints = researchPoints + "" + a[j];
		} else {
			researchPoints = a[0];
		}

		if(((researchPoints - points) > 0) && perHour > 0) {
			var hours = (researchPoints - points)/perHour;
			var mins = (((researchPoints - points)%perHour)/perHour) * 60;
			mins = parseInt(mins);
			var days = 0;
			if(hours >= 24) {
				days = parseInt(hours/24);
				hours = parseInt(hours%24);
			} else {
				hours = parseInt(hours);	
			}
			if(days==0) {
				tag.innerHTML = rawPoints + ' <div style="white-space:nowrap; font-size:smaller">(' + hours + ' hours ' + mins + ' mins)</div>';
			} else {
				tag.innerHTML = rawPoints + ' <div style="white-space:nowrap; font-size:smaller">(' + days + ' days ' + hours + ' hours ' + mins + ' mins)</div>';
			}
		}
	}
}
