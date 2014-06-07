// ==UserScript==
// @name           Developer (functions library)
// @namespace      http://userscripts.org/users/23652
// @description    Tons of assorted developer functions ranging from button removal to element fade-ins to advanced xpath grabbers.
// @include        http://*
// @include        https://*
// @include        file:///*
// @copyright      JoeSimmons
// @version        1.0.3
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

// Created by avg, modified by JoeSimmons
function create(a,b,c) {
	var ret=document.createElement(a.toLowerCase());
	if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(",style,accesskey,id,name,src,href".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
	if(c) for(var i=0,l=c.length; i<l; i++) ret.appendChild(c[i]);
	return ret;
}

// Define GM_addStyle if it's not Firefox
if(typeof GM_addStyle==='undefined') 
    GM_addStyle = function(css) {
        var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
        if (!head) {return}
        style.type = 'text/css';
        try {style.innerHTML = css} catch(x) {style.innerText = css}
        head.appendChild(style);
    }

// replaceText
// Pass the search text and the replacement text, optional search node
// Syntax: replaceText("search text", "replacement text", search node (i.e., document.body));
function replaceText(s1, s2, node) {
if(!s1 || !s2 || typeof s1!='string' || typeof s2!='string') return;
var node = node || document,
	doc = node.ownerDocument || node,
	texts = doc.evaluate(".//text()[normalize-space(.)!='']",node,null,6,null),
	regex = new RegExp(s1.replace(/(\{|\}|\[|\]|\(|\)|\\|\/|\$|\^|\*|\+|\?|\.)/gm,"\\$1"), 'gi');
for(var i=texts.snapshotLength-1;(item=texts.snapshotItem(i));i--) item.textContent=item.textContent.replace(regex,s2);
}

// Remove link(s) function
// Pass (part of) the text of the link(s) you want removed
function removeLink(text) {
var links = document.evaluate("//a[contains(., '"+escape(text)+"')]",document,null,6,null);
for(var i=links.snapshotLength-1; (item=links.snapshotItem(i)); i--) item.parentNode.removeChild(item);
}

// Remove button(s) function
// Pass (part of) the text of the button(s) you want removed
function removeButton(text) {
var buttons = document.evaluate("//button[contains(., '"+escape(text)+"')] | //input[@type='button' and contains(@value, '"+escape(text)+"')] | //input[@type='submit' and contains(@value, '"+escape(text)+"')]",document,null,6,null);
for(var i=buttons.snapshotLength-1; (item=buttons.snapshotItem(i)); i--) item.parentNode.removeChild(item);
}

// Fade. Fade in/out by id and choose speed: slow, medium, or fast
// Syntax: fade('idhere', 'out', 'medium');
function fade(e, dir, s) {
if(!e || !dir || typeof dir!='string' || (dir!='out'&&dir!='in')) {return;} // Quit if node/direction is omitted, direction isn't in/out, or if direction isn't a string
dir=dir.toLowerCase(); s=s.toLowerCase(); // Fix case sensitive bug
var node = (typeof e=='string') ? $(e) : e, // Define node to be faded
	speed = {slow : 400, medium : 200, fast : 50};
if(!s) var s='medium'; // Make speed medium if not specified
if(s!='slow' && s!='medium' && s!='fast') s='medium'; // Set speed to medium if specified speed not supported
if(dir=='in') node.style.opacity = '0';
else if(dir=='out') node.style.opacity = '1';
node.style.display='';
var intv = setInterval(function(){
if(dir=='out') {
if(parseFloat(node.style.opacity)>0) node.style.opacity = (parseFloat(node.style.opacity)-.1).toString();
else {
clearInterval(intv);
node.style.display='none';
}
}
else if(dir=='in') {
if(parseFloat(node.style.opacity)<1) node.style.opacity = (parseFloat(node.style.opacity)+.1).toString();
else {
clearInterval(intv);
}
}
}, speed[s]);
}

// center
// Instructions: Supply an id string or node element as a first argument
function center(e) {
var node = (typeof e=='string') ? document.getElementById(e) : ((typeof e=='object') ? e : false);
if(!window || !node || !node.style) {return;}
var style = node.style, beforeDisplay = style.display, beforeOpacity = style.opacity;
if(style.display=='none') style.opacity='0';
if(style.display!='') style.display = '';
style.top = Math.floor((window.innerHeight/2)-(node.offsetHeight/2)) + 'px';
style.left = Math.floor((window.innerWidth/2)-(node.offsetWidth/2)) + 'px';
style.display = beforeDisplay;
style.opacity = beforeOpacity;
}

// get() function
// Syntax: get('http://www.google.com/', handleResponse);
function get(url, cb) {
GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    //headers: {'Accept': 'application/atom+xml,application/xml,text/xml,text/html'},
    onload: function(r) {cb(r);}
});
}

// post() function
// Syntax: post('https://www.google.com/accounts/ServiceLoginAuth?service=youtube', 'Email=thetenfold&Passwd=catsdogs', handleResponse);
function post(url, data, cb) {
GM_xmlhttpRequest({
    method: 'POST',
    url: url,
    headers: {
		'Content-type' : 'application/x-www-form-urlencoded',
        'Accept': 'application/atom+xml,application/xml,text/xml,text/html'
    },
	data: encodeURI(data),
    onload: function(r) {cb(r);}
});
}

