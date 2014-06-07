// ==UserScript==
// @name          Neptun kérdőív kitöltés kötelezettség megkerülő
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Mindenkinek ERŐSEN ajánljuk a kérdőív kitöltését, hiszen ennek a segítségével is jobbá válik az oktatás színvonala az egyetemünkön, annak akit pedig mégis zavar a felugró idegesítő ablak, annak itt a megoldás.
// @include       https://netw*.nnet.sze.hu/hallgato*/main.aspx
// ==/UserScript==

function spamOff() {
	document.getElementById('userctrlmodalOpinionConfirmation_ConfirmOpinion_btnNo').click();
}
document.body.onload = spamOff();