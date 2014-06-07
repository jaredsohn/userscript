// ==UserScript==
// @name           Newegg Screen Dimensions
// @namespace      http://mailerdaemon.home.comcast.net
// @description    Shows the screen dimensions next to the diagonal size
// @include        http://www.newegg.com/Product/Product.aspx?*
// @version        0.1
// ==/UserScript==

size = $X("//div[@id='pcraSpecs']//td[position()=1 and text()='Screen Size']/following-sibling::td/text()");
dim = $X("//div[@id='pcraSpecs']//td[position()=1 and text()='Maximum Resolution']/following-sibling::td/text()");

if(size && dim)
{
	result = /[\s]*([\d]+)[\s]+x[\s]+([\d]+)[\s]*/.exec(dim.data);
	x = Number(result[1]);
	y = Number(result[2]);
	d = Number(size.data.slice(0, -1));
	ps = d / Math.sqrt(x * x + y * y);
	size.data = size.data + " ( " + String(ps * x).slice(0,5) +'" x ' + String(ps * y).slice(0,5) + '" )';
	
	pp = $X("//div[@id='pcraSpecs']//td[position()=1 and text()='Pixel Pitch']/following-sibling::td/text()");
	if(pp)
		pp.data += ' [' + String(ps / 0.0393700787402).substring(0, 5) + 'mm]';
	//else
		size.data += ' at ' + String(ps / 0.0393700787402).substring(0, 5) + 'mm';
}

function $X(_xpath, node){return document.evaluate(_xpath, node?node:document, null,	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);}
/*
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
*/