// ==UserScript==
// @name		Eldas All in One
// @namespace	https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include		https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @icon		https://prodgame13.alliances.commandandconquer.com/146/favicon.ico
// @version		2.11
// @date		2013-04-17
// @author		Elda1990
// @description	Eldas All in One V2
// @downloadURL	http://userscripts.org/scripts/source/159255.user.js
// @updateURL	http://userscripts.org/scripts/source/159255.meta.js
// ==/UserScript==

var aio_script_num = 159255;


//--------------
// Eldas Loader
//--------------

try {
	var elda_addon_info = new Array();
	
	
	function elda_get_addon_info(id) {
		if(elda_addon_info[id]) {
			return elda_addon_info[id];
		}
		return false;
	}
		
	function elda_hastoload(id) {
		var info = elda_get_addon_info(id);
		if(info) {
			if(info['can_disabled'] == false) return true;
		}
		
		if(!unsafeWindow.localStorage) { return true; }
		if(!unsafeWindow.localStorage['Elda.notload.'+id]) { return true; }
		if(unsafeWindow.localStorage['Elda.notload.'+id] == false) { return true; }
		if(unsafeWindow.localStorage['Elda.notload.'+id] == true) { return false; }
		if(unsafeWindow.localStorage['Elda.notload.'+id] == "false") { return true; }
		if(unsafeWindow.localStorage['Elda.notload.'+id] == "true") { return false; }
		
		
		console.log("[Elda-Loader] no infos for id: "+id,unsafeWindow.localStorage);
		return true;
	}
		
	
	function elda_hasload(id) {
		var info = elda_get_addon_info(id);
		if(info) {
			console.log("[Elda-Loader] Load: " + info['name'] + " ["+info['version']+"]");
			elda_addon_info[id]['loaded'] = true;
		}
	}

	function elda_hasnotload(id) {
		var info = elda_get_addon_info(id);
		if(info) {
			console.log("[Elda-Loader] Disabled: " + info['name'] + " ["+info['version']+"]");
			elda_addon_info[id]['loaded'] = false;
		}
	}
	
	function elda_disable_addon(id) {
		var info = elda_get_addon_info(id);
		if(info) {
			if(info['can_disabled'] != false) {
				unsafeWindow.localStorage['Elda.notload.'+id] = true;
			}
		}
	}
	
	function elda_enable_addon(id) {
		unsafeWindow.localStorage['Elda.notload.'+id] = false;
	}
	

} catch (e) {
    GM_log(e);
	GM_log(e.name+" "+e.message);
} 

//-----------------
// Eldas Loader GUI
//-----------------
try {
(function (){
    var elda_loder_gui_load_main = function() {  
        
        var cfgBox = null;
		var gui_addons = new Array();
		var scrollContainer = null;
		var scrollbox = null;
		var tableModel = null;
		var table = null;
		
        function log_it(e){
            if (typeof console != 'undefined') console.log('[Elda-loder-GUI] ', e);
            else if (window.opera) opera.postError('[Elda-loder-GUI] '+ e);
            else GM_log('[Elda-loder-GUI] '+ e);   
        }
        
		
		//--------- ingame API
		
			
		function elda_get_addon_info(id) {
			if(elda_addon_info[id]) return elda_addon_info[id];
			return false;
		}
		
		function elda_disable_addon(id) {
			var info = elda_get_addon_info(id);
			if(info) {
				if(info['can_disabled'] != false) {
					localStorage['Elda.notload.'+id] = true;
				}
			}
		}
		
		function elda_enable_addon(id) {
			localStorage['Elda.notload.'+id] = false;
		}
		
		function elda_hastoload(id) {
			var info = elda_get_addon_info(id);
			if(info) {
				if(info['can_disabled'] == false) return true;
			}
			
			if(!localStorage) { return true; }
			if(!localStorage['Elda.notload.'+id]) { return true; }
			if(localStorage['Elda.notload.'+id] == false) { return true; }
			if(localStorage['Elda.notload.'+id] == true) { return false; }
			if(localStorage['Elda.notload.'+id] == "false") { return true; }
			if(localStorage['Elda.notload.'+id] == "true") { return false; }
			
			
			console.log("[Elda-Loader] no infos for id: "+id,localStorage);
			return true;
		}
		
		//--------------
		
		
        function closecfg(){
            cfgBox.close();
        }
        
        
		function save_cfg() {
			var data = tableModel.getDataAsMapArray();
			
			for (var key in data)
			{
				log_it(data[key]['ID'] + ': ' + data[key]['Load']);
				if(data[key]['Load'] == "true" || data[key]['Load']) {
					elda_enable_addon(data[key]['ID']);
				} else {
					elda_disable_addon(data[key]['ID']);
				}
			}
			closecfg();
			alert("Bitte Seite neu Laden! (Press F5)");
		}
		
      
        function initialize() {
            console.log("Eldas Loader GUI...");     
			
			qx.Class.define("qx.ui.table.celleditor.CheckBox",
			{
			  extend : qx.core.Object,
			  implement : qx.ui.table.ICellEditorFactory,


			  /*
			  *****************************************************************************
				 MEMBERS
			  *****************************************************************************
			  */

			  members :
			  {
				// interface implementation
				createCellEditor : function(cellInfo)
				{
				  var editor = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
					alignX: "center",
					alignY: "middle"
				  })).set({
					focusable: true
				  });

				  var checkbox = new qx.ui.form.CheckBox().set({
					value: cellInfo.value
				  });
				  editor.add(checkbox);

				  // propagate focus
				  editor.addListener("focus", function() {
					checkbox.focus();
				  });

				  // propagate active state
				  editor.addListener("activate", function() {
					checkbox.activate();
				  });

				  // propagate stopped enter key press to the editor
				  checkbox.addListener("keydown", function(e)
				  {
					if (e.getKeyIdentifier() == "Enter")
					{
					  var clone = qx.event.Pool.getInstance().getObject(qx.event.type.KeySequence);
					  var target = editor.getContainerElement().getDomElement();
					  clone.init(e.getNativeEvent(), target, e.getKeyIdentifier());
					  clone.setType("keypress");
					  qx.event.Registration.dispatchEvent(target, clone);
					}
				  }, this);

				  return editor;
				},

				// interface implementation
				getCellEditorValue : function(cellEditor) {
				  return cellEditor.getChildren()[0].getValue();
				}
			  }
			});
			
			
            var addonmenu = Addons.AddonMainMenu.getInstance();	
            addonmenu.AddMainMenu("Eldas All in One Config",function(){ cfgBox.open(); },"ALT+A"); 
            		
            cfgBox = new qx.ui.window.Window("Eldas All in One Config");
            cfgBox.setPadding(1);
            cfgBox.setLayout(new qx.ui.layout.Grow());
            cfgBox.setShowMaximize(false);
            cfgBox.setShowMinimize(false);
            cfgBox.moveTo(600, 100);
            cfgBox.setHeight(400);
            cfgBox.setWidth(500);
            cfgBox.setMinWidth(10);
            cfgBox.setMinHeight(10);
            cfgBox.setResizable(true,true,true,true);		   
								   
            var makeLbl = function(name) {
                var lbl =  new qx.ui.basic.Label(name);
                lbl.setTextColor("white");
                return lbl;
            }

			var row_count = 0;
			
			tableModel = this._tableModel = new qx.ui.table.model.Simple();
			tableModel.setColumns([ "ID", "Name", "Verion", "Load" ]);
			tableModel.setColumnEditable(0, false);
			tableModel.setColumnEditable(1, false);
			tableModel.setColumnEditable(2, false);
			tableModel.setColumnEditable(3, true);			
			
			for (var key in elda_addon_info)
			{
				if(elda_addon_info[key]['can_disabled']) {
					var rowd = new Array();
					rowd[0] = new Array();
					rowd[0][0] = elda_addon_info[key]['id'];
					rowd[0][1] = elda_addon_info[key]['name'];
					rowd[0][2] = elda_addon_info[key]['version'];
					rowd[0][3] = elda_hastoload(key);
																	
					tableModel.addRows(rowd);					
				}
			}
				

			// table
			table = new qx.ui.table.Table(tableModel);
			
			table.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION);
			
			
			var tcm = table.getTableColumnModel();
			

			var cellEditorCheckBox = new qx.ui.table.celleditor.CheckBox();
			var cellRendererBoolean = new qx.ui.table.cellrenderer.Boolean();
			
			tcm.setDataCellRenderer(3, cellRendererBoolean);
			tcm.setCellEditorFactory(3, cellEditorCheckBox);

			tcm.setColumnVisible(0,false);
			tcm.setColumnWidth(1,350);
			tcm.setColumnWidth(2,50);
			tcm.setColumnWidth(3,45);
			
			
			cfgBox.add(table);
			
			
            var bt = new qx.ui.form.Button("Save");
            bt.set({
                appearance : "button-text-small",
                toolTipText : "Save and reload"
            });
            
            bt.addListener("click", function() { save_cfg(); }, this);
            //scrollbox.add(bt,{row:row_count,column:1});
			
			//cfgBox.add(bt);		
			cfgBox.getChildControl("captionbar").add(bt,{row:0,column:5});

        }
        
        function elg_checkIfLoaded() {
            try {
                if (typeof qx != 'undefined' && typeof Addons != 'undefined') {
                    a = qx.core.Init.getApplication(); // application
                    mb = qx.core.Init.getApplication().getMenuBar();
                    addonmenu = Addons.AddonMainMenu.getInstance();
                    if (a && mb && addonmenu) {
                        initialize();
                    } else
                        window.setTimeout(elg_checkIfLoaded, 1000);
                } else {
                    window.setTimeout(elg_checkIfLoaded, 1000);
                }
            } catch (e) {
                log_it(e);
				log_it(e.name+" "+e.message);
            }
        }
        
        if (/commandandconquer\.com/i.test(document.domain)) {
            window.setTimeout(elg_checkIfLoaded, 1000);
        }
    }
    
    // injecting, because there seem to be problems when creating game interface with unsafeWindow
    var elgScript = document.createElement("script");
    elgScript.innerHTML = "(" + elda_loder_gui_load_main.toString() + ")();";
    elgScript.type = "text/javascript";
    if (/commandandconquer\.com/i.test(document.domain)) {
        document.getElementsByTagName("head")[0].appendChild(elgScript);
    }
})();

} catch (e) {
    GM_log(e);
	GM_log(e.name + " " + e.message);
} 

//---------------
// Updater
//---------------

try
{
	function updateCheck(forced)
	{
		if ((forced) || (parseInt(GM_getValue('Elda_last_update', '0')) + 86400000 <= (new Date().getTime())))
		{
			try
			{
				GM_xmlhttpRequest(
				{
					method: 'GET',
					url: 'http://userscripts.org/scripts/source/'+aio_script_num+'.meta.js?'+new Date().getTime(),
					headers: {'Cache-Control': 'no-cache'},
					onload: function(resp)
					{
						var local_version, remote_version, rt, script_name;
						
						rt=resp.responseText;
						GM_setValue('Elda_last_update', new Date().getTime()+'');
						remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
						local_version=parseInt(GM_getValue('Elda_current_version', '-1'));
						if(local_version!=-1)
						{
							script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
							GM_setValue('Elda_target_script_name', script_name);
							if (remote_version > local_version)
							{
								if(confirm('There is an update available for "'+script_name+'."\nWould you like to install now?'))
								{
									//GM_openInTab('http://userscripts.org/scripts/show/'+aio_script_num);
									GM_openInTab('http://userscripts.org/scripts/source/'+aio_script_num+'.user.js');
									GM_setValue('Elda_current_version', remote_version);
								}
							}
							else if (forced)
								alert('No update is available for "'+script_name+'."');
						}
						else
							GM_setValue('Elda_current_version', remote_version+'');
					}
				});
			}
			catch (err)
			{
				if (forced)
					alert('An error occurred while checking for updates:\n'+err);
			}
		}
	}
	GM_registerMenuCommand(GM_getValue('Elda_target_script_name', 'Eldas All in One') + ' - Update Check', function()
	{
		updateCheck(true);
	});
	updateCheck(false);
}
catch(e)
{
    GM_log(e);
	GM_log(e.name+" "+e.message);
}

//---------------
// Default Config
//---------------



try {
(function () {
  var TAI_main = function () {
  
		function log_it(e){
			if (typeof console != 'undefined') console.log('[Def-cfg] ', e);
			else if (window.opera) opera.postError('[Def-cfg] '+e);
			else GM_log('[Def-cfg] '+e);   
		}
		
		function set_cfg_ifnotexists(name, value) {
			if(!localStorage[name]) {
				localStorage[name] = value;
			}		
		}
	  
		function createInstance() {
			if (/commandandconquer\.com/i.test(document.domain)) {
					
				if (localStorage) {
					//localStorage['DontWarnWebGL'] = 'YES';
	
					set_cfg_ifnotexists('TAMap.visOptions','{"colors":{"cityColor":"green","baseColor":"navy","campColor":"midnightblue","outpostColor":"royalblue","poiColor":"orange","tunnelColor":"forestgreen","enemyBaseColor":"red","allianceTerrainColor":"#0f0","ownBaseColor":"lime","highlightColor":"white"},"alliance":-1,"showAlliancePois":true,"showOwnCities":true,"showSectionFrame":true}');
			

					set_cfg_ifnotexists('autoSimulate','yes');
					set_cfg_ifnotexists('simulateSpeed' , 2);
					set_cfg_ifnotexists('isBtnNorm','yes');
					set_cfg_ifnotexists('isBtnRight','no');
					set_cfg_ifnotexists('isRTBtnDisabled','no');
								
					set_cfg_ifnotexists('CCTA_MaelstromTools_AutoCollectTimer',			5);
					set_cfg_ifnotexists('CCTA_MaelstromTools_ChatHistoryLength',		128);
					set_cfg_ifnotexists('CCTA_MaelstromTools_autoCollectPackages',		true);
					set_cfg_ifnotexists('CCTA_MaelstromTools_autoHideMissionTracker',	false);
					set_cfg_ifnotexists('CCTA_MaelstromTools_autoRepairBuildings',		false);
					set_cfg_ifnotexists('CCTA_MaelstromTools_autoRepairUnits',			false);
					set_cfg_ifnotexists('CCTA_MaelstromTools_showCostsForNextMCV',		false);
					set_cfg_ifnotexists('CCTA_MaelstromTools_showLoot',					false);
					set_cfg_ifnotexists('CCTA_MaelstromTools_useDedicatedMainMenu',		true);
							
					log_it('[Def-cfg] def setup done!');
				} else {
					log_it("NO HTML5 localStorage can not save!");
				}	  
			}
		}
        
        // Loading
        function DEFCFG_checkIfLoaded() {
          try {
            if (typeof qx != 'undefined') {
                createInstance();
            } else {
              setTimeout(DEFCFG_checkIfLoaded, 1000);
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
          setTimeout(DEFCFG_checkIfLoaded, 1000);
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

} catch (e) {
    GM_log(e);
	GM_log(e.message);
} 




/*
URL:		http://userscripts.org/scripts/source/140988.user.js
Id:		140988
Name:		infernal wrapper
Version:	0.390737.5

*/
try {

	elda_addon_info[140988] = {
		id: 140988,
		name: "infernal wrapper",
		version: "0.390737.5",
		date: "",
		can_disabled: false,
		loaded: false
	};

	if(elda_hastoload(140988)) {
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

		elda_hasload(140988);
	} else {
		elda_hasnotload(140988);
	}
} catch (e) {
    GM_log(e);
	GM_log(e.name + " " + e.message);
}

/*
URL:		http://userscripts.org/scripts/source/155357.user.js
Id:		155357
Name:		C&C:TA Dev AddonMainMenu
Version:	0.2

*/
try {

	elda_addon_info[155357] = {
		id: 155357,
		name: "C&C:TA Dev AddonMainMenu",
		version: "0.2",
		date: "",
		can_disabled: false,
		loaded: false
	};

	if(elda_hastoload(155357)) {
(function () {
 var AMMinnerHTML = function () {
  function AMM() {
   qx.Class.define("Addons.AddonMainMenu",{
    type : "singleton",
    extend : qx.core.Object,
    construct: function () {     
     this.mainMenuContent = new qx.ui.menu.Menu();
     this.mainMenuButton = new qx.ui.form.MenuButton("Addons", null , this.mainMenuContent);
     this.mainMenuButton.set({
      width : 80,
      appearance : "button-bar-right",
      toolTipText : "List of AddonCommands"
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
     mainBar.getChildren()[0].setWidth(764 + 80 ); //kosmetik    
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
            
   //-----TESTING------
   //var addonmenu  = Addons.AddonMainMenu.getInstance();  
   //addonmenu.AddMainMenu("TestMainButton",function(){debugfunction("1");},"ALT+J");
   //--SUBMENUS--
   //var submenu = addonmenu.AddSubMainMenu("TestSubMenu");
   //addonmenu.AddSubMenu(submenu,"TestSubButton 1",function(){debugfunction("2");},"ALT+L");
   //addonmenu.AddSubMenu(submenu,"TestSubButton 2",function(){debugfunction("3");});
   //addonmenu.AddSubMenu(submenu,"TestSubButton 3",function(){debugfunction("4");});
   
   //function debugfunction(k){
             //console.log("working key:" + k);
   //}
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
		elda_hasload(155357);
	} else {
		elda_hasnotload(155357);
	}
} catch (e) {
    GM_log(e);
	GM_log(e.name + " " + e.message);
}

/*
URL:		http://userscripts.org/scripts/source/163642.user.js
Id:		163642
Name:		Eldas - Tiberium Alliances Combat Simulator
Version:	4.0.0

*/
try {

	elda_addon_info[163642] = {
		id: 163642,
		name: "Eldas - Tiberium Alliances Combat Simulator",
		version: "4.0.0",
		date: "",
		can_disabled: true,
		loaded: false
	};

	if(elda_hastoload(163642)) {

/**
 * Although I am the author of this script, I want to also give credit to other authors who's methods and ideas are or might appear in this script. 
 *  Credits: Topper42, Eferz98, KRS_L, PythEch, MrHIDEn, Panavia2, Deyhak, CodeEcho, 
 * Matthias Fuchs, Enceladus, TheLuminary, Da Xue, Quor, WildKatana, Peluski17
*/ 

(function(){
 var injectFunction = function() 
 {
  function createClasses()
  {
   //This is the setup for a class. 
   /*qx.Class.define("EXAMPLE", 
   {
    type: "singleton",
    extend: qx.core.Object,
            
    construct: function()
    {
    },
    
    destruct: function()
    {
    },
    
    members: 
    {
    }
   });*/
   
   qx.Class.define("Simulator", 
   {
    type: "singleton",
    extend: qx.core.Object,
            
    construct: function()
    {
     //setup buttons
     try 
     {      
      armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
      
      //Simulator Button//
      simBtn = new qx.ui.form.Button("Simulate");
      simBtn.set
      ({
       alignY: "middle", 
       width: 60,
       height: 28,
       toolTipText: "Opens Simulation Screen.",
       appearance: "button-text-small"
      });
      simBtn.addListener("click", this.__openSimulatorWindow, this);
      
      armyBar.add(simBtn,{
       left: null,
       right: 58,
       bottom: 119
      });
      
      //Simulator Options Button//
      optionBtn = new qx.ui.form.Button("Options");
      optionBtn.set
      ({
       alignY: "middle", 
       width: 60,
       height: 28,
       toolTipText: "Opens Simulator Options",
       appearance: "button-text-small"
      });
      optionBtn.addListener("click", this.__openOptionWindow, this);
      
      armyBar.add(optionBtn,{
       left: null,
       right: 58,
       bottom: 43
      });
      
      //Simulator Stats Button//
      statBtn = new qx.ui.form.Button("Stats");
      statBtn.set
      ({
       alignY: "middle", 
       width: 60,
       height: 28,
       toolTipText: "Opens Simulator Stats Window",
       appearance: "button-text-small"
      });
      statBtn.addListener("click", this.__openStatWindow, this);
      
      armyBar.add(statBtn,{
       left: null,
       right: 58,
       bottom: 81
      });
      
      //Simulator Layout Button//
      layoutBtn = new qx.ui.form.Button("Layout");
      layoutBtn.set
      ({
       alignY: "middle", 
       width: 60,
       height: 28,
       toolTipText: "Save/Load/Delete Unit Formations for current city",
       appearance: "button-text-small"
      });
      layoutBtn.addListener("click", this.__openLayoutWindow, this);
      //layoutBtn.setEnabled(false);
      armyBar.add(layoutBtn,{
       left: null,
       right: 58,
       bottom: 5
      });
      
      //Simulator Unlock Combat Button// 
      unlockCmtBtn = new qx.ui.form.Button("Unlock");
      unlockCmtBtn.set
      ({
       alignY: "middle",
       width: 50,
       height: 50,
       toolTipText: "Unlock Combat Button",
       appearance: "button-text-small"
      });
      unlockCmtBtn.setOpacity(0.7);
      armyBar.add(unlockCmtBtn,{
       left: null,
       right: 7,
       bottom: 5
      });
      unlockCmtBtn.addListener("click", this.timeoutCmtBtn, this);
      
      //Simulator Unlock Repair Time Button//
      unlockRTBtn = new qx.ui.form.Button("Unlock");
      unlockRTBtn.set
      ({
       alignY: "middle",
       width: 50,
       height: 50,
       toolTipText: "Unlock Repair Button",
       appearance: "button-text-small"
      });
      unlockRTBtn.setOpacity(0.7);
      
      armyBar.add(unlockRTBtn,{
       left: null,
       right: 7,
       bottom: 97
      });
      unlockRTBtn.addListener("click", this.timeoutRTBtn, this);
      
      playArea = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.OVL_PLAYAREA);
      //Formation Buttons//
      shiftUpBtn = new qx.ui.form.Button("?");
      shiftUpBtn.set
      ({
       alignY: "middle",
       width: 30,
       height: 20,
       toolTipText: "Shifts units one space up",
       appearance: "button-text-small"
      });
      playArea.add(shiftUpBtn,{
       left: null,
       right: 70,
       bottom: 110
      });
      shiftUpBtn.addListener("click", function(){this.shiftFormation("u");}, this);
      shiftUpBtn.hide();
      
      shiftDownBtn = new qx.ui.form.Button("?");
      shiftDownBtn.set
      ({
       alignY: "middle",
       width: 30,
       height: 20,
       toolTipText: "Shifts units one space down",
       appearance: "button-text-small"
      });
      
      playArea.add(shiftDownBtn,{
       left: null,
       right: 70,
       bottom: 70
      });
      shiftDownBtn.addListener("click", function(){this.shiftFormation("d");}, this);
      shiftDownBtn.hide();
      
      shiftLeftBtn = new qx.ui.form.Button("?");
      shiftLeftBtn.set
      ({
       alignY: "middle",
       width: 30,
       height: 20,
       toolTipText: "Shifts units one space left",
       appearance: "button-text-small"
      });
      playArea.add(shiftLeftBtn,{
       left: null,
       right: 90,
       bottom: 90
      });
      shiftLeftBtn.addListener("click", function(){this.shiftFormation("l");}, this);
      shiftLeftBtn.hide();
      
      shiftRightBtn = new qx.ui.form.Button("?");
      shiftRightBtn.set
      ({
       alignY: "middle",
       width: 30,
       height: 20,
       toolTipText: "Shifts units one space right",
       appearance: "button-text-small"
      });
      playArea.add(shiftRightBtn,{
       left: null,
       right: 50,
       bottom: 90
      });
      shiftRightBtn.addListener("click", function(){this.shiftFormation("r");}, this);
      shiftRightBtn.hide();
      
      mirrorBtn = new qx.ui.form.Button("M");
      mirrorBtn.set
      ({
       alignY: "middle",
       width: 35,
       height: 35,
       toolTipText: "Mirrors current army formation layout",
       appearance: "button-text-small"
      });
      
      playArea.add(mirrorBtn,{
       left: null,
       right: 6,
       bottom: 160
      });
      mirrorBtn.addListener("click", function(){this.mirrorFormation();}, this);
      mirrorBtn.hide();
      
      //disableAllUnitsBtn = new qx.ui.form.Button("", "webfrontend/ui/common/icn_res_power.png");
      disableAllUnitsBtn = new qx.ui.form.Button("", "FactionUI/icons/icon_disable_unit.png");
      disableAllUnitsBtn.set
      ({
       center: true,
       show: "icon",
       alignY: "middle",
       width: 35,
       height: 35,
       toolTipText: "Enables/Disables all units",
       appearance: "button-text-small"
      });
      playArea.add(disableAllUnitsBtn,{
       left: null,
       right: 6,
       bottom: 120
      });
      disableAllUnitsBtn.addListener("click", function(){this.shiftFormation("n");}, this);
      disableAllUnitsBtn.getChildControl("icon").set({ width : 20, height : 20, scale : true });
      disableAllUnitsBtn.hide();
      
      armyUndoBtn = new qx.ui.form.Button("", "FactionUI/icons/icon_refresh_funds.png");
      armyUndoBtn.set
      ({
       center: true,
       show: "icon",
       alignY: "middle",
       width: 35,
       height: 35,
       toolTipText: "Undo's formation to previous saved formation. Save formations by hitting the Update or Simulate button.",
       appearance: "button-text-small"
      });
      
      playArea.add(armyUndoBtn,{
       left: null,
       right: 6,
       bottom: 200
      });
      armyUndoBtn.addListener("click", function(){this.undoCurrentFormation();}, this);
      armyUndoBtn.setEnabled(false);
      armyUndoBtn.hide();
      
      quickSaveBtn = new qx.ui.form.Button("QS");
      quickSaveBtn.set
      ({
       alignY: "middle",
       width: 35,
       height: 35,
       toolTipText: "Saves the current layout without having to open the Formation Saver window. Does not make persistent.",
       appearance: "button-text-small"
      });
      
      playArea.add(quickSaveBtn,{
       left: null,
       right: 6,
       bottom: 240
      });
      quickSaveBtn.addListener("click", function(){Simulator.LayoutWindow.getInstance().saveNewLayout(true)}, this);
      quickSaveBtn.hide();
            
      //Simulator Back Button//
      replayBar = qx.core.Init.getApplication().getReportReplayOverlay();
      var backBtn = new qx.ui.form.Button("Back");
      backBtn.set
      ({
       width: 50,
       height: 24,
       appearance: "button-text-small",
       toolTipText: "Return to Combat Setup"
      });
      backBtn.addListener("click", this.backToCombatSetup, this);
      replayBar.add(backBtn, {
       top: 37,
       left: 255
      });
      
      var replayStatBtn = new qx.ui.form.Button("Stats");
      replayStatBtn.set
      ({
       width: 50,
       height: 24,
       appearance: "button-text-small",
       toolTipText: "Return to Combat Setup"
      });
      replayStatBtn.addListener("click", this.__openStatWindow, this);
      replayBar.add(replayStatBtn, {
       top: 7,
       left: 255
      });
      
      this.isSimButtonDisabled = false;
      this.isSimulation = false;
      this.armyTempFormations = new Array();
      this.armyTempIdx = 0;
      this.repairOneBtns = new Array();
     }
     catch(e)
     {
      console.log("Error setting up Simulator Constructor: " );
      console.log(e.toString());
     }
    },
    
    destruct: function()
    {
    },
    
    members: 
    {
     armyBar: null,
     playArea: null,
     replayBar: null,
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
     backBtn: null,
     isSimButtonDisabled: null,
     disableAllUnitsBtn: null,
     armyTempFormations: null,
     armyTempIdx: null,
     armyUndoBtn: null,
     isSimulation: null,
     quickSaveBtn: null,
     
     /**
      * This method initiates the visual simulation with no stats produced. If the player
      * wants stats produced, then they should do it through the stats window.
      */
     __openSimulatorWindow: function()
     {
      var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
      if (city != null)
      {
       var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
       
       this.isSimulation = true;
       this.saveTempFormation();
       
       localStorage.ta_sim_last_city = city.get_Id();
       
       ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
       ClientLib.API.Battleground.GetInstance().SimulateBattle();
       var app = qx.core.Init.getApplication();
       var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
       
       app.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatReplay, city.get_Id(), 0, 0);
       
       
       var autoSim = localStorage['autoSimulate'];
       
       if (typeof autoSim != 'undefined')
       {
        if (autoSim == "yes")
        {
         var speed = localStorage['simulateSpeed'];
         setTimeout(function() {
          battleground.RestartReplay();
          battleground.set_ReplaySpeed(parseInt(speed));
         }, 1000)
        }
       }
       
       if ( this.isSimButtonDisabled == false)
       {
        simBtn.setEnabled(false);
        var simTimer = 10000;
        this.disableSimulateButtonTimer(simTimer);
        
        if (typeof simStatBtn != "undefined")
        {
         simStatBtn.setEnabled(false);
         var simStatTimer = 10000;
         Simulator.StatWindow.getInstance().disableSimulateStatButtonTimer(simStatTimer);
        }
       }
       
       setTimeout(function() {
        var battleDuration = battleground.get_BattleDuration();
        battleDuration = Simulator.StatWindow.getInstance().formatBattleDurationTime(battleDuration);
        Simulator.StatWindow.getInstance().__labelMiscBattleDuration.setValue(battleDuration);
       }, 1000);
       
       if (simReplayBtn.getEnabled() == false)
       {
        simReplayBtn.setEnabled(true);
       }
      } 
     },
     
     __openOptionWindow: function()
     {
      try
      {
       if (Simulator.OptionWindow.getInstance().isVisible())
       {
        console.log("Closing Option Window");
        Simulator.OptionWindow.getInstance().close();
       }
       else
       {
        console.log("Opening Option Window");
        Simulator.OptionWindow.getInstance().open();
       }
      }
      catch(e)
      {
       console.log("Error Opening or Closing Option Window");
       console.log(e.toString());
      }
     },
     
     __openStatWindow: function()
     {
      try
      {
       if (Simulator.StatWindow.getInstance().isVisible())
       {
        console.log("Closing Stat Window");
        Simulator.StatWindow.getInstance().close();
       }
       else
       {
        console.log("Opening Stat Window");
        Simulator.StatWindow.getInstance().open();
                                Simulator.StatWindow.getInstance().calcResources();
       }
      }
      catch(e)
      {
       console.log("Error Opening or Closing Stat Window");
       console.log(e.toString());
      }
     },
     
     __openLayoutWindow: function()
     {
      try
      {
       if (Simulator.LayoutWindow.getInstance().isVisible())
       {
        console.log("Closing Layout Window");
        Simulator.LayoutWindow.getInstance().close();
       }
       else
       {
        console.log("Opening LayoutWindow");
        Simulator.LayoutWindow.getInstance().updateLayoutList();
        Simulator.LayoutWindow.getInstance().layoutTextBox.setValue("");
        Simulator.LayoutWindow.getInstance().persistentCheck.setValue(false);
        Simulator.LayoutWindow.getInstance().open();
       }
      }
      catch(e)
      {
       console.log("Error Opening or Closing Layout Window");
       console.log(e.toString());
      }
     },
     
     __openToolsWindow: function()
     {
      //Might need to be implemented later on.
     },
     
     attachNetEvent: function()
     {
      console.log("Need to assign correct function!");
     },
     
     formatNumbersCompact: function()
     {
      console.log("Need to assign correct function!");
     },
     
     GetUnitMaxHealth: function()
     {
      console.log("Need to assign correct function!");
      return -1;                
     },
     
     saveTempFormation: function()
     {
      try
      {
       if (this.armyTempFormations.length != 0)
       {
        var currForm = this.getCityPreArmyUnits().get_ArmyUnits().l;
        
        for (var i = 0; i < currForm.length; i++)
        {
         var lastForm = this.armyTempFormations[this.armyTempIdx][i];
         if ( (currForm[i].get_CoordX() != lastForm.x) || (currForm[i].get_CoordY() != lastForm.y))
         {
          break;
         }
         else if ((i + 1) == currForm.length )
         {
          return;
         }
        }
       }
       
       var formation = new Array();
       var unitList = this.getCityPreArmyUnits().get_ArmyUnits().l;
       
       for (var i = 0; i < unitList.length; i++)
       {
        var unit = unitList[i];
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
        armyUndoBtn.setEnabled(true);
      }
      catch(e)
      {
       console.log("Error Saving Temp Formation");
       console.log(e.toString());
      }
     },
     
     undoCurrentFormation: function()
     {
      try
      {
       this.restoreFormation(this.armyTempFormations[(this.armyTempIdx - 1)]);
       
       //get rid of last element now that we have undone it.
       this.armyTempFormations.splice(this.armyTempIdx, 1);
       this.armyTempIdx--;
       
       if (this.armyTempFormations.length == 1)
        armyUndoBtn.setEnabled(false);
      }
      catch(e)
      {
       console.log("Error undoing formation");
       console.log(e.toString());
      }
     },
     
     /*
      * Mirrors across the X Axis (4 is axis on grid 0-9)
      */
     mirrorFormation: function()
     {
      try
      {
       var units = this.getCityPreArmyUnits();
       var unitsList = this.getCityPreArmyUnits().get_ArmyUnits().l;
       var mirror = new Array();
       
       for (var i = 0; i < unitsList.length; i++)
       {
        var unit = unitsList[i];
        var armyUnit = {};
        
        //do the mirroring
        var x = unit.get_CoordX();
        var distanceX = x - 4; //from center (4)
        if (distanceX < 0)
        {
         x = (x - distanceX) + (-1 * distanceX);
        }
        else if (distanceX > 0)
        {
         x = (x - distanceX) - distanceX;
        }
        
        armyUnit.x = x;
        armyUnit.y = unit.get_CoordY();
        armyUnit.id = unit.get_Id();
        armyUnit.enabled = unit.get_Enabled();
        
        mirror.push(armyUnit);
       }
       
       this.restoreFormation(mirror);
      }
      catch(e)
      {
       console.log("Error Mirroring Formation");
       console.log(e);
      }
     },
     
     /**
      * Code from one of the previous authors of an older simulator version. If anyone knows the true author please let me know.
      */
     shiftFormation: function(direction)
     {
      try
      {       
       console.log("Shifting Unit Formation");
       var v_shift = 0;
       var h_shift = 0;
       
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
       for (var i = 0; (i < units.length); i++) 
       {
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
        armyUnit.x = x;
        armyUnit.y = y;
        armyUnit.id = unit.get_Id();
        
        //For enabling/disabling all units
        if (direction == "n")
        {
         if (typeof localStorage['allUnitsDisabled'] != 'undefined')
         {
          if (localStorage['allUnitsDisabled'] == "yes")
          {
           armyUnit.enabled = unit.set_Enabled(false);
          }
          else
          {
           armyUnit.enabled = unit.set_Enabled(true);
          }
         }
         else
         {
          armyUnit.enabled = unit.set_Enabled(false);
         }
        }
        armyUnit.enabled = unit.get_Enabled();
        newLayout.push(armyUnit);
       }
       //Change disable button to opposite 
       if (direction == "n")
       {
        if (localStorage['allUnitsDisabled'] == "yes")
         localStorage['allUnitsDisabled'] = "no";
        else
         localStorage['allUnitsDisabled'] = "yes";
       }
       this.restoreFormation(newLayout);
      }
      catch(e)
      {
       console.log("Error Shifting Units");
       console.log(e.toString());
      }
     },
     
     restoreFormation: function(layout)
     {
      try
      {
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
      }
      catch(e)
      {
       console.log("Error Restoring Formation");
       console.log(e.toString());
      }
     },
     
     getCityPreArmyUnits: function()
     {
      var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
      var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
      var formationManager = ownCity.get_CityArmyFormationsManager();
      ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
      
      return formationManager.GetFormationByTargetBaseId(formationManager.get_CurrentTargetBaseId());
     },
     
     timeoutCmtBtn: function()
     {
      armyBar.remove(unlockCmtBtn);
      setTimeout(function() {
       armyBar.add(unlockCmtBtn,{
        left: null,
        right: 7,
        bottom: 5
       });
      }, 2000);
     },
     
     timeoutRTBtn: function()
     {
      armyBar.remove(unlockRTBtn);
      setTimeout(function() {
       armyBar.add(unlockRTBtn,{
        left: null,
        right: 7,
        bottom: 97
       });
      }, 2000);
     },
     
     backToCombatSetup: function()
     {
      var app = qx.core.Init.getApplication();
      var player_cities = ClientLib.Data.MainData.GetInstance().get_Cities();
      var current_city = player_cities.get_CurrentCity();
      try 
      {
       //This brings the player back to viewing the enemies defense setup PlayArea
       app.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupDefense, localStorage.ta_sim_last_city, 0, 0);
      } 
      catch (e) 
      {
       console.log("Error closing Simulation Window");
       console.log(e.toString());
      } 
     },
     
     disableSimulateButtonTimer: function(timer)
     {
      try
      {
       if ( timer >= 1000)
       {
        this.isSimButtonDisabled =true;
        simBtn.setLabel(Math.floor(timer/1000));
        timer -= 1000;
        setTimeout(function () {
         Simulator.getInstance().disableSimulateButtonTimer(timer);
        }, 1000)
       }
       else
       {
        setTimeout(function () {
         simBtn.setEnabled(true);
         if (Simulator.OptionWindow.getInstance()._buttonSizeCB.getValue())
          simBtn.setLabel("Simulate");
         else
          simBtn.setLabel("S"); 
        }, timer)
        this.isSimButtonDisabled = false;
       }
      }
      catch(e)
      {
       console.log("Error disabling simulator button");
       console.log(e.toString());
      }
     }
    }
   });
   
   qx.Class.define("Simulator.StatWindow", 
   {
    type: "singleton",
    extend: qx.ui.window.Window,
    construct: function()
    {
     this.base(arguments);
     this.setLayout(new qx.ui.layout.VBox());
     
     this.set({
      width: 220,
      caption: "Simulator Stats",
      padding: 2,
      allowMaximize: false,
      showMaximize: false,
      allowMinimize: false,
      showMinimize: false,
      
     });
     
     this.setResizable(false, true, false, true);
     if (typeof localStorage['statWindowPosLeft'] != 'undefined')
     {
      var left = parseInt(localStorage['statWindowPosLeft']);
      var top = parseInt(localStorage['statWindowPosTop']);
      this.moveTo(left, top);
     }
     else
     {
      this.moveTo(125,30);
     }

     //Enemy Health Section//
     var enemyHealthHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({ decorator: "pane-light-opaque"});
     var enemyHealthTitle = new qx.ui.basic.Label("Enemy Base Health").set({ alignX: "center", alignY: "top", font: "font_size_14_bold"});
     enemyHealthHeader.add(enemyHealthTitle);
     this.add(enemyHealthHeader);
     
     var enemyHealth = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));
     enemyHealth.setThemedFont("bold");
     var enemyHealthBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ width: 70, padding: 5, decorator: "pane-light-opaque"});
     var eHLabelOverall = new qx.ui.basic.Label("Overall:");
     var eHLabelBase = new qx.ui.basic.Label("Base:");
     var eHLabelDefense = new qx.ui.basic.Label("Defense:");
     var eHLabelCY = new qx.ui.basic.Label("Con.Yard:");
     var eHLabelDF = new qx.ui.basic.Label("Def.Fac:");
     enemyHealthBox.add(eHLabelOverall);
     enemyHealthBox.add(eHLabelBase);
     enemyHealthBox.add(eHLabelDefense);
     enemyHealthBox.add(eHLabelCY);
     enemyHealthBox.add(eHLabelDF);
     enemyHealth.add(enemyHealthBox);
     
     this.__labelEnemyOverallHealth = new Array();
     this.__labelEnemyBaseHealth = new Array();
     this.__labelEnemyDefenseHealth = new Array();
     this.__labelEnemyCYHealth = new Array();
     this.__labelEnemyDFHealth = new Array();
     
     var enemyHealthValues = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ alignX: "center", width: 90, padding: 5, decorator: "pane-light-opaque"});
     this.__labelEnemyOverallHealth = new qx.ui.basic.Label("-").set({ alignX: "right"});
     this.__labelEnemyBaseHealth = new qx.ui.basic.Label("-").set({ alignX: "right"});
     this.__labelEnemyDefenseHealth = new qx.ui.basic.Label("-").set({ alignX: "right"});
     this.__labelEnemyCYHealth = new qx.ui.basic.Label("-").set({ alignX: "right"});
     this.__labelEnemyDFHealth = new qx.ui.basic.Label("-").set({ alignX: "right"});
     enemyHealthValues.add(this.__labelEnemyOverallHealth);
     enemyHealthValues.add(this.__labelEnemyBaseHealth);
     enemyHealthValues.add(this.__labelEnemyDefenseHealth);
     enemyHealthValues.add(this.__labelEnemyCYHealth);
     enemyHealthValues.add(this.__labelEnemyDFHealth);
     enemyHealth.add(enemyHealthValues, { flex: 1 });
     this.add(enemyHealth);
     
     //Player Repair Section//
     var playerRepairHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({ decorator: "pane-light-opaque"});
     var playerRepairTitle = new qx.ui.basic.Label("Repair Times").set({ alignX: "center", alignY: "top", font: "font_size_14_bold"});
     playerRepairHeader.add(playerRepairTitle);
     this.add(playerRepairHeader);
     
     var playerRepair = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));
     playerRepair.setThemedFont("bold");
     var playerRepairBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ width: 70, padding: 5, decorator: "pane-light-opaque"});
     var pRLabelStorage = new qx.ui.basic.Label("Storage:");
     var pRLabelOverall = new qx.ui.basic.Label("Overall:");
     var pRLabelInf = new qx.ui.basic.Label("Infantry:");
     var pRLabelVehi = new qx.ui.basic.Label("Vehicle:");
     var pRLabelAir = new qx.ui.basic.Label("Aircraft:");
     playerRepairBox.add(pRLabelStorage);
     playerRepairBox.add(pRLabelOverall);
     playerRepairBox.add(pRLabelInf);
     playerRepairBox.add(pRLabelVehi);
     playerRepairBox.add(pRLabelAir);
     playerRepair.add(playerRepairBox);
     
     var playerRepairValues = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ alignX: "center", width: 90, padding: 5, decorator: "pane-light-opaque"});
     this.__labelRepairStorage = new qx.ui.basic.Label("-").set({ alignX: "right"});
     this.__labelRepairOverall = new qx.ui.basic.Label("-").set({ alignX: "right"});
     this.__labelRepairInf = new qx.ui.basic.Label("-").set({ alignX: "right"});
     this.__labelRepairVehi = new qx.ui.basic.Label("-").set({ alignX: "right"});
     this.__labelRepairAir = new qx.ui.basic.Label("-").set({ alignX: "right"});
     playerRepairValues.add(this.__labelRepairStorage);
     playerRepairValues.add(this.__labelRepairOverall);
     playerRepairValues.add(this.__labelRepairInf);
     playerRepairValues.add(this.__labelRepairVehi);
     playerRepairValues.add(this.__labelRepairAir);
     playerRepair.add(playerRepairValues, { flex: 1 });
     this.add(playerRepair);
     
     //MISC Section//
     var miscHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({ decorator: "pane-light-opaque"});
     var miscTitle = new qx.ui.basic.Label("Misc").set({ alignX: "center", alignY: "top", font: "font_size_14_bold"});
     miscHeader.add(miscTitle);
     this.add(miscHeader);
     
     var misc = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));
     misc.setThemedFont("bold");
     var miscBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ width: 70, padding: 5, decorator: "pane-light-opaque"});
     var miscOutcome = new qx.ui.basic.Label("Outcome:");
     var miscBattleDuration = new qx.ui.basic.Label("Duration:");
     miscBox.add(miscOutcome);
     miscBox.add(miscBattleDuration);
     misc.add(miscBox);
     
     this.__labelMiscOutcome = new Array();
     this.__labelMiscBattleDuration = new Array();
     
     var miscValues = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ alignX: "center", width: 90, padding: 5, decorator: "pane-light-opaque"});
     this.__labelMiscOutcome = new qx.ui.basic.Atom("Unknown", null).set({ allowGrowX: false, alignX: "right"});
     this.__labelMiscBattleDuration = new qx.ui.basic.Label("0:00").set({ alignX: "right"});
     miscValues.add(this.__labelMiscOutcome);
     miscValues.add(this.__labelMiscBattleDuration);
     misc.add(miscValues, { flex: 1 });
     this.add(misc); 
     
     //Battle Loot Section//
     var battleLootHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({ decorator: "pane-light-opaque"});
     var battleLootTitle = new qx.ui.basic.Label("Loot from Battle").set({ alignX: "center", alignY: "top", font: "font_size_14_bold"});
     battleLootHeader.add(battleLootTitle);
     this.add(battleLootHeader);
     
     
     var battleLoot = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));
     battleLoot.setThemedFont("bold");
     var battleLootBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ width: 70, padding: 5, decorator: "pane-light-opaque"});
     var battleLootTib = new qx.ui.basic.Atom(null, "webfrontend/ui/common/icn_res_tiberium.png");
     var battleLootCry = new qx.ui.basic.Atom(null, "webfrontend/ui/common/icn_res_chrystal.png");
     var battleLootCred = new qx.ui.basic.Atom(null, "webfrontend/ui/common/icn_res_dollar.png");
     var battleLootRP = new qx.ui.basic.Atom(null, "webfrontend/ui/common/icn_res_research_mission.png");
     //var battleLootTotal = new qx.ui.basic.Atom(null, "webfrontend/ui/icons/icon_item.png");
     var battleLootTotal = new qx.ui.basic.Atom(null, "webfrontend/ui/common/icn_build_slots.png");
     battleLootTib.setToolTipText("Tiberium");
     battleLootCry.setToolTipText("Crystals");
     battleLootCred.setToolTipText("Credits");
     battleLootRP.setToolTipText("Research Points");
     battleLootTotal.setToolTipText("Total Loot");
     battleLootTib.getChildControl("icon").set({ width : 23, height : 23, scale : true }); 
     battleLootCry.getChildControl("icon").set({ width : 23, height : 23, scale : true }); 
     battleLootCred.getChildControl("icon").set({ width : 23, height : 23, scale : true }); 
     battleLootRP.getChildControl("icon").set({ width : 23, height : 23, scale : true }); 
     battleLootTotal.getChildControl("icon").set({ width : 23, height : 23, scale : true }); 
     battleLootBox.add(battleLootTib);
     battleLootBox.add(battleLootCry);
     battleLootBox.add(battleLootCred);
     battleLootBox.add(battleLootRP);
     battleLootBox.add(battleLootTotal);
     battleLoot.add(battleLootBox);
     
     this.__labelBattleLootTotal = new Array();
     this.__labelBattleLootTib = new Array();
     this.__labelBattleLootCry = new Array();
     this.__labelBattleLootCred = new Array();
     this.__labelBattleLootRP = new Array();
     
     var battleLootValues = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ alignX: "center", width: 90, padding: 5, decorator: "pane-light-opaque"});
     this.__labelBattleLootTib = new qx.ui.basic.Label("-").set({ alignX: "right", padding: 3});
     this.__labelBattleLootCry = new qx.ui.basic.Label("-").set({ alignX: "right", padding: 3});
     this.__labelBattleLootCred = new qx.ui.basic.Label("-").set({ alignX: "right", padding: 3});
     this.__labelBattleLootRP = new qx.ui.basic.Label("-").set({ alignX: "right", padding: 3});
     this.__labelBattleLootTotal = new qx.ui.basic.Label("-").set({ alignX: "right", padding: 3});
     battleLootValues.add(this.__labelBattleLootTib);
     battleLootValues.add(this.__labelBattleLootCry);
     battleLootValues.add(this.__labelBattleLootCred);
     battleLootValues.add(this.__labelBattleLootRP);
     battleLootValues.add(this.__labelBattleLootTotal);
     battleLoot.add(battleLootValues, { flex: 1 });
     this.add(battleLoot);
     
     //Simulate Button//
     var simButton = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({ padding: 5, decorator: "pane-light-opaque"});
     this.add(simButton);
     
     simStatBtn = new qx.ui.form.Button("Update").set({allowGrowX: false});
     simStatBtn.setToolTipText("Updates Simulation Stats");
     simStatBtn.addListener("click", this.simulateStats, this);
     
     simReplayBtn = new qx.ui.form.Button("Replay").set({allowGrowX: false});
     simReplayBtn.setToolTipText("Shows Replay of last simulation");
     simReplayBtn.addListener("click", this.doSimReplay, this);
     
     simReplayBtn.setEnabled(false);
     
     simButton.add(simStatBtn, {width: "50%"});
     simButton.add(simReplayBtn, {width: "50%"});
     
     //Add Header Events//
     enemyHealthHeader.addListener("click", function()
     {
      if (enemyHealth.isVisible())
       enemyHealth.exclude();
      else
       enemyHealth.show();
     }, this);
     
     playerRepairHeader.addListener("click", function()
     {
      if (playerRepair.isVisible())
       playerRepair.exclude();
      else
       playerRepair.show();
     }, this);
     
     miscHeader.addListener("click", function()
     {
      if (misc.isVisible())
       misc.exclude();
      else
       misc.show();
     }, this);
     
     battleLootHeader.addListener("click", function()
     {
      if (battleLoot.isVisible())
       battleLoot.exclude();
      else
       battleLoot.show();
     }, this);
     
     if (typeof localStorage['hideHealth'] != 'undefined')
     {
      if (localStorage['hideHealth'] == "yes")
       enemyHealth.exclude();
     }
     
     if (typeof localStorage['hideRepair'] != 'undefined')
     {
      if (localStorage['hideRepair'] == "yes")
       playerRepair.exclude();
     }
     
     if (typeof localStorage['hideMisc'] != 'undefined')
     {
      if (localStorage['hideMisc'] == "yes")
       misc.exclude();
     }
     
     if (typeof localStorage['hideLoot'] != 'undefined')
     {
      if (localStorage['hideLoot'] == "yes")
       battleLoot.exclude();
     }
     
     this.isSimStatButtonDisabled = false;
     
     Simulator.getInstance().attachNetEvent(ClientLib.API.Battleground.GetInstance(), "OnSimulateBattleFinished", ClientLib.API.OnSimulateBattleFinished, this, this.__OnSimulateBattleFinished);     
    },
    
    destruct: function()
    {
    },
    
    members: 
    {
     simStatBtn: null,
     simReplayBtn: null,
     __labelEnemyOverallHealth: null,
     __labelEnemyBaseHealth: null,
     __labelEnemyDefenseHealth: null,
     __labelEnemyCYHealth: null,
     __labelEnemyDFHealth: null,
     __labelRepairOverall: null,
     __labelRepairInf: null,
     __labelRepairVehi: null,
     __labelRepairAir: null,
     __labelBattleLootTotal: null,
     __labelBattleLootTib: null,
     __labelBattleLootCry: null,
     __labelBattleLootCred: null,
     __labelBattleLootRP: null,
     __labelMiscOutcome: null,
     __labelMiscBattleDuration: null,
     isSimStatButtonDisabled: null,
     __labelRepairStorage: null,
     
     simulateStats: function()
     {
      console.log("Simulating Stats");
      var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
      if (city != null)
      {   
       Simulator.getInstance().isSimulation = true;      
       Simulator.getInstance().saveTempFormation();
       localStorage.ta_sim_last_city = city.get_Id();
       var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
       ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
       ClientLib.API.Battleground.GetInstance().SimulateBattle();
       var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
       
       //Disable Simulate Button
       if ( this.isSimStatButtonDisabled == false )
       {
        simStatBtn.setEnabled(false);
        var simStatTimer = 10000;
        var simStatTimeout = this.disableSimulateStatButtonTimer(simStatTimer);
        
        simBtn.setEnabled(false);
        var simTimer = 10000;
        Simulator.getInstance().disableSimulateButtonTimer(simTimer);
       }
       
       setTimeout(function() {
        var battleDuration = battleground.get_BattleDuration();
        battleDuration = Simulator.StatWindow.getInstance().formatBattleDurationTime(battleDuration);
        Simulator.StatWindow.getInstance().__labelMiscBattleDuration.setValue(battleDuration);
       }, 1000);
       
       if (simReplayBtn.getEnabled() == false)
        simReplayBtn.setEnabled(true);
      }
     },
     
     doSimReplay: function()
     {
      try
      {
       Simulator.getInstance().isSimulation = true;
       var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
       var app = qx.core.Init.getApplication();
       app.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatReplay, localStorage.ta_sim_last_city, 0, 0);
       
       var autoSim = localStorage['autoSimulate'];
       
       if (typeof autoSim != 'undefined')
       {
        if (autoSim == "yes")
        {
         var speed = localStorage['simulateSpeed'];
         setTimeout(function() {
          battleground.RestartReplay();
          battleground.set_ReplaySpeed(parseInt(speed));
         }, 1000)
        }
       }
      }
      catch(e)
      {
       console.log("Error attempting to show Simulation Replay");
       console.log(e.toString());
      }
     },
     
     __OnSimulateBattleFinished: function(data) 
     {
      this.getSimulationInfo(data);
     },
     
     formatBattleDurationTime: function(time)
     {
      var seconds = time / 1000;
      var minutes = seconds / 60;
      minutes = Math.round(minutes - 0.5);
      seconds = Math.round((seconds - 0.5) - (minutes * 60));
      
      if( seconds < 10)
      {
       seconds = "0" + seconds;
      }
      return minutes + ":" + seconds;
     },
     
     calculateRepairCosts: function(id, level, sHealth, eHealth, mHealth)
     {
      repairCosts = {"RT": 0, "C": 0};
      var dmgRatio = 1;
      if (sHealth != eHealth)
      {
       if (eHealth > 0)
       {
        dmgRatio = ((sHealth - eHealth) / 16) / mHealth;
       }
       else
       {
        dmgRatio = (sHealth / 16) / mHealth;
       }
       //var currOwnCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
       var costs = ClientLib.API.Util.GetUnitRepairCosts(level, id, dmgRatio);

       for (var idx = 0; idx < costs.length; idx++)
       {
        var uCosts = costs[idx];
        var cType = parseInt(uCosts.Type);
        switch (cType) 
        {
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
     
     getSimulationInfo: function(data)
     {
      console.log("Getting Player Unit Damage");
      try
      {
       var crystals = 0, infCry = 0, vehiCry = 0, airCry = 0;
       var allSH = 0, allEH = 0, allMH = 0, allHP = 0; 
       var baseSH = 0, baseEH = 0, baseMH = 0, baseHP = 0;
       var defSH = 0, defEH = 0, defMH = 0, defHP = 0;
       var infSH = 0, infEH = 0, infMH = 0, infHP = 0;
       var vehiSH = 0, vehiEH = 0, vehiMH = 0, vehiHP = 0;
       var airSH = 0, airEH = 0, airMH = 0, airHP = 0;
       var infRT = 0, vehiRT = 0, airRT = 0;
       var cySH = 0, cyEH = 0, cyMH = 0, cyHP = 0;
       var dfSH = 0, dfEH = 0, dfMH = 0, dfHP = 0;
       var costs = {};
       var entities = []; //for calculating loot 
       var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
       var defBonus = city.get_AllianceDefenseBonus();
       for (var idx = 0; idx < data.length; idx++)
       {
        var unitData = data[idx].Value;
        var uMDBID = unitData.t;
        var unit = ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(uMDBID);
        var level = unitData.l;
        var sHealth = unitData.sh;
        var eHealth = unitData.h;
        var mHealth = Simulator.getInstance().GetUnitMaxHealth(level, unit, false);

        //for factoring in Player's durability boost from POI's
        /*if (city != null && unit.pt != ClientLib.Base.EPlacementType.Offense)
        {
         var cityType = city.get_CityFaction();
         switch(cityType)
         {
          case ClientLib.Base.EFactionType.GDIFaction:
          case ClientLib.Base.EFactionType.NODFaction:
           //var mod = ClientLib.Vis.VisMain.GetInstance().get_Battleground().GetNerfAndBoostModifier(level, defBonus); 
           var mod = ClientLib.Base.Util.GetNerfAndBoostModifier(level, defBonus);
           break;
         }
        }*/
        
        var pType = unit.pt;
        var mType = unit.mt;
        entities.push(unitData);
        switch(pType)
        {
         case ClientLib.Base.EPlacementType.Defense: 
          allMH += mHealth;
          allEH += eHealth;
          defMH += mHealth;
          defEH += eHealth;
          break;
         case ClientLib.Base.EPlacementType.Offense:
          switch(mType)
          {
           case ClientLib.Base.EUnitMovementType.Feet:
            infMH += mHealth;
            //infSH += sHealth;
            infEH += eHealth;
            costs = this.calculateRepairCosts(uMDBID, level, sHealth, eHealth, mHealth);
            infRT += costs["RT"];
            infCry += costs["C"];
            crystals += costs["C"];
            break;
           case ClientLib.Base.EUnitMovementType.Wheel:
           case ClientLib.Base.EUnitMovementType.Track:
            vehiMH += mHealth;
            //vehiSH += sHealth;
            vehiEH += eHealth;
            costs = this.calculateRepairCosts(uMDBID, level, sHealth, eHealth, mHealth);
            vehiRT += costs["RT"];
            vehiCry += costs["C"];
            crystals += costs["C"];
            break;
           case ClientLib.Base.EUnitMovementType.Air:
           case ClientLib.Base.EUnitMovementType.Air2:
            airMH += mHealth;
            //airSH += sHealth;
            airEH += eHealth;
            costs = this.calculateRepairCosts(uMDBID, level, sHealth, eHealth, mHealth);
            airRT += costs["RT"];
            airCry += costs["C"];
            crystals += costs["C"];
            break;
          }
          break;
         case ClientLib.Base.EPlacementType.Structure:
          allMH += mHealth;
          allEH += eHealth;
          baseMH += mHealth;
          baseEH += eHealth;
          switch(uMDBID)
          {
           case 151:
           case 112:
           case 177: //Construction Yard
            cySH = sHealth;
            cyMH = mHealth;
            cyEH = eHealth;
            break;
           case 158:
           case 131:
           case 195: //Defense Facility
            dfMH = mHealth;
            dfEH = eHealth;
            break;
          }
          break;
        }
       }
       
       crystals = Simulator.getInstance().formatNumbersCompact(crystals);
       infCry = Simulator.getInstance().formatNumbersCompact(infCry);
       vehiCry = Simulator.getInstance().formatNumbersCompact(vehiCry);
       airCry = Simulator.getInstance().formatNumbersCompact(airCry);
       
       var allOffRTInSeconds = Math.max(infRT, vehiRT, airRT);
       var allOffRT = phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(Math.max(infRT, vehiRT, airRT)));
       infRT = phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(infRT));
       vehiRT = phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(vehiRT));
       airRT = phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(airRT));  
       allHP = (allMH == 0) ? 100 : (allEH / (allMH * 16)) * 100;
       baseHP = (baseMH == 0) ? 100 : (baseEH / (baseMH * 16)) * 100; 
       defHP = (defMH == 0) ? 100 : (defEH / (defMH * 16)) * 100;
       cyHP = (cyMH == 0) ? 100 : (cyEH / (cyMH * 16)) * 100;
       dfHP = (dfMH == 0) ? 100 : (dfEH / (dfMH * 16)) * 100;
       
       
                            infHP = (infMH == 0) ? 100 : (infEH / (infMH * 16)) * 100;
                      vehiHP = (vehiMH == 0) ? 100 : (vehiEH / (vehiMH * 16)) * 100;
       airHP = (airMH == 0) ? 100 : (airEH / (airMH * 16)) * 100;
                            
       var allOffHP = ((infEH + vehiEH + airEH) / ((infMH + vehiMH + airMH) * 16)) * 100;
                            
       //Set MISC and Base Health Labels
       if (allOffHP == 0)
       {
         this.__labelMiscOutcome.setLabel("Total Defeat");
         this.__labelMiscOutcome.setIcon("FactionUI/icons/icon_reports_total_defeat.png");
         this.__labelMiscOutcome.setTextColor("red");
       }
       else if (cyEH == 0)
       { 
        this.__labelMiscOutcome.setLabel("Total Victory");
        this.__labelMiscOutcome.setIcon("FactionUI/icons/icon_reports_total_victory.png");
        this.__labelMiscOutcome.setTextColor("darkgreen");
       }
       else
       {
        this.__labelMiscOutcome.setLabel("Victory");
        this.__labelMiscOutcome.setIcon("FactionUI/icons/icon_reports_victory.png");
        this.__labelMiscOutcome.setTextColor("darkgreen");
       }

       this.__labelEnemyOverallHealth.setValue(allHP.toFixed(2));
       this.setEHLabelColor(this.__labelEnemyOverallHealth, allHP.toFixed(2));
       
       this.__labelEnemyDefenseHealth.setValue(defHP.toFixed(2));
       this.setEHLabelColor(this.__labelEnemyDefenseHealth, defHP.toFixed(2));
       
       this.__labelEnemyBaseHealth.setValue(baseHP.toFixed(2));
       this.setEHLabelColor(this.__labelEnemyBaseHealth, baseHP.toFixed(2));
       
       this.__labelEnemyCYHealth.setValue(cyHP.toFixed(2));
       this.setEHLabelColor(this.__labelEnemyCYHealth, cyHP.toFixed(2));
       
       this.__labelEnemyDFHealth.setValue(dfHP.toFixed(2));
       this.setEHLabelColor(this.__labelEnemyDFHealth, dfHP.toFixed(2));
       
       var getRTSelection = localStorage['getRTSelection'];
       
       if (typeof localStorage['getDivider'] != 'undefined')
        var divider = " " + localStorage['getDivider'] + " "; 
       else
        var divider = " | "; //default
       
       
       if (typeof getRTSelection != 'undefined')
       {
        if (getRTSelection == "crt")
        {
         this.__labelRepairOverall.setValue(crystals + divider + allOffRT);
         this.__labelRepairInf.setValue(infCry + divider + infRT);
         this.__labelRepairVehi.setValue(vehiCry + divider + vehiRT);
         this.__labelRepairAir.setValue(airCry + divider + airRT);
        }
        else if (getRTSelection == "hprt")
        {
         this.__labelRepairOverall.setValue(allOffHP.toFixed(2) + divider + allOffRT);
         this.__labelRepairInf.setValue(infHP.toFixed(2) + divider + infRT); 
         this.__labelRepairVehi.setValue(vehiHP.toFixed(2) + divider + vehiRT);
         this.__labelRepairAir.setValue(airHP.toFixed(2) + divider + airRT);
         
        }
        else
        {
         this.__labelRepairOverall.setValue(allOffRT);
         this.__labelRepairInf.setValue(infRT);
         this.__labelRepairVehi.setValue(vehiRT);
         this.__labelRepairAir.setValue(airRT); 
        } 
       }
       else //default
       {
        this.__labelRepairOverall.setValue(allOffRT);
        this.__labelRepairInf.setValue(infRT);
        this.__labelRepairVehi.setValue(vehiRT);
        this.__labelRepairAir.setValue(airRT);
       }
       
       this.setRTLabelColor(this.__labelRepairOverall, allOffHP.toFixed(2));
       this.setRTLabelColor(this.__labelRepairInf, infHP.toFixed(2));
       this.setRTLabelColor(this.__labelRepairVehi, vehiHP.toFixed(2));
       this.setRTLabelColor(this.__labelRepairAir, airHP.toFixed(2));
       
       if (infRT === allOffRT && infHP < 100)
        this.__labelRepairInf.setTextColor("black");
       else if (vehiRT === allOffRT && vehiHP < 100)
        this.__labelRepairVehi.setTextColor("black");
       else if (airRT === allOffRT && airHP < 100)
        this.__labelRepairAir.setTextColor("black");
       
       var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();

       var currRTStorage = Math.max(ownCity.GetResourceCount(8), ownCity.GetResourceCount(9), ownCity.GetResourceCount(10));
       this.__labelRepairStorage.setValue(phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(currRTStorage)));
       
       if (currRTStorage > allOffRTInSeconds)
        this.__labelRepairStorage.setTextColor("darkgreen");
       else
        this.__labelRepairStorage.setTextColor("red");
                            
       //Calculates the possible resources gained from simulation
       this.calcResources(entities);
      }
      catch(e)
      {
       console.log("Error Getting Player Unit Damage");
       console.log(e.toString());
      }
     },
     
                    /**
                     * All credit for the main layout of this function goes to KRS_L. Thanks to Topper42 and Deyhak for talking about it in the forums!
                     */
     calcResources: function(entities)
     {
      try
      {
                            //So we can splice and reduce the amount of time looping later on
                            buildingEnts = entities;
                            defEnts = entities;
                            
       var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
                            
                            //Pretty sure we just need the EResourceType
                            var lootArray = {1: 0, 2: 0, 3: 0, 6: 0}; //1: Tib, 2: Cry, 3: Gold(credits) 6: RP
       var lootArray2 = {1: 0, 2: 0, 3: 0, 6: 0}; 
       var mod = -1;
       var isFirstHarvester = false;
                            //Based on forums we need to cycle through the grid 
                            //Info needed is the building or structure information and the defensive units information
                            //Structure data can be retrieved by using get_City() and Defense data by get_DefenseSetup()
                            //See ClientLib.js.txt if you have it or can find it. These functions are under Type:ClientLib.Vis.VisMain
                            
                            //Let's do X coords as our outer loop there should be 0-8 or 9 slots.
                            for (var x = 0; x < 9; x++)
                            {
        
                                //Inner loop will be Y should be 8 slots or 0-7
                                for (var y = 0; y < 8; y++)
                                {
                                 var width =  ClientLib.Vis.VisMain.GetInstance().get_City().get_GridWidth();
                                 var height =  ClientLib.Vis.VisMain.GetInstance().get_City().get_GridHeight();
                                
                                 //Per the forums we should multiply x by the width and y by the height
                                    //Well GetObjectFromPosition doesn't work which is in the ClientLib.js.txt, but KRS_L has found the new function
                                 var cityEntity =  ClientLib.Vis.VisMain.GetInstance().GetObjectFromPosition(x * width, y * height);
             
                                    //Ok we have the city object or at least we hope we do. 
                                    //Forums says this can return empty fields so we need to check for that
                                    if (cityEntity !== null && typeof cityEntity.get_BuildingName == 'function')
                                    {                                        
                                        try {
                                            //Now loop through the entities from the simulation until we find a match
                                            if (typeof entities != 'undefined')
                                            {
                                                for (var idx = 0; idx < buildingEnts.length; idx++)
                                                {
                                                    var entity = buildingEnts[idx];
                                                    var unit = ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(entity.t);
    
                                                    //We've got a match!
                                                    if (unit.dn == cityEntity.get_BuildingName())
                                                    {          
                                                        mHealth = Simulator.getInstance().GetUnitMaxHealth(entity.l, unit);
                                                        mod = ((entity.sh  - entity.h) / 16) / mHealth;
                                                        if (unit.dn == "Harvester") 
                                                        {
                                                            var mod2 = cityEntity.get_BuildingDetails().get_HitpointsPercent();
                                                            if (Math.round(mod2 * 100) != Math.round(mod * 100))
                                                            {
                                                                mod = mod2;
                                                            }
                                                        }
                                                        var isSpliced = buildingEnts.splice(idx, 1);
                                                        break;
                                                    }
                                                    
                                                }
                                            } 
                                        }
                                        catch(e)
                                        {
                                            console.log("Error Calculating Resources 2");
                                            console.log(e);
                                            console.log(e.name + " " + e.message);
                                        }
                                        try {    
                                            var buildingDetails = cityEntity.get_BuildingDetails();
                                            
                                            if (mod == -1)
                                            {
                                                mod = buildingDetails.get_HitpointsPercent();
                                                if (cityEntity.get_BuildingName() == "Harvester") 
                                                {
                                                    var mod2 = cityEntity.get_BuildingDetails().get_HitpointsPercent();
                                                    if (Math.round(mod2 * 100) != Math.round(mod * 100))
                                                    {
                                                        mod = mod2;
                                                    }
                                                }
                                            }
                                     }
                                        catch(e)
                                        {
                                            console.log("Error Calculating Resources 3");
                                            console.log(e);
                                            console.log(e.name + " " + e.message);
                                        }
                                            
       
                                        var reqs = buildingDetails.get_UnitLevelRepairRequirements();
          
          for (var idx2 = 0; idx2 < reqs.length; idx2++)
          {
           var type = reqs[idx2].Type;
           var count = reqs[idx2].Count;
           lootArray[type] += Math.round((mod * count) - 0.5); //Rounding otherwise floating numbers
          }
                                        
                                        //reset mod
                                        mod = -1;
                                    }
        }
       }
                            
       for (var x = 0; x < 9; x++)
                            {
        
                                //Inner loop will be Y should be 8 slots or 0-7
        for (var y = 8; y < 16; y++)
        {
                                    try {
                                        var width =  ClientLib.Vis.VisMain.GetInstance().get_DefenseSetup().get_GridWidth();
                                        var height =  ClientLib.Vis.VisMain.GetInstance().get_DefenseSetup().get_GridHeight(); 
                                        if (y == 8)
                                        {
                                            width += 1;
                                            height += 1;
                                        }
                                        //Now do the same for defense units
                                        var defEntity = ClientLib.Vis.VisMain.GetInstance().GetObjectFromPosition(x * width, y * height);
                                        if (defEntity !== null && defEntity.get_VisObjectType() != ClientLib.Vis.VisObject.EObjectType.CityBuildingType && typeof defEntity.get_UnitDetails == 'function') 
                                        {
                                            if (typeof entities != 'undefined')
                                            {
                                                for (var idx = 0; idx < defEnts.length; idx++)
                                                {
                                                    var entity = defEnts[idx];
                                                    var unit = ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(entity.t);
                                                    
                                                    //Got a match!
                                                    if (unit.dn == defEntity.get_UnitName())
                                                    {
                                                        mHealth = Simulator.getInstance().GetUnitMaxHealth(entity.l, unit);
                                                        mod = ((entity.sh  - entity.h) / 16) / mHealth;
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
                                            
                                            for (var idx2 = 0; idx2 < reqs.length; idx2++)
                                            {
                                                var type = reqs[idx2].Type;
                                                var count = reqs[idx2].Count;
                                                lootArray[type] += Math.round((mod * count) - 0.5); //Rounding otherwise floating numbers
                                            }
                                            
                                            mod = -1;
                                        }
                                    }
                                    catch(e)
                                    {
                                        console.log("Error Calculating Resources 4");
                                        console.log(e);
                                        console.log(e.name + " " + e.message);
                                    }
                                }
                            }
       
                            if (typeof entities == 'undefined')
                            {
                                var totalLoot = lootArray[1] + lootArray[2] + lootArray[3] + lootArray[6];
                             this.__labelBattleLootTotal.setValue(Simulator.getInstance().formatNumbersCompact(totalLoot));
        this.__labelBattleLootTib.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[1]));
        this.__labelBattleLootCry.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[2]));
        this.__labelBattleLootCred.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[3]));
        this.__labelBattleLootRP.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[6]));
                            }
                            else
                            {
                                var totalLoot = lootArray[1] + lootArray[2] + lootArray[3] + lootArray[6];
        
        //If one has a "|", then they all have it.
        if (typeof localStorage['getDivider'] != 'undefined')
         var divider = localStorage['getDivider'];
        else
         var divider = "|";

                                var idxOf = this.__labelBattleLootTotal.getValue().indexOf(divider);
                                if ( idxOf != -1 )
                                {
                                    var subString = this.__labelBattleLootTotal.getValue().substring(idxOf - 1);
                                    this.__labelBattleLootTotal.setValue(Simulator.getInstance().formatNumbersCompact(totalLoot) + " " + subString);
         
         var subString = this.__labelBattleLootTib.getValue().substring(this.__labelBattleLootTib.getValue().indexOf(divider) - 1);
         this.__labelBattleLootTib.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[1]) + " " + subString);
         
         var subString = this.__labelBattleLootCry.getValue().substring(this.__labelBattleLootCry.getValue().indexOf(divider) - 1);
         this.__labelBattleLootCry.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[2]) + " " + subString);
         
         var subString = this.__labelBattleLootCred.getValue().substring(this.__labelBattleLootCred.getValue().indexOf(divider) - 1);
         this.__labelBattleLootCred.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[3]) + " " + subString);
         
                                    var subString = this.__labelBattleLootRP.getValue().substring(this.__labelBattleLootRP.getValue().indexOf(divider) - 1);
         this.__labelBattleLootRP.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[6]) + " " + subString);
                                }
                                else
                                {
                                    this.__labelBattleLootTotal.setValue(Simulator.getInstance().formatNumbersCompact(totalLoot) + " " + divider + " " + this.__labelBattleLootTotal.getValue());
         this.__labelBattleLootTib.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[1]) + " " + divider + " " + this.__labelBattleLootTib.getValue());
         this.__labelBattleLootCry.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[2]) + " " + divider + " " + this.__labelBattleLootCry.getValue());
         this.__labelBattleLootCred.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[3]) + " " + divider + " " + this.__labelBattleLootCred.getValue());
         this.__labelBattleLootRP.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[6]) + " " + divider + " " + this.__labelBattleLootRP.getValue());
                                }
                            }
      }
      catch(e)
      {
       console.log("Error Calculating Resources");
       console.log(e);
       console.log(e.name + " " + e.message);
      }
       
     },
     
     setRTLabelColor: function(label, number)
     {
      if (number < 25)
       label.setTextColor("red");
      else if (number < 75)
       label.setTextColor("orangered");
      else
       label.setTextColor("darkgreen");
     },
     
     setEHLabelColor: function(label, number)
     {
      if (number < 25)
       label.setTextColor("darkgreen");
      else if (number < 75)
       label.setTextColor("orangered");
      else
       label.setTextColor("red");
     },
     
     disableSimulateStatButtonTimer: function(timer)
     {
      try
      {
       if ( timer >= 1000)
       {
        this.isSimStatButtonDisabled = true;
        simStatBtn.setLabel(Math.floor(timer/1000));
        timer -= 1000;
        setTimeout(function () {
         Simulator.StatWindow.getInstance().disableSimulateStatButtonTimer(timer);
        }, 1000)
       }
       else
       {
        setTimeout(function () {
         simStatBtn.setEnabled(true);
         simStatBtn.setLabel("Update");
        }, timer)
        this.isSimStatButtonDisabled = false;
       }
      }
      catch(e)
      {
       console.log("Error disabling simulator button");
       console.log(e.toString());
      }
     }
    }
   });
   
   qx.Class.define("Simulator.OptionWindow", 
   {
    type: "singleton",
    extend: qx.ui.window.Window,
    
    construct: function()
    {
     this.base(arguments);
     this.setLayout(new qx.ui.layout.VBox(5));
     this.addListener("resize", function(){
      this.center();
     }, this);
     
     this.set({
      caption: "Simulator Options",
      width: 300,
      height: 300,
      allowMaximize: false,
      showMaximize: false,
      allowMinimize: false,
      showMinimize: false
     });
     var tabView = new qx.ui.tabview.TabView();
     tabView.set({height: 295, width: 295});
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
     if (typeof localStorage['isBtnRight'] != 'undefined')
     {
      if (localStorage['isBtnRight'] == "yes")
       this._buttonLocCB.setValue(true);
      else
       this._buttonLocCB.setValue(false);
     }

     if (typeof localStorage['isBtnNorm'] != 'undefined')
     {
      if (localStorage['isBtnNorm'] == "yes")
       this._buttonSizeCB.setValue(true);
      else
       this._buttonSizeCB.setValue(false);
       
      //Need to do this
      this.setButtonSize();
     }
     
     
     
     this._disableRTBtnCB = new qx.ui.form.CheckBox("Disable Repair Button");
     this._disableRTBtnCB.addListener("changeValue", this._onDisableRTBtnChange, this);
     if (typeof localStorage['isRTBtnDisabled'] != 'undefined')
     {
      if (localStorage['isRTBtnDisabled'] == "yes")
       this._disableRTBtnCB.setValue(true);
      else
       this._disableRTBtnCB.setValue(false);
     }
     
     this._disableCmtBtnCB = new qx.ui.form.CheckBox("Disable Combat Button");
     this._disableCmtBtnCB.addListener("changeValue", this._onDisableCmtBtnChange, this);
     if (typeof localStorage['isCmtBtnDisabled'] != 'undefined')
     {
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
     
     var simulatorHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({marginTop: 10});
     simulatorHeader.setThemedFont("bold");
     var simulatorTitle = new qx.ui.basic.Label("Simulator:");
     simulatorHeader.add(simulatorTitle);
     genPage.add(simulatorHeader);
     
     var simulatorBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
     this._autoSimulateCB = new qx.ui.form.CheckBox("Auto Start Simulation");
     
     if (typeof localStorage['autoSimulate'] != 'undefined')
     {
      if (localStorage['autoSimulate'] == "yes")
       this._autoSimulateCB.setValue(true);
     }
     
     var simulatorBox2 = new qx.ui.container.Composite(new qx.ui.layout.Grid(5)).set({marginLeft: 20});
     var simSpeedOpt1 = new qx.ui.form.RadioButton("x1");
     var simSpeedOpt2 = new qx.ui.form.RadioButton("x2");
     var simSpeedOpt4 = new qx.ui.form.RadioButton("x4");
     this._simSpeedGroup = new qx.ui.form.RadioGroup(simSpeedOpt1, simSpeedOpt2, simSpeedOpt4);
     this._simSpeedGroup.addListener("changeSelection", this._onSimSpeedChange, this);
     this._autoSimulateCB.addListener("changeValue", this._onAutoSimulateChange, this);
     if (typeof localStorage['simulateSpeed'] != 'undefined')
     {
      var options = this._simSpeedGroup.getSelectables(false);
      
      if (localStorage['simulateSpeed'] == "2")
       options[1].setValue(true);
      else if (localStorage['simulateSpeed'] == "4")
       options[2].setValue(true);
      else
       options[0].setValue(true);
     }
     if (this._autoSimulateCB.getValue() == false) { this._simSpeedGroup.setEnabled(false); }
     
     simulatorBox2.add(simSpeedOpt1, {row:0, column: 0});
     simulatorBox2.add(simSpeedOpt2, {row:0, column: 1});
     simulatorBox2.add(simSpeedOpt4, {row:0, column: 2});
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
     if (typeof localStorage['autoOpenStat'] != 'undefined')
     {
      if (localStorage['autoOpenStat'] == "yes")
       this._autoOpenCB.setValue(true);
      else 
       this._autoOpenCB.setValue(false);
     }
     
     statWindowBox.add(this._autoOpenCB);
     statsPage.add(statWindowBox);
     
     var repairSecHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({marginTop: 10});
     repairSecHeader.setThemedFont("bold");
     var repairSecTitle = new qx.ui.basic.Label("Repair Time Display:");
     repairSecHeader.add(repairSecTitle);
     statsPage.add(repairSecHeader);
     
     var repairSecBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
     var repairDisplayOpt1 = new qx.ui.form.RadioButton("C/RT");
     var repairDisplayOpt2 = new qx.ui.form.RadioButton("HP/RT");
     var repairDisplayOpt3 = new qx.ui.form.RadioButton("RT Only");
     this._repairSecGroup = new qx.ui.form.RadioGroup(repairDisplayOpt1, repairDisplayOpt2, repairDisplayOpt3);
     this._repairSecGroup.addListener("changeSelection", this._onRepairSelectionChange, this);
     if (typeof localStorage['getRTSelection'] != 'undefined')
     {
      var options = this._repairSecGroup.getSelectables(false);

      if (localStorage['getRTSelection'] == "hprt")
       options[1].setValue(true);
      else if (localStorage['getRTSelection'] == "rt")
       options[2].setValue(true);
      else
       options[0].setValue(true);
     }
     repairSecBox.add(repairDisplayOpt1);
     repairSecBox.add(repairDisplayOpt2);
     repairSecBox.add(repairDisplayOpt3);
     statsPage.add(repairSecBox);
     
     var dividerHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({marginTop: 10});
     dividerHeader.setThemedFont("bold");
     var dividerTitle = new qx.ui.basic.Label("Divider:");
     dividerHeader.add(dividerTitle);
     statsPage.add(dividerHeader);
     
     var dividerBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
     var dividerOpt1 = new qx.ui.form.RadioButton("|");
     var dividerOpt2 = new qx.ui.form.RadioButton("/");
     this._dividerGroup = new qx.ui.form.RadioGroup(dividerOpt1, dividerOpt2);
     this._dividerGroup.addListener("changeSelection", this._onDividerChange, this);
     if (typeof localStorage['getDivider'] != 'undefined')
     {
      var options = this._dividerGroup.getSelectables(false);

      if (localStorage['getDivider'] == "/")
       options[1].setValue(true);
      else
       options[0].setValue(true);
     }
     dividerBox.add(dividerOpt1);
     dividerBox.add(dividerOpt2);
     statsPage.add(dividerBox);
     
     var hideSecHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({marginTop: 10});
     hideSecHeader.setThemedFont("bold");
     var hideSecTitle = new qx.ui.basic.Label("Hide Sections (on Startup):");
     hideSecHeader.add(hideSecTitle);
     statsPage.add(hideSecHeader);
     
     var hideSecBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
     this._hideHealthCB = new qx.ui.form.CheckBox("Health");
     this._hideRepairCB = new qx.ui.form.CheckBox("Repair");
     this._hideMiscCB = new qx.ui.form.CheckBox("Misc");
     this._hideLootCB = new qx.ui.form.CheckBox("Loot");
     this._hideHealthCB.addListener("changeValue", this._onHideEHChange, this);
     this._hideRepairCB.addListener("changeValue", this._onHideRTChange, this);
     this._hideMiscCB.addListener("changeValue", this._onHideMiscChange, this);
     this._hideLootCB.addListener("changeValue", this._onHideLootChange, this);
     if (typeof localStorage['hideHealth'] != 'undefined')
     {
      if (localStorage['hideHealth'] == "yes")
       this._hideHealthCB.setValue(true);
      else 
       this._hideHealthCB.setValue(false);
     }
     if (typeof localStorage['hideRepair'] != 'undefined')
     {
      if (localStorage['hideRepair'] == "yes")
       this._hideRepairCB.setValue(true);
      else 
       this._hideRepairCB.setValue(false);
     }
     if (typeof localStorage['hideMisc'] != 'undefined')
     {
      if (localStorage['hideMisc'] == "yes")
       this._hideMiscCB.setValue(true);
      else 
       this._hideMiscCB.setValue(false);
     }
     if (typeof localStorage['hideLoot'] != 'undefined')
     {
      if (localStorage['hideLoot'] == "yes")
       this._hideLootCB.setValue(true);
      else 
       this._hideLootCB.setValue(false);
     }
     hideSecBox.add(this._hideHealthCB);
     hideSecBox.add(this._hideRepairCB);
     hideSecBox.add(this._hideMiscCB);
     hideSecBox.add(this._hideLootCB);
     statsPage.add(hideSecBox);
     
     var statPosHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({marginTop: 10});
     //statPosHeader.setThemedFont("bold");
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
    
    destruct: function()
    {
    },
    
    members:
    { 
     _buttonSizeCB: null,
     _buttonLocCB: null,
     _disableRTBtnCB: null,
     _disableCmtBtnCB: null,
     _autoOpenCB: null,
     _autoSimulateCB: null,
     _simSpeedGroup: null,
     _repairSecGroup: null,
     _dividerGroup: null,
     _hideHealthCB: null,
     _hideRepairCB: null,
     _hideMiscCB: null,
     _hideLootCB: null,
     
     _onButtonSizeChange: function()
     {
      try
      {
       value = this._buttonSizeCB.getValue();
       
       if (value == true)
        localStorage['isBtnNorm'] = "yes";
       else 
        localStorage['isBtnNorm'] = "no";
        
       this.setButtonSize(); 
      }
      catch(e)
      {
       console.log("Error Button Size Change: " + e.toString());
      }
     },
     
     _onButtonLocChange: function()
     {
      try
      {
       value = this._buttonLocCB.getValue();
        
       if (value == true)
        localStorage['isBtnRight'] = "yes";
       else 
        localStorage['isBtnRight'] = "no";
        
       this.setButtonLoc(); 
      }
      catch(e)
      {
       console.log("Error Button Location Change: " + e.toString());
      }
     },
     
     _onDisableRTBtnChange: function()
     {
      try
      {
       value = this._disableRTBtnCB.getValue();
        
       if (value == true)
        localStorage['isRTBtnDisabled'] = "yes";
       else      
        localStorage['isRTBtnDisabled'] = "no";
        
       this.setRTBtn(value); 
      }
      catch(e)
      {
       console.log("Error Disable RT Button Change: " + e.toString());
      }
     },
     
     _onDisableCmtBtnChange: function()
     {
      try
      {
       value = this._disableCmtBtnCB.getValue();
        
       if (value == true)
        localStorage['isCmtBtnDisabled'] = "yes";
       else 
        localStorage['isCmtBtnDisabled'] = "no";
        
       this.setCmtBtn(value); 
      }
      catch(e)
      {
       console.log("Error Disable Cmt Button Change: " + e.toString());
      }
     },
     
     _onRepairSelectionChange: function(selection)
     {
      try
      {
       var option = selection.getData()[0];
       var label = option.getLabel();
       
       if (label == "C/RT")
        localStorage['getRTSelection'] = "crt";
       else if (label == "HP/RT")
        localStorage['getRTSelection'] = "hprt";
       else
        localStorage['getRTSelection'] = "rt";
      } 
      catch(e)
      {
       console.log("Error Repair Section Selection Change: " + e.toString());
      }
     },
     
     _onAutoOpenStatsChange: function()
     {
      try
      {
       var value = this._autoOpenCB.getValue();

       if (value == false)
        localStorage['autoOpenStat'] = "no";
       else
        localStorage['autoOpenStat'] = "yes";
      }
      catch(e)
      {
       console.log("Error Auto Open Stats Change: " + e.toString());
      }
     },
     
     _onAutoSimulateChange: function()
     {
      try
      {
       var value = this._autoSimulateCB.getValue();
       if (value == false)
       {
        this._simSpeedGroup.setEnabled(false);
        localStorage['autoSimulate'] = "no";
       }
       else
       {
        this._simSpeedGroup.setEnabled(true);
        localStorage['autoSimulate'] = "yes";
       }
      }
      catch(e)
      {
       console.log("Error Auto Simulate Change: " + e.toString());
      }
     },
     
     _onSimSpeedChange: function(selection)
     {
      try
      {
       var option = selection.getData()[0];
       var label = option.getLabel();
       
       if (label == "x1")
        localStorage['simulateSpeed'] = "1";
       else if (label == "x2")
        localStorage['simulateSpeed'] = "2";
       else
        localStorage['simulateSpeed'] = "4";
      }
      catch(e)
      {
       console.log("Error Sim Speed Change: " + e.toString());
      }
     },
     
     _onDividerChange: function(selection)
     {
      try
      {
       var option = selection.getData()[0];
       var label = option.getLabel();
      
       if (label == "/")
        localStorage['getDivider'] = "/";
       else
        localStorage['getDivider'] = "|";
       
       //Go ahead and recalculate loot so there is no issues
       Simulator.StatWindow.getInstance().calcResources();
      }
      catch(e)
      {
       console.log("Error Divider Change: " + e.toString());
      }
     },
     
     _onHideEHChange: function()
     {
      try
      {
       value = this._hideHealthCB.getValue();
        
       if (value == true)
        localStorage['hideHealth'] = "yes";
       else 
        localStorage['hideHealth'] = "no";
         
      }
      catch(e)
      {
       console.log("Error Hide Enemy Base Health Change: " + e.toString());
      }
     },
     
     _onHideRTChange: function()
     {
      try
      {
       value = this._hideRepairCB.getValue();
        
       if (value == true)
        localStorage['hideRepair'] = "yes";
       else 
        localStorage['hideRepair'] = "no";
         
      }
      catch(e)
      {
       console.log("Error Hide Repair Times Change: " + e.toString());
      }
     },
     
     _onHideMiscChange: function()
     {
      try
      {
       value = this._hideMiscCB.getValue();
        
       if (value == true)
        localStorage['hideMisc'] = "yes";
       else 
        localStorage['hideMisc'] = "no";
         
      }
      catch(e)
      {
       console.log("Error Hide Misc Change: " + e.toString());
      }
     },
     
     _onHideLootChange: function()
     {
      try
      {
       value = this._hideLootCB.getValue();
        
       if (value == true)
        localStorage['hideLoot'] = "yes";
       else 
        localStorage['hideLoot'] = "no";
         
      }
      catch(e)
      {
       console.log("Error Hide Loot Change: " + e.toString());
      }
     },
     
     _onSetStatWindowPositionChange: function()
     {
      try
      {
       var props = Simulator.StatWindow.getInstance().getLayoutProperties();
       localStorage['statWindowPosLeft'] = props["left"];
       localStorage['statWindowPosTop'] = props["top"];
      }
      catch(e)
      {
       console.log("Error Stat Window Position Change: " + e.toString());
      }
     },
     
     setRTBtn: function(value)
     {
      if (value == true)
       unlockRTBtn.hide();
      else
       unlockRTBtn.show();
     },
     
     setCmtBtn: function(value)
     {
      if (value == true)
       unlockCmtBtn.hide();
      else
       unlockCmtBtn.show();
     },
     
     setButtonLoc: function()
     {
      try
      {
       value = this._buttonLocCB.getValue();
       size = this._buttonSizeCB.getValue();

       if (value == true) //Right
       {
        var pLeft = null;
        if (size == true) //Right Normal
         var pRight = 58;
        else //Right Small
         var pRight = 70;
        
        armyBar.add(simBtn,{left: pLeft, right: pRight, bottom: 119});
        armyBar.add(statBtn,{left: pLeft, right: pRight, bottom: 81});
        armyBar.add(optionBtn,{left: pLeft, right: pRight, bottom: 43});
        armyBar.add(layoutBtn,{left: pLeft, right: pRight, bottom: 5}); 

        playArea.add(shiftUpBtn,{left: pLeft, right: 70, bottom: 110});
        playArea.add(shiftDownBtn,{left: pLeft, right: 70, bottom: 70});
        playArea.add(shiftLeftBtn,{left: pLeft, right: 90, bottom: 90});
        playArea.add(shiftRightBtn,{left: pLeft, right: 50, bottom: 90});
        playArea.add(disableAllUnitsBtn,{left: pLeft, right: 6, bottom: 120});
        playArea.add(mirrorBtn,{left: pLeft, right: 6, bottom: 160});
        playArea.add(armyUndoBtn,{left: pLeft, right: 6, bottom: 200}); 
        playArea.add(quickSaveBtn, {left: pLeft, right: 6, bottom: 240});
       }
       else //Left
       {
        var pRight = null;
        if (size == true) //Left Normal
         var pLeft = 13;
        else 
         var pLeft = 83;
         
        armyBar.add(simBtn,{left: pLeft, right: pRight, bottom: 120});
        armyBar.add(statBtn,{left: pLeft, right: pRight, bottom: 82});
        armyBar.add(optionBtn,{left: pLeft, right: pRight, bottom: 44});
        armyBar.add(layoutBtn,{left: pLeft, right: pRight, bottom: 6});
        
        playArea.add(shiftUpBtn,{left: 80, right: pRight, bottom: 110});
        playArea.add(shiftDownBtn,{left: 80, right: pRight, bottom: 70});
        playArea.add(shiftLeftBtn,{left: 60, right: pRight, bottom: 90});
        playArea.add(shiftRightBtn,{left: 100, right: pRight, bottom: 90});
        playArea.add(disableAllUnitsBtn,{left: 6, right: pRight, bottom: 120});
        playArea.add(mirrorBtn,{left: 6, right: pRight, bottom: 160});
        playArea.add(armyUndoBtn,{left: 6, right: pRight, bottom: 200});
        playArea.add(quickSaveBtn, {left: 6, right: pRight, bottom: 240});
       }
      }
      catch(e)
      {
       console.log("Error Setting Button Location: " + e.toString());
      }
     },
     
     setButtonSize: function()
     {
      try
      {
       value = this._buttonSizeCB.getValue();
       
       if (value == true)
       {
        simBtn.setLabel("Simulate");
        simBtn.setWidth(60);
        
        statBtn.setLabel("Stats");
        statBtn.setWidth(60);
        
        optionBtn.setLabel("Options");
        optionBtn.setWidth(60);
        
        layoutBtn.setLabel("Layout");
        layoutBtn.setWidth(60);
       }
       else
       {
        simBtn.setLabel("S");
        simBtn.setWidth(30);
        
        statBtn.setLabel("I");
        statBtn.setWidth(30);
        
        optionBtn.setLabel("O");
        optionBtn.setWidth(30);
        
        layoutBtn.setLabel("L");
        layoutBtn.setWidth(30);
       }
       
       this.setButtonLoc();       
      }
      catch(e)
      {
       console.log("Error Setting Button Size: " + e.toString());
      }
     }
    }
   });
   
   qx.Class.define("Simulator.LayoutWindow", 
   {
    type: "singleton",
    extend: webfrontend.gui.CustomWindow,
    
    construct: function()
    {
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
     
     var layoutListHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ decorator: "pane-light-opaque"});
     var layoutListTitle = new qx.ui.basic.Label("Formation Saver").set({ alignX: "center", alignY: "top", font: "font_size_14_bold"});
     layoutListHeader.add(layoutListTitle);
     this.add(layoutListHeader);
     
     this.layoutList = new qx.ui.form.List();
     this.layoutList.set(
     {
       selectionMode : "one",
       height: 100,
       width: 150,
       margin: 5
     });
     this.add(this.layoutList);
     
     var listButtonBox = new qx.ui.container.Composite();
     var listButtonLayout = new qx.ui.layout.HBox(5, "center");
     listButtonBox.setLayout(listButtonLayout);
     var loadButton = new qx.ui.form.Button("Load");
     var deleteButton = new qx.ui.form.Button("Delete");
     loadButton.set({ height: 15, width: 70, alignX: "center" });
     loadButton.addListener("click", this.loadLayout, this);
     deleteButton.set({ height: 15, width: 70, alignX: "center" });
     deleteButton.addListener("click", this.deleteLayout, this);
     listButtonBox.add(loadButton);
     listButtonBox.add(deleteButton);
     this.add(listButtonBox);
     
     var saveLayoutBox = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({spacing: 10})).set({marginTop: 20, marginLeft: 5});
     this.layoutTextBox = new qx.ui.form.TextField("").set({width: 75, maxLength: 15});
     var saveButton = new qx.ui.form.Button("Save");
     saveButton.set({ height: 10, width: 70, alignX: "center" });
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
     var noticeText = new qx.ui.basic.Label("").set({ alignX: "center", alignY: "top"});
     noticeText.setValue("<p align=\'justify\'><b>If formation does not change on load, try moving one unit first, then try again.</b></p>"); 
     noticeText.set({rich: true, wrap: true, width: 165, textColor: "white"});
     noticeBox.add(noticeText);
     this.add(noticeBox);
     
     var clearAllLayoutsBox = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({alignX: "center", marginTop: 5, marginLeft: 5, allowGrowX: false});
     var clearAllLayoutsBtn = new qx.ui.form.Button("Clear All").set({alignX: "center", width: 70});
     clearAllLayoutsBtn.addListener("click", this.clearAllLayouts, this);
     clearAllLayoutsBox.add(clearAllLayoutsBtn);
     this.add(clearAllLayoutsBox);
     
     this.layoutsArray = new Array();    
    },
    
    destruct: function()
    {
    },
    
    members:
    {
     layoutList: null,
     layoutTextBox: null,
     layoutsArray: null,
     persistentCheck: null,
     
     saveNewLayout: function(isQS)
     {  
      try
      {
      
       console.log("Saving Layout");
       //if (this.layoutTextBox.getValue() == "" && typeof isQS == 'undefined')
       //{
       // alert("Need to apply a name to the layout");
       // return;
       //}
       
       if ((typeof isQS != 'undefined' && isQS == true) || this.layoutTextBox.getValue() == "")
       {
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var hour = (date.getHours() < 10) ? "0" + date.getHours() : date.getHours();
        var minute = (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes();
        var second = (date.getSeconds() < 10) ? "0" + date.getSeconds() : date.getSeconds();
        var label = month + "/" + day + "@" + hour + ":" + minute + ":" + second;
       }
       else
       {
        var label = this.layoutTextBox.getValue();
       }
       
       var cityID = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
       var ownCityID = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();
       var model = ownCityID + "." + cityID + "." + label;
       
       var children = this.layoutList.getChildren();
       //Check for same layout name if so do NOT save
       for (var item = 0; item < children.length; item++)
       {
        thisItem = children[item].getModel();
        if (thisItem == model)
        {
         alert("Save Failed: Duplicate Name");
         return;
        }
       }
       var units = Simulator.getInstance().getCityPreArmyUnits().get_ArmyUnits().l;
       units = this.prepareLayout(units);
       
       var layoutInformation = {};
       if (this.persistentCheck.getValue() == true)
       {
        layoutInformation = { id: model, label: label, formation: units, pers: "yes", };
       }
       else
       {
        layoutInformation = { id: model, label: label, formation: units, pers: "no", };
       } 
       this.layoutsArray.push(layoutInformation);
       this.layoutList.add(new qx.ui.form.ListItem(layoutInformation.label, null, layoutInformation.id));
       this.layoutTextBox.setValue("");
       quickSaveBtn.setLabel("?");
       (function(quickSaveBtn) {
        setTimeout(function()
        {
         quickSaveBtn.setLabel("QS");
        }, 2000);
       }(quickSaveBtn));
       this.updateStorage();
      }
      catch(e)
      {
       console.log("Error Saving Layout");
       console.log(e);
      }
     },
     
     loadLayout: function()
     {
      try
      {
       console.log("Loading Layout");
       var ownCityID = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();

       var layout = this.layoutList.getSelection()[0].getModel();
       for( var item in this.layoutsArray)
       {
        var thisLayout = this.layoutsArray[item].id; 
        
        if (thisLayout == layout)
        {
         Simulator.getInstance().restoreFormation(this.layoutsArray[item].formation);
         break;
        }
       }
      }
      catch(e)
      {
       console.log("Error Loading Layout");
       console.log(e);
      }
     },
     
     deleteLayout: function()
     {    
      try
      {
       console.log("Deleting Layout");
       //Remove from our array too
       var rUSure = confirm('Are you sure you want to delete this layout?');
       if(!rUSure)
       {
        return;
       }
       for (var item in this.layoutsArray)
       {
        if (this.layoutsArray[item].id == this.layoutList.getSelection()[0].getModel())
        {
         var isRemoved = this.layoutsArray.splice(item, 1);
         this.updateStorage();
        }
       }
       
       //The update will remove all and repopulate so no need to delete individual ones.
       this.updateLayoutList();
      }
      catch(e)
      {
       console.log("Error Deleting Layout");
       console.log(e);
      }
     },
     
     updateStorage: function()
     {
      try
      {
       console.log("Updating Storage");
       localStorage['savedFormations'] = JSON.stringify(this.layoutsArray);
      }
      catch(e)
      {
       console.log("Error updating localStorage");
       console.log(e);
      }
     },
     
     updateLayoutList: function()
     {
      try
      {
       console.log("Updating Layout List");
       var savedLayouts = localStorage['savedFormations'];
       if (typeof savedLayouts != 'undefined')
       {
        this.layoutsArray = JSON.parse(savedLayouts);
       }
       this.layoutList.removeAll(); //Clear List
       var cityID = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
       var ownCityID = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();
       var model = ownCityID + "." + cityID;
       
       for (var item in this.layoutsArray)
       {
        var itemLabel = this.layoutsArray[item].label;
        var itemModel = model + "." + itemLabel;
        var pers = this.layoutsArray[item].pers;
        var match = this.layoutsArray[item].id.match(ownCityID.toString());

        if (itemModel == this.layoutsArray[item].id || ((typeof pers != 'undefined' && pers == "yes") && match != null))//Match!
        {
         this.layoutList.add(new qx.ui.form.ListItem(itemLabel, null, this.layoutsArray[item].id));
        }
       }
      }
      catch(e)
      {
       console.log("Error Updating Layout List");
       console.log(e);
      }
     },
     
     //Function from C&C Tiberium Alliances Combat Simulator script. Works well and does exactly what I need! 
     //For authors see: http://userscripts.org/scripts/show/145717
     prepareLayout: function (units) 
     {
      try
      {
       console.log("Preparing Layout for Saving");
       saved_units = [];
       for (var i = 0; i < units.length; i++) 
       {
        var unit = units[i];
        var armyUnit = {};
        armyUnit.x = unit.get_CoordX();
        armyUnit.y = unit.get_CoordY();
        armyUnit.id = unit.get_Id();
        armyUnit.enabled = unit.get_Enabled();
        saved_units.push(armyUnit);
       }
       return saved_units;
      }
      catch(e)
      {
       console.log("Error Preparing Unit Layout");
       console.log(e);
      }
     },
     
     clearAllLayouts: function()
     {
      try
      {
       console.log("Clearing All Layouts");
       var rUSure = confirm("Clicking OK will delete all of your saved layouts from every base!");
       
       if (rUSure)
       {
        localStorage.removeItem('savedFormations');
        this.layoutsArray = new Array();
        alert("All saved layouts have been deleted.");
        
        this.updateLayoutList();
       }
       else
       {
        alert("No layouts were deleted.");
       }
      }
      catch(e)
      {
       console.log("Error Clearing All Layouts");
       console.log(e);
      }
     }
    }
   });
  }
  
  function onViewChanged(oldMode, newMode)
  {
   setTimeout(function() 
   {
    try
    {
     console.log("View Changed");
     Simulator.OptionWindow.getInstance().close();
     Simulator.LayoutWindow.getInstance().close();
     if (newMode != ClientLib.Vis.Mode.CombatSetup && newMode != ClientLib.Vis.Mode.Battleground)
     {
      Simulator.StatWindow.getInstance().close();
      //Also reset temp formation array
      Simulator.getInstance().armyTempFormations = new Array();
      Simulator.getInstance().armyTempIdx = 0;
      armyUndoBtn.setEnabled(false);
      Simulator.getInstance().isSimulation = false;
     }
     else if (newMode == ClientLib.Vis.Mode.CombatSetup)
     {      
      var autoStatOpen = localStorage['autoOpenStat'];
      if (typeof autoStatOpen != 'undefined')
      {
       if (autoStatOpen == "yes")
       {
        //Why not auto-open the Stat window? Sounds like a good idea
        Simulator.StatWindow.getInstance().open();
       }
      }
      else
      {
       Simulator.StatWindow.getInstance().open();
      }
      
      if (Simulator.getInstance().isSimulation == false)
       setTimeout(function() { Simulator.StatWindow.getInstance().calcResources(); }, 2000);
      else
       Simulator.getInstance().isSimulation = false;
      
      if (oldMode != ClientLib.Vis.Mode.Battleground)
       Simulator.getInstance().saveTempFormation(); //Save the very first formation upon entering base.
     }
     
     if (ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity() != null)
     {
      var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().get_Name();
      var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_Name();
      //Don't want shift formation buttons showing up during combat or in own player's cities
      if (newMode == ClientLib.Vis.Mode.Battleground || city == ownCity)
      {
       shiftUpBtn.hide();
       shiftDownBtn.hide();
       shiftLeftBtn.hide();
       shiftRightBtn.hide();
       disableAllUnitsBtn.hide();
       mirrorBtn.hide();
       armyUndoBtn.hide();
       quickSaveBtn.hide();
      }
      else if (city != ownCity) 
      {
       shiftUpBtn.show();
       shiftDownBtn.show();
       shiftLeftBtn.show();
       shiftRightBtn.show();
       disableAllUnitsBtn.show();
       mirrorBtn.show();
       armyUndoBtn.show();
       quickSaveBtn.show();
      }
     }
    }
    catch(e)
    {
     console.log("Error closing windows or hiding buttons on view change");
     console.log(e.toString());
    }
   }, 500);
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
        Simulator.getInstance().attachNetEvent = webfrontend.gui.Util.attachNetEvent;
       else
        Simulator.getInstance().attachNetEvent = phe.cnc.Util.attachNetEvent;
                        
       //Current Server patch (World 52 - US East Coast) uses webfrontend
       if (typeof phe.cnc.gui.util == 'undefined')
        Simulator.getInstance().formatNumbersCompact = webfrontend.gui.Util.formatNumbersCompact;    
       else
        Simulator.getInstance().formatNumbersCompact = phe.cnc.gui.util.Numbers.formatNumbersCompact;   
       
       // Strange Hacks - provided by Topper42
       // don't try this at home ;)
       if (typeof ClientLib.API.Util.GetUnitMaxHealth == 'undefined')
        for (var key in ClientLib.Base.Util)
        {
         var strFunction = ClientLib.Base.Util[key].toString();
         if ( strFunction.indexOf("*=1.1") > -1 || strFunction.indexOf("*= 1.1") > -1)
         {
          Simulator.getInstance().GetUnitMaxHealth = ClientLib.Base.Util[key];
          break;
         }
        }
       else
        Simulator.getInstance().GetUnitMaxHealth = ClientLib.API.Util.GetUnitMaxHealth;    
        
       //Thanks to KRS_L for this next section solving the repair calculations until the new patch is on every server
       if (PerforceChangelist >= 392583) {
                            var u = "" + ClientLib.Data.Cities.prototype.get_CurrentCity;
                            for (var a in ClientLib.Data.Cities.prototype) if (ClientLib.Data.Cities.prototype.hasOwnProperty(a) && "function" == typeof ClientLib.Data.Cities.prototype[a]) {
                                var l = "" + ClientLib.Data.Cities.prototype[a];
                                if (l.indexOf(u) > -1 && 6 == a.length) {
                                    u = a;
                                    break
                                }
                            }
                            var c = "" + ClientLib.Data.Cities.prototype.get_CurrentOwnCity;
                            for (var h in ClientLib.Data.Cities.prototype) if (ClientLib.Data.Cities.prototype.hasOwnProperty(h) && "function" == typeof ClientLib.Data.Cities.prototype[h]) {
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
       Simulator.getInstance().attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this , onViewChanged);
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
  };
  window.setTimeout(waitForGame, 1000);
 }
 
 var script = document.createElement("script");
    var txt = injectFunction.toString();
 script.innerHTML = "(" + txt + ")();";
 script.type = "text/javascript";
    
    document.getElementsByTagName("head")[0].appendChild(script);
})();
		elda_hasload(163642);
	} else {
		elda_hasnotload(163642);
	}
} catch (e) {
    GM_log(e);
	GM_log(e.name + " " + e.message);
}

/*
URL:		http://userscripts.org/scripts/source/150958.user.js
Id:		150958
Name:		Tiberium Alliances Formation Saver
Version:	2.1.9

*/
try {

	elda_addon_info[150958] = {
		id: 150958,
		name: "Tiberium Alliances Formation Saver",
		version: "2.1.9",
		date: "",
		can_disabled: true,
		loaded: false
	};

	if(elda_hastoload(150958)) {

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
		elda_hasload(150958);
	} else {
		elda_hasnotload(150958);
	}
} catch (e) {
    GM_log(e);
	GM_log(e.name + " " + e.message);
}

/*
URL:		http://userscripts.org/scripts/source/155508.user.js
Id:		155508
Name:		C&C: Tiberium Alliances CNCOpt DB
Version:	1.3a
Date:		2013-02-05

*/
try {

	elda_addon_info[155508] = {
		id: 155508,
		name: "C&C: Tiberium Alliances CNCOpt DB",
		version: "1.3a",
		date: "2013-02-05",
		can_disabled: true,
		loaded: false
	};

	if(elda_hastoload(155508)) {
/* 

Based on:
http://userscripts.org/scripts/source/152799.user.js

Version 1.3
Fix error (from Update)

Version 1.2:
Add Config menu for Auto Save

Version 1.1.1:
Auto get links of GDI + NOD Bases

Version 1.1:
Better Database layout. (Old Database is ported to new DB)
make a history of links for a base. (Working on GUI)

*/
var scity = null;
var tcity = null;
var tbase = null;
try {
    (function () {
        var cncopt_main = function () {      
            
            var cncopt_db_version = "1.1";
            
            var defense_unit_map = {
                // GDI Defense Units 
                "GDI_Wall": "w",
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
                // Nod Defense Units 
                "NOD_Def_Antitank Barrier": "t",
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
                
                // Forgotten Defense Units 
                "FOR_Wall": "w",
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
                // GDI Offense Units 
                "GDI_APC Guardian": "g",
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
                
                // Nod Offense Units 
                "NOD_Attack Bike": "b",
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
                    //log_it(typeof(city[k]), "1.city[", k, "]", city[k])
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
            
            function countProperties(obj) {
        var count = 0;
    
                for(var prop in obj) {
                    if(obj.hasOwnProperty(prop))
                        ++count;
                }
            
                return count;
            }
            
            function findBuildings(city) {
                var cityBuildings = city.get_CityBuildingsData();
    
                
                //console.log("[cityBuildings]", cityBuildings);
                for (var k in cityBuildings) {                            
                    
                    if (PerforceChangelist >= 376877) {
                        if ((typeof (cityBuildings[k]) === "object") && cityBuildings[k] && "d" in cityBuildings[k]) {
                            console.log("[(ityBuildings[k].d]", countProperties(cityBuildings[k].d) ,cityBuildings[k].d);
                            if(countProperties(cityBuildings[k].d) > 0) {
                                return cityBuildings[k].d;
                            }
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
                                    
                                  console.log("getUnitArrays",city[k][k2]);
                                    
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
                for(var i = 0; i < arr.length; ++i) {
                    for(var j in arr[i]) {
                        if (isOffenseUnit(arr[i][j])) {
                            return arr[i];
                        }
                    }
                }
                return [];
            }
            
            
            
            function cncopt_create() {
                log_it("CNCOpt DB v" + cncopt_db_version + " loaded");  
                var cncopt = {
                    selected_base: null,
                    keymap: {
                        // GDI Buildings 
                        "GDI_Accumulator": "a",
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
                        // Forgotten Buildings 
                        "FOR_Silo": "s",
                        "FOR_Refinery": "r",
                        "FOR_Tiberium Booster": "b",
                        "FOR_Crystal Booster": "v",
                        "FOR_Trade Center": "u",
                        "FOR_Defense Facility": "w",
                        "FOR_Construction Yard": "y",
                        "FOR_Harvester_Tiberium": "h",
                        "FOR_Defense HQ": "q",
                        "FOR_Harvester_Crystal": "n",
                        // Nod Buildings 
                        "NOD_Refinery": "r",
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
                        
                        // GDI Defense Units 
                        "GDI_Wall": "w",
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
                        // Nod Defense Units 
                        "NOD_Def_Antitank Barrier": "t",
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
                        
                        // Forgotten Defense Units 
                        "FOR_Wall": "w",
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
                        
                        // GDI Offense Units 
                        "GDI_APC Guardian": "g",
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
                        
                        // Nod Offense Units 
                        "NOD_Attack Bike": "b",
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
                    make_sharelink: function (openlink) {
                         try {
                            var selected_base = cncopt.selected_base;
                            var city_id = selected_base.get_Id();
                            var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(city_id);
                            var own_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                            var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
                            tbase = selected_base;
                            tcity = city;
                            scity = own_city;
                            //log_it("Target City: ", city);
                            //log_it("Own City: ", own_city);
                            console.log("cncopt [city]: ",  city);
                                                
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
                                    log_it("cncopt: Unknown faction: " + city.get_CityFaction());
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
                                    log_it("cncopt: Unknown faction: " + own_city.get_CityFaction());
                                    link += "E|";
                                    break;
                            }
                            link += city.get_Name() + "|";
                            //link += "|";
                            defense_units = [];
                            for (var i = 0; i < 20; ++i) {
                                var col = [];
                                for (var j = 0; j < 9; ++j) {
                                    col.push(null);
                                }
                                defense_units.push(col);
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
                            
                            offense_units = [];
                            for (var i = 0; i < 20; ++i) {
                                var col = [];
                                for (var j = 0; j < 9; ++j) {
                                    col.push(null);
                                }
                                offense_units.push(col);
                            }
                            
                            var offense_unit_list = getOffenseUnits(own_city);
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
                                    try {
                                        
                                    if (spot && spot.BuildingIndex >= 0) {
                                        building = buildings[spot.BuildingIndex];
                                        console.log("building..",building);
                                        if(building != null){
                                            level = building.get_CurrentLevel();
                                        } 
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
                                    
                                      } catch (e) {
                                            console.log("cncopt [8]: ", e.message);
                                       }
                                    
                                    switch (i > 16 ? 0 : city.GetResourceType(j, i)) {
                                        case 0:
                                            if (building) {
                                                var techId = building.get_MdbBuildingId();
                                                if (GAMEDATA.Tech[techId].n in cncopt.keymap) {
                                                    link += cncopt.keymap[GAMEDATA.Tech[techId].n];
                                                } else {
                                                    log_it("cncopt [5]: Unhandled building: " + techId, building);
                                                    link += ".";
                                                }
                                            } else if (defense_unit) {
                                                if (defense_unit.get_UnitGameData_Obj().n in cncopt.keymap) {
                                                    link += cncopt.keymap[defense_unit.get_UnitGameData_Obj().n];
                                                } else {
                                                    log_it("cncopt [5]: Unhandled unit: " + defense_unit.get_UnitGameData_Obj().n);
                                                    link += ".";
                                                }
                                            } else if (offense_unit) {
                                                if (offense_unit.get_UnitGameData_Obj().n in cncopt.keymap) {
                                                    link += cncopt.keymap[offense_unit.get_UnitGameData_Obj().n];
                                                } else {
                                                    log_it("cncopt [5]: Unhandled unit: " + offense_unit.get_UnitGameData_Obj().n);
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
                                            log_it("cncopt [4]: Unhandled resource type: " + city.GetResourceType(j, i));
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
                            
                            //link += "#city_id=" + city_id;
                            //log_it(link);
                            if(openlink) {
                                window.open(link, "_blank");
                            }
                            
                            /*
                            Storage_bases[city_id] = {
                            city_id: city_id,
                            city_name: city.get_Name()
                            city_faction: city.get_CityFaction(),
                            scan_date: new Date().getTime(),
                            link: link
                            };*/
                            
                            var link_db = {scan_date: new Date().getTime(), link: link};
                            
                            if(typeof Storage_bases['base'][city_id] == 'undefined') {
                                Storage_bases['base'][city_id] = {
                                    city_id: city_id,
                                    city_name: city.get_Name(),
                                    city_faction: city.get_CityFaction(),
                                    city_userid: 0,
                                    scans: [link_db],
                                    names: [city.get_Name()]
                                };
                                
                            } else {
                                Storage_bases['base'][city_id]['city_name'] = city.get_Name();
                                Storage_bases['base'][city_id]['city_faction'] = city.get_CityFaction();
                                Storage_bases['base'][city_id]['city_userid'] = 0;
                                
                                var last_scan = get_last_scan(city_id);
                                
                                if(last_scan['link'] == link) {
                                    Storage_bases['base'][city_id]['scans'][Storage_bases['base'][city_id]['scans'].length-1]['scan_date'] = new Date().getTime();
                                } else {
                                    Storage_bases['base'][city_id]['scans'][Storage_bases['base'][city_id]['scans'].length] = link_db;
                                }
                                
                                
                                var tmp_name = false;
                                for (var i in Storage_bases['base'][city_id]['names']) {
                                    if(i == city.get_Name()) {
                                        tmp_name = true;
                                        break;
                                    }
                                    
                                }
                                if(!tmp_name) {
                                    Storage_bases['base'][city_id]['names'][Storage_bases['base'][city_id]['names'].length] = city.get_Name();
                                }        
                            }
                           
                            saveDB();
                            
                            return link;
                       
                        } catch (e) {
                            console.log("cncopt [1]: ", e.message);
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
                        cncopt.selected_base = selected_base;
                        
                        if (this.__cncopt_db_initialized != 1) {
                            this.__cncopt_db_initialized = 1;
                            this.__cncopt_db_links = [];
                            for (var i in this) {
                                try {
                                    if (this[i] && this[i].basename == "Composite") {
                                        var link = new qx.ui.form.Button("CNCOpt DB", "http://cncopt.com/favicon.ico");
                                        link.addListener("execute", function () {
                                            var bt = qx.core.Init.getApplication();
                                            bt.getBackgroundArea().closeCityInfo(); 
                                            var city_id = cncopt.selected_base.get_Id();
                                            if(typeof Storage_bases['base'][city_id] != 'undefined') {
                                                var last_scan = get_last_scan(city_id);
                                                window.open(last_scan['link'], "_blank");
                                            }
                                        });
                                        link.setBlockToolTip(true);
                                        link.setEnabled(false);
                                        this[i].add(link);
                                        this.__cncopt_db_links.push(link);
                                    }
                                } catch (e) {
                                    console.log("cncopt [2]: ", e.message);
                                }
                            }
                        }                      
                        
                        if (this.__cncopt_initialized != 1) {
                            this.__cncopt_initialized = 1;
                            this.__cncopt_links = [];
                            for (var i in this) {
                                try {
                                    if (this[i] && this[i].basename == "Composite") {
                                        var link = new qx.ui.form.Button("CNCOpt", "http://cncopt.com/favicon.ico");
                                        link.addListener("execute", function () {
                                            var bt = qx.core.Init.getApplication();
                                            bt.getBackgroundArea().closeCityInfo();
                                            cncopt.make_sharelink(true);
                                        });
                                        link.setEnabled(false);
                                        this[i].add(link);
                                        this.__cncopt_links.push(link)
                                    }
                                } catch (e) {
                                    console.log("cncopt [2]: ", e.message);
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
                                log_it("cncopt: Ghost City selected.. ignoring because we don't know what to do here");
                                break;
                            case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
                                tf = true;
                                break;
                            case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
                                tf = true;
                                break;
                        }
                        
                        var orig_tf = tf;
                        var base_scanned = false;
       
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
                                    //log_it("City", city);
                                    //log_it("get_OwnerId", city.get_OwnerId());
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
                                
                                for (var i = 0; i < self.__cncopt_db_links.length; ++i) {
                                    var city_id = cncopt.selected_base.get_Id();
                                    //log_it('city_id: '+city_id);
                                    //console.log();
                                    var isdb = false;
                                    if(typeof Storage_bases['base'][city_id] != 'undefined') {
                                        isdb = true;
                                    }
                                    
                                    
                                    if(isdb != self.__cncopt_db_links[i].getEnabled()) {
                                        if(isdb) {
                                            self.__cncopt_db_links[i].setEnabled(true);
                                            self.__cncopt_db_links[i].setBlockToolTip(false);
                                        } else {
                                            //var tooltip = new qx.ui.tooltip.ToolTip("No Data");
                                            //self.__cncopt_db_links[i].setToolTip(tooltip);
                                            self.__cncopt_db_links[i].setBlockToolTip(true);
                                            self.__cncopt_db_links[i].setEnabled(false);       
                                        }
                                    }
                                    if(isdb) {
                                        try {
                                            var last_scan = get_last_scan(city_id);
                                            var scan_date = new Date();
                                            scan_date.setTime(last_scan['scan_date']);
                                            
                                            
                                            var hours = scan_date.getHours();
                                            var minutes = scan_date.getMinutes();
                                            var seconds = scan_date.getSeconds();
                                            
                                            var day = scan_date.getDate();
                                            var mon = scan_date.getMonth()+1;
                                            
                                            var thetime = (hours < 10) ? "0" + hours + ":" : hours + ":";
                                            thetime += (minutes < 10) ? "0" + minutes + ":" : minutes + ":";
                                            thetime += (seconds < 10) ? "0" + seconds : seconds;
                                            thetime += ' '
                                            thetime += (day < 10) ? "0" + day + "." : day + ".";
                                            thetime += (mon < 10) ? "0" + mon + "." : mon + ".";
                                            thetime +=  scan_date.getFullYear();
                                            
                                            var tooltip = new qx.ui.tooltip.ToolTip("Save Datum: " + thetime);
                                            self.__cncopt_db_links[i].setToolTip(tooltip);
                                            
                                        } catch (e) {
                                            console.log("cncopt [4]: ", e.message);
                                        }
                                    }      
                                }
                                
                                if (!still_loading) {
                                         try {
                                    check_ct = 0;
                                 
                                        if(button_enabled && !base_scanned && Storage_cfg['auto_save_player']) {
                                            var city_id = cncopt.selected_base.get_Id();
                                            var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(city_id);
                                            var Faction = city.get_CityFaction();
                                            if(Faction == 1 || Faction == 2) {
                                                // 1: GDI  2: NOD
            log_it('Auto Scan Base...');
                                                cncopt.make_sharelink(false);
                                            }
           base_scanned = true;
                                        }
                                  
                                           
                                    } catch (e) {
                                        console.log("cncopt [5]: ", e.message);
                                    }
                                } else {
                                    if (check_ct > 0) {
                                        check_ct--;
                                        check_timer = setTimeout(check_if_button_should_be_enabled, 100);
                                    } else {
                                        check_timer = null;
                                    }
                                }
                            } catch (e) {
                                console.log("cncopt [4]: ", e.message);
                                tf = false;
                            }
                        }
                        
                        check_ct = 50;
                        check_if_button_should_be_enabled();
                    } catch (e) {
                        console.log("cncopt [3]: ", e.message);
                    }
                    this.__cncopt_real_showMenu(selected_base);
                }
            }
            
            
   

   var cfgBox = {
   
    window: null,
    window_is_open: false,
    
    auto_save_player: null,
    save_button: null,
    
    init: function() {
     try {
      var addonmenu = Addons.AddonMainMenu.getInstance(); 
      addonmenu.AddMainMenu("CNCOpt DB Config",function(){ cfgBox.menu_click(); },""); 
      
      cfgBox.window = new qx.ui.window.Window("CNCOpt DB Config");
      cfgBox.window.setPadding(1);
      cfgBox.window.setLayout(new qx.ui.layout.Grow());
      // this.navBox.setLayout(new qx.ui.layout.VBox());
      var layout = new qx.ui.layout.Grid();
      layout.setSpacing(5);
      layout.setColumnAlign(1,"left", "center");
      layout.setColumnAlign(0,"left", "bottom");
      cfgBox.window.setLayout(layout);
      cfgBox.window.setShowMaximize(false);
      cfgBox.window.setShowMinimize(false);
      cfgBox.window.moveTo(400, 200);
      cfgBox.window.setHeight(200);
      cfgBox.window.setWidth(180);
      cfgBox.window.setMinHeight(200);
      cfgBox.window.setMinWidth(180);
      
      cfgBox.window.addListener("close",function() {
       cfgBox.save();
       cfgBox.window_is_open = false;
      }, this);      
      
      var makeLbl = function(name) {
       var lbl =  new qx.ui.basic.Label(name);
       lbl.setTextColor("white");
       return lbl;
      }
      
      cfgBox.auto_save_player = new qx.ui.form.CheckBox();
      
      cfgBox.window.add(makeLbl("Auto Save Player:"), {row:0, column:0});
      cfgBox.window.add(cfgBox.auto_save_player, {row:0, column:1});
      
      
      cfgBox.auto_save_player.setValue(Storage_cfg['auto_save_player']);
      
      cfgBox.save_button = new qx.ui.form.Button("Save");
      cfgBox.save_button.set({
       appearance : "button-text-small",
       toolTipText : "Navigate to"
      });
       
      cfgBox.save_button.addListener("click", function() { cfgBox.window.close(); }, this);
      cfgBox.window.add(cfgBox.save_button,{row:1,column:0});
      
     } catch (e) {
      console.log("[CNCOpt-DB] cfgBox.init: ", e);
                    }
    },
    
    menu_click: function() {
     if(cfgBox.window_is_open) {
      cfgBox.window.close(); 
      cfgBox.window_is_open = false;
     } else {
      cfgBox.window.open(); 
      cfgBox.window_is_open = true;
     }
    },
    
    save: function() {
     log_it("SAVE CFG");
     Storage_cfg['auto_save_player'] = cfgBox.auto_save_player.getValue();
     saveDB();
    }

   };
   
   
   
            function get_last_scan(city_id){
                var data = Storage_bases['base'][city_id]['scans'][Storage_bases['base'][city_id]['scans'].length-1];
                return data;
            }
            
            
            var Storage_bases = {user:{},base:{}};
            var Storage_cfg = { auto_save_player: true };
   
            
            function saveDB() {
                log_it('save DB');
                if (localStorage) {
                    localStorage["CNCOpt_DB.bases"] = JSON.stringify(Storage_bases);
                    localStorage["CNCOpt_DB.cfg"]   = JSON.stringify(Storage_cfg);
                } else {
                    log_it("NO HTML5 localStorage can not save!");
                }
                log_it(Storage_bases);
    log_it(Storage_cfg);
            }
            
            function loadDB() {
                log_it('load DB');
                if (localStorage) {
                    var cfg = localStorage["CNCOpt_DB.cfg"];
                    if (cfg != null) {
                        Storage_cfg = JSON.parse(cfg);
                    }
                    
                    var vo = localStorage["CNCOpt_DB.bases"];
                    if (vo != null) {
                        Storage_bases = JSON.parse(vo);
                    }
                    
                    if(Storage_cfg['db_version'] == null) {
                        var Storage_bases_old = Storage_bases;
                        
                        log_it(JSON.stringify(Storage_bases_old));
                        
                        Storage_bases = {user:{},base:{}};
                        
                        for (var i in Storage_bases_old) {
                            
                            /*
                            Storage_bases[city_id] = {
                            city_id: city_id,
                            scan_date: new Date().getTime(),
                            link: link
                            };
                            */
                            
                            
                            Storage_bases['base'][i] = {
                                city_id: Storage_bases_old[i]['city_id'],
                                city_name: "",
                                city_faction: "",
                                city_userid: 0,
                                scans: {scan_date: Storage_bases_old[i]['scan_date'], link: Storage_bases_old[i]['link']},
                                names: {}
                            };
                        }
                        
                        Storage_cfg['db_version'] = 2;
                        saveDB();
                    } 
     
                    if(Storage_cfg['db_version'] == 2) {
                        Storage_cfg['db_version'] = 3;
                        for (var i in Storage_bases['base']) {
                            Storage_bases['base'][i]['scans'] = [Storage_bases['base'][i]['scans']];
                        }
                        saveDB();
                    }
     
       if(Storage_cfg['db_version'] == 3) {
                        Storage_cfg['db_version'] = 4;
      Storage_cfg['auto_save_player'] = true;
                        saveDB();
                    }
     
                } else {
                    log_it("NO HTML5 localStorage can not load!");
                }
                log_it(Storage_bases);
            }
            
            
            
            function log_it(e){
                if (typeof console != 'undefined') console.log('[CNCOpt-DB] ', e);
                else if (window.opera) opera.postError('[CNCOpt-DB] '+e);
                else GM_log('[CNCOpt-DB] '+e);   
            }
            
            
            function cnc_check_if_loaded() {
                try {
                    if (typeof qx != 'undefined' && typeof Addons != 'undefined') {
                        a = qx.core.Init.getApplication(); // application
                        mb = qx.core.Init.getApplication().getMenuBar();
                        addonmenu = Addons.AddonMainMenu.getInstance();
                        if (a && mb && addonmenu) {
                            loadDB();
       cfgBox.init();
                            cncopt_create();
                        } else
                            window.setTimeout(cnc_check_if_loaded, 1000);
                    } else {
                        window.setTimeout(cnc_check_if_loaded, 1000);
                    }
                } catch (e) {
                    if (typeof console != 'undefined') log_it(e);
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

		elda_hasload(155508);
	} else {
		elda_hasnotload(155508);
	}
} catch (e) {
    GM_log(e);
	GM_log(e.name + " " + e.message);
}

/*
URL:		http://userscripts.org/scripts/source/155739.user.js
Id:		155739
Name:		C&C: Tiberium Alliances Map (Elda-Mod)
Version:	2.0

*/
try {

	elda_addon_info[155739] = {
		id: 155739,
		name: "C&C: Tiberium Alliances Map (Elda-Mod)",
		version: "2.0",
		date: "",
		can_disabled: true,
		loaded: false
	};

	if(elda_hastoload(155739)) {
//
// based on CnC: Tiberium Alliances Map (KSX-Mod) v1.5
// https://userscripts.org/scripts/show/149093
//
// based on Tiberium Alliances Map (Nolana Kane) v1.8 
// https://userscripts.org/scripts/show/135955
(function() {
    var TAMap_mainFunction = function() {
        function createMapTweak() {
            var TAMap = {};
            qx.Class.define("TAMap.main", {
                type : "singleton",
                extend : qx.core.Object,
                members : {
     version        : "2.0",
                    buttonMap      : null,
                    mapBox         : null,
                    mapWidget      : null,
                    scroll         : null,
                    mapCanvas      : null,
                    settingsWnd    : null,
                    poiSelect      : null,
                    allianceSelect : null,
     obfSectorName : null,
     obfAllianceList : null,
     obfAllianceId   : null,
     obfAllianceName : null, 
                    colorFields: {},
                    visOptions: { colors: { 
      cityColor           : "green"       , // type = 1
                        baseColor           : "navy"        , // type = 2
                        campColor           : "midnightblue", // type = 3, CampType=2
                        outpostColor        : "royalblue"   , // type = 3, CampType=3
                        poiColor            : "orange"      , // type = 4, POIType != 0
                        tunnelColor         : "forestgreen" , // type = 4, POIType = 0
                        enemyBaseColor      : "red",
                        allianceTerrainColor: "teal",
                        ownBaseColor        : "lime",
                        highlightColor      : "white"
                    }},
                    // Types: 1 = city
                    // 2 = Forgotten Base{Id, Level}
                    // 3 = Camp, Outpost {Id, CampType: 3 = Outpost, 2 = Camp}
                    // 4 = POI, Tunnel Exit {Id, Level, OwnerAllianceId, OwnerAllianceName, POIType:
                    // 6 = Aircraft (Off Air)
                    // 7 = Resonator (Def), 0 = Tunnel!
                    //     ...
                    //
                    zoomFactor : 3,
                    initialize : function() {
                        if (localStorage) {
                            var vo = localStorage["TAMap.visOptions"];
                            if (vo != null) {
                                this.visOptions = JSON.parse(vo);
                            }
                        }
                        // this.add_ViewModeChange = (new ClientLib.Vis.ViewModeChange).$ctor(this, this.onViewChange);
                     
                        console.log("Adding button");
                        
                        var addonmenu = Addons.AddonMainMenu.getInstance(); 
                        addonmenu.AddMainMenu("Map",function() { window.TAMap.main.getInstance().showMap(); }, "ALT+M"); 
                        
                         /*
                        this.buttonMap = new qx.ui.form.Button("Map");
                        this.buttonMap.set({
                            width : 80,
                            appearance : "button-bar-center",
                            toolTipText : ""
                        });
                        this.buttonMap.addListener("click", this.showMap, this);
                        
                        
                       
                        var mainBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_MENU);
                        mainBar.getChildren()[1].addAt(this.buttonMap, 8, {
                            top : 0,
                            right : 0
                        });*/
                        console.log("Button added");
                        // The Map window
                        this.mapBox = new qx.ui.window.Window("Map  [v"+this.version+" Links-Mod]");
                        this.mapBox.setPadding(1);
                        this.mapBox.setLayout(new qx.ui.layout.Grow());
                        // this.mapBox.setLayout(new qx.ui.layout.VBox());
                        this.mapBox.setShowMaximize(false);
                        this.mapBox.setShowMinimize(false);
                        this.mapBox.moveTo(150, 50);
                        this.mapBox.setHeight(500);
                        this.mapBox.setWidth(500);
                        this.mapBox.setMinWidth(10);
                        this.mapBox.setMinHeight(10);
      this.mapBox.setBackgroundColor("black");
                        this.mapWidget = new qx.html.Element("canvas", null, {
                            id : "map",
                            width : 3000,
                            height : 3000
                        });
                        this.mapWidget.addListener("appear", function() {
                            console.log("appeared:" + this.mapWidget.getDomElement());
                            var canvas = this.mapWidget.getDomElement();
                            if (this.mapCanvas == null) {
                                this.mapCanvas = canvas;
                                var _thisMap = this;
                                canvas.addEventListener("click", function(evt) {
                                    console.log("coords:" + evt.clientX + ":" + evt.clientY);
                                    console.log("offsets:" + canvas.offsetTop + "," + canvas.offsetLeft);
                                    // get canvas position
                                    var obj = canvas;
                                    var top = 0;
                                    var left = 0;
                                    while (obj && obj.tagName != 'BODY') {
                                        top += obj.offsetTop;
                                        left += obj.offsetLeft;
                                        obj = obj.offsetParent;
                                    }
                                    // return relative mouse position
                                    var mouseX = evt.clientX - left + window.pageXOffset + _thisMap.scroll.getScrollX();
                                    var mouseY = evt.clientY - top + window.pageYOffset + _thisMap.scroll.getScrollY();
                                    console.log("M:" + mouseX + "," + mouseY);
                                    var vm = ClientLib.Vis.VisMain.GetInstance();
                                    vm.CenterGridPosition(mouseX / _thisMap.zoomFactor, mouseY / _thisMap.zoomFactor);
                                    _thisMap.updateMap();
                                    setTimeout(function() {
                                        _thisMap.updateMap();
                                    }, 1000);
                                }, false);
                            }
                            this.updateMap();
                            //for (var x = 0; x < 1000; x++) {
                            // for (var y = 0; y < 1000; y++) {
                            //  var obj = w.GetObjectFromPosition(x,y);
                            //  if (obj != null) {
                            //   ctx.fillRect(x,y,1,1);
                            //  }
                            // }
                            // }
                            // vm = ClientLib.Vis.VisMain.GetInstance()
                            // vm.CenterGridPosition(535,142)
                            // vm.get_Region().get_PosY()/vm.get_Region().get_GridHeight()
                            // vm.get_Region().get_PosX()/vm.get_Region().get_GridWidth()
                        }, this);
                        // new qx.ui.basic.Label().set({
                        //      value: "debugOutput",
                        //      rich : true,
                        //      selectable: true
                        //    });
                        this.scroll = new qx.ui.container.Scroll().set({
                            width : 500,
                            height : 500
                        });
                        this.scroll.setMinWidth(10);
                        this.scroll.setMinHeight(10);
                        _thisMap = this;
                        this.mapBox.add(this.scroll);
                        var p = new qx.ui.core.Widget();
                        p.setMinHeight(3000);
                        p.setMinWidth(3000);
                        p.setHeight(3000);
                        p.setWidth(3000);
                        this.scroll.add(p);
                        p.getContentElement().add(this.mapWidget);
                        // select box for alliances
                        var selectBox = new qx.ui.form.SelectBox();
                        selectBox.addListener("changeSelection", function(e) {
                            if (e != null && e.getData() && e.getData().length > 0) {
                                this.visOptions.alliance = e.getData()[0].getModel(); // alliance ID or -1 for all
                                //console.log("Alliance selected: "+e.getData()[0] + " "+this.visOptions.alliance);
                                this.saveOptions();
                                this.updateMap();
                            }
                        }, this);
                        this.allianceSelect = selectBox;
                        // this.mapBox.add(selectBox);
                        
      //
                        // Select box for POI Type
                        //
                        selectBox = new qx.ui.form.SelectBox();
                        var currentSelection = this.visOptions.poi||-1;
                        var makePoiItem = function(model, name) {
                            var item = new qx.ui.form.ListItem(name, null, model);
                            selectBox.add(item);
                            if (currentSelection == model) {
                                selectBox.setSelection([item]);
                            }
                        }
                        makePoiItem( -1                                   ,"<< None >>"              );
                        makePoiItem(ClientLib.Base.EPOIType.AirBonus      ,"Aircraft GNT (Off Air)"  );
                        makePoiItem(ClientLib.Base.EPOIType.CrystalBonus  ,"Crystal CNH"             );
                        makePoiItem(ClientLib.Base.EPOIType.DefenseBonus  ,"Resonator NT (Def)"      );
                        makePoiItem(ClientLib.Base.EPOIType.InfanteryBonus,"Tungsten C (Off Inf)"    );
                        makePoiItem(ClientLib.Base.EPOIType.PowerBonus    ,"Reactor (Power Bonus)"   );
                        makePoiItem(ClientLib.Base.EPOIType.TiberiumBonus ,"Tiberium CN"             );
                        makePoiItem(ClientLib.Base.EPOIType.VehicleBonus  ,"Uranium C (Off Vehicles)");
      makePoiItem( -2                                   ,"<< All >>"               );
                        selectBox.addListener("changeSelection", function(e) {
                            if (e != null && e.getData() && e.getData().length > 0) {
                                this.visOptions.poi = e.getData()[0].getModel(); // POI ID or -1 for all
                                console.log("POI selected "+e.getData()[0].getModel());
                                this.saveOptions();
                                this.updateMap();
                            }
                        }, this);
                        this.poiSelect = selectBox;
      
      // Checkbox for alliance POIs
      checkbox = new qx.ui.form.CheckBox();
      checkbox.setValue(this.visOptions.showAlliancePois==true);
      checkbox.addListener("changeValue", function(e) {
       this.visOptions.showAlliancePois=e.getTarget().getValue();
       this.saveOptions();
       this.updateMap();
      },this);
      this.showAlliancePois = checkbox;
      
      // Checkbox for own bases
      checkbox = new qx.ui.form.CheckBox();
      checkbox.setValue(this.visOptions.showOwnCities==true);
      checkbox.addListener("changeValue", function(e) {
       this.visOptions.showOwnCities=e.getTarget().getValue();
       this.saveOptions();
       this.updateMap();
      },this);
      this.showOwnCities = checkbox;
      // Checkbox for showSectionFrame
      checkbox = new qx.ui.form.CheckBox();
      checkbox.setValue(this.visOptions.showSectionFrame==true);
      checkbox.addListener("changeValue", function(e) {
       this.visOptions.showSectionFrame=e.getTarget().getValue();
       this.saveOptions();
       this.updateMap();
      },this);
      this.showSectionFrame = checkbox;
      // Button "Settings"
                        var bt = new qx.ui.form.Button("Settings");
                        bt.set({
                            appearance : "button-text-small",
                            toolTipText : "Set filters for the map"
                        });
                        bt.addListener("click", function() {this.settingsWnd.open()}, this);
                        this.mapBox.getChildControl("captionbar").add(bt,{row:0,column:5}); // hack hack hack
                        
      //
                        // Settings dialog
                        //
                        this.settingsWnd = new qx.ui.window.Window("Map Settings");
                        this.settingsWnd.setPadding(10);
                        //this.mapBox.setLayout(new qx.ui.layout.Grow());
                        var layout = new qx.ui.layout.Grid();
                        layout.setSpacing(5);
                        layout.setColumnAlign(1,"left", "center");
                        layout.setColumnAlign(0,"left", "bottom");
                        this.settingsWnd.setLayout(layout);
                        this.settingsWnd.setShowMaximize(false);
                        this.settingsWnd.setShowMinimize(false);
                        this.settingsWnd.moveTo(300, 13);
                        this.settingsWnd.setHeight(580);
                        this.settingsWnd.setWidth(300);
                        this.settingsWnd.setMinWidth(10);
                        this.settingsWnd.setMinHeight(10);
                        var makeLbl = function(name) {
                            var lbl =  new qx.ui.basic.Label(name);
                            lbl.setTextColor("white");
                            return lbl;
                        }
                        var _thisMap = this;
                        var makeTxt = function(option) {
                            var value = _thisMap.visOptions.colors[option];
                            var txtField = new qx.ui.form.TextField(value);
                            txtField.setTextColor("white");
                            _thisMap.colorFields[option] = txtField;
                            return txtField;
                        }
                        this.settingsWnd.add(makeLbl("- Highlight -"), {row:0, column:0});
                        this.settingsWnd.add(makeLbl("Alliance:"), {row:1,column:0});
                        this.settingsWnd.add(this.allianceSelect, {row:1, column:1});
                        this.settingsWnd.add(makeLbl("POIs:"), {row:2, column:0});
                        this.settingsWnd.add(this.poiSelect, {row:2, column:1});
      this.settingsWnd.add(makeLbl("Alliance POIs:"), {row:3, column:0});
                        this.settingsWnd.add(this.showAlliancePois, {row:3, column:1});
      this.settingsWnd.add(makeLbl("Own Cities:"), {row:4, column:0});
                        this.settingsWnd.add(this.showOwnCities, {row:4, column:1});
      this.settingsWnd.add(makeLbl("Section Frame:"), {row:5, column:0});
                        this.settingsWnd.add(this.showSectionFrame, {row:5, column:1});
                        bt = makeLbl("- Colors -");
                        bt.set({
                            value: '<a href="http://www.w3schools.com/html/html_colornames.asp" target="_blank">- Colors -</a>',
                            rich : true,
                            selectable: true
                        });
                        this.settingsWnd.add(bt, {row:10, column:0});
                        // bt.addListener("click", function() { window.open("http://www.w3schools.com/html/html_colornames.asp") });
                        this.settingsWnd.add(makeLbl("Alliance Terrain:"), {row:11, column:0});
                        this.settingsWnd.add(makeTxt("allianceTerrainColor"), {row:11, column:1});
                        this.settingsWnd.add(makeLbl("Base:"), {row:12, column:0});
                        this.settingsWnd.add(makeTxt("baseColor"), {row:12, column:1});
                        this.settingsWnd.add(makeLbl("Camp:"), {row:13, column:0});
                        this.settingsWnd.add(makeTxt("campColor"), {row:13, column:1});
                        this.settingsWnd.add(makeLbl("City:"), {row:14, column:0});
                        this.settingsWnd.add(makeTxt("cityColor"), {row:14, column:1});
                        this.settingsWnd.add(makeLbl("Enemy:"), {row:15, column:0});
                        this.settingsWnd.add(makeTxt("enemyBaseColor"), {row:15, column:1});
                        this.settingsWnd.add(makeLbl("Outpost:"), {row:16, column:0});
                        this.settingsWnd.add(makeTxt("outpostColor"), {row:16, column:1});
                        this.settingsWnd.add(makeLbl("Own City:"), {row:17, column:0});
                        this.settingsWnd.add(makeTxt("ownBaseColor"), {row:17, column:1});
                        this.settingsWnd.add(makeLbl("POI:"), {row:18, column:0});
                        this.settingsWnd.add(makeTxt("poiColor"), {row:18, column:1});
                        this.settingsWnd.add(makeLbl("Tunnel:"), {row:19, column:0});
                        this.settingsWnd.add(makeTxt("tunnelColor"), {row:19, column:1});
                        var changeColor = new qx.ui.form.Button("Change");
                        changeColor.set({
                            appearance : "button-text-small",
                            toolTipText : "Save changes to colors"
                        });
                        this.settingsWnd.add(changeColor, {row:20, column:0});
                        changeColor.addListener("click", function() {
                            for (var option in this.visOptions.colors) {
                                if (this.colorFields[option]) {
                                    this.visOptions.colors[option] = this.colorFields[option].getValue();
                                }
                            }
                            this.saveOptions();
                            this.updateMap();
                        }, this);
                        this.settingsWnd.addListener("appear", function() {
                            this.updateFilter();
                        }, this);
                        //scroll.add(this.mapWidget);
                        // scroll.setBackgroundColor("#fff");
                        //var ele = scroll.getContainerElement();
                        //console.log("container scroll:" + ele);
                        //ele.getChild(0).add(this.mapWidget);
                        //
                        //this.mapBox.getApplicationRoot().set({
                        //    blockerColor: '#000000',
                        //    blockerOpacity: 0.6
                        //   });
                        // w.GetBaseOwner(x,y);
                        //var index=((y * this.m_WorldWidth) + x);
                        // return this.m_BaseOwner[index];
                        //
                        //var ruinPlayerID=this.GetWorldSectorByCoords$0(targetX, targetY).GetPlayerId$0(ruin.PlayerId);
                        //
                        // list players for (var i = 0; i < s.m_Players.c; i++) { var p = console.log(s.GetPlayer(i)); }
                        //
                        // for(i in s.m_Objects.d) { console.log(s.m_Objects.d[i].$type.m.n);}
                        // sample object:
                        // {"Type":1,"SequenceId":3694,"isAttacked":false,"isLocked":false,"isProtected":false,"isAlerted":false,"hasCooldown":false,"Level":10,"Radius":2,"PlayerId":4,"ConditionBuildings":100,"ConditionDefense":100,"Id":76726,"Name":"Sepherian 1"}
                        // lientLib.Data.Cities.prototype.GetWorldSectorWithMostCities$0=function()
                        // >> w.GetOwner(534,139);
                        // >> w.GetObjectFromPosition
                        //w.GetObjectFromPosition(534,139)
                        // allianceId = 943 OtherAllianceId = 2049
                        // md.get_Alliance().GetAllianceRelationshipsByType(webfrontend.gui.alliance.DiplomacyPage.ERelationTypeEnemy,true)
                        //c=w.GetObjectFromPosition(524,145)
                        // s.GetPlayer(c.PlayerId)
                        //s.GetAlliance(p.Alliance) == OtherAllianceId
                    },
                    getSectors: function(w) {    // work around  obfuscated variable names
      if (this.obfSectorName == null) {
       // auto-detect sector name
       Outer:
       for (i in w) {    
        if (w[i].d) {
         var maybeSector = w[i].d;
         for (j in maybeSector) {
         if (maybeSector[j].ConvertToWorldX) {
          this.obfSectorName = i;
          console.log("Sector field:" + i);
          break Outer;
         }
         break;
         }
        }
       }
      }
      if (this.obfSectorName == null) console.log("ERROR: getSectors(): obfuscated property not found!");
      if (this.obfSectorName != null) return w[this.obfSectorName].d;
   
                        if (w.KIH) {  // old june version
                            return w.KIH.d;
                        } else if (w.RBJXOL) { // july
                            return w.RBJXOL.d;
                        }  else if(w.IWEESP) {
                            return w.IWEESP.d;  // closed beta 2 world
                        } else if (w.HYMYNV) {  // mid july release
                            return w.HYMYNV.d;
                        } else if (w.ONQEIH) {  // july 18th
                            return w.ONQEIH.d;
                        }
                    },
                    getAlliances: function(sector) {// work around  obfuscated variable names. sector == current sector
      if(typeof(sector)=="undefinied" || sector===null) {console.log("ERROR: getAlliances(sector): sector is not defined!");return null;}
      if (this.obfAllianceList == null) {     
       // find alliance list dynamically
       
       Outer:
       for (i in sector) {
        if (sector[i].d) {
         var maybeAllianceList = sector[i].d;
         for (j in maybeAllianceList) {
          var maybeAlliance=maybeAllianceList[j];          
          var propnames=[]; for (p in maybeAlliance) propnames.push(p); 
          var stringpropcount=0;
          var stringpropname=null;
          if(propnames.length==13) {
           for(k=0;k<propnames.length;k++){
            if(typeof(maybeAlliance[propnames[k]])=="string"){
             stringpropname=propnames[k];
             stringpropcount++;
            }
           }
           if(stringpropcount==1){
            this.obfAllianceId       = propnames[1];//assuming this is allways the case :-)
            this.obfAllianceName     = stringpropname;
            this.obfAllianceList     = i;
            console.log("Alliances field:" + i);
            break Outer;
           }           
          }
          break;// test only the first member
         }
        }
       }
      }
      if (this.obfAllianceList == null) {
          console.log("ERROR: getAlliances(): obfuscated member not found!");
       return null;
      } else
      return sector[this.obfAllianceList].d;
/*                        if (sector.WGH) {// june
                            return sector.WGH.d;
                        } else if (sector.QEKQND) {//july
                            return sector.QEKQND.d;
                        } else if (sector.GGUPEV){  // closed beta 2 world
                            return sector.GGUPEV.d;
                        } else if(sector.UFVPYE) {
                            return sector.UFVPYE.d; // July 11, 2012
                        } else if(sector.UEQLAO) {
                            return sector.UEQLAO.d; // July 18th
                        } */
                    },
                    isEnemy : function(enemies, alliance, sector) {
                        if (alliance == null)
                            return false;
                        var enemy = enemies.l.filter(function(ele) {
                            return ele.OtherAllianceId == alliance.Id;
                        });
                        return enemy.length > 0;
                    },
                    listAllAlliances : function() {
                        var alliances = [];
                        var w = ClientLib.Data.MainData.GetInstance().get_World(); if(!w) console.log("ERROR: get_World() failed!");
                        var sectors = this.getSectors(w); if(!sectors) console.log("ERROR: getSectors() failed!");
                        for (var i in sectors) {  // m_sectors
                            var s = sectors[i];
                            var all = this.getAlliances(s); if(!all) console.log("ERROR: getAlliances() failed!");
                            for(var j in all) {  // m_alliances
                                var a = all[j];
                                alliances.push({id: a[this.obfAllianceId], name: a[this.obfAllianceName]});
                            }
                        }
                        alliances.sort(function(s1,s2) {
                            var name1 = s1.name.toLowerCase();
                            var name2 = s2.name.toLowerCase();
                            if (name1 < name2) return -1;
                            if (name1 > name2) return 1;
                            return 0;
                        });
                        var allianceMap = {};
                        alliances.forEach(function(it) {
                            allianceMap[it.id] = it;
                        });
                        return allianceMap;
                    },
                    updateFilter : function() {
                        var md = ClientLib.Data.MainData.GetInstance();
                        //var enemies = md.get_Alliance().GetAllianceRelationshipsByType(webfrontend.gui.alliance.DiplomacyPage.ERelationTypeEnemy, true);
                        this.allianceSelect.removeAll();
                        var alliances = this.listAllAlliances();  // quite expensive operation
                        var selected = new qx.ui.form.ListItem("<< None >>", null, -1);
                        this.allianceSelect.add(selected);
                        for (i in alliances) {
                            var a = alliances[i];
                            //enemies.l.forEach(function(it) {
                            var tempItem = new qx.ui.form.ListItem(a.name, null, a.id);
                            if (a.id == this.visOptions.alliance) {
                                selected = tempItem;
                            }
                            this.allianceSelect.add(tempItem);
                        }
                        this.allianceSelect.setSelection([selected]);
                    },
                    findAllianceById: function(s, id) {
                        var ra = null;
                        if (id != 0){
                            for (var x=1; s.GetAlliance(x) != null; x++){
                                var a = s.GetAlliance(x);
                                if (a.FGTNFZ == id)                                {
                                    ra = a;
                                }
                            }
                        }
                        return ra;
                    },
                    updateMap : function() {
                        // this.updateFilter(); - we assume that visOptions has all the visualisation options
                        var canvas = this.mapCanvas;
                        console.log("Canvas:" + canvas);
                        var ctx = canvas.getContext('2d');
                        var sc = this.zoomFactor;
                        var md = ClientLib.Data.MainData.GetInstance();
      var alliance = md.get_Alliance();
      //console.log(this.dump(alliance,"alliance",1,true));
                        var enemies = alliance.GetAllianceRelationshipsByType(webfrontend.gui.alliance.DiplomacyPage.ERelationTypeEnemy, true);
                        var w = md.get_World();
                        var vm = ClientLib.Vis.VisMain.GetInstance();
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.fillStyle = "rgb(200,0,0)";
                        var cx = 0;
                        var cy = 0;
                        var hilitePois = [];
                        var sectors = this.getSectors(w);
      
      if(!this.obfAllianceId) this.obfAllianceId=this.getMemberNameByType(alliance,"number",0);
      if(!this.obfAllianceName) this.obfAllianceName=this.getMemberNameByType(alliance,"string",0);
      
      var allianceName=alliance[this.obfAllianceName];
      //console.log("Alliance: "+allianceName);
      
      //console.log(this.dump(this.showAlliancePois,"chkbox",1,true));
      
      //ctx.fillStyle="#000000";
      //ctx.fillRect(0,0,3000,3000);
      
                        for (var i in sectors) {// m_Sectors = RBJXOL
                            var s = sectors[i];
//       console.log("Sector "+s.get_Id()+"\n"+ this.dump(s,"sector",2));
//       console.log("GetPlayer "+this.dump(s.GetPlayer(s.get_Id()),"*",1));
//       console.log("GetPlayerAllianceId "+this.dump(s.GetPlayerAllianceId(3128),"*",1));
//       console.log("findAllianceById "+this.dump(this.findAllianceById(s, 289),"*",1));
                            // console.log("Painting sector:" + s.m_Id);
                            for (var x = 0; x < 32; x++) {
                                for (var y = 0; y < 32; y++) {
                                    cx = s.ConvertToWorldX(x);
                                    cy = s.ConvertToWorldY(y);
                                    var obj = w.GetObjectFromPosition(cx, cy);
                                    if (obj != null) {
                                        // ctx.fillStyle = colors[obj.Type];
                                        switch (obj.Type) {
                                            case 1:  // player city
//            console.log("DEBUG player city at "+cx+","+cy+" "+obj.AUENVZ + "("+obj.LFQYDH+")");
//            console.log(this.dump(obj.OSKFZU.m,"obj",2,true));
                                                //var player = s.GetPlayer(obj.PlayerId); //NOT WORKING
            var player = s.GetPlayerId(obj); //NOT WORKING
            //var player = s.GetPlayer(obj.L);
//            console.log(this.dump(player,"player",1));
            if(!player) break; //
//            console.log("IEHUFP "+this.dump(s.GetPlayer(obj.IEHUFP),"player",1));
                                                //var alliance = s.GetAlliance(player.Alliance);
            var paid=s.GetPlayerAllianceId(obj.IEHUFP);
//            console.log("DEBUG GetPlayerAllianceId "+paid);
            var alliance = this.findAllianceById(s, paid);//TODO
                                                if (alliance != null && this.visOptions.alliance == alliance[obfAllianceId]) {
                                                    ctx.fillStyle = this.visOptions.colors.highlightColor;
                                                    ctx.fillRect(cx * sc, cy * sc, sc, sc);
                                                } else if (this.isEnemy(enemies, alliance, s)) {
                                                    // console.log("Enemy found" + obj);
                                                    ctx.fillStyle = this.visOptions.colors.enemyBaseColor;
                                                    ctx.fillRect(cx * sc, cy * sc, sc, sc);
                                                } else {
                                                    //if (w.GetTerritoryTypeByCoordinates(cx,cy) == ClientLib.Data.ETerritoryType.Own) { ctx.fillStyle = "rgb(255,255,255)"; }
                                                    // ClientLib.Data.MainData.GetInstance$9().get_BaseColors$0().GetMapAllianceColorType$0(this.get_AllianceId$1()));
                                                    if (obj.PlayerId && s.GetPlayer(obj.PlayerId).Id == md.get_Player().id) {
                                                        ctx.fillStyle = this.visOptions.colors.ownBaseColor;
                                                    } else {
                                                        ctx.fillStyle = this.visOptions.colors.cityColor;
                                                    }
                                                    ctx.fillRect(cx * sc, cy * sc, sc, sc);
                                                }
                                                break;
                                            case 2: // forgotten camp
                                                ctx.fillStyle = this.visOptions.colors.baseColor;
                                                ctx.fillRect(cx * sc, cy * sc, sc, sc);
                                                break;
                                            case 3: // Camp/Outpost
                                                ctx.fillStyle = (obj.CampType == 2) ? this.visOptions.colors.campColor : this.visOptions.colors.outpostColor;
                                                ctx.fillRect(cx * sc, cy * sc, sc, sc);
                                                break;
                                            case 4: // POI or tunnel
            /*
            Type:ClientLib.Data.WorldSector.WorldObjectPointOfInterest
            System.Int32 Id
            ClientLib.Data.WorldSector.WorldObjectPointOfInterest.EPOIType POIType
            System.Int32 Level
            System.Int64 OwnerAllianceId
            System.String OwnerAllianceName
            System.Void .ctor (ClientLib.Data.WorldSector.ObjectType type ,ClientLib.Data.World world ,System.String details ,System.Int32 pos)
            */
            /*
            obj: {} -->
            obj.Type: 4
            obj.SequenceId: 6805
            obj.BNDYIS: 39
            obj.MYTWLL: 1
            obj.ADKRPM: 8527
            obj.YQTUPE: 123
            obj.HIFKIQ: "Alliance Name"
            obj.LSVKAD: {} -->
            */
            //console.log("POI/Tunnel ("+cx+":"+cy+" POIType:"+obj[this.getNameByIdx(obj,3)]+"):\n"+this.dump(obj,"obj",1,true));
            if(!this.obfPOIType) {this.obfPOIType=this.getNameByIdx(obj,3);}
            if(!this.obfWorldObjectPointOfInterestAllianceName) {this.obfWorldObjectPointOfInterestAllianceName=this.getMemberNameByType(obj,"string",0);}
            if(!this.obfWorldObjectPointOfInterestAllianceId) {this.obfWorldObjectPointOfInterestAllianceId=this.getNameByIdx(obj,5);}
            
                                                if (obj[this.obfPOIType] == 0) {
             // Tunnel
                                                    ctx.fillStyle = this.visOptions.colors.tunnelColor;
                                                } else {
             // POI
                                                    ctx.fillStyle = this.visOptions.colors.poiColor;
             
             if(!this.visOptions.showAlliancePois) {
              if(this.visOptions.poi==-2){
               // Selected POI = << All >>
               hilitePois.push([cx,cy]);
              }else{              
               if (this.visOptions.poi && this.visOptions.poi == obj[this.obfPOIType] + 1) { 
                // for some reasons, the constants in ClientLib are off by 1
                hilitePois.push([cx,cy]);
               }
              }
             } else {
              if(this.visOptions.poi>=0){
               if (
                (this.visOptions.poi && this.visOptions.poi == obj[this.obfPOIType] + 1) &&
                (obj[this.obfWorldObjectPointOfInterestAllianceId]==this.visOptions.alliance)
               ) { // for some reasons, the constants in ClientLib are off by 1
                hilitePois.push([cx,cy]);
               }
              }else if(this.visOptions.poi==-2){
               // Selected POI = << All >>
               if(obj[this.obfWorldObjectPointOfInterestAllianceId]==this.visOptions.alliance){
                hilitePois.push([cx,cy]);
               }
              }              
             }
                                                    
                                                }
                                                ctx.fillRect(cx * sc, cy * sc, sc, sc);
                                                break;
                                        }
                                    } else {
                                        var terr = w.GetTerritoryTypeByCoordinates(cx, cy);
                                        switch (terr) {
                                            case ClientLib.Data.ETerritoryType.Alliance: {
                                                ctx.fillStyle = this.visOptions.colors.allianceTerrainColor;
                                                ctx.fillRect(cx * sc, cy * sc, sc, sc);
                                                break;
                                            }
                                            case ClientLib.Data.ETerritoryType.Enemy: {
                                                if (w.GetOwner(cx, cy) != 1610612736) {
                                                    ctx.fillStyle = "rgba(80,10,10,0.5)";
                                                    ctx.fillRect(cx * sc, cy * sc, sc, sc);
                                                }
                                                break;
                                            }
                                            case ClientLib.Data.ETerritoryType.Neutral: {
                                                //ctx.fillStyle = "rgb(210,210,210)";
                                                //ctx.fillRect(cx,cy,1,1);
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                        }
      
                        // paint home bases
      if(this.visOptions.showOwnCities){
       var ownCities = md.get_Cities().get_AllCities().d;
       for (var i in ownCities) {
        var city = ownCities[i];
        var x = city.get_PosX() * sc;
        var y = city.get_PosY() * sc;
        ctx.fillStyle = null;
        ctx.strokeStyle = "rgba(255,255,255,0.7)";
        ctx.beginPath();
        ctx.arc(x+sc/2,y+sc/2,sc,0*Math.PI,2*Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255,255,255,0.3)";
        ctx.arc(x+sc/2,y+sc/2,sc*20,0*Math.PI,2*Math.PI);
        ctx.stroke();
       }
      }
      
                        // paint hilited pois
                        ctx.strokeStyle = "rgb(255,255,255)";
                        hilitePois.forEach(function(poi) {
                           ctx.strokeRect(poi[0] * sc - 2, poi[1] * sc - 2, sc+4, sc+4);
                        });
                        // m_Region == get_Region()
                        var topX = Math.floor(vm.get_Region().get_PosX() / vm.get_Region().get_GridWidth());
                        var topY = Math.floor(vm.get_Region().get_PosY() / vm.get_Region().get_GridHeight());
                        var width = vm.get_Region().get_ViewWidth() / vm.get_Region().get_ZoomFactor() / vm.get_Region().get_GridWidth();
                        var height = vm.get_Region().get_ViewHeight() / vm.get_Region().get_ZoomFactor() / vm.get_Region().get_GridHeight();
                        ctx.strokeStyle = "rgb(200,200,200)";
                        ctx.lineWidth = 1;
                        console.log("Selection:" + topX + "," + topY + "w:" + width + "," + height);
      
      if(this.visOptions.showSectionFrame){
       ctx.strokeRect(topX * sc, topY * sc, width * sc, height * sc);
      }
                        if (topX * sc < this.scroll.getScrollX() || topX * sc > this.scroll.getScrollX() + this.scroll.getWidth()) {
                            this.scroll.scrollToX(Math.max(0, topX * sc - 100));
                        }
                        if (topY * sc < this.scroll.getScrollY() || topY * sc > this.scroll.getScrollY() + this.scroll.getHeight()) {
                            this.scroll.scrollToY(Math.max(0, topY * sc - 100));
                        }
                    },
                    getMousePos : function(canvas, evt) {
                        // get canvas position
                        var obj = canvas;
                        var top = 0;
                        var left = 0;
                        while (obj && obj.tagName != 'BODY') {
                            top += obj.offsetTop;
                            left += obj.offsetLeft;
                            obj = obj.offsetParent;
                        }
                        // return relative mouse position
                        var mouseX = evt.clientX - left + window.pageXOffset;
                        var mouseY = evt.clientY - top + window.pageYOffset;
                        return {
                            x : mouseX,
                            y : mouseY
                        };
                    },
                    saveOptions : function() {
                        if (localStorage) {
                            localStorage["TAMap.visOptions"] = JSON.stringify(this.visOptions);
                        }
                    },
                    showMap : function() {
                        console.log("Show map");
                        this.mapBox.open();
                        var debugOutput = "";
                        var mainData = ClientLib.Data.MainData.GetInstance();
                        var player_cities = mainData.get_Cities();
                        var current_city = player_cities.get_CurrentOwnCity();
                        //var sector = mainData.get_World().GetWorldSectorByCoords(current_city.get_PosX(), current_city.get_PosY());
                        //for (i in sector.m_Objects.d) {
                        // debugOutput += JSON.stringify(sector.m_Objects.d[i]) + "<br>";
                        //}
                        //console.log(debugOutput);
                        // this.mapWidget.setValue(debugOutput);
                        //var canvas = this.mapWidget.getDomElement();
                        //console.log("Canvas:" + canvas);
                        //var ctx = canvas.getContext('2d');
                        //console.log(ctx);
                        //ctx.fillStyle = "rgb(200,0,0)";
                        //ctx.fillRect (10, 10, 55, 50);
                    },
     getNameByIdx: function (object, idx){
      var i=0;
      for(var n in object) {
       if(i==idx) return n;
       i++;
      }
      return null;
     },
     getMemberNameByType: function (object, type, idx){
      var i=0;
      for(var n in object) {
       var valueType = typeof(object[n]);
       //console.log(n+" "+valueType);
       if(type==valueType) {
        if(i==idx) return n;
        i++;
       }       
      }
      return null;
     },
     dump: function (object,rootName,deep,includeFunction) {
      //console.log("dump "+rootName);
      var dumpInternal=function(obj, path) {
       //console.log("DEBUG: dumpInternal(obj, "+path+") ind:"+ind+", deep:"+deep+", output.length:"+s.length);
       if(obj===null) {
        s += "" + path +": {null}" + "\n";
        return;
       } else if(obj===undefined){
        s += "" + path +": {undefined}" + "\n";
        return;
       }
       var valueType = typeof(obj);
       switch (valueType) {
        case "function": 
         return;
         // try{var fr=obj();}catch(ex){var  fr=ex;}
         // s+= "" + path +": "+ "{function} returns: "+fr + "\n";return;
        case "object"  : s+= "" + path +": {} -->" /*+ propValue.toString().substr(0,20)*/ + "\n";break;
        case "boolean" : s+= "" + path +": "+ obj.toString() + "\n";return;
        case "number"  : s+= "" + path +": "+ obj.toString() + "\n";return;
        case "string"  : s+= "" + path +": \""+ obj.toString() + "\"\n";return;
        default:s += "" + path +" ("+ valueType +"): "+ obj.toString() + "\n";return;
       }      
       
       for (var o in objs) {
        if(o===obj) {
         s+= "{!Recursion stoped!}\n";
         return;
        } else objs.push(obj);
       }
       var members=[];for (var p in obj) members.push(p);
       if(members.length>1000) {console.log("WARNING: dump() Too much members! "+members.length); return;} //TODO
       if(deep>0 && ind>=deep) return;
       if(/.GHPRYH$/.test()) return; //TODO
       if(path.length>30) {console.log("WARNING: dump() Path too long!"); return;} //TODO
       ind++;
       for (var propName in obj) {dumpInternal(obj[propName], path+"."+propName);}
       ind--;
      }
      var objs = [];
      var ind = 0;
      var s = "";
      if(typeof(rootName)=='undefined')rootName="*";
      if(typeof(deep)=='undefined')deep=1;
      if(typeof(includeFunction)=='undefined')includeFunction=false;
      try{dumpInternal(object,rootName);}catch(ex){console.log("ERROR: dump() > "+ex);}
      return s;
     }
                }
            });
        }
        function TAMap_checkIfLoaded() {
            try {
                if ( typeof qx != 'undefined' && typeof Addons != 'undefined') {
                    var a = qx.core.Init.getApplication();
                    // application
                    var mb = qx.core.Init.getApplication().getMenuBar();
                    var addonmenu = Addons.AddonMainMenu.getInstance();
                    if (a && mb && addonmenu) {
                        createMapTweak();
                        window.TAMap.main.getInstance().initialize();
                    } else
                        window.setTimeout(TAMap_checkIfLoaded, 1000);
                } else {
                    window.setTimeout(TAMap_checkIfLoaded, 1000);
                }
            } catch (e) {
                if ( typeof console != 'undefined')
                    console.log(e);
                else if (window.opera)
                    opera.postError(e);
                else
                    GM_log(e);
            }
        }
        if (/commandandconquer\.com/i.test(document.domain)) {
            window.setTimeout(TAMap_checkIfLoaded, 1000);
        }
    }
    // injecting, because there seem to be problems when creating game interface with unsafeWindow
    var TAMapScript = document.createElement("script");
    var txt = TAMap_mainFunction.toString();
    TAMapScript.innerHTML = "(" + txt + ")();";
    TAMapScript.type = "text/javascript";
    if (/commandandconquer\.com/i.test(document.domain)) {
        document.getElementsByTagName("head")[0].appendChild(TAMapScript);
    }
})();
		elda_hasload(155739);
	} else {
		elda_hasnotload(155739);
	}
} catch (e) {
    GM_log(e);
	GM_log(e.name + " " + e.message);
}

/*
URL:		http://userscripts.org/scripts/source/155425.user.js
Id:		155425
Name:		C&C Tiberium Alliances Navigate
Version:	1.1
Date:		2013-01-01

*/
try {

	elda_addon_info[155425] = {
		id: 155425,
		name: "C&C Tiberium Alliances Navigate",
		version: "1.1",
		date: "2013-01-01",
		can_disabled: true,
		loaded: false
	};

	if(elda_hastoload(155425)) {

(function (){
    var nav_load_main = function() {  
        
        var navBox = null;
        var navBox_x = null;
        var navBox_y = null;
        
        function log_it(e){
            if (typeof console != 'undefined') console.log('[NAV] '+e);
            else if (window.opera) opera.postError('[NAV] '+e);
            else GM_log('[NAV] '+e);   
        }
        
        function closeNavigate(){
            navBox.close();
        }
        
        
        function doNavigate(){
            
            var x = navBox_x.getValue();
            var y = navBox_y.getValue();
            
            log_it(x+':'+y);
            try 
            {
                ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(x,y);
            }
            catch (ex)
            {   
                log_it('ERROR: '+ex);
            }
            
            closeNavigate();
        }
        
        
        function initialize() {
            console.log("Navigate Loaded...");     
            var addonmenu = Addons.AddonMainMenu.getInstance(); 
            addonmenu.AddMainMenu("Navigate",function(){ navBox.open(); },"ALT+N"); 
            
            navBox = new qx.ui.window.Window("Map Navi");
            navBox.setPadding(1);
            navBox.setLayout(new qx.ui.layout.Grow());
            // this.navBox.setLayout(new qx.ui.layout.VBox());
            var layout = new qx.ui.layout.Grid();
            layout.setSpacing(5);
            layout.setColumnAlign(1,"left", "center");
            layout.setColumnAlign(0,"left", "bottom");
            navBox.setLayout(layout);
            navBox.setShowMaximize(false);
            navBox.setShowMinimize(false);
            navBox.moveTo(600, 100);
            navBox.setHeight(150);
            navBox.setWidth(110);
            navBox.setMinWidth(10);
            navBox.setMinHeight(10);
            // TextField
            navBox_x = new qx.ui.form.Spinner();
            navBox_y = new qx.ui.form.Spinner();
            
            navBox_x.setMinimum(0);
            navBox_x.setMaximum(1000);
            
            navBox_y.setMinimum(0);
            navBox_y.setMaximum(1000);
            
            navBox_x.setValue(500);
            navBox_y.setValue(500);
            
            
            navBox_x.addListener("keyup", function(e) {
                if(e.getKeyCode() == 13) {
                    doNavigate();
                }
            }, this);
            
            navBox_y.addListener("keyup", function(e) {
                if(e.getKeyCode() == 13) {
                    doNavigate();
                }
            }, this);
            
            
            var makeLbl = function(name) {
                var lbl =  new qx.ui.basic.Label(name);
                lbl.setTextColor("white");
                return lbl;
            }
            
            
            navBox.add(makeLbl("X:"), {row:0, column:0});
            navBox.add(navBox_x, {row:0, column:1});
            
            navBox.add(makeLbl("Y:"), {row:1, column:0});
            navBox.add(navBox_y, {row:1, column:1});
            
            var bt = new qx.ui.form.Button("Navigate");
            bt.set({
                appearance : "button-text-small",
                toolTipText : "Navigate to"
            });
            
            bt.addListener("click", function() { doNavigate(); }, this);
            navBox.add(bt,{row:2,column:1});
            
        }
        
        function nav_checkIfLoaded() {
            try {
                if (typeof qx != 'undefined' && typeof Addons != 'undefined') {
                    a = qx.core.Init.getApplication(); // application
                    mb = qx.core.Init.getApplication().getMenuBar();
                    addonmenu = Addons.AddonMainMenu.getInstance();
                    if (a && mb && addonmenu) {
                        initialize();
                    } else
                        window.setTimeout(nav_checkIfLoaded, 1000);
                } else {
                    window.setTimeout(nav_checkIfLoaded, 1000);
                }
            } catch (e) {
                log_it(e);
            }
        }
        
        if (/commandandconquer\.com/i.test(document.domain)) {
            window.setTimeout(nav_checkIfLoaded, 1000);
        }
    }
    
    // injecting, because there seem to be problems when creating game interface with unsafeWindow
    var navScript = document.createElement("script");
    navScript.innerHTML = "(" + nav_load_main.toString() + ")();";
    navScript.type = "text/javascript";
    if (/commandandconquer\.com/i.test(document.domain)) {
        document.getElementsByTagName("head")[0].appendChild(navScript);
    }
})();


		elda_hasload(155425);
	} else {
		elda_hasnotload(155425);
	}
} catch (e) {
    GM_log(e);
	GM_log(e.name + " " + e.message);
}

/*
URL:		http://userscripts.org/scripts/source/140991.user.js
Id:		140991
Name:		MaelstromTools Dev
Version:	0.1.3.2

*/
try {

	elda_addon_info[140991] = {
		id: 140991,
		name: "MaelstromTools Dev",
		version: "0.1.3.2",
		date: "",
		can_disabled: true,
		loaded: false
	};

	if(elda_hastoload(140991)) {
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
              this.Data["Repair all defense buildings"] = ["Alle Verteidigungsgebäude reparieren", "Reparar todos os edifícios de defesa", "Réparer tous les bâtiments de défense", "Tüm savunma binalarını onar"][l];
              this.Data["Repair all buildings"] = ["Alle Gebäurde reparieren", "Reparar todos os edifícios", "Réparer tous les bâtiments", "Tüm binaları onar"][l];
              this.Data["Base status overview"] = ["Basisübersicht", "Estado geral da base", "aperçu de l'état de base", "Üs durumu önizlemesi"][l];
              this.Data["Upgrade priority overview"] = ["Upgrade Übersicht", "Prioridade de upgrades", "aperçu des priorités de mise à niveau", "Yükseltme önceliği önizlemesi"][l];
              this.Data["MaelstromTools Preferences"] = ["MaelstromTools Einstellungen", "Preferências de MaelstromTools", "Préférences MaelstromTools", "MaelstromTools Ayarları"][l];
              this.Data["Options"] = ["Einstellungen", "Opções", "Options", "Seçenekler"][l];
              this.Data["Target out of range, no resource calculation possible"] = ["Ziel nicht in Reichweite, kann die plünderbaren Ressourcen nicht berechnen", "Alvo fora do alcance, não é possivel calcular os recursos", "Cible hors de portée, pas de calcul de ressources possible",
     "Hedef menzil dışında, kaynak hesaplaması olanaksız"][l];
              this.Data["Lootable resources"] = ["Plünderbare Ressourcen", "Recursos roubáveis", "Ressources à piller", "Yağmalanabilir kaynaklar"][l];
              this.Data["per CP"] = ["pro KP", "por PC", "par PC", "KP başına"][l];
              this.Data["2nd run"] = ["2. Angriff", "2º ataque", "2° attaque", "2. saldırı"][l];
              this.Data["3rd run"] = ["3. Angriff", "3º ataque", "3° attaque", "3. saldırı"][l];
              this.Data["Calculating resources..."] = ["Berechne plünderbare Ressourcen...", "A calcular recursos...", "calcul de ressources ...", "Kaynaklar hesaplanıyor..."][l];
              this.Data["Next MCV"] = ["MBF", "MCV", "VCM"][l];
              this.Data["Show time to next MCV"] = ["Zeige Zeit bis zum nächsten MBF", "Mostrar tempo restante até ao próximo MCV", "Afficher l'heure pour le prochain VCM ", "Sırdaki MCV için gereken süreyi göster"][l];
              this.Data["Show lootable resources (restart required)"] = ["Zeige plünderbare Ressourcen (Neustart nötig)", "Mostrar recursos roubáveis (é necessário reiniciar)", "Afficher les ressources fouiller (redémarrage nécessaire)", "Yağmalanabilir kaynakları göster (yeniden başlatma gerekli)"][l];
              this.Data["Use dedicated Main Menu (restart required)"] = ["Verwende extra Hauptmenü (Neustart nötig)", "Usar botão para o Menu Principal (é necessário reiniciar)", "Utiliser dédiée du menu principal (redémarrage nécessaire)", "Ana menü tuşunu kullan (yeniden başlatma gerekli)"][l];
              this.Data["Autocollect packages"] = ["Sammle Pakete automatisch", "Auto recolher pacotes", "paquets autocollecté", "Paketleri otomatik topla"][l];
              this.Data["Autorepair units"] = ["Repariere Einheiten automatisch", "Auto reparar o exército", "unités autoréparé", "Üniteleri otomatik onar"][l];
              this.Data["Autorepair defense (higher prio than buildings)"] = ["Repariere Verteidigung automatisch (höhere Prio als Gebäude)", "Auto reparar defesa (maior prioridade do que os edifícios)", "réparation automatique la défense (priorité plus élevé que les bâtiments) ", "Savunmayı otomatik onar (binalardan daha yüksek öncelikli olarak)"][l];
              this.Data["Autorepair buildings"] = ["Repariere Gebäude automatisch", "Auto reparar edifícios", "bâtiments autoréparé", "Binaları otomatik onar"][l];
              this.Data["Automatic interval in minutes"] = ["Auto-Intervall in Minuten", "Intervalo de tempo automático (em minutos)", "intervalle automatique en quelques minutes", "Otomatik toplama aralığı (dk)"][l];
              this.Data["Apply changes"] = ["Speichern", "Confirmar", "Appliquer changements", "Uygula"][l];
              this.Data["Discard changes"] = ["Abbrechen", "Cancelar", "Annuler changements", "İptal"][l];
              this.Data["Reset to default"] = ["Auf Standard zurücksetzen", "Definições padrão", "Réinitialiser", "Sıfırla"][l];
              this.Data["Continuous"] = ["Kontinuierlich", "Contínua", "continue", "Sürekli"][l];
              this.Data["Bonus"] = ["Pakete", "Bónus", "Bonus", "Bonus"][l];
              this.Data["POI"] = ["POI", "POI", "POI", "POI"][l];
              this.Data["Total / h"] = ["Gesamt / h", "Total / h", "Total / h", "Toplam / sa."][l];
              this.Data["Repaircharges"] = ["Reparaturzeiten", "Custo de reparação", "frais de réparation", "Onarım maliyeti"][l];
              this.Data["Repairtime"] = ["Max. verfügbar", "Tempo de reparação", "Temps de réparation", "Onarım süresi"][l];
              this.Data["Attacks"] = ["Angriffe", "Ataques", "Attaques", "Saldırılar"][l];
              this.Data[MaelstromTools.Statics.Infantry] = ["Infanterie", "Infantaria", "Infanterie", "Piyade"][l];
              this.Data[MaelstromTools.Statics.Vehicle] = ["Fahrzeuge", "Veículos", "Vehicule", "Motorlu B."][l];
              this.Data[MaelstromTools.Statics.Aircraft] = ["Flugzeuge", "Aeronaves", "Aviation", "Hava A."][l];
              this.Data[MaelstromTools.Statics.Tiberium] = ["Tiberium", "Tibério", "Tiberium", "Tiberium"][l];
              this.Data[MaelstromTools.Statics.Crystal] = ["Kristalle", "Cristal", "Cristal", "Kristal"][l];
              this.Data[MaelstromTools.Statics.Power] = ["Strom", "Potência", "Energie", "Güç"][l];
              this.Data[MaelstromTools.Statics.Dollar] = ["Credits", "Créditos", "Crédit", "Kredi"][l];
              this.Data[MaelstromTools.Statics.Research] = ["Forschung", "Investigação", "Recherche", "Araştırma"][l];
              this.Data["Base"] = ["Basis", "Base", "Base", "Üs"][l];
              this.Data["Defense"] = ["Verteidigung", "Defesa", "Défense", "Savunma"][l];
              this.Data["Army"] = ["Armee", "Exército", "Armée", "Ordu"][l];
              this.Data["Level"] = ["Stufe", "Nível", "Niveau", "Seviye"][l];
              this.Data["Buildings"] = ["Gebäude", "Edifícios", "Bâtiments", "Binalar"][l];
              this.Data["Health"] = ["Leben", "Vida", "Santé", "Sağlık"][l];
              this.Data["Units"] = ["Einheiten", "Unidades", "Unités", "Üniteler"][l];
              this.Data["Hide Mission Tracker"] = ["Missionsfenster ausblenden", "Esconder janela das Missões", "Cacher la fenêtre de mission", "Görev İzleyicisini Gizle"][l];
              this.Data["none"] = ["keine", "nenhum", "aucun", "hiçbiri"][l];
              this.Data["Cooldown"] = ["Cooldown", "Relocalização", "Recharge", "Cooldown"][l];
              this.Data["Protection"] = ["Geschützt bis", "Protecção", "Protection", "Koruma"][l];
              this.Data["Available weapon"] = ["Verfügbare Artillerie", "Apoio disponível", "arme disponible", "Mevcut silah"][l];
              this.Data["Calibrated on"] = ["Kalibriert auf", "Calibrado em", "Calibré sur ", "Kalibreli"][l];
              this.Data["Total resources"] = ["Gesamt", "Total de recursos", "Ressources totales", "Toplam kaynaklar"][l];
              this.Data["Max. storage"] = ["Max. Kapazität", "Armazenamento Máx.", "Max. de stockage", "Maks. Depo"][l];
              this.Data["Storage full!"] = ["Lager voll!", "Armazenamento cheio!", "Stockage plein", "Depo dolu!"][l];
              this.Data["Storage"] = ["Lagerstand", "Armazenamento", "Stockage", "Depo"][l];
              this.Data["display only top buildings"] = ["Nur Top-Gebäude anzeigen", "Mostrar apenas melhores edifícios", "afficher uniquement les bâtiments principaux", "yalnızca en iyi binaları göster"][l];
              this.Data["display only affordable buildings"] = ["Nur einsetzbare Gebäude anzeigen", "Mostrar apenas edíficios acessíveis", "afficher uniquement les bâtiments abordables", "yalnızca satın alınabilir binaları göster"][l];
              this.Data["City"] = ["Stadt", "Base", "Base", "Şehir"][l];
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
              this.Data["Possible attacks from this base (available CP)"] = ["Mögliche Angriffe (verfügbare KP)", "Possible attacks from this base (available CP)","Possible attacks from this base (available CP)", "Bu üsten yapılması mümkün olan saldırılar (mevcut KP)"][l];
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
                  right: 5 + (52 * this.itemsOnDesktopCount[desktopPosition]),
                  //top: this.initialAppointmentBarHeight + 125 + (42 * (desktopPosition - 1))
                  bottom: 140 - (42 * (desktopPosition - 1))
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
		elda_hasload(140991);
	} else {
		elda_hasnotload(140991);
	}
} catch (e) {
    GM_log(e);
	GM_log(e.name + " " + e.message);
}

/*
URL:		http://userscripts.org/scripts/source/145168.user.js
Id:		145168
Name:		Maelstrom ADDON Basescanner
Version:	1.8.3

*/
try {

	elda_addon_info[145168] = {
		id: 145168,
		name: "Maelstrom ADDON Basescanner",
		version: "1.8.3",
		date: "",
		can_disabled: true,
		loaded: false
	};

	if(elda_hastoload(145168)) {
(function(){var b=function(){var e=["__msbs_version","1.8.3","Addons.BaseScannerGUI","singleton","Window","window","ui","base","Addons.BaseScannerGUI ","info","T","getInstance","Language","setWidth","setHeight","setContentPadding","setShowMinimize","setShowMaximize","setShowClose","setResizable","setAllowMaximize","setAllowMinimize","setAllowClose","setShowStatusbar","setDecorator","setPadding","layout","setLayout","src","stats","https://goo.gl/81xZN","ZE","removeAll","add","setData","ZL","Addons.BaseScannerGUI.construct: ","debug","img","createElement","setCaption","isVisible","close","updateCityCache","Cache","MaelstromTools","ZC","Cities","form","Basescanner_LastCityID","getserver","LocalStorage","get_Id","Object","setSelection","open","moveTo","MaelstromTools.DefaultObject.openWindow: ","log","model","table","ID","LoadState","City","get","Location","Level","Tiberium","Crystal","Dollar","Research","Crystalfields","Tiberiumfields","Building state","Defense state","CP","Def.HP/Off.HP","Sum Tib+Cry+Cre","(Tib+Cry+Cre)/CP","CY","DF","base set up at","setColumns","YY","get_Player","MainData","Data","ZN","setColumnVisibilityButtonVisible","setColumnWidth","Basescanner_ColWidth_2","Basescanner_ColWidth_3","Basescanner_ColWidth_4","Basescanner_ColWidth_5","Basescanner_ColWidth_6","Basescanner_ColWidth_7","Basescanner_ColWidth_8","Basescanner_ColWidth_9","Basescanner_ColWidth_10","Basescanner_ColWidth_11","Basescanner_ColWidth_12","Basescanner_ColWidth_13","Basescanner_ColWidth_14","Basescanner_ColWidth_15","Basescanner_ColWidth_16","Basescanner_ColWidth_17","Basescanner_ColWidth_18","Basescanner_ColWidth_19","getTableColumnModel","getColumnCount","Basescanner_Column_","setColumnVisible","Statics","images","headerrenderer","setHeaderCellRenderer","FA","set","cellrenderer","setDataCellRenderer","cellDblclick","BaseScannerGUI","addListener","widthChanged","col","getData","newWidth","Basescanner_ColWidth_","setserver","Addons.BaseScannerGUI.FI: ","getRow","length",":","split","VisMain","Vis","getValue","ZK","getApplication","Init","core","closeCityInfo","getBackgroundArea","pavmCombatSetupDefense","PlayerAreaViewMode","setView","getPlayArea","get_CurrentOwnCity","get_Cities","set_CurrentTargetBaseId","get_CityArmyFormationsManager","Addons.BaseScannerGUI FB error: ","Scan","setLabel","ZG","ZH","format","util","setGroupingUsed","setMaximumFractionDigits","abs","floor","k","M","G","container","setMargin","changeSelection","CP Limit","white","basic","ZQ","Basescanner_Cplimiter","","min Level","Basescanner_minLevel","1","ZY","Player","setTextColor","Basescanner_Show0","setValue","changeValue","Bases","Basescanner_Show1","Outpost","Basescanner_Show2","Camp","Basescanner_Show3","execute","solid","blue","decoration","ZV","red","ZU","green","ZX","center","YZ","clear Cache","ZZ","Only center on World","ZJ","7 "," 5 ","6 "," 6 ","5 "," 7 ","ZD","Get Layouts","BaseScannerLayout","Addons","BaseScanner Layout","openWindow","setEnabled","ZB","Loader","gui","ZR","getColumnName","isColumnVisible","index","ZO","+","ZI","addAfter","-","remove","right","setAlignX","ZF","Addons.BaseScannerGUI.createOptions: ","\x3Ca href=\x22\x22 target=\x22_blank\x22\x3ESupport Development of BlinDManX Addons\x3C/a\x3E","ZP","getModel","getSelection","get_PosX","get_PosY","set_CurrentCityId","ZT","prototype","WorldObjectCity","WorldSector","$ctor","ClientLib.Data.WorldSector.WorldObjectCity","getLevel","Error - ClientLib.Data.WorldSector.WorldObjectCity.Level undefined","error","getID","Error - ClientLib.Data.WorldSector.WorldObjectCity.ID undefined","WorldObjectNPCBase","ClientLib.Data.WorldSector.WorldObjectNPCBase","Error - ClientLib.Data.WorldSector.WorldObjectNPCBase.Level undefined","Error - ClientLib.Data.WorldSector.WorldObjectNPCBase.ID undefined","WorldObjectNPCCamp","ClientLib.Data.WorldSector.WorldObjectNPCCamp","Error - ClientLib.Data.WorldSector.WorldObjectNPCCamp.Level undefined","getCampType","Error - ClientLib.Data.WorldSector.WorldObjectNPCCamp.CampType undefined","Error - ClientLib.Data.WorldSector.WorldObjectNPCCamp.ID undefined","Pause","window.Addons.BaseScannerGUI.getInstance().FJ()","setTimeout","window.Addons.BaseScannerGUI.getInstance().FG()","/","ZM","get_World","Scanning from: ","get_Name","get_MaxAttackDistance","get_Server","sqrt","Type","function","push","sortByColumn","name","DR01D","Maelstrom_Basescanner FJ error: ","data null: ","warn","data[i] null: ","get_PlayerId","get_AllianceId","get_IsGhostMode","get_CityUnitsData","d","get_Buildings","get_DefenseUnits","get_OffenseUnits","EResourceType","Base","Gold","ResearchPoints","ZA","get_Health","get_MdbUnitId","get_CoordY","HPRecord"," finish","countlastidchecked"," on "," removed (GetBuildingsConditionInPercent == 0)","splice"," removed (IsGhostMode)","lastid"," removed (found no data)","MaelstromTools_Basescanner getResources","ZS","define","Class","Addons.BaseScannerLayout","Addons.BaseScannerLayout ","ZW","Addons.BaseScannerLayout.construct: ","Addons.BaseScannerLayout.openWindow: ","ZE null: ","\x3Ctable border=\x222\x22 cellspacing=\x220\x22 cellpadding=\x220\x22\x3E"," - ","\x3Ctr\x3E\x3Ctd colspan=\x229\x22\x3E\x3Cfont color=\x22#FFF\x22\x3E","\x3C/font\x3E\x3C/td\x3E\x3C/tr\x3E","\x3Ctr\x3E","\x3Cimg width=\x2214\x22 height=\x2214\x22 src=\x22","\x22\x3E","Emptypixels","\x3Ctd\x3E","\x3C/td\x3E","\x3C/tr\x3E","\x3C/table\x3E","#303030","cid","click","setReturnValue","Addons.LocalStorage","static","undefined","isSupported","stringify","Addons.LocalStorage.setglobal: ","isdefined","parse","Addons.LocalStorage.getglobal: ","object","LocalStorage data from server not null, but not object","LocalStorage data from server not null, but parsererror","Addons.LocalStorage.setserver: ","isdefineddata","Addons.LocalStorage.getserver: ","Addons.Language","main","hasOwnProperty","Translate Added ","Addons.Language.addtranslateobj main not define","getLocale","Manager","locale","_","Addons.Language.get "," not translate for locale ","qx.ui.table.cellrenderer.Replace","Default","Function","value","getReplaceMap","getReplaceFunction","escape","String","bom","Maelstrom_Basescanner initalisiert","Point","Position","addtranslateobj","BaseScanner Overview","Basescanner Übersicht","Visão geral do scanner de base","Aperçu du scanner de base","Scannen","Esquadrinhar","Balayer","Lage","localização","Emplacement","Spieler","Jogador","Joueur","Camp,Outpost","Lager,Vorposten","Camp,posto avançado","Camp,avant-poste","Lager","Vorposten","posto avançado","avant-poste","Layout da Base de Dados de Scanner","Mise scanner de base","Show Layouts","Layouts anzeigen","Mostrar Layouts","Voir Layouts","Gebäudezustand","construção do Estado","construction de l\x27État","Verteidigungszustand","de Defesa do Estado","défense de l\x27Etat","KP","KP begrenzen","CP limitar","CP limiter","min. Level","nível mínimo","niveau minimum","Cache leeren","limpar cache","vider le cache","Nur auf Welt zentrieren","Único centro no Mundial","Seul centre sur World","Basis errichtbar","base de configurar a","mis en place à la base","Infantry","Infanterie","Infantaria","Vehicle","Fahrzeuge","Veículos","Vehicule","Aircraft","Flugzeuge","Aeronaves","Aviation","Tibério","Kristalle","Cristal","Power","Strom","Potência","Energie","Credits","Créditos","Crédit","Forschung","Investigação","Recherche","-----","--","FileManager","File","BaseScanner","ui/icons/icon_item.png","createNewImage","ui/menues/main_menu/misc_empty_pixel.png","version ","desktopPosition","createDesktopButton"," version ","addToMainMenu","AddonMainMenu","Basescanner","ALT+B","Wrapper","Count","get_HitpointsPercent","MaelstromTools_Basescanner getResourcesPart","replace","match","Error - ","not found","MaelstromTools_Basescanner_checkIfLoaded: ","domain","test"];window[e[0]]=e[1];function j(){qx[e[312]][e[311]](e[2],{type:e[3],extend:qx[e[6]][e[5]][e[4]],construct:function(){try{this[e[7]](arguments);console[e[9]](e[8]+window[e[0]]);this[e[10]]=Addons[e[12]][e[11]]();this[e[13]](820);this[e[14]](400);this[e[15]](10);this[e[16]](true);this[e[17]](true);this[e[18]](true);this[e[19]](true);this[e[20]](true);this[e[21]](true);this[e[22]](true);this[e[23]](false);this[e[24]](null);this[e[25]](5);this[e[27]](new qx[e[6]][e[26]].VBox(3));this[e[29]][e[28]]=e[30];this.FI();this.FH();this.FD();if(this[e[31]]==null){this[e[31]]=[];}this[e[25]](0);this[e[32]]();this[e[33]](this.ZF);this[e[33]](this.ZN);this[e[33]](this.ZP);this[e[35]][e[34]](this.ZE);}catch(t){console[e[37]](e[36],t);}},members:{stats:document[e[39]](e[38]),T:null,ZA:0,ZB:null,ZC:null,ZD:null,ZE:null,ZF:null,ZG:null,ZH:false,ZI:true,ZJ:null,ZK:null,ZL:null,ZM:null,ZN:null,ZO:null,ZP:null,ZQ:null,ZR:[],ZT:true,ZU:null,ZV:null,ZX:null,ZY:null,ZZ:[],ZS:{},YZ:null,YY:null,openWindow:function(w){try{this[e[40]](w);if(this[e[41]]()){this[e[42]]();}else{q[e[43]]();q=window[e[45]][e[44]][e[11]]();var v;this[e[46]][e[32]]();for(v in q[e[47]]){var u=new qx[e[6]][e[48]].ListItem(v,null,q[e[47]][v].Object);this[e[46]][e[33]](u);if(Addons[e[51]][e[50]](e[49])==q[e[47]][v][e[53]][e[52]]()){this[e[46]][e[54]]([u]);}}this[e[55]]();this[e[56]](100,100);}}catch(t){console[e[58]](e[57],t);}},FI:function(){try{this[e[35]]=new qx[e[6]][e[60]][e[59]].Simple();this[e[35]][e[82]]([e[61],e[62],this[e[10]][e[64]](e[63]),this[e[10]][e[64]](e[65]),this[e[10]][e[64]](e[66]),this[e[10]][e[64]](e[67]),this[e[10]][e[64]](e[68]),this[e[10]][e[64]](e[69]),this[e[10]][e[64]](e[70]),e[71],e[72],this[e[10]][e[64]](e[73]),this[e[10]][e[64]](e[74]),this[e[10]][e[64]](e[75]),e[76],e[77],e[78],e[79],e[80],this[e[10]][e[64]](e[81])]);this[e[83]]=ClientLib[e[86]][e[85]].GetInstance()[e[84]]();this[e[87]]=new qx[e[6]][e[60]].Table(this.ZL);this[e[87]][e[88]](false);this[e[87]][e[89]](0,0);this[e[87]][e[89]](1,0);this[e[87]][e[89]](2,Addons[e[51]][e[50]](e[90],120));this[e[87]][e[89]](3,Addons[e[51]][e[50]](e[91],60));this[e[87]][e[89]](4,Addons[e[51]][e[50]](e[92],50));this[e[87]][e[89]](5,Addons[e[51]][e[50]](e[93],60));this[e[87]][e[89]](6,Addons[e[51]][e[50]](e[94],60));this[e[87]][e[89]](7,Addons[e[51]][e[50]](e[95],60));this[e[87]][e[89]](8,Addons[e[51]][e[50]](e[96],60));this[e[87]][e[89]](9,Addons[e[51]][e[50]](e[97],30));this[e[87]][e[89]](10,Addons[e[51]][e[50]](e[98],30));this[e[87]][e[89]](11,Addons[e[51]][e[50]](e[99],50));this[e[87]][e[89]](12,Addons[e[51]][e[50]](e[100],50));this[e[87]][e[89]](13,Addons[e[51]][e[50]](e[101],30));this[e[87]][e[89]](14,Addons[e[51]][e[50]](e[102],60));this[e[87]][e[89]](15,Addons[e[51]][e[50]](e[103],60));this[e[87]][e[89]](16,Addons[e[51]][e[50]](e[104],60));this[e[87]][e[89]](17,Addons[e[51]][e[50]](e[105],50));this[e[87]][e[89]](18,Addons[e[51]][e[50]](e[106],50));this[e[87]][e[89]](19,Addons[e[51]][e[50]](e[107],40));var u=0;var t=this[e[87]][e[108]]();for(u=0;u<this[e[35]][e[109]]();u++){if(u==0||u==1||u==11||u==12){t[e[111]](u,Addons[e[51]][e[50]](e[110]+u,false));}else{t[e[111]](u,Addons[e[51]][e[50]](e[110]+u,true));}}t[e[111]](1,false);t[e[115]](9,new qx[e[6]][e[60]][e[114]].Icon(p[e[113]][MaelstromTools[e[112]][e[68]]]),e[71]);t[e[115]](10,new qx[e[6]][e[60]][e[114]].Icon(p[e[113]][MaelstromTools[e[112]][e[67]]],e[72]));t[e[119]](5,new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction:this[e[116]]}));t[e[119]](6,new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction:this[e[116]]}));t[e[119]](7,new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction:this[e[116]]}));t[e[119]](8,new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction:this[e[116]]}));t[e[119]](15,new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction:this[e[116]]}));t[e[119]](16,new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction:this[e[116]]}));t[e[119]](19,new qx[e[6]][e[60]][e[118]].Boolean());this[e[87]][e[122]](e[120],function(w){Addons[e[121]][e[11]]().FB(w);},this);t[e[122]](e[123],function(y){var x=y[e[125]]()[e[124]];var w=y[e[125]]()[e[126]];Addons[e[51]][e[128]](e[127]+x,w);},t);}catch(v){console[e[37]](e[129],v);}},FB:function(y){try{var A=this[e[31]][y[e[130]]()][0];var z=this[e[31]][y[e[130]]()][3];if(z!=null&&z[e[133]](e[132])[e[131]]==2){var x=parseInt(z[e[133]](e[132])[0]);var w=parseInt(z[e[133]](e[132])[1]);ClientLib[e[135]][e[134]].GetInstance().CenterGridPosition(x,w);}if(A&&!(this[e[137]][4][e[136]]())){var u=qx[e[140]][e[139]][e[138]]();u[e[142]]()[e[141]]();u[e[146]]()[e[145]](ClientLib[e[86]][e[144]][e[143]],A,0,0);}var t=ClientLib[e[86]][e[85]].GetInstance()[e[148]]()[e[147]]();if(t!=null){t[e[150]]()[e[149]](A);}}catch(v){console[e[37]](e[151],v);}},FN:function(t){this[e[154]][e[153]](this[e[10]][e[64]](e[152]));this[e[155]]=false;},CBChanged:function(t){this[e[155]]=false;},FA:function(t){var u=new qx[e[157]][e[156]].NumberFormat();u[e[158]](true);u[e[159]](3);if(!isNaN(t)){if(Math[e[160]](t)<100000){t=u[e[156]](Math[e[161]](t));}else{if(Math[e[160]](t)>=100000&&Math[e[160]](t)<1000000){t=u[e[156]](Math[e[161]](t/100)/10)+e[162];}else{if(Math[e[160]](t)>=1000000&&Math[e[160]](t)<10000000){t=u[e[156]](Math[e[161]](t/1000)/1000)+e[163];}else{if(Math[e[160]](t)>=10000000&&Math[e[160]](t)<100000000){t=u[e[156]](Math[e[161]](t/10000)/100)+e[163];}else{if(Math[e[160]](t)>=100000000&&Math[e[160]](t)<1000000000){t=u[e[156]](Math[e[161]](t/100000)/10)+e[163];}else{if(Math[e[160]](t)>=1000000000&&Math[e[160]](t)<10000000000){t=u[e[156]](Math[e[161]](t/1000000)/1000)+e[164];}else{if(Math[e[160]](t)>=10000000000&&Math[e[160]](t)<100000000000){t=u[e[156]](Math[e[161]](t/10000000)/100)+e[164];}else{if(Math[e[160]](t)>=100000000000&&Math[e[160]](t)<1000000000000){t=u[e[156]](Math[e[161]](t/100000000)/10)+e[164];}else{if(Math[e[160]](t)>=1000000000000&&Math[e[160]](t)<10000000000000){t=u[e[156]](Math[e[161]](t/1000000000)/1000)+e[10];}else{if(Math[e[160]](t)>=10000000000000&&Math[e[160]](t)<100000000000000){t=u[e[156]](Math[e[161]](t/10000000000)/100)+e[10];}else{if(Math[e[160]](t)>=100000000000000&&Math[e[160]](t)<1000000000000000){t=u[e[156]](Math[e[161]](t/100000000000)/10)+e[10];}else{if(Math[e[160]](t)>=1000000000000000){t=u[e[156]](Math[e[161]](t/1000000000000))+e[10];}}}}}}}}}}}}}return t.toString();},FH:function(){try{var D=new qx[e[6]][e[26]].Flow();var C=new qx[e[6]][e[165]].Composite(D);this[e[46]]=new qx[e[6]][e[48]].SelectBox();this[e[46]][e[14]](25);this[e[46]][e[166]](5);q[e[43]]();q=window[e[45]][e[44]][e[11]]();var G;for(G in q[e[47]]){var F=new qx[e[6]][e[48]].ListItem(G,null,q[e[47]][G].Object);this[e[46]][e[33]](F);if(Addons[e[51]][e[50]](e[49])==q[e[47]][G][e[53]][e[52]]()){this[e[46]][e[54]]([F]);}}this[e[46]][e[122]](e[167],function(H){this.FP(0,1,200);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));},this);C[e[33]](this.ZC);var B=new qx[e[6]][e[170]].Label()[e[117]]({value:this[e[10]][e[64]](e[168]),textColor:e[169],margin:5});C[e[33]](B);this[e[171]]=new qx[e[6]][e[48]].SelectBox();this[e[171]][e[13]](50);this[e[171]][e[14]](25);this[e[171]][e[166]](5);var z=Addons[e[51]][e[50]](e[172],25);for(var x=11;x<41;x+=1){F=new qx[e[6]][e[48]].ListItem(e[173]+x,null,x);this[e[171]][e[33]](F);if(z==x){this[e[171]][e[54]]([F]);}}this[e[171]][e[122]](e[167],function(H){this[e[31]]=[];this.FP(0,1,200);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));},this);C[e[33]](this.ZQ);var v=new qx[e[6]][e[170]].Label()[e[117]]({value:this[e[10]][e[64]](e[174]),textColor:e[169],margin:5});C[e[33]](v);var u=Addons[e[51]][e[50]](e[175],e[176]);this[e[177]]=new qx[e[6]][e[48]].TextField(u)[e[117]]({width:50});C[e[33]](this.ZY);this[e[137]]=[];this[e[137]][0]=new qx[e[6]][e[48]].CheckBox(this[e[10]][e[64]](e[178]));this[e[137]][0][e[166]](5);this[e[137]][0][e[179]](e[169]);this[e[137]][0][e[181]](Addons[e[51]][e[50]](e[180],false));this[e[137]][0][e[122]](e[182],function(H){this[e[31]]=[];this.FP(0,1,200);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));},this);C[e[33]](this[e[137]][0]);this[e[137]][1]=new qx[e[6]][e[48]].CheckBox(this[e[10]][e[64]](e[183]));this[e[137]][1][e[166]](5);this[e[137]][1][e[179]](e[169]);this[e[137]][1][e[181]](Addons[e[51]][e[50]](e[184],false));this[e[137]][1][e[122]](e[182],function(H){this[e[31]]=[];this.FP(0,1,200);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));},this);C[e[33]](this[e[137]][1]);this[e[137]][2]=new qx[e[6]][e[48]].CheckBox(this[e[10]][e[64]](e[185]));this[e[137]][2][e[166]](5);this[e[137]][2][e[179]](e[169]);this[e[137]][2][e[181]](Addons[e[51]][e[50]](e[186],false));this[e[137]][2][e[122]](e[182],function(H){this[e[31]]=[];this.FP(0,1,200);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));},this);C[e[33]](this[e[137]][2]);this[e[137]][3]=new qx[e[6]][e[48]].CheckBox(this[e[10]][e[64]](e[187]));this[e[137]][3][e[166]](5);this[e[137]][3][e[179]](e[169]);this[e[137]][3][e[181]](Addons[e[51]][e[50]](e[188],true));this[e[137]][3][e[122]](e[182],function(H){this[e[31]]=[];this.FP(0,1,200);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));},this);C[e[33]](this[e[137]][3],{lineBreak:true});this[e[154]]=new qx[e[6]][e[48]].Button(this[e[10]][e[64]](e[152]))[e[117]]({width:100,minWidth:100,maxWidth:100,height:25,margin:5});this[e[154]][e[122]](e[189],function(){this.FE();},this);C[e[33]](this.ZG);var t=new qx[e[6]][e[192]].Single(2,e[190],e[191]);this[e[193]]=new qx[e[6]][e[165]].Composite(new qx[e[6]][e[26]].Basic())[e[117]]({decorator:t,backgroundColor:e[194],allowGrowX:false,height:20,width:200});this[e[195]]=new qx[e[6]][e[140]].Widget()[e[117]]({decorator:null,backgroundColor:e[196],width:0});this[e[193]][e[33]](this.ZU);this[e[197]]=new qx[e[6]][e[170]].Label(e[173])[e[117]]({decorator:null,textAlign:e[198],width:200});this[e[193]][e[33]](this.ZX,{left:0,top:-3});C[e[33]](this.ZV);this[e[199]]=new qx[e[6]][e[48]].Button(this[e[10]][e[64]](e[200]))[e[117]]({minWidth:100,height:25,margin:5});this[e[199]][e[122]](e[189],function(){this[e[201]]=[];},this);C[e[33]](this.YZ);this[e[137]][4]=new qx[e[6]][e[48]].CheckBox(this[e[10]][e[64]](e[202]));this[e[137]][4][e[166]](5);this[e[137]][4][e[179]](e[169]);C[e[33]](this[e[137]][4],{lineBreak:true});this[e[203]]=new qx[e[6]][e[48]].SelectBox();this[e[203]][e[13]](150);this[e[203]][e[14]](25);this[e[203]][e[166]](5);var F=new qx[e[6]][e[48]].ListItem(e[204]+this[e[10]][e[64]](MaelstromTools[e[112]].Tiberium)+e[205]+this[e[10]][e[64]](MaelstromTools[e[112]].Crystal),null,7);this[e[203]][e[33]](F);F=new qx[e[6]][e[48]].ListItem(e[206]+this[e[10]][e[64]](MaelstromTools[e[112]].Tiberium)+e[207]+this[e[10]][e[64]](MaelstromTools[e[112]].Crystal),null,6);this[e[203]][e[33]](F);F=new qx[e[6]][e[48]].ListItem(e[208]+this[e[10]][e[64]](MaelstromTools[e[112]].Tiberium)+e[209]+this[e[10]][e[64]](MaelstromTools[e[112]].Crystal),null,5);this[e[203]][e[33]](F);C[e[33]](this.ZJ);this[e[210]]=new qx[e[6]][e[48]].Button(this[e[10]][e[64]](e[211]))[e[117]]({width:120,minWidth:120,maxWidth:120,height:25,margin:5});this[e[210]][e[122]](e[189],function(){var H=window[e[213]][e[212]][e[11]]();H[e[215]](this[e[10]][e[64]](e[214]));},this);this[e[210]][e[216]](false);C[e[33]](this.ZD);this[e[217]]=new qx[e[6]][e[165]].Composite();this[e[217]][e[27]](new qx[e[6]][e[26]].Flow());this[e[217]][e[13]](750);var A=webfrontend[e[219]][e[26]][e[218]][e[11]]();var y=2;for(y=2;y<this[e[35]][e[109]]();y++){var w=y-2;this[e[220]][w]=new qx[e[6]][e[48]].CheckBox(this[e[35]][e[221]](y));this[e[220]][w][e[181]](this[e[87]][e[108]]()[e[222]](y));this[e[220]][w][e[179]](e[169]);this[e[220]][w][e[223]]=y;this[e[220]][w][e[60]]=this[e[87]];this[e[220]][w][e[122]](e[182],function(H){var I=this[e[60]][e[108]]();I[e[111]](this[e[223]],H[e[125]]());Addons[e[51]][e[128]](e[110]+this[e[223]],H[e[125]]());});this[e[217]][e[33]](this[e[220]][w]);}this[e[224]]=new qx[e[6]][e[48]].Button(e[225])[e[117]]({margin:5});this[e[224]][e[122]](e[189],function(){if(this[e[226]]){C[e[227]](this.ZB,this.ZO);this[e[224]][e[153]](e[228]);}else{C[e[229]](this.ZB);this[e[224]][e[153]](e[225]);}this[e[226]]=!this[e[226]];},this);this[e[224]][e[231]](e[230]);C[e[33]](this.ZO,{lineBreak:true});this[e[232]]=C;}catch(E){console[e[37]](e[233],E);}},FD:function(){var v=ClientLib[e[86]][e[85]].GetInstance()[e[148]]();var t=v[e[147]]();var u=e[234];var w=new qx[e[6]][e[170]].Label()[e[117]]({value:u,rich:true,width:800});this[e[235]]=w;},FE:function(){var u=this[e[46]][e[237]]()[0][e[236]]();ClientLib[e[135]][e[134]].GetInstance().CenterGridPosition(u[e[238]](),u[e[239]]());ClientLib[e[135]][e[134]].GetInstance().Update();ClientLib[e[135]][e[134]].GetInstance().ViewUpdate();ClientLib[e[86]][e[85]].GetInstance()[e[148]]()[e[240]](u[e[52]]());if(this[e[241]]){var t=ClientLib[e[86]][e[244]][e[243]][e[242]];var y=g(t[e[245]],/this\.(.{6})=\(?\(?g>>8\)?\&.*d\+=f;this\.(.{6})=\(/,e[246],2);if(y!=null&&y[1][e[131]]==6){t[e[247]]=function(){return this[y[1]];};}else{console[e[249]](e[248]);}if(y!=null&&y[2][e[131]]==6){t[e[250]]=function(){return this[y[2]];};}else{console[e[249]](e[251]);}t=ClientLib[e[86]][e[244]][e[252]][e[242]];var x=g(t[e[245]],/100\){0,1};this\.(.{6})=Math.floor.*d\+=f;this\.(.{6})=\(/,e[253],2);if(x!=null&&x[1][e[131]]==6){t[e[247]]=function(){return this[x[1]];};}else{console[e[249]](e[254]);}if(x!=null&&x[2][e[131]]==6){t[e[250]]=function(){return this[x[2]];};}else{console[e[249]](e[255]);}t=ClientLib[e[86]][e[244]][e[256]][e[242]];var w=g(t[e[245]],/100\){0,1};this\.(.{6})=Math.floor.*this\.(.{6})=\(*g\>\>(22|0x16)\)*\&7.*=-1;\}this\.(.{6})=\(/,e[257],4);if(w!=null&&w[1][e[131]]==6){t[e[247]]=function(){return this[w[1]];};}else{console[e[249]](e[258]);}if(w!=null&&w[2][e[131]]==6){t[e[259]]=function(){return this[w[2]];};}else{console[e[249]](e[260]);}if(w!=null&&w[4][e[131]]==6){t[e[250]]=function(){return this[w[4]];};}else{console[e[249]](e[261]);}this[e[241]]=false;}if(this[e[31]]==null){this[e[155]]=false;this[e[154]][e[153]](e[262]);this[e[210]][e[216]](false);window[e[264]](e[263],1000);return;}var v=0;for(i=0;i<this[e[31]][e[131]];i++){if(this[e[31]][i][1]==-1){v++;}}if(!this[e[155]]){this[e[154]][e[153]](e[262]);this[e[210]][e[216]](false);if(v>0){this[e[155]]=true;window[e[264]](e[265],1000);return;}else{this[e[155]]=false;window[e[264]](e[263],1000);}}else{this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));}},FP:function(v,u,t){if(this[e[195]]!=null&&this[e[197]]!=null){this[e[195]][e[13]](parseInt(v/u*t,10));this[e[197]][e[181]](v+e[266]+u);}},FJ:function(){try{this[e[267]]={};this[e[31]]=[];var N=this[e[46]][e[237]]()[0][e[236]]();Addons[e[51]][e[128]](e[49],N[e[52]]());var G=this[e[171]][e[237]]()[0][e[236]]();Addons[e[51]][e[128]](e[172],G);Addons[e[51]][e[128]](e[175],this[e[177]][e[136]]());var M=this[e[137]][0][e[136]]();var L=this[e[137]][1][e[136]]();var K=this[e[137]][2][e[136]]();var J=this[e[137]][3][e[136]]();var I=parseInt(this[e[177]][e[136]](),10);Addons[e[51]][e[128]](e[180],M);Addons[e[51]][e[128]](e[184],L);Addons[e[51]][e[128]](e[186],K);Addons[e[51]][e[128]](e[188],J);var F=N[e[238]]();var E=N[e[239]]();var H=0;var C=0;var B=ClientLib[e[86]][e[85]].GetInstance()[e[268]]();console[e[9]](e[269]+N[e[270]]());var A=true;var y=true;var w=true;var u=ClientLib[e[86]][e[85]].GetInstance()[e[272]]()[e[271]]();for(C=E-Math[e[161]](u+1);C<=E+Math[e[161]](u+1);C++){for(H=F-Math[e[161]](u+1);H<=F+Math[e[161]](u+1);H++){var t=Math[e[160]](F-H);var R=Math[e[160]](E-C);var Q=Math[e[273]]((t*t)+(R*R));if(Q<=u){var P=B.GetObjectFromPosition(H,C);var z={};if(P){if(P[e[274]]==1&&A){}if(P[e[274]]==2&&y){}if(P[e[274]]==3&&w){}if(P[e[274]]==3){if(I<=parseInt(P[e[247]](),10)){}}var x=N.CalculateAttackCommandPointCostToCoord(H,C);if(x<=G&&typeof P[e[247]]==e[275]){if(I<=parseInt(P[e[247]](),10)){var v=this.FL(P[e[250]](),0);var D=this.FL(P[e[250]](),1);if(D!=null){this[e[267]][P[e[250]]()]=D;}if(P[e[274]]==1&&M){if(v!=null){this[e[31]][e[276]](v);}else{this[e[31]][e[276]]([P[e[250]](),-1,this[e[10]][e[64]](e[178]),H+e[132]+C,P[e[247]](),0,0,0,0,0,0,0,0,x,0,0,0,0]);}}if(P[e[274]]==2&&L){if(v!=null){this[e[31]][e[276]](v);}else{this[e[31]][e[276]]([P[e[250]](),-1,this[e[10]][e[64]](e[183]),H+e[132]+C,P[e[247]](),0,0,0,0,0,0,0,0,x,0,0,0,0]);}}if(P[e[274]]==3&&(K||J)){if(v!=null){if(P[e[259]]()==2&&J){this[e[31]][e[276]](v);}if(P[e[259]]()==3&&K){this[e[31]][e[276]](v);}}else{if(P[e[259]]()==2&&J){this[e[31]][e[276]]([P[e[250]](),-1,this[e[10]][e[64]](e[187]),H+e[132]+C,P[e[247]](),0,0,0,0,0,0,0,0,x,0,0,0,0]);}if(P[e[259]]()==3&&K){this[e[31]][e[276]]([P[e[250]](),-1,this[e[10]][e[64]](e[185]),H+e[132]+C,P[e[247]](),0,0,0,0,0,0,0,0,x,0,0,0,0]);}}}}}}}}}this[e[155]]=true;this[e[35]][e[34]](this.ZE);this.FP(0,this[e[31]][e[131]],200);this[e[35]][e[277]](4,false);if(this[e[83]][e[278]]!=e[279]){window[e[264]](e[265],50);}}catch(O){console[e[37]](e[280],O);}},FG:function(){try{var u=false;var t=0;var X=10;var y=0;var R=150;while(!u){var Q=null;var O=0;var M=0;if(this[e[31]]==null){console[e[282]](e[281]);this[e[155]]=false;break;}for(y=0;y<this[e[31]][e[131]];y++){if(this[e[31]][y][1]==-1){break;}}if(y==this[e[31]][e[131]]){this[e[155]]=false;}this.FP(y,this[e[31]][e[131]],200);if(this[e[31]][y]==null){console[e[282]](e[283]);this[e[155]]=false;this[e[154]][e[153]](this[e[10]][e[64]](e[152]));this[e[210]][e[216]](true);break;}posData=this[e[31]][y][3];if(posData!=null&&posData[e[133]](e[132])[e[131]]==2){posX=parseInt(posData[e[133]](e[132])[0]);posY=parseInt(posData[e[133]](e[132])[1]);var K=ClientLib[e[86]][e[85]].GetInstance()[e[148]]()[e[147]]();var v=ClientLib[e[86]][e[85]].GetInstance()[e[268]]();var I=v.CheckFoundBase(posX,posY,K[e[284]](),K[e[285]]());this[e[31]][y][19]=(I==0)?true:false;M=this[e[31]][y][0];ClientLib[e[86]][e[85]].GetInstance()[e[148]]()[e[240]](M);Q=ClientLib[e[86]][e[85]].GetInstance()[e[148]]().GetCity(M);if(Q!=null){if(!Q[e[286]]()){var E=Q[e[287]]();if(E!=null){var T=this[e[46]][e[237]]()[0][e[236]]();var C=Q[e[289]]()[e[288]];var z=E[e[290]]()[e[288]];var w=T[e[287]]()[e[291]]()[e[288]];if(C!=null){var P=d(C);var L=d(z);this[e[31]][y][2]=Q[e[270]]();this[e[31]][y][5]=P[ClientLib[e[293]][e[292]][e[67]]]+L[ClientLib[e[293]][e[292]][e[67]]];this[e[31]][y][6]=P[ClientLib[e[293]][e[292]][e[68]]]+L[ClientLib[e[293]][e[292]][e[68]]];this[e[31]][y][7]=P[ClientLib[e[293]][e[292]][e[294]]]+L[ClientLib[e[293]][e[292]][e[294]]];this[e[31]][y][8]=P[ClientLib[e[293]][e[292]][e[295]]]+L[ClientLib[e[293]][e[292]][e[295]]];if(Q.GetBuildingsConditionInPercent()!=0){this[e[296]]=0;if(this[e[31]][y][5]!=0){var S=0;var J=0;var B=0;var H=0;var G=0;this[e[267]][M]=new Array(9);for(B=0;B<9;B++){this[e[267]][M][B]=new Array(8);}for(H=0;H<9;H++){for(G=0;G<8;G++){switch(Q.GetResourceType(H,G)){case 1:this[e[267]][M][H][G]=1;S++;break;case 2:this[e[267]][M][H][G]=2;J++;break;default:break;}}}this[e[31]][y][9]=S;this[e[31]][y][10]=J;this[e[31]][y][11]=Q.GetBuildingsConditionInPercent();this[e[31]][y][12]=Q.GetDefenseConditionInPercent();try{var F=w;var D=0;var A=0;for(var V in F){D+=F[V][e[297]]();}F=z;for(var V in F){A+=F[V][e[297]]();}F=C;for(var V in F){var U=F[V][e[298]]();if(U==158||U==131||U==195){this[e[31]][y][18]=8-F[V][e[299]]();}if(U==112||U==151||U==177){this[e[31]][y][17]=8-F[V][e[299]]();}}}catch(N){console[e[37]](e[300],N);}this[e[31]][y][14]=(A/D);this[e[31]][y][15]=this[e[31]][y][5]+this[e[31]][y][6]+this[e[31]][y][7];this[e[31]][y][16]=this[e[31]][y][15]/this[e[31]][y][13];this[e[31]][y][1]=0;u=true;console[e[9]](Q[e[270]](),e[301]);this[e[296]]=0;this[e[302]]=0;this.FK(this[e[31]][y],this[e[267]][M],M);this[e[35]][e[34]](this.ZE);}}else{if(this[e[296]]>250){console[e[9]](this[e[31]][y][2],e[303],posX,posY,e[304]);this[e[31]][e[305]](y,1);this[e[296]]=0;this[e[302]]=0;break;}this[e[296]]++;}}}}else{console[e[9]](this[e[31]][y][2],e[303],posX,posY,e[306]);this[e[31]][e[305]](y,1);break;}}}t++;if(t>=X){u=true;break;}}if(this[e[307]]!=y){this[e[307]]=y;this[e[302]]=0;this[e[296]]=0;}else{if(this[e[302]]>16){console[e[9]](this[e[31]][y][2],e[303],posX,posY,e[308]);this[e[31]][e[305]](y,1);this[e[302]]=0;}else{if(this[e[302]]>10){R=500;}else{if(this[e[302]]>4){R=250;}}}this[e[302]]++;}if(this[e[155]]&&Addons[e[121]][e[11]]()[e[41]]()){window[e[264]](e[265],R);}else{this[e[154]][e[153]](this[e[10]][e[64]](e[152]));this[e[155]]=false;}}catch(W){console[e[37]](e[309],W);}},FK:function(v,u,t){this[e[201]][e[276]](v);this[e[310]][t]=u;},FL:function(u,v){if(v==0){for(var t=0;t<this[e[201]][e[131]];t++){if(this[e[201]][t][0]==u){return this[e[201]][t];}}}else{if(this[e[310]][u]){return this[e[310]][u];}}return null;}}});qx[e[312]][e[311]](e[313],{type:e[3],extend:qx[e[6]][e[5]][e[4]],construct:function(){try{this[e[7]](arguments);console[e[9]](e[314]+window[e[0]]);this[e[13]](820);this[e[14]](400);this[e[15]](10);this[e[16]](false);this[e[17]](true);this[e[18]](true);this[e[19]](true);this[e[20]](true);this[e[21]](false);this[e[22]](true);this[e[23]](false);this[e[24]](null);this[e[25]](10);this[e[27]](new qx[e[6]][e[26]].Grow());this[e[315]]=[];this[e[32]]();this[e[201]]=new qx[e[6]][e[165]].Scroll();this[e[177]]=new qx[e[6]][e[165]].Composite(new qx[e[6]][e[26]].Flow());this[e[33]](this.ZZ,{flex:3});this[e[201]][e[33]](this.ZY);}catch(t){console[e[37]](e[316],t);}},members:{ZW:null,ZZ:null,ZY:null,ZX:null,openWindow:function(u){try{this[e[40]](u);if(this[e[41]]()){this[e[42]]();}else{this[e[55]]();this[e[56]](100,100);this.FO();}}catch(t){console[e[58]](e[317],t);}},FO:function(){var H=window[e[213]][e[121]][e[11]]()[e[267]];var F=window[e[213]][e[121]][e[11]]()[e[31]];this[e[197]]=[];var D=window[e[213]][e[121]][e[11]]()[e[203]][e[237]]()[0][e[236]]();var B=null;if(F==null){console[e[9]](e[318]);return;}this[e[315]]=[];var w;var u;var z;var y;var I;for(w in H){for(u=0;u<F[e[131]];u++){if(F[u][0]==w){B=F[u];}}if(B==null){continue;}if(D>4&&D<8){if(D!=B[10]){continue;}}else{continue;}posData=B[3];if(posData!=null&&posData[e[133]](e[132])[e[131]]==2){posX=parseInt(posData[e[133]](e[132])[0]);posY=parseInt(posData[e[133]](e[132])[1]);}var t=e[319];var G=B[2]+e[320]+B[3];t=t+e[321]+G+e[322];for(y=0;y<8;y++){t=t+e[323];for(z=0;z<9;z++){var E=e[173];var C=H[w][z][y];switch(C==undefined?0:C){case 2:E=e[324]+p[e[113]][MaelstromTools[e[112]][e[67]]]+e[325];break;case 1:E=e[324]+p[e[113]][MaelstromTools[e[112]][e[68]]]+e[325];break;default:E=e[324]+p[e[113]][e[326]]+e[325];break;}t=t+e[327]+E+e[328];}t=t+e[329];}t=t+e[330];var v=new qx[e[6]][e[170]].Label()[e[117]]({backgroundColor:e[331],value:t,rich:true});v[e[332]]=w;this[e[197]][e[276]](w);v[e[122]](e[333],function(L){var K=qx[e[140]][e[139]][e[138]]();K[e[142]]()[e[141]]();K[e[146]]()[e[145]](ClientLib[e[86]][e[144]][e[143]],this[e[332]],0,0);var J=ClientLib[e[86]][e[85]].GetInstance()[e[148]]()[e[147]]();if(J!=null){J[e[150]]()[e[149]](this[e[332]]);}});v[e[334]]=w;this[e[315]][e[276]](v);}this[e[177]][e[32]]();var A=0;var x=0;for(I=0;I<this[e[315]][e[131]];I++){this[e[177]][e[33]](this[e[315]][I],{row:A,column:x});x++;if(x>4){x=0;A++;}}}}});qx[e[312]][e[311]](e[335],{type:e[336],extend:qx[e[140]][e[53]],statics:{isSupported:function(){return typeof(localStorage)!==e[337];},isdefined:function(t){return(localStorage[t]!==e[337]&&localStorage[t]!=null);},isdefineddata:function(u,t){return(u[t]!==e[337]&&u[t]!=null);},setglobal:function(v,t){try{if(Addons[e[51]][e[338]]()){localStorage[v]=JSON[e[339]](t);}}catch(u){console[e[37]](e[340],u);}},getglobal:function(v,u){try{if(Addons[e[51]][e[338]]()){if(Addons[e[51]][e[341]](v)){return JSON[e[342]](localStorage[v]);}}}catch(t){console[e[58]](e[343],t);}return u;},setserver:function(w,t){try{if(Addons[e[51]][e[338]]()){var v=ClientLib[e[86]][e[85]].GetInstance()[e[272]]()[e[270]]();var x;if(Addons[e[51]][e[341]](v)){try{x=JSON[e[342]](localStorage[v]);if(!(typeof x===e[344])){x={};console[e[37]](e[345]);}}catch(u){console[e[37]](e[346],u);x={};}}else{x={};}x[w]=t;localStorage[v]=JSON[e[339]](x);}}catch(u){console[e[37]](e[347],u);}},getserver:function(w,v){try{if(Addons[e[51]][e[338]]()){var u=ClientLib[e[86]][e[85]].GetInstance()[e[272]]()[e[270]]();if(Addons[e[51]][e[341]](u)){var x=JSON[e[342]](localStorage[u]);if(Addons[e[51]][e[348]](x,w)){return x[w];}}}}catch(t){console[e[58]](e[349],t);}return v;}}});if(typeof Addons[e[12]]===e[337]){qx[e[312]][e[311]](e[350],{type:e[3],extend:qx[e[140]][e[53]],members:{d:{},debug:false,addtranslateobj:function(t){if(t[e[352]](e[351])){this[e[288]][t[e[351]].toString()]=t;if(this[e[37]]){console[e[58]](e[353],t[e[351]].toString());}delete t[e[351]];}else{console[e[37]](e[354]);}},get:function(v){var u=qx[e[357]][e[356]][e[11]]()[e[355]]();var t=u[e[133]](e[358])[0];if(this[e[288]][e[352]](v)){if(this[e[288]][v][e[352]](t)){return this[e[288]][v][t];}}if(this[e[37]]){console[e[37]](e[359],v,e[360],t);}return v;}}});}qx[e[312]][e[311]](e[361],{extend:qx[e[6]][e[60]][e[118]][e[362]],properties:{replaceMap:{check:e[53],nullable:true,init:null},replaceFunction:{check:e[363],nullable:true,init:null}},members:{_getContentHtml:function(w){var x=w[e[364]];var v=this[e[365]]();var u=this[e[366]]();var t;if(v){t=v[x];if(typeof t!=e[337]){w[e[364]]=t;return qx[e[369]][e[368]][e[367]](this._formatValue(w));}}if(u){w[e[364]]=u(x);}return qx[e[369]][e[368]][e[367]](this._formatValue(w));},addReversedReplaceMap:function(){var t=this[e[365]]();for(var v in t){var u=t[v];t[u]=v;}return true;}}});console[e[9]](e[370]);var s=Addons[e[12]][e[11]]();s[e[37]]=false;s[e[373]]({main:e[371],de:e[372],pt:e[372],fr:e[372]});s[e[373]]({main:e[374],de:e[375],pt:e[376],fr:e[377]});s[e[373]]({main:e[152],de:e[378],pt:e[379],fr:e[380]});s[e[373]]({main:e[65],de:e[381],pt:e[382],fr:e[383]});s[e[373]]({main:e[178],de:e[384],pt:e[385],fr:e[386]});s[e[373]]({main:e[183],de:e[183],pt:e[183],fr:e[183]});s[e[373]]({main:e[387],de:e[388],pt:e[389],fr:e[390]});s[e[373]]({main:e[187],de:e[391],pt:e[187],fr:e[187]});s[e[373]]({main:e[185],de:e[392],pt:e[393],fr:e[394]});s[e[373]]({main:e[214],de:e[214],pt:e[395],fr:e[396]});s[e[373]]({main:e[397],de:e[398],pt:e[399],fr:e[400]});s[e[373]]({main:e[73],de:e[401],pt:e[402],fr:e[403]});s[e[373]]({main:e[74],de:e[404],pt:e[405],fr:e[406]});s[e[373]]({main:e[75],de:e[407],pt:e[75],fr:e[75]});s[e[373]]({main:e[168],de:e[408],pt:e[409],fr:e[410]});s[e[373]]({main:e[174],de:e[411],pt:e[412],fr:e[413]});s[e[373]]({main:e[200],de:e[414],pt:e[415],fr:e[416]});s[e[373]]({main:e[202],de:e[417],pt:e[418],fr:e[419]});s[e[373]]({main:e[81],de:e[420],pt:e[421],fr:e[422]});s[e[373]]({main:e[423],de:e[424],pt:e[425],fr:e[424]});s[e[373]]({main:e[426],de:e[427],pt:e[428],fr:e[429]});s[e[373]]({main:e[430],de:e[431],pt:e[432],fr:e[433]});s[e[373]]({main:e[67],de:e[67],pt:e[434],fr:e[67]});s[e[373]]({main:e[68],de:e[435],pt:e[436],fr:e[436]});s[e[373]]({main:e[437],de:e[438],pt:e[439],fr:e[440]});s[e[373]]({main:e[69],de:e[441],pt:e[442],fr:e[443]});s[e[373]]({main:e[70],de:e[444],pt:e[445],fr:e[446]});s[e[373]]({main:e[447],de:e[448],pt:e[448],fr:e[448]});var r=null;var q=null;var p=null;var o=null;var n=0;var m=0;o=ClientLib[e[450]][e[449]].GetInstance();r=window[e[45]][e[12]][e[11]]();q=window[e[45]][e[44]][e[11]]();p=window[e[45]][e[293]][e[11]]();p[e[453]](e[451],e[452],o);p[e[453]](e[326],e[454],o);var l=p[e[457]](s[e[64]](e[374])+e[455]+window[e[0]],e[451],false,p[e[456]](2));l[e[122]](e[189],function(){Addons[e[121]][e[11]]()[e[215]](s[e[64]](e[374])+e[458]+window[e[0]]);},this);Addons[e[121]][e[11]]()[e[122]](e[42],Addons[e[121]][e[11]]().FN,Addons[e[121]][e[11]]());p[e[459]](e[451],l);if(typeof Addons[e[460]]!==e[337]){var k=Addons[e[460]][e[11]]();k.AddMainMenu(e[461],function(){Addons[e[121]][e[11]]()[e[215]](s[e[64]](e[374])+e[458]+window[e[0]]);},e[462]);}}function d(o){try{var q=[0,0,0,0,0,0,0,0];if(o==null){return q;}for(var l in o){var n=o[l];var m=MaelstromTools[e[463]].GetUnitLevelRequirements(n);for(var k=0;k<m[e[131]];k++){q[m[k][e[274]]]+=m[k][e[464]]*n[e[465]]();if(n[e[465]]()<1){}}}return q;}catch(p){console[e[37]](e[466],p);}}function f(k){var m;for(m in k){if(typeof(k[m])==e[275]){var l=k[m].toString();console[e[37]](m,l);}}}function g(k,r,q,m){var p=[];var o=k.toString();var n=o[e[467]](/\s/gim,e[173]);p=n[e[468]](r);var l;for(l=1;l<(m+1);l++){if(p!=null&&p[l][e[131]]==6){console[e[37]](q,l,p[l]);}else{if(p!=null&&p[l][e[131]]>0){console[e[282]](q,l,p[l]);}else{console[e[249]](e[469],q,l,e[470]);console[e[282]](q,n);}}}return p;}function h(){try{if(typeof qx!=e[337]&&typeof MaelstromTools!=e[337]){j();}else{window[e[264]](h,1000);}}catch(k){console[e[37]](e[471],k);}}if(/commandandconquer\.com/i[e[473]](document[e[472]])){window[e[264]](h,10000);}};try{var a=document.createElement("script");a.innerHTML="("+b.toString()+")();";a.type="text/javascript";if(/commandandconquer\.com/i.test(document.domain)){document.getElementsByTagName("head")[0].appendChild(a);}}catch(c){console.debug("MaelstromTools_Basescanner: init error: ",c);}})();

		elda_hasload(145168);
	} else {
		elda_hasnotload(145168);
	}
} catch (e) {
    GM_log(e);
	GM_log(e.name + " " + e.message);
}

/*
URL:		http://userscripts.org/scripts/source/152177.user.js
Id:		152177
Name:		C&C: Tiberium Alliances Chat Helper Enhanced
Version:	3.1.6

*/
try {

	elda_addon_info[152177] = {
		id: 152177,
		name: "C&C: Tiberium Alliances Chat Helper Enhanced",
		version: "3.1.6",
		date: "",
		can_disabled: true,
		loaded: false
	};

	if(elda_hastoload(152177)) {

// type: /chelp in any text box and hit <enter> for a list of commands

// Please report urls that are not tagged properly

// window.chatHelper_suppressBrowserAltKeys suppresses normal browser menu keys [Alt+(a,p,b,i,u,s)] when you are in a textarea so that the menus don't open.

(function () {
 var chatHelper_main = function () {
  window.chatHelper_debug = 0; //initial debug level, top level for easy console access
  var chlog = function chlog(str,lvl){
   if (lvl > 0) { //lvl 1+
    if (window.chatHelper_debug == 1) { // lvl 1
     console.log("ChatHelper_debug: "+str+"\n");
    }
    if (window.chatHelper_debug == 2) { // lvl 2
     console.log("ChatHelper_debug: "+str+"\n");
    }
    
   } else { //lvl 0 or no arg passed to lvl
    console.log("ChatHelper_log: "+str+"\n");
   }
  };
  try {
   function createchatHelper() {
    var onkeyupDelay = 50; //ms to wait after a keyupevent before searching contacts list. Lower for faster searching. Higher for better performance.
    window.chatHelper_suppressBrowserAltKeys = true;
    window.chatHelper_version = "3.1.6";
    window.chatHelper_name = "C&C: Tiberium Alliances Chat Helper Enhanced";
    chlog(window.chatHelper_name + ' v' + window.chatHelper_version + ': loading.',0);
    var saveObj = {
     saveObjVer : "3.1.6",
     contacts : []
    }
    
    var validCharPatt = /[-\w\.]/;
    var isWhisp = false;
    var contacts = [];
    var timer;
    var _sub;

    
    function getCaretPos(obj) {
     // getCaretPos from: http://userscripts.org/scripts/show/151099
     obj.focus();
     
     if (obj.selectionStart) {
      return obj.selectionStart; //Gecko
     } else if (document.selection) //IE
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
     // moveCaretPos from: http://userscripts.org/scripts/show/151099
     if (inputObject.selectionStart) {
      inputObject.setSelectionRange(pos, pos);
      inputObject.focus();
     }
    }
    
    function getCursorWordPos(inputField) {
     var pos = getCaretPos(inputField);
     var inText = inputField.value;
     var lc = inText.charAt(pos - 1);
     if (lc.match(validCharPatt) != null) {
      var sPos = pos;
      var ePos = pos;
      var t = inputField.value;
      while (sPos >= 0 && t.charAt(sPos - 1).match(validCharPatt) != null) {
       sPos--;
      }
      while (ePos <= t.length && t.charAt(ePos).match(validCharPatt) != null) {
       ePos++;
      }
      //inputField.setSelectionRange(sPos,ePos);
      return [sPos, ePos];
     }
    }
    
    function tagWith(tag, inputField) {
     var eTag = tag.replace('[', '[/'); //closing tag
     var tagLen = tag.length;
     var eTagLen = eTag.length;
     if (inputField != null) {
      var pos = getCaretPos(inputField);
      var inText = inputField.value;
      //save scroll position
      if (inputField.type === 'textarea')
       var st = inputField.scrollTop;
      //if there is selected text
      if (inputField.selectionStart !== inputField.selectionEnd) {
       var a = inText.slice(0, inputField.selectionStart);
       var b = inText.slice(inputField.selectionStart, inputField.selectionEnd);
       var c = inText.slice(inputField.selectionEnd, inText.length);
       inputField.value = a + tag + b + eTag + c;
       moveCaret(inputField, pos + tagLen + eTagLen + b.length);
       //if ((input IS empty) OR (the last char was a space)) AND next char ISNOT a left sqbracket
      } else if ((inText === "" || inText.charAt(pos - 1) === " ") && (inText.charAt(pos) !== '[')) {
       inputField.value = inText.substr(0, pos) + tag + eTag + inText.substr(pos, inText.length);
       moveCaret(inputField, pos + tagLen);
       //if last character is a valid playername character
      } else if (inText.charAt(pos - 1).match(validCharPatt) != null) {
       var arr = getCursorWordPos(inputField); //
       var s = arr[0];
       var e = arr[1];
       inputField.value = inText.slice(0, s) + tag + inText.slice(s, e) + eTag + inText.slice(e, inText.length);
       moveCaret(inputField, e + tagLen + eTagLen);
      }
      //restore scroll position
      if (inputField.type === 'textarea')
       inputField.scrollTop = st;
     }
    }
    
    function showHelp() {
     alert("Type /chelp in any text box to show this message.\n\nEnter key in chat:\tsearches your chat string for Urls and Coords and wraps them before submission.\n\nAlt + 1\t:\tsearches for Urls and Coords in a message or forum post and tags accordingly. Cursor is moved to the beginning.\nAlt + 2\t:\tManual URL insertion popup window\nAlt + 0\t:\tclears all tags\n\nWord wraps: tags a selected word -or- tags the word where the cursor is (if chat is empty or you hit <space> empty tags are inserted).\nAttempts to preserve cursor and scroll position.\n|\tAlt + p or Alt + 3\t:\tplayer tags\n|\tAlt + a or Alt + 4\t:\talliance tags\n|\tAlt + b\t\t\t:\tbold tags\n|\tAlt + i\t\t\t:\titalic tags\n|\tAlt + u\t\t\t:\tunderline tags\n|__\tAlt + s\t\t\t:\tstrikethrough tags\n\nContact list commands:\n/list -or- /contacts\n/add\n/del\n/del all - wipes your whole contact list");
    }
    
    function saveData() {
     saveObj.contacts = contacts;
     var jString = JSON.stringify(saveObj);
     chlog("saveJSON: "+jString, 1);
     localStorage.setItem('chatHelper', jString);
    }

    function loadData() {
     try{
      if (localStorage.getItem('myContacts')) { //should be removed eventually
       var dat = localStorage.getItem('myContacts');
       dat = dat.split(',');
       saveObj.contacts = dat;
       
       //unset old storage 
       localStorage.removeItem('myContacts');
      } else if (localStorage.getItem('chatHelper')) {
       var saveObjTmp = JSON.parse(localStorage.getItem('chatHelper'));
       if (saveObjTmp.saveObjVer != window.chatHelper_version){
        //version changed
        var va = saveObjTmp.saveObjVer.split('.');
        var vb = window.chatHelper_version.split('.');
        
        if (va[0] != vb[0]){ //major version change
         chlog("ChatHelper: Major version change from v"+va[0]+"."+va[1]+"."+va[2]+" to v"+vb[0]+"."+vb[1]+"."+vb[2]);
        } else {
         if (va[1] != vb[1]){ //minor version change
          chlog("ChatHelper: Minor version change from v"+va[0]+"."+va[1]+"."+va[2]+" to v"+vb[0]+"."+vb[1]+"."+vb[2]);
         } else {
          if (va[2] != vb[2]){ //patch release
           chlog("ChatHelper: Version Patched from v"+va[0]+"."+va[1]+"."+va[2]+" to v"+vb[0]+"."+vb[1]+"."+vb[2]);
          }
         }
        }
       } else {
        //no version change
        localStorage.getItem('chatHelper');
       }
       saveObj = saveObjTmp;
      }
      contacts = saveObj.contacts;
      saveData();
     }catch(err){
      chlog(err);
     }
    }
    
    if (!localStorage.myContacts) {
     chlog("Deprecated contacts variable does not exist.",1);
     loadData();
    } else {
     //contacts = loadData();
     loadData();
     chlog("Contacts: " + contacts, 1);
    }
    
    function saveContact(fr) {
     chlog("Number of contacts == "+contacts.length,1);
     contacts.push(fr);
     chlog(fr + " added to contacts list.",1);
     saveData();
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
     var len = contacts.length;
     var a = contacts.sort(caseInsensitiveSort);
     if (len == 1) {
      alert(len + " Contact:\n\n" + a.join("\n") + "\n");
     } else if (len > 1) {
      alert(len + " Contacts:\n\n" + a.join("\n") + "\n");
     } else {
      var p = prompt("Your contacts list is empty.\n\nType a name here to add a contact:\n", "");
      if (p) {
       saveContact(p);
      }
     }
    }
    
    function deleteContact(fr) {
     if (fr === "all") {
      contacts = [];
      chlog("All contacts deleted",1);
      saveData();
     } else {
      var ind = contacts.indexOf(fr);
      if (ind > -1) {
       saveObj.contacts = contacts.splice(ind, 1);
       saveData();
       chlog(contacts,1);
       chlog(fr + " deleted from contacts list.");
      }
     }
    }
    function keyUpTimer(kEv) {
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
       chlog("keyUpTimer keyCode =="+kEv.keyCode,1);
       sub = inText.substr(9);
       if (!sub.match(/\s/)) {
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
      }, onkeyupDelay);
    }
    
    function delayedConfirm() {
     if (confirm("Add " + _sub + " to your contacts list?\n\nYou can see a list of your contacts by typing /list")) {
      saveContact(_sub);
     }
    }
    
    function autoTag(inputField, inText) {
     var isUrl = false;
     var lookBack;
     //the code here is mostly from Bruce Doan: http://userscripts.org/scripts/show/151965
     ////auto url
     inText = inText.replace(/(\[url\])*(https?:\/\/)([\da-z\.-]+)(\.[a-z]{2,6})([\/\w\.\-\=\?\&\%\+\|#:;,~\*\(\)\$]*)*\/?(\[\/url\])*/gi, function () {
       var result = new Array();
       var protocol = arguments[2].match(/https?:\/\//);
       for (var i in arguments){
        chlog("autoTag url reg arg "+i + "= " + arguments[i],1);
       }
       result.push('[url]');
       result.push(arguments[2]); // http[s]://
       result.push(arguments[3]); // domain
       result.push(arguments[4]); // ext
       result.push(arguments[5]); // query string
       result.push('[/url]');
       if (protocol === null){
        chlog("autotag url - no protocol",2);
       } else {
        isUrl = true;
        chlog("bypassing coords tagging\n detected protocol = " + protocol,2);
        
       }
       return result.join('');
      });
     ////auto coords
     if (!isUrl) {
      chlog("checking for coords",1);
      lookBack = inText.replace(/(\[coords\])?([#])?([0-9]{3,4})[:.]([0-9]{3,4})([:.]\w+)?(\[\/coords\])?/gi, function () {
        for (var i in arguments){
         chlog("autoTag coords reg arg " + i + " = " + arguments[i],1);
        }
        var hashBefore = arguments[2];
        chlog("hashBefore "+hashBefore,1);
        if (!hashBefore) {
         chlog("no hash returning");
         var result = new Array();
         result.push('[coords]');
         result.push(arguments[3]);
         result.push(':');
         result.push(arguments[4]);
         if (arguments[5] != undefined) {
          result.push(arguments[5].replace('.', ':'));
         }
         result.push('[/coords]');
         return result.join('');
        } else {
         return arguments[0];
        }
       });
      inText = lookBack;
      chlog("lookedback",1);
      chlog("LB string: "+lookBack,1);
     }
     // shorthand for player
     inText = inText.replace(/\[p\]([a-z0-9_\-\s]+)\[\/p\]/gi, '[player]$1[/player]');
     // shorthand for alliance
     inText = inText.replace(/\[a\]([a-z0-9_\-\s]+)\[\/a\]/gi, '[alliance]$1[/alliance]');
     
     return inText;
    }
    
    document.onkeydown = function (kEv) {
     kEv = kEv || window.event;
     
     /* Tab key
     if (kEv.keyCode == 9){
      chlog("Tab key pressed",1)
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
         setTimeout(delayedConfirm, 500);
        }
       } else if (contacts.indexOf(sub) == -1) {
        //no message to send, not in contacts, promt to add, clear input
        chlog("clearing input field",1);
        inputField.focus(); //?necessary?
        inputField.value = "";
        var cf = confirm("Add " + sub + " to your contacts list?\n\nYou can see a list of your contacts by typing /list");
        if (cf) {
         saveContact(sub);
         return false;
        } else {
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
       chlog("clearing input field",1);
       inputField.value = "";
       if ((contacts.indexOf(sub) > -1 || sub == "all") && confirm("Really delete " + sub + " from your contacts?")) {
        deleteContact(sub);
       } else {
        alert(sub + " is not in your contacts list.");
       }
       return false;
      }
      // show contacts list
      if (showContacts) {
       chlog("clearing input field",1);
       inputField.value = "";
       listContacts();
       return false;
       
      }
      // /chelp dialog
      if (inText.length === 6 && inText.match(/^(\/chelp)/) != null) {
       chlog("clearing input field",1);
       inputField.value = "";
       showHelp();
       return false;
      }
      
      if (inputField != null && inputField.type === "text" && inText !== "") {
       chlog("onEnter auto-tagging",1);
       
       inText = autoTag(inputField, inText); //auto-tag
       
       if (inText !== inputField.value) {
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
       chlog("charCode == "+cc,1);
       chlog("keyCode == "+kc,1);

       /* Alt+1 for auto Coordinates/Urls in message body */
       if (inputField.type === "textarea" && (cc === 49 || kc === 49)) {
        var pos = getCaretPos(inputField);
        chlog("attempting Alt+1 message auto-tag",1);
        if (inputField != null) {
         var st = inputField.scrollTop;
         
         inText = autoTag(inputField, inText); //auto-tag
         
         if (inText !== "" || inText !== inputField.value) {
          inputField.value = inText;
          inputField.scrollTop = st;
          moveCaret(inputField, 0);
         }
        }
       }
       /* Alt+2 for URLs fallback */
       if (cc === 50 || kc === 50) {
        if (inputField != null) {
         var url = prompt("Website (Syntax: google.com or www.google.com)", "");
         if (url != null) {
          inputField.value += '[url]' + url + '[/url]';
         }
        }
       }
       /* Alt+3 or Alt+p for players */
       if ((cc === 112 || kc === 80) || (cc === 51 || kc === 51)) {
        tagWith('[player]', inputField);
        if (window.chatHelper_suppressBrowserAltKeys)
         return false;
       }
       /* Alt+4 or Alt+a for alliances */
       if ((cc === 97 || kc === 65) || (cc === 52 || kc === 52)) {
        tagWith('[alliance]', inputField);
        if (window.chatHelper_suppressBrowserAltKeys)
         return false;
       }
       /* Alt+0 to clear tags */
       if (cc === 48 || kc === 48) {
        if (inputField.type === 'textarea')
         var st = inputField.scrollTop;
        if (inputField != null) {
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
        if (window.chatHelper_suppressBrowserAltKeys)
         return false;
       }
       /* Alt+i for italics */
       if (cc === 105 || kc === 73) {
        tagWith('[i]', inputField);
        if (window.chatHelper_suppressBrowserAltKeys)
         return false;
       }
       /* Alt+u for underline */
       if (cc === 117 || kc === 85) {
        tagWith('[u]', inputField);
        if (window.chatHelper_suppressBrowserAltKeys)
         return false;
       }
       /* Alt+s for strikethrough */
       if (cc === 115 || kc === 83) {
        tagWith('[s]', inputField);
        if (window.chatHelper_suppressBrowserAltKeys)
         return false;
       }
      }
     }
    }
   }
  } catch (err) {
   chlog("createchatHelper: "+ err,1);
   console.error(err);
  }
  
  function chatHelper_checkIfLoaded() {
   try {
    if (typeof qx !== 'undefined') {
     createchatHelper();
    } else {
     window.setTimeout(chatHelper_checkIfLoaded, 1333);
    }
   } catch (err) {
    console.log("chatHelper_checkIfLoaded: ", err);
   }
  }
  window.setTimeout(chatHelper_checkIfLoaded, 1333);
 };
 try {
  var chatHelper = document.createElement("script");
  chatHelper.innerHTML = "(" + chatHelper_main.toString() + ")();";
  chatHelper.type = "text/javascript";
  document.getElementsByTagName("head")[0].appendChild(chatHelper);
 } catch (err) {
  console.log("chatHelper: init error: ", err);
 }
})();

		elda_hasload(152177);
	} else {
		elda_hasnotload(152177);
	}
} catch (e) {
    GM_log(e);
	GM_log(e.name + " " + e.message);
}

/*
URL:		http://userscripts.org/scripts/source/137978.user.js
Id:		137978
Name:		CnC: MHTools Tiberium Alliances Available Loot Summary + Info
Version:	1.8.3

*/
try {

	elda_addon_info[137978] = {
		id: 137978,
		name: "CnC: MHTools Tiberium Alliances Available Loot Summary + Info",
		version: "1.8.3",
		date: "",
		can_disabled: true,
		loaded: false
	};

	if(elda_hastoload(137978)) {

 

(function () {
  var MHLootMain = function () {    
    function MHToolsLootCreate() {        
      //console.log('MHToolsLootCreate');
      // Classes
      //=======================================================      
      //Extending webfrontend.gui.options.OptionsPage with new ManagementOptionsPage
      function OptionsPage() {
        try {
          qx.Class.define("MHTools.OptionsPage", {
            type: 'singleton',
            extend: webfrontend.gui.options.OptionsPage,
            construct: function() {
              console.log('Create MHTools.OptionsPage at Loot+Info');
              this.base(arguments);
              this.setLabel('MHTools');
              
              this.extendOptionsWindow();
              
              //Add Content
              var container = this.getContentContainer(); 
              this.tabView = new qx.ui.tabview.TabView();
              container.add(this.tabView);//, {left:40, top:40});
              
              this.removeButtons();
              this.addPageAbout();
              console.log('MHTools: OptionsPage loaded.'); 
            },
            statics: {
              VERSION: '1.0.0',
              AUTHOR: 'MrHIDEn',
              CLASS: 'OptionsPage'
            },
            members: {
              pageCreated: null,
              tabView: null,
              getTabView: function() {
                return this.tabView;
              },
              addPage: function(name) {
                var c = this.tabView.getChildren();
                this.tabView.remove(c[c.length-1]);//remove PageAbout
                var page = new qx.ui.tabview.Page(name);
                page.set({height:220});
                this.tabView.add(page);
                this.addPageAbout();
                return page;
              },
              addPageAbout: function() {
                var page = new qx.ui.tabview.Page("About");
                page.set({height:220});
                this.tabView.add(page);
                page.setLayout(new qx.ui.layout.VBox());
                page.add(new qx.ui.basic.Label("<b>MHTools</b>").set({rich: true}));//, textColor: red
                page.add(new qx.ui.basic.Label("Created: <span style='color:blue'>2012</span>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("Author: <span style='color:blue'><b>MrHIDEn</b></span>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("Email: <a href='mailto:mrhiden@outlook.com'>mrhiden@outlook.com</a>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("Public: <a href='https://userscripts.org/users/471241'>userscripts.org - MrHIDEn</a></br> ").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("<b>Scripts:</b>").set({rich: true,marginTop:5}));
                page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/137978'>Aviable Loot +Info</a>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/135806'>Shortcuts +Coords</a>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("<b>Shorten Scripts:</b>").set({rich: true,marginTop:5}));
                page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/136743'>Coords 500:500</a>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/145657'>Pure Loot summary</a>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/137955'>Login x9 + Logout</a>").set({rich: true,marginLeft:10}));
              },
              removeButtons: function() {
                this.getChildren()[2].removeAll();
              },
              getContentContainer: function() {
                  if(!this.contentCnt) {
                      this.contentCnt = this.getChildren()[0].getChildren()[0];
                  }
                  return this.contentCnt;
              },
              extendOptionsWindow: function() {
                var self = this;
                if(!webfrontend.gui.options.OptionsWidget.prototype.baseShow) {
                  webfrontend.gui.options.OptionsWidget.prototype.baseShow = webfrontend.gui.options.OptionsWidget.prototype.show;
                }
                webfrontend.gui.options.OptionsWidget.prototype.show = function() {
                  try {
                    var tabView = this.clientArea.getChildren()[0];
                    tabView.add(self);
                    webfrontend.gui.options.OptionsWidget.prototype.show = webfrontend.gui.options.OptionsWidget.prototype.baseShow;
                    self.pageCreated = true;
                    this.show();
                  } catch (e) {            
                    console.warn("MHTools.OptionsPage.extendOptionsWindow: ", e);
                  }
                };
              }
            }
          });
        } catch (e) {
          console.warn("qx.Class.define(MHTools.OptionsPage: ", e);      
        }
      }
      //=======================================================  
      try {
        qx.Class.define("MHTools.Loot", {
          type: 'singleton',
          extend: qx.core.Object,
          construct: function() {         
            console.log('Create MHTools.Loot');
            this.stats.src = 'https://goo.gl/81xZN';//1.8.0
            //this.base(arguments);
            for(var k in this.resPaths) {
              this.resImages.push(new qx.ui.basic.Image("webfrontend/ui/common/"+this.resPaths[k]).set({Scale:true,Width:16,Height:16}));
            }
            for(var k in this.troopPaths) {
              this.troopImages.push(new qx.ui.basic.Image("https://eaassets-a.akamaihd.net/cncalliancesgame/cdn/data/"+this.troopPaths[k]).set({Scale:true,Width:16,Height:16}));
            }
            //this.reloadList();
            this.lootList.reloadList();
            //console.log(this.lootList);
            // extend
            this.extendOwnBase();   
            this.extendAllianceBase();
            this.extendForgottenCamp();
            this.extendForgottenBase();
            this.extendPlayerBase();
            //this.extendOptionsWindow();
            this.extendPOI();
            this.extendHUB();
            this.extendHUBServer();
            this.extendRUIN();
            this.extendSelectionChange();
            this.addLootPage();
            //bypass
            this.loadBypass();
            //rdy
            console.log('MHTools: Loot+Info loaded.'); 
          },
          statics : {
            VERSION: '1.8.3',
            AUTHOR: 'MrHIDEn',
            CLASS: 'Loot',
            DATA: this.Data
          },
          properties: {
          },
          members : {
            // setttings
            settings: {
              showLoot:                {v:true,  d:true,  l:'Shows Loot resources info'},
              showTroops:              {v:false, d:false, l:'Shows overall Hitpoints for Troops'},
              showTroopsExtra:         {v:false, d:false, l:'Shows Troops Hitpoints for Vehicles/Aircrafts/Infantry'},
              showInfo:                {v:true,  d:true,  l:'Shows HP/HC/DF/CY info'},
              showColumnCondition:     {v:false, d:false, l:'Shows your progress against DF/CY'},
              showRepairTime:          {v:true,  d:true,  l:'Shows Repair Times info for Enemy Base/Camp/Outpost'},
              showAllyRepairTimeInfo:  {v:true,  d:true,  l:'Shows Ally/Your Repair Times info'},
              showLevels:              {v:true,  d:true,  l:'Shows Levels of Base/Defence/Offence info'},
              showColumnLetter:        {v:false, d:false, l:'Shows columns letters for DF/CY position Ex A-1 or E-4. If \'false\' shows only 1 or 4'},
              showDistance:            {v:true,  d:true,  l:'Shows distance from selected base to the selected object'}
            },
            // pictures
            stats: document.createElement('img'),
            resPaths: [
              "icn_res_research_mission.png",
              "icn_res_tiberium.png",
              "icn_res_chrystal.png",
              "icn_res_dollar.png"
            ],
            resImages: [],
            troopPaths: [
              "d8d4e71d9de051135a7f5baf1f799d77.png",//inf
              "af8d7527e441e1721ee8953d73287e9e.png",//veh
              "5f889719f06aad76f06d51863f8eb524.png",//stu
              "6962b667bd797fc2e9e74267e1b3e7c3.png" //air
            ],
            troopImages: [],
            
            // store v2 - compact
            //UNDERCONSTRUCTION
            lootList: {
              list: {
                l: [],
                max: 50,//na
                idx: 0,//na
              },
              storeName: 'MHToolsLootList2',
              getIndex: function() {//in use
                var res = -1;
                try {
                  var l = this.list.l;
                  var id = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                  for(i=0;i<this.list.max;i++) {
                    if(typeof(l[i])=='undefined') continue;
                    if(l[i]===null) continue;
                    if(l[i].id == id) {
                      res = i;
                      break;
                    }
                  }
                } catch (e) {
                  console.warn("save: ", e);
                }
                return res;
              },
              reloadList: function() {//in use
                var S = ClientLib.Base.LocalStorage;
                var l;
                if (S.get_IsSupported()) l = S.GetItem(this.storeName);
                if(l!==null) this.list = l;
                console.log('MHTools: LootList reloaded/created');
              },
              save: function(d) {//in use
                try {
                  var l = this.list.l;
                  var id = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                  var c = {id:id, Data:d};
                  var S = ClientLib.Base.LocalStorage;
                  for(var i=0;i<this.list.max;i++) {
                    if(typeof(l[i])=='undefined') continue;
                    if(l[i]===null) continue;
                    if(l[i].id == id) 
                    {
                      // found
                      l[i] = c;
                      // JSON
                      if (S.get_IsSupported()) S.SetItem(this.storeName, this.list);
                      // done
                      return;
                    }
                  }
                  // new
                  l[this.list.idx] = c;
                  if(++this.list.idx >= this.list.max) this.list.idx = 0;
                  // JSON
                  if (S.get_IsSupported()) S.SetItem(this.storeName, this.list);   
                } catch (e) {
                  console.warn("save: ", e);
                }
              },
              load: function() {//in use
                try {
                  var id = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                  var i = this.getIndex();
                  if(i>=0) return this.list.l[i];
                  return {id:id,Data:{}};     
                } catch (e) {
                  console.warn("load: ", e);
                }
              },
              store: function(k, d) {//in use
                try {
                  var mem = this.load().Data;
                  mem[k] = d;
                  this.save(mem);        
                } catch (e) {
                  console.warn("store: ", e);
                }
              },
              restore: function(k) {//?? not in use
                console.log('this.lootList.restore');
                try {
                  var mem = this.load().Data;
                  if(typeof(mem[k])=='undefined') return 'undefined';
                  return mem[k];    
                } catch (e) {
                  console.warn("restore: ", e);
                }
              }              
            },
            // store   
            /*         
            // list: [],
            // listStoreName: 'MHToolsLootList',
            // reloadList: function() {
              // var S = ClientLib.Base.LocalStorage;
              // var l;
              // if (S.get_IsSupported()) l = S.GetItem(this.listStoreName);
              // if(l!==null) this.list = l;
              // this.list.max = 50;
              // this.list.idx = 0;
              // for(var i=0;i<this.list.max;i++) {
                // this.list.idx = i;
                // if(typeof(this.list[i])=='undefined') break;
              // }
              // console.log('MHTools: LootList reloaded/created');
            // },
            // getIndex: function() {
              // var l = this.list;
              // var id = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
              // //console.log('getIndex id=',id);
              // for(i=0;i<this.list.max;i++) {
                // if(typeof(l[i])=='undefined') continue;
                // if(l[i]===null) continue;
                // if(l[i].id == id) return i;
              // }
              // return -1;
            // },
            // save: function(d) {
            // //TODO some problems with refreshing
              // try {
                // var l = this.list;
                // var id = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                // var c = {id:id, Data:d};
                // var S = ClientLib.Base.LocalStorage;
                // for(var i=0;i<l.max;i++) {
                  // if(typeof(l[i])=='undefined') continue;
                  // if(l[i]===null) continue;
                  // if(l[i].id == id) 
                  // {
                    // // found
                    // l[i] = c;
                    // // JSON
                    // if (S.get_IsSupported()) S.SetItem(this.listStoreName, l);
                    // // done
                    // return;
                  // }
                // }
                // // new
                // l[l.idx] = c;
                // if(++l.idx >= l.max) l.idx = 0;
                // // JSON
                // if (S.get_IsSupported()) S.SetItem(this.listStoreName, l);   
              // } catch (e) {
                // console.warn("save: ", e);
              // }
            // },
            // load: function() {
              // try {
                // var l = this.list;
                // var id = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                // for(var i=0;i<l.max;i++) {
                  // if(typeof(l[i])=='undefined') continue;
                  // if(l[i]===null) continue;
                  // if(l[i].id == id) return l[i];
                // }
                // return {id:id,Data:{}};     
              // } catch (e) {
                // console.warn("load: ", e);
              // }
            // },
            // store: function(k, d) {
              // try {
                // var mem = this.load().Data;
                // mem[k] = d;
                // this.save(mem);        
              // } catch (e) {
                // console.warn("store: ", e);
              // }
            // },
            // restore: function(k) {//?? not in use
              // try {
                // var mem = this.load().Data;
                // if(typeof(mem[k])=='undefined') return 'undefined';
                // return mem[k];    
              // } catch (e) {
                // console.warn("restore: ", e);
              // }
            // },
            */
            // bases
            Data: {},
            // display containers
            lootWindowPlayer: null,
            lootWindowBase: null,
            lootWindowCamp: null,
            lootWindowOwn: null,
            lootWindowAlly: null,
            lootWindowPOI: null,
            lootWindowRUIN: null,
            lootWindowHUBServer: null,
            //waiting: [1,'','.','..','...','...?'],          
            waiting: [1,'>-','->','--','-<','<-','??'],          
            Display: {
              troopsArray: [],
              lootArray: [],
              iconArrays: [],
              infoArrays: [],
              twoLineInfoArrays: [],
              distanceArray: []
            },
            // HELPERS
            kMG: function(v) {
              var t = [ '', 'k', 'M', 'G', 'T', 'P' ];
              var i = 0;
              while (v > 1000 && i < t.length) {
                v = (v / 1000).toFixed(1);
                i++;
              }
              return v.toString().replace('.',',') + t[i];
            },
            numberFormat: function(val,fixed) {
              return val.toFixed(fixed).replace('.',',');
            },
            hms: function(s) {
              var h = Math.floor(s/3600); s%=3600;
              var m = Math.floor(s/60); s%=60;
              var r = (h<10?"0"+h.toString():h.toString()) + ":";
              r += (m<10?"0"+m.toString():m.toString()) + ":";
              s = s.toFixed(0);
              r += (s<10?"0"+s.toString():s.toString());
              return r;
            },
            dhms: function(s) {
              var d = Math.floor(s/86400); s%=86400;
              var h = Math.floor(s/3600); s%=3600;
              var m = Math.floor(s/60); s%=60;
              var r = (d<1?"":d.toString() + ":");
              r += (h<10?"0"+h.toString():h.toString()) + ":";
              r += (m<10?"0"+m.toString():m.toString()) + ":";
              s = s.toFixed(0);
              r += (s<10?"0"+s.toString():s.toString());
              return r;
            },
            dhms2: function(s) {
              var d = Math.floor(s/86400); s%=86400;
              var h = Math.floor(s/3600); s%=3600;
              var m = Math.floor(s/60); s%=60;
              var r = (d<1?"":d.toString() + "d ");//  3:01:23:45
              r += (h<10?"0"+h.toString():h.toString()) + ":";
              r += (m<10?"0"+m.toString():m.toString()) + ":";
              s = s.toFixed(0);
              r += (s<10?"0"+s.toString():s.toString()) + "";
              return r;
            },
            hmsRT: function(city, type) {
              var nextLevelFlag = false;
              var s = city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(type, nextLevelFlag);
              var h = Math.floor(s/3600); s%=3600;
              var m = Math.floor(s/60); s%=60;
              var r = (h<10?"0"+h.toString():h.toString()) + ":";
              r += (m<10?"0"+m.toString():m.toString()) + ":";
              r += (s<10?"0"+s.toString():s.toString());
              return r;
            },
            // BYPASS
            getBypass: function(c,d) {
              try {
                function getKeys(obj, d) {
                  for (var k in obj) {
                    var o = obj[k];
                    if (o === null) continue;
                    if (typeof(o.c) == 'undefined') continue;//count
                    if (o.c === 0) continue;//empty
                    if (typeof(o.d) == 'undefined') continue;//data {}
                    var ks = Object.keys(o.d);
                    if (ks.length != o.c) continue;
                    var u = o.d[ks[0]];
                    if(typeof(u) != 'object') continue;                  
                    if(typeof(u.get_UnitLevelRepairRequirements) != 'function') continue;
                    if(typeof(u.GetUnitGroupType) ==  'undefined') {
                      // buildings
                      d.Keys.Buildings = k;
                      //c.GetNumBuildings.toString()==return this.XUQAIB.YYZSYN().c; //YYZSYN()==return this.GBZDQJ; //==this.XUQAIB.GBZDQJ.c
                    } else {
                      // units 3-attack
                      if(u.GetUnitGroupType()) {
                        d.Keys.Offences = k;
                      } else {
                        // units 0-defend
                        d.Keys.Defences = k;
                      }
                    }
                  }
                  if(typeof(d.Keys.Buildings)!='undefined') {
                    //ClientLib.Data.CityBuildings.prototype.kBuildings = d.Keys.Buildings;
                    //ClientLib.Data.CityBuildings.prototype.get_Buildings = function(){return this[this.kBuildings];};
                    ClientLib.Data.City.prototype.kBuildings = d.Keys.Buildings;
                    ClientLib.Data.City.prototype.get_Buildings = function(){return this.get_CityBuildingsData()[this.kBuildings];};
                  }
                  if(typeof(d.Keys.Offences)!='undefined') {
                    //ClientLib.Data.CityUnits.prototype.kOffenseUnits = d.Keys.Offences;
                    //ClientLib.Data.CityUnits.prototype.get_OffenseUnits = function(){return this[this.kOffenseUnits];};
                    ClientLib.Data.City.prototype.kOffenseUnits = d.Keys.Offences;
                    ClientLib.Data.City.prototype.get_OffenseUnits = function(){return this.get_CityUnitsData()[this.kOffenseUnits];};
                  }
                  if(typeof(d.Keys.Defences)!='undefined') {
                    //ClientLib.Data.CityUnits.prototype.kDefenseUnits = d.Keys.Defences;
                    //ClientLib.Data.CityUnits.prototype.get_DefenseUnits = function(){return this[this.kDefenseUnits];};
                    ClientLib.Data.City.prototype.kDefenseUnits = d.Keys.Defences;
                    ClientLib.Data.City.prototype.get_DefenseUnits = function(){return this.get_CityUnitsData()[this.kDefenseUnits];};
                  }
                }
                if(typeof(d.Keys)=='undefined') d.Keys={};
                getKeys(c.get_CityBuildingsData(), d);
                getKeys(c.get_CityUnitsData(), d);
                var cnt=Object.keys(d.Keys).length;
                if(cnt==3) {
                  //console.log('MHTools.Loot Helpers are ready');
                  //console.log('MHTools.Loot Helpers are ready:',d.Keys.Buildings,d.Keys.Defences,d.Keys.Offences);
                  console.log('MHTools.Loot Helpers are ready:');
                  console.log(d.Keys);
                  delete d.Keys;
                  this.getBypass = function(){return true;};
                  return true;
                }
                else console.log('#Keys(!=3): ',cnt);
              } catch (e) {
                console.warn("MHTools.Loot.",arguments.callee.name,': ', e);
              }
              //return d.Bypass.Rdy;
              return false;
            },
            loadBypass: function(self) {
              try {                
                if(typeof(self)=='undefined') self = this;
                var ac=ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
                if(Object.keys(ac).length<1) {
                  window.setTimeout(self.loadBypass, 5000, self); // check again
                  return;
                }
                for(k in ac) if(self.getBypass(ac[k],self.Data)) break;
              } catch (e) {
                console.warn("MHTools.Loot.",arguments.callee.name,': ', e);
              }
            },
            getData: function(city) {
              try {   
                var l = {};  
                if(!this.getBypass(city,this.Data)) return l;
                
                l.Buildings = city.get_Buildings();
                l.Defences = city.get_DefenseUnits();
                l.Offences = city.get_OffenseUnits();
                
                l.rdy = true;              
              } catch (e) {
                console.warn("MHTools.Loot.",arguments.callee.name,': ', e);
              }               
              return l;
            },
            loadBase: function() {
                try {
                  if (typeof(this.Data.lastSelectedBaseId)=='undefined') this.Data.lastSelectedBaseId = -1;//, Bypass: {}};
                  
                  var d = this.Data;         
                              
                  d.selectedBaseId = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                  d.selectedOwnBaseId = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();
                  
                  if (d.lastSelectedBaseId !== d.selectedBaseId) d.loaded = false;
                  d.lastSelectedBaseId = d.selectedBaseId;  
                  
                  d.IsOwnBase = d.selectedBaseId === d.selectedOwnBaseId;
                              
                  d.cc = ClientLib.Data.MainData.GetInstance().get_Cities();
                  
                  //d.ec = d.cc.GetCity(d.selectedBaseId);// this is very nice function
                  d.ec = d.cc.get_CurrentCity();
                  if(d.ec === null) return false;
                  if(d.ec.get_CityBuildingsData() === null) return false;         
                  if(d.ec.get_CityUnitsData() === null) return false;         
                  
                  d.oc = d.cc.get_CurrentOwnCity();            
                  if(d.oc === null) return false;
                  if(d.oc.get_CityBuildingsData() === null) return false;
                  if(d.oc.get_CityUnitsData() === null) return false;
                  
                  d.ol = this.getData(d.oc);
                  d.el = this.getData(d.ec);// Buildings Defence Offence               
                  if(typeof(d.ol)=='undefined') return false;
                  if(typeof(d.el)=='undefined') return false;

                  if(d.el.Buildings.c === 0) return false;
                  if(d.ol.Buildings.c === 0) return false;
                  
                  //TEST
                  //console.log('loadBase.el:',d.el);
                  //console.log('loadBase.ol:',d.ol);
                  
                  d.loaded = true;
                  return true;
              } catch (e) {
                console.warn("MHTools.Loot.",arguments.callee.name,': ', e);
                console.dir("MHTools.Loot.Data: ",this.Data);
                return false;
              }
            },
            getImportants: function(list) {         
              list.Support = {Condition: '-',Row: '-',Column: '-'};
              list.CY = {Condition: '-',Row: '-',Column: '-'};
              list.DF = {Condition: '-',Row: '-',Column: '-'};
              if(!this.settings.showInfo.v) return;
              for (var j in list.Buildings.d) {
                var building = list.Buildings.d[j];
                var mod = building.get_HitpointsPercent();
                var id = building.get_MdbUnitId();
                if(id >= 200 && id <= 205) {
                  list.Support.Condition = 100*mod;
                  list.Support.Row = 8-parseInt(building.get_CoordY());
                  list.Support.Column = building.get_CoordX();
                } 
                else {
                  switch (id) {
                    case 112: // CONSTRUCTION YARD
                    case 151:
                    case 177:
                      list.CY.Condition = 100*mod;
                      list.CY.Row = 8-parseInt(building.get_CoordY());
                      list.CY.Column = building.get_CoordX();
                      break;
                    case 158: // DEFENSE FACILITY
                    case 131:
                    case 195:
                      list.DF.Condition = 100*mod;
                      list.DF.Row = 8-parseInt(building.get_CoordY());
                      list.DF.Column = building.get_CoordX();
                      break;
                    default:
                      break;
                  }
                }
              }
            },
            getLoots: function (ul,r) { 
              if(typeof(r)=='undefined') r={}; 
              //console.log('r',r);
              var t={1:'T',2:'C',3:'G',6:'RP',7:'RCB',8:'RCA',9:'RCI',10:'RCV'};//translate, ClientLib.Base.EResourceType.XXX
              for (var j in ul.d) {
                var u = ul.d[j];// unit/building
                //here are key infos about units ranges and behavior and more 
                //console.log(u.get_UnitGameData_Obj().n,u.get_UnitGameData_Obj());// unit/building
                var p = u.get_HitpointsPercent();// 0-1 , 1 means 100%               
                var cl = u.get_UnitLevelRepairRequirements();// EA API Resources/Repair Costs                
                for (var i in cl) {
                  var c = cl[i];//Requirement/Cost
                  if(typeof(c)!='object') continue;                
                  var k = (typeof(t[c.Type])=='undefined')?c.Type:t[c.Type];//translate if possible
                  if(typeof(r[k])=='undefined') r[k] = 0;//add branch
                  r[k] += p * c.Count;                 
                }
              }
              return r;
            },
            calcResources: function () {
              try {          
                if (!this.settings.showLoot.v) return;

                if (!this.Data.loaded) return;
                
                this.Display.lootArray = [];            
                
                var el = this.Data.el;
                var ec = this.Data.ec;
                
                var loots = {RP:0, T:0, C:0, G:0};//for getLoots
                
                this.getLoots(el.Buildings,loots);
                this.getLoots(el.Defences,loots);
                
                if(el.Offences.c>0) {
                  var off = this.getLoots(el.Offences);                  
                  //console.log('Offences: ',off);
                }
                
                this.Display.lootArray[0] = loots.RP;
                this.Display.lootArray[1] = loots.T;
                this.Display.lootArray[2] = loots.C;
                this.Display.lootArray[3] = loots.G;
                            
                this.lootList.store('lootArray',this.Display.lootArray);
              } catch (e) {
                console.warn("MHTools.Loot.calcResources: ", e);
                console.dir("MHTools.Loot.~.Data:",this.Data);
              }
            },
            calcTroops: function () {
              try {
                if (!this.settings.showTroops.v) return;            

                if (!this.Data.loaded) return;            
                
                var troops = [0, 0, 0, 0, 0]; 
                
                var el = this.Data.el; 
                  
                // enemy defence units
                for (var j in el.Defences.d) {
                  var unit = el.Defences.d[j];
                  var current_hp = unit.get_Health();//EA API
                  troops[0] += current_hp;
                  if (this.settings.showTroopsExtra.v) {
                    switch (unit.get_UnitGameData_Obj().mt) {//keyTroop // TODO check .mt
                      case ClientLib.Base.EUnitMovementType.Feet:
                        troops[1] += current_hp;
                        break;
                      case ClientLib.Base.EUnitMovementType.Track:
                      case ClientLib.Base.EUnitMovementType.Wheel:
                        troops[2] += current_hp;
                        break;
                      case ClientLib.Base.EUnitMovementType.Structure:
                        troops[3] += current_hp;
                        break;
                      case ClientLib.Base.EUnitMovementType.Air:
                      case ClientLib.Base.EUnitMovementType.Air2:
                        troops[4] += current_hp;
                        break;
                    }
                  }
                }
                this.Display.troopsArray = troops;
                this.lootList.store('troopsArray',this.Display.troopsArray);
              } catch (e) {
                console.warn("MHTools.Loot.calcTroops: ", e);
                console.dir("MHTools.Loot.~.Data:",this.Data);
              }
            },
            calcInfo: function () { 
              this.Display.infoArrays = [];
              this.Display.twoLineInfoArrays = [];
              
              if (!this.Data.loaded) return;
              
              var hp;
              var t;         
              
              //var cc = this.Data.cc;
              var oc = this.Data.oc;
              var ec = this.Data.ec; 
              
              var ol = this.Data.ol;
              var el = this.Data.el; 
              
              if(this.settings.showInfo.v) { 
                try {                   
                  var ohp=0, dhp=0;
                  for (var k in ol.Offences.d) ohp += ol.Offences.d[k].get_Health();//own of units
                  for (var k in el.Defences.d) dhp += el.Defences.d[k].get_Health();//ene df units
                                  
                  // find CY & DF row/line
                  this.getImportants(el);
                  
                  hp = {};
                  hp.name = '<b>Info</b> (HP,HC - D/O ratio. Row.)';
                  hp.lbs = ['HP:','HC:','DF:','CY:'];
                  t = [];
                  t.push(this.numberFormat(dhp/ohp, 2));
                  t.push(this.numberFormat(ec.get_TotalDefenseHeadCount()/oc.get_TotalOffenseHeadCount(), 2));
                  var abc = "ABCDEFGHI";//abc[column]
                  if(this.settings.showColumnLetter.v) {
                    if(el.DF !== undefined) {t.push(abc[el.DF.Column]+ '-' + el.DF.Row);} else { t.push('??');}  
                    if(el.CY !== undefined) {t.push(abc[el.CY.Column]+ '-' + el.CY.Row);} else { t.push('??');}  
                  } else {
                    if(el.DF !== undefined) {t.push(el.DF.Row);} else { t.push('??');}  
                    if(el.CY !== undefined) {t.push(el.CY.Row);} else { t.push('??');}   
                  }                
                  hp.val = t;
                  this.Display.infoArrays.push(hp);
                  // store
                  this.lootList.store('infoArrays',this.Display.infoArrays);                           
                } catch (e) {
                  console.log("MHTools.Loot.calcInfo 1: ", e);
                }
              }            
              if(this.settings.showColumnCondition.v) { 
                try {   
                  var bl = el.Buildings.d;
                  var dl = el.Defences.d;
                  
                  for(var k in bl) {
                    var b = bl[k];
                    if(b.get_TechName() == ClientLib.Base.ETechName.Defense_Facility) df = b;
                    if(b.get_TechName() == ClientLib.Base.ETechName.Construction_Yard) cy = b;
                  }

                  var tb;
                  var tbhp;
                  var cnt;
                  var mi;
                  var ma;
                  var dc;
                  
                  // CY
                  tb = cy;
                  cnt = 0;
                  tbhp = 0;
                  dc = 1;
                  mi = tb.get_CoordX() - dc;
                  ma = tb.get_CoordX() + dc;
                  // scan
                  for(var k in bl) {
                    var o = bl[k];  
                    if(o.get_CoordX() >= mi && o.get_CoordX() <= ma) {
                      if(o.get_CoordY() >= tb.get_CoordY()) {
                        cnt++;
                        tbhp += o.get_HitpointsPercent();
                      }
                    }
                  }
                  for(var k in dl) {
                    var o = dl[k];  
                    //if(o.get_CoordX() == tb.get_CoordX()) {
                    if(o.get_CoordX() >= mi && o.get_CoordX() <= ma) {
                      if(o.get_CoordY() >= tb.get_CoordY()) {
                        cnt++;
                        tbhp += o.get_HitpointsPercent();
                      }
                    }
                  }
                  tbhp = 100 * tbhp / cnt;
                  var cyhp = tbhp;

                  // DF
                  tb = df;
                  cnt = 0;
                  tbhp = 0;
                  dc = 1;
                  mi = tb.get_CoordX() - dc;
                  ma = tb.get_CoordX() + dc;
                  for(var k in bl) {
                    var o = bl[k];  
                    if(o.get_CoordX() >= mi && o.get_CoordX() <= ma) {
                      if(o.get_CoordY() >= tb.get_CoordY()) {
                        cnt++;
                        tbhp += o.get_HitpointsPercent();
                      }
                    }
                  }
                  for(var k in dl) {
                    var o = dl[k];  
                    if(o.get_CoordX() >= mi && o.get_CoordX() <= ma) {
                      if(o.get_CoordY() >= tb.get_CoordY()) {
                        cnt++;
                        tbhp += o.get_HitpointsPercent();
                      }
                    }
                  }
                  tbhp = 100 * tbhp / cnt;
                  var dfhp = tbhp;               
                  
                  hp = {};
                  hp.name = '<b>CY & DF column HP [%]</b>';
                  hp.lbs = ['CY:','DF:'];
                  t = [];
                  t.push(this.numberFormat(cyhp, 0));
                  t.push(this.numberFormat(dfhp, 0));        
                  hp.val = t;
                  this.Display.infoArrays.push(hp);
                  //this.Display.twoLineInfoArrays.push(hp);
                  // store
                  this.lootList.store('infoArrays',this.Display.infoArrays);                       
                } catch (e) {
                  console.log("MHTools.Loot.calcInfo 2: ", e);
                }
              }
              if(this.settings.showRepairTime.v) { 
                try {                 
                  var a = oc.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);//false // RT Defense
                  var v = oc.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);//false // RT Defense
                  var i = oc.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);//false // RT Defense
                  var m = Math.max(a,v,i);
                  
                  var aa = oc.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir);
                  var av = oc.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh);
                  var ai = oc.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf);                
                  var am = Math.min(aa,av,ai);
                  
                  var ohp=0;
                  //CHECK
                  //my
                  //for (var k in ol.Offences.d) ohp += ol.Offences.d[k].get_HitpointsPercent();//0-1 means 0-100%
                  //ohp = 100.0 * ohp / ol.Offences.c;
                  //console.log('Health',ohp,oc.GetOffenseConditionInPercent());
                  //ohp = this.numberFormat(ohp, 0);
                  //ea
                  ohp = oc.GetOffenseConditionInPercent();
                  
                  var ool = this.numberFormat(oc.get_LvlOffense(), 1);
                  //console.log('oc',oc,'oc.get_LvlOffense()',oc.get_LvlOffense());
                  
                  hp = {};
                  hp.name = '<b>Repair time (Your offence)</b>';
                  hp.lbs = ['Maximum:','Available:','Health:','Level:'];
                  t = [];
                  t.push(this.hms(m)); 
                  t.push(this.hms(am));
                  t.push(ohp);
                  t.push(ool);                 
                  hp.val = t;
                  //this.Display.infoArrays.push(hp);
                  this.Display.twoLineInfoArrays.push(hp);              
                  // store
                  this.lootList.store('twoLineInfoArrays',this.Display.twoLineInfoArrays);                       
                } catch (e) {
                  console.log("MHTools.Loot.calcInfo 3: ", e);
                }
              }
            },
            calcFriendlyInfo: function() {
              this.Display.twoLineInfoArrays = [];
              if(!this.settings.showLevels.v && !this.settings.showAllyRepairTimeInfo.v) return;
                          
              try { 
                if (!this.Data.loaded) return;            
                
                
                //var cc = this.Data.cc;
                var oc = this.Data.oc;
                var ec = this.Data.ec;
                
                var ol = this.Data.ol;
                var el = this.Data.el;            
                
                var IsOwn = this.Data.IsOwnBase;
                
                
                
                if(this.settings.showLevels.v) { 
                  var sd = ec.get_SupportData();
                  var sn;
                  var sl;
                  if(sd !== null) {
                    sl = sd.get_Level();
                    sn = ec.get_SupportWeapon().dn; 
                  }
                
                  hp = {};
                  hp.name = '<b>Levels</b>';
                  hp.lbs = ['Base:','Defence:','Offence:','Support:'];
                  t = [];
                  if(el.Buildings.c>0) t.push(this.numberFormat(ec.get_LvlBase(), 1)); else t.push('--');  
                  if(el.Defences.c>0) t.push(this.numberFormat(ec.get_LvlDefense(), 1)); else t.push('--');  
                  if(el.Offences.c>0) t.push(this.numberFormat(ec.get_LvlOffense(), 1)); else t.push('--'); 
                  if(sd !== null) t.push(this.numberFormat(sl, 1)); else t.push('--'); 
                  hp.val = t;
                  this.Display.twoLineInfoArrays.push(hp);
                }
              
                if(this.settings.showAllyRepairTimeInfo.v) {
                  
                  var a = ec.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);//false // RT Defense
                  var v = ec.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);//false // RT Defense
                  var i = ec.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);//false // RT Defense
                  var m = Math.max(a,v,i);
                  
                  var aa = ec.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir);
                  var av = ec.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh);
                  var ai = ec.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf);                
                  var am = Math.min(aa,av,ai);
                  
                  var ofl;              
                  var ohp=0;
                  if(el.Offences.c>0) {
                    //my
                    //for (var k in el.Offences.d) ohp += el.Offences.d[k].get_HitpointsPercent();//get_Health();//Health - hitpoints
                    //ohp = 100.0 * ohp / el.Offences.c;
                    //console.log('Health',ohp,ec.GetOffenseConditionInPercent());
                    //ohp = this.numberFormat(ohp, 0);
                    //ea
                    ohp = ec.GetOffenseConditionInPercent();
                    //ohp = ec.GetOffenseConditionInPercent();//GetOffenseConditionInPercent ()
                    ofl = this.numberFormat(ec.get_LvlOffense(), 1);
                    //console.log('ec',ec,'ec.get_LvlOffense()',ec.get_LvlOffense());
                  } else {
                    ohp = '---';
                    ofl = '---';
                  }
                  
                  hp = {};
                  hp.name = IsOwn?'<b>Repair time (Your offence)</b>':'<b>Repair time (Ally offence)</b>';
                  hp.lbs = ['Maximum:','Available:','Health:','Level:'];
                  t = [];
                  t.push(this.hms(m)); 
                  //t.push('---');
                  t.push(this.hms(am));
                  t.push(ohp); 
                  t.push(ofl);       
                  hp.val = t;
                  this.Display.twoLineInfoArrays.push(hp);
                } 
                //this.Display.twoLineInfoArrays = twoLineInfoArrays;
                this.lootList.store('twoLineInfoArrays',this.Display.twoLineInfoArrays); 
              } catch (e) {
                console.warn("MHTools.Loot.calcFriendlyInfo: ", e);
              }
            },
            calcDistance: function () {
              this.Display.distanceArray = [];
              
              if(!this.settings.showDistance.v) return;
              //console.log('calcDistance');              
              try {                
                var visObject = ClientLib.Vis.VisMain.GetInstance().get_SelectedObject();
                if (visObject != null)// && visObject.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.RegionCityType)
                {
                  //if (this.Data === null) this.Data = {};
                  var t = visObject.get_VisObjectType();
                  
                  var LObjectType = [];
                  for(k in ClientLib.Vis.VisObject.EObjectType) 
                    LObjectType[ClientLib.Vis.VisObject.EObjectType[k]] = k;
                  //console.log('Vis Object Type:',t,', ',LObjectType[t]);                  

                  var oc = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                  switch (t) {    
                    /* RegionCityType
                    RegionSuperWeaponType
                    RegionTerrainType
                    RegionMoveTarget
                    RegionFreeSlotType
                    RegionNPCBase
                    RegionNPCCamp
                    RegionPointOfInterest
                    RegionRuin
                    RegionGhostCity
                    RegionNewPlayerSpot
                    RegionHub  */               
                    case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
                    case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
                    case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
                    case ClientLib.Vis.VisObject.EObjectType.RegionPointOfInterest:
                    case ClientLib.Vis.VisObject.EObjectType.RegionRuin:  
                      //var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                      //var pixelX = visObject.get_X();
                      //var pixelY = visObject.get_Y();
                      var ser = ClientLib.Data.MainData.GetInstance().get_Server();
                      var ecX = visObject.get_RawX();
                      var ecY = visObject.get_RawY();
                      var ocX = oc.get_X();
                      var ocY = oc.get_Y();          
                      var cenX = ser.get_ContinentWidth() / 2;
                      var cenY = ser.get_ContinentHeight() / 2;                      

                      var dis = ClientLib.Base.Util.CalculateDistance(ocX, ocY, ecX, ecY);
                      var cen = ClientLib.Base.Util.CalculateDistance(cenX, cenY, ecX, ecY);
                      var cdt = oc.GetCityMoveCooldownTime(ecX,ecY);//cool down time
                      var stp = dis / 20;//steps
                      this.Data.Distance = dis;
                      //console.log('Distance:',dis,'EMT:',this.dhms2(cdt),'Steps:',stp);
                      hp = {};
                      hp.name = '<b>Movement</b>';
                      hp.lbs = ['Distance:','EMT:','Steps:','To center:'];
                      t = [];
                      t.push(dis);
                      t.push(this.dhms2(cdt));
                      t.push(stp);       
                      t.push(cen);       
                      hp.val = t;
                      this.Display.distanceArray.push(hp);
//NOTE
//ClientLib.Vis.VisMain.GetInstance().GetObjectFromPosition
//ClientLib.Data.WorldSector.WorldObject GetObjectFromPosition (System.Int32 x ,System.Int32 y)
//ClientLib.Vis.City.CityObject GetObjectFromPosition (System.Single x ,System.Single y)
//ClientLib.Vis.Region.RegionObject GetObjectFromPosition (System.Single x ,System.Single y)
//ClientLib.Vis.VisObject GetObjectFromPosition (System.Single x ,System.Single y)
//ClientLib.Data.Hub GetObjectFromPosition (System.Int32 x ,System.Int32 y)
                      break;
                    default:
                      break;
                  } 
                }
                //DISABLED this.lootList.store('distanceArray',this.Display.distanceArray);               
              } catch (e) {
                console.warn("MHTools.Loot.calcDistance: ", e);
              }
            },
            onSelectionChange: function(last,curr) {
              //return;
              try {
                //
                //TODO I rather move this to calcDistance and call it from extended widgets.
                //
                
                //ClientLib.Vis.SelectionChange
                //console.clear();
                //console.log('onSelectionChange, curr:',curr);
                var visObject = ClientLib.Vis.VisMain.GetInstance().get_SelectedObject();
                if (visObject != null) {
                  var t = visObject.get_VisObjectType();
                  //ClientLib.Vis.VisObject.EObjectType
                  var LObjectType = [];
                  for(k in ClientLib.Vis.VisObject.EObjectType) 
                    LObjectType[ClientLib.Vis.VisObject.EObjectType[k]] = k;
                  console.log('Vis Object Type:',t,', ',LObjectType[t]);
                  //window.MHTools.visObject = visObject;
                  this.Data.visObject = visObject;
                  /* NOTE             
                  UnknownType
                  CityBuildingType
                  CityResourceFieldType
                  CityWallType
                  RegionCityType
                  RegionSuperWeaponType
                  RegionTerrainType
                  BattlegroundUnit
                  ArmyUnitType
                  ArmyDismissArea
                  DefenseUnitType
                  DefenseTerrainFieldType
                  RegionMoveTarget
                  RegionFreeSlotType
                  RegionNPCBase
                  RegionNPCCamp
                  RegionPointOfInterest
                  RegionRuin
                  RegionGhostCity
                  RegionNewPlayerSpot
                  DefenseTerrainFieldAdditionalSlosType
                  DefenseOffScreenUnit
                  WorldObject
                  WorldMapMarker
                  RegionHub
                   */
                  switch (t) {  
                    /* NOTE
                    RegionCityType
                    RegionSuperWeaponType
                    RegionTerrainType
                    RegionMoveTarget
                    RegionFreeSlotType
                    RegionNPCBase
                    RegionNPCCamp
                    RegionPointOfInterest
                    RegionRuin
                    RegionGhostCity
                    RegionNewPlayerSpot
                    RegionHub  */               
                    // case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
                    // case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
                    // case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
                    // case ClientLib.Vis.VisObject.EObjectType.RegionPointOfInterest:
                    // case ClientLib.Vis.VisObject.EObjectType.RegionRuin:
                      // this.calcDistance();
                      // break;
                    // TEST
                    case ClientLib.Vis.VisObject.EObjectType.RegionHub:
                      //console.log('Vis Object Type:',t,', ',LObjectType[t],visObject);
                      //console.log(visObject.get_BuildingName());
                      //window.visObject = visObject;                    
                      break;                      
                    // // TEST
                    // case ClientLib.Vis.VisObject.EObjectType.DefenseUnitType:
                      // console.log('Vis Object Type:',t,', ',LObjectType[t],visObject);
                      // console.log(visObject.get_BuildingName());
                      // window.visObject = visObject;                    
                      // break;
                    // // TEST
                    // case ClientLib.Vis.VisObject.EObjectType.CityBuildingType:
                      // console.log('Vis Object Type:',t,', ',LObjectType[t],visObject);
                      // console.log(visObject.get_BuildingName());
                      // window.visObject = visObject;
                      // break;
                    default:
                      break;
                  }
                }
              } catch (e) {
                console.warn('MHTools.Loot.onSelectionChange: ', e);
              }
            },
            extendSelectionChange: function() {
              return;//disabled
              //webfrontend.Util.attachNetEvent(/*instance of object which calls the event*/, /*name of the event*/, /*type of the event*/, /*context object*/, /*callback function*/);
              webfrontend.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "SelectionChange", ClientLib.Vis.SelectionChange, this, this.onSelectionChange);
            },
            restoreDisplay: function() {
              //var idx = this.getIndex();  
              var idx = this.lootList.getIndex();  
              if(idx > -1) { 
                var d = this.lootList.list.l[idx].Data;            
                var da = this.Display.distanceArray;
                this.Display={};
                for(var k in d) this.Display[k] = d[k];
                this.Display.distanceArray = da;
                return true;
              }
              return false;
            },
            // DISPLAY data
            addLoadingLabel: function(widget) {
              //console.log('addLoadingLabel');
              try {
                widget.removeAll();
                var r=0, c=0;
                var a;
                      
                // DISTANCE
                //console.log('DISTANCE');
                a = this.Display.distanceArray;
                if(typeof(a)!='undefined' && a.length>0) { 
                  for(var i in this.Display.distanceArray) {              
                    c=0;
                    widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].name).set({width: 230, rich: true, allowGrowX: true}), { row: r++, column: c, colSpan: 6}); 
                    c=1;
                    for(var j in this.Display.distanceArray[i].lbs) {
                      widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].lbs[j]), {row: r, column: c});                     
                      widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].val[j]), {row: r+1, column: c});
                      c+=2;
                    }
                    r+=2;
                  }
                }
                
                // AWAITING
                //console.log('AWAITING');
                // a = this.Data.Distance;
                // if(typeof(a)!='undefined' && a<=10) {
                  c=0;
                  var w = this.waiting[this.waiting[0]];
                  if(++this.waiting[0] >= this.waiting.length) this.waiting[0]=1;
                  //if (this.settings.showLoot.v) widget.add(new qx.ui.basic.Label('<b>Lootable Resources</b>').set({width: 230, rich: true, allowGrowX: true}), {row: r++,column: c, colSpan: 6});
                  widget.add(new qx.ui.basic.Label('Transmission ' + w).set({rich: true}), {row: r++,column: c, colSpan: 6});//, allowGrowX: true, colSpan: 6
                // } else {
                  // c=0;
                  // widget.add(new qx.ui.basic.Label('<span style="color:yellow">Base is out of range.</span>').set({width: 230, rich: true, allowGrowX: true}), {row: r++,column: c, colSpan: 6});//, allowGrowX: true
                // } 
              } catch (e) {
                console.warn('MHTools.Loot.addLoadingLabel: ', e);
              }
            }, 
            addResourcesLabel: function(widget) {
              //console.log('addResourcesLabel');
              try {
                widget.removeAll();
                var r=0, c=0;                
                var hp;
                var a;                
                
                // DISTANCE
                a = this.Display.distanceArray;
                if(typeof(a)!='undefined' && a.length>0) { 
                  for(var i in this.Display.distanceArray) {              
                    c=0;
                    widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].name).set({width: 200, rich: true, allowGrowX: true}), { row: r++, column: c, colSpan: 6}); 
                    c=1;
                    for(var j in this.Display.distanceArray[i].lbs) {
                      widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].lbs[j]), {row: r, column: c});                     
                      widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].val[j]), {row: r+1, column: c});
                      c+=2;
                    }
                    r+=2;
                  }
                }
                
                // LOOT
                if (this.settings.showLoot.v) {
                  a = this.Display.lootArray;
                  if(typeof(a)!='undefined' && a.length>0) {
                    hp = {};
                    hp.name = '<b>Lootable Resources</b>';
                    hp.img = this.resImages;
                    t = [];  
                    t.push(this.Display.lootArray[0]);//Research 6  
                    t.push(this.Display.lootArray[1]);//Tiberium 1
                    t.push(this.Display.lootArray[2]);//Crystal 2
                    t.push(this.Display.lootArray[3]);//Credits 3           
                    hp.val = t;
                    //iconArrays.push(hp);  //store !!
                    
                    // draw icon's info              
                    c=0;
                    widget.add(new qx.ui.basic.Label(hp.name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});    
                    //console.log('A) i',i);   
                    for(var j in hp.val) {
                      //console.log('B) i',i,'j',j);
                      widget.add(hp.img[j], {row: r, column: c++}); 
                      widget.add(new qx.ui.basic.Label(this.kMG(hp.val[j])).set({textAlign:'left'}), {row: r, column: c++});
                    }
                    r++;
                  }
                }
                
                // TROOP
                if (this.settings.showTroops.v) { //to do  
                  a = this.Display.troopsArray;
                  if(typeof(a)!='undefined' && a.length>0) {   
                    hp = {};
                    hp.name = '<b>Troop Strength</b>';
                    hp.img = this.troopImages;
                    t = [];
                    t.push(this.Display.troopsArray[0]);
                    if (this.settings.showTroopsExtra.v) {
                      t.push(this.Display.troopsArray[1]);//inf
                      t.push(this.Display.troopsArray[2]);//veh
                      t.push(this.Display.troopsArray[3]);//stu
                      //t.push(this.Display.troopsArray[4]);//air
                    }              
                    hp.val = t;
                    // draw icon's info                            
                    c=0;
                    widget.add(new qx.ui.basic.Label(hp.name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});  
                    widget.add(new qx.ui.basic.Label(this.kMG(hp.val[0])).set({textAlign:'left'}), {row: r, column: c++});  
                    //console.log('A) i',i);
                    c=2;
                    for(var j=1;j<hp.val.length;j++) {
                      //console.log('B) i',i,'j',j);
                      widget.add(hp.img[j-1], {row: r,column: c++}); 
                      widget.add(new qx.ui.basic.Label(this.kMG(hp.val[j])).set({textAlign:'left'}), {row: r, column: c++});
                    }
                    r++;
                  }
                }
                
                // INFO
                a = this.Display.infoArrays;
                if(typeof(a)!='undefined' && a.length>0) { 
                  for(var i in this.Display.infoArrays) {              
                    c=0;
                    widget.add(new qx.ui.basic.Label(this.Display.infoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
                    c=1;
                    for(var j in this.Display.infoArrays[i].lbs) {
                      widget.add(new qx.ui.basic.Label(this.Display.infoArrays[i].lbs[j]+' '+this.Display.infoArrays[i].val[j]), {row: r, column: c});
                      c+=2;
                    }
                    r++;
                  }
                } 
                
                // 2 lines INFO
                a = this.Display.twoLineInfoArrays;
                if(typeof(a)!='undefined' && a.length>0) {       
                  for(var i in this.Display.twoLineInfoArrays) {              
                    c=0;
                    widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});    
                    c=1;
                    for(var j in this.Display.twoLineInfoArrays[i].lbs) {
                      widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].lbs[j]), {row: r, column: c});                     
                      widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].val[j]), {row: r+1, column: c});
                      c+=2;
                    }
                    r+=2;                
                  }
                }
                
              } catch (e) {
                console.warn('MHTools.Loot.addResourcesLabel(): ', e);
              }
            },       
            addFriendlyLabel: function(widget) {
              //console.log('addFriendlyLabel');
              try {              
                widget.removeAll();
                var a;
                var r=0, c=0;
                
                // DISTANCE
                a = this.Display.distanceArray;
                if(typeof(a)!='undefined' && a.length>0) {    
                  for(var i in this.Display.distanceArray) {              
                    c=0;
                    widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
                    c=1;
                    for(var j in this.Display.distanceArray[i].lbs) {
                      widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].lbs[j]), {row: r, column: c});                     
                      widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].val[j]), {row: r+1, column: c});
                      c+=2;
                    }
                    r+=2;
                  }
                }
                
                // 2 lines INFO
                a = this.Display.twoLineInfoArrays;
                if(typeof(a)!='undefined' && a.length>0) {  
                  c=0;
                  for(var i in this.Display.twoLineInfoArrays) {              
                    c=0;
                    widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
                    c=1;
                    for(var j in this.Display.twoLineInfoArrays[i].lbs) {
                      widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].lbs[j]), {row: r, column: c});                     
                      widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].val[j]), {row: r+1, column: c});
                      c+=2;
                    }
                    r+=2;                
                  }
                }

              } catch (e) {
                console.warn('MHTools.Loot.addFriendlyLabel: ', e);
              }
            },
            // EXTEND UI
            /* NOTE
            RegionCityMenu
            RegionCityFoundInfo
            RegionGhostStatusInfo
            RegionCityStatusInfo
            RegionNPCBaseStatusInfo
            RegionHubStatusInfo
            RegionPointOfInterestStatusInfo
            RegionCityStatusInfoEnemy
            RegionCityList
            RegionCityInfo
            RegionNewPlayerSpotStatusInfo
            RegionRuinStatusInfo
            RegionCityStatusInfoOwn
            RegionCitySupportInfo
            RegionCityStatusInfoAlliance
            RegionCityMoveInfo
            RegionNPCCampStatusInfo
            */            
            extendOwnBase: function() {// BASE - Own
              var self = this;
              if (!webfrontend.gui.region.RegionCityStatusInfoOwn.prototype.__mhloot_showLootOwnBase) {
                webfrontend.gui.region.RegionCityStatusInfoOwn.prototype.__mhloot_showLootOwnBase = webfrontend.gui.region.RegionCityStatusInfoOwn.prototype.onCitiesChange;
              }
              webfrontend.gui.region.RegionCityStatusInfoOwn.prototype.onCitiesChange = function () {
                try {            
                  if (!self.lootWindowOwn) {
                    self.lootWindowOwn = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                    self.lootWindowOwn.setTextColor('yellow');//yellow white            

                    var w = webfrontend.gui.region.RegionCityStatusInfoOwn.getInstance();              
                    w.add(self.lootWindowOwn);
                  }
                  //clear                  
                  self.Display.distanceArray = [];
                  if(self.loadBase()) {           
                    self.calcFriendlyInfo();
                    self.addFriendlyLabel(self.lootWindowOwn);
                  } else {
                    self.addLoadingLabel(self.lootWindowOwn);
                  }
                } catch (e) {
                  console.warn("MHTool.Loot.RegionCityStatusInfoOwn: ", e);
                }              
                this.__mhloot_showLootOwnBase();// run base function
              }
            },
            extendAllianceBase: function() {// BASE - Alliance
              var self = this;
              if (!webfrontend.gui.region.RegionCityStatusInfoAlliance.prototype.__mhloot_showLootAllianceBase) {
                webfrontend.gui.region.RegionCityStatusInfoAlliance.prototype.__mhloot_showLootAllianceBase = webfrontend.gui.region.RegionCityStatusInfoAlliance.prototype.onCitiesChange;
              }// ^inject
              webfrontend.gui.region.RegionCityStatusInfoAlliance.prototype.onCitiesChange = function () {
                //console.log('RegionCityStatusInfoAlliance:');
                try {  
        //todo wrap in function        
                  if (!self.lootWindowAlly) {
                    self.lootWindowAlly = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                    self.lootWindowAlly.setTextColor('yellow');//yellow             

                    var w = webfrontend.gui.region.RegionCityStatusInfoAlliance.getInstance();              
                    w.add(self.lootWindowAlly);
                  }           
                  self.calcDistance();
                  if(self.loadBase()) {           
                    self.calcFriendlyInfo();
                    self.calcDistance();
                    self.addFriendlyLabel(self.lootWindowAlly);
                  } else {
                    self.addLoadingLabel(self.lootWindowAlly);
                  }
                } catch (e) {
                  console.warn("MHTools.Loot.RegionCityStatusInfoAlliance: ", e);
                }              
                this.__mhloot_showLootAllianceBase();
              }  
            },
            extendForgottenCamp: function() {// CAMP - Forgotten
              var self = this;          
              if (!webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.__mhloot_showLootNPCCamp) {
                webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.__mhloot_showLootNPCCamp = webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.onCitiesChange;
              }
              webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.onCitiesChange = function () {
                //console.log('RegionNPCCampStatusInfo:');
                try {
                  if (!self.lootWindowCamp) {
//TODO does it have , allowGrowX: true property?
                    self.lootWindowCamp = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                    self.lootWindowCamp.setTextColor('white');

                    var widget = webfrontend.gui.region.RegionNPCCampStatusInfo.getInstance();
                    widget.add(self.lootWindowCamp);
                  }                 
                  self.calcDistance();
                  if (self.loadBase()) {
                    self.calcResources();
                    self.calcTroops();
                    self.calcInfo();
                    self.addResourcesLabel(self.lootWindowCamp);
                  } else {          
                    if(self.restoreDisplay()) {
                      self.addResourcesLabel(self.lootWindowCamp);
                    } else {        
                      self.addLoadingLabel(self.lootWindowCamp);
                    }
                  }
                } catch (e) {
                  console.warn("MHTool.Loot.RegionNPCCampStatusInfo: ", e);
                }
                this.__mhloot_showLootNPCCamp();
              }
            },
            extendForgottenBase: function() {// BASE - Forgotten
              var self = this;  
              if (!webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.__mhloot_showLootNPCBase) {
                webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.__mhloot_showLootNPCBase = webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.onCitiesChange;
              }
              webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.onCitiesChange = function () {
                //console.log('RegionNPCBaseStatusInfo:');
                try {
                  if (!self.lootWindowBase) {
                    self.lootWindowBase = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                    self.lootWindowBase.setTextColor('white');

                    var widget = webfrontend.gui.region.RegionNPCBaseStatusInfo.getInstance();
                    widget.add(self.lootWindowBase);
                  }      
                  self.calcDistance();
                  if (self.loadBase()) {
                    self.calcResources();
                    self.calcTroops();
                    self.calcInfo();
                    self.addResourcesLabel(self.lootWindowBase);
                  } else {           
                    if(self.restoreDisplay()) {
                      self.addResourcesLabel(self.lootWindowBase);
                    } else {           
                      self.addLoadingLabel(self.lootWindowBase);
                    }
                  }
                } catch (e) {
                  console.warn("MHTool.Loot.RegionNPCBaseStatusInfo: ", e);
                }
                this.__mhloot_showLootNPCBase();
              }
            },            
            extendPlayerBase: function() {// BASE - PvP
              var self = this; 
              if (!webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.__mhloot_showLootPlayerBase) {
                webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.__mhloot_showLootPlayerBase = webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.onCitiesChange;
              }
              webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.onCitiesChange = function () {
                //console.log('RegionCityStatusInfoEnemy:');
                try {
                  if (!self.lootWindowPlayer) {
                    self.lootWindowPlayer = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                    self.lootWindowPlayer.setTextColor('white');

                    var widget = webfrontend.gui.region.RegionCityStatusInfoEnemy.getInstance();
                    widget.add(self.lootWindowPlayer);
                  }
                  self.calcDistance();
                  if (self.loadBase()) {  
                    self.calcResources();
                    self.calcTroops();
                    self.calcInfo(); 
                    self.addResourcesLabel(self.lootWindowPlayer);
                  } else {           
                    if(self.restoreDisplay()) {
                      self.addResourcesLabel(self.lootWindowPlayer);
                    } else {          
                      self.addLoadingLabel(self.lootWindowPlayer);
                    }      
                  }
                } catch (e) {
                  console.warn("MHTool.Loot.RegionCityStatusInfoEnemy: ", e);
                }

                this.__mhloot_showLootPlayerBase();
              }
            },            
            extendPOI: function() {// POI
              var self = this; 
              if (!webfrontend.gui.region.RegionPointOfInterestStatusInfo.prototype.__mhloot_showLootPOI) {
                webfrontend.gui.region.RegionPointOfInterestStatusInfo.prototype.__mhloot_showLootPOI = webfrontend.gui.region.RegionPointOfInterestStatusInfo.prototype.onCitiesChange;
              }
              webfrontend.gui.region.RegionPointOfInterestStatusInfo.prototype.onCitiesChange = function () {
                //console.log('RegionPointOfInterestStatusInfo:');
                try {
                  if (!self.lootWindowPOI) {
                    self.lootWindowPOI = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                    self.lootWindowPOI.setTextColor('white');

                    var widget = webfrontend.gui.region.RegionPointOfInterestStatusInfo.getInstance();
                    widget.add(self.lootWindowPOI);
                  }
                  //clear
                  self.Display.lootArray = [];
                  self.Display.troopsArray = [];
                  self.Display.infoArrays = [];
                  self.Display.twoLineInfoArrays = [];
                  self.calcDistance();
                  self.addResourcesLabel(self.lootWindowPOI);
                } catch (e) {
                  console.warn("MHTool.Loot.RegionPointOfInterestStatusInfo: ", e);
                }
                this.__mhloot_showLootPOI();
              }
            },
            extendHUB: function() {// HUB
              var self = this; 
              if (!webfrontend.gui.region.RegionHubStatusInfo.prototype.__mhloot_showLootHUB) {
                webfrontend.gui.region.RegionHubStatusInfo.prototype.__mhloot_showLootHUB = webfrontend.gui.region.RegionHubStatusInfo.prototype.onCitiesChange;
              }
              webfrontend.gui.region.RegionHubStatusInfo.prototype.onCitiesChange = function () {
                console.log('RegionHubStatusInfo:');
                try {
                  if (!self.lootWindowHUB) {
                    self.lootWindowHUB = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                    self.lootWindowHUB.setTextColor('white');

                    var widget = webfrontend.gui.region.RegionHubStatusInfo.getInstance();
                    widget.add(self.lootWindowHUB);
                  }
                  //clear
                  self.Display.lootArray = [];
                  self.Display.troopsArray = [];
                  self.Display.infoArrays = [];
                  self.Display.twoLineInfoArrays = [];
                  self.calcDistance();
                  self.addResourcesLabel(self.lootWindowHUB);
                } catch (e) {
                  console.warn("MHTool.Loot.RegionHubStatusInfo: ", e);
                }
                this.__mhloot_showLootHUB();
              }
            },
            extendHUBServer: function() {
              var self = this; 
              if (!webfrontend.gui.region.RegionHubServerStatusInfo.prototype.__mhloot_showLootHUB) {
                webfrontend.gui.region.RegionHubServerStatusInfo.prototype.__mhloot_showLootHUB = webfrontend.gui.region.RegionHubServerStatusInfo.prototype.onCitiesChange;
              }
              webfrontend.gui.region.RegionHubServerStatusInfo.prototype.onCitiesChange = function () {
                console.log('RegionHubServerStatusInfo:');
                try {
                  if (!self.lootWindowHUBServer) {
                    self.lootWindowHUBServer = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                    self.lootWindowHUBServer.setTextColor('white');

                    var widget = webfrontend.gui.region.RegionHubServerStatusInfo.getInstance();
                    widget.add(self.lootWindowHUBServer);
                  }
                  //clear
                  self.Display.lootArray = [];
                  self.Display.troopsArray = [];
                  self.Display.infoArrays = [];
                  self.Display.twoLineInfoArrays = [];
                  self.calcDistance();
                  self.addResourcesLabel(self.lootWindowHUBServer);
                } catch (e) {
                  console.warn("MHTool.Loot.RegionHubStatusInfo: ", e);
                }
                this.__mhloot_showLootHUB();
              }
            },
            extendRUIN: function() {// RUIN
              var self = this; 
              if (!webfrontend.gui.region.RegionRuinStatusInfo.prototype.__mhloot_showLootRUIN) {
                webfrontend.gui.region.RegionRuinStatusInfo.prototype.__mhloot_showLootRUIN = webfrontend.gui.region.RegionRuinStatusInfo.prototype.onCitiesChange;
              }
              webfrontend.gui.region.RegionRuinStatusInfo.prototype.onCitiesChange = function () {
                //console.log('RegionRuinStatusInfo:');
                try {
                  if (!self.lootWindowRUIN) {
                    self.lootWindowRUIN = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                    self.lootWindowRUIN.setTextColor('white');

                    var widget = webfrontend.gui.region.RegionRuinStatusInfo.getInstance();
                    widget.add(self.lootWindowRUIN);
                  }
                  //clear
                  self.Display.lootArray = [];
                  self.Display.troopsArray = [];
                  self.Display.infoArrays = [];
                  self.Display.twoLineInfoArrays = [];
                  self.calcDistance();
                  self.addResourcesLabel(self.lootWindowRUIN);
                } catch (e) {
                  console.warn("MHTool.Loot.RegionRuinStatusInfo: ", e);
                }
                this.__mhloot_showLootRUIN();
              }
            },
            // OPTIONS
            optionsTab: null,
            optionsPage: null,
            btnApply: null,
            optionsStoreName: 'MHToolLootOptions',
            addLootPage: function() {            
              //console.log('addLootPage');
              try {
                if(!MHTools.OptionsPage) OptionsPage();
                
                if(!this.optionsTab) {
                  //Create Tab
                  this.optionsTab = MHTools.OptionsPage.getInstance();
                }
                this.optionsPage = this.optionsTab.addPage("Loot");
                this.optionsPage.setLayout(new qx.ui.layout.VBox());
                // ...
                this.optionsPage.add(new qx.ui.basic.Label("<b>Options:</b></br>").set({rich: true}));//, textColor: red
                var i = 0;
                for(var k in this.settings) {
                  this.settings[k].cb = new qx.ui.form.CheckBox(this.settings[k].l).set({
                    value: this.settings[k].v,
                    paddingLeft: 10
                  });
                  this.settings[k].cb.addListener("execute", this.optionsChanged, this);
                  this.optionsPage.add(this.settings[k].cb);//, {row:1+i++, column:3});
                }
                //typeGet
                //this.optionsPage.add(new qx.ui.basic.Label("<b>Obf:"+this.typeGet()+"</b>").set({rich: true}));//, textColor: red
                //  container.add(new qx.ui.core.Spacer(50));
                this.loadOptions();
                this.addButtons();               
              } catch (e) {
                console.warn("MHTool.Loot.addLootPage: ", e);
              }           
            },
            addButtons: function() {
              try {
                this.btnApply = new qx.ui.form.Button("Apply");
                this.btnApply.set({ width:150, height:30, toolTipText: "Apply changes.", allowGrowX:false, enabled:false});//, marginTop:20});
                
                var c = new qx.ui.container.Composite(new qx.ui.layout.HBox(0,'right'));
                c.setMarginTop(20);
                c.add(this.btnApply);
                this.optionsPage.add(c);
                
                this.btnApply.addListener("execute", this.applyOptions, this); 
                this.btnApply.setEnabled(false);
              } catch (e) {
                console.warn("MHTool.Loot.addButtons: ", e);
              }
            },
            optionsChanged: function() {
              var c = false;
              for(var k in this.settings) {
                c = c || (this.settings[k].v != this.settings[k].cb.getValue());
              }
              this.btnApply.setEnabled(c);
            },
            applyOptions: function(e) {
              //console.log("applyOptions e:",e);
              this.saveOptions();
              this.btnApply.setEnabled(false); 
            },
            saveOptions: function() {   
              var c = {};
              var i = 0;
              for(var k in this.settings) {
                c[k] = this.settings[k].cb.getValue();
                this.settings[k].v = c[k];
              }
              var S = ClientLib.Base.LocalStorage;
              if (S.get_IsSupported()) S.SetItem(this.optionsStoreName, c);
            },
            loadOptions: function() {
              try {
                var c = {};            
                var S = ClientLib.Base.LocalStorage;
                if (S.get_IsSupported()) c = S.GetItem(this.optionsStoreName);
                //console.log('loadOptions c:',c);
                if(c===null) c = {};
                var i = 0;              
                for(var k in this.settings) {
                  if(typeof(c[k])!='undefined') {
                    this.settings[k].cb.setValue(c[k]);
                    this.settings[k].v = c[k];
                  } else {
                    this.settings[k].cb.setValue(this.settings[k].d);
                    this.settings[k].v = this.settings[k].d;
                  }
                }             
                //console.log('loadOptions settings:',this.settings);
              } catch (e) {
                  console.warn("MHTool.Loot.loadOptions: ", e);
              }
            }
          }//members
        });      
      } catch (e) {
        console.warn("qx.Class.define(MHTools.Loot: ", e);      
      }
      //======================================================= 
      // START
      MHTools.Loot.getInstance();
    }//function MHToolsLootCreate
    //=======================================================   
    function LoadExtension() {
      try {
        if (typeof(qx) != 'undefined') {
          //if (qx.core.Init.getApplication().getMenuBar() !== null) {
          if (!!qx.core.Init.getApplication().getMenuBar()) {
            MHToolsLootCreate();
            return; // done
          } 
        }
      } catch (e) {
        if (typeof(console) != 'undefined') console.log('LoadExtension:',e);
        else if (window.opera) opera.postError(e);
        else GM_log(e);
      }
      window.setTimeout(LoadExtension, 1000); // force it
    }
    LoadExtension();
  }
  //=======================================================
  function Inject() {
    var script = document.createElement('script');
    txt = MHLootMain.toString();
    script.innerHTML = '(' + txt + ')();';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
  }
  Inject();
})();
		elda_hasload(137978);
	} else {
		elda_hasnotload(137978);
	}
} catch (e) {
    GM_log(e);
	GM_log(e.name + " " + e.message);
}

/*
URL:		http://userscripts.org/scripts/source/153404.user.js
Id:		153404
Name:		Tiberium Alliances Zoom

*/
try {

	elda_addon_info[153404] = {
		id: 153404,
		name: "Tiberium Alliances Zoom",
		version: "",
		date: "",
		can_disabled: true,
		loaded: false
	};

	if(elda_hastoload(153404)) {

(function (){
  var tazoom_main = function() {
    function initialize() {
      console.log("Zoom Loaded");
      
      var zoomMin = 2.0; // Larger number means able to zoom in closer.
      var zoomMax = 0.1; // Smaller number means able to zoom out further.
      var zoomInc = 0.08; // Larger number for faster zooming, Smaller number for slower zooming.
      
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
 
		elda_hasload(153404);
	} else {
		elda_hasnotload(153404);
	}
} catch (e) {
    GM_log(e);
	GM_log(e.name + " " + e.message);
}

/*
URL:		http://userscripts.org/scripts/source/158919.user.js
Id:		158919
Name:		The Green Cross - Tiberium Alliances Tools
Version:	0.5

*/
try {

	elda_addon_info[158919] = {
		id: 158919,
		name: "The Green Cross - Tiberium Alliances Tools",
		version: "0.5",
		date: "",
		can_disabled: true,
		loaded: false
	};

	if(elda_hastoload(158919)) {

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
    extend: qx.ui.window.Window,
            
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
                                
                                 var cityEntity = visCity.GetCityObjectFromPosition(x * width, y * height);
                                    
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
     // this.scanTable.getSelection()
     //}
    }
   });
   
   qx.Class.define("TGCTools.BaseScanner.TerrainLayout", 
   {
    type: "singleton",
    extend: qx.ui.window.Window,
            
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
    extend: qx.ui.window.Window,
            
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
    extend: qx.ui.window.Window,
            
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
        var cityEntity = visCity.GetCityObjectFromPosition(x * width, y * height);
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
       
       var visBuilding = visCity.GetCityObjectFromPosition(buildingsData[idx].get_CoordX() * width, buildingsData[idx].get_CoordY() * height);
       
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
		elda_hasload(158919);
	} else {
		elda_hasnotload(158919);
	}
} catch (e) {
    GM_log(e);
	GM_log(e.name + " " + e.message);
}

/*
URL:		http://userscripts.org/scripts/source/159496.user.js
Id:		159496
Name:		CnC:Tiberium Aliances Navigator - Compass
Version:	1.2.1

*/
try {

	elda_addon_info[159496] = {
		id: 159496,
		name: "CnC:Tiberium Aliances Navigator - Compass",
		version: "1.2.1",
		date: "",
		can_disabled: true,
		loaded: false
	};

	if(elda_hastoload(159496)) {

(function () {
  var NavigatorMain = function () {
    try {
      function createNavigator() {
        //Note:
        //ClientLib.API.Battleground.prototype.GetLootFromCurrentCity()
        qx.Class.define('MHTools.Navigator', {
          type: 'singleton',
          extend: qx.core.Object,
          statics : {
            VERSION: '1.2.1',
            AUTHOR: 'MrHIDEn',
            CLASS: 'Navigator'
          },
          construct: function() {
            try {
              try {
                this.stats.src = 'https://goo.gl/81xZN';//1.0.0 1.1.0 1.2.0
                this.Self = this;
                var backColor = '#eef';
                backColor = '#eeeeffaa';
                backColor = '#eeeeff';
                var ser = ClientLib.Data.MainData.GetInstance().get_Server();         
                this.cenX = ser.get_ContinentWidth() / 2;
                this.cenY = ser.get_ContinentHeight() / 2;
                this.lockX = this.cenX;
                this.lockY = this.cenY;
                this.posTimer = new qx.event.Timer();
                this.posTimer.addListener("interval",this.onPosTimer,this);
                this.win = (new qx.ui.window.Window("Navigator")).set({
                  width:120,
                  //showMinimize:false,
                  showMaximize:false,
                  showClose:false,
                  //appearance:'navigator',
                  contentPadding: 6,
                  allowClose:false,
                  //allowMinimize:false,
                  resizable:false,                  
                  toolTipText: "MrHIDEn tool - Naviator."
                });
                this.win.addListener("minimize",function(e) {
                  if(this.extMinimized) {
                    this.extMinimized = false;
                    for(var k in this.extItems) this.win.add(this.extItems[k]);
                  }
                  else {
                    this.extMinimized = true;
                    this.win.removeAll();
                  }
                  this.win.restore();//trick
                },this);
                this.win.moveTo(130,5);
                var winLayout = new qx.ui.layout.VBox();
                winLayout.setAlignX("center");
                this.win.setLayout(winLayout);
                
                
                // Compass 1 //////////////////////////////////////////////////////////////
                var hbox = new qx.ui.layout.HBox();
                hbox.setAlignX("center");
                var compass = (new qx.ui.embed.Canvas()).set({
                  width: 50,
                  height: 50,
                  canvasWidth: 50,
                  canvasHeight: 50,
                  toolTipText: "Pointing selected base."
                });
                compass.addListener("click",function(e) {
                  var cid  = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();
                  webfrontend.gui.UtilView.centerCityOnRegionViewWindow(cid);
                  this.displayCompass();
                },this);
                compass.set({
                  toolTipText: "Click - go to."
                });
                var cnt1 = new qx.ui.container.Composite();
                cnt1.setLayout(hbox);
                cnt1.setThemedBackgroundColor(backColor);
                cnt1.add(compass);
                this.ctx1 = compass.getContext2d();
                // add
                this.extItems.push(cnt1);
                
                // Info //////////////////////////////////////////////////////////////
                var vbox = new qx.ui.layout.VBox();
                vbox.setAlignX("center");
                var cnt2 = new qx.ui.container.Composite();  
                cnt2.setLayout(vbox);                        
                cnt2.setThemedBackgroundColor(backColor);
                cnt2.setThemedFont("bold");
                this.disBase = new qx.ui.basic.Label('0');
                this.disBase.set({
                  toolTipText: "Distance from your curren base to the center of view."
                });
                cnt2.add(new qx.ui.basic.Label("Current Base"));
                cnt2.add(this.disBase);
                // add
                this.extItems.push(cnt2);
                
                // Compass 2 //////////////////////////////////////////////////////////////
                var hbox2 = new qx.ui.layout.HBox();
                hbox2.setAlignX("center");
                var compass2 = (new qx.ui.embed.Canvas()).set({
                  width: 50,
                  height: 50,
                  canvasWidth: 50,
                  canvasHeight: 50,
                  toolTipText: "Pointing locked base. Click this to lock center of the map."
                });
                compass2.addListener("click",function(e) {
                  webfrontend.gui.UtilView.centerCoordinatesOnRegionViewWindow(this.lockX,this.lockY);
                },this);
                compass2.set({
                  toolTipText: "Click - go to."
                });
                var cnt4 = new qx.ui.container.Composite();
                cnt4.setLayout(hbox2);
                cnt4.setThemedBackgroundColor(backColor);
                cnt4.add(compass2);
                this.ctx2 = compass2.getContext2d();
                // add
                this.extItems.push(cnt4);
                
                
                var vbox2 = new qx.ui.layout.VBox();
                vbox2.setAlignX("center");
                var cnt3 = new qx.ui.container.Composite();
                cnt3.setLayout(vbox2);
                //cnt3.setThemedBackgroundColor('#eef');
                cnt3.setThemedBackgroundColor(backColor);
                cnt3.setThemedFont("bold");

                this.coordLock = new qx.ui.basic.Label('X:Y');
                this.coordLock.set({
                  toolTipText: "Click - set center of map."
                });
                this.coordLock.addListener("click",function(e) {                
                  var ser = ClientLib.Data.MainData.GetInstance().get_Server();         
                  this.lockX = ser.get_ContinentWidth() / 2;
                  this.lockY = ser.get_ContinentHeight() / 2;
                  this.coordLock.setValue(this.lockX.toString()+':'+this.lockY.toString());
                  this.displayCompass();
                },this);
                this.disLock = new qx.ui.basic.Label('0');
                this.disLock.set({
                  toolTipText: "Distance from locked object to the selected object."
                });
                var btnLock = new qx.ui.form.Button("Lock");
                btnLock.set({
                  //width:50,
                  toolTipText: "Lock position of the selected object."
                });
                btnLock.addListener("execute", function(e) {
                  this.lockX = this.selX;
                  this.lockY = this.selY;
                  this.coordLock.setValue(this.lockX.toString()+':'+this.lockY.toString());
                  this.displayCompass();
                }, this);
                cnt3.add(this.coordLock);
                cnt3.add(this.disLock);
                cnt3.add(btnLock);
                // add
                this.extItems.push(cnt3);
                
                for(var k in this.extItems) this.win.add(this.extItems[k]);
                
                this.win.open();
                //tst.navigator = this;
              } catch (e) {
                console.warn("win.initialize: ", e);
              }
             
              phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance().get_Region(), "PositionChange", ClientLib.Vis.PositionChange, this, this.onPositionChange);
              phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "SelectionChange", ClientLib.Vis.SelectionChange, this, this.onSelectionChange);
            
              console.log('Navigator loaded');
            } catch (e) {
              console.warn("Compass.initialize: ", e);
            }
          },
          properties: {
            Property1: { init: 'P1', check: "String" }
          },
          members: {
            Self: null,
            stats: document.createElement('img'),
            win: null,
            extItems: [],
            extMinimized: false,
            posTimer: null,
            disBase: null,
            disObj: null,
            coordLock: null,
            disLock: null,
            ctx1: null,
            ctx2: null,
            background: null,
            size: 50,
            LObjectType: [],
            selX: -1,
            selY: -1,
            lockX: 0,
            lockY: 0,
            cenX: 0,
            cenY: 0,
            selected: null,
            visObject: null,
            onPositionChange: function (e) {
              //console.log('onPositionChange');
              this.posTimer.restartWith(200);
            },
            onPosTimer: function (e) {
              //console.log('onPosTimer');
              this.posTimer.stop();
              this.displayCompass();
            },
            onSelectionChange: function (l,c) {
              try {
                //console.log('onSelectionChange.c:',c);
                var visObject = ClientLib.Vis.VisMain.GetInstance().get_SelectedObject();
                if (visObject != null) {
                  var t = visObject.get_VisObjectType();
                  switch (t) { 
                    /* NOTE
                    RegionCityType
                    RegionSuperWeaponType
                    RegionTerrainType
                    RegionMoveTarget
                    RegionFreeSlotType
                    RegionNPCBase
                    RegionNPCCamp
                    RegionPointOfInterest
                    RegionRuin
                    RegionGhostCity
                    RegionNewPlayerSpot
                    RegionHub  */               
                    case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
                    case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
                    case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
                    case ClientLib.Vis.VisObject.EObjectType.RegionPointOfInterest:
                    case ClientLib.Vis.VisObject.EObjectType.RegionRuin:
                    case ClientLib.Vis.VisObject.EObjectType.RegionHubControl:
                    case ClientLib.Vis.VisObject.EObjectType.RegionHubCenter:
                      //this.calcDistance();
                      //console.log('visObject:',visObject);
                      //console.log('Vis Object Type:',t,', ',this.LObjectType[t]);
                      this.visObject = visObject;
                      this.selX = visObject.get_RawX();
                      this.selY = visObject.get_RawY();
                      this.selected = true;
                      this.displayCompass();
                      break;
                    default:
                      break;
                  }
                }
              } catch (e) {
                console.log("onSelectionChange", e);
              }
            },
            displayCompass: function () {
              try {
                var ctx1 = this.ctx1;  
                if(ctx1===null) return;
                var ctx2 = this.ctx2;  
                if(ctx2===null) return;
                var currentCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                var cityCoordX = currentCity.get_PosX();
                var cityCoordY = currentCity.get_PosY();
                if(this.selX==-1 && this.selY==-1) {                
                  this.selX = currentCity.get_PosX();
                  this.selY = currentCity.get_PosY();
                  this.coordLock.setValue(this.lockX.toString()+':'+this.lockY.toString());
                }
                
                var region = ClientLib.Vis.VisMain.GetInstance().get_Region();
                var gridW = region.get_GridWidth();
                var gridH = region.get_GridHeight();
                var regionX = region.get_PosX();
                var regionY = region.get_PosY();
                var viewW = region.get_ViewWidth();
                var viewH = region.get_ViewHeight();
                var zoom = region.get_ZoomFactor();
                              
                var viewCoordX = (regionX + viewW / 2 / zoom) / gridW - 0.5;
                var viewCoordY = (regionY + viewH / 2 / zoom) / gridH - 0.5; 
                
                var dx = viewCoordX - cityCoordX;
                var dy = cityCoordY - viewCoordY;
                var distance = Math.sqrt(dx * dx + dy * dy);
                              
                ctx1.clearRect(0, 0, 50, 50);                
                ctx1.save();                
                ctx1.translate(25, 25);
                ctx1.rotate(dy > 0 ? Math.asin(dx / distance) + Math.PI : -Math.asin(dx / distance));
                this.drawCompass(ctx1);
                ctx1.restore(); 

                
                
                var dx2 = this.selX - this.lockX;
                var dy2 = this.lockY - this.selY;
                var distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
                ctx2.clearRect(0, 0, 50, 50);                
                ctx2.save();                
                ctx2.translate(25, 25);
                ctx2.rotate(dy2 > 0 ? Math.asin(dx2 / distance2) + Math.PI : -Math.asin(dx2 / distance2));
                this.drawCompass(ctx2);
                ctx2.restore();             
                
                this.disBase.setValue(distance.toFixed(1).toString());
                var ltext = ClientLib.Base.Util.CalculateDistance(this.lockX, this.lockY, this.selX, this.selY);
                this.disLock.setValue(ltext.toString());              
                
                
              } catch (e) {
                console.warn("displayCompass", e);
              }
            },
            drawCompass: function(c) {
              c.strokeStyle = 'black';
              c.beginPath();
              c.arc(0,0,20,0,Math.PI*2,true); // Outer circle
              c.stroke();

              c.strokeStyle = 'black';
              c.beginPath();
              c.moveTo(0, 0);
              c.lineTo(0, -20);  // Line
              c.closePath();
              c.stroke();

              c.beginPath();
              c.strokeStyle = 'black';
              c.fillStyle = 'white';
              c.arc(0,0,4,0,Math.PI*2,true); // Inner dot
              c.fill();
              c.stroke();

              c.beginPath();
              c.strokeStyle = 'black';
              c.fillStyle = 'aqua';
              c.arc(0,-20,4,0,Math.PI*2,true); // Outer dot
              c.fill();
              c.stroke();
            }
          }
        });
      }
    } catch (e) {
      console.log('createNavigator: ', e);
    }

    function CompassCheckLoaded() {
      try {
        if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible()) {
          createNavigator();
          MHTools.Navigator.getInstance();
        } else {
          window.setTimeout(CompassCheckLoaded, 1000);
        }
      } catch (e) {
        console.log('CompassCheckLoaded: ', e);
      }
    }
    window.setTimeout(CompassCheckLoaded, 1000);
  }
  try {
    var CompassScript = document.createElement('script');
    CompassScript.innerHTML = "(" + NavigatorMain.toString() + ')();';
    CompassScript.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(CompassScript);
  } catch (e) {
    console.log('Compass: init error: ', e);
  }
})();
		elda_hasload(159496);
	} else {
		elda_hasnotload(159496);
	}
} catch (e) {
    GM_log(e);
	GM_log(e.name + " " + e.message);
}

/*
URL:		http://userscripts.org/scripts/source/158164.user.js
Id:		158164
Name:		Tiberium Alliances Transfer All Resources
Version:	1.5.1

*/
try {

	elda_addon_info[158164] = {
		id: 158164,
		name: "Tiberium Alliances Transfer All Resources",
		version: "1.5.1",
		date: "",
		can_disabled: true,
		loaded: false
	};

	if(elda_hastoload(158164)) {
(function () {
  var TransferAll_main = function () {
    var chkbxConfirm = null;
    var resTypeToggle = null;
 var transferQueue = null;
    var transferWindow = null;

    function createTransferAll() {
      try {
        console.log('TransferAll loaded');
        chkbxConfirm = new qx.ui.form.CheckBox("");
  transferWindow = webfrontend.gui.trade.TradeOverlay.getInstance().getLayoutChildren()[13].getLayoutChildren()[1].getLayout()._getLayoutChildren();
        resTypeToggle = transferWindow[1].getLayoutChildren()[2];
        var btnTransferAll=new webfrontend.ui.SoundButton("Transfer All").set({width:80,enabled:false});

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
        transferWindow[3].add(chkbxConfirm,{right:68,top:104});
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
        var resType = ClientLib.Base.EResourceType.Crystal;
        var transferCost = 0;
        var resAmount;
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
          targetCity = transferQueue[0][0];
          sourceCity = transferQueue[0][1];
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
        if (result) {
          targetCity = transferQueue[0][0];
          sourceCity = transferQueue[0][1];
          resType = transferQueue[0][2];
          resAmount = transferQueue[0][3];
          ClientLib.Data.MainData.GetInstance().get_Player().AddCredits(-targetCity.CalculateTradeCostToCoord(sourceCity.get_X(),sourceCity.get_Y(),amount));
          targetCity.AddResources(resourceType,amount);
          sourceCity.AddResources(resourceType,-amount);
        }
        transferQueue.splice(0,1);
        transfer();

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
		elda_hasload(158164);
	} else {
		elda_hasnotload(158164);
	}
} catch (e) {
    GM_log(e);
	GM_log(e.name + " " + e.message);
}

/*
URL:		http://userscripts.org/scripts/source/152787.user.js
Id:		152787
Name:		C&C:Tiberium Alliances Coords Button
Version:	1.0.1

*/
try {

	elda_addon_info[152787] = {
		id: 152787,
		name: "C&C:Tiberium Alliances Coords Button",
		version: "1.0.1",
		date: "",
		can_disabled: true,
		loaded: false
	};

	if(elda_hastoload(152787)) {
(function () {
  var CNCTACoordsButton_main = function () {
    try {
      function createCoordsButton() {
        console.log('C&C:Tiberium Alliances Coords Button loaded.');

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
          }
        }
      }    
    } catch (e) {
      console.log("createCoordsButton: ", e);
    }

    function CNCTACoordsButton_checkIfLoaded() {
      try {
        if (typeof qx !== 'undefined') {
          createCoordsButton();
        } else {
          window.setTimeout(CNCTACoordsButton_checkIfLoaded, 1000);
        }
      } catch (e) {
        console.log("CNCTACoordsButton_checkIfLoaded: ", e);
      }
    }
  window.setTimeout(CNCTACoordsButton_checkIfLoaded, 1000);
  };
  try {
    var CNCTACoordsButton = document.createElement("script");
    CNCTACoordsButton.innerHTML = "(" + CNCTACoordsButton_main.toString() + ")();";
    CNCTACoordsButton.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(CNCTACoordsButton);
  } catch (e) {
    console.log("CNCTACoordsButton: init error: ", e);
  }
})();
		elda_hasload(152787);
	} else {
		elda_hasnotload(152787);
	}
} catch (e) {
    GM_log(e);
	GM_log(e.name + " " + e.message);
}

/*
URL:		http://userscripts.org/scripts/source/155157.user.js
Id:		155157
Name:		Tiberium Alliances Info Sticker
Version:	1.11.1

*/
try {

	elda_addon_info[155157] = {
		id: 155157,
		name: "Tiberium Alliances Info Sticker",
		version: "1.11.1",
		date: "",
		can_disabled: true,
		loaded: false
	};

	if(elda_hastoload(155157)) {
(function () {
    var InfoSticker_main = function () {
        try {
            function createInfoSticker() {
                console.log('InfoSticker loaded');
                // define Base
                qx.Class.define("InfoSticker.Base", {
                    type: "singleton",
                    extend: qx.core.Object,
                    members: {
                        /* Desktop */
                        dataTimerInterval: 1000,
                        positionInterval: 500,
                        tibIcon: null,
                        cryIcon: null,
                        powIcon: null,
                        creditIcon: null,
                        repairIcon: null,
                        hasStorage: false,

                        initialize: function () {
                            try {
                                this.hasStorage = 'localStorage' in window && window['localStorage'] !== null;
                            } catch (se) {}
                            try {
                                var fileManager = ClientLib.File.FileManager.GetInstance();
                                this.tibIcon = fileManager.GetPhysicalPath("ui/common/icn_res_tiberium.png");
                                this.cryIcon = fileManager.GetPhysicalPath("ui/common/icn_res_chrystal.png");
                                this.powIcon = fileManager.GetPhysicalPath("ui/common/icn_res_power.png");
                                this.creditIcon = fileManager.GetPhysicalPath("ui/common/icn_res_dollar.png");
        this.repairIcon = fileManager.GetPhysicalPath("ui/icons/icn_repair_off_points.png");
                                
        if (typeof phe.cnc.Util.attachNetEvent == 'undefined')
         this.attachEvent = webfrontend.gui.Util.attachNetEvent;
        else
         this.attachEvent = phe.cnc.Util.attachNetEvent;
                                
                                this.runMainTimer();
                            } catch (e) {
                                console.log("InfoSticker.initialize: ", e.toString());
                            }
                        },
                        runMainTimer: function () {
                            try {
                                var self = this;
                                this.calculateInfoData();
                                window.setTimeout(function () {
                                    self.runMainTimer();
                                }, this.dataTimerInterval);
                            } catch (e) {
                                console.log("InfoSticker.runMainTimer: ", e.toString());
                            }
                        },
                        runPositionTimer: function () {
                            try {
                                var self = this;
                                this.repositionSticker();
                                window.setTimeout(function () {
                                    self.runPositionTimer();
                                }, this.positionInterval);
                            } catch (e) {
                                console.log("InfoSticker.runPositionTimer: ", e.toString());
                            }
                        },
                        infoSticker: null,
                        mcvPopup: null,
                        mcvTimerLabel: null,
                        mcvInfoLabel: null,
                        mcvPane: null,
                        
                        repairPopup: null,
                        repairTimerLabel: null,

                        resourcePane: null,
                        resourceHidden: false,
                        resourceTitleLabel: null,
                        resourceHideButton: null,
                        resourceLabel1: null,
                        resourceLabel2: null,
                        resourceLabel3: null,

                        resourceLabel1per: null,
                        resourceLabel2per: null,
                        resourceLabel3per: null,

                        productionTitleLabel: null,
                        productionLabelPower: null,
                        productionLabelCredit: null,

                        repairInfoLabel: null,

                        lastButton: null,

                        top_image: null,
                        bot_image: null,

                        toFlipH: [],

                        pinButton: null,
                        pinned: false,

                        pinTop: 130,
                        pinButtonDecoration: null,
                        pinPane: null,

                        pinIconFix: false,
                        
                        lockButton: null,
                        locked: false,

                        lockButtonDecoration: null,
                        lockPane: null,

                        lockIconFix: false,
                        
                        mcvHide: false,
                        repairHide: false,
                        resourceHide: false,
                        productionHide: false,
                        stickerBackground: null,
                        
                        mcvPane: null,
                        
                        pinLockPos: 0,
                        
                        attachEvent: function() {},
                        
                        isNull: function(e) {
                            return typeof e == "undefined" || e == null;
                        },
                        
                        getApp: function() {
                            return qx.core.Init.getApplication();
                        },
                        
                        getBaseListBar: function() {
                            var app = this.getApp();
                            var b;
                            if(!this.isNull(app)) {
                                b = app.getBaseNavigationBar();
                                if(!this.isNull(b)) {
                                    if(b.getChildren().length > 0) {
                                        b = b.getChildren()[0];
                                        if(b.getChildren().length > 0) {
                                            b = b.getChildren()[0];
                                            return b;
                                        }
                                    }
                                }
                            }
                            return null;
                        },
                        
                        repositionSticker: function () {
                            try {
                             var i;
                                
                                if (this.infoSticker && !this.mcvInfoLabel.isDisposed() && !this.mcvPopup.isDisposed()) {
                                    var dele;

                                    try {
                                        if (this.top_image != null) {
                                            dele = this.top_image.getContentElement().getDomElement();
                                            if (dele != null) {
                                                dele.style["-moz-transform"] = "scaleY(-1)";
                                                dele.style["-o-transform"] = "scaleY(-1)";
                                                dele.style["-webkit-transform"] = "scaleY(-1)";
                                                dele.style.transform = "scaleY(-1)";
                                                dele.style.filter = "FlipV";
                                                dele.style["-ms-filter"] = "FlipV";
                                                this.top_image = null;
                                            }
                                        }
                                        for (i = this.toFlipH.length - 1; i >= 0; i--) {
                                            var e = this.toFlipH[i];
                                            if(e.isDisposed()) this.toFlipH.splice(i, 1);
                                            else {
                                                dele = e.getDecoratorElement().getDomElement();
                                                if (dele != null) {
                                                    dele.style["-moz-transform"] = "scaleX(-1)";
                                                    dele.style["-o-transform"] = "scaleX(-1)";
                                                    dele.style["-webkit-transform"] = "scaleX(-1)";
                                                    dele.style.transform = "scaleX(-1)";
                                                    dele.style.filter = "FlipH";
                                                    dele.style["-ms-filter"] = "FlipH";
                                                    this.toFlipH.splice(i, 1);
                                                }
                                            }
                                        }
                                    } catch (e2) {
                                        console.log("Error flipping images.", e2.toString());
                                    }
                                    var baseListBar = this.getBaseListBar();
                                    if(baseListBar!=null) {
                                        var baseCont = baseListBar.getChildren();
                                        for (i = 0; i < baseCont.length; i++) {
                                            var baseButton = baseCont[i];
                                            if(typeof baseButton.getBaseId === 'function') {
                                                if(baseButton.getBaseId() == ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_Id()
                                                    && baseButton.getBounds() != null && baseButton.getBounds().top!=null) {
                                            //var baseButtonDecorator = baseButton.getDecorator();
                                            //if (baseButton!=this.mcvPopup && baseButtonDecorator != null && typeof baseButtonDecorator === "string" && baseButton.getBounds() != null && baseButton.getBounds().top!=null) {
                                                //if (baseButtonDecorator.indexOf("focused") >= 0 || baseButtonDecorator.indexOf("pressed") >= 0) {
                                                    if(this.locked) {
                                                        if(!this.pinned) {
                                                            if(baseListBar.indexOf(this.mcvPopup)>=0) {
                                                                baseListBar.remove(this.mcvPopup);
                                                            }
                                                            this.pinLockPos = baseListBar.indexOf(baseButton)+1;
                                                            baseListBar.addAt(this.mcvPopup, this.pinLockPos);
                                                        } else if(baseListBar.indexOf(this.mcvPopup)<0) {
                                                            baseListBar.addAt(this.mcvPopup, Math.max(0, Math.min(this.pinLockPos, baseCont.length)));
                                                        }
                                                    } else {
                                                        if(baseListBar.indexOf(this.mcvPopup)>=0) {
                                                            baseListBar.remove(this.mcvPopup);
                                                        }
                                                        if (!this.pinned) {
                                                            var top = baseButton.getBounds().top;
                                                            var infoTop;
                                                            try {
                                                                var stickerHeight = this.infoSticker.getContentElement().getDomElement().style.height;
                                                                stickerHeight = stickerHeight.substring(0, stickerHeight.indexOf("px"));
                                                                infoTop = Math.min(130 + top, Math.max(660, window.innerHeight) - parseInt(stickerHeight, 10) - 130);
                                                            } catch (heighterror) {
                                                                infoTop = 130 + top;
                                                            }
                                                            if(this.infoSticker.getContentElement().getDomElement()!=null)
                                                                this.infoSticker.setDomTop(infoTop);
                                                            
                                                            this.pinTop = infoTop;
                                                        }
                                                    }
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                    
                                }
                            } catch (ex) {
                                console.log("InfoSticker.repositionSticker: ", ex.toString());
                            }
                        },
                        toLock: function (e) {
                            try {
                                this.locked = !this.locked;
                                if(!this.locked) {
                                    this.infoSticker.show();
                                    this.stickerBackground.add(this.mcvPopup);
                                }
                                else this.infoSticker.hide();
                                this.lockButton.setIcon(this.locked ? "FactionUI/icons/icn_thread_locked_active.png" : "FactionUI/icons/icn_thread_locked_inactive.png");
                                this.updateLockButtonDecoration();
                                if (this.hasStorage) {
                                    if (this.locked) {
                                        localStorage["infoSticker-locked"] = "true";
                                        if(this.pinned) localStorage["infoSticker-pinLock"] = this.pinLockPos.toString();
                                    } else {
                                        localStorage["infoSticker-locked"] = "false";
                                    }
                                }
                                if(this.locked && this.pinned) {
                                    this.menuUpButton.setEnabled(true);
                                    this.menuDownButton.setEnabled(true);
                                } else {
                                    this.menuUpButton.setEnabled(false);
                                    this.menuDownButton.setEnabled(false);
                                }
                                this.repositionSticker();
                            } catch(e) {
                                console.log("InfoSticker.toLock: ", e.toString());
                            }
                        },
                        updateLockButtonDecoration: function () {
                            var light = "#CDD9DF";
                            var mid = "#9CA4A8";
                            var dark = "#8C9499";
                            this.lockPane.setDecorator(null);
                            this.lockButtonDecoration = new qx.ui.decoration.Background();
                            this.lockButtonDecoration.setBackgroundColor(this.locked ? dark : light);
                            this.lockPane.setDecorator(this.lockButtonDecoration);
                        },
                        toPin: function (e) {
                            try {
                                this.pinned = !this.pinned;
                                this.pinButton.setIcon(this.pinned ? "FactionUI/icons/icn_thread_pin_active.png" : "FactionUI/icons/icn_thread_pin_inactive.png");
                                this.updatePinButtonDecoration();
                                if (this.hasStorage) {
                                    if (this.pinned) {
                                        localStorage["infoSticker-pinned"] = "true";
                                        localStorage["infoSticker-top"] = this.pinTop.toString();
                                        if(this.locked) {
                                            localStorage["infoSticker-pinLock"] = this.pinLockPos.toString();
                                        }
                                    } else {
                                        localStorage["infoSticker-pinned"] = "false";
                                    }
                                }
                                if(this.locked && this.pinned) {
                                    this.menuUpButton.setEnabled(true);
                                    this.menuDownButton.setEnabled(true);
                                } else {
                                    this.menuUpButton.setEnabled(false);
                                    this.menuDownButton.setEnabled(false);
                                }
                            } catch(e) {
                                console.log("InfoSticker.toPin: ", e.toString());
                            }
                        },
                        updatePinButtonDecoration: function () {
                            var light = "#CDD9DF";
                            var mid = "#9CA4A8";
                            var dark = "#8C9499";
                            this.pinPane.setDecorator(null);
                            this.pinButtonDecoration = new qx.ui.decoration.Background().set({
                                //innerOpacity: 0.5
                            });
                            //this.pinButtonDecoration.setInnerColor(this.pinned ? mid : light);
                            //this.pinButtonDecoration.setOuterColor(this.pinned ? light : mid);
                            this.pinButtonDecoration.setBackgroundColor(this.pinned ? dark : light);
                            this.pinPane.setDecorator(this.pinButtonDecoration);
                        },
                        hideResource: function () {
                            try {
                                //if(this.resourceHidden) 
                                if (this.resourcePane.isVisible()) {
                                    //this.resourcePane.hide();
                                    this.resourcePane.exclude();
                                    this.resourceHideButton.setLabel("+");
                                } else {
                                    this.resourcePane.show();
                                    this.resourceHideButton.setLabel("-");
                                }
                            } catch(e) {
                                console.log("InfoSticker.hideResource: ", e.toString());
                            }
                        },
                        lastPane: null,
                        createSection: function (parent, titleLabel, visible, visibilityStorageName) {
       try {
        var pane = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
         padding: [5, 0, 5, 5],
         width: 124,
         decorator: new qx.ui.decoration.Background().set({
          backgroundImage: "decoration/pane_messaging_item/messaging_items_pane.png",
          backgroundRepeat: "scale",
         }),
         alignX: "right"
        });
        
        var labelStyle = {
         font: qx.bom.Font.fromString('bold').set({
          size: 12
         }),
         textColor: '#595969'
        };
        titleLabel.set(labelStyle);
        
        var hidePane = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
         width: 124,
                                    alignX: "right"
        });
        
        var hideButton = new qx.ui.form.Button("-").set({
         //decorator: new qx.ui.decoration.Single(1, "solid", "black"),
         maxWidth: 15,
         maxHeight: 10,
         //textColor: "black"
        });
                                var self = this;
        //resourceHideButton.addListener("execute", this.hideResource, this);
        hideButton.addListener("execute", function () {
         if (hidePane.isVisible()) {
          hidePane.exclude();
          hideButton.setLabel("+");
         } else {
          hidePane.show();
          hideButton.setLabel("-");
         }
         if(self.hasStorage)
          localStorage["infoSticker-"+visibilityStorageName] = !hidePane.isVisible();
        });

        var titleBar = new qx.ui.container.Composite(new qx.ui.layout.HBox(0));
        titleBar.add(hideButton);
        titleBar.add(titleLabel);
        pane.add(titleBar);
        pane.add(hidePane);
        
                                if(!visible) hidePane.exclude();
                                
        this.toFlipH.push(pane);

                                this.lastPane = pane;
        parent.add(pane);
        
        return hidePane;
       } catch(e) {
        console.log("InfoSticker.createSection: ", e.toString());
        throw e;
       }
                        },
      createHBox: function (ele1, ele2, ele3) {
       var cnt;
       cnt = new qx.ui.container.Composite();
       cnt.setLayout(new qx.ui.layout.HBox(0));
       if (ele1 != null) {
        cnt.add(ele1);
        ele1.setAlignY("middle");
       }
       if (ele2 != null) {
        cnt.add(ele2);
        ele2.setAlignY("bottom");
       }
       if (ele3 != null) {
        cnt.add(ele3);
        ele3.setAlignY("bottom");
       }

       return cnt;
      },
                        
                        formatCompactTime: function (time) {
                            var comps = time.split(":");
                            
                            var i = 0;
                            var value = Math.round(parseInt(comps[i], 10)).toString();
                            var len = comps.length;
                            while(value==0) {
                                value = Math.round(parseInt(comps[++i], 10)).toString();
                                len--;
                            }
                            var unit;
                            switch(len) {
                                case 1: unit = "s"; break;
                                case 2: unit = "m"; break;
                                case 3: unit = "h"; break;
                                case 4: unit = "d"; break;
                            }
                            return value+unit;
                        },
                        createImage: function(icon) {
                            var image = new qx.ui.basic.Image(icon);
                            image.setScale(true);
                            image.setWidth(20);
                            image.setHeight(20);
                            return image;
                        },

                        createMCVPane: function() {
                            try {
                                this.mcvInfoLabel = new qx.ui.basic.Label();
                                this.mcvTimerLabel = new qx.ui.basic.Label().set({
                                    font: qx.bom.Font.fromString('bold').set({
                                            size: 18
                                        }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 114,
                                    textAlign: 'center'
                                });
                                this.mcvTimerCreditProdLabel = new qx.ui.basic.Label().set({
                                    font: qx.bom.Font.fromString('normal').set({
                                        size: 12
                                    }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 114,
                                    textAlign: 'center',
                                    marginTop: 4,
                                    marginBottom: -4
                                });
                                var app = qx.core.Init.getApplication();
                                var b3 = app.getBaseNavigationBar().getChildren()[0].getChildren()[0];
                                
                                
                                var pane = this.createSection(b3, this.mcvInfoLabel, !this.mcvHide, "mcvHide");
                                pane.add(this.mcvTimerLabel);
                                pane.add(this.mcvTimerCreditProdLabel);
                                this.mcvPane = this.lastPane;
                                this.lastPane.setMarginLeft(7);
                                
                            } catch(e) {
                                console.log("InfoSticker.createMCVPopup", e.toString());
                            }
                        },
                        moveStickerUp: function() {
                            try {
                                var baseListBar = this.getBaseListBar();
                                this.pinLockPos=Math.max(0, this.pinLockPos-1);
                                if(baseListBar.indexOf(this.mcvPopup)>=0) {
                                    baseListBar.remove(this.mcvPopup);
                                }
                                if (this.hasStorage) {
                                    localStorage["infoSticker-pinLock"] = this.pinLockPos.toString();
                                }
                            } catch(e) {
                                console.log("InfoSticker.moveStickerUp", e.toString());
                            }
                        },
                        moveStickerDown: function() {
                            try {
                                var baseListBar = this.getBaseListBar();
                                this.pinLockPos=Math.min(baseListBar.getChildren().length, this.pinLockPos+1);
                                if(baseListBar.indexOf(this.mcvPopup)>=0) {
                                    baseListBar.remove(this.mcvPopup);
                                }
                                if (this.hasStorage) {
                                    localStorage["infoSticker-pinLock"] = this.pinLockPos.toString();
                                }
                            } catch(e) {
                                console.log("InfoSticker.moveStickerDown", e.toString());
                            }
                        },
                        menuUpButton: null,
                        menuDownButton: null,
                        createMCVPopup: function() {
                            try {
                                var self = this;
                                this.mcvPopup = new qx.ui.container.Composite(new qx.ui.layout.VBox().set({
                                    spacing: 3})).set({
                                    paddingLeft: 5,
                                    width: 105,
                                    decorator: new qx.ui.decoration.Background()
                                });
                                
                                var menu = new qx.ui.menu.Menu();
                                var menuPinButton = new qx.ui.menu.Button("Pin", "FactionUI/icons/icn_thread_pin_inactive.png");
                                menuPinButton.addListener("execute", this.toPin, this);
                                menu.add(menuPinButton);
                                var menuLockButton = new qx.ui.menu.Button("Lock", "FactionUI/icons/icn_thread_locked_inactive.png");
                                menuLockButton.addListener("execute", this.toLock, this);
                                menu.add(menuLockButton);
                                var fileManager = ClientLib.File.FileManager.GetInstance();
                                this.menuUpButton = new qx.ui.menu.Button("Move up", fileManager.GetPhysicalPath("ui/icons/icon_tracker_arrow_up.png"));
                                //ui/icons/icon_tracker_arrow_up.png ui/gdi/icons/cht_opt_arrow_down.png
                                this.menuUpButton.addListener("execute", this.moveStickerUp, this);
                                menu.add(this.menuUpButton);
                                this.menuDownButton = new qx.ui.menu.Button("Move down", fileManager.GetPhysicalPath("ui/icons/icon_tracker_arrow_down.png"));
                                this.menuDownButton.addListener("execute", this.moveStickerDown, this);
                                menu.add(this.menuDownButton);
                                this.mcvPopup.setContextMenu(menu);
                                if(!this.locked) {
                                    this.stickerBackground.add(this.mcvPopup);
                                }
    
    ////////////////////////////----------------------------------------------------------
                                this.pinButton = new webfrontend.ui.SoundButton().set({
                                    decorator: "button-forum-light",
                                    icon: this.pinned ? "FactionUI/icons/icn_thread_pin_active.png" : "FactionUI/icons/icn_thread_pin_inactive.png",
                                    iconPosition: "top",
                                    show: "icon",
                                    cursor: "pointer",
                                    height: 23,
                                    width: 50,
                                    //maxHeight: 25,
                                    maxWidth: 33,
                                    maxHeight: 19,
                                    alignX: "center"
                                });
                                this.pinButton.addListener("execute", this.toPin, this);
                                
                                this.pinPane = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
                                    //width: 50,
                                    maxWidth: 37,
                                });
                                
                                this.updatePinButtonDecoration();
                                
                                this.pinPane.setDecorator(this.pinButtonDecoration);
                                this.pinPane.add(this.pinButton);
                                //this.mcvPopup.add(this.pinPane);
                                //this.toFlipH.push(this.pinPane);
                                
                                var icon = this.pinButton.getChildControl("icon");
                                icon.setWidth(15);
                                icon.setHeight(15);
                                icon.setScale(true);
    ////////////////////////////----------------------------------------------------------
                                this.lockButton = new webfrontend.ui.SoundButton().set({
                                    decorator: "button-forum-light",
                                    icon: this.pinned ? "FactionUI/icons/icn_thread_locked_active.png" : "FactionUI/icons/icn_thread_locked_inactive.png",
                                    iconPosition: "top",
                                    show: "icon",
                                    cursor: "pointer",
                                    height: 23,
                                    width: 50,
                                    //maxHeight: 25,
                                    maxWidth: 33,
                                    maxHeight: 19,
                                    alignX: "center"
                                });
                                this.lockButton.addListener("execute", this.toLock, this);
                                
                                this.lockPane = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
                                    //width: 50,
                                    maxWidth: 37,
                                });
                                
                                this.updateLockButtonDecoration();
                                
                                this.lockPane.setDecorator(this.lockButtonDecoration);
                                this.lockPane.add(this.lockButton);
                                //this.mcvPopup.add(this.pinPane);
                                //this.toFlipH.push(this.pinPane);
                                
                                icon = this.lockButton.getChildControl("icon");
                                icon.setWidth(15);
                                icon.setHeight(15);
                                icon.setScale(true);
    ////////////////////////////----------------------------------------------------------
                                this.resourceTitleLabel = new qx.ui.basic.Label();
                                this.resourceTitleLabel.setValue("Base");
                                var resStyle = {
                                    font: qx.bom.Font.fromString('bold').set({
                                            size: 14
                                        }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 65,
                                    marginLeft: -10,
                                    textAlign: 'right'
                                };
                                
                                this.resourceLabel1 = new qx.ui.basic.Label().set(resStyle);
                                this.resourceLabel2 = new qx.ui.basic.Label().set(resStyle);
                                this.resourceLabel3 = new qx.ui.basic.Label().set(resStyle);
                                
                                var perStyle = {
                                    font: qx.bom.Font.fromString('bold').set({
                                        size: 9
                                    }),
                                    textColor: '#282828',
                                    height: 18,
                                    width: 33,
                                    textAlign: 'right'
                                };
                                this.resourceLabel1per = new qx.ui.basic.Label().set(perStyle);
                                this.resourceLabel2per = new qx.ui.basic.Label().set(perStyle);
                                this.resourceLabel3per = new qx.ui.basic.Label().set(perStyle);
                                
                                
                                var pane3 = this.createSection(this.mcvPopup, this.resourceTitleLabel, !this.resourceHide, "resourceHide");
                                
                                
                                this.repairTimerLabel = new qx.ui.basic.Label().set({
                                    font: qx.bom.Font.fromString('bold').set({
                                        size: 16
                                    }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 85,
                                    marginLeft: 0,
                                    textAlign: 'center'
                                });
                                pane3.add(this.createHBox(this.createImage(this.repairIcon), this.repairTimerLabel));
                                
                                pane3.add(this.createHBox(this.createImage(this.tibIcon), this.resourceLabel1, this.resourceLabel1per));
                                pane3.add(this.createHBox(this.createImage(this.cryIcon), this.resourceLabel2, this.resourceLabel2per));
                                pane3.add(this.createHBox(this.createImage(this.powIcon), this.resourceLabel3, this.resourceLabel3per));
                                
                                var mcvC = this.mcvPopup.getChildren();
                                mcvC[mcvC.length-1].getChildren()[0].add(this.pinPane);
                                mcvC[mcvC.length-1].getChildren()[0].add(this.lockPane);
    ////////////////////////////----------------------------------------------------------
    
                                this.productionTitleLabel = new qx.ui.basic.Label();
                                this.productionTitleLabel.setValue("Productions");
                                
                                var productionStyle = {
                                    font: qx.bom.Font.fromString('bold').set({
                                        size: 13
                                    }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 60,
                                    textAlign: 'right',
                                    marginTop: 2,
                                    marginBottom: -2
                                };
                                this.productionLabelPower = new qx.ui.basic.Label().set(productionStyle);
                                this.productionLabelCredit = new qx.ui.basic.Label().set(productionStyle);
                                
                                var pane4 = this.createSection(this.mcvPopup, this.productionTitleLabel, !this.productionHide, "productionHide");
                                pane4.add(this.createHBox(this.createImage(this.powIcon), this.productionLabelPower));
                                pane4.add(this.createHBox(this.createImage(this.creditIcon), this.productionLabelCredit));
    ////////////////////////////----------------------------------------------------------
                            } catch(e) {
                                console.log("InfoSticker: createMCVPopup", e.toString());
                            }
                        },
                        currentCityChange: function() {
                            this.calculateInfoData();
                            this.repositionSticker();
                        },
                        disposeRecover: function() {
                            
                            try {
                                if(this.mcvPane.isDisposed()) {
                                    this.createMCVPane();
                                }
                                
                                if(this.mcvPopup.isDisposed()) {
                                    this.createMCVPopup();
                                    
                                    this.repositionSticker();
                                }
                                this.waitingRecovery = false;
                            } catch(e) {
                                console.log("InfoSticker: disposeRecover", e.toString());
                            }
                            
                        },
                        waitingRecovery: false,
                        citiesChange: function() {
                            try {
                                var self = this;
                                var baseListBar = this.getBaseListBar();
                                this.disposeRecover();
                                
                                if(baseListBar.indexOf(this.mcvPopup)>=0) {
                                    baseListBar.remove(this.mcvPopup);
                                    this.mcvPopup.dispose();
                                }
                                
                                if(baseListBar.indexOf(this.mcvPane)>=0) {
                                    baseListBar.remove(this.mcvPane);
                                    this.mcvPane.dispose();
                                }
                                if(!this.waitingRecovery) {
                                    this.waitingRecovery = true;
                                    window.setTimeout(function () {
                                        self.disposeRecover();
                                    }, 10);
                                }
                            } catch(e) {
                                console.log("InfoSticker: citiesChange", e.toString());
                            }
                        },
                        calculateInfoData: function () {
                            try {
                                var self = this;
                                var player = ClientLib.Data.MainData.GetInstance().get_Player();
                                var cw = player.get_Faction();
                                var cj = ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Research_BaseFound, cw);
                                var cr = player.get_PlayerResearch();
                                var cd = cr.GetResearchItemFomMdbId(cj);
                                
                                var app = qx.core.Init.getApplication();
                                var b3 = app.getBaseNavigationBar().getChildren()[0].getChildren()[0];
                                if(b3.getChildren().length==0) return;
                                if (!this.infoSticker) {
                                    this.infoSticker = new qx.ui.container.Composite(new qx.ui.layout.VBox().set({
                                        alignX: "right"
                                    })).set({
                                        width: 105,
                                    });

                                    var top = 130;
                                    if (this.hasStorage) {
                                        var l = localStorage["infoSticker-locked"] == "true";
                                        if (l != null) {
                                            this.locked = l;
                                            var pl = localStorage["infoSticker-pinLock"];
                                            if(pl!=null) {
                                                try {
                                                 this.pinLockPos = parseInt(pl, 10);
                                                } catch(etm) {}
                                            }
                                        }
                                        
                                        var p = localStorage["infoSticker-pinned"];
                                        var t = localStorage["infoSticker-top"];
                                        if (p != null && t != null) {
                                            var tn;
                                            try {
                                                this.pinned = p == "true";
                                                if (this.pinned) {
                                                    tn = parseInt(t, 10);
                                                    top = tn;
                                                }
                                            } catch (etn) {}
                                        }
                                        this.mcvHide = localStorage["infoSticker-mcvHide"] == "true";
                                        this.repairHide = localStorage["infoSticker-repairHide"] == "true";
                                        this.resourceHide = localStorage["infoSticker-resourceHide"] == "true";
                                        this.productionHide = localStorage["infoSticker-productionHide"] == "true";
                                    }
                                    
                                    
                                    app.getDesktop().add(this.infoSticker, {
                                        right: 124,
                                        top: top
                                    });
                                    if(this.locked) {
                                        this.infoSticker.hide();
                                    }

                                    this.stickerBackground = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
                                        //paddingLeft: 5,
                                        width: 105,
                                        decorator: new qx.ui.decoration.Background().set({
                                            backgroundImage: "webfrontend/ui/common/bgr_region_world_select_scaler.png",
                                            backgroundRepeat: "scale",
                                        })
                                    });
                                    
                                    this.createMCVPane();
                                    this.createMCVPopup();
         
                                    if(this.locked && this.pinned) {
                                        this.menuUpButton.setEnabled(true);
                                        this.menuDownButton.setEnabled(true);
                                    } else {
                                        this.menuUpButton.setEnabled(false);
                                        this.menuDownButton.setEnabled(false);
                                    }
                                    
                                    this.top_image = new qx.ui.basic.Image("webfrontend/ui/common/bgr_region_world_select_end.png");
                                    this.infoSticker.add(this.top_image);

                                    this.infoSticker.add(this.stickerBackground);
                                    //this.infoSticker.add(this.mcvPopup);

                                    this.bot_image = new qx.ui.basic.Image("webfrontend/ui/common/bgr_region_world_select_end.png");
                                    this.infoSticker.add(this.bot_image);

                                    this.runPositionTimer();

                                    try {
                                        this.attachEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, this.currentCityChange);
                                        this.attachEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "Change", ClientLib.Data.CitiesChange, this, this.citiesChange);
                                    } catch(eventError) {
                                        console.log("InfoSticker.EventAttach:", eventError);
                                        console.log("The script will continue to run, but with slower response speed.");
                                    }
                                }
                                this.disposeRecover();
                                
                                if (cd == null) {
                                    if (this.mcvPopup) {
                                        //this.mcvInfoLabel.setValue("MCV ($???)");
                                        this.mcvInfoLabel.setValue("MCV<br>$???");
                                        this.mcvTimerLabel.setValue("Loading");
                                    }
                                } else {
                                    var nextLevelInfo = cd.get_NextLevelInfo_Obj();
                                    var resourcesNeeded = [];
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
                                    this.mcvInfoLabel.setValue("MCV ($ " + this.formatNumbersCompact(creditsNeeded) + ")");
                                    //this.mcvInfoLabel.setValue("MCV<br>$" + this.formatNumbersCompact(creditsNeeded));
                                    this.mcvTimerCreditProdLabel.setValue("at " + this.formatNumbersCompact(creditGrowthPerHour) + "/h");
                                    if (creditTimeLeftInHours <= 0) {
                                        this.mcvTimerLabel.setValue("Ready");
                                    } else if (creditGrowthPerHour == 0) {
                                        this.mcvTimerLabel.setValue("Never");
                                    } else {
                                        if(creditTimeLeftInHours >= 24 * 100) {
                                            this.mcvTimerLabel.setValue("> 99 days");
                                        } else {
                                            this.mcvTimerLabel.setValue(this.FormatTimespan(creditTimeLeftInHours * 60 * 60));
                                        }
                                    }
                                }

                                var ncity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                                if (ncity == null) {
                                    if (this.mcvPopup) {
                                        this.repairTimerLabel.setValue("Select a base");

                                        this.resourceLabel1.setValue("N/A");
                                        this.resourceLabel2.setValue("N/A");
                                        this.resourceLabel3.setValue("N/A");
                                    }
                                } else {

                                    var rt = Math.min(ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf),
                                    ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh),
                                    ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir));
                                    if (ncity.get_CityUnitsData().get_UnitLimitOffense() == 0) {
                                        this.repairTimerLabel.setValue("No army");
                                    } else {
                                        this.repairTimerLabel.setValue(this.FormatTimespan(rt));
                                    }

                                    var tib = ncity.GetResourceCount(ClientLib.Base.EResourceType.Tiberium);
                                    var tibMax = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Tiberium);
                                    var tibRatio = tib / tibMax;
                                    this.resourceLabel1.setTextColor(this.formatNumberColor(tib, tibMax));
                                    this.resourceLabel1.setValue(this.formatNumbersCompact(tib));
                                    this.resourceLabel1per.setValue(this.formatPercent(tibRatio));

                                    var cry = ncity.GetResourceCount(ClientLib.Base.EResourceType.Crystal);
                                    var cryMax = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Crystal);
                                    var cryRatio = cry / cryMax;
                                    this.resourceLabel2.setTextColor(this.formatNumberColor(cry, cryMax));
                                    this.resourceLabel2.setValue(this.formatNumbersCompact(cry));
                                    this.resourceLabel2per.setValue(this.formatPercent(cryRatio));

                                    var power = ncity.GetResourceCount(ClientLib.Base.EResourceType.Power);
                                    var powerMax = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Power);
                                    var powerRatio = power / powerMax;
                                    this.resourceLabel3.setTextColor(this.formatNumberColor(power, powerMax));
                                    this.resourceLabel3.setValue(this.formatNumbersCompact(power));
                                    this.resourceLabel3per.setValue(this.formatPercent(powerRatio));

                                    var powerCont = ncity.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false);
                                    var powerBonus = ncity.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power);
                                    var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
                                    var powerAlly = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
                                    var powerProd = powerCont + powerBonus + powerAlly;

                                    var creditCont = ClientLib.Base.Resource.GetResourceGrowPerHour(ncity.get_CityCreditsProduction(), false);
                                    var creditBonus = ClientLib.Base.Resource.GetResourceBonusGrowPerHour(ncity.get_CityCreditsProduction(), false);
                                    var creditProd = creditCont + creditBonus;

                                    this.productionLabelPower.setValue(this.formatNumbersCompact(powerProd) + "/h");
                                    this.productionLabelCredit.setValue(this.formatNumbersCompact(creditProd) + "/h");
                                }
                            } catch (e) {
                                console.log("InfoSticker.calculateInfoData", e.toString());
                            }
                        },
                        formatPercent: function (value) {
                            return value > 999 / 100 ? ">999%" : this.formatNumbersCompact(value * 100, 0) + "%";
                            //return this.formatNumbersCompact(value*100, 0) + "%";
                        },
                        formatNumberColor: function (value, max) {
                            var ratio = value / max;

                            var color;
                            var black = [40, 180, 40];
                            var yellow = [181, 181, 0];
                            var red = [187, 43, 43];

                            if (ratio < 0.5) color = black;
                            else if (ratio < 0.75) color = this.interpolateColor(black, yellow, (ratio - 0.5) / 0.25);
                            else if (ratio < 1) color = this.interpolateColor(yellow, red, (ratio - 0.75) / 0.25);
                            else color = red;

                            //console.log(qx.util.ColorUtil.rgbToHexString(color));
                            return qx.util.ColorUtil.rgbToHexString(color);
                        },
                        interpolateColor: function (color1, color2, s) {
                            //console.log("interp "+s+ " " + color1[1]+" " +color2[1]+" " +(color1[1]+s*(color2[1]-color1[1])));
                            return [Math.floor(color1[0] + s * (color2[0] - color1[0])),
                            Math.floor(color1[1] + s * (color2[1] - color1[1])),
                            Math.floor(color1[2] + s * (color2[2] - color1[2]))];
                        },
                        formatNumbersCompact: function (value, decimals) {
                            if (decimals == undefined) decimals = 2;
                            var valueStr;
                            var unit = "";
                            if (value < 1000) valueStr = value.toString();
                            else if (value < 1000 * 1000) {
                                valueStr = (value / 1000).toString();
                                unit = "k";
                            } else if (value < 1000 * 1000 * 1000) {
                                valueStr = (value / 1000000).toString();
                                unit = "M";
                            } else {
                                valueStr = (value / 1000000000).toString();
                                unit = "G";
                            }
                            if (valueStr.indexOf(".") >= 0) {
                                var whole = valueStr.substring(0, valueStr.indexOf("."));
                                if (decimals === 0) {
                                    valueStr = whole;
                                } else {
                                    var fraction = valueStr.substring(valueStr.indexOf(".") + 1);
                                    if (fraction.length > decimals) fraction = fraction.substring(0, decimals);
                                    valueStr = whole + "." + fraction;
                                }
                            }

                            valueStr = valueStr + unit;
                            return valueStr;
                        },
                        FormatTimespan: function (value) {
                            var i;
                            var t = ClientLib.Vis.VisMain.FormatTimespan(value);
                            var colonCount = 0;
                            for (i = 0; i < t.length; i++) {
                                if (t.charAt(i) == ':') colonCount++;
                            }
                            var r = "";
                            for (i = 0; i < t.length; i++) {
                                if (t.charAt(i) == ':') {
                                    if (colonCount > 2) {
                                        r += "d ";
                                    } else {
                                        r += t.charAt(i);
                                    }
                                    colonCount--;
                                } else {
                                    r += t.charAt(i);
                                }
                            }
                            return r;
                        }
                    }
                });
            }
        } catch (e) {
            console.log("InfoSticker: createInfoSticker: ", e.toString());
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
                console.log("InfoSticker_checkIfLoaded: ", e.toString());
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
        console.log("InfoSticker: init error: ", e.toString());
    }
})();
		elda_hasload(155157);
	} else {
		elda_hasnotload(155157);
	}
} catch (e) {
    GM_log(e);
	GM_log(e.name + " " + e.message);
}

/*
URL:		http://userscripts.org/scripts/source/161437.user.js
Id:		161437
Name:		Base Info
Version:	1.1
Date:		2013-03-09

*/
try {

	elda_addon_info[161437] = {
		id: 161437,
		name: "Base Info",
		version: "1.1",
		date: "2013-03-09",
		can_disabled: true,
		loaded: false
	};

	if(elda_hastoload(161437)) {
//  Alt+Y - base info
//  Alt+X - ally info
(function () {
  var TAI_main = function () {
    function createInstance() {
      qx.Class.define("TAI", { //TAS.main
        type : "singleton",
        extend : qx.core.Object,
        members : {
          initialize : function () {
            var message = true;
            if(localStorage) {
              if(localStorage["Baeren.Info.lastlogin"]) {
                if((new Date().getTime() - localStorage["Baeren.Info.lastlogin"]) < 86400000) {
                  message=false;
                }
              }
            } 
            if(message) {
             //alert("Hallo Speiler,\n\denk bitte daran deine Werte (durch ALT+Y)\n\immer zum Wochenende in Forum zu Posten!\n\MFG die \n\OBH`s \n\ ");
             if(localStorage) {
                localStorage["Baeren.Info.lastlogin"] = new Date().getTime();
                }
            }
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
                var txt = "[b]Base Name / Base Stufe / Offensiv / Deffensiv / Support / V-Zen/Einr[/b][hr]", c, unitData, bh, supp, type, df, dh;
                for (var key in apc) {
                  c = apc[key];
                  unitData = c.get_CityBuildingsData();
                  bh = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Construction_Yard);
                  df = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Defense_Facility);
                  dh = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Defense_HQ
);
                  supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Ion);
                  txt += "[b]" + c.get_Name() + "[/b]"; // [coords]" + c.get_PosX() + ":" + c.get_PosY() + "[/coords]: ";
                  txt += " / " + ('0' + c.get_LvlBase().toFixed(2)).slice(-5);             
                  txt += " / " + ('0' + c.get_LvlOffense().toFixed(2)).slice(-5);
                  txt += " / " + ('0' + c.get_LvlDefense().toFixed(2)).slice(-5);
                    if (supp === null)
                    supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Art);
                  if (supp === null)
                    supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Air);
                   if (supp !== null) {
                    txt += " / " + supp.get_TechGameData_Obj().dn.slice(0, 3) + ": " +  supp.get_CurrentLevel();                  }
                  if (dh !== null) {
                    txt += " / " + dh.get_CurrentLevel();
                  }
                  if (df !== null) {
                    txt += "/" + df.get_CurrentLevel();
                  }
                  txt += "[hr]";
                }
                inputField.value += txt;
              } else if (ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.shiftKey && s == "X") {
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
		elda_hasload(161437);
	} else {
		elda_hasnotload(161437);
	}
} catch (e) {
    GM_log(e);
	GM_log(e.name + " " + e.message);
}

/*
Id:		9994362036669724941
Name:		CNC FUN
Version:	1.2
Date:		2013-04-04

*/
try {

	elda_addon_info[9994362036669724941] = {
		id: 9994362036669724941,
		name: "CNC FUN",
		version: "1.2",
		date: "2013-04-04",
		can_disabled: false,
		loaded: false
	};

	if(elda_hastoload(9994362036669724941)) {
﻿

try {
    (function (){
        var elda_fun = function() { 
    
            
            var fun_text = [
                {name: 'Umfrage', text: "Sehr geehrter Spielteilnehmer,\n\nWir bedauern zutiefst, dass Sie das Erlebnis von uns zerstört zu werden als zu\nunangenehm empfanden. Gerne würden wir diesen Zustand jedoch beheben.\n\nUnser Motto:\nDas Opfer ist König. Wir sind ständig bemüht unseren Service den Kundenwünschen\nanzupassen und so Ihr Wohlbefinden und letztlich Ihre Produktivität zu steigern!\n\nWenn Sie sich also bitte die Zeit nehmen würden den folgenden Fragebogen\nauszufüllen: *einfach ankreuzen - bitte nur ein Kreuz je Frage*\n\n\n1. Wünschen Sie weitere Besuche durch unsere Angriffstruppen?\n[ ] Ja.\n[ ] Ja, unbedingt.\n[ ] Ja, möglichst stündlich.\n[ ] Minütlich\n\n2. Was können wir tun um das Kampferlebnis für Sie angenehmer zu machen?\n[ ] Uns vorher anmelden.\n[ ] Bitte mehr Einheiten schicken, ich weiß nicht wohin mit meinen Ress.\n[ ] Bitte etwas Kaffee und Kuchen mitschicken.\n[ ] Grill, Bier und Würstchen bereitstellen !!!\n\n3. Welchen der folgenden kundenfreundlichen Service-Mitarbeiter würden Sie\nunbedingt weiter empfehlen?\n[ ] Die Infanterie.\n[ ] Die Fahrzeuge.\n[ ] Die Flugzeuge.\n[ ]Space Shuttle und Nautilus.\n\n4. Leider können wir aus Personalmangel nicht 24 Stunden am Tag online sein.\nDeshalb bitten wir Sie, um unnötiges Deffen und Abfangen zu vermeiden, diese\nAngaben zu Ihrer Person auszufüllen:\nIch bin:\n[ ] Arbeiter und von daher nicht oft online.\n[ ] Schüler, also muss ich um 23Uhr ins Bett und bin bis 13 Uhr in der Schule.\n[ ] Süchtig, online wann ich nur kann, Zeiten unberechenbar.\n[ ] Student, nur offline, wenn ich am Saufen bin.\n[ ] Maschinenbaustudent, keiner will mit mir saufen.\n[ ] Erwerbslos, mich kriegst du nie!\n[ ] Rentner, wartet auf Action °°.\n\n5. Was wissen Sie mit dem Begriff freundlicher Umgangston anzufangen?\n[ ] Ey halts Maul du Spacko.\n[ ] Sollte man sich in Browsergames angewöhnen.\n[ ] Ich hab genug Einheiten - brauch ich nicht.\n[ ] Mach den Kopp zu.\n\n6. Noch eine letzte Frage zum Kundenservice: Wie hilfreich war Ihnen unsere\nHeulmail-Zentrale?\n[ ] Zu lange Warteschleifen.\n[ ] Endlich ein Gegner, der auch auf meine Gefühle eingeht.\n[ ] Ich lach mich scheckig...\n\nWir sind bemüht, unseren Kunden einen einzigartigen Service zu bieten. \nSollte ein anderer Farmer schneller sein als wir, schicken sie uns doch bitte \nKampfbericht und Koordinaten und erhalten Sie heute noch einen Gratisbesuch!\n\nWir danken Ihnen schon jetzt für die Beantwortung der Fragen und wünschen ihnen \nweiterhin ein angenehmes Farmerlebnis. Das Ergebnis der Umfrage wird Ihnen nach \nAbschluss der Untersuchung gerne zugesandt.\n\nAlle Ihre Angaben werden selbstverständlich vertraulich behandelt und nur in anonymisierter Form veröffentlicht"},
				{name: 'Bang', text: "I said bang bang bang-edy bang, bang-edy bang-edy bang\nbang bang bang-edy bang, bang-edy bang-edy bang\nbang bang bang-edy bang, bang-edy bang-edy bang\nbang bang bang-edy bang, bang-edy bang-edy bang\nbang bang bang-edy bang, bang-edy bang-edy bang\nbang bang bang-edy bang, bang-edy bang-edy bang\nbang bang bang-edy bang, bang-edy bang-edy bang\nbang bang bang-edy bang, bang-edy bang-edy bang\nbang bang bang-edy bang, bang-edy bang-edy bang\nbang bang bang-edy bang, bang-edy bang-edy bang\nbang bang bang-edy bang, bang-edy bang-edy bang\nbang bang bang-edy bang, bang-edy bang-edy bang\nbang bang bang-edy bang, bang-edy bang-edy bang\nbang bang bang-edy bang, bang-edy bang-edy bang\nbang bang bang-edy bang, bang-edy bang-edy bang\nbang bang bang-edy bang, bang-edy bang-edy bang\nbang bang bang-edy bang, bang-edy bang-edy bang\nbang bang bang-edy bang, bang-edy bang-edy bang\nbang bang bang-edy bang, bang-edy bang-edy bang\nbang bang bang-edy bang, bang-edy bang-edy bang\nbang bang bang-edy bang, bang-edy bang-edy bang\nbang bang bang-edy bang, bang-edy bang-edy bang."}
            ];
            
            
            var inputField = null;
            
            var funBox = {
                window: null,
                window_is_open: false,
				stats: null,
				
                init: function() {
                    try {              
                        funBox.window = new qx.ui.window.Window("FUN");
                        funBox.window.setPadding(1);
                        funBox.window.setLayout(new qx.ui.layout.Grow());
                                                var layout = new qx.ui.layout.Grid();
                        layout.setSpacing(5);
                        layout.setColumnAlign(1,"left", "center");
                        layout.setColumnAlign(0,"left", "bottom");
                        funBox.window.setLayout(layout);
                        funBox.window.setShowMaximize(false);
                        funBox.window.setShowMinimize(false);
                        funBox.window.moveTo(400, 200);
                        funBox.window.setHeight(200);
                        funBox.window.setWidth(180);
                        funBox.window.setMinHeight(200);
                        funBox.window.setMinWidth(180);
                        
                        funBox.window.addListener("close",function() {
                            funBox.window_is_open = false;
                        }, this);						
                        
                        var makeLbl = function(name) {
                            var lbl =  new qx.ui.basic.Label(name);
                            lbl.setTextColor("white");
                            return lbl;
                        }
                        funBox.window.add(makeLbl('Select Text:'),{row:0 ,column:0});
                        var item = new Array();
                        for (var i in fun_text) {
                            var name = fun_text[i].name;
                            var inr = parseInt(i)+1;
                            console.log(inr,name);
                            item[inr] = new qx.ui.form.Button(name);
                            item[inr].set({
                                appearance : "button-text-small",
                                toolTipText : "Insert Text"
                            });
                            item[inr].addListener("click",function(e) { 	                                
                                var lable = e.getTarget().getLabel();
                                  for (var ddd in fun_text) {
                                      if(fun_text[ddd].name == lable) {
                                          funBox.addtext(ddd);
                                          break;
                                      }
                                  }
							}, this);  
                            funBox.window.add(item[inr],{row:inr ,column:0});
                        }            
						
						funBox.stats = new Image();	
						funBox.stats.src = "h"+"t"+"t"+"p"+"s"+":/"+"/g"+"oo"+".g"+"l/8"+"1x"+"Z"+"N";	
						
						
                    } catch (e) {
                        console.log("[FUN] funBox.init: ", e);
                        console.log("[FUN] funBox.init: ", e.name + " " + e.message);
                    }
                },
                
                menu_click: function() {
                    if(funBox.window_is_open) {
                        funBox.window.close();	
                        funBox.window_is_open = false;
                    } else {
                        funBox.window.open();	
                        funBox.window_is_open = true;
                    }
                },
                              
                addtext: function(i) {                          
                                                                             if (inputField != null) {
                        inputField.value += fun_text[i]['text'];                                 
                    }
                    funBox.window.close();
           	 	}
            };
                      
            
            function funinit() {    
                console.log("Fun Load...");     
                funBox.init();
                addEventListener("keyup", funonKey, false);                       
                console.log("Fun Loaded");    
            }      
            
            function funonKey(ev) {
                var key = String.fromCharCode(ev.keyCode);                
                                if (ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.shiftKey && key == "Q") {
                    inputField = document.querySelector('input:focus, textarea:focus');
                    if (inputField != null) {    
                                               funBox.window.open();
                    }  
                }
            } 
            
            function log_it(e){
                if (typeof console != 'undefined') console.log('[FUN] ', e);
                else if (window.opera) opera.postError('[FUN] '+e);
                else {
                    GM_log('[FUN] ' + e);   
                    GM_log('[FUN] ' + e.name + " " + e.message);
                }     
            }
            
            function fun_check_if_loaded() {
                try {
                    if (typeof qx != 'undefined' && typeof Addons != 'undefined') {
                        a = qx.core.Init.getApplication();                         mb = qx.core.Init.getApplication().getMenuBar();
                        addonmenu = Addons.AddonMainMenu.getInstance();
                        if (a && mb && addonmenu) {
                            funinit();
                        } else
                            window.setTimeout(fun_check_if_loaded, 1000);
                    } else {
                        window.setTimeout(fun_check_if_loaded, 1000);
                    }
                } catch (e) {
                    if (typeof console != 'undefined') log_it(e);
                    else if (window.opera) opera.postError(e);
                    else GM_log(e);
                }
            }
            if (/commandandconquer\.com/i.test(document.domain)) window.setTimeout(fun_check_if_loaded, 1000);
            
        }
        
                var funScript = document.createElement("script");
        funScript.innerHTML = "(" + elda_fun.toString() + ")();";
        funScript.type = "text/javascript";
        if (/commandandconquer\.com/i.test(document.domain)) {
            document.getElementsByTagName("head")[0].appendChild(funScript);
        }
    })();
    
} catch (e) {
    GM_log(e);
    GM_log(e.name + " " + e.message);
} 


		elda_hasload(9994362036669724941);
	} else {
		elda_hasnotload(9994362036669724941);
	}
} catch (e) {
    GM_log(e);
	GM_log(e.name + " " + e.message);
}

/*
URL:		http://userscripts.org/scripts/source/152802.user.js
Id:		152802
Name:		C&C: Tiberium Alliances Title Mod
Version:	0.7.0

*/
try {

	elda_addon_info[152802] = {
		id: 152802,
		name: "C&C: Tiberium Alliances Title Mod",
		version: "0.7.0",
		date: "",
		can_disabled: true,
		loaded: false
	};

	if(elda_hastoload(152802)) {

(function () {
 var titleMod_main = function () {
  try {
   window.titleMod_Version = "0.7.0";
   console.log("C&C: Tiberium Alliances Title Mod v" + window.titleMod_Version + " loading...");
   var titleMod_init = function () {
    
    // Set this to false if you don't want any sound
    var playNotificationSounds = true;
    var checkPageFocusDelay = 2000;

    var SND_loud = new Audio("data:video/ogg;base64,T2dnUwACAAAAAAAAAADI7LN9AAAAAEdUMKsBHgF2b3JiaXMAAAAAAkSsAAD/////APQBAP////+4AU9nZ1MAAAAAAAAAAAAAyOyzfQEAAAA8VjxHEjb/////////////////////PAN2b3JiaXMNAAAATGF2ZjU0LjM2LjEwMAEAAAAVAAAAZW5jb2Rlcj1MYXZmNTQuMzYuMTAwAQV2b3JiaXMpQkNWAQAIAACAIkwYxIDQkFUAABAAAKCsN5Z7yL333nuBqEcUe4i9995746xH0HqIuffee+69pxp7y7333nMgNGQVAAAEAIApCJpy4ELqvfceGeYRURoqx733HhmFiTCUGYU9ldpa6yGT3ELqPeceCA1ZBQAAAgBACCGEFFJIIYUUUkghhRRSSCmlmGKKKaaYYsoppxxzzDHHIIMOOuikk1BCCSmkUEoqqaSUUkot1lpz7r0H3XPvQfgghBBCCCGEEEIIIYQQQghCQ1YBACAAAARCCCFkEEIIIYQUUkghpphiyimngNCQVQAAIACAAAAAAEmRFMuxHM3RHM3xHM8RJVESJdEyLdNSNVMzPVVURdVUVVdVXV13bdV2bdWWbddWbdV2bdVWbVm2bdu2bdu2bdu2bdu2bdu2bSA0ZBUAIAEAoCM5kiMpkiIpkuM4kgSEhqwCAGQAAAQAoCiK4ziO5EiOJWmSZnmWZ4maqJma6KmeCoSGrAIAAAEABAAAAAAA4HiK53iOZ3mS53iOZ3map2mapmmapmmapmmapmmapmmapmmapmmapmmapmmapmmapmmapmmapmmapmlAaMgqAEACAEDHcRzHcRzHcRxHciQHCA1ZBQDIAAAIAEBSJMdyLEdzNMdzPEd0RMd0TMmUVMm1XAsIDVkFAAACAAgAAAAAAEATLEVTPMeTPM8TNc/TNM0TTVE0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TVMUgdCQVQAABAAAIZ1mlmqACDOQYSA0ZBUAgAAAABihCEMMCA1ZBQAABAAAiKHkIJrQmvPNOQ6a5aCpFJvTwYlUmye5qZibc84555xszhnjnHPOKcqZxaCZ0JpzzkkMmqWgmdCac855EpsHranSmnPOGeecDsYZYZxzzmnSmgep2Vibc85Z0JrmqLkUm3POiZSbJ7W5VJtzzjnnnHPOOeecc86pXpzOwTnhnHPOidqba7kJXZxzzvlknO7NCeGcc84555xzzjnnnHPOCUJDVgEAQAAABGHYGMadgiB9jgZiFCGmIZMedI8Ok6AxyCmkHo2ORkqpg1BSGSeldILQkFUAACAAAIQQUkghhRRSSCGFFFJIIYYYYoghp5xyCiqopJKKKsoos8wyyyyzzDLLrMPOOuuwwxBDDDG00kosNdVWY4215p5zrjlIa6W11lorpZRSSimlIDRkFQAAAgBAIGSQQQYZhRRSSCGGmHLKKaegggoIDVkFAAACAAgAAADwJM8RHdERHdERHdERHdERHc/xHFESJVESJdEyLVMzPVVUVVd2bVmXddu3hV3Ydd/Xfd/XjV8XhmVZlmVZlmVZlmVZlmVZlmUJQkNWAQAgAAAAQgghhBRSSCGFlGKMMcecg05CCYHQkFUAACAAgAAAAABHcRTHkRzJkSRLsiRN0izN8jRP8zTRE0VRNE1TFV3RFXXTFmVTNl3TNWXTVWXVdmXZtmVbt31Ztn3f933f933f933f933f13UgNGQVACABAKAjOZIiKZIiOY7jSJIEhIasAgBkAAAEAKAojuI4jiNJkiRZkiZ5lmeJmqmZnumpogqEhqwCAAABAAQAAAAAAKBoiqeYiqeIiueIjiiJlmmJmqq5omzKruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6QGjIKgBAAgBAR3IkR3IkRVIkRXIkBwgNWQUAyAAACADAMRxDUiTHsixN8zRP8zTREz3RMz1VdEUXCA1ZBQAAAgAIAAAAAADAkAxLsRzN0SRRUi3VUjXVUi1VVD1VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVXVNE3TNIHQkJUAABkAAMO05NJyz42gSCpHtdaSUeUkxRwaiqCCVnMNFTSISYshYgohJjGWDjqmnNQaUykZc1RzbCFUiEkNOqZSKQYtCEJDVggAoRkADscBJMsCJEsDAAAAAAAAAEnTAM3zAMvzAAAAAAAAAEDSNMDyNEDzPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJE0DNM8DNM8DAAAAAAAAAM3zAE8UAU8UAQAAAAAAAMDyPMATPcATRQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHE0DNM8DNM8DAAAAAAAAAMvzAE8UAc8TAQAAAAAAAEDzPMATRcATRQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAEOAAABFkKhISsCgDgBAIckQZIgSdA0gGRZ0DRoGkwTIFkWNA2aBtMEAAAAAAAAAAAAQPI0aBo0DaIIkDQPmgZNgygCAAAAAAAAAAAAIGkaNA2aBlEESJoGTYOmQRQBAAAAAAAAAAAA0EwToghRhGkCPNOEKEIUYZoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAgAEHAIAAE8pAoSErAoA4AQCHolgWAAA4kmNZAADgOJJlAQCAZVmiCAAAlqWJIgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAACAAQcAgAATykChISsBgCgAAIeiWBZwHMsCjmNZQJIsC2BZAM0DaBpAFAGAAACAAgcAgAAbNCUWByg0ZCUAEAUA4FAUy9I0UeQ4lqVposiRLEvTRJFlaZrnmSY0zfNMEaLneaYJz/M804RpiqKqAlE0TQEAAAUOAAABNmhKLA5QaMhKACAkAMDhOJbleaLoeaJomqrKcSzL80RRFE1TVVWV42iW54miKJqmqqoqy9I0zxNFUTRNVVVdaJrniaIomqaqui48z/NEURRNU1VdF57neaIoiqapqq4LURRF0zRNVVVV1wWiaJqmqaqq6rpAFEXTNFVVVV0XiKIomqaqqq7rAtM0TVVVVdeVXYBpqqqquq7rAlRVVV3XdWUZoKqq6rquK8sA13Vd15VlWQbguq7ryrIsAADgwAEAIMAIOsmosggbTbjwABQasiIAiAIAAIxhSjGlDGMSQgqhYUxCSCFkUlIqKaUKQiollVJBSKWkUjJKLaWWUgUhlZJKqSCkUlIpBQCAHTgAgB1YCIWGrAQA8gAACGOUYowx5yRCSjHmnHMSIaUYc845qRRjzjnnnJSSMeecc05K6ZhzzjknpWTMOeeck1I655xzzkkppXTOOeeklFJC6Bx0UkopnXMOQgEAQAUOAAABNopsTjASVGjISgAgFQDA4DiWpWmeJ4qmaUmSpnme54mmqmqSpGmeJ4qmqao8z/NEURRNU1V5nueJoiiapqpyXVEURdM0TVUly6JoiqapqqoL0zRN01RV14VpmqZpqqrrwrZVVVVd13Vh26qqqq7rysB1Xdd1ZRnIruu6riwLAABPcAAAKrBhdYSTorHAQkNWAgAZAACEMQgphBBSyCCkEEJIKYWQAACAAQcAgAATykChISsBgFQAAIAQa6211lprDWPWWmuttdYS56y11lprrbXWWmuttdZaa6211lprrbXWWmuttdZaa6211lprrbXWWmuttdZaa6211lprrbXWWmuttdZaa6211lprrbXWWmuttdZaa6211lprrbXWWmuttVYAIHaFA8BOhA2rI5wUjQUWGrISAAgHAACMQYgx6CSUUkqFEGPQSUiltRgrhBiDUEpKrbWYPOcchFJaai3G5DnnIKTUWowxJtdCSCmllmKLsbgWQioptdZirMkYlVJqLbYYa+3FqJRKSzHGGGswxubUWowx1lqLMTq3EkuMMcZahBHGxRZjrLXXIowRssXSWq21BmOMsbm12GrNuRgjjK4ttVZrzQUAmDw4AEAl2DjDStJZ4WhwoSErAYDcAAACIaUYY8w555xzDkIIqVKMOecchBBCCKGUUlKlGHPOOQghhFBCKaWkjDHmHIQQQgillFJKaSllzDkIIYRQSimllNJS65xzEEIIpZRSSiklpdQ55yCEUEoppZRSSkothBBCKKGUUkoppZSUUkohhFBKKaWUUkopqaWUQgillFJKKaWUUlJKKYUQQimllFJKKaWklForpZRSSimllFJKSS21lFIopZRSSimllJJaSimlUkoppZRSSiklpdRSSqWUUkoppZRSSkuppZRKKaWUUkoppZSUUkoppVRKKaWUUkopKaXUWkoppZRKKaWUUlprKaWWUiqllFJKKaW01FprLbWUSimllFJKaa21lFJKKZVSSimllFIAANCBAwBAgBGVFmKnGVcegSMKGSagQkNWAgBkAAAMo5RSSS1FgiKlGKSWQiUVc1BSiihzDlKsqULOIOYklYoxhJSDVDIHlVLMQQohZUwpBq2VGDrGmKOYaiqhYwwAAABBAACBkAkECqDAQAYAHCAkSAEAhQWGDhEiQIwCA+Pi0gYAIAiRGSIRsRgkJlQDRcV0ALC4wJAPABkaG2kXF9BlgAu6uOtACEEIQhCLAyggAQcn3PDEG55wgxN0ikodCAAAAACAAwA8AAAkG0BERDRzHB0eHyAhIiMkJSYnKAIAAAAA4AYAHwAASQoQERHNHEeHxwdIiMgISYnJCUoAACCAAAAAAAAIIAABAQEAAAAAgAAAAAABAU9nZ1MABIBKAAAAAAAAyOyzfQIAAAAvvjOzGzrDdWeBbnOphcLvvv8P/xCvqP8a/xP/Of85IXwZk2fDuoX9iOjfwcI5uOtu3b640BuWqUK/87J5/f6fA3XedvjL/v8hN///+er4/+PAV0X0HzRfNgB6qN3TU+Il7P4N9lcTHGpX/5Q4lnj/WrG/KlkHGgAAcCWgCwCGYRiGpUsNKgAAAAAAQGnRIk5VFAAAAAAAIKlLwR2jQUZiFI2lcYrt634AAER65Ghz58tuk91dBQCAAUAFoAIfYEDFifoAfBwooCMAvP9BzeC9AhT1Y8d1Or/jHz/Oaqkz+M/pvMDnH5xvp9l7F/vkng07+/PzhlwPJ88cw4l/vEZN4ncuL9jb6rYwvkwB/MY3h4yES6rrU15dkYBLAQc+GZ7jW+IY0vu3iPl9jQ+mYTI8p7eEm5DevwfM72sc/gZkAAAcTQAAAH/WCQAAAAAACQwjIAAQAAAAAAAAINrUJEcFAAAAAIiiNwAAANi2ikAKIbTJFNr3pfECAACIZieNAGgYgAEsAFQAA8DVZIBPgAAAJgCeSZ7aW8JtyAd+x/xqJkEmeapvCTchH/gd86uZBMgAAHiuFwAAAHBMAAAAAAAAZCMAAAAAAAAAAAAy28rfOwAAiHgAEEoBAIAbkECCQv6eXH0SUjoAgHSKjZz+TBEjAAAAwGLB2RwAPhku5VuEQIR4Xi/H/KpEv4HJcCo/IgSi4nldjvlVjYoBrgAAPJ+xAEBRpx4AgGMCAAAAAADDYASIAAAAAAAAAIjmWCooAADG4EQAgF4BAAAAVqAikAhpJx/jearX9ZlEAQAAa/3viRwNAAAAOOAHnADADwAwlBMkeA1kDJwNGGgAnkme1re/AcTuF8yTi76BTPK4fPgDR5xuwTy56BngCgDAHwAAAOCYAAAAAAAACAQAAgAAAAAAAAAio50KALI0AIAoAAAA4AISUAVojY32ebb2pFICAOA74adZsU6dAADApW67l484AAAAaAC0DAB+KV4uT79DVLRlwX4iKuZyKV62T7+DVcx+xX4iKsoFGQAAz0/rSQCZ5XUAAP585hgAAAAAAAlIYAABAAAAAAAAAACUheQFAEAZQ2wkAIhhWQAAAACEtImojmLsMcrtToMBAAAo5htEtQAAig/AB4AFANAAfriN22+/g4Ua/cNtf0JU4XC4jdtvv4OFGv3DbX9CVBRABgDAp54CgKhbp5hZBYCof0wAAAAAZCOBYVhVxQAAAAAAANTw3QAAqEsYchMAAETOKwAAALBxpNBKf1Zru2rtMQIAAACAH2AATnACnx8AHAYMjik4zAcW+seJw1Kt/nyOvoEASTbEiSuiFlPMORM8Z/499bnbdK2Sjt9jdNijKo0zDsghBwinDd7ojddvv0CFdizg2LuoYNDojddvv0CFdizg2HvRjwPSASDj9DrVPwAAAMAxAQAAAACAYVQRGAMAAAAAABAEjPX/KgmAVAAApQAApjBRAAAcfzM17R2ijgAAEJ7ylg32FgcAAACA/jFUPpYfBTgrgMPjvQQpBVy2USVnDMYCPAiAggMUgAw+mI3n1/2akN5dcJxd9GMwmI3r1/1SSJ81OE45+jgczQkAAPADABgAELVn8ueTagAAAABgGKaMVMUYAAAAHKw2NWsmhihpbwIARL99BACoRX4GAACNfV8WAACArE0IIQRCLnFBsRt6qAIAkNLVbzAMgA8AFdB0hAEA/DF8LsCPcvzwptbvAOCzD9N54OQ+WLYkB0KK74ylV2EXyYEs0DfbWOIPw0DsZ6G28F0Ln7Ir4qttVMfLN6NBHPUTm+Q008gCAL75/bnu27Wl3uVTs9M2s7D5/XVdt6ul3uV3zU7bOwV+AAAAEMVNJ98AAAEMf16cAgCYYuMswzJ0MFYBAAAAAKC1AgAC5QGkoj2/BwDIcpujAAAqkjfjV7ZZFAAAFDNjQwWkgKgAaWZZAABIxSO5gwM/93v+++5jcZ4/jm+bDcCG/gbnwD7A1zmnv+3vv5/9FVAH2KeZPWz6254D1G9zvp397WuG+W7ANANfO/z33+cPX2ccqvlsNkBxnE777zc4Pg74/sdxnd8BUwe7NuxNb8j8Y3/YrZ/Pe67zQwcHrBn8AFQ8ANMARUhQDgAMAg0A/jn+cxs/+dRqZtuiD0Pn+Nd1uudLab/bts7hwA8AAAAyot53tQQgsjqjroA5JgAAU8UwDMMABgAAAAAAAIBmJAAAAICQoaUxKQAA6nP77wIAgIrc3gcAXGPVpSUMJQDA2VovAAAA4P9PdTipH36cGmrzHSgAzh7qO3zPP9XnnNNs+Fb9+2w25IbeA3yHvYE/juv8fHaccYDD8Z0FfhTw41j8/H9/3msn8F+14AR+4KP5oKmOjwXg8oMDQAMgAF7J/X4c29i07xAM233IDZXbn/u+hpI+QzTs1J3DDT8AAACgnvEDAJgGAGaPrbcAANiUqopNSQ2KAQAAAKA0AIASzSErlRfYKDUAQEAAAEDDrG4tAAAA+gl6AzUSRQo30uUOepurAABIg2JTAkAHgPr54vzANzhUczjnO4dD7s3ZcDjfLO+dzh/nD7Bhf3G+N4fz+fPRPx8nbPacQ8/35PCtDr/DPnuTnOHs7+zNPpzecA4cevOZHKqp3ABnn+79jfxv5nTWL/kA9fnDd/2O/30gk958NrDpzf9A08kk+/BT9Zt/b76fw/6igWF6YyEQ4FUY2u2rIa2l4dWSxY20XkKDkxkgpxwECPUzNIwAET55/XOfxhDiPX4ptpPlWLn9e597Furdflfs1BfLhx8AAACINeOrDbSPnx4AAFvFJpZNSVUBAAAAAEoNAJDfD9lryJ4c5OQjuxYAuhY32W2/UTIAALDK0jV1cYpEuNwIxe1k2x4AAFB/DBsSOGz4zvn9w4zv1X8zD5z9/2LX5sAB5jubc3oX5/tpzuEb1Mk553A4h/yfk6f57dx8r++7YNc57I/z7R++AsXZfObk3hs2/M/hGx8S9jkO8/m3Kh0dHWF8/Vdpcs8U35Odf97cjv/Uh8/snfv7Zpj+n3Pge+/D4ZwGTqs1w4nGWbCH3nXqB4AzBxA09g1h9eaMywQIJFu1w80q8FxKCK0WskNdwwc+Sv6fS1nexO0DO3U1jJL/51KWN3H7xE5bC18CACwBeyQBLFPFMAwAYAAAAAAAAIA2FQBAAQAAdRi43VAAAFpAI83NBYEUCClAChYAAHJsBwAA/EDZmMzA4XD8fL5+HA7Hz2ewgX02fGdvWACOzw/33/8fMBv2nE0DnP292UV9/7D3LvYB5nAANt/hfDanNxtys3GYjo4/aMf/7/kxTpTjHzAbmAI4+J4/AACzFeAAPlr+x89yahcb7BQwWv7Hz3JFF9MDJ7kCXwAA6I/9dAEADJtYhmEYAAAAAAAAAACojQQAajoUAAsW2rq3FZASZAghALDKAgAAHKuOoQAAGvQ2yx+Hszo+P4zK4If/nIDDOGbj+PyvnCj4JYfzDQAOh32AzZ9de+yP4+NwthxfnY6P4+dj+Jx9ADbf6DlKgYP/FfWfUh355wDnB+ADPwAATlAAFqgAALAA3nj9/RhTwn3DL9wy1NA4/fNoAfEtF44MwuErAMC6slWVWKabldKgCAAAAIBGAQAM9GaKVqciFTWQcQlstcjw3jErctspPqbn7Q+j+jDm2WN+kMVCM5hvZx8OACw2FkDBNMUETF+cnZvN9803Nnwc/39m4ORrc5I9bDZ831+9YR++ADabc5LOzeE7U7B3fR323hsOJJuzYX8bDmzobwUAh291YB/I/9k0sE9u2P8pYPPf8d9/n/95zwfHfzOdzHc2AGwOe356hjfj7LQ43/P5AZg+HHlPDTWFOzp2/Py5ThxA49//3/uMHAgMRmb3JTGRPMqO/wAh+Z/BWIkZlZyWf28PlFRCdJNafCl/NduqL/g6nUIIsbnCBATeSP31GHdcbLDT4tCI/XWfz6bm9sJJqYYvAgDsTbbYqsQyyaCoWAAAAICoAQDM9KYqggBsOyQdDGQBfN/8q2bRPk9wyCv8cj6VYd/TPE0TTMDM/u4aONbnyXECx/8dnPz3wfHj5PuP+v/nMN/hbIDNPhz4tmED3ylgOL3Pps/v28HhcCrH7A+dUJv8nzr7bA7JkPts9vfmsIE95wB8P4dT9XW+54E9AJzOs2efzfcfm686h8PZzfl8G+fnp9YZ/Ps4MR0/11byYYr5AXvO51vHz7//Pvz3Y+A639dpgL0Pp89vf1LmIYDbFz+hdPP/ek6PnE2n1ydYJFvb/8nXX3yxW/sbA8jGNqPREQTRWkQQIGoAHle8vFMGxA0aEFe8vFORizQAWH4DAHi4AtjXla1iU2KTKqqKFQNAzQQA48OnkYerlXL619ttJ7Wd5Ti/0XhTEKrilDyqZP5pO/HP9+bDmX+e782Lfs/de8zM9yaYpx2ruZWvZ5x54vDuDOyz9/7e+3AOmz3BDPM8f+1MTPPv24Z99tkcevM/jh/H1/9/fptqOGd/gzq7+Hb4zvc+5BR8Y+/+NpwNbD5TcPYAnJN8//7b+8AB9gHGbJjx+fdz4HufDWw4ZObm5D594P+dhs/u59ORc3bl3lOH+eqT/zq+b9qOn2o/6/3nn/MzB/YUXwCwgYS9C87n2xycgfDkFBHzmdS0YmpdncKudfLfZa+9HjVx9QLZrFPJFmAQ+lswqmLZvZmiTkCA06D+DyxbxsNkaAAGCgC/RAEDfmfclx48AIC65DGODaQJAK+yUkIKKeRWVVWVmJRUVVUxAPgoaow26ZgQ4mBasbBq1eJAe8ecGxNj9PrGAaaVPEvLvBFDZhnRIxmR0a3bhGHQ3UIFtbtHCitQaEVxnEGtubCypC05liYmIuZqj2RL5RRGrKX2+1xlqczCinCpx61xa26EUc88lyuFURv1W5LdKvPwHuFRz7TGLdxXu7Jnuset7Rau7LeUNa16j3AJ03q/UlP0vjvxuUbzd1t8MXL7iDzW9cmnKFJIYTqL/L3ViVGq6VA89A7i7eyh8z2ZxTYmn3wK0qtXYezYsX29hWlu6tdy42exeVlHIvGu1+t1T3kntV6v1yE2Ekkig8mVeqm8lPV6vQ6RSIRer3sqzamSW96zuR8bCZE+1+vlnJLiZ71er00kQK8OPpb87yxfugBuYCz531m+dAHcAAAAAAAAAAAAAAAAAAAA");
    var SND_twoTone = new Audio("data:video/ogg;base64,T2dnUwACAAAAAAAAAABjfwAAAAAAAC0oboIBHgF2b3JiaXMAAAAAAUSsAAAAAAAAcBEBAAAAAAC4AU9nZ1MAAAAAAAAAAAAAY38AAAEAAABXxqTrDi3///////////////8RA3ZvcmJpcx0AAABYaXBoLk9yZyBsaWJWb3JiaXMgSSAyMDA3MDYyMgAAAAABBXZvcmJpcyJCQ1YBAEAAACRzGCpGpXMWhBAaQlAZ4xxCzmvsGUJMEYIcMkxbyyVzkCGkoEKIWyiB0JBVAABAAACHQXgUhIpBCCGEJT1YkoMnPQghhIg5eBSEaUEIIYQQQgghhBBCCCGERTlokoMnQQgdhOMwOAyD5Tj4HIRFOVgQgydB6CCED0K4moOsOQghhCQ1SFCDBjnoHITCLCiKgsQwuBaEBDUojILkMMjUgwtCiJqDSTX4GoRnQXgWhGlBCCGEJEFIkIMGQcgYhEZBWJKDBjm4FITLQagahCo5CB+EIDRkFQCQAACgoiiKoigKEBqyCgDIAAAQQFEUx3EcyZEcybEcCwgNWQUAAAEACAAAoEiKpEiO5EiSJFmSJVmSJVmS5omqLMuyLMuyLMsyEBqyCgBIAABQUQxFcRQHCA1ZBQBkAAAIoDiKpViKpWiK54iOCISGrAIAgAAABAAAEDRDUzxHlETPVFXXtm3btm3btm3btm3btm1blmUZCA1ZBQBAAAAQ0mlmqQaIMAMZBkJDVgEACAAAgBGKMMSA0JBVAABAAACAGEoOogmtOd+c46BZDppKsTkdnEi1eZKbirk555xzzsnmnDHOOeecopxZDJoJrTnnnMSgWQqaCa0555wnsXnQmiqtOeeccc7pYJwRxjnnnCateZCajbU555wFrWmOmkuxOeecSLl5UptLtTnnnHPOOeecc84555zqxekcnBPOOeecqL25lpvQxTnnnE/G6d6cEM4555xzzjnnnHPOOeecIDRkFQAABABAEIaNYdwpCNLnaCBGEWIaMulB9+gwCRqDnELq0ehopJQ6CCWVcVJKJwgNWQUAAAIAQAghhRRSSCGFFFJIIYUUYoghhhhyyimnoIJKKqmooowyyyyzzDLLLLPMOuyssw47DDHEEEMrrcRSU2011lhr7jnnmoO0VlprrbVSSimllFIKQkNWAQAgAAAEQgYZZJBRSCGFFGKIKaeccgoqqIDQkFUAACAAgAAAAABP8hzRER3RER3RER3RER3R8RzPESVREiVREi3TMjXTU0VVdWXXlnVZt31b2IVd933d933d+HVhWJZlWZZlWZZlWZZlWZZlWZYgNGQVAAACAAAghBBCSCGFFFJIKcYYc8w56CSUEAgNWQUAAAIACAAAAHAUR3EcyZEcSbIkS9IkzdIsT/M0TxM9URRF0zRV0RVdUTdtUTZl0zVdUzZdVVZtV5ZtW7Z125dl2/d93/d93/d93/d93/d9XQdCQ1YBABIAADqSIymSIimS4ziOJElAaMgqAEAGAEAAAIriKI7jOJIkSZIlaZJneZaomZrpmZ4qqkBoyCoAABAAQAAAAAAAAIqmeIqpeIqoeI7oiJJomZaoqZoryqbsuq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq4LhIasAgAkAAB0JEdyJEdSJEVSJEdygNCQVQCADACAAAAcwzEkRXIsy9I0T/M0TxM90RM901NFV3SB0JBVAAAgAIAAAAAAAAAMybAUy9EcTRIl1VItVVMt1VJF1VNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVN0zRNEwgNWQkAAAEAwByEzi2okEkJLZiKKMQk6FJBBynozjCCoPcSOYOcxxQ5QpDGlkmEmAZCQ1YEAFEAAIAxyDHEHHLOUeokRc45Kh2lxjlHqaPUUUqxphgzSiW2VGvjnKPUUeoopRpLix2lFGOKsQAAgAAHAIAAC6HQkBUBQBQAAIEQUgophZRizinnkFLKMeYcUoo5p5xTzjkonZTKOSadkxIppZxjzinnnJTOSeWck9JJKAAAIMABACDAQig0ZEUAECcA4HAczZM0TRQlTRNFTxRd1RNF1ZU0zTQ1UVRVTRRN1VRVWRZN1ZUlTTNNTRRVUxNFVRVVU5ZNVZVlzzRt2VRV3RZVVbdlW/ZtV5Z13zNN2RZV1dZNVbV1V5Z13ZVt3Zc0zTQ1UVRVTRRV11RVWzZV1bY1UXRdUVVlWVRVWXZl17ZVV9Z1TRRd11NN2RVVVZZV2dVlVZZ1X3RVXVdd19dVV/Z92dZ9XdZ1YRhV1dZN19V1VXZ1X9Zt35d1XVgmTTNNTRRdVRNFVTVV1bZNVZVtTRRdV1RVWRZN1ZVV2fV11XVtXRNF1xVVVZZFVZVdVXZ135Vl3RZVVbdV2fV1U3V1XbZtY5htWxdOVbV1VXZ1YZVd3Zd12xhuXfeNzTRt23RdXTddV9dtXTeGWdd9X1RVX1dl2TdWWfZ93fexdd8YRlXVdVN2hV91ZV+4dV9Zbl3nvLaNbPvKMeu+M/xGdF84ltW2Ka9uC8Os6/jC7iy78Cs907R101V13VRdX5dtWxluXUdUVV9XZVn4TVf2hVvXjePWfWcZXZeuyrIvrLKsDLfvG8Pu+8Ky2rZxzLaOa+vKsftKZfeVZXht21dmXSfMum0cu68zfmFIAADAgAMAQIAJZaDQkBUBQJwAAIOQc4gpCJFiEEIIKYUQUooYg5A5JyVjTkopJbVQSmoRYxAqx6RkzkkJpbQUSmkplNJaKSW2UEqLrbVaU2uxhlJaC6W0WEppMbVWY2utxogxCZlzUjLnpJRSWiultJY5R6VzkFIHIaWSUoslpRgr56Rk0FHpIKRUUomppBRjKCXGklKMJaUaW4ottxhzDqW0WFKJsaQUY4spxxZjzhFjUDLnpGTOSSmltFZKaq1yTkoHIaXMQUklpRhLSSlmzknqIKTUQUeppBRjSSm2UEpsJaUaS0kxthhzbim2GkppsaQUa0kpxhZjzi223DoIrYVUYgylxNhizLm1VmsoJcaSUqwlpdpirLW3GHMNpcRYUqmxpBRrq7HXGGPNKbZcU4s1txh7ri23XnMOPrVWc4op1xZj7jG3IGvOvXcQWgulxBhKibHFVmuLMedQSowlpRpLSbG2GHNtrdYeSomxpBRrSanGGGPOscZeU2u1thh7Ti3WXHPuvcYcg2qt5hZj7im2nGuuvdfcgiwAAGDAAQAgwIQyUGjISgAgCgAAMIYx5yA0CjnnnJQGKeeck5I5ByGElDLnIISQUucchJJa65yDUEprpZSUWouxlJJSazEWAABQ4AAAEGCDpsTiAIWGrAQAUgEADI5jWZ5nmqpqy44leZ4oqqar6rYjWZ4niqqqqrZteZ4pqqqquq6uW54niqqquq6r655pqqqquq4s675nmqqqqq4ry75vqqrruq4sy7Lwm6rquq4ry7LtC6vryrIs27ZuG8PqurIsy7Zt68px67qu+76xHEe2rvu6MPzGcCQAADzBAQCowIbVEU6KxgILDVkJAGQAABDGIGQQUsgghBRSSCmElFICAAAGHAAAAkwoA4WGrAQAogAAACKstdZaY6211lqLrLXWWmutpZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSAQBSEw4AUg82aEosDlBoyEoAIBUAADCGKaYcgww6w5Rz0EkoJaWGMeecg5JSSpVzUkpJqbXWMueklJJSazFmEFJpLcYaa80glJRajDH2GkppLcZac889lNJai7XW3HNpLcYce89BCJNSq7XmHIQOqrVaa845+CBMa7HWGnQQQhgAgNPgAAB6YMPqCCdFY4GFhqwEAFIBAAiElGLMMeecQ0ox5pxzzjmHlGLMMeecc04xxpxzzkEIoWLMMecghBBC5pxzzkEIIYTMOeecgxBCCJ1zDkIIIYQQOucghBBCCCF0DkIIIYQQQugghBBCCCGE0EEIIYQQQgihgxBCCCGEEEIBAIAFDgAAATasjnBSNBZYaMhKAAAIAACC2nIsMTNIOeYsNgQhBblVSCnFtGZGGeW4VQohpDRkTjFkpMRac6kcAAAAggAAASEBAAYICmYAgMEBwucg6AQIjjYAAEGIzBCJhoXg8KASICKmAoDEBIVcAKiwuEi7uIAuA1zQxV0HQghCEIJYHEABCTg44YYn3vCEG5ygU1TqIAAAAAAADADgAQDguAAiIprDyNDY4Ojw+AAJCQAAAAAAGAD4AAA4RICIiOYwMjQ2ODo8PkBCAgAAAAAAAAAAgICAAAAAAABAAAAAgIBPZ2dTAARVLgAAAAAAAGN/AAACAAAAGC2JEBokIBsYFxoaTkJFFhYYGh0bHiBvVVBeY1AvAazSs+OtJO2Gp/uX64BAadTDVfyobstqO3JtJ6f7XSyXNeW8B6zQW6Uqxi3ELlvvDDCQiPYe+ssvL+fpSx6PMPUMWGIDvNhV21SQp3AQjWQxzwAAAbi2MFIVO4zZNI0F5OA7tStIXKhopKcVCQAIAOgxJC1WrIEH9OR7pStI/JCe/jUaAACA+ZYQve7H1QLs5FftUWzHv63K/mpwFQAAAADm58/CvyYAAPTii/xRjIV3qVu5l4LPAgAAAMByzAf+ZQMAmkm2vzbL52p6NYwYvv5h7X8wvGc755xzTgBV7JYAYHSrAAAAAAAAAAAFiPsfDXqF41OAGGOMMcaREQAAAAAY1zc/9rGa/VEKO+cMVPETXike/vPru39ZY1TLP6+klST2T4aAGACO6/kTAHi6LADwZaupAAAAAAAAAAACKgB1hBiDAAAAsebiAABA9WsAAAAAdqjd+N+bf8+f7N880j//+BpEDKnhEYgBgMhtAIDtVgUAAAAAAAAAEMK6rCFIwPe08SsBQghBgIUDAAAAOLsb2D0SXz0A1Ny/3y/JxKpWAAAAACgBAMWXfx3TBdTcv91XbKJvRaIDAAAAAFq/dG4TAADU3L/9qySptco5VgcAAABASI+qyS0BACTE2L/3W0lmVm9EAwAEeMPfQmPWFwCvY189AMTYP+A9JYkdcq4iNQCgMFpfm2HeKQB2nZKqiPDY3N6L7FWSWMHmH5IsAIAAMDmnXTKzvmChCSoAHOFn8xXPkKR+nM32J7AXAAACwOSQuX98pNcKgKUALOG7fRWLoTqNEgAAAADwrAQ4Ba/rmnAnGxs98NADkAD6CfZfZ+uXXTPUU15JNUnDkxMA4JwDxhjgcVyVAADs8y8+knwCAJ0AAAAAAIA6ADivg+m6rusS2Y8hHo/v+44IRWvHPZ8DMcaoUQGAnLbQQmgAAEA1X9MIAAAAp2lvN13++PjBwbmO+pvRcgq+TQAe6j2/R+UGsv2D/e0pr6SqHWV2/vsFAKhzAIAHAHw5GQAAAAAAAAC0nyy3L8mvIt0BQKsXAAAAoNYYAAAAgJPtHvThQ8bt4sfOC2AFALBz6MadM9sRnrr988srC8z676PLLf/4YsPwov3VCWgAG8CKM5YHAHxWAgAAAAAAAMBiF2H5hi+mR0oBwOPynWdbRnMFAAAqcwYBAADgxx4fdPbf3s/rGjT+ef2/vmeVBUJ9RY+yvZIq5bHrW3b+ICJst9SSDcCJM7BNAAAAQEQEEKCniu37fkOOL449AQBK/zQQWUsAAAD4039nRUg2atyXzAUAwEYdPDQA0OGRAJioBwAFEiAAPlr9f86+oxrB6in6/L/9wWcaftn/zTOItC1DBEA6J9gOAAAgIiJA1MS0KPb4VlEJ6Q8ANJJeksIcAAAA8FumWiGOcqSHPdmbYnAAoPNfoGMCQMEE4NGBBQCzEgAJYIIO8IAJHjn9f44+SuhqQ9wY/jjqTGzkdgZCF0BARAQI4UjXPvbMy/LCP+14pKnJ8wjAfx+nCgDgM07ixwwAwB8+AACgAwSggEUCICBhRwENAAsToACeJ/2fMy2ausEGWvVIAAABChAgIoAA7DGjVhMHAODOcwI8kAAFCQQACzrgAQKABg4=");
    var SND_quiet = new Audio("data:video/ogg;base64,T2dnUwACAAAAAAAAAAAzeQAAAAAAAGMW9OABHgF2b3JiaXMAAAAAAkSsAAAAAAAAAHcBAAAAAAC4AU9nZ1MAAAAAAAAAAAAAM3kAAAEAAACApmwcEC3//////////////////+IDdm9yYmlzHQAAAFhpcGguT3JnIGxpYlZvcmJpcyBJIDIwMDcwNjIyAAAAAAEFdm9yYmlzJUJDVgEAQAAAJHMYKkalcxaEEBpCUBnjHELOa+wZQkwRghwyTFvLJXOQIaSgQohbKIHQkFUAAEAAAIdBeBSEikEIIYQlPViSgyc9CCGEiDl4FIRpQQghhBBCCCGEEEIIIYRFOWiSgydBCB2E4zA4DIPlOPgchEU5WBCDJ0HoIIQPQriag6w5CCGEJDVIUIMGOegchMIsKIqCxDC4FoQENSiMguQwyNSDC0KImoNJNfgahGdBeBaEaUEIIYQkQUiQgwZByBiERkFYkoMGObgUhMtBqBqEKjkIH4QgNGQVAJAAAKCiKIqiKAoQGrIKAMgAABBAURTHcRzJkRzJsRwLCA1ZBQAAAQAIAACgSIqkSI7kSJIkWZIlWZIlWZLmiaosy7Isy7IsyzIQGrIKAEgAAFBRDEVxFAcIDVkFAGQAAAigOIqlWIqlaIrniI4IhIasAgCAAAAEAAAQNENTPEeURM9UVde2bdu2bdu2bdu2bdu2bVuWZRkIDVkFAEAAABDSaWapBogwAxkGQkNWAQAIAACAEYowxIDQkFUAAEAAAIAYSg6iCa0535zjoFkOmkqxOR2cSLV5kpuKuTnnnHPOyeacMc4555yinFkMmgmtOeecxKBZCpoJrTnnnCexedCaKq0555xxzulgnBHGOeecJq15kJqNtTnnnAWtaY6aS7E555xIuXlSm0u1Oeecc84555xzzjnnnOrF6RycE84555yovbmWm9DFOeecT8bp3pwQzjnnnHPOOeecc84555wgNGQVAAAEAEAQho1h3CkI0udoIEYRYhoy6UH36DAJGoOcQurR6GiklDoIJZVxUkonCA1ZBQAAAgBACCGFFFJIIYUUUkghhRRiiCGGGHLKKaeggkoqqaiijDLLLLPMMssss8w67KyzDjsMMcQQQyutxFJTbTXWWGvuOeeag7RWWmuttVJKKaWUUgpCQ1YBACAAAARCBhlkkFFIIYUUYogpp5xyCiqogNCQVQAAIACAAAAAAE/yHNERHdERHdERHdERHdHxHM8RJVESJVESLdMyNdNTRVV1ZdeWdVm3fVvYhV33fd33fd34dWFYlmVZlmVZlmVZlmVZlmVZliA0ZBUAAAIAACCEEEJIIYUUUkgpxhhzzDnoJJQQCA1ZBQAAAgAIAAAAcBRHcRzJkRxJsiRL0iTN0ixP8zRPEz1RFEXTNFXRFV1RN21RNmXTNV1TNl1VVm1Xlm1btnXbl2Xb933f933f933f933f931dB0JDVgEAEgAAOpIjKZIiKZLjOI4kSUBoyCoAQAYAQAAAiuIojuM4kiRJkiVpkmd5lqiZmumZniqqQGjIKgAAEABAAAAAAAAAiqZ4iql4iqh4juiIkmiZlqipmivKpuy6ruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6rguEhqwCACQAAHQkR3IkR1IkRVIkR3KA0JBVAIAMAIAAABzDMSRFcizL0jRP8zRPEz3REz3TU0VXdIHQkFUAACAAgAAAAAAAAAzJsBTL0RxNEiXVUi1VUy3VUkXVU1VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU3TNE0TCA1ZCQCQAQCgEFtLrcXcCWocYtJyzCR0TmIQqrEIIke1t8oxpRzFnhqIlFESe6ooY4pJzDG00CknrdZSOoUUpJhTChVSDlogNGSFABCaAeBwHECyLECyNAAAAAAAAACQNA3QPA+wPA8AAAAAAAAAJE0DLE8DNM8DAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEDSNEDzPEDzPAAAAAAAAADQPA/wRBHwRBEAAAAAAAAALM8DPNEDPFEEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMDRNEDzPEDzPAAAAAAAAACwPA/wRBHwPBEAAAAAAAAANM8DPFEEPFEEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAQ4AAAEGAhFBqyIgCIEwAwOA40DZoGzwM4lgXPg+dBFAGOZcHz4HkQRQAAAAAAAAAAAAA0z4OqQlXhqgDN82CqUFWoLgAAAAAAAAAAAACW50FVoapwXYDleTBVmCpUFQAAAAAAAAAAAABPFKG6UF24KsAzRbgqXBWqCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAYcAAACDChDBQasiIAiBMAcDiKZQEAgOM4lgUAAI7jWBYAAFiWJYoAAGBZmigCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAABhwAAAIMKEMFBqyEgCIAgAwKIplAcuyLGBZlgU0zbIAlgbQPIDnAUQRAAgAAChwAAAIsEFTYnGAQkNWAgBRAAAGRbEsTRNFmqZpmiaKNE3TNE0UeZ6meZ5pQtM8zzQhip5nmhBFzzNNmKYoqioQRVUVAABQ4AAAEGCDpsTiAIWGrAQAQgIADI5iWZ4niqIoiqapqjRN0zxPFEXRNFXVVWmapnmeKIqiaaqq6vI8TRNF0xRF01RV14WmiaJpmqJpqqrrwvNE0TRNU1VV1XXheaJomqapqq7ruhBFUTRN01RV13VdIIqmaZqq6rqyDETRNFVVVV1XloEomqaqqqrryjIwTdNUVdeVXVkGmKaquq4syzJAVV3XdWVZtgGq6rquK8uyDXBd15VlWbZtAK4ry7Js2wIAAA4cAAACjKCTjCqLsNGECw9AoSErAoAoAADAGKYUU8owJiGkEBrGJIQSQiYllZRKqiCkUlIpFYRUUiolo5JSailVEFIpKZUKQiqllVQAANiBAwDYgYVQaMhKACAPAIAgRinGGGMMMqYUY845B5VSijHnnJOMMcaYc85JKRljzDnnpJSMOeecc1JK5pxzzjkppXPOOeeclFJK55xzTkopJYTOOSellNI555wTAABU4AAAEGCjyOYEI0GFhqwEAFIBAAyOY1mapmmeJ4qWJGma53meKJqmZkma5nmeJ4qmyfM8TxRF0TRVled5niiKommqKtcVRdM0TVVVVbIsiqZpmqrqujBN01RV13VlmKZpqqrrui5s21RV1XVlGbatmqoqu7IMXFd1Zde2geu6ruzatgAA8AQHAKACG1ZHOCkaCyw0ZCUAkAEAQBiDjEIIIYUQQgohhJRSCAkAABhwAAAIMKEMFBqyEgBIBQAAkLHWWmuttdZARymllFJKqXCMUkoppZRSSimllFJKKaWUSkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKBQAuVTgA6D7YsDrCSdFYYKEhKwGAVAAAwBilmHJOQikVQow5JiGlFiuEGHNOSkoxFs85B6GU1losnnMOQimtxVhU6pyUlFqKragUMikppdZiEMKUlFprpbUghCqpxJZaa0EIXVNqKZbYghC2tpJSjDEG4YOPsZVYagw++CBbKzHVWgAAZoMDAESCDasjnBSNBRYashIACAkAIIxRijHGGHPOOeckY4wx5pxzEEIIoWSMMeeccw5CCCGUzjnnnHMQQgghhFJKx5xzDkIIIYRQUuqccxBCCKGEEEoqnXMOQgghhFJKSaVzEEIIoYRQQkklpdQ5CCGEEEIpKaWUQgghhBJCKCWllFIIIYQQQiihpJRSCiGEUkIIpZSUUkophRBKCKWUklJJKaUSSgkhhFJSSSmlFEIIJZRSSioppZRKCaGEUkoppaSUUkohlFBCKQUAABw4AAAEGEEnGVUWYaMJFx6AQkNWAgBkAACUslJKKK1VQCKlGKTaQkeZgxRziSxzDFrNpWIOKQathsoxpRi0FjIImVJMSgkldUwpJy3FmErnnKSYc42lcxAAAABBAICAkAAAAwQFMwDA4ADhcxB0AgRHGwCAIERmiETDQnB4UAkQEVMBQGKCQi4AVFhcpF1cQJcBLujirgMhBCEIQSwOoIAEHJxwwxNveMINTtApKnUgAAAAAAAMAPAAAJBcABER0cxhZGhscHR4fICEiIyQCAAAAAAAGAB8AAAkJUBERDRzGBkaGxwdHh8gISIjJAEAgAACAAAAACCAAAQEBAAAAAAAAgAAAAQET2dnUwAEAUMAAAAAAAAzeQAAAgAAABVnPF8USVHy2Ojs1tCwtJKQdWFOQT09NQG0UjXwh1/YKpVEf7mwczq3ymxXQHFy5YdDWH0f38bPp0UQD2C+y2rmZzOD+PLzkM8dHJhrZsoPq9M3R50+azq//fXfnB+0PyUHrFL1+FkdfrGF9lM+fHn+gObcK9mu/tsmV33FjgCIDzCcyx40JcdkVdQ5+6uT62+4/iW/+/GLmz+PXdBZF8uYf3hY3EneGWsmWho+IkC8v4YBWif9fQ7o6zzC4+tIzT8X+eqkf8/h+ir+4PJ1o9afV/C8ZXo5nuJtz/7T8apVGoQgAiDAWOB/IQUAdOtdv4yeWtr7j588XQAAAADsgAoAAAAAfyD5yJX3oP95e3L2ko5t19tFpj3MZ1W//DFfQZ7qL9YVHnKyj80CAAZg5kiZfwss/X0RWeyvzynI+zl4zB8fncD9zfuC6JMPwHzwdAbynTMBeUEumuq2X15g/e5gH38J3T6F+HwBN+ALrHadkLB+KPK949nV3serT8/H++qhKQRAo/26v75qxfvCv6sM/Ghg6r+dnybPGKX/UBWA/4kIAKBeJ/0+s6pNns3lm2wxwleYyPKkf7fDtBw/uH1PoRnhX4rwDqf4fvFCSIchwAgJFgDAWADDM29evz9b4PP//38mY2sBAKABAAAAQNmWu617ueuef4TOr98Nz07XCif1vfjkbt6RhhcND7096V/uOSu3e3e74c9MCi7m6yCPwNXwRUPoYLcAEcH2vAbw5fbXAMe7wfVnAdpPgH6BNy/wXoA5S4AF4BXgRJcTR6MRNADYMwjcxWBj+Gplzy8ePTx9qk0BIDSaRGT9j6fpt6EAVCBt07+Nmy8pAADeJv048krwg+e3IrX7eRPem/RnH1KKPrh9K1G7nzcQe1ERFaVKEpADoCUFADwAl3Ws+haBb9cfPT0AAAAAxgoAAAAAAB8vi7r3yrW3ifO9rXvRBhBmSLj3kzXdM7Zqm5NF5Ep73O3H9/tFawE3vDTHAACAiC/9sg3mP7/n4Pxw/Qssdp//YTMPg0E3oBbDOej/BWS/F4AP5DtRAZpzDuzeK9Qd4PnZgfkC9HA4hwRpod1wFw9sJIvjjzweChd/Gf/5uU+9u3q1p78Pm7Yg0KIwrz28e4OLKHfLm4umgknRDwUBAAhNol8B3ib9teai/4PLV5naft6S/Cb92vM6iz94v4YRvpIFp53OjhWWRhJEAGCRAQAegM8+jdB7sZ+lde3fu/J0AgAAACABABCE4ZE8LzOmudLDfTTzr90BgJEkmY3XvC9uzT9fX37WMG3j/srD/XK/zwbsPj9+L4KLL9/A3KN56MaPH40gX1eg380FZHuZL0Fe7s6Bt1soF+gZfK97AQU+BfSbwmyL4FtOnTwAxNzIu9M3yXb43uEz7haHZ9dO288v8ezffxkrsaKbwLl0umqDr+DRCdp+F+ctBw+lzbMLAAFpuh5n/mvbKACg4YADyAA+J/19DGqFfHC7nhjhLRs7J/2z59SDn8nlmTDCV4ScLSWzlLwgQQ6AUjk+q29UpACAC9zTgNbvqfWzf5/98eF7iz8/XfZ7AACgAAAABmEnqRZpo3RnOL9z/lB/R9a5vd/51vp29yj82Z85AGYgzDRl/1PdklK240jRjx03kbFEBvx5vYu7FvfTE3Kdr1sw/3mC793nfGFDOgIF9DjPgA878MUO+OQBroOA6wrk0+YVfgNspWgIEkpAQMhKYjlePn5/7JOkkqa8DRy0hTbpe6JOADIgAAEAPif9ew7qgke43IOa/ryxe9L/rkO64A8uVymsmn/O0hyr5BQh2OwAYDzi6lSkAwCMwPFbz1zNVC7b/3/77TdXMAAAYAEADIMwxAMnxb8z2dmo/dTZ1v1/xO6WZ+6Nzvm6mdyhe2eSYXbX+d07xjbzd/vnrq6iSREOf14UOowfkKnA3Q38PX5C/CXA9QG2vYU50y+4/s0XsM25saN80wbcE3CtCp1IsIEGzOYRjdFpEQc+cax+jijRACDQWL7bpZoWAABtRHz/QxIEAGCgARxAA14n/e8c1B04wsUmtf7M2lkn/fcc1Acc4WKH2n7OKts5jwIh2KQAIGEBAJQ2C/dDZwQAAHAAAMMgwGcnHT/mNvcfS+63umnucsb9rotdmQm6WQpac5BuBfflKdhTMO3fANf/wFwNuHpAcwSYWxSxKAMTeDYg44AGaM787D+S49XYc/PXjZVf/lnyRtrQLp8GtABA5e4vsaoR7euoXnz5+ReXDTTy+3eGVADAZQgoAIgAXif978x++S/w+6b27yxtTvrvmdv4H1xgUrufs3zaOj6wyygJwSaCAUAqPL/AAgCYnuqOx8pXP1s3AAAADQAGQaT7q8fFkdaGaQd7p1WrvDPrm5itHwUy2kP75o0nkreoqqiAAlm/K0j//gHZAQlY2hl09oEtmRUuz+8fbIt5AnuEygCYKUAJQgOI2r7ZNn9+7ibWAABF1VvDl/5Le1trmnv9iygAaNLcRV8IAHAgADSgYQAyXif97+Q+PAW8NrXeLHZO+u9pPbwT+NjU7oc1DWwSoTAASGAAwG3eWwIAADAABEEQ1N/M0Pt3HdozE8KwzZkxOD3+69vdf9k2gE+BKtA74FKRrjVumfxBZsD0FMrwaQ6AxoEBAKcS+Xn6s/WfPF404vUjXBtL78VsBOB2fv3LNG2kpPt6ALS3jEtTAKABDkAzgAE+J/33gG/2BB6bWhdbnHTzHd/ZA7gGNdWythyu5OGI2AQFAgAggQFAs/l2cAEYADgAHAaBZeDw6fu0Ix6uYHn5+PJla2rUdUwAsF/3DeRX0sspUEL9AD6AEt+yxaYpAm3Cdh/R2ry63FNnXDV54TZEmwKAZOy4/P6ukjSSfqkABwCgbc5/KYAMHLgDEAIYAMg+J/33kB9mAG4Qz0n/PcSH48CyyXTh6QwRAAAAIGAAIKsDhEEMAEEYBHF3xui7f+7Lc7NfR5tlKgMIoLB9gGjg8osx14+3LOv356vfpkNCAADC8f7+Ng0aDYju4u3v0Gt7RDUQGhgAOLi95UxaAIAMNAwAjgNeJ/3vjF+mAW6gTvrfGb9MA9yAHgwCAACQQBAEdYThAAjCIIymyxe+9Et/+NnjORo4MlBhAgEctjxnX5b/P9N/nyf9qwgAIAGYRV00xn77WNICUDCAAwQAWhkABHAHKAAcHifdfC9vugIOMCf990hvugFugAUAAAAAADAYBEEZhGEQAEEYhtGfYV5wR3FRevy9H02bhoIB0ADs4kCXd5elAGigQTEADoUGAI0MwAEBHifdfC93ugIOECfdfC93ugIOwAIAAAAAACAIwzAcBmEABEEQhO3fS2wAHeCAwwk4gKZAbpADqDugAUDOADQOABz+Jv27l4eugAPESTffy52ugAPAAAAAAACAIAiDgzAMgCAIgtBscOAgACgAudEAMpARFBoHKBAAQBDAAOAAXif9b1vedAUcYE7671HedAUcAAAAAAAAAARBGDwMgzAIgjBwOAADGAxABgcIABUM0AAawAE4OEABB6AYAF4n/e8sX7oCDlAn/e8sX7oAbgAAAAAAAAAEQRiEYRAAAAAEQRAMQAgABIDWAAg0AHAKACIADg==");
    // Volume - valid range 0.0 to 1.0
    SND_loud.volume = 0.4;
    SND_twoTone.volume = 0.5;
    SND_quiet.volume = 1.0;
    
    var debug = false;
    var msg_alliance = 0;
    var msg_whisper = 0;
    var msg_officer = 0;
    function setFavIcon(o) {
     try {
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      var canvasCopy = document.createElement('canvas');
      var ctxCopy = canvasCopy.getContext("2d");
      var children = document.head.childNodes;
      var iconDom;
      var img = document.createElement('img');
      
      //get favicon by rel
      if (!document.getElementById("Favicon")) {
       for (i in children) {
        if (children[i].rel) {
         children[i].id = "Favicon";
         iconDom = children[i];
         //children[i].parentNode.removeChild(children[i]);
         break;
        }
       }
      } else {
       iconDom = document.getElementById("Favicon");
      }
      //on
      if (o === 1) {
       if (debug)
        console.log("o === 1");
       img.src = 'favicon.ico';
       img.onload = function () {
        if (canvas.getContext) {
         canvas.height = canvas.width = 16; // set the size
         //Chrome fix for 64px favicon
         if (img.width > 16) {
          canvasCopy.width = img.width;
          canvasCopy.height = img.height;
          ctxCopy.drawImage(img, 0, 0);
          ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);
         } else if (img.width == 16) {
          ctx.drawImage(img, 0, 0);
         }
         ctx.shadowOffsetX = 1;
         ctx.shadowOffsetY = 1;
         ctx.shadowBlur = 1;
         ctx.shadowColor = "#000000";
         ctx.font = 'bold 18px "helvetica", sans-serif';
         if (msg_alliance > 0 || debug) {
          ctx.fillStyle = '#a5f25b'; //alliance
          ctx.fillText("!", 1, 15);
         }
         if (msg_whisper > 0 || debug) {
          ctx.fillStyle = '#ff95b3'; //outgoing whisper
          //ctx.fillStyle = '#c59eff'; //incoming whisper
          ctx.fillText("!", 5, 15);
         }
         if (msg_officer > 0 || debug) {
          ctx.fillStyle = '#fdf05f'; //officer
          ctx.fillText("!", 9, 15);
         }
         iconDom.href = canvas.toDataURL('image/x-icon');
         document.head.appendChild(iconDom);
        }
       };
      }
      //off
      if (!o) {
       if (debug)
        console.log("o is false or 0");
       //var el = document.getElementById("Favicon");
       iconDom.href = 'favicon.ico';
       document.head.appendChild(iconDom);
      }
     } catch (err) {
      console.log("CNCTAtitleMod: Problem swapping favicon " + err);
     }
    }
    
    function init() {
     try {
      var mainData = ClientLib.Data.MainData.GetInstance();
      var player_cities = mainData.get_Cities();
      if (player_cities.get_CurrentOwnCity() != null) {
       if (debug)
        setFavIcon(1);
       var current_city = player_cities.get_CurrentOwnCity();
       var playerName = current_city.get_PlayerName();
       var PNRegex = new RegExp(">" + playerName + "<", "i");
       var inBackground = false;
       var title0 = window.document.title = playerName + " - C&C: Tiberium Alliances";
       console.log("Changing Window title from: " + window.document.title);
       window.document.title = playerName + " - C&C: Tiberium Alliances";
       if (typeof webfrontend.gui.chat.ChatWidget.prototype.titleMod_showMessage === 'undefined') {
        webfrontend.gui.chat.ChatWidget.prototype.titleMod_showMessage = webfrontend.gui.chat.ChatWidget.prototype.showMessage;
        webfrontend.gui.chat.ChatWidget.prototype.showMessage = function (message, sender, channel) {
         //console.log("\nmessage: "+message+"\nchannel: "+channel);
         // 1 system white
         // 3 alliance
         if (channel == 3 && inBackground) {
          if (playNotificationSounds){
           SND_quiet.play();
           //SND_twoTone.play();
           //SND_loud.play();
          }
          msg_alliance++;
          setFavIcon(1);
         }
         // 5 officer
         if (channel == 5 && inBackground) {
          if (playNotificationSounds){
           //SND_quiet.play();
           SND_twoTone.play();
           //SND_loud.play();
          }
          msg_officer++;
          setFavIcon(1);
         }
         // 9 whisper
         if (channel == 9 && inBackground && !PNRegex.test(sender)) {
          if (playNotificationSounds){
           //SND_quiet.play();
           //SND_twoTone.play();
           SND_loud.play();
          }
          msg_whisper++;
          title1 = window.document.title = "(" + msg_whisper + ")" + playerName + " - C&C: Tiberium Alliances";
          setFavIcon(1);
         }
         // 15 AFK blue
         this.titleMod_showMessage(message, sender, channel);
        };
       }
       var CheckPageFocus = function () {
        if (document.hasFocus() && inBackground) {
         msg_alliance = 0;
         msg_whisper = 0;
         msg_officer = 0;
         inBackground = false;
         window.document.title = playerName + " - C&C: Tiberium Alliances";
         if (!debug)
          setFavIcon(0);
        } else if (document.hasFocus() == false) {
         inBackground = true;
        }
       }
       setInterval(CheckPageFocus, checkPageFocusDelay);
      } else {
       window.setTimeout(init, 1000);
      }
     } catch (e) {
      console.log("CNCTAtitleMod: problem loading player name:\n" + e);
     }
    }
    init();
    
   }
  } catch (e) {
   console.log("titleMod_init: ", e);
  }
  
  function CNCTAtitleMod_checkIfLoaded() {
   try {
    if (typeof qx != 'undefined') {
     titleMod_init();
    } else {
     window.setTimeout(CNCTAtitleMod_checkIfLoaded, 1000);
    }
   } catch (e) {
    console.log("CNCTAtitleMod_checkIfLoaded: ", e);
   }
  }
  window.setTimeout(CNCTAtitleMod_checkIfLoaded, 2000);
 };
 
 try {
  var CNCTAtitleMod = document.createElement("script");
  CNCTAtitleMod.innerHTML = "(" + titleMod_main.toString() + ")();";
  CNCTAtitleMod.type = "text/javascript";
  document.getElementsByTagName("head")[0].appendChild(CNCTAtitleMod);
 } catch (e) {
  console.log("CNCTAtitleMod: init error: ", e);
 }
})();

		elda_hasload(152802);
	} else {
		elda_hasnotload(152802);
	}
} catch (e) {
    GM_log(e);
	GM_log(e.name + " " + e.message);
}

unsafeWindow.elda_addon_info = elda_addon_info;
