// ==UserScript==
// @name Import Bleep.com releases to MusicBrainz.org
// @namespace MBBL
// @include http://www.bleep.com/current_item.php?*
// ==/UserScript==

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\\\s)"+searchClass+"(\\\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

var releaseArtist = getElementsByClass('bleep2selectionTitle', document, 'div')[0].
    getElementsByTagName('a')[0].text;

var releaseTitle = "";

var c = getElementsByClass('bleep2selectionTitle', document, 'div')[0]. getElementsByTagName('td')[2].childNodes;
for(i = 0; i < 7; i++)
    {
	if(c[i].nodeType == 3)
	    {
		releaseTitle += c[i].textContent.replace(/(.*) \(.*\)/, "$1");
	    }
    }
releaseTitle = releaseTitle.replace(/^\s+|\s+$/g,"");


var productBox = document.getElementById('productBoxContent');
var productTds = productBox.getElementsByTagName('td');

var bigAssURL = 'http://musicbrainz.org/cdi/enter.html?hasmultipletrackartists=0&artistid=2&artistedit=1&artistname=' + releaseArtist + '&releasename=' + releaseTitle;

var trackCounter = 0;
for(i = 0; i < productTds.length; i++)
    {
       	if(productTds[i].width == '190')
	    {
		bigAssURL += '&track' + trackCounter + '=' + productTds[i].innerHTML.replace(/^\s*(.*)\s+\(.*\)\s*/, "$1");
		bigAssURL += '&tracklength' + trackCounter + '=' + productTds[i].innerHTML.replace(/^.*\((\d+):(\d+)\).*/, "$1%3A$2");
		trackCounter++;
	    }
    }

bigAssURL += '&tracks=' + trackCounter;

var a = document.createElement('a');
a.href = bigAssURL;
a.target = '_blank';
a.innerHTML = '<img width="8" height="8" border="0" alt="*" src="images/bleep2_bullet.gif"/>IMPORT TO MUSICBRAINZ';
var buyA = getElementsByClass('bleep2buyRelease', document, 'div')[0].getElementsByTagName('a')[0];
buyA.parentNode.insertBefore(a, buyA.nextSibling.nextSibling);
