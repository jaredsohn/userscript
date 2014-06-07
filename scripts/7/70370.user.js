

// ==UserScript==
// @name         Smileys For Orkut By Sajan //// (Sajju)
// @namespace    Sajan
// @author	 Sajan
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
	smileyarr["pray_sajju"]="http://lh3.ggpht.com/_HGv2ih-2LGA/S4J4U4tZchI/AAAAAAAAAZA/mAw0YvXbvGU/s400/pray.png";
	smileyarr["ashamed0001_sajju"]="http://lh4.ggpht.com/_HGv2ih-2LGA/S4J550QW_6I/AAAAAAAAAZI/USM-IR6VatU/s400/ashamed0001.png";
        smileyarr["ashamed0005_sajju"]="http://lh3.ggpht.com/_HGv2ih-2LGA/S4J6GH8kW0I/AAAAAAAAAZQ/htPiZYAvf6s/s400/ashamed0005.png";
	smileyarr["bow_sajju"]="http://lh3.ggpht.com/_HGv2ih-2LGA/S4J6R0yZH2I/AAAAAAAAAZY/u3myX-CySB4/s400/bow.png";
	smileyarr["character0007_sajju"]="http://lh5.ggpht.com/_HGv2ih-2LGA/S4J6br_Qq1I/AAAAAAAAAZg/T7-rL1OwNlU/s400/character0007.png";
        smileyarr["character0008_sajju"]="http://lh5.ggpht.com/_HGv2ih-2LGA/S4J61JYSToI/AAAAAAAAAZo/ZjbpzwsTC08/s400/character0008.png";
        smileyarr["confused0006_sajju"]="http://lh3.ggpht.com/_HGv2ih-2LGA/S4J7Agt26gI/AAAAAAAAAZw/ddHOrVEVKdI/s400/confused0006.png";
        smileyarr["confused0066_sajju"]="http://lh4.ggpht.com/_HGv2ih-2LGA/S4J7NcgET1I/AAAAAAAAAZ4/iS8EWxG-xr8/s400/confused0066.png";
        smileyarr["confused0075_sajju"]="http://lh6.ggpht.com/_HGv2ih-2LGA/S4J7h_DYpPI/AAAAAAAAAaA/Q63daVeIvLs/s400/confused0075.png";
        smileyarr["cool0044_sajju"]="http://lh5.ggpht.com/_HGv2ih-2LGA/S4J7v65XJOI/AAAAAAAAAaI/lz5bqyWZFmw/s400/cool0044.png";
        smileyarr["cool0027_sajju"]="http://lh3.ggpht.com/_HGv2ih-2LGA/S4J8WQjrapI/AAAAAAAAAaQ/lIVP1mYIGOQ/s400/cool0027.png";
        smileyarr["cool0043_sajju"]="http://lh5.ggpht.com/_HGv2ih-2LGA/S4J8gZL1uqI/AAAAAAAAAaY/6HoBBCG46OM/s400/cool0043.png";
        smileyarr["evil_sajju"]="http://lh4.ggpht.com/_HGv2ih-2LGA/S4J8pY802pI/AAAAAAAAAag/ahcPa8cJyu8/s400/evilgrin0007.png";
        smileyarr["fight_sajju"]="http://lh3.ggpht.com/_HGv2ih-2LGA/S4J-D7ChCZI/AAAAAAAAAao/u9dg8-6pgR0/s400/fighting0025.png";
        smileyarr["fight1_sajju"]="http://lh3.ggpht.com/_HGv2ih-2LGA/S4J-MABcXtI/AAAAAAAAAaw/dx8wP2Z80gk/s400/fighting0030.png";
        smileyarr["fight2_sajju"]="http://lh6.ggpht.com/_HGv2ih-2LGA/S4J-V698_PI/AAAAAAAAAa4/uXjoLrCpBA8/s400/fighting0032.png";
        smileyarr["happy_sajju"]="http://lh4.ggpht.com/_HGv2ih-2LGA/S4J-fuMDr2I/AAAAAAAAAbA/eEiKEuvxk_8/s400/happy0025.png";
        smileyarr["happy1_sajju"]="http://lh5.ggpht.com/_HGv2ih-2LGA/S4J-oJlGYAI/AAAAAAAAAbI/3v1EbRIomdQ/s400/happy0064.png";
        smileyarr["indifferent0018_sajju"]="http://lh5.ggpht.com/_HGv2ih-2LGA/S4J-wQLR6MI/AAAAAAAAAbQ/hvuraN1Dvgg/s400/indifferent0018.png";
        smileyarr["indifferent002_sajju"]="http://lh5.ggpht.com/_HGv2ih-2LGA/S4J-61fTGHI/AAAAAAAAAbY/9VoenEjtIW0/s400/indifferent0024.png";
        smileyarr["hug_sajju"]="http://lh3.ggpht.com/_HGv2ih-2LGA/S4J_JK3EiDI/AAAAAAAAAbg/30o2VU1I3Vg/s400/innocent0005.png";
        smileyarr["innocent0006_sajju"]="http://lh6.ggpht.com/_HGv2ih-2LGA/S4J_VrrRbJI/AAAAAAAAAbo/vI1Wc9dbsHo/s400/innocent0006.png";
        smileyarr["jumping_sajju"]="http://lh3.ggpht.com/_HGv2ih-2LGA/S4J_fpk-7rI/AAAAAAAAAbw/Y1YFUyuNfpk/s400/jumping0001.png";
        smileyarr["love_sajju"]="http://lh3.ggpht.com/_HGv2ih-2LGA/S4J_uarTt5I/AAAAAAAAAb4/NiHgOERXPVw/s400/love0030.png";
        smileyarr["^Love_sajju"]="http://lh5.ggpht.com/_HGv2ih-2LGA/S4J_3rJMfDI/AAAAAAAAAcA/sal_jUjVUAM/s400/love0033.png";
        smileyarr["Kiss_sajju"]="http://lh5.ggpht.com/_HGv2ih-2LGA/S4KACkEYggI/AAAAAAAAAcI/n53cz4mXvmM/s400/love0034.png";
        smileyarr["lip_sajju"]="http://lh5.ggpht.com/_HGv2ih-2LGA/S4KALDB25_I/AAAAAAAAAcQ/XOwO56vqsL8/s400/love0035.png";
        smileyarr["kisssmile_sajju"]="http://lh4.ggpht.com/_HGv2ih-2LGA/S4KASn1XiII/AAAAAAAAAcY/YTp9bpRcPwo/s400/love0038.png";
        smileyarr["flowers_sajju"]="http://lh4.ggpht.com/_HGv2ih-2LGA/S4KAdwH-9GI/AAAAAAAAAcg/K5a9s2ohlRY/s400/love0041.png";
        smileyarr["mad_sajju"]="http://lh3.ggpht.com/_HGv2ih-2LGA/S4KBzZ23-rI/AAAAAAAAAco/Dfxl5x0njF0/s400/mad0054.png";
	smileyarr["bye_sajju"]="http://lh3.ggpht.com/_HGv2ih-2LGA/S4KB5UtL6UI/AAAAAAAAAcw/K_CJjGlIPec/s400/msn16.png";
	smileyarr["party_sajju"]="http://lh4.ggpht.com/_HGv2ih-2LGA/S4KCAyzi_CI/AAAAAAAAAc4/i2KVIFkkaLo/s400/party0012.png";
	smileyarr["parrty_sajju"]="http://lh3.ggpht.com/_HGv2ih-2LGA/S4KCHtL698I/AAAAAAAAAdA/t_K89m3ukSU/s400/party0029.png";
        smileyarr["rolleye_sajju"]="http://lh4.ggpht.com/_HGv2ih-2LGA/S4KCQSqABuI/AAAAAAAAAdI/_xaymD_5Owk/s400/rolleye0012.png";
        smileyarr["rip_sajju"]="http://lh6.ggpht.com/_HGv2ih-2LGA/S4KCYHQLn4I/AAAAAAAAAdQ/Hkn0U3Ju4E4/s400/sick0004.png";
        smileyarr["sick_sajju"]="http://lh5.ggpht.com/_HGv2ih-2LGA/S4KCi6fnnhI/AAAAAAAAAdY/vaeaQiasckE/s400/sick0025.png";
	smileyarr["partytym_sajju"]="http://lh3.ggpht.com/_HGv2ih-2LGA/S4KCpsG-E1I/AAAAAAAAAdg/0J4Um8nCtFw/s400/sign0008.png";
	smileyarr["ban_sajju"]="http://lh5.ggpht.com/_HGv2ih-2LGA/S4KC-dONBNI/AAAAAAAAAdw/QzZjjAFdj9s/s400/sign0024.png";
	smileyarr["tongue_sajju"]="http://lh3.ggpht.com/_HGv2ih-2LGA/S4KDFiDm5wI/AAAAAAAAAd4/3-r4WNhhsH0/s400/tongue0011.png";
	smileyarr["winking_sajju"]="http://lh3.ggpht.com/_HGv2ih-2LGA/S4KDhxvZ01I/AAAAAAAAAeA/EO24ukfWcNw/s400/winking0071.png";
	smileyarr["agreement_sajju"]="http://lh5.ggpht.com/_HGv2ih-2LGA/S4KF6JUe72I/AAAAAAAAAeI/49-BZ24LsDQ/s400/agreement3.png";
	smileyarr["laugh_sajju"]="http://lh6.ggpht.com/_HGv2ih-2LGA/S4KGAtcZJtI/AAAAAAAAAeQ/OPhiegyVe9w/s400/laughing1.png";
	smileyarr["sad_sajju"]="http://lh4.ggpht.com/_HGv2ih-2LGA/S4KGIZrohKI/AAAAAAAAAeY/d8EW9Q2j-r8/s400/sad6.png";
	smileyarr["welcum_sajju"]="http://lh5.ggpht.com/_HGv2ih-2LGA/S4KGTt9kLkI/AAAAAAAAAeg/0Q5Eyj64MvY/s400/signsandflags36.png";
	smileyarr["sporty_sajju"]="http://lh4.ggpht.com/_HGv2ih-2LGA/S4KGaqTnVZI/AAAAAAAAAeo/Nom-zKcpyaE/s400/sporty18.png";
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