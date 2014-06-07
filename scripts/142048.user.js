// ==UserScript==
//
//Displayable Name of your script 
// @name           versionOneUIImprovements
//
// brief description
// @description    Makes various improvements to the terrible UI of VersionOne
//
//URI (preferably your own site, so browser can avert naming collisions
// @namespace      http://www.userscript.org
//
// If you want to license out
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
//
//Version Number
// @version        1.0
//
// @history        1.0 first version
//
// @match http://*/*
//
// ==/UserScript==


var main = function () {


	function toggleExpander(text) {
		var $expander = text.find('.expander');
		var $collapser = text.find('.collapser');
		text.find('.value').toggleClass('collapsed-text');
		expander.toggleClass('hidden');
		collapser.toggleClass('hidden');
	}

	$(toggleExpander($('.expandable-text:first')));

};

// Inject our main script
var script = document.createElement('script');
script.type = "text/javascript";
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);

