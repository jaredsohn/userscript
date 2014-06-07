// ==UserScript==
// @name       YabanciDiziIzle Ad Remover
// @namespace  @alpsayin
// @version    0.3
// @description  removes and breaks the links of all ads in yabancidiziizle.com
// @match      http://www.yabancidiziizle2.com/*
// @match      http://www.yabancidiziizle1.com/*
// @match      http://www.yabancidiziizle1.net/*
// @match      http://www.yabancidiziizle.com/*
// @match      http://www.yabancidiziizle.net/*
// @copyright  2012+, You
// ==/UserScript==

//Siteye uye oldugunuz zaman goreceginiz reklamlari kaldirir. Adamlar calisiyor, bi zahmet uye de olun yani...
//Gerci Homeland'i kaldirmalarina biraz bozulmustum ya neyse

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
addGlobalStyle('#flashContent { display:none!important; }');
addGlobalStyle('#vidrek iframe { display:none!important; }');
addGlobalStyle('.reklam728 { display:none!important; }');
addGlobalStyle('.reklam300 { display:none!important; }');
addGlobalStyle("div[class^='reklam'],div[class*=' reklam']{ display:none!important; } }");
addGlobalStyle('.videoaltireklam { display:none!important; }');
addGlobalStyle('#cevirmenDiv { width:510px!important; }');
addGlobalStyle('.videoaltisag { width:550px!important; }');
removeExternalLinks();
