// ==UserScript==
// @name Ajout des smileys de JeuxVideo.Com sur les forums eRepFrance
// @namespace Ajout des smileys de JeuxVideo.Com sur les forums eRepFrance
// @description Ajoute la majorité des smileys de Jeuxvideo.com sur le forum eRepfrance via les BBCodes. Pensez a prévisualiser le message avant de poster quand il y a ces smileys.
// @version 2.1
// @include http://forum.erepfrance.com/posting.php?*
// @include http://forum.erepublik.fr/posting.php?*
// @Auteur Jysix
// @grant none
// ==/UserScript==
var chaine=document.body.innerHTML;

var reg=new RegExp("(:sarcastic:)", "g");
chaine=chaine.replace(reg,"[img]http://image.jeuxvideo.com/smileys_img/43.gif[/img]");

var reg=new RegExp("(:pf:)", "g");
chaine=chaine.replace(reg,"[img]http://image.jeuxvideo.com/smileys_img/pf.gif[/img]");

var reg=new RegExp("(:bravo:)", "g");
chaine=chaine.replace(reg,"[img]http://image.jeuxvideo.com/smileys_img/69.gif[/img]");

var reg=new RegExp("(:content:)", "g");
chaine=chaine.replace(reg,"[img]http://image.jeuxvideo.com/smileys_img/24.gif[/img]");

var reg=new RegExp("(:bave:)", "g");
chaine=chaine.replace(reg,"[img]http://image.jeuxvideo.com/smileys_img/71.gif[/img]");

var reg=new RegExp("(:honte:)", "g");
chaine=chaine.replace(reg,"[img]http://image.jeuxvideo.com/smileys_img/30.gif[/img]");

var reg=new RegExp("(:sournois:)", "g");
chaine=chaine.replace(reg,"[img]http://image.jeuxvideo.com/smileys_img/67.gif[/img]");

var reg=new RegExp("(:malade:)", "g");
chaine=chaine.replace(reg,"[img]http://image.jeuxvideo.com/smileys_img/8.gif[/img]");

var reg=new RegExp("(:doute:)", "g");
chaine=chaine.replace(reg,"[img]http://image.jeuxvideo.com/smileys_img/28.gif[/img]");

var reg=new RegExp("(:non:)", "g");
chaine=chaine.replace(reg,"[img]http://image.jeuxvideo.com/smileys_img/35.gif[/img]");

var reg=new RegExp("(:ok:)", "g");
chaine=chaine.replace(reg,"[img]http://image.jeuxvideo.com/smileys_img/36.gif[/img]");

var reg=new RegExp("(:fou:)", "g");
chaine=chaine.replace(reg,"[img]http://image.jeuxvideo.com/smileys_img/50.gif[/img]");

var reg=new RegExp("(:rire:)", "g");
chaine=chaine.replace(reg,"[img]http://image.jeuxvideo.com/smileys_img/39.gif[/img]");

var reg=new RegExp("(:coeur:)", "g");
chaine=chaine.replace(reg,"[img]http://image.jeuxvideo.com/smileys_img/54.gif[/img]");

var reg=new RegExp("(:cool:)", "g");
chaine=chaine.replace(reg,"[img]http://image.jeuxvideo.com/smileys_img/26.gif[/img]");

var reg=new RegExp("(:peur:)", "g");
chaine=chaine.replace(reg,"[img]http://image.jeuxvideo.com/smileys_img/47.gif[/img]");

var reg=new RegExp("(:oui:)", "g");
chaine=chaine.replace(reg,"[img]http://image.jeuxvideo.com/smileys_img/37.gif[/img]");

var reg=new RegExp("(:noel:)", "g");
chaine=chaine.replace(reg,"[img]http://image.jeuxvideo.com/smileys_img/11.gif[/img]");

var reg=new RegExp("(:ouch:)", "g");
chaine=chaine.replace(reg,"[img]http://image.jeuxvideo.com/smileys_img/22.gif[/img]");

var reg=new RegExp("(:snif2:)", "g");
chaine=chaine.replace(reg,"[img]http://image.jeuxvideo.com/smileys_img/13.gif[/img]");

var reg=new RegExp("(:snif:)", "g");
chaine=chaine.replace(reg,"[img]http://image.jeuxvideo.com/smileys_img/20.gif[/img]");

