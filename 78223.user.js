// ==UserScript==
// @name           Mega Orkut smileys
// @namespace     http://www.orkut.co.in/Main#Profile?uid=3460094999052775382
// @author	Dheeraj Shah
// @description   Made this just for fun :D (please respect the creator of this smiley)..
// @include       htt*://*.orkut.*/*
// @exclude       http://*.orkut.gmodules.*
// ==/UserScript==

/********************************************************
//smileys appear below the reply box as well.
//Original Base script by Mr.kewl
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
smileyarr["Animated smileys"]="http://lh3.ggpht.com/_Yg003HyxRmE/SyN3bCULsBI/AAAAAAAAACs/MO8kBBirB_U/s400/animated.JPG";
	smileyarr["CoolAnim"]="http://lh4.ggpht.com/_Ajoc8AujQC0/SvAqJZpO4iI/AAAAAAAAAN4/8M9dSIgWfA8/s400/i_cool.png";
	smileyarr["SadAnim"]="http://lh6.ggpht.com/_Ajoc8AujQC0/St1qhOu8rRI/AAAAAAAAAKQ/pcvCiQrAFvs/s400/i_sad.png";
	smileyarr["AngryAnim"]="http://lh6.ggpht.com/_Ajoc8AujQC0/St1viCDcCKI/AAAAAAAAAKY/ZIEuF_qdqvo/s400/i_angry.png";
	smileyarr["SmileAnim"]="http://lh6.ggpht.com/_Ajoc8AujQC0/St2LOwuB5QI/AAAAAAAAALw/miyNfnfvj-U/s400/i_smile.png";
	smileyarr["WinkAnim"]="http://lh6.ggpht.com/_Ajoc8AujQC0/SvAx7TnUWMI/AAAAAAAAAOI/69ETthREJFo/s400/i_wink.png";
	smileyarr["Big SmileAnim"]="http://lh5.ggpht.com/_Ajoc8AujQC0/SvAiPxQ1n_I/AAAAAAAAANw/IVp5-BIj18Y/s400/i_bigsmile.png";



smileyarr["Old Smileys"]="http://lh5.ggpht.com/_Yg003HyxRmE/SyN3kdpgv5I/AAAAAAAAADM/JwW-o0YPwe8/s400/old.JPG";
smileyarr["Cool"]="http://img1.orkut.com/img/i_cool.gif";
	smileyarr["Sad"]="http://img1.orkut.com/img/i_sad.gif";
	smileyarr["Angry"]="http://img1.orkut.com/img/i_angry.gif";
	smileyarr["Smile"]="http://img1.orkut.com/img/i_smile.gif";
	smileyarr["Wink"]="http://img1.orkut.com/img/i_wink.gif";
	smileyarr["Big Smile"]="http://img1.orkut.com/img/i_bigsmile.gif";
	smileyarr["Surprise"]="http://img1.orkut.com/img/i_surprise.gif";
	smileyarr["Funny"]="http://img1.orkut.com/img/i_funny.gif";
	smileyarr["Confuse"]="http://img1.orkut.com/img/i_confuse.gif";


       smileyarr["Yahoo! Smileys"]="http://lh4.ggpht.com/_Yg003HyxRmE/SyN3rDp8kUI/AAAAAAAAADc/l_4BS8ZS2S4/s400/yahoo.JPG";

smileyarr["hehe"]="http://lh6.google.com/fenil.rulez/SCKffqghQvI/AAAAAAAAAF0/UYVeu8yK6AY/0.gif";
	smileyarr["smile"]="http://lh6.google.com/fenil.rulez/SCKffqghQwI/AAAAAAAAAF8/OF26gKUCd_U/1.gif";
	smileyarr["sad"]="http://lh6.google.com/fenil.rulez/SCKffqghQxI/AAAAAAAAAGE/RrOvlLjQ2j4/2.gif";
	smileyarr["wink"]="http://lh3.google.com/fenil.rulez/SCKff6ghQyI/AAAAAAAAAGM/fNm7w9DW95w/3.gif";
	smileyarr["grin"]="http://lh3.google.com/fenil.rulez/SCKff6ghQzI/AAAAAAAAAGU/HPQQ4jyNqf8/4.gif";
	smileyarr["batting eyelashes"]="http://lh5.google.com/fenil.rulez/SCKfmaghQ0I/AAAAAAAAAGc/AgaNXqqXGbo/5.gif";
	smileyarr["hug"]="http://lh5.google.com/fenil.rulez/SCKfmaghQ1I/AAAAAAAAAGk/4Qa-FNOLtCY/6.gif";
	smileyarr["confuse"]="http://lh5.google.com/fenil.rulez/SCKfmaghQ2I/AAAAAAAAAGs/PtzYfpMGMxM/7.gif";
	smileyarr["love struck"]="http://lh5.google.com/fenil.rulez/SCKfmaghQ3I/AAAAAAAAAG0/MQkeAyScx4k/8.gif";
	smileyarr["blush"]="http://lh5.google.com/fenil.rulez/SCKfmaghQ4I/AAAAAAAAAG8/_LD2CzWH4dg/9.gif";
	smileyarr["funny"]="http://lh4.google.com/fenil.rulez/SCKf2KghQ5I/AAAAAAAAAHE/Jw2dObqME8c/10.gif";
	smileyarr["kiss"]="http://lh5.google.com/fenil.rulez/SCKf2aghQ6I/AAAAAAAAAHM/6MhueuDt_Es/11.gif";
	smileyarr["broken heart"]="http://lh5.google.com/fenil.rulez/SCKf2aghQ7I/AAAAAAAAAHU/BTYYh16WnW0/12.gif";
	smileyarr["surprise"]="http://lh6.google.com/fenil.rulez/SCKf2qghQ8I/AAAAAAAAAHc/LO22pD6pJxM/13.gif";
	smileyarr["angry"]="http://lh6.google.com/fenil.rulez/SCKf2qghQ9I/AAAAAAAAAHk/2RzHLFyzD1o/14.gif";
	smileyarr["smug"]="http://lh6.google.com/fenil.rulez/SCKf8qghQ-I/AAAAAAAAAHs/5eawzApIf1Q/15.gif";
	smileyarr["cool"]="http://lh6.google.com/fenil.rulez/SCKf8qghQ_I/AAAAAAAAAH0/JLRMTa_-Z8E/16.gif";
	smileyarr["worried"]="http://lh3.google.com/fenil.rulez/SCKf86ghRAI/AAAAAAAAAH8/dDF9fAkyOWs/17.gif";
	smileyarr["whew"]="http://lh3.google.com/fenil.rulez/SCKf86ghRBI/AAAAAAAAAIE/p0YlwTd1NZQ/18.gif";
	smileyarr["devil"]="http://lh3.google.com/fenil.rulez/SCKf86ghRCI/AAAAAAAAAIM/gt9_-w4PEHo/19.gif";
	smileyarr["cry"]="http://lh6.google.com/fenil.rulez/SCKgSqghRDI/AAAAAAAAAIU/UD4poyt8IA0/20.gif";
	smileyarr["laugh"]="http://lh6.google.com/fenil.rulez/SCKgSqghREI/AAAAAAAAAIc/uDBr8ILYSac/21.gif";
	smileyarr["straight face"]="http://lh6.google.com/fenil.rulez/SCKgSqghRFI/AAAAAAAAAIk/_yv_bISAVTg/22.gif";
	smileyarr["^ eyebrow"]="http://lh6.google.com/fenil.rulez/SCKgSqghRGI/AAAAAAAAAIs/hcOQnPcKTEc/23.gif";
	smileyarr["laughin on floor"]="http://lh6.google.com/fenil.rulez/SCKgSqghRHI/AAAAAAAAAI0/rswbPIMWhdI/24.gif";
	smileyarr["angel"]="http://lh6.google.com/fenil.rulez/SCKgeqghRII/AAAAAAAAAI8/bZydrIWQdmo/25.gif";
	smileyarr["nerd"]="http://lh3.google.com/fenil.rulez/SCKge6ghRJI/AAAAAAAAAJE/JkANsPSF-wc/26.gif";
	smileyarr["tlk 2 hand"]="http://lh4.google.com/fenil.rulez/SCKgfKghRKI/AAAAAAAAAJM/qXdz1dAhxlw/27.gif";
	smileyarr["sleep"]="http://lh4.google.com/fenil.rulez/SCKgfKghRLI/AAAAAAAAAJU/MDQVCTa75Mk/28.gif";
	smileyarr["rolling eyes"]="http://lh4.google.com/fenil.rulez/SCKgfKghRMI/AAAAAAAAAJc/v-Kmy0eC-Xw/29.gif";
	smileyarr["loser"]="http://lh3.google.com/fenil.rulez/SCKgt6ghRNI/AAAAAAAAAJk/jjHTzc_e_qA/30.gif";
	smileyarr["sick"]="http://lh3.google.com/fenil.rulez/SCKgt6ghROI/AAAAAAAAAJs/EUM87MtkPcw/31.gif";
	smileyarr["secret"]="http://lh3.google.com/fenil.rulez/SCKgt6ghRPI/AAAAAAAAAJ0/kESMqGEH3Aw/32.gif";
	smileyarr["not tlking"]="http://lh4.google.com/fenil.rulez/SCKguKghRQI/AAAAAAAAAJ8/RahDhhvSfqU/33.gif";
	smileyarr["clown"]="http://lh4.google.com/fenil.rulez/SCKguKghRRI/AAAAAAAAAKE/qR8khSq_IDI/34.gif";
	smileyarr["crazy"]="http://lh4.google.com/fenil.rulez/SCKg0KghRSI/AAAAAAAAAKM/U3wnnFYbK68/35.gif";
	smileyarr["party"]="http://lh4.google.com/fenil.rulez/SCKg0KghRTI/AAAAAAAAAKU/QmD2xZqsiO4/36.gif";
	smileyarr["yawn"]="http://lh6.google.com/fenil.rulez/SCKg0qghRUI/AAAAAAAAAKc/CyvdJ2EN6zE/37.gif";
	smileyarr["droolin"]="http://lh6.google.com/fenil.rulez/SCKg0qghRVI/AAAAAAAAAKk/uP4Zw96zIDM/38.gif";
	smileyarr["thinking"]="http://lh6.google.com/fenil.rulez/SCKg0qghRWI/AAAAAAAAAKs/YX47RqhdSJM/39.gif";
	smileyarr["doh"]="http://lh4.google.com/fenil.rulez/SCKg5KghRXI/AAAAAAAAAK0/cKkTi1jPq24/40.gif";
	smileyarr["applause"]="http://lh4.google.com/fenil.rulez/SCKg5KghRYI/AAAAAAAAAK8/vtOMcxyMuJg/41.gif";
	smileyarr["very worried"]="http://lh4.google.com/fenil.rulez/SCKg5KghRZI/AAAAAAAAALE/tVxhLY_BZ3M/42.gif";
	smileyarr["hypno"]="http://lh5.google.com/fenil.rulez/SCKg5aghRaI/AAAAAAAAALM/iEuJuemA07U/43.gif";
	smileyarr["liar"]="http://lh5.google.com/fenil.rulez/SCKg5aghRbI/AAAAAAAAALU/dbfTALWwiT0/44.gif";
	smileyarr["waiting"]="http://lh6.google.com/fenil.rulez/SCKhSqghRcI/AAAAAAAAALc/8gnITHRPong/45.gif";
	smileyarr["sigh"]="http://lh6.google.com/fenil.rulez/SCKhSqghRdI/AAAAAAAAALk/EK6qB1q8Uy0/46.gif";
	smileyarr["phbbt"]="http://lh6.google.com/fenil.rulez/SCKhSqghReI/AAAAAAAAALs/1lfHD5RCXU4/47.gif";
	smileyarr["cowboy"]="http://lh6.google.com/fenil.rulez/SCKhSqghRfI/AAAAAAAAAL0/gPof1Tpjfuc/48.gif";
	smileyarr["on call"]="http://lh6.google.com/fenil.rulez/SCKhSqghRgI/AAAAAAAAAL8/1GAtlnCiQWk/100.gif";
	smileyarr["call me"]="http://lh3.google.com/fenil.rulez/SCKha6ghRhI/AAAAAAAAAME/LPvQj4kHnOo/101.gif";
	smileyarr["irritated"]="http://lh3.google.com/fenil.rulez/SCKha6ghRiI/AAAAAAAAAMM/bwvltzLcjT8/102.gif";
	smileyarr["bye"]="http://lh3.google.com/fenil.rulez/SCKha6ghRjI/AAAAAAAAAMU/Alz7wy5Xu04/103.gif";
	smileyarr["time up"]="http://lh3.google.com/fenil.rulez/SCKha6ghRkI/AAAAAAAAAMc/esXzY4CYEHI/104.gif";
	smileyarr["day dreaming"]="http://lh4.google.com/fenil.rulez/SCKhbKghRlI/AAAAAAAAAMk/z0lmJ3l6DGc/105.gif";
	smileyarr["dun wanna see"]="http://lh5.google.com/fenil.rulez/SCKhraghRmI/AAAAAAAAAMs/Fwrq_98xe1Q/109.gif";
	smileyarr["hurry up"]="http://lh5.google.com/fenil.rulez/SCKhraghRnI/AAAAAAAAAM0/4tlsUt1H15E/110.gif";
	smileyarr["rock on"]="http://lh5.google.com/fenil.rulez/SCKhraghRoI/AAAAAAAAAM8/jWTex2apZzA/111.gif";
	smileyarr["thumbs down"]="http://lh5.google.com/fenil.rulez/SCKhraghRpI/AAAAAAAAANE/wMusLZLd9Wo/112.gif";
	smileyarr["thumbs up"]="http://lh5.google.com/fenil.rulez/SCKhraghRqI/AAAAAAAAANM/X4VuXKdVZP4/113.gif";
	smileyarr["i dunno"]="http://lh4.google.com/fenil.rulez/SCKh3KghRrI/AAAAAAAAANU/HKXemLzafrM/114.gif";
	smileyarr["bow"]="http://lh4.google.com/fenil.rulez/SCKh3KghRsI/AAAAAAAAANc/BjLIjfIk_zE/77.gif";
	smileyarr["chatterbox"]="http://lh5.google.com/fenil.rulez/SCKh3aghRtI/AAAAAAAAANk/r0_gLsT6MDs/76.gif";
	smileyarr["bring it on"]="http://lh5.google.com/fenil.rulez/SCKh3aghRuI/AAAAAAAAANs/yNwr8jdeMw8/70.gif";
	smileyarr["whistling"]="http://lh3.google.com/fenil.rulez/SCKiA6ghRvI/AAAAAAAAAN0/O3ukMSdjbj8/65.gif";
	smileyarr["money eyes"]="http://lh3.google.com/fenil.rulez/SCKiA6ghRwI/AAAAAAAAAN8/UAHgEDYtTWw/64.gif";
	smileyarr["pray"]="http://lh3.google.com/fenil.rulez/SCKiA6ghRxI/AAAAAAAAAOE/38xlLa3ILqM/63.gif";
	smileyarr["frustated"]="http://lh4.google.com/fenil.rulez/SCKiBKghRyI/AAAAAAAAAOM/Q1yj6LxCP0I/62.gif";
	smileyarr["dancing"]="http://lh4.google.com/fenil.rulez/SCKiBKghRzI/AAAAAAAAAOU/SYJMOwMAH_c/69.gif";
	smileyarr["not listening"]="http://lh5.google.com/fenil.rulez/SCKiNaghR0I/AAAAAAAAAOc/m7RffpUIJpk/107.gif";
	smileyarr["shame on u"]="http://lh5.google.com/fenil.rulez/SCKiNaghR1I/AAAAAAAAAOk/eVg86YsoBSU/68.gif";
	smileyarr["oh cum on"]="http://lh6.google.com/fenil.rulez/SCKiNqghR2I/AAAAAAAAAOs/iHZJL67ip7M/78.gif";
	smileyarr["no idea"]="http://lh6.google.com/fenil.rulez/SCKiNqghR3I/AAAAAAAAAO0/dUXWpcCbpOE/106.gif";
	smileyarr["feelin beat up"]="http://lh6.google.com/fenil.rulez/SCKiNqghR4I/AAAAAAAAAO8/Wdr6l6Amf_o/66.gif";
	smileyarr["bug"]="http://lh5.google.com/fenil.rulez/SCKiaaghR5I/AAAAAAAAAPE/YYuluyCX5UY/60.gif";
	smileyarr["skul"]="http://lh5.google.com/fenil.rulez/SCKiaaghR6I/AAAAAAAAAPM/EXs0tfktP1w/59.gif";
	smileyarr["idea"]="http://lh5.google.com/fenil.rulez/SCKiaaghR7I/AAAAAAAAAPU/5WeIQHQnrbU/58.gif";
	smileyarr["goodluck"]="http://lh5.google.com/fenil.rulez/SCKiaaghR8I/AAAAAAAAAPc/yUzmMqalQCQ/54.gif";
	smileyarr["rose"]="http://lh6.google.com/fenil.rulez/SCKiaqghR9I/AAAAAAAAAPk/YWmvdaDqu_k/53.gif";
	smileyarr["chic"]="http://lh6.google.com/fenil.rulez/SCKijqghR-I/AAAAAAAAAPs/tCSQaPDPR8U/52.gif";
	smileyarr["monkey"]="http://lh6.google.com/fenil.rulez/SCKijqghR_I/AAAAAAAAAP0/e_0FWxWoC1A/51.gif";
	smileyarr["cow"]="http://lh3.google.com/fenil.rulez/SCKij6ghSAI/AAAAAAAAAP8/w6YHjrbX7bc/50.gif";
	smileyarr["pig"]="http://lh3.google.com/fenil.rulez/SCKij6ghSBI/AAAAAAAAAQE/XsU2AA0wf_o/49.gif";
	smileyarr["dog"]="http://lh3.google.com/fenil.rulez/SCKij6ghSCI/AAAAAAAAAQM/_JxH2hvgM1s/108.gif";
	smileyarr["star"]="http://lh5.google.com/fenil.rulez/SCKiuaghSDI/AAAAAAAAAQU/iBH0R9P2HAk/79.gif";
	smileyarr["OD"]="http://lh5.google.com/fenil.rulez/SCKiuaghSEI/AAAAAAAAAQc/43VMyQoVtQc/72.gif";
	smileyarr["FENIL"]="http://lh6.google.com/fenil.rulez/SCKiuqghSFI/AAAAAAAAAQk/hKMJpiqV0a8/73.gif";
	smileyarr["NIYATI"]="http://lh6.google.com/fenil.rulez/SCKiuqghSGI/AAAAAAAAAQs/FSLkAll9vgg/74.gif";
	smileyarr["pirate"]="http://lh6.google.com/fenil.rulez/SCKizqghSHI/AAAAAAAAAQ0/xuO3al_YRfg/pirate_2.gif";
	smileyarr["transformer"]="http://lh6.google.com/fenil.rulez/SCKizqghSII/AAAAAAAAAQ8/kby9xg6pFoI/transformer.gif";
	smileyarr["alien"]="http://lh5.google.com/fenil.rulez/SCKjRaghSJI/AAAAAAAAARE/u68DVv1I9ks/61.gif";
	smileyarr["bee"]="http://lh6.google.com/fenil.rulez/SCKjRqghSKI/AAAAAAAAARM/cyg71VQRdaQ/115.gif";
	smileyarr["pumpkin"]="http://lh6.google.com/fenil.rulez/SCKjRqghSLI/AAAAAAAAARU/iyJGgK_dpnA/56.gif";
	smileyarr["tea"]="http://lh6.google.com/fenil.rulez/SCKjRqghSMI/AAAAAAAAARc/xxhTMrfSAqM/57.gif";
	smileyarr["FF rulez"]="http://lh4.google.com/fenil.rulez/SCMiK6ghThI/AAAAAAAAAcI/656o_XLJlVQ/infomilies14.gif";


smileyarr["amazed by soft"]="http://lh5.ggpht.com/_35QFSJ1vbCE/Skzi8VCHE6I/AAAAAAAAApM/Z1tLU2v0WZ4/s400/amazed.png";
	smileyarr["angry"]="http://lh3.ggpht.com/_35QFSJ1vbCE/SkzjAafV31I/AAAAAAAAApY/K8Q6DWNtA7U/s400/angry.png";
	smileyarr["beat_brick"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Skz1h1Zj2mI/AAAAAAAAAqU/gpoZC0l123A/s400/beat_brick.png";
	smileyarr["beat_plaster"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Skz1l4SvaLI/AAAAAAAAAqg/IC_FvTfO_VQ/s400/beat_plaster.png";
	smileyarr["beat_shot"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz1okyDecI/AAAAAAAAAqs/Hhgyi1HTij4/s400/beat_shot.png";
	smileyarr["beauty"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Skz1rmLNibI/AAAAAAAAAq4/EtLlGBoGCkw/s400/beauty.png";
	smileyarr["big_smile"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz1cc9UJgI/AAAAAAAAAqI/VJGV-6YjqhY/s400/big_smile.png";
	smileyarr["burn_joss_stick"]="http://lh5.ggpht.com/_35QFSJ1vbCE/Skz1y2wtD3I/AAAAAAAAArE/pVnolf3ngw0/s400/burn_joss_stick.png";
	smileyarr["canny"]="http://lh5.ggpht.com/_35QFSJ1vbCE/Skz18h7yCbI/AAAAAAAAArQ/E2N6mGAXGHw/s400/canny.png";
	smileyarr["choler"]="http://lh5.ggpht.com/_35QFSJ1vbCE/Skz1_LLERAI/AAAAAAAAArc/VPvJabfQgwU/s400/choler.png";
	smileyarr["cold"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz2BsNbjaI/AAAAAAAAAro/-uSEhA4V3LU/s400/cold.png";
	smileyarr["cool"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Skz2ErCl22I/AAAAAAAAAr0/rnsP1uuJMsI/s400/cool.png";
	smileyarr["cry"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz2HTAkUCI/AAAAAAAAAsA/8n_fdClKAfk/s400/cry.png";
	smileyarr["doubt"]="http://lh5.ggpht.com/_35QFSJ1vbCE/Skz2Jlh6gEI/AAAAAAAAAsM/u3rIA5ldFys/s400/doubt.png";
	smileyarr["dribble"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Skz2L_YD4MI/AAAAAAAAAsY/20DKZFsHxfg/s400/dribble.png";
	smileyarr["embarrassed"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz2OM0FEII/AAAAAAAAAsk/0ypVBJtz1S4/s400/embarrassed.png";
	smileyarr["go"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Skz2QTFSqwI/AAAAAAAAAsw/UPF-EEZ6Ucg/s400/go.png";
	smileyarr["haha"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz2SmzTjrI/AAAAAAAAAs8/StBb4_r8cbQ/s400/haha.png";
	smileyarr["look_down"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Skz2WthNAsI/AAAAAAAAAtI/-Mjdel2pOb0/s400/look_down.png";
	smileyarr["misdoubt"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Skz2axb4Y6I/AAAAAAAAAtg/DSU1GP6m4uI/s400/misdoubt.png";
	smileyarr["nosebleed"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Skz2dDFSkVI/AAAAAAAAAts/-cNgIReiF6U/s400/nosebleed.png";
	smileyarr["oh"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz2mCxRZbI/AAAAAAAAAuQ/CVz5EgU5vPU/s400/oh.png";
	smileyarr["pudency"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz2pAblhuI/AAAAAAAAAuc/T9T0ORSuA3U/s400/pudency.png";
	smileyarr["rap"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz2rl0nBSI/AAAAAAAAAuo/VxsnFfAC08M/s400/rap.png";
	smileyarr["shame"]="http://lh5.ggpht.com/_35QFSJ1vbCE/Skz23QN7rhI/AAAAAAAAAvk/eOeh-Cdj-8g/s400/shame.png";
	smileyarr["smile"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Skz294c_VxI/AAAAAAAAAv8/1aFFq074XDI/s400/smile.png";
	smileyarr["sure"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Skz25nsZ5yI/AAAAAAAAAvw/lUJxBBky9Bc/s400/sure.png";
	smileyarr["sweat"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Skz3B4cLrXI/AAAAAAAAAwI/HTyedK33PNA/s400/sweat.png";
	smileyarr["waaaht"]="http://lh5.ggpht.com/_35QFSJ1vbCE/Skz3FdSjT0I/AAAAAAAAAwU/4sdMHxrUH20/s400/waaaht.png";
	smileyarr["matrix"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Skz2YxnfRMI/AAAAAAAAAtU/pfkmwrNV6pE/s400/matrix.png";
	smileyarr["amazing"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Sk8aZlqSY9I/AAAAAAAAA1Y/tqyeq1S9oEg/s400/amazing.png";
	smileyarr["anger"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Sk8ab2p3Z9I/AAAAAAAAA1k/_jgTJ3OudRI/s400/anger.png";
	smileyarr["bad_egg"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Sk8ad20ACbI/AAAAAAAAA1w/o29w9ng-kP4/s400/bad_egg.png";
	smileyarr["bad_smile"]="http://lh5.ggpht.com/_35QFSJ1vbCE/Sk8ag7Z260I/AAAAAAAAA18/zkRALbPl8OA/s400/bad_smile.png";
	smileyarr["beaten"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Sk8ai6NRY6I/AAAAAAAAA2I/PZwgCUFd-lw/s400/beaten.png";
	smileyarr["big_smile1"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Sk8ak9Ao_QI/AAAAAAAAA2U/v34i0Lc5yE0/s400/big_smile1.png";
	smileyarr["black_heart"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Sk8am5UpicI/AAAAAAAAA2g/1G51x_Z4TWc/s400/black_heart.png";
	smileyarr["cry1"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Sk8apNH6DtI/AAAAAAAAA2s/tMlIYA2xXyU/s400/cry1.png";
	smileyarr["electric_shock"]="http://lh5.ggpht.com/_35QFSJ1vbCE/Sk8arFhNiwI/AAAAAAAAA24/ewmoGjDREEM/s400/electric_shock.png";
	smileyarr["exciting"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Sk8as15PxfI/AAAAAAAAA3E/TLc1UT-QjOA/s400/exciting.png";
	smileyarr["eyes_droped"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Sk8avXN-IaI/AAAAAAAAA3Q/pCFX0pVe6CI/s400/eyes_droped.png";
	smileyarr["girl"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Sk8ayFfsvhI/AAAAAAAAA3c/X9tfyr57Bcw/s400/girl.png";
	smileyarr["greedy"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Sk8a0VmZ-HI/AAAAAAAAA3o/9E9asixzxVE/s400/greedy.png";
	smileyarr["grimace"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Sk8a2hV6v5I/AAAAAAAAA30/uumVUCl2dXo/s400/grimace.png";
	smileyarr["haha1"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Sk8a5IpTZoI/AAAAAAAAA4A/a6RkXoHvr5g/s400/haha1.png";
	smileyarr["happy"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Sk8a7i50FzI/AAAAAAAAA4M/_nmcC0upFwA/s400/happy.png";
	smileyarr["horror"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Sk8a9cwRsSI/AAAAAAAAA4Y/wk6wJbOhJIc/s400/horror.png";
	smileyarr["money"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Sk8a_ZoJSZI/AAAAAAAAA4k/CHv7hVa300s/s400/money.png";
	smileyarr["nothing"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Skz2hhxg5DI/AAAAAAAAAt4/vkJv5qD5aBc/s400/nothing.png";
	smileyarr["nothing_to_say"]="http://lh5.ggpht.com/_35QFSJ1vbCE/Skz2j8J54sI/AAAAAAAAAuE/4PBD9yqmspQ/s400/nothing_to_say.png";
	smileyarr["red_heart"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz2uFepESI/AAAAAAAAAu0/fubgF8AAefM/s400/red_heart.png";
	smileyarr["scorn"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz2zU3ILvI/AAAAAAAAAvM/-H9ckSXPxmc/s400/scorn.png";
	smileyarr["secret_smile"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Skz21NBPS2I/AAAAAAAAAvY/2pLmY0flx9s/s400/secret_smile.png";
	smileyarr["shame1"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Sk8bCSxHGVI/AAAAAAAAA4w/l3uPvf8LtJw/s400/shame1.png";
	smileyarr["shocked"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Sk8bE7jtOkI/AAAAAAAAA48/Z9jWZVCvpow/s400/shocked.png";
	smileyarr["super_man"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Sk8bGyDnFmI/AAAAAAAAA5I/zJOWqcX5gd0/s400/super_man.png";
	smileyarr["the_iron_man"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Sk8bIx8XfKI/AAAAAAAAA5U/WJgeaJZrE9E/s400/the_iron_man.png";
	smileyarr["unhappy"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Sk8bLVkRExI/AAAAAAAAA5g/Tp3riIIinNA/s400/unhappy.png";
	smileyarr["victory"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Sk8bNeb6g1I/AAAAAAAAA5s/pDeNaNj36bg/s400/victory.png";


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

// kewl's script