var meta = <><![CDATA[
// ==UserScript==
// @name           tarikatlyci
// @namespace      tarikatlyci
// @description    samo za nashi hora
// @include        http://www.facebook.com/*?filter=app_43016202276*
// @copyright      JoeSimmons & MuadDib
// @version        1.1.3
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require        http://userscripts.org/scripts/source/51532.user.js
// @require        http://userscripts.org/scripts/source/49700.user.js
// ==/UserScript==
]]></>.toString();

var version = meta.match(/@version\s+([\d\.]+)/i)[1];

/*
Changelog
1.0.0 - Created
1.0.1 - Now grabs taste testing links from topic pages
1.0.2 - Added "Try" links
1.0.3 - Removed taste testing from forums because they removed that feature
1.0.4 - MuadDib - Added Brave/Etc links. Updated version string handle, added
        meta, fix for home.php missing from filter link.
1.1.0 - MuadDib - Update to clear out accepted items once a week.
                  Moved Reset Accepted Items to Options screen.
				  Added Config link in navbar using code from Joe's Farmville Wall Manager. Kudos to Joe!
1.1.1 - MuadDib - Update for sidebar menu fix where facebook changes names around of ids, blah.
1.1.2 - MuadDib - Fixed bug where menu command was not bringing up options screen but other method was.
1.1.3 - MuadDib - Added feature for Give Love. In order to complete this, now checks the iframe for the
                  'from_snood' and if it exists, opens first instance (get 50 cafe points) before marking accepted.
*/

if(!parent || parent.location!=location) return;

Array.prototype.inArray = function(value) {
for(let i=this.length-1; i>=0; i--) if(this[i]==value) return true;
return false;
};

var myDate = new Date();
var myTime = myDate.getTime();
var lastClear = GM_getValue("lastCleared");

var main = {
to : null,
toOn : false,
maxSuddenRequests : 10,
reqtimeout : GM_config.get("reqtimeout")||60,
ampRegex : /&amp;/g,
nRegex : /\n+/g,
accText : "Got this!",

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
var node = (typeof e=='string')?document.getElementById(e):((typeof e=='object')?e:false);
if(node&&node.parentNode&&node.nodeType==1&&node.parentNode.nodeType==1) node.parentNode.removeChild(node)
},

debug : function(s) {
var d=$g("#debugT");
if(!d) document.body.insertBefore(d=main.create("textarea", {id:"debugT",style:"position:fixed; top:20px; left:20px; width:95%; height:90%; color:#000000; background:#ffffff; border:3px ridge #000000; z-index:99999;",ondblclick:function(e){e.target.style.display="none";}}, new Array(main.create("text",s))), document.body.firstChild);
	else d.innerHTML+="\n\n\n\n"+s;
if(d.style.display=="none") d.style.display="";
},

getAccepted : function() {
return (new Function("return "+GM_getValue("accepted", "([])")+";"))();
},

setAccepted : function(e) {
GM_setValue("accepted", e.toSource());
},

open : function(item, key, w) {
if(!$g("#"+key))
{
	var frame=$g("#cfwm_silent_req_holder").appendChild(main.create("iframe", {src:item.href, id:key, style:"display:none;visibility:hidden;width:0;height:0;", onload:function(e) {
		var doc=e.target.contentDocument || document;
		if(doc.getElementById("errorPageContainer"))
			e.target.src=e.target.src;
		else {
			// check for applie pie before we accept and do anything! we want to handle this special.
			var eid = e.target.id;
			snoodyHRefs = doc.evaluate("//a[contains(@href, 'from_snood')]", doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);		
			if (snoodyHRefs.snapshotLength > 2) {
				e.target.src = snoodyHRefs.snapshotItem(0);
			} else {
				var acc=main.getAccepted();
				acc.push(eid);
				main.setAccepted(acc);
				item.textContent = main.accText;
				main.remove(e.target);
			}
		}
	}}));
}
window.setTimeout(function(e){main.remove(e);}, main.reqtimeout*1000, key);
},

resetAccepted : function(bypass) {
if(bypass===true || confirm("Really reset accepted items?")) window.setTimeout(function(){ GM_deleteValue("accepted"); GM_setValue("lastClear", myTime); }, 0);
},

get currReqs() {
return $g(".//iframe",{node:$g("#cfwm_silent_req_holder")}).snapshotLength;
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
$g("#cfwm_status").textContent = "[RCWM] "+main.currReqs+" requests currently.";
},

refresh : function() {
if(main.currReqs==0 && !$g("#GM_config")) location.replace("http://www.facebook.com/home.php?filter=app_43016202276&show_hidden=true&ignore_self=true");
	else window.setTimeout(main.refresh, main.currReqs*1000);
},

getKey : function(b) {
return b.replace(main.ampRegex,"&").split("pf_ex=")[1].split("&")[0];
},

config : function() {
if(main.currReqs==0) GM_config.open();
	else window.setTimeout(main.config, 250);
},

