// ==UserScript==
// @name           Ponibooru Board Helper
// @namespace      http://www.ponibooru.org/
// @author         BigMax
// @description    Improves Ponibooru's user experience.
// @include        http://www.ponibooru.org/*
// @include        http://ponibooru.413chan.net/*
// @include        http://whitetail.ponibooru.org/*
// @match          http://www.ponibooru.org/*
// @match          http://ponibooru.413chan.net/*
// @match          http://whitetail.ponibooru.org/*
// @updateURL      http://userscripts.org/scripts/source/129648.meta.js
// @downloadURL    http://userscripts.org/scripts/source/129648.user.js
// @version        1.1.2
// @history        1.1.2 Fixed Unicode characters mess on comment/message sending
// @history        1.1.2 Fixed wildcard bug on word filter
// @history        1.1.2 Fixed double hiding comment message when changing word blacklist
// @history        1.1.2 Added text tools on message page view/reply
// @history        1.1.1 Added the preview message button to user page message form
// @history        1.1.1 Fixed some escaping issues on sending comments/messages
// @history        1.1.1 Fixed the dreaded error 302 on Firefox when sending comments/messages
// @history        1.1.0 Thumbnail resize works also for Firefox and Opera now
// @history        1.1.0 Youtube video embedding works on comment/message preview too
// @history        1.1.0b2 Added shortcut keys to text tools
// @history        1.1.0b2 Quote text tool on number selections quotes the relative comment
// @history        1.1.0b2 Fixed missing text tools on message reply (both page and interface)
// @history        1.1.0b2 Fixed Youtube frames getting above dialogs
// @history        1.1.0b2 Updates post times, tags, new PMs when image page reloads
// @history        1.1.0b1 Added shortcut key for PBH options
// @history        1.1.0b1 Added text tools for comment and message composing
// @history        1.1.0b1 Added a link to 'Comments made' on user's page
// @history        1.1.0b1 Prevents page reload on comment post (image view only)
// @history        1.1.0b1 Prevents page reload on image voting up, down, removing vote, un/favoriting
// @history        1.1.0b1 Fixed bug on displaying user menus on usernames in dialogs
// @history        1.1.0b1 Fixed bug on quoting comments with Youtube embedded videos
// @history        1.1.0b1 Fixed bug on converting comment lists
// @history        1.1.0b1 Fixed Ponibooru's stylesheet rule that derps list margins everywhere
// @history        1.0.0 Fixed removing embedded videos
// @history        1.0.0 Fixed users menu positioning in Firefox
// @history        1.0.0 Fixed a bug in BBCode to HTML list conversion
// @history        1.0.0 Added selection of date/time format
// @history        1.0.0 New method of image hiding in comments
// @history        0.9.2 New private message interface
// @history        0.9.1 Fixed reloading comments on a page with no comments
// @history        0.9.1 Fixed 0 as limit of images in comments
// @history        0.9.1 Fixed multiple Reload buttons on comment reloading
// @history        0.9.0 First beta version
// @history        0.1.0 First development version
// ==/UserScript==

version="1.1.2";

if ((function() {try {
	if (typeof GM_setValue==="function" && typeof GM_getValue==="function") {
		GM_setValue("testkey","test");
		if (GM_getValue("testkey",false)==="test") return true;
	}
} catch (e) {}})())
	var setValue=GM_setValue,getValue=GM_getValue;
else if (typeof localStorage==="object")
	var setValue=function(key,value) {
		localStorage.setItem(key,value);
	},getValue=function(key,value) {
		var v=localStorage[key];
		return typeof v==="undefined" ? value : v;
	};
else var setValue=function() {},getValue=function() {};

var httpRequest=/*typeof GM_xmlhttpRequest==="undefined" ? */function(details) {
	// Blatantly copied from Google Chrome implementation. For every browser, since GM_xmlhttpRequest of GreaseMonkey/Scriptish doesn't do redirections
	function set_event(xhr, url, eventName, callback) {
		xhr[eventName]=function () {
			var isComplete=xhr.readyState==4;
			callback({responseText: xhr.responseText, readyState: xhr.readyState, responseHeaders: isComplete ? xhr.getAllResponseHeaders() : "",
					status: isComplete ? xhr.status : 0, statusText: isComplete ? xhr.statusText : "", finalUrl: isComplete ? url : ""});
		};
	}
	var xhr=new XMLHttpRequest(),evn=["onload", "onerror", "onreadystatechange"];
	for (var i=0,eventName;i<evn.length;i++)
		if ((eventName=evn[i]) in details) set_event(xhr, details.url, eventName, details[eventName]);

	xhr.open(details.method, details.url);
	if (details.overrideMimeType) xhr.overrideMimeType(details.overrideMimeType);
	if (details.headers)
		for (var header in details.headers)
			xhr.setRequestHeader(header, details.headers[header]);

	xhr.send(details.data || null);
}// : GM_xmlhttpRequest;

var addStyle=typeof GM_addStyle==="undefined" ? function(sty) { // Equivalent to Google Chrome implementation. For Opera.
	var se=document.createElement("style");
	se.type="text/css";
	se.appendChild(document.createTextNode(sty));
	(document.getElementsByTagName("HEAD")[0] || document.documentElement).appendChild(se);
} : GM_addStyle;

function cookie(name,val,exps,path,dom,sec) {
	if (arguments.length===1) {
		for (var cl=document.cookie.split(/\s*;\s*/),i=0;i<cl.length;i++)
			if (cl[i].split("=",1)[0]===name)
				return unescape(cl[i].substring(name.length+1));
		return null;
	} else if (val===null)
		document.cookie=name+"="+(path ? "; path="+path : "")
				+(dom ? "; domain=" + dom : "")+"; expires=Thu, 01-Jan-1970 00:00:01 GMT";
	else {
		if (exps) {
			if (exps instanceof Date) var expd=exps;
			else if (typeof exps==="number") {
				var expd=new Date();
				expd.setTime(expd.getTime()+exps*86400000);
			}
		}
		var ev=escplus(val);
		document.cookie=name+"="+ev+(exps ? "; expires="+expd.toGMTString() : "")
				+(path ? "; path="+path : "; path=/")+(dom ? "; domain="+dom : "" )+(sec ? "; secure" : "");
		return ev;
	}
}

function escplus(str) {return str.replace(/[\x00-\x1f%&=+]/g,function(m) {return escape(m);})}

