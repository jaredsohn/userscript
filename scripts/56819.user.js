// ==UserScript==
// @name           GLB Resize Forum Post Boxes
// @namespace      GLB
// @description    Resizes new and reply boxes to be an equal size
// @include        http://goallineblitz.com/game/forum_thread_list.pl?*
// @include        http://goallineblitz.com/game/forum_thread.pl?*
// ==/UserScript==
// 

var inputboxes = document.getElementsByName('thread_title');
var textboxes = document.getElementsByName('thread_content');
var replyboxes = document.getElementsByName('reply');
for(var i = 0 ; i<inputboxes.length;i++) {
    inputboxes[i].setAttribute('style', 'width:98%;');
}
for(var t = 0 ; t<textboxes.length;t++) {
    textboxes[t].setAttribute('style', 'width:98%;');
}
for(var r = 0 ; r<replyboxes.length;r++) {
    replyboxes[r].setAttribute('style', 'width:96%;');
}



