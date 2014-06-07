// ==UserScript==
// @name        Lajki
// @namespace   Lajki
// @include     https://www.facebook.com/chodakowskaewa/likes
// @version     1
// @grant       none
// ==/UserScript==

var getElementByXpath = function (path) {
  return document.evaluate(path, document, null, 9, null).singleNodeValue;
};

var fani = getElementByXpath("//div/div[2]/div[2]/div[2]/span")
var liczbaFanow = parseInt(fani.textContent.replace(".",""));
if(liczbaFanow==999999) {
	var przycisk = document.getElementById("u_0_1d");
	przycisk.click();
}
else {
	document.location.reload(true);
}