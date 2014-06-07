//---------------------------------------------------
// Stopped working?  Not working 100% any longer?
// Give me a description of the problem.
// Email: i-at-ihearth4x0ring.info
//---------------------------------------------------
// Last Modified: $Date: 2007-08-23 23:31:16 +0800 (Thu, 23 Aug 2007) $
//------------------- Changes -----------------------
// August 23rd, 2007: 2.0
// * Added cleanup of Kontera popups (previously only handled Intellitxt).
// * Now Use XPath to reconstitute text broken up into separate text nodes.
// * Added checking for telltale script elements before adding the event 
//   listener to try to avoid bogging down sites that do a lot of DOM node
//   insertions but do not use text popups.
// September 20th, 2007:2.1
// * Added hasAttribute check for script element src attribute before getAttribute call 
//---------------------------------------------------

// ==UserScript==
// @name          Uh Oh intelliTXT!  Link Ad Remover
// @namespace     http://www.briandonovan.info/self-assembly/
// @description   Removes the annoying link ads and popup div tooltips triggered by intelliTXT link ads
// @include       http://*
// @version       2.1
// ==/UserScript==

window.uhohintelliTXT = function(event) {
    if ((event.target.nodeName.toLowerCase() === 'a') || (event.target.nodeName.toLowerCase() === 'span')) {
        if (event.target.hasAttribute('class')) {
            var strClassName = event.target.getAttribute('class');
            if ((strClassName.indexOf('kLink') >= 0) || 
                (strClassName.indexOf('iAs') >= 0) || 
                (strClassName.indexOf('intellitextLink') >= 0)) 
            {
                var xpathResult = document.evaluate('descendant-or-self::*', event.target, null, XPathResult.STRING_TYPE, null);
                var textnodeLinkText = document.createTextNode(xpathResult.stringValue);
                event.target.parentNode.replaceChild(textnodeLinkText, event.target)
            }
        }
    }
}

var nlScriptElements = document.getElementsByTagName('script');

for (var i=0; i<nlScriptElements.length; i++) {
    if (nlScriptElements[i].hasAttribute('src')) {
        var strScriptElemSrcAttribVal = nlScriptElements[i].getAttribute('src');
        if (typeof(strScriptElemSrcAttribVal) === 'string') {
            if ((strScriptElemSrcAttribVal.indexOf('kontera.com') >= 0) || 
                (strScriptElemSrcAttribVal.indexOf('intellitxt.com') >= 0) )
            {
                document.addEventListener('DOMNodeInserted',window.uhohintelliTXT,true);
                break;
            }
        }
    }
}



