// ==UserScript==
// @name            DSPHPBB Postcheck de21
// @namespace       DSPHPBB
// @include        	http://de21*/game.php*
// ==/UserScript==

//***************************************************************************
//*                             postcheck.user.js
//*                            -------------------
//*   author               : studentl
//*   copyright            : (C) DSphpbb team
//*   HP                   : www.dsphpbb.net
//*
//*   revision              2009/03/09 - 22:00:00 (svn 40)
//*
//***************************************************************************/




// Url zum Forum mit / am Ende
// Url to the forum with a slash at the end
var dsphpbburl='http://web590.jenny.webhoster.ag/s21/';


// Url zum DS-Server mit / am Ende
// Url to the DS server with a slash at the end
var dsserver = 'http://de21.die-staemme.de/';

//Die Staemme Spielername, zum markieren eigener reservierter Doerfer - Sonderzeichen in HTML-Entry Format. Siehe Forum fuer weitere Infos
//Tribal Wars playername, so your villages get marked
var dsuser = 'TotalWar 101';

//Benutzername in Forum
//Username in the Forum
var username = 'TotalWar 101';

//MD5 Verschlusselte Password (Rueckgabe von: ajax.php?action=get_md5_pass)
//MD5 encoded password (return value of: ajax.php?action=get_md5_pass&username=FORUMUSER&pass=FORUMPASS)
var pass_md5 = '$H$9q7SdsXqprANeKY0N9VZD3VAhoiU57/';

if(window.frames[1])
{
	var curloc = window.frames[1].location;
	var doc = window.frames[1].document;
	if(doc.location.href.search(/game.php/)<=0)
	{
		var curloc = window.frames[0].location;
		var doc = window.frames[0].document;
	}
}
else
{
	var curloc = window.location;
	var doc = window.document;
}

var search = new RegExp(dsserver, 'i');
if(curloc.href.search(search) < 0) return;

var stamm = document.evaluate("//table[@class='menu nowrap']//*/td[a='Stamm']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var td = document.createElement('td');
var link = document.createElement('a');
link.href = dsphpbburl;
var img = document.createElement('img');
img.src = dsphpbburl + "ajax.php?action=is_newer_post&username=" + username + "&pass_md5=" + pass_md5;
link.appendChild(img);
td.appendChild(link);
stamm.snapshotItem(0).parentNode.insertBefore(td, stamm.snapshotItem(0));