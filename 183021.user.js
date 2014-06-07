// ==UserScript==
// @name flnielsen - Alt + G shortcut - Command & Conquer Tiberium Alliances
// @description    Alt+G - Insert all your bases info to message/chat/post
// @namespace flnielsen
// @include        *tiberiumalliances.com*
// @include https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @license     CC BY-NC-ND 3.0 - http://creativecommons.org/licenses/by-nc-nd/3.0/
// @author flnielsen
/* @description Small script/tool for inserting your essential base info, into messages, chat and forum posts.
This script is an extraction and  modularisation of the script pack by NameLater.
Many thanks to NameLater for the great work on the script package http://userscripts.org/scripts/show/179252
- l. 7970   NameLater - mhShortcuts - Tiberium Alliances    1.8.2
-           Only Alt+G and Easy login to C&C from https://www.tiberiumalliances.com/login/auth
*/
// @version     1.0.0
// @updateURL   http://userscripts.org/scripts/source/183021.meta.js
// @downloadURL http://userscripts.org/scripts/source/183021.user.js
// @icon        https://dl.dropboxusercontent.com/u/8249882/Games/C%26C%20-%20TA/Alt%20G.jpg
// @grant       none
// ==/UserScript==









// ==UserScript==
// @name           flnielsen - mhShortcuts - Tiberium Alliances
// @author         Based on MrHIDEn(game:PEEU)
// @author         Based on NameLater
// @description    Alt+G - Insert all your bases info to message/chat/post 
// @grant          none 
// @version        1.0.0
// ==/UserScript==

var lang = "en";//Language;
//if(Language===null) Language = "en";
try {
  //console.log(document.location);
  console.info('href:',location.href);
  console.info('host:',location.host);
  console.info('pathname:',location.pathname);
  var lpn = location.pathname.split('/');
  if(lpn.length>1 & lpn[1].length==2) {
    lang = lpn[1];
  }
  console.log('Language:',lang); 
} catch (e) {
}

function Ini() {
	//console.log(localStorage);
	console.log("PluginsLib.Shortcuts loaded - Part 1.");
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
var injectBody = function () {  
  //TODO for debug purpose only. remove if you do not need.
  //var ccl=console.log;var cci=console.info;var ccw=console.warn;var ccd=console.dir; var ccc=console.clear;
  //var disable=0;if(disable){var f=function(){};ccl=f;cci=f;ccw=f;ccd=f;ccc=f;}

  var spaceName = 'PluginsLib.mhShortcuts';
  function CreateClasses() {      
    // Classes
    //=======================================================      
    //Extending webfrontend.gui.options.OptionsPage with new ManagementOptionsPage
    function OptionsPage() {
      try {
        qx.Class.define("PluginsLib.mhOptionsPage", {
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
    // 'First, just move mouse cursor over some map coordinates numbers ex. 666:666': 'Wpierw przesun wskaznik myszy nad wspólrzedne np. 666:666',
    // 'Replace coordinates. Ex. 500:500', 'Zamien wspólrzedne. Ex. 500:500',
    // 'Player: ', 'Gracz: '
    // });
    try {
      qx.Class.define("PluginsLib.mhShortcuts", { //PluginsLib.mhShortcuts PluginsLib.mhShortcuts
        type: "singleton",
        extend: qx.core.Object,
        statics : {
          NAME: 'Shortcuts',
          PLUGIN: 'mhShortcuts',
          AUTHOR: 'MrHIDEn',
          VERSION: 1.82,
          REQUIRES: '',
          NEEDS: '',
          INFO: 'This script adds keyboard shortcuts to the game and allow you to quick login.',
          WWW: 'http://userscripts.org/scripts/show/135806',
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
          console.log("PluginsLib.mhShortcuts loaded - Part 2.");
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
              
              case "G":
                // player bases info to share with others
                var serverName = ClientLib.Data.MainData.GetInstance().get_Server().get_Name();
                var inputField = document.querySelector('input:focus, textarea:focus');
                if (inputField != null) {
                  var apc = ClientLib.Data.MainData.GetInstance().get_Cities();//all player cities
                  var PlayerName = apc.get_CurrentOwnCity().get_PlayerName();
                  var txt = "[u]Player: " + PlayerName + "[/u]\r\n";//----------------------------------\r\n";
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
                      txt += "[b]" + c.get_Name() + "[/b]\r\n"; //m_Level
                      txt += "Off: " + c.get_LvlOffense().toFixed(1).toString() + "\r\n" +
                             "Def: " + c.get_LvlDefense().toFixed(1).toString() + "\r\n" +
                             "Bas: " + c.get_LvlBase().toFixed(1).toString()    + "\r\n" +
                             "Sup: " + sl + " - " + sn + "\r\n";
                      txt += "Distance to center: " + Math.round(ClientLib.Base.Util.CalculateDistance(ClientLib.Data.MainData.GetInstance().get_Server().get_ContinentWidth() / 2, ClientLib.Data.MainData.GetInstance().get_Server

().get_ContinentHeight() / 2, c.get_PosX(), c.get_PosY())) + "\r\n";
                      //txt += "[coords]" + c.get_PosX() + ":" + c.get_PosY() + "[/coords]\r\n";
                    } catch (e) {
                      console.warn("PluginsLib.mhShortcuts.INFO exception: ", e); 
                    }
                      txt += "----------------------------------\r\n";
                  }
                  inputField.value += txt;
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
          CreateClasses();
          PluginsLib.mhShortcuts.getInstance();
          PluginsLib.mhShortcuts.SIZE = scriptSize;
          return;//DONE
        }
      }
    } catch (e) {
      console.error(spaceName,'.WaitForGame: ', e);
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