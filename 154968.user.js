// ==UserScript==
// @name        bbsbot4ck101
// @namespace   http://userscripts.org/users/tumuyan
// @include     http://www.ck101.com/thread*
// @include     http://www.ck101.com/*tid=*
// @version     1
// ==/UserScript==

if (document.documentElement.innerHTML.match('<a class="lockThankBtn"'))

{
var url= document.URL.replace("/thread-","/forum.php?mod=post&action=thank&tid=")
url=url.replace(/\-\d\-\d.html/,"")
url=url.replace("forum.php?mod=viewthread&tid=","forum.php?mod=post&action=thank&tid=")

var thkjs = document.createElement("script");
thkjs.type="text/javascript" 
thkjs.innerHTML= ' showWindow("thank", "' + url + '")'
                document.body.appendChild(thkjs);
}