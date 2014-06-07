// ==UserScript==
// @name           Forum blocker
// @namespace      The internet
// @description    Removes signatures and replaces off site images with a small link on vBulletin and phpBB forums
// @include        http://*forum*
// ==/UserScript==
// remove avatars from the page

function removeSigs(parNode, childType) {
	var divs = parNode.getElementsByTagName(childType);
	// go through all divs until we find one with a ____ - then remove this and all remaining divs
	var divsLength = divs.length;
	for (j = 0; j < divsLength; j++) {
		var div = divs[j];
		// vBulletin boards have a div section
		if ( div != undefined && div.firstChild != undefined &&
				div.firstChild.nodeValue != null && 
				div.firstChild.nodeValue.search("________") > -1
		   ) {
			// we ought to remove the child nodes
			removeChildren(parNode,div);
			// dump("removing from parNode "+j+"\n");
			return true;
		} else if (div != undefined && div.innerHTML != undefined && childType != "div"){
			// phpBBs just lump the sig in with the post.
			var sigBar = div.innerHTML.search("________");
			if (sigBar != -1)  {
				div.innerHTML = div.innerHTML.substring(0, sigBar);
				// dump("removing "+childType+" by innerHtml hack "+sigBar+"\n");
			}

		}
	}
	return false;
}

function removeChildren(node, startNode)
{
	var len = node.childNodes.length;
	var rm = false;

	for(var i = 0; i < len; i++)
	{ 
		if (node.childNodes[i] == startNode) {
			rm = true;
		}
		try {
			if (rm) 
				node.removeChild(node.childNodes[i]);
		} 
		catch (e) {}
	}
	// dump(node.innerHTML);
}

function removeSignatures() {
	var tds = document.getElementsByTagName('td');
	var tdsLength = tds.length;
	for (i = 0; i < tdsLength; ++i) {
		var td = tds[i];
		// make sure td is valid...
		if ((td != undefined) && !removeSigs(td,'div')) {
			removeSigs(td,'span');
		}

	}
}

function removeImages()
{
	// Remove off site links and avatars
	var re = new RegExp("http://([^/]+).*");
	var url = String(document.location);
	var site = re.exec(url);

	var imgs = document.getElementsByTagName('img');
	for (i =0; i < imgs.length; i++)
	{
		var img = imgs[i];
		var block = false;
		var srcAttribute = img.getAttribute('src');
		var match = re.test(srcAttribute);
		var srcSite = re.exec(srcAttribute);
		// if the src attribute matches and it is not the actual site, remove it
		if (srcSite != null && srcSite.length > 1 &&
				srcSite[1] != site) {
			block = true;
		} else {
			// if the alt text or the src address is an avatar, remove that too
			var alt = img.getAttribute('alt');
			if ( (alt != undefined && alt.search(/avatar/i)  > -1 )
					|| (srcAttribute.search(/avatar/i) > -1) ) {
				block = true;
			}
		}
		if (block) {
			img.setAttribute('src', "");
			var link = document.createElement("a");
			link.setAttribute("href" , srcAttribute);
			var altText = document.createTextNode("[img]");
			link.appendChild(altText);
			img.parentNode.replaceChild(link, img);
		}
	}
}

removeSignatures();
removeImages();
