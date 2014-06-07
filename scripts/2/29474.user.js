// ==UserScript==
// @name           Auto re-size GLB Depth Chart Box
// @namespace      KMHI - Greasemonkey (props to RandomBeast)
// @description    Automatically increases the height of the depth chart box.
// @include        http://goallineblitz.com/game/depth_chart.pl?team_id=*
// ==/UserScript==

var timeout = 0;

window.setTimeout( function(){
   var css = 'html, body {height: 100%;}' +
      'html>body #position_players {min-height: 100%;height: auto;}';
      
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