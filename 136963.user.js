// ==UserScript==
// @name           AttackNotifier
// @namespace      EvilInc
// @author         Elgraham14
// @description    Sends you an email when an attack comes in.
// @version        1.0.0
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// ==/UserScript==

(function () {
	
	try {
		
		var AN_mainFunction = function() {
			
			try {
				
				var app;
				var player;
				var playerName; 
				var serverBar;
				var email;
				var gui;
				var optionsPage;

				function loadCheck() {
					console.log("Attack Notifier: Loading...");	
					window.setTimeout(checkIfLoaded, 5000);
				}

				function checkIfLoaded() {
					
					try {
						
						var isLoaded = false;
						app = qx.core.Init.getApplication();
						player = webfrontend.data.Player.getInstance();
						playerName = player.getName();

						if (app && player) {	
							if (app.title) {
								var playerId = player.getId();
								if (playerId > 0){
									isLoaded = true;
								}
								else {
									window.setTimeout(loadCheck, 5000);
								}
							}
						}

						if (isLoaded) {
							console.log("Attack Notifier: Tweaking GUI");
							if (getStoredValue("Email Address") != null){
								var email = getStoredValue("Email Address");
								alert("Your saved email address is " + email + ". If this is wrong, please change it on the Attack Notifier Settings page.");
								guiTweak();
							}

							else {
								guiTweak();	
								getEmail();
							}
						}

						else {
							console.log("Attack Notifier: Waiting");
							loadCheck();
						}

					}
					catch (e) {
						console.log(e);
					}
				}
				
				function guiTweak(){ 
					serverBar = app.serverBar;
					var btn = new qx.ui.form.Button("AN");
					btn.set({width: 35, appearance: "button-text-small", toolTipText: ("Click to edit Attack Notifications Settings")});
					btn.addListener("click", showOptionsPage, this);
					serverBar.add(btn, {top: 2, left: 350});
				}

				function getEmail (){
					var email = prompt("Enter the email address where you would like your notifications sent:");
					setStoredValue("Email Address", email);
				}

				function showOptionsPage(){ 
					null;
				}

				function emailNotify() {
					null;
				}

				function setStoredValue(key, value) {
					GM_setValue(key, value);
				}

				function getStoredValue(key) {
					var result = GM_getValue(key);
					return result;
				}

				window.setTimeout(loadCheck, 10000);
				console.log("Attack Notifier:Loading");
			}

			catch (e) {
				console.log(e);
			}
			
		} // AN_mainFunction

		if (/lordofultima\.com/i.test(document.domain)){
			var ANScript = document.createElement("script");
			var txt = AN_mainFunction.toString();
			ANScript.innerHTML = "(" + AN_mainFunction() + ")();";
			ANScript.type = "text/javascript";
			document.getElementsByTagName("head")[0].appendChild(ANScript);
		}
		console.log("Injecting Attack Notifier");
		
	} // main try/catch
	
	catch (e) {
		console.log(e);
	}
})();