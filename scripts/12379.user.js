/*This script is intended to be used with Freecycle, Freesharing and other similar Yahoo Groups. It could be useful for other types of groups, but was not originally intended.
 This script changes the links on the "My Groups" page to go straight into the messages of each group, bypassing the homepage, and adds a search feature to the management page.
*/
// ==UserScript==
// @name        Yahoo Groups - Search Freecycle, Freesharing
// @version     0.3
// @author      Jim Dewhurst
// @namespace   modhotspot.com
// @description This script changes the links on the "My Groups" page to go straight into the messages of each group, and adds a search for all groups.
// @include     http://groups.yahoo.com/*
// @include     http://*.groups.yahoo.com/*
// ==/UserScript==

(function() 
{
	/*   remove these comment marks if you just want to get to the management section of Yahoo groups immediately
	
	if (window.location == "http://groups.yahoo.com/"){
		window.location = "http://groups.yahoo.com/mygroups"
	}
	
	*/

    var MyDiv = document.createElement("div");
    MyDiv.setAttribute("id", "quicksearch");
    
    MyDiv.innerHTML = '<script type="text/javascript">function changelinks(){if (document.getElementById(\'query\').value.length < 1)' +
        '{var Rep_Txt = "messages/";}else{var Rep_Txt = "msearch?query=" + document.getElementById(\'query\').value.replace(/ /g, "+")' +
        '+ "&submit=Search&charset=ISO-8859-1";}var elm_array = document.body.getElementsByTagName("a");for ( var i = 0; i < elm_array.length;' +
        'i++ ) {elm_array[i].href = elm_array[i].href.replace(/messages.|msearch\?.*/,Rep_Txt);elm_array[i].target = "_blank";}}</script>' +
        '<br><table width="450" align="center" cellspacing="0" cellpadding="0" border="0">' +
        '<tr><td><h3 align="right"> <font color=#7b9ebd>Quick Item Search </font></h3></td><td> ' +
        '<form><input name="query" class="text" id="query" value="" type="text">' +
        '<input onclick="changelinks()" value="update" type="button"></form></td></tr><tr><td colspan="2"><div align="center">' +
        '<font size="1">type in your search term, click update, and click the group you would like to search below.</font>' +
        '</div></td></tr></table>';
    document.getElementById('nested-container').insertBefore(MyDiv, document.getElementById('nested-container').firstChild);

    var elm_array = document.body.getElementsByTagName("a");
    for ( var i = 0; i < elm_array.length; i++ ) {
        elm_array[i].href = elm_array[i].href.replace(/\?yguid.*/,"messages/");
    }
})();