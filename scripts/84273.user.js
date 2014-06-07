// ==UserScript==
// @name          CampfireGrowl
// @namespace     http://www.growlforwindows.com/userscripts
// @description	  Sends Growl notifications from the Campfire website when the currently playing track changes
// @include       *.campfirenow.com/room*
// ==/UserScript==

var CampfireGrowl = function(){
    return {
        appname : "Campfire Website",

        init : function(){

            CampfireGrowl.register();
            document.addEventListener("DOMNodeInserted", CampfireGrowl.issueNotifications, false);
        },

        register :  function(){
            var CampfireMessage = {};
            CampfireMessage.name = "NewMessage";
            CampfireMessage.displayName = "New Message";
            CampfireMessage.enabled = true;
            
            var CampfireTriggeredMessage = {};
            CampfireTriggeredMessage.name = "TriggeredMessage";
            CampfireTriggeredMessage.displayName = "Triggered Message";
            CampfireTriggeredMessage.enabled = true;
            

            var types = [CampfireMessage, CampfireTriggeredMessage];

            GrowlMonkey.register(CampfireGrowl.appname, "", types);
        },
        
        issueNotifications : function(message){
        if (message.target.id.indexOf("message_") > -1
        && message.target.id.indexOf("message_pending") == -1 
        && message.target.getElementsByTagName("td")[0].getAttribute("class") == "person"
        )
            {

                var messageText = message.target.getElementsByTagName("div")[0].innerHTML;
                if(matchesTrigger(messageText))
                {
                    GrowlMonkey.notify(CampfireGrowl.appname, "TriggeredMessage", message.target.getElementsByTagName("span")[0].innerHTML,
                    message.target.getElementsByTagName("div")[0].innerHTML, "http://campfirenow.com/images/logo-black-campfire.png" );
                }
                else
                {
                GrowlMonkey.notify(CampfireGrowl.appname, "NewMessage", message.target.getElementsByTagName("span")[0].innerHTML,
                message.target.getElementsByTagName("div")[0].innerHTML, "http://campfirenow.com/images/logo-black-campfire.png" );
                }
           }
        }
     

    }
}();


	matchesTrigger = function(message) {
		var trigger = document.getElementById('growl_trigger').value;
        if (trigger.length) {
			if (contents = /^\/(.+)\/([a-z]*)$/i.exec(trigger)) {
				trigger = new RegExp(contents[1], contents[2]);
			} else {
				trigger = new RegExp("\\b" + trigger + "\\b", "i");
			}
			if (trigger.exec(message)) return true;
		}
		return false;
	};


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
    		


insertConfigForm = function(window) {with(window) {
		if ($('campfire_notifications_div')) {
			$('campfire_notifications_div').remove();
		}

		new Insertion.After('participants', "\
			<div id=\"cn_config_div\">\
			<h3>Campfire Notifications <span>(<a href=\"#\" id=\"toggle_cn_options\" title=\"Toggle Options\">-</a>)</span></h3>\
			<form id=\"cn_form\" style=\"font-size: 10px\">\
				<input type=\"hidden\" name=\"show_options\" id=\"show_options\" value=\"true\" />\
				<fieldset>\
					<legend>Growl</legend>\
					<div>\
						On trigger\
						<input type=\"text\" name=\"growl_trigger\" id=\"growl_trigger\" />\
					</div>\
				</fieldset>\
			</form>\
			</div>\
		");
        }

        CampfireGrowl.init();
	}((typeof(unsafeWindow) != 'undefined') ? unsafeWindow:window);
insertConfigForm.init();

// initialize the whole works



