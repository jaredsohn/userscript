// ==UserScript==
// @author Onanymous
// @name myMailRu PlusOne Vote
// @include http://wap.my.mail.ru/my/photo_for_vote*
// @description Автоматически голосует за фотографии оценкой "+1".
// @version 1.2.2
// ==/UserScript==

window.location.href=document.getElementsByClassName("mark")[0].href;