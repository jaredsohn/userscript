// ==UserScript==
// @name           OWF Chat
// @author         den78
// @description    Chat, Radio, Stream & Games for Owfans.com
// @include        http://www.owfans.com/*
// @version        21
// @icon        http://i.imgur.com/vdy4BhA.png
// ==/UserScript==

// Hide footer
document.getElementById("wrapfooter").style.display = 'none';

// div space
var elmNewContent = document.createElement('div');
elmNewContent.innerHTML = '<div style="position: relative; left: 0%; height: 20px; border: solid black 0px;">' +
'</div>';
var elmauthors = document.getElementById('wrapfooter');
elmauthors.parentNode.insertBefore(elmNewContent, elmauthors);

// startrekgate link
var elmNewContent = document.createElement('div');
elmNewContent.innerHTML = '<div style="position: absolute; left: 50%;"><div style="position: relative; left: -50%; top: -14px; border: solid black 0px;"><a href="http://startrekgate24.blogspot.com/" target="_blank" title="Wrestling Live strimovi i reprize"><b>STARTREKGATE</b></a>' +
'</div>';
var elmauthors = document.getElementById('wrapcentre');
elmauthors.parentNode.insertBefore(elmNewContent, elmauthors);

// CHATANGO link
var elmNewContent = document.createElement('div');
elmNewContent.innerHTML = '<div style="position: absolute; right: 0%;"><div style="position: relative; right: 25px; top: 50px; border: solid black 0px;"><a href="http://owfans.chatango.com/" target="owfchat"><b>CHATANGO</b></a>&nbsp;<a href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAATSURBVHjaYvj//z8DAAAA//8DAAj8Av7TpXVhAAAAAElFTkSuQmCC" target="owfchat"><b>[x]</b></a>' +
'</div>';
var elmauthors = document.getElementById('logodesc');
elmauthors.parentNode.insertBefore(elmNewContent, elmauthors);

// CHATWING link
var elmNewContent = document.createElement('div');
elmNewContent.innerHTML = '<div style="position: absolute; right: 0%;"><div style="position: relative; right: 25px; top: 70px; border: solid black 0px;"><a href="http://chatwing.com/owf" target="owfchat"><b>CHATWING</b></a>&nbsp;<a href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAATSURBVHjaYvj//z8DAAAA//8DAAj8Av7TpXVhAAAAAElFTkSuQmCC" target="owfchat"><b>[x]</b></a>' +
'</div>';
var elmauthors = document.getElementById('logodesc');
elmauthors.parentNode.insertBefore(elmNewContent, elmauthors);

// WWE TV
var elmNewContent = document.createElement('div');
elmNewContent.innerHTML = '<div style="position: absolute; right: 0%;"><div style="position: relative; right: 25px; top: 100px; border: solid black 0px;"><a href="http://coolsport.tv/wwe.html" target="owfgame"><b>WWE TV</b></a>&nbsp;<a href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAATSURBVHjaYvj//z8DAAAA//8DAAj8Av7TpXVhAAAAAElFTkSuQmCC" target="owfgame"><b>[x]</b></a>' +
'</div>';
var elmauthors = document.getElementById('logodesc');
elmauthors.parentNode.insertBefore(elmNewContent, elmauthors);

// RADIO link
var elmNewContent = document.createElement('div');
elmNewContent.innerHTML = '<div style="position: absolute; right: 0%;"><div style="position: relative; right: 25px; top: 120px; border: solid black 0px;"><a href="http://www.hrhradio.com/site/popup.php" target="owfradio"><b>RADIO</b></a>&nbsp;<a href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAATSURBVHjaYvj//z8DAAAA//8DAAj8Av7TpXVhAAAAAElFTkSuQmCC" target="owfradio"><b>[x]</b></a>' +
'</div>';
var elmauthors = document.getElementById('logodesc');
elmauthors.parentNode.insertBefore(elmNewContent, elmauthors);

