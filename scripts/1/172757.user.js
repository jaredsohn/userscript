// ==UserScript==
// @name        Digging ore bot for sofiawars
// @namespace   DiggingOreBot
// @description digging ore into metro
// @include     http://classic.sofiawars.com/metro/
// @run-at document-end
// @version     1
// @grant       none
// ==/UserScript==

(function() {
	
var metroWorkButton = $("div[class='button'][onclick^='metroWork()']");
var metroDigButton = $("button[class='button'][onclick^='metroDig()']");
var metrodigTimeline = $("td[id='metrodig']");
var runFromRatButton = $("button[onclick^='metroLeave2']");

var simulateClick = function(element) {
    element.trigger("click");
}

if (metroWorkButton.length && metroWorkButton.is(":visible")) {
	simulateClick(metroWorkButton);
} else if(metroDigButton.length && metroDigButton.is(":visible")) {
	simulateClick(metroDigButton);
} else if(metrodigTimeline.length && /(?:[0-9]{2}:){2}[0-9]{2}/.test(metrodigTimeline.get(0).innerHTML)) {
	/**
	 * Look very simple but here is the magic. onTimerCompleteEvent is function located in
	 * sofiawars site. It do two ajax requests and if there is no rats show dig button.
	 * We want to click dig button after button is displayed.
	 */
	window.onTimerCompleteEvent = (function(originalFunc)
	{
		return function(type) {
			originalFunc.call(this, type);
			simulateClick(metroDigButton);
		}
	})(window.onTimerCompleteEvent);
	
} else if(runFromRatButton.length &&  runFromRatButton.is(":visible")) {
	simulateClick(runFromRatButton);        
} else {
	window.setTimeout(function(){
		window.location.href = "http://www.sofiawars.com/metro/";
	}, 300000);		    
}

})();
