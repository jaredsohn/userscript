// ==UserScript== 
// @name		PSPK's Last Page in Orkut Communities!
// @namespace   	http://
// @description	Inserts an Option to directly go to the Last Page of a Topic in Orkut Communities!!! Check ou my blog at www.praveen.ampli5.org
// @include	http://www.orkut.co*/*CommTopics.aspx*
// @include	http://www.orkut.co*/*Community.aspx*
// @exclude	http://www.orkut.co*/*CommMsgs.aspx*
// ==/UserScript== 
//My Blog -- http://praveen.ampli5.org

/*
 * Version 1.1
 * Orignal Author - Dibyaranjan Mallick
 * Oringal Link  http://userscripts.org/scripts/show/3442 (Broken Script)
 * Revision By - Praveen Kumar P S , Chennai
 * Check out my Blog : http://praveen.ampli5.org
 */

function drm()
{
         
	// get all the hypertext links

	var i=document.getElementsByTagName('a');
        //Loop 
	for (var j=i.length-1; j>1; j--) {

	    var linkdata =  i[j].getAttribute("href");

	    var linkparts = linkdata.split("&");

	    if (linkdata.match("/Main#CommMsgs.") == "/Main#CommMsgs." ) {


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

// That's it! Isn't it so simple??? I hope this tips the Orkut developers to Incorporate it by default!

drm();