// ==UserScript==
// @name         Yahoo Big Smileys  By ✖ ..ƤʀɪɳɔƐ.. ✖
// @namespace    ✖ ..ƤʀɪɳɔƐ.. ✖
// @author	 ✖ ..ƤʀɪɳɔƐ.. ✖
// @description  Use Latest Yahoo Smileys  !
// @include        http://*.orkut.*/*
// @require http://sizzlemctwizzle.com/updater.php?id=77755&days=2
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
		smileyarr["hehe"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuKaszXcVI/AAAAAAAAARE/Ko_x66AexLM/71.gif";
	smileyarr["smile"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRz26PsbE6I/AAAAAAAAAVk/6rrz-NnXXn8/1.gif";
	smileyarr["sad"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRz26BLLYkI/AAAAAAAAAVs/-x_1Z2wgwcY/2.gif";
	smileyarr["wink"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRz26ccoF2I/AAAAAAAAAV0/_J3X4_lUygk/3.gif";
	smileyarr["grin"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRz26Tb968I/AAAAAAAAAV8/QHOLF31HZ9g/4.gif";
	smileyarr["batting eyelashes"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRz26y5DgNI/AAAAAAAAAWE/WC6D7Op78xE/5.gif";
	smileyarr["hug"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRz3fNdI9OI/AAAAAAAAAWQ/pRYC0msqO6k/6.gif";
	smileyarr["confuse"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRz3fLnJPcI/AAAAAAAAAWY/1h9Tg2fui8k/7.gif";
	smileyarr["love struck"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRz3fW7w2ZI/AAAAAAAAAWg/SSC-ImNK5tY/8.gif";
	smileyarr["blush"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRz3fUsZSoI/AAAAAAAAAWo/ZoXbksCB2Qo/9.gif";
	smileyarr["funny"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRz3fdv8IVI/AAAAAAAAAWw/IP8DUMFdz5A/10.gif";
	smileyarr["kiss"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRz37mOh0XI/AAAAAAAAAW8/ZJQEGq9qkOg/11.gif";
	smileyarr["broken heart"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRz37qKERKI/AAAAAAAAAXE/jKuNiOsph50/12.gif";
	smileyarr["surprise"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRz37xh0mDI/AAAAAAAAAXM/3rUyNcFGrVw/13.gif";
	smileyarr["angry"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRz3797Y80I/AAAAAAAAAXU/mWnFqtxrNzg/14.gif";
	smileyarr["smug"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRz373sLnqI/AAAAAAAAAXc/IhE5tLnLnN0/15.gif";
	smileyarr["cool"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRz4T6NAQdI/AAAAAAAAAXo/BW5ATaXwD-A/16.gif";
	smileyarr["worried"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRz4T2s4QII/AAAAAAAAAXw/aOqC0V9hCx8/17.gif";
	smileyarr["whew"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuGLPCEDVI/AAAAAAAAAJg/p6D_OWQsMRk/18.gif";
	smileyarr["devil"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuGo9nfuAI/AAAAAAAAAJs/UNrjMUsRWSo/19.gif";
	smileyarr["cry"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuGpK2H9SI/AAAAAAAAAJ0/CNz245fF-Cg/20.gif";
	smileyarr["laugh"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuGpabxJsI/AAAAAAAAAJ8/SGDt73OZwxQ/21.gif";
	smileyarr["straight face"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuGpjx93hI/AAAAAAAAAKE/Scl6qQ1Hd90/22.gif";
	smileyarr["^ eyebrow"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuGp-tzQXI/AAAAAAAAAKM/ish4L1loBgI/23.gif";
	smileyarr["laughin on floor"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuHcf1CaKI/AAAAAAAAAKY/TGdSDVvbnfI/24.gif";
	smileyarr["angel"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuHcUDXwWI/AAAAAAAAAKg/s-to7VGhCHU/25.gif";
	smileyarr["nerd"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuHctkkU-I/AAAAAAAAAKo/tjwzunLOziE/26.gif";
	smileyarr["tlk 2 hand"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuHc64K_oI/AAAAAAAAAKw/boTa0Lktlt8/27.gif";
	smileyarr["sleep"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuHc0rSKTI/AAAAAAAAAK4/cLwa0RIM2NM/28.gif";
	smileyarr["rolling eyes"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuHuK5APzI/AAAAAAAAALE/zPs_T9GsB6I/29.gif";
	smileyarr["loser"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuHur2AXoI/AAAAAAAAALM/K4oiFHA8NPc/30.gif";
	smileyarr["sick"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuHukLUCWI/AAAAAAAAALU/A_Q0nuvMSI4/31.gif";
	smileyarr["secret"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuHuuBQy4I/AAAAAAAAALc/Zz4-cFVEuOY/32.gif";
	smileyarr["not tlking"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuHu5IEaFI/AAAAAAAAALk/TdNPF5R2Nb0/33.gif";
	smileyarr["clown"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuH4l6DFLI/AAAAAAAAALw/VCorFGzDYxo/34.gif";
	smileyarr["crazy"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuH4rMYVqI/AAAAAAAAAL4/_f0b7xJcla8/35.gif";
	smileyarr["party"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuH41dCT5I/AAAAAAAAAMA/n6ja0fCqBm8/36.gif";
	smileyarr["yawn"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuH5WZYQUI/AAAAAAAAAMI/LAG6Uq7fN3A/37.gif";
	smileyarr["droolin"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuH5VjqAzI/AAAAAAAAAMQ/TUC9Hi1y2oM/38.gif";
	smileyarr["thinking"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuICDnyLBI/AAAAAAAAAMc/nhBk9mc-WcA/39.gif";
	smileyarr["doh"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuICXRQkLI/AAAAAAAAAMk/onQVUGjXb1w/40.gif";
	smileyarr["applause"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuJYCJXhJI/AAAAAAAAAM8/N0Qx0oQ1oVI/41.gif";
	smileyarr["very worried"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuJYMZ-RlI/AAAAAAAAANE/Z2rXMT9jmwE/42.gif ";
	smileyarr["hypno"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuJYdeHIAI/AAAAAAAAANM/SNAJjmPpN2E/43.gif";
	smileyarr["liar"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuJYcat3uI/AAAAAAAAANU/jOqpVZWu4EI/44.gif";
	smileyarr["waiting"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuJYeXyj9I/AAAAAAAAANc/bg69saWEUgE/45.gif";
	smileyarr["sigh"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuJjXCSzgI/AAAAAAAAANo/7qXOhf4eY3g/46.gif";
	smileyarr["phbbt"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuJjoYz8FI/AAAAAAAAANw/YXxhSacqPLs/47.gif";
	smileyarr["cowboy"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuJjxUxHbI/AAAAAAAAAN4/weMwh2W-Vbs/48.gif";
	smileyarr["on call"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuKvNK_thI/AAAAAAAAASQ/P1O6A_Jzn0Q/100.gif";
	smileyarr["call me"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuK-c0SGuI/AAAAAAAAASc/aibbDmbXWXU/101.gif";
	smileyarr["irritated"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuK-lyVK-I/AAAAAAAAASk/xLEqZKPp8SM/102.gif";
	smileyarr["bye"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuK-gF040I/AAAAAAAAASs/65kv4PZWAZw/103.gif";
	smileyarr["time up"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuK-iSz-yI/AAAAAAAAAS0/9uysSZlzT8A/104.gif";
	smileyarr["day dreaming"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuK-yuyKEI/AAAAAAAAAS8/uEQA7X533lI/105.gif";
	smileyarr["dun wanna see"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuLLz4RofI/AAAAAAAAATg/tA28Y5eygqU/109.gif";
	smileyarr["hurry up"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuLL0Dr12I/AAAAAAAAATo/JtloRJFAsrY/110.gif";
	smileyarr["rock on"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuLa0APC4I/AAAAAAAAAT0/Byp-A64JOcI/111.gif";
	smileyarr["thumbs down"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuLa9ZapJI/AAAAAAAAAT8/z19iop_L3xY/112.gif";
	smileyarr["thumbs up"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuLbI3nJNI/AAAAAAAAAUE/eoB1MdshuR8/113.gif";
	smileyarr["i dunno"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuLbWzQfxI/AAAAAAAAAUM/5S_SXcF_M2k/114.gif";
	smileyarr["bow"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuKuWOdq4I/AAAAAAAAAR4/SOunUaC55Uc/77.gif";
	smileyarr["chatterbox"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuKuSbiDjI/AAAAAAAAARw/s7-vyqjXPbA/76.gif";
	smileyarr["bring it on"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuKQRq6UtI/AAAAAAAAAQ4/Q_5LqPnrp-A/70.gif";
	smileyarr["whistling"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuKBjhXVEI/AAAAAAAAAQM/kglAG1tmbrE/65.gif";
	smileyarr["money eyes"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuKBToVgMI/AAAAAAAAAQE/sRRVz78Cjpg/64.gif";
	smileyarr["pray"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuKBFYLqfI/AAAAAAAAAP8/3qPz86IcPZw/63.gif";
	smileyarr["frustated"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuKAgxyxdI/AAAAAAAAAP0/dFuuChpURnE/62.gif";
	smileyarr["dancing"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuKQBLZHYI/AAAAAAAAAQw/PrhwqxdVhTc/69.gif ";
	smileyarr["not listening"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuLLRFhIuI/AAAAAAAAATQ/JQR-FtQCPzE/107.gif";
	smileyarr["shame on u"]=" http://lh4.ggpht.com/_ruaAx3sdhe8/SRuKP9lVD-I/AAAAAAAAAQo/GjBTHfO0xzQ/68.gif ";
	smileyarr["oh cum on"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuKuie9NnI/AAAAAAAAASA/zbu67fcigPc/78.gif";
	smileyarr["no idea"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuLLYYXGJI/AAAAAAAAATI/97OX_dsEecY/106.gif";
	smileyarr["feelin beat up"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuKPLoEDmI/AAAAAAAAAQY/M5xAgHmHQP8/66.gif";
	smileyarr["bug"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuJ3fW72iI/AAAAAAAAAPg/riNaGU4v998/60.gif";
	smileyarr["skul"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuJ3cNVWuI/AAAAAAAAAPY/6gdsYN552Mw/59.gif";
	smileyarr["idea"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuJ3Oym8jI/AAAAAAAAAPQ/hy6-4DedS6o/58.gif";
	smileyarr["goodluck"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuJuVdvUKI/AAAAAAAAAOs/5hCy2QkftDI/54.gif";
	smileyarr["rose"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuJuGmrFoI/AAAAAAAAAOk/5zqFRFikOe0/53.gif";
	smileyarr["chic"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuJuC8VJJI/AAAAAAAAAOc/OC5Q8lId-Dg/52.gif";
	smileyarr["monkey"]=" http://lh4.ggpht.com/_ruaAx3sdhe8/SRuJuKwcfiI/AAAAAAAAAOU/6EciMb-eGcQ/51.gif";
	smileyarr["cow"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuJkTjLdcI/AAAAAAAAAOI/NAgMRJQ5vwM/50.gif";
	smileyarr["pig"]=" http://lh4.ggpht.com/_ruaAx3sdhe8/SRuJkFVQ21I/AAAAAAAAAOA/oTw7PJufnaY/49.gif";
	smileyarr["dog"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuLL8LQt4I/AAAAAAAAATY/dM7GCDpN2YU/108.gif";
	smileyarr["star"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuKu1rNzII/AAAAAAAAASI/B8Nyt8v9PDk/79.gif";
	smileyarr["OD"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuKa4M6GbI/AAAAAAAAARM/awXItYFE9-g/72.gif";
	smileyarr["FENIL"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuKbGT4HOI/AAAAAAAAARU/4C0-QOktnuc/73.gif";
	smileyarr["NIYATI"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuKbHqxh6I/AAAAAAAAARc/aRZmqMm0Qjc/74.gif";
	smileyarr["pirate"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRulXOtO8hI/AAAAAAAAAU4/i3VX5vrCtIg/pirate_2.gif";
	smileyarr["transformer"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRulXOJowHI/AAAAAAAAAVA/Rd5wZb59uTo/transformer.gif";
	smileyarr["alien"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuKAl1fVpI/AAAAAAAAAPs/BD51ld0tn5g/61.gif";
	smileyarr["bee"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuLbksRYPI/AAAAAAAAAUU/RImw1gDN4w0/115.gif";
	smileyarr["pumpkin"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuJ3GXE2uI/AAAAAAAAAPA/1db4aZbgqTA/56.gif";
	smileyarr["tea"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuJ3D__jEI/AAAAAAAAAPI/kDLURoPSiJo/57.gif";
smileyarr["lol"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/S58fHkzoTRI/AAAAAAAAA_o/yCpmHNIscRo/s800/face%20lol.gif";
	smileyarr["Old Cool"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx94aMOxSwI/AAAAAAAAAoY/w3dnZepZLtI/s800/o_cool.gif";
	smileyarr["Old Cool(A)"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/Sx92UMQ-ZvI/AAAAAAAAAnE/KNYGYpIB2J4/s800/oa_cool.gif";
	smileyarr["Old Sad"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/Sx94j8K894I/AAAAAAAAAo4/XA6qtDzth6I/s800/o_sad.gif";
	smileyarr["Old Sad (A)"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/Sx92uz9lJ8I/AAAAAAAAAnk/c8y0TapKgl8/s800/oa_sad.gif";
	smileyarr["Old Angry"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/Sx94Zn4CGSI/AAAAAAAAAoM/l0C5mb-UnK4/s800/o_angry.gif";
	smileyarr["Old Angry (A)"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx92TiJLUMI/AAAAAAAAAm4/yTzhpitw1jc/s800/oa_angry.gif";
	smileyarr["Old Smile"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/Sx94jwq3ejI/AAAAAAAAAo8/PAnSwgo_Umc/s800/o_smile.gif";
	smileyarr["Old Smile (A)"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/Sx92u3WFPeI/AAAAAAAAAno/NrjBokyUxMM/s800/oa_smile.gif";
	smileyarr["Old Wink"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx94kKUxU2I/AAAAAAAAApE/XMVPHWXyayU/s800/o_wink.gif";
	smileyarr["Old Wink (A)"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/Sx92vBd41OI/AAAAAAAAAnw/r5FHJNE1KvI/s800/oa_wink.gif";
	smileyarr["Old Big Smile"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx94Z8DunzI/AAAAAAAAAoQ/CyQ1YXaqrZY/s800/o_bigsmile.gif";
	smileyarr["Old Big Smile (A)"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx92Tmf3vxI/AAAAAAAAAm8/Js-F-OYG41o/s800/oa_bigsmile.gif";
	smileyarr["Old Surprise"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/Sx94jyDkA6I/AAAAAAAAApA/P_tc4GOkcHc/s800/o_surprise.gif";
	smileyarr["Old Surprise (A)"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx92vCzVKpI/AAAAAAAAAns/0qck22nQ-PA/s800/oa_surprise.gif";
	smileyarr["Old Funny"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/Sx94aFPA4_I/AAAAAAAAAoc/lGMca0uPo1Y/s800/o_funny.gif";
	smileyarr["Old Funny (A)"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/Sx92UVTLLII/AAAAAAAAAnI/sjEX3nz4n3A/s800/oa_funny.gif";
	smileyarr["Old Confuse"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx94Z8XKMZI/AAAAAAAAAoU/76WoFzQ11RQ/s800/o_confuse.gif";
	smileyarr["Old Confuse (A)"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/Sx92UBrIEHI/AAAAAAAAAnA/e_OobdFEWCA/s800/oa_confuse.gif";

	smileyarr["New Heart"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/Sx-CWO6gUVI/AAAAAAAAAyU/vLqvnhb8UVk/s800/n_heart.png";
	smileyarr["New Smile"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/Sx-CWZZz0PI/AAAAAAAAAyg/hpGq5OpGmSA/s800/n_smile.png";
	smileyarr["New Wink"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx-Cbb20yoI/AAAAAAAAAzE/mSjQgpPB6WQ/s800/n_wink.png";
	smileyarr["New Big Smile"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx-CO2yOr3I/AAAAAAAAAxs/u6cUBZPDla4/s800/n_big%20smile.png";
	smileyarr["New Surprise"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx-CbDAxXzI/AAAAAAAAAzA/Zl5Zt7wRVW8/s800/n_surprise.png";
	smileyarr["New Funny"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/Sx-CPCtgoaI/AAAAAAAAAx4/E29wxYpLBrc/s800/n_funny.png";
	smileyarr["New Cool"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/Sx-CPEfv7mI/AAAAAAAAAxw/NiKyeGu4YBk/s800/n_cool.png";
	smileyarr["New Straightface"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx-CWY3g5pI/AAAAAAAAAyk/1CMozYSy2OE/s800/n_straightface.png";
	smileyarr["New Slant"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/Sx-CWMV4-1I/AAAAAAAAAyc/EZjLe-2ucAI/s800/n_slant.png";
	smileyarr["New Sad"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/Sx-CWOIvtWI/AAAAAAAAAyY/YuuaeOJHQOs/s800/n_sad.png";
	smileyarr["New Cry"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx-CPAAxR5I/AAAAAAAAAx0/UP01oA1GYRY/s800/n_cry.png";
	smileyarr["New Angry"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx-CO-bqNJI/AAAAAAAAAxo/tl1gWokCm9c/s800/n_angry.png";
	
	

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