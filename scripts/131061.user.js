// ==UserScript==
// @name           Coloration de pseudos
// @namespace      Coloration de pseudos
// @description	   Coloration de pseudos
// @include        http://www.jeuxvideo.com/forums/0-*
// @include        http://www.jeuxvideo.com/forums/1-*
// @include        http://www.jeuxvideo.com/forums/3-*
// ==/UserScript==

var chaine=document.body.innerHTML;

var reg=new RegExp("<strong>Orhelien</strong>", "g");
chaine=chaine.replace(reg,"<strong><span style='color:#04FE14'>Orhelien</span></strong>");

var reg2=new RegExp("<strong>gknk223</strong>", "g");
chaine=chaine.replace(reg2,"<strong><span style='color:#2243C4'>gknk223</span></strong>");

var reg3=new RegExp("<strong>D4RK-F3</strong>", "g");
chaine=chaine.replace(reg3,"<strong><span style='color:#FF6C00'>D4RK-F3</span></strong>");

var reg4=new RegExp("<strong>Flemmingite</strong>", "g");
chaine=chaine.replace(reg4,"<strong><span style='color:#007F61'>Flemmingite</span></strong>");

var reg5=new RegExp("<strong>Kalashnikov</strong>", "g");
chaine=chaine.replace(reg5,"<strong><span style='color:#1900FB'>Kalashnikov</span></strong>");

var reg6=new RegExp("<strong>[JV]Loterline</strong>", "g");
chaine=chaine.replace(reg6,"<span style='color:#4C1B1B'>[JV]Loterline</span>");

var reg7=new RegExp("<strong>Baggy_Le_Clown</strong>", "g");
chaine=chaine.replace(reg7,"<strong><span style='color:#01B0F0'>Baggy_Le_Clown</span></strong>");

var reg8=new RegExp("<strong>KlCK-ASS</strong>", "g");
chaine=chaine.replace(reg8,"<strong><span style='color:#F00018'>KlCK-ASS</span></strong>");

var reg9=new RegExp("<strong>Cf_</strong>", "g");
chaine=chaine.replace(reg9,"<strong><span style='color:#A44040'>Cf_</span></strong>");

var reg10=new RegExp("<strong>ChaosOmnipotent</strong>", "g");
chaine=chaine.replace(reg10,"<strong><span style='color:#4A40A4'>ChaosOmnipotent</span></strong>");

var reg11=new RegExp("<strong>_anusenfleur_</strong>", "g");
chaine=chaine.replace(reg11,"<strong><span style='color:#6540A4'>_anusenfleur_</span></strong>");

var reg12=new RegExp("<strong>Lelos</strong>", "g");
chaine=chaine.replace(reg12,"<strong><span style='color:#5F8CA3'>Lelos</span></strong>");

var reg14=new RegExp("<strong>remy35</strong>", "g");
chaine=chaine.replace(reg14,"<strong><span style='color:#990000'>remy35</span></strong>");

var reg15=new RegExp("<strong>Holding-2</strong>", "g");
chaine=chaine.replace(reg15,"<strong><span style='color:#36A9D3'>Holding-2</span></strong>");

var reg16=new RegExp("<strong>Matueur275</strong>", "g");
chaine=chaine.replace(reg16,"<strong><span style='color:#EDFE00'>Matueur275</span></strong>");

document.body.innerHTML=chaine;


