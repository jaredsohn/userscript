// ==UserScript==
// @name           Smileys Sup pour JVC by HapisteDuFutur
// @namespace      Smileys JVC 15-18
// @description    Des smileys supplementaires choisis avec soin ! C'est pas joli ça ?
// @include        http://www.jeuxvideo.com/forums/1-*
// @include        http://www.jeuxvideo.com/forums/3-*
// @include        http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// ==/UserScript==

var chaine=document.body.innerHTML;

var reg=new RegExp("(:hapervers:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://img705.imageshack.us/img705/9180/hapervers.png' />");

var reg=new RegExp("(:wesh:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img697.imageshack.us/img697/1851/wesh.png' />");

var reg=new RegExp("(:chucknoel:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img21.imageshack.us/img21/9852/chucknoel.png' />");

var reg=new RegExp("(:sournouhap:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img188.imageshack.us/img188/8476/sournouhap.png' />");

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

var reg=new RegExp("(:bide:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.noelshack.com/uploads/bide058524.gif' />");

var reg=new RegExp("(:taggle:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.noelshack.com/uploads/taggle053712.gif' />");

var reg=new RegExp("(:osef:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.noelshack.com/uploads/osef047228.gif' />");

var reg=new RegExp("(:fake2:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.noelshack.com/uploads/fake073516.gif' />");

var reg=new RegExp("(:fake:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.noelshack.com/uploads/fake049788.gif' />");

var reg=new RegExp("(:charte:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.noelshack.com/uploads/charte081451.gif' />");

var reg=new RegExp("(:btg:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.noelshack.com/uploads/grotte091925.gif' />");

var reg=new RegExp("(:nowel:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.noelshack.com/uploads/noelempereur089638.gif' />");

var reg=new RegExp("(:oupas:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.noelshack.com/uploads/oupas077595.gif' />");

var reg=new RegExp("(:taggle2:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.noelshack.com/uploads/TAGGLEtransp.005684.gif' />");

var reg=new RegExp("(:xd:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://antre-jv.com/smileys/AJV/xD.gif' />");

var reg=new RegExp("(:founoel:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://antre-jv.com/smileys/AJV/founoel.gif' />");

var reg=new RegExp("(:humnoel:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://antre-jv.com/smileys/AJV/humnoel.gif' />");

var reg=new RegExp("(:maladenoel:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://antre-jv.com/smileys/AJV/maladenoel.gif' />");

var reg=new RegExp("(:clownoel:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://antre-jv.com/smileys/AJV/clownnoel.gif' />");

var reg=new RegExp("(:coeurnoel:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://antre-jv.com/smileys/AJV/coeurnoel.png' />");

var reg=new RegExp("(:colerenoel:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://antre-jv.com/smileys/AJV/colerenoel.gif' />");

var reg=new RegExp("(:nonnonnoel:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://antre-jv.com/smileys/AJV/nonnonnoel.gif' />");

var reg=new RegExp("(:oknoel:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://antre-jv.com/smileys/AJV/oknoel.gif' />");

var reg=new RegExp("(:peurnoel:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://antre-jv.com/smileys/AJV/peurnoel.gif' />");

var reg=new RegExp("(:rasta:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://smileys.urpix.fr/smileys/Messages/0067.gif' />");

var reg=new RegExp("(:awesome:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.noelshack.com/uploads/yay073915.png' />");

var reg=new RegExp("(:fuu:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://cinnamal.com/NoelTweet/94.23.116.141/i/icons/fuu.gif' />");

var reg=new RegExp("(:trollface:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://nerdempire.net/forum/img/smilies/Trollface.gif' />");

document.body.innerHTML=chaine;

