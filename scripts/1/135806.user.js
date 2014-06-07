// ==UserScript==
// @name           PluginsLib - mhShortcuts - Tiberium Alliances
// @author         MrHIDEn(game:PEEU)
// @description    Easy login to C&C from https://www.tiberiumalliances.com/login/auth
// @downloadURL    https://userscripts.org/scripts/source/135806.user.js
// @updateURL      https://userscripts.org/scripts/source/135806.meta.js
// @description    Get and plapce coordinates into a message with three useful keyboard shortcuts
// @description    Alt+A - popup window, Alt+S - insert [coords][/coords], 
// @description    Alt+P - popup window, insert [url][/url], 
// @description    Alt+X - magically insert [coords]x:y[/coords]. Earlier you must move  
// @description    your mouse cursor OVER the map "Coordinates".
// @description    Now it also make a sound when captured coordinates.
// @description    Alt+G - Collect all resource bonuses (anyway it will collect every 30sec).
// @description    Alt+I - Insert to message/chat/post all your bases/cities info 
// @description    Alt+B - Repair all.
// @description    Alt+V - Get back to attack (just after unfinished battle) or attack selected base. This do NOT repair.
// @description    Alt+; - EA Simulation.
// @description    Ctrl+SPACE - Get back to attack (just after unfinished battle) or attack selected base. This DO repair.
// @description    Shortcuts Alt+X,A,S for coordinates
// @grant          none 
// @include        http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        1.83
// ==/UserScript==

//** IMPORTANT **//
// For Login/Logout go to:
// http://userscripts.org/scripts/show/137955
// Code has been splited

