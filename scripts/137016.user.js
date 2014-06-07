// ==UserScript==
// @name           codepad.viper-7.com code display workaround
// @namespace      http://userscripts.org/users/73184
// @description    a small workaround for viper-7.com (will delete this script when viper-7 fixes it himself.. but quote: <Woet@irc.freenode.net/#php> I've reported that months ago)
// @include        /^http(s)?:\/\/(www\.)?codepad\.viper-7\.com*/
// @run-at document-end
//Warning: i dont think chrome/opera understands the @run-at directive...
// @version 0.2
// ==/UserScript==

(function f(i){
i++;
if(i>=5){return;}//i give up.
var e=document.getElementById('code');
if(e===null){setTimeout(function(){f(i);},300);return;}//in case of slow connection and ignoring @run-at
e.style.display="default";
return;/*done*/
})(0);
