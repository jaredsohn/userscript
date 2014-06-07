// ==UserScript==
// @name           Farmville Türkiye - Hayvan, Buket, Yumurta, Bonus Toplama
// @namespace      http://userscripts.org/users/Farmville
// @description    Arkadaslarinizin Gonderdigi Bonus, Buket, Hayvan, Yumurtaları Toplar
// @include        http://www.facebook.com/*
// @copyright      Farmville
// @version        1.2.1
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require        http://userscripts.org/scripts/source/51532.user.js
// @require        http://userscripts.org/scripts/source/49700.user.js
// @require        http://sehitlerolmezvatanbolunmez.org/updater.php?id=62190
// ==/UserScript==


if(!parent || parent.location!=location) return;

GM_config.init("Farmville Türkiye Ayarlar", {
	bonus : {
		section : [
		"Toplama Ayarlari"
		],
		label : "Bonus Alinsin mi?",
		type: "checkbox",
		_def : true
	},
	hatch : {
		label : "Yumurta Alinsin mi?",
		type: "checkbox",
		_def : true
	},
	adopt : {
		label : "Hayvan Alinsin mi?",
		type: "checkbox",
		_def : true
	},
	bouquet : {
		label : "Buket Alinsin mi?",
		type: "checkbox",
		_def : true
	},
	cow : {
		section : [
		"Hayvan Toplama Ayari"
		],
		label : "Inek",
		type : "checkbox",
		_def : true
	},
	turtle : {
		label : "Kaplumbaga",
		type : "checkbox",
		_def : true
	},
	turkey : {
		label : "Hindi",
		type : "checkbox",
		_def : true
	},
	Baby Calf : {
		label : "Bebek BUZAGI",
		type : "checkbox",
		_def : true
	},
	Lonely Bull : {
		label : "Yanlız Boga",
		type : "checkbox",
		_def : true
	},
	sheep : {
		label : "Koyun",
		type : "checkbox",
		_def : true
	},
	cat : {
		label : "Siyah Kedi",
		type : "checkbox",
		_def : true
	},
	duckling : {
		label : "Çirkin Ördek",
		type : "checkbox",
		_def : true
	},
	rabbit : {
		label : "Tavsan",
		type : "checkbox",
		_def : true
	},
	reindeer : {
		label : "Ren Geyigi",
		type : "checkbox",
		_def : true
	},
	white : {
		section : [
		"Yumurta Toplama Ayari"
		],
		label : "Beyaz Yumurta",
		type : "checkbox",
		_def : true
	},
	brown : {
		label : "Kahverengi Yumurta",
		type : "checkbox",
		_def : true
	},
	black : {
		label : "Siyah Yumurta",
		type : "checkbox",
		_def : true
	},
	gold : {
		label : "Altin Yumurta",
		type : "checkbox",
		_def : true
	},
	reqtimeout : {
		section : [
		"Diger Ayarlar"
		],
		label : "Kabul Etme Zaman Asimi (saniye)",
		type : "float",
		_def : 60
	},
	autorefresh : {
		label : "Otomatik Yenileme?",
		type : "checkbox",
		_def : true
	},
	arinterval : {
		label : "Otomatik Yenileme Süresi (Dakika)",
		type : "float",
		_def : 2
	},
	showstatus : {
		label : "Kalan Hediyeleri Sol Kösede Göster?",
		type : "checkbox",
		_def : true
	},
	similar : {
		label : "Otomatik Tiklamada Benzer Mesajlari Göster?",
		type : "checkbox",
		_def : true
	},
	filteronly : {
		label : "Sadece Farmville Filtre Sayfasinda Çalistir?",
		type : "checkbox",
		_def : false
	}
});

Array.prototype.inArray = function(value) {
for(let i=this.length-1; i>=0; i--) if(this[i]==value) return true;
return false;
};

