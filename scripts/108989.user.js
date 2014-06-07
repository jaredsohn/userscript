
scr_meta=<><![CDATA[ 
// ==UserScript==
// @name           VPAutoAddToCartBETA
// @namespace      hfrliano
// @description    Auto add to cart
// @version        0.1.1
// @include        http://fr.vente-privee.com/*
// @require    http://sizzlemctwizzle.com/updater.php?id=108989&uso
// ==/UserScript==
]]></>.toString(); 

//TEEEEST
if(document.getElementById('ctl00_mainColumnContent_saleStageViewer_liBasket'))
{
alert('Alerte Panier')
}

if(document.getElementById('productId'))
{
	elements = document.getElementById('productId') 
	elements.remove(0)
	var i=0;
	for (i=0;i<elements.length;i++) { if(elements[i].text.match("épuisé")) {elements.remove(i);i--}  }
	for (i=0;i<elements.length;i++) { 
		if(elements[i].text.match("T. 43")) {elements.selectedIndex=i}  
		if(elements[i].text.match("T. M")) {elements.selectedIndex=i}  
				if(elements[i].text.match("T. 3")) {elements.selectedIndex=i}  
						if(elements[i].text.match("T.3")) {elements.selectedIndex=i}  
	}
}


//var inputElm = document.createElement('input');
//inputElm.setAttribute("type", "text");
//inputElm.setAttribute("name", "bcc");
//var aaa = getElementsByClass("document","mainBloc","div")
//aaa.appendChild( inputElm  )



if(document.getElementById('addToCart')) {
document.getElementById('addToCart').click();
}

if(document.getElementById('visualFP')) {
setTimeout("window.location.reload(true)",3000);
}
