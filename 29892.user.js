// ==UserScript==
// @name           Expands Text Area for new Posts
// @namespace      KHMI - Greasemonkey
// @include        http://goallineblitz.com/game/forum_thread_list.pl*
// ==/UserScript==

var timeout = 0;

window.setTimeout( function(){
   var css = 'html, body {height: 100%;}' +
      'html>body #new_thread {min-height: 100%;height: auto;}';
      
   var thread_content = document.getElementsByName('thread_content');
   thread_content[0].style.width = "95%";
   thread_content[0].style.height = "300px";
      
   addGlobalStyle(css);

   function addGlobalStyle(css) {
       var head, style;
       head = document.getElementsByTagName('head')[0];
       if (!head) { return; }
       style = document.createElement('style');
       style.type = 'text/css';
       style.innerHTML = css;
       head.appendChild(style);
   }
},timeout);