var main = {
to : null,
toOn : false,

cfg : {
	bonus : GM_config.get("bonus"),
	hatch : GM_config.get("hatch"),
	adopt : GM_config.get("adopt"),
	bouquet : GM_config.get("bouquet")
},

reqtimeout : GM_config.get("reqtimeout")||60,

whichRegex : /(?:get a )?(bonus|hatch|adopt|bouquet|perfect bunch)(?: an egg| the)?/i,
ampRegex : /&amp;/g,
animalRegex : /(?:brown |pink |black )?(cow|turtle|turkey|sheep|cat|duckling|rabbit|reindeer)/i,
eggRegex : /(?:premium |uncommon |rare |treasured )(white|brown|black|golden)( mystery eggs)/i,
nRegex : /\n+/g,
accText : {
			bonus : "Bonus Alindi!",
			hatch : "Yumurta Alindi!",
			adopt : "Hayvan Alindi!",
			bouquet : "Buket Alindi!"
		},

// Created by avg, modified by JoeSimmons
create : function(a,b,c) {
	if(a=="text") {return document.createTextNode(b);}
	var ret=document.createElement(a.toLowerCase());
	if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(",style,accesskey,id,name,src,href".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
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
var node = (typeof e=='string')?document.getElementById(e):((typeof e=='object')?e:false);
if(node&&node.parentNode&&node.nodeType==1&&node.parentNode.nodeType==1) node.parentNode.removeChild(node)
},

which : function(e) {
var w=e.match(main.whichRegex);
w = (w!=null&&w.length>0) ? w[1].toLowerCase() : "none";
switch(w) {
case "perfect bunch": w="bouquet"; break;
}
return w;
},

whichAnimal : function(e) {
var w=e.match(main.animalRegex);
w = (w!=null&&w.length>0) ? w[1].toLowerCase() : "none";
return w;
},

whichEgg : function(e) {
var w=e.parentNode.parentNode.parentNode.textContent.replace(main.nRegex,"").match(main.eggRegex);
w = (w!=null&&w.length>=0) ? w[1].toLowerCase() : "none";
switch(w) {
case "golden": w="gold"; break;
}
return w;
},

debug : function(s) {
var d=$g("#debugT");
if(!d) document.body.insertBefore(d=main.create("textarea", {id:"debugT",style:"position:fixed; top:20px; left:20px; width:95%; height:90%; color:#000000; background:#ffffff; border:3px ridge #000000; z-index:99999;",ondblclick:function(e){e.target.style.display="none";}}, new Array(main.create("text",s))), document.body.firstChild);
	else d.innerHTML+="\n"+s;
if(d.style.display=="none") d.style.display="";
},

getAccepted : function() {
return (new Function("return "+GM_getValue("fvwm_accepted", "({bonus:[],hatch:[],adopt:[],bouquet:[]})")+";"))();
},

setAccepted : function(e) {
GM_setValue("fvwm_accepted", e.toSource());
},

open : function(item, key, w) {
if(!$g("#"+key)) var frame=$g("#fvwm_silent_req_holder").appendChild(main.create("iframe", {src:item.href, id:key, style:"display:none;visibility:hidden;width:0;height:0;", onload:function(e) {
var doc=e.target.contentDocument;
if(doc.evaluate("//text()[contains(.,'bits got lost on the way to your computer')] | id('errorPageContainer')", doc, null, 8, null).singleNodeValue) e.target.src=e.target.src;
else {
var acc=main.getAccepted();
acc[w].push(e.target.id);
main.setAccepted(acc);
item.textContent = main.accText[w];
main.remove(e.target);
}
}}));
window.setTimeout(function(e){main.remove(e);}, main.reqtimeout*1000, key);
},

get currReqs() {
return $g(".//iframe",{node:$g("#fvwm_silent_req_holder")}).snapshotLength;
},

get refTime() {
var t=GM_config.get("arinterval"), r=Math.round(Math.random()*(t*1000));
return Math.round((t*60000)+r);
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

status : function(e) {
$g("#fvwm_status").textContent = "[FvT] "+main.currReqs+" Tane Bekliyor.";
},

refresh : function() {
if(main.currReqs==0 && !$g("#GM_config")) location.replace(GM_config.get("filteronly")==true?"http://www.facebook.com/home.php?filter=app_102452128776&show_hidden=true&ignore_self=true":main.realURL);
	else window.setTimeout(main.refresh, main.currReqs*1000);
},

getKey : function(b) {
return b.replace(main.ampRegex,"&").split("&key=")[1].split("&")[0];
},

run : function() {
if(!$g("#home_stream")) return;
		if(main.toOn==false && main.currReqs>10) {
		main.to=window.setTimeout(function(main){main.toOn=false; main.run();}, (main.currReqs*500), main);
		main.toOn=true;
		return;
		}
		var maxSuddenRequests=10-main.currReqs,
			wallposts=$g(".//a[contains(.,'Get a bonus') or contains(.,'Hatch an egg') or contains(.,'Adopt the') or contains(.,'Get a Flower Bouquet') or contains(.,'Get a Perfect Bunch')]/.[contains(@href,'onthefarm/track')]", {type:7,node:$g("#home_stream")}),
			max=wallposts.snapshotLength<maxSuddenRequests?wallposts.snapshotLength:maxSuddenRequests, acc=main.getAccepted();

// Loop through and grab stuff
for(let i=0,item; ((i<max) && (item=wallposts.snapshotItem(i))); i++) {
var key = main.getKey(item.href),
	w = main.which(item.textContent),
	animal = w=="adopt"?main.whichAnimal(item.textContent):"",
	egg = w=="hatch"?main.whichEgg(item):"";
if(main.cfg[w]==true && !acc[w].inArray(key)) {
if((w=="adopt"?GM_config.get(animal):true) && (w=="hatch"?GM_config.get(egg):true)) main.open(item, key, w); // open request in iframe
} else if(main.cfg[w]==true) item.textContent = main.accText[w];
}
}
};

if(main.realURL.indexOf("home.php")!=-1 && ((GM_config.get("filteronly")==true&&main.realURL.indexOf("filter=app_102452128776")!=-1)||GM_config.get("filteronly")==false)) { // Ana Beslemeyi Gösteren Ana Deger
document.body.insertBefore(main.create("div", {id:"fvwm_silent_req_holder",style:"display:none;visibility:hidden;width:0;height:0;"}), document.body.firstChild); // Istekler Için iframe Ekleme

if(GM_config.get("showstatus")==true) {
document.body.insertBefore(main.create("div", {id:"fvwm_status",style:"position:fixed; top:0; left:0; padding:10px 8px 8px 6px; color:#FFFFFF; background:#415193; font-family: arial, verdana, sans-serif; font-size:1em; z-index:99998;",textContent:"[FvT] 0 TAne Bekliyor"}), document.body.firstChild); // add status text to page
window.setInterval(main.status, 1000); // Güncelleme Durumu
}

main.run(); // Ana Program Çalismasi

if($g("#home_stream")) $g("#home_stream").addEventListener("DOMNodeInserted", function(e){window.setTimeout(function(){main.run();}, 0);}, false);

window.addEventListener("load", function(e) { // Ajax Çalisiyor
if(GM_config.get("similar")==true) {
// Auto click "show x similar posts" links
var similarposts=$g(".//a[contains(.,'SHOW') and contains(.,'SIMILAR POSTS')]", {node:$g("#home_stream")});
for(let i=0,item; (item=similarposts.snapshotItem(i)); i++) main.click(item);
}
main.run();
}, false);

// add option to reset accepted items
GM_registerMenuCommand("FvT Itemleri Resetle", function() {
if(confirm("Kabul Edilenleri Resetlemek Istiyormusun?")) GM_deleteValue("fvwm_accepted");
});

if(GM_config.get("autorefresh")==true) window.setTimeout(main.refresh, main.refTime); // Otomatik Yenileme Aktif
} else if(document.title=="Sayfa Yuklenirken Hata Olustu" && main.realURL.indexOf("home.php")!=-1) main.refresh();

GM_registerMenuCommand("Farmville Türkiye Ayarlar", GM_config.open); // Script Kisayollari