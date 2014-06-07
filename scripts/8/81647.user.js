// ==UserScript==
// @author Onanymous
// @name myMailRu PlusFive Vote
// @include http://wap.my.mail.ru/my/photo_for_vote*
// @description Автоматически голосует за фотографии оценкой "+5".
// @version 1.2.2
// ==/UserScript==

window.location.href=document.getElementsByClassName("mark")[4].href;