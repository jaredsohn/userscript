// ==UserScript==
// @name Spickmich User Blacklist für Newschat
// @description Erlaubt es dir, alle Beiträge und Kommentare bestimmter Benutzer im Newschat auf spickmich.de zu verbergen. 
// @namespace http://userscripts.org/users/269252
// @author Snehonja
// @homepage https://www.userscripts.org/scripts/show/113707
// @include http://*.spickmich.de/home
// ==/UserScript==

//Hinweis: du musst nicht Name, Nickname UND UserID eines benutzrs eintragen, es reicht immer eines davon.

names = new Array(
// Namen (Achtung: nur vornamen! das bedeutet auch, dass ALLE benutzer mit diesem vornamen ausgeblendet werden! Besser ist es, den nickname oder die UserID zu benutzen (siehe unten)!) in der freien Zeile eintragen, in anführungszeichen, mit kommata getrennt.
// Beispiel: "Max", "Test", "Foo"

);

nicks = new Array(
// Nicknamen in der freien Zeile eintragen, schema wie bei den namen

);

ids = new Array(
// UserIDs in der freien Zeile eintragen, selben Schema wie oben

)

function isComment(element) {
	if (element.className && element.className=="comment") return true;
	return false;
}


authorLinks = Array.prototype.slice.call(document.getElementsByClassName("nc-feed-author-name"));
authorLinks = authorLinks.concat(Array.prototype.slice.call(document.getElementsByClassName("nc-comment-author-name")))
for (i = 0; i < authorLinks.length; i++) {
    authorlink = authorLinks[i]
    for (j = 0; j < names.length; j++) {
		if (authorlink.innerHTML == names[j]) {
			authorlink.parentNode.parentNode.style.display="none";
		}
	}
    for (j = 0; j < nicks.length; j++) {
		if (new RegExp("https?://(www\.)?spickmich.de/profil/"+nicks[j]).test(authorlink.href)) {
			authorlink.parentNode.parentNode.style.display="none";
		}
	}
}

feeds = document.getElementsByClassName("nc-feed")
for (i = 0; i < feeds.length; i++) {
    feed = feeds[i]
	for (j = 0; j < ids.length; j++) {
		if (feed.getAttribute("nc-feed-author")==ids[j]) {
			feed.style.display="none";
		}
	}
}

commentAuthorImages = document.getElementsByClassName("nc-comment-author-image")
for (i = 0; i < commentAuthorImages.length; i++) {
    commentAuthorImage = commentAuthorImages[i]
	for (j = 0; j < ids.length; j++) {
		if (new RegExp("https?://content2.spmi.de/i/\\d+/p/.+/\\d{2}_"+ids[j]+".jpg").test(commentAuthorImage.src)) {
			commentAuthorImage.parentNode.parentNode.style.display="none";
		}
	}
}