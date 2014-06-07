// ==UserScript==
// @id             tutasaid(commandandconquer tiberiumalliances tools)
// @name           tutasaid(commandandconquer tiberiumalliances tools)  
// @namespace      tutasaid(commandandconquer tiberiumalliances tools)
// @author         
// @description    Scriptsammlung
// @description    Provides user kayboard shortcuts to make live easy. Alt+1,Alt+2 ect for login. Alt+X,A,S for coordinates
// @downloadURL    http://userscripts.org/scripts/show/166621
// @updateURL      http://userscripts.org/scripts/show/166621
// @grant          none 
// @include        *tiberiumalliances.com*
// @include        http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        1.0.0 beta
// @icon          
// ==/UserScript==


// ================================================================================================================================================================
// ==                                                     ___,------,        ==   Infernal wrapper ======================== [ ab Zeile 00058 ] ====================                                                                                  ==
// ==            _,--.---.                         __,--'         /          ==   MultiLogin       ======================== [ ab Zeile 00182 ] ====================
// ==           ,' _,'_`._ \                    _,-'           ___,|         ==                                                                                  ==
// ==          ;--'       `^-.                ,'        __,---'   ||         ==   Lager und VP     ======================== [ ab Zeile 00824 ] ====================
// ==        ,'               \             ,'      _,-'          ||         ==                                                                                  ==
// ==       /                  \         _,'     ,-'              ||         ==   Basis INFO       ======================== [ ab Zeile 00964 ] ====================
// ==      :                    .      ,'     _,'                 |:         ==                                                                                  ==
// ==      |                    :     `.    ,'                    |:         ==   Extra Menü       ======================== [ ab Zeile 01088 ] ====================
// ==      |           _,-      |       `-,'                      ::         ==                                                                                  ==
// ==     ,'____ ,  ,-'  `.   , |,         `.                     : \        ==   PVP / PVE INFO   ======================== [ ab Zeile 01245 ] ====================
// ==    ,'    `-,'       ) / \/ \          \                     : :        ==                                                                                  ==
// ==    |      _\   o _,-'    '-.           `.                    \ \       ==   Ressourcen       ======================== [ ab Zeile 01361 ] ====================
// ==      `o_,-'  `-,-' ____   ,` )-.______,'  `.                   : :     ==                                                                                  ==
// ==       \-\    _,---'    `-. -'.\  `.  /     `.                  \  \    ==   NACHRICHTEN      ======================== [ ab Zeile 01502 ] ====================
// ==        / `--'             `.   \   \:        \                  \,.\   ==                                                                                  ==
// ==       (              ____,  \  |    \\        \                 :\ \\  ==   CHAT             ======================== [ ab Zeile 01573 ] ====================
// ==        )         _,-'    `   | |    | \        \                 \\_\\ ==                                                                                  ==
// ==       /      _,-'            | |   ,'-`._      _\                 \,'  ==   Kampfsimulator   ======================== [ ab Zeile 02023 ] ====================
// ==       `-----' |`-.           ;/   (__ ,' `-. _;-'`\           _,--'    ==                                                                                  ==
// ==     ,'        |   `._     _,' \-._/  Y    ,-'      \      _,-'         ==   Zoom             ======================== [ ab Zeile 04666 ] ====================
// ==    /        _ |      `---'    :,-|   |    `     _,-'\_,--'   \         ==                                                                                  ==
// ==   :          `|       \`-._   /  |   '     `.,-' `._`         \        ==   CCTAWrapper      ======================== [ ab Zeile 04746 ] ====================
// ==   |           _\_    _,\/ _,-'|                     `-._       \       ==                                                                                  ==
// ==   :   ,-         `.-'_,--'    \                         `       \      ==   MaelstromTools   ======================== [ ab Zeile 04872 ] ====================
// ==   | ,'           ,--'      _,--\           _,                    :     ==                                                                                  ==
// ==    )         .    \___,---'   ) `-.____,--'                      |     ==   CnCopt           ======================== [ ab Zeile 08339  ] ====================
// ==   _\    .     `    ||        :            \                      ;     ==                                                                                  ==
// == ,'  \    `.    )--' ;        |             `-.                  /      ==   Basenschieber    ======================== [ ab Zeile 09025 ] ====================
// ==|     \     ;--^._,-'         |                `-._            _/_\     ==                                                                                  ==
// ==\    ,'`---'                  |                    `--._____,-'_'  \    ==   Weltkarte        ======================== [ ab Zeile 09241 ] ====================
// == \_,'                         `._                          _,-'     `   ==                                                                                  ==
// ==                            ,-'  `---.___           __,---'          ´  ======================================================================================
// ==                          ,'             `---------'                    ======================================================================================
// ==                        ,'                                              ======================================================================================
// ==                                                                        ========================== [ FRONTSCHWEINE WELT 28 ] =================================                                                                        
// ================================================================================================================================================================

// =========================================================================  infernal wrapper ====================================================================
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



// =========================================================================  MultiLogin MOD   ====================================================================


var Logins = [ //"email","password" table
// Replace your apccounts details here. Maximum of apccounts is 9.
    "email 1", "password 1",
    "email 2", "password 2",
    "email 3", "password 3",
    "email 4", "password 4",
    "email 5", "password 5",
    "email 6", "password 6",
    "email 7", "password 7",
    "email 8", "password 8",
    "email 9", "password 9"
	];
var lang = "en";//Language;
//if(Language===null) Language = "en";
try {  
  //console.log('Path:',location.pathname);
  var lpn = location.pathname.split('/');
  if(lpn.length>1 & lpn[1].length==2) {
    lang = lpn[1];
  }
  console.log('Language:',lang); 
} catch (e) {
}

function Ini() {
	//console.log(localStorage);
	console.log("MHTools: Shortcuts loaded - Part 1.");
};

function Login(id) {
	if (Logins.length == 0) return;
	if ((id * 2) > Logins.length) return;
  var lpn = "/login/auth";
  if(lang!="en") lpn = "/"+lang+lpn;
	if (window.location.pathname != (lpn)) {
		window.location.assign("https://alliances.commandandconquer.com/" + lang + "/game/world");
		return;
	}
	var em = Logins[2 * id - 2];
	var pw = Logins[2 * id - 1];
	document.getElementById("username").value = em;
	document.getElementById("password").value = pw;
	var inputs = document.getElementsByTagName("INPUT");
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].type != "submit") continue;
		inputs[i].click();
	}
};

function Key(e) {
	//console.log("Key");	
	var s = String.fromCharCode(e.keyCode);
	// ALT+
	if (e.altKey && !e.altGraphKey && !e.ctrlKey && !e.shiftKey) {
		//console.log("Alt+"+s);	
		switch (s) {
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
			Login(s);
			break;
		case "0":
			window.location.assign("https://alliances.commandandconquer.com/logout");
			break;
		default:
			// other letters
		}
	}
	// CTRL+
	else if (e.ctrlKey && !e.altGraphKey && !e.altKey && !e.shiftKey) {
		//console.log("Ctrl+"+s);		
	}
	// CTRL+ALT+
	else if (e.ctrlKey && e.altKey && !e.altGraphKey && !e.shiftKey) {
		//console.log("Ctrl+Alt+"+s);			
	}
};

// Events
document.addEventListener("keyup", Key, false);
Ini();


