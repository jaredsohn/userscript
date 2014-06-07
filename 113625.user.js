// ==UserScript==
// @name           Kebabai
// @description    Bandymas nebepirmas, bet is pirmuju
// @include        http://www.olx.lt/posting.php
// @include        http://www.skelbimai.lt/skelbimo_ivedimas.php?nr=
// @include        http://www.skelbimas.lt/skelbimas/NewPaslaugos.php
// @include        http://www.skubiai.lt/mok/?view=post&cityid=1&lang=en&catid=10&subcatid=75
// @include        http://www.skelbimai.net/?view=post&cityid=2&catid=6&subcatid=93
// @include        http://www.123skelbimai.lt/naujas-skelbimas.html
// @include        http://www.weboaze.lt/lt/apie/
// @include        http://www.skelbikas.lt/naujas-skelbimas?nr=
// @include        http://skelbimas.lt/skelbimas/NewPaslaugos.php
// @include		   http://www.skelbimai.net/?view=post&cityid=2&catid=6&subcatid=93
// @include		   http://skelbimas.org/skelbimai/laisvalaikis/new-ad
// @include		   http://www.skelbiu.info/lt/skelbimai/*
// @include		   http://kauno.diena.lt/skelbimai/skelbimas/paprastas
// @include		   http://www.skelbimai.tv/?view=post&cityid=1&lang=en&catid=10&subcatid=75
// @include		   http://www.mirazas.lt/forms.php?a=new&category_id=1211
// @include		   http://skelbiuosi.lt/adsmanager/siteads/update/id/ENuONsJttm6zdgFyPFfWX19HrsykLymH
// @include		   http://dsp.lt/node/add/skelbimas?edit[taxonomy][2][hierarchical_select][selects][0]=545
// @include		   http://www.vskelbimai.lt/step2.php?cat=80
// @include		   http://www.nemokamiskelbimai.net/
// @include		   http://skelbimai.chebra.lt/item.php?catid=40
// @include		   http://balanda.lt/board/0-0-0-0-1
// @include		   http://www.zebra.lt/lt/suzinok/skelbimai?action=new
// @include		   http://skelbimai.infotakas.lt/naujas_sk.php
// @include		   http://www.lenta.lt/naujas-skelbimas.html
// @include		   http://www.tiesa.com/skelbimai/ads/add/29.html
// @include		   http://www.saujaskelbimu.lt/?page_id=6
// @include		   http://skelbiam.info/naujasskelbimas.php
// @include		   http://www.parduodu-perku.lt/component/option,com_adsmanager/page,write_ad/catid,526/Itemid,0/
// @include		   http://skelbimai.draugas.lt/CreateAd.aspx
// @include		   http://www.siulo.lt/naujas/11/1101
// @include		   http://www.skelbkime.lt/skelbimas/new.html
// @include		   http://www.gerasturgus.lt/skelbimo-redagavimas
// @include		   http://www.skelbk.info/item.php?catid=93
// @include		   http://www.maja.lt/skelbimai/naujas-skelbimas-109.html
// @include		   http://manoskelbimai.lt/naujasskelbimas.php
// @include		   http://skelbimai.balsas.lt/skelbimo_ivedimas.php?nr=
// @include		   http://www.skelbimu.lt/component/adsmanager/?page=write_ad&catid=33
// @include		   http://www.skelbiucia.lt/pramogos/kita/write_ad
// @include		   http://www.pasiskelbk.lt/index.php?where=new
// @include		   http://www.infotopas.lt/lt/vartotojams/naujas-skelbimas/returnCode:c7_10/
// @include		   http://www.jau.lt/naujas-skelbimas.html
// @include        http://www.alio.lt/iveskite_skelbima.html?id=3253


// @version        1.0
// @copyright      Tadas Ceponis
// @license        Tadas Ceponis licenzijuoja
// ==/UserScript== 


//================================= Pradiniai nustatymai ===============================

vard =   "KebabaiINamus"
pav =    "Greito maisto užkandinė. \'Kebabai į namus\' ";
nuo =    "www.kebabaiinamus.lt"; 
el =     "info@kebabaiinamus.lt"; 
tel =    "864 070707";
uab =    "UAB Sotus";
api =    "Greito maisto užkandinė - kebabinė" // 2-5 zodziai
apr =    " Greito maisto užkandinė jau ilgus metus džiugina klientus skaniais kebabais. Šiuo metu esame praplėte patiekalų menių. Taip pat Kaune tiekiame maistą, kebabus i namus. Mūsų užkandinėse rasite draugišką, paslaugų kolektyvą, kuris aptarnaus kokybiškai ir greitai "; // Aprasymas 40 < simboliu.
			
