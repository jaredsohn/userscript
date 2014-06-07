// ==UserScript==
// @author  shriji
// @name          ORKUT New mokey in ur profile name
// @include 	http://www.orkut.com/Profile.aspx*
// ==/UserScript==
 if( document.body.innerHTML.indexOf('EditSummary.aspx') > -1) {
 	var p = document.getElementsByTagName('h1')[0];
	p.innerHTML += "<img src='http://www.gravatar.com/avatar.php?gravatar_id=cb03ba6fa851e7ba94a28284e346e969&rating=PG&size=32&default=http://static.userscripts.org/images/gravatar_default.png?1211170773''>";	
}