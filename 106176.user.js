// ==UserScript==
// @name           Google+ JVC
// @namespace      Delsuza
// @include        https://plus.google.com/*
// @include        https://talkgadget.google.com/talkgadget/mole?*
// ==/UserScript==


var chaine=document.body.innerHTML;

var reg=new RegExp("(:content:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/24.gif' />");

var reg=new RegExp("(:cool:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/26.gif' />");

var reg=new RegExp("(:rire:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/39.gif' />");
	
var reg=new RegExp("(:fou:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/50.gif' />");

var reg=new RegExp("(:ok:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/36.gif' />");

var reg=new RegExp("(:coeur:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/54.gif' />");

var reg=new RegExp("(:noel:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/11.gif' />");

var reg=new RegExp("(:hap:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/18.gif' />");

var reg=new RegExp("(:bave:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/71.gif' />");

//New gen
var reg=new RegExp("(:hapervers:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://img705.imageshack.us/img705/9180/hapervers.png' />");

var reg=new RegExp("(:wesh:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img697.imageshack.us/img697/1851/wesh.png' />");

var reg=new RegExp("(:hapgay:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img710.imageshack.us/img710/6956/hapgay.png' />");

var reg=new RegExp("(:chucknoel:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img21.imageshack.us/img21/9852/chucknoel.png' />");

var reg=new RegExp("(:sournouhap:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img188.imageshack.us/img188/8476/sournouhap.png' />");

var reg=new RegExp("(:hapss:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img18.imageshack.us/img18/1917/hapss.png' />");

var reg=new RegExp("(:hop:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img690.imageshack.us/img690/7466/hop.gif' />");

var reg=new RegExp("(:cisla:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img688.imageshack.us/img688/5572/cisla.gif' />");

var reg=new RegExp("(:noelok:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img4.imageshack.us/img4/2346/noelok.gif' />");

var reg=new RegExp("(:hapok:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img96.imageshack.us/img96/6019/hapok.gif' />");

var reg=new RegExp("(:noelgg:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img28.imageshack.us/img28/7136/noelgg.png' />");

var reg=new RegExp("(:hapgg:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img194.imageshack.us/img194/4753/hapgg.gif' />");

var reg=new RegExp("(:hapitler:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img28.imageshack.us/img28/9923/hapitler.gif' />");

var reg=new RegExp("(:autiste:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img143.imageshack.us/img143/9893/autiste.gif' />");

var reg=new RegExp("(:taggle:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img829.imageshack.us/img829/6015/taggle.gif' />");

var reg=new RegExp("(:hapananas:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img197.imageshack.us/img197/5857/hapananas.gif' />");

var reg=new RegExp("(:hapeur:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img256.imageshack.us/img256/3383/hapeur.gif' />");

var reg=new RegExp("(:nigghap:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img835.imageshack.us/img835/2304/hapbronz.gif' />");

document.body.innerHTML=chaine;


