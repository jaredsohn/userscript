// ==UserScript==
// @name           C&C: Tiberium Alliances Collect All Button
// @namespace      CnC_Tiberium_Alliances_CollectAllButton
// @description    Creates a button to collect all packages from all bases (with autocollect)
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        1.2.0
// @author         conte.carli
// ==/UserScript==

(function(){
	var TACollectAll_mainFunction = function()
	{
		function createCollectAllTweak()
		{
			console.log("createCollectAllTweak loaded");
			
			var TACollectAll = {};
			qx.Class.define("TACollectAll.main",
			{
				type: "singleton",
				extend: qx.core.Object,
				members:
				{
					/* ######################## S E T T I N G S ####################### */
					/* ################## THESE VALUES CAN BE CHANGED ################# */
					
					// show the collect all button, or only use autocollect
					//    OPTIONS: true = show button, false = no button
					showButton: true,
					// should packages be collected automatically
					//    OPTIONS: true = autocollect activated, false = no automatic collection of packages
					autoCollect: true,
					// interval at which the packages should be collected (in minutes)
					autoCollectIntervalMin: 5,
					
					/* ############### NO MORE CHANGES AFTER THIS POINT ############### */
					
					buttonCollectAll: null,
					AllCities: null,
					AllCitiesData: null,
					buildings: null,
					CurrentBuilding: null,
					debug: 0,
					autoCollectActive: false,
          
					initialize: function()
					{
						qx.core.Init.getApplication()._onDesktopResize();
					
						if ( this.showButton )
							this.createCollectAllButton();
						
						if ( this.autoCollect )
							window.setTimeout(function(){window.TACollectAll.main.getInstance().collectAll();}, 7000);
					},
					
					createCollectAllButton: function()
					{
						try
						{
							// Collect all button
							this.buttonCollectAll = new qx.ui.form.Button("Collect All Packages");
							this.buttonCollectAll.set({
								width: 75, height: 32, 
								appearance: "button-text-small", 
								toolTipText: "Click to collect all packages in all bases."
							});
							this.buttonCollectAll.addListener("click", this.collectAll, this);

							var packageCountdownPanel = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_APPOINTMENTS);
							packageCountdownPanel.add(this.buttonCollectAll, {top: 50, right: 0});
						}
						catch ( err ) { if ( this.debug ) console.log(err); }
					},
		  
					collectAll: function()
					{
						try
						{
							this.AllCities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities();
							this.AllCitiesData = this.AllCities.d;
							
							for (var CurrentCity in this.AllCitiesData)
								this.AllCitiesData[CurrentCity].CollectAllResources();
							
							// Set next autocollect
							if ( this.autoCollect && !this.autoCollectActive )
							{
								this.autoCollectActive = true;
								
								window.setTimeout(function(){
										window.TACollectAll.main.getInstance().autoCollectActive = false;
										window.TACollectAll.main.getInstance().collectAll();
									}, this.autoCollectIntervalMin*60*1000);
							}
						}
						catch ( err ) { if ( this.debug ) console.log(err); }
					},
				}
			});
		}
    
		function TACollectAll_checkIfLoaded()
		{
			try {
				if (typeof qx != 'undefined') {
					a = qx.core.Init.getApplication(); // application
					mb = qx.core.Init.getApplication().getMenuBar();
					if (a && mb) {
						createCollectAllTweak();
						window.TACollectAll.main.getInstance().initialize();
					} else
						window.setTimeout(TACollectAll_checkIfLoaded, 1000);
					} else {
						window.setTimeout(TACollectAll_checkIfLoaded, 1000);
					}
			} catch (e) {
				if (typeof console != 'undefined') console.log(e);
				else if (window.opera) opera.postError(e);
				else GM_log(e);
			}
		}

    
		if (/commandandconquer\.com/i.test(document.domain)) {
			window.setTimeout(TACollectAll_checkIfLoaded, 1000);
		}
	}

	var TACollectAllScript = document.createElement("script");
	var txt = TACollectAll_mainFunction.toString();
	TACollectAllScript.innerHTML = "(" + txt + ")();";
	TACollectAllScript.type = "text/javascript";
	if (/commandandconquer\.com/i.test(document.domain)) {
		document.getElementsByTagName("head")[0].appendChild(TACollectAllScript);
	}
})();