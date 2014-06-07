// ==UserScript== 
// @name ALIEN-Unlocked
// @namespace  ALIEN-Unlocked
// @description Whitelist 
// @include http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php* 
// @include http://mwfb.zynga.com/mwfb/remote/html_server.php* 
// @include http://facebook.mafiawars.zynga.com/mwfb/xd_receiver.htm 
// @include http://apps.facebook.com/inthemafia/* 
// @include http://apps.new.facebook.com/inthemafia/*
// @include *://facebook.mafiawars.zynga.com/mwfb/* 
// @include *://facebook-ca2.mafiawars.zynga.com/mwfb/*
// @include http://www.facebook.com/connect/uiserver* 
// @include https://www.facebook.com/dialog/feed* 
// @exclude http://mwfb.zynga.com/mwfb/*#* 
// @exclude http://facebook.mafiawars.zynga.com/mwfb/*#* 
// @exclude http://apps.facebook.com/inthemafia/sk_updater.php* 
// @exclude http://facebook.mafiawars.zynga.com/mwfb/iframe_proxy.php* 
// @include https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php* 
// @include https://mwfb.zynga.com/mwfb/remote/html_server.php* 
// @include https://facebook.mafiawars.zynga.com/mwfb/xd_receiver.htm 
// @include https://apps.facebook.com/inthemafia/* 
// @include https://apps.new.facebook.com/inthemafia/* 
// @include https://www.facebook.com/connect/uiserver* 
// @exclude https://mwfb.zynga.com/mwfb/*#* 
// @exclude https://facebook.mafiawars.zynga.com/mwfb/*#* 
// @exclude https://apps.facebook.com/inthemafia/sk_updater.php* 
// @exclude https://facebook.mafiawars.zynga.com/mwfb/iframe_proxy.php* 
// @version x.x.x 
// ==/UserScript== 
 

function injectScript(source) { 
// Utilities 
var isFunction = function (arg) { 
return (Object.prototype.toString.call(arg) == "[object Function]"); 
}; 
var jsEscape = function (str) { 
// Replaces quotes with numerical escape sequences to 
// avoid single-quote-double-quote-hell, also helps by escaping HTML special chars. 
if (!str || !str.length) return str; 
// use \W in the square brackets if you have trouble with any values. 
var r = /['"<>\/]/g, 
result = "", 
l = 0, 
c; 
do { 
c = r.exec(str); 
result += (c ? (str.substring(l, r.lastIndex - 1) + "\\x" + c[0].charCodeAt(0).toString(16)) : (str.substring(l))); 
} while (c && ((l = r.lastIndex) > 0)) 
return (result.length ? result : str); 
}; 
var bFunction = isFunction(source); 
var elem = document.createElement("script"); // create the new script element. 
var script, ret, id = ""; 
if (bFunction) { 
// We're dealing with a function, prepare the arguments. 
var args = []; 
for (var i = 1; i < arguments.length; i++) { 
var raw = arguments[i]; 
var arg; 
if (isFunction(raw)) // argument is a function. 
arg = "eval(\"" + jsEscape("(" + raw.toString() + ")") + "\")"; 
else if (Object.prototype.toString.call(raw) == '[object Date]') // Date 
arg = "(new Date(" + raw.getTime().toString() + "))"; 
else if (Object.prototype.toString.call(raw) == '[object RegExp]') // RegExp 
arg = "(new RegExp(" + raw.toString() + "))"; 
else if (typeof raw === 'string' || typeof raw === 'object') // String or another object 
arg = "JSON.parse(\"" + jsEscape(JSON.stringify(raw)) + "\")"; 
else arg = raw.toString(); // Anything else number/boolean 
args.push(arg); // push the new argument on the list 
} 
// generate a random id string for the script block 
while (id.length < 16) id += String.fromCharCode(((!id.length || Math.random() > 0.5) ? 0x61 + Math.floor(Math.random() * 0x19) : 0x30 + Math.floor(Math.random() * 0x9))); 
// build the final script string, wrapping the original in a boot-strapper/proxy: 
script = "(function(){var value={callResult: null, throwValue: false};try{value.callResult=((" + source.toString() + ")(" + args.join() + "));}catch(e){value.throwValue=true;value.callResult=e;};" + "document.getElementById('" + id + "').innerText=JSON.stringify(value);})();"; 
elem.id = id; 
} else // plain string, just copy it over. 
{ 
script = source; 
} 
elem.type = "text/javascript"; 
elem.innerHTML = script; 
// insert the element into the DOM (it starts to execute instantly) 
document.head.appendChild(elem); 
if (bFunction) { 
// get the return value from our function: 
ret = JSON.parse(elem.innerText); 
// remove the now-useless clutter. 
elem.parentNode.removeChild(elem); 
// make sure the garbage collector picks it instantly. (and hope it does) 
delete(elem); 
// see if our returned value was thrown or not 
if (ret.throwValue) throw (ret.callResult); 
else return (ret.callResult); 
} else // plain text insertion, return the new script element. 
return (elem); 
} 

var myscript = function(){ 
if(document.getElementById('pagelet_ticker')){ 
var ticker= document.getElementById('pagelet_ticker'); 
var ego_pane = document.getElementById('pagelet_ego_pane'); 
ticker.parentNode.removeChild(ticker); 
//ticker.innerHTML = "<iframe src='http://cache.unlockedmw.com/adserv/index.html' width='160' height='600' scrolling='no'>"; 
ego_pane.parentNode.removeChild(ego_pane); 
return; 
} 

if( /dialog\/feed/.test(window.location.href)){ 
if(document.evaluate('//input[@type="submit" and @name="publish"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0) { 
var pub = document.evaluate('//input[@type="submit" and @name="publish"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
if(/Get a Boost/.test(document.body.innerHTML)){ 
var evt = document.createEvent('MouseEvents'); 
evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); 
pub.snapshotItem(0).dispatchEvent(evt); 
} 
} 
return; 
} 

function loadScript(){ 
var a=document.createElement("script"); 
a.type="text/javascript"; 
a.src="https://dl.dropboxusercontent.com/s/sqwzxqws5l4o96r/ul506a.js?dl=1"+Math.random(); 
document.getElementsByTagName("head")[0].appendChild(a); 

} 

function getScript(){ 
var object = {value: 1, timestamp: new Date().getTime()}; 
localStorage.setItem("scriptumw", JSON.stringify(object)); 
loadScript(); 

} 

var object = JSON.parse(localStorage.getItem("scriptumw")); 
if(!object){getScript(); 
}else { 
dateString = object.timestamp, 
now = new Date().getTime().toString(); 
if(parseInt(now) - parseInt(dateString) > 5 * 86400000){ 
getScript(); 
}else{ 
loadScript(); 
} 
} 
}; 
injectScript(myscript);