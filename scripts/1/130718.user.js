// ==UserScript==
// @name Gaia Easter 2012 Bunny claimer
// @id	gaia_easter_2012_bunny_claimer_tool
// @namespace	  eastern.2012.com.gaiaonline
// @description	Auto-collect the bunnies
// @license	GPL v3
// @include		*://www.gaiaonline.com/forum/
// @include		*://gaiaonline.com/forum/
// @include		*://www.gaiaonline.com/forum/*
// @include		*://gaiaonline.com/forum/*
// @version	1.0
// @author	M
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
	if( $('a[href*="/grant?c="]').length > 0 )
	{
		//Draw a random wait, from 0.5 to 2 sec.
		var numRand = 500 + Math.floor(Math.random()*1500);
		setTimeout(function(){
			var href = $('a[href*="/grant?c="]').attr('href');
			window.open(href,'_newtab');
			$('a[href*="/grant?c="]').remove();
		}, numRand);
	}
}

// load jQuery and execute the main function
addJQuery(main);