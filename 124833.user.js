// ==UserScript==
// @name            Chrome Ad Killer
// @author			Xandir
// @description     Kill that annoying Chrome Ad on the Google Homepage
// @license         Creative Commons Attribution License
// @version	        0.1
// @include			http://www.google.com
// @released        2012-02-01
// @compatible      Greasemonkey
// ==/UserScript==
 
/* 
 * This file is a Greasemonkey user script. To install it, you need 
 * the Firefox plugin "Greasemonkey" (URL: http://greasemonkey.mozdev.org/)
 * After you installed the extension, restart Firefox and revisit 
 * this script. Now you will see a new menu item "Install User Script"
 * in your tools menu.
 * 
 * To uninstall this script, go to your "Tools" menu and select 
 * "Manage User Scripts", then select this script from the list
 * and click uninstall :-)
 *
 * Creative Commons Attribution License (--> or Public Domain)
 * http://creativecommons.org/licenses/by/2.5/
*/
 
(function(){
 
    //object constructor
    function example(){
 
        // modify the stylesheet
        this.append_stylesheet('.pmoabs { visibility:hidden; }');
 
    };
 
    //create a stylesheet
    example.prototype.append_stylesheet = function(css){
 
        var styletag = document.createElement("style");
        styletag.setAttribute('type', 'text/css');
        styletag.setAttribute('media', 'screen');
        styletag.appendChild(document.createTextNode(css));
 
        document.getElementsByTagName('head')[0].appendChild(styletag);
 
    };
 
    //instantiate and run 
    var example = new example();
 
 
})();