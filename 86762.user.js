// ==UserScript==
// @name           Ajout de smiley dans la liste de smiley de JVC
// @namespace      [Version 0.1]
// @description    ajoute les smiley de NT et AT dans la liste de smileys de JVC
// @include        http://www.jeuxvideo.com/smileys/legende.htm
// @include        http://*.forumjv.com/smileys/legende.htm
// @Auteur Energize et JellyTime a qui j'ai piqué une partie du code :hap:
// @Remerciement  Neloar pour les smileys 
// @Dédicace à QuebecPizza :hap-coeur:
// ==/UserScript==
function addImg(href){
var img = document.createElement('img');
img.src = href;
return img;
}

function addA(href, code){
var a = document.createElement('a');
a.href = 'javascript:passCode("newmessage","'+code+'");'
a.appendChild(addImg(href));
return a;
}

function addTd1(href, code){
var td = document.createElement('td');
td.appendChild(addA(href, code));
return td;
}

function addTd2(code){
var td = document.createElement('td');
td.innerHTML = code;
return td;
}

function addTr(i){
var tr = document.createElement('tr');
var classe = (i%2 == 0)? 'tr1' : 'tr2';
tr.setAttribute('class', classe);
return tr;
}

function nbTr(){
	return document.getElementsByTagName('tr').length;
}

function lastTr(){
return document.getElementsByTagName('tr')[nbTr()-1];
}

function nbTd(tr){
return lastTr().getElementsByTagName('td').length;
}

function addSmiley(tr, href, code){
if(nbTd(tr) == 8)
tr = tr.parentNode.appendChild(addTr(nbTr()));
tr.appendChild(addTd1(href, code));
tr.appendChild(addTd2(code));
}

