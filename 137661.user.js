// ==UserScript==
// @name        Google+ Growl
// @namespace   eeems.omnimaga.org
// @description Sends a growl notification on new notifications
// @icon		http://plus.google.com/favicon.ico
// @include     http*plus.google.com/*
// @exclude     http*plus.google.com/u/0/_/notifications/frame?*
// @exclude     http*plus.google.com/_/apps-static/*
// @version     1.1
// ==/UserScript==
debug = true;
window.addEventListener("load", function(e) {
	if(debug){
		var console = unsafeWindow.console;
	}else{
		var console = {log:function(){}};
	}
	console.log('Patched console');
	GooglePGrowl = function(){
		var currentNumber = 0;
		return {
			appname: 'Google+ Growl',
			init: function(){
				console.log('Starting '+ GooglePGrowl.appname);
				GrowlMonkey.register(GooglePGrowl.appname, "http://plus.google.com/favicon.ico",[{
					name: 'newnotifications',
					displayName: 'New Unread Notifications',
					enabled: true
				}]);
				GooglePGrowl.interval = setInterval(function () {
					if(document.getElementById('gbi1').innerHTML !== 0) {
						var n = document.getElementById('gbi1').innerHTML;
						if(n > currentNumber){
							console.log('Sent Growl notification');
							GrowlMonkey.notify(GooglePGrowl.appname, 'newnotifications', 'New Notifications', 'There are '+(n-currentNumber)+' new notifications.');
							currentNumber = n;
						}
					}else if(currentNumber != 0){
						currentNumber = 0;
						console.log('Notifications read');
					}
				},100);
			},
			interval: false
		}
	}();
    GooglePGrowl.init();
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