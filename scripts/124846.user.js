// ==UserScript==
// @name           pbfilter
// @namespace      pbfilter
// @include        http://forum.pressball.by/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
	var names = ["straus-", "\u041f\u0440\u0430\u0440\u043e\u0447\u044b"]
	names.forEach(function(name){ $("a:contains('" + name + "')").each(function(index){ $(this).parents()[3].style["display"] = "none"; }); });
}

function run()
{
	// load jQuery and execute the main function
	addJQuery(main);
}

if (navigator.appName == "Opera")
	window.onload = run;
else
	run();

