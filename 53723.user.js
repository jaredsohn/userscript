// ==UserScript==
// @name        GoogleVoiceGrowl
// @namespace   http://www.growlforwindows.com
// @description Sends Growl notifications for Google Voice updates
// @include     https://www.google.com/voice*
// @include     http://www.google.com/voice*
// @credit      Based on Fluid script by Felipe Oduardo
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @history     1.0 - initial release
//              1.1 - includes the actual text of the message in the notification
//              1.1.1 - GV changed their html so updates were broken
// ==/UserScript==


GoogleVoiceGrowl = function(){
    // Setup variables
    var lastCount = 0;

    function doUpdates() {
	    // Total number of new items
	    var currentCount = Number(getNotificationTotal());
   
	    var newItems = 0;
	    if(currentCount && currentCount !=0) newItems = currentCount - lastCount;

	    if(newItems > 0) {
	        $(".gc-message:not(.gc-message-read)").each(
	            function(i){
	                // only show new items, not all unread items
	                if(i+1 > newItems) return false;

	                var type = "newinboxitem";
	                var title = "New Inbox Item";
	                var from = "";
	                if($(this).hasClass("gc-message-sms")){
	                    type = "newsms";
	                    title = "New SMS";
	                }
	                else if($(this).hasClass("gc-message-unread")){
	                    from = $(this).find(".gc-message-name :visible").text();
	                    from = fixText(from);
	                    type = "newvoicemail";
	                    title = "New Voicemail from " + from;
	                }

	                //var text = $(this).find(".gc-message-message-display :visible").html();   // this is really slow
	                var text = $(this).find(".gc-message-message-display").html();
	                text = fixText(text);
	                
	                var img = $(this).find(".gc-message-portrait img")[0].src;
	                if(img.indexOf("blue_ghost") > 0) img = null;  // dont send the default contact image

	                doGrowlAlert(type, title, text, img);
	            }
	        );
	    }
	    
	    lastCount = currentCount;
    }

    function doGrowlAlert(type, title, text, icon) {
	    // Show Growl Alert
	    GrowlMonkey.notify(GoogleVoiceGrowl.appname, type, title, text, icon);
    }

    function getNotificationTotal() {
	    // Get the HTML from the Inbox element on the sidebar
        var sidebar = $(".gc-inbox-sidebar-menu div")[0].innerHTML;
	    // Split it so that we only have the number parts just to make sure theres no other number here
	    var number = sidebar.split('>Inbox')[1];
	    // Get the number from the 
	    var count = number.match(/(\d+)/g);

	    return count;
    }

    function fixText(text){
        // fix up text
        var re = /[\r\n\t]+/g;  // remove all line breaks and tabs
        text = text.replace(re, "");
        re = /<\/div>/g;    // replace any closing </div>s with a line break
        text = text.replace(re, "\n");
        re = /<\S[^><]*>/g; // strip remaining html tags
        text = text.replace(re, " ");
        re = "  ";              // remove duplicate whitespace
        while(text.indexOf(re) >= 0){
            text = text.replace(re, " ");
        }
        return text;
    }
    
    return {
        appname : "Google Voice",

        init : function(){
            GoogleVoiceGrowl.register();
            //doUpdates(5000);
            window.setInterval(doUpdates, 5 * 1000); // Check for new messages every 5 seconds
        },

        register :  function(){
            var ntNewVoicemail = {};
            ntNewVoicemail.name = "newvoicemail";
            ntNewVoicemail.displayName = "New Voicemail";
            ntNewVoicemail.enabled = true;

            var ntNewSMS = {};
            ntNewSMS.name = "newsms";
            ntNewSMS.displayName = "New SMS";
            ntNewSMS.enabled = true;

            var ntNewInboxItem = {};
            ntNewInboxItem.name = "newinboxitem";
            ntNewInboxItem.displayName = "New Inbox Item";
            ntNewInboxItem.enabled = true;

            var types = [ntNewVoicemail, ntNewSMS, ntNewInboxItem];

            GrowlMonkey.register(GoogleVoiceGrowl.appname, "http://growlforwindows.com/gfw/images/plugins/googlevoice.png", types);
        }
    }
}();

// initialize the whole works
$(document).ready(function() {
    GoogleVoiceGrowl.init();
});

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