/**
 * User: LGG
 * Date: 10/2/12
 * Time: 12:40 AM
 */
// ==UserScript==
// @name           Fortune Teller Notification LGG
// @description    Pops up the fortune Teller when it is availiable
// @namespace      LOU LGG
// @author         LGG
// @icon		   http://i1170.photobucket.com/albums/r523/lordgreggreg/Screenshots/2012-07-07_12-04-45.png
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        1.5
// @require http://sizzlemctwizzle.com/updater.php?id=149441
// ==/UserScript==
(function wrapper(){
	var main = function mainFunc() {

		function waitForQX()
		{
			if (typeof qx == 'undefined')
			{
				window.setTimeout(waitForQX, 5000);
			} else
			{
				window.setTimeout(loadClasses, 500);
			}
		}
		window.setTimeout(waitForQX, 5000);

		function loadClasses()
		{
			window.setTimeout(checkIfLoaded, 1000);
			function lgglog(lggToLog)
			{
				if(typeof lggSaidLog != 'undefined')
				{
					if(lggSaidLog>0)
						console.log(lggToLog);
				}
			}
			function checkIfLoaded()
			{
				a = qx.core.Init.getApplication();
				al = webfrontend.data.Alliance.getInstance();
				if (a && a.chat && al && al.getName().toString()!="")
				{
					lgg.ftFix.getInstance().start();
				} else {
					window.setTimeout(checkIfLoaded, 1000);
				}
			}
			qx.Class.define("lgg.ftFix",
			{
				type: "singleton",
				extend: qx.core.Object,

				members: {
					lastCheckTime                   :0,
					lastPopupTime					:0,
					state							:0,
					start: function()
					{
						webfrontend.base.Timer.getInstance().addListener("uiTick", this.fortuneTellerCheck, this);
					},
					fortuneTellerCheck: function()
					{
						var elapsedTime = (new Date().getTime()) - this.lastCheckTime;
						if (elapsedTime >= (5000))    //5 seconds
						{
							var stepsLeft = webfrontend.gui.FortuneTeller.Util.getStepsTillNextFreeToken();
							var serverTimeObj = webfrontend.data.ServerTime.getInstance();
							var stepsPerSecond = serverTimeObj.getStepsPerSecond();
							var secondsLeft = webfrontend.Util.getTimespanString(stepsLeft / stepsPerSecond);
							lgglog("Checking fortune teller status: "+secondsLeft+ " left.");
							qx.core.Init.getApplication().title.fortuneTellerButton.setToolTipText("<b>"+secondsLeft+"</b><br>Until next Free Token");
							if(stepsLeft<=1)
							{
								qx.core.Init.getApplication().title.fortuneTellerButton.setToolTipText("<b>Free Token Ready Now!</b>");
								//show the window, stop the timer
								var popupElapsedTime = (new Date().getTime()) - this.lastPopupTime;
								if (popupElapsedTime >= (10*60*1000))    //10 minutes
								{
									this.lastPopupTime= new Date().getTime();
									//qx.core.Init.getApplication().showFortuneTellerWindow();
									lgg.NotificationWindow.create("Free Fortune Teller Token Is Ready!");
								}
							}

							this.lastCheckTime = new Date().getTime();
						}
					}
				}
			});
			qx.Class.define("lgg.NotificationWindow", {
				extend: qx.ui.window.Window,
				statics:{
					thisinstance: null,
					create:function(message){
						var win;
						if (this.thisinstance instanceof lgg.NotificationWindow){
							win = this.thisinstance;
							win.setMessage(message);
						}else{
							win = this.thisinstance = new lgg.NotificationWindow(message);
						}
						win.show();
						win.setActive(true);
						win.moveToNotificationArea();
						win.topOfTheStack();
						win.ding();
						return win;
					}
				},
				construct: function(message){
					this.base(arguments, "Notification", "resource/webfrontend/ui/icons/icon_autotrade_info.png");
					this.buildUI();
					this.setMessage(message);
				},
				members:{
					statusBarOffset:30,
					messageLabel:null,
					buildUI:function(){
						this.setLayout( new qx.ui.layout.VBox(2).set({alignX:"center"}) );
						this.set({width:200,minWidth:100,maxWidth:1000,height:125,minHeight:100,maxHeight:800,
							allowMaximize:false,allowMinimize:false,showMaximize:false,showMinimize:false,
							showStatusbar:false,resizeSensitivity:7,contentPadding:10,useMoveFrame:true});

						// create elements
						var dismissButton = new qx.ui.form.Button("Ok").set({allowGrowX:false});
						dismissButton.addListener("execute", function(){qx.core.Init.getApplication().showFortuneTellerWindow();this.close();}, this);

						this.messageLabel = new qx.ui.basic.Label().set({rich:true, textAlign:"center"});

						// add elements
						this.add(new qx.ui.core.Spacer(), {flex:1});
						this.add(this.messageLabel);
						this.add(new qx.ui.core.Spacer(), {flex:1});
						this.add(dismissButton);
					},
					setMessage:function(message){
						this.messageLabel.setValue(message);
					},
					moveToNotificationArea:function(){
						var parent = this.getLayoutParent();
						if (!parent)
							return;

						var bounds = parent.getBounds();
						var size = this.getSizeHint();

						var left = Math.max(0, bounds.width - size.width);
						var top = Math.max(0, bounds.height - size.height - this.statusBarOffset);

						this.moveTo(left,top);
					},
					topOfTheStack:function(){
						this.setAlwaysOnTop(true);
						var parent = this.getLayoutParent();
						parent.addAt(this, parent.getChildren().length - 1);
					},
					ding:function(){
						if (true)
							ClientLib.Vis.VisMain.GetInstance().PlayUISound("audio/ui/ui_popup");
					}
				}
			});
			// END NotificationWindow
		}//loadClasses
	}//main


	function injectLOULGGScript() {
		var jqscript = document.createElement("script");
		jqscript.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
		document.body.appendChild(jqscript);
		var script = document.createElement("script");
		script.innerHTML = "(" + main.toString() + ")();";
		script.type = "text/javascript";
		document.getElementsByTagName("head")[0].appendChild(script);
		if (typeof GM_deleteValue == 'undefined') {
			GM_addStyle = function(css) {
				var style = document.createElement('style');
				style.textContent = css;
				document.getElementsByTagName('head')[0].appendChild(style);
			}

			GM_deleteValue = function(name) {
				localStorage.removeItem(name);
			}

			GM_getValue = function(name, defaultValue) {
				var value = localStorage.getItem(name);
				if (!value)
					return defaultValue;
				var type = value[0];
				value = value.substring(1);
				switch (type) {
					case 'b':
						return value == 'true';
					case 'n':
						return Number(value);
					default:
						return value;
				}
			}

			GM_log = function(message) {
				console.log(message);
			}

			GM_registerMenuCommand = function(name, funk) {
				//todo
			}

			GM_setValue = function(name, value) {
				value = (typeof value)[0] + value;
				localStorage.setItem(name, value);
			}
		}

	}
	window.setTimeout(injectLOULGGScript, 100);
})();