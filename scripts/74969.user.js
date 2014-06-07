// ==UserScript==
// @name          Yahoo  smilies for Orkut by DGX-|RUBIN|
// @namespace     http://www.orkut.co.in/Main#Home
// @author		  Rubin Jose
// @description   Yahoo  smilies for Orkut by DGX-|RUBIN|
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


/*Yahoo big smilies*/

	smileyarr["DGX-BoyS-hehe"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuKaszXcVI/AAAAAAAAARE/Ko_x66AexLM/71.gif";
	smileyarr["DGX-BoyS-smile"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRz26PsbE6I/AAAAAAAAAVk/6rrz-NnXXn8/1.gif";
	smileyarr["DGX-BoyS-sad"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRz26BLLYkI/AAAAAAAAAVs/-x_1Z2wgwcY/2.gif";
	smileyarr["DGX-BoyS-wink"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRz26ccoF2I/AAAAAAAAAV0/_J3X4_lUygk/3.gif";
	smileyarr["DGX-BoyS-grin"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRz26Tb968I/AAAAAAAAAV8/QHOLF31HZ9g/4.gif";
	smileyarr["DGX-BoyS-batting eyelashes"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRz26y5DgNI/AAAAAAAAAWE/WC6D7Op78xE/5.gif";
	smileyarr["DGX-BoyS-hug"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRz3fNdI9OI/AAAAAAAAAWQ/pRYC0msqO6k/6.gif";
	smileyarr["DGX-BoyS-confuse"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRz3fLnJPcI/AAAAAAAAAWY/1h9Tg2fui8k/7.gif";
	smileyarr["DGX-BoyS-love struck"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRz3fW7w2ZI/AAAAAAAAAWg/SSC-ImNK5tY/8.gif";
	smileyarr["DGX-BoyS-blush"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRz3fUsZSoI/AAAAAAAAAWo/ZoXbksCB2Qo/9.gif";
	smileyarr["DGX-BoyS-funny"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRz3fdv8IVI/AAAAAAAAAWw/IP8DUMFdz5A/10.gif";
	smileyarr["DGX-BoyS-kiss"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRz37mOh0XI/AAAAAAAAAW8/ZJQEGq9qkOg/11.gif";
	smileyarr["DGX-BoyS-broken heart"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRz37qKERKI/AAAAAAAAAXE/jKuNiOsph50/12.gif";
	smileyarr["DGX-BoyS-surprise"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRz37xh0mDI/AAAAAAAAAXM/3rUyNcFGrVw/13.gif";
	smileyarr["DGX-BoyS-angry"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRz3797Y80I/AAAAAAAAAXU/mWnFqtxrNzg/14.gif";
	smileyarr["DGX-BoyS-smug"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRz373sLnqI/AAAAAAAAAXc/IhE5tLnLnN0/15.gif";
	smileyarr["DGX-BoyS-cool"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRz4T6NAQdI/AAAAAAAAAXo/BW5ATaXwD-A/16.gif";
	smileyarr["DGX-BoyS-worried"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRz4T2s4QII/AAAAAAAAAXw/aOqC0V9hCx8/17.gif";
	smileyarr["DGX-BoyS-whew"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuGLPCEDVI/AAAAAAAAAJg/p6D_OWQsMRk/18.gif";
	smileyarr["DGX-BoyS-devil"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuGo9nfuAI/AAAAAAAAAJs/UNrjMUsRWSo/19.gif";
	smileyarr["DGX-BoyS-cry"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuGpK2H9SI/AAAAAAAAAJ0/CNz245fF-Cg/20.gif";
	smileyarr["DGX-BoyS-laugh"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuGpabxJsI/AAAAAAAAAJ8/SGDt73OZwxQ/21.gif";
	smileyarr["DGX-BoyS-straight face"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuGpjx93hI/AAAAAAAAAKE/Scl6qQ1Hd90/22.gif";
	smileyarr["DGX-BoyS-^ eyebrow"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuGp-tzQXI/AAAAAAAAAKM/ish4L1loBgI/23.gif";
	smileyarr["DGX-BoyS-laughin on floor"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuHcf1CaKI/AAAAAAAAAKY/TGdSDVvbnfI/24.gif";
	smileyarr["DGX-BoyS-angel"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuHcUDXwWI/AAAAAAAAAKg/s-to7VGhCHU/25.gif";
	smileyarr["DGX-BoyS-nerd"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuHctkkU-I/AAAAAAAAAKo/tjwzunLOziE/26.gif";
	smileyarr["DGX-BoyS-tlk 2 hand"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuHc64K_oI/AAAAAAAAAKw/boTa0Lktlt8/27.gif";
	smileyarr["DGX-BoyS-sleep"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuHc0rSKTI/AAAAAAAAAK4/cLwa0RIM2NM/28.gif";
	smileyarr["DGX-BoyS-rolling eyes"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuHuK5APzI/AAAAAAAAALE/zPs_T9GsB6I/29.gif";
	smileyarr["DGX-BoyS-loser"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuHur2AXoI/AAAAAAAAALM/K4oiFHA8NPc/30.gif";
	smileyarr["DGX-BoyS-sick"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuHukLUCWI/AAAAAAAAALU/A_Q0nuvMSI4/31.gif";
	smileyarr["DGX-BoyS-secret"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuHuuBQy4I/AAAAAAAAALc/Zz4-cFVEuOY/32.gif";
	smileyarr["DGX-BoyS-not tlking"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuHu5IEaFI/AAAAAAAAALk/TdNPF5R2Nb0/33.gif";
	smileyarr["DGX-BoyS-clown"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuH4l6DFLI/AAAAAAAAALw/VCorFGzDYxo/34.gif";
	smileyarr["DGX-BoyS-crazy"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuH4rMYVqI/AAAAAAAAAL4/_f0b7xJcla8/35.gif";
	smileyarr["DGX-BoyS-party"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuH41dCT5I/AAAAAAAAAMA/n6ja0fCqBm8/36.gif";
	smileyarr["DGX-BoyS-yawn"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuH5WZYQUI/AAAAAAAAAMI/LAG6Uq7fN3A/37.gif";
	smileyarr["DGX-BoyS-droolin"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuH5VjqAzI/AAAAAAAAAMQ/TUC9Hi1y2oM/38.gif";
	smileyarr["DGX-BoyS-thinking"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuICDnyLBI/AAAAAAAAAMc/nhBk9mc-WcA/39.gif";
	smileyarr["DGX-BoyS-doh"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuICXRQkLI/AAAAAAAAAMk/onQVUGjXb1w/40.gif";
	smileyarr["DGX-BoyS-applause"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuJYCJXhJI/AAAAAAAAAM8/N0Qx0oQ1oVI/41.gif";
	smileyarr["DGX-BoyS-very worried"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuJYMZ-RlI/AAAAAAAAANE/Z2rXMT9jmwE/42.gif ";
	smileyarr["DGX-BoyS-hypno"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuJYdeHIAI/AAAAAAAAANM/SNAJjmPpN2E/43.gif";
	smileyarr["DGX-BoyS-liar"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuJYcat3uI/AAAAAAAAANU/jOqpVZWu4EI/44.gif";
	smileyarr["DGX-BoyS-waiting"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuJYeXyj9I/AAAAAAAAANc/bg69saWEUgE/45.gif";
	smileyarr["DGX-BoyS-sigh"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuJjXCSzgI/AAAAAAAAANo/7qXOhf4eY3g/46.gif";
	smileyarr["DGX-BoyS-phbbt"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuJjoYz8FI/AAAAAAAAANw/YXxhSacqPLs/47.gif";
	smileyarr["DGX-BoyS-cowboy"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuJjxUxHbI/AAAAAAAAAN4/weMwh2W-Vbs/48.gif";
	smileyarr["DGX-BoyS-on call"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuKvNK_thI/AAAAAAAAASQ/P1O6A_Jzn0Q/100.gif";
	smileyarr["DGX-BoyS-call me"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuK-c0SGuI/AAAAAAAAASc/aibbDmbXWXU/101.gif";
	smileyarr["DGX-BoyS-irritated"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuK-lyVK-I/AAAAAAAAASk/xLEqZKPp8SM/102.gif";
	smileyarr["DGX-BoyS-bye"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuK-gF040I/AAAAAAAAASs/65kv4PZWAZw/103.gif";
	smileyarr["DGX-BoyS-time up"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuK-iSz-yI/AAAAAAAAAS0/9uysSZlzT8A/104.gif";
	smileyarr["DGX-BoyS-day dreaming"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuK-yuyKEI/AAAAAAAAAS8/uEQA7X533lI/105.gif";
	smileyarr["DGX-BoyS-dun wanna see"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuLLz4RofI/AAAAAAAAATg/tA28Y5eygqU/109.gif";
	smileyarr["DGX-BoyS-hurry up"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuLL0Dr12I/AAAAAAAAATo/JtloRJFAsrY/110.gif";
	smileyarr["DGX-BoyS-rock on"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuLa0APC4I/AAAAAAAAAT0/Byp-A64JOcI/111.gif";
	smileyarr["DGX-BoyS-thumbs down"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuLa9ZapJI/AAAAAAAAAT8/z19iop_L3xY/112.gif";
	smileyarr["DGX-BoyS-thumbs up"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuLbI3nJNI/AAAAAAAAAUE/eoB1MdshuR8/113.gif";
	smileyarr["DGX-BoyS-i dunno"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuLbWzQfxI/AAAAAAAAAUM/5S_SXcF_M2k/114.gif";
	smileyarr["DGX-BoyS-bow"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuKuWOdq4I/AAAAAAAAAR4/SOunUaC55Uc/77.gif";
	smileyarr["DGX-BoyS-chatterbox"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuKuSbiDjI/AAAAAAAAARw/s7-vyqjXPbA/76.gif";
	smileyarr["DGX-BoyS-bring it on"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuKQRq6UtI/AAAAAAAAAQ4/Q_5LqPnrp-A/70.gif";
	smileyarr["DGX-BoyS-whistling"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuKBjhXVEI/AAAAAAAAAQM/kglAG1tmbrE/65.gif";
	smileyarr["DGX-BoyS-money eyes"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuKBToVgMI/AAAAAAAAAQE/sRRVz78Cjpg/64.gif";
	smileyarr["DGX-BoyS-pray"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuKBFYLqfI/AAAAAAAAAP8/3qPz86IcPZw/63.gif";
	smileyarr["DGX-BoyS-frustated"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuKAgxyxdI/AAAAAAAAAP0/dFuuChpURnE/62.gif";
	smileyarr["DGX-BoyS-dancing"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuKQBLZHYI/AAAAAAAAAQw/PrhwqxdVhTc/69.gif ";
	smileyarr["DGX-BoyS-not listening"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuLLRFhIuI/AAAAAAAAATQ/JQR-FtQCPzE/107.gif";
	smileyarr["DGX-BoyS-shame on u"]=" http://lh4.ggpht.com/_ruaAx3sdhe8/SRuKP9lVD-I/AAAAAAAAAQo/GjBTHfO0xzQ/68.gif ";
	smileyarr["DGX-BoyS-oh cum on"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuKuie9NnI/AAAAAAAAASA/zbu67fcigPc/78.gif";
	smileyarr["DGX-BoyS-no idea"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuLLYYXGJI/AAAAAAAAATI/97OX_dsEecY/106.gif";
	smileyarr["DGX-BoyS-feelin beat up"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuKPLoEDmI/AAAAAAAAAQY/M5xAgHmHQP8/66.gif";
	smileyarr["DGX-BoyS-bug"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuJ3fW72iI/AAAAAAAAAPg/riNaGU4v998/60.gif";
	smileyarr["DGX-BoyS-skul"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuJ3cNVWuI/AAAAAAAAAPY/6gdsYN552Mw/59.gif";
	smileyarr["DGX-BoyS-idea"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuJ3Oym8jI/AAAAAAAAAPQ/hy6-4DedS6o/58.gif";
	smileyarr["DGX-BoyS-goodluck"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuJuVdvUKI/AAAAAAAAAOs/5hCy2QkftDI/54.gif";
	smileyarr["DGX-BoyS-rose"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuJuGmrFoI/AAAAAAAAAOk/5zqFRFikOe0/53.gif";
	smileyarr["DGX-BoyS-chic"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuJuC8VJJI/AAAAAAAAAOc/OC5Q8lId-Dg/52.gif";
	smileyarr["DGX-BoyS-monkey"]=" http://lh4.ggpht.com/_ruaAx3sdhe8/SRuJuKwcfiI/AAAAAAAAAOU/6EciMb-eGcQ/51.gif";
	smileyarr["DGX-BoyS-cow"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuJkTjLdcI/AAAAAAAAAOI/NAgMRJQ5vwM/50.gif";
	smileyarr["DGX-BoyS-pig"]=" http://lh4.ggpht.com/_ruaAx3sdhe8/SRuJkFVQ21I/AAAAAAAAAOA/oTw7PJufnaY/49.gif";
	smileyarr["DGX-BoyS-dog"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuLL8LQt4I/AAAAAAAAATY/dM7GCDpN2YU/108.gif";
	smileyarr["DGX-BoyS-star"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuKu1rNzII/AAAAAAAAASI/B8Nyt8v9PDk/79.gif";
	smileyarr["DGX-BoyS-OD"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuKa4M6GbI/AAAAAAAAARM/awXItYFE9-g/72.gif";
	smileyarr["DGX-BoyS-FENIL"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuKbGT4HOI/AAAAAAAAARU/4C0-QOktnuc/73.gif";
	smileyarr["DGX-BoyS-NIYATI"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuKbHqxh6I/AAAAAAAAARc/aRZmqMm0Qjc/74.gif";
	smileyarr["DGX-BoyS-pirate"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRulXOtO8hI/AAAAAAAAAU4/i3VX5vrCtIg/pirate_2.gif";
	smileyarr["DGX-BoyS-transformer"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRulXOJowHI/AAAAAAAAAVA/Rd5wZb59uTo/transformer.gif";
	smileyarr["DGX-BoyS-alien"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuKAl1fVpI/AAAAAAAAAPs/BD51ld0tn5g/61.gif";
	smileyarr["DGX-BoyS-bee"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuLbksRYPI/AAAAAAAAAUU/RImw1gDN4w0/115.gif";
	smileyarr["DGX-BoyS-pumpkin"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuJ3GXE2uI/AAAAAAAAAPA/1db4aZbgqTA/56.gif";
	smileyarr["DGX-BoyS-tea"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuJ3D__jEI/AAAAAAAAAPI/kDLURoPSiJo/57.gif";
	

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

// DGX-Rules