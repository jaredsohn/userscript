// ==UserScript==
// @name           Brettspiele
// @namespace      Woems
// @include        *
// ==/UserScript==

/******** BASE FUNCTIONS ********/
function $(ID) { return (typeof ID === 'string' ? document.getElementById(ID) : ID) }
// ** XPath **
function $xs(xpath, rootdir) {return document.evaluate(xpath, rootdir || document, null, 9, null).singleNodeValue;}
function $x(p, context) {
  p=p.replace(/([^.])\.(\w+)/g,'$1[@class="$2"]').replace(/#(\w+)/g,'[@id="$1"]').replace(/\/\[/g,'/*[');  // '//.class' '//#id' '//[...]'
  var i, arr = [], xpr = document.evaluate(p, context || document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}
function loop(xpath, func, rootdir) {
	xpath = document.evaluate(xpath, rootdir || document, null, 6, null);
	var I = xpath.snapshotLength;
	while(--I>=0) func(xpath.snapshotItem(I));
}
// ** Messageboxen **
function topmessage(data) // id, text, onOK/onCancel/onTimeout, Timeout, color
{
  if (!data.id) data.id="topmessage";
  if ($(data.id)) remove($(data.id));
  var Box=insertBefore(createElement("div",{ id:data.id, innerHTML: data.text, style:"padding:2px 0px 2px 7px; border-bottom:1px solid black; background-color:"+(data.color||"lightgray")+"; text-align:center" }),document.body);
  if (data.onOK) createElement("input",{ type:"button", value:"OK", style:"margin:0px 0px 0px 15px;" }, Box, function () { remove($(data.id)); data.onOK(); });
  if (data.onCancel) createElement("input",{ type:"button", value:"Cancel", style:"margin:0px 0px 0px 4px;" }, Box,function () { remove($(data.id)); data.onCancel(); });
  if (data.onTimeout) window.setTimeout(function () { if ($(data.id)) { remove($(data.id)); data.onTimeout(); } },(data.Timeout||60)*1000);
}
// ** Edit Nodes **
function createElement(type, attributes, append){
  var node = document.createElement(type);
  if (attributes) for (var attr in attributes) if (attributes.hasOwnProperty(attr))
    if (attr.indexOf("on")==0) node.addEventListener(attr.substr(2).toLowerCase(), attributes[attr], true)
    else if (attr=="append") node.appendChild(attributes[attr])
    else if(attr=="childs" && (childs=attributes[attr])) for(var i=0; i<childs.length; i++) node.appendChild(childs[i]);
    else try { node[attr]=attributes[attr]; } catch(e) { node.setAttribute(attr, attributes[attr]); }
  if (append) append.appendChild(node);
  return node;
} // Example usage: var styles = createElement('link', {rel: 'stylesheet', type: 'text/css', href: basedir + 'style.css'});
// var test=createElement("div",{ innerHTML:"LOL", textContent:"123", onClick: function () { alert("test"); },  append:createElement("span",{ innerHTML:"Text"}) }, document.body);
function Text(t) { return document.createTextNode(t); }
function fade(node, speed, to, endfunc) {
  if (node.style.opacity=="") node.style.opacity=(node.style.display=='none')?0:1;
  node.style.display="";
  counter={slow : 0.01, medium : 0.05, fast: 0.15}[(speed||'').toLowerCase()]||.05;
  richtung=(parseFloat(node.style.opacity)>to)?-1:1;
  node.style.display='';
  var intv = setInterval(function(){
    if((parseFloat(node.style.opacity)-to)*richtung<=0) node.style.opacity = (parseFloat(node.style.opacity)+counter*richtung).toString();
    else {
      clearInterval(intv);
      node.style.display=(parseFloat(node.style.opacity)<=0)?'none':'';
      if (parseFloat(node.style.opacity)>=1) node.style.opacity="";
      if (endfunc) endfunc();
    }
  }, 50);
}
function remove(node) {if(node)node.parentNode.removeChild(node);return remove;}
function insertAfter(newNode, node) { return node.parentNode.insertBefore(newNode, node.nextSibling); }
function insertBefore(newNode, node) { return node.parentNode.insertBefore(newNode, node); }
function insertFirstChild(newNode, node) { return node.insertBefore(newNode, node.firstChild); }
function hide(node,hideshow) { $(node).style.display=(hideshow=='hide')?'none': (hideshow=='show')?'': ($(node).style.display=='none')?'':'none'; }
function selectsort(obj) { var list=[]; for (var i=0; node=obj.options[i]; i++) list.push(node); list.sort(function (a,b) { return a.textContent>b.textContent?1:a.textContent<b.textContent?-1:0; }); list.forEach(function (e) { obj.appendChild(e); }); }
// ** Events **
function onClick(button,func,type) { button.addEventListener(type || "click",function(event){ func(event.target,event); event.stopPropagation(); event.preventDefault(); }, true); }
function on(type, elm, func) {
  if (!elm) GM_log("ERROR: Elm undefined!!!\non("+type+", "+elm+", "+func+");");
  if (type instanceof Array) type.forEach(function (t) { on(t, elm, func); })
  else if (elm instanceof Array) elm.forEach(function (e) { on(type, e, func); })
  else (typeof elm === 'string' ? document.getElementById(elm) : elm).addEventListener(type, func, false);
} // on(['click','dblclick'],['input',document.body],function (e) { alert(e); }); 
function onKey(func) { on('keydown',window,function (e) { var key=(e.shiftKey?'SHIFT+':'') + (e.ctrlKey?'CTRL+':'') + (e.altKey?'ALT+':'') + (e.metaKey?'META+':'') + e.keyCode; if (func(key, e)) { e.stopPropagation(); e.preventDefault(); } }); }
function onaccesskey(func,debug) { window.addEventListener('keydown',function (e) { if (!e.shiftKey || !e.altKey) return; var key=String.fromCharCode({222:50,0:51,191:55,55:54,57:56,48:57,61:48}[e.keyCode]||e.keyCode).toLowerCase(); var node=$xs("//*[@accesskey='"+key+"']"); if (debug) GM_log("\nKey: "+key+"\nCode: "+e.keyCode+"\nWhich: "+e.which+"\nNode: "+node.innerHTML); if (node && func(key,node,e)) { e.stopPropagation(); e.preventDefault(); }; }, false); }
function click(elm) { var evt = document.createEvent('MouseEvents'); evt.initEvent('click', true, true); elm.dispatchEvent(evt); } // geht nur bei "//input"
// ** Position **
function css(code) { GM_addStyle(code); }
function PosX(element) { var e=element; var i=0; while(e) { i+=e.offsetLeft; e=e.offsetParent; } return i; }
function PosY(element) { var e=element; var i=0; while(e) { i+=e.offsetTop; e=e.offsetParent; } return i; }
function PosXY(obj) { var p = { x:0, y:0 }; do { p.x += obj.offsetLeft; p.y += obj.offsetTop; } while (obj = obj.offsetParent); return p; }
// ** Timer **
function Interval(func, interval) { func(); window.setInterval(func,interval); }
function Timeout(func, interval) { window.setTimeout(func,interval); }  // Timeout(function () {},1000);
function alleXTage(tage, key) { key=key||"alleXTage"; if (GM_getValue(key,0) == 0 || new Date().getTime() > (+GM_getValue(key, 0) + (1000*60*60*24*tage))) { GM_setValue(key,new Date().getTime()+""); return true; } return false; }
// if (alleXTage(10)) alert("alle 10 Tage");
// ** Save **
function deserialize(name, def) { return eval(GM_getValue(name, (def || '({})'))); }
function serialize(name, val) { GM_setValue(name, uneval(val)); }
function aset(name, key, val) { var tmp=deserialize(name); tmp[key]=val; serialize(name,tmp);}
function aget(name, key) { return deserialize(name)[key]; }
         // GM_deleteValue("pwd");
// ** XHTML **
function get(url, cb) { GM_xmlhttpRequest({ method: "GET", url: url, onload: function(xhr) { cb(xhr.finalUrl, xhr.responseText, xhr.responseHeaders, xhr); } });}
// get("",function (url, text, header, xhr) { var div=text2div(text); });
function head(url, cb) { GM_xmlhttpRequest({ method: "HEAD", url: url, onload: function(xhr) { cb(xhr.finalUrl, xhr.responseText, xhr.responseHeaders, xhr); } }); }
// head("",function (url, text, header, xhr) { var div=text2div(text); });
function post(url, data, cb) { GM_xmlhttpRequest({ method: "POST", url: url, headers:{'Content-type':'application/x-www-form-urlencoded'}, data:encodeURI(data), onload:function(xhr) { cb(xhr.finalUrl, xhr.responseText, xhr.responseHeaders, xhr); } }); }
// post("",{},function (url, text, header, xhr) { var div=text2div(text); });
function text2div(text) { var div=document.createElement("div"); div.innerHTML=text; return div; }
// ** Date **
Date.prototype.format = function(format) { var returnStr = ''; var replace = Date.replaceChars; for (var i = 0; i < format.length; i++) { var curChar = format.charAt(i); if (i - 1 >= 0 && format.charAt(i - 1) == "\\") { returnStr += curChar; } else if (replace[curChar]) { returnStr += replace[curChar].call(this); } else if (curChar != "\\"){ returnStr += curChar; } } return returnStr; }; Date.replaceChars = { shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], longMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], longDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], d: function() { return (this.getDate() < 10 ? '0' : '') + this.getDate(); }, D: function() { return Date.replaceChars.shortDays[this.getDay()]; }, j: function() { return this.getDate(); }, l: function() { return Date.replaceChars.longDays[this.getDay()]; }, N: function() { return this.getDay() + 1; }, S: function() { return (this.getDate() % 10 == 1 && this.getDate() != 11 ? 'st' : (this.getDate() % 10 == 2 && this.getDate() != 12 ? 'nd' : (this.getDate() % 10 == 3 && this.getDate() != 13 ? 'rd' : 'th'))); }, w: function() { return this.getDay(); }, z: function() { var d = new Date(this.getFullYear(),0,1); return Math.ceil((this - d) / 86400000); }, W: function() { var d = new Date(this.getFullYear(), 0, 1); return Math.ceil((((this - d) / 86400000) + d.getDay() + 1) / 7); }, F: function() { return Date.replaceChars.longMonths[this.getMonth()]; }, m: function() { return (this.getMonth() < 9 ? '0' : '') + (this.getMonth() + 1); }, M: function() { return Date.replaceChars.shortMonths[this.getMonth()]; }, n: function() { return this.getMonth() + 1; }, t: function() { var d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 0).getDate() }, L: function() { var year = this.getFullYear(); return (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)); }, o: function() { var d  = new Date(this.valueOf());  d.setDate(d.getDate() - ((this.getDay() + 6) % 7) + 3); return d.getFullYear();}, Y: function() { return this.getFullYear(); }, y: function() { return ('' + this.getFullYear()).substr(2); }, a: function() { return this.getHours() < 12 ? 'am' : 'pm'; }, A: function() { return this.getHours() < 12 ? 'AM' : 'PM'; }, B: function() { return Math.floor((((this.getUTCHours() + 1) % 24) + this.getUTCMinutes() / 60 + this.getUTCSeconds() / 3600) * 1000 / 24); }, g: function() { return this.getHours() % 12 || 12; }, G: function() { return this.getHours(); }, h: function() { return ((this.getHours() % 12 || 12) < 10 ? '0' : '') + (this.getHours() % 12 || 12); }, H: function() { return (this.getHours() < 10 ? '0' : '') + this.getHours(); }, i: function() { return (this.getMinutes() < 10 ? '0' : '') + this.getMinutes(); }, s: function() { return (this.getSeconds() < 10 ? '0' : '') + this.getSeconds(); },    u: function() { var m = this.getMilliseconds(); return (m < 10 ? '00' : (m < 100 ? '0' : '')) + m; }, e: function() { return "Not Yet Supported"; }, I: function() { return "Not Yet Supported"; }, O: function() { return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + '00'; }, P: function() { return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + ':00'; }, T: function() { var m = this.getMonth(); this.setMonth(0); var result = this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/, '$1'); this.setMonth(m); return result;}, Z: function() { return -this.getTimezoneOffset() * 60; }, c: function() { return this.format("Y-m-d\\TH:i:sP"); }, r: function() { return this.toString(); }, U: function() { return this.getTime() / 1000; } };
Date.prototype.getDayString = function() { return ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"][this.getDay()]; }
Date.prototype.getMonthString = function() { return ["Januar","Februar","März","April","May","Juni","Juli","August","September","Oktober","November","Dezember"][this.getMonth()]; }
Date.prototype.getShortDate = function() { return this.getDate().pad(2)+"."+["Jan","Feb","Mär","Apr","May","Jun","Jul","Aug","Sep","Okt","Nov","Dez"][this.getMonth()]+"."+this.getFullYear()+" "+this.getHours().pad(2)+":"+this.getMinutes().pad(2)+"."+this.getSeconds().pad(2); }
Date.prototype.getShortDate2 = function() { return this.getDate().pad(2)+"."+(this.getMonth()+1).pad(2)+"."+this.getFullYear()+" "+this.getHours().pad(2)+":"+this.getMinutes().pad(2)+"."+this.getSeconds().pad(2); }
Date.prototype.diff = function(date) { var tmp="in "; var diff=this.getTime()-date.getTime(); if (diff<0) { diff*=-1; tmp="vor "; } return (tmp+Math.floor(diff/1000/60/60/24/7)+"w "+Math.floor(diff/1000/60/60/24%7)+"d "+Math.floor(diff/1000/60/60%24)+"h "+Math.floor(diff/1000/60%60)+"m "+Math.floor(diff/1000%60)+"s").replace(/ 0[wdhms]/g,''); }
function Now(d) { return (d||new Date()).getTime()/1000; }
function NowOut(d) { return new Date(d*1000).getShortDate(); }
function ParseDate(d) { var sp=d.match(/(([0-9]{2})\.([0-9]{2})\.([0-9]{2,4}))? ?(([0-9]{1,2}):([0-9]{2}))?/); return new Date(sp[4]||1970,(sp[3]||1)-1,sp[2]||1,sp[6]||0,sp[7]||0,0); }
// ** Text **
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g,""); }
String.prototype.ltrim = function() { return this.replace(/^\s+/,""); }
String.prototype.rtrim = function() { return this.replace(/\s+$/,""); }
String.prototype.lpad = function(len, chr) { return (len-this.length+1<0)?this:Array(len-this.length+1).join(chr||' ') + this; }
String.prototype.rpad = function(len, chr) { return (len-this.length+1<0)?this:this + Array(len-this.length+1).join(chr||' '); }
Number.prototype.pad = function(len) { return (len-this.toString().length+1<0)?this:Array(len-this.toString().length+1).join('0') + this.toString(); }
function trim(text) { return text.replace(/(^\s*|\s*$)/g,""); }
function pad(text,anz,chr) { return text.replace(/(^\s*|\s*$)/g,""); }
function fill(text,fillchar,anz) { var f=""; for (; anz>text.toString().length; anz--) f+=fillchar; return f+text; }
// ** Array **
function uniq(array) { var last=""; return array.filter(function (e) { if (e!=last && e!='') { last=e; return true; } else { last=e; return false; } }); }
function Object2HTMLTable(obj) { var rows=""; for (var i in obj) rows+="<tr><td><b>"+i+":</b></td><td>"+obj[i]+"</td></tr>"; return "<table>"+rows+"</table>"; }
function arrayTrim(a) { return a.map(function (e) { return e.replace(/[^\S|\S$]/,""); }); };
function arrayClean(a) { return a.filter(function (e) { return e!=""; }); };
function arrayRand(array) { if (!array || array.length==0) GM_log("ArrayGetRand Error: Array ist undefined or 0\nArray: "+array+"\nType: "+typeof array+"\nUneval: "+uneval(array)); return array[Math.floor(Math.random()*(array.length-1))]; }
Array.prototype.trim = function () { return this.map(function (e) { return e.replace(/[^\S|\S$]/,""); }); };
Array.prototype.clean = function () { return this.filter(function (e) { return e!=""; }); };
Array.prototype.uniq = function (array) { var last=""; return array.filter(function (e) { if (e!=last && e!='') { last=e; return true; } else { last=e; return false; } }); }
// ** Parameter **
function urlParse(url) { var a = urlParse.a = urlParse.a || document.createElement('a'); a.href = url; return { scheme: /^[^:]+/.exec(a.protocol)[0], host: a.host, hostname: a.hostname, pathname: a.pathname, search: a.search, hash: a.hash }; } //alert(mdump(urlParse(location.href)));
function aa(obj) { alert(uneval(obj)); }
function ga(obj) { GM_log(uneval(obj)); }
function getParam(key) { var a=location.search.match(/([^?=&]+)=([^?=&]+)/g); var r={}; for (var i in a) if (a.hasOwnProperty(i)) { var m=a[i].match(/([^?=&]+)=([^?=&]+)/); r[m[1]]=m[2]; } return (key)?r[key]:r; }
function getHost() { return location.host; } // hash, host, hostname, href, pathname, port, protocol, search
// ** HTML-Code
function div(text) { return '<div>'+text+'</div>'; }
function row(cells) { return '<tr><td>' + cells.join('</td><td>') +'</td></tr>'; }
// ** REST **
function dump(obj, deep) { if (typeof obj=="object") if (obj instanceof Array) { var tmp=[]; for (j in obj) if (obj.hasOwnProperty(j)) tmp.push(dump(obj[j], deep)); return "[ "+tmp.join(", ")+" ]"; } else { var tmp=[]; deep=(deep||'')+'   '; for (j in obj) tmp.push(deep+j+" = "+dump(obj[j], deep)); return "{\n"+tmp.join(",\n")+"\n"+deep+"}"; } return (typeof obj=="string")?"'"+obj+"'":obj; }
//var a=["öpö","lol"]; for (i in a) if (a.hasOwnProperty(i)) GM_log(i+": "+a[i]);
function iframe(url,className,w,h,noframetext) { var iframe=document.createElement("iframe"); iframe.src=url; iframe.className=className||"test"; iframe.width=w||100; iframe.height=h||100; iframe.innerHTML=noframetext||""; return iframe; }
function FrameBuster() { return window === parent; } // TopWindow=true, IFrame=False, Frame=False
function makeMenuToggle(key, defaultValue, toggleOn, toggleOff, prefix) { window[key] = GM_getValue(key, defaultValue); GM_registerMenuCommand((prefix ? prefix+": " : "") + (window[key] ? toggleOff : toggleOn), function() { GM_setValue(key, !window[key]); location.reload(); }); }
function showmsg(data)
{
  if (!data.id) data.id="default_msg_{rand}";
  data.id=data.id.replace("{rand}",Math.floor(Math.random()*1000));
  if ($(data.id)) remove($(data.id));
  if (data.onOKTimeout) { data.onOK=data.onOKTimeout; data.onTimeout=data.onOKTimeout; }
  data.box=insertBefore(createElement("div",{ id:data.id, innerHTML: data.text, style:(data.top?"position: absolute; width: 100%;":"")+"z-index:999; padding:2px 0px 2px 7px; border-bottom:1px solid black; background-color:"+(data.color||"lightgray")+"; text-align:center" }),document.body);
  if (data.onOK) data.okbtn=createElement("input",{ type:"button", value:data.OK||"OK", style:"margin:0px 0px 0px 15px;", onClick:function () { data.onOK(data); remove($(data.id));  } }, data.box);
  if (data.onCancel) data.cancelbtn=createElement("input",{ type:"button", value:data.Cancel||"Cancel", style:"margin:0px 0px 0px 4px;", onClick:function () { data.onCancel(data); remove($(data.id));  } }, data.box);
  if (data.onTimeout) window.setTimeout(function () { if ($(data.id)) { remove($(data.id)); data.onTimeout(); } },(data.Timeout||60)*1000);
  return data;
} // id, text, color, OK, onOK, Cancel, onCancel, Timeout, onTimeout, onOKTimeout // ** Log **
//if(unsafeWindow.console) var GM_log = unsafeWindow.console.log; // Loggt in Firefox Console
//GM_log=function (){}
/********************************/ 
function similar_text(first, second) {
    // Calculates the similarity between two strings  
    // 
    // version: 1109.2015
    // discuss at: http://phpjs.org/functions/similar_text    // +   original by: Rafał Kukawski (http://blog.kukawski.pl)
    // +   bugfixed by: Chris McMacken
    // *     example 1: similar_text('Hello World!', 'Hello phpjs!');
    // *     returns 1: 7
    // *     example 2: similar_text('Hello World!', null);    // *     returns 2: 0
    if (first === null || second === null || typeof first === 'undefined' || typeof second === 'undefined') {
        return 0;
    }
     first += '';
    second += '';
 
    var pos1 = 0,
        pos2 = 0,        max = 0,
        firstLength = first.length,
        secondLength = second.length,
        p, q, l, sum;
     max = 0;
 
    for (p = 0; p < firstLength; p++) {
        for (q = 0; q < secondLength; q++) {
            for (l = 0;            (p + l < firstLength) && (q + l < secondLength) && (first.charAt(p + l) === second.charAt(q + l)); l++);
            if (l > max) {
                max = l;
                pos1 = p;
                pos2 = q;            }
        }
    }
 
    sum = max; 
    if (sum) {
        if (pos1 && pos2) {
            sum += similar_text(first.substr(0, pos2), second.substr(0, pos2));
        } 
        if ((pos1 + max < firstLength) && (pos2 + max < secondLength)) {
            sum += similar_text(first.substr(pos1 + max, firstLength - pos1 - max), second.substr(pos2 + max, secondLength - pos2 - max));
        }
    } 
    return sum;
}
/*/
GM_log(dump({ hash:location.hash,
              host:location.host,
              hostname: location.hostname,
              href: location.href,
              pathname: location.pathname,
              port:location.port,
              protokol:location.protokol,
              search:location.search }));
/**/
switch(location.host)
{
  case 'www.brettspiele-report.de': setGlobalKey(); brettspielereport(); break;
  case 'www.spieletest.at': setGlobalKey(); Timeout(function (e) { spieletest(); },1000); break;
  //default: alert(location.host); break;
}

