Share / Save
E-mail
Bookmark
OrkutFacebookDeliciousGoogle BookmarksMySpaceYahoo BuzzStumbleUponBeboWordPressNetvibes ShareStrandsDailyMeTechNetArtoSmakNewsAIMIdenti.caBlogger PostBox.netNetlogShoutwireJumptagsHemidemiInstapaperXerpiWinkBibSonomyBlogMarksStartAidKhabbrYoolinkTechnotizieMultiplyPlaxo PulseSquidooBlinklistYiGGSegnaloYouMobFarkJamespotTwiddlaMindBodyGreenHuggNowPublicTumblrCurrentSpurlOneviewSimpyBuddyMarksViadeoWistsBackflipSiteJotHealth RankerCare2 NewsSphereGabbrTagzaFolkdNewsTrustPrintFriendly
// ==UserScript==
// @name          Yahoo  smilies for Orkut by Ali
// @namespace     http://www.orkut.com/Main#Home
// @author		  Rubin Jose
// @description   Yahoo  smilies for Orkut by Ali
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


/*No Questions*/


	smileyarr["Ali_gaad"]="http://lh5.ggpht.com/_ruaAx3sdhe8/SRuKaszXcVI/AAAAAAAAARE/Ko_x66AexLM/71.gif";
	smileyarr["Ali_gaad"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRz26BLLYkI/AAAAAAAAAVs/-x_1Z2wgwcY/2.gif";
	smileyarr["Ali_gaad"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRz4T6NAQdI/AAAAAAAAAXo/BW5ATaXwD-A/16.gif";
	smileyarr["Ali_gaad"]="http://lh3.ggpht.com/_ruaAx3sdhe8/SRuKuie9NnI/AAAAAAAAASA/zbu67fcigPc/78.gif";
	smileyarr["Ali_gaad"]="http://lh4.ggpht.com/_ruaAx3sdhe8/SRuLLYYXGJI/AAAAAAAAATI/97OX_dsEecY/106.gif";
	smileyarr["Ali_gaad"]="http://lh6.ggpht.com/_ruaAx3sdhe8/SRuICDnyLBI/AAAAAAAAAMc/nhBk9mc-WcA/39.gif";
	smileyarr["Ali_gaad"]="http://lh5.ggpht.com/__I_kXxoOkMc/SniGBmjK2RI/AAAAAAAAAeg/jFtbTGTkxT4/s800/disdain004.gif";
	smileyarr["Ali_gaad"]="http://s6.tinypic.com/9r1svk_th.jpg";
	smileyarr["Ali_gaad"]="http://s6.tinypic.com/1z6e12_th.jpg";
	smileyarr["Ali_gaad"]="http://s6.tinypic.com/2elz1ol_th.jpg";
	
	

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

// Ali-Rules

