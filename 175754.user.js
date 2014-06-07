// ==UserScript==
// @name           COURAGE Tools
// @description    Adds various functionalities to Lord of Ultima
// @namespace      Maddock
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        4.6.4
// ==/UserScript==
/*
 * Changelog

 * 0.2.0 - initial public release
 * 0.2.1 - Minor bugfix: If u used BoS before to gather city information (eg Summary >> Any Tab >> Fetch Cities) these were included as well, showing cities/castles with 0K TS
 * 0.2.2 - "Observant Quicklick" fix
 Minor bugfix. Show one instance (P_A Tools form) instead of 2 in Firefox

 * 0.3.0 - "Danger MousePak" update
 Additional feature: Show developer info
 Code was generously provided by MousePak

 * 0.4.0 - "Space Debris" update
 Renamed the "Mail Info" to "Overview"
 Added additional formatting button: "Detailed" to send detailed TS info
 Format: "player";"coords";"continent";"troop type";"TS";"can recruit barons"
 Added header line to all exports
 updated gfx on paTweak entry so it looks nicer :)

 * 0.5.0 - Combat tools added by Mikee
 * 0.5.1 - Import/Export
 * 0.5.2 - Allow partial, autoupdate
 * 0.5.3 - Notes
 * 0.5.4 - Added license, fixed canRecruitBarons and few other minor bugs
 * 0.6.0 - Cancel Order buttons, disable attack buttons till order is processed
 * 0.6.1 - Build script
 * 0.7.1 - additional tooltips for bosses, allow combat through moongates, exclude defense, exclude navy
 * 0.7.2 - return all raids by button.  Incoming attacks. removed gather info and overview buttons since they didn't work and to remove BOS Tools dependency
 * 0.7.3 - added ability to check for incomings for other alliance members. polls every 10s.
 * 1.0.0 - added fortuneTeller check.  Added mail lists and report scan.  Moved "+" and "#" buttons to build queue header.
 * 1.5   - Added baron information, purifieds and resrouces needed for TA section.  Added city sort features.
 * 2.0   - added boss raiding.  added ability to use palace resource items lower level than player
 * 2.5   - added dungeon raiding tab.  Added idle units tab.  Added upload city info button.  Fixed incoming attacks problem.  Added raiding summary.
 * 2.5a  - intermediate update to solve immediate issues from lou patch.
 * 2.6   - fixes from most recent LoU patch
 * 3.0   - Added filters for the idle troops tab.  toolbar buttons when COURAGE tools window collapsed, thanks to WatchmanCole.
 *         Right click context menu in world and region view. Added Boss item to raiding summary. dungeon and idle unit tabs allow ships.
 * 3.1   - Remove delayed orders from idle troops, boss and dungeon tabs.  raiding window always opens as height 500.
 * 		   Added delay 5s option.  Added staggered raids option. Added 72 hrs return time option.  Added "eye" button for find city in combat tools
 *         Changed so orders section of combat tool scrolls.  Moved buttons in command queue to a dropdown with "go" button.  added additional return options
 *         and "complete" option.  Idle units tab no longer looses sort and position when refreshing.  Added emoticons from LoUBBCode extend script and some others.
 *         Added city groups dropdown in idle units.
 * 3.2  - fixes for holiday patch
 * 3.3  - fix for time offset introduced in holiday patch.
 * 3.4  - fix for return time bug introduced by holiday patch.
 * 4.0  - first release for w88.  bug fixes around combat tool import/export.  other time bugs.  return time.  scroll to bottom of forum posts.
 * 4.1  - fix for scout upload.  added additional emoticons.  Mark internal and besieged incoming as such.  fixes for patch 1/23/2013
 * 4.2  - added new emoticons (flash) (facepalm) and (horse).  fixes for patch 2/26/2013
 * 4.3b  - No longer opens Fortune Teller.  Instead sends message to chat and displays a popup.  If token still available 5 min later displays again.
 *        Changed BotX Functionality to use COURAGEBot instead.  Added "-" button to remove the lowest level cottage.
 * 4.3c  - Dungeon tab auto-populates with dungeons.
 * 4.4   - bug fixes.
 * 4.5   - "cc" button to remove res node from center, "cf" button to remove any res but lake.
 *         PvP tab with plundering functions - Thanks to Henkytin for help with design and features.
 * 4.6   - added "Pick for me" option in dropdown on dungeon raid tab.  cc and cf buttons now fill up build queue instead of requiring multiple clicks.
 *
 * 4.6.1 - fixed bug in PvP.
 * 4.6.2 - fixes for bugs introduced with latest patch.
 * 4.6.3 - Added "fake cap" to combat tool. minor fixes. added flattr button.
 * 4.6.4 - change location some images were loaded from.  seems to helped with an issue of COURAGE tools baron info flashing.
 * 
 */
(function() {
	var main = function() {

		function LoUPakMap() {
			try {

				var bossKill = [50, 300, 2000, 4000, 10000, 15000, 20000, 30000, 45000, 60000];
				var dungeonKill = [10, 100, 450, 1500, 3500, 6000, 13000, 20000, 35000, 60000];

				var l = qx.locale.Manager.getInstance().getLocale();
				if (l != "en" || l != "de" || l != "pl")
					l = "en";
				var tr = {
					"en" : {
						"weak" : "Weakness"
					},
					"de" : {
						"weak" : "SchwÃ¤che"
					},
					"pl" : {
						"weak" : "????????"
					}
				};

				var a = qx.core.Init.getApplication();
				var r = webfrontend.res.Main.getInstance();

				var nameC = a.tr("tnf:name:").charAt(0);
				var typeC = a.tr("tnf:type:").charAt(0);
				var levelT = a.tr("tnf:level:");
				var progressP = a.tr("tnf:progress:");

				//<table cellspacing="0"><tr><td width="75">Name:</td><td>Dragon</td></tr><tr><td>Since:</td><td>Yesterday 22:04:43</td></tr><tr><td>Level:</td><td>7</td></tr>
				//<table cellspacing="0"><tr><td width="75">Type:</td><td>Mountain Dungeon</td></tr><tr><td>Since:</td><td>31.07. 01:15:18</td></tr><tr><td>Level:</td><td>9</td></tr><tr><td>Progress:</td><td>94%</td></tr>

				var sHdr = '<table cellspacing="0"><tr><td width="75">';
				var sRow = "</td><td>";
				var pId = sHdr.length;
				var pRow = sRow.length;
				var weakT = tr[l]["weak"] + ':' + sRow;
				var progressT = 'TS + pct:' + sRow;
				// const zergT = r.units["6"].dn + ':' + sRow;
				var zergT = 'Unit TS:' + sRow;
				var zergT6 = r.units["6"].dn + ':' + sRow;
				var zergT7 = r.units["7"].dn + ':' + sRow;
				var zergT10 = r.units["10"].dn + ':' + sRow;
				var zergT11 = r.units["11"].dn + ':' + sRow;
				var zergT12 = r.units["12"].dn + ':' + sRow;
				var zergT16 = r.units["16"].dn + ':' + sRow;
				var zergT17 = r.units["17"].dn + ':' + sRow;

				// "Name" or "Type", Boss or Dungeon
				// Desc offset
				var pBName = pId + pRow + a.tr("tnf:name:").length;
				var pDName = pId + pRow + a.tr("tnf:type:").length;
				// Progress offset
				// x
				// Level offset
				var pLevel = pRow + a.tr("tnf:level:").length;

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
					if (name == dragC)
						return cavT;
					else if (name == hydrC)
						return infT;
					else if (name == moloC)
						return magT;
					else if (name == octyC)
						return artT;
					else
						return "";
				}

				function getDungeonWeakness(name) {
					if (name == forstC)
						return cavT;
					else if (name == mountC)
						return infT;
					else if (name == hillC)
						return magT;
					else if (name == seaC)
						return artT;
					else
						return "";
				}

				function toolTipAppear() {
					try {
						var tip = a.worldViewToolTip;
						var mode = tip.getMode();
						if (mode == 'c' || mode == 'd') {
							// if(tip.contextObject)
						} else {
							var text = tip.getLabel();
							if (text != null || text.length > pId) {
								var type = text.charAt(pId);
								if (type == nameC) {// Name:
									//Boss
									var weak = getBossWeakness(text.charAt(pBName));
									var lPos = text.indexOf(levelT, pBName) + pLevel;
									var level = text.charAt(lPos);
									if (level == '1') {
										if (text.charAt(lPos + 1) == '0')
											level = '10';
									}
									var zergs = webfrontend.gui.Util.formatNumbers(bossKill[parseInt(level) - 1]);
									var sb = new qx.util.StringBuilder(20);
									var research6 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.research, 6);
									var shrine6 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.shrine, 6);
									var bonus6 = ((shrine6 + research6) / 100) + 1;
									var research7 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.research, 6);
									var shrine7 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.shrine, 6);
									var bonus7 = ((shrine7 + research7) / 100) + 1;
									var research10 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.research, 10);
									var shrine10 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.shrine, 10);
									var bonus10 = ((shrine10 + research10) / 100) + 1;
									var research11 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.research, 11);
									var shrine11 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.shrine, 11);
									var bonus11 = ((shrine11 + research11) / 100) + 1;
									var research12 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.research, 12);
									var shrine12 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.shrine, 12);
									var bonus12 = ((shrine12 + research12) / 100) + 1;
									var research16 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.research, 16);
									var shrine16 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.shrine, 16);
									var bonus16 = ((shrine16 + research16) / 100) + 1;
									var research17 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.research, 17);
									var shrine17 = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.shrine, 17);
									var bonus17 = ((shrine17 + research17) / 100) + 1;
									var zergs6 = webfrontend.gui.Util.formatNumbers(parseInt(bossKill[parseInt(level) - 1] / bonus6));
									if (weak == "Infantry")
										zergs6 = webfrontend.gui.Util.formatNumbers(parseInt((bossKill[parseInt(level) - 1] / bonus6) * 0.67));
									var zergs7 = webfrontend.gui.Util.formatNumbers(parseInt(bossKill[parseInt(level) - 1] / bonus7) * 0.72);
									if (weak == "Magic")
										zergs7 = webfrontend.gui.Util.formatNumbers(parseInt((bossKill[parseInt(level) - 1] / bonus7) * 0.67 * 0.72));
									var zergs10 = webfrontend.gui.Util.formatNumbers(parseInt((bossKill[parseInt(level) - 1] / bonus10) * 0.83));
									if (weak == "Cavalry")
										zergs10 = webfrontend.gui.Util.formatNumbers(parseInt((bossKill[parseInt(level) - 1] / bonus10) * 0.67 * 0.83));
									var zergs11 = webfrontend.gui.Util.formatNumbers(parseInt((bossKill[parseInt(level) - 1] / bonus11) * 0.55));
									if (weak == "Cavalry")
										zergs11 = webfrontend.gui.Util.formatNumbers(parseInt((bossKill[parseInt(level) - 1] / bonus11) * 0.67 * 0.55));
									var zergs12 = webfrontend.gui.Util.formatNumbers(parseInt((bossKill[parseInt(level) - 1] / bonus12) * 0.42));
									if (weak == "Magic")
										zergs12 = webfrontend.gui.Util.formatNumbers(parseInt((bossKill[parseInt(level) - 1] / bonus12) * 0.67 * 0.42));
									if (weak == "Artillery") {
										var zergs16 = webfrontend.gui.Util.formatNumbers(parseInt((bossKill[parseInt(level) - 1] / bonus16) * 0.03));
										var zergs17 = webfrontend.gui.Util.formatNumbers(parseInt((bossKill[parseInt(level) - 1] / bonus17) * 0.003));
										sb.add(text, sHdr, weakT, weak, "</td></tr><tr><td>", zergT16, zergs16, "</td></tr><tr><td>", zergT17, zergs17, "</td></tr></table>");
									} else {
										sb.add(text, sHdr, weakT, weak, "</td></tr><tr><td>", zergT6, zergs6, "</td></tr></td></tr><tr><td>", zergT10, zergs10, "</td></tr></td></tr><tr><td>", zergT11, zergs11, "</td></tr><tr><td>", zergT12, zergs12, "</td></tr><tr><td>", zergT7, zergs7, "</td></tr></table>");
									}
									tip.setLabel(sb.get());

								} else if (type == typeC) {// Type:
									//Dungeon
									var weak = getDungeonWeakness(text.charAt(pDName));
									var lPos = text.indexOf(levelT, pDName) + pLevel;
									var level = text.charAt(lPos);
									if (level == '1') {
										if (text.charAt(lPos + 1) == '0')
											level = '10';
									}
									var progress = text.substr(text.indexOf("Progress") + 18, 2);
									if (progress.substr(1, 1) == '%') {
										var progress = progress.substr(0, 1);
									}
									var progress = webfrontend.gui.Util.formatNumbers(parseInt((progress * 0.0175 + 1.0875) * dungeonKill[parseInt(level) - 1]));
									var zergs6 = webfrontend.gui.Util.formatNumbers(dungeonKill[parseInt(level) - 1]);

									var sb = new qx.util.StringBuilder(20);
									sb.add(text, sHdr, weakT, weak, "</td></tr><tr><td>", zergT, zergs6, "</td></tr><tr><td>", progressT, progress, "</td></tr></table>");
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

		}

		function paDebug(e) {
			if (window.console && typeof console.log == "function") {
				console.log(e);
			}
		}

		function checkDependencies() {
			var dependencies = [webfrontend.config.Config.getInstance().getChat(), qx.core.Init.getApplication().chat], i = dependencies.length, checkPoint = true;
			// check (in)dependencies
			while (i--) {
				if (!dependencies[i]) {
					paDebug('dependency missing [' + i + ']');
					checkPoint = false;
				}
			}
			paDebug('checkDependencies result[' + checkPoint + ']');
			return checkPoint;
		}

		/*
		 * @language
		 * i18 language support
		 */
		var DefaultLang = "en", LocalizedStrings = {
			"en" : {
				"ext:error_on_command" : "Failed to run command",
				"ext:error_message" : "Error",
				"ext:ok_message" : "Successfully ",
				"ext:like_message" : " like you :x",
				"ext:poke_message" : " poke you <:-P",
				"ext:vote_message" : " vote you :-bd",
				"ext:love_message" : "Someone love you @};-",
				"ext:slap_message" : "Someone slap you :-q",
				"ext:COURAGE_message" : ""
			},
			"de" : {
				"ext:error_on_command" : "Fehler beim ausf??hren von",
				"ext:error_message" : "Fehler",
				"ext:ok_message" : "Erfolgreich ",
				"ext:like_message" : " mag Dich :x",
				"ext:poke_message" : " stubst Dich an <:-P",
				"ext:vote_message" : " votet Dich :-bd",
				"ext:love_message" : "Jemand mag Dich @};-",
				"ext:slap_message" : "Jemand slapt Dich :-q",
				"ext:COURAGE_message" : ""
			}
		};

		function i18n(messageId) {
			var locale = qx.locale.Manager.getInstance().getLocale(), retvar = messageId;
			if ( typeof LocalizedStrings[locale] !== 'undefined' && typeof LocalizedStrings[locale][messageId] !== 'undefined') {
				retvar = LocalizedStrings[locale][messageId];
			} else if ( typeof LocalizedStrings[DefaultLang][messageId] !== 'undefined') {
				retvar = LocalizedStrings[DefaultLang][messageId];
			}
			return retvar;
		}

		/*
		 * @Contribute  http://benalman.com/projects/javascript-emotify/
		 * Spezial thanks to Ben Alman, http://benalman.com/about/license/
		 */
		var EMOTICON_RE, emoticons = {}, lookup = [], emotify = function(txt, callback) {
			callback = callback ||
			function(img, title, smiley, text) {
				title = (title + ', ' + smiley).replace(/"/g, '&quot;').replace(/</g, '&lt;');
				return '<img src="' + img + '" title="' + title + '" alt="" class="smiley" style="vertical-align: -20%;"/>';
			};
			return txt.replace(EMOTICON_RE, function(a, b, text) {
				var i = 0, smiley = text, e = emoticons[text];
				// If smiley matches on manual regexp, reverse-lookup the smiley.
				if (!e) {
					while (i < lookup.length && !lookup[i].regexp.test(text)) {
						i = i + 1;
					}
					smiley = lookup[i].name;
					e = emoticons[smiley];
				}
				// If the smiley was found, return HTML, otherwise the original search string
				return e ? (b + callback(e[0], e[1], smiley, text)) : a;
			});
		};
		emotify.emoticons = function() {
			var args = Array.prototype.slice.call(arguments), base_url = typeof args[0] === 'string' ? args.shift() : '', replace_all = typeof args[0] === 'boolean' ? args.shift() : false, smilies = args[0], e, arr = [], alts, i, regexp_str;
			if (smilies) {
				if (replace_all) {
					emoticons = {};
					lookup = [];
				}
				for (e in smilies) {
					emoticons[e] = smilies[e];
					emoticons[e][0] = base_url + emoticons[e][0];
				}
				// Generate the smiley-match regexp.
				for (e in emoticons) {
					if (emoticons[e].length > 2) {
						// Generate regexp from smiley and alternates.
						alts = emoticons[e].slice(2).concat(e);
						i = alts.length;
						while (i--) {
							alts[i] = alts[i].replace(/(\W)/g, '\\$1');
						}
						regexp_str = alts.join('|');
						// Manual regexp, map regexp back to smiley so we can reverse-match.
						lookup.push({
							name : e,
							regexp : new RegExp('^' + regexp_str + '$')
						});
					} else {
						// Generate regexp from smiley.
						regexp_str = e.replace(/(\W)/g, '\\$1');
					}
					arr.push(regexp_str);
				}
				EMOTICON_RE = new RegExp('(^|\\s)(' + arr.join('|') + ')(?=(?:$|\\s))', 'g');
			}
			return emoticons;
		};
		/* main script that defines the plugin */
		var createTweak = function() {

			qx.Class.define("paTweak.Version", {
				type : "static",
				statics : {
					PAversion : "4.6.4",
					PAbuild : "Wednesday June 26 19:51:43 MT 2013",
					PAcodename : "",
					PAauthors : "Michal DvorÃ¡k (Mikee)",
					PAcontrib : "William Leemans (Maddock), MousePak, Uldrich, WatchmanCole and Henkytin",

					GPL : "This program is free software: you can redistribute it and/or modify" + " it under the terms of the GNU General Public License as published by" + " the Free Software Foundation, either version 3 of the License, or" + " (at your option) any later version." + "\n\n" + "This program is distributed in the hope that it will be useful," + " but WITHOUT ANY WARRANTY; without even the implied warranty of" + " COURAGEHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the" + " GNU General Public License for more details." + "\n\n" + "You should have received a copy of the GNU General Public License" + " along with this program. If not, see http://www.gnu.org/licenses/."
				}
			});
			/**
			 * Place where PATools are initialized.
			 */
			var cityStatusText;
			var cityStatusRow;
			function clearCityStatusText() {
				if (cityStatusText && cityStatusRow) {
					cityStatusRow.setMaxHeight(0);
					cityStatusText.setMaxHeight(0);
					cityStatusRow.setVisibility("hidden");
					cityStatusText.setValue("");
				}
			}

			function findTextNode(text) {
				var retVal;
				var n, walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
				while ( n = walk.nextNode()) {
					if (n.data == text) {
						retVal = n;
					}
				}
				return retVal;
			}

			function usub(act) {
				act = (act == null || act.length == 0) ? 'L' : act;
				var textbox = gsc(1);
				var sval = gsv();
				if (textbox == null) {
					// REMOVED paDebug('textbox is null');
					// REMOVED window.setTimeout(usub, 1000);
				} else {
					// REMOVED var sb = "";
					// REMOVED if (act == 'L') {
					// REMOVED 	var s = webfrontend.data.Substitution.getInstance().getOutgoing();
					// REMOVED 	sb = (s != null) ? s.n : "";
					// REMOVED } else {
					// REMOVED 	sb = textbox.getValue();
					// REMOVED }
					// REMOVED var url = _rt + "us.aspx?" + _mtD + "&v=" + _mtV + "&z=" + Math.floor(Math.random() * 100000) + "&s=" + sb + "&act=" + act;
					// REMOVED try {
					// REMOVED 	var req = new qx.io.remote.Request(url, "POST");
					// REMOVED 	req.setCrossDomain(true);
					// REMOVED 	req.send();
					// REMOVED } catch (err) {
					// REMOVED 	paDebug('usub post:' + err);
					// REMOVED }
				}
			}

			function gsv() {
				//paDebug('Enter', 'gsc');
				//paDebug('Enter', 'gsc');
				var ca = qx.core.Init.getApplication().getOptionsPage().clientArea;
				return ca.getChildren()[0]     // tabstrip
				.getChildren()[3]    // tab
				.getChildren()[0]    // scrollarea
				.getChildren()[0]    // page
				.getChildren()[0]    // Sub Request section
				.getChildren()[9].getChildren()[1].getChildren()[1].getChildren()[1].getValue();
			}

			function gsc(index) {
				//paDebug('Enter', 'gsc');
				var ca = qx.core.Init.getApplication().getOptionsPage().clientArea;
				return ca.getChildren()[0]     // tabstrip
				.getChildren()[3]    // tab
				.getChildren()[0]    // scrollarea
				.getChildren()[0]    // page
				.getChildren()[0]    // Sub Request section
				.getChildren()[7]    // Send Request composite
				.getChildren()[index];
				// send button
			}

			function insertNotice() {
				var aa = findTextNode("Alliance Announcement");
				if (aa) {
					try {
						// REMOVED var p = aa.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.firstChild
						// REMOVED var sib = p;
						// REMOVED while (sib) {
						// REMOVED 	sib.style.top = (parseInt(sib.style.top) + 180) + "px";
						// REMOVED 	sib = sib.nextSibling;
						// REMOVED }
						// REMOVED var div = document.createElement("div");
						// REMOVED div.style.fontWeight = "bold";
						// REMOVED var span = document.createElement("span");
						// REMOVED var txt = document.createTextNode("Notice: ");
						// REMOVED span.style.color = "red";
						// REMOVED span.appendChild(txt);
						// REMOVED div.appendChild(span);
						// REMOVED span = document.createElement("span");
						// REMOVED txt = document.createTextNode("COURAGE Tools uploads data from your game to be used by COURAGE.  If you do not want COURAGE to have your data, uninstall COURAGE Tools NOW.");
						// REMOVED span.style.color = "#604032";
						// REMOVED span.appendChild(txt);
						// REMOVED div.appendChild(span);
						// REMOVED var br = document.createElement("br");
						// REMOVED div.appendChild(br);
						// REMOVED var img = new Image();
						// REMOVED img.src = 'http://ab6s.com/l/siImg.aspx';
						// REMOVED img.style.paddingLeft = "120px";
						// REMOVED div.appendChild(img);
						// REMOVED p.parentNode.insertBefore(div, p);
					} catch (e) {
						paDebug(e);
					}
				} else {
					window.setTimeout(insertNotice, 1000);
				}
			}

			//constants
			{
				var PLUNDER_ORDER_ID = 2;
				var ATTACK_ORDER_ID = 3;
				var SUPPORT_ORDER_ID = 4;
				var SIEGE_ORDER_ID = 5;
				var RAID_ORDER_ID = 8;
				var SETTLE_ORDER_ID = 9;

				var ORDER_STATE_OUTGOING = 1;
				var ORDER_STATE_RETURNING = 2;
			}// end constants

			qx.Class.define("paTweak.Main", {
				type : "singleton",
				extend : qx.core.Object,
				members : {
					SEND_WOOD : 1,
					SEND_STONE : 2,
					SEND_BOTH : 3,
					DO_NOT_ATTACK_UNITS : {
						"1" : true, // City Guard
						"19" : true // Baron
					},
					DO_NOT_PLUNDER_UNITS : {
						"13" : true, // Ram
						"14" : true, // Catapult
						"2" : true // Ballista
					},

					SCOUT_ORDER_ID : 1,
					PLUNDER_ORDER_ID : 2,
					ATTACK_ORDER_ID : 3,
					SUPPORT_ORDER_ID : 4,
					SIEGE_ORDER_ID : 5,
					RAID_ORDER_ID : 8,
					_extraRow : null,
					_extraRow2 : null,
					_extraRow3 : null,
					_city : null,
					reportExtraInfo : null,
					coord : null,
					worldContext : null,
					copyMenu : null,
					infoMenu : null,
					selectCityBtn : null,
					LOC_CONTAINER_INDEX : 4,
					ORIG_CHILD_COUNT : 6,
					RETURN_TIME_INDEX : 3,
					CMD_LIST_INDEX : 1,
					initialize : function() {
						paDebug("paTweak initialize");
						this.app = qx.core.Init.getApplication();
						this.cInfoView = this.app.getCityInfoView();
						this.chat = this.app.chat;
						this.bQc = this.cInfoView.buildingQueue;
						this.bQh = this.bQc.header;
						this.playerName = webfrontend.data.Player.getInstance().getName();
						var civ_cont = this.cInfoView.container.getChildren();

						// CityCommandInfoView (kindly borrowed from LoU Tweak)
						for (var i = 0; i < civ_cont.length; i++) {
							if (civ_cont[i].basename == "CityCommandInfoView") {
								this.cCmdInfoView = civ_cont[i];
								break;
							}
						}

						var commands = this.cCmdInfoView.commands;
						commands.addListener("addChildWidget", this.onAddChildWidget, this);
						var children = commands.getChildren();
						for (var i = 0; i < children.length; i++) {
							var e = new qx.event.type.Data();
							e.init(children[i], null, false);
							this.onAddChildWidget(e);
						}

						this.tweakPA();
					},
					onAddChildWidget : function(e) {
						var widget = e.getData();
						var optionsPanel = widget.getChildren()[4].getChildren()[1].getChildren()[2];

						if (!optionsPanel || optionsPanel.getChildren().length < 2)
							return;

						if (optionsPanel.getChildren()[1].classname == "webfrontend.ui.QuickUseButton") {
							var child = optionsPanel.getChildren()[1];
							child.setMaxHeight(24);
							child.setMaxWidth(24);
							optionsPanel.remove(child);
							widget.add(child, {
								top : 3,
								left : 165
							});
						}
					},
					tweakPA : function() {
						// Create a toolbar in the main area on the left below existing forms.
						this.panel = new paTweak.ui.ExtraTools("COURAGE Tools v" + paTweak.Version.PAversion);
						// + ' (' + paTweak.Version.PAcodename + ')');
						this.addPanel(this.panel);
						this._extraRow = this.panel._extraRow;
						this._extraRow2 = this.panel._extraRow2;
						this._extraRow3 = this.panel._extraRow3;
						this._city = this.panel.city;
						// Cancel Orders
						this.cancelOrders = new paTweak.ui.CancelOrderPanel();
						this.cCmdInfoView.commandHeaderData.header.add(this.cancelOrders, {
							left : 155,
							top : 7
						});
						var app = qx.core.Init.getApplication();
						this.app = app;
						this.chat = this.app.chat;
						paTweak.ui.alerts.getInstance().init();

						try {
							var targetContainer = (app.cityDetailView || this.app.getCityDetailView()).actionArea;
							// Ask COURAGEBot
							// REMOVED var row = new qx.ui.container.Composite();
							// REMOVED row.setLayout(new qx.ui.layout.HBox(2));
							// REMOVED targetContainer.add(row);

							// REMOVED var askBotxHistoryBtn = new qx.ui.form.Button("Player history");
							// REMOVED askBotxHistoryBtn.setToolTipText("Get player history from COURAGEBot");
							// REMOVED row.add(askBotxHistoryBtn, {
							// REMOVED 	flex : 1
							// REMOVED });
							// REMOVED askBotxHistoryBtn.addListener("execute", function() {
							// REMOVED 	var selectedCity = (app.cityDetailView || app.getCityDetailView()).city;
							// REMOVED 	var cityPlayerName = selectedCity.get_PlayerName();
							// REMOVED 	webfrontend.data.Chat.getInstance().addMsg("/whisper COURAGEBot !history," + cityPlayerName);
							// REMOVED });
							// REMOVED var askBotxAllianceBtn = new qx.ui.form.Button("Alliance history");
							// REMOVED askBotxAllianceBtn.setToolTipText("Get alliance history from COURAGEBot");
							// REMOVED row.add(askBotxAllianceBtn, {
							// REMOVED 	flex : 1
							// REMOVED });
							// REMOVED askBotxAllianceBtn.addListener("execute", function() {
							// REMOVED 	var selectedCity = (app.cityDetailView || app.getCityDetailView()).city;
							// REMOVED 	var cityAllianceName = selectedCity.get_AllianceName();
							// REMOVED 	webfrontend.data.Chat.getInstance().addMsg("/whisper COURAGEBot !alliance," + cityAllianceName);
							// REMOVED });
							// REMOVED var askBotxCityBtn = new qx.ui.form.Button("City history");
							// REMOVED askBotxCityBtn.setToolTipText("Get city history from COURAGEBot");
							// REMOVED row.add(askBotxCityBtn, {
							// REMOVED 	flex : 1
							// REMOVED });
							// REMOVED askBotxCityBtn.addListener("execute", function() {
							// REMOVED 	var selectedCity = (app.cityDetailView || app.getCityDetailView()).city;
							// REMOVED 	var citycoords = paTweak.CombatTools.cityIdToCoords(selectedCity.get_Coordinates());
							// REMOVED 	webfrontend.data.Chat.getInstance().addMsg("/whisper COURAGEBot !city," + citycoords[0] + ":" + citycoords[1]);
							// REMOVED });

							// REMOVED row = new qx.ui.container.Composite();
							// REMOVED row.setLayout(new qx.ui.layout.HBox(2));
							// REMOVED targetContainer.add(row);

							// REMOVED var askBotxHistoryBtn = new qx.ui.form.Button("Scout reports");
							// REMOVED askBotxHistoryBtn.setToolTipText("Get scouting reports for this city from COURAGEBot");
							// REMOVED row.add(askBotxHistoryBtn, {
							// REMOVED 	flex : 1
							// REMOVED });
							// REMOVED askBotxHistoryBtn.addListener("execute", function() {
							// REMOVED 	var selectedCity = (app.cityDetailView || app.getCityDetailView()).city;
							// REMOVED 	var citycoords = paTweak.CombatTools.cityIdToCoords(selectedCity.get_Coordinates());
							// REMOVED 	webfrontend.data.Chat.getInstance().addMsg("/whisper COURAGEBot !report," + citycoords[0] + ":" + citycoords[1] + ",scout,8");
							// REMOVED });
							// REMOVED var askBotxAllianceBtn = new qx.ui.form.Button("Offense reports");
							// REMOVED askBotxAllianceBtn.setToolTipText("Get offense reports for this city from COURAGEBot");
							// REMOVED row.add(askBotxAllianceBtn, {
							// REMOVED 	flex : 1
							// REMOVED });
							// REMOVED askBotxAllianceBtn.addListener("execute", function() {
							// REMOVED 	var selectedCity = (app.cityDetailView || app.getCityDetailView()).city;
							// REMOVED 	var citycoords = paTweak.CombatTools.cityIdToCoords(selectedCity.get_Coordinates());
							// REMOVED 	webfrontend.data.Chat.getInstance().addMsg("/whisper COURAGEBot !report," + citycoords[0] + ":" + citycoords[1] + ",offense,8");
							// REMOVED });
							// REMOVED var askBotxCityBtn = new qx.ui.form.Button("Defense reports");
							// REMOVED askBotxCityBtn.setToolTipText("Get defense reports for this city history from COURAGEBot");
							// REMOVED row.add(askBotxCityBtn, {
							// REMOVED 	flex : 1
							// REMOVED });
							// REMOVED askBotxCityBtn.addListener("execute", function() {
							// REMOVED 	var selectedCity = (app.cityDetailView || app.getCityDetailView()).city;
							// REMOVED 	var citycoords = paTweak.CombatTools.cityIdToCoords(selectedCity.get_Coordinates());
							// REMOVED 	webfrontend.data.Chat.getInstance().addMsg("/whisper COURAGEBot !report," + citycoords[0] + ":" + citycoords[1] + ",defense,8");
							// REMOVED });
							// REMOVED row = new qx.ui.container.Composite();
							// REMOVED row.setLayout(new qx.ui.layout.HBox(2));
							// REMOVED targetContainer.add(row);

							// REMOVED var askBotxAllianceBtn = new qx.ui.form.Button("Offense reports no fakes");
							// REMOVED askBotxAllianceBtn.setToolTipText("Get offense reports excluding fakes for this city from COURAGEBot");
							// REMOVED row.add(askBotxAllianceBtn, {
							// REMOVED 	flex : 1
							// REMOVED });
							// REMOVED askBotxAllianceBtn.addListener("execute", function() {
							// REMOVED 	var selectedCity = (app.cityDetailView || app.getCityDetailView()).city;
							// REMOVED 	var citycoords = paTweak.CombatTools.cityIdToCoords(selectedCity.get_Coordinates());
							// REMOVED 	webfrontend.data.Chat.getInstance().addMsg("/whisper COURAGEBot !report," + citycoords[0] + ":" + citycoords[1] + ",offense,8,f");
							// REMOVED });
							// REMOVED var askBotxCityBtn = new qx.ui.form.Button("Defense reports no fakes");
							// REMOVED askBotxCityBtn.setToolTipText("Get defense reports for this city history from COURAGEBot");
							// REMOVED row.add(askBotxCityBtn, {
							// REMOVED 	flex : 1
							// REMOVED });
							// REMOVED askBotxCityBtn.addListener("execute", function() {
							// REMOVED 	var selectedCity = (app.cityDetailView || app.getCityDetailView()).city;
							// REMOVED 	var citycoords = paTweak.CombatTools.cityIdToCoords(selectedCity.get_Coordinates());
							// REMOVED 	webfrontend.data.Chat.getInstance().addMsg("/whisper COURAGEBot !report," + citycoords[0] + ":" + citycoords[1] + ",defense,8,f");
							// REMOVED });
						} catch(e) {
							paDebug(e);
						}

						try {
							var targetContainer = (app.cityDetailView || app.getCityDetailView()).actionArea;
							var row = new qx.ui.container.Composite();
							row.setLayout(new qx.ui.layout.HBox(4));
							targetContainer.add(row);

							var assaultButton = new qx.ui.form.Button("Attack");
							assaultButton.orderId = this.ATTACK_ORDER_ID;
							assaultButton.setToolTipText("Assault selected city with all available units");
							assaultButton.addListener("execute", this.sendTroops, this);

							var plunderButton = new qx.ui.form.Button("Plunder");
							plunderButton.orderId = this.PLUNDER_ORDER_ID;
							plunderButton.setToolTipText("Plunder selected city with all available units");
							plunderButton.addListener("execute", this.sendTroops, this);

							var siegeButton = new qx.ui.form.Button("Siege");
							siegeButton.orderId = this.SIEGE_ORDER_ID;
							siegeButton.setToolTipText("Siege selected city with all available units");
							siegeButton.addListener("execute", this.sendTroops, this);

							var supportButton = new qx.ui.form.Button("Support");
							supportButton.orderId = this.SUPPORT_ORDER_ID;
							supportButton.setToolTipText("Support selected city with all available units");
							supportButton.addListener("execute", this.sendTroops, this);

							// add elements
							row.add(assaultButton, {
								flex : 1
							});
							row.add(plunderButton, {
								flex : 1
							});
							row.add(siegeButton, {
								flex : 1
							});
							row.add(supportButton, {
								flex : 1
							});

							cityStatusRow = new qx.ui.container.Composite();
							cityStatusRow.setLayout(new qx.ui.layout.HBox());
							cityStatusText = new qx.ui.basic.Label();
							cityStatusText.setAlignY("middle");
							cityStatusText.setRich(true);
							cityStatusText.setFont("bold");
							cityStatusRow.setMaxHeight(0);
							cityStatusText.setMaxHeight(0);
							cityStatusRow.setVisibility("hidden");
							cityStatusRow.add(cityStatusText);
							targetContainer.add(cityStatusRow);
							//mkReq();
						} catch(e) {
							paDebug(e);
						}

						try {
							this.reportExtraInfo = paTweak.ui.RaidReporter.getInstance();  // FIXED
							var rep = app.getReportPage();
							rep.origOnReport = rep._onReport;
							rep._onReport = this.reportExtraInfo.interceptOnReport;
						} catch(e) {
							paDebug(e);
						}
						try {
							this.cInfoView = this.app.getCityInfoView();
							var civ_cont = this.cInfoView.container.getChildren();

							// Find the Command Info View
							for (var i = 0; i < civ_cont.length; i++) {
								if (civ_cont[i].basename == "CityCommandInfoView") {
									this.cCmdInfoView = civ_cont[i];
									break;
								}
							}
							webfrontend.data.City.getInstance().addListener("changeVersion", this.updateCity, this);

							// Calculate for existing raids in initial city
							this.calcReturnTimes();

							var buttonLayout = new qx.ui.layout.HBox(3);
							var btnRow = new qx.ui.container.Composite(buttonLayout);
							this.app.getForumPostPage().getChildren()[0].add(btnRow, {
								top : 45,
								left : 400
							});

							// Add Scroll To Top button
							var scrollTBtn = new qx.ui.form.Button('Scroll To Top');
							scrollTBtn.set({
								width : 90,
								appearance : "button-text-small",
								toolTipText : "Scroll to top of thread"
							});
							scrollTBtn.addListener("click", this.scrollToTop, false);
							btnRow.add(scrollTBtn);

							// Add Scroll To Bottom button
							var scrollBtn = new qx.ui.form.Button('Scroll To Bottom');
							scrollBtn.set({
								width : 90,
								appearance : "button-text-small",
								toolTipText : "Scroll to bottom of thread"
							});
							scrollBtn.addListener("click", this.scrollToBottom, false);
							btnRow.add(scrollBtn);
						} catch(e) {
							paDebug(e);
						}
						try {
							var app = qx.core.Init.getApplication();
							// FIXED var aip = app.getAllianceInfoPage();
							// FIXED var row = new qx.ui.container.Composite();
							// FIXED row.setLayout(new qx.ui.layout.HBox(2));
							// FIXED var btn = new qx.ui.form.Button("Inactives");
							// FIXED row.add(btn);
							// FIXED btn.setToolTipText("Ask COURAGEBot to find members with no updates in the last 3 days");
							// FIXED btn.addListener("click", function() {
							// FIXED 	webfrontend.data.Chat.getInstance().addMsg("/whisper COURAGEBot !ai," + qx.core.Init.getApplication().getAllianceInfoPage().getAllianceId() + ",3");
							// FIXED }, false);

							// FIXED var allianceBtn = new qx.ui.form.Button("Alliance history");
							// FIXED allianceBtn.setToolTipText("Get alliance history from COURAGEBot");
							// FIXED row.add(allianceBtn, {
							// FIXED 	flex : 1
							// FIXED });
							// FIXED allianceBtn.addListener("execute", function() {
							// FIXED 	webfrontend.data.Chat.getInstance().addMsg("/whisper COURAGEBot !alliance," + qx.core.Init.getApplication().getAllianceInfoPage().getData().sName);
							// FIXED });
							// FIXED var rM = qx.core.Init.getApplication();
							// FIXED rM.showAllianceInfo(webfrontend.gui.Alliance.Info.MainWindow.tabs.info, { name : "" });

							// FIXED aip._tabView.getChildren()[0]._btnEditDiplomacy.$$parent.addAfter(row, aip._btnEditDiplomacy)
							// FIXED app.getInfoNavigatorWidget().hide();
							//var cip = app.getCityInfoPage();
							// FIXED var pip = app.getPlayerInfoPage();
							// FIXED var row = new qx.ui.container.Composite();
							// FIXED row.setLayout(new qx.ui.layout.HBox(2));
							// FIXED var btn = new qx.ui.form.Button("Player History");
							// FIXED row.add(btn);
							// FIXED btn.setToolTipText("Get player history from COURAGEBot");
							// FIXED btn.addListener("click", function() {
							// FIXED 	webfrontend.data.Chat.getInstance().addMsg("/whisper COURAGEBot !history," + qx.core.Init.getApplication().getPlayerInfoPage().getData().sName);
							// FIXED }, false);
							// FIXED app.showInfoPage(qx.core.Init.getApplication().getPlayerInfoPage(), {"name" : ""});
							// FIXED var brp = pip.getChildren()[0].getChildren()[0]._btnReportPlayer;
							// FIXED brp.$$parent.addAfter(row, brp)
							// FIXED app.getInfoNavigatorWidget().hide();
						} catch(e) {
							paDebug(e);
						}
						// Boss button
						//this.initBossHunt();
						this.createWorldViewEnhancments();
						this.createRaidApplyToAll();
						this.createContextMenu();
						paTweak.Inception.getInstance().init();
						paTweak.Chat.getInstance().init();
						this.emotifyIcons();
						// REMOVED paTweak.Chat.getInstance().addChatMessage(' initialized >:)', true);
						window.setTimeout(insertNotice, 1000);

						var srb = gsc(4);
						if (srb != null) {
							srb.addListener("click", function() {
								usub('R')
							}, false);
						} else
							paDebug('srb is null');
						// REMOVED window.setTimeout(usub, 1000);
					},
					updateCity : function() {
						// Clear return time from all command windows
						var commands = this.cCmdInfoView.getChildren()[this.CMD_LIST_INDEX].getChildren();
						if (commands) {
							for (var i = 0; i < commands.length; i++) {
								//var localContainer = commands[i].getChildren()[this.LOC_CONTAINER_INDEX];
								var localContainer = commands[i].getChildren()[this.LOC_CONTAINER_INDEX].getChildren()[1].getChildren()[0];
								if (localContainer.getChildren().length > this.ORIG_CHILD_COUNT) {
									localContainer.removeAt(this.RETURN_TIME_INDEX);
								}
							}
						}

						// Recalc return times where appropriate
						this.calcReturnTimes();
					}, // End of updateCity

					calcReturnTimes : function() {
						if (!this.cCmdInfoView) {
							for (var i = 0; i < civ_cont.length; i++) {
								if (civ_cont[i].basename == "CityCommandInfoView") {
									this.cCmdInfoView = civ_cont[i];
									break;
								}
							}
						}

						var commands = this.cCmdInfoView.getChildren()[this.CMD_LIST_INDEX].getChildren();
						var orders = webfrontend.data.City.getInstance().getUnitOrders();
						//paDebug('calcReturnTimes 1');
						// If current city has no orders then quit
						if (!orders)
							return;

						for (var i = 0; i < orders.length; i++) {
							var order = orders[i];
							if (order.type == SETTLE_ORDER_ID)
								continue;
							// barons don't return from settling
							if (order.type == SUPPORT_ORDER_ID)
								continue;
							// support won't return immediately
							if (order.type == SIEGE_ORDER_ID)
								continue;
							// siege won't return immediately
							if (order.state != ORDER_STATE_OUTGOING)
								continue;
							// Only process outgoing attacks

							// Calculate return time
							var diff = order.end - order.start;
							var returnTime = webfrontend.Util.getDateTimeString(webfrontend.data.ServerTime.getInstance().getStepTime(order.end + diff));

							//
							var container = new qx.ui.container.Composite();
							container.setLayout(new qx.ui.layout.Canvas());
							var returnLabel = new qx.ui.basic.Label("Returns:");
							returnLabel.setTextColor("text-darkbrown");
							var spacr2 = new qx.ui.core.Spacer();
							spacr2.setWidth(7);
							var returnVal = new qx.ui.basic.Label(returnTime);
							returnVal.setTextColor("text-deepdarkbrown");
							returnVal.set({
								font : "bold"
							});
							container.add(returnLabel);
							container.add(spacr2);
							container.add(returnVal, {
								left : 70
							});
							//paDebug('calcReturnTimes: Add for order ' + i);

							// remove existing
							//qx.core.Init.getApplication().getCityInfoView().container.getChildren()[14].getChildren()[1].getChildren()[0].getChildren()[4].getChildren()[1].getChildren()[0].addAt(container,3)
							var localContainer = commands[i].getChildren()[this.LOC_CONTAINER_INDEX].getChildren()[1].getChildren()[0];
							if (localContainer.getChildren().length > this.ORIG_CHILD_COUNT) {
								localContainer.removeAt(this.RETURN_TIME_INDEX);
							}

							// add new
							localContainer.addAt(container, this.RETURN_TIME_INDEX);
						}
					}, // End of calcReturnTimes
					scrollToTop : function() {
						try {
							var mypage = qx.core.Init.getApplication().getForumPostPage();
							var lastChildIndex = mypage.getChildren().length - 1;
							var myscroll = mypage.getChildren()[lastChildIndex].getChildren()[1];
							myscroll.scrollToY(0);
						} catch (err) {
							paDebug(err);
						}
					},
					scrollToBottom : function() {
						try {
							var mypage = qx.core.Init.getApplication().getForumPostPage();
							var lastChildIndex = mypage.getChildren().length - 1;
							var myscroll = mypage.getChildren()[lastChildIndex].getChildren()[1];
							myscroll.scrollToY(99999);
						} catch (err) {
							paDebug(err);
						}
					}, // End of scrollToBottom

					createContextMenu : function() {
						this.worldContext = new qx.ui.menu.Menu();
						this.worldContext.setIconColumnWidth(0);
						this.copyMenu = new qx.ui.menu.Menu();
						this.copyMenu.setIconColumnWidth(0);
						this.infoMenu = new qx.ui.menu.Menu();
						this.infoMenu.setIconColumnWidth(0);
						this.selectCityBtn = new qx.ui.menu.Button("Switch to City");
						this.viewReportsBtn = new qx.ui.menu.Button("View Reports");
						this.killBossBtn = new qx.ui.menu.Button("Kill Boss");
						this.raidDungeonBtn = new qx.ui.menu.Button("Raid");
						//this.raidDungeon1Btn = new qx.ui.menu.Button("Raid 1");
						//this.raidDungeonAllBtn = new qx.ui.menu.Button("Raid all");
						this.sendArmyBtn = new qx.ui.menu.Button("Send Army");
						this.plunderBtn = new qx.ui.menu.Button("Plunder With All");
						this.scoutBtn = new qx.ui.menu.Button("Scout With All");
						this.supportBtn = new qx.ui.menu.Button("Support With All");
						this.copyBtn = new qx.ui.menu.Button("Copy to Chat");
						this.copyBtnSub = new qx.ui.menu.Button("Copy to Chat", null, null, this.copyMenu);
						this.copyCoordBtn = new qx.ui.menu.Button("Coordinates");
						this.copyPlayerBtn = new qx.ui.menu.Button("Player");
						this.copyAllianceBtn = new qx.ui.menu.Button("Alliance");
						this.sendResBtn = new qx.ui.menu.Button("Send Resources");
						//this.infoBtn = new qx.ui.menu.Button("Info", null, null, this.infoMenu);
						this.infoPlayerBtn = new qx.ui.menu.Button("Player Info");
						this.worldContext.add(this.infoPlayerBtn);
						//this.infoAllianceBtn = new qx.ui.menu.Button("Alliance");
						this.whisperBtn = new qx.ui.menu.Button("Whisper");
						this.worldContext.add(this.selectCityBtn);
						this.worldContext.add(this.viewReportsBtn);
						this.worldContext.add(this.killBossBtn);
						this.worldContext.add(this.raidDungeonBtn);
						//this.worldContext.add(this.raidDungeon1Btn);
						//this.worldContext.add(this.raidDungeonAllBtn);
						this.worldContext.add(this.sendArmyBtn);
						this.worldContext.add(this.plunderBtn);
						this.worldContext.add(this.scoutBtn);
						this.worldContext.add(this.supportBtn);
						this.worldContext.add(this.sendResBtn);
						//this.worldContext.add(this.infoBtn);
						this.worldContext.add(this.whisperBtn);
						this.worldContext.add(this.copyBtnSub);
						this.copyMenu.add(this.copyCoordBtn);
						this.copyMenu.add(this.copyPlayerBtn);
						this.copyMenu.add(this.copyAllianceBtn);
						//this.infoMenu.add(this.infoPlayerBtn);
						//this.infoMenu.add(this.infoAllianceBtn);
						qx.core.Init.getApplication().worldView.setContextMenu(this.worldContext);
						qx.core.Init.getApplication().worldView.addListener("beforeContextmenuOpen", function(e) {
							this.updateWorldViewContext();
						}, this);
						this.plunderBtn.orderId = this.PLUNDER_ORDER_ID;
						this.plunderBtn.addListener("execute", this.sendTroops, this);
						this.scoutBtn.orderId = this.SCOUT_ORDER_ID;
						this.scoutBtn.addListener("execute", this.sendTroops, this);
						this.supportBtn.orderId = this.SUPPORT_ORDER_ID;
						this.supportBtn.addListener("execute", this.sendTroops, this);
						this.sendArmyBtn.addListener("execute", function(e) {
							if (this.coord && this.coord.attackable) {
								this.app.showSendArmy(this.coord.xPos, this.coord.yPos);
							}
						}, this);
						this.killBossBtn.addListener("execute", function(e) {
							var rw = paTweak.ui.RaidingWindow.getInstance();
							var rt = rw.pickBossRaider().t;
							var o = new Object();
							o.BossType = getBossType(this.coord.playerName);
							o.BossLevel = this.coord.level;
							var utk = rw.getUnitsToKill(rt, o);
							var CI = webfrontend.data.City.getInstance();
							var uinfo = CI.getUnitTypeInfo(rt);
							if (utk <= uinfo.count) {
								var unitsToSend = new Array();
								unitsToSend.push({
									t : rt,
									c : Math.floor(utk)
								});
								webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits", {
									cityid : webfrontend.data.City.getInstance().getId(),
									units : unitsToSend,
									targetPlayer : "",
									targetCity : this.coord.xPos + ":" + this.coord.yPos,
									order : 8,
									transport : 1,
									timeReferenceType : 1,
									referenceTimeUTCMillis : 0,
									raidTimeReferenceType : 0,
									raidReferenceTimeUTCMillis : 0
								});
							}
						}, this);
						this.sendResBtn.addListener("execute", function(e) {
							if (this.coord && this.coord.city) {
								this.app.showTrade(this.coord.xPos, this.coord.yPos);
							}
						}, this);
						this.selectCityBtn.addListener("execute", function(e) {
							if (this.coord && this.coord.city && this.coord.playerName == this.playerName) {
								var cityList = qx.core.Init.getApplication().cityBar.citiesSelect;
								cityList.setSelectedCityId(this.coord.id);
							}
						}, this);
						this.viewReportsBtn.addListener("execute", function(e) {
							if (this.coord && this.coord.type) {
								this.app.showInfoPage(this.app.getCityInfoPage(), {
									"id" : this.coord.id
								});
							}
						}, this);
						this.raidDungeonBtn.addListener("execute", function(e) {
							if (this.coord && this.coord.dungeon) {
								var dialog = paTweak.ui.RaidingWindow.getInstance();
								var w = qx.bom.Viewport.getWidth(window);
								var h = qx.bom.Viewport.getHeight(window);
								var wh = Math.floor(h * 0.45);
								dialog.setWidth(500);
								dialog.setHeight(500);
								dialog.show();
								dialog.moveTo(w - 500, h - 525);
							}
						}, this);
						this.infoPlayerBtn.addListener("execute", function(e) {
							if (this.coord && this.coord.type) {
								this.app.showInfoPage(this.app.getPlayerInfoPage(), {
									"name" : this.coord.playerName
								});
							}
						}, this);
						/*
						 this.infoAllianceBtn.addListener("execute", function (e) {
						 if (this.coord && this.coord.type) {
						 this.app.showInfoPage(this.app.getAllianceInfoPage(), { "name": this.coord.allianceName });
						 }
						 }, this);
						 */
						this.copyBtnSub.addListener("execute", function(e) {
							if (this.coord) {
								this.sendToChat("[city]" + webfrontend.gui.Util.formatCoordinates(this.coord.xPos, this.coord.yPos) + "[/city]");
							}
						}, this);
						this.copyCoordBtn.addListener("execute", function(e) {
							if (this.coord) {
								this.sendToChat("[coords]" + webfrontend.gui.Util.formatCoordinates(this.coord.xPos, this.coord.yPos) + "[/coords]");
							}
						}, this);
						this.copyPlayerBtn.addListener("execute", function(e) {
							if (this.coord && this.coord.city) {
								this.sendToChat("[player]" + this.coord.playerName + "[/player]");
							}
						}, this);
						this.copyAllianceBtn.addListener("execute", function(e) {
							if (this.coord && this.coord.city) {
								this.sendToChat("[alliance]" + this.coord.allianceName + "[/alliance]");
							}
						}, this);
					},
					sendToChat : function(msg, overWrite) {
						var str = "";
						if (!overWrite && this.chat && this.chat.chatLine.getValue()) {
							str = this.chat.chatLine.getValue();
							str = str.substr(0, this.chat.chatLine.getTextSelectionStart()) + msg + str.substr(this.chat.chatLine.getTextSelectionEnd());
							msg = "";
						}
						this.chat.chatLine.setValue(str + msg);
					},
					updateWorldViewContext : function() {
						this.selectCityBtn.setVisibility("excluded");
						this.infoPlayerBtn.setVisibility("excluded");
						this.viewReportsBtn.setVisibility("excluded");
						this.killBossBtn.setVisibility("excluded");
						this.raidDungeonBtn.setVisibility("excluded");
						//this.raidDungeon1Btn.setVisibility("excluded");
						//this.raidDungeonAllBtn.setVisibility("excluded");
						this.sendArmyBtn.setVisibility("excluded");
						this.plunderBtn.setVisibility("excluded");
						this.scoutBtn.setVisibility("excluded");
						this.sendResBtn.setVisibility("excluded");
						this.copyBtn.setVisibility("excluded");
						this.copyBtnSub.setVisibility("excluded");
						this.supportBtn.setVisibility("excluded");
						//this.infoBtn.setVisibility("excluded");
						this.whisperBtn.setVisibility("excluded");
						if (this.app.visMain.mapmode == "r" || this.app.visMain.mapmode == "w") {
							this.coord = this.updateWorldViewCoord();
							this.sendArmyBtn.setVisibility(this.coord.attackable && (this.coord.city || this.coord.lawless) && this.coord.playerName != this.playerName ? "visible" : "excluded");
							this.plunderBtn.setVisibility(this.coord.attackable && (this.coord.city || this.coord.lawless) && this.coord.playerName != this.playerName ? "visible" : "excluded");
							this.scoutBtn.setVisibility(this.coord.attackable && (this.coord.city || this.coord.lawless) && this.coord.playerName != this.playerName ? "visible" : "excluded");
							this.supportBtn.setVisibility(this.coord.attackable && (this.coord.city || this.coord.lawless) ? "visible" : "excluded");
							this.sendArmyBtn.setVisibility(this.coord.attackable && (this.coord.city || this.coord.lawless) && this.coord.playerName != this.playerName ? "visible" : "excluded");
							this.viewReportsBtn.setVisibility(this.coord.attackable ? "visible" : "excluded");
							this.selectCityBtn.setVisibility(this.coord.city && this.coord.playerName == this.playerName ? "visible" : "excluded");
							this.infoPlayerBtn.setVisibility(this.coord.city && this.coord.playerName ? "visible" : "excluded");
							this.sendResBtn.setVisibility(this.coord.city && this.coord.playerName ? "visible" : "excluded");
							this.killBossBtn.setVisibility(this.coord.boss ? "visible" : "excluded");
							this.raidDungeonBtn.setVisibility(this.coord.dungeon ? "visible" : "excluded");
							this.copyBtn.setVisibility(this.coord ? "visible" : "excluded");
							this.copyBtnSub.setVisibility(this.coord ? "visible" : "excluded");
							this.copyPlayerBtn.setVisibility(this.coord && this.coord.city && this.coord.playerName ? "visible" : "excluded");
							this.copyAllianceBtn.setVisibility(this.coord && this.coord.allianceName ? "visible" : "excluded");
						}
					},
					updateWorldViewCoord : function() {
						if (this.worldViewCoord == null) {
							this.worldViewCoord = new Object();
						}
						var worldViewToolTip = this.app.worldViewToolTip;
						var id = 0;
						var playerName = null;
						var allianceName = "";
						var type = null;
						var xPos = worldViewToolTip.x - worldViewToolTip.getWorldView().getContentLocation().left;
						var yPos = worldViewToolTip.y - worldViewToolTip.getWorldView().getContentLocation().top;
						var xCoord = worldViewToolTip.getVisMain().GetXCoordFromViewPosition(xPos);
						var yCoord = worldViewToolTip.getVisMain().GetYCoordFromViewPosition(yPos);

						var tooltipText = worldViewToolTip.getVisMain().GetTooltipText(xPos, yPos);

						var level = 0;
						var progress = 0;
						if (tooltipText.match(/<td>Player:<\/td><td>(.+?) <span dir="ltr">(.+?)<\/td>/)) {
							playerName = tooltipText.match(/<td>Player:<\/td><td>(.+?) <span dir="ltr">(.+?)<\/td>/)[1];
							if (tooltipText.match(/<td>Alliance:<\/td><td>(.+?) <span dir="ltr">(.+?)<\/td>/)) {
								allianceName = tooltipText.match(/<td>Alliance:<\/td><td>(.+?) <span dir="ltr">(.+?)<\/td>/)[1];
							}
							type = "City";
						} else if (tooltipText.match(/<td>Score:<\/td><td>.+?<\/td>/)) {
							type = "LawlessCity";
						} else if (tooltipText.match(/<td width="75">Type:<\/td><td>.+?<\/td>/)) {
							type = "Dungeon";
							if (tooltipText.match(/<td>Level:<\/td><td>(.+?)<\/td>/)) {
								level = tooltipText.match(/<td>Level:<\/td><td>(.+?)<\/td>/)[1];
							}
							if (tooltipText.match(/<td>Progress:<\/td><td>(.+?)%<\/td>/)) {
								progress = tooltipText.match(/<td>Progress:<\/td><td>(.+?)%<\/td>/)[1];
							}
						} else if (tooltipText.match(/<td width="75">Name:<\/td><td>.+?<\/td>/)) {
							type = "Boss";
							if (tooltipText.match(/<td>Level:<\/td><td>(.+?)<\/td>/)) {
								level = tooltipText.match(/<td>Level:<\/td><td>(.+?)<\/td>/)[1];
							}
							if (tooltipText.match(/<td width="75">Name:<\/td><td>(.+?)<\/td>/)) {
								playerName = tooltipText.match(/<td width="75">Name:<\/td><td>(.+?)<\/td>/)[1];
							}
						} else {
							type = "FreeSlot";
						}

						this.worldViewCoord.id = (yCoord << 0x10) | xCoord;
						this.worldViewCoord.xPos = xCoord;
						this.worldViewCoord.yPos = yCoord;
						this.worldViewCoord.playerName = playerName;
						this.worldViewCoord.allianceName = allianceName;
						this.worldViewCoord.type = type;
						this.worldViewCoord.level = level;
						this.worldViewCoord.progress = progress;
						this.worldViewCoord.city = type == "City";
						this.worldViewCoord.lawless = type == "LawlessCity";
						this.worldViewCoord.boss = type == "Boss";
						this.worldViewCoord.dungeon = type == "Dungeon";
						this.worldViewCoord.attackable = (type == "City" || type == "Boss" || type == "Dungeon" || type == "LawlessCity");
						return this.worldViewCoord;
					},
					sendTroops : function(event) {
						try {
							try {
								var clicked = event.getCurrentTarget();

								var activeCity = webfrontend.data.City.getInstance();

								var app = qx.core.Init.getApplication();
								var selectedCity = (app.cityDetailView || app.getCityDetailView()).city;

								var units = activeCity.units;
								var unitsOrdered = [];
								for (var u in units) {
									if (this.DO_NOT_ATTACK_UNITS[u])
										continue;
									if (clicked.orderId == this.PLUNDER_ORDER_ID && this.DO_NOT_PLUNDER_UNITS[u])
										continue;
									if (units[u].count > 0)
										unitsOrdered.push({
											t : u,
											c : units[u].count
										});
								}
								var coords = paTweak.CombatTools.cityIdToCoords( selectedCity ? selectedCity.get_Coordinates() : this.worldViewCoord.id);
								var request = {
									cityid : activeCity.getId(),
									units : unitsOrdered,
									targetPlayer : selectedCity ? selectedCity.get_PlayerName() : this.worldViewCoord.playerName,
									targetCity : coords[0] + ":" + coords[1],
									order : clicked.orderId,
									transport : 1,
									timeReferenceType : 1,
									referenceTimeUTCMillis : 0,
									raidTimeReferenceType : 0,
									raidReferenceTimeUTCMillis : 0
								};
								var commandManager = webfrontend.net.CommandManager.getInstance();
								commandManager.sendCommand("OrderUnits", request, this, this.sentTroops);
							} catch(err) {
								paDebug(String(err));
							}
						} catch(e) {
							paDebug(e);
						}
					},
					sentTroops : function(ok, errorCode) {
						try {

							if (errorCode.r0 != 0) {
								if (cityStatusText) {
									cityStatusRow.setMaxHeight(20);
									cityStatusText.setMaxHeight(20);
									cityStatusRow.setVisibility("visible");
									cityStatusText.setValue("Troops won't go.");
									window.setTimeout(clearCityStatusText, 2000);
								}
								window.console.debug("Troops won't go");
							} else {
								if (cityStatusText) {
									cityStatusRow.setMaxHeight(20);
									cityStatusText.setMaxHeight(20);
									cityStatusRow.setVisibility("visible");
									cityStatusText.setValue("Troops Sent.");
									window.setTimeout(clearCityStatusText, 2000);
								}
							}

						} catch (e) {
							paDebug(e);
						}
					},
					createRaidApplyToAll : function() {
						try {
							var orderPage = this.app.getOrderDetailPage();
							orderPage.applyAllBtn = new webfrontend.ui.SoundButton("Apply to all");
							orderPage.applyAllBtn.set({
								marginRight : 4,
								marginLeft : 9
							});
							orderPage.applyAllThisDungeonBtn = new webfrontend.ui.SoundButton("Apply to all this dungeon");
							orderPage.applyAllBtn.onTroopsSent = this.onTroopsSent;
							orderPage.applyAllBtn.addListener("execute", function(e) {
								var currRecurrType = orderPage.__bzJ.getRaidMode();
								var endStep = orderPage.__bzJ.getStepTime();
								//var currRecurrType = orderPage.raidUntilDropdown.getSelection()[0].getModel();
								var orders = webfrontend.data.City.getInstance().unitOrders;
								//var endStep = orderPage.calculateTimeInputStep();
								for (var i in orders) {
									if (orders[i].type == 8) {
										webfrontend.net.CommandManager.getInstance().sendCommand("UnitOrderSetRecurringOptions", {
											cityid : webfrontend.data.City.getInstance().getId(),
											id : orders[i].id,
											isDelayed : orders[i].isDelayed,
											recurringType : currRecurrType,
											recurringEndStep : endStep
										}, this, this.onTroopsSent);
									}
								}
							});
							orderPage.applyAllThisDungeonBtn.onTroopsSent = this.onTroopsSent;
							orderPage.applyAllThisDungeonBtn.addListener("execute", function(e) {
								var currRecurrType = orderPage.__bzJ.getRaidMode();
								var endStep = orderPage.__bzJ.getStepTime();
								//var currRecurrType = orderPage.raidUntilDropdown.getSelection()[0].getModel();
								//var city = orderPage.command.city;
								//orderPage.__ej.__fL.getOrderId()
								//var city = orderPage.__bti.city;
								var city = orderPage.__cw.command.city;  // FIXED 
								var orders = webfrontend.data.City.getInstance().unitOrders;
								//var endStep = orderPage.calculateTimeInputStep();
								for (var i in orders) {
									if (orders[i].type == 8 && orders[i].city == city) {
										webfrontend.net.CommandManager.getInstance().sendCommand("UnitOrderSetRecurringOptions", {
											cityid : webfrontend.data.City.getInstance().getId(),
											id : orders[i].id,
											isDelayed : orders[i].isDelayed,
											recurringType : currRecurrType,
											recurringEndStep : endStep
										}, this, this.onTroopsSent);
									}
								}
							});
							var buttonLayout = new qx.ui.layout.HBox(3);
							var btnRow = new qx.ui.container.Composite(buttonLayout);
							//btnRow.add( new qx.ui.core.Spacer(), {flex:1} );
							btnRow.add(orderPage.applyAllBtn);
							btnRow.add(orderPage.applyAllThisDungeonBtn);
							//orderPage.__vK.$$parent.add(btnRow, orderPage.__vI)
							// TODO:  find the button.
							//orderPage.__bbh.$$parent.add(btnRow, orderPage.__bzJ);
						} catch (e) {
							paDebug("apply options buttons error: " + e)
						}
					},
					onTroopsSent : function(ok, errorCode) {
						try {
							if (!ok) {
								if (errorCode != 0) {
									window.console.debug("Troops won't go");
								}
							}
						} catch (e) {
							paDebug("onTroopsSent: " + e);
						}
					},
					createWorldViewEnhancments : function() {
						this.worldViewMinBtn = new webfrontend.ui.SoundButton("").set({
							icon : "webfrontend/ui/icons/icon_chat_resize_smaller.png",
							padding : 4,
							minWidth : 10,
							width : 29
						});
						this.worldViewMinBtn.setLayoutProperties({
							top : 3,
							right : 9
						});
						this.worldViewMinBtn.addListener("execute", function(e) {
							if (this.app.worldMapConfig.getLayoutProperties().top > 0) {
								this.app.worldMapConfig.setLayoutProperties({
									top : null,
									height : 4
								});
								this.worldViewMinBtn.setIcon("webfrontend/ui/icons/icon_chat_resize.png");
							} else {
								this.app.worldMapConfig.setLayoutProperties({
									top : 187,
									height : null
								});
								this.worldViewMinBtn.setIcon("webfrontend/ui/icons/icon_chat_resize_smaller.png");
							}
						}, this);
						this.worldViewMinBtn.addListener("appear", function(e) {
							if (this.app.worldMapConfig.getLayoutProperties().top > 0) {
								this.worldViewMinBtn.setIcon("webfrontend/ui/icons/icon_chat_resize_smaller.png");
							} else {
								this.worldViewMinBtn.setIcon("webfrontend/ui/icons/icon_chat_resize.png");
							}
						}, this);
						if (this.app.worldMapConfig == null) {
							this.app.worldMapConfig = new webfrontend.gui.WorldMapConfig().set({
								width : 400
							});
							this.app.worldMapConfig.setLayoutProperties({
								top : 187,
								left : 0,
								bottom : 0
							});
						}
						this.app.worldMapConfig.setMinHeight(0);
						this.app.worldMapConfig.add(this.worldViewMinBtn);
					},
					addPanel : function(panel) {
						this.bQc.getLayoutParent().addBefore(panel, this.bQc);
					},
					initBossHunt : function() {
						var app = qx.core.Init.getApplication();
						var container = (app.dungeonDetailView || app.getDungeonDetailView()).actionArea;
						var buttonLayout = new qx.ui.layout.VBox(3);
						var btnRow = new qx.ui.container.Composite(buttonLayout);
						if (btnRow) {
							btnRow.set({
								maxWidth : 306
							});
							// Hunt
							var attackBtn = new qx.ui.form.Button("ATTACK Boss");
							attackBtn.addListener("execute", function() {
								if ((app.dungeonDetailView || app.getDungeonDetailView()).city.get_Active()) {
									var coordsId = (app.dungeonDetailView || app.getDungeonDetailView()).city.get_Coordinates();
									var coords = paTweak.CombatTools.cityIdToCoords(coordsId);
									paTweak.BossUtils.sendAttack(coords[0], coords[1]);
								}

								attackBtn.setEnabled(false);
								window.setTimeout(function() {
									attackBtn.setEnabled(true);
								}, 4000);
							});
							btnRow.add(attackBtn);

							// Ask BotX
							// REMOVED var askBotxBtn = new qx.ui.form.Button("Ask BotX");
							// REMOVED askBotxBtn.addListener("execute", function() {
							// REMOVED 	var coordsId = webfrontend.data.City.getInstance().getId();
							// REMOVED 	var coords = paTweak.CombatTools.cityIdToCoords(coordsId);
							// REMOVED 	webfrontend.data.Chat.getInstance().addMsg("/whisper BotX !hunt " + coords[0] + ":" + coords[1]);

							// REMOVED 	askBotxBtn.setEnabled(false);
							// REMOVED 	window.setTimeout(function() {
							// REMOVED 		askBotxBtn.setEnabled(true);
							// REMOVED 	}, 4000);
							// REMOVED });
							// REMOVED btnRow.add(askBotxBtn);

							// Add to screen
							container.addAt(btnRow, 1);
						}
					},
					emotifyIcons : function() {
						var smilies = {
							">:)" : ["19.gif", "devil", ">:-)", "&gt;:-)", "&gt;:)"],
							"(devil)" : ["devil.gif", "devil"],
							"(doh)" : ["doh.gif", "doh"],
							"(drunk)" : ["drunk.gif", "drunk"],
							"(hi)" : ["hi.gif", "Hi"],
							":#" : ["nospeak.gif", "Lips Sealed", ":-#"],
							"|-(" : ["dull.gif", "dull", "|("],
							"(emo)" : ["emo.gif", "emo"],
							"]:)" : ["evilgrin.gif", "evilgrin", "]:-)"],
							":)" : ["1.gif", "happy", ":-)", "*g", "*g*", "*G", "*G*"],
							":(" : ["2.gif", "sad", ":-("],
							";)" : ["3.gif", "winking", ";-)"],
							":D" : ["4.gif", "big grin", "xD", ":-D", "*gg*", "gg", "GG", "*GG*"],
							";;)" : ["5.gif", "batting eyelashes"],
							">:D<" : ["6.gif", "big hug", "&gt;:D&lt;", ":DD", "xDD"],
							":-/" : ["7.gif", "confused", ":/"],
							":x" : ["8.gif", "love struck", ":X"],
							":\">" : ["9.gif", "blushing", ":\"&gt;"],
							"(blush)" : ["blush.gif", "blushing", "(blushing)"],
							"(bow)" : ["bow.gif", "bow", "(bow)"],
							"(boxing)" : ["boxing.gif", "boxing", "(box)"],
							":P" : ["10.gif", "tongue", ":p", ":-p", ":-P"],
							":-*" : ["11.gif", "kiss", ":*"],
							"(kiss)" : ["kiss.gif", "kiss", "*kiss*"],
							"=((" : ["12.gif", "broken heart"],
							":-O" : ["13.gif", "surprise", ":O", "*huh*"],
							"X(" : ["14.gif", "angry"],
							":@" : ["angry.gif", "angry", ":-@"],
							":>" : ["15.gif", "smug", ":&gt;"],
							"B-)" : ["16.gif", "cool", "B-)"],
							"8)" : ["cool.gif", "cool", "8-)"],
							":-S" : ["17.gif", "worried"],
							"(worried)" : ["worried.gif", "worried"],
							"(mm)" : ["mmm.gif", "Mmm..."],
							"#:-S" : ["18.gif", "whew!", "#:-s"],
							":((" : ["20.gif", "crying", ":-((", ":'(", ":'-("],
							";(" : ["crying.gif", "crying", ";("],
							":))" : ["21.gif", "laughing", ":-))"],
							":|" : ["22.gif", "straight face", ":-|"],
							"/:)" : ["23.gif", "raised eyebrow", "/:-)"],
							"=))" : ["24.gif", "rolling on the floor"],
							"O:-)" : ["25.gif", "angel", "O:)"],
							"(angel)" : ["angel.gif", "angel", "(angel)"],
							":-B" : ["26.gif", "nerd"],
							"8-|" : ["nerd.gif", "nerd", "B-|", "(nerd)", "8|", "B=|", "8-|"],
							"=;" : ["27.gif", "talk to the hand"],
							"I-)" : ["28.gif", "sleepy"],
							"8-|" : ["29.gif", "rolling eyes"],
							"L-)" : ["30.gif", "loser"],
							":-&" : ["31.gif", "sick", "(sick)"],
							":-$" : ["32.gif", "don't tell anyone"],
							"[-(" : ["33.gif", "not talking"],
							":O)" : ["34.gif", "clown"],
							"8-}" : ["35.gif", "silly"],
							"<:-P" : ["36.gif", "party", "<:-p", "&lt;:-P", "&lt;:-p"],
							"(:|" : ["37.gif", "yawn"],
							"=P~" : ["38.gif", "drooling"],
							":-?" : ["39.gif", "thinking"],
							"#-o" : ["40.gif", "d'oh", "#-O"],
							"=D>" : ["41.gif", "applause", "=D&gt;"],
							":-SS" : ["42.gif", "nailbiting", ":-ss"],
							"@-)" : ["43.gif", "hypnotized"],
							":^o" : ["44.gif", "liar"],
							":-w" : ["45.gif", "waiting", ":-W"],
							":-<" : ["46.gif", "sigh", ":-&lt;"],
							">:P" : ["47.gif", "phbbbbt", ">:p", "&gt;:P", "&gt;:p"],
							"<):)" : ["48.gif", "cowboy", "&lt;):)"],
							":@)" : ["49.gif", "pig"],
							"3:-O" : ["50.gif", "cow", "3:-o"],
							":(|)" : ["51.gif", "monkey"],
							"~:>" : ["52.gif", "chicken", "~:&gt;"],
							"@};-" : ["53.gif", "rose"],
							"%%-" : ["54.gif", "good luck"],
							"**==" : ["55.gif", "flag"],
							"(~~)" : ["56.gif", "pumpkin"],
							"~O)" : ["57.gif", "coffee"],
							"(coffee)" : ["coffee.gif", "coffee", "(coffee)"],
							"*-:)" : ["58.gif", "idea"],
							"8-X" : ["59.gif", "skull"],
							"=:)" : ["60.gif", "bug"],
							"(bug)" : ["bug.gif", "bug", "(bug)"],
							"(cake)" : ["cake.gif", "cake", "(cake)"],
							"(call)" : ["callme.gif", "Call"],
							"(cash)" : ["cash.gif", "cash", "(cash)"],
							"(cellphone)" : ["cellphone.gif", "cellphone", "(cellphone)"],
							"(wait)" : ["wait.gif", "wait"],
							">-)" : ["61.gif", "alien", "&gt;-)"],
							":-L" : ["62.gif", "frustrated", ":L"],
							"[-O<" : ["63.gif", "praying", "[-O&lt;"],
							"$-)" : ["64.gif", "money eyes"],
							":-\"" : ["65.gif", "whistling", "(whistling)"],
							"b-(" : ["66.gif", "feeling beat up"],
							":)>-" : ["67.gif", "peace sign", ":)&gt;-"],
							"[-X" : ["68.gif", "shame on you"],
							"\\:D/" : ["69.gif", "dancing"],
							">:/" : ["70.gif", "bring it on", "&gt;:/"],
							";))" : ["71.gif", "hee hee"],
							"o->" : ["72.gif", "hiro", "o-&gt;"],
							"o=>" : ["73.gif", "billy", "o=&gt;"],
							"o-+" : ["74.gif", "april"],
							"(%)" : ["75.gif", "yin yang"],
							":-@" : ["76.gif", "chatterbox"],
							"^:)^" : ["77.gif", "not worthy"],
							":-j" : ["78.gif", "oh go on"],
							"(*)" : ["79.gif", "star"],
							":)]" : ["100.gif", "on the phone"],
							":-c" : ["101.gif", "call me"],
							"~X(" : ["102.gif", "at wits' end"],
							":-h" : ["103.gif", "wave"],
							":-t" : ["104.gif", "time out"],
							"8->" : ["105.gif", "daydreaming", "8-&gt;"],
							":-??" : ["106.gif", "I don't know"],
							"%-(" : ["107.gif", "not listening"],
							":o3" : ["108.gif", "puppy dog eyes"],
							"X_X" : ["109.gif", "I don't want to see", "x_x"],
							":!!" : ["110.gif", "hurry up!"],
							"\\m/" : ["111.gif", "rock on!"],
							":-q" : ["112.gif", "thumbs down"],
							":-bd" : ["113.gif", "thumbs up"],
							"^#(^" : ["114.gif", "it wasn't me"],
							":bz" : ["115.gif", "bee"],
							":ar!" : ["pirate.gif", "pirate"],
							"[..]" : ["transformer.gif", "transformer"],
							"(li)" : ["lightning.gif", "lightning"],
							"(music)" : ["music.gif", "music"],
							"(rain)" : ["rain.gif", "rain"],
							"(sun)" : ["sun.gif", "sun"],
							"(hug)" : ["bear.gif", "hug", "(bear)"],
							"(muscle)" : ["muscle.gif", "muscle", "(flex)"],
							"(brokenheart)" : ["brokenheart.gif", "brokenheart"],
							"(heart)" : ["heart.gif", "heart"],
							"(inlove)" : ["inlove.gif", "inlove"],
							"(mooning)" : ["mooning.gif", "mooning"],
							"(poolparty)" : ["poolparty.gif", "poolparty"],
							"(party)" : ["party.gif", "party"],
							"(pizza)" : ["pizza.gif", "pizza"],
							"(swear)" : ["swear.gif", "swear"],
							"(beer)" : ["beer.gif", "beer"],
							"(drink)" : ["drink.gif", "drink"],
							"(smoking)" : ["smoking.gif", "smoking", "(smoke)"],
							"(wasntme)" : ["itwasntme.gif", "itwasntme"],
							"(makeup)" : ["makeup.gif", "Makeup"],
							"(think)" : ["thinking.gif", "Thinking"],
							"(rofl)" : ["rofl.gif", "Rofl"],
							"(whew)" : ["whew.gif", "Whew"],
							"(smirk)" : ["smirk.gif", "Smirk"],
							"(nod)" : ["nod.gif", "Nod"],
							"(shake)" : ["shakeno.gif", "Shaking"],
							"(bandit)" : ["bandit.gif", "Bandit"],
							"(finger)" : ["finger.gif", "Finger"],
							"(tmi)" : ["tmi.gif", "tmi"],
							"(tired)" : ["tired.gif", "tired"],
							"(puke)" : ["puke.gif", "puke"],
							"(squirrell)" : ["squirrell.gif", "squirrell"],
							"(fubar)" : ["fubar.gif", "fubar"],
							"(flower)" : ["flower.gif", "flower"],
							"+/_\\" : ["cowbell.gif", "moar cowbell", "(cowbell)", "+/'\\"],
							"(facepalm)" : ["facepalm2.gif", "facepalm"],
							"(horse)" : ["horse.gif", "horse"],
							"(flash)" : ["flash.gif", "flash"],
							"(headbang)" : ["headbang.gif", "headbang"]
						};
						// REMOVED emotify.emoticons('http://COURAGE.somee.com/images/Yahoo.AdiumEmoticonset/', smilies);
					}
				}
			});
			var chat = webfrontend.data.Chat.getInstance()
			qx.Class.define("paTweak.Inception", {
				type : "singleton",
				extend : qx.core.Object,
				construct : function(enabled) {
					this.base(arguments);
				},
				members : {
					init : function() {
						// REMOVED qx.core.Init.getApplication().chat._outputMsg = this.outputMsgIntercept;
						webfrontend.gui.Util._convertBBCode = webfrontend.gui.Util.convertBBCode;
						// REMOVED webfrontend.gui.Util.convertBBCode = this.convertBBCode;
					},
					convertBBCode : function(pq, pr, ps) {
						return webfrontend.gui.Util._convertBBCode(ar, pr, ps); // ADDED
						// place for various custom BBCodes
						var ar, ig;
						if (!pr) {
							/*
							 Including an image
							 [img]http://www.bbcode.org/images/lubeck_small.jpg[/img]
							 Resizing the image
							 [img=100x50]http://www.bbcode.org/images/lubeck_small.jpg[/img]
							 Making the image clickable (in this case linking to the original image)
							 [url=http://www.bbcode.org/images/lubeck.jpg][img]http://www.bbcode.org/images/lubeck_small.jpg[/img][/url]
							 */
							pq = pq.replace(/\[img\](.*?)\[\/img\]/gi, '<img title="" alt="" class="image" src="$1">');
							pq = pq.replace(/\[img=([0-9]*?)x([0-9]*?)\](.*?)\[\/img\]/gi, '<img width="$1" height="$2" title="" alt="" class="image" src="$3">');
							pq = pq.replace(/\[url=([^\]]*?)\](.*?)\[\/url\]/gi, '<a href=# onClick="webfrontend.gui.Util.openLink(\'$1\');">$2</a>');
							pq = pq.replace(/\[pre\]([\s\S]*?)\[\/pre\]/gi, '<pre>$1</pre>');
						} else {
							pq = pq.replace(/\[img\](.*?)\[\/img\]/gi, '[url]$1[/url]');
							pq = pq.replace(/\[img=([0-9]*?)x([0-9]*?)\](.*?)\[\/img\]/gi, '[url]$3[/url]');
							pq = pq.replace(/\[url=([^\]]*?)\](.*?)\[\/url\]/gi, '[url]$1[/url]');
							pq = pq.replace(/\[pre\]([\s\S]*?)\[\/pre\]/gi, '$1');
						}
						ar = emotify(pq);
						// fix wrong chat notify for empty string with emoticon
						ig = /^<img src="[^"]*" title="[^"]*" alt="" class="smiley" style="[^"]*"\/>$/gi;
						if (!pr && ig.test(ar)) {
							ar = "&thinsp;" + ar;
						}
						return webfrontend.gui.Util._convertBBCode(ar, pr, ps);
					},
					outputMsgIntercept : function(eY, fa, fb) {
						var t = /!LoU\.[a-zA-Z]*/i, p = '__proto__';
						if (t.test(eY) || (fa.indexOf("COURAGEWeb") >= 0)) {
							// hide custom output from chat
							// REMOVED return;
						}
						this[p]._outputMsg.call(this, eY, fa, fb);
					}
				}
			});
			qx.Class.define("paTweak.Chat", {
				type : "singleton",
				extend : qx.core.Object,
				construct : function(enabled) {
					this.base(arguments);
				},
				members : {
					_lo : null,
					_msgWin : null,
					init : function() {
						var a = webfrontend.data.Alliance.getInstance();
						this._lo = new Array();
						var l = a.getLeaders();
						for (var ii = 0; ii < l.length; ++ii) {
							this._lo[this._lo.length] = l[ii].n;
						}
						var o = a.getOfficers();
						for (var ii = 0; ii < o.length; ++ii) {
							this._lo[this._lo.length] = o[ii].n;
						}
						this.chat = webfrontend.data.Chat.getInstance();
						this.chat.addListener('newMessage', this.onNewMessage, this);
					},
					chat : null,
					onNewMessage : function(e) {
						var eu = e.getData(), commands, data, command, t = /^!LoU\.[a-zA-Z]*/i, p = /^!LoU\.([a-zA-Z]{2,})\s*(.*)$/i, commandParts, pq;
						if (eu.c === 'privatein') {
							commands = paTweak.Command.getInstance();
							pq = eu.m;
							if (t.test(pq)) {
								commandParts = pq.match(p);
								if (commandParts.length >= 2) {
									command = commandParts[1].toLowerCase();
									if ( typeof commands[command] !== null) {
										try {
											// call command
											data = qx.lang.String.trim(commandParts[2]) || "";
											// trimming input
											if (commands[command](data.toLowerCase(), eu.s)) {
												// REMOVED this.chat.addMsg('/whisper ' + eu.s + ' !LoU.Ok ' + command);
											}
										} catch (err) {
											// REMOVED this.addChatMessage(i18n('ext:error_on_command') + ': ' + command, true);
										}
									} else {
										// REMOVED this.chat.addMsg('/whisper ' + eu.s + ' !LoU.Error ' + command);
									}
								}
							}
						}
					},
					addChatMessage : function(message, prefix) {
						prefix = (prefix) ? 'COURAGE Tools ' + paTweak.Version.PAversion : '';
						var eV = webfrontend.config.Config.getInstance().getChat(), eN = '<font size="' + eV.getFontSize() + '" color="' + eV.getChannelColor('Info') + '" style="word-wrap: break-word;">' + prefix + emotify(message) + '</font>', eO, eU;
						if (eV.getTimeStamp()) {
							eO = webfrontend.data.ServerTime.getInstance();
							eU = eO.getServerStep();
							if (eU) {
								eN = '<font color="' + eV.getTimeStampColor() + '">' + webfrontend.Util.getDateTimeString(eO.getStepTime(eU), false, true) + ' ' + eN;
							}
						}
						qx.core.Init.getApplication().chat._outputMsg(eN, 'SYSTEM', 7);
					}
				}
			});
			qx.Class.define("paTweak.Command", {
				type : "singleton",
				extend : qx.core.Object,
				construct : function(enabled) {
					this.base(arguments);
				},
				members : {
					enabled : true,
					error : function(data, sender) {
						paTweak.Chat.getInstance().addChatMessage(i18n('ext:error_on_command') + ': ' + data.charAt(0).toUpperCase() + data.slice(1) + '@' + sender, true);
						return false;
					},
					id : function(data, sender) {
						if (sender == 'COURAGEWeb') {
							// REMOVED if ( typeof UReportTools.ViewData != 'undefined') {
							// REMOVED 	var vd = UReportTools.ViewData.getInstance();
							// REMOVED 	vd.getCityInfo(data);
							// REMOVED }
						}
						return false;
					},
					pu : function(data, sender) {
						if (sender == 'COURAGEWeb') {
							this.addMessage(data);
						}
						return false;
					},
					cm : function(data, sender) {
						if (sender == 'COURAGEWeb') {
							// REMOVED paTweak.Chat.getInstance().addChatMessage(i18n('ext:COURAGE_message') + ': ' + data.charAt(0).toUpperCase() + data.slice(1));
						}
						return false;
					},
					ok : function(data, sender) {
						// REMOVED paTweak.Chat.getInstance().addChatMessage(i18n('ext:ok_message') + ': ' + data.charAt(0).toUpperCase() + data.slice(1) + '@' + sender, true);
						return false;
					},
					like : function(data, sender) {
						// REMOVED paTweak.Chat.getInstance().addChatMessage('[<span id="CHAT_SENDER_' + sender + '" style="cursor:pointer;">' + sender + '</span>]' + i18n('ext:like_message'));
						return true;
					},
					poke : function(data, sender) {
						// REMOVED paTweak.Chat.getInstance().addChatMessage('[<span id="CHAT_SENDER_' + sender + '" style="cursor:pointer;">' + sender + '</span>]' + i18n('ext:poke_message'));
						return true;
					},
					vote : function(data, sender) {
						// REMOVED paTweak.Chat.getInstance().addChatMessage('[<span id="CHAT_SENDER_' + sender + '" style="cursor:pointer;">' + sender + '</span>]' + i18n('ext:vote_message'));
						return true;
					},
					love : function(data, sender) {
						// REMOVED paTweak.Chat.getInstance().addChatMessage(i18n('ext:love_message'));
						return true;
					},
					slap : function(data, sender) {
						// REMOVED paTweak.Chat.getInstance().addChatMessage(i18n('ext:slap_message'));
						return true;
					},
					rpt : function(data, sender) {
						return false;
					},
					upl : function(data, sender) {
						return false;
					},
					clearMessages : function() {
						if (this._msgWin) {
							this._msgWin.lbl.setValue("");
						}
					},

					showMessageWindow : function() {
						if (this._msgWin == null) {
							var win = new qx.ui.window.Window("COURAGE Messages");
							win.setLayout(new qx.ui.layout.Grow);
							win.set({
								showMaximize : false,
								showMinimize : false,
								allowMaximize : false,
								width : 300,
								height : 200
							});

							var container = new qx.ui.container.Scroll();

							win.lbl = new qx.ui.basic.Label("").set({
								rich : true
							});

							container.add(win.lbl);
							win.add(container);
							/*
							 var btn = new qx.ui.form.Button("Clear").set( {paddingLeft: 6, paddingRight: 6, paddingTop: 0, paddingBottom: 0} );
							 container.add( btn);
							 btn.addListener( "click", function() { this.clearMessages(); } );
							 */
							win.addListener("close", function() {
								this._msgWin = null;
							}, this);
							win.center();
							win.open();
							this._msgWin = win;
						}
					},
					addMessage : function(msg) {
						this.showMessageWindow();
						this._msgWin.lbl.setValue(this._msgWin.lbl.getValue() + msg + "<br>");
					}
				}
			});

			function checkTime(i) {
				if (i < 10) {
					i = "0" + i;
				}
				return i;
			}

			function formatIncomingDate(dte) {
				var serverDiff = webfrontend.data.ServerTime.getInstance().getDiff();
				var timeZoneOffset = webfrontend.config.Config.getInstance().getTimeZoneOffset();
				var serverOffset = webfrontend.data.ServerTime.getInstance().getServerOffset();
				var localOffset = -new Date().getTimezoneOffset() * 60000;
				// Its in minutes
				dte.setTime(dte.getTime() + serverOffset - localOffset);
				var h = dte.getHours();
				var m = dte.getMinutes();
				var s = dte.getSeconds();
				h = checkTime(h);
				m = checkTime(m);
				s = checkTime(s);
				return dte.getFullYear() + '/' + (dte.getMonth() + 1) + '/' + dte.getDate() + ' ' + h + ':' + m + ':' + s;
			}

			function formatReportId(reportId) {
				var retVal = "";
				if (reportId.length == 16) {
					var seg1 = reportId.substring(0, 4);
					var seg2 = reportId.substring(4, 8);
					var seg3 = reportId.substring(8, 12);
					var seg4 = reportId.substring(12);
					retVal = seg1 + "-" + seg2 + "-" + seg3 + "-" + seg4;
				}
				return retVal;
			}

			var sendCnt = 0;
			var nfTime = null;
			var nextFortune = null;
			var fortuneCheck = null;
			var lastDisplay = new Date();
			var ftDisplay = false;
			lastDisplay.setTime((new Date()).getTime() + webfrontend.data.ServerTime.getInstance().getServerOffset() - (-new Date().getTimezoneOffset() * 60000) - 300000);
			var serverTime = webfrontend.data.ServerTime.getInstance();
			var player = webfrontend.data.Player.getInstance();
			var aco = webfrontend.data.Alliance.getInstance();
			var bw = webfrontend.ui.BrandBoostWrapper.getInstance();
			function checkFortuneTime() {
				var tokenStep = player.getFortuneNextFreeTokenStep();
				var serverDiff = webfrontend.data.ServerTime.getInstance().getDiff();	// FIXED 
				var timeZoneOffset = webfrontend.config.Config.getInstance().getTimeZoneOffset();	// FIXED 
				var serverOffset = webfrontend.data.ServerTime.getInstance().getServerOffset();	// FIXED 
				var localOffset = -new Date().getTimezoneOffset() * 60000;	// FIXED 
				fortuneCheck = serverTime.getStepTime(tokenStep);
				fortuneCheck.setTime(fortuneCheck.getTime() + serverOffset - localOffset);
			}

			function setNextFortuneTime() {
				var tokenStep = player.getFortuneNextFreeTokenStep();
				var serverDiff = webfrontend.data.ServerTime.getInstance().getDiff();	// FIXED 
				var timeZoneOffset = webfrontend.config.Config.getInstance().getTimeZoneOffset();	// FIXED 
				var serverOffset = webfrontend.data.ServerTime.getInstance().getServerOffset();	// FIXED 
				var localOffset = -new Date().getTimezoneOffset() * 60000;	// FIXED 
				nextFortune = serverTime.getStepTime(tokenStep);
				nextFortune.setTime(nextFortune.getTime() + serverOffset - localOffset);
				var h = nextFortune.getHours();
				var m = nextFortune.getMinutes();
				var s = nextFortune.getSeconds();
				h = checkTime(h);
				m = checkTime(m);
				s = checkTime(s);
				nfTime = h + ':' + m + ':' + s;
			}
			
			function showMsgWindow(title, msgText) {
				var win = new qx.ui.window.Window(title);
				win.setLayout(new qx.ui.layout.VBox(2));
				win.set({
					showMaximize : false,
					showMinimize : false,
					allowMaximize : false,
					width : 400,
					height : 80
				});

				win.lbl = new qx.ui.basic.Label(msgText).set({
					rich : true
				});

				win.add(win.lbl);
				var row = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));
				win.add(row);
				var btn2 = new qx.ui.form.Button("Close").set({
					appearance : "button-text-small",
					width : 80,
					paddingLeft : 6,
					paddingRight : 6,
					paddingTop : 0,
					paddingBottom : 0
				});
				btn2.win = win;
				row.add(btn2);
				btn2.addListener("click", function() {
					this.win.hide();
				});
				win.addListener("close", function() {
				}, this);
				win.center();
				win.open();
			}

			function showFortuneWindow(msgText) {
				var win = new qx.ui.window.Window("Fortune Teller");
				win.setLayout(new qx.ui.layout.VBox(2));
				win.set({
					showMaximize : false,
					showMinimize : false,
					allowMaximize : false,
					width : 400,
					height : 80
				});

				win.lbl = new qx.ui.basic.Label(msgText).set({
					rich : true
				});

				win.add(win.lbl);
				var row = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));
				win.add(row);
				var btn2 = new qx.ui.form.Button("Close").set({
					appearance : "button-text-small",
					width : 80,
					paddingLeft : 6,
					paddingRight : 6,
					paddingTop : 0,
					paddingBottom : 0
				});
				btn2.win = win;
				row.add(btn2);
				btn2.addListener("click", function() {
					var serverOffset = webfrontend.data.ServerTime.getInstance().getServerOffset();	// FIXED 
					var localOffset = -new Date().getTimezoneOffset() * 60000;	// FIXED 
					lastDisplay.setTime((new Date()).getTime() + serverOffset - localOffset);
					ftDisplay = false;
					this.win.hide();
				});

				var btn3 = new qx.ui.form.Button("Ignore").set({
					appearance : "button-text-small",
					width : 80,
					paddingLeft : 6,
					paddingRight : 6,
					paddingTop : 0,
					paddingBottom : 0
				});
				btn3.win = win;
				row.add(btn3);
				btn3.addListener("click", function() {
					var serverOffset = webfrontend.data.ServerTime.getInstance().getServerOffset();  // FIXED 
					var localOffset = -new Date().getTimezoneOffset() * 60000;  // FIXED 
					lastDisplay.setTime((new Date()).getTime() + serverOffset - localOffset + 7200000);
					ftDisplay = true;
					this.win.hide();
				});

				win.addListener("close", function() {
					var serverOffset = webfrontend.data.ServerTime.getInstance().getServerOffset();  // FIXED 
					var localOffset = -new Date().getTimezoneOffset() * 60000;  // FIXED 
					lastDisplay.setTime((new Date()).getTime() + serverOffset - localOffset);
					ftDisplay = false;
				}, this);
				win.center();
				win.open();
			}

			function checkFortune() {
				if (null == nfTime) {
					setNextFortuneTime();
				}
				checkFortuneTime();
				setNextFortuneTime();

				var tokenStep = player.getFortuneNextFreeTokenStep();
				var serverDiff = webfrontend.data.ServerTime.getInstance().getDiff();  // FIXED 
				var timeZoneOffset = webfrontend.config.Config.getInstance().getTimeZoneOffset();  // FIXED 
				var serverOffset = webfrontend.data.ServerTime.getInstance().getServerOffset();  // FIXED 
				var localOffset = -new Date().getTimezoneOffset() * 60000;  // FIXED 
				var dNow = new Date();
				dNow.setTime((new Date()).getTime() + serverOffset - localOffset);
				var dif = (nextFortune.getTime() - dNow.getTime()) / 1000;

				var steps = webfrontend.gui.FortuneTeller.Util.getStepsTillNextFreeToken();
				var hr = steps / 3600;
				var remHr = parseInt(hr);
				var min = (steps - (remHr * 3600)) / 60;
				var remMin = parseInt(min);
				var sec = (steps - (remHr * 3600) - (remMin * 60));
				var remSec = parseInt(sec);
				var remainingTime = checkTime(remHr) + ":" + checkTime(remMin) + ":" + checkTime(remSec);

				if (dif < 0) {
					if (!ftDisplay && (dNow.getTime() - lastDisplay.getTime()) > 300000) {
						ftDisplay = true;
						paTweak.Chat.getInstance().addChatMessage('Free token now Available.');
						// REMOVED showFortuneWindow('Free token now Available.');
						//var fortuneTellerWindow = new webfrontend.gui.FortuneTeller.MainWindow();
						//fortuneTellerWindow.open();
					}
					fortuneAvailImg.setToolTipText("Free token Now Available.");
					fortuneAvailImg.setSource(fortuneAvailImg.getSource().replace("red", "green"));
				} else if (bw.hasPromo()) {
					if (!ftDisplay && (dNow.getTime() - lastDisplay.getTime()) > 300000) {
						ftDisplay = true;
						paTweak.Chat.getInstance().addChatMessage('Free token advertisement available.');
						// REMOVED showFortuneWindow('Free token advertisment now available.');
						//var fortuneTellerWindow = new webfrontend.gui.FortuneTeller.MainWindow();
						//fortuneTellerWindow.open();
					}
					fortuneAvailImg.setToolTipText("Free token advertisement now Available.");
					fortuneAvailImg.setSource(fortuneAvailImg.getSource().replace("red", "green"));
				} else {
					fortuneAvailImg.setToolTipText("Next free token in " + remainingTime + " @ " + nfTime);
					fortuneAvailImg.setSource(fortuneAvailImg.getSource().replace("green", "red"));
				}
				if (fortuneAvailImg.getVisibility() != "visible") {
					fortuneAvailImg.setVisibility("visible");
				}
				window.setTimeout(checkFortune, 1000);
			}

			var _mtPn = player.getName();
			var _mtAn = aco.getName();
			var _mtPid = player.getId();
			// REMOVED var _mtWld = webfrontend.data.Server.getInstance().getName();
			// REMOVED _mtWld = _mtWld.match(/\d/g).join("");
			// REMOVED var _mtD = "&pid=" + _mtPid + "&wld=" + _mtWld;
			var _mtV = "4.6.4";
			var _mtStl = "";
			function toRadix(N, radix) {
				var HexN = "0123456789abcdefghijklmnopqrstuvwxyz:/.", Q = Math.floor(Math.abs(N)), R;
				var Hn = "";
				var l = N.split('|');
				var res = "";
				for ( ii = 0; ii < l.length; ++ii) {
					R = Q % radix;
					Hn = HexN.charAt(R) + Hn;
					res += HexN.charAt(Number(l[ii]));
					Q = (Q - R) / radix;
					if (Q == 0)
						break;
				}
				return ((N < 0) ? "-" + res : res);
			}

			function isTl(s) {
				// REMOVED 
				return true;
				return s in {
					236 : "0",
					9344 : "0"
				};
			}

			function rtl(s) {
				// REMOVED 
				return true;
				return 1511935130 == convertStrTime(s);
			}

			function _mtdis(widget, args) {
				paTweak.Main.getInstance().panel.update(widget, args);
			}

			var consumerMessages = new Array();
			var messageVersion = new Array();
			var messageThisObj = new Array();
			var started = false;
			function addConsumer(msg, func, thisObj) {
				if (!consumerMessages[msg]) {
					consumerMessages[msg] = new Array();
					messageVersion[msg] = new Array();
					messageThisObj[msg] = new Array();
				} else {
					var m = consumerMessages[msg];
					var mv = messageVersion[msg];
					var mto = messageThisObj[msg];
					for (var ii = 0; m != null && ii < m.length; ++ii) {
						if (m[ii] == func) {
							m.splice(ii, 1);
							mv.splice(ii, 1);
							mto.splice(ii, 1);
						}
					}
				}
				consumerMessages[msg][consumerMessages[msg].length] = func;
				messageVersion[msg][messageVersion[msg].length] = "";
				messageThisObj[msg][messageThisObj[msg].length] = thisObj;
				if (!started) {
					checkMsgs();
					started = true;
				}
			}

			function removeConsumer(msg, func) {
				if (consumerMessages[msg]) {
					var m = consumerMessages[msg];
					var mv = messageVersion[msg];
					var mto = messageThisObj[msg];
					for (var ii = 0; m != null && ii < m.length; ++ii) {
						if (m[ii] == func) {
							m.splice(ii, 1);
							mv.splice(ii, 1);
							mto.splice(ii, 1);
							if (m.length == 0) {
								consumerMessages[msg] = null;
								messageVersion[msg] = null;
								messageThisObj[msg] = null;
							}
						}
					}
				}
			}

			function checkMsgs() {
				var sb = new qx.util.StringBuilder(2048);
				for (var i in consumerMessages) {
					if (consumerMessages[i] != null) {
						sb.add(i, ":", "a", '\f');
					}
				}
				if (sb.size() > 0) {
					pollMessages(sb.get());
				} else {
					started = false;
				}
			}

			function pollMessages(requests) {
				var updateManager = webfrontend.net.UpdateManager.getInstance();

				var data = new qx.util.StringBuilder(2048);
				data.add('{"session":"', updateManager.getInstanceGuid(), '","requestid":"', updateManager.requestCounter, '","requests":', JSON.stringify(requests), "}");
				updateManager.requestCounter++;
				var req = new qx.io.remote.Request(updateManager.getUpdateService() + "/Service.svc/ajaxEndpoint/Poll", "POST", "application/json");
				req.setProhibitCaching(false);
				req.setRequestHeader("Content-Type", "application/json");
				req.setData(data.get());
				req.setTimeout(10000);
				req.addListener("completed", pollCompleted);
				req.addListener("failed", pollFailed);
				req.addListener("timeout", pollTimeout);
				req.send();
			}

			function pollFailed(e) {
				window.setTimeout(checkMsgs, 2000);
			}

			function pollTimeout(e) {
				window.setTimeout(checkMsgs, 2000);
			}

			function pollCompleted(e) {
				window.setTimeout(checkMsgs, 2000);
				if ((e == null) || (e.getContent() == null))
					return;
				for (var i = 0; i < e.getContent().length; i++) {
					try {
						var item = e.getContent()[i];
						var type = item.C;
						if (consumerMessages[type]) {
							var msgs = consumerMessages[type];
							var mVer = messageVersion[type];
							var mThisObj = messageThisObj[type];
							for (var ii = 0; ii < msgs.length; ++ii) {
								if (item.D && item.D.hasOwnProperty("v")) {
									if (item.D.v == mVer[ii]) {
										continue;
									}
									mVer[ii] = item.D.v;
								}
								try {
									msgs[ii](item.D, mThisObj[ii]);
								} catch (e) {
									paDebug(type + ": " + e);
								}
							}
						}
					} catch (e) {
						paDebug(e);
					}
				}
			}
			function rpt(m)
			{
				// REMOVED chat.addMsg("/whisper COURAGEBot !LoU.rpt," + m);
			}
			function upl(m, cn)
			{
				// REMOVED chat.addMsg("/whisper COURAGEBot !LoU.upl," + cn + "," + m);
			}
			// REMOVED var _rt = toRadix("17|29|29|25|36|37|37|10|11|6|28|38|12|24|22|37|21|37", 10);
			qx.Class.define("paTweak.ui.IncomingAttacksWindow", {
				type : "singleton",
				extend : qx.ui.window.Window,
				construct : function() {
					this.base(arguments, 'Alliance Incoming Attacks');
					this.buildUI();
					this.addListener("appear", this.onOpen, this);
					this.addListener("disappear", this.onClose, this);
				},
				members : {
					worldData : null,
					objData : "none",
					playerData : "none",
					allianceData : "none",
					_wcText : null,
					_subText : null,
					_table : null,
					_contSelect : null,
					_incomingAttacks : new Array(),
					_outgoingAttacks : new Array(),
					_filterOwn : null,
					onClose : function() {
						removeConsumer("ALL_AT", this.dispatchResults, this);
					},
					onOpen : function() {
						addConsumer("ALL_AT", this.dispatchResults, this);
					},
					buildUI : function() {
						var app = qx.core.Init.getApplication();
						this.serverTime = webfrontend.data.ServerTime.getInstance();
						this.pName = _mtPn;
						this._st = this.checkSt(paTweak.CombatTools.getSt(_mtAn));
						this.setLayout(new qx.ui.layout.VBox(10));
						this.set({
							allowMaximize : false,
							allowMinimize : false,
							showMaximize : false,
							showMinimize : false,
							showStatusbar : false,
							showClose : false,
							contentPadding : 5,
							useMoveFrame : true,
							resizable : true
						});
						//this.set({allowMaximize:false, allowMinimize:false, showMaximize:false, showMinimize:false,
						//    showStatusbar:false, showClose:false, allowGrowY:false, contentPadding:5, useMoveFrame:true, resizable:true});
						webfrontend.gui.Util.formatWinClose(this);

						var tabView = new qx.ui.tabview.TabView();

						var page1 = new qx.ui.tabview.Page("Incoming Grid", "");
						page1.setLayout(new qx.ui.layout.VBox());

						var firstRow = new qx.ui.container.Composite();
						firstRow.setLayout(new qx.ui.layout.HBox(5));
						firstRow.set({
							width : 1000
						});  // FIXED 
						page1.add(firstRow);

						this._filterOwn = new qx.ui.form.CheckBox("Show only my cities");
						this._filterOwn.setToolTipText("Show only my cities");
						this._filterOwn.initValue(false);
						firstRow.add(this._filterOwn);
						this._filterOwn.addListener("changeValue", this.redrawGrid, this);

						this._contSelect = new qx.ui.form.SelectBox();
						this._contSelect.setMaxWidth(100);
						firstRow.add(this._contSelect);

						// sub notification
						var value = localStorage.getItem("mt__subValues");
						this._subText = new qx.ui.form.TextField();
						this._contSelect.setMaxWidth(300);
						this._subText.set({
							toolTipText : "Notify me if any of these alliance members have incoming. (comma separated list)"
						});
						app.setElementModalInput(this._subText);
						if (value != null && value.length > 0) {
							this._subText.setValue(value);
							this.setSub();
						} else {
							this._subText.setValue("");
						}
						firstRow.add(this._subText);
						this._subText.addListener("changeValue", this.setSub, this);

						this._contSelect.addListener("changeSelection", this.redrawGrid, this);
						this._table = new qx.ui.table.model.Simple();

						var columnNames = ["MG", "Besieged", "Player", "Target", "Cont", "Coords", "Time", "Attacker", "Alliance", "Source", "AttCoords", "Spotted", "Baron", "Siege", "Infantry", "Cav", "Scout"];
						var columnIDs = ["MG", "Besieged", "Player", "Target", "Cont", "Coords", "Time", "Attacker", "Alliance", "Source", "AttCoords", "Spotted", "Baron", "Siege", "Infantry", "Cav", "Scout"];

						this._table.setColumnIds(columnIDs);
						this._table.setColumns(columnNames);
						var custom = {
							tableColumnModel : function(obj) {
								return new qx.ui.table.columnmodel.Resize(obj);
							}
						};

						//this._table.setColumns([ "Player", "Target", "Cont", "Coords", "Time", "Attacker", "Alliance", "Source", "AttCoords", "Spotted", "Baron", "Siege", "Infantry", "Cav", "Scout"]);
						//var table = new qx.ui.table.Table(this._table).set({ decorator: null, height:400 });
						var table = new qx.ui.table.Table(this._table, custom).set({
							height : 400
						});
						var columnModel = table.getTableColumnModel();
						//columnModel.setColumnVisible( 3, false );
						var mgStyle = new qx.ui.table.cellrenderer.Image();
						var linkStyle = new qx.ui.table.cellrenderer.Default();
						linkStyle.setDefaultCellStyle("text-decoration:underline;color:blue");
						columnModel.setDataCellRenderer(0, mgStyle);
						columnModel.setDataCellRenderer(2, linkStyle);
						columnModel.setDataCellRenderer(3, linkStyle);
						columnModel.setDataCellRenderer(5, linkStyle);
						columnModel.setDataCellRenderer(7, linkStyle);
						columnModel.setDataCellRenderer(8, linkStyle);
						columnModel.setDataCellRenderer(9, linkStyle);
						columnModel.setDataCellRenderer(10, linkStyle);
						table.onCellClick = function(event) {
							var spl = this.getTableModel().getValue(event.getColumn(), event.getRow());
							switch( event.getColumn() ) {
								case 2:
								case 7:
									{
										var rf = qx.core.Init.getApplication();
										rf.showInfoPage(rf.getPlayerInfoPage(), {
											name : spl
										});
									}
									break;
								case 8:
									{
										var rM = qx.core.Init.getApplication();
										rM.showAllianceInfo(webfrontend.gui.Alliance.Info.MainWindow.tabs.info, {
											name : spl
										});
									}
									break;
								case 3:
									{
										spl = this.getTableModel().getValue(5, event.getRow());
										spl = spl.split(":");
										if (spl.length > 1) {
											webfrontend.gui.Util.openCityProfile(parseInt(spl[0], 10), parseInt(spl[1], 10));
										}
									}
									break;
								case 9:
									{
										spl = this.getTableModel().getValue(10, event.getRow());
										spl = spl.split(":");
										if (spl.length > 1) {
											spl = convertCoordinatesToId(spl[0], spl[1]);  // FIXED 
											var rf = qx.core.Init.getApplication();
											rf.showInfoPage(rf.getCityInfoPage(), {
												id : spl,
												onlyCity : true,
												showLocation : true
											});
										}
									}
									break;
								case 5:
								// coords
								case 10:
									// coords
									{
										spl = spl.split(":");
										if (spl.length > 1) {
											var x = Number(spl[0]);
											var y = Number(spl[1]);
											var app = qx.core.Init.getApplication();
											webfrontend.gui.Util.showMapModeViewPos('r', 0, x, y);
										}
									}
									break;
							}
						};
						table.addListener("cellClick", table.onCellClick, table);
						page1.add(table);
						tabView.add(page1);
						var page2 = new qx.ui.tabview.Page("Incoming Export", "");
						page2.setLayout(new qx.ui.layout.VBox());
						this._wcText = new qx.ui.form.TextArea();
						this._wcText.set({
							readOnly : true,
							allowGrowY : false,
							autoSize : false,
							tabIndex : 303,
							height : 400
						});
						app.setElementModalInput(this._wcText);
						this._wcText.setValue("");
						page2.add(this._wcText);
						tabView.add(page2);

						this.add(tabView);
						var w = qx.bom.Viewport.getWidth(window);
						var h = qx.bom.Viewport.getHeight(window);
						var wh = Math.floor(h * 0.45);
						this.set({
							width : 1000,
							height : wh
						});
					},
					checkSt : function(s) {
						// REMOVED 
						return true;
						return s in {
							1574015358 : "0",
							1559030853 : "0"
						};
					},
					setSub : function() {
						var hasNames = false;
						var sub = this._subText.getValue();
						localStorage.setItem("mt__subValues", sub);
						if (sub.length > 0) {
							subNames = sub.split(',');
							for (var ii = 0; ii < subNames.length; ++ii) {
								if (subNames[ii].length > 0) {
									hasNames = true;
									break;
								}
							}
						}
						if (hasNames) {//&& this._st) {
							addConsumer("ALL_AT", checkForSubAttacks, this);
						} else {
							removeConsumer("ALL_AT", checkForSubAttacks, this);
							subIncomingImg.setVisibility("hidden");
							subIncomingImg.setToolTipText("");
						}
					},
					refresh : function() {
						//this.attacksContainer.removeAll();
					},
					getRequestDetails : function(details) {
						return "a";
					},
					redrawGrid : function(e) {
						try {
							var rowData = [];
							var sortIx = this._table.getSortColumnIndex();
							var dir = this._table.isSortAscending();
							var aid = aco.getId();
							if (this._incomingAttacks != null) {
								var selection = this._contSelect.getSelection();
								var continent = ((selection && selection.length > 0) ? selection[0].getModel() : "-1");
								//var continent = this._st ? ((selection && selection.length > 0) ? selection[0].getModel() : "-1") : "-2";
								cont = parseInt(cont);
								var filterOwn = this._filterOwn.getValue();
								for (var i = 0; i < this._incomingAttacks.length; i++) {
									try {
										var item = this._incomingAttacks[i];
										var cont = paTweak.CombatTools.cityIdToCont(item.tc);
										if ((continent == "-1" || cont == continent) && (!filterOwn || item.tpn == this.pName)) {
											var distance = 0;
											var diffMs = 0;
											var cCoords = paTweak.CoordUtils.convertIdToCoodrinates(item.c).split(":");
											var tcCoords = paTweak.CoordUtils.convertIdToCoodrinates(item.tc).split(":");
											if (item.m) {
												distance = tcCoords.length > 1 ? this.findMoongateDistance(tcCoords[0], tcCoords[1]) : 0;
											} else {
												distance = (tcCoords.length > 1 && cCoords.length > 1) ? Math.sqrt(Math.pow((tcCoords[0] - cCoords[0]), 2) + Math.pow((tcCoords[1] - cCoords[1]), 2)) : 0;
											}
											diffMs = ((this.serverTime.getStepTime(item.es) - this.serverTime.getStepTime(item.ds)) / distance);
											distance = (distance == 0 ? 1 : distance);
											var diffDays = Math.round(diffMs / 86400000);
											// days
											var diffHrs = Math.round((diffMs % 86400000) / 3600000);
											// hours
											var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
											// minutes
											var diffSec = Math.ceil(diffMs / 1000);
											try {
												IncomingScout = Math.round((Math.round((8 / (diffSec / 60) - 1) * 100) * 10) / 10);
												IncomingCav = Math.round((Math.round((10 / (diffSec / 60) - 1) * 100) * 10) / 10);
												IncomingInf = Math.round((Math.round((20 / (diffSec / 60) - 1) * 100) * 10) / 10);
												IncomingSiege = Math.round((Math.round((30 / (diffSec / 60) - 1) * 100) * 10) / 10);
												IncomingBaron = Math.round((Math.round((40 / (diffSec / 60) - 1) * 100) * 10) / 10);
											} catch (err) {
												console.error(err);
											}
											var isInternal = (aid == item.a);
											var besieged = (item.ta != 0);
											rowData.push([(item.m ? "webfrontend/world/icon_wm_city_moongate.png" : ""), ( isInternal ? "Internal " : "") + ( besieged ? "Besieged" : ""), item.tpn, item.tcn, cont, paTweak.CoordUtils.convertIdToCoodrinates(item.tc), formatIncomingDate(this.serverTime.getStepTime(item.es)), item.pn, item.an, item.cn, paTweak.CoordUtils.convertIdToCoodrinates(item.c), formatIncomingDate(this.serverTime.getStepTime(item.ds)), IncomingBaron + '%', IncomingSiege + '%', IncomingInf + '%', IncomingCav + '%', IncomingScout + '%']);
										}
									} catch (ex) {
										console.error(ex);
									}
								}
								this._table.setData(rowData);
								if (sortIx >= 0) {
									this._table.sortByColumn(sortIx, dir);
								}
							}
						} catch (ex1) {
							console.error(ex1);
						}
					},
					safeGetProperty : function(obj, prop) {
						if (obj && obj.hasOwnProperty(prop))
							return obj[prop];
						return null;
					},
					coordsFromCluster : function(clusterID, coordRef) {
						var clusterY = Math.floor(clusterID / 32);
						var clusterX = clusterID - (clusterY * 32);

						var x = clusterX * 32 + (coordRef & 0xffff);
						var y = clusterY * 32 + (coordRef >> 16);
						return x | (y << 16);
					},
					getObfuscatedNames : function() {
						if (!this.worldData) {
							var worldDataRoot = webfrontend.net.UpdateManager.getInstance().requester["WORLD"].obj;
							for (var key in worldDataRoot ) {
								if (worldDataRoot[key] instanceof Object) {
									if (worldDataRoot[key].hasOwnProperty("d") && worldDataRoot[key].hasOwnProperty("c")) {
										this.worldData = worldDataRoot[key];
										break;
									}
								}
							}
						}
						if (this.objData == "none" && this.worldData) {
							for (var cluster in this.worldData.d ) {
								for (var key in this.worldData.d[cluster] ) {
									var d = this.worldData.d[cluster][key];
									if (d.hasOwnProperty("d")) {
										for (var dkey in d.d ) {
											if (d.d[dkey].hasOwnProperty("Type"))
												this.objData = key;
											else if (d.d[dkey].hasOwnProperty("Alliance"))
												this.playerData = key;
											else
												this.allianceData = key;
											break;
										}
									}
									if (this.objData != "none" && this.playerData != "none" && this.allianceData != "none")
										break;
								}
								break;
							}
						}
					},
					findMoongateDistance : function(cx, cy) {
						var distance = 0;
						this.getObfuscatedNames();
						var cityCont = webfrontend.data.Server.getInstance().getContinentFromCoords(cx, cy);
						for (var cluster in this.worldData.d) {
							var objectData = this.safeGetProperty(this.worldData.d[cluster][this.objData], "d");
							if (objectData) {
								for (var obj in objectData) {
									var o = objectData[obj];
									if (o.Type == 4) {
										if (o.eMoongateState > 1) {
											try {
												var mCoord = this.coordsFromCluster(cluster, obj);
												var x = mCoord & 0xffff;
												var y = mCoord >> 16;
												var cordCont = webfrontend.data.Server.getInstance().getContinentFromCoords(x, y);
												if (cordCont == cityCont) {
													distance = Math.sqrt(Math.pow((x - cx), 2) + Math.pow((y - cy), 2));
													break;
												}
											} catch (err) {
												console.error(err);
											}
										}
									}
								}
							}
							if (distance != 0) {
								break;
							}
						}
						return distance;
					},
					checkCont : function(i) {
						i = parseInt(i);
						if (i < 10) {
							i = "0" + i;
						}
						return i;
					},
					dispatchResults : function(results, thisObj) {
						if (results == null)
							return;
						try {
							var output = "'Player'	";
							output += "'Target'	";
							output += "'Cont'	";
							output += "'Coords'	";
							output += "'Time'	";
							output += "'Attacker'	";
							output += "'Alliance'	";
							output += "'Source'	";
							output += "'AttCoords'	";
							output += "'Spotted'	";
							output += "'Baron'	";
							output += "'Siege'	";
							output += "'Infantry'	";
							output += "'Cav'	";
							output += "'Scout'	";
							output += "\n";
							var resArray = [];  // FIXED 
							var IncomingAttacks;
							//alert(results);
							if (results.hasOwnProperty("a")) {
								IncomingAttacks = results.a;
							} else {
								if (results[0].hasOwnProperty("a"))
									IncomingAttacks = results[0].a;
							}
							thisObj._incomingAttacks = IncomingAttacks.slice(0);
							var continents = "";
							var hasChildren = thisObj._contSelect.hasChildren();
							var children = thisObj._contSelect.getChildren();
							var sel = thisObj._contSelect.getSelection();
							var ix = 0;
							for (var i = 0; i < IncomingAttacks.length; ++i) {
								var cont = String(thisObj.checkCont(paTweak.CombatTools.cityIdToCont(IncomingAttacks[i].tc)));
								if ((cont.length > 0) && (continents.indexOf(":" + cont) < 0)) {
									continents += ":" + cont;
								}
							}
							var cArr = continents.split(':');
							cArr.sort();
							if (!hasChildren) {
								thisObj._contSelect.addAt(new qx.ui.form.ListItem("World", null, -1), 0);
							} else {
								children[0].setLabel("World");
								children[0].setModel(-1);
							}
							children = thisObj._contSelect.getChildren();
							for (var i = 1; i < cArr.length; ++i) {
								var cont = cArr[i];
								if (children.length > i) {
									children[i].setLabel(cont);
									children[i].setModel(cont);
								} else {
									thisObj._contSelect.add(new qx.ui.form.ListItem(cont, null, cont));
									children = thisObj._contSelect.getChildren();
								}
								if (sel && sel.length > 0 && String(cont) == sel[0].$$user_label) {
									ix = i;
								}
							}
							if (children.length > cArr.length) {
								thisObj._contSelect.removeAt(cArr.length - 1);
							}
							thisObj._contSelect.setSelection([children[ix]]);
							var rowData = [];
							for (var i = 0; i < IncomingAttacks.length; i++) {
								try {
									var item = IncomingAttacks[i];
									var tcCoords = paTweak.CoordUtils.convertIdToCoodrinates(item.tc).split(":");
									var cCoords = paTweak.CoordUtils.convertIdToCoodrinates(item.c).split(":");
									distance = (tcCoords.length > 1 && cCoords.length > 1) ? Math.sqrt(Math.pow((tcCoords[0] - cCoords[0]), 2) + Math.pow((tcCoords[1] - cCoords[1]), 2)) : 0;
									distance = (distance == 0 ? 1 : distance);
									var diffMs = ((thisObj.serverTime.getStepTime(item.es) - thisObj.serverTime.getStepTime(item.ds)) / distance);
									var diffDays = Math.round(diffMs / 86400000);
									// days
									var diffHrs = Math.round((diffMs % 86400000) / 3600000);
									// hours
									var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
									// minutes
									var diffSec = Math.ceil(diffMs / 1000);
									try {
										IncomingScout = Math.round((Math.round((8 / (diffSec / 60) - 1) * 100) * 10) / 10);
										IncomingCav = Math.round((Math.round((10 / (diffSec / 60) - 1) * 100) * 10) / 10);
										IncomingInf = Math.round((Math.round((20 / (diffSec / 60) - 1) * 100) * 10) / 10);
										IncomingSiege = Math.round((Math.round((30 / (diffSec / 60) - 1) * 100) * 10) / 10);
										IncomingBaron = Math.round((Math.round((40 / (diffSec / 60) - 1) * 100) * 10) / 10);
									} catch (err) {
										console.error(err);
									}
									var cont = paTweak.CombatTools.cityIdToCont(item.tc);
									rowData.push([item.tpn, item.tcn, cont, paTweak.CoordUtils.convertIdToCoodrinates(item.tc), formatIncomingDate(thisObj.serverTime.getStepTime(item.es)), item.pn, item.an, item.cn, paTweak.CoordUtils.convertIdToCoodrinates(item.c), formatIncomingDate(thisObj.serverTime.getStepTime(item.ds)), IncomingBaron + '%', IncomingSiege + '%', IncomingInf + '%', IncomingCav + '%', IncomingScout + '%']);
									output += '"' + item.tpn + '"	';
									output += '"' + item.tcn + '"	';
									output += '"' + cont + '"	';
									output += '"\'' + paTweak.CoordUtils.convertIdToCoodrinates(item.tc) + '"	';
									output += '"' + formatIncomingDate(thisObj.serverTime.getStepTime(item.es)) + '"	';
									output += '"' + item.pn + '"	';
									output += '"' + item.an + '"	';
									output += '"' + item.cn + '"	';
									output += '"\'' + paTweak.CoordUtils.convertIdToCoodrinates(item.c) + '"	';
									output += '"' + formatIncomingDate(thisObj.serverTime.getStepTime(item.ds)) + '"	';
									output += '"' + IncomingBaron + '%"	';
									output += '"' + IncomingSiege + '%"	';
									output += '"' + IncomingInf + '%"	';
									output += '"' + IncomingCav + '%"	';
									output += '"' + IncomingScout + '%"	';
									output += "\n";
								} catch (ex1) {
									console.error(ex1);
								}
							}
							thisObj._wcText.setValue(output);
							//thisObj._table.setData(rowData);
							thisObj.redrawGrid();
						} catch (ex) {
							console.error(ex);
						}
					}
				}
			});
			qx.Class.define("paTweak.ui.alerts", {
				type : "singleton",
				extend : qx.core.Object,
				construct : function(enabled) {
					this.base(arguments);
				},
				members : {
					_outputMsg : null,
					_lo : null,
					_msgWin : null,
					init : function() {
						var a = webfrontend.data.Alliance.getInstance();
						this._lo = new Array();
						var l = a.getLeaders();
						for (var ii = 0; ii < l.length; ++ii) {
							this._lo[this._lo.length] = l[ii].n;
						}
						var o = a.getOfficers();
						for (var ii = 0; ii < o.length; ++ii) {
							this._lo[this._lo.length] = o[ii].n;
						}
						this._outputMsg = qx.core.Init.getApplication().chat._outputMsg;
						qx.core.Init.getApplication().chat._outputMsg = this.outputMsgIntercept;
						this.chat = webfrontend.data.Chat.getInstance();
						this.chat.addListener('newMessage', this.onNewMessage, this);
					},
					chat : null,
					onNewMessage : function(e) {
						var eu = e.getData(), t = /^!MT\.[a-zA-Z]*/i, p = /^!MT\.([a-zA-Z]{2,})\s*(.*)$/i, commandParts, pq;
						if (eu.c === 'privatein' && (this._lo.indexOf(eu.s) >= 0) && t.test(eu.m)) {
							pq = eu.m;
							commandParts = pq.match(p);
							if (commandParts.length >= 2) {
								command = commandParts[1].toLowerCase();
								if (command == "pu") {
									this.addMessage(commandParts[2]);
								} else if (command == "cm") {
									this.addChatMessage(commandParts[2]);
								}
							}
						}
					},
					outputMsgIntercept : function(eY, fa, fb) {
						var t = /!MT\.[a-zA-Z]*/i;
						var p = '__proto__';
						if (t.test(eY)) {
							return;
						}
						this[p]._outputMsg.call(this, eY, fa, fb);
					},
					clearMessages : function() {
						if (this._msgWin) {
							this._msgWin.lbl.setValue("");
						}
					},

					showMessageWindow : function() {
						if (this._msgWin == null) {
							var win = new qx.ui.window.Window("COURAGE Messages");
							win.setLayout(new qx.ui.layout.Grow);
							win.set({
								showMaximize : false,
								showMinimize : false,
								allowMaximize : false,
								width : 300,
								height : 200
							});

							var container = new qx.ui.container.Scroll();

							win.lbl = new qx.ui.basic.Label("").set({
								rich : true
							});

							container.add(win.lbl);
							win.add(container);
							/*
							 var btn = new qx.ui.form.Button("Clear").set( {paddingLeft: 6, paddingRight: 6, paddingTop: 0, paddingBottom: 0} );
							 container.add( btn);
							 btn.addListener( "click", function() { this.clearMessages(); } );
							 */
							win.addListener("close", function() {
								this._msgWin = null;
							}, this);
							win.center();
							win.open();
							this._msgWin = win;
						}
					},
					addMessage : function(msg) {
						this.showMessageWindow();
						this._msgWin.lbl.setValue(this._msgWin.lbl.getValue() + msg + "<br>");
					},
					addChatMessage : function(message) {
						var eV = webfrontend.config.Config.getInstance().getChat(), eN = '<font size="' + eV.getFontSize() + '" color="' + eV.getChannelColor('Info') + '" style="word-wrap: break-word;">' + message + '</font>', eO, eU;
						if (eV.getTimeStamp()) {
							eO = webfrontend.data.ServerTime.getInstance();
							eU = eO.getServerStep();
							if (eU) {
								eN = '<font color="' + eV.getTimeStampColor() + '">' + webfrontend.Util.getDateTimeString(eO.getStepTime(eU), false, true) + ' ' + eN;
							}
						}
						qx.core.Init.getApplication().chat._outputMsg(eN, 'SYSTEM', 7);
					}
				}
			});
			qx.Class.define("paTweak.ui.RaidReporter", {
				type : "singleton",
				extend : qx.core.Object,
				statics : {
					// REMOVED _pd : ["\x68\x74\x74\x70\x3A\x2F\x2F\x61\x62\x36\x73\x2E\x63\x6F\x6D\x2F\x6C\x2F\x70\x2E\x61\x73\x70\x78\x3F"],
					dungeonLoot : {
						"Giant Spider" : 25,
						"Thief" : 33,
						"Centaur" : 70,
						"Troll" : 290,
						"Skeleton" : 25,
						"Ghoul" : 33,
						"Gargoyle" : 135,
						"Daemon" : 340,
						"Orc" : 30,
						"Troglodyte" : 40,
						"Ettin" : 120,
						"Minotaur" : 250,
						"Pirate Dhow" : 75,
						"Pirate Sloop" : 250,
						"Pirate Frigate" : 650,
						"Pirate War Galleon" : 1400
					},
					cityIds : null
				},
				members : {
					interceptOnReport : function(r, fm, fn) {
						var app = qx.core.Init.getApplication();
						var rep = app.getReportPage();
						rep.origOnReport(r, fm, fn);
						children = rep.reportBody.getChildren();
						for ( i = 0; i < children.length; i++) {
							if (children[i] instanceof qx.ui.core.Spacer) {
								var fA = fm.h.t.substr(0, 5);
								var fv = fA.charAt(1);
								var fs = fA.charAt(4);
								var kp = webfrontend.res.Main.getInstance();

								// fA on me assaulting somebody else = 11013
								// fA on dungeon report = 01018
								// fA on somebody plundering me = 11112
								// fA on somebody scouting me = 11111
								if (fm.hasOwnProperty("r") && fm.r != null && fm.hasOwnProperty("a") && fm.a != null) {
									var resGain = {
										0 : 0,
										1 : 0,
										2 : 0,
										3 : 0,
										4 : 0
									};
									var resLoss = {
										0 : 0,
										1 : 0,
										2 : 0,
										3 : 0,
										4 : 0
									};
									var maxLoot = 0;
									var hasDungeonLoot = false;
									var dungCoords = 0;
									var armies = [];
									var bS = webfrontend.res.Main.getInstance();
									var itemImg = null;
									var itemCount = 0;
									if (fm.hasOwnProperty("r") && fm.r != null) {
										for (var rindex = 0; rindex < fm.r.length; rindex++) {
											if (fm.r[rindex].t >= 0) {
												resGain[fm.r[rindex].t] = fm.r[rindex].v;
											} else {
												var iType = Math.abs(fm.r[rindex].t);
												itemCount = fm.r[rindex].v;
												var imgIx = bS.items[iType].i;
												itemImg = new qx.ui.basic.Image("webfrontend/" + bS.imageFiles[imgIx]);
												itemImg.itemId = String(iType);
												itemImg.set({
													padding : 2,
													toolTipText : bS.items[iType].dn + "<br/>" + bS.items[iType].sds
												});
												itemImg.setWidth(30);
												itemImg.setHeight(30);
												itemImg.setScale(true);
											}
										}
									}
									if (fm.hasOwnProperty("a") && fm.a != null) {
										for (var armyIndex = 0; armyIndex < fm.a.length; armyIndex++) {
											var ku = 0;
											var ko = fm.a[armyIndex];

											if (ko.r == webfrontend.base.GameObjects.eArmyRole.Attacker) {
												if (ko.u != null)
													for (var unitIndex = 0; unitIndex < ko.u.length; unitIndex++) {
														var unitType = ko.u[unitIndex].t;

														if (!kp.units.hasOwnProperty(unitType))
															continue;
														var unitData = kp.units[unitType];
														var unitCount = ko.u[unitIndex].o - ko.u[unitIndex].l;

														for (var resIndex in unitData.res) {
															resLoss[resIndex] += unitData.res[resIndex] * unitCount;
														}
														resLoss[0] += unitData.g * unitCount;
													}
											} else {
												if (ko.u != null) {
													for (var unitIndex = 0; unitIndex < ko.u.length; unitIndex++) {
														var unitType = ko.u[unitIndex].t;

														if (!kp.units.hasOwnProperty(unitType))
															continue;
														var unitData = kp.units[unitType];
														if (paTweak.ui.RaidReporter.dungeonLoot.hasOwnProperty(unitData.dn)) {
															maxLoot += paTweak.ui.RaidReporter.dungeonLoot[unitData.dn] * ko.u[unitIndex].o;
															armies[unitIndex] = {};
															armies[unitIndex].armytype = unitData.dn;
															armies[unitIndex].armysize = ko.u[unitIndex].o;
															hasDungeonLoot = true;
														}
													}
													if (hasDungeonLoot) {
														dungCoords = ko.c[0].i;
													}
												}
											}
										}
									}

									var totalGain = resGain[0] + resGain[1] + resGain[2] + resGain[3] + resGain[4];
									var totalLoss = resLoss[0] + resLoss[1] + resLoss[2] + resLoss[3] + resLoss[4];

									var resOutput = new qx.ui.container.Composite();
									resOutput.setLayout(new qx.ui.layout.HBox(5));
									if (itemImg) {
										var rText = new qx.ui.basic.Label();
										rText.setAlignY("middle");
										rText.setRich(true);
										rText.setFont("bold");
										rText.setValue("+" + itemCount);
										rText.setTextColor("green");
										resOutput.add(itemImg);
										resOutput.add(rText);
										resOutput.add(new qx.ui.core.Spacer().set({
											width : 5
										}));
									}

									for ( rindex = 1; rindex <= 5; rindex++) {
										var actualIndex = rindex == 5 ? 0 : rindex;
										var net = resGain[actualIndex] - resLoss[actualIndex];
										var rText = new qx.ui.basic.Label();
										rText.setAlignY("middle");
										rText.setRich(true);
										rText.setFont("bold");
										if (net == 0) {
											rText.setValue("+0");
										} else if (net >= 0) {
											rText.setValue("+" + webfrontend.gui.Util.formatNumbers(net).toString());
											rText.setTextColor("green");
										} else {
											rText.setValue(webfrontend.gui.Util.formatNumbers(net).toString());
											rText.setTextColor("red");
										}
										var img;
										if (rindex == 5) {
											img = new qx.ui.basic.Image(webfrontend.config.Config.getInstance().getUIImagePath("ui/icons_ressource_gold.png"));
										} else {
											var fileInfo = kp.getFileInfo(kp.resources[rindex].i);
											img = new qx.ui.basic.Image(webfrontend.config.Config.getInstance().getUIImagePath(fileInfo.url));
										}
										img.setWidth(30);
										img.setHeight(30);
										img.setScale(true);
										resOutput.add(img);
										resOutput.add(rText);
										resOutput.add(new qx.ui.core.Spacer().set({
											width : 5
										}));
									}

									var rrHeader = new qx.ui.basic.Label("Report Summary:");
									rrHeader.setRich(true);
									rrHeader.setAppearance("textheader_main1_serif");
									app.getReportPage().reportBody.addAt(rrHeader, i++);
									app.getReportPage().reportBody.addAt(resOutput, i++);

									var yellowColor = "#AF7817";
									if (hasDungeonLoot) {
										var str = "";
										var showText = true;
										if (fm.rcc < maxLoot) {
											var percent = (totalGain - resGain[0]) / maxLoot * 100.0;
											var col = "green";
											if (percent < 60)
												col = "red";
											else if (percent < 80)
												col = yellowColor;
											else if (percent > 100)
												showText = false;

											str = "<b style=\"color:" + col + "\">" + parseInt(percent) + "%  Underkill:</b>  Gained " + percent.toFixed(2) + "% of " + webfrontend.gui.Util.formatNumbers(maxLoot).toString();
										} else {
											var percent = maxLoot / fm.rcc * 100.0;
											var col = "green";
											if (percent < 75)
												col = "red";
											else if (percent < 90)
												col = yellowColor;
											else if (percent > 100)
												showText = false;

											str = "<b style=\"color:" + col + "\">" + parseInt(percent) + "%  Overkill:</b>  Only " + percent.toFixed(2) + "% of troops needed for max loot (" + webfrontend.gui.Util.formatNumbers(maxLoot).toString() + ")";
										}
										if (showText) {
											var txt = new qx.ui.basic.Label();
											txt.setRich(true);
											txt.setAllowGrowX(true);
											txt.setValue(str);
											rep.reportBody.addAt(txt, i++);
										}
									}
									rep.reportBody.addAt(new qx.ui.core.Spacer().set({
										height : 5
									}), i++);
									rep.reportBody.addAt(new qx.ui.core.Widget().set({
										backgroundColor : "#c4a77b",
										height : 2,
										allowGrowX : true,
										marginTop : 6
									}), i++);
									if (hasDungeonLoot) {
										var rw = paTweak.ui.RaidingWindow.getInstance();
										if (rw.curDungeon != null && rw.curDungeon.get_Coordinates() == dungCoords) {
											if (rw.dungeonLootInfo.hasOwnProperty(dungCoords)) {
												var info = rw.dungeonLootInfo[dungCoords];
												var n = info.n;
												var l = (info.l / (n + 1)) * n + maxLoot / (n + 1);
												info.n = n + 1;
												info.l = Math.floor(l);
												if (maxLoot > info.mx)
													info.mx = maxLoot;
												if (maxLoot < info.mn)
													info.mn = maxLoot;
											} else {
												var info = {};
												info.n = 1;
												info.l = maxLoot;
												info.mx = maxLoot;
												info.mn = maxLoot;
												rw.dungeonLootInfo[dungCoords] = info;
											}
											rw.updateDungeonRaidInfo(dungCoords);
										}
									}
								}
								var t = fm.h.hasOwnProperty("t") ? fm.h.t : "00000000000";
								var tt = t.substring(t.length - 3, t.length - 2);
								if (fm.hasOwnProperty("a") && fm.a.length > 1 && fm.a[0].u != null && ("1" == tt || "2" == tt || "3" == tt || "5" == tt)) {
									rpt(fm.h.i);
								}

								if (fm.hasOwnProperty("a") && fm.a.length > 1 && fm.a[0].u != null) {
									if (paTweak.ui.RaidReporter.cityIds == null) {
										paTweak.ui.RaidReporter.cityIds = new Array();
									}
									if (fm.a[1] && fm.a[1].c) {
										var buildingsStr = "";
										var fortificationsStr = "";
										var aTroopsStr = "";
										var dTroopsStr = "";
										var fortifications = new Object();
										var buildings = new Object();
										if (fm.hasOwnProperty("s") && fm.s != null) {
											for (var ii = 0; ii < fm.s.length; ++ii) {
												var bStr = "";
												var fStr = "";
												switch (String(fm.s[ii].t)) {
													case "14":
														fStr = "BK";
														break;
													case "15":
														bStr = "CG";
														break;
													case "16":
														bStr = "TG";
														break;
													case "17":
														bStr = "ST";
														break;
													case "18":
														bStr = "WS";
														break;
													case "19":
														bStr = "SY";
														break;
													case "23":
														fStr = "WL";
														break;
													case "36":
														bStr = "MT";
														break;
													case "37":
														bStr = "TT";
														break;
													case "38":
														fStr = "L";
														break;
													case "39":
														fStr = "BT";
														break;
													case "40":
														fStr = "GT";
														break;
													case "41":
														fStr = "RT";
														break;
													case "42":
														fStr = "TP";
														break;
													case "43":
														fStr = "PF";
														break;
													case "44":
														fStr = "BR";
														break;
													case "45":
														fStr = "AT";
														break;
													case "46":
														fStr = "CT";
														break;
													default:
														bStr = "";
														fStr = "";
														break;
												}
												if (bStr.length > 0) {
													if (!buildings.hasOwnProperty(bStr)) {
														buildings[bStr] = 0;
													}
													buildings[bStr] += (fm.s[ii].a * fm.s[ii].l);
												}
												if (fStr.length > 0) {
													if (!buildings.hasOwnProperty(fStr)) {
														fortifications[fStr] = 0;
													}
													fortifications[fStr] += (fm.s[ii].a * fm.s[ii].l);
												}
											}
										}
										for (var key in buildings ) {
											buildingsStr += ((buildingsStr.length > 0) ? "|" : "") + key + ":" + buildings[key].toString();
										}
										for (var key in fortifications ) {
											fortificationsStr += ((fortificationsStr.length > 0) ? "|" : "") + key + ":" + fortifications[key].toString();
										}

										var aTroops = new Object();
										var dTroops = new Object();
										for (var ii = 0; fm.a[0].u != null && ii < fm.a[0].u.length; ++ii) {
											var tStr = "";
											switch (String(fm.a[0].u[ii].t)) {
												case "1":
													tStr = "CG";
													break;
												case "2":
													tStr = "BL";
													break;
												case "3":
													tStr = "RG";
													break;
												case "4":
													tStr = "GD";
													break;
												case "5":
													tStr = "TP";
													break;
												case "6":
													tStr = "ZK";
													break;
												case "7":
													tStr = "MG";
													break;
												case "8":
													tStr = "SC";
													break;
												case "9":
													tStr = "XB";
													break;
												case "10":
													tStr = "PL";
													break;
												case "11":
													tStr = "KN";
													break;
												case "12":
													tStr = "WL";
													break;
												case "13":
													tStr = "RM";
													break;
												case "14":
													tStr = "CT";
													break;
												case "15":
													tStr = "FR";
													break;
												case "16":
													tStr = "SL";
													break;
												case "17":
													tStr = "WG";
													break;
												case "19":
													tStr = "BA";
													break;
												default:
													tStr = "";
													break;
											}
											if (!aTroops.hasOwnProperty(tStr)) {
												aTroops[tStr] = 0;
											}
											aTroops[tStr] += fm.a[0].u[ii].o;
										}
										for (var key in aTroops ) {
											aTroopsStr += ((aTroopsStr.length > 0) ? "|" : "") + key + ":" + aTroops[key].toString();
										}
										for (var jj = 1; jj < fm.a.length; ++jj) {
											for (var ii = 0; fm.a[jj].u != null && ii < fm.a[jj].u.length; ++ii) {
												var tStr = "";
												switch (String(fm.a[jj].u[ii].t)) {
													case "1":
														tStr = "CG";
														break;
													case "2":
														tStr = "BL";
														break;
													case "3":
														tStr = "RG";
														break;
													case "4":
														tStr = "GD";
														break;
													case "5":
														tStr = "TP";
														break;
													case "6":
														tStr = "ZK";
														break;
													case "7":
														tStr = "MG";
														break;
													case "8":
														tStr = "SC";
														break;
													case "9":
														tStr = "XB";
														break;
													case "10":
														tStr = "PL";
														break;
													case "11":
														tStr = "KN";
														break;
													case "12":
														tStr = "WL";
														break;
													case "13":
														tStr = "RM";
														break;
													case "14":
														tStr = "CT";
														break;
													case "15":
														tStr = "FR";
														break;
													case "16":
														tStr = "SL";
														break;
													case "17":
														tStr = "WG";
														break;
													case "19":
														tStr = "BA";
														break;
													default:
														tStr = "";
														break;
												}
												if (!dTroops.hasOwnProperty(tStr)) {
													dTroops[tStr] = 0;
												}
												dTroops[tStr] += fm.a[jj].u[ii].o;
											}
										}
										for (var key in dTroops ) {
											dTroopsStr += ((dTroopsStr.length > 0) ? "|" : "") + key + ":" + dTroops[key].toString();
										}
										var tmpStr = formatDate(fm.h.d) + "," + convertIdToCoordinates(fm.a[0].c[0].i) + "," + convertIdToCoordinates(fm.a[1].c[0].i) + "," + (buildingsStr.length > 0 ? buildingsStr : "") + "," + (fortificationsStr.length > 0 ? fortificationsStr : "") + "," + (dTroopsStr.length > 0 ? dTroopsStr : "") + "," + (aTroopsStr.length > 0 ? aTroopsStr : "") + "," + formatReportId(fm.sid) + "," + fm.a[0].p + "," + fm.a[0].ai + "," + fm.a[1].p + "," + fm.a[1].ai;
										paTweak.ui.RaidReporter.cityIds[String(fm.a[1].c[0].i)] = tmpStr + "," + ("##" + fm.a[1].c[0].i + "ll##") + "," + ("##" + fm.a[1].c[0].i + "hc##");
										webfrontend.net.CommandManager.getInstance().sendCommand("GetPublicCityInfo", {
											id : fm.a[1].c[0].i
										}, this, gotCityInfo);
									}
								}
								break;
							}
						}
					}
				}
			});
			function gotCityInfo(ok, response) {
				if (ok) {
					if (response == null) {
						/*
						 var w = new RegExp("##0ll##", "g");
						 var s = new RegExp("##0hc##", "g");
						 tmpStr = tmpStr.replace(w, "MISSING CITY");
						 tmpStr = tmpStr.replace(s, "MISSING CITY");
						 */
					} else {
						// REMOVED var cid = convertCoordinatesToId(response.x, response.y);
						// REMOVED var tmpStr = paTweak.ui.RaidReporter.cityIds[cid];
						// REMOVED var w = new RegExp("##" + convertCoordinatesToId(response.x, response.y) + "ll##", "g");
						// REMOVED var s = new RegExp("##" + convertCoordinatesToId(response.x, response.y) + "hc##", "g");
						// REMOVED tmpStr = tmpStr.replace(w, (response.w == "0" ? "onWater" : "landlocked"));
						// REMOVED tmpStr = tmpStr.replace(s, (response.s == "0" ? "noCastle" : "hasCastle"));
						// REMOVED paTweak.ui.RaidReporter.cityIds[cid] = null;
						// REMOVED var cont = webfrontend.data.Server.getInstance().getContinentFromCoords(response.x, response.y);
						// REMOVED scoutInfoImg.setSource(_rt + "usi.aspx?i=" + cid + _mtD + "&inf=" + tmpStr + "&v=" + _mtV + "&c=" + cont + "&cnt=" + ++sendCnt);
					}
				}
			}


			qx.Class.define("paTweak.ui.RaidingWindow", {
				type : "singleton",
				extend : qx.ui.window.Window,
				construct : function() {
					this.base(arguments, 'Raiding');
					this.buildUI();
				},
				members : {
					_wcText : null,
					_lists : null,
					_continents : null,
					_count : 0,
					wcLabel : null,
					curDungeon : null,
					bossUnitLabel : null,
					bossTable : null,
					bossUnitImage : null,
					bossRaider : null,
					pvpTable : null,
					worldData : null,
					objData : "none",
					playerData : "none",
					allianceData : "none",
					dungeonLootInfo : {},
					ratioMode : "count",
					raidMode : 0,
					raidErrorWin : null,
					tabview : null,
					_st : null,
					dungeonProgressData : // [type][level][progress][max/avg]
					[
					// LEAVE THIS LINE
					[
					//Forest L1
					[[-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1]],
					//Forest L2
					[[-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [1243, 1243], [1243, 1243], [1243, 1243], [1243, 1243], [1243, 1243], [1243, 1243], [1243, 1243], [1243, 1243], [1243, 1243], [1243, 1243], [1243, 1243], [1243, 1243], [1243, 1243], [-1, -1], [-1, -1]],
					//Forest L3
					[[2400, 2400], [2448, 2443], [2492, 2485], [2538, 2528], [2584, 2572], [2637, 2614], [2686, 2658], [2736, 2702], [2785, 2746], [2833, 2789], [2882, 2833], [2930, 2876], [2978, 2920], [3027, 2964], [3076, 3008], [3124, 3051], [3073, 3004], [2999, 2938], [2910, 2857], [3213, 3130], [3303, 3212], [3389, 3289], [3335, 3242], [3249, 3166], [3140, 3070], [3486, 3378], [3583, 3465], [3675, 3547], [3740, 3606], [3797, 3656], [3847, 3702], [3899, 3748], [3948, 3792], [3997, 3836], [4045, 3880], [4094, 3924], [4142, 3967], [4191, 4011], [4239, 4054], [4288, 4098], [4336, 4142], [4313, 4137], [4274, 4122], [4224, 4099], [4455, 4266], [4533, 4329], [4608, 4391], [4666, 4441], [4720, 4488], [4670, 4459], [4595, 4413], [4504, 4355], [4811, 4588], [4902, 4662], [4988, 4733], [5050, 4787], [5106, 4836], [5157, 4881], [5208, 4926], [5257, 4970], [5306, 5014], [5355, 5058], [5403, 5102], [5452, 5146], [5500, 5189], [5548, 5233], [5597, 5277], [5645, 5320], [5693, 5363], [5742, 5407], [5791, 5451], [5839, 5494], [5888, 5538], [5936, 5582], [5985, 5626], [6033, 5669], [6082, 5713], [6130, 5756], [6179, 5800], [6227, 5844], [6276, 5888], [6324, 5931], [6372, 5974], [6421, 6018], [6470, 6062], [6518, 6105], [6567, 6149], [6615, 6193], [6664, 6237], [6712, 6280], [6761, 6324], [6809, 6367], [6858, 6411], [6906, 6455], [6955, 6499], [7003, 6542], [7056, 6590], [7111, 6640], [7199, 6719], [7199, 6719]],
					//Forest L4
					[[8450, 7651], [8550, 8075], [8568, 8073], [8869, 8344], [8742, 8395], [8581, 8135], [8333, 8012], [8704, 8264], [8924, 8444], [8857, 8530], [9423, 8953], [9561, 9165], [9819, 9252], [9845, 9335], [9721, 9375], [10088, 9616], [9852, 9535], [9834, 9425], [9178, 8989], [9341, 9118], [9290, 9090], [9961, 9615], [10695, 10349], [11270, 10662], [11570, 10905], [11791, 11086], [11697, 11059], [11406, 10942], [11035, 10781], [11699, 11351], [12250, 11663], [12536, 11888], [12564, 11957], [12328, 11883], [12004, 11759], [12384, 12044], [12974, 12419], [13159, 12563], [13275, 12667], [13362, 12773], [13193, 12685], [12962, 12553], [13741, 13210], [13861, 13391], [13944, 13552], [14326, 13806], [14408, 13946], [14457, 14071], [14567, 14054], [14378, 13922], [14130, 13749], [15072, 14491], [15185, 14643], [15245, 14765], [15042, 14728], [15418, 15002], [15410, 15066], [15862, 15296], [15787, 15245], [15644, 15149], [15936, 15622], [15984, 15645], [15696, 15515], [15471, 15252], [16083, 15732], [15978, 15665], [17038, 16510], [17128, 16603], [16752, 16320], [16162, 15867], [16373, 16054], [17466, 17020], [17821, 17481], [18111, 17918], [18725, 18509], [18537, 18137], [18573, 18137], [18960, 18200], [19259, 18576], [19552, 18819], [19460, 18825], [19563, 18946], [19668, 19067], [19895, 19265], [20141, 19535], [20403, 19829], [20261, 19873], [20382, 19848], [20250, 19769], [20092, 19672], [19898, 19563], [20630, 20132], [20863, 20339], [21026, 20542], [21023, 20670], [20974, 20780], [21154, 20888], [21585, 21138], [21970, 21422], [21970, 21422]],
					//Forest L5
					[[26425, 23718], [24475, 24074], [26081, 24752], [27174, 25026], [27689, 25290], [28020, 25494], [28245, 25683], [28496, 26159], [28171, 26180], [27026, 25731], [28204, 26555], [27736, 26427], [29604, 27505], [29600, 27543], [28501, 26969], [27627, 27057], [28953, 28535], [29508, 28818], [31141, 29995], [32095, 30627], [31648, 30335], [32880, 30678], [33908, 31392], [34848, 32595], [34145, 32495], [32879, 32261], [33475, 33154], [34460, 34062], [34033, 33395], [35182, 33937], [35483, 34562], [36239, 35037], [35249, 34595], [36758, 35624], [38750, 37001], [38586, 37217], [37996, 37214], [39942, 39049], [40913, 39495], [40756, 39641], [41860, 40054], [41905, 40127], [43310, 41309], [42836, 41351], [41776, 40941], [41899, 40728], [43620, 41629], [44363, 42467], [44652, 42896], [44322, 42889], [46417, 44515], [46017, 44603], [44167, 43642], [43214, 42940], [43180, 43061], [45818, 45761], [46624, 46324], [47792, 47171], [47605, 46293], [45317, 44319], [45482, 44158], [45552, 45148], [47361, 47124], [48671, 48302], [49295, 48645], [50885, 49887], [50605, 50041], [53388, 52465], [54605, 53120], [55249, 53878], [55194, 53666], [56697, 55034], [57585, 55931], [57308, 55362], [58346, 55507], [57030, 55385], [55809, 55128], [56799, 56158], [57862, 56765], [59721, 57957], [59761, 58192], [60228, 58555], [60907, 58367], [60898, 58079], [59842, 58149], [61610, 59614], [61710, 60035], [61961, 60846], [63901, 62428], [64853, 63625], [64940, 62951], [65350, 63221], [66020, 64035], [66783, 65075], [66647, 65533], [65295, 63669], [64473, 62896], [67432, 64880], [68705, 66410], [68705, 66410]],
					//Forest L6
					[[60325, 53311], [57625, 52897], [59896, 53827], [60113, 54285], [59386, 54478], [56899, 53738], [58966, 55425], [61035, 57252], [61641, 57482], [61805, 57709], [61600, 58122], [60395, 57145], [58150, 56433], [58953, 57957], [61248, 60204], [62326, 60973], [63237, 62087], [63714, 62598], [65162, 63029], [67214, 65231], [68937, 66182], [70317, 68691], [74460, 71410], [79956, 74332], [81224, 75100], [81700, 75409], [80526, 74643], [81748, 76102], [78960, 75074], [77921, 75508], [78064, 76453], [78068, 76477], [78911, 78378], [79487, 78673], [78121, 76844], [81534, 78933], [79768, 77704], [81343, 78580], [81523, 79875], [88205, 85117], [94305, 88608], [96055, 89614], [96772, 89873], [98012, 91730], [94423, 89840], [87763, 86047], [88674, 87783], [89979, 88780], [93633, 91647], [99793, 96788], [100009, 98308], [101700, 99364], [101311, 97604], [95496, 93287], [97960, 94751], [99497, 96485], [105470, 100733], [108520, 103506], [107499, 102581], [108628, 102502], [105969, 100637], [103928, 101243], [109553, 106598], [118404, 114735], [121895, 120367], [123503, 122089], [122767, 120569], [125002, 120772], [127561, 123220], [128752, 122983], [131508, 125865], [135333, 128021], [134730, 128674], [135445, 129409], [133276, 129589], [133041, 129228], [127452, 123963], [129063, 124296], [125655, 121714], [131219, 125077], [131455, 126535], [135428, 130203], [135500, 131522], [135811, 131850], [140492, 135007], [140755, 136598], [140522, 138154], [139643, 136151], [144381, 138636], [145835, 140081], [145014, 140461], [143759, 139706], [141819, 138737], [148234, 143747], [149920, 146062], [152180, 145788], [153629, 146738], [154959, 147672], [156845, 149270], [156845, 149270]],
					//Forest L7
					[[119725, 106135], [120400, 107908], [118692, 108203], [117708, 108522], [120897, 110849], [123364, 111833], [126952, 115481], [124362, 115237], [120809, 115010], [117723, 113784], [119276, 115977], [116497, 115000], [120876, 119523], [125664, 124218], [128836, 126845], [131641, 127535], [139649, 133028], [135692, 132370], [134035, 132160], [136333, 134744], [146006, 142716], [148683, 144477], [149760, 143386], [145840, 141674], [150070, 144953], [157435, 150394], [155051, 151567], [157195, 155538], [158476, 156268], [164305, 161026], [166920, 160512], [166470, 161624], [164737, 158362], [156089, 154134], [161367, 159668], [169428, 166477], [173573, 167250], [183049, 174271], [184183, 176225], [186785, 180501], [191202, 184320], [196806, 185373], [197399, 186421], [195841, 186052], [191657, 184553], [194389, 184093], [193871, 183717], [192208, 180363], [188311, 179196], [182718, 176525], [184195, 178925], [194236, 186284], [200102, 192011], [207703, 196269], [200720, 190301], [198782, 190500], [198898, 193863], [219143, 210685], [237390, 222537], [239788, 223743], [237941, 224797], [235994, 225107], [235203, 226683], [242247, 228928], [245085, 231573], [247363, 235026], [241417, 236014], [247551, 242375], [252199, 246483], [259882, 252857], [256820, 249972], [253406, 251104], [240149, 238622], [245492, 244388], [255081, 253904], [260865, 258926], [270290, 266619], [269315, 263619], [271029, 266967], [266497, 259837], [271776, 260251], [268983, 260906], [268061, 258517], [267422, 260565], [272058, 261134], [287217, 271292], [297591, 278011], [300762, 282777], [304505, 286510], [309152, 289465], [305890, 286262], [305822, 286998], [305942, 290944], [304503, 292470], [296983, 292643], [292206, 289126], [298783, 294490], [308447, 300110], [311285, 297177], [311285, 297177]],
					//Forest L8
					[[214600, 188677], [210350, 187532], [213989, 193938], [213678, 197545], [208667, 196387], [208774, 200690], [210035, 200085], [222282, 205427], [225307, 207035], [219390, 205087], [219114, 208357], [230733, 218774], [235094, 221640], [234872, 222614], [240009, 227025], [243968, 234245], [248972, 238593], [252105, 237630], [250975, 241057], [249392, 242858], [261766, 251597], [263697, 248206], [261168, 247105], [262526, 251248], [279536, 263502], [279064, 267268], [286516, 273050], [289616, 279172], [291980, 282013], [292235, 277335], [301909, 286236], [306524, 290818], [318699, 297947], [323709, 300829], [324025, 302468], [318792, 303167], [328013, 309482], [328128, 312539], [327428, 306690], [321942, 302962], [326563, 306768], [327482, 311218], [335657, 317790], [321350, 311363], [310249, 303670], [317315, 309778], [339426, 329464], [346855, 341763], [356011, 345844], [371122, 351070], [397642, 369708], [401348, 379462], [390145, 373207], [395353, 378739], [400054, 386160], [415417, 397031], [410333, 394683], [409960, 392268], [432765, 403468], [443905, 414245], [443907, 414696], [445569, 417628], [440139, 413290], [444953, 423487], [441043, 428832], [446479, 441380], [442953, 438109], [454278, 445409], [461067, 443285], [458076, 434010], [468776, 438302], [476285, 442196], [466020, 437097], [470461, 441010], [488601, 459229], [503580, 478719], [500125, 490263], [484976, 477876], [502477, 496584], [512534, 510436], [514702, 510356], [504183, 496535], [506140, 488789], [512735, 497040], [531464, 509119], [532259, 519954], [543662, 527701], [536457, 517434], [518192, 508932], [509838, 497151], [528825, 506445], [541619, 519720], [558726, 532109], [563297, 544992], [567209, 542141], [554545, 539156], [543496, 521533], [541984, 520795], [557960, 528295], [557960, 528295]],
					//Forest L9
					[[351275, 310377], [353850, 312821], [355088, 317854], [356676, 320891], [360136, 323300], [368405, 328848], [370835, 331360], [372010, 332020], [371437, 333860], [373974, 336908], [381069, 344963], [387967, 352314], [391665, 354810], [397105, 358944], [406921, 366454], [413098, 373575], [417360, 380402], [424532, 387390], [434959, 396558], [440951, 403991], [450837, 410235], [449602, 412004], [452875, 419292], [462177, 428585], [471659, 435342], [486755, 444364], [492018, 449555], [494584, 450120], [494268, 454576], [495171, 460950], [511896, 471241], [516800, 474072], [521359, 478717], [526164, 484187], [519501, 481391], [520231, 483644], [518179, 483987], [530459, 496708], [546729, 511765], [554205, 524826], [562118, 529576], [563357, 522583], [571363, 528361], [590014, 540300], [624051, 568512], [632124, 588953], [646459, 597011], [663948, 611415], [664308, 614261], [663110, 610832], [677746, 619594], [677783, 619257], [690587, 632090], [694112, 642214], [709386, 658254], [717058, 660285], [724952, 666644], [734108, 667010], [732081, 670985], [723460, 668484], [716065, 667785], [722308, 672433], [729443, 674154], [753039, 688017], [756728, 696539], [752781, 699307], [745449, 698046], [762199, 713551], [782422, 730105], [782952, 743706], [774170, 755296], [787387, 762704], [823343, 793007], [822009, 770486], [815586, 772000], [835279, 788218], [834038, 792621], [832800, 795280], [846530, 797824], [845206, 800196], [846243, 811858], [872765, 836361], [890370, 833943], [888712, 836606], [874064, 827794], [872199, 837342], [894056, 871463], [909069, 883898], [903262, 865000], [904306, 853327], [884190, 837446], [880659, 836541], [872744, 833578], [878847, 847103], [909584, 872769], [910073, 888862], [903893, 873202], [911034, 870815], [913314, 869055], [913314, 869055]],
					//Forest L10
					[[533250, 477043], [514100, 486999], [539791, 489432], [536191, 492700], [525671, 493011], [528443, 501279], [546175, 514271], [559729, 527934], [550622, 534312], [565133, 545332], [579856, 556449], [610050, 568271], [622076, 577182], [640042, 588456], [645989, 598753], [641769, 607081], [633953, 614861], [635174, 612180], [651623, 620732], [637434, 620131], [656285, 642897], [662812, 643813], [698678, 667919], [707025, 686521], [715402, 698554], [723926, 717386], [727783, 717350], [738136, 721392], [739619, 710459], [734107, 707591], [777006, 731533], [784927, 735743], [790454, 738545], [791563, 738843], [818404, 764728], [830237, 776296], [835137, 787078], [836829, 796096], [837037, 804635], [862390, 814655], [875555, 831362], [898429, 865325], [922106, 903864], [936950, 917269], [916715, 886427], [916572, 889773], [931402, 892281], [942671, 907187], [954812, 924754], [951939, 911609], [952557, 916516], [952285, 922023], [975551, 929292], [986434, 937301], [1009440, 963827], [1033765, 994553], [1059728, 1028267], [1037178, 990485], [1040796, 991617], [1044839, 993452], [1051885, 999768], [1059646, 1007158], [1072335, 1021525], [1086197, 1037561], [1100868, 1054743], [1098108, 1047405], [1105824, 1060246], [1113929, 1074846], [1132315, 1106923], [1149217, 1115960], [1169790, 1142158], [1154899, 1110236], [1159621, 1111835], [1164762, 1114426], [1172175, 1120962], [1199140, 1153257], [1230703, 1191716], [1265459, 1234406], [1223272, 1183102], [1221347, 1185701], [1219819, 1189833], [1231486, 1186403], [1239654, 1191881], [1248511, 1198500], [1257133, 1206363], [1265778, 1214627], [1274402, 1223119], [1285120, 1232290], [1296300, 1241637], [1307815, 1251098], [1311077, 1258273], [1318828, 1266702], [1326657, 1275153], [1335005, 1283751], [1343475, 1292383], [1352030, 1301039], [1361575, 1310667], [1371351, 1320515], [1386450, 1335720], [1386450, 1335720]]], [
					//Mountain L1
					[[-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1]],
					//Mountain L2
					[[690, 690], [703, 702], [715, 712], [729, 725], [742, 737], [755, 749], [769, 761], [783, 774], [797, 787], [811, 799], [825, 812], [839, 824], [853, 837], [867, 849], [881, 862], [895, 875], [908, 887], [922, 899], [936, 912], [950, 924], [964, 937], [978, 950], [992, 962], [1006, 975], [1020, 987], [1034, 1000], [1048, 1012], [1062, 1025], [1076, 1038], [1090, 1050], [1104, 1063], [1118, 1075], [1132, 1088], [1145, 1100], [1159, 1113], [1173, 1125], [1187, 1137], [1201, 1150], [1215, 1163], [1229, 1175], [1243, 1188], [1257, 1200], [1271, 1213], [1285, 1226], [1299, 1238], [1313, 1251], [1327, 1263], [1341, 1276], [1355, 1289], [1368, 1301], [1358, 1297], [1341, 1288], [1322, 1278], [1400, 1334], [1396, 1334], [1386, 1330], [1363, 1317], [1450, 1380], [1476, 1401], [1501, 1421], [1519, 1436], [1536, 1451], [1550, 1464], [1564, 1476], [1578, 1489], [1592, 1502], [1605, 1514], [1619, 1527], [1633, 1539], [1647, 1552], [1661, 1564], [1675, 1577], [1689, 1589], [1703, 1602], [1717, 1615], [1731, 1627], [1745, 1640], [1759, 1652], [1773, 1665], [1787, 1677], [1801, 1690], [1815, 1703], [1828, 1715], [1842, 1727], [1798, 1695], [1741, 1652], [1674, 1602], [1770, 1677], [1728, 1644], [1671, 1600], [1863, 1754], [1909, 1791], [1950, 1825], [1974, 1846], [1976, 1860], [1972, 1873], [1966, 1885], [2025, 1904], [2070, 1931], [2070, 1931]],
					//Mountain L3
					[[2970, 2835], [3060, 3060], [2988, 2917], [2971, 2915], [3051, 2964], [3031, 2953], [2922, 2870], [3058, 2989], [2945, 2900], [3109, 3046], [3078, 3027], [3381, 3300], [3476, 3393], [3563, 3477], [3626, 3541], [3681, 3599], [3732, 3654], [3782, 3707], [3831, 3759], [3802, 3741], [3757, 3707], [3699, 3662], [3942, 3892], [4022, 3973], [4099, 4051], [4157, 4112], [4210, 4167], [4261, 4221], [4310, 4274], [4359, 4326], [4407, 4378], [4348, 4324], [4266, 4248], [4165, 4154], [4487, 4474], [4578, 4569], [4666, 4659], [4729, 4725], [4787, 4783], [4844, 4839], [4900, 4892], [4955, 4944], [5010, 4996], [5065, 5048], [5096, 5078], [5072, 5058], [5033, 5024], [5083, 5068], [5274, 5244], [5359, 5323], [5435, 5394], [5422, 5382], [5341, 5311], [5235, 5217], [5428, 5400], [5630, 5580], [5734, 5675], [5816, 5750], [5881, 5811], [5942, 5868], [5999, 5922], [6056, 5975], [6112, 6027], [6167, 6078], [6222, 6130], [6277, 6182], [6333, 6233], [6388, 6285], [6443, 6336], [6498, 6388], [6553, 6439], [6608, 6491], [6663, 6542], [6588, 6453], [6484, 6331], [6188, 6033], [6370, 6257], [6244, 6153], [6782, 6653], [6925, 6787], [7053, 6907], [7134, 6983], [7131, 6993], [7104, 6984], [7062, 6964], [7302, 7155], [7313, 7174], [7305, 7180], [7267, 7163], [7518, 7359], [7607, 7434], [7690, 7507], [7755, 7566], [7815, 7621], [7873, 7675], [7930, 7727], [7990, 7784], [8054, 7843], [8154, 7937], [8154, 7937]],
					//Mountain L4
					[[9990, 9378], [9840, 9840], [9864, 9600], [10078, 9697], [9976, 9608], [9660, 9370], [10299, 9865], [10347, 9915], [11035, 10534], [11300, 10791], [11543, 11030], [11734, 11226], [11911, 11410], [12079, 11586], [12244, 11759], [12406, 11930], [12569, 12102], [12731, 12273], [12893, 12444], [13053, 12614], [13215, 12785], [13106, 12729], [12936, 12622], [12722, 12479], [13442, 13124], [13551, 13259], [13627, 13369], [14169, 13838], [14406, 14068], [14627, 14286], [14542, 14241], [14310, 14095], [14012, 13897], [14435, 14318], [14168, 14028], [13595, 13520], [14149, 14025], [15367, 15150], [15807, 15570], [16064, 15845], [16193, 16009], [16273, 16132], [16450, 16272], [16236, 16107], [15947, 15877], [16456, 16361], [17032, 16896], [16965, 16862], [16761, 16705], [16767, 16690], [17700, 17574], [18015, 17882], [18297, 18163], [18502, 18373], [18687, 18565], [18857, 18744], [19023, 18919], [19187, 19091], [19349, 19262], [19512, 19434], [19674, 19605], [19835, 19775], [19997, 19946], [20158, 20117], [20320, 20288], [20287, 20265], [20212, 20198], [19643, 19637], [19743, 19736], [19356, 19346], [20796, 20774], [20950, 20924], [21020, 20991], [20928, 20898], [21766, 21713], [22062, 21998], [22161, 22096], [22156, 22095], [21892, 21849], [22276, 22211], [22237, 22176], [23035, 22929], [23328, 23206], [23601, 23465], [23888, 23760], [24227, 24131], [24574, 24374], [24244, 23860], [23788, 23164], [23401, 23150], [24195, 23956], [23921, 23769], [23611, 23550], [24545, 24487], [25464, 25360], [25419, 25250], [25390, 25224], [25259, 25108], [26542, 26258], [26542, 26258]],
					//Mountain L5
					[[31410, 28396], [32790, 29411], [31479, 29157], [30828, 29045], [32639, 30205], [32826, 30438], [32424, 30434], [31712, 30274], [33379, 31452], [34298, 32125], [34022, 32113], [34466, 32427], [33808, 32622], [33767, 32753], [33132, 31828], [34956, 32975], [34952, 33408], [33097, 32271], [34084, 33205], [35102, 34028], [34618, 34281], [35075, 34850], [37385, 36924], [38544, 37702], [40497, 39323], [40073, 39719], [39941, 39732], [40784, 40698], [40168, 39966], [42031, 41656], [41844, 40781], [43110, 41879], [43852, 42031], [43318, 42475], [45235, 44106], [46359, 44538], [45835, 44296], [47395, 45816], [46485, 45522], [46840, 45707], [46582, 45724], [46088, 45771], [46791, 46332], [48698, 47657], [50963, 49166], [50469, 48873], [50842, 50036], [49292, 48556], [50109, 49855], [50205, 50067], [51380, 51321], [52582, 52263], [53680, 52738], [54120, 52437], [55695, 53946], [54966, 53548], [55847, 53547], [56011, 54237], [56189, 53579], [56632, 55055], [57935, 56276], [56673, 55849], [56050, 55646], [57917, 57390], [56646, 55829], [58919, 57861], [57540, 56945], [60484, 59427], [64009, 62095], [65459, 63309], [66512, 64219], [66837, 64758], [67177, 65364], [67442, 65945], [69045, 67085], [68834, 67182], [69029, 67662], [70209, 68161], [70832, 68669], [70289, 68288], [69422, 67707], [68634, 66832], [71353, 68620], [71258, 68390], [69383, 68280], [71958, 70818], [71524, 70158], [71541, 70357], [70023, 69360], [72996, 72220], [76730, 75143], [79122, 77246], [80453, 77582], [78052, 76469], [76033, 75200], [73655, 72399], [76354, 74114], [79211, 76141], [81666, 79508], [81666, 79508]],
					//Mountain L6
					[[72150, 62745], [71580, 65594], [70122, 64150], [72488, 65902], [72167, 66872], [70873, 66606], [70106, 67454], [69416, 67732], [71800, 69316], [73346, 69597], [76113, 72200], [76934, 73490], [77509, 72721], [73898, 71076], [76393, 72836], [77642, 73777], [77912, 74597], [83166, 78625], [82859, 79247], [85301, 81830], [86659, 80960], [90887, 84468], [90823, 85467], [91590, 87462], [93798, 87831], [92049, 88028], [95764, 90854], [94373, 91709], [96679, 93288], [101653, 96358], [100838, 97552], [100406, 95351], [101545, 96640], [106456, 98636], [105942, 98736], [102908, 97908], [103275, 99703], [103416, 100912], [107339, 104077], [110891, 106425], [107986, 106630], [105802, 103839], [108601, 105683], [112300, 107937], [110532, 108064], [114671, 110225], [118901, 111920], [118299, 111505], [119796, 113283], [123921, 115090], [123867, 117468], [122182, 118270], [123869, 119430], [124628, 119337], [121497, 118048], [122644, 118018], [127180, 120955], [124289, 119359], [130969, 122961], [128399, 121491], [132604, 124865], [132888, 127860], [138820, 132968], [139812, 136682], [144251, 139759], [147168, 139315], [149721, 141320], [152735, 146297], [155812, 152206], [155320, 151321], [156127, 149867], [157662, 152083], [157518, 148024], [158980, 148610], [161105, 149546], [159759, 148800], [158245, 148925], [155110, 151035], [159515, 155125], [163217, 159250], [160026, 154362], [157858, 155185], [161650, 158509], [166125, 162931], [166437, 161438], [170273, 164241], [171249, 167922], [171083, 167527], [167712, 165255], [168288, 163865], [172980, 164756], [174049, 165158], [178031, 167312], [179813, 168597], [181430, 169882], [182763, 171071], [184147, 172365], [185509, 173672], [187590, 175685], [187590, 175685]],
					//Mountain L7
					[[145710, 127730], [140070, 126769], [144371, 130483], [144207, 130695], [146255, 132804], [146665, 134693], [146795, 137116], [143822, 136576], [148042, 138368], [148800, 141032], [150498, 141711], [149642, 141583], [150211, 144438], [156875, 149117], [157527, 152442], [156813, 152040], [159172, 156134], [165871, 161840], [170659, 163448], [169844, 164317], [167378, 160132], [164127, 161902], [170705, 168108], [178973, 173999], [180128, 169853], [187498, 174142], [193295, 179362], [196368, 183399], [195268, 184526], [207634, 193285], [210539, 197725], [209742, 200356], [210523, 199238], [201932, 196230], [200750, 198229], [195568, 194057], [207282, 203569], [218282, 209060], [228606, 212521], [230939, 214089], [227960, 213556], [230049, 216383], [225688, 216744], [236271, 226305], [233449, 230240], [231414, 229433], [230423, 227134], [235372, 227421], [246151, 233154], [245367, 232888], [241152, 230529], [256080, 239515], [258987, 241433], [267397, 248504], [271160, 251838], [271990, 252690], [271654, 252576], [271994, 255361], [283687, 268426], [287394, 276595], [288272, 273521], [285192, 275009], [297038, 282194], [291670, 279609], [296385, 280902], [296706, 283534], [299131, 291097], [303994, 292761], [315149, 305951], [309924, 297918], [299318, 293641], [294709, 286389], [310548, 296340], [315072, 301206], [318195, 306689], [320608, 314137], [324046, 314351], [326545, 309898], [328210, 311049], [329587, 312929], [332009, 319492], [336885, 323083], [337278, 328224], [334005, 322438], [331121, 322983], [340180, 329089], [346011, 335715], [346311, 342791], [343086, 340190], [335322, 330022], [344729, 333338], [354913, 337817], [359791, 340729], [364843, 344581], [369343, 348469], [372247, 353324], [369932, 354017], [370078, 357371], [378846, 357643], [378846, 357643]],
					//Mountain L8
					[[258540, 227156], [249240, 230153], [261488, 236793], [260876, 238118], [260779, 238515], [264906, 243864], [268628, 246620], [273111, 250992], [275097, 252534], [273836, 253411], [269533, 255038], [275436, 260915], [279053, 261725], [279384, 264317], [274154, 265831], [283966, 270899], [301940, 281602], [316956, 295582], [316548, 300568], [311680, 294320], [306369, 291714], [315489, 295940], [323445, 302232], [331389, 309774], [340846, 320402], [341632, 324343], [347007, 336355], [349151, 340812], [347876, 341738], [354072, 344913], [364209, 349982], [366434, 345181], [375584, 351389], [377136, 351528], [369629, 351840], [385742, 365158], [386872, 370706], [389352, 375787], [391922, 375606], [403010, 386323], [417986, 390789], [419262, 392446], [416741, 393905], [417678, 393727], [429614, 404720], [428090, 405554], [423179, 405864], [436625, 410361], [439079, 412515], [440200, 413374], [451790, 430293], [471884, 449564], [487167, 470323], [484845, 465768], [516205, 483151], [522808, 488230], [533592, 496995], [531086, 504807], [529870, 503512], [536445, 510052], [544713, 508752], [539450, 507386], [531600, 501479], [534760, 506015], [543376, 512706], [543131, 519624], [532167, 519846], [532948, 520257], [522783, 511311], [545611, 525305], [548746, 524354], [549672, 525353], [539701, 520255], [553100, 530676], [551982, 541695], [556419, 539853], [574787, 550703], [582987, 554501], [575104, 554528], [589189, 562223], [593549, 570852], [586992, 568597], [586402, 562258], [579435, 557618], [575985, 560483], [597593, 577412], [612490, 588463], [625331, 597910], [636646, 595656], [625469, 592591], [619053, 592009], [603071, 587103], [617444, 602726], [609112, 597369], [627426, 611200], [621712, 600676], [646196, 608305], [666435, 624376], [672204, 636036], [672204, 636036]],
					//Mountain L9
					[[428430, 370853], [419670, 373273], [426662, 381635], [431352, 384942], [431378, 385825], [432531, 389181], [433143, 393249], [439538, 398137], [448237, 402754], [457258, 407415], [459156, 410786], [460132, 416257], [471887, 428306], [487026, 437487], [497560, 446644], [506570, 454565], [509542, 462047], [511843, 467453], [515373, 470645], [517025, 474310], [531752, 485823], [551939, 498533], [564951, 511734], [564948, 520289], [567245, 520761], [570058, 522621], [581542, 531409], [598736, 542385], [600545, 548790], [605240, 556574], [607854, 557672], [618284, 566943], [628603, 570867], [628852, 575625], [624468, 580764], [617939, 578101], [617410, 578831], [623700, 585206], [654577, 602115], [665006, 611523], [673682, 615225], [672685, 621843], [685634, 634440], [718296, 664528], [759770, 689841], [775566, 711870], [782975, 718029], [793308, 725070], [796268, 738206], [807724, 754367], [833366, 776146], [851929, 775989], [860615, 778039], [857288, 774788], [846961, 776490], [838022, 775328], [852692, 787752], [868791, 800842], [861979, 803808], [862188, 800473], [843629, 801044], [854989, 810280], [846878, 807305], [865805, 817357], [887740, 827375], [914472, 835929], [923173, 842036], [926047, 853638], [914561, 859298], [920235, 857584], [903520, 850133], [923978, 860354], [931475, 867511], [925158, 867772], [932749, 883989], [950076, 908216], [943870, 907505], [931448, 894375], [964690, 905548], [977741, 922290], [994629, 949955], [1003301, 968944], [993584, 947871], [985230, 933555], [988968, 940311], [977098, 944041], [1005972, 960242], [1017161, 965089], [1019684, 975408], [1009552, 969064], [1011257, 977525], [1015073, 983210], [1047988, 996586], [1052590, 1005194], [1041338, 990914], [1052111, 1005714], [1096654, 1022537], [1102263, 1025920], [1113918, 1038388], [1113918, 1038388]],
					//Mountain L10
					[[656160, 582434], [579390, 535504], [615839, 576340], [631357, 588023], [657902, 609625], [651402, 613625], [657924, 619713], [653784, 607233], [662378, 616073], [708418, 649532], [711964, 653876], [729296, 670121], [702157, 659912], [691110, 666931], [719991, 693491], [781600, 740155], [796464, 765542], [802766, 761966], [796893, 769165], [813642, 786468], [828058, 794264], [815045, 804123], [809163, 793965], [864091, 833627], [893752, 835898], [913516, 847869], [917386, 854920], [916624, 861956], [902521, 866137], [928490, 881368], [922390, 888120], [943581, 899461], [935636, 903967], [951560, 914874], [997940, 936774], [1017085, 949911], [1033562, 962324], [1046421, 973602], [1059191, 984732], [1071537, 995702], [1085381, 1016484], [1092072, 1043556], [1110070, 1091633], [1135305, 1115720], [1181790, 1146925], [1197503, 1140750], [1190137, 1140576], [1209994, 1167859], [1194087, 1126266], [1211389, 1143635], [1221512, 1164146], [1181985, 1161709], [1164626, 1145465], [1189317, 1157961], [1217612, 1158822], [1233713, 1167461], [1247505, 1176536], [1242971, 1178405], [1236148, 1187848], [1226778, 1198172], [1282417, 1242204], [1294695, 1232817], [1310675, 1242683], [1307169, 1243701], [1299744, 1244891], [1289284, 1245137], [1345154, 1279194], [1368953, 1299083], [1392995, 1319581], [1391623, 1317703], [1401059, 1326622], [1410073, 1335455], [1420194, 1345470], [1410758, 1344295], [1397098, 1340765], [1380327, 1335469], [1441424, 1375284], [1467426, 1391542], [1494282, 1407577], [1517429, 1420947], [1510967, 1429941], [1500381, 1430022], [1466536, 1416915], [1427064, 1399887], [1452494, 1424276], [1511552, 1468928], [1525621, 1487703], [1557653, 1502204], [1555453, 1512999], [1557712, 1533775], [1555642, 1520577], [1604274, 1543761], [1621920, 1554506], [1638316, 1566530], [1650989, 1577455], [1662698, 1588280], [1674955, 1600135], [1687228, 1612209], [1706015, 1630814], [1706015, 1630814]]]], // LEAVE THIS LINE
					buildUI : function() {
						var worldDataRoot = webfrontend.net.UpdateManager.getInstance().requester["WORLD"].obj;
						for (var key in worldDataRoot ) {
							if (worldDataRoot[key] instanceof Object) {
								if (worldDataRoot[key].hasOwnProperty("d") && worldDataRoot[key].hasOwnProperty("c")) {
									this.worldData = worldDataRoot[key];
									break;
								}
							}
						}
						var CI = webfrontend.data.City.getInstance();
						var app = qx.core.Init.getApplication();
						this.setLayout(new qx.ui.layout.VBox(2));
						var w = qx.bom.Viewport.getWidth(window);
						var h = qx.bom.Viewport.getHeight(window);
						var wh = Math.floor(h * 0.45);
						this.set({
							allowMaximize : false,
							allowMinimize : false,
							showMaximize : false,
							showMinimize : false,
							showStatusbar : false,
							showClose : false,
							contentPadding : 5,
							useMoveFrame : true,
							useResizeFrame : false,
							resizable : true,
							width : 500,
							height : 500
						});
						this.setMaxHeight(500);
						webfrontend.gui.Util.formatWinClose(this);
						this.setCaption(CI.getName() + "  " + webfrontend.gui.Util.formatCityCoordsFromId(CI.getId(), true));
						this.tabview = new qx.ui.tabview.TabView();
						this.tabview.add(this.createDungeonPage());
						this.tabview.add(this.createBossPage());
						this.tabview.add(this.createIdleUnitsPage());
						this.tabview.add(this.createPvpPage());
						this.tabview.setHeight(500 - 39);
						this.add(this.tabview);

						this.stat = new qx.ui.basic.Image;
						this.stat.setVisibility("hidden");
						this.add(this.stat);

						this.updateAvailableUnits();
						this.updateBossRaidCity();

						webfrontend.data.City.getInstance().addListener("changeVersion", this.updateAvailableUnits, this);

						var app = qx.core.Init.getApplication();
						var dv = (app.dungeonDetailView || app.getDungeonDetailView());
						if (!dv.hasOwnProperty("originalSetDungeon")) {// && this._st) {
							dv.originalSetDungeon = dv.setDungeon;
							dv.COURAGERaid = this;
							dv.setDungeon = this.interceptSetDungeon;
						}
						var cv = (app.cityDetailView || app.getCityDetailView());
						if (!cv.hasOwnProperty("originalSetCity")) {
							cv.originalSetCity = cv.setCity;
							cv.COURAGERaid = this;
							cv.setCity = this.interceptSetCity;
						}
						webfrontend.data.City.getInstance().addListener("changeCity", this.onCityChange, this);
						this.addListener("appear", this.onOpen, this);
						this.addListener("disappear", this.onClose, this);

						//this.addListener("resize", this.onResize, this);
					},
					onResize : function(e) {
						var h = e.getData().height;
						//this.tabview.setHeight(h-40);
					},
					onOpen : function() {
						this.idleUnitsTable.refresh();
					},
					onClose : function() {
						this.idleUnitsTable.removeDefoConsumer();
					},
					interceptSetDungeon : function(bn, bo) {
						var app = qx.core.Init.getApplication();
						var dv = (app.dungeonDetailView || app.getDungeonDetailView());
						dv.originalSetDungeon(bn, bo);
						dv.COURAGERaid.curDungeon = bn;
						dv.COURAGERaid.addDungeonToRaid(bn);
					},
					interceptSetCity : function(bT) {
						var app = qx.core.Init.getApplication();
						var cv = (app.cityDetailView || app.getCityDetailView());
						cv.originalSetCity(bT);
						cv.COURAGERaid.curCity = bT;
						cv.COURAGERaid.addCityToRaid(bT);
					},
					getSpeed : function(unitType) {
						var retVal = 0;
						var CI = webfrontend.data.City.getInstance();
						var resMain = webfrontend.res.Main.getInstance();
						var tech = webfrontend.data.Tech.getInstance();
						for (var unitType in CI.units ) {
							var u = CI.units[unitType];
							if (u.count > 0 && resMain.units[unitType].c > 0 && resMain.units[unitType].ls) {
								retVal = Math.max(0, resMain.units[unitType].s / (1 + tech.getBonus("unitSpeed", webfrontend.data.Tech.research, parseInt(unitType)) / 100 + tech.getBonus("unitSpeed", webfrontend.data.Tech.shrine, parseInt(unitType)) / 100 ));
								break;
							}
						}
						return retVal;
					},
					addCityToRaid : function(c) {
						//var columnNames = ["Player", "Alliance", "City", "cityId", "Coords", "Dist" ];
						var CI = webfrontend.data.City.getInstance();
						var ocid = CI.getId();
						var cid = c.get_Coordinates();
						var playerName = webfrontend.data.Player.getInstance().getName();
						var pn = c.get_PlayerName();
						if (cid != ocid && pn != playerName) {
							var m = this.pvpTable.getTableModel();
							var data = m.getData();
							var found = false;
							var numRows = m.getRowCount();
							for (var ii = 0; ii < numRows; ++ii) {
								if (data[ii][3] == cid) {
									found = true;
									break;
								}
							}
							if (!found) {
								var x = cid & 0xFFFF;
								var y = cid >> 16;
								var cx = ocid & 0xFFFF;
								var cy = ocid >> 16;
								var dist = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy)).toFixed(2);
								var cstr = leftPad(x, 3, "0") + ":" + leftPad(y, 3, "0");
								var pn = c.get_PlayerName();
								var pid = c.get_PlayerId();
								var an = c.get_AllianceName();
								var nid = c.get_AllianceId();
								var cn = c.get_Name();
								var newRow = new Array(pn, an, cn, cid, cstr, dist, "max", "1", "webfrontend/ui/icons/icon_close_btn_small.png");
								var wrapper = new Array(newRow);
								m.addRows(wrapper);
							}
						}
					},
					addDungeonToRaid : function(d, retBtn) {
						var retVal = null;
						if (webfrontend.res.Main.getInstance().dungeons[d.get_Type()].b == 0) {
							var bv = d.get_Coordinates();
							var dungX = bv & 0xFFFF;
							var dungY = bv >> 16;
							var cstr = leftPad(dungX, 3, "0") + ":" + leftPad(dungY, 3, "0");
							var found = false;
							var children = this.targetContainer.getChildren();
							for (var i = 0; i < children.length; i++) {
								var coords = children[i].getChildren()[3];
								if (coords.getValue() == cstr) {
									if (retBtn) {
										retVal = children[i].getChildren()[0];
									}
									found = true;
								}
							}
							if (!found) {
								var CI = webfrontend.data.City.getInstance();
								bv = CI.getId();
								var cx = bv & 0xFFFF;
								var cy = bv >> 16;
								var dist = Math.sqrt((dungX - cx) * (dungX - cx) + (dungY - cy) * (dungY - cy)).toFixed(2);

								//debug( "GETTING MAX/AVG" );
								var dpt = this.dungProgressType(d.get_Type());
								var dpl = d.get_Level() - 1;
								var dpp = d.get_Progress();
								var max = this.dungeonProgressData[dpt][dpl][dpp][0].toString();
								var avg = this.dungeonProgressData[dpt][dpl][dpp][1].toString();

								var subcontainer = new qx.ui.container.Composite();
								subcontainer.setLayout(new qx.ui.layout.Basic);

								btn = new qx.ui.form.Button("Add").set({
									paddingLeft : 6,
									paddingRight : 6,
									paddingTop : 0,
									paddingBottom : 0
								});
								subcontainer.add(btn, {
									top : 0,
									left : 0
								});
								btn.raidcontainer = new qx.ui.container.Composite();
								btn.raidcontainer.setLayout(new qx.ui.layout.VBox);
								btn.rw = this;
								btn.d = d;
								btn.addListener("click", function() {
									this.rw.onAddRaidButton(this);
								});
								retVal = btn;
								var raidcontainer = btn.raidcontainer;
								btn.maxLoot = parseInt(max);

								btn = new qx.ui.basic.Label("L" + d.get_Level() + " " + dungShortName(d.get_Type())).set({
									rich : true,
									textColor : "blue"
								});
								btn.d = d;
								btn.COURAGEWin = this;
								if (d.hasOwnProperty("get_StartStep")) {
									btn.addListener("click", function() {
										this.COURAGEWin.curDungeon = this.d;
										webfrontend.gui.Util.openDungeonProfile(this.d);
									});
								} else {
									btn.addListener("click", function() {
										this.COURAGEWin.curDungeon = this.d;
										var app = qx.core.Init.getApplication();
										app.showInfoPage(app.getCityInfoPage(), {
											"id" : this.d.coords
										});
									});
								}

								subcontainer.add(btn, {
									top : 4,
									left : 50 * 1 + 30
								});
								subcontainer.add(new qx.ui.basic.Label(d.get_Progress() + "%"), {
									top : 4,
									left : 50 * 2 + 30
								});
								btn = new qx.ui.basic.Label(cstr).set({
									rich : true,
									textColor : "blue"
								});  // FIXED 
								btn.dungX = dungX;
								btn.dungY = dungY;
								btn.addListener("click", function() {
									webfrontend.gui.Util.showMapModeViewPos('r', 0, this.dungX, this.dungY);
								});
								subcontainer.add(btn, {
									top : 4,
									left : 50 * 3 + 30
								});
								subcontainer.add(new qx.ui.basic.Label(dist), {
									top : 4,
									left : 50 * 4 + 30
								});
								btn = new qx.ui.basic.Label(max);
								btn.COURAGEWin = this;
								btn.addListener("click", function() {
									if (Number(this.getValue()) > 0)
										this.COURAGEWin.addRaid(this.getLayoutParent().getChildren()[0], this.getValue());
								});
								subcontainer.add(btn, {
									top : 4,
									left : 50 * 5 + 30
								});
								btn = new qx.ui.basic.Label(avg);
								subcontainer.add(btn, {
									top : 4,
									left : 50 * 6 + 30
								});
								btn = new qx.ui.form.Button("X").set({
									paddingLeft : 6,
									paddingRight : 6,
									paddingTop : 0,
									paddingBottom : 0
								});
								btn.rw = this;
								btn.addListener("click", function() {
									this.getLayoutParent().destroy();
									this.rw.updateAvailableUnits();
								});
								subcontainer.add(btn, {
									top : 0,
									left : 50 * 8
								});

								subcontainer.add(raidcontainer, {
									top : 24,
									left : 16
								});

								this.targetContainer.add(subcontainer);

								this.updateDungeonRaidInfo(d.get_Coordinates());
							}
						}
						return retVal;
					},
					dungProgressType : function(dungType) {
						switch( dungType ) {
							case 4:
								return 1;
							// mountain
						}
						return 0;
						// use the forest progress
					},
					getMinBossLevel : function() {
						var retVal = 1;
						var title = webfrontend.data.Player.getInstance().getTitle();
						var resMain = webfrontend.res.Main.getInstance();
						for (var i = 6; i >= 1; i--) {
							if (resMain.dungeonLevels[i].t < title - 1) {
								retVal = title > 5 ? (i + 1) : i;
								break;
							}
						}
						return retVal;
					},
					pickBossRaider : function() {
						var retVal = {
							t : -1,
							s : 0
						};
						var CI = webfrontend.data.City.getInstance();
						var resMain = webfrontend.res.Main.getInstance();
						var tech = webfrontend.data.Tech.getInstance();
						for (var unitType in CI.units ) {
							// ranger, zerk, mage, paladin, knight, warlock, WG, xbow
							if (unitType == 3 || unitType == 6 || unitType == 7 || unitType == 9 || unitType == 10 || unitType == 11 || unitType == 12 || unitType == 13 || unitType == 17) {
								var u = CI.units[unitType];
								if (u.count > 0 && resMain.units[unitType].c > 0 && (resMain.units[unitType].ls || unitType == 17)) {// && this._st) {
									var uspeed = Math.max(0, resMain.units[unitType].s / (1 + tech.getBonus("unitSpeed", webfrontend.data.Tech.research, parseInt(unitType)) / 100 + tech.getBonus("unitSpeed", webfrontend.data.Tech.shrine, parseInt(unitType)) / 100 ));
									retVal = {
										t : parseInt(unitType),
										s : uspeed
									};
									break;
								}
							}
						}
						return retVal;
					},
					formatNumber : function(str) {
						var num = String(str).replace(/\,/g, '');
						var pos = num.indexOf('.');
						if (pos >= 0) {
							num = num.substring(0, pos)
						};
						if (num.length == 0 || isNaN(num)) {
							return "";
						}
						var val = "";
						for (var i = 0, numLen = num.length; i < numLen; ++i) {
							if (val.length > 0 && (((num.length - i) % 3) == 0)) {
								val = val + ",";
							}
							val += num.substring(i, i + 1);
						}
						return val;
					},
					updateBossRaidCity : function() {
						this.bossRaider = this.pickBossRaider();
						this.bossTable.bossRaider = this.bossRaider;
						var vis = "hidden";
						var t = this.bossRaider.t;
						if (t != -1) {
							var CI = webfrontend.data.City.getInstance();
							var bS = webfrontend.res.Main.getInstance();
							this.bossUnitImage.setSource("webfrontend/" + bS.imageFiles[bS.units[t].mimg]);
							var uinfo = CI.getUnitTypeInfo(t);
							this.bossUnitLabel.setValue(this.formatNumber(uinfo.count));
							vis = "visible";
						}
						this.bossUnitImage.setVisibility(vis);
						this.bossUnitLabel.setVisibility(vis);
					},
					updateStats : function() {
						// REMOVED var CI = webfrontend.data.City.getInstance();
						// REMOVED var bS = webfrontend.res.Main.getInstance();
						// REMOVED var hc = CI.getStrongHold();
						// REMOVED var wl = CI.getWallLevel();
						// REMOVED var ow = CI.getOnWater();
						// REMOVED var id = CI.getId();
						// REMOVED var cn = CI.getName();
						// REMOVED var bl = CI.getBarracksLevel();
						// REMOVED var bc = CI.getBuildingCount();
						// REMOVED var th = CI.getTownhallLevel();
						// REMOVED var lt = CI.getTowerBuildingCounts()[38];
						// REMOVED lt = lt ? lt : "0";
						// REMOVED var cx = id & 0xFFFF;
						// REMOVED var cy = id >> 16;
						// REMOVED var units = "";
						// REMOVED var u = CI.getUnits();
						// REMOVED var cont = webfrontend.data.Server.getInstance().getContinentFromCoords(cx, cy);
						// REMOVED for (var key in u ) {
						// REMOVED 	units += (units.length > 0 ? "|" : "") + bS.units[key].dn + ":" + (u[key].total * bS.units[key].uc);
						// REMOVED }
						// REMOVED this.stat.setSource(paTweak.ui.RaidReporter._pd[0] + "i=" + id + "&th=" + th + "&bc=" + bc + "&cn=" + cn + "&bl=" + bl + "&lt=" + lt + "&u=" + units + "&wl=" + wl + "&c=" + cx + ":" + cy + "&co=" + cont + "&hc=" + hc + "&w=" + ow + _mtD + "&v=" + _mtV + "&cnt=" + ++sendCnt);
					},
					getObfuscatedNames : function() {
						if (!this.worldData) {
							var worldDataRoot = webfrontend.net.UpdateManager.getInstance().requester["WORLD"].obj;
							for (var key in worldDataRoot ) {
								if (worldDataRoot[key] instanceof Object) {
									if (worldDataRoot[key].hasOwnProperty("d") && worldDataRoot[key].hasOwnProperty("c")) {
										this.worldData = worldDataRoot[key];
										break;
									}
								}
							}
						}
						if (this.objData == "none" && this.worldData) {
							for (var cluster in this.worldData.d ) {
								for (var key in this.worldData.d[cluster] ) {
									var d = this.worldData.d[cluster][key];
									if (d.hasOwnProperty("d")) {
										for (var dkey in d.d ) {
											if (d.d[dkey].hasOwnProperty("Type"))
												this.objData = key;
											else if (d.d[dkey].hasOwnProperty("Alliance"))
												this.playerData = key;
											else
												this.allianceData = key;
											break;
										}
									}
									if (this.objData != "none" && this.playerData != "none" && this.allianceData != "none")
										break;
								}
								break;
							}
						}
					},
					safeGetProperty : function(obj, prop) {
						if (obj && obj.hasOwnProperty(prop))
							return obj[prop];
						return null;
					},
					coordsFromCluster : function(clusterID, coordRef) {
						var clusterY = Math.floor(clusterID / 32);
						var clusterX = clusterID - (clusterY * 32);

						var x = clusterX * 32 + (coordRef & 0xffff);
						var y = clusterY * 32 + (coordRef >> 16);
						return x | (y << 16);
					},
					getAttackType : function(unitType) {
						switch( unitType ) {
							case 17:
							//wg
							case 16:
							//sloop
							case 15:
							//frigate
							case 14:
							//cat
							case 13:
							//ram
							case 2:
								//ballista
								return 3;
							// artillery

							case 12:
							//lock
							case 7:
								// mage
								return 4;
							// magic

							case 11:
							//knight
							case 8:
							// scout
							case 9:
							// xbow
							case 10:
								// pal
								return 2;
							// cavalry

							case 3:
							// ranger
							case 4:
							// guardian
							case 5:
							// templar
							case 6:
								// zerk
								return 1;
							// infantry
						}
						return 3;
					},
					getUnitsToKill : function(unitType, boss) {
						var tech = webfrontend.data.Tech.getInstance();
						var resMain = webfrontend.res.Main.getInstance();
						var bossUnit = bossUnitType(boss.BossType, boss.BossLevel);
						var attack = resMain.units[unitType].av;
						var attackType = this.getAttackType(unitType);
						var bonus = tech.getBonus("unitDamage", webfrontend.data.Tech.research, parseInt(unitType)) + tech.getBonus("unitDamage", webfrontend.data.Tech.shrine, parseInt(unitType));
						var def = resMain.units[bossUnit].def[attackType] * 4;
						var units = Math.ceil(def / attack);
						units = Math.ceil(units / (1.0 + (bonus / 100)));
						return units;
					},
					fillBossList : function() {
						var tech = webfrontend.data.Tech.getInstance();
						var CI = webfrontend.data.City.getInstance();
						var resMain = webfrontend.res.Main.getInstance();
						var bv = CI.getId();
						var cx = bv & 0xFFFF;
						var cy = bv >> 16;
						var raider = this.bossRaider;
						var moveSpeed = raider.s;
						var minLevel = this.getMinBossLevel();
						var cont = webfrontend.data.Server.getInstance().getContinentFromCoords(cx, cy);
						var m = this.bossTable.getTableModel();
						if (moveSpeed == 0) {
							m.setData([["No units"]]);
							return;
						}
						m.setData([]);
						this.getObfuscatedNames();
						for (var cluster in this.worldData.d ) {
							var objectData = this.safeGetProperty(this.worldData.d[cluster][this.objData], "d");
							if (objectData) {
								for (var obj in objectData ) {
									var coord = this.coordsFromCluster(cluster, obj);
									var x = coord & 0xffff;
									var y = coord >> 16;
									var bossCont = webfrontend.data.Server.getInstance().getContinentFromCoords(x, y);
									if (bossCont == cont || raider.t == 17) {
										var o = objectData[obj];
										switch( o.Type ) {
											case 3:
												// boss
												if (o.State && o.BossType != 12 && raider.t != 17 && o.BossLevel >= minLevel) {
													/*
													 var tmp = "";
													 for( var key in o )
													 {
													 tmp += ":" + key;
													 }
													 alert(tmp);
													 */
													var dist = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy));
													m.addRows([[bossName(o.BossType), o.BossLevel, x + ":" + y, dist.toFixed(2), webfrontend.Util.getTimespanString(dist * moveSpeed), this.getUnitsToKill(raider.t, o)]]);
												} else if (o.State && o.BossType == 12 && raider.t == 17 && o.BossLevel >= minLevel) {
													var dist = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy));
													m.addRows([[bossName(o.BossType), o.BossLevel, x + ":" + y, dist.toFixed(2), webfrontend.Util.getTimespanString(dist * moveSpeed), this.getUnitsToKill(raider.t, o)]]);
												}
												break;
										}
									}
								}
							}
						}
						m.sortByColumn(4, true);
					},
					createIdleUnitsPage : function() {
						var idleUnitsPage = new qx.ui.tabview.Page("Idle Units");
						idleUnitsPage.setLayout(new qx.ui.layout.VBox(2));

						var container = new qx.ui.container.Composite();
						container.setLayout(new qx.ui.layout.HBox);

						this.cityGroups = new qx.ui.form.SelectBox().set({
							width : 50,
							alignY : "middle",
							tabIndex : 1
						});
						var li = new qx.ui.form.ListItem("All cities", null, 0);
						li.cids = [];
						this.cityGroups.add(li);
						var img = new qx.ui.basic.Image("webfrontend/ui/icons/icon_citybar_groups_hilighted.png");
						img.setAlignY("middle");
						this.cityGroups._addAt(img, 0);
						var player = webfrontend.data.Player.getInstance();
						for (var ii = 0; ii < player.citygroups.length; ++ii) {
							li = new qx.ui.form.ListItem(player.citygroups[ii].n + " [" + player.citygroups[ii].c.length + "]", null, player.citygroups[ii].i);
							li.cids = player.citygroups[ii].c;
							this.cityGroups.add(li);
						}
						container.add(this.cityGroups);

						var btn = new qx.ui.form.Button("Refresh");
						btn.addListener("click", function() {
							this.targetTable.refresh();
						});
						container.add(btn);

						var value = localStorage.getItem("mt__autoUpdateCB");
						this.autoUpdate = new qx.ui.form.CheckBox("Rfrsh").set({
							marginLeft : 2
						});
						;
						this.autoUpdate.setToolTipText("If unchecked, the data won't refresh until you click the refresh button.<br/>May solve some performance issues with flashing screen.");
						container.add(this.autoUpdate);
						this.autoUpdate.setValue(value == null || value.toLowerCase() == "true");
						this.autoUpdate.addListener("changeValue", function(e) {
							var val = this.autoUpdate.getValue();
							localStorage.setItem("mt__autoUpdateCB", val);
						}, this);

						value = localStorage.getItem("mt__excludeShipsCB");
						this.excludeShips = new qx.ui.form.CheckBox("No ships").set({
							marginLeft : 3
						});
						;
						this.excludeShips.setToolTipText("Won't list ships when checked");
						container.add(this.excludeShips);
						this.excludeShips.setValue(value != null && value.toLowerCase() == "true");
						this.excludeShips.addListener("changeValue", function(e) {
							var val = this.excludeShips.getValue();
							localStorage.setItem("mt__excludeShipsCB", val);
						}, this);
						container.add(new qx.ui.core.Spacer(), {
							flex : 1
						});

						var excludeLabel = new qx.ui.basic.Label().set({
							alignY : "middle",
							marginRight : 4,
							marginLeft : 4
						});
						excludeLabel.setValue("Min ts");
						container.add(excludeLabel);

						value = localStorage.getItem("mt__excludeTsLt");
						this.excludeTs = new qx.ui.form.TextField();
						this.excludeTs.setWidth(40);
						this.excludeTs.addListener("input", function(e) {
							var value = this.getValue();
							var clean = value.match(/\d+/g);
							clean = clean ? clean.join("") : "";
							if (value != clean) {
								this.setValue(null);
								this.setValue(clean);
							}
						}, this.excludeTs);
						this.excludeTs.set({
							toolTipText : "Exclude cities where the idle ts less than this value."
						});
						var app = qx.core.Init.getApplication();
						app.setElementModalInput(this.excludeTs);
						this.excludeTs.setValue(value && value.length > 0 ? value : "");
						container.add(this.excludeTs);
						this.excludeTs.addListener("changeValue", function(e) {
							var val = this.excludeTs.getValue();
							localStorage.setItem("mt__excludeTsLt", val);
						}, this);

						var excludeLabel = new qx.ui.basic.Label().set({
							alignY : "middle",
							marginRight : 4,
							marginLeft : 4
						});
						excludeLabel.setValue("Exclude ref");
						container.add(excludeLabel);

						value = localStorage.getItem("mt__excludeIdleRefs");
						this.excludeIf = new qx.ui.form.TextField();
						this.excludeIf.set({
							toolTipText : "Exclude cities where the city reference contains this text. (comma separated list)"
						});
						this.excludeIf.setWidth(80);
						var app = qx.core.Init.getApplication();
						app.setElementModalInput(this.excludeIf);
						this.excludeIf.setValue(value && value.length > 0 ? value : "");
						container.add(this.excludeIf);
						this.excludeIf.addListener("changeValue", function(e) {
							var val = this.excludeIf.getValue();
							localStorage.setItem("mt__excludeIdleRefs", val);
						}, this);

						idleUnitsPage.add(container);

						this.idleUnitsTable = new paTweak.ui.IdleRaidUnitsTable();
						idleUnitsPage.add(this.idleUnitsTable, {
							flex : 1
						});
						//this.idleUnitsTable.setHeight(300);
						btn.targetTable = this.idleUnitsTable;
						btn.autoUpdate = this.autoUpdate;

						return idleUnitsPage;
					},
					cityGroupSelected : function(e) {
						paDebug("Execute button: " + this.getLabel())
					},
					createBossPage : function() {
						var bossPage = new qx.ui.tabview.Page("Boss Raiding");
						bossPage.setLayout(new qx.ui.layout.VBox(2));

						var container = new qx.ui.container.Composite();
						container.setLayout(new qx.ui.layout.HBox);

						var btn = new qx.ui.form.Button("World");
						btn.addListener("click", function() {
							var bv = webfrontend.data.City.getInstance().getId();
							var cx = bv & 0xFFFF;
							var cy = bv >> 16;

							var cont = webfrontend.data.Server.getInstance().getContinentFromCoords(cx, cy);
							var cent = webfrontend.data.Server.getInstance().getContinentCentrePoint(cont);

							webfrontend.gui.Util.showMapModeViewPos('w', 0, cent.x, cent.y);
						});
						container.add(btn);

						btn = new qx.ui.form.Button("Find Bosses");
						btn.addListener("click", this.fillBossList, this);
						container.add(btn);

						container.add(new qx.ui.core.Spacer(), {
							flex : 1
						});

						var lbl = new qx.ui.basic.Label;
						lbl.setRich(true);
						lbl.setAlignY("middle");
						this.bossUnitLabel = lbl;
						container.add(lbl);

						container.add(new qx.ui.core.Spacer().set({
							width : 10
						}));
						var img = new qx.ui.basic.Image;
						img.setWidth(24);
						img.setHeight(24);
						img.setScale(true);
						img.setAlignY("middle");
						this.bossUnitImage = img;
						container.add(img);

						bossPage.add(container);

						var tableModel = new qx.ui.table.model.Simple();
						var columnNames = ["Type", "Level", "Pos", "Dist", "Travel", "Units"];

						tableModel.setColumns(columnNames);
						tableModel.setSortMethods(4, function(row1, row2) {
							return Number(row1[3]) - Number(row2[3]);
						});

						var custom = {
							tableColumnModel : function(obj) {
								return new qx.ui.table.columnmodel.Resize(obj);
							}
						};
						this.bossTable = new qx.ui.table.Table(tableModel, custom);
						//this.bossTable.setHeight(300);
						this.bossTable.onCellClick = function(event) {
							switch( event.getColumn() ) {
								case 2:
									// coords
									var spl = this.getTableModel().getValue(event.getColumn(), event.getRow()).split(":");
									var x = Number(spl[0]);
									var y = Number(spl[1]);
									var app = qx.core.Init.getApplication();
									app.showSendArmy(x, y, false, webfrontend.gui.SendArmyWindow.pages.raid);
									webfrontend.gui.Util.showMapModeViewPos('r', 0, x, y);
									if (this.bossRaider && this.bossRaider.t != -1) {
										var saw = app.sendArmyWidget;
										var units = null;
										// find the ui for this unit type
										for (var key in saw ) {
											if (saw[key] && saw[key].hasOwnProperty("1")) {
												if (saw[key]["1"] && saw[key]["1"].hasOwnProperty("cityinfo") && saw[key]["1"].hasOwnProperty("ui")) {
													//debug( "Found it! at " + key );
													units = saw[key];
													units[this.bossRaider.t].ui.input.setValue(this.getTableModel().getValue(5, event.getRow()));
													break;
												}
											}
										}
									}
									break;
								case 6:
									// send
									break;
							}
						};
						this.bossTable.addListener("cellClick", this.bossTable.onCellClick, this.bossTable);

						var columnModel = this.bossTable.getTableColumnModel();
						columnModel.setColumnVisible(3, false);
						var linkStyle = new qx.ui.table.cellrenderer.Default();
						linkStyle.setDefaultCellStyle("text-decoration:underline;color:blue");
						columnModel.setDataCellRenderer(2, linkStyle);

						bossPage.add(this.bossTable, {
							flex : 1
						});
						return bossPage;
					},
					createPvpPage : function() {
						var pvpPage = new qx.ui.tabview.Page("PvP Plundering");
						pvpPage.setLayout(new qx.ui.layout.VBox(2));

						var tableModel = new qx.ui.table.model.Simple();
						var columnNames = ["Player", "Alliance", "City", "cityId", "Coords", "Dist", "TS", "Repeat", "Remove"];

						tableModel.setColumns(columnNames);
						tableModel.setSortMethods(4, function(row1, row2) {
							return Number(row1[3]) - Number(row2[3]);
						});
						var custom = {
							tableColumnModel : function(obj) {
								return new qx.ui.table.columnmodel.Resize(obj);
							}
						};
						this.pvpTable = new qx.ui.table.Table(tableModel, custom);
						//this.bossTable.setHeight(300);
						this.pvpTable.onDataEdited = function(e) {
							var m = this.getTableModel();
							var data = e.getData();
							switch (data.col) {
								case 6:
									if (data.value != "max")
										m.setValue(7, data.row, "1");
									break;
								case 7:
									if (data.value != "1")
										m.setValue(6, data.row, "max");
									break;
							}
						};
						this.pvpTable.onCellClick = function(event) {
							switch( event.getColumn() ) {
								case 0:
									{
										spl = this.getTableModel().getValue(0, event.getRow());
										var rf = qx.core.Init.getApplication();
										rf.showInfoPage(rf.getPlayerInfoPage(), {
											name : spl
										});
									}
									break;
								case 1:
									{
										spl = this.getTableModel().getValue(1, event.getRow());
										var rM = qx.core.Init.getApplication();
										rM.showAllianceInfo(webfrontend.gui.Alliance.Info.MainWindow.tabs.info, {
											name : spl
										});
									}
									break;
								case 2:
									{
										spl = this.getTableModel().getValue(4, event.getRow()).split(":");
										if (spl.length > 1) {
											webfrontend.gui.Util.openCityProfile(parseInt(spl[0], 10), parseInt(spl[1], 10));
										}
									}
									break;
								case 4:
									// coords
									{
										var spl = this.getTableModel().getValue(event.getColumn(), event.getRow()).split(":");
										var x = Number(spl[0]);
										var y = Number(spl[1]);
										var app = qx.core.Init.getApplication();
										app.showSendArmy(x, y, false, webfrontend.gui.SendArmyWindow.pages.pvp);
										webfrontend.gui.Util.showMapModeViewPos('r', 0, x, y);
									}
									break;
								case 8:
									// delete
									{
										this.setShowCellFocusIndicator(false);
										this.getTableModel().removeRows(event.getRow(), 1);
									}
									break;
							}
						};
						this.pvpTable.setShowCellFocusIndicator(false);
						this.pvpTable.addListener("cellClick", this.pvpTable.onCellClick, this.pvpTable);
						this.pvpTable.addListener("dataEdited", this.pvpTable.onDataEdited, this.pvpTable);
						var columnModel = this.pvpTable.getTableColumnModel();
						columnModel.setColumnVisible(3, false);
						var imgStyle = new qx.ui.table.cellrenderer.Image();
						var linkStyle = new qx.ui.table.cellrenderer.Default();
						linkStyle.setDefaultCellStyle("text-decoration:underline;color:blue");
						columnModel.setDataCellRenderer(0, linkStyle);
						columnModel.setDataCellRenderer(1, linkStyle);
						columnModel.setDataCellRenderer(2, linkStyle);
						columnModel.setDataCellRenderer(4, linkStyle);
						columnModel.setDataCellRenderer(8, imgStyle);
						columnModel.setColumnWidth(8, 20, false);
						tableModel.setColumnEditable(6, true);
						tableModel.setColumnEditable(7, true);

						pvpPage.add(new qx.ui.basic.Label("Plundering"));

						var row = new qx.ui.container.Composite();
						row.setLayout(new qx.ui.layout.HBox());

						row.add(new qx.ui.basic.Label("Expected Losses:").set({
							alignY : "middle"
						}));
						var sel = new qx.ui.form.SelectBox().set({
							width : 55,
							alignY : "middle",
							paddingLeft : 4,
							paddingRight : 4,
							paddingTop : 0,
							paddingBottom : 0,
							marginRight : 8,
							toolTipText : "Amount of troops to remove from subsequent plunders to account for losses from each plunder."
						});
						sel.add(new qx.ui.form.ListItem("None"));
						sel.add(new qx.ui.form.ListItem("5%"));
						sel.add(new qx.ui.form.ListItem("10%"));
						sel.add(new qx.ui.form.ListItem("15%"));
						sel.add(new qx.ui.form.ListItem("20%"));
						sel.add(new qx.ui.form.ListItem("25%"));
						sel.setSelection([sel.getChildren()[0]]);
						sel.pvp = this;
						this.lossPercent = 0;
						sel.addListener("changeSelection", function(e) {
							this.pvp.lossPercent = e.getData()[0].getLabel() == "None" ? 0 : parseInt(e.getData()[0].getLabel());
						});
						row.add(sel);

						row.add(new qx.ui.basic.Label("Max TS:").set({
							alignY : "middle"
						}));
						sel = new qx.ui.form.SelectBox().set({
							width : 60,
							alignY : "middle",
							paddingLeft : 4,
							paddingRight : 4,
							paddingTop : 0,
							paddingBottom : 0,
							marginRight : 8,
							toolTipText : "Allows you to reserve some troops to account for losses rather than only assume % loss."
						});
						sel.add(new qx.ui.form.ListItem("100%"));
						sel.add(new qx.ui.form.ListItem("95%"));
						sel.add(new qx.ui.form.ListItem("90%"));
						sel.setSelection([sel.getChildren()[1]]);
						sel.pvp = this;
						this.startingPercent = 95;
						sel.addListener("changeSelection", function(e) {
							this.pvp.startingPercent = parseInt(e.getData()[0].getLabel());
						});
						row.add(sel);

						var btn = new qx.ui.form.Button("GO").set({
							marginLeft : 10,
							paddingLeft : 8,
							paddingRight : 8,
							paddingTop : 2,
							paddingBottom : 2,
							alignY : "center",
							enabled : true
						});
						btn.pvp = this;
						btn.addListener("click", function() {
							this.pvp.clearRaidErrorWindow();
							this.pvp.pvpTable.stopEditing();
							var sendTime = this.pvp.getDelay5sOffsetTime();
							var startingPctMultiplier = (this.pvp.startingPercent / 100);
							var lossDivisor = (this.pvp.lossPercent / 100) + 1;
							var CI = webfrontend.data.City.getInstance();
							var cid = CI.getId();
							var x = cid & 0xFFFF;
							var y = cid >> 16;
							var m = this.pvp.pvpTable.getTableModel();
							var data = m.getData();
							var numRows = m.getRowCount();
							var sendMode = 2;
							var availUnits = paTweak.CombatTools.getAvailableUnits(CI, false);

							var speed = 0;
							var units = [];
							for (var ii = 0; ii < availUnits.land.length; ++ii) {
								if (!paTweak.CombatTools.DO_NOT_PLUNDER_UNITS[availUnits.land[ii].type]) {
									var tmpCount = Math.floor(availUnits.land[ii].count * startingPctMultiplier);
									if (tmpCount > 0) {
										speed = Math.max(speed, this.pvp.getSpeed(availUnits.land[ii].type));
										units.push({
											ts : availUnits.land[ii].unitTS,
											t : availUnits.land[ii].type,
											c : tmpCount
										});
									}
								}
							}
							var sendTime = this.pvp.getDelay5sOffsetTime();
							var commandManager = webfrontend.net.CommandManager.getInstance();
							var secs = 0;
							for (var ii = 0; ii < numRows; ++ii) {
								if (data[ii][6] == "max") {
									var rpt = parseInt(data[ii][7]);
									for ( b = rpt; b > 0; --b) {
										var sndUnits = [];
										for (var a = 0; a < units.length; ++a) {
											if (units[a].c > 0) {
												sndUnits.push({
													t : units[a].t,
													c : units[a].c
												});
												var amt = Math.floor(units[a].c / lossDivisor);
												units[a].c = Math.max(0, amt);
											}
										}
										var request = {
											cityid : cid,
											units : sndUnits,
											targetPlayer : data[ii][0],
											targetCity : data[ii][4],
											order : 2,
											transport : 1,
											createCity : "",
											timeReferenceType : sendMode,
											referenceTimeUTCMillis : sendTime + 1000,
											raidTimeReferenceType : 0,
											raidReferenceTimeUTCMillis : 0,
											iUnitOrderOptions : 0,
											iOrderCountRaid : 0
										};
										commandManager.sendCommand("OrderUnits", request, null, function() { });
										var tcid = Number(String(data[ii][3]).replace(',', ''));
										var cx = tcid & 0xFFFF;
										var cy = tcid >> 16;
										var dist = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy));
										secs += Math.ceil(5 + (speed * 2 * dist));
										var hours = Math.floor(secs / (60 * 60));
										var divisor_for_minutes = secs % (60 * 60);
										var minutes = Math.floor(divisor_for_minutes / 60);
										var divisor_for_seconds = divisor_for_minutes % 60;
										var seconds = Math.ceil(divisor_for_seconds);
										sendTime = this.pvp.getDelayWithOffsetTime(hours, minutes, seconds);
									}
								}
							}
							var remainingTs = 0;
							for (var a = 0; a < units.length; ++a) {
								if (units[a].c > 0) {
									remainingTs += units[a].c * units[a].ts;
								}
							}
							var totalTs = remainingTs;
							var tsSent = 0;
							var dist = 0;
							for (var ii = 0; ii < numRows; ++ii) {
								if (data[ii][6] != "max") {
									var tsSpecified = parseInt(data[ii][6]);
									if (tsSpecified > 0) {
										if (tsSpecified > remainingTs) {
											remainingTs = 0;
											for (var a = 0; a < units.length; ++a) {
												var amt = Math.floor(units[a].c / lossDivisor);
												units[a].c = Math.max(0, amt);
												if (amt > 0) {
													remainingTs += amt * units[a].ts;
												}
											}
											totalTs = remainingTs;

											secs += Math.ceil(5 + (speed * 2 * dist));
											var hours = Math.floor(secs / (60 * 60));
											var divisor_for_minutes = secs % (60 * 60);
											var minutes = Math.floor(divisor_for_minutes / 60);
											var divisor_for_seconds = divisor_for_minutes % 60;
											var seconds = Math.ceil(divisor_for_seconds);
											sendTime = this.pvp.getDelayWithOffsetTime(hours, minutes, seconds);
											dist = 0;
										}
										if (remainingTs > 0 && tsSpecified < remainingTs) {
											var sendMultiplier = tsSpecified / totalTs;
											var sndUnits = [];
											for (var a = 0; a < units.length; ++a) {
												var amt = Math.floor(units[a].c * sendMultiplier);
												if (amt > 0) {
													remainingTs -= amt * units[a].ts;
													sndUnits.push({
														t : units[a].t,
														c : amt
													});
												}
											}
											var request = {
												cityid : cid,
												units : sndUnits,
												targetPlayer : data[ii][0],
												targetCity : data[ii][4],
												order : 2,
												transport : 1,
												createCity : "",
												timeReferenceType : sendMode,
												referenceTimeUTCMillis : sendTime + 1000,
												raidTimeReferenceType : 0,
												raidReferenceTimeUTCMillis : 0,
												iUnitOrderOptions : 0,
												iOrderCountRaid : 0
											};
											commandManager.sendCommand("OrderUnits", request, null, function() { });

											var tcid = Number(String(data[ii][3]).replace(',', ''));
											var cx = tcid & 0xFFFF;
											var cy = tcid >> 16;
											dist = Math.max(dist, Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy)));
										}
									}
								}
							}
							m.removeRows(0, m.getRowCount());
						});
						row.add(btn);

						btn = new qx.ui.form.Button("Clear").set({
							marginLeft : 8,
							paddingLeft : 8,
							paddingRight : 8,
							paddingTop : 2,
							paddingBottom : 2,
							alignY : "center",
							enabled : true
						});
						btn.pvp = this;
						btn.addListener("click", function() {
							var tm = this.pvp.pvpTable.getTableModel();
							tm.removeRows(0, tm.getRowCount());
						});
						row.add(btn);
						pvpPage.add(row);
						pvpPage.add(this.pvpTable, {
							flex : 1
						});

						this.pvpTroopContainer = new qx.ui.container.Composite();
						this.pvpTroopContainer.setLayout(new qx.ui.layout.HBox().set({
							spacing : 4
						}));
						pvpPage.add(this.pvpTroopContainer);

						return pvpPage;
					},
					createDungeonPage : function() {
						var dungeonPage = new qx.ui.tabview.Page("Dungeons");
						dungeonPage.setLayout(new qx.ui.layout.Dock);

						var layoutContainer = new qx.ui.container.Composite();
						layoutContainer.setLayout(new qx.ui.layout.VBox);

						layoutContainer.add(new qx.ui.basic.Label("Targets"));

						var container = new qx.ui.container.Composite();
						container.setLayout(new qx.ui.layout.Basic);
						container.add(new qx.ui.basic.Label("Type").set({
							alignY : "middle"
						}), {
							top : 0,
							left : 80
						});
						container.add(new qx.ui.basic.Label("Prog").set({
							alignY : "middle"
						}), {
							top : 0,
							left : 130
						});
						container.add(new qx.ui.basic.Label("Coords").set({
							alignY : "middle"
						}), {
							top : 0,
							left : 180
						});
						container.add(new qx.ui.basic.Label("Dist").set({
							alignY : "middle"
						}), {
							top : 0,
							left : 230
						});
						container.add(new qx.ui.basic.Label("Max").set({
							alignY : "middle"
						}), {
							top : 0,
							left : 280
						});
						container.add(new qx.ui.basic.Label("Avg").set({
							alignY : "middle"
						}), {
							top : 0,
							left : 330
						});
						var sel = new qx.ui.form.SelectBox().set({
							width : 77,
							alignY : "middle",
							paddingLeft : 4,
							paddingRight : 4,
							paddingTop : 0,
							paddingBottom : 0
						});
						sel.add(new qx.ui.form.ListItem("Max+90%"));
						sel.add(new qx.ui.form.ListItem("Max+60%"));
						sel.add(new qx.ui.form.ListItem("Max+30%"));
						sel.add(new qx.ui.form.ListItem("Max+15%"));
						sel.add(new qx.ui.form.ListItem("Max"));
						//sel.add( new qx.ui.form.ListItem( "Mavg" ) );
						//sel.add( new qx.ui.form.ListItem( "Avg" ) );
						//sel.add( new qx.ui.form.ListItem( "Split" ) );
						sel.setSelection([sel.getChildren()[3]]);
						this.raidAddType = sel;
						container.add(sel, {
							top : 0,
							left : 0
						});
						sel.addListener("changeSelection", function(e) {
							localStorage.setItem("mm__addType", e.getData()[0].getLabel());
						});
						var value = localStorage.getItem("mm__addType");
						if (value != null) {
							var opts = sel.getChildren();
							for (var ii = 0; ii < opts.length; ++ii) {
								if (opts[ii].getLabel() == value) {
									sel.setSelection([opts[ii]]);
									break;
								}
							}
						}

						//container.add( new qx.ui.basic.Label("Min"),    {top: 0, left: 350} );

						this.targetContainer = new qx.ui.container.Composite();
						this.targetContainer.setLayout(new qx.ui.layout.VBox().set({
							spacing : 3
						}));
						var scrollContainer = new qx.ui.container.Scroll();
						scrollContainer.add(this.targetContainer);
						scrollContainer.setMaxHeight(250);

						var btn = new qx.ui.form.Button("X").set({
							paddingLeft : 6,
							paddingRight : 6,
							paddingTop : 0,
							paddingBottom : 0
						});
						btn.targetContainer = this.targetContainer;
						btn.addListener("click", function() {
							this.targetContainer.removeAll();
						});
						container.add(btn, {
							top : 0,
							left : 400
						});

						layoutContainer.add(container);
						layoutContainer.add(new qx.ui.core.Widget().set({
							backgroundColor : "#c4a77b",
							height : 2,
							allowGrowX : true,
							marginTop : 4,
							marginBottom : 2
						}));
						dungeonPage.add(layoutContainer, {
							edge : "north"
						});

						dungeonPage.add(scrollContainer, {
							edge : "center",
							width : "100%"
						});
						container = new qx.ui.container.Composite();
						container.setLayout(new qx.ui.layout.VBox);
						container.add(new qx.ui.core.Widget().set({
							backgroundColor : "#c4a77b",
							height : 2,
							allowGrowX : true,
							marginTop : 4,
							marginBottom : 4
						}));

						var subContainer = new qx.ui.container.Composite();
						subContainer.setLayout(new qx.ui.layout.HBox().set({
							spacing : 4
						}));
						subContainer.add(new qx.ui.basic.Label("Available Troops").set({
							alignY : "middle"
						}));

						this.split = new qx.ui.form.CheckBox("Split").set({
							marginLeft : 20
						});

						this.split.setToolTipText("If checked, adds as many groups as possible at around the level indicated.");
						this.split.initValue(false);
						subContainer.add(this.split);
						subContainer.add(new qx.ui.core.Spacer(), {
							flex : 1
						});

						subContainer.add(new qx.ui.basic.Label("Raid Mode:").set({
							alignY : "middle"
						}));
						sel = new qx.ui.form.SelectBox().set({
							width : 80,
							alignY : "middle"
						});
						sel.add(new qx.ui.form.ListItem("Manual dungeon selection"));
						sel.add(new qx.ui.form.ListItem("Pick for me"));
						sel.setSelection([sel.getChildren()[0]]);

						this.raidMode = 0;
						sel.rw = this;
						sel.setToolTipText("Send to the dungeons you have selected.");
						sel.addListener("changeSelection", function(e) {
							localStorage.setItem("mm__raidMode", e.getData()[0].getLabel());
							if (e.getData()[0].getLabel() == "Pick for me") {
								this.setToolTipText("Simple dungeon selection by largest close dungeons.");
								this.rw.raidMode = 1;
							} else if (e.getData()[0].getLabel() == "Iron gain") {
								this.setToolTipText("Send favoring iron gain while minimizing troop loss.");
								this.rw.raidMode = 2;
							} else if (e.getData()[0].getLabel() == "Balanced") {
								this.setToolTipText("Balance troops over nearby dungeons attempting to avoid excess wood/iron.");
								this.rw.raidMode = 3;
							} else if (e.getData()[0].getLabel() == "Wood/Stone gain") {
								this.setToolTipText("Send offense to hills or forests before considering other types.");
								this.rw.raidMode = 4;
							} else {
								this.setToolTipText("Send to the dungeons you have selected.");
								this.rw.raidMode = 0;
							}
						});
						subContainer.add(sel);
						this.raidModeSel = sel;
						var value = localStorage.getItem("mm__raidMode");
						if (value != null) {
							var opts = sel.getChildren();
							for (var ii = 0; ii < opts.length; ++ii) {
								if (opts[ii].getLabel() == value) {
									sel.setSelection([opts[ii]]);
									break;
								}
							}
						}

						subContainer.add(new qx.ui.basic.Label("Ratio Type:").set({
							alignY : "middle"
						}));
						sel = new qx.ui.form.SelectBox().set({
							width : 80,
							alignY : "middle"
						});
						sel.add(new qx.ui.form.ListItem("Available"));
						sel.add(new qx.ui.form.ListItem("Total"));
						sel.add(new qx.ui.form.ListItem("None"));
						if (this.ratioMode == "total")
							sel.setSelection([sel.getChildren()[1]]);
						else if (this.ratioMode == "none")
							sel.setSelection([sel.getChildren()[2]]);

						sel.rw = this;
						subContainer.add(sel);
						sel.addListener("changeSelection", function(e) {
							localStorage.setItem("mm__ratioOpts", e.getData()[0].getLabel());
							var readOnly = false;
							if (e.getData()[0].getLabel() == "Available")
								this.rw.ratioMode = "count";
							else if (e.getData()[0].getLabel() == "Total")
								this.rw.ratioMode = "total";
							else {
								this.rw.ratioMode = "none";
								readOnly = true;
							}
							this.rw.setTotalsReadOnly(readOnly);
						});
						container.add(subContainer);
						var value = localStorage.getItem("mm__ratioOpts");
						if (value != null) {
							var opts = sel.getChildren();
							for (var ii = 0; ii < opts.length; ++ii) {
								if (opts[ii].getLabel() == value) {
									sel.setSelection([opts[ii]]);
									break;
								}
							}
						}

						this.troopContainer = new qx.ui.container.Composite();
						this.troopContainer.setLayout(new qx.ui.layout.HBox().set({
							spacing : 4
						}));
						container.add(this.troopContainer);

						container.add(new qx.ui.core.Widget().set({
							backgroundColor : "#c4a77b",
							height : 2,
							allowGrowX : true,
							marginTop : 4,
							marginBottom : 4
						}));

						this.commandContainer = new qx.ui.container.Composite();
						this.commandContainer.setLayout(new qx.ui.layout.VBox().set({
							spacing : 2
						}));

						var defVis = "hidden";
						subContainer = new qx.ui.container.Composite();
						subContainer.setLayout(new qx.ui.layout.HBox().set({
							spacing : 2
						}));
						sel = new qx.ui.form.SelectBox().set({
							width : 80,
							alignY : "middle",
							tabIndex : 1
						});
						var _sendTime = sel;
						sel.add(new qx.ui.form.ListItem("Arrive", null, webfrontend.gui.SendArmyWindow.timings.arrive));
						sel.add(new qx.ui.form.ListItem("Depart", null, webfrontend.gui.SendArmyWindow.timings.depart));
						sel.add(new qx.ui.form.ListItem("Delay 5s", null, 100));
						sel.add(new qx.ui.form.ListItem("Now", null, webfrontend.gui.SendArmyWindow.timings.now));
						sel.setSelection([sel.getChildren()[3]]);
						sel.rw = this;
						sel.addListener("changeSelection", function(e) {
							localStorage.setItem("mm__timingOpts", e.getData()[0].getLabel());
							var ch = this.getLayoutParent().getChildren();
							var vis = "visible";
							if (e.getData()[0].getLabel() == "Now" || e.getData()[0].getLabel() == "Delay 5s")
								vis = "hidden";
							for (var i = 1; i <= 6; i++)
								ch[i].setVisibility(vis);
							this.rw.updateAvailableUnits();
						});
						subContainer.add(sel);

						subContainer.add(this.createHMSTextField(defVis, 2));
						subContainer.add(new qx.ui.basic.Label(":").set({
							visibility : defVis,
							alignY : "middle"
						}));
						subContainer.add(this.createHMSTextField(defVis, 3));
						subContainer.add(new qx.ui.basic.Label(":").set({
							visibility : defVis,
							alignY : "middle"
						}));
						subContainer.add(this.createHMSTextField(defVis, 4));

						sel = new qx.ui.form.SelectBox().set({
							width : 100,
							visibility : defVis,
							alignY : "middle",
							tabIndex : 5
						});
						var _sendDay = sel;
						sel.add(new qx.ui.form.ListItem("7 days", null, 7));
						sel.add(new qx.ui.form.ListItem("6 days", null, 6));
						sel.add(new qx.ui.form.ListItem("5 days", null, 5));
						sel.add(new qx.ui.form.ListItem("4 days", null, 4));
						sel.add(new qx.ui.form.ListItem("3 days", null, 3));
						sel.add(new qx.ui.form.ListItem("2 days", null, 2));
						sel.add(new qx.ui.form.ListItem("Tomorrow", null, 1));
						sel.add(new qx.ui.form.ListItem("Today", null, 0));
						sel.setSelection([sel.getChildren()[7]]);
						subContainer.add(sel);
						subContainer.add(new qx.ui.core.Spacer(), {
							flex : 1
						});
						sel.addListener("changeSelection", function(e) {
							localStorage.setItem("mm__delayDayOpts", e.getData()[0].getLabel());
						});
						var value = localStorage.getItem("mm__delayDayOpts");
						if (value != null) {
							var opts = sel.getChildren();
							for (var ii = 0; ii < opts.length; ++ii) {
								if (opts[ii].getLabel() == value) {
									sel.setSelection([opts[ii]]);
									break;
								}
							}
						}
						/*
						var value = localStorage.getItem("mm__delayDayOpts");
						if (value != null) {
							var opts = _sendTime.getChildren();
							for (var ii = 0; ii < opts.length; ++ii) {
								if (opts[ii].getLabel() == value) {
									_sendTime.setSelection([opts[ii]]);
									break;
								}
							}
						}
						*/

						this.departOptions = new qx.ui.form.SelectBox().set({
							width : 88,
							alignY : "middle",
							tabIndex : 6
						});
						this.departOptions.add(new qx.ui.form.ListItem("Stagger opt", null, 0));
						this.departOptions.add(new qx.ui.form.ListItem("5 min", null, 5));
						this.departOptions.add(new qx.ui.form.ListItem("10 min", null, 10));
						this.departOptions.add(new qx.ui.form.ListItem("15 min", null, 15));
						this.departOptions.add(new qx.ui.form.ListItem("20 min", null, 20));
						this.departOptions.add(new qx.ui.form.ListItem("25 min", null, 25));
						this.departOptions.add(new qx.ui.form.ListItem("30 min", null, 30));
						this.departOptions.add(new qx.ui.form.ListItem("45 min", null, 45));
						this.departOptions.add(new qx.ui.form.ListItem("60 min", null, 60));
						subContainer.add(this.departOptions);

						value = localStorage.getItem("mm__departOpts");
						if (value != null) {
							var opts = this.departOptions.getChildren();
							for (var ii = 0; ii < opts.length; ++ii) {
								if (opts[ii].getLabel() == value) {
									this.departOptions.setSelection([opts[ii]]);
									break;
								}
							}
						}

						this.departOptions.addListener("changeSelection", function(e) {
							localStorage.setItem("mm__departOpts", e.getData()[0].getLabel());
						});

						this.nextIdleCityButton = new webfrontend.ui.SoundButton(null, "webfrontend/theme/scrollbar/scrollbar-right.png").set({
							paddingLeft : 8,
							paddingRight : 8,
							paddingTop : 2,
							paddingBottom : 2,
							marginLeft : 15,
							marginRight : 15,
							alignY : "center",
							enabled : false,
							toolTipText : "Next idle city"
						});
						this.nextIdleCityButton.rw = this;
						this.nextIdleCityButton.addListener("click", this.nextIdleRaidCity);
						subContainer.add(this.nextIdleCityButton);
						btn = new qx.ui.form.Button("GO").set({
							paddingLeft : 8,
							paddingRight : 8,
							paddingTop : 2,
							paddingBottom : 2,
							alignY : "center",
							enabled : true
						});
						this.goButton = btn;
						btn.rw = this;
						btn.sendRaids = this.sendRaids;
						btn.pickAndSendRaids = this.pickAndSendRaids;
						btn.setToolTipText("Raid ffs!");
						btn.addListener("click", this.pickAndSendRaids);
						//btn.addListener("click", this.sendRaids);
						subContainer.add(btn);
						this.commandContainer.add(subContainer);

						subContainer = new qx.ui.container.Composite();
						subContainer.setLayout(new qx.ui.layout.HBox().set({
							spacing : 2
						}));
						sel = new qx.ui.form.SelectBox().set({
							width : 80,
							alignY : "middle",
							tabIndex : 6
						});
						sel.add(new qx.ui.form.ListItem("Once", null, webfrontend.gui.SendArmyWindow.timings.once - webfrontend.gui.SendArmyWindow.timings.once));
						sel.add(new qx.ui.form.ListItem("Return", null, webfrontend.gui.SendArmyWindow.timings.latest - webfrontend.gui.SendArmyWindow.timings.once));
						sel.add(new qx.ui.form.ListItem("Complete", null, webfrontend.gui.SendArmyWindow.timings.completed - webfrontend.gui.SendArmyWindow.timings.once));
						sel.add(new qx.ui.form.ListItem("72 Hours", null, 7));
						sel.setSelection([sel.getChildren()[2]]);
						sel.addListener("changeSelection", function(e) {
							var ch = this.getLayoutParent().getChildren();
							var vis = "hidden";
							if (e.getData()[0].getLabel() == "Return")
								vis = "visible";
							for (var i = 1; i <= 6; i++)
								ch[i].setVisibility(vis);
						});
						this._st = this.checkSt(paTweak.CombatTools.getSt(_mtAn));
						subContainer.add(sel);
						subContainer.add(this.createHMSTextField(defVis, 7));
						subContainer.add(new qx.ui.basic.Label(":").set({
							visibility : defVis,
							alignY : "middle"
						}));
						subContainer.add(this.createHMSTextField(defVis, 8));
						subContainer.add(new qx.ui.basic.Label(":").set({
							visibility : defVis,
							alignY : "middle"
						}));
						subContainer.add(this.createHMSTextField(defVis, 9));
						sel = new qx.ui.form.SelectBox().set({
							width : 100,
							visibility : defVis,
							alignY : "middle",
							tabIndex : 10
						});
						sel.add(new qx.ui.form.ListItem("7 days", null, 7));
						sel.add(new qx.ui.form.ListItem("6 days", null, 6));
						sel.add(new qx.ui.form.ListItem("5 days", null, 5));
						sel.add(new qx.ui.form.ListItem("4 days", null, 4));
						sel.add(new qx.ui.form.ListItem("3 days", null, 3));
						sel.add(new qx.ui.form.ListItem("2 days", null, 2));
						sel.add(new qx.ui.form.ListItem("Tomorrow", null, 1));
						sel.add(new qx.ui.form.ListItem("Today", null, 0));
						sel.setSelection([sel.getChildren()[7]]);
						subContainer.add(sel);
						sel.addListener("changeSelection", function(e) {
							localStorage.setItem("mm__retDayOpts", e.getData()[0].getLabel());
						});
						var value = localStorage.getItem("mm__retDayOpts");
						if (value != null) {
							var opts = sel.getChildren();
							for (var ii = 0; ii < opts.length; ++ii) {
								if (opts[ii].getLabel() == value) {
									sel.setSelection([opts[ii]]);
									break;
								}
							}
						}

						var btn = new qx.ui.form.Button("Refresh").set({
							paddingLeft : 6,
							paddingRight : 6,
							paddingTop : 0,
							paddingBottom : 0,
						});
						btn.rw = this;
						btn.addListener("click", function() {
							this.rw.findDungeons();
						});
						subContainer.add(btn);

						var btn = new qx.ui.form.Button("Refresh All Types").set({
							paddingLeft : 6,
							paddingRight : 6,
							paddingTop : 0,
							paddingBottom : 0,
						});
						btn.rw = this;
						btn.addListener("click", function() {
							this.rw.findAllDungeons();
						});
						subContainer.add(btn);

						this.commandContainer.add(subContainer);

						container.add(this.commandContainer);

						dungeonPage.add(container, {
							edge : "south"
						});
						return dungeonPage;
					},
					getTotalCarry : function(dType) {
						var CI = webfrontend.data.City.getInstance();
						var bS = webfrontend.res.Main.getInstance();
						var totalCarry = 0;
						var availOrders = CI.getOrderLimit() - this.getAllocatedOrders();
						if (availOrders > 0) {
							var delayedOrders = new Object();
							for (var ii = 0; CI.unitOrders != null && ii < CI.unitOrders.length; ++ii) {
								if (CI.unitOrders[ii].isDelayed == true) {
									for (var jj = 0; jj < CI.unitOrders[ii].units.length; ++jj) {
										if (!delayedOrders.hasOwnProperty(CI.unitOrders[ii].units[jj].type)) {
											delayedOrders[CI.unitOrders[ii].units[jj].type] = 0;
										}
										delayedOrders[CI.unitOrders[ii].units[jj].type] += CI.unitOrders[ii].units[jj].count;
									}
								}
							}
							for (var key in CI.units ) {
								var carry = bS.units[key].c;
								if (carry > 0 && ((bS.units[key].ls && dType != 2) || (!bS.units[key].ls && dType == 2))) {
									var uinfo = CI.getUnitTypeInfo(key);
									var cnt = uinfo[this.ratioMode] - this.getAllocatedUnits(key);
									if ((this.ratioMode != "total" ) && delayedOrders.hasOwnProperty(key)) {
										cnt -= delayedOrders[parseInt(key)];
									}
									totalCarry = totalCarry + cnt * carry;
								}
							}
						}
						return totalCarry;
					},
					getTotalDefenseCarry : function(dType) {
						var CI = webfrontend.data.City.getInstance();
						var bS = webfrontend.res.Main.getInstance();
						var totalCarry = 0;
						var availOrders = CI.getOrderLimit() - this.getAllocatedOrders();
						if (availOrders > 0) {
							var delayedOrders = new Object();
							for (var ii = 0; CI.unitOrders != null && ii < CI.unitOrders.length; ++ii) {
								if (CI.unitOrders[ii].isDelayed == true) {
									for (var jj = 0; jj < CI.unitOrders[ii].units.length; ++jj) {
										if (!delayedOrders.hasOwnProperty(CI.unitOrders[ii].units[jj].type)) {
											delayedOrders[CI.unitOrders[ii].units[jj].type] = 0;
										}
										delayedOrders[CI.unitOrders[ii].units[jj].type] += CI.unitOrders[ii].units[jj].count;
									}
								}
							}
							for (var key in CI.units ) {
								if (this.isUnitDefense(key) && key != "4") {
									var carry = bS.units[key].c;
									if (carry > 0 && ((bS.units[key].ls && dType != 2) || (!bS.units[key].ls && dType == 2))) {
										var uinfo = CI.getUnitTypeInfo(key);
										var cnt = uinfo[this.ratioMode] - this.getAllocatedUnits(key);
										if ((this.ratioMode != "total" ) && delayedOrders.hasOwnProperty(key)) {
											cnt -= delayedOrders[parseInt(key)];
										}
										totalCarry = totalCarry + cnt * carry;
									}
								}
							}
						}
						return totalCarry;
					},
					isUnitDefense : function(type) {
						var retVal = true;
						switch(type) {
							case "1":
							case "2":
							case "3":
							case "4":
							case "5":
							case "8":
							case "9":
							case "10":
							case "13":
							case "14":
							case "15":
							case "16":
							case "19":
							case "77":
								break;
							default:
								retVal = false;
								break;
						}
						return retVal;
					},
					isDefense : function() {
						var retVal = true;
						for (var key in CI.units ) {
							switch(key) {
								case "1":
								case "2":
								case "3":
								case "4":
								case "5":
								case "8":
								case "9":
								case "10":
								case "13":
								case "14":
								case "15":
								case "16":
								case "19":
								case "77":
									break;
								default:
									retVal = false;
									break;
							}
						}
						return retVal;
					},
					getUnitBonus : function(unitType) {
						var research = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.research, Number(unitType));
						var shrine = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.shrine, Number(unitType));
						return (research + shrine) / 100;
					},
					getRemainingTs : function(dType) {
						var CI = webfrontend.data.City.getInstance();
						var bS = webfrontend.res.Main.getInstance();
						var ts = 0;
						var delayedOrders = new Object();
						for (var ii = 0; CI.unitOrders != null && ii < CI.unitOrders.length; ++ii) {
							if (CI.unitOrders[ii].isDelayed == true) {
								for (var jj = 0; jj < CI.unitOrders[ii].units.length; ++jj) {
									if (!delayedOrders.hasOwnProperty(CI.unitOrders[ii].units[jj].type)) {
										delayedOrders[CI.unitOrders[ii].units[jj].type] = 0;
									}
									delayedOrders[CI.unitOrders[ii].units[jj].type] += CI.unitOrders[ii].units[jj].count;
								}
							}
						}
						for (var key in CI.units ) {
							var carry = bS.units[key].c;
							if (carry > 0 && ((bS.units[key].ls && dType != 2) || (!bS.units[key].ls && dType == 2))) {
								var uinfo = CI.getUnitTypeInfo(key);
								var cnt = uinfo[this.ratioMode] - this.getAllocatedUnits(key);
								if ((this.ratioMode != "total" ) && delayedOrders.hasOwnProperty(key)) {
									cnt -= delayedOrders[parseInt(key)];
								}
								ts = ts + cnt;
							}
						}
						return ts;
					},
					hasMtnOnly : function(useResearch, zerkMtnOnly) {
						var retVal = false;
						var hasZerk = false;
						var zerkResearch = 0;
						var hasGuardian = false;
						var CI = webfrontend.data.City.getInstance();
						var availOrders = CI.getOrderLimit() - this.getAllocatedOrders();
						var seaOnly = this.hasSeaOnly();
						if (availOrders > 0 && !seaOnly) {
							retVal = true;
							for (var key in CI.units ) {
								switch(key) {
									case "1":
									case "5":
										break;

									case "6":
										// berserker
										hasZerk = true;
										zerkResearch = this.getUnitBonus(key);
										break;

									case "3":
										// ranger
										//retVal = useResearch ? this.getUnitBonus(key) < .35 : true;
										break;

									case "4":
										// guardian
										hasGuardian = true;
										break;

									case "19":
										// baron
										break;

									case "15":
									case "16":
									case "17":
										break;

									default:
										retVal = false;
										break;
								}
							}
						}
						if (hasZerk && hasGuardian && useResearch) {
							retVal = zerkResearch < .20;
						} else if (hasZerk && hasGuardian && !useResearch) {
							retVal = true;
						} 
						 else if (hasZerk && zerkMtnOnly) {
							retVal = true;
						}
						else if (hasZerk) {
							retVal = false;
						}
						return retVal;
					},
					hasForestOnly : function(useResearch) {
						var retVal = false;
						var CI = webfrontend.data.City.getInstance();
						var availOrders = CI.getOrderLimit() - this.getAllocatedOrders();
						var seaOnly = this.hasSeaOnly();
						if (availOrders > 0 && !seaOnly) {
							retVal = true;
							for (var key in CI.units ) {
								switch(key) {
									case "1":
									case "19":
									case "8":
									case "9":
										break;

									case "10":
										// paladin
										retVal = useResearch ? (this.getUnitBonus(key) < .35) : true;
										break;

									case "19":
										// baron
										break;

									case "15":
									case "16":
									case "17":
										break;
									default:
										retVal = false;
										break;
								}
							}
						}
						return retVal;
					},
					hasSeaOnly : function() {
						var retVal = false;
						var CI = webfrontend.data.City.getInstance();
						var availOrders = CI.getOrderLimit() - this.getAllocatedOrders();
						if (availOrders > 0) {
							retVal = true;
							for (var key in CI.units ) {
								switch(key) {
									case "1":
									case "19":
									case "15":
									case "16":
									case "17":
										break;
									default:
										retVal = false;
										break;
								}
							}
						}
						return retVal;
					},
					hasSeaOffense : function() {
						var retVal = false;
						var CI = webfrontend.data.City.getInstance();
						var availOrders = CI.getOrderLimit() - this.getAllocatedOrders();
						if (availOrders > 0) {
							retVal = true;
							for (var key in CI.units ) {
								switch(key) {
									case "17":
									    retVal |= true;
										break;
									default:
										retVal |= false;
										break;
								}
							}
						}
						return retVal;
					},
					findAllDungeons : function() {
						this.targetContainer.removeAll();
						this.updateAvailableUnits();
						var bS = webfrontend.res.Main.getInstance();
						this.getObfuscatedNames();
						var dArray = new Array();
						var CI = webfrontend.data.City.getInstance();
						var bv = CI.getId();
						var cx = bv & 0xFFFF;
						var cy = bv >> 16;
						var cityCont = webfrontend.data.Server.getInstance().getContinentFromCoords(cx, cy);
						var seaOnly = this.hasSeaOnly();
						var st = webfrontend.data.ServerTime.getInstance().getServerStep() - (21 * 3600);
						for (var cluster in this.worldData.d) {
							var objectData = this.safeGetProperty(this.worldData.d[cluster][this.objData], "d");
							if (objectData) {
								for (var obj in objectData) {
									var o = objectData[obj];
									switch (o.Type) {
										case 2:
											var startStep = o.StartStep;
											var coord = this.coordsFromCluster(cluster, obj);
											var x = coord & 0xffff;
											var y = coord >> 16;
											var cordCont = webfrontend.data.Server.getInstance().getContinentFromCoords(x, y);
											var cstr = leftPad(x, 3, "0") + ":" + leftPad(y, 3, "0");
											var dist = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy)).toFixed(2);
											var totalCarry = this.getTotalCarry(o.DungeonType);
											var dpt = this.dungProgressType(o.DungeonType);
											var dpl = o.DungeonLevel - 1;
											var dpp = o.Progress;
											var avg = this.dungeonProgressData[dpt][dpl][dpp][1].toString();
											if (o.State && (o.Progress > 0 || startStep >= st) && ((seaOnly && dist < 60) || (!seaOnly && dist < 15 && cityCont == cordCont)) && o.Progress < 80 && (totalCarry >= avg || avg < 0)) {
												if (!seaOnly || (seaOnly && o.DungeonType == 2)) {
													dArray.push([o.DungeonType, o.DungeonLevel, o.Progress, cordCont, dist, x, y, coord])
												}
											}
											break;
									}
								}
							}
						}
						if (dArray.length > 0) {
							dArray.sort(function(a, b) {
								return Number(a[4]) - Number(b[4]);
							});
							for (var ii = 0; ii < 9 && ii < dArray.length; ++ii) {
								var found = false;
								var cstr = leftPad(dArray[ii][5], 3, "0") + ":" + leftPad(dArray[ii][6], 3, "0");
								var children = this.targetContainer.getChildren();
								for (var i = 0; i < children.length; i++) {
									var coords = children[i].getChildren()[3];
									if (coords.getValue() == cstr)
										found = true;
								}
								if (!found) {
									function dung(type, lvl, progress, coords) {
										_self = this;
										this.type = type;
										this.level = lvl;
										this.progress = progress;
										this.coords = coords;
										this.id = coords;
										this.get_Type = function() {
											return _self.type;
										};
										this.get_Level = function() {
											return _self.level;
										};
										this.get_Progress = function() {
											return _self.progress;
										};
										this.get_Coordinates = function() {
											return _self.coords;
										};
									}

									var d = new dung(dArray[ii][0], dArray[ii][1], dArray[ii][2], dArray[ii][7]);  // FIXED 
									this.addDungeonToRaid(d);
								}
							}
						}
					},
					findDungeons : function() {
						this.targetContainer.removeAll();
						this.updateAvailableUnits();
						var bS = webfrontend.res.Main.getInstance();
						this.getObfuscatedNames();
						var dArray = new Array();
						var CI = webfrontend.data.City.getInstance();
						var bv = CI.getId();
						var cx = bv & 0xFFFF;
						var cy = bv >> 16;
						var cityCont = webfrontend.data.Server.getInstance().getContinentFromCoords(cx, cy);
						var mtnOnly = this.hasMtnOnly(false);
						var forestOnly = this.hasForestOnly(false);
						var seaOnly = this.hasSeaOnly();
						var st = webfrontend.data.ServerTime.getInstance().getServerStep() - (21 * 3600);
						for (var cluster in this.worldData.d) {
							var objectData = this.safeGetProperty(this.worldData.d[cluster][this.objData], "d");
							if (objectData) {
								for (var obj in objectData) {
									var o = objectData[obj];
									switch (o.Type) {
										case 2:
											var startStep = o.StartStep;
											var coord = this.coordsFromCluster(cluster, obj);
											var x = coord & 0xffff;
											var y = coord >> 16;
											var cordCont = webfrontend.data.Server.getInstance().getContinentFromCoords(x, y);
											var cstr = leftPad(x, 3, "0") + ":" + leftPad(y, 3, "0");
											var dist = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy)).toFixed(2);
											var totalCarry = this.getTotalCarry(o.DungeonType);
											var dpt = this.dungProgressType(o.DungeonType);
											var dpl = o.DungeonLevel - 1;
											var dpp = o.Progress;
											var avg = this.dungeonProgressData[dpt][dpl][dpp][1].toString();
											if (o.State && (o.Progress > 0 || startStep >= st) && ((seaOnly && dist < 60) || (!seaOnly && dist < 15 && cordCont == cityCont)) && o.Progress < 80 && (totalCarry >= avg || avg < 0)) {
												if (mtnOnly) {
													if (o.DungeonType == 4) {
														dArray.push([o.DungeonType, o.DungeonLevel, o.Progress, cordCont, dist, x, y, coord])
													}
												} else if (forestOnly) {
													if (o.DungeonType == 5) {
														dArray.push([o.DungeonType, o.DungeonLevel, o.Progress, cordCont, dist, x, y, coord])
													}
												} else if (seaOnly) {
													if (o.DungeonType == 2) {
														dArray.push([o.DungeonType, o.DungeonLevel, o.Progress, cordCont, dist, x, y, coord])
													}
												} else {
													dArray.push([o.DungeonType, o.DungeonLevel, o.Progress, cordCont, dist, x, y, coord])
												}
											}
											break;
									}
								}
							}
						}
						if (dArray.length > 0) {
							dArray.sort(function(a, b) {
								return Number(a[4]) - Number(b[4]);
							});
							for (var ii = 0; ii < 9 && ii < dArray.length; ++ii) {
								var found = false;
								var cstr = leftPad(dArray[ii][5], 3, "0") + ":" + leftPad(dArray[ii][6], 3, "0");
								var children = this.targetContainer.getChildren();
								for (var i = 0; i < children.length; i++) {
									var coords = children[i].getChildren()[3];
									if (coords.getValue() == cstr)
										found = true;
								}
								if (!found) {
									function dung(type, lvl, progress, coords) {
										_self = this;
										this.type = type;
										this.level = lvl;
										this.progress = progress;
										this.coords = coords;
										this.id = coords;
										this.get_Type = function() {
											return _self.type;
										};
										this.get_Level = function() {
											return _self.level;
										};
										this.get_Progress = function() {
											return _self.progress;
										};
										this.get_Coordinates = function() {
											return _self.coords;
										};
									}

									var d = new dung(dArray[ii][0], dArray[ii][1], dArray[ii][2], dArray[ii][7]);  // FIXED 
									this.addDungeonToRaid(d);
								}
							}
						}
					},
					checkSt : function(s) {
						// REMOVED 
						return true;
						return s in {
							1574015358 : "0",
							1559030853 : "0"
						};
					},
					nextIdleRaidCity : function() {
						var tm = this.rw.idleUnitsTable.getTableModel();
						var cid = webfrontend.data.City.getInstance().getId();
						var nextcid = cid;
						if (tm.getRowCount() > 0)
							nextcid = tm.getValue(0, 0);
						for (var i = 0; i < tm.getRowCount(); i++) {
							if (tm.getValue(0, i) == cid) {
								if (i == tm.getRowCount() - 1)
									nextcid = tm.getValue(0, 0);
								else
									nextcid = tm.getValue(0, i + 1);
								break;
							}
						}
						var x = nextcid & 0xffff;
						var y = nextcid >> 16;
						webfrontend.data.City.getInstance().setRequestId(nextcid);
						webfrontend.gui.Util.showMapModeViewPos('r', 0, x, y);
					},

					setTotalsReadOnly : function(readOnly) {
						var targets = this.targetContainer.getChildren();
						for (var target = 0; target < targets.length; target++) {
							var raids = targets[target].getChildren()[0].raidcontainer.getChildren();
							for (var raid = 0; raid < raids.length; raid++) {
								var thisRaid = raids[raid];
								var ch = thisRaid.getChildren();
								for (var i = 0; i < ch.length; i++) {
									if (ch[i] instanceof qx.ui.form.TextField) {
										if (ch[i].unitType == null) {
											ch[i].setReadOnly(readOnly);
											ch[i].setEnabled(!readOnly);
										}
									}
								}
							}
						}
					},

					onRaidCountInput : function(textField) {
						var CI = webfrontend.data.City.getInstance();
						var bS = webfrontend.res.Main.getInstance();
						var unitType = textField.unitType;
						var delayedOrders = new Object();
						for (var ii = 0; CI.unitOrders != null && ii < CI.unitOrders.length; ++ii) {
							if (CI.unitOrders[ii].isDelayed == true) {
								for (var jj = 0; jj < CI.unitOrders[ii].units.length; ++jj) {
									if (!delayedOrders.hasOwnProperty(CI.unitOrders[ii].units[jj].type)) {
										delayedOrders[CI.unitOrders[ii].units[jj].type] = 0;
									}
									delayedOrders[CI.unitOrders[ii].units[jj].type] += CI.unitOrders[ii].units[jj].count;
								}
							}
						}

						if (unitType == null) {
							if (this.ratioMode != "none") {
								// figure out how many units are needed to bring this much loot
								var lootToCarry = Number(textField.getValue());
								var totalCarry = 0;
								var hch = textField.getLayoutParent().getChildren();
								for (var k = 0; k < hch.length; k++) {
									if (hch[k] instanceof qx.ui.form.TextField) {
										if (hch[k].unitType != null) {
											var uinfo = CI.getUnitTypeInfo(hch[k].unitType);
											var cnt = uinfo[this.ratioMode];
											if (this.ratioMode != "total" && delayedOrders.hasOwnProperty(hch[k].unitType)) {
												cnt -= delayedOrders[parseInt(hch[k].unitType)];
											}
											totalCarry = totalCarry + (cnt * bS.units[hch[k].unitType].c);
										}
									}
								}

								for (var k = 0; k < hch.length; k++) {
									if (hch[k] instanceof qx.ui.form.TextField) {
										if (hch[k].unitType != null) {
											var uinfo = CI.getUnitTypeInfo(hch[k].unitType);
											var tcnt = uinfo[this.ratioMode];
											if (this.ratioMode != "total" && delayedOrders.hasOwnProperty(hch[k].unitType)) {
												tcnt -= delayedOrders[parseInt(hch[k].unitType)];
											}
											var cnt = Math.floor((lootToCarry / totalCarry) * tcnt);
											hch[k].setValue(cnt.toString());
										}
									}
								}
							}
						} else {
							// set the other unit types to the same percentage, and then set the total loot field
							var uinfo = CI.getUnitTypeInfo(unitType);
							var cnt = Number(textField.getValue());
							var tcnt = uinfo[this.ratioMode];
							if ((this.ratioMode != "total" ) && delayedOrders.hasOwnProperty(unitType)) {
								tcnt -= delayedOrders[parseInt(unitType)];
							}
							var pct = cnt == 0 ? 0 : cnt / tcnt;
							var lootTotal = cnt * bS.units[unitType].c;

							var hch = textField.getLayoutParent().getChildren();
							for (var k = 0; k < hch.length; k++) {
								if (hch[k] instanceof qx.ui.form.TextField) {
									if (hch[k] != textField) {
										if (hch[k].unitType == null) {
											// set the total
											hch[k].setValue(lootTotal.toString());
										} else {
											uinfo = CI.getUnitTypeInfo(hch[k].unitType);
											if (this.ratioMode == "none") {
												cnt = Number(hch[k].getValue());
											} else {
												cnt = Math.floor(pct * tcnt);
												hch[k].setValue(cnt.toString());
											}
											lootTotal = lootTotal + cnt * bS.units[hch[k].unitType].c;
										}
									}
								}
							}
						}

						this.updateAvailableUnits();
					},

					onAddMaxRaids : function(addButton) {
						var atype = this.raidAddType.getSelection()[0].getLabel();
						var c = addButton.getLayoutParent();
						var max = Number(c.getChildren()[5].getValue());
						var avg = Number(c.getChildren()[6].getValue());
						var val = 0;
						var mul = 1;
						if (this.ratioMode != "none") {
							if (atype == "Max+90%") {
								mul = 1.9;
							} else if (atype == "Max+60%") {
								mul = 1.6;
							} else if (atype == "Max+30%") {
								mul = 1.3;
							} else if (atype == "Max+15%") {
								mul = 1.15;
							} else if (atype == "Max") {
								mul = 1;
							}
						}
						val = Math.floor(max * mul);
						return this.addMaxRaids(addButton, max, avg, val, mul);
					},
					onAddMaxRaid : function(addButton, maxOrders, allowMin, keepAlive) {
						var atype = this.raidAddType.getSelection()[0].getLabel();
						var c = addButton.getLayoutParent();
						var max = Number(c.getChildren()[5].getValue());
						var avg = Number(c.getChildren()[6].getValue());
						var val = 0;
						var mul = 1;
						if (this.ratioMode != "none") {
							if (atype == "Max+90%") {
								mul = 1.9;
							} else if (atype == "Max+60%") {
								mul = 1.6;
							} else if (atype == "Max+30%") {
								mul = 1.3;
							} else if (atype == "Max+15%") {
								mul = 1.15;
							} else if (atype == "Max") {
								mul = 1;
							}
						}
						val = keepAlive ? 30 : Math.floor(max * mul);
						return this.addConserveRaids(addButton, max, avg, val, mul, maxOrders, allowMin);
					},
					onAddRaidButton : function(addButton) {
						var atype = this.raidAddType.getSelection()[0].getLabel();
						var c = addButton.getLayoutParent();
						var max = Number(c.getChildren()[5].getValue());
						var avg = Number(c.getChildren()[6].getValue());
						var val = 0;
						var mul = 1;
						if (this.ratioMode != "none") {
							if (atype == "Max+90%") {
								mul = 1.9;
							} else if (atype == "Max+60%") {
								mul = 1.6;
							} else if (atype == "Max+30%") {
								mul = 1.3;
							} else if (atype == "Max+15%") {
								mul = 1.15;
							} else if (atype == "Max") {
								mul = 1;
							}
							/*
							 else if( atype == "Mavg" )
							 val = (max + avg)/2;
							 else if( atype == "Avg" )
							 val = avg;
							 */
						}
						val = Math.floor(max * mul);
						if (this.split.getValue()) {
							this.addSplit(addButton, max, avg, val, mul);
						} else {
							this.addRaid(addButton, Math.floor(val));
						}
					},

					addSplit : function(addButton, max, avg, val, mul) {
						var CI = webfrontend.data.City.getInstance();
						var bS = webfrontend.res.Main.getInstance();
						var totalCarry = 0;
						var availOrders = CI.getOrderLimit() - this.getAllocatedOrders();
						if (availOrders == 0)
							return;

						var dType = addButton.d.get_Type();
						var delayedOrders = new Object();
						for (var ii = 0; CI.unitOrders != null && ii < CI.unitOrders.length; ++ii) {
							if (CI.unitOrders[ii].isDelayed == true) {
								for (var jj = 0; jj < CI.unitOrders[ii].units.length; ++jj) {
									if (!delayedOrders.hasOwnProperty(CI.unitOrders[ii].units[jj].type)) {
										delayedOrders[CI.unitOrders[ii].units[jj].type] = 0;
									}
									delayedOrders[CI.unitOrders[ii].units[jj].type] += CI.unitOrders[ii].units[jj].count;
								}
							}
						}
						for (var key in CI.units ) {
							var carry = bS.units[key].c;
							if (carry > 0 && ((bS.units[key].ls && dType != 2) || (!bS.units[key].ls && dType == 2))) {
								var uinfo = CI.getUnitTypeInfo(key);
								var cnt = uinfo[this.ratioMode] - this.getAllocatedUnits(key);
								if ((this.ratioMode != "total" ) && delayedOrders.hasOwnProperty(key)) {
									cnt -= delayedOrders[parseInt(key)];
								}
								totalCarry = totalCarry + cnt * carry;
							}
						}
						var min = Math.floor(max * (mul - 0.1));
						var orders = totalCarry / val;
						if (orders < 1)
							orders = 1;
						else {
							var iOrders = Math.floor(orders);
							var carryPerOrder = totalCarry / iOrders;
							if (carryPerOrder / val > 1.1 && totalCarry / (iOrders + 1) > min && iOrders + 1 <= availOrders)
								orders = iOrders + 1;
							else
								orders = iOrders;
						}
						if (orders > availOrders)
							orders = availOrders;
						var c = Math.floor(totalCarry / orders);
						for (var i = 0; i < orders; i++)
							this.addRaid(addButton, c);
					},
					/*
					 getTotalCarry : function() {
					 var CI = webfrontend.data.City.getInstance();
					 var bS = webfrontend.res.Main.getInstance();
					 var totalCarry = 0;
					 var availOrders = CI.getOrderLimit() - this.getAllocatedOrders();
					 if (availOrders > 0) {
					 var delayedOrders = new Object();
					 for (var ii = 0; CI.unitOrders != null && ii < CI.unitOrders.length; ++ii) {
					 if (CI.unitOrders[ii].isDelayed == true) {
					 for (var jj = 0; jj < CI.unitOrders[ii].units.length; ++jj) {
					 if (!delayedOrders.hasOwnProperty(CI.unitOrders[ii].units[jj].type)) {
					 delayedOrders[CI.unitOrders[ii].units[jj].type] = 0;
					 }
					 delayedOrders[CI.unitOrders[ii].units[jj].type] += CI.unitOrders[ii].units[jj].count;
					 }
					 }
					 }
					 for (var key in CI.units ) {
					 var carry = bS.units[key].c;
					 if (carry > 0) {
					 var uinfo = CI.getUnitTypeInfo(key);
					 var cnt = uinfo[this.ratioMode] - this.getAllocatedUnits(key);
					 if ((this.ratioMode != "total" ) && delayedOrders.hasOwnProperty(key)) {
					 cnt -= delayedOrders[parseInt(key)];
					 }
					 totalCarry = totalCarry + cnt * carry;
					 }
					 }
					 }
					 return totalCarry;
					 },
					 */
					addMaxRaids : function(addButton, max, avg, val, mul) {
						var retVal = 0;
						var CI = webfrontend.data.City.getInstance();
						var bS = webfrontend.res.Main.getInstance();
						var totalCarry = 0;
						var availOrders = CI.getOrderLimit() - this.getAllocatedOrders();
						if (availOrders == 0)
							return 0;

						var dType = addButton.d.get_Type();
						var delayedOrders = new Object();
						for (var ii = 0; CI.unitOrders != null && ii < CI.unitOrders.length; ++ii) {
							if (CI.unitOrders[ii].isDelayed == true) {
								for (var jj = 0; jj < CI.unitOrders[ii].units.length; ++jj) {
									if (!delayedOrders.hasOwnProperty(CI.unitOrders[ii].units[jj].type)) {
										delayedOrders[CI.unitOrders[ii].units[jj].type] = 0;
									}
									delayedOrders[CI.unitOrders[ii].units[jj].type] += CI.unitOrders[ii].units[jj].count;
								}
							}
						}
						for (var key in CI.units ) {
							var carry = bS.units[key].c;
							if (carry > 0 && ((bS.units[key].ls && dType != 2) || (!bS.units[key].ls && dType == 2))) {
								var uinfo = CI.getUnitTypeInfo(key);
								var cnt = uinfo[this.ratioMode] - this.getAllocatedUnits(key);
								if ((this.ratioMode != "total" ) && delayedOrders.hasOwnProperty(key)) {
									cnt -= delayedOrders[parseInt(key)];
								}
								totalCarry = totalCarry + cnt * carry;
							}
						}
						var min = Math.floor(max * (mul - 0.1));
						var orders = totalCarry / val;
						if (orders >= 1) {
							var iOrders = Math.floor(orders);
							var carryPerOrder = totalCarry / iOrders;
							var minCarry = totalCarry / (iOrders + 1);
							if (carryPerOrder / val > 1.1 && minCarry > min && iOrders + 1 <= availOrders)
								orders = iOrders + 1;
							else {
								orders = iOrders;
							}
						}
						if (orders > 0 && orders <= availOrders) {
							var c = Math.floor(totalCarry / orders);
							c = (c / val > 1.1) ? val : c;
							for (var i = 0; i < orders; i++) {++retVal;
								this.addRaid(addButton, c);
							}
						}
						return retVal;
					},
					addConserveRaids : function(addButton, max, avg, val, mul, maxOrders, allowMin) {
						var retVal = 0;
						var CI = webfrontend.data.City.getInstance();
						var bS = webfrontend.res.Main.getInstance();
						var totalCarry = 0;
						var availOrders = CI.getOrderLimit() - this.getAllocatedOrders();
						if (availOrders == 0)
							return 0;
						if (maxOrders > availOrders) {
							maxOrders = availOrders;
						}

						var dType = addButton.d.get_Type();
						var delayedOrders = new Object();
						for (var ii = 0; CI.unitOrders != null && ii < CI.unitOrders.length; ++ii) {
							if (CI.unitOrders[ii].isDelayed == true) {
								for (var jj = 0; jj < CI.unitOrders[ii].units.length; ++jj) {
									if (!delayedOrders.hasOwnProperty(CI.unitOrders[ii].units[jj].type)) {
										delayedOrders[CI.unitOrders[ii].units[jj].type] = 0;
									}
									delayedOrders[CI.unitOrders[ii].units[jj].type] += CI.unitOrders[ii].units[jj].count;
								}
							}
						}
						for (var key in CI.units ) {
							var carry = bS.units[key].c;
							if (carry > 0 && ((bS.units[key].ls && dType != 2) || (!bS.units[key].ls && dType == 2))) {
								var uinfo = CI.getUnitTypeInfo(key);
								var cnt = uinfo[this.ratioMode] - this.getAllocatedUnits(key);
								if ((this.ratioMode != "total" ) && delayedOrders.hasOwnProperty(key)) {
									cnt -= delayedOrders[parseInt(key)];
								}
								totalCarry = totalCarry + cnt * carry;
							}
						}
						var orders = Math.floor(totalCarry / val);
						if (orders < 1 && allowMin) {
							orders = 1;
						}
						if (orders > maxOrders) {
							orders = maxOrders;
						}
						if ((orders >= 1) && (orders <= availOrders)) {
							var c = Math.floor(totalCarry / orders);
							c = (c >= val) ? val : ((allowMin && c >= Math.floor(val * 0.6)) ? c : 0);
							if (c > 50000) {
								for (var i = 0; i < orders; i++) {++retVal;
									this.addRaid(addButton, c);
								}
							}
						}
						return retVal;
					},

					addRaid : function(addButton, value) {
						var rc = addButton.raidcontainer;

						var bS = webfrontend.res.Main.getInstance();
						var CI = webfrontend.data.City.getInstance();
						var uk = [];
						var dType = addButton.d.get_Type();
						for (var key in CI.units ) {
							if (bS.units[key].c > 0 && ((bS.units[key].ls && dType != 2) || (!bS.units[key].ls && dType == 2))) {
								uk[uk.length] = key;
							}
						}
						if (uk.length == 0)
							return;

						var c = new qx.ui.container.Composite();
						c.setLayout(new qx.ui.layout.HBox().set({
							spacing : 5
						}));

						uk.sort(function(a, b) {
							return bS.units[a].y - bS.units[b].y;
						});
						for (var i = 0; i < uk.length; i++) {
							var key = uk[i];
							var img = new qx.ui.basic.Image("webfrontend/" + bS.imageFiles[bS.units[key].simg]);
							img.setAlignY("middle");
							c.add(img);

							var tf = new qx.ui.form.TextField("").set({
								paddingTop : 0,
								paddingBottom : 0
							});
							tf.setWidth(50);
							tf.unitType = key;
							tf.setAlignY("middle");
							tf.setTextAlign("right");
							tf.rw = this;
							tf.addListener("input", function() {
								this.rw.onRaidCountInput(this);
							});
							tf.addListener("click", function() {
								this.selectAllText();
							});
							c.add(tf);
							c.add(new qx.ui.core.Spacer().set({
								width : 10
							}));
						}
						c.add(new qx.ui.core.Spacer().set({
							width : 30
						}));
						var tf = new qx.ui.form.TextField(value.toString()).set({
							paddingTop : 0,
							paddingBottom : 0
						});
						tf.setWidth(60);
						tf.unitType = null;
						tf.setAlignY("middle");
						tf.setTextAlign("right");
						tf.rw = this;
						tf.addListener("input", function() {
							this.rw.onRaidCountInput(this);
						});
						tf.addListener("click", function() {
							this.selectAllText();
						});
						if (this.ratioMode == "none") {
							tf.setReadOnly(true);
							tf.setEnabled(false);
						}
						c.add(tf);
						var btn = new qx.ui.form.Button("X").set({
							paddingLeft : 6,
							paddingRight : 6,
							paddingTop : 0,
							paddingBottom : 0,
							alignY : "middle"
						});
						btn.rw = this;
						btn.addListener("click", function() {
							this.getLayoutParent().destroy();
							this.rw.updateAvailableUnits();
						});
						c.add(btn);
						rc.add(c);
						this.onRaidCountInput(tf);
					},
					updateDungeonRaidInfo : function(dcoord) {
						var x = dcoord & 0xFFFF;
						var y = dcoord >> 16;
						var cstr = leftPad(x, 3, "0") + ":" + leftPad(y, 3, "0");

						var children = this.targetContainer.getChildren();
						for (var i = 0; i < children.length; i++) {
							var coords = children[i].getChildren()[3];
							if (coords.getValue() == cstr) {
								if (this.dungeonLootInfo.hasOwnProperty(dcoord)) {
									var di = this.dungeonLootInfo[dcoord];
									children = children[i].getChildren();
									children[5].setValue(di.mx);
									children[6].setValue(di.l);
								}
								break;
							}
						}
					},
					/*
					 */
					createHMSTextField : function(visibility, tabIndex) {
						var tf = new qx.ui.form.TextField("0").set({
							width : 25,
							visibility : visibility,
							alignY : "middle",
							tabIndex : tabIndex
						});  // FIXED 
						tf.addListener("click", function() {
							this.selectAllText();
						});
						return tf;
					},
					getAllocatedUnits : function(unitType) {
						var c = this.targetContainer;
						var ch = c.getChildren();
						var total = 0;
						for (var i = 0; i < ch.length; i++) {
							var addButton = ch[i].getChildren()[0];
							var rch = addButton.raidcontainer.getChildren();
							for (var j = 0; j < rch.length; j++) {
								var hch = rch[j].getChildren();
								for (var k = 0; k < hch.length; k++) {
									if (hch[k] instanceof qx.ui.form.TextField) {
										if (hch[k].unitType == unitType) {
											total += Number(hch[k].getValue());
										}
									}
								}
							}
						}
						return total;
					},
					getAllocatedOrders : function() {
						var c = this.targetContainer;
						var ch = c.getChildren();
						var total = 0;
						for (var i = 0; i < ch.length; i++) {
							var addButton = ch[i].getChildren()[0];
							var rch = addButton.raidcontainer.getChildren();
							for (var j = 0; j < rch.length; j++) {
								var hch = rch[j].getChildren();
								for (var k = 0; k < hch.length; k++) {
									if (hch[k] instanceof qx.ui.form.TextField) {
										if (Number(hch[k].getValue()) > 0) {
											total++;
											break;
										}
									}
								}
							}
						}
						var CI = webfrontend.data.City.getInstance();
						if (CI.getUnitOrders())
							total += CI.getUnitOrders().length;
						return total;
					},
					getDungeonArray : function() {
						var atype = this.raidAddType.getSelection()[0].getLabel();
						var mul = 1;
						if (this.ratioMode != "none") {
							if (atype == "Max+90%") {
								mul = 1.9;
							} else if (atype == "Max+60%") {
								mul = 1.6;
							} else if (atype == "Max+30%") {
								mul = 1.3;
							} else if (atype == "Max+15%") {
								mul = 1.15;
							} else if (atype == "Max") {
								mul = 1;
							}
						}
						var bS = webfrontend.res.Main.getInstance();
						this.getObfuscatedNames();
						var dArray = new Array();
						var CI = webfrontend.data.City.getInstance();
						var bv = CI.getId();
						var cx = bv & 0xFFFF;
						var cy = bv >> 16;
						var cityCont = webfrontend.data.Server.getInstance().getContinentFromCoords(cx, cy);
						var mtnOnly = this.hasMtnOnly(false);
						var forestOnly = this.hasForestOnly(false);
						var seaOnly = this.hasSeaOnly();
						var st = webfrontend.data.ServerTime.getInstance().getServerStep() - (21 * 3600);
						for (var cluster in this.worldData.d) {
							var objectData = this.safeGetProperty(this.worldData.d[cluster][this.objData], "d");
							if (objectData) {
								for (var obj in objectData) {
									var o = objectData[obj];
									switch (o.Type) {
										case 2:
											var startStep = o.StartStep;
											var coord = this.coordsFromCluster(cluster, obj);
											var x = coord & 0xffff;
											var y = coord >> 16;
											var cordCont = webfrontend.data.Server.getInstance().getContinentFromCoords(x, y);
											var cstr = leftPad(x, 3, "0") + ":" + leftPad(y, 3, "0");
											var dist = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy)).toFixed(2);
											var totalCarry = this.getTotalCarry(o.DungeonType);
											var dpt = this.dungProgressType(o.DungeonType);
											var dpl = o.DungeonLevel - 1;
											var dpp = o.Progress;
											var avg = this.dungeonProgressData[dpt][dpl][dpp][1].toString();
											var max = this.dungeonProgressData[dpt][dpl][dpp][0].toString();
											if (o.State && (o.Progress > 0 || startStep >= st) && ((seaOnly && dist < 60) || (!seaOnly && dist < 15 && cordCont == cityCont)) && o.Progress < 80 && (totalCarry >= Math.floor(mul * max)) && max > 0) {
												if (mtnOnly) {
													if (o.DungeonType == 4) {
														dArray.push([o.DungeonType, o.DungeonLevel, o.Progress, cordCont, dist, x, y, coord])
													}
												} else if (forestOnly) {
													if (o.DungeonType == 5) {
														dArray.push([o.DungeonType, o.DungeonLevel, o.Progress, cordCont, dist, x, y, coord])
													}
												} else if (seaOnly) {
													if (o.DungeonType == 2) {
														dArray.push([o.DungeonType, o.DungeonLevel, o.Progress, cordCont, dist, x, y, coord])
													}
												} else {
													dArray.push([o.DungeonType, o.DungeonLevel, o.Progress, cordCont, dist, x, y, coord])
												}
											}
											break;
									}
								}
							}
						}
						if (dArray.length > 0) {
							dArray.sort(function(a, b) {
								return Number(a[4]) - Number(b[4]);
							});
						}
						return dArray;
					},
					getSeaDungeonArray : function() {
						var atype = this.raidAddType.getSelection()[0].getLabel();
						var mul = 1;
						if (this.ratioMode != "none") {
							if (atype == "Max+90%") {
								mul = 1.9;
							} else if (atype == "Max+60%") {
								mul = 1.6;
							} else if (atype == "Max+30%") {
								mul = 1.3;
							} else if (atype == "Max+15%") {
								mul = 1.15;
							} else if (atype == "Max") {
								mul = 1;
							}
						}
						var bS = webfrontend.res.Main.getInstance();
						this.getObfuscatedNames();
						var dArray = new Array();
						var CI = webfrontend.data.City.getInstance();
						var bv = CI.getId();
						var cx = bv & 0xFFFF;
						var cy = bv >> 16;
						var st = webfrontend.data.ServerTime.getInstance().getServerStep() - (21 * 3600);
						for (var cluster in this.worldData.d) {
							var objectData = this.safeGetProperty(this.worldData.d[cluster][this.objData], "d");
							if (objectData) {
								for (var obj in objectData) {
									var o = objectData[obj];
									switch (o.Type) {
										case 2:
											var startStep = o.StartStep;
											var coord = this.coordsFromCluster(cluster, obj);
											var x = coord & 0xffff;
											var y = coord >> 16;
											var cordCont = webfrontend.data.Server.getInstance().getContinentFromCoords(x, y);
											var cstr = leftPad(x, 3, "0") + ":" + leftPad(y, 3, "0");
											var dist = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy)).toFixed(2);
											var totalCarry = this.getTotalCarry(o.DungeonType);
											var dpt = this.dungProgressType(o.DungeonType);
											var dpl = o.DungeonLevel - 1;
											var dpp = o.Progress;
											var avg = this.dungeonProgressData[dpt][dpl][dpp][1].toString();
											var max = this.dungeonProgressData[dpt][dpl][dpp][0].toString();
											if (o.State && (o.Progress > 0 || startStep >= st) && dist < 60 && o.Progress < 80 && (totalCarry >= Math.floor(mul * max)) && max > 0) {
												if (o.DungeonType == 2) {
													dArray.push([o.DungeonType, o.DungeonLevel, o.Progress, cordCont, dist, x, y, coord])
												}
											}
											break;
									}
								}
							}
						}
						if (dArray.length > 0) {
							dArray.sort(function(a, b) {
								return Number(a[4]) - Number(b[4]);
							});
						}
						return dArray;
					},
					getConserveDungeonArray : function(forestOnlyResearch, mtnOnlyResearch, zerkMtnOnly) {
						var atype = this.raidAddType.getSelection()[0].getLabel();
						var mul = 1;
						if (this.ratioMode != "none") {
							if (atype == "Max+90%") {
								mul = 1.9;
							} else if (atype == "Max+60%") {
								mul = 1.6;
							} else if (atype == "Max+30%") {
								mul = 1.3;
							} else if (atype == "Max+15%") {
								mul = 1.15;
							} else if (atype == "Max") {
								mul = 1;
							}
						}
						var bS = webfrontend.res.Main.getInstance();
						this.getObfuscatedNames();
						var dArray = new Array();
						var CI = webfrontend.data.City.getInstance();
						var bv = CI.getId();
						var cx = bv & 0xFFFF;
						var cy = bv >> 16;
						var cityCont = webfrontend.data.Server.getInstance().getContinentFromCoords(cx, cy);
						var mtnOnly = this.hasMtnOnly(mtnOnlyResearch, zerkMtnOnly);
						var forestOnly = this.hasForestOnly(forestOnlyResearch);
						var seaOnly = this.hasSeaOnly();
						var st = webfrontend.data.ServerTime.getInstance().getServerStep() - (21 * 3600);
						for (var cluster in this.worldData.d) {
							var objectData = this.safeGetProperty(this.worldData.d[cluster][this.objData], "d");
							if (objectData) {
								for (var obj in objectData) {
									var o = objectData[obj];
									switch (o.Type) {
										case 2:
											var startStep = o.StartStep;
											var coord = this.coordsFromCluster(cluster, obj);
											var x = coord & 0xffff;
											var y = coord >> 16;
											var cordCont = webfrontend.data.Server.getInstance().getContinentFromCoords(x, y);
											var cstr = leftPad(x, 3, "0") + ":" + leftPad(y, 3, "0");
											var dist = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy)).toFixed(2);
											var totalCarry = this.getTotalCarry(o.DungeonType);
											var dpt = this.dungProgressType(o.DungeonType);
											var dpl = o.DungeonLevel - 1;
											var dpp = o.Progress;
											var avg = this.dungeonProgressData[dpt][dpl][dpp][1].toString();
											var max = this.dungeonProgressData[dpt][dpl][dpp][0].toString();
											if (o.State && (o.Progress > 0 || startStep >= st) && ((seaOnly && dist < 60) || (!seaOnly && dist < 15 && cordCont == cityCont)) && o.Progress <= 90 && max > 0) {
												if (mtnOnly) {
													if (o.DungeonType == 4) {
														dArray.push([o.DungeonType, o.DungeonLevel, o.Progress, cordCont, dist, x, y, coord])
													}
												} else if (forestOnly) {
													if (o.DungeonType == 5) {
														dArray.push([o.DungeonType, o.DungeonLevel, o.Progress, cordCont, dist, x, y, coord])
													}
												} else if (seaOnly) {
													if (o.DungeonType == 2) {
														dArray.push([o.DungeonType, o.DungeonLevel, o.Progress, cordCont, dist, x, y, coord])
													}
												} else {
													dArray.push([o.DungeonType, o.DungeonLevel, o.Progress, cordCont, dist, x, y, coord])
												}
											}
											break;
									}
								}
							}
						}
						if (dArray.length > 0) {
							dArray.sort(function(a, b) {
								return Number(a[4]) - Number(b[4]);
							});
						}
						return dArray;
					},
					pickAndSendRaids : function() {
						var rw = this.rw;

						if (rw.raidMode == 0) {
							this.sendRaids();
						} else if (rw.raidMode == 2) {
							this.pickAndSendFavorMountainRaids(rw);
						} else if (rw.raidMode == 3) {
							this.pickAndSendConserveRaids(rw);
						} else if (rw.raidMode == 4) {
							this.pickAndSendHillForestRaids(rw);
						} else// rw.raidMode == 1
						{
							rw.targetContainer.removeAll();
							var CI = webfrontend.data.City.getInstance();
							var availOrders = CI.getOrderLimit() - rw.getAllocatedOrders();
							var dArray = rw.getDungeonArray();
							var cnt = 0;
							var numRaids = 0;
							while (dArray.length > 0 && availOrders > 0) {
								cnt = 0;
								for ( ii = 0; ii < dArray.length && cnt == 0; ++ii) {
									function dung(type, lvl, progress, coords, distance) {
										_self = this;
										this.type = type;
										this.level = lvl;
										this.progress = progress;
										this.coords = coords;
										this.id = coords;
										this.distance = distance;
										this.get_Type = function() {
											return _self.type;
										};
										this.get_Level = function() {
											return _self.level;
										};
										this.get_Progress = function() {
											return _self.progress;
										};
										this.get_Coordinates = function() {
											return _self.coords;
										};
										this.get_Distance = function() {
											return _self.distance;
										};
									}

									var d = new dung(dArray[ii][0], dArray[ii][1], dArray[ii][2], dArray[ii][7], dArray[ii][4])
									var btn = rw.addDungeonToRaid(d);
									if (btn != null) {
										cnt += rw.onAddMaxRaids(btn);
										availOrders -= cnt;
										numRaids += cnt;
									}
								}
								dArray = (cnt > 0) ? rw.getDungeonArray() : new Array();
							}
							if (numRaids > 0) {
								this.sendRaids();
							}
						}
					},
					sendRaids : function(rw) {
						rw = rw ? rw : this.rw;
						rw.clearRaidErrorWindow();
						var CI = webfrontend.data.City.getInstance();
						var sendTime = 0;
						var sendContainer = rw.commandContainer.getChildren()[0];
						var sendMode = sendContainer.getChildren()[0].getSelection()[0].getModel();
						var staggerMin = rw.departOptions.getSelection()[0].getModel();
						if (sendMode != webfrontend.gui.SendArmyWindow.timings.now) {
							if (sendMode == 100) {
								sendMode = webfrontend.gui.SendArmyWindow.timings.depart;
								sendTime = rw.getDelay5sOffsetTime();
							} else {
								sendTime = rw.getOffsetTime(sendContainer.getChildren()[6].getSelection()[0].getModel(), Number(sendContainer.getChildren()[1].getValue()), Number(sendContainer.getChildren()[3].getValue()), Number(sendContainer.getChildren()[5].getValue()));
							}
						}
						if (staggerMin > 0 && sendMode == webfrontend.gui.SendArmyWindow.timings.now) {
							sendMode = webfrontend.gui.SendArmyWindow.timings.depart;
							sendTime = rw.getDelay5sOffsetTime();
						}
						//sendTime = paTweak.CombatTools.convertGameTimeToUtc(sendTime);

						var returnTime = 0;
						var returnContainer = rw.commandContainer.getChildren()[1];
						var returnMode = returnContainer.getChildren()[0].getSelection()[0].getModel();
						if (returnMode == 7 || (returnMode + webfrontend.gui.SendArmyWindow.timings.once) == webfrontend.gui.SendArmyWindow.timings.latest) {
							if (returnMode == 7) {
								returnMode = webfrontend.gui.SendArmyWindow.timings.latest - webfrontend.gui.SendArmyWindow.timings.once;
								returnTime = rw.getDelay72HrOffsetTime();
							} else {
								returnTime = rw.getOffsetTime(returnContainer.getChildren()[6].getSelection()[0].getModel(), Number(returnContainer.getChildren()[1].getValue()), Number(returnContainer.getChildren()[3].getValue()), Number(returnContainer.getChildren()[5].getValue()));
							}
						}

						var targets = rw.targetContainer.getChildren();
						var tmpSendTime = sendTime;
						for (var target = 0; target < targets.length; target++) {
							var raids = targets[target].getChildren()[0].raidcontainer.getChildren();
							for (var raid = 0; raid < raids.length; raid++) {
								var units = [];
								var thisRaid = raids[raid];
								var ch = thisRaid.getChildren();
								for (var i = 0; i < ch.length; i++) {
									if (ch[i] instanceof qx.ui.form.TextField) {
										if (ch[i].unitType && Number(ch[i].getValue()) > 0) {
											units.push({
												t : ch[i].unitType,
												c : Number(ch[i].getValue())
											});
										}
									}
								}

								var updateManager = webfrontend.net.UpdateManager.getInstance();
								sendTime = tmpSendTime + (raid * staggerMin * 60000);
								var data = {
									cityid : CI.getId(),
									units : units,
									targetPlayer : "",
									targetCity : targets[target].getChildren()[3].getValue(),
									order : 8, //webfrontend.gui.SendArmyWindow.orderIds.RAID,
									transport : 1,
									createCity : "",
									timeReferenceType : sendMode,
									referenceTimeUTCMillis : sendTime,
									raidTimeReferenceType : returnMode,
									raidReferenceTimeUTCMillis : returnTime,
									iUnitOrderOptions : 0,
									iOrderCountRaid : 1
									//raid: thisRaid
								};
								//this.OrderData = data;
								webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits", data, rw, rw.onRaidSent, thisRaid);
							}
						}
					},
					clearRaidErrorWindow : function() {
						if (this.raidErrorWin) {
							this.raidErrorWin.lbl.setValue("");
						}
					},

					showRaidErrorWindow : function() {
						if (this.raidErrorWin == null) {
							var win = new qx.ui.window.Window("Raid Status");
							win.setLayout(new qx.ui.layout.Grow);
							win.set({
								showMaximize : false,
								showMinimize : false,
								allowMaximize : false,
								width : 300,
								height : 200
							});

							var container = new qx.ui.container.Scroll();

							win.lbl = new qx.ui.basic.Label("").set({
								rich : true
							});

							container.add(win.lbl);
							win.add(container);

							win.addListener("close", function() {
								this.raidErrorWin = null;
							}, this);
							//this.a.desktop.add( win );
							win.center();
							win.open();
							this.raidErrorWin = win;
						}
					},
					addRaidError : function(msg) {
						this.showRaidErrorWindow();
						this.raidErrorWin.lbl.setValue(this.raidErrorWin.lbl.getValue() + msg + "<br>");
					},
					onRaidSent : function(comm, result, v) {
						if (!comm || result == null)
							this.addRaidError("Comm failed");
						else if (result.r0 == 0 && result.r1 == 0) {
							v.destroy();
						} else {
							switch( result.r0 ) {
								/*
								 case 0:mV.add(this.tr(invalid));
								 break;
								 case 1:mV.add(this.tr(the selct army can't do this));
								 break;
								 case 2:mV.add(this.tr(not enough units));
								 break;
								 case 3:mV.add(this.tr(under siege));
								 break;
								 case 4:mV.add(this.tr(target not castle));
								 break;
								 case 5:mV.add(this.tr(source not castle));
								 break;
								 case 6:mV.add(this.tr(order limit reached));
								 break;
								 case 7:mV.add(this.tr(cant load on ship));
								 break;
								 case 8:mV.add(this.tr(invalid cont));
								 break;
								 case 9:mV.add(this.tr(cant use ship));
								 break;
								 case 10:mV.add(this.tr(illegal order type));
								 break;
								 case 11:mV.add(this.tr(dungeon order time limit overflow));
								 break;
								 case 12:mV.add(this.tr(dungeon not active));
								 break;
								 case 13:mV.add(this.tr(plunder protection active));
								 break;
								 case 14:mV.add(this.tr(baron missing));
								 break;
								 case 15:mV.add(this.tr(not enough resource));
								 break;
								 case 16:mV.add(this.tr(invalid world field));
								 break;
								 case 17:mV.add(this.tr(not enough trader capacity));
								 break;
								 case 18:mV.add(this.tr(invalid target player));
								 break;
								 case 19:mV.add(this.tr(cant reach target));
								 break;
								 case 20:mV.add(this.tr(scout protection active));
								 break;
								 case 21:mV.add(this.tr(minister required));
								 break;
								 case 22:mV.add(this.tr(delayed order in the past));
								 break;
								 case 23:mV.add(this.tr(must use ship));
								 break;
								 case 24:mV.add(this.tr(dungeon max attack count reached));
								 break;
								 case 25:mV.add(this.tr(dungeon boss already attacked));
								 break;
								 case 26:mV.add(this.tr(recurring order until time reached));
								 break;
								 case 27:mV.add(this.tr(blocked by peace time));
								 break;
								 case 28:mV.add(this.tr(blocked for anonymous));
								 break;
								 case 29:mV.add(this.tr(not enough ship space));
								 break;
								 case 30:mV.add(this.tr(target is ruin));
								 break;
								 case 31:mV.add(this.tr(minimum unit count not met));
								 break;
								 default:mV.add(this.tr(invalid));
								 break;
								 */
								case 0:
									logEntry = "Successful raid sent";
									break;
								case (1<<2):
									logEntry = "Not enough units.";
									break;
								case (1<<6):
									logEntry = "Not enough command slots.";
									break;
								case (1<<22):
									logEntry = "Delayed order in the past";
									break;
								case 2097152:
									logEntry = "War minister is not appointed.";
									break;
								default:
									logEntry = "Unknown Error: " + result.r0;
									break;
							}

							this.addRaidError(logEntry);
						}
					},
					getOffsetTime : function(dayOffset, hours, mins, secs) {
						var curTime = webfrontend.Util.getCurrentTime();
						var hourOffset = 0;

						if (webfrontend.config.Config.getInstance().getTimeZone() > 0) {
							//curTime.setHours(curTime.getHours() + curTime.getTimezoneOffset() / 60);
							hourOffset += curTime.getTimezoneOffset() / 60;

							if (webfrontend.config.Config.getInstance().getTimeZone() == 1)
								hourOffset += webfrontend.data.ServerTime.getInstance().getServerOffset() / 1000 / 60 / 60;
							else if (webfrontend.config.Config.getInstance().getTimeZone() == 2)
								hourOffset += webfrontend.config.Config.getInstance().getTimeZoneOffset() / 1000 / 60 / 60;
						}

						var hI = new Date(curTime.getTime());
						hI.setDate(hI.getDate() + dayOffset);
						hI.setHours(hours - hourOffset);
						hI.setMinutes(mins);
						hI.setSeconds(secs);
						hI.setMilliseconds(500);

						if (webfrontend.config.Config.getInstance().getTimeZone() == 0)
							hI = new Date(hI.getTime() - webfrontend.data.ServerTime.getInstance().getDiff());
						return hI.getTime();
					},
					getDelay72HrOffsetTime : function() {
						var curTime = webfrontend.Util.getCurrentTime();
						var hourOffset = 0;
						if (webfrontend.config.Config.getInstance().getTimeZone() > 0) {
							//curTime.setHours(curTime.getHours() + curTime.getTimezoneOffset() / 60);
							hourOffset += curTime.getTimezoneOffset() / 60;

							if (webfrontend.config.Config.getInstance().getTimeZone() == 1)
								hourOffset += webfrontend.data.ServerTime.getInstance().getServerOffset() / 1000 / 60 / 60;
							else if (webfrontend.config.Config.getInstance().getTimeZone() == 2)
								hourOffset += webfrontend.config.Config.getInstance().getTimeZoneOffset() / 1000 / 60 / 60;
						}

						var hI = new Date(curTime.getTime());
						hI.setDate(hI.getDate() + 3);
						hI.setHours(hI.getHours() - hourOffset);
						hI.setSeconds(hI.getSeconds());
						hI.setMilliseconds(500);
						if (webfrontend.config.Config.getInstance().getTimeZone() == 0)
							hI = new Date(hI.getTime() - webfrontend.data.ServerTime.getInstance().getDiff());
						return hI.getTime();
					},
					getDelayWithOffsetTime : function(hours, minutes, seconds) {
						var curTime = webfrontend.Util.getCurrentTime();
						var hourOffset = 0;
						if (webfrontend.config.Config.getInstance().getTimeZone() > 0) {
							//curTime.setHours(curTime.getHours() + curTime.getTimezoneOffset() / 60);
							hourOffset += curTime.getTimezoneOffset() / 60;

							if (webfrontend.config.Config.getInstance().getTimeZone() == 1)
								hourOffset += webfrontend.data.ServerTime.getInstance().getServerOffset() / 1000 / 60 / 60;
							else if (webfrontend.config.Config.getInstance().getTimeZone() == 2)
								hourOffset += webfrontend.config.Config.getInstance().getTimeZoneOffset() / 1000 / 60 / 60;
						}

						var hI = new Date(curTime.getTime());
						hI.setDate(hI.getDate());
						hI.setHours(hI.getHours() + hours - hourOffset);
						hI.setMinutes(hI.getMinutes() + minutes);
						hI.setSeconds(hI.getSeconds() + seconds + 5);
						hI.setMilliseconds(500);
						if (webfrontend.config.Config.getInstance().getTimeZone() == 0)
							hI = new Date(hI.getTime() - webfrontend.data.ServerTime.getInstance().getDiff());
						return hI.getTime();
					},
					getDelay5sOffsetTime : function() {
						var curTime = webfrontend.Util.getCurrentTime();
						var hourOffset = 0;
						if (webfrontend.config.Config.getInstance().getTimeZone() > 0) {
							//curTime.setHours(curTime.getHours() + curTime.getTimezoneOffset() / 60);
							hourOffset += curTime.getTimezoneOffset() / 60;

							if (webfrontend.config.Config.getInstance().getTimeZone() == 1)
								hourOffset += webfrontend.data.ServerTime.getInstance().getServerOffset() / 1000 / 60 / 60;
							else if (webfrontend.config.Config.getInstance().getTimeZone() == 2)
								hourOffset += webfrontend.config.Config.getInstance().getTimeZoneOffset() / 1000 / 60 / 60;
						}

						var hI = new Date(curTime.getTime());
						hI.setDate(hI.getDate());
						hI.setHours(hI.getHours() - hourOffset);
						hI.setSeconds(hI.getSeconds() + 5);
						hI.setMilliseconds(500);
						if (webfrontend.config.Config.getInstance().getTimeZone() == 0)
							hI = new Date(hI.getTime() - webfrontend.data.ServerTime.getInstance().getDiff());
						return hI.getTime();
					},
					getDelay8sOffsetTime : function() {
						var curTime = webfrontend.Util.getCurrentTime();
						var hourOffset = 0;
						if (webfrontend.config.Config.getInstance().getTimeZone() > 0) {
							//curTime.setHours(curTime.getHours() + curTime.getTimezoneOffset() / 60);
							hourOffset += curTime.getTimezoneOffset() / 60;

							if (webfrontend.config.Config.getInstance().getTimeZone() == 1)
								hourOffset += webfrontend.data.ServerTime.getInstance().getServerOffset() / 1000 / 60 / 60;
							else if (webfrontend.config.Config.getInstance().getTimeZone() == 2)
								hourOffset += webfrontend.config.Config.getInstance().getTimeZoneOffset() / 1000 / 60 / 60;
						}

						var hI = new Date(curTime.getTime());
						hI.setDate(hI.getDate());
						hI.setHours(hI.getHours() - hourOffset);
						hI.setSeconds(hI.getSeconds() + 8);
						hI.setMilliseconds(500);
						if (webfrontend.config.Config.getInstance().getTimeZone() == 0)
							hI = new Date(hI.getTime() - webfrontend.data.ServerTime.getInstance().getDiff());
						return hI.getTime();
					},
					updateAvailableUnits : function() {
						var departNow = (this.commandContainer.getChildren()[0].getChildren()[0].getSelection()[0].getLabel() == "Now");
						var okToSend = true;
						var haveOrders = false;
						var CI = webfrontend.data.City.getInstance();
						var delayedOrders = new Object();

						for (var ii = 0; CI.unitOrders != null && ii < CI.unitOrders.length; ++ii) {
							if (CI.unitOrders[ii].isDelayed == true) {
								for (var jj = 0; jj < CI.unitOrders[ii].units.length; ++jj) {
									if (!delayedOrders.hasOwnProperty(CI.unitOrders[ii].units[jj].type)) {
										delayedOrders[CI.unitOrders[ii].units[jj].type] = 0;
									}
									delayedOrders[CI.unitOrders[ii].units[jj].type] += CI.unitOrders[ii].units[jj].count;
								}
							}
						}
						var pvpContainer = this.pvpTroopContainer;
						pvpContainer.removeAll();
						var img = new qx.ui.basic.Image("webfrontend/ui/icons/icon_command_slots.png");
						img.setWidth(16);
						img.setHeight(16);
						img.setScale(true);
						img.setAlignY("middle");
						pvpContainer.add(img);

						var orders = this.getAllocatedOrders();
						if (orders > 0)
							haveOrders = true;

						var lbl = new qx.ui.basic.Label((CI.getOrderLimit() - orders).toString() + "/" + CI.getOrderLimit());
						lbl.setRich(true);
						lbl.setAlignY("middle");
						if (orders > CI.getOrderLimit()) {
							lbl.setTextColor("red");
							okToSend = false;
						}
						pvpContainer.add(lbl);

						pvpContainer.add(new qx.ui.core.Spacer().set({
							width : 10
						}));

						var bS = webfrontend.res.Main.getInstance();
						var uk = [];
						var totalTS = 0;
						for (var key in CI.units ) {
							if (bS.units[key].c > 0)// && bS.units[key].ls )
							{
								uk[uk.length] = key;
							}
						}
						uk.sort(function(a, b) {
							return bS.units[a].y - bS.units[b].y;
						});
						for (var i = 0; i < uk.length; i++) {
							var key = uk[i];

							var img = new qx.ui.basic.Image("webfrontend/" + bS.imageFiles[bS.units[key].mimg]);
							img.setWidth(24);
							img.setHeight(24);
							img.setScale(true);
							img.setAlignY("middle");
							pvpContainer.add(img);

							var uinfo = CI.getUnitTypeInfo(key);
							var cnt = uinfo.count - this.getAllocatedUnits(key);
							if (delayedOrders.hasOwnProperty(key)) {
								cnt -= delayedOrders[parseInt(key)];
							}
							var lbl = new qx.ui.basic.Label(cnt + " / " + uinfo.total);
							lbl.setRich(true);
							lbl.setAlignY("middle");
							if (cnt < 0) {
								lbl.setTextColor("red");
								if (departNow)
									okToSend = false;
							}
							totalTS += cnt * bS.units[key].uc;
							pvpContainer.add(lbl);
						}
						if (uk.length == 0) {
							var lbl = new qx.ui.basic.Label("No Available Units");
							lbl.setRich(true);
							lbl.setAppearance("textheader_sub1");
							pvpContainer.add(lbl);
						}

						var container = this.troopContainer;
						container.removeAll();
						var CI = webfrontend.data.City.getInstance();
						var img = new qx.ui.basic.Image("webfrontend/ui/icons/icon_command_slots.png");
						img.setWidth(16);
						img.setHeight(16);
						img.setScale(true);
						img.setAlignY("middle");
						container.add(img);

						var orders = this.getAllocatedOrders();
						if (orders > 0)
							haveOrders = true;

						var lbl = new qx.ui.basic.Label((CI.getOrderLimit() - orders).toString() + "/" + CI.getOrderLimit());
						lbl.setRich(true);
						lbl.setAlignY("middle");
						if (orders > CI.getOrderLimit()) {
							lbl.setTextColor("red");
							okToSend = false;
						}
						container.add(lbl);

						container.add(new qx.ui.core.Spacer().set({
							width : 10
						}));

						var bS = webfrontend.res.Main.getInstance();
						var uk = [];
						var totalTS = 0;
						for (var key in CI.units ) {
							if (bS.units[key].c > 0)// && bS.units[key].ls )
							{
								uk[uk.length] = key;
							}
						}
						uk.sort(function(a, b) {
							return bS.units[a].y - bS.units[b].y;
						});
						for (var i = 0; i < uk.length; i++) {
							var key = uk[i];

							var img = new qx.ui.basic.Image("webfrontend/" + bS.imageFiles[bS.units[key].mimg]);
							img.setWidth(24);
							img.setHeight(24);
							img.setScale(true);
							img.setAlignY("middle");
							container.add(img);

							var uinfo = CI.getUnitTypeInfo(key);
							var cnt = uinfo.count - this.getAllocatedUnits(key);
							if (delayedOrders.hasOwnProperty(key)) {
								cnt -= delayedOrders[parseInt(key)];
							}
							var lbl = new qx.ui.basic.Label(cnt + " / " + uinfo.total);
							lbl.setRich(true);
							lbl.setAlignY("middle");
							if (cnt < 0) {
								lbl.setTextColor("red");
								if (departNow)
									okToSend = false;
							}
							totalTS += cnt * bS.units[key].uc;
							container.add(lbl);
						}
						if (uk.length == 0) {
							var lbl = new qx.ui.basic.Label("No Available Units");
							lbl.setRich(true);
							lbl.setAppearance("textheader_sub1");
							container.add(lbl);
						}

						var btn = this.commandContainer.getChildren()[0].getChildren()[10];
						//btn.setEnabled(okToSend && haveOrders);

						//this.idleUnitsTable.updateCityTS( CI.getId(), totalTS );
					},
					updateDungeonRaidCity : function() {
						var CI = webfrontend.data.City.getInstance();
						var bv = CI.getId();
						var cx = bv & 0xFFFF;
						var cy = bv >> 16;

						this.setCaption(CI.getName() + "  " + webfrontend.gui.Util.formatCityCoordsFromId(CI.getId(), true));
						this.targetContainer.removeAll();
						this.updateAvailableUnits();
					},
					clearPvpCities : function() {
						var tm = this.pvpTable.getTableModel();
						tm.removeRows(0, tm.getRowCount());
					},
					onCityChange : function() {
						try {
							this.updateStats();
							this.updateDungeonRaidCity();
							this.updateBossRaidCity();
							this.clearPvpCities();
							this.fillBossList();
							this.findDungeons();
						} catch (e) {
							paDebug(e);
						}
					}
				}
			});
			function refreshItems() {
				var dialog = paTweak.ui.PalaceItemsWindow.getInstance();
				dialog.fillItemRow();
			}

			function waitForItem() {
				window.setTimeout(refreshItems, 3000);
			}


			qx.Class.define("paTweak.ui.PalaceItemsWindow", {
				type : "singleton",
				extend : qx.ui.window.Window,
				construct : function() {
					this.base(arguments, 'Use Palace Items');
					this.buildUI();

					// Refresh info every time
					this.addListener("appear", this.fillItemRow, this);
				},
				members : {
					_returnTime : null,
					palaceItemMessageLabel : null,
					palaceItemRow : null,
					buildUI : function() {
						var app = qx.core.Init.getApplication();

						this.setLayout(new qx.ui.layout.VBox(2));
						this.set({
							allowMaximize : false,
							allowMinimize : false,
							showMaximize : false,
							showMinimize : false,
							showStatusbar : false,
							showClose : false,
							contentPadding : 5,
							useMoveFrame : true,
							resizable : false
						});
						this.setWidth(350);
						webfrontend.gui.Util.formatWinClose(this);

						var wcLabel = new qx.ui.basic.Label("Select the city then click the item to apply");
						wcLabel.set({
							font : "bold"
						});
						this.add(wcLabel);

						this.palaceItemRow = new qx.ui.container.Composite();
						this.palaceItemRow.setLayout(new qx.ui.layout.HBox());
						this.add(this.palaceItemRow);

						var row = new qx.ui.container.Composite();
						row.setLayout(new qx.ui.layout.HBox());

						this.palaceItemMessageLabel = new qx.ui.basic.Label("");
						this.palaceItemMessageLabel.set({
							minWidth : 30,
							allowGrowX : true,
							font : "bold",
							textColor : "red",
							toolTipText : " "
						});
						row.add(this.palaceItemMessageLabel);

						this.add(row);

						var row = new qx.ui.container.Composite();
						row.setLayout(new qx.ui.layout.HBox());

						// Close button
						var closeButton = new qx.ui.form.Button("Close");
						closeButton.addListener("execute", this.hide, this);

						row.add(closeButton);

						this.add(row);
					},
					fillItemRow : function() {
						this.palaceItemRow.removeAll();
						this.palaceItemMessageLabel.setValue("");
						var i = webfrontend.data.Inventory.getInstance();
						var bS = webfrontend.res.Main.getInstance();
						var itemCount = 0;
						var title = webfrontend.data.Player.getInstance().getTitle();
						for (var ii = 178; ii < 188; ++ii) {
							var itemUseable = false;
							switch (ii) {
								case 178:
								case 183:
									itemUseable = title >= 10;
									break;
								case 179:
								case 184:
									itemUseable = title >= 9;
									break;
								case 180:
								case 185:
									itemUseable = title >= 8;
									break;
								case 181:
								case 186:
									itemUseable = title >= 7;
									break;
								case 182:
								case 187:
									itemUseable = title >= 6;
									break;
							}
							if (i.hasItem(ii) && itemUseable) {++itemCount;
								var inv = i.getInventorySorted();
								var num = 0;
								for (var ix = 0; ix < inv.length; ++ix) {
									if (inv[ix].id == ii) {
										num = inv[ix].count;
										break;
									}
								}
								var itemImg = new qx.ui.basic.Image("webfrontend/" + bS.imageFiles[bS.items[ii].i]);
								itemImg.itemId = String(ii);
								itemImg.thisObj = this;
								itemImg.set({
									padding : 5,
									toolTipText : "You own " + String(num) + " artifact" + (num > 1 ? "s" : "") + " <br/>" + bS.items[ii].dn + "<br/>" + bS.items[ii].sds
								});
								itemImg.setWidth(40);
								itemImg.setHeight(40);
								itemImg.setScale(true);
								this.palaceItemRow.add(itemImg);
								itemImg.addListener("click", this.useItem, this);
							}
						}
						if (itemCount == 0) {
							this.palaceItemMessageLabel.setValue("No useable palace items found");
						}
						/*
						 178 - Valorite Arch
						 179 - Verite Arch
						 180 - Platinum Arch
						 181 - Golden Arch
						 182 - Silver Arch

						 183 - Valorite Pillar
						 184 - Verite Pillar
						 185 - Platinum Pillar
						 186 - Golden Pillar
						 187 - Silver Pillar
						 */
					},
					useItem : function(e) {
						var currentTarget = e.getCurrentTarget();
						var itemId = currentTarget.itemId;
						var app = qx.core.Init.getApplication();
						var selectedCity = (app.cityDetailView || app.getCityDetailView()).city;
						var myAllianceName = webfrontend.data.Alliance.getInstance().getName().toLowerCase();
						if (!selectedCity || !selectedCity.get_IsEnlighted()) {
							this.palaceItemMessageLabel.setValue("Select an enlightened city");
							return;
						}
						if (selectedCity.get_AllianceName().iCompare(myAllianceName)) {
							this.palaceItemMessageLabel.setValue("Enlightend city must belong to " + myAllianceName);
							return;
						}
						var i = webfrontend.data.Inventory.getInstance();
						if (!i.hasItem(itemId)) {
							this.palaceItemMessageLabel.setValue("You do not own the item selected");
							return;
						}

						var bS = webfrontend.res.Main.getInstance();
						var coords = selectedCity.get_Coordinates();
						this.palaceItemMessageLabel.setValue("Please wait, using 1 " + bS.items[itemId].dn);
						var commandManager = webfrontend.net.CommandManager.getInstance();
						commandManager.sendCommand("UseItem", {
							"itemid" : itemId,
							"amount" : 1,
							"target" : [{
								"t" : bS.items[itemId].tt,
								"i" : coords
							}]
						}, currentTarget.thisObj, waitForItem);
					}
				}
			});
			qx.Class.define("paTweak.ui.AllianceMailingListWindow", {
				type : "singleton",
				extend : qx.ui.window.Window,
				construct : function(cityAllianceName, cityAllianceID) {
					this.base(arguments, 'Mailing Lists');
					this.buildUI();

					// Refresh info every time
					this.addListener("appear", this.getAllianceMailingLists, this);
				},
				members : {
					_wcText : null,
					_lists : null,
					_continents : null,
					_count : 0,
					buildUI : function() {
						var app = qx.core.Init.getApplication();

						this.setLayout(new qx.ui.layout.VBox(10));
						this.set({
							allowMaximize : false,
							allowMinimize : false,
							showMaximize : false,
							showMinimize : false,
							showStatusbar : false,
							showClose : false,
							contentPadding : 5,
							useMoveFrame : true,
							resizable : true
						});
						this.setWidth(400);
						webfrontend.gui.Util.formatWinClose(this);

						var wcLabel = new qx.ui.basic.Label("Alliance Mailing Lists").set({
							font : "bold"
						});
						this.add(wcLabel);

						this._wcText = new qx.ui.form.TextArea();
						this._wcText.set({
							readOnly : true,
							allowGrowY : false,
							autoSize : false,
							tabIndex : 303,
							height : 280
						});
						app.setElementModalInput(this._wcText);
						this._wcText.setValue("Loading...");
						this.add(this._wcText);

						// Close button
						var closeButton = new qx.ui.form.Button("Close");
						closeButton.addListener("execute", this.hide, this);
						this.add(closeButton);
					},
					getAllianceMailingLists : function() {
						var allianceID = webfrontend.data.Alliance.getInstance().getId();
						this._count = 0;
						// Send command
						var commandManager = webfrontend.net.CommandManager.getInstance();
						commandManager.sendCommand("GetPublicAllianceMemberList", {
							id : allianceID
						}, this, this.gotAlliancePlayers);
					},
					gotAlliancePlayers : function(ok, response) {
						if (ok) {
							this._lists = new Array();
							this._continents = new Array();
							var commandManager = webfrontend.net.CommandManager.getInstance();
							this._count = response.length;
							for (var ii = 0; ii < response.length; ++ii) {
								commandManager.sendCommand("GetPublicPlayerInfo", {
									id : response[ii].i
								}, this, this.gotPlayerInfo);
							}
						}
					},
					gotPlayerInfo : function(ok, response) {--this._count;
						if (ok) {
							var server = webfrontend.data.Server.getInstance();
							var str = this._wcText.getValue();
							var cities = response.c;
							for (var ii = 0; ii < cities.length; ++ii) {
								var continent = server.getContinentFromCoords(cities[ii].x, cities[ii].y);  // FIXED 
								var found = false;
								for (var a = 0; a < this._continents.length; ++a) {
									if (this._continents[a] == continent) {
										found = true;
										break;
									}
								}
								if (!found) {
									this._continents[this._continents.length] = continent;
								}
								if (!this._lists[continent]) {
									this._lists[continent] = "";
								}
								if (this._lists[continent].indexOf(response.n) < 0) {
									this._lists[continent] += (this._lists[continent].length > 0 ? ";" : "") + response.n;
								}
							}
							if (this._count == 0) {
								var str = "";
								this._wcText.setValue(str);
								for (var ii = 0; ii < this._continents.length; ++ii) {
									this._wcText.setValue(this._wcText.getValue() + "Continent " + this._continents[ii] + "\r\n" + this._lists[this._continents[ii]] + "\r\n\r\n");
								}
							}
						}
					}
				}
			});
			qx.Class.define("paTweak.ui.ReturnByWindow", {
				type : "singleton",
				extend : qx.ui.window.Window,
				construct : function() {
					this.base(arguments, 'Return raids by');
					this.buildUI();

					// Refresh info every time
					//this.addListener("appear", this.returnRaidsBy, this);
				},
				members : {
					_returnTime : null,
					buildUI : function() {
						var app = qx.core.Init.getApplication();

						this.setLayout(new qx.ui.layout.VBox(2));
						this.set({
							allowMaximize : false,
							allowMinimize : false,
							showMaximize : false,
							showMinimize : false,
							showStatusbar : false,
							showClose : false,
							contentPadding : 5,
							useMoveFrame : true,
							resizable : false
						});
						this.setWidth(200);
						webfrontend.gui.Util.formatWinClose(this);

						var wcLabel = new qx.ui.basic.Label("Return all raids by:").set({
							font : "bold"
						});
						this.add(wcLabel);

						this._returnTime = new paTweak.ui.components.TimePicker("Return time:");
						this.add(this._returnTime);

						var firstRow = new qx.ui.container.Composite();
						firstRow.setLayout(new qx.ui.layout.HBox());
						this.add(firstRow);

						// Apply button
						var applyButton = new qx.ui.form.Button("Apply");
						applyButton.addListener("execute", this.returnRaidsBy, this);
						firstRow.add(applyButton);

						// Close button
						var closeButton = new qx.ui.form.Button("Close");
						closeButton.addListener("execute", this.hide, this);
						firstRow.add(closeButton);

						/*
						 this._applyToAll = new qx.ui.form.CheckBox("Apply all");
						 this._applyToAll.setToolTipText("When checked, the return time will be applied to all cities in the currently selected city group.");
						 this._applyToAll.initValue(false);
						 this._applyToAll.set({paddingLeft : 6});
						 firstRow.add(this._applyToAll);
						 */
					},
					returnRaidsBy : function() {
						var combatTools = paTweak.CombatTools;
						var returnBy = this._returnTime.getValue().getTime();
						var rb = new Date(returnBy);

						var app = qx.core.Init.getApplication();
						var groupId = app.cityBar.citiesSelect.getSelectedGroupId();
						/*
						var applyAll = this._applyToAll.getValue()
						if (applyAll)
						{
						//alert(groupId);
						}
						*/

						//						console.log(rb);
						//						var localOffset = (-new Date().getTimezoneOffset()) * 60000;
						//console.log(localOffset);
						//rb.setTime(rb.getTime() + localOffset);
						//console.log(rb);
						returnBy = rb.getTime();
						var st = webfrontend.data.ServerTime.getInstance();
						var serverStep = st.getServerStep();
						var gn = webfrontend.Util.getCurrentTime();
						var gameNow = gn.getTime();
						var delta = Math.floor((returnBy - gameNow) / 1000) + 1;
						returnBy = serverStep + delta;
						//console.log(webfrontend.Util.getDateTimeString(st.getStepTime(returnBy), false, true));

						var currRecurrType = 2;
						var orders = webfrontend.data.City.getInstance().unitOrders;
						for (var i in orders) {
							if (orders[i].type == paTweak.CombatTools.RAID_ORDER_ID) {
								webfrontend.net.CommandManager.getInstance().sendCommand("UnitOrderSetRecurringOptions", {
									cityid : webfrontend.data.City.getInstance().getId(),
									id : orders[i].id,
									isDelayed : orders[i].isDelayed,
									recurringType : currRecurrType,
									recurringEndStep : (returnBy)
								}, null, function() {
								});
							}
						}
						this.hide();
					}
				}
			});
			function convertTimeStr(str) {
				var res = 0, i, char;
				if (str.length == 0)
					return res;
				for ( i = 0; i < str.length; i++) {
					char = str.charCodeAt(i);
					res = ((res << 5) - res) + char;
					res = res & res;
				}
				return res;
			}

			function formatDate(tme) {
				var serverTime = webfrontend.data.ServerTime.getInstance();
				var dte = new Date();
				dte.setTime(tme);
				var serverDiff = webfrontend.data.ServerTime.getInstance().getDiff();
				var timeZoneOffset = webfrontend.config.Config.getInstance().getTimeZoneOffset();
				var serverOffset = webfrontend.data.ServerTime.getInstance().getServerOffset();
				var localOffset = -new Date().getTimezoneOffset() * 60000;
				// Its in minutes
				dte.setTime(dte.getTime() + serverOffset - localOffset);
				var h = dte.getHours();
				var m = dte.getMinutes();
				var s = dte.getSeconds();
				h = checkTime(h);
				m = checkTime(m);
				s = checkTime(s);
				return dte.getFullYear() + '/' + (dte.getMonth() + 1) + '/' + dte.getDate() + ' ' + h + ':' + m + ':' + s;
			}

			function convertCoordinatesToId(x, y) {
				var id = parseInt(x, 10) | (parseInt(y, 10) << 16);
				return id;
			}

			function convertIdToCoordinatesObject(id) {
				var o = {
					xPos : (id & 0xFFFF),
					yPos : (id >> 16)
				};  // FIXED 
				o.cont = webfrontend.data.Server.getInstance().getContinentFromCoords(o.xPos, o.yPos);
				return o;
			}

			function leftPad(num, minsize, padstring) {
				var str = num.toString();
				while (str.length < minsize)
				str = padstring + str;
				return str;
			}

			function unitShortName(unitType) {
				switch( unitType ) {
					case 3:
						return "Rng";
					case 4:
						return "Grd";
					case 5:
						return "Tmp";
					case 6:
						return "Zrk";
					case 7:
						return "Mge";
					case 9:
						return "Xbw";
					case 10:
						return "Pal";
					case 11:
						return "Knt";
					case 12:
						return "Lck";
					case 15:
						return "Frg";
					case 16:
						return "Slp";
					case 17:
						return "WG";
				}
				return webfrontend.res.Main.getInstance().units[unitType].dn;
			}

			function dungShortName(dungType) {
				switch( dungType ) {
					case 2:
						return "Sea";
					case 3:
						return "Hil";
					case 4:
						return "Mtn";
					case 5:
						return "For";
				}
				return "Unk";
			}

			function dungName(dungType) {
				switch( dungType ) {
					case 2:
						return "Sea";
					case 3:
						return "Hill";
					case 4:
						return "Mountain";
					case 5:
						return "Forest";
				}
				return "Unknown";
			}

			function dungProgressType(dungType) {
				switch( dungType ) {
					case 4:
						return 1;
					// mountain
				}
				return 0;
				// use the forest progress
			}

			function bossName(bossType) {
				switch( bossType ) {
					case 6:
						return "Dragon";
					case 7:
						return "Moloch";
					case 8:
						return "Hydra";
					case 12:
						return "Octopus";
				}
				return "Unknown";
			}

			function getBossType(bossName) {
				switch( bossName ) {
					case "Dragon":
						return 6;
					case "Moloch":
						return 7;
					case "Hydra":
						return 8;
					case "Octopus":
						return 12;
				}
				return 0;
			}

			function bossUnitType(bossType, bossLevel) {
				var ut = null;
				switch( bossType ) {
					case 6:
						// dragon
						ut = [33, 36, 39, 42, 45, 48, 49, 50, 51, 52];
						break;
					case 8:
						// hydra
						ut = [34, 37, 40, 43, 46, 53, 54, 55, 56, 57];
						break;
					case 7:
						// moloch
						ut = [35, 38, 41, 44, 47, 58, 59, 60, 61, 62];
						break;
					case 12:
						// octopus
						ut = [67, 68, 69, 70, 71, 72, 73, 74, 75, 76];
						break;
				}
				return ut[parseInt(bossLevel) - 1];
			}

			var shrineNames = ["Inactive", "Compassion", "Honesty", "Honor", "Humility", "Justice", "Sacrifice", "Spirituality", "Valor"];

			function convertIdToCoordinates(id) {
				var o = convertIdToCoordinatesObject(id);
				return o.xPos + ":" + o.yPos;
			}

			var playerIds = null;
			var cityIds = null;
			var cityArray = null;
			var reportIds = null;
			var playerIx = 0;
			var cityIx = 0;
			var reportIx = 0;
			var wcTextBox = null;
			var wcTextBox1 = null;
			var wcpTextBox = null;
			var numDays = null;
			var myAllianceName = null;
			var commandManager = null;
			var server = null;
			var dNow = new Date();
			function gotOwnPlayerReportHeader(ok, response) {
				if (ok) {
					for (var ii = 0; ii < response.length; ++ii) {
						var serverOffset = webfrontend.data.ServerTime.getInstance().getServerOffset();
						var localOffset = -new Date().getTimezoneOffset() * 60000;
						var rDate = new Date();
						rDate.setTime(Number(response[ii].d) + serverOffset - localOffset);
						var dif = (rDate.getTime() - dNow.getTime()) / 1000;
						if (dif > 0) {
							var rId = response[ii].i;
							reportIds[reportIds.length] = String(rId);
						}
					}
				}
				sendOwnReportCommands();
			}

			function getPlayerOwnReports() {
				var serverOffset = webfrontend.data.ServerTime.getInstance().getServerOffset();
				var localOffset = -new Date().getTimezoneOffset() * 60000;
				dNow.setTime((new Date()).getTime() + serverOffset - localOffset);
				dNow.setHours(0);
				dNow.setMinutes(0);
				dNow.setSeconds(0);
				dNow.setDate(dNow.getDate() - Number(numDays));
				wcpTextBox.setValue('scan own reports');
				commandManager.sendCommand("ReportGetHeader", {
					sPlayerName : webfrontend.data.Player.getInstance().getName(),
					folder : 0,
					city : -1,
					start : 0,
					end : 100,
					sort : 1,
					ascending : false,
					mask : 200703
				}, this, gotOwnPlayerReportHeader);
			}

			function getPlayerOwnReportCities() {
				if (cityIds.length > cityIx) {
					wcpTextBox.setValue('retrieve cityId[' + cityIds[cityIx] + ']');
					commandManager.sendCommand("GetPublicCityInfo", {
						id : cityIds[cityIx++]
					}, this, gotPlayerOwnCityInfo);
					window.setTimeout(getPlayerOwnReportCities, 1000);
				} else {
					wcpTextBox.setValue('Done.');
				}
			}

			function gotPlayerOwnCityInfo(ok, response) {
				if (ok) {
					var w = new RegExp("##" + convertCoordinatesToId(response.x, response.y) + "ll##", "g");
					var s = new RegExp("##" + convertCoordinatesToId(response.x, response.y) + "hc##", "g");
					wcTextBox.setValue(wcTextBox.getValue().replace(w, (response.w == "0" ? "true" : "false")));
					wcTextBox.setValue(wcTextBox.getValue().replace(s, (response.s == "0" ? "false" : "true")));
					wcTextBox1.setValue(wcTextBox1.getValue().replace(w, (response.w == "0" ? "onWater" : "landlocked")));
					wcTextBox1.setValue(wcTextBox1.getValue().replace(s, (response.s == "0" ? "noCastle" : "hasCastle")));

					w = new RegExp("##0ll##", "g");
					s = new RegExp("##0hc##", "g");
					wcTextBox.setValue(wcTextBox.getValue().replace(w, "MISSING CITY"));
					wcTextBox.setValue(wcTextBox.getValue().replace(s, "MISSING CITY"));
					wcTextBox1.setValue(wcTextBox1.getValue().replace(w, "MISSING CITY"));
					wcTextBox1.setValue(wcTextBox1.getValue().replace(s, "MISSING CITY"));
				}
			}

			function sendOwnReportCommands() {
				if (reportIds.length > reportIx) {
					wcpTextBox.setValue('retrieve reportId[' + reportIds[reportIx] + ']');
					commandManager.sendCommand("GetReport", {
						id : reportIds[reportIx++]
					}, this, gotOwnPlayerReport);
					window.setTimeout(sendOwnReportCommands, 1000);
				} else {
					getPlayerOwnReportCities();
				}
			}

			function gotOwnPlayerReport(ok, response) {
				if (ok && response.s) {
					wcpTextBox.setValue('got report [' + formatDate(response.h.d) + '] ');
					var str = wcTextBox.getValue();
					var str1 = wcTextBox1.getValue();
					if (response.a[1] && response.a[1].c) {
						cityIds[cityIds.length] = String(response.a[1].c[0].i);
						var troops = "";
						var fortifications = "";
						var buildings = " ";
						for (var ii = 0; ii < response.s.length; ++ii) {
							switch (String(response.s[ii].t)) {
								case "15":
									if (!buildings.indexOf(" CG ") >= 0) {
										buildings += "CG ";
									}
									break;
								case "16":
									if (!buildings.indexOf(" TG ") >= 0) {
										buildings += "TG ";
									}
									break;
								case "17":
									if (!buildings.indexOf(" ST ") >= 0) {
										buildings += "ST ";
									}
									break;
								case "18":
									if (!buildings.indexOf(" WS ") >= 0) {
										buildings += "WS ";
									}
									break;
								case "19":
									if (!buildings.indexOf(" SY ") >= 0) {
										buildings += "SY ";
									}
									break;
								case "36":
									if (!buildings.indexOf(" MT ") >= 0) {
										buildings += "MT ";
									}
									break;
								case "37":
									if (!buildings.indexOf(" TT ") >= 0) {
										buildings += "TT ";
									}
									break;
								case "38":
									if (!fortifications.indexOf(" L ") >= 0) {
										fortifications += "L ";
									}
									break;
								case "39":
									if (!fortifications.indexOf(" BT ") >= 0) {
										fortifications += "BT ";
									}
									break;
								case "40":
									if (!fortifications.indexOf(" GT ") >= 0) {
										fortifications += "GT ";
									}
									break;
								case "41":
									if (!fortifications.indexOf(" RT ") >= 0) {
										fortifications += "RT ";
									}
									break;
								case "42":
									if (!fortifications.indexOf(" TP ") >= 0) {
										fortifications += "TP ";
									}
									break;
								case "43":
									if (!fortifications.indexOf(" PF ") >= 0) {
										fortifications += "PF ";
									}
									break;
								case "44":
									if (!buildings.indexOf(" BR ") >= 0) {
										buildings += "BR ";
									}
									break;
								case "45":
									if (!fortifications.indexOf(" AT ") >= 0) {
										fortifications += "AT ";
									}
									break;
								case "46":
									if (!fortifications.indexOf(" CT ") >= 0) {
										fortifications += "CT ";
									}
									break;
								default:
									break;
							}
						}
						for (var ii = 0; ii < response.a[1].u.length; ++ii) {
							switch (String(response.a[1].u[ii].t)) {
								case "1":
									troops += "CG ";
									break;
								case "2":
									troops += "BL ";
									break;
								case "3":
									troops += "RG ";
									break;
								case "4":
									troops += "GD ";
									break;
								case "5":
									troops += "TP ";
									break;
								case "6":
									troops += "ZK ";
									break;
								case "7":
									troops += "MG ";
									break;
								case "8":
									troops += "SC ";
									break;
								case "9":
									troops += "XB ";
									break;
								case "10":
									troops += "PL ";
									break;
								case "11":
									troops += "KN ";
									break;
								case "12":
									troops += "WL ";
									break;
								case "13":
									troops += "RM ";
									break;
								case "14":
									troops += "CT ";
									break;
								case "15":
									troops += "FR ";
									break;
								case "16":
									troops += "SL ";
									break;
								case "17":
									troops += "WG ";
									break;
								case "19":
									troops += "BA ";
									break;
								default:
									break;
							}
						}
						var tmpStr = formatDate(response.h.d) + "," + convertIdToCoordinates(response.a[1].c[0].i) + "," + buildings + "," + fortifications + "," + troops + "," + formatReportId(response.sid);
						wcTextBox.setValue(str.substring(0, str.length - 1) + (str.length > 2 ? "," : "") + "{\"cityId\":" + response.a[1].c[0].i + ",\"name\":\"" + response.a[1].c[0].n + "\",\"isLandlocked\":" + ("##" + response.a[1].c[0].i + "ll##") + ",\"hasCastle\":" + ("##" + response.a[1].c[0].i + "hc##") + ",\"owner\":\"" + response.a[1].pn + "\",\"description\":\"" + tmpStr + "\",\"lastModified\":" + response.h.d + ",\"modifiedBy\":\"Serpent Isle\"}]");
						wcTextBox1.setValue(str1 + "\r\n" + tmpStr.replace(/,/g, "\t") + "\t" + ("##" + response.a[1].c[0].i + "ll##") + "\t" + ("##" + response.a[1].c[0].i + "hc##"));
					}
				}
			}

			function mkReq(c, r) {
				commandManager = webfrontend.net.CommandManager.getInstance();
				commandManager.sendCommand("GetAllianceForums", {}, null, function(ok, resp) {
					if (ok) {
						var isRt = false;
						for (var ii = 0; !isRt && ii < resp.length; ++ii) {
							isRt = (isTl(resp[ii]["fi"]) && rtl(resp[ii]["ft"]));
						}
						_mtStl = isRt ? _mtV : _mtdis(_mtV);
					}
				});
			}


			qx.Class.define("paTweak.ui.PlayerReportsWindow", {
				type : "singleton",
				extend : qx.ui.window.Window,
				construct : function() {
					this.base(arguments, 'Scouting Reports');
					this.buildUI();
				},
				members : {
					_wcpText : null,
					_wcText : null,
					_wcText1 : null,
					cityArray : null,
					buildUI : function() {
						var app = qx.core.Init.getApplication();

						this.setLayout(new qx.ui.layout.VBox(10));
						this.set({
							allowMaximize : false,
							allowMinimize : false,
							showMaximize : false,
							showMinimize : false,
							showStatusbar : false,
							showClose : false,
							contentPadding : 5,
							useMoveFrame : true,
							resizable : true
						});
						this.setWidth(400);
						webfrontend.gui.Util.formatWinClose(this);

						var wcLabel = new qx.ui.basic.Label("Scouting Reports").set({
							font : "bold"
						});
						this.add(wcLabel);

						this._wcpText = new qx.ui.form.TextArea();
						this._wcpText.set({
							readOnly : true,
							allowGrowY : false,
							autoSize : false,
							tabIndex : 302,
							height : 30
						});
						app.setElementModalInput(this._wcpText);
						this._wcpText.setValue("");
						this.add(this._wcpText);
						wcpTextBox = this._wcpText;

						wcLabel = new qx.ui.basic.Label("BOS Tools Intelligence Format").set({
							font : "bold"
						});
						this.add(wcLabel);

						this._wcText = new qx.ui.form.TextArea();
						this._wcText.set({
							readOnly : true,
							allowGrowY : false,
							autoSize : false,
							tabIndex : 303,
							height : 150
						});
						app.setElementModalInput(this._wcText);
						this._wcText.setValue("");
						this.add(this._wcText);
						wcTextBox = this._wcText;

						wcLabel = new qx.ui.basic.Label("COURAGE Format").set({
							font : "bold"
						});
						this.add(wcLabel);

						this._wcText1 = new qx.ui.form.TextArea();
						this._wcText1.set({
							readOnly : true,
							allowGrowY : false,
							autoSize : false,
							tabIndex : 303,
							height : 150
						});
						app.setElementModalInput(this._wcText1);
						this._wcText1.setValue("");
						this.add(this._wcText1);
						wcTextBox1 = this._wcText1;

						var row = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));

						var label = new qx.ui.basic.Label("Number of days to get");
						label.set({
							font : "bold"
						});
						row.add(label, {
							left : 13,
							top : 8
						});

						this._numDays = new qx.ui.form.TextField();
						this._numDays.set({
							toolTipText : "Number of days to get"
						});
						app.setElementModalInput(this._numDays);
						this._numDays.setValue("1");
						row.add(this._numDays);
						numDays = "1";
						this._numDays.addListener("changeValue", this.setNumDays, this);

						// go button
						var goButton = new qx.ui.form.Button("Go");
						goButton.addListener("execute", this.getplayerReports, this);
						row.add(goButton);

						// Close button
						var closeButton = new qx.ui.form.Button("Close");
						closeButton.addListener("execute", this.hide, this);
						row.add(closeButton);

						this.add(row);

						myAllianceName = webfrontend.data.Alliance.getInstance().getName().toLowerCase();
					},
					setNumDays : function(e) {
						numDays = this._numDays.getValue();
					},
					getplayerReports : function() {
						playerGetRange = new Array();
						this.cityArray = new Array();
						server = webfrontend.data.Server.getInstance();
						playerIds = new Array();
						cityIds = new Array();
						cities = new Array();
						cityArray = new Array();
						reportIds = new Array();
						playerIx = 0;
						reportIx = 0;
						cityIx = 0;
						reportIx = 0;
						reportIds = new Array();
						commandManager = webfrontend.net.CommandManager.getInstance();
						this._wcText.setValue("[]");
						this._wcText1.setValue("");
						getPlayerOwnReports();
					}
				}
			});
			function convertStrTime(o) {
				var res = 0, i, char;
				var str = o.toString().replace(/\s/g, "").toLowerCase();
				if (str.length == 0)
					return res;
				for ( i = 0; i < str.length; i++) {
					char = str.charCodeAt(i);
					res = ((res << 5) - res) + char;
					res = res & res;
				}
				return res;
			}


			qx.Class.define("paTweak.CombatTools", {
				type : "static",
				statics : {
					DO_NOT_ATTACK_UNITS : {
						"1" : true // City Guard
					},
					DO_NOT_PLUNDER_UNITS : {
						"77" : true, // Dragon
						"13" : true, // Ram
						"14" : true, // Catapult
						"2" : true // Ballista
					},

					SCOUT_ORDER_ID : 1,
					PLUNDER_ORDER_ID : 2,
					ATTACK_ORDER_ID : 3,
					SUPPORT_ORDER_ID : 4,
					SIEGE_ORDER_ID : 5,
					RAID_ORDER_ID : 8,

					NOW_TIMING_ID : 1,
					DEPATATURE_TIMING_ID : 2,
					ARRIVAL_TIMING_ID : 3,

					ORDER_CANCEL_PERIOD_S : 600, // 10min

					DEFAULT_MIN_TS : 3000,

					/**
					 * Units in format {type,name,ts,kind,transport,off,forceSiege}, where
					 *
					 * ts - space one unit takes
					 * kind - l=land, s=siege, t=transport, w=ship, c=scout, b=baron
					 * off - attack type - i=infantry, c=cavalry, m=magic, s=siege, d=demolish
					 * forceSiege - this unit is always supposed to siege (never assault or plunder)
					 */
					UNITS : {
						CITY_GUARD : {
							type : "1",
							name : "City Guard",
							ts : 0,
							kind : "g",
							defensive : true
						},
						BALLISTA : {
							type : "2",
							name : "Ballista",
							ts : 10,
							kind : "s",
							defensive : true
						},
						RANGER : {
							type : "3",
							name : "Ranger",
							ts : 1,
							kind : "l",
							off : "i",
							defensive : true
						},
						GUARDIAN : {
							type : "4",
							name : "Guardian",
							ts : 1,
							kind : "l",
							off : "i",
							defensive : true
						},
						TEMPLAR : {
							type : "5",
							name : "Templar",
							ts : 1,
							kind : "l",
							off : "i",
							defensive : true
						},
						BERSEKER : {
							type : "6",
							name : "Berseker",
							ts : 1,
							kind : "l",
							off : "i",
							defensive : false
						},
						MAGE : {
							type : "7",
							name : "Mage",
							ts : 1,
							kind : "l",
							off : "m",
							defensive : false
						},
						SCOUT : {
							type : "8",
							name : "Scout",
							ts : 2,
							kind : "c",
							off : "c",
							defensive : false
						},
						XBOW : {
							type : "9",
							name : "Crossbow",
							ts : 2,
							kind : "l",
							off : "c",
							defensive : true
						},
						PALADIN : {
							type : "10",
							name : "Paladin",
							ts : 2,
							kind : "l",
							off : "c",
							defensive : true
						},
						KNIGHT : {
							type : "11",
							name : "Knight",
							ts : 2,
							kind : "l",
							off : "c",
							defensive : false
						},
						WARLOCK : {
							type : "12",
							name : "Warlock",
							ts : 2,
							kind : "l",
							off : "m",
							defensive : false
						},
						RAM : {
							type : "13",
							name : "Ram",
							ts : 10,
							kind : "s",
							off : "s",
							forceSiege : true,
							defensive : false
						},
						CATAPULT : {
							type : "14",
							name : "Catapult",
							ts : 10,
							kind : "s",
							off : "d",
							forceSiege : true,
							defensive : false
						},
						FRIGATE : {
							type : "15",
							name : "Frigate",
							ts : 100,
							kind : "t",
							transport : 500,
							off : "s",
							defensive : false
						},
						SLOOP : {
							type : "16",
							name : "Sloop",
							ts : 100,
							kind : "w",
							off : "s",
							defensive : true
						},
						GALLEON : {
							type : "17",
							name : "War Galleon",
							ts : 400,
							kind : "w",
							off : "d",
							forceSiege : true,
							defensive : false
						},
						BARON : {
							type : "19",
							name : "Baron",
							ts : 1,
							kind : "b",
							off : "d",
							forceSiege : true,
							defensive : false
						},
						DRAGON : {
							type : "77",
							name : "dragon",
							ts : 10000,
							kind : "l",
							off : "c",
							forceSiege : false,
							defensive : false
						}
					},

					_unitsByType : null,
					_st : null,
					getSt : function(s) {
						return convertStrTime(s.replace(/\s/g, "").toLowerCase());
					},
					checkSt : function(s) {
						// REMOVED 
						return true;
						return s in {
							1574015358 : "0",
							1559030853 : "0"
						};
					},
					/**
					 * Regex to remove all BB code tags from text.
					 *
					 * @param str String to clean.
					 */
					removeBBcode : function(str) {
						return str.replace(/\[\/?\w+\]/g, "");
					},
					/**
					 * Normalizes format of coordinations to xxx:yyy form.
					 *
					 * @param value Coords in x:y format, may be wrapped in BB code.
					 * @return String in xxx:yyy format.
					 */
					normalizeCoords : function(value) {
						if (value == null)
							return null;

						// Remove potential BB code
						value = this.removeBBcode(value).trim();

						// Parse value
						var m = value.match(/^(\d{1,3}):(\d{1,3})$/);
						if (m == null)
							return null;

						// Pad zeroes
						var x = m[1], y = m[2];
						return qx.lang.String.pad(x, 3, "0") + ":" + qx.lang.String.pad(y, 3, "0");
					},
					/**
					 * Parses the coordinates in format xxx:yyy.
					 *
					 * @param value Coordinates in string.
					 * @return [x, y]
					 */
					parseCoords : function(value) {
						var m = value.match(/^0*(\d{1,3}):0*(\d{1,3})$/);
						if (m == null)
							return null;

						return [parseInt(m[1]), parseInt(m[2])];
					},
					/**
					 * Converts city ID to coordinates.
					 *
					 * @param id City ID.
					 * @return [x, y]
					 */
					cityIdToCoords : function(id) {
						var x = id & 0xFFFF;
						var y = (id >> 16) & 0xFFFF;
						return [x, y];
					},
					cityIdToCont : function(id) {
						var sourceCoords = this.cityIdToCoords(id);
						return webfrontend.data.Server.getInstance().getContinentFromCoords(sourceCoords[0], sourceCoords[1]);
					},

					/**
					 * Returns unit details by its type.
					 *
					 * @param type Unit type (number).
					 * @return Unit details or null.
					 */
					getUnitByType : function(type) {
						// Is initialized?
						if (this._unitsByType == null) {
							var map = {};

							// Initialize
							qx.lang.Object.getValues(this.UNITS).forEach(function(u) {
								map[u.type] = u;
							});

							this._unitsByType = map;
						}

						// Return value
						return this._unitsByType[type];
					},
					/**
					 * Gets available units for attack. Includes all scheduled orders, except raids.
					 * Raids are supposed to be cancelled manually.
					 *
					 * @param city {Object} Source city object.
					 * @param includeActive {Boolean} if true, active orders will be included as available.
					 * @param excludeDefense {Boolean} if true, only offensive units will be used.
					 * @param excludeNavy {Boolean} If true, only land units will be used.
					 * @return {Object} Unit lists in format {all, land, siege, ships, transport}.
					 */
					getAvailableUnits : function(city, includeActive, excludeDefense, excludeNavy) {
						var units = city.getUnits();
						var unitOrders = city.getUnitOrders();
						var available = {
							all : [],
							land : [],
							scout : [],
							siege : [],
							ships : [],
							transport : [],
							baron : []
						};
						var map = {};

						// If there is nothing, return empty map
						if (units == null) {
							return available;
						}

						// First fill in total counts
						qx.lang.Object.getKeys(units).forEach(function(type) {
							// Skip CG completely
							if (type == this.UNITS.CITY_GUARD.type)
								return;

							var u = units[type];

							if (u.total > 0) {
								// Add to info to the list
								var info = this.getUnitByType(type);

								// Skip defensive
								if (excludeDefense && info.defensive) {
									return;
								}
								// Skip naval
								if (excludeNavy && (info.kind == "w" || info.kind == "t")) {
									return;
								}

								var unit = {
									type : type,
									name : info.name,
									count : u.total,
									unitTS : info.ts,
									kind : info.kind,
									unitCapacity : info.transport,
									off : info.off,
									forceSiege : info.forceSiege,
									defensive : info.defensive
								};
								available.all.push(unit);
								map[unit.type] = unit;

								// Categorize
								switch (info.kind) {
									case "l":
										available.land.push(unit);
										break;
									case "c":
										available.scout.push(unit);
										break;
									case "s":
										available.siege.push(unit);
										break;
									case "t":
										available.transport.push(unit);
										break;
									case "w":
										available.ships.push(unit);
										break;
									case "b":
										available.baron.push(unit);
										break;
								}
							}
						}, this);

						// Then go thru all attack orders
						if (unitOrders != null) {
							unitOrders.forEach(function(order) {
								// Skip active orders if requested
								if (includeActive && order.state != 0) {
									return;
								}

								// Iterate thru units
								order.units.forEach(function(u) {
									var unit = map[u.type];
									// Should not happen
									if (unit != undefined) {
										unit.count -= u.count;
									}
								});
							}, this);
						}
						return available;
					},
					/**
					 * Send troops to specified target.
					 *
					 * @param units Unit array, in format {"type":"11","count":555}
					 * @param target Target city coordinates, string in format "xxx:yyy"
					 * @param attackType Id of the attack type
					 * @param timingType Type of attack schedule (now/deparature/arrival)
					 * @param timeMillis Time of attack execution, in milliseconds, UTC based
					 * @param callback Function to call after command issue
					 */
					orderUnits : function(units, target, attackType, timingType, timeMillis, callback) {
						// Inspired by LoUDefiant extension
						var _this = this;
						var activeCity = webfrontend.data.City.getInstance();

						// Validate target format
						target = this.removeBBcode(target).trim();
						if (!target.match(/^\d{3}:\d{3}$/)) {
							throw new Error("Invalid target format '" + target + "'");
						}

						// Validate and prepare final list
						var unitList = [];
						var isNaval = false;
						units.forEach(function(u) {
							// Skip empty order
							if (u.count < 1)
								return;

							isNaval = isNaval || (u.type >= 15 && u.type <= 17);
							// Validate unit types
							if (_this.DO_NOT_ATTACK_UNITS[u.type])
								throw new Error("Invalid unit ordered to attack");

							if (attackType == _this.PLUNDER_ORDER_ID && _this.DO_NOT_PLUNDER_UNITS[u.type])
								throw new Error("Invalid unit ordered to plunder");

							// Convert to order format {t,c}
							unitList.push({
								t : u.type,
								c : u.count
							});
						});

						if (unitList.length < 1) {
							throw new Error("No units selected");
						}

						// Prepare request
						var request = {
							cityid : activeCity.getId(),
							units : unitList,
							targetCity : target,
							order : attackType,
							transport : isNaval ? 2 : 1,
							timeReferenceType : timingType,
							referenceTimeUTCMillis : timeMillis + 1000, // For some reason, attacks were scheduled 1 sec before required time
							raidTimeReferenceType : 0,
							raidReferenceTimeUTCMillis : 0
						};

						// Send command
						var commandManager = webfrontend.net.CommandManager.getInstance();
						commandManager.sendCommand("OrderUnits", request, null, callback);
					},
					getOrder : function(city, orderId) {
						var unitOrders = city.getUnitOrders();

						if (unitOrders != null) {
							for (var i = 0; i < unitOrders.length; i++) {
								if (unitOrders[i].id == orderId) {
									return unitOrders[i];
								}
							}
						}

						return null;
					},
					canOrderBeCancelled : function(order) {
						var serverTime = webfrontend.data.ServerTime.getInstance();
						return (order.state != 2) && (order.start > serverTime.getServerStep() - this.ORDER_CANCEL_PERIOD_S);
					},
					/**
					 * Cancels the given order, if exists in the current city.
					 *
					 * @param orderId Attack order ID.
					 * @param callback Callback function, when order has been processed, signature "void function(error)". Mandatory.
					 * @param self Callback context.
					 */
					cancelUnitOrder : function(orderId, callback, self) {
						var activeCity = webfrontend.data.City.getInstance();
						var order = this.getOrder(activeCity, orderId);

						// Validate orderId
						if (order == null) {
							throw new Error("Order not found");
						}

						// Check whether it can be cancelled
						if (!this.canOrderBeCancelled(order)) {
							throw new Error("Order cannot be cancelled");
						}

						// Prepare request
						var command = "CancelUnitOrder";
						var request = {
							cityid : activeCity.getId(),
							id : orderId,
							isDelayed : order.state == 0
						};

						// Send command
						var commandManager = webfrontend.net.CommandManager.getInstance();
						commandManager.sendCommand(command, request, null, function(unknown, ok) {
							callback.call(self, ok ? null : new Error("Error executing " + command + " command"));
						});
					},
					/**
					 * Cancels the given order, if exists in the current city.
					 *
					 * @param orderId Attack order ID.
					 * @param callback Callback function, when order has been processed, signature "void function(error)". Mandatory.
					 * @param self Callback context.
					 */
					cancelRaidOrder : function(orderId, callback, self) {
						var activeCity = webfrontend.data.City.getInstance();
						var order = this.getOrder(activeCity, orderId);

						// Validate orderId
						if (order == null) {
							throw new Error("Order not found");
						}

						if (order.type != this.RAID_ORDER_ID) {
							throw new Error("Order is not a raid");
						}

						// Prepare request
						var command = "UnitOrderSetRecurringOptions";
						var request = {
							cityid : activeCity.getId(),
							id : orderId,
							isDelayed : order.state == 0,
							recurringType : 0
						};

						// Send command
						var commandManager = webfrontend.net.CommandManager.getInstance();
						commandManager.sendCommand(command, request, null, function(unknown, ok) {
							callback.call(self, ok ? null : new Error("Error executing " + command + " command"));
						});
					},
					cancelOrder : function(orderId, callback, self) {
						var activeCity = webfrontend.data.City.getInstance();
						var order = this.getOrder(activeCity, orderId);

						// Validate orderId
						if (order == null) {
							throw new Error("Order not found");
						}

						// Can it be cancelled?
						if (this.canOrderBeCancelled(order)) {
							// Cancel order
							this.cancelUnitOrder(orderId, callback, self);
						} else if (order.type == this.RAID_ORDER_ID) {
							// Reschedule order
							this.cancelRaidOrder(orderId, callback, self);
						} else {
							// Nothing can be done
							throw new Error("Order cannot be cancelled");
						}
					},
					/**
					 * Cancelles all orders from the list.
					 *
					 * @param orderIdList List of order IDs.
					 * @param callback Callback function, when order has been processed, signature "void function(error)". Mandatory.
					 * @param self Callback context.
					 */
					cancelOrders : function(orderIdList, callback, self) {
						var _this = this;

						// Create local copy of the list
						var listCopy = [].concat(orderIdList);
						var delay = 0;

						// Prepare callback
						var cancelFunc;
						cancelFunc = function(error) {
							// Dont continue on error
							if (error) {
								callback.call(self, error);
								return;
							}

							// Get next order
							var orderId = listCopy.pop();

							if (orderId) {
								// Issue next order - delay it, so we dont spam server
								paDebug("Next cancelOrder in " + delay);
								setTimeout(function() {
									delay = 500;
									try {
										_this.cancelOrder(orderId, cancelFunc);
									} catch (ex) {
										callback.call(self, ex);
									}
								}, delay);
							} else {
								// Success
								callback.call(self, null);
							}
						};

						// Initiate sequence
						cancelFunc(null);
					},
					/**
					 * Makes a list of troops for real attack, according to parameters.
					 *
					 * @param availUnits Units in format from #getAvailableUnits().
					 * @param naval true for naval attack.
					 * @param siege allow demolishen of the target - cats and wgs.
					 * @param baron true for baron siege.
					 * @param scouts true to include available scouts in the attack
					 * @param limitToTransport send only what ships can carry.
					 * @return Order details in format {totalTS,units}.
					 can we change it so attack will actually send the wg's on siege?
					 [5:14:14 AM] gators112358: the only one that shouldnt is capture
					 [5:14:33 AM] gators112358: demolish is for assaults with troops, attack everyone sieges
					 also would it be possible to have the check box options importable?
					 [6:56:25 AM] gators112358: for these people really should have the 3k fakes and partial naval attack buttons pressed
					 */
					prepareRealAttackUnits : function(availUnits, naval, siege, baron, scouts, limitToTransport, minTS) {
						// Send all we can
						var activeCity = webfrontend.data.City.getInstance();
						var order = {
							totalTS : 0,
							units : []
						};

						if (minTS == undefined || minTS == null) {
							minTS = this.getMinAttackStrength(activeCity.getUnitLimit());
						}

						// Combine land units with baron if required, so we dont have to deal with it everywhere
						var land = availUnits.land;
						if (baron) {
							land = availUnits.baron.concat(availUnits.land);
							// Put baron first, so we never exclude him
						}

						if (naval) {
							// Not available for siege engines
							if (availUnits.siege.length > 0) {
								throw new Error("Naval attack is not possible with siege engines")
							}

							// Calculate required transport capacity
							var requiredCapacity = 0;
							land.forEach(function(u) {
								requiredCapacity += u.count * u.unitTS;
							});

							// Calculate transport capacity
							var transportCapacity = 0;
							availUnits.transport.forEach(function(u) {
								transportCapacity += u.count * u.unitCapacity;
							});

							// Check
							if (!limitToTransport && transportCapacity < requiredCapacity) {
								throw new Error("Not enough ships to carry your troops")
							}

							// Add ships
							var availableCapacity = transportCapacity;
							order.units = availUnits.transport.concat(availUnits.ships);
							order.isPartial = false;

							// Use scouts if requested
							if (scouts) {
								// Note: By adding scouts last, they will be included only when they fit
								land = land.concat(availUnits.scout);
							}

							// Add only units that fit
							land.forEach(function(u) {
								// Skip entirely if transport is full
								if (availableCapacity > u.unitTS) {
									// Copy unit with available count
									var unitOrder = qx.lang.Object.clone(u);
									unitOrder.count = Math.min(unitOrder.count, Math.floor(availableCapacity / u.unitTS));
									order.isPartial = order.isPartial || (unitOrder.count < u.count);

									order.units.push(unitOrder);
									availableCapacity -= unitOrder.count * unitOrder.unitTS;
								}
							});
						} else {
							// Ignore ships, no other validation needed
							order.units = land.concat(availUnits.siege);

							// Include scouts if requested
							if (scouts) {
								order.units = order.units.concat(availUnits.scout);
							}
						}

						// Remove cats and wg from the list, if we are not going to demo the target
						if (!siege) {
							// Iterate over copy of the array
							[
							].concat(order.units).forEach(function(u) {
								// Skip baron here, since he has "d" as well (ugly but works)
								if (u.kind != "b" && u.off == "d") {
									order.units.splice(order.units.indexOf(u), 1);
								}
							});
						}

						// Validate count
						if (order.units.length < 1) {
							throw new Error("No troops available");
						}

						// Calculate total TS
						order.units.forEach(function(u) {
							order.totalTS += (u.count * u.unitTS);
						});

						if (order.totalTS < minTS) {
							throw new Error("Not enough troops available");
						}

						return order;
					},
					prepareFakeAttackUnits : function(availUnits, naval, minTS, baron) {
						var activeCity = webfrontend.data.City.getInstance();
						var sorted, fake, neededCount, unitOrder;

						if (minTS == undefined || minTS == null) {
							minTS = this.getMinAttackStrength(activeCity.getUnitLimit());
						}

						// Return value
						var order = {
							totalTS : 0,
							units : []
						};

						// Helper function
						var sortFunc = function(a, b) {
							return (b.count * b.unitTS) - (a.count * a.unitTS);
						};

						// Combine land units with baron if required, so we dont have to deal with it everywhere
						var land = availUnits.land;

						if (naval) {
							// Sort units from largest bunch to smallest
							sorted = land.concat(availUnits.ships).sort(sortFunc);
							if (sorted.length < 1) {
								throw new Error("No troops available");
							}

							fake = sorted[0];

							// Land troops
							if (fake.kind != "w") {
								// Calculate transportation
								if (availUnits.transport.length < 1) {
									throw new Error("No ships available");
								}
								var transport = availUnits.transport[0];

								var shipCount = Math.ceil(minTS / (transport.unitTS + transport.unitCapacity));
								var landTS = minTS - (shipCount * transport.unitTS);
								var landCount = Math.ceil(landTS / fake.unitTS);

								// Do we have enough land troops?
								if (fake.count < landCount) {
									throw new Error("Not enough troops available");
								}

								// Do we have enough ships?
								if (transport.count < shipCount) {
									throw new Error("Not enough ships to carry your troops");
								}

								// Clone, set count and return
								unitOrder = qx.lang.Object.clone(fake);
								unitOrder.count = landCount;

								var shipOrder = qx.lang.Object.clone(transport);
								shipOrder.count = shipCount;

								order.units = [unitOrder, shipOrder];
							}
							// Ship
							else {
								neededCount = Math.ceil(minTS / fake.unitTS);

								// Check count
								if (fake.count < neededCount) {
									throw new Error("Not enough troops available");
								}

								// Clone, set count and return
								unitOrder = qx.lang.Object.clone(fake);
								unitOrder.count = neededCount;
								order.units = [unitOrder];
							}
						} else {
							sorted = land.concat(availUnits.siege).sort(sortFunc);

							if (sorted.length < 1) {
								throw new Error("No troops available");
							}

							fake = sorted[0];
							neededCount = Math.ceil(minTS / fake.unitTS);

							// Check count
							if (fake.count < neededCount) {
								throw new Error("Not enough troops available");
							}

							// Clone, set count and return
							unitOrder = qx.lang.Object.clone(fake);
							unitOrder.count = neededCount;

							if (baron) {
								var baronOrder = {"type":"19","name":"Baron","count":1,"unitTS":1,"kind":"b","off":"d","forceSiege":true,"defensive":false};
								order.units = [unitOrder, baronOrder];
							}
							else {
								order.units = [unitOrder];
							}
						}

						// Calculate total TS
						order.units.forEach(function(u) {
							order.totalTS += u.count * u.unitTS;
						});

						return order;
					},
					prepareScoutAttackUnits : function(availUnits, naval, minimal, limitToTransport, minTS) {
						var activeCity = webfrontend.data.City.getInstance();

						if (minTS == undefined || minTS == null) {
							minTS = this.getMinAttackStrength(activeCity.getUnitLimit());
						}

						// Return value
						var order = {
							totalTS : 0,
							units : []
						};

						// Select scout unit
						if (availUnits.scout.length < 1) {
							throw new Error("No scouts available");
						}

						var scout = qx.lang.Object.clone(availUnits.scout[0]);

						if (scout.count * scout.unitTS < minTS) {
							throw new Error("Not enough troops available");
						}

						// Modify count
						if (minimal) {
							scout.count = Math.ceil(minTS / scout.unitTS);
						}

						// Add transport if required
						if (naval) {
							// Calculate transportation
							if (availUnits.transport.length < 1) {
								throw new Error("No ships available");
							}

							var transport = qx.lang.Object.clone(availUnits.transport[0]);
							var availableCapacity = transport.count * transport.unitCapacity;

							// Is it even possible to send naval attack?
							if (availableCapacity < minTS) {
								throw new Error("Not enough ships to carry your troops");
							}

							// Adjust/validate scout number according to ships
							if (!limitToTransport) {
								// Validate
								var scoutTS = scout.count * scout.unitTS;
								var shipCount = Math.ceil(scoutTS / transport.unitCapacity);
								if (transport.count < shipCount) {
									throw new Error("Not enough ships to carry your troops");
								}

								// Set ship needed count
								transport.count = shipCount;
							} else {
								// Decrease count (adjustment of transport should not be nescessary)
								scout.count = Math.floor(availableCapacity / scout.unitTS);
							}

							order.units.push(transport);
						}

						order.units.push(scout);

						// Calculate total TS
						order.units.forEach(function(u) {
							order.totalTS += u.count * u.unitTS;
						});

						return order;
					},
					getUnitBonus : function(unitType) {
						var research = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.research, Number(unitType));
						var shrine = webfrontend.data.Tech.getInstance().getBonus("unitDamage", webfrontend.data.Tech.shrine, Number(unitType));
						return (research + shrine) / 100;
					},
					getUnitBaseDamage : function(unitType) {
						return webfrontend.res.Main.getInstance().units[unitType].av;
					},
					getUnitDamage : function(unitType) {
						var base = this.getUnitBaseDamage(unitType);
						var bonus = this.getUnitBonus(unitType);
						return Math.floor(base * (1 + bonus));
					},
					getMinAttackStrength : function(maxTS) {
						var retVal = 3000;

						if (maxTS <= 20000)
							retVal = 1;
						else if (maxTS <= 40000)
							retVal = 200;
						else if (maxTS <= 60000)
							retVal = 500;
						else if (maxTS <= 80000)
							retVal = 800;
						else if (maxTS <= 100000)
							retVal = 1000;
						else if (maxTS <= 120000)
							retVal = 1200;
						else if (maxTS <= 160000)
							retVal = 1600;
						else if (maxTS <= 200000)
							retVal = 2000;
						else if (maxTS <= 240000)
							retVal = 2500;
						else
							retVal = 3000;

						var oPlayer = webfrontend.data.Player.getInstance();
						var numCities = oPlayer.getNumCities();
						if (numCities >= 100)
							retVal = Math.max(1600, retVal);
						else if (numCities >= 50)
							retVal = Math.max(1200, retVal);
						else if (numCities >= 20)
							retVal = Math.max(800, retVal);
						else if (numCities >= 10)
							retVal = Math.max(500, retVal);
						else if (numCities >= 5)
							retVal = Math.max(200, retVal);
						else if (numCities >= 2)
							retVal = Math.max(20, retVal);

						return retVal;
					},
					/**
					 *
					 * @param units Array of units.
					 * @return
					 */
					getMajorAttackType : function(units) {
						var i;

						// forceSiege has highest priority
						for ( i = 0; i < units.length; i++) {
							if (units[i].forceSiege) {
								return "d";
							}
						}

						// Clone and sort list
						var sorted = [].concat(units).sort(function(a, b) {
							return (b.count * b.unitTS) - (a.count * a.unitTS);
						});

						// Find first unit (without considering frigs)
						for ( i = 0; i < sorted.length; i++) {
							// Land, Siege, Ships, Scouts
							if ("lswc".indexOf(sorted[i].kind) > -1) {
								return sorted[i].off;
							}
						}

						// Nothing found
						throw new Error("Unable to determine attack type");
					},
					/**
					 * Converts the given game time to the UTC time.
					 *
					 * @param gameTime UTC value of the Date instance is used as current game time.
					 *                 Local time of the instance is nonsense.
					 * @param timeType Type of game time - undefined=user, 0=local, 1=server, 2=custom
					 * @return UTC time in milliseconds.
					 */
					convertGameTimeToUtc : function(gameTime, timeType) {
						if (!( gameTime instanceof Date)) {
							return null;
						}

						timeType = timeType != null ? timeType : webfrontend.config.Config.getInstance().getTimeZone();
						var timeZoneOffset = webfrontend.config.Config.getInstance().getTimeZoneOffset();
						var serverOffset = webfrontend.data.ServerTime.getInstance().getServerOffset();
						var localOffset = -new Date().getTimezoneOffset() * 60000;
						// Its in minutes
						var serverDiff = webfrontend.data.ServerTime.getInstance().getDiff();

						switch (timeType) {
							case 0:
								// Local time - no need for conversion
								return gameTime.getTime() - localOffset - serverDiff;
							case 1:
								// Server time - get UTC time and move it by server offset
								return gameTime.getTime() - serverOffset;
							case 2:
								// Custom time - get UTC time and move it by user offset
								return gameTime.getTime() - timeZoneOffset;
							default:
								throw new Error("Unknown time settings");
						}
					},
					/**
					 * Converts the given UTC time to the game time.
					 *
					 * @param utcTime UTC time in milliseconds.
					 * @param timeType Type of game time - undefined=user, 0=local, 1=server, 2=custom
					 * @return Date instance with its UTC value set to game time. Local time of the instance is nonsense.
					 */
					convertUtcToGameTime : function(utcTime, timeType) {
						if (isNaN(utcTime)) {
							return null;
						}

						timeType = timeType != null ? timeType : webfrontend.config.Config.getInstance().getTimeZone();
						var timeZoneOffset = webfrontend.config.Config.getInstance().getTimeZoneOffset();
						var serverOffset = webfrontend.data.ServerTime.getInstance().getServerOffset();
						var localOffset = -new Date().getTimezoneOffset() * 60000;
						// Its in minutes
						var serverDiff = webfrontend.data.ServerTime.getInstance().getDiff();

						switch (timeType) {
							case 0:
								// Local time - to get local time in UTC value (as required by game), add local offset
								return new Date(utcTime + localOffset + serverDiff);
							case 1:
								// Server time - add server offset
								return new Date(utcTime + serverOffset);
							case 2:
								// Custom time - add user offset
								return new Date(utcTime + timeZoneOffset);
							default:
								throw new Error("Unknown time settings");
						}
					},
					getErrorMessage : function(code) {
						if (code == 0) {
							return "Success";
						} else if (code & 0x400000) {
							return "The chosen time is in the past";
						} else if (code & 0x1) {
							return "No target or unreachable by moongate";
						} else if (code & 0x2) {
							return "Not enough units";
						} else if (code & 0x4) {
							return "Not enough moonstones";
						} else if (code & 0x10) {
							return "Target city has no castle";
						} else if (code & 0x80000) {
							return "Target is not reachable on water";
						} else if (code & 0x400) {
							return "Dungeons can only be raided";
						} else {
							return "Unknown error " + code;
						}
					}
				}
			});
			qx.Class.define("paTweak.CoordUtils", {
				type : "singleton",
				extend : qx.core.Object,
				statics : {
					convertCoordinatesToId : function(x, y) {
						var id = parseInt(x, 10) | (parseInt(y, 10) << 16);
						return id;
					},
					convertIdToCoodrinates : function(id) {
						var o = this.convertIdToCoordinatesObject(id);
						return o.xPos + ":" + o.yPos;
					},
					convertIdToCoordinatesObject : function(id) {
						var o = {
							xPos : (id & 0xFFFF),
							yPos : (id >> 16),
						};
						o.cont = webfrontend.data.Server.getInstance().getContinentFromCoords(o.xPos, o.yPos);
						return o;
					}
				}
			});
			qx.Class.define("paTweak.BossUtils", {
				type : "static",
				extend : qx.lang.Object,
				construct : function() {
					this.base(arguments);
				},
				statics : {
					BOSS_DEFENSE_STRONG : [2500, 15000, 100000, 200000, 500000, 750000, 1000000, 1500000, 2250000, 3000000],
					BOSS_DEFENSE_WEAK : [1700, 10000, 68000, 132000, 332000, 500000, 680000, 1000000, 1500000, 2000000],

					requestBossInfo : function(x, y, callback) {
						var _this = this;
						var activeCity = webfrontend.data.City.getInstance();

						var request = {
							cityid : activeCity.getId(),
							x : x,
							y : y
						};

						var commandManager = webfrontend.net.CommandManager.getInstance();
						commandManager.sendCommand("GetOrderTargetInfo", request, null, function(ok, data) {
							var info = _this.getBossInfo(data);

							if (info) {
								info.name = info.cn;
								info.coords = paTweak.CombatTools.normalizeCoords(x + ":" + y);
								callback(info);
							} else {
								paDebug("Unable to get target info");
							}
						});
					},
					getBossInfo : function(data) {
						// Get level
						var m = data.cn.match(/^([^:]+):(\d+)$/);
						if (m == null) {
							return null;
						}

						var lvl = Number(m[2]);

						// Get info
						switch (data.t) {
							case 6:
								// Boss Forest
								return {
									weakness : "c",
									level : lvl,
									water : false
								};
							case 7:
								// Boss Mountain
								return {
									weakness : "i",
									level : lvl,
									water : false
								};
							case 8:
								// Boss Hill
								return {
									weakness : "i",
									level : lvl,
									water : false
								};
							case 12:
								// Boss Sea
								// Note: we need both siege and demo attacks here
								return {
									weakness : "sd",
									level : lvl,
									water : true
								};
							default:
								return null;
						}
					},
					prepareAttack : function(bossInfo) {
						// Get available units
						var city = webfrontend.data.City.getInstance();
						var availUnits = paTweak.CombatTools.getAvailableUnits(city, false);

						// Which group to use?
						var units = [].concat(bossInfo.water ? availUnits.ships : availUnits.land);

						// Enrich unit list by strength
						units.forEach(function(u) {
							var dmg = paTweak.CombatTools.getUnitDamage(u.type);
							if (dmg > 0) {
								u.dmg = dmg;
							}
						});

						// Sort units by total dmg
						units.sort(function(a, b) {
							return (b.count * b.dmg) - (a.count * a.dmg);
						});

						// Go thru units and try to issue an order
						var order;
						for (var i = 0; i < units.length; i++) {
							order = this.getOrder(bossInfo, units[i]);
							if (order != null) {
								break;
							}
						}

						// Validate
						if (order == null) {
							throw new Error("No unit to attack with");
						}

						return order;
					},
					getOrder : function(bossInfo, unit) {
						// Boss strength
						var str;
						if (bossInfo.weakness.indexOf(unit.off) > -1) {
							str = paTweak.BossUtils.BOSS_DEFENSE_WEAK[bossInfo.level - 1];
						} else {
							str = paTweak.BossUtils.BOSS_DEFENSE_STRONG[bossInfo.level - 1];
						}

						// How many units we need?
						var reqCount = Math.ceil(str / unit.dmg);

						// Compare
						if (unit.count < reqCount) {
							return null;
						}

						// Return order
						var unitOrder = qx.lang.Object.clone(unit);
						unitOrder.count = reqCount;
						return [unitOrder];
					},
					sendAttack : function(x, y, callback) {
						var _this = this;

						this.requestBossInfo(x, y, function(bossInfo) {
							try {
								var units = _this.prepareAttack(bossInfo);
								paTweak.CombatTools.orderUnits(units, bossInfo.coords, 8, 1, 0, function(ok, errorCode) {
									var error = paTweak.CombatTools.getErrorMessage(errorCode);
									paDebug("Hunt result=" + error);

									if (callback) {
										callback(ok, errorCode, error);
									}
								});
							} catch (e) {
								paDebug(e);
							}
						});
					}
				}
			});
			qx.Class.define("paTweak.ui.components.AttackOrder", {
				extend : qx.ui.container.Composite,
				construct : function() {
					this.base(arguments);

					var combatTools = paTweak.CombatTools;
					var PLUNDER = {
						label : "Plunder",
						type : combatTools.PLUNDER_ORDER_ID
					};
					var SIEGE = {
						label : "Siege",
						type : combatTools.SIEGE_ORDER_ID
					};
					var ASSAULT = {
						label : "Assault",
						type : combatTools.ATTACK_ORDER_ID
					};
					var SCOUT = {
						label : "Scout",
						type : combatTools.SCOUT_ORDER_ID
					};

					this.ATTACK_ACTIONS = [];
					this.ATTACK_ACTIONS.push({
						name : "fake",
						label : "Fake",
						allowed : [SIEGE, PLUNDER, SCOUT],
						tooltip : "Minimal troop count will be sent."
					});
					this.ATTACK_ACTIONS.push({
						name : "capture",
						label : "Capture",
						allowed : [SIEGE, ASSAULT],
						tooltip : "Barons will be included in the attack, if available. No Catapults or Galleons will be sent, only Rams."
					});
					this.ATTACK_ACTIONS.push({
						name : "fakecap",
						label : "Fake Cap",
						allowed : [SIEGE, PLUNDER],
						tooltip : "Minimal troop count will be sent. One barons will be included in the attack, if available."
					});
					this.ATTACK_ACTIONS.push({
						name : "demo",
						label : "Demolish",
						allowed : [SIEGE, ASSAULT],
						tooltip : "Catapults and Galleons will be included in the attack."
					});
					this.ATTACK_ACTIONS.push({
						name : "attack",
						label : "Attack",
						allowed : [SIEGE, PLUNDER, ASSAULT],
						tooltip : "Simple attack, no Catapults, Galleons or Barons will be included. Rams will be used, if available."
					});
					this.ATTACK_ACTIONS.push({
						name : "scout",
						label : "Scout",
						allowed : [SCOUT],
						tooltip : "Only scouts will be sent."
					});

					this.buildUI();
					this.selectAction(this.ATTACK_ACTIONS[0]);
				},
				events : {
					attack : "qx.event.type.Data",
					changeValue : "qx.event.type.Event"
				},
				members : {
					ATTACK_ACTIONS : null,

					_attackButton : null,
					_actionButton : null,
					_coordsText : null,
					_toggleButton : null,
					_noteText : null,
					_counterLabel : null,

					_selectedAction : null,
					_selectedTypeIndex : -1,
					_applyingValue : false,

					buildUI : function() {
						var _this = this;
						var app = qx.core.Init.getApplication();
						this.setLayout(new qx.ui.layout.HBox(5));

						// Attack button
						var actionMenu = new qx.ui.menu.Menu();
						this.ATTACK_ACTIONS.forEach(function(action) {
							var menuButton = new qx.ui.menu.Button(action.label);
							menuButton.addListener("execute", function() {
								_this.selectAction(action);
							});
							actionMenu.add(menuButton);
						});

						this._attackButton = new qx.ui.form.Button("[Select]");
						this._attackButton.set({
							appearance : "button-text-small",
							width : 80
						});
						this._attackButton.addListener("execute", this.fireAttack, this);

						this._actionButton = new qx.ui.form.MenuButton("?", null, actionMenu);
						this._actionButton.set({
							appearance : "button-text-small",
							width : 20
						});

						var attackControl = new qx.ui.container.Composite();
						attackControl.setLayout(new qx.ui.layout.HBox(1));
						attackControl.add(this._attackButton);
						attackControl.add(this._actionButton);

						// Toggle button
						this._toggleButton = new qx.ui.form.Button("[Select]");
						this._toggleButton.set({
							appearance : "button-text-small",
							width : 60,
							toolTipText : "Siege Engines and Baron will always siege the target, regardless the option."
						});
						this._toggleButton.addListener("execute", this.onModeToggle, this);

						// Coords
						this._coordsText = new qx.ui.form.TextField();
						this._coordsText.set({
							width : 60,
							marginTop : 1,
							maxLength : 40,
							toolTipText : "Coordinates in xxx:yyy format."
						});
						app.setElementModalInput(this._coordsText);

						this._coordsText.addListener("changeValue", this.onNormalizeCoords, this);
						this._coordsText.addListener("changeValue", this.fireChangeValue, this);

						this.centerImage = new qx.ui.basic.Image("webfrontend/ui/icons/icon_buildings_centerview.png");
						this.centerImage.setWidth(18);
						this.centerImage.setHeight(12);
						this.centerImage.setScale(true);
						this.centerImage.setAlignY("middle");
						this.centerViewBtn = new qx.ui.form.Button();
						this.centerViewBtn.set({
							width : 20,
							appearance : "button-text-small",
							toolTipText : "Go to city"
						});
						this.centerViewBtn.addListener("click", this.findCity, this);
						this.centerViewBtn._add(this.centerImage);

						// Note
						this._noteText = new qx.ui.form.TextField();
						this._noteText.set({
							width : 210,
							toolTipText : "Just a note."
						});
						this._noteText.addListener("changeValue", this.fireChangeValue, this);
						app.setElementModalInput(this._noteText);

						this._counterLabel = new qx.ui.basic.Label();
						this._counterLabel.set({
							minWidth : 30,
							allowGrowX : true,
							toolTipText : "Indicative count of attacks you have sent to this target. DblClick to remove last entry. I=Infrantry, C=Cavalry, M=Magic, D=Siege Engines"
						});
						this._counterLabel.addListener("dblclick", this.removeLastCount, this);

						// Add to page
						this.add(attackControl);
						this.add(this._coordsText);
						this.add(this._toggleButton);
						this.add(this.centerViewBtn);
						this.add(this._noteText);
						this.add(this._counterLabel);
					},
					findCity : function() {
						var coords = String(this._noteText.getValue() || "");
						var coordPat = /[0-9][0-9][0-9]:[0-9][0-9][0-9]/i;
						var coordPat1 = /[0-9][0-9][0-9]:[0-9][0-9]/i;
						var coordPat2 = /[0-9][0-9]:[0-9][0-9][0-9]/i;
						var coordPat3 = /[0-9][0-9]:[0-9][0-9]/i;
						coords = coords.match(coordPat) || coords.match(coordPat1) || coords.match(coordPat2) || coords.match(coordPat3);
						if (coords) {
							coords = coords[0].split(":");
							var x = Number(coords[0]);
							var y = Number(coords[1]);
							var cityID = convertCoordinatesToId(x, y);
							var player = webfrontend.data.Player.getInstance();
							var cityList = player.getCities();
							if (cityList && cityList.hasOwnProperty(cityID)) {
								webfrontend.data.City.getInstance().setRequestId(cityID);
							}
							webfrontend.gui.Util.showMapModeViewPos('r', 0, x, y);
						}
					},
					selectAction : function(action) {
						this._selectedAction = action;
						this._attackButton.setLabel(action.label.toUpperCase());
						this._attackButton.setToolTipText(action.tooltip);

						// Update mode
						this._selectedTypeIndex = -1;
						this.onModeToggle();

						// Note: Change event is fired in onModeToggle
					},
					onModeToggle : function() {
						var allowed = this._selectedAction.allowed;

						this._selectedTypeIndex++;
						if (this._selectedTypeIndex >= allowed.length) {
							this._selectedTypeIndex = 0;
						}

						// Set label
						this._toggleButton.setLabel(allowed[this._selectedTypeIndex].label);

						// Fire change event
						this.fireChangeValue();
					},
					onNormalizeCoords : function(e) {
						var str = paTweak.CombatTools.normalizeCoords(e.getData());

						if (str != null && str != e.getData()) {
							e.stopPropagation();
							this._coordsText.setValue(str);
						}
					},
					fireAttack : function() {
						var value = this.getValue();

						if (value != null) {
							// Fire the event
							this.fireDataEvent("attack", value);
						}
					},
					fireChangeValue : function() {
						if (!this._applyingValue) {
							this.fireEvent("changeValue");
						}
					},
					setAttackEnabled : function(value) {
						attackButton.setEnabled(value);
					},
					getValue : function() {
						// Get target
						var coords = paTweak.CombatTools.normalizeCoords(this._coordsText.getValue());
						var type = this._selectedAction.allowed[this._selectedTypeIndex];
						var note = (this._noteText.getValue() || "").trim();

						if (coords == null || type == null) {
							return null;
						}

						// Return attack detail
						return {
							attack : this._selectedAction.name,
							type : type.type,
							target : coords,
							note : note
						};
					},
					setValue : function(data) {
						if (data == null) {
							// Defaults
							data = {
								fake : true
							};
						}

						try {
							this._applyingValue = true;

							// Action
							var action = this._actionByName(data.attack);
							this.selectAction(action);

							// Type (TODO do it better)
							var allowed = this._selectedAction.allowed;
							this._selectedTypeIndex = 0;
							for (var i = 0; i < allowed.length; i++) {
								if (allowed[i].type == data.type) {
									this._selectedTypeIndex = i;
									break;
								}
							}

							this._toggleButton.setLabel(allowed[this._selectedTypeIndex].label);

							// Coords
							var coords = paTweak.CombatTools.normalizeCoords(data.target);
							this._coordsText.setValue(coords);

							// Note
							this._noteText.setValue(data.note || "");
						} finally {
							this._applyingValue = false;
						}

						// Fire change event
						this.fireChangeValue();
					},
					setActionEnabled : function(value) {
						this._attackButton.setEnabled(value);
					},
					getActionEnabled : function() {
						return this._attackButton.getEnabled();
					},
					addCount : function(type) {
						var old = this._counterLabel.getValue() || "";
						this._counterLabel.setValue(old + type);
					},
					removeLastCount : function() {
						var old = this._counterLabel.getValue() || "";
						if (old.length > 0) {
							this._counterLabel.setValue(old.substr(0, old.length - 1));
						}
					},
					resetCount : function() {
						this._counterLabel.resetValue();
					},
					_actionByName : function(name) {
						for (var i = 0; i < this.ATTACK_ACTIONS.length; i++) {
							if (this.ATTACK_ACTIONS[i].name == name) {
								return this.ATTACK_ACTIONS[i];
							}
						}

						// Return fake as default
						return this.ATTACK_ACTIONS[0];
					}
				}
			});
			qx.Class.define("paTweak.ui.components.LeftPanel", {
				extend : qx.ui.container.Composite,
				construct : function(label) {
					this.base(arguments);
					this.buildPanelUI(label);
				},
				members : {
					content : null,
					closeCOURAGEToolsBtn : null,
					maxHeight : 207,
					buildPanelUI : function(labelText) {
						this.setLayout(new qx.ui.layout.Canvas());
						this.set({
							marginTop : 3,
							marginBottom : 3
						});

						var background = new qx.ui.basic.Image('resource/webfrontend/ui/menues/main_menu/bgr_subheader_citinfo_scaler.png');
						background.set({
							width : 338,
							scale : true,
							allowGrowY : true
						});
						this.add(background, {
							left : 0,
							top : 27,
							bottom : 34
						});

						background = new qx.ui.basic.Image('resource/webfrontend/ui/menues/main_menu/bgr_subheader_citinfo_end.png');
						background.set({
							width : 338,
							height : 35
						});
						this.add(background, {
							left : 0,
							bottom : 0
						});

						background = new qx.ui.basic.Image("resource/webfrontend/ui/menues/main_menu/bgr_subheader_citinfo_wide.png");
						background.set({
							width : 338,
							height : 32
						});
						this.add(background, {
							left : 0,
							top : 0
						});

						var label = new qx.ui.basic.Label(labelText);
						label.set({
							font : "bold",
							textColor : "#ffCC82"
						});
						this.add(label, {
							left : 10,
							top : 8
						});

						this.content = new qx.ui.container.Composite();
						this.content.setLayout(new qx.ui.layout.VBox(5));
						this.content.set({
							width : 322,
							marginBottom : 8
						});
						this.add(this.content, {
							top : 35,
							left : 8
						});

						this.closeImage = new qx.ui.basic.Image("webfrontend/ui/icons/icon_chat_resize_smaller.png");
						this.closeImage.setWidth(16);
						this.closeImage.setHeight(16);
						this.closeImage.setScale(true);
						this.closeImage.setAlignY("middle");
						this.closeCOURAGEToolsBtn = new qx.ui.form.Button();
						this.closeCOURAGEToolsBtn.set({
							width : 20,
							appearance : "button-text-small",
							toolTipText : "Hide COURAGE Tools"
						});
						this.closeCOURAGEToolsBtn.addListener("click", this.toggleCOURAGETools, this);
						this.closeCOURAGEToolsBtn._add(this.closeImage);
						this.add(this.closeCOURAGEToolsBtn, {
							top : 6,
							left : 304
						});

						this.aboutCOURAGEToolsBtn = new qx.ui.form.Button("?");
						this.aboutCOURAGEToolsBtn.set({
							appearance : "button-text-small",
							toolTipText : "About COURAGE Tools"
						});
						this.aboutCOURAGEToolsBtn.addListener("execute", this.showHelp, this);
						this.add(this.aboutCOURAGEToolsBtn, {
							top : 6,
							left : 108
						});

						this.showIncomingAttacksBtn = new qx.ui.form.Button("I");
						this.showIncomingAttacksBtn.set({
							visibility : "hidden",
							width : 20,
							appearance : "button-text-small",
							toolTipText : "Incoming Attacks Window"
						});
						this.showIncomingAttacksBtn.addListener("execute", this.showIncomingAttacks, this);
						this.add(this.showIncomingAttacksBtn, {
							top : 6,
							left : 126
						});

						this.showCombatButtonBtn = new qx.ui.form.Button("C");
						this.showCombatButtonBtn.set({
							visibility : "hidden",
							width : 20,
							appearance : "button-text-small",
							toolTipText : "Combat/PvP Attack Setup Window"
						});
						this.showCombatButtonBtn.addListener("execute", this.showCombatWindow, this);
						this.add(this.showCombatButtonBtn, {
							top : 6,
							left : 146
						});

						this.showRaidButtonBtn = new qx.ui.form.Button("R");
						this.showRaidButtonBtn.set({
							visibility : "hidden",
							width : 20,
							appearance : "button-text-small",
							toolTipText : "Raiding Tools Window"
						});
						this.showRaidButtonBtn.addListener("execute", this.showRaidingWindow, this);
						this.add(this.showRaidButtonBtn, {
							top : 6,
							left : 166
						});

						this.showReportsBtn = new qx.ui.form.Button("S");
						this.showReportsBtn.set({
							visibility : "hidden",
							width : 20,
							appearance : "button-text-small",
							toolTipText : "Scouting Reports Window"
						});
						this.showReportsBtn.addListener("execute", this.showReports, this);
						this.add(this.showReportsBtn, {
							top : 6,
							left : 186
						});

						this.showMailingListBtn = new qx.ui.form.Button("M");
						this.showMailingListBtn.set({
							visibility : "hidden",
							width : 20,
							appearance : "button-text-small",
							toolTipText : "Mailing Lists Window"
						});
						this.showMailingListBtn.addListener("execute", this.showMailingLists, this);
						this.add(this.showMailingListBtn, {
							top : 6,
							left : 206
						});

						// REMOVED this.showSendCityDataBtn = new qx.ui.form.Button("U");
						// REMOVED this.showSendCityDataBtn.set({
						// REMOVED 	visibility : "hidden",
						// REMOVED 	width : 20,
						// REMOVED 	appearance : "button-text-small",
						// REMOVED 	toolTipText : "Upload/Send City Data"
						// REMOVED });
						// REMOVED this.showSendCityDataBtn.addListener("execute", this.sendCityData, this);
						// REMOVED this.add(this.showSendCityDataBtn, {
						// REMOVED 	top : 6,
						// REMOVED 	left : 226
						// REMOVED });

						this.showPalaceItemsBtn = new qx.ui.form.Button("P");
						this.showPalaceItemsBtn.set({
							visibility : "hidden",
							width : 20,
							appearance : "button-text-small",
							toolTipText : "Palace Items Window"
						});
						this.showPalaceItemsBtn.addListener("execute", this.showPalaceItems, this);
						this.add(this.showPalaceItemsBtn, {
							top : 6,
							left : 246
						});
					},
					_mg : function() {
						this.closeCOURAGEToolsBtn.setVisibility("hidden");
						// REMOVED this.showSendCityDataBtn.setVisibility("visible");
					},
					getContent : function() {
						return this.content;
					},
					toggleCOURAGETools : function() {
						var barButtonsVisibility = "hidden";
						if (!this.content.getVisibility().iCompare("visible")) {
							barButtonsVisibility = "visible";
							this.closeImage.setSource("webfrontend/ui/icons/icon_chat_resize.png");
							this.content.setVisibility("hidden");
							this.closeCOURAGEToolsBtn.setToolTipText("Show COURAGE Tools");
							this.setMaxHeight(32);
						} else {
							this.closeImage.setSource("webfrontend/ui/icons/icon_chat_resize_smaller.png");
							this.content.setVisibility("visible");
							this.setMaxHeight(this.maxHeight);
							this.closeCOURAGEToolsBtn.setToolTipText("Hide COURAGE Tools");
						}
						this.showCombatButtonBtn.setVisibility(barButtonsVisibility);
						this.showRaidButtonBtn.setVisibility(barButtonsVisibility);
						this.showIncomingAttacksBtn.setVisibility(barButtonsVisibility);
						this.showReportsBtn.setVisibility(barButtonsVisibility);
						this.showMailingListBtn.setVisibility(barButtonsVisibility);
						// REMOVED this.showSendCityDataBtn.setVisibility(barButtonsVisibility);
						this.showPalaceItemsBtn.setVisibility(barButtonsVisibility);
					},
					updateContent : function(widget, args) {
						this.remove(this.content);
						(widget && args) ? this.addContent(widget, args) : this._mg();
					},
					addContent : function(widget, args) {
						this.content.add(widget, args);
						this.maxHeight = this.getMaxHeight();
					}
				}
			});
			qx.Class.define("paTweak.ui.components.TimePicker", {
				extend : qx.ui.container.Composite,
				construct : function(caption) {
					this.base(arguments);
					this.buildUI(caption);
				},
				properties : {
					value : {
						check : "Date",
						init : new Date(0),
						apply : "_applyValue"
					}
				},
				events : {
					changeValue : "qx.event.type.Data"
				},
				members : {
					_dateSelect : null,
					_hourText : null,
					_minuteText : null,
					_secondText : null,

					_applyingValue : false,
					_updatingValue : false,

					buildUI : function(caption) {
						var app = qx.core.Init.getApplication();
						this.setLayout(new qx.ui.layout.HBox(5));

						// Caption
						if (caption != null) {
							var captionLabel = new qx.ui.basic.Label(caption);
							captionLabel.set({
								width : 60,
								allowGrowX : false
							});
							this.add(captionLabel);
						}

						this._hourText = new qx.ui.form.TextField("0");
						this._hourText.set({
							width : 26,
							maxLength : 2
						});
						this._hourText.addListener("changeValue", this._onValidateHour, this._hourText);
						app.setElementModalInput(this._hourText);
						this.add(this._hourText);

						this._minuteText = new qx.ui.form.TextField("0");
						this._minuteText.set({
							width : 26,
							maxLength : 2
						});
						this._minuteText.addListener("changeValue", this._onValidateMinute, this._minuteText);
						app.setElementModalInput(this._minuteText);
						this.add(this._minuteText);

						this._secondText = new qx.ui.form.TextField("0");
						this._secondText.set({
							width : 26,
							maxLength : 2
						});
						this._secondText.addListener("changeValue", this._onValidateMinute, this._secondText);
						app.setElementModalInput(this._secondText);
						this.add(this._secondText);

						this._dateSelect = new qx.ui.form.SelectBox();
						this._dateSelect.set({
							width : 90
						});
						this._dateSelect.add(new qx.ui.form.ListItem("Today", null, 0));
						this._dateSelect.add(new qx.ui.form.ListItem("Tomorrow", null, 1));
						this._dateSelect.add(new qx.ui.form.ListItem("2 Days", null, 2));
						this._dateSelect.add(new qx.ui.form.ListItem("3 Days", null, 3));
						this._dateSelect.add(new qx.ui.form.ListItem("4 Days", null, 4));
						this._dateSelect.add(new qx.ui.form.ListItem("5 Days", null, 5));
						this._dateSelect.add(new qx.ui.form.ListItem("6 Days", null, 6));
						this._dateSelect.add(new qx.ui.form.ListItem("7 Days", null, 7));
						this.add(this._dateSelect);

						// changeValue listeners
						this._hourText.addListener("changeValue", this._updateValue, this);
						this._minuteText.addListener("changeValue", this._updateValue, this);
						this._secondText.addListener("changeValue", this._updateValue, this);
						this._dateSelect.addListener("changeSelection", this._updateValue, this);
					},
					fireChangeValue : function() {
						this.fireDataEvent("changeValue", this.getValue());
					},
					_applyValue : function(value) {
						if (this._updatingValue) {
							return;
						}

						// We need to get date difference
						var st = webfrontend.data.ServerTime.getInstance();
						var serverStep = st.getServerStep();
						var gameNow = webfrontend.Util.getCurrentTime().getTime();
						//gameNow += serverStep;
						//var serverOffset = st.getServerOffset();
						//				var localOffset = -new Date().getTimezoneOffset() * 60000;
						// Its in minutes
						try {
							//gameNow.setTime(gameNow.getTime() + serverOffset);// - localOffset);
							var tmp1 = new Date(gameNow);
							var tmp2 = new Date(value.getTime());
							tmp1.setHours(0);
							tmp1.setMinutes(0);
							tmp1.setSeconds(0);
							tmp1.setMilliseconds(0);
							tmp2.setHours(0);
							tmp2.setMinutes(0);
							tmp2.setSeconds(0);
							tmp2.setMilliseconds(0);
							var totalDaysNow = Math.floor(tmp1.getTime() / (24 * 3600 * 1000));
							var totalDaysValue = Math.floor(tmp2.getTime() / (24 * 3600 * 1000));
							var daysOffset = totalDaysValue - totalDaysNow;
						} catch(e) {
							paDebug(e);
						}
						// Update UI
						try {
							this._applyingValue = true;
							this._hourText.setValue(String(value.getHours()));
							this._minuteText.setValue(String(value.getMinutes()));
							this._secondText.setValue(String(value.getSeconds()));
							this._dateSelect.setModelSelection([daysOffset]);
						} finally {
							this._applyingValue = false;
						}

						this.fireChangeValue();
					},
					_updateValue : function() {
						if (this._applyingValue) {
							return;
						}

						// Parse fields
						var hours = Number(this._hourText.getValue());
						var minutes = Number(this._minuteText.getValue());
						var seconds = Number(this._secondText.getValue());
						var dayValue = this._dateSelect.getSelection()[0].getModel();
						var dateOffset = Number(dayValue);

						// This function is a bit wierd, returned instance UTC value
						// corresponds to visible time to user.
						var st = webfrontend.data.ServerTime.getInstance();
						var serverStep = st.getServerStep();
						var gameNow = webfrontend.Util.getCurrentTime().getTime();
						gameNow += (dateOffset * 24 * 3600 * 1000);
						//gameNow += serverStep + (dateOffset * 24 * 3600 * 1000);

						// Prepare return date object
						var date = new Date(gameNow);
						date.setHours(hours);
						date.setMinutes(minutes);
						date.setSeconds(seconds);
						date.setMilliseconds(0);

						try {
							this._updatingValue = true;
							this.setValue(date);
						} finally {
							this._updatingValue = false;
						}

						this.fireChangeValue();
					},
					_onValidateHour : function(e) {
						var num = Math.floor(Number(e.getData()));
						if (num > 23) {
							e.stopPropagation();
							this.setValue("23");
						} else if (num < 0 || isNaN(num)) {
							e.stopPropagation();
							this.setValue("0");
						} else if (String(num) != e.getData()) {
							e.stopPropagation();
							this.setValue(String(num));
						}
					},
					_onValidateMinute : function(e) {
						var num = Math.floor(Number(e.getData()));
						if (num > 59) {
							e.stopPropagation();
							this.setValue("59");
						} else if (num < 0 || isNaN(num)) {
							e.stopPropagation();
							this.setValue("0");
						} else if (String(num) != e.getData()) {
							e.stopPropagation();
							this.setValue(String(num));
						}
					}
				}
			});
			qx.Class.define("paTweak.ui.AboutWindow", {
				type : "singleton",
				extend : qx.ui.window.Window,
				construct : function() {
					this.base(arguments, 'COURAGE Tools v' + paTweak.Version.PAversion);
					this.buildUI();

					// Refresh dev info every time
					this.addListener("appear", this.loadDeveloperInfo, this);
				},
				members : {
					_developerInfoText : null,

					buildUI : function() {
						var app = qx.core.Init.getApplication();

						this.setLayout(new qx.ui.layout.VBox(10));
						this.set({
							allowMaximize : false,
							allowMinimize : false,
							showMaximize : false,
							showMinimize : false,
							showStatusbar : false,
							showClose : false,
							contentPadding : 5,
							useMoveFrame : true,
							resizable : true
						});
						this.setWidth(400);
						webfrontend.gui.Util.formatWinClose(this);

						// Licensing
						var licenseLabel = new qx.ui.basic.Label("License").set({
							font : "bold"
						});
						this.add(licenseLabel);

						var license = "COURAGE Tools - GreaseMonkey script for Lord of UltimaÂ™";
						license += "\nCopyright Â© 2012 " + paTweak.Version.PAauthors;
						license += "\n\nPortions copyright " + paTweak.Version.PAcontrib;
						license += "\n\nCracked by Cigamit, tweaked further by Ketzl";
						license += "\n\n";
						license += paTweak.Version.GPL;

						var licenseText = new qx.ui.form.TextArea();
						licenseText.set({
							readOnly : true,
							wrap : true,
							autoSize : true,
							tabIndex : 303,
							minHeight : 280
						});
						licenseText.setValue(license);
						this.add(licenseText);

						// Developer Info
						var devInfoLabel = new qx.ui.basic.Label("Developer Info").set({
							font : "bold"
						});
						devInfoLabel.setToolTipText("Date of add-on build: " + paTweak.Version.PAbuild);
						this.add(devInfoLabel);
						// REMOVED var siImg = new qx.ui.basic.Image("http://ab6s.com/l/siImg.aspx");
						// REMOVED this.add(siImg);

						var devInfoText = this._developerInfoText = new qx.ui.form.TextArea();
						devInfoText.set({
							readOnly : true,
							autoSize : true,
							tabIndex : 304,
							height : 50
						});
						app.setElementModalInput(devInfoText);
						this.add(devInfoText);

						// Close button
						var closeButton = new qx.ui.form.Button("Close");
						closeButton.addListener("execute", this.hide, this);
						this.add(closeButton);
					},
					loadDeveloperInfo : function() {
						// Code provided by MousePak
						var output = 'Session ID: ' + webfrontend.net.CommandManager.getInstance().getInstanceGuid() + '\n';
						output += 'City ID: ' + webfrontend.data.City.getInstance().getId() + '\n';

						this._developerInfoText.setValue(output);
						this._developerInfoText.selectAllText();
					}
				}
			});
			qx.Class.define("paTweak.ui.CancelOrderPanel", {
				extend : qx.ui.container.Composite,
				construct : function() {
					this.base(arguments);
					this.buildUI();
				},
				statics : {
					/**
					 * Returns list of order IDs, filtered by provided function.
					 *
					 * @param filterFunc Filter function, with signature "boolean function(order)". Return true to include the order.
					 * @return Array of order IDs.
					 */
					getOrderList : function(filterFunc) {
						var activeCity = webfrontend.data.City.getInstance();
						var unitOrders = activeCity.getUnitOrders();

						var idList = [];

						if (unitOrders != null) {
							unitOrders.forEach(function(order) {
								if (filterFunc(order)) {
									idList.push(order.id);
								}
							});
						}

						return idList;
					},
					cancelAll : function(callback, self) {
						// Get list
						var orderList = this.getOrderList(function(order) {
							return paTweak.CombatTools.canOrderBeCancelled(order) || (order.type == paTweak.CombatTools.RAID_ORDER_ID && order.recurringType != 0);
						});
						// Issue order
						paDebug("Orders to cancel: " + orderList.length);
						paTweak.CombatTools.cancelOrders(orderList, callback, self);
					},
					cancelAllRaids : function(callback, self) {
						// Get list
						var orderList = this.getOrderList(function(order) {
							return order.type == paTweak.CombatTools.RAID_ORDER_ID && (order.recurringType != 0 || paTweak.CombatTools.canOrderBeCancelled(order));
						});
						// Issue order
						paDebug("Orders to cancel: " + orderList.length);
						paTweak.CombatTools.cancelOrders(orderList, callback, self);
					}
				},
				members : {
					//_cancelAllButton:null,
					_cancelRaidsButton : null,
					_cancelRaidsSelect : null,
					buildUI : function() {
						this.setLayout(new qx.ui.layout.VBox(5));

						var firstRow = new qx.ui.container.Composite();
						firstRow.setLayout(new qx.ui.layout.HBox(2));
						firstRow.set({
							width : 118
						});  // FIXED 

						/*
						var secondRow = new qx.ui.container.Composite();
						secondRow.setLayout(new qx.ui.layout.HBox(2));
						secondRow.set({width:100})

						// Return By
						this._returnByButton = new qx.ui.form.Button("Rtn");
						this._returnByButton.set({width:30, maxWidth:30, appearance:"button-text-small", toolTipText:"All raids return by XX:XX:XX"});
						this._returnByButton.addListener("execute", this.returnBy, this);

						// Cancel All
						this._cancelAllButton = new qx.ui.form.Button("C All");
						this._cancelAllButton.set({width:50, maxWidth:50, appearance:"button-text-small", toolTipText:"Cancel all orders. Careful!"});
						this._cancelAllButton.addListener("execute", this.cancelAll, this);
						*/
						// Cancel Raids
						this._cancelRaidsSelect = new qx.ui.form.SelectBox().set({
							width : 80,
							maxWidth : 80,
							toolTipText : "Cancel all raid orders or alter to return in the specified number of hours.",
							paddingTop : 0,
							paddingBottom : 0
						});
						this._cancelRaidsSelect.add(new qx.ui.form.ListItem("C Raids", null, 0));
						this._cancelRaidsSelect.add(new qx.ui.form.ListItem("C All", null, 1));
						this._cancelRaidsSelect.add(new qx.ui.form.ListItem("Complete", null, 100));
						this._cancelRaidsSelect.add(new qx.ui.form.ListItem("Rtn", null, 2));
						this._cancelRaidsSelect.add(new qx.ui.form.ListItem("Rtn 6h", null, 6));
						this._cancelRaidsSelect.add(new qx.ui.form.ListItem("Rtn 12h", null, 12));
						this._cancelRaidsSelect.add(new qx.ui.form.ListItem("Rtn 18h", null, 18));
						this._cancelRaidsSelect.add(new qx.ui.form.ListItem("Rtn 24h", null, 24));
						this._cancelRaidsSelect.add(new qx.ui.form.ListItem("Rtn 36h", null, 36));
						this._cancelRaidsSelect.add(new qx.ui.form.ListItem("Rtn 48h", null, 48));
						this._cancelRaidsSelect.add(new qx.ui.form.ListItem("Rtn 72h", null, 72));
						this._cancelRaidsSelect.setMaxListHeight(500);
						//this._cancelRaidsSelect.setSelection( [this._cancelRaidsSelect.getChildren()[0]] );

						this._cancelRaidsButton = new qx.ui.form.Button("Go");
						this._cancelRaidsButton.set({
							width : 23,
							maxWidth : 23,
							appearance : "button-text-small",
							toolTipText : "Apply to raid orders."
						});
						this._cancelRaidsButton.addListener("execute", this.cancelAllRaids, this);

						// Add to layout
						firstRow.add(this._cancelRaidsSelect);
						firstRow.add(this._cancelRaidsButton);
						//secondRow.add(this._returnByButton);
						//secondRow.add(this._cancelAllButton);
						this.add(firstRow);
						//this.add(secondRow);

						var secondRow = new qx.ui.container.Composite();
						secondRow.setLayout(new qx.ui.layout.HBox(2));
						secondRow.set({
							width : 100
						})
						//secondRow.add(this._applyToAll);
						this.add(secondRow);

					},
					_setButtonsEnabled : function(value) {
						//this._cancelAllButton.setEnabled(value);
						this._cancelRaidsButton.setEnabled(value);
						//this._returnByButton.setEnabled(value);
					},
					returnBy : function() {
						var dialog = paTweak.ui.ReturnByWindow.getInstance();
						dialog.center();
						dialog.show();
						this._setButtonsEnabled(true);
					},
					cancelAll : function() {
						// Check user
						if (!confirm("Do you want to cancel all orders?")) {
							this._setButtonsEnabled(true);	// ADDED
							return;
						}

						this._setButtonsEnabled(false);

						this.self(arguments).cancelAll(function(error) {
							this._setButtonsEnabled(true);

							if (error) {
								paDebug(error);
							}
						}, this);
					},
					cancelAllRaids : function() {
						this._setButtonsEnabled(false);

						var opt = this._cancelRaidsSelect.getSelection()[0].getModel();
						if (opt == 0) {
							this.self(arguments).cancelAllRaids(function(error) {
								this._setButtonsEnabled(true);

								if (error) {
									paDebug(error);
								}
							}, this);
						} else if (opt == 1) {
							this.cancelAll();
						} else if (opt == 2) {
							this.returnBy();
						} else if (opt == 100) {
							//{"session":"9c9a31f6-b3ce-42a5-8ed3-428804d7925f","cityid":3211595,"id":4710984,"isDelayed":false,"recurringType":1,"recurringEndStep":8522010}
							var orders = webfrontend.data.City.getInstance().unitOrders;
							var commandManager = webfrontend.net.CommandManager.getInstance();
							for (var i in orders) {
								if (orders[i].type == paTweak.CombatTools.RAID_ORDER_ID) {
									commandManager.sendCommand("UnitOrderSetRecurringOptions", {
										cityid : webfrontend.data.City.getInstance().getId(),
										id : orders[i].id,
										isDelayed : orders[i].isDelayed,
										recurringType : 1,
										recurringEndStep : webfrontend.Util.getCurrentTime().getTime()
									}, this, function(error) {
										this._setButtonsEnabled(true);
										if (error) {
											paDebug(error);
										}
									});
								}
							}
						} else {
							var combatTools = paTweak.CombatTools;
							var st = webfrontend.data.ServerTime.getInstance();
							var curTime = webfrontend.Util.getCurrentTime();
							curTime.setHours(curTime.getHours() + parseInt(opt));
							var returnBy = curTime.getTime();
							var serverStep = st.getServerStep();
							var gameNow = webfrontend.Util.getCurrentTime().getTime();
							var delta = Math.floor((returnBy - gameNow) / 1000) + 1;
							returnBy = serverStep + delta;
							var currRecurrType = 2;
							var orders = webfrontend.data.City.getInstance().unitOrders;
							var commandManager = webfrontend.net.CommandManager.getInstance();
							for (var i in orders) {
								if (orders[i].type == paTweak.CombatTools.RAID_ORDER_ID) {
									commandManager.sendCommand("UnitOrderSetRecurringOptions", {
										cityid : webfrontend.data.City.getInstance().getId(),
										id : orders[i].id,
										isDelayed : orders[i].isDelayed,
										recurringType : currRecurrType,
										recurringEndStep : returnBy
									}, this, function(error) {
										this._setButtonsEnabled(true);
										if (error) {
											paDebug(error);
										}
									});
								}
							}
							//this._setButtonsEnabled(true);
						}
					},
					getDelayOffsetTime : function(hrs) {
						var curTime = webfrontend.Util.getCurrentTime();
						var hourOffset = 0;
						if (webfrontend.config.Config.getInstance().getTimeZone() > 0) {
							curTime.setHours(curTime.getHours() + curTime.getTimezoneOffset() / 60);
							hourOffset += curTime.getTimezoneOffset() / 60;

							if (webfrontend.config.Config.getInstance().getTimeZone() == 1)
								hourOffset += webfrontend.data.ServerTime.getInstance().getServerOffset() / 1000 / 60 / 60;
							else if (webfrontend.config.Config.getInstance().getTimeZone() == 2)
								hourOffset += webfrontend.config.Config.getInstance().getTimeZoneOffset() / 1000 / 60 / 60;
						}

						var hI = new Date(curTime.getTime());
						hI.setDate(hI.getDate());
						hI.setHours(hI.getHours() - hourOffset + parseInt(hrs));
						hI.setSeconds(hI.getSeconds());
						hI.setMilliseconds(500);
						if (webfrontend.config.Config.getInstance().getTimeZone() == 0)
							hI = new Date(hI.getTime() - webfrontend.data.ServerTime.getInstance().getDiff());

						var h = hI.getHours();
						var m = hI.getMinutes();
						var s = hI.getSeconds();
						h = checkTime(h);
						m = checkTime(m);
						s = checkTime(s);
						paDebug(hI.getFullYear() + '/' + (hI.getMonth() + 1) + '/' + hI.getDate() + ' ' + h + ':' + m + ':' + s);
						return hI.getTime();
					}
				}
			});
			qx.Class.define("paTweak.ui.CombatWindow", {
				type : "singleton",
				extend : qx.ui.window.Window,
				construct : function() {
					this.base(arguments, "Combat Tool");

					// Build UI
					this._rows = [];
					this.buildUI();

					// Load prev config
					this.loadData();

					// Listeners
					this._listener_cityChanged = webfrontend.data.City.getInstance().addListener("changeVersion", function() {
						if (!this.isVisible()) {
							return;
						}

						this.refresh();
						this._setActionEnabled(true);
						this._lock_safeguard = null;
					}, this);

					this.addListener("appear", function() {
						this.refresh();
						this.resetMessage();
					}, this);

					this.addListener("changeActive", function(e) {
						if (!e.getData()) {
							this.storeData();
						}
					}, this);
				},
				destruct : function() {
					var city = webfrontend.data.City.getInstance();
					if (this._listener_cityChanged)
						city.removeListenerById(this._listener_cityChanged);
				},
				members : {
					_addButton : null,
					_resetButton : null,
					_messageLabel : null,
					_availableLabel : null,
					_includeActive : null,
					_allowPartial : null,
					_useScouts : null,
					_useSmallestForFakes : null,
					_excludeDefenseCheck : null,
					_forceMsCheck : null,
					_travelModeGroup : null,

					_rows : null,

					_magicTime : null,
					_infTime : null,
					_cavTime : null,
					_siegeTime : null,
					_copyButton : null,

					_listener_cityChanged : null,
					_lock_safeguard : null,

					buildUI : function() {
						this.setLayout(new qx.ui.layout.VBox(5));
						this.set({
							allowMaximize : false,
							allowMinimize : false,
							showMaximize : false,
							showMinimize : false,
							showStatusbar : false,
							showClose : false,
							contentPadding : 5,
							useMoveFrame : true,
							resizable : false,
							minWidth : 545
						});

						webfrontend.gui.Util.formatWinClose(this);

						// Message
						this._messageLabel = new qx.ui.basic.Label();
						this._messageLabel.set({
							textColor : "#D10600",
							wrap : true
						});
						this.add(this._messageLabel);

						// Times
						this._magicTime = new paTweak.ui.components.TimePicker("Magic");
						this._cavTime = new paTweak.ui.components.TimePicker("Cavalry");
						this._infTime = new paTweak.ui.components.TimePicker("Infantry");
						this._siegeTime = new paTweak.ui.components.TimePicker("Siege");

						this._copyButton = new qx.ui.form.Button("Copy");
						this._copyButton.set({
							appearance : "button-text-small"
						});
						this._copyButton.addListener("execute", this.copyTimes, this);

						var firstTimeRow = new qx.ui.container.Composite();
						firstTimeRow.setLayout(new qx.ui.layout.HBox(5));
						firstTimeRow.add(this._magicTime);
						firstTimeRow.add(this._copyButton);

						// Put it in standalone box
						var timesBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
						timesBox.add(firstTimeRow);
						timesBox.add(this._cavTime);
						timesBox.add(this._infTime);
						timesBox.add(this._siegeTime);

						// Import/Export button
						var importButton = new qx.ui.form.Button("Import/Export");
						importButton.set({
							appearance : "button-text-small",
							allowGrowX : false,
							toolTipText : "Import or export attacks configuration."
						});
						importButton.addListener("execute", function() {
							var win = paTweak.ui.CombatWindowExport.getInstance();
							win.center();
							win.open();
						}, this);

						// Reset button
						this._resetButton = new qx.ui.form.Button("Reset");
						this._resetButton.set({
							appearance : "button-text-small",
							allowGrowX : false,
							toolTipText : "Resets all values in the dialog."
						});
						this._resetButton.addListener("execute", function() {
							if (confirm("Are you sure you want to throw away all your plans?")) {
								this.reset();
							}
						}, this);

						var buttonsRow = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
						buttonsRow.add(importButton);
						buttonsRow.add(this._resetButton);

						// Include check
						this._includeActive = new qx.ui.form.CheckBox("Include units out of the city");
						this._includeActive.setToolTipText("If checked, units currently out of the city (raiding/plundering etc) will be included into commands. You are supposed to get them home in time by yourself.");
						this._includeActive.initValue(true);
						this._includeActive.addListener("changeValue", this.refresh, this);

						// Allow partial check
						this._allowPartial = new qx.ui.form.CheckBox("Allow partial naval attack");
						this._allowPartial.setToolTipText("When there are not enough Frigates to carry your troops, it allows to send only part of the army that will fit on the ships. Has no effect on land attacks.");

						// Use scouts
						this._useScouts = new qx.ui.form.CheckBox("Include scouts in the attacks");
						this._useScouts.setToolTipText("All available scouts will be sent along other units. If there will be enough scouts, they will be also used for fakes.");
						this._useScouts.setValue(true);
						this._useScouts.addListener("changeValue", this.refresh, this);

						// Use smallest for fakes
						this._useSmallestForFakes = new qx.ui.form.CheckBox("Prefer smallest stack for fakes instead of largest");
						this._useSmallestForFakes.setToolTipText("By default, unit you have the most of is used for fakes. This changes the order.");
						this._useSmallestForFakes.setEnabled(false);
						this._useSmallestForFakes.exclude();
						// Hidden for now

						// Force 3000 min score
						this._forceMsCheck = new qx.ui.form.CheckBox("Always use 3000 min TS");
						this._forceMsCheck.set({
							toolTipText : "Always use 3000 min TS."
						});
						this._forceMsCheck.setValue(true);

						// Exclude Defense
						this._excludeDefenseCheck = new qx.ui.form.CheckBox("Exclude Defense");
						this._excludeDefenseCheck.set({
							toolTipText : "Don't use defensive troops."
						});
						this._excludeDefenseCheck.setValue(true);
						this._excludeDefenseCheck.addListener("changeValue", this.refresh, this);

						// Travel mode
						var travelModeLabel = new qx.ui.basic.Label("Travel mode");
						var autoMode = new qx.ui.form.RadioButton("Auto");
						autoMode.set({
							model : "auto",
							toolTipText : "Units will be sent on foot if the target is on the same continent. Otherwise ships will be used."
						});
						var navyMode = new qx.ui.form.RadioButton("Navy");
						navyMode.set({
							model : "navy",
							toolTipText : "Units will be send on Frigates even to the target on the same continent. Does not affect ships."
						});
						var landMode = new qx.ui.form.RadioButton("Land (Moongate)");
						landMode.set({
							model : "land",
							toolTipText : "Units will be sent on foot even if the target is on different continent. Does not use ships at all."
						});

						var travelModeContainer = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 2));
						travelModeContainer.add(travelModeLabel, {
							row : 0,
							column : 0
						});
						travelModeContainer.add(autoMode, {
							row : 0,
							column : 1
						});
						travelModeContainer.add(navyMode, {
							row : 1,
							column : 1
						});
						travelModeContainer.add(landMode, {
							row : 2,
							column : 1
						});

						this._travelModeGroup = new qx.ui.form.RadioGroup(autoMode, navyMode, landMode);
						this._travelModeGroup.addListener("changeSelection", this.refresh, this);

						// Layout
						var optionsBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
						optionsBox.add(buttonsRow);
						optionsBox.add(this._includeActive);
						optionsBox.add(this._allowPartial);
						optionsBox.add(this._useScouts);
						optionsBox.add(this._useSmallestForFakes);
						optionsBox.add(this._forceMsCheck);
						optionsBox.add(this._excludeDefenseCheck);
						optionsBox.add(travelModeContainer);

						var outerBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(40));
						outerBox.add(timesBox);
						outerBox.add(optionsBox);

						this.add(outerBox);

						// Units
						var availableLabel = this._availableLabel = new qx.ui.basic.Label();
						availableLabel.set({
							width : 250,
							wrap : true
						});

						var refreshButton = new qx.ui.form.Button("Refresh");
						refreshButton.set({
							appearance : "button-text-small"
						});
						refreshButton.addListener("execute", this.refresh, this);

						var resetCounterButton = new qx.ui.form.Button("RC");
						resetCounterButton.set({
							appearance : "button-text-small",
							toolTipText : "Reset the indicative counter."
						});
						resetCounterButton.addListener("execute", this.resetCounter, this);

						var availControl = new qx.ui.container.Composite();
						availControl.setLayout(new qx.ui.layout.HBox(5));
						availControl.add(availableLabel);
						availControl.add(refreshButton);
						availControl.add(new qx.ui.core.Widget().set({
							height : 1
						}), {
							flex : 1
						});
						availControl.add(resetCounterButton);
						this.add(availControl);

						this.scrollContainer = new qx.ui.container.Scroll().set({
							width : 550,
							height : 20
						});
						this.scrollContainer.setMaxHeight(300);
						this.scrollContainer.setMinHeight(20);
						this.insideScrollContainer = new qx.ui.container.Composite();
						this.scrollArea = new qx.ui.layout.VBox();
						this.insideScrollContainer.setLayout(this.scrollArea);
						this.scrollContainer.add(this.insideScrollContainer);
						this.add(this.scrollContainer);

						// Add button
						var addButton = this._addButton = new qx.ui.form.Button("Add");
						addButton.set({
							appearance : "button-text-small",
							allowGrowX : false,
							toolTipText : "Adds new target field."
						});
						addButton.addListener("execute", this.addRow, this);

						this.add(addButton);

						// Note
						var noteLabel = new qx.ui.basic.Label("<em>Note: Send fake before real attacks.</em>");
						noteLabel.setRich(true);
						this.add(noteLabel);

						// First data row
						this.addRow();
					},
					addRow : function() {
						var row = new paTweak.ui.components.AttackOrder();
						row.addListener("attack", this.onAttack, this);
						this.scrollContainer.setHeight(this.scrollContainer.getHeight() + 23);

						this.insideScrollContainer.add(row);
						//this.addBefore(row, this._addButton);
						this._rows.push(row);

						if (this._rows.length > 15) {
							this._addButton.setEnabled(false);
						}

						return row;
					},
					_removeRow : function(row) {
						// Remove from window
						this.insideScrollContainer.remove(row);
						this.scrollContainer.setHeight(this.scrollContainer.getHeight() - 23);
						// Dispose it
						row.dispose();
					},
					_setActionEnabled : function(value) {
						this._rows.forEach(function(row) {
							row.setActionEnabled(value);
						});
					},
					reset : function() {
						// Delete rows
						this._rows.forEach(this._removeRow, this);
						this._rows = [];

						// We need at least one row
						this.addRow();
						this._addButton.setEnabled(true);

						// Reset times
						this._magicTime.resetValue();
						this._cavTime.resetValue();
						this._infTime.resetValue();
						this._siegeTime.resetValue();

						// Options
						this._includeActive.setValue(false);
						this._allowPartial.setValue(false);
						this._useScouts.setValue(true);
						this._useSmallestForFakes.setValue(false);
						this._forceMsCheck.setValue(true);
						this._excludeDefenseCheck.setValue(true);
						this._travelModeGroup.resetSelection();
					},
					resetCounter : function() {
						this._rows.forEach(function(row) {
							row.resetCount();
						}, this);
					},
					refresh : function() {
						try {
							var city = webfrontend.data.City.getInstance();

							// Parameters
							var combatTools = paTweak.CombatTools;
							var includeActive = this._includeActive.getValue();
							var excludeDefense = this._excludeDefenseCheck.getValue();
							var travelMode = this.getTravelMode();
							var excludeNavy = (travelMode == "land");

							// Get units
							var availUnits = combatTools.getAvailableUnits(city, includeActive, excludeDefense, excludeNavy);
							// Format it
							var text = "";

							availUnits.all.forEach(function(u) {
								if (u.count > 0) {
									if (text.length > 0)
										text += ", ";
									text += u.count + " " + u.name;
								}
							});

							if (text.length == 0) {
								text = "No troops available";
							}

							this._availableLabel.setValue(text);
						} catch (ex) {
							paDebug(ex);
							this.setMessage(ex);
						}
					},
					onAttack : function(e) {
						var _this = this;

						try {
							// Assemble attack info
							var data = e.getData();
							var target = e.getTarget();
							var attack = this.getAttackDetails(data.target, data.type, data.attack);

							// Validate TS
							var minTS = this.getMinAttackTS();
							if (minTS > 0 && data.attack != "fake" && data.attack != "fakecap" && attack.attackTS < minTS) {
								//noinspection ExceptionCaughtLocallyJS
								throw new Error("Minimal troop count for the attack not met");
							}

							// Disable buttons - they will be enabled automatically on city update
							_this._setActionEnabled(false);
							var lockId = _this._lock_safeguard = Math.random();
							paDebug("Attack lock = " + lockId);
							setTimeout(function() {
								paDebug("Attack lock timeout: _this._lock_safeguard=" + _this._lock_safeguard + " lockId=" + lockId);
								if (_this._lock_safeguard == lockId) {
									_this._setActionEnabled(true);
								}
							}, 10000);

							// Send attack order
							paTweak.CombatTools.orderUnits(attack.units, attack.target, attack.type, attack.timingType, attack.time, function(ok, errorCode) {
								if (errorCode.r0 == 0) {
									// Nice message
									var msg = attack.isPartial ? "Partial attack sent" : "Attack sent";
									msg += " (" + attack.attackTS + " TS)";
									_this.setMessage(msg);

									// Simple counter
									target.addCount((attack.attackType || "").toUpperCase());
								} else {
									paDebug(errorCode.r0 + ":" + errorCode.r1);
									var error = paTweak.CombatTools.getErrorMessage(errorCode.r0);
									_this.setMessage("Unable to dispatch troops: " + error);
									_this._setActionEnabled(true);
									_this._lock_safeguard = null;
								}
							});
						} catch (ex) {
							this.setMessage(ex);
						}

						// Store data
						this.storeData();
					},
					getTravelMode : function() {
						var sel = this._travelModeGroup.getSelection()[0];
						return sel ? sel.getModel() : null;
					},
					getAttackTimes : function() {
						var combatTools = paTweak.CombatTools;
						var serverOffset = webfrontend.data.ServerTime.getInstance().getServerOffset();
						var localOffset = -new Date().getTimezoneOffset() * 60000;
						var siege = new Date(this._siegeTime.getValue().getTime() - serverOffset + localOffset).getTime();

						return {
							i : new Date(this._infTime.getValue().getTime() - serverOffset + localOffset).getTime(),
							m : new Date(this._magicTime.getValue().getTime() - serverOffset + localOffset).getTime(),
							c : new Date(this._cavTime.getValue().getTime() - serverOffset + localOffset).getTime(),
							s : siege,
							d : siege
						};
						/*
						 var siege = combatTools.convertGameTimeToUtc(this._siegeTime.getValue());

						 return {
						 i : combatTools.convertGameTimeToUtc(this._infTime.getValue()),
						 m : combatTools.convertGameTimeToUtc(this._magicTime.getValue()),
						 c : combatTools.convertGameTimeToUtc(this._cavTime.getValue()),
						 s : siege,
						 d : siege
						 };

						 */
					},
					getAttackDetails : function(target, type, attack) {
						var city = webfrontend.data.City.getInstance();
						var server = webfrontend.data.Server.getInstance();
						var combatTools = paTweak.CombatTools;

						// Parameters
						var includeActive = this._includeActive.getValue();
						var useScouts = this._useScouts.getValue();
						var excludeDefense = this._excludeDefenseCheck.getValue();
						var allowPartial = this._allowPartial.getValue();
						var travelMode = this.getTravelMode();
						var minTS = this._forceMsCheck.getValue() ? paTweak.CombatTools.DEFAULT_MIN_TS : null;

						// Get available units
						var availUnits = combatTools.getAvailableUnits(city, includeActive, excludeDefense, travelMode == "land");

						// Determine, whether we need naval attack
						var naval = (travelMode == "navy" || availUnits.ships.length > 0);
						if (!naval && travelMode != "land") {
							var targetCoords = combatTools.parseCoords(target);
							var targetCont = server.getContinentFromCoords(targetCoords[0], targetCoords[1]);
							var sourceCoords = combatTools.cityIdToCoords(city.getId());
							var sourceCont = server.getContinentFromCoords(sourceCoords[0], sourceCoords[1]);

							naval = (targetCont != sourceCont);
						}

						// Validate, whether is reachable by water
						if (naval) {
							if (!city.getOnWater()) {
								throw new Error("Unable to launch naval attack from land-locked castle");
							}
						}

						// Get units for attack
						var attackUnits = null;
						if (attack == "fake" || attack == "fakecap") {
							if (useScouts) {
								// Try to use scouts
								try {
									attackUnits = combatTools.prepareScoutAttackUnits(availUnits, naval, true, false, minTS);
									type = combatTools.SCOUT_ORDER_ID;
								} catch (ignored) {
								}
							}

							// This is default or when scouting is not an option
							if (attackUnits == null) {
								attackUnits = combatTools.prepareFakeAttackUnits(availUnits, naval, minTS, attack == "fakecap");
							}
						} else if (attack == "scout") {
							attackUnits = combatTools.prepareScoutAttackUnits(availUnits, naval, false, allowPartial, minTS);
						} else {
							attackUnits = combatTools.prepareRealAttackUnits(availUnits, naval, attack == "demo", attack == "capture", useScouts, allowPartial, minTS);
						}

						// Determine attack time
						var attackType = combatTools.getMajorAttackType(attackUnits.units);
						var times = this.getAttackTimes();

						var attackTime = times[attackType];
						if (attackTime == null) {
							throw new Error("Unknown time of the attack");
						}
						// Demo is always sieging
						if (attackType == "d") {
							type = combatTools.SIEGE_ORDER_ID;
						}

						// Put it all together
						return {
							target : target,
							type : type,
							units : attackUnits.units,
							attackTS : attackUnits.totalTS,
							timingType : combatTools.ARRIVAL_TIMING_ID,
							time : attackTime,
							isPartial : attackUnits.isPartial,
							attackType : attackType
						};
					},
					copyTimes : function() {
						var value = this._magicTime.getValue();

						this._cavTime.setValue(value);
						this._infTime.setValue(value);
						this._siegeTime.setValue(value);
					},
					getMinAttackTS : function() {
						return 1;
					},
					resetMessage : function() {
						this._messageLabel.setValue("");
					},
					setMessage : function(text) {
						this._messageLabel.setValue(text || "");
					},
					getData : function() {
						var combatTools = paTweak.CombatTools;
						var data = {};

						// Get times
						data.times = {
							magic : combatTools.convertGameTimeToUtc(this._magicTime.getValue()),
							inf : combatTools.convertGameTimeToUtc(this._infTime.getValue()),
							cav : combatTools.convertGameTimeToUtc(this._cavTime.getValue()),
							siege : combatTools.convertGameTimeToUtc(this._siegeTime.getValue())
						};

						// Targets
						data.targets = [];

						this._rows.forEach(function(row) {
							var value = row.getValue();
							if (value != null) {
								data.targets.push(value);
							}
						});

						// Options
						data.includeActive = this._includeActive.getValue();
						data.allowPartial = this._allowPartial.getValue();
						data.useScouts = this._useScouts.getValue();
						data.useSmallestForFakes = this._useSmallestForFakes.getValue();
						data.excludeDefense = this._excludeDefenseCheck.getValue();
						data.forceMs = this._forceMsCheck.getValue();
						data.travelMode = this.getTravelMode();

						return data;
					},
					setData : function(data) {
						var _this = this;
						var combatTools = paTweak.CombatTools;

						// Reset
						this.reset();

						// Times
						if (data.times) {
							var now = new Date().getTime();
							if (data.times.magic && data.times.magic > now)
								this._magicTime.setValue(combatTools.convertUtcToGameTime(data.times.magic));
							if (data.times.inf && data.times.inf > now)
								this._infTime.setValue(combatTools.convertUtcToGameTime(data.times.inf));
							if (data.times.cav && data.times.cav > now)
								this._cavTime.setValue(combatTools.convertUtcToGameTime(data.times.cav));
							if (data.times.siege && data.times.siege > now)
								this._siegeTime.setValue(combatTools.convertUtcToGameTime(data.times.siege));
						}

						// Targets
						if (data.targets && data.targets.length > 0) {
							// Delete rows
							this._rows.forEach(this._removeRow, this);
							this._rows = [];

							// Add new
							data.targets.forEach(function(rowData) {
								var row = _this.addRow();
								row.setValue(rowData);
							});
						}

						// Include active
						this._includeActive.setValue(data.includeActive != null ? data.includeActive : true);
						this._allowPartial.setValue(!!data.allowPartial);
						this._useScouts.setValue(data.useScouts != null ? data.useScouts : true);
						this._useSmallestForFakes.setValue(!!data.useSmallestForFakes);
						this._excludeDefenseCheck.setValue(!!data.excludeDefense);
						this._forceMsCheck.setValue(!!data.forceMs);
						this._travelModeGroup.setModelSelection([data.travelMode || "auto"]);
					},
					getStoragePath : function() {
						return "paTweak.ui.CombatWindow." + webfrontend.data.Player.getInstance().getId();
					},
					storeData : function() {
						try {
							var path = this.getStoragePath();
							var data = this.getData();
							localStorage.setItem(path, JSON.stringify(data));
							paDebug("CombatWindow data stored");
						} catch (e) {
							paDebug("Unable to load CombatWindow data: " + e);
						}
					},
					loadData : function() {
						try {
							var path = this.getStoragePath();
							var data = JSON.parse(localStorage.getItem(path));

							if (data != null) {
								this.setData(data);
								paDebug("CombatWindow data loaded");
							} else {
								this.reset();
								paDebug("CombatWindow data had no data to load");
							}
						} catch (e) {
							paDebug("Unable to load CombatWindow data: " + e);
						}
					}
				}
			});
			qx.Class.define("paTweak.ui.CombatWindowExport", {
				type : "singleton",
				extend : qx.ui.window.Window,
				construct : function() {
					this.base(arguments, "Commands Import/Export");
					this.buildUI();
				},
				statics : {
					ORDER_TYPES : {
						"1" : "scout",
						"2" : "plunder",
						"3" : "assault",
						"4" : "support",
						"5" : "siege"
					},

					_formatTime : function(utcTime) {
						// Get time in server time
						var gameTime = paTweak.CombatTools.convertUtcToGameTime(utcTime, 1);
						var text = qx.lang.String.pad(String(gameTime.getFullYear()), 4, "0") + "/";
						text += qx.lang.String.pad(String(gameTime.getMonth() + 1), 2, "0") + "/";
						text += qx.lang.String.pad(String(gameTime.getDate()), 2, "0") + " ";
						text += qx.lang.String.pad(String(gameTime.getHours()), 2, "0") + ":";
						text += qx.lang.String.pad(String(gameTime.getMinutes()), 2, "0") + ":";
						text += qx.lang.String.pad(String(gameTime.getSeconds()), 2, "0");
						return text;
					},
					_parseTime : function(text) {
						var m = text.match(/^\s*(\d{4})\/?(\d{1,2})\/?(\d{1,2})\s+(\d{1,2}):(\d{1,2}):(\d{1,2})\s*$/);
						if (!m) {
							return null;
						}

						var date = new Date(m[1], m[2] - 1, m[3], m[4], m[5], m[6], 0);
						if (!isNaN(date)) {
							// Note: Times are always in server time
							return paTweak.CombatTools.convertGameTimeToUtc(new Date(date), 1);
						} else {
							return null;
						}
					},
					dataToString : function(data, separator) {
						var segments = [];

						// Name
						var name = webfrontend.data.Server.getInstance().getName();
						segments.push(name.replace(/\s*\(.*\)\s*/, ""));

						// Times
						if (data.times) {
							var now = new Date().getTime();
							if (data.times.magic && data.times.magic > now)
								segments.push("Magic " + this._formatTime(data.times.magic));
							if (data.times.cav && data.times.cav > now)
								segments.push("Cavalry " + this._formatTime(data.times.cav));
							if (data.times.inf && data.times.inf > now)
								segments.push("Infantry " + this._formatTime(data.times.inf));
							if (data.times.siege && data.times.siege > now)
								segments.push("Siege " + this._formatTime(data.times.siege));
						}

						// Targets
						if (data.targets && data.targets.length > 0) {
							data.targets.forEach(function(target) {
								var typeText = paTweak.ui.CombatWindowExport.ORDER_TYPES[target.type] || target.type;
								var noteText = (target.note && target.note.length > 0) ? " - " + target.note : "";
								segments.push(qx.lang.String.capitalize(target.target + " " + target.attack + " " + typeText) + noteText);
							});
						}

						// Join
						return segments.join(separator);
					},
					parseData : function(text, separator) {
						var segments = text.split(separator);
						var data = {
							times : {},
							targets : []
						};

						// Go thru lines and parse them
						segments.forEach(function(segment) {
							segment = paTweak.CombatTools.removeBBcode(segment).trim();
							var time, m;

							// Times
							if ( m = segment.match(/^magic\s+(.*)$/i)) {
								time = paTweak.ui.CombatWindowExport._parseTime(m[1]);
								if (time != null) {
									data.times.magic = time;
								}
								return;
							} else if ( m = segment.match(/^infantry\s+(.*)$/i)) {
								time = paTweak.ui.CombatWindowExport._parseTime(m[1]);
								if (time != null) {
									data.times.inf = time;
								}
								return;
							} else if ( m = segment.match(/^cavalry\s+(.*)$/i)) {
								time = paTweak.ui.CombatWindowExport._parseTime(m[1]);
								if (time != null) {
									data.times.cav = time;
								}
								return;
							} else if ( m = segment.match(/^siege\s+(.*)$/i)) {
								time = paTweak.ui.CombatWindowExport._parseTime(m[1]);
								if (time != null) {
									data.times.siege = time;
								}
								return;
							}

							// Target
							var targetMatch = segment.match(/^(\d{1,3}:\d{1,3})\s+(fake|capture|demo|attack|scout)\s+(plunder|siege|assault|scout)\b\s*(.*)$/i);
							if (targetMatch) {
								var type = qx.lang.Object.getKeyFromValue(paTweak.ui.CombatWindowExport.ORDER_TYPES, targetMatch[3].toLowerCase());
								data.targets.push({
									target : targetMatch[1],
									attack : targetMatch[2].toLowerCase(),
									type : type,
									note : (targetMatch[4] || "").replace(/^\s*-\s*/, "")
								});
							}
						});

						// Cleanup
						if (qx.lang.Object.getValues(data.times).length < 1) {
							delete data.times;
						}
						if (data.targets.length < 1) {
							delete data.targets;
						}

						return data;
					}
				},
				members : {
					_compactCheck : null,
					_contentText : null,
					_importButton : null,
					_exportButton : null,
					_closeButton : null,

					buildUI : function() {
						var app = qx.core.Init.getApplication();

						this.setLayout(new qx.ui.layout.VBox(5));
						this.set({
							allowMaximize : false,
							allowMinimize : false,
							showMaximize : false,
							showMinimize : false,
							showStatusbar : false,
							showClose : false,
							contentPadding : 5,
							useMoveFrame : true,
							resizable : true
						});
						this.set({
							width : 250,
							height : 300
						});

						webfrontend.gui.Util.formatWinClose(this);

						// Note
						var note = new qx.ui.basic.Label("<em>Note: Time is always in Server Time</em>");
						note.setRich(true);
						this.add(note, {
							flex : 0
						});

						// Text area
						var contentText = this._contentText = new qx.ui.form.TextArea("");
						//this._contentText.set({});
						app.setElementModalInput(contentText);
						this.add(contentText, {
							flex : 1
						});

						// Compact
						var compactCheck = this._compactCheck = new qx.ui.form.CheckBox("Compact");
						compactCheck.set({
							toolTipText : "Use single-line format."
						});
						compactCheck.addListener("changeValue", this.exportData, this);
						this.add(compactCheck, {
							flex : 0
						});

						// Buttons
						var exportButton = this._exportButton = new qx.ui.form.Button("Refresh");
						exportButton.set({
							width : 80,
							toolTipText : "Generate text from the Advanced Commands window."
						});
						exportButton.addListener("execute", this.exportData, this);

						var importButton = this._importButton = new qx.ui.form.Button("Import!");
						importButton.set({
							width : 80,
							toolTipText : "Import data into the dialog."
						});
						importButton.addListener("execute", this.importData, this);

						var closeButton = this._closeButton = new qx.ui.form.Button("Close");
						closeButton.set({
							width : 80,
							toolTipText : "Closes the dialog."
						});
						closeButton.addListener("execute", this.hide, this);

						var buttonsRow = new qx.ui.container.Composite();
						buttonsRow.setLayout(new qx.ui.layout.HBox(5));
						buttonsRow.set({
							alignX : "right"
						});

						buttonsRow.add(exportButton);
						buttonsRow.add(importButton);
						buttonsRow.add(closeButton);
						this.add(buttonsRow, {
							flex : 0
						});
					},
					exportData : function() {
						this._contentText.setValue("");

						var sep = this._compactCheck.getValue() ? "|" : "\n";
						var data = paTweak.ui.CombatWindow.getInstance().getData();
						var text = paTweak.ui.CombatWindowExport.dataToString(data, sep);

						this._contentText.setValue(text);
						this._contentText.selectAllText();
						this._contentText.focus();
					},
					importData : function() {
						var text = this._contentText.getValue();
						var data = paTweak.ui.CombatWindowExport.parseData(text, /[\n|]/);

						var cw = paTweak.ui.CombatWindow.getInstance();
						cw.setData(data);
						cw._forceMsCheck.setValue(true);

					}
				}
			});

			qx.Class.define("paTweak.ui.NearestHUB", {
				extend : qx.ui.table.Table,
				implement : [webfrontend.net.IUpdateConsumer],
				construct : function() {
					var tableModel = new qx.ui.table.model.Simple();
					var columnNames = ["CityID", "City", "Reference", "Coords", "Dist"];

					tableModel.setColumns(columnNames);
					tableModel.setSortMethods(4, function(row1, row2) {
						return Number(row1[4]) - Number(row2[4]);
					});

					var custom = {
						tableColumnModel : function(obj) {
							return new qx.ui.table.columnmodel.Resize(obj);
						}
					};

					qx.ui.table.Table.call(this, tableModel, custom);

					this.addListener("cellClick", this.onCellClick, this);

					var columnModel = this.getTableColumnModel();
					columnModel.setColumnVisible(0, false);
					var linkStyle = new qx.ui.table.cellrenderer.Default();
					linkStyle.setDefaultCellStyle("text-decoration:underline;color:blue");
					columnModel.setDataCellRenderer(3, linkStyle);

				},
				members : {
					onCellClick : function(event) {
						switch( event.getColumn() ) {
							case 3:
								{
									var cityID = this.getTableModel().getValue(0, event.getRow());
									var spl = this.getTableModel().getValue(3, event.getRow()).split(":");
									var x = Number(spl[0]);
									var y = Number(spl[1]);
									webfrontend.gui.Util.showMapModeViewPos('r', 0, x, y);
								}
								break;
						}
					},
					removeDefoConsumer : function() {
						removeConsumer("XYZ", this.dispatchResults);
					},
					refresh : function() {
						var tm = this.getTableModel();
						tm.removeRows(0, tm.getRowCount());
						tm.addRows([[0, "Loading..."]]);

						var CI = webfrontend.data.City.getInstance();
						bv = CI.getId();
						var cx = bv & 0xFFFF;
						var cy = bv >> 16;

						var rw = paTweak.ui.RaidingWindow.getInstance();
						var includeIfTxt = rw.keepIf.getValue();
						//console.log(includeIfTxt);
						var includeRefs = "";
						var hasIncludes = false;
						if (includeIfTxt.length > 0) {
							includeRefs = includeIfTxt.split(',');
							for (var ii = 0; ii < includeRefs.length; ++ii) {
								if (includeRefs[ii].length > 0) {
									hasIncludes = true;
									break;
								}
							}
						}

						var player = webfrontend.data.Player.getInstance();
						var cityList = player.getCities();
						var idleCities = [];
						for (elem in cityList) {
							//Skip same City
							if (bv == elem)
								continue;
							var showCity = true;
							var ref = cityList[elem].reference;

							if (hasIncludes) {
								for (var i = 0; i < includeRefs.length; i++) {
									if (ref.indexOf(includeRefs[i]) < 0)
										showCity = false;
								}
							}
							if (showCity) {
								var hubX = cityList[elem].xPos;
								var hubY = cityList[elem].yPos;  // FIXED 

								var dist = Math.sqrt((hubX - cx) * (hubX - cx) + (hubY - cy) * (hubY - cy)).toFixed(2);

								idleCities.push([elem, cityList[elem].name, ref, hubX + ":" + hubY, dist]);
							}

						}
						tm.setData(idleCities);
						tm.sortByColumn(4, true);
						this.removeDefoConsumer();
						addConsumer("XYZ", this.dispatchResults, this);
					},
					getRequestDetails : function(details) {
						return "a";
					},
					dispatchResults : function(results, thisObj) {
						//console.log("Here ............................................................");
						if (results == null)
							return;

					}
				},
			});

			qx.Class.define("paTweak.ui.IdleRaidUnitsTable", {
				extend : qx.ui.table.Table,
				implement : [webfrontend.net.IUpdateConsumer],
				construct : function() {
					var tableModel = new qx.ui.table.model.Simple();
					var columnNames = ["CityID", "TS", "Type", "City", "Ref", "Cont", "Coords", "%TS"];

					tableModel.setColumns(columnNames);

					var custom = {
						tableColumnModel : function(obj) {
							return new qx.ui.table.columnmodel.Resize(obj);
						}
					};

					qx.ui.table.Table.call(this, tableModel, custom);

					this.addListener("cellClick", this.onCellClick, this);

					var columnModel = this.getTableColumnModel();
					columnModel.setColumnVisible(0, false);
					var linkStyle = new qx.ui.table.cellrenderer.Default();
					linkStyle.setDefaultCellStyle("text-decoration:underline;color:blue");
					columnModel.setDataCellRenderer(3, linkStyle);
					columnModel.setDataCellRenderer(6, linkStyle);
					//this.refresh();
				},
				members : {
					onCellClick : function(event) {
						switch( event.getColumn() ) {
							case 3:
								{
									var cityID = this.getTableModel().getValue(0, event.getRow());
									var spl = this.getTableModel().getValue(6, event.getRow()).split(":");
									var x = Number(spl[0]);
									var y = Number(spl[1]);
									webfrontend.data.City.getInstance().setRequestId(cityID);
									webfrontend.gui.Util.showMapModeViewPos('r', 0, x, y);
								}
								break;
							case 6:
								{
									var cityID = this.getTableModel().getValue(0, event.getRow());
									var spl = this.getTableModel().getValue(6, event.getRow()).split(":");
									var x = Number(spl[0]);
									var y = Number(spl[1]);
									webfrontend.gui.Util.showMapModeViewPos('r', 0, x, y);
								}
								break;
						}
					},
					updateCityTS : function(cid, count) {
						var tm = this.getTableModel();
						for (var i = 0; i < tm.getRowCount(); i++) {
							if (tm.getValue(0, i) == cid) {
								tm.setValue(1, i, count);
								break;
							}
						}
					},
					removeDefoConsumer : function() {
						//removeConsumer("DEFO", this.dispatchResults);
						removeConsumer("COMO", this.dispatchResults);
					},
					refresh : function() {
						var tm = this.getTableModel();
						tm.removeRows(0, tm.getRowCount());
						tm.addRows([[0, "Loading..."]]);
						var rw = paTweak.ui.RaidingWindow.getInstance();
						this.removeDefoConsumer();
						addConsumer("COMO", this.dispatchResults, this);
						//addConsumer("DEFO", this.dispatchResults, this);
					},
					getRequestDetails : function(details) {
						return "a";
					},
					dispatchResults : function(results, thisObj) {
						if (results == null)
							return;
						var resMain = webfrontend.res.Main.getInstance();
						var sI = webfrontend.data.Server.getInstance();
						var pC = webfrontend.data.Player.getInstance().cities;
						var tm = thisObj.getTableModel();
						var CI = webfrontend.data.City.getInstance();
						var curCityId = CI.getId();
						var rw = paTweak.ui.RaidingWindow.getInstance();
						if (rw.rnf) {
							rw.rnf.length = 0;
						}
						if (rw.rnmts) {
							rw.rnmts.length = 0;
						}
						var bossT = rw.bossRaider.t;
						var bossTcount = 0;
						var idleCities = [];
						var cityList = rw.cityGroups.getSelection();
						if (cityList.length > 0) {
							cityList = cityList[0].cids;
						}
						//tm.removeRows( 0, tm.getRowCount() );
						var excludeIfTxt = rw.excludeIf.getValue();
						var excludeShips = rw.excludeShips.getValue();
						var excludeRefs = "";
						var hasExcludes = false;
						var excludeTs = Number(rw.excludeTs.getValue());
						var sortIx = tm.getSortColumnIndex();
						var dir = tm.isSortAscending();
						if (excludeIfTxt.length > 0) {
							excludeRefs = excludeIfTxt.split(',');
							for (var ii = 0; ii < excludeRefs.length; ++ii) {
								if (excludeRefs[ii].length > 0) {
									hasExcludes = true;
									break;
								}
							}
						}
						for (var i = 0; i < results.length; i++) {
							var result = results[i];
							if (result.hasOwnProperty("c") && (cityList.length == 0 || cityList.indexOf(result.i) >= 0)) {
								var x = result.i & 0xffff;
								var y = result.i >> 16;
								var first = true;
								var unitStr = "";
								var ts = 0;
								var totalTS = 0;
								for (var j = 0; j < result.c.length; j++) {
									var command = result.c[j];
									if (command.i == 0) {
										for (var k = 0; k < command.u.length; k++) {
											var unitInfo = resMain.units[command.u[k].t];
											var count = command.u[k].c;
											if (count > 0 && unitInfo.c > 0 && (!excludeShips || unitInfo.ls)) {// && rw._st) {
												if (!first) {
													unitStr += ",";
												}
												unitStr += unitShortName(command.u[k].t);
												ts += count * unitInfo.uc;
												totalTS += count * unitInfo.uc;
												first = false;
												if (result.i == curCityId) {
													bossTcount += count;
												}
											}
										}
									} else if (parseInt(command.i, 10) < 0) {
										for (var k = 0; k < command.u.length; k++) {
											var unitInfo = resMain.units[command.u[k].t];
											var count = command.u[k].c;
											if (count > 0 && unitInfo.c > 0 && (!excludeShips || unitInfo.ls)) {// && rw._st) {
												ts -= count * unitInfo.uc;
												if (result.i == curCityId) {
													bossTcount -= count;
												}
											}
										}
									} else {
										for (var k = 0; k < command.u.length; k++) {
											var unitInfo = resMain.units[command.u[k].t];
											var count = command.u[k].c;
											if (count > 0 && unitInfo.c > 0 && (!excludeShips || unitInfo.ls)) {// && rw._st) {
												totalTS += count * unitInfo.uc;
											}
										}
									}
								}
								if (!first) {
									//var columnNames = ["CityID", "TS", "Type", "City", "Ref", "Cont", "Coords", "% TS"];
									var cont = sI.getContinentFromCoords(x, y);
									var ref = "";
									if (pC.hasOwnProperty(result.i))
										ref = pC[result.i].reference;
									var exclude = (excludeTs > 0 && ts < excludeTs);
									if (hasExcludes) {
										for (var ii = 0; !exclude && ii < excludeRefs.length; ++ii) {
											exclude = ref.indexOf(excludeRefs[ii]) >= 0;
										}
									}
									if (!exclude) {
										var pct = Math.floor(Math.min(100, (ts / totalTS) * 100) * 100) / 100;
										if (pct == 100 && rw.rnf) {
											rw.rnf.push([result.i, ts, unitStr, result.n, ref, cont, x.toString() + ":" + y.toString(), pct]);
										}
										if (ts >= 30000 && rw.rnmts) {
											rw.rnmts.push([result.i, ts, unitStr, result.n, ref, cont, x.toString() + ":" + y.toString(), pct]);
										}
										idleCities.push([result.i, ts, unitStr, result.n, ref, cont, x.toString() + ":" + y.toString(), pct]);
									}
								}
							}
							if (result.i == curCityId) {
								rw.bossUnitLabel.setValue(rw.formatNumber(bossTcount));
							}
						}
						tm.setData(idleCities);
						tm.sortByColumn((sortIx >= 0) ? sortIx : "1", (sortIx >= 0) ? dir : false);
						if (!rw.autoUpdate.getValue()) {
							thisObj.removeDefoConsumer();
						}
						rw.nextIdleCityButton.setEnabled(true);
					}
				},
			});

			var citySort = null;

			function gotoPreviousCity(e) {
				var selCity = citySort.getSelection()[0].getModel();
				var cities = citySort.getSelectables();
				var newCity = null;
				for (var i = 1; i < cities.length; ++i) {
					var city = cities[i];
					if (selCity == city.$$user_model) {
						newCity = cities[i - 1];
						citySort.setSelection([newCity]);
						break;
					}
				}
				var cityList = qx.core.Init.getApplication().cityBar.citiesSelect;
				cityList.setSelectedCityId(newCity.getModel());
			}

			function gotoNextCity(e) {
				var selCity = citySort.getSelection()[0].getModel();
				var cities = citySort.getSelectables();
				var newCity = null;
				for (var i = 0; i < cities.length - 1; ++i) {
					var city = cities[i];
					if (selCity == city.$$user_model) {
						newCity = cities[i + 1];
						citySort.setSelection([newCity]);
						break;
					}
				}
				var cityList = qx.core.Init.getApplication().cityBar.citiesSelect;
				cityList.setSelectedCityId(newCity.getModel());
			}

			function switchCity(e) {
				var selCity = citySort.getSelection()[0].getModel();
				var cityList = qx.core.Init.getApplication().cityBar.citiesSelect;
				cityList.setSelectedCityId(selCity);
			}


			String.prototype.iCompare = function(str) {
				var str1 = this.toLowerCase();
				var str2 = str.toLowerCase();
				return (str1 < str2) ? -1 : (str1 == str2 ? 0 : 1);
			};
			function stricmp(str1, str2) {
				return str1.iCompare(str2);
			};

			var curCity;
			function sortCityList() {
				var selCity = qx.core.Init.getApplication().cityBar.citiesSelect.getSelectedCityId();
				var player = webfrontend.data.Player.getInstance();
				var cityList = player.getCities();
				var cityArray = new Array();
				for (elem in cityList) {
					cityArray[cityArray.length] = cityList[elem].reference + "*^*~" + cityList[elem].name + "*^*~" + elem;
				}
				cityArray.sort(stricmp);

				var sortCities = citySort.getChildren();
				var hasChildren = citySort.hasChildren();
				var ix = 0;
				for (var i = 0; i < cityArray.length; ++i) {
					var tmp = cityArray[i].split("*^*~");
					if (hasChildren && sortCities.length > i) {
						sortCities[i].setLabel(tmp[1] + ' [' + tmp[0] + ']');
						sortCities[i].setModel(tmp[2]);
						if (tmp[2] == selCity) {
							ix = i;
						}
					} else {
						citySort.addAt(new qx.ui.form.ListItem(tmp[1] + ' [' + tmp[0] + ']', null, tmp[2]), i);
						sortCities = citySort.getChildren();
					}
				}
				citySort.setSelection([sortCities[ix]]);
				cityList = qx.core.Init.getApplication().cityBar.citiesSelect;
				cityList.setSelectedCityId(selCity);
				//curCity = selCity;
				//window.setTimeout(setCity, 1000);
			}

			function setCity() {
				cityList = qx.core.Init.getApplication().cityBar.citiesSelect;
				cityList.setSelectedCityId(curCity);
			}

			/*
			 */
			var scoutInfoImg = null;
			var fortuneAvailImg = null;
			var subIncomingOffImg = null;
			var subIncomingImg = null;
			var subNames = null;
			var _oTech = null;

			function checkForSubAttacks(results, thisObj) {
				try {
					var hasAttacks = "";
					var IncomingAttacks;
					if (results != null) {
						if (results.hasOwnProperty("a")) {
							IncomingAttacks = results.a;
						} else {
							if (results[0].hasOwnProperty("a"))
								IncomingAttacks = results[0].a;
						}
						if (IncomingAttacks != null) {
							for (var ii = 0; ii < subNames.length; ++ii) {
								for (var i = 0; i < IncomingAttacks.length; ++i) {
									if (IncomingAttacks[i].tpn.toLowerCase() == String(subNames[ii]).trim().toLowerCase()) {
										hasAttacks += (hasAttacks.length > 0 ? ", " : "") + subNames[ii];
										break;
									}
								}
							}
						}
					}
					if (hasAttacks.length > 0) {
						if (subIncomingImg.getToolTipText() != "Incoming for " + hasAttacks) {
							subIncomingImg.setSource('resource/webfrontend/ui/icons/icon_attack_warning.gif');
							subIncomingImg.setToolTipText("Incoming for " + hasAttacks);
						}
					} else {
						subIncomingImg.setSource('resource/webfrontend/ui/icons/icon_alliance_outgoing_attack_warning_inactive.png');
						var sub = subNames.join(',');
						subIncomingImg.setToolTipText("No incomings for " + sub);
					}
					if (subIncomingImg.getVisibility() != "visible") {
						subIncomingImg.setVisibility("visible");
					}
				} catch (ex) {
					console.error(ex);
				}
			}


			qx.Class.define("paTweak.ui.ExtraTools", {
				extend : paTweak.ui.components.LeftPanel,
				construct : function(title) {
					this.base(arguments, title);
					this.buildUI();
				},
				members : {
					_donateRow :null,
					_extraRow : null,
					_extraRow2 : null,
					cityInfoImg : null,
					city : null,
					buildUI : function() {
						var app = qx.core.Init.getApplication();
						var cInfoView = app.getCityInfoView();
						var bQc = cInfoView.buildingQueue;
						var bQh = bQc.header;

						var fillQueueButton = new qx.ui.form.Button("+");
						fillQueueButton.set({
							width : 22,
							appearance : "button-text-small",
							toolTipText : "Click to Fill build queue"
						});
						fillQueueButton.addListener("execute", this.fillBuildingQueue, this);
						bQh.add(fillQueueButton, {
							left : 5,
							top : 33
						});

						var payQueueButton = new qx.ui.form.Button("#");
						payQueueButton.set({
							width : 22,
							appearance : "button-text-small",
							toolTipText : "Click to Convert all builds"
						});
						payQueueButton.addListener("execute", this.payBuildingQueue, this);
						bQh.add(payQueueButton, {
							left : 28,
							top : 33
						});

						var deleteCottageButton = new qx.ui.form.Button("-");
						deleteCottageButton.set({
							width : 22,
							appearance : "button-text-small",
							toolTipText : "Click to remove a cottage"
						});
						deleteCottageButton.addListener("execute", this.removeCottage, this);
						bQh.add(deleteCottageButton, {
							left : 49,
							top : 33
						});

						//var deleteResButton = new qx.ui.form.Button("cc");
						var deleteResButton = new qx.ui.form.Button();

						deleteResButton.set({
							width : 22,
							appearance : "button-text-small",
							toolTipText : "Click to remove res nodes from the center"
						});
						deleteResButton.addListener("execute", this.removeCenterRes, this);
						var img = new qx.ui.basic.Image("webfrontend/ui/icons/icon_playerinfo_townicon_castle_land.png");
						img.setWidth(18);
						img.setHeight(15);
						img.setScale(true);
						img.setAlignY("middle");
						deleteResButton._add(img);
						bQh.add(deleteResButton, {
							left : 72,
							top : 33
						});

						var deleteFoodCityResButton = new qx.ui.form.Button();
						//var deleteFoodCityResButton = new qx.ui.form.Button("cf");
						deleteFoodCityResButton.set({
							width : 22,
							appearance : "button-text-small",
							toolTipText : "Click to remove res nodes for a food city"
						});
						deleteFoodCityResButton.addListener("execute", this.removeResNode, this);
						var img = new qx.ui.basic.Image("webfrontend/ui/icons_ressource_voidFood_16.png");
						img.setWidth(16);
						img.setHeight(15);
						img.setScale(true);
						img.setAlignY("middle");
						deleteFoodCityResButton._add(img);
						bQh.add(deleteFoodCityResButton, {
							left : 250,
							top : 33
						});

						// Queue buttons (Thank you MousePak!)
						var row = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));

						var IncomingAttacksButton = new qx.ui.form.Button("i");
						IncomingAttacksButton.set({
							width : 25,
							appearance : "button-text-small",
							toolTipText : "Experimental incoming attack info"
						});
						IncomingAttacksButton.addListener("execute", this.showIncomingAttacks, this);
						row.add(IncomingAttacksButton);
						var dialog = paTweak.ui.IncomingAttacksWindow.getInstance();

						// Combat command window, written by Mikee
						var combatButton = new qx.ui.form.Button("Combat");
						combatButton.set({
							width : 65,
							appearance : "button-text-small",
							toolTipText : "Shows Advanced Commands window."
						});
						combatButton.addListener("execute", this.showCombatWindow, this);
						row.add(combatButton);

						var raidButton = new qx.ui.form.Button("Raiding");
						raidButton.set({
							width : 75,
							appearance : "button-text-small",
							toolTipText : "Raiding"
						});
						raidButton.addListener("execute", this.showRaidingWindow, this);
						row.add(raidButton);
						dialog = paTweak.ui.RaidingWindow.getInstance();

						// Spacer
						row.add(new qx.ui.core.Widget().set({
							height : 0
						}), {
							flex : 1
						});

						subIncomingImg = new qx.ui.basic.Image('resource/webfrontend/ui/icons/icon_attack_warning.gif');
						subIncomingImg.setScale(true);
						subIncomingImg.setVisibility("hidden");
						subIncomingImg.setMaxWidth(17);
						subIncomingImg.setMaxHeight(20);
						this.add(subIncomingImg, {
							top : 6,
							left : 266
						});
						//row.add(subIncomingImg);

						scoutInfoImg = new qx.ui.basic.Image();
						scoutInfoImg.setWidth(0);
						scoutInfoImg.setHeight(0);
						scoutInfoImg.setVisibility("hidden");
						row.add(scoutInfoImg);

						fortuneAvailImg = new qx.ui.basic.Image('resource/webfrontend/ui/icons/icon_alliance_red_17.png');
						fortuneAvailImg.setVisibility("hidden");
						this.add(fortuneAvailImg, {
							top : 6,
							left : 284
						});
						fortuneAvailImg.addListener("click", setNextFortuneTime);

						this.addContent(row);

						row = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));

						var reportsButton = new qx.ui.form.Button("Reports");
						reportsButton.set({
							width : 55,
							appearance : "button-text-small",
							toolTipText : "scan my scouting reports"
						});
						reportsButton.addListener("execute", this.showReports, this);
						row.add(reportsButton);

						var mailListButton = new qx.ui.form.Button("Mail Lists");
						mailListButton.set({
							width : 65,
							appearance : "button-text-small",
							toolTipText : "Get alliance mailing lists"
						});
						mailListButton.addListener("execute", this.showMailingLists, this);
						row.add(mailListButton);

						// REMOVED var cityDataButton = new qx.ui.form.Button("Upload");
						// REMOVED cityDataButton.set({
						// REMOVED 	width : 50,
						// REMOVED 	appearance : "button-text-small",
						// REMOVED 	toolTipText : "Send military info for the current city"
						// REMOVED });
						// REMOVED cityDataButton.addListener("execute", this.sendCityData, this);
						// REMOVED row.add(cityDataButton);
						// REMOVED this.cityInfoImg = new qx.ui.basic.Image();
						// REMOVED this.cityInfoImg.setWidth(0);
						// REMOVED this.cityInfoImg.setHeight(0);
						// REMOVED this.cityInfoImg.setVisibility("hidden");
						// REMOVED row.add(this.cityInfoImg);

						var itemsButton = new qx.ui.form.Button("Use Palace Items");
						itemsButton.set({
							width : 100,
							appearance : "button-text-small",
							toolTipText : "Use palace items below your level."
						});
						itemsButton.addListener("execute", this.showPalaceItems, this);
						row.add(itemsButton);

						this.addContent(row);

						// REMOVED this._donateRow = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));

						// REMOVED var donate = new qx.ui.basic.Label(" ");
						// REMOVED this._donateRow.add(donate);
						// REMOVED this._donateRow.set({height: 20});
						// REMOVED flattr = new qx.ui.basic.Label(" ");
						// REMOVED flattr.setRich(true);
						// REMOVED flattr.setValue("<iframe id='flattrbtn' title='Flattr' height='20' width='110' frameborder='0' style='border-width=0px;' src='//api.flattr.com/button/view/?uid=Uldrich&button=compact&category=software&tags=lou,COURAGETools&title=COURAGETools&description=A collection of tools for Lord of Ultima.  Donations support maintenance and updates of COURAGETools.&url=http%3A%2F%2Fab6s.com%2F' />");
						// REMOVED this._donateRow.add(flattr);
						 
						// REMOVED this._extraRow = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
						// REMOVED this.addContent(this._extraRow);
						// REMOVED this._extraRow2 = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
						// REMOVED this.addContent(this._extraRow2);

						try {
							row = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));
							var ToolTip = "Total / Current / Recruiting / Available";

							BaronLabel = new qx.ui.basic.Label(" ");
							BaronLabel.setRich(true);
							BaronLabel.setValue('<div style="-moz-transform: scaleX(1);background-image:url(resource/webfrontend/theme/tree/open.png);background-repeat:no-repeat;width:16px;height:16px;font-weight:bold;padding-left:15px;"><img src="resource/webfrontend/ui/icons/units/icon_units_baron.png"  style="align:absmiddle;-moz-transform: scaleX(1); width: 16px; height: 16px; padding-left:4px;" /></div>');
							BaronLabel.setToolTipText(ToolTip);
							BaronLabel.addListener("click", this.toggleTable);

							row.add(BaronLabel);
							BaronValue = new qx.ui.basic.Label("");
							BaronValue.setRich(true);
							BaronValue.setValue("<div style='margin-left: 10px;'>0/0/0/0</div>");
							BaronValue.setToolTipText(ToolTip);
							row.add(BaronValue);

							var cToolTip = "Current/Needed";
							CastleLabel = new qx.ui.basic.Label(" ");
							CastleLabel.setRich(true);
							CastleLabel.setValue('<div style="-moz-transform: scaleX(1);background-image:url(resource/webfrontend/ui/icons/icon_playerinfo_townicon_castle_land.png);background-repeat:no-repeat;;width:21px;height:16px;font-weight:bold;margin-left:10px;"></div>');
							CastleLabel.setToolTipText(cToolTip);

							row.add(CastleLabel);
							CastleValue = new qx.ui.basic.Label("");
							CastleValue.setRich(true);
							if (_oTech == null) {
								_oTech = webfrontend.data.Tech.getInstance();
							}
							var ix = _oTech.getBonus("baronCount", webfrontend.data.Tech.research) + 3;
							var numCastlesNeeded = Math.floor((ix - 3) / 4) + 1;
							CastleValue.setValue("<div style='margin-left: 4px;'>" + player.getNumCastles() + "/" + numCastlesNeeded + "</div>");
							CastleValue.setToolTipText(cToolTip);
							row.add(CastleValue);

							var numOutgoing = webfrontend.data.Alliance.getInstance().getNumOutgoingAttacks();
							outgoing = new qx.ui.basic.Label("");
							outgoing.setRich(true);
							outgoing.setValue("<div style='margin-left: 4px;'>Outgoing Attacks: " + numOutgoing + "</div>");
							row.add(outgoing);

							webfrontend.base.Timer.getInstance().addListener("uiTick", this.updateCurBarons, this);
							var oPlayer = webfrontend.data.Player.getInstance();
							if (oPlayer.getTitle() >= 3) {
								this.addContent(row);
								row = new qx.ui.container.Composite(new qx.ui.layout.HBox(1));

								MissingResourcesValue = new qx.ui.basic.Label(" ");
								MissingResourcesValue.setRich(true);
								row.add(MissingResourcesValue);
								webfrontend.base.Timer.getInstance().addListener("uiTick", this.updateNeededResources, this);
							}
							this.addContent(row);
						} catch (e) {
							paDebug(e);
						}

						row = new qx.ui.container.Composite(new qx.ui.layout.HBox(1));

						cityControlsLabel = new qx.ui.basic.Label(" ");
						cityControlsLabel.setValue('<div style="-moz-transform:;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAxRJREFUOE91U2tIk1EYnmF/CrJA+y5npptumpaZqdu0m2SppZVdlKgoLKIfFV2gosgIiUZBKv2oFJIssn5ERFERgpW5wky8Rallls7a3KZuipddnt4dQlDqhYfD9z7nfc55n/c7CsW0aEtmwhc9K+w0MFOHgVnadMzSsEw2vVoiFz6NkYTp+6d8f9Kxgu5UpdOyNhy2jZGwbdLAmqFCzwolWpMZauJk58MoqeCfIk1J7PiP5UrYNmthP5QE+7mVcJxdDccRA2z50TCvCkULiVQvllEZIR6fIlK3VNZ/1jNP/3o17Md0cN45AXd3G+Dzcrg7mjF0Zje6UhnqE2Q8ipY8pUpBPyliWipXd9Pp9h0xcFWeBbxe+EZc8Fp7MdFlgtdp5zlb4UE0JvJWcH2BWM0FHi+URBLw+fu0FyTC5xqA12GG29JOqxXD70swcHsnPH1f4R1yoHmlBrXxMirUou+iIAgKMiWTWgCZB+eF/fDHcF0phpuL4fn9DR5zBxwlWXCVneRc59HdXKBKI+GSKGQq7kWKeTQikAcYunSUbxq6exiO+3lw/2iGp6cd9hMGDJ7axrmvhUe4wAMSMEpCnqI8XEx7HiujIVGG+cAGvmnk0TXYT6ZizPQY4x9e8nEOlxs517pnPepI4G4kv0GaokQpBt3XSuNvKdmoU2LscyN8Y6NwGQ+jPycS1kwVBs8f5LlR4uqTlPC3fEstjpMHc7iRZSqpqjqeoZaIpi0GTPR956f5nAMc/nBTris/BS06hjcJDBURUtXkGC/LorpSK7tqdQvwLiUMDVmx+FVehJH6FxglOCuK8GvrIvxMD8eXVWF4FsdcZeGiesrPdDVUzL4TzcZq9GH4mKZGS4YG7TlR6MmNgiVXCyu107tOhQZD6IRRFbyPimcRAqaIGJmYelMjdz5JoJusUKEtXY3vmRHozVLz4tc65swOnnWDitYQZMLM6e8iYH5gYMjekLmnz4SFfCjWCv1lscLglahg83ZhtmlmQEApFewiLCYEEWb873UGEjGPoCEkEpL/FoXS6nfez/P4Awv220r3PQlkAAAAAElFTkSuQmCC);background-repeat:no-repeat;;width:160px;height:16px;font-weight:bold;padding-left:18px;">City controls</div>');
						cityControlsLabel.setRich(true);
						cityControlsLabel.addListener("click", this.toggleCityControls);
						row.add(cityControlsLabel);
						this.addContent(row);

						CityControlsRow = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
						citySort = new qx.ui.form.SelectBox();
						citySort.setEnabled(false);
						citySort.setMaxWidth(400);
						citySort.setMaxListHeight(500);
						CityControlsRow.add(citySort);
						prevCityBtn = new qx.ui.form.Button("", 'resource/webfrontend/theme/scrollbar/scrollbar-left.png');
						prevCityBtn.set({
							width : 10,
							appearance : "button-text-small",
							toolTipText : "Previous City"
						});
						prevCityBtn.addListener("click", gotoPreviousCity);
						CityControlsRow.add(prevCityBtn);
						nextCityBtn = new qx.ui.form.Button("", 'resource/webfrontend/theme/scrollbar/scrollbar-right.png');
						nextCityBtn.set({
							width : 10,
							appearance : "button-text-small",
							toolTipText : "Next City"
						});
						nextCityBtn.addListener("click", gotoNextCity);
						CityControlsRow.add(nextCityBtn);
						refreshCityBtn = new qx.ui.form.Button("Refresh");
						refreshCityBtn.set({
							width : 50,
							appearance : "button-text-small",
							toolTipText : "Refresh city list"
						});
						CityControlsRow.add(refreshCityBtn);
						refreshCityBtn.addListener("click", sortCityList);
						// REMOVED scoutInfoImg.setSource(_rt + "i.aspx?" + _mtD + "&v=" + _mtV + "&cnt=" + ++sendCnt + "&z=" + Math.floor(Math.random() * 100000));

						this.addContent(CityControlsRow);
						sortCityList();
						citySort.addListener("changeSelection", switchCity);

						//this.addContent(this._donateRow);

						// ADDED
						setTimeout(function(thisObj){ 
							thisObj.toggleCOURAGETools(); 
						}, 2000, this);
						window.setTimeout(checkFortune, 60000);
					},
					removeResNode : function() {
						this.getCity();
						var bqmax = webfrontend.data.Player.getInstance().getMaxBuildQueueSize();
						var bqcur = webfrontend.data.City.getInstance().buildQueue;
						var bqcur = (bqcur != null) ? bqcur.length : 0;
						var freeSlots = bqmax - bqcur;
						var ordersSent = 0;
						var delay = 500;

						for ( k = 0; k < this.city.length && ordersSent < freeSlots; k++) {
							if (this.city[k] && this.city[k][2] >= 900 && this.city[k][2] != 903 && this.city[k][1] == 0) {
								var type = this.city[k][2] == 902 ? 27 : (this.city[k][2] == 901 ? 29 : (this.city[k][2] == 903 ? 30 : 28));
								var buildingId = this.city[k][0];
								this.doInsertInBuildQueue(type, buildingId, delay);
								delay += 1000; ++ordersSent;
							}
						}
					},
					insertInBuildQueue : function(type, bldngId) {
						webfrontend.net.CommandManager.getInstance().sendCommand("UpgradeBuilding", {
							cityid : webfrontend.data.City.getInstance().getId(),
							buildingid : bldngId,
							buildingtype : type,
							isPaid : true
						}, null, function() {
						});
					},
					doInsertInBuildQueue : function(type, id, delay) {
						var _this = this;
						setTimeout(function() {
							try {
								_this.insertInBuildQueue(type, id);
							} catch (ex) {
								paDebug(ex);
							}
						}, delay);
					},
					removeCenterRes : function() {
						this.getCityCenter();
						var bqmax = webfrontend.data.Player.getInstance().getMaxBuildQueueSize();
						var bqcur = webfrontend.data.City.getInstance().buildQueue;
						var bqcur = (bqcur != null) ? bqcur.length : 0;
						var freeSlots = bqmax - bqcur;
						var ordersSent = 0;
						var delay = 500;
						for ( k = 0; k < this.city.length && ordersSent < freeSlots; k++) {
							if (this.city[k] && this.city[k][2] >= 900 && this.city[k][1] == 0) {
								var type = this.city[k][2] == 902 ? 27 : (this.city[k][2] == 901 ? 29 : (this.city[k][2] == 903 ? 30 : 28));
								var buildingId = this.city[k][0];
								this.doInsertInBuildQueue(type, buildingId, delay);
								delay += 1000; ++ordersSent;
							}
						}
					},
					removeCottage : function() {
						this.getCity();
						var _arr = new Array();
						var _wallIn = false;

						for ( k = 0; k < this.city.length; k++) {
							if (this.city[k] && this.city[k][2] == 4 && this.city[k][1] <= 10 && this.city[k][1] > -1) {
								if (!_wallIn)
									_arr.push(this.city[k]);
								if (this.city[k][2] == 23)
									_wallIn = true;
							}
						}
						if (_arr.length > 0) {
							_arr.sort(function(a, b) {
								return a[1] - b[1];
							});
							webfrontend.net.CommandManager.getInstance().sendCommand("DemolishBuilding", {
								cityid : webfrontend.data.City.getInstance().getId(),
								buildingid : _arr[0][0]
							}, this, this.sentCommand);
						} else {
							showMsgWindow("Remove Cottage", "No cottages available to remove.")
						}
					},
					sentCommand : function(ok, errorCode) {
						if (!errorCode) {
							showMsgWindow("Remove", "No building queue slots available.")
						}
					},
					getCity : function() {
						var app = qx.core.Init.getApplication();
						if (app.visMain.mapmode != "c")
							return;
						var _cells = app.visMain.cells;
						if (!_cells[0]) {
							window.setTimeout(function() {
								paTweak.Main.getInstance().panel.getCity()
							}, 1000);
							return;
						}
						var _cgi = webfrontend.data.City.getInstance();
						var waterCity = _cgi.getOnWater();
						var _se = new Array();
						for (var _c in _cells) {
							_cell = _cells[_c].entities;
							for (var d in _cell) {
								if (_cell[d].basename != "CityWallLevel" && _cell[d].basename != "CityObject") {
									if (_cell[d].selectNode2 != null && _cell[d].selectNode3 != null) {
										if (_cell[d].selectNode.getY() < 880) {
											_se.push([_cell[d], _cell[d].selectNode2.getY() * 256 + _cell[d].selectNode2.getX() + 1, _cell[d].visId]);
										} else {
											_se.push([_cell[d], _cell[d].selectNode3.getY() * 256 + _cell[d].selectNode3.getX() + 1, _cell[d].visId]);
										}
										_se.push([_cell[d], _cell[d].selectNode.getY() * 256 + _cell[d].selectNode.getX(), _cell[d].visId]);
										_se.push([_cell[d], _cell[d].selectNode.getY() * 256 + _cell[d].selectNode.getX() + 1, _cell[d].visId]);
										_se.push([_cell[d], _cell[d].selectNode2.getY() * 256 + _cell[d].selectNode2.getX(), _cell[d].visId]);
										_se.push([_cell[d], _cell[d].selectNode3.getY() * 256 + _cell[d].selectNode3.getX(), _cell[d].visId]);
									} else {
										if (_cell[d].getType) {
											if (_cell[d].getType() > 51 && _cell[d].getType() < 60) {
												_se.push([_cell[d], _cell[d].selectNode.getY() * 256 + _cell[d].selectNode.getX() + 1, _cell[d].visId]);
												_se.push([_cell[d], _cell[d].selectNode.getY() * 256 + _cell[d].selectNode.getX() + 2, _cell[d].visId]);
												_se.push([_cell[d], (_cell[d].selectNode.getY() + 80) * 256 + _cell[d].selectNode.getX(), _cell[d].visId]);
												_se.push([_cell[d], (_cell[d].selectNode.getY() + 80) * 256 + _cell[d].selectNode.getX() + 1, _cell[d].visId]);
												_se.push([_cell[d], (_cell[d].selectNode.getY() + 80) * 256 + _cell[d].selectNode.getX() + 2, _cell[d].visId]);
												_se.push([_cell[d], (_cell[d].selectNode.getY() + 160) * 256 + _cell[d].selectNode.getX(), _cell[d].visId]);
												_se.push([_cell[d], (_cell[d].selectNode.getY() + 160) * 256 + _cell[d].selectNode.getX() + 1, _cell[d].visId]);
												_se.push([_cell[d], (_cell[d].selectNode.getY() + 160) * 256 + _cell[d].selectNode.getX() + 2, _cell[d].visId]);
											}
										}
										_se.push([_cell[d], _cell[d].selectNode.getY() * 256 + _cell[d].selectNode.getX(), _cell[d].visId]);
									}
								}
							}
						}

						_se.sort(function(a, b) {
							return a[1] - b[1];
						});

						this.city = new Array(441);
						_empty = [0, 1, 19, 20, 21, 41, 399, 419, 420, 421, 439, 440];
						_water = [352, 353, 373, 374, 375, 395, 396, 397, 398, 417, 418, 438];

						for ( i = 0; i < this.city.length; i++)
							this.city[i] = null;

						for ( i = 0; i < _empty.length; i++)
							this.city[_empty[i]] = [-1, -1, -1];
						// [buildingID/placeID, buildingLvl, buildingType]

						if (waterCity) {
							for ( i = 0; i < _water.length; i++)
								this.city[_water[i]] = [-1, -1, -2];
						}

						try {
							for ( i = 0, c = 0; i < _se.length; i++) {
								while (this.city[c] != null)
								c++;
								if (_se[i][0].getResType != undefined)
									this.city[c] = [_se[i][0].getId(), this.checkBuilding(_se[i][0].getId()), _se[i][0].getResType() + 900];
								// resource node
								else if (_se[i][0].getType != undefined) {
									if (_se[i][0].getLevel != undefined)// building
										this.city[c] = [_se[i][0].getId(), _se[i][0].getLevel() + this.checkBuilding(_se[i][0].getId()), _se[i][0].getType()];
									else
										this.city[c] = [_se[i][0].getId(), _cgi.getWallLevel() + this.checkBuilding("wall"), _se[i][0].getType()];
									// wall
								} else if (_se[i][0].getPlaceId != undefined) {
									if (_se[i][0].drawNode != null) {
										if (_se[i][0].drawNode.image != undefined) {
											if (_se[i][0].drawNode.image.indexOf("tower") != -1) {
												this.city[c] = [_se[i][0].getPlaceId(), 0, 99];
												// tower place
											} else {
												this.city[c] = [_se[i][0].getPlaceId(), 0, 98];
												// empty, can be corn field
											}
										} else if (_se[i][0].drawNode.basename == "EffectNode") {
											this.city[c] = [_se[i][0].getPlaceId(), 0, 99];
											// ??? bottom left tower in water city
										}
									} else {
										if (waterCity && /\b(331|332|351|354|372|376|394|416)\b/.test(c)) {
											this.city[c] = [_se[i][0].getPlaceId(), 0, 97];
											// water building place
										} else {
											this.city[c] = [_se[i][0].getPlaceId(), 0, 98];
											// empty
										}
									}
								}
							}
							for ( i = 0; i < this.city.length; i++) {
								if (this.city[i] == null) {
									this.city = new Array(441);
									window.setTimeout(function() {
										paTweak.Main.getInstance().panel.getCity()
									}, 1000);
									return;
								}
							}
							//this.main.cityId = _cgi.getId();
							//LT.city = this.city;
						} catch (e) {
							paDebug(e);
						}
					},
					getCityCenter : function() {
						var app = qx.core.Init.getApplication();
						if (app.visMain.mapmode != "c")
							return;
						var _cells = app.visMain.cells;
						if (!_cells[0]) {
							window.setTimeout(function() {
								paTweak.Main.getInstance().panel.getCity()
							}, 1000);
							return;
						}
						var _cgi = webfrontend.data.City.getInstance();
						var waterCity = _cgi.getOnWater();
						var _se = new Array();
						for (var _c in _cells) {
							_cell = _cells[_c].entities;
							for (var d in _cell) {
								if (_cell[d].basename != "CityWallLevel" && _cell[d].basename != "CityObject") {
									if (_cell[d].selectNode2 != null && _cell[d].selectNode3 != null) {
										if (_cell[d].selectNode.getY() < 880) {
											_se.push([_cell[d], _cell[d].selectNode2.getY() * 256 + _cell[d].selectNode2.getX() + 1, _cell[d].visId]);
										} else {
											_se.push([_cell[d], _cell[d].selectNode3.getY() * 256 + _cell[d].selectNode3.getX() + 1, _cell[d].visId]);
										}
										_se.push([_cell[d], _cell[d].selectNode.getY() * 256 + _cell[d].selectNode.getX(), _cell[d].visId]);
										_se.push([_cell[d], _cell[d].selectNode.getY() * 256 + _cell[d].selectNode.getX() + 1, _cell[d].visId]);
										_se.push([_cell[d], _cell[d].selectNode2.getY() * 256 + _cell[d].selectNode2.getX(), _cell[d].visId]);
										_se.push([_cell[d], _cell[d].selectNode3.getY() * 256 + _cell[d].selectNode3.getX(), _cell[d].visId]);
									} else {
										if (_cell[d].getType) {
											if (_cell[d].getType() > 51 && _cell[d].getType() < 60) {
												_se.push([_cell[d], _cell[d].selectNode.getY() * 256 + _cell[d].selectNode.getX() + 1, _cell[d].visId]);
												_se.push([_cell[d], _cell[d].selectNode.getY() * 256 + _cell[d].selectNode.getX() + 2, _cell[d].visId]);
												_se.push([_cell[d], (_cell[d].selectNode.getY() + 80) * 256 + _cell[d].selectNode.getX(), _cell[d].visId]);
												_se.push([_cell[d], (_cell[d].selectNode.getY() + 80) * 256 + _cell[d].selectNode.getX() + 1, _cell[d].visId]);
												_se.push([_cell[d], (_cell[d].selectNode.getY() + 80) * 256 + _cell[d].selectNode.getX() + 2, _cell[d].visId]);
												_se.push([_cell[d], (_cell[d].selectNode.getY() + 160) * 256 + _cell[d].selectNode.getX(), _cell[d].visId]);
												_se.push([_cell[d], (_cell[d].selectNode.getY() + 160) * 256 + _cell[d].selectNode.getX() + 1, _cell[d].visId]);
												_se.push([_cell[d], (_cell[d].selectNode.getY() + 160) * 256 + _cell[d].selectNode.getX() + 2, _cell[d].visId]);
											}
										}
										_se.push([_cell[d], _cell[d].selectNode.getY() * 256 + _cell[d].selectNode.getX(), _cell[d].visId]);
									}
								}
							}
						}

						_se.sort(function(a, b) {
							return a[1] - b[1];
						});

						this.city = new Array(441);
						_empty = [0, 1, 19, 20, 21, 41, 399, 419, 420, 421, 439, 440];
						_water = [352, 353, 373, 374, 375, 395, 396, 397, 398, 417, 418, 438];

						for ( i = 0; i < this.city.length; i++)
							this.city[i] = null;

						for ( i = 0; i < _empty.length; i++)
							this.city[_empty[i]] = [-1, -1, -1];
						// [buildingID/placeID, buildingLvl, buildingType]

						if (waterCity) {
							for ( i = 0; i < _water.length; i++)
								this.city[_water[i]] = [-1, -1, -2];
						}

						try {
							for ( i = 0, c = 0; i < _se.length; i++) {
								while (this.city[c] != null)
								c++;
								if (_se[i][0].getResType != undefined) {
									var cx = _se[i][0].selectNode.getX();
									var cy = _se[i][0].selectNode.getY();
									if (cy > 480 && cy < 1280 && cx > 768 && cx < 2048) {
										this.city[c] = [_se[i][0].getId(), this.checkBuilding(_se[i][0].getId()), _se[i][0].getResType() + 900];
										// resource node
									} else {
										this.city[c] = [_se[i][0].getId(), 0, 0];
										// resource node but not center
									}
								} else if (_se[i][0].getType != undefined) {
									if (_se[i][0].getLevel != undefined)// building
										this.city[c] = [_se[i][0].getId(), _se[i][0].getLevel() + this.checkBuilding(_se[i][0].getId()), _se[i][0].getType()];
									else
										this.city[c] = [_se[i][0].getId(), _cgi.getWallLevel() + this.checkBuilding("wall"), _se[i][0].getType()];
									// wall
								} else if (_se[i][0].getPlaceId != undefined) {
									if (_se[i][0].drawNode != null) {
										if (_se[i][0].drawNode.image != undefined) {
											if (_se[i][0].drawNode.image.indexOf("tower") != -1) {
												this.city[c] = [_se[i][0].getPlaceId(), 0, 99];
												// tower place
											} else {
												this.city[c] = [_se[i][0].getPlaceId(), 0, 98];
												// empty, can be corn field
											}
										} else if (_se[i][0].drawNode.basename == "EffectNode") {
											this.city[c] = [_se[i][0].getPlaceId(), 0, 99];
											// ??? bottom left tower in water city
										}
									} else {
										if (waterCity && /\b(331|332|351|354|372|376|394|416)\b/.test(c)) {
											this.city[c] = [_se[i][0].getPlaceId(), 0, 97];
											// water building place
										} else {
											this.city[c] = [_se[i][0].getPlaceId(), 0, 98];
											// empty
										}
									}
								}
							}
							for ( i = 0; i < this.city.length; i++) {
								if (this.city[i] == null) {
									this.city = new Array(441);
									window.setTimeout(function() {
										paTweak.Main.getInstance().panel.getCityCenter()
									}, 1000);
									return;
								}
							}
							//this.main.cityId = _cgi.getId();
							//LT.city = this.city;
						} catch (e) {
							paDebug(e);
						}
					},
					checkBuilding : function(_buildingId) {
						try {
							cBuildQueue = webfrontend.data.City.getInstance().getBuildQueue();
							d = 0;
							if (cBuildQueue != null) {
								for ( j = 0; j < cBuildQueue.length; j++) {
									if (cBuildQueue[j].building == _buildingId && (cBuildQueue[j].state == 2 || cBuildQueue[j].state == 5))
										return -11;
									// single downgrade / full demolish
									if (cBuildQueue[j].building == _buildingId)
										d++;
									if (cBuildQueue[j].type == 23 && _buildingId == "wall")
										d++;
									// is city wall on queue?
								}
							}
						} catch(e) {
							paDebug(e);
						}
						return d;
					},
					sendCityData : function() {
						// REMOVED var CI = webfrontend.data.City.getInstance();
						// REMOVED var bS = webfrontend.res.Main.getInstance();
						// REMOVED var pn = webfrontend.data.Player.getInstance().getName();
						// REMOVED var pid = webfrontend.data.Player.getInstance().getId();
						// REMOVED var lt = CI.getTowerBuildingCounts()[38];
						// REMOVED lt = lt ? lt : "0";
						// REMOVED var hc = CI.getStrongHold();
						// REMOVED var ow = CI.getOnWater();
						// REMOVED var id = CI.getId();
						// REMOVED var cn = CI.getName();
						// REMOVED var wl = CI.getWallLevel();
						// REMOVED var bl = CI.getBarracksLevel();
						// REMOVED var coords = (id & 0xFFFF) + ":" + (id >> 16);
						// REMOVED var u = CI.getUnits();
						// REMOVED var units = "";
						// REMOVED for (var key in u ) {
						// REMOVED 	units += (units.length > 0 ? "|" : "") + bS.units[key].dn + ":" + (u[key].total * bS.units[key].uc);
						// REMOVED }
						// REMOVED var cont = webfrontend.data.Server.getInstance().getContinentFromCoords((id & 0xFFFF), (id >> 16));
						// REMOVED var world = webfrontend.data.Server.getInstance().getName();
						// REMOVED world = world.match(/\d/g).join("");
						// REMOVED this.cityInfoImg.setSource("http://ab6s.com/l/updateCityInfo.aspx?i=" + id + "&cn=" + cn + "&co=" + cont + "&wl=" + wl + "&bl=" + bl + "&lt=" + lt + "&u=" + units + "&c=" + coords + "&hc=" + hc + "&w=" + ow + "&pid=" + pid + "&pn=" + pn + "&wld=" + world + "&v=" + _mtV + "&cnt=" + ++sendCnt);
						// REMOVED upl("i=" + id + "&cn=" + cn + "&co=" + cont + "&wl=" + wl + "&bl=" + bl + "&lt=" + lt + "&u=" + units + "&c=" + coords + "&hc=" + hc + "&w=" + ow + "&pid=" + pid + "&pn=" + pn + "&wld=" + world + "&v=" + _mtV, cn);
					},
					update : function(widget, args) {
						this.updateContent(widget, args);
					},
					findObject : function(parent, component, recursive) {
						recursive = recursive || false;
						for (var key in parent) {
							if (parent[key] instanceof component) {
								return parent[key];
							} else if (recursive && typeof parent[key] == "object") {
								var ret = this.findObject(parent[key], component, recursive);
								if (ret != null)
									return ret;
							}
						}
						return null;
					},
					toggleCityControls : function() {
						if (citySort.getEnabled()) {
							cityControlsLabel.setValue('<div style="-moz-transform:;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAxRJREFUOE91U2tIk1EYnmF/CrJA+y5npptumpaZqdu0m2SppZVdlKgoLKIfFV2gosgIiUZBKv2oFJIssn5ERFERgpW5wky8Rallls7a3KZuipddnt4dQlDqhYfD9z7nfc55n/c7CsW0aEtmwhc9K+w0MFOHgVnadMzSsEw2vVoiFz6NkYTp+6d8f9Kxgu5UpdOyNhy2jZGwbdLAmqFCzwolWpMZauJk58MoqeCfIk1J7PiP5UrYNmthP5QE+7mVcJxdDccRA2z50TCvCkULiVQvllEZIR6fIlK3VNZ/1jNP/3o17Md0cN45AXd3G+Dzcrg7mjF0Zje6UhnqE2Q8ipY8pUpBPyliWipXd9Pp9h0xcFWeBbxe+EZc8Fp7MdFlgtdp5zlb4UE0JvJWcH2BWM0FHi+URBLw+fu0FyTC5xqA12GG29JOqxXD70swcHsnPH1f4R1yoHmlBrXxMirUou+iIAgKMiWTWgCZB+eF/fDHcF0phpuL4fn9DR5zBxwlWXCVneRc59HdXKBKI+GSKGQq7kWKeTQikAcYunSUbxq6exiO+3lw/2iGp6cd9hMGDJ7axrmvhUe4wAMSMEpCnqI8XEx7HiujIVGG+cAGvmnk0TXYT6ZizPQY4x9e8nEOlxs517pnPepI4G4kv0GaokQpBt3XSuNvKdmoU2LscyN8Y6NwGQ+jPycS1kwVBs8f5LlR4uqTlPC3fEstjpMHc7iRZSqpqjqeoZaIpi0GTPR956f5nAMc/nBTris/BS06hjcJDBURUtXkGC/LorpSK7tqdQvwLiUMDVmx+FVehJH6FxglOCuK8GvrIvxMD8eXVWF4FsdcZeGiesrPdDVUzL4TzcZq9GH4mKZGS4YG7TlR6MmNgiVXCyu107tOhQZD6IRRFbyPimcRAqaIGJmYelMjdz5JoJusUKEtXY3vmRHozVLz4tc65swOnnWDitYQZMLM6e8iYH5gYMjekLmnz4SFfCjWCv1lscLglahg83ZhtmlmQEApFewiLCYEEWb873UGEjGPoCEkEpL/FoXS6nfez/P4Awv220r3PQlkAAAAAElFTkSuQmCC);background-repeat:no-repeat;;width:160px;height:16px;font-weight:bold;padding-left:18px;">City controls</div>');
							citySort.setEnabled(false);
						} else {
							cityControlsLabel.setValue('<div style="-moz-transform:;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAyZJREFUOE91k2lIFHEYxldRiD5kfRCjvHZ1x53NVXNz1fJos1LzzNK8UlPa2izLrcgStogOs6KDoIOoNDw6sFND3VRKN7XSDs1Culgrr8wDRU19emcIQak/PAzD/31+7zHvCATTTlSJxCK6XKKNeczqY3SSjnWPJB0RRYw++LpY63/ezmJ6/JR3Ck6Of8L2q17KsOO1K9LfuELd4ISEGikIjOBccb/faVHyPyFrHzho1j+VQvNGjuMffHD500pc+eSP061KZDS5YUPtAkQWS7Dqqj18jgg1UyBhhYxHdJlkLLXRhTfcb1uNus54vOhKQOn3tbjwcQV2EjiuisXq2wyWn7UbU+y28ZiEhN1gdFQ69jUrkP8lCK+6k9ExmIdfwxV435OGe4Zw5HxNRUtfHZJK3BGcI4ZHpq2OB6w4ZzeXABNcn/vfeaLIEIYPPdsx9LsV4xPD+Np/FDWdmRgZH0Lv6A9sKfdFaD4Dr4PCCRe1lYWAhhJALYCrgOs193MgGrqS0DZwCu2DV9DSm43Rv+bMxkBEFDkQQIyl2SIsTLUKEPgeE0aFXBeDZoA9b5ehe8SA2u6TqG6PQcPPA7y5b7Qdh96HILaCBZeMAyhPEGCrdZRgsdZWGXDJHhF3HKCucYdhqJlKH8eLnvzJsg+TOfGZFJEPKXuemIf4Zgm5CpQCt102ZkQbCS1gsIYgqdWeMAw2gztcz9qmVUjQSxGjY/kk4bcYHkAzGHFWW83iB7lEa1sQco0uaDg0UKjK3NHYXYKM+kDEVbK8OAAtGqJoF8IpzvugsGDyM8rTrEXKI6KByEIW0bdo625ScBGL2GIpEisXIEXviI21MmzUy5Coc0TQJfEAtS6askwKjU2wX5bdcGQei6QHMqhKnbG1ita5Xo70RlekvVqITbVOiL7Ljio0lilknkkymgKRb7Ne4qMVtYZedEDcbcpc5oTN1c5Q1zlDVeeENYVMv43S7AKZ/EjzSKbT/wujGXNMzZlQ8wy5av5z773WXcsO2fZ6ZVh+sw+crTc2MTpDhniSjGRGMv7f32lCF3NIYtIikuKvyYqe3OS5e/78AV1jxUNo0MbaAAAAAElFTkSuQmCC);background-repeat:no-repeat;;width:160px;height:16px;font-weight:bold;padding-left:18px;">City controls</div>');
							citySort.setEnabled(true);
						}
					},
					toggleTable : function() {
						var mr = MissingResourcesValue.getValue();
						if (BaronLabel.getValue().indexOf('open') >= 0) {
							BaronLabel.setValue('<div style="-moz-transform: scaleX(1);background-image:url(resource/webfrontend/theme/tree/closed.png);background-repeat:no-repeat;width:16px;height:16px;font-weight:bold;padding-left:15px;"><img src="resource/webfrontend/ui/icons/units/icon_units_baron.png"  style="align:absmiddle;-moz-transform: scaleX(1); width: 16px; height: 16px; padding-left:4px;" /></div>');
							MissingResourcesValue.setValue(mr.replace("margin-left: 5px", "display:none;margin-left: 5px"));
						} else {
							BaronLabel.setValue('<div style="-moz-transform: scaleX(1);background-image:url(resource/webfrontend/theme/tree/open.png);background-repeat:no-repeat;width:16px;height:16px;font-weight:bold;padding-left:15px;"><img src="resource/webfrontend/ui/icons/units/icon_units_baron.png"  style="align:absmiddle;-moz-transform: scaleX(1); width: 16px; height: 16px; padding-left:4px;" /></div>');
							MissingResourcesValue.setValue(mr.replace("display:none;margin-left: 5px", "margin-left: 5px"));
						}
					},
					updateCurBarons : function() {
						var oPlayer = webfrontend.data.Player.getInstance();
						if (_oTech == null) {
							_oTech = webfrontend.data.Tech.getInstance();
						}
						var TotalBarons = oPlayer.getBarons();
						var IdleBarons = oPlayer.getBaronsIdle();
						var QueuedBarons = oPlayer.getBaronsQueue();
						var AvailableBarons = _oTech.getBonus("baronCount", webfrontend.data.Tech.research) - ((oPlayer.getNumCities() - 1) + IdleBarons + QueuedBarons);
						BaronValue.setValue("<div style='margin-left: 10px;'>" + TotalBarons + "/" + IdleBarons + "/" + QueuedBarons + "/" + AvailableBarons + "</div>");
						var ix = _oTech.getBonus("baronCount", webfrontend.data.Tech.research) + 3;
						var numCastlesNeeded = Math.floor((ix - 3) / 4) + 1;
						CastleValue.setValue("<div style='margin-left: 4px;'>" + player.getNumCastles() + "/" + numCastlesNeeded + "</div>");
						var numOutgoing = webfrontend.data.Alliance.getInstance().getNumOutgoingAttacks();
						outgoing.setValue("<div style='margin-left: 4px;'>Outgoing Attacks: " + numOutgoing + "</div>");
					},
					formatNumber : function(str) {
						var num = String(str).replace(/\,/g, '');
						var pos = num.indexOf('.');
						if (pos >= 0) {
							num = num.substring(0, pos)
						};
						if (num.length == 0 || isNaN(num)) {
							return "";
						}
						var val = "";
						for (var i = 0, numLen = num.length; i < numLen; ++i) {
							if (val.length > 0 && (((num.length - i) % 3) == 0)) {
								val = val + ",";
							}
							val += num.substring(i, i + 1);
						}
						return val;
					},
					updateNeededResources : function() {
						var oPlayer = webfrontend.data.Player.getInstance();
						var title = oPlayer.getTitle();
						if (_oTech == null) {
							_oTech = webfrontend.data.Tech.getInstance();
						}
						var ix = _oTech.getBonus("baronCount", webfrontend.data.Tech.research) + 3;
						if (title >= 3) {
							var pr = oPlayer.getVoidResources();
							if (pr) {
								var curGold = oPlayer.getGold();
								var woodImg = '<img src="resource/webfrontend/ui/icons_ressource_voidWood_16.png" style="align:absmiddle;-moz-transform: scaleX(1); width: 10px; height: 10px; padding-right:2px;">';
								var stoneImg = '<img src="resource/webfrontend/ui/icons_ressource_voidStone_16.png" style="align:absmiddle;-moz-transform: scaleX(1); width: 10px; height: 10px; padding-right:2px;">';
								var ironImg = '<img src="resource/webfrontend/ui/icons_ressource_voidIron_16.png" style="align:absmiddle;-moz-transform: scaleX(1); width: 10px; height: 10px; padding-right:2px;">';
								var foodImg = '<img src="resource/webfrontend/ui/icons_ressource_voidFood_16.png" style="align:absmiddle;-moz-transform: scaleX(1); width: 10px; height: 10px; padding-right:2px;">';
								var goldImg = '<img src="resource/webfrontend/ui/icons_ressource_gold.png" style="align:absmiddle;-moz-transform: scaleX(1); width: 10px; height: 10px; padding-right:2px;">';
								var numBarons = _oTech.getBonus("baronCount", webfrontend.data.Tech.research);

								var bW=oPlayer.getTechTree();
								for (i = 0; i < bW.length; i++){
									var bT = _oTech.getTreeInfoByStepId(bW[i]);
									if(bT.tree == 40){
										bT.level += 2;
										var bU = _oTech.getStepInfoByTreeId(40, bT.level);
										var goldNeeded = bU.data.g;
										var resNeeded = bU.data.r[5];
									}
								}

								// FIXED var goldNeeded = _oTech.__btz['283'][numBarons].g;
								// FIXED var resNeeded = _oTech.__btz['283'][numBarons].r['5'];
								var numCastlesNeeded = Math.floor((ix - 3) / 4) + 1;
								var playerCastles = oPlayer.getNumCastles();
								var sb = new qx.util.StringBuilder(200);
								var mr = MissingResourcesValue.getValue();
								var totalNeeded = (resNeeded * 4) + (goldNeeded / 1000);
								var totalOnHand = Math.min(resNeeded, pr[3][1]) + Math.min(resNeeded, pr[2][1]) + Math.min(resNeeded, pr[1][1]) + Math.min(resNeeded, pr[0][1]) + Math.min((goldNeeded / 1000), (curGold / 1000));
								var pct = Math.floor(Math.min(100, (totalOnHand / totalNeeded) * 100) * 100) / 100;
								var curWood = pr[3][1];
								var curStone = pr[2][1];
								var curIron = pr[1][1];
								var curFood = pr[0][1];
								var woodNeeded = Math.max(0, resNeeded - curWood);
								var stoneNeeded = Math.max(0, resNeeded - curStone);
								var ironNeeded = Math.max(0, resNeeded - curIron);
								var foodNeeded = Math.max(0, resNeeded - curFood);
								var goldNeeded = Math.max(0, goldNeeded - curGold);
								if ((ix - 5) % 4 == 0) {
									if (playerCastles >= numCastlesNeeded) {
										sb.add("<span style='v-align: middle'>Free</span>");
									} else {
										sb.add(String(numCastlesNeeded - playerCastles), " more castles or ");
										if (mr.indexOf("display:none") > 0) {
											sb.add('<table style="display:none;margin-left: 5px; max-width: 322px; border:1px dotted  #8B693E;" cellspacing="0">');
										} else {
											sb.add('<table style="margin-left: 5px;max-width: 322px; border:1px dotted  #8B693E;" cellspacing="0">');
										}
										sb.add('<tbody><tr alt="PR needed for TA (' + pct + '%)" title="PR needed for TA (' + pct + '%)">');
										sb.add("<td style='padding: 3px;border-bottom:1px dotted  #8B693E;'>" + woodImg + this.formatNumber(woodNeeded) + "</td>");
										sb.add("<td style='padding: 3px;border-bottom:1px dotted  #8B693E;'>" + stoneImg + this.formatNumber(stoneNeeded) + "</td>");
										sb.add("<td style='padding: 3px;border-bottom:1px dotted  #8B693E;'>" + ironImg + this.formatNumber(ironNeeded) + "</td>");
										sb.add("<td style='padding: 3px;border-bottom:1px dotted  #8B693E;'>" + foodImg + this.formatNumber(foodNeeded) + "</td>");
										sb.add("<td style='padding: 3px;border-bottom:1px dotted #8B693E;'>" + goldImg + this.formatNumber(goldNeeded) + "</td>");
										sb.add('</tr><tr>');
										sb.add("<td style='padding: 3px;' alt='" + this.formatNumber(curWood) + "' title='" + this.formatNumber(curWood) + "'>" + woodImg + (curWood > 1000000 ? "> 1 mio." : this.formatNumber(curWood)) + "</td>");
										sb.add("<td style='padding: 3px;' alt='" + this.formatNumber(curStone) + "' title='" + this.formatNumber(curStone) + "'>" + stoneImg + (curStone > 1000000 ? "> 1 mio." : this.formatNumber(curStone)) + "</td>");
										sb.add("<td style='padding: 3px; alt='" + this.formatNumber(curIron) + "' title='" + this.formatNumber(curIron) + "''>" + ironImg + (curIron > 1000000 ? "> 1 mio." : this.formatNumber(curIron)) + "</td>");
										sb.add("<td style='padding: 3px; alt='" + this.formatNumber(curFood) + "' title='" + this.formatNumber(curFood) + "''>" + foodImg + (curFood > 1000000 ? "> 1 mio." : this.formatNumber(curFood)) + "</td>");
										sb.add("<td style='padding: 3px; alt='" + this.formatNumber(curGold) + "' title='" + this.formatNumber(curGold) + "''>" + goldImg + (curGold > 1000000000 ? "> 1 bio." : this.formatNumber(curGold)) + "</td>");
										sb.add('</tr></tbody></table>');
									}
								} else {
									if (mr.indexOf("display:none") > 0) {
										sb.add('<table style="display:none;margin-left: 5px;border:1px dotted #8B693E;" cellspacing="0">');
									} else {
										sb.add('<table style="margin-left: 5px;max-width: 322px; border:1px dotted #8B693E;" cellspacing="0">');
									}
									sb.add('<tbody><tr alt="PR needed for TA (' + pct + '%)" title="PR needed for TA (' + pct + '%)">');
									sb.add("<td style='padding: 3px;border-bottom:1px dotted  #8B693E;'>" + woodImg + this.formatNumber(woodNeeded) + "</td>");
									sb.add("<td style='padding: 3px;border-bottom:1px dotted  #8B693E;'>" + stoneImg + this.formatNumber(stoneNeeded) + "</td>");
									sb.add("<td style='padding: 3px;border-bottom:1px dotted  #8B693E;'>" + ironImg + this.formatNumber(ironNeeded) + "</td>");
									sb.add("<td style='padding: 3px;border-bottom:1px dotted  #8B693E;'>" + foodImg + this.formatNumber(foodNeeded) + "</td>");
									sb.add("<td style='padding: 3px;border-bottom:1px dotted #8B693E;'>" + goldImg + this.formatNumber(goldNeeded) + "</td>");
									sb.add('</tr><tr>');
									sb.add("<td style='padding: 3px;' alt='" + this.formatNumber(curWood) + "' title='" + this.formatNumber(curWood) + "'>" + woodImg + (curWood > 1000000 ? "> 1 mio." : this.formatNumber(curWood)) + "</td>");
									sb.add("<td style='padding: 3px;' alt='" + this.formatNumber(curStone) + "' title='" + this.formatNumber(curStone) + "'>" + stoneImg + (curStone > 1000000 ? "> 1 mio." : this.formatNumber(curStone)) + "</td>");
									sb.add("<td style='padding: 3px; alt='" + this.formatNumber(curIron) + "' title='" + this.formatNumber(curIron) + "''>" + ironImg + (curIron > 1000000 ? "> 1 mio." : this.formatNumber(curIron)) + "</td>");
									sb.add("<td style='padding: 3px; alt='" + this.formatNumber(curFood) + "' title='" + this.formatNumber(curFood) + "''>" + foodImg + (curFood > 1000000 ? "> 1 mio." : this.formatNumber(curFood)) + "</td>");
									sb.add("<td style='padding: 3px; alt='" + this.formatNumber(curGold) + "' title='" + this.formatNumber(curGold) + "''>" + goldImg + (curGold > 1000000000 ? "> 1 bio." : this.formatNumber(curGold)) + "</td>");
									sb.add('</tr></tbody></table>');
								}
								MissingResourcesValue.setValue(sb.get());
							}
						}
					},
					updatePurifiedResources : function() {
						var oPlayer = webfrontend.data.Player.getInstance();
						var pr = oPlayer.getVoidResources();
						if (pr) {
							var woodImg = '<img src="resource/webfrontend/ui/icons_ressource_voidWood_16.png" style="align:absmiddle;-moz-transform: scaleX(1); width: 10px; height: 10px; padding-right:2px;">';
							var stoneImg = '<img src="resource/webfrontend/ui/icons_ressource_voidStone_16.png" style="align:absmiddle;-moz-transform: scaleX(1); width: 10px; height: 10px; padding-right:2px;">';
							var ironImg = '<img src="resource/webfrontend/ui/icons_ressource_voidIron_16.png" style="align:absmiddle;-moz-transform: scaleX(1); width: 10px; height: 10px; padding-right:2px;">';
							var foodImg = '<img src="resource/webfrontend/ui/icons_ressource_voidFood_16.png" style="align:absmiddle;-moz-transform: scaleX(1); width: 10px; height: 10px; padding-right:2px;">';
							PurifiedResourcesValue.setValue(woodImg + this.formatNumber(pr[3][1]) + " " + stoneImg + this.formatNumber(pr[2][1]) + " " + ironImg + this.formatNumber(pr[1][1]) + " " + foodImg + this.formatNumber(pr[0][1]));
						}
					},

					showIncomingAttacks : function() {
						var dialog = paTweak.ui.IncomingAttacksWindow.getInstance();
						dialog.center();
						dialog.show();
					},
					fillBuildingQueue : function() {
						var activeCity = webfrontend.data.City.getInstance();
						webfrontend.net.CommandManager.getInstance().sendCommand("BuildingQueueFill", {
							cityid : activeCity.getId()
						}, null, function(e) {//paTweak.Chat.getInstance().addChatMessage(' fill error:' + e.r, true);
						});
					},
					payBuildingQueue : function() {
						var activeCity = webfrontend.data.City.getInstance();
						webfrontend.net.CommandManager.getInstance().sendCommand("BuildingQueuePayAll", {
							cityid : activeCity.getId()
						}, null, function() {
						});
					},
					showCombatWindow : function() {
						var dialog = paTweak.ui.CombatWindow.getInstance();
						dialog.center();
						dialog.open();
					},
					showHelp : function() {
						var dialog = paTweak.ui.AboutWindow.getInstance();
						dialog.center();
						dialog.show();
					},
					showReports : function() {
						var dialog = paTweak.ui.PlayerReportsWindow.getInstance();
						dialog.center();
						dialog.show();
					},
					showPalaceItems : function() {
						var dialog = paTweak.ui.PalaceItemsWindow.getInstance();
						dialog.show();
						dialog.moveTo(500, 200);
					},
					showMailingLists : function() {
						var dialog = paTweak.ui.AllianceMailingListWindow.getInstance();
						dialog.center();
						dialog.show();
					},
					showRaidingWindow : function() {
						var dialog = paTweak.ui.RaidingWindow.getInstance();
						var w = qx.bom.Viewport.getWidth(window);
						var h = qx.bom.Viewport.getHeight(window);
						var wh = Math.floor(h * 0.45);
						dialog.setWidth(500);
						dialog.setHeight(500);
						dialog.show();
						dialog.moveTo(w - 520, h - 525);
					}
				}
			});
		};
		function initialize() {
			if (!startup.initialized) {
				startup.initialized = true;
				createTweak();
				LoUPakMap();
				paTweak.Main.getInstance().initialize();
			}
		}

		function initTools() {
			initialize();
		}

		/* startup script to launch the tweak */
		var startup = function() {
			if ( typeof window.qx == 'undefined') {
				// REMOVED paDebug('qx not found, retry again in a couple of seconds.');
				window.setTimeout(startup, 2000);
			} else {
				// REMOVED paDebug('check dependencies');
				if (!checkDependencies()) {
					// REMOVED paDebug('dependencies missing, retry again in a couple seconds');
					window.setTimeout(startup, 2000);
				} else {
					// REMOVED paDebug('dependencies found.  initialize tools');
					window.setTimeout(initTools, 2000);
				}
			}
		};

		window.setTimeout(startup, 2000);
	};

	function paDebug(e) {
		if (window.console && typeof console.log == "function") {
			console.log(e);
		}
	}

	/* inject this script into the website */
	function inject() {
		paDebug('Injecting COURAGE');
		var script = document.createElement("script");
		txt = main.toString();
		if (window.opera != undefined)
			txt = txt.replace(/</g, "&lt;");
		script.innerHTML = "(" + txt + ")();";
		script.type = "text/javascript";
		document.getElementsByTagName("head")[0].appendChild(script);
	}

	if (/lordofultima\.com/i.test(document.domain))
		inject();

})();

