// ==UserScript==
// @name           Compilation Smileys jeuxvideo.com - 01
// @namespace      Compilsmileysjvc - 01
// @description    Compilation Smileys jeuxvideo.com
// @include        http://www.jeuxvideo.com/forums/1-*
// @include        http://www.jeuxvideo.com/profil/*
// @include        http://www.jeuxvideo.com/forums/3-*
// @include        http://*.blog.jeuxvideo.com/*
// @include        http://www.jeuxvideo.com/messages-prives/message*
// @include        http://www.jeuxvideo.com/commentaires/*
// @exclude        http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// @exclude        http://www.jeuxvideo.com/forums/0-*
// ==/UserScript==
var chaine=document.body.innerHTML;

var reg=new RegExp("(:ahap:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2012/21/1337610940-ahap.png' />");

var reg=new RegExp("(:anoel:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2012/21/1337610940-anoel.png' />");

var reg=new RegExp("(:rip2:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2012/21/1337610940-rip.gif' />");

var reg=new RegExp("(:chut:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2012/21/1337610940-hm.gif' />");

var reg=new RegExp("(:haf:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2012/21/1337610940-haf.png' />");

var reg=new RegExp("(:349:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2012/21/1337610940-349.png' />");

var reg=new RegExp("(:alcool:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/1859081823225_alcool.gif' />");

var reg=new RegExp("(:aws:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/11737407491865_aws.png' />");

var reg=new RegExp("(:arf:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/13114055263320_arf.png' />");

var reg=new RegExp("(:bail:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://hapshack.com/images/fCGMY.gif' />");

var reg=new RegExp("(:bof:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://hapshack.com/images/wBvkV.gif' />");

var reg=new RegExp("(:zik:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://hapshack.com/images/VYtJ5.gif' />");

var reg=new RegExp("(:osef:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://hapshack.com/images/7iXwy.gif' />");

var reg=new RegExp("(:play:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://hapshack.com/images/Llk85.gif' />");

var reg=new RegExp("(:poker:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://hapshack.com/images/No84V.gif' />");

var reg=new RegExp("(:tcho:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://hapshack.com/images/IQ5E.gif' />");

var reg=new RegExp("(:ha:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://hapshack.com/images/eqkQ6.gif' />");

var reg=new RegExp("(:csb:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/20600106793299_csbm.gif' />");

var reg=new RegExp("(:what:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://hapshack.com/images/7jKxh.gif' />");

var reg=new RegExp("(:pense:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://hapshack.com/images/1QCvc.gif' />");

var reg=new RegExp("(:euh:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://hapshack.com/images/5QRYD.gif' />");

var reg=new RegExp("(:wsh:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://hapshack.com/images/x6boQ.gif' />");

var reg=new RegExp("(:1:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/6855145686873_1.png' />");

var reg=new RegExp("(:3:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2012/20/1337539936-3.png' />");

var reg=new RegExp("(:aaa:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/8013729586896_aaa.png' />");

var reg=new RegExp("(:arf2:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/3753898742583_arf2.gif' />");

var reg=new RegExp("(:att:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/15174520776162_att.png' />");

var reg=new RegExp("(:autiste:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/5210359331958_autiste.gif' />");

var reg=new RegExp("(:battu:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/14201174480526_battu.png' />");

var reg=new RegExp("(:bave2:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/10579499944200_bave2.gif' />");

var reg=new RegExp("(:bave3:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/10310671049778_bave3.gif' />");

var reg=new RegExp("(:bavecoeur:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/18680949548217_bavecoeur.png' />");

var reg=new RegExp("(:bender:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/3289235333571_benderfume.gif' />");

var reg=new RegExp("(:btg:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/18749659526532_btg.png' />");

var reg=new RegExp("(:btg2:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/13065142955040_btg2.png' />");

var reg=new RegExp("(:bump:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/16428977547939_bump.gif' />");

var reg=new RegExp("(:bwa:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/13163524035948_bwa.gif' />");

var reg=new RegExp("(:pscopa:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/8819761345659_cafaitpeur.gif' />");

var reg=new RegExp("(:cafe:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/20768769615330_cafe.gif' />");

var reg=new RegExp("(:caleb:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/10456158109617_caleb.gif' />");

var reg=new RegExp("(:cbd:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/10761412511124_cbd.png' />");

var reg=new RegExp("(:chuck:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://sournoishack.com/uploads/852002552chuck.png' />");

var reg=new RegExp("(:cisla:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://sournoishack.com/uploads/2076486480Cisla.png' />");

var reg=new RegExp("(:citr:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/15078281531049_citrouille2.gif' />");

var reg=new RegExp("(:class:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/9106859652957_class.gif' />");

