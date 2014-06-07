{\rtf1\ansi\ansicpg1252\deff0\deflang1033{\fonttbl{\f0\fswiss\fcharset0 Arial;}}
{\*\generator Msftedit 5.41.21.2509;}\viewkind4\uc1\pard\f0\fs20 // ==UserScript==\par
// @name           Facebook - Automatically Accept All Kingdoms of Camelot Gifts\par
// @version        0.1\par
// @namespace      KOCQuickWidgets-AutoAcceptGifts\par
// @homepage       http://userscripts.org/\par
// @description    This script will automatically accept all of your Kingdoms of Camelot gifts in your Facebook Game Requests. Works even if you play on multiple domains!\par
\par
// @include        *kingdomsofcamelot.com/fb/e2/src/claimGift_src.php*\par
// @include        *kingdomsofcamelot.com/fb/e2/src/claimDailyGift_src.php*\par
\par
// @require        http://sizzlemctwizzle.com/updater.php?id=92054\par
// ==/UserScript==\par
\par
\par
String.prototype.trim = function() \{ return this.replace(/^\\s+|\\s+$/g, ''); \}\par
String.prototype.StripQuotes = function() \{\par
\tab return this.replace(/"/g,'');\par
\};\par
\par
if(!this.JSON2)\{JSON2=\{\};\}\par
(function()\{function f(n)\{return n<10?'0'+n:n;\}\par
if(typeof Date.prototype.toJSON!=='function')\{Date.prototype.toJSON=function(key)\{return this.getUTCFullYear()+'-'+\par
f(this.getUTCMonth()+1)+'-'+\par
f(this.getUTCDate())+'T'+\par
f(this.getUTCHours())+':'+\par
f(this.getUTCMinutes())+':'+\par
f(this.getUTCSeconds())+'Z';\};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key)\{return this.valueOf();\};\}\par
var cx=/[\\u0000\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]/g,escapable=/[\\\\\\"\\x00-\\x1f\\x7f-\\x9f\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]/g,gap,indent,meta=\{'\\b':'\\\\b','\\t':'\\\\t','\\n':'\\\\n','\\f':'\\\\f','\\r':'\\\\r','"':'\\\\"','\\\\':'\\\\\\\\'\},rep;function quote(string)\{escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a)\{var c=meta[a];return typeof c==='string'?c:'\\\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);\})+'"':'"'+string+'"';\}\par
function str(key,holder)\{var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function')\{value=value.toJSON(key);\}\par
if(typeof rep==='function')\{value=rep.call(holder,key,value);\}\par
switch(typeof value)\{case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value)\{return'null';\}\par
gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]')\{length=value.length;for(i=0;i<length;i+=1)\{partial[i]=str(i,value)||'null';\}\par
v=partial.length===0?'[]':gap?'[\\n'+gap+\par
partial.join(',\\n'+gap)+'\\n'+\par
mind+']':'['+partial.join(',')+']';gap=mind;return v;\}\par
if(rep&&typeof rep==='object')\{length=rep.length;for(i=0;i<length;i+=1)\{k=rep[i];if(typeof k==='string')\{v=str(k,value);if(v)\{partial.push(quote(k)+(gap?': ':':')+v);\}\}\}\}else\{for(k in value)\{if(Object.hasOwnProperty.call(value,k))\{v=str(k,value);if(v)\{partial.push(quote(k)+(gap?': ':':')+v);\}\}\}\}\par
v=partial.length===0?'\{\}':gap?'\{\\n'+gap+partial.join(',\\n'+gap)+'\\n'+\par
mind+'\}':'\{'+partial.join(',')+'\}';gap=mind;return v;\}\}\par
if(typeof JSON2.stringify!=='function')\{JSON2.stringify=function(value,replacer,space)\{var i;gap='';indent='';if(typeof space==='number')\{for(i=0;i<space;i+=1)\{indent+=' ';\}\}else if(typeof space==='string')\{indent=space;\}\par
rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number'))\{throw new Error('JSON.stringify');\}\par
return str('',\{'':value\});\};\}\par
if(typeof JSON2.parse!=='function')\{JSON2.parse=function(text,reviver)\{var j;function walk(holder,key)\{var k,v,value=holder[key];if(value&&typeof value==='object')\{for(k in value)\{if(Object.hasOwnProperty.call(value,k))\{v=walk(value,k);if(v!==undefined)\{value[k]=v;\}else\{delete value[k];\}\}\}\}\par
return reviver.call(holder,key,value);\}\par
cx.lastIndex=0;if(cx.test(text))\{text=text.replace(cx,function(a)\{return'\\\\u'+\par
('0000'+a.charCodeAt(0).toString(16)).slice(-4);\});\}\par
if(/^[\\],:\{\}\\s]*$/.test(text.replace(/\\\\(?:["\\\\\\/bfnrt]|u[0-9a-fA-F]\{4\})/g,'@').replace(/"[^"\\\\\\n\\r]*"|true|false|null|-?\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d+)?/g,']').replace(/(?:^|:|,)(?:\\s*\\[)+/g,'')))\{j=eval('('+text+')');return typeof reviver==='function'?walk(\{'':j\},''):j;\}\par
throw new SyntaxError('JSON.parse');\};\}\})();\par
\par
if(!this.GM_log) \{\par
\tab GM_log=function(m) \{\par
\tab\tab console.log(m);\par
\tab\}\par
\tab GM_registerMenuCommand=function(text,f) \{\par
\tab\}\par
\tab\par
\}\par
\par
if(!this.unsafeWindow) \{\par
//~~~ need helper to return values?\par
\tab unsafeWindow=\{\};\par
\}\par
\par
function AddScript(script)\{\par
    var a = document.createElement('script');\par
    a.innerHTML = script;\par
    document.getElementsByTagName('head')[0].appendChild(a);\par
    return;\par
\}\par
\par
function inspect(obj, maxLevels, level)\{\par
  var str = '', type, msg;\par
\par
    // Start Input Validations\par
    // Don't touch, we start iterating at level zero\par
    if(level == null)  level = 0;\par
\par
    // At least you want to show the first level\par
    if(maxLevels == null) maxLevels = 1;\par
    if(maxLevels < 1)     \par
        return '<font color="red">Error: Levels number must be > 0</font>';\par
\par
    // We start with a non null object\par
    if(obj == null)\par
    return '<font color="red">Error: Object <b>NULL</b></font>';\par
    // End Input Validations\par
\par
    // Each Iteration must be indented\par
    str += '<ul>';\par
\par
    // Start iterations for all objects in obj\par
    for(property in obj)\par
    \{\par
      try\par
      \{\par
          // Show "property" and "type property"\par
          type =  typeof(obj[property]);\par
          str += '<li>(' + type + ') ' + property + \par
                 ( (obj[property]==null)?(': <b>null</b>'):(': '+obj[property])) + '</li>';\par
\par
          // We keep iterating if this property is an Object, non null\par
          // and we are inside the required number of levels\par
          if((type == 'object') && (obj[property] != null) && (level+1 < maxLevels))\par
          str += inspect(obj[property], maxLevels, level+1);\par
      \}\par
      catch(err)\par
      \{\par
        // Is there some properties in obj we can't access? Print it red.\par
        if(typeof(err) == 'string') msg = err;\par
        else if(err.message)        msg = err.message;\par
        else if(err.description)    msg = err.description;\par
        else                        msg = 'Unknown';\par
\par
        str += '<li><font color="red">(Error) ' + property + ': ' + msg +'</font></li>';\par
      \}\par
    \}\par
\par
      // Close indent\par
      str += '</ul>';\par
\par
    return str;\par
\}\par
\par
\par
var nHtml=\{\par
\tab FindByXPath:function(obj,xpath,nodetype) \{\par
\tab\tab if(!nodetype)\{\par
\tab\tab\tab nodetype = XPathResult.FIRST_ORDERED_NODE_TYPE;\par
\tab\tab\}\par
\tab\tab try \{\par
\tab\tab\tab var q=document.evaluate(xpath,obj,null,nodetype,null);\par
\tab\tab\} catch(e) \{\par
\tab\tab\tab GM_log('bad xpath:'+xpath);\par
\tab\tab\}\par
\tab\tab if(nodetype == XPathResult.FIRST_ORDERED_NODE_TYPE)\{\par
\tab\tab\tab if(q && q.singleNodeValue) \{ return q.singleNodeValue; \}\par
\tab\tab\}else\{\par
\tab\tab\tab if(q)\{\par
\tab\tab\tab\tab return q;\par
\tab\tab\tab\}\par
\tab\tab\}\par
\tab\tab return null;\par
\tab\},\par
\tab ClickWin:function(win,obj,evtName) \{\par
\tab\tab var evt = win.document.createEvent("MouseEvents");\par
\tab\tab evt.initMouseEvent(evtName, true, true, win,\par
\tab\tab\tab 0, 0, 0, 0, 0, false, false, false, false, 0, null);\par
\tab\tab return !obj.dispatchEvent(evt);\par
\tab\},\par
\tab Click:function(obj) \{\par
\tab\tab return this.ClickWin(window,obj,'click');\par
\tab\},\par
\tab ClickTimeout:function(obj,millisec) \{\par
\tab\tab window.setTimeout(function() \{\par
\tab\tab\tab return nHtml.ClickWin(window,obj,'click');\par
\tab\tab\},millisec+Math.floor(Math.random()*500));\par
\tab\},\par
\par
\tab SetSelect:function(obj,v) \{\par
\tab\tab for(var o=0; o<obj.options.length; o++) \{\par
\tab\tab\tab if(v==obj.options[o].value) \{ obj.options[o].selected=true; return true; \}\par
\tab\tab\}\par
\tab\tab return false;\par
\}\par
\par
\};\par
\par
function ById(id) \{\par
\tab return document.getElementById(id);\par
\}\par
\par
function ByName(name) \{\par
\tab return document.getElementsByName(name);\par
\}\par
\par
function AddText(box1,txt) \{\par
\tab var txtObj;\par
\tab box1.appendChild(txtObj=document.createTextNode(txt));\par
\tab return txtObj;\par
\}\par
\par
function AddHtml(box1,txt) \{\par
\tab var txtObj;\par
\tab var sp=document.createElement('span');\par
\tab sp.innerHTML=txt;\par
\tab box1.appendChild(sp);\par
\tab return txtObj;\par
\}\par
\par
\par
var KOCAutoAcceptGifts=\{\par
\tab startListenTime:null,\par
\tab options:null,\par
\tab isChrome:navigator.userAgent.toLowerCase().indexOf('chrome') > -1,\par
\par
\tab DoUnsafeWindow:function(func, execute_by_embed) \{\par
\tab\tab if(this.isChrome || execute_by_embed) \{\par
\tab\tab\tab var scr=document.createElement('script');\par
\tab\tab\tab scr.innerHTML=func;\par
\tab\tab\tab document.body.appendChild(scr);\par
\tab\tab\} else \{\par
\tab\tab\tab eval("unsafeWindow."+func);\par
\tab\tab\}\par
\tab\},\par
\par
\tab Log:function(str) \{\par
\tab\tab GM_log(str);\par
\tab\},\par
\par
\tab GetValue:function(name,default_val) \{\par
\tab\tab return GM_getValue(name,default_val);\par
\tab\},\par
\par
\tab SetValue:function(name,val) \{\par
\tab\tab if(val==null || val==undefined) \{\par
\tab\tab\tab GM_deleteValue(name);\par
\tab\tab\}else\{\par
\tab\tab\tab return GM_setValue(name,val);\par
\tab\tab\}\par
\tab\},\par
\tab\par
\tab ListValues:function() \{\par
\tab\tab return GM_listValues();\par
\tab\},\par
\par
\tab ClearOptions:function() \{\par
\tab\tab this.SetValue('Options',JSON.stringify(\{\}));\par
\tab\},\par
\tab\par
\tab GetOptions:function() \{\par
\tab\tab var json=this.GetValue('Options','\{\}');\par
\tab\tab if(json=='') json='\{\}';\par
\tab\tab var options=JSON2.parse(json);\par
\tab\tab var defOptions=\{\par
\tab\tab\tab "number_example":15,\par
\tab\tab\tab "booleanval_example":true,\par
\tab\tab\tab "string_example":"sdfsdfds",\par
\tab\tab\tab "array_example":[1,1,1,1,1,1,1,1,1,1]\par
\tab\tab\};\par
\tab\tab for(var n in defOptions) \{\par
\tab\tab\tab if(options[n]!=undefined) \{ continue; \}\par
\tab\tab\tab options[n]=defOptions[n];\par
\tab\tab\}\par
\tab\tab return options;\par
\tab\},\par
\tab\par
\tab SetOptions:function(v) \{\par
\tab\tab this.SetValue('Options',JSON2.stringify(v));\par
\tab\},\par
\par
\tab FactoryReset:function() \{\par
\tab\tab var stored_values=this.ListValues();\par
\tab\tab for(var n=0; n<stored_values.length; n++) \{\par
\tab\tab\tab GM_deleteValue(stored_values[n],null);\par
\tab\tab\}\par
\tab\tab this.SetOptions(\{\});\par
\tab\},\par
\par
\par
\tab pageLoaded:false,\par
\tab giftAccepted:false,\par
\tab Listen:function() \{\par
\tab\tab var t=this;\par
\par
\tab\tab this.options=this.GetOptions();\par
\tab\tab this.startListenTime=new Date();\par
\par
\tab\tab var domTickTimer=null;\par
\tab\tab var domTickUpto=0;\par
\tab\tab var domTick=function(e) \{\par
\tab\tab\par
\tab\tab\tab if(!t.giftAccepted) \{\par
\tab\tab\tab\tab // Find the gift claiming container div\par
\tab\tab\tab\tab var claim_gift = ById('claimgift');\par
\tab\tab\tab\tab if(claim_gift)\{\par
\tab\tab\tab\tab\tab // Look for the select drop-down\par
\tab\tab\tab\tab\tab var domain_selector = ById('serverid');\par
\tab\tab\tab\tab\tab // Look for the next button\par
\tab\tab\tab\tab\tab var next_button1 = nHtml.FindByXPath(claim_gift,".//a[contains(@onclick,'checkServer')]");\par
\tab\tab\tab\tab\tab var next_button2 = nHtml.FindByXPath(claim_gift,".//a[@class='nextbtn']");\par
\tab\tab\tab\tab\tab if(domain_selector && (next_button1 || next_button2))\{\par
\tab\tab\tab\tab\tab\tab for(var i=0; i<domain_selector.options.length; i++)\{\par
\tab\tab\tab\tab\tab\tab\tab if(domain_selector.options[i].value == "205")\{\par
\tab\tab\tab\tab\tab\tab\tab\tab domain_selector.selectedIndex = i;\par
\tab\tab\tab\tab\tab\tab\tab\tab if(next_button1)\{\par
\tab\tab\tab\tab\tab\tab\tab\tab\tab nHtml.Click(next_button1);\par
\tab\tab\tab\tab\tab\tab\tab\tab\}else\{\par
\tab\tab\tab\tab\tab\tab\tab\tab\tab nHtml.Click(next_button2);\par
\tab\tab\tab\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\tab\tab\tab\tab t.giftAccepted=true;\par
\tab\tab\tab\tab\tab\tab\tab\tab t.Log("Gift accepted!");\par
\tab\tab\tab\tab\tab\tab\tab\tab break;\par
\tab\tab\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\}\par
\par
\tab\tab\tab if(!domTickTimer) \{\par
\tab\tab\tab\tab domTickTimer=window.setTimeout(function() \{\par
\tab\tab\tab\tab\tab domTickTimer=null;\par
\tab\tab\tab\tab\tab domTick();\par
\tab\tab\tab\tab\tab domTickUpto++;\par
\tab\tab\tab\tab\},250);\par
\tab\tab\tab\}\par
\tab\tab\};\par
\par
\tab\tab domTick();\par
\tab\}\par
\par
\};\par
\par
KOCAutoAcceptGifts.Listen();\par
}