function setGlobalKey()
{
  onKey(function (key, e) {
    //GM_log(key);
    if (key=="CTRL+89" || key=="SHIFT+ALT+89") // 89=Y
    {
      var spiele=deserialize('Spiele',[]);
      spiele=spiele.filter(function (e) { return !e.vote; });
      if (spiele.length==0) { alert("Keine ungevoteten Spiele mehr"); return false; }
      var Nr=Math.round(Math.random()*spiele.length);
      //alert("Spiel "+Nr+" von "+spiele.length);
      alert("noch "+spiele.length+" ohne Vote...");
      location.href=spiele[Nr].Links[0];
      return true;
    }
  });
}

function spieletest()
{
  if (location.pathname=="/spiel.php" && $("spiele_titel"))
  {
    var Titel=$("spiele_titel").textContent;
    var PermaLink=location.href;
    var Content=$("content").firstChild;
    var AktuellesSpiel=new Spiel();
    if (!AktuellesSpiel.findByLink(PermaLink))
    {
      var data=AktuellesSpiel.similar(Titel).map(function (e,i) { return e.Name+" (ID:"+e.ID+"/Ahnlich:"+e.similar+")"; });
      if (data.length==0)
      {  AktuellesSpiel.add(Titel,PermaLink); location.reload(); }
      else
        showmsg({
          id:'default_msg',
          text:"<div>"+data.join("<br>")+'</div><br>Ist das Spiel "'+Titel+'" mit einem der oberen Spiele identisch?<br><br>',
          top:true,
          color:'red',
          OK:'Ja',
          onOK:function (e) { AktuellesSpiel.findByID(prompt("Bitte ID angeben:")); AktuellesSpiel.addLink(PermaLink); location.reload(); },
          Cancel:'Nein',
          onCancel:function (e) { AktuellesSpiel.add(Titel,PermaLink); location.reload(); },
        });
        //$('default_msg').style.position="absolute";
        //$('default_msg').style.width="100%";    
    } else {
      insertBefore(createElement('div', { id:"AdvancedSpieleData", childs:[
        titel("Titel:"),
        createElement('div', { style:"padding: 2px", innerHTML:AktuellesSpiel.getData().Name+" ("+AktuellesSpiel.getID()+")" }),
        titel("Links:"),
        createElement('div', { style:"padding: 2px", id:"LinklistElement" }),
        titel("Vote:"),
        AktuellesSpiel.getHTMLVote(function (as) { GM_log("Spiel ist aktuell: "+uneval(AktuellesSpiel.getData())); }),
        titel("Notiz:"),
        AktuellesSpiel.getHTMLNotiz(),
      ] }),Content);
      AktuellesSpiel.getData().Links.forEach(function (text) {
        createElement('a', { href:text, innerHTML:text, style:"color:#427" }, $("LinklistElement"));
        $("LinklistElement").appendChild(Text(" ("));
        createElement('a', { href:text, innerHTML:"löschen", onClick:function (e) { AktuellesSpiel.delLink(text); e.style.color="lightgray"; e.stopPropagation(); e.preventDefault(); } }, $("LinklistElement"));
        $("LinklistElement").appendChild(Text(")"));
        createElement('br', {}, $("LinklistElement"));
      });
      createElement('a', { href:".", innerHTML:"Hinzufügen", onClick:function (e) { var link=prompt("Link?"); if (link) AktuellesSpiel.addLink(link); e.stopPropagation(); e.preventDefault(); } }, $("LinklistElement"));
    }
  }
}

