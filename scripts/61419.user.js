// ==UserScript==
// @name           Brizzly Favicon Alerts
// @description    Alerts you to unread items in Brizzly through the favicon.
// @version        1.0
// @date           2009-11-06
// @author         Peter Wooley
// @author         Tyler Sticka
// @namespace      http://peterwooley.com
// @include        http://brizzly.com/*
// ==/UserScript==

window.addEventListener('load', function() {
	new BrizzlyFaviconAlerts;
}, true);

function BrizzlyFaviconAlerts() {
	var self = this;

	this.construct = function() {
		this.head = document.getElementsByTagName("head")[0];
		this.icons = {
			read: 'data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEzBeAxMwXlATMF6TEzBeyhMwXvETMF7xEzBeyhMwXpMTMF5QEzBeAwAAAAAAAAAAAAAAAAAAAAAAAAAAEzBeLRMwXpkdPnP/JkqF/y1UlP8yW57/Mlue/y1UlP8mSoX/HT5z/xMwXpkTMF4tAAAAAAAAAAAAAAAAEzBeIRMwXqsoTIf/Nl+j/zZfo/82X6P/Nl+j/zZfo/82X6P/Nl+j/zZfo/8oTIf/EzBeqxMwXiEAAAAAAAAAABMwXnslR4D/OGCk/zhgpP84YKT/OGCk/xQnSP8fOGT/OGCk/zhgpP84YKT/OGCk/yVHgP8TMF57AAAAAAAAAAATMF7GL1SQ/zpipf86YqX/OmKl/zpipf86YqX/OmKl/zpipf86YqX/OmKl/zpipf8vVJD/EzBexgAAAAAAAAAAEzBe+DZak/89ZKT/PWSm/z1kpv89ZKb/PWSm/z1kpv89ZKb/PWSm/z1kpv89ZKT/NlqT/xMwXvgAAAAAAAAAABMwXv85Woz/NVmT/zxiov8/Zqf/P2an/z9mp/8UJ0j/FCdI/z9mp/88YqL/NVmT/zlajP8TMF7/AAAAAAAAAAATMF7/RGOT/zBSh/80V47/FCdI/2SCs/9BZqb/QWam/z1joP85XZj/FCdI/1l1n/9EY5P/EzBe/wAAAAAAAAAAEzBe/1BtmP8zVIj/M1SI/xQnSP9cdqD/M1SI/zNUiP8zVIj/M1SI/xQnSP9cdqD/UG2Y/xMwXv8AAAAAAAAAABMwXv9ZdJ7/NleK/zZXiv9eeaH/SmiW/zZXiv82V4r/NleK/zZXiv9eeaH/SmiW/1l0nv8TMF7/AAAAAAAAAAATMF7/YHqi/z5ej/8+Xo//Pl6P/zhZi/84WYv/OFmL/zhZi/8+Xo//Pl6P/z5ej/9geqL/EzBe/wAAAAAAAAAAEzBe/2J8o/9WcZv/T2qV/1p1n/9Oapj/RGST/0Rkk/9Oapj/WnWf/09qlf9adZ//Ynyj/xMwXv8AAAAAEzBeljRQe/8nPWH/EzBe7xMwXtc7V4H/T2qT/114n/9deJ//T2qT/ztXgf8TMF7XLEh0/yc9Yf80UHv/EzBelhMwXvw0Sm//LUl1/xMwXlETMF40EzBegBMwXsATMF7tEzBe7RMwXsATMF6AEzBeNBMwXlEtSXX/QlmA/xMwXvwTMF5mEzBe7RMwXrQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEzBetBMwXu0TMF5m//9DBfgfQwXgBwAAwAMAAMADAACAAQAAgAEAAIABAACAAQAAgAEAAIABqnGAAQCAgAEAAAAAAAAYGAAAn/kAAA==',
			unread:	'data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwFA0GsBQNIDAUDTVwFA01cBQNIDAUDQaAAAAAAAAAAAAAAAAEzBeAxMwXlATMF6TEzBeyhMwXvETMF7xEzBeyoFEQ8nXblP/5nxh/+Z2W//WZEj/wFA0gAAAAAAAAAAAEzBeLRMwXpkdPnP/JkqF/y1UlP8yW57/Mlue/y1UlP+nT0H/54Zu/+6Lcv/thWr/5nZb/8BQNNUAAAAAEzBeIRMwXqsoTIf/Nl+j/zZfo/82X6P/Nl+j/zZfo/82X6P/qVJG/+iLc//vkXn/7oty/+Z8Yf/AUDTVAAAAABMwXnslR4D/OGCk/zhgpP84YKT/OGCk/xQnSP8fOGT/OGCk/3xYbP/Zdl3/6Itz/+eGbv/XblP/wFA0gAAAAAATMF7GL1SQ/zpipf86YqX/OmKl/zpipf86YqX/OmKl/zpipf9IYJn/fVls/6pTR/+oUUP/dUJG48BQNBoAAAAAEzBe+DZak/89ZKT/PWSm/z1kpv89ZKb/PWSm/z1kpv89ZKb/PWSm/z1kpv89ZKT/NlqT/xMwXvgAAAAAAAAAABMwXv85Woz/NVmT/zxiov8/Zqf/P2an/z9mp/8UJ0j/FCdI/z9mp/88YqL/NVmT/zlajP8TMF7/AAAAAAAAAAATMF7/RGOT/zBSh/80V47/FCdI/2SCs/9BZqb/QWam/z1joP85XZj/FCdI/1l1n/9EY5P/EzBe/wAAAAAAAAAAEzBe/1BtmP8zVIj/M1SI/xQnSP9cdqD/M1SI/zNUiP8zVIj/M1SI/xQnSP9cdqD/UG2Y/xMwXv8AAAAAAAAAABMwXv9ZdJ7/NleK/zZXiv9eeaH/SmiW/zZXiv82V4r/NleK/zZXiv9eeaH/SmiW/1l0nv8TMF7/AAAAAAAAAAATMF7/YHqi/z5ej/8+Xo//Pl6P/zhZi/84WYv/OFmL/zhZi/8+Xo//Pl6P/z5ej/9geqL/EzBe/wAAAAAAAAAAEzBe/2J8o/9WcZv/T2qV/1p1n/9Oapj/RGST/0Rkk/9Oapj/WnWf/09qlf9adZ//Ynyj/xMwXv8AAAAAEzBeljRQe/8nPWH/EzBe7xMwXtc7V4H/T2qT/114n/9deJ//T2qT/ztXgf8TMF7XLEh0/yc9Yf80UHv/EzBelhMwXvw0Sm//LUl1/xMwXlETMF40EzBegBMwXsATMF7tEzBe7RMwXsATMF6AEzBeNBMwXlEtSXX/QlmA/xMwXvwTMF5mEzBe7RMwXrQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEzBetBMwXu0TMF5m/+GqcfgAAIDgAAAAwAAAAMAAAACAAQAAgAEAAIABAACAAQAAgAEAAIABqnGAAQCAgAEAAAAAAAAYGAAAn/kAAA==',
		};
		this.title = 'Brizzly Favicon Alerts';
		this.eventName = 'newMessage';
		this.wasUnread = false;
		// Register Growl Commands
		GrowlMonkey.register(this.title, "http://peterwooley.com/projects/greasemonkey/brizzlyfaviconalerts/1.0/logo.png", [{name:this.eventName, displayName:'New message in Brizzly.', enabled:true}]);

		this.timer = setInterval(this.poll, 500);
		this.poll();
		
		return true;
	}
	
	this.isUnread = function() {
		var hasNewItems = document.getElementsByClassName('has-new-items');
		
		if (hasNewItems && hasNewItems.length) {
			return true;
		}
		
		return false;
	}
	
	this.poll = function() {
		if (self.isUnread()) {
			self.setIcon(self.icons.unread);
			if(!self.wasUnread) {
				self.sendNotification();
				self.wasUnread = true;
			}
		} else {
			self.setIcon(self.icons.read);
			self.wasUnread = false;
		}
	}
	
	this.sendNotification = function() {
		GrowlMonkey.notify(self.title, self.eventName, 'New Message', 'New Message in Brizzly!');
	}
	
	this.setIcon = function(icon) {
		var links = self.head.getElementsByTagName("link");
		for (var i = 0; i < links.length; i++)
			if (links[i].type == "image/x-icon" && 
			   (links[i].rel == "shortcut icon" || links[i].rel=="icon") &&
			   links[i].href != icon)
				self.head.removeChild(links[i]);
			else if(links[i].href == icon)
				return;

		var newIcon = document.createElement("link");
		newIcon.type = "image/x-icon";
		newIcon.rel = "shortcut icon";
		newIcon.href = icon;
		return self.head.appendChild(newIcon);
	}
	
	this.toString = function() { return '[object BrizzlyFaviconAlerts]'; }
	
	return this.construct();
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