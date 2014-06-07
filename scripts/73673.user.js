// ==UserScript==
// @name           vk online ipad
// @namespace      www.volkskrant.nl/vk-online/
// @description    vk online voor ipad
// @include        http://www.volkskrant.nl/vk-online/*
// ==/UserScript==

var remove = ['pdfDownload','toolbar_bottom','domeinenmenu','onlinelogo','datumbalk','toolbar_top','footer','sectieLinks','sectieLinksHeader','bladeren','searchform'];

for (var div in remove) {

	var remdiv = document.getElementById(remove[div]);

	if (remdiv) {
	    remdiv.parentNode.removeChild(remdiv);
	}

}

//begin zijbalk verwijderen

// dit werkt alleen in firefox (xpath):
var allDivs, thisDiv;
allDivs = document.evaluate(    "//div[@class='bgLightGray']",    document,    null,    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {

thisDiv = allDivs.snapshotItem(i);    
thisDiv.parentNode.removeChild(thisDiv);
// einde van firefoxspecifieke code

}

//einde zijbalk verwijderen


// begin css veranderen

addGlobalStyle('div#vkonline { margin-left: 0px ! important; }');

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// einde css veranderen