function addSmileys(){
try{

addSmiley(lastTr(), "http://azertweet.com/i/icons/4/epilepsie.gif", ":epilepsie:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/6/trollface.png", ":troll:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/hapoel.gif", ":hapoel:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/hapoelia.gif", ":hapoelia:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/5/juif.png", ":juif:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/banana.gif", ":banana:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/3/wesh.gif", ":wesh:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/2/awesome.gif", ":awe: ou :awesome:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/fuu.png", ":fuu:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/shoop-da-whoop.gif", ":woop:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/pedo.gif", ":pedo:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/4/pedobear2.png", ":pedo:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/6/hapr.gif", ":hapr:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/5/horace.png", ":horace:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/membres/koysuke.gif", ":koysuke:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/NT/l.jpg", ":L" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/5/chuck.png", ":chuck:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/hap/hap-ok.gif", ":hap-ok: ou :hapok:" );
addSmiley(lastTr(), "http://noeltweet.com/i/icons/scylla.gif", ":scylla:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/noel/noel-ok.gif", ":noel-ok: ou :noelok:" );
addSmiley(lastTr(), "http://noeltweet.com/i/icons/hapn.gif", ":hapa:" );
addSmiley(lastTr(), "http://noeltweet.com/i/icons/cochon.png", ":cochon:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/NT/wox.gif", ":wox:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/fish.png", ":fish:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/6/mais.gif", ":mais:" );
addSmiley(lastTr(), "http://noeltweet.com/i/icons/yeah.gif", ":yeah:" );
addSmiley(lastTr(), "http://noeltweet.com/i/icons/owii.gif", ":owii:" );
addSmiley(lastTr(), "http://noeltweet.com/i/icons/haplink.gif", ":haplink:" );
addSmiley(lastTr(), "http://noeltweet.com/i/icons/rebelz.png", ":rebelz:" );
addSmiley(lastTr(), "http://noeltweet.com/i/icons/haha.gif", ":haha: ou :ahah:" );
addSmiley(lastTr(), "http://noeltweet.com/i/icons/link.gif", ":super-lolotte:" );
addSmiley(lastTr(), "http://noeltweet.com/i/icons/moundir.bmp", ":danish:" );
addSmiley(lastTr(), "http://noeltweet.com/i/icons/hitlhap.png", ":hitlap:" );
addSmiley(lastTr(), "http://noeltweet.com/i/icons/nowel.png", ":nowel:" );
addSmiley(lastTr(), "http://noeltweet.com/i/icons/HH.png", ":HH:" );
addSmiley(lastTr(), "http://noeltweet.com/i/icons/hopr.gif", ":hopr:" );
addSmiley(lastTr(), "http://noeltweet.com/i/icons/happlaudir.gif", ":happaplaudir:" );
addSmiley(lastTr(), "http://noeltweet.com/i/icons/jerry.gif", ":jerry:" );
addSmiley(lastTr(), "http://noeltweet.com/i/icons/castiel.gif", ":castiel:" );
addSmiley(lastTr(), "http://noeltweet.com/i/icons/hedoras.jpg", ":hedoras:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/2/ok2.gif", ":ok2:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/xd.gif", ":xd:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/rougi.gif", ":rougit:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/2/1.gif", ":1:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/1/bouletdujour.gif", ":bouletdujour:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/1/hs.gif", ":hs:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/1/wtf.gif", ":wtf:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/4/rage.gif", ":rage: ou :raj:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/3/yahoi-coeur.gif", ":yahoi-coeur:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/6/dzonche.gif", ":dzonche:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/6/hip.gif", ":hip:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/chien.gif", ":chien:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/sparta.gif", ":sparta:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/2/bounce.gif", ":bounce:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/2/2.gif", ":2:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/1/parkboulay.gif", ":parkboulay:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/4/sonic.gif", ":sonic:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/5/noe.gif", ":noe:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/membres/hup.png", ":hup:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/5/jap.gif", ":jap:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/2/fuck.gif", ":fuck:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/2/3.gif", ":num-3:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/1/rechercher.gif", ":rechercher:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/bete.gif", ":bete:" );
addSmiley(lastTr(), "http://s2.noelshack.com/uploads/images/17642729730582_2863999781379_hapomme.png", ":pomme: ou :hap-pomme:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/lol.gif", ":lol:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/3/All_Your_Base_Are_Belong_To_Us.gif", ":allyourbase:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/membres/fuckyeah.gif", ":fuckyeah:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/5/mygod.png", ":mygod:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/membres/bedo.gif", ":bedo:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/suicide.gif", ":suicide:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/2/censure.gif", ":censure:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/3/3.gif", ":3:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/3/vuvuzela.gif", ":vuvuzela:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/6/troll-ok.png", ":troll-ok: ou :trollok:" );
addSmiley(lastTr(), "http://sournoishack.com/uploads/hapeach.gif", ":hapeach:" );
addSmiley(lastTr(), "http://sournoishack.com/uploads/hapitch.gif", ":hapitch:" );
addSmiley(lastTr(), "http://sournoishack.com/uploads/1443127909lapin_carotte.gif", ":lapin:" );
addSmiley(lastTr(), "http://sournoishack.com/uploads/hapmic.gif", ":hapmic:" );
addSmiley(lastTr(), "http://sournoishack.com/uploads/hapweed.gif", ":hapweed: ou :hap-weed:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/6/llort.png", ":llort:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/noel/noel-ange.gif", ":noel-ange:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/top/noel-1.gif", ":noel-1: ou :noel1:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/gni/noel-gni.gif", ":noel-gni:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/hapoel/hapoel-ok.gif", ":hapoel-ok: ou :hapoelok:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/hapoel/hapoel-ange.gif", ":hapoel-ange:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/hapoel/hapoel-1.gif", ":hapoel-1: ou :hapoel1:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/gni/hapoel-gni.gif", ":hapoel-gni:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/hapoelia/hapoelia-ok.gif", ":hapoelia-ok: ou :hapoeliaok:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/hapoelia/hapoelia-ange.gif", ":hapoelia-ange:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/top/hapoelia-1.gif", ":hapoelia-1: ou :hapoelia1:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/gni/hapoelia-gni.gif", ":hapoelia-gni:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/hap/hap-ange.gif", ":hap-ange:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/top/hap-1.gif", ":hap-1: ou :hap1:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/gni/hap-gni.gif", ":hap-gni:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/noel/noel-ok2.gif", ":noel-ok2:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/noel/noel-diable.gif", ":noel-diable:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/top/noel-2.gif", ":noel-2:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/bravo/noel-bravo.gif", ":noel-bravo:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/hapoel/hapoel-ok2.gif", ":hapoel-ok2:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/hapoel/hapoel-diable.gif", ":hapoel-diable:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/top/hapoel-2.gif", ":hapoel-2:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/bravo/hapoel-bravo.gif", ":hapoel-bravo:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/hapoelia/hapoelia-ok2.gif", ":hapoelia-ok2:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/hapoelia/hapoelia-diable.gif", ":hapoelia-diable:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/top/hapoelia-2.gif", ":hapoelia-2:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/bravo/hapoelia-bravo.gif", ":hapoelia-bravo:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/hap/hap-ok2.gif", ":hap-ok2:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/hap/hap-diable.gif", ":hap-diable:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/top/hap-2.gif", ":hap-2:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/bravo/hap-bravo.gif", ":hap-bravo-" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/noel/noel-coeur.gif", ":noel-coeur:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/noel/noel-fuck.gif", ":noel-fuck:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/top/noel-3.gif", ":noel-3:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/hapoel/hapoel-coeur.gif", ":hapoel-coeur:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/hapoel/hapoel-fuck.gif", ":hapoel-fuck:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/hapoel/hapoel-3.gif", ":hapoel-3:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/hapoelia/hapoelia-coeur.gif", ":hapoelia-coeur:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/hapoelia/hapoelia-fuck.gif", ":hapoelia-fuck:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/top/hapoelia-3.gif", ":hapoelia-3:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/hap/hap-coeur.gif", ":hap-coeur:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/hap/hap-fuck.gif", ":hap-fuck:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/top/hap-3.gif", ":hap-3:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/noel/noel-question.gif", ":noel-question:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/noel/noel-bave.gif", ":noel-bave:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/noel/noel-up.gif", ":noel-up:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/hapoel/hapoel-question.gif", ":hapoel-question:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/hapoel/hapoel-bave.gif", ":hapoel-bave:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/hapoel/hapoel-up.gif", ":hapoel-up:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/hapoelia/hapoelia-question.gif", ":hapoelia-question:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/hapoelia/hapoelia-bave.gif", ":hapoelia-bave:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/hapoelia/hapoelia-up.gif", ":hapoelia-up:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/hap/hap-question.gif", ":hap-question:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/hap/hap-bave.gif", ":hap-bave:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/smiley/hap/hap-up.gif", ":hap-up:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/4/lama.gif", ":jellytime:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/membres/gwadsa.gif", ":gwadsa:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/membres/energize.gif", ":energize:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/NT/nekow.gif", ":nekow:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/membres/kidcudi.jpg", ":kidcudi:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/membres/noixdecoco.gif", ":noixdecoco:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/membres/raspoutine.gif", ":raspoutine:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/membres/pyramid.gif", ":pyramid:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/membres/onchiste.jpg", ":onchiste:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/membres/miku.jpg", ":miku:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/membres/uturn.jpg", ":uturn:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/membres/alain.jpg", ":alain:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/NT/fire.gif", ":fire:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/NT/potager23.gif", ":potager23:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/membres/mizu.gif", ":mizu:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/membres/bidewars.gif", ":bidewars:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/membres/slyze.gif", ":slyze:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/membres/greatbritain.jpg", ":greatbritain:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/membres/boggy.gif", ":boggy:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/membres/niou.jpg", ":niou:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/membres/felicia.gif", ":felicia:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/membres/sylar.gif", ":sylar:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/membres/kagouti.gif", ":kagouti:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/membres/teach.png", ":teach:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/NT/nudge.gif", ":nudge:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/membres/jeanstalinas.gif", ":jeanstalinas:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/membres/haplink.gif", ":silversea:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/membres/genki.gif", ":genki:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/membres/ramm.jpg", ":ramm:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/membres/nyu.jpg", ":nyu:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/membres/tweet.gif", ":tweet:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/membres/kreuz.gif", ":kreuz:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/5/cisla.gif", ":cisla:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/membres/tyler.gif", ":tyler:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/membres/pindemie.gif", ":pindemie:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/membres/yihhaou.png", ":yihhaou:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/membres/twostorms.jpg", ":twostorms:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/membres/solid.png", ":solid:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/membres/gunther.jpg", ":gunther:" );
addSmiley(lastTr(), "http://sournoishack.com/uploads/android.jpg", ":android:" );
addSmiley(lastTr(), "http://sournoishack.com/uploads/kick_ass_icon.jpg", ":horsjeu:" );
addSmiley(lastTr(), "http://sournoishack.com/uploads/60948924gif_anime_quebec_emoticone_gif.gif", ":quebec:" );
addSmiley(lastTr(), "http://sournoishack.com/uploads/jc.png", ":jadec:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/5/emo.gif", ":emo:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/membres/beuark.jpg", ":beuark:" );
addSmiley(lastTr(), "http://azertweet.com/i/icons/6/8O.jpg", "8O" );
addSmiley(lastTr(), "http://sournoishack.com/uploads/icon_yoda.gif", ":yoda:" );
addSmiley(lastTr(), "http://s2.noelshack.com/uploads/images/1030103349363_wi.gif", ":wi:" );


addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );
addSmiley(lastTr(), "http://www.hapoelshack.com/script/1px.gif", "" );

}
catch(e){
alert(e);
}
}

addSmileys();
