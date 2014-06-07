// ==UserScript==
// @name           remove-marktplaats-ads
// @namespace      marktplaats
// @description    Removes some ads from marktplaats
// @include        http://www.marktplaats.nl/*
// @include        https://www.marktplaats.nl/*
// ==/UserScript==

$=function(expr,node){
	if (node===undefined) node=document;
	var res=document.evaluate(expr,node,null,XPathResult.ANY_UNORDERED_NODE_TYPE,null);
	if (res.singleNodeValue===null) return null; // throw(new Error("Error: no result '"+expr+"'"));
	return res.singleNodeValue;
}

function remove(a) {
	a.parentNode.removeChild(a);
}

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { console.log("no head"); return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

window.addEventListener('load', function(xxx) {
	var all, thiss, c=0;
	try {
		all = document.getElementsByTagName("tr");
		for (var i = all.length-1; i>=0; i--) {
			thiss = all[i];
			if (thiss!=null) {
				var b=false;
				b|=thiss.innerHTML.indexOf('Topadvertentie')!=-1;
				b|=thiss.innerHTML.indexOf('Dagtopper')!=-1;
				b|=thiss.innerHTML.indexOf('Heel Nederland')!=-1;
				b|=thiss.innerHTML.indexOf('Bezorgt in')!=-1;
				b|=thiss.innerHTML.indexOf('Advertenties door Admarkt')!=-1;
				b|=thiss.innerHTML.indexOf('/mediaplex/redirect.html')!=-1;
				if (b) {
					remove(thiss);
				}
			}
		}
	} catch (e) {
		alert("remove-marktplaats-ads: "+e);
	}
}, false);

addGlobalStyle("\
#buy-features>:not(.buttonbar), \
#overlay, \
#blikvanger-dialog, \
#upsell-banner, \
.up-call-column, .dagtopper-column, .top-ad-column, \
.etalage-feature-overlay \
{display: none !important;}\
");
