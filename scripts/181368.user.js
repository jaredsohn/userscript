// ==UserScript==
// @name       Google Calendar Restyled
// @namespace  http://userscripts.org/scripts/show/181368
// @version    0.5
// @description  Redesigning google calendar to make it cleaner and easier to use
// @author          cozen
// @include         https://*.google.*/calendar/*
// @include         http://*.google.*/calendar/*
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_deleteValue
// @grant           GM_addStyle
// @copyright  2012+, cozen
// ==/UserScript==

window.addEventListener ("load", views_style, false);

function views_style() {
    var vues=document.createElement('div');
    vues.id="Vues";
    var vuesSpan=document.createElement('span');
    vuesSpan.id="vuesSpan";
    var vuesSpanText=document.createTextNode("Vues");
    vuesSpan.appendChild(vuesSpanText);
    var topRightNavigation=document.getElementById('topRightNavigation');
    var vuesFirstChild=topRightNavigation.firstChild;
    vuesFirstChild.removeChild(vuesFirstChild.firstChild);
    console.log("Le premier enfant de topRightNavigation est : ");
    console.log(vuesFirstChild);
    for (var i=0; i<vuesFirstChild.childNodes.length; i++){
        console.log ("L'enfant " +i +" du premier enfant : ");
        console.log(vuesFirstChild.childNodes[i]);
        vues.appendChild(vuesFirstChild.childNodes[i]);
    }
    vuesFirstChild.insertBefore(vues,vuesFirstChild.firstChild);
    for (var j=1; j<vuesFirstChild.childNodes.length; j++) {
        console.log("l'enfant " +j +" qui reste à caser est : ");
        console.log(vuesFirstChild.childNodes[j]);
        vues.appendChild(vuesFirstChild.childNodes[j]);
    }
    for (var k=1; k<vuesFirstChild.childNodes.length; k++) {
        console.log("l'enfant " +j +" qui reste à caser est : ");
        console.log(vuesFirstChild.childNodes[k]);
        vues.appendChild(vuesFirstChild.childNodes[k]);
    }
    var vuesChildren=vues.childNodes;
	for (var l=0; l<vuesChildren.length; l++) {
        if(vuesChildren[l].nodeName=="DIV"){
            vuesChildren[l].style.display="none";
        }
	}
    vuesFirstChild.insertBefore(vuesSpan,vuesFirstChild.firstChild);
/*
    var navHideButton=document.createElement('div');
    navHideButton.id="navHide";
    navHideButton.appendChild(document.createTextNode("+"));
    
    var motherTable=document.getElementById('mothertable');
    for (var m=0; m<motherTable.childNodes.length; m++){
        if (motherTable.childNodes[m].id=='maincell') {
            motherTable.insertBefore(navHideButton, motherTable.childNodes[m]);
        }
    }
 */
/*
    function addNewStyle(newStyle) {
        var styleElement = document.getElementById('styles_js');
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.type = 'text/css';
            styleElement.id = 'styles_js';
            document.getElementsByTagName('head')[0].appendChild(styleElement);
        }
        styleElement.appendChild(document.createTextNode(newStyle));
    }
*/
}


