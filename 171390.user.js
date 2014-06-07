// ==UserScript==

// @name saitek's script Smileys on JVC, facebook, xooit, youtube
// @namespace saitek's script Smileys on JVC, facebook, xooit, youtube
// @description saitek's script Smileys on JVC, facebook, xooit, youtube


// @include http://www.jeuxvideo.com/forums/1-*
// @include http://www.jeuxvideo.com/profil/*
// @include http://www.jeuxvideo.com/forums/3-*
// @include http://*.blog.jeuxvideo.com/*
// @include http://www.jeuxvideo.com/commentaires/*
// @exclude http://www.jeuxvideo.com/forums/0-*



// @include http://www.facebook.com/*
// @include https://www.facebook.com/*
// @include http://*.facebook.com/*
// @include https://*.facebook.com/*
// @match http://*.facebook.com/*
// @match https://*.facebook.com/*


// @exclude htt*://*.facebook.com/login.php
// @exclude htt*://*.facebook.com/sharer*
// @exclude htt*://*.facebook.com/ajax/*
// @exclude htt*://*.facebook.com/plugins/*
// @exclude htt*://*.facebook.com/ai.php*
// @exclude htt*://*.facebook.com/l.php*

// @exclude htt*://apps.facebook.com/*
// @exclude htt*://*.facebook.com/apps/*

// @include http://*.youtube.com/*
// @include http://*.xooit.com/*
// @include http://*.xooit.fr/*


// ==/UserScript==
var chaine=document.body.innerHTML;

var reg=new RegExp("(:fuckyeah:)", "g");
chaine=chaine.replace(reg,"<img src='http://image.noelshack.com/fichiers/2013/25/1371678497-efukyea.gif' />");

var reg=new RegExp("(:derp:)", "g");
chaine=chaine.replace(reg,"<img src='http://image.noelshack.com/fichiers/2013/25/1371678470-hahuri.png' />");

var reg=new RegExp("(:btg:)", "g");
chaine=chaine.replace(reg,"<img src='http://image.noelshack.com/fichiers/2013/25/1371678424-btg.png' />");

var reg=new RegExp("(:trollok:)", "g");
chaine=chaine.replace(reg,"<img src='http://image.noelshack.com/fichiers/2013/25/1371678365-tboll8.png' />");

var reg=new RegExp("(:pedo:)", "g");
chaine=chaine.replace(reg,"<img src='http://image.noelshack.com/fichiers/2013/25/1371678305-pedo1.png' />");

var reg=new RegExp("(:orly:)", "g");
chaine=chaine.replace(reg,"<img src='http://image.noelshack.com/fichiers/2013/25/1371678196-orly.png' />");

var reg=new RegExp("(:challenge:)", "g");
chaine=chaine.replace(reg,"<img src='http://image.noelshack.com/fichiers/2013/25/1371678223-challenge.png' />");

var reg=new RegExp("(:awesome:)", "g");
chaine=chaine.replace(reg,"<img src='http://image.noelshack.com/fichiers/2013/25/1371678120-awesome.gif' />");

var reg=new RegExp("(:8O:)", "g");
chaine=chaine.replace(reg,"<img src='http://image.noelshack.com/fichiers/2013/25/1371678056-8o.png' />");

var reg=new RegExp("(:coeur:)", "g");
chaine=chaine.replace(reg,"<img src='http://image.jeuxvideo.com/smileys_img/54.gif' />");

var reg=new RegExp("(:peur:)", "g");
chaine=chaine.replace(reg,"<img src='http://image.jeuxvideo.com/smileys_img/47.gif' />");

var reg=new RegExp("(:dehors:)", "g");
chaine=chaine.replace(reg,"<img src='http://image.jeuxvideo.com/smileys_img/52.gif' />");

var reg=new RegExp("(:fou:)", "g");
chaine=chaine.replace(reg,"<img src='http://image.jeuxvideo.com/smileys_img/50.gif' />");


var reg=new RegExp("(:fete:)", "g");
chaine=chaine.replace(reg,"<img src='http://image.jeuxvideo.com/smileys_img/66.gif' />");

var reg=new RegExp("(:cool:)", "g");
chaine=chaine.replace(reg,"<img src='http://image.jeuxvideo.com/smileys_img/26.gif' />");

var reg=new RegExp("(:hap:)", "g");
chaine=chaine.replace(reg,"<img src='http://image.jeuxvideo.com/smileys_img/18.gif' />");

var reg=new RegExp("(:noel:)", "g");
chaine=chaine.replace(reg,"<img src='http://image.jeuxvideo.com/smileys_img/11.gif' />");

var reg=new RegExp("(:rire:)", "g");
chaine=chaine.replace(reg,"<img src='http://image.jeuxvideo.com/smileys_img/39.gif' />");

var reg=new RegExp("(:troll:)", "g");
chaine=chaine.replace(reg, "<img src='http://2.bp.blogspot.com/-GoDUqDwFTcg/TZUhOKatibI/AAAAAAAABHU/FGfJvjdmxAo/s1600/troll+icon.png' />");

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

var reg=new RegExp("(:nyan:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://wiki.teamfortress.com/w/images/c/cf/User_Nyan_Cat.gif' />");

var reg=new RegExp("(:troll:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://r11.imgfast.net/users/1114/10/10/39/smiles/192955.png' />");

var reg=new RegExp("(:dd:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img88.imageshack.us/img88/1967/doigtgauche.png' />");

var reg=new RegExp("(:dg:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img543.imageshack.us/img543/4996/doigtdroite.png' />");

document.body.innerHTML=chaine;