// ==UserScript==
// @name		Newzbin V3 in Amazon - Updated
// @namespace	http://www.google.com
// @description	Puts links to search newzBin v3 into Amazon
// @include	http*//*amazon.co*
// ==/UserScript==
//-----------------------------------
//
// The original idea was taken from Newzbin in Amazon V3 (http://userscripts.org/scripts/show/5495) by andyg
// I installed it but it did not work. I took some code from there and reworked other parts to make it work again.
//
// I then enhanced it by cutting off the title descriptors (such as year, widescreen, blu-ray, etc), I found another script
// that did such an implementation in Newzbin + SABnzbd in Amazon (http://userscripts.org/scripts/show/8232) by Mr Scripts
// so acknowledgements to him for that code.
//
//-----------------------------------

var location, newHR, newLink, productName;
var productsname = '';
var productyear = '';

productName = document.getElementById("prodImage").alt;

location = document.getElementById("jumpbar");
if (location)
{
  newHR = document.createElement("hr");
  newHR.noshade = "noshade";
  newHR.size = "1";

  newLink = document.createElement("a");
  newLink.innerHTML = "(Newzbin search)";
  newLink.href = "http://v3.newzbin.com/search/?fpn=p&q="+getSearchString(productName)+"&emu_subcat=-1&searchaction=Go&emu_subcat_done=-1";
  newLink.target = "_blank";

  location.parentNode.insertBefore(newLink, location.nextSibling);
  location.parentNode.insertBefore(newHR, location.nextSibling);
}

function getSearchString(productsname)
{
    oyear = productsname.match("\\b[1-2][7-9|0][0-9]{2}\\b");
    if (oyear && oyear.length > 0) productyear = oyear[0].replace(' ','');

    var re = new RegExp("\\[[^\\[]+?\\]|\\([^\\(]+?\\)","gi");
    productsname = productsname.replace(re, '');
    
    if (oyear && oyear.length > 0)
    {
    	productsname = productsname.replace(productyear,'');
    }

    if (productsname.split('-').length > 1)
    {
        var phrases = productsname.split('-');
        productsname = trim(phrases[0]);
    }

    if (productsname.split(':').length > 1)
    { 
        var phrases = productsname.split(':');
        productsname = trim(phrases[0]);
    }

    return trim(productsname);
}

function trim(strText) {
    // this will get rid of leading spaces
    while (strText.substring(0,1) == ' ')
        strText = strText.substring(1, strText.length);

    // this will get rid of trailing spaces
    while (strText.substring(strText.length-1,strText.length) == ' ')
        strText = strText.substring(0, strText.length-1);

   return strText;
}
