// ==UserScript==
// @name          Mailim.co.il No Ads And RegPop By Kuchi.be
// @namespace     http://userscripts.org/users/131158
// @description  Remove Ads from YouTube Player in Mailim.co.il And no Register PopUps
// @author        Kuchi.be
// @homepage      http://Kuchi.be
// @include        https://mailim.co.il/player/*
// @include        https://www.mailim.co.il/player/*
// @include        http://www.mailim.co.il/player/*
// @include        http://mailim.co.il/player/*
// @include        http://mailim.co.il/*
// ==/UserScript==
var Sid;
var i,j,t;
unsafeWindow.addEventListener('load',bodit,true);
bodit();
function bodit(){
var Bdy = document.getElementsByTagName('body')[0].innerHTML;
Bdy = Bdy.replace('<div id="fb-root"></div><script src="http://connect.facebook.net/he_IL/all.js#xfbml=1"></script>','');
Bdy = Bdy.replace('<div id="back"></div>','<GonnaKillYou>');
Bdy = Bdy.replace('<div class="warper">','</GonnaKillYou><div class="warper">');
Bdy = Bdy.replace('style="visibility: hidden;"','style="visibility: none;"');
document.getElementsByTagName('body')[0].innerHTML = Bdy;
document.getElementsByTagName('GonnaKillYou')[0].innerHTML = '';
document.getElementsByTagName('body')[0].style.overflow = 'scroll'
scanit();
}
//countdwn2();
function countdwn2(){
for (j=0;j<=20;j++){
if(document.getElementsByTagName('body')[j].style.overflow == 'hidden'){
document.getElementsByTagName('body')[j].style.overflow = '';
document.getElementsByTagName('iframe')[j].style.visibility = 'visible';
}else{
//setTimeout(countdwn2,1500);
}
}

}

function scanit(){
for (i=0;i<=10;i++){
var Sid = document.getElementsByTagName('iframe')[i].src;
//document.getElementsByTagName('iframe')[i].addParam("allowfullscreen","true");
Sid = Sid.replace('http://mailim.co.il/player/youTubePlayer.php?v=','');
document.getElementsByTagName('iframe')[i].src = Sid;
document.getElementsByTagName('iframe')[i].style.visibility = 'visible';
//if(Sid.substr(0,47) == 'http://mailim.co.il/player/youTubePlayer.php?v='){
//var Sid = Sid.replace('http://mailim.co.il/player/youTubePlayer.php?v=','');
//for (j=0;j<=10;j++){
//Sos = document.getElementsByTagName('p')[j].innerHTML;
//LoliY = document.getElementsByTagName('iframe')[j].src;
//alert(LoliY);
//LoliY = LoliY.replace('http://mailim.co.il/player/youTubePlayer.php?v=','');
//document.getElementsByTagName('iframe')[j].src = LoliY';
//Loler = Sid.replace('http://www.','');
//Loler = Loler.replace('http://','');
//Loler = Loler.replace('/v/','/vi/');
//alert(Sos.substr(2,20));
//var patt1='class="youtube-player"';
//alert(Sos.match(patt1));
//if(Sos.match(patt1) == patt1){
//document.getElementsByTagName('p')[j].innerHTML = '<iframe width="420" height="345" name="kuchitube" src="' + Sid + '" frameborder="0" allowfullscreen="1"></iframe>';
//countdwn2();
//}
//}
//}
}
countdwn2();
}
