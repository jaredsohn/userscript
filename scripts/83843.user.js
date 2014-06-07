// ==UserScript==
// @name         Yahoo Smileys For Orkut By Rubin Jose
//@namespace     http://www.orkut.co.in/Main#Home  
// @author	 Rubin Jose
// @description   Yahoo smilies Use it & Thanks For Open It Up :)
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
	smileyarr["yin yan"]="http://lh3.ggpht.com/_zam2DdYJLxc/S0Hl202et4I/AAAAAAAAAB0/2wFxcWeu1zk/75.gif";
	smileyarr["Flag"]="http://lh4.ggpht.com/_PrM5VcwpZio/S7bAwstfTyI/AAAAAAAACG8/a4gJYNQ_1N0/55.gif";


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