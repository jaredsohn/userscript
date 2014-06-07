// ==UserScript==
// @name           Netvibes Meebo Module Auto-Login
// @author         SpookyET
// @namespace      http://www.studioindustryllc.com
// @description    Auto-logins into the Meebo Netvibes Module.
// @version        1.1
// @date           2006-12-23
// @include        http://netvibes.com/*
// @include        http://*.netvibes.com/*
// ==/UserScript==

(function(){
	var meeboUserID = "user";
	var meeboPassword = "pass";
	
	var autoLogin = {
		loggedIn: false,
		login: function()
		{
			var meeboIDElement = document.getElementById("meeboid");
			var meeboPasswordElement = document.getElementById("meebopassword");
			var meeboLoginElement = document.getElementById("meebosignon");
			var clickMouseEvent;                   
			
			if (meeboIDElement && meeboPasswordElement && meeboLoginElement)
			{					
				meeboIDElement.value = meeboUserID;
				meeboPasswordElement.value = meeboPassword;
				
				clickMouseEvent = document.createEvent("MouseEvent");
				clickMouseEvent.initMouseEvent(
					'mouseup',
					true,
					true,
					window,
					0,
					0,
					0,
					0,
					0,
					false,
					false,
					false,
					false, 
					0, 
					null);
				
				meeboLoginElement.dispatchEvent(clickMouseEvent);
				
				this.loggedIn = true;
			}
			
			if (!this.loggedIn)
			{
				setTimeout(function() { autoLogin.login() }, 100);
			}
		}
	};

	autoLogin.login();
})();