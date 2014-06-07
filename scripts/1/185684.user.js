// ==UserScript==
// @name           Haberler.Com - Stop Video AutoPlay
// @description    Stops Video Auto-Play on Haberler.com to save bandwidth and allow multiple tabs
// @version        1.4
// @date           10.12.2013
// @namespace      http://userscripts.org/users/volkan
// @author         Volkan K.
// @include        http://www.haberler.com/*
// @include        http://*.haberler.com/*
// @include        http://haberler.com/*
// @include        http://www.haberler.com.nyud.net/*
// @include        http://*.haberler.com.nyud.net/*
// @include        http://haberler.com.nyud.net/*
// @run-at         document-end
// ==/UserScript==

function contentEval(source, remove) {
  // Check for function input.
  if ('function' == typeof source) {
    // Execute this function with no arguments, by adding parentheses.
    // One set around the function, required for valid syntax, and a
    // second empty set calls the surrounded function.
    source = '(' + source + ')();'
  }

  // Create a script node holding this  source code.
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  if (!(remove==false)){
	setTimeout(function(){document.body.removeChild(script);},1000);
  }
}

var abuziddin=function() { 
	var auto = false;
	auto = false;
	window.auto = false;

	if ('undefined' != typeof jwplayer) {
		jwplayer().stop();
		jwplayer("myElement").stop();
		window.addEventListener("DOMNodeInserted", function(){
			jwplayer().stop();
			jwplayer("myElement").stop();
		},false);
	}
}
var abuziddin_script=String(abuziddin);
abuziddin_script = abuziddin_script.replace(/^\s*function +[^(]*\([^)]*\) ?\{/i, "");
abuziddin_script = abuziddin_script.replace(/\}\s*$/i, "");

contentEval(abuziddin_script);
