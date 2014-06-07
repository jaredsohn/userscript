// ==UserScript==
// @name           Compilation Smileys jeuxvideo.com - 02
// @namespace      Compilsmileysjvc - 02
// @description    Compilation Smileys jeuxvideo.com
// @exclude       http://*.blog.jeuxvideo.com/*
// @exclude       http://www.jeuxvideo.com/commentaires/*
// @exclude       http://www.jeuxvideo.com/forums/0-*
// @exclude       http://www.jeuxvideo.com/forums/1-*
// @exclude       http://www.jeuxvideo.com/forums/3-*
// @exclude       http://www.jeuxvideo.com/profil/*.html
// @exclude       http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// @include       http://www.jeuxvideo.com/oi/modal/smileys.htm

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

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/6855145686873_1.png", ":1:" );
addSmiley(lastTr(), "http://image.noelshack.com/fichiers/2012/20/1337539936-3.png", ":3:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/8013729586896_aaa.png", ":aaa:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/1859081823225_alcool.gif", ":alcool:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/13114055263320_arf.png", ":arf:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/3753898742583_arf2.gif", ":arf2:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/5210359331958_autiste.gif", ":autiste:" );
addSmiley(lastTr(), "http://hapshack.com/images/fCGMY.gif", ":bail:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/14201174480526_battu.png", ":battu:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/10579499944200_bave2.gif", ":bave2:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/10310671049778_bave3.gif", ":bave3:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/18680949548217_bavecoeur.png", ":bavecoeur:" );

addSmiley(lastTr(), "http://hapshack.com/images/wBvkV.gif", ":bof:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/13163524035948_bwa.gif", ":bwa:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/8819761345659_cafaitpeur.gif", ":pscopa:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/20768769615330_cafe.gif", ":cafe:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/10761412511124_cbd.png", ":cbd:" );
addSmiley(lastTr(), "http://image.noelshack.com/fichiers/2012/21/1337610940-hm.gif", ":chut:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/15078281531049_citrouille2.gif", ":citr:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/9106859652957_class.gif", ":class:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/15473571848064_coeursnif.png", ":coeursnif:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/13941996580908_com.png", ":com:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/13443048310725_confiant.png", ":confiant:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/545959468593_content2.png", ":content2:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/2961477722610_cool2.png", ":cool2:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/6821194692312_coolnah.png", ":coolnah:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/14258578009599_coolp.png", ":coolp:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/21076513117902_cpt.png", ":c+t:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/20600106793299_csbm.gif", ":csb:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/6550885985886_demon2.png", ":demon:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/6452213144157_deprime.gif", ":deprime:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/7797536178399_derp.png", ":derp:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/6377654880729_derp2.gif", ":derp2:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/883360475118_dovhapkiin.png", ":dovhapkiin:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/6593154868575_dzonche.gif", ":dzonche:" );
addSmiley(lastTr(), "http://hapshack.com/images/5QRYD.gif", ":euh:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/11452295765889_fish.png", ":fish:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/9222594768288_flip.gif", ":flip:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/16050434706009_fou2.png", ":fou2:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/7810085973294_fou3.png", ":fou3:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/6956417688660_fouhac.gif", ":fouh:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/10508258589048_fp.png", ":fp:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/9453195835875_fuuj.png", ":fuu:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/8901690431931_geek.gif", ":geek:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/9325157640975_grotte3.gif", ":grotte:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/14691301022970_grr2.png", ":grr:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/9216096438186_grr3.png", ":grr2:" );

addSmiley(lastTr(), "http://hapshack.com/images/eqkQ6.gif", ":ha:" );
addSmiley(lastTr(), "http://image.noelshack.com/fichiers/2012/21/1337610940-haf.png", ":haf:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/15677897193486_hah2.png", ":haha:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/12316978228995_hapbravo.gif", ":hapgg:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/2244548382714_hapdoute.png", ":hapdoute:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/122226436134_hapk.gif", ":hapk:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/21446214954021_haplol.gif", ":haplol:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/8675755287705_hapmouais.png", ":hapmouais:" );

addSmiley(lastTr(), "http://image.noelshack.com/fichiers/2012/20/1337539021-hapoel.png", ":hapoel:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/4005745105428_hapoelok.png", ":hapoelok:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/16451202905181_hapoelok2.png", ":hapoelok2:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/18215263781451_hpm.gif", ":hparty:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/10404936262314_hapoeldiable.png", ":hapoeld:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/13137003178299_hapoelia.gif", ":hapoelia:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/18212791358718_hapoeliaok.png", ":hapoeliaok:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/1084050994059_hapoeliaok2.png", ":hapoeliaok2:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/15573358128438_hapoeliadiable.png", ":hapoeliad:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/11426244191307_party.gif", ":happarty:" );

