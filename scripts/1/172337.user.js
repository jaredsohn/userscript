// ==UserScript==
// @name           LoU ToolTip Tweak - Stormies edit
// @namespace      LoUOzGTweaks
// @description    Adds information to the world's tooltip
// @author         OzGoober
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        0.9
// ==/UserScript==

(function() {
	try {
		// -- outer shell, ttt_script
		var ttt_script = function() {
			try {
				// -- inner shell, ttt_script
				function ttt_main() {
					try {

						const bossKill = [50, 300, 2000, 4000, 10000, 15000, 20000, 30000, 45000, 60000];
						const dungeonKill =       [10, 100, 450, 1500, 3500, 6000, 13000, 20000, 35000, 60000];
						const dungeon50zerkKill = [34, 140, 470, 1650, 5250, 12950, 24380, 42200, 68450, 114370];
						const dungeon50zgKill = [23, 94, 313, 1094, 3500, 8625, 16250, 28125, 45625, 76250];
						const dungeon50knightKill = [23, 94, 313, 1094, 3500, 8625, 16250, 28125, 45625, 76250];
                        const dungeon50palaKill = [17, 70, 234, 820, 2625, 6470, 12190, 21100, 34220, 57200];
                        const dungeon50mageKill = [68, 281, 938, 2813, 7875, 25875, 48750, 78750, 120000, 228750];
                        const dungeon50lockKill = [34, 140, 470, 1406, 3939, 12938, 24375, 39375, 60000, 114375];
                        const dungeon50wgKill = [1, 1, 2, 5, 18, 43, 81, 141, 228, 381];
                        const dungeon50sloopKill = [1, 1, 3, 11, 35, 68, 163, 244, 456, 763];
                        
						// TODO
						// 1. Loot capacity
						// 2. Suggest other troop counts
						// 3. Dungeon progress

						var l = qx.locale.Manager.getInstance().getLocale();
						if(l != "en" || l != "de" || l != "pl")
							l = "en";
						const tr = {
							"en" : {
								"weak" : "Weakness",
							},
							"de" : {
								"weak" : "Schwäche",
							},
							"pl" : {
								"weak" : "слабость",
							},
						}

						var a = qx.core.Init.getApplication();
						var r = webfrontend.res.Main.getInstance();

						const nameC = a.tr("tnf:name:").charAt(0);
						const typeC = a.tr("tnf:type:").charAt(0);
						const levelT = a.tr("tnf:level:");

						//<table cellspacing="0"><tr><td width="75">Name:</td><td>Dragon</td></tr><tr><td>Since:</td><td>Yesterday 22:04:43</td></tr><tr><td>Level:</td><td>7</td></tr>
						//<table cellspacing="0"><tr><td width="75">Type:</td><td>Mountain Dungeon</td></tr><tr><td>Since:</td><td>31.07. 01:15:18</td></tr><tr><td>Level:</td><td>9</td></tr><tr><td>Progress:</td><td>94%</td></tr>

						const sHdr = '<table cellspacing="0"><tr><td width="75">';
						const sRow = "</td><td>";
						const pId = sHdr.length;
						const pRow = sRow.length;
						const weakT = tr[l]["weak"] + ':' + sRow;
						
					    const tempT = r.units["5"].dn + ':' + sRow;
						const zergT = r.units["6"].dn + ':' + sRow;
						const zgT = r.units["6"].dn + '&' + r.units["4"].dn + ':' + sRow;
                        const cityT = r.units["1"].dn + ':' + sRow;
                        const balliT = r.units["2"].dn + ':' + sRow;
                        const rangerT = r.units["3"].dn + ':' + sRow;   
                        const guardT = r.units["4"].dn + ':' + sRow;    
                        const mageT = r.units["7"].dn + ':' + sRow;     
                        const scoutT = r.units["8"].dn + ':' + sRow;    
                        const xbowT = r.units["9"].dn + ':' + sRow;      
                        const palaT = r.units["10"].dn + ':' + sRow;     
                        const knightT = r.units["11"].dn + ':' + sRow;     
                        const lockT   = r.units["12"].dn + ':' + sRow;    
                        const ramT = r.units["13"].dn + ':' + sRow;  
                        const catT = r.units["14"].dn + ':' + sRow;
                        const frigT = r.units["15"].dn + ':' + sRow;
                        const sloopT = r.units["16"].dn + ':' + sRow;
                        const wgT = r.units["17"].dn + ':' + sRow;           

						// "Name" or "Type", Boss or Dungeon
						// Desc offset
						const pBName = pId + pRow + a.tr("tnf:name:").length;
						const pDName = pId + pRow + a.tr("tnf:type:").length;
						// Level offset
						const pLevel = pRow + a.tr("tnf:level:").length;

						// Forest		Dragon		Cavalry		Wood
						// Mountain		Hydra		Infantry	Iron
						// Hill			Moloch		Magic		Stone
						// Sea			Octopus		Artillery 	Food

						var cavT = r.attackTypes["2"].dn;
						var infT = r.attackTypes["1"].dn;
						var magT = r.attackTypes["4"].dn;
						var artT = r.attackTypes["3"].dn;

						var dragC = r.dungeons["6"].dn.charAt(0);
						var hydrC = r.dungeons["8"].dn.charAt(0);
						var moloC = r.dungeons["7"].dn.charAt(0);
						var octyC = r.dungeons["12"].dn.charAt(0);

						var forstC = r.dungeons["5"].dn.charAt(0);
						var mountC = r.dungeons["4"].dn.charAt(0);
						var hillC = r.dungeons["3"].dn.charAt(0);
						var seaC = r.dungeons["2"].dn.charAt(0);

						function getBossWeakness(name) {
							if(name == dragC)
								return cavT;
							else if(name == hydrC)
								return infT;
							else if(name == moloC)
								return magT;
							else if(name == octyC)
								return artT;
							else
								return "";
						}

						function getDungeonWeakness(name) {
							if(name == forstC)
								return cavT;
							else if(name == mountC)
								return infT;
							else if(name == hillC)
								return magT;
							else if(name == seaC)
								return artT;
							else
								return "";
						}

						function toolTipAppear() {
							try {
								var tip = a.worldViewToolTip;
								var mode = tip.getMode();
								if(mode == 'c' || mode == 'd') {
									// if(tip.contextObject)
								} else {
									var text = tip.getLabel();
									if(text != null || text.length > pId) {
										var type = text.charAt(pId);
										if(type == nameC) { // Name:
											//Boss
											var weak = getBossWeakness(text.charAt(pBName));
											var lPos = text.indexOf(levelT, pBName) + pLevel;
											var level = text.charAt(lPos);
											if(level == '1') {
												if(text.charAt(lPos + 1) == '0')
													level = '10';
											}
											var zergs = webfrontend.gui.Util.formatNumbers(bossKill[ parseInt(level) - 1]);
											var sb = new qx.util.StringBuilder(2048);
											sb.add(text, sHdr, weakT, weak, "</td></tr><tr><td>", zergT, zergs, "</td></tr></table>");
											tip.setLabel(sb.get());

										} else if(type == typeC) { // Type:
											//Dungeon
											var weak = getDungeonWeakness(text.charAt(pDName));
											var progress = "";
											var lPos = text.indexOf(levelT, pDName) + pLevel;
											var level = text.charAt(lPos);
											if(level == '1') {
												if(text.charAt(lPos + 1) == '0')
													level = '10';
											}
											var zergs = webfrontend.gui.Util.formatNumbers(dungeonKill[ parseInt(level) - 1]);
											
											if(weak == infT) {
											    var troops = webfrontend.gui.Util.formatNumbers(dungeon50zerkKill[ parseInt(level) - 1]);
											    var trooptyp = zergT;
											    var troops2 = webfrontend.gui.Util.formatNumbers(dungeon50zgKill[ parseInt(level) - 1]);
											    var troop2typ = zgT;
											}
											if(weak == cavT) {
											    var troops = webfrontend.gui.Util.formatNumbers(dungeon50palaKill[ parseInt(level) - 1]);
											    var trooptyp = palaT;
											    var troops2 = webfrontend.gui.Util.formatNumbers(dungeon50knightKill[ parseInt(level) - 1]);
											    var troop2typ = knightT;
											}
											if(weak == magT) {
											    var troops = webfrontend.gui.Util.formatNumbers(dungeon50mageKill[ parseInt(level) - 1]);
											    var trooptyp = mageT;
											    var troops2 = webfrontend.gui.Util.formatNumbers(dungeon50lockKill[ parseInt(level) - 1]);
											    var troop2typ = lockT;
											}
											if(weak == artT) {
											    var troops = webfrontend.gui.Util.formatNumbers(dungeon50wgKill[ parseInt(level) - 1]);
											    var trooptyp = wgT;
											    var troops2 = webfrontend.gui.Util.formatNumbers(dungeon50sloopKill[ parseInt(level) - 1]);
											    var troop2typ = sloopT;
											}
											
											var sb = new qx.util.StringBuilder(2048);
									//		sb.add(text, sHdr, weakT, weak, "</td></tr><tr><td>", zergT, zergs, "</td></tr></table>");
										sb.add(text, sHdr, weakT, weak, "</td></tr><tr><td>", trooptyp, troops, "</td></tr><tr><td>", troop2typ, troops2, "</td></tr></table>");
											tip.setLabel(sb.get());
										}
									}
								}

							} catch (e) {
								console.error(e);
							}
						}

						a.worldViewToolTip.addListener("appear", toolTipAppear, this);

					} catch (e) {
						console.error(e);
					}

				} // -- inner shell, ttt_script

				// -- inject inner shell
				const checktime = 1000;
				function checkLoULoading() {
					window.setTimeout(checkLoUReady, checktime);
				}

				function checkLoUReady() {
					try {
						if( typeof qx === "undefined") {
							console.log("wait Qx");
							checkLoULoading();
							return;
						}
						var loadingScreen = document.getElementById("loadingscreen");
						if(loadingScreen) {
							if(loadingScreen.style.display == "block") {
								console.log("wait load");
								checkLoULoading();
								return;
							}
						}
						var isReady = false;
						var a = qx.core.Init.getApplication();
						var p = webfrontend.data.Player.getInstance();
						var r = webfrontend.res.Main.getInstance();
						if(a && p && r)
							if(a.worldView)
								isReady = true;
						if(isReady) {
							console.log("checkLoUReady done!");
							ttt_main();
						} else {
							console.log("wait app");
							checkLoULoading();
							return;
						}
					} catch (e) {
						console.error(e);
					}
				};

				console.log("LoU ToolTip Tweak");
				checkLoULoading();
				// -- inject inner shell

			} catch (e) {
				console.error(e);
			}
		} // -- outer shell, ttt_script
		// -- inject outer shell
		var script = document.createElement("script");
		script.innerHTML = "(" + ttt_script.toString() + ")();";
		script.type = "text/javascript";
		document.getElementsByTagName("head")[0].appendChild(script);
		// -- inject outer shell
	} catch (e) {
		console.error(e);
	}
})();
