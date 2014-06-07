var meta = <><![CDATA[
// ==UserScript==
// @name           Farmville nesne Toplayıcı
// @description    You can do with your FarmVille all, that you want Farmville'de yayınlanan Tüm nesneleri Toplar
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @copyright      Andrej Bučány / Türkçe Çeviren Tuncay Davşan Mentor_Mu-Gong
// @version        1.0.0
// @license        Please do not copy this script (türkçeleştirilmiştir)
// @require        http://userscripts.org/scripts/source/51532.user.js
// @require        http://userscripts.org/scripts/source/49700.user.js
// @require        http://sizzlemctwizzle.com/updater.php?id=62135
// ==/UserScript==

]]></>.toString();

var version = meta.match(/@version\s+([\d\.]+)/i)[1];


if(!parent || parent.location!=location) return;

// Get ID
function $(ID,root) {return (root||document).getElementById(ID);}

Array.prototype.inArray = function(value) {
for(let i=this.length-1; i>=0; i--) if(this[i]==value) return true;
return false;
};

function dragStart(e) {
dragObj.elNode = e.target;
if (dragObj.elNode.nodeType == 3) dragObj.elNode = dragObj.elNode.parentNode;
dragObj.cursorStartX = e.clientX + window.scrollX;
dragObj.cursorStartY = e.clientY + window.scrollY;
dragObj.elStartLeft  = parseInt(dragObj.elNode.style.left, 10);
dragObj.elStartTop   = parseInt(dragObj.elNode.style.top,  10);
document.addEventListener("mousemove", dragGo,   true);
document.addEventListener("mouseup",   dragStop, true);
e.preventDefault();
}

function dragGo(e) {
e.preventDefault();
var x = e.clientX + window.scrollX,
	y = e.clientY + window.scrollY;
dragObj.elNode.style.left = (dragObj.elStartLeft + x - dragObj.cursorStartX) + "px";
dragObj.elNode.style.top = (dragObj.elStartTop  + y - dragObj.cursorStartY) + "px";
}

function dragStop(e) {
document.removeEventListener("mousemove", dragGo,   true);
document.removeEventListener("mouseup",   dragStop, true);
}

var dragObj = new Object(), x, y;
dragObj.zIndex = 0;

