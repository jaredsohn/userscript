// ==UserScript==
// @author Onanymous
// @name myMailRu Random Vote
// @include http://wap.my.mail.ru/my/photo_for_vote*
// @description Голосует за фото случайной оценкой от 0 до "+5".
// @version 1.2.1
// ==/UserScript==

function voteNow(){
		elements=document.getElementsByClassName("mark");
		num=Math.floor(Math.random() * 5);
		mark=elements[num];
		window.location.href=mark.href;
}
voteNow();