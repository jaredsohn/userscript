// ==UserScript==
// @name	ezTopicBrowsing
// @namespace   http://davidjones.somee.com/greasemonkey
// @description	Inserts an option to directly goto the last page of a topic on orkut communities
// @include	http://www.orkut.com/CommTopics.aspx*
// @include	http://www.orkut.com/Community.aspx*
// @exclude     http://www.orkut.com/CommMsgs.aspx*
// ==/UserScript==

/*
 * Version 1.0
 * About the author - Dibyaranjan Mallick. Bachelor of Engg from SVNIT, Surat, INDIA. 
 * Email- d.r.mallick@gmail.com
 * Developed on 28th Feb'06.
 * Feel free to modify the content, but kindly mention the author's name or include a brief acknowledgement. thank you.
 * http://freewebs.com/ofdrm ..... nothing special here... still living on a free server!!!
 */

function drm()
{

	// get all the hypertext links
	var i = document.getElementsByTagName('a');
	for(var j=i.length-1;j>0;j--)
	{
		var link=i[j].getAttribute('href');
		chain=link.split(".");
		tmplink=link.split("&");

		// get all those links leading to topics
		if(chain[0]=="CommMsgs")
		{
			// change the page to last page
			link=tmplink[0]+"&"+tmplink[1]+"&"+"na=2";


			// insert the text link on the page
			var newnav=document.createElement('a');
			newnav.setAttribute('href',link);
			newnav.setAttribute('title','Show me the last page');
			newnav.style.textDecoration="none";
			newnav.style.color="#ff0000";
			newnav.appendChild(document.createTextNode("[Last]"));
			i[j].parentNode.insertBefore(newnav,i[j].nextSibling);
		
		}
	}
}

// done... now call function...

drm();