// ==UserScript==
// @name          LJ autoexpand 
// @description   Expands LJ threads
// @include       http://*livejournal.com*
// @namespace     http://userscripts.org/scripts/show/112935
// ==/UserScript==

if (~window.location.href.indexOf('livejournal.com') && window.location.href.indexOf('__rpc_lj_times_string') === -1)
document.addEventListener('DOMContentLoaded',function(){

var EXPAND_CONTAINER_SELECTORS = '.b-leaf-actions-item.b-leaf-actions-expand a, span[id^="expand_"] a, .commentText a, div.comment-menu a, div.talk-comment-box a, .comment-footer > span > a';
var commentboxes = document.querySelectorAll(EXPAND_CONTAINER_SELECTORS);
console.log('LJ autoexpand ['+location.href+']: #' + commentboxes.length + ' comments found.');
if (!commentboxes.length) return;

for (var z = 0; z < commentboxes.length; z++) {
   if (commentboxes[z].getAttribute('onclick') && ~commentboxes[z].getAttribute('onclick').indexOf('ExpanderEx.make') || ~commentboxes[z].innerText.indexOf('Expand')) 
   	setTimeout(function(commentbox){ commentbox.click(); }(commentboxes[z]), 500);
}
}, false);