// xAll (delete all)
// Syntax: xAll( document.evaluate("//a[contains(@href, 'google')]",document,null,6,null) );
function xAll(array) {
if(array.snapshotItem) for(var i=array.snapshotLength-1; i>=0; i--) array.snapshotItem(i).parentNode.removeChild(array.snapshotItem(i));
else if(!array.snapshotItem) for(var i=array.length-1; i>=0; i--) array[i].parentNode.removeChild(array[i]);
}

// Delete id/node
// Syntax: del('gbar');
function del(e) {
var node = (typeof e=='string')?document.getElementById(e):((typeof e=='object')?e:false);
if(node&&node.parentNode&&node.nodeType==1&&node.parentNode.nodeType==1) {node.parentNode.removeChild(node);return true;}
else {return false;}
}

// Toggle visibility of id/node
// Syntax: toggle('gbar');
function toggle(e) {
var node=(typeof e=='string')?document.getElementById(e):((typeof e=='object')?e:false);
node.style.display=(node.style.display!='none')?'none':'';
}

// Remove element by class
// Syntax: removeElemByClass('red');
function removeElemByClass(cl, tag) {
if(array=document.evaluate("//"+(tag||'*')+"[@class='"+cl+"']", document, null, 6, null))
for(var i=array.snapshotLength-1; (item=array.snapshotItem(i)); i--) item.parentNode.removeChild(item);
}

// XPath
function xp(exp, t, n) {
var x = document.evaluate(exp||"//body",n||document,null,t||6,null);
if(t && t>-1 && t<10) switch(t) {
case 1: x=x.numberValue; break;
case 2: x=x.stringValue; break;
case 3: x=x.booleanValue; break;
case 8: case 9: x=x.singleNodeValue; break;
} return x;
}

// Add a script to the page to be used globally
function addScript(aS_text) {
if(aS_text&&(h=document.getElementsByTagName('head')[0])) {
var aS = document.createElement('script');
aS.type = 'text/javascript';
aS.innerHTML = aS_text;
h.appendChild(aS);
}
}

// getPref
// Syntax: "?width=80&height=25".getPref("width"); // Returns 80
String.prototype.getPref = function(s, splitter) {
return this.split(s+"=")[1].split((splitter||"7"))[0];
};

// clickButton
// Syntax: clickButton('type=submit; value=Google Search;');
function clickButton(val) {
var expr='', vals = {
name:(val.split("name=")[1]||'').split(";")[0],
value:(val.split("value=")[1]||'').split(";")[0],
id:(val.split("id=")[1]||'').split(";")[0],
class:(val.split("class=")[1]||'').split(";")[0],
type:(val.split("type=")[1]||'').split(";")[0],
onclick:(val.split("onclick=")[1]||'').split(";")[0]
};
for(v in vals) if(vals[v]!='') expr += 'contains(@'+v+', \''+vals[v]+'\') and ';
if(button=document.evaluate("//input["+expr.replace(/( and )$/,'')+"]",document,null,9,null).singleNodeValue) button.click();
}

// Click
// Syntax: click(element); // String argument will grab it by id, or you can supply an element
function click(e, type) {
if(!e && typeof e=='string') e=window.document.getElementById(e);
if(!e) {return;}
var evObj = document.createEvent('MouseEvents');
evObj.initMouseEvent((type||'click'),true,true,window,0,0,0,0,0,false,false,false,false,0,null);
e.dispatchEvent(evObj);
}

// $g. Supports ID, Class, and XPath (full with types) in one query
// Supports multiple id/class grabs in one query (split by spaces), and the ability to remove all nodes regardless of type
// See script page for syntax examples: http://userscripts.org/scripts/show/51532
function $g(que, obj) {
if(!que || !(que=que.replace(/^\s+/,''))) return;
var obj=obj||({del:false,type:6,node:document}), r,
	idclass_re=/^[#\.][^\/]/, xp_re=/^\.?(\/\/|count|id)/;
if(typeof que!='string' || que=='') return false;
else if(idclass_re.test(que)) {
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
r = document.evaluate(que,(obj['node']||document),null,(obj['type']||6),null);
switch((obj['type']||6)){
case 1: r=r.numberValue; break;
case 2: r=r.stringValue; break;
case 3: r=r.booleanValue; break;
case 8: case 9: r=r.singleNodeValue; break;
}
}
if(r && obj['del']===true) {
if(r.nodeType==1) r.parentNode.removeChild(r);
else if(r.snapshotItem) for(var i=r.snapshotLength-1; (item=r.snapshotItem(i)); i--) item.parentNode.removeChild(item);
else if(!r.snapshotItem) for(var i=r.length-1; i>=0; i--) if(r[i]) r[i].parentNode.removeChild(r[i]);
} return r;
}

// Get ID
function $(ID) {return document.getElementById(ID);}

// prepareRegex by JoeSimmons
// Used to take a string and ready it for use in new RegExp()
String.prototype.prepareRegex = function() {
return this.replace(/([\[\]\*\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
};

// getPosition
function getPosition(e) {
var top=left=0;
if(e.offsetParent) {
do {
top += e.offsetTop;
left += e.offsetLeft;
} while(e=e.offsetParent);
}
return [top,left];
}

// getPref by JoeSimmons
// Syntax: "?width=80&height=25".getPref("width"); // Returns 80
String.prototype.getPref = function(s, splitter) {
return this.split(s+"=")[1].split((splitter||"&"))[0];
};

// inArray
Array.prototype.inArray = function(value) {
for(var i=0; i < this.length; i++) if(this[i]===value) return true;
return false;
};