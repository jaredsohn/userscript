// ==UserScript==
// @name		nCore preview image expander
// @author		Daniel Vasarhelyi
// @description 	it replaces the little [i] button on nCore to the actual image.
// @namespace		http://userscripts.org/users/293336
// @license		Creative Commons Attribution License
// @version		0.1
// @include		http://ncore.cc/torrents.php*
// @compatible		Greasemonkey
// ==/UserScript==

var rownodes = document.evaluate( '//div[@class="box_torrent" and div/div/div/div/div/div/img/@class="infobar_ico"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

for (i=0; i<rownodes.snapshotLength; i++)
{
	var row = rownodes.snapshotItem(i);


	// replace [i] with link and full image
	var preview_node = document.evaluate('.//img[@class="infobar_ico"]', 
		row, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	
	var image_href = preview_node.getAttribute("onmouseover").match(/mutat\('([^']*)'/);

	var details_page = document.evaluate('.//div[@class="torrent_txt"]/a/@href', 
		row, null, XPathResult.STRING_TYPE, null).stringValue;

	var link=document.createElement("a");
	link.setAttribute("href", details_page);
	preview_node.parentNode.replaceChild(link, preview_node);
	link.appendChild(preview_node);
	
	preview_node.removeAttribute("onmouseover");
	preview_node.removeAttribute("onmouseout");
	preview_node.setAttribute("src", image_href[1]);
	preview_node.removeAttribute("class");
	preview_node.removeAttribute("border");


	// adjust the box horizontally
	var box_node = document.evaluate('./div[@class="box_nagy" or @class="box_nagy2"]', 
		row, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

	box_node.style.setProperty("height", "auto", "important");
	
	
}