function brettspielereport()
{
  if (location.pathname.split("/")[1]=='category')
  {
    $x("//div[@id='postbox']//div[@class='storytitle']/a").map(function (a) { return { Titel:a.textContent, Link:a.href, Elem:a }; }).forEach(function (e) {
      GM_log("Titel: "+e.Titel);
      GM_log('PermaLink:'+uneval(e.Link));
      var AktuellesSpiel=new Spiel();
      if (!AktuellesSpiel.findByLink(e.Link))
      {
        e.Elem.style.color="red";
      } else {
        //GM_log(uneval(AktuellesSpiel.getData().vote));
        insertAfter(createElement('div', { textContent:"Vote: "+AktuellesSpiel.getData().vote }),e.Elem);
        e.Elem.style.color="green";
      }
    });
  } else {
    var Titel=$xs("id('postbox')//div[@class='storytitle']/a").textContent;
    var PermaLink=$xs("id('postbox')//div[@class='storytitle']/a").href;
    var Content=$xs("id('postbox')//div[@class='storycontent']");
    var AktuellesSpiel=new Spiel();
    if (!AktuellesSpiel.findByLink(PermaLink))
    {
      var data=AktuellesSpiel.similar(Titel).map(function (e,i) { return e.Name+" (ID:"+e.ID+"/Ahnlich:"+e.similar+")"; });
      if (data.length==0)
      {  AktuellesSpiel.add(Titel,PermaLink); location.reload(); }
      else
        showmsg({
          id:'default_msg',
          text:"<div>"+data.join("<br>")+'</div><br>Ist das Spiel "'+Titel+'" mit einem der oberen Spiele identisch?<br><br>',
          color:'red',
          OK:'Ja',
          onOK:function (e) { AktuellesSpiel.findByID(prompt("Bitte ID angeben:")); AktuellesSpiel.addLink(PermaLink); location.reload(); },
          Cancel:'Nein',
          onCancel:function (e) { AktuellesSpiel.add(Titel,PermaLink); location.reload(); },
        });    
    } else {
      insertBefore(createElement('div', { id:"AdvancedSpieleData", childs:[
        titel("Titel:"),
        createElement('div', { style:"padding: 2px", innerHTML:AktuellesSpiel.getData().Name+" ("+AktuellesSpiel.getID()+")" }),
        titel("Links:"),
        createElement('div', { style:"padding: 2px", id:"LinklistElement" }),
        titel("Vote:"),
        AktuellesSpiel.getHTMLVote(function (as) { GM_log("Spiel ist aktuell: "+uneval(AktuellesSpiel.getData())); }),
        titel("Notiz:"),
        AktuellesSpiel.getHTMLNotiz(),
      ] }),Content);
      AktuellesSpiel.getData().Links.forEach(function (text) {
        createElement('a', { href:text, innerHTML:text, style:"color:#427" }, $("LinklistElement"));
        $("LinklistElement").appendChild(Text(" ("));
        createElement('a', { href:text, innerHTML:"löschen", onClick:function (e) { AktuellesSpiel.delLink(text); e.style.color="lightgray"; e.stopPropagation(); e.preventDefault(); } }, $("LinklistElement"));
        $("LinklistElement").appendChild(Text(")"));
        createElement('br', {}, $("LinklistElement"));
      });
      createElement('a', { href:".", innerHTML:"Hinzufügen", onClick:function (e) { var link=prompt("Link?"); if (link) AktuellesSpiel.addLink(link); e.stopPropagation(); e.preventDefault(); } }, $("LinklistElement"));
    }
  }
}