(function () {
	var MHShortcutsMain = function () {      
    function MHToolsShortcutsCreate() {      
      // Classes
      //=======================================================      
      //Extending webfrontend.gui.options.OptionsPage with new ManagementOptionsPage
      function OptionsPage() {
        try {
          qx.Class.define("MHTools.OptionsPage", {
            type: 'singleton',
            extend: webfrontend.gui.options.OptionsPage,
            construct: function() {
              console.log('Create MHTools.OptionsPage at Shortcuts');
              this.base(arguments);
              this.setLabel('Frontschweine');
              
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
              VERSION: '1.5.4b',
              AUTHOR: 'ELEMENTO1979',
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
                page.add(new qx.ui.basic.Label("").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("<b>Die Packung Frontschwein</b>").set({rich: true}));//, textColor: red
                page.add(new qx.ui.basic.Label("").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("..................\\I//............... </b></span>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("..............( @ @ ).............. </b></span>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label(".......oOo--(_)-oOo............ </b></span>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("Author: <span style='color:blue'><b>ELEMENTO1979</b></span>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("Erstellt: <span style='color:blue'>2013</span>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("").set({rich: true,marginLeft:10}));
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
                    //console.log('B this.clientArea.getChildren()[0]',this.clientArea.getChildren()[0]);
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
      // //Translation
      // qx.locale.Manager.getInstance().addTranslation('pl', {
      // 'Auto collect packages 1/30 sec.': 'Zbierz pakiety automatycznie 1/30 sec',
      // 'First, just move mouse cursor over some map coordinates numbers ex. 666:666': 'Wpierw przesun wskaźnik myszy nad współrzędne np. 666:666',
      // 'Replace coordinates. Ex. 500:500', 'Zamień współrzędne. Ex. 500:500',
      // 'Player: ', 'Gracz: '
      // });
      try {
        qx.Class.define("MHTools.Shortcuts", { //MHTools.Shortcuts MHTools.Shortcuts
          type: "singleton",
          extend: qx.core.Object,
          construct: function () {
            this.stats.src = 'http://goo.gl/i6mb1';//1.8.0
            //TODO: check with qooxdoo for better solution
            window.addEventListener("click", this.onClick, false);
            window.addEventListener("keyup", this.onKey, false);
            window.addEventListener("mouseover", this.onMouseOver, false);
            window.setInterval(this.getBonuses, 30000);
            console.log('this.addShortcutsPage();');
            this.addShortcutsPage();
            console.log("MHTools: Shortcuts loaded - Part 2.");
          },
          statics : {
            VERSION: '1.8.0',
            AUTHOR: 'MrHIDEn',
            CLASS: 'Shortcuts'
          },
          properties: {
          },
          members: {    
            stats: document.createElement('img'),      
            // setttings
            settings: {
              collectPackages:{v:true,  d:true,  l:'Einsammeln der Pakete alle 30 sec.'}
            },
            Coords: 'First, just move mouse cursor over some map coordinates numbers ex. 666:666',
            eaSimulator: function() {
              console.log('eaSimulator');
              try {
                var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
                var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
                ClientLib.Vis.VisMain.GetInstance().get_Battleground().SimulateBattle();
                var app = qx.core.Init.getApplication();
                app.getPlayArea().setView(webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatReplay, city.get_Id(), 0, 0);
              } catch (e) {
                console.warn("MHTools.Shortcuts.eaSimulator: ", e); 
              }
            },
						GetCaretPosition: function (ctrl) {
							var CaretPos = 0; // IE Support
							if (document.selection) {
								ctrl.focus();
								var Sel = document.selection.createRange();
								Sel.moveStart('character', -ctrl.value.length);
								CaretPos = Sel.text.length;
							}
							// Firefox support
							else if (ctrl.selectionStart || ctrl.selectionStart == '0') CaretPos = ctrl.selectionStart;
							return (CaretPos);
						},
						SetCaretPosition: function (ctrl, pos) {
							if (ctrl.setSelectionRange) {
								ctrl.focus();
								ctrl.setSelectionRange(pos, pos);
							} else if (ctrl.createTextRange) {
								var range = ctrl.createTextRange();
								range.collapse(true);
								range.moveEnd('character', pos);
								range.moveStart('character', pos);
								range.select();
							}
						},
            onKey: function (ev) {
              var s = String.fromCharCode(ev.keyCode);
              var tas = MHTools.Shortcuts.getInstance();// ?=this

              // ALT+
              if (ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.shiftKey) {

                switch (s) {
                case "A":
                  // coords by popup window
                  var inputField = document.querySelector('input:focus, textarea:focus');
                  if (inputField != null) {
                    this.Coords = prompt('Replace coordinates. Ex. 500:500', "");
                    if (this.Coords != null) {
                      var position = tas.GetCaretPosition(inputField);
                      var txt = inputField.value;
                      var insert = "[coords]" + this.Coords + "[/coords]";
                      inputField.value = txt.substring(0, position) + insert + txt.substring(position, txt.length);
                      tas.SetCaretPosition(inputField, position + insert.length);
                    }
                  }
                  break;
                case "X":
                  // coords by moving mouse OVER map coordinates
                  var inputField = document.querySelector('input:focus, textarea:focus');
                  if (inputField != null) {
                    if (this.Coords != null) {
                      var position = tas.GetCaretPosition(inputField);
                      var txt = inputField.value;
                      var insert = "[coords]" + this.Coords + "[/coords]";
                      inputField.value = txt.substring(0, position) + insert + txt.substring(position, txt.length);
                      tas.SetCaretPosition(inputField, position + insert.length);
                    }
                  }
                  break;
                case "S":
                  // coords by inserting [coords][/coords]
                  var inputField = document.querySelector('input:focus, textarea:focus');
                  if (inputField != null) {
                    var position = tas.GetCaretPosition(inputField);
                    var txt = inputField.value;
                    var insert = "[coords][/coords]";
                    inputField.value = txt.substring(0, position) + insert + txt.substring(position, txt.length);
                    tas.SetCaretPosition(inputField, position + ("[coords]").length);
                  }
                  break;
                case "I":
                  // player bases info to share with others
                  var serverName = ClientLib.Data.MainData.GetInstance().get_Server().get_Name();
                  var inputField = document.querySelector('input:focus, textarea:focus');
                  if (inputField != null) {
                    var apc = ClientLib.Data.MainData.GetInstance().get_Cities();//all player cities
                    var PlayerName = apc.get_CurrentOwnCity().get_PlayerName();
                    var txt = 'Player: ' + PlayerName + "\r\n----------------------------------\r\n";
                    var apcl = apc.get_AllCities().d;//all player cities list
                    for (var key in apcl) {
                      var c = apcl[key];
                      try {
                        var sd = c.get_SupportData();
                        var sn = '--';
                        var sl = '--';
                        if(sd !== null) {
                          sl = sd.get_Level().toString();
                          sn = c.get_SupportWeapon().dn; 
                        }
                      
                        txt += "Base \'" + c.get_Name() + "\' info:\r\n"; //m_Level
                        txt += "Base       lvl: " + c.get_LvlBase().toFixed(2).toString() + "\r\n";
                        txt += "Deffence lvl: " + c.get_LvlDefense().toFixed(2).toString() + "\r\n";
                        txt += "Offence  lvl: " + c.get_LvlOffense().toFixed(2).toString() + "\r\n";
                        txt += "Support  lvl: " + sl + " - " + sn + "\r\n";
                        txt += "Distance to center: " + Math.round(ClientLib.Base.Util.CalculateDistance(ClientLib.Data.MainData.GetInstance().get_Server().get_ContinentWidth() / 2, ClientLib.Data.MainData.GetInstance().get_Server().get_ContinentHeight() / 2, c.get_PosX(), c.get_PosY())) + "\r\n";
                        txt += "[coords]" + c.get_PosX() + ":" + c.get_PosY() + "[/coords]\r\n";
                      } catch (e) {
                        console.warn("MHTools.Shortcuts.INFO exception: ", e); 
                      }
                      txt += "----------------------------------\r\n";
                    }
                    inputField.value += txt;
                  }
                  break;
                case "G":
                  // Collect all resources at once manualy
                  // log("G");
                  // why this. does not work here. Do you know?
                  this.MHTools.Shortcuts.getInstance().getBonuses();
                  //this.getBonuses();
                  break;
                case "B":
                  // Repair all armies
                  this.MHTools.Shortcuts.getInstance().repairAllArmies();
                  //this.repairAllArmies();
                  break;
                case "V":
                  // Go back to fight without repair
                  this.MHTools.Shortcuts.getInstance().goBackToFight();
                  break;
                case "L":
                case ";":
                  console.log('eaSim key:',s);
                  this.MHTools.Shortcuts.getInstance().eaSimulator();
                  //this.eaSimulator();
                  break;
                case "P":
                  // URL by popup window
                  var inputField = document.querySelector('input:focus, textarea:focus');
                  if (inputField != null) {
                    this.Coords = prompt("Enter URL", "");
                    if (Coords != null) {
                      var position = tas.GetCaretPosition(inputField);
                      var txt = inputField.value;
                      var insert = "[url]" + this.Coords + "[/url]";
                      inputField.value = txt.substring(0, position) + insert + txt.substring(position, txt.length);
                      tas.SetCaretPosition(inputField, position + insert.length);
                    }
                  }
                  break;
                default:
                  // Other letters
                  //log("Other letter (" + s + ")");
                  break;
                }
              } // CTRL+
              else if (!ev.altKey && ev.ctrlKey && !ev.shiftKey && !ev.altGraphKey) {              
                switch (s) {
                case " ":
                  // Repair current army and go back to fight
                  this.MHTools.Shortcuts.getInstance().repairArmyAndBack();
                  break;
                default:
                  // Other letters
                  //log("Other letter (" + s + ")");
                }
              }
            },
            onMouseOver: function (ev) {
              //log("onMouseOver");						
              var tag = ev.target.tagName;
              if (tag == "B" || tag == "DIV" || tag == "A") {
                var s = ev.target.textContent;
                var semicolon = s.indexOf(":");
                if (semicolon > 0) {
                  var n1 = s.substring(0, semicolon);
                  var n2 = s.substring(semicolon + 1, s.length);
                  if (isFinite(n1) && isFinite(n2)) {
                    if(s.length==5 && s[0]=="0") return;
                    this.Coords = s;
                    //ClientLib.Vis.VisMain.GetInstance().PlayUISound('sounds/Buttonclick');
                    ClientLib.Vis.VisMain.GetInstance().PlayUISound('sounds/CollectTiberium');
                  }
                }
              }
            },
            //window.setInterval(this.getBonuses, 30000);
            getBonuses: function () {
              try {
                if(!MHTools.Shortcuts) return;
                if(!MHTools.Shortcuts.getInstance().settings['collectPackages'].v) return;
                
                var apc = ClientLib.Data.MainData.GetInstance().get_Cities();
                var apcl = apc.get_AllCities().d;
                var ps = false;
                for (var key in apcl) {
                  apcl[key].CollectAllResources();
                  
                  // EA There is no API for this function. It is on API list but it is obfusticated.
                  
                  //ps |= apcl[key].get_CanCollectResources();
                }
                if(ps) {
                  ClientLib.Vis.VisMain.GetInstance().PlayUISound('sounds/CollectCrystal');
                }
              } catch (e) {
                console.warn("MHTools.Shortcuts.getBonuses: ", e); 
              }
            },//button Alt+V
            goBackToFight: function () {
              // GET BACK TO FIGTH == ATTACK
              try {	// NOTICE Under construction
                var pc = ClientLib.Data.MainData.GetInstance().get_Cities();//player cities
                var oci = pc.get_CurrentOwnCityId();
                var tci = pc.get_CurrentCityId();  
                if (oci > 0 && tci > 0 && oci != tci) {// add timer
                  var tc = pc.get_CurrentCity();         
                  if( tc.get_PosX() > 0 && tc.get_PosY() > 0) {
                    webfrontend.gui.UtilView.openVisModeInMainWindow(webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatSetupDefense, tci, false);
                    ClientLib.Vis.VisMain.GetInstance().PlayUISound('sounds/Buttonclick');
                  }
                }                           
              } catch (e) {
                console.warn("MHTools.Shortcuts.goBackToFight: ", e);
              }
            },
            //button Alt+B
            repairAllArmies: function () {
              //console.log('repairAllArmies');
              // REPAIR ALL OWN ARMIES
              try {	// NOTICE Under construction
                //var pc = ClientLib.Data.MainData.GetInstance().get_Cities();//player cities
                var cx = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
                console.log('cx',cx);
                for(var key in cx) {
                  var oc = cx[key];
                  console.log('key',key);
                  oc.RepairAllOffense();
                }                   
                ClientLib.Vis.VisMain.GetInstance().PlayVoiceSound("FactionUI/sounds/Repairing");         
              } catch (e) {
                console.warn("MHTools.Shortcuts.repairAllArmies: ", e);
              }
            },
            //button Ctrl+SPACE
            repairArmyAndBack: function () {
              // REPAIR CURRENT ARMY AND GET BACK TO FIGTH
              try {	// NOTICE Under construction
                var pc = ClientLib.Data.MainData.GetInstance().get_Cities();//player cities
                var oci = pc.get_CurrentOwnCityId();//own city                
                if (oci > 0 ) {
                  //var c = pc.GetCity(oci);//works, it could be useful with JSON + storage
                  var oc = pc.get_CurrentOwnCity();
                  if(oc.CanRepairAllOffense()) {
                    oc.RepairAllOffense();
                    ClientLib.Vis.VisMain.GetInstance().PlayVoiceSound("FactionUI/sounds/Repairing");
                  }
                  var tci = pc.get_CurrentCityId();//target city -1 non selected, tci=oci you are in your base, tci>0 you are watching on other base
                  if (tci > 0 && oci != tci) {// add timer           
                    var tc = pc.get_CurrentCity();         
                    if( tc.get_PosX() > 0 && tc.get_PosY() > 0) {
                      webfrontend.gui.UtilView.openVisModeInMainWindow(webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatSetupDefense, tci, false);
                    }
                  }  
                }                            
              } catch (e) {
                console.warn("MHTools.Shortcuts.repairArmyAndBack: ", e);
              }
            },
            // NOTE
            /*
            //#use(qx.event.handler.Keyboard)
            var find = new qx.ui.core.Command("Alt+L");
            find.addListener("execute", _onFind, this);
            function _onFind() {  console.log('Find');}
            */
            
            // OPTIONS
            optionsTab: null,
            optionsPage: null,
            btnApply: null,
            optionsStoreName: 'MHToolShortcutsOptions',
            addShortcutsPage: function() {            
              console.log('addShortcutsPage');
              try {
                if(!MHTools.OptionsPage) OptionsPage();
                
                if(!this.optionsTab) {
                  //Create Tab
                  this.optionsTab = MHTools.OptionsPage.getInstance();
                }       
            //console.log('this.optionsTab',this.optionsTab);
                this.optionsPage = this.optionsTab.addPage("Tools");
                this.optionsPage.setLayout(new qx.ui.layout.VBox());
                this.optionsPage.add(new qx.ui.basic.Label("<b>Options:</b></br>").set({rich: true}));//, textColor: red
                this.settings['collectPackages'].obj = new qx.ui.form.CheckBox(this.settings['collectPackages'].l).set({
                  value: this.settings['collectPackages'].v,
                  marginLeft: 10
                });
                this.settings['collectPackages'].obj.addListener("execute", this.optionsChanged, this);

                this.optionsPage.add(this.settings['collectPackages'].obj);//, {row:1+i++, column:3}); 
                
                this.loadOptions();
                this.addButtons();              
              } catch (e) {
                console.warn("MHTool.Shortcuts.addShortcutsPage: ", e);
              }
            },
            optionsChanged: function() {
              var c = false;
              for(var k in this.settings) {
                c = c || (this.settings[k].v != this.settings[k].obj.getValue());
              }
              this.btnApply.setEnabled(c);
            },
            addButtons: function() {
              try {
                this.btnApply = new qx.ui.form.Button("OK");
                this.btnApply.set({ width:150, height:30, toolTipText: "Apply changes.", allowGrowX:false, enabled:false});//, marginTop:20});
                
                var c = new qx.ui.container.Composite(new qx.ui.layout.HBox(0,'right'));
                c.setMarginTop(20);
                c.add(this.btnApply);
                this.optionsPage.add(c);
                
                this.btnApply.addListener("execute", this.applyOptions, this); 
                this.btnApply.setEnabled(false);
              } catch (e) {
                console.warn("MHTool.Shortcuts.addButtons: ", e);
              }
            },
            applyOptions: function(e) {
              //console.log("applyOptions e:",e);
              this.saveOptions();
              this.btnApply.setEnabled(false); 
            },
            saveOptions: function() {   
              //MHTools.Shortcuts.getInstance().settings['collectPackages'].obj.basename == "CheckBox"
              var c = {};
              var i = 0;
              for(var k in this.settings) {
                c[k] = this.settings[k].obj.getValue();
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
                    this.settings[k].obj.setValue(c[k]);
                    this.settings[k].v = c[k];
                  } else {
                    this.settings[k].obj.setValue(this.settings[k].d);
                    this.settings[k].v = this.settings[k].d;
                  }
                }             
              } catch (e) {
                  console.warn("MHTool.Shortcuts.loadOptions: ", e);
              }
            }
          } // members
        });          
      } catch (e) {
        console.warn("qx.Class.define(MHTools.Shortcuts: ", e);      
      }
      //=======================================================
      // START
      MHTools.Shortcuts.getInstance();
    }

    // Loading
    function LoadExtension() {
      try {
        if (typeof(qx)!='undefined') {
          if (!!qx.core.Init.getApplication().getMenuBar()) {
            MHToolsShortcutsCreate();
            return; // done
          }           
        }
      } catch (e) {
        if (console !== undefined) console.log(e);
        else if (window.opera) opera.postError(e);
        else GM_log(e);
      }
      window.setTimeout(LoadExtension, 1000);
    }      
    LoadExtension();
  }
  
  // Injecting
  function Inject() {
    if (window.location.pathname != ("/login/auth")) {
      var Script = document.createElement("script");
      Script.innerHTML = "(" + MHShortcutsMain.toString() + ")();";
      Script.type = "text/javascript";        
      document.getElementsByTagName("head")[0].appendChild(Script);
    }
  }    
  Inject();
})();

// =========================================================================  Lager und VP MOD   ==================================================================

function initHideCampsButton(){
    
    //----------- Offensivestufe ------
    
    
    var minimumlevel = 50;
    
    
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
               toolTipText: "Zeig Lager( 49+ ) und VP( 46+ ) an"
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
                        
                        if ( Math.round(visObject.get_BaseLevelFloat()) + 1 < minimumlevel)
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
                        
                        if ( Math.round(visObject.get_BaseLevelFloat()) + 1 < minimumlevel)
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
// =========================================================================  strg + Y / Strg + N  ============================================================

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
                var txt = "", c, unitData, bh, supp, type, df;
                for (var key in apc) {
                  c = apc[key];
                  txt += "[u]DEF:[/u] [b]" + ('0' + c.get_LvlDefense().toFixed(2)).slice(-5) + "[/b] ";
                  txt += "[u]OFF:[/u] [b]" + ('0' + c.get_LvlOffense().toFixed(2)).slice(-5) + "[/b] ";
                  unitData = c.get_CityBuildingsData();
                  bh = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Construction_Yard);
                  df = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Defense_Facility);
                  supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Ion);
                  if (supp === null)
                    supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Art);
                  if (supp === null)
                    supp = unitData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Air);
                  if (bh !== null) {
                    txt += "[u]BH:[/u] [b]" + bh.get_CurrentLevel() + "[/b] ";
                    //txt += "[u]BaseRep:[/u] [b]" + (c.get_CityBuildingsData().GetFullRepairTime() / 3600).toFixed(2) + "h[/b] ";
                    //txt += "[u]DefRep:[/u] [b]" + (c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Defense) / 3600).toFixed(2) + "h[/b] ";
                  }
                  if (df !== null) {
                    txt += "[u]VE:[/u] [b]" + df.get_CurrentLevel() + "[/b] ";
                  }
                    else {
                        txt += "[u]VE:[/u] [b]NA[/b] ";
                    }
                  if (supp !== null) {
                    txt += "[u]" + supp.get_TechGameData_Obj().dn.slice(0, 3) + ":[/u] [b]" + supp.get_CurrentLevel() + "[/b] ";
                  }
                    else {
                        txt += "[u]SUP:[/u] [b]NA[/b] ";
                    }
                  txt += "--" + "[u][b][coords]"+ c.get_PosX() + ":" + c.get_PosY() + ":" + c.get_Name() + "[/b][/u][/coords]";
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
                inputField.value += "[b]Anzahl der Basen in der Allianz:[/b] " + baseCount + " [b]Anzahl der Supportgebäude in der Allianz:[/b] " + supBaseCount +   "(" + (supBaseCount / baseCount * 100).toFixed(0) + "%) [b]Avg:[/b] " + avg.toFixed(2) + "    30+: " + high +    "(" + (high / baseCount * 100).toFixed(0) + "%)";
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

// =========================================================================  Extra Menü MOD     =================================================================
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
            
			//--HAUPTMENÜ----
			var addonmenu  = Addons.AddonMainMenu.getInstance();		
            addonmenu.AddMainMenu("UPDATE",function(){window.open("http://userscripts.org/scripts/source/165587.user.js", "_blank");;},"ALT+U");
            //--UNTERMENÜ I--
			var submenu = addonmenu.AddSubMainMenu("ENDGAME");
			addonmenu.AddSubMenu(submenu,"Livestream",function(){window.open("http://de.twitch.tv/elemento1979", "_blank")},"ALT+L");
            addonmenu.AddSubMenu(submenu,"Überblick ( Excel )",function(){window.open("https://docs.google.com/spreadsheet/ccc?key=0ArvASzbj-FeBdDZ1eUdWdXZOMmVRODB1NF9hTDMtSkE#gid=2", "_blank")});
			addonmenu.AddSubMenu(submenu,"Festungsbild",function(){window.open("http://s14.directupload.net/file/d/3194/y66mzqyz_jpg.htm", "_blank")});
            addonmenu.AddSubMenu(submenu,"Angriffsbild",function(){window.open("http://s7.directupload.net/file/d/3199/fmvwxdw2_jpg.htm", "_blank")});
                        //--UNTERMENÜ II--
			var submenu = addonmenu.AddSubMainMenu("SCRIPTE");
			addonmenu.AddSubMenu(submenu,"Firefox & Co.",function(){window.open("http://userscripts.org/scripts/search?q=Tiberium&submit=", "_blank")},"ALT+F");
            addonmenu.AddSubMenu(submenu,"Google Chrome",function(){window.open("https://chrome.google.com/webstore/detail/cnc-ta-script-collection/nmhpmdclklpgfcpoiomjofgfagenmgeo", "_blank")});
			addonmenu.AddSubMenu(submenu,"Frontschwein",function(){window.open("http://userscripts.org/scripts/show/165587", "_blank")});
			//--UNTERMENÜ III--
			var submenu = addonmenu.AddSubMainMenu("HILFE");
            addonmenu.AddSubMenu(submenu,"WELTKARTE",function(){window.open("http://map.tiberium-alliances.com/", "_blank")},"ALT+W");
			addonmenu.AddSubMenu(submenu,"UNITED-FORUM",function(){window.open("http://www.united-forum.de/tiberium-alliances-f1030/", "_blank")});
            addonmenu.AddSubMenu(submenu,"CNC INSIDE",function(){window.open("http://www.cnc-inside.de/tiberium-alliances", "_blank")});
            
      
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
// =========================================================================  PVP / PVE INFO MOD  ================================================================

(function () {
  var PlayerInfoMod_main = function () {
    var playerInfoWindow = null;
    var general = null;
    var pvpScoreLabel = null;
    var pveScoreLabel = null;
    var playerName = null;

    function createPlayerInfoMod() {
      try {
        console.log('INFO MOD');
		playerInfoWindow = webfrontend.gui.info.PlayerInfoWindow.getInstance();
        general = playerInfoWindow.getChildren()[0].getChildren()[0].getChildren()[0].getChildren()[0].getChildren()[0].getChildren()[1].getChildren()[0];
        playerName = general.getChildren()[1];
		
        var pvpLabel = new qx.ui.basic.Label("generische Basen zerstört:");
        pvpScoreLabel = new qx.ui.basic.Label("").set({
          textColor: "text-value",
          font: "font_size_15_bold"
        });
        general.add(pvpLabel, {
          row: 3,
          column: 3
        });
        general.add(pvpScoreLabel, {
          row: 3,
          column: 4
        });

        var pveLabel = new qx.ui.basic.Label("vergessene Basen zerstört:");
        pveScoreLabel = new qx.ui.basic.Label("").set({
          textColor: "text-value",
          font: "font_size_14_bold"
        });
        general.add(pveLabel, {
          row: 4,
          column: 3
        });
        general.add(pveScoreLabel, {
          row: 4,
          column: 4
        });

        playerInfoWindow.addListener("close", onPlayerInfoWindowClose, this);
        playerName.addListener("changeValue", onPlayerChanged, this);

      } catch (e) {
        console.log("createPlayerInfoMod: ", e);
      }
    }

    function onPlayerInfo(context, data) {
      try {
        pvpScoreLabel.setValue((data.bd-data.bde).toString());
        pveScoreLabel.setValue(data.bde.toString());
      } catch (e) {
        console.log("onPlayerInfo: ", e);
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

    function createTransferAll() {
      try {
        console.log('TransferAll loaded');
        chkbxConfirm = new qx.ui.form.CheckBox("");
		transferWindow = webfrontend.gui.trade.TradeOverlay.getInstance().getLayoutChildren()[13].getLayoutChildren()[1].getLayout()._getLayoutChildren();
        resTypeToggle = transferWindow[1].getLayoutChildren()[2];
        var btnTransferAll=new webfrontend.ui.SoundButton("Alles Laden").set({width:80,enabled:false});

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
        if (transferQueue.length > 0 ) {
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
                                Simulator.StatWindow.getInstance().__labelMiscBattleDuration[Simulator.StatWindow.getInstance().__span].setValue(battleDuration);
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

                    __openToolsWindow: function () {
                        //Might need to be implemented later on.
                    },

                    attachNetEvent: function () {
                        console.log("Need to assign correct function!");
                    },

                    formatNumbersCompact: function () {
                        console.log("Need to assign correct function!");
                    },

                    GetUnitMaxHealth: function () {
                        console.log("Need to assign correct function!");
                        return -1;
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
                        var app = qx.core.Init.getApplication();
                        var player_cities = ClientLib.Data.MainData.GetInstance().get_Cities();
                        var current_city = player_cities.get_CurrentCity();
                        try {
                            //This brings the player back to viewing the enemies defense setup PlayArea
                            app.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupDefense, localStorage.ta_sim_last_city, 0, 0);
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
                    this.base(arguments);

                    this.set({
                        layout: new qx.ui.layout.VBox().set({
                            spacing: 0
                        }),
                        caption: "Simulator Stats",
//                        width: 310,
                        padding: 0,
                        allowMaximize: false,
                        showMaximize: false,
                        allowMinimize: false,
                        showMinimize: false,
                        resizable: true
                    });

                    if (typeof localStorage['statWindowPosLeft'] != 'undefined') {
                        var left = parseInt(localStorage['statWindowPosLeft']);
                        var top = parseInt(localStorage['statWindowPosTop']);
                        this.moveTo(left, top);
                    } else {
                        this.moveTo(124, 31);
                    }
                    var qxApp = qx.core.Init.getApplication();

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

                    //MISC Section//
                    var misc = new qx.ui.container.Composite(new qx.ui.layout.HBox(5).set({spacing: 0})).set({decorator: "pane-light-plain", allowGrowX: true, marginLeft: 0, marginRight: 0});
                    var miscBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(2)).set({width: 29, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0});

                    var miscOutcome = new qx.ui.basic.Label("O").set({toolTipText: "Outcome", alignX: "right", alignY: "middle"});
                    var miscBattleDuration = new qx.ui.basic.Label("D").set({toolTipText: "Duration", alignX: "right", alignY: "middle"});

                    miscBox.add(miscOutcome);
                    miscBox.add(miscBattleDuration);

                    misc.add(miscBox);

                    for (var i = 0; i < 4; i++) {
                        this.__labelMisc[i] = new qx.ui.container.Composite(new qx.ui.layout.VBox(2)).set({width: 70, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0, decorator: "pane-light-opaque"});

                        this.__labelMiscOutcome[i] = new qx.ui.basic.Atom("-", null).set({alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});
                        this.__labelMiscOutcome[i].getChildControl("icon").set({width: 18, height: 18, scale: true});
                        this.__labelMisc[i].add(this.__labelMiscOutcome[i]);

                        this.__labelMiscBattleDuration[i] = new qx.ui.basic.Label("-:--").set({alignX: "center", alignY: "middle"});
                        this.__labelMisc[i].add(this.__labelMiscBattleDuration[i]);

                        misc.add(this.__labelMisc[i], {flex: 1});
                    }

                    this.__labelMisc[0].addListener("click", function () { this.selectSimulateSpan(0); }, this);
                    this.__labelMisc[1].addListener("click", function () { this.selectSimulateSpan(1); }, this);
                    this.__labelMisc[2].addListener("click", function () { this.selectSimulateSpan(2); }, this);
                    this.__labelMisc[3].addListener("click", function () { this.selectSimulateSpan(3); }, this);
                    this.__labelMisc[0].addListener("dblclick", function () { this.loadSpanFormation(0); }, this);
                    this.__labelMisc[1].addListener("dblclick", function () { this.loadSpanFormation(1); }, this);
                    this.__labelMisc[2].addListener("dblclick", function () { this.loadSpanFormation(2); }, this);
                    this.__labelMisc[3].addListener("dblclick", function () { this.loadSpanFormation(3); }, this);

                    this.add(misc);

                    //Enemy Health Section//
                    var enemyHealthHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({decorator: "pane-light-opaque"});

                    var enemyHealthTitle = new qx.ui.basic.Label(qxApp.tr("tnf:combat target")).set({alignX: "center", font: "font_size_13_bold"});
                    enemyHealthHeader.add(enemyHealthTitle);

                    this.add(enemyHealthHeader);

                    var enemyHealth = new qx.ui.container.Composite(new qx.ui.layout.HBox(5).set({spacing: 0})).set({decorator: "pane-light-plain", allowGrowX: true, marginLeft: 0, marginRight: 0});
                    var enemyHealthBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({width: 29, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0});

                    var eHLabelOverall = new qx.ui.basic.Atom(null, img.Enemy.All).set({toolTipText: qxApp.tr("tnf:total"), toolTipIcon: img.Enemy.All, alignX: "right", alignY: "middle", gap: 0, iconPosition: "top"});
                    var eHLabelBase = new qx.ui.basic.Atom(null, img.Enemy.Base).set({toolTipText: qxApp.tr("tnf:base"), toolTipIcon: img.Enemy.Base, alignX: "right", alignY: "middle", gap: 0, iconPosition: "top"});
                    var eHLabelDefense = new qx.ui.basic.Atom(null, img.Enemy.Defense).set({toolTipText: qxApp.tr("tnf:defense"), toolTipIcon: img.Enemy.Defense, alignX: "right", alignY: "middle", gap: 0, iconPosition: "top"});
                    var eHLabelCY = new qx.ui.basic.Label("CY").set({toolTipText: GAMEDATA.Tech[1].dn, alignX: "right", alignY: "middle"});
                    var eHLabelDF = new qx.ui.basic.Label("DF").set({toolTipText: GAMEDATA.Tech[42].dn, alignX: "right", alignY: "middle"});

                    eHLabelOverall.getChildControl("icon").set({width: 18, height: 18, scale: true});
                    eHLabelBase.getChildControl("icon").set({width: 18, height: 18, scale: true});
                    eHLabelDefense.getChildControl("icon").set({width: 18, height: 18, scale: true});

                    enemyHealthBox.add(eHLabelOverall);
                    enemyHealthBox.add(eHLabelBase);
                    enemyHealthBox.add(eHLabelDefense);
                    enemyHealthBox.add(eHLabelCY);
                    enemyHealthBox.add(eHLabelDF);

                    enemyHealth.add(enemyHealthBox);

                    for (var i = 0; i < 4; i++) {
                        this.__labelEnemy[i] = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({width: 70, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0, decorator: "pane-light-opaque"});

                        this.__labelEnemyOverallHealth[i] = new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"});
                        this.__labelEnemyBaseHealth[i] = new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"});
                        this.__labelEnemyDefenseHealth[i] = new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"});
                        this.__labelEnemyCYHealth[i] = new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"});
                        this.__labelEnemyDFHealth[i] = new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"});

                        this.__labelEnemy[i].add(this.__labelEnemyOverallHealth[i]);
                        this.__labelEnemy[i].add(this.__labelEnemyBaseHealth[i]);
                        this.__labelEnemy[i].add(this.__labelEnemyDefenseHealth[i]);
                        this.__labelEnemy[i].add(this.__labelEnemyCYHealth[i]);
                        this.__labelEnemy[i].add(this.__labelEnemyDFHealth[i]);

                        enemyHealth.add(this.__labelEnemy[i], {flex: 1});
                    }

                    this.__labelEnemy[0].addListener("click", function () { this.selectSimulateSpan(0); }, this);
                    this.__labelEnemy[1].addListener("click", function () { this.selectSimulateSpan(1); }, this);
                    this.__labelEnemy[2].addListener("click", function () { this.selectSimulateSpan(2); }, this);
                    this.__labelEnemy[3].addListener("click", function () { this.selectSimulateSpan(3); }, this);
                    this.__labelEnemy[0].addListener("dblclick", function () { this.loadSpanFormation(0); }, this);
                    this.__labelEnemy[1].addListener("dblclick", function () { this.loadSpanFormation(1); }, this);
                    this.__labelEnemy[2].addListener("dblclick", function () { this.loadSpanFormation(2); }, this);
                    this.__labelEnemy[3].addListener("dblclick", function () { this.loadSpanFormation(3); }, this);

                    this.add(enemyHealth);

                    //Player Repair Section//
                    var playerRepairHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({decorator: "pane-light-opaque"});
                    var playerRepairTitle = new qx.ui.basic.Label(qxApp.tr("tnf:own repair cost")).set({alignX: "center", alignY: "top", font: "font_size_13_bold"});
                    playerRepairHeader.add(playerRepairTitle);
                    this.add(playerRepairHeader);

                    var playerRepair = new qx.ui.container.Composite(new qx.ui.layout.HBox(5).set({spacing: 0})).set({decorator: "pane-light-plain", allowGrowX: true, marginLeft: 0, marginRight: 0});
                    var playerRepairBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({width: 29, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0});

                    var pRLabelStorage = new qx.ui.basic.Atom(null, img.Repair.Storage).set({toolTipText: qxApp.tr("tnf:offense repair time"), toolTipIcon: img.Repair.Storage, alignX: "right", alignY: "middle", gap: 0, iconPosition: "top"});
                    var pRLabelOverall = new qx.ui.basic.Atom(null, img.Repair.Overall).set({toolTipText: qxApp.tr("tnf:repair points"), toolTipIcon: img.Repair.Overall, alignX: "right", alignY: "middle", gap: 0, iconPosition: "top"});
                    var pRLabelInf = new qx.ui.basic.Atom(null, img.Repair.Infantry).set({toolTipText: qxApp.tr("tnf:infantry repair title"), toolTipIcon: img.Repair.Infantry, alignX: "right", alignY: "middle", gap: 0, iconPosition: "top"});
                    var pRLabelVehi = new qx.ui.basic.Atom(null, img.Repair.Vehicle).set({toolTipText: qxApp.tr("tnf:vehicle repair title"), toolTipIcon: img.Repair.Vehicle, alignX: "right", alignY: "middle", gap: 0, iconPosition: "top"});
                    var pRLabelAir = new qx.ui.basic.Atom(null, img.Repair.Aircraft).set({toolTipText: qxApp.tr("tnf:aircraft repair title"), toolTipIcon: img.Repair.Aircraft, alignX: "right", alignY: "middle", gap: 0, iconPosition: "top"});

                    pRLabelStorage.getChildControl("icon").set({width: 18, height: 18, scale: true});
                    pRLabelOverall.getChildControl("icon").set({width: 18, height: 18, scale: true});
                    pRLabelInf.getChildControl("icon").set({width: 18, height: 18, scale: true});
                    pRLabelVehi.getChildControl("icon").set({width: 18, height: 18, scale: true});
                    pRLabelAir.getChildControl("icon").set({width: 18, height: 18, scale: true});

                    playerRepairBox.add(pRLabelStorage);
                    playerRepairBox.add(pRLabelOverall);
                    playerRepairBox.add(pRLabelInf);
                    playerRepairBox.add(pRLabelVehi);
                    playerRepairBox.add(pRLabelAir);

                    playerRepair.add(playerRepairBox);

                    for (var i = 0; i < 4; i++) {
                        this.__labelRepair[i] = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({width: 70, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0, decorator: "pane-light-opaque"});
                        this.__labelRepairStorage[i] = new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"});
                        this.__labelRepairOverall[i] = new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"});
                        this.__labelRepairInf[i] = new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"});
                        this.__labelRepairVehi[i] = new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"});
                        this.__labelRepairAir[i] = new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"});

                        this.__labelRepair[i].add(this.__labelRepairStorage[i]);
                        this.__labelRepair[i].add(this.__labelRepairOverall[i]);
                        this.__labelRepair[i].add(this.__labelRepairInf[i]);
                        this.__labelRepair[i].add(this.__labelRepairVehi[i]);
                        this.__labelRepair[i].add(this.__labelRepairAir[i]);

                        playerRepair.add(this.__labelRepair[i], {
                            flex: 1
                        });
                    }

                    this.__labelRepair[0].addListener("click", function () { this.selectSimulateSpan(0); }, this);
                    this.__labelRepair[1].addListener("click", function () { this.selectSimulateSpan(1); }, this);
                    this.__labelRepair[2].addListener("click", function () { this.selectSimulateSpan(2); }, this);
                    this.__labelRepair[3].addListener("click", function () { this.selectSimulateSpan(3); }, this);
                    this.__labelRepair[0].addListener("dblclick", function () { this.loadSpanFormation(0); }, this);
                    this.__labelRepair[1].addListener("dblclick", function () { this.loadSpanFormation(1); }, this);
                    this.__labelRepair[2].addListener("dblclick", function () { this.loadSpanFormation(2); }, this);
                    this.__labelRepair[3].addListener("dblclick", function () { this.loadSpanFormation(3); }, this);

                    this.add(playerRepair);

                    //Battle Loot Section//
                    var battleLootHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({decorator: "pane-light-opaque"});
                    var battleLootTitle = new qx.ui.basic.Label(qxApp.tr("tnf:lootable resources:")).set({alignX: "center", alignY: "top", font: "font_size_13_bold"});
                    battleLootHeader.add(battleLootTitle);
                    this.add(battleLootHeader);

                    var battleLoot = new qx.ui.container.Composite(new qx.ui.layout.HBox(5).set({spacing: 0})).set({decorator: "pane-light-plain", allowGrowX: true, marginLeft: 0, marginRight: 0});
                    var battleLootBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({width: 29, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0});

                    var battleLootTib = new qx.ui.basic.Atom(null, img.Loot.Tiberium).set({toolTipText: qxApp.tr("tnf:tiberium"), toolTipIcon: img.Loot.Tiberium, alignX: "right", alignY: "middle", gap: 0, iconPosition: "top"});
                    var battleLootCry = new qx.ui.basic.Atom(null, img.Loot.Crystal).set({toolTipText: qxApp.tr("tnf:crystals"), toolTipIcon: img.Loot.Crystal, alignX: "right", alignY: "middle", gap: 0, iconPosition: "top"});
                    var battleLootCred = new qx.ui.basic.Atom(null, img.Loot.Credits).set({toolTipText: qxApp.tr("tnf:credits"), toolTipIcon: img.Loot.Credits, alignX: "right", alignY: "middle", gap: 0, iconPosition: "top"});
                    var battleLootRP = new qx.ui.basic.Atom(null, img.Loot.RP).set({toolTipText: qxApp.tr("tnf:research points"), toolTipIcon: img.Loot.RP, alignX: "right", alignY: "middle", gap: 0, iconPosition: "top"});
                    var battleLootTotal = new qx.ui.basic.Atom(null, img.Loot.Total).set({toolTipText: qxApp.tr("tnf:total") + " " + qxApp.tr("tnf:loot"), toolTipIcon: img.Loot.Total, alignX: "right", alignY: "middle", gap: 0, iconPosition: "top"});

                    battleLootTib.getChildControl("icon").set({width: 18, height: 18, scale: true});
                    battleLootCry.getChildControl("icon").set({width: 18, height: 18, scale: true});
                    battleLootCred.getChildControl("icon").set({width: 18, height: 18, scale: true});
                    battleLootRP.getChildControl("icon").set({width: 18, height: 18, scale: true});
                    battleLootTotal.getChildControl("icon").set({width: 18, height: 18, scale: true});

                    battleLootBox.add(battleLootTib);
                    battleLootBox.add(battleLootCry);
                    battleLootBox.add(battleLootCred);
                    battleLootBox.add(battleLootRP);
                    battleLootBox.add(battleLootTotal);

                    battleLoot.add(battleLootBox);

                    for (var i = 0; i < 4; i++) {
                        this.__labelBattleLoot[i] = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({width: 70, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0, decorator: "pane-light-opaque"});

                        this.__labelBattleLootTib[i] = new qx.ui.basic.Label("-").set({alignX: "right"});
                        this.__labelBattleLootCry[i] = new qx.ui.basic.Label("-").set({alignX: "right"});
                        this.__labelBattleLootCred[i] = new qx.ui.basic.Label("-").set({alignX: "right"});
                        this.__labelBattleLootRP[i] = new qx.ui.basic.Label("-").set({alignX: "right"});
                        this.__labelBattleLootTotal[i] = new qx.ui.basic.Label("-").set({alignX: "right"});

                        this.__labelBattleLoot[i].add(this.__labelBattleLootTib[i]);
                        this.__labelBattleLoot[i].add(this.__labelBattleLootCry[i]);
                        this.__labelBattleLoot[i].add(this.__labelBattleLootCred[i]);
                        this.__labelBattleLoot[i].add(this.__labelBattleLootRP[i]);
                        this.__labelBattleLoot[i].add(this.__labelBattleLootTotal[i]);

                        battleLoot.add(this.__labelBattleLoot[i], {
                            flex: 1
                        });
                    }

                    this.__labelBattleLoot[0].addListener("click", function () { this.selectSimulateSpan(0); }, this);
                    this.__labelBattleLoot[1].addListener("click", function () { this.selectSimulateSpan(1); }, this);
                    this.__labelBattleLoot[2].addListener("click", function () { this.selectSimulateSpan(2); }, this);
                    this.__labelBattleLoot[3].addListener("click", function () { this.selectSimulateSpan(3); }, this);
                    this.__labelBattleLoot[0].addListener("dblclick", function () { this.loadSpanFormation(0); }, this);
                    this.__labelBattleLoot[1].addListener("dblclick", function () { this.loadSpanFormation(1); }, this);
                    this.__labelBattleLoot[2].addListener("dblclick", function () { this.loadSpanFormation(2); }, this);
                    this.__labelBattleLoot[3].addListener("dblclick", function () { this.loadSpanFormation(3); }, this);

                    this.add(battleLoot);

                    this.selectSimulateSpan(0);

                    //Simulate Button//
                    var simButton = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({padding: 5, decorator: "pane-light-opaque"});
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
                    enemyHealthHeader.addListener("click", function () {
                        if (enemyHealth.isVisible())
                            enemyHealth.exclude();
                        else
                            enemyHealth.show();
                    }, this);

                    playerRepairHeader.addListener("click", function () {
                        if (playerRepair.isVisible())
                            playerRepair.exclude();
                        else
                            playerRepair.show();
                    }, this);

                    battleLootHeader.addListener("click", function () {
                        if (battleLoot.isVisible())
                            battleLoot.exclude();
                        else
                            battleLoot.show();
                    }, this);

                    if (typeof localStorage['hideHealth'] != 'undefined') {
                        if (localStorage['hideHealth'] == "yes")
                            enemyHealth.exclude();
                    }

                    if (typeof localStorage['hideRepair'] != 'undefined') {
                        if (localStorage['hideRepair'] == "yes")
                            playerRepair.exclude();
                    }

                    if (typeof localStorage['hideLoot'] != 'undefined') {
                        if (localStorage['hideLoot'] == "yes")
                            battleLoot.exclude();
                    }

                    this.isSimStatButtonDisabled = false;

                    Simulator.getInstance().attachNetEvent(ClientLib.API.Battleground.GetInstance(), "OnSimulateBattleFinished", ClientLib.API.OnSimulateBattleFinished, this, this.__OnSimulateBattleFinished);
                },

                destruct: function () {},

                members: {
                    simStatBtn: null,
                    simReplayBtn: null,
                    armySpanFormations: [],
                    __span: 0,
                    __labelMisc: [],
                    __labelMiscOutcome: [],
                    __labelMiscBattleDuration: [],
                    __labelEnemy: [],
                    __labelEnemyOverallHealth: [],
                    __labelEnemyBaseHealth: [],
                    __labelEnemyDefenseHealth: [],
                    __labelEnemyCYHealth: [],
                    __labelEnemyDFHealth: [],
                    __labelRepair: [],
                    __labelRepairStorage: [],
                    __labelRepairOverall: [],
                    __labelRepairInf: [],
                    __labelRepairVehi: [],
                    __labelRepairAir: [],
                    __labelBattleLoot: [],
                    __labelBattleLootTotal: [],
                    __labelBattleLootTib: [],
                    __labelBattleLootCry: [],
                    __labelBattleLootCred: [],
                    __labelBattleLootRP: [],
                    isSimStatButtonDisabled: null,

                    simulateStats: function () {
                        console.log("Simulating Stats");
                        var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
                        if (city != null) {
                            Simulator.getInstance().isSimulation = true;
                            Simulator.getInstance().saveTempFormation();
                            localStorage.ta_sim_last_city = city.get_Id();
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

                            setTimeout(function () {
                                var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
                                var battleDuration = battleground.get_BattleDuration();
                                battleDuration = Simulator.StatWindow.getInstance().formatBattleDurationTime(battleDuration);
                                Simulator.StatWindow.getInstance().__labelMiscBattleDuration[Simulator.StatWindow.getInstance().__span].setValue(battleDuration);
                            }, 1000);

                            if (this.simReplayBtn.getEnabled() == false)
                                this.simReplayBtn.setEnabled(true);
                        }
                    },

                    doSimReplay: function () {
                        try {
                            Simulator.getInstance().isSimulation = true;
                            var app = qx.core.Init.getApplication();
                            app.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatReplay, localStorage.ta_sim_last_city, 0, 0);

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
                        } catch (e) {
                            console.log("Error attempting to show Simulation Replay");
                            console.log(e.toString());
                        }
                    },

                    __OnSimulateBattleFinished: function (data) {
                        this.getSimulationInfo(data);
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
                            if (eHealth > 0) {
                                dmgRatio = ((sHealth - eHealth) / 16) / mHealth;
                            } else {
                                dmgRatio = (sHealth / 16) / mHealth;
                            }
                            //var currOwnCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
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

                    getSimulationInfo: function (data) {
                        console.log("Getting Player Unit Damage");
                        try {
                            var crystals = 0,
                                infCry = 0,
                                vehiCry = 0,
                                airCry = 0;
                            var allSH = 0,
                                allEH = 0,
                                allMH = 0,
                                allHP = 0;
                            var baseSH = 0,
                                baseEH = 0,
                                baseMH = 0,
                                baseHP = 0;
                            var defSH = 0,
                                defEH = 0,
                                defMH = 0,
                                defHP = 0;
                            var infSH = 0,
                                infEH = 0,
                                infMH = 0,
                                infHP = 0;
                            var vehiSH = 0,
                                vehiEH = 0,
                                vehiMH = 0,
                                vehiHP = 0;
                            var airSH = 0,
                                airEH = 0,
                                airMH = 0,
                                airHP = 0;
                            var infRT = 0,
                                vehiRT = 0,
                                airRT = 0;
                            var cySH = 0,
                                cyEH = 0,
                                cyMH = 0,
                                cyHP = 0;
                            var dfSH = 0,
                                dfEH = 0,
                                dfMH = 0,
                                dfHP = 0;
                            var costs = {};
                            var entities = []; //for calculating loot
                            var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                            var defBonus = city.get_AllianceDefenseBonus();
                            for (var idx = 0; idx < data.length; idx++) {
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
                                switch (pType) {
                                case ClientLib.Base.EPlacementType.Defense:
                                    allMH += mHealth;
                                    allEH += eHealth;
                                    defMH += mHealth;
                                    defEH += eHealth;
                                    break;
                                case ClientLib.Base.EPlacementType.Offense:
                                    switch (mType) {
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
                                    switch (uMDBID) {
                                    case 151:
                                    case 112:
                                    case 233:
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
                            var qxApp = qx.core.Init.getApplication();
                            if (allOffHP == 0) {
                                this.__labelMiscOutcome[this.__span].resetLabel();
                                this.__labelMiscOutcome[this.__span].setToolTipText(qxApp.tr("tnf:total defeat"));
                                this.__labelMiscOutcome[this.__span].setIcon("FactionUI/icons/icon_reports_total_defeat.png");
                            } else if (cyEH == 0) {
                                this.__labelMiscOutcome[this.__span].resetLabel();
                                this.__labelMiscOutcome[this.__span].setToolTipText(qxApp.tr("tnf:total victory"));
                                this.__labelMiscOutcome[this.__span].setIcon("FactionUI/icons/icon_reports_total_victory.png");
                            } else {
                                this.__labelMiscOutcome[this.__span].resetLabel();
                                this.__labelMiscOutcome[this.__span].setToolTipText(qxApp.tr("tnf:victory"));
                                this.__labelMiscOutcome[this.__span].setIcon("FactionUI/icons/icon_reports_victory.png");
                            }

                            this.__labelEnemyOverallHealth[this.__span].setValue(allHP.toFixed(2) + ' %');
                            this.setEHLabelColor(this.__labelEnemyOverallHealth[this.__span], allHP.toFixed(2));

                            this.__labelEnemyDefenseHealth[this.__span].setValue(defHP.toFixed(2) + ' %');
                            this.setEHLabelColor(this.__labelEnemyDefenseHealth[this.__span], defHP.toFixed(2));

                            this.__labelEnemyBaseHealth[this.__span].setValue(baseHP.toFixed(2) + ' %');
                            this.setEHLabelColor(this.__labelEnemyBaseHealth[this.__span], baseHP.toFixed(2));

                            this.__labelEnemyCYHealth[this.__span].setValue(cyHP.toFixed(2) + ' %');
                            this.setEHLabelColor(this.__labelEnemyCYHealth[this.__span], cyHP.toFixed(2));

                            this.__labelEnemyDFHealth[this.__span].setValue(dfHP.toFixed(2) + ' %');
                            this.setEHLabelColor(this.__labelEnemyDFHealth[this.__span], dfHP.toFixed(2));

                            var getRTSelection = localStorage['getRTSelection'];

                            var qxApp = qx.core.Init.getApplication();
                            if (typeof getRTSelection != 'undefined') {
                                if (getRTSelection == "rt") {
                                    this.__labelRepairOverall[this.__span].setValue(allOffRT);
                                    this.__labelRepairOverall[this.__span].setToolTipText(qxApp.tr("tnf:crystals") + ": " + crystals + "</br>HP: " + allOffHP.toFixed(2) + "%");
                                    this.__labelRepairInf[this.__span].setValue(infRT);
                                    this.__labelRepairInf[this.__span].setToolTipText(qxApp.tr("tnf:crystals") + ": " + infCry + "</br>HP: " + infHP.toFixed(2) + "%");
                                    this.__labelRepairVehi[this.__span].setValue(vehiRT);
                                    this.__labelRepairVehi[this.__span].setToolTipText(qxApp.tr("tnf:crystals") + ": " + vehiCry + "</br>HP: " + vehiHP.toFixed(2) + "%");
                                    this.__labelRepairAir[this.__span].setValue(airRT);
                                    this.__labelRepairAir[this.__span].setToolTipText(qxApp.tr("tnf:crystals") + ": " + airCry + "</br>HP: " + airHP.toFixed(2) + "%");
                                } else if (getRTSelection == "cry") {
                                    this.__labelRepairOverall[this.__span].setValue(crystals);
                                    this.__labelRepairOverall[this.__span].setToolTipText("RT: " + allOffRT + "</br>HP: " + allOffHP.toFixed(2) + "%");
                                    this.__labelRepairInf[this.__span].setValue(infCry);
                                    this.__labelRepairInf[this.__span].setToolTipText("RT: " + infRT + "</br>HP: " + infHP.toFixed(2) + "%");
                                    this.__labelRepairVehi[this.__span].setValue(vehiCry);
                                    this.__labelRepairVehi[this.__span].setToolTipText("RT: " + vehiRT + "</br>HP: " + vehiHP.toFixed(2) + "%");
                                    this.__labelRepairAir[this.__span].setValue(airCry);
                                    this.__labelRepairAir[this.__span].setToolTipText("RT: " + airRT + "</br>HP: " + airHP.toFixed(2) + "%");
                                } else if (getRTSelection == "hp") {
                                    this.__labelRepairOverall[this.__span].setValue(allOffHP.toFixed(2) + " %");
                                    this.__labelRepairOverall[this.__span].setToolTipText("RT: " + allOffRT + "</br>" + qxApp.tr("tnf:crystals") + ": " + crystals);
                                    this.__labelRepairInf[this.__span].setValue(infHP.toFixed(2) + " %");
                                    this.__labelRepairInf[this.__span].setToolTipText("RT: " + infRT + "</br>" + qxApp.tr("tnf:crystals") + ": " + infCry);
                                    this.__labelRepairVehi[this.__span].setValue(vehiHP.toFixed(2) + " %");
                                    this.__labelRepairVehi[this.__span].setToolTipText("RT: " + vehiRT + "</br>" + qxApp.tr("tnf:crystals") + ": " + vehiCry);
                                    this.__labelRepairAir[this.__span].setValue(airHP.toFixed(2) + " %");
                                    this.__labelRepairAir[this.__span].setToolTipText("RT: " + airRT + "</br>" + qxApp.tr("tnf:crystals") + ": " + airCry);
                                } else {
                                    this.__labelRepairOverall[this.__span].setValue(allOffRT);
                                    this.__labelRepairOverall[this.__span].setToolTipText(qxApp.tr("tnf:crystals") + ": " + crystals + "</br>HP: " + allOffHP.toFixed(2) + "%");
                                    this.__labelRepairInf[this.__span].setValue(infRT);
                                    this.__labelRepairInf[this.__span].setToolTipText(qxApp.tr("tnf:crystals") + ": " + infCry + "</br>HP: " + infHP.toFixed(2) + "%");
                                    this.__labelRepairVehi[this.__span].setValue(vehiRT);
                                    this.__labelRepairVehi[this.__span].setToolTipText(qxApp.tr("tnf:crystals") + ": " + vehiCry + "</br>HP: " + vehiHP.toFixed(2) + "%");
                                    this.__labelRepairAir[this.__span].setValue(airRT);
                                    this.__labelRepairAir[this.__span].setToolTipText(qxApp.tr("tnf:crystals") + ": " + airCry + "</br>HP: " + airHP.toFixed(2) + "%");
                                }
                            } else //default
                            {
                                this.__labelRepairOverall[this.__span].setValue(allOffRT);
                                this.__labelRepairOverall[this.__span].setToolTipText(qxApp.tr("tnf:crystals") + ": " + crystals + "</br>HP: " + allOffHP.toFixed(2) + "%");
                                this.__labelRepairInf[this.__span].setValue(infRT);
                                this.__labelRepairInf[this.__span].setToolTipText(qxApp.tr("tnf:crystals") + ": " + infCry + "</br>HP: " + infHP.toFixed(2) + "%");
                                this.__labelRepairVehi[this.__span].setValue(vehiRT);
                                this.__labelRepairVehi[this.__span].setToolTipText(qxApp.tr("tnf:crystals") + ": " + vehiCry + "</br>HP: " + vehiHP.toFixed(2) + "%");
                                this.__labelRepairAir[this.__span].setValue(airRT);
                                this.__labelRepairAir[this.__span].setToolTipText(qxApp.tr("tnf:crystals") + ": " + airCry + "</br>HP: " + airHP.toFixed(2) + "%");
                            }

                            this.setRTLabelColor(this.__labelRepairOverall[this.__span], allOffHP.toFixed(2));
                            this.setRTLabelColor(this.__labelRepairInf[this.__span], infHP.toFixed(2));
                            this.setRTLabelColor(this.__labelRepairVehi[this.__span], vehiHP.toFixed(2));
                            this.setRTLabelColor(this.__labelRepairAir[this.__span], airHP.toFixed(2));

                            if (infRT === allOffRT && infHP < 100)
                                this.__labelRepairInf[this.__span].setTextColor("black");
                            else if (vehiRT === allOffRT && vehiHP < 100)
                                this.__labelRepairVehi[this.__span].setTextColor("black");
                            else if (airRT === allOffRT && airHP < 100)
                                this.__labelRepairAir[this.__span].setTextColor("black");

                            var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();

                            var currRTStorage = Math.max(ownCity.GetResourceCount(8), ownCity.GetResourceCount(9), ownCity.GetResourceCount(10));
                            this.__labelRepairStorage[this.__span].setValue(phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(currRTStorage)));

                            if (currRTStorage > allOffRTInSeconds)
                                this.__labelRepairStorage[this.__span].setTextColor("darkgreen");
                            else
                                this.__labelRepairStorage[this.__span].setTextColor("red");

                            //Calculates the possible resources gained from simulation
                            this.calcResources(entities);

                            this.saveSpanFormation(this.__span);
                        } catch (e) {
                            console.log("Error Getting Player Unit Damage");
                            console.log(e.toString());
                        }
                    },

                    /**
                     * All credit for the main layout of this function goes to KRS_L. Thanks to Topper42 and Deyhak for talking about it in the forums!
                     */
                    calcResources: function (entities) {
                        try {
                            //So we can splice and reduce the amount of time looping later on
                            buildingEnts = entities;
                            defEnts = entities;

                            var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();

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
                                                        mHealth = Simulator.getInstance().GetUnitMaxHealth(entity.l, unit);
                                                        mod = ((entity.sh - entity.h) / 16) / mHealth;
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
                                                        mHealth = Simulator.getInstance().GetUnitMaxHealth(entity.l, unit);
                                                        mod = ((entity.sh - entity.h) / 16) / mHealth;
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

                            var totalLoot = lootArray[1] + lootArray[2] + lootArray[3] + lootArray[6];
                            if (typeof entities == 'undefined') {
                                for (i = 0; i < 4; i++) {
                                    this.__labelBattleLootTotal[i].setValue(Simulator.getInstance().formatNumbersCompact(totalLoot));
                                    this.__labelBattleLootTotal[i].setToolTipText("");
                                    this.__labelBattleLootTib[i].setValue(Simulator.getInstance().formatNumbersCompact(lootArray[1]));
                                    this.__labelBattleLootTib[i].setToolTipText("");
                                    this.__labelBattleLootCry[i].setValue(Simulator.getInstance().formatNumbersCompact(lootArray[2]));
                                    this.__labelBattleLootCry[i].setToolTipText("");
                                    this.__labelBattleLootCred[i].setValue(Simulator.getInstance().formatNumbersCompact(lootArray[3]));
                                    this.__labelBattleLootCred[i].setToolTipText("");
                                    this.__labelBattleLootRP[i].setValue(Simulator.getInstance().formatNumbersCompact(lootArray[6]));
                                    this.__labelBattleLootRP[i].setToolTipText("");
                                }
                            } else {
                                this.__labelBattleLootTotal[this.__span].setToolTipText("Base: " + this.__labelBattleLootTotal[this.__span].getValue());
                                this.__labelBattleLootTotal[this.__span].setValue(Simulator.getInstance().formatNumbersCompact(totalLoot));
                                this.__labelBattleLootTib[this.__span].setToolTipText("Base: " + this.__labelBattleLootTib[this.__span].getValue());
                                this.__labelBattleLootTib[this.__span].setValue(Simulator.getInstance().formatNumbersCompact(lootArray[1]));
                                this.__labelBattleLootCry[this.__span].setToolTipText("Base: " + this.__labelBattleLootCry[this.__span].getValue());
                                this.__labelBattleLootCry[this.__span].setValue(Simulator.getInstance().formatNumbersCompact(lootArray[2]));
                                this.__labelBattleLootCred[this.__span].setToolTipText("Base: " + this.__labelBattleLootCred[this.__span].getValue());
                                this.__labelBattleLootCred[this.__span].setValue(Simulator.getInstance().formatNumbersCompact(lootArray[3]));
                                this.__labelBattleLootRP[this.__span].setToolTipText("Base: " + this.__labelBattleLootRP[this.__span].getValue());
                                this.__labelBattleLootRP[this.__span].setValue(Simulator.getInstance().formatNumbersCompact(lootArray[6]));
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
                    },

                    selectSimulateSpan: function (span) {
                        this.__span = span;
                        for (var i = 0; i < 4; i++) {
                            if (i == this.__span) {
                                var j = "pane-light-opaque";
                                var k = 1;
                            } else {
                                var j = "pane-light-plain";
                                var k = 0.6;
                            }
                            this.__labelMisc[i].set({
                                decorator: j,
                                opacity: k
                            });
                            this.__labelEnemy[i].set({
                                decorator: j,
                                opacity: k
                            });
                            this.__labelRepair[i].set({
                                decorator: j,
                                opacity: k
                            });
                            this.__labelBattleLoot[i].set({
                                decorator: j,
                                opacity: k
                            });
                        }
                    },

                    loadSpanFormation: function (stat) {
                        try {
                            Simulator.getInstance().restoreFormation(this.armySpanFormations[stat]);
                        } catch (e) {
                            console.log("Error loading Stat Formation");
                            console.log(e.toString());
                        }
                    },

                    saveSpanFormation: function (stat) {
                        try {
                            var formation = [];
                            var unitList = Simulator.getInstance().getCityPreArmyUnits().get_ArmyUnits().l;

                            for (var i = 0; i < unitList.length; i++) {
                                var unit = unitList[i];
                                var unitInfo = {};
                                unitInfo.x = unit.get_CoordX();
                                unitInfo.y = unit.get_CoordY();
                                unitInfo.id = unit.get_Id();
                                unitInfo.enabled = unit.get_Enabled();

                                formation.push(unitInfo);
                            }
                            this.armySpanFormations[stat] = formation;
                        } catch (e) {
                            console.log("Error Saving Stat Formation");
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
                        height: 300,
                        allowMaximize: false,
                        showMaximize: false,
                        allowMinimize: false,
                        showMinimize: false
                    });
                    var tabView = new qx.ui.tabview.TabView();
                    tabView.set({
                        height: 295,
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
                    _hideHealthCB: null,
                    _hideRepairCB: null,
                    _hideMiscCB: null,
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
                            Simulator.getInstance().quickSaveBtn.setLabel("✔");
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

                            // Strange Hacks - provided by Topper42
                            // don't try this at home ;)
                            if (typeof ClientLib.API.Util.GetUnitMaxHealth == 'undefined')
                                for (var key in ClientLib.Base.Util) {
                                    var strFunction = ClientLib.Base.Util[key].toString();
                                    if (strFunction.indexOf("*=1.1") > -1 || strFunction.indexOf("*= 1.1") > -1) {
                                        Simulator.getInstance().GetUnitMaxHealth = ClientLib.Base.Util[key];
                                        break;
                                    }
                            } else
                                Simulator.getInstance().GetUnitMaxHealth = ClientLib.API.Util.GetUnitMaxHealth;

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


// =========================================================================  MaelstromTools ================================================================

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
                        var link = new qx.ui.form.Button("CNCOpt", "http://cncopt.com/favicon.ico");
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
				var btnMoveUp=new qx.ui.form.Button("H‘").set({height:40,toolTipText:"hoch"});
				var btnMoveDown=new qx.ui.form.Button("R“").set({height:40,toolTipText:"runter"});

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

// =========================================================================  Weltkarte   ==================================================================

(function () {
	var TAMap_mainFunction = function () {
		function createMapTweak() {
			var TAMap = {};
			qx.Class.define("TAMap", {
				type : "singleton",
				extend : qx.core.Object,
				members : {
					version : "1.6.9",
					alliances : null,
					alliancesAreLoaded : false,
					buttonMap : null,
					blurInterval : null,
					drawingNow : false,
					initZoom : null,
					isInitialized : false,
					mapBox : null,
					mapCanvas : null,
					canvasElement : null,
					canvasWidth : null,
					canvasHeight : null,
					mapMouseCanvas : null,
					mapMouseWidget : null,
					scroll : null,
					scrollWidget : null,
					settingsWnd : null,
					mapUpdateTimer : null,
					relations : {
						enemies : null,
						enemiesById : null,
						enemyCoords : [],
						allies : null,
						nap : null
					},
					swObj : {
						isLoaded : false,
						refreshIcon : null,
						allianceSelect : null,
						allianceListItem : {},
						poiSelect : null,
						obfSectorName : null,
						obfAllianceList : null,
						obfAllianceId : null,
						obfAllianceName : null,
						settingFields : {},
						labels : {},
						chkBoxFields : {},
						coordButtons : {}
					},
					line : {
						1 : {
							x : null,
							y : null
						},
						2 : {
							x : null,
							y : null
						}
					},
					visOptions : null,
					visOpt_DEFAULTS : {
						selectedAllianceId : -1,
						selectedAllianceName : "<< None >>",
						poi : -2,
						vpWidth : null,
						vpHeight : null,
						showEnemies : true,
						showEnemyRange : true,
						mapBoxBounds : {
							height : 500,
							top : 33,
							left : 129,
							width : 500
						},
						settingsWndBounds : {
							height : 646,
							top : 48,
							left : 615,
							width : 524
						},
						chk : {
							showAlliancePois : false,
							showOwnCities : true,
							showSectionFrame : true,
							showBorderLine1 : false,
							showBorderLine2 : false,
							fadeMap : true
						},
						settingsPanel : {
							playerColor : "#7F0", // type = 1
							baseColor : "#550", // type = 2
							campColor : "midnightblue", // type = 3, CampType=2
							outpostColor : "royalblue", // type = 3, CampType=3
							poiColor : "orange", // type = 4, POIType != 0
							tunnelColor : "forestgreen", // type = 4, POIType = 0
							enemyBaseColor : "red",
							allianceTerrainColor : "rgba(255,255,255,0.5)",
							ownBaseColor : "rgba(0,255,0,0.5)",
							highlightColor : "rgba(200,255,200,1)",
							line1start : "800:796",
							line1end : "1387:921",
							line1color : "rgba(0,255,0,0.3)",
							line2start : "800:796",
							line2end : "1410:830",
							line2color : "rgba(255,255,0,0.3)",
							zoomFactor : 3
						}
					},

					initialize : function () {
						console.log("\nTAMap v" + this.version + ": Loaded");
						this.init_vars();
						this.init_menuButton();
						this.init_mapBox();
						this.init_scroll();
						this.init_settingsWnd();
						this.init_settingsButton();
						this.init_mapBox_listeners();
						this.isInitialized = true;
					},

					init_vars : function () {
						// cloning
						var vTemp = JSON.parse(JSON.stringify(this.visOpt_DEFAULTS));
						if (localStorage) {
							var sto = localStorage.getItem("TAMapStorage");
							if (sto != null) {
								// check visOptions integrity against DEFAULTS
								this.visOptions = JSON.parse(sto);
								for (var i in vTemp) {
									if (typeof this.visOptions[i] == "object") {
										for (var j in vTemp[i]) {
											if (typeof this.visOptions[i][j] == "undefined") {
												console.log("\nSolving inconsistency with visOptions." + i + "." + j + "\n");
												this.visOptions[i][j] = vTemp[i][j];
											}
										}
									} else if (typeof this.visOptions[i] == "undefined") {
										console.log("Solving inconsistency with visOptions." + i);
										this.visOptions[i] = vTemp[i];
									}
								}
							} else {
								this.visOptions = vTemp;
							}
						}
						this.initZoom = this.visOptions.settingsPanel.zoomFactor;
						this.worldHeight = ClientLib.Data.MainData.GetInstance().get_World().get_WorldHeight();
						this.worldWidth = ClientLib.Data.MainData.GetInstance().get_World().get_WorldWidth();
						this.canvasHeight = this.worldHeight * this.initZoom;
						this.canvasWidth = this.worldWidth * this.initZoom;
					},

					init_menuButton : function () {
						this.buttonMap = new qx.ui.form.Button("Weltkarte");
						this.buttonMap.set({
							width : 80,
							appearance : "button-bar-center",
							toolTipText : ""
						});
						this.buttonMap.addListener("click", this.toggleMap, this);
						var mainBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_MENU);
						mainBar.getChildren()[1].addAt(this.buttonMap, 8, {
							top : 0,
							right : 0
						});
					},

					init_mapBox : function () {
						// The Map window
						this.mapBox = new qx.ui.window.Window("Mini-Map  [v" + this.version + "]");
						this.mapBox.setPadding(1);
						this.mapBox.setLayout(new qx.ui.layout.Grow());
						// this.mapBox.setLayout(new qx.ui.layout.VBox());
						this.mapBox.setShowMaximize(false);
						this.mapBox.setShowMinimize(false);
						this.mapBox.moveTo(this.visOptions.mapBoxBounds.left, this.visOptions.mapBoxBounds.top);
						this.mapBox.setHeight(this.visOptions.mapBoxBounds.height);
						this.mapBox.setWidth(this.visOptions.mapBoxBounds.width);
						this.mapBox.setMinWidth(10);
						this.mapBox.setMinHeight(10);
						this.mapBox.setBackgroundColor("black");
					},

					init_scroll : function () {
						var cw = this.canvasWidth;
						var ch = this.canvasHeight;
						this.scroll = new qx.ui.container.Scroll();

						//this.scroll.removeListener("mousewheel", this.scroll._onMouseWheel, this.scroll);
						this.scroll.addListener("mousewheel", function (evt) {
							console.log(evt.getWheelDelta());
						}, this);

						this.mapBox.add(this.scroll);

						this.scrollWidget = new qx.ui.core.Widget();
						this.scrollWidget.setMinHeight(ch);
						this.scrollWidget.setMinWidth(cw);
						this.scrollWidget.setHeight(ch);
						this.scrollWidget.setWidth(cw);
						this.scroll.add(this.scrollWidget);

						this.canvasElement = new qx.html.Element("canvas", null, {
								id : "map",
								width : cw,
								height : ch
							});
						this.canvasElement.addListener("appear", function () {
							//console.log("appeared:" + this.canvasElement.getDomElement());
							this.createMapCanvas();
						}, this);
						this.scrollWidget.getContentElement().add(this.canvasElement);
					},

					init_settingsWnd : function () {
						try {
							/* select box for alliances */
							var selectBox = new qx.ui.form.SelectBox();
							var _this = this;
							selectBox.addListener("changeSelection", function (e) {
								try {
									if (e != null && e.getData() && e.getData().length > 0) {
										var mod = e.getData()[0].getModel();
										console.log("Alliance selected: ");
										console.log(mod);
										console.log("e.getData()[0]: ");
										console.log(e.getData()[0]);

										this.visOptions.selectedAllianceId = mod; // alliance ID or -1 for none
										console.log("saved: " + mod);
										this.visOptions.selectedAllianceName = this.swObj.allianceListItem[mod].getLabel();
										if (this.visOptions.selectedAllianceId != -1) {
											this.swObj.chkBoxFields.showAlliancePois.setEnabled(true);
										}

										this.saveOptions();
										this.updateMap();
									}
								} catch (err) {
									console.log("alliance changeSelection error:");
									console.log(err);
								}
							}, this);
							this.swObj.allianceSelect = selectBox;

							// this.mapBox.add(selectBox);

							/* Select box for POI Type */
							selectBox = new qx.ui.form.SelectBox();

							var currentSelection = this.visOptions.poi || -2;
							var makePoiItem = function (model, name) {
								var item = new qx.ui.form.ListItem(name, null, model);
								selectBox.add(item);
								if (currentSelection == model) {
									selectBox.setSelection([item]);
								}
							}

							FPOI = ClientLib.Data.WorldSector.WorldObjectPointOfInterest.EPOIType;
							makePoiItem(-2, "<< All >>");
							makePoiItem(-1, "<< None >>");
							makePoiItem(FPOI.TiberiumMine, "Tiberium");
							makePoiItem(FPOI.CrystalMine, "Crystal");
							makePoiItem(FPOI.PowerVortex, "Reactor");
							makePoiItem(FPOI.Infantery, "Tungsten INF");
							makePoiItem(FPOI.Vehicle, "Uranium VEH");
							makePoiItem(FPOI.Air, "Aircraft");
							makePoiItem(FPOI.Defense, "Resonator DEF");
							//makePoiItem(FPOI.TunnelExit,"Tunnel Exit");

							/* ClientLib.Base.EPOIType is not consistent with ClientLib.Data.WorldSector.WorldObjectPointOfInterest.EPOIType
							makePoiItem(ClientLib.Base.EPOIType.AirBonus, "Aircraft GNT (Off Air)");
							makePoiItem(ClientLib.Base.EPOIType.CrystalBonus, "Crystal CNH");
							makePoiItem(ClientLib.Base.EPOIType.DefenseBonus, "Resonator NT (Def)");
							makePoiItem(ClientLib.Base.EPOIType.InfanteryBonus, "Tungsten C (Off Inf)");
							makePoiItem(ClientLib.Base.EPOIType.PowerBonus, "Reactor (Power Bonus)");
							makePoiItem(ClientLib.Base.EPOIType.TiberiumBonus, "Tiberium CN");
							makePoiItem(ClientLib.Base.EPOIType.VehicleBonus, "Uranium C (Off Vehicles)");
							 */

							selectBox.addListener("changeSelection", function (e) {
								try {
									if (e != null && e.getData() && e.getData().length > 0) {
										console.log("POI selected " + e.getData()[0].getModel());
										_this.visOptions.poi = e.getData()[0].getModel(); // POI ID or -2 for all
										this.saveOptions();
										this.updateMap();
									}
								} catch (err) {
									console.log(err);
								}
							}, this);
							this.swObj.poiSelect = selectBox;


							/* Settings Window */
							this.settingsWnd = new qx.ui.window.Window("Map Settings");
							this.settingsWnd.setPadding(10);
							//this.mapBox.setLayout(new qx.ui.layout.Grow());

							var layout = new qx.ui.layout.Grid();
							layout.setSpacing(5);
							layout.setColumnAlign(0, "right", "center");
							layout.setColumnAlign(1, "left", "center");
							layout.setColumnAlign(2, "left", "center");
							layout.setColumnAlign(3, "right", "center");
							layout.setColumnAlign(4, "left", "center");
							this.settingsWnd.setLayout(layout);
							this.settingsWnd.setShowMaximize(false);
							this.settingsWnd.setShowMinimize(false);
							this.settingsWnd.moveTo(this.visOptions.settingsWndBounds.left, this.visOptions.settingsWndBounds.top);
							this.settingsWnd.setHeight(this.visOptions.settingsWndBounds.height);
							this.settingsWnd.setWidth(this.visOptions.settingsWndBounds.width);
							this.settingsWnd.setMinWidth(10);
							this.settingsWnd.setMinHeight(10);
							this.settingsWnd.addListener("close", function () {
								this.visOptions.settingsWndBounds = this.settingsWnd.getBounds();
								this.saveOptions();
							}, this);

							/* Reset Button */
							var resetAllOptions = new qx.ui.form.Button("Full Reset");
							resetAllOptions.set({
								appearance : "button-text-small",
								toolTipText : '<div style="color:#F22">Reset All options to default</div>',
							});

							resetAllOptions.addListener("click", function () {
								if (confirm("Are you sure? This will return all settings to default.")) {
									this.visOptions = JSON.parse(JSON.stringify(this.visOpt_DEFAULTS));
									this.saveOptions();
									for (var option in this.visOptions.chk) {
										//console.log("this.visOptions.chk." + option + " == " + this.visOptions.chk[option]);
										if (this.swObj.chkBoxFields[option]) {
											this.swObj.chkBoxFields[option].setValue(this.visOptions.chk[option]);
										} else {
											console.log(option + " ::: chkBoxFields does not exist.")
										}
									}
									for (var option in this.visOptions.settingsPanel) {
										if (option == "chk") {
											//do nothing
										} else if (this.swObj.settingFields[option]) {
											this.swObj.settingFields[option].setValue(String(this.visOptions.settingsPanel[option]));
										} else {
											console.log(option + " :: settingFields does not exist.")
										}
									}
									this.updateMap();
									this.scrollMapBox(false);
								}
							}, this);
							this.settingsWnd.add(resetAllOptions, {
								row : 14,
								column : 4
							});

							this.makeLbl("- Highlight -", 0, 0);
							this.makeLbl("Alliance POIs:", 1, 0);
							this.settingsWnd.add(this.swObj.allianceSelect, { row : 1, column : 1 });

							this.refreshIcon = new qx.ui.basic.Image("FactionUI/icons/icon_refresh_funds.png");
							this.settingsWnd.add(this.refreshIcon, { row : 1,column : 2 });

							this.refreshIcon.addListener("click", function () {
								this.populateAllianceSelect();
							}, this);

							this.makeLbl("POIs:", 2, 0);
							this.settingsWnd.add(this.swObj.poiSelect, {
								row : 2,
								column : 1
							});
							this.makeLbl("Alliance POIs:", 3, 0);
							/* Checkbox for alliance POIs */
							this.makeCheckbox("showAlliancePois",3,1);
							if (this.visOptions.selectedAllianceId == -1) {
								this.swObj.chkBoxFields.showAlliancePois.setEnabled(false);
							}
							this.makeLbl("Own Cities:", 4, 0);
							/* Checkbox for own bases */
							this.makeCheckbox("showOwnCities",4,1);
							this.makeLbl("Viewport Frame:", 5, 0);
							/* Checkbox for showSectionFrame */
							this.makeCheckbox("showSectionFrame",5,1);

							bt = new qx.ui.basic.Label("- Colors -").set({
									value : '<a href="http://www.w3schools.com/html/html_colornames.asp" style="font-size:16px;font-weight:bold;color:orange" target="_blank">- Colors -</a>',
									rich : true,
									selectable : true
								});
							this.settingsWnd.add(bt, {
								row : 6,
								column : 1,
							});
							// bt.addListener("click", function() { window.open("http://www.w3schools.com/html/html_colornames.asp") });


							this.makeLbl("Alliance Terrain:", 7, 0);
							this.makeTxt("allianceTerrainColor", 7, 1);

							this.makeLbl("Forg. Base:", 8, 0);
							this.makeTxt("baseColor", 8, 1);

							this.makeLbl("Camp:", 9, 0);
							this.makeTxt("campColor", 9, 1);

							this.makeLbl("Player:", 10, 0);
							this.makeTxt("playerColor", 10, 1);

							this.makeLbl("Enemy:", 11, 0);
							this.makeTxt("enemyBaseColor", 11, 1);
							//this.swObj.settingFields.enemyBaseColor.setEnabled(false);

							this.makeLbl("Outpost:", 12, 0);
							this.makeTxt("outpostColor", 12, 1);

							this.makeLbl("POI:", 13, 0);
							this.makeTxt("poiColor", 13, 1);

							this.makeLbl("Tunnel:", 14, 0);
							this.makeTxt("tunnelColor", 14, 1);

							this.makeLbl("Own Base:", 15, 0);
							this.makeTxt("ownBaseColor", 15, 1);
							//this.swObj.settingFields.ownBaseColor.setEnabled(false);

							this.makeLbl("Highlight:", 16, 0);
							this.makeTxt("highlightColor", 16, 1);
							//this.swObj.settingFields.highlightColor.setEnabled(false);

							/* Line Options */
							this.makeLbl(",.-^-.,", 0, 2, "'-.,.-'", "green");

							this.makeLbl("- Line -", 0, 3);


							this.makeLbl("Show Line", 1, 3);
							/* Checkbox for showBorderLine1 */
							this.makeCheckbox("showBorderLine1",1,4);

							this.makeLbl("Line Start:", 2, 3);
							this.makeTxt("line1start", 2, 4);
							this.makeCoordsSelectionButton("line1start", 2, 5, "\u2607");

							this.makeLbl("Line End:", 3, 3);
							this.makeTxt("line1end", 3, 4);
							this.makeCoordsSelectionButton("line1end", 3, 5, "\u2613");

							this.makeLbl("Line 1 Color:", 4, 3);
							this.makeTxt("line1color", 4, 4);

							this.makeLbl("Show Line 2", 5, 3);
							/* Checkbox for showBorderLine2 */
							this.makeCheckbox("showBorderLine2",5,4);

							this.makeLbl("Line Start:", 6, 3);
							this.makeTxt("line2start", 6, 4);
							this.makeCoordsSelectionButton("line2start", 6, 5, "\u2607");

							this.makeLbl("Line End:", 7, 3);
							this.makeTxt("line2end", 7, 4);
							this.makeCoordsSelectionButton("line2end", 7, 5, "\u2613");

							this.makeLbl("Line 2 Color:", 8, 3);
							this.makeTxt("line2color", 8, 4);
							
							this.makeLbl("Fade Map ?", 9, 3);
							this.makeCheckbox("fadeMap",9, 4);
							

							/* Zoom Buttons */
							this.makeLbl("Zoom Experimental!", 11, 4, null, "red");
							this.makeLbl("Zoom Factor:", 12, 3);
							this.makeTxt("zoomFactor", 12, 4);
							this.swObj.settingFields.zoomFactor.setValue(String(this.initZoom));
							this.swObj.settingFields.zoomFactor.setTextAlign("right");
							this.swObj.settingFields.zoomFactor.setEnabled(false);
							var btnZoomIn = new qx.ui.form.Button("Zoom In");
							btnZoomIn.set({
								appearance : "button-text-small",
								toolTipText : '<div style="color:#FFAAAA">!!!</div>you might need to reload after zooming in',
							});
							btnZoomIn.addListener("click", function () {
								//increment +0.2
								this.visOptions.settingsPanel.zoomFactor = Math.round((this.visOptions.settingsPanel.zoomFactor + 0.2) * 10) / 10;
								this.swObj.settingFields.zoomFactor.setValue(String(this.visOptions.settingsPanel.zoomFactor));
								this.saveOptions();
								//this.fixScrollBounds();
								this.updateMapDelayed();
								this.scrollMapBox(true); // re-center
							}, this);
							this.settingsWnd.add(btnZoomIn, {
								row : 13,
								column : 3,
							});

							var btnZoomOut = new qx.ui.form.Button("Zoom Out");
							btnZoomOut.set({
								appearance : "button-text-small",
								//toolTipText : "tuO mooZ"
							});
							this.settingsWnd.add(btnZoomOut, {
								row : 13,
								column : 4
							});
							btnZoomOut.addListener("click", function () {
								this.visOptions.settingsPanel.zoomFactor = Math.round((this.visOptions.settingsPanel.zoomFactor - 0.2) * 10) / 10;
								this.swObj.settingFields.zoomFactor.setValue(String(this.visOptions.settingsPanel.zoomFactor));
								this.saveOptions();
								this.updateMap();
								this.scrollMapBox(false); // re-center
							}, this);

							/* "Apply" button */
							var applyOptions = new qx.ui.form.Button("\u2611");
							applyOptions.set({
								appearance : "button-text-small",
								toolTipText : "Save and apply changes to lines colors"
							});
							applyOptions.addListener("click", function () {
								this.saveOptions();
								this.updateMap();
								this.scrollMapBox(false);
							}, this);
							this.settingsWnd.add(applyOptions, {
								row : 16,
								column : 5
							});

							/* this.settingsWnd.addListener("appear", function () {
							console.log("settingsWnd appear event fired");
							// this.populateAllianceSelect();
							}, this);
							 */

							this.swObj.isLoaded = true;
						} catch (err) {
							console.log(err);
						}
					},

					setMapUpdateTimer : function () {
						var _this = this;
						clearTimeout(this.mapUpdateTimer); 
						if (this.mapBox.isVisible()){
							this.mapUpdateTimer = setTimeout(function (){
								_this.updateMap();
								_this.scrollMapBox();
							}, 1000);
						}
					},
					
					init_mapBox_listeners : function () {
						// Gets called A LOT while "scrolling"
						phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance().get_Region(), "PositionChange", ClientLib.Vis.PositionChange, this, this.setMapUpdateTimer);
						
						this.mapBox.addListener("close", function () {
							if (this.settingsWnd.isVisible()) {
								this.visOptions.settingsWndBounds = this.settingsWnd.getBounds();
								this.settingsWnd.close();
							}

							this.visOptions.mapBoxBounds = this.mapBox.getBounds();
							this.saveOptions();
						}, this);

						this.mapBox.addListener("blur", function () {
							var _this = this;
							this.blurInterval = setInterval(function () {
									if (!_this.settingsWnd.isVisible() && _this.visOptions.chk.fadeMap) {
										_this.mapBox.setOpacity(0.5);
										clearInterval(this.blurInterval);
									}
								}, 1000)
						}, this);
						this.mapBox.addListener("focus", function () {
							//console.log("focus");
							clearInterval(this.blurInterval);
							this.mapBox.setOpacity(1);
						}, this);
						this.mapBox.addListener("mouseover", function () {
							this.mapBox.focus();
						}, this);

						this.mapBox.addListener("resize", function () {
							var _this = this;
							setTimeout(function (e) {
								_this.scrollMapBox(false);
							}, 1000);
							//console.log("resized");
							//this.updateMap();
						}, this);
					},

					init_settingsButton : function () {
						/* Settings Button */
						var bt = new qx.ui.form.Button("Settings");
						bt.set({
							appearance : "button-text-small",
							toolTipText : "Set filters for the map"
						});
						bt.addListener("click", function () {
							if (this.settingsWnd.isVisible()) {
								this.settingsWnd.close();
							} else {
								this.settingsWnd.moveTo(this.visOptions.settingsWndBounds.left, this.visOptions.settingsWndBounds.top);
								this.settingsWnd.open();
							}
						}, this);
						this.mapBox.getChildControl("captionbar").add(bt, {
							row : 0,
							column : 5
						});
					},

					init_mapMouse : function () {
						var cw = this.canvasWidth;
						var ch = this.canvasHeight;
						
						//this.mapMouseWidget.removeAll();
						//this.scrollWidget.removeAll();
						var vW = this.visOptions.vpWidth;
						var vH = this.visOptions.vpHeight;
						this.mapMouseWidget = new qx.html.Element("canvas", null, {
								id : "mapCursor",
								width : cw,
								height : ch
							});
						var cnv = this.mapMouseWidget.getDomElement();
						this.mapMouseCanvas = cnv;
						var ctx = this.mapMouseCanvas.getContext('2d');
						ctx.strokeStyle = "rgb(200,0,0)";
						ctx.lineWidth = 1;
						ctx.beginPath();
						ctx.moveTo(vW / 2, vH / 2);
						ctx.lineTo(cw, ch);
						ctx.stroke();
					},

					createMapCanvas : function () {
						try {
							var canvas = this.canvasElement.getDomElement();
							if (this.mapCanvas == null) {
								this.mapCanvas = canvas;
								var _this = this;
								/*
								this.mapCanvas.addEventListener("mousedown", function (evt) {
								//start drag tracking
								},this);
								 */
								this.mapCanvas.addEventListener("mousedown", function (evt) {
									try {
										var cnv = _this.mapCanvas.getBoundingClientRect();
										var mouseX = evt.clientX - cnv.left;
										var mouseY = evt.clientY - cnv.top;
										var zf = _this.visOptions.settingsPanel.zoomFactor;
										//console.log("clientX:Y:" + evt.clientX + ":" + evt.clientY);
										//console.log("offsets:" + cnv.left + "," + cnv.top);
										//console.log("M:" + mouseX + "," + mouseY);

										var vm = ClientLib.Vis.VisMain.GetInstance();
										vm.CenterGridPosition(mouseX / zf, mouseY / zf);

										_this.scrollMapBox(true);

										setTimeout(function () {
											_this.updateMap();
										}, 500);
									} catch (err) {
										console.log(err);
									}
								}, false);

							}
							this.updateMap();
							this.scrollMapBox(false);
						} catch (err) {
							console.log("createMapCanvas error:");
							console.log(err);
						}
					},

					fixScrollBounds : function () {
						try {
							var cw = this.canvasWidth;
							var ch = this.canvasHeight;
							/*
							this.scrollWidget.setMinHeight(ch);
							this.scrollWidget.setMinWidth(cw);
							this.scrollWidget.setHeight(ch);
							this.scrollWidget.setWidth(cw);
							 */
							this.canvasElement.removeAll();
							this.canvasElement = new qx.html.Element("canvas", null, {
									id : "map",
									width : cw,
									height : ch
								});
							//this.mapCanvas = this.canvasElement.getDomElement();
							this.createMapCanvas();
							/*
							var ctx = this.mapCanvas.getContext('2d');
							ctx.clearRect(0, 0, canvas.width, canvas.height);
							ctx.canvas.height = ch;
							ctx.canvas.width = cw;
							 */
						} catch (e) {
							console.log("foooooooooooooook: ");
							console.log(e);
						}
					},

					scrollMapBox : function (preFrameFlag) {
						// ScrollTo
						try {
							var vm = ClientLib.Vis.VisMain.GetInstance();
							var zf = parseFloat(this.visOptions.settingsPanel.zoomFactor);

							var viewTopLeftX = vm.get_Region().get_PosX() / vm.get_Region().get_GridWidth() * zf;
							var viewTopLeftY = vm.get_Region().get_PosY() / vm.get_Region().get_GridHeight() * zf;
							var viewWidth = vm.get_Region().get_ViewWidth() / vm.get_Region().get_ZoomFactor() / vm.get_Region().get_GridWidth() * zf;
							var viewHeight = vm.get_Region().get_ViewHeight() / vm.get_Region().get_ZoomFactor() / vm.get_Region().get_GridHeight() * zf;

							var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
							var cx = ownCity.get_PosX();
							var cy = ownCity.get_PosY();
							//console.log("city: "+cx*zf+","+cy*zf);
							//console.log("view: "+viewTopLeftX+","+viewTopLeftY);
							//console.log("vh: "+viewHeight);
							//console.log("vw: "+viewWidth);

							var mb = this.mapBox.getBounds();
							this.scroll.setWidth(mb.width - 37);
							this.scroll.setHeight(mb.height - 70);
							var wd = Math.round((mb.width - 37) / 2);
							var ht = Math.round((mb.height - 70) / 2);
							this.visOptions.vpWidth = wd;
							this.visOptions.vpHeight = ht;
							//console.log("wd: "+wd);
							//console.log("ht: "+ht);

							var sx = this.scroll.getScrollX();
							var sy = this.scroll.getScrollY();
							var stx = Math.round((viewTopLeftX + (viewWidth / 2)) - wd);
							this.scroll.scrollToX(stx);
							var sty = Math.round((viewTopLeftY + (viewHeight / 2)) - ht);
							this.scroll.scrollToY(sty);

							if (this.visOptions.chk.showSectionFrame && preFrameFlag) {
								var ctx = this.mapCanvas.getContext('2d');
								ctx.strokeStyle = "rgba(255,0,0,0.5)";
								ctx.lineWidth = 1;
								ctx.strokeRect(viewTopLeftX, viewTopLeftY, viewWidth, viewHeight);
							}
						} catch (err) {
							console.log("scrollMapBox error:");
							console.log(err);
						}
					},

					makeLbl : function (name, r, c, tooltiptxt, color) {
						var lbl = this.swObj.labels["r"+r+"c"+c] = new qx.ui.basic.Label(name);
						lbl.setTextColor(color || "white");
						lbl.setToolTipText(tooltiptxt || "");
						lbl.setHeight(28);
						this.settingsWnd.add(lbl, {
							row : r,
							column : c
						});
					},

					makeTxt : function (option, r, c, color) {
						var value = this.visOptions.settingsPanel[option];
						var txtField = new qx.ui.form.TextField(String(value));
						txtField.setTextColor(color || "white");
						this.swObj.settingFields[option] = txtField;
						this.settingsWnd.add(txtField, {
							row : r,
							column : c
						});
					},

					makeCheckbox : function (option, r, c) {
						var o = this.swObj.chkBoxFields[option] = new qx.ui.form.CheckBox();
						o.setValue(this.visOptions.chk[option]);
						o.addListener("changeValue", function () {
							this.visOptions.chk[option] = o.getValue();
							this.saveOptions();
							this.updateMap();
						},this);
						this.settingsWnd.add(o, {
							row : r,
							column : c
						});
					},
							
					makeCoordsSelectionButton : function (option, row, col, text) {
						this.swObj.coordButtons[option] = new qx.ui.form.Button(text).set({
								appearance : "button-text-small",
								toolTipText : "Select a target or your own base on the map then click this to get the coords"
							});
						this.settingsWnd.add(this.swObj.coordButtons[option], {
							row : row,
							column : col
						});
						this.swObj.coordButtons[option].setWidth(30);
						this.swObj.coordButtons[option].addListener("click", function () {
							var x,
							y;
							var selObj = ClientLib.Vis.VisMain.GetInstance().get_SelectedObject();
							//console.log(selObj);
							var notSelObj = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity() || ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
							//console.log(notSelObj);
							if (selObj != null) {
								x = selObj.get_RawX();
								y = selObj.get_RawY();
							} else if (notSelObj != null) {
								x = notSelObj.get_PosX();
								y = notSelObj.get_PosY();
							}
							var str = x + ":" + y;

							this.swObj.settingFields[option].setValue(str);
							this.saveOptions();
							this.updateMap();

						}, this);
					},

					updateMapDelayed : function () {
						var _this = this;
						setTimeout(function(){
							_this.updateMap();
						},1000);
					},
					
					updateMap : function () {
						this.drawingNow = true;
						var md = ClientLib.Data.MainData.GetInstance();
						var w = ClientLib.Data.MainData.GetInstance().get_World();
						var vm = ClientLib.Vis.VisMain.GetInstance(); //get_Region().get_ViewWidth()
						var rg = ClientLib.Vis.VisMain.GetInstance().get_Region(); // GetObjectFromPosition(oporcamp,coords).get_CampType()
						var canvas = this.mapCanvas;
						var ctx = canvas.getContext('2d');
						var zf = parseFloat(this.visOptions.settingsPanel.zoomFactor);
						var alliance = md.get_Alliance();
						var cx = 0;
						var cy = 0;
						var gw = rg.get_GridWidth();
						var gh = rg.get_GridHeight();
						var hilitePois = [];
						var sectors = this.getSectors(w);


						ctx.clearRect(0, 0, canvas.width, canvas.height);

						/* ERelationType
						// Ally Enemy NAP Neutral None
						// 1 3 2 4 0
						// ClientLib.Data.MainData.GetInstance().get_Alliance().GetAllianceRelationshipsByType(webfrontend.gui.alliance.DiplomacyPage.ERelationTypeEnemy).l
						 */
						this.relations.enemies = md.get_Alliance().GetAllianceRelationshipsByType(webfrontend.gui.alliance.DiplomacyPage.ERelationTypeEnemy, true).l;
						this.relations.allies = md.get_Alliance().GetAllianceRelationshipsByType(webfrontend.gui.alliance.DiplomacyPage.ERelationTypeAlly, true).l;
						this.relations.nap = md.get_Alliance().GetAllianceRelationshipsByType(webfrontend.gui.alliance.DiplomacyPage.ERelationTypeNAP, true).l;

						this.relations.enemiesById = this.makeHash(this.relations.enemies, "OtherAllianceId");
						//console.log(this.relations.enemiesById);

						/* for (var i in this.relations.enemies){
						console.log(this.relations.enemies[i]);
						this.relations.enemies[i].Id;
						this.relations.enemies[i].OtherAllianceName;
						this.relations.enemies[i].OtherAllianceId;
						} */

						if (!this.swObj.obfAllianceId)
							this.swObj.obfAllianceId = this.getMemberNameByType(alliance, "number", 0);
						if (!this.swObj.obfAllianceName)
							this.swObj.obfAllianceName = this.getMemberNameByType(alliance, "string", 0);

						var allianceName = alliance[this.swObj.obfAllianceName];

						var sCount = 0;
						// Main Drawing Loop
						for (var i in sectors) {
							var s = sectors[i];
							sCount++;
							for (var x = 0; x < 32; x++) {
								for (var y = 0; y < 32; y++) {
									cx = s.ConvertToWorldX(x);
									cy = s.ConvertToWorldY(y);
									var wObj = w.GetObjectFromPosition(cx, cy);
									var rgObj = rg.GetObjectFromPosition(cx * gw, cy * gh);

									if (wObj != null) {
										switch (wObj.Type) {
										case 1: {
												// player city
												// console.log("sector id: "+s.get_Id());
												var player = s.GetPlayerId(wObj);
												var alliance = s.GetAlliance(player.Alliance);
												if (player)
													console.log("p" + player);
												if (alliance)
													console.log("a" + alliance);
												if (alliance != null && this.visOptions.selectedAllianceId == alliance) {
													// broken
													ctx.fillStyle = this.visOptions.settingsPanel.highlightColor; // color var used below for POI highlighting
													ctx.fillRect(cx * zf, cy * zf, zf, zf);
													/* } else if (this.relations.enemiesById[allianceId]) {
													//} else if (this.isEnemy(enemies, alliance, s)) {
													// broken
													console.log("Enemy found: ");
													console.log(wObj);
													ctx.fillStyle = this.visOptions.settingsPanel.enemyBaseColor;
													ctx.fillRect(cx * zf, cy * zf, zf, zf);
													 */
												} else {
													if (wObj.PlayerId && s.GetPlayerId(wObj).Id == md.get_Player().id) {
														ctx.fillStyle = this.visOptions.settingsPanel.ownBaseColor;
													} else {
														ctx.fillStyle = this.visOptions.settingsPanel.playerColor;
													}
													ctx.fillRect(cx * zf, cy * zf, zf, zf);
												}
												break;
											}
										case 2: {
												// forgotten base
												ctx.fillStyle = this.visOptions.settingsPanel.baseColor;
												ctx.fillRect(cx * zf, cy * zf, zf, zf);
												break;
											}
										case 3: {
												// Camp/Outpost
												// rgObj.get_VisObjectType() 15
												// CampType 2 / 3
												// current obf prop name GIVCUM
												// region might have a better solution

												ctx.fillStyle = (rgObj && rgObj.get_CampType && rgObj.get_CampType() == 3) ? this.visOptions.settingsPanel.outpostColor : this.visOptions.settingsPanel.campColor;
												ctx.fillRect(cx * zf, cy * zf, zf, zf);
												break;
											}
										case 4: {
												// POI or tunnel
												/*
												Type:ClientLib.Data.WorldSector.WorldObjectPointOfInterest
												System.Int32 Id
												ClientLib.Data.WorldSector.WorldObjectPointOfInterest.EPOIType POIType
												System.Int32 Level
												System.Int64 OwnerAllianceId
												System.String OwnerAllianceName
												System.Void .ctor (ClientLib.Data.WorldSector.ObjectType type ,ClientLib.Data.World world ,System.String details ,System.Int32 pos)
												wObj: {} -->
												wObj.Type: 4
												wObj.SequenceId: 6805
												wObj.BNDYIS: 39
												wObj.MYTWLL: 1
												wObj.ADKRPM: 8527
												wObj.YQTUPE: 123
												wObj.HIFKIQ: "Alliance Name"
												wObj.LSVKAD: {} -->
												 */

												//console.log("POI/Tunnel ("+cx+":"+cy+" POIType:"+wObj[this.getNameByIdx(wObj,3)]+"):\n"+this.dump(wObj,"wObj",1,true));

												if (!this.obfPOIType) {
													this.obfPOIType = this.getNameByIdx(wObj, 3);
												}
												if (!this.obfWorldObjectPointOfInterestAllianceName) {
													this.obfWorldObjectPointOfInterestAllianceName = this.getMemberNameByType(wObj, "string", 0);
												}
												if (!this.obfWorldObjPOIAllyId) {
													this.obfWorldObjPOIAllyId = this.getNameByIdx(wObj, 5);
												}

												if (wObj[this.obfPOIType] == 0) {
													// Tunnel
													ctx.fillStyle = this.visOptions.settingsPanel.tunnelColor;
												} else {
													// POI
													ctx.fillStyle = this.visOptions.settingsPanel.poiColor;

													// if not checked
													if (!this.visOptions.chk.showAlliancePois) {
														if (this.visOptions.poi == -2) {
															// Selected POI = << All >>
															hilitePois.push([cx, cy]);
														} else if (this.visOptions.poi && this.visOptions.poi == wObj[this.obfPOIType]) {
															// for some reasons, the constants in ClientLib are off by 1 [offset corrected]
															hilitePois.push([cx, cy]);
														}
														// if checked & current POI is from selected Alliance
													} else if (wObj[this.obfWorldObjPOIAllyId] == this.visOptions.selectedAllianceId) {
														// if a poi type is selected & current POI is selected type
														if (this.visOptions.poi >= 0 && this.visOptions.poi == wObj[this.obfPOIType]) {
															// Selected Alliance POI
															hilitePois.push([cx, cy]);
															//if show all POIs selected
														} else if (this.visOptions.poi == -2) {
															// Selected POI = << All >>
															hilitePois.push([cx, cy]);
														} else {
															console.log("perhaps visOptions.poi is empty?!");
														}
													}

												}
												ctx.fillRect(cx * zf, cy * zf, zf, zf);
												break;
											}
										}
									} else {
										var terr = w.GetTerritoryTypeByCoordinates(cx, cy);

										/* ClientLib.Data.ETerritoryType
										// 0 1 2 3 4 5
										// Own, Alliance, Neutral, Enemy, SpawnZone, Restricted */
										switch (terr) {
										case 0 /* ClientLib.Data.ETerritoryType.Own */
											:
											{
												ctx.fillStyle = this.visOptions.settingsPanel.ownBaseColor;
												ctx.fillRect(cx * zf, cy * zf, zf, zf);
												break;
											}
										case 1 /* ClientLib.Data.ETerritoryType.Alliance */
											:
											{
												ctx.fillStyle = this.visOptions.settingsPanel.allianceTerrainColor;
												ctx.fillRect(cx * zf, cy * zf, zf, zf);
												break;
											}
										case 2 /* ClientLib.Data.ETerritoryType.Neutral */
											:
											{
												ctx.fillStyle = "rgba(128,128,128,0.1)";
												ctx.fillRect(cx * zf, cy * zf, zf, zf);
												break;
											}
										case 3 /* ClientLib.Data.ETerritoryType.Enemy */
											:
											{
												if (w.GetOwner(cx, cy) != 1610612736) { // lol
													ctx.fillStyle = "rgba(255,128,0,0.1)";
													ctx.fillRect(cx * zf, cy * zf, zf, zf);
												}
												break;
											}
											/*
											case ClientLib.Data.ETerritoryType.SpawnZone: { // 4
											ctx.fillStyle = "rgba(255,255,0,0.5)";
											ctx.fillRect(cx * zf, cy * zf, zf, zf);
											break;
											}
											case ClientLib.Data.ETerritoryType.Restricted: { // 5
											ctx.fillStyle = "rgba(255,0,255,0.5)";
											ctx.fillRect(cx * zf, cy * zf, zf, zf);
											break;
											}
											 */
										}
									}

									if (rgObj != null) {
										switch (rgObj.get_VisObjectType()) {
											/* ClientLib.Vis.VisObject.EObjectType.RegionCityType
											// ClientLib.Vis.VisObject.EObjectType.RegionNPCBase
											// ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp
											// ClientLib.Vis.VisObject.EObjectType.RegionPointOfInterest */
										case 4: { // player
												if (rgObj.get_Type() == 2) {
													var allianceId = rgObj.get_AllianceId();
													//console.log(allianceId);
													if (this.relations.enemiesById[allianceId] != null) {
														//console.log("Enemy found: ");
														//console.log(rgObj);
														//save coords and draw later
														if (!this.relations.enemyCoords[cx]) {
															this.relations.enemyCoords[cx] = [];
														}
														this.relations.enemyCoords[cx][cy] = 1;
													}
													//var playerId = rgObj.get_PlayerId();
													//var playerName = rgObj.get_PlayerName();
												} else if (rgObj.get_Type() == 0) { //self
													//if (rgObj.IsOwnBase()) {
												}
												break;
											}
										case 16: { //POI
												if (rgObj.get_Type() == 0) {
													//Tunnel
												}
												//var ownerId = rgObj.get_OwnerAllianceId(); // returns 0 if owner has no alliance
												//var ownerName = rgObj.get_OwnerAllianceName(); // returns "" if owner has no alliance
												break;
											}
										}
									}
								}
							}
						}

						//console.log("Sector objects scanned: " + sCount);
						// paint enemies
						if (this.visOptions.showEnemies) {
							for (cx in this.relations.enemyCoords) {
								for (cy in this.relations.enemyCoords[cx]) {
									ctx.fillStyle = this.visOptions.settingsPanel.enemyBaseColor;
									ctx.fillRect(cx * zf, cy * zf, zf, zf);

									if (this.visOptions.showEnemyRange) {
										ctx.beginPath();
										ctx.arc(cx * zf, cy * zf, zf * 20, 0 * Math.PI, 2 * Math.PI);
										ctx.fillStyle = "rgba(255,0,0,0.02)";
										//ctx.fillStyle = "rgba(255,0,0,0.01)";
										ctx.fill();
									}
								}
							}
						}
						// paint home bases
						if (this.visOptions.chk.showOwnCities) {
							var ownCities = md.get_Cities().get_AllCities().d;
							for (var i in ownCities) {
								var city = ownCities[i];
								var x = city.get_PosX() * zf;
								var y = city.get_PosY() * zf;

								ctx.strokeStyle = this.visOptions.settingsPanel.ownBaseColor;

								ctx.beginPath();
								ctx.arc(x + zf / 2, y + zf / 2, zf * 20, 0 * Math.PI, 2 * Math.PI);
								ctx.stroke();

								ctx.strokeStyle = "rgba(128,128,128,0.2)";
								ctx.beginPath();
								ctx.arc(x + zf / 2, y + zf / 2, zf * 40, 0 * Math.PI, 2 * Math.PI);
								ctx.stroke();

							}
						}

						// paint hilited pois
						ctx.strokeStyle = this.visOptions.settingsPanel.highlightColor; //"rgba(200,255,200,1)";
						ctx.lineWidth = 1;

						hilitePois.forEach(function (poi) {
							ctx.lineWidth = 1;
							ctx.strokeRect(poi[0] * zf - 2, poi[1] * zf - 2, zf + 4, zf + 4);
						});

						// Section Frame
						var topX = Math.floor(vm.get_Region().get_PosX() / vm.get_Region().get_GridWidth());
						var topY = Math.floor(vm.get_Region().get_PosY() / vm.get_Region().get_GridHeight());
						var width = vm.get_Region().get_ViewWidth() / vm.get_Region().get_ZoomFactor() / vm.get_Region().get_GridWidth();
						var height = vm.get_Region().get_ViewHeight() / vm.get_Region().get_ZoomFactor() / vm.get_Region().get_GridHeight();
						//var zfh = Math.round(0.5 * this.visOptions.settingsPanel.zoomFactor);
						var zfh = zf / 2;
						ctx.strokeStyle = "rgba(0,255,0,0.5)";
						ctx.lineWidth = 1;
						//console.log("Selection:" + topX + "," + topY + "w:" + width + "," + height);

						/* broken
						this.init_mapMouse();
						 */

						if (this.visOptions.chk.showSectionFrame) {
							ctx.strokeRect(topX * zf, topY * zf, width * zf, height * zf);
							ctx.fillStyle = "rgba(128,128,128,0.2)";
							ctx.fillRect(topX * zf, topY * zf, width * zf, height * zf);
						}

						//Draw Border line 1
						if (this.visOptions.chk.showBorderLine1) {
							var a = this.visOptions.settingsPanel.line1start.split(":");
							var b = this.visOptions.settingsPanel.line1end.split(":");
							ctx.strokeStyle = this.visOptions.settingsPanel.line1color;
							ctx.lineWidth = zfh;
							ctx.beginPath();
							ctx.moveTo(a[0] * zf + zfh, a[1] * zf + zfh);
							ctx.lineTo(b[0] * zf + zfh, b[1] * zf + zfh);
							ctx.stroke();
							ctx.lineWidth = 1;
						}

						//Draw Border line 2
						if (this.visOptions.chk.showBorderLine2) {
							var a = this.visOptions.settingsPanel.line2start.split(":");
							var b = this.visOptions.settingsPanel.line2end.split(":");
							ctx.strokeStyle = this.visOptions.settingsPanel.line2color;
							ctx.lineWidth = zfh;
							ctx.beginPath();
							ctx.moveTo(a[0] * zf + zfh, a[1] * zf + zfh);
							ctx.lineTo(b[0] * zf + zfh, b[1] * zf + zfh);
							ctx.stroke();
							ctx.lineWidth = 1;
						}

						this.drawingNow = false;
					},

					getSectors : function (w) { // work around  obfuscated variable names
						if (this.swObj.obfSectorName == null) {
							// auto-detect sector name
							Outer :
							for (i in w) {
								if (w[i].d) {
									var maybeSector = w[i].d;
									for (j in maybeSector) {
										if (maybeSector[j].ConvertToWorldX) {
											this.swObj.obfSectorName = i;
											//console.log("Sector field:" + i);
											break Outer;
										}
										break;
									}
								}
							}
						}
						if (this.swObj.obfSectorName == null)
							console.log("ERROR: getSectors(): obfuscated property not found!");
						if (this.swObj.obfSectorName != null)
							return w[this.swObj.obfSectorName].d;

						/* if (w.KIH) { // old june version
						return w.KIH.d;
						} else if (w.RBJXOL) { // july
						return w.RBJXOL.d;
						} else if (w.IWEESP) {
						return w.IWEESP.d; // closed beta 2 world
						} else if (w.HYMYNV) { // mid july release
						return w.HYMYNV.d;
						} else if (w.ONQEIH) { // july 18th
						return w.ONQEIH.d;
						}
						 */
					},

					getAlliances : function (sector) { // work around  obfuscated variable names. sector == current sector
						try {
							if (typeof(sector) == "undefinied" || sector === null) {
								console.log("ERROR: getAlliances(sector): sector is not defined!");
								return null;
							}
							if (this.swObj.obfAllianceList == null) {
								// find alliance list dynamically

								Outer :
								for (i in sector) {
									if (sector[i].d) {
										var maybeAllianceList = sector[i].d;
										for (j in maybeAllianceList) {
											var maybeAlliance = maybeAllianceList[j];
											var propnames = [];
											for (p in maybeAlliance)
												propnames.push(p);
											var stringpropcount = 0;
											var stringpropname = null;
											if (propnames.length == 13) {
												for (k = 0; k < propnames.length; k++) {
													if (typeof(maybeAlliance[propnames[k]]) == "string") {
														stringpropname = propnames[k];
														stringpropcount++;
													}
												}
												if (stringpropcount == 1) {
													this.swObj.obfAllianceId = propnames[1]; //assuming this is allways the case :-)
													this.swObj.obfAllianceName = stringpropname;
													this.swObj.obfAllianceList = i;
													//console.log("Alliances field:" + i);
													break Outer;
												}
											}
											break; // test only the first member
										}
									}
								}

							}
							if (this.swObj.obfAllianceList == null) {
								console.log("ERROR: getAlliances(): obfuscated member not found!");
								return null;
							} else
								return sector[this.swObj.obfAllianceList].d;
							/*
							if (sector.WGH) {// june
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
						} catch (err) {
							console.log("getAlliances error:");
							console.log(err);
						}
					},

					makeHash : function (obj, unique) { //original key is written to the property hashKey
						if (obj != null) {
							try {
								var temp = [];
								for (var key in obj) {
									var val = obj[key];
									//console.log(val);
									if (!temp[val[unique]]) {
										temp[val[unique]] = [];
										for (var key2 in obj[key]) {
											if (key2 != unique) {
												temp[val[unique]][key2] = obj[key][key2];
											} else {
												temp[val[unique]]["hashKey"] = key;
											}
										}
									} else {
										console.log("makeHash duplicate entry detected");
									}

								}
								//console.log(temp);
								return temp;
							} catch (err) {
								console.log("makeHash error: ");
								console.log(err);
							}
						} else {
							return false;
						}
					},

					isEnemy : function (enemies, alliance, sector) {
						if (alliance == null)
							return false;
						var enemy = enemies.l.filter(function (ele) {
								return ele.OtherAllianceId == alliance.Id;
							});
						console.log(enemy);
						return enemy.length > 0;
					},

					listAllAlliances : function () {
						var alliances = [];
						var w = ClientLib.Data.MainData.GetInstance().get_World();
						if (!w)
							console.log("ERROR: get_World() failed!");
						var sectors = this.getSectors(w);
						if (!sectors)
							console.log("ERROR: getSectors() failed!");
						for (var i in sectors) { // m_sectors
							var s = sectors[i];
							var all = this.getAlliances(s);
							if (!all)
								console.log("ERROR: getAlliances() failed!");
							for (var j in all) { // m_alliances
								var a = all[j];
								alliances.push({
									id : a[this.swObj.obfAllianceId],
									name : a[this.swObj.obfAllianceName]
								});
							}
						}
						alliances.sort(function (s1, s2) {
							var name1 = s1.name.toLowerCase();
							var name2 = s2.name.toLowerCase();
							if (name1 < name2)
								return -1;
							if (name1 > name2)
								return 1;
							return 0;
						});
						var allianceMap = {};
						alliances.forEach(function (it) {
							allianceMap[it.id] = it;
						});
						return allianceMap;
					},

					populateAllianceSelect : function () {
						console.log("updating Filter");
						var md = ClientLib.Data.MainData.GetInstance();

						this.swObj.allianceSelect.removeAll();

						this.swObj.allianceListItem["-1"] = new qx.ui.form.ListItem("<< None >>", null, -1);
						this.swObj.allianceSelect.add(this.swObj.allianceListItem["-1"]);

						var alliances = this.listAllAlliances(); // expensive operation
						for (i in alliances) {
							var a = alliances[i];
							this.swObj.allianceListItem[a.id] = new qx.ui.form.ListItem(a.name, null, a.id);
							if (a.id == this.visOptions.selectedAllianceId) {
								selectedItem = tempItem;
							}
							this.swObj.allianceSelect.add(this.swObj.allianceListItem[a.id]);
						}
						if (this.visOptions.selectedAllianceId != -1) {
							this.swObj.allianceSelect.setSelection([selectedItem]);
						}
						//this.swObj.allianceSelect.setEnabled(true);
						if (this.visOptions.selectedAllianceId != -1) {
							this.swObj.chkBoxFields.showAlliancePois.setEnabled(true);
						}
						//console.log([selectedItem]);
						this.alliancesAreLoaded = true;
					},

					findAllianceById : function (s, id) {
						var ra = null;
						if (id != 0) {
							for (var x = 1; s.GetAlliance(x) != null; x++) {
								var a = s.GetAlliance(x);
								if (a.FGTNFZ == id) {
									ra = a;
								}
							}
						}
						return ra;
					},

					getMousePos : function (canvas, evt) {
						// get canvas position
						var cnv = canvas;
						var top = 0;
						var left = 0;
						while (cnv && cnv.tagName != 'BODY') {
							top += cnv.offsetTop;
							left += cnv.offsetLeft;
							cnv = cnv.offsetParent;
						}

						// return relative mouse position
						var mouseX = evt.clientX - left + window.pageXOffset;
						var mouseY = evt.clientY - top + window.pageYOffset;
						return {
							x : mouseX,
							y : mouseY
						};
					},

					saveOptions : function () {
						for (var option in this.visOptions.settingsPanel) {
							if (this.swObj.settingFields[option]) {
								this.visOptions.settingsPanel[option] = this.swObj.settingFields[option].getValue();
							} else {
								console.log(option + " : settingFields does not exist. (applyOptions)")
							}
						}
						if (localStorage) {
							var str = JSON.stringify(this.visOptions);
							localStorage.setItem("TAMapStorage", str);
						}
					},

					toggleMap : function () {

						if (this.mapBox.isVisible()) {
							this.visOptions.mapBoxBounds = this.mapBox.getBounds();
							this.saveOptions();
							this.mapBox.close();
						} else {
							this.mapBox.open();
						}
						/*
						//this.mapBox.open();
						//var debugOutput = "";
						//var sector = mainData.get_World().GetWorldSectorByCoords(current_city.get_PosX(), current_city.get_PosY());
						//for (i in sector.m_Objects.d) {
						//	debugOutput += JSON.stringify(sector.m_Objects.d[i]) + "<br>";
						//}
						//console.log(debugOutput);
						// this.canvasElement.setValue(debugOutput);
						//var canvas = this.canvasElement.getDomElement();
						//console.log("Canvas:" + canvas);
						//var ctx = canvas.getContext('2d');
						//console.log(ctx);
						//ctx.fillStyle = "rgb(200,0,0)";
						//ctx.fillRect (10, 10, 55, 50);
						 */
					},

					getNameByIdx : function (object, idx) {
						var i = 0;
						for (var n in object) {
							if (i == idx)
								return n;
							i++;
						}
						return null;
					},

					getMemberNameByType : function (object, type, idx) {
						var i = 0;
						for (var n in object) {
							var valueType = typeof(object[n]);
							//console.log(n+" "+valueType);
							if (type == valueType) {
								if (i == idx)
									return n;
								i++;
							}
						}
						return null;
					},

					dump : function (object, rootName, deep, includeFunction) {
						//console.log("dump "+rootName);
						var dumpInternal = function (obj, path) {
							//console.log("DEBUG: dumpInternal(obj, "+path+") ind:"+ind+", deep:"+deep+", output.length:"+s.length);
							if (obj === null) {
								s += "" + path + ": {null}" + "\n";
								return;
							} else if (obj === undefined) {
								s += "" + path + ": {undefined}" + "\n";
								return;
							}
							var valueType = typeof(obj);
							switch (valueType) {
							case "function":
								return;
								// try{var fr=obj();}catch(ex){var  fr=ex;}
								// s+= "" + path +": "+ "{function} returns: "+fr + "\n";return;
							case "object":
								s += "" + path + ": {} -->" /*+ propValue.toString().substr(0,20)*/
								 + "\n";
								break;
							case "boolean":
								s += "" + path + ": " + obj.toString() + "\n";
								return;
							case "number":
								s += "" + path + ": " + obj.toString() + "\n";
								return;
							case "string":
								s += "" + path + ": \"" + obj.toString() + "\"\n";
								return;
							default:
								s += "" + path + " (" + valueType + "): " + obj.toString() + "\n";
								return;
							}

							for (var o in objs) {
								if (o === obj) {
									s += "{!Recursion stoped!}\n";
									return;
								} else
									objs.push(obj);
							}
							var members = [];
							for (var p in obj)
								members.push(p);
							if (members.length > 1000) {
								console.log("WARNING: dump() Too much members! " + members.length);
								return;
							} //TODO
							if (deep > 0 && ind >= deep)
								return;
							if (/.GHPRYH$/.test())
								return; //TODO
							if (path.length > 30) {
								console.log("WARNING: dump() Path too long!");
								return;
							} //TODO
							ind++;
							for (var propName in obj) {
								dumpInternal(obj[propName], path + "." + propName);
							}
							ind--;
						}
						var objs = [];
						var ind = 0;
						var s = "";
						if (typeof(rootName) == 'undefined')
							rootName = "*";
						if (typeof(deep) == 'undefined')
							deep = 1;
						if (typeof(includeFunction) == 'undefined')
							includeFunction = false;
						try {
							dumpInternal(object, rootName);
						} catch (ex) {
							console.log("ERROR: dump() > " + ex);
						}
						return s;
					}
				}
			});

		}

		function TAMap_checkIfLoaded() {
			try {
				if (typeof qx != 'undefined') {
					var a = qx.core.Init.getApplication();
					// application
					var mb = qx.core.Init.getApplication().getMenuBar();
					if (a && mb) {
						createMapTweak();
						window.TAMap.getInstance().initialize();
					} else
						window.setTimeout(TAMap_checkIfLoaded, 1000);
				} else {
					window.setTimeout(TAMap_checkIfLoaded, 1000);
				}
			} catch (err) {
				if (typeof console != 'undefined')
					console.log(err);
				else if (window.opera)
					opera.postError(err);
				else
					GM_log(err);
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