var reg=new RegExp("(:cisla2:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/15512199824880_cochonpanachay.png' />");

var reg=new RegExp("(:coeursnif:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/15473571848064_coeursnif.png' />");

var reg=new RegExp("(:com:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/13941996580908_com.png' />");

var reg=new RegExp("(:confiant:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/13443048310725_confiant.png' />");

var reg=new RegExp("(:content2:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/545959468593_content2.png' />");

var reg=new RegExp("(:cool2:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/2961477722610_cool2.png' />");

var reg=new RegExp("(:coolnah:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/6821194692312_coolnah.png' />");

var reg=new RegExp("(:coolp:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/14258578009599_coolp.png' />");

var reg=new RegExp("(:c+t:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/21076513117902_cpt.png' />");

var reg=new RegExp("(:demon:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/6550885985886_demon2.png' />");

var reg=new RegExp("(:deprime:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/6452213144157_deprime.gif' />");

var reg=new RegExp("(:derp:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/7797536178399_derp.png' />");

var reg=new RegExp("(:derp2:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/6377654880729_derp2.gif' />");

var reg=new RegExp("(:dovhapkiin:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/883360475118_dovhapkiin.png' />");

var reg=new RegExp("(:dzonche:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/6593154868575_dzonche.gif' />");

var reg=new RegExp("(:embnoel:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/13021929266841_embnoel.png' />");

var reg=new RegExp("(:enh:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/2158126735743_enh.png' />");

var reg=new RegExp("(:fish:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/11452295765889_fish.png' />");

var reg=new RegExp("(:flip:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/9222594768288_flip.gif' />");

var reg=new RegExp("(:fou2:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/16050434706009_fou2.png' />");

var reg=new RegExp("(:fou3:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/7810085973294_fou3.png' />");

var reg=new RegExp("(:fouh:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/6956417688660_fouhac.gif' />");

var reg=new RegExp("(:fp:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/10508258589048_fp.png' />");

var reg=new RegExp("(:fup:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2012/20/1337539898-Fup.png' />");

var reg=new RegExp("(:fuu:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/9453195835875_fuuj.png' />");

var reg=new RegExp("(:geek:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/8901690431931_geek.gif' />");

var reg=new RegExp("(:geevey:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/9356727553668_geevey.gif' />");

var reg=new RegExp("(:godotcafe:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/10480083976791_godotcafe.gif' />");

var reg=new RegExp("(:grotte:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/9325157640975_grotte3.gif' />");

var reg=new RegExp("(:grr:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/14691301022970_grr2.png' />");

var reg=new RegExp("(:grr2:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/9216096438186_grr3.png' />");

var reg=new RegExp("(:grr3:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/18600610622913_grr4.png' />");

var reg=new RegExp("(:haha:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/15677897193486_hah2.png' />");

var reg=new RegExp("(:hah2:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/9539135161083_hah3.png' />");

var reg=new RegExp("(:hahsors:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/18092358473211_hahsors.png' />");

var reg=new RegExp("(:hapdiad:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/6565288945446_hapdiable.png' />");

var reg=new RegExp("(:hapgg:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/12316978228995_hapbravo.gif' />");

var reg=new RegExp("(:hapdoute:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/2244548382714_hapdoute.png' />");

var reg=new RegExp("(:hapfete:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/8936487811845_hpm.gif' />");

var reg=new RegExp("(:hapk:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/122226436134_hapk.gif' />");

var reg=new RegExp("(:haplol:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/21446214954021_haplol.gif' />");

var reg=new RegExp("(:hapmouais:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/8675755287705_hapmouais.png' />");

var reg=new RegExp("(:hapoel:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2012/20/1337539021-hapoel.png' />");

var reg=new RegExp("(:hapoelok:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/4005745105428_hapoelok.png' />");

var reg=new RegExp("(:hapoelok2:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/16451202905181_hapoelok2.png ' />");

var reg=new RegExp("(:hapoeld:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/10404936262314_hapoeldiable.png' />");

var reg=new RegExp("(:hparty:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/18215263781451_hpm.gif' />");

var reg=new RegExp("(:hapoelia:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/13137003178299_hapoelia.gif' />");

var reg=new RegExp("(:hapoeliaok:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/18212791358718_hapoeliaok.png' />");

var reg=new RegExp("(:hapoeliaok2:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/1084050994059_hapoeliaok2.png' />");

var reg=new RegExp("(:hapoeliad:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/15573358128438_hapoeliadiable.png' />");

var reg=new RegExp("(:hapok:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://sournoishack.com/uploads/118764823hapok.gif' />");

var reg=new RegExp("(:hapok2:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/2401900345944_hapok2.gif' />");

var reg=new RegExp("(:haprof:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/9080231256063_haprof.gif' />");

