// ==UserScript==
// @name        maskQA
// @namespace   kuroao_cats
// @description maskQA (C)opyright kuroao_cats.
// @include     http://list.chiebukuro.yahoo.co.jp/*
// @include     http://chiebukuro.yahoo.co.jp/dir/*
// @include     http://detail.chiebukuro.yahoo.co.jp/qa/*
// @exclude     http://detail.chiebukuro.yahoo.co.jp/qa/answer.*
// @exclude     http://detail.chiebukuro.yahoo.co.jp/qa/ans_confirm.*
// @grant       none
// @version     1.0.0.82
// ==/UserScript==

//-- blockUsers
var blockUsers = [
   'lu_lu','1u','0l_09','kimo_lulu','sssaaqqw'
   ,'awxccmax','esuesuman','eeboxcar','youma','qmejw_311'
   ,'a1_b2_c3','ymax','andor_mll','aicjamiam','dark19'
   ,'pqalkmnjbvcx','snqqcsnv','a1_a2_a3','azexwwxv','cachoufugetu'
   ,'poppullllrin','ebisugarando','bichobicho_betobeto','teka_teka_niko_niko','majimeyume'
   ,'lyze108max','bxiivz','smmicvikkic','anmominohana','jujujulylue'
   ,'toppo333','yhkgbovx','ddmafjkkxvloiyrsglkjhd','rara0079','himitsunohimitsu110'
   ,'amission201','fijiten222','kbmbgbtbzzz','asakawa_manabu','candys_300'
   ,'zmm312ssqv','0l09','eroeroeru','kuroao_cats_311','princess_aya_l8'
   ,'aruaruaburami','kirin_azabuu','ufo_ufo_01_01','nameneco_net','alex_avex_afex'
   ,'kireinafuzinohana','ijimijimaa711','h_de_h_desu','goh_aida','a001vxx'
   ,'jingay687','mikisi9999','lonrlyfreeman309','ramumeko','huusuke'
   ,'kowakowa','aimiyume','fuufuusanggffdsa','aaggqqqqqqqqqxz','tomozokchiatama'
   ,'zzaadxzyasmsma','jkamll_aa','ffjk2ldk','meijizidai_a1_','fuyushougun_ol_'
   ,'ppgqkll22111','nagashimemeiii1211','zeebra_238','toden','ramrunram_02_'
   ,'kkdfaxvcz','shinichi0077121','conconcon00v','jkjkjcjcjdjd','spyspy'
   ,'aico_a27','shimonekama','neko05_abc','zyoushiki_kun','anatatasukiyo'
   ,'kutubera','sislasciviousness','mqmmjaxz','aabbchan','chuugasusey'
   ,'ddfydkss','jminnhmn','dqxvzmax','morinaga_a1_','ahfdswekx07'
   ,'nekamatsubusu','mmamisnnb','ddfjkx','kijimamata_oxv','svqqaww'
   ,'asppzvzxx','domkkkdan0812','uuuuufxuuuu','hentaidesugasoregananika','gaumdam007'
   ,'moko_muku_m1iz','kikkuback_0zxcv','nfkrskbcojptky','lilithpixyn0a','urifutasu_01_a1'
   ,'yo_y_yo_nets','precious_yuuko_11_','xnbmaxzppe0i','kuroao_cats_from_hell_','uuuuufxuuuu'
   ,'nekamahanter007x','lasavesdepresa','candys_310','smsmsmsukisuki','qqwwesaavx'
   ,'teke_teke_niko_niko','ffannvz001','teke_teke_niko_niko1','asditxvvx20x50','mqmmjaxz'
   ,'maetajxxxx','fuufuusanggffdsa','ramrunram_02_02','zenkoku_seiha_2oo5','nekamahanter007x'
   ,'lasavesdepresa','ssxffwsppll_oa1','mmmaqv84xa','jinjimkim112','eroeroaruwanaa'
   ,'hinata_meno2','jjkklmn1278','amegafuranumiyako','yumuyumu0800','bump_pppp_xxx'
   ,'aqwestside_zzz7','nekamaassassins','western1852','tetsizin28gou_0077','xa1g612ifihi'
   ,'kinkin270611','asppzvzxx227','aqqxwasbm','yuuri_susuki','qqqsvxmn211'
   ,'amission2011','mumimamemi441','qmejw_311_01','mnmejw_3ll33','mimimumumeme080'
   ,'amission2010','bbbxxxzzzyyy111222333','ginginganagn','lilith_guilty','assgfklqdv221'
   ,'ppidyindiyn','kinkinkimmm','nekamahunter007','cqxvghy664','joon_ho88x'
   ,'ayameikitenba','tomozokichiatame','cai_masaaki','rinkahanahina','masa_629_yu'
   ,'kusai_kirai_lulu','mavxx01_01','akkk541mmvad','huusuke0619','nekkkkammmmlulunnnn'
   ,'komagomamacakoma','lasacawa_ran','sokusanjyo','revive_zombie','tomozokichiatama'
   ,'cat71961','tomozou_sakura_99','f200updown2012','hiyocham_900','sislasciviousness11247'
   ,'tomozosukeatma','fmv22fa22xa','doemukibitskun','yamyanjam541','ffgvsmdogb'
   ,'zzzagdndjhh','jybf38n','ddmafjkkxvloiyrsglkjhd157','sssxxx_zmmm_9513','kaneta1919'
   ,'scvbmnnnan','llmncxjjwr','maiku_and_pu','a6h8b','raguna5819'
   ,'jjvmzzx','gururunken','speciai_thanks_jp999','bsgifu12','sinjihareikonomono'
   ,'kkavbsc','shiawase_tsukamu','kasccawamran_002','onugawara_gonzou','kaiisakurambo_11_26'
   ,'stopshot0211','lala_lala_lanlan','yuuiuuzzcv','manmandownqqup2011','byakrey'
   ,'netmet_mnet','makorin8102','candys_312','kumoyannkumo','zoetehoningpot'
   ,'tomozou_sakura_100','kimchi00002','mmiikljm','fan_ta_giii','ketukusai_haru73133'
   ,'wsetern1852','aiambeechan','phenix918power','trampled_underfoot_314','tawakemononoumasika'
   ,'urutora_keibitai2012','slneslnedan','kltlkltlrand','akaitanuki_zawawawa','mhgfkkkei'
   ,'short_hope2011','kiiroinanohana0405','lulukitizou','mekamano_lulu','ichihara_katsuya'
   ,'aamuramuramura007','natsuko_1997_11_26','feilx20100825148','asago_tuyu_izuresak','tomozo_kichlat'
   ,'clockworksuika','www_mam_www_0852251938','precious_yuuko_11_27','hass375','okikuchan005a'
   ,'blueberrycystine02','mmmvxmmm00x0','nekamadaiou_lulu_01_09','seiseisekiki','kinzo_takahashi'
   ,'komutai_tk','black_alligator_a1_a1','zzcvb1ll','nekamayoukohunter1','ketukusaizoharu'
   ,'nekamayoukohunter19','nekamayoukohunter18','a1_a2_a3_0007','hirotanukiip','aahsksjshdhdhd'
   ,'tairenyasu_x','kikmmmkik4','moon_princess_kaguya001'
   ,'zituni_kudaranai'
];
//--