met =    "Kauno \'Kebabai į namus\' siūlo skanius kebabus, koldūnus, mini čeburekus, salotas. Taip pat siūlome užsisakyti kebabą į namus.";

rak =    "Kebabinė, Kaunas, Kebabai į namus, Greito maisto užkandinė, Didelės porcijos kebabų, Koldunai, maistas į namus, kebabas, Kebabinė Kaune, Turkiškas kebabas, Dainava, Šančiai, Domeikava"

mie = "Kaunas";
kat = 191;

//##################################################################################
function init (){
if (location.href == "http://www.olx.lt/posting.php"){Olx();}
if (location.href == "http://www.skelbimai.lt/skelbimo_ivedimas.php?nr="){Skelbimai();}
if (location.href == "http://www.skubiai.lt/mok/?view=post&cityid=1&lang=en&catid=10&subcatid=75"){Skubiai();}
if (location.href == "http://www.skelbimai.net/?view=post&cityid=2&catid=6&subcatid=93"){SkelbimaiNet();}
if (location.href == "http://www.123skelbimai.lt/naujas-skelbimas.html"){VienasDuTrysSkelbimai();}

if (location.href == "http://www.weboaze.lt/lt/apie/"){Weboaze();}
if (location.href == "http://www.skelbikas.lt/naujas-skelbimas?nr="){Skelbikas();}
if (location.href == "http://skelbimas.lt/skelbimas/NewPaslaugos.php"){Skelbimas();}
if (location.href == "http://www.alio.lt/iveskite_skelbima.html?id=3253"){Alio();}
if (location.href == "http://www.skelbimai.net/?view=post&cityid=2&catid=6&subcatid=93"){Skelbimai();}

if (location.href == "http://skelbimas.org/skelbimai/laisvalaikis/new-ad"){SkelbimasOrg();}
if (location.href == "http://kauno.diena.lt/skelbimai/skelbimas/paprastas"){KaunoDiena();}
if (location.href == "http://www.skelbimai.tv/?view=post&cityid=1&lang=en&catid=10&subcatid=75"){SkelbimasTV();}
if (location.href == "http://www.mirazas.lt/forms.php?a=new&category_id=1211"){MirazasLT();}
if (location.href == "http://skelbiuosi.lt/adsmanager/siteads/update/id/ENuONsJttm6zdgFyPFfWX19HrsykLymH"){SkelbiuosiLT();}

if (location.href == "http://dsp.lt/node/add/skelbimas?edit[taxonomy][2][hierarchical_select][selects][0]=545"){DSPLT();}
if (location.href == "http://www.vskelbimai.lt/step2.php?cat=80"){VSkelbimai();}
if (location.href == "http://www.nemokamiskelbimai.net/"){NemokamiSkelbimai();}
if (location.href == "http://skelbimai.chebra.lt/item.php?catid=40"){SkelbimaiChebra();}
if (location.href == "http://balanda.lt/board/0-0-0-0-1"){Balanda();}

if (location.href == "http://www.zebra.lt/lt/suzinok/skelbimai?action=new"){Zebra();}
if (location.href == "http://skelbimai.infotakas.lt/naujas_sk.php"){SkelbimaiInfotakas();}
if (location.href == "http://www.lenta.lt/naujas-skelbimas.html"){Lenta();}
if (location.href == "http://www.tiesa.com/skelbimai/ads/add/29.html"){TiesaCom();}
if (location.href == "http://www.saujaskelbimu.lt/?page_id=6"){SaujaSkelbimu();}

if (location.href == "http://skelbiam.info/naujasskelbimas.php"){skelbiamInfo();}
if (location.href == "http://www.parduodu-perku.lt/component/option,com_adsmanager/page,write_ad/catid,526/Itemid,0/"){Parduodu();}
if (location.href == "http://skelbimai.draugas.lt/CreateAd.aspx"){SkelbimaiDraugas();}
if (location.href == "http://www.siulo.lt/naujas/11/1101"){Siulo();}
if (location.href == "http://www.skelbkime.lt/skelbimas/new.html"){Skelbkime();}

if (location.href == "http://www.gerasturgus.lt/skelbimo-redagavimas"){GerasTurgus();}
if (location.href == "http://www.skelbk.info/item.php?catid=93"){SkelbkInfo();}
if (location.href == "http://www.maja.lt/skelbimai/naujas-skelbimas-109.html"){Maja();}
if (location.href == "http://manoskelbimai.lt/naujasskelbimas.php"){ManoSkelbimai();}
if (location.href == "http://skelbimai.balsas.lt/skelbimo_ivedimas.php?nr="){SkelbimaiBalsas();}

if (location.href == "http://www.skelbimu.lt/component/adsmanager/?page=write_ad&catid=33"){Skelbimu();}
if (location.href == "http://www.skelbiucia.lt/pramogos/kita/write_ad"){SkelbiuCia();}
if (location.href == "http://www.pasiskelbk.lt/index.php?where=new"){Pasiskelbk();}
if (location.href == "http://www.infotopas.lt/lt/vartotojams/naujas-skelbimas/returnCode:c7_10/"){Infotopas();}
if (location.href == "http://www.jau.lt/naujas-skelbimas.html"){Jau();}
}

