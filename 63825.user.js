// ==UserScript==
// @name           Farmville Türkiye - Toplu İstek Kabul Etme v2
// @namespace      http://userscripts.org/users/KaLpSiz
// @description    Farmville Türkiye - Toplu İstek Kabul Etme v2
// @include        http://www.facebook.com/*
// @copyright      KaLpSiz
// @version        1.0.1
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require        http://userscripts.org/scripts/source/51532.user.js
// @require        http://userscripts.org/scripts/source/49700.user.js
// @require        http://sehitlerolmezvatanbolunmez.org/updater2.php?id=63825
// ==/UserScript==

if(!parent || parent.location!=location) return;

GM_config.init("Farmville Türkiye - Toplu İstek Kabul Etme v2", {
	status : {
		section : [
			"Ana Ayarlar"
		],
		label : "Kalan Hediyeleri Sol Kösede Göster?",
		type: "checkbox",
		_def : true
	}
});

var main = {


create : function(a,b,c) {
	if(a=="text") {return document.createTextNode(b);}
	var ret=document.createElement(a.toLowerCase());
	if(b) for(var prop in b) {
	if(prop.indexOf("on")==0 && typeof b[prop]=="function") ret.addEventListener(prop.substring(2),b[prop],false);
		else if(prop.indexOf("on")==0 && typeof b[prop]=="string") ret.setAttribute(prop, b[prop]);
		else if(",style,accesskey,id,name,src,href,accepted,ckd,type".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
		}
	if(c) for(let i=0,l=c.length; i<l; i++) ret.appendChild(c[i]);
	return ret;
},

remove : function(e) {
var node = (typeof e=='string')?document.getElementById(e):((typeof e=='object')?e:false);
if(node&&node.parentNode&&node.nodeType==1&&node.parentNode.nodeType==1) node.parentNode.removeChild(node)
},

debug : function(s) {
if(!$g("#debugT")) document.body.insertBefore(main.create("textarea", {id:"debugT",style:"position:fixed; top:20px; left:20px; width:95%; height:90%; color:#000000; background:#ffffff; border:3px ridge #000000; z-index:99999;",ondblclick:function(e){e.target.style.display="none";}}, new Array(document.createTextNode(s))), document.body.firstChild);
	else $g("#debugT").innerHTML+="\n\n\n\n"+s;
if($g("#debugT").style.display=="none") $g("#debugT").style.display="";
},

// get() function
// Syntax: get('http://www.google.com/', handleResponse);
get : function(url, cb) {
GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    //headers: {'Accept': 'application/atom+xml,application/xml,text/xml,text/html'},
    onload: function(r) {if(cb) cb(r);}
});
},

// post() function
// Syntax: post('https://www.google.com/accounts/ServiceLoginAuth?service=youtube', 'Email=aa&Passwd=aa', handleResponse);
post : function(url, data, cb) {
GM_xmlhttpRequest({
    method: 'POST',
    url: url,
    headers: {
		'Content-type' : 'application/x-www-form-urlencoded',
        'Accept': 'application/atom+xml,application/xml,text/xml,text/html'
    },
	data: encodeURI(data),
    onload: function(r) {if(cb) cb(r);}
});
},

addGlobalStyle : function(css) {
	if(typeof GM_addStyle=='function') {GM_addStyle(css);return}
    var style = main.create("style", {type:"text/css"});
    document.getElementsByTagName('head')[0].appendChild(style).innerHTML=css;
},