var main = {
to : null,
toOn : false,

reqtimeout : 60000,
maxrequests : 1,

opts : {
	bonus : true,
	hatch : true,
	adopt : true,
	bouquet : true,
	present : true,
	box : true, 
	fuel : true,
	collectable : true,
	materials : true,
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
	showstatus : true,
	none : true
},

whichRegex : /(bonus|hatch|adopt|bouquet|perfect bunch|present|fuel|help|collectable|lend|materials|horse|pigeon)/,
ampRegex : /&amp;/g,
animalRegex : /(?:brown |pink |black |green |lonely |white )?(cow|turtle|turkey|sheep|kitten|duckling|rabbit|bull|calf|penguin|kitty|horse|pigeon)/,
eggRegex : /(?:premium |uncommon |rare |treasured )?(white|brown|black|golden)( mystery eggs)/,
keyRegex : /&(?:amp;)?key=([^&]+)/,
nRegex : /\n+/g,
phpRegex : /#\/.*\.php/,

accText : {
			bonus : "Bonus Alındı!",
			hatch : "Yumurta Alındı!",
			adopt : "Hayvan Alındı!",
			bouquet : "Buket Alındı!",
			present : "Hediye Paketi Alındı!",
			box : "Sürpriz Kutu alındı!",
			fuel : "Yakıt ALındı!",
			collectable : "Koleksiyon Nesnesi Alındı!",
			materials : "Materyal Alındı!"
		},

// Created by Andrej Bučány
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
case "present": if(e.parentNode.parentNode.parentNode.textContent.indexOf("unwrapped")!=-1) w="box"; break;
case "help": case "lend": w="bonus"; break;
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

resetAccepted : function() {
if(confirm("Really reset accepted items?")) window.setTimeout(function(){GM_deleteValue("fvwm_accepted");}, 0);
},

getAccepted : function() {
return (new Function("return "+GM_getValue("fvwm_accepted", "({bonus:[],hatch:[],adopt:[],bouquet:[],present:[],box:[],fuel:[],collectable:[],materials:[],none:[]})")+";"))();
},

setAccepted : function(e) {
GM_setValue("fvwm_accepted", e.toSource());
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
else {
window.setTimeout(main.config, 250);
}
},

refresh : function() {
if(!$("GM_config") && main.currReqs==0) {
window.setTimeout(function(main) {
if(main.currReqs==0) window.location.replace(GM_config.get("filteronly")==true?"http://www.facebook.com/home.php?filter=app_102452128776&show_hidden=true&ignore_self=true":main.realURL);
}, 3000, main);
} else window.setTimeout(main.refresh, main.currReqs*1000);
},

status : function() {
var stat=$("fvwm_status");
switch(stat.style.display) {
case "none": stat.style.display=""; break;
}
stat.textContent = "[FV-Turkiye] "+main.currReqs+" Toplanan Nesne.";
},

open : function(url, key, w) {
if((main.maxrequests-main.currReqs) == 0) { // make sure to stay under the request limit but still get all items
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
window.setTimeout(main.remove, main.reqtimeout, key);
},

run : function() {
if($("GM_config") || main.currReqs >= main.maxrequests) return;
		var opts=main.opts, wallposts=$g(".//a[contains(.,'Get') or contains(.,'help') or contains(.,'Lend')"+(opts["hatch"]==true?" or contains(.,'Hatch')":"")+(opts["adopt"]==true?" or contains(.,'Adopt')":"")+(opts["collectable"]==true?" or contains(.,'collectable')":"")+"]/.[contains(@href,'onthefarm') and not(starts-with(@id,'item_done_'))]", {type:7,node:$("home_stream")});
		if(wallposts.snapshotLength==0) return;
		var open=main.open, accText=main.accText, getKey=main.getKey,
			which=main.which, whichAnimal=main.whichAnimal, whichEgg=main.whichEgg, acc=main.getAccepted();

// Loop through and grab stuff
var ssi=wallposts.snapshotItem, i=0, len=wallposts.snapshotLength;
do {
	var item=ssi(i), key = getKey(item.href), w = which(item);
switch(acc[w].inArray(key)==true) {
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

GM_config.init("Otomatik Nesne Toplayıcı "+version+" Ayarlar", {
	bonus : {
		section : [
		"Ayarlar"
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
		label : "Hayvan Alınsın mı ?",
		type: "checkbox",
		"default" : true
	},
	unknown : {
		label : "Tüm Hayvanları Alma (Aktif)",
		type: "checkbox",
		"default" : false
	},
	bouquet : {
		label : "Buket Alınsın mı ?",
		type: "checkbox",
		"default" : true
	},
	present : {
		label : "Hediye Paketi Alınsın mı ?",
		type: "checkbox",
		"default" : true
	},
	box : {
		label : "Sürpriz Kutu Alınsın mı ?",
		type: "checkbox",
		"default" : true
	},
	fuel : {
		label : "Yakıt Alınsın mı ?",
		type: "checkbox",
		"default" : true
	},
	collectable : {
		label : "Kolesiyon Nesneleri Alınsın mı ?",
		type: "checkbox",
		"default" : true
	},
	materials : {
		label : "Materyal Alınsın mı ?",
		type: "checkbox",
		"default" : true
	},
	cow : {
		section : [
		"Hangi Hayvanları Toplasın ?"
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
		label : "Boğa",
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
		label : "Geyik",
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
		"Hangi Yumurtaları Toplasın"
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
		label : "Otomatik Sayfa Yenileme",
		type : "checkbox",
		"default" : true
	},
	arinterval : {
		label : "Otomatik Yenileme süresi (saniye)",
		type : "float",
		"default" : 2
	},
	maxrequests : {
		label : "Maksimum süre",
		type : "float",
		"default" : 1
	},
	showstatus : {
		label : "İşlem Barını Göster",
		type : "checkbox",
		"default" : true
	},
	similar : {
		label : "Similatörde Oynat",
		type : "checkbox",
		"default" : true
	},
	filteronly : {
		label : "Sadece Farmville Sayfasında Çalıştır",
		type : "checkbox",
		"default" : false
	},
	reset : {
		label : "İtemları Resetle",
		type : "button",
		script : main.resetAccepted
	}
}, ".field_label {font-size:12px;} .section_header_holder {margin-top:8px;} #header {font-size:18px;}");

GM_registerMenuCommand("Otomatik Nesne Toplayıcı "+version+" Ayarlar", main.config); // add options shortcut to user script commands

document.body.insertBefore(main.create("div", {id:"fvwm_silent_req_holder",style:"display:none;visibility:hidden;width:0;height:0;"}), document.body.firstChild); // add div that holds the iframes for requests

if((main.realURL.indexOf("home.php")!=-1||main.realURL.indexOf("ref=home")!=-1) && (GM_config.get("filteronly")==true?main.realURL.indexOf("filter=app_102452128776")!=-1:true)) { // if on the homepage with the home feed showing

// method to speed up script considerably
for(var thing in main.opts) main.opts[thing] = GM_config.get(thing)==true?true:false;
main.maxrequests = GM_config.get("maxrequests") || 1;

if(main.opts["showstatus"]==true) {
var status=main.create("div", {id:"fvwm_status",style:"position:fixed; top:0; left:0; padding:10px 8px 8px 6px; color:#FFFFFF; background:#415193; border: 1px solid #242424;font-family: arial, verdana, sans-serif; font-size:1em; z-index:99998;  display:none;",textContent:"[FVWM] 0 requests currently."});
status.addEventListener('mousedown', function(e){dragStart(e);}, false);
document.body.insertBefore(status, document.body.firstChild);
}

var mainInt = window.setInterval(function(e) {
window.setTimeout(function(){main.run();}, 0);
switch(main.opts["showstatus"]) {
case true: main.status(); break; // update status every second
}
}, 1000); 

window.addEventListener("load", function(e) {
if(GM_config.get("similar")==true) { // Auto click "show x similar posts" links
var similarposts=$g(".//a[contains(.,'SHOW') and contains(.,'SIMILAR POSTS')]", {node:$("home_stream")});
for(let i=0,item; (item=similarposts.snapshotItem(i)); i++) main.click(item);
}
}, false);

if(GM_config.get("autorefresh")==true) window.setTimeout(main.refresh, main.refTime); // add autorefresh if enabled
} else if(document.title=="Problem loading page" && main.realURL.indexOf("home.php")!=-1) main.refresh();

window.addEventListener("onbeforeunload", function(e) {
window.clearInterval(mainInt);
for(x in main) x=null; main=null; delete main; $=null; delete $; $g=null; delete $g; GM_config=null; delete GM_config;
}, false);