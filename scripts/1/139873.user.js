// ==UserScript==
// @name           CnC: Tiberium Alliances Shortcuts
// @author         MrHIDEn
// @description    Easy login to C&C from https://alliances.commandandconquer.com/login/auth
// @description    to many apccounts by pressing Alt+1, Alt+2, ..... Alt+9(9th apccount)
// @description    Alt+0 - Logout
// @description    Get and plapce coordinates into a message with three useful keyboard shortcuts
// @description    Alt+A - popup window, Alt+S - insert [coords][/coords], 
// @description    Alt+X - magically insert [coords]x:y[/coords]. Earlier you must move  
// @description    your mouse cursor OVER the map "Coordinates".
// @description    Now it also make a sound when captured coordinates.
// @description    Alt+G - Collect all resource bonuses (anyway it will collect every 30sec).
// @description    Alt+I - Insert to message/chat/post all your bases/cities info 
// @description    Alt+B - Repair all.
// @description    Alt+V - Get back to attack (just after unfinished battle) or attack selected base. This do NOT repair.
// @description    Alt+; - EA Simulation.
// @description    Ctrl+SPACE - Get back to attack (just after unfinished battle) or attack selected base. This DO repair.
// @description    Provides user kayboard shortcuts to make live easy. Alt+1,Alt+2 ect for login. Alt+X,A,S for coordinates
// @include        *alliances.commandandconquer.com*
// @include        http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @require        http://sizzlemctwizzle.com/updater.php?id=135806&days=2
// @version        1.7.0
// ==/UserScript==
// Plapce your apccounts details here. Maximum of apccounts is 9.
var Logins = [ //"email","password" table
     "change.your@email.and","PASSword.manualy.inside.the.script",
     "email 2","password 2",
     "email 3", "password 3",
     "email 4", "password 4",
     "email 5", "password 5",
     "email 6", "password 6",
     "email 7", "password 7",
     "email 8", "password 8",
     "email 9", "password 9"
	];
var lang = "en";

function Ini() {
	//console.log(localStorage);
	console.log("CnC: Tiberium Alliances Shortcuts has been loaded - Part 1.");
};

