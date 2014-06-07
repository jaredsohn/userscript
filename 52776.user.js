// ==UserScript==
// @name           DS - EinheitenImBau
// @namespace      none
// @include        http://de*.die-staemme.de/game*screen=train*
// @include        http://de*.die-staemme.de/game*screen=barracks*
// @include        http://de*.die-staemme.de/game*screen=stable*
// @include        http://de*.die-staemme.de/game*screen=garage*
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
	//make sure there is no conflict between jQuery and other libraries
	$.noConflict()
	//start custom jQuery scripting
	main();
}

function main(){
	var unitNames = new Array(
		/Speertr\u00E4ger/, /Schwertk\u00E4mpfer/, /Axtk\u00E4mpfer/, /[^er] Bogensch\u00FCtzen?/, 
		/Sp\u00E4her/, /Leichte Kavallerie/, /Berittener? Bogensch\u00FCtzen?/, /Schwere Kavallerie/, 
		/Rammb(o|\u00F6)cke?/, /Katapulte?/
	)
	var unitCount = unitNames.length;
	var unitQueueAmount = new Array();
	var unitBuildAmount;
	var unitAmountStr;
	var queueText;
	var buildText;
	
	for(var i = 0; i < unitCount; i++){
		unitQueueAmount[i] = 0;
	}
	
	$('table.main table.vis:has(tr.lit) tr').each(function(){
		queueText = $('td:eq(0)', $(this)).text();
		for(var i = 0; i < unitCount; i++){
			if(queueText.match(unitNames[i])){
				unitQueueAmount[i] += Number(queueText.match(/\d+/));
			}
		}
	});
	
	$('table.main table.vis:has(tr.row_a) tr').each(function(){
		buildText = $('td:eq(0)', $(this)).text();
		for(var i = 0; i < unitCount; i++){
			if(buildText.match(unitNames[i])){
				unitBuildAmount = $('td:eq(6)', $(this)).text().split('/');
				unitAmountStr = unitBuildAmount[0];
				unitAmountStr += '('+(Number(unitBuildAmount[0])+unitQueueAmount[i])+')';
				unitAmountStr += '/';
				unitAmountStr += unitBuildAmount[1];
				unitAmountStr += '('+(Number(unitBuildAmount[1])+unitQueueAmount[i])+')';
				$('td:eq(6)', $(this)).html(unitAmountStr);
			}
		}
	});
}