// ==UserScript==
// @name          Silverlight GPU Acceleration 
// @description   Force gpu accelerated silverlight
// @match         *
// @include       *
// ==/UserScript==

// Inject enable gpu acceleration parameters to silverlight
// videos created with createObjectEx. Experiment with the
// enableCacheVisualization = 'true' and enableFrameRateCounter='true'
// Will supposedly only give benefits in fullscreen mode.
// Will probably cause bugs, so just enable for some sites.

function runScript() {

	if(/Opera|Safari|Epiphany|Chrome|Midori/.test(navigator.userAgent)) {
		unsafeWindow = window;
	}	
	
	unsafeWindow.Silverlight.createObjectEx = (function() {
	  var original = unsafeWindow.Silverlight.createObjectEx;
	  return function(params) {
		params.properties.enableGpuAcceleration = 'true';
		params.properties.enableCacheVisualization = 'false';
		params.properties.enableFrameRateCounter = 'false';
		params.properties.windowless = 'false';
		return original(params);
	  };
	})(); 
	
}
	
if(/Chrome/.test(navigator.userAgent)) {
    var script = document.createElement("script");
    script.type = "application/javascript";
    script.textContent = "(" + runScript + ")();";
    document.body.appendChild(script);
} else {
    runScript();
}