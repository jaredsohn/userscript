// ==UserScript== 
// @name           Plusieurs smiley by WorldIsHell
// @namespace      PlusieurssmileybyWorldIsHell
// @description    avoir un nouveau smiley :newhap:
// @include        http://*.blog.jeuxvideo.com/*
// @include        http://www.jeuxvideo.com*
// @include        http://www.jeuxvideo.com/jvchat*

// ==/UserScript== 
var chaine=document.body.innerHTML; 

var reg=new RegExp(":newhap:", "g"); 
chaine=chaine.replace(reg,"<img border=0 src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTstAEyQbxe4luBI2hQL11fWSv1BdxOpI_j6_hVsJcu_TT6i-PG' />"); 

var reg=new RegExp(":ninja:", "g"); 
chaine=chaine.replace(reg,"<img border=0 src='http://image.noelshack.com/fichiers/2013/07/1361016279-ninja.gif' />"); 

var reg=new RegExp(":geek:", "g"); 
chaine=chaine.replace(reg,"<img border=0 src='http://image.noelshack.com/fichiers/2013/07/1361016357-geek.gif' />"); 

var reg=new RegExp(":cupcake:", "g"); 
chaine=chaine.replace(reg,"<img border=0 src='http://image.noelshack.com/fichiers/2013/07/1361016391-cupcake.gif' />"); 

var reg=new RegExp(":fake:", "g"); 
chaine=chaine.replace(reg,"<img border=0 src='http://image.noelshack.com/fichiers/2013/07/1361016497-fake.gif' />"); 

document.body.innerHTML=chaine; 