addSmiley(lastTr(), "http://sournoishack.com/uploads/118764823hapok.gif", ":hapok:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/2401900345944_hapok2.gif", ":hapok2:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/9080231256063_haprof.gif", ":haprof:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/8936487811845_hpm.gif", ":hapfete:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/6565288945446_hapdiable.png", ":hapd:" );
addSmiley(lastTr(), "http://image.noelshack.com/fichiers/2012/21/1337618520-aya.png", ":haya:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/4231739453733_hehe.gif", ":hehe:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/4450332712221_heuheu.png", ":heuheu:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/19358453831013_hih.gif", ":hih:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/6668582605047_hihi.gif", ":hihi:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/11466790516269_hip.gif", ":hip:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/14468247670536_hipcoeur.png", ":hipcoeur:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/1126844534277_hmm.png", ":hmm:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/16553414083041_hmm2.png", ":hmm2:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/12656370336390_hmm3.png", ":hmm3:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/5647778355681_huh.gif", ":huh:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/4880161125081_humfier.png", ":humfier:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/13623882445503_humh.png", ":humh:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/15121830775689_hurm.png", ":hurm:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/5550560908398_hyppy.png", ":hyppy:" );

addSmiley(lastTr(), "http://image.noelshack.com/fichiers/2012/20/1337539021-Jap.png", ":jap:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/12197894258583_japok.gif", ":japok:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/17192743333722_kikoo.gif", ":kikoo:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/8889483382758_ko.png", ":ko:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/8540935281054_loose.gif", ":loose:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/14143383790173_loose2.gif", ":loose2:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/5242332334338_love.png", ":love:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/1453641921270_mix.gif", ":mix:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/14923731837564_moine12.gif", ":moine:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/10834763365305_mouef.png", ":mouef:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/2446447670766_musique2.gif", ":musique:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/8883099431217_naif.gif", ":naif:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/9066830706252_nerf.png", ":nerf:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/76532126022_nii.png", ":nii:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/16274818385397_nn.gif", ":nn:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/10032901179543_nnh.png", ":nnh:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/8152287259743_no.png", ":no:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/1360795686822_noelbad.gif", ":noelbad:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/1609536480255_noelgg.gif", ":noelgg:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/9252724734990_noelparty.gif", ":noelparty:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/15563951409204_noelite.png", ":noelite:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/9338963030298_noelok.gif", ":noelok:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/16160613687009_noelok2.gif", ":noelok2:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/16725403352394_noelv.gif", ":noelv:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/20860738897482_noeldiable.png", ":noeld:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/7942729997565_nolife.png", ":nolife:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/19538909663625_nop.gif", ":nop:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/10544000394510_oh.gif", ":oh:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/2060355143880_ok2.gif", ":ok2:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/10302675559407_omg.gif", ":omg:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/248172540264_oom.gif", ":oo:" );
addSmiley(lastTr(), "http://hapshack.com/images/7iXwy.gif", ":osef:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/13459451950197_ouchcoeur.png", ":ouchcoeur:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/5018913598446_ouchcontent.png", ":ouchcontent:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/584770667085_parapluie.gif", ":parapluie:" );
addSmiley(lastTr(), "http://hapshack.com/images/1QCvc.gif", ":pense:" );

addSmiley(lastTr(), "http://image.noelshack.com/fichiers/2012/20/1337539021-pervers.png", ":pervers:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/2379555970605_peur.png", ":peur2:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/4790078104284_pigeon.png", ":pigeon:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/18087388690239_pkmn.png", ":pkmn:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/11835772974333_pokfete.gif", ":pokerfete:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/7642824901074_psycho2.gif", ":psy:" );

