// ==UserScript==
// @name        Better időkép
// @namespace   sandros.atw.hu
// @include     http://www.idokep.hu/
// @version     1
// @grant       1
// ==/UserScript==
// ==NoBanner==
body = document.body;
if(body != null) {
	div = document.createElement("style");
	div.setAttribute('type','text/css');
	div.innerHTML = "body { background: #202020; }"
	               +".menu, .fomenu, .fomenu a, .dobozfej { background:#303030; color: white; }"
	               +".fomenu a:hover { background:#6b6b6b; }"
	               +".fomenu a.aktiv { background:#5b5b5b; color: white; }"
	               +"div.fejlec.cf { display: none; visibility: hidden; height: 0; }"
	               +".menu .almenu a { color: #f2f2f2; }"
	               +"div.fohasab, div.oldalsav { color: #323232; }"
	               +"div.wrap { width: 636px; } div.oldalsav { display: none; }"
	               +".rovat_ajanlok, #frisskepek, #skycast { display: none; }"
	               +"a[href='/thirdparty'] { display: none; }"
	               +".meteoterkepek { background: transparent; margin-bottom: 0; }"
	               +".meteoterkepek h2 { display: none; }"
	               +"#terkepbox h2, #elorecim, .maidatum { visibility: hidden; }"
	               +".almenu .napkelte { background: transparent; color: #fff; }"
	               +".menu { margin-top: -140px; }"
	               +"img[alt='Adaptive Média'] { display: none; }";
	body.appendChild(div);
	//document.getElementById('frisskepek').innerHTML='<h3 style="text-align:center">minimalIdőkép by <a href="http://sandros.atw.hu">sandros</a></h3>';
}
// ==============
