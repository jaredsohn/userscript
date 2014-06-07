// ==UserScript==
// @name js4gzhu
// @description javascripts for bbs.gzhu.edu.cn
// @grant       none
// @match			http://bbs.gzhu.edu.cn/*
// @match			http://202.192.18.4/*
// @include			http://bbs.gzhu.edu.cn/*
// @include			http://202.192.18.4/*
// @updateURL		https://userscripts.org/scripts/source/153820.meta.js
// @downloadURL		https://userscripts.org/scripts/source/153820.user.js
// ==/UserScript==

var g_usergroup = new Object();
g_usergroup["基友"] = "snake;三变;吖Man-C;Lucky";
g_usergroup["版主"] = "BabyMoney001;Luyikais";
g_usergroup["高层"] = "vegXeta;脑功囝;YOYO..";
g_usergroup["九头蛇"] = "snake";
g_usergroup["大神"] = "原原;蜡笔小新;淮扬小子;萧十二郎;jim;Snake;無名;Lucky";
g_usergroup["同僚"] = "嚣嚣;thrall;轻霜抹玉栏;BabyMoney001;小清新新free";
g_usergroup["技术组"] = "四夜郎;飞翔de星光;steven_love;xxz0315";

var g_backlist = "snake";

window.$=function (id){
	if(!id) return null;
	if(id[0] == '#') return document.getElementsByClassName(id.substr(1));
	if(id[0] == '.') return document.getElementsByTagName(id.substr(1));
	else return document.getElementById(id);
}


function __getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=") 
			if (c_start != -1) {
			  c_start = c_start + c_name.length + 1;
			  c_end = document.cookie.indexOf(";", c_start);
			  if (c_end == -1) c_end = document.cookie.length;
			  return unescape(document.cookie.substring(c_start, c_end));
			}
    }
    return "";
}

window.getCookie = window.getCookie || __getCookie;

function __setCookie(c_name, value, expiredays) {
    var exdate = new Date();
	exdate.setTime(exdate.getTime() + expiredays * 1000 * 60 * 60);
	document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "": ";expires=" + exdate.toGMTString());
}

window.setCookie = window.setCookie || __setCookie;

function ObjectFromCookie(name) {
	var obj = new Object();
	var str = getCookie(name);
	if(str) {
		var arr = str.split(";");
		for(s in arr) {
			var nv = arr[s].split("=");
			if(nv.length == 2) {
				obj[nv[0]] = parseFloat(nv[1]);
			}
		}
	}
	return obj;
}

function ObjectToCookie(name, obj) {
	var str = "";
	var attr;
	for(attr in obj) {
		if(obj[attr] > 0) {
			str = str + attr + "=" + obj[attr] + ";";
		}
	}
	setCookie(name, str, 87600);//10年
}

function hide_logo(flag) {
	var style=flag?"none":"";
	var obj = $("header");
	if(obj && obj.children[0] && obj.children[0].children[0]) {
		obj = obj.children[0].children[0];
		obj.style.display = style;
	}
}

function hide_mod(flag) {
	var modlist = "ad_text;modarea;forumheader;menu;dps_bar;ad_footerbanner1;ad_footerbanner2;ad_footerbanner3;ad_headerbanner;focus";
	var style=flag?"none":"";
	var i;
	var obj;
	var arr = modlist.split(";");
	for(i = 0; i < arr.length; i++) {
		obj = $(arr[i]);
		if(obj) obj.style.display = style;
	}
	hide_logo(flag);
}

hide_mod(true);

function check_msg() {
	var count = 0;
	var names = "prompt_pm;prompt_announcepm;prompt_task;prompt_systempm;prompt_friend;prompt_threads;prompt_mynotice;prompt_myinvite";
	var arr = names.split(";");
	var i;
	var re = /\((\d)\)/i; 
	var obj;
	for(i = 0; i < arr.length; i++) {
		obj = $(arr[i]); 
		if(obj && re.test(obj.text)) {
			count += parseInt(RegExp.$1);
		}
	}
	if(count > 0) {
		if(!document.old_title) document.old_title = document.title;
		document.title = "【" + count + "条新消息】 " + document.old_title;
	}
}
//setInterval(check_msg, 10000);

