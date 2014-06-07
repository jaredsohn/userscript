// ==UserScript==
// @name       VKSirena
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://vk.com/sizov2002
// @copyright  2012+, You
// ==/UserScript==
if(document.getElementById('profile_online_lv').style.display=='none'){
 window.location.reload(); 
}else{
var f=document.createElement('div');
f.id="sirena";
f.innerHTML = '<embed'+' autostart="true" hidden="true" loop="false" src="ftp://192.168.0.1/pub/sirena.mp3"></embed>';
var v=document.getElementById('content');
v.parentElement.insertBefore(f,v);