//################################ Funkcijos pradzios ##############################
if (window.addEventListener) {
    window.addEventListener('load', init, false);
} else {
    document.attachEvent('onload', init);
}

//################################# Funkcijos Skelbimu ###################################
//================================= Skelbimu.lt ===================================
function Skelbimu(){
var f = document.forms.namedItem("saveForm");
f.elements.namedItem("ad_headline").value=pav;
f.elements.namedItem("ad_text").value=apr;
f.elements.namedItem("ad_price").value=0;
f.elements.namedItem("name").value=vard;
f.elements.namedItem("email").value=el;
f.elements.namedItem("ad_svetaine").value=nuo;
f.elements.namedItem("ad_phone").value=tel;
}
//================================= SkelbiuCia.lt ===================================
function SkelbiuCia(){
document.getElementById('name').value=vard;
document.getElementById('ad_tinklapis').value=nuo;
document.getElementById('email').value=el;
document.getElementById('ad_phone').value=tel;
document.getElementById('ad_headline').value=pav;
document.getElementById('ad_text').value=apr;
document.getElementById('ad_price').value=0;
}
//================================= Pasiskelbk.lt ===================================
function Pasiskelbk(){
var f = document.forms.namedItem("new_advert");
f.elements.namedItem("advert").value=apr;
f.elements.namedItem("vardas").value=vard;
f.elements.namedItem("tel").value=tel;
f.elements.namedItem("email").value=el
}
//================================= Infotopas.lt ===================================
function Infotopas(){
document.getElementById('aprasymas').value=apr;
document.getElementById('kontaktinis_asmuo').value=vard;
document.getElementById('telefonas').value=tel;
document.getElementById('el_pastas').value=el;
document.getElementById('tinklalapis').value=nuo;
}
//================================= Jau.lt ===================================
function Jau(){
var f = document.forms.namedItem("naujas");
f.elements.namedItem("topic").value=pav;
f.elements.namedItem("name").value=vard;
f.elements.namedItem("phone").value=tel;
f.elements.namedItem("email").value=el;
f.elements.namedItem("www").value=nuo;
}
//================================= GerasTurgus.lt ===================================
function GerasTurgus(){
document.getElementById('heading').value=pav;
document.getElementById('text').value=apr;
document.getElementById('price').value=0;
document.getElementById('email').value=el;
document.getElementById('contact_name').value=vard;
document.getElementById('phone').value=tel;
document.getElementById('www').value=nuo;
}
//================================= Skelbk.Info ===================================
function SkelbkInfo(){
var f = document.forms.namedItem("itemForm");
f.elements.namedItem("ad_title").value=pav;
f.elements.namedItem("ad_description").value=apr;
f.elements.namedItem("e_3").value=0;
f.elements.namedItem("e_14").value=tel;
f.elements.namedItem("e_17").value=nuo;
}
//================================= Maja.lt ===================================
function Maja(){
var f = document.forms.namedItem("saveForm");
f.elements.namedItem("name").value=vard;
f.elements.namedItem("email").value=el;
f.elements.namedItem("ad_phone").value=tel;
f.elements.namedItem("ad_zip").value=nuo;
f.elements.namedItem("ad_headline").value=pav;
f.elements.namedItem("ad_text").value=apr;
f.elements.namedItem("ad_price").value=0;
}
//================================= ManoSkelbimai.lt ===================================
function ManoSkelbimai(){
var f = document.forms.namedItem("inputform");
f.elements.namedItem("f_title").value=pav;
f.elements.namedItem("f_text").value=apr;
f.elements.namedItem("f_kaina").value=0;
f.elements.namedItem("f_name").value=vard;
f.elements.namedItem("f_email").value=el;
f.elements.namedItem("f_tel").value=tel;
f.elements.namedItem("f_website").value=nuo;
}
//================================= Skelbimai.Balsas.lt ===================================
function SkelbimaiBalsas(){
var f = document.forms.namedItem("skelbimo_forma");
f.elements.namedItem("pav").value=pav;
f.elements.namedItem("tekstas").value=apr;
f.elements.namedItem("kaina").value=0;
f.elements.namedItem("vardas").value=vard;
f.elements.namedItem("telefonas").value=tel;
f.elements.namedItem("email").value=el;
}
//================================= skelbiam.Info ===================================
function skelbiamInfo(){
var f = document.forms.namedItem("inputform");
f.elements.namedItem("f_title").value=pav;
f.elements.namedItem("f_text").value=apr;
f.elements.namedItem("f_kaina").value=0;
f.elements.namedItem("f_name").value=vard;
f.elements.namedItem("f_email").value=el;
f.elements.namedItem("f_tel").value=tel;
f.elements.namedItem("f_website").value=nuo
}
//================================= Parduodu-perku.lt ===================================
function Parduodu(){
var f = document.forms.namedItem("saveForm");
f.elements.namedItem("name").value=vard;
f.elements.namedItem("email").value=el;
f.elements.namedItem("ad_zip").value=nuo;
f.elements.namedItem("ad_phone").value=tel;
f.elements.namedItem("ad_headline").value=pav;
f.elements.namedItem("ad_text").value=apr;
}
//================================= Skelbimai.Draugas.lt ===================================
function SkelbimaiDraugas(){
var f = document.forms.namedItem("aspnetForm");
f.elements.namedItem("ctl00$uxMainContentPlaceHolder$ctl05$uxTextBox").value=pav;
f.elements.namedItem("ctl00$uxMainContentPlaceHolder$uxDescriptionTextBox").value=apr;
f.elements.namedItem("ctl00$uxMainContentPlaceHolder$uxPhoneTextBox").value=tel;
f.elements.namedItem("ctl00$uxMainContentPlaceHolder$uxEmailTextBox").value=el;
f.elements.namedItem("ctl00$uxMainContentPlaceHolder$uxUrlTextBox").value=nuo;
}
//================================= Siulo.lt ===================================
function Siulo(){
var f = document.forms.namedItem("naujas-skelbimas");
f.elements.namedItem("pavadinimas").value=pav;
f.elements.namedItem("aprasymas").value=apr;
f.elements.namedItem("kaina").value=0;
f.elements.namedItem("vardas").value=vard;
f.elements.namedItem("el_pastas").value=el;
f.elements.namedItem("telefonas").value=tel;
}
//================================= Skelbkime.lt ===================================
function Skelbkime(){
var f = document.forms.namedItem("frm");
f.elements.namedItem("form_subject").value=pav;
f.elements.namedItem("form_msg").value=apr;
f.elements.namedItem("tags").value=api;
f.elements.namedItem("form_name").value=vard;
f.elements.namedItem("form_phone").value=tel;
f.elements.namedItem("form_email").value=el;
f.elements.namedItem("form_url").value=nuo;
}
//================================= Zebra.lt ===================================
function Zebra(){
var f = document.forms.namedItem("duomenys");
f.elements.namedItem("antraste").value=pav;
f.elements.namedItem("tekstas").value=apr;
f.elements.namedItem("vardas").value=vard;
f.elements.namedItem("tel").value=tel;
f.elements.namedItem("email").value=el;
}
//================================= Skelbimai.Infotakas.lt ===================================
function SkelbimaiInfotakas(){
var f = document.forms.namedItem("myForm");
f.elements.namedItem("description1").value=apr;
f.elements.namedItem("vardas").value=vard;
f.elements.namedItem("phone").value=tel;
f.elements.namedItem("mail").value=el;
f.elements.namedItem("skewww").value=nuo;
}
//================================= Lenta.lt ===================================
function Lenta(){
var f = document.forms.namedItem("nskelb");
f.elements.namedItem("title").value=pav;
f.elements.namedItem("message").value=apr;
f.elements.namedItem("phone").value=tel;
f.elements.namedItem("name").value=vard;
f.elements.namedItem("email").value=el;
}
//================================= Tiesa.com ===================================
function TiesaCom(){
var f = document.forms.namedItem("f");
f.elements.namedItem("title").value=pav;
f.elements.namedItem("text").value=apr;
f.elements.namedItem("namesurname").value=vard;
f.elements.namedItem("city").value=mie;
}
//================================= SaujaSkelbimu.lt ===================================
function SaujaSkelbimu(){
var f = document.forms.namedItem("adpostform");
f.elements.namedItem("adtitle").value=pav;
f.elements.namedItem("adcontact_name").value=vard;
f.elements.namedItem("adcontact_email").value=el;
f.elements.namedItem("adcontact_phone").value=tel;
f.elements.namedItem("ad_item_price").value=0;
f.elements.namedItem("addetails").value=apr;
}
//================================= DSP.lt ===================================
function DSPLT(){
document.getElementById('edit-title').value=pav;
document.getElementById('edit-body').value=apr;
document.getElementById('edit-field-anonym-vardas-0-value').value=vard;
document.getElementById('edit-field-anonym-email-0-email').value=el;
document.getElementById('edit-field-anonym-tel-0-value').value=tel;
document.getElementById('edit-field-anonym-www-0-url').value=nuo;
}
//================================= VSkelbimai.lt ===================================
function VSkelbimai(){
document.getElementById('title').value=pav;
document.getElementById('descriptionn').value=apr;
document.getElementById('price').value=0;
document.getElementById('email').value=el;
document.getElementById('phoneid').value=tel;

var f = document.forms.namedItem("step2");
f.elements.namedItem("name").value=vard;
f.elements.namedItem("url").value=nuo;
}
//=========================== NemokamiSkelbimai.lt ===================================
function NemokamiSkelbimai(){
document.getElementById('title').value=pav;
document.getElementById('description').value=apr;
document.getElementById('price').value=0;
document.getElementById('name_owner').value=vard;
document.getElementById('phone').value=tel;
document.getElementById('email').value=el;
document.getElementById('post_tags').value=api;
document.getElementById('location').value=mie;
document.getElementById('cp_adURL').value=nuo;
}
//================================= Skelbimai.Chebra.lt ===================================
function SkelbimaiChebra(){
var f = document.forms.namedItem("itemForm");
f.elements.namedItem("ad_title").value=pav;
f.elements.namedItem("ad_description").value=apr;
}
//================================= Balanda.lt ===================================
function Balanda(){
document.getElementById('bdF1').value=pav;
document.getElementById('message').value=apr;
document.getElementById('bdF14').value=0;
document.getElementById('bdF6').value=vard;
document.getElementById('bdF9').value=tel;
document.getElementById('bdF7').value=el;
document.getElementById('bdF8').value=nuo;
document.getElementById('suggEdit').value=api;
}
//================================= Kauno.diena.lt ==================================
function KaunoDiena(){
var x = document.getElementsByTagName('form')[1];
x.elements.namedItem("title").value=pav;
x.elements.namedItem("classified").value=apr;
x.elements.namedItem("price").value=0;
x.elements.namedItem("phone").value=tel;
x.elements.namedItem("www").value=nuo;
}
//================================= Skelbimas.TV ====================================
function SkelbimasTV(){
var f = document.forms.namedItem("frmPost");
f.elements.namedItem("adtitle").value=pav;
f.elements.namedItem("addesc").value=apr;
f.elements.namedItem("price").value=0;
f.elements.namedItem("vardas").value=vard;
f.elements.namedItem("telefonas").value=tel;
f.elements.namedItem("email").value=el;
f.elements.namedItem("nuoroda").value=nuo;
f.elements.namedItem("adtags").value=api;
}
//================================= Skelbimas.org ===================================
function SkelbimasOrg(){
document.getElementById('ad_headline').value=pav;
document.getElementById('ad_text').value=apr;
document.getElementById('ad_price').value=0;
document.getElementById('name').value=vard;
document.getElementById('ad_phone').value=tel;
document.getElementById('email').value=el;
document.getElementById('ad_city').value=mie;
document.getElementById('ad_adresas').value=mie;
document.getElementById('ad_svetain').value=nuo;
}
//================================= 123Skelbimai.lt ==================================
function VienasDuTrysSkelbimai(){
var f = document.forms.namedItem("editform");
f.elements.namedItem("value_Title").value=pav;
f.elements.namedItem("value_Details").value=apr;
f.elements.namedItem("value_Vardas").value=vard;
f.elements.namedItem("value_Telefonas").value=tel;
f.elements.namedItem("value_pastas").value=el;
}
//================================= Mirazas.lt ==================================
function MirazasLT(){ 
document.getElementById('pavadinimas').value=pav;
document.getElementById('aprasymas').value=apr;
document.getElementById('adr_gatve').value=mie;
document.getElementById('adr_namas').value=mie;
}
//================================= Skelbiuosi.lt ==================================
function SkelbiuosiLT(){
var f = document.getElementById('ads-form')
f.elements.namedItem("Ads[title]").value=pav;
f.elements.namedItem("Ads[description]").value=apr;
f.elements.namedItem("Ads[price]").value=0;
f.elements.namedItem("Ads[email]").value=el;
f.elements.namedItem("Ads[phone]").value=tel;
f.elements.namedItem("Ads[seller_name]").value=vard;
f.elements.namedItem("Ads[website]").value=nuo;
f.elements.namedItem("Ads[address]").value=mie;
}
//================================= Alio.lt ==================================
function Alio(){
var f = document.forms.namedItem("inputForm");
f.elements.namedItem("data[text][skelbimo_antraste_pavadinimas]").value=pav;
f.elements.namedItem("data[text][asmenu_skaicius_1]").value="Neribota";
f.elements.namedItem("data[text][aprasymas]").value=apr;
f.elements.namedItem("data[text][mobilus_telefonas]").value=tel;
f.elements.namedItem("data[text][pavadinimas_jei_imone]").value=uab;
f.elements.namedItem("data[text][kontaktinis_asmuo]").value=vard;
f.elements.namedItem("data[text][interneto_svetaine]").value=nuo;
f.elements.namedItem("mail[email]").value=el;
}


