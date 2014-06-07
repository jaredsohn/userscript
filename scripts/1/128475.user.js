// ==UserScript==
// @name           Dinosaur Comics Easter Egg Display
// @namespace      http://userscripts.org/users/didero
// @description    Displays the three hidden messages (image mouse-over text, contact message, and RSS title) below the Dinosaur comic.
// @include        http://www.qwantz.com/index.php*
// @include        http://qwantz.com/index.php*
// @version        1.3.2
// @downloadURL    https://userscripts.org/scripts/source/128475.user.js
// @updateURL      https://userscripts.org/scripts/source/128475.meta.js
// @grant          none
// ==/UserScript==

var comic;
//Show a default error message when we fail to find these
var rssTitle = '<i>Not Found</i>'; 
var contactMessage = '<i>Not Found</i>';

//COMIC TITLE
comic = document.getElementsByClassName('comic');
//Sometimes there's multiple comics on a page (f.i. page 2340). Check for that
if (comic.length >= 1) comic = comic[comic.length-1]
else {
	//If there's an overlay active, the image tag changes. Now it's the only image with a 'style' tag
	comic = document.evaluate("//img[contains(@style, 'background')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (comic.snapshotLength == 1) comic = comic.snapshotItem(0);
	else comic = null;
}
//END COMIC TITLE

//It only makes sense to continue if we found the comic, otherwise we've got no place to display it
if (comic) {
	//RSS TITLE (Comment finder from here: http://userscripts.org/topics/19593 )
	var htmlComments = document.evaluate('//comment()', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0, len = htmlComments.snapshotLength; i < len; ++i) {
		var comment = htmlComments.snapshotItem(i).data;
		if (comment.indexOf('<span class="rss-title">') != -1) {
			//Get the part between the 'span' tags
			rssTitle = decodeURIComponent(comment.slice(comment.indexOf('>')+1, comment.lastIndexOf('<')));
			break;
		}
	}
	//END RSS TITLE

	//CONTACT MESSAGE
	var contactLink = document.evaluate("//a[contains(@href,'mailto:')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (contactLink.snapshotLength >= 1) {
		contactMessage = contactLink.snapshotItem(0).href;
		//Remove the 'mailto' part
		contactMessage = contactMessage.substr(contactMessage.indexOf('subject=')+8);// 8 = 'subject='.length
		//clean up html codes, replacing the html codes with their actual characters ('%20' into spaces, that sort of thing)
		contactMessage = decodeURIComponent(contactMessage);
	}
	//END CONTACT MESSAGE

	//Show the results
	var display = document.createElement('div');
	display.setAttribute('style', 'width:735px'); //The comic is 735 pixels wide too, as specified in the CSS file
	display.innerHTML = "<b>Comic Title:</b> " + comic.title + "<br />" +
						"<b>Contact Message:</b> " + contactMessage + "<br />" +
						"<b>RSS Title:</b> " + rssTitle;

	var comicParent = comic.parentNode;
	//If the comic is a link, put the text outside the link
	if (comicParent.tagName == 'A') {
		display.innerHTML = '(image is link)<br />' + display.innerHTML;
		comicParent = comicParent.parentNode;
	}
	//Again, correct for multiple comics in a page (#2340)
	else if (comicParent.tagName == 'DIV') {
		display.innerHTML = '(multiple images)<br />' + display.innerHTML;
		comicParent = comicParent.parentNode;
	}
	comicParent.appendChild(display);
}