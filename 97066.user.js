// ==UserScript==
// @name           Horoscope.com Auto-close Ad page
// @namespace      http://kodewerx.org/
// @include        http://*.horoscope.com/*
// ==/UserScript==
unsafeWindow.notthere=0;

unsafeWindow.stillbirth = function (){
  if(unsafeWindow.notthere>=100)
    return;
	if(!(document.getElementById("interContainer")))
  {
    unsafeWindow.notthere++;
		setTimeout("stillbirth()", 100);
	}
	else
		window.location="javascript:interstitialBox.closeit();";
}
setTimeout("stillbirth()", 100);