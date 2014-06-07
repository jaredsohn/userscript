// ==UserScript==
// @name           Mousehunt: Better Title
// @namespace      hirak99
// @description    Enhanced title for Mousehunt
// @version        2
// @include        http://apps.facebook.com/mousehunt/*
// ==/UserScript==


var labels = document.getElementsByClassName('hudstatlabel');

function getStat(statname) {
	for (var i=0; i<labels.length; ++i) {
		if (labels[i].innerHTML==statname+':') {
			var x=labels[i].parentNode.innerHTML;
			var y=x.lastIndexOf('&nbsp;');
			return x.substr(y+6);
		}
	}
	return null;
}

function getFullStat(statname) {
	return statname + ': ' + getStat(statname);
}

//document.title = getFullStat('Gold')+' '+getFullStat('Cheese')+' '+getFullStat('Points');

function shortCheese() {
	var cheese = getStat('Cheese').match('[^(]+').toString().trim().split(' ');
	if (cheese.length>1) return cheese.map(function(x) {return x[0]}).join('');
	else return cheese[0].substr(0,2);
}

document.title = getStat('Gold')+'g - '
	+getStat('Cheese').match('[0-9,]+')
	+'c['+shortCheese()+'] - '
	+getStat('Points')+'p - '
	+'MouseHunt'
	;
