// ==UserScript==
// @name           FB - voll dufte
// @namespace      Philipp
// @version 0.1
// @description    Facebook voll dufte Button
// @include        http*://*.facebook.com/*
// @include        https://www.facebook.com/
// @match          http://*.facebook.com/*
// @match          https://*.facebook.com/*
// @exclude        http://*.facebook.com/login.php
// @include        http://*.facebook.com/sharer*
// @include        http://*.facebook.com/ajax/*
// @exclude        http://*.facebook.com/plugins/*

// @include        http*://apps.facebook.com/*
// @include        http*://*.facebook.com/apps/*
// @updateURL http://userscripts.org/scripts/source/130537.meta.js
// @downloadURL http://userscripts.org/scripts/source/130537.user.js
// ==/UserScript==



/*--- To "refire" our Greasemonkey code on AJAX changes, we wrap it in
    a function and call it on a DOM change event.
*/

var zGbl_DOM_ChangeTimer                = '';
var bGbl_ChangeEventListenerInstalled   = false;


/*--- Run everything after the document has loaded.  Avoids race-
      conditions and excessive "churn".
*/
window.addEventListener ("load", MainAction, false);


function MainAction ()
{
    if (!bGbl_ChangeEventListenerInstalled)
    {
        bGbl_ChangeEventListenerInstalled   = true;

        /*--- Notes:
                (1) If the ajax loads to a specific node, add this
                    listener to that, instead of the whole body.
                (2) iFrames may require different handling.
        */
        document.addEventListener ("DOMSubtreeModified", HandleDOM_ChangeWithDelay, false);
    }

function Universal1(str){
  return str.replace(/gefällt das./g,"findet das voll dufte.")
    .replace(/g[Ee][Ff][Ää][Ll][Ll][Tt][ ][Dd][Aa][Ss][Ss][.]/g,"findet das voll dufte.")
    .replace(/G[Ee][Ff][Ää][Ll][Ll][Tt][ ][Dd][Aa][Ss][Ss][.]/g,"findet das voll dufte.")
}
function Universal3(str){
  return str.replace(/Gefällt mir/g,"voll dufte!")
    .replace(/g[Ee][Ff][Ää][Ll][Ll][Tt][ ][Mm][Ii][Rr]/g,"voll dufte!")
    .replace(/G[Ee][Ff][Ää][Ll][Ll][Tt][ ][Mm][Ii][Rr]/g,"voll dufte!")
}
function Universal2(str){
  return str.replace(/Gefällt mir nicht mehr/g,"voll scheisse")
    .replace(/g[Ee][Ff][Ää][Ll][Ll][Tt][ ][Mm][Ii][Rr][ ][Nn][Ii][Cc][Hh][Tt][ ][Mm][Ee][Hh][Rr]/g,"voll scheisse")
    .replace(/G[Ee][Ff][Ää][Ll][Ll][Tt][ ][Mm][Ii][Rr][ ][Nn][Ii][Cc][Hh][Tt][ ][Mm][Ee][Hh][Rr]/g,"voll scheisse")
}       


function replaceTextContent(node) {
  var length, childNodes
  if (node.nodeType == Node.TEXT_NODE) {
    node.textContent = Universal1(node.textContent)
    node.textContent = Universal2(node.textContent)
    node.textContent = Universal3(node.textContent)
  } else {
    childNodes = node.childNodes
    length = childNodes.length
    for(var i=0; i<length; ++i){
      replaceTextContent(childNodes[i])
    }
  }
}

replaceTextContent(document.body)
document.title = Universal1(document.title)
document.title = Universal2(document.title)
document.title = Universal3(document.title)
}


function HandleDOM_ChangeWithDelay (zEvent)
{
    /*--- DOM changes will come hundreds at a time, we wait a fraction
          of a second after the LAST change in a batch.
    */
    if (typeof zGbl_DOM_ChangeTimer == "number")
    {
        clearTimeout (zGbl_DOM_ChangeTimer);
        zGbl_DOM_ChangeTimer = '';
    }
    zGbl_DOM_ChangeTimer     = setTimeout (function() { MainAction (); }, 800); //-- 222 milliseconds
}
