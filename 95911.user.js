// ==UserScript==
// @name         Ads free Santabanta and indyarocks.com
// @namespace     http://www.devsol.co.nr/
// @description	  removes the ads Created 02-02-2011 last updated 03-02-2011
// @include      http://forum.santabanta.com/showthread.*
// @include      http://*.santabanta.com*
// @include      http://www.indyarocks.com/*
// ==/UserScript==

//santabanta.com
GM_addStyle("div#google_ads_div_Forum_728							{ visibility:hidden;display:none;	}"); // Right Bottom Pop up ad

//IndyaRocks
GM_addStyle("div.smsnonmembersBX								{ position:absolute;top:80px;	}");  // Moving send sms to anyone to top
GM_addStyle("div.sms2friendsBX									{ position:absolute;top:80px;left:500px;	}"); // moving send sms to friends to top and right
GM_addStyle("div#google_ads_div_SMS_confirm_728x140				{ visibility:hidden;display:none;	}"); // Send sms page
GM_addStyle("div#google_flash_div								{ visibility:hidden;display:none;	}"); // Send sms page
GM_addStyle("div#hid											{ visibility:hidden;display:none;	}"); // Send sms page

GM_addStyle("div#komliAd										{ visibility:hidden;display:none;	}"); // Send sms page
GM_addStyle("embed #google_flash_embed						{ visibility:hidden;display:none;	}"); // self profile view
GM_addStyle("div#google_ads_div_sms2_336x280					{ visibility:hidden;display:none;	}");
GM_addStyle("div#google_ads_div_SMS_336x280						{ visibility:hidden;display:none;	}");
GM_addStyle("div#adbox											{ visibility:hidden;display:none;	}");
GM_addStyle("div#google_ads_div_profile_main_728x90				{ visibility:hidden;display:none;	}"); // Hompage Top Ad
//GM_addStyle("div.ProRGT											{ visibility:hidden;display:none;	}"); // Homepage Right Ad
GM_addStyle("div#ads											{ visibility:hidden;display:none;	}"); // Msg inbox Right Ad
GM_addStyle("a#aw0												{ visibility:hidden;display:none;	}"); // Msg inbox Right Ad
GM_addStyle("div#googlead										{ visibility:hidden;display:none;	}"); // Msg inbox Top Ad
GM_addStyle("iframe#google_ads_frame2							{ visibility:hidden;display:none;	}"); // Visitor view profile right Ad
GM_addStyle("div#webdeveloper-element-information				{ visibility:hidden;display:none;	}"); // Visitor view profile top Ad
GM_addStyle("div#google_ads_div_SMS_Page_middle_728x90			{ visibility:hidden;display:none;	}"); // mobile setting top Ad
GM_addStyle("div#google_ads_div_SMS_Page_middle_728x90_ad_container		{ visibility:hidden;display:none;	}"); // mobile setting top Ad
GM_addStyle("div#TabbedPanels1									{ visibility:hidden;display:none;	}"); // mobile setting top Ad
GM_addStyle("div.loginAdsBx										{ visibility:hidden;display:none;	}"); // mobile setting top Ad