// ==UserScript==
// @name           MC Forum Improvements
// @namespace      BloodyRain2k
// @include        http://www.minecraftforum.net/topic/*
// @include        http://www.minecraftforum.net/index.php?*
// ==/UserScript==

// thanks to broquaint, Ventero and intgr for helping me to get most of this working.
// also thanks to Cadde for giving me the idea for the postlink fix.

// since the forum is unable to handle too many blocked users I have to completely stop using it's list and resort to a builtin one

var sec_hash = ""; var session = ""; var mem_id = "";

/*
//if (document != null ? (document.head != null ? document.head.innerHTML != null : false) : false){
try {
	sec_hash	= document.head.innerHTML.match(/ipb.vars\['secure_hash'\]\s+=\s+'([0-9a-fA-F]+)'/)[1];
	session		= document.head.innerHTML.match(/ipb.vars\['session_id'\]\s+=\s+'([0-9a-fA-F]+)'/)[1];
	mem_id		= document.head.innerHTML.match(/ipb.vars\['member_id'\]\s+=\s+parseInt\(\s+(\d+)/)[1];
} catch (ex) { }
//}
*/

//var usercprx	= /<strong><a href="(?:https?:\/\/)?www.minecraftforum.net\/user\/(\d+)-/g;
//var userrx		= /(?:https?:\/\/)?www.minecraftforum.net\/user\/(\d+)-/g;
var userrx		= /\/user\/(\d+)-/g;
var users;

function SaveUsers(){GM_setValue('blocked', uneval(users.replace(/ +/g," ")));}
function LoadUsers(){users = eval(GM_getValue('blocked', null)); if (users == null) { users = ""; }}
function SyncUsers(){
	GM_xmlhttpRequest({
		method: 'GET',
		url: "http://www.minecraftforum.net/index.php?app=core&module=usercp&tab=members&area=ignoredusers",
		headers: {
			'User-Agent': 'Mozilla/5.0 (Windows NT 5.1; rv:5.0) Gecko/20100101 Firefox/5.0',
			'Referer': 'http://www.minecraftforum.net/index.php?app=core&module=usercp&tab=members&area=ignoredusers',
			'DNT': '1',
			'Cookie': 'style_cookie=printonly; mcf_anonlogin=-1; mcf_member_id=' + mem_id + '; mcf_session_id=' + session,
			'Content-Type' : 'application/x-www-form-urlencoded'
		},
		onload: function(data) {
			var body = data.responseText;
			var tmp = " ";
			var tmpusers = body.match(usercprx);
			for (var u in tmpusers){
				tmpusers[u].match(usercprx);
				var tmpu = RegExp.$1;
				if (tmpu != null){
					tmp += new Array(tmpu) + " ";
				}
			}
			users = tmp.replace(/ +/g," ");
			SaveUsers();
		},
		onerror: function(data) {
			GM_log("error while syncing userblocklist, retrying");
			SyncUsers();
		}
	});
}


//if (window.location.href.indexOf("index\.php\?app=core&module=usercp&tab=members&area=ignoredusers") > -1){SyncUsers(); return;}


LoadUsers();

function Block(name,id){
	var msg = "Block " + name + "?";
	if(name == "BloodyRain2k"){msg = "Are you sure you want to be ungrateful and block the author of this script?";} // more of a fun thing due to boredom
	if(confirm(msg)){
		if (users.indexOf(" " + id + " ") == -1){
			users += " " + id + " ";
			SaveUsers();
			RemoveBlocked();
		}
		/*GM_xmlhttpRequest({
			method: 'POST',
			url: "http://www.minecraftforum.net/index.php?app=core&module=usercp&tab=members&area=ignoredusers",
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 5.1; rv:5.0) Gecko/20100101 Firefox/5.0',
				'Referer': 'http://www.minecraftforum.net/index.php?app=core&module=usercp&tab=members&area=ignoredusers',
				'DNT': '1',
				'Cookie': 'style_cookie=printonly; mcf_anonlogin=-1; mcf_member_id=' + mem_id + '; mcf_session_id=' + session,
				'Content-Type' : 'application/x-www-form-urlencoded'
			},
			data: "do=save&secure_hash=" + sec_hash + "&newbox_1=" + escape(name) + "&ignore_messages=0&ignore_topics=1&submit=Save%20Changes",
			onload: function(data) {SyncUsers();},
			onerror: function(data) {
				GM_log("error while submitting user blocking, retrying");
				Block(name);
			}
		});*/
	}
}

function RemoveBlocked(){
	if (users != null && window.location.href.indexOf("&showblocked") == -1){
		var posts = document.body.getElementsByTagName("div");
		
		for (var p in posts){
			var e = posts[p];
			if (e != null) if (e.className != null)	if (e.className.indexOf("post_block") > -1){ // I hate these checks but they are needed
				var span = e.getElementsByTagName("span");
				if (span != null){
					span = span[1];
					if (span != null){
						var u = span.innerHTML.match(userrx);
						if (RegExp.$1 != null){
							if (users.indexOf(" " + RegExp.$1 + " ") > -1){
								e.innerHTML = "";
								//e.setAttribute("style","visibility:collapse;");
								GM_log("blocking post " + e.id);
							}
						}
					}
				}
			}
		}
	}
}

function ClickListener(name,id){return function(){Block(name,id);}}



var searchlinkrx = /index\.php\?showtopic=\d+&view=findpost&p=(\d+)/;
var postlinkrx	 = /\/topic\/[\w\d-_]+\/page__view__findpost__p__(\d+)/;
var postlinkrep	 = "/index.php?app=forums&module=forums&section=findpost&pid=$1";

var links = document.body.getElementsByTagName("a");

for(var l in links){
	var e = links[l];
	if(typeof(e.href) != "undefined"){
		e.href = e.href.replace(postlinkrx, postlinkrep).replace(searchlinkrx, postlinkrep);
	}
}

var posters = document.body.getElementsByTagName("span");

for(var p = 0; p < posters.length; p++){
	var e = posters[p];
	if(e.className == "author vcard"){
		var ea = e.getElementsByTagName("a");
		var u = ea[0].innerHTML;
		var i = ea[0].href.match(userrx);
		i = (RegExp.$1 != null ? RegExp.$1 : "");
		var x = document.createElement('a');
		e.innerHTML += " ";
		e.appendChild(x);
		x.setAttribute("style","color:#ee0000;");
		x.innerHTML = "X";
		x.addEventListener("click",ClickListener(u,i),false);
	}
}

RemoveBlocked();

var imgs = document.body.getElementsByTagName("img");

for(var i in imgs){
	var e = imgs[i];
	if(e.alt == "Posted Image"){
		e.setAttribute("style","max-width:90%;");
	}
}