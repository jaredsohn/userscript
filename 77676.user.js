// ==UserScript==
// @name        SaveFrom.net link modifier
// @version     1.03
// @date        2008-09-30
// @author      Mike Samokhvalov <mikivanch@gmail.com>
// @download    http://savefrom.net/files/savefrom_net_link_modifier.js
//
// @exclude     http://savefrom.net/*
// @exclude     http://sfrom.net/*
// ==/UserScript==

(function(){
  function onLoad()
  {    
    if(window.savefrom__lm)
      return;
      
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'http://savefrom.net/webmaster/link_modifier.js';
    s.onload = function(){
      if(window.savefrom__lm)
      {
        savefrom__lm.setLanguage('ru');
        savefrom__lm.useSmallButton = true;
        savefrom__lm.modifyTextLink = false;
        //savefrom__lm.linkRegExpParams['_zaycev_net'] = ['zaycev.net', [/^http:\/\/(www\.)?zaycev\.net\/pages\/\d+\/\d+\.shtml/i, /^http:\/\/(www\.)?zaycev\.net\/download\.php/i]];
        savefrom__lm.go();
      }
    };
    document.documentElement.appendChild(s);
  }

  if(typeof(opera.version) == 'function' && opera.version() >= 9)
    document.addEventListener('DOMContentLoaded', onLoad, false);    
  else
    document.addEventListener('load', onLoad, false);
})();