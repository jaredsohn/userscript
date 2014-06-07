// ==UserScript==
// @name        userscripts.org quicker navigation menu
// @description add an quicker navigation menu on userscripts.org
// @include     *userscripts.org*
// @exclude     *userscripts.org/home*
// @exclude     *userscripts.org/messages*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @updateURL   http://userscripts.org/scripts/source/153554.meta.js
// @version     1.2
// ==/UserScript==

if( $("#top").text().indexOf('Logout') > 0)
{
document.getElementById('header').innerHTML+='<ul class="subnav">\
<li class="menu"><a href="/scripts/new">Upload a new script</a></li>\
<li class="menu"><a href="/messages">private messages</a></li>\
<li class="menu"><a href="/home/comments">comments</a></li>\
<li class="menu"><a href="/home/favorites">favorite scripts</a></li>\
<li class="menu"><a href="/home/posts">monitored topics</a></li>\
<li class="menu"><a href="/home/scripts">script management</a></li>\
<li class="menu"><a href="/home/settings">settings</a></li>\
<li class="menu"><a href="/home/widgets">widgets</a></li>\
<li class="menu"><a href="/users/432213" rel="nofollow">public profile</a></li>\
</ul>';
}