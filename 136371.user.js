// ==UserScript==
// @name        Facebook Growl
// @namespace   eeems.omnimaga.org
// @description Sends a growl notification on new notifications
// @icon		http://facebook.com/favicon.ico
// @include     http*facebook.com/*
// @exclude		http*api.facebook.com/*
// @version     1.4
// ==/UserScript==
debug = false;
window.addEventListener("load", function(e) {
	if(debug){
		var console = unsafeWindow.console;
	}else{
		var console = {log:function(){}};
	}
	console.log('Patched console');
	FacebookGrowl = function(){
		var currentNumberN = 0,
			currentNumberM = 0,
			currentNumberV = 0;
		return {
			appname: 'Facebook Growl',
			init: function(){
				console.log('Starting '+ FacebookGrowl.appname);
				GrowlMonkey.register(FacebookGrowl.appname, "http://facebook.com/favicon.ico",[{
					name: 'newnotifications',
					displayName: 'New Unread Notifications',
					enabled: true
				},{
					name: 'newmessages',
					displayName: 'New Unread Messages',
					enabled: true
				},{
					name: 'newrequests',
					displayName: 'New Unread Requests',
					enabled: true
				}]);
				FacebookGrowl.interval = setInterval(function () {
					if(document.getElementById('notificationsCountValue').innerHTML !== 0) {
						var n = document.getElementById('notificationsCountValue').innerHTML;
						if(n > currentNumberN){
							console.log('Sent Growl notification');
							GrowlMonkey.notify(FacebookGrowl.appname, 'newnotifications', 'New Notifications', 'There are '+(n-currentNumberN)+' new notifications.');
							currentNumberN = n;
						}
					}else if(document.getElementById('mercurymessagesCountValue').innerHTML !== 0) {
						var n = document.getElementById('mercurymessagesCountValue').innerHTML;
						if(n > currentNumberM){
							console.log('Sent Growl notification');
							GrowlMonkey.notify(FacebookGrowl.appname, 'newmessages', 'New Messages', 'There are '+(n-currentNumberM)+' new messages.');
							currentNumberM = n;
						}
					}else if(document.getElementById('requestsCountValue').innerHTML !== 0) {
						var n = document.getElementById('requestsCountValue').innerHTML;
						if(n > currentNumberV){
							console.log('Sent Growl notification');
							GrowlMonkey.notify(FacebookGrowl.appname, 'newrequests', 'New Requests', 'There are '+(n-currentNumberV)+' new requests.');
							currentNumberV = n;
						}
					}else{
						if(currentNumberN != 0){
							currentNumberN = 0;
							console.log('Notifications read');
						}
						if(currentNumberM != 0){
							currentNumberM = 0;
							console.log('Messages read');
						}
						if(currentNumberV != 0){
							currentNumberV = 0;
							console.log('Requests read');
						}
					}
				},100);
			},
			interval: false
		}
	}();
    FacebookGrowl.init();
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