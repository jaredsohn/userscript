// ==UserScript==
// @name           MCL Embedded Picture Viewer
// @namespace      bravo/greasemonkey
// @description    View embedded pictures when embedded pictures are disabled
// @include        http://mycoffeelounge.net/forum-replies.php?*
// @include        http://*.mycoffeelounge.net/forum-replies.php?*
// @version        1.1.1
// ==/UserScript==

function $xu(p, c) {
	var i, r = [], x = document.evaluate(p, c || document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
	while(i=x.iterateNext()) r.push(i);
	return r;
}
function $ec(type, attributes){
	var node = document.createElement(type);
	for (var attr in attributes) if (attributes.hasOwnProperty(attr)){
		node.setAttribute(attr, attributes[attr]);
	}
	return node;
}
function $el(newNode, par) {
	return par.appendChild(newNode);
}
function $ea(newNode, node) 
{
	return node.parentNode.insertBefore(newNode, node.nextSibling);
}
function $eb(newNode, node) 
{
	return node.parentNode.insertBefore(newNode, node);
}

function srchForEmbed(el)
{
	if(el.nextSibling == null) return false;
	if(el.nextSibling.nextSibling == null) return false;
	if(el.nextSibling.nextSibling.nextSibling == null) return false;
	var br = el.nextSibling.nextSibling;
	if(br.nodeName != 'BR') return false;
	var na = br.nextSibling;
	if(na.nodeName != 'A') return false;
	var im = na.firstChild;
	if(im == null) return false;
	if(im.nodeName != 'IMG') return false;
	if(na.href != el.href) return false;
	if(na.href != im.src) return false;
	return true;
}

$xu('//td[@class="news"][2]//a[@class="bint"][contains(@href, "mycoffeelounge.net/pixup/")]').forEach(function(el)
{
	if(!srchForEmbed(el))
	{
		el.target='_blank';
		$eb($ec("BR"), el);
		$el($ec("BR"), el);
		$el($ec("IMG", { src : el.href, style : "max-width:500px; max-height:500px;" }), el);
	}
});

$xu('//td[@class="news"][2]//a[@class="bext"]').forEach(function(el)
{
	if(/.*\.(jpg|jpeg|png|gif)/i.test(el.href))
	{
		if(!srchForEmbed(el))
		{
			el.target='_blank';
			$eb($ec("BR"), el);
			$el($ec("BR"), el);
			$el($ec("IMG", { src : el.href, style : "max-width:500px; max-height:500px;" }), el);
		}
	}
});
