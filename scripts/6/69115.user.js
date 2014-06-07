// ==UserScript==
// @name          Yahoo  smilies only (Small & big animated) for Orkut by Rajeev Raj.D
// @namespace     http://www.orkut.co.in/Main#Home
// @author		  Rajeev Raj.D
// @description   Yahoo  smilies only (Small & big animated) for Orkut. Just Made for Fun.
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

/*Yahoo small smilies*/
	smileyarr["Rajeev_hehe_1"]="http://lh6.google.com/fenil.rulez/SCKffqghQvI/AAAAAAAAAF0/UYVeu8yK6AY/0.gif";
	smileyarr["Rajeev_smile_1"]="http://lh6.google.com/fenil.rulez/SCKffqghQwI/AAAAAAAAAF8/OF26gKUCd_U/1.gif";
	smileyarr["Rajeev_sad_1"]="http://lh6.google.com/fenil.rulez/SCKffqghQxI/AAAAAAAAAGE/RrOvlLjQ2j4/2.gif";
	smileyarr["Rajeev_wink_1"]="http://lh3.google.com/fenil.rulez/SCKff6ghQyI/AAAAAAAAAGM/fNm7w9DW95w/3.gif";
	smileyarr["Rajeev_grin_1"]="http://lh3.google.com/fenil.rulez/SCKff6ghQzI/AAAAAAAAAGU/HPQQ4jyNqf8/4.gif";
	smileyarr["Rajeev_batting eyelashes_1"]="http://lh5.google.com/fenil.rulez/SCKfmaghQ0I/AAAAAAAAAGc/AgaNXqqXGbo/5.gif";
	smileyarr["Rajeev_hug_1"]="http://lh5.google.com/fenil.rulez/SCKfmaghQ1I/AAAAAAAAAGk/4Qa-FNOLtCY/6.gif";
	smileyarr["Rajeev_confuse_1"]="http://lh5.google.com/fenil.rulez/SCKfmaghQ2I/AAAAAAAAAGs/PtzYfpMGMxM/7.gif";
	smileyarr["Rajeev_love struck_1"]="http://lh5.google.com/fenil.rulez/SCKfmaghQ3I/AAAAAAAAAG0/MQkeAyScx4k/8.gif";
	smileyarr["Rajeev_blush_1"]="http://lh5.google.com/fenil.rulez/SCKfmaghQ4I/AAAAAAAAAG8/_LD2CzWH4dg/9.gif";
	smileyarr["Rajeev_funny_1"]="http://lh4.google.com/fenil.rulez/SCKf2KghQ5I/AAAAAAAAAHE/Jw2dObqME8c/10.gif";
	smileyarr["Rajeev_kiss_1"]="http://lh5.google.com/fenil.rulez/SCKf2aghQ6I/AAAAAAAAAHM/6MhueuDt_Es/11.gif";
	smileyarr["Rajeev_broken heart_1"]="http://lh5.google.com/fenil.rulez/SCKf2aghQ7I/AAAAAAAAAHU/BTYYh16WnW0/12.gif";
	smileyarr["Rajeev_surprise_1"]="http://lh6.google.com/fenil.rulez/SCKf2qghQ8I/AAAAAAAAAHc/LO22pD6pJxM/13.gif";
	smileyarr["Rajeev_angry_1"]="http://lh6.google.com/fenil.rulez/SCKf2qghQ9I/AAAAAAAAAHk/2RzHLFyzD1o/14.gif";
	smileyarr["Rajeev_smug_1"]="http://lh6.google.com/fenil.rulez/SCKf8qghQ-I/AAAAAAAAAHs/5eawzApIf1Q/15.gif";
	smileyarr["Rajeev_cool_1"]="http://lh6.google.com/fenil.rulez/SCKf8qghQ_I/AAAAAAAAAH0/JLRMTa_-Z8E/16.gif";
	smileyarr["Rajeev_worried_1"]="http://lh3.google.com/fenil.rulez/SCKf86ghRAI/AAAAAAAAAH8/dDF9fAkyOWs/17.gif";
	smileyarr["Rajeev_whew_1"]="http://lh3.google.com/fenil.rulez/SCKf86ghRBI/AAAAAAAAAIE/p0YlwTd1NZQ/18.gif";
	smileyarr["Rajeev_devil_1"]="http://lh3.google.com/fenil.rulez/SCKf86ghRCI/AAAAAAAAAIM/gt9_-w4PEHo/19.gif";
	smileyarr["Rajeev_cry_1"]="http://lh6.google.com/fenil.rulez/SCKgSqghRDI/AAAAAAAAAIU/UD4poyt8IA0/20.gif";
	smileyarr["Rajeev_laugh_1"]="http://lh6.google.com/fenil.rulez/SCKgSqghREI/AAAAAAAAAIc/uDBr8ILYSac/21.gif";
	smileyarr["Rajeev_straight face_1"]="http://lh6.google.com/fenil.rulez/SCKgSqghRFI/AAAAAAAAAIk/_yv_bISAVTg/22.gif";
	smileyarr["Rajeev_^ eyebrow_1"]="http://lh6.google.com/fenil.rulez/SCKgSqghRGI/AAAAAAAAAIs/hcOQnPcKTEc/23.gif";
	smileyarr["Rajeev_laughin on floor_1"]="http://lh6.google.com/fenil.rulez/SCKgSqghRHI/AAAAAAAAAI0/rswbPIMWhdI/24.gif";
	smileyarr["Rajeev_angel_1"]="http://lh6.google.com/fenil.rulez/SCKgeqghRII/AAAAAAAAAI8/bZydrIWQdmo/25.gif";
	smileyarr["Rajeev_nerd_1"]="http://lh3.google.com/fenil.rulez/SCKge6ghRJI/AAAAAAAAAJE/JkANsPSF-wc/26.gif";
	smileyarr["Rajeev_tlk 2 hand_1"]="http://lh4.google.com/fenil.rulez/SCKgfKghRKI/AAAAAAAAAJM/qXdz1dAhxlw/27.gif";
	smileyarr["Rajeev_sleep_1"]="http://lh4.google.com/fenil.rulez/SCKgfKghRLI/AAAAAAAAAJU/MDQVCTa75Mk/28.gif";
	smileyarr["Rajeev_rolling eyes_1"]="http://lh4.google.com/fenil.rulez/SCKgfKghRMI/AAAAAAAAAJc/v-Kmy0eC-Xw/29.gif";
	smileyarr["Rajeev_loser_1"]="http://lh3.google.com/fenil.rulez/SCKgt6ghRNI/AAAAAAAAAJk/jjHTzc_e_qA/30.gif";
	smileyarr["Rajeev_sick_1"]="http://lh3.google.com/fenil.rulez/SCKgt6ghROI/AAAAAAAAAJs/EUM87MtkPcw/31.gif";
	smileyarr["Rajeev_secret_1"]="http://lh3.google.com/fenil.rulez/SCKgt6ghRPI/AAAAAAAAAJ0/kESMqGEH3Aw/32.gif";
	smileyarr["Rajeev_not tlking_1"]="http://lh4.google.com/fenil.rulez/SCKguKghRQI/AAAAAAAAAJ8/RahDhhvSfqU/33.gif";
	smileyarr["Rajeev_clown_1"]="http://lh4.google.com/fenil.rulez/SCKguKghRRI/AAAAAAAAAKE/qR8khSq_IDI/34.gif";
	smileyarr["Rajeev_crazy_1"]="http://lh4.google.com/fenil.rulez/SCKg0KghRSI/AAAAAAAAAKM/U3wnnFYbK68/35.gif";
	smileyarr["Rajeev_party_1"]="http://lh4.google.com/fenil.rulez/SCKg0KghRTI/AAAAAAAAAKU/QmD2xZqsiO4/36.gif";
	smileyarr["Rajeev_yawn_1"]="http://lh6.google.com/fenil.rulez/SCKg0qghRUI/AAAAAAAAAKc/CyvdJ2EN6zE/37.gif";
	smileyarr["Rajeev_droolin_1"]="http://lh6.google.com/fenil.rulez/SCKg0qghRVI/AAAAAAAAAKk/uP4Zw96zIDM/38.gif";
	smileyarr["Rajeev_thinking_1"]="http://lh6.google.com/fenil.rulez/SCKg0qghRWI/AAAAAAAAAKs/YX47RqhdSJM/39.gif";
	smileyarr["Rajeev_doh_1"]="http://lh4.google.com/fenil.rulez/SCKg5KghRXI/AAAAAAAAAK0/cKkTi1jPq24/40.gif";
	smileyarr["Rajeev_applause_1"]="http://lh4.google.com/fenil.rulez/SCKg5KghRYI/AAAAAAAAAK8/vtOMcxyMuJg/41.gif";
	smileyarr["Rajeev_very worried_1"]="http://lh4.google.com/fenil.rulez/SCKg5KghRZI/AAAAAAAAALE/tVxhLY_BZ3M/42.gif";
	smileyarr["Rajeev_hypno_1"]="http://lh5.google.com/fenil.rulez/SCKg5aghRaI/AAAAAAAAALM/iEuJuemA07U/43.gif";
	smileyarr["Rajeev_liar_1"]="http://lh5.google.com/fenil.rulez/SCKg5aghRbI/AAAAAAAAALU/dbfTALWwiT0/44.gif";
	smileyarr["Rajeev_waiting_1"]="http://lh6.google.com/fenil.rulez/SCKhSqghRcI/AAAAAAAAALc/8gnITHRPong/45.gif";
	smileyarr["Rajeev_sigh_1"]="http://lh6.google.com/fenil.rulez/SCKhSqghRdI/AAAAAAAAALk/EK6qB1q8Uy0/46.gif";
	smileyarr["Rajeev_phbbt_1"]="http://lh6.google.com/fenil.rulez/SCKhSqghReI/AAAAAAAAALs/1lfHD5RCXU4/47.gif";
	smileyarr["Rajeev_cowboy_1"]="http://lh6.google.com/fenil.rulez/SCKhSqghRfI/AAAAAAAAAL0/gPof1Tpjfuc/48.gif";
	smileyarr["Rajeev_on call_1"]="http://lh6.google.com/fenil.rulez/SCKhSqghRgI/AAAAAAAAAL8/1GAtlnCiQWk/100.gif";
	smileyarr["Rajeev_call me_1"]="http://lh3.google.com/fenil.rulez/SCKha6ghRhI/AAAAAAAAAME/LPvQj4kHnOo/101.gif";
	smileyarr["Rajeev_irritated_1"]="http://lh3.google.com/fenil.rulez/SCKha6ghRiI/AAAAAAAAAMM/bwvltzLcjT8/102.gif";
	smileyarr["Rajeev_bye_1"]="http://lh3.google.com/fenil.rulez/SCKha6ghRjI/AAAAAAAAAMU/Alz7wy5Xu04/103.gif";
	smileyarr["Rajeev_time up_1"]="http://lh3.google.com/fenil.rulez/SCKha6ghRkI/AAAAAAAAAMc/esXzY4CYEHI/104.gif";
	smileyarr["Rajeev_day dreaming_1"]="http://lh4.google.com/fenil.rulez/SCKhbKghRlI/AAAAAAAAAMk/z0lmJ3l6DGc/105.gif";
	smileyarr["Rajeev_dun wanna see_1"]="http://lh5.google.com/fenil.rulez/SCKhraghRmI/AAAAAAAAAMs/Fwrq_98xe1Q/109.gif";
	smileyarr["Rajeev_hurry up_1"]="http://lh5.google.com/fenil.rulez/SCKhraghRnI/AAAAAAAAAM0/4tlsUt1H15E/110.gif";
	smileyarr["Rajeev_rock on_1"]="http://lh5.google.com/fenil.rulez/SCKhraghRoI/AAAAAAAAAM8/jWTex2apZzA/111.gif";
	smileyarr["Rajeev_thumbs down_1"]="http://lh5.google.com/fenil.rulez/SCKhraghRpI/AAAAAAAAANE/wMusLZLd9Wo/112.gif";
	smileyarr["Rajeev_thumbs up_1"]="http://lh5.google.com/fenil.rulez/SCKhraghRqI/AAAAAAAAANM/X4VuXKdVZP4/113.gif";
	smileyarr["Rajeev_i dunno_1"]="http://lh4.google.com/fenil.rulez/SCKh3KghRrI/AAAAAAAAANU/HKXemLzafrM/114.gif";
	smileyarr["Rajeev_bow_1"]="http://lh4.google.com/fenil.rulez/SCKh3KghRsI/AAAAAAAAANc/BjLIjfIk_zE/77.gif";
	smileyarr["Rajeev_chatterbox_1"]="http://lh5.google.com/fenil.rulez/SCKh3aghRtI/AAAAAAAAANk/r0_gLsT6MDs/76.gif";
	smileyarr["Rajeev_bring it on_1"]="http://lh5.google.com/fenil.rulez/SCKh3aghRuI/AAAAAAAAANs/yNwr8jdeMw8/70.gif";
	smileyarr["Rajeev_whistling_1"]="http://lh3.google.com/fenil.rulez/SCKiA6ghRvI/AAAAAAAAAN0/O3ukMSdjbj8/65.gif";
	smileyarr["Rajeev_money eyes_1"]="http://lh3.google.com/fenil.rulez/SCKiA6ghRwI/AAAAAAAAAN8/UAHgEDYtTWw/64.gif";
	smileyarr["Rajeev_pray_1"]="http://lh3.google.com/fenil.rulez/SCKiA6ghRxI/AAAAAAAAAOE/38xlLa3ILqM/63.gif";
	smileyarr["Rajeev_frustated_1"]="http://lh4.google.com/fenil.rulez/SCKiBKghRyI/AAAAAAAAAOM/Q1yj6LxCP0I/62.gif";
	smileyarr["Rajeev_dancing_1"]="http://lh4.google.com/fenil.rulez/SCKiBKghRzI/AAAAAAAAAOU/SYJMOwMAH_c/69.gif";
	smileyarr["Rajeev_not listening_1"]="http://lh5.google.com/fenil.rulez/SCKiNaghR0I/AAAAAAAAAOc/m7RffpUIJpk/107.gif";
	smileyarr["Rajeev_shame on u_1"]="http://lh5.google.com/fenil.rulez/SCKiNaghR1I/AAAAAAAAAOk/eVg86YsoBSU/68.gif";
	smileyarr["Rajeev_oh cum on_1"]="http://lh6.google.com/fenil.rulez/SCKiNqghR2I/AAAAAAAAAOs/iHZJL67ip7M/78.gif";
	smileyarr["Rajeev_no idea_1"]="http://lh6.google.com/fenil.rulez/SCKiNqghR3I/AAAAAAAAAO0/dUXWpcCbpOE/106.gif";
	smileyarr["Rajeev_feelin beat up_1"]="http://lh6.google.com/fenil.rulez/SCKiNqghR4I/AAAAAAAAAO8/Wdr6l6Amf_o/66.gif";
	smileyarr["Rajeev_bug_1"]="http://lh5.google.com/fenil.rulez/SCKiaaghR5I/AAAAAAAAAPE/YYuluyCX5UY/60.gif";
	smileyarr["Rajeev_skul_1"]="http://lh5.google.com/fenil.rulez/SCKiaaghR6I/AAAAAAAAAPM/EXs0tfktP1w/59.gif";
	smileyarr["Rajeev_idea_1"]="http://lh5.google.com/fenil.rulez/SCKiaaghR7I/AAAAAAAAAPU/5WeIQHQnrbU/58.gif";
	smileyarr["Rajeev_goodluck_1"]="http://lh5.google.com/fenil.rulez/SCKiaaghR8I/AAAAAAAAAPc/yUzmMqalQCQ/54.gif";
	smileyarr["Rajeev_rose_1"]="http://lh6.google.com/fenil.rulez/SCKiaqghR9I/AAAAAAAAAPk/YWmvdaDqu_k/53.gif";
	smileyarr["Rajeev_chic_1"]="http://lh6.google.com/fenil.rulez/SCKijqghR-I/AAAAAAAAAPs/tCSQaPDPR8U/52.gif";
	smileyarr["Rajeev_monkey_1"]="http://lh6.google.com/fenil.rulez/SCKijqghR_I/AAAAAAAAAP0/e_0FWxWoC1A/51.gif";
	smileyarr["Rajeev_cow_1"]="http://lh3.google.com/fenil.rulez/SCKij6ghSAI/AAAAAAAAAP8/w6YHjrbX7bc/50.gif";
	smileyarr["Rajeev_pig_1"]="http://lh3.google.com/fenil.rulez/SCKij6ghSBI/AAAAAAAAAQE/XsU2AA0wf_o/49.gif";
	smileyarr["Rajeev_dog_1"]="http://lh3.google.com/fenil.rulez/SCKij6ghSCI/AAAAAAAAAQM/_JxH2hvgM1s/108.gif";
	smileyarr["Rajeev_star_1"]="http://lh5.google.com/fenil.rulez/SCKiuaghSDI/AAAAAAAAAQU/iBH0R9P2HAk/79.gif";
	smileyarr["Rajeev_OD_1"]="http://lh5.google.com/fenil.rulez/SCKiuaghSEI/AAAAAAAAAQc/43VMyQoVtQc/72.gif";
	smileyarr["Rajeev_FENIL_1"]="http://lh6.google.com/fenil.rulez/SCKiuqghSFI/AAAAAAAAAQk/hKMJpiqV0a8/73.gif";
	smileyarr["Rajeev_NIYATI_1"]="http://lh6.google.com/fenil.rulez/SCKiuqghSGI/AAAAAAAAAQs/FSLkAll9vgg/74.gif";
	smileyarr["Rajeev_pirate_1"]="http://lh6.google.com/fenil.rulez/SCKizqghSHI/AAAAAAAAAQ0/xuO3al_YRfg/pirate_2.gif";
	smileyarr["Rajeev_transformer_1"]="http://lh6.google.com/fenil.rulez/SCKizqghSII/AAAAAAAAAQ8/kby9xg6pFoI/transformer.gif";
	smileyarr["Rajeev_alien_1"]="http://lh5.google.com/fenil.rulez/SCKjRaghSJI/AAAAAAAAARE/u68DVv1I9ks/61.gif";
	smileyarr["Rajeev_bee_1"]="http://lh6.google.com/fenil.rulez/SCKjRqghSKI/AAAAAAAAARM/cyg71VQRdaQ/115.gif";
	smileyarr["Rajeev_pumpkin_1"]="http://lh6.google.com/fenil.rulez/SCKjRqghSLI/AAAAAAAAARU/iyJGgK_dpnA/56.gif";
	smileyarr["Rajeev_tea_1"]="http://lh6.google.com/fenil.rulez/SCKjRqghSMI/AAAAAAAAARc/xxhTMrfSAqM/57.gif";
	smileyarr["Rajeev_FF rulez_1"]="http://lh4.google.com/fenil.rulez/SCMiK6ghThI/AAAAAAAAAcI/656o_XLJlVQ/infomilies14.gif";

