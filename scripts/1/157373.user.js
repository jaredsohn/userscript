// ==UserScript==
// @name        Steam Web Chat - SteamRep Integration
// @namespace   userscripts.mattie.net
// @include     http://steamcommunity.com/chat*
// @version     3
// @require     http://cdn.steamcommunity.com/public/javascript/jquery-1.8.3.min.js
// @require     https:/steamrep.com/js/beta2/steamrep_hover.js
// ==/UserScript==
(function() {

// Localize jQuery variable
var jQuery = {};

/******** Load jQuery if not present *********/
if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.8.3') {
    var script_tag = document.createElement('script');
    script_tag.setAttribute("type","text/javascript");
    script_tag.setAttribute("src",
        "http://cdn.steamcommunity.com/public/javascript/jquery-1.8.3.min.js");
    if (script_tag.readyState) {
      script_tag.onreadystatechange = function () { // For old versions of IE
          if (this.readyState == 'complete' || this.readyState == 'loaded') {
              scriptLoadHandler();
          }
      };
    } else {
      script_tag.onload = scriptLoadHandler;
    }
    // Try to find the head, otherwise default to the documentElement
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
} else {
    // The jQuery version on the window is the one we want to use
    jQuery = window.jQuery;
    main();
}

/******** Called once jQuery has loaded ******/
function scriptLoadHandler() {
    // Restore $ and window.jQuery to their previous values and store the
    // new jQuery in our local jQuery variable
    jQuery = window.jQuery.noConflict(true);
    // Call our main function
    main(); 
}

function main() 
{
	jQuery(function() {
		jQuery('.friendslist_entry').click(function(){
			steamrep_addHoverToUrls('a[href^="http://steamcommunity.com/profiles/"].persona');}
		);
		
	});
}
})();
