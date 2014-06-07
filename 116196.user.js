// ==UserScript==
// @name           Facebook Ignore All Requests
// @namespace      http://userscripts.org/users/413570
// @description    Ignore all requests with a single click, or pick which application you'd like to ignore
// @include        http://www.facebook.com/*
// @copyright      Ardik Didianto
// @version        1.0.9
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// @require        http://userscripts.org/users/413570
// ==/UserScript==

try {
var unsafeWindow = unsafeWindow || window.wrappedJSObject || window;
if(unsafeWindow.frameElement != null || top.location != location || location.find("ai.php")) return;
} catch(e) {}

var enableInGalleries = false; // for fb url cleaner

String.prototype.find = function(s) {
return (this.indexOf(s) != -1);
};

// Click by JoeSimmons
// Syntax: click(element); // String argument will grab it by id, or you can supply an element
function click(e, type) {
if(!e && typeof e=='string') e=document.getElementById(e);
if(!e) return;
var evObj = e.ownerDocument.createEvent('MouseEvents');
evObj.initMouseEvent("click",true,true,e.ownerDocument.defaultView,0,0,0,0,0,false,false,false,false,0,null);
e.dispatchEvent(evObj);
}

// $g by Ardik. Supports ID, Class, and XPath (full with types) in one query
// Supports multiple id/class grabs in one query (split by spaces), and the ability to remove all nodes regardless of type
// See script page for syntax examples: http://userscripts.org/users/413570
function $g(que, O) {
if(!que||typeof(que)!='string'||que==''||!(que=que.replace(/^\s+/,''))) return false;
var obj=O||({del:false,type:6,node:document}), r, t,
	idclass_re=/^[#\.](?!\/)[^\/]/, xp_re=/^\.?(\/{1,2}|count|id)/;
if(idclass_re.test(que)) {
var s=que.split(' '), r=new Array(), c;
for(var n=0; n<s.length; n++) {
switch(s[n].substring(0,1)) {
case '#': r.push(document.getElementById(s[n].substring(1))); break;
case '.': c=document.getElementsByClassName(s[n].substring(1));
		  if(c.length>0) for(var i=0; i<c.length; i++) r.push(c[i]); break;
}
}
if(r.length==1) r=r[0];
} else if(xp_re.test(que)) {
r = (obj['doc']||document).evaluate(que,(obj['node']||document),null,((t=obj['type'])||6),null);
if(typeof t=="number" && /[12389]/.test(t)) r=r[(t==1?"number":(t==2?"string":(t==3?"boolean":"singleNode")))+"Value"];
}
if(r && obj['del']===true) {
if(r.nodeType==1) r.parentNode.removeChild(r);
else if(r.snapshotItem) for(var i=r.snapshotLength-1; (item=r.snapshotItem(i)); i--) item.parentNode.removeChild(item);
else if(!r.snapshotItem) for(var i=r.length-1; i>=0; i--) if(r[i]) r[i].parentNode.removeChild(r[i]);
} return r;
}

// by Ardik Didianto  http://userscripts.org/users/413570
// can't @require on chrome so I included this in the script
function checkURL(event) {
   if (reg.test(location.href)) {
      if (!(/photo\.php.*#.*photo\.php/i.test(location.href)) || enableInGalleries) { // thanks, discrete structures
         document.removeEventListener('DOMNodeInserted', checkURL, true); // we need to remove the event listener or we might cause an infinite loop apparently
         location.replace(location.href.replace(reg, '$1$3'));
      }
   }
}
if (/\.facebook\.com$/i.test(location.hostname)) {
   var reg = /^(https?:\/\/([-a-z0-9]+\.)*facebook\.com)\/[^#]*#!(\/.*)/i;
   document.addEventListener('DOMNodeInserted', checkURL, true);
}

// Get the actual Facebook url
function realURL() {
     if (window.location.hash.match(/\.php/)) {
        return 'http://'+window.location.host+window.location.hash.split('#')[1];
     } else if (window.location.href.indexOf('#') != -1) {
        return window.location.hash.split('#')[0];
     } else {
       return window.location.href;
     }
}

function $(element) { return document.getElementById(element); }

// Created by Didi, modified by Ardik
function create(a,b,c) {
	if(a=="text") {return document.createTextNode(b);}
	var ret=document.createElement(a.toLowerCase());
	if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(",style,accesskey,id,name,src,href,size,selected".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
	if(c) for(var i=0,l=c.length; i<l; i++) ret.appendChild(c[i]);
	return ret;
}

function ignoreall() {
var ignores = new Array(), hardMax = 3, repeat = false,
	id = $("ignoreall_select").options[$("ignoreall_select").selectedIndex].value,
	type = $("ignoreall_select_type").options[$("ignoreall_select_type").selectedIndex].value,
	array = $g("//div"+(id != "all" ? "[contains(@id, '"+id+"')]" : "[@id='contentArea']"), {type:7});

for(var i=0, len=array.snapshotLength; i < len; i++) {
	var buttons = $g(".//ul[contains(@class, 'uiList requests')]/li[contains(@class, 'uiListItem')"+(type != "all" ? "and contains(., '"+type+"')" : "")+"]", {type:7, node:array.snapshotItem(i)});
	for(var x=0,button; (button=buttons.snapshotItem(x)); x++) if(button && button.nodeType == 1) ignores.push(button);
}

if(ignores.length < hardMax) {
	max = ignores.length;
} else {
	max = hardMax;
	repeat = true;
}

if(ignores.length > 0) for(var q=0; q < max; q++) if(ignores[q].offsetHeight > 0) {
	var ig = $g(".//input[@type='submit' and @name='actions[reject]']", {type:9, node:ignores[q]});
	if(ig) {
		ig.click();
		ignores[q].className += " byScript";
	}
}

if(repeat === true) window.setTimeout(ignoreall, 1000+Math.round(Math.random()*500), ignoreall);
}

function hideFinished() {
	// Delete ignored requests
	$g("//div[@id='contentArea']//ul[contains(@class, 'uiList requests')]/li[contains(@class, 'uiListItem') and contains(., 'You hid a') and contains(., 'request') and contains(@class, 'byScript')]", {del:true});
}

function main() {
	if($("ignoreall")) return;

		document.body.appendChild(create("div", {id:"ignore_all", style:"position:fixed; bottom:26px; right:20px;"}, new Array(
			create('select', {id:"ignoreall_select_type", size:"12", style:"display: block; width: 160px;", ondblclick:ignoreall}, new Array(
				create("option", {value:"all", textContent:"All Types From FarmVille", selected:"yes"}),
				create("option", {value:"Special Delivery", textContent:"Special Delivery"}),
				create("option", {value:"m trying to') or contains(., 'm collecting", textContent:"Help Requests"}),
				create("option", {value:"Here is a Holiday Gift", textContent:"Holiday Gifts"}),
				create("option", {value:"Animal Feed", textContent:"Animal Feed"}),
				create("option", {value:"Farmhands", textContent:"Farmhands"}),
				create("option", {value:"Arborists", textContent:"Arborists"}),
				create("option", {value:"Seeds", textContent:"Seeds"}),
				create("option", {value:"Snowman", textContent:"Snowman Stuff"})
			)),
			create('select', {id:"ignoreall_select", size:"18", style:"display: block; width: 160px;", ondblclick:ignoreall}, new Array(
				create("option", {value:"all", textContent:"Ignore All", selected:"yes"}),
				create("option", {value:"event_invite", textContent:"Ignore Events"}),
				create("option", {value:"group_invite", textContent:"Ignore Group Invites"}),
				create("option", {value:"fbpage_fan_confirm", textContent:"Ignore Page Reqs"}),
				create("option", {value:"confirm_2318966938", textContent:"Ignore Causes"}),
				create("option", {value:"confirm_102452128776", textContent:"Ignore FarmVille"}),
				create("option", {value:"confirm_151044809337", textContent:"Ignore FishVille"}),
				create("option", {value:"confirm_163576248142", textContent:"Ignore PetVille"}),
				create("option", {value:"confirm_21526880407", textContent:"Ignore YoVille"}),
				create("option", {value:"confirm_10979261223", textContent:"Ignore MafiaWars"}),
				create("option", {value:"confirm_101539264719", textContent:"Ignore Cafe World"}),
				create("option", {value:"confirm_56748925791", textContent:"Ignore Farm Town"}),
				create("option", {value:"confirm_167746316127", textContent:"Ignore Zoo World"}),
				create("option", {value:"confirm_234860566661", textContent:"Ignore Treasure Isle"}),
				create("option", {value:"confirm_94483022361", textContent:"Ignore Island Paradise"}),
				create("option", {value:"confirm_163965423072", textContent:"Ignore Social City"}),
				create("option", {value:"confirm_26947445683", textContent:"Ignore Country Life"}),
				create("option", {value:"confirm_94483022361", textContent:"Ignore Island Paradise"}),
				create("option", {value:"confirm_134920244184", textContent:"Ignore Happy Aquarium"}),
				create("option", {value:"confirm_44856213161", textContent:"Ignore Cupcake Corner"}),
				create("option", {value:"confirm_425755285303", textContent:"Ignore Birdland"}),
				create("option", {value:"confirm_101628414658", textContent:"Ignore Wild Ones"}),
				create("option", {value:"confirm_114335335255741", textContent:"Ignore City of Wonder"})
			)),
			create('input', {type:'button', value:'Ignore', id:"ignoreall", onclick:ignoreall, style:"display: block;"})
		)));
}

if(realURL().find("reqs.php")) main();

window.addEventListener("DOMNodeInserted", function(e) {
	if(location.href.find("#!/reqs.php") || location.href.find("#confirm_")) window.location.replace("http://www.facebook.com/reqs.php");
}, false);

window.setInterval(hideFinished, 500);