blockUsers.push(
   "kuroao_cats_from_"
);

var whiteUsers = [
   "lulu_1_9",
   "lulu_01_09",
   "kuroao_cats_from_hell"

];

var blockUserCount = blockUsers.length;
var clearAll = false;
//var clearAll = true;

/******************************************/
var txtColor = "silver";
var txtSize = "50%";


function isBlockUser(uid) {

   if (isWhiteUser(uid)) { return false; }

   for (var i=blockUserCount;i>=0;i--) {
      if (-1 < uid.indexOf(blockUsers[i])) {
         return true;
      }
   }

   return false;
}

function isWhiteUser(uid) {
   for (var i=whiteUsers.length; i>=0;i--) {
     if (uid == whiteUsers[i]) {
        return true;
     }
   }
   return false;
}

function clearQ(item) {
   var parent = item.parentNode;
   parent.parentNode.removeChild(parent);
}

function maskQ(item) {
   q = item.childNodes[1]; 

   qtxt = q.childNodes[1];
   qtxt.style.fontSize=txtSize;
   qtxt.style.color=txtColor;              

}

function maskQOnAllTab(item) {
   q = item.childNodes[1]; 

   qtxt = q.childNodes[1];
   qtxt.style.fontSize=txtSize;
   qtxt.style.color=txtColor;              

}

