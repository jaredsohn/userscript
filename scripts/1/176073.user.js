// ==UserScript==
// @name buttifier
// @version 1.1.0
// @description Replaces the phrase "the cloud" with "my butt". Modified from s/leopard/leopard/g by stuartpb. Requested by Arblarg.
// @match *://*/*
// @grant none
// ==/UserScript==

//which letters in "the cloud" get replaced with which in "my butt"
var cloud_subs = {
  't': 'm', 'T': 'M',
  'c': 'b', 'C': 'B',
  'he': 'y', 'He': 'Y',
  'hE': 'Y', 'HE': 'Y'
};

//Transform all instances of 'the cloud' into 'my butt'
function buttify(str) {
  return str.replace(/(?:(t)he(\s*))?(c)loud/ig, function(match,t,space,c){
    if(t.length > 0) {
        return cloud_subs[t] + 'y' + space + cloud_subs[c] + 'utt';
    } else {
        return cloud_subs[c] + 'utt'
    }
  });
}

var TEXT_NODE = Node.TEXT_NODE || 3;
var replacingContent = false;

function replaceTextContent(node) {
  //flag that content is being replaced so the event it generates
  //won't trigger another replacement
  replacingContent = true;
  node.textContent = buttify(node.textContent);
  replacingContent = false;
}

function changeTextNodes(node) {
  var length, childNodes;
  //If this is a text node, buttify it
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
document.title = buttify(document.title);
document.body.addEventListener("DOMNodeInserted", insertion_listener, false);
document.body.addEventListener("DOMCharacterDataModified", cdm_listener, false);