// ==UserScript==
// @name           Tumblr Sidebr
// @namespace      http://zetx.tumblr.com/
// @description    Restores your default tumblelog's sidebar to the dashboard. 
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// @include        http://*.tumblr.com/dashboard*
// @include        http://*.tumblr.com/tagged*
// ==/UserScript==

/*

(C) 2011 Caleb Leung
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html

History
-------

2011-06-08 - Cleaned up code. Created a stand-alone subdomain for sidebr. Added some help links including an FAQ.
2011-06-08 - Added a 'blank' sidebar while waiting for data to load into. (Thanks atesh for the idea ;) Using @require for Firefox to cache jQuery and the usual method to load for Chrome. Personally not a fan of embedding jQuery into the userscript.
2011-06-08 - Changed the way jQuery is loaded (using http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script); Using this method (http://3a2d29.com/greasemonky-to-safari-5-replacing-gmxmlhttpre) for loading in the tumblelog in hopes that it'll work with Safari (and hopefully Opera too!). Tested and works fine with FX and Chrome.
2011-06-08 - Added an @include for /tagged; honestly don't know what pages were/should show the sidebar
2011-06-08 - Updated so jQuery will play nicer with pre-existing js libraries
2011-06-08 - The ID I was using didn't exist if you didn't have multiple tumblelogs
2011-06-08 - Created (jQuery code from http://joanpiedra.com/jquery/greasemonkey/)

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
	
	var addy = jQuery("#user_channels a").attr('href');
	
	var container = '<ul class="right_column_section" id="sidebr"> <li class="selected"> <a href="' + addy + '" class="posts"> <div class="hide_overflow">Posts</div> <span class="count"></span> </a> </li> <!-- Followers --> <li class=""> <a href="' + addy + '/followers" class="followers"> <div class="hide_overflow">Followers</div> <span class="count"></span> </a> </li> <!-- Messages --> <li class=""> <a href="' + addy + '/messages" class="messages"> <div class="hide_overflow">Messages</div> <span class="count"></span> </a> </li> <!-- Drafts --> <li class=""> <a href="' + addy + '/drafts" class="drafts"> <div class="hide_overflow">Drafts</div> </a> </li> <!-- Queue --> <li class=""> <a href="' + addy + '/queue" class="queue"> <div class="hide_overflow">Queue</div> <span class="count"></span> </a> </li> </ul>';
		jQuery("ul.right_column_section:eq(1)").after(container);
		
		
		var httpRequest = new XMLHttpRequest();
		 
			httpRequest.open('GET',addy,true);
			httpRequest.setRequestHeader("Method", "GET " + addy + " HTTP/1.1");
			httpRequest.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			httpRequest.send(null);

		 httpRequest.onreadystatechange = function() {
			if(httpRequest.readyState == 4){
				var defaultTumb = httpRequest.responseText;
				var tumbPost = defaultTumb.search("\<!-- Posts --\>");
				var tumbMassEd = defaultTumb.search("\<!-- Launch Mass Post editor --\>");
				defaultTumb = defaultTumb.substring(tumbPost,tumbMassEd);
				jQuery("#sidebr").html(defaultTumb);
			}
		}		
}

var uagent = navigator.userAgent.toLowerCase();

if (uagent.search("firefox") > -1) main();
else addJQuery(main);
