// ==UserScript==
// @name        CMS
// @namespace   http://cms.0pb.org/
// @description Adaptation du CMS
// @version     1
// @grant       none
// ==/UserScript==

// Limit width
var listPre = document.getElementsByTagName('pre');
if (listPre.length > 0) {
	for (var i in listPre) {
		var pre = listPre[i];
		pre.setAttribute('style', 'max-width: 1000px');
	}
}
// Add date of page
function elapsedTime() {
	var span = document.getElementById('elapsedTime');
	if (!span) return;
	var now = new Date();
	var time = new Date(now.getTime() - span.getAttribute('createdat'));
	var strTime = (time.getMinutes() < 10 ? '0' : '') + time.getMinutes() + '\'' + (time.getSeconds() < 10 ? '0' : '') + time.getSeconds() + '"';
	if (time.getHours() > 1) {
		strTime = (time.getHours() <= 10 ? '0' : '') + (time.getHours() - 1) + 'h' + strTime;
	}
	span.replaceChild(document.createTextNode(' (' + strTime + ' ago)'), span.firstChild);
	setTimeout(elapsedTime, 200);
}
var parent = document.getElementById('region-content');
var listDl = parent.getElementsByTagName('dl');
var span = document.createElement('span');
var now = new Date();
span.setAttribute('id', 'elapsedTime');
span.setAttribute('createdAt', now.getTime());
span.appendChild(document.createTextNode(''));
if (listDl.length > 0) {
	for (var i in listDl) {
		var dl = listDl[i];
		if ('portalMessage info' == dl.getAttribute('class') && dl.getAttribute('style') != 'display:none') {
			var dd = dl.getElementsByTagName('dd');
			if (dd.length > 0) {
				dd[0].appendChild(span);
				setTimeout(elapsedTime, 30000);
				break;
			}
		}
	}
}