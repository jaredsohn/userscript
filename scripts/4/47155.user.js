// ==UserScript==
// @name           Userscripts.org Quick Quote
// @namespace      http://userscripts.org/users/23652
// @description    Adds a quote button under usernames, even has selection quoting and nested quotes
// @include        http://userscripts.org/topics/*
// @include        https://userscripts.org/topics/*
// @copyright      JoeSimmons
// @version        1.1.3
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// @require        http://usocheckup.redirectme.net/47155.js
// @require        http://userscripts.org/scripts/source/51532.user.js
// @grant          GM_getValue
// @grant          GM_log
// @grant          GM_openInTab
// @grant          GM_registerMenuCommand
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// ==/UserScript==

// Create by avg, modified by JoeSimmons
function create(a,b) {
	if(!a || a=="" || !b) return;
	var ret=document.createElement(a);
	for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(prop=="kids" && (prop=b[prop])) for each(var p in prop) ret.appendChild(p);
		else if(/^(style|accesskey|id|name|src|href)$/.test(prop)) ret.setAttribute(prop, b[prop]);
		else ret[prop]=b[prop];
	return ret;
}

function selectHTML() {
  var sel = window.getSelection(), html = "";
  for (var i=0,l=sel.rangeCount; i<l; i++) {
    var d = document.createElement("span"),
		r = sel.getRangeAt(i),
		parent_element = r.commonAncestorContainer,
		prev_html = parent_element.innerHTML;
    r.surroundContents(d);
    html += d.innerHTML;
    parent_element.innerHTML = prev_html;
  }
  return html;
}

function getPoster(e) {
var html = e.innerHTML.replace(/\n/g,"");
return {href:html.match(/^.+(https?\:\/\/userscripts\.org\/users\/[^"]+)/)[1], name:html.match(new RegExp($g(nestedposter["href"]+"\">([^<]+)<\/a>")))[1]};
}

function getPostID(e) {
var p = e.currentTarget || e.focusNode || e;
while((p=p.parentNode)!=null) if(p.id && (p.id.indexOf("post-body-")==0||p.id.indexOf("row-")==0)) return p.id.match(/^(post-body|row)-(\d+)$/)[2];
}

function quote(e) {
//try {
var box, post, id=getPostID(e), url=window.location.href.replace(/#.*$/,""),
	body = $g("#post-body-"+id),
	select=window.getSelection(),
	inpost=false;
	
	// Check if selection is inside a post
	if(select.focusNode && select.toString().length>0) {
	var tag=select.focusNode.parentNode, p=select.focusNode;
	while((p=p.parentNode)&&!inpost) if(p.id&&p.id.indexOf("post-body-")==0) inpost=true;
	}

	if(inpost) {
	post = selectHTML().replace(/^(<p>\s*<\/p>)/g,"").replace(/^(\s*<br>\s*)*\s*/,"").replace(/^\s*/,"");
	tag = tag.tagName.toLowerCase();
	if(select.focusNode.textContent.indexOf(" wrote:")!=-1 && tag=="blockquote") {
	var nestedposter = getPoster(select.focusNode);
	post = "<blockquote><strong><a href=\""+nestedposter["href"]+"\">"+nestedposter["name"]+"</a></strong> wrote:<br>"+post+"</blockquote>";
	}
	else if(!/(t[dr]|table|a|li|[ou]l|big)/.test(tag)) post = "<"+tag+">"+post+"</"+tag+">";
	}
	else if(select.toString().length==0) post = body.innerHTML;
	else return;

	poster = $g(".//span/a[starts-with(@href, '/users/')]", {type:9, node:$g("#row-"+id)});
if($g("#edit_post_body") && $g("#edit").offsetWidth>0) box=$g("#edit_post_body");
else {
box=$g("#post_body");
if($g("#reply").style.display=="none") {
box.value="";
$g("#reply").style.display = "";
}
}
var post = "<blockquote><strong><a href=\""+poster.href+"\">"+poster.textContent+"</a></strong> <a href=\""+url+"#row-"+id+"\"> wrote</a>:<br>" + post.replace(/^[\s\w\D]*<!--[\s\w\D]*-->/, "").replace(/(<br>*)*\s*/,"").replace(/\n/g,"<br>").replace(/ {2,}/g," ").replace(/<br> <br>/g,"<br>").replace(/<br>\s*$/,"").replace(/<br>\s/g,"<br>").replace(/\<\/?p\>/g,"").replace(/<\/a> <a/,"</a>&nbsp;<a") + "</blockquote>\n";
if(box && box.value=="") box.value = post;
else if(box) {
box.value = box.value.replace(/\n+$/,"");
box.value += "\n"+post;
}
box.focus();
box.scrollTop = box.scrollHeight;
//} catch(e) {}
}

var posts = $g(".//td[@class='author vcard']", {node:$g("#container")});
for(var i=0,post; (post=posts.snapshotItem(i)); i++) post.appendChild(create("a", {href:"javascript:void(0);",style:"display:block;",textContent:"Quote",onclick:quote}));