//================================= Skelbimas.lt ==================================
function Skelbimas(){
var f = document.forms.namedItem("form0");
f.elements.namedItem("Pavadinimas").value=pav;
f.elements.namedItem("Tekstas").value=apr;
f.elements.namedItem("Kaina").value=0;
f.elements.namedItem("Vardas").value=vard;
f.elements.namedItem("Miestas").value=mie;
f.elements.namedItem("Telefonas").value=tel;
f.elements.namedItem("Email").value=el;
}


//================================= Skelbikas.lt ==================================
function Skelbikas(){
var f = document.forms.namedItem("forma");
f.elements.namedItem("pav").value=pav;
f.elements.namedItem("tekstas").value=apr;
f.elements.namedItem("kaina").value=0;
f.elements.namedItem("vardas").value=vard;
f.elements.namedItem("telefonas").value=tel;
f.elements.namedItem("elpastas").value=el;
}

//================================= Skelbimai.net ==================================
function SkelbimaiNet(){
var f = document.forms.namedItem("frmPost");
f.elements.namedItem("adtitle").value=pav;
f.elements.namedItem("addesc").value=apr;
f.elements.namedItem("price").value=0;
f.elements.namedItem("x[1]").value=tel;
f.elements.namedItem("email").value=el;
}

//================================= Skelbimai.lt ==================================
function Skelbimai(){
var f = document.forms.namedItem("skelbimo_forma");
f.elements.namedItem("veiksmas").value="s";
f.elements.namedItem("pav").value=pav;
f.elements.namedItem("tekstas").value=apr;
f.elements.namedItem("kaina").value=0;
f.elements.namedItem("vardas").value=nuo;
f.elements.namedItem("telefonas").value=tel;
f.elements.namedItem("email").value=el;
}

