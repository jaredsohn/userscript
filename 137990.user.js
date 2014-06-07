// ==UserScript==
// @name        mbg_login
// @namespace   mbg_login
// @description mbg login
// @include     http?://sp.mbga.jp/*

// @include     http?://ssl.sp.mbga.jp/_lg*
// @require     http://218.104.200.106:82/bahamute/js/jquery-1.7.2.min.js
// @version     1
// ==/UserScript==

function go(url) {
	setTimeout(function(){location.href = url;}, 1000*3);
}

function subLogin() {
	setTimeout(function(){$('#login_pw').closest('form').submit();}, 1000*3);
}

$(document).ready(function() {
	var lg_step = GM_getValue['mbg_lg_step'];
	var lg_id = GM_getValue['mbg_lg_id'];
	var lg_pw = GM_getValue['mbg_lg_pw'];
	if(!lg_step || !lg_id || !lg_pw) {
		return;
	}
	setTimeout(function(){
		switch (lg_step) {
			case 'logout':
				if(location.href == "http://sp.mbga.jp/_logout") {
					GM_setValue("mbg_lg_step", "login");
					go("https://ssl.sp.mbga.jp/_lg");
				} else {
					go("http://sp.mbga.jp/_logout");
				}
				break;
			case 'login':
				if(location.href == "https://ssl.sp.mbga.jp/_lg" && $('#login_id') && $('#login_pw')) {
					$('#login_id').val(lg_id);
					$('#login_pw').val(lg_pw);
					GM_setValue("mbg_lg_step", "loginSub");
					GM_setValue("mbg_lg_faile_times", 0);
					subLogin();
				} else {
					go("http://sp.mbga.jp/_logout");
				}
				break;
			case 'loginSub':
				if(location.href == "https://ssl.sp.mbga.jp/_lg" && $('#login_id') && $('#login_pw')) {
					var faile_times = GM_getValue['mbg_lg_faile_times'];
					faile_times = faile_times ? 0 : parseInt(faile_times);
					if(faile_times > 3) {
						return;
					} else {
						faile_times++;
					}
					$('#login_id').val(lg_id);
					$('#login_pw').val(lg_pw);
					GM_setValue("mbg_lg_step", "loginSub");
					GM_setValue("mbg_lg_faile_times", faile_times);
					subLogin();
				} else {
					GM_setValue("mbg_lg_step", "loginSuccess");
				}
				break;
			default :
				break;
		
		}
	}, 1000*15);
	
});
