// ==UserScript==
// @name        GoogleReaderGrowl
// @namespace   http://www.growlforwindows.com
// @description Get Growl notifications for Google Reader updates
// @include     http://google.com/reader/*
// @include     http://*.google.com/reader/*
// @author      Brian Dunnington
// @credit      Based on Fluid script by Todd Ditchendorf
// @credit      Based on Fluid script by Tanguy de Courson <tanguy@0x7a69.net>
// @version     1.0.1 - fixed a bug that didnt always handle individual notifications properly
// ==/UserScript==


GoogleReaderGrowl = function(){
    var unreadText = "";
    var unread = 0;
	var old_unread = 0;

    var focused = true;
    window.addEventListener('focus', function(){focused=true;}, false);
    window.addEventListener('blur', function(){focused=false;}, false);
    
    function doUpdates(firstTime) {
        var title = document.title;
        old_unread = unread || 0;

        if (title && title.length) {
            var start = title.indexOf("(");
            var end = title.indexOf(")");
            if (start > -1 && end > -1) {
                start++;
                unreadText = title.substring(start, end);
                unread = parseInt(unreadText);
            } else {
                unread = 0;
            }
        }

        //growl if there are more unread items than last time
        if ((unread || 0) > old_unread) 
		{
		    // send out a generic 'you have unread items' notification
		    GrowlMonkey.notify(GoogleReaderGrowl.appname, 'newitems', 'Google Reader', (unreadText || "") + " unread item(s)");

            // send out a notification for each unread item individually
            if(!firstTime){
		        var items = getElementsByClassName('entry');
		        if(items && items.length){
		            for(i=0; i < ((unread/1)-(old_unread/1)); i++)
		            {
		                var item = items[i];
		                if(item.className.indexOf('read') < 0){
    			            var feed = item.getElementsByClassName('entry-source-title')[0].innerHTML;
    			            var preview = item.getElementsByClassName('entry-title')[0].innerHTML;

        			        GrowlMonkey.notify(GoogleReaderGrowl.appname, 'individual', feed, preview);
        			    }
		            }
		        }
		    }
        }

		if(!firstTime && !focused) refresh();        
        waitAndCheckAgain();
    }
    
    function waitAndCheckAgain(){
        window.setTimeout(function(){doUpdates();}, 10 * 1000); // Check for new messages every 10 seconds
    }

	function refresh()
	{
		var refreshelm = document.getElementById('viewer-refresh');
		if(refreshelm)
		{
			var e = document.createEvent('MouseEvents');
			e.initMouseEvent("click", true, true, window,
			    0, 0, 0, 0, 0, false, false, false, false, 0, null);
			refreshelm.dispatchEvent(e);
			return true;
		}
		else
			return false;
	}

    return {
        appname : "Google Reader",

        init : function(){
            GoogleReaderGrowl.register();
            doUpdates(true);
        },

        register :  function(){
            var ntNewItems = {};
            ntNewItems.name = "newitems";
            ntNewItems.displayName = "New Unread Items";
            ntNewItems.enabled = true;

            var ntIndividual = {};
            ntIndividual.name = "individual";
            ntIndividual.displayName = "New Individual Item";
            ntIndividual.enabled = true;

            var types = [ntNewItems, ntIndividual];

            GrowlMonkey.register(GoogleReaderGrowl.appname, "http://growlforwindows.com/gfw/images/plugins/googlereader.png", types);
        }
    }
}();


/* === GETELEMENTSBYCLASSNAME ===
   Developed by Robert Nyman, http://www.robertnyman.com
   Code/licensing: http://code.google.com/p/getelementsbyclassname/
   ============================== */


var getElementsByClassName = function(className, tag, elm) {
    if (document.getElementsByClassName) {
        getElementsByClassName = function(className, tag, elm) {
            elm = elm || document;
            var elements = elm.getElementsByClassName(className),
            nodeName = (tag) ? new RegExp("\\b" + tag + "\\b", "i") : null,
            returnElements = [],
            current;
            for (var i = 0, il = elements.length; i < il; i += 1) {
                current = elements[i];
                if (!nodeName || nodeName.test(current.nodeName)) {
                    returnElements.push(current);
                }
            }
            return returnElements;
        };
    }
    else if (document.evaluate) {
        getElementsByClassName = function(className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
            classesToCheck = "",
            xhtmlNamespace = "http://www.w3.org/1999/xhtml",
            namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace) ? xhtmlNamespace: null,
            returnElements = [],
            elements,
            node;
            for (var j = 0, jl = classes.length; j < jl; j += 1) {
                classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
            }
            try {
                elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
            }
            catch(e) {
                elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
            }
            while ((node = elements.iterateNext())) {
                returnElements.push(node);
            }
            return returnElements;
        };
    }
    else {
        getElementsByClassName = function(className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
            classesToCheck = [],
            elements = (tag === "*" && elm.all) ? elm.all: elm.getElementsByTagName(tag),
            current,
            returnElements = [],
            match;
            for (var k = 0, kl = classes.length; k < kl; k += 1) {
                classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
            }
            for (var l = 0, ll = elements.length; l < ll; l += 1) {
                current = elements[l];
                match = false;
                for (var m = 0, ml = classesToCheck.length; m < ml; m += 1) {
                    match = classesToCheck[m].test(current.className);
                    if (!match) {
                        break;
                    }
                }
                if (match) {
                    returnElements.push(current);
                }
            }
            return returnElements;
        };
    }
    return getElementsByClassName(className, tag, elm);
};

/* === //GETELEMENTSBYCLASSNAME === */


// initialize the whole works
window.addEventListener("load", function(e) {
     GoogleReaderGrowl.init();
}, false);


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