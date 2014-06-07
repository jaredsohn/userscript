// ==UserScript==
// @name            mBTC Viewer
// @namespace       gmdavestevens/mBTC Viewer
// @description     Converts various BTC denominations to mBTC.
// @version         .2.03.1
// @match *://*/*
// @license MIT License
// ==/UserScript==

/* If you find this script useful, please send be some mBTC:
 * 1s6vSEBpqcGAp4iTgEeGs5U9xrEnpPyYv
 * 
 * i used the s/keyboard/leopard/g from http://userscripts.org/scripts/show/128626 for the base.
 * the rest of the sloppy code is all mine.
 */

var onlyBTC = "";
var splitBTC = [];

//Text to match BTC amount
var matchBTC = /(\.)?[0-9]{1,3}(?:\,?[0-9]{3})*(?:\.[0-9]*)?( ){1}((u?μ?BTC)|(satoshi)|(Satoshi)|(SATOSHI))/gi;

//The difference between mBTC and different denominations, must be case sensitive.
var diffFromMBTC = {uBTC:0.001,BTC:1000,btc:1000,ubtc:0.001,"μBTC":0.001,satoshi:0.00001,Satoshi:0.00001,SATOSHI:0.00001};

function convertBTC(longText){
    onlyBTC = longText.match(matchBTC).join();
    splitBTC = onlyBTC.split(" ");
    splitBTC[0] = Number(splitBTC[0].replace(/,/g,'')) * diffFromMBTC[splitBTC[1]];
    return longText.replace(onlyBTC,parseFloat(splitBTC[0].toFixed(7)) + " mBTC");

}      
    
// define the noteType value for TEXT_NODEs (the kind we want to replace)
// Some browsers may fail to make this value available - it's 3
var TEXT_NODE = Node.TEXT_NODE || 3;

// Flag to signal that we're replacing text, so that change doesn't trigger
// another replacement 
var replacingContent = false;

function replaceTextContent(node) {
  if (~node.textContent.search(matchBTC)) {
    //flag that content is being replaced so the event it generates
    //won't trigger another replacement
    replacingContent = true;
    node.textContent = convertBTC(node.textContent);
    replacingContent = false;
  }
}

function changeTextNodes(node) {
  var length, childNodes;
  //If this is a text node, convertBTC it
  if (node.nodeType == TEXT_NODE) {
    replaceTextContent(node);
  //If this is anything other than a text node, recurse any children
  } else {
    childNodes = node.childNodes;
    length = childNodes.length;
    for(var i=0; i<length; ++i){
      changeTextNodes(childNodes[i]);
    }
  }
}

function insertion_listener(event) {
  //change any new text nodes in a node that is added to the body
  changeTextNodes(event.target);
}    

function cdm_listener(event) {
  //avoid infinite loop by ignoring events triggered by replacement
  if(!replacingContent){
    replaceTextContent(event.target);
  }
}
    
changeTextNodes(document.body);
document.title = replaceTextContent(document.title);
document.body.addEventListener ("DOMNodeInserted", insertion_listener, false);
document.body.addEventListener ("DOMCharacterDataModified", cdm_listener, false);
    
    
  