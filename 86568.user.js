// ==UserScript==
// @name Smileys de AT et NT sur Jeuxvideo.com
// @namespace http://userscripts.org/scripts/show/86568
// @homepage http://userscripts.org/scripts/show/86568
// @description Script pour mettre les smileys de AT et NT sur JVC, ForumJV et JVFlux [Version 0.2]
// @include http://www.jeuxvideo.com/commentaires/*
// @exclude http://www.jeuxvideo.com/forums/0-*
// @include http://www.jeuxvideo.com/forums/1-*
// @include http://www.jeuxvideo.com/forums/3-*
// @exclude http://*.forumjv.com/0-*
// @include http://*.forumjv.com/1-*
// @include http://*.forumjv.com/3-*
// @include http://www.forums.jvflux.com/2-
// @include http://www.forums.jvflux.com/3-
// @include http://www.jeuxvideo.com/profil/*.html
// @exclude http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// @include http://www.jvflux.com/commentaires/*
// @Auteur Energize 
// @Remerciements  Merci a JellyTime pour la correction des bugs :coeur:
// ==/UserScript==

var smiley=document.body.innerHTML;

var reg=new RegExp(":epilepsie:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/4/epilepsie.gif' alt=':epilepsie:' />");

var reg=new RegExp(":troll:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/6/trollface.png' alt=':troll:' />");

var reg=new RegExp(":hapoel:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/hapoel.gif' alt=':hapoel:' />");

var reg=new RegExp(":hapoelia:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/hapoelia.gif' alt=':hapoelia:' />");

var reg=new RegExp(":juif:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/5/juif.png' alt=':juif:' />");

var reg=new RegExp(":banana:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/banana.gif' alt=':banana:' />");

var reg=new RegExp(":wesh:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/3/wesh.gif' alt=':wesh:' />");

var reg=new RegExp(":awe:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/2/awesome.gif' alt=':awe:' />");

var reg=new RegExp(":awesome:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/2/awesome.gif' alt=':awesome:' />");

var reg=new RegExp(":fuu:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/fuu.png' alt=':fuu:' />");

var reg=new RegExp(":woop:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/shoop-da-whoop.gif' alt=':woop:' />");

var reg=new RegExp(":pedo:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/pedo.gif' alt=':pedo:' />");

var reg=new RegExp(":pedobear:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/4/pedobear2.png' alt=':pedobear:' />");

var reg=new RegExp(":hapr:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/6/hapr.gif' alt=':hapr:' />");

var reg=new RegExp(":horace:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/5/horace.png' alt=':horace:' />");

var reg=new RegExp(":koysuke:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/membres/koysuke.gif' alt=':koysuke:' />");