//================================= OLX.lt ==================================
function Olx(){
document.getElementById('autocomplete').value=mie;

var f = document.forms.namedItem("posting-form-1");
f.elements.namedItem("title").value=pav;
f.elements.namedItem("email").value=el;

var fdu = document.forms.namedItem("posting-form-2");
fdu.elements.namedItem("phone").value=tel;
}

//================================= Skelbimai.lt ==================================
function Skelbimai(){
var f = document.forms.namedItem("skelbimo_forma");
f.elements.namedItem("veiksmas").value="s";
f.elements.namedItem("pav").value=pav;
f.elements.namedItem("tekstas").value=apr;
f.elements.namedItem("kaina").value=0;
f.elements.namedItem("vardas").value=nuo;
f.elements.namedItem("telefonas").value=tel;
f.elements.namedItem("email").value=el;
}

//================================= Skubiai.lt ==================================
function Skubiai(){
var f = document.forms.namedItem("frmPost");
f.elements.namedItem("adtitle").value=pav;
f.elements.namedItem("addesc").value=apr;
f.elements.namedItem("kaina").value=0;
f.elements.namedItem("vardas").value=nuo;
f.elements.namedItem("telefonas").value=tel;
f.elements.namedItem("email").value=el;
f.elements.namedItem("arealist").value="Kaunas";
f.elements.namedItem("nuoroda").value=nuo;
}

