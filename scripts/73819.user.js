// ==UserScript==
// @name           AddCommas
// @namespace      Jungles DoH Stuff
// @description    Changes the numbers to display nicer
// @include        http://www.domainofheroes.com/Game.aspx
// ==/UserScript==
document.getElementById('coinMule').addEventListener('DOMNodeInserted',updateNumber,false);
document.getElementById('exp').addEventListener('DOMNodeInserted',updateNumber,false);
document.getElementById('vxp').addEventListener('DOMNodeInserted',updateNumber,false);
document.getElementById('coin').addEventListener("DOMNodeInserted",updateNumber,false);
document.getElementById('coinOfferTheirs').addEventListener("DOMNodeInserted",updateNumber,false);
document.getElementById('coinOfferMine').addEventListener("DOMNodeInserted",updateNumber,false);
for(var i = 1; i <= 54; i++)
	{
		document.getElementById('reaQty' + i).addEventListener('DOMNodeInserted',updateNumber,false);
		document.getElementById('reagentOffer' + i+'Mine').addEventListener('DOMNodeInserted',updateNumber,false);
		document.getElementById('reagentOffer' + i+'Theirs').addEventListener('DOMNodeInserted',updateNumber,false);
	}
for(var i = 1; i <= 25; i++)
	{
	document.getElementById('matQty' + i).addEventListener('DOMNodeInserted',updateNumber,false);
	document.getElementById('materialOffer' + i+'Mine').addEventListener('DOMNodeInserted',updateNumber,false);
	document.getElementById('materialOffer' + i+'Theirs').addEventListener('DOMNodeInserted',updateNumber,false);
	}
//reaQty24
function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function updateNumber(e)
{
	
	if (e.target.data.indexOf(',')<0) {
		e.target.data=addCommas(e.target.data);
		}
}