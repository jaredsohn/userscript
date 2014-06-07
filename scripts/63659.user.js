// ==UserScript==
// @name           engadgetFix
// @namespace      http://userscripts.org/users/120469
// @include        http://*.engadget.com/
// @include        http://*.engadget.com/page/*/
// ==/UserScript==

var init = function(){

var divArr = document.getElementsByTagName('div');
for(i = 0; i <= divArr.length; i++) {
   if(i > 0) {
      var j = i - 1 }
   else {
      var j = i }
   if(document.getElementsByTagName('div')[i] && document.getElementsByTagName('div')[i].className != 'post_readmore sprite' && document.getElementsByTagName('div')[j].className != 'post_body' && document.getElementsByTagName('div')[i].className != 'post_body' && document.getElementsByTagName('div')[i].className != 'post_info' && document.getElementsByTagName('div')[i].className != 'post_title' && document.getElementsByTagName('div')[i].className != 'post_content' && document.getElementsByTagName('div')[i].className != 'blogroll' && document.getElementsByTagName('div')[i].className != 'col1' && document.getElementsByTagName('div')[i].className != 'inner-padding' && document.getElementsByTagName('div')[i].className != 'content_holder') {
      document.getElementsByTagName('div')[i].style.display = 'none';
      }
   }

};

init();