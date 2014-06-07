// ==UserScript==
// @name           hideAllGamesInGamelist
// @namespace      klavogonki
// @include        http://klavogonki.ru/gamelist*
// @author         Fenex
// @version        1.0.1
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=d9c74d6be48e0163e9e45b54da0b561c&r=PG&s=48&default=identicon
// ==/UserScript==
function change_hideGamesInGamelist()
{
var fnx_hideGamesInGamelist = document.getElementById('gamelist_content');
if (fnx_hideGamesInGamelist.style.display=="")
	fnx_hideGamesInGamelist.style.display="none";
else
	fnx_hideGamesInGamelist.style.display="";
}
var createElem = document.createElement('span');
createElem.innerHTML = ' <input type="button" value="&times;" id="fnx_btn_gamelist_all" onclick="change_hideGamesInGamelist();">';
document.getElementById('delete').parentNode.insertBefore(createElem, document.getElementById('delete').nextSibling);
var s=document.createElement('script');
s.innerHTML=change_hideGamesInGamelist;
document.body.appendChild(s);