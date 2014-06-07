// ==UserScript==
// @name           Funktionssammlung
// @namespace      Woems
// @include        *
// ==/UserScript==

/******** BASE FUNCTIONS ********/
function $(ID) {return document.getElementById(ID)}
// XPath
function $xs(xpath, rootdir) {return document.evaluate(xpath, rootdir || document, null, 9, null).singleNodeValue;}
function $x(p, context) {
  var i, arr = [], xpr = document.evaluate(p, context || document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}
function loop(xpath, func, rootdir) {
	xpath = document.evaluate(xpath, rootdir || document, null, 6, null);
	var I = xpath.snapshotLength;
	while(--I>=0) func(xpath.snapshotItem(I));
}
// Edit Nodes
function createElement(type, attributes, append){
  var node = document.createElement(type);
  for (var attr in attributes) if (attributes.hasOwnProperty(attr)) try { node[attr]=attributes[attr]; } catch(e) { node.setAttribute(attr, attributes[attr]); }
  if (append) append.appendChild(node);
  return node;
} // Example usage: var styles = createElement('link', {rel: 'stylesheet', type: 'text/css', href: basedir + 'style.css'});
function remove(node) {if(node)node.parentNode.removeChild(node);return remove;}
function insertAfter(newNode, node) { return node.parentNode.insertBefore(newNode, node.nextSibling); }
function insertBefore(newNode, node) { return node.parentNode.insertBefore(newNode, node); }
function onClick(button,func,type) { button.addEventListener(type || "click",function(event){ func(event.target,event); event.stopPropagation(); event.preventDefault(); }, true); }
// Position
function PosX(Node) { var ONL=Node.offsetLeft; var P = Node.offsetParent; while (P) { ONL+=P.offsetLeft; P = P.offsetParent; } return ONL; }
function PosY(Node) { var ONL=Node.offsetTop; var P = Node.offsetParent; while (P) { ONL+=P.offsetTop; P = P.offsetParent; } return ONL; }
function PosXY(obj) { var p = { x:0, y:0 }; do { p.x += obj.offsetLeft; p.y += obj.offsetTop; } while (obj = obj.offsetParent); return p; }
// Timer
function Interval(func, interval) { func(); window.setInterval(func,interval); }
function Timeout(func, interval) { window.setTimeout(func,interval); }  // Timeout(function () {},1000);
// Save
function deserialize(name, def) { return eval(GM_getValue(name, (def || '({})'))); }
function serialize(name, val) { GM_setValue(name, uneval(val)); }
// XHTML
function get(url, cb) { GM_xmlhttpRequest({ method: "GET", url: url, onload: function(xhr) { cb(xhr.finalUrl, xhr.responseText, xhr.responseHeaders, xhr); } });}
function head(url, cb) { GM_xmlhttpRequest({ method: "HEAD", url: url, onload: function(xhr) { cb(xhr.finalUrl, xhr.responseText, xhr.responseHeaders, xhr); } }); }
// Text
function trim(text) { return text.replace(/(^\s*|\s*$)/g,""); }
// Array
function uniq(array) { var last=""; return array.filter(function (e) { if (e!=last && e!='') { last=e; return true; } else { last=e; return false; } }); }
function Object2HTMLTable(obj) { var rows=""; for (var i in obj) rows+="<tr><td><b>"+i+":</b></td><td>"+obj[i]+"</td></tr>"; return "<table>"+rows+"</table>"; }
function aa(obj) { alert(uneval(obj)); }
function ga(obj) { GM_log(uneval(obj)); }
function getParam(key) { var a=location.search.match(/([^?=&]+)=([^?=&]+)/g); var r={}; for (var i in a) if (a.hasOwnProperty(i)) { var m=a[i].match(/([^?=&]+)=([^?=&]+)/); r[m[1]]=m[2]; } return (key)?r[key]:r; }
function getHost() { return location.host; } // hash, host, hostname, href, pathname, port, protocol, search
//GM_log=function (){}
/********************************/

/*  https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array
filter -  Creates a new array with all of the elements of this array for which the provided filtering function returns true.
forEach - Calls a function for each element in the array.
every - Returns true if every element in this array satisfies the provided testing function.
map - Creates a new array with the results of calling a provided function on every element in this array.
some - Returns true if at least one element in this array satisfies the provided testing function.
reduce - Apply a function simultaneously against two values of the array (from left-to-right) as to reduce it to a single value.
reduceRight - Apply a function simultaneously against two values of the array (from right-to-left) as to reduce it to a single value. 
*/

function typeOf(value) {
    var s = typeof value;
    if (s === 'object') {
        if (value) {
            if (typeof value.length === 'number' &&
                    !(value.propertyIsEnumerable('length')) &&
                    typeof value.splice === 'function') {
                s = 'array';
            }
        } else {
            s = 'null';
        }
    }
    return s;
}


function isEmpty(o) {
    var i, v;
    if (typeOf(o) === 'object') {
        for (i in o) {
            v = o[i];
            if (v !== undefined && typeOf(v) !== 'function') {
                return false;
            }
        }
    }
    return true;
}

String.prototype.entityify = function () {
    return this.replace(/&/g, "&amp;").replace(/</g,
        "&lt;").replace(/>/g, "&gt;");
};

String.prototype.quote = function () {
    var c, i, l = this.length, o = '"';
    for (i = 0; i < l; i += 1) {
        c = this.charAt(i);
        if (c >= ' ') {
            if (c === '\\' || c === '"') {
                o += '\\';
            }
            o += c;
        } else {
            switch (c) {
            case '\b':
                o += '\\b';
                break;
            case '\f':
                o += '\\f';
                break;
            case '\n':
                o += '\\n';
                break;
            case '\r':
                o += '\\r';
                break;
            case '\t':
                o += '\\t';
                break;
            default:
                c = c.charCodeAt();
                o += '\\u00' + Math.floor(c / 16).toString(16) +
                    (c % 16).toString(16);
            }
        }
    }
    return o + '"';
};

String.prototype.supplant = function (o) {
    return this.replace(/{([^{}]*)}/g,
        function (a, b) {
            var r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
};

String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
}; 

//alert("lol{test}1233{{a}}".supplant({ a:"test" }).supplant({test:" " }).trim()+"++");


/*/
GM_log("hash: "+location.hash); // (Ankername innerhalb eines URI)                // 
GM_log("host: "+location.host); // (Domain-Name innerhalb eines URI)              // www.onlinetvrecorder.com
GM_log("hostname: "+location.hostname); // (Domain-Name innerhalb eines URI)      // www.onlinetvrecorder.com
GM_log("href: "+location.href); // (URI / Verweis zu URI)                         // http://www.onlinetvrecorder.com/index.php?aktion=newepgschedule
GM_log("pathname: "+location.pathname); // (Pfadname innerhalb eines URI)         // /index.php
GM_log("port: "+location.port); // (Portangabe innerhalb eines URI)               //
GM_log("protocol: "+location.protocol); // (Protokollangabe innerhalb eines URI)  // http:
GM_log("search: "+location.search); // (Parameter innerhalb eines URI)            // ?aktion=newepgschedule
/**/


function makeMenuToggle(key, defaultValue, toggleOn, toggleOff, prefix) {
  // Load current value into variable
  window[key] = GM_getValue(key, defaultValue);
  // Add menu toggle
  GM_registerMenuCommand((prefix ? prefix+": " : "") + (window[key] ? toggleOff : toggleOn), function() {
    GM_setValue(key, !window[key]);
    location.reload();
  });
}

function createEl(elObj, parent) {
  var el;
  if (typeof elObj == 'string') {
     el = document.createTextNode(elObj);
  }
  else {
     el = document.createElement(elObj.n);
     if (elObj.a) {
        attributes = elObj.a;
        for (var key in attributes) if (attributes.hasOwnProperty(key)) {
           if (key.charAt(0) == '@')
              el.setAttribute(key.substring(1), attributes[key]);
           else 
              el[key] = attributes[key];
        }
     }
     if (elObj.evl) {
        el.addEventListener(elObj.evl.type, elObj.evl.f, elObj.evl.bubble);
     }
     if (elObj.c) {
        elObj.c.forEach(function (v, i, a) { createEl(v, el); });
     }
  }
  if (parent)
     parent.appendChild(el);
  return el;
}


//Example usage:
/*
   createEl({n: 'ol', a: {'@class': 'some_list', '@id': 'my_list'}, c: [
   {n: 'li', a: {textContent: 'first point'}, evl: {type: 'click', f: function() {alert('first point');}, bubble: true}},
   {n: 'li', a: {textContent: 'second point'}},
   {n: 'li', a: {textContent: 'third point'}}
   ]}, document.body);

<ol id="my_list" class="some_list">
  <li onClick="alert('first point');">first point</li>
  <li>second point</li>
  <li>third point</li>
</ol>
*/

function dump(obj)
{
  var variablen="";
  var objekte="";
  var functionen="";
  if (typeof obj!="object") return obj;
  for (i in obj)
    switch (typeof obj[i])
    {
      case "function":
        functionen+=""+obj[i]+"\n\n";
        break;
      case "object":
        var tmp="";
        try {
        for (j in obj[i])
          switch (typeof obj[i][j])
          {
           case "object":
              tmp+=j+": { ... },\n";
              break;
           case "function":
              tmp+=j+": function () { ... },\n";
              break;
           case "string":
              tmp+=j+": '"+obj[i][j]+"',\n";
              break;
           case "number":
           case "boolean":
              tmp+=j+": "+obj[i][j]+",\n";
              break;
           default: tmp+=j+": ...,\n";
          }
        } catch(e) { tmp="..."; };
        objekte+="var "+i+" = { "+tmp+" }\n\n";
        break;
      case "string":
        variablen+="var "+i+" = '"+obj[i]+"'\n\n";
        break;
      case "number":
      case "boolean":
        variablen+="var "+i+" = "+obj[i]+"\n\n";
        break;
      default:
        try {
          GM_log("Error: " +typeof obj[i]+" - "+obj[i]);
        } catch(e) {}
        break;
    }
  return variablen+objekte+functionen;
}

function copyToClipboard(text) { location.assign( "javascript:try { netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect'); } catch(e) { if (e.message.indexOf('UniversalXPConnect')) alert('Clipboard access not permitted, sorry. You will have to set signed.applet.codebase_principal_support to true in about:config'); else throw e; } const clipboardHelper = Components.classes['@mozilla.org/widget/clipboardhelper;1'].getService(Components.interfaces.nsIClipboardHelper);    clipboardHelper.copyString('"+text.replace("'",'"')+"'); void(0)" ); }

/*
unsafeWindow.pasteFromClipboard = function() {
  try {
    this.netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
    const clipboardHelper = Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper);
    settings = clipboardHelper.getData();
    return settings;
  } catch(e) {
    alert('Clipboard access not permitted, sorry. You will have to set signed.applet.codebase_principal_support to true in about:config');
  }
}
*/
//copyToClipboard("2345");
