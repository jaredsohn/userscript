// ==UserScript==
// @name           Google Buttons
// @namespace      http://userscripts.org/scripts/show/66988
// @description    Adds Google some useful buttons
// @include        http://www.google.com/
// @include        http://www.google.co.il/
// @include        http://www.google.fr/
// @include        http://www.google.gr/
// @include        http://www.google.co.uk/
// @include        http://www.google.ru/
// @include        http://www.google.fi/
// @include        http://www.google.ca/
// @include        http://www.google.com.mx/
// @include        http://www.google.it/
// @include        http://www.google.es/
// @include        http://www.google.pt/
// @include        http://www.google.com.ar/
// @include        http://www.google.com.br/
// @include        http://www.google.cn/
// @include        http://www.google.com.au/
// @include        http://www.google.com.bo/
// @include        http://www.google.co.in/
// @include        http://www.google.cl/
// @include        http://www.google.com.co/
// @include        http://www.google.cg/
// @include        http://www.google.co.ck/
// @include        http://www.google.co.cr/
// @include        http://www.google.com.cu/
// @include        http://www.google.dk/
// @include        http://www.google.com.do/
// @include        http://www.google.com.ec/
// @include        http://www.google.com.sv/
// @include        http://www.google.com.fj/
// @include        http://www.google.gm/
// @include        http://www.google.de/
// @include        http://www.google.com.gi/
// @include        http://www.google.gl/
// @include        http://www.google.com.gt/
// @include        http://www.google.hu/
// @include        http://www.google.ie/
// @include        http://www.google.com.jm/
// @include        http://www.google.co.jp/
// @include        http://www.google.co.ke/
// @include        http://www.google.lv/
// @include        http://www.google.lu/
// @include        http://www.google.li/
// @include        http://www.google.mn/
// @include        http://www.google.com.na/
// @include        http://www.google.com.np/
// @include        http://www.google.co.nz/
// @include        http://www.google.com.ni/
// @include        http://www.google.no/
// @include        http://www.google.com.pa/
// @include        http://www.google.com.pe/
// @include        http://www.google.pl/
// @include        http://www.google.ro/
// @include        http://www.google.sk/
// @include        http://www.google.se/
// @include        http://www.google.com.ua/
// @include        http://www.google.vg/
// @include        http://www.google.co.vi/
// ==/UserScript==

var target = document.evaluate('.//a[contains(@href,"/privacy.html")]',document.body,null,9,null).singleNodeValue;

function append(element) {
	target.parentNode.insertBefore(element,target.nextSibling);
	target = element;
}

var div1 = document.createElement("center"); append(div1);
div1.innerHTML = "<input type='button' value='FxP' onclick=\"javascript:parent.location='http://www.fxp.co.il'\"></input>";

var div1 = document.createElement("center"); append(div1);
div1.innerHTML = "<input type='button' value='Lockerz' onclick=\"javascript:parent.location='http://www.lockerz.com/'\"></input>";

var div1 = document.createElement("center"); append(div1);
div1.innerHTML = "<input type='button' value='You-Tube' onclick=\"javascript:parent.location='http://www.youtube.com/'\"></input>";

var div1 = document.createElement("center"); append(div1);
div1.innerHTML = "<input type='button' value='Speed Test' onclick=\"javascript:parent.location='http://www.speedtest.net'\"></input>";

var div1 = document.createElement("center"); append(div1);
div1.innerHTML = "<input type='button' value='[User Scripts]' onclick=\"javascript:parent.location='http://userscripts.org'\"></input>";

var div1 = document.createElement("center"); append(div1);
div1.innerHTML = "<input type='button' value='?What is my IP' onclick=\"javascript:parent.location='http://www.whatismyip.com/'\"></input>";

var div1 = document.createElement("center"); append(div1);
div1.innerHTML = "<input type='button' value='Google Translate' onclick=\"javascript:parent.location='http://translate.google.com/#'\"></input>";

var div1 = document.createElement("center"); append(div1);
div1.innerHTML = "<input type='button' value='Facebook Login Page' onclick=\"javascript:parent.location='http://www.facebook.com/login.php'\"></input>";