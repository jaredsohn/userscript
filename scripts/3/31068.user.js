// ==UserScript==
// @name           BridalPortraits.com Reworking
// @namespace      http://mailerdaemon.home.comcast.net
// @include        http://www.bridalportraits.com/cgi-bin/cpoole/photocart.cgi
// ==/UserScript==

if(data = $X("//form[@name='communicator']")){
	cn = data.elements.namedItem("cn").value;
	connectionspeed = data.elements.namedItem("connectionspeed").value;
	category = data.elements.namedItem("category").value;
	$Z("//a[@href='javascript:void(null);']/img[@class='noprint']", function(img,i,p){
		link = img.parentNode;
		link.href = img.src.replace("s.jpg", "sl.jpg");
		link.attributes.removeNamedItem("onclick");
		link.target="_blank";
		block = link.parentNode;
		text = block.getElementsByTagName("font");
		text = (text.length && text.length >0)?text[0]:null;
		for(j = (brs = block.getElementsByTagName("br")).length; j-- > 0;)
			block.removeChild(brs[j]);
		block.appendChild(below = document.createElement("div"));
		below.appendChild(pop = document.createElement("a"));
		block.removeChild(text);
		pop.appendChild(text);
		pop.href = "http://www.bridalportraits.com/cgi-bin/cpoole/photocart.cgi?popupwindow=" + cn + ";" +
			"comchoice=1;" +
			"connection="+connectionspeed + ";" +
			"category="+ category + ";" +
			"picno="+text.innerHTML;
		pop.target="_blank";
	});
}

function $X(_xpath, node){return document.evaluate(_xpath, node?node:document, null,	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);}
function $Y(_xpath, node){return document.evaluate(_xpath, node?node:document, null,	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);}
function $Z(_xpath, func, node, payload){
    var res = document.evaluate(_xpath, node?node:document, null,	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var i, j;
    for (i = j = 0; link = res.snapshotItem(i); ++i)
        j += func(link, i, payload);
    return j;
}
function insertAfter(insert, after){return after.parentNode.insertBefore(insert, after.nextSibling);}
function insertBefore(insert, before){return before.parentNode.insertBefore(insert, before);}