var opts=getValue("pbhOptions"),_defOpts={
	multiPage: "1", thumbSize: "normal", imgWarnPx: "", imgWarnKB: "", fitComImg: true, letShwCom: true, maxComImg: "", fltComAut: "", fltComWrd: "",
	shwComSpl: "selection", embYtbVid: false, randomPie: false, hideBlot: false, dateFormat: "USA", pbhOptKey: "F8", pbhVersion: version
};
var keyMap={8: "BKSP", 9: "TAB", 12: "PAD5", 13: "ENTER", 27: "ESC", 32: "SPACE", 37: "LEFT", 38: "UP", 39: "RIGHT", 40: "DOWN", 33: "PGUP", 34: "PGDN", 35: "END", 36: "HOME",
		45: "INS", 46: "DEL", 91: "WIN", 112: "F1", 113: "F2", 114: "F3", 115: "F4", 116: "F5", 117: "F6", 118: "F7", 119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12"};
opts=opts ? JSON.parse(opts) : {};
for (var o in _defOpts) if (!(o in opts)) opts[o]=_defOpts[o];
setValue("pbhOptions",JSON.stringify(opts));

function isClass(obj,cls) {
	if (typeof obj==="string") obj=document.getElementById(obj);
	return (" "+obj.className+" ").indexOf(" "+cls+" ")!==-1;
}
function setClass(obj,cls,add) {
	if (typeof obj==="string") obj=document.getElementById(obj);
	if (add===false) obj.className=(" "+obj.className+" ").replace(" "+cls+" "," ").trim();
	else if (!isClass(obj,cls)) obj.className+=(obj.className ? " " : "")+cls;
	return obj.className;
}
function toggleClass(obj,cls) {
	if (typeof obj==="string") obj=document.getElementById(obj);
	var ic=isClass(obj,cls);
	if (ic) obj.className=(" "+obj.className+" ").replace(" "+cls+" "," ").trim();
	else obj.className+=" "+cls;
	return ic;
}

function htmlToBBCode(html) {
	return html.replace(/<(\/?(?:[bius]|h[1-4]|[uo]l|li))>/gi,function(m,m1) {return "["+m1.toLowerCase()+"]";}).replace(/\r?\n(\[[uo]l)/g,"$1")
			.replace(/<img src="([^"]+)">/gi,"[img]$1[/img]").replace(/<img.*?orig-src="([^"]+)".*?>/gi,"[img]$1[/img]")
			.replace(/<blockquote><em>(.*?)<a[^@]+(@\d+)<\/a> said:<\/em><br><small>/gi,"[quote=$1$2]") // PBH special quote formatting
			.replace(/<blockquote><em>(.*?) said:<\/em><br><small>/gi,"[quote=$1]")
			.replace(/<blockquote><small>/gi,"[quote]").replace(/<\/small><\/blockquote>/gi,"[/quote]")
			.replace(/<a href="\/post\/view\/(\d+)"[^>]*>&gt;&gt;\d+<\/a>/gi,">>$1")
			.replace(/<a href="([^"]+)"[^>]*>/gi,"[url=$1]").replace(/<\/a>/gi,"[/url]")
			.replace(/<span[^>]+>/gi,"[spoiler]").replace(/<\/span>/gi,"[/spoiler]").replace(/<br>/gi,"").replace(/<\/?iframe[^>]*>/gi,"");
}
function bbCodeToHtml(bbcode) {
	bbcode=bbcode.replace(/</g,"&lt;").replace(/>>(\d+)/g,"<a href=\"/post/view/$1\">&gt;&gt;$1</a>")
			.replace(/>>(.*)/g,"<blockquote><small>$1</small></blockquote>") // Seems to be a shortcut for one-line unreferenced quotations
			.replace(/\[(\/?(?:[bius]|h[1-4]|[uo]l|li))\]/g,"<$1>")
			.replace(/\[quote\]/g,"<blockquote><small>").replace(/\[\/quote\]/g,"</small></blockquote>")
			.replace(/\[quote=(.+?)@(\d+)\]/g,"<blockquote><em>$1<a href=\"#comment-no-$2\" title=\"Go to comment #$2\">@$2</a> said:</em><br><small>")
			.replace(/\[quote=([^\]]+)\]/g,"<blockquote><em>$1 said:</em><br><small>")
			.replace(/\[img\](https?:\/\/[^\[]*|data:image\/[^\[]*)\[\/img\]/g,"<img src=\"$1\">")
			.replace(/\[url\](https?:\/\/[^\[]*|data:[^\[]*)\[\/url\]/g,"<a href=\"$1\">$1</a>")
			.replace(/\[url=(https?:\/\/[^\[]*|data:[^\[]*)\](.*?)\[\/url\]/g,"<a href=\"$1\">$2</a>")
			.replace(/\[spoiler\]/g,"<span style=\"background-color:#000; color:#000;\" class=\"spoiler-text\">").replace(/\[\/spoiler\]/g,"</span>")
			.replace(/\[list\]/g,"<ul>").replace(/\[\/list\]/g,"</ul>")
			.replace(/\[\*\]((?:[\s\S](?!\[\*\]|\[\/list\]))*)/g,"<li>$1</li>")
			.replace(/\r?\n(?!<(?:li|\/ul|\/ol)>)/g,"\r\n<br>").replace(/\[sage\]/g,"");
	return bbcode;
}
function makeDialog(id,title,body,noshow) {
	var dlg=document.createElement("div");
	dlg.className="pbh-dialog";
	dlg.id=id || "pbhDlg"+Math.random()*1e16;
	dlg.innerHTML=(title ? "<div class='pbh-dialog-title'>"+title+"</div>" : "")+(body || "")
			+"<a class='pbh-dialog-close' href='#'>Close</a>";
	dlg.lastChild.addEventListener("click",function(e) {e.preventDefault(); if (!id) document.body.removeChild(dlg); else dlg.style.display="none";},false);
	dlg.firstChild.addEventListener("mousedown",function(e) {
		var _mm=function(e) {
			dlg.style.left=Math.max(0,Math.min(maxX,dinX+e.pageX-inX))+"px";
			dlg.style.top=Math.max(0,Math.min(maxY,dinY+e.pageY-inY))+"px";
		},_mu=function(e) {
			document.removeEventListener("mousemove",_mm);
			document.removeEventListener("mouseup",_mu);
		},inX=e.pageX,inY=e.pageY,dinX=dlg.offsetLeft,dinY=dlg.offsetTop;
		var maxX=document.documentElement.clientWidth-dlg.offsetWidth,maxY=document.documentElement.clientHeight-dlg.offsetHeight;
		document.addEventListener("mousemove",_mm,false);
		document.addEventListener("mouseup",_mu,false);
		e.preventDefault();
	},false);
	if (!noshow) {
		document.body.appendChild(dlg);
		setPosition(dlg,.5,.5);
	}
	return dlg;
}

function makeMenuBox(el,content) {
	var box=document.createElement("div"),bcr=el.getBoundingClientRect(),tgt=el,zil=[],zi;
	while (tgt && tgt.style) {
		zi=getComputedStyle(tgt,null).zIndex;
		if (!isNaN(zi-0)) zil.push(zi);
		tgt=tgt.parentNode;
	}
	box.className="pbh-menu-box";
	if (typeof content==="string") box.innerHTML=content;
	else content.forEach(function(mn) {
		var a=document.createElement("a");
		a.innerHTML=mn.text;
		if (mn.href) a.href=mn.href
		if (mn.action) a.addEventListener("click",mn.action,false);
		box.appendChild(a);
	});
	var arr=document.createElement("span");
	arr.className="pbh-menu-arrow";
	box.appendChild(arr);
	box.style.cssText="top: "+(bcr.bottom+document.body.scrollTop+document.documentElement.scrollTop+6)+"px; left: "
			+(bcr.left+document.body.scrollLeft+document.documentElement.scrollLeft)+"px;"+(zil.length ? " z-index: "+Math.max.apply(null,zil)+100+";" : "");
	box.addEventListener("click",function(e) {e.stopPropagation();},false);
	document.body.appendChild(box);
	return box;
}

function createPreviewBox(id,ta) {
	return function(e) {
		e.preventDefault();
		var pdlg=document.getElementById(id),txt=bbCodeToHtml(ta.value);
		if (pdlg) {
			pdlg.querySelector(".comment-preview").innerHTML=txt;
			pdlg.style.display="block";
			embedYoutubeLinks.cycle(opts.embYtbVid,pdlg);
		} else {
			pdlg=makeDialog(id,"Message Preview","<div class=\"comment-preview\">"+txt+"</div>");
			embedYoutubeLinks.cycle(opts.embYtbVid,pdlg);
			setPosition(pdlg,.5,.5);
		}
	};
}

function setPosition(elem,posx,posy) {
	if (!elem) return;
	var px=posx,py=posy;
	if (typeof posx==="number") {
		if (posx>0 && posx<1) px=(Math.max(0,document.documentElement.clientWidth-elem.offsetWidth))*posx+"px";
		else px+="px";
	}
	if (typeof posy==="number") {
		if (posy>0 && posy<1) py=(Math.max(0,document.documentElement.clientHeight-elem.offsetHeight))*posy+"px";
		else py+="px";
	}
	elem.style.cssText+=(px ? "left: "+px+";" : "")+(py ? "top: "+py+";" : "");
}

function showOptions() {
	var dlg=document.getElementById("pbhOptions");
	if (dlg) return dlg.style.display="";
	var dlg=makeDialog("pbhOptions","Ponibooru Board Helper options",
"<ul class='pbh-dialog-tab-box'>\
	<li class='pbh-dialog-tab'>Image list</li>\
	<li class='pbh-dialog-tab'>Comments</li>\
	<li class='pbh-dialog-tab'>Board</li>\
	<li class='pbh-dialog-tab'>About</li>\
</ul>\
<div class='pbh-dialog-tab-content'>\
	Number of pics per page: <select id='multiPage'><option value='1'>12</option><option value='2'>24</option><option value='3'>36</option></select><br/>\
	Thumbnail size: <select id='thumbSize'><option>tiny</option><option>small</option><option>normal</option><option>big</option><option>huge</option></select>\
	<table><tbody><tr><td rowspan='2' style='vertical-align: middle;'>Warn me when opening images larger than </td><td><input size='3' id='imgWarnPx'/> Mpx</td></tr>\
	<tr><td><input size='3' id='imgWarnKB'/> KB</td></tr></tbody></table>\
</div>\
<div class='pbh-dialog-tab-content'>\
	<label for='fitComImg'>Fit images in comments to screen:</label> <input type='checkbox' id='fitComImg'/><br/>\
	<label for='maxComImg'>Load at most </label><input type='text' size='3' id='maxComImg'/><label for='maxComImg'> images in comments</label><br/>\
	Show/hide spoilers on <select id='shwComSpl'><option>selection</option><option>click</option><option>hover</option></select><br/>\
	<label for='embYtbVid'>Embed Youtube video links:</label> <input type='checkbox' id='embYtbVid'/><br/>\
	<label for='fltComAut'>Comment author blacklist:</label><br/>\
	<textarea rows='3' id='fltComAut'></textarea><small>(separate usernames with spaces, case insensitive)</small><br/>\
	<label for='fltComAut'>Comment word blacklist:</label><br/>\
	<textarea rows='2' id='fltComWrd'></textarea><small>(separate words with spaces, use * and ? as wildcards)</small><br/>\
	<label for='letShwCom'>Allow me to show banned comments:</label> <input type='checkbox' id='letShwCom'/><br/>\
</div>\
<div class='pbh-dialog-tab-content'>\
	<label for='hideBlot'>Keep blotter hidden when I return:</label> <input id='hideBlot' type='checkbox'/><br/>\
	<label for='randomPie'>Show Pinkie Pie at random:</label> <input id='randomPie' type='checkbox'/><br/>\
	Date/time format: <select id='dateFormat'><option value=\"SYS\">System format</option><option value=\"USA\">American (m/d/y)</option><option value=\"EUR\">International (d/m/y)</option><option value=\"JPN\">Eastern (y/m/d)</option><option value=\"ISO\">ISO format</option><option value=\"UTC\">UTC format</option><option value=\"GMT\">GMT format</option><option value=\"DBD\">Database native</option></select><br/>\
	<label for='pbhOptKey'>Shortcut for PBH options:</label> <input id='pbhOptKey' type='text' readonly='readonly'/><a href='#'> Clear</a><br/>\
</div>\
<div class='pbh-dialog-tab-content' id='pbhAbout'>\
	<strong>Ponibooru Board Helper v."+version+"</strong><br/>\
	Author: <a href='/user/BigMax'>BigMax</a><br/><br/>\
	Userscript for <a href='http://www.ponibooru.org'>Ponibooru</a><br/><br/>\
	Thanks to <a href='/user/Eco'>Eco</a> for this image board,<br/>\
	to <a href='/user/MaroonBunyip'>MaroonBunyip</a> for <a href='/post/view/70645'>this guide</a>,<br/>\
	to all the other beta testers,<br/>\
	and the rest of the community.<br/><br/>\
	Let's make it 20% cooler!<br/><br/>\
	This software is distributed under the<br/>\
	<a href=\"http://www.mozilla.org/MPL/2.0/\">Mozilla Public License version 2.0</a><br/><br/>\
	Additional art by <a href='/post/list/artist%3Amegasweet/1'>Megasweet</a>, <a href='http://www.desktopponies.com/'>desktopponies.com</a>\
</div>");
	var tabs=dlg.getElementsByClassName("pbh-dialog-tab"),conts=dlg.getElementsByClassName("pbh-dialog-tab-content");
	dlg.getElementsByClassName("pbh-dialog-tab-box")[0].addEventListener("click",function(e) {
		if (isClass(e.target,"pbh-dialog-tab")) select_tab(e.target);
	});
	function select_tab(el) {
		for (var i=0,l=tabs.length;i<l;i++)
			if (tabs[i]===el) {
				tabs[i].className="pbh-dialog-tab current";
				conts[i].style.display="block";
			} else {
				tabs[i].className="pbh-dialog-tab";
				conts[i].style.display="";
			}
	}
	select_tab(tabs[0]);
	dlg.addEventListener("change",function(e) {
		if (!(e.target.id in opts) || e.target.type==="checkbox" || e.target.type==="radio") return;
		setOption(e.target.id,e.target.value);
	},false);
	dlg.addEventListener("click",function(e) {
		if (e.target.type!=="checkbox" && e.target.type!=="radio") return;
		if (e.target.type==="checkbox" && e.target.id in opts) setOption(e.target.id,e.target.checked);
		else if (e.target.name in opts) setOption(e.target.name,e.target.value); // For radio buttons
	},false);
	for (var o in opts) {
		var inp=dlg.querySelector("#"+o);
		if (inp) inp[typeof opts[o]==="boolean" ? "checked" : "value"]=opts[o];
	}
	dlg.querySelector("#pbhOptKey+a").addEventListener("click",function(e) {
		e.preventDefault();
		setOption("pbhOptKey",this.previousSibling.value="");
	},false);
	dlg.querySelector("#pbhOptKey").addEventListener("keyup",function(e) {
		e.preventDefault();
		if ((e.keyCode>47 && e.keyCode<58) || (e.keyCode>64 && e.keyCode<91) || e.keyCode in keyMap)
			setOption("pbhOptKey",this.value=(e.shiftKey ? "SHIFT+" : "")+(e.ctrlKey ? "CTRL+" : "")+(e.altKey ? "ALT+" : "")
					+(e.keyCode in keyMap ? keyMap[e.keyCode] : String.fromCharCode(e.keyCode).toUpperCase()));
	},false);
}

function setOption(key,value) {
	switch (key) {
	case "fitComImg":
		if (_page==="image" || _page==="comments") setClass("body","fit-image-width",value);
		break;
	case "letShwCom":
		if (_page==="image" || _page==="comments") setClass("body","allow-show-banned",value);
		break;
	case "maxComImg":
		value=(isNaN(parseInt(value)) ? "" : parseInt(value)).toString();
		limitCommentImages(document.getElementById("maxComImg").value=value);
		break;
	case "fltComAut":
	case "fltComWrd":
		if (_page==="image" || _page==="comments") {
			if (key==="fltComAut") authban=" "+value.toLowerCase()+" ";
			else wordban=getWordFilter(value);
			[].forEach.call(document.body.getElementsByClassName("comment"),function(comt) {
				checkBannedComment(comt,comt.getElementsByTagName("TD")[1],comt.getElementsByTagName("A")[0].textContent);
			});
		}
		break;
	case "imgWarnPx":
	case "imgWarnKB":
		value=parseFloat(value);
		document.getElementById(key).value=isNaN(value) ? "" : value;
		break;
	case "embYtbVid": embedYoutubeLinks(value); break;
	case "shwComSpl":
		if (_page==="image" || _page==="comments")
			["selection","click","hover"].forEach(function(t) {setClass("body","show-spoilers-on-"+t,t===value);});
		break;
	case "thumbSize": resizeThumbnails(value); break;
	}
	opts[key]=value;
	setValue("pbhOptions",JSON.stringify(opts));
}

function startPinkiePie(secs) {
	setTimeout(function() {
		var ppp=new Image();
		ppp.src="http://img195.imageshack.us/img195/8614/pinkiepiepolka.gif";
		ppp.style.cssText="position: fixed; bottom: 0px; left: -53px; z-index: 1000;";
		document.body.appendChild(ppp);
		var si=setInterval(function() {
			var l=parseInt(ppp.style.left)+3;
			ppp.style.left=l+"px";
			if (l>document.documentElement.clientWidth) {
				clearInterval(si);
				if (opts.randomPie) startPinkiePie(300);
			}
		},40);
	},Math.random()*(secs || 60)*1000);
}

function overloadPage() {
	var mtc=location.pathname.match(/(\/post\/list(?:\/[^\/]+)?\/)(\d+)$/);
	var cpage=mtc ? mtc[2]-0 : 1,path=mtc ? mtc[1] : "/post/list/";
	function check_images(parent) {
		[].forEach.call(parent.getElementsByClassName("thumb"),function(thm) {
			var img=thm.getElementsByTagName("IMG")[0],m;
			if (!img) return;
			var id=img.parentNode.getAttribute("href").substring(11);
			if (images.some(function(im) {return im.id==id;})) return thm.parentNode.removeChild(thm);
			if (!(m=img.title.match(/(.*?) \/\/ (\d+)x(\d+) \/\/ ([0-9\.]+)(KB|MB|)$/))) return;
			images.push({id: id, node: img, thumb: thm, size: [m[2]-0,m[3]-0], tags: m[1].split(" "), filesize: m[4]*({"":1,"KB":1024,"MB":1048576})[m[5]]});
		});
	}
	function load_page(page,retry) {
		var repl=document.getElementById("pageLoader-"+page);
		if (!repl) {
			repl=document.createElement("span");
			repl.className="thumbs-place-holder";
			repl.id="pageLoader-"+page;
			repl.innerHTML="Loading...";
			main.appendChild(repl);
		}
		httpRequest({method: "GET", url: path+page, onload: function(res) {
			if (res.status<200 || res.status>300) { // The server is being silly again... But no more than 3 tries.
				if (retry>=3) repl.innerHTML="Couldn't load page!";
				else load_page(page, (retry || 0)+1);
				return;
			}
			var txt=res.responseText,i1=txt.indexOf("<span class=\"thumb\"");
			if (i1===-1) return main.removeChild(repl); // No images in this page.
			var frag=document.createDocumentFragment(),temp=document.createElement("span");
			temp.innerHTML=txt.substring(i1,txt.indexOf("</div>",i1));
			check_images(temp);
			while (temp.firstChild) frag.appendChild(temp.firstChild);
			main.replaceChild(frag,repl);
		}});
	}
	check_images(main);
	if (opts.multiPage<2) return;
	// Rewriting the paginator
	var pagin=document.getElementById("paginator"),ancs=pagin.querySelectorAll("*");
	var maxp=ancs[ancs.length-1].textContent;
	maxp=(/^\d+$/.test(maxp) ? maxp : ancs[ancs.length-2].textContent)-0;
	
	var vpage=Math.floor((cpage-1)/opts.multiPage)+1,rest=(cpage-1)%opts.multiPage,radd=rest ? 1 : 0;
	location.hash="#page-"+vpage+(rest ? "+"+rest+"/"+opts.multiPage : "");
	var pgh=vpage>3 || (vpage===3 && rest) ? "<a href=\""+path+((vpage-2+radd)*opts.multiPage+1)+"#page-"+(vpage-1+radd)
			+"\">&lt;&lt;</a><a href=\""+path+"1#page-1\">1</a>"+(vpage>4 || (vpage===4 && rest) ? " ... " : "") : "";
	pgh+=[-2,-1].map(function(d) {return vpage+d+radd>0 ? "<a href=\""+path+((vpage+d+radd-1)*opts.multiPage+1)+"#page-"+(vpage+d+radd)+"\">"+(vpage+d+radd)+"</a>" : "";}).join("");
	pgh+="<b>"+vpage+(rest ? " "+rest+"/"+opts.multiPage : "")+"</b>";

	var maxvp=Math.floor((maxp-1)/opts.multiPage)+1;
	pgh+=[1,2].map(function(d) {return vpage+d<=maxvp ? "<a href=\""+path+((vpage+d-1)*opts.multiPage+1)+"#page-"+(vpage+d)+"\">"+(vpage+d)+"</a>" : "";}).join("");
	pgh+=vpage<maxvp-2 ? (vpage<maxvp-3 ? " ... " : "")+"<a href=\""+path+((maxvp-1)*opts.multiPage+1)+"#page-"+maxvp+"\">"+maxvp
			+"</a><a href=\""+path+(vpage*opts.multiPage+1)+"#page-"+(vpage+1)+"\">>></a>" : "";
	pagin.innerHTML=pgh;
	for (var i=1;i<opts.multiPage && cpage+i<=maxp;i++) load_page(cpage+i);
}

function limitCommentImages(lim) {
	if (_page!=="image" && _page!=="comments") return;
	var imgCnt=0,imgLim=((arguments.length<1 ? opts.maxComImg : lim) || Infinity)-0;
	[].forEach.call(document.getElementsByClassName("comment-body"),function(cb) {
		var imgs=cb.getElementsByTagName("IMG");
		imgCnt+=imgs.length;
		if (imgCnt>imgLim) {
			for (var i=imgs.length-1,m=Math.max(0,imgs.length+imgLim-imgCnt);i>=m;i--)
				if (!imgs[i].getAttribute("orig-src")) {
					imgs[i].setAttribute("orig-src",imgs[i].src);
					imgs[i].title="This image was hidden because over the image number limit";
					imgs[i].src="data:image/gif;base64,R0lGODlhEAAQALMAAAAAAP8AAP8zM//MAP/MM//MZv/Mmf/MzP/M////AP//M///Zv//mf//zP///wAAACwAAAAAEAAQAAAERhDISat0OGt93RGH9oXO9QVgJgRBeK0seMYl4MEo3tbYzP6kzu3HIvF6uhRGqIsFbT7UL/UiHnwC3gGILB5HIqVwQ7aYKREAOw==";
				}
		} else {
			for (var i=0,m=imgs.length,os;i<m;i++)
				if (os=imgs[i].getAttribute("orig-src")) {
					imgs[i].src=os;
					imgs[i].removeAttribute("orig-src");
					imgs[i].title="";
				}
		}
	});
}

function getWordFilter(val) {
	if (arguments.length<1) val=opts.fltComWrd;
	if (!val) return null;
	try {
		var re=new RegExp("\\b(?:"+val.replace(/([$\/\.\+\|\(\)\[\]\{\}\\])/g,"\\$1").replace(/\?/g,"\\S").replace(/\*/g,"\\S*").replace(/\s+/g,"|")+")\\b","i");
	} catch(e) {return e;}
	return re;
}

function embedYoutubeLinks(embed) {
	if (_page!=="image" && _page!=="comments") return;
	[].forEach.call(document.getElementsByClassName("comment-body"),embedYoutubeLinks.cycle.bind(null,arguments.length ? embed : opts.embYtbVid));
}
embedYoutubeLinks.cycle=function(embed,cb) {
	var ancs=cb.getElementsByTagName("A"),anc;
	if (embed)
		for (var i=0,m=ancs.length,mtc;i<m;i++) {
			if (!(anc=ancs[i]).href || isClass(anc,"pbh-youtube-frame")) continue;
			var vid_id=null,prot,hhref=anc.href.split("#");
			if (mtc=hhref[0].match(/^(https?):\/\/www\.youtube\.com\/watch\?(.*)/)) {
				prot=mtc[1];
				mtc[2].split("&").some(function(p) {if (/^v=[\w\-]{11}$/.test(p)) return vid_id=p.substring(2);});
			} else if (mtc=hhref[0].match(/^(https?):\/\/youtu\.be\/([\w\-]{11})/)) {prot=mtc[1]; vid_id=mtc[2];}
			if (vid_id) {
				var ifr=document.createElement("iframe");
				ifr.setAttribute("frameborder","0");
				ifr.setAttribute("allowfullscreen","true");
				ifr.src=mtc[1]+"://www.youtube.com/embed/"+vid_id+"?wmode=opaque"+(hhref[1] ? "#"+hhref[1] : "");
				setClass(anc,"pbh-youtube-frame");
				anc.appendChild(ifr);
			}
		}
	else for (var i=0,m=ancs.length,mtc;i<m;i++) {
		anc=ancs[i];
		if (isClass(anc,"pbh-youtube-frame")) {
			setClass(anc,"pbh-youtube-frame",false);
			if (anc.lastChild.tagName==="IFRAME") anc.removeChild(anc.lastChild);
		}
	}
};

function resizeThumbnails(size) {
	if (_page!=="board") return;
	size=arguments.length ? size : opts.thumbSize;
	var bd=document.getElementById("body");
	var cls=bd.className;
	cls=cls.replace(/ ?thumb-size-\w+/,"");
	bd.className=(cls ? cls+" " : "")+"thumb-size-"+size;
}

function sendMessage(rcpt) {
	if (typeof rcpt!=="string") return;
	var dlg=document.getElementById("sendMessage"+rcpt),id,token;
	if (dlg) return dlg.style.display="block";
	dlg=makeDialog("sendMessage"+rcpt,"Send a message to "+rcpt,"<table style=\"width: 455px;\"><tbody>"
			+"<tr><td>Subject:</td><td><input type=\"text\" value=\"\"></td></tr>"
			+"<tr><td colspan=\"2\"><textarea style=\"width: 100%\" rows=\"6\"></textarea></td></tr></tbody></table>"
			+"<button disabled=\"disabled\">Loding data...</button> <button>Preview message</button>");
	var btns=dlg.getElementsByTagName("BUTTON"),ta=dlg.getElementsByTagName("TEXTAREA")[0],send=btns[btns.length-2],pview=btns[btns.length-1];
	extendTextArea(ta);
	setPosition(dlg,.5,.5);
	send.addEventListener("click",function() {
		if (!id || !token) return;
		var that=this;
		this.disabled=true;
		this.innerHTML="Sending message...";
		httpRequest({method: "POST", url: "/pm/send", data: "auth_token="+token+"&to_id="+id+"&subject="+escplus(dlg.getElementsByTagName("INPUT")[0].value)
				+"&message="+escplus(ta.value), onload: function(ajax) {
			if (ajax.status==200) {
				document.body.removeChild(dlg);
				var pdlg=document.getElementById("sendMessage"+rcpt+"_preview");
				if (pdlg) document.body.removeChild(pdlg);
			} else {
				alert("An error occurred sending the message:\n"+ajax.status+" "+ajax.statusText);
				that.disabled=false;
				that.innerHTML="Send message";
			}
		},headers: {"Content-Type": "application/x-www-form-urlencoded"}});
	});
	pview.addEventListener("click",createPreviewBox("sendMessage"+rcpt+"_preview",ta),false);
	dlg.lastChild.addEventListener("click",function() {
		var pdlg=document.getElementById("sendMessage"+rcpt+"_preview");
		if (pdlg) pdlg.style.display="none";
	});
	function req_info() {
		httpRequest({method: "GET", url: "/user/"+escplus(rcpt), onload: function(ajax) {
			if (ajax.status!==200) return req_info();
			var txt=ajax.responseText.substring(ajax.responseText.indexOf("<form"));
			var m=txt.match(/auth_token['"]\s*value=['"]([0-9a-f]+)/);
			if (m) token=m[1];
			var m=txt.match(/to_id['"]\s*value=['"](\d+)/);
			if (m) id=m[1];
			if (token && id) {
				send.innerHTML="Send message";
				send.disabled=false;
			} else send.innerHTML="Loading error";
		}});
	}
	req_info();
}

function checkLink(anc) {
	var m,func,imgo,href=anc.getAttribute("href") || "";
	if (m=href.match(/^\/user\/(.*)/i)) {
		func=function(e) {
			if (e.ctrlKey) return;
			removeMenuBoxes();
			var menu=m[1]!=="Anonymous" && m[1]!==user ? [{text: "Send a private message",action: function() {document.body.removeChild(box); sendMessage(m[1]);}}] : [];
			if (m[1]===user)
				menu.push.apply(menu,[{text: "Go to your user page",href: "/%75ser"},{text: "See your favorited images",href: "/post/list/favorited_by="+m[1]+"/1"},
						{text: "See your uploaded images",href:"/post/list/user="+m[1]+"/1"},
						{text: "See your commented images",href:"/post/list/commented_by="+m[1]+"/1"}]);
			else menu.push.apply(menu,[{text: "Go to "+m[1]+"'s user page",href: "/%75ser/"+m[1]},{text: "See user's favorited images",href: "/post/list/favorited_by="+m[1]+"/1"},
					{text: "See user's uploaded images",href:"/post/list/user="+m[1]+"/1"},
					{text: "See user's commented images",href:"/post/list/commented_by="+m[1]+"/1"},
					{text: ((" "+opts.fltComAut.toLowerCase()+" ").indexOf(m[1].toLowerCase())===-1 ? "Block " : "Unblock ")+m[1]+"'s comments",
					action: function() {
						document.body.removeChild(box);
						var authl=" "+opts.fltComAut+" ",i=authl.toLowerCase().indexOf(" "+m[1].toLowerCase()+" ");
						if (!~i) setOption("fltComAut",(opts.fltComAut+" "+m[1]).trim());
						else setOption("fltComAut",(authl.substring(0,i)+authl.substring(i+m[1].length+1)).slice(1,-1));
					}}]);
			var box=makeMenuBox(this,menu);
			e.preventDefault();
			e.stopPropagation();
		}
	} else if ((m=href.match(/^\/post\/view\/(.*)/i)) && anc.firstChild.tagName==="IMG" && (opts.imgWarnPx || opts.imgWarnKB)) {
		images.some(function(im) {if (im.node.parentNode===anc) {imgo=im; return true;}});
		func=imgo ? function(e) {
			if (e.ctrlKey) return;
			if (opts.imgWarnPx && imgo.size[0]*imgo.size[1]>opts.imgWarnPx*1e6)
				var warn=(imgo.size[0]*imgo.size[1]/1e6).toFixed(1)+" Mpx";
			else if (opts.imgWarnKB)
				var sz=imgo.filesize/1024,warn=sz>opts.imgWarnKB ? sz.toFixed(1)+" KB" : null;
			if (warn && !confirm("The image is "+warn+" large. Open it anyway?\n(Tip: press Ctrl while clicking to suppress this warning.)")) e.preventDefault(e);
		} : null;
	}
	if (func) anc.addEventListener("click",func,false);
}

function manageComments(combox,comta) {
	if (!(comta instanceof Element)) comta=combox.querySelector("form textarea");
	[].forEach.call(combox.querySelectorAll(".comment"),function(comt) {
		var tds=comt.getElementsByTagName("TD"),cm=tds[0],txttd=tds[1];
		var anc=cm.getElementsByTagName("A")[0],author=anc.firstChild.nodeValue;
		var brs=cm.getElementsByTagName("BR"),comn=brs[0].nextSibling.nodeValue.replace(/\D/g,"");
		if (comments.some(function(c) {
			if (c.id===comn) {
				c.head.replaceChild(cm.lastChild,c.head.lastChild);
				return true;
			}
		})) return comt.parentNode.removeChild(comt);
		comments.push({id: comn, author: author, node: comt, head: cm, body: txttd});
		checkBannedComment(comt,txttd,author);
		txttd.className="comment-body";
		anc.name="comment-no-"+comn;
		var quote=document.createElement("span");
		quote.className="pbh-quote-button";
		quote.title="Quote "+author+"'s comment";
		quote.addEventListener("click",function() {
			var addtxt="[quote="+author+"@"+comn+"]"+htmlToBBCode(txttd.innerHTML)+"[/quote]\r\n",ss=comta.selectionStart,se=comta.selectionEnd;
			comta.value=comta.value.substring(0,ss)+addtxt+comta.value.substring(ss);
			comta.selectionStart=ss+addtxt.length;
			comta.selectionEnd=se+addtxt.length;
		},false);
		cm.insertBefore(quote,brs[1]);
		[].forEach.call(txttd.getElementsByTagName("SPAN"),function(spl) { // Should be spoilers
			setClass(spl,"spoiler-text");
		});
		[].forEach.call(txttd.getElementsByTagName("BLOCKQUOTE"),function(bq) { // Quoted comments
			if (!bq.firstChild || bq.firstChild.tagName!=="EM") return;
			bq.firstChild.innerHTML=bq.firstChild.innerHTML.replace(/^(\S+)@(\d+)/,"$1<a href=\"#comment-no-$2\" title=\"Go to comment #$2\">@$2</a>");
		});
	});
	extendTextArea(comta);
	if (comta.form.lastElementChild.tagName==="BUTTON") return;
	var pvcom=document.createElement("button");
	pvcom.innerHTML="Preview Comment";
	pvcom.addEventListener("click",createPreviewBox("commentPreview",comta),false);
	comta.form.appendChild(pvcom);
	comta.form.appendChild(document.createTextNode(" Posting as "+(user || "anonymous")));
}

function checkCommentPageStub(html) {
	var i1=html.indexOf("<div id='Favorited_Byleft'>"),i2=html.indexOf("</div>",i1),elem=document.getElementById("Favorited_Byleft");
	if (i1!==-1 && i2!==-1) {
		if (elem) elem.innerHTML=html.substring(i1+27,i2);
		else {
			fav=document.createElement("div");
			fav.innerHTML="<h3 id='Favorited_Byleft-toggle' onclick=\"toggle('Favorited_Byleft')\">Favorited By</h3><div id='Favorited_Byleft'>"
					+html.substring(i1+27,i2)+"</div>";
			elem=document.getElementById("Image_Controlsleft-toggle");
			while (fav.firstChild) elem.parentNode.insertBefore(fav.firstChild,elem);
		}
	} else if (elem) {
		elem.parentNode.removeChild(elem.previousElementSibling);
		elem.parentNode.removeChild(elem);
	}
	i1=html.indexOf("Current Score"),i2=html.indexOf("\n",i1);
	if (i1!==-1 && i2!==-1) document.getElementById("Image_Scoreleft").firstChild.nodeValue=html.substring(i1,i2);
	i1=html.indexOf("favorite_action"),i2=html.indexOf(">",i1);
	if (i1!==-1 && i2!==-1) {
		var fav=html.substring(i1,i2),elem=document.getElementsByName("favorite_action")[0];
		fav=fav.match(/value='(unset|set)'/);
		elem.value=fav[1];
		elem.nextElementSibling.value=fav[1]==="set" ? "Favorite" : "Un-Favorite";
	}
	i1=html.indexOf("<table class='comment"),i2=html.indexOf("<form action='/comment");
	if (i1!==-1 && i2!==-1) { // i1===-1 => no comments
		var cmain=document.getElementById("Commentsmain"),form=cmain.getElementsByTagName("form")[0],stub=document.createElement("div");
		stub.innerHTML=html.substring(i1,i2);
		cmain.insertBefore(stub,form);
		manageComments(stub,form.getElementsByTagName("TEXTAREA")[0]);
		while (stub.firstElementChild) cmain.insertBefore(stub.firstElementChild,stub);
		cmain.removeChild(stub);
		limitCommentImages();
		embedYoutubeLinks();
	}
	// Should check for new tags and new messages
	i1=html.indexOf(">My Account"),i2=html.indexOf("<",i1);
	if (i1!==-1 && i2!==-1 && (elem=document.body.querySelector("a[href='/user']")))
		elem.firstChild.nodeValue=html.substring(i1+1,i2);
	i1=html.indexOf("<div id='imgdata'>"),i2=html.indexOf("</div>",i1);
	if (i1!==-1 && i2!==-1) {
		elem=document.createElement("div");
		elem.innerHTML=html.substring(i1+19,i2);
		document.getElementById("tag_editor").value=elem.querySelector("#tag_editor").value;
		document.getElementsByName("tag_edit__source")[0].value=elem.querySelector("input[name='tag_edit__source']").value;
		if (fav=elem.querySelector(":checked"))
			document.getElementById(fav.id).checked=true;
	}
	var i1=html.indexOf("<div id='Relatedleft'>"),i2=html.indexOf("</div>",i1);
	if (i1!==-1 && i2!==-1) document.getElementById("Relatedleft").innerHTML=html.substring(i1+22,i2);
}

function extendTextArea(ta) {
	if (ta.previousElementSibling && isClass(ta.previousElementSibling,"text-toolbar")) return;
	var tbar=document.createElement("div"),urlRE=/^https?:\/\/|^data:(?:image|text)\//;
	tbar.className="text-toolbar";
	tbar.innerHTML="<button class='text-tool make-bold' title='Bold (Ctrl+B)'><span>B</span></button> <button class='text-tool make-italic' title='Italic (Ctrl+I)'><span>I</span></button> <button class='text-tool make-underline' title='Underline (Ctrl+U)'><span>U</span></button> <button class='text-tool make-strike-through' title='Strike-through (Ctrl+Shift+S)'><span>S</span></button> <button class='text-tool make-link' title='Create a link (Ctrl+Alt+L)'><span></span></button> <button class='text-tool make-image' title='Insert an image (Ctrl+Alt+I / Ctrl+Alt+P)'><span></span></button> <button class='text-tool make-quote' title='Insert quoted text (Ctrl+Q)'><span></span></button> <button class='text-tool make-header1' title='Create a H1 header (Ctrl+Shift+1)'><span>A</span></button> <button class='text-tool make-header2' title='Create a H2 header (Ctrl+Shift+2)'><span>A</span></button> <button class='text-tool make-header3' title='Create a H3 header (Ctrl+Shift+3)'><span>A</span></button> <button class='text-tool make-ulist' title='Create a bullet list (Ctrl+Shift+L)'><span></span></button> <button class='text-tool make-olist' title='Create a numbered list (Ctrl+Shift+O)'><span></span></button> <button class='text-tool make-spoiler' title='Hide spoiler text (Ctrl+Alt+S)'><span></span></button>";
	var btns=tbar.getElementsByTagName("BUTTON");
	function do_action(ta,action) {
		var ss=ta.selectionStart,se=ta.selectionEnd,sel=ta.value.substring(ss,se),str=sel,offs=0;
		switch (action) {
			case "bold": str="[b]"+sel+"[/b]"; offs=4; break;
			case "italic": str="[i]"+sel+"[/i]"; offs=4; break;
			case "underline": str="[u]"+sel+"[/u]"; offs=4; break;
			case "strike-through": str="[s]"+sel+"[/s]"; offs=4; break;
			case "link":
				if (urlRE.test(sel)) str="[url]"+sel+"[/url]";
				else {
					var lnk=prompt("Type the link you want to insert:");
					if (lnk!=null && urlRE.test(lnk)) str="[url="+lnk+"]"+sel+"[/url]";
				}
				offs=6; break;
			case "image":
				if (urlRE.test(sel)) str="[img]"+sel+"[/img]";
				else if (!sel) {
					var lnk=prompt("Type the URL of the image you want to insert:");
					if (lnk!=null && urlRE.test(lnk)) str="[img]"+lnk+"[/img]";
				}
				offs=6; break;
			case "quote":
				if (/^\s*\d+\s*$/.test(sel))
					for (var offs=comments.length;offs>0;offs--)
						if (comments[offs-1].id.slice(-sel.length)===sel) break;
				str=(offs>0 ? "[quote="+comments[offs-1].author+"@"+comments[offs-1].id+"]"+htmlToBBCode(comments[offs-1].body.innerHTML) : "[quote]"+sel)+"[/quote]";
				offs=8;
				break;
			case "header1": case "header2": case "header3":
				str="[h"+action.slice(-1)+"]"+sel+"[/h"+action.slice(-1)+"]"; offs=5; break;
			case "ulist": case "olist":
				var txt=sel.trim().split(/\n/);
				str="["+action.substring(0,2)+"]"+(txt.length ? "\n[li]"+txt.join("[/li]\n[li]")+"[/li]\n" : "")+"[/"+action.substring(0,2)+"]";
				offs=5; break;
			case "spoiler": str="[spoiler]"+sel+"[/spoiler]"; offs=10; break;
		}
		ta.value=ta.value.substring(0,ss)+str+ta.value.substring(se);
		ta.selectionStart=ta.selectionEnd=ss+str.length-(!sel && sel!==str ? offs : 0);
	}
	tbar.addEventListener("click",function(e) {
		var tgt=e.target;
		while (tgt && tgt.tagName!=="BUTTON") tgt=tgt.parentNode;
		if (!tgt) return;
		e.preventDefault();
		var cls=tgt.className.match(/\bmake-([\w\-]*)\b/);
		if (!cls) return;
		do_action(ta,cls[1]);
	},false);
	ta.addEventListener("keyup",function(e) {
		var action;
		switch (e.keyCode) {
			case 66: if (e.ctrlKey) action="bold"; break;
			case 73:
				if (e.ctrlKey && e.altKey) action="image";
				else if (e.ctrlKey) action="italic";
				break;
			case 85: if (e.ctrlKey) action="underline"; break;
			case 83:
				if (e.ctrlKey && e.altKey) action="strike-through";
				else if (e.ctrlKey) action="spoiler";
				break;
			case 76:
				if (e.ctrlKey && e.shiftKey) action="ulist";
				else if (e.ctrlKey && e.altKey) action="link";
				break;
			case 79: if (e.ctrlKey && e.shiftKey) action="olist"; break;
			case 80: if (e.ctrlKey && e.altKey) action="image"; break;
			case 81: if (e.ctrlKey) action="quote"; break;
			case 49: case 50: case 51: if (e.ctrlKey && e.shiftKey) action="header"+String.fromCharCode(e.keyCode); break;
		}
		if (!action) return;
		e.preventDefault();
		do_action(ta,action);
	},false);
	ta.parentNode.insertBefore(tbar,ta);
}

function checkBannedComment(comt,td,author) {
	if (author===user) return;
	var ba=authban.indexOf(" "+author.toLowerCase()+" ")!==-1; // Author is blacklisted
	if (ba || (wordban && wordban.test(td.textContent))) {     // or is using blacklisted words
		if (isClass(comt.tBodies[0].lastChild,"hide-warning"))
			comt.tBodies[0].removeChild(comt.tBodies[0].lastChild);
		setClass(comt,"hidden");
		var wrow=document.createElement("tr"),warn=document.createElement("td");
		wrow.className="hide-warning";
		warn.colSpan=2;
		warn.innerHTML="This comment by <a href=\"/user/"+escplus(author)+"\">"+author+"</a> has been hidden due to "
				+(ba ? "blacklisted author" : "banned words")+". <a href='#'>Show it anyway</a>";
		warn.lastChild.addEventListener("click",function(e) {e.preventDefault(); setClass(comt,"hidden",false);});
		wrow.appendChild(warn);
		comt.tBodies[0].appendChild(wrow);
	} else if (isClass(comt.tBodies[0].lastChild,"hide-warning")) {
		comt.tBodies[0].removeChild(comt.tBodies[0].lastChild);
		setClass(comt,"hidden",false);
	}
}

function removeMenuBoxes() {
	var boxes=document.getElementsByClassName("pbh-menu-box");
	for (var i=boxes.length-1;i>=0;i--)
		document.body.removeChild(boxes[i]);
}

function getDateFromDBTime(dbt) {
	var dm=dbt.match(/^(20\d\d)\-(0[1-9]|1[0-2])\-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)(?:\.(\d+))?/);
	if (!dm) return;
	var date=new Date(dm[1],dm[2]-1,dm[3],dm[4],dm[5],dm[6],((dm[7] || "000").substring(0,3)+"000").substring(0,3));
	date.millimills=((dm[7] || "000").substring(3)+"000").substring(0,3);
	date.setTime(date.getTime()-date.getTimezoneOffset()*6e4+2.52e7); // Converting date/time from GMT-7 to local time zone
	return date;
}

function getDateString(date,format) {
	if (!(date instanceof Date)) return String(date);
	switch (format || opts.dateFormat) {
		case "ISO": return date.toISOString();
		case "UTC": return date.toUTCString();
		case "GMT": return date.toGMTString();
		case "SYS": return date.toString();
		case "DBD": return getDateString(date,"Y-m-d H:i:s.u");
		case "USA": return getDateString(date,"m/d/Y G:i:s A");
		case "EUR": return getDateString(date,"d/m/Y H:i:s");
		case "JPN": return getDateString(date,"Y/m/d H:i:s");
		default:
			for (var i=0,l=format.length,t="",c;i<l;i++) {
				if ((c=format[i])==="\\") {t+=format[++i]; continue;}
				switch (c) {
					case "Y": t+=date.getFullYear(); break;
					case "m": t+=String(date.getMonth()+101).substring(1); break;
					case "n": t+=date.getMonth()+1; break;
					case "d": t+=("0"+date.getDate()).slice(-2); break;
					case "j": t+=date.getDate(); break;
					case "G": t+=("0"+(date.getHours()%12 || 12)).slice(-2); break;
					case "g": t+=date.getHours()%12 || 12; break;
					case "H": t+=("0"+date.getHours()).slice(-2); break;
					case "h": t+=date.getHours(); break;
					case "i": t+=("0"+date.getMinutes()).slice(-2); break;
					case "s": t+=("0"+date.getSeconds()).slice(-2); break;
					case "u": t+=("00"+date.getMilliseconds()).slice(-3)+(date.millimills || "000"); break;
					case "A": t+=date.getHours()>11 ? "PM" : "AM"; break;
					case "a": t+=date.getHours()>11 ? "pm" : "am"; break;
					case "O": c=date.getTimezoneOffset(); t+=(c<0 ? "+" : "-")+("000"+(Math.floor(Math.abs(c)/60)*100+(Math.abs(c)%60))).slice(-4); break;
					default: t+=c;
				}
			}
			return t;
	}
}

// Actual stuff is done from here
addStyle("#pbhOptions {width: 400px; height: 400px;}\
.pbh-dialog {\
	position: fixed;\
	padding: 11px;\
	border: 1px solid #77f;\
	border-radius: 12px;\
	background-color: #ddf;\
	box-shadow: 0px 0px 16px gray;\
	z-index: 100;\
}\
.pbh-dialog-title {\
	background-color: #77f;\
	color: #eef;\
	font-weight: bold;\
	font-size: 125%;\
	padding: .1em 1em;\
	cursor: default;\
}\
.pbh-dialog-close {\
	position: absolute;\
	bottom: -1px;\
	right: -1px;\
	padding: 2px 5px;\
	background-color: #bbf;\
	border-bottom-right-radius: 12px;\
	border-top-left-radius: 12px;\
	color: #3f3fff !important;\
	display: inline-block;\
	border-width: 0px 1px 1px 0px;\
	border-style: solid;\
	border-color: #77f;\
}\
.pbh-dialog-close:hover {background-color: #ccf;}\
ul.pbh-dialog-tab-box {\
	margin: 11px -11px !important;\
	border-bottom: 1px solid #77f;\
	padding: 0px 11px;\
}\
.pbh-dialog-tab {\
	display: inline;\
	padding: 0px .5em;\
	border-color: #77f;\
	border-width: 1px 1px 0px;\
	border-style: solid;\
	border-top-left-radius: .5em;\
	border-top-right-radius: .5em;\
	background-color: #bbf; position: relative;\
	cursor: default;\
	margin-right: -1px\
}\
.pbh-dialog-tab.current {\
	background-color: #ddf;\
	padding-bottom: 1px;\
}\
.pbh-dialog-tab-content {display: none;}\
#fltComAut,#fltComWrd {width: 100%; box-sizing: border-box;}\
#pbhAbout {\
	text-align: center;\
	background: transparent url(http://img208.imageshack.us/img208/3075/pbhoptionsbg.png) no-repeat 100% 0px;\
	height: 330px;\
}\
.pbh-quote-button,.make-quote>span {\
	cursor: pointer;\
	margin: 0px .2em;\
	display: inline-block;\
	width: 16px;\
	height: 16px;\
	background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAALHRFWHRDcmVhdGlvbiBUaW1lAHZlbiAxNiBtYXIgMjAxMiAwMDo1MjoyNCArMDEwMMeFhJYAAAAHdElNRQfcAw8XNhQ8ROyPAAAACXBIWXMAAAsSAAALEgHS3X78AAAABGdBTUEAALGPC/xhBQAAAv1JREFUeNp1U1loU0EUPfPevCzN2qg1TbdY2rq0KhJ/XBtRQRRxo4p1Q0Xwz08/FL8UFERBxC8FEcEPQa20VlSoy4etWGmjIFpo7aKtaWLSpC95yVvGeRGlrXphYObM3HvP3HsuwRRjjBH8bSbGpgGE/DnTGc6k/cqxgDz6Yb3T7QoJksXOQV1OywPM4uio236op76+SZ0ZveD88trhcjX17XRFTbDZH5zvcPj8IKJUuNeyaRYfHda/DQ1FRkZiZ7adamnnLIxCANP50aXdDSUO/eHiVeEq6ppFIPALQeS8ickXMHQUCKoai/b3aZHut6c3nWy9aOYWt4YCRdLEhyfLw2trSJGFgCmcdBaMLxh8aRnzE3yf4eFyxOmSROt4Z7ir7WakpvHoJzry7s6OxlWLFkKYJImxNBxOikQyB3+JlWfnLLMD6O/pBVMVKEoOPk8O5UUxKaoVnwX62qmHyusctizUbAzRrxrmzLEi/SMPv5fCSEWAiV4kh1XIGQI1n4dQShGYp8NNE9WdD9pKqcQUXfv+CswXQDpKYSdWjA9GUeVKQdTHQHif3D4RntkCUimGkgDlxeU1EQXyQ865aEor6pCTA8fczq9YWicVaub3AKLI6YsMjAMVtbzf1ICuiaDc2UgTxPPeuD+4IC5Uhg+0DibdESJIzOLmD9wWWLwSBJcNxOUAcdohFdv53grJYwWRLBhP2owxuuQ2s5WPF9r47OrmhoD9fUttvT1IPXaiC6zABGY/2S/RCUwFywHx/qzxPDL3RcXqE3tXbGj+Tn7Lt+v2/jKW+XShtMzY6Q96rVKxi5iCMFQVhqKx5Fgc/Z9zscFE5fXaFQcvL1vTFDMlTabImNtd4emtjjpb/s25lVvqt8uJSfR0xd7nFHtnUvF2eyvDHRt3Hf/CHafJeZqxz4+sfY/DvemP24y2a43dT1tvVPME4v/eCzOBlvvn9ynxxLxXz+V7YlnTng1bjgxw2PhfgGnja35l+PVdLquML21pSIRCoezU0f2X/QS3PkyomipaUgAAAABJRU5ErkJggg==) no-repeat 50% 50%;\
}\
.show-spoilers-on-hover .spoiler-text:hover,.show-spoilers-on-click .spoiler-text.show {\
	background-color: transparent !important;\
	color: inherit !important\
}\
.thumbs-place-holder {\
	display: inline-block;\
	float: left;\
	width: 180px;\
	height: 180px;\
	border: 10px solid #99e;\
	margin: 0px 10px 20px;\
	border-radius: 40px;\
	text-align: center;\
	line-height: 180px;\
}\
.pbh-youtube-frame > iframe {\
	width: 560px;\
	height: 315px;\
	display: block;\
}\
.fit-image-width .comment-body img {max-width: "+(document.documentElement.clientWidth*.75)+"px}\
.pbh-menu-box {\
	border: 1px solid #77f;\
	background-color: #ddf;\
	box-shadow: 4px 4px 8px gray;\
	position: absolute;\
	top: 100%;\
	left: 0px;\
	padding: 5px;\
}\
.pbh-menu-box > a {\
	text-decoration: none;\
	color: black;\
	display: block;\
	background-color: transparent;\
	cursor: default\
}\
.pbh-menu-box > a:hover {background-color: #aae;}\
.pbh-menu-arrow {\
	display: inline-block;\
	width: 16px;\
	height: 16px;\
	background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAICAYAAADwdn+XAAAALHRFWHRDcmVhdGlvbiBUaW1lAG1lciAyOCBtYXIgMjAxMiAxNzo1NTo1OSArMDEwMAesyKYAAAAHdElNRQfcAxwQDSqGdPDoAAAACXBIWXMAAArwAAAK8AFCrDSYAAAABGdBTUEAALGPC/xhBQAAALNJREFUeNpjZMAB6uv/M337xjCHm5shEUgvvn+fIXH1asa/6OqY8GlWVGRIjIhgYFBSYogFsueHhv5nRlfLiEszUFOiszMDAzNQy79/DAx79zIw3LuH6RImXDbDNIMVAVU5OWF3CSM+m9EByCV79oBdsuLBA4YYkEuY0W12ccGuGWwb0DoFBQaGDx8YdIBcVSmphg3MyDbj0wz3MxPEkPfvGXT//2dQY8HmZ0IApA6kHggiAFgJVt0f+52KAAAAAElFTkSuQmCC) no-repeat 50% 50%;\
}\
.pbh-menu-box > .pbh-menu-arrow {\
	position: absolute;\
	left: -1px;\
	top: -12px;\
}\
.pbh-menu-box > .pbh-menu-arrow.middle-arrow {\
	margin-left: -8px;\
	left: 50%;\
}\
.pbh-menu-box > .pbh-menu-arrow.right-arrow {\
	right: -1px;\
	left: auto;\
}\
.thumb-size-tiny span.thumb,.thumb-size-tiny .thumbs-place-holder {\
	-webkit-transform: scale(.6);\
	-moz-transform: scale(.6);\
	-o-transform: scale(.6);\
	transform: scale(.6);\
	margin: -44px;\
}\
.thumb-size-tiny .thumbs-place-holder {margin: -44px -34px -24px;}\
.thumb-size-small span.thumb,.thumb-size-small .thumbs-place-holder {\
	-webkit-transform: scale(.8);\
	-moz-transform: scale(.8);\
	-o-transform: scale(.8);\
	transform: scale(.8);\
	margin: -22px;\
}\
.thumb-size-small .thumbs-place-holder {margin: -22px -12px -2px;}\
.thumb-size-big span.thumb,.thumb-size-big .thumbs-place-holder {\
	-webkit-transform: scale(1.3);\
	-moz-transform: scale(1.3);\
	-o-transform: scale(1.3);\
	transform: scale(1.3);\
	margin: 33px;\
}\
.thumb-size-big .thumbs-place-holder {margin: 33px 43px 53px;}\
.thumb-size-huge span.thumb,.thumb-size-huge .thumbs-place-holder {\
	-webkit-transform: scale(1.6);\
	-moz-transform: scale(1.6);\
	-o-transform: scale(1.6);\
	transform: scale(1.6);\
	margin: 66px;\
}\
.thumb-size-huge .thumbs-place-holder {margin: 66px 76px 86px;}\
.hidden.comment tr,.hide-warning {display: none;}\
.allow-show-banned .hidden.comment .hide-warning {display: table-row;}\
.comment-preview,.message-reply {\
	margin: .5em 0px .8em;\
	max-height: "+(document.documentElement.clientHeight*.75)+"px;\
	max-width: 750px;\
	overflow: auto;\
}\
.message-reply {max-height: "+(document.documentElement.clientHeight*.5)+"px;}\
.text-tool > span {\
	min-width: 16px;\
	display: inline-block;\
}\
.make-bold {font-weight: bold;}\
.make-italic {font-style: italic;}\
.make-underline > span {text-decoration: underline;}\
.make-strike-through > span {text-decoration: line-through;}\
.make-header1 > span {font-weight: bold;}\
.make-header2 > span {font-weight: bold; font-size: 11px; margin: 1px 0px;}\
.make-header3 > span {font-weight: bold; font-size: 10px; margin: 2px 0px 1px;}\
.make-link>span,.make-image>span,.make-quote>span,.make-spoiler>span,.make-ulist>span,.make-olist>span {\
	cursor: default;\
	margin: 0px;\
	display: inline-block;\
	width: 16px;\
	height: 16px;\
	vertical-align: -3px;\
}\
.make-link>span {\
	background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAK3RFWHRDcmVhdGlvbiBUaW1lAGx1biA3IG1hciAyMDExIDIyOjM1OjUwICswMTAwopACGgAAAAd0SU1FB9wEAhUoMJfI5yIAAAAJcEhZcwAACvAAAArwAUKsNJgAAAAEZ0FNQQAAsY8L/GEFAAADOklEQVR42mVT3Y8TVRT/3bnTaafTwu72c9digXUrWV1jwZrFBDHxA9DEKCQkEPgD/HgwMSYm6hMvIE9o0Bgf9EHjg/oqcV2NURN3JRi6aVgMLSy0pXXbCTvbzkzn4854p6tmAyf33Jt7c86Z8/ud3xDcZdOl/Vlj2xOnQunCs4SGE8NH21BZpzYvt/54p7L449+b48nmS/7QK+e2FF96neqqYNy+BnPgwHQACxKUiRxS23TP+P3Kh7W5j9+4uwDJv/jmXOr5Hc/QxRX4gwhsBpgu4N9fRvSRX6F3xxDJNCBor6J3wf/h+oVzzwWJNNhyTx59P3N8+iRR3obSmIHkyRCC0qIFun0JkfuaEGMafA9w6EXI43snZT0fXatX5kmpVMqu73+tEd9+hsZXiohrO3mQASN/Ge6OP+HqCshoB47tw+VwHO6uHYJ4+V0mX/w2S1nm4fdS0wf2RSoKFHsUSgjwFBWDZA3ejRmIU0vQynvgS32QkAWPd8H4JsXGhW6FEjr6+MsfRAhS1O4hxAHZE8swd38PQgicK7MwWuOwBhTyzmWeiKF7nB/X64PWSyMijSWy3oOfw770FEy48B/9DqLMQOLrEA9+BlEdwUiyBTcg1MeQh+BkAuclHB8XwRgYf/EcCl/WEBH43d0YjR82IaZ5WddH71YeujoGCCYQMhFOtnkxRmgst+skhNm0sxYwJAPxFoT42r9Yg3b94Bvc/WHrjfkj6F2fwVhKgXvNv0klwnKxmRP7+u1b8HwCtz4N80YBVjcJMVvbwM2CgVtoLzwNW9sQZyJyAL3K118KOYWddzt/MUeMQreBvkXQV9NYu7obJhdPgD2A1G/m0Lv5wDA5LEdBtSobEdbPCuVyuakvfHE2NVmEwQT0OZL/3FCTw+SgSLe8dyhcIgiYnCzgztI3H1Wr1eZQiX21+RO11FJmz+EptduB5TDwBTGucrLqYBbF6sIhSFIUhV0PQVv45Of21d+O/S/lwPR29SuptxJNTT02G00XBGa7MNppiBKDFN6KLewIEpLuaYufnm8t/xIk+/f8jYEVi8WJ2wP5rchE8QVRSWQIH7Grd1bNRnkuxlZP12q1+ub4fwCP2X7ZRES+lgAAAABJRU5ErkJggg==) no-repeat 50% 50%;\
}\
.make-image>span {\
	background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAB3RJTUUH3AQCFTAJStb3cwAAAAlwSFlzAAALEgAACxIB0t1+/AAAAARnQU1BAACxjwv8YQUAAAMASURBVHjanZNLSFRRGMf/955zn6P3Nk3OOJmP1DKHbBIrggzEqAh6QEWbyqAHtGjTLtpYmyBa9ICgoFW0SQgiKEIwMrOSHmKZ2MuZatRRZ5qHM+Pcmeu9nYmKICTowHc4i//v/53vfN8B/mPda6/Vfp3pXKJb7RvdoqjW2TZXlM9nY7OYGdxzujsVvORf92g4YTJJX0HH/Ql1tPtEt6vu8Cx1Hvk8afgrFro5WaD4NvoelpnLMfkFNRTEpmtDJ5jcLjD8L/jRxWZfZZW/X3MvuvwunF15u3uQm4glQEieiWbA85ZIqX7gy0vIP2GpwJHC1ntp+TLd9vZUPDMqYaRR1lSNZr8HJU4FRnIUVi6JjFUUwItwV3Aifr/tYKP2NRsYHx+HxTMrTnOW3lBUyRUtnka2nGcZMxB4A+Z0ALyVhCRaILPjL4xw3L9sl+eo5tT7zu7fffJHCa+vVLRKqtDkaPwKZScguA0QbgYwo0B+CiKDRclGiaNyGyl1OacteYOqEsgK3f7DQFbIWkGOw5I/QFDHIDlSrK40yxyHQHMQBQs51oXwneDdkcjUzalUNuPSeNg8pzNeoVkjI0ozGcTfliPOadBkDcVclsHs8WQKIqtwU8Fp0okdcoPCVVc6iCRziEa5YWbg4D+EyBCx47hvKjiVUPHGMEEFG5TkICkyBJGATnCI0TzN8xypKqUQHS57IFx0uzAGxDb0kablcpvP49GbixU0agL6IwvQMzoP9W4LkiQhJLdgODmJhqUWXKwzXX2Rm8fPdNxiBqNkKJQ0i5TF/UvKpN1LvZIYSmvY+2AzOoPzsbM+Dl3mMRDzYTb9BPXl1Lr7ON1x/Hz3VQZ/YpH4PYlrlnjX79vqObeiwbNqLGuSWlceNR4HhsMlePWl1MoEOwe6XqY6Ovs+PmPyQRaRv0aZLa3Kq61dXVfWUlvjXcRzvIB5vi0Pnz6/3tv7tHDlAIsxFua/PlzBWGo9du7Qqg07BnRdd84lnOs3FmbdeBdBIDUZbUkkErG5DL4DhXUahJIRqqYAAAAASUVORK5CYII=) no-repeat 50% 50%;\
}\
.make-ulist>span {\
	background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAK3RFWHRDcmVhdGlvbiBUaW1lAG1hciAzIGFwciAyMDEyIDAwOjEzOjE5ICswMTAwiHUpdAAAAAd0SU1FB9wEAhYPIFL8+3oAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAEZ0FNQQAAsY8L/GEFAAAAlElEQVR42mNgYGBgZ9BjYGLAARiB0hcYNBjWMIQCeXpAFio4DBL8D4S/wNxOMBsZ+jACDV/J4M/QytAIVKDMII9mwkUGqgBvhikMRrh9Ic1wF+iTR2DbUxnC0eRrWFC4ghiO5CRoBeWAGRhQqxiWAsmDQJ4wgxSDEAr8STCoWRhuMtwARtFGsIJtDG/QbLgOIvBGNwCf2CzdAwU38gAAAABJRU5ErkJggg==) no-repeat 50% 50%;\
}\
.make-olist>span {\
	background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAK3RFWHRDcmVhdGlvbiBUaW1lAG1hciAzIGFwciAyMDEyIDAwOjEzOjE5ICswMTAwiHUpdAAAAAd0SU1FB9wEAhYSJkTzMlMAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAEZ0FNQQAAsY8L/GEFAAAAyElEQVR42mNmYGDgZIhgkGe4xYAVsICxDYMUw2YgS49BA03+MIRyZ9gEpjsZ/qNBHxYU9bMYdqKZcBGi4BPDHTB9FwjJAfoMJxiOMcjg9oUQQwlDFYMBwxOGVIZwNPkakIL9DMkMfxi2A1mCwPBABZwgwpnhO8MEBifsVjACsSSDCpB8yPAImwImIH7LoM6gyfAStyMtGOSAgczCMI1BmEEATf45hIoCGm+CO6idGP4xrGPwYjjDsI3hDZoJ1xnAjpwBhFLY3QAAbjc0v+XA0A4AAAAASUVORK5CYII=) no-repeat 50% 50%;\
}\
.make-spoiler>span {background-color: black; border-radius: 3px;}\
input.delete-check {margin-left: .5em;}\
ul,ol {margin-left: 1.5em;}\
ac_results>ul {margin-left: 0px;}\
td > input[type=\"text\"],td > input[type=\"password\"],td > textarea {box-sizing: border-box;}\
textarea {font-size: 100%;}");

var main,images=[],comments=[],_page,wordban,authban,user=document.querySelector("a[href='/user_admin/login']") ? null : cookie("shm_user"),txtSelection;
var realUnsafe=typeof unsafeWindow==="undefined" ? window : (unsafeWindow.byId ? unsafeWindow : null);
function run_script() {
	document.removeEventListener("readystatechange",run_script);
	main=document.getElementById("\xa0main");

	var nb=document.getElementById("navbar");
	if (nb) {
		var li=document.createElement("li");
		li.innerHTML="<a class='tab' href='javascript:void(0)'>PBH Options</a>";
		li.firstChild.addEventListener("click",showOptions,false);
		nb.appendChild(li);
	}

	if (main) _page="board";
	if (/^\/user$/.test(location.pathname)) _page="self"; // Personal page
	if (/^\/user\//.test(location.pathname)) _page="user"; // User page
	if (/^\/post\/view\//.test(location.pathname)) _page="image"; // Image+comments page
	if (/^\/comment\/list/.test(location.pathname)) _page="comments"; // Comments page
	if (/^\/pm\/read\//.test(location.pathname)) _page="message"; // Reading message

	if (opts.hideBlot && cookie("blotter2-hidden")==="true") cookie("blotter2-hidden","true",365);
	if (opts.randomPie) startPinkiePie();

	document.body.addEventListener("click",removeMenuBoxes);
	document.body.addEventListener("mousedown",function(e) {
		var tgt=e.target;
		while (tgt) {
			if (isClass(tgt,"pbh-quote-button")) return e.preventDefault();
			if (isClass(tgt,"pbh-dialog")) // Some advanced & obscure JS here!
				return tgt.style.zIndex=Math.max.apply(null,[].map.call(this.querySelector(".pbh-dialog"),function(d) {return d!==tgt || getComputedStyle(d,null).zIndex;}))+10;
			tgt=tgt.parentNode;
		}
	},false);
	document.body.addEventListener("keyup",function(e) {
		var pok=opts.pbhOptKey;
		if (!pok) return;
		if (e.shiftKey!==(pok.indexOf("SHIFT+")!==-1) || e.ctrlKey!==(pok.indexOf("CTRL+")!==-1) || e.altKey!==(pok.indexOf("ALT+")!==-1)) return;
		var kc=pok.substring(pok.lastIndexOf("+")+1);
		if (kc.length===1) kc=kc.charCodeAt(0);
		else for (var kn in keyMap) if (keyMap[kn]===kc) {kc=kn; break;}
		if (kc!=e.keyCode) return;
		e.preventDefault();
		showOptions();
	},false);

	switch (_page) {
	case "self":
		var pms=document.getElementById("pms"),msgs=[];
		if (pms) {
			var rows=pms.getElementsByTagName("TR"),total=rows.length-1,read=pms.querySelectorAll("td > a > b").length;
			pms.parentNode.previousElementSibling.innerHTML+=" ("+(total-read)+" unread, "+total+" total)";
			[].forEach.call(rows,function(row) {
				var tds=row.getElementsByTagName("TD");
				if (!tds.length) { // Headers...
					var cell=document.createElement("TH");
					cell.innerHTML="Msg Id";
					row.insertBefore(cell,row.firstChild);
					return;
				}
				var subj=tds[0].textContent,from=tds[1].firstChild.innerHTML;
				var inps=tds[3].getElementsByTagName("INPUT"),id=inps[0].value,token=inps[1].value;
				var date=getDateFromDBTime(tds[2].innerHTML);
				if (date) tds[2].innerHTML=date=getDateString(date);
				else date=tds[2].innerHTML;
				var reply=document.createElement("button"),cell=document.createElement("TD"),delchk=document.createElement("input");
				cell.innerHTML=id;
				reply.innerHTML="Reply";
				reply.addEventListener("click",function(e) {
					e.preventDefault();
					var dlg=document.getElementById("replyTo"+id);
					if (dlg) return dlg.style.display="block";
					dlg=makeDialog("replyTo"+id,"Reply to "+from,"<table><tbody><tr><td>Message id:&nbsp;</td><td><strong>"+id
							+"</strong></td></tr><tr><td>Subject:</td><td><strong>"+subj+"</strong></td></tr><tr><td>Date/time:&nbsp;</td><td><strong>"+date
							+"</strong></td></tr></tbody></table><h3>Message <span class=\"pbh-quote-button\" title=\"Quote "+from+"'s message\"></span></h3>"
							+"<div class=\"message-reply\"><em>Loading message...</em></div><table style=\"width: 750px;\"><tbody>"
							+"<tr><td>Subject:</td><td><input type=\"text\" value=\"Re: "+subj.replace(/^(?:Re: )+/,"")+"\"></td></tr>"
							+"<tr><td colspan=\"2\"><textarea style=\"width: 100%\" rows=\"8\"></textarea></td></tr></tbody></table>"
							+"<button disabled=\"disabled\">Loading data...</button> <button>Preview message</button>");
					var btns=dlg.querySelectorAll("button"),qok,ta=dlg.getElementsByTagName("TEXTAREA")[0],toid;
					extendTextArea(ta);
					function retr_msg(retry) {
						httpRequest({method: "GET", url: "/pm/read/"+id, onload: function(ajax) {
							if (ajax.status!==200) {
								if (retry<3) retr_msg(retry+1);
								else dlg.getElementsByClassName("message-reply")[0].innerHTML="<em>Couldn't load the message!</em>";
								return;
							}
							var i1=ajax.responseText.indexOf("Messagemain"),i2=ajax.responseText.indexOf("</div>",i1);
							qok=dlg.getElementsByClassName("message-reply")[0].innerHTML=ajax.responseText.substring(i1+13,i2);
							var i1=ajax.responseText.indexOf("to_id");
							if (i1!==-1) toid=parseInt(ajax.responseText.substring(i1+14,i1+22));
							btns[0].disabled=false;
							btns[0].innerHTML="Send message";
							setPosition(dlg,.5,.5);
						}});
					}
					retr_msg(0);
					dlg.getElementsByTagName("SPAN")[0].addEventListener("click",function() { // Quote message
						if (!qok) return;
						var addtxt="[quote="+from+"]"+htmlToBBCode(qok)+"[/quote]\r\n",ss=ta.selectionStart,se=ta.selectionEnd;
						ta.value=ta.value.substring(0,ss)+addtxt+ta.value.substring(ss);
						ta.selectionStart=ss+addtxt.length;
						ta.selectionEnd=se+addtxt.length;
					},false);
					btns[0].addEventListener("click",function() { // Send message
						var that=this;
						this.disabled=true;
						this.innerHTML="Sending message...";
						httpRequest({method: "POST", url: "/pm/send", data: "auth_token="+token+"&to_id="+toid+"&subject="+escplus(dlg.getElementsByTagName("INPUT")[0].value)
								+"&message="+escplus(ta.value), onload: function(ajax) {
							if (ajax.status==200) {
								document.body.removeChild(dlg);
								var pdlg=document.getElementById("replyTo"+id+"_preview");
								if (pdlg) document.body.removeChild(pdlg);
							} else {
								alert("An error occurred sending the message:\n"+ajax.status+" "+ajax.statusText);
								that.disabled=false;
								that.innerHTML="Send message";
							}
						},headers: {"Content-Type": "application/x-www-form-urlencoded"}});
					},false);
					btns[1].addEventListener("click",createPreviewBox("replyTo"+id+"_preview",ta),false);
					dlg.lastChild.addEventListener("click",function() {
						var pdlg=document.getElementById("replyTo"+id+"_preview");
						if (pdlg) pdlg.style.display="none";
					});
					ta.focus();
				},false);
				tds[3].firstChild.appendChild(reply);
				delchk.type="checkbox";
				delchk.id="deleteMessage"+id;
				delchk.className="delete-check";
				tds[3].firstChild.appendChild(delchk);
				row.insertBefore(cell,row.firstChild);
				msgs.push({row: row, date: date, from: from, subject: subj, id: id, token: token, check: delchk});
			});
			if (msgs.length) {
				var delcom=document.createElement("button");
				delcom.innerHTML="Delete selected messages";
				delcom.addEventListener("click",function() {
					var dlg=document.getElementById("delMessages");
					if (dlg) document.body.removeChild(dlg);
					var chkmsg=msgs.filter(function(m) {return m.check.checked;});
					if (!chkmsg.length) return makeDialog("delMessages","Delete messages","No messages selected");
					dlg=makeDialog("delMessages","Delete messages","The following messages are going to be deleted:<br/><table><thead>"
							+"<tr><th>From</th><th>Date</th><th>Subject</th></tr></thead><tbody>"
							+chkmsg.map(function(m) {return "<tr><td>"+m.from+"</td><td>"+m.date+"</td><td>"+m.subject+"</td></tr>";}).join("")
							+"</tbody></table>This operation is irreversible: closing this window or reloading the page won't help.<br/>Are you sure? <button>Yes</button>");
					var conf=dlg.getElementsByTagName("BUTTON")[0];
					conf.addEventListener("click",function() {
						this.disabled=true;
						this.innerHTML="Deleting messages...";
						var num=chkmsg.length;
						chkmsg.forEach(function(m) {
							httpRequest({method: "POST", url: "/pm/delete", data: "pm_id="+m.id+"&auth_token="+m.token, onload: function(ajax) {
								if (ajax.status!==200) return;
								m.row.parentNode.removeChild(m.row);
								if (--num===0) document.body.removeChild(dlg);
							},headers: {"Content-Type": "application/x-www-form-urlencoded"}});
						});
					});
				});
				pms.parentNode.appendChild(delcom);
			}
		}
	case "user":
		var stat=document.getElementById("Statsmain");
		if (stat) {
			var jd=stat.firstChild,date,usr,coml;
			if (jd.nodeType===3 && jd.nodeValue.substring(0,11)==="Join date: ") {
				date=getDateFromDBTime(jd.nodeValue.substring(11));
				jd.nodeValue="Join date: "+getDateString(date);
			}
			if ((jd=stat.childNodes[2]).nodeType===3) {
				usr=location.pathname.substring(6) || user;
				coml=document.createElement("a"); 
				coml.href="/post/list/commented_by="+usr+"/1";
				coml.appendChild(document.createTextNode("Comments made"));
				stat.insertBefore(coml,jd);
				jd.nodeValue=jd.nodeValue.substring(13);
			}
		}
	case "message":
		var ta=document.getElementsByName("message")[0];
		if (ta) {
			var smb=document.body.querySelector("input[type='submit']"),pvcom=document.createElement("button");
			extendTextArea(ta);
			smb.value="Send message";
			smb.style.width="auto";
			pvcom.innerHTML="Preview message";
			pvcom.addEventListener("click",createPreviewBox("commentPreview",ta),false);
			smb.parentNode.appendChild(pvcom);
		}
		break;
	case "board":
		resizeThumbnails();
		overloadPage();
		addEventListener("hashchange",function() {
			var mtc=location.pathname.match(/(\/post\/list(?:\/[^\/]+)?\/)(\d+)$/);
			var cpage=mtc ? mtc[2]-0 : 1,path=mtc ? mtc[1] : "/post/list/";
			var vpage=Math.floor((cpage-1)/opts.multiPage)+1,rest=(cpage-1)%opts.multiPage;
			var m=location.hash.match(/^#page-(\d+)(?:\+(\d)\/(\d))?$/);
			if (!m || (m[3] && m[3]!=opts.multiPage)) location.hash="#page-"+vpage+(rest ? "+"+rest+"/"+opts.multiPage : "");
			else if (m[1]!=vpage || (m[2] && m[2]!=rest))
				location.href=path+(((m[1]-1)*opts.multiPage+1)+(m[2] ? m[2]-0 : 0))+"#page-"+m[1]+(m[2] ? "+"+m[2]+"/"+opts.multiPage : "");
		});
		break;
	case "image":
		var btn=document.createElement("button"),cmain=document.getElementById("Commentsmain");
		btn.innerHTML="Reload";
		btn.addEventListener("click",function() {
			var that=this;
			this.innerHTML="Reloading...";
			this.disabled=true;
			function do_reload(tries) {
				httpRequest({method: "GET", url: location.href, onload: function(ajax) {
					if (ajax.status!==200) {
						if (tries<3) return do_reload(tries+1);
						that.disabled=false;
						that.innerHTML="Couldn't reload!";
						return;
					}
					checkCommentPageStub(ajax.responseText);
					that.disabled=false;
					that.innerHTML="Reload";
				}});
			}
			do_reload(0);
		},false);
		cmain.parentNode.insertBefore(btn,cmain);
		function prevent_reload(form,txt,cback) {
			if (!form) return;
			var subm=form.querySelector("input[type='submit']");
			form.addEventListener("submit",function(e) {
				var otxt=subm.value;
				e.preventDefault();
				subm.disabled=true;
				subm.value=txt;
				httpRequest({method: "POST", url: this.action,
						data: [].map.call(this.elements,function(e) {return e.name ? "&"+e.name+"="+escplus(e.value) : "";}).join("").substring(1),
						onload: function(ajax) {
					if (ajax.status!=200) location.reload();
					subm.disabled=false;
					subm.value=otxt;
					checkCommentPageStub(ajax.responseText);
					if (typeof cback==="function") cback(ajax);
				},headers: {"Content-Type": "application/x-www-form-urlencoded"}});
			},false);
		}
		prevent_reload(cmain.querySelector("form"),"Posting Comment...",function() {
			var pdlg=document.getElementById("commentPreview");
			if (pdlg) document.body.removeChild(pdlg);
			cmain.getElementsByTagName("TEXTAREA")[0].value="";
		});
		[].forEach.call(document.body.querySelectorAll("form[action='/numeric_score_vote']"),function(f) {
			prevent_reload(f,({up: "Voting up...", "null": "Removing vote...", down: "Voting down..."})[f.elements[2].value]);
		});
		var form=document.body.querySelector("form[action='/change_favorite']");
		form && prevent_reload(form,{toString: function() {return form.elements[3].value.slice(0,-1)+"ing...";}});
		prevent_reload(document.body.querySelector("form[action='/image_report/add']"),"Reporting...");
	case "comments":
		wordban=getWordFilter();
		authban=" "+opts.fltComAut.toLowerCase()+" ";
		if (wordban instanceof Error) wordban="";
		[].forEach.call(document.body.querySelectorAll(_page==="image" ? "#Commentsmain" : "#\\A0 main>table>tbody>tr>td+td"),manageComments);
		setClass("body","show-spoilers-on-"+opts.shwComSpl);
		if (opts.fitComImg) setClass("body","fit-image-width");
		if (opts.letShwCom) setClass("body","allow-show-banned");
		document.getElementById("body").addEventListener("click",function(e) {
			var tgt=e.target;
			while (tgt!==this) {
				if (isClass(tgt,"spoiler-text"))
					return toggleClass(tgt,"show");
				tgt=tgt.parentNode;
			}
		});
		limitCommentImages();
		embedYoutubeLinks();
		break;
	}
	[].forEach.call(document.getElementsByTagName("A"),checkLink);
	document.addEventListener("DOMNodeInserted",function(e) {
		if (e.target.nodeType!==1) return;
		if (e.target.tagName==="A") checkLink(e.target);
		else [].forEach.call(e.target.getElementsByTagName("A"),checkLink);
	},false);
}
if (document.readyState==="interactive" || document.readyState==="complete") run_script();
else document.addEventListener("readystatechange",run_script,false);