// ==UserScript==
// @name           Reddit Collapse Children
// @namespace      Reddit
// @description    Collapses all child elements
// @include        http://www.reddit.com/*
// @author 		   T.J. Leahy - tjleahy.jr (at) gmail
// ==/UserScript==

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();


function letsJQuery() {
  makeMenuToggle('RCC_collapseByDefault', true, 'collapse initially', 'don\'t collapse initially', 'RCC');
  var comments = $('div.commentarea > div.sitetable > div.thing > div.child');
  comments.each(function(){
	var t=$(this);
	if (t.children().length > 0) t.prev().find('ul.buttons').append($('<li></li>').append($('<a href="#"><font color="#888888">toggle children</font></a>').click(function(e){
	  t.children('div').toggle();
	  e.preventDefault();
	})))});
	
	if (RCC_collapseByDefault) {
		comments.children('div').toggle()()
	}
}

//below function from GM_Toolkit by izzysoft http://userscripts.org/scripts/show/51832

/** Generate a toggle menu entry in the user script menu
 * Useful for booleans, like toggling a feature on/off
 * @function makeMenuToggle
 * @param string key name of the variable to toggle
 * @param boolean defaultVal default value if variable did not exist
 * @param string toggleOn what to display for toggleOn
 * @param string toggleOf what to display for toggleOff
 * @param optional string prefix what to display in front of toggleOn/toggleOff
 * @brief taken from Greasespot code snippets
 */
function makeMenuToggle(key, defaultValue, toggleOn, toggleOff, prefix) {
  // Load current value into variable
  window[key] = GM_getValue(key, defaultValue);
  // Add menu toggle
  GM_registerMenuCommand((prefix ? prefix+": " : "") + (window[key] ? toggleOff : toggleOn), function() {
    GM_setValue(key, !window[key]);
    location.reload();
  });
}