(function () {
//var injectBody = function ()
function injectBody()
{  

  //TODO for debug purpose only. remove if you do not need.
  var ccl=console.log;var cci=console.info;var ccw=console.warn;var ccd=console.dir; var ccc=console.clear;
  var disable=0;if(disable){var f=function(){};ccl=f;cci=f;ccw=f;ccd=f;ccc=f;}

  var pluginName = "mhShortcuts";
  var created = false;
  //var spaceName = 'PluginsLib.mhShortcuts';
  function CreateClasses() {      
    // Classes
    //=======================================================      
    //Extending webfrontend.gui.options.OptionsPage with new ManagementOptionsPage
    function OptionsPage() {
      try {
        qx.Class.define("PluginsLib.mhOptionsPage", 
        {
          type: 'singleton',
          extend: webfrontend.gui.options.OptionsPage,
          construct: function() {
            console.log('Create PluginsLib.mhOptionsPage at Shortcuts');
            this.base(arguments);
            this.setLabel('PluginsLib');
            
            this.extendOptionsWindow();
            
            //Add Content
            var container = this.getContentContainer();
            this.tabView = new qx.ui.tabview.TabView();
            container.add(this.tabView);//, {left:40, top:40});
            
            this.removeButtons();
            this.addPageAbout();
            console.log('PluginsLib.OptionsPage loaded.'); 
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
                  //console.log('B this.clientArea.getChildren()[0]',this.clientArea.getChildren()[0]);
                  tabView.add(self);
                  webfrontend.gui.options.OptionsWidget.prototype.show = webfrontend.gui.options.OptionsWidget.prototype.baseShow;
                  self.pageCreated = true;
                  this.show();
                } catch (e) {            
                  console.warn("PluginsLib.mhOptionsPage.extendOptionsWindow: ", e);
                }
              };
            }
          }
        });
      } catch (e) {
        console.warn("qx.Class.define(PluginsLib.mhOptionsPage: ", e);      
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
      qx.Class.define("PluginsLib." + pluginName, //PluginsLib.mhShortcuts PluginsLib.mhShortcuts
      {
        type: "singleton",
        extend: qx.core.Object,
        statics : {
          NAME: 'Shortcuts',
          PLUGIN: 'MH Shortcuts',
          AUTHOR: 'MrHIDEn',
          VERSION: 1.83,
          REQUIRES: '',
          NEEDS: '',
          INFO: 'This script adds keyboard shortcuts to the game and allow you to quick login.',
          WWW: 'http://userscripts.org/scripts/show/135806',
          ONPLUGIN: null,
          ONOPTIONS: null,
          SIZE: 0
        },
        construct: function () {
          this.stats.src = 'http://goo.gl/i6mb1';//1.8.0
          //TODO: check with qooxdoo for better solution
          window.addEventListener("click", this.onClick, false);
          window.addEventListener("keyup", this.onKey, false);
          window.addEventListener("mouseover", this.onMouseOver, false);
          window.setInterval(this.getBonuses, 30000);
          console.log('this.addShortcutsPage();');
          this.addShortcutsPage();
          
          //REGISTER PLUGIN
          //this.constructor.ONPLUGIN = function(){this.constructor.getInstance().open();};
          //this.constructor.ONOPTIONS = function(){this.constructor.getInstance().open();};//test
          PluginsLib.Menu.getInstance().RegisterPlugin(this);
          
          //READY
          console.info("Plugin '"+pluginName+"' LOADED Part 2");
        },
        properties: {
        },
        members: {    
          stats: document.createElement('img'),      
          // setttings
          settings: {
            collectPackages:{v:true,  d:true,  l:'Auto collect packages 1/30 sec.'}
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
              console.warn("PluginsLib.mhShortcuts.eaSimulator: ", e); 
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
            var tas = PluginsLib.mhShortcuts.getInstance();// ?=this

            // ALT+
            if (ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.shiftKey) {

              switch (s) {
              case "A":
                // coords by popup window
                var inputField = document.querySelector('input:focus, textarea:focus');
                if (inputField !== null) {
                  this.Coords = prompt('Replace coordinates. Ex. 500:500', "");
                  if (this.Coords !== null) {
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
                  var txt = 'Player: ' + PlayerName + "\r\n";//----------------------------------\r\n";
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
                      txt += "[b]" + c.get_Name() + "[/b]_________________________\r\n"; //m_Level
                      txt += "[u]Off: " + c.get_LvlOffense().toFixed(1).toString() + "[/u]  " + //"\r\n" +
                             "Def: " + c.get_LvlDefense().toFixed(1).toString() + "  " + "__" + //"\r\n" +
                             "Bas: " + c.get_LvlBase().toFixed(1).toString()    + "  " + //"\r\n" +
                             "[i]Sup: " + sl + " - " + sn + "[/i]\r\n";
                      //txt += "Distance to center: " + Math.round(ClientLib.Base.Util.CalculateDistance(ClientLib.Data.MainData.GetInstance().get_Server().get_ContinentWidth() / 2, ClientLib.Data.MainData.GetInstance().get_Server().get_ContinentHeight() / 2, c.get_PosX(), c.get_PosY())) + "\r\n";
                      //txt += "[coords]" + c.get_PosX() + ":" + c.get_PosY() + "[/coords]\r\n";
                    } catch (e) {
                      console.warn("PluginsLib.mhShortcuts.INFO exception: ", e); 
                    }
                    //txt += "----------------------------------\r\n";
                  }
                  inputField.value += txt;
                }
                break;
              case "G":
                // Collect all resources at once manualy
                // log("G");
                // why this. does not work here. Do you know?
                this.PluginsLib.mhShortcuts.getInstance().getBonuses();
                //this.getBonuses();
                break;
              case "B":
                // Repair all armies
                this.PluginsLib.mhShortcuts.getInstance().repairAllArmies();
                //this.repairAllArmies();
                break;
              case "V":
                // Go back to fight without repair
                this.PluginsLib.mhShortcuts.getInstance().goBackToFight();
                break;
              case "L":
              case ";":
                console.log('eaSim key:',s);
                this.PluginsLib.mhShortcuts.getInstance().eaSimulator();
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
                this.PluginsLib.mhShortcuts.getInstance().repairArmyAndBack();
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
              if(!PluginsLib.mhShortcuts) return;
              if(!PluginsLib.mhShortcuts.getInstance().settings['collectPackages'].v) return;
              
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
              console.warn("PluginsLib.mhShortcuts.getBonuses: ", e); 
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
              console.warn("PluginsLib.mhShortcuts.goBackToFight: ", e);
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
              console.warn("PluginsLib.mhShortcuts.repairAllArmies: ", e);
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
              console.warn("PluginsLib.mhShortcuts.repairArmyAndBack: ", e);
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
          //rebuild with new approach
          optionsStoreName: 'mhShortcutsOptions',
          addShortcutsPage: function() {            
            console.log('addShortcutsPage');
            try {
              if(!PluginsLib.mhOptionsPage) OptionsPage();
              
              if(!this.optionsTab) {
                //Create Tab
                this.optionsTab = PluginsLib.mhOptionsPage.getInstance();
              }       
          //console.log('this.optionsTab',this.optionsTab);
              this.optionsPage = this.optionsTab.addPage("Shortcuts");
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
              console.warn("PluginsLib.mhShortcuts.addShortcutsPage: ", e);
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
              this.btnApply = new qx.ui.form.Button("Apply");
              this.btnApply.set({ width:150, height:30, toolTipText: "Apply changes.", allowGrowX:false, enabled:false});//, marginTop:20});
              
              var c = new qx.ui.container.Composite(new qx.ui.layout.HBox(0,'right'));
              c.setMarginTop(20);
              c.add(this.btnApply);
              this.optionsPage.add(c);
              
              this.btnApply.addListener("execute", this.applyOptions, this); 
              this.btnApply.setEnabled(false);
            } catch (e) {
              console.warn("PluginsLib.mhShortcuts.addButtons: ", e);
            }
          },
          applyOptions: function(e) {
            //console.log("applyOptions e:",e);
            this.saveOptions();
            this.btnApply.setEnabled(false); 
          },
          saveOptions: function() {   
            //PluginsLib.mhShortcuts.getInstance().settings['collectPackages'].obj.basename == "CheckBox"
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
                console.warn("PluginsLib.mhShortcuts.loadOptions: ", e);
            }
          }
        } // members
      });          
    } catch (e) {
      console.warn("qx.Class.define(PluginsLib.mhShortcuts: ", e);      
    }
    //=======================================================
    // START
    PluginsLib.mhShortcuts.getInstance();
  }//CreateClasses()
  // Loading
  function WaitForGame() {
    try
    {
      if (typeof(qx) != 'undefined' && typeof(qx.core) != 'undefined' && typeof(qx.core.Init) != 'undefined')
      {
        var app = qx.core.Init.getApplication();
        if (app.initDone===true)
        {
          if(!created) CreateClasses();
          
          var plugin = PluginsLib[pluginName];
          var ready = true;
          if(plugin.REQUIRES.length > 0) {
            var req = plugin.REQUIRES.split(',');
            //check all requires
            for(var i in req) {
              //cci(req[i]);
              if(typeof(PluginsLib[req[i]])=='undefined') {
                console.log(pluginName,'.WaitForGame.REQUIRES ',req[i],typeof(PluginsLib[req[i]]));
                ready = false;
                break;//WAIT
              }
            }
          }
          if(ready) {
            plugin.getInstance();
            plugin.SIZE = scriptSize;
            console.info("Plugin '"+plugin.getInstance().basename+"' READY");
            return;//DONE
          }
        }
      }
    } catch (e) {
      console.error('PluginsLib.'+pluginName,'.WaitForGame: ', e);
    }
    window.setTimeout(WaitForGame, 2000);
  }
  window.setTimeout(WaitForGame, 2000);
}

// Injecting
function Inject() {
  if (window.location.pathname != "/login/auth") {
    var script = document.createElement('script');
    var txt = injectBody.toString();
    txt = txt.replace('{','{\r\n  var scriptSize='+(txt.length+22).toString()+';');
    script.innerHTML = '(' + txt + ')();';
    script.type = 'text/javascript';
    document.head.appendChild(script);
  }
}    
Inject();
})();