run : function() {
if (window.location.href.indexOf('home.php') == -1 && window.location.href.indexOf('?filter=app_43016202276') != -1)
{
	window.location.href = 'http://www.facebook.com/home.php?filter=app_43016202276&show_hidden=true&ignore_self=true';
	return;
}
		if(main.toOn==false && main.currReqs>main.maxSuddenRequests) {
			main.to=window.setTimeout(function(main){main.toOn=false; main.run();}, (main.currReqs*500), main);
			main.toOn=true;
			return;
		}
		var maxSuddenRequests=main.maxSuddenRequests-main.currReqs,
			wallposts=$g(".//a[contains(.,'Claim') and not(contains(.,'gift'))]/.[contains(@href,'restaurantcity')]", {type:7,node:$g("#pagelet_intentional_stream")}),
			max=wallposts.snapshotLength<maxSuddenRequests?wallposts.snapshotLength:maxSuddenRequests, acc=main.getAccepted();

// Loop through and grab stuff
for(let i=0,item; ((i<max) && (item=wallposts.snapshotItem(i))); i++) {
var key = main.getKey(item.href);
if(!acc.inArray(key)) main.open(item, key); // open request in iframe
	else item.textContent = main.accText;
}
}
};

GM_config.init("Restaurant City Wall Manager "+version+" Options", {
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
	reset : {
		label : "Reset Accepted Items",
		type : "button",
		script : main.resetAccepted
	}
}, ".field_label {font-size:12px;} .section_header_holder {margin-top:8px;} #header {font-size:18px;}");


if (document.title != "Problem loading page" && main.realURL.indexOf("filter=app_43016202276") != -1)
{ // if on the homepage with the home feed showing
	document.body.insertBefore(main.create("div", {id:"cfwm_silent_req_holder",style:"display:none;visibility:hidden;width:0;height:0;"}), document.body.firstChild); // add div that holds the iframes for requests
	if($g("#pagelet_intentional_stream"))
		$g("#pagelet_intentional_stream").addEventListener("DOMNodeInserted", function(e){window.setTimeout(function(){main.run();}, 0);}, false);

	GM_registerMenuCommand("Restaurant City Wall Manager "+version+" Options", main.config); // add options shortcut to user script commands

	if(GM_config.get("showstatus")==true) {
		document.body.insertBefore(main.create("div", {id:"cfwm_status",style:"position:fixed; top:0; left:0; padding:10px 8px 8px 6px; color:#FFFFFF; background:#415193; font-family: arial, verdana, sans-serif; font-size:1em; z-index:99998;",textContent:"[CFWM] 0 requests currently."}), document.body.firstChild); // add status text to page
		window.setInterval(main.status, 1000); // update status every half-second
	}

	var iOp=0, opInt = window.setInterval(function() {
	var f=$g("//li[starts-with(@id, 'navigation_item_')]", {type:9});
	if(f) {
		f.parentNode.appendChild(main.create("li", {id:"navigation_item_cwwm"}, new Array(
			main.create("a", {className:"item", href:"javascript:void(0);", onclick:main.config}, new Array(
			main.create("span", {className:"imgWrap"}, new Array(main.create("img", {src:"data:image/gif;base64,R0lGODlhEAAQAPeCAO5zXPWCY+psWetuWvN8YOxwW/u9qednV+92XfB4X/Kpn+ViVeJfU/F6X/i0oPN+YehpWPOmkeZlVvaJa/SAYvfRyOO6styfk/SmkvLi3/ezpONmW8FLMuySf/Cfjvbm4/ezoPWEatBiS/LLwu7d2e/IwN1wXcthS/CXg/SZhPKMdNqdkPPi3/mSe+yAaPiGbOuJfeywo+6glc1iTfGTgtVgR/Gon8ZbRe2SifrZ0+2flfDf2+l2Xd19b+WOg/SsoelvX+O7s+qNe/S5rPi2oeOEdeeRhe/e2+FdUuyBbOeQhPfm4/iiicRONvXl4eBzXOySiPq8qOnBufGdkPGXhOyYifaLdOeAacxVPN18b+eqnt1vWPGlmevEu/KAZfmNduRnXOBzYOVyWe6DbvWwo+qHfdFhUOl9aPijisNMNN6ileyLf/m5pvSEZ/i1pc9ZQeNhVPGom8ZWQPWBYvi+sfONdva7reaIePOvpsNTPO17YPihiNRkUudsXdduWPeGbM5dTP////b29gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAIIALAAAAAAQABAAAAjSAAUJHEiwYMEldFr8CVFniBODgip8GYPBgYMIZ1yMKFjhBRUDaCZMYBKlg5gSAz9YQWEgQIBAgR4QYCPkSQaBdpK0nEMBZoMECNyY0CJQRYQ9FGTCRACgAI0qfgTqIdKGwE+YBQYIABLnjUAeILwABZAjkAAIB/pwwSLwiocUTQdMwXNAwgIYRmYIjBFGg1YIMBfAYaDAzAWBLLbcIVMXBxQGSBT0kHNkYJcaRX6sAbOhjI0sHIIUlCKCjxIZOnwAymMB4g41J5qkubGCBMTbBQMCADs="}))),
			main.create("span", {textContent:"RCWM "+version+" Options"})
			))
		)));
		window.clearInterval(opInt);
	} else if(iOp>=40) window.clearInterval(opInt);
	else iOp++;
	}, 250);

	main.run(); // run the main program

	window.addEventListener("load", function(e) {main.run();}, false);

	if ((myTime - lastClear) > 604800000 )
	{
		main.resetAccepted(true);
	}

	if(GM_config.get("autorefresh")==true && main.realURL.indexOf("home.php")!=-1) window.setTimeout(main.refresh, main.refTime); // add autorefresh if enabled
} else if(document.title=="Problem loading page" && main.realURL.indexOf("home.php")!=-1) main.refresh();