// ==UserScript==
// @name           WF-Vscan
// @description    Changes VScan screen.
// @include        http://death.war-facts.com/extras/vscan.php*
// @namespace      http://www.whcrow.com/
// ==/UserScript==

function changecss(myclass, element, value) {
    var CSSRules
    if (document.all) {
        CSSRules = 'rules'
    }
    else if (document.getElementById) {
        CSSRules = 'cssRules'
    }
    for (var i = 0; i < document.styleSheets[0][CSSRules].length; i++) {
        if (document.styleSheets[0][CSSRules][i].selectorText == myclass) {
            document.styleSheets[0][CSSRules][i].style[element] = value
        }
    }
}

function createscaniframe() {
    var scaniframe = document.createElement('iframe');
    var iframeIdName = 'scaniframe';
    var url = window.location.href;
    var fleetid = url.split('=')[1];
    var myuri = "http://death.war-facts.com/extras/scan.php?fleet=" + fleetid;
    scaniframe.setAttribute('id', iframeIdName);
    scaniframe.style.width = "500px";
    scaniframe.style.height = "680px";
    scaniframe.style.left = "500px";
    scaniframe.style.top = "0px";
    scaniframe.style.position = "fixed"
    scaniframe.src = myuri;
    document.body.appendChild(scaniframe); 
}

createscaniframe()

var bkrnd = "url('http://i7.photobucket.com/albums/y275/worchw/RadarScreen.png')"
changecss('#scanbox', 'background', bkrnd);
changecss('#vinfo', 'backgroundColor', '#666666');
changecss('#vinfo', 'width', '500px');