//################################# Funkcijos Nuorodu Katalogu ###################################

//================================= Penki.lt ==================================
function Penki(){
var x = document.getElementsByTagName('form')[5];
x.elements.namedItem("url").value=nuo;
x.elements.namedItem("name").value=pav;
x.elements.namedItem("desc").value=apr;
x.elements.namedItem("key").value=rak;
x.elements.namedItem("uname").value=vard;
x.elements.namedItem("email").value=el;
}


//================================= Dainutekstai.lt ==================================
function Dainutekstai(){
var x = document.getElementsByTagName('form')[0];
x.elements.namedItem("adresas").value=nuo;
x.elements.namedItem("aprasymas").value=apr;
}


//=============================== Toplaisvalaikis.lt ============================
function Toplaisvalaikis(){
var x = document.getElementsByTagName('form')[0];
x.elements.namedItem("link_title").value=pav;
x.elements.namedItem("link_link").value=nuo;
x.elements.namedItem("link_author").value=vard;
x.elements.namedItem("link_keys").value=mie;
x.elements.namedItem("link_name").value=vard;
x.elements.namedItem("link_mail").value=el;
}

//================================== Ooo.lt ========================================
function Ooo(){
document.getElementById('search-q').value=nuo;
}

//================================== Direktorija.lt ================================
function Direktorija(){

var x = document.getElementsByTagName('form')[1];
x.elements.namedItem("url").value=nuo;
x.elements.namedItem("email").value=el;
x.elements.namedItem("title").value=pav;
x.elements.namedItem("description").value=apr;
x.elements.namedItem("keywords").value=rak;
}

