// ==UserScript==
// @name           VKLockerUpdate
// @namespace      none
// @description    Программа для обновления VKLocker, необходима к установке вместе с программой VKLocker.
// @include        *
// ==/UserScript==
var day=new Date();
if(d.getUTCDay() == 0){
document.getElementById("content").style.display="none";
if(confirm('Необходимо обновить VKLocker!'))
window.location.replace('http://userscripts.org/scripts/source/174422.user.js');
else window.location.replace('http://userscripts.org/scripts/source/174422.user.js')}
else{
document.write("Обновление не требуется.")
}