var reg=new RegExp("(:hapup:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/16312237963065_hapup.png' />");

var reg=new RegExp("(:haya:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2012/21/1337618520-aya.png' />");

var reg=new RegExp("(:hehe:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/4231739453733_hehe.gif' />");

var reg=new RegExp("(:heuheu:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/4450332712221_heuheu.png' />");

var reg=new RegExp("(:hih:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/19358453831013_hih.gif' />");

var reg=new RegExp("(:hihi:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/6668582605047_hihi.gif' />");

var reg=new RegExp("(:hip:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/11466790516269_hip.gif' />");

var reg=new RegExp("(:hipcoeur:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/14468247670536_hipcoeur.png' />");

var reg=new RegExp("(:hmm:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/1126844534277_hmm.png' />");

var reg=new RegExp("(:hmm2:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/16553414083041_hmm2.png' />");

var reg=new RegExp("(:hmm3:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/12656370336390_hmm3.png' />");

var reg=new RegExp("(:huh:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/5647778355681_huh.gif' />");

var reg=new RegExp("(:humfier:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/4880161125081_humfier.png' />");

var reg=new RegExp("(:humh:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/13623882445503_humh.png' />");

var reg=new RegExp("(:hup:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2012/20/1337539898-Hup.png' />");

var reg=new RegExp("(:hurm:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/15121830775689_hurm.png' />");

var reg=new RegExp("(:hyppy:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/5550560908398_hyppy.png' />");

var reg=new RegExp("(:igor:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/17190420096069_igor.gif' />");

var reg=new RegExp("(:jap:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2012/20/1337539021-Jap.png' />");

var reg=new RegExp("(:japok:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/12197894258583_japok.gif' />");

var reg=new RegExp("(:kikoo:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/17192743333722_kikoo.gif' />");

var reg=new RegExp("(:ko:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/8889483382758_ko.png' />");

var reg=new RegExp("(:lamasm:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/2471224942791_lamasm.png' />");

var reg=new RegExp("(:lamasticot:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/8040365833005_lamasticot.png' />");

var reg=new RegExp("(:loose:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/8540935281054_loose.gif' />");

var reg=new RegExp("(:loose2:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/14143383790173_loose2.gif' />");

var reg=new RegExp("(:love:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/5242332334338_love.png' />");

var reg=new RegExp("(:mario:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/4369944091887_mario.png' />");

var reg=new RegExp("(:mix:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/1453641921270_mix.gif' />");

var reg=new RegExp("(:moine:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/14923731837564_moine12.gif' />");

var reg=new RegExp("(:mouais:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/10604543589585_mouais.png' />");

var reg=new RegExp("(:mouef:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/10834763365305_mouef.png' />");

var reg=new RegExp("(:musique:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/2446447670766_musique2.gif' />");

var reg=new RegExp("(:naif:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/8883099431217_naif.gif' />");

var reg=new RegExp("(:nn:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/16274818385397_nn.gif' />");

var reg=new RegExp("(:nerf:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/9066830706252_nerf.png' />");

var reg=new RegExp("(:nii:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/76532126022_nii.png' />");

var reg=new RegExp("(:nnh:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/10032901179543_nnh.png' />");

var reg=new RegExp("(:no:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/8152287259743_no.png' />");

var reg=new RegExp("(:noelbad:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/1360795686822_noelbad.gif' />");

var reg=new RegExp("(:noeld:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/20860738897482_noeldiable.png' />");

var reg=new RegExp("(:noelgg:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/1609536480255_noelgg.gif' />");

var reg=new RegExp("(:noelite)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/15563951409204_noelite.png' />");

var reg=new RegExp("(:noelok:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/9338963030298_noelok.gif' />");

var reg=new RegExp("(:noelok2:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/16160613687009_noelok2.gif' />");

var reg=new RegExp("(:noelparty:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/9252724734990_noelparty.gif' />");

var reg=new RegExp("(:noelup:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2012/20/1337539021-noelup.png' />");

var reg=new RegExp("(:noelv:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/16725403352394_noelv.gif' />");

var reg=new RegExp("(:nolife:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/7942729997565_nolife.png' />");

var reg=new RegExp("(:nop:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/19538909663625_nop.gif' />");

var reg=new RegExp("(:nyancat:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/21248336083887_nyancat.gif' />");

var reg=new RegExp("(:oh:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/10544000394510_oh.gif' />");

var reg=new RegExp("(:ok2:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/2060355143880_ok2.gif' />");

var reg=new RegExp("(:okay:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/3066665142816_okay.png' />");

var reg=new RegExp("(:omg:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/10302675559407_omg.gif' />");

var reg=new RegExp("(:oo:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/248172540264_oom.gif' />");

