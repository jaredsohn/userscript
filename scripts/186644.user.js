// ==UserScript==
// @name Fanfou Forward Without Mentioning Myself
// @version 1.0.3
// @author HackMyBrain
// @description 饭否上转发消息时避免at到自己
// @include http://fanfou.com/*
// @homepage http://userscripts.org/scripts/show/186644
// @downloadURL https://userscripts.org/scripts/source/186644.user.js
// @updateURL https://userscripts.org/scripts/source/186644.meta.js
// ==/UserScript==


(function (){
    var mylink = document.querySelector('#navigation ul > li:nth-of-type(2) > a');

    var fw_textarea = document.getElementById('PopupForm').getElementsByTagName('textarea')[0];
    
    var fwReplacer = function (e){
        if ( e.target.tagName.toLowerCase() === 'a' && e.target.className === 'repost' ){
            var text = e.target.getAttribute('text');
            var fw_nickname = text.match(/@\S+/)[0];
            var content = e.target.parentElement.parentElement.getElementsByClassName('content')[0];
            var context_text = ' ';
            var content_child;
            for(var i = 0; i < content.childNodes.length; i++){
                content_child = content.childNodes[i];
                if ( content_child.nodeType === 3 || content_child.tagName.toLowerCase() === 'strong' || content_child.className === 'former' || content_child.className === 'nickquery' || ( !!content_child.href && content_child.href.indexOf('http://fanfou.com/q/') === 0 ) ) {
                    if ( content_child.className === 'former' && content_child.href === mylink.href ) {
                        context_text += content_child.textContent + '\n';
                    } else {
                        context_text += content_child.textContent;
                    }
                } else if ( content_child.getAttribute('rel') === 'nofollow' ){
                    context_text += content_child.getAttribute('title');
                }
            }
            setTimeout(function(){
                if ( e.target.parentElement.getElementsByClassName('delete').length != 0 ) {
                    fw_textarea.value = ('转' + fw_nickname + '\n' + context_text).replace(/\n\x20/g,'\n');
                } else {
                    fw_textarea.value = ('转' + fw_nickname + context_text).replace(/\n\x20/g,'\n');
                }
            },30);
            setTimeout(function(){fw_textarea.setSelectionRange(0,0)}, 60);
        }
    }
    
    document.addEventListener('click', fwReplacer, false);
})();