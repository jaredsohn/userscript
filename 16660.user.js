// ==UserScript==
// @name	Orkut Script : Topic’s Last Page
// @description	Inserts an option to directly goto the last page of a topic on orkut communities with Blue link
// @include	http://www.orkut.com/CommTopics.aspx*
// @include	http://www.orkut.com/Community.aspx*
// @exclude     http://www.orkut.com/CommMsgs.aspx*
// ==/UserScript==

/*

 */

function drm()
{

	// get all the hypertext links

	var i=document.getElementsByTagName('a');

	for (var j=i.length-1; j>1; j--) {

	    var linkdata =  i[j].getAttribute("href");

	    var linkparts = linkdata.split("&");

	    if (linkdata.match("/CommMsgs.") == "/CommMsgs." ) {


			// change the page to last page
			var link=linkparts[0]+"&"+linkparts[1]+"&"+"na=2";


			// insert the text link on the page
			var newnav=document.createElement('a');
			newnav.setAttribute('href',link);
			newnav.setAttribute('title','Show me the last page');
			newnav.style.textDecoration="none";
			//newnav.style.color="#ff0000";
			newnav.appendChild(document.createTextNode(" +"));
			i[j].parentNode.insertBefore(newnav,i[j].nextSibling);
		
		}
	}
}

// done... now call function...

drm();
