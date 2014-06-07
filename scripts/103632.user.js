// ==UserScript==
// @name BounceBall Hack for Firefox
// @description This script is a hack to make this game playable in Firefox. 
// @include http://chromebounceball.appspot.com/index.html
// ==/UserScript==
/* JavaScript Function */
var headID = document.getElementsByTagName("head")[0];         
var newScript = document.createElement('script');
newScript.type = 'text/javascript';
newScript.innerHTML = 'function startGameAndHideButton(){ RestartGame();  document.getElementById("start_game").style.display = "none";}';
headID.appendChild(newScript);
// Link
var link = document.createElement('a');
link.setAttribute('id', 'start_game');
link.setAttribute('href', 'javascript:startGameAndHideButton();');
link.setAttribute('name', 'myanchor');
link.setAttribute('style','position:absolute;top:10px;left:50%;margin-left: -93px;background-image:-moz-linear-gradient(center top , #545455 0%, #252525 100%) !important;color:white;border: 0 none !important;border-radius: 15px 15px 15px 15px;box-shadow: 0 0 1px 1px rgba(255, 255, 255, 0.8) inset;color: white !important;font-size: 12px;padding: 5px 58px !important;font-weight:bold;font-family: Helvetica,Arial,sans-serif !important;text-decoration:none;z-index:2147483647;');
link.innerHTML ='Start Game';
document.body.appendChild(link);
// About
var link = document.createElement('a');
link.setAttribute('href', 'http://my.opera.com/ilidiomartins/blog/');
link.setAttribute('name', 'myanchor');
link.setAttribute('style',' position:absolute;bottom:10px;left:50%;margin-left: -64px;font-family:Helvetica,Arial,sans-serif !important;font-size:12px;z-index: 2147483647;');
link.innerHTML ='H4ck3d by Il&iacute;dio Martins';
document.body.appendChild(link);