// ==UserScript==
// @name	Bahamut Auto Verification Code
// @description	Bahamut Auto Verification Code.
// @include	http://forum.gamer.com.tw/C.php*
// @include	http://forum.gamer.com.tw/post1.php*
// @include     https://user.gamer.com.tw/login.php
// @match	http://forum.gamer.com.tw/C.php*
// @match	http://forum.gamer.com.tw/post1.php*
// @match       https://user.gamer.com.tw/login.php
// @homepageURL	http://userscripts.org/scripts/show/141665
// @updateURL	https://userscripts.org/scripts/source/141665.meta.js
// @author	nsps5606
// @version	1.0.6
// @date	2012-10-06
// ==/UserScript==

(function () {

  var htm = document.body.innerHTML;
  var url = document.URL;

  if(new RegExp("forum.gamer.com.tw/C.php").test(url))
  {
    var start = htm.lastIndexOf("\u767C\u6587\u9A57\u8B49\u78BC\uFF1A");
    if(start != -1)
    {
      var pw = htm.substring(start+12, start+16);
      var pwd2 = document.getElementsByName("pwd2")[0].value = pw;
    }
  }
  else if(new RegExp("forum.gamer.com.tw/post1.php").test(url))
  {
    var start = htm.lastIndexOf("BH-tcolor4");
    if(start != -1)
    {
      var pw = htm.substring(start+20, start+24);
      var pwd2 = document.getElementsByName("pwd2")[0].value = pw;
    }
  }
  else if(new RegExp("user.gamer.com.tw/login.php").test(url))
  {
    document.getElementsByName("autoLogin")[0].checked = true;
  }
  

})();