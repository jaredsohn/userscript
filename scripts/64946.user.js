// ==UserScript==
// @name           FarmVille Wall Manager
// @namespace      http://userscripts.org/users/23652
// @description    Manages farmville wall posts; accepts bonuses, grabs bouquets, adopts animals, hatches eggs, and more
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @copyright      JoeSimmons
// @version        1.1.9
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require        http://userscripts.org/scripts/source/51532.user.js
// @require        http://userscripts.org/scripts/source/49700.user.js
// @require        http://sizzlemctwizzle.com/updater.php?id=62135
// ==/UserScript==

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
1.1.9 - penguins added. no more seasonal animals to be added
*/

if(!parent || parent.location!=location) return;

Array.prototype.inArray = function(value) {
for(let i=this.length-1; i>=0; i--) if(this[i]==value) return true;
return false;
};

var main = {
to : null,
toOn : false,

reqtimeout : GM_config.get("reqtimeout")||60,

whichRegex : /(bonus|hatch|adopt|bouquet|perfect bunch|present)(?: an egg| the)?/i,
ampRegex : /&amp;/g,
animalRegex : /(?:brown |pink |black |green |lonely )?(cow|turtle|turkey|sheep|kitten|duckling|rabbit|reindeer|bull|calf|penguin)/i,
eggRegex : /(?:premium |uncommon |rare |treasured )?(white|brown|black|golden)( mystery eggs)/i,
nRegex : /\n+/g,
accText : {
			bonus : "Bonus Accepted!",
			hatch : "Hatched this egg!",
			adopt : "Animal Adopted!",
			bouquet : "Got this bouquet!",
			present : "Got this present!"
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
	else d.innerHTML+="\n\n\n\n"+s;
if(d.style.display=="none") d.style.display="";
},

resetAccepted : function() {
if(confirm("Really reset accepted items?")) window.setTimeout(function(){GM_deleteValue("fvwm_accepted");}, 0);
},

getAccepted : function() {
return (new Function("return "+GM_getValue("fvwm_accepted", "({bonus:[],hatch:[],adopt:[],bouquet:[],present:[]})")+";"))();
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
$g("#fvwm_status").textContent = "[FVWM] "+main.currReqs+" requests currently.";
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
			wallposts=$g(".//a[contains(.,'Get a') or contains(.,'Hatch an egg') or contains(.,'Adopt the')]/.[contains(@href,'onthefarm/track')]", {type:7,node:$g("#home_stream")}),
			max=wallposts.snapshotLength<maxSuddenRequests?wallposts.snapshotLength:maxSuddenRequests, acc=main.getAccepted();

// Loop through and grab stuff
for(let i=0,item; ((i<max) && (item=wallposts.snapshotItem(i))); i++) {
var key = main.getKey(item.href),
	w = main.which(item.textContent),
	animal = w=="adopt"?main.whichAnimal(item.textContent):"",
	egg = w=="hatch"?main.whichEgg(item):"";
if(GM_config.get(w)==true && !acc[w].inArray(key)) {
if((w=="adopt"?GM_config.get(animal):true) && (w=="hatch"?GM_config.get(egg):true)) main.open(item, key, w); // open request in iframe
} else if(GM_config.get(w)==true) item.textContent = main.accText[w];
}
}
};

