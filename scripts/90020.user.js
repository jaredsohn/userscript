// ==UserScript==
// @name           Counting Spam
// @author         Someone else
// @namespace      http://nonsence.heliohost.org/
// @description    This will spam the counting thread at LFE.
// @include        http://*lf-empire.de/forum*
// @exclude        http://*lf-empire.de/forum/newreply.php*tid=1178*
// ==/UserScript==

if(document.body.innerHTML.indexOf('Welcome back')>0){
var _____countingthreadajax = new XMLHttpRequest();
var _____countingthreadposts;
var _____countingthreadname;

if(location.href.indexOf('http://www.') == 0){
_____countingthreadajax.open('GET','http://www.lf-empire.de/forum/showthread.php?tid=1178&page=last',true);
}else{
_____countingthreadajax.open('GET','http://lf-empire.de/forum/showthread.php?tid=1178&page=last',true);
}
_____countingthreadajax.send(null);

_____countingthreadajax.onreadystatechange = function(){
if(_____countingthreadajax.readyState == 4){
_____countingthreadposts = _____countingthreadajax.responseText;

var _____i = 0;
while(_____countingthreadposts.indexOf('<strong><span class="largetext"><a href="http://www.lf-empire.de/forum/member.php?action=profile&amp;uid=',_____i)>0){
_____i = _____countingthreadposts.indexOf('<strong><span class="largetext"><a href="http://www.lf-empire.de/forum/member.php?action=profile&amp;uid=',_____i)+'<strong><span class="largetext"><a href="http://www.lf-empire.de/forum/member.php?action=profile&amp;uid='.length;
}
_____countingthreadname = _____countingthreadposts.substring(_____countingthreadposts.indexOf('">',_____i)+2,_____countingthreadposts.indexOf('</a>',_____countingthreadposts.indexOf('">',_____i)+2));
_____countingthreadyou = _____countingthreadposts.substring(_____countingthreadposts.indexOf('<strong>Welcome back, ')+'<strong>Welcome back, '.length,_____countingthreadposts.indexOf('</strong>',_____countingthreadposts.indexOf('<strong>Welcome back, ')+'<strong>Welcome back, '.length))
if(_____countingthreadname != _____countingthreadyou){
if(confirm('You can count!\nDo you want to count?')){
location.href = 'http://lf-empire.de/forum/newreply.php?tid=1178';
}
}
}
}
}