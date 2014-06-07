// ==UserScript==
// @name           angesagter.de Forumscript
// @description    This script converts links to pictures to links directly showing the picture.
//		   Links to angesagter.de-Userpictures will also converted in in almost the same manner, but with an 
//		   additional Info-Button-Link direktly to the users Home on angesagter.de
//
//		   Author: Marco Borm, Germany
//
//		   Terms and conditions:
//		   This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 2.0 Germany License.
//		   To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/2.0/de/ or send a letter 
//		   to Creative Commons, 543 Howard Street, 5th Floor, San Francisco, California, 94105, USA.


// @include        http://*angesagter.de/fread.php*
// @include	   http://*angesagter.de/fmsg.php*
// ==/UserScript==

var linkNodes = document.evaluate(    '//a',    document,    null,    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,    null);

	for (var i = 0; i < linkNodes.snapshotLength; i++) {
		var node = linkNodes.snapshotItem(i);
		var linkDestination = node.getAttribute("href");
		if ( linkDestination ) {
			
			// direkter Bilderlink
			if ( linkDestination.match( /.\.jpg/i) || linkDestination.match( /.\.gif/i) || linkDestination.match(/http.+angesagter.de\/img\/[\da-f]{2}\/[\da-f]{32}/i) ) {

				// link-text kommt weg
				linkNodes.snapshotItem(i).removeChild(linkNodes.snapshotItem(i).childNodes[0]);

				pictureNode = document.createElement('img');
				pictureNode.setAttribute('src', linkDestination);

				linkNodes.snapshotItem(i).appendChild(pictureNode);
			} else {
				// indirekter Link ueber show.php mit Benutzername und PicId
				var theMatch = linkDestination.match(/http.+angesagter.de\/show.php\?u=(.+)?\&p=([\da-f]{32})/i);
				var userName = null;
				var pictureId = null;
				if ( theMatch ) {
					userName = theMatch[1];
					pictureId = theMatch[2];
				} else {
					// links nur mit usernamen:
					// http://www.angesagter.de/info.php?user=R0TZL0EFFEL
 					// oder defekter id:
					// http://www.angesagter.de/show.php?u=GiftZahn&p=6ed0dd6e055fbf211
					theMatch = linkDestination.match(/http.+angesagter.de\/show.php\?u=(.+)(\&).+/i);
					if ( theMatch ) {
						userName = theMatch[1];
					} else {
						theMatch = linkDestination.match(/http.+angesagter.de\/info.php\?user=(.+)/i); 
						if ( theMatch ) {
							userName = theMatch[1];
						}
					}
				}

				if ( userName && pictureId ) {
					// link-text kommt weg
					linkNodes.snapshotItem(i).removeChild(linkNodes.snapshotItem(i).childNodes[0]);

					// dafuer kommt das bild rein
					pictureNode = document.createElement('img');
					pictureNode.setAttribute('src', "http://img.angesagter.de/" + pictureId[0] + pictureId[1] + "/" + pictureId + ".jpg");

					newPictureNode = linkNodes.snapshotItem(i).appendChild(pictureNode);

					// info-button vorbereiten
					
					InfoLinkNode = document.createElement('a');
					InfoLinkNode.setAttribute('href', '/info.php?user=' + userName);

					InfoLinkImageNode = document.createElement('img');
					InfoLinkImageNode.setAttribute('src', "/is/ba_info.gif");
					InfoLinkNode.appendChild(InfoLinkImageNode);


					linkNodes.snapshotItem(i).parentNode.insertBefore(InfoLinkNode, linkNodes.snapshotItem(i).nextSibling );
					linkNodes.snapshotItem(i).parentNode.insertBefore(document.createTextNode("User: " + userName), linkNodes.snapshotItem(i) );
					linkNodes.snapshotItem(i).parentNode.insertBefore(document.createElement('br'), linkNodes.snapshotItem(i) );
				} else
				if ( userName )  {
					// link-text kommt weg
					linkNodes.snapshotItem(i).removeChild(linkNodes.snapshotItem(i).childNodes[0]);

					// dafuer kommt das bild rein
					pictureNode = document.createElement('img');
					pictureNode.setAttribute('src', "http://www.angesagter.de/bp.php/" + userName);

					newPictureNode = linkNodes.snapshotItem(i).appendChild(pictureNode);


					// info-button vorbereiten
					
					InfoLinkNode = document.createElement('a');
					InfoLinkNode.setAttribute('href', '/info.php?user=' + userName);

					InfoLinkImageNode = document.createElement('img');
					InfoLinkImageNode.setAttribute('src', "/is/ba_info.gif");
					InfoLinkNode.appendChild(InfoLinkImageNode);

					linkNodes.snapshotItem(i).parentNode.insertBefore(InfoLinkNode, linkNodes.snapshotItem(i).nextSibling );
					linkNodes.snapshotItem(i).parentNode.insertBefore(document.createTextNode("User: " + userName), linkNodes.snapshotItem(i) );
					linkNodes.snapshotItem(i).parentNode.insertBefore(document.createElement('br'), linkNodes.snapshotItem(i) );
				}

			}
		}
	}



