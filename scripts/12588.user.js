// ==UserScript==
// @name           justin.tv mini
// @namespace      http://mikeallred.com/greasemonkey
// @include        http://justin.tv/*
// @include        http://www.justin.tv/*
// ==/UserScript==

// find the embed code 

window.camLink = '';
theResult = getXpathResult("id('embed')/@value");
for (var i = 0; i < theResult.snapshotLength; i++) {
    GM_setValue(camLink, theResult.snapshotItem(i).value);
}

// prints the link

function printLink() {
 theElem = document.getElementById('subplayer_buttons');
 embed = GM_getValue(camLink);
 embed = embed.replace(/width="\d+"/, 'width="100%"');
 embed = embed.replace(/height="\d+"/, 'height="100%"');
 //alert("debug: " + embed);
 random = Math.floor(Math.random()*1000);
 myLink = document.createElement('a');
 myLink.setAttribute('href', 'javascript: camwin = window.open("", "jtv' + random + '", "location=0,resizable=1,statusbar=0,toolbar=0,width=300,height=300");history.go(0);camwin.document.writeln("kilroy");camwin.document.body.innerHTML=' + "'" + embed + "'" + ';');
 myText = document.createTextNode('mini');
 myLink.appendChild(myText);
 theElem.appendChild(myLink);
}

function getXpathResult(expr) {
    theResult = document.evaluate(
        expr,
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null
    );
    return theResult;
}

printLink();
