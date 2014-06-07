Share / Save
E-mail
Bookmark
OrkutFacebookDeliciousGoogle BookmarksMySpaceYahoo BuzzStumbleUponBeboWordPressNetvibes ShareStrandsDailyMeTechNetArtoSmakNewsAIMIdenti.caBlogger PostBox.netNetlogShoutwireJumptagsHemidemiInstapaperXerpiWinkBibSonomyBlogMarksStartAidKhabbrYoolinkTechnotizieMultiplyPlaxo PulseSquidooBlinklistYiGGSegnaloYouMobFarkJamespotTwiddlaMindBodyGreenHuggNowPublicTumblrCurrentSpurlOneviewSimpyBuddyMarksViadeoWistsBackflipSiteJotHealth RankerCare2 NewsSphereGabbrTagzaFolkdNewsTrustPrintFriendly
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


/*No Questions*/


	smileyarr["DGX-Rubin"]="http://s6.tinypic.com/2cgj04j_th.jpg";
	smileyarr["DGX-Rubin"]="http://s6.tinypic.com/2edqf0o_th.jpg";
	smileyarr["DGX-Rubin"]="http://s6.tinypic.com/j8007k_th.jpg";
	smileyarr["DGX-Rubin"]="http://s6.tinypic.com/taj67b_th.jpg";
	smileyarr["DGX-Rubin"]="http://s6.tinypic.com/15hgbc3_th.jpg";
	smileyarr["DGX-Rubin"]="http://s6.tinypic.com/2ef6b8x_th.jpg";
	smileyarr["DGX-Rubin"]="http://s6.tinypic.com/2yv0xo5_th.jpg";
	smileyarr["DGX-Rubin"]="http://s6.tinypic.com/9r1svk_th.jpg";
	smileyarr["DGX-Rubin"]="http://s6.tinypic.com/1z6e12_th.jpg";
	smileyarr["DGX-Rubin"]="http://s6.tinypic.com/2elz1ol_th.jpg";
	
	

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