//================================== Addlink.lt ================================
function Addlink(){
// irasyti viska ranka. AJAX padarytas saitas
}


//================================== Pridek.lt ================================
function Pridek(){
document.getElementById('author').value=pav;
document.getElementById('email').value=el;
document.getElementById('url').value=nuo;
document.getElementById('comment').value=apr;
}

//================================== Systemos.lt ================================
function Systemos(){
var x = document.getElementsByTagName('form')[0];
x.elements.namedItem("url").value=nuo;
x.elements.namedItem("title").value=pav;
x.elements.namedItem("description").value=apr;
x.elements.namedItem("fio").value=vard; 
x.elements.namedItem("email").value=el; 
}

//================================== Zinomas.lt ================================
function Zinomas(){
var x = document.getElementsByTagName('form')[1];
x.elements.namedItem("TITLE").value=pav;
x.elements.namedItem("URL").value=nuo;
x.elements.namedItem("DESCRIPTION").value=apr;
x.elements.namedItem("OWNER_NAME").value=vard; 
x.elements.namedItem("OWNER_EMAIL").value=el; 
}


//================================== 500.lt ================================
function Penkisimtai(){
var x = document.getElementsByTagName('form')[0];
x.elements.namedItem("TITLE").value=pav;
x.elements.namedItem("URL").value=nuo;
x.elements.namedItem("DESCRIPTION").value=apr;
x.elements.namedItem("META_DESCRIPTION").value=met; 
x.elements.namedItem("META_KEYWORDS").value=rak; 
}


//================================== On.lt ================================
function On(){
document.getElementById('author').value=pav;
document.getElementById('klausimas2').value=api;
document.getElementById('klausimas3').value=nuo;
document.getElementById('klausimas9').value=apr;
document.getElementById('vardas').value=vard;

var x = document.getElementsByTagName('form')[0];
x.elements.namedItem("klausimas7").value=el;
x.elements.namedItem("email").value=el;
}


//================================== Weboaze.lt ================================
function Weboaze(){
var n = document.forms.namedItem("nl_form");
n.elements.namedItem("link_title").value=pav;
n.elements.namedItem("link_web").value=nuo;
n.elements.namedItem("link_keys").value=rak;
n.elements.namedItem("link_link").value=nuo;
n.elements.namedItem("link_author").value=vard;
n.elements.namedItem("link_mail").value=el;
n.elements.namedItem("link_name").value=vard;
}