var reg=new RegExp(":L", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/NT/l.jpg' alt=':L' />");

var reg=new RegExp(":chuck:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/5/chuck.png' alt=':chuck:' />");

var reg=new RegExp(":hapok:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/hap/hap-ok.gif' alt=':hapok:' />");

var reg=new RegExp(":hap-ok:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/hap/hap-ok.gif' alt=':hap-ok:' />");

var reg=new RegExp(":scylla:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://noeltweet.com/i/icons/scylla.gif' alt=':scylla:' />");

var reg=new RegExp(":noelok:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/noel/noel-ok.gif' alt=':noelok:' />");

var reg=new RegExp(":noel-ok:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/noel/noel-ok.gif' alt=':noel-ok:' />");

var reg=new RegExp(":hapa:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://noeltweet.com/i/icons/hapn.gif' alt=':hapa:' />");

var reg=new RegExp(":cochon:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://noeltweet.com/i/icons/cochon.png' alt=':cochon:' />");

var reg=new RegExp(":wox:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/NT/wox.gif' alt=':wox:' />");

var reg=new RegExp(":fish:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/fish.png' alt=':fish:' />");

var reg=new RegExp(":mais:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/6/mais.gif' alt=':mais:' />");

var reg=new RegExp(":yeah:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://noeltweet.com/i/icons/yeah.gif' alt=':yeah:' />");

var reg=new RegExp(":owii:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://noeltweet.com/i/icons/owii.gif' alt=':owii:' />");

var reg=new RegExp(":haplink:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://noeltweet.com/i/icons/haplink.gif' alt=':haplink:' />");

var reg=new RegExp(":rebelz:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://noeltweet.com/i/icons/rebelz.png' alt=':rebelz:' />");

var reg=new RegExp(":haha:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://noeltweet.com/i/icons/haha.gif' alt=':haha:' />");

var reg=new RegExp(":ahah:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://noeltweet.com/i/icons/haha.gif' alt=':ahah:' />");

var reg=new RegExp(":super-lolotte:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://noeltweet.com/i/icons/link.gif' alt=':super-lolotte:' />");

var reg=new RegExp(":danish:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://noeltweet.com/i/icons/moundir.bmp' alt=':danish:' />");


var reg=new RegExp(":hitlhap:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://noeltweet.com/i/icons/hitlhap.png' alt=':hitlhap:' />");

var reg=new RegExp(":nowel:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://noeltweet.com/i/icons/nowel.png' alt=':nowel:' />");

var reg=new RegExp(":HH:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://noeltweet.com/i/icons/HH.png' alt=':HH:' />");

var reg=new RegExp(":hopr:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://noeltweet.com/i/icons/hopr.gif' alt=':hopr:' />");

var reg=new RegExp(":happaplaudir:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://noeltweet.com/i/icons/happlaudir.gif' alt=':happaplaudir:' />");

var reg=new RegExp(":jerry:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://noeltweet.com/i/icons/jerry.gif' alt=':jerry:' />");

var reg=new RegExp(":castiel:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://noeltweet.com/i/icons/castiel.gif' alt=':castiel:' />");

var reg=new RegExp(":hedoras:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://noeltweet.com/i/icons/hedoras.jpg' alt=':hedoras:' />");


var reg=new RegExp(":ok2:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/2/ok2.gif' alt=':ok2:' />");

var reg=new RegExp(":xd:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/xd.gif' alt=':xd:' />");

var reg=new RegExp(":rougit:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/rougi.gif' alt=':rougit:' />");

var reg=new RegExp(":1:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/2/1.gif' alt=':1:' />");

var reg=new RegExp(":bouletdujour:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/1/bouletdujour.gif' alt=':bouletdujour:' />");

var reg=new RegExp(":hs:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/1/hs.gif' alt=':hs:' />");

var reg=new RegExp(":wtf:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/1/wtf.gif' alt=':wtf:' />");

var reg=new RegExp(":raj:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/4/rage.gif' alt=':raj:' />");

var reg=new RegExp(":rage:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/4/rage.gif' alt=':rage:' />");

var reg=new RegExp(":yahoi-coeur:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/3/yahoi-coeur.gif' alt=':yahoi-coeur:' />");

var reg=new RegExp(":dzonche:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/6/dzonche.gif' alt=':dzonche:' />");

var reg=new RegExp(":hip:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/6/hip.gif' alt=':hip:' />");

var reg=new RegExp(":chien:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/chien.gif' alt=':chien:' />");

var reg=new RegExp(":sparta:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/sparta.gif' alt=':sparta:' />");

var reg=new RegExp(":bounce:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/2/bounce.gif' alt=':bounce:' />");

var reg=new RegExp(":2:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/2/2.gif' alt=':2:' />");

var reg=new RegExp(":parkboulay:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/1/parkboulay.gif' alt=':parkboulay:' />");

var reg=new RegExp(":sonic:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/4/sonic.gif' alt=':sonic:' />");

var reg=new RegExp(":unicorn:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/4/unicorn.gif' alt=':unicorn:' />");

var reg=new RegExp(":noe:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/5/noe.gif' alt=':noe:' />");

var reg=new RegExp(":hup:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/membres/hup.png' alt=':hup:' />");

var reg=new RegExp(":jap:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/5/jap.gif' alt=':jap:' />");

var reg=new RegExp(":fuck:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/2/fuck.gif' alt=':fuck:' />");

var reg=new RegExp(":num-3:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/2/3.gif' alt=':num-3:' />");

var reg=new RegExp(":rechercher:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/1/rechercher.gif' alt=':rechercher:' />");

var reg=new RegExp(":bete:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/bete.gif' alt=':bete:' />");

var reg=new RegExp(":pomme:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://s2.noelshack.com/uploads/images/17642729730582_2863999781379_hapomme.png' alt=':pomme:' />");

var reg=new RegExp(":hap-pomme:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://s2.noelshack.com/uploads/images/17642729730582_2863999781379_hapomme.png' alt=':hap-pomme:' />");

var reg=new RegExp(":lol:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/lol.gif' alt=':lol:' />");

var reg=new RegExp(":allyourbase:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/3/All_Your_Base_Are_Belong_To_Us.gif' alt=':allyourbase:' />");

var reg=new RegExp(":fuckyeah:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/membres/fuckyeah.gif' alt=':fuckyeah:' />");

var reg=new RegExp(":mygod:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/5/mygod.png' alt=':mygod:' />");

var reg=new RegExp(":bedo:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/membres/bedo.gif' alt=':bedo:' />");

var reg=new RegExp(":suicide:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/suicide.gif' alt=':suicide:' />");

var reg=new RegExp(":censure:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/2/censure.gif' alt=':censure:' />");

var reg=new RegExp(":3:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/3/3.gif' alt=':3' />");

var reg=new RegExp(":sors:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/1/sors.gif' alt=':sors:' />");

var reg=new RegExp(":fouet:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/fouet.gif' alt=':fouet:' />");

var reg=new RegExp(":vuvuzela:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/3/vuvuzela.gif' alt=':vuvuzela:' />");

var reg=new RegExp(":trollok:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/6/troll-ok.png' alt=':trollok:' />");

var reg=new RegExp(":troll-ok:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/6/troll-ok.png' alt=':troll-ok:' />");

var reg=new RegExp(":hapeach:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://sournoishack.com/uploads/hapeach.gif' alt=':hapeach:' />");

var reg=new RegExp(":hapitch:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://sournoishack.com/uploads/hapitch.gif' alt=':hapitch:' />");

var reg=new RegExp(":lapin:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://sournoishack.com/uploads/1443127909lapin_carotte.gif' alt=':lapin:' />");

var reg=new RegExp(":hapmic:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://sournoishack.com/uploads/hapmic.gif' alt=':hapmic:' />");

var reg=new RegExp(":hapweed:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://sournoishack.com/uploads/hapweed.gif' alt=':hapweed:' />");

var reg=new RegExp(":hap-weed:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://sournoishack.com/uploads/hapweed.gif' alt=':hap-weed:' />");

var reg=new RegExp(":llort:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/6/llort.png' alt=':llort:' />");

var reg=new RegExp(":noel-ange:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/noel/noel-ange.gif' alt=':noel-ange:' />");

var reg=new RegExp(":noel-1:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/top/noel-1.gif' alt=':noel-1:' />");

var reg=new RegExp(":noel1:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/top/noel-1.gif' alt=':noel1:' />");

var reg=new RegExp(":noel-gni:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/gni/noel-gni.gif' alt=':noel-gni:' />");

var reg=new RegExp(":hapoel-ok:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/hapoel/hapoel-ok.gif' alt=':hapoel-ok:' />");

var reg=new RegExp(":hapoelok:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/hapoel/hapoel-ok.gif' alt=':hapoelok:' />");

var reg=new RegExp(":hapoel-ange:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/hapoel/hapoel-ange.gif' alt=':hapoel-ange:' />");

var reg=new RegExp(":hapoel-1:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/hapoel/hapoel-1.gif' alt=':hapoel-1:' />");

var reg=new RegExp(":hapoel1:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/hapoel/hapoel-1.gif' alt=':hapoel1:' />");

var reg=new RegExp(":hapoel-gni:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/gni/hapoel-gni.gif' alt=':hapoel-gni:' />");

var reg=new RegExp(":hapoelia-ok:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/hapoelia/hapoelia-ok.gif' alt=':hapoelia-ok:' />");

var reg=new RegExp(":hapoeliaok:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/hapoelia/hapoelia-ok.gif' alt=':hapoeliaok:' />");

var reg=new RegExp(":hapoelia-ange:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/hapoelia/hapoelia-ange.gif' alt=':hapoelia-ange:' />");

var reg=new RegExp(":hapoelia-1:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/top/hapoelia-1.gif' alt=':hapoelia-1:' />");

var reg=new RegExp(":hapoelia1:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/top/hapoelia-1.gif' alt=':hapoelia1:' />");

var reg=new RegExp(":hapoelia-gni:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/gni/hapoelia-gni.gif' alt=':hapoelia-gni:' />");

var reg=new RegExp(":hap-ange:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/hap/hap-ange.gif' alt=':hap-ange:' />");

var reg=new RegExp(":hap-1:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/top/hap-1.gif' alt=':hap-1:' />");

var reg=new RegExp(":hap1:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/top/hap-1.gif' alt=':hap1:' />");

var reg=new RegExp(":hap-gni:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/gni/hap-gni.gif' alt=':hap-gni:' />");

var reg=new RegExp(":noel-ok2:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/noel/noel-ok2.gif' alt=':noel-ok2:' />");

var reg=new RegExp(":noel-diable:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/noel/noel-diable.gif' alt=':noel-diable:' />");

var reg=new RegExp(":noel-2:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/top/noel-2.gif' alt=':noel-2:' />");

var reg=new RegExp(":noel-bravo:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/bravo/noel-bravo.gif' alt=':noel-bravo:' />");

var reg=new RegExp(":hapoel-ok2:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/hapoel/hapoel-ok2.gif' alt=':hapoel-ok2:' />");

var reg=new RegExp(":hapoel-diable:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/hapoel/hapoel-diable.gif' alt=':hapoel-diable:' />");

var reg=new RegExp(":hapoel-2:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/top/hapoel-2.gif' alt=':hapoel-2:' />");

var reg=new RegExp(":hapoel-bravo:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/bravo/hapoel-bravo.gif' alt=':hapoel-bravo:' />");

var reg=new RegExp(":hapoelia-ok2:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/hapoelia/hapoelia-ok2.gif' alt=':hapoelia-ok2:' />");

var reg=new RegExp(":hapoelia-diable:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/hapoelia/hapoelia-diable.gif' alt=':hapoelia-diable:' />");

var reg=new RegExp(":hapoelia-2:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/top/hapoelia-2.gif' alt=':hapoelia-2:' />");

var reg=new RegExp(":hapoelia-bravo:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/bravo/hapoelia-bravo.gif' alt=':hapoelia-bravo:' />");


var reg=new RegExp(":hap-ok2:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/hap/hap-ok2.gif' alt=':hap-ok2:' />");

var reg=new RegExp(":hap-diable:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/hap/hap-diable.gif' alt=':hap-diable:' />");

var reg=new RegExp(":hap-2:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/top/hap-2.gif' alt=':hap-2:' />");

var reg=new RegExp(":hap-bravo:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/bravo/hap-bravo.gif' alt=':hap-bravo:' />");

var reg=new RegExp(":noel-coeur:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/noel/noel-coeur.gif' alt=':noel-coeur:' />");

var reg=new RegExp(":noel-fuck:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/noel/noel-fuck.gif' alt=':noel-fuck:' />");

var reg=new RegExp(":noel-3:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/top/noel-3.gif' alt=':noel-3:' />");

var reg=new RegExp(":hapoel-coeur:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/hapoel/hapoel-coeur.gif' alt=':hapoel-coeur:' />");

var reg=new RegExp(":hapoel-fuck:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/hapoel/hapoel-fuck.gif' alt=':hapoel-fuck:' />");

var reg=new RegExp(":hapoel-3:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/hapoel/hapoel-3.gif' alt=':hapoel-3:' />");

var reg=new RegExp(":hapoelia-coeur:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/hapoelia/hapoelia-coeur.gif' alt=':hapoelia-coeur:' />");

var reg=new RegExp(":hapoelia-fuck:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/hapoelia/hapoelia-fuck.gif' alt=':hapoelia-fuck:' />");

var reg=new RegExp(":hapoelia-3:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/top/hapoelia-3.gif' alt=':hapoelia-3:' />");

var reg=new RegExp(":hap-coeur:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/hap/hap-coeur.gif' alt=':hap-coeur:' />");

var reg=new RegExp(":hap-fuck:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/hap/hap-fuck.gif' alt=':hap-fuck:' />");

var reg=new RegExp(":hap-3:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/top/hap-3.gif' alt=':hap-3:' />");

var reg=new RegExp(":noel-question:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/noel/noel-question.gif' alt=':noel-question:' />");

var reg=new RegExp(":noel-bave:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/noel/noel-bave.gif' alt=':noel-bave:' />");

var reg=new RegExp(":noel-up:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/noel/noel-up.gif' alt=':noel-up:' />");

var reg=new RegExp(":hapoel-question:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/hapoel/hapoel-question.gif' alt=':hapoel-question:' />");

var reg=new RegExp(":hapoel-bave:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/hapoel/hapoel-bave.gif' alt=':hapoel-bave:' />");

var reg=new RegExp(":hapoel-up:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/hapoel/hapoel-up.gif' alt=':hapoel-up:' />");

var reg=new RegExp(":hapoelia-question:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/hapoelia/hapoelia-question.gif' alt=':hapoelia-question:' />");

var reg=new RegExp(":hapoelia-bave:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/hapoelia/hapoelia-bave.gif' alt=':hapoelia-bave:' />");

var reg=new RegExp(":hapoelia-up:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/hapoelia/hapoelia-up.gif' alt=':hapoelia-up:' />");

var reg=new RegExp(":hap-question:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/hap/hap-question.gif' alt=':hap-question:' />");

var reg=new RegExp(":hap-bave:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/hap/hap-bave.gif' alt=':hap-bave:' />");

var reg=new RegExp(":hap-up:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/smiley/hap/hap-up.gif' alt=':hap-up:' />");

var reg=new RegExp(":jellytime:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/4/lama.gif' alt=':jellytime:' />");

var reg=new RegExp(":gwadsa:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/membres/gwadsa.gif' alt=':gwadsa:' />");

var reg=new RegExp(":energize:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/membres/energize.gif' alt=':energize:' />");

var reg=new RegExp(":nekow:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/NT/nekow.gif' alt=':nekow:' />");

var reg=new RegExp(":kidcudi:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/membres/kidcudi.jpg' alt=':kidcudi:' />");

var reg=new RegExp(":noixdecoco:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/membres/noixdecoco.gif' alt=':noixdecoco:' />");

var reg=new RegExp(":raspoutine:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/membres/raspoutine.gif' alt=':raspoutine:' />");

var reg=new RegExp(":pyramid:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/membres/pyramid.gif' alt=':pyramid:' />");

var reg=new RegExp(":onchiste:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/membres/onchiste.jpg' alt=':onchiste:' />");

var reg=new RegExp(":miku:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/membres/miku.jpg' alt=':miku:' />");

var reg=new RegExp(":uturn:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/membres/uturn.jpg' alt=':uturn:' />");

var reg=new RegExp(":alain:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/membres/alain.jpg' alt=':alain:' />");

var reg=new RegExp(":fire:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/NT/fire.gif' alt=':fire:' />");

var reg=new RegExp(":potager23:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/NT/potager23.gif' alt=':potager23:' />");

var reg=new RegExp(":mizu:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/membres/mizu.gif' alt=':mizu:' />");

var reg=new RegExp(":bidewars:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/membres/bidewars.gif' alt=':bidewars:' />");

var reg=new RegExp(":slyze:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/membres/slyze.gif' alt=':slyze:' />");

var reg=new RegExp(":greatbritain:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/membres/greatbritain.jpg' alt=':greatbritain:' />");

var reg=new RegExp(":boggy:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/membres/boggy.gif' alt=':boggy:' />");

var reg=new RegExp(":niou:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/membres/niou.jpg' alt=':niou:' />");

var reg=new RegExp(":felicia:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/membres/felicia.gif' alt=':felicia:' />");

var reg=new RegExp(":sylar:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/membres/sylar.gif' alt=':sylar:' />");

var reg=new RegExp(":kagouti:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/membres/kagouti.gif' alt=':kagouti:' />");

var reg=new RegExp(":teach:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/membres/teach.png' alt=':teach:' />");

var reg=new RegExp(":nudge:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/NT/nudge.gif' alt=':nudge:' />");

var reg=new RegExp(":jeanstalinas:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/membres/jeanstalinas.gif' alt=':jeanstalinas:' />");

var reg=new RegExp(":silversea:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/membres/haplink.gif' alt=':silversea:' />");

var reg=new RegExp(":genki:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/membres/genki.gif' alt=':genki:' />");

var reg=new RegExp(":ramm:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/membres/ramm.jpg' alt=':ramm:' />");

var reg=new RegExp(":nyu:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/membres/nyu.jpg' alt=':nyu:' />");

var reg=new RegExp(":tweet:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/membres/tweet.gif' alt=':tweet:' />");

var reg=new RegExp(":kreuz:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/membres/kreuz.gif' alt=':kreuz:' />");

var reg=new RegExp(":cisla:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/5/cisla.gif' alt=':cisla:' />");

var reg=new RegExp(":tyler:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/membres/tyler.gif' alt=':tyler:' />");

var reg=new RegExp(":pindemie:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/membres/pindemie.gif' alt=':pindemie:' />");

var reg=new RegExp(":yihhaou:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/membres/yihhaou.png' alt=':yihhaou:' />");

var reg=new RegExp(":twostorms:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/membres/twostorms.jpg' alt=':twostorms:' />");

var reg=new RegExp(":solid:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/membres/solid.png' alt=':solid:' />");

var reg=new RegExp(":gunther:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/membres/gunther.jpg' alt=':gunther:' />");

var reg=new RegExp(":android:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://sournoishack.com/uploads/android.jpg' alt=':android:' />");

var reg=new RegExp(":horsjeu:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://sournoishack.com/uploads/kick_ass_icon.jpg' alt=':horsjeu:' />");

var reg=new RegExp(":quebec:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://sournoishack.com/uploads/60948924gif_anime_quebec_emoticone_gif.gif' alt=':quebec:' />");
var reg=new RegExp(":beuark:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/membres/beuark.jpg' alt=':beuark:' />");

var reg=new RegExp("8O", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/6/8O.jpg' alt='8O' />");

var reg=new RegExp(":yoda:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://sournoishack.com/uploads/icon_yoda.gif' alt=':yoda:' />");

var reg=new RegExp(":wi:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://s2.noelshack.com/uploads/images/1030103349363_wi.gif' alt=':wi:' />");

var reg=new RegExp(":jadec:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://sournoishack.com/uploads/jc.png' alt=':jadec:' />");

var reg=new RegExp(":emo:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://azertweet.com/i/icons/5/emo.gif' alt=':emo:' />");



document.body.innerHTML=smiley;