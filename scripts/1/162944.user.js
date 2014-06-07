// ==UserScript==
// @name        avkiTV
// @namespace   local
// @include     *fotka.pl/kamerka*
// @include     *fotka.pl/kamerki*
// @exclude     http://*fotka.pl/js/*
// @version     1
// ==/UserScript==

if(document.getElementById("content") == null) return;

var headID = document.getElementsByTagName('head')[0];
var style = document.createElement('style');   
    style.type = 'text/css';
style.innerHTML = '<!--' +
'/* fp */ div#userlist_user_12720120, div#userlist_user_1818913, div#userlist_user_10811983, div#userlist_user_5336730, div#userlist_user_6788159, div#userlist_user_15856568, div#userlist_user_15659397, div#userlist_user_11945245, div#userlist_user_3249933, div#userlist_user_3854104, div#userlist_user_7469811, div#userlist_user_12968283, div#userlist_user_636159, div#userlist_user_1424796, div#userlist_user_2490422, div#userlist_user_1103706 {box-shadow: 0 0 10px green; border-radius: 45px;}' +
'/* ft */ div#userlist_user_15594854, div#userlist_user_16104727, div#userlist_user_14775602, div#userlist_user_4417053, div#userlist_user_28 test, div#userlist_user_14730706, div#userlist_user_8577234, div#userlist_user_3039286, div#userlist_user_3551382, div#userlist_user_12747846, div#userlist_user_1240426, div#userlist_user_572997, div#userlist_user_7769610, div#userlist_user_5729468 {box-shadow: 0 0 10px red; border-radius: 45px;}' +
'/* mod */ div#userlist_user_14352960, div#userlist_user_15172893, div#userlist_user_10196759, div#userlist_user_8132779, div#userlist_user_689813, div#userlist_user_616700, div#userlist_user_8441621, div#userlist_user_15507145, div#userlist_user_15269442, div#userlist_user_1721607, div#userlist_user_12439548, div#userlist_user_906520, div#userlist_user_7697643, div#userlist_user_6957151, div#userlist_user_14085100, div#userlist_user_2982905, div#userlist_user_8977430, div#userlist_user_5662801, div#userlist_user_5185503, div#userlist_user_10939587, div#userlist_user_7865403, div#userlist_user_6244695, div#userlist_user_1173683, div#userlist_user_10477653  {box-shadow: 0 0 10px gray; border-radius: 45px;}' +
'div#userlist_user_15594854:before, div#userlist_user_16104727:before, div#userlist_user_14775602:before, div#userlist_user_4417053:before, div#userlist_user_28 test:before, div#userlist_user_14730706:before, div#userlist_user_8577234:before, div#userlist_user_3039286:before, div#userlist_user_3551382:before, div#userlist_user_12747846:before, div#userlist_user_1240426:before, div#userlist_user_572997:before, div#userlist_user_7769610:before, div#userlist_user_5729468:before, div#userlist_user_12720120:before, div#userlist_user_1818913:before, div#userlist_user_10811983:before, div#userlist_user_5336730:before, div#userlist_user_6788159:before, div#userlist_user_15856568:before, div#userlist_user_15659397:before, div#userlist_user_11945245:before, div#userlist_user_3249933:before, div#userlist_user_3854104:before, div#userlist_user_7469811:before, div#userlist_user_12968283:before, div#userlist_user_636159:before, div#userlist_user_1424796:before, div#userlist_user_2490422:before, div#userlist_user_1103706:before, div#userlist_user_14352960:before, div#userlist_user_15172893:before, div#userlist_user_10196759:before, div#userlist_user_8132779:before, div#userlist_user_689813:before, div#userlist_user_616700:before, div#userlist_user_8441621:before, div#userlist_user_15507145:before, div#userlist_user_15269442:before, div#userlist_user_1721607:before, div#userlist_user_12439548:before, div#userlist_user_906520:before, div#userlist_user_7697643:before, div#userlist_user_6957151:before, div#userlist_user_14085100:before, div#userlist_user_2982905:before, div#userlist_user_8977430:before, div#userlist_user_5662801:before, div#userlist_user_5185503:before, div#userlist_user_10939587:before, div#userlist_user_7865403:before, div#userlist_user_6244695:before, div#userlist_user_1173683:before, div#userlist_user_10477653:before  {position: absolute; top: 15px; background: #fff; width: 100%; text-align: center; border-radius: 15px; font-size: 11px;}' +
'div#userlist_user_15594854:before {content:"Palina";}' +
'div#userlist_user_16104727:before {content:"Kruszyy";}' +
'div#userlist_user_14775602:before {content:"donpedrosik";}' +
'div#userlist_user_4417053:before {content:"Ela";}' +
'div#userlist_user_28:before {content:"test";}' +
'div#userlist_user_14730706:before {content:"maslomm";}' +
'div#userlist_user_8577234:before {content:"scrypt";}' +
'div#userlist_user_3039286:before {content:"goldi";}' +
'div#userlist_user_3551382:before {content:"Marcin";}' +
'div#userlist_user_12747846:before {content:"hemi";}' +
'div#userlist_user_1240426:before {content:"siobchan";}' +
'div#userlist_user_572997:before {content:"Memphis";}' +
'div#userlist_user_7769610:before {content:"Magdalena";}' +
'div#userlist_user_5729468:before {content:"StyX";}' +
'div#userlist_user_12720120:before {content:"JFC";}' +
'div#userlist_user_1818913:before {content:"binoleq";}' +
'div#userlist_user_10811983:before {content:"fotograf";}' +
'div#userlist_user_5336730:before {content:"tomas";}' +
'div#userlist_user_6788159:before {content:"Edytaaa87";}' +
'div#userlist_user_15856568:before {content:"Bell206";}' +
'div#userlist_user_15659397:before {content:"LordBaRanQ";}' +
'div#userlist_user_11945245:before {content:"Madziek";}' +
'div#userlist_user_3249933:before {content:"joker4444";}' +
'div#userlist_user_3854104:before {content:"zHx";}' +
'div#userlist_user_7469811:before {content:"woland";}' +
'div#userlist_user_12968283:before {content:"Agattu";}' +
'div#userlist_user_636159:before {content:"suchar";}' +
'div#userlist_user_1424796:before {content:"special0ne";}' +
'div#userlist_user_2490422:before {content:"wilk";}' +
'div#userlist_user_1103706:before {content:"ToTylkoJaSzaraQ";}' +
'div#userlist_user_14352960:before {content:"Frezjaa83";}' +
'div#userlist_user_15172893:before {content:"Lilu";}' +
'div#userlist_user_10196759:before {content:"Adrianna";}' +
'div#userlist_user_8132779:before {content:"Lukaszek";}' +
'div#userlist_user_689813:before {content:"NiesfornaN";}' +
'div#userlist_user_616700:before {content:"YYari";}' +
'div#userlist_user_8441621:before {content:"pyzy";}' +
'div#userlist_user_15507145:before {content:"AllForYou";}' +
'div#userlist_user_15269442:before {content:"GRADEK83";}' +
'div#userlist_user_1721607:before {content:"ToksycznaJestem";}' +
'div#userlist_user_12439548:before {content:"gniewna25";}' +
'div#userlist_user_906520:before {content:"CzarnyKrecik";}' +
'div#userlist_user_7697643:before {content:"Marcinx190";}' +
'div#userlist_user_6957151:before {content:"OpenYourBeer";}' +
'div#userlist_user_14085100:before {content:"Next";}' +
'div#userlist_user_2982905:before {content:"sdms";}' +
'div#userlist_user_8977430:before {content:"hejt";}' +
'div#userlist_user_5662801:before {content:"LeVentSolaire";}' +
'div#userlist_user_5185503:before {content:"RafoX";}' +
'div#userlist_user_10939587:before {content:"Paulina";}' +
'div#userlist_user_7865403:before {content:"Wenus";}' +
'div#userlist_user_6244695:before {content:"Monica";}' +
'div#userlist_user_1173683:before {content:"Malcom";}' +
'div#userlist_user_10477653:before {content:"Piotrek";}' +
'-->';
  headID.appendChild(style);