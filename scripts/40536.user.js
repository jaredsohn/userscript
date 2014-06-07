// ==UserScript==
// @name           HWM_Tab_Renamer_Auction
// @namespace      http://www.amse.ru/
// @include        http://www.heroeswm.ru/auction.php*
// ==/UserScript==

var url_cur = location.href;

renameTab();

function renameTab() {
	if (url_cur.indexOf("?") == -1) {
		url_cur += "?cat=res&sort=0";
	}
    if (url_cur.indexOf("&type=0") != -1) {
        url_cur = url_cur.split("&type=0")[0] + url_cur.split("&type=0")[1];
    }
    if (url_cur.indexOf("type=0&") != -1) {
        url_cur = url_cur.split("type=0&")[0] + url_cur.split("type=0&")[1];
    }	
	if (url_cur.indexOf("&art_type=") != -1 && url_cur.split("&art_type=")[1] == "") {
        url_cur = url_cur.substring(0, url_cur.indexOf("&art_type="));
    }
	var indexOf = url_cur.indexOf("?"); 
	var params_str = url_cur.substring(indexOf + 1);
	var params_arr = params_str.split("&");
	
	if (params_arr.length <= 2) {
		advancedRenameTab();
		return;
	}
	
    
    if (params_arr[2].split("=")[0] == "art_type") {
		advancedRenameTab();
		return;
    }
	
	if (params_arr[0].split("=")[0] == "cat" && params_arr[0].split("=")[1] == "res") {
		if (params_arr[2].split("=")[0] == "type") {
			var res_type = params_arr[2].split("=")[1];
			var title_add = ". ";
			if (res_type == "1") {
				title_add += "\u0414\u0440\u0435\u0432\u0435\u0441\u0438\u043d\u0430";
			} else if (res_type == "2") {
				title_add += "\u0420\u0443\u0434\u0430";
			} else if (res_type == "3") {
				title_add += "\u0420\u0442\u0443\u0442\u044c";
			} else if (res_type == "4") {
				title_add += "\u0421\u0435\u0440\u0430";
			} else if (res_type == "5") {
				title_add += "\u041a\u0440\u0438\u0441\u0442\u0430\u043b\u043b\u044b";
			} else if (res_type == "6") {
				title_add += "\u0421\u0430\u043c\u043e\u0446\u0432\u0435\u0442\u044b";
			} else {
				return;
			}
			title_add +=".";
			document.title += title_add;
			return;
		}
	}	
}

function advancedRenameTab(){
    var a_arr = document.getElementsByTagName('a');
    for (var i = 0; i < a_arr.length; i++) {
        if (a_arr[i].href == (url_cur)) {
            var title = a_arr[i].innerHTML;
            title = title.substring(0, title.indexOf("(") - 1);
            while (title[0] == '<') {
                title = title.substring(title.indexOf(">") + 1);
            }
            document.title += ". " + title + ".";
            return;
        }
    }
}