// ==UserScript==
// @name           lazygirls.info
// @description    Automatic fetch "Full Size" images on lazygirls.info
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @include        http://www.lazygirls.info/*/*
// @include        http://lazygirls.info/*/*
// ==/UserScript==


//=========================================================================
// copied'n'pasted from Google-Multi-Login GMscript.
var version_scriptURL = "http://userscripts.org/scripts/source/20497.user.js";
var version_timestamp = 1399241486074;
if(parseInt(GM_getValue("lastUpdate","0"))+86400000<=(new Date().getTime())){GM_xmlhttpRequest({method:"GET",url:version_scriptURL+"?"+new Date().getTime(),headers:{'Cache-Control':'no-cache'},onload:function(xhrResponse){GM_setValue("lastUpdate",new Date().getTime()+"");if(parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(xhrResponse.responseText)[1])>version_timestamp){if(confirm("There is an update available for the Greasemonkey script \""+xhrResponse.responseText.split("@name")[1].split("\n")[0].replace(/^\s+|\s+$/g,"")+".\"\nWould you like to go to the install page now?")){GM_openInTab(version_scriptURL);}}}});}
//=========================================================================

var $;

// Add jQuery
(function(){
  if (typeof unsafeWindow.jQuery == 'undefined') {
    var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
        GM_JQ = document.createElement('script');

    GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
    GM_JQ.type = 'text/javascript';
    GM_JQ.async = true;

    GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
  }
  GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
  if (typeof unsafeWindow.jQuery == 'undefined') {
      window.setTimeout(GM_wait, 100);
  } else {
      $ = unsafeWindow.jQuery.noConflict(true);
      letsJQuery();
  }
}

// All your GM code must be inside this function
function letsJQuery() {
	var $fullsize_a = $("a[href*='display=fullsize']")
	if ($fullsize_a.length > 0) {
		var fullsize_href = $fullsize_a.attr('href')
		var resize = function(){}; /* Override built-in resize function */

		$.get(fullsize_href, function(data){
		  var fsrc = $(data).find("a:contains('View original image')").attr('href')
		  var $fullsize_img = $("a[data-image-url*='sized'] > img")
		  $fullsize_img.attr('src', fsrc)
		  $fullsize_img.attr('height', '100%')
		  $fullsize_img.attr('width', '100%')
		  $fullsize_a.text('Full size loaded (' + fsrc.length + ')')
		  window.document.title = fsrc.length + window.document.title
		})
	}
}
