// ==UserScript==
// @name        BWForum_is_showmsg_link_not_deleted
// @include     http://forum.fr.bloodwars.net/*
// @include     http://forum.bloodwars.net/*
// @include     http://forum.bloodwars.interia.pl/*
// @include     http://r*.fr.bloodwars.net/*
// @include     http://r*.bloodwars.net/*
// @include     http://r*.bloodwars.interia.pl/*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @grant       GM_xmlhttpRequest
// ==/UserScript==

function checkIfLinkExist(links, i)
{
	var href = links.snapshotItem(i).getAttribute('href');
	GM_xmlhttpRequest({
		method: "GET",
		url: href,
		onload: function(response) {
			if(response.responseText.indexOf("Pas de message sous le numéro id désigné ou la clé est incorrecte.") > -1) {
				links.snapshotItem(i).innerHTML = "Lien supprimé / Deleted link";
			} else if(response.responseText.indexOf("No message of given id or invalid key") > -1) {
				links.snapshotItem(i).innerHTML = "Deleted link";
			} else if(response.responseText.indexOf("Brak wiadomości o podanym id lub nieprawidłowy klucz") > -1) {
				links.snapshotItem(i).innerHTML = "Link usunięty / Deleted link";
			}
		}
	});
}


var allLinks;
allLinks = document.evaluate(
	'//a[@href]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

for (var i = 0; i < allLinks.snapshotLength; i++) {
	if(allLinks.snapshotItem(i).getAttribute('href').indexOf("showmsg") > -1) {
	checkIfLinkExist(allLinks, i);
	}
}