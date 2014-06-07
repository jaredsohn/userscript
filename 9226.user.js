// ==UserScript==

// @name           block sites

// @namespace      site blocker

// @description    block any site you want!

// @include        *drivecleaner*

// ==/UserScript==
(function () {

	var eHead = document.getElementsByTagName('head');
	var eHtml = document.getElementsByTagName('html');
	var eBody = document.getElementsByTagName('body');

	for(var i=0;i<eHtml.length;i++)
	{
		var nBody = document.createElement('body');
		var text = document.createTextNode('Deze site is geblokkeerd wegens hele slechte 

dingen!! :O');
		var nH = document.createElement('h1');

		for(var j=0;j<eHead.length;j++)
		{
			eHtml[i].removeChild(eHead[j]);
		}
		for(var n=0;n<eBody.length;n++)
		{
			eHtml[i].removeChild(eBody[n]);
		}
		nH.appendChild(text);
		nBody.appendChild(nH);
		eHtml[i].appendChild(nBody);
	}

})();