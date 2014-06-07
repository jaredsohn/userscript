// ==UserScript==
// @name       KillMePls forum Anti-Spam
// @namespace  http://forum.killmepls.ru/
// @version    0.4
// @description  Hide spam topics from KillMePls forum
// @match      http://forum.killmepls.ru/index.php/board,*
// @copyright  2013, SagePtr
// ==/UserScript==

// Changelog:
// Version 0.4 - Compatibility with Zh'Opera *.user.js
// Version 0.3 - Replaced InnerText with InnerHTML (more browser support)
// Version 0.2 - Codepage bugfix (removed non-ASCII characters) 
// Version 0.1 - First release
// End of Changelog

if(window.location.href.match(/^http:\/\/forum\.killmepls\.ru\/index\.php\/board,/)){
  Array.prototype.forEach.call(document.querySelectorAll('.topic_table tr'), function(x){
    var z = x.querySelector('div>span>a');
    if(!z){ return; }
    //From capital russian A to small russian YA and #
    if(!z.innerHTML.match(/[\u0410-\u044F#]/)){
      x.style.display = 'none';
      console.log('[AntiSpam] Filtered - '+z.innerHTML);
    }
  });
}
