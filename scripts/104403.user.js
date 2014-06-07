// ==UserScript==
// @name           Tumblr /spotlight to /following
// @namespace      http://sidebr.tumblr.com/
// @description    Quick and dirty hack 
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// @include        http://www.tumblr.com/dashboard*
// @include        http://www.tumblr.com/tagged*
// @include        http://www.tumblr.com/likes*
// ==/UserScript==

/*

(C) 2011 Caleb Leung
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html

History
-------

2011-06-10 - Added /tagged and /likes to the inclusion list.
2011-06-09 - Turns out there is a better way. Using the same loading methods as Sidebr.
2011-06-08 - Created (There's probably a 'better' way than loading jQuery all for this.) (jQuery code from http://joanpiedra.com/jquery/greasemonkey/)

*/

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

function main() {
		jQuery.noConflict();
        var spotlightClass = jQuery(".add_and_remove");
		spotlightClass.attr('href','/following');
    }

var uagent = navigator.userAgent.toLowerCase();

if (uagent.search("firefox") > -1) main();
else addJQuery(main);