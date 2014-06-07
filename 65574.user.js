// ==UserScript==
// @name           draugiem.lv ads remover
// @namespace      google.com
// @author         ixi
// @version        4.0 Beta
// @description    Removes ads in draugiem.lv
// @include        http://www.draugiem.lv/*
// @include        http://www.draugiem.lv/gallery/*
// @include        http://www.draugiem.lv/hot/*
// @include        http://www.draugiem.lv/rssnews/*
// @include        http://www.draugiem.lv/forum/*
// @include        http://www.draugiem.lv/travel/*
// @include        http://www.draugiem.lv/groups/*
// @include        http://www.draugiem.lv/events/*
// @include        http://www.draugiem.lv/sms/*
// @include        http://www.draugiem.lv/blogs/*
// @include        http://www.draugiem.lv/music/*
// @include        http://www.draugiem.lv/games/*
// @include        http://www.draugiem.lv/horoscopes/*
// @include        http://www.draugiem.lv/zip/*
// @include        http://www.draugiem.lv/brain/*
// @include        http://www.draugiem.lv/visitors/*
// @include        http://www.draugiem.lv/friends/*
// @include        http://www.draugiem.lv/rgifts/*
// @include        http://www.draugiem.lv/rate/*
// @include        http://www.draugiem.lv/messages/*
// ==/UserScript==

function AR_MakeOwnDiv() {
	if(!document.getElementById("ads_remover")) {
		var Footer = document.getElementById("footer");
		var NewDiv = document.createElement("div");
		var NewDivIdName = "ads_remover";
		NewDiv.setAttribute("id", NewDivIdName);
		Footer.appendChild(NewDiv);
	}
}

function AR_WriteFunctions() {
	if(!document.getElementById("ads_remover")) {
		AR_MakeOwnDiv();
	} else {
		var Parent = document.getElementById("ads_remover");
		var NewDiv = document.createElement("div");
		var NewDivIdName = "ads_remover_functions";
		var NewDivContent = "<script type='text/javascript'>\n" +
		
		"function AR_SetCookie(name, value) {\n" +
		"	document.cookie = name + '=' + escape(value);\n" +
		"}\n\n" +
		
		"function AR_GetCookie(name) {\n" +
		"	if (document.cookie.length > 0) {\n" +
		"		var c_start = document.cookie.indexOf(name + '=');\n" +
		"		if (c_start != -1) {\n" +
		"			c_start = c_start + name.length + 1;\n" +
		"			c_end = document.cookie.indexOf(';', c_start);\n" +
		"			if (c_end == -1) {\n" +
		"				c_end = document.cookie.length;\n" +
		"			}\n" +
		"			return unescape(document.cookie.substring(c_start, c_end));\n" +
		"		}\n" +
		"	}\n" +
		"	return '';\n" +
		"}\n\n" +
		
		"function AR_DelCookie(name) {\n" +
		"	document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT' + '; path=/';\n" +
		"}\n\n" +
		
		"function AR_CheckOption(option) {\n" +
		"	CValue = AR_GetCookie(option);\n" +
		"	if (CValue != null && CValue != '') {\n" +
		"		return CValue;\n" +
		"	} else {\n" +
		"		return 'default';\n" +
		"	}\n" +
		"}\n\n" +
		
		"function AR_ChangeOption(option) {\n" +
		"	CurrValue = AR_CheckOption(option);\n" +
		"	if (CurrValue == 'True') {\n" +
		"		AR_DelCookie(option);\n" +
		"		AR_SetCookie(option, 'False');\n" +
		"		//alert('nomainiiju uz False');\n" +
		"	} else {\n" +
		"		AR_DelCookie(option);\n" +
		"		AR_SetCookie(option, 'True');\n" +
		"		//alert('nomainiiju uz True');\n" +
		"	}\n" +
		"}\n" +
		
		"</script>";
		NewDiv.setAttribute("id", NewDivIdName);
		NewDiv.innerHTML = NewDivContent;
		Parent.appendChild(NewDiv);
	}
}