GM_config.init("FarmVille Wall Manager 1.1.9 Options", {
	bonus : {
		section : [
		"Manager Options"
		],
		label : "Accept Bonuses?",
		type: "checkbox",
		"default" : true
	},
	hatch : {
		label : "Hatch Eggs?",
		type: "checkbox",
		"default" : true
	},
	adopt : {
		label : "Adopt Animals?",
		type: "checkbox",
		"default" : true
	},
	bouquet : {
		label : "Get Bouquets?",
		type: "checkbox",
		"default" : true
	},
	present : {
		label : "Get Presents?",
		type: "checkbox",
		"default" : true
	},
	cow : {
		section : [
		"Specific Animal Adoption"
		],
		label : "Cows",
		type : "checkbox",
		"default" : true
	},
	penguin : {
		label : "Penguins",
		type : "checkbox",
		"default" : true
	},
	bull : {
		label : "Bulls",
		type : "checkbox",
		"default" : true
	},
	calf : {
		label : "Calves",
		type : "checkbox",
		"default" : true
	},
	turtle : {
		label : "Turtles",
		type : "checkbox",
		"default" : true
	},
	turkey : {
		label : "Turkey",
		type : "checkbox",
		"default" : true
	},
	sheep : {
		label : "Sheep",
		type : "checkbox",
		"default" : true
	},
	kitten : {
		label : "Black Kittens",
		type : "checkbox",
		"default" : true
	},
	duckling : {
		label : "Ugly Ducklings",
		type : "checkbox",
		"default" : true
	},
	rabbit : {
		label : "Rabbits",
		type : "checkbox",
		"default" : true
	},
	reindeer : {
		label : "Reindeer",
		type : "checkbox",
		"default" : true
	},
	white : {
		section : [
		"Specific Egg Hatching"
		],
		label : "Hatch white eggs",
		type : "checkbox",
		"default" : true
	},
	brown : {
		label : "Hatch brown eggs",
		type : "checkbox",
		"default" : true
	},
	black : {
		label : "Hatch black eggs",
		type : "checkbox",
		"default" : true
	},
	gold : {
		label : "Hatch golden eggs",
		type : "checkbox",
		"default" : true
	},
	reqtimeout : {
		section : [
		"Other Options"
		],
		label : "Request Timeout (secs)",
		type : "float",
		"default" : 60
	},
	autorefresh : {
		label : "Auto refresh?",
		type : "checkbox",
		"default" : true
	},
	arinterval : {
		label : "Auto refresh interval (mins)",
		type : "float",
		"default" : 2
	},
	showstatus : {
		label : "Show debug status bar?",
		type : "checkbox",
		"default" : true
	},
	similar : {
		label : "Auto click show similar posts links?",
		type : "checkbox",
		"default" : true
	},
	filteronly : {
		label : "Run only on farmville filter page?",
		type : "checkbox",
		"default" : false
	},
	reset : {
		label : "Reset Accepted Items",
		type : "button",
		script : main.resetAccepted
	}
}, ".field_label {font-size:12px;} .section_header_holder {margin-top:8px;} #header {font-size:18px;}");

if(main.realURL.indexOf("home.php")!=-1 && (GM_config.get("filteronly")==true?main.realURL.indexOf("filter=app_102452128776")!=-1:true)) { // if on the homepage with the home feed showing
document.body.insertBefore(main.create("div", {id:"fvwm_silent_req_holder",style:"display:none;visibility:hidden;width:0;height:0;"}), document.body.firstChild); // add div that holds the iframes for requests

$g("#home_stream").addEventListener("DOMNodeInserted", function(e){window.setTimeout(function(){main.run();}, 0);}, false);

GM_registerMenuCommand("FarmVille Wall Manager Options", GM_config.open); // add options shortcut to user script commands

if(GM_config.get("showstatus")==true) {
document.body.insertBefore(main.create("div", {id:"fvwm_status",style:"position:fixed; top:0; left:0; padding:10px 8px 8px 6px; color:#FFFFFF; background:#415193; font-family: arial, verdana, sans-serif; font-size:1em; z-index:99998;",textContent:"[FVWM] 0 requests currently."}), document.body.firstChild); // add status text to page
window.setInterval(main.status, 1000); // update status every half-second
}

main.run(); // run the main program

window.addEventListener("load", function(e) {
if(GM_config.get("similar")==true) {
// Auto click "show x similar posts" links
var similarposts=$g(".//a[contains(.,'SHOW') and contains(.,'SIMILAR POSTS')]", {node:$g("#home_stream")});
for(let i=0,item; (item=similarposts.snapshotItem(i)); i++) main.click(item);
}
main.run();
}, false);

if(GM_config.get("autorefresh")==true) window.setTimeout(main.refresh, main.refTime); // add autorefresh if enabled
} else if(document.title=="Problem loading page" && main.realURL.indexOf("home.php")!=-1) main.refresh();