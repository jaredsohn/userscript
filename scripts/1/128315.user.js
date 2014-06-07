// ==UserScript==
// @name           Digitized-Reality Image Navigation
// @namespace      drin
// @description    Image navigation
// @include        *.digitized-reality.de*
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}


// the guts of this userscript
function main() {
	jQuery.fn.exists = function(){return this.length>0;}
	function checkKey(e){
			 switch (e.keyCode) {
					case 37:
							if($('a[title="vorherige Datei anzeigen"]').exists()){
								window.location = $('a[title="vorherige Datei anzeigen"]').attr('href');
								break;
							}
					case 39:
							if($('a[title="nächste Datei anzeigen"]').exists()){
								window.location = $('a[title="nächste Datei anzeigen"]').attr('href');
								break;
							}
					default:
							}      
	}
	
	if ($.browser.mozilla) {
			$(document).keypress (checkKey);
	} else {
			$(document).keydown (checkKey);
	}
}

// load jQuery and execute the main function
addJQuery(main);