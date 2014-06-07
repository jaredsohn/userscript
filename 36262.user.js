// Greasemonkey script for estate-result-page on finn.no
//
// -displays price pr sqm - uses 'real' price - see below
// -scrolls to the results - skipping stuff on top
// -hides broker names
// -hides top ad
// -hides iframe (usually ads)
// -'real' price: changes original price with the sum of original price AND fellesgjeld
// -ads orignal price to owner-info
// -calculates the average price pr sqm and displays this at the top.
//
// Norwegian:
// Endrer resultatlista til FINN Eiendom (finn.no) slik at den viser informasjon slik jeg ønsker å se den
// -viser kvadratmeterpris
// -scroller siden til der resultatet begynner
// -fjerner eiendommeglers navn
// -fjerner annonser
// -viser reell pris (dvs legger til fellesgjeld til prisen) (merker prisen der dette blir gjort)
// -viser gjennomsnittlig kvadratmeterpris for annonsene på siden 
//
// hentet fra SSB: http://www.ssb.no/vis/emner/08/02/30/bruktbolig/om.html
// Kvadratmeter pris: Kvadratmeterprisen er beregnet ved å dividere prisen på bruksarealet.
//
// © Fredrik Rødland, (userrcipts [at] rodland.no), 2008
// http://rodland.no
// Inspired by a script written by Tomas Mortensen a year ago
// Disclaimer:
// I'm not a web-designer - it shows....
// I'm not a javascript-coder - it shows....
//
// 20090602: tweaked to match finn-no's latest HTML-changes
// 20090323: tweaked to match finn-no's latest HTML-changes
// 20081102: Initial version
//
//
// ==UserScript==
// @name           FINN Eiendom Resultat
// @namespace      http://rodland.no
// @description    Tweaks result-page for FINN Eiendom
// @include        http://www.finn.no/finn/realestate/homes/result*
// ==/UserScript==

// store elements from page needed down the road
var paging = document.getElementsByClassName("paging_top");
var even = document.getElementsByClassName("even");
var odd = document.getElementsByClassName("odd");
var results = document.getElementById("results");
var ad1 = document.getElementById("advertone");
var ad2 = document.getElementById("adverttwo");
var iframes = document.getElementsByTagName("iframe")
var bottom = document.getElementById("bottom-section");
var sesam = document.getElementById("sesamAds");

// sum & num set in calcSum
var sum = 0;
var num = 0;
for (var i = 0; i < even.length; i++) {
	calcSum(fixRow(even[i]));
	calcSum(fixRow(odd[i]));
}
var totalAverage = Math.round(sum / num);

// add average info on top
paging[0].innerHTML = 'Gjennomsnittlig kvadratmeterpris for viste annonser er <strong>' + fixNumber(totalAverage) + '</strong><br/>' + paging[0].innerHTML;

// hiding clutter
ad1.style.display = 'none';
ad2.style.display = 'none';

bottom.style.display = 'none';
sesam.style.display = 'none';
sesam.style.display = 'none';

for (var i = 0; i <  iframes.length; i++) {  
	iframes[i].style.display = 'none'
}

// scroll to start of fun
scrollToElement(results);

// from: http://radio.javaranch.com/pascarello/2005/01/09/1105293729000.html
function scrollToElement(theElement){
  var selectedPosX = 0;
  var selectedPosY = 0;
  while(theElement != null){
    selectedPosX += theElement.offsetLeft;
    selectedPosY += theElement.offsetTop;
    theElement = theElement.offsetParent;
  }
  window.scrollTo(selectedPosX,selectedPosY);
}

// fixes one row in the resilt-set
function fixRow(el){
	kvmpris = NaN;
	if (el){
		// get elements from the current row that we need.
		broker = el.getElementsByClassName("broker")[0];
		
		owner = el.getElementsByClassName("secondary_info")[1];
		owner = owner.getElementsByClassName("sec_info_right")[0];

		// just some clean-up to align fellesutg
		owner.innerHTML =  owner.innerHTML.replace(/\s*&nbsp;\s*/g, '');
		
		felles = owner.innerHTML.split('Fellesgjeld:')[1];
		size = el.getElementsByClassName("size")[0].innerHTML;
		price_element = el.getElementsByClassName("price")[0];
		price = price_element.innerHTML;
		
		// make numbers
		if (felles){
			felles =  felles.split('<br>')[0];
			felles = felles.replace(/^\s+|\s+$/g, '').replace(/[\-\.\,]/g, '');
		}
		if (size){
			size = size.replace(/^\s+|\s+$/g, '').replace(/(.*\/)?(\d+)m².*$\n.*/gm, '$2');
		}
		if (price){
			price = price.replace(/\n/g,'\uffff').replace(/(.*),-.*/, '$1').replace(/[\s.\uffff]/g, '')

		}
		tot = Math.round(new Number(felles) + new Number(price));
		// we've found 'fellesgjeld'

		if (tot && tot > 0){
			price_element.innerHTML = fixNumber(tot) + " (reell)";
			my_owner = owner.innerHTML;
			my_owner = my_owner.replace(/Totalt: .*<br>/g, '');
			my_owner = my_owner.replace(/<table>\s*<\/table>/gm, '');
			my_owner = my_owner + "<br>\nOrg. pris:&nbsp;" + fixNumber(price) + "<br>";
			owner.innerHTML = my_owner;
			price = tot;
		}

		kvmpris = Math.round(new Number(price) / new Number(size));
		// GM_log("kvmpris: " + kvmpris + ", price: " + price  + ", size: " + size);
		if (kvmpris == Infinity){
			kvmpris = NaN;
		}

		// we've found a price pr sqm
		if (! isNaN(kvmpris)){
			var kvmpristxt = document.createElement("div");
			kvmpristxt.setAttribute("class", "broker");
			kvmpristxt.innerHTML = "" + fixNumber(kvmpris) + " kr/m²";
		    broker.parentNode.replaceChild(kvmpristxt, broker);
		}
		else{
			// just clear the broker to avoid extra clutter
		    broker.innerHTML = "";
		}
	}
	return kvmpris;
}

function isNumber(nmb){
	return (nmb && ! isNaN(nmb) && nmb > 0);
}


function calcSum(pr){
	if (! isNaN(pr) && pr > 0){
		num++;
		sum = sum + pr ;
	}
}
// from: http://www.mredkj.com/javascript/numberFormat.html
function fixNumber(nStr)
{
	nStr += '';
	x1 = nStr;
	rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + '.' + '$2');
	}
	return x1 + ",-";
}
