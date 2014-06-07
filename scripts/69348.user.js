var meta = <><![CDATA[
// ==UserScript==
// @name           FarmVille Otomatik Nesne Toplama
// @namespace      http://userscripts.org/users/23652
// @description    Manages farmville wall posts; accepts bonuses, grabs bouquets, adopts animals, hatches eggs, and more
// @description    FarmVille Otomatik Nesne Toplama Scripti, Bonusları,Çiçekleri,Kayıp hayvan ve Yumurtaları Sizin için Toplar.	
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @copyright      JoeSimmons/Mentor_Mu-Gong
// @version        1.2.168
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require        http://userscripts.org/scripts/source/51532.user.js
// @require        http://userscripts.org/scripts/source/49700.user.js
// @require        http://sizzlemctwizzle.com/updater.php?id=62135&days=1
// ==/UserScript==
]]></>.toString();

var version = meta.match(/@version\s+([\d\.]+)/i)[1];

/*
Changelog (late start, I know)
1.2.168 - Lisan Düzenlemesi-Türkçe Çeviri Yapıldı.
*/

if(window.location!=window.top.location) return;

// Get ID
function $(ID,root) {return (root||document).getElementById(ID);}

Array.prototype.inArray = function(value) {
for(let i=this.length-1; i>=0; i--) if(this[i]==value) return true;
return false;
};