function AR_SetCookie2(name, value) {
	document.cookie = name + '=' + escape(value);
}

function AR_GetCookie2(name) {
	if (document.cookie.length > 0) {
		var c_start = document.cookie.indexOf(name + '=');
		if (c_start != -1) { 
			c_start = c_start + name.length + 1;
			var c_end = document.cookie.indexOf(';', c_start);
			if (c_end == -1) {
				c_end = document.cookie.length;
			}
			return unescape(document.cookie.substring(c_start, c_end));
		} 
	}
	return '';
}

function AR_DelCookie2(name) {
	document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT' + '; path=/';
} 

function AR_CheckOption2(option) {
	var CValue = AR_GetCookie2(option);
	if (CValue != null && CValue != '') {
		return CValue;
	} else {
		return 'default';
	}
}

function AR_SetDefaults() {
	if (AR_CheckOption2("ar_clear_on") == 'default') {
		AR_SetCookie2("ar_clear_on", "True");
	}
	if (AR_CheckOption2("ar_news_off") == 'default') {
		AR_SetCookie2("ar_news_off", "False");
	}
	if (AR_CheckOption2("ar_actual_off") == 'default') {
		AR_SetCookie2("ar_actual_off", "True");
	}
	if (AR_CheckOption2("ar_recommend_off") == 'default') {
		AR_SetCookie2("ar_recommend_off", "True");
	}
	if (AR_CheckOption2("ar_music_off") == 'default') {
		AR_SetCookie2("ar_music_off", "True");
	}
	if (AR_CheckOption2("ar_friends_off") == 'default') {
		AR_SetCookie2("ar_friends_off", "False");
	}
	if (AR_CheckOption2("ar_r_adv_off") == 'default') {
		AR_SetCookie2("ar_r_adv_off", "True");
	}
	if (AR_CheckOption2("ar_ask_off") == 'default') {
		AR_SetCookie2("ar_ask_off", "True");
	}
	if (AR_CheckOption2("ar_events_off") == 'default') {
		AR_SetCookie2("ar_events_off", "False");
	}
	if (AR_CheckOption2("ar_links_off") == 'default') {
		AR_SetCookie2("ar_links_off", "True");
	}
	if (AR_CheckOption2("ar_ads_off") == 'default') {
		AR_SetCookie2("ar_ads_off", "True");
	}
	//...
}

