// ==UserScript==
// @name           Kongregate PM Notifier
// @namespace      tag://kongregate
// @description    Blinks the favicon, prepends an unread count and plays a chime when the chat window loses focus and you receive PMs. /pmchime toggles the chime on and off.
// @include        http://www.kongregate.com/games/*
// @author         MrSpontaneous
// @version        1.4
// @date           3/22/2010
// @id 65622
// @tab chat_formatting
// @enabledbydefault true
// @homepage http://userscripts.org/scripts/show/65622
// ==/UserScript==

// Written by MrSpontaneous (http://www.kongregate.com/accounts/MrSpontaneous) 01/03/2010
// Updated 02/28/2010 - added a chime.
// Updated 05/19/2010 - fixed phantom notifications due to PMs from muted people. Thanks Spaghedeity!
// Updated 03/22/2011 - Made compatible with Firefox 4

var dom = (typeof unsafeWindow === "undefined"?window:unsafeWindow);

function pmnotifier(dom){
	var holodeck = dom.holodeck,
		CDialogue = dom.ChatDialogue;
	if (CDialogue){
		CDialogue.prototype = dom.CDprototype||dom.ChatDialogue.prototype;
		
		if (!CDialogue.prototype.new_private_message) {
			dom._animatedFav = false;
			dom._pmCount = 0;
			dom._baseTitle = document.title;
			dom._blurred = false;
			dom._chime = dom.document.createElement('audio');
			dom._chime.setAttribute('src', 'data:audio/wav;base64,UklGRi4IAABXQVZFZm10IBAAAAABAAEAESsAABErAAABAAgAZGF0YakHAACAgIGBgYKEh4qLjIyNjY2LioqJh4aGio2QkZGRkI6Lh4B3cXJ0dnp/g4aHiImDdm1pZmVnbHR6fYGLlZuhpKOgnp2dnJGCdWldU0pEPjgyOktaaHR+homLjZWYjn9wYFJNSUZCPkNadYuitMXU2+Dn7uXRv7KnoaCkqKagpLO8wsfJyMG7uLetlYBzaF5ZVFNVVFFWYmt1fH58dm9pZl9NOy4hFQsEBAgKDRwyQ1NldICIi4+Xm5iVkId/eHR0dHN0gZWnuMna6fX6/P/979/Ova+knpybmJWZoaOlp6elopuVk4t7bF9SSUNAP0JGR0xZZXB8g4eLjod6aVdJPjEjHyUwPUlSXnKEiYF0aF1SQjIvOEdZa3iJnaqspp6WlZOLipSlus7d5vD17t/Qv7Oup5+cpbPCztHT1dTFrZN6ZVhLPjo/SVRcW1xiZFtKNiQYEAgAAg4fMkBIUV5mZV9ZVVpjZ218kanB0tzl7Ori2M/IyMrIydDd6vX49fHt4cy0nYd5cGVdXWJpb29pZmZhVEIuHRIMBQAEDhonMTY9RkxMSkVCRk9UWWV3ip6uusPLzcrFwLu7wMPFy9fj7/j6+PTs38y4o5OJgXhzdnuAhYR/endvYU87KiAaEw8SGyYxO0BGTlJQS0VAQEZKTllrf5WsvcHBwcC8s62xvcfT4+/z9vn359PEuayhm5iTi4J3alpQTkxFPjovIRYNBQIKHC0+UGFkXltbWFRXaX+UqsPZ4+fq6uHUzs7LyMvT19HGt5+Da19YVFJWW1ZNRTwvJis2QElVX1tRS05QUmF8mbHK5vn79e7j0b60rqqorLjCv7WnkHFVRDYtKzE2NDAvLysnLDlDTVpna2NdYmptdYqlu9Dn+v/68+zeyLavq6eor7i+vbeslnZcTkAzLS0uKiUmJiIdIzE6PkRMTUQ8P0ZLU2mJpLrT7Pv8+fXs28rEwr67v8vW1Mm/uLCllHdeVlJHNichIy5AXH2NjYuKhXpsaHJ6eHFoXFVWYHF2bWFVR0FETFdbV1piZ25/l7TM1tnZ0MfDwcPN1NTKtZ6Uj4iEgHRlU0I+RElSW1tZV1NTXGp/m662uLGloKCls8DCuaaMd2lgX2JeU0Y2KyszP0xSUFBQTlJfc4uisr/Hw7y8wMfS2NTHr5OAdGtpa2pmXlNNUFVaX15bWlhWW2RziJ2uvcbGwsC+wMXHw7ikjXpsY2JmZ2ZhV05LTE5RT0lFRUVKU2Fzhpajr7Owr66usrW0rqGNe25kXl9gX1xVTUtMT1RYWFdZXGFqdYSVpbG7wsK+vLm5vL26sqibj4d/enp5dW9mXFZTUFBQS0dGR0pSYHWGjY2RnK7Ayse3opOSmJaGbFFFSVRWTDwyPVd2iIh8cHWKqr++pouAh5idjGtLP0hdZ1xGOENkj6+2rKCmwOP589aznp+rq5RrQzI7UWBbSDU2T3eaqJ+NhpOwy9G/n4eDjpaIZDodGSk8PzMgGCdLdI+XkIuWstXq5syunaGtr5p0TTg6SlZTRTc3TnWarayhnarH5fPpzK6en6SehmJBMjVCRz4sHiE5X4CRj4WBjqnH1c62npOVmpV/YEU7QlBXTjwtLUJkhZeZk5GbscnVzrunnZ6jnolpSz1BUl9fUkRATmqKoKejnqCsvsnEspyNjJOWinFUPjhATVJMQDg8TmiAjZGSl6S5zNTMu6mhpKqpm4BjT0pPWFpTS0ZNXHGAh4aDhIydrbOsnIyGipSZkoFwYVZQUVRZYGdpa25sZWNpdoynur65rqKZlpaVl56ioJmLdV9SS09bZmZcTj4xMjtIU1xbVFJWWFdZXmp/ma24vbispaixvMza39rQwK6gl4yCgYOCfHBcRzs7QEpXW1ZOR0A9Q09gdo2eqK+xqZ+Zl5qltL/AuKaOeWxlYmVrbWpjWk5HRklOVl1fXVxbV1ZbZ3eMn6y0ubq1sK6vsLa9wsTAtqaViH52c3V1cWpgVU5MTk9RVFNQUVNUVVpganeIlZ6kpaGbl5eYm6Glp6ahmY2De3JtbG5vbmpiWlVWWV1jZmZjY2VnbHJ5gImSmqCmqaijn5ybnaKmqKahmZCKhYF9enh0cW5qZmRiYmJkZmdnaGhoaWtvdX2EiYyOkZKSkZGQj5CRkpOSkIqFgHt3dXNyc3R1dnl9gYOBfXh1c3Fta2xvcnV3e4CEhoaGhoiIhoSEhomNkJSan6GhnpuZlpGMiIaGhYOCg4WGhoOBfXp1cGtnZ2dnZ2hrbm9ubGtqaWdmZmltcHN2eXx9fHp6ent7e3x/g4iMj5KWmZqamZeWlJGOi4qJiYmJiouNjY2LioiFgn98e3p5eXl5ent7e3p6enp6enp6e3x8fH19fX19fn5+fn5+f39/f39/f3+AgICAgICAgICBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgABMSVNUWAAAAElORk9JQ09QHwAAAENvcHlyaWdodCCpIENpbmVtYXRyb25pY3MgMTk5NQAASVBSRCMAAABNaWNyb3NvZnQgUGx1cyEgriBmb3IgV2luZG93cyA5NSCuAAA=');
			dom.chime.load();
			
			dom.document.addEventListener("blur", function() {
				dom.blurred = true;
			}, false);
			
			dom.document.addEventListener("focus", function() {
				dom.blurred = false;
				dom.pmReset();
			}, false);
			
			dom.pmReset = function() {
				if (dom.animatedFav) {
					dom.toggleFavLink();
				}
				dom.pmCount = 0;
				document.title = dom._baseTitle;
			}
			
			dom.createFavLink = function(attr) {
				var link = document.createElement("link");
				link.type = attr['type'];
				link.rel = attr['rel'];
				link.href = attr['href'];
				return link;
			}

			dom.toggleFavLink = function() {
				var head = document.getElementsByTagName("head")[0];
				var links = head.getElementsByTagName("link");
				for (var i=0; i<links.length; i++) {
				  var link = links[i];
				  if (link.rel=="shortcut icon") {
					head.removeChild(link);
				  }
				}
				if (dom._animatedFav) {
					head.appendChild(dom.createFavLink(dom._staticFavLinkAttr));
				}
				else {
					head.appendChild(dom.createFavLink(dom._animatedFavLinkAttr));
				}
				dom._animatedFav = !dom._animatedFav;
			}
			dom.staticFavLinkAttr = {'rel':'shortcut icon',  'href':'/favicon.ico', 'type':'image/x-icon'};
			dom.animatedFavLinkAttr = { 'rel':'shortcut icon', 'href':'data:image/gif;base64,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%3D', 'type':'image/gif'};
			
			CDialogue.prototype.new_private_message = function() {
				if (dom._blurred) {
					dom._pmCount++;
					if (!dom._animatedFav) {
						dom.toggleFavLink();
					}
					document.title = "[" + dom._pmCount + "] " + dom._baseTitle;
					if (holodeck._pm_chime) {
						dom._chime.play();
					}
				}				
			}
			
			if(!CDialogue.prototype.showReceivedPM_notifier){
				CDialogue.prototype.showReceivedPM_notifier = CDialogue.prototype.receivedPrivateMessage;
				CDialogue.prototype.receivedPrivateMessage = function(a){
					if (a.data.success && !this._user_manager.isMuted(a.data.from)) {
						this.new_private_message();
					}
					this.showReceivedPM_notifier(a);
				}
			}
			
			holodeck.addChatCommand("pmchime", function (l,n){
				if(l._pm_chime) {
					l._pm_chime = 0;
					l.activeDialogue().kongBotMessage("PM chime is OFF");
				} else {
					l._pm_chime = 1;
					l.activeDialogue().kongBotMessage("PM chime is ON");
				}
				window.setTimeout(function(){GM_setValue("kong_pmchime", l._pm_chime);}, 0);
				return false;
			});
			try{
				if (GM_setValue){ 
					var pm_chime = GM_getValue("kong_pmchime", 1);
				}else{
					GM_setValue = function(a,b){};
					var pm_chime = 1;
				}
			}catch(e){
				GM_setValue = function(a,b){};
				var pm_chime = 1;
			}
			holodeck._pm_chime = pm_chime;
		}
	}
};

function old_check_65622(){
	dom.injectScript = dom.injectScript||(document.getElementById("injectScriptDiv")?document.getElementById("injectScriptDiv").onclick():0);
	if(dom.injectScript){
		dom.injectScript(init_pmnotifier, 0);
	} else if(!dom._promptedFramework && !/Chrome/i.test(navigator.appVersion)){
		if(confirm("You don't have the latest version of the framework-script!\n" + 
		           "Please install it, otherwise the scripts won't work.\n" +
		           "Clicking ok will open a new tab where you can install the script"))
			window.open("http://userscripts.org/scripts/show/54245", "_blank");
		dom._promptedFramework = true;
	}
}

setTimeout(pmnotifier, 0, unsafeWindow)