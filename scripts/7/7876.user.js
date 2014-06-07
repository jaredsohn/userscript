// ==UserScript== 
// @name	ezTopicBrowsing 1.1
// @description	Inserts an option to directly goto the last page of a topic on orkut communities
// @include	http://www.orkut.com/CommTopics.aspx*
// @include	http://www.orkut.com/Community.aspx*
// @include	http://www.orkut.co.in/CommTopics.aspx*
// @include	http://www.orkut.co.in/Community.aspx*
// @include	http://www.orkut.co.in/Community*
// @include	http://www.orkut.co.in/CommTopics*
// @exclude     http://www.orkut.co.in/CommMsgs.aspx*
// @exclude     http://www.orkut.com/CommMsgs.aspx*
// ==/UserScript== 
//My Blog -- http://the100rabh.blogspot.com

/*
 * Version 1.1
 * Orignal author - Dibyaranjan Mallick. Bachelor of Engg from SVNIT, Surat, INDIA. 
 * Oringal link  http://userscripts.org/scripts/show/3442
 * Revision by - the100rabh , India
 * Blog : http://the100rabh.blogspot.com 
 */

function drm()
{
         
	// get all the hypertext links

	var i=document.getElementsByTagName('a');
        //Loop 
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
			newnav.style.color="#ff0000";
			newnav.appendChild(document.createTextNode("[Last]"));
			i[j].parentNode.insertBefore(newnav,i[j].nextSibling);
		
		} 
	} 
}

// done... now call function...

drm();