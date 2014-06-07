// ==UserScript==
// @name           Deviantart Searches Newest, Not Popular
// @namespace      http://www.gshi.org
// @include        http://deviantart.com/*
// @include        https://deviantart.com/*
// @include        http://*.deviantart.com/*
// @include        https://*.deviantart.com/*
// ==/UserScript==

(function(inputs){
var newinputs = document.createElement('input');
newinputs.type='hidden';
newinputs.name='order';
newinputs.value='5';
var input, i=0;
while(input = inputs.snapshotItem(i++)){
if (input != null) {
//newinputs.appendChild(document.createTextNode('Text0 1'));
input.parentNode.insertBefore(newinputs, input.nextSibling);
}

}

})(document.evaluate("//input[@id='searchInput']", document, 
null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null));