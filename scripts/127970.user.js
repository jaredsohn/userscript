// ==UserScript==
// @name           CastleTweak
// @namespace      Castle
// @description    Castle Forever :)
// @author         Castle
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        0.1.0
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
						const dungeonKill = [10, 100, 450, 1500, 3500, 6000, 13000, 20000, 35000, 60000];
						const bossKillHydraZerk = [34, 200, 1360, 2640, 6640, 10000, 13600, 20000, 30000, 40000];
				        const bossKillDragKnight = [19, 112, 756, 1467, 3689, 5556, 7556, 11112, 16667, 22223];
				        const bossKillDragPala = [28, 167, 1134, 2200, 5534, 8334, 11334, 16667, 25000, 33334];
			         	const bossKillMolocWl = [14, 84, 567, 1100, 2767, 4167, 5667, 8334, 12500, 16667];
			         	const bossKillKnight = [28, 167, 1112, 2223, 5556, 8334, 11112, 16667, 25000, 33334];
			         	const bossKillPala = [42, 250, 1667, 3334, 8334, 12500, 16667, 25000, 37500, 50000];
			         	const bossKillWarlock = [21, 125, 834, 1667, 4167, 6250, 8334, 12500, 18750, 25000];
			         	const bossKillMage = [36, 215, 1429, 2858, 7143, 10715, 14286, 21429, 32143, 42858];
			         	const bossKillMolocMage = [24, 143, 972, 1886, 4743, 7143, 9715, 14286, 21429, 28572];

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
								"weak" : "????????",
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
						const zergT = r.units["6"].dn + ':' + sRow;
                        const zergT7 = r.units["7"].dn + ':' + sRow;
                        const zergT10 = r.units["10"].dn + ':' + sRow;
                        const zergT11 = r.units["11"].dn + ':' + sRow;
                        const zergT12 = r.units["12"].dn + ':' + sRow;
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
											var zergs = (bossKill[(level) - 1]);
											var zerkhyrdra = (bossKillHydraZerk[(level) - 1]);
				                            var knightdragon = (bossKillDragKnight[(level) - 1]);
			                             	var paladragon = (bossKillDragPala[(level) - 1]);
				                            var warlockmoloch = (bossKillMolocWl[(level) - 1]);
			                             	var knight = (bossKillKnight[(level) - 1]);
			                             	var pala = (bossKillPala[(level) - 1]);
			                             	var warlock = (bossKillWarlock[(level) - 1]);
			                             	var mage = (bossKillMage[(level) - 1]);
			                             	var molochmage = (bossKillMolocMage[(level) - 1]);
    var research6 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.research, 6);
	var shrine6 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.shrine, 6);
		var bonus6 = ( 1 + ((shrine6 + research6) / 100 ));
	var research10 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.research, 10);
	var shrine10 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.shrine, 10);
		var bonus10 = ( 1 + ((shrine10 + research10) / 100 ));
	var research11 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.research, 11);
	var shrine11 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.shrine, 11);
		var bonus11 = ( 1 + ((shrine11 + research11) / 100 ));
	var research12 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.research, 12);
	var shrine12 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.shrine, 12);
		var bonus12 = ( 1 + ((shrine12 + research12) / 100 ));		
	var research7 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.research, 7);
	var shrine7 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.shrine, 7);                    	
		var bonus7 = ( 1 + ((shrine7 + research7) / 100 ));	                             	
			                             	
			                             	
			                             	
			                             	
			                             	
			                             	
											var sb = new qx.util.StringBuilder(2048);
                if (weak == "Piyade")
                	{
				var zergs6 = (zerkhyrdra / bonus6);
				var zergs7 = (mage / bonus7);
                var zergs10 = (pala / bonus10);
                var zergs11 = (knight / bonus11);
                var zergs12 = (warlock / bonus12);
                	}
                else if (weak == "Süvari")
			{
				var zergs6 = (zergs / bonus6);
				var zergs7 = (mage / bonus7);
				var zergs10 = (paladragon / bonus10);
                var zergs11 = (knightdragon / bonus11);
				var zergs12 = (warlock / bonus12);
			}
                else if (weak == "Büyü")
			{
				var zergs6 = (zergs / bonus6);
				var zergs7 = (molochmage / bonus7);
				var zergs10 = (pala / bonus10);
                var zergs11 = (knight / bonus11);
                var zergs12 = (warlockmoloch / bonus12);
                	}
                else if (weak == "Topçu")
                	{
				var zergs6 = (zergs / bonus6);
				var zergs7 = (mage / bonus7);
				var zergs10 = (pala / bonus10);
                var zergs11 = (knight / bonus11);
				var zergs12 = (warlock / bonus12);
			}										

sb.add(text, sHdr, weakT, weak, "</td></tr><tr><td>", zergT6, Math.ceil(zergs6), "</td></tr></td></tr><tr><td>", zergT11, Math.ceil(zergs11), "</td></tr></td></tr><tr><td>", zergT12, Math.ceil(zergs12), "</td></tr><tr><td>", zergT7, Math.ceil(zergs7), "</td></tr></td></tr><tr><td>", zergT10, Math.ceil(zergs10), "</td></tr></table>")					
											
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
											var sb = new qx.util.StringBuilder(2048);
											sb.add(text, sHdr, weakT, weak, "</td></tr><tr><td>", zergT, zergs, "</td></tr></table>");
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

				console.log("CastleTweak");
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