// ==UserScript==
// @name           Youtube Likeness Percentage meter
// @namespace      *
// @description    Youtube Likeness Percentage meter
// @include        http://www.youtube.com/watch?v=*
// ==/UserScript==

var box=document.getElementById('watch-description-extra-info');
var boxSPANS=box.getElementsByTagName('span');
var like=boxSPANS[0].getElementsByTagName('span')[0].innerHTML;
var dislike=boxSPANS[0].getElementsByTagName('span')[1].innerHTML;
like=parseInt(like);
dislike=parseInt(dislike);
var percent=Math.floor((like/(like+dislike))*100);
boxSPANS[0].innerHTML+="<br><span class='like'>"+percent+"% likeness"+"</span>";