// 8 ball pool
var elmNewContent = document.createElement('div');
elmNewContent.innerHTML = '<div style="position: absolute; right: 0%;"><div style="position: relative; right: 25px; top: 150px; border: solid black 0px;"><a href="http://www.miniclip.com/games/8-ball-pool-multiplayer/en/webgame.php?bodybg=1&amp;width=750&amp;height=520&amp;forcecredits=null" target="owfgame"><b>8 BALL POOL</b></a>&nbsp;<a href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAATSURBVHjaYvj//z8DAAAA//8DAAj8Av7TpXVhAAAAAElFTkSuQmCC" target="owfgame"><b>[x]</b></a>' +
'</div>';
var elmauthors = document.getElementById('logodesc');
elmauthors.parentNode.insertBefore(elmNewContent, elmauthors);

// chess hotel
var elmNewContent = document.createElement('div');
elmNewContent.innerHTML = '<div style="position: absolute; right: 0%;"><div style="position: relative; right: 25px; top: 170px; border: solid black 0px;"><a href="http://www.chesshotel.com/Protected_chesshotel-guest.swf" target="owfgame"><b>CHESS HOTEL</b></a>&nbsp;<a href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAATSURBVHjaYvj//z8DAAAA//8DAAj8Av7TpXVhAAAAAElFTkSuQmCC" target="owfgame"><b>[x]</b></a>' +
'</div>';
var elmauthors = document.getElementById('logodesc');
elmauthors.parentNode.insertBefore(elmNewContent, elmauthors);

// radio iframe
var elmNewContent = document.createElement('div');
elmNewContent.innerHTML = '<div style="position: absolute; right: 0%;"><div style="position: relative; right: 25px; top: -50px; border: solid black 0px;"><iframe src="" name="owfradio" style="border:none;" frameborder="0" height="0" scrolling="no" width="0"></iframe></div>' +
'</div>';
var elmauthors = document.getElementById('wrapfooter');
elmauthors.parentNode.insertBefore(elmNewContent, elmauthors);

// chat ge iframe
var elmNewContent = document.createElement('div');
elmNewContent.innerHTML = '<div style="position: absolute; right: 0%;"><div style="position: relative; right: 25px; top: -20px; border: solid black 0px;"><iframe src="" name="owfchat" style="border:none;" frameborder="0" height="520" scrolling="no" width="467"></iframe>' +
'</div>' +
'</div>';
var elmauthors = document.getElementById('wrapfooter');
elmauthors.parentNode.insertBefore(elmNewContent, elmauthors);

// game iframe
var elmNewContent = document.createElement('div');
elmNewContent.innerHTML = '<div style="position: absolute; left: 0%;"><div style="position: relative; left: 25px; top: -20px; border: solid black 0px;"><iframe src="" name="owfgame" style="border:none;" frameborder="0" height="520" scrolling="no" width="750"></iframe>' +
'</div>';
var elmauthors = document.getElementById('wrapfooter');
elmauthors.parentNode.insertBefore(elmNewContent, elmauthors);

// Scroll Down
var elmNewContent = document.createElement('div');
elmNewContent.innerHTML = '<div style="position: absolute; right: 0%;"><div style="position: relative; right: 3.5px; top: 0px; border: solid black 0px;"><a  id="up" href="#down"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABUSURBVHjaYvj//z8DOl61alUDPoxND8OoQUPRIEKaiMVEuYAYFxLtHULeJCls8IUVbWMNn2G41OM0CJth+NTiNQjZMELqCBpELB58BgEAAAD//wMAVi6E6qvrYwoAAAAASUVORK5CYII=" /></a>' +
'</div>';
var elmauthors = document.getElementById('logodesc');
elmauthors.parentNode.insertBefore(elmNewContent, elmauthors);

// Scroll Up
var elmNewContent = document.createElement('div');
elmNewContent.innerHTML = '<div style="position: absolute; right: 0%;"><div style="position: relative; right: 3.5px; top: 0px; border: solid black 0px;"><a  id="down" href="#up"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABNSURBVHja7NAxDgAgCARBns577pNYkRgLBE8LEottp1gxM7mR9IMAKAClIEcyWBrZYSUkwkpABB4jK0YhM0Yj3pvZH2oCDQAAAP//AwCE2ITqUZnSGAAAAABJRU5ErkJggg==" /></a>' +
'</div>';
var elmauthors = document.getElementById('wrapfooter');
elmauthors.parentNode.insertBefore(elmNewContent, elmauthors);