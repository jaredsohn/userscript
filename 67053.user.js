var meta = <><![CDATA[
// ==UserScript==
// @name           serkan12 FarmDuvar Yoneticisi
// @namespace      http://userscripts.org/users/23652
// @description    Manages farmville wall posts; accepts collectablees, grabs bouquets, adopts animals, hatches eggs, and more
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @copyright      s3rkan12 
// @version        1.2.08
// @license        http://www.s3rkan12.com
// @require        http://userscripts.org/scripts/source/51532.user.js
// @require        http://userscripts.org/scripts/source/49700.user.js
// @require        http://sizzlemctwizzle.com/updater.php?id=62135
// ==/UserScript==
]]></>.toString();

var version = meta.match(/@version\s+([\d\.]+)/i)[1];

/*
Changelog (late start, I know)
1.0.4 - fixed silent url calls
1.0.5 - added a little handling of 404 not found pages and others that aren't successfully loaded
1.0.6 - trying out loading in iframes
1.0.7 - longer frame time, inArray reversed loop direction
1.0.8 - added listener to iframes so they close only after fully loading, fixed inArray, added status bar in top left
1.0.9 - changed status update interval, fixed autorefresh interval, optimized code a little, tried to fix unsafeWindow GM_getValue bug
1.1.0 - added auto clicking of similar posts link
1.1.1 - putting the similar posts automater function in the nodeinserted listener, very bad idea. put it in the onload to run once instead
1.1.2 - fixed bug with it not saving all items, made it reload on farmville filter even if not on it before
1.1.3 - doesnt refresh when config open, added status bar toggle option, changed filter option to hide yourself, fixed inArray bug
1.1.4 - added option to click similar posts links, changed updater, made it only accept 10 at a time and queue the rest
1.1.5 - boosted speed, added request timeout checking and option, added option to only run on fv filter page, added specific animal adoption
1.1.6 - added specific egg hatching, boosted speed
1.1.7 - added bulls & calves, added present grabbing
1.1.8 - switched reset option to config screen, fixed black kitten bug (thx dane louis), fixed major bug that made it not work
1.1.9 - penguins added. no more seasonal animals to be added, added mystery boxes
1.2.00 - added white kittens, fixed special presents
1.2.01 - added unknown animal adoption, optimized speed, added fuel
1.2.02 - added max request option, changed default max requests to 5
1.2.03 - major optimizations
1.2.04 - changed the default max requests number due to facebook banning
1.2.05 - added barn collectablees
1.2.06 - fixed the biggest bug there was and ever will be
1.2.07 - added the event listener back in, removed winter animals/items
1.2.08 - removed event listener method, it's very slow, added back in winter animals/items since they still seem to be there when they shouldn't be
*/

if(!parent || parent.location!=location) return;

// Get ID
function $(ID,root) {return (root||document).getElementById(ID);}

Array.prototype.inArray = function(value) {
for(let i=this.length-1; i>=0; i--) if(this[i]==value) return true;
return false;
};

