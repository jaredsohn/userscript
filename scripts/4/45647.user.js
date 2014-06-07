// ==UserScript==
// @name        io9 Unspoiled
// @namespace   http://blairmitchelmore.com/greasemonkey/io9
// @description Makes each tv show/movie have a collapsible link collapsed by default
// @include     http://io9.com/*
// @description Version 1.1.2
// ==/UserScript==

// Use Douglas Crockford's JSON object if there's no native one
if(!this.JSON){JSON={};(function(){function f(n){return n<10?'0'+n:n;}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z';};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};}})();}

var config = GM_getValue("config");
try { config = JSON.parse(config); } catch (e) { config = {}; }
var mainContent = document.evaluate("//div[contains(@id,'wrapper')][//a[contains(@href, 'tag/morningspoilers')]]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (mainContent) {
    var headers = document.evaluate("//div[contains(@class,'content')]/p[string-length(text()) < 255 and *[(self::u or self::em) and ((position() = 1 and position() = last()) or following-sibling::br[1] or preceding-sibling::br[1] or following-sibling::img[1] or preceding-sibling::img[1]) and not(self::parent/following-sibling::blockquote[1]) and not(self/following-sibling::blockquote[1])]]", mainContent, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < headers.snapshotLength; ++i) {
        var header = headers.snapshotItem(i);
        var nextHeader = headers.snapshotItem(i + 1);
        var wrapper = document.createElement("div");
        var sibling = header.nextSibling;
        do {
            wrapper.appendChild(sibling);
        } while ((sibling = header.nextSibling) != nextHeader);
        if (header.nextSibling)
            header.parentNode.insertBefore(wrapper, header.nextSibling);
        else
            header.parentNode.appendChild(wrapper);
        
        if (config[header.textContent] !== true)
            wrapper.style.display = 'none';
        
        header.style.cursor = 'pointer';
        header.addEventListener('click', function(e) {
            e.preventDefault();
            if (this.nextSibling.style.display == 'none') {
                this.nextSibling.style.display = 'block';
                config[this.textContent] = true;
            } else {
                this.nextSibling.style.display = 'none';
                config[this.textContent] = false;
            }
            GM_setValue("config", JSON.stringify(config));
        }, false);
    }
}