function Login(id) {
	if (Logins.length == 0) return;
	if ((id * 2) > Logins.length) return;
	if (window.location.pathname != ("/login/auth")) {
		window.location.assign("https://alliances.commandandconquer.com/" + lang + "/game/world");
		return;
	}
	var em = Logins[2 * id - 2];
	var pw = Logins[2 * id - 1];
	//localStorage.Logins = Logins;
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
	var TAS_main = function () {
			var IsDEBUG = true;
			function log(m) {
				if (IsDEBUG) {
					if (typeof console != 'undefined') console.log(m);
					else if (window.opera) opera.postError(m);
					else GM_log(m);
				}
			};
			log("TAS_main DEBUG MODE");  
			function createInstance() {
				var TAS = {};
				qx.Class.define("TAS.main", { //TAS.main
					type: "singleton",
					extend: qx.core.Object,
					construct: function () {
						//log("TAS.main.construct");
					},
					properties: {
            CodedBy: 'MrHIDE'
					},
					members: {
						initialize: function () {
							//log("initialize");
							Coords = "First, just move mouse cursor over some map coordinates numbers ex. 10:10";
							window.addEventListener("click", this.onClick, false);
							window.addEventListener("keyup", this.onKey, false);
							window.addEventListener("mouseover", this.onMouseOver, false);
							window.setInterval(this.getBonuses, 30000);
							log("CnC: Tiberium Alliances Shortcuts has been loaded - Part 2.");
						},
            eaSimulator: function() {
              console.log('eaSimulator');
              try {
                var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
                ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
                ClientLib.Data.MainData.GetInstance().get_Combat().Clear();
                city.SimulateBattle();
                ClientLib.Data.MainData.GetInstance().get_Combat().set_Id(city.get_Id());
                var app = qx.core.Init.getApplication();
                app.getPlayArea().setView(webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatAttacker, city.get_Id(), 0, 0);
              } catch (e) {
                console.log('eaSimulator',e);
              }
            },
						GetCaretPosition: function (ctrl) {
							var CaretPos = 0; // IE Support
							if (document.selection) {
								ctrl.focus();
								var Sel = document.selection.createRange();
								Sel.moveStart('charapcter', -ctrl.value.length);
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
								range.moveEnd('charapcter', pos);
								range.moveStart('charapcter', pos);
								range.select();
							}
						},
						onKey: function (ev) {
							var s = String.fromCharCode(ev.keyCode);
							var tas = window.TAS.main.getInstance();

							// ALT+
							if (ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.shiftKey) {

								switch (s) {
								case "A":
									// coords by popup window
									var inputField = document.querySelector('input:focus, textarea:focus');
									if (inputField != null) {
										this.Coords = prompt("Plapce coordinates. Ex. 800:800", "");
										if (Coords != null) {
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
									var inputField = document.querySelector('input:focus, textarea:focus');
									if (inputField != null) {
										var apc = ClientLib.Data.MainData.GetInstance().get_Cities();//all player cities
										var PlayerName = apc.get_CurrentOwnCity().get_PlayerName();
										var txt = "Spieler: " + PlayerName + "\r\n----------------------------------\r\n";
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
                      
												txt += "Basis \'" + c.get_Name() + "\' info:\r\n"; //m_Level
												txt += "Basis       lvl: " + c.get_LvlBase().toFixed(2).toString() + "\r\n";
												txt += "Deffensive lvl: " + c.get_LvlDefense().toFixed(2).toString() + "\r\n";
												txt += "Offensive  lvl: " + c.get_LvlOffense().toFixed(2).toString() + "\r\n";
												txt += "Unterstützung  lvl: " + sl + " " + sn + "\r\n";

(ClientLib.Base.Util.CalculateDistance(ClientLib.Data.MainData.GetInstance().get_Server().get_ContinentWidth() / 2, ClientLib.Data.MainData.GetInstance().get_Server().get_ContinentHeight() / 2, c.get_PosX(), c.get_PosY())) + "\r\n";
												txt += "[coords]" + c.get_PosX() + ":" + c.get_PosY() + "[/coords]\r\n";
											} catch (ex) {
												log("INFO exception: " + ex);
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
									this.TAS.main.getInstance().getBonuses();
									break;
								case "B":
									// Repair all armies
									this.TAS.main.getInstance().repairAllArmies();
									break;
								case "V":
									// Go back to fight without repair
									this.TAS.main.getInstance().goBackToFight();
									break;
								case ";":
									this.TAS.main.getInstance().eaSimulator();
									break;
								default:
									// Other letters
									//log("Other letter (" + s + ")");
								}
							} // CTRL+
              else if (!ev.altKey && ev.ctrlKey && !ev.shiftKey && !ev.altGraphKey) {              
								switch (s) {
                case " ":
									// Repair current army and go back to fight
									this.TAS.main.getInstance().repairArmyAndBack();
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
									var n2 = s.substring(semicolon + 1, s.lenght);
									if (isFinite(n1) && isFinite(n2)) {
                    if(s.length==5 && s[0]=="0") return;
										Coords = s;
										//ClientLib.Vis.VisMain.GetInstance().PlayUISound('sounds/Buttonclick');
                    ClientLib.Vis.VisMain.GetInstance().PlayUISound('sounds/CollectTiberium');
									}
								}
							}
						},
						//window.setInterval(this.getBonuses, 30000);
						getBonuses: function () {
							try {
								var apc = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
                var ps = false;
								for (var key in apc) {
									apc[key].CollectAllResources();
                  
                  // EA There is no API for this function. It is on API list but it is obfusticated.
                  
                  //ps |= apc[key].get_CanCollectResources();
								}
                if(ps) {
                  ClientLib.Vis.VisMain.GetInstance().PlayUISound('sounds/CollectCrystal');
                }
							} catch (ex) {
								log("TAS.getBonuses:" + ex);
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
							} catch (ex) {
								log("goBackToFight:" + ex);
							}
						},
            //button Alt+B
						repairAllArmies: function () {
              // REPAIR ALL OWN ARMIES
							try {	// NOTICE Under construction
                var pc = ClientLib.Data.MainData.GetInstance().get_Cities();//player cities
                var cx = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
                var mode = ClientLib.Vis.VisMain.GetInstance().get_Mode();
                ClientLib.Vis.VisMain.GetInstance().set_Mode(ClientLib.Vis.Mode.ArmySetup);
                for(var key in cx) {
                  var oc = cx[key];
                  //can |= oc.CanRepairAll();                  
                  oc.RepairAll();
                }                   
                ClientLib.Vis.VisMain.GetInstance().set_Mode(mode);
                ClientLib.Vis.VisMain.GetInstance().PlayVoiceSound("FactionUI/sounds/Repairing");         
							} catch (ex) {
								log("repairAllArmies:" + ex);
							}
						},
            //button Ctrl+SPACE
						repairArmyAndBack: function () {
              // REPAIR CURRENT ARMY AND GET BACK TO FIGTH
							try {	// NOTICE Under construction
                var pc = ClientLib.Data.MainData.GetInstance().get_Cities();//player cities
                var oci = pc.get_CurrentOwnCityId();//own city                
                if (oci > 0 ) {
                  //var c = pc.GetCity(oci);//works
                  var oc = pc.get_CurrentOwnCity();
                  var mode = ClientLib.Vis.VisMain.GetInstance().get_Mode();
                  ClientLib.Vis.VisMain.GetInstance().set_Mode(ClientLib.Vis.Mode.ArmySetup);
                  if(oc.CanRepairAll()) {
                    oc.RepairAll();
                    ClientLib.Vis.VisMain.GetInstance().PlayVoiceSound("FactionUI/sounds/Repairing");
                  }
                  ClientLib.Vis.VisMain.GetInstance().set_Mode(mode);
                  var tci = pc.get_CurrentCityId();//target city -1 non selected, tci=oci you are in your base, tci>0 you are watching on other base
                  if (tci > 0 && oci != tci) {// add timer           
                    var tc = pc.get_CurrentCity();         
                    if( tc.get_PosX() > 0 && tc.get_PosY() > 0) {
                      webfrontend.gui.UtilView.openVisModeInMainWindow(webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatSetupDefense, tci, false);
                    }
                  }  
                }                            
							} catch (ex) {
								log("repairArmyAndBack:" + ex);
							}
						}
					} // members
				});
			}

			// Loading
			function TASLoadExtension() {
				try {
					if (qx !== undefined) {
            if (qx.core.Init.getApplication().getMenuBar() !== null) {
              createInstance();
              window.TAS.main.getInstance().initialize();
              return; // done
            }           
					}
					window.setTimeout(TASLoadExtension, 1000);
				} catch (e) {
					if (console !== undefined) console.log(e);
					else if (window.opera) opera.postError(e);
					else GM_log(e);
					window.setTimeout(TASLoadExtension, 1000); // force it
				}
			}
      
			if (/commandandconquer\.com/i.test(document.domain)) window.setTimeout(TASLoadExtension, 1000);
		}
		// Injecting
    function TASInject() {
      if (window.location.pathname != ("/login/auth")) {
        var TASScript = document.createElement("script");
        TASScript.innerHTML = "(" + TAS_main.toString() + ")();";
        TASScript.type = "text/javascript";
        if (/commandandconquer\.com/i.test(document.domain)) {
          document.getElementsByTagName("head")[0].appendChild(TASScript);
        }
      }
    }
    
    TASInject();
})();