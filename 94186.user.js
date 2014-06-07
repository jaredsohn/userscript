// ==UserScript==
// @name           Goear sin publicidad (no ads)
// @namespace      nicopiana@gmail.com
// @description    Removes the ads o quita la publicidad
// @include        *goear.com/listen*
// ==/UserScript==

var divad = document.getElementById("player_ads");
divad.parentNode.removeChild(divad);

var divadb = document.getElementById("bottom_ads");
divadb.parentNode.removeChild(divadb);

document.onreadystatechange = removepub();

function removepub() {
var elementobody = document.getElementsByTagName("body")[0];

var arrayIframesdelbody = elementobody.getElementsByTagName("iframe");
var numerodeiframes = arrayIframesdelbody.length;
var contadordeiframes = 0;

while (contadordeiframes < numerodeiframes){

if (arrayIframesdelbody[contadordeiframes].className == "banner"){
	var iframebanner = arrayIframesdelbody[contadordeiframes];
	iframebanner.parentNode.removeChild(iframebanner);
	contadordeiframes = 0;
}
else if (arrayIframesdelbody[contadordeiframes].className == "med_rectangle"){
	var iframemed = arrayIframesdelbody[contadordeiframes];
	iframemed.parentNode.removeChild(iframemed);
	contadordeiframes = 0;
}
else if (arrayIframesdelbody[contadordeiframes].className == "skycraper"){
	var iframesky = arrayIframesdelbody[contadordeiframes];
	iframesky.parentNode.removeChild(iframesky);
	contadordeiframes = 0;
};
contadordeiframes++;
};
}