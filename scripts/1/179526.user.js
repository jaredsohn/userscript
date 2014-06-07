// ==UserScript==
// @name        Icon Collector
// @namespace   aweuhfawleufhawelfuwjshfdslkfjdhslka
// @include     *
// @version     1
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_registerMenuCommand
// ==/UserScript==

GM_registerMenuCommand("Show icons", blankPage, "S");
GM_registerMenuCommand("Erase icons", deleteAll, "E");

here  = document.location.href;
icons = GM_getValue("icons", 0) || "http://go-here.nl/favicon.ico";
html  = "";

function blankPage(){
	document.location.href = "http://go-here.nl/empty-page.html";
}
function deleteAll(){
	GM_setValue("icons", "http://go-here.nl/favicon.ico");
}

if (here.indexOf('http://go-here.nl/empty-page.html') == 0){

		icons = icons.split('#');

		for(x=0;x<icons.length;x++){

			image  = '<img src="'+icons[x]+'" onerror="this.style.display=\'none\'">';

			domain = icons[x].split('/')[2];

			html   += '<a href="http://' + domain + '" title="' + domain + '">' + image + '</a>';

		}
		
		document.getElementById('html').innerHTML = html;

}else{

	where = here.split('/')[2]; // get the right part like so: 0="http:" / 1="" / 2="foo.example.com" / 3="index.html" / 4="etc......

	where = where.split('.'); // like so: 0="foo" . 1="example" . 2="com"

	url = where[where.length-2] + '.' + where[where.length-1]; // we only want the last 2 parts

	if(icons.indexOf(url) == -1){

		icons = icons + "#http://" + url + "/favicon.ico";

		GM_setValue("icons", icons);

	}

}