function titel(titel) { return createElement('div', { style: "text-decoration:underline; font-weight:bold; padding:5px 0px 5px 0px;", textContent:titel }); }
function text2links(text) { return createElement('a', { href:text, innerHTML:text }); }

// **** Daten managen ****
function Spiel(Link)
{
  var ID=-1;
  var SP;
  this.valid=function () { return SP?true:false; }
  this.refresh=function () { SP=deserialize('Spiele',[])[ID]; }
  this.save=function () { var spiel=deserialize('Spiele',[]); spiel[ID]=SP; serialize('Spiele',spiel); }
  this.getID=function () { return ID; }
  this.getData=function (key) { this.refresh(); return key?SP[key]:SP; }
  this.setData=function (key,value) { this.refresh(); SP[key]=value; this.save(); }
  this.add=function (Name, Link) { var spiel=deserialize('Spiele',[]); id=spiel.push({ Name:Name, Links:[Link] })-1; serialize('Spiele',spiel); }
  this.addLink=function (Link) { SP["Links"].push(Link); this.save(); }
  this.delLink=function (Link) { var Nr=SP["Links"].indexOf(Link); var del=SP["Links"].splice(Nr,1); this.save(); return del; }

  this.top10=function () {}
  this.similar=function (Titel)
  {
    return deserialize('Spiele',[]).map(function (e,i) { e.ID=i; e.similar=similar_text(e.Name,Titel); return e; }).filter(function (e) { return e.similar > Titel.length/1.5 || e.similar > e.Name.length/1.5; }).sort(function (a,b) { return a.similar>b.similar; });
  }
  this.findByID=function (id) { ID=id; this.refresh(); }
  this.findByLink=function (link)
  {
    var spiele=deserialize('Spiele',[]);
    //GM_log("FindByLink: "+uneval(spiele)+"\n"+link);
    for (i in spiele) if (spiele.hasOwnProperty(i))
      if (spiele[i].Links && spiele[i].Links.indexOf(link)!=-1)
      { ID=i; SP=spiele[i]; return true; }
    return false;
  }
  this.getHTMLVote=function (func)
  {
    var Spiel=this;
    return createElement('span', { id:"SpieleVote", className: "Aktuell"+(SP["vote"]||""), childs: [
      createElement('a', { className: "Opt1", href:".", textContent:"1", onClick:function (e) { Spiel.setData("vote",e.target.textContent); e.target.parentNode.className="Aktuell"+SP["vote"]; func(Spiel); e.stopPropagation(); e.preventDefault(); } }),
      Text(" "),
      createElement('a', { className: "Opt2", href:".", textContent:"2", onClick:function (e) { Spiel.setData("vote",e.target.textContent); e.target.parentNode.className="Aktuell"+SP["vote"]; func(Spiel); e.stopPropagation(); e.preventDefault(); } }),
      Text(" "),
      createElement('a', { className: "Opt3", href:".", textContent:"3", onClick:function (e) { Spiel.setData("vote",e.target.textContent); e.target.parentNode.className="Aktuell"+SP["vote"]; func(Spiel); e.stopPropagation(); e.preventDefault(); } }),
      Text(" "),
      createElement('a', { className: "Opt4", href:".", textContent:"4", onClick:function (e) { Spiel.setData("vote",e.target.textContent); e.target.parentNode.className="Aktuell"+SP["vote"]; func(Spiel); e.stopPropagation(); e.preventDefault(); } }),
      Text(" "),
      createElement('a', { className: "Opt5", href:".", textContent:"5", onClick:function (e) { Spiel.setData("vote",e.target.textContent); e.target.parentNode.className="Aktuell"+SP["vote"]; func(Spiel); e.stopPropagation(); e.preventDefault(); } }),
      Text(" "),
      createElement('a', { className: "Opt6", href:".", textContent:"6", onClick:function (e) { Spiel.setData("vote",e.target.textContent); e.target.parentNode.className="Aktuell"+SP["vote"]; func(Spiel); e.stopPropagation(); e.preventDefault(); } }),
//      createElement('br'),
    ] });
  }
  this.getHTMLNotiz=function ()
  {
    var Spiel=this;
    return createElement('textarea', { style:"color:black", cols:40, rows:6, textContent:(SP["Notiz"]||""), onKeyUp:function (e) { e.target.style.backgroundColor="#FFEEEE"; }, onChange:function (e) { e.target.style.backgroundColor="#EEFFEE"; Spiel.setData("Notiz",e.target.value ); } });
  }
}

css("#SpieleVote { border:2px solid black; margin:2px; padding: 2px; }");
css("#SpieleVote.Aktuell a { text-decoration:blink; }");
css("#SpieleVote.Aktuell1 .Opt1 { color:green; }");
css("#SpieleVote.Aktuell2 .Opt2 { color:green; }");
css("#SpieleVote.Aktuell3 .Opt3 { color:blue; }");
css("#SpieleVote.Aktuell4 .Opt4 { color:blue; }");
css("#SpieleVote.Aktuell5 .Opt5 { color:red; }");
css("#SpieleVote.Aktuell6 .Opt6 { color:red; }");


