// ==UserScript==
// @name           Live2Cruize mynda minnkun
// @namespace      Stebbzor
// @description    Minnkar myndir sem eru of stórar.
// @include        http://*live2cruize.com/*
// ==/UserScript==

var z = document.getElementsByTagName('img');

for(i=0;i<z.length;i++) {
    if(z[i].width >= screen.width*0.25){
        z[i].width = screen.width*0.25;
	}
    if(z[i].height >= screen.height*0.5){
        z[i].height = screen.height*0.5;
	}
}