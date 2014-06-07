// ==UserScript==
// @name           A3-Live
// @namespace      http://ro.wikipedia.org/wiki/Broccoli
// @include        http://www.antena3.ro/live.php
// ==/UserScript==
 
js="Q=function(q){return document.getElementById(q)};wi=screen.availWidth;hi=screen.availHeight;function redim(o,x,y){o.style.width=x+'px';o.style.height=y+'px';o.style.left=parseInt((wi-x)/2)+'px';o.style.top=parseInt(((hi-y)/2)-50)+'px';}function redim64(){redim(Q('live_A3'),600,400);} function redim53(){redim(Q('live_A3'),500,333);}";
document.body.style.backgroundColor='#4c4646'
document.body.innerHTML="<style>#live_A3{position:fixed;width:1px;height:1px;border:solid #888 1px;}label{font-size:13px;font-weight:bold;color:#888;}label:hover{color:#00c0f0;}#radiobox{width:95%;text-align:right;position:fixed;top:15px;left:0px;cursor:default;}</style><div id='live_A3'></div><div id='radiobox'><input type='radio' id='set64' name='g' onclick='redim64();' checked /><label for='set64'>600/400</label><input type='radio' id='set53' name='g' onclick='redim53();'/><label for='set53'>500/333</label></div>";
jese=document.createElement('script');
jese.innerHTML=js;
document.getElementsByTagName('head')[0].appendChild(jese);

L("http://ivm.inin.ro/js/jwplayer.js",function () {jwplayer('live_A3').setup({
flashplayer: 'http://ivm.inin.ro/swf/player_licensed.swf',
              width: '300',
              height: '200',
              autostart:'true',
              bufferlength: '5',
              skin: 'about:blank',
              controlbar: 'over',
              embeded: '1',
              abouttext: 'Broccoli',
              aboutlink: 'http://ro.wikipedia.org/wiki/Broccoli',stretching: 'exactfit',
              autostart: '1',type: 'rtmp',streamer: 'rtmp://93.115.84.226/live',file: 'a3'});});
              setTimeout("redim(Q('live_A3'),600,400)",1234);