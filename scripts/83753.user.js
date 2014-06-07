// ==UserScript==
// @name           Yahoo! Emoticons for Social Networks
// @namespace      http://vistaarc.com/
// @description    Replaces text-based emoticons on Facebook, Twitter & Google+
// @include        http*://*facebook.com/*
// @include        http*://*twitter.com/*
// @include        http*://*plus.google.com/*
// @version        1.4
// ==/UserScript==

function replaceByClass(className, obj) {
    if(obj.getElementsByClassName) {
        var nodes = obj.getElementsByClassName(className);
        for(i in nodes) {
            if(typeof(nodes[i].innerHTML)=="string") {
                makeYahoo(nodes[i]);
            }
        }
    }
}

function makeYahoo(node) {
	// See More Fix
	node.innerHTML = node.innerHTML.replace(/&quot;\)/g, '&quot; )');
	node.innerHTML = node.innerHTML.replace(/\^\#\(\^/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/114.gif\' />").replace(/\:\-(B|b)(D|d)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/113.gif\' />").replace(/\:\-(Q|q)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/112.gif\' />").replace(/\\(M|m)\//g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/111.gif\' />").replace(/(X|x)\_(X|x)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/109.gif\' />").replace(/:-\?\?/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/106.gif\' />").replace(/8-\&gt;/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/105.gif\' />").replace(/:-(H|h)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/103.gif\' />").replace(/\~(X|x)\(/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/102.gif\' />").replace(/;\)\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/71.gif\' />").replace(/\\:(D|d)\//g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/69.gif\' />").replace(/\:\-\'/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/65.gif\' />").replace(/\[-(O|o)\&lt;/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/63.gif\' />").replace(/:-(L|l)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/62.gif\' />").replace(/\&gt;-\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/61.gif\' />").replace(/\@\};-/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/53.gif\' />").replace(/\&gt;:(P|p)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/47.gif\' />").replace(/\:\-\&lt\;/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/46.gif\' />").replace(/:-(W|w)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/45.gif\' />").replace(/:\^(O|o)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/44.gif\' />").replace(/:-(S|s)(S|s)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/42.gif\' />").replace(/=(D|d)\&gt;/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/41.gif\' />").replace(/\#-(O|o)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/40.gif\' />").replace(/:-\?/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/39.gif\' />").replace(/\(:\|/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/37.gif\' />").replace(/\&lt;:-(P|p)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/36.gif\' />").replace(/\[-\(/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/33.gif\' />").replace(/:-\$/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/32.gif\' />").replace(/:-(\&amp;|\&)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/31.gif\' />").replace(/(L|l)-\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/30.gif\' />").replace(/(I|i)\-\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/28.gif\' />").replace(/\=\;/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/27.gif\' />").replace(/\:\-?(B|b)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/26.gif\' />").replace(/(O|o|0)\:\-?\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/25.gif\' />").replace(/\=\)\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/24.gif\' />").replace(/\/\:\-?\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/23.gif\' />").replace(/\:\-?\|/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/22.gif\' />").replace(/\:\-?\)\)+/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/21.gif\' />").replace(/\:(\'|\()\(+/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/20.gif\' />").replace(/\&gt\;\:\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/19.gif\' />").replace(/\#\:\-(S|s)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/18.gif\' />").replace(/\:\-(S|s)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/17.gif\' />").replace(/(B|b)\-\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/16.gif\' />").replace(/:\-?\&gt\;/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/15.gif\' />").replace(/(X|x)\-?\(/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/14.gif\' />").replace(/\:\-?(O|o)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/13.gif\' />").replace(/\=\(\(/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/12.gif\' />").replace(/\:\-?\*/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/11.gif\' />").replace(/\:\-?(P|p)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/10.gif\' />").replace(/\:"\&gt\;/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/9.gif\' />").replace(/\:(X|x)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/8.gif\' />").replace(/\:\-\//g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/7.gif\' />").replace(/\&gt\;\:(D|d)\&lt\;/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/6.gif\' />").replace(/\;\;\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/5.gif\' />").replace(/\:\-?(D|d)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/4.gif\' />").replace(/\;\-?\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/3.gif\' />").replace(/\:\-?\(/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/2.gif\' />").replace(/\:\-?\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/1.gif\' />");
}

function commonInsert(obj) {
    if(typeof(obj)=="object") {
        replaceByClass('tweet-text', obj); //Twitter
        replaceByClass('a-b-f-i-p-R', obj); //Google Plus
        replaceByClass('a-f-i-W-p', obj); //Google Plus
        
	replaceByClass('commentContent', obj);
        replaceByClass('mobile_status', obj);
        replaceByClass('uiStreamMessage', obj);
        replaceByClass('GBThreadMessageRow_Body_Content', obj);
        replaceByClass('UIStory_Message', obj);
    }
}

function nodeInserted(event) {
    commonInsert(event.target);
}

commonInsert(document);
document.addEventListener("DOMNodeInserted", nodeInserted, true);