// ==UserScript==
// @name EA Command and Conquer: Tiberium Alliances English Translation Script
// @description EA Command and Conquer: Tiberium Alliances English Translation Script
// @namespace      http*://*.alliances.commandandconquer.com/*
// @include        http*://*.alliances.commandandconquer.com/*
// @version 1.2
// @author Topper42
// @grant none
// ==/UserScript==
(function(){
var injectFunction = function() 
{	
	function createClass()
	{
		qx.Class.define("EA_CNCTA_Translater", 
		{
			type: "singleton",
			extend: qx.core.Object,
			
			construct: function()
			{
				try
				{
					var app = qx.core.Init.getApplication();
					// create menu
					var cntButtons = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({ padding: 5, decorator: "pane-light-opaque" });
					cntButtons.add(new qx.ui.basic.Label("Translator").set({ alignX: "center", textColor: "#000000"}));
					var btnUpgradeAll = new qx.ui.form.Button("Translation Window").set({ 
					toolTipText: "open translation window"});
					btnUpgradeAll.addListener("execute",this.__openTranslationWindow, this);
					cntButtons.add(btnUpgradeAll);
				  	EA_CNCTA_Menu.getInstance().addContainer(cntButtons);	
				}
				catch (e)
				{
					console.log("Something is terribly wrong with this script. :(");
					console.log(e.toString());
				}
				console.log("EA_CNCTA_Translater: Initialising finshed");
			},
			
			destruct: function()
			{
				
			},
						
			members: 
			{
				__openTranslationWindow: function()
				{
					EA_CNCTA_Translater.TranslationWindow.getInstance().open();
				}
			}
		});
		
		if (typeof EA_CNCTA_Menu == "undefined")
		{
			qx.Class.define("EA_CNCTA_Menu", 
			{
				type: "singleton",
				extend: qx.core.Object,
				
				construct: function()
				{
					console.debug("creating menu");
					var app = qx.core.Init.getApplication();
					
					// create menu popup
					this.__popupMenu = new qx.ui.popup.Popup(new qx.ui.layout.VBox(5)).set({
						padding: [2, 4],
						position: "top-right"
					});
	
					// get options bar
					var bar = app.getOptionsBar();
					var cntButton = bar.getChildren()[2];
					
					this.__btnOpenMenu = new qx.ui.form.Button("Script").set({ width: 118 });
					this.__btnOpenMenu.addListener("click", this.__openMenu, this);
					
					cntButton.removeAt(0);
					cntButton.addAt(this.__btnOpenMenu, 1);
				},
				
				destruct: function()
				{
					
				},
							
				members: 
				{
					__popupMenu: null,
					__btnOpenMenu: null,
					
					addContainer: function(cnt)
					{
						this.__popupMenu.add(cnt);
					},
				
					__openMenu: function()
					{
						this.__popupMenu.placeToWidget(this.__btnOpenMenu, false);
						this.__popupMenu.show();
					}
				}
			});
		}
		
		qx.Class.define("EA_CNCTA_Translater.TranslationWindow", 
		{
			type: "singleton",
			extend: webfrontend.gui.CustomWindow,
			
			construct: function()
			{
				this.base(arguments);
				this.setLayout(new qx.ui.layout.VBox(2));
				
				this.set({
					width: 500,
					height: 500,
					caption: "TranslationWindow",
					padding: 2,
					allowMaximize: true,
					showMaximize: true,
					allowMinimize: false,
					showMinimize: false,
				});
				
				var cnt = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ padding: 5, decorator: "pane-light-opaque"});
				
				var cntDesc = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ padding: 5, decorator: "pane-light-opaque"});
				cntDesc.add(new qx.ui.basic.Label("1. Change to a server with the needed language"));
				cntDesc.add(new qx.ui.basic.Label("2. Click 'Get'-Button to extract needed data"));
				cntDesc.add(new qx.ui.basic.Label("3. Copy text from the text field into the clipboard"));
				cntDesc.add(new qx.ui.basic.Label("4. Change Server to your world"));
				cntDesc.add(new qx.ui.basic.Label("5. Paste text into the text field"));
				cntDesc.add(new qx.ui.basic.Label("6. Click the 'Save'-Button"));
				cntDesc.add(new qx.ui.basic.Label("7. Reload page"));
				this.add(cntDesc);
				
				var cntButtons = new qx.ui.container.Composite(new qx.ui.layout.HBox(5).set({ alignY: "middle"})).set({ padding: 5, decorator: "pane-light-opaque"});
				this.add(cntButtons);
				
				var btnGet = new qx.ui.form.Button("Get");
				btnGet.addListener("execute", this.__getTranslation, this);
				cntButtons.add(btnGet);
				
				var btnSave = new qx.ui.form.Button("Save");
				btnSave.addListener("execute", this.__saveTranslation, this);
				cntButtons.add(btnSave);
				
				var btnReset = new qx.ui.form.Button("Reset");
				btnReset.addListener("execute", this.__resetTranslation, this);
				cntButtons.add(btnReset);
				
				this.__lblLanguage = new qx.ui.basic.Label();
				cntButtons.add(this.__lblLanguage);
				
				this.__txtTranslation = new qx.ui.form.TextArea().set({ allowGrowY: true });

				cnt.add(this.__txtTranslation, { flex: 1});
				
				this.add(cnt, { flex: 1});
			},
			
			destruct: function()
			{
				
			},
						
			members: 
			{
				__lblLanguage: null,
				__txtTranslation: null,
				
				__resetTranslation: function()
				{
					localStorage.removeItem("EA_CNCTA_Translater");
					this.__txtTranslation.setValue("");
				},
				
				__saveTranslation: function()
				{
					localStorage["EA_CNCTA_Translater"] = this.__txtTranslation.getValue();
				},
				
				__getTranslation: function()
				{
					this.__lblLanguage.setValue(Language);
						
					var rawGAMEDATA = new Object();
					this.createCopy(GAMEDATA, rawGAMEDATA);
					
					var translation = new Object();
					//translation.map = qx.$$translations[Language];
					translation.GAMEDATA = rawGAMEDATA;
					
					this.__txtTranslation.setValue(qx.lang.Json.stringify(translation));			
				},
				
				createCopy: function(node, copy)
				{
					for (var key in node)    
					{
						//console.debug(key);
						if (typeof node[key] == "object")
						{
							//console.debug("Creating node: " + key)
							var subNode = new Object();
							this.createCopy(node[key], subNode);
							if (Object.keys(subNode).length > 0)
								copy[key] = subNode;
						}
						else if (typeof node[key] == "string")
						{
							if (node[key].indexOf(".png") == -1 &&
								node[key].indexOf(".jpg") == -1 &&
								node[key].indexOf(".gif") == -1 &&
								node[key].indexOf(".cur") == -1 && 
								node[key].indexOf(".ogg") == -1 &&
								node[key].indexOf(".mp3") == -1 && 
								node[key].indexOf(".wav") == -1)
							{
								//console.debug("Copy string: " + key + ":" + node[key]);
								copy[key] = node[key];
							}
						}
					}
				}
			}
		});
	}
	
	function copyOBJECT(source, target)
	{
		try
		{
			for (var key in target)
			{
				if (typeof target[key] == "object")
				{
					copyOBJECT(source[key], target[key]);
				}
				else if (typeof target[key] == "string")
				{
					source[key] = target[key];
				}
			}
		}
		catch (e)
		{
			console.debug(e);	
		}
	}
	
	function waitForGame() 
	{
		try 
		{
			if ('localStorage' in window && window['localStorage'] !== null && typeof localStorage['EA_CNCTA_Translater'] != 'undefined')
			{
				if (typeof qx != 'undefined' && typeof qx.locale != 'undefined' && typeof qx.locale.Manager != 'undefined') 
				{				
					if (qx.locale.Manager.getInstance().getLocale() != "en_US")
					{
						console.log("Setting game data");
						var translation = qx.lang.Json.parse(localStorage["EA_CNCTA_Translater"]);
						
						copyOBJECT(GAMEDATA, translation.GAMEDATA);
						ClientLib.Res.ResMain.GetInstance().SetGamedata(GAMEDATA);

						console.log("Setting ui translation");
						qx.locale.Manager.getInstance().setLocale("en_US");
					}						
				} 			
			}

			var call = true;
			if (typeof qx != 'undefined' && typeof qx.core != 'undefined' && typeof qx.core.Init != 'undefined') 
			{
				var app = qx.core.Init.getApplication();
				if (app.initDone == true) 
				{
					createClass();	
					
					EA_CNCTA_Translater.getInstance();
					
					call = false;
				}
			}

			if (call)
				window.setTimeout(waitForGame, 200);

		} 
		catch (e) 
		{
			if (typeof console != 'undefined') console.log(e);
			else if (window.opera) opera.postError(e);
			else GM_log(e);
		}
	};
	
	window.setTimeout(waitForGame, 200);	
}

	var script = document.createElement("script");
	var txt = injectFunction.toString();
		script.innerHTML = "(" + txt + ")();";
		script.type = "text/javascript";
	
	document.getElementsByTagName("head")[0].appendChild(script);
})();
