// ==UserScript==
// @name Ajout de smileys de JeuxVideo.Com sur eRepublik
// @namespace www.erepublik.com
// @description Ajoute la majorité des smileys de Jeuxvideo.com sur le feed d'eRepublik.
// @version 2
// @include http://www.erepublik.com/*
// @exclude http://www.erepublik.com/en/citizen/edit/profile
// @exclude http://www.erepublik.com/fr/citizen/edit/profile
// @exclude http://www.erepublik.com/en/main/messages-alerts/*
// @exclude http://www.erepublik.com/fr/main/messages-alerts/*
// @Auteur Jysix
// @grant none
// ==/UserScript==
var chaine=document.body.innerHTML;

var reg=new RegExp("(:content:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/24.gif' />");

var reg=new RegExp("(:sarcastic:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/43.gif' />");

var reg=new RegExp("(:pf:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/pf.gif' />");

var reg=new RegExp("(:bravo:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/69.gif' />");

var reg=new RegExp("(:bave:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/71.gif' />");

var reg=new RegExp("(:sournois:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/67.gif' />");

var reg=new RegExp("(:malade:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/8.gif' />");

var reg=new RegExp("(:doute:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/28.gif' />");

var reg=new RegExp("(:non:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/35.gif' />");

var reg=new RegExp("(:ok:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/36.gif' />");

var reg=new RegExp("(:fou:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/50.gif' />");

var reg=new RegExp("(:rire:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/39.gif' />");

var reg=new RegExp("(:coeur:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/54.gif' />");

var reg=new RegExp("(:cool:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/26.gif' />");

var reg=new RegExp("(:peur:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/47.gif' />");

var reg=new RegExp("(:oui:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/37.gif' />");

var reg=new RegExp("(:noel:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/11.gif' />");

var reg=new RegExp("(:ouch:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/22.gif' />");

var reg=new RegExp("(:snif2:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/13.gif' />");

var reg=new RegExp("(:snif:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/20.gif' />");

var reg=new RegExp("(:hap:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.com/smileys_img/18.gif' />");

var reg=new RegExp("(:hapervers:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://img705.imageshack.us/img705/9180/hapervers.png' />");

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