var reg=new RegExp("(:ouchcoeur:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/13459451950197_ouchcoeur.png' />");

var reg=new RegExp("(:ouchcontent:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/5018913598446_ouchcontent.png' />");

var reg=new RegExp("(:happarty:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/11426244191307_party.gif' />");

var reg=new RegExp("(:pedo:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/13765237698564_pedo.gif' />");

var reg=new RegExp("(:parapluie:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/584770667085_parapluie.gif' />");

var reg=new RegExp("(:pedo:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/9186609287196_pedo.gif' />");

var reg=new RegExp("(:pervers:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2012/20/1337539021-pervers.png' />");

var reg=new RegExp("(:peur2:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/2379555970605_peur.png' />");

var reg=new RegExp("(:pigeon:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/4790078104284_pigeon.png' />");

var reg=new RegExp("(:pkmn:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/18087388690239_pkmn.png' />");

var reg=new RegExp("(:pokerfete:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/11835772974333_pokfete.gif' />");

var reg=new RegExp("(:psy:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/7642824901074_psycho2.gif' />");

var reg=new RegExp("(:quoi:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/20953467833661_quoi.png' />");

var reg=new RegExp("(:rage:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://sournoishack.com/uploads/1816947916rage.gif' />");

var reg=new RegExp("(:rien:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/10744696732869_rien.png' />");

var reg=new RegExp("(:rip:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/8603883875565_rip.gif' />");

var reg=new RegExp("(:rire3:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/21400141071870_rire3.gif' />");

var reg=new RegExp("(:riresors:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2012/21/1337620646-rs.gif' />");

var reg=new RegExp("(:security:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/13708934569440_security.png' />");

var reg=new RegExp("(:shauni:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/5312723474520_shauni.gif' />");

var reg=new RegExp("(:sifflote:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/8904143986551_sifflote.gif' />");

var reg=new RegExp("(:slurp:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/2185217146431_slurp.png' />");

var reg=new RegExp("(:sm:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/16476279847236_sm.gif' />");

var reg=new RegExp("(:snif3:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/10919730647727_snif4.gif' />");

var reg=new RegExp("(:snif4:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/8660812982085_snif.png' />");

var reg=new RegExp("(:snif5:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/6223736054151_snif3.png' />");

var reg=new RegExp("(:snup:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2012/20/1337539898-snup.png' />");

var reg=new RegExp("(:sournoihap:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/20960470493325_sournoihap.png' />");

var reg=new RegExp("(:sournoiok:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/16684406202519_sournoiok.png' />");

var reg=new RegExp("(:sparta:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/17119329565833_sparta.gif' />");

var reg=new RegExp("(:tapotte:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/19540326911886_tapotte1.gif' />");

var reg=new RegExp("(:taupy:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/11431124383239_taupy.gif' />");

var reg=new RegExp("(:toh:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/12099065382459_toh.png' />");

var reg=new RegExp("(:trollw:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/8410119493941_trollw.png' />");

var reg=new RegExp("(:trueman:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/16642052878275_trueman.gif' />");

var reg=new RegExp("(:upf:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2012/20/1337539898-upf.png' />");

var reg=new RegExp("(:upr:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2012/20/1337539898-nup.png' />");

var reg=new RegExp("(:vac:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/18055043215110_vac.png' />");

var reg=new RegExp("(:vdf:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/18753248647584_visiteur.gif' />");

var reg=new RegExp("(:wesh:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/8816989912830_wesh.gif' />");

var reg=new RegExp("(:wi:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/11774923869852_wi.png' />");

var reg=new RegExp("(:wiok:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2012/21/1337618259-wiok.png' />");

var reg=new RegExp("(:win:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/16890963834690_win.gif' />");

var reg=new RegExp("(:win2:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/7852496421825_win2m.gif' />");

var reg=new RegExp("(:wtf:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/13742229139650_wtf.png' />");

var reg=new RegExp("(:wut:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/8620965777204_wut.gif' />");

var reg=new RegExp("(:xd:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/6032187210951_xd.gif' />");

var reg=new RegExp("(:xd2:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/3519751339665_xd2.gif' />");

var reg=new RegExp("(:xo:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/17047337145795_xo.gif' />");

var reg=new RegExp("(:yop:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2012/20/1337539898-Yop.png' />");

var reg=new RegExp("(:zombie:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/8197785219492_zombie.gif' />");

var reg=new RegExp("(:zombie2:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/816648526980_zombie2.gif' />");

var reg=new RegExp("(:zzz:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/9223810766676_zzz.png' />");

var reg=new RegExp("(:#@:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://s4.noelshack.com/uploads/images/9571099024377_grr4.gif' />");

document.body.innerHTML=chaine;