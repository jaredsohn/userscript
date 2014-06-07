Share / Save
E-mail
Bookmark
FacebookGoogle BuzzNewsVineDeliciousGoogle BookmarksMySpaceYahoo BuzzStumbleUponBeboWordPressNetvibes ShareStrandsDailyMeTechNetArtoSmakNewsAIMIdenti.caBlogger PostBox.netNetlogShoutwireJumptagsHemidemiInstapaperXerpiWinkBibSonomyBlogMarksStartAidKhabbrYoolinkTechnotizieMultiplyPlaxo PulseSquidooBlinklistYiGGSegnaloYouMobFarkJamespotTwiddlaMindBodyGreenHuggNowPublicTumblrCurrentSpurlOneviewSimpyBuddyMarksViadeoWistsBackflipSiteJotHealth RankerCare2 NewsSphereGabbrTagzaFolkdNewsTrustPrintFriendly
Yahoo MailAOL Mail
	
TwitterDiggOrkutRedditWindows Live FavoritesYahoo BookmarksMister-WongGoogle ReaderEvernoteStumpediaPosterousMSDNExpressionTipdPlurkYahoo MessengerMozillacaTypePad PostMixxTechnorati FavoritesCiteULikeWindows Live SpacesFunPPhoneFavsNetvouzDiigoTagglyTailrankKledyMeneameBookmarks.frFriendFeedPingProtopage BookmarksFavesWebnewsPushaSlashdotAllvoicesImera BrazilLinkaGoGounalogDiglogPropellerLiveJournalHelloTxtYampleLinkatopiaLinkedInAsk.com MyStuffMapleConnoteaMyLinkVaultSphinnDZoneHyvesBitty BrowserSymbaloo FeedsFoxiewireVodPodAmazon Wish ListRead It Later
Google GmailHotmail
Send from any other e-mail address or e-mail program:
Any e-mail
Powered by AddToAny
Userscripts.org
rogger

    * comments
    * favorite scripts
    * monitored topics
    * script management
    * settings
    * public profile

| Logout
0 unread messages
Search all scripts

    * Scripts
    * Jetpacks
    * Tags
    * Forums
    * People
    * Blog
    * Groups
    * Guides
    * Books

Yahoo smilies only (Small & big animated) for Orkut by Rajeev Raj.D
By Rajeev Raj — Last update Feb 16, 2010 — Installed 237 times. Daily Installs: 1, 0, 0, 1, 1, 1, 0, 0, 0, 2, 0, 1, 0, 3, 2, 3, 2, 2, 7, 0, 1, 2, 2, 4, 1, 1, 3, 4, 3, 3, 1, 0

    * About
    * Source Code
    * Reviews 0
    * Discussions 0
    * Fans 0
    * Issues
    * Share

Add Syntax Highlighting (this will take a few seconds, probably freezing your browser while it works)

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

Because it's your web

Powered by overstimulate with the help of many friends

Policy & Guidelines: DMCA Privacy Policy
