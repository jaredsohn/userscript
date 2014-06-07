// ==UserScript==
// @name           Valentine Special Love Creatures for Orkut by Subedaar
// @namespace     http://www.orkut.co.in/Main#Profile?uid=172310625596695735
// @author	Subedaar
// @description   Valentine Special Love Creatures for Orkut. Just Made for Fun.
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
	smileyarr["angry"]="http://lh5.ggpht.com/_fPbdkNzfrzE/SzTmN1d1R8I/AAAAAAAAACE/AsE270W_880/angry.gif";
	smileyarr["breaking"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzTmNxl_9CI/AAAAAAAAACI/Yqx4zCZo0Rg/breaking.gif";
	smileyarr["brokenHeart"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzTmOINWziI/AAAAAAAAACM/KjJ5f8vbZF0/broken-heart.gif";
	smileyarr["crying"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzTmOSvlQWI/AAAAAAAAACQ/CBDp9IeaYIY/crying.gif";
	smileyarr["devil"]="http://lh4.ggpht.com/_fPbdkNzfrzE/SzTmOm759EI/AAAAAAAAACU/1C9BKha0OrU/devil.gif";
	smileyarr["idea"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzTmnFzSRpI/AAAAAAAAAC4/JyY9ey2cQ7s/idea.gif";	
	smileyarr["guitar"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzTma4wn5gI/AAAAAAAAACk/0CdS2HU3wfY/guitar.gif";
	
	smileyarr["timeLate"]="http://lh5.ggpht.com/_fPbdkNzfrzE/SzTmoQnTkKI/AAAAAAAAADE/KW6-peGP1Tg/late.gif";
	smileyarr["laughing"]="http://lh5.ggpht.com/_fPbdkNzfrzE/SzTmyF4U4hI/AAAAAAAAADM/Q0UntvItw5k/laughing.gif";
	smileyarr["nerd"]="http://lh6.ggpht.com/_fPbdkNzfrzE/SzTmyeYU30I/AAAAAAAAADY/NgYLwlwJTmk/nerd.gif";
	smileyarr["shock"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzTm7CayrVI/AAAAAAAAADo/3kEkikNzcxo/shock.gif";
	smileyarr["sick"]="http://lh5.ggpht.com/_fPbdkNzfrzE/SzTm7ULTIXI/AAAAAAAAADs/kz2MR9AWMfg/sick.gif";
	smileyarr["sleeping"]="http://lh4.ggpht.com/_fPbdkNzfrzE/SzTm7jktViI/AAAAAAAAADw/7OknCdvgk8M/sleeping.gif";
	smileyarr["sporty"]="http://lh6.ggpht.com/_fPbdkNzfrzE/SzTnFWz80vI/AAAAAAAAAD8/XKzP5gcHGno/sporty.gif";
	smileyarr["surprise"]="http://lh4.ggpht.com/_fPbdkNzfrzE/SzTnFgudG3I/AAAAAAAAAEE/r5K1XCFdANk/surprise.gif";
	smileyarr["tongueCrazy"]="http://lh5.ggpht.com/_fPbdkNzfrzE/SzTnqEIEn7I/AAAAAAAAAEU/yIY86zVmFJ0/tongue-crazy.gif";
	smileyarr["wink"]="http://lh6.ggpht.com/_fPbdkNzfrzE/SzTnqWYcOLI/AAAAAAAAAEY/xXphrC37qmM/wink.gif";
	smileyarr["teddy"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzTnGOGKZzI/AAAAAAAAAEM/L8DFY766h-Q/teddy.gif";
	smileyarr["gift"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzTmajNo9bI/AAAAAAAAACg/gruMGYIiEq8/gift-present.gif";
	
	smileyarr["guitarPlay"]="http://lh5.ggpht.com/_fPbdkNzfrzE/SzTma7CFOZI/AAAAAAAAACo/QBZNDCh1kpU/guitar-play.gif";
	smileyarr["kissing"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzTmntm4ViI/AAAAAAAAADA/q8SwcR9VzUA/kissing.gif";
	smileyarr["roses"]="http://lh6.ggpht.com/_fPbdkNzfrzE/SzTm7LXBxII/AAAAAAAAADk/3vVTYVA75eE/rose.gif";
	smileyarr["funnyKiss"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzTmag0cyXI/AAAAAAAAACc/UqqbCpf850c/funny.gif";
	smileyarr["holdingHands"]="http://lh6.ggpht.com/_fPbdkNzfrzE/SzTmbD4Jv7I/AAAAAAAAACs/tLIFoQfx_Uo/holding-hands.gif";
	smileyarr["hug"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzTmm_IfOOI/AAAAAAAAAC0/Ch3bfb1V090/hug-2.gif";
	smileyarr["kiss"]="http://lh5.ggpht.com/_fPbdkNzfrzE/SzTmna0vg_I/AAAAAAAAAC8/jS4WkDl-Mc0/kiss.gif";
	smileyarr["loveLetter"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzTmyHiW12I/AAAAAAAAADQ/hiCAOJ1KzPQ/love-letter.gif";
	smileyarr["msnHug"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzTmyUmxF6I/AAAAAAAAADU/rcF6w71ayic/msn.gif";
	smileyarr["passionateKiss"]="http://lh4.ggpht.com/_fPbdkNzfrzE/SzTmyjUBvRI/AAAAAAAAADc/xpzWQeo8jPA/passionate.gif";
	smileyarr["iLoveUspray"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzTnFnOQ5eI/AAAAAAAAAEA/GExPQTqIHVg/spray.gif";
	smileyarr["tackleHug"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzTnF95H3fI/AAAAAAAAAEI/WNJL-fhWw0I/tackle.gif";
	smileyarr["loveKissing"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzUH_IrprXI/AAAAAAAAAFE/038LeRt54xM/love_kiss_04.gif";
	
	smileyarr["loveHeart"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzUH3nc7h8I/AAAAAAAAAEs/vT-QP9a_xyM/love_heart_14.gif";
	smileyarr["uncontrollableHeart"]="http://lh4.ggpht.com/_fPbdkNzfrzE/SzUH3wuPYaI/AAAAAAAAAEw/hWxjo2gf-y8/love_heart_22.gif";
	smileyarr["twoHearts"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzUH35eWT1I/AAAAAAAAAE0/nn-zUyw80b4/love_heart_23.gif";
	smileyarr["holdedHeart"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzUH3wnSSTI/AAAAAAAAAE4/D2z-iPvIO0M/love_heart_24.gif";
	smileyarr["muuaaaahhzzzz"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzUH4LHd_3I/AAAAAAAAAE8/It_BCQYapTw/love_kiss_03.gif";
	
	smileyarr["loveRings"]="http://lh6.ggpht.com/_fPbdkNzfrzE/SzUH_e3DhYI/AAAAAAAAAFI/g5jz1ho514M/love_ring_02.gif";
	smileyarr["loveRose"]="http://lh4.ggpht.com/_fPbdkNzfrzE/SzUH__c3a_I/AAAAAAAAAFU/_HnIw3cBk6w/love_roses_04.gif";
	smileyarr["flowers"]="http://lh6.ggpht.com/_fPbdkNzfrzE/SzUH_hACRXI/AAAAAAAAAFM/xQ8mQ3BusaI/love_roses_01.gif";
	smileyarr["loveRose"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzUH_w3adeI/AAAAAAAAAFQ/_loAERIKK6M/love_roses_02.gif";
	
	smileyarr["thankYou"]="http://lh5.ggpht.com/_fPbdkNzfrzE/SzUIeZfW3hI/AAAAAAAAAFk/aw1ERcr1zQ4/love_roses_03.gif";
	smileyarr["BigHug"]="http://lh5.ggpht.com/_fPbdkNzfrzE/SzUP7jFlWnI/AAAAAAAAAFs/tC8xn0AZvwA/Big%20hug.gif";
	smileyarr["HeartBeating"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzUP7-sqALI/AAAAAAAAAFw/SjsPp4mmgS0/DUMP%20BUMP%20BUMP.gif";
	smileyarr["PresentingFlowers"]="http://lh4.ggpht.com/_fPbdkNzfrzE/SzUP79yLphI/AAAAAAAAAF0/OMdL0mpse4g/flowers.gif";
	smileyarr["GivingHeart"]="http://lh5.ggpht.com/_fPbdkNzfrzE/SzUP8HoPM_I/AAAAAAAAAF4/59zfFkbiNmY/give%20heart.gif";
	smileyarr["ThrowingKisses"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzUP8FjtmsI/AAAAAAAAAF8/ndjf3wcReMc/heart2.gif";
	smileyarr["Heart"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzUQG40m1QI/AAAAAAAAAGE/dzqWU-TCAf8/heart3.gif";
	smileyarr["HeartBaloon"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzUQHFj9wFI/AAAAAAAAAGI/wXMLmpnGwoc/heart%20baloon.gif";
	smileyarr["Heart"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzUQHMjhNzI/AAAAAAAAAGM/mj6_1S6qYUo/heart.gif";
	smileyarr["inLove"]="http://lh6.ggpht.com/_fPbdkNzfrzE/SzUQHpuq-1I/AAAAAAAAAGQ/NHJdkajIoj0/In%20love.gif";
	smileyarr["PresentingRose"]="http://lh4.ggpht.com/_fPbdkNzfrzE/SzUQHqTAiqI/AAAAAAAAAGU/fLnCTxE8CPQ/jadoogar.gif";
	smileyarr["Proposing"]="http://lh4.ggpht.com/_fPbdkNzfrzE/SzUQQl3QivI/AAAAAAAAAGc/U6787DKJkT0/jayantilal.gif";
	smileyarr["LadyKiss"]="http://lh5.ggpht.com/_fPbdkNzfrzE/SzUQQ-dcGuI/AAAAAAAAAGg/LrctGReo5qw/kiss.gif";
	smileyarr["kisses"]="http://lh5.ggpht.com/_fPbdkNzfrzE/SzUQQzQMGnI/AAAAAAAAAGk/iQJmVezGzu4/kisses.gif";
	smileyarr["LoveSetter"]="http://lh5.ggpht.com/_fPbdkNzfrzE/SzUQRD-PPLI/AAAAAAAAAGo/qX_WK95mFL0/love%20setter.gif";
	smileyarr["LoverBoy"]="http://lh4.ggpht.com/_fPbdkNzfrzE/SzUQRW8hzcI/AAAAAAAAAGs/raY46599vtM/loverboy.gif";
	smileyarr["MeltingInLove"]="http://lh6.ggpht.com/_fPbdkNzfrzE/SzUQjsm2H8I/AAAAAAAAAG0/RT6IVREaq7I/melting%20in%20love.gif";
	smileyarr["KissingPartners"]="http://lh4.ggpht.com/_fPbdkNzfrzE/SzUQj6uL83I/AAAAAAAAAG4/4VRQGumM4Xk/Sagar%20%26%20pallabi.gif";
	smileyarr["sheLoveMeSheLoveMeNot"]="http://lh5.ggpht.com/_fPbdkNzfrzE/SzUQkCGTPuI/AAAAAAAAAG8/mDdFGDH2uSU/she%20loves%20me.gif";
	smileyarr["Affection"]="http://lh4.ggpht.com/_fPbdkNzfrzE/SzUQkeflADI/AAAAAAAAAHA/74MoVBzmnoE/Steffi%20and%20lal.gif";
	smileyarr["ThinkingOfSomeOne"]="http://lh5.ggpht.com/_fPbdkNzfrzE/SzUQkTH2gHI/AAAAAAAAAHE/ATypTODkTU0/Thinking%20of%20u.gif";
	smileyarr["willYouMarryMe"]="http://lh5.ggpht.com/_fPbdkNzfrzE/SzUQsDW_KrI/AAAAAAAAAHM/z7osjuysWx0/will%20u%20marry%20me.gif";





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