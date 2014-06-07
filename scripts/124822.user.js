// ==UserScript==
// @name           Fazed Forum Table Sorter
// @namespace      Fazed
// @include        http://fazed.org/forum/
// @include        http://fazed.net/forum/
// @include        http://skill.org/forum/
// ==/UserScript==

// Add jQuery 
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Add cookie plugin 
var GM_CP = document.createElement('script');
GM_CP.src = 'http://nvs-ink.com/jquery.cookie.js';
GM_CP.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_CP);

// Add tbalesorter plugin
var GM_TS = document.createElement('script');
GM_TS.src = 'http://nvs-ink.com/jquery.tablesorter.min.js';
GM_TS.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_TS);

// Check if jQuery's loaded
function GM_wait() {
   if(typeof unsafeWindow.jQuery == 'undefined') {
      window.setTimeout(GM_wait,100);
   } else {
      $ = unsafeWindow.jQuery; letsJQuery();
   }
}

GM_wait();




function letsJQuery() {
    
//alert($); // check if the dollar (jquery) function works
	 
//we only want this to work if were logged in (otherwise it mangles the table) so first lets check for the UID cookie
if( $.cookie("uid")!= null){

//if the cookie uid is not equal to null, get to work.//
$(document).ready(function(){


//remove the table header//
$("#content TABLE:nth-child(2) TBODY TR:first-child").remove("#content TABLE:nth-child(2) TBODY TR:first-child");


//switch from forum class to tablesorter class//
$("#content TABLE:nth-child(2)").attr("class", "tablesorter");


//give it an id//
$("#content TABLE:nth-child(2)").attr("id", "DBCOOPER");


//replace the  old header with the new one 
$("#content TABLE:nth-child(2) TBODY").before("<thead><tr><th class=\"left\" width=\"100%\">Topic</th><th>&nbsp;</th><th>Posts</th><th>Author</th><th class=\"right\" nowrap=\"nowrap\">Last Post</th></tr></thead>");

//give the table body the .forum class so it looks awesome//
$("#content TABLE:nth-child(2) TBODY").attr("class", "forum");

//add the styles back to the table header//
GM_addStyle(".tablesorter th { background-attachment: scroll; background-clip: border-box; background-color: #DDDDDD; background-image: none; background-origin: padding-box; background-position: 0 0; background-repeat: repeat; background-size: auto auto; border-bottom-color: #94A6D8; border-bottom-style: solid; border-bottom-width: 1px; color: #132A6C; font-size: 11px; font-weight: bold; padding-bottom: 2px; padding-left: 6px; padding-right: 2px; padding-top: 2px; }");

GM_addStyle(".tablesorter th.left { background-attachment: scroll; background-clip: border-box; background-color: #DDDDDD; background-image: url(\"http://www.fazed.org/common/images/ltl.gif\"); background-origin: padding-box; background-position: 0 0; background-repeat: no-repeat; background-size: auto auto; }");

GM_addStyle(".tablesorter th.right { background-attachment: scroll; background-clip: border-box; background-color: #DDDDDD; background-image: url(\"http://www.fazed.org/common/images/ltr.gif\"); background-origin: padding-box; background-position: 100% 0; background-repeat: no-repeat; background-size: auto auto; }");

GM_addStyle(".tablesorter th.headerSortUp { background-image: url(http://nvs-ink.com/small_asc.gif) }");

//do the tablesort "magic"//
$("#DBCOOPER").tablesorter();


});
}
}
