// ==UserScript==
// @id             HDAvatarsGooglePlus
// @name          HD Avatars for Google+
// @version        5.0
// @namespace      gplus.avatarsPlus
// @author         HaoyuWen,Jackson Tan and Simon Chan
// @description    Google+ is now lively and fun! No more small, static and low resolution avatars.
// @include        https://plus.google.com/*
// @include        https://talkgadget.google.com/*
// @exclude        /https://plus\.google\.com(/u/\d+)?/?stream/circles/.+/i
// @exclude	       /https://plus\.google\.com(/u/\d+)?/?b/.+/i
// @run-at         document-end
// ==/UserScript==
var imgsize = /w\d{3,4}-h\d{3,4}/
var avatar = /s\d{2}-c/


function replaceImg(target) {
    if (target && target.src) {
            target.src = target.src.replace('photo.jpg', 'photo.gif')
            target.src = target.src.replace(avatar,'s160-c')
            target.src = target.src.replace('s240','s480')
            target.src = target.src.replace(imgsize,"s0");
        return target.src;
    }
}
function batchReplace(targets) {
    if (targets && targets.length)
        for (var i = 0; i < targets.length ; i++)
            replaceImg(targets[i]);
}
batchReplace(document.body.getElementsByClassName('Bla')); // Your Stream Profile Photo
batchReplace(document.body.getElementsByClassName('Ep')); // Others Stream Profile Photo
batchReplace(document.body.getElementsByClassName('ag')); // Profile Photo in Comments and In Your Circles
batchReplace(document.body.getElementsByClassName('Zb')); // In Your Circles Profile Page Photos
batchReplace(document.body.getElementsByClassName('l-tk')); // Large Profile Photo in Settings
batchReplace(document.body.getElementsByClassName('Ub')); 
batchReplace(document.body.getElementsByClassName('Rf')); 
batchReplace(document.body.getElementsByClassName('og')); 
batchReplace(document.body.getElementsByClassName('Mc')); 
batchReplace(document.body.getElementsByClassName('YJ')); 
batchReplace(document.body.getElementsByClassName('Wh')); 
batchReplace(document.body.getElementsByClassName('e4a')); 
batchReplace(document.body.getElementsByClassName('Il'));
batchReplace(document.body.getElementsByClassName('hE'));
batchReplace(document.body.getElementsByClassName('Gtb')); 








document.body.addEventListener('DOMNodeInserted', function (e) {
        if (e.target.nodeType != 3 && e.target.tagName == 'DIV') {
            batchReplace(e.target.getElementsByClassName('Bla')); // Your Stream Profile Photo
            batchReplace(e.target.getElementsByClassName('Ep')); // Others Stream Profile Photo
            batchReplace(e.target.getElementsByClassName('ag')); // Profile Photo in Comments and In Your Circles
            batchReplace(e.target.getElementsByClassName('Ut')); // Profile Photo in Hover Card
            batchReplace(e.target.getElementsByClassName('om')); // Notifications Profile Photos
            batchReplace(e.target.getElementsByClassName('l-tk')); // Your Large Profile Photo in Profile Page
            batchReplace(e.target.getElementsByClassName('y-K-R')); // Profile Photos in Mention List
            batchReplace(e.target.getElementsByClassName('HPb')); // In Your Circles Profile Photos
            batchReplace(e.target.getElementsByClassName('Zb')); // Profile Photos of Hang out
            batchReplace(e.target.getElementsByClassName('Ol')); 
            batchReplace(e.target.getElementsByClassName('Wk')); 
            batchReplace(e.target.getElementsByClassName('Ub')); 
            batchReplace(e.target.getElementsByClassName('Rf')); 
            batchReplace(e.target.getElementsByClassName('og')); 
            batchReplace(e.target.getElementsByClassName('Mc')); 
            batchReplace(e.target.getElementsByClassName('YJ')); 
            batchReplace(e.target.getElementsByClassName('Wh')); 
            batchReplace(e.target.getElementsByClassName('e4a')); 
            batchReplace(e.target.getElementsByClassName('Il')); 
            batchReplace(e.target.getElementsByClassName('hE')); 
            batchReplace(e.target.getElementsByClassName('Gtb')); 
        }
    }, false);


/*
            target.src = target.src.replace('s48-c-k','s160-c')
            target.src = target.src.replace('s49-c','s160-c')
            target.src = target.src.replace('s32-c-k','s64-c')
            target.src = target.src.replace('?sz=48','')
            target.src = target.src.replace('s24-c-k','s48-c')
            target.src = target.src.replace('s90-c-k','s180-c')
            target.src = target.src.replace('?sz=32','')
            target.src = target.src.replace('?sz=80','')
            target.src = target.src.replace('s80-c-k','s160-c')
            target.src = target.src.replace('s80-c','s160-c')
            target.src = target.src.replace('s40-c','s160-c')
            target.src = target.src.replace('s40-c','s160-c')
            target.src = target.src.replace('s61-c','s160-c')
            target.src = target.src.replace('s56-c','s160-c')
            target.src = target.src.replace('s37-c','s160-c')
            target.src = target.src.replace('s46-c-k','s92-c')
            target.src = target.src.replace('s28-c-k','s56-c')
*/