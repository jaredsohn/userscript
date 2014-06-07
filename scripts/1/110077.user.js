// ==UserScript==
// @name           Facebook Smile
// @namespace      Smiley extension for Facebook
// @description    Facebook Réunion
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @developer      HaryChange http://www.facebook.com/H.change
// ==/UserScript==

function replaceByClass(className, obj) {
    if(obj.getElementsByClassName) {
        var nodes = obj.getElementsByClassName(className);
        for(i in nodes) {if(typeof(nodes[i].innerHTML)=="string") {makeYahoo(nodes[i]);}}
    }
}
function makeYahoo(node) {
	var emlink = "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/";
    node.innerHTML = node.innerHTML.replace(/\^\#\(\^/g, "<img src=\'"+emlink+"114.gif\' />").replace(/\:\-(B|b)(D|d)/g, "<img src=\'"+emlink+"113.gif\' />").replace(/\:\-(Q|q)/g, "<img src=\'"+emlink+"112.gif\' />").replace(/\\(M|m)\//g, "<img src=\'"+emlink+"111.gif\' />").replace(/(X|x)\_(X|x)/g, "<img src=\'"+emlink+"109.gif\' />").replace(/:-\?\?/g, "<img src=\'"+emlink+"106.gif\' />").replace(/8-\&gt;/g, "<img src=\'"+emlink+"105.gif\' />").replace(/:-(H|h)/g, "<img src=\'"+emlink+"103.gif\' />").replace(/\~(X|x)\(/g, "<img src=\'"+emlink+"102.gif\' />").replace(/;\)\)/g, "<img src=\'"+emlink+"71.gif\' />").replace(/\\:(D|d)\//g, "<img src=\'"+emlink+"69.gif\' />").replace(/\:\-\'/g, "<img src=\'"+emlink+"65.gif\' />").replace(/\[-(O|o)\&lt;/g, "<img src=\'"+emlink+"63.gif\' />").replace(/:-(L|l)/g, "<img src=\'"+emlink+"62.gif\' />").replace(/\&gt;-\)/g, "<img src=\'"+emlink+"61.gif\' />").replace(/\@\};-/g, "<img src=\'"+emlink+"53.gif\' />").replace(/\&gt;:(P|p)/g, "<img src=\'"+emlink+"47.gif\' />").replace(/\:\-\&lt\;/g, "<img src=\'"+emlink+"46.gif\' />").replace(/:-(W|w)/g, "<img src=\'"+emlink+"45.gif\' />").replace(/:\^(O|o)/g, "<img src=\'"+emlink+"44.gif\' />").replace(/:-(S|s)(S|s)/g, "<img src=\'"+emlink+"42.gif\' />").replace(/=(D|d)\&gt;/g, "<img src=\'"+emlink+"41.gif\' />").replace(/\#-(O|o)/g, "<img src=\'"+emlink+"40.gif\' />").replace(/:-\?/g, "<img src=\'"+emlink+"39.gif\' />").replace(/\(:\|/g, "<img src=\'"+emlink+"37.gif\' />").replace(/\&lt;:-(P|p)/g, "<img src=\'"+emlink+"36.gif\' />").replace(/\[-\(/g, "<img src=\'"+emlink+"33.gif\' />").replace(/:-\$/g, "<img src=\'"+emlink+"32.gif\' />").replace(/:-(\&amp;|\&)/g, "<img src=\'"+emlink+"31.gif\' />").replace(/(L|l)-\)/g, "<img src=\'"+emlink+"30.gif\' />").replace(/(I|i)\-\)/g, "<img src=\'"+emlink+"28.gif\' />").replace(/\=\;/g, "<img src=\'"+emlink+"27.gif\' />").replace(/\:\-?(B|b)/g, "<img src=\'"+emlink+"26.gif\' />").replace(/(O|o|0)\:\-?\)/g, "<img src=\'"+emlink+"25.gif\' />").replace(/\=\)\)/g, "<img src=\'"+emlink+"24.gif\' />").replace(/\/\:\-?\)/g, "<img src=\'"+emlink+"23.gif\' />").replace(/\:\-?\|/g, "<img src=\'"+emlink+"22.gif\' />").replace(/\:\-?\)\)+/g, "<img src=\'"+emlink+"21.gif\' />").replace(/\:(\'|\()\(+/g, "<img src=\'"+emlink+"20.gif\' />").replace(/\&gt\;\:\)/g, "<img src=\'"+emlink+"19.gif\' />").replace(/\#\:\-(S|s)/g, "<img src=\'"+emlink+"18.gif\' />").replace(/\:\-(S|s)/g, "<img src=\'"+emlink+"17.gif\' />").replace(/(B|b)\-\)/g, "<img src=\'"+emlink+"16.gif\' />").replace(/:\-?\&gt\;/g, "<img src=\'"+emlink+"15.gif\' />").replace(/(X|x)\-?\(/g, "<img src=\'"+emlink+"14.gif\' />").replace(/\:\-?(O|o)/g, "<img src=\'"+emlink+"13.gif\' />").replace(/\=\(\(/g, "<img src=\'"+emlink+"12.gif\' />").replace(/\:\-?\*/g, "<img src=\'"+emlink+"11.gif\' />").replace(/\:\-?(P|p)/g, "<img src=\'"+emlink+"10.gif\' />").replace(/\:\'\&gt\;/g, "<img src=\'"+emlink+"9.gif\' />").replace(/\:(X|x)/g, "<img src=\'"+emlink+"8.gif\' />").replace(/\:\-\//g, "<img src=\'"+emlink+"7.gif\' />").replace(/\&gt\;\:(D|d)\&lt\;/g, "<img src=\'"+emlink+"6.gif\' />").replace(/\;\;\)/g, "<img src=\'"+emlink+"5.gif\' />").replace(/\:\-?(D|d)/g, "<img src=\'"+emlink+"4.gif\' />").replace(/\;\-?\)/g, "<img src=\'"+emlink+"3.gif\' />").replace(/\:\-?\(/g, "<img src=\'"+emlink+"2.gif\' />").replace(/\:\-?\)/g, "<img src=\'"+emlink+"1.gif\' />");
}
function commonInsert(obj) {
    if(typeof(obj)=="object") {
        replaceByClass('commentContent', obj);
        replaceByClass('mobile_status', obj);
        replaceByClass('uiStreamMessage', obj);
        replaceByClass('GBThreadMessageRow_Body_Content', obj);
        replaceByClass('UIStory_Message', obj);
    }
}
function nodeInserted(event) {commonInsert(event.target);}
commonInsert(document);
document.addEventListener("DOMNodeInserted", nodeInserted, true);

