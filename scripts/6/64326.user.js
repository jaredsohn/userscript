// ==UserScript==
// @name          Snip-Me - Amazonpreise ueberwachen
// @namespace     http://www.snip-me.de/
// @description   Ueberwachen von Preisen auf Amazon durch Oeffnen eines Pop-Ups.
// @include       http://www.amazon.de/*
// @include       http://www.amazon.co.uk/*
// @include       http://www.amazon.fr/*
// @include       http://www.amazon.com/*
// ==/UserScript==
var doc=document;var injectIn="priceBlock";var variations="false";if(doc.getElementById("variationBox"))
{if(doc.getElementById("price-and-olp-condition-link-outer"))
injectIn="price-and-olp-condition-link-outer";else
{variations="true";injectIn="variationBox";}}
var div=erzeugeDiv(doc,variations);einklinken(doc,div,injectIn);function erzeugeDiv(doc,variations)
{var arrDom=doc.domain.split(".");var locale=arrDom[arrDom.length-1];var div=doc.createElement("div");var stl="cursor:pointer;width:185px;padding-left:15px;border:1px solid #CCC;border-radius:3px;";if(variations||doc.getElementById('platform-information_feature_div'))
stl+="margin-bottom:5px;";div.setAttribute("style",stl);div.innerHTML='<img src="http://www.snip-me.de/pics/d_opera.png" alt="" style="float:left;margin:4px 10px 4px 0px;" /> '+' <div style="margin-top:7px;">Preisalarm aktivieren</div>';div.addEventListener("click",function(){var url="http://www.snip-me.de/popUp.aspx?artikel="+encodeURIComponent(doc.title)+"&url="+
encodeURIComponent(doc.location.href)+"&src=Add-On"+"&var="+variations.toString()+"&lo="+locale;window.open(url,null,"width=450,height=325,left=320,top=175,status=no,resizable=yes,scrollbars=no,toolbar=no,location=no,menubar=no");},false);return div;}
function einklinken(doc,div,injectIn)
{var el=doc.getElementById(injectIn);if(el)
el.parentNode.insertBefore(div,el.nextSibling);else
{el=doc.getElementById("olpDivId");if(el)
el.parentNode.insertBefore(div,el.nextSibling);}}