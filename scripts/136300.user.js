// ==UserScript==
// @name        Twitter Growl
// @namespace   eeems.omnimaga.org
// @description Sends a growl notification on new tweets
// @icon		http://twitter.com/favicon.ico
// @include     http*twitter.com/*
// @exclude		http*api.twitter.com/*
// @version     1.2
// ==/UserScript==
debug = false;
window.addEventListener("load", function(e) {
	var $ = jQuery = unsafeWindow.jQuery;
	if(debug){
		var console = unsafeWindow.console;
	}else{
		var console = {log:function(){}};
	}
	console.log('Patched $,jQuery and console');
	TwitterGrowl = function(){
		var originalTitle = document.title;
		var currentNumber = 0;
		return {
			appname: 'Twitter Growl',
			init: function(){
				console.log('Starting '+ TwitterGrowl.appname);
				GrowlMonkey.register(TwitterGrowl.appname, "http://twitter.com/favicon.ico",[{
					name: 'newitems',
					displayName: 'New Unread Items',
					enabled: true
				}]);
				TwitterGrowl.interval = setInterval(function () {
					if(document.title !== originalTitle) {
						var n = document.title.split(/\((.+)?/);
						if(typeof n[1] != 'undefined'){
							n = n[1].split(/(.+)\)/);
							if(typeof n[1] != 'undefined'){
								n = n[1];
								if(n > currentNumber){
									console.log('Sent Growl notification');
									GrowlMonkey.notify(TwitterGrowl.appname, 'newitems', 'New Tweets', 'There are '+(n-currentNumber)+' new tweets.');
									currentNumber = n;
								}
								return;
							}
						}
					}else if(currentNumber != 0){
						currentNumber = 0;
						console.log('Tweets read');
					}
				},100);
			},
			interval: false
		}
	}();

     TwitterGrowl.init();
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