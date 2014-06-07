// ==UserScript==
// @name           zapOccupy
// @namespace      1.10
// @description    Get rid of that occupy GIF shit.
// @match        http://*.4chan.org/*
// ==/UserScript==

//*[@id="occupy-widget-wrapper"]
        
var del = 0;
var fprw = document.getElementsByTagName('div');
for (var i=0; i<fprw.length; i++) {
	if (fprw[i].id == 'occupy-widget-wrapper') fprw[i].innerHTML='';
}
