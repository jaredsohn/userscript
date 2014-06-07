// ==UserScript==
// @name         Smileys by Abhi
// @namespace    Abhi
// @author	 Abhi
// @description  Click on The Smiley to Insert!Enjoy!
// @include        http://*.orkut.*/*
// ==/UserScript==

addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "<img src="+image+">";
}

function dip() {
	var smileyarr = new Array();


smileyarr["smiley_1619"]="http://lh6.ggpht.com/_nsHkYg8z8g0/TDdnJOyWXfI/AAAAAAAAASQ/77sm7sxy0as/s400/3dheureux.png";


smileyarr["smiley_1629"]="http://lh5.ggpht.com/_nsHkYg8z8g0/TDdnOT-A_NI/AAAAAAAAASY/4I3ah-5CxM4/s400/10.png";


smileyarr["smiley_1639"]="http://lh4.ggpht.com/_nsHkYg8z8g0/TDdnSNDMUeI/AAAAAAAAASg/W2Lkw5TzTPo/s400/23.png";


smileyarr["smiley_1649"]="http://lh6.ggpht.com/_nsHkYg8z8g0/TDdnYP0evFI/AAAAAAAAASo/DMCeQ43cdIA/s400/24.png";


smileyarr["smiley_1659"]="http://lh4.ggpht.com/_nsHkYg8z8g0/TDdnbxBNOlI/AAAAAAAAASw/f7iR2h-bpXA/s400/25.png";

smileyarr["smiley_1669"]="http://lh5.ggpht.com/_nsHkYg8z8g0/TDdn1zu2OAI/AAAAAAAAAT0/jBp8qxMZQWk/s400/fire.png";



smileyarr["smiley_16449"]="http://lh5.ggpht.com/_nsHkYg8z8g0/TDdnfFPN_jI/AAAAAAAAAS4/xG7tQeDIhGY/s400/baby-laugh.png";

smileyarr["smiley_164439"]="http://lh6.ggpht.com/_nsHkYg8z8g0/TDdnibcROdI/AAAAAAAAATA/dZD9xqec3_4/s400/bla-bla.png";


smileyarr["smiley_16239"]="http://lh4.ggpht.com/_nsHkYg8z8g0/TDdnlcP3jkI/AAAAAAAAATI/TETmocT7Psc/s400/bomber.png";

smileyarr["smiley_16339"]="http://lh5.ggpht.com/_nsHkYg8z8g0/TDdnofYESvI/AAAAAAAAATQ/aSSE6pE2rpc/s400/brb.png";

smileyarr["smiley_15569"]="http://lh6.ggpht.com/_nsHkYg8z8g0/TDdnruN07gI/AAAAAAAAATY/BKUVH2-8joM/s400/bye2.png";


smileyarr["smiley_166679"]="http://lh3.ggpht.com/_nsHkYg8z8g0/TDdnu0wQ24I/AAAAAAAAATg/z4nncjE6faY/s400/crap.png";


smileyarr["smiley_16889"]="http://lh6.ggpht.com/_nsHkYg8z8g0/TDdnyT0tHpI/AAAAAAAAATs/NcCufeN8gaM/s400/dj30.png";


smileyarr["smiley_1699"]="http://lh4.ggpht.com/_nsHkYg8z8g0/TDdn7QLb_nI/AAAAAAAAAT8/SL3PrnddZ6I/s400/girl-shout.png";


smileyarr["smiley_1609"]="http://lh6.ggpht.com/_nsHkYg8z8g0/TDdn-mXAt0I/AAAAAAAAAUE/h-0Cr_4yPO8/s400/hi.png";


smileyarr["smiley_16909"]="http://lh5.ggpht.com/_nsHkYg8z8g0/TDdoCAGN9AI/AAAAAAAAAUM/aBezVJof2jo/s400/hmm.png";


smileyarr["smiley_1jj69"]="http://lh3.ggpht.com/_nsHkYg8z8g0/TDdoGPGzx7I/AAAAAAAAAUU/DC0Eei8sbYw/s400/love-balloons.png";


smileyarr["smiley_16jg9"]="http://lh5.ggpht.com/_nsHkYg8z8g0/TDdoJWZU1gI/AAAAAAAAAUc/jd2YE7JC-3g/s400/love-ya.png";


smileyarr["smiley_1gf69"]="http://lh4.ggpht.com/_nsHkYg8z8g0/TDdoMp-CXZI/AAAAAAAAAUk/tINvpTuGOW4/s400/MG_36.png";


smileyarr["smiley_16f9"]="http://lh6.ggpht.com/_nsHkYg8z8g0/TDdoQCw2AgI/AAAAAAAAAUs/c1YbEvKwdR4/s400/MG_38.png";

smileyarr["smiley_1d69"]="http://lh6.ggpht.com/_nsHkYg8z8g0/TDdoV8Pj3II/AAAAAAAAAU0/ld1jH-4I1Yw/s400/ninja.png";


smileyarr["smiley_16v9"]="http://lh4.ggpht.com/_nsHkYg8z8g0/TDdoZtoCCxI/AAAAAAAAAU8/cFULoJQUWzM/s400/no.png";


smileyarr["smiley_16ss9"]="http://lh4.ggpht.com/_nsHkYg8z8g0/TDdodMtUuiI/AAAAAAAAAVE/K6by_IVVEZ4/s400/no-1.png";


smileyarr["smiley_1fff69"]="http://lh5.ggpht.com/_nsHkYg8z8g0/TDdohfLQH8I/AAAAAAAAAVM/bJhQ_5I9KY0/s400/no-problem.png";


smileyarr["smiley_1te69"]="http://lh4.ggpht.com/_nsHkYg8z8g0/TDdo1E_EtwI/AAAAAAAAAVU/UfQU4YkuQ5o/s400/not-now.png";


smileyarr["smiley_1et69"]="http://lh5.ggpht.com/_nsHkYg8z8g0/TDdo6CxdkpI/AAAAAAAAAVc/dREnYww0nIo/s400/oh-stop-it.png";


smileyarr["smiley_16yy9"]="http://lh4.ggpht.com/_nsHkYg8z8g0/TDdpDFT4YLI/AAAAAAAAAVk/iM7HdWKqxes/s400/ok.png";


smileyarr["smiley_16jh9"]="http://lh5.ggpht.com/_nsHkYg8z8g0/TDdpIOO5ZuI/AAAAAAAAAVs/-X0irAT2E8A/s400/Punch.png";


smileyarr["smiley_1hh69"]="http://lh5.ggpht.com/_nsHkYg8z8g0/TDdpLHoR36I/AAAAAAAAAV0/oUn3J4fu3NM/s400/super.png";


smileyarr["smiley_1fhg69"]="http://lh6.ggpht.com/_nsHkYg8z8g0/TDdpPqio7DI/AAAAAAAAAV8/w7JZBoUeDr8/s400/yeah.png";

smileyarr["smiley_16mm9"]="http://lh3.ggpht.com/_nsHkYg8z8g0/TDdpS-1k_KI/AAAAAAAAAWE/avD-ePh3bm0/s400/tigerfight.png";



smileyarr["smiley_169"]="http://lh4.ggpht.com/_zam2DdYJLxc/S0RC-1dcKpI/AAAAAAAAAHA/w2H6-PaSCOQ/character40.gif";

smileyarr["smiley_280"]="http://lh5.ggpht.com/_PrM5VcwpZio/S1vns6zGiYI/AAAAAAAABRA/unmO9YLqS2Y/mad0218.gif";

smileyarr["smiley_219"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdDPImkLhPI/AAAAAAAAAMI/wKDMH9TLfuI/sFi_stopbullets.gif";

smileyarr["smiley_182"]="http://lh3.ggpht.com/_zam2DdYJLxc/S0RDmlNkBCI/AAAAAAAAAH8/C4OrtfSDrqY/character91.gif";

smileyarr["smiley_142"]="http://lh5.ggpht.com/_zam2DdYJLxc/S0RBnP4kUxI/AAAAAAAAAEk/Xu5oZ36iZHc/go%20arrow.gif";

smileyarr["smiley_95"]="http://lh6.ggpht.com/_PrM5VcwpZio/Sx9V81tTRzI/AAAAAAAAAuw/LjlAT04ffNo/violent8.gif";

smileyarr["smiley_210"]="http://lh4.ggpht.com/_PrM5VcwpZio/SwLZelSXfFI/AAAAAAAAAYs/CXGw4nTSQmc/rollball.gif";



smileyarr["smiley_2198"]="http://lh3.ggpht.com/_KqD6T15B3jQ/TCzdE8C3SwI/AAAAAAAAAds/NPyZaXNs8Uo/s400/addemoticons2.png";


smileyarr["smiley_2298"]="http://lh4.ggpht.com/_KqD6T15B3jQ/TCzdZN1HwgI/AAAAAAAAAd0/G2yu6bV-YSE/s400/addemoticons6.png";


smileyarr["smiley_2928"]="http://lh4.ggpht.com/_KqD6T15B3jQ/TCzdcXUOkBI/AAAAAAAAAd8/SEuUwOlGjMY/s400/addemoticons7.png";


smileyarr["smiley_2298"]="http://lh6.ggpht.com/_KqD6T15B3jQ/TCzdgMdRV6I/AAAAAAAAAeE/4q-wft1D6IU/s400/addemoticons27.png";


smileyarr["smiley_2938"]="http://lh5.ggpht.com/_KqD6T15B3jQ/TCzdjo1qRUI/AAAAAAAAAeM/26v8DULR71U/s400/addemoticons29.png";


smileyarr["smiley_29448"]="http://lh4.ggpht.com/_KqD6T15B3jQ/TCzdmhIt8sI/AAAAAAAAAeU/8AaKWTQ-7fc/s400/addemoticons41.png";


smileyarr["smiley_29248"]="http://lh5.ggpht.com/_KqD6T15B3jQ/TCzdp5n5COI/AAAAAAAAAec/HfufwR62grY/s400/addemoticons43.png";


smileyarr["smiley_29328"]="http://lh3.ggpht.com/_KqD6T15B3jQ/TCzdtZdF71I/AAAAAAAAAek/yGnoHED3A5U/s400/addemoticons44.png";

smileyarr["smiley_2956"]="http://lh6.ggpht.com/_KqD6T15B3jQ/TCzeBZ70xvI/AAAAAAAAAes/uf-mV5tlL7w/s400/addemoticons52.png";


smileyarr["smiley_29768"]="http://lh6.ggpht.com/_KqD6T15B3jQ/TCzeKt53g4I/AAAAAAAAAe0/Htu8yGYJUS4/s400/addemoticons54.png";


smileyarr["smiley_29778"]="http://lh5.ggpht.com/_KqD6T15B3jQ/TCzePBh8ZUI/AAAAAAAAAe8/sCALEXe7Pg0/s400/addemoticons59.png";


smileyarr["smiley_2968"]="http://lh4.ggpht.com/_KqD6T15B3jQ/TCzeSpx9ZUI/AAAAAAAAAfE/4_PfrESAJCE/s400/addemoticons73.png";


smileyarr["smiley_29938"]="http://lh3.ggpht.com/_KqD6T15B3jQ/TCzec01L2aI/AAAAAAAAAfM/GiXsWxz-Z4E/s400/addemoticons75.png";


smileyarr["smiley_29008"]="http://lh5.ggpht.com/_KqD6T15B3jQ/TCzf3ZQbboI/AAAAAAAAAfU/fIwDXizaPkU/s400/addemoticons84.png";

smileyarr["smiley_29128"]="http://lh5.ggpht.com/_KqD6T15B3jQ/TCzf79QtppI/AAAAAAAAAfc/LZoCVvRcY5g/s400/addemoticons99.png";

smileyarr["smiley_29812"]="http://lh3.ggpht.com/_KqD6T15B3jQ/TCzf_oMsS9I/AAAAAAAAAfk/ZTJfbqT1g9o/s400/addemoticons107.png";

smileyarr["smiley_29834"]="http://lh5.ggpht.com/_KqD6T15B3jQ/TCzgJ2VxtlI/AAAAAAAAAfs/luF8ua-MVLY/s400/addemoticons115.png";

smileyarr["smiley_29558"]="http://lh3.ggpht.com/_KqD6T15B3jQ/TCzgNFu60nI/AAAAAAAAAf0/NyWYl5_hbSo/s400/addemoticons127.png";

smileyarr["smiley_29898"]="http://lh6.ggpht.com/_KqD6T15B3jQ/TCzgQhlH5vI/AAAAAAAAAf8/OXMI82bGeL4/s400/addemoticons129.png";

smileyarr["smiley_29887"]="http://lh5.ggpht.com/_KqD6T15B3jQ/TCzgV19BgyI/AAAAAAAAAgE/_Rs6WSeP4RE/s400/addemoticons147.png";


smileyarr["smiley_298666"]="http://lh3.ggpht.com/_KqD6T15B3jQ/TCzgd8p3DVI/AAAAAAAAAgM/NxUX_MBTscQ/s400/addemoticons148.png";

smileyarr["smiley_298555"]="http://lh4.ggpht.com/_KqD6T15B3jQ/TCzgj-YcC6I/AAAAAAAAAgU/nVQpGr6ifuc/s400/addemoticons152.png";

smileyarr["smiley_2985555"]="http://lh4.ggpht.com/_KqD6T15B3jQ/TCzgnmnlXRI/AAAAAAAAAgc/tcDbFqdyKek/s400/addemoticons154.png";

smileyarr["smiley_298786"]="http://lh6.ggpht.com/_KqD6T15B3jQ/TCzgr2WauhI/AAAAAAAAAgk/7EfbcagINZo/s400/addemoticons158.png";

smileyarr["smiley_298556"]="http://lh3.ggpht.com/_KqD6T15B3jQ/TCzgwfOFQ3I/AAAAAAAAAgs/u4BWn8dMHBo/s400/addemoticons176.png";

smileyarr["smiley_298000"]="http://lh4.ggpht.com/_KqD6T15B3jQ/TCzg1PSrmMI/AAAAAAAAAg0/OYvsmluEx2I/s400/addemoticons187.png";

smileyarr["smiley_2988977"]="http://lh4.ggpht.com/_KqD6T15B3jQ/TCzg4Tc-8PI/AAAAAAAAAg8/Hh1Azy06uHA/s400/addemoticons192.png";


smileyarr["smiley_298676"]="http://lh6.ggpht.com/_KqD6T15B3jQ/TCzg8KatFcI/AAAAAAAAAhE/QPk2SXEcpMk/s400/addemoticons195.png";

smileyarr["smiley_2985567"]="http://lh4.ggpht.com/_KqD6T15B3jQ/TCzg__vIJ4I/AAAAAAAAAhM/_cKo46A5BR0/s400/addemoticons217.png";


smileyarr["smiley_2984436"]="http://lh6.ggpht.com/_KqD6T15B3jQ/TCzhDR6Y7pI/AAAAAAAAAhU/RoqTgwB7Yaw/s400/addemoticons259.png";

smileyarr["smiley_298456"]="http://lh3.ggpht.com/_KqD6T15B3jQ/TCzhHTgxxBI/AAAAAAAAAhc/UCIyf0Ig3sM/s400/addemoticons350.png";


smileyarr["smiley_2985009"]="http://lh5.ggpht.com/_KqD6T15B3jQ/TCzhL93tv3I/AAAAAAAAAhk/T8G_88SsT4k/s400/addemoticons409.png";

smileyarr["smiley_298556784"]="http://lh6.ggpht.com/_KqD6T15B3jQ/TCzhPE2V79I/AAAAAAAAAhs/pbXuwx2TMGA/s400/addemoticons478.png";


smileyarr["smiley_298333"]="http://lh3.ggpht.com/_b1V1KuI05q8/TCzhbLqmDqI/AAAAAAAAB2E/AJ16kdFabhs/s400/addemoticons499.png";



smileyarr["smiley_2984242"]="http://lh4.ggpht.com/_b1V1KuI05q8/TCzhf_bMLTI/AAAAAAAAB2M/FKJp1Yuq0Go/s400/addemoticons525.png";

smileyarr["smiley_2986464"]="http://lh4.ggpht.com/_b1V1KuI05q8/TCzhu0PsXgI/AAAAAAAAB2U/fLw0A7vZGi4/s400/AddEmoticons01515.png";

smileyarr["smiley_2983546"]="http://lh5.ggpht.com/_b1V1KuI05q8/TCzhyx0FKMI/AAAAAAAAB2c/AI2tzuGI8eU/s400/AddEmoticons10331.png";




smileyarr["smiley_298"]="http://lh4.ggpht.com/_PrM5VcwpZio/S1voR6Q5sII/AAAAAAAABSA/Ky4SdJArgLo/sign0103.gif";

smileyarr["smiley_223"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdDRhQgbz9I/AAAAAAAAAQE/VLevKJpvRaY/sFi_snowfight.gif";

smileyarr["smiley_179"]="http://lh3.ggpht.com/_zam2DdYJLxc/S0RDmNGW9_I/AAAAAAAAAHw/M753x5sHbnE/character77.gif";

smileyarr["smiley_175"]="http://lh4.ggpht.com/_zam2DdYJLxc/S0RDdh-VDqI/AAAAAAAAAHc/GqxTVIynpRY/character53.gif";

smileyarr["smiley_171"]="http://lh4.ggpht.com/_zam2DdYJLxc/S0RDM9OcSGI/AAAAAAAAAHM/V3wOVUeGBQk/character44.gif";

smileyarr["smiley_160"]="http://lh6.ggpht.com/_zam2DdYJLxc/S0RCXAPZH5I/AAAAAAAAAF4/i5v1tJDP2DI/world%20cup%20trophee.gif";

smileyarr["smiley_152"]="http://lh6.ggpht.com/_zam2DdYJLxc/S0RB8qkvHyI/AAAAAAAAAFM/DxS213IAeWM/penguin%20dance.gif";

smileyarr["smiley_145"]="http://lh4.ggpht.com/_zam2DdYJLxc/S0RBw0vUlxI/AAAAAAAAAEw/xw0yUNDtlis/happy%20dance%20penguin.gif";

smileyarr["smiley_57"]="http://lh5.ggpht.com/_PrM5VcwpZio/Sx9SPQ8UxhI/AAAAAAAAAhc/2hNQ7yem8wY/alien4.gif";

smileyarr["smiley_34"]="http://lh6.ggpht.com/_PrM5VcwpZio/Sx9TLusE0NI/AAAAAAAAAkg/BLoKu4hjDc0/character32.gif";


smileyarr["smiley_32"]="http://lh3.ggpht.com/_PrM5VcwpZio/Sx9TL6mAhFI/AAAAAAAAAko/xAsw-sRfnPs/character90.gif";


smileyarr["sleep"]="http://lh5.ggpht.com/_KqD6T15B3jQ/TCudcNMRenI/AAAAAAAAAdk/kz1Tq264g7M/s400/sleep-052.png";


smileyarr["cheers"]="http://lh3.ggpht.com/_KqD6T15B3jQ/TCudUS2q97I/AAAAAAAAAdc/-wR6EGqYPN8/s400/jap50.png";

smileyarr["couple"]="http://lh5.ggpht.com/_KqD6T15B3jQ/TCudLGoFsmI/AAAAAAAAAdU/ahWme1TK96A/s400/jap36.png";


smileyarr["japan love"]="http://lh4.ggpht.com/_KqD6T15B3jQ/TCudEZcnZlI/AAAAAAAAAdM/8-dRI2ckFWA/s400/jap24.png";


smileyarr["tuki"]="http://lh5.ggpht.com/_KqD6T15B3jQ/TCuc9myXSMI/AAAAAAAAAdE/4WMgftAKZZ0/s400/free-scared-smileys-414.png";

smileyarr["date"]="http://lh5.ggpht.com/_KqD6T15B3jQ/TCuc2HXRSfI/AAAAAAAAAc8/vwwhUmkInUQ/s400/free-love-smileys-885.png";

smileyarr["knock"]="http://lh3.ggpht.com/_KqD6T15B3jQ/TCuctabuRFI/AAAAAAAAAc0/63ry-iU6ylE/s400/free-love-smileys-869.png";

smileyarr["play"]="http://lh6.ggpht.com/_KqD6T15B3jQ/TCuclBvK_-I/AAAAAAAAAcs/2_XnDKEBUVc/s400/free-cool-smileys-1047.png";

smileyarr["dancing baby"]="http://lh4.ggpht.com/_KqD6T15B3jQ/TCucdZS7VsI/AAAAAAAAAck/6YFA0-5Wzlw/s400/dancing-baby.png";

smileyarr["crane"]="http://lh5.ggpht.com/_KqD6T15B3jQ/TCucUitDsFI/AAAAAAAAAcc/Qw7HtSNrMuI/s400/free-fighting-smileys-459.png";	

smileyarr["head bang"]="http://lh5.ggpht.com/_KqD6T15B3jQ/TCucM3tWh8I/AAAAAAAAAcU/sAO1aDKkLtg/s400/computer-22.png";	

smileyarr["baby girl"]="http://lh5.ggpht.com/_KqD6T15B3jQ/TCucFRMsRBI/AAAAAAAAAcM/4VFetBBY0r4/s400/baby-girl-28.png";

smileyarr["babies"]="http://lh6.ggpht.com/_KqD6T15B3jQ/TCub-P5ObxI/AAAAAAAAAcE/OC8Eq34Cboc/s400/babies.png";

smileyarr["brick"]="http://lh3.ggpht.com/_KqD6T15B3jQ/TCub26DMd1I/AAAAAAAAAb8/0kEebGXQRT8/s400/anim_39.png";

smileyarr["swing"]="http://lh3.ggpht.com/_KqD6T15B3jQ/TCubv6GgkLI/AAAAAAAAAb0/rdF9gkNWXpc/s400/anim_26.png";
	
smileyarr["news"]="http://lh5.ggpht.com/_KqD6T15B3jQ/TCubmXmURzI/AAAAAAAAAbs/uxec77LxBA0/s400/anim_09.png";

smileyarr["Bath"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/S67gGaf0_9I/AAAAAAAABLA/QnwWcZSre4g/s800/bath.gif";
smileyarr["Back2"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/S7hyNdSfZsI/AAAAAAAABNg/eLLo_Z8GYOU/s800/Back2.gif";

smileyarr["Back3"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/S7hyNuR9ucI/AAAAAAAABNk/l1ok5_NihOk/s800/Back3.gif";

smileyarr["Admin"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/S-l6A2lvImI/AAAAAAAABOU/zKrguJ052kg/s800/admin.gif";
smileyarr["laie_sajju"]="http://lh3.ggpht.com/_Pa4D2ASTVpI/S44fzTPP57I/AAAAAAAABAU/bq9ghnrorqU/s400/Laie_23.png";


smileyarr["angry"]="http://lh5.ggpht.com/_nsHkYg8z8g0/TB1AWSaO70I/AAAAAAAAAO4/UaJ9of1-ejU/s400/angry7.png";

smileyarr["disdain"]="http://lh3.ggpht.com/_nsHkYg8z8g0/TB1AfRCQ4eI/AAAAAAAAAPA/TcYnkI4yGBM/s400/disdain0.png";

smileyarr["glasses"]="http://lh4.ggpht.com/_nsHkYg8z8g0/TB1AjMAqXbI/AAAAAAAAAPI/g7SSMCF3ApQ/s400/glasses13.png";

smileyarr["greetings"]="http://lh6.ggpht.com/_nsHkYg8z8g0/TB1ApCq08PI/AAAAAAAAAPQ/VidJnzFrhy0/s400/greetings0.png";

smileyarr["headgear2"]="http://lh6.ggpht.com/_nsHkYg8z8g0/TB1Atzy9cJI/AAAAAAAAAPY/dh4xDZp9buo/s400/headgear0.png";

smileyarr["headgear1"]="http://lh3.ggpht.com/_nsHkYg8z8g0/TB1AypkL28I/AAAAAAAAAPg/ruJ7Kf-Tuus/s400/headgear64.png";

smileyarr["headgear"]="http://lh4.ggpht.com/_nsHkYg8z8g0/TB1A23avfYI/AAAAAAAAAPo/eg5ImpA6FXk/s400/headgear38.png";

smileyarr["ill"]="http://lh4.ggpht.com/_nsHkYg8z8g0/TB1BFwyb3uI/AAAAAAAAAPw/AkNf_tbrfMg/s400/ill17.png";


smileyarr["laughing5"]="http://lh5.ggpht.com/_nsHkYg8z8g0/TB1BN5G8ZcI/AAAAAAAAAP4/T0igPbO7KBE/s400/laughing21.png";

smileyarr["laughing4"]="http://lh4.ggpht.com/_nsHkYg8z8g0/TB1BQsIYMKI/AAAAAAAAAQA/AR9T82-WqxY/s400/laughing22.png";

smileyarr["laughing3"]="http://lh4.ggpht.com/_nsHkYg8z8g0/TB1BS7prO1I/AAAAAAAAAQI/vd_ezx7H3KM/s400/laughing24.png";

smileyarr["laughing2"]="http://lh5.ggpht.com/_nsHkYg8z8g0/TB1BWg4lZSI/AAAAAAAAAQQ/y0xPuxHncws/s400/laughing25.png";

smileyarr["love4"]="http://lh3.ggpht.com/_nsHkYg8z8g0/TB1BdoiHeZI/AAAAAAAAAQY/1HWWXOtYx6c/s400/love15.png";

smileyarr["love3"]="http://lh5.ggpht.com/_nsHkYg8z8g0/TB1BmUViwLI/AAAAAAAAAQo/21_sfSMom8E/s400/love19.png";

smileyarr["love2"]="http://lh4.ggpht.com/_nsHkYg8z8g0/TB1BpRbZiRI/AAAAAAAAAQw/2uzVt26olLw/s400/love36.png";

smileyarr["love1"]="http://lh6.ggpht.com/_nsHkYg8z8g0/TB1BwemD-3I/AAAAAAAAAQ4/v1UY40ArcFg/s400/love51.png";

smileyarr["signsandflags"]="http://lh3.ggpht.com/_nsHkYg8z8g0/TB1B1UiobrI/AAAAAAAAARA/u97lFLw_RMg/s400/signsandflags19.png";

smileyarr["sporty8"]="http://lh3.ggpht.com/_nsHkYg8z8g0/TB1B6ofvchI/AAAAAAAAARI/hrByexeafp8/s400/sporty12.png";

smileyarr["sporty7"]="http://lh3.ggpht.com/_nsHkYg8z8g0/TB1CDPNt6UI/AAAAAAAAARQ/pTriK9qmz2A/s400/sporty16.png";


smileyarr["laughing1"]="http://lh4.ggpht.com/_nsHkYg8z8g0/TB1BgKCCGjI/AAAAAAAAAQg/mVzXHaj3v5c/s400/laughing26.png";

smileyarr["sporty6"]="http://lh4.ggpht.com/_nsHkYg8z8g0/TB1CU9VvDbI/AAAAAAAAARY/UY8BEIuuiJQ/s400/sporty27.png";

smileyarr["sporty5"]="http://lh3.ggpht.com/_nsHkYg8z8g0/TB1CXpPPJvI/AAAAAAAAARg/IfLgV7Wx-sA/s400/sporty52.png";

smileyarr["sporty1"]="http://lh5.ggpht.com/_nsHkYg8z8g0/TB1CaUMm8ZI/AAAAAAAAARo/gxW8e7hCaL0/s400/sporty72.png";

smileyarr["sporty2"]="http://lh4.ggpht.com/_nsHkYg8z8g0/TB1CfV1VgTI/AAAAAAAAARw/sdEayL1QR3c/s400/sporty81.png";

smileyarr["sporty3"]="http://lh6.ggpht.com/_nsHkYg8z8g0/TB1Ch2utR_I/AAAAAAAAAR4/ueGBJuRCYXY/s400/sporty91.png";

smileyarr["sporty4"]="http://lh5.ggpht.com/_nsHkYg8z8g0/TB1CppBlCVI/AAAAAAAAASA/vo3n0o0TYqM/s400/sporty97.png";






	var tb = document.getElementsByTagName('textarea');
	for(i=0;i<tb.length;i++){
		text=tb[i];
		if (!text) return;
		c=text.parentNode;
		d=document.createElement("div");
		d.className="T";
		d.style.fontSize="11px";
		d.align="left";
		
	        
	    d.style.marginTop="10px";
		c.appendChild(d);
		
		for(title in smileyarr){
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);
			mm.innerHTML="<img src='"+smileyarr[title]+"' title='"+title+"'>";
			mm.addEventListener("click", insertSmiley, true);
			d.appendChild(mm);
		}
	}	
}
dip();
}, false);