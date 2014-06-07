// ==UserScript==
// @name           RMS Links
// @namespace      http://aivean.com
// @description    Adds links to RMS database
// @include        http://market.lumiro.net/whosell.php*
// ==/UserScript==




var reg=/javascript:perf\('(\d+)'\)/i;

var num = 0;
var links = [];
for (index in document.links)
{
	var link =  document.links[index];
	
	var arr = reg.exec(link.href);
	
	console.log(link);
	console.log(link.href);
	console.log(link.innerHTML);
	console.log(arr);
	
	if (arr!=null)
	{
		
		links.push({link:link, id:arr[1]});
		/*var new_link = document.createElement("a");
		var newT = document.createTextNode("RMS");
		new_link.appendChild(newT);
		new_link.setAttribute('href', "http://ratemyserver.net/item_db.php?item_id=" +arr[1]);
		new_link.setAttribute('target', "_blank");
		link.parentNode.appendChild(new_link);
		*/
	}
}

console.log(links);

for (index in links)
{
	var link =  links[index];
	
	var new_link = document.createElement("a");
	var img = document.createElement("img");
	img.setAttribute('src', "http://irowiki.org/w/skins/monobook/external.png");
	//var newT = document.createTextNode("RMS");
	new_link.appendChild(img);
	new_link.setAttribute('href', "http://ratemyserver.net/item_db.php?item_id=" +link.id);
	new_link.setAttribute('target', "_blank");
	link.link.parentNode.appendChild(new_link);

}