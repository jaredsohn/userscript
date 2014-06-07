// ==UserScript==
// @name		Lifting copy-protected on every 'copy-protected' website
// @description		Makes it possible to quarrycrusher.com, the site is copy-protected
// ==/UserScript==
setTimeout("document.oncontextmenu=null;document.ondragstart=null;document.onkeydown=null;document.onmousedown=null;document.onmousemove=null;document.onmouseup=null;document.onselectstart=null;document.body.oncontextmenu=null;document.body.ondragstart=null;document.body.onkeydown=null;document.body.onmousedown=null;document.body.onmousemove=null;document.body.onmouseup=null;document.body.onselectstart=null;window.oncontextmenu=null;window.ondragstart=null;window.onkeydown=null;window.onmousedown=null;window.onmousemove=null;window.onmouseup=null;window.onselectstart=null;window.onbeforeprint=null;",500);
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
addGlobalStyle("html,body {display:block;-moz-user-select: text !important; -khtml-user-select: text !important;-webkit-user-select:text !important;user-select: text !important;} #GlobalDiv{width:100%; position:fixed; font-size:12px !important; border:1px solid #999; background:#CCC; left:0;top:0; padding:10px; z-index:99999;opacity:0.8; text-align:left !important;}#GlobalDiv span{ font-weight:bold; margin-right:5px;}#GlobalDiv:hover{opacity:1}");

function addGlobalDiv(html){
	var _body, _html;
	_body = document.getElementsByTagName('body')[0];
	//if (!body) { return; }
	_html = document.createElement('div');
	_html.id = "GlobalDiv";
	_html.innerHTML = html;
	_body.appendChild(_html);
	
}

meta = document.getElementsByTagName("meta");
var metaHtml="", info="", keyInfo="";
for(i=0;i<meta.length;i++)
{
	metaHtml = meta[i].getAttribute("name");
	if(metaHtml=="description"){
		info = "<span>Description:</span> " + meta[i].getAttribute("content");
	}
	if(metaHtml=="keywords"){
		keyInfo = "<span>Keywords:</span> " + meta[i].getAttribute("content");
	}
}
var title=document.title;
addGlobalDiv("<span>Title:</span> "+title+" -- "+keyInfo+"<br />"+info);
var divHeight = document.getElementById("GlobalDiv").offsetHeight+"px";
addGlobalStyle("body{padding-top:"+divHeight+"}");