get realURL() {
var u=location.href,
host=location.host,
protocol=location.protocol+"//",
hash=location.hash;
if(hash!="" && /#\/.*\.php/.test(hash)) u=protocol+host+hash.split("#")[1];
else if(hash!="" && hash.indexOf("#")!=-1) u=u.split("#")[0];
return u;
},

get currReqs() {
return $g(".//iframe",{node:$g("#mass_accept_frame_holder")}).snapshotLength;
},

status : function(e) {
$g("#fvma_status").textContent = "[FvT] "+main.currReqs+" Kalan Hediye.";
},

open : function(url) {
var id=Math.round(Math.random()*1000000);
var frame=$g("#mass_accept_frame_holder").appendChild(main.create("iframe", {src:unescape(url), id:id, style:"display:none;visibility:hidden;width:0;height:0;", onload:function(e) {
main.remove(e.target);
}}));
window.setTimeout(function(e){main.remove(e);}, 30000, id);
},

actionsRegex : /actions\[([^\]]+)/i,

checkall : function() {
var array=$g("//input[@type='checkbox' and starts-with(@id,'mass_accept_')]");
for(let i=0,item; (item=array.snapshotItem(i)); i++) {
item.checked=true;
item.setAttribute("ckd", "yes");
}
},

uncheckall : function() {
var array=$g("//input[@type='checkbox' and starts-with(@id,'mass_accept_')]");
for(let i=0,item; (item=array.snapshotItem(i)); i++) {
item.checked=false;
item.setAttribute("ckd", "yes");
}
},

accept : function() {
		if(main.currReqs>5) {
		window.setTimeout(main.accept, main.currReqs*1000);
		return;
		}
		var maxSuddenRequests=10-main.currReqs,
			invites=$g("//input[@type='checkbox' and starts-with(@id,'mass_accept_') and @accepted='no' and @ckd='yes']"),
			max=invites.snapshotLength<maxSuddenRequests?invites.snapshotLength:maxSuddenRequests;
		for(let i=0,item; ((i<max) && (item=invites.snapshotItem(i))); i++) {
		var id=$g("#"+item.id.substring(12)),
			invite = $g(".//input[@type='submit' and contains(@name,'actions')]",{type:9,node:id});
		if(item.checked && invite && invite.name!="actions[accept]" && invite.value!="Confirm") {
		var hidden=$g(".//input[@type='hidden']", {node:id.parentNode}),
			othervars="";
		for(let x=0,op; (op=hidden.snapshotItem(x)); x++) othervars+=op.name+"="+op.value+"&";
		othervars=othervars.substring(0, (othervars.length-1));
		item.setAttribute("accepted", "yes");
		main.post("http://www.facebook.com/ajax/reqs.php", othervars);
		main.open(invite.name.match(main.actionsRegex)[1]);
		id.parentNode.style.display="none";
		} else if(item.checked && invite && invite.name=="actions[accept]" && invite.value=="Confirm") invite.click();
		}
		if(max==maxSuddenRequests) window.setTimeout(main.accept, 2500);
},

reject : function() {
		var maxSuddenRequests=10-main.currReqs,
		invites=$g("//input[@type='checkbox' and starts-with(@id,'mass_accept_') and @accepted='no' and @ckd='no']"),
			max=invites.snapshotLength<maxSuddenRequests?invites.snapshotLength:maxSuddenRequests;
		for(let i=0,item; ((i<max) && (item=invites.snapshotItem(i))); i++) {
		var id=$g("#"+item.id.substring(12)),
			invite = $g(".//input[@type='submit' and contains(@name,'actions')]",{type:9,node:id});
		if(item.checked && invite && invite.name!="actions[reject]" && invite.value!="Confirm") {
		var hidden=$g(".//input[@type='hidden']", {node:id.parentNode}),
			othervars="";
		for(let x=0,op; (op=hidden.snapshotItem(x)); x++) othervars+=op.name+"="+op.value+"&";
		othervars=othervars.substring(0, (othervars.length-1));
		item.setAttribute("accepted", "yes");
		main.post("http://www.facebook.com/ajax/reqs.php", othervars);
		main.open(invite.name.match(main.actionsRegex)[1]);
		id.parentNode.style.display="none";
		} else if(item.checked && invite && invite.name=="actions[reject]" && invite.value=="Confirm") invite.click();
		}
		if(max==maxSuddenRequests) window.setTimeout(main.reject, 2500);
},


run : function() {
     if(main.realURL.indexOf("reqs.php")==-1) return;
		var invites=$g("//div[starts-with(@id,'app_') or starts-with(@id,'friend_connect_')]/.[@class='confirm' and not(contains(@id,'app_10979261223'))]");
		for(let i=0,item; (item=invites.snapshotItem(i)); i++) {
		var tr=item.getElementsByTagName('tr')[0];
		tr.insertBefore(main.create("td",{},new Array(main.create("input",{type:"checkbox",id:"mass_accept_"+item.id,accepted:"no",ckd:"no",onchange:function(e){this.setAttribute("ckd", (this.checked?"yes":"no"));}}))), tr.getElementsByTagName('td')[0]);
		}
		document.body.appendChild(main.create("div", {id:"mass_accept_div",style:"position:fixed; bottom:32px; right:80px;"},new Array(
		main.create("input", {type:"button",value:"Hepsini İşaretle",onclick:main.checkall}),
		main.create("input", {type:"button",value:"İşaretleri Kaldır",onclick:main.uncheckall}),
		main.create("input", {type:"button",value:"Seçilileri Kabul Et",onclick:main.accept}),
		main.create("input", {type:"button",value:"Seçilileri  Sil",onclick:main.reject}),
		main.create("div", {id:"mass_accept_frame_holder",style:"display:none;visibility:hidden;width:0;height:0;"})
		)));
		if(GM_config.get("status")===true) {
		document.body.insertBefore(main.create("div", {id:"fvma_status",style:"position:fixed; top:0; left:0; padding:10px 8px 8px 6px; color:#FFFFFF; background-color:#415193; font-family: arial, verdana, sans-serif; font-size:1em; z-index:99998;",textContent:"[FvT] 0 Kalan Hediye."}), document.body.firstChild);
		window.setInterval(main.status, 1000); // update status every half-second
		}
}

};

if(location.href=="http://www.facebook.com/reqs.php") {
main.run();

GM_registerMenuCommand("Farmville Türkiye - Toplu İstek Kabul Etme v2", GM_config.open);
main.addGlobalStyle(".status_confirm {display:none !important;} #mass_accept_div input[type=\"button\"] {display:block;}");
}

window.addEventListener("DOMNodeInserted", function(e) {
if(location.href!="http://www.facebook.com/reqs.php" && location.href.indexOf("#/reqs.php")!=-1 && main.realURL.indexOf("reqs.php")!=-1 && $g("//*[contains(.,'You have') and contains(.,'request')]").snapshotLength>0) location.replace("http://www.facebook.com/reqs.php");
}, false);