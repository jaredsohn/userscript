// ==UserScript==
// @name           Ultimate-Guitar.com Posting Add-on
// @namespace      http://userscripts.org/users/23652
// @description    Adds features like the ability to have a button to add certain links to posts
// @include        http://www.ultimate-guitar.com/forum/showthread.php*t=*
// @include        http://www.ultimate-guitar.com/forum/showthread.php*p=*
// @include        http://www.ultimate-guitar.com/forum/newreply.php?do=newreply*
// @include        http://www.ultimate-guitar.com/forum/editpost.php*
// @copyright      JoeSimmons
// @version        1.0.3
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// @require        http://userscripts.org/scripts/source/51532.user.js
// ==/UserScript==

/////////////////////////////////////////////////////////////////////////////
// LINKS SECTION
// FORMAT: {text:"LINK TEXT", url:"LINK URL"};
var links = {
1 : {text:"The Crusade", url:"http://www.ultimate-guitar.com/search.php?s=Crusade&w=columns"},
2 : {text:"Music Theory FAQ", url:"http://www.ultimate-guitar.com/forum/showthread.php?t=503032"},
3 : {text:"The Guide To All Techniques", url:"http://www.ultimate-guitar.com/forum/showthread.php?t=1091796"},
4 : {text:"The Ultimate Guide To Guitar", url:"http://www.ultimate-guitar.com/search.php?s=The+Ultimate+Guide+To+Guitar&w=columns"},
5 : {text:"Freepower's video lessons", url:"http://www.youtube.com/view_play_list?p=FA239CA8EF73CEC9"},
6 : {text:"Ultimate Exercises Thread", url:"http://www.ultimate-guitar.com/forum/showthread.php?t=1091788"}
};
/////////////////////////////////////////////////////////////////////////////


// $g by JoeSimmons. Supports ID, Class, and XPath (full with types) in one query
// Supports multiple id/class grabs in one query (split by spaces), and the ability to remove all nodes regardless of type
// See script page for syntax examples: http://userscripts.org/scripts/show/51532
function $g(que, obj) {
if(!que || !(que=que.replace(/^\s+/,''))) return;
var obj=(obj?obj:({del:false,type:6,node:document})), r,
	class_re=/^\.[A-Za-z0-9-_]/, id_re=/^\#[^\s]/, xp_re=/^\.?(\/\/|count|id)\(?[A-Za-z0-9\'\"]/;
if(!que || typeof que!='string' || que=='') return false;
else if(id_re.test(que)) {
var s=que.split(' '), r=new Array();
for(var n=0;n<s.length;n++) r.push(document.getElementById(s[n].substring(1)));
if(r.length==1) r=r[0];
} else if(xp_re.test(que)) {
r = document.evaluate(que,(obj['node']||document),null,(obj['type']||6),null);
switch((obj['type']||6)){case 1:r=r.numberValue;break;case 2: r=r.stringValue;break;case 3:r=r.booleanValue;break;case 8:case 9:r=r.singleNodeValue;break;}
} else if(class_re.test(que)) {
var expr='', s=que.split(' ');
for(var n=0;n<s.length && s[n].indexOf('.')==0;n++) expr+="@class='"+s[n].substring(1)+"' or ";
r = document.evaluate("//*["+expr.replace(/( or )$/,'')+"]",document,null,6,null);
if(r.snapshotLength==1) r=r.snapshotItem(0);
} else return null;
if(obj['del']===true && r) {
if(r.nodeType==1) r.parentNode.removeChild(r);
else if(r.snapshotItem) for(var i=r.snapshotLength-1; (item=r.snapshotItem(i)); i--) item.parentNode.removeChild(item);
else if(!r.snapshotItem) for(var i=r.length-1; i>=0; i--) if(r[i]) r[i].parentNode.removeChild(r[i]);
} else return r;
}

// Create by avg, modified by JoeSimmons
function create(a,b) {
	var ret=document.createElement(a);
	if(b) for(var prop in b) {
		if(prop.indexOf('on')==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(prop=="kids" && (prop=b[prop])) {
			for(var i=0;i<prop.length;i++) ret.appendChild(prop[i]);
		}
		else if('style,accesskey,id,name,src,href,class'.indexOf(prop)!=-1) ret.setAttribute(prop, b[prop]);
		else ret[prop]=b[prop];
	}  return ret;
}

// addGlobalStyle
function addGlobalStyle(css) {
	if(typeof GM_addStyle=='function') GM_addStyle(css);
    else if((head=document.getElementsByTagName('head')[0])) {
    var style = document.createElement('style');
    style.setAttribute('type', 'text/css');
	style.innerHTML=css;
    head.appendChild(style);
	}
}

function addLink(e) {
e.preventDefault();
var msg = $g("#qr_message") || $g("#message");
msg.value += (!/\n$/.test(msg.value)?"\n":"")+"[url="+e.currentTarget.href+"]"+e.currentTarget.textContent+"[/url]";
msg.focus();
msg.scrollTop = msg.scrollHeight;
}

addGlobalStyle('#extraLinks:hover #extraLinks_drop {display:block;} #extraLinks #extraLinks_drop {display:none;} #extraLinks_drop span {display:block;}');

window.addEventListener('load', function(){
var url = window.location.href||"", drop, bar, links_box=create('div', {id:'extraLinks',style:'cursor:pointer;font:13px arial tahoma bold;padding:4px;',kids:new Array(
document.createTextNode('» Extra Links'),
(drop=create('div', {id:'extraLinks_drop',style:'padding:10px; margin-top:2px; border:1px solid #222; -moz-border-radius:4px;'}))
)});
if(url.indexOf("showthread.php")!=-1) bar=$g(".//table[1]/tbody[1]/tr[1]", {type:9, node:$g("#controlbar")});
else if(url.indexOf("newreply.php")!=-1) bar=$g("#controlbar");
else if(url.indexOf('editpost.php')!=-1) bar=$g(".//div[3]", {type:9, node:$g("#controlbar")});

for(var u in links) {
drop.appendChild(create('span', {style:"padding-left:4px;",kids:new Array(create('a', {textContent:links[u].text,href:links[u].url,style:"font-size:11px;font-family:tahoma arial;",onclick:function(e){addLink(e);}}))}));
}
bar.appendChild(links_box);
}, false);