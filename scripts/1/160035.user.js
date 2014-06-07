// ==UserScript==
// @name           C&C: T.A.C.U.B.I
// @author         Renegade (Origin from TheStriker)
// @description    Alt+Y - Insert to message/chat/post all your bases/cities info
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        1.4
// ==/UserScript==

function startTACUBI() {
	var TAI_main = function () {
		function createInstance() {
			var PVE_Rank, PVP_Rank;
			var playername = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_PlayerName();
		
			function PlayerInfo(context, data) {
				PVP_Rank = (data.bd-data.bde).toString();
				PVE_Rank = data.bde.toString();
			};					
			ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("GetPublicPlayerInfoByName", {name: playername}, 
			phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, PlayerInfo), null);
				
			qx.Class.define("TAI", { //TAS.main
				type : "singleton",
				extend : qx.core.Object,
				members : {
					initialize : function () {
						addEventListener("keyup", this.onKey, false);
						console.log("TA Info loaded.");
					},
					onKey : function (ev) {
						var s = String.fromCharCode(ev.keyCode);
						var inputField = document.querySelector('input:focus, textarea:focus');
						if (inputField != null) {
							// ALT+
							if (ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.shiftKey && s == "Y") {
								// player bases info to share with others

								var basenumber = 0;
								var highestoff = 0;
								var sechighestoff = 0;
								var highestpower = 0;
								var lowestdef = 999;
								var lowestsup = 999;
				
								var apc = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;//all player cities
								var txt = "", c, unitData, bh, supp, type, df,dif;
								txt += "[hr]";
								for (var key in apc) {
									basenumber++;
									c = apc[key];
									txt += " [coords]" + c.get_PosX() + ":" + c.get_PosY() + ":" + c.get_Name() + "[/coords]: ";
									//txt += "[b]" + c.get_Name() + "[/b]: ";
									//txt += " Basis: [b]" + ('0' + c.get_LvlBase().toFixed(2)).slice(-5) + "[/b] ";
									txt += " Off: [b]" + ('0' + c.get_LvlOffense().toFixed(2)).slice(-5) + "[/b] ";
									txt += " Deff: [b]" + ('0' + c.get_LvlDefense().toFixed(2)).slice(-5) + "[/b] "; 
									//txt += "[u]| [i]Differenz: [b]" + (dif = ('0' + c.get_LvlDefense().toFixed(2).slice(-5) - c.get_LvlBase().toFixed(2).slice(-5)).toFixed(2)) + "[/b][/i] |[/u] "; 
					
									unitData = c.get_CityBuildingsData();
									bh = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Construction_Yard);
									df = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Defense_Facility);
									supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Ion);
									if (supp === null)
										supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Art);
									if (supp === null)
										supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Air);
									//if (bh !== null) {
									//    txt += " BH: [b]" + bh.get_CurrentLevel() + "[/b] ";
									//}
									if (df !== null) {
										txt += " VE: [b]" + df.get_CurrentLevel() + "[/b] ";
									}
									if (supp !== null) {
										txt += supp.get_TechGameData_Obj().dn + ": [b]" + supp.get_CurrentLevel() + "[/b] ";
									}
									txt += " Energie: [b]" + ((c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power))/1000).toFixed(0) + " k/Std.[/b] ";
									txt += "[hr]";	 
									
									if (parseInt((highestoff*100).toFixed(0)) < parseInt((c.get_LvlOffense()*100).toFixed(0))) {
										highestoff = c.get_LvlOffense().toFixed(2);
									}				  
									if (supp !== null) {
										if (lowestsup > supp.get_CurrentLevel()) {
											lowestsup = supp.get_CurrentLevel();
										};
									} else {
										lowestsup = 0;
									};									
								};
				
								for (var key in apc) {
									c = apc[key];				
									if (parseInt((sechighestoff*100).toFixed(0)) < parseInt((c.get_LvlOffense()*100).toFixed(0)) && parseInt((c.get_LvlOffense()*100).toFixed(0)) < parseInt((highestoff*100).toFixed(0))) {
										sechighestoff = c.get_LvlOffense().toFixed(2);
									}										
		 		  					
									if (parseInt(highestpower) < parseInt(((c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power))/1000).toFixed(0))) {
										highestpower = ((c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power))/1000).toFixed(0);
									}				  
				  
									if (parseInt((lowestdef*100).toFixed(0)) > parseInt((c.get_LvlDefense()*100).toFixed(0))) {
										lowestdef = c.get_LvlDefense().toFixed(2);
									};
								};
		
								txt += "[hr]";
								txt += " Basen: [b]" + basenumber + "[/b] off: [b]" + highestoff + "[/b] sec.off: [b]" + sechighestoff + "[/b] Strom Main: [b]"
								+ highestpower + "[/b] Kleinste Deff: [b]" + lowestdef + "[/b] Kleinste U-Waffe: [b]" + lowestsup + "[/b] PVE: [b]" + PVE_Rank + "[/b] PVP: [b]" + PVP_Rank + "[/b] ";
				
								inputField.value += txt;
							}; 
						}
					}		
				} // members
			});
		}

		// Loading
		function TAI_checkIfLoaded() {
			try {
				if (typeof qx != 'undefined') {
					if (qx.core.Init.getApplication().getMenuBar() !== null) {
						createInstance();
						TAI.getInstance().initialize();
					} else setTimeout(TAI_checkIfLoaded, 1000);
				} else {
				setTimeout(TAI_checkIfLoaded, 1000);
				}
			} catch (e) {
				if (typeof console != 'undefined') {
					console.log(e);
				} else if (window.opera) {
					opera.postError(e);
				} else {
					GM_log(e);
				}
			}
		}

		if (/commandandconquer\.com/i.test(document.domain)) {
			setTimeout(TAI_checkIfLoaded, 1000);
		}
	};
	// injecting, because there seem to be problems when creating game interface with unsafeWindow
	var TAIScript = document.createElement("script");
	var txt = TAI_main.toString();
	TAIScript.innerHTML = "(" + txt + ")();";
	TAIScript.type = "text/javascript";
	if (/commandandconquer\.com/i.test(document.domain)) {
		document.getElementsByTagName("head")[0].appendChild(TAIScript);
	}
}
/*Main*/
function startup(){
    setTimeout(startTACUBI, 10000);
};

startup();