var reg=new RegExp("(:hap:)", "g");
chaine=chaine.replace(reg,"[img]http://image.jeuxvideo.com/smileys_img/18.gif[/img]");

var reg=new RegExp("(:hapervers:)", "g");
chaine=chaine.replace(reg,"[img]http://img705.imageshack.us/img705/9180/hapervers.png[/img]");

var reg=new RegExp("(:hapervers:)", "g");
chaine=chaine.replace(reg,"[img]http://img705.imageshack.us/img705/9180/hapervers.png[/img]");

var reg=new RegExp("(:wesh:)", "g");
chaine=chaine.replace(reg,"[img]http://img697.imageshack.us/img697/1851/wesh.png[/img]");

var reg=new RegExp("(:hapgay:)", "g");
chaine=chaine.replace(reg,"[img]http://img710.imageshack.us/img710/6956/hapgay.png[/img]");

var reg=new RegExp("(:chucknoel:)", "g");
chaine=chaine.replace(reg,"[img]http://img21.imageshack.us/img21/9852/chucknoel.png[/img]");

var reg=new RegExp("(:sournouhap:)", "g");
chaine=chaine.replace(reg,"[img]http://img188.imageshack.us/img188/8476/sournouhap.png[/img]");

var reg=new RegExp("(:hapss:)", "g");
chaine=chaine.replace(reg,"[img]http://img18.imageshack.us/img18/1917/hapss.png[/img]");

var reg=new RegExp("(:hop:)", "g");
chaine=chaine.replace(reg,"[img]http://img690.imageshack.us/img690/7466/hop.gif[/img]");

var reg=new RegExp("(:cisla:)", "g");
chaine=chaine.replace(reg,"[img]http://img688.imageshack.us/img688/5572/cisla.gif[/img]");

var reg=new RegExp("(:noelok:)", "g");
chaine=chaine.replace(reg,"[img]http://img4.imageshack.us/img4/2346/noelok.gif[/img]");

var reg=new RegExp("(:hapok:)", "g");
chaine=chaine.replace(reg,"[img]http://img96.imageshack.us/img96/6019/hapok.gif[/img]");

var reg=new RegExp("(:noelgg:)", "g");
chaine=chaine.replace(reg,"[img]http://img28.imageshack.us/img28/7136/noelgg.png[/img]");

var reg=new RegExp("(:hapgg:)", "g");
chaine=chaine.replace(reg,"[img]http://img194.imageshack.us/img194/4753/hapgg.gif[/img]");

var reg=new RegExp("(:hapitler:)", "g");
chaine=chaine.replace(reg,"[img]http://img28.imageshack.us/img28/9923/hapitler.gif[/img]");

var reg=new RegExp("(:autiste:)", "g");
chaine=chaine.replace(reg,"[img]http://img143.imageshack.us/img143/9893/autiste.gif[/img]");

var reg=new RegExp("(:taggle:)", "g");
chaine=chaine.replace(reg,"[img]http://img829.imageshack.us/img829/6015/taggle.gif[/img]");

var reg=new RegExp("(:hapananas:)", "g");
chaine=chaine.replace(reg,"[img]http://img197.imageshack.us/img197/5857/hapananas.gif[/img]");

var reg=new RegExp("(:hapeur:)", "g");
chaine=chaine.replace(reg,"[img]http://img256.imageshack.us/img256/3383/hapeur.gif[/img]");

var reg=new RegExp("(:nigghap:)", "g");
chaine=chaine.replace(reg,"[img]http://img835.imageshack.us/img835/2304/hapbronz.gif[/img]");

var reg=new RegExp("(:nyan:)", "g");
chaine=chaine.replace(reg,"[img]http://wiki.teamfortress.com/w/images/c/cf/User_Nyan_Cat.gif[/img]");

var reg=new RegExp("(:troll:)", "g");
chaine=chaine.replace(reg,"[img]http://r11.imgfast.net/users/1114/10/10/39/smiles/192955.png[/img]");

var reg=new RegExp("(:dd:)", "g");
chaine=chaine.replace(reg,"[img]http://img88.imageshack.us/img88/1967/doigtgauche.png[/img]");

var reg=new RegExp("(:dg:)", "g");
chaine=chaine.replace(reg,"[img]http://img543.imageshack.us/img543/4996/doigtdroite.png[/img]");

document.body.innerHTML=chaine;