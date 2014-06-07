// ==UserScript==
// @name           Daily Show Full Episode Cleaner Layout
// @namespace      adamit
// @include        http://www.thedailyshow.com/full-episodes/*
// @include        http://www.colbertnation.com/full-episodes/*
// ==/UserScript==

setTimeout(function(){
try{

var badStyles;
badStyles = document.getElementsByTagName('style');
for (var i = 0; i < badStyles.length; i++) {
   badStyles[i].parentNode.removeChild(badStyles[i]);
}

}catch(err){} try{

var playerPane;
playerPane = document.getElementsByClassName('player-pane');
for (var i = 0; i < playerPane.length; i++) {
   playerPane[i].style.width = '100%';
   playerPane[i].style.background = 'url("http://www.hulu.com/images/bg-main.gif") repeat-x scroll left top #323232';
}

}catch(err){} try{

var subMeta;
subMeta= document.getElementsByClassName('subMeta');
for (var i = 0; i < subMeta.length; i++) {
   subMeta[i].style.border = '0px';
   subMeta[i].style.padding = '20px';
}

}catch(err){} try{

var footer = document.getElementById('ft');
if (footer) {
   footer.style.display = 'none';
   footer.style.height = '0px';
   footer.style.width = '0px';
   footer.parentNode.removeChild(footer);
}
var footer = document.getElementById('footer');
if (footer) {
   footer.style.display = 'none';
   footer.style.height = '0px';
   footer.style.width = '0px';
   footer.parentNode.removeChild(footer);
}

}catch(err){} try{

document.getElementById('right_column').style.display = 'none';
document.getElementById('backgroundHolder').style.backgroundImage.src = "!important";
document.getElementById('backgroundHolder').style.background = '#eee';
document.getElementById('content_holder').style.background = '#eee';
document.getElementById('content_holder').style.width = '100% !important';
document.getElementById('content_holder').style.padding = '0px';
document.getElementById('body_holder').style.width = '';
document.getElementById('body_holder').style.width = '100% !important';
document.getElementById('body_holder').style.padding = '0px';
document.getElementById('capHldr').style.display = 'none';
document.getElementById('logo').style.display = 'none';
document.getElementById('content').style.background = '';
document.getElementById('content').style.background = '#eee';
document.getElementById('content').style.margin = 'auto';
document.getElementById('content').style.float = '';
document.getElementById('content').style.border = '0px !important';
document.body.style.background = '#eee';
document.body.style.margin = '0px';
document.body.style.overflow = 'hidden';
document.body.style.padding = '0px';
document.getElementById('left_column').innerHTML = '';

}catch(err){} try{

var meta;
meta = document.getElementsByClassName('meta');
for (var i = 0; i < meta.length; i++) {
   meta[i].style.border = '0px';
   meta[i].style.background = '#eee';
   meta[i].style.color = '#444';
   meta[i].style.padding = '20px';
   meta[i].style.margin = '0px';
   meta[i].style.width = '';
   meta[i].style.width = '100% !important';
}

}catch(err){} try{

var fep;
fep = document.getElementsByClassName('full-episode-page');
for (var i = 0; i < fep.length; i++) {
   fep[i].style.width = '';
   fep[i].style.width = '100% !important';
}

}catch(err){} try{

var carousel;
carousel = document.getElementsByClassName('carousel');
for (var i = 0; i < carousel.length; i++) {
   carousel[i].style.background = '';
   carousel[i].style.background = '#eee !important';
   carousel[i].style.backgroundImage = '';
   carousel[i].style.backgroundImage = '!important';
   carousel[i].style.float = '';
   carousel[i].style.margin = 'auto';
   carousel[i].style.border = '0px !important';
}

}catch(err){} try{

var mainTitle;
mainTitle = document.getElementsByClassName('mainTitle');
for (var i = 0; i < mainTitle.length; i++) {
   mainTitle[i].style.fontSize = '25px !important';
   mainTitle[i].style.color = '#444';
   mainTitle[i].style.width = '';
   mainTitle[i].style.width = '100% !important';
}

var subTitle;
subTitle = document.getElementsByClassName('subTitle');
for (var i = 0; i < subTitle.length; i++) {
   subTitle[i].style.fontSize = '18px !important';
}

}catch(err){} try{

var commentsHolder;
commentsHolder = document.getElementsByClassName('commentsHolder');
for (var i = 0; i < commentsHolder.length; i++) {
   commentsHolder[i].style.display = 'none';
}

var clearAll;
clearAll= document.getElementsByClassName('clearAll');
for (var i = 0; i < clearAll.length; i++) {
   clearAll[i].style.display = 'none';
}

}catch(err){}
},1000);