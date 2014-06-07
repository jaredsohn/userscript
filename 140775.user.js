// ==UserScript==
// @name           Extra Wikia Rail Module
// @namespace      http://userscripts.org/users/Madnessfan34537
// @author         Madnessfan34537
// @description    Adds an extra Module to the Wikia Rail,(Only on Userpages) which contains links for the User's Block Logs, Logs done by the User, Logs done to the User, and Editcount.
// @include        http://*.wikia.com/*
// ==/UserScript==

function UserPageLinks() {

    var userArray = wgPageName.split(":");
     
    $('.WikiaRail').append('<section class="module"><div><a href="/index.php?title=Special%3ALog&type=&user=&page=User%3A' + userArray[1] + '&year=&month=-1&tagfilter=">Logs done to User</a><br/><a href="/index.php?title=Special%3ALog&type=block&user=&page=User%3A' + userArray[1] + '&year=&month=-1&tagfilter=">Block Logs</a><br/><a href="/wiki/Special:Log/' + userArray[1] + '">Logs done by User</a><br/><a href="/wiki/Special:Editcount/' + userArray[1] + '">Editcount</a></div></section>');

}
	
	if(wgCanonicalNamespace == "User") {
		addOnloadHook(UserPageLinks);
		
}		