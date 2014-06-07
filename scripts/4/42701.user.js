// ==UserScript==
// @name          Yuwie Auto View Page
// @author        slamet s.
// @include	  http://www.yuwie.com/*
// @include	  https://www.yuwie.com/*
// @description	  Yuwie Auto View Page every 10 seconds (This script is modification from script by adicia : http://userscripts.org/scripts/source/35957.user.js)
// ==/UserScript==

profile1 = "http://www.yuwie.com/members/";

www11  = "http://www.yuwie.com/members/feed.asp";
www12  = "http://www.yuwie.com/members/settings/";
www13  = "http://www.yuwie.com/members/settings/password.asp?";
www14  = "http://www.yuwie.com/members/settings/question.asp?";
www15  = "http://www.yuwie.com/members/settings/email.asp?";
www16  = "http://www.yuwie.com/members/settings/timezone.asp?";
www17  = "http://www.yuwie.com/members/settings/privacy.asp?";
www18  = "http://www.yuwie.com/members/settings/notify.asp?";
www19  = "http://www.yuwie.com/members/settings/filter.asp?";
www110  = "https://www.yuwie.com/members/settings/payment.asp?";
www111  = "https://www.yuwie.com/members/settings/taxes.asp?";
www112  = "http://www.yuwie.com/members/mail/";
www113  = "http://www.yuwie.com/members/mail/sent.asp?";
www114  = "http://www.yuwie.com/members/mail/search.asp?";
www115  = "http://www.yuwie.com/members/mail/deleted.asp?";
www116  = "http://www.yuwie.com/members/friends/";
www117  = "http://www.yuwie.com/members/friends/?m=y";
www118  = "http://www.yuwie.com/members/friends/top.asp?";
www119  = "http://www.yuwie.com/members/friends/prequests.asp?";
www120  = "http://www.yuwie.com/members/friends/block.asp?w=v";
www121  = "http://www.yuwie.com/members/friends/ignore.asp?w=v";
www122  = "http://www.yuwie.com/members/referrals/main.asp?";
www123  = "http://www.yuwie.com/members/referrals/tree.asp?";
www124  = "http://www.yuwie.com/members/earnings/";
www125  = "http://www.yuwie.com/members/favs/";
www126  = "http://www.yuwie.com/members/clubs/";
www127  = "http://www.yuwie.com/members/videos/";
www128  = "http://www.yuwie.com/members/videos/up.asp?";
www129  = "http://www.yuwie.com/members/pictures/";
www130  = "http://www.yuwie.com/members/pictures/slide.asp?";
www131  = "http://www.yuwie.com/members/schools/";
www132  = "http://www.yuwie.com/members/blog/";
www133  = "http://www.yuwie.com/members/blog/settings.asp?";
www134  = "http://www.yuwie.com/members/blog/order.asp?";
www135  = "http://www.yuwie.com/members/blog/new.asp?";
www136  = "http://www.yuwie.com/members/comman/";
www137  = "http://www.yuwie.com/members/comman/manual.asp?w=p";
www138  = "http://www.yuwie.com/members/comman/manual.asp?w=b";
www139  = "http://www.yuwie.com/members/comman/manual.asp?w=pic";
www140  = "http://www.yuwie.com/members/news/";
www141  = "http://www.yuwie.com/members/profile/";
www142  = "http://www.yuwie.com/members/profile/bio.asp?";
www143  = "http://www.yuwie.com/members/profile/interests.asp?";
www144  = "http://www.yuwie.com/members/profile/shoutbox.asp?";
www145  = "http://www.yuwie.com/members/profile/layout.asp?";
www146  = "http://www.yuwie.com/members/profile/layout.asp?w=c";
www147  = "http://www.yuwie.com/members/profile/layout.asp?w=";
www148  = "http://www.yuwie.com/members/profile/new.asp?";
www149  = "http://www.yuwie.com/members/profile/new.asp?w=g";
www150  = "http://www.yuwie.com/members/profile/new.asp?w=a";
www151  = "http://www.yuwie.com/members/rss/";
www152  = "http://www.yuwie.com/members/Default.asp?";
www153  = "http://www.yuwie.com/members/settings/Default.asp?";
www154  = "http://www.yuwie.com/members/mail/Default.asp?";
www155  = "http://www.yuwie.com/members/friends/Default.asp?";
www156  = "http://www.yuwie.com/members/referrals/links.asp?";
www157  = "http://www.yuwie.com/members/earnings/Default.asp?";
www158  = "http://www.yuwie.com/members/earnings/payments.asp?";
www159  = "http://www.yuwie.com/members/earnings/total.asp?";
www160  = "http://www.yuwie.com/members/favs/Default.asp?";
www161  = "http://www.yuwie.com/members/clubs/Default.asp?";
www162  = "http://www.yuwie.com/members/clubs/add.asp?";
www163  = "http://www.yuwie.com/members/notice/sent.asp?";
www164  = "http://www.yuwie.com/members/notice/";
www165  = "http://www.yuwie.com/members/notice/send.asp?";



