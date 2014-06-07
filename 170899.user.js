// ==UserScript==
// @id             HDAvatarsTwitter
// @name          HD Avatars for Twitter
// @version        4.9.14
// @namespace      twitter.avatarsPlus
// @author         HaoyuWen,Jackson Tan and Simon Chan
// @include        https://twitter.com/*
// @run-at         document-end
// ==/UserScript==



function replaceImg(target) {
    if (target && target.src) {
        target.src = target.src.replace('_normal', '');
        target.src = target.src.replace('_bigger', '');
        target.src = target.src.replace('_reasonably_small', '');
        target.src = target.src.replace(':thumb', '');
        return target.src;
    }
}


function batchReplace(targets) {
    if (targets && targets.length)
        for (var i = 0; i < targets.length   ; i++)
            replaceImg(targets[i]);
}



batchReplace(document.body.getElementsByClassName('size128')); 
batchReplace(document.body.getElementsByClassName('avatar')); 
batchReplace(document.getElementsByTagName('img')); 
batchReplace(document.body.getElementsByClassName('profile-header-inner')); 




document.body.addEventListener('DOMNodeInserted', function (e) 
                               {
                                   batchReplace(e.target.getElementsByClassName('size128')); 
                                   batchReplace(e.target.getElementsByClassName('avatar'));
                                   batchReplace(e.target.getElementsByTagName('img')); 
                                   batchReplace(e.target.getElementsByClassName('profile-header-inner')); 
                               });



/*
document.body.addEventListener('DOMNodeInserted', function (e) {
    if (e.target.nodeType != 3 && e.target.tagName == 'DIV') {
        batchReplace(e.target.getElementsByClassName('size128')); 
        batchReplace(e.target.getElementsByClassName('avatar'));
        batchReplace(e.target.getElementsByTagName('img')); 
    }
}, false);
*/