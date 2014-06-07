// ==UserScript==
// @name           Remove Ivora Smilies :P
// @namespace      http://userscripts.org/users/120699
// @description    Removes all smilies by Ivora on the xkcd fora :/
// @include        http://forums.xkcd.com/viewtopic.php?*
// @include        http://www.forums.xkcd.com/viewtopic.php?*
// @include        http://echochamber.me/viewtopic.php?*
// @include        http://www.echochamber.me/viewtopic.php?*
// @include        http://forums3.xkcd.com/viewtopic.php?*
// @include        http://fora.xkcd.com/viewtopic.php?*
// ==/UserScript==

var elinks=document.getElementsByTagName("link");
var prosilver=(elinks[elinks.length-1].href.indexOf("subsilver")==-1);

var remImgs=function(post){
  var imgs=post.getElementsByTagName('img');
  var j=imgs.length;
  while(j --> 0){
	imgs[j].parentNode.removeChild(imgs[j]);
  }
}

if(prosilver){
  var p=document.getElementsByTagName('p');
  for(i=0;i<p.length;++i){
	var a=p[i].getElementsByTagName('a');
	if(a.length==2 && a[1].textContent=="Ivora"){
	  var post=p[i].parentNode.getElementsByTagName('div')[0];
	  remImgs(post);
	}
  }
}
else{
  var b=document.getElementsByTagName('b');
  for(var i=0;i<b.length;++i){
	if(b[i].className=="postauthor" && b[i].textContent=="Ivora"){
	  var post=b[i].parentNode.parentNode.parentNode.getElementsByTagName('div')[2];
	  remImgs(post);
	}
  }
}
