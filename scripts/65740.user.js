// ==UserScript==
// @name           LepraNewCommentsImproved
// @namespace      leprosorium.ru
// @include        *leprosorium.ru/comments/*
// @include        *leprosorium.ru/asylum/*
// @include        *leprosorium.ru/my/inbox/*
// ==/UserScript==
if(document.URL.match(/^http:\/\/([a-zA-Z0-9\.]+)?leprosorium\.ru\/comments\/(\d+)\#?.*$/)) {
	var post_number=document.URL.match(/^http:\/\/([a-zA-Z0-9\.]+)?leprosorium\.ru\/comments\/(\d+)\#?.*$/)[2];
} else if(document.URL.match(/^http:\/\/([a-zA-Z0-9\.]+)?leprosorium\.ru\/my\/inbox\/(\d+)\#?.*$/)) {
	var post_number=document.URL.match(/^http:\/\/([a-zA-Z0-9\.]+)?leprosorium\.ru\/comments\/(\d+)\#?.*$/)[2];
} else var post_number=-1;
var css = "\
	.lc-next-block { \
		position: fixed; \
		top: 90px; \
		right: 0px; \
		z-index: 100; \
	} \
	.lc-next-block span { \
		display: block; \
		color: #ccc; \
		border: 1px solid #ccc; \
		padding: 5px 10px; \
		margin-bottom: 1px; \
		font-size: 75%; \
		cursor: pointer; \
	} \
	.lc-next-block span:hover { \
		color: #000; \
		border: 1px solid #000; \
	} \
";
var script = document.createElement("script");
	script.type = "application/javascript";
	script.innerHTML = "if (!this.GM_getValue || this.GM_getValue.toString().indexOf(\"not supported\")>-1) {\
    this.GM_getValue=function (key,def) {\
        return localStorage[key] || def;\
    };\
    this.GM_setValue=function (key,value) {\
        return localStorage[key]=value;\
    };\
	}\
	var unsafeWindow = this['unsafeWindow'] || window; \
var pp = document.getElementsByTagName(\"DIV\");            \
var newpp = [];                                               \
var currentPost = -1;                                          \
var maxPost = -1;                                               \
var post_number="+post_number+";                                                                                            \
var css = \""+css+"\";                                                                                                                               \
                                                                                                                                   \
                                                                                                                                   \
var ppLength = pp.length;                                                                                                           \
for(var i = 0; i < ppLength; i++) {                                                                                                  \
	if(pp[i].className.indexOf(\"new\") != -1) {                                                                                  \
		newpp.push(pp[i]);                                                                                                     \
		if(pp[i].id>maxPost)  maxPost=pp[i].id;                                                                                 \
	}                                                                                                                                \
}                                                                                                                                         \
function InitializeNavLink() {                                                                                                             \
	if(post_number>0) {                                                                                                                 \
		var navBlock = document.createElement(\"DIV\");                                                                              \
		navBlock.className = \"lc-next-block\";                                                                                       \
		                                                                                                                               \
		navLinkNext = document.createElement(\"SPAN\");                                                                                 \
		navLinkNext.appendChild(document.createTextNode(\"↓\"));                                                                           \
		navLinkNext.addEventListener(\"click\", NextNewComment, false);                                                                   \
		                                                                                                                                   \
		navLinkReload = document.createElement(\"SPAN\");                                                                                   \
		navLinkReload.appendChild(document.createTextNode(\"обновить комментарии\"));                                                        \
		navLinkReload.addEventListener(\"click\", ReloadNewComment, false);                                                                   \
		                                                                                                                                       \
		navLinkPrev = document.createElement(\"SPAN\");                                                                                         \
		navLinkPrev.appendChild(document.createTextNode(\"↑\"));                                                                                 \
		navLinkPrev.addEventListener(\"click\", PrevNewComment, false);                                                                           \
		                                                                                                                                           \
		navBlock.appendChild(navLinkPrev);                                                                                                          \
		navBlock.appendChild(navLinkReload);                                                                                                         \
		navBlock.appendChild(navLinkNext);                                                                                                            \
		document.body.appendChild(navBlock);                                                                                                           \
		var controls = document.evaluate(\"div[@class='header']\", document.getElementById('comments-form'), null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);\
	                                                                                                                                                                  \
		if(controls.snapshotLength > 0) {                                                                                                                          \
			comm = controls.snapshotItem(0);                                                                                                                    \
		}                                                                                                                                                            \
	}	 else comm = document.getElementById('wysiwyg_tools');                                                                                                        \
                                                                                                                                                                               \
	if(comm) {                                                                                                                                                              \
		navLinkStrike = document.createElement(\"A\");                                                                                                                   \
		navLinkStrike.innerHTML =\"&#822;S&#822;t&#822;r&#822;i&#822;k&#822;e&#822;\";                                                                                    \
		navLinkStrike.href = 'javascript:void(0);';                                                                                                                        \
		navLinkStrike.addEventListener(\"click\", strikeText, false);                                                                                                       \
		comm.appendChild(navLinkStrike);                                                                                                                                     \
	}                                                                                                                                                                             \
}                                                                                                                                                                                      \
                                                                                                                                                                                       \
function strikeText() {                                                  \
 var txtarea = document.getElementById(\"comment_textarea\") || document.getElementById(\"textarea2\");                  \
 txtarea.focus();                                                         \
 var scrtop = txtarea.scrollTop;                                                \
 var cursorPos = unsafeWindow.getCursor(txtarea);    \
 var txt_pre = txtarea.value.substring(0, cursorPos.start);   \
 var txt_sel = txtarea.value.substring(cursorPos.start, cursorPos.end);    \
 var txt_aft = txtarea.value.substring(cursorPos.end);             \
 if (cursorPos.start == cursorPos.end){                              \
 var nuCursorPos = cursorPos.start + 6;                               \
	 txt_sel='̶';                                                  \
 }else{                                                                 \
	 var str = '̶';                                                  \
	 for(var i=0;i<txt_sel.length;i++)                                \
	 	str += txt_sel[i] + '̶';                                   \
	 txt_sel = str;                                                     \
	 var nuCursorPos=String(txt_pre + txt_sel).length;                   \
 }            \
 txtarea.value = txt_pre + txt_sel + txt_aft;                                  \
 unsafeWindow.setCursor(txtarea,nuCursorPos,nuCursorPos);                       \
 if (scrtop) txtarea.scrollTop=scrtop;                                            \
}                  \
function ReloadNewComment() {        \
	currentPost = -1;\
	var ppLength = pp.length;\
	for(var i = 0; i < ppLength; i++) {\
		if(pp[i].className.indexOf(\"new\") != -1) {\
			pp[i].className = pp[i].className.replace('new','');\
		}           \
	}     \
	newpp = [];           \
	unsafeWindow.commentsHandler.refreshAll(post_number,{button:navLinkReload});\
}                \
function reInitNewComments() {      \
	pp = document.getElementsByTagName(\"DIV\");                                  \
	var ppLength = pp.length;     \
	for(var i = 0; i < ppLength; i++) {                                             \
		if(pp[i].className.indexOf(\"new\") != -1 && pp[i].id > maxPost) {       \
			newpp.push(pp[i]);                                                \
			maxPost = pp[i].id;                                                \
		}           \
	}                    \
}                              \
function NextNewComment() {      \
	reInitNewComments();      \
	currentPost++;             \
	if(currentPost >= newpp.length) {          \
		currentPost = newpp.length - 1;     \
	}                             \
	if(newpp[currentPost])         \
		window.location.hash = newpp[currentPost].id;                   \
}                                        \
function PrevNewComment() {                \
	reInitNewComments();                \
	currentPost--;                      \
	if(currentPost < 0) {                \
		currentPost = 0;              \
	}                                      \
	if(newpp[currentPost])                \
		window.location.hash = newpp[currentPost].id; \
}                                               \
style = document.createElement(\"STYLE\");        \
style.type = \"text/css\";                   \
style.innerHTML = css;                             \
document.body.appendChild(style);                   \
InitializeNavLink();\
delete pp;                                            \
delete style;";

document.body.appendChild(script);