var main = {
writingComment : false,
pauseCount : 0,

profile : "",

opts : {
	bonus : true,
	hatch : true,
	adopt : true,
	bouquet : true,
	fuel : true,
	collectible : true,
	materials : true,
	valentine : true,
	claim : true,
	unknown : false,
	cow : true,
	penguin : true,
	bull : true,
	calf : true,
	turtle : true,
	turkey : true,
	sheep : true,
	kitten : true,
	kitty : true,
	duckling : true,
	rabbit : true,
	reindeer : true,
	horse : true,
	white : true,
	brown : true,
	black : true,
	gold : true,
	reqtimeout : 30,
	maxrequests : 1,
	inputtimeout : 10
},

whichRegex : /(bonus|hatch|adopt|bouquet|perfect bunch|present|fuel|help|collectible|materials|horse|pigeon|valentine|claim)/,
ampRegex : /&amp;/g,
animalRegex : /(?:brown |pink |black |green |lonely |white )?(cow|turtle|turkey|sheep|kitten|duckling|rabbit|bull|calf|penguin|kitty|horse|pigeon)/,
eggRegex : /(?:premium |uncommon |rare |treasured )?(white|brown|black|golden)( mystery eggs)/,
keyRegex : /&(?:amp;)?key=([^&]+)/,
nRegex : /\n+/g,
phpRegex : /#\/.*\.php/,
profileRegex : /facebook\.com\/([^?]+)/i,

accText : {
			bonus : "Bonus Alındı !",
			hatch : "Yumurta Alındı!",
			adopt : "Kayıp Hayvan Alındı!",
			bouquet : "Çiçek Buketi Alındı!",
			present : "Hediye Paketi Alındı!",
			box : "Mystery Kutu Alındı!",
			fuel : "Yakıt Alındı!",
			collectible : "Koleksiyon Nesnesi Alındı!",
			materials : "Materyal Alındı!",
			valentine : "Sevgililer Günü Hediyesi Alındı!",
			claim : "Bonus Sevgiler Günü Hediyesi Alındı!"
		},

// Created by avg, modified by JoeSimmons
create : function(a,b,c) {
	if(a=="text") {return document.createTextNode(b);}
	var ret=document.createElement(a.toLowerCase());
	if(b) for(let prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(",style,accesskey,id,name,src,href,which,rel".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
	if(c) for(let i=0,l=c.length; i<l; i++) ret.appendChild(c[i]);
	return ret;
},

click : function(e, type) {
if(!e && typeof e=='string') e=document.getElementById(e);
if(!e) {return;}
var evObj = document.createEvent('MouseEvents');
evObj.initMouseEvent((type||'click'),true,true,window,0,0,0,0,0,false,false,false,false,0,null);
e.dispatchEvent(evObj);
},

remove : function(e) {
var node = (typeof e=='string')?$(e):((typeof e=='object')?e:false);
if(node) node.parentNode.removeChild(node);
},

which : function(e) {
var w=e.textContent.toLowerCase().match(main.whichRegex);
w = (w!=null) ? w[1] : "none";
switch(w) {
case "horse": case "pigeon": w="adopt"; break;
case "perfect bunch": w="bouquet"; break;
case "help": w="bonus"; break;
case "bonus": if(e.parentNode.parentNode.parentNode.textContent.indexOf("Valentines")!=-1) w="valentine"; break;
}
return w;
},

whichAnimal : function(e) {
var w=e.toLowerCase().match(main.animalRegex);
w = (w!=null) ? w[1] : "unknown";
return w;
},

whichEgg : function(e) {
var w=e.replace(main.nRegex,"").toLowerCase().match(main.eggRegex);
w = (w!=null) ? w[1] : "none";
switch(w) {
case "golden": w="gold"; break;
}
return w;
},

debug : function(s) {
var d=$("debugT");
if(!d) document.body.insertBefore(d=main.create("textarea", {id:"debugT",style:"position:fixed; top:20px; left:20px; width:95%; height:90%; color:#000000; background:#ffffff; border:3px ridge #000000; z-index:99999;",ondblclick:function(e){e.target.style.display="none";}}, new Array(main.create("text",s))), document.body.firstChild);
	else d.innerHTML+="\n\n\n\n"+s;
if(d.style.display=="none") d.style.display="";
},

getKey : function(b) {
return b.match(main.keyRegex)[1];
},

resetAccepted : function(bypass) {
if(bypass===true || confirm("Really reset accepted items?")) window.setTimeout(function(){GM_deleteValue("fvwm_accepted_"+main.profile);}, 0);
},

getAccepted : function() {
return (new Function("return "+GM_getValue("fvwm_accepted_"+main.profile, "({})")+";"))();
},

setAccepted : function(e) {
GM_setValue("fvwm_accepted_"+main.profile, e.toSource());
},

get currReqs() {
return $g("count(.//iframe)",{node:$("fvwm_silent_req_holder"),type:1});
},

get refTime() {
var t=GM_config.get("arinterval"), r=Math.round(Math.random()*(t*250));
return Math.round((t*60000)+r);
},

get realURL() {
var u=window.location.href, host=window.location.host, protocol=window.location.protocol+"//", hash=window.location.hash;
if(hash!="" && main.phpRegex.test(hash)) u=protocol+host+hash.split("#")[1];
else if(hash!="" && hash.indexOf("#")!=-1) u=u.split("#")[0];
return u;
},

config : function() {
if(main.currReqs==0) GM_config.open();
	else window.setTimeout(main.config, 250);
},

refresh : function(bypass) {
if(!main.writingComment && !$("GM_config") && main.currReqs==0) {
window.setTimeout(function(main) {
if(main.currReqs==0) window.location.replace(GM_config.get("filteronly")==true?"http://www.facebook.com/home.php?filter=app_102452128776&show_hidden=true&ignore_self=true":main.realURL);
}, (bypass||3000), main);
} else window.setTimeout(main.refresh, (main.currReqs==0?1:main.currReqs)*1000);
},

status : function() {
var stat=$("fvwm_status");
switch(stat.style.display) {
case "none": stat.style.display=""; break;
}
switch(main.pauseCount) {
case 0: main.writingComment=false; break;
}
stat.textContent = !main.writingComment?"[F.O.N.T.TR] "+main.currReqs+" Alınan Nesne.":"["+main.pauseCount+"] PAUSED - Click this to unpause";
if(main.pauseCount>0) main.pauseCount--;
},

open : function(url, key, w) {
if((main.opts["maxrequests"]-main.currReqs) == 0) { // make sure to stay under the request limit but still get all items
return; 
}
$("fvwm_silent_req_holder").appendChild(main.create("iframe", {src:url, which:w, id:key, style:"display:none;visibility:hidden;width:0;height:0;", onload:function(e) {
var doc=e.target.contentDocument, w=e.target.getAttribute("which"), key=e.target.getAttribute("id"), acc=main.getAccepted(), item=$("item_"+key);
if(doc.body.textContent.indexOf("bits got lost on the way to your computer")==-1 && !$("errorPageContainer",doc)) {
acc[w].push(key);
main.setAccepted(acc);
item.setAttribute("id", "item_done_"+key);
item.textContent = main.accText[w];
main.remove(key);
}
}}));
window.setTimeout(main.remove, Math.round(main.opts["reqtimeout"]*1000), key);
},

run : function() {
if($("GM_config") || main.currReqs >= main.opts["maxrequests"]) return;
		var opts=main.opts, wallposts=$g("//a[contains(@href,'onthefarm') and not(starts-with(@id,'item_done_')) and contains(@href,'key=') and starts-with(@onclick,'ft')]", {type:7});
		if(wallposts.snapshotLength==0) return;
		var open=main.open, accText=main.accText, getKey=main.getKey,
			which=main.which, whichAnimal=main.whichAnimal, whichEgg=main.whichEgg, acc=main.getAccepted();

// Loop through and grab stuff
var ssi=wallposts.snapshotItem, i=0, len=wallposts.snapshotLength;
do {
	var item=ssi(i), key = getKey(item.href), w = which(item);
if(w!="none" && !acc[w]) {
acc[w] = [];
main.setAccepted(acc);
}
if(w!="none") switch(acc[w].inArray(key)==true) {
case false: if(!$(key) && opts[w]==true) {
	item.setAttribute("id", "item_"+key);
	switch(w) {
	case "adopt": if(opts[whichAnimal(item.textContent)]==true) open(item.href, key, w); break; // open request in iframe
	case "hatch": if(opts[whichEgg(item.parentNode.parentNode.parentNode.textContent)]==true) open(item.href, key, w); break; // open request in iframe
	default: open(item.href, key, w); // open request in iframe
	}
} break;
default: item.textContent = accText[w];
}
} while (++i < len);
}
};

GM_config.init("FarmVille Otomatik Nesne Toplama "+version+" Ayarlar", {
	bonus : {
		section : [
		"FarmVille Otomatik Nesne Toplama Ayarlar"
		],
		label : "Bonus Alınsın mı ?",
		type: "checkbox",
		"default" : true
	},
	hatch : {
		label : "Yumurta Alınsın mı ?",
		type: "checkbox",
		"default" : true
	},
	adopt : {
		label : "Kayıp Hayvan Alınsın mı ?",
		type: "checkbox",
		"default" : true
	},
	unknown : {
		label : "Tüm Kayıp Hayvanları Yakala (Script Güncellemeye Gerek Yok.)",
		type: "checkbox",
		"default" : false
	},
	bouquet : {
		label : "Buket Alınsın mı ?",
		type: "checkbox",
		"default" : true
	},
	fuel : {
		label : "Yakıt Alınsın mı ?",
		type: "checkbox",
		"default" : true
	},
	collectible : {
		label : "Koleksiyon Nesnesi Alınsın mı ?",
		type: "checkbox",
		"default" : true
	},
	materials : {
		label : "Materyal Alınsın mı ?",
		type: "checkbox",
		"default" : true
	},
	valentine : {
		label : "Sevgililer günü Hed. Alınsın mı ?",
		type: "checkbox",
		"default" : true
	},
	claim :  {
		label : "Bonus Sevgililer Günü Hed. Alınsın mı ?",
		type: "checkbox",
		"default" : true
	},
	cow : {
		section : [
		"Toplanacak Kayıp Hayvanlar"
		],
		label : "İnek",
		type : "checkbox",
		"default" : true
	},
	penguin : {
		label : "Penguen",
		type : "checkbox",
		"default" : true
	},
	bull : {
		label : "BOğa",
		type : "checkbox",
		"default" : true
	},
	calf : {
		label : "Buzağı",
		type : "checkbox",
		"default" : true
	},
	turtle : {
		label : "Kaplumbağa",
		type : "checkbox",
		"default" : true
	},
	turkey : {
		label : "Hindi",
		type : "checkbox",
		"default" : true
	},
	sheep : {
		label : "Kuzu",
		type : "checkbox",
		"default" : true
	},
	kitten : {
		label : "Siyah Kedi",
		type : "checkbox",
		"default" : true
	},
	kitty : {
		label : "Beyaz Kedi",
		type : "checkbox",
		"default" : true
	},
	duckling : {
		label : "Çirkin Ördek",
		type : "checkbox",
		"default" : true
	},
	rabbit : {
		label : "Tavşan",
		type : "checkbox",
		"default" : true
	},
	reindeer : {
		label : "Ren Geyiği",
		type : "checkbox",
		"default" : true
	},
	horse : {
		label : "At",
		type : "checkbox",
		"default" : true
	},
	white : {
		section : [
		"Toplanacak Yumurtalar"
		],
		label : "Beyaz Yumurta",
		type : "checkbox",
		"default" : true
	},
	brown : {
		label : "Kahverengi Yumurta",
		type : "checkbox",
		"default" : true
	},
	black : {
		label : "Siyah Yumurta",
		type : "checkbox",
		"default" : true
	},
	gold : {
		label : "Altın Yumurta",
		type : "checkbox",
		"default" : true
	},
	autorefresh : {
		section : [ "Diğer Ayarlar" ],
		label : "Otomatik Yenileme?",
		type : "checkbox",
		"default" : true
	},
	arinterval : {
		label : "Otomatik Yenileme  (Dakika)",
		type : "float",
		"default" : 2
	},
	filteronly : {
		label : "Sadece Farmville Filtre Sayfasında çalıştır?",
		type : "checkbox",
		"default" : false
	},
	reqtimeout : {
		label : "Nesne Kabul Etme Süresi (Saniye)",
		type : "float",
		"default" : 30
	},
	inputtimeoutenable : {
		label : "Otomatik Durdurmaya İzin ver",
		type : "checkbox",
		"default" : false
	},
	inputtimeout : {
		label : "Giriş yaptıktan Sonra aktif olma Süresi",
		type : "float",
		"default" : 10
	},
	reset : {
		label : "İtemları Resetle",
		type : "button",
		script : main.resetAccepted
	}
}, ".field_label {font-size:12px;} .section_header_holder {margin-top:8px;} #header {font-size:18px;}");

GM_registerMenuCommand("FarmVille Otomatik Nesne Toplama "+version+" Ayarlar", main.config); // add options shortcut to user script commands

document.body.insertBefore(main.create("div", {id:"fvwm_silent_req_holder",style:"display:none;visibility:hidden;width:0;height:0;"}), document.body.firstChild); // add div that holds the iframes for requests

// Method to work on multiple accounts
var prof=document.evaluate("//a[contains(@href,'ref=profile') and .='Profile']", document, null, 9, null).singleNodeValue;
if(prof) main.profile = prof.href.indexOf("id=")!=-1 ? prof.href.split("id=")[1].split("&")[0] : prof.href.match(main.profileRegex)[1];

if((main.realURL.indexOf("home.php")!=-1||main.realURL.indexOf("ref=home")!=-1) && (GM_config.get("filteronly")==true?main.realURL.indexOf("filter=app_102452128776")!=-1:true)) { // if on the homepage with the home feed showing

// method to speed up script considerably
for(var thing in main.opts) {
var g=GM_config.get(thing);
switch(typeof g) {
case "boolean": main.opts[thing] = g==true?true:false; break;
default: main.opts[thing] = g || main.opts[thing];
}
}

var status=main.create("div", {id:"fvwm_status",style:"position:fixed; top:0; left:0; padding:10px 8px 8px 6px; color:#FFFFFF; background:#415193; border: 1px solid #242424;font-family: arial, verdana, sans-serif; font-size:1em; z-index:99998;  display:none;",textContent:"[FVWM] 0 requests currently."});
status.addEventListener("click", function(e){ main.writingComment=!main.writingComment; main.status(); }, false);
document.body.insertBefore(status, document.body.firstChild);

if(GM_config.get("inputtimeoutenable")) {
var keyDownTO;
window.addEventListener("keydown", function(e) {
if(",33,34,35,36,37,38,39,40".indexOf(","+e.keyCode)!=-1) return;
window.clearTimeout(keyDownTO);
main.writingComment=true;
main.pauseCount = main.opts["inputtimeout"] || 10;
main.status();
}, false);
}

// Make script run every second, and show & update debug bar
window.setInterval(function(e){window.setTimeout(function(){main.run();},0);main.status();},500);

window.addEventListener("load", function(e) {
// Auto click "show x similar posts" links
var similarposts=$g(".//a[@rel='async' and contains(@href,'oldest=') and contains(@href,'newest=') and contains(@href,'expand_story_uid=')]", {node:$("home_stream")});
for(let i=0,item; (item=similarposts.snapshotItem(i)); i++) main.click(item) && alert("Similar post link found.");
}, false);

if(GM_config.get("autorefresh")==true) window.setTimeout(main.refresh, main.refTime); // add autorefresh if enabled
} else if(document.title=="Problem loading page" && main.realURL.indexOf("home.php")!=-1) main.refresh();

var iOp=0, opInt = window.setInterval(function() {
var f=$g("//li[starts-with(@id, 'navigation_item_')]", {type:9});
if(f) {
f.parentNode.appendChild(main.create("li", {id:"navigation_item_fvwm"}, new Array(
main.create("a", {className:"item", href:"javascript:void(0);", onclick:main.config}, new Array(
	main.create("span", {className:"imgWrap"}, new Array(main.create("img", {src:"data:image/gif;base64,R0lGODlhEAAQAPeCAO5zXPWCY+psWetuWvN8YOxwW/u9qednV+92XfB4X/Kpn+ViVeJfU/F6X/i0oPN+YehpWPOmkeZlVvaJa/SAYvfRyOO6styfk/SmkvLi3/ezpONmW8FLMuySf/Cfjvbm4/ezoPWEatBiS/LLwu7d2e/IwN1wXcthS/CXg/SZhPKMdNqdkPPi3/mSe+yAaPiGbOuJfeywo+6glc1iTfGTgtVgR/Gon8ZbRe2SifrZ0+2flfDf2+l2Xd19b+WOg/SsoelvX+O7s+qNe/S5rPi2oeOEdeeRhe/e2+FdUuyBbOeQhPfm4/iiicRONvXl4eBzXOySiPq8qOnBufGdkPGXhOyYifaLdOeAacxVPN18b+eqnt1vWPGlmevEu/KAZfmNduRnXOBzYOVyWe6DbvWwo+qHfdFhUOl9aPijisNMNN6ileyLf/m5pvSEZ/i1pc9ZQeNhVPGom8ZWQPWBYvi+sfONdva7reaIePOvpsNTPO17YPihiNRkUudsXdduWPeGbM5dTP////b29gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAIIALAAAAAAQABAAAAjSAAUJHEiwYMEldFr8CVFniBODgip8GYPBgYMIZ1yMKFjhBRUDaCZMYBKlg5gSAz9YQWEgQIBAgR4QYCPkSQaBdpK0nEMBZoMECNyY0CJQRYQ9FGTCRACgAI0qfgTqIdKGwE+YBQYIABLnjUAeILwABZAjkAAIB/pwwSLwiocUTQdMwXNAwgIYRmYIjBFGg1YIMBfAYaDAzAWBLLbcIVMXBxQGSBT0kHNkYJcaRX6sAbOhjI0sHIIUlCKCjxIZOnwAymMB4g41J5qkubGCBMTbBQMCADs="}))),
	main.create("span", {textContent:"F.O.N.T.TR "+version+" Ayarlar"})
))
)));
window.clearInterval(opInt);
} else if(iOp>=40) window.clearInterval(opInt);
else iOp++;
}, 250);