// ==UserScript==
// @id             	NTK Scriptsammlung chrome
// @name           	NTK Scriptsammlung chrome
// @namespace      	NTK Scriptsammlung chrome
// @author         	OMI
// @description    	Scriptesammlung 
// @downloadURL    	http://userscripts.org/scripts/show/172347.user.js
// @updateURL      	http://userscripts.org/scripts/show/172347.meta.js
// @include        	*tiberiumalliances.com*
// @include        	http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include        	http*://*.cncopt.com/*
// @include        	http*://cncopt.com/* 
// @version        	2013.07.18
// @icon           	http://img10.myimg.de/logo6962b.png
// @grant           	GM_getValue
// @grant           	GM_log
// @grant           	GM_openInTab
// @grant           	GM_registerMenuCommand
// @grant           	GM_setValue
// @grant           	GM_xmlhttpRequest
// @grant           	unsafeWindow
// ==/UserScript==


// =======================================================================================
// ==                                                                                  	==
// 00063 =========== C&C TA PvP/PvE Ranking within the same alliance. (http://userscripts.org/scripts/source/167987.user.js)  ========== 
// 00289 =========== Coords Button all (http://userscripts.org/scripts/source/167957.user.js)  ========== 
// 00381 =========== Lager und VP MOD  ========== 
// 00521 =========== BasisINFO MOD  ========== 
// 00637 =========== Extra MenÃ¼ MOD  ========== 
// 00795 =========== Tiberium Alliances PvP/PvE Player Info Mod (http://userscripts.org/scripts/source/159150.user.js)  ========== 
// 00999 =========== Ressourcen MOD  ========== 
// 01139 =========== NACHRICHTEN MOD  ========== 
// 01210 =========== CHAT MOD  ========== 
// 01660 =========== Kampfsimulator MOD  ========== 
// 04345 =========== Zoom MOD  ========== 
// 04425 =========== CCTAWrapper  ========== 
// 04550 =========== BaseScanner  ========== 
// 04555 =========== MaelstromTools  ========== 
// 08022 =========== CnCopt  ========== 
// 08709 =========== Basenschieber  ========== 
// 08925 =========== ALLIANZ VERWATUNGSTOOL  ========== 
// 09390 =========== The Green Cross - TA Tools  ========== 
// 13300 =========== Rep-Zeit ==========
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// ================================================================================================================================================================



// ========== C&C TA PvP/PvE Ranking within the same alliance. (http://userscripts.org/scripts/source/167987.user.js) ==========

(function () {
    var PvpRankMod_main = function () {
        var allianceId = null;
        var allianceName = null;
        var button = null;
        var general = null;
        var memberCount = null;
        var playerInfoWindow = null;
        var playerName = null;
        var pvpHighScoreLabel = null;
        var rowData = null;
        var tabView = null;
        var dataTable = null;

        function CreateMod() {
            try {
                console.log('PvP/PvE Ranking Mod.');
                var tr = qx.locale.Manager.tr;
                playerInfoWindow = webfrontend.gui.info.PlayerInfoWindow.getInstance();
                general = playerInfoWindow.getChildren()[0].getChildren()[0].getChildren()[0].getChildren()[0].getChildren()[0].getChildren()[1].getChildren()[0];
                tabView = playerInfoWindow.getChildren()[0];
                playerName = general.getChildren()[1];

                // Add button to score tab-page to redirect to score history graph of the player.
                // ( For my own alliance only ; since only our member scores are logged external.
                allianceName = ClientLib.Data.MainData.GetInstance().get_Alliance().get_Name();
                if (allianceName == 'Oldskool') {
                    button = new qx.ui.form.Button("Score graph");
                    button.addListener("execute", function () {

                        var link = "http://pixaqu.nl/test/tibscoreos.php?user=";
                        link += playerName.getValue();
                        window.open(link, "_blank");
                    });
                    general.add(button, {
                        row: 3,
                        column: 1
                    });
                }

                // New PvP Ranking Tab-page
                var pvpRankingTab = new qx.ui.tabview.Page("Ranking");
                pvpRankingTab.setLayout(new qx.ui.layout.Canvas());
                pvpRankingTab.setPaddingTop(6);
                pvpRankingTab.setPaddingLeft(8);
                pvpRankingTab.setPaddingRight(10);
                pvpRankingTab.setPaddingBottom(8);

                // Label PvP Ranking
                pvpHighScoreLabel = new qx.ui.basic.Label("PvP and PvE for alliance: ").set({
                    textColor: "text-value",
                    font: "font_size_13_bold"
                });
                pvpRankingTab.add(pvpHighScoreLabel);

                // Table to show the PvP Scores of each player
                dataTable = new webfrontend.data.SimpleColFormattingDataModel().set({
                    caseSensitiveSorting: false
                });
                dataTable.setColumns(["Name", "PvP", "PvE" ], ["name", "pve", "pvp" ]);
                var pvpTable = new webfrontend.gui.widgets.CustomTable(dataTable);
                var columnModel = pvpTable.getTableColumnModel();
                columnModel.setColumnWidth(0, 200);
                columnModel.setColumnWidth(1, 80);
                columnModel.setColumnWidth(2, 80);
                pvpTable.setStatusBarVisible(false);
                pvpTable.setColumnVisibilityButtonVisible(false);
                pvpRankingTab.add(pvpTable, {
                    left: 0,
                    top: 25,
                    right: 0,
                    bottom: 0
                });

                // Add Tab page to the PlayerInfoWindow
                tabView.add(pvpRankingTab);

                // Hook up callback when another user has been selected
                playerInfoWindow.addListener("close", onPlayerInfoWindowClose, this);
                playerName.addListener("changeValue", onPlayerChanged, this);

            } catch (e) {
                console.log("CreateMod: ", e);
            }
        }


        // Callback GetPublicPlayerInfoByName
        // [bde] => Forgotten Bases Destroyed
        // [d] => Player Bases Destroyed
        // [n] => Player Name
        function onPlayerInfoReceived(context, data) {
            try {
                var memberName = data.n
                var pvp = data.d;
                var pve = data.bde;
               
                // Add player with its PvP/PvE score.
                rowData.push([memberName, pvp, pve]);

                if (rowData.length == memberCount) {
                    // Show Alliance name in label.
                    pvpHighScoreLabel.setValue("PvP and PvE for alliance: " + data.an);

                    dataTable.setData(rowData);
                    dataTable.sortByColumn(1, false);
                }

            } catch (e) {
                console.log("onPlayerInfoReceived: ", e);
            }
        }


        // GetPublicAllianceInfo Callback
        // [m] => Member Array
        // (
        //    [0] => Array
        //            [n] => Name
        // )
        // [mc]  => Member Count
        function onAllianceInfoReceived(context, data) {
            try {
                // Crear 
                rowData = [];
                dataTable.setData(rowData);

                var members = data.m;
                memberCount = data.mc;

                for (var i in members) {
                    var member = members[i];

                    // For Each member (player); Get the PvP/PvE Score
                    if (member.n.length > 0) {
                        ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("GetPublicPlayerInfoByName", {
                            name: member.n
                        }, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, onPlayerInfoReceived), null);
                    }
                }
            } catch (e) {
                console.log("onAllianceInfoReceived: ", e);
            }
        }

        // Callback GetPublicPlayerInfoByName
        // [a] => Alliance ID
        // [an] => Alliance Name
        function onPlayerAllianceIdReceived(context, data) {
            try {
                // No need to recreate the RankingPage when player is member of same alliance
                if (data.a != allianceId) {
                    allianceId = data.a;

                    // Show Alliance name in label.
                    pvpHighScoreLabel.setValue("PvP and PvE for alliance: " + data.an + "     (loading plz wait)");

                    // Get Alliance MembersList
                    ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("GetPublicAllianceInfo", {
                        id: allianceId
                    }, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, onAllianceInfoReceived), null);
                }
            } catch (e) {
                console.log("onPlayerInfoReceived: ", e);
            }
        }


        function onPlayerChanged() {
            try {
                // Get Players AllianceId 
                if (playerName.getValue().length > 0) {
                    ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("GetPublicPlayerInfoByName", {
                        name: playerName.getValue()
                    }, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, onPlayerAllianceIdReceived), null);
                }
            } catch (e) {
                console.log("onPlayerChanged: ", e);
            }
        }



        function onPlayerInfoWindowClose() {
            try {
                //dataTable.setData([]);
            } catch (e) {
                console.log("onPlayerInfoWindowClose: ", e);
            }
        }

        function PvpRankMod_checkIfLoaded() {
            try {
                if (typeof qx !== 'undefined' && typeof qx.locale !== 'undefined' && typeof qx.locale.Manager !== 'undefined') {
                    if (ClientLib.Data.MainData.GetInstance().get_Alliance().get_FirstLeaders() !== null && ClientLib.Data.MainData.GetInstance().get_Alliance().get_FirstLeaders().l.length != 0) {
                        CreateMod();
                    } else {
                        window.setTimeout(PvpRankMod_checkIfLoaded, 1000);
                    }
                } else {
                    window.setTimeout(PvpRankMod_checkIfLoaded, 1000);
                }
            } catch (e) {
                console.log("PvpRankMod_checkIfLoaded: ", e);
            }
        }

        if (/commandandconquer\.com/i.test(document.domain)) {
            window.setTimeout(PvpRankMod_checkIfLoaded, 1000);
        }
    }

    try {
        var PvpRankMod = document.createElement("script");
        PvpRankMod.innerHTML = "(" + PvpRankMod_main.toString() + ")();";
        PvpRankMod.type = "text/javascript";
        if (/commandandconquer\.com/i.test(document.domain)) {
            document.getElementsByTagName("head")[0].appendChild(PvpRankMod);
        }
    } catch (e) {
        console.log("PvpRankMod: init error: ", e);
    }
})();

// =========================================================================  Coords Button all  (http://userscripts.org/scripts/source/167957.user.js) ==================================================================

(function () {
  var CNCTACoordsButtonAll_main = function () {
    try {
      function createCoordsButton() {
        console.log('C&C:Tiberium Alliances Coords Button All loaded.');
 
        /*
        $a = qx.core.Init.getApplication(); // Application
        $c = $a.getChat(); // ChatWindow
        $w = $c.getChatWidget(); // ChatWidget
        $i = $cw.getEditable(); // Input
        $d = $i.getContentElement().getDomElement(); // Input DOM Element
        */
 
        var coordsButton = {
          selectedBase: null,
          pasteCoords: function(){
            var $i = qx.core.Init.getApplication().getChat().getChatWidget().getEditable(); // Input
            var $d = $i.getContentElement().getDomElement(); // Input DOM Element
 
            var result = new Array();
            result.push($d.value.substring(0,$d.selectionStart)); // start
 
            result.push('[coords]' + coordsButton.selectedBase.get_RawX() + ':' + coordsButton.selectedBase.get_RawY() + '[/coords]');
 
            result.push($d.value.substring($d.selectionEnd, $d.value.length)); // end
 
            $i.setValue(result.join(' '));
          }
        };
 
        if (!webfrontend.gui.region.RegionCityMenu.prototype.__coordsButton_showMenu) {
          webfrontend.gui.region.RegionCityMenu.prototype.__coordsButton_showMenu = webfrontend.gui.region.RegionCityMenu.prototype.showMenu;
       
          webfrontend.gui.region.RegionCityMenu.prototype.showMenu = function (selectedVisObject) {
            coordsButton.selectedBase = selectedVisObject;
            if (this.__coordsButton_initialized != 1) {
              this.__coordsButton_initialized = 1;
              this.__newComposite = new qx.ui.container.Composite(new qx.ui.layout.VBox(0)).set({
                padding: 2
              });
              for(i in this) {
                if(this[i] && this[i].basename == "Composite") {
                  var button = new qx.ui.form.Button("Paste Coords");
                  button.addListener("execute", function () {
                    coordsButton.pasteCoords();
                  });            
                  this[i].add(button);
                }
              }
            }
            this.__coordsButton_showMenu(selectedVisObject);
            switch (selectedVisObject.get_VisObjectType()) {
              case ClientLib.Vis.VisObject.EObjectType.RegionPointOfInterest:
              case ClientLib.Vis.VisObject.EObjectType.RegionRuin:
              case ClientLib.Vis.VisObject.EObjectType.RegionHubControl:
              case ClientLib.Vis.VisObject.EObjectType.RegionHubServer:
                this.add(this.__newComposite);
                break;
            }
          }
        }
      }    
    } catch (e) {
      console.log("createCoordsButton: ", e);
    }
 
    function CNCTACoordsButtonAll_checkIfLoaded() {
      try {
        if (typeof qx !== 'undefined') {
          createCoordsButton();
        } else {
          window.setTimeout(CNCTACoordsButtonAll_checkIfLoaded, 1000);
        }
      } catch (e) {
        console.log("CNCTACoordsButtonAll_checkIfLoaded: ", e);
      }
    }
  window.setTimeout(CNCTACoordsButtonAll_checkIfLoaded, 1000);
  };
  try {
    var CNCTACoordsButtonAll = document.createElement("script");
    CNCTACoordsButtonAll.innerHTML = "(" + CNCTACoordsButtonAll_main.toString() + ")();";
    CNCTACoordsButtonAll.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(CNCTACoordsButtonAll);
  } catch (e) {
    console.log("CNCTACoordsButtonAll: init error: ", e);
  }
})();

// =========================================================================  Lager und VP MOD   ==================================================================

function initHideCampsButton(){
    
    //----------- Offensivestufe ------
    
    
    var minimumlevel = 0;
    
    
    //---------------------------------
    
    
    
    var HCshow = new qx.ui.form.Button("Alles Sichtbar");
    var HCBtn = new qx.ui.form.Button("Lager und VP");
    
    
    HCshow.set({ width: 95,
               height: 15,
               appearance: "button-text-small",
               toolTipText: "Zeigt alles an"
              });
    HCBtn.set({ width: 95,
               height: 15,
               appearance: "button-text-small",
               toolTipText: "Zeigt Lager und VP´s ab Off-lvl + 2 an"
              });
    
    HCshow.addListener("click",function(){
        var currCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
        var x = currCity.get_X();
        var y = currCity.get_Y();
        var region = ClientLib.Vis.VisMain.GetInstance().get_Region();
        var attackDistance = ClientLib.Data.MainData.GetInstance().get_Server().get_MaxAttackDistance();

        if (minimumlevel == 0)
        {
            minimumlevel =  Math.floor(currCity.get_LvlOffense()); 
        }
        
        for (var i = x - (attackDistance); i < (x+attackDistance); i++)
        {
            for (var j = y - attackDistance; j < (y+attackDistance); j++)
            {
                var visObject = region.GetObjectFromPosition(i * region.get_GridWidth(),j * region.get_GridHeight());
                if(visObject != null)
                {
                    
                    if (visObject.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp)
			{	
				var objectLevel = Math.round(visObject.get_BaseLevelFloat());
				var rawOffenseLevel = currCity.get_LvlOffense();
				var offenseLevel = Math.round(rawOffenseLevel);
                        
				// ################################################################################
				// ##### Off-Level + X = Show object ##############################################
				// ################################################################################
				var targetLevel = offenseLevel + 2;
				// ################################################################################
				if (offenseLevel > 46) 
					{
					targetLevel = 47;
					}
                        
				// console.log("NTK Objekt Level = " + objectLevel);
				// console.log("NTK Raw Offense Level = " + currCity.get_LvlOffense());
				// console.log("NTK Offense Level = " + offenseLevel);
				// console.log("NTK Target Level = " + targetLevel);
                        
				if ( objectLevel < targetLevel)
				{
				visObject.ShowInfos();
				}
			}
                    else if(visObject.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.RegionCityType || 
                            visObject.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.RegionPointOfInterest)
                    {
                        visObject.ShowInfos();
                    }
                }
            }      
        }
    },this);
    
    HCBtn.addListener("click",function(){
        var currCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
        var x = currCity.get_X();
        var y = currCity.get_Y();
        var region = ClientLib.Vis.VisMain.GetInstance().get_Region();
        var attackDistance = ClientLib.Data.MainData.GetInstance().get_Server().get_MaxAttackDistance();

        if (minimumlevel == 0)
        {
            minimumlevel =  Math.floor(currCity.get_LvlOffense()); 
        }
        
        for (var i = x - (attackDistance); i < (x+attackDistance); i++)
        {
            for (var j = y - attackDistance; j < (y+attackDistance); j++)
            {
                var visObject = region.GetObjectFromPosition(i * region.get_GridWidth(),j * region.get_GridHeight());
                if(visObject != null)
                {
                    
                    if (visObject.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp)
                    {
                        var objectLevel = Math.round(visObject.get_BaseLevelFloat());
                        var rawOffenseLevel = currCity.get_LvlOffense();
                        var offenseLevel = Math.round(rawOffenseLevel);
                        
                        // ################################################################################
                        // ##### Off-Level + X = Show object ##############################################
                        // ################################################################################
                        var targetLevel = offenseLevel + 2;
                        // ################################################################################
                        if (offenseLevel > 46) {
                            targetLevel = 47;
                        }
                        
                        // console.log("NTK Objekt Level = " + objectLevel);
                        // console.log("NTK Raw Offense Level = " + currCity.get_LvlOffense());
                        // console.log("NTK Offense Level = " + offenseLevel);
                        // console.log("NTK Target Level = " + targetLevel);
                        
                        if ( objectLevel < targetLevel)
                        {
                            visObject.HideInfos();
                        }
                    }
                    else if(visObject.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.RegionCityType || 
                            visObject.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.RegionPointOfInterest)
                    {
                        visObject.HideInfos();
                    }
                }
            }      
        }
    },this);
    
    var app = qx.core.Init.getApplication();
    app.getDesktop().add(HCshow, {
        right: 120,
        bottom:20,
    });
    app.getDesktop().add(HCBtn, {
        right: 120,
        bottom:0,
    });
    
}
/*Main*/
function waitForClientLib(){
    
    qx = unsafeWindow["qx"];
    ClientLib = unsafeWindow["ClientLib"];
    webfrontend = unsafeWindow["webfrontend"];
	
    if ((typeof ClientLib == 'undefined') || (typeof qx == 'undefined') || (qx.core.Init.getApplication().initDone == false))
    {
        setTimeout(waitForClientLib, 1000);
        return;
    }
    else{    
        initHideCampsButton();
    }
    
}
function startup(){
    
	setTimeout(waitForClientLib, 1000);
    
}
startup();

// =========================================================================    BasisINFO MOD      ============================================================

(function () {
  var TAI_main = function () {
    function createInstance() {
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

                var apc = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;//all player cities
                var txt = "", c, unitData, bh, supp, type, df,dif;
                for (var key in apc) {
                  c = apc[key];
                    txt += "[coords]" + c.get_PosX() + ":" + c.get_PosY() + ":" + c.get_Name() + "[/coords]: ";
                  txt += "B: [b]" + ('0' + c.get_LvlBase().toFixed(2)).slice(-5) + "[/b] ";
                  txt += "D: [b]" + ('0' + c.get_LvlDefense().toFixed(2)).slice(-5) + "[/b] "; 
                  txt += " O: [b]" + ('0' + c.get_LvlOffense().toFixed(2)).slice(-5) + "[/b] ";
                  unitData = c.get_CityBuildingsData();
                  bh = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Construction_Yard);
                  df = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Defense_Facility);
                  supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Ion);
                  if (supp === null)
                    supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Art);
                  if (supp === null)
                    supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Air);
                  if (bh !== null) {
                      txt += "Bh: [b]" + bh.get_CurrentLevel() + "[/b] ";
                  }
                  if (df !== null) {
                      txt += "Ve: [b]" + df.get_CurrentLevel() + "[/b] ";
                  }
                  if (supp !== null) {
                    txt += supp.get_TechGameData_Obj().dn.slice(0, 3) + ": [b]" + supp.get_CurrentLevel() + "[/b] ";
                  }
                  txt += "[i][b]Dif: " + (dif = ('0' + c.get_LvlDefense().toFixed(2).slice(-5) - c.get_LvlBase().toFixed(2).slice(-5)).toFixed(2)) + "[/b][/i]";  
                  txt += "[hr]";
                }
                inputField.value += txt;
              } else if (ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.shiftKey && s == "N") {
                var bases = ClientLib.Data.MainData.GetInstance().get_AllianceSupportState().get_Bases().d;
                var base, keys = Object.keys(bases), len = keys.length, info = {}, avg = 0, high = 0, supBaseCount = len;
                while (len--) {
                  base = bases[keys[len]];
                  if (!info.hasOwnProperty(base.get_Type())) {
                    info[base.get_Type()] = 0;
                  }
                  info[base.get_Type()]++;
                  if (base.get_Level() >= 30)
                    high++;
                  avg += base.get_Level();
                }
                avg /= supBaseCount;
                var members = ClientLib.Data.MainData.GetInstance().get_Alliance().get_MemberData().d, member, baseCount = 0;
                keys = Object.keys(members);
                len = keys.length;
                while (len--) {
                  member = members[keys[len]];
                  baseCount += member.Bases;
                }
                inputField.value += "Bases: " + baseCount + " SupCount: " + supBaseCount + "(" + (supBaseCount / baseCount * 100).toFixed(0) + "%) Avg: " + avg.toFixed(2) + " 30+: " + high + "(" + (high / baseCount * 100).toFixed(0) + "%)";
                //for (var i in info)
                //  console.log("Type: " + i + " Count: " + info[i]);
              }
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
})();
// =========================================================================  Extra MenÃ¼ MOD     =================================================================
(function () {
	var AMMinnerHTML = function () {
		function AMM() {
			qx.Class.define("Addons.AddonMainMenu",{
				type : "singleton",
				extend : qx.core.Object,
				construct: function () { 				
					this.mainMenuContent = new qx.ui.menu.Menu();
					this.mainMenuButton = new qx.ui.form.MenuButton("EXTRAS", null , this.mainMenuContent);
					this.mainMenuButton.set({
						width : 82,
						appearance : "button-bar-right",
						toolTipText : "Da werden Sie geholfen^^"
					});
					var mainBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_MENU);
                    var childs = mainBar.getChildren()[1].getChildren();
                    
                    for( var z = childs.length - 1; z>=0;z--){	                       
						if( typeof childs[z].setAppearance === "function"){							
							if( childs[z].getAppearance() == "button-bar-right"){
								childs[z].setAppearance("button-bar-center");
							}
						}
                    }
					
					mainBar.getChildren()[1].add(this.mainMenuButton);					
					mainBar.getChildren()[0].setScale(true); //kosmetik
					mainBar.getChildren()[0].setWidth(764 + 80 );	//kosmetik				
					//console.log("Button added");
                    Addons_AddonMainMenu = "loaded";
				},
				members :
				{
					mainMenuContent : null,
					mainMenuButton : null,
					AddMainMenu: function (name,command,key) {
						if(name == null){
							console.log("Addons.AddonMainMenu.AddSubMenu: name empty");
							return;
						}
						if(command == null){
							console.log("Addons.AddonMainMenu.AddMainMenu: command empty");
							return;
						}
						if(key != null){
							var newCommand = new qx.ui.core.Command(key);
							newCommand.addListener("execute", command);
							var button = new qx.ui.menu.Button(name, null, newCommand);
						} else {
							var button = new qx.ui.menu.Button(name);
							button.addListener("execute", command);
						}
						
						this.mainMenuContent.add(button);
						
					},
					AddSubMainMenu: function (name) {	
						if(name == null){
							console.log("Addons.AddonMainMenu.AddSubMainMenu: name empty");
							return;
						}					
						var subMenu = new qx.ui.menu.Menu;
						var button = new qx.ui.menu.Button(name, null, null, subMenu);
						this.mainMenuContent.add(button);
						return subMenu;
					},
					AddSubMenu: function (subMenu,name,command,key) {		
						if(name == null){
							console.log("Addons.AddonMainMenu.AddSubMenu: name empty");
							return;
						}
						if(command == null){
							console.log("Addons.AddonMainMenu.AddSubMenu: command empty");
							return;
						}						
						if(subMenu == null){
							console.log("Addons.AddonMainMenu.AddSubMenu: subMenu empty");
							return;
						}
						
						if(key != null){
							var newCommand = new qx.ui.core.Command(key);
							newCommand.addListener("execute", command);
							var button = new qx.ui.menu.Button(name, null, newCommand);
						} else {
							var button = new qx.ui.menu.Button(name);
							button.addListener("execute", command);
						}						
						subMenu.add(button);
						
						
						
						
						var subMenu = new qx.ui.menu.Menu;
						var actionsButton = new qx.ui.menu.Button(name, null, null, subMenu);
						return subMenu;
					}
				}
			});
            Addons.AddonMainMenu.getInstance();
            
			//--HAUPTMENÃœ----
			var addonmenu  = Addons.AddonMainMenu.getInstance();		
			addonmenu.AddMainMenu("UPDATE",function(){window.open("http://userscripts.org/scripts/source/172347.user.js", "_blank");;},"ALT+U");
            //--UNTERMENÃœ I--
			var NTKlogo = "http://img10.myimg.de/logo6962b.png";
			var submenu = addonmenu.AddSubMainMenu("ENDGAME");
			addonmenu.AddSubMenu(submenu,"Livestream (in progress)",function(){window.open(NTKlogo, "_blank")},"ALT+L");
			addonmenu.AddSubMenu(submenu,"Overview ( Google-Drive )",function(){window.open("https://docs.google.com/document/d/1M7jSzEsL3Au1eD2_dTSF7xCDwZ-j9Muq7QJPTxpzsJc/edit?pli=1", "_blank")},"ALT+O");
			addonmenu.AddSubMenu(submenu,"Festungsbild (in progress)",function(){window.open(NTKlogo, "_blank")});

			//--UNTERMENÃœ II--
			var NTKworldMap = "http://map.tiberium-alliances.com/map/85#570:556|1|21559101|0:#050505,111:#00fcc1,113:#ffffff,115:#050505,119:#d5ff00,122:#050505,128:#0dff05,139:#0009ff,140:#25594b,141:#065203,143:#ff0ad6,146:#050505,148:#f75c1e,220:#050505,419:#050505,428:#050505,466:#050505,515:#050505,535:#050505,538:#050505,796:#050505,874:#050505,880:#00ddff,949:#050505,994:#4e633d,1061:#050505,1113:#050505,1175:#050505,1658:#050505,1919:#050505,2014:#050505,2034:#69069e,2166:#050505,2201:#050505,2246:#050505,2266:#050505,2350:#050505,2355:#050505,2418:#050505,2506:#050505,2565:#050505,2692:#050505,2800:#050505,2884:#050505,2946:#050505,3223:#050505,3224:#050505,3308:#050505,3349:#050505,3362:#050505,3444:#8cff00,3463:#050505,3671:#050505,3697:#050505,3821:#050505,4078:#050505,4102:#050505,4105:#050505,4172:#050505,4173:#00ffae,4403:#00f531,4421:#050505,4489:#050505,4502:#050505,4592:#050505,4621:#050505,4649:#050505,4680:#050505,4752:#050505,4799:#050505,4801:#050505,4876:#050505,4922:#050505,4979:#050505~";
			var submenu = addonmenu.AddSubMainMenu("HILFE");
			addonmenu.AddSubMenu(submenu,"Poiliste-NTK_V2",function(){window.open("https://docs.google.com/spreadsheet/ccc?key=0AvPZ9diQJB7ydGxoVHpNVENSbFBPY2Q2THA2YmZjSVE#gid=2", "_blank")},"ALT+P");
			addonmenu.AddSubMenu(submenu,"World-Map",function(){window.open(NTKworldMap, "_blank")},"ALT+W");
			addonmenu.AddSubMenu(submenu,"UNITED-FORUM",function(){window.open("http://www.united-forum.de/tiberium-alliances-f1030/", "_blank")});
			addonmenu.AddSubMenu(submenu,"CNC INSIDE",function(){window.open("http://www.cnc-inside.de/tiberium-alliances", "_blank")});
			//--UNTERMENÃœ III-
			var addonmenu  = Addons.AddonMainMenu.getInstance();		
			addonmenu.AddMainMenu("Server switch",function(){window.open("https://www.tiberiumalliances.com/de/game/world", "_blank");;},"ALT+S");
            
			function debugfunction(k){
            	console.log("working key:" + k);
			}
		}
				
		
		function AMM_checkIfLoaded() {
			try {
				if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible()) {
					AMM();
				} else {
					window.setTimeout(AMM_checkIfLoaded, 1000);
				}
			} catch (e) {
				console.log("AMM_checkIfLoaded: ", e);
			}
		}
		if (/commandandconquer\.com/i.test(document.domain)) {
			window.setTimeout(AMM_checkIfLoaded, 1000);
            Addons_AddonMainMenu = "install";
		}
	}
	try {
		var AMMS = document.createElement("script");
		AMMS.innerHTML = "(" + AMMinnerHTML.toString() + ")();";
		AMMS.type = "text/javascript";
		if (/commandandconquer\.com/i.test(document.domain)) {
			document.getElementsByTagName("head")[0].appendChild(AMMS);
		}
	} catch (e) {
		console.log("AMMinnerHTML init error: ", e);
	}
})();


// =========================================================================  Tiberium Alliances PvP/PvE Player Info Mod (http://userscripts.org/scripts/source/159150.user.js)  ================================================================

(function () {
	var PlayerInfoMod_main = function () {
		var playerInfoWindow = null;
		var general = null;
		var pvpScoreLabel = null;
		var pveScoreLabel = null;
		var playerName = null;
		var tabView = null;
		var tableModel = null;
		var baseCoords = null;
		var rowData = null;

		function createPlayerInfoMod() {
			try {
				console.log('Player Info Mod loaded');
				var tr = qx.locale.Manager.tr;
				playerInfoWindow = webfrontend.gui.info.PlayerInfoWindow.getInstance();
				general = playerInfoWindow.getChildren()[0].getChildren()[0].getChildren()[0].getChildren()[0].getChildren()[0].getChildren()[1].getChildren()[0];
				tabView = playerInfoWindow.getChildren()[0];
				playerName = general.getChildren()[1];

				var pvpLabel = new qx.ui.basic.Label("- PvP:");
				pvpScoreLabel = new qx.ui.basic.Label("").set({
					textColor: "text-value",
					font: "font_size_13_bold"
				});
				general.add(pvpLabel, {
					row: 3,
					column: 3
				});
				general.add(pvpScoreLabel, {
					row: 3,
					column: 4
				});

				var pveLabel = new qx.ui.basic.Label("- PvE:");
				pveScoreLabel = new qx.ui.basic.Label("").set({
					textColor: "text-value",
					font: "font_size_13_bold"
				});
				general.add(pveLabel, {
					row: 4,
					column: 3
				});
				general.add(pveScoreLabel, {
					row: 4,
					column: 4
				});

				var poiTab = new qx.ui.tabview.Page("POI");
				poiTab.setLayout(new qx.ui.layout.Canvas());
				poiTab.setPaddingTop(6);
				poiTab.setPaddingLeft(8);
				poiTab.setPaddingRight(10);
				poiTab.setPaddingBottom(8);

				tableModel = new webfrontend.data.SimpleColFormattingDataModel().set({
					caseSensitiveSorting: false
				});

				tableModel.setColumns([tr("tnf:name"), tr("tnf:lvl"), tr("tnf:points"), tr("tnf:coordinates")], ["t", "l", "s", "c"]);
				tableModel.setColFormat(3, "<div style=\"cursor:pointer;color:" + webfrontend.gui.util.BBCode.clrLink + "\">", "</div>");
				var poiTable = new webfrontend.gui.widgets.CustomTable(tableModel);
				poiTable.addListener("cellClick", centerCoords, this);

				var columnModel = poiTable.getTableColumnModel();
				columnModel.setColumnWidth(0, 250);
				columnModel.setColumnWidth(1, 80);
				columnModel.setColumnWidth(2, 120);
				columnModel.setColumnWidth(3, 120);
				columnModel.setDataCellRenderer(3, new qx.ui.table.cellrenderer.Html());
				columnModel.getDataCellRenderer(2).setUseAutoAlign(false);
				poiTable.setStatusBarVisible(false);
				poiTable.setColumnVisibilityButtonVisible(false);
				poiTab.add(poiTable, {
					left: 0,
					top: 0,
					right: 0,
					bottom: 0
				});
				tabView.add(poiTab);

				playerInfoWindow.addListener("close", onPlayerInfoWindowClose, this);
				playerName.addListener("changeValue", onPlayerChanged, this);

			} catch (e) {
				console.log("createPlayerInfoMod: ", e);
			}
		}

		function centerCoords(e) {
			try {
				var poiCoord = tableModel.getRowData(e.getRow())[3].split(":");
				if (e.getColumn() == 3) webfrontend.gui.UtilView.centerCoordinatesOnRegionViewWindow(Number(poiCoord[0]), Number(poiCoord[1]));
			} catch (e) {
				console.log("centerCoords: ", e);
			}
		}

		function onPlayerInfo(context, data) {
			try {
				pvpScoreLabel.setValue((data.bd - data.bde).toString());
				pveScoreLabel.setValue(data.bde.toString());
				var bases = data.c;
				baseCoords = new Object;
				for (var i in bases) {
					var base = bases[i];
					baseCoords[i] = new Object();
					baseCoords[i]["x"] = base.x;
					baseCoords[i]["y"] = base.y;
				}
				ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("GetPublicAllianceInfo", {
					id: data.a
				}, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, onAllianceInfo), null);
			} catch (e) {
				console.log("onPlayerInfo: ", e);
			}
		}

		function onAllianceInfo(context, data) {
			try {
				rowData = [];
				var pois = data.opois;
				for (var i in pois) {
					var poi = pois[i];
					for (var j in baseCoords) {
						var distanceX = Math.abs(baseCoords[j].x - poi.x);
						var distanceY = Math.abs(baseCoords[j].y - poi.y);
						if (distanceX > 2 || distanceY > 2) continue;
						if (distanceX == 2 && distanceY == 2) continue;
						var name = phe.cnc.gui.util.Text.getPoiInfosByType(poi.t).name;
						var level = poi.l;
						var score = ClientLib.Base.PointOfInterestTypes.GetScoreByLevel(poi.l);
						var coords = phe.cnc.gui.util.Numbers.formatCoordinates(poi.x, poi.y);
						rowData.push([name, level, score, coords]);
						break;
					}
				}
				tableModel.setData(rowData);
				tableModel.sortByColumn(0, true);
			} catch (e) {
				console.log("onAllianceInfo: ", e);
			}
		}

		function onPlayerChanged() {
			try {
				if (playerName.getValue().length > 0) {
					ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("GetPublicPlayerInfoByName", {
						name: playerName.getValue()
					}, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, onPlayerInfo), null);
				}
			} catch (e) {
				console.log("onPlayerChanged: ", e);
			}
		}

		function onPlayerInfoWindowClose() {
			try {
				pvpScoreLabel.setValue("");
				pveScoreLabel.setValue("");
				tableModel.setData([]);
			} catch (e) {
				console.log("onPlayerInfoWindowClose: ", e);
			}
		}

		function PlayerInfoMod_checkIfLoaded() {
			try {
				if (typeof qx !== 'undefined' && typeof qx.locale !== 'undefined' && typeof qx.locale.Manager !== 'undefined') {
					if (ClientLib.Data.MainData.GetInstance().get_Alliance().get_FirstLeaders() !== null && ClientLib.Data.MainData.GetInstance().get_Alliance().get_FirstLeaders().l.length != 0) {
						createPlayerInfoMod();
					} else {
						window.setTimeout(PlayerInfoMod_checkIfLoaded, 1000);
					}
				} else {
					window.setTimeout(PlayerInfoMod_checkIfLoaded, 1000);
				}
			} catch (e) {
				console.log("PlayerInfoMod_checkIfLoaded: ", e);
			}
		}

		if (/commandandconquer\.com/i.test(document.domain)) {
			window.setTimeout(PlayerInfoMod_checkIfLoaded, 1000);
		}
	}

	try {
		var PlayerInfoMod = document.createElement("script");
		PlayerInfoMod.innerHTML = "(" + PlayerInfoMod_main.toString() + ")();";
		PlayerInfoMod.type = "text/javascript";
		if (/commandandconquer\.com/i.test(document.domain)) {
			document.getElementsByTagName("head")[0].appendChild(PlayerInfoMod);
		}
	} catch (e) {
		console.log("PlayerInfoMod: init error: ", e);
	}
})();



// =========================================================================  Ressourcen MOD  ================================================================

(function () {
	var TransferAll_main = function () {
		var chkbxConfirm = null;
		var resTypeToggle = null;
		var transferQueue = null;
		var transferWindow = null;
		var retry = null;
		var resType = null;
		var resAmount = null;

		function createTransferAll() {
			try {
				console.log('TransferAll loaded');
				chkbxConfirm = new qx.ui.form.CheckBox("");
				transferWindow = webfrontend.gui.trade.TradeOverlay.getInstance().getLayoutChildren()[13].getLayoutChildren()[1].getLayout()._getLayoutChildren();
				resTypeToggle = transferWindow[1].getLayoutChildren()[2];
				var btnTransferAll=new webfrontend.ui.SoundButton("Alles Laden").set({width:85,enabled:false});

				chkbxConfirm.addListener("changeValue", function () {
					btnTransferAll.setEnabled(chkbxConfirm.getValue());
					if (chkbxConfirm.getValue()) performAction('costCalculation');
				}, this);

				resTypeToggle.addListener("changeValue", function () {
					chkbxConfirm.setValue(false);
				}, this);

				btnTransferAll.addListener("click", function () {
					performAction('transfer');
				}, this);

				transferWindow[3].add(btnTransferAll,{right:2,top:100});
				transferWindow[3].add(chkbxConfirm,{right:74,top:104});
			} catch (e) {
				console.log("createTransferAll: ", e);
			}
		}

		function performAction(action) {
			try {
				var cities = ClientLib.Data.MainData.GetInstance().get_Cities();
				var ownCity = cities.get_CurrentOwnCity();
				var allCities = cities.get_AllCities().d;
				var isTiberium = resTypeToggle.getValue();
				var costLabel = transferWindow[3].getLayoutChildren()[1].getLayoutChildren()[1].getLayoutChildren()[2];
				resType = ClientLib.Base.EResourceType.Crystal;
				var transferCost = 0;
				resAmount;
				if (isTiberium) resType = ClientLib.Base.EResourceType.Tiberium;
				var item = [];
				transferQueue = [];

				for (var sourceCity in allCities) {
					if (sourceCity == ownCity.get_Id()) continue;
					resAmount = Math.floor(allCities[sourceCity].GetResourceCount(resType));
					if (allCities[sourceCity].CanTrade() == ClientLib.Data.ETradeError.None && ownCity.CanTrade() == ClientLib.Data.ETradeError.None) {
						if (action == 'transfer') {
							item = [ownCity,allCities[sourceCity],resType,resAmount];
							transferQueue.push(item);
						}
						if (action == 'costCalculation') transferCost += allCities[sourceCity].CalculateTradeCostToCoord(ownCity.get_PosX(), ownCity.get_PosY(), resAmount);
					}
				}
				if (action == 'transfer') {
					chkbxConfirm.setValue(false);
					retry = false;
					transfer();
				}
				if (action == 'costCalculation') {
					costLabel.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompactAfterMillion(transferCost));
					if (transferCost > ClientLib.Data.MainData.GetInstance().get_Player().GetCreditsCount()) costLabel.setTextColor("red");
				}
			} catch (e) {
				console.log("performAction: ", e);
			}
		}

		function transfer() {
			try {
				if (transferQueue.length > 0) {
					var targetCity = transferQueue[0][0];
					var sourceCity = transferQueue[0][1];
					resType = transferQueue[0][2];
					resAmount = transferQueue[0][3];
					ClientLib.Net.CommunicationManager.GetInstance().SendCommand ("SelfTrade",{targetCityId:targetCity.get_Id(),sourceCityId:sourceCity.get_Id(),resourceType:resType,amount:resAmount}, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, transferResult), null, true);
				}
			} catch (e) {
				console.log("transfer: ", e);
			}
		}

		function transferResult(context, result) {
			try {
				if (result != 0 && retry == false) {
					retry = true;
					transfer();
				} else {
					transferQueue.splice(0,1);
					retry = false;
					transfer();
				}
			} catch (e) {
				console.log("transferResult: ", e);
			}
		}

		function TransferAll_checkIfLoaded() {
			try {
				if (typeof qx !== 'undefined') {
					if (ClientLib.Data.MainData.GetInstance().get_Player().get_Faction() !== null) {
						createTransferAll();
					} else {
						window.setTimeout(TransferAll_checkIfLoaded, 1000);
					}
				} else {
					window.setTimeout(TransferAll_checkIfLoaded, 1000);
				}
			} catch (e) {
				console.log("TransferAll_checkIfLoaded: ", e);
			}
		}

		if (/commandandconquer\.com/i.test(document.domain)) {
			window.setTimeout(TransferAll_checkIfLoaded, 1000);
		}
	};

	try {
		var TransferAll = document.createElement("script");
		TransferAll.innerHTML = "(" + TransferAll_main.toString() + ")();";
		TransferAll.type = "text/javascript";
		if (/commandandconquer\.com/i.test(document.domain)) {
			document.getElementsByTagName("head")[0].appendChild(TransferAll);
		}
	} catch (e) {
		console.log("TransferAll: init error: ", e);
	}
})();
// =========================================================================  NACHRICHTEN MOD  ================================================================

(function () {
	var MessageMod_main = function () {
		function createMessageMod() {
			try {
				console.log('MessageMod loaded');
				qx.$$translations[qx.locale.Manager.getInstance().getLocale()]["tnf:my officers"]="Offiziere";
				var addOfficers = function () {
					var roles = this.get_Roles().d;
					var members = this.get_MemberData().d;
					for (var x in members) {
						if (roles[members[x].Role].Name === 'Officer') {
							this.get_SecondLeaders().l.push(members[x].Id);
						}
					}
				};
				ClientLib.Data.Alliance.prototype.addOfficersToSecondLeadersArray = addOfficers;
				var refreshResult = ClientLib.Data.Alliance.prototype.RefreshMemberData.toString().match(/this.this.[A-Z]{6}/).toString().slice(10,16);
				var refreshResult_original = "ClientLib.Data.Alliance.prototype.refreshResult_Original = ClientLib.Data.Alliance.prototype."+refreshResult;
				var rro = Function('', refreshResult_original);
				rro();
				var refreshResult_new = "ClientLib.Data.Alliance.prototype." + refreshResult + " = function(a,b){this.refreshResult_Original(a,b);this.addOfficersToSecondLeadersArray();}";
				var rrn = Function('', refreshResult_new);
				rrn();
				webfrontend.gui.mail.MailOverlay.getInstance().addListener("appear", function () {
					ClientLib.Data.MainData.GetInstance().get_Alliance().RefreshMemberData();
				}, this);
				webfrontend.gui.mail.MailOverlay.getInstance().onNewMessage_Original = webfrontend.gui.mail.MailOverlay.getInstance().onNewMessage;
				webfrontend.gui.mail.MailOverlay.getInstance().onNewMessage = function (a) {
					ClientLib.Data.MainData.GetInstance().get_Alliance().RefreshMemberData();
					this.onNewMessage_Original(a);
				};
			} catch (e) {
			console.log("createMessageMod: ", e);
			}
		}

		function MessageMod_checkIfLoaded() {
			try {
				if (typeof qx !== 'undefined' && typeof qx.locale !== 'undefined' && typeof qx.locale.Manager !== 'undefined') {
					if (ClientLib.Data.MainData.GetInstance().get_Alliance().get_FirstLeaders() !== null && ClientLib.Data.MainData.GetInstance().get_Alliance().get_FirstLeaders().l.length != 0) {
						createMessageMod();
					} else {
						window.setTimeout(MessageMod_checkIfLoaded, 1000);
					}
				} else {
					window.setTimeout(MessageMod_checkIfLoaded, 1000);
				}
			} catch (e) {
			console.log("MessageMod_checkIfLoaded: ", e);
			}
		}

		if (/commandandconquer\.com/i.test(document.domain)) {
			window.setTimeout(MessageMod_checkIfLoaded, 1000);
		}
	}

	try {
		var MessageMod = document.createElement("script");
		MessageMod.innerHTML = "(" + MessageMod_main.toString() + ")();";
		MessageMod.type = "text/javascript";
		if (/commandandconquer\.com/i.test(document.domain)) {
			document.getElementsByTagName("head")[0].appendChild(MessageMod);
		}
	} catch (e) {
	console.log("MessageMod: init error: ", e);
	}
})();

// =========================================================================  CHAT MOD  ================================================================

(function () {
	var CNCTAChatHelper_main = function () {
		try {
			// Caret functions from: http://userscripts.org/scripts/show/151099
			function createChatHelper() {
				window.__ChatHelper_ch_debug = false;
				window.__ChatHelper_suppressBrowserAltKeys = true;
				window.__ChatHelper_version = "3.0.0";
				window.__ChatHelper_fullname = "C&C: Tiberium Alliances Chat Helper Enhanced";
				console.log(window.__ChatHelper_fullname + ' v' + window.__ChatHelper_version + ': loading.');
				
				function getCaretPos(obj) {
					obj.focus();
					
					if (obj.selectionStart)
						return obj.selectionStart; //Gecko
					else if (document.selection) //IE
					{
						var sel = document.selection.createRange();
						var clone = sel.duplicate();
						sel.collapse(true);
						clone.moveToElementText(obj);
						clone.setEndPoint('EndToEnd', sel);
						return clone.text.length;
					}
					
					return 0;
				}
				
				function moveCaret(inputObject, pos) {
					if (inputObject.selectionStart) {
						inputObject.setSelectionRange(pos, pos);
						inputObject.focus();
					}
				}
				
				function getCursorWordPos(inputField) {
					var pos = getCaretPos(inputField);
					var inText = inputField.value;
					var lc = inText.charAt(pos - 1);
					if (lc.match(/\w/) !== null) {
						var sPos = pos;
						var ePos = pos;
						var t = inputField.value;
						while (sPos >= 0 && t.charAt(sPos - 1).match(/\w/) !== null) {
							sPos--;
						}
						while (ePos <= t.length && t.charAt(ePos).match(/\w/) !== null) {
							ePos++;
						}
						//inputField.setSelectionRange(sPos,ePos);
						return [sPos, ePos];
					}
				}
				
				function tagWith(tag, inputField) {
					var eTag = tag.replace('[', '[/');
					var tagLen = tag.length;
					var eTagLen = eTag.length;
					if (inputField !== null) {
						var pos = getCaretPos(inputField);
						var inText = inputField.value;
						if (inputField.type === 'textarea')
							var st = inputField.scrollTop;
						if (inputField.selectionStart !== inputField.selectionEnd) {
							var a = inText.slice(0, inputField.selectionStart);
							var b = inText.slice(inputField.selectionStart, inputField.selectionEnd);
							var c = inText.slice(inputField.selectionEnd, inText.length);
							inputField.value = a + tag + b + eTag + c;
							moveCaret(inputField, pos + tagLen + eTagLen + b.length);
						} else if ((inText === "" || inText.charAt(pos - 1) === " ") && (inText.charAt(pos) !== '[')) {
							inputField.value = inText.substr(0, pos) + tag + eTag + inText.substr(pos, inText.length);
							moveCaret(inputField, pos + tagLen);
						} else if (inText.slice(pos - 1, pos).match(/\w/) !== null) {
							var arr = getCursorWordPos(inputField);
							var s = arr[0];
							var e = arr[1];
							inputField.value = inText.slice(0, s) + tag + inText.slice(s, e) + eTag + inText.slice(e, inText.length);
							moveCaret(inputField, e + tagLen + eTagLen);
						}
						if (inputField.type === 'textarea')
							inputField.scrollTop = st;
					}
				}
				
				function showHelp() {
					alert("Type /chelp in any text box to show this message.\n\nEnter key in chat:\tsearches your chat string for Urls and Coords and wraps them before submission.\n\nAlt + 1\t:\tsearches for Urls and Coords in a message or forum post and tags accordingly. Cursor is moved to the beginning.\nAlt + 2\t:\tManual URL insertion popup window\nAlt + 0\t:\tclears all tags\n\nWord wraps: tags a selected word -or- tags the word where the cursor is (if chat is empty or you hit <space> empty tags are inserted).\nAttempts to preserve cursor and scroll position.\n|\tAlt + P or Alt + 3\t:\tplayer tags\n|\tAlt + A or Alt + 4\t:\talliance tags\n|\tAlt + B\t\t\t:\tbold tags\n|\tAlt + I\t\t\t:\titalic tags\n|\tAlt + U\t\t\t:\tunderline tags\n|\tAlt + T\t\t\t:\tstrikethrough tags\n|\tAlt + X\t\t\t:\tPaste last coords hovered with mouse\n");
				}
				
				var isWhisp = false;
				var contacts = [];
				
				if (!localStorage.myContacts) {
					console.log("Chat Helper: No contacts saved");
					//localStorage.myContacts = [];
				} else {
					contacts = localStorage.myContacts.split(',');
					//console.log("Contacts: " + contacts);
				}
				
				function saveContact(fr) {
					//console.log("Number of contacts: "+contacts.length);
					contacts.push(fr);
					console.log(fr + " added to contacts list.");
					localStorage.myContacts = contacts.join(',');
				}
				
				function caseInsensitiveSort(a, b) {
					a = a.toLowerCase();
					b = b.toLowerCase();
					if (a > b)
						return 1;
					if (a < b)
						return -1;
					return 0;
				}
				
				function listContacts() {
					if (contacts.length > 0) {
						var a = contacts.sort(caseInsensitiveSort);
						//console.log(contacts);
						alert(contacts.length + " Contacts:\n\n" + a.join("\n") + "\n")
					} else {
						var p = prompt("Your contacts list is empty.\n\nWould you like to add a contact?\n", "");
						if (p) {
							saveContact(p);
						}
					}
				}
				
				function deleteContact(fr) {
					if (fr === "all") {
						localStorage.myContacts = "";
						contacts = new Array();
						console.log("All contacts deleted");
					} else {
						var ind = contacts.indexOf(fr);
						if (ind > -1) {
							contacts.splice(ind, 1);
							localStorage.myContacts = contacts.join(',');
						}
						console.log(fr + " deleted from contacts list.");
					}
				}
				var timer;
				function keyUpTimer(kEv){
					kEv = kEv || window.event;
					if (kEv.target.type === "text" && kEv.target.value != '') {
						var inputField = kEv.target;
						var inText = inputField.value;
						var len = inText.length;
						var sub;
						var kc = kEv.keyCode;
						if (len >= 10 && inText.match(/^(\/whisper)/) != null) {
							isWhisp = true;
						}
						if (isWhisp && len >= 10 && !kEv.altGraphKey && !kEv.ctrlKey && !kEv.altKey && kc > 47 && kc < 91) {
							//console.log(kEv.keyCode);
							sub = inText.substr(9);
							if (!sub.match(/\s/)) {
								//console.log("2:"+inText.substr(9));
								for (var i = 0; i < contacts.length; i++) {
									var slen = sub.length;
									if (contacts[i][slen - 1] === sub[slen - 1] && contacts[i].substr(0, slen) == sub) {
										inputField.value = "/whisper " + contacts[i] + " ";
										inputField.setSelectionRange(10 + slen - 1, 10 + contacts[i].length, "forward");
									}
								}
							} else {
								isWhisp = false;
							}
						} else {
							isWhisp = false;
						}
					}
				}
				
				document.onkeyup = function (kEv) {
					clearTimeout(timer);
					timer = setTimeout(function () {
						keyUpTimer(kEv);
					}, 100);
				}
				
				var _sub;
				function delayedConfirm(){
					if (confirm("Add " + _sub + " to your contacts list?\n\nYou can see a list of your contacts by typing /list")) {
						saveContact(_sub);
						//continue without return false to allow whisper message to go through
					}
				}
				
				document.onkeydown = function (kEv) {
					kEv = kEv || window.event;
					
					/* Tab key
					if (kEv.keyCode == 9){
						var input = qx.core.Init.getApplication().getChat().getChatWidget().getEditable(); // Input
						kEv.preventDefault();
						kEv.stopPropagation();
					}
					*/
					if (!kEv.shiftKey && kEv.keyCode === 13 && (kEv.target.type === "text" || kEv.target.type === "textarea")) {
						var inputField = kEv.target;
						var inText = inputField.value;
						var add = inText.match(/^(\/add)/);
						var del = inText.match(/^(\/del)/);
						var showContacts = inText.match(/^((\/contacts)|(\/list))/);
						var sub;
						var cf;
						//add contact dialog
						if (inText.match(/^(\/whisper)/) != null || add != null) {
							if (add != null) {
								sub = inText.substr(5);
							} else {
								sub = inText.substr(9);
							}
							if (sub.match(/^(\w*)\s/)) {
								//if space after player name (is a whisper or a typo)
								var arr = sub.match(/^(\w*)/);
								sub = arr[0].replace(/\s$/, "");
								if (contacts.indexOf(sub) == -1) {
									//not in contacts list
									_sub = sub;
									setTimeout(delayedConfirm,1000);
								}
							} else if (contacts.indexOf(sub) == -1) {
								//not in contacts, promt to add, clear input
								inputField.focus();
								inputField.value = "";
								if (confirm("Add " + sub + " to your contacts list?\n\nYou can see a list of your contacts by typing /list")) {
									saveContact(sub);
									return false;
								}
							} else if (sub && contacts.indexOf(sub) > -1) {
								//not a whisper, reject duplicate contact
								alert(sub + " is already in your contacts list.");
							}
						}
						//remove contact(s)
						if (del) {
							sub = inText.substr(5);
							inputField.value = "";
							if ((contacts.indexOf(sub) > -1 || sub == "all") && confirm("Really delete " + sub + " from your contacts?\n\n Type \"/del all\" to delete all of your contacts")) {
								deleteContact(sub);
							} else {
								alert(sub + " is not in your contacts list.");
							}
							return false;
						}
						// show contacts list
						if (showContacts) {
							inputField.value = "";
							listContacts();
							return false;
							
						}
						// /chelp dialog
						if (inText.length === 6 && inText.match(/^(\/chelp)/) != null) {
							inputField.value = "";
							showHelp();
							return false;
						}
						
						if (inputField !== null && inputField.type === "text") {
							if (window.__ChatHelper_ch_debug)
								console.log("Chat Helper: onEnter auto-tagging");
							//this code is from Bruce Doan: http://userscripts.org/scripts/show/151965
							inText = inText.replace(/(\[coords\])*([0-9]{3})[:|.]([0-9]{3})([:|.]\w+)?(\[\/coords\])*/gi, function () {
									var result = new Array();
									result.push('[coords]');
									result.push(arguments[2]);
									result.push(':');
									result.push(arguments[3]);
									if (arguments[4] !== undefined) {
										result.push(arguments[4].replace('.', ':'));
									}
									result.push('[/coords]');
									return result.join('');
								});
							// auto url
							inText = inText.replace(/(\[url\])*(https?:\/\/)([\da-z\.-]+)(\.[a-z]{2,6})([\/\w\.\-\=\?\&\%\|#]*)*\/?(\[\/url\])*/gi, function () {
									var result = new Array();
									result.push('[url]');
									result.push(arguments[2]); // http[s]://
									result.push(arguments[3]); // domain
									result.push(arguments[4]); // ext
									result.push(arguments[5]); // query string
									result.push('[/url]');
									return result.join('');
									
								});
							// shorthand for player
							inText = inText.replace(/\[p\]([a-z0-9_\-\s]+)\[\/p\]/gi, '[player]$1[/player]');
							// shorthand for alliance
							inText = inText.replace(/\[a\]([a-z0-9_\-\s]+)\[\/a\]/gi, '[alliance]$1[/alliance]');
							if (inText !== "" || inText !== inputField.value) {
								inputField.value = inText;
							}
						}
					}
					
					if (kEv.altKey && !kEv.shiftKey && !kEv.altGraphKey && !kEv.ctrlKey && kEv.target != null && (kEv.target.type === "textarea" || kEv.target.type === "text")) {
						var inputField = kEv.target;
						var inText = inputField.value;
						// Alt key, not Ctrl or AltGr
						if (kEv.altKey && !kEv.altGraphKey && !kEv.ctrlKey) {
							var cc = kEv.charCode;
							var kc = kEv.keyCode;
							if (window.__ChatHelper_ch_debug) {
								console.log(cc);
								console.log(kc);
							}
							/* Alt+1 for auto Coordinates/Urls in message body */
							if (inputField.type === "textarea" && (cc === 49 || kc === 49)) {
								var pos = getCaretPos(inputField);
								if (window.__ChatHelper_ch_debug)
									console.log("Chat Helper: attempting Alt+1 message auto-tag");
								if (inputField != null) {
									var st = inputField.scrollTop;
									inText = inText.replace(/(\[coords\])*([0-9]{3})[:|.]([0-9]{3})([:|.]\w+)?(\[\/coords\])*/gi, function () {
											var result = new Array();
											result.push('[coords]');
											result.push(arguments[2]);
											result.push(':');
											result.push(arguments[3]);
											if (arguments[4] !== undefined) {
												result.push(arguments[4].replace('.', ':'));
											}
											result.push('[/coords]');
											return result.join('');
										});
									// auto url
									inText = inText.replace(/(\[url\])*(https?:\/\/)([\da-z\.-]+)(\.[a-z]{2,6})([\/\w\.\-\=\?\&\%\|#]*)*\/?(\[\/url\])*/gi, function () {
											var result = new Array();
											result.push('[url]');
											result.push(arguments[2]); // http[s]://
											result.push(arguments[3]); // domain
											result.push(arguments[4]); // ext
											result.push(arguments[5]); // query string
											result.push('[/url]');
											return result.join('');
											
										});
									inText = inText.replace(/\[a\]([a-z0-9_\-\s]+)\[\/a\]/gi, '[alliance]$1[/alliance]');
									inText = inText.replace(/\[p\]([a-z0-9_\-\s]+)\[\/p\]/gi, '[player]$1[/player]');
									if (inText !== "" || inText !== inputField.value) {
										inputField.value = inText;
										inputField.scrollTop = st;

										moveCaret(inputField, 0);
									}
								}
							}
							/* Alt+2 for URLs fallback */
							if (cc === 50 || kc === 50) {
								if (inputField !== null) {
									var url = prompt("Website (Syntax: google.com or www.google.com)", "");
									if (url !== null) {
										inputField.value += '[url]' + url + '[/url]';
									}
								}
							}
							/* Alt+3 or Alt+p for players */
							if ((cc === 112 || kc === 80) || (cc === 51 || kc === 51)) {
								tagWith('[player]', inputField);
								if (window.__ChatHelper_suppressBrowserAltKeys)
									return false;
							}
							/* Alt+4 or Alt+a for alliances */
							if ((cc === 97 || kc === 65) || (cc === 52 || kc === 52)) {
								tagWith('[alliance]', inputField);
								if (window.__ChatHelper_suppressBrowserAltKeys)
									return false;
							}
							/* Alt+0 to clear tags */
							if (cc === 48 || kc === 48) {
								if (inputField.type === 'textarea')
									var st = inputField.scrollTop;
								if (inputField !== null) {
									inText = inText.replace(/\[\/?coords\]/gi, '');
									inText = inText.replace(/\[\/?url\]/gi, '');
									inText = inText.replace(/\[\/?player\]/gi, '');
									inText = inText.replace(/\[\/?alliance\]/gi, '');
									inText = inText.replace(/\[\/?b\]/gi, '');
									inText = inText.replace(/\[\/?i\]/gi, '');
									inText = inText.replace(/\[\/?u\]/gi, '');
									inText = inText.replace(/\[\/?s\]/gi, '');
									inputField.value = inText;
								}
								if (inputField.type === 'textarea')
									inputField.scrollTop = st;
							}
							/* Alt+b for bold */
							if (cc === 98 || kc === 66) {
								tagWith('[b]', inputField);
								if (window.__ChatHelper_suppressBrowserAltKeys)
									return false;
							}
							/* Alt+i for italics */
							if (cc === 105 || kc === 73) {
								tagWith('[i]', inputField);
								if (window.__ChatHelper_suppressBrowserAltKeys)
									return false;
							}
							/* Alt+u for underline */
							if (cc === 117 || kc === 85) {
								tagWith('[u]', inputField);
								if (window.__ChatHelper_suppressBrowserAltKeys)
									return false;
							}
							/* Alt+T for strikethrough (CHANGED for compatibility, initial Alt+S) )*/
							if (cc === 116 || kc === 84) {
								tagWith('[s]', inputField);
								if (window.__ChatHelper_suppressBrowserAltKeys)
									return false;
							}
						}
					}
				}
			}
		} catch (err) {
			console.log("createChatHelper: ", err);
		}
		
		function CNCTAChatHelper_checkIfLoaded() {
			try {
				if (typeof qx !== 'undefined') {
					createChatHelper();
				} else {
					window.setTimeout(CNCTAChatHelper_checkIfLoaded, 1000);
				}
			} catch (err) {
				console.log("CNCTAChatHelper_checkIfLoaded: ", err);
			}
		}
		window.setTimeout(CNCTAChatHelper_checkIfLoaded, 1000);
	};
	try {
		var CNCTAChatHelper = document.createElement("script");
		CNCTAChatHelper.innerHTML = "(" + CNCTAChatHelper_main.toString() + ")();";
		CNCTAChatHelper.type = "text/javascript";
		document.getElementsByTagName("head")[0].appendChild(CNCTAChatHelper);
	} catch (err) {
		console.log("CNCTAChatHelper: init error: ", err);
	}
})();

// =========================================================================  Kampfsimulator MOD  ================================================================

(function () {
    var injectFunction = function () {
        function createClasses() {
            qx.Class.define("Simulator", {
                type: "singleton",
                extend: qx.core.Object,

                construct: function () {
                    try {
                        this.armyBar = qx.core.Init.getApplication().getArmySetupAttackBar();
                        this.playArea = qx.core.Init.getApplication().getMainOverlay();
                        this.replayBar = qx.core.Init.getApplication().getReportReplayOverlay();
                        this.isSimButtonDisabled = false;
                        this.armyTempFormations = [];
                        this.armyTempIdx = 0;
                        this.isSimulation = false;
                        this.hideArmyTooltips();

                        /**
                         *   Setup Images
                         */

                        var img = {
                            Arrows: {
                                Up: "webfrontend/theme/arrows/up.png",
                                Down: "webfrontend/theme/arrows/down.png",
                                Left: "webfrontend/theme/arrows/left.png",
                                Right: "webfrontend/theme/arrows/right.png"
                            },
                            Flip: {
                                H: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOvgAADr4B6kKxwAAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAACo0lEQVQ4T2PABkJq+rjmH7nUdPrV119nXn/9s+7S/R1NCzc4rTx1a8ay41c7WuYsl5WRkWGEKicM4honSux7+Pb42Tdf/4LwwacfP7Wv3pOz8sydVavO3lk5f9cx15jCGhaocsJgys7jAUeffXiGZODn1lW7Claeub16xelb64C4Ma+lnx+qHD/wySpjXnnqeifQq79RDFy5qxBq4PqVp25Ombxmhw4QQHXhAdH1fWL77r++DDToD04Dz9xeteDAuajc1gn4ve0UkciU3zvT4vTrb79ghmEzEOTtNefvL8pomyrExsYG1Y0FxNT18my4dH8KKGYJGLgeGDkrJqzeoR9ZWMMM1Y4Jercctjr46N1NZMNwGQhy5YpTN/PzWvu5oNpRgUdGGdOc/WfST736guJdPAauX3HiekfH4vXyUCNQQVhtn8D2W8+2nEGKDEIGgrw9a+cxeyUlJdRE7pldxZjcOlXj6LOPj9ENw2cgkL9m2dHL2TGljZxQoyAgrKaHdfmZWxVA734jxUAQXnXm9tS6yXMlTG2doKYBQWrrZIHNVx4sBWrG8C4I4zNw5enbi+ftPuGSVNGMiO2edXstjz3/9BabYSBMwMC1y09cr2pbvFEIbJh/RinrlI1744CRAc9q6BifgSC8+tzdpT1rdmuAE3l80yTZ/UglCzZMyECQ+MID58NiyprYGGbuO5t1/MWn99gMgmFCBoLwytO3Wir6ZggzLDpycQJyyYINH3r66WP7mj25wPDCZ+DsSRv2WTAsPHCmChgh7068/PwTGz4OlFtz+npX7/p9LstP3WwA4hZseMXp2w3Td56wYyho6lSdsfNY6YzdJydM330CBYPEQHIVnROVIzMLOIvb+oVq+meIVPVOQ8EgsYqeqUJJpfWcAKWymA2EsiGlAAAAAElFTkSuQmCC",
                                V: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOvgAADr4B6kKxwAAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAAClklEQVQ4T2MgB/iVd7CH1/SI9G3YF7D4+JUlR59/+nH61dff8w6cnQBVgh+EN01hjGqZxpY9eYlI39YjNvMOni888Ojd0aNP3z8+8/rr77Nvvv498+brn/n7T0+HasEOIlpnMIc1TBIJq+vX3HjtSd/ma4/WnHj59TtQM9gQZAwycO7ekzOhWhHAo6CRKaymh6d69krVWfvOpO19+O700WcfYS75g24QDGMYCPQWS1TzFKmktmkmO26/XLHv3sujwHD5CVSM0xBkDDcwqLJLcMHxa/FLT17rOPz04/PTb779wqaBEIYbOHv/2ZxjLz6/BglgU0gshhu44MDZaUABigwDYbCB+07NZJi29WDFvrsvLu+78/waDnwdixgmBpoxbduhMgav6ETZyNxSm+j8creoPPJwdH4FkC6z9o1NlWaYsnGf0ZpzdyeuOnt3GSUYZMZUoFkMk7ceDV555s6KFadvrQPi9eRioBmrpu44EcLQvHijweJDFzJWnrrRu/LM7VVASbIMBupdPWX78TAGt8Bw1oSsfL6qCbMUp2855Lvk+LXGFaduTgcpACpci64RF4YbCALe3t6MLi4uTC6BEZwhqXnC3Us3ms7acSxi+YlrLaDwgRqO1SAYRjEQGYAMB2JmN08v9vCMAuGWafPVFu4/E7H8+NWaVWduz11x+vYakgyEAaChDEBXM3r5+rOGJmVwlzZ1Svav2m656NDFghWnbk0FGrAEaBAoSMBhTtBAdAByuZOrO4t7eDxfWlWz7IztR70WHDiXA3T1jFVn76wE4hVTtx8PhionDoBc7eDgwODq4ckcFJPEHp9TJNA0e5n6tPU77ZcfvZLaNnupClQpeQDkaktLS2Y3Hz9Ov8h4XltnV3YAMTRvewY5T1wAAAAASUVORK5CYII="
                            },
                            DisableUnit: "FactionUI/icons/icon_disable_unit.png",
                            Undo: "FactionUI/icons/icon_refresh_funds.png"
                        };

                         /**
                         *   Setup Buttons
                         */

                        //Simulation Button//
                        this.simBtn = new qx.ui.form.Button("Simulate").set({toolTipText: "Opens Simulation Screen.", width: 60, height: 28, alignY: "middle", appearance: "button-text-small"});
                        this.simBtn.addListener("click", function () { this.__openSimulatorWindow(); }, this);
                        this.armyBar.add(this.simBtn, {left: null, right: 58, bottom: 119});

                        //Simulator Stats Button//
                        this.statBtn = new qx.ui.form.Button("Stats").set({toolTipText: "Opens Simulator Stats Window", width: 60, height: 28, alignY: "middle", appearance: "button-text-small"});
                        this.statBtn.addListener("click", function () { this.__openStatWindow(); }, this);
                        this.armyBar.add(this.statBtn, {left: null, right: 58, bottom: 81});

                        //Simulator Options Button//
                        this.optionBtn = new qx.ui.form.Button("Options").set({toolTipText: "Opens Simulator Options", width: 60, height: 28, alignY: "middle", appearance: "button-text-small"});
                        this.optionBtn.addListener("click", function () { this.__openOptionWindow(); }, this);
                        this.armyBar.add(this.optionBtn, {left: null, right: 58, bottom: 43});

                        //Simulator Layout Button//
                        this.layoutBtn = new qx.ui.form.Button("Layout").set({toolTipText: "Save/Load/Delete Unit Formations for current city", width: 60, height: 28, alignY: "middle", appearance: "button-text-small"});
                        this.layoutBtn.addListener("click", function () { this.__openLayoutWindow(); }, this);
                        this.armyBar.add(this.layoutBtn, {left: null, right: 58, bottom: 6});

                        //Simulator Unlock Combat Button//
                        this.unlockCmtBtn = new qx.ui.form.Button("Unlock").set({toolTipText: "Unlock Combat Button", width: 50, height: 50, opacity: 0.7, alignY: "middle", appearance: "button-text-small"});
                        this.unlockCmtBtn.addListener("click", function () { this.timeoutCmtBtn(); }, this);
                        this.armyBar.add(this.unlockCmtBtn, {left: null, right: 7, bottom: 5});

                        //Simulator Unlock Repair Time Button//
                        this.unlockRTBtn = new qx.ui.form.Button("Unlock").set({toolTipText: "Unlock Repair Button", width: 50, height: 50, opacity: 0.7, alignY: "middle", appearance: "button-text-small"});
                        this.unlockRTBtn.addListener("click", function () { this.timeoutRTBtn(); }, this);
                        this.armyBar.add(this.unlockRTBtn, {left: null, right: 7, bottom: 97});

                        //Formation Shift Buttons//
                        this.shiftUpBtn = new qx.ui.form.Button("", img.Arrows.Up).set({toolTipText: "Shifts units one space up", width: 30, height: 20, alignY: "middle", appearance: "button-text-small", gap: 0, iconPosition: "top", show: "icon"});
                        this.shiftUpBtn.addListener("click", function () { this.shiftFormation("u", 0); }, this);
                        this.shiftUpBtn.hide();
                        this.playArea.add(this.shiftUpBtn, {left: null, right: 75, bottom: 113});

                        this.shiftDownBtn = new qx.ui.form.Button("", img.Arrows.Down).set({toolTipText: "Shifts units one space down", width: 30, height: 20, alignY: "middle", appearance: "button-text-small", gap: 0, iconPosition: "top", show: "icon"});
                        this.shiftDownBtn.addListener("click", function () { this.shiftFormation("d", 0); }, this);
                        this.shiftDownBtn.hide();
                        this.playArea.add(this.shiftDownBtn, {left: null, right: 75, bottom: 73});

                        this.shiftLeftBtn = new qx.ui.form.Button("", img.Arrows.Left).set({toolTipText: "Shifts units one space left", width: 30, height: 20, alignY: "middle", appearance: "button-text-small", gap: 0, iconPosition: "top", show: "icon"});
                        this.shiftLeftBtn.addListener("click", function () { this.shiftFormation("l", 0); }, this);
                        this.shiftLeftBtn.hide();
                        this.playArea.add(this.shiftLeftBtn, {left: null, right: 95, bottom: 93});

                        this.shiftRightBtn = new qx.ui.form.Button("", img.Arrows.Right).set({toolTipText: "Shifts units one space right", width: 30, height: 20, alignY: "middle", appearance: "button-text-small", gap: 0, iconPosition: "top", show: "icon"});
                        this.shiftRightBtn.addListener("click", function () { this.shiftFormation("r", 0); }, this);
                        this.shiftRightBtn.hide();
                        this.playArea.add(this.shiftRightBtn, {left: null, right: 55, bottom: 93});

                        for (var i = 0; i < ClientLib.Base.Util.get_ArmyMaxSlotCountY(); i++) {
                            var shiftLeftBtn = new qx.ui.form.Button(i+1, img.Arrows.Left).set({toolTipText: "Shifts units one space left", width: 30, maxHeight: 25, alignY: "middle", show: "icon", iconPosition: "top"});
                            shiftLeftBtn.addListener("click", function (e) { this.shiftFormation("l", parseInt(e.getTarget().getLabel(), 10)); }, this);
                            var shiftRightBtn = new qx.ui.form.Button(i+1, img.Arrows.Right).set({toolTipText: "Shifts units one space right", width: 30, maxHeight: 25, alignY: "middle", show: "icon", iconPosition: "top"});
                            shiftRightBtn.addListener("click", function (e) { this.shiftFormation("r", parseInt(e.getTarget().getLabel(), 10)); }, this);

                            var cntWave = this.armyBar.getChildren()[1].getChildren()[(i+4)];
                            cntWave.removeAll();
                            cntWave.setLayout(new qx.ui.layout.HBox());
                            cntWave.add(new qx.ui.core.Spacer(), {flex: 1});
                            cntWave.add(shiftLeftBtn);
                            cntWave.add(shiftRightBtn);
                            cntWave.add(new qx.ui.core.Spacer(), {flex: 1});
                        }

                        //Formation Mirror Buttons//
                        this.mirrorBtnH = new qx.ui.form.Button("", img.Flip.H).set({toolTipText: "Mirrors current army formation layout", show: "icon", width: 35, height: 35, center: true, alignY: "middle", appearance: "button-text-small"});
                        this.mirrorBtnH.getChildControl("icon").set({width: 20, height: 20, scale: true});
                        this.mirrorBtnH.addListener("click", function () { this.mirrorFormation("h"); }, this);
                        this.mirrorBtnH.hide();
                        this.playArea.add(this.mirrorBtnH, {left: null, right: 6, bottom: 160});

                        this.mirrorBtnV = new qx.ui.form.Button("", img.Flip.V).set({toolTipText: "Mirrors current army formation layout", show: "icon", width: 35, height: 35, center: true, alignY: "middle", appearance: "button-text-small"});
                        this.mirrorBtnV.getChildControl("icon").set({width: 20, height: 20, scale: true});
                        this.mirrorBtnV.addListener("click", function () { this.mirrorFormation("v"); }, this);
                        this.mirrorBtnV.hide();
                        this.playArea.add(this.mirrorBtnV, {left: null, right: 46, bottom: 160});

                        //Disable all Units Button//
                        this.disableAllUnitsBtn = new qx.ui.form.Button("", img.DisableUnit).set({toolTipText: "Enables/Disables all units", show: "icon", width: 35, height: 35, center: true, alignY: "middle", appearance: "button-text-small"});
                        this.disableAllUnitsBtn.getChildControl("icon").set({width: 20, height: 20, scale: true});
                        this.disableAllUnitsBtn.addListener("click", function () { this.shiftFormation("n", 0); }, this);
                        this.disableAllUnitsBtn.hide();
                        this.playArea.add(this.disableAllUnitsBtn, {left: null, right: 6, bottom: 120});

                        //Undo Button//
                        this.armyUndoBtn = new qx.ui.form.Button("", img.Undo).set({toolTipText: "Undo's formation to previous saved formation. Save formations by hitting the Update or Simulate button.", show: "icon", width: 35, height: 35, center: true, alignY: "middle", appearance: "button-text-small"});
                        this.armyUndoBtn.getChildControl("icon").set({width: 20, height: 20, scale: true});
                        this.armyUndoBtn.addListener("click", function () { this.undoCurrentFormation(); }, this);
                        this.armyUndoBtn.setEnabled(false);
                        this.armyUndoBtn.hide();
                        this.playArea.add(this.armyUndoBtn, {left: null, right: 6, bottom: 200});

                        //Quick Save Button//
                        this.quickSaveBtn = new qx.ui.form.Button("QS").set({toolTipText: "Saves the current layout without having to open the Formation Saver window. Does not make persistent.", width: 35, height: 35, alignY: "middle", appearance: "button-text-small"});
                        this.quickSaveBtn.addListener("click", function () { Simulator.LayoutWindow.getInstance().saveNewLayout(true); }, this);
                        this.quickSaveBtn.hide();
                        this.playArea.add(this.quickSaveBtn, {left: null, right: 6, bottom: 240});

                        //Simulator Back Button//
                        this.backBtn = new qx.ui.form.Button("Back").set({toolTipText: "Return to Combat Setup", width: 50, height: 24, appearance: "button-text-small"});
                        this.backBtn.addListener("click", function () { this.backToCombatSetup(); }, this);
                        this.replayBar.add(this.backBtn, {top: 37, left: 255});

                        this.replayStatBtn = new qx.ui.form.Button("Stats").set({toolTipText: "Return to Combat Setup", width: 50, height: 24, appearance: "button-text-small"});
                        this.replayStatBtn.addListener("click", function () { this.__openStatWindow(); }, this);
                        this.replayBar.add(this.replayStatBtn, {top: 7, left: 255});

                    } catch (e) {
                        console.log("Error setting up Simulator Constructor: ");
                        console.log(e.toString());
                    }
                },

                destruct: function () {},

                members: {
                    armyBar: null,
                    playArea: null,
                    replayBar: null,
                    isSimButtonDisabled: null,
                    armyTempFormations: null,
                    armyTempIdx: null,
                    isSimulation: null,
                    simBtn: null,
                    optionBtn: null,
                    statBtn: null,
                    layoutBtn: null,
                    unlockCmtBtn: null,
                    unlockRTBtn: null,
                    shiftUpBtn: null,
                    shiftDownBtn: null,
                    shiftLeftBtn: null,
                    shiftRightBtn: null,
                    disableAllUnitsBtn: null,
                    armyUndoBtn: null,
                    quickSaveBtn: null,
                    backBtn: null,
                    replayStatBtn: null,

                    __openSimulatorWindow: function () {
                        /**
                        * This method initiates the visual simulation with no stats produced. If the player
                        * wants stats produced, then they should do it through the stats window.
                        */

                        var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
                        if (city != null) {
                            var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();

                            this.isSimulation = true;
                            this.saveTempFormation();

                            localStorage.ta_sim_last_city = city.get_Id();

                            ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
                            ClientLib.API.Battleground.GetInstance().SimulateBattle();
                            var app = qx.core.Init.getApplication();

                            app.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatReplay, city.get_Id(), 0, 0);

                            var autoSim = localStorage['autoSimulate'];

                            if (typeof autoSim != 'undefined') {
                                if (autoSim == "yes") {
                                    var speed = localStorage['simulateSpeed'];
                                    setTimeout(function () {
                                        var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
                                        battleground.RestartReplay();
                                        battleground.set_ReplaySpeed(parseInt(speed));
                                    }, 1000)
                                }
                            }

                            if (this.isSimButtonDisabled == false) {
                                this.simBtn.setEnabled(false);
                                var simTimer = 10000;
                                this.disableSimulateButtonTimer(simTimer);

                                if (typeof Simulator.StatWindow.getInstance().simStatBtn != "undefined") {
                                    Simulator.StatWindow.getInstance().simStatBtn.setEnabled(false);
                                    var simStatTimer = 10000;
                                    Simulator.StatWindow.getInstance().disableSimulateStatButtonTimer(simStatTimer);
                                }
                            }

                            setTimeout(function () {
                                var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
                                var battleDuration = battleground.get_BattleDuration();
                                battleDuration = Simulator.StatWindow.getInstance().formatBattleDurationTime(battleDuration);
                                Simulator.StatWindow.getInstance().sim[Simulator.StatWindow.getInstance().simSelected].Label.Battle.Duration.setValue(battleDuration);
                            }, 1000);

                            if (Simulator.StatWindow.getInstance().simReplayBtn.getEnabled() == false) {
                                Simulator.StatWindow.getInstance().simReplayBtn.setEnabled(true);
                            }
                        }
                    },

                    __openOptionWindow: function () {
                        try {
                            if (Simulator.OptionWindow.getInstance().isVisible()) {
                                console.log("Closing Option Window");
                                Simulator.OptionWindow.getInstance().close();
                            } else {
                                console.log("Opening Option Window");
                                Simulator.OptionWindow.getInstance().open();
                            }
                        } catch (e) {
                            console.log("Error Opening or Closing Option Window");
                            console.log(e.toString());
                        }
                    },

                    __openStatWindow: function () {
                        try {
                            if (Simulator.StatWindow.getInstance().isVisible()) {
                                console.log("Closing Stat Window");
                                Simulator.StatWindow.getInstance().close();
                            } else {
                                console.log("Opening Stat Window");
                                Simulator.StatWindow.getInstance().open();
                                Simulator.StatWindow.getInstance().calcResources();
                            }
                        } catch (e) {
                            console.log("Error Opening or Closing Stat Window");
                            console.log(e.toString());
                        }
                    },

                    __openLayoutWindow: function () {
                        try {
                            if (Simulator.LayoutWindow.getInstance().isVisible()) {
                                console.log("Closing Layout Window");
                                Simulator.LayoutWindow.getInstance().close();
                            } else {
                                console.log("Opening LayoutWindow");
                                Simulator.LayoutWindow.getInstance().updateLayoutList();
                                Simulator.LayoutWindow.getInstance().layoutTextBox.setValue("");
                                Simulator.LayoutWindow.getInstance().persistentCheck.setValue(false);
                                Simulator.LayoutWindow.getInstance().open();
                            }
                        } catch (e) {
                            console.log("Error Opening or Closing Layout Window");
                            console.log(e.toString());
                        }
                    },

                    attachNetEvent: function () {
                        console.log("Need to assign correct function!");
                    },

                    formatNumbersCompact: function () {
                        console.log("Need to assign correct function!");
                    },

                    saveTempFormation: function () {
                        try {
                            var units = this.getCityPreArmyUnits().get_ArmyUnits().l;
                            if (this.armyTempFormations.length != 0) {
                                for (var i = 0; i < units.length; i++) {
                                    var lastForm = this.armyTempFormations[this.armyTempIdx][i];
                                    if ((units[i].get_CoordX() != lastForm.x) || (units[i].get_CoordY() != lastForm.y)) {
                                        break;
                                    } else if ((i + 1) == units.length) {
                                        return;
                                    }
                                }
                            }

                            var formation = new Array();

                            for (var i = 0; i < units.length; i++) {
                                var unit = units[i];
                                var unitInfo = {};
                                unitInfo.x = unit.get_CoordX();
                                unitInfo.y = unit.get_CoordY();
                                unitInfo.id = unit.get_Id();
                                unitInfo.enabled = unit.get_Enabled();

                                formation.push(unitInfo);
                            }

                            this.armyTempFormations.push(formation);
                            this.armyTempIdx = this.armyTempFormations.length - 1;
                            if (this.armyTempFormations.length > 1)
                                this.armyUndoBtn.setEnabled(true);
                        } catch (e) {
                            console.log("Error Saving Temp Formation");
                            console.log(e.toString());
                        }
                    },

                    undoCurrentFormation: function () {
                        try {
                            this.restoreFormation(this.armyTempFormations[(this.armyTempIdx - 1)]);

                            //get rid of last element now that we have undone it.
                            this.armyTempFormations.splice(this.armyTempIdx, 1);
                            this.armyTempIdx--;

                            if (this.armyTempFormations.length == 1)
                                this.armyUndoBtn.setEnabled(false);
                        } catch (e) {
                            console.log("Error undoing formation");
                            console.log(e.toString());
                        }
                    },

                    /*
                     * Mirrors across the X/Y Axis
                     */
                    mirrorFormation: function (direction) {
                        try {
                            console.log("Shifting Unit Formation");

                            var units = this.getCityPreArmyUnits().get_ArmyUnits().l;

                            var newLayout = [];
                            for (var i = 0; i < units.length; i++) {
                                var unit = units[i],
                                    armyUnit = {},
                                    x = unit.get_CoordX(),
                                    y = unit.get_CoordY();
                                if (direction == "h")
                                    x = Math.abs(x - 8);
                                if (direction == "v")
                                    y = Math.abs(y - 3);
                                armyUnit.x = x;
                                armyUnit.y = y;
                                armyUnit.id = unit.get_Id();
                                armyUnit.enabled = unit.get_Enabled();
                                newLayout.push(armyUnit);
                            }
                            this.restoreFormation(newLayout);
                        } catch (e) {
                            console.log("Error Mirroring Formation");
                            console.log(e.toString());
                        }
                    },

                    /*
                     * Code from one of the previous authors of an older simulator version. If anyone knows the true author please let me know.
                     */
                    shiftFormation: function (direction, sel) {
                        try {
                            console.log("Shifting Unit Formation: direction:"+ direction +", sel:"+ sel);
                            var v_shift = 0;
                            var h_shift = 0;
                            var select = sel;

                            //Determines shift direction
                            if (direction == "u") var v_shift = -1;
                            if (direction == "d") var v_shift = 1;
                            if (direction == "l") var h_shift = -1;
                            if (direction == "r") var h_shift = 1;
                            //No need to continue
                            if (v_shift == 0 && h_shift == 0 && direction != "n")
                                return;

                            var units = this.getCityPreArmyUnits().get_ArmyUnits().l;

                            var newLayout = [];
                            for (var i = 0; i < units.length; i++) {
                                var unit = units[i];
                                var armyUnit = {};
                                var x = unit.get_CoordX() + h_shift;
                                switch (x) {
                                case 9:
                                    x = 0;
                                    break;
                                case -1:
                                    x = 8;
                                    break;
                                }
                                var y = unit.get_CoordY() + v_shift;
                                switch (y) {
                                case 4:
                                    y = 0;
                                    break;
                                case -1:
                                    y = 3;
                                    break;
                                }
                                if (select != 0 && (unit.get_CoordX() != (select - 1)) && (direction == "u" || direction == "d")) {
                                    armyUnit.y = unit.get_CoordY();
                                } else {
                                    armyUnit.y = y;
                                }
                                if (select != 0 && (unit.get_CoordY() != (select - 1)) && (direction == "l" || direction == "r")) {
                                    armyUnit.x = unit.get_CoordX();
                                } else {
                                    armyUnit.x = x;
                                }
                                armyUnit.id = unit.get_Id();

                                //For enabling/disabling all units
                                if (direction == "n") {
                                    if (typeof localStorage['allUnitsDisabled'] != 'undefined') {
                                        if (localStorage['allUnitsDisabled'] == "yes") {
                                            armyUnit.enabled = unit.set_Enabled(false);
                                        } else {
                                            armyUnit.enabled = unit.set_Enabled(true);
                                        }
                                    } else {
                                        armyUnit.enabled = unit.set_Enabled(false);
                                    }
                                }
                                armyUnit.enabled = unit.get_Enabled();
                                newLayout.push(armyUnit);
                            }
                            //Change disable button to opposite
                            if (direction == "n") {
                                if (localStorage['allUnitsDisabled'] == "yes")
                                    localStorage['allUnitsDisabled'] = "no";
                                else
                                    localStorage['allUnitsDisabled'] = "yes";
                            }
                            this.restoreFormation(newLayout);
                        } catch (e) {
                            console.log("Error Shifting Units");
                            console.log(e.toString());
                        }
                    },

                    restoreFormation: function (layout) {
                        try {
                            var sUnits = layout;

                            var units = this.getCityPreArmyUnits();
                            var units_list = units.get_ArmyUnits().l;

                            for (var idx = 0; idx < sUnits.length; idx++)
                            {
                                var saved_unit = sUnits[idx];
                                var uid = saved_unit.id;
                                for (var i = 0; i < units_list.length; i++)
                                {
                                    if (units_list[i].get_Id() === uid)
                                    {
                                        units_list[i].MoveBattleUnit(saved_unit.x, saved_unit.y);
                                        if (saved_unit.enabled === undefined)
                                            units_list[i].set_Enabled(true);
                                        else
                                            units_list[i].set_Enabled(saved_unit.enabled);
                                    }
                                }
                            }
                            units.UpdateFormation(true);
                        } catch (e) {
                            console.log("Error Restoring Formation");
                            console.log(e.toString());
                        }
                    },

                    getCityPreArmyUnits: function () {
                        var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
                        var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                        var formationManager = ownCity.get_CityArmyFormationsManager();
                        ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());

                        return formationManager.GetFormationByTargetBaseId(formationManager.get_CurrentTargetBaseId());
                    },

                    timeoutCmtBtn: function () {
                        this.armyBar.remove(this.unlockCmtBtn);
                        setTimeout(function () {
                            Simulator.getInstance().armyBar.add(Simulator.getInstance().unlockCmtBtn, {
                                left: null,
                                right: 7,
                                bottom: 5
                            });
                        }, 2000);
                    },

                    timeoutRTBtn: function () {
                        this.armyBar.remove(this.unlockRTBtn);
                        setTimeout(function () {
                            Simulator.getInstance().armyBar.add(Simulator.getInstance().unlockRTBtn, {
                                left: null,
                                right: 7,
                                bottom: 97
                            });
                        }, 2000);
                    },

                    backToCombatSetup: function () {
                        try {
                            var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
                            if (city != null) {
                                var app = qx.core.Init.getApplication();
                                app.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupDefense, city.get_Id(), 0, 0);
                            }
                        } catch (e) {
                            console.log("Error closing Simulation Window");
                            console.log(e.toString());
                        }
                    },

                    disableSimulateButtonTimer: function (timer) {
                        try {
                            if (timer >= 1000) {
                                this.isSimButtonDisabled = true;
                                this.simBtn.setLabel(Math.floor(timer / 1000));
                                timer -= 1000;
                                setTimeout(function () {
                                    Simulator.getInstance().disableSimulateButtonTimer(timer);
                                }, 1000)
                            } else {
                                setTimeout(function () {
                                    Simulator.getInstance().simBtn.setEnabled(true);
                                    if (Simulator.OptionWindow.getInstance()._buttonSizeCB.getValue())
                                        Simulator.getInstance().simBtn.setLabel("Simulate");
                                    else
                                        Simulator.getInstance().simBtn.setLabel("S");
                                }, timer)
                                this.isSimButtonDisabled = false;
                            }
                        } catch (e) {
                            console.log("Error disabling simulator button");
                            console.log(e.toString());
                        }
                    },

                    hideArmyTooltips: function () {
                        try {
                            if (typeof localStorage["ArmyUnitTooltipDisabled"] == "undefined") localStorage["ArmyUnitTooltipDisabled"] = "yes";
                            for (var i in ClientLib.Vis.BaseView.BaseView.prototype) {
                                if (typeof ClientLib.Vis.BaseView.BaseView.prototype[i] === "function") {
                                    var j = ClientLib.Vis.BaseView.BaseView.prototype[i].toString();
                                    var k = ClientLib.Vis.BaseView.BaseView.prototype.ShowToolTip.toString();
                                    if (j.indexOf(k) > -1) {
                                        Function("", "ClientLib.Vis.BaseView.BaseView.prototype.ShowToolTip_Original = ClientLib.Vis.BaseView.BaseView.prototype." + i)();
                                        Function("", "ClientLib.Vis.BaseView.BaseView.prototype."+ i +" = function (a) { if(ClientLib.Vis.VisMain.GetInstance().get_Mode()==7 && localStorage['ArmyUnitTooltipDisabled']=='yes') { return; } else { this.ShowToolTip_Original(a); } };")();
                                        break;
                                    }
                                }
                            }
                            qx.core.Init.getApplication().getArmyUnitTooltipOverlay().setVisibility_Original = qx.core.Init.getApplication().getArmyUnitTooltipOverlay().setVisibility;
                            qx.core.Init.getApplication().getArmyUnitTooltipOverlay().setVisibility = function (k) {
                                if (localStorage["ArmyUnitTooltipDisabled"] == "yes") {
                                    qx.core.Init.getApplication().getArmyUnitTooltipOverlay().setVisibility_Original(false);
                                } else {
                                    qx.core.Init.getApplication().getArmyUnitTooltipOverlay().setVisibility_Original(k);
                                }
                            };
                        } catch (e) {
                            console.log("Error hideArmyUnitTooltips()");
                            console.log(e.toString());
                        }
                    }
                }
            });

            qx.Class.define("Simulator.StatWindow", {
                type: "singleton",
                extend: qx.ui.window.Window,
                construct: function () {
                    try {
                        this.base(arguments);

                        this.set({
                            layout: new qx.ui.layout.VBox().set({
                                spacing: 0
                            }),
                            caption: "Simulator Stats",
                            icon: "FactionUI/icons/icon_res_plinfo_command_points.png",
                            contentPadding: 5,
                            contentPaddingTop: 0,
                            allowMaximize: false,
                            showMaximize: false,
                            allowMinimize: false,
                            showMinimize: false,
                            resizable: true,
                            resizableTop: false,
                            resizableBottom: false
                        });
                        this.getChildControl("icon").set({ width : 18, height : 18, scale : true, alignY : "middle" });

                        if (typeof localStorage['statWindowPosLeft'] != 'undefined') {
                            var left = parseInt(localStorage['statWindowPosLeft'], 10);
                            var top = parseInt(localStorage['statWindowPosTop'], 10);
                            this.moveTo(left, top);
                        } else {
                            this.moveTo(124, 31);
                        }

                        if (typeof localStorage['simViews'] != 'undefined') {
                            this.simViews = parseInt(localStorage['simViews'], 10);
                        } else {
                            this.simViews = 3;
                        }

                        var qxApp = qx.core.Init.getApplication();
                        this.isSimStatButtonDisabled = false;

                        /**
                         *   Setup Images
                         */

                        var img = {
                            Enemy: {
                                All: "FactionUI/icons/icon_arsnl_show_all.png",
                                Base: "FactionUI/icons/icon_arsnl_base_buildings.png",
                                Defense: "FactionUI/icons/icon_def_army_points.png"
                            },
                            Defense: {
                                Infantry: "FactionUI/icons/icon_arsnl_def_squad.png",
                                Vehicle: "FactionUI/icons/icon_arsnl_def_vehicle.png",
                                Building: "FactionUI/icons/icon_arsnl_def_building.png"
                            },
                            Offense: {
                                Infantry: "FactionUI/icons/icon_arsnl_off_squad.png",
                                Vehicle: "FactionUI/icons/icon_arsnl_off_vehicle.png",
                                Aircraft: "FactionUI/icons/icon_arsnl_off_plane.png"
                            },
                            Repair: {
                                Storage: "webfrontend/ui/icons/icn_repair_points.png",
                                Overall: "webfrontend/ui/icons/icn_repair_off_points.png",
                                Infantry: "webfrontend/ui/icons/icon_res_repair_inf.png",
                                Vehicle: "webfrontend/ui/icons/icon_res_repair_tnk.png",
                                Aircraft: "webfrontend/ui/icons/icon_res_repair_air.png"
                            },
                            Loot: {
                                Tiberium: "webfrontend/ui/common/icn_res_tiberium.png",
                                Crystal: "webfrontend/ui/common/icn_res_chrystal.png",
                                Credits: "webfrontend/ui/common/icn_res_dollar.png",
                                RP: "webfrontend/ui/common/icn_res_research_mission.png",
                                Total: "FactionUI/icons/icon_transfer_resource.png"
                            }
                        };

                        /**
                         *   Setup Stats Window
                         */

                        //Battle Section//
                        this.Battle = new qx.ui.container.Composite(new qx.ui.layout.HBox(-3)).set({decorator: "pane-light-plain", allowGrowX: true, marginLeft: 0, marginRight: 0});
                        var BattleLables = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({width: 29, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0});

                        var BattleOutcome = new qx.ui.basic.Label("O").set({toolTipText: "Outcome", alignX: "center", alignY: "middle"});
                        var BattleDuration = new qx.ui.basic.Label("D").set({toolTipText: "Duration", alignX: "center", alignY: "middle"});

                        BattleLables.add(BattleOutcome);
                        BattleLables.add(BattleDuration);
                        this.Battle.add(BattleLables);
                        this.add(this.Battle);

                        //Enemy Health Section//
                        var EnemyHealthHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({decorator: "pane-light-opaque"});
                        EnemyHealthHeader.add(new qx.ui.basic.Label(qxApp.tr("tnf:combat target")).set({alignX: "center", alignY: "middle", paddingBottom: 5, font: "font_size_13_bold"}));
                        this.add(EnemyHealthHeader);

                        this.EnemyHealth = new qx.ui.container.Composite(new qx.ui.layout.HBox(-3)).set({decorator: "pane-light-plain", allowGrowX: true, marginLeft: 0, marginRight: 0});
                        var EnemyHealthLabels = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({width: 29, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0});

                        var EnemyHealthLabelOverall = new qx.ui.basic.Atom(null, img.Enemy.All).set({toolTipText: qxApp.tr("tnf:total"), toolTipIcon: img.Enemy.All, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});
                        var EnemyHealthLabelBase = new qx.ui.basic.Atom(null, img.Enemy.Base).set({toolTipText: qxApp.tr("tnf:base"), toolTipIcon: img.Enemy.Base, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});
                        var EnemyHealthLabelDefense = new qx.ui.basic.Atom(null, img.Enemy.Defense).set({toolTipText: qxApp.tr("tnf:defense"), toolTipIcon: img.Enemy.Defense, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});
                        var EnemyHealthLabelCY = new qx.ui.basic.Label("CY").set({toolTipText: GAMEDATA.Tech[1].dn, alignX: "center", alignY: "middle"});
                        var EnemyHealthLabelDF = new qx.ui.basic.Label("DF").set({toolTipText: GAMEDATA.Tech[42].dn, alignX: "center", alignY: "middle"});
                        var EnemyHealthLabelCC = new qx.ui.basic.Label("CC").set({toolTipText: GAMEDATA.Tech[24].dn, alignX: "center", alignY: "middle"});

                        EnemyHealthLabelOverall.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        EnemyHealthLabelBase.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        EnemyHealthLabelDefense.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});

                        EnemyHealthLabels.add(EnemyHealthLabelOverall);
                        EnemyHealthLabels.add(EnemyHealthLabelBase);
                        EnemyHealthLabels.add(EnemyHealthLabelDefense);
                        EnemyHealthLabels.add(EnemyHealthLabelCY);
                        EnemyHealthLabels.add(EnemyHealthLabelDF);
                        EnemyHealthLabels.add(EnemyHealthLabelCC);
                        this.EnemyHealth.add(EnemyHealthLabels);
                        this.add(this.EnemyHealth);

                        //Repair Section//
                        var RepairHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({decorator: "pane-light-opaque"});
                        RepairHeader.add(new qx.ui.basic.Label(qxApp.tr("tnf:own repair cost")).set({alignX: "center", alignY: "middle", paddingBottom: 5, font: "font_size_13_bold"}));
                        this.add(RepairHeader);

                        this.Repair = new qx.ui.container.Composite(new qx.ui.layout.HBox(-3)).set({decorator: "pane-light-plain", allowGrowX: true, marginLeft: 0, marginRight: 0});
                        var RepairLabels = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({width: 29, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0});

                        var pRLabelStorage = new qx.ui.basic.Atom(null, img.Repair.Storage).set({toolTipText: qxApp.tr("tnf:offense repair time"), toolTipIcon: img.Repair.Storage, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});
                        var pRLabelOverall = new qx.ui.basic.Atom(null, img.Repair.Overall).set({toolTipText: qxApp.tr("tnf:repair points"), toolTipIcon: img.Repair.Overall, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});
                        var pRLabelInf = new qx.ui.basic.Atom(null, img.Repair.Infantry).set({toolTipText: qxApp.tr("tnf:infantry repair title"), toolTipIcon: img.Repair.Infantry, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});
                        var pRLabelVehi = new qx.ui.basic.Atom(null, img.Repair.Vehicle).set({toolTipText: qxApp.tr("tnf:vehicle repair title"), toolTipIcon: img.Repair.Vehicle, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});
                        var pRLabelAir = new qx.ui.basic.Atom(null, img.Repair.Aircraft).set({toolTipText: qxApp.tr("tnf:aircraft repair title"), toolTipIcon: img.Repair.Aircraft, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});

                        pRLabelStorage.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        pRLabelOverall.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        pRLabelInf.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        pRLabelVehi.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        pRLabelAir.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});

                        RepairLabels.add(pRLabelStorage);
                        RepairLabels.add(pRLabelOverall);
                        RepairLabels.add(pRLabelInf);
                        RepairLabels.add(pRLabelVehi);
                        RepairLabels.add(pRLabelAir);
                        this.Repair.add(RepairLabels);
                        this.add(this.Repair);

                        //Loot Section//
                        var LootHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({decorator: "pane-light-opaque"});
                        LootHeader.add(new qx.ui.basic.Label(qxApp.tr("tnf:lootable resources:")).set({alignX: "center", alignY: "middle", paddingBottom: 5, font: "font_size_13_bold"}));
                        this.add(LootHeader);

                        this.Loot = new qx.ui.container.Composite(new qx.ui.layout.HBox(-3)).set({decorator: "pane-light-plain", allowGrowX: true, marginLeft: 0, marginRight: 0});
                        var LootLabels = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({width: 29, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0});

                        var LootLabelTib = new qx.ui.basic.Atom(null, img.Loot.Tiberium).set({toolTipText: qxApp.tr("tnf:tiberium"), toolTipIcon: img.Loot.Tiberium, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});
                        var LootLabelCry = new qx.ui.basic.Atom(null, img.Loot.Crystal).set({toolTipText: qxApp.tr("tnf:crystals"), toolTipIcon: img.Loot.Crystal, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});
                        var LootLabelCred = new qx.ui.basic.Atom(null, img.Loot.Credits).set({toolTipText: qxApp.tr("tnf:credits"), toolTipIcon: img.Loot.Credits, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});
                        var LootLabelRP = new qx.ui.basic.Atom(null, img.Loot.RP).set({toolTipText: qxApp.tr("tnf:research points"), toolTipIcon: img.Loot.RP, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});
                        var LootLabelTotal = new qx.ui.basic.Atom(null, img.Loot.Total).set({toolTipText: qxApp.tr("tnf:total") + " " + qxApp.tr("tnf:loot"), toolTipIcon: img.Loot.Total, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});

                        LootLabelTib.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        LootLabelCry.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        LootLabelCred.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        LootLabelRP.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        LootLabelTotal.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});

                        LootLabels.add(LootLabelTib);
                        LootLabels.add(LootLabelCry);
                        LootLabels.add(LootLabelCred);
                        LootLabels.add(LootLabelRP);
                        LootLabels.add(LootLabelTotal);
                        this.Loot.add(LootLabels);
                        this.add(this.Loot);

                        //Simulate Button//
                        var simButton = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({decorator: "pane-light-opaque", allowGrowX: true, marginLeft: 0, marginRight: 0, padding: 5});
                        this.add(simButton);

                        this.simStatBtn = new qx.ui.form.Button(qxApp.tr("tnf:update")).set({allowGrowX: false});
                        this.simStatBtn.setToolTipText("Updates Simulation Stats");
                        this.simStatBtn.addListener("click", this.simulateStats, this);

                        this.simReplayBtn = new qx.ui.form.Button(qxApp.tr("tnf:show combat")).set({allowGrowX: false});
                        this.simReplayBtn.setToolTipText(qxApp.tr("tnf:show battle replay"));
                        this.simReplayBtn.addListener("click", this.doSimReplay, this);

                        this.simReplayBtn.setEnabled(false);

                        simButton.add(this.simStatBtn, {width: "50%"});
                        simButton.add(this.simReplayBtn, {width: "50%"});

                        //Add Header Events//
                        EnemyHealthHeader.addListener("click", function () {
                            if (this.EnemyHealth.isVisible()) this.EnemyHealth.exclude();
                            else this.EnemyHealth.show();
                        }, this);

                        RepairHeader.addListener("click", function () {
                            if (this.Repair.isVisible()) this.Repair.exclude();
                            else this.Repair.show();
                        }, this);

                        LootHeader.addListener("click", function () {
                            if (this.Loot.isVisible()) this.Loot.exclude();
                            else this.Loot.show();
                        }, this);

                        if (typeof localStorage['hideHealth'] != 'undefined') {
                            if (localStorage['hideHealth'] == "yes") this.EnemyHealth.exclude();
                        }

                        if (typeof localStorage['hideRepair'] != 'undefined') {
                            if (localStorage['hideRepair'] == "yes") this.Repair.exclude();
                        }

                        if (typeof localStorage['hideLoot'] != 'undefined') {
                            if (localStorage['hideLoot'] == "yes") this.Loot.exclude();
                        }

                        /**
                         *   Setup Simulation Storage
                         */

                        for (var i = 0; i < this.simViews; i++) {
                            this.sim[i] = new this.Simulation(i);
                            this.sim[i].Select(this.simSelected);
                            this.Battle.add(this.sim[i].Label.Battle.container, { flex : 1 });
                            this.EnemyHealth.add(this.sim[i].Label.EnemyHealth.container, { flex : 1 });
                            this.Repair.add(this.sim[i].Label.Repair.container, { flex : 1 });
                            this.Loot.add(this.sim[i].Label.Loot.container, { flex : 1 });
                        }


                        Simulator.getInstance().attachNetEvent(ClientLib.API.Battleground.GetInstance(), "OnSimulateBattleFinished", ClientLib.API.OnSimulateBattleFinished, this, this.__OnSimulateBattleFinished);
                    } catch (e) {
                        console.log("Error setting up Simulator.StatWindow Constructor: ");
                        console.log(e.toString());
                    }
                },

                destruct: function () {},

                members: {
                    Battle: null,
                    EnemyHealth: null,
                    Repair: null,
                    Loot: null,
                    simStatBtn: null,
                    simReplayBtn: null,
                    isSimStatButtonDisabled: null,
                    simSelected: 0,
                    simViews: 3,
                    sim: [],
                    Simulation: function (instance) {
                        var instance = instance;
                        var TargetCity = null;
                        var OwnCity = null;
                        var Formation = [];
                        var Result = null;
                        this.Label = {
                            Battle: {
                                container: new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({width: 65, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0, decorator: "pane-light-opaque"}),
                                Outcome:   new qx.ui.basic.Atom("-", null).set({alignX: "center", alignY: "middle", gap: 0, iconPosition: "top", show: "label"}),
                                Duration:  new qx.ui.basic.Label("-:--").set({alignX: "center", alignY: "middle"}),
                            },
                            EnemyHealth: {
                                container: new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({width: 65, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0, decorator: "pane-light-opaque"}),
                                Overall:   new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}),
                                Base:      new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}),
                                Defense:   new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}),
                                CY:        new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}),
                                DF:        new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}),
                                CC:        new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"})
                            },
                            Repair: {
                                container: new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({width: 65, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0, decorator: "pane-light-opaque"}),
                                Storage:   new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}),
                                Overall:   new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}),
                                Inf:       new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}),
                                Vehi:      new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}),
                                Air:       new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"})
                            },
                            Loot: {
                                container: new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({width: 65, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0, decorator: "pane-light-opaque"}),
                                Tib:       new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}),
                                Cry:       new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}),
                                Cred:      new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}),
                                RP:        new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}),
                                Overall:   new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"})
                            }
                        };

                        this.Reset = function () {
                            this.Label.Battle.Outcome.resetIcon();
                            this.Label.Battle.Outcome.resetToolTipIcon();
                            this.Label.Battle.Outcome.resetToolTipText();
                            this.Label.Battle.Outcome.setShow("label");
                            this.Label.Battle.Outcome.setLabel("-");
                            this.Label.Battle.Duration.setValue("-:--");
                            this.Label.EnemyHealth.Overall.setValue("-");
                            this.Label.EnemyHealth.Overall.resetToolTipText();
                            this.Label.EnemyHealth.Overall.resetTextColor();
                            this.Label.EnemyHealth.Base.setValue("-");
                            this.Label.EnemyHealth.Base.resetToolTipText();
                            this.Label.EnemyHealth.Base.resetTextColor();
                            this.Label.EnemyHealth.Defense.setValue("-");
                            this.Label.EnemyHealth.Defense.resetToolTipText();
                            this.Label.EnemyHealth.Defense.resetTextColor();
                            this.Label.EnemyHealth.CY.setValue("-");
                            this.Label.EnemyHealth.CY.resetToolTipText();
                            this.Label.EnemyHealth.CY.resetTextColor();
                            this.Label.EnemyHealth.DF.setValue("-");
                            this.Label.EnemyHealth.DF.resetToolTipText();
                            this.Label.EnemyHealth.DF.resetTextColor();
                            this.Label.EnemyHealth.CC.setValue("-");
                            this.Label.EnemyHealth.CC.resetToolTipText();
                            this.Label.EnemyHealth.CC.resetTextColor();
                            this.Label.Repair.Storage.setValue("-");
                            this.Label.Repair.Storage.resetToolTipText();
                            this.Label.Repair.Storage.resetTextColor();
                            this.Label.Repair.Overall.setValue("-");
                            this.Label.Repair.Overall.resetToolTipText();
                            this.Label.Repair.Overall.resetTextColor();
                            this.Label.Repair.Inf.setValue("-");
                            this.Label.Repair.Inf.resetToolTipText();
                            this.Label.Repair.Inf.resetTextColor();
                            this.Label.Repair.Vehi.setValue("-");
                            this.Label.Repair.Vehi.resetToolTipText();
                            this.Label.Repair.Vehi.resetTextColor();
                            this.Label.Repair.Air.setValue("-");
                            this.Label.Repair.Air.resetToolTipText();
                            this.Label.Repair.Air.resetTextColor();
                            this.Label.Loot.Tib.setValue("-");
                            this.Label.Loot.Tib.resetToolTipText();
                            this.Label.Loot.Tib.resetTextColor();
                            this.Label.Loot.Cry.setValue("-");
                            this.Label.Loot.Cry.resetToolTipText();
                            this.Label.Loot.Cry.resetTextColor();
                            this.Label.Loot.Cred.setValue("-");
                            this.Label.Loot.Cred.resetToolTipText();
                            this.Label.Loot.Cred.resetTextColor();
                            this.Label.Loot.RP.setValue("-");
                            this.Label.Loot.RP.resetToolTipText();
                            this.Label.Loot.RP.resetTextColor();
                            this.Label.Loot.Overall.setValue("-");
                            this.Label.Loot.Overall.resetToolTipText();
                            this.Label.Loot.Overall.resetTextColor();
                        };

                        this.Select = function (selected) {
                            if (selected == instance) {
                                var j = "pane-light-opaque";
                                var k = 1;
                            } else {
                                var j = "pane-light-plain";
                                var k = 0.6;
                            }
                            this.Label.Battle.container.set({ decorator: j, opacity: k });
                            this.Label.EnemyHealth.container.set({ decorator: j, opacity: k });
                            this.Label.Repair.container.set({ decorator: j, opacity: k });
                            this.Label.Loot.container.set({ decorator: j, opacity: k });
                        };

                        this.saveFormation = function () {
                            try {
                                Formation = [];
                                var unitList = Simulator.getInstance().getCityPreArmyUnits().get_ArmyUnits().l;

                                for (var i = 0; i < unitList.length; i++) {
                                    var unit = unitList[i];
                                    var unitInfo = {};
                                    unitInfo.x = unit.get_CoordX();
                                    unitInfo.y = unit.get_CoordY();
                                    unitInfo.id = unit.get_Id();
                                    unitInfo.enabled = unit.get_Enabled();

                                    Formation.push(unitInfo);
                                }
                            } catch (e) {
                                console.log("Error Saving Stat Formation");
                                console.log(e.toString());
                            }
                        };

                        this.loadFormation = function () {
                            try {
                                Simulator.getInstance().restoreFormation(Formation);
                            } catch (e) {
                                console.log("Error loading Stat Formation");
                                console.log(e.toString());
                            }
                        };

                        // Setup icons
                        this.Label.Battle.Outcome.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});

                        // Setup containers
                        this.Label.Battle.container.add(this.Label.Battle.Outcome);
                        this.Label.Battle.container.add(this.Label.Battle.Duration);
                        this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.Overall);
                        this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.Base);
                        this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.Defense);
                        this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.CY);
                        this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.DF);
                        this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.CC);
                        this.Label.Repair.container.add(this.Label.Repair.Storage);
                        this.Label.Repair.container.add(this.Label.Repair.Overall);
                        this.Label.Repair.container.add(this.Label.Repair.Inf);
                        this.Label.Repair.container.add(this.Label.Repair.Vehi);
                        this.Label.Repair.container.add(this.Label.Repair.Air);
                        this.Label.Loot.container.add(this.Label.Loot.Tib);
                        this.Label.Loot.container.add(this.Label.Loot.Cry);
                        this.Label.Loot.container.add(this.Label.Loot.Cred);
                        this.Label.Loot.container.add(this.Label.Loot.RP);
                        this.Label.Loot.container.add(this.Label.Loot.Overall);

                        // Setup Events
                        this.Label.Battle.container.addListener("click", function () { Simulator.StatWindow.getInstance().simSelected = instance; for (var i = 0; i < Simulator.StatWindow.getInstance().sim.length; i++) { Simulator.StatWindow.getInstance().sim[i].Select(instance); } }, this);
                        this.Label.EnemyHealth.container.addListener("click", function () { Simulator.StatWindow.getInstance().simSelected = instance; for (var i = 0; i < Simulator.StatWindow.getInstance().sim.length; i++) { Simulator.StatWindow.getInstance().sim[i].Select(instance); } }, this);
                        this.Label.Repair.container.addListener("click", function () { Simulator.StatWindow.getInstance().simSelected = instance; for (var i = 0; i < Simulator.StatWindow.getInstance().sim.length; i++) { Simulator.StatWindow.getInstance().sim[i].Select(instance); } }, this);
                        this.Label.Loot.container.addListener("click", function () { Simulator.StatWindow.getInstance().simSelected = instance; for (var i = 0; i < Simulator.StatWindow.getInstance().sim.length; i++) { Simulator.StatWindow.getInstance().sim[i].Select(instance); } }, this);
                        this.Label.Battle.container.addListener("dblclick", function () { this.loadFormation(); }, this);
                        this.Label.EnemyHealth.container.addListener("dblclick", function () { this.loadFormation(); }, this);
                        this.Label.Repair.container.addListener("dblclick", function () { this.loadFormation(); }, this);
                        this.Label.Loot.container.addListener("dblclick", function () { this.loadFormation(); }, this);
                    },
                    simulateStats: function () {
                        console.log("Simulating Stats");
                        var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
                        if (city != null) {
                            Simulator.getInstance().isSimulation = true;
                            Simulator.getInstance().saveTempFormation();
                            localStorage['ta_sim_last_city'] = city.get_Id();
                            var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                            ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
                            ClientLib.API.Battleground.GetInstance().SimulateBattle();

                            //Disable Simulate Button
                            if (this.isSimStatButtonDisabled == false) {
                                this.simStatBtn.setEnabled(false);
                                var simStatTimer = 10000;
                                var simStatTimeout = this.disableSimulateStatButtonTimer(simStatTimer);

                                Simulator.getInstance().simBtn.setEnabled(false);
                                var simTimer = 10000;
                                Simulator.getInstance().disableSimulateButtonTimer(simTimer);
                            }

                        }
                    },
                    doSimReplay: function () {
                        try {
                            Simulator.getInstance().isSimulation = true;
                            var app = qx.core.Init.getApplication();
                            app.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatReplay, localStorage['ta_sim_last_city'], 0, 0);

                            if (typeof localStorage['autoSimulate'] != 'undefined') {
                                if (localStorage['autoSimulate'] == "yes") {
                                    var speed = localStorage['simulateSpeed'];
                                    setTimeout(function () {
                                        var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
                                        battleground.RestartReplay();
                                        battleground.set_ReplaySpeed(parseInt(speed, 10));
                                    }, 1000)
                                }
                            }
                        } catch (e) {
                            console.log("Error attempting to show Simulation Replay");
                            console.log(e.toString());
                        }
                    },
                    formatBattleDurationTime: function (time) {
                        var seconds = time / 1000;
                        var minutes = seconds / 60;
                        minutes = Math.round(minutes - 0.5);
                        seconds = Math.round((seconds - 0.5) - (minutes * 60));

                        if (seconds < 10) {
                            seconds = "0" + seconds;
                        }
                        return minutes + ":" + seconds;
                    },
                    calculateRepairCosts: function (id, level, sHealth, eHealth, mHealth) {
                        repairCosts = {
                            "RT": 0,
                            "C": 0
                        };
                        var dmgRatio = 1;
                        if (sHealth != eHealth) {
                            dmgRatio = (sHealth - eHealth) / mHealth;
                            var costs = ClientLib.API.Util.GetUnitRepairCosts(level, id, dmgRatio);

                            for (var idx = 0; idx < costs.length; idx++) {
                                var uCosts = costs[idx];
                                var cType = parseInt(uCosts.Type);
                                switch (cType) {
                                case ClientLib.Base.EResourceType.Crystal:
                                    repairCosts["C"] += uCosts.Count;
                                    break;
                                case ClientLib.Base.EResourceType.RepairChargeBase:
                                case ClientLib.Base.EResourceType.RepairChargeInf:
                                case ClientLib.Base.EResourceType.RepairChargeVeh:
                                case ClientLib.Base.EResourceType.RepairChargeAir:
                                    repairCosts["RT"] += uCosts.Count;
                                    break;
                                }
                            }
                        }
                        return repairCosts;
                    },
                    __OnSimulateBattleFinished: function (data) {
                        this.getSimulationInfo(data, this.sim[this.simSelected]);

                        if (this.simReplayBtn.getEnabled() == false) this.simReplayBtn.setEnabled(true);

                        setTimeout(function () {
                            var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
                            var battleDuration = battleground.get_BattleDuration();
                            battleDuration = Simulator.StatWindow.getInstance().formatBattleDurationTime(battleDuration);
                            Simulator.StatWindow.getInstance().sim[Simulator.StatWindow.getInstance().simSelected].Label.Battle.Duration.setValue(battleDuration);
                        }, 1);
                    },
                    getSimulationInfo: function (data, sim) {
                        DebugData = data;
                        console.log("Getting Player Unit Damage");
                        try {
                            var unitResult = function () {
                                this.StartHealth = 0;
                                this.EndHealth = 0;
                                this.MaxHealth = 0;
                                this.Cry = 0;
                                this.RT = 0;
                                this.getHP = function () {
                                    if (this.MaxHealth == 0 && this.EndHealth == 0 && this.StartHealth == 0)
                                        return (0).toFixed(2);
                                    else if (this.MaxHealth == 0)
                                        return (100).toFixed(2);
                                    else
                                        return ((this.EndHealth / this.MaxHealth) * 100).toFixed(2);
                                };
                                this.getCry = function () {
                                    return Simulator.getInstance().formatNumbersCompact(this.Cry);
                                };
                                this.getRT = function () {
                                    return phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(this.RT));
                                };
                            };
                            var all = new unitResult(),
                            base = new unitResult(),
                            def = new unitResult(),
                            off = new unitResult(),
                            cy = new unitResult(),
                            df = new unitResult(),
                            cc = new unitResult(),
                            inf = new unitResult(),
                            vehi = new unitResult(),
                            air = new unitResult();

                            var costs = {};
                            var entities = []; //for calculating loot
                            var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
                            var cityFaction = city.get_CityFaction(); // ClientLib.Base.EFactionType
                            for (var idx = 0; idx < data.length; idx++) {
                                var unitData = data[idx].Value;
                                var unitMDBID = unitData.t;
                                var unit = ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(unitMDBID);
                                var unitLevel = unitData.l;
                                var unitStartHealth = unitData.sh;
                                var unitEndHealth = unitData.h;
                                var unitMaxHealth = ClientLib.API.Util.GetUnitMaxHealthByLevel(unitLevel, unit, false);
                                var unitPlacementType = unit.pt; // ClientLib.Base.EPlacementType
                                var unitMovementType = unit.mt; // ClientLib.Base.EUnitMovementType
                                entities.push(unitData);

                                switch(cityFaction) {
                                case ClientLib.Base.EFactionType.GDIFaction:
                                case ClientLib.Base.EFactionType.NODFaction:
                                    switch (unitPlacementType) {
                                    case ClientLib.Base.EPlacementType.Defense:
                                    case ClientLib.Base.EPlacementType.Structure:
                                        var NerfAndBoostModifier = ClientLib.Base.Util.GetNerfAndBoostModifier(unitLevel, city.get_AllianceDefenseBonus());
                                        unitMaxHealth = Math.floor(16 * (unitMaxHealth * NerfAndBoostModifier / 100));
                                        break;
                                    default:
                                        unitMaxHealth = Math.floor(16 * unitMaxHealth);
                                    }
                                    break;
                                default:
                                    unitMaxHealth = Math.floor(16 * unitMaxHealth);
                                    break;
                                }

                                costs = this.calculateRepairCosts(unitMDBID, unitLevel, unitStartHealth, unitEndHealth, unitMaxHealth);
                                switch (unitPlacementType) {
                                case ClientLib.Base.EPlacementType.Defense:
                                    all.StartHealth += unitStartHealth;
                                    all.EndHealth += unitEndHealth;
                                    all.MaxHealth += unitMaxHealth;
                                    all.RT += costs["RT"];
                                    all.Cry += costs["C"];
                                    def.StartHealth += unitStartHealth;
                                    def.EndHealth += unitEndHealth;
                                    def.MaxHealth += unitMaxHealth;
                                    def.RT += costs["RT"];
                                    def.Cry += costs["C"];
                                    break;
                                case ClientLib.Base.EPlacementType.Offense:
                                    off.StartHealth += unitStartHealth;
                                    off.EndHealth += unitEndHealth;
                                    off.MaxHealth += unitMaxHealth;
                                    off.Cry += costs["C"];
                                    switch (unitMovementType) {
                                    case ClientLib.Base.EUnitMovementType.Feet:
                                        inf.StartHealth += unitStartHealth;
                                        inf.EndHealth += unitEndHealth;
                                        inf.MaxHealth += unitMaxHealth;
                                        inf.RT += costs["RT"];
                                        inf.Cry += costs["C"];
                                        break;
                                    case ClientLib.Base.EUnitMovementType.Wheel:
                                    case ClientLib.Base.EUnitMovementType.Track:
                                        vehi.StartHealth += unitStartHealth;
                                        vehi.EndHealth += unitEndHealth;
                                        vehi.MaxHealth += unitMaxHealth;
                                        vehi.RT += costs["RT"];
                                        vehi.Cry += costs["C"];
                                        break;
                                    case ClientLib.Base.EUnitMovementType.Air:
                                    case ClientLib.Base.EUnitMovementType.Air2:
                                        air.StartHealth += unitStartHealth;
                                        air.EndHealth += unitEndHealth;
                                        air.MaxHealth += unitMaxHealth;
                                        air.RT += costs["RT"];
                                        air.Cry += costs["C"];
                                        break;
                                    }
                                    break;
                                case ClientLib.Base.EPlacementType.Structure:
                                    all.StartHealth += unitStartHealth;
                                    all.EndHealth += unitEndHealth;
                                    all.MaxHealth += unitMaxHealth;
                                    all.RT += costs["RT"];
                                    all.Cry += costs["C"];
                                    base.StartHealth += unitStartHealth;
                                    base.EndHealth += unitEndHealth;
                                    base.MaxHealth += unitMaxHealth;
                                    base.RT += costs["RT"];
                                    base.Cry += costs["C"];
                                    switch (unitMDBID) {
                                    case 112: // GDI_Construction Yard
                                    case 151: // NOD_Construction Yard
                                    case 177: // FOR_Construction Yard
                                    case 233: // FOR_Fortress_BASE_Construction Yard
                                        cy.StartHealth = unitStartHealth;
                                        cy.EndHealth = unitEndHealth;
                                        cy.MaxHealth = unitMaxHealth;
                                        cy.RT += costs["RT"];
                                        cy.Cry += costs["C"];
                                        break;
                                    case 131: // GDI_Defense Facility
                                    case 158: // NOD_Defense Facility
                                    case 195: // FOR_Defense Facility
                                        df.StartHealth = unitStartHealth;
                                        df.EndHealth = unitEndHealth;
                                        df.MaxHealth = unitMaxHealth;
                                        df.RT += costs["RT"];
                                        df.Cry += costs["C"];
                                        break;
                                    case 111: // GDI_Command Center
                                    case 159: // NOD_Command Post
                                        cc.StartHealth = unitStartHealth;
                                        cc.EndHealth = unitEndHealth;
                                        cc.MaxHealth = unitMaxHealth;
                                        cc.RT += costs["RT"];
                                        cc.Cry += costs["C"];
                                        break;
                                    }
                                    break;
                                }
                            }

                            off.RT = Math.max(inf.RT, vehi.RT, air.RT);

                            var qxApp = qx.core.Init.getApplication();
                            //Set Battle Labels
                            sim.Label.Battle.Outcome.resetLabel();
                            sim.Label.Battle.Outcome.set({ show: "icon" });
                            if (off.getHP() == 0) {
                                sim.Label.Battle.Outcome.setToolTipText(qxApp.tr("tnf:total defeat"));
                                sim.Label.Battle.Outcome.setIcon("FactionUI/icons/icon_reports_total_defeat.png");
                            } else if (cy.EndHealth == 0) {
                                sim.Label.Battle.Outcome.setToolTipText(qxApp.tr("tnf:total victory"));
                                sim.Label.Battle.Outcome.setIcon("FactionUI/icons/icon_reports_total_victory.png");
                            } else {
                                sim.Label.Battle.Outcome.setToolTipText(qxApp.tr("tnf:victory"));
                                sim.Label.Battle.Outcome.setIcon("FactionUI/icons/icon_reports_victory.png");
                            }

                            //Set Enemy Health Labels
                            sim.Label.EnemyHealth.Overall.setValue(all.getHP() + '%');
                            this.setEHLabelColor(sim.Label.EnemyHealth.Overall, all.getHP());

                            sim.Label.EnemyHealth.Base.setValue(base.getHP() + '%');
                            sim.Label.EnemyHealth.Base.setToolTipText(qxApp.tr("tnf:repair points") + ": " + base.getRT());
                            this.setEHLabelColor(sim.Label.EnemyHealth.Base, base.getHP());

                            sim.Label.EnemyHealth.Defense.setValue(def.getHP() + '%');
                            this.setEHLabelColor(sim.Label.EnemyHealth.Defense, def.getHP());

                            sim.Label.EnemyHealth.CY.setValue(cy.getHP() + '%');
                            sim.Label.EnemyHealth.CY.setToolTipText(qxApp.tr("tnf:repair points") + ": " + cy.getRT());
                            this.setEHLabelColor(sim.Label.EnemyHealth.CY, cy.getHP());

                            sim.Label.EnemyHealth.DF.setValue(df.getHP() + '%');
                            sim.Label.EnemyHealth.DF.setToolTipText(qxApp.tr("tnf:repair points") + ": " + df.getRT());
                            this.setEHLabelColor(sim.Label.EnemyHealth.DF, df.getHP());

                            sim.Label.EnemyHealth.CC.setValue(cc.getHP() + '%');
                            sim.Label.EnemyHealth.CC.setToolTipText(qxApp.tr("tnf:repair points") + ": " + cc.getRT());
                            this.setEHLabelColor(sim.Label.EnemyHealth.CC, cc.getHP());

                            //Set Repair Labels
                            switch (localStorage['getRTSelection']) {
                            case "cry":
                                sim.Label.Repair.Overall.setValue(off.getCry());
                                sim.Label.Repair.Overall.setToolTipText(qxApp.tr("tnf:repair points") + ": " + off.getRT() + "</br>" + qxApp.tr("tnf:health") + ": " + off.getHP() + "%");
                                sim.Label.Repair.Inf.setValue(inf.getCry());
                                sim.Label.Repair.Inf.setToolTipText(qxApp.tr("tnf:repair points") + ": " + inf.getRT() + "</br>" + qxApp.tr("tnf:health") + ": " + inf.getHP() + "%");
                                sim.Label.Repair.Vehi.setValue(vehi.getCry());
                                sim.Label.Repair.Vehi.setToolTipText(qxApp.tr("tnf:repair points") + ": " + vehi.getRT() + "</br>" + qxApp.tr("tnf:health") + ": " + vehi.getHP() + "%");
                                sim.Label.Repair.Air.setValue(air.getCry());
                                sim.Label.Repair.Air.setToolTipText(qxApp.tr("tnf:repair points") + ": " + air.getRT() + "</br>" + qxApp.tr("tnf:health") + ": " + air.getHP() + "%");
                                break;
                            case "hp":
                                sim.Label.Repair.Overall.setValue(off.getHP() + " %");
                                sim.Label.Repair.Overall.setToolTipText(qxApp.tr("tnf:repair points") + ": " + off.getRT() + "</br>" + qxApp.tr("tnf:crystals") + ": " + off.getCry());
                                sim.Label.Repair.Inf.setValue(inf.getHP() + " %");
                                sim.Label.Repair.Inf.setToolTipText(qxApp.tr("tnf:repair points") + ": " + inf.getRT() + "</br>" + qxApp.tr("tnf:crystals") + ": " + inf.getCry());
                                sim.Label.Repair.Vehi.setValue(vehi.getHP() + " %");
                                sim.Label.Repair.Vehi.setToolTipText(qxApp.tr("tnf:repair points") + ": " + vehi.getRT() + "</br>" + qxApp.tr("tnf:crystals") + ": " + vehi.getCry());
                                sim.Label.Repair.Air.setValue(air.getHP() + " %");
                                sim.Label.Repair.Air.setToolTipText(qxApp.tr("tnf:repair points") + ": " + air.getRT() + "</br>" + qxApp.tr("tnf:crystals") + ": " + air.getCry());
                                break;
                            default:
                                sim.Label.Repair.Overall.setValue(off.getRT());
                                sim.Label.Repair.Overall.setToolTipText(qxApp.tr("tnf:crystals") + ": " + off.getCry() + "</br>" + qxApp.tr("tnf:health") + ": " + off.getHP() + "%");
                                sim.Label.Repair.Inf.setValue(inf.getRT());
                                sim.Label.Repair.Inf.setToolTipText(qxApp.tr("tnf:crystals") + ": " + inf.getCry() + "</br>" + qxApp.tr("tnf:health") + ": " + inf.getHP() + "%");
                                sim.Label.Repair.Vehi.setValue(vehi.getRT());
                                sim.Label.Repair.Vehi.setToolTipText(qxApp.tr("tnf:crystals") + ": " + vehi.getCry() + "</br>" + qxApp.tr("tnf:health") + ": " + vehi.getHP() + "%");
                                sim.Label.Repair.Air.setValue(air.getRT());
                                sim.Label.Repair.Air.setToolTipText(qxApp.tr("tnf:crystals") + ": " + air.getCry() + "</br>" + qxApp.tr("tnf:health") + ": " + air.getHP() + "%");
                            }

                            this.setRTLabelColor(sim.Label.Repair.Overall, off.getHP());
                            this.setRTLabelColor(sim.Label.Repair.Inf, inf.getHP());
                            this.setRTLabelColor(sim.Label.Repair.Vehi, vehi.getHP());
                            this.setRTLabelColor(sim.Label.Repair.Air, air.getHP());

                            if (inf.RT === off.RT && inf.getHP() < 100) sim.Label.Repair.Inf.setTextColor("black");
                            if (vehi.RT === off.RT && vehi.getHP() < 100) sim.Label.Repair.Vehi.setTextColor("black");
                            if (air.RT === off.RT && air.getHP() < 100) sim.Label.Repair.Air.setTextColor("black");

                            var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();

                            var currRTStorage = Math.max(ownCity.GetResourceCount(8), ownCity.GetResourceCount(9), ownCity.GetResourceCount(10));
                            sim.Label.Repair.Storage.setValue(phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(currRTStorage)));
                            sim.Label.Repair.Storage.setTextColor(currRTStorage > off.RT ? "darkgreen" : "red");

                            //Calculates the possible resources gained from simulation
                            this.calcResources(entities, sim);

                            sim.saveFormation();
                        } catch (e) {
                            console.log("Error Getting Player Unit Damage");
                            console.log(e.toString());
                        }
                    },
                    calcResources: function (entities, sim) {
                        try {
                            //So we can splice and reduce the amount of time looping later on
                            var buildingEnts = entities;
                            var defEnts = entities;

                            var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
                            var cityFaction = city.get_CityFaction(); // ClientLib.Base.EFactionType

                            //Pretty sure we just need the EResourceType
                            var lootArray = {
                                1: 0,
                                2: 0,
                                3: 0,
                                6: 0
                            }; //1: Tib, 2: Cry, 3: Gold(credits) 6: RP
                            var lootArray2 = {
                                1: 0,
                                2: 0,
                                3: 0,
                                6: 0
                            };
                            var mod = -1;
                            var isFirstHarvester = false;
                            //Based on forums we need to cycle through the grid
                            //Info needed is the building or structure information and the defensive units information
                            //Structure data can be retrieved by using get_City() and Defense data by get_DefenseSetup()
                            //See ClientLib.js.txt if you have it or can find it. These functions are under Type:ClientLib.Vis.VisMain

                            //Let's do X coords as our outer loop there should be 0-8 or 9 slots.
                            for (var x = 0; x < 9; x++) {

                                //Inner loop will be Y should be 8 slots or 0-7
                                for (var y = 0; y < 8; y++) {
                                    var width = ClientLib.Vis.VisMain.GetInstance().get_City().get_GridWidth();
                                    var height = ClientLib.Vis.VisMain.GetInstance().get_City().get_GridHeight();

                                    //Per the forums we should multiply x by the width and y by the height
                                    //Well GetObjectFromPosition doesn't work which is in the ClientLib.js.txt, but KRS_L has found the new function
                                    var cityEntity = ClientLib.Vis.VisMain.GetInstance().GetObjectFromPosition(x * width, y * height);

                                    //Ok we have the city object or at least we hope we do.
                                    //Forums says this can return empty fields so we need to check for that
                                    if (cityEntity !== null && typeof cityEntity.get_BuildingName == 'function') {
                                        try {
                                            //Now loop through the entities from the simulation until we find a match
                                            if (typeof entities != 'undefined') {
                                                for (var idx = 0; idx < buildingEnts.length; idx++) {
                                                    var entity = buildingEnts[idx];
                                                    var unit = ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(entity.t);

                                                    //We've got a match!
                                                    if (unit.dn == cityEntity.get_BuildingName()) {
                                                        var unitMaxHealth = ClientLib.API.Util.GetUnitMaxHealthByLevel(entity.l, unit, false);

                                                        switch(cityFaction) {
                                                        case ClientLib.Base.EFactionType.GDIFaction:
                                                        case ClientLib.Base.EFactionType.NODFaction:
                                                            switch (unit.pt) {
                                                            case ClientLib.Base.EPlacementType.Defense:
                                                            case ClientLib.Base.EPlacementType.Structure:
                                                                var NerfAndBoostModifier = ClientLib.Base.Util.GetNerfAndBoostModifier(entity.l, city.get_AllianceDefenseBonus());
                                                                unitMaxHealth = Math.floor(16 * (unitMaxHealth * NerfAndBoostModifier / 100));
                                                                break;
                                                            default:
                                                                unitMaxHealth = Math.floor(16 * unitMaxHealth);
                                                            }
                                                            break;
                                                        default:
                                                            unitMaxHealth = Math.floor(16 * unitMaxHealth);
                                                            break;
                                                        }

                                                        var mod = (entity.sh - entity.h) / unitMaxHealth;
                                                        if (unit.dn == "Harvester") {
                                                            var mod2 = cityEntity.get_BuildingDetails().get_HitpointsPercent();
                                                            if (Math.round(mod2 * 100) != Math.round(mod * 100)) {
                                                                mod = mod2;
                                                            }
                                                        }
                                                        var isSpliced = buildingEnts.splice(idx, 1);
                                                        break;
                                                    }
                                                }
                                            }
                                        } catch (e) {

                                            console.log("Error Calculating Resources 2");
                                            console.log(e);
                                            console.log(e.name + " " + e.message);
                                        }
                                        try {
                                            var buildingDetails = cityEntity.get_BuildingDetails();

                                            if (mod == -1) {
                                                mod = buildingDetails.get_HitpointsPercent();
                                                if (cityEntity.get_BuildingName() == "Harvester") {
                                                    var mod2 = cityEntity.get_BuildingDetails().get_HitpointsPercent();
                                                    if (Math.round(mod2 * 100) != Math.round(mod * 100)) {
                                                        mod = mod2;
                                                    }
                                                }
                                            }
                                        } catch (e) {
                                            console.log("Error Calculating Resources 3");
                                            console.log(e);
                                            console.log(e.name + " " + e.message);
                                        }

                                        var reqs = buildingDetails.get_UnitLevelRepairRequirements();

                                        for (var idx2 = 0; idx2 < reqs.length; idx2++) {
                                            var type = reqs[idx2].Type;
                                            var count = reqs[idx2].Count;
                                            lootArray[type] += Math.round((mod * count) - 0.5); //Rounding otherwise floating numbers
                                        }

                                        //reset mod
                                        mod = -1;
                                    }
                                }
                            }

                            for (var x = 0; x < 9; x++) {

                                //Inner loop will be Y should be 8 slots or 0-7
                                for (var y = 8; y < 16; y++) {
                                    try {
                                        var width = ClientLib.Vis.VisMain.GetInstance().get_DefenseSetup().get_GridWidth();
                                        var height = ClientLib.Vis.VisMain.GetInstance().get_DefenseSetup().get_GridHeight();
                                        if (y == 8) {
                                            width += 1;
                                            height += 1;
                                        }
                                        //Now do the same for defense units
                                        var defEntity = ClientLib.Vis.VisMain.GetInstance().GetObjectFromPosition(x * width, y * height);
                                        if (defEntity !== null && defEntity.get_VisObjectType() != ClientLib.Vis.VisObject.EObjectType.CityBuildingType && typeof defEntity.get_UnitDetails == 'function') {
                                            if (typeof entities != 'undefined') {
                                                for (var idx = 0; idx < defEnts.length; idx++) {
                                                    var entity = defEnts[idx];
                                                    var unit = ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(entity.t);

                                                    //Got a match!
                                                    if (unit.dn == defEntity.get_UnitName()) {
                                                        var unitMaxHealth = ClientLib.API.Util.GetUnitMaxHealthByLevel(entity.l, unit, false);

                                                        switch(cityFaction) {
                                                        case ClientLib.Base.EFactionType.GDIFaction:
                                                        case ClientLib.Base.EFactionType.NODFaction:
                                                            switch (unit.pt) {
                                                            case ClientLib.Base.EPlacementType.Defense:
                                                            case ClientLib.Base.EPlacementType.Structure:
                                                                var NerfAndBoostModifier = ClientLib.Base.Util.GetNerfAndBoostModifier(entity.l, city.get_AllianceDefenseBonus());
                                                                unitMaxHealth = Math.floor(16 * (unitMaxHealth * NerfAndBoostModifier / 100));
                                                                break;
                                                            default:
                                                                unitMaxHealth = Math.floor(16 * unitMaxHealth);
                                                            }
                                                            break;
                                                        default:
                                                            unitMaxHealth = Math.floor(16 * unitMaxHealth);
                                                            break;
                                                        }

                                                        mod = (entity.sh - entity.h) / unitMaxHealth;
                                                        //mod = defEntity.get_UnitDetails().get_HitpointsPercent();
                                                        var isSpliced = defEnts.splice(idx, 1);
                                                        break;
                                                    }
                                                }
                                            }

                                            var unitDetails = defEntity.get_UnitDetails();

                                            if (mod == -1)
                                                mod = unitDetails.get_HitpointsPercent();

                                            var reqs = unitDetails.get_UnitLevelRepairRequirements();

                                            for (var idx2 = 0; idx2 < reqs.length; idx2++) {
                                                var type = reqs[idx2].Type;
                                                var count = reqs[idx2].Count;
                                                lootArray[type] += Math.round((mod * count) - 0.5); //Rounding otherwise floating numbers
                                            }

                                            mod = -1;
                                        }
                                    } catch (e) {
                                        console.log("Error Calculating Resources 4");
                                        console.log(e);
                                        console.log(e.name + " " + e.message);
                                    }
                                }
                            }

                            var qxApp = qx.core.Init.getApplication();
                            var totalLoot = lootArray[1] + lootArray[2] + lootArray[3] + lootArray[6];
                            if (typeof entities == 'undefined') {
                                for (i = 0; i < this.sim.length; i++) {
                                    this.sim[i].Reset();
                                    this.sim[i].Label.Loot.Overall.setValue(Simulator.getInstance().formatNumbersCompact(totalLoot));
                                    this.sim[i].Label.Loot.Overall.resetToolTipText();
                                    this.sim[i].Label.Loot.Tib.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[1]));
                                    this.sim[i].Label.Loot.Tib.resetToolTipText();
                                    this.sim[i].Label.Loot.Cry.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[2]));
                                    this.sim[i].Label.Loot.Cry.resetToolTipText();
                                    this.sim[i].Label.Loot.Cred.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[3]));
                                    this.sim[i].Label.Loot.Cred.resetToolTipText();
                                    this.sim[i].Label.Loot.RP.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[6]));
                                    this.sim[i].Label.Loot.RP.resetToolTipText();
                                }
                            } else {
                                sim.Label.Loot.Overall.setToolTipText(qxApp.tr("tnf:base") + ": " + sim.Label.Loot.Overall.getValue());
                                sim.Label.Loot.Overall.setValue(Simulator.getInstance().formatNumbersCompact(totalLoot));
                                sim.Label.Loot.Tib.setToolTipText(qxApp.tr("tnf:base") + ": " + sim.Label.Loot.Tib.getValue());
                                sim.Label.Loot.Tib.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[1]));
                                sim.Label.Loot.Cry.setToolTipText(qxApp.tr("tnf:base") + ": " + sim.Label.Loot.Cry.getValue());
                                sim.Label.Loot.Cry.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[2]));
                                sim.Label.Loot.Cred.setToolTipText(qxApp.tr("tnf:base") + ": " + sim.Label.Loot.Cred.getValue());
                                sim.Label.Loot.Cred.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[3]));
                                sim.Label.Loot.RP.setToolTipText(qxApp.tr("tnf:base") + ": " + sim.Label.Loot.RP.getValue());
                                sim.Label.Loot.RP.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[6]));
                            }
                        } catch (e) {
                            console.log("Error Calculating Resources");
                            console.log(e);
                            console.log(e.name + " " + e.message);
                        }

                    },
                    setRTLabelColor: function (label, number) {
                        if (number < 25)
                            label.setTextColor("red");
                        else if (number < 75)
                            label.setTextColor("orangered");
                        else
                            label.setTextColor("darkgreen");
                    },
                    setEHLabelColor: function (label, number) {
                        if (number < 25)
                            label.setTextColor("darkgreen");
                        else if (number < 75)
                            label.setTextColor("orangered");
                        else
                            label.setTextColor("red");
                    },
                    disableSimulateStatButtonTimer: function (timer) {
                        try {
                            if (timer >= 1000) {
                                this.isSimStatButtonDisabled = true;
                                this.simStatBtn.setLabel(Math.floor(timer / 1000));
                                timer -= 1000;
                                setTimeout(function () {
                                    Simulator.StatWindow.getInstance().disableSimulateStatButtonTimer(timer);
                                }, 1000)
                            } else {
                                setTimeout(function () {
                                    Simulator.StatWindow.getInstance().simStatBtn.setEnabled(true);
                                    Simulator.StatWindow.getInstance().simStatBtn.setLabel("Update");
                                }, timer)
                                this.isSimStatButtonDisabled = false;
                            }
                        } catch (e) {
                            console.log("Error disabling simulator button");
                            console.log(e.toString());
                        }
                    }
                }
            });

            qx.Class.define("Simulator.OptionWindow", {
                type: "singleton",
                extend: qx.ui.window.Window,

                construct: function () {
                    this.base(arguments);
                    this.setLayout(new qx.ui.layout.VBox(5));
                    this.addListener("resize", function () {
                        this.center();
                    }, this);

                    this.set({
                        caption: "Simulator Options",
                        width: 300,
                        height: 400,
                        allowMaximize: false,
                        showMaximize: false,
                        allowMinimize: false,
                        showMinimize: false
                    });
                    var tabView = new qx.ui.tabview.TabView();
                    tabView.set({
                        height: 395,
                        width: 295
                    });
                    var genPage = new qx.ui.tabview.Page("General");
                    genLayout = new qx.ui.layout.VBox(5);
                    genPage.setLayout(genLayout);

                    //Add General Page Items
                    var buttonsHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
                    buttonsHeader.setThemedFont("bold");
                    var buttonsTitle = new qx.ui.basic.Label("Buttons:");
                    buttonsHeader.add(buttonsTitle);
                    genPage.add(buttonsHeader);

                    var buttonsBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
                    this._buttonLocCB = new qx.ui.form.CheckBox("Right Side");
                    this._buttonSizeCB = new qx.ui.form.CheckBox("Normal Size");
                    this._buttonLocCB.addListener("changeValue", this._onButtonLocChange, this);
                    this._buttonSizeCB.addListener("changeValue", this._onButtonSizeChange, this);
                    if (typeof localStorage['isBtnRight'] != 'undefined') {
                        if (localStorage['isBtnRight'] == "yes")
                            this._buttonLocCB.setValue(true);
                        else
                            this._buttonLocCB.setValue(false);
                    }

                    if (typeof localStorage['isBtnNorm'] != 'undefined') {
                        if (localStorage['isBtnNorm'] == "yes")
                            this._buttonSizeCB.setValue(true);
                        else
                            this._buttonSizeCB.setValue(false);

                        //Need to do this
                        this.setButtonSize();
                    }

                    this._disableRTBtnCB = new qx.ui.form.CheckBox("Disable Repair Button");
                    this._disableRTBtnCB.addListener("changeValue", this._onDisableRTBtnChange, this);
                    if (typeof localStorage['isRTBtnDisabled'] != 'undefined') {
                        if (localStorage['isRTBtnDisabled'] == "yes")
                            this._disableRTBtnCB.setValue(true);
                        else
                            this._disableRTBtnCB.setValue(false);
                    }

                    this._disableCmtBtnCB = new qx.ui.form.CheckBox("Disable Combat Button");
                    this._disableCmtBtnCB.addListener("changeValue", this._onDisableCmtBtnChange, this);
                    if (typeof localStorage['isCmtBtnDisabled'] != 'undefined') {
                        if (localStorage['isCmtBtnDisabled'] == "yes")
                            this._disableCmtBtnCB.setValue(true);
                        else
                            this._disableCmtBtnCB.setValue(false);
                    }

                    buttonsBox.add(this._buttonSizeCB);
                    buttonsBox.add(this._buttonLocCB);
                    buttonsBox.add(this._disableRTBtnCB);
                    buttonsBox.add(this._disableCmtBtnCB);
                    genPage.add(buttonsBox);

                    var simulatorHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({
                        marginTop: 10
                    });
                    simulatorHeader.setThemedFont("bold");
                    var simulatorTitle = new qx.ui.basic.Label("Simulator:");
                    simulatorHeader.add(simulatorTitle);
                    genPage.add(simulatorHeader);

                    var simulatorBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
                    this._autoSimulateCB = new qx.ui.form.CheckBox("Auto Start Simulation");

                    if (typeof localStorage['autoSimulate'] != 'undefined') {
                        if (localStorage['autoSimulate'] == "yes")
                            this._autoSimulateCB.setValue(true);
                    }

                    var simulatorBox2 = new qx.ui.container.Composite(new qx.ui.layout.Grid(5)).set({
                        marginLeft: 20
                    });
                    var simSpeedOpt1 = new qx.ui.form.RadioButton("x1");
                    var simSpeedOpt2 = new qx.ui.form.RadioButton("x2");
                    var simSpeedOpt4 = new qx.ui.form.RadioButton("x4");
                    this._simSpeedGroup = new qx.ui.form.RadioGroup(simSpeedOpt1, simSpeedOpt2, simSpeedOpt4);
                    this._simSpeedGroup.addListener("changeSelection", this._onSimSpeedChange, this);
                    this._autoSimulateCB.addListener("changeValue", this._onAutoSimulateChange, this);
                    if (typeof localStorage['simulateSpeed'] != 'undefined') {
                        var options = this._simSpeedGroup.getSelectables(false);

                        if (localStorage['simulateSpeed'] == "2")
                            options[1].setValue(true);
                        else if (localStorage['simulateSpeed'] == "4")
                            options[2].setValue(true);
                        else
                            options[0].setValue(true);
                    }
                    if (this._autoSimulateCB.getValue() == false) {
                        this._simSpeedGroup.setEnabled(false);
                    }

                    simulatorBox2.add(simSpeedOpt1, {row: 0, column: 0});
                    simulatorBox2.add(simSpeedOpt2, {row: 0, column: 1});
                    simulatorBox2.add(simSpeedOpt4, {row: 0, column: 2});
                    simulatorBox.add(this._autoSimulateCB);
                    simulatorBox.add(simulatorBox2);
                    genPage.add(simulatorBox);

                    var statsPage = new qx.ui.tabview.Page("Stats");
                    statsLayout = new qx.ui.layout.VBox(5);
                    statsPage.setLayout(statsLayout);

                    var statWindowHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
                    statWindowHeader.setThemedFont("bold");
                    var statWindowTitle = new qx.ui.basic.Label("Stat Window:");
                    statWindowHeader.add(statWindowTitle);
                    statsPage.add(statWindowHeader);

                    var statWindowBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
                    this._autoOpenCB = new qx.ui.form.CheckBox("Auto Open");
                    this._autoOpenCB.addListener("changeValue", this._onAutoOpenStatsChange, this);
                    if (typeof localStorage['autoOpenStat'] != 'undefined') {
                        if (localStorage['autoOpenStat'] == "yes")
                            this._autoOpenCB.setValue(true);
                        else
                            this._autoOpenCB.setValue(false);
                    }

                    statWindowBox.add(this._autoOpenCB);
                    statsPage.add(statWindowBox);


                    var repairSecHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({
                        marginTop: 10
                    });
                    repairSecHeader.setThemedFont("bold");
                    var repairSecTitle = new qx.ui.basic.Label("Repair Time Display:");
                    repairSecHeader.add(repairSecTitle);
                    statsPage.add(repairSecHeader);

                    var repairSecBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
                    var repairDisplayOpt1 = new qx.ui.form.RadioButton("RT");
                    var repairDisplayOpt2 = new qx.ui.form.RadioButton("C");
                    var repairDisplayOpt3 = new qx.ui.form.RadioButton("HP");
                    this._repairSecGroup = new qx.ui.form.RadioGroup(repairDisplayOpt1, repairDisplayOpt2, repairDisplayOpt3);
                    this._repairSecGroup.addListener("changeSelection", this._onRepairSelectionChange, this);
                    if (typeof localStorage['getRTSelection'] != 'undefined') {
                        var options = this._repairSecGroup.getSelectables(false);

                        if (localStorage['getRTSelection'] == "rt")
                            options[0].setValue(true);
                        else if (localStorage['getRTSelection'] == "hp")
                            options[1].setValue(true);
                        else if (localStorage['getRTSelection'] == "cry")
                            options[2].setValue(true);
                        else
                            options[0].setValue(true);
                    }
                    repairSecBox.add(repairDisplayOpt1);
                    repairSecBox.add(repairDisplayOpt2);
                    repairSecBox.add(repairDisplayOpt3);
                    statsPage.add(repairSecBox);

                    var simViewsHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({marginTop: 10});
                    simViewsHeader.setThemedFont("bold");
                    var simViewsTitle = new qx.ui.basic.Label("Simulations shown");
                    simViewsHeader.add(simViewsTitle);
                    statsPage.add(simViewsHeader);

                    var simViewsBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
                    this._simViews = new qx.ui.form.Spinner().set({ minimum: 2 });
                    if (typeof localStorage['simViews'] != 'undefined') {
                        if (!isNaN(parseInt(localStorage['simViews'], 10))) this._simViews.setValue(parseInt(localStorage['simViews'], 10));
                        else this._simViews.setValue(Simulator.StatWindow.getInstance().simViews);
                    }
                    this._simViews.addListener("changeValue", this._onSimViewsChanged, this);
                    simViewsBox.add(this._simViews);
                    statsPage.add(simViewsBox);

                    var hideSecHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({marginTop: 10});
                    hideSecHeader.setThemedFont("bold");
                    var hideSecTitle = new qx.ui.basic.Label("Hide Sections (on Startup):");
                    hideSecHeader.add(hideSecTitle);
                    statsPage.add(hideSecHeader);

                    var hideSecBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
                    this._hideHealthCB = new qx.ui.form.CheckBox("Health");
                    this._hideRepairCB = new qx.ui.form.CheckBox("Repair");
                    this._hideLootCB = new qx.ui.form.CheckBox("Loot");
                    this._hideHealthCB.addListener("changeValue", this._onHideEHChange, this);
                    this._hideRepairCB.addListener("changeValue", this._onHideRTChange, this);
                    this._hideLootCB.addListener("changeValue", this._onHideLootChange, this);
                    if (typeof localStorage['hideHealth'] != 'undefined') {
                        if (localStorage['hideHealth'] == "yes")
                            this._hideHealthCB.setValue(true);
                        else
                            this._hideHealthCB.setValue(false);
                    }
                    if (typeof localStorage['hideRepair'] != 'undefined') {
                        if (localStorage['hideRepair'] == "yes")
                            this._hideRepairCB.setValue(true);
                        else
                            this._hideRepairCB.setValue(false);
                    }
                    if (typeof localStorage['hideLoot'] != 'undefined') {
                        if (localStorage['hideLoot'] == "yes")
                            this._hideLootCB.setValue(true);
                        else
                            this._hideLootCB.setValue(false);
                    }
                    hideSecBox.add(this._hideHealthCB);
                    hideSecBox.add(this._hideRepairCB);
                    hideSecBox.add(this._hideLootCB);
                    statsPage.add(hideSecBox);

                    this._ArmyUnitTooltip = new qx.ui.form.CheckBox("Army Unit Tooltip");
                    this._ArmyUnitTooltip.addListener("changeValue", this._onArmyUnitTooltipChange, this);
                    if (typeof localStorage['ArmyUnitTooltipDisabled'] != 'undefined') {
                        if (localStorage['ArmyUnitTooltipDisabled'] == "yes")
                            this._ArmyUnitTooltip.setValue(true);
                        else
                            this._ArmyUnitTooltip.setValue(false);
                    }

                    statsPage.add(this._ArmyUnitTooltip);

                    var statPosHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({marginTop: 10});
                    var statPosTitle = new qx.ui.basic.Label("Set Stat Window Position:").set({alignY: "middle"});
                    statPosTitle.setFont("bold");
                    var statPosBtn = new qx.ui.form.Button("Set").set({allowGrowX: false, allowGrowY: false, height: 20});
                    statPosBtn.addListener("click", this._onSetStatWindowPositionChange, this);
                    statPosHeader.add(statPosTitle);
                    statPosHeader.add(statPosBtn);
                    statsPage.add(statPosHeader);

                    tabView.add(genPage);
                    tabView.add(statsPage);
                    this.add(tabView);
                },

                destruct: function () {},

                members: {
                    _buttonSizeCB: null,
                    _buttonLocCB: null,
                    _disableRTBtnCB: null,
                    _disableCmtBtnCB: null,
                    _autoOpenCB: null,
                    _autoSimulateCB: null,
                    _simSpeedGroup: null,
                    _repairSecGroup: null,
                    _simViews: null,
                    _hideHealthCB: null,
                    _hideRepairCB: null,
                    _hideLootCB: null,
                    _ArmyUnitTooltip: null,

                    _onButtonSizeChange: function () {
                        try {
                            var value = this._buttonSizeCB.getValue();

                            if (value == true)
                                localStorage['isBtnNorm'] = "yes";
                            else
                                localStorage['isBtnNorm'] = "no";

                            this.setButtonSize();
                        } catch (e) {
                            console.log("Error Button Size Change: " + e.toString());
                        }
                    },

                    _onButtonLocChange: function () {
                        try {
                            var value = this._buttonLocCB.getValue();

                            if (value == true)
                                localStorage['isBtnRight'] = "yes";
                            else
                                localStorage['isBtnRight'] = "no";

                            this.setButtonLoc();
                        } catch (e) {
                            console.log("Error Button Location Change: " + e.toString());
                        }
                    },

                    _onDisableRTBtnChange: function () {
                        try {
                            var value = this._disableRTBtnCB.getValue();

                            if (value == true)
                                localStorage['isRTBtnDisabled'] = "yes";
                            else
                                localStorage['isRTBtnDisabled'] = "no";

                            this.setRTBtn(value);
                        } catch (e) {
                            console.log("Error Disable RT Button Change: " + e.toString());
                        }
                    },

                    _onDisableCmtBtnChange: function () {
                        try {
                            var value = this._disableCmtBtnCB.getValue();

                            if (value == true)
                                localStorage['isCmtBtnDisabled'] = "yes";
                            else
                                localStorage['isCmtBtnDisabled'] = "no";

                            this.setCmtBtn(value);
                        } catch (e) {
                            console.log("Error Disable Cmt Button Change: " + e.toString());
                        }
                    },

                    _onRepairSelectionChange: function (selection) {
                        try {
                            var option = selection.getData()[0];
                            var label = option.getLabel();

                            if (label == "RT")
                                localStorage['getRTSelection'] = "rt";
                            else if (label == "HP")
                                localStorage['getRTSelection'] = "hp";
                            else if (label == "C")
                                localStorage['getRTSelection'] = "cry";
                            else
                                localStorage['getRTSelection'] = "rt";
                        } catch (e) {
                            console.log("Error Repair Section Selection Change: " + e.toString());
                        }
                    },

                    _onAutoOpenStatsChange: function () {
                        try {
                            var value = this._autoOpenCB.getValue();

                            if (value == false)
                                localStorage['autoOpenStat'] = "no";
                            else
                                localStorage['autoOpenStat'] = "yes";
                        } catch (e) {
                            console.log("Error Auto Open Stats Change: " + e.toString());
                        }
                    },

                    _onArmyUnitTooltipChange: function () {
                        try {
                            var value = this._ArmyUnitTooltip.getValue();

                            if (value == false)
                                localStorage['ArmyUnitTooltipDisabled'] = "no";
                            else
                                localStorage['ArmyUnitTooltipDisabled'] = "yes";
                        } catch (e) {
                            console.log("Error Army Unit Tooltip Change: " + e.toString());
                        }
                    },

                    _onAutoSimulateChange: function () {
                        try {
                            var value = this._autoSimulateCB.getValue();
                            if (value == false) {
                                this._simSpeedGroup.setEnabled(false);
                                localStorage['autoSimulate'] = "no";
                            } else {
                                this._simSpeedGroup.setEnabled(true);
                                localStorage['autoSimulate'] = "yes";
                            }
                        } catch (e) {
                            console.log("Error Auto Simulate Change: " + e.toString());
                        }
                    },

                    _onSimSpeedChange: function (selection) {
                        try {
                            var option = selection.getData()[0];
                            var label = option.getLabel();

                            if (label == "x1")
                                localStorage['simulateSpeed'] = "1";
                            else if (label == "x2")
                                localStorage['simulateSpeed'] = "2";
                            else
                                localStorage['simulateSpeed'] = "4";
                        } catch (e) {
                            console.log("Error Sim Speed Change: " + e.toString());
                        }
                    },

                    _onSimViewsChanged: function () {
                        try {
                            var value = parseInt(this._simViews.getValue(), 10);
                            if (!isNaN(value)) {
                                if (value > 0) {
                                    localStorage['simViews'] = value.toString();
                                    Simulator.StatWindow.getInstance().simViews = value;

                                    // Remove Simulations from Stats Window
                                    for (var i = (Simulator.StatWindow.getInstance().sim.length-1); i >= 0; i--) {
                                        if (i > (value-1)) {
                                            Simulator.StatWindow.getInstance().Battle.remove(Simulator.StatWindow.getInstance().sim[i].Label.Battle.container);
                                            Simulator.StatWindow.getInstance().EnemyHealth.remove(Simulator.StatWindow.getInstance().sim[i].Label.EnemyHealth.container);
                                            Simulator.StatWindow.getInstance().Repair.remove(Simulator.StatWindow.getInstance().sim[i].Label.Repair.container);
                                            Simulator.StatWindow.getInstance().Loot.remove(Simulator.StatWindow.getInstance().sim[i].Label.Loot.container);
                                            Simulator.StatWindow.getInstance().sim.pop();
                                        }
                                    }

                                    // Create and add Simulations to Stats Window
                                    for (var i = 0; i < value; i++) {
                                        if (i == Simulator.StatWindow.getInstance().sim.length) {
                                            Simulator.StatWindow.getInstance().sim.push(new (Simulator.StatWindow.getInstance()).Simulation(i));
                                            Simulator.StatWindow.getInstance().Battle.add(Simulator.StatWindow.getInstance().sim[i].Label.Battle.container, { flex : 1 });
                                            Simulator.StatWindow.getInstance().EnemyHealth.add(Simulator.StatWindow.getInstance().sim[i].Label.EnemyHealth.container, { flex : 1 });
                                            Simulator.StatWindow.getInstance().Repair.add(Simulator.StatWindow.getInstance().sim[i].Label.Repair.container, { flex : 1 });
                                            Simulator.StatWindow.getInstance().Loot.add(Simulator.StatWindow.getInstance().sim[i].Label.Loot.container, { flex : 1 });
                                            Simulator.StatWindow.getInstance().sim[i].Select(Simulator.StatWindow.getInstance().simSelected);
                                        }
                                    }

                                    if ((value-1) < Simulator.StatWindow.getInstance().simSelected) {
                                        Simulator.StatWindow.getInstance().simSelected = 0;
                                        for (var i = 0; i < Simulator.StatWindow.getInstance().sim.length; i++) {
                                            Simulator.StatWindow.getInstance().sim[i].Select(0);
                                        }
                                    }
                                }
                            }
                        } catch (e) {
                            console.log("Error Simulation Views Change: " + e.toString());
                        }
                    },

                    _onHideEHChange: function () {
                        try {
                            var value = this._hideHealthCB.getValue();

                            if (value == true)
                                localStorage['hideHealth'] = "yes";
                            else
                                localStorage['hideHealth'] = "no";

                        } catch (e) {
                            console.log("Error Hide Enemy Base Health Change: " + e.toString());
                        }
                    },

                    _onHideRTChange: function () {
                        try {
                            var value = this._hideRepairCB.getValue();

                            if (value == true)
                                localStorage['hideRepair'] = "yes";
                            else
                                localStorage['hideRepair'] = "no";

                        } catch (e) {
                            console.log("Error Hide Repair Times Change: " + e.toString());
                        }
                    },

                    _onHideLootChange: function () {
                        try {
                            var value = this._hideLootCB.getValue();

                            if (value == true)
                                localStorage['hideLoot'] = "yes";
                            else
                                localStorage['hideLoot'] = "no";

                        } catch (e) {
                            console.log("Error Hide Loot Change: " + e.toString());
                        }
                    },

                    _onSetStatWindowPositionChange: function () {
                        try {
                            var props = Simulator.StatWindow.getInstance().getLayoutProperties();
                            localStorage['statWindowPosLeft'] = props["left"];
                            localStorage['statWindowPosTop'] = props["top"];
                        } catch (e) {
                            console.log("Error Stat Window Position Change: " + e.toString());
                        }
                    },

                    setRTBtn: function (value) {
                        if (value == true)
                            Simulator.getInstance().unlockRTBtn.hide();
                        else
                            Simulator.getInstance().unlockRTBtn.show();
                    },

                    setCmtBtn: function (value) {
                        if (value == true)
                            Simulator.getInstance().unlockCmtBtn.hide();
                        else
                            Simulator.getInstance().unlockCmtBtn.show();
                    },

                    setButtonLoc: function () {
                        try {
                            var value = this._buttonLocCB.getValue();
                            var size = this._buttonSizeCB.getValue();

                            if (value == true) //Right
                            {
                                var pLeft = null;
                                if (size == true) //Right Normal
                                    var pRight = 70;
                                else //Right Small
                                    var pRight = 70;

                                Simulator.getInstance().armyBar.add(Simulator.getInstance().simBtn, {left: pLeft, right: pRight, bottom: 119});
                                Simulator.getInstance().armyBar.add(Simulator.getInstance().statBtn, {left: pLeft, right: pRight, bottom: 81});
                                Simulator.getInstance().armyBar.add(Simulator.getInstance().optionBtn, {left: pLeft, right: pRight, bottom: 43});
                                Simulator.getInstance().armyBar.add(Simulator.getInstance().layoutBtn, {left: pLeft, right: pRight, bottom: 5});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().shiftUpBtn, {left: pLeft, right: 75, bottom: 113});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().shiftDownBtn, {left: pLeft, right: 75, bottom: 73});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().shiftLeftBtn, {left: pLeft, right: 95, bottom: 93});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().shiftRightBtn, {left: pLeft, right: 55, bottom: 93});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().disableAllUnitsBtn, {left: pLeft, right: 6, bottom: 120});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnH, {left: pLeft, right: 6, bottom: 160});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnV, {left: pLeft, right: 46, bottom: 160});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().armyUndoBtn, {left: pLeft, right: 6, bottom: 200});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().quickSaveBtn, {left: pLeft, right: 6, bottom: 240});
                            } else {
                                var pRight = null;
                                if (size == true) //Left Normal
                                    var pLeft = 87;
                                else
                                    var pLeft = 87;

                                Simulator.getInstance().armyBar.add(Simulator.getInstance().simBtn, {left: pLeft, right: pRight, bottom: 120});
                                Simulator.getInstance().armyBar.add(Simulator.getInstance().statBtn, {left: pLeft, right: pRight, bottom: 82});
                                Simulator.getInstance().armyBar.add(Simulator.getInstance().optionBtn, {left: pLeft, right: pRight, bottom: 44});
                                Simulator.getInstance().armyBar.add(Simulator.getInstance().layoutBtn, {left: pLeft, right: pRight, bottom: 6});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().shiftUpBtn, {left: 80, right: pRight, bottom: 113});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().shiftDownBtn, {left: 80, right: pRight, bottom: 73});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().shiftLeftBtn, {left: 60, right: pRight, bottom: 93});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().shiftRightBtn, {left: 100, right: pRight, bottom: 93});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().disableAllUnitsBtn, {left: 6, right: pRight, bottom: 120});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnH, {left: 6, right: pRight, bottom: 160});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnV, {left: 46, right: pRight, bottom: 160});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().armyUndoBtn, {left: 6, right: pRight, bottom: 200});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().quickSaveBtn, {left: 6, right: pRight, bottom: 240});
                            }
                        } catch (e) {
                            console.log("Error Setting Button Location: " + e.toString());
                        }
                    },

                    setButtonSize: function () {
                        try {
                            value = this._buttonSizeCB.getValue();

                            if (value == true) {
                                Simulator.getInstance().simBtn.setLabel("Simulate");
                                Simulator.getInstance().simBtn.setWidth(60);

                                Simulator.getInstance().statBtn.setLabel("Stats");
                                Simulator.getInstance().statBtn.setWidth(60);

                                Simulator.getInstance().optionBtn.setLabel("Options");
                                Simulator.getInstance().optionBtn.setWidth(60);

                                Simulator.getInstance().layoutBtn.setLabel("Layout");
                                Simulator.getInstance().layoutBtn.setWidth(60);
                            } else {
                                Simulator.getInstance().simBtn.setLabel("S");
                                Simulator.getInstance().simBtn.setWidth(30);

                                Simulator.getInstance().statBtn.setLabel("I");
                                Simulator.getInstance().statBtn.setWidth(30);

                                Simulator.getInstance().optionBtn.setLabel("O");
                                Simulator.getInstance().optionBtn.setWidth(30);

                                Simulator.getInstance().layoutBtn.setLabel("L");
                                Simulator.getInstance().layoutBtn.setWidth(30);
                            }

                            this.setButtonLoc();
                        } catch (e) {
                            console.log("Error Setting Button Size: " + e.toString());
                        }
                    }
                }
            });

            qx.Class.define("Simulator.LayoutWindow", {
                type: "singleton",
                extend: webfrontend.gui.CustomWindow,

                construct: function () {
                    this.base(arguments);
                    this.setLayout(new qx.ui.layout.VBox());

                    this.set({
                        width: 200,
                        caption: "Simulator Layouts",
                        padding: 2,
                        allowMaximize: false,
                        showMaximize: false,
                        allowMinimize: false,
                        showMinimize: false
                    });

                    var layoutListHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({
                        decorator: "pane-light-opaque"
                    });
                    var layoutListTitle = new qx.ui.basic.Label("Formation Saver").set({alignX: "center", alignY: "top", font: "font_size_14_bold"});
                    layoutListHeader.add(layoutListTitle);
                    this.add(layoutListHeader);

                    this.layoutList = new qx.ui.form.List();
                    this.layoutList.set({selectionMode: "one", height: 100, width: 150, margin: 5});
                    this.add(this.layoutList);

                    var listButtonBox = new qx.ui.container.Composite();
                    var listButtonLayout = new qx.ui.layout.HBox(5, "center");
                    listButtonBox.setLayout(listButtonLayout);
                    var loadButton = new qx.ui.form.Button("Load");
                    var deleteButton = new qx.ui.form.Button("Delete");
                    loadButton.set({height: 15, width: 70, alignX: "center"});
                    loadButton.addListener("click", this.loadLayout, this);
                    deleteButton.set({height: 15, width: 70, alignX: "center"});
                    deleteButton.addListener("click", this.deleteLayout, this);
                    listButtonBox.add(loadButton);
                    listButtonBox.add(deleteButton);
                    this.add(listButtonBox);

                    var saveLayoutBox = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({spacing: 10})).set({marginTop: 20, marginLeft: 5});
                    this.layoutTextBox = new qx.ui.form.TextField("").set({width: 75, maxLength: 15});
                    var saveButton = new qx.ui.form.Button("Save");
                    saveButton.set({height: 10, width: 70, alignX: "center"});
                    saveButton.addListener("click", this.saveNewLayout, this);
                    saveLayoutBox.add(this.layoutTextBox);
                    saveLayoutBox.add(saveButton);
                    this.add(saveLayoutBox);

                    var checkBox = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({spacing: 10})).set({marginTop: 10, marginLeft: 5});
                    this.persistentCheck = new qx.ui.form.CheckBox("Make Persistent");
                    this.persistentCheck.setTextColor("white");
                    this.persistentCheck.setFont("bold");
                    this.persistentCheck.setToolTipText("If checked, formation will be saved and can be used by this city in any other city");
                    checkBox.add(this.persistentCheck);
                    this.add(checkBox);

                    var noticeBox = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({marginTop: 5, marginLeft: 5});
                    var noticeText = new qx.ui.basic.Label("").set({alignX: "center", alignY: "top"});
                    noticeText.setValue("<p align=\'justify\'><b>If formation does not change on load, try moving one unit first, then try again.</b></p>");
                    noticeText.set({rich: true, wrap: true, width: 165, textColor: "white"});
                    noticeBox.add(noticeText);
                    this.add(noticeBox);

                    var clearAllLayoutsBox = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({alignX: "center", marginTop: 5, marginLeft: 5, allowGrowX: false});
                    var clearAllLayoutsBtn = new qx.ui.form.Button("Clear All").set({alignX: "center", width: 70});
                    clearAllLayoutsBtn.addListener("click", this.clearAllLayouts, this);
                    clearAllLayoutsBox.add(clearAllLayoutsBtn);
                    this.add(clearAllLayoutsBox);

                    this.layoutsArray = [];
                },

                destruct: function () {},

                members: {
                    layoutList: null,
                    layoutTextBox: null,
                    layoutsArray: null,
                    persistentCheck: null,

                    saveNewLayout: function (isQS) {
                        try {
                            console.log("Saving Layout");

                            if ((typeof isQS != 'undefined' && isQS == true) || this.layoutTextBox.getValue() == "") {
                                var date = new Date();
                                var day = date.getDate();
                                var month = date.getMonth() + 1;
                                var hour = (date.getHours() < 10) ? "0" + date.getHours() : date.getHours();
                                var minute = (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes();
                                var second = (date.getSeconds() < 10) ? "0" + date.getSeconds() : date.getSeconds();
                                var label = month + "/" + day + "@" + hour + ":" + minute + ":" + second;
                            } else {
                                var label = this.layoutTextBox.getValue();
                            }

                            var cityID = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                            var ownCityID = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();
                            var model = ownCityID + "." + cityID + "." + label;

                            var children = this.layoutList.getChildren();
                            //Check for same layout name if so do NOT save
                            for (var item = 0; item < children.length; item++) {
                                thisItem = children[item].getModel();
                                if (thisItem == model) {
                                    alert("Save Failed: Duplicate Name");
                                    return;
                                }
                            }
                            var units = Simulator.getInstance().getCityPreArmyUnits().get_ArmyUnits().l;
                            units = this.prepareLayout(units);

                            var layoutInformation = {};
                            if (this.persistentCheck.getValue() == true) {
                                layoutInformation = {
                                    id: model,
                                    label: label,
                                    formation: units,
                                    pers: "yes",
                                };
                            } else {
                                layoutInformation = {
                                    id: model,
                                    label: label,
                                    formation: units,
                                    pers: "no",
                                };
                            }
                            this.layoutsArray.push(layoutInformation);
                            this.layoutList.add(new qx.ui.form.ListItem(layoutInformation.label, null, layoutInformation.id));
                            this.layoutTextBox.setValue("");
                            Simulator.getInstance().quickSaveBtn.setLabel("âœ”");
                            setTimeout(function () { Simulator.getInstance().quickSaveBtn.setLabel("QS"); }, 2000);
                            this.updateStorage();
                        } catch (e) {
                            console.log("Error Saving Layout");
                            console.log(e);
                        }
                    },

                    loadLayout: function () {
                        try {
                            console.log("Loading Layout");
                            var ownCityID = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();

                            var layout = this.layoutList.getSelection()[0].getModel();
                            for (var item in this.layoutsArray) {
                                var thisLayout = this.layoutsArray[item].id;

                                if (thisLayout == layout) {
                                    Simulator.getInstance().restoreFormation(this.layoutsArray[item].formation);
                                    break;
                                }
                            }
                        } catch (e) {
                            console.log("Error Loading Layout");
                            console.log(e);
                        }
                    },

                    deleteLayout: function () {
                        try {
                            console.log("Deleting Layout");
                            //Remove from our array too
                            var rUSure = confirm('Are you sure you want to delete this layout?');
                            if (!rUSure) {
                                return;
                            }
                            for (var item in this.layoutsArray) {
                                if (this.layoutsArray[item].id == this.layoutList.getSelection()[0].getModel()) {
                                    var isRemoved = this.layoutsArray.splice(item, 1);
                                    this.updateStorage();
                                }
                            }

                            //The update will remove all and repopulate so no need to delete individual ones.
                            this.updateLayoutList();
                        } catch (e) {
                            console.log("Error Deleting Layout");
                            console.log(e);
                        }
                    },

                    updateStorage: function () {
                        try {
                            console.log("Updating Storage");
                            localStorage['savedFormations'] = JSON.stringify(this.layoutsArray);
                        } catch (e) {
                            console.log("Error updating localStorage");
                            console.log(e);
                        }
                    },

                    updateLayoutList: function () {
                        try {
                            console.log("Updating Layout List");
                            var savedLayouts = localStorage['savedFormations'];
                            if (typeof savedLayouts != 'undefined') {
                                this.layoutsArray = JSON.parse(savedLayouts);
                            }
                            this.layoutList.removeAll(); //Clear List
                            var cityID = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                            var ownCityID = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();
                            var model = ownCityID + "." + cityID;

                            for (var item in this.layoutsArray) {
                                var itemLabel = this.layoutsArray[item].label;
                                var itemModel = model + "." + itemLabel;
                                var pers = this.layoutsArray[item].pers;
                                var match = this.layoutsArray[item].id.match(ownCityID.toString());

                                if (itemModel == this.layoutsArray[item].id || ((typeof pers != 'undefined' && pers == "yes") && match != null)) //Match!
                                {
                                    this.layoutList.add(new qx.ui.form.ListItem(itemLabel, null, this.layoutsArray[item].id));
                                }
                            }
                        } catch (e) {
                            console.log("Error Updating Layout List");
                            console.log(e);
                        }
                    },

                    //Function from C&C Tiberium Alliances Combat Simulator script. Works well and does exactly what I need!
                    //For authors see: http://userscripts.org/scripts/show/145717
                    prepareLayout: function (units) {
                        try {
                            console.log("Preparing Layout for Saving");
                            saved_units = [];
                            for (var i = 0; i < units.length; i++) {
                                var unit = units[i];
                                var armyUnit = {};
                                armyUnit.x = unit.get_CoordX();
                                armyUnit.y = unit.get_CoordY();
                                armyUnit.id = unit.get_Id();
                                armyUnit.enabled = unit.get_Enabled();
                                saved_units.push(armyUnit);
                            }
                            return saved_units;
                        } catch (e) {
                            console.log("Error Preparing Unit Layout");
                            console.log(e);
                        }
                    },

                    clearAllLayouts: function () {
                        try {
                            console.log("Clearing All Layouts");
                            var rUSure = confirm("Clicking OK will delete all of your saved layouts from every base!");

                            if (rUSure) {
                                localStorage.removeItem('savedFormations');
                                this.layoutsArray = [];
                                alert("All saved layouts have been deleted.");

                                this.updateLayoutList();
                            } else {
                                alert("No layouts were deleted.");
                            }
                        } catch (e) {
                            console.log("Error Clearing All Layouts");
                            console.log(e);
                        }
                    }
                }
            });
        }

        function onViewChanged(oldMode, newMode) {
            setTimeout(function () {
                try {
                    console.log("View Changed");
                    Simulator.OptionWindow.getInstance().close();
                    Simulator.LayoutWindow.getInstance().close();
                    if (newMode != ClientLib.Vis.Mode.CombatSetup && newMode != ClientLib.Vis.Mode.Battleground) {
                        Simulator.StatWindow.getInstance().close();
                        //Also reset temp formation array
                        Simulator.getInstance().armyTempFormations = [];
                        Simulator.getInstance().armyTempIdx = 0;
                        Simulator.getInstance().armyUndoBtn.setEnabled(false);
                        Simulator.getInstance().isSimulation = false;
                    } else if (newMode == ClientLib.Vis.Mode.CombatSetup) {
                        var autoStatOpen = localStorage['autoOpenStat'];
                        if (typeof autoStatOpen != 'undefined') {
                            if (autoStatOpen == "yes") {
                                //Why not auto-open the Stat window? Sounds like a good idea
                                Simulator.StatWindow.getInstance().open();
                            }
                        } else {
                            Simulator.StatWindow.getInstance().open();
                        }

                        if (Simulator.getInstance().isSimulation == false)
                            setTimeout(function () {
                                Simulator.StatWindow.getInstance().calcResources();
                            }, 2000);
                        else
                            Simulator.getInstance().isSimulation = false;

                        if (oldMode != ClientLib.Vis.Mode.Battleground)
                            Simulator.getInstance().saveTempFormation(); //Save the very first formation upon entering base.
                    }

                    if (ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity() != null) {
                        var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().get_Name();
                        var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_Name();
                        //Don't want shift formation buttons showing up during combat or in own player's cities
                        if (newMode == ClientLib.Vis.Mode.Battleground || city == ownCity) {
                            Simulator.getInstance().shiftUpBtn.hide();
                            Simulator.getInstance().shiftDownBtn.hide();
                            Simulator.getInstance().shiftLeftBtn.hide();
                            Simulator.getInstance().shiftRightBtn.hide();
                            Simulator.getInstance().disableAllUnitsBtn.hide();
                            Simulator.getInstance().mirrorBtnH.hide();
                            Simulator.getInstance().mirrorBtnV.hide();
                            Simulator.getInstance().armyUndoBtn.hide();
                            Simulator.getInstance().quickSaveBtn.hide();
                        } else if (city != ownCity) {
                            Simulator.getInstance().shiftUpBtn.show();
                            Simulator.getInstance().shiftDownBtn.show();
                            Simulator.getInstance().shiftLeftBtn.show();
                            Simulator.getInstance().shiftRightBtn.show();
                            Simulator.getInstance().disableAllUnitsBtn.show();
                            Simulator.getInstance().mirrorBtnH.show();
                            Simulator.getInstance().mirrorBtnV.show();
                            Simulator.getInstance().armyUndoBtn.show();
                            Simulator.getInstance().quickSaveBtn.show();
                        }
                    }
                } catch (e) {
                    console.log("Error closing windows or hiding buttons on view change");
                    console.log(e.toString());
                }
            }, 500);
        }

        function waitForGame() {
            try {
                if (typeof qx != 'undefined' && typeof qx.core != 'undfined' && typeof qx.core.Init != 'undefined') {
                    var app = qx.core.Init.getApplication();
                    if (app.initDone == true) {
                        try {
                            console.log("Tiberium Alliances Combat Simulator: Loading");
                            createClasses();

                            console.log("Creating phe.cnc function wraps");

                            //Current Server patch (World 52 - US East Coast) uses phe
                            if (typeof phe.cnc.Util.attachNetEvent == 'undefined')
                                Simulator.getInstance().attachNetEvent = webfrontend.gui.Util.attachNetEvent;
                            else
                                Simulator.getInstance().attachNetEvent = phe.cnc.Util.attachNetEvent;

                            //Current Server patch (World 52 - US East Coast) uses webfrontend
                            if (typeof phe.cnc.gui.util == 'undefined')
                                Simulator.getInstance().formatNumbersCompact = webfrontend.gui.Util.formatNumbersCompact;
                            else
                                Simulator.getInstance().formatNumbersCompact = phe.cnc.gui.util.Numbers.formatNumbersCompact;

                            //Thanks to KRS_L for this next section solving the repair calculations until the new patch is on every server
                            if (PerforceChangelist >= 392583) {
                                var u = "" + ClientLib.Data.Cities.prototype.get_CurrentCity;
                                for (var a in ClientLib.Data.Cities.prototype)
                                    if (ClientLib.Data.Cities.prototype.hasOwnProperty(a) && "function" == typeof ClientLib.Data.Cities.prototype[a]) {
                                        var l = "" + ClientLib.Data.Cities.prototype[a];
                                        if (l.indexOf(u) > -1 && 6 == a.length) {
                                            u = a;
                                            break
                                        }
                                    }
                                var c = "" + ClientLib.Data.Cities.prototype.get_CurrentOwnCity;
                                for (var h in ClientLib.Data.Cities.prototype)
                                    if (ClientLib.Data.Cities.prototype.hasOwnProperty(h) && "function" == typeof ClientLib.Data.Cities.prototype[h]) {
                                        var p = "" + ClientLib.Data.Cities.prototype[h];
                                        if (p.indexOf(c) > -1 && 6 == h.length) {
                                            c = h;
                                            break
                                        }
                                    }
                                var s = "" + ClientLib.API.Util.GetUnitRepairCosts;
                                s = s.replace(u, c);
                                var d = s.substring(s.indexOf("{") + 1, s.lastIndexOf("}")),
                                    v = Function("a,b,c", d);
                                ClientLib.API.Util.GetUnitRepairCosts = v
                            }

                            Simulator.getInstance();
                            Simulator.StatWindow.getInstance();
                            Simulator.OptionWindow.getInstance();
                            Simulator.LayoutWindow.getInstance();
                            Simulator.getInstance().attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, onViewChanged);
                            console.log("Tiberium Alliances Combat Simulator: Loaded");
                        } catch (e) {
                            console.log("Simulator initialization error:");
                            console.log(e);
                        }
                    } else
                        window.setTimeout(waitForGame, 1000);
                } else {
                    window.setTimeout(waitForGame, 1000);
                }
            } catch (e) {
                if (typeof console != 'undefined')
                    console.log(e);
                else if (window.opera)
                    opera.postError(e);
                else
                    GM_log(e);
            }
        };
        window.setTimeout(waitForGame, 1000);
    }

    var script = document.createElement("script");
    var txt = injectFunction.toString();
    script.innerHTML = "(" + txt + ")();";
    script.type = "text/javascript";

    document.getElementsByTagName("head")[0].appendChild(script);
})();

// =========================================================================  Zoom MOD  ================================================================

(function (){
  var tazoom_main = function() {
    function initialize() {
      console.log("Zoom Loaded");
      
      var zoomMin = 1.0;	// Larger number means able to zoom in closer.
      var zoomMax = 0.2;	// Smaller number means able to zoom out further.
      var zoomInc = 0.05;	// Larger number for faster zooming, Smaller number for slower zooming.
      
      webfrontend.gui.BackgroundArea.prototype.onHotKeyPress = function(be) {
        if(!this.active || be.getTarget() != this.mapContainer)
          return;
        var bh = be.getKeyIdentifier();
        var bf = ClientLib.Vis.VisMain.GetInstance();
        switch(bh) {
          case "+":
            var bg = bf.get_Region().get_ZoomFactor() + zoomInc;
            bf.get_Region().set_ZoomFactor(Math.min(zoomMin, Math.max(zoomMax, bg)));
            break;
          case "-":
            var bg = bf.get_Region().get_ZoomFactor() - zoomInc;
            bf.get_Region().set_ZoomFactor(Math.min(zoomMin, Math.max(zoomMax, bg)));
            break;
        }
        this.closeCityInfo();
        this.closeCityList();
      }

      var backgroundArea = qx.core.Init.getApplication().getBackgroundArea();
      qx.bom.Element.removeListener(backgroundArea.mapContainer, "mousewheel", backgroundArea._onMouseWheel, backgroundArea);
      qx.bom.Element.removeListener(backgroundArea.mapBlocker, "mousewheel", backgroundArea._onMouseWheel, backgroundArea);
      webfrontend.gui.BackgroundArea.prototype._onMouseWheel = function(e) {
        if(this.activeSceneView == null)
          return;
        var bz = e.getWheelDelta();
        var by = this.activeSceneView.get_ZoomFactor();
        by += bz > 0 ? -zoomInc : zoomInc;
        by = Math.min(zoomMin, Math.max(zoomMax, by));
        this.activeSceneView.set_ZoomFactor(by);
        e.stop();
      }
      qx.bom.Element.addListener(backgroundArea.mapContainer, "mousewheel", backgroundArea._onMouseWheel, backgroundArea);
      qx.bom.Element.addListener(backgroundArea.mapBlocker, "mousewheel", backgroundArea._onMouseWheel, backgroundArea); 
    }
 
    function tazoom_checkIfLoaded() {
      try {
        if (typeof qx != 'undefined') {
          a = qx.core.Init.getApplication(); // application
          mb = qx.core.Init.getApplication().getMenuBar();
          if (a && mb) {
            initialize();
          } else
            window.setTimeout(tazoom_checkIfLoaded, 1000);
        } else {
          window.setTimeout(tazoom_checkIfLoaded, 1000);
        }
      } catch (e) {
        if (typeof console != 'undefined') console.log(e);
        else if (window.opera) opera.postError(e);
        else GM_log(e);
      }
    }
    
    if (/commandandconquer\.com/i.test(document.domain)) {
      window.setTimeout(tazoom_checkIfLoaded, 1000);
    }
  }

  // injecting, because there seem to be problems when creating game interface with unsafeWindow
  var tazoomScript = document.createElement("script");
  tazoomScript.innerHTML = "(" + tazoom_main.toString() + ")();";
  tazoomScript.type = "text/javascript";
  if (/commandandconquer\.com/i.test(document.domain)) {
    document.getElementsByTagName("head")[0].appendChild(tazoomScript);
  }
})();

// =========================================================================  CCTAWrapper ================================================================

(function () {
    var CCTAWrapper_main = function () {
        try {
            _log = function () {
                if (typeof console != 'undefined') console.log(arguments);
                else if (window.opera) opera.postError(arguments);
                else GM_log(arguments);
            }

            function createCCTAWrapper() {
                console.log('CCTAWrapper loaded');
                _log('wrapper loading' + PerforceChangelist);
                System = $I;
                SharedLib = $I;
                var strFunction;
                
                // SharedLib.Combat.CbtSimulation.prototype.DoStep
                for (var x in $I) {
                    for (var key in $I[x].prototype) {
                        if ($I[x].prototype.hasOwnProperty(key) && typeof($I[x].prototype[key]) === 'function') {  // reduced iterations from 20K to 12K
                            strFunction = $I[x].prototype[key].toString();
                            if (strFunction.indexOf("().l;var b;for (var d = 0 ; d < c.length ; d++){b = c[d];if((b.") > -1) {
                                $I[x].prototype.DoStep = $I[x].prototype[key];
                                console.log("SharedLib.Combat.CbtSimulation.prototype.DoStep = $I." + x + ".prototype." + key);
                                break;
                            }
                        }
                    }
                }

                // ClientLib.Data.CityRepair.prototype.CanRepair
                for (var key in ClientLib.Data.CityRepair.prototype) {
                    if (typeof ClientLib.Data.CityRepair.prototype[key] === 'function') {
                        strFunction = ClientLib.Data.CityRepair.prototype[key].toString();
                        if (strFunction.indexOf("DefenseSetup") > -1 && strFunction.indexOf("DamagedEntity") > -1) {  // order important to reduce iterations
                            ClientLib.Data.CityRepair.prototype.CanRepair = ClientLib.Data.CityRepair.prototype[key];
                            console.log("ClientLib.Data.CityRepair.prototype.CanRepair = ClientLib.Data.CityRepair.prototype." + key);
                            break;
                        }
                    }
                }

                // ClientLib.Data.CityRepair.prototype.UpdateCachedFullRepairAllCost
                for (var key in ClientLib.Data.CityRepair.prototype) {
                    if (typeof ClientLib.Data.CityRepair.prototype[key] === 'function') {
                        strFunction = ClientLib.Data.CityRepair.prototype[key].toString();
                        if (strFunction.indexOf("Type==7") > -1 && strFunction.indexOf("var a=0;if") > -1) {  // order important to reduce iterations
                            ClientLib.Data.CityRepair.prototype.UpdateCachedFullRepairAllCost = ClientLib.Data.CityRepair.prototype[key];
                            console.log("ClientLib.Data.CityRepair.prototype.UpdateCachedFullRepairAllCost = ClientLib.Data.CityRepair.prototype." + key);
                            break;
                        }
                    }
                }

                // ClientLib.Data.CityUnits.prototype.get_OffenseUnits
                strFunction = ClientLib.Data.CityUnits.prototype.HasUnitMdbId.toString();
                var searchString = "for (var b in {d:this.";
                var startPos = strFunction.indexOf(searchString) + searchString.length;
                var fn_name = strFunction.slice(startPos, startPos + 6);
                strFunction = "var $createHelper;return this." + fn_name + ";";
                var fn = Function('', strFunction);
                ClientLib.Data.CityUnits.prototype.get_OffenseUnits = fn;
                console.log("ClientLib.Data.CityUnits.prototype.get_OffenseUnits = function(){var $createHelper;return this." + fn_name + ";}");

                // ClientLib.Data.CityUnits.prototype.get_DefenseUnits
                strFunction = ClientLib.Data.CityUnits.prototype.HasUnitMdbId.toString();
                searchString = "for (var c in {d:this.";
                startPos = strFunction.indexOf(searchString) + searchString.length;
                fn_name = strFunction.slice(startPos, startPos + 6);
                strFunction = "var $createHelper;return this." + fn_name + ";";
                fn = Function('', strFunction);
                ClientLib.Data.CityUnits.prototype.get_DefenseUnits = fn;
                console.log("ClientLib.Data.CityUnits.prototype.get_DefenseUnits = function(){var $createHelper;return this." + fn_name + ";}");

                // ClientLib.Vis.Battleground.Battleground.prototype.get_Simulation
                strFunction = ClientLib.Vis.Battleground.Battleground.prototype.StartBattle.toString();
                searchString = "=0;for(var a=0; (a<9); a++){this.";
                startPos = strFunction.indexOf(searchString) + searchString.length;
                fn_name = strFunction.slice(startPos, startPos + 6);
                strFunction = "return this." + fn_name + ";";
                fn = Function('', strFunction);
                ClientLib.Vis.Battleground.Battleground.prototype.get_Simulation = fn;
                console.log("ClientLib.Vis.Battleground.Battleground.prototype.get_Simulation = function(){return this." + fn_name + ";}");

                // GetNerfBoostModifier
                if (typeof ClientLib.Vis.Battleground.Battleground.prototype.GetNerfAndBoostModifier == 'undefined') ClientLib.Vis.Battleground.Battleground.prototype.GetNerfAndBoostModifier = ClientLib.Base.Util.GetNerfAndBoostModifier;

                _log('wrapper loaded');
            }
        } catch (e) {
            console.log("createCCTAWrapper: ", e);
        }

        function CCTAWrapper_checkIfLoaded() {
            try {
                if (typeof qx !== 'undefined') {
                    createCCTAWrapper();
                } else {
                    window.setTimeout(CCTAWrapper_checkIfLoaded, 1000);
                }
            } catch (e) {
                CCTAWrapper_IsInstalled = false;
                console.log("CCTAWrapper_checkIfLoaded: ", e);
            }
        }

        if (/commandandconquer\.com/i.test(document.domain)) {
            window.setTimeout(CCTAWrapper_checkIfLoaded, 1000);
        }
    }

    try {
        var CCTAWrapper = document.createElement("script");
        CCTAWrapper.innerHTML = "var CCTAWrapper_IsInstalled = true; (" + CCTAWrapper_main.toString() + ")();";
        CCTAWrapper.type = "text/javascript";
        if (/commandandconquer\.com/i.test(document.domain)) {
            document.getElementsByTagName("head")[0].appendChild(CCTAWrapper);
        }
    } catch (e) {
        console.log("CCTAWrapper: init error: ", e);
    }
})();

// =========================================================================   BaseScanner   ================================================================

// C4MOD http://goo.gl/DrJ2x
(function(){var b=function(){var e=["__msbs_version","1.6.2","Addons.BaseScannerGUI","singleton","Window","window","ui","base","Addons.BaseScannerGUI ","info","T","getInstance","Language","setWidth","setHeight","setContentPadding","setShowMinimize","setShowMaximize","setShowClose","setResizable","setAllowMaximize","setAllowMinimize","setAllowClose","setShowStatusbar","setDecorator","setPadding","layout","setLayout","src","stats","","ZE","removeAll","add","setData","ZL","Addons.BaseScannerGUI.construct: ","debug","img","createElement","setCaption","isVisible","close","updateCityCache","Cache","MaelstromTools","ZC","Cities","form","Basescanner_LastCityID","getserver","LocalStorage","get_Id","Object","setSelection","open","moveTo","MaelstromTools.DefaultObject.openWindow: ","log","model","table","ID","LoadState","City","get","Location","Level","Tiberium","Crystal","Dollar","Research","Crystalfields","Tiberiumfields","Building state","Defense state","CP","Def.HP/Off.HP","Sum Tib+Cry+Cre","(Tib+Cry+Cre)/CP","CY","DF","base set up at","setColumns","YY","get_Player","MainData","Data","ZN","setColumnVisibilityButtonVisible","setColumnWidth","Basescanner_ColWidth_2","Basescanner_ColWidth_3","Basescanner_ColWidth_4","Basescanner_ColWidth_5","Basescanner_ColWidth_6","Basescanner_ColWidth_7","Basescanner_ColWidth_8","Basescanner_ColWidth_9","Basescanner_ColWidth_10","Basescanner_ColWidth_11","Basescanner_ColWidth_12","Basescanner_ColWidth_13","Basescanner_ColWidth_14","Basescanner_ColWidth_15","Basescanner_ColWidth_16","Basescanner_ColWidth_17","Basescanner_ColWidth_18","Basescanner_ColWidth_19","getTableColumnModel","getColumnCount","Basescanner_Column_","setColumnVisible","Statics","images","headerrenderer","setHeaderCellRenderer","FA","set","cellrenderer","setDataCellRenderer","cellDblclick","BaseScannerGUI","addListener","widthChanged","col","getData","newWidth","Basescanner_ColWidth_","setserver","Addons.BaseScannerGUI.FI: ","getRow","length",":","split","VisMain","Vis","getValue","ZK","getApplication","Init","core","closeCityInfo","getBackgroundArea","pavmCombatSetupDefense","PlayerAreaViewMode","setView","getPlayArea","get_CurrentOwnCity","get_Cities","set_CurrentTargetBaseId","get_CityArmyFormationsManager","Addons.BaseScannerGUI FB error: ","Scan","setLabel","ZG","ZH","format","util","setGroupingUsed","setMaximumFractionDigits","abs","floor","k","M","G","container","setMargin","changeSelection","CP Limit","white","basic","ZQ","Basescanner_Cplimiter","","min Level","Basescanner_minLevel","1","ZY","Player","setTextColor","Basescanner_Show0","setValue","changeValue","Bases","Basescanner_Show1","Outpost","Basescanner_Show2","Camp","Basescanner_Show3","execute","solid","blue","decoration","ZV","red","ZU","green","ZX","center","YZ","clear Cache","ZZ","Only center on World","ZJ","7 "," 5 ","6 "," 6 ","5 "," 7 ","ZD","Get Layouts","BaseScannerLayout","Addons","BaseScanner Layout","openWindow","setEnabled","ZB","Loader","gui","ZR","getColumnName","isColumnVisible","index","ZO","+","ZI","addAfter","-","remove","right","setAlignX","ZF","Addons.BaseScannerGUI.createOptions: ","\x3Ca href=\x22https://sites.google.com/site/blindmanxdonate\x22 target=\x22_blank\x22\x3ESupport Development of BlinDManX Addons\x3C/a\x3E","ZP","getModel","getSelection","get_PosX","get_PosY","set_CurrentCityId","ZT","prototype","WorldObjectCity","WorldSector","$ctor","ClientLib.Data.WorldSector.WorldObjectCity","getLevel","Error - ClientLib.Data.WorldSector.WorldObjectCity.Level undefined","error","getID","Error - ClientLib.Data.WorldSector.WorldObjectCity.ID undefined","WorldObjectNPCBase","ClientLib.Data.WorldSector.WorldObjectNPCBase","Error - ClientLib.Data.WorldSector.WorldObjectNPCBase.Level undefined","Error - ClientLib.Data.WorldSector.WorldObjectNPCBase.ID undefined","WorldObjectNPCCamp","ClientLib.Data.WorldSector.WorldObjectNPCCamp","Error - ClientLib.Data.WorldSector.WorldObjectNPCCamp.Level undefined","getCampType","Error - ClientLib.Data.WorldSector.WorldObjectNPCCamp.CampType undefined","Error - ClientLib.Data.WorldSector.WorldObjectNPCCamp.ID undefined","Pause","window.Addons.BaseScannerGUI.getInstance().FJ()","setTimeout","window.Addons.BaseScannerGUI.getInstance().FG()","/","ZM","get_World","Scanning from: ","get_Name","get_MaxAttackDistance","get_Server","sqrt","Type","function","push","sortByColumn","name","DR01D","Maelstrom_Basescanner FJ error: ","data null: ","warn","data[i] null: ","get_PlayerId","get_AllianceId","get_IsGhostMode","get_CityUnitsData","d","get_Buildings","get_DefenseUnits","get_OffenseUnits","EResourceType","Base","Gold","ResearchPoints","ZA","get_Health","get_MdbUnitId","get_CoordY","HPRecord"," finish","countlastidchecked"," on "," removed (GetBuildingsConditionInPercent == 0)","splice"," removed (IsGhostMode)","lastid"," removed (found no data)","MaelstromTools_Basescanner getResources","ZS","define","Class","Addons.BaseScannerLayout","Addons.BaseScannerLayout ","ZW","Addons.BaseScannerLayout.construct: ","Addons.BaseScannerLayout.openWindow: ","ZE null: ","\x3Ctable border=\x222\x22 cellspacing=\x220\x22 cellpadding=\x220\x22\x3E"," - ","\x3Ctr\x3E\x3Ctd colspan=\x229\x22\x3E\x3Cfont color=\x22#FFF\x22\x3E","\x3C/font\x3E\x3C/td\x3E\x3C/tr\x3E","\x3Ctr\x3E","\x3Cimg width=\x2214\x22 height=\x2214\x22 src=\x22","\x22\x3E","Emptypixels","\x3Ctd\x3E","\x3C/td\x3E","\x3C/tr\x3E","\x3C/table\x3E","#303030","cid","click","setReturnValue","Addons.LocalStorage","static","undefined","isSupported","stringify","Addons.LocalStorage.setglobal: ","isdefined","parse","Addons.LocalStorage.getglobal: ","object","LocalStorage data from server not null, but not object","LocalStorage data from server not null, but parsererror","Addons.LocalStorage.setserver: ","isdefineddata","Addons.LocalStorage.getserver: ","Addons.Language","main","hasOwnProperty","Translate Added ","Addons.Language.addtranslateobj main not define","getLocale","Manager","locale","_","Addons.Language.get "," not translate for locale ","qx.ui.table.cellrenderer.Replace","Default","Function","value","getReplaceMap","getReplaceFunction","escape","String","bom","Maelstrom_Basescanner initalisiert","Point","Position","addtranslateobj","BaseScanner Overview","Basescanner Ãœbersicht","VisÃ£o geral do scanner de base","AperÃ§u du scanner de base","Scannen","Esquadrinhar","Balayer","Lage","localizaÃ§Ã£o","Emplacement","Spieler","Jogador","Joueur","Camp,Outpost","Lager,Vorposten","Camp,posto avanÃ§ado","Camp,avant-poste","Lager","Vorposten","posto avanÃ§ado","avant-poste","Layout da Base de Dados de Scanner","Mise scanner de base","Show Layouts","Layouts anzeigen","Mostrar Layouts","Voir Layouts","GebÃ¤udezustand","construÃ§Ã£o do Estado","construction de l\x27Ã‰tat","Verteidigungszustand","de Defesa do Estado","dÃ©fense de l\x27Etat","KP","KP begrenzen","CP limitar","CP limiter","min. Level","nÃ­vel mÃ­nimo","niveau minimum","Cache leeren","limpar cache","vider le cache","Nur auf Welt zentrieren","Ãšnico centro no Mundial","Seul centre sur World","Basis errichtbar","base de configurar a","mis en place Ã  la base","Infantry","Infanterie","Infantaria","Vehicle","Fahrzeuge","VeÃ­culos","Vehicule","Aircraft","Flugzeuge","Aeronaves","Aviation","TibÃ©rio","Kristalle","Cristal","Power","Strom","PotÃªncia","Energie","Credits","CrÃ©ditos","CrÃ©dit","Forschung","InvestigaÃ§Ã£o","Recherche","-----","--","FileManager","File","BaseScanner","ui/icons/icon_item.png","createNewImage","ui/menues/main_menu/misc_empty_pixel.png","version ","desktopPosition","createDesktopButton"," version ","addToMainMenu","AddonMainMenu","Basescanner","ALT+B","Wrapper","Count","get_HitpointsPercent","MaelstromTools_Basescanner getResourcesPart","replace","match","Error - ","not found","MaelstromTools_Basescanner_checkIfLoaded: ","domain","test"];window[e[0]]=e[1];function j(){qx[e[312]][e[311]](e[2],{type:e[3],extend:qx[e[6]][e[5]][e[4]],construct:function(){try{this[e[7]](arguments);console[e[9]](e[8]+window[e[0]]);this[e[10]]=Addons[e[12]][e[11]]();this[e[13]](820);this[e[14]](400);this[e[15]](10);this[e[16]](true);this[e[17]](true);this[e[18]](true);this[e[19]](true);this[e[20]](true);this[e[21]](true);this[e[22]](true);this[e[23]](false);this[e[24]](null);this[e[25]](5);this[e[27]](new qx[e[6]][e[26]].VBox(3));this[e[29]][e[28]]=e[30];this.FI();this.FH();this.FD();if(this[e[31]]==null){this[e[31]]=[];}this[e[25]](0);this[e[32]]();this[e[33]](this.ZF);this[e[33]](this.ZN);this[e[33]](this.ZP);this[e[35]][e[34]](this.ZE);}catch(t){console[e[37]](e[36],t);}},members:{stats:document[e[39]](e[38]),T:null,ZA:0,ZB:null,ZC:null,ZD:null,ZE:null,ZF:null,ZG:null,ZH:false,ZI:true,ZJ:null,ZK:null,ZL:null,ZM:null,ZN:null,ZO:null,ZP:null,ZQ:null,ZR:[],ZT:true,ZU:null,ZV:null,ZX:null,ZY:null,ZZ:[],ZS:{},YZ:null,YY:null,openWindow:function(w){try{this[e[40]](w);if(this[e[41]]()){this[e[42]]();}else{q[e[43]]();q=window[e[45]][e[44]][e[11]]();var v;this[e[46]][e[32]]();for(v in q[e[47]]){var u=new qx[e[6]][e[48]].ListItem(v,null,q[e[47]][v].Object);this[e[46]][e[33]](u);if(Addons[e[51]][e[50]](e[49])==q[e[47]][v][e[53]][e[52]]()){this[e[46]][e[54]]([u]);}}this[e[55]]();this[e[56]](100,100);}}catch(t){console[e[58]](e[57],t);}},FI:function(){try{this[e[35]]=new qx[e[6]][e[60]][e[59]].Simple();this[e[35]][e[82]]([e[61],e[62],this[e[10]][e[64]](e[63]),this[e[10]][e[64]](e[65]),this[e[10]][e[64]](e[66]),this[e[10]][e[64]](e[67]),this[e[10]][e[64]](e[68]),this[e[10]][e[64]](e[69]),this[e[10]][e[64]](e[70]),e[71],e[72],this[e[10]][e[64]](e[73]),this[e[10]][e[64]](e[74]),this[e[10]][e[64]](e[75]),e[76],e[77],e[78],e[79],e[80],this[e[10]][e[64]](e[81])]);this[e[83]]=ClientLib[e[86]][e[85]].GetInstance()[e[84]]();this[e[87]]=new qx[e[6]][e[60]].Table(this.ZL);this[e[87]][e[88]](false);this[e[87]][e[89]](0,0);this[e[87]][e[89]](1,0);this[e[87]][e[89]](2,Addons[e[51]][e[50]](e[90],120));this[e[87]][e[89]](3,Addons[e[51]][e[50]](e[91],60));this[e[87]][e[89]](4,Addons[e[51]][e[50]](e[92],50));this[e[87]][e[89]](5,Addons[e[51]][e[50]](e[93],60));this[e[87]][e[89]](6,Addons[e[51]][e[50]](e[94],60));this[e[87]][e[89]](7,Addons[e[51]][e[50]](e[95],60));this[e[87]][e[89]](8,Addons[e[51]][e[50]](e[96],60));this[e[87]][e[89]](9,Addons[e[51]][e[50]](e[97],30));this[e[87]][e[89]](10,Addons[e[51]][e[50]](e[98],30));this[e[87]][e[89]](11,Addons[e[51]][e[50]](e[99],50));this[e[87]][e[89]](12,Addons[e[51]][e[50]](e[100],50));this[e[87]][e[89]](13,Addons[e[51]][e[50]](e[101],30));this[e[87]][e[89]](14,Addons[e[51]][e[50]](e[102],60));this[e[87]][e[89]](15,Addons[e[51]][e[50]](e[103],60));this[e[87]][e[89]](16,Addons[e[51]][e[50]](e[104],60));this[e[87]][e[89]](17,Addons[e[51]][e[50]](e[105],50));this[e[87]][e[89]](18,Addons[e[51]][e[50]](e[106],50));this[e[87]][e[89]](19,Addons[e[51]][e[50]](e[107],40));var u=0;var t=this[e[87]][e[108]]();for(u=0;u<this[e[35]][e[109]]();u++){if(u==0||u==1||u==11||u==12){t[e[111]](u,Addons[e[51]][e[50]](e[110]+u,false));}else{t[e[111]](u,Addons[e[51]][e[50]](e[110]+u,true));}}t[e[111]](1,false);t[e[115]](9,new qx[e[6]][e[60]][e[114]].Icon(p[e[113]][MaelstromTools[e[112]][e[68]]]),e[71]);t[e[115]](10,new qx[e[6]][e[60]][e[114]].Icon(p[e[113]][MaelstromTools[e[112]][e[67]]],e[72]));t[e[119]](5,new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction:this[e[116]]}));t[e[119]](6,new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction:this[e[116]]}));t[e[119]](7,new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction:this[e[116]]}));t[e[119]](8,new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction:this[e[116]]}));t[e[119]](15,new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction:this[e[116]]}));t[e[119]](16,new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction:this[e[116]]}));t[e[119]](19,new qx[e[6]][e[60]][e[118]].Boolean());this[e[87]][e[122]](e[120],function(w){Addons[e[121]][e[11]]().FB(w);},this);t[e[122]](e[123],function(y){var x=y[e[125]]()[e[124]];var w=y[e[125]]()[e[126]];Addons[e[51]][e[128]](e[127]+x,w);},t);}catch(v){console[e[37]](e[129],v);}},FB:function(y){try{var A=this[e[31]][y[e[130]]()][0];var z=this[e[31]][y[e[130]]()][3];if(z!=null&&z[e[133]](e[132])[e[131]]==2){var x=parseInt(z[e[133]](e[132])[0]);var w=parseInt(z[e[133]](e[132])[1]);ClientLib[e[135]][e[134]].GetInstance().CenterGridPosition(x,w);}if(A&&!(this[e[137]][4][e[136]]())){var u=qx[e[140]][e[139]][e[138]]();u[e[142]]()[e[141]]();u[e[146]]()[e[145]](ClientLib[e[86]][e[144]][e[143]],A,0,0);}var t=ClientLib[e[86]][e[85]].GetInstance()[e[148]]()[e[147]]();if(t!=null){t[e[150]]()[e[149]](A);}}catch(v){console[e[37]](e[151],v);}},FN:function(t){this[e[154]][e[153]](this[e[10]][e[64]](e[152]));this[e[155]]=false;},CBChanged:function(t){this[e[155]]=false;},FA:function(t){var u=new qx[e[157]][e[156]].NumberFormat();u[e[158]](true);u[e[159]](3);if(!isNaN(t)){if(Math[e[160]](t)<100000){t=u[e[156]](Math[e[161]](t));}else{if(Math[e[160]](t)>=100000&&Math[e[160]](t)<1000000){t=u[e[156]](Math[e[161]](t/100)/10)+e[162];}else{if(Math[e[160]](t)>=1000000&&Math[e[160]](t)<10000000){t=u[e[156]](Math[e[161]](t/1000)/1000)+e[163];}else{if(Math[e[160]](t)>=10000000&&Math[e[160]](t)<100000000){t=u[e[156]](Math[e[161]](t/10000)/100)+e[163];}else{if(Math[e[160]](t)>=100000000&&Math[e[160]](t)<1000000000){t=u[e[156]](Math[e[161]](t/100000)/10)+e[163];}else{if(Math[e[160]](t)>=1000000000&&Math[e[160]](t)<10000000000){t=u[e[156]](Math[e[161]](t/1000000)/1000)+e[164];}else{if(Math[e[160]](t)>=10000000000&&Math[e[160]](t)<100000000000){t=u[e[156]](Math[e[161]](t/10000000)/100)+e[164];}else{if(Math[e[160]](t)>=100000000000&&Math[e[160]](t)<1000000000000){t=u[e[156]](Math[e[161]](t/100000000)/10)+e[164];}else{if(Math[e[160]](t)>=1000000000000&&Math[e[160]](t)<10000000000000){t=u[e[156]](Math[e[161]](t/1000000000)/1000)+e[10];}else{if(Math[e[160]](t)>=10000000000000&&Math[e[160]](t)<100000000000000){t=u[e[156]](Math[e[161]](t/10000000000)/100)+e[10];}else{if(Math[e[160]](t)>=100000000000000&&Math[e[160]](t)<1000000000000000){t=u[e[156]](Math[e[161]](t/100000000000)/10)+e[10];}else{if(Math[e[160]](t)>=1000000000000000){t=u[e[156]](Math[e[161]](t/1000000000000))+e[10];}}}}}}}}}}}}}return t.toString();},FH:function(){try{var D=new qx[e[6]][e[26]].Flow();var C=new qx[e[6]][e[165]].Composite(D);this[e[46]]=new qx[e[6]][e[48]].SelectBox();this[e[46]][e[14]](25);this[e[46]][e[166]](5);q[e[43]]();q=window[e[45]][e[44]][e[11]]();var G;for(G in q[e[47]]){var F=new qx[e[6]][e[48]].ListItem(G,null,q[e[47]][G].Object);this[e[46]][e[33]](F);if(Addons[e[51]][e[50]](e[49])==q[e[47]][G][e[53]][e[52]]()){this[e[46]][e[54]]([F]);}}this[e[46]][e[122]](e[167],function(H){this.FP(0,1,200);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));},this);C[e[33]](this.ZC);var B=new qx[e[6]][e[170]].Label()[e[117]]({value:this[e[10]][e[64]](e[168]),textColor:e[169],margin:5});C[e[33]](B);this[e[171]]=new qx[e[6]][e[48]].SelectBox();this[e[171]][e[13]](50);this[e[171]][e[14]](25);this[e[171]][e[166]](5);var z=Addons[e[51]][e[50]](e[172],25);for(var x=11;x<41;x+=1){F=new qx[e[6]][e[48]].ListItem(e[173]+x,null,x);this[e[171]][e[33]](F);if(z==x){this[e[171]][e[54]]([F]);}}this[e[171]][e[122]](e[167],function(H){this[e[31]]=[];this.FP(0,1,200);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));},this);C[e[33]](this.ZQ);var v=new qx[e[6]][e[170]].Label()[e[117]]({value:this[e[10]][e[64]](e[174]),textColor:e[169],margin:5});C[e[33]](v);var u=Addons[e[51]][e[50]](e[175],e[176]);this[e[177]]=new qx[e[6]][e[48]].TextField(u)[e[117]]({width:50});C[e[33]](this.ZY);this[e[137]]=[];this[e[137]][0]=new qx[e[6]][e[48]].CheckBox(this[e[10]][e[64]](e[178]));this[e[137]][0][e[166]](5);this[e[137]][0][e[179]](e[169]);this[e[137]][0][e[181]](Addons[e[51]][e[50]](e[180],false));this[e[137]][0][e[122]](e[182],function(H){this[e[31]]=[];this.FP(0,1,200);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));},this);C[e[33]](this[e[137]][0]);this[e[137]][1]=new qx[e[6]][e[48]].CheckBox(this[e[10]][e[64]](e[183]));this[e[137]][1][e[166]](5);this[e[137]][1][e[179]](e[169]);this[e[137]][1][e[181]](Addons[e[51]][e[50]](e[184],false));this[e[137]][1][e[122]](e[182],function(H){this[e[31]]=[];this.FP(0,1,200);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));},this);C[e[33]](this[e[137]][1]);this[e[137]][2]=new qx[e[6]][e[48]].CheckBox(this[e[10]][e[64]](e[185]));this[e[137]][2][e[166]](5);this[e[137]][2][e[179]](e[169]);this[e[137]][2][e[181]](Addons[e[51]][e[50]](e[186],false));this[e[137]][2][e[122]](e[182],function(H){this[e[31]]=[];this.FP(0,1,200);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));},this);C[e[33]](this[e[137]][2]);this[e[137]][3]=new qx[e[6]][e[48]].CheckBox(this[e[10]][e[64]](e[187]));this[e[137]][3][e[166]](5);this[e[137]][3][e[179]](e[169]);this[e[137]][3][e[181]](Addons[e[51]][e[50]](e[188],true));this[e[137]][3][e[122]](e[182],function(H){this[e[31]]=[];this.FP(0,1,200);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));},this);C[e[33]](this[e[137]][3],{lineBreak:true});this[e[154]]=new qx[e[6]][e[48]].Button(this[e[10]][e[64]](e[152]))[e[117]]({width:100,minWidth:100,maxWidth:100,height:25,margin:5});this[e[154]][e[122]](e[189],function(){this.FE();},this);C[e[33]](this.ZG);var t=new qx[e[6]][e[192]].Single(2,e[190],e[191]);this[e[193]]=new qx[e[6]][e[165]].Composite(new qx[e[6]][e[26]].Basic())[e[117]]({decorator:t,backgroundColor:e[194],allowGrowX:false,height:20,width:200});this[e[195]]=new qx[e[6]][e[140]].Widget()[e[117]]({decorator:null,backgroundColor:e[196],width:0});this[e[193]][e[33]](this.ZU);this[e[197]]=new qx[e[6]][e[170]].Label(e[173])[e[117]]({decorator:null,textAlign:e[198],width:200});this[e[193]][e[33]](this.ZX,{left:0,top:-3});C[e[33]](this.ZV);this[e[199]]=new qx[e[6]][e[48]].Button(this[e[10]][e[64]](e[200]))[e[117]]({minWidth:100,height:25,margin:5});this[e[199]][e[122]](e[189],function(){this[e[201]]=[];},this);C[e[33]](this.YZ);this[e[137]][4]=new qx[e[6]][e[48]].CheckBox(this[e[10]][e[64]](e[202]));this[e[137]][4][e[166]](5);this[e[137]][4][e[179]](e[169]);C[e[33]](this[e[137]][4],{lineBreak:true});this[e[203]]=new qx[e[6]][e[48]].SelectBox();this[e[203]][e[13]](150);this[e[203]][e[14]](25);this[e[203]][e[166]](5);var F=new qx[e[6]][e[48]].ListItem(e[204]+this[e[10]][e[64]](MaelstromTools[e[112]].Tiberium)+e[205]+this[e[10]][e[64]](MaelstromTools[e[112]].Crystal),null,7);this[e[203]][e[33]](F);F=new qx[e[6]][e[48]].ListItem(e[206]+this[e[10]][e[64]](MaelstromTools[e[112]].Tiberium)+e[207]+this[e[10]][e[64]](MaelstromTools[e[112]].Crystal),null,6);this[e[203]][e[33]](F);F=new qx[e[6]][e[48]].ListItem(e[208]+this[e[10]][e[64]](MaelstromTools[e[112]].Tiberium)+e[209]+this[e[10]][e[64]](MaelstromTools[e[112]].Crystal),null,5);this[e[203]][e[33]](F);C[e[33]](this.ZJ);this[e[210]]=new qx[e[6]][e[48]].Button(this[e[10]][e[64]](e[211]))[e[117]]({width:120,minWidth:120,maxWidth:120,height:25,margin:5});this[e[210]][e[122]](e[189],function(){var H=window[e[213]][e[212]][e[11]]();H[e[215]](this[e[10]][e[64]](e[214]));},this);this[e[210]][e[216]](false);C[e[33]](this.ZD);this[e[217]]=new qx[e[6]][e[165]].Composite();this[e[217]][e[27]](new qx[e[6]][e[26]].Flow());this[e[217]][e[13]](750);var A=webfrontend[e[219]][e[26]][e[218]][e[11]]();var y=2;for(y=2;y<this[e[35]][e[109]]();y++){var w=y-2;this[e[220]][w]=new qx[e[6]][e[48]].CheckBox(this[e[35]][e[221]](y));this[e[220]][w][e[181]](this[e[87]][e[108]]()[e[222]](y));this[e[220]][w][e[179]](e[169]);this[e[220]][w][e[223]]=y;this[e[220]][w][e[60]]=this[e[87]];this[e[220]][w][e[122]](e[182],function(H){var I=this[e[60]][e[108]]();I[e[111]](this[e[223]],H[e[125]]());Addons[e[51]][e[128]](e[110]+this[e[223]],H[e[125]]());});this[e[217]][e[33]](this[e[220]][w]);}this[e[224]]=new qx[e[6]][e[48]].Button(e[225])[e[117]]({margin:5});this[e[224]][e[122]](e[189],function(){if(this[e[226]]){C[e[227]](this.ZB,this.ZO);this[e[224]][e[153]](e[228]);}else{C[e[229]](this.ZB);this[e[224]][e[153]](e[225]);}this[e[226]]=!this[e[226]];},this);this[e[224]][e[231]](e[230]);C[e[33]](this.ZO,{lineBreak:true});this[e[232]]=C;}catch(E){console[e[37]](e[233],E);}},FD:function(){var v=ClientLib[e[86]][e[85]].GetInstance()[e[148]]();var t=v[e[147]]();var u=e[234];var w=new qx[e[6]][e[170]].Label()[e[117]]({value:u,rich:true,width:800});this[e[235]]=w;},FE:function(){var u=this[e[46]][e[237]]()[0][e[236]]();ClientLib[e[135]][e[134]].GetInstance().CenterGridPosition(u[e[238]](),u[e[239]]());ClientLib[e[135]][e[134]].GetInstance().Update();ClientLib[e[135]][e[134]].GetInstance().ViewUpdate();ClientLib[e[86]][e[85]].GetInstance()[e[148]]()[e[240]](u[e[52]]());if(this[e[241]]){var t=ClientLib[e[86]][e[244]][e[243]][e[242]];var y=g(t[e[245]],/this\.(.{6})=\(?\(?g>>8\)?\&.*d\+=f;this\.(.{6})=\(/,e[246],2);if(y!=null&&y[1][e[131]]==6){t[e[247]]=function(){return this[y[1]];};}else{console[e[249]](e[248]);}if(y!=null&&y[2][e[131]]==6){t[e[250]]=function(){return this[y[2]];};}else{console[e[249]](e[251]);}t=ClientLib[e[86]][e[244]][e[252]][e[242]];var x=g(t[e[245]],/100\){0,1};this\.(.{6})=Math.floor.*d\+=f;this\.(.{6})=\(/,e[253],2);if(x!=null&&x[1][e[131]]==6){t[e[247]]=function(){return this[x[1]];};}else{console[e[249]](e[254]);}if(x!=null&&x[2][e[131]]==6){t[e[250]]=function(){return this[x[2]];};}else{console[e[249]](e[255]);}t=ClientLib[e[86]][e[244]][e[256]][e[242]];var w=g(t[e[245]],/100\){0,1};this\.(.{6})=Math.floor.*this\.(.{6})=\(*g\>\>(22|0x16)\)*\&.*=-1;\}this\.(.{6})=\(/,e[257],4);if(w!=null&&w[1][e[131]]==6){t[e[247]]=function(){return this[w[1]];};}else{console[e[249]](e[258]);}if(w!=null&&w[2][e[131]]==6){t[e[259]]=function(){return this[w[2]];};}else{console[e[249]](e[260]);}if(w!=null&&w[4][e[131]]==6){t[e[250]]=function(){return this[w[4]];};}else{console[e[249]](e[261]);}this[e[241]]=false;}if(this[e[31]]==null){this[e[155]]=false;this[e[154]][e[153]](e[262]);this[e[210]][e[216]](false);window[e[264]](e[263],1000);return;}var v=0;for(i=0;i<this[e[31]][e[131]];i++){if(this[e[31]][i][1]==-1){v++;}}if(!this[e[155]]){this[e[154]][e[153]](e[262]);this[e[210]][e[216]](false);if(v>0){this[e[155]]=true;window[e[264]](e[265],1000);return;}else{this[e[155]]=false;window[e[264]](e[263],1000);}}else{this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));}},FP:function(v,u,t){if(this[e[195]]!=null&&this[e[197]]!=null){this[e[195]][e[13]](parseInt(v/u*t,10));this[e[197]][e[181]](v+e[266]+u);}},FJ:function(){try{this[e[267]]={};this[e[31]]=[];var N=this[e[46]][e[237]]()[0][e[236]]();Addons[e[51]][e[128]](e[49],N[e[52]]());var G=this[e[171]][e[237]]()[0][e[236]]();Addons[e[51]][e[128]](e[172],G);Addons[e[51]][e[128]](e[175],this[e[177]][e[136]]());var M=this[e[137]][0][e[136]]();var L=this[e[137]][1][e[136]]();var K=this[e[137]][2][e[136]]();var J=this[e[137]][3][e[136]]();var I=parseInt(this[e[177]][e[136]](),10);Addons[e[51]][e[128]](e[180],M);Addons[e[51]][e[128]](e[184],L);Addons[e[51]][e[128]](e[186],K);Addons[e[51]][e[128]](e[188],J);var F=N[e[238]]();var E=N[e[239]]();var H=0;var C=0;var B=ClientLib[e[86]][e[85]].GetInstance()[e[268]]();console[e[9]](e[269]+N[e[270]]());var A=true;var y=true;var w=true;var u=ClientLib[e[86]][e[85]].GetInstance()[e[272]]()[e[271]]();for(C=E-Math[e[161]](u+1);C<=E+Math[e[161]](u+1);C++){for(H=F-Math[e[161]](u+1);H<=F+Math[e[161]](u+1);H++){var t=Math[e[160]](F-H);var R=Math[e[160]](E-C);var Q=Math[e[273]]((t*t)+(R*R));if(Q<=u){var P=B.GetObjectFromPosition(H,C);var z={};if(P){if(P[e[274]]==1&&A){}if(P[e[274]]==2&&y){}if(P[e[274]]==3&&w){}if(P[e[274]]==3){if(I<=parseInt(P[e[247]](),10)){}}var x=N.CalculateAttackCommandPointCostToCoord(H,C);if(x<=G&&typeof P[e[247]]==e[275]){if(I<=parseInt(P[e[247]](),10)){var v=this.FL(P[e[250]](),0);var D=this.FL(P[e[250]](),1);if(D!=null){this[e[267]][P[e[250]]()]=D;}if(P[e[274]]==1&&M){if(v!=null){this[e[31]][e[276]](v);}else{this[e[31]][e[276]]([P[e[250]](),-1,this[e[10]][e[64]](e[178]),H+e[132]+C,P[e[247]](),0,0,0,0,0,0,0,0,x,0,0,0,0]);}}if(P[e[274]]==2&&L){if(v!=null){this[e[31]][e[276]](v);}else{this[e[31]][e[276]]([P[e[250]](),-1,this[e[10]][e[64]](e[183]),H+e[132]+C,P[e[247]](),0,0,0,0,0,0,0,0,x,0,0,0,0]);}}if(P[e[274]]==3&&(K||J)){if(v!=null){if(P[e[259]]()==2&&J){this[e[31]][e[276]](v);}if(P[e[259]]()==3&&K){this[e[31]][e[276]](v);}}else{if(P[e[259]]()==2&&J){this[e[31]][e[276]]([P[e[250]](),-1,this[e[10]][e[64]](e[187]),H+e[132]+C,P[e[247]](),0,0,0,0,0,0,0,0,x,0,0,0,0]);}if(P[e[259]]()==3&&K){this[e[31]][e[276]]([P[e[250]](),-1,this[e[10]][e[64]](e[185]),H+e[132]+C,P[e[247]](),0,0,0,0,0,0,0,0,x,0,0,0,0]);}}}}}}}}}this[e[155]]=true;this[e[35]][e[34]](this.ZE);this.FP(0,this[e[31]][e[131]],200);this[e[35]][e[277]](4,false);if(this[e[83]][e[278]]!=e[279]){window[e[264]](e[265],50);}}catch(O){console[e[37]](e[280],O);}},FG:function(){try{var u=false;var t=0;var X=10;var y=0;var R=150;while(!u){var Q=null;var O=0;var M=0;if(this[e[31]]==null){console[e[282]](e[281]);this[e[155]]=false;break;}for(y=0;y<this[e[31]][e[131]];y++){if(this[e[31]][y][1]==-1){break;}}if(y==this[e[31]][e[131]]){this[e[155]]=false;}this.FP(y,this[e[31]][e[131]],200);if(this[e[31]][y]==null){console[e[282]](e[283]);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));this[e[210]][e[216]](true);break;}posData=this[e[31]][y][3];if(posData!=null&&posData[e[133]](e[132])[e[131]]==2){posX=parseInt(posData[e[133]](e[132])[0]);posY=parseInt(posData[e[133]](e[132])[1]);var K=ClientLib[e[86]][e[85]].GetInstance()[e[148]]()[e[147]]();var v=ClientLib[e[86]][e[85]].GetInstance()[e[268]]();var I=v.CheckFoundBase(posX,posY,K[e[284]](),K[e[285]]());this[e[31]][y][19]=(I==0)?true:false;M=this[e[31]][y][0];ClientLib[e[86]][e[85]].GetInstance()[e[148]]()[e[240]](M);Q=ClientLib[e[86]][e[85]].GetInstance()[e[148]]().GetCity(M);if(Q!=null){if(!Q[e[286]]()){var E=Q[e[287]]();if(E!=null){var T=this[e[46]][e[237]]()[0][e[236]]();var C=Q[e[289]]()[e[288]];var z=E[e[290]]()[e[288]];var w=T[e[287]]()[e[291]]()[e[288]];if(C!=null){var P=d(C);var L=d(z);this[e[31]][y][2]=Q[e[270]]();this[e[31]][y][5]=P[ClientLib[e[293]][e[292]][e[67]]]+L[ClientLib[e[293]][e[292]][e[67]]];this[e[31]][y][6]=P[ClientLib[e[293]][e[292]][e[68]]]+L[ClientLib[e[293]][e[292]][e[68]]];this[e[31]][y][7]=P[ClientLib[e[293]][e[292]][e[294]]]+L[ClientLib[e[293]][e[292]][e[294]]];this[e[31]][y][8]=P[ClientLib[e[293]][e[292]][e[295]]]+L[ClientLib[e[293]][e[292]][e[295]]];if(Q.GetBuildingsConditionInPercent()!=0){this[e[296]]=0;if(this[e[31]][y][5]!=0){var S=0;var J=0;var B=0;var H=0;var G=0;this[e[267]][M]=new Array(9);for(B=0;B<9;B++){this[e[267]][M][B]=new Array(8);}for(H=0;H<9;H++){for(G=0;G<8;G++){switch(Q.GetResourceType(H,G)){case 1:this[e[267]][M][H][G]=1;S++;break;case 2:this[e[267]][M][H][G]=2;J++;break;default:break;}}}this[e[31]][y][9]=S;this[e[31]][y][10]=J;this[e[31]][y][11]=Q.GetBuildingsConditionInPercent();this[e[31]][y][12]=Q.GetDefenseConditionInPercent();try{var F=w;var D=0;var A=0;for(var V in F){D+=F[V][e[297]]();}F=z;for(var V in F){A+=F[V][e[297]]();}F=C;for(var V in F){var U=F[V][e[298]]();if(U==158||U==131||U==195){this[e[31]][y][18]=8-F[V][e[299]]();}if(U==112||U==151||U==177){this[e[31]][y][17]=8-F[V][e[299]]();}}}catch(N){console[e[37]](e[300],N);}this[e[31]][y][14]=(A/D);this[e[31]][y][15]=this[e[31]][y][5]+this[e[31]][y][6]+this[e[31]][y][7];this[e[31]][y][16]=this[e[31]][y][15]/this[e[31]][y][13];this[e[31]][y][1]=0;u=true;console[e[9]](Q[e[270]](),e[301]);this[e[296]]=0;this[e[302]]=0;this.FK(this[e[31]][y],this[e[267]][M],M);this[e[35]][e[34]](this.ZE);}}else{if(this[e[296]]>250){console[e[9]](this[e[31]][y][2],e[303],posX,posY,e[304]);this[e[31]][e[305]](y,1);this[e[296]]=0;this[e[302]]=0;break;}this[e[296]]++;}}}}else{console[e[9]](this[e[31]][y][2],e[303],posX,posY,e[306]);this[e[31]][e[305]](y,1);break;}}}t++;if(t>=X){u=true;break;}}if(this[e[307]]!=y){this[e[307]]=y;this[e[302]]=0;this[e[296]]=0;}else{if(this[e[302]]>16){console[e[9]](this[e[31]][y][2],e[303],posX,posY,e[308]);this[e[31]][e[305]](y,1);this[e[302]]=0;}else{if(this[e[302]]>10){R=500;}else{if(this[e[302]]>4){R=250;}}}this[e[302]]++;}if(this[e[155]]&&Addons[e[121]][e[11]]()[e[41]]()){window[e[264]](e[265],R);}else{this[e[154]][e[153]](this[e[10]][e[64]](e[152]));this[e[155]]=false;}}catch(W){console[e[37]](e[309],W);}},FK:function(v,u,t){this[e[201]][e[276]](v);this[e[310]][t]=u;},FL:function(u,v){if(v==0){for(var t=0;t<this[e[201]][e[131]];t++){if(this[e[201]][t][0]==u){return this[e[201]][t];}}}else{if(this[e[310]][u]){return this[e[310]][u];}}return null;}}});qx[e[312]][e[311]](e[313],{type:e[3],extend:qx[e[6]][e[5]][e[4]],construct:function(){try{this[e[7]](arguments);console[e[9]](e[314]+window[e[0]]);this[e[13]](820);this[e[14]](400);this[e[15]](10);this[e[16]](false);this[e[17]](true);this[e[18]](true);this[e[19]](true);this[e[20]](true);this[e[21]](false);this[e[22]](true);this[e[23]](false);this[e[24]](null);this[e[25]](10);this[e[27]](new qx[e[6]][e[26]].Grow());this[e[315]]=[];this[e[32]]();this[e[201]]=new qx[e[6]][e[165]].Scroll();this[e[177]]=new qx[e[6]][e[165]].Composite(new qx[e[6]][e[26]].Flow());this[e[33]](this.ZZ,{flex:3});this[e[201]][e[33]](this.ZY);}catch(t){console[e[37]](e[316],t);}},members:{ZW:null,ZZ:null,ZY:null,ZX:null,openWindow:function(u){try{this[e[40]](u);if(this[e[41]]()){this[e[42]]();}else{this[e[55]]();this[e[56]](100,100);this.FO();}}catch(t){console[e[58]](e[317],t);}},FO:function(){var H=window[e[213]][e[121]][e[11]]()[e[267]];var F=window[e[213]][e[121]][e[11]]()[e[31]];this[e[197]]=[];var D=window[e[213]][e[121]][e[11]]()[e[203]][e[237]]()[0][e[236]]();var B=null;if(F==null){console[e[9]](e[318]);return;}this[e[315]]=[];var w;var u;var z;var y;var I;for(w in H){for(u=0;u<F[e[131]];u++){if(F[u][0]==w){B=F[u];}}if(B==null){continue;}if(D>4&&D<8){if(D!=B[10]){continue;}}else{continue;}posData=B[3];if(posData!=null&&posData[e[133]](e[132])[e[131]]==2){posX=parseInt(posData[e[133]](e[132])[0]);posY=parseInt(posData[e[133]](e[132])[1]);}var t=e[319];var G=B[2]+e[320]+B[3];t=t+e[321]+G+e[322];for(y=0;y<8;y++){t=t+e[323];for(z=0;z<9;z++){var E=e[173];var C=H[w][z][y];switch(C==undefined?0:C){case 2:E=e[324]+p[e[113]][MaelstromTools[e[112]][e[67]]]+e[325];break;case 1:E=e[324]+p[e[113]][MaelstromTools[e[112]][e[68]]]+e[325];break;default:E=e[324]+p[e[113]][e[326]]+e[325];break;}t=t+e[327]+E+e[328];}t=t+e[329];}t=t+e[330];var v=new qx[e[6]][e[170]].Label()[e[117]]({backgroundColor:e[331],value:t,rich:true});v[e[332]]=w;this[e[197]][e[276]](w);v[e[122]](e[333],function(L){var K=qx[e[140]][e[139]][e[138]]();K[e[142]]()[e[141]]();K[e[146]]()[e[145]](ClientLib[e[86]][e[144]][e[143]],this[e[332]],0,0);var J=ClientLib[e[86]][e[85]].GetInstance()[e[148]]()[e[147]]();if(J!=null){J[e[150]]()[e[149]](this[e[332]]);}});v[e[334]]=w;this[e[315]][e[276]](v);}this[e[177]][e[32]]();var A=0;var x=0;for(I=0;I<this[e[315]][e[131]];I++){this[e[177]][e[33]](this[e[315]][I],{row:A,column:x});x++;if(x>4){x=0;A++;}}}}});qx[e[312]][e[311]](e[335],{type:e[336],extend:qx[e[140]][e[53]],statics:{isSupported:function(){return typeof(localStorage)!==e[337];},isdefined:function(t){return(localStorage[t]!==e[337]&&localStorage[t]!=null);},isdefineddata:function(u,t){return(u[t]!==e[337]&&u[t]!=null);},setglobal:function(v,t){try{if(Addons[e[51]][e[338]]()){localStorage[v]=JSON[e[339]](t);}}catch(u){console[e[37]](e[340],u);}},getglobal:function(v,u){try{if(Addons[e[51]][e[338]]()){if(Addons[e[51]][e[341]](v)){return JSON[e[342]](localStorage[v]);}}}catch(t){console[e[58]](e[343],t);}return u;},setserver:function(w,t){try{if(Addons[e[51]][e[338]]()){var v=ClientLib[e[86]][e[85]].GetInstance()[e[272]]()[e[270]]();var x;if(Addons[e[51]][e[341]](v)){try{x=JSON[e[342]](localStorage[v]);if(!(typeof x===e[344])){x={};console[e[37]](e[345]);}}catch(u){console[e[37]](e[346],u);x={};}}else{x={};}x[w]=t;localStorage[v]=JSON[e[339]](x);}}catch(u){console[e[37]](e[347],u);}},getserver:function(w,v){try{if(Addons[e[51]][e[338]]()){var u=ClientLib[e[86]][e[85]].GetInstance()[e[272]]()[e[270]]();if(Addons[e[51]][e[341]](u)){var x=JSON[e[342]](localStorage[u]);if(Addons[e[51]][e[348]](x,w)){return x[w];}}}}catch(t){console[e[58]](e[349],t);}return v;}}});if(typeof Addons[e[12]]===e[337]){qx[e[312]][e[311]](e[350],{type:e[3],extend:qx[e[140]][e[53]],members:{d:{},debug:false,addtranslateobj:function(t){if(t[e[352]](e[351])){this[e[288]][t[e[351]].toString()]=t;if(this[e[37]]){console[e[58]](e[353],t[e[351]].toString());}delete t[e[351]];}else{console[e[37]](e[354]);}},get:function(v){var u=qx[e[357]][e[356]][e[11]]()[e[355]]();var t=u[e[133]](e[358])[0];if(this[e[288]][e[352]](v)){if(this[e[288]][v][e[352]](t)){return this[e[288]][v][t];}}if(this[e[37]]){console[e[37]](e[359],v,e[360],t);}return v;}}});}qx[e[312]][e[311]](e[361],{extend:qx[e[6]][e[60]][e[118]][e[362]],properties:{replaceMap:{check:e[53],nullable:true,init:null},replaceFunction:{check:e[363],nullable:true,init:null}},members:{_getContentHtml:function(w){var x=w[e[364]];var v=this[e[365]]();var u=this[e[366]]();var t;if(v){t=v[x];if(typeof t!=e[337]){w[e[364]]=t;return qx[e[369]][e[368]][e[367]](this._formatValue(w));}}if(u){w[e[364]]=u(x);}return qx[e[369]][e[368]][e[367]](this._formatValue(w));},addReversedReplaceMap:function(){var t=this[e[365]]();for(var v in t){var u=t[v];t[u]=v;}return true;}}});console[e[9]](e[370]);var s=Addons[e[12]][e[11]]();s[e[37]]=false;s[e[373]]({main:e[371],de:e[372],pt:e[372],fr:e[372]});s[e[373]]({main:e[374],de:e[375],pt:e[376],fr:e[377]});s[e[373]]({main:e[152],de:e[378],pt:e[379],fr:e[380]});s[e[373]]({main:e[65],de:e[381],pt:e[382],fr:e[383]});s[e[373]]({main:e[178],de:e[384],pt:e[385],fr:e[386]});s[e[373]]({main:e[183],de:e[183],pt:e[183],fr:e[183]});s[e[373]]({main:e[387],de:e[388],pt:e[389],fr:e[390]});s[e[373]]({main:e[187],de:e[391],pt:e[187],fr:e[187]});s[e[373]]({main:e[185],de:e[392],pt:e[393],fr:e[394]});s[e[373]]({main:e[214],de:e[214],pt:e[395],fr:e[396]});s[e[373]]({main:e[397],de:e[398],pt:e[399],fr:e[400]});s[e[373]]({main:e[73],de:e[401],pt:e[402],fr:e[403]});s[e[373]]({main:e[74],de:e[404],pt:e[405],fr:e[406]});s[e[373]]({main:e[75],de:e[407],pt:e[75],fr:e[75]});s[e[373]]({main:e[168],de:e[408],pt:e[409],fr:e[410]});s[e[373]]({main:e[174],de:e[411],pt:e[412],fr:e[413]});s[e[373]]({main:e[200],de:e[414],pt:e[415],fr:e[416]});s[e[373]]({main:e[202],de:e[417],pt:e[418],fr:e[419]});s[e[373]]({main:e[81],de:e[420],pt:e[421],fr:e[422]});s[e[373]]({main:e[423],de:e[424],pt:e[425],fr:e[424]});s[e[373]]({main:e[426],de:e[427],pt:e[428],fr:e[429]});s[e[373]]({main:e[430],de:e[431],pt:e[432],fr:e[433]});s[e[373]]({main:e[67],de:e[67],pt:e[434],fr:e[67]});s[e[373]]({main:e[68],de:e[435],pt:e[436],fr:e[436]});s[e[373]]({main:e[437],de:e[438],pt:e[439],fr:e[440]});s[e[373]]({main:e[69],de:e[441],pt:e[442],fr:e[443]});s[e[373]]({main:e[70],de:e[444],pt:e[445],fr:e[446]});s[e[373]]({main:e[447],de:e[448],pt:e[448],fr:e[448]});var r=null;var q=null;var p=null;var o=null;var n=0;var m=0;o=ClientLib[e[450]][e[449]].GetInstance();r=window[e[45]][e[12]][e[11]]();q=window[e[45]][e[44]][e[11]]();p=window[e[45]][e[293]][e[11]]();p[e[453]](e[451],e[452],o);p[e[453]](e[326],e[454],o);var l=p[e[457]](s[e[64]](e[374])+e[455]+window[e[0]],e[451],false,p[e[456]](2));l[e[122]](e[189],function(){Addons[e[121]][e[11]]()[e[215]](s[e[64]](e[374])+e[458]+window[e[0]]);},this);Addons[e[121]][e[11]]()[e[122]](e[42],Addons[e[121]][e[11]]().FN,Addons[e[121]][e[11]]());p[e[459]](e[451],l);if(typeof Addons[e[460]]!==e[337]){var k=Addons[e[460]][e[11]]();k.AddMainMenu(e[461],function(){Addons[e[121]][e[11]]()[e[215]](s[e[64]](e[374])+e[458]+window[e[0]]);},e[462]);}}function d(o){try{var q=[0,0,0,0,0,0,0,0];if(o==null){return q;}for(var l in o){var n=o[l];var m=MaelstromTools[e[463]].GetUnitLevelRequirements(n);for(var k=0;k<m[e[131]];k++){q[m[k][e[274]]]+=m[k][e[464]]*n[e[465]]();if(n[e[465]]()<1){}}}return q;}catch(p){console[e[37]](e[466],p);}}function f(k){var m;for(m in k){if(typeof(k[m])==e[275]){var l=k[m].toString();console[e[37]](m,l);}}}function g(k,r,q,m){var p=[];var o=k.toString();var n=o[e[467]](/\s/gim,e[173]);p=n[e[468]](r);var l;for(l=1;l<(m+1);l++){if(p!=null&&p[l][e[131]]==6){console[e[37]](q,l,p[l]);}else{if(p!=null&&p[l][e[131]]>0){console[e[282]](q,l,p[l]);}else{console[e[249]](e[469],q,l,e[470]);console[e[282]](q,n);}}}return p;}function h(){try{if(typeof qx!=e[337]&&typeof MaelstromTools!=e[337]){j();}else{window[e[264]](h,1000);}}catch(k){console[e[37]](e[471],k);}}if(/commandandconquer\.com/i[e[473]](document[e[472]])){window[e[264]](h,10000);}};try{var a=document.createElement("script");a.innerHTML="("+b.toString()+")();";a.type="text/javascript";if(/commandandconquer\.com/i.test(document.domain)){document.getElementsByTagName("head")[0].appendChild(a);}}catch(c){console.debug("MaelstromTools_Basescanner: init error: ",c);}})();

// =========================================================================  MaelstromTools ================================================================
// ==UserScript==
// @name        MaelstromTools Dev
// @namespace   MaelstromTools
// @description Just a set of statistics & summaries about repair time and base resources. Mainly for internal use, but you are free to test and comment it.
// @version     0.1.3.2
// @author      Maelstrom, HuffyLuf, KRS_L and Krisan
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// ==/UserScript==
//var offense_units = own_city.get_CityArmyFormationsManager().GetFormationByTargetBaseId(current_city.get_Id()).get_ArmyUnits().l;
//System.Int64 GetForumIdByType (ClientLib.Data.Forum.EForumType eForumType)
//static ClientLib.Data.Forum.EForumType NormalForum
//System.Collections.Generic.List$1 get_ForumsAlliance ()
//System.Void CreateThread (System.Int64 forumId ,System.String threadTitle ,System.String threadPost ,System.Boolean autoSubscribe)
//System.Void CreatePost (System.Int64 forumId ,System.Int64 threadId ,System.String postMessage)
//System.Void StartGetForumThreadData (System.Int64 forumId ,System.Int32 skip ,System.Int32 take)
//System.Void OnForumThreadDataReceived (System.Object context ,System.Object result)
//System.Void add_ThreadsFetched (ClientLib.Data.ForumThreadsFetched value)
//System.Void MarkThreadsAsRead (System.Int64 forumId ,System.Int64[] threadIds)
//
//var score = ClientLib.Base.PointOfInterestTypes.GetScoreByLevel(lvl);
//var scoreNext = ClientLib.Base.PointOfInterestTypes.GetNextScore(score);
//var resBonus = ClientLib.Base.PointOfInterestTypes.GetBonusByType(ClientLib.Base.EPOIType.TiberiumBonus, score);
//var unitBonus = ClientLib.Base.PointOfInterestTypes.GetBonusByType(ClientLib.Base.EPOIType.InfanteryBonus, score);
//console.log("POI lvl" + lvl + "gives " + score + "points, next lvl at " + scoreNext + " points. Resource bonus: " + resBonus + " Unit bonus: " + unitBonus + "%");
/*
 ClientLib.Data.Player
 get_ResearchPoints
 GetCreditsCount
 GetCreditsGrowth
ClientLib.Data.PlayerResearch get_PlayerResearch ()
ClientLib.Data.PlayerResearchItem GetResearchItemFomMdbId (System.Int32 _mdbId)
ClientLib.Data.PlayerResearchItem.System.Object get_NextLevelInfo_Obj ()

var cw=ClientLib.Data.MainData.GetInstance().get_Player().get_Faction();
var cj=ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Research_BaseFound,cw);
var cd=cr.GetResearchItemFomMdbId(cj);
 */
(function () {
  var MaelstromTools_main = function () {
    try {
      function CCTAWrapperIsInstalled() {
        return (typeof (CCTAWrapper_IsInstalled) != 'undefined' && CCTAWrapper_IsInstalled);
      }

      function createMaelstromTools() {
        console.log('MaelstromTools loaded');

        qx.Class.define("MaelstromTools.Language", {
          type: "singleton",
          extend: qx.core.Object,
          construct: function (language) {
            this.Languages = ['de', 'pt', 'fr', 'tr']; // en is default, not needed in here!
            if (language != null) {
              this.MyLanguage = language;
            }
          },
          members: {
            MyLanguage: "en",
            Languages: null,
            Data: null,

            loadData: function (language) {
              var l = this.Languages.indexOf(language);

              if (l < 0) {
                this.Data = null;
                return;
              }

              this.Data = new Object();
              this.Data["Collect all packages"] = ["Alle Pakete einsammeln", "Recolher todos os pacotes", "Récupérez tous les paquets", "Tüm paketleri topla"][l];
              this.Data["Overall production"] = ["Produktionsübersicht", "Produção global", "La production globale", "Genel üretim"][l];
              this.Data["Army overview"] = ["Truppenübersicht", "Vista Geral de Exército", "Armée aperçu", "Ordu önizlemesi"][l];
              this.Data["Base resources"] = ["Basis Ressourcen", "Recursos base", "ressources de base", "Üs önizlemesi"][l];
              this.Data["Main menu"] = ["Hauptmenü", "Menu Principal", "menu principal", "Ana menü"][l];
              this.Data["Repair all units"] = ["Alle Einheiten reparieren", "Reparar todas as unidades", "Réparer toutes les unités", "Tüm üniteleri onar"][l];
              this.Data["Repair all defense buildings"] = ["Alle Verteidigungsgebäude reparieren", "Reparar todos os edifícios de defesa", "Réparer tous les bâtiments de défense", "Tüm savunma binalarini onar"][l];
              this.Data["Repair all buildings"] = ["Alle Gebäurde reparieren", "Reparar todos os edifícios", "Réparer tous les bâtiments", "Tüm binalari onar"][l];
              this.Data["Base status overview"] = ["Basisübersicht", "Estado geral da base", "aperçu de l'état de base", "Üs durumu önizlemesi"][l];
              this.Data["Upgrade priority overview"] = ["Upgrade Übersicht", "Prioridade de upgrades", "aperçu des priorités de mise à niveau", "Yükseltme önceligi önizlemesi"][l];
              this.Data["MaelstromTools Preferences"] = ["MaelstromTools Einstellungen", "Preferências de MaelstromTools", "Préférences MaelstromTools", "MaelstromTools Ayarlari"][l];
              this.Data["Options"] = ["Einstellungen", "Opções", "Options", "Seçenekler"][l];
              this.Data["Target out of range, no resource calculation possible"] = ["Ziel nicht in Reichweite, kann die plünderbaren Ressourcen nicht berechnen", "Alvo fora do alcance, não é possivel calcular os recursos", "Cible hors de portée, pas de calcul de ressources possible",
			  "Hedef menzil disinda, kaynak hesaplamasi olanaksiz"][l];
              this.Data["Lootable resources"] = ["Plünderbare Ressourcen", "Recursos roubáveis", "Ressources à piller", "Yagmalanabilir kaynaklar"][l];
              this.Data["per CP"] = ["pro KP", "por PC", "par PC", "KP basina"][l];
              this.Data["2nd run"] = ["2. Angriff", "2º ataque", "2° attaque", "2. saldiri"][l];
              this.Data["3rd run"] = ["3. Angriff", "3º ataque", "3° attaque", "3. saldiri"][l];
              this.Data["Calculating resources..."] = ["Berechne plünderbare Ressourcen...", "A calcular recursos...", "calcul de ressources ...", "Kaynaklar hesaplaniyor..."][l];
              this.Data["Next MCV"] = ["MBF", "MCV", "VCM"][l];
              this.Data["Show time to next MCV"] = ["Zeige Zeit bis zum nächsten MBF", "Mostrar tempo restante até ao próximo MCV", "Afficher l'heure pour le prochain VCM ", "Sirdaki MCV için gereken süreyi göster"][l];
              this.Data["Show lootable resources (restart required)"] = ["Zeige plünderbare Ressourcen (Neustart nötig)", "Mostrar recursos roubáveis (é necessário reiniciar)", "Afficher les ressources fouiller (redémarrage nécessaire)", "Yagmalanabilir kaynaklari göster (yeniden baslatma gerekli)"][l];
              this.Data["Use dedicated Main Menu (restart required)"] = ["Verwende extra Hauptmenü (Neustart nötig)", "Usar botão para o Menu Principal (é necessário reiniciar)", "Utiliser dédiée du menu principal (redémarrage nécessaire)", "Ana menü tusunu kullan (yeniden baslatma gerekli)"][l];
              this.Data["Autocollect packages"] = ["Sammle Pakete automatisch", "Auto recolher pacotes", "paquets autocollecté", "Paketleri otomatik topla"][l];
              this.Data["Autorepair units"] = ["Repariere Einheiten automatisch", "Auto reparar o exército", "unités autoréparé", "Üniteleri otomatik onar"][l];
              this.Data["Autorepair defense (higher prio than buildings)"] = ["Repariere Verteidigung automatisch (höhere Prio als Gebäude)", "Auto reparar defesa (maior prioridade do que os edifícios)", "réparation automatique la défense (priorité plus élevé que les bâtiments) ", "Savunmayi otomatik onar (binalardan daha yüksek öncelikli olarak)"][l];
              this.Data["Autorepair buildings"] = ["Repariere Gebäude automatisch", "Auto reparar edifícios", "bâtiments autoréparé", "Binalari otomatik onar"][l];
              this.Data["Automatic interval in minutes"] = ["Auto-Intervall in Minuten", "Intervalo de tempo automático (em minutos)", "intervalle automatique en quelques minutes", "Otomatik toplama araligi (dk)"][l];
              this.Data["Apply changes"] = ["Speichern", "Confirmar", "Appliquer changements", "Uygula"][l];
              this.Data["Discard changes"] = ["Abbrechen", "Cancelar", "Annuler changements", "Iptal"][l];
              this.Data["Reset to default"] = ["Auf Standard zurücksetzen", "Definições padrão", "Réinitialiser", "Sifirla"][l];
              this.Data["Continuous"] = ["Kontinuierlich", "Contínua", "continue", "Sürekli"][l];
              this.Data["Bonus"] = ["Pakete", "Bónus", "Bonus", "Bonus"][l];
              this.Data["POI"] = ["POI", "POI", "POI", "POI"][l];
              this.Data["Total / h"] = ["Gesamt / h", "Total / h", "Total / h", "Toplam / sa."][l];
              this.Data["Repaircharges"] = ["Reparaturzeiten", "Custo de reparação", "frais de réparation", "Onarim maliyeti"][l];
              this.Data["Repairtime"] = ["Max. verfügbar", "Tempo de reparação", "Temps de réparation", "Onarim süresi"][l];
              this.Data["Attacks"] = ["Angriffe", "Ataques", "Attaques", "Saldirilar"][l];
              this.Data[MaelstromTools.Statics.Infantry] = ["Infanterie", "Infantaria", "Infanterie", "Piyade"][l];
              this.Data[MaelstromTools.Statics.Vehicle] = ["Fahrzeuge", "Veículos", "Vehicule", "Motorlu B."][l];
              this.Data[MaelstromTools.Statics.Aircraft] = ["Flugzeuge", "Aeronaves", "Aviation", "Hava A."][l];
              this.Data[MaelstromTools.Statics.Tiberium] = ["Tiberium", "Tibério", "Tiberium", "Tiberium"][l];
              this.Data[MaelstromTools.Statics.Crystal] = ["Kristalle", "Cristal", "Cristal", "Kristal"][l];
              this.Data[MaelstromTools.Statics.Power] = ["Strom", "Potência", "Energie", "Güç"][l];
              this.Data[MaelstromTools.Statics.Dollar] = ["Credits", "Créditos", "Crédit", "Kredi"][l];
              this.Data[MaelstromTools.Statics.Research] = ["Forschung", "Investigação", "Recherche", "Arastirma"][l];
              this.Data["Base"] = ["Basis", "Base", "Base", "Üs"][l];
              this.Data["Defense"] = ["Verteidigung", "Defesa", "Défense", "Savunma"][l];
              this.Data["Army"] = ["Armee", "Exército", "Armée", "Ordu"][l];
              this.Data["Level"] = ["Stufe", "Nível", "Niveau", "Seviye"][l];
              this.Data["Buildings"] = ["Gebäude", "Edifícios", "Bâtiments", "Binalar"][l];
              this.Data["Health"] = ["Leben", "Vida", "Santé", "Saglik"][l];
              this.Data["Units"] = ["Einheiten", "Unidades", "Unités", "Üniteler"][l];
              this.Data["Hide Mission Tracker"] = ["Missionsfenster ausblenden", "Esconder janela das Missões", "Cacher la fenêtre de mission", "Görev Izleyicisini Gizle"][l];
              this.Data["none"] = ["keine", "nenhum", "aucun", "hiçbiri"][l];
              this.Data["Cooldown"] = ["Cooldown", "Relocalização", "Recharge", "Cooldown"][l];
              this.Data["Protection"] = ["Geschützt bis", "Protecção", "Protection", "Koruma"][l];
              this.Data["Available weapon"] = ["Verfügbare Artillerie", "Apoio disponível", "arme disponible", "Mevcut silah"][l];
              this.Data["Calibrated on"] = ["Kalibriert auf", "Calibrado em", "Calibré sur ", "Kalibreli"][l];
              this.Data["Total resources"] = ["Gesamt", "Total de recursos", "Ressources totales", "Toplam kaynaklar"][l];
              this.Data["Max. storage"] = ["Max. Kapazität", "Armazenamento Máx.", "Max. de stockage", "Maks. Depo"][l];
              this.Data["Storage full!"] = ["Lager voll!", "Armazenamento cheio!", "Stockage plein", "Depo dolu!"][l];
              this.Data["Storage"] = ["Lagerstand", "Armazenamento", "Stockage", "Depo"][l];
              this.Data["display only top buildings"] = ["Nur Top-Gebäude anzeigen", "Mostrar apenas melhores edifícios", "afficher uniquement les bâtiments principaux", "yalnizca en iyi binalari göster"][l];
              this.Data["display only affordable buildings"] = ["Nur einsetzbare Gebäude anzeigen", "Mostrar apenas edíficios acessíveis", "afficher uniquement les bâtiments abordables", "yalnizca satin alinabilir binalari göster"][l];
              this.Data["City"] = ["Stadt", "Base", "Base", "Sehir"][l];
              this.Data["Type (coord)"] = ["Typ (Koord.)", "Escrever (coord)", "Type (coord)", "Tip (koord.)"][l];
              this.Data["to Level"] = ["Auf Stufe", "para nível", "à Niveau ", "Seviye için"][l];
              this.Data["Gain/h"] = ["Zuwachs/h", "Melhoria/h", "Gain / h", "Kazanç / sa."][l];
              this.Data["Factor"] = ["Faktor", "Factor", "Facteur", "Faktör"][l];
              this.Data["Tib/gain"] = ["Tib./Zuwachs", "Tib/melhoria", "Tib / gain", "Tib/Kazanç"][l];
              this.Data["Pow/gain"] = ["Strom/Zuwachs", "Potencia/melhoria", "Puissance / Gain", "Güç/Kazanç"][l];
              this.Data["ETA"] = ["Verfügbar in", "Tempo restante", "Temps restant", "Kalan Zaman"][l];
              this.Data["Upgrade"] = ["Aufrüsten", "Upgrade", "Upgrade", "Yükselt"][l];
              this.Data["Powerplant"] = ["Kratfwerk", "Central de Energia", "Centrale", "Güç Santrali"][l];
              this.Data["Refinery"] = ["Raffinerie", "Refinaria", "Raffinerie", "Rafineri"][l];
              this.Data["Harvester"] = ["Sammler", "Harvester", "Collecteur", "Biçerdöver"][l];
              this.Data["Silo"] = ["Silo", "Silo", "Silo", "Silo"][l];
              this.Data["Accumulator"] = ["Akkumulator", "Acumulador", "Accumulateur", "Akümülatör"][l];
              this.Data["Calibrate support"] = ["Artillerie kalibrieren", "Calibrar apoio", "Calibrer soutien", "Takviyeyi kalibre et"][l];
              this.Data["Access"] = ["Öffne", "Aceder", "Accès ", "Aç"][l];
              this.Data["Focus on"] = ["Zentriere auf", "Concentrar em", "Centré sur", "Odaklan"][l];
              this.Data["Possible attacks from this base (available CP)"] = ["Mögliche Angriffe (verfügbare KP)", "Possible attacks from this base (available CP)","Possible attacks from this base (available CP)", "Bu üsten yapilmasi mümkün olan saldirilar (mevcut KP)"][l];
              //this.Data[""] = [""][l];
            },
            get: function (ident) {
              return this.gt(ident);
            },
            gt: function (ident) {
              if (!this.Data || !this.Data[ident]) {
                /*if(!parseInt(ident.substr(0, 1), 10) && ident != "0") {
                  console.log("missing language data: " + ident);
                }*/
                return ident;
              }
              return this.Data[ident];
            }
          }
        }),

        // define Base
        qx.Class.define("MaelstromTools.Base", {
          type: "singleton",
          extend: qx.core.Object,
          members: {
            /* Desktop */
            timerInterval: 1500,
            mainTimerInterval: 5000,
            lootStatusInfoInterval: null,
            images: null,
            mWindows: null,
            mainMenuWindow: null,

            itemsOnDesktop: null,
            itemsOnDesktopCount: null,
            itemsInMainMenu: null,
            itemsInMainMenuCount: null,
            buttonCollectAllResources: null,
            buttonRepairAllUnits: null,
            buttonRepairAllBuildings: null,

            lootWidget: null,

            initialize: function () {
              try {
                //console.log(qx.locale.Manager.getInstance().getLocale());
                Lang.loadData(qx.locale.Manager.getInstance().getLocale());
                //console.log("Client version: " + MaelstromTools.Wrapper.GetClientVersion());
                this.itemsOnDesktopCount = new Array();
                this.itemsOnDesktop = new Object();
                this.itemsInMainMenuCount = new Array();
                this.itemsInMainMenu = new Object();

                var fileManager = ClientLib.File.FileManager.GetInstance();
                //ui/icons/icon_mainui_defense_button
                //ui/icons/icon_mainui_base_button
                //ui/icons/icon_army_points
                //icon_def_army_points
                var factionText = ClientLib.Base.Util.GetFactionGuiPatchText();
                this.createNewImage(MaelstromTools.Statics.Tiberium, "ui/common/icn_res_tiberium.png", fileManager);
                this.createNewImage(MaelstromTools.Statics.Crystal, "ui/common/icn_res_chrystal.png", fileManager);
                this.createNewImage(MaelstromTools.Statics.Power, "ui/common/icn_res_power.png", fileManager);
                this.createNewImage(MaelstromTools.Statics.Dollar, "ui/common/icn_res_dollar.png", fileManager);
                this.createNewImage(MaelstromTools.Statics.Research, "ui/common/icn_res_research.png", fileManager);
                this.createNewImage("Sum", "ui/common/icn_build_slots.png", fileManager);
                this.createNewImage("AccessBase", "ui/" + factionText + "/icons/icon_mainui_enterbase.png", fileManager);
                this.createNewImage("FocusBase", "ui/" + factionText + "/icons/icon_mainui_focusbase.png", fileManager);
                this.createNewImage("Packages", "ui/" + factionText + "/icons/icon_collect_packages.png", fileManager);
                this.createNewImage("RepairAllUnits", "ui/" + factionText + "/icons/icon_army_points.png", fileManager);
                this.createNewImage("RepairAllBuildings", "ui/" + factionText + "/icons/icn_build_slots.png", fileManager);
                this.createNewImage("ResourceOverviewMenu", "ui/common/icn_res_chrystal.png", fileManager);
                this.createNewImage("ProductionMenu", "ui/" + factionText + "/icons/icn_build_slots.png", fileManager);
                this.createNewImage("RepairTimeMenu", "ui/" + factionText + "/icons/icon_repair_all_button.png", fileManager);
                this.createNewImage("Crosshair", "ui/icons/icon_support_tnk_white.png", fileManager);
                this.createNewImage("UpgradeBuilding", "ui/" + factionText + "/icons/icon_building_detail_upgrade.png", fileManager);

                this.createNewWindow("MainMenu", "R", 125, 140, 120, 100, "B");
                this.createNewWindow("Production", "L", 120, 60, 340, 140);
                this.createNewWindow("RepairTime", "L", 120, 60, 340, 140);
                this.createNewWindow("ResourceOverview", "L", 120, 60, 340, 140);
                this.createNewWindow("BaseStatusOverview", "L", 120, 60, 340, 140);
                this.createNewWindow("Preferences", "L", 120, 60, 440, 140);
                this.createNewWindow("UpgradePriority", "L", 120, 60, 870, 400);

                if (!this.mainMenuWindow) {
                  this.mainMenuWindow = new qx.ui.popup.Popup(new qx.ui.layout.Canvas()).set({
                    //backgroundColor: "#303030",
                    padding: 5,
                    paddingRight: 0
                  });
                  if (MT_Preferences.Settings.useDedicatedMainMenu) {
                    this.mainMenuWindow.setPlaceMethod("mouse");
                    this.mainMenuWindow.setPosition("top-left");
                  } else {
                    this.mainMenuWindow.setPlaceMethod("widget");
                    this.mainMenuWindow.setPosition("bottom-right");
                    this.mainMenuWindow.setAutoHide(false);
                    this.mainMenuWindow.setBackgroundColor("transparent");
                    this.mainMenuWindow.setShadow(null);
                    this.mainMenuWindow.setDecorator(new qx.ui.decoration.Background());
                  }
                }

                var desktopPositionModifier = 0;

                this.buttonCollectAllResources = this.createDesktopButton(Lang.gt("Collect all packages"), "Packages", true, this.desktopPosition(desktopPositionModifier));
                this.buttonCollectAllResources.addListener("execute", this.collectAllPackages, this);

                var openProductionWindowButton = this.createDesktopButton(Lang.gt("Overall production"), "ProductionMenu", false, this.desktopPosition(desktopPositionModifier));
                openProductionWindowButton.addListener("execute", function () {
                  window.MaelstromTools.Production.getInstance().openWindow("Production", Lang.gt("Overall production"));
                }, this);

                var openResourceOverviewWindowButton = this.createDesktopButton(Lang.gt("Base resources"), "ResourceOverviewMenu", false, this.desktopPosition(desktopPositionModifier));
                openResourceOverviewWindowButton.addListener("execute", function () {
                  window.MaelstromTools.ResourceOverview.getInstance().openWindow("ResourceOverview", Lang.gt("Base resources"));
                }, this);

                desktopPositionModifier++;
                var openMainMenuButton = this.createDesktopButton(Lang.gt("Main menu"), "ProductionMenu", false, this.desktopPosition(desktopPositionModifier));
                openMainMenuButton.addListener("click", function (e) {
                  this.mainMenuWindow.placeToMouse(e);
                  this.mainMenuWindow.show();
                }, this);

                this.buttonRepairAllUnits = this.createDesktopButton(Lang.gt("Repair all units"), "RepairAllUnits", true, this.desktopPosition(desktopPositionModifier));
                this.buttonRepairAllUnits.addListener("execute", this.repairAllUnits, this);

                this.buttonRepairAllBuildings = this.createDesktopButton(Lang.gt("Repair all buildings"), "RepairAllBuildings", true, this.desktopPosition(desktopPositionModifier));
                this.buttonRepairAllBuildings.addListener("execute", this.repairAllBuildings, this);

                var openRepairTimeWindowButton = this.createDesktopButton(Lang.gt("Army overview"), "RepairTimeMenu", false, this.desktopPosition(desktopPositionModifier));
                openRepairTimeWindowButton.addListener("execute", function () {
                  window.MaelstromTools.RepairTime.getInstance().openWindow("RepairTime", Lang.gt("Army overview"));
                }, this);

                var openBaseStatusOverview = this.createDesktopButton(Lang.gt("Base status overview"), "Crosshair", false, this.desktopPosition(desktopPositionModifier));
                openBaseStatusOverview.addListener("execute", function () {
                  window.MaelstromTools.BaseStatus.getInstance().openWindow("BaseStatusOverview", Lang.gt("Base status overview"));
                }, this);

                desktopPositionModifier++;
                var openHuffyUpgradeOverview = this.createDesktopButton(Lang.gt("Upgrade priority overview"), "UpgradeBuilding", false, this.desktopPosition(desktopPositionModifier));
                openHuffyUpgradeOverview.addListener("execute", function () {
                  window.HuffyTools.UpgradePriorityGUI.getInstance().openWindow("UpgradePriority", Lang.gt("Upgrade priority overview"));
                }, this);

                desktopPositionModifier++;
                var preferencesButton = new qx.ui.form.Button(Lang.gt("Options")).set({
                  appearance: "button-text-small",
                  width: 100,
                  minWidth: 100,
                  maxWidth: 100
                });
                preferencesButton.setUserData("desktopPosition", this.desktopPosition(desktopPositionModifier));
                preferencesButton.addListener("execute", function () {
                  window.MaelstromTools.Preferences.getInstance().openWindow("Preferences", Lang.gt("MaelstromTools Preferences"), true);
                }, this);

                if (MT_Preferences.Settings.useDedicatedMainMenu) {
                  this.addToDesktop("MainMenu", openMainMenuButton);
                }
                this.addToMainMenu("ResourceOverviewMenu", openResourceOverviewWindowButton);
                this.addToMainMenu("ProductionMenu", openProductionWindowButton);
                this.addToMainMenu("BaseStatusMenu", openBaseStatusOverview);
                this.addToMainMenu("RepairTimeMenu", openRepairTimeWindowButton);
                this.addToMainMenu("UpgradeBuilding", openHuffyUpgradeOverview);

                this.addToMainMenu("PreferencesMenu", preferencesButton);

                if (!MT_Preferences.Settings.useDedicatedMainMenu) {
                  this.mainMenuWindow.show();
                  var target = qx.core.Init.getApplication().getOptionsBar(); //getServerBar(); //qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_APPOINTMENTS);
                  this.mainMenuWindow.placeToWidget(target, true);
                }

                webfrontend.gui.chat.ChatWidget.recvbufsize = MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.CHATHISTORYLENGTH, 64);
                this.runSecondlyTimer();
                this.runMainTimer();
                this.runAutoCollectTimer();
              } catch (e) {
                console.log("MaelstromTools.initialize: ", e);
              }
            },

            desktopPosition: function (modifier) {
              if (!modifier) modifier = 0;
              return modifier;
            },

            createDesktopButton: function (title, imageName, isNotification, desktopPosition) {
              try {
                if (!isNotification) {
                  isNotification = false;
                }
                if (!desktopPosition) {
                  desktopPosition = this.desktopPosition();
                }
                var desktopButton = new qx.ui.form.Button(null, this.images[imageName]).set({
                  toolTipText: title,
                  width: 50,
                  height: 40,
                  maxWidth: 50,
                  maxHeight: 40,
                  appearance: (isNotification ? "button-standard-nod" : "button-playarea-mode-frame"), //"button-standard-"+factionText), button-playarea-mode-red-frame
                  center: true
                });

                desktopButton.setUserData("isNotification", isNotification);
                desktopButton.setUserData("desktopPosition", desktopPosition);
                return desktopButton;
              } catch (e) {
                console.log("MaelstromTools.createDesktopButton: ", e);
              }
            },

            createNewImage: function (name, path, fileManager) {
              try {
                if (!this.images) {
                  this.images = new Object();
                }
                if (!fileManager) {
                  return;
                }

                this.images[name] = fileManager.GetPhysicalPath(path);
              } catch (e) {
                console.log("MaelstromTools.createNewImage: ", e);
              }
            },

            createNewWindow: function (name, align, x, y, w, h, alignV) {
              try {
                if (!this.mWindows) {
                  this.mWindows = new Object();
                }
                this.mWindows[name] = new Object();
                this.mWindows[name]["Align"] = align;
                this.mWindows[name]["AlignV"] = alignV;
                this.mWindows[name]["x"] = x;
                this.mWindows[name]["y"] = y;
                this.mWindows[name]["w"] = w;
                this.mWindows[name]["h"] = h;
              } catch (e) {
                console.log("MaelstromTools.createNewWindow: ", e);
              }
            },

            addToMainMenu: function (name, button) {
              try {
                /*if(!this.useDedicatedMainMenu) {
                  return;
                }*/
                if (this.itemsInMainMenu[name] != null) {
                  return;
                }
                var desktopPosition = button.getUserData("desktopPosition");
                var isNotification = button.getUserData("isNotification");
                if (!desktopPosition) {
                  desktopPosition = this.desktopPosition();
                }
                if (!isNotification) {
                  isNotification = false;
                }

                if (isNotification && MT_Preferences.Settings.useDedicatedMainMenu) {
                  this.addToDesktop(name, button);
                } else {
                  if (!this.itemsInMainMenuCount[desktopPosition]) {
                    this.itemsInMainMenuCount[desktopPosition] = 0;
                  }
                  this.mainMenuWindow.add(button, {
                    right: 5 + (52 * this.itemsInMainMenuCount[desktopPosition]),
                    top: 0 + (42 * (desktopPosition)) //bottom: 0 - (42 * (desktopPosition - 1))
                  });

                  this.itemsInMainMenu[name] = button;
                  this.itemsInMainMenuCount[desktopPosition]++;
                }
              } catch (e) {
                console.log("MaelstromTools.addToMainMenu: ", e);
              }
            },

            removeFromMainMenu: function (name, rearrange) {
              try {
                if (rearrange == null) {
                  rearrange = true;
                }
                if (this.itemsOnDesktop[name] != null) {
                  var isNotification = this.itemsOnDesktop[name].getUserData("isNotification");
                  if (!isNotification) {
                    isNotification = false;
                  }
                  if (isNotification && MT_Preferences.Settings.useDedicatedMainMenu) {
                    this.removeFromDesktop(name, rearrange);
                  }
                } else if (this.itemsInMainMenu[name] != null) {
                  var desktopPosition = this.itemsInMainMenu[name].getUserData("desktopPosition");
                  var isNotification = this.itemsInMainMenu[name].getUserData("isNotification");
                  if (!desktopPosition) {
                    desktopPosition = this.desktopPosition();
                  }
                  if (!isNotification) {
                    isNotification = false;
                  }

                  this.mainMenuWindow.remove(this.itemsInMainMenu[name]);
                  this.itemsInMainMenu[name] = null;
                  this.itemsInMainMenuCount[desktopPosition]--;

                  if (rearrange && this.itemsInMainMenu[desktopPosition] > 1) {
                    var tmpItems = new Object();
                    // remove notifications 
                    for (var itemName in this.itemsOnDesktop) {
                      if (this.itemsInMainMenu[itemName] == null) {
                        continue;
                      }
                      if (!isNotification) {
                        continue;
                      }
                      tmpItems[itemName] = this.itemsInMainMenu[itemName];
                      this.removeFromMainMenu(itemName, false);
                    }
                    // rearrange notifications
                    for (var itemName2 in tmpItems) {
                      var tmp = tmpItems[itemName2];
                      if (tmp == null) {
                        continue;
                      }
                      this.addToMainMenu(itemName2, tmp);
                    }
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.removeFromDesktop: ", e);
              }
            },

            addToDesktop: function (name, button) {
              try {
                if (this.itemsOnDesktop[name] != null) {
                  return;
                }
                var desktopPosition = button.getUserData("desktopPosition");
                if (!desktopPosition) {
                  desktopPosition = this.desktopPosition();
                }

                if (!this.itemsOnDesktopCount[desktopPosition]) {
                  this.itemsOnDesktopCount[desktopPosition] = 0;
                }

                var app = qx.core.Init.getApplication();
                //var navBar = app.getNavigationBar();

                // console.log("add to Desktop at pos: " + this.itemsOnDesktopCount);
                app.getDesktop().add(button, {
                  //right: navBar.getBounds().width + (52 * this.itemsOnDesktopCount[desktopPosition]),
                  //top: 42 * (desktopPosition - 1)
                  right: 120 + (52 * this.itemsOnDesktopCount[desktopPosition]),
                  //top: this.initialAppointmentBarHeight + 125 + (42 * (desktopPosition - 1))
                  bottom: 154 - (42 * (desktopPosition - 1))
                });

                this.itemsOnDesktop[name] = button;
                this.itemsOnDesktopCount[desktopPosition]++;
              } catch (e) {
                console.log("MaelstromTools.addToDesktop: ", e);
              }
            },

            removeFromDesktop: function (name, rearrange) {
              try {
                if (rearrange == null) {
                  rearrange = true;
                }
                var app = qx.core.Init.getApplication();

                if (this.itemsOnDesktop[name] != null) {
                  var desktopPosition = this.itemsOnDesktop[name].getUserData("desktopPosition");
                  var isNotification = this.itemsOnDesktop[name].getUserData("isNotification");
                  if (!desktopPosition) {
                    desktopPosition = this.desktopPosition();
                  }
                  if (!isNotification) {
                    isNotification = false;
                  }

                  app.getDesktop().remove(this.itemsOnDesktop[name]);
                  this.itemsOnDesktop[name] = null;
                  this.itemsOnDesktopCount[desktopPosition]--;

                  if (rearrange && this.itemsOnDesktopCount[desktopPosition] > 1) {
                    var tmpItems = new Object();
                    // remove notifications 
                    for (var itemName in this.itemsOnDesktop) {
                      if (this.itemsOnDesktop[itemName] == null) {
                        continue;
                      }
                      if (!this.itemsOnDesktop[itemName].getUserData("isNotification")) {
                        continue;
                      }
                      tmpItems[itemName] = this.itemsOnDesktop[itemName];
                      this.removeFromDesktop(itemName, false);
                    }
                    // rearrange notifications
                    for (var itemName2 in tmpItems) {
                      var tmp = tmpItems[itemName2];
                      if (tmp == null) {
                        continue;
                      }
                      this.addToMainMenu(itemName2, tmp);
                    }
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.removeFromDesktop: ", e);
              }
            },

            runSecondlyTimer: function () {
              try {
                this.calculateCostsForNextMCV();

                var self = this;
                window.setTimeout(function () {
                  self.runSecondlyTimer();
                }, 1000);
              } catch (e) {
                console.log("MaelstromTools.runSecondlyTimer: ", e);
              }
            },

            runMainTimer: function () {
              try {
                this.checkForPackages();
                if (CCTAWrapperIsInstalled()) {
                  this.checkRepairAllUnits();
                  this.checkRepairAllBuildings();
                }

                var missionTracker = typeof (qx.core.Init.getApplication().getMissionsBar) === 'function' ? qx.core.Init.getApplication().getMissionsBar() : qx.core.Init.getApplication().getMissionTracker(); //fix for PerforceChangelist>=376877
                if (MT_Preferences.Settings.autoHideMissionTracker) {
                  if (missionTracker.isVisible()) {
                    missionTracker.hide();
                  }
                  if (typeof (qx.core.Init.getApplication().getMissionsBar) === 'function') {
                    if (qx.core.Init.getApplication().getMissionsBar().getSizeHint().height != 0) {
                      qx.core.Init.getApplication().getMissionsBar().getSizeHint().height = 0;
                      qx.core.Init.getApplication().triggerDesktopResize();
                    }
                  }
                } else {
                  if (!missionTracker.isVisible()) {
                    missionTracker.show();
                    if (typeof (qx.core.Init.getApplication().getMissionsBar) === 'function') {
                      qx.core.Init.getApplication().getMissionsBar().initHeight();
                      qx.core.Init.getApplication().triggerDesktopResize();
                    }
                  }
                }
                
                var self = this;
                window.setTimeout(function () {
                  self.runMainTimer();
                }, this.mainTimerInterval);
              } catch (e) {
                console.log("MaelstromTools.runMainTimer: ", e);
              }
            },

            runAutoCollectTimer: function () {
              try {
                //console.log("runAutoCollectTimer ", MT_Preferences.Settings.AutoCollectTimer);
                if (!CCTAWrapperIsInstalled()) return; // run timer only then wrapper is running
                if (this.checkForPackages() && MT_Preferences.Settings.autoCollectPackages) {
                  this.collectAllPackages();
                }
                if (this.checkRepairAllUnits() && MT_Preferences.Settings.autoRepairUnits) {
                  this.repairAllUnits();
                }
                if (this.checkRepairAllBuildings() && MT_Preferences.Settings.autoRepairBuildings) {
                  this.repairAllBuildings();
                }

                var self = this;
                window.setTimeout(function () {
                  self.runAutoCollectTimer();
                }, MT_Preferences.Settings.AutoCollectTimer * 60000);
              } catch (e) {
                console.log("MaelstromTools.runMainTimer: ", e);
              }
            },

            openWindow: function (windowObj, windowName, skipMoveWindow) {
              try {
                if (!windowObj.isVisible()) {
                  if (windowName == "MainMenu") {
                    windowObj.show();
                  } else {
                    if (!skipMoveWindow) {
                      this.moveWindow(windowObj, windowName);
                    }
                    windowObj.open();
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.openWindow: ", e);
              }
            },

            moveWindow: function (windowObj, windowName) {
              try {
                var x = this.mWindows[windowName]["x"];
                var y = this.mWindows[windowName]["y"];
                if (this.mWindows[windowName]["Align"] == "R") {
                  x = qx.bom.Viewport.getWidth(window) - this.mWindows[windowName]["x"];
                }
                if (this.mWindows[windowName]["AlignV"] == "B") {
                  y = qx.bom.Viewport.getHeight(window) - this.mWindows[windowName]["y"] - windowObj.height;
                }
                windowObj.moveTo(x, y);
                if (windowName != "MainMenu") {
                  windowObj.setHeight(this.mWindows[windowName]["h"]);
                  windowObj.setWidth(this.mWindows[windowName]["w"]);
                }
              } catch (e) {
                console.log("MaelstromTools.moveWindow: ", e);
              }
            },

            checkForPackages: function () {
              try {
                MT_Cache.updateCityCache();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (ncity.get_CityBuildingsData().get_HasCollectableBuildings()) {
                    this.addToMainMenu("CollectAllResources", this.buttonCollectAllResources);
                    return true;
                  }
                }
                this.removeFromMainMenu("CollectAllResources");
                return false;
              } catch (e) {
                console.log("MaelstromTools.checkForPackages: ", e);
                return false;
              }
            },

            collectAllPackages: function () {
              try {
                MT_Cache.updateCityCache();
                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (ncity.get_CityBuildingsData().get_HasCollectableBuildings()) {
                    if (MT_Cache.CityCount <= 1) {
                      var buildings = ncity.get_Buildings().d;
                      for (var x in buildings) {
                        var building = buildings[x];
                        if (building.get_ProducesPackages() && building.get_ReadyToCollect()) {
                          ClientLib.Net.CommunicationManager.GetInstance().SendCommand("CollectResource",{cityid:ncity.get_Id(), posX:building.get_CoordX(),posY:building.get_CoordY()}, null, null, true);
                        }
                      }
                    } else {
                      ncity.CollectAllResources();
                    }
                  }
                }
                this.removeFromMainMenu("CollectAllResources");
              } catch (e) {
                console.log("MaelstromTools.collectAllPackages: ", e);
              }
            },

            checkRepairAll: function (visMode, buttonName, button) {
              try {
                MT_Cache.updateCityCache();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (MaelstromTools.Wrapper.CanRepairAll(ncity, visMode)) {
                    this.addToMainMenu(buttonName, button);
                    return true;
                  }
                }

                this.removeFromMainMenu(buttonName);
                return false;
              } catch (e) {
                console.log("MaelstromTools.checkRepairAll: ", e);
                return false;
              }
            },

            checkRepairAllUnits: function () {
              return this.checkRepairAll(ClientLib.Vis.Mode.ArmySetup, "RepairAllUnits", this.buttonRepairAllUnits);
            },

            checkRepairAllBuildings: function () {
              return this.checkRepairAll(ClientLib.Vis.Mode.City, "RepairAllBuildings", this.buttonRepairAllBuildings);
            },

            repairAll: function (visMode, buttonName) {
              try {
                MT_Cache.updateCityCache();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (MaelstromTools.Wrapper.CanRepairAll(ncity, visMode)) {
                    MaelstromTools.Wrapper.RepairAll(ncity, visMode);
                  }

                }
                this.removeFromMainMenu(buttonName);
              } catch (e) {
                console.log("MaelstromTools.repairAll: ", e);
              }
            },

            //ClientLib.Data.City.prototype.get_CityRepairData
            //ClientLib.Data.CityRepair.prototype.CanRepairAll
            //ClientLib.Data.CityRepair.prototype.RepairAll
            repairAllUnits: function () {
              try {
                this.repairAll(ClientLib.Vis.Mode.ArmySetup, "RepairAllUnits");
              } catch (e) {
                console.log("MaelstromTools.repairAllUnits: ", e);
              }
            },

            repairAllBuildings: function () {
              try {
                this.repairAll(ClientLib.Vis.Mode.City, "RepairAllBuildings");
              } catch (e) {
                console.log("MaelstromTools.repairAllBuildings: ", e);
              }
            },

            updateLoot: function (ident, visCity, widget) {
              try {
                clearInterval(this.lootStatusInfoInterval);
                if (!MT_Preferences.Settings.showLoot) {
                  if (this.lootWidget[ident]) {
                    this.lootWidget[ident].removeAll();
                  }
                  return;
                }

                var baseLoadState = MT_Cache.updateLoot(visCity);
                if (baseLoadState == -2) { // base already cached and base not changed
                  return;
                }

                if (!this.lootWidget) {
                  this.lootWidget = new Object();
                }
                if (!this.lootWidget[ident]) {
                  this.lootWidget[ident] = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                  this.lootWidget[ident].setTextColor("white");
                  widget.add(this.lootWidget[ident]);
                }
                var lootWidget = this.lootWidget[ident];

                var rowIdx = 1;
                var colIdx = 1;
                lootWidget.removeAll();
                switch (baseLoadState) {
                  case -1:
                    {
                      MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, "Target out of range, no resource calculation possible", null, null, 'bold', null);
                      break;
                    }
                  case 1:
                    {
                      var Resources = MT_Cache.SelectedBaseResources;
                      this.createResourceLabels(lootWidget, ++rowIdx, "Possible attacks from this base (available CP)", Resources, - 1);
                      this.createResourceLabels(lootWidget, ++rowIdx, "Lootable resources", Resources, 1);
                      this.createResourceLabels(lootWidget, ++rowIdx, "per CP", Resources, 1 * Resources.CPNeeded);
                      this.createResourceLabels(lootWidget, ++rowIdx, "2nd run", Resources, 2 * Resources.CPNeeded);
                      this.createResourceLabels(lootWidget, ++rowIdx, "3rd run", Resources, 3 * Resources.CPNeeded);
                      break;
                    }
                  default:
                    {
                      MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, "Calculating resources...", null, null, 'bold', null);
                      this.lootStatusInfoInterval = setInterval(function () {
                        MaelstromTools.Base.getInstance().updateLoot(ident, visCity, widget);
                      }, 100);
                      break;
                    }
                }
              } catch (e) {
                console.log("MaelstromTools.updateLoot: ", e);
              }
            },

            createResourceLabels: function (lootWidget, rowIdx, Label, Resources, Modifier) {
              var colIdx = 1;
              var font = (Modifier > 1 ? null : 'bold');

              if (Modifier == -1 && Resources.CPNeeded > 0) {
                Label = Lang.gt(Label) + ": " + Math.floor(ClientLib.Data.MainData.GetInstance().get_Player().GetCommandPointCount() / Resources.CPNeeded);
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, Label, null, 'left', font, null, 9);
                return;
              }
              colIdx = 1;
              if (Modifier > 0) {
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, Lang.gt(Label) + ":", null, null, font);
                MaelstromTools.Util.addImage(lootWidget, rowIdx, colIdx++, MaelstromTools.Util.getImage(MaelstromTools.Statics.Research));
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Resources[MaelstromTools.Statics.Research] / Modifier), 50, 'right', font);
                MaelstromTools.Util.addImage(lootWidget, rowIdx, colIdx++, MaelstromTools.Util.getImage(MaelstromTools.Statics.Tiberium));
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Resources[MaelstromTools.Statics.Tiberium] / Modifier), 50, 'right', font);
                MaelstromTools.Util.addImage(lootWidget, rowIdx, colIdx++, MaelstromTools.Util.getImage(MaelstromTools.Statics.Crystal));
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Resources[MaelstromTools.Statics.Crystal] / Modifier), 50, 'right', font);
                MaelstromTools.Util.addImage(lootWidget, rowIdx, colIdx++, MaelstromTools.Util.getImage(MaelstromTools.Statics.Dollar));
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Resources[MaelstromTools.Statics.Dollar] / Modifier), 50, 'right', font);
                MaelstromTools.Util.addImage(lootWidget, rowIdx, colIdx++, MaelstromTools.Util.getImage("Sum"));
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Resources["Total"] / Modifier), 50, 'right', font);
              }
            },

            mcvPopup: null,
            mcvPopupX : 0,
            mcvPopupY : 0,
            mcvTimerLabel: null,
            calculateCostsForNextMCV: function () {
              try {
                if (!MT_Preferences.Settings.showCostsForNextMCV) {
                  if (this.mcvPopup) {
                    this.mcvPopup.close();
                  }
                  return;
                }
                var player = ClientLib.Data.MainData.GetInstance().get_Player();
                var cw = player.get_Faction();
                var cj = ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Research_BaseFound, cw);
                var cr = player.get_PlayerResearch();
                var cd = cr.GetResearchItemFomMdbId(cj);
                if (cd == null) {
                  if (this.mcvPopup) {
                    this.mcvPopup.close();
                  }
                  return;
                }

                if (!this.mcvPopup) {
                  this.mcvPopup = new qx.ui.window.Window("").set({
                    contentPadding : 0,
                    showMinimize : false,
                    showMaximize : false,
                    showClose : false,
                    resizable : false
                  });
                  this.mcvPopup.setLayout(new qx.ui.layout.VBox());
                  this.mcvPopup.addListener("move", function (e) {
                    var base = MaelstromTools.Base.getInstance();
                    var size = qx.core.Init.getApplication().getRoot().getBounds();
                    var value = size.width - e.getData().left;
                    base.mcvPopupX = value < 0 ? 150 : value;
                    value = size.height - e.getData().top;
                    base.mcvPopupY = value < 0 ? 70 : value;
                    MaelstromTools.LocalStorage.set("mcvPopup", {
                      x : base.mcvPopupX,
                      y : base.mcvPopupY
                    });
                  });
                  var font = qx.bom.Font.fromString('bold').set({
                    size: 20
                  });

                  this.mcvTimerLabel = new qx.ui.basic.Label().set({
                    font: font,
                    textColor: 'red',
                    width: 155,
                    textAlign: 'center',
                    marginBottom : 5
                  });
                  this.mcvPopup.add(this.mcvTimerLabel);
                  var serverBar = qx.core.Init.getApplication().getServerBar().getBounds();
                  var pos = MaelstromTools.LocalStorage.get("mcvPopup", {
                      x : serverBar.width + 150,
                      y : 70
                    });
                  this.mcvPopupX = pos.x;
                  this.mcvPopupY = pos.y;
                  this.mcvPopup.open();
                }
                var size = qx.core.Init.getApplication().getRoot().getBounds();
                this.mcvPopup.moveTo(size.width - this.mcvPopupX, size.height - this.mcvPopupY);

                var nextLevelInfo = cd.get_NextLevelInfo_Obj();
                var resourcesNeeded = new Array();
                for (var i in nextLevelInfo.rr) {
                  if (nextLevelInfo.rr[i].t > 0) {
                    resourcesNeeded[nextLevelInfo.rr[i].t] = nextLevelInfo.rr[i].c;
                  }
                }
                //var researchNeeded = resourcesNeeded[ClientLib.Base.EResourceType.ResearchPoints];
                //var currentResearchPoints = player.get_ResearchPoints();

                var creditsNeeded = resourcesNeeded[ClientLib.Base.EResourceType.Gold];
                var creditsResourceData = player.get_Credits();
                var creditGrowthPerHour = (creditsResourceData.Delta + creditsResourceData.ExtraBonusDelta) * ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour();
                var creditTimeLeftInHours = (creditsNeeded - player.GetCreditsCount()) / creditGrowthPerHour;

                if (creditGrowthPerHour == 0 || creditTimeLeftInHours <= 0) {
                  if (this.mcvPopup) {
                    this.mcvPopup.close();
                  }
                  return;
                }

                this.mcvPopup.setCaption(Lang.gt("Next MCV") + " ($ " + MaelstromTools.Wrapper.FormatNumbersCompact(creditsNeeded) + ")");
                this.mcvTimerLabel.setValue(MaelstromTools.Wrapper.FormatTimespan(creditTimeLeftInHours * 60 * 60));

                if (!this.mcvPopup.isVisible()) {
                  this.mcvPopup.open();
                }
              } catch (e) {
                console.log("calculateCostsForNextMCV", e);
              }
            }
          }
        });

        // define Preferences
        qx.Class.define("MaelstromTools.Preferences", {
          type: "singleton",
          extend: qx.core.Object,

          statics: {
            USEDEDICATEDMAINMENU: "useDedicatedMainMenu",
            AUTOCOLLECTPACKAGES: "autoCollectPackages",
            AUTOREPAIRUNITS: "autoRepairUnits",
            AUTOREPAIRBUILDINGS: "autoRepairBuildings",
            AUTOHIDEMISSIONTRACKER: "autoHideMissionTracker",
            AUTOCOLLECTTIMER: "AutoCollectTimer",
            SHOWLOOT: "showLoot",
            SHOWCOSTSFORNEXTMCV: "showCostsForNextMCV",
            CHATHISTORYLENGTH: "ChatHistoryLength"
          },

          members: {
            Window: null,
            Widget: null,
            Settings: null,
            FormElements: null,

            readOptions: function () {
              try {
                if (!this.Settings) {
                  this.Settings = new Object();
                }

                /*
                if(MaelstromTools.LocalStorage.get("useDedicatedMainMenu") == null) {
                  if(qx.bom.Viewport.getWidth(window) > 1800) {
                    this.Settings["useDedicatedMainMenu"] = false;
                  }
                } else {
                  this.Settings["useDedicatedMainMenu"] = (MaelstromTools.LocalStorage.get("useDedicatedMainMenu", 1) == 1);
                }*/
                this.Settings[MaelstromTools.Preferences.USEDEDICATEDMAINMENU] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.USEDEDICATEDMAINMENU, 1) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOCOLLECTPACKAGES] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOCOLLECTPACKAGES, 0) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOREPAIRUNITS] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOREPAIRUNITS, 0) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOREPAIRBUILDINGS] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOREPAIRBUILDINGS, 0) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOHIDEMISSIONTRACKER] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOHIDEMISSIONTRACKER, 0) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOCOLLECTTIMER] = MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOCOLLECTTIMER, 60);
                this.Settings[MaelstromTools.Preferences.SHOWLOOT] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.SHOWLOOT, 1) == 1);
                this.Settings[MaelstromTools.Preferences.SHOWCOSTSFORNEXTMCV] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.SHOWCOSTSFORNEXTMCV, 1) == 1);
                this.Settings[MaelstromTools.Preferences.CHATHISTORYLENGTH] = MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.CHATHISTORYLENGTH, 64);

                if (!CCTAWrapperIsInstalled()) {
                  this.Settings[MaelstromTools.Preferences.AUTOREPAIRUNITS] = false;
                  this.Settings[MaelstromTools.Preferences.AUTOREPAIRBUILDINGS] = false;
                  //this.Settings[MaelstromTools.Preferences.SHOWLOOT] = false;
                }
                //console.log(this.Settings);

              } catch (e) {
                console.log("MaelstromTools.Preferences.readOptions: ", e);
              }
            },

            openWindow: function (WindowName, WindowTitle) {
              try {
                if (!this.Window) {
                  //this.Window = new qx.ui.window.Window(WindowTitle).set({
                  this.Window = new webfrontend.gui.OverlayWindow().set({
                    autoHide: false,
                    title: WindowTitle,
                    minHeight: 350

                    //resizable: false,
                    //showMaximize:false,
                    //showMinimize:false,
                    //allowMaximize:false,
                    //allowMinimize:false,
                    //showStatusbar: false
                  });
                  this.Window.clientArea.setPadding(10);
                  this.Window.clientArea.setLayout(new qx.ui.layout.VBox(3));

                  this.Widget = new qx.ui.container.Composite(new qx.ui.layout.Grid().set({
                    spacingX: 5,
                    spacingY: 5
                  }));

                  //this.Widget.setTextColor("white");

                  this.Window.clientArea.add(this.Widget);
                }

                if (this.Window.isVisible()) {
                  this.Window.close();
                } else {
                  MT_Base.openWindow(this.Window, WindowName);
                  this.setWidgetLabels();
                }
              } catch (e) {
                console.log("MaelstromTools.Preferences.openWindow: ", e);
              }
            },

            addFormElement: function (name, element) {
              this.FormElements[name] = element;
            },

            setWidgetLabels: function () {
              try {
                this.readOptions();

                this.FormElements = new Object();
                this.Widget.removeAll();
                var rowIdx = 1;
                var colIdx = 1;

                var chkAutoHideMissionTracker = new qx.ui.form.CheckBox(Lang.gt("Hide Mission Tracker")).set({
                  value: this.Settings[MaelstromTools.Preferences.AUTOHIDEMISSIONTRACKER] == 1
                });
                var chkUseDedicatedMainMenu = new qx.ui.form.CheckBox(Lang.gt("Use dedicated Main Menu (restart required)")).set({
                  value: this.Settings[MaelstromTools.Preferences.USEDEDICATEDMAINMENU] == 1
                });
                var chkShowLoot = new qx.ui.form.CheckBox(Lang.gt("Show lootable resources (restart required)")).set({
                  value: this.Settings[MaelstromTools.Preferences.SHOWLOOT] == 1/*,
                  enabled: CCTAWrapperIsInstalled()*/
                });
                var chkCostsNextMCV = new qx.ui.form.CheckBox(Lang.gt("Show time to next MCV")).set({
                  value: this.Settings[MaelstromTools.Preferences.SHOWCOSTSFORNEXTMCV] == 1
                });
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkAutoHideMissionTracker, 2);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkUseDedicatedMainMenu, 2);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkShowLoot, 2);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkCostsNextMCV, 2);

                var chkAutoCollectPackages = new qx.ui.form.CheckBox(Lang.gt("Autocollect packages")).set({
                  value: this.Settings[MaelstromTools.Preferences.AUTOCOLLECTPACKAGES] == 1
                });
                var chkAutoRepairUnits = new qx.ui.form.CheckBox(Lang.gt("Autorepair units")).set({
                  value: this.Settings[MaelstromTools.Preferences.AUTOREPAIRUNITS] == 1,
                  enabled: CCTAWrapperIsInstalled()
                });
                var chkAutoRepairBuildings = new qx.ui.form.CheckBox(Lang.gt("Autorepair buildings")).set({
                  value: this.Settings[MaelstromTools.Preferences.AUTOREPAIRBUILDINGS] == 1,
                  enabled: CCTAWrapperIsInstalled()
                });

                var spinnerChatHistoryLength = new qx.ui.form.Spinner().set({
                  minimum: 64,
                  maximum: 512,
                  value: this.Settings[MaelstromTools.Preferences.CHATHISTORYLENGTH]
                });

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, Lang.gt("Chat history length") + " (" + spinnerChatHistoryLength.getMinimum() + " - " + spinnerChatHistoryLength.getMaximum() + ")");
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx + 1, spinnerChatHistoryLength);

                var spinnerAutoCollectTimer = new qx.ui.form.Spinner().set({
                  minimum: 5,
                  maximum: 60 * 6,
                  value: this.Settings[MaelstromTools.Preferences.AUTOCOLLECTTIMER]
                });

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, Lang.gt("Automatic interval in minutes") + " (" + spinnerAutoCollectTimer.getMinimum() + " - " + spinnerAutoCollectTimer.getMaximum() + ")");
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx + 1, spinnerAutoCollectTimer);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkAutoCollectPackages, 2);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkAutoRepairUnits, 2);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkAutoRepairBuildings, 2);

                var applyButton = new qx.ui.form.Button(Lang.gt("Apply changes")).set({
                  appearance: "button-detailview-small",
                  width: 120,
                  minWidth: 120,
                  maxWidth: 120
                });
                applyButton.addListener("execute", this.applyChanges, this);

                var cancelButton = new qx.ui.form.Button(Lang.gt("Discard changes")).set({
                  appearance: "button-detailview-small",
                  width: 120,
                  minWidth: 120,
                  maxWidth: 120
                });
                cancelButton.addListener("execute", function () {
                  this.Window.close();
                }, this);

                var resetButton = new qx.ui.form.Button(Lang.gt("Reset to default")).set({
                  appearance: "button-detailview-small",
                  width: 120,
                  minWidth: 120,
                  maxWidth: 120
                });
                resetButton.addListener("execute", this.resetToDefault, this);

                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, resetButton);
                colIdx = 1;
                MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, cancelButton);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, applyButton);

                this.addFormElement(MaelstromTools.Preferences.AUTOHIDEMISSIONTRACKER, chkAutoHideMissionTracker);
                this.addFormElement(MaelstromTools.Preferences.USEDEDICATEDMAINMENU, chkUseDedicatedMainMenu);
                this.addFormElement(MaelstromTools.Preferences.SHOWLOOT, chkShowLoot);
                this.addFormElement(MaelstromTools.Preferences.SHOWCOSTSFORNEXTMCV, chkCostsNextMCV);
                this.addFormElement(MaelstromTools.Preferences.AUTOCOLLECTPACKAGES, chkAutoCollectPackages);
                this.addFormElement(MaelstromTools.Preferences.AUTOREPAIRUNITS, chkAutoRepairUnits);
                this.addFormElement(MaelstromTools.Preferences.AUTOREPAIRBUILDINGS, chkAutoRepairBuildings);
                this.addFormElement(MaelstromTools.Preferences.AUTOCOLLECTTIMER, spinnerAutoCollectTimer);
                this.addFormElement(MaelstromTools.Preferences.CHATHISTORYLENGTH, spinnerChatHistoryLength);
              } catch (e) {
                console.log("MaelstromTools.Preferences.setWidgetLabels: ", e);
              }
            },

            applyChanges: function () {
              try {
                var autoRunNeeded = false;
                for (var idx in this.FormElements) {
                  var element = this.FormElements[idx];
                  if (idx == MaelstromTools.Preferences.AUTOCOLLECTTIMER) {
                    autoRunNeeded = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOCOLLECTTIMER, 0) != element.getValue());
                  }
                  if (idx == MaelstromTools.Preferences.CHATHISTORYLENGTH) {
                    webfrontend.gui.chat.ChatWidget.recvbufsize = element.getValue();
                  }
                  MaelstromTools.LocalStorage.set(idx, element.getValue());
                }
                this.readOptions();
                if (autoRunNeeded) {
                  MT_Base.runAutoCollectTimer();
                }
                this.Window.close();
              } catch (e) {
                console.log("MaelstromTools.Preferences.applyChanges: ", e);
              }
            },

            resetToDefault: function () {
              try {
                MaelstromTools.LocalStorage.clearAll();
                this.setWidgetLabels();
              } catch (e) {
                console.log("MaelstromTools.Preferences.resetToDefault: ", e);
              }
            }
          }
        });

        // define DefaultObject
        qx.Class.define("MaelstromTools.DefaultObject", {
          type: "abstract",
          extend: qx.core.Object,
          members: {
            Window: null,
            Widget: null,
            Cache: {}, //k null
            IsTimerEnabled: true,

            calc: function () {
              try {
                if (this.Window.isVisible()) {
                  this.updateCache();
                  this.setWidgetLabels();
                  if (this.IsTimerEnabled) {
                    var self = this;
                    window.setTimeout(function () {
                      self.calc();
                    }, MT_Base.timerInterval);
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.DefaultObject.calc: ", e);
              }
            },

            openWindow: function (WindowName, WindowTitle) {
              try {
                if (!this.Window) {
                  this.Window = new qx.ui.window.Window(WindowTitle).set({
                    resizable: false,
                    showMaximize: false,
                    showMinimize: false,
                    allowMaximize: false,
                    allowMinimize: false,
                    showStatusbar: false
                  });
                  this.Window.setPadding(10);
                  this.Window.setLayout(new qx.ui.layout.VBox(3));

                  this.Widget = new qx.ui.container.Composite(new qx.ui.layout.Grid());
                  this.Widget.setTextColor("white");

                  this.Window.add(this.Widget);
                }

                if (this.Window.isVisible()) {
                  this.Window.close();
                } else {
                  MT_Base.openWindow(this.Window, WindowName);
                  this.calc();
                }
              } catch (e) {
                console.log("MaelstromTools.DefaultObject.openWindow: ", e);
              }
            }
          }
        });

        // define Production
        qx.Class.define("MaelstromTools.Production", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          members: {
            updateCache: function (onlyForCity) {
              try {
                MT_Cache.updateCityCache();
                var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
                //this.Cache = Object();

                for (var cname in MT_Cache.Cities) {
                  if (onlyForCity != null && onlyForCity != cname) {
                    continue;
                  }
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (typeof (this.Cache[cname]) !== 'object') this.Cache[cname] = {};
                  if (typeof (this.Cache[cname][MaelstromTools.Statics.Tiberium]) !== 'object') this.Cache[cname][MaelstromTools.Statics.Tiberium] = {}; // all have to be checked, 
                  if (typeof (this.Cache[cname][MaelstromTools.Statics.Crystal]) !== 'object') this.Cache[cname][MaelstromTools.Statics.Crystal] = {}; // this.Cache[cname] can be created inside different namespaces
                  if (typeof (this.Cache[cname][MaelstromTools.Statics.Power]) !== 'object') this.Cache[cname][MaelstromTools.Statics.Power] = {}; // like the RepairTime etc... without those objs
                  if (typeof (this.Cache[cname][MaelstromTools.Statics.Dollar]) !== 'object') this.Cache[cname][MaelstromTools.Statics.Dollar] = {};

                  this.Cache[cname]["ProductionStopped"] = ncity.get_IsGhostMode();
                  this.Cache[cname]["PackagesStopped"] = (ncity.get_hasCooldown() || ncity.get_IsGhostMode());
                  this.Cache[cname][MaelstromTools.Statics.Tiberium]["Delta"] = ncity.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Tiberium, false, false); // (production.d[ClientLib.Base.EResourceType.Tiberium]['Delta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Tiberium]["ExtraBonusDelta"] = ncity.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Tiberium); //(production.d[ClientLib.Base.EResourceType.Tiberium]['ExtraBonusDelta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Tiberium]["POI"] = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Tiberium);
                  this.Cache[cname][MaelstromTools.Statics.Crystal]["Delta"] = ncity.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Crystal, false, false); //(production.d[ClientLib.Base.EResourceType.Crystal]['Delta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Crystal]["ExtraBonusDelta"] = ncity.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Crystal); //(production.d[ClientLib.Base.EResourceType.Crystal]['ExtraBonusDelta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Crystal]["POI"] = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Crystal);
                  this.Cache[cname][MaelstromTools.Statics.Power]["Delta"] = ncity.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false); //(production.d[ClientLib.Base.EResourceType.Power]['Delta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Power]["ExtraBonusDelta"] = ncity.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power); // (production.d[ClientLib.Base.EResourceType.Power]['ExtraBonusDelta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Power]["POI"] = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
                  this.Cache[cname][MaelstromTools.Statics.Dollar]["Delta"] = ClientLib.Base.Resource.GetResourceGrowPerHour(ncity.get_CityCreditsProduction(), false); // (ncity.get_CityCreditsProduction()['Delta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Dollar]["ExtraBonusDelta"] = ClientLib.Base.Resource.GetResourceBonusGrowPerHour(ncity.get_CityCreditsProduction(), false); // (ncity.get_CityCreditsProduction()['ExtraBonusDelta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Dollar]["POI"] = 0;
                  this.Cache[cname]["BaseLevel"] = MaelstromTools.Wrapper.GetBaseLevel(ncity);
                  if (onlyForCity != null && onlyForCity == cname) return this.Cache[cname];
                }
              } catch (e) {
                console.log("MaelstromTools.Production.updateCache: ", e);
              }
            },

            createProductionLabels2: function (rowIdx, colIdx, cityName, resourceType) {
              try {
                if (cityName == "-Total-") {
                  var Totals = Object();
                  Totals["Delta"] = 0;
                  Totals["ExtraBonusDelta"] = 0;
                  Totals["POI"] = 0;
                  Totals["Total"] = 0;

                  for (var cname in this.Cache) {
                    Totals["Delta"] += this.Cache[cname][resourceType]['Delta'];
                    Totals["ExtraBonusDelta"] += this.Cache[cname][resourceType]['ExtraBonusDelta'];
                    Totals["POI"] += this.Cache[cname][resourceType]['POI'];
                  }
                  Totals["Total"] = Totals['Delta'] + Totals['ExtraBonusDelta'] + Totals['POI'];

                  rowIdx++;

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(Totals['Delta']), 80, 'right', 'bold');
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(Totals['ExtraBonusDelta']), 80, 'right', 'bold');
                  if (resourceType != MaelstromTools.Statics.Dollar) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(Totals['POI']), 80, 'right', 'bold');
                  } else {
                    rowIdx++;
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(Totals['Total']), 80, 'right', 'bold');
                } else if (cityName == "-Labels-") {
                  MaelstromTools.Util.addImage(this.Widget, rowIdx++, colIdx, MaelstromTools.Util.getImage(resourceType));
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, "Continuous", 100, 'left');
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, "Bonus", 100, 'left');
                  if (resourceType != MaelstromTools.Statics.Dollar) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, "POI", 100, 'left');
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, "Total / BaseLevel", 100, 'left');
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, "Total / h", 100, 'left');
                } else {
                  var cityCache = this.Cache[cityName];
                  if (rowIdx > 2) {
                    rowIdx++;
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[resourceType]['Delta']), 80, 'right', null, ((cityCache["ProductionStopped"] || cityCache[resourceType]['Delta'] == 0) ? "red" : "white"));
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[resourceType]['ExtraBonusDelta']), 80, 'right', null, ((cityCache["PackagesStopped"] || cityCache[resourceType]['ExtraBonusDelta'] == 0) ? "red" : "white"));
                  if (resourceType != MaelstromTools.Statics.Dollar) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[resourceType]['POI']), 80, 'right', null, (cityCache[resourceType]['POI'] == 0 ? "red" : "white"));
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact((cityCache[resourceType]['Delta'] + cityCache[resourceType]['ExtraBonusDelta'] + cityCache[resourceType]['POI']) / cityCache["BaseLevel"]), 80, 'right');
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[resourceType]['Delta'] + cityCache[resourceType]['ExtraBonusDelta'] + cityCache[resourceType]['POI']), 80, 'right', 'bold');
                }
                return rowIdx;
              } catch (e) {
                console.log("MaelstromTools.Production.createProductionLabels2: ", e);
              }
            },

            setWidgetLabels: function () {
              try {
                this.Widget.removeAll();

                var rowIdx = 1;
                var colIdx = 1;

                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Labels-", MaelstromTools.Statics.Tiberium);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Labels-", MaelstromTools.Statics.Crystal);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Labels-", MaelstromTools.Statics.Power);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Labels-", MaelstromTools.Statics.Dollar);

                colIdx++;
                for (var cityName in this.Cache) {
                  rowIdx = 1;
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, cityName, 80, 'right');

                  rowIdx = this.createProductionLabels2(rowIdx, colIdx, cityName, MaelstromTools.Statics.Tiberium);
                  rowIdx = this.createProductionLabels2(rowIdx, colIdx, cityName, MaelstromTools.Statics.Crystal);
                  rowIdx = this.createProductionLabels2(rowIdx, colIdx, cityName, MaelstromTools.Statics.Power);
                  rowIdx = this.createProductionLabels2(rowIdx, colIdx, cityName, MaelstromTools.Statics.Dollar);

                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName));
                }

                rowIdx = 1;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, "Total / h", 80, 'right', 'bold');

                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Total-", MaelstromTools.Statics.Tiberium);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Total-", MaelstromTools.Statics.Crystal);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Total-", MaelstromTools.Statics.Power);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Total-", MaelstromTools.Statics.Dollar);
              } catch (e) {
                console.log("MaelstromTools.Production.setWidgetLabels: ", e);
              }
            }
          }
        });

        // define RepairTime
        qx.Class.define("MaelstromTools.RepairTime", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          members: {

            updateCache: function () {
              try {
                MT_Cache.updateCityCache();
                this.Cache = Object();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  var RepLargest = '';

                  this.Cache[cname] = Object();
                  this.Cache[cname]["RepairTime"] = Object();
                  this.Cache[cname]["Repaircharge"] = Object();
                  this.Cache[cname]["Repaircharge"]["Smallest"] = 999999999;
                  this.Cache[cname]["RepairTime"]["Largest"] = 0;

                  this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Infantry] = ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);
                  this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Vehicle] = ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);
                  this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Aircraft] = ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);
                  this.Cache[cname]["RepairTime"]["Maximum"] = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.RepairChargeInf);
                  this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Infantry] = ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf);
                  this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Vehicle] = ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh);
                  this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Aircraft] = ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir);

                  if (this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Infantry] < this.Cache[cname]["Repaircharge"]["Smallest"]) {
                    this.Cache[cname]["Repaircharge"]["Smallest"] = this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Infantry];
                  }
                  if (this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Vehicle] < this.Cache[cname]["Repaircharge"]["Smallest"]) {
                    this.Cache[cname]["Repaircharge"]["Smallest"] = this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Vehicle];
                  }
                  if (this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Aircraft] < this.Cache[cname]["Repaircharge"]["Smallest"]) {
                    this.Cache[cname]["Repaircharge"]["Smallest"] = this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Aircraft];
                  }

                  if (this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Infantry] > this.Cache[cname]["RepairTime"]["Largest"]) {
                    this.Cache[cname]["RepairTime"]["Largest"] = this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Infantry];
                    RepLargest = "Infantry";
                  }
                  if (this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Vehicle] > this.Cache[cname]["RepairTime"]["Largest"]) {
                    this.Cache[cname]["RepairTime"]["Largest"] = this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Vehicle];
                    RepLargest = "Vehicle";
                  }
                  if (this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Aircraft] > this.Cache[cname]["RepairTime"]["Largest"]) {
                    this.Cache[cname]["RepairTime"]["Largest"] = this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Aircraft];
                    RepLargest = "Aircraft";
                  }

                  //PossibleAttacks and MaxAttacks fixes
                  var offHealth = ncity.GetOffenseConditionInPercent();
                  if (RepLargest !== '') {
                    this.Cache[cname]["RepairTime"]["LargestDiv"] = this.Cache[cname]["RepairTime"][RepLargest];
                    var i = Math.ceil(this.Cache[cname]["Repaircharge"].Smallest / this.Cache[cname]["RepairTime"].LargestDiv); //fix
                    var j = this.Cache[cname]["Repaircharge"].Smallest / this.Cache[cname]["RepairTime"].LargestDiv;
                    if (offHealth !== 100) { i--; i += '*';} // Decrease number of attacks by 1 when unit unhealthy. Additional visual info: asterisk when units aren't healthy
                    this.Cache[cname]["RepairTime"]["PossibleAttacks"] = i;
                    var k = this.Cache[cname]["RepairTime"].Maximum / this.Cache[cname]["RepairTime"].LargestDiv;
                    this.Cache[cname]["RepairTime"]["MaxAttacks"] = Math.ceil(k); //fix
                  } else {
                    this.Cache[cname]["RepairTime"]["LargestDiv"] = 0;
                    this.Cache[cname]["RepairTime"]["PossibleAttacks"] = 0;
                    this.Cache[cname]["RepairTime"]["MaxAttacks"] = 0;
                  }

                  var unitsData = ncity.get_CityUnitsData();
                  this.Cache[cname]["Base"] = Object();
                  this.Cache[cname]["Base"]["Level"] = MaelstromTools.Wrapper.GetBaseLevel(ncity);
                  this.Cache[cname]["Base"]["UnitLimit"] = ncity.GetBuildingSlotLimit(); //ncity.GetNumBuildings();
                  this.Cache[cname]["Base"]["TotalHeadCount"] = ncity.GetBuildingSlotCount();
                  this.Cache[cname]["Base"]["FreeHeadCount"] = this.Cache[cname]["Base"]["UnitLimit"] - this.Cache[cname]["Base"]["TotalHeadCount"];
                  this.Cache[cname]["Base"]["HealthInPercent"] = ncity.GetBuildingsConditionInPercent();

                  this.Cache[cname]["Offense"] = Object();
                  this.Cache[cname]["Offense"]["Level"] = (Math.floor(ncity.get_LvlOffense() * 100) / 100).toFixed(2);
                  this.Cache[cname]["Offense"]["UnitLimit"] = unitsData.get_UnitLimitOffense();
                  this.Cache[cname]["Offense"]["TotalHeadCount"] = unitsData.get_TotalOffenseHeadCount();
                  this.Cache[cname]["Offense"]["FreeHeadCount"] = unitsData.get_FreeOffenseHeadCount();
                  this.Cache[cname]["Offense"]["HealthInPercent"] = offHealth > 0 ? offHealth : 0;

                  this.Cache[cname]["Defense"] = Object();
                  this.Cache[cname]["Defense"]["Level"] = (Math.floor(ncity.get_LvlDefense() * 100) / 100).toFixed(2);
                  this.Cache[cname]["Defense"]["UnitLimit"] = unitsData.get_UnitLimitDefense();
                  this.Cache[cname]["Defense"]["TotalHeadCount"] = unitsData.get_TotalDefenseHeadCount();
                  this.Cache[cname]["Defense"]["FreeHeadCount"] = unitsData.get_FreeDefenseHeadCount();
                  this.Cache[cname]["Defense"]["HealthInPercent"] = ncity.GetDefenseConditionInPercent() > 0 ? ncity.GetDefenseConditionInPercent() : 0;

                  //console.log(ncity.get_CityUnitsData().get_UnitLimitOffense() + " / " + ncity.get_CityUnitsData().get_TotalOffenseHeadCount() + " = " + ncity.get_CityUnitsData().get_FreeOffenseHeadCount());
                  //console.log(ncity.get_CityUnitsData().get_UnitLimitDefense() + " / " + ncity.get_CityUnitsData().get_TotalDefenseHeadCount() + " = " + ncity.get_CityUnitsData().get_FreeDefenseHeadCount());
                }
              } catch (e) {
                console.log("MaelstromTools.RepairTime.updateCache: ", e);
              }
            },

            setWidgetLabels: function () {
              try {
                this.Widget.removeAll();
                var rowIdx = 1;

                rowIdx = this.createOverviewLabels(rowIdx);
                rowIdx = this.createRepairchargeLabels(rowIdx);
              } catch (e) {
                console.log("MaelstromTools.RepairTime.setWidgetLabels: ", e);
              }
            },

            createRepairchargeLabels: function (rowIdx) {
              try {
                var colIdx = 2;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx++, "Repaircharges", null, 'left', null, null, 3);
                colIdx = 2;

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Statics.Infantry, 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Statics.Vehicle, 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Statics.Aircraft, 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Repairtime", 80, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Attacks", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Next at", 80, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Max+1 at", 80, 'right');

                rowIdx++;
                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];
                  if (cityCache.Offense.UnitLimit == 0) {
                    continue;
                  }
                  colIdx = 1;
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityName, 80, 'left');

                  // Skip bases with no armies
                  if (cityCache.Offense.UnitLimit > 0) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(cityCache.RepairTime.Infantry), 60, 'right', null, (cityCache.RepairTime.Infantry == cityCache.RepairTime.LargestDiv ? "yellow" : "white"));
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(cityCache.RepairTime.Vehicle), 60, 'right', null, (cityCache.RepairTime.Vehicle == cityCache.RepairTime.LargestDiv ? "yellow" : "white"));
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(cityCache.RepairTime.Aircraft), 60, 'right', null, (cityCache.RepairTime.Aircraft == cityCache.RepairTime.LargestDiv ? "yellow" : "white"));
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(cityCache.Repaircharge.Smallest), 80, 'right');
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.RepairTime.PossibleAttacks + " / " + cityCache.RepairTime.MaxAttacks, 60, 'right', null, (cityCache.Offense.HealthInPercent !== 100 ? 'red' : null)); // mark red when unhealthy
                    var i = cityCache.RepairTime.LargestDiv * cityCache.RepairTime.PossibleAttacks;
                    var j = cityCache.RepairTime.LargestDiv * cityCache.RepairTime.MaxAttacks;
                    (i>0) ? MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(i), 80, 'right', null, (i > cityCache.RepairTime.Maximum ? "yellow" : "white")) : colIdx++; /// yellow if more than Maximum RT
                    (j>0) ? MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(j), 80, 'right') : colIdx++;
                  } else {
                    colIdx += 7;
                  }

                  colIdx += 4;
                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName, PerforceChangelist >= 376877 ? ClientLib.Data.PlayerAreaViewMode.pavmPlayerOffense : webfrontend.gui.PlayArea.PlayArea.modes.EMode_PlayerOffense));
                  rowIdx += 2;
                }

                return rowIdx;
              } catch (e) {
                console.log("MaelstromTools.RepairTime.createRepairchargeLabels: ", e);
              }
            },

            createOverviewLabels: function (rowIdx) {
              try {
                var colIdx = 2;

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, "Base", 60, 'right');
                colIdx += 3;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, "Defense", 60, 'right');
                colIdx += 3;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, "Army", 60, 'right');

                rowIdx++;
                colIdx = 2;

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Level", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Buildings", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Health", 60, 'right');

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Level", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Buildings", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Health", 60, 'right');

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Level", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Units", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Health", 60, 'right');

                rowIdx++;
                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];
                  colIdx = 1;

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityName, 80, 'left');

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Base.Level, 60, 'right');
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Base.TotalHeadCount + " / " + cityCache.Base.UnitLimit, 60, 'right', null, (cityCache.Base.FreeHeadCount >= 1 ? "red" : "white"));
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Base.HealthInPercent + "%", 60, 'right', null, (cityCache.Base.HealthInPercent < 25 ? "red" : (cityCache.Base.HealthInPercent < 100 ? "yellow" : "white")));

                  if (cityCache.Defense.UnitLimit > 0) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Defense.Level, 60, 'right');
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Defense.TotalHeadCount + " / " + cityCache.Defense.UnitLimit, 60, 'right', null, (cityCache.Defense.FreeHeadCount >= 5 ? "red" : (cityCache.Defense.FreeHeadCount >= 3 ? "yellow" : "white")));
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Defense.HealthInPercent + "%", 60, 'right', null, (cityCache.Defense.HealthInPercent < 25 ? "red" : (cityCache.Defense.HealthInPercent < 100 ? "yellow" : "white")));
                  } else {
                    colIdx += 3;
                  }

                  // Skip bases with no armies
                  if (cityCache.Offense.UnitLimit > 0) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Offense.Level, 60, 'right');
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Offense.TotalHeadCount + " / " + cityCache.Offense.UnitLimit, 60, 'right', null, (cityCache.Offense.FreeHeadCount >= 10 ? "red" : (cityCache.Offense.FreeHeadCount >= 5 ? "yellow" : "white")));
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Offense.HealthInPercent + "%", 60, 'right', null, (cityCache.Offense.HealthInPercent < 25 ? "red" : (cityCache.Offense.HealthInPercent < 100 ? "yellow" : "white")));
                  } else {
                    colIdx += 3;
                  }

                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName));
                  rowIdx += 2;
                }
                return rowIdx;
              } catch (e) {
                console.log("MaelstromTools.RepairTime.createOverviewLabels: ", e);
              }
            }

          }
        });

        // define ResourceOverview
        qx.Class.define("MaelstromTools.ResourceOverview", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          members: {
            Table: null,
            Model: null,

            updateCache: function () {
              try {
                MT_Cache.updateCityCache();
                this.Cache = Object();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  var mtime = ClientLib.Data.MainData.GetInstance().get_Time();

                  this.Cache[cname] = Object();
                  this.Cache[cname][MaelstromTools.Statics.Tiberium] = ncity.GetResourceCount(ClientLib.Base.EResourceType.Tiberium);
                  this.Cache[cname][MaelstromTools.Statics.Tiberium + "Max"] = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Tiberium);
                  this.Cache[cname][MaelstromTools.Statics.Tiberium + "Full"] = mtime.GetJSStepTime(ncity.GetResourceStorageFullStep(ClientLib.Base.EResourceType.Tiberium));
                  this.Cache[cname][MaelstromTools.Statics.Crystal] = ncity.GetResourceCount(ClientLib.Base.EResourceType.Crystal);
                  this.Cache[cname][MaelstromTools.Statics.Crystal + "Max"] = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Crystal);
                  this.Cache[cname][MaelstromTools.Statics.Crystal + "Full"] = mtime.GetJSStepTime(ncity.GetResourceStorageFullStep(ClientLib.Base.EResourceType.Crystal));
                  this.Cache[cname][MaelstromTools.Statics.Power] = ncity.GetResourceCount(ClientLib.Base.EResourceType.Power);
                  this.Cache[cname][MaelstromTools.Statics.Power + "Max"] = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Power);
                  this.Cache[cname][MaelstromTools.Statics.Power + "Full"] = mtime.GetJSStepTime(ncity.GetResourceStorageFullStep(ClientLib.Base.EResourceType.Power));
                }

              } catch (e) {
                console.log("MaelstromTools.ResourceOverview.updateCache: ", e);
              }
            },
/*
            setWidgetLabelsTable: function () {
              try {
                if (!this.Table) {
                  this.Widget.setLayout(new qx.ui.layout.HBox());

                  this.Model = new qx.ui.table.model.Simple();
                  this.Model.setColumns(["City", "Tib. Storage", "Tiberium", "Full", "Crystal", "Full", "Power", "Storage", "Full"]);
                  this.Table = new qx.ui.table.Table(this.Model);
                  this.Widget.add(this.Table, {
                    flex: 1
                  });
                }

                var Totals = Object();
                Totals[MaelstromTools.Statics.Tiberium] = 0;
                Totals[MaelstromTools.Statics.Crystal] = 0;
                Totals[MaelstromTools.Statics.Power] = 0;
                Totals[MaelstromTools.Statics.Tiberium + "Max"] = 0;
                Totals[MaelstromTools.Statics.Power + "Max"] = 0;

                var rowData = [];

                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];

                  Totals[MaelstromTools.Statics.Tiberium] += cityCache[MaelstromTools.Statics.Tiberium];
                  Totals[MaelstromTools.Statics.Crystal] += cityCache[MaelstromTools.Statics.Crystal];
                  Totals[MaelstromTools.Statics.Power] += cityCache[MaelstromTools.Statics.Power];
                  Totals[MaelstromTools.Statics.Tiberium + "Max"] += cityCache[MaelstromTools.Statics.Tiberium + 'Max'];
                  Totals[MaelstromTools.Statics.Power + "Max"] += cityCache[MaelstromTools.Statics.Power + 'Max'];

                  rowData.push([
                    cityName,
                    MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Tiberium + 'Max']),
                    MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Tiberium]),
                    MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Tiberium + 'Full']),
                    MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Crystal]),
                    MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Crystal + 'Full']),
                    MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Power]),
                    MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Power + 'Max']),
                    MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Power + 'Full'])
                    ]);
                }
                rowData.push([
                  'Total resources',
                  MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Tiberium + 'Max']),
                  MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Tiberium]),
                  '',
                  MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Crystal]),
                  '',
                  MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Power]),
                  MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Power + 'Max']),
                  ''
                  ]);

                this.Model.setData(rowData);
              } catch (e) {
                console.log("MaelstromTools.ResourceOverview.setWidgetLabels: ", e);
              }
            },

            */
            setWidgetLabels: function () {
              try {
                this.Widget.removeAll();

                var first = true;
                var rowIdx = 2;
                var Totals = Object();
                var colIdx = 1;
                Totals[MaelstromTools.Statics.Tiberium] = 0;
                Totals[MaelstromTools.Statics.Crystal] = 0;
                Totals[MaelstromTools.Statics.Power] = 0;
                Totals[MaelstromTools.Statics.Tiberium + "Max"] = 0;
                Totals[MaelstromTools.Statics.Power + "Max"] = 0;

                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];
                  Totals[MaelstromTools.Statics.Tiberium] += cityCache[MaelstromTools.Statics.Tiberium];
                  Totals[MaelstromTools.Statics.Crystal] += cityCache[MaelstromTools.Statics.Crystal];
                  Totals[MaelstromTools.Statics.Power] += cityCache[MaelstromTools.Statics.Power];
                  Totals[MaelstromTools.Statics.Tiberium + "Max"] += cityCache[MaelstromTools.Statics.Tiberium + 'Max'];
                  Totals[MaelstromTools.Statics.Power + "Max"] += cityCache[MaelstromTools.Statics.Power + 'Max'];

                  colIdx = 1;

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityName, 100, 'left');
                  if (first) {
                    MaelstromTools.Util.addLabel(this.Widget, 1, colIdx, 'Max. storage', 80, 'left');
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Tiberium + 'Max']), 80, 'right');

                  if (first) {
                    MaelstromTools.Util.addImage(this.Widget, 1, colIdx, MaelstromTools.Util.getImage(MaelstromTools.Statics.Tiberium));
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Tiberium]), 60, 'right', null, (cityCache[MaelstromTools.Statics.Tiberium] >= cityCache[MaelstromTools.Statics.Tiberium + 'Max'] ? "red" : (cityCache[MaelstromTools.Statics.Tiberium] >= (0.75 * cityCache[MaelstromTools.Statics.Tiberium + 'Max']) ? "yellow" : "white")));

                  if (cityCache[MaelstromTools.Statics.Tiberium] < cityCache[MaelstromTools.Statics.Tiberium + 'Max']) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Tiberium + 'Full']), 100, 'right', null, (cityCache[MaelstromTools.Statics.Tiberium] >= (0.75 * cityCache[MaelstromTools.Statics.Tiberium + 'Max']) ? "yellow" : "white"));
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Storage full!", 100, 'right', null, "red");
                  }
                  if (first) {
                    MaelstromTools.Util.addImage(this.Widget, 1, colIdx, MaelstromTools.Util.getImage(MaelstromTools.Statics.Crystal));
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Crystal]), 60, 'right', null, (cityCache[MaelstromTools.Statics.Crystal] >= cityCache[MaelstromTools.Statics.Crystal + 'Max'] ? "red" : (cityCache[MaelstromTools.Statics.Crystal] >= (0.75 * cityCache[MaelstromTools.Statics.Crystal + 'Max']) ? "yellow" : "white")));

                  if (cityCache[MaelstromTools.Statics.Crystal] < cityCache[MaelstromTools.Statics.Crystal + 'Max']) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Crystal + 'Full']), 100, 'right', null, (cityCache[MaelstromTools.Statics.Crystal] >= (0.75 * cityCache[MaelstromTools.Statics.Crystal + 'Max']) ? "yellow" : "white"));
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Storage full!", 100, 'right', null, "red");
                  }

                  if (first) {
                    MaelstromTools.Util.addImage(this.Widget, 1, colIdx, MaelstromTools.Util.getImage(MaelstromTools.Statics.Power));
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Power]), 60, 'right', null, (cityCache[MaelstromTools.Statics.Power] >= cityCache[MaelstromTools.Statics.Power + 'Max'] ? "red" : (cityCache[MaelstromTools.Statics.Power] >= (0.75 * cityCache[MaelstromTools.Statics.Power + 'Max']) ? "yellow" : "white")));

                  if (first) {
                    MaelstromTools.Util.addLabel(this.Widget, 1, colIdx, 'Storage', 80, 'left');
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Power + 'Max']), 80, 'right');

                  if (cityCache[MaelstromTools.Statics.Power] < cityCache[MaelstromTools.Statics.Power + 'Max']) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Power + 'Full']), 100, 'right', null, (cityCache[MaelstromTools.Statics.Power] >= (0.75 * cityCache[MaelstromTools.Statics.Power + 'Max']) ? "yellow" : "white"));
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Storage full!", 100, 'right', null, "red");
                  }


                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName));
                  rowIdx++;
                  first = false;
                }

                colIdx = 1;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Total resources", 100, 'left', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Tiberium + 'Max']), 80, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Tiberium]), 60, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, Math.round(Totals[MaelstromTools.Statics.Tiberium] / Totals[MaelstromTools.Statics.Tiberium + 'Max'] * 100) + '%', 100, 'center', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Crystal]), 60, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, Math.round(Totals[MaelstromTools.Statics.Crystal] / Totals[MaelstromTools.Statics.Tiberium + 'Max'] * 100) + '%', 100, 'center', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Power]), 60, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Power + 'Max']), 80, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, Math.round(Totals[MaelstromTools.Statics.Power] / Totals[MaelstromTools.Statics.Power + 'Max'] * 100) + '%', 100, 'center', 'bold');
              } catch (e) {
                console.log("MaelstromTools.ResourceOverview.setWidgetLabels: ", e);
              }
            }
          }
        });

        // define BaseStatus
        qx.Class.define("MaelstromTools.BaseStatus", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          members: {
            CityMenuButtons: null,

            //City.SetDedicatedSupport
            //City.RecallDedicatedSupport
            //City.get_SupportDedicatedBaseId
            //System.String get_SupportDedicatedBaseName ()
            updateCache: function () {
              try {
                MT_Cache.updateCityCache();
                this.Cache = Object();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  var player = ClientLib.Data.MainData.GetInstance().get_Player();
                  var supportData = ncity.get_SupportData();
                  //System.String get_PlayerName ()
                  this.Cache[cname] = Object();
                  // Movement lock
                  this.Cache[cname]["HasCooldown"] = ncity.get_hasCooldown();
                  this.Cache[cname]["CooldownEnd"] = Math.max(ncity.get_MoveCooldownEndStep(), ncity.get_MoveRestictionEndStep());
                  this.Cache[cname]["MoveCooldownEnd"] = ncity.get_MoveCooldownEndStep();
                  this.Cache[cname]["MoveLockdownEnd"] = ncity.get_MoveRestictionEndStep();
                  this.Cache[cname]["IsProtected"] = ncity.get_isProtected();
                  this.Cache[cname]["ProtectionEnd"] = ncity.get_ProtectionEndStep();
                  this.Cache[cname]["IsProtected"] = ncity.get_ProtectionEndStep();
                  this.Cache[cname]["IsAlerted"] = ncity.get_isAlerted();

                  // Supportweapon
                  if (supportData == null) {
                    this.Cache[cname]["HasSupportWeapon"] = false;
                  } else {
                    this.Cache[cname]["HasSupportWeapon"] = true;
                    if (ncity.get_SupportDedicatedBaseId() > 0) {
                      this.Cache[cname]["SupportedCityId"] = ncity.get_SupportDedicatedBaseId();
                      this.Cache[cname]["SupportedCityName"] = ncity.get_SupportDedicatedBaseName();
                      var coordId = ncity.get_SupportDedicatedBaseCoordId();
                      this.Cache[cname]["SupportedCityX"] = (coordId & 0xffff);
                      this.Cache[cname]["SupportedCityY"] = ((coordId >> 0x10) & 0xffff);
                      /*
                      var cityX = ncity.get_PosX();
                      var cityY = ncity.get_PosY();
                      
                      var mainData = ClientLib.Data.MainData.GetInstance();
                      var visRegion = ClientLib.Vis.VisMain.GetInstance().get_Region();

                      var gridW = visRegion.get_GridWidth();
                      var gridH = visRegion.get_GridHeight();
                      //console.log(cname);
                      //console.log("x: " + cityX + " y: " + cityY);

                      var worldObj = visRegion.GetObjectFromPosition((this.Cache[cname]["SupportedCityX"]*gridW), (this.Cache[cname]["SupportedCityY"]*gridH));
                      
                      //ClientLib.Vis.Region.RegionCity
                      if (worldObj == null) {
                        this.Cache[cname]["SupportTime"] = "";
                      } else {
                        console.log(cname);
                        //console.log(worldObj.CalibrationSupportDuration());
                        var weaponState = worldObj.get_SupportWeaponStatus();
                        
                        //console.log(this.calcDuration(ncity, worldObj));
                        var cities = ClientLib.Data.MainData.GetInstance().get_Cities();
                        cities.set_CurrentOwnCityId(ncity.get_Id());
                        var status = worldObj.get_SupportWeaponStatus();
                        var server = mainData.get_Server();
                        //console.log(worldObj.CalculateSupportCalibrationEndStep(worldObj.get_SupportData(), worldObj.get_SupportWeapon()));
                        console.log(status);
                        console.log(currStep);
                        this.Cache[cname]["SupportTime"] = mainData.get_Time().GetTimespanString(worldObj.CalculateSupportCalibrationEndStep(worldObj.get_SupportData(), worldObj.get_SupportWeapon()), currStep);
                        //status.Status&ClientLib.Vis.Region.ESupportWeaponStatus.Calibrating)==ClientLib.Vis.Region.ESupportWeaponStatus.Calibrating
                        var currStep = ClientLib.Data.MainData.GetInstance().get_Time().GetServerStep();
                        //this.Cache[cname]["SupportTime"] = webfrontend.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(Math.max(0, status.CalibrationEndStep) - currStep), false);
                        //this.Cache[cname]["SupportTime"] = ClientLib.Data.MainData.GetInstance().get_Time().GetTimespanString(weaponState.CalibrationEndStep, currStep);
                        //this.Cache[cname]["SupportTime"] = webfrontend.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(Math.max(0, worldObj.CalculateSupportCalibrationEndStep(worldObj.get_SupportData(), worldObj.get_SupportWeapon()) - currStep)), false);
                      //console.log(this.Cache[cname]["SupportTime"]);
                      }
                       */
                    } else { // prevent reference to undefined property ReferenceError
                      this.Cache[cname]["SupportedCityId"] = null;
                      this.Cache[cname]["SupportedCityName"] = null;
                      this.Cache[cname]["SupportedCityX"] = null;
                      this.Cache[cname]["SupportedCityY"] = null;
                    }
                    this.Cache[cname]["SupportRange"] = MaelstromTools.Wrapper.GetSupportWeaponRange(ncity.get_SupportWeapon());
                    var techName = ClientLib.Base.Tech.GetTechNameFromTechId(supportData.get_Type(), player.get_Faction());
                    this.Cache[cname]["SupportName"] = ClientLib.Base.Tech.GetProductionBuildingNameFromFaction(techName, player.get_Faction());
                    this.Cache[cname]["SupportLevel"] = supportData.get_Level();
                    //this.Cache[cname]["SupportBuilding"] = ncity.get_CityBuildingsData().GetUniqueBuildingByTechName(techName);
                    //console.log(this.Cache[cname]["SupportBuilding"]);
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.BaseStatus.updateCache: ", e);
              }
            },
            /*
            calcDuration: function(currOwnCity, regionCity) {
              var targetCity = MaelstromTools.Wrapper.GetCity(regionCity.get_Id());
              
              var supportBase=regionCity.get_SupportData();
              if(supportBase == null)
              {
                return -1;
              }
              var weapon=regionCity.get_SupportWeapon();
              if(weapon == null)
              {
                return -1;
              }
              if(currOwnCity.get_Id() == regionCity.get_Id())
              {
                if(supportBase.get_Magnitude() == 0) {
                  return -1;
                }
                return 0;
              }
              var dx=(currOwnCity.get_X() - targetCity.get_PosX());
              var dy=(currOwnCity.get_Y() - targetCity.get_PosY());
              var distance=((dx * dx) + (dy * dy));
              return Math.floor((weapon.pt + (weapon.tpf * Math.floor((Math.sqrt(distance) + 0.5)))));
            },*/

            setWidgetLabels: function () {
              try {
                this.Widget.removeAll();
                var rowIdx = 1;
                var colIdx = 2;

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Cooldown", 85, 'left');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Protection", 85, 'left');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Available weapon", 140, 'left');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Calibrated on", 140, 'left');

                //colIdx++;
                var rowIdxRecall = rowIdx;
                var colIdxRecall = 0;
                var supportWeaponCount = 0;

                rowIdx++;
                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];
                  colIdx = 1;

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityName, 100, 'left', null, (cityCache.IsAlerted ? 'red' : null));

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetStepTime(cityCache.CooldownEnd), 70, 'right');
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetStepTime(cityCache.ProtectionEnd), 70, 'right');

                  if (!cityCache.HasSupportWeapon) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "none", 140, 'left');
                    colIdx += 2;
                  } else {
                    supportWeaponCount++;
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.SupportName + " (" + cityCache.SupportLevel + ")", 140, 'left');

                    if (cityCache.SupportedCityId > 0) {
                      MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.SupportedCityName, 140, 'left');
                      colIdxRecall = colIdx;
                      MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, this.getRecallButton(cityName));
                    } else {
                      colIdx += 2;
                    }
                  }

                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName));
                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getFocusBaseButton(cityName));

                  rowIdx++;
                }

                if (supportWeaponCount > 0 && colIdxRecall > 0) {
                  MaelstromTools.Util.addElement(this.Widget, rowIdxRecall, colIdxRecall, this.getRecallAllButton());
                }
              } catch (e) {
                console.log("MaelstromTools.BaseStatus.setWidgetLabels: ", e);
              }
            },

            getRecallAllButton: function () {
              var button = new qx.ui.form.Button("Recall all").set({
                appearance: "button-text-small",
                toolTipText: "Recall all support weapons",
                width: 100,
                height: 20
              });
              button.addListener("execute", function (e) {
                MaelstromTools.Util.recallAllSupport();
              }, this);
              return button;
            },

            getRecallButton: function (cityName) {
              var button = new qx.ui.form.Button("Recall").set({
                appearance: "button-text-small",
                toolTipText: "Recall support to " + cityName,
                width: 100,
                height: 20
              });
              button.addListener("execute", function (e) {
                MaelstromTools.Util.recallSupport(cityName);
              }, this);
              return button;
            }
            /*
            getCalibrateAllOnSelectedBaseButton: function() {
              var button = new qx.ui.form.Button("Calibrate all weapons on selected base").set({
                appearance: "button-text-small",
                toolTipText: "Calibrate all weapons",
                width: 100,
                height: 20
              });
              button.addListener("execute", function(e){
                Util.calibrateWholeSupport(ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId());
              }, this);
              return button;
            }*/


          }
        });

        // define Statics
        qx.Class.define("MaelstromTools.Statics", {
          type: "static",
          statics: {
            Tiberium: 'Tiberium',
            Crystal: 'Crystal',
            Power: 'Power',
            Dollar: 'Dollar',
            Research: 'Research',
            Vehicle: "Vehicle",
            Aircraft: "Aircraft",
            Infantry: "Infantry",

            LootTypeName: function (ltype) {
              switch (ltype) {
                case ClientLib.Base.EResourceType.Tiberium:
                  return MaelstromTools.Statics.Tiberium;
                  break;
                case ClientLib.Base.EResourceType.Crystal:
                  return MaelstromTools.Statics.Crystal;
                  break;
                case ClientLib.Base.EResourceType.Power:
                  return MaelstromTools.Statics.Power;
                  break;
                case ClientLib.Base.EResourceType.Gold:
                  return MaelstromTools.Statics.Dollar;
                  break;
                default:
                  return "";
                  break;
              }
            }
          }
        });

        // define Util
        //ClientLib.Data.Cities.prototype.GetCityByCoord
        //ClientLib.Data.City.prototype.get_HasIncommingAttack
        qx.Class.define("MaelstromTools.Util", {
          type: "static",
          statics: {
            ArrayUnique: function (array) {
              var o = {};
              var l = array.length;
              r = [];
              for (var i = 0; i < l; i++) o[array[i]] = array[i];
              for (var i in o) r.push(o[i]);
              return r;
            },

            ArraySize: function (array) {
              var size = 0;
              for (var key in array)
              if (array.hasOwnProperty(key)) size++;
              return size;
            },

            addLabel: function (widget, rowIdx, colIdx, value, width, textAlign, font, color, colSpan) {
              try {
                var label = new qx.ui.basic.Label().set({
                  value: Lang.gt(value)
                });
                if (width) {
                  label.setWidth(width);
                }
                if (textAlign) {
                  label.setTextAlign(textAlign);
                }
                if (color) {
                  label.setTextColor(color);
                }
                if (font) {
                  label.setFont(font);
                }
                if (!colSpan || colSpan == 0) {
                  colSpan = 1;
                }

                widget.add(label, {
                  row: rowIdx,
                  column: colIdx,
                  colSpan: colSpan
                });
              } catch (e) {
                console.log("MaelstromTools.Util.addLabel: ", e);
              }
            },

            addElement: function (widget, rowIdx, colIdx, element, colSpan) {
              try {
                if (!colSpan || colSpan == 0) {
                  colSpan = 1;
                }
                widget.add(element, {
                  row: rowIdx,
                  column: colIdx,
                  colSpan: colSpan
                });
              } catch (e) {
                console.log("MaelstromTools.Util.addElement: ", e);
              }
            },

            addImage: function (widget, rowIdx, colIdx, image) {
              try {
                widget.add(image, {
                  row: rowIdx,
                  column: colIdx
                });
              } catch (e) {
                console.log("MaelstromTools.Util.addImage: ", e);
              }
            },

            getImage: function (name) {
              var image = new qx.ui.basic.Image(MT_Base.images[name]);
              image.setScale(true);
              image.setWidth(20);
              image.setHeight(20);
              return image;
            },

            getAccessBaseButton: function (cityName, viewMode) {
              try {
                var cityButton = new qx.ui.form.Button(null, MT_Base.images["AccessBase"]).set({
                  appearance: "button-detailview-small",
                  toolTipText: Lang.gt("Access") + " " + cityName,
                  width: 20,
                  height: 20,
                  marginLeft: 5
                });
                cityButton.setUserData("cityId", MT_Cache.Cities[cityName].ID);
                cityButton.setUserData("viewMode", viewMode);
                cityButton.addListener("execute", function (e) {
                  MaelstromTools.Util.accessBase(e.getTarget().getUserData("cityId"), e.getTarget().getUserData("viewMode"));
                }, this);
                return cityButton;
              } catch (e) {
                console.log("MaelstromTools.Util.getAccessBaseButton: ", e);
              }
            },

            getFocusBaseButton: function (cityName) {
              try {
                var cityButton = new qx.ui.form.Button(null, MT_Base.images["FocusBase"]).set({
                  appearance: "button-detailview-small",
                  toolTipText: Lang.gt("Focus on") + " " + cityName,
                  width: 20,
                  height: 20,
                  marginLeft: 5
                });
                cityButton.setUserData("cityId", MT_Cache.Cities[cityName].ID);
                cityButton.addListener("execute", function (e) {
                  MaelstromTools.Util.focusBase(e.getTarget().getUserData("cityId"));
                }, this);
                return cityButton;
              } catch (e) {
                console.log("MaelstromTools.Util.getFocusBaseButton: ", e);
              }
            },

            accessBase: function (cityId, viewMode) {
              try {
                if (cityId > 0) {
                  var ncity = MaelstromTools.Wrapper.GetCity(cityId);

                  if (ncity != null && !ncity.get_IsGhostMode()) {
                    if (viewMode) {
                      webfrontend.gui.UtilView.openVisModeInMainWindow(viewMode, cityId, false);
                    } else {
                      webfrontend.gui.UtilView.openCityInMainWindow(cityId);
                    }
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.Util.accessBase: ", e);
              }
            },
            focusBase: function (cityId) {
              try {
                if (cityId > 0) {
                  var ncity = MaelstromTools.Wrapper.GetCity(cityId);

                  if (ncity != null && !ncity.get_IsGhostMode()) {
                    webfrontend.gui.UtilView.centerCityOnRegionViewWindow(cityId);
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.Util.focusBase: ", e);
              }
            },

            recallSupport: function (cityName) {
              try {
                var ncity = MT_Cache.Cities[cityName]["Object"];
                ncity.RecallDedicatedSupport();
              } catch (e) {
                console.log("MaelstromTools.Util.recallSupport: ", e);
              }
            },

            recallAllSupport: function () {
              try {
                MT_Cache.updateCityCache();
                for (var cityName in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cityName]["Object"];
                  ncity.RecallDedicatedSupport();
                }
              } catch (e) {
                console.log("MaelstromTools.Util.recallAllSupport: ", e);
              }
            },

            checkIfSupportIsAllowed: function (selectedBase) {
              try {
                if (selectedBase.get_VisObjectType() != ClientLib.Vis.VisObject.EObjectType.RegionCityType) {
                  return false;
                }
                if (selectedBase.get_Type() != ClientLib.Vis.Region.RegionCity.ERegionCityType.Own && selectedBase.get_Type() != ClientLib.Vis.Region.RegionCity.ERegionCityType.Alliance) {
                  return false;
                }
                return true;
              } catch (e) {
                console.log("MaelstromTools.Util.checkIfSupportIsAllowed: ", e);
                return false;
              }
            },

            calibrateWholeSupportOnSelectedBase: function () {
              if (this.checkIfSupportIsAllowed(MT_Cache.SelectedBaseForMenu)) {
                this.calibrateWholeSupport(MT_Cache.SelectedBaseForMenu);
              }
            },

            calibrateWholeSupport: function (targetRegionCity) {
              try {
                MT_Cache.updateCityCache();
                for (var cityName in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cityName]["Object"];
                  //var targetCity = MaelstromTools.Wrapper.GetCity(targetCityId);
                  var weapon = ncity.get_SupportWeapon();

                  //console.log("checking support weapon for " + ncity.get_Name() + " calibrating on " + targetRegionCity.get_Name());

                  if (targetRegionCity != null && weapon != null) {
                    //console.log("city at " + ncity.get_X() + " / " + ncity.get_Y());
                    //console.log("targetRegionCity at " + targetRegionCity.get_RawX() + " / " + targetRegionCity.get_RawY());
                    //var distance = ClientLib.Base.Util.CalculateDistance(ncity.get_X(), ncity.get_Y(), targetRegionCity.get_RawX(), targetRegionCity.get_RawY());
                    var dx = (ncity.get_X() - targetRegionCity.get_RawX());
                    var dy = (ncity.get_Y() - targetRegionCity.get_RawY());
                    var distance = ((dx * dx) + (dy * dy));
                    var range = MaelstromTools.Wrapper.GetSupportWeaponRange(weapon);
                    //console.log("distance is " + distance);
                    //console.log("range isy " + range*range);
                    if (distance <= (range * range)) {
                      ncity.SetDedicatedSupport(targetRegionCity.get_Id());
                    }
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.Util.calibrateWholeSupport: ", e);
              }
            },

            // visCity : ClientLib.Vis.Region.RegionObject
            getResources: function (visCity) { // to verifier against PerforceChangelist>=376877
              try {
                var loot = new Object();
                if (visCity.get_X() < 0 || visCity.get_Y() < 0) {
                  loot["LoadState"] = 0;
                  return loot;
                }
                var currentOwnCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();

                var distance = ClientLib.Base.Util.CalculateDistance(currentOwnCity.get_X(), currentOwnCity.get_Y(), visCity.get_RawX(), visCity.get_RawY());
                var maxAttackDistance = ClientLib.Data.MainData.GetInstance().get_Server().get_MaxAttackDistance();
                if (distance > maxAttackDistance) {
                  loot["LoadState"] = -1;
                  return loot;
                }

                var ncity = MaelstromTools.Wrapper.GetCity(visCity.get_Id());
                /* ClientLib.Data.CityBuildings */
                //var cityBuildings = ncity.get_CityBuildingsData();
                var cityUnits = ncity.get_CityUnitsData();

                //var buildings = MaelstromTools.Wrapper.GetBuildings(cityBuildings);
                var buildings = ncity.get_Buildings().d;
                var defenseUnits = MaelstromTools.Wrapper.GetDefenseUnits(cityUnits);
                //var defenseUnits = MaelstromTools.Wrapper.GetDefenseUnits();

                /*for(var u in buildings) {
              console.log(buildings[u].get_MdbBuildingId());
              console.log("----------------");
            }*/

                var buildingLoot = MaelstromTools.Util.getResourcesPart(buildings);
                //var buildingLoot2 = MaelstromTools.Util.getResourcesPart(this.collectBuildings(ncity));

                var unitLoot = MaelstromTools.Util.getResourcesPart(defenseUnits);

                loot[MaelstromTools.Statics.Tiberium] = buildingLoot[ClientLib.Base.EResourceType.Tiberium] + unitLoot[ClientLib.Base.EResourceType.Tiberium];
                loot[MaelstromTools.Statics.Crystal] = buildingLoot[ClientLib.Base.EResourceType.Crystal] + unitLoot[ClientLib.Base.EResourceType.Crystal];
                loot[MaelstromTools.Statics.Dollar] = buildingLoot[ClientLib.Base.EResourceType.Gold] + unitLoot[ClientLib.Base.EResourceType.Gold];
                loot[MaelstromTools.Statics.Research] = buildingLoot[ClientLib.Base.EResourceType.ResearchPoints] + unitLoot[ClientLib.Base.EResourceType.ResearchPoints];
                loot["Factor"] = loot[MaelstromTools.Statics.Tiberium] + loot[MaelstromTools.Statics.Crystal] + loot[MaelstromTools.Statics.Dollar] + loot[MaelstromTools.Statics.Research];
                loot["CPNeeded"] = currentOwnCity.CalculateAttackCommandPointCostToCoord(ncity.get_X(), ncity.get_Y());
                loot["LoadState"] = (loot["Factor"] > 0 ? 1 : 0);
                loot["Total"] = loot[MaelstromTools.Statics.Research] + loot[MaelstromTools.Statics.Tiberium] + loot[MaelstromTools.Statics.Crystal] + loot[MaelstromTools.Statics.Dollar];

                /*console.log("Building loot");
                console.log( buildingLoot[ClientLib.Base.EResourceType.Tiberium] + " vs " +  buildingLoot2[ClientLib.Base.EResourceType.Tiberium]);
                console.log( buildingLoot[ClientLib.Base.EResourceType.Crystal] + " vs " +  buildingLoot2[ClientLib.Base.EResourceType.Crystal]);
                console.log( buildingLoot[ClientLib.Base.EResourceType.Gold] + " vs " +  buildingLoot2[ClientLib.Base.EResourceType.Gold]);
                console.log( buildingLoot[ClientLib.Base.EResourceType.ResearchPoints] + " vs " +  buildingLoot2[ClientLib.Base.EResourceType.ResearchPoints]);
                console.log("-------------");*/
                return loot;
              } catch (e) {
                console.log("MaelstromTools.Util.getResources", e);
              }
            },
            /*
            collectBuildings: function(ncity) {
              var cityBuildings = ncity.get_CityBuildingsData();
              var buildings = new Array();
              var count = 0;
              // ncity.GetNumBuildings()
              for(var i = 0; i < 100000; i++) {
                var building = cityBuildings.GetBuildingByMDBId(i);
                if(!building) {
                  continue;
                }
                
                //console.log(building.get_TechName() + " - " + ncity.get_CityFaction() + " - " + ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(building.get_TechName(), ncity.get_CityFaction()) + " at lvl " + building.get_CurrentLevel());
                buildings.push(building);
              //buildings[count++] = building;
              }
              return buildings; //MaelstromTools.Util.ArrayUnique(buildings);
            },*/

            getResourcesPart: function (cityEntities) {
              try {
                var loot = [0, 0, 0, 0, 0, 0, 0, 0];
                if (cityEntities == null) {
                  return loot;
                }

                var objcityEntities = [];
                if (PerforceChangelist >= 376877) { //new
                  for (var o in cityEntities) objcityEntities.push(cityEntities[o]);
                } else { //old
                  for (var i = 0; i < cityEntities.length; i++) objcityEntities.push(cityEntities[i]);
                }

                for (var i = 0; i < objcityEntities.length; i++) {
                  var cityEntity = objcityEntities[i];
                  var unitLevelRequirements = MaelstromTools.Wrapper.GetUnitLevelRequirements(cityEntity);

                  for (var x = 0; x < unitLevelRequirements.length; x++) {
                    loot[unitLevelRequirements[x].Type] += unitLevelRequirements[x].Count * cityEntity.get_HitpointsPercent();
                    if (cityEntity.get_HitpointsPercent() < 1.0) {
                      // destroyed

                    }
                  }
                }

                return loot;
              } catch (e) {
                console.log("MaelstromTools.Util.getResourcesPart", e);
              }
            }

            /*
            findBuildings: function(city) {
              for (var k in city) {
                if ((typeof(city[k]) == "object") && city[k] && city[k] && 0 in city[k]) {
                  if ((typeof(city[k][0]) == "object")  && city[k][0] && "BuildingDBId" in city[k][0]) {
                    return city[k];
                  }
                }
              }
              return [];
            }*/
          }
        });

        // define Wrapper
        qx.Class.define("MaelstromTools.Wrapper", {
          type: "static",
          statics: {
            GetStepTime: function (step, defaultString) {
              if (!defaultString) {
                defaultString = "";
              }
              var endTime = ClientLib.Data.MainData.GetInstance().get_Time().GetTimespanString(step, ClientLib.Data.MainData.GetInstance().get_Time().GetServerStep());
              if (endTime == "00:00") {
                return defaultString;
              }
              return endTime;
            },

            FormatNumbersCompact: function (value) {
              if (PerforceChangelist >= 387751) { //new
                return phe.cnc.gui.util.Numbers.formatNumbersCompact(value);
              } else { //old
                return webfrontend.gui.Util.formatNumbersCompact(value);
              }
            },

            GetDateTimeString: function (value) {
                return phe.cnc.Util.getDateTimeString(value);
            },

            FormatTimespan: function (value) {
              return ClientLib.Vis.VisMain.FormatTimespan(value);
            },

            GetSupportWeaponRange: function (weapon) {
              return weapon.r;
            },

            GetCity: function (cityId) {
              return ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(cityId);
            },

            RepairAll: function (ncity, visMode) {
              var oldMode = ClientLib.Vis.VisMain.GetInstance().get_Mode();
              ClientLib.Vis.VisMain.GetInstance().set_Mode(visMode);
              ncity.RepairAll();
              ClientLib.Vis.VisMain.GetInstance().set_Mode(oldMode);
            },

            CanRepairAll: function (ncity, viewMode) {
              try {
                /*var oldMode = ClientLib.Vis.VisMain.GetInstance().get_Mode();
                ClientLib.Vis.VisMain.GetInstance().set_Mode(visMode);
                var retVal = ncity.CanRepairAll();
                ClientLib.Vis.VisMain.GetInstance().set_Mode(oldMode);
                return retVal;*/

                var repairData = ncity.get_CityRepairData();
                var myRepair = repairData.CanRepair(0, viewMode);
                repairData.UpdateCachedFullRepairAllCost(viewMode);
                return ((myRepair != null) && (!ncity.get_IsLocked() || (viewMode != ClientLib.Vis.Mode.ArmySetup)));

                return false;
              } catch (e) {
                console.log("MaelstromTools.Wrapper.CanRepairAll: ", e);
                return false;
              }
            },
            /*GetBuildings: function (cityBuildings) {
              if (PerforceChangelist >= 376877) { //new
                return (cityBuildings.get_Buildings() != null ? cityBuildings.get_Buildings().d : null);
              } else { //old
                return (cityBuildings.get_Buildings() != null ? cityBuildings.get_Buildings().l : null);
              }
            },*/
            GetDefenseUnits: function (cityUnits) {
            //GetDefenseUnits: function () {
              if (PerforceChangelist >= 392583) { //endgame patch
                return (cityUnits.get_DefenseUnits() != null ? cityUnits.get_DefenseUnits().d : null);
              } else { //old
                var defenseObjects = [];
                for (var x = 0; x < 9; x++) {
                  for (var y = 0; y < 8; y++) {
                    var defenseObject = ClientLib.Vis.VisMain.GetInstance().get_DefenseSetup().GetDefenseObjectFromPosition((x * ClientLib.Vis.VisMain.GetInstance().get_City().get_GridWidth()),(y * ClientLib.Vis.VisMain.GetInstance().get_City().get_GridHeight()));
                    if (defenseObject !== null && defenseObject.get_CityEntity() !== null) {
                      defenseObjects.push(defenseObject.get_UnitDetails());
                    }
                  }
                }
                return defenseObjects;
              }
            },
            GetUnitLevelRequirements: function (cityEntity) {
              if (PerforceChangelist >= 376877) { //new
                return (cityEntity.get_UnitLevelRepairRequirements() != null ? cityEntity.get_UnitLevelRepairRequirements() : null);
              } else { //old
                return (cityEntity.get_UnitLevelRequirements() != null ? cityEntity.get_UnitLevelRequirements() : null);
              }
            },

            GetBaseLevel: function (ncity) {
              return (Math.floor(ncity.get_LvlBase() * 100) / 100).toFixed(2);
            }
            /*,
            
            GetPointsByLevelWithThresholds: function (_levelThresholds,_levelFactors,_iLevel) {
              var result=0;
              var lastLevel=_iLevel;
              if(_levelThresholds.length != _levelFactors.length) {
                return 0;
              }
              for (var i=(_levelThresholds.length - 1); (i >= 0); i--) {
                var threshold=(_levelThresholds[i] - 1);
                if(lastLevel >= threshold) {
                  result += ((lastLevel - threshold) * _levelFactors[i]);
                  lastLevel=threshold;
                }
              }
              return result;
            },
            GetArmyPoints: function(_iLevel) {
              var server = ClientLib.Data.MainData.GetInstance().get_Server();
              var m_iArmyPointsPerLevelThresholds = server.get_ArmyPointsPerLevelThresholds();
              var m_fArmyPointsPerLevel = server.get_ArmyPointsPerLevel();
              _iLevel += 4;
              var armyPoints = MaelstromTools.Wrapper.GetPointsByLevelWithThresholds(m_iArmyPointsPerLevelThresholds, m_fArmyPointsPerLevel, _iLevel);
              return Math.min(armyPoints, server.get_MaxArmyPoints());
            },
            
            GetBuilding: function(ncity, techName) {
              return ncity.get_CityBuildingsData().GetUniqueBuildingByTechName(techName)
            },
            
            GetCommandCenter: function(ncity) {
              //var techName = ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Command_Center, ClientLib.Data.MainData.GetInstance().get_Player().get_Faction());

              return MaelstromTools.Wrapper.GetBuilding(ncity, ClientLib.Base.ETechName.Command_Center);
            // conyard return this.GetBuildingCondition$0(ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction$0(0, ClientLib.Data.MainData.GetInstance$9().get_Player$2().get_Faction$2()));
            // ClientLib.Data.City.prototype.GetOffenseConditionInPercent=ClientLib.Data.City.prototype.GetOffenseConditionInPercent$0;
            }*/
          }
        });

        // define LocalStorage
        qx.Class.define("MaelstromTools.LocalStorage", {
          type: "static",
          statics: {
            isSupported: function () {
              return typeof (Storage) !== "undefined";
            },
            set: function (key, value) {
              try {
                if (MaelstromTools.LocalStorage.isSupported()) {
                  localStorage["CCTA_MaelstromTools_" + key] = JSON.stringify(value);
                }
              } catch (e) {
                console.log("MaelstromTools.LocalStorage.set: ", e);
              }
            },
            get: function (key, defaultValueIfNotSet) {
              try {
                if (MaelstromTools.LocalStorage.isSupported()) {
                  if (localStorage["CCTA_MaelstromTools_" + key] != null && localStorage["CCTA_MaelstromTools_" + key] != 'undefined') {
                    return JSON.parse(localStorage["CCTA_MaelstromTools_" + key]);
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.LocalStorage.get: ", e);
              }
              return defaultValueIfNotSet;
            },
            clearAll: function () {
              try {
                if (!MaelstromTools.LocalStorage.isSupported()) {
                  return;
                }
                for (var key in localStorage) {
                  if (key.indexOf("CCTA_MaelstromTools_") == 0) {
                    localStorage.removeItem(key);
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.LocalStorage.clearAll: ", e);
              }
            }
          }
        });

        // define Cache
        qx.Class.define("MaelstromTools.Cache", {
          type: "singleton",
          extend: qx.core.Object,
          members: {
            CityCount: 0,
            Cities: null,
            SelectedBaseForMenu: null,
            SelectedBaseResources: null,
            SelectedBaseForLoot: null,

            updateCityCache: function () {
              try {
                this.CityCount = 0;
                this.Cities = Object();

                var cities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities();
                for (var cindex in cities.d) {
                  this.CityCount++;
                  var ncity = MaelstromTools.Wrapper.GetCity(cindex);
                  var ncityName = ncity.get_Name();
                  this.Cities[ncityName] = Object();
                  this.Cities[ncityName]["ID"] = cindex;
                  this.Cities[ncityName]["Object"] = ncity;
                }
              } catch (e) {
                console.log("MaelstromTools.Cache.updateCityCache: ", e);
              }
            },

            updateLoot: function (visCity) {
              var cityId = visCity.get_Id();

              if (this.SelectedBaseForLoot != null && cityId == this.SelectedBaseForLoot.get_Id() && this.SelectedBaseResources != null && this.SelectedBaseResources["LoadState"] > 0) {
                return -2;
              }
              this.SelectedBaseForLoot = visCity;
              this.SelectedBaseResources = MaelstromTools.Util.getResources(visCity);
              return this.SelectedBaseResources["LoadState"];
            }
          }
        });

        // define HuffyTools.ImageRender
        qx.Class.define("HuffyTools.ImageRender", {
          extend: qx.ui.table.cellrenderer.AbstractImage,
          construct: function (width, height) {
            this.base(arguments);
            if (width) {
              this.__imageWidth = width;
            }
            if (height) {
              this.__imageHeight = height;
            }
            this.__am = qx.util.AliasManager.getInstance();
          },
          members: {
            __am: null,
            __imageHeight: 16,
            __imageWidth: 16,
            // overridden
            _identifyImage: function (cellInfo) {
              var imageHints = {
                imageWidth: this.__imageWidth,
                imageHeight: this.__imageHeight
              };
              if (cellInfo.value == "") {
                imageHints.url = null;
              } else {
                imageHints.url = this.__am.resolve(cellInfo.value);
              }
              imageHints.tooltip = cellInfo.tooltip;
              return imageHints;
            }
          },
          destruct: function () {
            this.__am = null;
          }
        });

        // define HuffyTools.ReplaceRender
        qx.Class.define("HuffyTools.ReplaceRender", {
          extend: qx.ui.table.cellrenderer.Default,
          properties: {
            replaceFunction: {
              check: "Function",
              nullable: true,
              init: null
            }
          },
          members: {
            // overridden
            _getContentHtml: function (cellInfo) {
              var value = cellInfo.value;
              var replaceFunc = this.getReplaceFunction();
              // use function
              if (replaceFunc) {
                cellInfo.value = replaceFunc(value);
              }
              return qx.bom.String.escape(this._formatValue(cellInfo));
            }
          }
        });

        qx.Class.define("HuffyTools.CityCheckBox", {
          extend: qx.ui.form.CheckBox,
          members: {
            HT_CityID: null
          }
        });

        // define HuffyTools.UpgradePriorityGUI
        qx.Class.define("HuffyTools.UpgradePriorityGUI", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          members: {
            HT_TabView: null,
            HT_Options: null,
            HT_ShowOnlyTopBuildings: null,
            HT_ShowOnlyAffordableBuildings: null,
            HT_CityBuildings: null,
            HT_Pages: null,
            HT_Tables: null,
            HT_Models: null,
            HT_SelectedResourceType: null,
            BuildingList: null,
            upgradeInProgress: null,
            init: function () {
              /*
              Done:
              - Added cost per gain to the lists
              - Added building coordinates to the lists
              - Only display the top affordable and not affordable building
              - Persistent filter by city, top and affordable per resource type
              - Reload onTabChange for speed optimization
              - Estimated time until upgrade is affordable
              
              ToDo:
              - let the user decide to sort by colums he like i.e. timefactor or cost/gain and save it in the configuration
              - integrate buttons to transfer resources ?

               */
              try {
                this.HT_SelectedResourceType = -1;
                this.IsTimerEnabled = false;
                this.upgradeInProgress = false;

                this.HT_TabView = new qx.ui.tabview.TabView();
                this.HT_TabView.set({
                  contentPadding: 0,
                  appearance: "tabview",
                  margin: 5,
                  barPosition: 'left'
                });
                this.Widget = new qx.ui.tabview.Page("UpgradePriority");
                this.Widget.setPadding(0);
                this.Widget.setMargin(0);
                this.Widget.setBackgroundColor("#BEC8CF");
                this.Widget.setLayout(new qx.ui.layout.VBox(2));
                //this.Widget.add(this.HT_Options);
                this.Widget.add(this.HT_TabView, {
                  flex: 1
                });
                this.Window.setPadding(0);
                this.Window.set({
                  resizable: true
                });

                this.Window.removeAll();
                this.Window.add(this.Widget);

                this.BuildingList = new Array;
                this.HT_Models = new Array;
                this.HT_Tables = new Array;
                this.HT_Pages = new Array;

                this.createTabPage(ClientLib.Base.EResourceType.Tiberium);
                this.createTable(ClientLib.Base.EResourceType.Tiberium);
                this.HT_Tables[ClientLib.Base.EResourceType.Tiberium].addListener("cellClick", function (e) {
                  this.upgradeBuilding(e, ClientLib.Base.EResourceType.Tiberium);
                }, this);


                this.createTabPage(ClientLib.Base.EResourceType.Crystal);
                this.createTable(ClientLib.Base.EResourceType.Crystal);
                this.HT_Tables[ClientLib.Base.EResourceType.Crystal].addListener("cellClick", function (e) {
                  this.upgradeBuilding(e, ClientLib.Base.EResourceType.Crystal);
                }, this);

                this.createTabPage(ClientLib.Base.EResourceType.Power);
                this.createTable(ClientLib.Base.EResourceType.Power);
                this.HT_Tables[ClientLib.Base.EResourceType.Power].addListener("cellClick", function (e) {
                  this.upgradeBuilding(e, ClientLib.Base.EResourceType.Power);
                }, this);

                this.createTabPage(ClientLib.Base.EResourceType.Gold);
                this.createTable(ClientLib.Base.EResourceType.Gold);
                this.HT_Tables[ClientLib.Base.EResourceType.Gold].addListener("cellClick", function (e) {
                  this.upgradeBuilding(e, ClientLib.Base.EResourceType.Gold);
                }, this);


                MT_Cache.updateCityCache();
                this.HT_Options = new Array();
                this.HT_ShowOnlyTopBuildings = new Array();
                this.HT_ShowOnlyAffordableBuildings = new Array();
                this.HT_CityBuildings = new Array();
                for (var mPage in this.HT_Pages) {
                  this.createOptions(mPage);
                  this.HT_Pages[mPage].add(this.HT_Options[mPage]);
                  this.HT_Pages[mPage].add(this.HT_Tables[mPage], {
                    flex: 1
                  });
                  this.HT_TabView.add(this.HT_Pages[mPage]);
                }

                // Zeigen wir Dollars an !
                this.HT_TabView.setSelection([this.HT_TabView.getChildren()[2]]);
                this.HT_SelectedResourceType = ClientLib.Base.EResourceType.Gold;
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.init: ", e);
              }
            },
            createOptions: function (eType) {
              var oBox = new qx.ui.layout.Flow();
              var oOptions = new qx.ui.container.Composite(oBox);
              oOptions.setMargin(5);
              this.HT_ShowOnlyTopBuildings[eType] = new qx.ui.form.CheckBox(Lang.gt("display only top buildings"));
              this.HT_ShowOnlyTopBuildings[eType].setMargin(5);
              this.HT_ShowOnlyTopBuildings[eType].setValue(MaelstromTools.LocalStorage.get("UGL_TOPBUILDINGS_" + eType, true));
              this.HT_ShowOnlyTopBuildings[eType].addListener("execute", this.CBChanged, this);
              oOptions.add(this.HT_ShowOnlyTopBuildings[eType], {
                left: 10,
                top: 10
              });
              this.HT_ShowOnlyAffordableBuildings[eType] = new qx.ui.form.CheckBox(Lang.gt("display only affordable buildings"));
              this.HT_ShowOnlyAffordableBuildings[eType].setMargin(5);
              this.HT_ShowOnlyAffordableBuildings[eType].setValue(MaelstromTools.LocalStorage.get("UGL_AFFORDABLE_" + eType, true));
              this.HT_ShowOnlyAffordableBuildings[eType].addListener("execute", this.CBChanged, this);
              oOptions.add(this.HT_ShowOnlyAffordableBuildings[eType], {
                left: 10,
                top: 10,
                lineBreak: true
              });
              this.HT_CityBuildings[eType] = new Array();
              for (var cname in MT_Cache.Cities) {
                var oCity = MT_Cache.Cities[cname].Object;
                var oCityBuildings = new HuffyTools.CityCheckBox(cname);
                oCityBuildings.HT_CityID = oCity.get_Id();
                oCityBuildings.setMargin(5);
                oCityBuildings.setValue(MaelstromTools.LocalStorage.get("UGL_CITYFILTER_" + eType + "_" + oCity.get_Id(), true));
                oCityBuildings.addListener("execute", this.CBChanged, this);
                oOptions.add(oCityBuildings, {
                  left: 10,
                  top: 10
                });
                this.HT_CityBuildings[eType][cname] = oCityBuildings;
              }
              this.HT_Options[eType] = oOptions;
            },
            createTable: function (eType) {
              try {
                this.HT_Models[eType] = new qx.ui.table.model.Simple();
                this.HT_Models[eType].setColumns(["ID", Lang.gt("City"), Lang.gt("Type (coord)"), Lang.gt("to Level"), Lang.gt("Gain/h"), Lang.gt("Factor"), Lang.gt("Tiberium"), Lang.gt("Power"), Lang.gt("Tib/gain"), Lang.gt("Pow/gain"), Lang.gt("ETA"), Lang.gt("Upgrade"), "State"]);
                this.HT_Tables[eType] = new qx.ui.table.Table(this.HT_Models[eType]);
                this.HT_Tables[eType].setColumnVisibilityButtonVisible(false);
                this.HT_Tables[eType].setColumnWidth(0, 0);
                this.HT_Tables[eType].setColumnWidth(1, 90);
                this.HT_Tables[eType].setColumnWidth(2, 120);
                this.HT_Tables[eType].setColumnWidth(3, 55);
                this.HT_Tables[eType].setColumnWidth(4, 70);
                this.HT_Tables[eType].setColumnWidth(5, 60);
                this.HT_Tables[eType].setColumnWidth(6, 70);
                this.HT_Tables[eType].setColumnWidth(7, 70);
                this.HT_Tables[eType].setColumnWidth(8, 70);
                this.HT_Tables[eType].setColumnWidth(9, 70);
                this.HT_Tables[eType].setColumnWidth(10, 70);
                this.HT_Tables[eType].setColumnWidth(11, 40);
                this.HT_Tables[eType].setColumnWidth(12, 0);
                var tcm = this.HT_Tables[eType].getTableColumnModel();
                tcm.setColumnVisible(0, false);
                tcm.setColumnVisible(12, false);
                tcm.setDataCellRenderer(4, new qx.ui.table.cellrenderer.Number().set({
                  numberFormat: new qx.util.format.NumberFormat().set({
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2
                  })
                }));
                tcm.setDataCellRenderer(5, new qx.ui.table.cellrenderer.Number().set({
                  numberFormat: new qx.util.format.NumberFormat().set({
                    maximumFractionDigits: 5,
                    minimumFractionDigits: 5
                  })
                }));
                tcm.setDataCellRenderer(6, new HuffyTools.ReplaceRender().set({
                  ReplaceFunction: this.formatTiberiumAndPower
                }));
                tcm.setDataCellRenderer(7, new HuffyTools.ReplaceRender().set({
                  ReplaceFunction: this.formatTiberiumAndPower
                }));
                tcm.setDataCellRenderer(11, new HuffyTools.ImageRender(40, 20));
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.createTable: ", e);
              }
            },
            createTabPage: function (resource_type) {
              try {
                var sName = MaelstromTools.Statics.LootTypeName(resource_type);
                var oRes = new qx.ui.tabview.Page(Lang.gt(sName), MT_Base.images[sName]);
                oRes.setLayout(new qx.ui.layout.VBox(2));
                oRes.setPadding(5);
                var btnTab = oRes.getChildControl("button");
                btnTab.resetWidth();
                btnTab.resetHeight();
                btnTab.set({
                  show: "icon",
                  margin: 0,
                  padding: 0,
                  toolTipText: sName
                });
                btnTab.addListener("execute", this.TabChanged, [this, resource_type]);
                this.HT_Pages[resource_type] = oRes;
                return oRes;
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.createTabPage: ", e);
              }
            },

            TabChanged: function (e) {
              try {
                this[0].HT_SelectedResourceType = this[1];
                this[0].UpgradeCompleted(null, null);
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.TabChanged: ", e);
              }
            },

            upgradeBuilding: function (e, eResourceType) {
              if (this.upgradeInProgress == true) {
                console.log("upgradeBuilding:", "upgrade in progress !");
                return;
              }
              try {
                if (e.getColumn() == 11) {
                  var buildingID = this.HT_Models[eResourceType].getValue(0, e.getRow());
                  var iState = parseInt(this.HT_Models[eResourceType].getValue(12, e.getRow()));
                  if (iState != 1) {
                    return;
                  }
                  if (buildingID in this.BuildingList) {
                    this.upgradeInProgress = true;
                    if (PerforceChangelist >= 382917) { //new
                      ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", this.BuildingList[buildingID], phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, this.UpgradeCompleted), null, true);
                    } else { //old
                      ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", this.BuildingList[buildingID], webfrontend.Util.createEventDelegate(ClientLib.Net.CommandResult, this, this.UpgradeCompleted), null, true);
                    }
                  }
                }
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.upgradeBuilding: ", e);
              }
            },
            UpgradeCompleted: function (context, result) {
              var self = this;
              window.setTimeout(function () {
                self.calc();
              }, 1000);
              this.upgradeInProgress = false;
            },
            CBChanged: function (e) {
              this.UpgradeCompleted(null, null);
            },
            formatTiberiumAndPower: function (oValue) {
              if (PerforceChangelist >= 387751) { //new
                return phe.cnc.gui.util.Numbers.formatNumbersCompact(oValue);
              } else { //old
                return webfrontend.gui.Util.formatNumbersCompact(oValue);
              }
            },
            updateCache: function () {
              try {
                if (!this.HT_TabView) {
                  this.init();
                }
                var eType = this.HT_SelectedResourceType;
                var bTop = this.HT_ShowOnlyTopBuildings[eType].getValue();
                MaelstromTools.LocalStorage.set("UGL_TOPBUILDINGS_" + eType, bTop);
                var bAffordable = this.HT_ShowOnlyAffordableBuildings[eType].getValue();
                MaelstromTools.LocalStorage.set("UGL_AFFORDABLE_" + eType, bAffordable);
                var oCityFilter = new Array();
                for (var cname in this.HT_CityBuildings[eType]) {
                  var oCityBuildings = this.HT_CityBuildings[eType][cname];
                  var bFilterBuilding = oCityBuildings.getValue();
                  MaelstromTools.LocalStorage.set("UGL_CITYFILTER_" + eType + "_" + oCityBuildings.HT_CityID, bFilterBuilding);
                  oCityFilter[cname] = bFilterBuilding;
                }
                window.HuffyTools.UpgradePriority.getInstance().collectData(bTop, bAffordable, oCityFilter, eType);
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.updateCache: ", e);
              }
            },
            setWidgetLabels: function () {
              try {
                var HuffyCalc = window.HuffyTools.UpgradePriority.getInstance();
                var UpgradeList = HuffyCalc.Cache;

                for (var eResourceType in UpgradeList) {
                  //var eResourceType = MaelstromTools.Statics.LootTypeName(eResourceName);
                  var rowData = [];

                  this.HT_Models[eResourceType].setData([]);

                  for (var mCity in UpgradeList[eResourceType]) {
                    for (var mBuilding in UpgradeList[eResourceType][mCity]) {
                      var UpItem = UpgradeList[eResourceType][mCity][mBuilding];
                      if (typeof (UpItem.Type) == "undefined") {
                        continue;
                      }
                      if (!(mBuilding in this.BuildingList)) {
                        this.BuildingList[UpItem.ID] = UpItem.Building;
                      }
                      var iTiberiumCosts = 0;
                      if (ClientLib.Base.EResourceType.Tiberium in UpItem.Costs) {
                        iTiberiumCosts = UpItem.Costs[ClientLib.Base.EResourceType.Tiberium];
                      }
                      var iTiberiumPerGain = 0;
                      if (ClientLib.Base.EResourceType.Tiberium in UpItem.Costs) {
                        iTiberiumPerGain = UpItem.Costs[ClientLib.Base.EResourceType.Tiberium] / UpItem.GainPerHour;
                      }
                      var iPowerCosts = 0;
                      if (ClientLib.Base.EResourceType.Power in UpItem.Costs) {
                        iPowerCosts = UpItem.Costs[ClientLib.Base.EResourceType.Power];
                      }
                      var iPowerPerGain = 0;
                      if (ClientLib.Base.EResourceType.Power in UpItem.Costs) {
                        iPowerPerGain = UpItem.Costs[ClientLib.Base.EResourceType.Power] / UpItem.GainPerHour;
                      }
                      var img = MT_Base.images["UpgradeBuilding"];
                      if (UpItem.Affordable == false) {
                        img = "";
                      }
                      var sType = UpItem.Type;
                      sType = sType + "(" + UpItem.PosX + ":" + UpItem.PosY + ")";
                      var iETA = 0;
                      if (UpItem.TimeTillUpgradable[ClientLib.Base.EResourceType.Tiberium] > 0) {
                        iETA = UpItem.TimeTillUpgradable[ClientLib.Base.EResourceType.Tiberium];
                      }
                      if (UpItem.TimeTillUpgradable[ClientLib.Base.EResourceType.Power] > iETA) {
                        iETA = UpItem.TimeTillUpgradable[ClientLib.Base.EResourceType.Power];
                      }
                      var sETA = "";
                      if (iETA > 0) {
                        sETA = ClientLib.Vis.VisMain.FormatTimespan(iETA);
                      }
                      var iState = 0;
                      if (UpItem.Affordable == true) {
                        iState = 1;
                      } else if (UpItem.AffordableByTransfer == true) {
                        iState = 2;
                      } else {
                        iState = 3;
                      }
                      rowData.push([UpItem.ID, mCity, sType, UpItem.Level, UpItem.GainPerHour, UpItem.Ticks, iTiberiumCosts, iPowerCosts, iTiberiumPerGain, iPowerPerGain, sETA, img, iState]);
                    }
                  }
                  this.HT_Models[eResourceType].setData(rowData);
                }
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.setWidgetLabels: ", e);
              }
            }
          }
        });

        // define HuffyTools.UpgradePriority
        qx.Class.define("HuffyTools.UpgradePriority", {
          type: "singleton",
          extend: qx.core.Object,
          members: {
            list_units: null,
            list_buildings: null,

            comparePrio: function (elem1, elem2) {
              if (elem1.Ticks < elem2.Ticks) return -1;
              if (elem1.Ticks > elem2.Ticks) return 1;
              return 0;
            },
            getPrioList: function (city, arTechtypes, eModPackageSize, eModProduction, bOnlyTopBuildings, bOnlyAffordableBuildings) {
              try {
                var RSI = window.MaelstromTools.ResourceOverview.getInstance();
                RSI.updateCache();
                var TotalTiberium = 0;

                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];
                  var i = cityCache[MaelstromTools.Statics.Tiberium];
                  if (typeof (i) !== 'undefined') {
                    TotalTiberium += i;
                    //but never goes here during test.... // to optimize - to do
                  }
                }
                var resAll = new Array();
                var prod = MaelstromTools.Production.getInstance().updateCache(city.get_Name());
                //var buildings = MaelstromTools.Wrapper.GetBuildings(city.get_CityBuildingsData());
                var buildings = city.get_Buildings().d;

                // 376877 & old fixes 
                var objbuildings = [];
                if (PerforceChangelist >= 376877) { //new
                  for (var o in buildings) objbuildings.push(buildings[o]);
                } else { //old
                  for (var i = 0; i < buildings.length; i++) objbuildings.push(buildings[i]);
                }


                for (var i = 0; i < objbuildings.length; i++) {
                  var city_building = objbuildings[i];

                  // TODO: check for destroyed building

                  var iTechType = city_building.get_TechName();
                  var bSkip = true;
                  for (var iTypeKey in arTechtypes) {
                    if (arTechtypes[iTypeKey] == iTechType) {
                      bSkip = false;
                      break;
                    }
                  }
                  if (bSkip == true) {
                    continue;
                  }
                  var city_buildingdetailview = city.GetBuildingDetailViewInfo(city_building);
                  if (city_buildingdetailview == null) {
                    continue;
                  }
                  var bindex = city_building.get_Id();
                  var resbuilding = new Array();
                  resbuilding["ID"] = bindex;
                  resbuilding["Type"] = this.TechTypeName(parseInt(iTechType, 10));
                  resbuilding["PosX"] = city_building.get_CoordX();
                  resbuilding["PosY"] = city_building.get_CoordY();

                  resbuilding["Building"] = {
                    cityid: city.get_Id(),
                    posX: resbuilding["PosX"],
                    posY: resbuilding["PosY"],
                    isPaid: true
                  };

                  resbuilding["GainPerHour"] = 0;
                  resbuilding["Level"] = city_building.get_CurrentLevel() + 1;
                  for (var ModifierType in city_buildingdetailview.OwnProdModifiers.d) {
                    switch (parseInt(ModifierType, 10)) {
                      case eModPackageSize:
                        {
                          var ModOj = city_buildingdetailview.OwnProdModifiers.d[city_building.get_MainModifierTypeId()];
                          var Mod = (ModOj.TotalValue + ModOj.NewLvlDelta) / ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour();
                          resbuilding["GainPerHour"] += (city_buildingdetailview.OwnProdModifiers.d[ModifierType].NewLvlDelta / Mod);
                          break;
                        }
                      case eModProduction:
                        {
                          resbuilding["GainPerHour"] += city_buildingdetailview.OwnProdModifiers.d[ModifierType].NewLvlDelta;
                          break;
                        }
                    }
                  }
                  // Nutzen ins VerhÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¤ltnis zu den Kosten setzten
                  var TechLevelData = ClientLib.Base.Util.GetTechLevelResourceRequirements_Obj(city_building.get_CurrentLevel() + 1, city_building.get_TechGameData_Obj());
                  var RatioPerCostType = new Object();
                  var sRatio = "";
                  var sCosts = "";
                  var lTicks = 0;
                  var bHasPower = true;
                  var bHasTiberium = true;
                  var bAffordableByTransfer = true;
                  var oCosts = new Array();
                  var oTimes = new Array();
                  for (var costtype in TechLevelData) {
                    if (typeof (TechLevelData[costtype]) == "function") {
                      continue;
                    }
                    if (TechLevelData[costtype].Type == "0") {
                      continue;
                    }

                    oCosts[TechLevelData[costtype].Type] = TechLevelData[costtype].Count;
                    if (parseInt(TechLevelData[costtype].Count) <= 0) {
                      continue;
                    }
                    RatioPerCostType[costtype] = TechLevelData[costtype].Count / resbuilding["GainPerHour"];
                    if (sCosts.length > 0) {
                      sCosts = sCosts + ", ";
                    }
                    sCosts = sCosts + MaelstromTools.Wrapper.FormatNumbersCompact(TechLevelData[costtype].Count) + " " + MaelstromTools.Statics.LootTypeName(TechLevelData[costtype].Type);
                    if (sRatio.length > 0) {
                      sRatio = sRatio + ", ";
                    }
                    // Upgrade affordable ?
                    if (city.GetResourceCount(TechLevelData[costtype].Type) < TechLevelData[costtype].Count) {
                      switch (TechLevelData[costtype].Type) {
                        case ClientLib.Base.EResourceType.Tiberium:
                          {
                            bHasTiberium = false;
                            if (TotalTiberium < TechLevelData[costtype].Count) {
                              bAffordableByTransfer = false;
                            }
                          }
                          break;
                        case ClientLib.Base.EResourceType.Power:
                          {
                            bHasPower = false;
                          }
                          break;
                      }
                    }
                    sRatio = sRatio + MaelstromTools.Wrapper.FormatNumbersCompact(RatioPerCostType[costtype]);

                    var techlevelData = MaelstromTools.Statics.LootTypeName(TechLevelData[costtype].Type);

                    var dCityProduction = prod[techlevelData].Delta + prod[techlevelData].ExtraBonusDelta + prod[techlevelData].POI;
                    if (dCityProduction > 0) {
                      if (lTicks < (3600 * RatioPerCostType[costtype] / dCityProduction)) {
                        lTicks = (3600 * RatioPerCostType[costtype] / dCityProduction);
                      }
                    }
                    oTimes[TechLevelData[costtype].Type] = 0;
                    if (oCosts[TechLevelData[costtype].Type] > city.GetResourceCount(TechLevelData[costtype].Type)) {
                      oTimes[TechLevelData[costtype].Type] = (3600 * (oCosts[TechLevelData[costtype].Type] - city.GetResourceCount(TechLevelData[costtype].Type))) / dCityProduction;
                    }
                  }
                  resbuilding["Ticks"] = lTicks;
                  resbuilding["Time"] = ClientLib.Vis.VisMain.FormatTimespan(lTicks);
                  resbuilding["Costtext"] = sCosts;
                  resbuilding["Costs"] = oCosts;
                  resbuilding["TimeTillUpgradable"] = oTimes;
                  resbuilding["Ratio"] = sRatio;
                  resbuilding["Affordable"] = bHasTiberium && bHasPower;
                  resbuilding["AffordableByTransfer"] = bHasPower && bAffordableByTransfer;
                  if (resbuilding["GainPerHour"] > 0 && (bOnlyAffordableBuildings == false || resbuilding["Affordable"] == true)) {
                    resAll[bindex] = resbuilding;
                  }
                }


                resAll = resAll.sort(this.comparePrio);
                if (!bOnlyTopBuildings) {
                  return resAll;
                }
                var res2 = new Array();
                if (MaelstromTools.Util.ArraySize(resAll) > 0) {
                  var iTopNotAffordable = -1;
                  var iTopAffordable = -1;
                  var iNextNotAffordable = -1;
                  var iLastIndex = -1;
                  for (var iNewIndex in resAll) {
                    if (resAll[iNewIndex].Affordable == true) {
                      if (iTopAffordable == -1) {
                        iTopAffordable = iNewIndex;
                        iNextNotAffordable = iLastIndex;
                      }
                    } else {
                      if (iTopNotAffordable == -1) {
                        iTopNotAffordable = iNewIndex;
                      }
                    }
                    iLastIndex = iNewIndex;
                  }
                  if (iTopAffordable == -1) {
                    iNextNotAffordable = iLastIndex;
                  }
                  var iIndex = 0;
                  if (iTopNotAffordable != -1) {
                    res2[iIndex++] = resAll[iTopNotAffordable];
                  }
                  if (iNextNotAffordable != -1) {
                    res2[iIndex++] = resAll[iNextNotAffordable];
                  }
                  if (iTopAffordable != -1) {
                    res2[iIndex++] = resAll[iTopAffordable];
                  }
                }
                res2 = res2.sort(this.comparePrio);
                return res2;
              } catch (e) {
                console.log("HuffyTools.getPrioList: ", e);
              }
            },
            TechTypeName: function (iTechType) {
              switch (iTechType) {
                case ClientLib.Base.ETechName.PowerPlant:
                  {
                    return Lang.gt("Powerplant");
                    break;
                  }
                case ClientLib.Base.ETechName.Refinery:
                  {
                    return Lang.gt("Refinery");
                    break;
                  }
                case ClientLib.Base.ETechName.Harvester_Crystal:
                  {
                    return Lang.gt("Harvester");
                    break;
                  }
                case ClientLib.Base.ETechName.Harvester:
                  {
                    return Lang.gt("Harvester");
                    break;
                  }
                case ClientLib.Base.ETechName.Silo:
                  {
                    return Lang.gt("Silo");
                    break;
                  }
                case ClientLib.Base.ETechName.Accumulator:
                  {
                    return Lang.gt("Accumulator");
                    break;
                  }
              }
              return "?";
            },
            collectData: function (bOnlyTopBuildings, bOnlyAffordableBuildings, oCityFilter, eSelectedResourceType) {
              try {
                MT_Cache.updateCityCache();
                this.Cache = new Object();
                if (eSelectedResourceType == ClientLib.Base.EResourceType.Tiberium) {
                  this.Cache[ClientLib.Base.EResourceType.Tiberium] = new Object();
                }
                if (eSelectedResourceType == ClientLib.Base.EResourceType.Crystal) {
                  this.Cache[ClientLib.Base.EResourceType.Crystal] = new Object();
                }
                if (eSelectedResourceType == ClientLib.Base.EResourceType.Power) {
                  this.Cache[ClientLib.Base.EResourceType.Power] = new Object();
                }
                if (eSelectedResourceType == ClientLib.Base.EResourceType.Gold) {
                  this.Cache[ClientLib.Base.EResourceType.Gold] = new Object();
                }
                for (var cname in MT_Cache.Cities) {
                  var city = MT_Cache.Cities[cname].Object;
                  if (oCityFilter[cname] == false) {
                    continue;
                  }
                  if (eSelectedResourceType == ClientLib.Base.EResourceType.Tiberium) {
                    this.Cache[ClientLib.Base.EResourceType.Tiberium][cname] = this.getPrioList(city, [ClientLib.Base.ETechName.Harvester, ClientLib.Base.ETechName.Silo], ClientLib.Base.EModifierType.TiberiumPackageSize, ClientLib.Base.EModifierType.TiberiumProduction, bOnlyTopBuildings, bOnlyAffordableBuildings);
                  }
                  if (eSelectedResourceType == ClientLib.Base.EResourceType.Crystal) {
                    this.Cache[ClientLib.Base.EResourceType.Crystal][cname] = this.getPrioList(city, [ClientLib.Base.ETechName.Harvester, ClientLib.Base.ETechName.Silo], ClientLib.Base.EModifierType.CrystalPackageSize, ClientLib.Base.EModifierType.CrystalProduction, bOnlyTopBuildings, bOnlyAffordableBuildings);
                  }
                  if (eSelectedResourceType == ClientLib.Base.EResourceType.Power) {
                    this.Cache[ClientLib.Base.EResourceType.Power][cname] = this.getPrioList(city, [ClientLib.Base.ETechName.PowerPlant, ClientLib.Base.ETechName.Accumulator], ClientLib.Base.EModifierType.PowerPackageSize, ClientLib.Base.EModifierType.PowerProduction, bOnlyTopBuildings, bOnlyAffordableBuildings);
                  }
                  if (eSelectedResourceType == ClientLib.Base.EResourceType.Gold) {
                    this.Cache[ClientLib.Base.EResourceType.Gold][cname] = this.getPrioList(city, [ClientLib.Base.ETechName.Refinery, ClientLib.Base.ETechName.PowerPlant], ClientLib.Base.EModifierType.CreditsPackageSize, ClientLib.Base.EModifierType.CreditsProduction, bOnlyTopBuildings, bOnlyAffordableBuildings);
                  }
                }
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.collectData: ", e);
              }
            }
          }
        });

        var __MTCity_initialized = false; //k undeclared

        var Lang = window.MaelstromTools.Language.getInstance();
        var MT_Cache = window.MaelstromTools.Cache.getInstance();
        var MT_Base = window.MaelstromTools.Base.getInstance();
        var MT_Preferences = window.MaelstromTools.Preferences.getInstance();
        MT_Preferences.readOptions();

        if (!webfrontend.gui.region.RegionCityMenu.prototype.__MTCity_showMenu) {
          webfrontend.gui.region.RegionCityMenu.prototype.__MTCity_showMenu = webfrontend.gui.region.RegionCityMenu.prototype.showMenu;
        }
        webfrontend.gui.region.RegionCityMenu.prototype.showMenu = function (selectedVisObject) {

          MT_Cache.SelectedBaseForMenu = selectedVisObject;
          var baseStatusOverview = window.MaelstromTools.BaseStatus.getInstance();

          if (__MTCity_initialized == false) {
            //console.log(selectedBase.get_Name());
            __MTCity_initialized = true;
            baseStatusOverview.CityMenuButtons = new Array();

            for (var k in this) {
              try {
                if (this.hasOwnProperty(k)) {
                  if (this[k] && this[k].basename == "Composite") {
                    var button = new qx.ui.form.Button(Lang.gt("Calibrate support"));
                    button.addListener("execute", function (e) {
                      MaelstromTools.Util.calibrateWholeSupportOnSelectedBase();
                    }, this);

                    this[k].add(button);
                    baseStatusOverview.CityMenuButtons.push(button);
                  }
                }
              } catch (e) {
                console.log("webfrontend.gui.region.RegionCityMenu.prototype.showMenu: ", e);
              }
            }
          }

          var isAllowed = MaelstromTools.Util.checkIfSupportIsAllowed(MT_Cache.SelectedBaseForMenu);

          for (var x = 0; x < baseStatusOverview.CityMenuButtons.length; ++x) {
            baseStatusOverview.CityMenuButtons[x].setVisibility(isAllowed ? 'visible' : 'excluded');
          }
          this.__MTCity_showMenu(selectedVisObject);
        };

        if (MT_Preferences.Settings.showLoot) {
          // Wrap onCitiesChange method
          if (!webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.__MTCity_NPCCamp) {
            webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.__MTCity_NPCCamp = webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.onCitiesChange;
          }
          webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.onCitiesChange = function () {
            MT_Base.updateLoot(1, ClientLib.Vis.VisMain.GetInstance().get_SelectedObject(), webfrontend.gui.region.RegionNPCCampStatusInfo.getInstance());
            return this.__MTCity_NPCCamp();
          };

          if (!webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.__MTCity_NPCBase) {
            webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.__MTCity_NPCBase = webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.onCitiesChange;
          }
          webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.onCitiesChange = function () {
            MT_Base.updateLoot(2, ClientLib.Vis.VisMain.GetInstance().get_SelectedObject(), webfrontend.gui.region.RegionNPCBaseStatusInfo.getInstance());
            //MT_Base.updateLoot(2, ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity(), webfrontend.gui.region.RegionNPCBaseStatusInfo.getInstance());
            return this.__MTCity_NPCBase();
          };

          if (!webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.__MTCity_City) {
            webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.__MTCity_City = webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.onCitiesChange;
          }
          webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.onCitiesChange = function () {
            MT_Base.updateLoot(3, ClientLib.Vis.VisMain.GetInstance().get_SelectedObject(), webfrontend.gui.region.RegionCityStatusInfoEnemy.getInstance());
            //MT_Base.updateLoot(3, ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity(), webfrontend.gui.region.RegionCityStatusInfoEnemy.getInstance());
            return this.__MTCity_City();
          };
        }

      }
    } catch (e) {
      console.log("createMaelstromTools: ", e);
    }

    function MaelstromTools_checkIfLoaded() {
      try {
        if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible()) {
          createMaelstromTools();
          window.MaelstromTools.Base.getInstance().initialize();
        } else {
          window.setTimeout(MaelstromTools_checkIfLoaded, 1000);
        }
      } catch (e) {
        console.log("MaelstromTools_checkIfLoaded: ", e);
      }
    }

    if (/commandandconquer\.com/i.test(document.domain)) {
      window.setTimeout(MaelstromTools_checkIfLoaded, 1000);
    }
  };

  try {
    var MaelstromScript = document.createElement("script");
    MaelstromScript.innerHTML = "(" + MaelstromTools_main.toString() + ")();";
    MaelstromScript.type = "text/javascript";
    if (/commandandconquer\.com/i.test(document.domain)) {
      document.getElementsByTagName("head")[0].appendChild(MaelstromScript);
    }
  } catch (e) {
    console.log("MaelstromTools: init error: ", e);
  }
})();

// =========================================================================  CnCopt ================================================================

    var scity = null;
    var tcity = null;
    var tbase = null;
    try {
      unsafeWindow.__cncopt_version = "1.7.5";
      (function () {
        var cncopt_main = function () {
     
          var defense_unit_map = {
            /* GDI Defense Units */"GDI_Wall": "w",
            "GDI_Cannon": "c",
            "GDI_Antitank Barrier": "t",
            "GDI_Barbwire": "b",
            "GDI_Turret": "m",
            "GDI_Flak": "f",
            "GDI_Art Inf": "r",
            "GDI_Art Air": "e",
            "GDI_Art Tank": "a",
            "GDI_Def_APC Guardian": "g",
            "GDI_Def_Missile Squad": "q",
            "GDI_Def_Pitbull": "p",
            "GDI_Def_Predator": "d",
            "GDI_Def_Sniper": "s",
            "GDI_Def_Zone Trooper": "z",
            /* Nod Defense Units */"NOD_Def_Antitank Barrier": "t",
            "NOD_Def_Art Air": "e",
            "NOD_Def_Art Inf": "r",
            "NOD_Def_Art Tank": "a",
            "NOD_Def_Attack Bike": "p",
            "NOD_Def_Barbwire": "b",
            "NOD_Def_Black Hand": "z",
            "NOD_Def_Cannon": "c",
            "NOD_Def_Confessor": "s",
            "NOD_Def_Flak": "f",
            "NOD_Def_MG Nest": "m",
            "NOD_Def_Militant Rocket Soldiers": "q",
            "NOD_Def_Reckoner": "g",
            "NOD_Def_Scorpion Tank": "d",
            "NOD_Def_Wall": "w",
     
            /* Forgotten Defense Units */"FOR_Wall": "w",
            "FOR_Barbwire_VS_Inf": "b",
            "FOR_Barrier_VS_Veh": "t",
            "FOR_Inf_VS_Inf": "g",
            "FOR_Inf_VS_Veh": "r",
            "FOR_Inf_VS_Air": "q",
            "FOR_Sniper": "n",
            "FOR_Mammoth": "y",
            "FOR_Veh_VS_Inf": "o",
            "FOR_Veh_VS_Veh": "s",
            "FOR_Veh_VS_Air": "u",
            "FOR_Turret_VS_Inf": "m",
            "FOR_Turret_VS_Inf_ranged": "a",
            "FOR_Turret_VS_Veh": "v",
            "FOR_Turret_VS_Veh_ranged": "d",
            "FOR_Turret_VS_Air": "f",
            "FOR_Turret_VS_Air_ranged": "e",
            "": ""
          };
     
          var offense_unit_map = {
            /* GDI Offense Units */"GDI_APC Guardian": "g",
            "GDI_Commando": "c",
            "GDI_Firehawk": "f",
            "GDI_Juggernaut": "j",
            "GDI_Kodiak": "k",
            "GDI_Mammoth": "m",
            "GDI_Missile Squad": "q",
            "GDI_Orca": "o",
            "GDI_Paladin": "a",
            "GDI_Pitbull": "p",
            "GDI_Predator": "d",
            "GDI_Riflemen": "r",
            "GDI_Sniper Team": "s",
            "GDI_Zone Trooper": "z",
     
            /* Nod Offense Units */"NOD_Attack Bike": "b",
            "NOD_Avatar": "a",
            "NOD_Black Hand": "z",
            "NOD_Cobra": "r",
            "NOD_Commando": "c",
            "NOD_Confessor": "s",
            "NOD_Militant Rocket Soldiers": "q",
            "NOD_Militants": "m",
            "NOD_Reckoner": "k",
            "NOD_Salamander": "l",
            "NOD_Scorpion Tank": "o",
            "NOD_Specter Artilery": "p",
            "NOD_Venom": "v",
            "NOD_Vertigo": "t",
            "": ""
          };
     
     
          function findTechLayout(city) {
            for (var k in city) {
              //console.log(typeof(city[k]), "1.city[", k, "]", city[k])
              if ((typeof (city[k]) == "object") && city[k] && 0 in city[k] && 8 in city[k]) {
                if ((typeof (city[k][0]) == "object") && city[k][0] && city[k][0] && 0 in city[k][0] && 15 in city[k][0]) {
                  if ((typeof (city[k][0][0]) == "object") && city[k][0][0] && "BuildingIndex" in city[k][0][0]) {
                    return city[k];
                  }
                }
              }
            }
            return null;
          }
     
          function findBuildings(city) {
            var cityBuildings = city.get_CityBuildingsData();
            for (var k in cityBuildings) {
              if (PerforceChangelist >= 376877) {
                if ((typeof (cityBuildings[k]) === "object") && cityBuildings[k] && "d" in cityBuildings[k] && "c" in cityBuildings[k] && cityBuildings[k].c > 0) {
                  return cityBuildings[k].d;
                }
              } else {
                if ((typeof (cityBuildings[k]) === "object") && cityBuildings[k] && "l" in cityBuildings[k]) {
                  return cityBuildings[k].l;
                }
              }
            }
          }
     
          function isOffenseUnit(unit) {
            return (unit.get_UnitGameData_Obj().n in offense_unit_map);
          }
     
          function isDefenseUnit(unit) {
            return (unit.get_UnitGameData_Obj().n in defense_unit_map);
          }
     
          function getUnitArrays(city) {
            var ret = [];
            for (var k in city) {
              if ((typeof (city[k]) == "object") && city[k]) {
                for (var k2 in city[k]) {
                  if (PerforceChangelist >= 376877) {
                    if ((typeof (city[k][k2]) == "object") && city[k][k2] && "d" in city[k][k2]) {
                      var lst = city[k][k2].d;
                      if ((typeof (lst) == "object") && lst) {
                        for (var i in lst) {
                          if (typeof (lst[i]) == "object" && lst[i] && "get_CurrentLevel" in lst[i]) {
                            ret.push(lst);
                          }
                        }
                      }
                    }
                  } else {
                    if ((typeof (city[k][k2]) == "object") && city[k][k2] && "l" in city[k][k2]) {
                      var lst = city[k][k2].l;
                      if ((typeof (lst) == "object") && lst) {
                        for (var i in lst) {
                          if (typeof (lst[i]) == "object" && lst[i] && "get_CurrentLevel" in lst[i]) {
                            ret.push(lst);
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            return ret;
          }
     
          function getDefenseUnits(city) {
            var arr = getUnitArrays(city);
            for (var i = 0; i < arr.length; ++i) {
              for (var j in arr[i]) {
                if (isDefenseUnit(arr[i][j])) {
                  return arr[i];
                }
              }
            }
            return [];
          }
     
          function getOffenseUnits(city) {
            var arr = getUnitArrays(city);
            for (var i = 0; i < arr.length; ++i) {
              for (var j in arr[i]) {
                if (isOffenseUnit(arr[i][j])) {
                  return arr[i];
                }
              }
            }
            return [];
          }
     
     
          function cncopt_create() {
            console.log("CNCOpt Link Button v" + window.__cncopt_version + " loaded");
            var cncopt = {
              selected_base: null,
              keymap: {
                /* GDI Buildings */"GDI_Accumulator": "a",
                "GDI_Refinery": "r",
                "GDI_Trade Center": "u",
                "GDI_Silo": "s",
                "GDI_Power Plant": "p",
                "GDI_Construction Yard": "y",
                "GDI_Airport": "d",
                "GDI_Barracks": "b",
                "GDI_Factory": "f",
                "GDI_Defense HQ": "q",
                "GDI_Defense Facility": "w",
                "GDI_Command Center": "e",
                "GDI_Support_Art": "z",
                "GDI_Support_Air": "x",
                "GDI_Support_Ion": "i",
                /* Forgotten Buildings */"FOR_Silo": "s",
                "FOR_Refinery": "r",
                "FOR_Tiberium Booster": "b",
                "FOR_Crystal Booster": "v",
                "FOR_Trade Center": "u",
                "FOR_Defense Facility": "w",
                "FOR_Construction Yard": "y",
                "FOR_Harvester_Tiberium": "h",
                "FOR_Defense HQ": "q",
                "FOR_Harvester_Crystal": "n",
                /* Nod Buildings */"NOD_Refinery": "r",
                "NOD_Power Plant": "p",
                "NOD_Harvester": "h",
                "NOD_Construction Yard": "y",
                "NOD_Airport": "d",
                "NOD_Trade Center": "u",
                "NOD_Defense HQ": "q",
                "NOD_Barracks": "b",
                "NOD_Silo": "s",
                "NOD_Factory": "f",
                "NOD_Harvester_Crystal": "n",
                "NOD_Command Post": "e",
                "NOD_Support_Art": "z",
                "NOD_Support_Ion": "i",
                "NOD_Accumulator": "a",
                "NOD_Support_Air": "x",
                "NOD_Defense Facility": "w",
                //"NOD_Tech Lab": "",
                //"NOD_Recruitment Hub": "X",
                //"NOD_Temple of Nod": "X",
     
                /* GDI Defense Units */"GDI_Wall": "w",
                "GDI_Cannon": "c",
                "GDI_Antitank Barrier": "t",
                "GDI_Barbwire": "b",
                "GDI_Turret": "m",
                "GDI_Flak": "f",
                "GDI_Art Inf": "r",
                "GDI_Art Air": "e",
                "GDI_Art Tank": "a",
                "GDI_Def_APC Guardian": "g",
                "GDI_Def_Missile Squad": "q",
                "GDI_Def_Pitbull": "p",
                "GDI_Def_Predator": "d",
                "GDI_Def_Sniper": "s",
                "GDI_Def_Zone Trooper": "z",
                /* Nod Defense Units */"NOD_Def_Antitank Barrier": "t",
                "NOD_Def_Art Air": "e",
                "NOD_Def_Art Inf": "r",
                "NOD_Def_Art Tank": "a",
                "NOD_Def_Attack Bike": "p",
                "NOD_Def_Barbwire": "b",
                "NOD_Def_Black Hand": "z",
                "NOD_Def_Cannon": "c",
                "NOD_Def_Confessor": "s",
                "NOD_Def_Flak": "f",
                "NOD_Def_MG Nest": "m",
                "NOD_Def_Militant Rocket Soldiers": "q",
                "NOD_Def_Reckoner": "g",
                "NOD_Def_Scorpion Tank": "d",
                "NOD_Def_Wall": "w",
     
                /* Forgotten Defense Units */"FOR_Wall": "w",
                "FOR_Barbwire_VS_Inf": "b",
                "FOR_Barrier_VS_Veh": "t",
                "FOR_Inf_VS_Inf": "g",
                "FOR_Inf_VS_Veh": "r",
                "FOR_Inf_VS_Air": "q",
                "FOR_Sniper": "n",
                "FOR_Mammoth": "y",
                "FOR_Veh_VS_Inf": "o",
                "FOR_Veh_VS_Veh": "s",
                "FOR_Veh_VS_Air": "u",
                "FOR_Turret_VS_Inf": "m",
                "FOR_Turret_VS_Inf_ranged": "a",
                "FOR_Turret_VS_Veh": "v",
                "FOR_Turret_VS_Veh_ranged": "d",
                "FOR_Turret_VS_Air": "f",
                "FOR_Turret_VS_Air_ranged": "e",
     
                /* GDI Offense Units */"GDI_APC Guardian": "g",
                "GDI_Commando": "c",
                "GDI_Firehawk": "f",
                "GDI_Juggernaut": "j",
                "GDI_Kodiak": "k",
                "GDI_Mammoth": "m",
                "GDI_Missile Squad": "q",
                "GDI_Orca": "o",
                "GDI_Paladin": "a",
                "GDI_Pitbull": "p",
                "GDI_Predator": "d",
                "GDI_Riflemen": "r",
                "GDI_Sniper Team": "s",
                "GDI_Zone Trooper": "z",
     
                /* Nod Offense Units */"NOD_Attack Bike": "b",
                "NOD_Avatar": "a",
                "NOD_Black Hand": "z",
                "NOD_Cobra": "r",
                "NOD_Commando": "c",
                "NOD_Confessor": "s",
                "NOD_Militant Rocket Soldiers": "q",
                "NOD_Militants": "m",
                "NOD_Reckoner": "k",
                "NOD_Salamander": "l",
                "NOD_Scorpion Tank": "o",
                "NOD_Specter Artilery": "p",
                "NOD_Venom": "v",
                "NOD_Vertigo": "t",
     
                "<last>": "."
              },
              make_sharelink: function () {
                try {
                  var selected_base = cncopt.selected_base;
                  var city_id = selected_base.get_Id();
                  var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(city_id);
                  var own_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                  var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
                  tbase = selected_base;
                  tcity = city;
                  scity = own_city;
                  //console.log("Target City: ", city);
                  //console.log("Own City: ", own_city);
                  var link = "http://cncopt.com/?map=";
                  link += "3|"; /* link version */
                  switch (city.get_CityFaction()) {
                    case 1:
                      /* GDI */
                      link += "G|";
                      break;
                    case 2:
                      /* NOD */
                      link += "N|";
                      break;
                    case 3:
                      /* FOR faction - unseen, but in GAMEDATA */
                    case 4:
                      /* Forgotten Bases */
                    case 5:
                      /* Forgotten Camps */
                    case 6:
                      /* Forgotten Outposts */
                      link += "F|";
                      break;
                    default:
                      console.log("cncopt: Unknown faction: " + city.get_CityFaction());
                      link += "E|";
                      break;
                  }
                  switch (own_city.get_CityFaction()) {
                    case 1:
                      /* GDI */
                      link += "G|";
                      break;
                    case 2:
                      /* NOD */
                      link += "N|";
                      break;
                    case 3:
                      /* FOR faction - unseen, but in GAMEDATA */
                    case 4:
                      /* Forgotten Bases */
                    case 5:
                      /* Forgotten Camps */
                    case 6:
                      /* Forgotten Outposts */
                      link += "F|";
                      break;
                    default:
                      console.log("cncopt: Unknown faction: " + own_city.get_CityFaction());
                      link += "E|";
                      break;
                  }
                  link += city.get_Name() + "|";
                  defense_units = []
                  for (var i = 0; i < 20; ++i) {
                    var col = [];
                    for (var j = 0; j < 9; ++j) {
                      col.push(null);
                    }
                    defense_units.push(col)
                  }
                  var defense_unit_list = getDefenseUnits(city);
                  if (PerforceChangelist >= 376877) {
                    for (var i in defense_unit_list) {
                      var unit = defense_unit_list[i];
                      defense_units[unit.get_CoordX()][unit.get_CoordY() + 8] = unit;
                    }
                  } else {
                    for (var i = 0; i < defense_unit_list.length; ++i) {
                      var unit = defense_unit_list[i];
                      defense_units[unit.get_CoordX()][unit.get_CoordY() + 8] = unit;
                    }
                  }
     
                  offense_units = []
                  for (var i = 0; i < 20; ++i) {
                    var col = [];
                    for (var j = 0; j < 9; ++j) {
                      col.push(null);
                    }
                    offense_units.push(col)
                  }
     
                  var offense_unit_list = getOffenseUnits(city);
                  if (PerforceChangelist >= 376877) {
                    for (var i in offense_unit_list) {
                      var unit = offense_unit_list[i];
                      offense_units[unit.get_CoordX()][unit.get_CoordY() + 16] = unit;
                    }
                  } else {
                    for (var i = 0; i < offense_unit_list.length; ++i) {
                      var unit = offense_unit_list[i];
                      offense_units[unit.get_CoordX()][unit.get_CoordY() + 16] = unit;
                    }
                  }
     
                  var techLayout = findTechLayout(city);
                  var buildings = findBuildings(city);
                  for (var i = 0; i < 20; ++i) {
                    row = [];
                    for (var j = 0; j < 9; ++j) {
                      var spot = i > 16 ? null : techLayout[j][i];
                      var level = 0;
                      var building = null;
                      if (spot && spot.BuildingIndex >= 0) {
                        building = buildings[spot.BuildingIndex];
                        level = building.get_CurrentLevel();
                      }
                      var defense_unit = defense_units[j][i];
                      if (defense_unit) {
                        level = defense_unit.get_CurrentLevel();
                      }
                      var offense_unit = offense_units[j][i];
                      if (offense_unit) {
                        level = offense_unit.get_CurrentLevel();
                      }
                      if (level > 1) {
                        link += level;
                      }
     
                      switch (i > 16 ? 0 : city.GetResourceType(j, i)) {
                        case 0:
                          if (building) {
                            var techId = building.get_MdbBuildingId();
                            if (GAMEDATA.Tech[techId].n in cncopt.keymap) {
                              link += cncopt.keymap[GAMEDATA.Tech[techId].n];
                            } else {
                              console.log("cncopt [5]: Unhandled building: " + techId, building);
                              link += ".";
                            }
                          } else if (defense_unit) {
                            if (defense_unit.get_UnitGameData_Obj().n in cncopt.keymap) {
                              link += cncopt.keymap[defense_unit.get_UnitGameData_Obj().n];
                            } else {
                              console.log("cncopt [5]: Unhandled unit: " + defense_unit.get_UnitGameData_Obj().n);
                              link += ".";
                            }
                          } else if (offense_unit) {
                            if (offense_unit.get_UnitGameData_Obj().n in cncopt.keymap) {
                              link += cncopt.keymap[offense_unit.get_UnitGameData_Obj().n];
                            } else {
                              console.log("cncopt [5]: Unhandled unit: " + offense_unit.get_UnitGameData_Obj().n);
                              link += ".";
                            }
                          } else {
                            link += ".";
                          }
                          break;
                        case 1:
                          /* Crystal */
                          if (spot.BuildingIndex < 0) link += "c";
                          else link += "n";
                          break;
                        case 2:
                          /* Tiberium */
                          if (spot.BuildingIndex < 0) link += "t";
                          else link += "h";
                          break;
                        case 4:
                          /* Woods */
                          link += "j";
                          break;
                        case 5:
                          /* Scrub */
                          link += "h";
                          break;
                        case 6:
                          /* Oil */
                          link += "l";
                          break;
                        case 7:
                          /* Swamp */
                          link += "k";
                          break;
                        default:
                          console.log("cncopt [4]: Unhandled resource type: " + city.GetResourceType(j, i));
                          link += ".";
                          break;
                      }
                    }
                  }
                  /* Tack on our alliance bonuses */
                  if (alliance && scity.get_AllianceId() == tcity.get_AllianceId()) {
                    link += "|" + alliance.get_POITiberiumBonus();
                    link += "|" + alliance.get_POICrystalBonus();
                    link += "|" + alliance.get_POIPowerBonus();
                    link += "|" + alliance.get_POIInfantryBonus();
                    link += "|" + alliance.get_POIVehicleBonus();
                    link += "|" + alliance.get_POIAirBonus();
                    link += "|" + alliance.get_POIDefenseBonus();
                  }
     
                  //console.log(link);
                  window.open(link, "_blank");
                } catch (e) {
                  console.log("cncopt [1]: ", e);
                }
              }
            };
            if (!webfrontend.gui.region.RegionCityMenu.prototype.__cncopt_real_showMenu) {
              webfrontend.gui.region.RegionCityMenu.prototype.__cncopt_real_showMenu = webfrontend.gui.region.RegionCityMenu.prototype.showMenu;
            }
     
            var check_ct = 0;
            var check_timer = null;
            var button_enabled = 123456;
            /* Wrap showMenu so we can inject our Sharelink at the end of menus and
             * sync Base object to our cncopt.selected_base variable  */
            webfrontend.gui.region.RegionCityMenu.prototype.showMenu = function (selected_base) {
              try {
                var self = this;
                //console.log(selected_base);
                cncopt.selected_base = selected_base;
                if (this.__cncopt_initialized != 1) {
                  this.__cncopt_initialized = 1;
                  this.__cncopt_links = [];
                  for (var i in this) {
                    try {
                      if (this[i] && this[i].basename == "Composite") {
                        // C4MOD
			      var link = new qx.ui.form.Button("CNCOpt");
                        link.addListener("execute", function () {
                          var bt = qx.core.Init.getApplication();
                          bt.getBackgroundArea().closeCityInfo();
                          cncopt.make_sharelink();
                        });
                        this[i].add(link);
                        this.__cncopt_links.push(link)
                      }
                    } catch (e) {
                      console.log("cncopt [2]: ", e);
                    }
                  }
                }
                var tf = false;
                switch (selected_base.get_VisObjectType()) {
                  case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
                    switch (selected_base.get_Type()) {
                      case ClientLib.Vis.Region.RegionCity.ERegionCityType.Own:
                        tf = true;
                        break;
                      case ClientLib.Vis.Region.RegionCity.ERegionCityType.Alliance:
                      case ClientLib.Vis.Region.RegionCity.ERegionCityType.Enemy:
                        tf = true;
                        break;
                    }
                    break;
                  case ClientLib.Vis.VisObject.EObjectType.RegionGhostCity:
                    tf = false;
                    console.log("cncopt: Ghost City selected.. ignoring because we don't know what to do here");
                    break;
                  case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
                    tf = true;
                    break;
                  case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
                    tf = true;
                    break;
                }
     
                var orig_tf = tf;
     
                function check_if_button_should_be_enabled() {
                  try {
                    tf = orig_tf;
                    var selected_base = cncopt.selected_base;
                    var still_loading = false;
                    if (check_timer != null) {
                      clearTimeout(check_timer);
                    }
     
                    /* When a city is selected, the data for the city is loaded in the background.. once the
                     * data arrives, this method is called again with these fields set, but until it does
                     * we can't actually generate the link.. so this section of the code grays out the button
                     * until the data is ready, then it'll light up. */
                    if (selected_base && selected_base.get_Id) {
                      var city_id = selected_base.get_Id();
                      var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(city_id);
                      //if (!city || !city.m_CityUnits || !city.m_CityUnits.m_DefenseUnits) {
                      //console.log("City", city);
                      //console.log("get_OwnerId", city.get_OwnerId());
                      if (!city || city.get_OwnerId() == 0) {
                        still_loading = true;
                        tf = false;
                      }
                    } else {
                      tf = false;
                    }
                    if (tf != button_enabled) {
                      button_enabled = tf;
                      for (var i = 0; i < self.__cncopt_links.length; ++i) {
                        self.__cncopt_links[i].setEnabled(tf);
                      }
                    }
                    if (!still_loading) {
                      check_ct = 0;
                    } else {
                      if (check_ct > 0) {
                        check_ct--;
                        check_timer = setTimeout(check_if_button_should_be_enabled, 100);
                      } else {
                        check_timer = null;
                      }
                    }
                  } catch (e) {
                    console.log("cncopt [3]: ", e);
                    tf = false;
                  }
                }
     
                check_ct = 50;
                check_if_button_should_be_enabled();
              } catch (e) {
                console.log("cncopt [3]: ", e);
              }
              this.__cncopt_real_showMenu(selected_base);
            }
          }
     
     
          /* Nice load check (ripped from AmpliDude's LoU Tweak script) */
          function cnc_check_if_loaded() {
            try {
              if (typeof qx != 'undefined') {
                a = qx.core.Init.getApplication(); // application
                if (a) {
                  cncopt_create();
                } else {
                  window.setTimeout(cnc_check_if_loaded, 1000);
                }
              } else {
                window.setTimeout(cnc_check_if_loaded, 1000);
              }
            } catch (e) {
              if (typeof console != 'undefined') console.log(e);
              else if (window.opera) opera.postError(e);
              else GM_log(e);
            }
          }
          if (/commandandconquer\.com/i.test(document.domain)) window.setTimeout(cnc_check_if_loaded, 1000);
        }
     
        // injecting because we can't seem to hook into the game interface via unsafeWindow
        //   (Ripped from AmpliDude's LoU Tweak script)
        var script_block = document.createElement("script");
        txt = cncopt_main.toString();
        script_block.innerHTML = "(" + txt + ")();";
        script_block.type = "text/javascript";
        if (/commandandconquer\.com/i.test(document.domain)) document.getElementsByTagName("head")[0].appendChild(script_block);
      })();
    } catch (e) {
      GM_log(e);
    }
     
// =========================================================================  Basenschieber  ====================================================================

(function () {
	var BaseNavReorder_main = function () {
		var reorderWindow = null;
		var baseList = null;
		var bases = null;
		var myOrder = null;
		var reorderInterval = 500;
		function createBaseNavReorder() {
			try {
				console.log('Base Navigation Bar Reorderer loaded');
				var baseTimerBar = qx.core.Init.getApplication().getGlobalBaseTimerBar().getChildren()[1];
				var btnToggleWindow=new qx.ui.form.Button("").set({toolTipText:"verschiebt deine Basen"});
				baseTimerBar.add(btnToggleWindow);
				reorderWindow = new qx.ui.window.Window("Basenschieber", "").set({
					contentPaddingTop: 0,
					contentPaddingBottom: 7,
					contentPaddingRight: 7,
					contentPaddingLeft: 7,
					width: 200,
					showMaximize: false,
					showMinimize: false,
					allowMaximize: false,
					allowMinimize: false,
					resizable: false
				});
				reorderWindow.setLayout(new qx.ui.layout.Canvas());

				baseList = new qx.ui.form.List;
				baseList.set({ height: 300, width: 150, selectionMode : "single" });
				var btnMoveUp=new qx.ui.form.Button("Hâ€˜").set({height:40,toolTipText:"hoch"});
				var btnMoveDown=new qx.ui.form.Button("Râ€œ").set({height:40,toolTipText:"runter"});

				reorderWindow.add(btnMoveUp, {
					top: 105,
					right: 3
				});
				reorderWindow.add(btnMoveDown, {
					bottom: 110,
					right: 3
				});

				reorderWindow.add(baseList);
				myOrder = localStorage.ta_basenavbar_baseorder;
				if (!myOrder) {
					myOrder = getAllBases();
					localStorage.ta_basenavbar_baseorder = JSON.stringify(myOrder);
				}
				btnToggleWindow.addListener("click", toggleReorderWindow, this);
				btnMoveUp.addListener("click", moveUp, this);	
				btnMoveDown.addListener("click", moveDown, this);
				reorder();
			} catch (e) {
				console.log("createBaseNavReorder: ", e);
			}
		}

		function moveUp() {
			try {
				if (baseList.getSelection()[0] !== null) {
					var curIndex = baseList.indexOf(baseList.getSelection()[0]);
					if (curIndex > 0) baseList.addAt(baseList.getSelection()[0],curIndex-1);
					saveOrder();
				}
			} catch (e) {
				console.log(e);
			}
		}

		function moveDown() {
			try {
				if (baseList.getSelection()[0] !== null) {
					var curIndex = baseList.indexOf(baseList.getSelection()[0]);
					if (curIndex < baseList.getChildren().length) baseList.addAt(baseList.getSelection()[0],curIndex+1);
					saveOrder();
				}
			} catch (e) {
				console.log(e);
			}
		}
	
		function saveOrder() {
			try {
				myOrder = [];
				for (var y in baseList.getChildren()) {
					myOrder.push(translateNameToId(baseList.getChildren()[y].getLabel()));
				}
				localStorage.ta_basenavbar_baseorder = JSON.stringify(myOrder);
			} catch (e) {
				console.log(e);
			}
		}

		function toggleReorderWindow() {
			try {
				if (reorderWindow.isVisible()) {
					reorderWindow.close();
					baseList.removeAll();
				} else {
					var reorderWindowLeft = qx.bom.Viewport.getWidth(window) - window.qx.core.Init.getApplication().getGlobalBaseTimerBar().getWidth() - reorderWindow.getWidth();
					var reorderWindowTop = window.qx.core.Init.getApplication().getGlobalBaseTimerBar().getHeight();
					reorderWindow.moveTo(reorderWindowLeft, reorderWindowTop);
					var item;
					myOrder = JSON.parse(localStorage.ta_basenavbar_baseorder);
					var newBases = getAllBases(); 
					for (var j in myOrder) {
						for (var i in newBases) {
							if (myOrder[j] === newBases[i]) {
								newBases.splice(i, 1);
								continue;
							}
						}
					}
					myOrder = myOrder.concat(newBases);
					reorderWindow.open();
					for (var x in myOrder) {
						item = new qx.ui.form.ListItem(translateIdToName(myOrder[x]));
						baseList.add(item);
					}
				}
			} catch (e) {
				console.log(e);
			}
		}

		function reorder() {
			try {
				var baseNavigationBar = qx.core.Init.getApplication().getBaseNavigationBar().getChildren()[0].getChildren()[0];
				var baseButtons = baseNavigationBar.getChildren();
				myOrder = JSON.parse(localStorage.ta_basenavbar_baseorder);

				for (var i = myOrder.length; i > -1 ; i--) {
					for (var x in baseButtons) {
						if (typeof baseButtons[x].getChildren()[1].getChildren === 'function') {
							var navigationButton = baseButtons[x].getChildren()[1].getChildren()[0].getChildren()[2];
							if (navigationButton.getValue() === translateIdToName(myOrder[i])) {
								baseNavigationBar.addAt(baseButtons[x],0);
							}
						}
					}
				}
				window.setTimeout(reorder, reorderInterval);
			} catch (e) {
				console.log(e);
			}
		}

		function getAllBases() {
			try {
				bases = [];
				var cities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
				for (var cityId in cities) {
					bases.push(cityId);
				}
				return bases;
			} catch (e) {
				console.log(e);
			}
		}

		function translateIdToName(id) {
			try {
				var cities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
				for (var cityId in cities) {
					if (cityId === id) {
						return cities[cityId].get_Name();
					}
				}
			} catch (e) {
				console.log(e);
			}
		}

		function translateNameToId(name) {
			try {
				var cities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
				for (var city in cities) {
					if (cities[city].get_Name() === name) {
						return city;
					}
				}
			} catch (e) {
				console.log(e);
			}
		}
	
		function BaseNavReorder_checkIfLoaded() {
			try {
				if (typeof qx !== 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getGlobalBaseTimerBar() && qx.core.Init.getApplication().getBaseNavigationBar()) {
					createBaseNavReorder();
				} else {
					window.setTimeout(BaseNavReorder_checkIfLoaded, 1000);
				}
			} catch (e) {
				console.log("BaseNavReorder_checkIfLoaded: ", e);
			}
		}

		if (/commandandconquer\.com/i.test(document.domain)) {
			window.setTimeout(BaseNavReorder_checkIfLoaded, 1000);
		}
	}

	try {
		var BaseNavReorder = document.createElement("script");
		BaseNavReorder.innerHTML = "(" + BaseNavReorder_main.toString() + ")();";
		BaseNavReorder.type = "text/javascript";
		if (/commandandconquer\.com/i.test(document.domain)) {
			document.getElementsByTagName("head")[0].appendChild(BaseNavReorder);
		}
	} catch (e) {
		console.log("BaseNavReorder: init error: ", e);
	}
})();


// =========================================================================  ALLIANZ VERWATUNGSTOOL   ================================================================

function Ini() {
	console.log("BaseInfo initialisiert...");
};
Ini();
(function () {
	var BaseInfoMain = function () {
		function BaseInfoCreate()
			{
				try
					{
						qx.Class.define("BaseInfo", {
							type: "singleton",
							extend: qx.core.Object,
							construct: function () {
								window.addEventListener("click", this.onClick, false);
								window.addEventListener("keyup", this.onKey, false);
								window.addEventListener("mouseover", this.onMouseOver, false);
								console.log("BaseInfo geladen...");
								VERSION = '2.5.5';
								AUTHOR = 'Danke an Dooki Welt7 ( UniForce )';
								CLASS = 'New Tiberium Kekse-Allianztool';
							},
							members: {
								BasenwerteFenster: null,
								BasenwerteTab: null,
								BasenwertePage: null,
								BasenwerteVBox: null,
								AusgabeTab: null,
								AusgabePage: null,
								AusgabeVBox: null,
								BasenwerteButton: null,
								app: null,
								initialize: function () {
									// C4MOD
									this.BasenwerteFenster = new qx.ui.window.Window(CLASS + " " + VERSION).set({
										padding: 5,
										paddingRight: 0,
										showMaximize:false,
										showMinimize:false,
										showClose:true,
										allowClose:true,
										resizable:false
									});
									this.BasenwerteFenster.setTextColor('black');
									this.BasenwerteFenster.setLayout(new qx.ui.layout.HBox); 
									this.BasenwerteFenster.moveTo(280, 60);
									
									// Tab Reihe
									this.BasenwerteTab = (new qx.ui.tabview.TabView).set({
										contentPaddingTop: 3,
										contentPaddingBottom: 6,
										contentPaddingRight: 7,
										contentPaddingLeft: 3
									});
									this.BasenwerteFenster.add(this.BasenwerteTab);
									
									// Tab 1
									this.BasenwertePage = new qx.ui.tabview.Page("Basenwerte");
									this.BasenwertePage.setLayout(new qx.ui.layout.VBox(5));
									this.BasenwerteTab.add(this.BasenwertePage);
									this.BasenwerteVBox = new qx.ui.container.Composite();
									this.BasenwerteVBox.setLayout(new qx.ui.layout.VBox(5));
									this.BasenwerteVBox.setThemedPadding(2);
									this.BasenwerteVBox.setThemedBackgroundColor("#eef");
									this.BasenwertePage.add(this.BasenwerteVBox);

									// Tab 2
									this.MembersPage = new qx.ui.tabview.Page("Mitglieder");
									this.MembersPage.setLayout(new qx.ui.layout.VBox(5));
									this.BasenwerteTab.add(this.MembersPage);
									this.MembersVBox = new qx.ui.container.Composite();
									this.MembersVBox.setLayout(new qx.ui.layout.VBox(5));
									this.MembersVBox.setThemedPadding(2);
									this.MembersVBox.setThemedBackgroundColor("#eef");
									this.MembersPage.add(this.MembersVBox);

									// Tab 3
									this.AboutPage = new qx.ui.tabview.Page("ScriptInfo");
									this.AboutPage.setLayout(new qx.ui.layout.VBox(5));
									this.BasenwerteTab.add(this.AboutPage);
									this.AboutVBox = new qx.ui.container.Composite();
									this.AboutVBox.setLayout(new qx.ui.layout.VBox(5));
									this.AboutVBox.setThemedPadding(2);
									this.AboutVBox.setThemedBackgroundColor("#eef");
									this.AboutPage.add(this.AboutVBox);

									// C4MOD
									this.BasenwerteButton = new qx.ui.form.Button("Info").set({
										toolTipText: CLASS + " " + VERSION + " anzeigen",
										width: 32,
										height: 32,
										maxWidth: 32,
										maxHeight: 32,
										appearance: ("button-playarea-mode-frame"),
										center: true
									});
									this.BasenwerteButton.addListener("click", function (e) {
										this.BasenwerteVBox.removeAll();
										this.AboutVBox.removeAll();
										this.MembersVBox.removeAll();
										this.showBasenwerte();
										this.BasenwerteFenster.show();
									}, this);
									this.app = qx.core.Init.getApplication();
									this.app.getDesktop().add(this.BasenwerteButton, {
										right: 125,
										top: 0
									});
								},
								showBasenwerte: function (ev) {
									var instance = ClientLib.Data.MainData.GetInstance();
									var alliance = instance.get_Alliance();
									var serverName = instance.get_Server().get_Name();
									var player = instance.get_Player();
									var faction1 = player.get_Faction();
									var playerRank = player.get_OverallRank();
									var aktuellesDatum = new Date();
									var Stunde = aktuellesDatum.getHours();
									var Minute = aktuellesDatum.getMinutes();
									var Monat = aktuellesDatum.getMonth()+1 ;
									var Tag = aktuellesDatum.getDate();
									var Jahr = aktuellesDatum.getFullYear();
									if(Stunde<10) Stunde = "0" + Stunde;
									if(Minute<10) Minute = "0" + Minute;
									if(Tag<10) Tag = "0" + Tag;
									if(Monat<10) Monat = "0" + Monat;
									var Datum = Tag + "." + Monat + "." + Jahr;
									var Uhrzeit = Stunde + ":" + Minute;
									var player_basen = 0;
									var support_gebaeude = 0;
									var v = 0;
									var credit_b = 0;
									var base1 = '';
									var base2 = '';
									var VE_durchschnitt = null;
									var VE_lvl = null;
									var support = 0;
									var supportlvl = null;
									var credit_def = null;
									var credit_durchschnitt = null;
									var repairMaxTime = null;
									var creditPerHour = 0;
									var creditsPerHour = 0;
									var credit_basen = '';
									var first_rep_flug = 0;
									var first_rep_fahr = 0;
									var first_rep_fuss = 0;
									var second_rep_flug = 0;
									var second_rep_fahr = 0;
									var second_rep_fuss = 0;
									var firstBaseName = '';
									var firstBaselvl = 0;
									var firstOfflvl = 0;
									var firstDeflvl = 0;
									var firstPowerProduction = 0;
									var firstRepairAir = null;
									var firstRepairVehicle = null;
									var firstRepairInfantry = null;
									var secondBaseName = '';
									var secondBaselvl = 0;
									var secondOfflvl = 0;
									var secondDeflvl = 0;
									var secondPowerProduction = 0;
									var secondRepairAir = null;
									var secondRepairVehicle = null;
									var secondRepairInfantry = null;
									var factionArt = new Array();
									factionArt[0] = "";
									factionArt[1] = "GDI";
									factionArt[2] = "NOD";
									var newAusgabe = new Array();
									var apc = instance.get_Cities();
									var PlayerName = apc.get_CurrentOwnCity().get_PlayerName();
									var PlayerID = apc.get_CurrentOwnCity().get_PlayerId();
									var AllianzName = apc.get_CurrentOwnCity().get_AllianceName();
									var AllianzID = apc.get_CurrentOwnCity().get_AllianceId();
									var apcl = apc.get_AllCities().d;
									var members = alliance.get_MemberData().d, member;
									keys = Object.keys(members);
									len = keys.length;
									var AllianzRolle = new Array();
									var AllianzSpieler = new Array();
									var sd;
									while (len--)
										{
											member = members[keys[len]];
											AllianzRolle[member.Id] = member.RoleName;
											AllianzSpieler[member.Id] = member.Name;
										}
									var allBases = '';
									var aB_basename,aB_baselvl,aB_offlvl,aB_deflvl,aB_velvl,aB_vzlvl,aB_cclvl,aB_supportlvl,aB_credits,aB_strom;
									for (var key in apcl)
										{
											player_basen++;
											var c = apcl[key];
											try
												{
													sd = c.get_SupportData();
													if(sd !== null)
														{
															support_gebaeude++;
															support = sd.get_Level();
															supportlvl = supportlvl+support;
															
														}
													else
														{
															support = 0;
														}
													unitData = c.get_CityBuildingsData();
													ve = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Defense_Facility);
													vz = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Defense_HQ);
													creditPerHour = ClientLib.Base.Resource.GetResourceGrowPerHour(c.get_CityCreditsProduction(), false) + ClientLib.Base.Resource.GetResourceBonusGrowPerHour(c.get_CityCreditsProduction(), false);
													repairMaxTime = c.GetResourceMaxStorage(ClientLib.Base.EResourceType.RepairChargeInf);
													commandpointsMaxStorage = c.GetResourceMaxStorage(ClientLib.Base.EResourceType.CommandPoints);
													creditsPerHour = creditsPerHour + creditPerHour;
													if(c.get_CommandCenterLevel() > 0)
														{
															if(firstOfflvl < c.get_LvlOffense())
																{
																	secondBaseName = firstBaseName;
																	secondBaselvl = firstBaselvl;
																	secondOfflvl = firstOfflvl;
																	secondDeflvl = firstDeflvl;
																	secondPowerProduction = firstPowerProduction;
																	secondRepairInfantry = firstRepairInfantry;
																	secondRepairVehicle = firstRepairVehicle;
																	secondRepairAir = firstRepairAir;
																	
																	firstBaseName = c.get_Name();
																	firstBaselvl = c.get_LvlBase();
																	firstOfflvl = c.get_LvlOffense();
																	firstDeflvl = c.get_LvlDefense();
																	firstPowerProduction = c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
																	firstRepairInfantry = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);
																	firstRepairVehicle = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);
																	firstRepairAir = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);
																}
															else if(c.get_LvlOffense() > secondOfflvl)
																{
																	secondBaseName = c.get_Name();
																	secondBaselvl = c.get_LvlBase();
																	secondOfflvl = c.get_LvlOffense();
																	secondDeflvl = c.get_LvlDefense();
																	secondPowerProduction = c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
																	secondRepairInfantry = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);
																	secondRepairVehicle = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);
																	secondRepairAir = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);
																}
														}
													if(parseInt(creditPerHour) > 50000)
														{
															credit_b++;
															credit_def = credit_def + c.get_LvlDefense();
														}
													if(ve !== null)
														{
															v++;
															VE_lvl = VE_lvl+ve.get_CurrentLevel();
														}
													// All Bases v2.5
													// Basename,BaseLvl,OffLvl,DefLvl,VE,VZ,KZ,SupportLvl,Credits,Strom,
													if(allBases != "")
														{
															allBases += ' |||| ';
														}
													if(ve !== null) { aB_velvl = ve.get_CurrentLevel().toString(); } else { aB_velvl = 0;}
													if(vz !== null) { aB_vzlvl = vz.get_CurrentLevel().toString(); } else { aB_vzlvl = 0;}
													if(c.get_CommandCenterLevel)  { aB_cclvl =  c.get_CommandCenterLevel().toString(); } else { aB_cclvl = 0;}
													allBases += '' + c.get_Name().toString() + ' | ' + c.get_LvlBase().toFixed(2).toString() + ' | ' + c.get_LvlOffense().toFixed(2).toString() + ' | ' + c.get_LvlDefense().toFixed(2).toString() + ' | ' + aB_velvl + ' | ' + aB_vzlvl + ' | ' + aB_cclvl + ' | ' + support.toFixed(2).toString() + ' | ' + parseInt(creditPerHour) + ' | ' + parseInt(c.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false) + c.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power) + alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power)) + '';
													
												}
											catch (e)
												{
													console.warn("BaseInfo pro Base: ", e); 
												}
										}

									credit_durchschnitt = credit_def / credit_b;
									newAusgabe["credit_basen"] = credit_b;
									if(credit_b>0)
										{
											newAusgabe["credit_def"] = "" + credit_durchschnitt.toFixed(2).toString() + "";
										}
									else
										{
											newAusgabe["credit_def"] = 0;
										}
									newAusgabe["support_basen"] = support_gebaeude;
									if(support_gebaeude>0)
										{
											supportlvl = supportlvl / support_gebaeude;
											newAusgabe["support_lvl"] = "" + supportlvl.toFixed(2).toString() + "";
										}
									else
										{
											newAusgabe["support_lvl"] = 0;
										}
									VE_durchschnitt = VE_lvl / v;
									if(v>0)
										{
											newAusgabe["ve"] = "" + VE_durchschnitt.toFixed(2).toString() + "";
										}
									else
										{
											newAusgabe["ve"] = 0;
										}
									first_rep_flug = ClientLib.Vis.VisMain.FormatTimespan(firstRepairAir);
									first_rep_fahr = ClientLib.Vis.VisMain.FormatTimespan(firstRepairVehicle);
									first_rep_fuss = ClientLib.Vis.VisMain.FormatTimespan(firstRepairInfantry);
									if(first_rep_flug.split(":").length < 3)
										{
											first_rep_flug = "0:" + first_rep_flug;
										}
									if(first_rep_fahr.split(":").length < 3)
										{
											first_rep_fahr = "0:" + first_rep_fahr;
										}
									if(first_rep_fuss.split(":").length < 3)
										{
											first_rep_fuss = "0:" + first_rep_fuss;
										}
									second_rep_flug = ClientLib.Vis.VisMain.FormatTimespan(secondRepairAir);
									second_rep_fahr = ClientLib.Vis.VisMain.FormatTimespan(secondRepairVehicle);
									second_rep_fuss = ClientLib.Vis.VisMain.FormatTimespan(secondRepairInfantry);
									if(second_rep_flug.split(":").length < 3)
										{
											second_rep_flug = "0:" + second_rep_flug;
										}
									if(second_rep_fahr.split(":").length < 3)
										{
											second_rep_fahr = "0:" + second_rep_fahr;
										}
									if(second_rep_fuss.split(":").length < 3)
										{
											second_rep_fuss = "0:" + second_rep_fuss;
										}
									
									newAusgabe["AllianzID"] = AllianzID;
									newAusgabe["AllianzName"] = AllianzName.toString();
									newAusgabe["AllianzRolle"] = AllianzRolle[PlayerID].toString();
									newAusgabe["ServerName"] = serverName.toString();

									newAusgabe["Spieler"] = PlayerName;
									newAusgabe["Klasse"] = factionArt[faction1];
									newAusgabe["Datum"] = Datum;
									newAusgabe["Uhrzeit"] = Uhrzeit;
									newAusgabe["Rang"] = playerRank;
									newAusgabe["maxKP"] = commandpointsMaxStorage;
									newAusgabe["repZeit"] = repairMaxTime / 60 / 60;
									newAusgabe["Basen"] = player_basen;
									newAusgabe["Creditproduktion"] = parseInt(creditsPerHour);
									
									newAusgabe["1st_Base"] = firstBaselvl.toFixed(2).toString();
									newAusgabe["1st_Def"] = firstDeflvl.toFixed(2).toString();
									newAusgabe["1st_Off"] = firstOfflvl.toFixed(2).toString();
									newAusgabe["1st_Stromproduktion"] = parseInt(firstPowerProduction);
									newAusgabe["1st_Flugzeuge"] = first_rep_flug;
									newAusgabe["1st_Fahrzeuge"] = first_rep_fahr;
									newAusgabe["1st_Fusstruppen"] = first_rep_fuss;
									
									newAusgabe["2nd_Base"] = secondBaselvl.toFixed(2).toString();
									newAusgabe["2nd_Def"] = secondDeflvl.toFixed(2).toString();
									newAusgabe["2nd_Off"] = secondOfflvl.toFixed(2).toString();
									newAusgabe["2nd_Stromproduktion"] = parseInt(secondPowerProduction);
									newAusgabe["2nd_Flugzeuge"] = second_rep_flug;
									newAusgabe["2nd_Fahrzeuge"] = second_rep_fahr;
									newAusgabe["2nd_Fusstruppen"] = second_rep_fuss;

									var usersubmit = '';
									for(var werte in newAusgabe)
										{
											usersubmit += "[" + werte + "] == " + newAusgabe[werte] + "\n";
										}
									// Tab 1 Basenwerte
									this.BasenwerteVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><big><b><u>Allgemeine Informationen</u></b></big><br><b>Allianz Rolle:</b> " + newAusgabe["AllianzRolle"] + "<br><b>Spielername:</b> " + newAusgabe["Spieler"] + "<br><b>Spielerklasse:</b> " + newAusgabe["Klasse"] + "<br><b>Aktuelle Uhrzeit:</b> " + newAusgabe["Uhrzeit"] + "Uhr - " + newAusgabe["Datum"] + "<br><b>Rang:</b> " + newAusgabe["Rang"] + "<br><b>Maximale KP:</b> " + newAusgabe["maxKP"] + "<br><b>Maximale Repzeit:</b> " + newAusgabe["repZeit"] + "<br><b>Basenanzahl:</b> " + newAusgabe["Basen"] + "<br><b>Credit Basen Anzahl:</b> " + newAusgabe["credit_basen"] + "<br><b>Creditproduktion:</b> " + newAusgabe["Creditproduktion"] + "<br><b>Creditbasen Defensive Ã˜:</b> " + newAusgabe["credit_def"] + "<br><b>SupportgebÃ¤ude Anzahl:</b> " + newAusgabe["support_basen"] + "<br><b>SupportgebÃ¤ude Level Ã˜:</b> " + newAusgabe["support_lvl"] + "<br><b>VE Ã˜ aller Basen:</b> " + newAusgabe["ve"] + "</td></tr></table>").set({rich: true}));
									this.BasenwerteVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><big><b><u>1. Offensiv Basis</u></b></big><br><b>Basis Name:</b> " + firstBaseName + "<br><b>Basis Level:</b> " + newAusgabe["1st_Base"] + "<br><b>Offensive:</b> " + newAusgabe["1st_Off"] + "<br><b>Defensive:</b> " + newAusgabe["1st_Def"] + "<br><b>Stromproduktion:</b> " + newAusgabe["1st_Stromproduktion"] + "<br><b>Rep. Flugzeuge:</b> " + newAusgabe["1st_Flugzeuge"] + "<br><b>Rep. Fahrzeuge:</b> " + newAusgabe["1st_Fahrzeuge"] + "<br><b>Rep. FuÃŸtruppen:</b> " + newAusgabe["1st_Fusstruppen"] + "</td><td><big><b><u>2. Offensiv Basis</u></b></big><br><b>Basis Name:</b> " + secondBaseName + "<br><b>Basis Level:</b> " + newAusgabe["2nd_Base"] + "<br><b>Offensive:</b> " + newAusgabe["2nd_Off"] + "<br><b>Defensive:</b> " + newAusgabe["2nd_Def"] + "<br><b>Stromproduktion:</b> " + newAusgabe["2nd_Stromproduktion"] + "<br><b>Rep. Flugzeuge:</b> " + newAusgabe["2nd_Flugzeuge"] + "<br><b>Rep. Fahrzeuge:</b> " + newAusgabe["2nd_Fahrzeuge"] + "<br><b>Rep. FuÃŸtruppen:</b> " + newAusgabe["2nd_Fusstruppen"] + "</td></tr></table>").set({rich: true}));
									// C4MOD
										this.BasenwerteVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><a style='display:block;color:#fff;background:#900;font-weight:900;paddign:5px;border:1px solid #555;text-decoration:none;' href='http://ccta.php-gfx.net/baseinfo/index.php?usersubmit=" + escape(usersubmit) + "&amp;allBases=" + escape(allBases) + "' target='_blank'><b>&nbsp;&nbsp;&nbsp;&nbsp;Werte Uebertragen&nbsp;&nbsp;&nbsp;&nbsp;</b></a></td></tr></table>").set({rich: true}));
									
									// Tab 2 Mitglieder
									var keys = Object.keys(AllianzSpieler);
									var anzahl = keys.length;
									var len = keys.length;
									var member='',userreplace='',i=0;
									userreplace += newAusgabe["AllianzID"] + ',' + newAusgabe["AllianzName"] + ',' + newAusgabe["AllianzRolle"] + ',' + newAusgabe["ServerName"] + ',';
									while (len--)
										{
											i++;
											if(member != '')
												{
													if(i == 5)
														{
															member += ',<br>';
															i = 0;
														}
													else
														{
															member += ', ';
														}
													userreplace += ',';
												}
											member += AllianzSpieler[keys[len]];
											userreplace += AllianzSpieler[keys[len]];
										}
									this.MembersVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><big><b><u>Mitglieder Auflistung (" + anzahl + ")</u></b></big><br><br>" + member + "</td></tr></table>").set({rich: true}));
									if(newAusgabe["AllianzRolle"] == 'Oberbefehlshaber' || newAusgabe["AllianzRolle"] == 'Leader')
										{
											this.MembersVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><span style='color: #bb0000;'><u>Nur fÃ¼r OBH's sichtbar:</u></span></td></tr></table>").set({rich: true}));
											this.MembersVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><big><b><u>Mitglieder Anpassung</u></b></big><br>Mit diesem Button kannste du deine Mitglieder auf<br>der BaseInfo Seite anpassen, sollten ehemalige Mitglieder,<br>die z.Z. einer anderen Allianz angehÃ¶ren,<br>noch in der Auflistung angezeigt werden.</td></tr></table>").set({rich: true}));
											this.MembersVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><a href='http://ccta.php-gfx.net/baseinfo/index.php?userreplace=" + escape(userreplace) + "' target='_blank'><button><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mitglieder abgleichen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></button></a><br><span style='color: #bb0000;'><i>Du musst auf der " + CLASS + "-Seite eingeloggt sein</i></span></td></tr></table>").set({rich: true}));
										}

									// Tab 3 ScriptInfo
									this.AboutVBox.add(new qx.ui.basic.Label("<table cellspacing='1' cellpadding='10'><tr><td><big><b><u>Script Informationen</u></b></big><br><b>Name:</b> " + CLASS + "<br><b>Version:</b> " + VERSION + "<br><b>Ersteller:</b> " + AUTHOR + "<br><b>Homepage:</b> <a href='http://ccta.php-gfx.net/baseinfo' target='_blank'>ccta.php-gfx.net/baseinfo</a><br><br><big><b><u>Warum entstand dieses Script?</u></b></big><br>Es gibt ein paar HauptgrÃ¼nde warum dieses Script entstand. Zum einen wollten Befehlshaber einen Ãœberblick haben, Ã¼ber die einzelnen Werte ihrer Mitglieder, zum anderen sollten die Mitglieder selber sehen, wie ihre Werte sind.<br><br><big><b><u>Was bewirkt \"Werte Uebertragen\"?</u></b></big><br>Mit dem Button \"Werte Ã¼bertragen\" koennen eure Basenwerte an eine Homepage Uebermittelt werden, wo sich OBH's anmelden koennen und ihre Allianz auswerten koennen. Die OBH's bekommen mit dem erstmaligen Ueertragen ihrer eigenen Werte einen \"Befehlshaber Login\" angezeigt, welcher nur EINMAL sichtbar ist. Danach koennen sich Zugriffsberechtigte (diese Zugangsdaten sollten von diesem OBH an berechtigte Personen weitergegeben werden) ihre Allianz einsehen und diverse Einstellungen taetigen. Mitglieder bekommen mit dem uebertragen ihrer Werte einen permanenten Link angezeigt welchen sie fuer ihre eigenen Werte nutzen koennen. Sie sehen dann ihre letzten 5 EintrÃ¤ge wo sie selbst auswerten koennen wo sie sich verbessert haben.</td></tr></table>").set({rich: true, width: 350}));
								}
							}
						});          
					}
				catch (e)
					{
						console.warn("qx.Class.define(BaseInfo: ", e);      
					}
				BaseInfo.getInstance();
			}
		function LoadExtension()
			{
				try
					{
						if (typeof(qx)!='undefined')
							{
								if (!!qx.core.Init.getApplication().getMenuBar())
									{
										BaseInfoCreate();
										BaseInfo.getInstance().initialize();
										return;
									}
							}
					}
				catch (e)
					{
						if (console !== undefined) console.log(e);
						else if (window.opera) opera.postError(e);
						else GM_log(e);
					}
				window.setTimeout(LoadExtension, 1000);
			}
		LoadExtension();
	}
	function Inject()
		{
			if (window.location.pathname != ("/login/auth"))
				{
					var Script = document.createElement("script");
					Script.innerHTML = "(" + BaseInfoMain.toString() + ")();";
					Script.type = "text/javascript";        
					document.getElementsByTagName("head")[0].appendChild(Script);
				}
		}    
	Inject();
})();

// =========================================================================  The Green Cross - TA  Tools   ====================================================================
(function () 
{
	var injectFunction = function() 
	{
		function createClasses()
		{
			qx.Class.define("TGCTools", 
			{
				type: "singleton",
				extend: qx.core.Object,
            
				construct: function()
				{
					try
					{
						//Collect All Resources from other bases button
						/*var playArea = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.OVL_PLAYAREA);
						
						var transAllResBtn = new qx.ui.form.Button("Transfer All");
						transAllResBtn.set
						({
							alignY: "middle",
							width: 75,
							height: 30,
							toolTipText: "Transfers all resources from the other bases to this one",
							appearance: "button-text-small"
						});
						transAllResBtn.addListener("click", this._transferAllResources, this);
						playArea.add(transAllResBtn, { top: 5, right: 300 });*/
						
						var app = qx.core.Init.getApplication()
						var bar = app.getOptionsBar();
						var cntButton = bar.getChildren()[2];
						this.managerBtn = new qx.ui.form.Button("Manager").set({alignX: "center"});
						this.managerBtn.set
						({
							alignY: "middle",
							width: 75,
							height: 30,
							toolTipText: "Opens popup menu with buttons to management tools",
							appearance: "button-text-small"
						});
						this.managerBtn.addListener("click", this._popupManager, this);
						cntButton.removeAt(0);
						cntButton.addAt(this.managerBtn, 1);
						
						//var scanBtn = new qx.ui.form.Button("", "webfrontend/ui/icons/icon_mainui_base_button.png").set
						var scanBtn = new qx.ui.form.Button("", "FactionUI/icons/icon_attack_start_combat.png").set
						({
							center: true,
							show: "icon",
							alignY: "middle",
							width: 40,
							height: 40,
							toolTipText: "Opens up Base Scanner",
							appearance: "button-text-small"
						});
						scanBtn.addListener("click", this._openScanner, this);
						
						var poiBtn = new qx.ui.form.Button("", "webfrontend/battleview/neutral/gui/icn_mutants.png").set
						({
							center: true,
							show: "icon",
							alignY: "middle",
							width: 40,
							height: 40,
							toolTipText: "Opens POI Management Tool",
							appearance: "button-text-small"
						});
						poiBtn.addListener("click", this._openPOIWindow, this);
						
						var upgradeBtn = new qx.ui.form.Button("", "FactionUI/icons/icon_mode_upgrade.png").set
						({
							center: true,
							show: "icon",
							alignY: "middle",
							width: 40,
							height: 40,
							toolTipText: "Opens Upgrade Management Tool",
							appearance: "button-text-small"
						});
						upgradeBtn.addListener("click", this._openUpgradeWindow, this);
						
						this.managerPopup = new qx.ui.popup.Popup(new qx.ui.layout.Grid(5)).set({
							width: 150,
							height: 150,
							allowGrowY: false,
							allowGrowX: false,
							padding: 5,
							position: "top-right"
						});
						this.managerPopup.add(scanBtn, {row: 0, column: 0});
						this.managerPopup.add(poiBtn, {row: 0, column: 1});
						this.managerPopup.add(upgradeBtn, {row: 0, column: 2});
						this.managerPopup.setAutoHide(false);
						//this.add(this.managerPopup);
					}
					catch(e)
					{
						console.log("Error initializing TGCTools Class: " + e.toString());
					}
				},
				
				destruct: function()
				{
				},
				
				members: 
				{
					managerBtn: null,
					managerPopup: null,
					
					attachNetEvent: function()
					{
						console.log("Need to assign correct function!");
					},
					
					formatNumbersCompact: function()
					{
						console.log("Need to assign correct function!");
					},
					
					numberWithCommas: function(x)
					{
						var parts = x.toString().split(".");
						parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						return parts.join(".");
					},
					
					/*_transferAllResources: function()
					{
						try
						{
							playerCities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities();
							ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
							ownCityID = ownCity.get_Id();
							
							//playerCities.d contains the city ID's
							for (var cityID in playerCities.d)
							{
								transCity = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(cityID);
								console.log(transCity.get_Name());
								var transID = transCity.get_Id();
								console.log(transID);
								if (transID != ownCityID)
								{
									var tib = Math.round(transCity.GetResourceCount(1) - 0.5);
									console.log("Tiberium: " + tib);
									var cry = Math.round(transCity.GetResourceCount(2) - 0.5);
									console.log("Crystal: " + cry);
									ownCity.SelfTrade(transID, 1, tib); //1 is for tiberium
									ownCity.SelfTrade(transID, 2, cry);
								}
							}
							console.log("Transfer of All Resources Complete");
						}
						catch(e)
						{
							console.log("Error Transferring All Resources to City: " + e.toString());
						}
					},*/
					
					_openScanner: function()
					{
						if (TGCTools.BaseScanner.getInstance().isVisible())
							TGCTools.BaseScanner.getInstance().close();
						else
						{
							TGCTools.BaseScanner.getInstance().open();
							this.managerPopup.hide();
						}
					},
					
					_openPOIWindow: function()
					{
						if (TGCTools.POIWindow.getInstance().isVisible())
						{
							TGCTools.POIWindow.getInstance().close();
						}
						else
						{
							TGCTools.POIWindow.getInstance().open();
							this.managerPopup.hide();
						}
					},
					
					_openUpgradeWindow: function()
					{
						if (TGCTools.UpgradeWindow.getInstance().isVisible())
						{
							TGCTools.UpgradeWindow.getInstance().close();
						}
						else
						{
							TGCTools.UpgradeWindow.getInstance().open();
							this.managerPopup.hide();
						}
					},
					
					_popupManager: function()
					{
						if (this.managerPopup.isVisible())
						{
							this.managerPopup.hide();
						}
						else
						{
							this.managerPopup.placeToWidget(this.managerBtn, false);
							this.managerPopup.show();
						}
					}
				}
			});
			
			qx.Class.define("TGCTools.BaseScanner", 
			{
				type: "singleton",
				extend:	qx.ui.window.Window,
            
				construct: function()
				{
					try
					{
						this.base(arguments);
						this.setLayout(new qx.ui.layout.VBox());
					
						this.set({
							width: 700,
							caption: "Base Scanner",
							padding: 5,
							allowMaximize: false,
							showMaximize: false,
							allowMinimize: false,
							showMinimize: false,	
						});
						
						var scanBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));
						var scanBtn = new qx.ui.form.Button("Scan").set({
							allowGrowY: false,
							width: 60, 
							height: 20,
							toolTipText: "Scans all nearby bases within 20 spaces",
							appearance: "button-text-small"
						});
						
						scanBtn.addListener("click", function()
						{
							var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
							var object = ClientLib.Vis.VisMain.GetInstance().get_SelectedObject();
							ClientLib.Vis.VisMain.GetInstance().set_SelectedObject(object);
							TGCTools.BaseScanner.getInstance()._waitForPlayerCity(ownCity);
						}, this);
						
						stopBtn = new qx.ui.form.Button("Stop").set({
							allowGrowY: false,
							width: 60, 
							height: 20,
							toolTipText: "Stops scan",
							appearance: "button-text-small"
						});
						this.stopScan = false;
						
						stopBtn.addListener("click", this.setStopScan, this);
						stopBtn.setEnabled(false);
						
						//var cityTypeLabel = new qx.ui.basic.Label("City Type:").set({marginLeft: 15, marginRight: 5});
						//cityTypeLabel.setTextColor("white");
						this.cityTypeSelectBox =  new qx.ui.form.SelectBox().set({width: 125, marginBottom: 10});
						this.cityTypeSelectBox.add(new qx.ui.form.ListItem("City Type (All)", null, "0"));
						this.cityTypeSelectBox.add(new qx.ui.form.ListItem("Camp/Outpost Only", null, "1"));
						this.cityTypeSelectBox.add(new qx.ui.form.ListItem("Camp/Outpost/NPC Base", null, "2"));
						this.cityTypeSelectBox.add(new qx.ui.form.ListItem("Camp/Outpost/Player", null, "3"));
						this.cityTypeSelectBox.add(new qx.ui.form.ListItem("NPC Base Only", null, "4"));
						this.cityTypeSelectBox.add(new qx.ui.form.ListItem("NPC Base/Player", null, "5"));
						this.cityTypeSelectBox.add(new qx.ui.form.ListItem("Player Only", null, "6"));
						
						var layoutBtn = new qx.ui.form.Button("Layouts").set({
							allowGrowY: false,
							width: 60, 
							height: 20,
							toolTipText: "Opens new window that displays the layouts of the cities found.",
							appearance: "button-text-small"
						});
						layoutBtn.addListener("click", this._openLayoutWindow, this);
						
						this.distanceSelectBox = new qx.ui.form.SelectBox().set({width: 125, marginBottom: 10});
						
						this.distanceSelectBox.add(new qx.ui.form.ListItem("Distance (All)", null, "0"));
						for (var i = 1; i <= 20; i++)
						{
							var distSelectItem = new qx.ui.form.ListItem("<= " + i + "", null, "" + i + "");
							this.distanceSelectBox.add(distSelectItem);
						}
						
						this.cpCostBox = new qx.ui.form.SelectBox().set({width: 125, marginBottom: 10});
						
						this.cpCostBox.add(new qx.ui.form.ListItem("CP Cost (All)", null, "0"));
						for (var i = 11; i <= 45; i += 2)
						{
							var cpCostItem = new qx.ui.form.ListItem("<= " + i + "", null, "" + i + "");
							this.cpCostBox.add(cpCostItem);
						}
						
						this.layoutSelectBox = new qx.ui.form.SelectBox().set({width: 125, marginBottom: 10});
						var allLayouts =  new qx.ui.form.ListItem("Layout Type (All)", null, "0");
						var moreTib = new qx.ui.form.ListItem("7 Tib / 5 Cry", null, "1");
						var equalTibCry = new qx.ui.form.ListItem("6 Tib / 6 Cry", null, "2");
						var moreCry = new qx.ui.form.ListItem("5 Tib / 7 Cry", null, "3");
						this.layoutSelectBox.add(allLayouts);
						this.layoutSelectBox.add(moreTib);
						this.layoutSelectBox.add(equalTibCry);
						this.layoutSelectBox.add(moreCry);

						scanBox.add(scanBtn);
						scanBox.add(stopBtn);
						scanBox.add(layoutBtn);
						scanBox.add(this.cityTypeSelectBox);
						scanBox.add(this.distanceSelectBox);
						scanBox.add(this.cpCostBox);
						scanBox.add(this.layoutSelectBox);
						
						this.add(scanBox);
						
						this.scanTableModel = new qx.ui.table.model.Simple();
						this.scanTableModel.setColumns(["ID", "Level", "Name", "Owner", "Coords", "Distance", "CP Cost", "Loot/CP", "Total Loot", "Tiberium", "Crystals", "Credits", "RP"]);
						this.scanTable = new qx.ui.table.Table(this.scanTableModel);
						this.scanTable.setColumnWidth(1, 45);
						this.scanTable.setColumnWidth(4, 60);
						this.scanTable.setColumnWidth(5, 65);
						this.scanTable.setColumnWidth(6, 60);
						this.scanTable.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.SINGLE_SELECTION);
						this.scanTable.addListener("cellDblclick", function(evt)
						{
							var row = evt.getRow();
							var id = parseInt(this.scanTableModel.getValueById("ID", row));
							//var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(id);

							ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(id);
							 
							//Set it to the right army layout
							setTimeout(function(){
								webfrontend.gui.UtilView.openVisModeInMainWindow(ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupDefense, id, false);
								var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
								var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
								var formationManager = ownCity.get_CityArmyFormationsManager();
								ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
							}, 1000);
						}, this);
						this.add(this.scanTable);
						
						var scanStatusBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));
						this.scanStatus = new qx.ui.basic.Label("");
						this.scanStatus.setTextColor("white");
						scanStatusBox.add(this.scanStatus);
						
						this.add(scanStatusBox);

						this.resourceInfo = new Array();
						this.gotResources = false;
						this.scannedCities = new Array();
						this.tableData = new Array();
						this.loopCount = 0;
					}
					catch(e)
					{
						console.log("Error initializing TGCTools Class: " + e.toString());
					}
				},
				
				destruct: function()
				{
				},
				
				members: 
				{
					scanTable: null,
					scanTableModel: null,
					scannedCities: null,
					tableData: null,
					scanStatus: null,
					distanceSelectBox: null,
					cpCostBox: null,
					layoutSelectBox: null,
					gotResources: null,
					resourceInfo: null,
					loopCount: null,
					
					_openLayoutWindow:function()
					{
						if (TGCTools.BaseScanner.TerrainLayout.getInstance().isVisible())
						{
							TGCTools.BaseScanner.TerrainLayout.getInstance().close();
						}
						else
						{
							TGCTools.BaseScanner.TerrainLayout.getInstance().open();
							TGCTools.BaseScanner.TerrainLayout.getInstance().getLayouts();
						}
					},
					
					_waitForPlayerCity: function(ownCity)
					{
						stopBtn.setEnabled(true);
						if (ownCity.m_Level <= 0)
						{
							(function(ownCity)
							{
								setTimeout(function() 
								{
									TGCTools.BaseScanner.getInstance()._waitForPlayerCity(ownCity);
								}, 1000);
							}(ownCity));
						}
						else
						{
							this._scanBases(ownCity);
						}
					},
				
					_scanBases: function(ownCity)
					{
						if(this.stopScan == true)
						{
							this.stopScan = false;
							this._getNextScannedCity("stop");
							return;
						}
							
						var count = 0;
						if (this.scannedCities.length > 0)
						{
							this.scannedCities = new Array();
							this.tableData = new Array();
							var numRows = this.scanTableModel.getRowCount();
							
							this.scanTableModel.removeRows(0, numRows, true);
						}
							
						this.scanStatus.setValue("Scanning for Cities - found: " + count);
						//var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						var ownCoordsX = ownCity.get_PosX();
						var ownCoordsY = ownCity.get_PosY();
						var maxDist = this.distanceSelectBox.getSelection()[0].getModel();
						var maxCP = this.cpCostBox.getSelection()[0].getModel();
						var cityType = this.cityTypeSelectBox.getSelection()[0].getModel();
						
						if (maxDist == "0")
							maxDist = 20;
							
						if (maxCP == "0")
							maxCP = 45;
						
						for (var x = -maxDist; x <= maxDist; x++)
						{
							if(this.stopScan == true)
							{
								this.stopScan = false;
								this._getNextScannedCity("stop");
								return;
							}
							for (var y = -maxDist; y <= maxDist; y++)
							{
								if (x == 0 && y == 0) continue;
									
								var scanX = ownCoordsX + x;
								var scanY = ownCoordsY + y;
								var distance = ClientLib.Base.Util.CalculateDistance(ownCoordsX, ownCoordsY, scanX, scanY);
								if(distance > maxDist)
									continue;
								
								var cpCost = ownCity.CalculateAttackCommandPointCostToCoord(scanX, scanY);
								
								if (cpCost > maxCP)
									continue;
								
								var width = ClientLib.Vis.VisMain.GetInstance().get_Region().get_GridWidth();
								var height = ClientLib.Vis.VisMain.GetInstance().get_Region().get_GridHeight();
								
								var object = ClientLib.Vis.VisMain.GetInstance().get_Region().GetObjectFromPosition(scanX * width, scanY * height);
								//ClientLib.Vis.VisMain.GetInstance().get_Region().GetObjectFromPosition(245 * 128, 366 * 96);
								if (object != null)
								{
									cityAttr = {};
									cityAttr.type = object.get_VisObjectType();
									switch(cityAttr.type)
									{
										case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
											cityAttr.name = "Base";
											cityAttr.owner = "Forgotten";
											break;
										case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
											cityAttr.name = "Camp/Outpost";
											cityAttr.owner = "Forgotten";
											break;
										case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
											if (object.IsOwnBase())
												continue;
											cityAttr.name = object.get_Name();
											cityAttr.owner = object.get_PlayerName();
											break;

										default: continue; break;
									}
									
									//Is it a selected type
									if (cityType == 1 && (cityAttr.type == ClientLib.Vis.VisObject.EObjectType.RegionCityType || cityAttr.type == ClientLib.Vis.VisObject.EObjectType.RegionNPCBase))
										continue;
									else if (cityType == 2 && cityAttr.type == ClientLib.Vis.VisObject.EObjectType.RegionCityType)
										continue;
									else if (cityType == 3 && cityAttr.type == ClientLib.Vis.VisObject.EObjectType.RegionNPCBase)
										continue
									else if (cityType == 4 && (cityAttr.type == ClientLib.Vis.VisObject.EObjectType.RegionCityType || cityAttr.type == ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp))
										continue;
									else if (cityType == 5 && cityAttr.type == ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp)
										continue;
									else if (cityType == 6 && (cityAttr.type == ClientLib.Vis.VisObject.EObjectType.RegionNPCBase || cityAttr.type == ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp))
										continue;
									
									if (object.get_ConditionDefense() == 0)
										continue;
									count++;
									this.scanStatus.setValue("Scanning for Cities - found: " + count);
									cityAttr.id = object.get_Id();
									
									cityAttr.level = object.get_BaseLevel();
									cityAttr.coords = scanX + ":" + scanY;
									cityAttr.distance = distance;
									cityAttr.cp = cpCost;
									this.scannedCities.push(cityAttr);
								}
							}
						}
						
						this.scanIdx = 0;
						this._getScannedCityData();
					},
					
					_getScannedCityData: function()
					{
						if (this.scannedCities.length == 0)
							return;
							
						if(this.stopScan == true)
						{
							this.stopScan = false;
							this._getNextScannedCity("stop");
							return;
						}	

						this.scanStatus.setValue("Retrieving City Information: (" + (this.scanIdx + 1) + " of " + this.scannedCities.length + ")");						
						var cityID = this.scannedCities[this.scanIdx].id;
					
						//Select Current Base
						ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(cityID);
						var thisCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
						var thisVisCity =  ClientLib.Vis.VisMain.GetInstance().get_City();
						
						this.loopCount = 0;
						this._waitForCity(thisCity, thisVisCity);
					},
					
					_waitForCity: function(city, visCity)
					{
						if(this.stopScan == true)
						{
							this.stopScan = false;
							this._getNextScannedCity("stop");
							return;
						}
						
						if ((visCity.get_CurrentCityId() <= 0 || city.m_Level <= 0) && this.loopCount <= 10)
						{
							this.loopCount++;
							(function(city, visCity) 
							{
								setTimeout(function() 
								{
									TGCTools.BaseScanner.getInstance()._waitForCity(city, visCity);
								}, 1000);
							}(city, visCity));
						}
						else if (this.loopCount > 10)
						{
							this._getNextScannedCity();
							return;
						}
						else
						{
							this.resourceInfo = this.getCityResourcesAndLayout(city, visCity);
							this._waitForResources(city, visCity);
						}
					},
					
					_waitForResources: function(city, visCity)
					{
						if(this.stopScan == true)
						{
							this.stopScan = false;
							this._getNextScannedCity("stop");
							return;
						}
						
						if (this.gotResources == false)
						{
							(function(city, visCity) 
							{
								setTimeout(function() 
								{
									TGCTools.BaseScanner.getInstance()._waitForResources(city, visCity);
								}, 1000);
							}(city, visCity));
						}
						else
						{
							this.gotResources = false;
							this._scannedCityInfo(city, visCity);
						}
					},
					
					_scannedCityInfo: function(city, visCity)
					{
						if(this.stopScan == true)
						{
							this.stopScan = false;
							this._getNextScannedCity("stop");
							return;
						}
						
						var cityObj = this.scannedCities;
						idx = this.scanIdx;
						var info = this.resourceInfo;
						
						var layoutType = parseInt(this.layoutSelectBox.getSelection()[0].getModel());
						if (layoutType == 1 && (info.tibCount != 7 && info.cryCount != 5))
						{
							this._getNextScannedCity();
							return;
						}
						else if (layoutType == 2 && (info.tibCount != 6 || info.cryCount != 6))
						{
							this._getNextScannedCity();
							return;
						}
						else if (layoutType == 3 && (info.tibCount != 5 || info.cryCount != 7))
						{
							this._getNextScannedCity();
							return;
						}

						cityData = {};
						cityData.scanInfo = cityObj[idx];
						cityData.loot = info.loot;
						cityData.layout = info.layout;
						
						var totalLoot = info.loot[1] + info.loot[2] + info.loot[3] + info.loot[6];
						var lootPerCP = totalLoot / cityObj[idx].cp;
			
						this.tableData.push(cityData); //Important
						this.scanTableModel.addRows([[cityObj[idx].id.toString(), cityObj[idx].level, cityObj[idx].name, cityObj[idx].owner, cityObj[idx].coords, cityObj[idx].distance, cityObj[idx].cp, lootPerCP, totalLoot, info.loot[1], info.loot[2], info.loot[3], info.loot[6]]]);
						this._getNextScannedCity();
					},
					
					_getNextScannedCity: function(status)
					{
						this.scanIdx++;
						if (this.scanIdx != this.scannedCities.length && typeof status == 'undefined')
							this._getScannedCityData();
						else
						{
							this.scanStatus.setValue("Scan Complete: Showing " + this.tableData.length + " results.");	
							stopBtn.setEnabled(false);
						}
					},
					
					getCityResourcesAndLayout: function(city, visCity)
					{
						try
						{  
                            //Pretty sure we just need the EResourceType
                            var lootArray = {1: 0, 2: 0, 3: 0, 6: 0}; //1: Tib, 2: Cry, 3: Gold(credits) 6: RP
							var info = new Array();
							var layout = new Array();
							var tibCount = 0;
							var cryCount = 0;
                            var mod = 0;
                            for (var x = 0; x < 9; x++)
							{
								if(this.stopScan == true)
								{
									this.stopScan = false;
									this._getNextScannedCity("stop");
									return;
								}
                                for (var y = 0; y < 8; y++)
                                {
									
									var field = {};
									var fieldType = city.GetResourceType(x ,y);
									field.type = fieldType;
									field.x = x;
									field.y = y;
									
									layout.push(field);

									if (fieldType == ClientLib.Data.ECityTerrainType.CRYSTAL)
										cryCount++;
									else if (fieldType == ClientLib.Data.ECityTerrainType.TIBERIUM)
										tibCount++;

                                	var width =  visCity.get_GridWidth();
                                	var height =  visCity.get_GridHeight();
                                
                               		var cityEntity = visCity.GetObjectFromPosition(x * width, y * height);
                                    
                                    if (cityEntity != null && cityEntity.get_CityEntity() !== null)
                                    {
                                        var buildingDetails = cityEntity.get_BuildingDetails();		
										mod = buildingDetails.get_HitpointsPercent();
                                        var reqs = buildingDetails.get_UnitLevelRepairRequirements();
										
										for (var idx2 = 0; idx2 < reqs.length; idx2++)
										{
											var type = reqs[idx2].Type;
											var count = reqs[idx2].Count;
											lootArray[type] += Math.round((mod * count) - 0.5); //Rounding otherwise floating numbers
										}
                                    }							
                                    
                                    //Now do the same for defense units
                                    var defEntity = ClientLib.Vis.VisMain.GetInstance().get_DefenseSetup().GetDefenseObjectFromPosition(x * width, y * height);
                                    if (defEntity !== null && defEntity.get_CityEntity() !== null) 
                                    {
                                        var unitDetails = defEntity.get_UnitDetails();	
                                        mod = unitDetails.get_HitpointsPercent();	
                                        var reqs = unitDetails.get_UnitLevelRepairRequirements();
										
										for (var idx2 = 0; idx2 < reqs.length; idx2++)
										{
											var type = reqs[idx2].Type;
											var count = reqs[idx2].Count;
											lootArray[type] += Math.round((mod * count) - 0.5); //Rounding otherwise floating numbers
										}
                                    }
                                }
                            }
							
							var infoProps = {};
							info.loot = lootArray;
							info.layout = layout;

							info.tibCount = tibCount;
							info.cryCount = cryCount;
							info.push(infoProps);
							this.gotResources = true;
							return info;
						}
						catch(e)
						{
							console.log(e.toString());
						}
					},
					
					getTableData: function()
					{
						return this.tableData;
					},
					
					setStopScan: function()
					{
						this.stopScan = true;
					}
					
					//_getTableSelection: function()
					//{
					//	this.scanTable.getSelection()
					//}
				}
			});
			
			qx.Class.define("TGCTools.BaseScanner.TerrainLayout", 
			{
				type: "singleton",
				extend:	qx.ui.window.Window,
            
				construct: function()
				{
					try
					{
						this.base(arguments);
						this.setLayout(new qx.ui.layout.VBox());
					
						this.set({
							width: 600,
							caption: "City Layouts",
							padding: 5,
							allowMaximize: false,
							showMaximize: false,
							allowMinimize: false,
							showMinimize: false,	
						});
						
						this.resourceImages = new Array();
						this.resourceImages[0] = "webfrontend/ui/common/icn_res_tiberium.png";
						this.resourceImages[1] = "webfrontend/ui/common/icn_res_chrystal.png";
						
						this.scroll = new qx.ui.container.Scroll().set({
							width: 300,
							height: 240
						});
						
					}
					catch(e)
					{
						console.log(e.toString());
					}
				},
				
				destruct: function()
				{
				},
				
				members: 
				{
					resourceImages: null,
					scroll: null,
					
					getLayouts: function()
					{
						var tableData = TGCTools.BaseScanner.getInstance().getTableData();
						var layoutBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));

						for (var i = 0; i < tableData.length; i++)
						{	
							var cityGrid = new qx.ui.container.Composite();
							var cityGridLayout = new qx.ui.layout.Grid(5);
							cityGridLayout.setColumnMinWidth(0, 25);
							cityGridLayout.setColumnMinWidth(1, 25);
							cityGridLayout.setColumnMinWidth(2, 25);
							cityGridLayout.setColumnMinWidth(3, 25);
							cityGridLayout.setColumnMinWidth(4, 25);
							cityGridLayout.setColumnMinWidth(5, 25);
							cityGridLayout.setColumnMinWidth(6, 25);
							cityGridLayout.setColumnMinWidth(7, 25);
							cityGridLayout.setColumnMinWidth(8, 25);
							cityGridLayout.setRowMinHeight(0, 25);
							cityGridLayout.setRowMinHeight(1, 25);
							cityGridLayout.setRowMinHeight(2, 25);
							cityGridLayout.setRowMinHeight(3, 25);
							cityGridLayout.setRowMinHeight(4, 25);
							cityGridLayout.setRowMinHeight(5, 25);
							cityGridLayout.setRowMinHeight(6, 25);
							cityGridLayout.setRowMinHeight(7, 25);
							cityGrid.setLayout(cityGridLayout);
							var cityType = tableData[i].scanInfo.type;

							switch(cityType)
							{
								case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
									cityGrid.setBackgroundColor("darkred");
									cityGrid.setOpacity(0.7);
									break;
								case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
									cityGrid.setBackgroundColor("darkblue");
									cityGrid.setOpacity(0.7);
									break;
								case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
									cityGrid.setBackgroundColor("darkgreen");
									cityGrid.setOpacity(0.7);
									break;
							}
							
							cityGrid.setToolTipText("Level " + tableData[i].scanInfo.level + " " + tableData[i].scanInfo.name + " @ " + tableData[i].scanInfo.coords);
							//for (var x = 0; x < 9; x++)
							//{
								//for (var y = 0; y < 8; y++)
								//{
								for (var j = 0; j < tableData[i].layout.length; j++)
								{
									var fieldType = tableData[i].layout[j].type;
									var cell = new qx.ui.basic.Image();
									var x = tableData[i].layout[j].x;
									var y = tableData[i].layout[j].y;
									
									switch(fieldType)
									{
										case ClientLib.Data.ECityTerrainType.CRYSTAL:
											cell.setSource(this.resourceImages[1]);
											break;
										case ClientLib.Data.ECityTerrainType.TIBERIUM:
											cell.setSource(this.resourceImages[0]);
											break;	
									}
									cityGrid.add(cell, {row: y, column: x});
								}
							//}
							layoutBox.add(cityGrid);
						}
						this.scroll.add(layoutBox);
						this.add(this.scroll);
					}
				}
			});	

			qx.Class.define("TGCTools.POIWindow", 
			{
				type: "singleton",
				extend:	qx.ui.window.Window,
            
				construct: function()
				{	
					try
					{
						this.base(arguments);
						this.setLayout(new qx.ui.layout.VBox(5));
					
						this.set({
							width: 725,
							caption: "POI Management Tool",
							padding: 5,
							allowMaximize: false,
							showMaximize: false,
							allowMinimize: false,
							showMinimize: false,	
						});
					
						//POI Struct
						this.poiData = 
						{
							labels:
							{
								total:
								{
									score: new qx.ui.basic.Label("Total Score: "),
									qty: new qx.ui.basic.Label("Total Quantity: "),
									bonus: new qx.ui.basic.Label("Total Bonus: "),
									nextTier: new qx.ui.basic.Label("To Next Tier: "),
									nextRank: new qx.ui.basic.Label("To Next Rank: "),
								},
								
								tier:
								{
									tier: new qx.ui.basic.Label("Tiers").set({textColor: "black"}),
									prev: new qx.ui.basic.Label("Previous:").set({textColor: "red"}),
									curr: new qx.ui.basic.Label("Current:").set({textColor: "blue"}),
									next: new qx.ui.basic.Label("Next:").set({textColor: "green"}),
									
									lower: new qx.ui.basic.Label("Lower").set({textColor: "black"}),
									upper: new qx.ui.basic.Label("Upper").set({textColor: "black"}),
									bonus: new qx.ui.basic.Label("Bonus").set({textColor: "black"}),
									diff:  new qx.ui.basic.Label("Diff +/-").set({textColor: "black"}),
								},
							
								rank:
								{
									rank: new qx.ui.basic.Label("Rankings").set({textColor: "black"}),
									prev: new qx.ui.basic.Label("Previous:").set({textColor: "red"}),
									curr: new qx.ui.basic.Label("Current:").set({textColor: "blue"}),
									next: new qx.ui.basic.Label("Next:").set({textColor: "green"}),
									
									alliance: new qx.ui.basic.Label("Alliance").set({textColor: "black"}),
									score: new qx.ui.basic.Label("Score").set({textColor: "black"}),
									multi: new qx.ui.basic.Label("Multiplier").set({textColor: "black"}),
									diff: new qx.ui.basic.Label("Diff +/-").set({textColor: "black"}),
								},
								
								simulation:
								{
									sim: new qx.ui.basic.Label("Simulation").set({textColor: "black"}),
									prev: new qx.ui.basic.Label("Previous:").set({textColor: "red"}),
									curr: new qx.ui.basic.Label("Current:").set({textColor: "blue"}),
									
									score: new qx.ui.basic.Label("Score").set({textColor: "black"}),
									bonus: new qx.ui.basic.Label("Bonus").set({textColor: "black"}),
									multi: new qx.ui.basic.Label("Multiplier").set({textColor: "black"}),
									totalBonus: new qx.ui.basic.Label("Total Bonus").set({textColor: "black"}),
								},
							},
							
							counts:
							{
								total:
								{
									score: new qx.ui.basic.Label("0"),
									qty: new qx.ui.basic.Label("0"),
									bonus: new qx.ui.basic.Label("0"),
									nextTier: new qx.ui.basic.Label("0"),
									nextRank: new qx.ui.basic.Label("0"),
								},
								
								tier:
								{
									prev:
									{
										lower: new qx.ui.basic.Label("0").set({textColor: "red"}),
										upper: new qx.ui.basic.Label("0").set({textColor: "red"}),
										bonus: new qx.ui.basic.Label("0").set({textColor: "red"}),
										diff: new qx.ui.basic.Label("0").set({textColor: "red"}),
									},
									
									curr:
									{
										lower: new qx.ui.basic.Label("0").set({textColor: "blue"}),
										upper: new qx.ui.basic.Label("0").set({textColor: "blue"}),
										bonus: new qx.ui.basic.Label("0").set({textColor: "blue"}),
										diff: new qx.ui.basic.Label("0").set({textColor: "blue"}),
									},
									
									next:
									{
										lower: new qx.ui.basic.Label("0").set({textColor: "darkgreen"}),
										upper: new qx.ui.basic.Label("0").set({textColor: "darkgreen"}),
										bonus: new qx.ui.basic.Label("0").set({textColor: "darkgreen"}),
										diff: new qx.ui.basic.Label("0").set({textColor: "darkgreen"}),
									},
								},
								
								rank:
								{
									prev:
									{
										alliance: new qx.ui.basic.Label("N/A").set({textColor: "red"}),
										score: new qx.ui.basic.Label("0").set({textColor: "red"}),
										multi: new qx.ui.basic.Label("0").set({textColor: "red"}),
										diff: new qx.ui.basic.Label("0").set({textColor: "red"}),
									},
									
									curr:
									{
										alliance: new qx.ui.basic.Label("N/A").set({textColor: "blue"}),
										score: new qx.ui.basic.Label("0").set({textColor: "blue"}),
										multi: new qx.ui.basic.Label("0").set({textColor: "blue"}),
										diff: new qx.ui.basic.Label("0").set({textColor: "blue"}),
									},
									
									next:
									{
										alliance: new qx.ui.basic.Label("N/A").set({textColor: "darkgreen"}),
										score: new qx.ui.basic.Label("0").set({textColor: "darkgreen"}),
										multi: new qx.ui.basic.Label("0").set({textColor: "darkgreen"}),
										diff: new qx.ui.basic.Label("0").set({textColor: "darkgreen"}),
									},
								},
								
								simulation:
								{
									prev:
									{
										score: new qx.ui.basic.Label("0").set({textColor: "red"}),
										bonus: new qx.ui.basic.Label("0").set({textColor: "red"}),
										multi: new qx.ui.basic.Label("0").set({textColor: "red"}),
										totalBonus: new qx.ui.basic.Label("0").set({textColor: "red"}),
									},
									
									curr:
									{
										score: new qx.ui.basic.Label("0").set({textColor: "blue"}),
										bonus: new qx.ui.basic.Label("0").set({textColor: "blue"}),
										multi: new qx.ui.basic.Label("0").set({textColor: "blue"}),
										totalBonus: new qx.ui.basic.Label("0").set({textColor: "blue"}),
									},
								},
							},
						};	

						//POI Table Box
						var tableBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({allowGrowY: false});
						this.tableModel = new qx.ui.table.model.Simple();	
						this.tableModel.setColumns(["Level", "Coords", "Score", "Loss", "Tier", "Rank"]);
						this.table = new qx.ui.table.Table(this.tableModel).set({height: 300, allowGrowX: false, width: 625, alignX: "center"});
						this.table.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION);
						this.table.setColumnVisibilityButtonVisible(false);
						this.table.addListener("cellDblclick", function(evt) {this.showPOILocation(evt);}, this);
						this.table.setToolTipText("Displays POI Data for selected POI Type. To go to a POI Location, double-click the intended row."); 
						tableBox.add(this.table);
						
						//POI Total Stats
						var totalStatsBox1 = new qx.ui.container.Composite(new qx.ui.layout.HBox(2)).set({alignX: "center", allowGrowX: false, allowGrowY: false});
						var totalStatsBox2 = new qx.ui.container.Composite(new qx.ui.layout.HBox(2)).set({alignX: "center", allowGrowX: false, allowGrowY: false});
						this.poiData["labels"]["total"].score.setThemedFont("bold");
						this.poiData["labels"]["total"].qty.setThemedFont("bold");
						this.poiData["labels"]["total"].bonus.setThemedFont("bold");
						this.poiData["labels"]["total"].nextTier.setThemedFont("bold");
						this.poiData["labels"]["total"].nextRank.setThemedFont("bold");
						totalStatsBox1.add(this.poiData["labels"]["total"].score);
						totalStatsBox1.add(this.poiData["counts"]["total"].score);
						totalStatsBox1.add(this.poiData["labels"]["total"].qty);
						totalStatsBox1.add(this.poiData["counts"]["total"].qty);
						totalStatsBox1.add(this.poiData["labels"]["total"].bonus);
						totalStatsBox1.add(this.poiData["counts"]["total"].bonus);
						totalStatsBox2.add(this.poiData["labels"]["total"].nextTier);
						totalStatsBox2.add(this.poiData["counts"]["total"].nextTier);
						totalStatsBox2.add(this.poiData["labels"]["total"].nextRank);
						totalStatsBox2.add(this.poiData["counts"]["total"].nextRank);
						
						//POI Current Stats
						var currStatsLayout = new qx.ui.layout.Grid(5).set({spacingX: 20, spacingY: 5});
						var currStatsBox = new qx.ui.container.Composite(currStatsLayout).set({allowGrowX: false, allowGrowY: false, alignX: "center"});
						this.poiData["labels"]["tier"].tier.setThemedFont("bold");
						this.poiData["labels"]["tier"].prev.setThemedFont("bold");
						this.poiData["labels"]["tier"].curr.setThemedFont("bold");
						this.poiData["labels"]["tier"].next.setThemedFont("bold");
						this.poiData["labels"]["tier"].lower.setThemedFont("bold");
						this.poiData["labels"]["tier"].upper.setThemedFont("bold");
						this.poiData["labels"]["tier"].bonus.setThemedFont("bold");
						this.poiData["labels"]["tier"].diff.setThemedFont("bold");
						
						this.poiData["labels"]["rank"].rank.setThemedFont("bold");
						this.poiData["labels"]["rank"].prev.setThemedFont("bold");
						this.poiData["labels"]["rank"].curr.setThemedFont("bold");
						this.poiData["labels"]["rank"].next.setThemedFont("bold");
						this.poiData["labels"]["rank"].alliance.setThemedFont("bold");
						this.poiData["labels"]["rank"].score.setThemedFont("bold");
						this.poiData["labels"]["rank"].multi.setThemedFont("bold");
						this.poiData["labels"]["rank"].diff.setThemedFont("bold");
						
						this.poiData["labels"]["simulation"].sim.setThemedFont("bold");
						this.poiData["labels"]["simulation"].prev.setThemedFont("bold");
						this.poiData["labels"]["simulation"].curr.setThemedFont("bold");
						this.poiData["labels"]["simulation"].score.setThemedFont("bold");
						this.poiData["labels"]["simulation"].bonus.setThemedFont("bold");
						this.poiData["labels"]["simulation"].multi.setThemedFont("bold");
						this.poiData["labels"]["simulation"].totalBonus.setThemedFont("bold");
						
						this.poiData["labels"]["tier"].tier.set({alignX: "center", font: "font_size_14_bold"});
						currStatsBox.add(this.poiData["labels"]["tier"].tier, {row: 0, column: 0, colSpan: 5});
						
						//Labels
						currStatsBox.add(this.poiData["labels"]["tier"].prev, {row: 2, column: 0});
						currStatsBox.add(this.poiData["labels"]["tier"].curr, {row: 3, column: 0});
						currStatsBox.add(this.poiData["labels"]["tier"].next, {row: 4, column: 0});
						currStatsBox.add(this.poiData["labels"]["tier"].lower, {row: 1, column: 1});
						currStatsBox.add(this.poiData["labels"]["tier"].upper, {row: 1, column: 2});
						currStatsBox.add(this.poiData["labels"]["tier"].bonus, {row: 1, column: 3});
						currStatsBox.add(this.poiData["labels"]["tier"].diff, {row: 1, column: 4});
						
						this.poiData["labels"]["rank"].rank.set({alignX: "center", font: "font_size_14_bold"});
						currStatsBox.add(this.poiData["labels"]["rank"].rank, {row: 5, column: 0, colSpan: 5});
						currStatsBox.add(this.poiData["labels"]["rank"].prev, {row: 7, column: 0});
						currStatsBox.add(this.poiData["labels"]["rank"].curr, {row: 8, column: 0});
						currStatsBox.add(this.poiData["labels"]["rank"].next, {row: 9, column: 0});
						currStatsBox.add(this.poiData["labels"]["rank"].alliance, {row: 6, column: 1});
						currStatsBox.add(this.poiData["labels"]["rank"].score, {row: 6, column: 2});
						currStatsBox.add(this.poiData["labels"]["rank"].multi, {row: 6, column: 3});
						currStatsBox.add(this.poiData["labels"]["rank"].diff, {row: 6, column: 4});
						
						this.poiData["labels"]["simulation"].sim.set({alignX: "center", font: "font_size_14_bold"});
						currStatsBox.add(this.poiData["labels"]["simulation"].sim, {row: 10, column: 0, colSpan: 5});
						currStatsBox.add(this.poiData["labels"]["simulation"].prev, {row: 12, column: 0});
						currStatsBox.add(this.poiData["labels"]["simulation"].curr, {row: 13, column: 0});
						currStatsBox.add(this.poiData["labels"]["simulation"].score, {row: 11, column: 1});
						currStatsBox.add(this.poiData["labels"]["simulation"].bonus, {row: 11, column: 2});
						currStatsBox.add(this.poiData["labels"]["simulation"].multi, {row: 11, column: 3});
						currStatsBox.add(this.poiData["labels"]["simulation"].totalBonus, {row: 11, column: 4});
						
						//Counts
						currStatsBox.add(this.poiData["counts"]["tier"]["prev"].lower, {row: 2, column: 1});
						currStatsBox.add(this.poiData["counts"]["tier"]["prev"].upper, {row: 2, column: 2});
						currStatsBox.add(this.poiData["counts"]["tier"]["prev"].bonus, {row: 2, column: 3});
						currStatsBox.add(this.poiData["counts"]["tier"]["prev"].diff, {row: 2, column: 4});
						currStatsBox.add(this.poiData["counts"]["tier"]["curr"].lower, {row: 3, column: 1});
						currStatsBox.add(this.poiData["counts"]["tier"]["curr"].upper, {row: 3, column: 2});
						currStatsBox.add(this.poiData["counts"]["tier"]["curr"].bonus, {row: 3, column: 3});
						currStatsBox.add(this.poiData["counts"]["tier"]["curr"].diff, {row: 3, column: 4});
						currStatsBox.add(this.poiData["counts"]["tier"]["next"].lower, {row: 4, column: 1});
						currStatsBox.add(this.poiData["counts"]["tier"]["next"].upper, {row: 4, column: 2});
						currStatsBox.add(this.poiData["counts"]["tier"]["next"].bonus, {row: 4, column: 3});
						currStatsBox.add(this.poiData["counts"]["tier"]["next"].diff, {row: 4, column: 4});
						
						currStatsBox.add(this.poiData["counts"]["rank"]["prev"].alliance, {row: 7, column: 1});
						currStatsBox.add(this.poiData["counts"]["rank"]["prev"].score, {row: 7, column: 2});
						currStatsBox.add(this.poiData["counts"]["rank"]["prev"].multi, {row: 7, column: 3});
						currStatsBox.add(this.poiData["counts"]["rank"]["prev"].diff, {row: 7, column: 4});
						currStatsBox.add(this.poiData["counts"]["rank"]["curr"].alliance, {row: 8, column: 1});
						currStatsBox.add(this.poiData["counts"]["rank"]["curr"].score, {row: 8, column: 2});
						currStatsBox.add(this.poiData["counts"]["rank"]["curr"].multi, {row: 8, column: 3});
						currStatsBox.add(this.poiData["counts"]["rank"]["curr"].diff, {row: 8, column: 4});
						currStatsBox.add(this.poiData["counts"]["rank"]["next"].alliance, {row: 9, column: 1});
						currStatsBox.add(this.poiData["counts"]["rank"]["next"].score, {row: 9, column: 2});
						currStatsBox.add(this.poiData["counts"]["rank"]["next"].multi, {row: 9, column: 3});
						currStatsBox.add(this.poiData["counts"]["rank"]["next"].diff, {row: 9, column: 4});
						
						currStatsBox.add(this.poiData["counts"]["simulation"]["prev"].score, {row: 12, column: 1});
						currStatsBox.add(this.poiData["counts"]["simulation"]["prev"].bonus, {row: 12, column: 2});
						currStatsBox.add(this.poiData["counts"]["simulation"]["prev"].multi, {row: 12, column: 3});
						currStatsBox.add(this.poiData["counts"]["simulation"]["prev"].totalBonus, {row: 12, column: 4});
						currStatsBox.add(this.poiData["counts"]["simulation"]["curr"].score, {row: 13, column: 1});
						currStatsBox.add(this.poiData["counts"]["simulation"]["curr"].bonus, {row: 13, column: 2});
						currStatsBox.add(this.poiData["counts"]["simulation"]["curr"].multi, {row: 13, column: 3});
						currStatsBox.add(this.poiData["counts"]["simulation"]["curr"].totalBonus, {row: 13, column: 4});
						
						//Buttons
						var buttonBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({allowGrowX: false, allowGrowY: false, alignX: "center"});
						this.selectBox = new qx.ui.form.SelectBox();
						this.selectBox.add(new qx.ui.form.ListItem("Tiberium", "webfrontend/ui/common/icn_res_tiberium.png", "4"));
						this.selectBox.add(new qx.ui.form.ListItem("Crystal", "webfrontend/ui/common/icn_res_chrystal.png", "5"));
						this.selectBox.add(new qx.ui.form.ListItem("Reactor", "webfrontend/ui/common/icn_res_power.png", "6"));
						this.selectBox.add(new qx.ui.form.ListItem("Tungsten", "FactionUI/icons/icon_alliance_bonus_inf.png", "7"));
						this.selectBox.add(new qx.ui.form.ListItem("Uranium", "FactionUI/icons/icon_alliance_bonus_tnk.png", "8"));
						this.selectBox.add(new qx.ui.form.ListItem("Aircraft", "FactionUI/icons/icon_alliance_bonus_air.png", "9"));
						this.selectBox.add(new qx.ui.form.ListItem("Resonator", "FactionUI/icons/icon_def_army_points.png", "10"));
						this.selectBox.setToolTipText("Choose a POI Type you want to view.");
						
						this.selectBox.addListener("changeSelection", function(e) {
							var numRows = TGCTools.POIWindow.getInstance().tableModel.getRowCount();
							TGCTools.POIWindow.getInstance().tableModel.removeRows(0, numRows, true);
						});
						
						var updateBtn = new qx.ui.form.Button("Update").set({height: 35, allowGrowX: false, allowGrowY: false, alignX: "center", rich: true});
						var simulateBtn = new qx.ui.form.Button("Simulate").set({height: 35, allowGrowX: false, allowGrowY: false, alignX: "center", rich: true});
						var listBtn = new qx.ui.form.Button("Add to List").set({height: 35, allowGrowX: false, allowGrowY: false, alignX: "center", rich: true});
						updateBtn.setToolTipText("Updates the table below with <br />POI's from selected POI type.");
						simulateBtn.setToolTipText("Simulates releasing selected POI's. <br /> To select multiple POI's hold ctrl and click on a row.");
						listBtn.setToolTipText("Add selected POIs to list for pasting into message. <br />For each POI you can copy the selected POIs. <br />" + 
						"Each time you click the button for the same POI, <br /> it rewrites the data for that POI type. <br /><br />To paste the message, hit Alt-L. <br /> To clear the list, hit Alt-C.");
						simulateBtn.addListener("click", function()
						{
							var selection = this.getPOISelection();
							this.currPOIType = selection - 2;

							this.isSimulation = true;
							this.getRankingData(selection);
							this.doSimulation();
						}, this);
						simulateBtn.setEnabled(false);
						
						updateBtn.addListener("click", function() 
						{
							var numRows = this.tableModel.getRowCount();
							this.tableModel.removeRows(0, numRows, true);
							var selection = this.getPOISelection();
							this.currPOIType = selection - 2;

							this.isSimulation = false;
							simulateBtn.setEnabled(true);
							this.getRankingData(selection);
						}, this);
						listBtn.addListener("click", this.addToList, this);
						
						//For copying POI List for messaging
						addEventListener("keyup", this.onKeyPress, false);
						
						buttonBox.add(this.selectBox);
						buttonBox.add(updateBtn);
						buttonBox.add(simulateBtn);
						buttonBox.add(listBtn);
						
						var poiContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({allowGrowY: false, alignX: "center", decorator: "main", padding: 5});
						poiContainer.setBackgroundColor("lightgray");
						poiContainer.add(totalStatsBox1);
						poiContainer.add(totalStatsBox2);
						poiContainer.add(currStatsBox);
						poiContainer.add(buttonBox);
						poiContainer.add(tableBox);
						
						var scrollBox = new qx.ui.container.Scroll().set({
							width: 725,
							height: 600
						});
						scrollBox.add(poiContainer);
						this.add(scrollBox);
						
						this.rankingData = new Array();
						this.msgList = {4: "", 5: "", 6: "", 7: "", 8: "", 9: "", 10: ""};
						this.__ranking = new ClientLib.Data.Ranking.Ranking();
						phe.cnc.Util.attachNetEvent(this.__ranking, "FireReceivedCount", ClientLib.Data.Ranking.RankingReceivedCount, this, this.__onRankingReceivedCount);
						phe.cnc.Util.attachNetEvent(this.__ranking, "FireReceivedData", ClientLib.Data.Ranking.RankingReceivedData, this, this.__onRankingReceivedData);
					}
					catch(e)
					{
						console.log("Failed POIWindow Constructor: " + e.toString());
					}
				},
				
				destruct: function()
				{
				},
				
				members:
				{
					__ranking: null,
					rankingData: null,
					currPOIType: null,
					isSimulation: null,
					msgList: null,
					
					getPOISelection: function()
					{
						var selection = parseInt(this.selectBox.getSelection()[0].getModel());
						return selection;
					},
					
					updatePOIList: function()
					{
						if (this.isSimulation)
							return;
							
						var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
						var allianceID = alliance.get_Id();
						var alliancePOIList = alliance.get_OwnedPOIs();
						var poiList = [];
						var totalScore = 0;
						var baseValue = 0;
						
						//Grab the POIs under the current selected type
						for (var idx in alliancePOIList)
						{
							if (alliancePOIList[idx].t == this.currPOIType)
							{
								poiList.push(alliancePOIList[idx]);
							}
						}
						
						poiList = this.sortPOIList(poiList);
						
						//Get Total Score
						totalScore = this.getTotalScore(allianceID);
						var rankData = this.getRankMultiplier(allianceID);
						baseValue = this.getBaseValue(totalScore);
						
						this.calculatePOIData(poiList, totalScore, rankData, baseValue);
						this.updatePOIStats(poiList, totalScore, rankData, baseValue);
					},
					
					updatePOIStats: function(poiList, totalScore, rankData, baseValue)
					{
						//Totals
						//totalScore passed in
						var totalQty = poiList.length;
						var totalBonus = baseValue * (1 + (rankData.multiplier / 100));
						var toNextTier = ClientLib.Base.PointOfInterestTypes.GetNextScore(totalScore) - totalScore;
						
						if (rankData.rank == 1)
							var toNextRank = "N/A";
						else
							var toNextRank = this.getRankScore(rankData.rank-1) - totalScore;
							
						//Tiers	
						var prevUpper = this.getTierLowerBound(totalScore) - 1;
						var prevLower = this.getTierLowerBound(prevUpper); //hack
						var prevBonus = this.getBaseValue(prevUpper); //upper or lower works
						
						var currLower = this.getTierLowerBound(totalScore);
						var currUpper = ClientLib.Base.PointOfInterestTypes.GetNextScore(totalScore) - 1;
						var currBonus = this.getBaseValue(totalScore);
						
						var nextLower = currUpper + 1;
						var nextUpper = ClientLib.Base.PointOfInterestTypes.GetNextScore(nextLower) - 1;
						var nextBonus = this.getBaseValue(nextLower);
						
						var prevDiff = currBonus - prevBonus;
						var currDiff = 0;
						var nextDiff = nextBonus - currBonus;
						
						//Ranks
						var prevAlliance = this.getAllianceName(rankData.rank+1);
						var prevScore = this.getRankScore(rankData.rank+1);
						var prevMulti =  ClientLib.Base.PointOfInterestTypes.GetBoostModifierByRank(rankData.rank+1);
						
						var currAlliance = this.getAllianceName(rankData.rank);
						var currScore = totalScore;
						var currMulti = rankData.multiplier;
						var currRankDiff = 0;
						if (rankData.rank == 1)
						{
							var nextAlliance = "N/A";
							var nextScore = "N/A";
							var nextMulti = "N/A";
							var nextRankDiff = "N/A";
						}
						else
						{
							var nextAlliance = this.getAllianceName(rankData.rank-1);
							var nextScore = this.getRankScore(rankData.rank-1);
							var nextMulti =  ClientLib.Base.PointOfInterestTypes.GetBoostModifierByRank(rankData.rank-1);
							var nextRankDiff = nextScore - currScore;
						}
						var prevRankDiff = currScore - prevScore;
						
						//Set Values
						//Total
						this.poiData["counts"]["total"].score.setValue(TGCTools.getInstance().numberWithCommas(totalScore));
						this.poiData["counts"]["total"].qty.setValue(TGCTools.getInstance().numberWithCommas(totalQty));
						if (this.currPOIType < 5)
							this.poiData["counts"]["total"].bonus.setValue(TGCTools.getInstance().numberWithCommas(totalBonus) + "/hr");
						else
							this.poiData["counts"]["total"].bonus.setValue(totalBonus + "%");
						this.poiData["counts"]["total"].nextTier.setValue(TGCTools.getInstance().numberWithCommas(toNextTier));
						if (rankData.rank != 1)
							this.poiData["counts"]["total"].nextRank.setValue(TGCTools.getInstance().numberWithCommas(toNextRank));
						else
							this.poiData["counts"]["total"].nextRank.setValue(toNextRank);
						
						//Tiers
						this.poiData["counts"]["tier"]["prev"].lower.setValue(TGCTools.getInstance().numberWithCommas(prevLower));
						this.poiData["counts"]["tier"]["prev"].upper.setValue(TGCTools.getInstance().numberWithCommas(prevUpper));
						this.poiData["counts"]["tier"]["curr"].lower.setValue(TGCTools.getInstance().numberWithCommas(currLower));
						this.poiData["counts"]["tier"]["curr"].upper.setValue(TGCTools.getInstance().numberWithCommas(currUpper));
						this.poiData["counts"]["tier"]["next"].lower.setValue(TGCTools.getInstance().numberWithCommas(nextLower));
						this.poiData["counts"]["tier"]["next"].upper.setValue(TGCTools.getInstance().numberWithCommas(nextUpper));
						
						if (this.currPOIType < 5)
						{
							this.poiData["counts"]["tier"]["prev"].bonus.setValue(TGCTools.getInstance().numberWithCommas(prevBonus) + "/hr");
							this.poiData["counts"]["tier"]["curr"].bonus.setValue(TGCTools.getInstance().numberWithCommas(currBonus) + "/hr");
							this.poiData["counts"]["tier"]["next"].bonus.setValue(TGCTools.getInstance().numberWithCommas(nextBonus) + "/hr");
						}
						else	
						{
							this.poiData["counts"]["tier"]["prev"].bonus.setValue(TGCTools.getInstance().numberWithCommas(prevBonus) + "%");
							this.poiData["counts"]["tier"]["curr"].bonus.setValue(TGCTools.getInstance().numberWithCommas(currBonus) + "%");
							this.poiData["counts"]["tier"]["next"].bonus.setValue(TGCTools.getInstance().numberWithCommas(nextBonus) + "%");
						}
						this.poiData["counts"]["tier"]["prev"].diff.setValue(TGCTools.getInstance().numberWithCommas(prevDiff));
						this.poiData["counts"]["tier"]["curr"].diff.setValue(TGCTools.getInstance().numberWithCommas(currDiff));
						this.poiData["counts"]["tier"]["next"].diff.setValue(TGCTools.getInstance().numberWithCommas(nextDiff));
						
						//Ranks
						this.poiData["counts"]["rank"]["prev"].alliance.setValue(prevAlliance);
						this.poiData["counts"]["rank"]["prev"].score.setValue(TGCTools.getInstance().numberWithCommas(prevScore));
						this.poiData["counts"]["rank"]["prev"].multi.setValue(TGCTools.getInstance().numberWithCommas(prevMulti) + "%");
						this.poiData["counts"]["rank"]["prev"].diff.setValue(TGCTools.getInstance().numberWithCommas(prevRankDiff));
						
						this.poiData["counts"]["rank"]["curr"].alliance.setValue(currAlliance);
						this.poiData["counts"]["rank"]["curr"].score.setValue(TGCTools.getInstance().numberWithCommas(currScore));
						this.poiData["counts"]["rank"]["curr"].multi.setValue(TGCTools.getInstance().numberWithCommas(currMulti) + "%");
						this.poiData["counts"]["rank"]["curr"].diff.setValue(TGCTools.getInstance().numberWithCommas(currRankDiff));
						
						this.poiData["counts"]["rank"]["next"].alliance.setValue(nextAlliance);
						
						if (rankData.rank != 1)
						{
							this.poiData["counts"]["rank"]["next"].score.setValue(TGCTools.getInstance().numberWithCommas(nextScore));
							this.poiData["counts"]["rank"]["next"].multi.setValue(TGCTools.getInstance().numberWithCommas(nextMulti) + "%");
							this.poiData["counts"]["rank"]["next"].diff.setValue(TGCTools.getInstance().numberWithCommas(nextRankDiff));
						}
						else
						{
							this.poiData["counts"]["rank"]["next"].score.setValue(nextScore);
							this.poiData["counts"]["rank"]["next"].multi.setValue(nextMulti);
							this.poiData["counts"]["rank"]["next"].diff.setValue(nextRankDiff);
						}
					},
					
					getAllianceName: function(rank)
					{
						if (typeof this.rankingData != 'undefined')
						{
							//find next rank score
							for (var idx in this.rankingData)
							{
								var info = this.rankingData[idx];
								
								if (info.poir == rank)
								{
									return info.an;
								}
							}
						}
					},
					
					calculatePOIData: function(poiList, totalScore, rankData, baseValue)
					{
						if (typeof poiList != 'undefined')
						{
							var tierBufferSum = 0;
							var rankBufferSum = 0;
							var currTierLowerBound = this.getTierLowerBound(totalScore);
							var currRankLowerBound = this.getRankLowerBound(rankData.rank);
							var poiInfo = {};
							var poiArray = [];
							for (var idx in poiList)
							{
								var poi = poiList[idx];
								
								var newTotalScore = totalScore - poi.score;
								var newBaseValue = this.getBaseValue(newTotalScore);
								var newRankMultiplier = this.calculateNewRankMultiplier(newTotalScore, rankData.rank);
								
								var isNeededForTier = "Hold";
								if (tierBufferSum >= currTierLowerBound)
									isNeededForTier = "Buffer";
								tierBufferSum += poi.score;
								
								var isNeededForRank = "Hold";
								if (rankBufferSum >= currRankLowerBound)
									isNeededForRank = "Buffer";
								rankBufferSum += poi.score;
								
								
								//Calculate Loss
								var totalBonus = baseValue * (1 + (rankData.multiplier / 100));
								var newTotalBonus = newBaseValue * (1 + (newRankMultiplier / 100));
								var loss = totalBonus - newTotalBonus;
								
								poiInfo = 
								{
									"type": poi.type,
									"score": poi.score,
									"coords": poi.x + ":" + poi.y,
									"level": poi.level,
									"loss": loss,
									"tier": isNeededForTier,
									"rank": isNeededForRank
								}
								poiArray.push(poiInfo);
							}
							
							this.displayPOIData(poiArray);
						}
					},
					
					displayPOIData: function(data)
					{
						if (data != undefined)
						{
							var displayData = [];
							for (var idx in data)
							{
								var poi = data[idx];
								this.tableModel.addRows([[poi.level, poi.coords, poi.score, poi.loss, poi.tier, poi.rank]]);
							}
						}
					},
					
					calculateNewRankMultiplier: function(score, rank)
					{
						if (typeof this.rankingData != 'undefined')
						{
							//find next rank score
							for (var idx in this.rankingData)
							{
								var info = this.rankingData[idx];
								
								if (info.poir == (rank + 1))
								{
									if (info.pois <= score)
										return ClientLib.Base.PointOfInterestTypes.GetBoostModifierByRank(rank);
									else
										return this.calculateNewRankMultiplier(score, (rank + 1));
								}
							}
						}
					},
					
					getRankScore: function(rank)
					{
						if (typeof this.rankingData != 'undefined')
						{
							for (var idx in this.rankingData)
							{
								var alliance = this.rankingData[idx];
								
								if (alliance.poir == rank)
								{
									return alliance.pois;
								}
							}
						}
					},
					
					getRankLowerBound: function(rank)
					{
						if (typeof this.rankingData != 'undefined')
						{
							for (var idx in this.rankingData)
							{
								var alliance = this.rankingData[idx];
								if (alliance.poir == (rank + 1))
								{
									return alliance.pois;
								}
							}
						}
					},
					
					//From an online source
					/*numberWithCommas: function(x)
					{
						var parts = x.toString().split(".");
						parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						return parts.join(".");
					},*/
		
					getTierLowerBound: function(score)
					{
						var tiers = [];
						tiers.push(1);
						tiers.push(4);
						tiers.push(9);
						tiers.push(16);
						tiers.push(27);
						tiers.push(50);
						tiers.push(90);
						tiers.push(160);
						tiers.push(260);
						tiers.push(420);
						tiers.push(750);
						tiers.push(1300);
						tiers.push(2200);
						tiers.push(3600);
						tiers.push(5700);
						tiers.push(9700);
						tiers.push(16400);
						tiers.push(28000);
						tiers.push(44000);
						tiers.push(68000);
						tiers.push(115000);
						tiers.push(190000);
						tiers.push(330000);
						tiers.push(510000);
						tiers.push(800000);
						tiers.push(1350000);
						tiers.push(2200000);
						tiers.push(3600000);
						tiers.push(6000000);
						tiers.push(9000000);
						tiers.push(15000000);
						tiers.push(25000000);
						tiers.push(42000000);
						tiers.push(65000000);
						tiers.push(100000000);
						tiers.push(165000000);
						tiers.push(270000000);
						tiers.push(450000000);
						tiers.push(1000000000);
						
						for (var idx in tiers)
						{
							if (score <= tiers[idx])
							{
								if (idx == 0)
									return 0;
								else if (score < tiers[idx])
									return tiers[idx-1];
								else
									return tiers[idx];
							}
						}
					},
					
					getRankingData: function(poiType)
					{
						//4-10
						//ClientLib.Data.Ranking.ERankingType.BonusTiberium:
						//ClientLib.Data.Ranking.ERankingType.BonusCrystal:
						//ClientLib.Data.Ranking.ERankingType.BonusPower:
						//ClientLib.Data.Ranking.ERankingType.BonusInfantry:
						//ClientLib.Data.Ranking.ERankingType.BonusVehicles:
						//ClientLib.Data.Ranking.ERankingType.BonusAircraft:
						//ClientLib.Data.Ranking.ERankingType.BonusDefense:
						this.__ranking.RequestCount(ClientLib.Data.Ranking.EViewType.Alliance, poiType);
					},

					__onRankingReceivedCount: function(data)
					{
						if (data != undefined)
							this.__ranking.RequestData(0, data, ClientLib.Data.Ranking.ESortColumn.Rank, ClientLib.Data.Ranking.ESortDirection.Ascending);
					},

					__onRankingReceivedData: function(data)
					{
						if (data != undefined)
						{
							this.rankingData = data;
							this.updatePOIList();
						}
					},
					
					sortPOIList: function(obj)
					{
						var arr = [];
						for (var idx in obj) {
							arr.push({
								'type': obj[idx].t,
								'level': obj[idx].l,
								'x': obj[idx].x,
								'y': obj[idx].y,
								'score': ClientLib.Base.PointOfInterestTypes.GetScoreByLevel(obj[idx].l)
							});
						}
						arr.sort(function(a, b) { return b.level - a.level; });
						return arr; // returns array
					},
					
					getTotalScore: function(allianceID)
					{
						if (typeof this.rankingData != 'undefined')
						{	
							for (var idx in this.rankingData)
							{
								if (this.rankingData[idx].a == allianceID)
									return this.rankingData[idx].pois;
							}
						}
					},
					
					getRankMultiplier: function(allianceID)
					{
						if (typeof this.rankingData != 'undefined')
						{	
							for (var idx in this.rankingData)
							{
								if (this.rankingData[idx].a == allianceID)
								{
									var rankInfo = 
									{
										"rank" : this.rankingData[idx].poir,
										"multiplier" : ClientLib.Base.PointOfInterestTypes.GetBoostModifierByRank(this.rankingData[idx].poir)
									};
									return rankInfo;
								}
							}
						}
					},
					
					getBaseValue: function(totalScore)
					{
						return ClientLib.Base.PointOfInterestTypes.GetBonusByType(this.currPOIType, totalScore);
					},
					
					showPOILocation: function(evt)
					{
						var row = evt.getRow();
						var coords = "";
						
						coords = this.tableModel.getValueById("Coords", row);

						if (coords != "")
						{
							var x = parseInt(coords.substring(0, 3));
							var y = parseInt(coords.substring(4));
							var view = ClientLib.Vis.VisMain.GetInstance().GetActiveView();
							view.CenterGridPosition(x, y);
						}
					},
					
					doSimulation: function()
					{		
						//Grab Selection Data
						var selection = [];
						var tableModel = this.tableModel;
						var table = this.table;
						
						if (typeof table != undefined)
						{
							table.getSelectionModel().iterateSelection(function(index) {
								selection.push(tableModel.getRowData(index));
							});
						}
						else
						{
							return;
						}
						
						var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
						var allianceID = alliance.get_Id();
						var alliancePOIList = alliance.get_OwnedPOIs();
						var poiList = [];
						var totalScore = 0;
						var baseValue = 0;
						
						//Grab the POIs under the current selected type
						for (var idx in alliancePOIList)
						{
							if (alliancePOIList[idx].t == this.currPOIType)
							{
								var isUnselected = true;
								//Check if it is selected
								for (var idx2 in selection)
								{
									if (selection[idx2][1] == (alliancePOIList[idx].x + ":" + alliancePOIList[idx].y))
									{
										isUnselected = false;
										break;
									}
								}
								if (isUnselected == true)
								{
									totalScore += ClientLib.Base.PointOfInterestTypes.GetScoreByLevel(alliancePOIList[idx].l)
									poiList.push(alliancePOIList[idx]);
								}
							}
						}
						
						poiList = this.sortPOIList(poiList);
						
						//Previous
						var prevScore = this.getTotalScore(allianceID);
						var prevBonus = this.getBaseValue(prevScore);
						var rankData = this.getRankMultiplier(allianceID);
						var prevMulti = rankData.multiplier;
						var prevTotalBonus = prevBonus * (1 + (prevMulti / 100));
						
						var currScore = totalScore;
						var currBonus =  this.getBaseValue(currScore);
						var currMulti = this.calculateNewRankMultiplier(currScore, rankData.rank);
						var currTotalBonus = currBonus * (1 + (currMulti / 100));
						
						//Update Simulation Data
						this.poiData["counts"]["simulation"]["prev"].score.setValue(TGCTools.getInstance().numberWithCommas(prevScore));
						this.poiData["counts"]["simulation"]["curr"].score.setValue(TGCTools.getInstance().numberWithCommas(currScore));
						if (this.currPOIType < 5)
						{
							this.poiData["counts"]["simulation"]["prev"].bonus.setValue(TGCTools.getInstance().numberWithCommas(prevBonus) + "/hr");
							this.poiData["counts"]["simulation"]["prev"].totalBonus.setValue(TGCTools.getInstance().numberWithCommas(prevTotalBonus) + "/hr");
							this.poiData["counts"]["simulation"]["curr"].bonus.setValue(TGCTools.getInstance().numberWithCommas(currBonus) + "/hr");
							this.poiData["counts"]["simulation"]["curr"].totalBonus.setValue(TGCTools.getInstance().numberWithCommas(currTotalBonus) + "/hr");
						}
						else
						{
							this.poiData["counts"]["simulation"]["prev"].bonus.setValue(prevBonus + "%");
							this.poiData["counts"]["simulation"]["prev"].totalBonus.setValue(prevTotalBonus + "%");
							this.poiData["counts"]["simulation"]["curr"].bonus.setValue(currBonus + "%");
							this.poiData["counts"]["simulation"]["curr"].totalBonus.setValue(currTotalBonus + "%");
						}
							
						this.poiData["counts"]["simulation"]["prev"].multi.setValue(prevMulti + "%");
						this.poiData["counts"]["simulation"]["curr"].multi.setValue(currMulti + "%");
					},
					
					addToList: function()
					{
						var selection = [];
						var tableModel = this.tableModel;
						var table = this.table;
						
						if (typeof table != undefined)
						{
							table.getSelectionModel().iterateSelection(function(index) {
								selection.push(tableModel.getRowData(index));
							});
						}
						else
						{
							return;
						}
						
						var poiType = this.getPOISelection();
						var poiMsg = "";

						if (selection.length != 0)
						{
							switch(poiType)
							{
								case 4:
									poiMsg += "[b][u]Tiberium[/u][/b] \r";
									break;
								case 5:
									poiMsg += "[b][u]Crystal[/u][/b] \r";
									break;
								case 6:
									poiMsg += "[b][u]Reactor[/u][/b] \r";
									break;
								case 7:
									poiMsg += "[b][u]Tungsten[/u][/b] \r";
									break;
								case 8:
									poiMsg += "[b][u]Uranium[/u][/b] \r";
									break;
								case 9:
									poiMsg += "[b][u]Aircraft[/u][/b] \r";
									break;
								case 10:
									poiMsg += "[b][u]Resonator[/u][/b] \r";
									break;
							}
							for (var idx in selection)
							{
								var level = parseInt(selection[idx][0]);
								var coords = selection[idx][1];
								var points = ClientLib.Base.PointOfInterestTypes.GetScoreByLevel(level);
								
								poiMsg += "L" + level + " [coords]" + coords + "[/coords] (" + points + ")\r"; 
							}
						}
						this.msgList[poiType] = poiMsg;
					},
					
					/**
						Want to thank this script (http://userscripts.org/scripts/show/158800) and its author for the idea
					*/
					onKeyPress: function(event)
					{
						var key = String.fromCharCode(event.keyCode);
						if (event.altKey && key == "L")
						{
							var inputField = document.querySelector('input:focus, textarea:focus');
							if (inputField != null)
							{
								var msg = "";
								var msgList = TGCTools.POIWindow.getInstance().getMsgList();
								if (typeof msgList != 'undefined')
								{
									for (var idx = 4; idx < 11; idx++)
									{
										if (msgList[idx] != "")
										{
											msg += msgList[idx] + "\r";
										}
									}
									inputField.value += msg;
								}
							}
						}
						else if (event.altKey && key == "C")
						{
							var msgList = TGCTools.POIWindow.getInstance().getMsgList();
							if (typeof msgList != 'undefined')
							{
								for (var idx = 4; idx < 11; idx++)
								{
									msgList[idx] = "";
								}
							}
						}
					},
					
					getMsgList: function()
					{
						return this.msgList;
					}
				}
			});
			
			qx.Class.define("TGCTools.UpgradeWindow", 
			{
				type: "singleton",
				extend:	qx.ui.window.Window,
            
				construct: function()
				{
					this.base(arguments);
					this.setLayout(new qx.ui.layout.VBox(5));
				
					this.set({
						width: 600,
						caption: "Upgrade Management Tool",
						padding: 5,
						allowMaximize: false,
						showMaximize: false,
						allowMinimize: false,
						showMinimize: false,	
					});
					
					var upgradeLevelBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({decorator: "pane-light-opaque", padding: 10});
					var upgradeBaseBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
					var baseLabel = new qx.ui.basic.Label("Base Level: ").set({allowGrowX: false, allowGrowY: false, font: "font_size_14_bold"});
					this.baseTextField = new qx.ui.form.TextField();
					this.baseTextField.setToolTipText("Enter desired level to upgrade to");
					var baseUpgradeBtn = new qx.ui.form.Button("","FactionUI/icons/icon_building_detail_upgrade.png");
					baseUpgradeBtn.setShow("icon");
					baseUpgradeBtn.setToolTipText("Upgrades all buildings to desired level if resources exist.");
					baseUpgradeBtn.addListener("click", this.baseUpgradeAllLevel, this);
					var baseUpgradeOneBtn = new qx.ui.form.Button("+1").set({allowGrowX: false, allowGrowY: false, height: 35, font: "font_size_14_bold"});
					baseUpgradeOneBtn.addListener("click", this.baseUpgradeOneLevel, this);
					baseUpgradeOneBtn.setToolTipText("Upgrades all buildings by one level if resources exist.");
					this.baseUpgradeMaximizeBtn = new qx.ui.form.Button("Maximize").set({allowGrowX: false, allowGrowY: false, height: 35});
					this.baseUpgradeMaximizeBtn.setToolTipText("Upgrades production buildings that maximize gain/costs based on selected resource type.");
					this.baseUpgradeMaximizeBtn.addListener("click", this.baseUpgradeMaximizeLevel, this);
					
					this.baseUpgradeMaximizeSelect = new qx.ui.form.SelectBox().set({allowGrowX: false, allowGrowY: false, height: 35});
					this.baseUpgradeMaximizeSelect.add(new qx.ui.form.ListItem("Tiberium", "webfrontend/ui/common/icn_res_tiberium.png", "1"));
					this.baseUpgradeMaximizeSelect.add(new qx.ui.form.ListItem("Crystal", "webfrontend/ui/common/icn_res_chrystal.png", "2"));
					this.baseUpgradeMaximizeSelect.add(new qx.ui.form.ListItem("Power", "webfrontend/ui/common/icn_res_power.png", "5"));
					this.baseUpgradeMaximizeSelect.add(new qx.ui.form.ListItem("Credits", "webfrontend/ui/common/icn_res_dollar.png", "3"));
					this.baseUpgradeMaximizeSelect.setToolTipText("Select desired resource to maximize by gain/cost.");
					upgradeBaseBox.add(baseLabel);
					upgradeBaseBox.add(this.baseTextField);
					upgradeBaseBox.add(baseUpgradeBtn);
					upgradeBaseBox.add(baseUpgradeOneBtn);
					upgradeBaseBox.add(this.baseUpgradeMaximizeBtn);
					upgradeBaseBox.add(this.baseUpgradeMaximizeSelect);
					upgradeLevelBox.add(upgradeBaseBox);
					
					
					this.add(upgradeLevelBox);
					
					this.numMaximizeSteps = 0;
				},
				
				destruct: function()
				{
				},
				
				members:
				{
					numMaximizeSteps: null,
					
					baseUpgradeAllLevel: function()
					{
						var newLevel = parseInt(this.baseTextField.getValue());
						
						if (isNaN(newLevel))
							return;
							
						if (newLevel > 51)
							newLevel = 51;
							
						if (newLevel < 0)
							newLevel = 0;

						//Based on Topper's Example
						if (PerforceChangelist <= 384441)
							newLevel--;
							
						ClientLib.API.City.GetInstance().UpgradeAllBuildingsToLevel(newLevel);
						this.baseTextField.setValue("");
					},
					
					baseUpgradeOneLevel: function()
					{
						var currOwnCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(currOwnCity.get_Id());
						var visCity =  ClientLib.Vis.VisMain.GetInstance().get_City();
						var width =  visCity.get_GridWidth();
						var height =  visCity.get_GridHeight();

						for (var x = 0; x < 9; x++)
						{
							for (var y = 0; y < 8; y++)
							{
								var cityEntity = visCity.GetObjectFromPosition(x * width, y * height);
								if (cityEntity != null)
								{
									if (cityEntity.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.CityBuildingType)
									{
										ClientLib.API.City.GetInstance().UpgradeBuildingToLevel(cityEntity.get_BuildingDetails(), (cityEntity.get_BuildingLevel() + 1));
									}
								}
							}
						}
					},
					
					baseUpgradeMaximizeLevel: function()
					{
						this.baseUpgradeMaximizeBtn.setEnabled(false);
						this.baseUpgradeMaximizeSelect.setEnabled(false);
						var currOwnCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(currOwnCity.get_Id());
						var visCity =  ClientLib.Vis.VisMain.GetInstance().get_City();
						var width =  visCity.get_GridWidth();
						var height =  visCity.get_GridHeight();
						
						var buildingsData = currOwnCity.get_Buildings().d;
						var buildings = [];
						for (var idx in buildingsData)
						{
							var tName = buildingsData[idx].get_TechName();
							//If not a production type then skip
							switch(parseInt(tName))
							{
								case 1: 
								case 2: 
								case 10: 
								case 11: 
								case 15:
								case 16: 
									break;
								default: continue; break;
							}

							var objData = buildingsData[idx].get_TechGameData_Obj();
							var detailView = currOwnCity.GetBuildingDetailViewInfo(buildingsData[idx]);
							
							if (detailView == null)
								continue;
							
							var level = buildingsData[idx].get_CurrentLevel();
							if (level == 51)
								continue;
							
							var upgradeReqs = ClientLib.Base.Util.GetTechLevelResourceRequirements_Obj(level + 1, objData);
							
							//Gain per hour if upgraded from Maelstrom tools
							var upgradeGPH = {1: 0, 2: 0, 3: 0, 5: 0};
							var totalGPH = 0;
							for (var type in detailView.OwnProdModifiers.d)
							{
								switch (parseInt(type)) 
								{
									case ClientLib.Base.EModifierType.TiberiumPackageSize:
									case ClientLib.Base.EModifierType.CrystalPackageSize:
									case ClientLib.Base.EModifierType.PowerPackageSize:
									case ClientLib.Base.EModifierType.CreditsPackageSize:
										var ModOj = detailView.OwnProdModifiers.d[buildingsData[idx].get_MainModifierTypeId()];
										var Mod = (ModOj.TotalValue + ModOj.NewLvlDelta) / ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour();
										totalGPH += (detailView.OwnProdModifiers.d[type].NewLvlDelta / Mod);
										switch(parseInt(type))
										{
											case ClientLib.Base.EModifierType.TiberiumPackageSize:
												upgradeGPH[1] += (detailView.OwnProdModifiers.d[type].NewLvlDelta / Mod);
												break;
											case ClientLib.Base.EModifierType.CrystalPackageSize:
												upgradeGPH[2] += (detailView.OwnProdModifiers.d[type].NewLvlDelta / Mod);
												break;
											case ClientLib.Base.EModifierType.PowerPackageSize:
												upgradeGPH[5] += (detailView.OwnProdModifiers.d[type].NewLvlDelta / Mod);
												break;
											case ClientLib.Base.EModifierType.CreditsPackageSize:
												upgradeGPH[3] += (detailView.OwnProdModifiers.d[type].NewLvlDelta / Mod);
												break;
										}
										break;
									case ClientLib.Base.EModifierType.TiberiumProduction:
									case ClientLib.Base.EModifierType.CrystalProduction:
									case ClientLib.Base.EModifierType.PowerProduction:
									case ClientLib.Base.EModifierType.CreditsProduction:
										totalGPH += detailView.OwnProdModifiers.d[type].NewLvlDelta;
										switch(parseInt(type))
										{
											case ClientLib.Base.EModifierType.TiberiumProduction:
												upgradeGPH[1] += detailView.OwnProdModifiers.d[type].NewLvlDelta;
												break;
											case ClientLib.Base.EModifierType.CrystalProduction:
												upgradeGPH[2] += detailView.OwnProdModifiers.d[type].NewLvlDelta;
												break;
											case ClientLib.Base.EModifierType.PowerProduction:
												upgradeGPH[5] += detailView.OwnProdModifiers.d[type].NewLvlDelta;
												break;
											case ClientLib.Base.EModifierType.CreditsProduction:
												upgradeGPH[3] += detailView.OwnProdModifiers.d[type].NewLvlDelta;
												break;
										}
										break;
								}
							}
							
							//Check if building produces any gain for selecte resource. If not, continue
							var selection = parseInt(this.baseUpgradeMaximizeSelect.getSelection()[0].getModel());
							if (upgradeGPH[selection] == 0)
								continue;
							
							//Determine upgrade 
							var totalCosts = 0;
							
							for (var costs in upgradeReqs)
							{
								//don't need functions
								if (typeof upgradeReqs[costs] == 'function')
									continue;
									
								//don't need 0 costs
								if (upgradeReqs[costs].Type == 0)
									continue;
									
								totalCosts += upgradeReqs[costs].Count;	
							}
							var hasResources = currOwnCity.HasEnoughResources(upgradeReqs);

							if (!hasResources)
								continue;
								
							var gainPerCostRatio = (upgradeGPH[selection] / totalCosts) * 100;	
							
							var visBuilding = visCity.GetObjectFromPosition(buildingsData[idx].get_CoordX() * width, buildingsData[idx].get_CoordY() * height);
							
							var upgradeInfo = 
							{
								"nLevel": level + 1,
								"gpcr": gainPerCostRatio,
								"x": buildingsData[idx].get_CoordX(),
								"y": buildingsData[idx].get_CoordY(),
								"data": buildingsData[idx],
								"detail": visBuilding.get_BuildingDetails(),
								"tech": objData
							};
							
							buildings.push(upgradeInfo);
						}
						
						if (buildings.length == 0)
						{
							this.baseUpgradeMaximizeBtn.setEnabled(true);
							this.baseUpgradeMaximizeSelect.setEnabled(true);
							return;
						}
							
						//Sort by GCPR
						buildings = this.sortBuildingList(buildings);
						
						//Have list now time to maximize
						this.doMaximizeUpgrading(buildings, currOwnCity);
					},
					
					doMaximizeUpgrading: function(buildings, currOwnCity)
					{			
						if (buildings.length == 0)
						{
							this.baseUpgradeMaximizeBtn.setEnabled(true);
							this.baseUpgradeMaximizeSelect.setEnabled(true);
							return;
						}
							
						//Upgrade the first one
						ClientLib.API.City.GetInstance().UpgradeBuildingToLevel(buildings[0].detail, buildings[0].nLevel);
						
						//Now we need to recalculate the next gpcr
						if (buildings[0].nLevel == 51)
						{
							buildings = this.removeItemFromArray(buildings, 0, 1);
							this.waitToMaximizeAgain(buildings, currOwnCity);
							return;
						}
						else
						{
							buildings[0].nLevel = buildings[0].nLevel + 1;
						}

						var upgradeReqs =  ClientLib.Base.Util.GetTechLevelResourceRequirements_Obj(buildings[0].nLevel, buildings[0].tech);
						
						//Check to make sure player has enough to purchase upgrade
						if (!currOwnCity.HasEnoughResources(upgradeReqs))
						{
							buildings = this.removeItemFromArray(buildings, 0, 1);
							this.waitToMaximizeAgain(buildings, currOwnCity);
							return;
						}
						
						//Get Total Costs
						var totalCosts = 0;
						for (var costs in upgradeReqs)
						{
							//don't need functions
							if (typeof upgradeReqs[costs] == 'function')
								continue;
								
							//don't need 0 costs
							if (upgradeReqs[costs].Type == 0)
								continue;
								
							totalCosts += upgradeReqs[costs].Count;	
						}
						
						//Get GainsPerHour
						var upgradeGPH = {1: 0, 2: 0, 3: 0, 5: 0};
						var detailView = currOwnCity.GetBuildingDetailViewInfo(buildings[0].data);
							
						for (var type in detailView.OwnProdModifiers.d)
						{
							switch (parseInt(type)) 
							{
								case ClientLib.Base.EModifierType.TiberiumPackageSize:
								case ClientLib.Base.EModifierType.CrystalPackageSize:
								case ClientLib.Base.EModifierType.PowerPackageSize:
								case ClientLib.Base.EModifierType.CreditsPackageSize:
									var ModOj = detailView.OwnProdModifiers.d[buildings[0].data.get_MainModifierTypeId()];
									var Mod = (ModOj.TotalValue + ModOj.NewLvlDelta) / ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour();
									//totalGPH += (detailView.OwnProdModifiers.d[type].NewLvlDelta / Mod);
									switch(parseInt(type))
									{
										case ClientLib.Base.EModifierType.TiberiumPackageSize:
											upgradeGPH[1] += (detailView.OwnProdModifiers.d[type].NewLvlDelta / Mod);
											break;
										case ClientLib.Base.EModifierType.CrystalPackageSize:
											upgradeGPH[2] += (detailView.OwnProdModifiers.d[type].NewLvlDelta / Mod);
											break;
										case ClientLib.Base.EModifierType.PowerPackageSize:
											upgradeGPH[5] += (detailView.OwnProdModifiers.d[type].NewLvlDelta / Mod);
											break;
										case ClientLib.Base.EModifierType.CreditsPackageSize:
											upgradeGPH[3] += (detailView.OwnProdModifiers.d[type].NewLvlDelta / Mod);
											break;
									}
									break;
								case ClientLib.Base.EModifierType.TiberiumProduction:
								case ClientLib.Base.EModifierType.CrystalProduction:
								case ClientLib.Base.EModifierType.PowerProduction:
								case ClientLib.Base.EModifierType.CreditsProduction:
									//totalGPH += detailView.OwnProdModifiers.d[type].NewLvlDelta;
									switch(parseInt(type))
									{
										case ClientLib.Base.EModifierType.TiberiumProduction:
											upgradeGPH[1] += detailView.OwnProdModifiers.d[type].NewLvlDelta;
											break;
										case ClientLib.Base.EModifierType.CrystalProduction:
											upgradeGPH[2] += detailView.OwnProdModifiers.d[type].NewLvlDelta;
											break;
										case ClientLib.Base.EModifierType.PowerProduction:
											upgradeGPH[5] += detailView.OwnProdModifiers.d[type].NewLvlDelta;
											break;
										case ClientLib.Base.EModifierType.CreditsProduction:
											upgradeGPH[3] += detailView.OwnProdModifiers.d[type].NewLvlDelta;
											break;
									}
									break;
							}
						}
						
						//Make sure gains are present
						var selection = parseInt(this.baseUpgradeMaximizeSelect.getSelection()[0].getModel());
						if (upgradeGPH[selection] == 0)
						{
							buildings = this.removeItemFromArray(buildings, 0, 1);
							this.waitToMaximizeAgain(buildings, currOwnCity);
							return;
						}
						var gainPerCostRatio = (upgradeGPH[selection] / totalCosts) * 100;
						buildings[0].gpcr = gainPerCostRatio;

						//Sort again
						buildings = this.sortBuildingList(buildings);
						this.waitToMaximizeAgain(buildings, currOwnCity);
					},
					
					waitToMaximizeAgain: function(buildings, currOwnCity)
					{
						(function(buildings, currOwnCity)
						{
							setTimeout(function()
							{
								TGCTools.UpgradeWindow.getInstance().doMaximizeUpgrading(buildings, currOwnCity);
							}, 500);
						}(buildings, currOwnCity));
					},
					
					removeItemFromArray: function(array, index, howMany)
					{
						array.splice(index, howMany);
						return array;
					},
					
					sortBuildingList: function(obj)
					{
						var arr = [];
						for (var idx in obj) {
							arr.push({
								'nLevel': obj[idx].nLevel,
								'gpcr': obj[idx].gpcr,
								'x': obj[idx].x,
								'y': obj[idx].y,
								"data": obj[idx].data,
								"detail": obj[idx].detail,
								"tech": obj[idx].tech
							});
						}
						arr.sort(function(a, b) { return b.gpcr - a.gpcr; });
						return arr; // returns array
					}
				}
			});
		}
		
		function waitForGame() 
		{
			try 
			{
				if (typeof qx != 'undefined' && typeof qx.core != 'undfined' && typeof qx.core.Init != 'undefined') 
				{
					var app = qx.core.Init.getApplication();
					if (app.initDone == true) 
					{
						try
						{
							createClasses();
							
							console.log("Creating phe.cnc function wraps");
							
							//Current Server patch (World 52 - US East Coast) uses phe
							if (typeof phe.cnc.Util.attachNetEvent == 'undefined')
								TGCTools.getInstance().attachNetEvent = webfrontend.gui.Util.attachNetEvent;
							else
								TGCTools.getInstance().attachNetEvent = phe.cnc.Util.attachNetEvent;
                        
							//Current Server patch (World 52 - US East Coast) uses webfrontend
							if (typeof phe.cnc.gui.util == 'undefined')
								TGCTools.getInstance().formatNumbersCompact = webfrontend.gui.Util.formatNumbersCompact;    
							else
								TGCTools.getInstance().formatNumbersCompact = phe.cnc.gui.util.Numbers.formatNumbersCompact;   
							
							TGCTools.BaseScanner.getInstance();
						}
						catch(e)
						{
							console.log("Simulator initialization error:");
							console.log(e);
						}
					} 
					else
						window.setTimeout(waitForGame, 1000);
				} 
				else 
				{
					window.setTimeout(waitForGame, 1000);
				}
			} 
			catch (e) 
			{
				if (typeof console != 'undefined') console.log(e);
				else if (window.opera) opera.postError(e);
				else GM_log(e);
			}
		}
		window.setTimeout(waitForGame, 1000);
	};
	
	var script = document.createElement("script");
    var txt = injectFunction.toString();
	script.innerHTML = "(" + txt + ")();";
	script.type = "text/javascript";
    
    document.getElementsByTagName("head")[0].appendChild(script);
})();
























/* =====================================================================  TA POIs Analyser   ======================================================================

(function(){
	var ccta_apa = function(){
		console.log('script started');
		var multiplier = {1:100, 2:90, 3:85, 4:80, 5:76, 6:72, 7:68, 8:64, 9:60, 10:57, 11:54, 12:51, 13:48, 14:45, 15:42, 16:39, 17:36, 18:33, 19:30, 20:28, 21:26, 22:24, 23:22, 24:20, 25:18, 26:16, 27:14, 28:13, 29:12, 30:11, 31:10, 32:9, 33:8, 34:7, 35:6, 36:5, 37:4, 38:3, 39:2, 40:1, 0:0};
		var score = {12:1, 13:3, 14:6, 15:10, 16:15, 17:25, 18:40, 19:65, 20:100, 21:150, 22:250, 23:400, 24:650, 25:1000, 26:1500, 27:2500, 28:4000, 29:6500, 30:10000, 31:15000, 32:25000, 33:40000, 34:65000, 35:100000, 36:150000, 37:250000, 38:400000, 39:650000, 40:1000000, 41:1500000, 42:2500000, 43:4000000, 44:6500000, 45:10000000};
		var bonus = [[1,3,1200,5,1],[4,8,2000,10,2],[9,15,3000,14,3],[16,26,4000,17,4],[27,49,5500,20,5],[50,89,7000,23,6],[90,159,8500,26,7],[160,259,10000,29,8],[260,419,12000,32,9],[420,749,15000,35,10],[750,1299,18000,38,11],[1300,1199,22000,41,12],[2200,3599,26000,44,13],[3600,5699,30000,47,14],[5700,9699,36000,50,15],[9700,16399,45000,53,16],[16400,27999,60000,56,17],[28000,43999,80000,58,18],[44000,67999,105000,60,19],[68000,114999,135000,62,20],[115000,189999,170000,64,21],[190000,329999,215000,66,22],[330000,509999,270000,68,23],[510000,799999,330000,70,24],[800000,1349999,400000,72,25],[1350000,2199999,480000,74,26],[2200000,3599999,580000,76,27],[3600000,5999999,700000,78,28],[6000000,8999999,830000,80,29],[9000000,14999999,1000000,82,30],[15000000,24999999,1200000,84,31],[25000000,41999999,1450000,86,32],[42000000,64999999,1770000,88,33],[65000000,99999999,2200200,90,34],[100000000,164999999,2700000,92,35],[165000000,269999999,3300000,94,36],[270000000,449999999,4000000,96,37],[450000000,900000000,4800000,98,38]];

		var style = {
			"table": {"margin": "5px", "borderTop": "1px solid #333", "borderBottom": "1px solid #333", "fontFamily": "Verdana, Geneva, sans-serif"},
			"graph": {
				"td": {"width": "68px", "verticalAlign": "bottom", "textAlign": "center"},
				"div": {"width": "24px", "margin": "0 auto -1px auto", "border": "3px solid #333", "borderBottom": "none"}
			},
			"icon": {
				"ul": {"listStyleType": "none", "margin": 0, "padding": 0},
				"div": {"padding": "6px", "marginRight": "6px", "display": "inline-block", "border": "1px solid #000"},
				"p": {"display": "inline", "fontSize": "10px", "color": "#555"},
				"li": {"height": "15px", "padding": "2px", "marginLeft": "10px"}
			},
			"cell": {
				"data": {"width": "68px", "textAlign": "center", "color": "#555", "padding": "3px 2px"},
				"header": {"color": "#416d96", "padding": "3px 2px"}
			},
			"rows": {
				"graph": {"borderBottom": "3px solid #333", "height": "200px"},
				"tr": {"fontSize": "11px", "borderBottom": "1px solid #333",  "backgroundColor": "#d6dde1"}
			}      
		};
						
		var range = function(val){
			if(val == 0) return [0,0,0,0];
			var i;
			bonus.map(function(key){
				if(val > key[0] && val < key[1]) i = key;
			});
			return i;
		};
		
		Element.prototype.css = function(arr){
			for(var prop in arr){
				this.style[prop] = arr[prop];
			}
		};
		
		Element.prototype.prop = function(arr){
			for(var prop in arr){
				this[prop] = arr[prop];
			}
		};
			
		Number.prototype.format = function(){
			var f = "", n = this.toString();
			if(n.length < 3) return this;
			for(i = 0; i < n.length; i++){
				(((n.length - i) % 3 === 0) && (i !== 0)) ? f += "," + n[i] : f += n[i];
			}
			return f;
		};
		
		var addRow = function(title, arr, table, selected){
			var row = document.createElement('tr');
			var header = document.createElement('td');
			row.css(style.rows.tr);
			row.onclick = function(){
				var tr = table.getElementsByTagName('tr');
				for (i = 1; i < tr.length; i++){
					tr[i].style.backgroundColor = '#d6dde1';
				}
				this.style.backgroundColor = '#ecf6fc';
			};
			if(selected == 1) row.style.backgroundColor = '#ecf6fc';
			header.css(style.cell.header);
			header.appendChild(document.createTextNode(title));
			row.appendChild(header);
			for(var key in arr){
				var td = document.createElement('td');
				td.css(style.cell.data);
				td.appendChild(document.createTextNode(arr[key]));
				row.appendChild(td);
			}
		   table.appendChild(row); 
		};
		
		var allianceName, ranks, pois, opois;
		var	poisConstructor = function(){
			console.log('getting data');
			var base = this;
			opois.map(function(poi){
				base.tib = {"scr": ranks[0].s, "color": "#8dc186", "range": range(ranks[0].s), "type": 1, "rank": ranks[0].r, "name": "Tiberium"};
				base.crs = {"scr": ranks[1].s, "color": "#5b9dcb", "range": range(ranks[1].s), "type": 1, "rank": ranks[1].r, "name": "Crystal"};
				base.pwr = {"scr": ranks[2].s, "color": "#8cc1c7", "range": range(ranks[2].s), "type": 1, "rank": ranks[2].r, "name": "Power"};
				base.tun = {"scr": ranks[3].s, "color": "#d7d49c", "range": range(ranks[3].s), "type": 2, "rank": ranks[3].r, "name": "Infantry"};
				base.urn = {"scr": ranks[4].s, "color": "#dbb476", "range": range(ranks[4].s), "type": 2, "rank": ranks[4].r, "name": "Uranium"};
				base.air = {"scr": ranks[5].s, "color": "#c47f76", "range": range(ranks[5].s), "type": 2, "rank": ranks[5].r, "name": "Aircraft"};
				base.res = {"scr": ranks[6].s, "color": "#928195", "range": range(ranks[6].s), "type": 2, "rank": ranks[6].r, "name": "Defence"};
			});
		};
		
		var createTable = function(){
			var scoreData = function(){
				var arr = [];
				for(var x in score){
					arr.push([x, score[x]]);
				};
				return arr;
			};
			var multiplierData = function(){
				var arr = [];
				for(var x in multiplier){
					if(x != 0) arr.push([parseInt(x), multiplier[x] + "%"]);
				};
				return arr;
			};
			var bonusData = function(){
				var arr = [];
				bonus.map(function(key){
					arr.push([key[4], key[0], key[2], key[3] + "%"]);
				});
				return arr;
			};
			
			var columns = [["POI Level", "Score"], ["Tier", "Score Required", "Bonus", "Percentage"], ["Rank", "Multiplier"]];
			var rows = [scoreData(), bonusData(), multiplierData()];
			
			var make = function(n){
				var model = new qx.ui.table.model.Simple();
					model.setColumns(columns[n]);
					model.setData(rows[n]);
				var table = new qx.ui.table.Table(model);
					table.setColumnVisibilityButtonVisible(false);
					table.setHeaderCellHeight(25);
					table.setMarginTop(20);
					table.setMinWidth(500);
				var renderer = new qx.ui.table.cellrenderer.Default();
					renderer.setUseAutoAlign(false);
				for (i = 0; i < columns[n].length; i++){
					table.getTableColumnModel().setDataCellRenderer(i, renderer);
				}
				return table;
			};
							
			this.score = make(0);
			this.bonus = make(1);
			this.multiplier = make(2);
		};
		tables = new createTable();
		
		var getData = function(){
			var a = ClientLib.Data.MainData.GetInstance().get_Alliance(),
				p = a.get_OwnedPOIs(),
				n = a.get_Name(),
				r = a.get_POIRankScore();
			if(!a || !p || !n || !r){
				setTimeout(getData, 1000);
				console.log('waiting for data');
				return;
			}else{
				console.log('data accessable')
				ranks = r;
				opois = p;
				allianceName = n;
				pois = new poisConstructor();
			}
		};
		
		var updateGraph = function(){
			console.log('reloading graph');
			var div = document.getElementById('graph');
			if(!div){
				setTimeout(updateGraph, 1000);
				return;
			}
			getData();
			div.innerHTML = "";
			graph('graph');
		};
		
		var setLayout = function(){
			console.log('creating layout');
			var tab = new qx.ui.tabview.Page("POI Ãœbersicht");
				tab.setLayout(new qx.ui.layout.Grow());
				tab.setPadding(10);
				tab.addListener('appear', updateGraph, this);
			
			var label = new qx.ui.basic.Label("Danke an zdoom.").set({
								textColor: "text-value",
								font: "font_size_13",
								padding: 10
							});
							
			var img = new qx.ui.basic.Image('http://img10.myimg.de/logo6962b.png');
				img.setAlignX("center");
			
			var scrl = new qx.ui.container.Scroll();
			
			var cont = new qx.ui.container.Composite(new qx.ui.layout.VBox());
				cont.setMinHeight(1500);
				cont.setPadding(10);
			
			var gb = new qx.ui.groupbox.GroupBox("Statistics");
				gb.setLayout(new qx.ui.layout.VBox(10));
				gb.setMarginLeft(2);
		
			
			var lgb = new webfrontend.gui.GroupBoxLarge('POIs');
				lgb.setLayout(new qx.ui.layout.Canvas());
				
			var lgbc = new qx.ui.container.Composite(new qx.ui.layout.VBox());
				lgbc.setPadding(60,10,40,10);
				
			var widget = new qx.ui.core.Widget();
				widget.setMinWidth(628);
				widget.setMinHeight(335);
				
			var html = new qx.html.Element('div', null, {id: "graph"});
			
			var info = new qx.ui.groupbox.GroupBox("Additional Information");
				info.setLayout(new qx.ui.layout.VBox());
				info.setMarginTop(10);
				
			var grid = new qx.ui.container.Composite(new qx.ui.layout.Grid(2,1));
			
			var buttonCont = new qx.ui.container.Composite(new qx.ui.layout.VBox());
				buttonCont.setMarginTop(10);
				
			var tableCont = new qx.ui.container.Composite(new qx.ui.layout.VBox());
				tableCont.setMinWidth(500);
				
			grid.add(buttonCont, {row: 1, column: 1});
			grid.add(tableCont, {row: 1, column: 2});
			
			[['Scores', 'score'], ['Muliplier', 'multiplier'], ['Tiers', 'bonus']].map(function(key){
				var table = tables[key[1]];
					table.setColumnVisibilityButtonVisible(false);
					table.setHeaderCellHeight(25);
					table.setMarginTop(20);
					table.setMinWidth(500);
					
				var button = new qx.ui.form.Button(key[0]);
					button.setWidth(100);
					button.setMargin(10, 10, 0, 10);
					button.addListener('execute', function(){
						tableCont.removeAll();
						tableCont.add(table);
					}, this);
					
				buttonCont.add(button);
			});
			
			tableCont.add(tables.score);
			info.add(grid);
			
			tab.add(scrl);
			scrl.add(cont);
			cont.add(img);
			cont.add(lgb);
			cont.add(label);
			lgb.add(lgbc);
			lgbc.add(gb);
			lgbc.add(info);
			gb.add(widget);
			widget.getContentElement().add(html);
			
			webfrontend.gui.alliance.AllianceOverlay.getInstance().getChildren()[12].getChildren()[0].add(tab);
		};
		
		var graph = function(id){
			console.log('creating graph');
			var table = document.createElement('table'),
				gc = document.createElement('tr'),
				gh = document.createElement('td'),
				ul = document.createElement('ul');
			
			table.prop({"id": "data", "cell-spacing": 0, "cell-padding": 0, "rules": "groups", "width": "100%"});
			table.css(style.table);
			gc.css(style.rows.graph);
			ul.css(style.icon.ul);
			gh.appendChild(ul);
			gc.appendChild(gh);
			table.appendChild(gc);
			
			var score = [], tier = [], nextTier = [], bns = [], nextBns = [], poiRank = [], m = 0;
			
			for(var key in pois){
				var min = pois[key].range[0],
					max = pois[key].range[1],
					rank = (pois[key].rank > 40) ? 0 : pois[key].rank,
					color = pois[key].color,
					name = pois[key].name,
					scr = pois[key].scr,
					td = document.createElement('td'),
					div = document.createElement('div'),
					li = document.createElement('li'),
					icon = document.createElement('div'),
					p = document.createElement('p');
					
					bns[m] = (pois[key].type == 1) ? Math.round(pois[key].range[2] * (1 + multiplier[rank]/100)).format() :
													Math.round(pois[key].range[3] * (1 + multiplier[rank]/100)) + "%";
					poiRank[m] = pois[key].rank + " (" + multiplier[rank] + "%)";
					score[m] = (pois[key].scr).format();
					tier[m] = (max == 0) ? 0 : pois[key].range[4];
					nextTier[m] = (max == 0) ? 1 : (max - scr + 1).format();
					nextBns[m] = (pois[key].type == 1) ? Math.round(bonus[tier[m]][2] * (1 + multiplier[rank]/100)).format() :
													Math.round(bonus[tier[m]][3] * (1 + multiplier[rank]/100)) + "%";
				
				var h = (scr == 0) ? 0 : Math.round((scr - min)/(max - min) * 100);
		
				div.css(style.graph.div);
				div.style.backgroundColor = color;
				div.style.height = h * 2 - 3 + 'px';
				td.css(style.graph.td);
				td.appendChild(div);
				gc.appendChild(td);
				icon.css(style.icon.div);
				icon.style.backgroundColor = color;
				p.appendChild(document.createTextNode(name));
				p.css(style.icon.p);
				li.css(style.icon.li);
				li.appendChild(icon);
				li.appendChild(p);
				ul.appendChild(li);
				m++;
			}
			addRow('Tier', tier, table);
			addRow('Alliance Rank', poiRank, table);		
			addRow('Score', score, table);
			addRow('Next Tier Requires', nextTier, table);
			addRow('Bonus', bns, table, 1);
			addRow('Next Tier Bonus', nextBns, table);
			document.getElementById(id).appendChild(table);
		}		
		setLayout();
	};

	function ccta_apa_loader(){
		var qx = window["qx"];
		var ClientLib = window["ClientLib"];
		var webfrontend = window["webfrontend"];
		
		if ((typeof ClientLib == 'undefined') || (typeof qx == 'undefined') || (qx.core.Init.getApplication().initDone == false))
		{
			setTimeout(ccta_apa_loader, 10000);
			console.log('retrying....');
			return;
		}
		else {
			ccta_apa();
		}
	}
	
	function ccta_apa_startup(){
		setTimeout(ccta_apa_loader, 10000);
	};
	
	ccta_apa_startup();
})();
*/


// ================================================  WarChiefs - Tiberium Alliances Upgrade Base/Defense/Army  =================================================
(function () {
    var injectFunction = function () {
        function createClasses() {
            qx.Class.define("Upgrade", {
                type: "singleton",
                extend: qx.core.Object,
                construct: function () {
                    try {
                        var qxApp = qx.core.Init.getApplication();

                        this.btnUpgrade = new qx.ui.form.Button(qxApp.tr("tnf:toggle upgrade mode"), "FactionUI/icons/icon_building_detail_upgrade.png").set({
                            toolTipText: qxApp.tr("tnf:toggle upgrade mode"),
                            alignY: "middle",
                            show: "icon",
                            width : 60,
                            allowGrowX : false,
                            allowGrowY : false,
                            appearance : "button"
                        });
                        this.btnClick = this.btnUpgrade.addListener("click", this.openBase, this);

                        var playArea = qx.core.Init.getApplication().getPlayArea();
                        var btnTrade = playArea.getHUD().getUIItem(ClientLib.Data.Missions.PATH.WDG_TRADE);
                        btnTrade.getLayoutParent().addAfter(this.btnUpgrade, btnTrade);

                        phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, this.onViewChanged);
                    } catch (e) {
                        console.log("Error setting up Upgrade Constructor: ");
                        console.log(e.toString());
                    }
                },
                destruct: function () {},
                members: {
                    btnUpgrade: null,
                    btnClick: null,
                    onViewChanged: function (oldMode, newMode) {
                        this.btnUpgrade.removeListenerById(this.btnClick);
                        Upgrade.Base.getInstance().close();
                        Upgrade.Defense.getInstance().close();
                        Upgrade.Army.getInstance().close();
                        switch (newMode) {
                        case ClientLib.Vis.Mode.City:
                            this.btnUpgrade.show();
                            this.btnClick = this.btnUpgrade.addListener("click", this.openBase, this);
                            break;
                        case ClientLib.Vis.Mode.DefenseSetup:
                            this.btnUpgrade.show();
                            this.btnClick = this.btnUpgrade.addListener("click", this.openDefense, this);
                            break;
                        case ClientLib.Vis.Mode.ArmySetup:
                            this.btnUpgrade.show();
                            this.btnClick = this.btnUpgrade.addListener("click", this.openArmy, this);
                            break;
                        default:
                            this.btnUpgrade.hide();
                            break;
                        }
                    },
                    openBase: function () {
                        if (Upgrade.Base.getInstance().isVisible()) Upgrade.Base.getInstance().close();
                        else Upgrade.Base.getInstance().open();
                    },
                    openDefense: function () {
                        if (Upgrade.Defense.getInstance().isVisible()) Upgrade.Defense.getInstance().close();
                        else Upgrade.Defense.getInstance().open();
                    },
                    openArmy: function () {
                        if (Upgrade.Army.getInstance().isVisible()) Upgrade.Army.getInstance().close();
                        else Upgrade.Army.getInstance().open();
                    }
                }
            });
            qx.Class.define("Upgrade.Base", {
                type: "singleton",
                extend: qx.ui.window.Window,
                construct: function () {
                    try {
                        var qxApp = qx.core.Init.getApplication();
                        this.base(arguments);
                        this.set({
                            layout: new qx.ui.layout.VBox().set({ spacing: 0 }),
                            caption: qxApp.tr("tnf:toggle upgrade mode") + ": " + qxApp.tr("tnf:base"),
                            icon: "FactionUI/icons/icon_arsnl_base_buildings.png",
                            contentPadding: 5,
                            contentPaddingTop: 0,
                            allowMaximize: false,
                            showMaximize: false,
                            allowMinimize: false,
                            showMinimize: false,
                            resizable: false
                        });
                        this.getChildControl("icon").set({ width : 18, height : 18, scale : true, alignY : "middle" });

                        var cntCurrent = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ padding: 5, decorator: "pane-light-opaque" });
                        cntCurrent.add(new qx.ui.basic.Label("Upgrade current building").set({ alignX: "center", font: "font_size_14_bold" }));
                        this.lblCurrent = new qx.ui.basic.Label("Selected building: -");
                        cntCurrent.add(this.lblCurrent);
                        var cntCurrentHBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
                        cntCurrentHBox.add(new qx.ui.basic.Label("New Level:").set({ alignY: "middle" }));
                        this.txtCurrentNewLevel = new qx.ui.form.TextField().set({ width: 100 });
                        this.txtCurrentNewLevel.addListener("input", this.onCurrentNewLevelInput, this);
                        cntCurrentHBox.add(this.txtCurrentNewLevel);
                        var btnCurrent = new qx.ui.form.Button(qxApp.tr("tnf:toggle upgrade mode"), "FactionUI/icons/icon_building_detail_upgrade.png");
                        btnCurrent.addListener("execute", this.upgradeCurrent, this);
                        cntCurrentHBox.add(btnCurrent);
                        cntCurrent.add(cntCurrentHBox);
                        var cntCurrentRes = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
                        cntCurrentRes.add(new qx.ui.basic.Label(qxApp.tr("tnf:requires:")));
                        cntCurrentRes.add(this.lblCurrentTib = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_tiberium.png"));
                        this.lblCurrentTib.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        cntCurrentRes.add(this.lblCurrentPow = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_power.png"));
                        this.lblCurrentPow.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        cntCurrent.add(cntCurrentRes);
                        this.add(cntCurrent);

                        var cntAll = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ padding: 5, decorator: "pane-light-opaque" });
                        cntAll.add(new qx.ui.basic.Label("Upgrade all buildings").set({ alignX: "center", font: "font_size_14_bold" }));
                        var cntAllHBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
                        cntAllHBox.add(new qx.ui.basic.Label("New Level:").set({ alignY: "middle" }));
                        this.txtAllNewLevel = new qx.ui.form.TextField().set({ width: 100 });
                        this.txtAllNewLevel.addListener("input", this.onAllNewLevelInput, this);
                        cntAllHBox.add(this.txtAllNewLevel);
                        var btnAll = new qx.ui.form.Button(qxApp.tr("tnf:toggle upgrade mode"), "FactionUI/icons/icon_building_detail_upgrade.png");
                        btnAll.addListener("execute", this.upgradeAll, this);
                        cntAllHBox.add(btnAll);
                        cntAll.add(cntAllHBox);
                        var cntAllRes = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
                        cntAllRes.add(new qx.ui.basic.Label(qxApp.tr("tnf:requires:")));
                        cntAllRes.add(this.lblAllTib = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_tiberium.png"));
                        this.lblAllTib.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        cntAllRes.add(this.lblAllPow = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_power.png"));
                        this.lblAllPow.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        cntAll.add(cntAllRes);
                        this.add(cntAll);


                        this.addListener("close", this.onClose, this);
                        phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "SelectionChange", ClientLib.Vis.SelectionChange, this, this.onSelectionChange);
                    } catch (e) {
                        console.log("Error setting up Upgrade.Base Constructor: ");
                        console.log(e.toString());
                    }
                },
                destruct: function () {},
                members: {
                    lblCurrent: null,
                    lblCurrentTib: null,
                    lblCurrentPow: null,
                    txtCurrentNewLevel: null,
                    Current: null,
                    lblAllTib: null,
                    lblAllPow: null,
                    txtAllNewLevel: null,
                    onClose: function () {
                            this.lblCurrent.setValue("Selected building: -");
                            this.txtCurrentNewLevel.resetValue();
                            this.Current = null;
                            this.txtAllNewLevel.resetValue();
                    },
                    onSelectionChange: function(oldObj, newObj) {
                        if (newObj != null && newObj.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.CityBuildingType) {
                            this.Current = newObj;
                            var name = newObj.get_BuildingName();
                            var level = newObj.get_BuildingLevel();
                            this.lblCurrent.setValue("Selected building: " + name + " (" + level.toString() + ")");
                            this.onCurrentNewLevelInput();
                        }
                    },
                    onCurrentNewLevelInput: function () {
                        var newLevel = parseInt(this.txtCurrentNewLevel.getValue(), 10);
                        if (newLevel > 0) {
                            var obj = this.Current;
                            if (obj !== null && obj.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.CityBuildingType && newLevel > obj.get_BuildingLevel()) {
                                var costs = ClientLib.API.City.GetInstance().GetUpgradeCostsForBuildingToLevel(obj.get_BuildingDetails(), newLevel);
                                var Tib = 0;
                                var Pow = 0;
                                for (var i = 0; i < costs.length; i++) {
                                    var uCosts = costs[i];
                                    var cType = parseInt(uCosts.Type, 10);
                                    switch (cType) {
                                    case ClientLib.Base.EResourceType.Tiberium:
                                        Tib += uCosts.Count;
                                        break;
                                    case ClientLib.Base.EResourceType.Power:
                                        Pow += uCosts.Count;
                                        break;
                                    }
                                }
                                this.lblCurrentTib.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Tib));
                                this.lblCurrentTib.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Tib));
                                this.lblCurrentTib.setToolTipIcon("webfrontend/ui/common/icn_res_tiberium.png");
                                if (Tib === 0) this.lblCurrentTib.exclude();
                                else this.lblCurrentTib.show();
                                this.lblCurrentPow.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Pow));
                                this.lblCurrentPow.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Pow));
                                this.lblCurrentPow.setToolTipIcon("webfrontend/ui/common/icn_res_power.png");
                                if (Pow === 0) this.lblCurrentPow.exclude();
                                else this.lblCurrentPow.show();
                            } else {
                                this.lblCurrentTib.setLabel("-");
                                this.lblCurrentTib.resetToolTipText();
                                this.lblCurrentTib.resetToolTipIcon();
                                this.lblCurrentTib.show();
                                this.lblCurrentPow.setLabel("-");
                                this.lblCurrentPow.resetToolTipText();
                                this.lblCurrentPow.resetToolTipIcon();
                                this.lblCurrentPow.show();
                            }
                        } else {
                            this.lblCurrentTib.setLabel("-");
                            this.lblCurrentTib.resetToolTipText();
                            this.lblCurrentTib.resetToolTipIcon();
                            this.lblCurrentTib.show();
                            this.lblCurrentPow.setLabel("-");
                            this.lblCurrentPow.resetToolTipText();
                            this.lblCurrentPow.resetToolTipIcon();
                            this.lblCurrentPow.show();
                        }
                    },
                    upgradeCurrent: function() {
                        var newLevel = parseInt(this.txtCurrentNewLevel.getValue(), 10);
                        if (newLevel > 0) {
                            var obj = this.Current;
                            if (obj !== null && obj.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.CityBuildingType && newLevel > obj.get_BuildingLevel()) {
                                ClientLib.API.City.GetInstance().UpgradeBuildingToLevel(obj.get_BuildingDetails(), newLevel);
                                this.onSelectionChange(null, this.Current);
                            }
                        }
                        this.txtCurrentNewLevel.setValue("");
                    },
                    onAllNewLevelInput: function () {
                        var newLevel = parseInt(this.txtAllNewLevel.getValue(), 10);
                        var costs = ClientLib.API.City.GetInstance().GetUpgradeCostsForAllBuildingsToLevel(newLevel);
                        if (newLevel > 0 && costs !== null) {
                            var Tib = 0;
                            var Pow = 0;
                            for (var i = 0; i < costs.length; i++) {
                                var uCosts = costs[i];
                                var cType = parseInt(uCosts.Type, 10);
                                switch (cType) {
                                case ClientLib.Base.EResourceType.Tiberium:
                                    Tib += uCosts.Count;
                                    break;
                                case ClientLib.Base.EResourceType.Power:
                                    Pow += uCosts.Count;
                                    break;
                                }
                            }
                            this.lblAllTib.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Tib));
                            this.lblAllTib.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Tib));
                            this.lblAllTib.setToolTipIcon("webfrontend/ui/common/icn_res_tiberium.png");
                            if (Tib === 0) this.lblAllTib.exclude();
                            else this.lblAllTib.show();
                            this.lblAllPow.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Pow));
                            this.lblAllPow.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Pow));
                            this.lblAllPow.setToolTipIcon("webfrontend/ui/common/icn_res_power.png");
                            if (Pow === 0) this.lblAllPow.exclude();
                            else this.lblAllPow.show();
                        } else {
                            this.lblAllTib.setLabel("-");
                            this.lblAllTib.resetToolTipText();
                            this.lblAllTib.resetToolTipIcon();
                            this.lblAllTib.show();
                            this.lblAllPow.setLabel("-");
                            this.lblAllPow.resetToolTipText();
                            this.lblAllPow.resetToolTipIcon();
                            this.lblAllPow.show();
                        }
                    },
                    upgradeAll: function() {
                        var newLevel = parseInt(this.txtAllNewLevel.getValue(), 10);
                        if (newLevel > 0) ClientLib.API.City.GetInstance().UpgradeAllBuildingsToLevel(newLevel);
                        this.txtAllNewLevel.setValue("");
                    }
                }
            });
            qx.Class.define("Upgrade.Defense", {
                type: "singleton",
                extend: qx.ui.window.Window,
                construct: function () {
                    try {
                        var qxApp = qx.core.Init.getApplication();
                        this.base(arguments);
                        this.set({
                            layout: new qx.ui.layout.VBox().set({ spacing: 0 }),
                            caption: qxApp.tr("tnf:toggle upgrade mode") + ": " + qxApp.tr("tnf:defense"),
                            icon: "FactionUI/icons/icon_def_army_points.png",
                            contentPadding: 5,
                            contentPaddingTop: 0,
                            allowMaximize: false,
                            showMaximize: false,
                            allowMinimize: false,
                            showMinimize: false,
                            resizable: false
                        });
                        this.getChildControl("icon").set({ width : 18, height : 18, scale : true, alignY : "middle" });

                        var cntCurrent = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ padding: 5, decorator: "pane-light-opaque" });
                        cntCurrent.add(new qx.ui.basic.Label("Upgrade current defense unit").set({ alignX: "center", font: "font_size_14_bold" }));
                        this.lblCurrent = new qx.ui.basic.Label("Selected defense unit: -");
                        cntCurrent.add(this.lblCurrent);
                        var cntCurrentHBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
                        cntCurrentHBox.add(new qx.ui.basic.Label("New Level:").set({ alignY: "middle" }));
                        this.txtCurrentNewLevel = new qx.ui.form.TextField().set({ width: 100 });
                        this.txtCurrentNewLevel.addListener("input", this.onCurrentNewLevelInput, this);
                        cntCurrentHBox.add(this.txtCurrentNewLevel);
                        var btnCurrent = new qx.ui.form.Button(qxApp.tr("tnf:toggle upgrade mode"), "FactionUI/icons/icon_building_detail_upgrade.png");
                        btnCurrent.addListener("execute", this.upgradeCurrent, this);
                        cntCurrentHBox.add(btnCurrent);
                        cntCurrent.add(cntCurrentHBox);
                        var cntCurrentRes = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));

                        cntCurrentRes.add(new qx.ui.basic.Label(qxApp.tr("tnf:requires:")));
                        cntCurrentRes.add(this.lblCurrentTib = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_tiberium.png"));
                        this.lblCurrentTib.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        cntCurrentRes.add(this.lblCurrentCry = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_chrystal.png"));
                        this.lblCurrentCry.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        cntCurrentRes.add(this.lblCurrentPow = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_power.png"));
                        this.lblCurrentPow.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        cntCurrent.add(cntCurrentRes);
                        this.add(cntCurrent);

                        var cntAll = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ padding: 5, decorator: "pane-light-opaque" });
                        cntAll.add(new qx.ui.basic.Label("Upgrade all defense units").set({ alignX: "center", font: "font_size_14_bold" }));
                        var cntAllHBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
                        cntAllHBox.add(new qx.ui.basic.Label("New Level:").set({ alignY: "middle" }));
                        this.txtAllNewLevel = new qx.ui.form.TextField().set({ width: 100 });
                        this.txtAllNewLevel.addListener("input", this.onAllNewLevelInput, this);
                        cntAllHBox.add(this.txtAllNewLevel);
                        var btnAll = new qx.ui.form.Button(qxApp.tr("tnf:toggle upgrade mode"), "FactionUI/icons/icon_building_detail_upgrade.png");
                        btnAll.addListener("execute", this.upgradeAll, this);
                        cntAllHBox.add(btnAll);
                        cntAll.add(cntAllHBox);
                        var cntAllRes = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
                        cntAllRes.add(new qx.ui.basic.Label(qxApp.tr("tnf:requires:")));
                        cntAllRes.add(this.lblAllTib = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_tiberium.png"));
                        this.lblAllTib.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        cntAllRes.add(this.lblAllCry = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_chrystal.png"));
                        this.lblAllCry.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        cntAllRes.add(this.lblAllPow = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_power.png"));
                        this.lblAllPow.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        cntAll.add(cntAllRes);
                        this.add(cntAll);

                        this.addListener("close", this.onClose, this);
                        phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "SelectionChange", ClientLib.Vis.SelectionChange, this, this.onSelectionChange);
                    } catch (e) {
                        console.log("Error setting up Upgrade.Defense Constructor: ");
                        console.log(e.toString());
                    }
                },
                destruct: function () {},
                members: {
                    lblCurrent: null,
                    lblCurrentTib: null,
                    lblCurrentCry: null,
                    lblCurrentPow: null,
                    txtCurrentNewLevel: null,
                    Current: null,
                    lblAllTib: null,
                    lblAllCry: null,
                    lblAllPow: null,
                    txtAllNewLevel: null,
                    onClose: function () {
                            this.lblCurrent.setValue("Selected defense unit: -");
                            this.txtCurrentNewLevel.resetValue();
                            this.Current = null;
                            this.txtAllNewLevel.resetValue();
                    },
                    onSelectionChange: function(oldObj, newObj) {
                        if (newObj != null && newObj.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.DefenseUnitType) {
                            this.Current = newObj;
                            var name = newObj.get_UnitName();
                            var level = newObj.get_UnitLevel();
                            this.lblCurrent.setValue("Selected defense unit: " + name + " (" + level.toString() + ")");
                            this.onCurrentNewLevelInput();
                        }
                    },
                    onCurrentNewLevelInput: function () {
                        var newLevel = parseInt(this.txtCurrentNewLevel.getValue(), 10);
                        if (newLevel > 0) {
                            var obj = this.Current;
                            if (obj !== null && obj.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.DefenseUnitType && newLevel > obj.get_UnitLevel()) {
                                var costs = ClientLib.API.Defense.GetInstance().GetUpgradeCostsForUnitToLevel(obj.get_UnitDetails(), newLevel);
                                var Tib = 0;
                                var Cry = 0;
                                var Pow = 0;
                                for (var i = 0; i < costs.length; i++) {
                                    var uCosts = costs[i];
                                    var cType = parseInt(uCosts.Type, 10);
                                    switch (cType) {
                                    case ClientLib.Base.EResourceType.Tiberium:
                                        Tib += uCosts.Count;
                                        break;
                                    case ClientLib.Base.EResourceType.Crystal:
                                        Cry += uCosts.Count;
                                        break;
                                    case ClientLib.Base.EResourceType.Power:
                                        Pow += uCosts.Count;
                                        break;
                                    }
                                }
                                this.lblCurrentTib.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Tib));
                                this.lblCurrentTib.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Tib));
                                this.lblCurrentTib.setToolTipIcon("webfrontend/ui/common/icn_res_tiberium.png");
                                if (Tib === 0) this.lblCurrentTib.exclude();
                                else this.lblCurrentTib.show();
                                this.lblCurrentCry.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Cry));
                                this.lblCurrentCry.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Cry));
                                this.lblCurrentCry.setToolTipIcon("webfrontend/ui/common/icn_res_chrystal.png");
                                if (Cry === 0) this.lblCurrentCry.exclude();
                                else this.lblCurrentCry.show();
                                this.lblCurrentPow.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Pow));
                                this.lblCurrentPow.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Pow));
                                this.lblCurrentPow.setToolTipIcon("webfrontend/ui/common/icn_res_power.png");
                                if (Pow === 0) this.lblCurrentPow.exclude();
                                else this.lblCurrentPow.show();
                            } else {
                                this.lblCurrentTib.setLabel("-");
                                this.lblCurrentTib.resetToolTipText();
                                this.lblCurrentTib.resetToolTipIcon();
                                this.lblCurrentTib.show();
                                this.lblCurrentCry.setLabel("-");
                                this.lblCurrentCry.resetToolTipText();
                                this.lblCurrentCry.resetToolTipIcon();
                                this.lblCurrentCry.show();
                                this.lblCurrentPow.setLabel("-");
                                this.lblCurrentPow.resetToolTipText();
                                this.lblCurrentPow.resetToolTipIcon();
                                this.lblCurrentPow.show();
                            }
                        } else {
                            this.lblCurrentTib.setLabel("-");
                            this.lblCurrentTib.resetToolTipText();
                            this.lblCurrentTib.resetToolTipIcon();
                            this.lblCurrentTib.show();
                            this.lblCurrentCry.setLabel("-");
                            this.lblCurrentCry.resetToolTipText();
                            this.lblCurrentCry.resetToolTipIcon();
                            this.lblCurrentCry.show();
                            this.lblCurrentPow.setLabel("-");
                            this.lblCurrentPow.resetToolTipText();
                            this.lblCurrentPow.resetToolTipIcon();
                            this.lblCurrentPow.show();
                        }
                    },
                    upgradeCurrent: function() {
                        var newLevel = parseInt(this.txtCurrentNewLevel.getValue(), 10);
                        if (newLevel > 0) {
                            var obj = this.Current;
                            if (obj !== null && obj.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.DefenseUnitType)
                                ClientLib.API.Defense.GetInstance().UpgradeUnitToLevel(obj.get_UnitDetails(), newLevel);
                                this.onSelectionChange(null, this.Current);
                        }
                        this.txtCurrentNewLevel.setValue("");
                    },
                    onAllNewLevelInput: function () {
                        var newLevel = parseInt(this.txtAllNewLevel.getValue(), 10);
                        var costs = ClientLib.API.Defense.GetInstance().GetUpgradeCostsForAllUnitsToLevel(newLevel);
                        if (newLevel > 0 && costs !== null) {
                        debug = costs;
                            var Tib = 0;
                            var Cry = 0;
                            var Pow = 0;
                            for (var i = 0; i < costs.length; i++) {
                                var uCosts = costs[i];
                                var cType = parseInt(uCosts.Type, 10);
                                switch (cType) {
                                case ClientLib.Base.EResourceType.Tiberium:
                                    Tib += uCosts.Count;
                                    break;
                                case ClientLib.Base.EResourceType.Crystal:
                                    Cry += uCosts.Count;
                                    break;
                                case ClientLib.Base.EResourceType.Power:
                                    Pow += uCosts.Count;
                                    break;
                                }
                            }
                            this.lblAllTib.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Tib));
                            this.lblAllTib.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Tib));
                            this.lblAllTib.setToolTipIcon("webfrontend/ui/common/icn_res_tiberium.png");
                            if (Tib === 0) this.lblAllTib.exclude();
                            else this.lblAllTib.show();
                            this.lblAllCry.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Cry));
                            this.lblAllCry.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Cry));
                            this.lblAllCry.setToolTipIcon("webfrontend/ui/common/icn_res_chrystal.png");
                            if (Cry === 0) this.lblAllCry.exclude();
                            else this.lblAllCry.show();
                            this.lblAllPow.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Pow));
                            this.lblAllPow.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Pow));
                            this.lblAllPow.setToolTipIcon("webfrontend/ui/common/icn_res_power.png");
                            if (Pow === 0) this.lblAllPow.exclude();
                            else this.lblAllPow.show();
                        } else {
                            this.lblAllTib.setLabel("-");
                            this.lblAllTib.resetToolTipText();
                            this.lblAllTib.resetToolTipIcon();
                            this.lblAllTib.show();
                            this.lblAllCry.setLabel("-");
                            this.lblAllCry.resetToolTipText();
                            this.lblAllCry.resetToolTipIcon();
                            this.lblAllCry.show();
                            this.lblAllPow.setLabel("-");
                            this.lblAllPow.resetToolTipText();
                            this.lblAllPow.resetToolTipIcon();
                            this.lblAllPow.show();
                        }
                    },
                    upgradeAll: function() {
                        var newLevel = parseInt(this.txtAllNewLevel.getValue(), 10);
                        if (newLevel > 0) ClientLib.API.Defense.GetInstance().UpgradeAllUnitsToLevel(newLevel);
                        this.txtAllNewLevel.setValue("");
                    }
                }
            });
            qx.Class.define("Upgrade.Army", {
                type: "singleton",
                extend: qx.ui.window.Window,
                construct: function () {
                    try {
                        var qxApp = qx.core.Init.getApplication();
                        this.base(arguments);
                        this.set({
                            layout: new qx.ui.layout.VBox().set({ spacing: 0 }),
                            caption: qxApp.tr("tnf:toggle upgrade mode") + ": " + qxApp.tr("tnf:offense"),
                            icon: "FactionUI/icons/icon_army_points.png",
                            contentPadding: 5,
                            contentPaddingTop: 0,
                            allowMaximize: false,
                            showMaximize: false,
                            allowMinimize: false,
                            showMinimize: false,
                            resizable: false
                        });
                        this.getChildControl("icon").set({ width : 18, height : 18, scale : true, alignY : "middle" });

                        var cntCurrent = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ padding: 5, decorator: "pane-light-opaque" });
                        cntCurrent.add(new qx.ui.basic.Label("Upgrade current army unit").set({ alignX: "center", font: "font_size_14_bold" }));
                        this.lblCurrent = new qx.ui.basic.Label("Selected army unit: -");
                        cntCurrent.add(this.lblCurrent);
                        var cntCurrentHBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
                        cntCurrentHBox.add(new qx.ui.basic.Label("New Level:").set({ alignY: "middle" }));
                        this.txtCurrentNewLevel = new qx.ui.form.TextField().set({ width: 100 });
                        this.txtCurrentNewLevel.addListener("input", this.onCurrentNewLevelInput, this);
                        cntCurrentHBox.add(this.txtCurrentNewLevel);
                        var btnCurrent = new qx.ui.form.Button(qxApp.tr("tnf:toggle upgrade mode"), "FactionUI/icons/icon_building_detail_upgrade.png");
                        btnCurrent.addListener("execute", this.upgradeCurrent, this);
                        cntCurrentHBox.add(btnCurrent);
                        cntCurrent.add(cntCurrentHBox);
                        var cntCurrentRes = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
                        cntCurrentRes.add(new qx.ui.basic.Label(qxApp.tr("tnf:requires:")));
                        cntCurrentRes.add(this.lblCurrentCry = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_chrystal.png"));
                        this.lblCurrentCry.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        cntCurrentRes.add(this.lblCurrentPow = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_power.png"));
                        this.lblCurrentPow.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        cntCurrent.add(cntCurrentRes);
                        this.add(cntCurrent);

                        var cntAll = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ padding: 5, decorator: "pane-light-opaque" });
                        cntAll.add(new qx.ui.basic.Label("Upgrade all army units").set({ alignX: "center", font: "font_size_14_bold" }));
                        var cntAllHBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
                        cntAllHBox.add(new qx.ui.basic.Label("New Level:").set({ alignY: "middle" }));
                        this.txtAllNewLevel = new qx.ui.form.TextField().set({ width: 100 });
                        this.txtAllNewLevel.addListener("input", this.onAllNewLevelInput, this);
                        cntAllHBox.add(this.txtAllNewLevel);
                        var btnAll = new qx.ui.form.Button(qxApp.tr("tnf:toggle upgrade mode"), "FactionUI/icons/icon_building_detail_upgrade.png");
                        btnAll.addListener("execute", this.upgradeAll, this);
                        cntAllHBox.add(btnAll);
                        cntAll.add(cntAllHBox);
                        var cntAllRes = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
                        cntAllRes.add(new qx.ui.basic.Label(qxApp.tr("tnf:requires:")));
                        cntAllRes.add(this.lblAllCry = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_chrystal.png"));
                        this.lblAllCry.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        cntAllRes.add(this.lblAllPow = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_power.png"));
                        this.lblAllPow.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        cntAll.add(cntAllRes);
                        this.add(cntAll);

                        this.addListener("close", this.onClose, this);
                        phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "SelectionChange", ClientLib.Vis.SelectionChange, this, this.onSelectionChange);
                    } catch (e) {
                        console.log("Error setting up Upgrade.Army Constructor: ");
                        console.log(e.toString());
                    }
                },
                destruct: function () {},
                members: {
                    lblCurrent: null,
                    lblCurrentCry: null,
                    lblCurrentPow: null,
                    txtCurrentNewLevel: null,
                    Current: null,
                    lblAllCry: null,
                    lblAllPow: null,
                    txtAllNewLevel: null,
                    onClose: function () {
                            this.lblCurrent.setValue("Selected army unit: -");
                            this.txtCurrentNewLevel.resetValue();
                            this.Current = null;
                            this.txtAllNewLevel.resetValue();
                    },
                    onSelectionChange: function(oldObj, newObj) {
                        if (newObj != null && newObj.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.ArmyUnitType) {
                            this.Current = newObj;
                            var name = newObj.get_UnitName();
                            var level = newObj.get_UnitLevel();
                            this.lblCurrent.setValue("Selected army unit: " + name + " (" + level.toString() + ")");
                            this.onCurrentNewLevelInput();
                        }
                    },
                    onCurrentNewLevelInput: function () {
                        var newLevel = parseInt(this.txtCurrentNewLevel.getValue(), 10);
                        if (newLevel > 0) {
                            var obj = this.Current;
                            if (obj !== null && obj.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.ArmyUnitType && newLevel > obj.get_UnitLevel()) {
                                var costs = ClientLib.API.Army.GetInstance().GetUpgradeCostsForUnitToLevel(obj.get_UnitDetails(), newLevel);
                                var Cry = 0;
                                var Pow = 0;
                                for (var i = 0; i < costs.length; i++) {
                                    var uCosts = costs[i];
                                    var cType = parseInt(uCosts.Type, 10);
                                    switch (cType) {
                                    case ClientLib.Base.EResourceType.Crystal:
                                        Cry += uCosts.Count;
                                        break;
                                    case ClientLib.Base.EResourceType.Power:
                                        Pow += uCosts.Count;
                                        break;
                                    }
                                }
                                this.lblCurrentCry.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Cry));
                                this.lblCurrentCry.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Cry));
                                this.lblCurrentCry.setToolTipIcon("webfrontend/ui/common/icn_res_chrystal.png");
                                if (Cry === 0) this.lblCurrentCry.exclude();
                                else this.lblCurrentCry.show();
                                this.lblCurrentPow.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Pow));
                                this.lblCurrentPow.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Pow));
                                this.lblCurrentPow.setToolTipIcon("webfrontend/ui/common/icn_res_power.png");
                                if (Pow === 0) this.lblCurrentPow.exclude();
                                else this.lblCurrentPow.show();
                            } else {
                                this.lblCurrentCry.setLabel("-");
                                this.lblCurrentCry.resetToolTipText();
                                this.lblCurrentCry.resetToolTipIcon();
                                this.lblCurrentCry.show();
                                this.lblCurrentPow.setLabel("-");
                                this.lblCurrentPow.resetToolTipText();
                                this.lblCurrentPow.resetToolTipIcon();
                                this.lblCurrentPow.show();
                            }
                        } else {
                            this.lblCurrentCry.setLabel("-");
                            this.lblCurrentCry.resetToolTipText();
                            this.lblCurrentCry.resetToolTipIcon();
                            this.lblCurrentCry.show();
                            this.lblCurrentPow.setLabel("-");
                            this.lblCurrentPow.resetToolTipText();
                            this.lblCurrentPow.resetToolTipIcon();
                            this.lblCurrentPow.show();
                        }
                    },
                    upgradeCurrent: function() {
                        var newLevel = parseInt(this.txtCurrentNewLevel.getValue(), 10);
                        if (newLevel > 0) {
                            var obj = this.Current;
                            if (obj !== null && obj.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.ArmyUnitType)
                                ClientLib.API.Army.GetInstance().UpgradeUnitToLevel(obj.get_UnitDetails(), newLevel);
                                this.onSelectionChange(null, this.Current);
                        }
                        this.txtCurrentNewLevel.setValue("");
                    },
                    onAllNewLevelInput: function () {
                        var newLevel = parseInt(this.txtAllNewLevel.getValue(), 10);
                        var costs = ClientLib.API.Army.GetInstance().GetUpgradeCostsForAllUnitsToLevel(newLevel);
                        if (newLevel > 0 && costs !== null) {
                            var Cry = 0;
                            var Pow = 0;
                            for (var i = 0; i < costs.length; i++) {
                                var uCosts = costs[i];
                                var cType = parseInt(uCosts.Type, 10);
                                switch (cType) {
                                case ClientLib.Base.EResourceType.Crystal:
                                    Cry += uCosts.Count;
                                    break;
                                case ClientLib.Base.EResourceType.Power:
                                    Pow += uCosts.Count;
                                    break;
                                }
                            }
                            this.lblAllCry.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Cry));
                            this.lblAllCry.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Cry));
                            this.lblAllCry.setToolTipIcon("webfrontend/ui/common/icn_res_chrystal.png");
                            if (Cry === 0) this.lblAllCry.exclude();
                            else this.lblAllCry.show();
                            this.lblAllPow.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Pow));
                            this.lblAllPow.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Pow));
                            this.lblAllPow.setToolTipIcon("webfrontend/ui/common/icn_res_power.png");
                            if (Pow === 0) this.lblAllPow.exclude();
                            else this.lblAllPow.show();
                        } else {
                            this.lblAllCry.setLabel("-");
                            this.lblAllCry.resetToolTipText();
                            this.lblAllCry.resetToolTipIcon();
                            this.lblAllCry.show();
                            this.lblAllPow.setLabel("-");
                            this.lblAllPow.resetToolTipText();
                            this.lblAllPow.resetToolTipIcon();
                            this.lblAllPow.show();
                        }
                    },
                    upgradeAll: function() {
                        var newLevel = parseInt(this.txtAllNewLevel.getValue(), 10);
                        if (newLevel > 0) ClientLib.API.Army.GetInstance().UpgradeAllUnitsToLevel(newLevel);
                        this.txtAllNewLevel.setValue("");
                    }
                }
            });
        }
        function waitForGame() {
            try {
                if (typeof qx != 'undefined' && typeof qx.core != 'undfined' && typeof qx.core.Init != 'undefined') {
                    var app = qx.core.Init.getApplication();
                    if (app.initDone == true) {
                        try {
                            console.log("WarChiefs - Tiberium Alliances Upgrade Base/Defense/Army: Loading");
                            createClasses();
                            Upgrade.getInstance();
                            Upgrade.Base.getInstance();
                            Upgrade.Defense.getInstance();
                            Upgrade.Army.getInstance();
                            console.log("WarChiefs - Tiberium Alliances Upgrade Base/Defense/Army: Loaded");
                        } catch (e) {
                            console.log(e);
                        }
                    } else {
                        window.setTimeout(waitForGame, 1000);
                    }
                } else {
                    window.setTimeout(waitForGame, 1000);
                }
            } catch (e) {
                console.log(e);
            }
        }
        window.setTimeout(waitForGame, 1000);
    };

    var script = document.createElement("script");
    var txt = injectFunction.toString();
    script.innerHTML = "(" + txt + ")();";
    script.type = "text/javascript";

    document.getElementsByTagName("head")[0].appendChild(script);
})();




// =================================================================  Tiberium Alliances Formation Saver  ====================================================================
(function (){
  var tafs_main = function() {
    var windowSaver;
      
    function initialize() {
      console.log("Formation Saver Loaded");

      qx.Class.define("webfrontend.gui.PlayArea.FormationSaver", {
        extend: qx.ui.container.Composite,

        construct:function() {
          qx.ui.container.Composite.call(this);
          this.setLayout(new qx.ui.layout.Canvas());
          this.add(this.init());
        },

        statics: {
          SaverCollapsedHeight: 32,
          SaverExpandedHeight: 245,
        },

        properties: {
          expanded: {init: true, apply: "expand"},
        },

        members: {
          buttonResize: null,
          containerContence: null,
          containerSaves: null,
          containerMain: null,
          buttonSave: null,

          init: function() {          
            var Y = 6;
            this.buttonResize = new webfrontend.ui.SoundButton(null, "FactionUI/icons/icon_tracker_minimise.png").set({width: 20, height: 20, appearance: "button-notif-cat", center: true, allowGrowX: false});
            this.buttonResize.addListener("click",function(e) {
              this.setExpanded(!this.getExpanded());
            }, this);
            var ba = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({alignY:"middle"})).set({margin:Y,marginRight:Y+3});
            ba.add(this.buttonResize);
            var labelTitle = new qx.ui.basic.Label("<b>Saver</b>");
            labelTitle.set({marginLeft: 4, rich: true});
            labelTitle.setTextColor("#FFFFFF");
            ba.add(labelTitle);
            this.containerContence = new qx.ui.container.Composite(new qx.ui.layout.VBox().set({alignX:"center"})).set({allowGrowX:true,marginTop:0,marginBottom:5});

            containerSaves = new qx.ui.container.Composite(new qx.ui.layout.Grid(10, 2)).set({allowGrowX: true , marginLeft: 0, marginBottom: 5});
            this.containerContence.add(containerSaves);

            buttonSave = new qx.ui.form.Button("Save");
            buttonSave.set({width: 50, appearance: "button-text-small", toolTipText: "Save attack formation", allowGrowX:false});
            buttonSave.addListener("click", this.save, this); 
            this.containerContence.add(buttonSave);

            this.containerMain=new qx.ui.container.Composite(new qx.ui.layout.VBox().set({alignX:"right"})).set({maxHeight:webfrontend.gui.PlayArea.FormationSaver.SaverExpandedHeight,width:75,minHeight:32,allowShrinkY:true,decorator:new qx.ui.decoration.VBox().set({baseImage:"webfrontend/ui/common/bgr_mission_tracker.png"})});
            this.containerMain.add(ba);
            this.containerMain.add(this.containerContence,{flex:1});

            return this.containerMain;
          },

          expand: function(bs) {
            if(!bs) {
              this.buttonResize.setIcon("FactionUI/icons/icon_tracker_maximise.png");
              this.containerMain.setMaxHeight(webfrontend.gui.PlayArea.FormationSaver.SaverCollapsedHeight);
            } else {
              this.buttonResize.setIcon("FactionUI/icons/icon_tracker_minimise.png");
              this.containerMain.setMaxHeight(webfrontend.gui.PlayArea.FormationSaver.SaverExpandedHeight);
            }
          },

          update: function() {
            containerSaves.removeAll();

            var playerCities = ClientLib.Data.MainData.GetInstance().get_Cities(); 
            var currentOwnCity = playerCities.get_CurrentOwnCity();
            var cityID = playerCities.get_CurrentCity().get_Id();
            var ownCityID = currentOwnCity.get_Id();

            var formations = this.loadFormations();
            if(!formations) {
              return;
            }
            if(!formations[cityID]) {
              return;
            }
            if(!formations[cityID][ownCityID]) {
              return;
            }

            var i = 0;
            for(var id in formations[cityID][ownCityID]) {
              if(id != 0) {
                i++;
                var formation = formations[cityID][ownCityID][id];
                var date = new Date(Number(formation.t));
                var toolTipText = "<div><span style='float: left'><b>" + formation.n + "</b></span><span style='float: right'>&nbsp;&nbsp;&nbsp;&nbsp;" + date.getHours() + ":" + (date.getMinutes() <= 9 ? "0" : "") + date.getMinutes() + " " + date.getDate() + "/" + (date.getMonth() + 1) + "</span></div><div style='clear: both;'></div>";
                if(formation.cy != null) {
                  toolTipText += formation.cy + "% Construction Yard</br>" + formation.df + "% Defense Facility</br>" + formation.ts + "% Troop Strength</br>" + this.formatSecondsAsTime(formation.r) + " Repair Time";
                }

                var labelLoad = new qx.ui.basic.Label(formation.n);
                labelLoad.set({width: 40, allowGrowX: false, toolTipText: toolTipText});
                labelLoad.setTextColor("#FFFFFF");
                labelLoad.addListener("click", this.clickLoad(formation), this);
                labelLoad.addListener("mouseover", this.mouseover(labelLoad, "#BBBBBB"), this);
                labelLoad.addListener("mouseout", this.mouseout(labelLoad, "#FFFFFF"), this);
                containerSaves.add(labelLoad, {row: i, column: 1});

                var labelDelete = new qx.ui.basic.Label("<b>X</b>");
                labelDelete.set({width: 10, allowGrowX:false, rich: true, toolTipText: "Delete " + formation.n});
                labelDelete.setTextColor("#881717");
                labelDelete.addListener("click", this.clickDeleteF(cityID, ownCityID, id), this);
                labelDelete.addListener("mouseover", this.mouseover(labelDelete, "#550909"), this);
                labelDelete.addListener("mouseout", this.mouseover(labelDelete, "#881717"), this);
                containerSaves.add(labelDelete, {row: i, column: 2});
              }
            }
          },

          mouseover: function(label, color) {
            return function() {
              label.setTextColor(color);
            }
          },

          mouseout: function(label, color) {
            return function() {
              label.setTextColor(color);
            }
          },

          save: function() {
            try {
              var playerCities = ClientLib.Data.MainData.GetInstance().get_Cities(); 
              var currentOwnCity = playerCities.get_CurrentOwnCity();
              var cityID = playerCities.get_CurrentCity().get_Id();
              var ownCityID = currentOwnCity.get_Id();
 
              var newFormation = new Object();
              newFormation.t = new Date().getTime().toString();
              newFormation.n = "";
              newFormation.l = new Array();

              var formation = currentOwnCity.get_CityArmyFormationsManager().GetFormationByTargetBaseId(cityID);
              var armyUnits = formation.get_ArmyUnits();
              if(armyUnits == null) {
                console.log("tafs Error: You must move a unit befor saving!");
                return;
              }
              armyUnits = armyUnits.l;
              for(var i in armyUnits)
              {
                var unit = armyUnits[i];
                newFormation.l[i] = new Object();
                newFormation.l[i].x = unit.get_CoordX();
                newFormation.l[i].y = unit.get_CoordY();
                newFormation.l[i].e = unit.get_Enabled();
              }

              var formations = this.loadFormations();
              if(!formations) {
                formations = new Object();
              }
              if(!formations[cityID]) {
                formations[cityID] = new Object();
              }
              if(!formations[cityID][ownCityID]) {
                formations[cityID][ownCityID] = new Array();
                formations[cityID][ownCityID][0] = 0;
              }
              formations[cityID][ownCityID][0]++;
              newFormation.n = "Save " + formations[cityID][ownCityID][0];
              

              formations[cityID][ownCityID].push(newFormation);
              this.saveFormations(formations);

              windowSaver.update();
            } catch(e) {
              console.log(e);
            }
          },

          clickLoad: function(newFormation) {
            return function() {
              this.load(newFormation);
            }
          },

          load: function(newFormation) {
            try {
              var playerCities = ClientLib.Data.MainData.GetInstance().get_Cities();
              var currentOwnCity = playerCities.get_CurrentOwnCity();
              var cityID = playerCities.get_CurrentCity().get_Id();
              
              var formation = currentOwnCity.get_CityArmyFormationsManager().GetFormationByTargetBaseId(cityID);
              var armyUnits = formation.get_ArmyUnits();
              if(armyUnits == null) {
                console.log("tafs Error: You must move a unit befor loading!");
                return;
              }
              armyUnits = armyUnits.l;

              for(var i in newFormation.l)
              {
                var unitData = newFormation.l[i];
                armyUnits[i].MoveBattleUnit(unitData.x, unitData.y);
                if(unitData.e != null) {
                  if(armyUnits[i].set_Enabled_Original) {
                    armyUnits[i].set_Enabled_Original(unitData.e);
                  } else {
                    armyUnits[i].set_Enabled(unitData.e);
                  }
                }
              }

              //formation.set_CurrentTargetBaseId(cityID);
            } catch(e) {
              console.log(e);
            }
          },

          clickDeleteF: function(cityID, ownCityID, id) {
            return function() {
              this.deleteF(cityID, ownCityID, id);
            }
          },

          deleteF: function(cityID, ownCityID, id) {
            var formations = this.loadFormations();
            if(!formations || !formations[cityID] || !formations[cityID][ownCityID])
              return;

            formations[cityID][ownCityID].splice(id, 1);
            if(formations[cityID][ownCityID].length <= 1) {
              delete formations[cityID][ownCityID];
            }
            var i
            for(i in formations[cityID]) {
              if(formations[cityID].hasOwnProperty(i)) {
                break;
              }
            }
            if(!i)
              delete formations[cityID];

            this.saveFormations(formations);

            windowSaver.update();
          },

          saveFormations: function(formations) {
            var data = JSON.stringify(formations);
            localStorage.formations = data;
          },

          loadFormations: function() {
            var formations = localStorage.formations;
            return formations && JSON.parse(formations);
          },
          
          formatSecondsAsTime: function(secs, format) {
            var hr = Math.floor(secs / 3600);
            var min = Math.floor((secs - (hr * 3600)) / 60);
            var sec = Math.floor(secs - (hr * 3600) - (min * 60));

            if(hr < 10) {
              hr = "0" + hr;
            }
            if(min < 10) {
              min = "0" + min;
            }
            if(sec < 10) {
              sec = "0" + sec;
            }
            
            return hr + ':' + min + ':' + sec;
          },
        }
      })
      
      windowSaver = new webfrontend.gui.PlayArea.FormationSaver();
      windowSaver.hide();
      qx.core.Init.getApplication().getPlayArea().add(windowSaver, {top: 55, right: -2});
      
      if(!ClientLib.Data.MainData.GetInstance().get_Cities().__tafs__set_CurrentOwnCityId) {
        ClientLib.Data.MainData.GetInstance().get_Cities().__tafs__set_CurrentOwnCityId = ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentOwnCityId;
      }
      ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentOwnCityId = function(a) {

        this.__tafs__set_CurrentOwnCityId(a); 
        updateView();
      }
      
      if(!ClientLib.Data.MainData.GetInstance().get_Cities().__tafs__set_CurrentCityId) {
        ClientLib.Data.MainData.GetInstance().get_Cities().__tafs__set_CurrentCityId = ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId;
      }
      ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId = function(a) {
        this.__tafs__set_CurrentCityId(a); 
        updateView();
      }
      
      function updateView() {
        if (PerforceChangelist >= 376877) {
          switch(qx.core.Init.getApplication().getPlayArea().getViewMode()) {
            case ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupDefense:
            case ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupBase:
              windowSaver.update();
              windowSaver.show();
              break;
            default:
              windowSaver.hide();
          }          
        } else {
          switch(qx.core.Init.getApplication().getPlayArea().getViewMode()) {
            case webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatSetupDefense:
            case webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatSetupBase:
              windowSaver.update();
              windowSaver.show();
              break;
            default:
              windowSaver.hide();
          }
        }
      }
    }

    function tafs_checkIfLoaded() {
      try {
        if (typeof qx != 'undefined') {
          a = qx.core.Init.getApplication(); // application
          mb = qx.core.Init.getApplication().getMenuBar();
          if (a && mb) {
            initialize();
          } else
            window.setTimeout(tafs_checkIfLoaded, 1000);
        } else {
          window.setTimeout(tafs_checkIfLoaded, 1000);
        }
      } catch (e) {
        if (typeof console != 'undefined') console.log(e);
        else if (window.opera) opera.postError(e);
        else GM_log(e);
      }
    }
    
    if (/commandandconquer\.com/i.test(document.domain)) {
      window.setTimeout(tafs_checkIfLoaded, 1000);
    }
  }

  // injecting, because there seem to be problems when creating game interface with unsafeWindow
  var tafsScript = document.createElement("script");
  tafsScript.innerHTML = "(" + tafs_main.toString() + ")();";
  tafsScript.type = "text/javascript";
  if (/commandandconquer\.com/i.test(document.domain)) {
    document.getElementsByTagName("head")[0].appendChild(tafsScript);
  }
})();


//======================================================= Rep-Zeit =====================================================
(function () {
  var InfoSticker_main = function () {
    try {
      function CCTAWrapperIsInstalled() {
        return (typeof (CCTAWrapper_IsInstalled) != 'undefined' && CCTAWrapper_IsInstalled);
      }
      function createInfoSticker() {
        console.log('InfoSticker loaded');
        // define Base
        qx.Class.define("InfoSticker.Base", {
          type: "singleton",
          extend: qx.core.Object,
          members: {
            /* Desktop */
			masterTimerInterval: 1000,
            initialize: function () {
              try {
                this.runMainTimer();
              } catch (e) {
                console.log("InfoSticker.initialize: ", e);
              }
            },
			checkPackageCounter: 0,
			checkPackageInterval: 5,
			mcvCounter: 0,
			mcvInterval: 1,
			runMainTimer: function () {
              try {
                var self = this;
                if(++this.mcvCounter==this.mcvInterval) {
					this.mcvCounter = 0;
					this.calculateCostsForNextMCV();
				}
                window.setTimeout(function () {
                  self.runMainTimer();
                }, this.masterTimerInterval);
              } catch (e) {
                console.log("InfoSticker.runMainTimer: ", e);
              }
            },
            mcvPopup: null,
            mcvTimerLabel: null,
            mcvInfoLabel: null,
			
            repairPopup: null,
            repairTimerLabel: null,
            repairTimerLabel1: null,
            repairTimerLabel2: null,
            repairTimerLabel3: null,
            repairInfoLabel: null,
			
            calculateCostsForNextMCV: function () {
              try {
                var player = ClientLib.Data.MainData.GetInstance().get_Player();
                var cw = player.get_Faction();
                var cj = ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Research_BaseFound, cw);
                var cr = player.get_PlayerResearch();
                var cd = cr.GetResearchItemFomMdbId(cj);
                if (!this.mcvPopup) {
                  this.mcvPopup = new qx.ui.popup.Popup(new qx.ui.layout.VBox()).set({
                    padding: 5,
                  });
                  this.mcvPopup.setPlaceMethod("widget");
                  this.mcvPopup.setPosition("right-center");
                  this.mcvPopup.setAutoHide(false);
                  this.mcvPopup.setBackgroundColor("#999999");
                  this.mcvPopup.setOpacity(0.8);
                  this.mcvPopup.setShadow(null);
                  this.mcvPopup.setDecorator(new qx.ui.decoration.Background());
                  var target = this.repairPopup;
				  if(target==null) target = qx.core.Init.getApplication().getBaseNavigationBar();
                  this.mcvPopup.placeToWidget(target, true);
                  this.mcvInfoLabel = new qx.ui.basic.Label();
                  var font = qx.bom.Font.fromString('bold').set({ size: 12 });
                  var font2 = qx.bom.Font.fromString('bold').set({ size: 12 });
                  this.mcvTimerLabel = new qx.ui.basic.Label().set({
                    font: font,
                    textColor: '#000000',
                    height: 15,
                    width: 75,
                    textAlign: 'center',
                  });
                  //this.mcvPopup.add(this.mcvInfoLabel);
                  //this.mcvPopup.add(this.mcvTimerLabel);
				  
		  this.repairInfoLabel = new qx.ui.basic.Label();
                  this.repairTimerLabel = new qx.ui.basic.Label().set({
                    font: font,
                    textColor: '#000000',
                    height: 15,
                    width: 75,
                    textAlign: 'center',
                  });
                  this.repairTimerLabel1 = new qx.ui.basic.Label().set({
                    font: font2,
                    textColor: '#000000',
                    height: 15,
                    width: 75,
                    textAlign: 'center'
                  });
                  this.repairTimerLabel2 = new qx.ui.basic.Label().set({
                    font: font2,
                    textColor: '#000000',
                    height: 15,
                    width: 75,
                    textAlign: 'center'
                  });
                  this.repairTimerLabel3 = new qx.ui.basic.Label().set({
                    font: font2,
                    textColor: '#000000',
                    height: 15,
                    width: 75,
                    textAlign: 'center'
                  });
                  this.mcvPopup.add(this.repairInfoLabel);
                  this.mcvPopup.add(this.repairTimerLabel);
                  //this.mcvPopup.add(this.repairTimerLabel1);
                  //this.mcvPopup.add(this.repairTimerLabel2);
                  //this.mcvPopup.add(this.repairTimerLabel3);
                }
				if (cd == null) {
                  if (this.mcvPopup) {
					this.mcvInfoLabel.setValue("Next MCV ($???)");
					this.mcvTimerLabel.setValue("Error");
                  }
                } else {
					var nextLevelInfo = cd.get_NextLevelInfo_Obj();
					var resourcesNeeded = new Array();
					for (var i in nextLevelInfo.rr) {
					  if (nextLevelInfo.rr[i].t > 0) {
						resourcesNeeded[nextLevelInfo.rr[i].t] = nextLevelInfo.rr[i].c;
					  }
					}
					//var researchNeeded = resourcesNeeded[ClientLib.Base.EResourceType.ResearchPoints];
					//var currentResearchPoints = player.get_ResearchPoints();
					var creditsNeeded = resourcesNeeded[ClientLib.Base.EResourceType.Gold];
					var creditsResourceData = player.get_Credits();
					var creditGrowthPerHour = (creditsResourceData.Delta + creditsResourceData.ExtraBonusDelta) * ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour();
					var creditTimeLeftInHours = (creditsNeeded - player.GetCreditsCount()) / creditGrowthPerHour;
					
					this.mcvInfoLabel.setValue("Next MCV ($ " + this.formatNumbersCompact(creditsNeeded) + ")");
					if(creditTimeLeftInHours <= 0) {
						this.mcvTimerLabel.setValue("Ready");
					} else if(creditGrowthPerHour == 0) {
						this.mcvTimerLabel.setValue("Never");
					} else {
						this.mcvTimerLabel.setValue(this.FormatTimespan(creditTimeLeftInHours * 60 * 60));
					}
				}
				
				var ncity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
				var citynamerep = ncity.get_Name()
                if (ncity == null) {
                  if (this.mcvPopup) {
				    this.repairInfoLabel.setValue(citynamerep);
					this.repairTimerLabel.setValue(citynamerep);
                  }
                } else {
					this.repairInfoLabel.setValue(citynamerep);
					
					var rt = Math.min(ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf),
										ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh),
										ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir));
					if(ncity.get_CityUnitsData().get_UnitLimitOffense() == 0) {
						this.repairTimerLabel.setValue("none Off");
					} else {
						this.repairTimerLabel.setValue(this.FormatTimespan(rt));
						this.repairTimerLabel1.setValue(this.FormatTimespan(ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf)));
						this.repairTimerLabel2.setValue(this.FormatTimespan(ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh)));
						this.repairTimerLabel3.setValue(this.FormatTimespan(ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir)));
					}
				}
 				if (!this.mcvPopup.isVisible()) {
				  this.mcvPopup.show();
				}
             } catch (e) {
                console.log("calculateCostsForNextMCV", e);
              }
            },
              formatNumbersCompact: function(value) {
                  if(value < 10 * 1000) return value.toString();
                  if(value < 10 * 1000 * 1000) return (value/1000).toString()+"k";
                  if(value < 10 * 1000 * 1000 * 1000) return (value/1000000).toString()+"M";
                  else return (value/1000000).toString()+"G";
              },
			FormatTimespan: function(value) {
				var t = ClientLib.Vis.VisMain.FormatTimespan(value);
				var colonCount = 0;
				for(var i=0;i<t.length;i++) {
					if(t.charAt(i) == ':') colonCount++;
				}
				var r = "";
				for(var i=0;i<t.length;i++) {
					if(t.charAt(i) == ':') {
						if(colonCount>2) {
							r+="d ";
						}
						else {
							r+=t.charAt(i);
						}
						colonCount--;
					} else {
						r+=t.charAt(i);
					}
				}
			  return r;
			}
          }
        });
      }
    } catch (e) {
      console.log("createInfoSticker: ", e);
    }
    function InfoSticker_checkIfLoaded() {
      try {
        if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible()) {
          createInfoSticker();
          window.InfoSticker.Base.getInstance().initialize();
        } else {
          window.setTimeout(InfoSticker_checkIfLoaded, 1000);
        }
      } catch (e) {
        console.log("InfoSticker_checkIfLoaded: ", e);
      }
    }
    if (/commandandconquer\.com/i.test(document.domain)) {
      window.setTimeout(InfoSticker_checkIfLoaded, 1000);
    }
  }
  try {
    var InfoStickerScript = document.createElement("script");
    InfoStickerScript.innerHTML = "(" + InfoSticker_main.toString() + ")();";
    InfoStickerScript.type = "text/javascript";
    if (/commandandconquer\.com/i.test(document.domain)) {
      document.getElementsByTagName("head")[0].appendChild(InfoStickerScript);
    }
  } catch (e) {
    console.log("InfoSticker: init error: ", e);
  }
})();
