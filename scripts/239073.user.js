// ==UserScript==
// @name       Harika Dizi Ad Remover
// @namespace  @alpsayin
// @version    0.3
// @description  removes and breaks the links of all ads in harikadizi.net
// @match      http://www.harikadizi.net/*
// @match      http://www.harika-dizi.net/*
// @match      http://www.harikadizi.com/*
// @match      http://www.harika-dizi.com/*
// @copyright  2012+, You
// ==/UserScript==

//Siteye uye oldugunuz zaman goreceginiz reklamlari kaldirir. Adamlar calisiyor, bi zahmet uye de olun yani...

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function removeExternalLinks() {
	var anchors = document.getElementsByTagName('a');
    for(var i=0; i<anchors.length; i++)
    { 
        if(anchors[i].target == '_blank') 
        {
            console.log(i+':'+anchors[i]);
            anchors[i].href='#';
            anchors[i].target='_self';
        }
    }
}

addGlobalStyle('body { background-image:none!important; background-color:#1b1b1b!important; }');
addGlobalStyle('#ust2 { display:none!important; }');
addGlobalStyle('#toolbarrx { display:none!important; }');
addGlobalStyle('#sidebarreklam { display:none!important; }');
addGlobalStyle('#reklamlar { display:none!important; }');
addGlobalStyle('#alt1 { display:none!important; }');
addGlobalStyle('#alt2 { display:none!important; }');
addGlobalStyle("div[class^='reklam'],div[class*=' reklam']{ display:none!important; } }");
removeExternalLinks();