var INTERVAL = 10000;

window.setTimeout(
				  
	function()
	{			
			if (document.location.href == profile1) {
				document.location=www11;
			}
			else if (document.location.href == www11) {
				document.location=www12;
			}
			else if (document.location.href == www12) {
				document.location=www13;
			}
			else if (document.location.href == www13) {
				document.location=www14;
			}
			else if (document.location.href == www14) {
				document.location=www15;
			}
			else if (document.location.href == www15) {				
				document.location=www16;
			}
			else if (document.location.href == www16) {
				document.location=www17;
			}
			else if (document.location.href == www17) {
				document.location=www18;
			}
			else if (document.location.href == www18) {
				document.location=www19;
			}
			else if (document.location.href == www19) {
				document.location=www110;
			}
			else if (document.location.href == www110) {
				document.location=www111;
			}
			else if (document.location.href == www111) {
				document.location=www112;
			}
			else if (document.location.href == www112) {
				document.location=www113;
			}
			else if (document.location.href == www113) {
				document.location=www114;
			}
			else if (document.location.href == www114) {
				document.location=www115;
			}
			else if (document.location.href == www115) {
				document.location=www116;
			}
			else if (document.location.href == www116) {
				document.location=www117;
			}
			else if (document.location.href == www117) {
				document.location=www118;
			}
			else if (document.location.href == www118) {
				document.location=www119;
			}
			else if (document.location.href == www119) {
				document.location=www120;
			}
			else if (document.location.href == www120) {
				document.location=www121;
			}
			else if (document.location.href == www121) {
				document.location=www122;
			}
			else if (document.location.href == www122) {
				document.location=www123;
			}
			else if (document.location.href == www123) {
				document.location=www124;
			}
			else if (document.location.href == www124) {
				document.location=www125;
			}
			else if (document.location.href == www125) {
				document.location=www126;
			}
			else if (document.location.href == www126) {
				document.location=www127;
			}
			else if (document.location.href == www127) {
				document.location=www128;
			}
			else if (document.location.href == www128) {
				document.location=www129;
			}
			else if (document.location.href == www129) {
				document.location=www130;
			}
			else if (document.location.href == www130) {
				document.location=www131;
			}
			else if (document.location.href == www131) {
				document.location=www132;
			}
			else if (document.location.href == www132) {
				document.location=www133;
			}
			else if (document.location.href == www133) {
				document.location=www134;
			}
			else if (document.location.href == www134) {
				document.location=www135;
			}
			else if (document.location.href == www135) {
				document.location=www136;
			}
			else if (document.location.href == www136) {
				document.location=www137;
			}
			else if (document.location.href == www137) {
				document.location=www138;
			}
			else if (document.location.href == www138) {
				document.location=www139;
			}
			else if (document.location.href == www139) {
				document.location=www140;
			}
			else if (document.location.href == www140) {
				document.location=www141;
			}
			else if (document.location.href == www141) {
				document.location=www142;
			}
			else if (document.location.href == www142) {
				document.location=www143;
			}
			else if (document.location.href == www143) {
				document.location=www144;
			}
			else if (document.location.href == www144) {
				document.location=www145;
			}
			else if (document.location.href == www145) {
				document.location=www146;
			}
			else if (document.location.href == www146) {
				document.location=www147;
			}
			else if (document.location.href == www147) {
				document.location=www148;
			}
			else if (document.location.href == www148) {
				document.location=www149;
			}
			else if (document.location.href == www149) {
				document.location=www150;
			}
			else if (document.location.href == www150) {
				document.location=www151;
			}
			else if (document.location.href == www151) {
				document.location=www152;
			}
			else if (document.location.href == www152) {
				document.location=www153;
			}
			else if (document.location.href == www153) {
				document.location=www154;
			}
			else if (document.location.href == www154) {
				document.location=www155;
			}
			else if (document.location.href == www155) {
				document.location=www156;
			}
			else if (document.location.href == www156) {
				document.location=www157;
			}
			else if (document.location.href == www157) {
				document.location=www158;
			}
			else if (document.location.href == www158) {
				document.location=www159;
			}
			else if (document.location.href == www159) {
				document.location=www160;
			}
			else if (document.location.href == www160) {
				document.location=www161;
			}
			else if (document.location.href == www161) {
				document.location=www162;
			}
			else if (document.location.href == www162) {
				document.location=www163;
			}
			else if (document.location.href == www163) {
				document.location=www164;
			}
			else if (document.location.href == www164) {
				document.location=www165;
			}
			else if (document.location.href == www165) {
				document.location=www11;
			}

		},
		INTERVAL
	);