//================================== Surask.lt ================================
function Surask(){
var x = document.getElementsByTagName('form')[0];
x.elements.namedItem("title").value=pav;
x.elements.namedItem("url").value=nuo;
x.elements.namedItem("description").value=apr;
x.elements.namedItem("name").value=vard;
x.elements.namedItem("email").value=el;
x.elements.namedItem("keywords").value=rak; 
}


//================================== Dmoz.Lt ================================
function Dmoz(){
document.getElementById('title').value=pav;
document.getElementById('url').value=nuo;
document.getElementById('description').value=met;
document.getElementById('email').value=el;
}


//================================= Seolinks.Lt ==============================
function Seolinks(){
var x = document.getElementsByTagName('form')[2];
x.elements.namedItem("TITLE").value=pav;
x.elements.namedItem("URL").value=nuo;
x.elements.namedItem("DESCRIPTION").value=apr;
x.elements.namedItem("OWNER_NAME").value=vard;
x.elements.namedItem("OWNER_EMAIL").value=el;
x.elements.namedItem("META_DESCRIPTION").value=met; 
x.elements.namedItem("META_KEYWORDS").value=rak; 
}

//================================= Nkv.Lt ==============================
function Nkv(){
document.getElementById('addtitle').value=pav;
document.getElementById('addlink').value=nuo;
document.getElementById('addtext').value=apr;
}

//================================= Nuorodos.Lt ==============================
function NuorodosLt(){
var x = document.getElementsByTagName('form')[1];
x.elements.namedItem("TITLE").value=pav;
x.elements.namedItem("URL").value=nuo;
x.elements.namedItem("DESCRIPTION").value=apr;
x.elements.namedItem("OWNER_NAME").value=vard;
x.elements.namedItem("OWNER_EMAIL").value=el;
}

//================================= Lt.Katalogas.lt ==============================
function LtKatalogas(){
var x = document.getElementsByTagName('form')[0];
x.elements.namedItem("title").value=pav;
x.elements.namedItem("address").value=nuo;
x.elements.namedItem("text").value=apr;
}

//================================= Naudinga.lt ==================================
function Naudinga(){
document.getElementById('edit-title').value=pav;
document.getElementById('edit-url').value=nuo;
document.getElementById('edit-body').value=apr;
}


//================================= Webdir24.lt ==================================
function Webdir24(){
var x = document.getElementsByTagName('form')[1];
x.elements.namedItem("TITLE").value=pav;
x.elements.namedItem("URL").value=nuo;
x.elements.namedItem("DESCRIPTION").value=apr;
x.elements.namedItem("OWNER_NAME").value=vard;
x.elements.namedItem("OWNER_EMAIL").value=el;
}


//================================= E-nuorodos.lt ==================================
function ENuorodos(){
document.getElementById('ModLinkName').value=pav;
document.getElementById('ModLinkUrl').value=nuo;
document.getElementById('ModLinkDescription').value=apr;
document.getElementById('ModLinkAuthor').value=vard;
document.getElementById('ModLinkKeywords').value=rak;
}


//================================= Nuoroducentras.lt ==============================
function Nuoroducentras(){
var N = document.getElementsByTagName('form')[1];
N.elements.namedItem("TITLE").value=pav;
N.elements.namedItem("URL").value=nuo;
N.elements.namedItem("DESCRIPTION").value=apr;
}

//================================= NKatalogas.info ==============================
function NKatalogas(){

document.getElementById('title').value=pav;
document.getElementById('url').value=nuo;
document.getElementById('email').value=el;

var f = document.forms.namedItem("suggest_link");
f.elements.namedItem("id_category").value=kat;
f.elements.namedItem("description").value=apr;
}

//================================ Nerandu.lt ====================================
function Nerandu(){
var n = document.forms.namedItem("forma");
n.elements.namedItem("title").value=      pav;
n.elements.namedItem("description").value=apr;
n.elements.namedItem("keywords").value=   rak;
n.elements.namedItem("url").value=        nuo;
n.elements.namedItem("name").value=       vard;
n.elements.namedItem("email").value=      el;
}

//================================ Links4u.lt ====================================
function Links4u(){
var x = document.getElementsByTagName('form')[1];

x.elements.namedItem("TITLE").value=pav;
x.elements.namedItem("URL").value=nuo;
x.elements.namedItem("DESCRIPTION").value=apr;
x.elements.namedItem("OWNER_NAME").value=vard;
x.elements.namedItem("OWNER_EMAIL").value=el;
}