function clearA(item) {
   var d=item.parentNode;
   d.parentNode.removeChild(d);
}

function maskA(item) {
   var ans=item.childNodes[3];
   ans.style.color=txtColor;
   ans.style.fontSize=txtSize;
   var p = item.parentNode.getElementsByClassName("upload-img");
   if (null != p && 0 < p.length) {
      var img = p[0].childNodes[0];
      img.width=15; img.height=15;
   }
}

function getLoginId() {
   try {
     return document.getElementsByClassName("msthdtxt")[0].childNodes[0].childNodes[1].innerHTML;
   } catch (e) {
     return "";
   }
}

function maskQuestion() {

  var loginId = getLoginId();

  var newName = document.getElementsByClassName("newName");
  if (0 < newName.length) {
    var uid = newName[0].innerHTML;
    if (uid != loginId) {
      if (isBlockUser(uid)) {
        var qa = document.getElementById("respondentQa");
        if (clearAll) { 
           qa.innerHTML = "";
        } else {
           qa.style.color=txtColor;
           qa.style.fontSize=txtSize;
        }
      }
    }
  }

  var maskFunc = null;
  if (clearAll) {
     maskFunc = clearQ;
  } else {
     maskFunc = maskQ;
  }

  var div = document.getElementById("open-tab");
  if (null == div) div = document.getElementById("vote-tab");
  if (null == div) div = document.getElementById("resolved-tab");
  if (null == div) { 
      div = document.getElementById("all-tab");
      if (!clearAll) maskFunc = maskQOnAllTab;
  }
  var liList = div.getElementsByTagName("li");
  for (var i=liList.length-1; i>=0; i--) {
    var ln = liList[i];
    var u = ln.getElementsByTagName("a");
    var uid = u[1].textContent;

    if (uid != loginId) {
      if (isBlockUser(uid)) {
         maskFunc(ln, txtColor);
      } 
    }
  }
}


function maskAnswer() {
  if (clearAll) {
     maskFunc = clearA;
  } else {
     maskFunc = maskA;
  }
  var loginId = getLoginId();
  var qaList = document.getElementsByClassName("qa");
  for (var i=qaList.length-1; i>0; i--) {
    var p = qaList[i].getElementsByClassName("user-name");
   
    if (null != p && 0 < p.length) {
      var em = null;
      if (p[0].childNodes.length < 3) { 
         em = p[0].childNodes[0];
      } else { 
         em = p[0].childNodes[1];
      }
      var uid = em.childNodes[0].innerHTML;
      if (uid != loginId) {
        if (isBlockUser(uid)) {
            maskFunc(qaList[i]);
        }
      }
    }
  }
}

function main() {
  url = window.location.href;
  if (-1 < url.indexOf("list.chiebukuro")) {maskQuestion();}
  if (-1 < url.indexOf("/dir/list")) {maskQuestion();}
  if (-1 < url.indexOf("detail.chiebukuro")) {maskAnswer();}
}

/******************************************/

main();

