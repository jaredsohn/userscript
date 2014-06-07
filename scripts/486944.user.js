// ==UserScript==
// @name           Frozen Battle
// @version        github-latest
// @description    Userscript to load Frozen Battle written by Craiel for Endless Battle, based off Frozen Cookies for Cookie clicker
// @author         Craiel
// @homepage       https://github.com/Craiel/FrozenBattle
// @include        http://www.kruv.net/endlessBattle.html
// @updateURL      http://Craiel.github.io/FrozenBattle/fb_userscript_loader.js
// @downloadURL    http://Craiel.github.io/FrozenBattle/fb_userscript_loader.js
// @grant          none
// ==/UserScript==

// Dev:       https://raw.github.com/Craiel/FrozenBattle/development/
// Master:    https://raw.github.com/Craiel/FrozenBattle/master/
// Github.io: http://Craiel.github.io/FrozenBattle/

function LoadFrozenBattle() 
{
  var js = document.createElement('script');
  js.setAttribute('type', 'text/javascript');
  js.setAttribute('id', 'frozenBattleScript');
  js.setAttribute('src', 'https://raw.github.com/Craiel/FrozenBattle/master/frozenBattle.js');
  document.head.appendChild(js);
}

// It's not the best way but Chrome doesn't work with addEventListener... :(
// Delay load by 5 seconds to allow the site to load itself first.)
window.setTimeout(LoadFrozenBattle, 5000);
