// ==UserScript==
// @name           Class-central: day counter
// @description    Adds a counter of remaining days to course launch, or indicates how far in the past the course has started.
// @version        0.01
// @namespace      http://sepczuk.com
// @include         http://www.class-central.com/*
// @match           http://www.class-central.com/*
// @copyright       2012, Damian Sepczuk
// @downloadURL     https://userscripts.org/scripts/source/135281.user.js
// @updateURL       https://userscripts.org/scripts/source/135281.meta.js
// ==/UserScript==

/*
 * Class-central: day counter
 * (c) 2012 Damian Sepczuk <damian@sepczuk.com>
 * MIT license
 */

function mainWrapper(){
var tables = $('#recentlist, #upcominglist, #ongoinglist, #pastlist')

var now = Date.now();
var dayInMilisec = 1000*60*60*24;

var getSIfNeeded = function(v) {return v>1?'s':''};
$('tr td[data-timestamp]', tables).each(function(e){
	var jThis = $(this);
	var courseStartDate = new Date(parseInt(jThis.attr('data-timestamp'))*1000);
	var daysRemaining = parseInt((courseStartDate-now)/dayInMilisec);
	var isAgo = daysRemaining<0;
	daysRemaining = Math.abs(daysRemaining);
	if (isAgo)
		this.innerHTML += ' (' + daysRemaining + ' day'+getSIfNeeded(daysRemaining)+' ago)';
	else
		this.innerHTML += ' (in ' + daysRemaining + ' day'+getSIfNeeded(daysRemaining)+')';
});
}
  
if (!document.xmlVersion) {
    var script = document.createElement('script');
    script.appendChild(document.createTextNode('('+ mainWrapper +')();'));
    document.documentElement.appendChild(script);
}