/*Yahoo big smilies*/

	smileyarr["Rajeev_hehe"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuKaszXcVI/AAAAAAAAARE/Ko_x66AexLM/71.gif";
	smileyarr["Rajeev_smile"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRz26PsbE6I/AAAAAAAAAVk/6rrz-NnXXn8/1.gif";
	smileyarr["Rajeev_sad"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRz26BLLYkI/AAAAAAAAAVs/-x_1Z2wgwcY/2.gif";
	smileyarr["Rajeev_wink"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRz26ccoF2I/AAAAAAAAAV0/_J3X4_lUygk/3.gif";
	smileyarr["Rajeev_grin"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRz26Tb968I/AAAAAAAAAV8/QHOLF31HZ9g/4.gif";
	smileyarr["Rajeev_batting eyelashes"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRz26y5DgNI/AAAAAAAAAWE/WC6D7Op78xE/5.gif";
	smileyarr["Rajeev_hug"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRz3fNdI9OI/AAAAAAAAAWQ/pRYC0msqO6k/6.gif";
	smileyarr["Rajeev_confuse"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRz3fLnJPcI/AAAAAAAAAWY/1h9Tg2fui8k/7.gif";
	smileyarr["Rajeev_love struck"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRz3fW7w2ZI/AAAAAAAAAWg/SSC-ImNK5tY/8.gif";
	smileyarr["Rajeev_blush"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRz3fUsZSoI/AAAAAAAAAWo/ZoXbksCB2Qo/9.gif";
	smileyarr["Rajeev_funny"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRz3fdv8IVI/AAAAAAAAAWw/IP8DUMFdz5A/10.gif";
	smileyarr["Rajeev_kiss"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRz37mOh0XI/AAAAAAAAAW8/ZJQEGq9qkOg/11.gif";
	smileyarr["Rajeev_broken heart"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRz37qKERKI/AAAAAAAAAXE/jKuNiOsph50/12.gif";
	smileyarr["Rajeev_surprise"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRz37xh0mDI/AAAAAAAAAXM/3rUyNcFGrVw/13.gif";
	smileyarr["Rajeev_angry"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRz3797Y80I/AAAAAAAAAXU/mWnFqtxrNzg/14.gif";
	smileyarr["Rajeev_smug"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRz373sLnqI/AAAAAAAAAXc/IhE5tLnLnN0/15.gif";
	smileyarr["Rajeev_cool"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRz4T6NAQdI/AAAAAAAAAXo/BW5ATaXwD-A/16.gif";
	smileyarr["Rajeev_worried"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRz4T2s4QII/AAAAAAAAAXw/aOqC0V9hCx8/17.gif";
	smileyarr["Rajeev_whew"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuGLPCEDVI/AAAAAAAAAJg/p6D_OWQsMRk/18.gif";
	smileyarr["Rajeev_devil"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuGo9nfuAI/AAAAAAAAAJs/UNrjMUsRWSo/19.gif";
	smileyarr["Rajeev_cry"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuGpK2H9SI/AAAAAAAAAJ0/CNz245fF-Cg/20.gif";
	smileyarr["Rajeev_laugh"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuGpabxJsI/AAAAAAAAAJ8/SGDt73OZwxQ/21.gif";
	smileyarr["Rajeev_straight face"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuGpjx93hI/AAAAAAAAAKE/Scl6qQ1Hd90/22.gif";
	smileyarr["Rajeev_^ eyebrow"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuGp-tzQXI/AAAAAAAAAKM/ish4L1loBgI/23.gif";
	smileyarr["Rajeev_laughin on floor"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuHcf1CaKI/AAAAAAAAAKY/TGdSDVvbnfI/24.gif";
	smileyarr["Rajeev_angel"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuHcUDXwWI/AAAAAAAAAKg/s-to7VGhCHU/25.gif";
	smileyarr["Rajeev_nerd"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuHctkkU-I/AAAAAAAAAKo/tjwzunLOziE/26.gif";
	smileyarr["Rajeev_tlk 2 hand"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuHc64K_oI/AAAAAAAAAKw/boTa0Lktlt8/27.gif";
	smileyarr["Rajeev_sleep"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuHc0rSKTI/AAAAAAAAAK4/cLwa0RIM2NM/28.gif";
	smileyarr["Rajeev_rolling eyes"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuHuK5APzI/AAAAAAAAALE/zPs_T9GsB6I/29.gif";
	smileyarr["Rajeev_loser"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuHur2AXoI/AAAAAAAAALM/K4oiFHA8NPc/30.gif";
	smileyarr["Rajeev_sick"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuHukLUCWI/AAAAAAAAALU/A_Q0nuvMSI4/31.gif";
	smileyarr["Rajeev_secret"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuHuuBQy4I/AAAAAAAAALc/Zz4-cFVEuOY/32.gif";
	smileyarr["Rajeev_not tlking"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuHu5IEaFI/AAAAAAAAALk/TdNPF5R2Nb0/33.gif";
	smileyarr["Rajeev_clown"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuH4l6DFLI/AAAAAAAAALw/VCorFGzDYxo/34.gif";
	smileyarr["Rajeev_crazy"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuH4rMYVqI/AAAAAAAAAL4/_f0b7xJcla8/35.gif";
	smileyarr["Rajeev_party"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuH41dCT5I/AAAAAAAAAMA/n6ja0fCqBm8/36.gif";
	smileyarr["Rajeev_yawn"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuH5WZYQUI/AAAAAAAAAMI/LAG6Uq7fN3A/37.gif";
	smileyarr["Rajeev_droolin"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuH5VjqAzI/AAAAAAAAAMQ/TUC9Hi1y2oM/38.gif";
	smileyarr["Rajeev_thinking"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuICDnyLBI/AAAAAAAAAMc/nhBk9mc-WcA/39.gif";
	smileyarr["Rajeev_doh"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuICXRQkLI/AAAAAAAAAMk/onQVUGjXb1w/40.gif";
	smileyarr["Rajeev_applause"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuJYCJXhJI/AAAAAAAAAM8/N0Qx0oQ1oVI/41.gif";
	smileyarr["Rajeev_very worried"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuJYMZ-RlI/AAAAAAAAANE/Z2rXMT9jmwE/42.gif ";
	smileyarr["Rajeev_hypno"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuJYdeHIAI/AAAAAAAAANM/SNAJjmPpN2E/43.gif";
	smileyarr["Rajeev_liar"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuJYcat3uI/AAAAAAAAANU/jOqpVZWu4EI/44.gif";
	smileyarr["Rajeev_waiting"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuJYeXyj9I/AAAAAAAAANc/bg69saWEUgE/45.gif";
	smileyarr["Rajeev_sigh"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuJjXCSzgI/AAAAAAAAANo/7qXOhf4eY3g/46.gif";
	smileyarr["Rajeev_phbbt"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuJjoYz8FI/AAAAAAAAANw/YXxhSacqPLs/47.gif";
	smileyarr["Rajeev_cowboy"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuJjxUxHbI/AAAAAAAAAN4/weMwh2W-Vbs/48.gif";
	smileyarr["Rajeev_on call"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuKvNK_thI/AAAAAAAAASQ/P1O6A_Jzn0Q/100.gif";
	smileyarr["Rajeev_call me"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuK-c0SGuI/AAAAAAAAASc/aibbDmbXWXU/101.gif";
	smileyarr["Rajeev_irritated"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuK-lyVK-I/AAAAAAAAASk/xLEqZKPp8SM/102.gif";
	smileyarr["Rajeev_bye"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuK-gF040I/AAAAAAAAASs/65kv4PZWAZw/103.gif";
	smileyarr["Rajeev_time up"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuK-iSz-yI/AAAAAAAAAS0/9uysSZlzT8A/104.gif";
	smileyarr["Rajeev_day dreaming"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuK-yuyKEI/AAAAAAAAAS8/uEQA7X533lI/105.gif";
	smileyarr["Rajeev_dun wanna see"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuLLz4RofI/AAAAAAAAATg/tA28Y5eygqU/109.gif";
	smileyarr["Rajeev_hurry up"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuLL0Dr12I/AAAAAAAAATo/JtloRJFAsrY/110.gif";
	smileyarr["Rajeev_rock on"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuLa0APC4I/AAAAAAAAAT0/Byp-A64JOcI/111.gif";
	smileyarr["Rajeev_thumbs down"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuLa9ZapJI/AAAAAAAAAT8/z19iop_L3xY/112.gif";
	smileyarr["Rajeev_thumbs up"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuLbI3nJNI/AAAAAAAAAUE/eoB1MdshuR8/113.gif";
	smileyarr["Rajeev_i dunno"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuLbWzQfxI/AAAAAAAAAUM/5S_SXcF_M2k/114.gif";
	smileyarr["Rajeev_bow"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuKuWOdq4I/AAAAAAAAAR4/SOunUaC55Uc/77.gif";
	smileyarr["Rajeev_chatterbox"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuKuSbiDjI/AAAAAAAAARw/s7-vyqjXPbA/76.gif";
	smileyarr["Rajeev_bring it on"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuKQRq6UtI/AAAAAAAAAQ4/Q_5LqPnrp-A/70.gif";
	smileyarr["Rajeev_whistling"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuKBjhXVEI/AAAAAAAAAQM/kglAG1tmbrE/65.gif";
	smileyarr["Rajeev_money eyes"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuKBToVgMI/AAAAAAAAAQE/sRRVz78Cjpg/64.gif";
	smileyarr["Rajeev_pray"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuKBFYLqfI/AAAAAAAAAP8/3qPz86IcPZw/63.gif";
	smileyarr["Rajeev_frustated"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuKAgxyxdI/AAAAAAAAAP0/dFuuChpURnE/62.gif";
	smileyarr["Rajeev_dancing"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuKQBLZHYI/AAAAAAAAAQw/PrhwqxdVhTc/69.gif ";
	smileyarr["Rajeev_not listening"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuLLRFhIuI/AAAAAAAAATQ/JQR-FtQCPzE/107.gif";
	smileyarr["Rajeev_shame on u"]=" http://lh4.ggpht.com/_ruaAx3sdhe8/SRuKP9lVD-I/AAAAAAAAAQo/GjBTHfO0xzQ/68.gif ";
	smileyarr["Rajeev_oh cum on"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuKuie9NnI/AAAAAAAAASA/zbu67fcigPc/78.gif";
	smileyarr["Rajeev_no idea"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuLLYYXGJI/AAAAAAAAATI/97OX_dsEecY/106.gif";
	smileyarr["Rajeev_feelin beat up"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuKPLoEDmI/AAAAAAAAAQY/M5xAgHmHQP8/66.gif";
	smileyarr["Rajeev_bug"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuJ3fW72iI/AAAAAAAAAPg/riNaGU4v998/60.gif";
	smileyarr["Rajeev_skul"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuJ3cNVWuI/AAAAAAAAAPY/6gdsYN552Mw/59.gif";
	smileyarr["Rajeev_idea"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuJ3Oym8jI/AAAAAAAAAPQ/hy6-4DedS6o/58.gif";
	smileyarr["Rajeev_goodluck"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuJuVdvUKI/AAAAAAAAAOs/5hCy2QkftDI/54.gif";
	smileyarr["Rajeev_rose"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuJuGmrFoI/AAAAAAAAAOk/5zqFRFikOe0/53.gif";
	smileyarr["Rajeev_chic"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuJuC8VJJI/AAAAAAAAAOc/OC5Q8lId-Dg/52.gif";
	smileyarr["Rajeev_monkey"]=" http://lh4.ggpht.com/_ruaAx3sdhe8/SRuJuKwcfiI/AAAAAAAAAOU/6EciMb-eGcQ/51.gif";
	smileyarr["Rajeev_cow"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuJkTjLdcI/AAAAAAAAAOI/NAgMRJQ5vwM/50.gif";
	smileyarr["Rajeev_pig"]=" http://lh4.ggpht.com/_ruaAx3sdhe8/SRuJkFVQ21I/AAAAAAAAAOA/oTw7PJufnaY/49.gif";
	smileyarr["Rajeev_dog"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuLL8LQt4I/AAAAAAAAATY/dM7GCDpN2YU/108.gif";
	smileyarr["Rajeev_star"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuKu1rNzII/AAAAAAAAASI/B8Nyt8v9PDk/79.gif";
	smileyarr["Rajeev_OD"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuKa4M6GbI/AAAAAAAAARM/awXItYFE9-g/72.gif";
	smileyarr["Rajeev_FENIL"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuKbGT4HOI/AAAAAAAAARU/4C0-QOktnuc/73.gif";
	smileyarr["Rajeev_NIYATI"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuKbHqxh6I/AAAAAAAAARc/aRZmqMm0Qjc/74.gif";
	smileyarr["Rajeev_pirate"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRulXOtO8hI/AAAAAAAAAU4/i3VX5vrCtIg/pirate_2.gif";
	smileyarr["Rajeev_transformer"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRulXOJowHI/AAAAAAAAAVA/Rd5wZb59uTo/transformer.gif";
	smileyarr["Rajeev_alien"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuKAl1fVpI/AAAAAAAAAPs/BD51ld0tn5g/61.gif";
	smileyarr["Rajeev_bee"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuLbksRYPI/AAAAAAAAAUU/RImw1gDN4w0/115.gif";
	smileyarr["Rajeev_pumpkin"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuJ3GXE2uI/AAAAAAAAAPA/1db4aZbgqTA/56.gif";
	smileyarr["Rajeev_tea"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuJ3D__jEI/AAAAAAAAAPI/kDLURoPSiJo/57.gif";
	

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

// Rajeev's script