function AR_MakeMenu() {
	if(!document.getElementById("ads_remover")) {
		AR_MakeOwnDiv();
	} else {
		var Parent = document.getElementById("ads_remover");
		var NewDiv = document.createElement("div");
		var NewDivIdName = "ads_remover_menu";
		var NewDivContent = "<b>draugiem.lv ads remover (by ixi):</b> ";
		if (AR_CheckOption2("ar_clear_on") == "True") {
			NewDivContent = NewDivContent + "Clear ON <input id=\"ar_clear_on\" type=\"checkbox\" onClick=\"AR_ChangeOption('ar_clear_on')\" checked=\"True\" /> | ";
		} else {
			NewDivContent = NewDivContent + "Clear ON <input id=\"ar_clear_on\" type=\"checkbox\" onClick=\"AR_ChangeOption('ar_clear_on')\" /> | ";
		}
		if (AR_CheckOption2("ar_news_off") == "True") {
			NewDivContent = NewDivContent + "News <input id=\"ar_news_off\" type=\"checkbox\" onClick=\"AR_ChangeOption('ar_news_off')\" checked=\"True\" /> | ";
		} else {
			NewDivContent = NewDivContent + "News <input id=\"ar_news_off\" type=\"checkbox\" onClick=\"AR_ChangeOption('ar_news_off')\" /> | ";
		}
		if (AR_CheckOption2("ar_actual_off") == "True") {
			NewDivContent = NewDivContent + "Actual <input id=\"ar_actual_off\" type=\"checkbox\" onClick=\"AR_ChangeOption('ar_actual_off')\" checked=\"True\" /> | ";
		} else {
			NewDivContent = NewDivContent + "Actual <input id=\"ar_actual_off\" type=\"checkbox\" onClick=\"AR_ChangeOption('ar_actual_off')\" /> | ";
		}
		if (AR_CheckOption2("ar_recommend_off") == "True") {
			NewDivContent = NewDivContent + "Recom <input id=\"ar_recommend_off\" type=\"checkbox\" onClick=\"AR_ChangeOption('ar_recommend_off')\" checked=\"True\" /> | ";
		} else {
			NewDivContent = NewDivContent + "Recom <input id=\"ar_recommend_off\" type=\"checkbox\" onClick=\"AR_ChangeOption('ar_recommend_off')\" /> | ";
		}
		if (AR_CheckOption2("ar_music_off") == "True") {
			NewDivContent = NewDivContent + "Music <input id=\"ar_music_off\" type=\"checkbox\" onClick=\"AR_ChangeOption('ar_music_off')\" checked=\"True\" /> | ";
		} else {
			NewDivContent = NewDivContent + "Music <input id=\"ar_music_off\" type=\"checkbox\" onClick=\"AR_ChangeOption('ar_music_off')\" /> | ";
		}
		if (AR_CheckOption2("ar_friends_off") == "True") {
			NewDivContent = NewDivContent + "Friends <input id=\"ar_friends_off\" type=\"checkbox\" onClick=\"AR_ChangeOption('ar_friends_off')\" checked=\"True\" /> | ";
		} else {
			NewDivContent = NewDivContent + "Friends <input id=\"ar_friends_off\" type=\"checkbox\" onClick=\"AR_ChangeOption('ar_friends_off')\" /> | ";
		}
		if (AR_CheckOption2("ar_r_adv_off") == "True") {
			NewDivContent = NewDivContent + "R adv <input id=\"ar_r_adv_off\" type=\"checkbox\" onClick=\"AR_ChangeOption('ar_r_adv_off')\" checked=\"True\" /> | ";
		} else {
			NewDivContent = NewDivContent + "R adv <input id=\"ar_r_adv_off\" type=\"checkbox\" onClick=\"AR_ChangeOption('ar_r_adv_off')\" /> | ";
		}
		if (AR_CheckOption2("ar_ask_off") == "True") {
			NewDivContent = NewDivContent + "Ask <input id=\"ar_ask_off\" type=\"checkbox\" onClick=\"AR_ChangeOption('ar_ask_off')\" checked=\"True\" /> | ";
		} else {
			NewDivContent = NewDivContent + "Ask <input id=\"ar_ask_off\" type=\"checkbox\" onClick=\"AR_ChangeOption('ar_ask_off')\" /> | ";
		}
		if (AR_CheckOption2("ar_events_off") == "True") {
			NewDivContent = NewDivContent + "Events <input id=\"ar_events_off\" type=\"checkbox\" onClick=\"AR_ChangeOption('ar_events_off')\" checked=\"True\" /> | ";
		} else {
			NewDivContent = NewDivContent + "Events <input id=\"ar_events_off\" type=\"checkbox\" onClick=\"AR_ChangeOption('ar_events_off')\" /> | ";
		}
		if (AR_CheckOption2("ar_links_off") == "True") {
			NewDivContent = NewDivContent + "Links <input id=\"ar_links_off\" type=\"checkbox\" onClick=\"AR_ChangeOption('ar_links_off')\" checked=\"True\" /> | ";
		} else {
			NewDivContent = NewDivContent + "Links <input id=\"ar_links_off\" type=\"checkbox\" onClick=\"AR_ChangeOption('ar_links_off')\" /> | ";
		}
		if (AR_CheckOption2("ar_ads_off") == "True") {
			NewDivContent = NewDivContent + "Ads <input id=\"ar_ads_off\" type=\"checkbox\" onClick=\"AR_ChangeOption('ar_ads_off')\" checked=\"True\" />";
		} else {
			NewDivContent = NewDivContent + "Ads <input id=\"ar_ads_off\" type=\"checkbox\" onClick=\"AR_ChangeOption('ar_ads_off')\" />";
		}
		//...
		NewDiv.setAttribute("id", NewDivIdName);
		NewDiv.innerHTML = NewDivContent;
		Parent.appendChild(NewDiv);
	}
}