function check_pm(){
//	window.pmchecknew && window.pmchecknew();
//	var url = "viewthread.php?tid=1" + Math.floor(Math.random()*100000) ;
//	window.old_hLR_oldtopics = window.getCookie("hLR_oldtopics");	
	var url = "ajax.php?action=updatesecqaa&inajax=1";
	var x = new Ajax(); 
	if(x) {
		x.get(url, 
			function() {
				//window.setCookie("hLR_oldtopics", window.old_hLR_oldtopics);
			}
		);
	}
}
//setInterval(check_pm, 500);

var g_userlist = ObjectFromCookie("userlist");

function hook_parseurl() {
	if(!window.old_parseurl) {
		window.old_parseurl = window.parseurl;
		window.parseurl = function(str, mode, parsecode) {
			if (parsecode) str = str.replace(/\s*\[code\]([\s\S]+?)\[\/code\]\s*/ig,	function($1, $2) {
				return codetag($2);
			});	
			var sstr = str;
			sstr = sstr.replace(/\[code\]([\s\S]+?)\[\/code\]/ig, "");
			sstr = sstr.replace(/\[quote\]([\s\S]+?)\[\/quote\]/ig,	"");
			var reg = /@([^\s>"%&*,@.]+?)\x20/ig;	
			var list = sstr.match(reg);
			if(!list)  return window.old_parseurl(str, mode, parsecode);

			var table = new Object();
			for(i in list) {
				var id=list[i].substr(1,list[i].length-2);
				table[id] = 1;
				if(!g_userlist[id]) g_userlist[id] = 1;
				else g_userlist[id] = g_userlist[id] + (g_userlist[id]/5)/list.length;
			}
			for(i in g_userlist) {
				if(!table[i]) g_userlist[i] = g_userlist[i] - 1/(list.length+5);
				if(g_userlist[i] <= 0) g_userlist[i] = undefined;
			}
			delete table;

			ObjectToCookie("userlist", g_userlist);

			var users;
			var offset;
			for(attr in g_usergroup) {
				var pattern = "@"+attr + "\x20";
				offset = str.indexOf(pattern);
				if(offset == 0 || (offset > 0 && str[offset-1] != '@')) {
					users = "@"+attr + "\x20【@" + g_usergroup[attr] + "\x20】";
					users = users.replace(/;/ig, "\x20;@");
					str = str.replace(pattern, users);
				}
			}
			return window.old_parseurl(str, mode, parsecode);
		}
	}
}

hook_parseurl();

function hook_getCookie() {
	if(!window.old_getCookie) {
		window.old_getCookie = window.getCookie;
		window.getCookie = function (c_name) {
			if(c_name == 'bbs_gzhu_edu_cn') return '8hours';
			else return window.old_getCookie(c_name);
		};
	}
}

//hook_getCookie();

function sort_user(obj) {
	var users = [];
	if(!obj) return users;
	var p = 0;
	var i;
	for(i in obj) {
		users[p] = {s:i, r:obj[i]};
		p = p + 1;
	}
	users.sort(function(m,n){
		if(typeof m === "object" && typeof n === "object" && m && n) {
			return n.r - m.r;
		}else return 0;
	});
	return users;
}

function fill_userlist() {
	var list;
	var i;
	if(!g_userlist) return;
	users = sort_user(g_userlist);
	var f = document.createElement("div"); 

	var html = "";
	list = $("#editor_tb");
	if(list) {
		for(i in users) {
			html = html + "<a title=\""+ users[i].s +"\" style=\"background: none;width:auto;text-indent:0;\" href=\"javascript:;\" onclick=\"seditor_insertunit('$editor_id$', '@" + users[i].s + "\x20', '')\">";
			html = html + users[i].s + "</a>";
		}

		for(i = 0; i < list.length; i++) {
			if(list.item(i)["added"] != 1) {
//				var editor = list.item(i).parentNode;
				var editor = list.item(i).parentNode.getElementsByTagName("textarea").item(0);
				f.innerHTML = html.replace(/\$editor_id\$/ig, editor.id.split("message")[0]);
				list.item(i).appendChild(f);
				list.item(i)["added"] = 1;
			}
		}
	}

	f = document.createElement("div"); 
	html = "";
	list = $("#editorbtn");
	if(list) {
		for(i in users) {
			html = html + "<a title=\""+ users[i].s +"\" style=\"background: none;width:auto;text-indent:0;\" href=\"javascript:;\" onclick=\"insertText('@" + users[i].s + "\x20')\">";
			html = html + users[i].s + "</a>";
		}		
		for(i = 0; i < list.length; i++) {
			if(list.item(i)["added"] != 1) {
				f.className = "minibtn";
				f.innerHTML = html;
				list.item(i).appendChild(f);
				list.item(i)["added"] = 1;
			}
		}
	}
}

fill_userlist();

function hook_showWindow() {
	if(!window.old_showWindow) {
		window.old_showWindow = window.showWindow;
		window.showWindow = function (k, url, mode, cache) {
			var res = window.old_showWindow(k, url, mode, cache);
			setTimeout(fill_userlist, 500);
			return res;
		};
	}
}

hook_showWindow();

function block_users(list) {

	var page_forum = false;
	var page_thread = false;
	page_forum = (window.location.href.toLowerCase().indexOf("/forumdisplay.php") >= 0);
	page_thread = (window.location.href.toLowerCase().indexOf("/viewthread.php") >= 0);

	var list = list.split(";");
	if(!list || list.length <= 0) return;
	var i, j, c, t, p, pp;
	var backlist = ";" + g_backlist + ";";
	backlist = backlist.toLowerCase();

	if(page_thread) {
		var posts = $("#defaultpost");
		for(i = 0; i < posts.length; i++) {
			t = posts.item(i).parentNode.parentNode;
			if(t && t.children[0]) {
				c = t.children[0];	t = posts.item(i);
				if(backlist.indexOf(c.textContent.replace(/[\s\n]+/ig,"\n").split("\n")[1].toLowerCase()) >= 0) {
					t.innerHTML = "<center style=\"cursor:hand;font-size:32px;\" onclick=\"this.parentNode.innerHTML = unescape('"+escape(t.innerHTML)+"');\">帖子被屏蔽! 点击恢复查看！</center>";
				}
			}
		}
	}

	if(page_forum) {
		var tables = $("#datatable");
		for(i = 0; i < tables.length; i++) {
			t= tables.item(i);
			for(j = 0; j < t.children.length; j++) {
				p = t.children[j];
				if(p.id.match(/thread\_\d+/ig)) {
					if(p.children[0] && p.children[0].children[3] && p.children[0].children[3].children[0]) {
						c = p.children[0].children[3].children[0]; 
						pp = -1;		p = p.children[0].children[2]; 

						if(p.children[1] && p.children[1].tagName.toLowerCase() == "span") pp = 1;
						else if(p.children[2]&& p.children[2].tagName.toLowerCase() == "span") pp = 2;

						if(pp >=0 && p.children[pp]) {
							p = p.children[pp];
							if(backlist.indexOf(c.textContent.replace(/\n/ig,";").toLowerCase()) >= 0) {
								p.innerHTML = "<a href='javascript:;' style=\"cursor:hand;\" onclick=\"this.parentNode.innerHTML = unescape('"+escape(p.innerHTML)+"');\">===========帖子被屏蔽! 点击恢复查看！===========</a>";
							}
						}
					}
				}
			}
		}
	}
}

block_users(g_backlist);

