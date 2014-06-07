// ==UserScript==
// @name			Growl tool for Windows
// @description		Tool for use in your scripts to allow for dead simple use of Growl for Windows.
// @namespace		PhasmaExMachina
// @include			*
// @version			0.01
//
// @history			0.01 Initial release
//
// Credits: Much of this code is the work of brian dunnington and can be found at http://www.growlforwindows.com/gfw/help/greasemonkey.aspx
//			I just put together an interface in an object called Growler to try to make it easier to use for beginner & intermediate developers.
//
// ==/UserScript==


Growler = {
	appName:"Growler",
	noticeTypes:{},
	iconSrc:'',
	addNoticeType:function(typeKey, name, enabled) {
		if(typeof(typeKey) != 'string' || typeof(name) != 'string') 
			alert('Growler error: Growler.addEventType() requires a type key and event name as strings');
		else {
			var type = {
				name:typeKey,
				displayName:name,
				enabled:(typeof(enabled) != 'undefined' && enabled.toString() == 'false') ? false : true,
			}	
			Growler.noticeTypes[typeKey] = type;
		}
	},
	register:function(appName, iconSrc) {
		Growler.iconSrc = typeof(iconSrc) == 'undefined' ? '' : iconSrc;
		if(typeof(appName) != 'string')
			alert('Growler error: Growler.register() requires an application name as a string');
		else if(typeof(Growler.noticeTypes) != 'object' || Growler.noticeTypes.length == 0)
			alert('Growler error: At lease one event type must be defined with Growler.addEventType()');
		else {
			Growler.appName = appName;
			var types = [];
			for(var x in Growler.noticeTypes) {
				types.push(Growler.noticeTypes[x]);	
			}
			GrowlMonkey.register(Growler.appName, Growler.iconSrc, types);
		}
	},
	growl:function(typeKey, title, message) {
		if(typeof(Growler.noticeTypes[typeKey]) == 'undefined') 
			alert('Growler error: Event type "' + typeKey + '" has not been defined');
		else 
			GrowlMonkey.notify(Growler.appName, typeKey, title, message);
	}
}

// -- GrowlMonkey stuff below here - do not edit
GrowlMonkey = function(){
    function fireGrowlEvent(type, data){
        var element = document.createElement("GrowlEventElement");
        element.setAttribute("data", JSON.stringify(data));
        document.documentElement.appendChild(element);

        var evt = document.createEvent("Events");
        evt.initEvent(type, true, false);
        element.dispatchEvent(evt);
    }
    
    return {
        register : function(appName, icon, notificationTypes){
            var r = {};
            r.appName = appName;
            r.icon = icon;
            r.notificationTypes = notificationTypes;
            fireGrowlEvent("GrowlRegister", r);
        },
        
        notify : function(appName, notificationType, title, text, icon){
            var n = {};
            n.appName = appName;
            n.type = notificationType;
            n.title = title;
            n.text = text;
            n.icon = icon;
            fireGrowlEvent("GrowlNotify", n);
        }
    }
}();




/* json2.js 
 * 2008-01-17
 * Public Domain
 * No warranty expressed or implied. Use at your own risk.
 * See http://www.JSON.org/js.html
*/
if(!this.JSON){JSON=function(){function f(n){return n<10?'0'+n:n;}
Date.prototype.toJSON=function(){return this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z';};var m={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};function stringify(value,whitelist){var a,i,k,l,r=/["\\\x00-\x1f\x7f-\x9f]/g,v;switch(typeof value){case'string':return r.test(value)?'"'+value.replace(r,function(a){var c=m[a];if(c){return c;}
c=a.charCodeAt();return'\\u00'+Math.floor(c/16).toString(16)+
(c%16).toString(16);})+'"':'"'+value+'"';case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
if(typeof value.toJSON==='function'){return stringify(value.toJSON());}
a=[];if(typeof value.length==='number'&&!(value.propertyIsEnumerable('length'))){l=value.length;for(i=0;i<l;i+=1){a.push(stringify(value[i],whitelist)||'null');}
return'['+a.join(',')+']';}
if(whitelist){l=whitelist.length;for(i=0;i<l;i+=1){k=whitelist[i];if(typeof k==='string'){v=stringify(value[k],whitelist);if(v){a.push(stringify(k)+':'+v);}}}}else{for(k in value){if(typeof k==='string'){v=stringify(value[k],whitelist);if(v){a.push(stringify(k)+':'+v);}}}}
return'{'+a.join(',')+'}';}}
return{stringify:stringify,parse:function(text,filter){var j;function walk(k,v){var i,n;if(v&&typeof v==='object'){for(i in v){if(Object.prototype.hasOwnProperty.apply(v,[i])){n=walk(i,v[i]);if(n!==undefined){v[i]=n;}}}}
return filter(k,v);}
if(/^[\],:{}\s]*$/.test(text.replace(/\\./g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof filter==='function'?walk('',j):j;}
throw new SyntaxError('parseJSON');}};}();}
