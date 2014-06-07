// ==UserScript==
// @name Twitter API RemainingHits Meter
// @namespace twitter_remaining_hits_meter
// @description Twitter API RemainingHits Meter.
// @updateURL https://userscripts.org/scripts/source/118850.meta.js
// @run-at document-end
// @include http://twitter.com/*
// @include https://twitter.com/*
// @version 0.2.1
// ==/UserScript==

(function() {
var source = function() { // source code

var INTERVAL = 60 * 1000;

var main = function() { // main logic

var $El = function(tagName, attributes) {
	var e = $(document.createElement(tagName));
	attributes && e.attr(attributes);
	return e;
};
var meterGauge = $El('div', { 'class':'meter-gauge meter-remaining-color' });
var hitsTip = $El('div', { 'class':'meter-hits' });
var resetTip = $El('div', { 'class':'meter-reset' });
meterGauge.append($El('div', { 'class':'meter-tip' }).append(hitsTip).append(resetTip));
$('.bird-topbar-etched').append($El('div', { 'class':'meter-frame-new meter-used-color' }).append(meterGauge));

var updateMeter = function(status) {
	if (status) {
		var resetTime = 'reset time: ' + new Date(status.reset_time_in_seconds * 1000).toLocaleTimeString();			
		var per = Math.floor(status.remaining_hits / status.hourly_limit * 100) + '%';
		var hits = status.remaining_hits + ' / ' + status.hourly_limit;
		hitsTip.text(hits);
		resetTip.text(resetTime);
		meterGauge.css({ 'width': per }); 
	}
};

var fetchStatus = function() { twttr.anywhere.api.util.makeRemoteRequest('account/rate_limit_status', null, { success: updateMeter }); };
setInterval(fetchStatus, INTERVAL);

meterGauge.bind('ajaxSuccess', function(event, xhr, options) {
		if (xhr.getResponseHeader('X-RateLimit-Class') != 'api_phoenix') {
				return;
		}
		var status = {};
		status.hourly_limit = parseInt(xhr.getResponseHeader('X-RateLimit-Limit'), 10);
		status.remaining_hits = parseInt(xhr.getResponseHeader('X-RateLimit-Remaining'), 10);
		status.reset_time_in_seconds = parseInt(xhr.getResponseHeader('X-RateLimit-Reset'), 10);
		updateMeter(status);
});

fetchStatus();

}; // /main logic

// load
(function(tryCount) {
	if (tryCount < 20 && !(window.jQuery)) {
		var callee = arguments.callee;
		setTimeout(function() { callee(tryCount + 1); }, 60);
		return;
	}
	main();
})(0);

}; // /source code

var cssArry = [
	'.meter-frame-new { ' + 
		'margin-top: 22px;' +
		'margin-left: -40px;' +
		'float: left;' + 
		'height: 6px;' + 
		'width: 105px;' + 
		'border-radius: 20px;' +
		'box-shadow: inset 0 -1px 1px rgba(255,255,255,0.3);' +
	'}',
	'.meter-frame { ' + 
		'margin-top: -9px;' +
		'margin-left: 20px;' +
		'float: left;' + 
		'height: 6px;' + 
		'width: 105px;' + 
		'border-radius: 20px;' +
		'box-shadow: inset 0 -1px 1px rgba(255,255,255,0.3);' +
	'}',
	'.meter-gauge { ' + 
		'height: 100%;' +
		'border-radius: 20px 8px 8px 20px;' +
		'box-shadow: ' +
			'inset 0 2px 9px	rgba(255,255,255,0.3),' +
			'inset 0 -2px 6px rgba(0,0,0,0.4);' +
		'position: relative;' +
	'}',
	'.meter-used-color { background: rgb(249,62,47); }',
	'.meter-remaining-color { background: rgb(43,194,83); }',
	'.meter-tip { ' + 
		'display: none;' +
		'position: absolute;' +
		'border-radius: 8px;' +
		'color: rgb(200,200,200);' +
		'background: rgb(90,90,90);' +
		'line-height: 1.5;' +
		'top: 14px;' +
		'left: -7px;' +
		'width: 120px;' +
	'}',
	'.meter-hits { ' + 
		'font-size: 20px;' +
		'text-align: center;' +
	'}',
	'.meter-reset { ' + 
		'font-size: 11px;' +
		'text-align: center;' +
	'}',
	'.bird-topbar-etched:hover .meter-tip {' +
		'display: inline;' +
	'}'
];
var style = document.createElement('style');
style.type = 'text/css';
document.getElementsByTagName('head')[0].appendChild(style);
var sheet = style.sheet;
for (var i = 0; i < cssArry.length; i++){
	sheet.insertRule(cssArry[i], sheet.cssRules.length);
}

var script = document.createElement('script');
script.type = 'text/javascript';
script.innerHTML = '(' + source.toString() + ')();';
document.body.appendChild(script);

})();
