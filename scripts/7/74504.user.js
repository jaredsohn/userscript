// ==UserScript==
// @name          Wording for Orkut by Subedaar
// @namespace     http://www.orkut.co.in/Main#Profile?uid=172310625596695735
// @author	Subedaar
// @description   Wordings for Orkut. Just Made for Fun.
// @include       htt*://*.orkut.*/*
// @exclude       http://*.orkut.*/Main#*
// @exclude       http://*.orkut.gmodules.*
// ==/UserScript==

/********************************************************
//smileys appear below the reply box as well.
//Made the smileys just for fun and thought to share with you all..!!
// All credits to Original script writer. I hope u all enjoy the script! ;)
*********************************************************/

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
	smileyarr["you_suck"]="http://lh3.ggpht.com/_Nhh98Ix90W8/ScdVA3V8bNI/AAAAAAAAArM/82d2s8eg5Js/you_suck.gif";
smileyarr["you_rock"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScdVBT2_FwI/AAAAAAAAArQ/Y3y2bgKSAzA/you_rock.gif";
smileyarr["yes"]="http://lh3.ggpht.com/_Nhh98Ix90W8/ScdVB1cAR-I/AAAAAAAAArU/zGRKg88UxZM/yes.gif";
smileyarr["yeah_baby"]="http://lh3.ggpht.com/_Nhh98Ix90W8/ScdVC4ykrHI/AAAAAAAAArY/sj9IFZbzotY/yeah_baby.gif";
smileyarr["woo_hoo"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScdVDlRPp4I/AAAAAAAAArc/4LCWC_G5Cv8/woo_hoo.gif";
smileyarr["why"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScdVEJXRYuI/AAAAAAAAArg/m6KQpKK12x0/why.gif";
smileyarr["whatever"]="http://lh3.ggpht.com/_Nhh98Ix90W8/ScdVE_QUoWI/AAAAAAAAArk/En-BXtLcqu0/whatever.gif";
smileyarr["well_done2"]="http://lh6.ggpht.com/_Nhh98Ix90W8/ScdVFaCxySI/AAAAAAAAAro/1janyQIjjK4/well_done2.gif";
smileyarr["well_done1"]="http://lh6.ggpht.com/_Nhh98Ix90W8/ScdVF8mPYjI/AAAAAAAAArs/JPi9iutAZm8/well_done1.gif";
smileyarr["welcome"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScdVGCbM1_I/AAAAAAAAArw/iKHtaPqLmqQ/welcome.gif";
smileyarr["thanks"]="http://lh3.ggpht.com/_Nhh98Ix90W8/ScdVGjixD-I/AAAAAAAAAr0/78RjvuMlE9c/thanks.gif";
smileyarr["please"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScdVHLClJyI/AAAAAAAAAr4/zf4gFAETyro/please.gif";
smileyarr["opps"]="http://lh6.ggpht.com/_Nhh98Ix90W8/ScdVIPz-_gI/AAAAAAAAAr8/5TgJycx_vw4/opps.gif";
smileyarr["no_problem"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScdVIeGrojI/AAAAAAAAAsA/URpDhvLPssA/no_problem.gif";
smileyarr["need_hug"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScdVJJCh7tI/AAAAAAAAAsE/B5JXAQFsI9c/need_hug.gif";
smileyarr["love_you"]="http://lh6.ggpht.com/_Nhh98Ix90W8/ScdVJkhc--I/AAAAAAAAAsI/44jRaO10FgM/love_you.gif";
smileyarr["loser"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScdVKjeSmBI/AAAAAAAAAsM/vzDtlesMQ_A/loser.gif";
smileyarr["lol"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScdVLU2LScI/AAAAAAAAAsQ/0yxuGy1jqq4/lol.gif";
smileyarr["like_you"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScdVL8CZZLI/AAAAAAAAAsU/sWm7o4IPiFo/like_you.gif";
smileyarr["huh"]="http://lh6.ggpht.com/_Nhh98Ix90W8/ScdVMmG4TNI/AAAAAAAAAsY/rrpNl13E8Hs/huh.gif";
smileyarr["how_are_you"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScdVNOXMvMI/AAAAAAAAAsc/vwv1PaTY0d0/how_are_you.gif";
smileyarr["hiya"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScdVNrbyxpI/AAAAAAAAAsg/V9R4-Gt3ZX8/hiya.gif";
smileyarr["hey_sexy"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScdVOAgB1TI/AAAAAAAAAsk/ltPiqSb2qrg/hey_sexy.gif";
smileyarr["hate_you"]="http://lh6.ggpht.com/_Nhh98Ix90W8/ScdVOxxjdJI/AAAAAAAAAso/PtARW_9CPjA/hate_you.gif";
smileyarr["ha"]="http://lh3.ggpht.com/_Nhh98Ix90W8/ScdVPJKLHvI/AAAAAAAAAss/RBBs986XLg0/ha.gif";
smileyarr["greetings"]="http://lh6.ggpht.com/_Nhh98Ix90W8/ScdVP-5PJhI/AAAAAAAAAsw/Q7hfbvnJzvM/greetings.gif";
smileyarr["dont_know"]="http://lh6.ggpht.com/_Nhh98Ix90W8/ScdVQb3JHLI/AAAAAAAAAs0/AiQ8LibHoaI/dont_know.gif";
smileyarr["damn"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScdVQxbJBpI/AAAAAAAAAs4/QXdO6GcJXGg/damn.gif";
smileyarr["bravo"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScdVRWw4pCI/AAAAAAAAAs8/DdWjBPkGxyg/bravo.gif";
smileyarr["back"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScdVSIBECYI/AAAAAAAAAtA/xg9XviIh_Tw/back.gif";
smileyarr["are_you_there"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScdVSh4nNaI/AAAAAAAAAtE/_ioEMKYlpAo/are_you_there.gif";

smileyarr["1"]="http://lh5.ggpht.com/_EM7uwS4HSZU/S8f2ZTJUc2I/AAAAAAAABvQ/OJHB03IklZY/21.gif";
smileyarr["2"]="http://lh5.ggpht.com/_EM7uwS4HSZU/S8f2Z_Im7ZI/AAAAAAAABvU/8A2Cp17J758/25.gif";
smileyarr["3"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S8f2Z3elwiI/AAAAAAAABvY/16SIUrHC_gk/80.gif";
smileyarr["4"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S8f2aKe_sRI/AAAAAAAABvc/sQzVkDhUTMo/85.gif";
smileyarr["5"]="http://lh6.ggpht.com/_EM7uwS4HSZU/S8f2aZdd_cI/AAAAAAAABvg/zBxINbwxcNQ/86.gif";
smileyarr["6"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S8f2i1GtT3I/AAAAAAAABvk/3xRzaZF2DCg/87.gif";
smileyarr["7"]="http://lh5.ggpht.com/_EM7uwS4HSZU/S8f2jNflLXI/AAAAAAAABvo/xc8u5RS8H_A/88.gif";
smileyarr["8"]="http://lh5.ggpht.com/_EM7uwS4HSZU/S8f2juMTDJI/AAAAAAAABvs/iF6YJgNFk6I/89.gif";
smileyarr["9"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S8f2jrHVp-I/AAAAAAAABvw/GUyB2yrKhHU/90.gif";
smileyarr["10"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S8f2j7JBBjI/AAAAAAAABv0/JTZh6Emy228/91.gif";
smileyarr["11"]="http://lh6.ggpht.com/_EM7uwS4HSZU/S8f2odVB9vI/AAAAAAAABv4/3GErMV1W4cU/92.gif";
smileyarr["12"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S8f2omrGBPI/AAAAAAAABv8/7pKzW-lifdY/93.gif";
smileyarr["13"]="http://lh5.ggpht.com/_EM7uwS4HSZU/S8f2oypyJUI/AAAAAAAABwA/5uUyg3V3uUY/94.gif";
smileyarr["14"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S8f2o27QfWI/AAAAAAAABwE/l8Fq1ZqeXDA/95.gif";
smileyarr["15"]="http://lh6.ggpht.com/_EM7uwS4HSZU/S8f2pBZWNeI/AAAAAAAABwI/f3TkEVpIAdc/96.gif";
smileyarr["16"]="http://lh5.ggpht.com/_EM7uwS4HSZU/S8f3BzrmpgI/AAAAAAAABwM/P0TljHAxd4Q/97.gif";
smileyarr["17"]="http://lh6.ggpht.com/_EM7uwS4HSZU/S8f3CBzSYyI/AAAAAAAABwQ/MncMmSCGHII/98.gif";
smileyarr["18"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S8f3CLzP05I/AAAAAAAABwU/GMzSy9vJGj0/99.gif";
smileyarr["19"]="http://lh6.ggpht.com/_EM7uwS4HSZU/S8f3Ce25z0I/AAAAAAAABwY/wcbhaV6YY-U/100.gif";
smileyarr["20"]="http://lh6.ggpht.com/_EM7uwS4HSZU/S8f3CsSQuLI/AAAAAAAABwc/UCT1KI5KmSQ/101.gif";
smileyarr["21"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S8f38RyDl3I/AAAAAAAABwg/hjdyKG805oA/102.gif";
smileyarr["22"]="http://lh6.ggpht.com/_EM7uwS4HSZU/S8f38dll0DI/AAAAAAAABwk/gy__bTGtSV8/103.gif";
smileyarr["23"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S8f38tlWw5I/AAAAAAAABwo/XgtdENgdYPA/104.gif";
smileyarr["24"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S8f38i5xGnI/AAAAAAAABws/gSVpmWDpPYA/105.gif";
smileyarr["38"]="http://lh6.ggpht.com/_EM7uwS4HSZU/S8f5bNVyM8I/AAAAAAAABxs/Rk1vX6prKbg/bad-girl-0009.gif";
smileyarr["27"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S8f4rTD-drI/AAAAAAAABw4/0Toe3koihrc/108.gif";
smileyarr["28"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S8f4r1zpoDI/AAAAAAAABw8/dvHtoTgnjC0/109.gif";
smileyarr["31"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S8f5P93UJwI/AAAAAAAABxQ/wIo3DhDJR8E/123.gif";
smileyarr["142"]="http://lh6.ggpht.com/_EM7uwS4HSZU/S8f9VkIgR4I/AAAAAAAABz4/lGmTTKm_6Fo/i-am-the-king-0007.gif";
smileyarr["232"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S8f9Vpp9MhI/AAAAAAAABz8/rwFklgLHdA0/its-me-0015.gif";
smileyarr["47"]="http://lh6.ggpht.com/_EM7uwS4HSZU/S8f7Dwwn_XI/AAAAAAAAByQ/9ZOvMBf3ZQo/close-0025.gif";
smileyarr["49"]="http://lh5.ggpht.com/_EM7uwS4HSZU/S8f7ESIMH0I/AAAAAAAAByY/Z3bXvt1dRd0/do-not-disturb-0024.gif";
smileyarr["248"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S8f9wZNKy3I/AAAAAAAAB0o/AZmH3KXDN6E/redface-oops-6.gif";
smileyarr["39"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S8f5bsSyXHI/AAAAAAAABxw/NBgNoDFw5JQ/Banned.gif";
smileyarr["259"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S8f-UCvDGdI/AAAAAAAAB1U/xHDQIQtrqW8/yes1.gif";
smileyarr["25"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S8f38_85NPI/AAAAAAAABww/CFM0KSySJzE/106.gif";
smileyarr["26"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S8f4qmkxgFI/AAAAAAAABw0/l9F2wOEM6Uc/107.gif";


smileyarr["29"]="http://lh5.ggpht.com/_EM7uwS4HSZU/S8f4seR8pyI/AAAAAAAABxA/AvGjopTOcCU/110.gif";
smileyarr["30"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S8f4sZFvKDI/AAAAAAAABxE/n3cROMtbsrw/121.gif";



smileyarr["32"]="http://lh6.ggpht.com/_EM7uwS4HSZU/S8f5QYdp_XI/AAAAAAAABxU/1DJiX4VXBQM/angry_4_text.gif";
smileyarr["33"]="http://lh5.ggpht.com/_EM7uwS4HSZU/S8f5QiNjd4I/AAAAAAAABxY/Nw1u01YVQZ0/angry_6_3_text.gif";
smileyarr["34"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S8f5Q-jFLTI/AAAAAAAABxc/Bt9oY9XtIjM/angry_8_text1.gif";
smileyarr["35"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S8f5RSyiLWI/AAAAAAAABxg/hoV3-tumIY8/angry_shut_up_text.gif";
smileyarr["36"]="http://lh5.ggpht.com/_EM7uwS4HSZU/S8f5aVh01LI/AAAAAAAABxk/_c49dOyKdZE/annoying.gif";
smileyarr["37"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S8f5a8vResI/AAAAAAAABxo/6owAUur_AEM/awesome.gif";


smileyarr["40"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S8f5b_DpIsI/AAAAAAAABx0/iH0TttH9Tvs/best_regards.gif";
smileyarr["41"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S8f6LYFC0VI/AAAAAAAABx4/09cVxeVCWq4/birthday_27.gif";
smileyarr["42"]="http://lh5.ggpht.com/_EM7uwS4HSZU/S8f6Ll1L1DI/AAAAAAAABx8/A9Y4wO15vZI/birthday_29_text3.gif";
smileyarr["43"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S8f6Lmr2Y0I/AAAAAAAAByA/LADLuDQHGhI/black_day.gif";
smileyarr["44"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S8f6L1SNQNI/AAAAAAAAByE/zVm9yzB0WUY/bravo_2.gif";
smileyarr["45"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S8f6MJMUhVI/AAAAAAAAByI/PVSFa50-01Q/chicken.gif";
smileyarr["46"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S8f7Dj81qeI/AAAAAAAAByM/kIGHDxmKm8k/clever66.gif";

smileyarr["48"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S8f7EPPLAkI/AAAAAAAAByU/vzhy2SKWPrc/devil_angel.gif";

smileyarr["50"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S8f7EsIZXjI/AAAAAAAAByc/2o4fweQQR3o/dont_make_me_mad.gif";
smileyarr["51"]="http://lh6.ggpht.com/_EM7uwS4HSZU/S8f7lDxWHxI/AAAAAAAAByg/OvLZzG_rtnU/eggnog.gif";
smileyarr["52"]="http://lh5.ggpht.com/_EM7uwS4HSZU/S8f7lMNdSFI/AAAAAAAAByk/R9nOLy5_Www/embarrassed.gif";

smileyarr["133"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S8f8a-N1fCI/AAAAAAAABzU/HSeLCfmAWdI/eyes_text.gif";
smileyarr["134"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S8f8bLHgimI/AAAAAAAABzY/miRDyu4Zm5s/fantastic_2.gif";
smileyarr["135"]="http://lh5.ggpht.com/_EM7uwS4HSZU/S8f811oeXsI/AAAAAAAABzc/oRmJTHTOa5M/feeling_blue_3.gif";
smileyarr["136"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S8f81-2I__I/AAAAAAAABzg/JCYzyTcwAJ4/glasses_hand2.gif";
smileyarr["137"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S8f82FcMp7I/AAAAAAAABzk/AAbtdgINcnY/good-news-175.gif";
smileyarr["138"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S8f82aDTHaI/AAAAAAAABzo/3GXfQ-gc31U/happy_toast2.gif";
smileyarr["140"]="http://lh6.ggpht.com/_EM7uwS4HSZU/S8f9VBJWDUI/AAAAAAAABzw/k-o_JBNUgKo/hello1.GIF";
smileyarr["236"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S8f9hhgNL9I/AAAAAAAAB0M/wUdfRG6QEoo/love_you5.gif";
smileyarr["237"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S8f9h7vNmzI/AAAAAAAAB0Q/4_QgfO2C7mw/moan2.gif";
smileyarr["244"]="http://lh5.ggpht.com/_EM7uwS4HSZU/S8f9vqX71iI/AAAAAAAAB0Y/DMZ-eh8lFpA/nana_3.gif";
smileyarr["245"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S8f9v_LwBrI/AAAAAAAAB0c/8frdJYElQjU/night_candle_text.gif";
smileyarr["246"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S8f9vzS1gbI/AAAAAAAAB0g/35rWLy5-tMo/oh_well2.gif";
smileyarr["247"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S8f9wXcK0sI/AAAAAAAAB0k/SZYgPuxOVIs/ooo_thats_bad.gif";
smileyarr["249"]="http://lh6.ggpht.com/_EM7uwS4HSZU/S8f9_N8KnkI/AAAAAAAAB0s/jmyI8ket1UI/rose_f166.gif";
smileyarr["251"]="http://lh5.ggpht.com/_EM7uwS4HSZU/S8f9_VPcynI/AAAAAAAAB00/yEfQ3xFYQ4s/terrific.gif";
smileyarr["252"]="http://lh6.ggpht.com/_EM7uwS4HSZU/S8f9_enxHkI/AAAAAAAAB04/xe5x49X9qws/that_sucks.gif";
smileyarr["254"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S8f-J3bI8eI/AAAAAAAAB1A/ih9BnazPTiE/valentine_05_text.gif";
smileyarr["255"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S8f-J6Sxe0I/AAAAAAAAB1E/PjzQI8VlheM/wee_hee.gif";
smileyarr["256"]="http://lh5.ggpht.com/_EM7uwS4HSZU/S8f-KA15gcI/AAAAAAAAB1I/j2doLZYEhEk/whatsup_2.gif";
smileyarr["257"]="http://lh5.ggpht.com/_EM7uwS4HSZU/S8f-KESp-LI/AAAAAAAAB1M/_rh3J7IfRs0/whoo.gif";
smileyarr["258"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S8f-KroRVsI/AAAAAAAAB1Q/n3LrurlJ7y4/words.gif";
smileyarr["260"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S8f-UdXiZ3I/AAAAAAAAB1Y/zQ53p_o_WS4/zd_bye_3.gif";
smileyarr["261"]="http://lh5.ggpht.com/_EM7uwS4HSZU/S8f-UUdYOGI/AAAAAAAAB1c/4tR7420uGJk/zd_help_4_movebig.gif";
smileyarr["262"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S8f-UizySLI/AAAAAAAAB1g/sn14512QBcs/zf_uh_2c_silly.gif";
smileyarr["53"]="http://lh6.ggpht.com/_EM7uwS4HSZU/S8f7lVy9A1I/AAAAAAAAByo/U6a1gWLV0aM/emot43_hello.gif";
smileyarr["54"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S8f7le3iWSI/AAAAAAAABys/IhqR_Id02WM/emot46_thanks.gif";
smileyarr["132"]="http://lh6.ggpht.com/_EM7uwS4HSZU/S8f8a-F7hOI/AAAAAAAABzQ/53PnRo7Jia8/escribiendo_xoxo.gif";
smileyarr["141"]="http://lh6.ggpht.com/_EM7uwS4HSZU/S8f9VdR5obI/AAAAAAAABz0/WCyeAEWYVbY/hello.gif";
smileyarr["234"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S8f9hF7vbdI/AAAAAAAAB0E/z3CvRb4FK_A/kick.gif";
smileyarr["235"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S8f9hTQfasI/AAAAAAAAB0I/Wt7zm5WbORM/let-s-party-084.gif";
smileyarr["55"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S8f7ltuy0bI/AAAAAAAAByw/9853ToEOuhY/Emoticon%20%2847%29.gif";
smileyarr["56"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S8f8J52AqxI/AAAAAAAABy0/3qzHWpUTcT8/Emoticon%20%28123%29.gif";
smileyarr["57"]="http://lh5.ggpht.com/_EM7uwS4HSZU/S8f8KPY5aiI/AAAAAAAABy4/5nN3So2Fy_k/Emoticon%20%28189%29.gif";
smileyarr["58"]="http://lh5.ggpht.com/_EM7uwS4HSZU/S8f8KI7pb5I/AAAAAAAABy8/edcrvcVzzzA/Emoticon%20%28190%29.gif";
smileyarr["59"]="http://lh6.ggpht.com/_EM7uwS4HSZU/S8f8KZDVuFI/AAAAAAAABzA/p1WaeTc-cL4/Emoticon%20%28195%29.gif";
smileyarr["60"]="http://lh6.ggpht.com/_EM7uwS4HSZU/S8f8KllEIYI/AAAAAAAABzE/HAPJyCtHJ1Y/Emoticon%20%28202%29.gif";
smileyarr["61"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S8f8asrOz2I/AAAAAAAABzI/6Xv5yiWelws/Emoticon%20%28207%29.gif";
smileyarr["62"]="http://lh5.ggpht.com/_EM7uwS4HSZU/S8f8ansj08I/AAAAAAAABzM/byfyZP3Sh-c/Emoticon%20%28371%29.gif";



smileyarr["139"]="http://lh6.ggpht.com/_EM7uwS4HSZU/S8f82uhwfkI/AAAAAAAABzs/I421KnKTiYc/happy-anniversary-055.gif";

smileyarr["233"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S8f9VheF4HI/AAAAAAAAB0A/8gIJDfI2Mdg/Jubmo%20Emoticon%20%28235%29.gif";

smileyarr["243"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S8f9h2aIufI/AAAAAAAAB0U/UR27sLWarT8/MSN-Emoticon-woohoo-210.gif";

smileyarr["250"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S8f9_F4bcfI/AAAAAAAAB0w/0uNR_BM-26E/tamponOK.gif";
smileyarr["253"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S8f9_jle45I/AAAAAAAAB08/2GsUHzNfBIk/trashcan-112.gif";





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

// Subedaar's script