// ==UserScript==
// @name	Go to the last page of topic
// @namespace   http:// 
// @description	Inserts an option to directly goto the last page of a topic on orkut communities.
// @include	http://www.orkut.co.in/Main#CommTopics*
// @include	http://www.orkut.co.in/Main#Community*
// @include	http://www.orkut.co.in/Main#CommTopics*
// @include	http://www.orkut.co.in/Main#Community*
// @include	htt*://*.orkut.*/*
// @exclude     http://www.orkut.co.in/Main#CommMsgs*
// @exclude     http://www.orkut.co.in/Main#CommMsgs*
// ==/UserScript==
//the100rabh's blog --- http://the100rabh.blogspot.co.in


/*
 * Version 1.2
 * Orignal author - Dibyaranjan Mallick. Bachelor of Engg from SVNIT, Surat, INDIA. 
 * Oringal link  http://userscripts.org/scripts/show/3442
 * Revision by - the100rabh , India
 * Revised again by Bhoopalan Thaati since the previous revision is not    functioning anymore
 */

function drm()
{

	// get all the hypertext links

	var i = document.getElementsByTagName('a');

	for (var j=i.length-1; j>1; j--) {

	    var linkdata =  i[j].getAttribute("href");

	    var linkparts = linkdata.split("&");

	    if (linkdata.match("/Main#CommMsgs") == "/Main#CommMsgs" ) {


			// change the page to last page
			var link=linkparts[0]+"&"+linkparts[1]+"&"+"na=2";


			// insert the text link on the page
			var newnav=document.createElement('a');
			newnav.setAttribute('href',link);
			newnav.setAttribute('title','Show me the last page');
			newnav.style.textDecoration="none";
			//newnav.style.color="#ff0000";
			newnav.appendChild(document.createTextNode(" >>"));
			i[j].parentNode.insertBefore(newnav,i[j].nextSibling);
		
		}
	}
}

// done... now call function...

drm(); 
