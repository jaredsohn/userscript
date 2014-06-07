// ==UserScript==
// @name           MH Alliances Shortcuts Fix
// @description    auto login to acc from https://www.tiberiumalliances.com/login/auth
// @description    total account slots - 9 
// @description    works only with left Alt key + number key (not numpad key)
// @description    Alt+1, Alt+2, ..... Alt+9(9th apccount)
// @description    Alt+0 - Logout
// @description    Alt+X - insert [coords]x:y[/coords] you must move your mouse cursor OVER the map "Coordinates"
// @description    Alt+G - collect all resource bonuses (anyway it will collect every 30sec).
// @description    Alt+R - insert to message/chat/post all your bases/cities info 
// @description    Alt+C - repair all armies
// @include        *tiberiumalliances.com*
// @include        http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        1.8.0c
// @updateURL   https://userscripts.org/scripts/source/164532.meta.js
// @downloadURL https://userscripts.org/scripts/source/164532.user.js
// ==/UserScript==


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
              this.setLabel('HMTools');
              
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
                case "E":
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
                case "T":
                case "R":
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
                case "C":
                  // Repair all armies
                  this.MHTools.Shortcuts.getInstance().repairAllArmies();
                  //this.repairAllArmies();
                  break;
                case "V":
                case "L":
                case ";":
                case "O":
                default:
                  // Other letters
                  //log("Other letter (" + s + ")");
                  break;
                }
              } // CTRL+
              else if (!ev.altKey && ev.ctrlKey && !ev.shiftKey && !ev.altGraphKey) {              
                switch (s) {
                case " ":
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
                this.btnApply = new qx.ui.form.Button("Apply");
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