addSmiley(lastTr(), "http://sournoishack.com/uploads/1816947916rage.gif", ":rage:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/8603883875565_rip.gif", ":rip:" );
addSmiley(lastTr(), "http://image.noelshack.com/fichiers/2012/21/1337610940-rip.gif", ":rip2:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/21400141071870_rire3.gif", ":rire3:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/13708934569440_security.png", ":security:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/8904143986551_sifflote.gif", ":sifflote:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/2185217146431_slurp.png", ":slurp:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/16476279847236_sm.gif", ":sm:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/10919730647727_snif4.gif", ":snif3:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/8660812982085_snif.png", ":snif4:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/6223736054151_snif3.png", ":snif5:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/20960470493325_sournoihap.png", ":sournoihap:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/16684406202519_sournoiok.png", ":sournoiok:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/17119329565833_sparta.gif", ":sparta:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/19540326911886_tapotte1.gif", ":tapotte:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/12099065382459_toh.png", ":toh:" );
addSmiley(lastTr(), "http://hapshack.com/images/IQ5E.gif", ":tcho:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/18055043215110_vac.png", ":vac:" );
addSmiley(lastTr(), "http://hapshack.com/images/7jKxh.gif", ":what:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/8816989912830_wesh.gif", ":wesh:" );
addSmiley(lastTr(), "http://hapshack.com/images/x6boQ.gif", ":wsh:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/11774923869852_wi.png", ":wi:" );
addSmiley(lastTr(), "http://image.noelshack.com/fichiers/2012/21/1337618259-wiok.png", ":wiok:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/16890963834690_win.gif", ":win:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/7852496421825_win2m.gif", ":win2:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/13742229139650_wtf.png", ":wtf:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/8620965777204_wut.gif", ":wut:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/6032187210951_xd.gif", ":xd:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/3519751339665_xd2.gif", ":xd2:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/17047337145795_xo.gif", ":xo:" );
addSmiley(lastTr(), "http://image.noelshack.com/fichiers/2012/20/1337539898-Yop.png", ":yop:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/8197785219492_zombie.gif", ":zombie:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/816648526980_zombie2.gif", ":zombie2:" );

addSmiley(lastTr(), "http://hapshack.com/images/VYtJ5.gif", ":zik:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/9223810766676_zzz.png", ":zzz:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/11737407491865_aws.png", ":aws:" );
addSmiley(lastTr(), "http://sournoishack.com/uploads/2076486480Cisla.png", ":cisla:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/15512199824880_cochonpanachay.png", ":cisla2:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/5312723474520_shauni.gif", ":shauni:" );

addSmiley(lastTr(), "http://image.noelshack.com/fichiers/2012/21/1337610940-349.png", ":349:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/13765237698564_pedo.gif", ":pedo:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/9356727553668_geevey.gif", ":geevey:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/17190420096069_igor.gif", ":igor:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/4369944091887_mario.png", ":mario:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/2471224942791_lamasm.png", ":lamasm:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/8040365833005_lamasticot.png", ":lamasticot:" );

addSmiley(lastTr(), "http://sournoishack.com/uploads/852002552chuck.png", ":chuck:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/21248336083887_nyancat.gif", ":nyancat:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/3289235333571_benderfume.gif", ":bender:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/10480083976791_godotcafe.gif", ":godotcafe:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/18753248647584_visiteur.gif", ":vdf:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/16428977547939_bump.gif", ":bump:" );

addSmiley(lastTr(), "http://image.noelshack.com/fichiers/2012/20/1337539898-snup.png", ":snup:" );
addSmiley(lastTr(), "http://image.noelshack.com/fichiers/2012/20/1337539898-Fup.png", ":fup:" );

addSmiley(lastTr(), "http://image.noelshack.com/fichiers/2012/20/1337539021-noelup.png", ":noelup:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/16312237963065_hapup.png", ":hapup:" );

addSmiley(lastTr(), "http://image.noelshack.com/fichiers/2012/20/1337539898-upf.png", ":upf:" );
addSmiley(lastTr(), "http://image.noelshack.com/fichiers/2012/20/1337539898-nup.png", ":upr:" );

addSmiley(lastTr(), "http://image.noelshack.com/fichiers/2012/20/1337539898-Hup.png", ":hup:" );
addSmiley(lastTr(), "http://image.noelshack.com/fichiers/2012/21/1337620646-rs.gif", ":riresors:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/18092358473211_hahsors.png", ":hahsors:" );
addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/18749659526532_btg.png", ":btg:" );

addSmiley(lastTr(), "http://s4.noelshack.com/uploads/images/13065142955040_btg2.png", ":btg2:" );

addSmiley(lastTr(), "http://image.noelshack.com/fichiers/2012/21/1337610940-anoel2.png", ":anoel:" );
addSmiley(lastTr(), "http://image.noelshack.com/fichiers/2012/21/1337610940-ahap2.png", ":ahap:" );

}
catch(e){
alert(e);
}
}

addSmileys();