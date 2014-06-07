// ==UserScript==
// @name Orkut MegaCity Addon
// @copyright 2011 - George Lima    
// @version 1.0.0.3
// @description Orkut Vostu Games Tools.
// @include        https://*.twitter.com*
// @include        https://twitter.com/#!/search/fb
// @include        http*://*.facebook.com*
// ==/UserScript==

// Launch app with correct window object
(function(w){MCAddon((typeof(unsafeWindow)!=='undefined')?unsafeWindow:w);})(window);


/**
 * Main
 * @param {Object} unsafeWindow
 */
function MCAddon(unsafeWindow) {

var DEBUG_MODE = false;

var scriptAppInfo = 
{
    appName: 'Orkut MegaCity Addon',
    appTag: 'OrkutMegaCityAddon_',
    appVer: '1.0.0.3',
    appUrl: 'http://professionalcode.net/',
    appUpdateInterval: 5
};

var url1, url2;
url1 = "https://twitter.com/#!/search/fb";
url2 = "http://www.facebook.com";
var a, links;
var tmp = "a";
var p, q;
links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) 
{
    a = links[i];
    for(var j = 0; j < url1.length; j++)
    {
	    tmp = a.href + "";
	    if(tmp.indexOf(url1) != -1)
	    {
	        p = tmp.indexOf(url1);
	        q = url2 + tmp.substring(p + url1.length, tmp.length);
	        a.href = q;
	    }
	}
}
};