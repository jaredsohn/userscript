// ==UserScript==
// @name           spotlight-sns
// @namespace      wutj.info
// @include        *.renren.com/*
// ==/UserScript==

var colors = ['#C6D9F1', '#FFFFE0', '#DBEEF4', '#DDD9C3', '#DCE6F2', '#E6E0EC', '#F2DCDB', '#E0FFFF'];
var ncolors = colors.length
var ccolor = colors.length;
var entry_list = [];
var entry_all = [];
var spotlight_list = new Object();
var spotlight_temp = {first: "", second: ""};

function process()
{
	var containers;
	flush_entry();
	
	containers = document.evaluate("//dl[@class='replies']", document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for (var i=0; i<containers.snapshotLength; i++) {
		var dl = containers.snapshotItem(i);
		process_fulllist(dl);
	}

	containers = document.evaluate("//div[@class='replies']", document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for (var i=0; i<containers.snapshotLength; i++) {
		var div = containers.snapshotItem(i);
		process_feedlist(div);
	}
	update_color();
}

function process_feedlist(div)
{
	var ts = div.getElementsByClassName("statuscmtitem");
	for (var i=0; i<ts.length; i++) {
		var t = ts[i];
		
		if (t.tagName.toUpperCase() != "DIV") continue;
		var b = t.getElementsByClassName("replybody");
		b = (b.length? b[0] : 0);
		if (!b) continue;
		
		var usera = b.getElementsByClassName("replyername");
		var username = "";
		if (usera.length) {
			username = usera[0].textContent;
		}

		var conts = b.getElementsByClassName("replycontent");
		var cont = ""
		if (conts.length) {
			cont = conts[0].textContent;
		}
		var is_reply = false, reply_name = "";
		if (/^\s*回复([^：]+)(：|:)(.*)$/.test(cont)) {
			is_reply = true;
			reply_name = cont.replace(/^\s*回复([^：]+)(：|:)(.*)$/, "$1");
		}
		
		register_entry({obj: t, pname: username, pid: 0/*not used*/, rname: reply_name});
	}
}

function process_fulllist(dl)
{
	for (var i=0; i<dl.children.length; i++) {
		var dd = dl.children[i];
		
		if (dd.tagName.toUpperCase() != "DD") continue;
		//if (!(/talk\d+/.test(dd.id)) && !(/allCmts_comment_\d+/.test(dd.id))) continue;
		
		var infodiv = dd.getElementsByClassName("info");
		infodiv = (infodiv.length? infodiv[0] : 0);
		var contdiv = dd.getElementsByClassName("reply");
		contdiv = (contdiv.length? contdiv[0] : 0);
		if (!infodiv || !contdiv) continue;

		var usera = infodiv.getElementsByTagName("a");
		var userid = 0, username = "";
		for (var j in usera) {
			var tmp = usera[j];
			if (/^http:\/\/www\.renren\.com\/profile\.do\?id=(\d+)$/i.test(tmp.href)) {
				userid = tmp.href.replace(/^http:\/\/www\.renren\.com\/profile\.do\?id=(\d+)$/i, "$1");
				username = tmp.textContent;
				break;
			}
		}
		
		// lazy way to get content
		var cont = contdiv.textContent;
		var is_reply = false, reply_name = "";
		if (/^\s*回复([^：]+)(：|:)(.*)$/.test(cont)) {
			is_reply = true;
			reply_name = cont.replace(/^\s*回复([^：]+)(：|:)(.*)$/, "$1");
		}
		
		register_entry({obj: dd, pname: username, pid: userid, rname: reply_name});
	}
}

function entry_over(obj)
{
	//alert(obj.getAttribute("post_name"));
	var pname = obj.getAttribute("post_name");
	var rname = obj.getAttribute("reply_name");
	if (!spotlight_list[pname]) spotlight_temp.first = pname;
	if (rname) {
		if (!spotlight_list[rname]) spotlight_temp.second = rname;
	}
	update_color();
}

function entry_out(obj)
{
	//alert(obj.getAttribute("post_name"));
	var pname = obj.getAttribute("post_name");
	var rname = obj.getAttribute("reply_name");
	spotlight_temp.first = "";
	spotlight_temp.second = "";
	update_color();
}

function entry_click(obj)
{
	//alert(obj.getAttribute("post_name"));
	var pname = obj.getAttribute("post_name");
	var rname = obj.getAttribute("reply_name");
	if (spotlight_list[pname]) {
		delete(spotlight_list[pname]);
	} else {
		spotlight_list[pname] = colors[ccolor = (ccolor+1)%ncolors];
		if (rname) {
			if (!spotlight_list[rname])
				spotlight_list[rname] = colors[ccolor = (ccolor+1)%ncolors];
		}
	}
	spotlight_temp.first = "";
	spotlight_temp.second = "";
	update_color();
}

function update_color() 
{
	var tmpc = ccolor;
	for (var i in entry_all) {
		entry_all[i].style.backgroundColor = "";
	}
	if (entry_list[spotlight_temp.first]) {
		tmpc = (tmpc+1)%ncolors;
		for (var i in entry_list[spotlight_temp.first].post) {
			var target = entry_list[spotlight_temp.first].post[i];
			target.style.backgroundColor = colors[tmpc];
		}
	}
	if (entry_list[spotlight_temp.second]) {
		tmpc = (tmpc+1)%ncolors;
		for (var i in entry_list[spotlight_temp.second].post) {
			var target = entry_list[spotlight_temp.second].post[i];
			target.style.backgroundColor = colors[tmpc];
		}
	}
	for (var n in spotlight_list) {
		if (entry_list[n]) {
			for (var i in entry_list[n].post) {
				var target = entry_list[n].post[i];
				target.style.backgroundColor = spotlight_list[n];
			}
		}
	}
}

function flush_entry()
{
	entry_list = [];
	entry_all = [];
}

function register_entry(entry)
{
	if (!entry_list[entry.pname]) {
		entry_list[entry.pname] = {post: [], reply: []};
	}
	entry_list[entry.pname].post.push(entry.obj);
	if (entry.rname) {
		if (!entry_list[entry.rname]) {
			entry_list[entry.rname] = {post: [], reply: []};
		}
		entry_list[entry.rname].reply.push(entry.obj);
	}
	entry_all.push(entry.obj);
	if (!entry.obj.getAttribute("post_name")) {
		entry.obj.setAttribute("post_name", entry.pname);
		entry.obj.setAttribute("reply_name", entry.rname);
		entry.obj.addEventListener("mouseover", function(obj) {
			return function() {
				entry_over(obj);
			}
		}(entry.obj), false);
		entry.obj.addEventListener("mouseout", function(obj) {
			return function() {
				entry_out(obj);
			}
		}(entry.obj), false);
		entry.obj.addEventListener("click", function(obj) {
			return function() {
				entry_click(obj);
			}
		}(entry.obj), false);
	}
}

var delayed_call = function(func, delay) {
	var timer;
	return function() {
		if (timer) window.clearTimeout(timer);
		timer = window.setTimeout(func, delay);
	}
};
document.body.addEventListener("DOMNodeInserted", delayed_call(process, 500), false);