function AR_Remove() {
	if (AR_CheckOption2("ar_clear_on") == "True") {
		if (AR_CheckOption2("ar_actual_off") == "True" || AR_CheckOption2("ar_recommend_off") == "True") {
			if(document.getElementById("prof_box")){
				var elLeft = document.getElementById("prof_box");
				var chLeft = elLeft.childNodes;
				for(var i=0; i < chLeft.length; i++) {
					if(chLeft[i].className == "box defaultBg white" && AR_CheckOption2("ar_actual_off") == "True") {
						chLeft[i].style.display = "none";
					}
					if(chLeft[i].className == "box defaultBg white advert_links" && AR_CheckOption2("ar_recommend_off") == "True") {
						chLeft[i].style.display = "none";
					}
				}
			}
		}
		//Removes News
		if (AR_CheckOption2("ar_news_off") == "True") { 
			if(document.getElementById("profileNewsBox")){
				document.getElementById("profileNewsBox").style.display = "none";
			}
		}
		//Put back News
		if (AR_CheckOption2("ar_news_off") == "False") { 
			if(document.getElementById("profileNewsBox")){
				document.getElementById("profileNewsBox").style.display = "block";
			}
		}
		//Removes music ads
		if (AR_CheckOption2("ar_music_off") == "True") {
			if(document.getElementById("firstpage_musicbox")){
				document.getElementById("firstpage_musicbox").style.display = "none";
			}
		}
		//Removes friends in middle
		if (AR_CheckOption2("ar_friends_off") == "True") {
			if(document.getElementById("fp_fr_box")){
				document.getElementById("fp_fr_box").style.display = "none";
			}
		}
		if (AR_CheckOption2("ar_r_adv_off") == "True" || AR_CheckOption2("ar_ask_off") == "True" || AR_CheckOption2("ar_links_off") == "True") {
			if(document.getElementById("firstpage_sidebar")){
				var elRight = document.getElementById("firstpage_sidebar");
				var chRight = elRight.childNodes;
				for(var j=0; j < chRight.length; j++) {
					if(chRight[j].className == "adv " && AR_CheckOption2("ar_r_adv_off") == "True") {
						chRight[j].style.display = "none";
					}
					if(chRight[j].className == "box defaultBg info" && AR_CheckOption2("ar_ask_off") == "True") {
						chRight[j].style.display = "none";
						if(document.getElementById("DailyPoll")) {
							document.getElementById("DailyPoll").style.display = "none";
						}
					}
					if(chRight[j].className == "say" && AR_CheckOption2("ar_links_off") == "True") {
						chRight[j].style.display = "none";
					}
				}
			}
		}
		//Removes events
		if (AR_CheckOption2("ar_events_off") == "True") {
			if(document.getElementById("eventserverList")){
				document.getElementById("eventserverList").style.display = "none";
			}
		}
		if (AR_CheckOption2("ar_ads_off") == "True") {
			//Removes ads 0-200
			for (var f = 0; f < 200; f++) {
				if(document.getElementById("adv"+f)){
					document.getElementById("adv"+f).className = "";
					document.getElementById("adv"+f).style.display = "none";
				}
			}
			//Removes ads in middle
			for (var g = 0; g < 10; g++) {
				if(document.getElementById("MiniAdsContainer"+g)){
					document.getElementById("MiniAdsContainer"+g).className = "";
					document.getElementById("MiniAdsContainer"+g).style.display = "none";
				}
			}
			//Removes google ads
			if(document.getElementById("google_ads")){
				document.getElementById("google_ads").style.display = "none";
			}
			//Removes bottom slide ads
			if(document.getElementById("m_content")){
				document.getElementById("m_content").style.display = "none";
			}
		}
		//...
	}
}

AR_MakeOwnDiv();
AR_WriteFunctions();
AR_SetDefaults();
AR_MakeMenu();
AR_Remove();