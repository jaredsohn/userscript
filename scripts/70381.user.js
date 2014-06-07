

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
	smileyarr["anger_sajju"]="http://lh5.ggpht.com/_Pa4D2ASTVpI/S44cJKnC_4I/AAAAAAAAA3U/OCUqbzpOlDY/s400/14.png";
	smileyarr["band1_sajju"]="http://lh4.ggpht.com/_Pa4D2ASTVpI/S44cyT0wSuI/AAAAAAAAA40/OdlbWBnnQnE/s400/band1.png";
	smileyarr["boss_sajju"]="http://lh6.ggpht.com/_Pa4D2ASTVpI/S44dAtZtapI/AAAAAAAAA5k/1gTysw4QRsk/s400/big_boss.png";
	smileyarr["biker_sajju"]="http://lh5.ggpht.com/_Pa4D2ASTVpI/S44dHD1GdAI/AAAAAAAAA58/qv_HwzLSATY/s400/biker.png";
	smileyarr["alaram_sajju"]="http://lh4.ggpht.com/_Pa4D2ASTVpI/S44d1LV914I/AAAAAAAAA70/htunpWyQ7qU/s400/connie_16.png";
	smileyarr["cards_sajju"]="http://lh3.ggpht.com/_Pa4D2ASTVpI/S44do7F1qdI/AAAAAAAAA7E/YmF3WqRnj9c/s400/cards.png";
	smileyarr["coupledance_sajju"]="http://lh5.ggpht.com/_Pa4D2ASTVpI/S44eJcclnMI/AAAAAAAAA8k/JYOYckWFZg0/s400/dance.png";
	smileyarr["rawkin_sajju"]="http://lh5.ggpht.com/_Pa4D2ASTVpI/S44fku68cOI/AAAAAAAABAI/wL4jxtxjoqI/s400/headbang.png";
	smileyarr["frdx_sajju"]="http://lh3.ggpht.com/_Pa4D2ASTVpI/S44e52L97sI/AAAAAAAAA-0/rFD6PEpi3nk/s400/friends.png";
	smileyarr["laie_sajju"]="http://lh3.ggpht.com/_Pa4D2ASTVpI/S44fzTPP57I/AAAAAAAABAU/bq9ghnrorqU/s400/Laie_23.png";
	smileyarr["horseriding_sajju"]="http://lh4.ggpht.com/_Pa4D2ASTVpI/S44f2Xhcg5I/AAAAAAAABAg/uNH-kmiPLoo/s400/horseriding.png";
	smileyarr["icecream_sajju"]="http://lh6.ggpht.com/_Pa4D2ASTVpI/S44f6QMGn_I/AAAAAAAABAs/j1CvvHSIMjo/s400/icecream.png";
	smileyarr["areoplane_sajju"]="http://lh5.ggpht.com/_Pa4D2ASTVpI/S44gW3kbsaI/AAAAAAAABCA/n-aRq7N5udY/s400/Laie_43.png";
	smileyarr["bogirl_sajju"]="http://lh4.ggpht.com/_Pa4D2ASTVpI/S44goWlUF6I/AAAAAAAABCk/Epeh9WDBtww/s400/mmmmm.png";
	smileyarr["hukka_sajju"]="http://lh4.ggpht.com/_Pa4D2ASTVpI/S44h8o2rM5I/AAAAAAAABGU/1JINN5qHRXs/s400/sylar.png";
	smileyarr["swimming_sajju"]="http://lh3.ggpht.com/_Pa4D2ASTVpI/S44h43QtxkI/AAAAAAAABGI/QBJUWVyUBgY/s400/swimming.png";
	smileyarr["studying_sajju"]="http://lh6.ggpht.com/_Pa4D2ASTVpI/S44h1JjHiAI/AAAAAAAABF8/gDH33ZM7hKw/s400/studying.png";
	smileyarr["sporty_sajju"]="http://lh5.ggpht.com/_Pa4D2ASTVpI/S44hyesR48I/AAAAAAAABFw/TEjOkNrn_I0/s400/sporty0.png";
	smileyarr["relaxsmoke_sajju"]="http://lh5.ggpht.com/_Pa4D2ASTVpI/S44htA6qwkI/AAAAAAAABFk/vksGZsCkN_k/s400/smoke.png";
	smileyarr["running_sajju"]="http://lh5.ggpht.com/_Pa4D2ASTVpI/S44hhyWzLSI/AAAAAAAABFA/-75uDshUs38/s400/run.png";
	smileyarr["ty_sajju"]="http://lh4.ggpht.com/_Pa4D2ASTVpI/S44iA2gKQmI/AAAAAAAABGg/iM2QowdcXs4/s400/thankyou.png.png";
	smileyarr["toldu_sajju"]="http://lh3.ggpht.com/_Pa4D2ASTVpI/S44iPCuo2dI/AAAAAAAABHQ/ID7HvU1v6U4/s400/toldu.png";
	smileyarr["stars_sajju"]="http://lh5.ggpht.com/_liPiaU72mso/S0uVwlVjx7I/AAAAAAAAA24/-C7YeCHdwSs/Seeing%20stars.gif";
	smileyarr["respect_sajju"]="http://lh3.ggpht.com/_PrM5VcwpZio/S2lHUXwcyXI/AAAAAAAABf4/KZd3NxkaQV0/Laie_69.gif";
	smileyarr["sadcry_sajju"]="http://lh5.ggpht.com/_zam2DdYJLxc/S0RAZn_ie4I/AAAAAAAAADI/e4_Q_ouljhs/cry.gif";
	smileyarr["victory_sajju"]="http://lh4.ggpht.com/_PrM5VcwpZio/SwLZ_TNoN9I/AAAAAAAAAZw/TlFG6g_yNnE/victory.gif";
	smileyarr["missyou_sajju"]="http://lh3.ggpht.com/_PrM5VcwpZio/S1vobYDSrJI/AAAAAAAABSU/Xs13_nB0Ki8/sign0150.gif";
	smileyarr["flowers4ew_sajju"]="http://lh6.ggpht.com/_zam2DdYJLxc/S0RBmsujsSI/AAAAAAAAAEc/A1H1UxZn-ng/flowers%20for%20you.gif";
	smileyarr["lol_sajju"]="http://lh6.ggpht.com/_zam2DdYJLxc/S0RBc0NW_xI/AAAAAAAAAEQ/sGhtI9cKNs0/emoticon%20lol.gif";
	smileyarr["kissew_sajju"]="http://lh5.ggpht.com/_PrM5VcwpZio/SwLY7ldgYqI/AAAAAAAAAX0/gt1nxKomtK8/kiss.gif";
	smileyarr["tease_sajju"]="http://lh4.ggpht.com/_WUkykBFkZ3Y/SZ7SpHExDVI/AAAAAAAAAWk/ozpNYo8OVzI/sm31.gif";
	smileyarr["love_sajju"]="http://lh5.ggpht.com/_PrM5VcwpZio/Sx9UhAWxznI/AAAAAAAAAqI/z8nKLncyRuM/love42.gif";
	smileyarr["fate_sajju"]="http://lh6.ggpht.com/_WUkykBFkZ3Y/SY1zslk-75I/AAAAAAAAANg/9FwQ82VVH4c/wallbash1.gif";
	smileyarr["toldu_sajju"]="http://lh3.ggpht.com/_Pa4D2ASTVpI/S44iPCuo2dI/AAAAAAAABHQ/ID7HvU1v6U4/s400/toldu.png";



	


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