// ==UserScript==
// @name          Emoticons by Trunks 1.3
// @author	      Trunks =D
// @description   Usar antigos emoticons do orkut
// @include       htt*://*.orkut.*/*
// @exclude       http://*.orkut.*/Main#*
// @exclude       http://*.orkut.gmodules.*
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
	
	smileyarr["Smile"]="http://lh3.ggpht.com/_0CPPET7JZ5A/Sx5rdxCBHKI/AAAAAAAAALc/lFq6Eb1Lh08/s400/i_smile.png";
    
	smileyarr["Sad"]="http://lh5.ggpht.com/_0CPPET7JZ5A/Sx5rWAZC87I/AAAAAAAAALQ/IZZyjW6UoYs/s400/i_sad.png";
	
	smileyarr["Big Smile"]="http://lh3.ggpht.com/_0CPPET7JZ5A/Sx5qmaBnx3I/AAAAAAAAAKU/Povu1UUyI4c/s400/i_bigsmile.png";
    
	smileyarr["Surprise"]="http://lh5.ggpht.com/_0CPPET7JZ5A/Sx5s-WWdzFI/AAAAAAAAAMA/NeVHfYAuZoo/s400/i_surprise.png";
	
	smileyarr["Funny"]="http://lh4.ggpht.com/_0CPPET7JZ5A/Sx5rBdB8D0I/AAAAAAAAALE/mpXKYwUhWZY/s400/i_funny.png";
    
	smileyarr["Cool"]="http://lh6.ggpht.com/_0CPPET7JZ5A/Sx5q27vIyaI/AAAAAAAAAKs/S4wt2Zoc8CM/s400/i_cool.png";
    
	smileyarr["Angry"]="http://lh6.ggpht.com/_0CPPET7JZ5A/Sx5qeTSywLI/AAAAAAAAAKI/3N70yMxGymY/s400/i_angry.png";
	
	smileyarr["Wink"]="http://lh3.ggpht.com/_0CPPET7JZ5A/Sx5vUY-btPI/AAAAAAAAAMY/sL6bdAe-8aw/s400/i_wink.png";    
	
	smileyarr["Confuse"]="http://lh4.ggpht.com/_0CPPET7JZ5A/Sx5qwGAx14I/AAAAAAAAAKg/w1jjVKPj16s/s400/i_confuse.png";
        
        smileyarr[":@"]="http://images.orkut.com/orkut/photos/OQAAAKnqEYRyAfUSUfc-prMHyvV1hhFotH7OMYi7wouYvgvvwnjwT8h4hEM17xhnaoZiv5JBXx5gxXDdrdNNtesHajwAm1T1UOB-7X-pxqHVhoB_1UshwQ_Kb_SO.jpg";

        smileyarr["(6)"]="http://images.orkut.com/orkut/photos/OQAAAA8rWKkb3r6X4FFOsKUMMPtmAUnupwPcIwPEO3QkP-Y7g70EYFsHZVURHDP05GXAXK_oAPfUtrCB2tqn5MkEU8UAm1T1UBOI5aeAZiS5OWFTQWH2UT_QNtMx.jpg";

        smileyarr["(6)"]="http://images.orkut.com/orkut/photos/OQAAALrOoXzihWP6KA3edxu5NzA_R2vnXEqD0b5eQwhI0LEQFX5tVG3yBi4GH0m8m3cnUjmpbjjfSfb_Gb2jybxIb0EAm1T1UF8aq1iiYcFGJjWXibQbgrZtpWiI.jpg";

    smileyarr["Choro"]="http://lh3.ggpht.com/_WUkykBFkZ3Y/Sj4mmvfC4GI/AAAAAAAAAs8/P-PKvuqtLWw/cry.gif";
	
	smileyarr["Naum"]="http://lh6.ggpht.com/_WUkykBFkZ3Y/SYhrUirj_4I/AAAAAAAAAJc/uw1X2_jXIGs/no.gif";
	
	smileyarr["Zangado"]="http://lh4.ggpht.com/_WUkykBFkZ3Y/SY1xXD1mwfI/AAAAAAAAAMo/m8zGJPaudM0/anger3.gif";
	
	smileyarr["Lalalala"]="http://lh4.ggpht.com/_WUkykBFkZ3Y/SZ7T-y4SOOI/AAAAAAAAAXc/JSnxW5Oki2c/sm59.gif";
        smileyarr["odio"]="http://lh3.ggpht.com/_0a7-1zwwB0A/S-Y8UopmYVI/AAAAAAAAAC4/tt-ACezg2Kc/angry19.gif";
        smileyarr["louco"]="http://lh3.ggpht.com/_0a7-1zwwB0A/S-Y8U-K9K4I/AAAAAAAAAC8/hZUYXPPAAg4/angry26.gif";
        smileyarr["diabinho"]="http://lh6.ggpht.com/_0a7-1zwwB0A/S-Y8U7DoJSI/AAAAAAAAADA/Nue0ot5fvmI/diablo.gif";
        smileyarr["Alegre"]="http://lh5.ggpht.com/_ntthC2Dtxzs/S-ZuTEUmWII/AAAAAAAAAGQ/s8xn8o7K4oQ/%3Bd.gif";
        smileyarr["furioso"]="http://lh4.ggpht.com/_0a7-1zwwB0A/S-Y8VNHty8I/AAAAAAAAADE/DD6Akv7CMEc/furious.gif";
        smileyarr["chorando"]="http://lh4.ggpht.com/_ntthC2Dtxzs/S-ZuTd4097I/AAAAAAAAAGU/IjaO8-ACebY/choro.gif";
        smileyarr["rindo"]="http://lh3.ggpht.com/_ntthC2Dtxzs/S-ZuTu9iGYI/AAAAAAAAAGc/UUxRwHk5XZY/rindo.gif"; 
        smileyarr["noob"]="http://lh4.ggpht.com/_ntthC2Dtxzs/S-ZuT37C26I/AAAAAAAAAGg/QKAYjMMyWSA/noob.gif"; 
        smileyarr["ok"]="http://lh3.ggpht.com/_ntthC2Dtxzs/S-ZuvM8c0RI/AAAAAAAAAHA/hn1WVo7kC8k/ok.gif"; 
        smileyarr["nem"]="http://lh3.ggpht.com/_ntthC2Dtxzs/S-ZumzD1G5I/AAAAAAAAAG4/Bm_6ZFFSzD8/nem.gif"; 
        smileyarr["lambe cú"]="http://lh3.ggpht.com/_ntthC2Dtxzs/S-Zum99ZB6I/AAAAAAAAAG0/qtBn0Qb6J2E/lambe.gif"; 
        smileyarr["kkk"]="http://lh5.ggpht.com/_ntthC2Dtxzs/S-ZumiiY03I/AAAAAAAAAGw/wPbfxGJXmgo/kkk.gif"; 
        smileyarr["fumar maconha"]="http://lh3.ggpht.com/_ntthC2Dtxzs/S-aML5TRi_I/AAAAAAAAAHI/s71R0w2HEwI/barro.gif";
        smileyarr["fuuuuuuuu"]="http://lh3.ggpht.com/_ntthC2Dtxzs/S-aMMLaQQNI/AAAAAAAAAHM/eNPz3IJugVU/fuuuuuu.gif";
        smileyarr["Risos"]="http://lh4.ggpht.com/_ntthC2Dtxzs/S-aMMHS949I/AAAAAAAAAHQ/YqgIMU6_pfk/kkkk.gif";
        smileyarr["LOL"]="http://lh6.ggpht.com/_ntthC2Dtxzs/S-aMMbQWi1I/AAAAAAAAAHU/qil_qSA3F5A/lol.gif";
        smileyarr["se mata"]="http://lh6.ggpht.com/_ntthC2Dtxzs/S-aMM9rk2II/AAAAAAAAAHY/GFeNCi2Bkdc/semata.png";
        smileyarr["s2"]="http://lh4.ggpht.com/_ntthC2Dtxzs/S-aMWTygs5I/AAAAAAAAAHg/NE6t5gCrOXY/s2.png";
        smileyarr["maconha"]="http://lh4.ggpht.com/_ntthC2Dtxzs/S-ZumcVw9oI/AAAAAAAAAGs/-YGLERodpYw/fumar.gif"; 
        smileyarr["_|_"]="http://lh3.ggpht.com/_ntthC2Dtxzs/S-ZumSkHx-I/AAAAAAAAAGo/HUf7x9vOt4w/dedo.png"; 
        smileyarr["xD"]="http://lh5.ggpht.com/_ntthC2Dtxzs/S-ZuTerFC3I/AAAAAAAAAGY/V1OQgT4on7Q/xd.gif"; 
        smileyarr["pokebola"]="http://lh5.ggpht.com/_0a7-1zwwB0A/S-Y8VbMFz8I/AAAAAAAAADI/x_6LE2ipIjg/guns10.gif";
        smileyarr["Diabinho"]="http://lh3.ggpht.com/_0a7-1zwwB0A/S-Zrll8OoAI/AAAAAAAAADQ/7xM0vheSXhU/lildevil.gif";
        smileyarr["peace sign"]="http://lh6.ggpht.com/vikysaran/R9p-SrQdyRI/AAAAAAAAA0U/LBuIUSIhBxI/s144/67.gif";
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
	smileyarr["lala2"]="http://lh6.ggpht.com/_ntthC2Dtxzs/S-aezP6LsdI/AAAAAAAAAIA/CdKlDdDB4tc/lala.gif";
	smileyarr["pera"]="http://lh5.ggpht.com/_ntthC2Dtxzs/S-aezetB6xI/AAAAAAAAAIE/1azCtI4OvlQ/pera.gif";
	smileyarr["sexo"]="http://lh6.ggpht.com/_ntthC2Dtxzs/S-aezcPinMI/AAAAAAAAAII/g4REVNqQ10g/sexo.gif";
	smileyarr["riaria"]="http://lh6.ggpht.com/_ntthC2Dtxzs/S-aezlpd05I/AAAAAAAAAIM/r_IlKZzXePA/riariaria.gif";
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
	smileyarr["cow"]="http://lh3.google.com/fenil.rulez/SCKij6ghSAI/AAAAAAAAAP8/w6YHjrbX7bc/50.gif";
	smileyarr["pig"]="http://lh3.google.com/fenil.rulez/SCKij6ghSBI/AAAAAAAAAQE/XsU2AA0wf_o/49.gif";
	smileyarr["dog"]="http://lh3.google.com/fenil.rulez/SCKij6ghSCI/AAAAAAAAAQM/_JxH2hvgM1s/108.gif";
	smileyarr["star"]="http://lh5.google.com/fenil.rulez/SCKiuaghSDI/AAAAAAAAAQU/iBH0R9P2HAk/79.gif";
	smileyarr["OD"]="http://lh5.google.com/fenil.rulez/SCKiuaghSEI/AAAAAAAAAQc/43VMyQoVtQc/72.gif";
	smileyarr["FENIL"]="http://lh6.google.com/fenil.rulez/SCKiuqghSFI/AAAAAAAAAQk/hKMJpiqV0a8/73.gif";
	smileyarr["NIYATI"]="http://lh6.google.com/fenil.rulez/SCKiuqghSGI/AAAAAAAAAQs/FSLkAll9vgg/74.gif";
	smileyarr["pirate"]="http://lh6.google.com/fenil.rulez/SCKizqghSHI/AAAAAAAAAQ0/xuO3al_YRfg/pirate_2.gif";
	smileyarr["alien"]="http://lh5.google.com/fenil.rulez/SCKjRaghSJI/AAAAAAAAARE/u68DVv1I9ks/61.gif";
	smileyarr["bee"]="http://lh6.google.com/fenil.rulez/SCKjRqghSKI/AAAAAAAAARM/cyg71VQRdaQ/115.gif";
	smileyarr["pumpkin"]="http://lh6.google.com/fenil.rulez/SCKjRqghSLI/AAAAAAAAARU/iyJGgK_dpnA/56.gif";
	smileyarr["FF rulez"]="http://lh4.google.com/fenil.rulez/SCMiK6ghThI/AAAAAAAAAcI/656o_XLJlVQ/infomilies14.gif";        



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

//