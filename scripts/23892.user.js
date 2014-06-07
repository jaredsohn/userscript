// ==UserScript==
// @name         Very New Yahoo Mail Beta, Yahoo Mail & Classic Ad, Footer & Sidepan Removal
// @namespace     http://www.devsol.co.nr/
// @description	  removes the ads last updated 19-01-2011
// @include       http://*.mail.yahoo.com/neo/*
// @include       http://*.mail.yahoo.com/mc/welcome?*
// @include       http://*.mail.yahoo.com/ym/login*
// @include       http://*.mail.yahoo.com/ym/ShowFolder*
// @include       http://*.mail.yahoo.com/ym/ShowLetter*
// @include       http://*.mail.yahoo.com/ym/Compose*
// @include       http://*.mail.yahoo.com/dc/launch*
// @include       http://*.mail.yahoo.com/ym/Folders*
// @include       http://*.mg.mail.yahoo.com/*
// ==/UserScript==

GM_addStyle("iframe#emptyFolderFrame{ visibility:hidden;display:none;	}");
GM_addStyle("embed 					{ visibility:hidden;display:none;	}");
GM_addStyle("div#nwad 				{ visibility:hidden;display:none;	}");
GM_addStyle("div#swads 				{ visibility:hidden;display:none;	}");
GM_addStyle("iframe#N					{ visibility:hidden;display:none;	}");

GM_addStyle("div#theAd 2		 		{ visibility:hidden;display:none;	}"); 	// removes right ads //Beta 2
GM_addStyle("div#theAd		 		{ visibility:hidden;display:none;	}"); 	// removes right ads // Beta 2
GM_addStyle("div#slot_LREC		 		{ visibility:hidden;display:none;	}"); 	// removes main pan ads // Beta 2
GM_addStyle("div#upsell		 		{ visibility:hidden;display:none;	}"); 	// removes main pan ads // Beta 2
GM_addStyle("div#gx_top_searches		{ visibility:hidden;display:none;	}"); 	// removes Trending Now from What's New(Y! New Existing)
GM_addStyle("div#slot_MIP4				{ visibility:hidden;display:none;	}"); 	// removes ad in from What's New (bellow Trending Now, Y! New Existing)

GM_addStyle("div#mg_slot_LREC 		{ visibility:hidden;display:none;	}"); 	// removes right ads
GM_addStyle("div#MNW 				{ visibility:hidden;display:none;	}"); 	// removes left ads above 'Folders'
GM_addStyle("iframe#REC				{ visibility:hidden;display:none;	}"); 	// removes left ads bellow 'My Folders'
GM_addStyle("div#mg_footer 			{ visibility:hidden;display:none;	}"); 	// removes footer copyright, TOS text
GM_addStyle("div#northbanner 			{ visibility:hidden;display:none;	}"); 	// removes top ads slot (Y! Mail Classic)
GM_addStyle("div#MIP4			 		{ visibility:hidden;display:none;	}"); 	// removes right ads (Y! Mail Classic)

// finally increasing width of msg list
var bod = document.getElementsByTagName('body')[0]; var ymStyle = document.createElement("style");
ymStyle.innerHTML = "#paneshell #shellcontent{right:0px !important;},.nav-bar div.tabs {padding-left:0px !important;}#paneshell #shellnavigation";
bod.insertBefore(ymStyle, bod.firstChild);