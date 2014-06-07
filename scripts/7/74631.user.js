// ==UserScript==
// @name                vBulletin Search Fix
// @namespace	        	http://www.anonymous.com/hacks
// @description	        script to fix up the search
// @include		http://www.masalaboard.com/search.php?*
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
   if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
   else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {

   $( ".searchtitle a" ).each(
				function( intIndex ){
					var title = $(this).attr("title");
					var html = $(this).parent().parent().parent().parent().parent().html();
					var url1 = /(^|&lt;|\s)(www\..+?\..+?)(\s|&gt;|$)/g;
      		var url2 = /(^|&lt;|\s)(((https?|ftp):\/\/|mailto:).+?)(\s|&gt;|$)/g;
					title = title.replace(url1, '$1<a target="_blank" href="http://$2">$2</a>$3').replace(url2, '$1<a target="_blank" href="$2">$2</a>$5');
					title = "<div class='alt' style='padding-left:5px;'>"+title+"</div><br/>";
					$(this).parent().parent().parent().parent().parent().html(html+title);
				}	
		);   
}

