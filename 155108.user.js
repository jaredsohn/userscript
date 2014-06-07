/*
// ==UserScript==
// @name improved topic
// @description Improves topic view
// @match http://eu.battle.net/wow/fr/forum/topic/*
// @match http://eu.battle.net/wow/en/forum/topic/*
// @match http://us.battle.net/wow/en/forum/topic/*
// @author Tel
// @version 0.2
// ==/UserScript==
*/
(function(){
  var css, ref$, i$, len$, infos, realm, ref1$;
  css = ".karma { /*post margin when disconnected*/\n	white-space: normal !important;\n}\n\n.post-user .avatar { /*black pixel under avatars*/\n	top: 27px !important;\n}";
  document.head.appendChild((ref$ = document.createElement('style'), ref$.type = 'text/css', ref$.innerHTML = css, ref$));
  for (i$ = 0, len$ = (ref$ = document.getElementsByClassName('character-info')).length; i$ < len$; ++i$) {
    infos = ref$[i$];
    realm = infos.querySelector('.context-user span').innerHTML;
    if ((ref1$ = infos.querySelector('.character-desc')) != null) {
      ref1$.innerHTML += "<br />" + realm;
    }
  }
}).call(this);