var main = {
to : null,
toOn : false,

reqtimeout : 60000,
maxrequests : 1,

opts : {
	collectable : true,
	hatch : true,
	adopt : true,
	bouquet : true,
	present : true,
	box : true, 
	fuel : true,
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
	white : true,
	brown : true,
	black : true,
	gold : true,
	showstatus : true,
	none : true
},

whichRegex : /(collectable|hatch|adopt|bouquet|perfect bunch|present|fuel|help)/,
ampRegex : /&amp;/g,
animalRegex : /(?:brown |pink |black |green |lonely |white )?(cow|turtle|turkey|sheep|kitten|duckling|rabbit|bull|calf|penguin|kitty)/,
eggRegex : /(?:premium |uncommon |rare |treasured )?(white|brown|black|golden)( mystery eggs)/,
keyRegex : /&(?:amp;)?key=([^&]+)/,
nRegex : /\n+/g,
phpRegex : /#\/.*\.php/,

accText : {
			collectable : "Collectable Alindi!",
			hatch : "Yumurta Alindi!",
			adopt : "Hayvan Alindi!",
			bouquet : "Cicek Alindi!",
			present : "Hediye Alindi!",
			box : "Kutu Alindi!",
			fuel : "Benzin Alindi!"
		},

// Created by avg, modified by JoeSimmons
create : function(a,b,c) {
	if(a=="text") {return document.createTextNode(b);}
	var ret=document.createElement(a.toLowerCase());
	if(b) for(let prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(",style,accesskey,id,name,src,href,which".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
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
case "perfect bunch": w="bouquet"; break;
case "present": if(e.parentNode.parentNode.parentNode.textContent.indexOf("unwrapped")!=-1) w="box"; break;
case "help": w="collectable"; break;
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
return (new Function("return "+GM_getValue("fvwm_accepted", "({collectable:[],hatch:[],adopt:[],bouquet:[],present:[],box:[],fuel:[],none:[]})")+";"))();
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
stat.textContent = "[FVWM] "+main.currReqs+" requests currently.";
},

open : function(url, key, w) {
if((main.maxrequests-main.currReqs) == 0) { // make sure to stay under the request limit but still get all items
return; 
}
$("fvwm_silent_req_holder").appendChild(main.create("iframe", {src:url, which:w, id:key, style:"display:none;visibility:hidden;width:0;height:0;", onload:function(e) {
var doc=e.target.contentDocument, w=e.target.getAttribute("which"), key=e.target.getAttribute("id"), acc=main.getAccepted();
if(doc.body.textContent.indexOf("bits got lost on the way to your computer")==-1 && !$("errorPageContainer",doc)) {
acc[w].push(key);
main.setAccepted(acc);
$("item_"+key).textContent = main.accText[w];
main.remove(key);
}
}}));
window.setTimeout(main.remove, main.reqtimeout, key);
},

run : function() {
if(main.currReqs >= main.maxrequests) return;
		var opts=main.opts, wallposts=$g(".//a[contains(.,'Get') or contains(.,'help')"+(opts["hatch"]==true?" or contains(.,'Hatch')":"")+(opts["adopt"]==true?" or contains(.,'Adopt')":"")+"]/.[contains(@href,'onthefarm')]", {type:7,node:$("home_stream")});
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

GM_config.init("Serkan12 FarmDuvar "+version+" Ayarlari", {
	collectable : {
		section : [
		"Toplama Ayarlari"
		],
		label : "Collectable Alinsin mi?",
		type: "checkbox",
		"default" : true
	},
	hatch : {
		label : "Yumurta Alinsin mi?",
		type: "checkbox",
		"default" : true
	},
	adopt : {
		label : "Hayvan Alinsin mi?",
		type: "checkbox",
		"default" : true
	},
	unknown : {
		label : "Yeni Hayvanlar Alinsin mi? (guncelleme gerekmeden)",
		type: "checkbox",
		"default" : false
	},
	bouquet : {
		label : "Cicek Alinsin mi?",
		type: "checkbox",
		"default" : true
	},
	present : {
		label : "Hediye Alinsin mi?",
		type: "checkbox",
		"default" : true
	},
	box : {
		label : "Kutu Alinsin mi?",
		type: "checkbox",
		"default" : true
	},
	fuel : {
		label : "Benzin Alinsin mi?",
		type: "checkbox",
		"default" : true
	},
	cow : {
		section : [
		"Hayvan Toplama Ayarlari"
		],
		label : "Inek",
		type : "checkbox",
		"default" : true
	},
	penguin : {
		label : "Penguen",
		type : "checkbox",
		"default" : true
	},
	bull : {
		label : "Boga",
		type : "checkbox",
		"default" : true
	},
	calf : {
		label : "Buzagi",
		type : "checkbox",
		"default" : true
	},
	turtle : {
		label : "Kaplumbaga",
		type : "checkbox",
		"default" : true
	},
	turkey : {
		label : "Hindi",
		type : "checkbox",
		"default" : true
	},
	sheep : {
		label : "Koyun",
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
		label : "Cirkin Ordek",
		type : "checkbox",
		"default" : true
	},
	rabbit : {
		label : "Tavsan",
		type : "checkbox",
		"default" : true
	},
	reindeer : {
		label : "Geyik",
		type : "checkbox",
		"default" : true
	},
	white : {
		section : [
		"Yumurta Toplama Ayarlari"
		],
		label : "Beyaz Yumurta",
		type : "checkbox",
		"default" : true
	},
	brown : {
		label : "Kahve Yumurta",
		type : "checkbox",
		"default" : true
	},
	black : {
		label : "Siyah Yumurta",
		type : "checkbox",
		"default" : true
	},
	gold : {
		label : "Altin Yumurta",
		type : "checkbox",
		"default" : true
	},
	reqtimeout : {
		section : [
		"Diger Ayarlar"
		],
		label : "Kabul etme zaman asimi (saniye)",
		type : "float",
		"default" : 60
	},
	autorefresh : {
		label : "Otomatik F5?",
		type : "checkbox",
		"default" : true
	},
	arinterval : {
		label : "Oto F5 zaman asimi (saniye)",
		type : "float",
		"default" : 2
	},
	maxrequests : {
		label : "Ayni anda kac istek yakalasin",
		type : "float",
		"default" : 1
	},
	showstatus : {
		label : "Yakalanmamislari sol kosede goster?",
		type : "checkbox",
		"default" : true
	},
	similar : {
		label : "Benzer mesajlari goster?",
		type : "checkbox",
		"default" : true
	},
	filteronly : {
		label : "Sadece Farmwille sayfasinda calistir?",
		type : "checkbox",
		"default" : false
	},
	reset : {
		label : "Ayarlari sifirla",
		type : "button",
		script : main.resetAccepted
	}
}, ".field_label {font-size:12px;} .section_header_holder {margin-top:8px;} #header {font-size:18px;}");

GM_registerMenuCommand("s3rkan12 FarmDuvar "+version+" Ayarlari", GM_config.open); // add options shortcut to user script commands

if((main.realURL.indexOf("home.php")!=-1||main.realURL.indexOf("ref=home")!=-1) && (GM_config.get("filteronly")==true?main.realURL.indexOf("filter=app_102452128776")!=-1:true)) { // if on the homepage with the home feed showing

document.body.insertBefore(main.create("div", {id:"fvwm_silent_req_holder",style:"display:none;visibility:hidden;width:0;height:0;"}), document.body.firstChild); // add div that holds the iframes for requests

// method to speed up script considerably
for(var thing in main.opts) main.opts[thing] = GM_config.get(thing)==true?true:false;
main.reqtimeout = parseInt(GM_config.get("reqtimeout"))*60000 || 60000;
main.maxrequests = GM_config.get("maxrequests") || 1;

if(main.opts["showstatus"]==true) {
document.body.insertBefore(main.create("div", {id:"fvwm_status",style:"position:fixed; top:0; left:0; padding:10px 8px 8px 6px; color:#FFFFFF; background:#415193; font-family: arial, verdana, sans-serif; font-size:1em; z-index:99998;  display:none;",textContent:"[FVWM] 0 requests currently."}), document.body.firstChild); // add status text to page
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
