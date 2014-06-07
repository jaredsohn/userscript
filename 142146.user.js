// ==UserScript==
// @name           CnC: Tiberium Alliances Shortcuts
// @author         MrHIDEn
// @description    Get and plapce coordinates into a message with three useful keyboard shortcuts
// @description    Alt+Ctrl+A - popup window, Alt+S - insert [coords][/coords], 
// @description    Alt+Ctrl+X - magically insert [coords]x:y[/coords]. Earlier you must move  
// @description    your mouse cursor OVER the map "Coordinates".
// @description    Now it also make a sound when captured coordinates.
// @description    Alt+Ctrl+G - Collect all resource bonuses (anyway it will collect every 30sec).
// @description    Alt+Ctrl+I - Insert to message/chat/post all your bases/cities info 
// @description    Alt+Ctrl+B - Repair all.
// @description    Alt+Ctrl+V - Get back to attack (just after unfinished battle) or attack selected base. This do NOT repair.
// @description    Alt+Ctrl+, - EA Simulation.
// @description    Ctrl+SPACE - Get back to attack (just after unfinished battle) or attack selected base. This DO repair.
// @description    Provides user kayboard shortcuts to make live easy. Alt+Ctrl+X,A,S for coordinates
// @include        *alliances.commandandconquer.com*
// @include        http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// -require        http://sizzlemctwizzle.com/updater.php?id=135806&days=2
// @version        1.7.2 ksx4
// ==/UserScript==

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
            CodedBy: 'MrHIDEn'
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
                  var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
                  var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                  ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
                  ClientLib.Vis.VisMain.GetInstance().get_Battleground().SimulateBattle();
                  var app = qx.core.Init.getApplication();
                  app.getPlayArea().setView(webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatReplay, city.get_Id(), 0, 0);
                } catch (e) {
                  console.log('eaSimulator:',e);
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
							if (ev.altKey && !ev.altGraphKey && ev.ctrlKey && !ev.shiftKey) {

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
								case "C":
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
										var txt = "Player: [player]" + PlayerName + "[/player]\r\n";
										//txt +="--------------------------------------------------------------------\r\n";
										txt +="[hr]";
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
                      
												// txt += "Base \'" + c.get_Name() + " ([coords]" + c.get_PosX() + ":" + c.get_PosY() + "[/coords])" + "\' info:\r\n"; 
												txt += "Base \'[b]" + c.get_Name()+"[/b] [coords]" + c.get_PosX() + ":" + c.get_PosY() +"[/coords]\' info: \r\n"; 
												txt += "Offense lvl: [b]" + c.get_LvlOffense().toFixed(2).toString() + "[/b]\r\n";
												txt += "Base lvl: " + c.get_LvlBase().toFixed(2).toString() + "\r\n";
												txt += "Defense lvl: " + c.get_LvlDefense().toFixed(2).toString() + "\r\n";
												txt += "Support lvl: " + sl + " " + sn + "\r\n";
												txt += "Distance from center: " + Math.round(ClientLib.Base.Util.CalculateDistance(ClientLib.Data.MainData.GetInstance().get_Server().get_ContinentWidth() / 2, ClientLib.Data.MainData.GetInstance().get_Server().get_ContinentHeight() / 2, c.get_PosX(), c.get_PosY())) + "\r\n";
											} catch (ex) {
												log("INFO exception: " + ex);
											}
											//txt += "--------------------------------------------------------------------\r\n";
											txt += "[hr]";

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
								case ",":
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
                for(var key in cx) {
                  var oc = cx[key];
                  oc.RepairAllOffense();
                }                   
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

// ### Coord Box ###
// Fixed to work for chrome
// Original script here http://userscripts.org/scripts/show/137229

(function (){
	var MoveToCoords = function () {
		function getClib(){
			var clib;
			try{
				clib=ClientLib;
			}catch(e)			{
				alert("can't get clientLib");
				return null;
			}

			if(!clib)			{
				alert("clib is undefined");
			}
			return clib;
		}
		function getMyCities(){
			var cities =getData().get_Cities().get_AllCities();
			return cities.d;
		}

		function getWorld(){
			var world = getData().get_World();
			return world;
		}
		function getData(){
			return getClib().Data.MainData.GetInstance();
		}

		function getNearestTargets(city){
			var world = getWorld();
			var x = city.get_X();
			var y = city.get_Y();
			var offset = 7;
			var msg = ""+city.get_Name()+"("+x+","+y+")\n";
			var types=["0","1","N","E","@"];
			for(var cy = y - offset; cy < y+ offset;cy++){
				for(var cx = x-offset; cx < x+offset;cx++){

					var kind = types[world.GetTerritoryTypeByCoordinates(cx,cy)];
					var attack;
					try{
						attack = world.CheckAttackBase (cx , cy);
					}catch(e){
						//alert('err!');
					}

					if(attack && (attack == attack.OK)){
						msg+="["+(x-cx)+","+(y-cy)+"]\n";
					}
				  //  var water = world.IsWater(cx,cy) ? 'W':'_';
				  //  var blocked = world.IsBlocked(cx,cy) ? '#':'_';
					//msg+=""+kind;//+water+blocked;
				}
				msg+="\n";
			}
			alert(msg);
		}
		function test(e){
			var clib=getClib();
			var citiesData = getMyCities();
			var counter = 0;
			var msg = "";
			for (var cityFname in citiesData){
				var city = citiesData[cityFname];
				var level = city.get_BaseLevel();
				var name = city.get_Name();
				counter++;
				msg+="'"+name+"':"+level+"\n";
				try{
					city.setResourcesToMax();
				}catch(e)
				{
					alert('cannot exec that func');
				}
			}
			msg = "CITIES:"+counter+"\n"+msg;
			alert(msg);
		}

		function rangeTest(){
			var world = getWorld();
			world.SetRange(true,true,0,0,10,10);
			alert('finished');
		}

		function createButton(name, handler, par){
			var button = document.createElement("button");
			button.setAttribute("type","button");
			button.setAttribute("id", "myButton"+Math.random().toString().substr(2));
			try{
		//        button.value=name;
		//        button.setAttribute("value",name);
		//        button.setAttribute("innerHTML",name);
		//        button.setAttribute("label",name);
		//        button.setAttribute("name",name);
		//        button.setAttribute("text",name);
				button.innerHTML=name;
			}catch(e)
			{
				//do nothing, result is visible
			}
			button.addEventListener("click", handler);
			button.style.height="100%";
			button.style.margin = "2px";
			par.appendChild(button);
		}
		function tryBase(){
			var cities = getMyCities();
			for(var cityFname in cities){
				var city = cities[cityFname];
				getNearestTargets(city);
			}
		}

		function navigate(){
			createDialog(["x","y"], processNavigateDialog);
		}
		
		function processNavigateDialog(){}
		
		function createDialog(fields, handler){
			var dialog = document.createElement("div");
			dialog.style.position="absolute";
			dialog.style.top="30px";
			dialog.style.left="127px";
			dialog.style.zIndex="100";
			dialog.style.display="block";
			dialog.style.borderColor="#DCDCDC"
			dialog.style.borderStyle="solid";
			dialog.style.borderWidth="5px";
			dialog.style.backgroundColor="#881515";
			document.body.appendChild(dialog);
			lastDialog=dialog;
			for(var i=0; i < fields.length;i++){
				var inputName = fields[i];
				//var element = document.createElement("div");
				var element = document.createElement("input");
				element.style.margin="2px";
				//var br = document.createElement("br");
				dialog.appendChild(element);
				//dialog.appendChild(br);
			}
			var commit = document.createElement("button");
			commit.innerHTML="Navigate!";
			commit.style.margin="2px";
			commit.addEventListener("click", doNavigate);
			dialog.appendChild(commit);
		}
		function getVis(){
			var clib = getClib();
			return clib.Vis.VisMain.GetInstance();
		}
		function doNavigate(){
			var dia = lastDialog;

			var x = Number(dia.childNodes[0].value);
			var y = Number(dia.childNodes[1].value);
			var vis = getVis();
			vis.CenterGridPosition(x,y);
			document.body.removeChild(lastDialog);
			lastDialog = null;
		}

		function createPanel(){
			var panel = document.createElement("div");
			panel.style.position="absolute";
			panel.style.top="0px";
			panel.style.left="127px";
			//panel.style.height="20px";
			panel.style.zIndex="100";
			panel.style.display="block";
			panel.style.borderColor="#DCDCDC";
			panel.style.borderStyle="solid";
			panel.style.borderWidth="5px";
			panel.style.backgroundColor="#881515";
			document.body.appendChild(panel);
		//    createButton('Test', test,panel);
		//    createButton('Targets',tryBase,panel);
		//    createButton('Range',rangeTest, panel);
			createButton('Navigate', navigate,panel);
		}

		createPanel();
	}
	
	var TASuiteScript = document.createElement("script");
	var txt = MoveToCoords.toString();
	TASuiteScript.innerHTML = "(" + txt + ")();";
	TASuiteScript.type = "text/javascript";
	if (/commandandconquer\.com/i.test(document.domain)) {
		document.getElementsByTagName("head")[0].appendChild(TASuiteScript);
	}
	
})();
