// ==UserScript==
// @name				HV Statistics, Tracking, and Analysis Tool
// @namespace		HV STAT
// @description	Collects data, analyzes statistics, and enhances the interface of the HentaiVerse
// @include			http://hentaiverse.org/*
// @author			Various (http://forums.e-hentai.org/index.php?showtopic=22652)
// @version			4.3.3
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// @require			http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.3/jquery-ui.min.js
// @resource		jQueryUICSS http://www.starfleetplatoon.com/~cmal/HVSTAT/jqueryui.css
// ==/UserScript==

VERSION = "4.3.3";
SAVE_STATS = true;
MAX_MID = 33;
SELF_EFF_TOP = 34;
SELF_EFF_LEFT = 8;
MON_EFF_TOP = -3;
MON_EFF_LEFT = 5;
FIRST_EFF = 33;
HV_OVERVIEW = "HVOverview";
HV_STATS = "HVStats";
HV_PROF = "HVProf";
HV_REWARDS = "HVRewards";
HV_SHRINE = "HVShrine";
HV_DROPS = "HVDrops";
HV_SETTINGS = "HVSettings";
HV_ROUND = "HVRound";
HV_ALERT = "critAlert";
HV_EQUIP = "inventoryAlert";
HOURLY = 0;
ARENA = 1;
GRINDFEST = 2;
ITEM_WORLD = 3;
_overview = null;
_stats = null;
_profs = null;
_rewards = null;
_shrine = null;
_drops = null;
_settings = null;
_round = null;
_isMenuInitComplete = false;
_equips = 0;
_lastEquipName = "";
_artifacts = 0;
_lastArtName = "";
_tokenDrops = [0, 0, 0];
if (!browserIsChrome() && !cssInserted()) {
	GM_addStyle(GM_getResourceText("jQueryUICSS"));
	cssAdded()
}
jQuery.fn.outerHTML = function () {
	return $("<div>").append(this.eq(0).clone()).html()
};
Array.prototype.init = function (b) {
	if (b === undefined) {
		b = 0
	}
	for (var a = 0; a < this.length; a++) {
		this[a] = b
	}
};
main();
function main(b) {
	var a = localStorage.getItem(HV_EQUIP);
	var c = (a == null) ? false : JSON.parse(a);
	loadSettingsObject();
	if ((_settings.isHideHVLogo || _settings.isChangePageTitle) && isHentaiVerse()) {
		obscureHVIds()
	}
	if (isBattle()) {
		collectRoundInfo();
		if (_settings.warnMode[_round.battleType]) {
			healthWarning()
		}
		if ((_round != null) && (_round.currRound > 0)) {
			showRoundCounter()
		}
		displayPowerupBox();
		if (_settings.isShowDivider) {
			addBattleLogDividers()
		}
		if (_settings.isShowHighlight) {
			highlightLogText()
		}
		if ((_round != null) && (_round.monsters.length > 0)) {
			showMonsterStats()
		}
		if (_settings.isShowSelfDuration) {
			showSelfEffectsDuration()
		}
		if (isBattleOver()) {
			if (_settings.isShowEndStats) {
				showBattleEndStats()
			}
			saveStats();
			_round.reset()
		}
	} else {
		if (!isBattle() && (_round != null)) {
			_round.reset()
		} else {
			if (isItemInventoryPage() && _settings.isColumnInventory) {
				initItemsView()
			} else {
				if (isCharacterPage()) {
					collectCurrentProfsData()
				} else {
					if (isShrinePage() && _settings.isTrackShrine) {
						captureShrine()
					}
				}
			}
		}
	}
	if (_settings.isShowSidebarProfs) {
		showSidebarProfs()
	}
	if (c) {
		inventoryWarning()
	}
	if (isHentaiVerse()) {
		initUI()
	}
}
function obscureHVIds() {
	var a = document.getElementsByTagName("img")[0];
	if (_settings.isHideHVLogo && (a.src.indexOf("hentaiverse.png") > -1)) {
		$(a).css("visibility", "hidden")
	}
	if (_settings.isChangePageTitle && (document.title == "The HentaiVerse")) {
		document.title = _settings.customPageTitle
	}
}
function highlightLogText() {
	$("#togpane_log td:last-child").each(function () {
			var b = $(this);
			var a = b.html();
			if (a.match(/(you crit)|crits|blasts|unleash/i)) {
				b.css("font-weight", "bold")
			}
			if (a.match(/(you (hit|crit|counter))|(your offhand (hit|crit))|(unleash)/i)) {
				b.css("color", !_settings.isAltHighlight ? "blue" : "black")
			} else {
				if (a.match(/you cast/i) || a.match(/explodes for/i)) {
					b.css("color", "teal")
				} else {
					if (a.match(/hits|blasts/i) && !a.match(/hits you /i) && !a.match(/(bleeding wound)|(spreading poison)|(your spike shield)|(searing skin)|(burning soul) hits/i)) {
						b.css("color", !_settings.isAltHighlight ? "teal" : "black")
					} else {
						if (a.match(/procs the effect/i) && !_settings.isAltHighlight) {
							b.css("color", "#800080")
						} else {
							if (a.match(/(bleeding wound)|(spreading poison)|(your spike shield)|(searing skin)|(burning soul) hits/i) && !a.match(/has expired/i)) {
								b.css("color", "#800080")
							} else {
								if (a.match(/(you (dodge|evade|block|parry|resist))|(misses.*?against you)/i)) {
									b.css("color", !_settings.isAltHighlight ? "#999999" : "#555555")
								} else {
									if (a.match(/restores|(you are healed)|recovered/i)) {
										b.css("color", "green")
									} else {
										if (a.match(/you gain/i) && !a.match(/drained/i) && !_settings.isAltHighlight) {
											b.css("color", "#ba9e1c")
										} else {
											if (a.match(/(hostile spell is drained)|(you drain)|(ether theft drains)|(lifestream drains)/i)) {
												b.css("color", "green")
											} else {
												if (a.match(/enough mp/i)) {
													b.css("color", "#ff7777")
												} else {
													if (a.match(/(hits|crits) you /i) && !a.match(/(hits|crits) you for 1 /i)) {
														b.css("color", "red")
													} else {
														if (a.match(/(hits|crits) you for 1 /i)) {
															b.css("color", "#999999")
														} else {
															if (a.match(/Your attack misses its mark/)) {
																b.css("color", !_settings.isAltHighlight ? "#999999" : "orange")
															} else {
																if (a.match(/Your spell misses its mark/)) {
																	b.css("color", !_settings.isAltHighlight ? "#999999" : "orange")
																} else {
																	if (a.match(/casts/)) {
																		b.css("color", "#0016b8")
																	} else {
																		if (a.match(/uses/i)) {
																			b.css("color", !_settings.isAltHighlight ? "orange" : "blue")
																		} else {
																			if (a.match(/powerup/i)) {
																				b.css("color", "#ff00ff")
																			} else {
																				if (a.match(/charging soul/i)) {
																					b.css("color", "#C97600")
																				} else {
																					if (a.match(/your spirit shield absorbs/i)) {
																						b.css("color", "#C97600")
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (_settings.isAltHighlight) {
				if (a.match(/gains the effect (bleeding|penetrated|stun|(ripened soul))/i) && !a.match(/(bleeding|penetrated|stun|(ripened soul)).*expired/i)) {
					b.css("color", "#800080")
				} else {
					if (a.match(/proficiency/i)) {
						b.css("color", "#ba9e1c")
					}
				}
			}
		})
}
function addBattleLogDividers() {
	var a = -1;
	$("#togpane_log td:first-child").each(function () {
			var b = $(this);
			if (b.html() != a) {
				if (a >= 0) {
					b.parent("tr").before("<tr><td colspan='3'><hr style='border:0; height:1px; background-color:#666666; color:#666666' /></td></tr>")
				}
				a = b.html()
			}
		})
}
function showRoundCounter() {
	var b = "";
	var c = _round.currRound;
	var a = _round.maxRound;
	b = a > 0 ? c + "/" + a : "#" + c;
	html = "<div style='font-size:18px;font-weight:bold;font-family:arial,helvetica,sans-serif;text-align:right;position:absolute;top:6px;right:17px;'><div style='" + (c == a - 1 ? "color:orange;'>" : c == a ? "color:red;'>" : "'>") + b + "</div></div>";
	$("#battleform").children().eq(0).append(html)
}
function displayPowerupBox() {
	var a = $("div.btp");
	var c = document.createElement("div");
	c.setAttribute("style", "position:absolute;top:7px;right:5px;background-color:#EFEEDC;width:30px;height:32px;border-style:double;border-width:2px;border-color:#555555;");
	var e = document.getElementById("ikey_p");
	if (e == null) {
		c.innerHTML = "<span style='font-size:16px;font-weight:bold;font-family:arial,helvetica,sans-serif;text-align:center;line-height:32px;cursor:default'>P</span>"
	} else {
		var b = e.getAttribute("onmouseover").match(/set_infopane_item\('.+?'/img)[0].substring(18);
		c.setAttribute("onmouseover", e.getAttribute("onmouseover"));
		c.setAttribute("onmouseout", e.getAttribute("onmouseout"));
		var d = "<img src=http://g.ehgt.org/hv050/img/e/";
		if (b.match(/health/i)) {
			d += "healthpot.png>"
		} else {
			if (b.match(/mana/i)) {
				d += "manapot.png>"
			} else {
				if (b.match(/spirit/i)) {
					d += "spiritpot.png>"
				} else {
					if (b.match(/mystic/i)) {
						d += "channeling.png>"
					} else {
						if (b.match(/fire/i)) {
							d += "spikes_flame.png>"
						} else {
							if (b.match(/frost/i)) {
								d += "spikes_frost.png>"
							} else {
								if (b.match(/storm/i)) {
									d += "spikes_storm.png>"
								} else {
									if (b.match(/shock/i)) {
										d += "spikes_lightning.png>"
									}
								}
							}
						}
					}
				}
			}
		}
		c.innerHTML = d
	}
	a.after(c)
}
function showMonsterStats() {
	if (!(_settings.isShowMonsterHP || _settings.isShowMonsterMP || _settings.isShowMonsterElements || _settings.isShowMonsterDuration)) {
		return
	}
	var a = new ElementalStats();
	$("#monsterpane > div").each(function (n) {
			var u = $(this);
			if (u != undefined && u.height() < 100) {
				var q = _round.monsters[_round.monsters.length - 1 - n];
				if (q == undefined) {
					return
				}
				var k = u.children().eq(1).children().eq(0);
				var s = k.children().length > 1;
				var e = u.children().eq(2).children().eq(0);
				var h = u.children().eq(2).children().eq(1);
				var m = e.html().match(/bardead/i);
				if ((_settings.isShowMonsterHP || _settings.isShowMonsterHPPercent) && !m) {
					var l = q.maxHp;
					var o = 0;
					var g = "";
					var b = e.children().eq(0).children("img").eq(1).width() / e.children().eq(0).children("img").eq(0).width();
					if (_settings.isShowMonsterHPPercent) {
						g = (b * 100).toFixed(2) + "%"
					} else {
						o = Math.floor(b * l);
						g = o + " / " + l
					}
					var r = "<div style='position:absolute;z-index:1074;top:-1px;font-size:8pt;font-family:arial,helvetica,sans-serif;font-weight:bolder;color:yellow;width:120px;text-align:center'>" + g + "</div>";
					e.after(r)
				}
				if (_settings.isShowMonsterMP && !m) {
					var v = h.children().eq(0).children("img").eq(1).width() / h.children().eq(0).children("img").eq(0).width();
					var f = (v * 100).toFixed(1);
					var j = "<div style='position:absolute;z-index:1074;top:11px;font-size:8pt;font-family:arial,helvetica,sans-serif;font-weight:bolder;color:yellow;width:120px;text-align:center'>" + f + "%</div>";
					h.after(j)
				}
				if (_settings.isShowMonsterElements && !m && q.id < 1000) {
					var t;
					getMonsterElementsById(a, q.id);
					var d = a.majWeak == "-" ? "" : "[<span style='color:#005826'>" + a.majWeak + "</span>";
					d += a.minWeak == "-" ? "" : ";<span style='color:#3CB878'>" + a.minWeak + "</span>";
					d += a.resist == "-" ? "" : ";<span style='color:red'>" + a.resist + "</span>";
					d += a.imperv == "-" ? "" : ";<span style='color:black'>" + a.imperv + "</span>";
					d += "]";
					if (s) {
						t = "<div style='cursor:default;position:relative;top:-2px;left:2px;padding:0 1px;margin-left:0px;white-space:nowrap'>" + d + "</span></div>";
						k.after(t)
					} else {
						t = "<div style='font-family:arial;font-size:7pt;font-style:normal;font-weight:bold;display:inline;cursor:default;padding:0 1px;margin-left:1px;white-space:nowrap'>" + d + "</span></div>";
						var p = k.children().eq(0);
						var c = p.html();
						p.html(c + t);
						p.css("white-space", "nowrap")
					}
				}
				if (_settings.isShowMonsterDuration) {
					showMonsterEffectsDuration(u)
				}
			}
		})
}
function showMonsterEffectsDuration(b) {
	var a = b.children().eq(3);
	a.children("img").each(createDurationBadge)
}
function showSelfEffectsDuration() {
	$(".btps img").each(createDurationBadge)
}
function createDurationBadge(a) {
	var e = $(this);
	var g,
	d;
	var c,
	f;
	d = e.outerHTML().match(/\s\d+?\)/);
	if (d != null) {
		g = d[0].replace(")", "").replace(" ", "")
	}
	if (g >= 0) {
		var h = e.parent().parent().parent().attr("id") == "monsterpane";
		c = h ? MON_EFF_TOP : SELF_EFF_TOP;
		f = (h ? MON_EFF_LEFT : SELF_EFF_LEFT) + FIRST_EFF * a;
		var b = "<div style='position:absolute;background-color:#EFEEDC;font-size:11px;font-weight:bold;font-family:arial,helvetica,sans-serif;line-height:12px;text-align:center;width:20px;height:12px;border-style:solid;border-width:1px;border-color:#5C0D11;overflow:hidden;top:" + c + "px;left:" + f + "px;cursor:default;'>" + g + "</div>";
		e.after(b)
	}
}
function showBattleEndStats() {
	var a = "<div class='ui-state-default ui-corner-bottom' style='padding:10px;margin-bottom:10px;text-align:left'>" + getBattleEndStatsHtml() + "</div>";
	$("#togpane_log").children().before(a)
}
function healthWarning() {
	var c = document.getElementsByTagName("img")[2];
	var e = document.getElementsByTagName("img")[3];
	var b = c.width / e.width;
	var d = localStorage.getItem(HV_ALERT);
	var f = (d == null) ? false : JSON.parse(d);
	var g = parseFloat(_settings.warnOrangeLevel / 100);
	var i = parseFloat(_settings.warnRedLevel / 100);
	var h = parseFloat(_settings.warnAlertLevel / 100);
	var a = h + 0.1;
	if ((b <= g) && _settings.isHighlightQC) {
		document.getElementById("quickbar").style.backgroundColor = b > i ? "orange" : "red"
	}
	if (!isBattleOver() && _settings.isShowPopup && (b <= h) && (!f || _settings.isNagHP)) {
		alert("Your health is dangerously low!");
		f = true;
		localStorage.setItem(HV_ALERT, JSON.stringify(f))
	}
	if (f && (b > a) && _settings.isShowPopup) {
		localStorage.removeItem(HV_ALERT)
	}
}
function collectCurrentProfsData() {
	if (!isCharacterPage() || isHVFontEngine()) {
		return
	}
	loadProfsObject();
	var c = $("#mainpane").children().eq(0).children().eq(1).children();
	var b;
	for (b = 0; b < _profs.weapProfTotals.length; b++) {
		_profs.weapProfTotals[b] = parseFloat(c.eq(0).children().eq(1).find(".fd12").eq(b * 2 + 1).text())
	}
	for (b = 0; b < _profs.armorProfTotals.length; b++) {
		_profs.armorProfTotals[b] = parseFloat(c.eq(1).children().eq(1).find(".fd12").eq(b * 2 + 1).text())
	}
	var a = c.eq(2).children().eq(1).find(".fd12");
	_profs.elemTotal = parseFloat(a.eq(1).text());
	_profs.divineTotal = parseFloat(a.eq(3).text());
	_profs.forbidTotal = parseFloat(a.eq(5).text());
	_profs.depTotal = parseFloat(a.eq(7).text());
	_profs.supportTotal = parseFloat(a.eq(9).text());
	_profs.curativeTotal = parseFloat(a.eq(11).text());
	_profs.save()
}
function showSidebarProfs() {
	loadProfsObject();
	if (!isProfTotalsRecorded()) {
		return
	}
	var b = $(".stuffbox").height() - 47;
	GM_addStyle(".prof_sidebar td {font-family:arial,helvetica,sans-serif; font-size:9pt; font-weight:normal; text-align:left}.prof_sidebar_top td {font-family:arial,helvetica,sans-serif; font-size:10pt; font-weight:bold; text-align:center}");
	var a = "<div id='_profbutton' class='ui-corner-all' style='position:absolute;top:" + b + "px;border:1px solid;margin-left:5px;padding:2px;width:132px;font-size:10pt;font-weight:bold;text-align:center;cursor:default;'>Proficiency</div>";
	$(".clb").append(a);
	$("#_profbutton").mouseover(function () {
			var c = document.getElementById("popup_box");
			var d = $("#_profbutton").offset();
			c.style.left = d.left + 145 + "px";
			c.style.top = d.top - 110 + "px";
			c.style.width = "314px";
			c.style.height = "110px";
			c.innerHTML = '<table class="prof_sidebar" cellspacing="0" cellpadding="0" style="width:100%"><tr class="prof_sidebar_top"><td colspan="2"><b>Weapon</b></td><td colspan="2"><b>Armor</b></td><td colspan="2"><b>Magic</b></td></tr><tr><td style="width:14%">1H:</td><td>' + _profs.weapProfTotals[0].toFixed(2) + '</td><td style="width:16%">Shield:</td><td>' + _profs.armorProfTotals[0].toFixed(2) + '</td><td style="width:24%">Elemental:</td><td>' + _profs.elemTotal.toFixed(2) + '</td></tr><tr><td style="width:14%">2H:</td><td>' + _profs.weapProfTotals[1].toFixed(2) + '</td><td style="width:16%">Cloth:</td><td>' + _profs.armorProfTotals[1].toFixed(2) + '</td><td style="width:24%">Divine:</td><td>' + _profs.divineTotal.toFixed(2) + '</td></tr><tr><td style="width:14%">DW:</td><td>' + _profs.weapProfTotals[2].toFixed(2) + '</td><td style="width:16%">Light:</td><td>' + _profs.armorProfTotals[2].toFixed(2) + '</td><td style="width:24%">Forbidden:</td><td>' + _profs.forbidTotal.toFixed(2) + '</td></tr><tr><td style="width:14%">Staff:</td><td>' + _profs.weapProfTotals[3].toFixed(2) + '</td><td style="width:16%">Heavy:</td><td>' + _profs.armorProfTotals[3].toFixed(2) + '</td><td style="width:24%">Deprecating:</td><td>' + _profs.depTotal.toFixed(2) + '</td></tr><tr><td></td><td></td><td></td><td></td><td style="width:24%">Supportive:</td><td>' + _profs.supportTotal.toFixed(2) + '</td></tr><tr><td></td><td></td><td></td><td></td><td style="width:24%">Curative:</td><td>' + _profs.curativeTotal.toFixed(2) + "</td></tr></table>";
			c.style.visibility = "visible"
		});
	$("#_profbutton").mouseout(function () {
			document.getElementById("popup_box").style.visibility = "hidden"
		})
}
function isProfTotalsRecorded() {
	loadProfsObject();
	return (_profs.weapProfTotals[0] > 0)
}
function inventoryWarning() {
	var d = 4;
	var c = $(".stuffbox").width() - 85 - 4;
	var a = document.createElement("div");
	var b = "<div class='ui-state-error ui-corner-all' style='position:absolute; top:" + d + "px; left: " + c + "px; z-index:1074'><span style='margin:3px' class='ui-icon ui-icon-alert' title='Inventory Limit Exceeded.'/></div>";
	$(a).html(b);
	$(a).addClass("_warningButton");
	$("body").append(a);
	$(a).css("cursor", "pointer");
	$("._warningButton").click(function () {
			if (confirm("Reached equipment inventory limit (1000). Clear warning?")) {
				deleteFromStorage(HV_EQUIP)
			}
		})
}
function collectRoundInfo() {
	var e = "";
	var a = 0;
	var c = "";
	var d;
	var b = false;
	loadRoundObject();
	if (_settings.isTrackItems) {
		loadDropsObject()
	}
	if (_settings.isTrackRewards) {
		loadRewardsObject()
	}
	$("#togpane_log td:first-child").each(function (j) {
			var g = $(this);
			var k = g.next().next();
			if (j == 0) {
				e = g.html()
			}
			c = k.html();
			if (!_round.isLoaded) {
				if (c.match(/HP=/)) {
					var h = new HVMonster();
					h.maxHp = parseInt(c.match(/HP=\d+(\.)?[0-9]?$/)[0].replace("HP=", ""));
					h.currHp = h.maxHp;
					h.id = parseInt(c.match(/MID=\d+?\s/)[0].replace("MID=", ""));
					h.name = c.match(/\([^)]+\)\s/i)[0].replace("(", "").replace(")", "");
					_round.monsters.push(h);
					if (_settings.isTrackItems) {
						_round.dropChances++
					}
				} else {
					if (c.match(/\(Round/)) {
						var f = c.match(/\(round.*?\)/i)[0].replace("(", "").replace(")", "");
						var m = f.split(" ");
						_round.currRound = parseInt(m[1]);
						if (m.length > 2) {
							_round.maxRound = parseInt(m[3])
						}
					}
				}
				if (_settings.isShowRoundReminder && (_round.maxRound >= _settings.reminderMinRounds) && (_round.currRound == _round.maxRound - 1) && !b) {
					alert("The final round is approaching.");
					b = true
				}
				if (c.match(/random encounter/)) {
					_round.battleType = HOURLY
				} else {
					if (c.match(/arena challenge/)) {
						_round.battleType = ARENA;
						_round.arenaNum = parseInt(c.match(/challenge #\d+?\s/i)[0].replace("challenge #", ""))
					} else {
						if (c.match(/Grindfest/)) {
							_round.battleType = GRINDFEST
						} else {
							if (c.match(/Item World/)) {
								_round.battleType = ITEM_WORLD
							}
						}
					}
				}
				_round.save()
			}
			if (g.html() != e) {
				return false
			}
			if (_settings.isAlertGem && c.match(/drops a (.*) Gem/)) {
				alert("You picked up a " + RegExp.$1 + " Gem.")
			}
			if (_settings.isWarnSparkTrigger && c.match(/spark of life.*defeat/ig)) {
				alert("Spark of Life has triggered!!")
			}
			if (_settings.isWarnSparkExpire && c.match(/spark of life.*expired/ig)) {
				alert("Spark of Life has expired!!")
			}
			if (_settings.isShowSidebarProfs && c.match(/0.0(\d+) points of (.*?) proficiency/ig)) {
				var p = (RegExp.$1) / 100;
				var r = RegExp.$2;
				loadProfsObject();
				if (r.match(/one-handed weapon/)) {
					_profs.weapProfTotals[0] += p
				} else {
					if (r.match(/two-handed weapon/)) {
						_profs.weapProfTotals[1] += p
					} else {
						if (r.match(/dual wielding/)) {
							_profs.weapProfTotals[2] += p
						} else {
							if (r.match(/staff/)) {
								_profs.weapProfTotals[3] += p
							} else {
								if (r.match(/shield/)) {
									_profs.armorProfTotals[0] += p
								} else {
									if (r.match(/cloth armor/)) {
										_profs.armorProfTotals[1] += p
									} else {
										if (r.match(/light armor/)) {
											_profs.armorProfTotals[2] += p
										} else {
											if (r.match(/heavy armor/)) {
												_profs.armorProfTotals[3] += p
											} else {
												if (r.match(/elemental magic/)) {
													_profs.elemTotal += p
												} else {
													if (r.match(/divine magic/)) {
														_profs.divineTotal += p
													} else {
														if (r.match(/forbidden magic/)) {
															_profs.forbidTotal += p
														} else {
															if (r.match(/deprecating magic/)) {
																_profs.depTotal += p
															} else {
																if (r.match(/supportive magic/)) {
																	_profs.supportTotal += p
																} else {
																	if (r.match(/curative magic/)) {
																		_profs.curativeTotal += p
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
				_profs.save()
			}
			if (_settings.isTrackStats || _settings.isShowEndStats) {
				var o = 0;
				if (c.match(/\s(\d+)\s/)) {
					o = parseInt(RegExp.$1)
				}
				if (c.match(/has been defeated/i)) {
					_round.kills++
				} else {
					if (c.match(/bleeding wound hits/i)) {
						_round.dDealt[2] += o
					} else {
						if (c.match(/interference/i)) {
							_round.sAttempts++;
							_round.sInterfs++
						} else {
							if (c.match(/(you hit)|(you crit)/i)) {
								_round.aAttempts++;
								a++;
								_round.aHits[c.match(/you crit/i) ? 1 : 0]++;
								_round.dDealt[c.match(/you crit/i) ? 1 : 0] += o
							} else {
								if (c.match(/your offhand hits/i)) {
									_round.aOffhands[0]++;
									_round.aOffhands[1] += o
								} else {
									if (c.match(/you counter/i)) {
										_round.aCounters[0]++;
										_round.aCounters[1] += o;
										_round.dDealt[0] += o
									} else {
										if (c.match(/hits|blasts|explodes/i) && !c.match(/hits you /i) && !c.match(/(spike shield)|(searing skin)|(burning soul) hits/i)) {
											_round.dDealtSp[c.match(/blasts/i) ? 1 : 0] += o;
											_round.sHits[c.match(/blasts/i) ? 1 : 0]++
										} else {
											if (c.match(/(hits you )|(crits you )/i)) {
												_round.mAttempts++;
												_round.mHits[c.match(/crits/i) ? 1 : 0]++;
												_round.dTaken[c.match(/crits/i) ? 1 : 0] += o
											} else {
												if (c.match(/you (dodge|evade|block|parry|resist)|(misses.*?against you)/i)) {
													_round.mAttempts++;
													if (c.match(/dodge|(misses.*?against you)/)) {
														_round.pDodges++
													} else {
														if (c.match(/evade/)) {
															_round.pEvades++
														} else {
															if (c.match(/block/)) {
																_round.pBlocks++
															} else {
																if (c.match(/parry/)) {
																	_round.pParries++
																} else {
																	if (c.match(/resist/)) {
																		_round.pResists++
																	}
																}
															}
														}
													}
												} else {
													if (c.match(/casts?/)) {
														if (c.match(/casts/)) {
															_round.mAttempts++;
															_round.mSpells++
														} else {
															if (c.match(/you cast/i) && !c.match(/you cast (cure|regen|spark of life|absorb|barrier|shield|shadow veil|haste|spikes|arcane|heart)/i)) {
																_round.sAttempts++
															} else {
																if (c.match(/you cast absorb/i)) {
																	_round.absArry[0]++
																} else {
																	if (c.match(/you cast cure/i)) {
																		_round.cureTotals[c.match(/cure\./i) ? 0 : c.match(/cure ii\./i) ? 1 : 2] += d;
																		_round.cureCounts[c.match(/cure\./i) ? 0 : c.match(/cure ii\./i) ? 1 : 2]++
																	}
																}
															}
														}
													} else {
														if (c.match(/The hostile spell is drained. You gain (\d+) Magic Points/)) {
															_round.absArry[1]++;
															_round.absArry[2] += parseInt(RegExp.$1)
														} else {
															if (c.match(/You are healed for (\d+) Health Points/)) {
																d = parseInt(RegExp.$1)
															} else {
																if (c.match(/Your attack misses its mark/)) {
																	_round.aAttempts++
																} else {
																	if (c.match(/Your spell misses its mark/)) {
																		_round.sResists++
																	} else {
																		if (c.match(/gain the effect Overwhelming Strikes/i)) {
																			_round.overStrikes++
																		} else {
																			if (c.match(/gains the effect Coalesced Mana/i)) {
																				_round.coalesce++
																			} else {
																				if (c.match(/gains the effect Ether Theft/i)) {
																					_round.eTheft++
																				} else {
																					if (c.match(/gain the effect Channeling/i)) {
																						_round.channel++
																					} else {
																						if (c.match(/use Mystic Gem/i)) {
																							_round.channel--
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			var l = /\[.*?\]/i;
			var n;
			var t = 1;
			if (c.match(/dropped.*?color:.*?red.*?\[.*?\]/ig)) {
				_equips++;
				var q = c.match(l)[0];
				_lastEquipName = q;
				if (_settings.isTrackItems) {
					_drops.eqDrop++;
					_drops.eqArray.push(q)
				}
			} else {
				if (c.match(/dropped.*?color:.*?blue.*?\[.*?\]/ig)) {
					_artifacts++;
					itemToAdd = c.match(l)[0];
					_lastArtName = itemToAdd;
					if (_settings.isTrackItems) {
						_drops.artDrop++;
						n = true;
						for (var j = 0; j < _drops.artArry.length; j++) {
							if (itemToAdd == _drops.artArry[j]) {
								_drops.artQtyArry[j]++;
								n = false;
								break
							}
						}
						if (n) {
							_drops.artQtyArry.push(1);
							_drops.artArry.push(itemToAdd)
						}
					}
				} else {
					if (_settings.isTrackItems && (c.match(/dropped.*?color:.*?green.*?\[.*?\]/ig) || c.match(/dropped.*?token/ig))) {
						itemToAdd = c.match(l)[0];
						if (itemToAdd.match(/(\d)x Crystal/ig)) {
							t = parseInt(RegExp.$1);
							itemToAdd = itemToAdd.replace(/\dx /, "")
						}
						for (var j = 0; j < _drops.itemArry.length; j++) {
							if (itemToAdd == _drops.itemArry[j]) {
								_drops.itemQtyArry[j] += t;
								_drops.itemDrop++;
								break
							}
						}
					} else {
						if (_settings.isTrackItems && c.match(/dropped.*?color:.*?\#461B7E.*?\[.*?\]/ig)) {
							_drops.dropChances--
						}
					}
				}
			}
			if (c.match(/(clear bonus).*?color:.*?red.*?\[.*?\]/ig)) {
				_equips++;
				var s = c.match(l)[0];
				_lastEquipName = s;
				if (_settings.isTrackRewards) {
					_rewards.eqRwrd++;
					_rewards.eqRwrdArry.push(s)
				}
			} else {
				if (c.match(/(clear bonus).*?color:.*?blue.*?\[.*?\]/ig)) {
					_artifacts++;
					itemToAdd = c.match(l)[0];
					_lastArtName = itemToAdd;
					if (_settings.isTrackRewards) {
						_rewards.artRwrd++;
						n = true;
						for (var j = 0; j < _rewards.artRwrdArry.length; j++) {
							if (itemToAdd == _rewards.artRwrdArry[j]) {
								_rewards.artRwrdQtyArry[j]++;
								n = false;
								break
							}
						}
						if (n) {
							_rewards.artRwrdQtyArry.push(1);
							_rewards.artRwrdArry.push(itemToAdd)
						}
					}
				} else {
					if (_settings.isTrackRewards && (c.match(/(clear bonus).*?color:.*?green.*?\[.*?\]/ig) || c.match(/(clear bonus).*?token/ig))) {
						_rewards.itemsRwrd++;
						itemToAdd = c.match(l)[0];
						if (itemToAdd.match(/(\d)x Crystal/ig)) {
							t = parseInt(RegExp.$1);
							itemToAdd = itemToAdd.replace(/\dx /, "")
						}
						n = true;
						for (var j = 0; j < _rewards.itemRwrdArry.length; j++) {
							if (itemToAdd == _rewards.itemRwrdArry[j]) {
								_rewards.itemRwrdQtyArry[j] += t;
								n = false;
								break
							}
						}
						if (n) {
							_rewards.itemRwrdQtyArry.push(1);
							_rewards.itemRwrdArry.push(itemToAdd)
						}
					} else {
						if (_settings.isTrackRewards && (c.match(/(token bonus).*?\[.*?\]/ig))) {
							if (c.match(/token of blood/ig)) {
								_tokenDrops[0]++
							} else {
								if (c.match(/token of healing/ig)) {
									_tokenDrops[1]++
								} else {
									if (c.match(/chaos token/ig)) {
										_tokenDrops[2]++
									}
								}
							}
						}
					}
				}
			}
			if (c.match(/reached equipment inventory limit/i)) {
				localStorage.setItem(HV_EQUIP, JSON.stringify("true"))
			}
		});
	if (a > 1) {
		_round.aDomino[0]++;
		_round.aDomino[1] += a;
		_round.aDomino[a]++
	}
	if (e > _round.lastTurn) {
		_round.lastTurn = e
	}
	_round.save()
}
function saveStats() {
	if (!SAVE_STATS) {
		return
	}
	loadOverviewObject();
	loadStatsObject();
	loadRewardsObject();
	loadDropsObject();
	var d = 0;
	var c = 0;
	$("#togpane_log td:last-child").each(function () {
			var f = $(this);
			var e = f.html();
			if (e.match(/you gain.*?credit/i)) {
				c = parseInt(e.split(" ")[2]);
				return true
			} else {
				if (e.match(/you gain.*?exp/i)) {
					d = parseFloat(e.split(" ")[2]);
					return true
				}
			}
			if (d > 0 && c > 0) {
				return false
			}
		});
	var b = new Date();
	var a = b.getTime();
	if (_overview.startTime == 0) {
		_overview.startTime = a
	}
	if (_round.battleType == HOURLY) {
		_overview.lastHourlyTime = a
	}
	_overview.exp += d;
	_overview.credits += c;
	if (_equips > 0) {
		_overview.lastEquipTime = a;
		_overview.lastEquipName = _lastEquipName;
		_overview.equips += _equips
	}
	if (_artifacts > 0) {
		_overview.lastArtTime = a;
		_overview.lastArtName = _lastArtName;
		_overview.artifacts += _artifacts
	}
	if (d > 0) {
		_overview.roundArray[_round.battleType]++;
		_drops.dropChances += _round.dropChances
	}
	if (_settings.isTrackStats) {
		_stats.kills += _round.kills;
		_stats.aAttempts += _round.aAttempts;
		_stats.aHits[0] += _round.aHits[0];
		_stats.aHits[1] += _round.aHits[1];
		_stats.aOffhands[0] += _round.aOffhands[0];
		_stats.aOffhands[1] += _round.aOffhands[1];
		_stats.sAttempts += _round.sAttempts;
		_stats.sHits[0] += _round.sHits[0];
		_stats.sHits[1] += _round.sHits[1];
		_stats.sInterfs += _round.sInterfs;
		_stats.mAttempts += _round.mAttempts;
		_stats.mHits[0] += _round.mHits[0];
		_stats.mHits[1] += _round.mHits[1];
		_stats.pDodges += _round.pDodges;
		_stats.pEvades += _round.pEvades;
		_stats.pParries += _round.pParries;
		_stats.pBlocks += _round.pBlocks;
		_stats.dDealt[0] += _round.dDealt[0];
		_stats.dDealt[1] += _round.dDealt[1];
		_stats.dDealt[2] += _round.dDealt[2];
		_stats.dTaken[0] += _round.dTaken[0];
		_stats.dTaken[1] += _round.dTaken[1];
		_stats.dDealtSp[0] += _round.dDealtSp[0];
		_stats.dDealtSp[1] += _round.dDealtSp[1];
		_stats.rounds += 1;
		_stats.absArry[0] += _round.absArry[0];
		_stats.absArry[1] += _round.absArry[1];
		_stats.absArry[2] += _round.absArry[2];
		_stats.coalesce += _round.coalesce;
		_stats.eTheft += _round.eTheft;
		_stats.channel += _round.channel;
		_stats.aDomino[0] += _round.aDomino[0];
		_stats.aDomino[1] += _round.aDomino[1];
		_stats.aDomino[2] += _round.aDomino[2];
		_stats.aDomino[3] += _round.aDomino[3];
		_stats.aDomino[4] += _round.aDomino[4];
		_stats.aDomino[5] += _round.aDomino[5];
		_stats.overStrikes += _round.overStrikes;
		_stats.aCounters[0] += _round.aCounters[0];
		_stats.aCounters[1] += _round.aCounters[1];
		_stats.pResists += _round.pResists;
		_stats.mSpells += _round.mSpells;
		_stats.sResists += _round.sResists;
		_stats.cureTotals[0] += _round.cureTotals[0];
		_stats.cureTotals[1] += _round.cureTotals[1];
		_stats.cureTotals[2] += _round.cureTotals[2];
		_stats.cureCounts[0] += _round.cureCounts[0];
		_stats.cureCounts[1] += _round.cureCounts[1];
		_stats.cureCounts[2] += _round.cureCounts[2]
	}
	_rewards.tokenDrops[0] += _tokenDrops[0];
	_rewards.tokenDrops[1] += _tokenDrops[1];
	_rewards.tokenDrops[2] += _tokenDrops[2];
	_overview.save();
	_stats.save();
	_rewards.save();
	_drops.save()
}
function getBattleEndStatsHtml() {
	var d = _round.aHits[0] + _round.aHits[1];
	var c = _round.sHits[0] + _round.sHits[1];
	var b = _round.mHits[0] + _round.mHits[1];
	var a = "<b>Accuracy</b>: " + d + "/" + _round.aAttempts + " (" + (_round.aAttempts == 0 ? 0 : (d / _round.aAttempts * 100).toFixed(2)) + "%), <b>Crits</b>: " + _round.aHits[1] + "/" + d + " (" + (d == 0 ? 0 : (_round.aHits[1] / d * 100).toFixed(2)) + "%), <b>Offhand</b>: " + _round.aOffhands[0] + "/" + d + " (" + (d == 0 ? 0 : (_round.aOffhands[0] / d * 100).toFixed(2)) + "%), <b>Domino</b>: " + _round.aDomino[0] + "/" + d + " (" + (d == 0 ? 0 : (_round.aDomino[0] / d * 100).toFixed(2)) + "%), <b>OverStrikes</b>: " + _round.overStrikes + "/" + d + " (" + (d == 0 ? 0 : (_round.overStrikes / d * 100).toFixed(2)) + "%), <b>Coalesce</b>: " + _round.coalesce + "/" + c + " (" + (c == 0 ? 0 : (_round.coalesce / c * 100).toFixed(2)) + "%), <b>Interference</b>: " + _round.sInterfs + "/" + _round.sAttempts + " (" + (_round.sAttempts == 0 ? 0 : (_round.sInterfs / _round.sAttempts * 100).toFixed(2)) + "%), <b>Resists</b>: " + _round.sResists + "/" + c + " (" + (c == 0 ? 0 : (_round.sResists / c * 100).toFixed(2)) + "%), <b>Spell Crits</b>: " + _round.sHits[1] + "/" + c + " (" + (c == 0 ? 0 : (_round.sHits[1] / c * 100).toFixed(2)) + "%), <b>Avg hit dmg</b>: " + (_round.aHits[0] == 0 ? 0 : (_round.dDealt[0] / _round.aHits[0]).toFixed(2)) + "|" + (_round.sHits[0] == 0 ? 0 : (_round.dDealtSp[0] / _round.sHits[0]).toFixed(2)) + ", <b>Avg crit dmg</b>: " + (_round.aHits[1] == 0 ? 0 : (_round.dDealt[1] / _round.aHits[1]).toFixed(2)) + "|" + (_round.sHits[1] == 0 ? 0 : (_round.dDealtSp[1] / _round.sHits[1]).toFixed(2)) + ", <b>Avg dmg</b>: " + (d == 0 ? 0 : ((_round.dDealt[0] + _round.dDealt[1]) / d).toFixed(2)) + "|" + (c == 0 ? 0 : ((_round.dDealtSp[0] + _round.dDealtSp[1]) / c).toFixed(2)) + "<hr style='height:1px;border:0;background-color:#333333;color:#333333' /><b>Hits taken</b>: " + b + "/" + _round.mAttempts + " (" + (_round.mAttempts == 0 ? 0 : (b / _round.mAttempts * 100).toFixed(2)) + "%), <b>Missed</b>: " + _round.pDodges + "/" + _round.mAttempts + " (" + (_round.mAttempts == 0 ? 0 : (_round.pDodges / _round.mAttempts * 100).toFixed(2)) + "%), <b>Evaded</b>: " + _round.pEvades + "/" + _round.mAttempts + " (" + (_round.mAttempts == 0 ? 0 : (_round.pEvades / _round.mAttempts * 100).toFixed(2)) + "%), <b>Blocked</b>: " + _round.pBlocks + "/" + _round.mAttempts + " (" + (_round.mAttempts == 0 ? 0 : (_round.pBlocks / _round.mAttempts * 100).toFixed(2)) + "%), <b>Parried</b>: " + _round.pParries + "/" + _round.mAttempts + " (" + (_round.mAttempts == 0 ? 0 : (_round.pParries / _round.mAttempts * 100).toFixed(2)) + "%), <b>Resisted</b>: " + _round.pResists + "/" + _round.mSpells + " (" + (_round.mSpells == 0 ? 0 : (_round.pResists / _round.mSpells * 100).toFixed(2)) + "%), <b>Crits taken</b>: " + _round.mHits[1] + "/" + b + " (" + (b == 0 ? 0 : (_round.mHits[1] / b * 100).toFixed(2)) + "%), <b>Total taken</b>: " + (_round.dTaken[0] + _round.dTaken[1]) + ", <b>Avg taken</b>: " + (b == 0 ? 0 : ((_round.dTaken[0] + _round.dTaken[1]) / b).toFixed(2));
	return a
}
function getReportOverviewHtml() {
	var a = '<span style="color:green"><b>ON</b></span>';
	var w = '<span style="color:red"><b>OFF</b></span>';
	var q = '<span style="color:orange"><b>PAUSED</b></span>';
	var N = "<b> | </b>";
	var I = '<span style="color:red"><b>--</b></span>';
	var B = a;
	var l = w;
	var A = w;
	var u = "";
	var i = "";
	var C = "";
	var j = "";
	var y = "";
	var m = _settings.isColumnInventory ? a : w;
	var p = _settings.isHideHVLogo ? a : w;
	var b = _settings.isShowSidebarProfs ? a : w;
	var o = _settings.isShowRoundReminder ? a : w;
	var h = _settings.isShowHighlight ? a : w;
	var n = _settings.isShowDivider ? a : w;
	var D = _settings.isShowSelfDuration ? a : w;
	var G = _settings.isShowEndStats ? a : w;
	var J = _settings.isAlertGem ? a : w;
	y = _settings.isShowMonsterHP ? '<span style="color:green"><b>HP</b></span>' : I;
	y += N;
	y += _settings.isShowMonsterMP ? '<span style="color:green"><b>MP</b></span>' : I;
	y += N;
	y += _settings.isShowMonsterElements ? '<span style="color:green"><b>Resistance</b></span>' : I;
	y += N;
	y += _settings.isShowMonsterDuration ? '<span style="color:green"><b>Duration</b></span>' : I;
	B = _settings.isTrackStats ? a : _stats.isLoaded && _stats.rounds > 0 ? q : w;
	A = _settings.isTrackItems ? a : _drops.isLoaded && _drops.dropChances > 0 ? q : w;
	l = _settings.isTrackRewards ? a : _rewards.isLoaded && _rewards.totalRwrds > 0 ? q : w;
	Shrine = _settings.isTrackShrine ? a : _shrine.isLoaded && _shrine.totalRewards > 0 ? q : w;
	u = _settings.isWarnSparkTrigger ? '<span style="color:green"><b>Trig</b></span>' : I;
	u += N;
	u += _settings.isWarnSparkExpire ? '<span style="color:green"><b>Exp</b></span>' : I;
	if (_settings.isHighlightQC) {
		C = '<span style="color:Orange"><b>' + _settings.warnOrangeLevel + '% HP</span>; <span style="color:Red">' + _settings.warnRedLevel + "% HP</b></span>"
	} else {
		C = w
	}
	if (_settings.isShowPopup) {
		j = '<span style="color:green"><b>' + _settings.warnAlertLevel + "% HP</b></span>" + (_settings.isNagHP ? " <b>(Nag)</b>" : "")
	} else {
		j = w
	}
	i = _settings.warnMode[0] ? '<span style="color:green"><b>Ho</b></span>' : I;
	i += N;
	i += _settings.warnMode[1] ? '<span style="color:green"><b>Ar</b></span>' : I;
	i += N;
	i += _settings.warnMode[2] ? '<span style="color:green"><b>GF</b></span>' : I;
	i += N;
	i += _settings.warnMode[3] ? '<span style="color:green"><b>IW</b></span>' : I;
	var x = '<table class="_UI" cellspacing="0" cellpadding="2" style="width:100%"><tr><td colspan="3">No data found. Complete a round to begin tracking.</td></tr></table>';
	if (_overview.isLoaded && _overview.totalRounds > 0) {
		var f = new Date();
		f.setTime(_overview.startTime);
		var r = new Date();
		var k = r.getTime();
		var d = ((k - _overview.startTime) / (60 * 60 * 1000));
		var E = "";
		var v = (60 * d).toFixed();
		var K = Math.floor(v / (60 * 24));
		var M = v / (60 * 24);
		if (d < 1) {
			E = v + " mins"
		} else {
			if (d < 24) {
				E = Math.floor(v / 60) + " hours, " + (v % 60).toFixed() + " mins"
			} else {
				E = K + " days, " + Math.floor((v / 60) - (K * 24)) + " hours, " + (v % 60).toFixed() + " mins"
			}
		}
		var e = f.toLocaleString();
		var z = r.toLocaleString();
		if (browserIsChrome()) {
			e = f.toLocaleDateString() + " " + f.toLocaleTimeString();
			z = r.toLocaleDateString() + " " + r.toLocaleTimeString()
		}
		var c;
		if (_overview.lastHourlyTime == 0) {
			c = "Never"
		} else {
			c = new Date();
			c.setTime(_overview.lastHourlyTime);
			c = c.toLocaleTimeString()
		}
		var F = 0;
		var g = "none yet!";
		var L = "N/A";
		if (_overview.equips > 0) {
			F = (_overview.totalRounds / _overview.equips).toFixed();
			g = _overview.lastEquipName;
			L = getRelativeTime(_overview.lastEquipTime)
		}
		var t = 0;
		var s = "none yet!";
		var H = "N/A";
		if (_overview.artifacts > 0) {
			t = (_overview.totalRounds / _overview.artifacts).toFixed();
			s = _overview.lastArtName;
			H = getRelativeTime(_overview.lastArtTime)
		}
		x = '<table class="_UI" cellspacing="0" cellpadding="2" style="width:100%"><tr><td colspan="2"><b>Reporting period:</b> ' + e + " to " + z + '</td></tr><tr><td colspan="2" style="padding-left:10px">Total time: ' + E + '</td></tr><tr><td colspan="2"><b>Rounds completed:</b> ' + _overview.totalRounds + " (" + (M == 0 ? 0 : (_overview.totalRounds / M).toFixed()) + ' rounds per day)</td></tr><tr><td colspan="2" style="padding-left:10px">Hourly encounters: ' + _overview.roundArray[0] + " (" + (_overview.roundArray[0] / _overview.totalRounds * 100).toFixed(2) + "% of total; " + (M == 0 ? 0 : (_overview.roundArray[0] / M).toFixed()) + " rounds per day); Last Hourly: " + c + '</td></tr><tr><td colspan="2" style="padding-left:10px">Arena: ' + _overview.roundArray[1] + " (" + (_overview.roundArray[1] / _overview.totalRounds * 100).toFixed(2) + '% of total)</td></tr><tr><td colspan="2" style="padding-left:10px">Grindfest: ' + _overview.roundArray[2] + " (" + (_overview.roundArray[2] / _overview.totalRounds * 100).toFixed(2) + "% of total; " + (M == 0 ? 0 : (_overview.roundArray[2] / M).toFixed()) + ' rounds per day)</td></tr><tr><td colspan="2" style="padding-left:10px">Item World: ' + _overview.roundArray[3] + " (" + (_overview.roundArray[3] / _overview.totalRounds * 100).toFixed(2) + "% of total; " + (M == 0 ? 0 : (_overview.roundArray[3] / M).toFixed()) + " rounds per day)</td></tr><tr><td><b>Total EXP gained:</b> " + _overview.exp.toFixed(2) + "</td><td><b>Total Credits gained:</b> " + (_overview.credits).toFixed() + '</td></tr><tr><td style="padding-left:10px">EXP per round: ' + (_overview.exp / _overview.totalRounds).toFixed(2) + '</td><td style="padding-left:10px">Credits per round: ' + (_overview.credits / _overview.totalRounds).toFixed(2) + '</td></tr><tr><td style="padding-left:10px">EXP per hour: ' + (_overview.exp / d).toFixed(2) + '</td><td style="padding-left:10px">Credits per hour: ' + (_overview.credits / d).toFixed(2) + '</td></tr><tr><td style="padding-left:10px">EXP per day: ' + (M == 0 ? 0 : (_overview.exp / M).toFixed(2)) + '</td><td style="padding-left:10px">Credits per day: ' + (M == 0 ? 0 : (_overview.credits / M).toFixed(2)) + '</td></tr><tr><td colspan="2"><b>Total Equipment found:</b> ' + _overview.equips + " pieces (" + F + ' rounds per equip)</td></tr><tr><td colspan="2" style="padding-left:10px">Last found: <span style="color:red">' + g + "</span> (" + L + ')</td></tr><tr><td colspan="2"><b>Total Artifacts found:</b> ' + _overview.artifacts + " pieces (" + t + ' rounds per artifact)</td></tr><tr><td colspan="2" style="padding-left:10px">Last found: <span style="color:blue">' + s + "</span> (" + H + ")</td></tr></table>"
	}
	x += '<table class="_UI" cellspacing="0" cellpadding="2" style="width:100%"><tr><td>&nbsp;</td></tr><tr><td style="width:33%"><b>General Options:</b></td><td style="width:34%"><b>Battle Enhancement:</b></td><td style="width:33%"><b>Tracking Status:</b></td></tr><tr><td style="padding-left:10px;width:33%">HP Warning:</td><td style="padding-left:10px;width:34%">Log Highlighting: ' + h + '</td><td style="padding-left:10px;width:33%">Battle Stats: ' + B + '</td></tr><tr><td style="padding-left:20px;width:33%">Spark Warning: ' + u + '</td><td style="padding-left:10px;width:34%">Turn Divider: ' + n + '</td><td style="padding-left:10px;width:33%">Item Drops: ' + A + '</td></tr><tr><td style="padding-left:20px;width:33%">Highlight QC: ' + C + '</td><td style="padding-left:10px;width:34%">Status Effect Duration: ' + D + '</td><td style="padding-left:10px;width:33%">Arena Rewards: ' + l + '</td></tr><tr><td style="padding-left:20px;width:33%">Popup: ' + j + '</td><td style="padding-left:10px;width:34%">Monster Stats:</td><td style="padding-left:10px;width:33%">Shrine: ' + Shrine + '</td></tr><tr><td style="padding-left:20px;width:33%">Battle Type: ' + i + '</td><td style="padding-left:20px;width:34%">' + y + '</td><td style="padding-left:10px;width:33%"></td></tr><tr><td style="padding-left:10px;width:33%">Proficiency Table: ' + b + '</td><td style="padding-left:10px;width:34%">Battle Summary: ' + G + '</td><td style="padding-left:10px;width:33%"></td></tr><tr><td style="padding-left:10px;width:33%">Column Inventory: ' + m + '</td><td style="padding-left:10px;width:34%">Round Reminder: ' + o + '</td><td></td></tr><tr><td style="padding-left:10px;width:33%">Hide HV Logo: ' + p + '</td><td style="padding-left:10px;width:34%">Powerup Alerts: ' + J + "</td><td></td></tr></table>";
	if (_overview.isLoaded && _overview.totalRounds > 0) {
		x += '<table class="_UI" cellspacing="0" cellpadding="2" style="width:100%"><tr><td align="right" colspan="3"><input type="button" class="_resetOverview" value="Reset Overview" /></td></tr></table>'
	}
	return x
}
function getReportStatsHtml() {
	var c = "No data found. Complete a round to begin tracking.";
	if (_stats.isLoaded && _stats.rounds > 0) {
		if (_settings.isTrackStats) {
			c = '<table class="_UI" cellspacing="0" cellpadding="2" style="width:100%">'
		} else {
			c = '<table class="_UI" cellspacing="0" cellpadding="2" style="width:100%"><tr><td align="center" colspan="2"><div align="center" class="ui-state-error ui-corner-all" style="padding:4px;margin:4px"><span class="ui-icon ui-icon-pause"></span><b>TRACKING PAUSED</b></div></td></tr>'
		}
		var f = _stats.aHits[0] + _stats.aHits[1];
		var e = _stats.sHits[0] + _stats.sHits[1];
		var d = _stats.mHits[0] + _stats.mHits[1];
		var b = _stats.dDealt[0] + _stats.dDealt[1] + _stats.dDealt[2];
		var a = _stats.dDealt[0] + _stats.dDealt[1];
		c += '<tr><td colspan="2"><b>Rounds tracked:</b> ' + _stats.rounds + '</td></tr><tr><td colspan="2"><b>Monsters killed:</b> ' + _stats.kills + '</td></tr><tr><td colspan="2"><b>Offensive Statistics:</b></td></tr><tr><td style="padding-left:10px"><b>Physical:</b></td><td style="padding-left:10px"><b>Magical:</b></td></tr><tr><td style="padding-left:20px">Accuracy: ' + (_stats.aAttempts == 0 ? 0 : (f / _stats.aAttempts * 100).toFixed(2)) + '%</td><td style="padding-left:20px">Interference: ' + (_stats.sAttempts == 0 ? 0 : (_stats.sInterfs / _stats.sAttempts * 100).toFixed(2)) + '%</td></tr><tr><td style="padding-left:20px">Crit chance: ' + (f == 0 ? 0 : (_stats.aHits[1] / f * 100).toFixed(2)) + '%</td><td style="padding-left:20px">Resistance: ' + (e == 0 ? 0 : (_stats.sResists / e * 100).toFixed(2)) + '%</td></tr><tr><td style="padding-left:20px">Overwhelming Strikes chance: ' + (f == 0 ? 0 : (_stats.overStrikes / f * 100).toFixed(2)) + '%</td><td style="padding-left:20px">Crit chance: ' + (e == 0 ? 0 : (_stats.sHits[1] / e * 100).toFixed(2)) + '%</td></tr><tr><td style="padding-left:20px">Average Counter damage: ' + (_stats.aCounters[0] == 0 ? 0 : (_stats.aCounters[1] / _stats.aCounters[0]).toFixed(2)) + '</td><td style="padding-left:20px">Coalesced Mana chance: ' + (e == 0 ? 0 : (_stats.coalesce / e * 100).toFixed(2)) + '%</td></tr><tr><td style="padding-left:20px">Offhand Strike chance: ' + (f == 0 ? 0 : (_stats.aOffhands[0] / f * 100).toFixed(2)) + '%</td><td style="padding-left:30px">Channeling chance: ' + (_stats.eTheft == 0 ? 0 : (_stats.channel / _stats.eTheft * 100).toFixed(2)) + '%</td></tr><tr><td colspan="2" style="padding-left:30px">Average Offhand damage: ' + (_stats.aOffhands[0] == 0 ? 0 : (_stats.aOffhands[1] / _stats.aOffhands[0]).toFixed(2)) + '</td></tr><tr><td colspan="2" style="padding-left:20px">Domino Strike chance: ' + (f == 0 ? 0 : (_stats.aDomino[0] / f * 100).toFixed(2)) + '%</td></tr><tr><td style="padding-left:20px">Average damage dealt per hit: ' + (_stats.aHits[0] == 0 ? 0 : (_stats.dDealt[0] / _stats.aHits[0]).toFixed(2)) + '</td><td style="padding-left:20px">Average damage dealt per spell: ' + (_stats.sHits[0] == 0 ? 0 : (_stats.dDealtSp[0] / _stats.sHits[0]).toFixed(2)) + '</td></tr><tr><td style="padding-left:20px">Average damage dealt per crit: ' + (_stats.aHits[1] == 0 ? 0 : (_stats.dDealt[1] / _stats.aHits[1]).toFixed(2)) + '</td><td style="padding-left:20px">Average damage dealt per spell crit: ' + (_stats.sHits[1] == 0 ? 0 : (_stats.dDealtSp[1] / _stats.sHits[1]).toFixed(2)) + '</td></tr><tr><td style="padding-left:20px">Average damage dealt:</td><td style="padding-left:20px">Average spell damage dealt: ' + (e == 0 ? 0 : ((_stats.dDealtSp[0] + _stats.dDealtSp[1]) / e).toFixed(2)) + '</td></tr><tr><td colspan="2" style="padding-left:30px">Without Bleeding Wound: ' + (f == 0 ? 0 : (a / f).toFixed(2)) + '</td><tr><td colspan="2" style="padding-left:30px">With Bleeding Wound: ' + (f == 0 ? 0 : (b / f).toFixed(2)) + '</td></tr><tr><td colspan="2" style="padding-left:30px">Percent total damage from Bleeding Wound: ' + (b == 0 ? 0 : (_stats.dDealt[2] / b * 100).toFixed(2)) + '%</td></tr><tr><td colspan="2" style="padding-left:30px">Percent change in average damage: ' + (a == 0 ? 0 : (Math.abs(((b / f) - (a / f))) / Math.abs(a / f) * 100).toFixed(2)) + '%</td></tr><tr><td colspan="2"><b>Defensive Statistics:</b></td></tr><tr><td style="padding-left:10px">Overall chance of getting hit: ' + (_stats.mAttempts == 0 ? 0 : (d / _stats.mAttempts * 100).toFixed(2)) + '%</td><td style="padding-left:10px">Average HP restored by Cure:</td></tr><tr><td style="padding-left:20px">Miss chance: ' + (_stats.mAttempts == 0 ? 0 : (_stats.pDodges / _stats.mAttempts * 100).toFixed(2)) + '%</td><td style="padding-left:20px">Cure: ' + (_stats.cureCounts[0] == 0 ? 0 : (_stats.cureTotals[0] / _stats.cureCounts[0]).toFixed(2)) + ' HP/cast</td></tr><tr><td style="padding-left:20px">Evade chance: ' + (_stats.mAttempts == 0 ? 0 : (_stats.pEvades / _stats.mAttempts * 100).toFixed(2)) + '%</td><td style="padding-left:20px">Cure II: ' + (_stats.cureCounts[1] == 0 ? 0 : (_stats.cureTotals[1] / _stats.cureCounts[1]).toFixed(2)) + ' HP/cast</td></tr><tr><td style="padding-left:20px">Block chance: ' + (_stats.mAttempts == 0 ? 0 : (_stats.pBlocks / _stats.mAttempts * 100).toFixed(2)) + '%</td><td style="padding-left:20px">Cure III: ' + (_stats.cureCounts[2] == 0 ? 0 : (_stats.cureTotals[2] / _stats.cureCounts[2]).toFixed(2)) + ' HP/cast</td></tr><tr><td style="padding-left:20px">Parry chance: ' + (_stats.mAttempts == 0 ? 0 : (_stats.pParries / _stats.mAttempts * 100).toFixed(2)) + '%</td><td style="padding-left:10px">Absorb casting efficiency: ' + (_stats.absArry[0] == 0 ? 0 : (_stats.absArry[1] / _stats.absArry[0] * 100).toFixed(2)) + '%</td></tr><tr><td style="padding-left:20px">Resist chance: ' + (_stats.mSpells == 0 ? 0 : (_stats.pResists / _stats.mSpells * 100).toFixed(2)) + '%</td><td style="padding-left:20px">Average MP drained by Absorb: ' + (_stats.absArry[1] == 0 ? 0 : (_stats.absArry[2] / _stats.absArry[1]).toFixed(2)) + ' MP/trigger</td></tr><tr><td style="padding-left:10px">Monster crit chance: ' + (_stats.mAttempts == 0 ? 0 : (_stats.mHits[1] / _stats.mAttempts * 100).toFixed(2)) + '%</td><td style="padding-left:20px">Average MP returns of Absorb: ' + (_stats.absArry[0] == 0 ? 0 : (_stats.absArry[2] / _stats.absArry[0]).toFixed(2)) + ' MP/cast</td></tr><tr><td style="padding-left:20px">Percent of monster hits that are crits: ' + (d == 0 ? 0 : (_stats.mHits[1] / d * 100).toFixed(2)) + '%</td></tr><tr><td style="padding-left:10px">Average damage taken per hit: ' + (_stats.mHits[0] == 0 ? 0 : (_stats.dTaken[0] / _stats.mHits[0]).toFixed(2)) + '</td></tr><tr><td style="padding-left:10px">Average damage taken per crit: ' + (_stats.mHits[1] == 0 ? 0 : (_stats.dTaken[1] / _stats.mHits[1]).toFixed(2)) + '</td></tr><tr><td style="padding-left:10px">Average damage taken: ' + (d == 0 ? 0 : ((_stats.dTaken[0] + _stats.dTaken[1]) / d).toFixed(2)) + '</td></tr><tr><td style="padding-left:10px">Average total damage taken per round: ' + (_stats.rounds == 0 ? 0 : ((_stats.dTaken[0] + _stats.dTaken[1]) / _stats.rounds).toFixed(2)) + '</td></tr><tr><td align="right" colspan="2"><input type="button" class="_resetStats" value="Reset Stats" /></td></tr>'
	}
	c += "</table>";
	return c
}
function getReportItemHtml() {
	var e = "Tracking disabled.";
	if (_settings.isTrackItems && _drops.dropChances == 0) {
		e = "No data found. Complete a round to begin tracking."
	} else {
		if (_settings.isTrackItems && _drops.isLoaded && _drops.dropChances > 0) {
			e = '<table class="_UI" cellspacing="0" cellpadding="1" style="width:100%">'
		} else {
			if (!_settings.isTrackItems && _drops.isLoaded && _drops.dropChances > 0) {
				e = '<table class="_UI" cellspacing="0" cellpadding="1" style="width:100%"><tr><td align="center" colspan="4"><div align="center" class="ui-state-error ui-corner-all" style="padding:4px;margin:4px"><span class="ui-icon ui-icon-pause"></span><b>TRACKING PAUSED</b></div></td></tr>'
			}
		}
	}
	if (_drops.isLoaded && _drops.dropChances > 0) {
		var b = _drops.artDrop + _drops.eqDrop + _drops.itemDrop;
		var d = b / 100;
		var a = _drops.dropChances / 100;
		e += '<tr><td colspan="4"><b>Total Item Drops:</b> ' + b + " from " + _drops.dropChances + " monsters (" + (b / a).toFixed(2) + '% total drop chance)</td></tr><tr><td colspan="4" style="padding-left:10px">Items: ' + _drops.itemDrop + " (" + (d == 0 ? 0 : (_drops.itemDrop / d).toFixed(2)) + "% of drops, " + (_drops.itemDrop / a).toFixed(2) + '% drop chance)</td></tr><tr><td colspan="4" style="padding-left:10px">Equipment: ' + _drops.eqDrop + " (" + (d == 0 ? 0 : (_drops.eqDrop / d).toFixed(2)) + "% of drops, " + (_drops.eqDrop / a).toFixed(2) + '% drop chance)</td></tr><tr><td colspan="4" style="padding-left:10px">Artifacts: ' + _drops.artDrop + " (" + (d == 0 ? 0 : (_drops.artDrop / d).toFixed(2)) + "% of drops, " + (_drops.artDrop / a).toFixed(2) + "% drop chance)</td></tr>";
		e += '<tr><td colspan="4"><b>Item:</b></td></tr>';
		for (var c = 0; c < _drops.itemArry.length; c = c + 2) {
			e += "<tr><td style='width:25%;padding-left:10px'>" + _drops.itemArry[c] + "</td><td style='width:25%'>x " + _drops.itemQtyArry[c] + " (" + (_drops.itemDrop == 0 ? 0 : ((_drops.itemQtyArry[c] / _drops.itemDrop) * 100).toFixed(2)) + "%)</td>";
			if (_drops.itemArry[c + 1] != " ") {
				e += "<td style='width:25%;padding-left:10px'>" + _drops.itemArry[c + 1] + "</td><td style='width:25%'>x " + _drops.itemQtyArry[c + 1] + " (" + (_drops.itemDrop == 0 ? 0 : ((_drops.itemQtyArry[c + 1] / _drops.itemDrop) * 100).toFixed(2)) + "%)</td></tr>"
			} else {
				e += "<td></td><td></td></tr>"
			}
		}
		e += '<tr><td colspan="4"><b>Equipment:</b></td></tr>';
		for (var c = _drops.eqArray.length - 1; c >= 0; c--) {
			e += '<tr><td colspan="4" style="padding-left:10px">' + _drops.eqArray[c] + "</td></tr>"
		}
		e += '<tr><td colspan="4"><b>Artifact:</b></td></tr>';
		for (var c = 0; c < _drops.artArry.length; c++) {
			e += '<tr><td colspan="4" style="padding-left:10px">' + _drops.artArry[c] + " x " + _drops.artQtyArry[c] + "</td></tr>"
		}
		e += '<tr><td align="right" colspan="4"><input type="button" class="_resetItems" value="Reset Drops" /></td></tr>'
	}
	e += "</table>";
	return e
}
function getReportRewardHtml() {
	var e = "Tracking disabled.";
	if (_settings.isTrackRewards && _rewards.totalRwrds == 0) {
		e = "No data found. Complete an arena to begin tracking."
	} else {
		if (_settings.isTrackRewards && _rewards.isLoaded && _rewards.totalRwrds > 0) {
			e = '<table class="_UI" cellspacing="0" cellpadding="1" style="width:100%">'
		} else {
			if (!_settings.isTrackRewards && _rewards.isLoaded && _rewards.totalRwrds > 0) {
				e = '<table class="_UI" cellspacing="0" cellpadding="1" style="width:100%"><tr><td align="center" colspan="2"><div align="center" class="ui-state-error ui-corner-all" style="padding:4px;margin:4px"><span class="ui-icon ui-icon-pause"></span><b>TRACKING PAUSED</b></div></td></tr>'
			}
		}
	}
	if (_rewards.isLoaded && _rewards.totalRwrds > 0) {
		var c = _rewards.totalRwrds / 100;
		var a = _rewards.tokenDrops[0] + _rewards.tokenDrops[1] + _rewards.tokenDrops[2];
		var b = a / 100;
		e += '<tr><td style="width:50%"><b>Total Rewards:</b> ' + _rewards.totalRwrds + '</td><td style="width:50%"><b>Token Bonus:</b> ' + a + " (" + (a / c).toFixed(2) + '% chance)</td></tr><tr><td style="padding-left:10px;width:50%">Artifact: ' + _rewards.artRwrd + " (" + (c == 0 ? 0 : (_rewards.artRwrd / c).toFixed(2)) + '%)</td><td style="padding-left:10px;width:50%">[Token of Blood]: ' + _rewards.tokenDrops[0] + " (" + (b == 0 ? 0 : (_rewards.tokenDrops[0] / b).toFixed(2)) + '%)</td></tr><tr><td style="padding-left:10px;width:50%">Equipment: ' + _rewards.eqRwrd + " (" + (c == 0 ? 0 : (_rewards.eqRwrd / c).toFixed(2)) + '%)</td><td style="padding-left:10px;width:50%">[Token of Healing]: ' + _rewards.tokenDrops[1] + " (" + (b == 0 ? 0 : (_rewards.tokenDrops[1] / b).toFixed(2)) + '%)</td></tr><tr><td style="padding-left:10px;width:50%">Item: ' + _rewards.itemsRwrd + " (" + (c == 0 ? 0 : (_rewards.itemsRwrd / c).toFixed(2)) + '%)</td><td style="padding-left:10px;width:50%">[Chaos Token]: ' + _rewards.tokenDrops[2] + " (" + (b == 0 ? 0 : (_rewards.tokenDrops[2] / b).toFixed(2)) + '%)</td></tr><tr><td colspan="2"><b>Artifact:</b></td></tr>';
		for (var d = 0; d < _rewards.artRwrdArry.length; d++) {
			e += '<tr><td colspan="2" style="padding-left:10px">' + _rewards.artRwrdArry[d] + " x " + _rewards.artRwrdQtyArry[d] + "</td></tr>"
		}
		e += '<tr><td colspan="2"><b>Equipment:</b></td></tr>';
		for (var d = _rewards.eqRwrdArry.length - 1; d >= 0; d--) {
			e += '<tr><td colspan="2" style="padding-left:10px">' + _rewards.eqRwrdArry[d] + "</tr></td>"
		}
		e += '<tr><td colspan="2"><b>Item:</b></td></tr>';
		for (var d = 0; d < _rewards.itemRwrdArry.length; d++) {
			e += '<tr><td colspan="2" style="padding-left:10px">' + _rewards.itemRwrdArry[d] + " x " + _rewards.itemRwrdQtyArry[d] + "</td></tr>"
		}
		e += '<tr><td align="right" colspan="2"><input type="button" class="_resetRewards" value="Reset Arena Rewards" /></td></tr>'
	}
	e += "</table>";
	return e
}
function getReportShrineHtml() {
	var c = "Tracking disabled.";
	if (_settings.isTrackShrine && _shrine.totalRewards == 0) {
		c = "No data found. Make an offering at Snowflake's Shrine to begin tracking."
	} else {
		if (_settings.isTrackShrine && _shrine.isLoaded && _shrine.totalRewards > 0) {
			c = '<table class="_UI" cellspacing="0" cellpadding="1" style="width:100%">'
		} else {
			if (!_settings.isTrackShrine && _shrine.isLoaded && _shrine.totalRewards > 0) {
				c = '<table class="_UI" cellspacing="0" cellpadding="1" style="width:100%"><tr><td align="center"><div align="center" class="ui-state-error ui-corner-all" style="padding:4px;margin:4px"><span class="ui-icon ui-icon-pause"></span><b>TRACKING PAUSED</b></div></td></tr>'
			}
		}
	}
	if (_shrine.isLoaded && _shrine.totalRewards > 0) {
		var g = 0;
		var d = 0;
		var a = 0;
		var e = 0;
		var h = 0;
		var f = 0;
		if (_shrine.artifactsTraded > 0) {
			g = (_shrine.artifactsTraded - _shrine.artifactStat) / 100;
			d = (_shrine.artifactAP / g).toFixed(2);
			a = (_shrine.artifactHath / g).toFixed(2);
			e = (_shrine.artifactHathTotal / (g * 100)).toFixed(2);
			h = (_shrine.artifactCrystal / g).toFixed(2);
			f = (_shrine.artifactItem / g).toFixed(2)
		}
		c += "<tr><td><b>Artifacts:</b> " + _shrine.artifactsTraded + ' traded</td></tr><tr><td style="padding-left:10px">Ability Points: ' + _shrine.artifactAP + " (" + d + '% chance)</tr></td><tr><td style="padding-left:10px">Hath: ' + _shrine.artifactHathTotal + " (" + a + "% chance; " + e + ' Hath per Artifact)</tr></td><tr><td style="padding-left:10px">Crystals: ' + _shrine.artifactCrystal + " (" + h + '% chance)</tr></td><tr><td style="padding-left:10px">Energy Drinks: ' + _shrine.artifactItem + " (" + f + "% chance)</tr></td>";
		c += "<tr><td ><b>Trophies:</b> " + _shrine.trophyArray.length + " traded</td></tr>";
		for (var b = _shrine.trophyArray.length - 1; b >= 0; b--) {
			c += '<tr><td style="padding-left:10px">' + _shrine.trophyArray[b] + "</tr></td>"
		}
		c += '<tr><td align="right"><input type="button" class="_clearTrophies" value="Clear Trophies" /> <input type="button" class="_resetShrine" value="Reset Shrine" /></td></tr>'
	}
	c += "</table>";
	return c
}
function initUI() {
	var d = 4;
	var c = $(".stuffbox").width() - 60 - 4;
	var b = document.createElement("div");
	var a = "<div class='ui-state-default ui-corner-all' style='position:absolute; top:" + d + "px; left: " + c + "px; z-index:1074'><span style='margin:3px' class='ui-icon ui-icon-wrench' title='Launch HV STAT UI'/></div>";
	$(b).html(a);
	$(b).addClass("_mainButton");
	$("body").append(b);
	$(b).css("cursor", "pointer");
	$("._mainButton").click(initMainMenu)
}
function initMainMenu() {
	if (_isMenuInitComplete) {
		return
	}
	var b = "[STAT] HentaiVerse Statistics, Tracking, and Analysis Tool v." + VERSION;
	if (browserIsChrome()) {
		b += " (Chrome Edition)"
	}
	var c = document.createElement("div");
	$(c).addClass("_mainMenu").css("text-align", "left");
	var a = '<div id="tabs"><ul><li><a href="#pane1"><span>Overview</span></a></li><li><a href="#pane2"><span>Battle Stats</span></a></li><li><a href="#pane3"><span>Item Drops</span></a></li><li><a href="#pane4"><span>Arena Rewards</span></a></li><li><a href="#pane5"><span>Shrine</span></a></li><li><a href="#pane6"><span>Settings</span></a></li></ul><div id="pane1">Tab 1 Error</div><div id="pane2">Tab 2 Error</div><div id="pane3">Tab 3 Error</div><div id="pane4">Tab 4 Error</div><div id="pane5">Tab 5 Error</div><div id="pane6">Tab 6 Error</div></div>';
	$(c).html(a);
	$("body").append(c);
	$(c).dialog({
			autoOpen : false,
			closeOnEscape : true,
			draggable : false,
			resizable : false,
			height : 560,
			width : 850,
			modal : true,
			position : ["center", "center"],
			title : b
		});
	$("#tabs").tabs();
	loadOverviewObject();
	loadStatsObject();
	loadDropsObject();
	loadRewardsObject();
	loadShrineObject();
	initOverviewPane();
	initStatsPane();
	initItemPane();
	initRewardsPane();
	initShrinePane();
	initSettingsPane();
	$("._mainButton").toggle(function () {
			$(c).dialog("close")
		}, function () {
			$(c).dialog("open")
		});
	_isMenuInitComplete = true;
	$(c).dialog("open")
}
function initOverviewPane() {
	$("#pane1").html(getReportOverviewHtml());
	$("._resetOverview").click(function () {
			if (confirm("Reset Overview tab?")) {
				_overview.reset()
			}
		})
}
function initStatsPane() {
	$("#pane2").html(getReportStatsHtml());
	$("._resetStats").click(function () {
			if (confirm("Reset Stats tab?")) {
				_stats.reset()
			}
		})
}
function initItemPane() {
	$("#pane3").html(getReportItemHtml());
	$("._resetItems").click(function () {
			if (confirm("Reset Item Drops tab?")) {
				_drops.reset()
			}
		})
}
function initRewardsPane() {
	$("#pane4").html(getReportRewardHtml());
	$("._resetRewards").click(function () {
			if (confirm("Reset Arena Rewards tab?")) {
				_rewards.reset()
			}
		})
}
function initShrinePane() {
	$("#pane5").html(getReportShrineHtml());
	$("._resetShrine").click(function () {
			if (confirm("Reset Shrine tab?")) {
				_shrine.reset()
			}
		});
	$("._clearTrophies").click(function () {
			if (confirm("Clear Trophy list?")) {
				_shrine.trophyArray = [];
				_shrine.save()
			}
		})
}
function initSettingsPane() {
	var a = '<a style="color:red;padding-bottom:10px">All changes will take effect on next page load.</a><table class="_settings" cellspacing="0" cellpadding="2" style="width:100%"><tr><td colspan="2"><b>General Options:</b></td></tr><tr><td align="center" style="width:5px"><input type="checkbox" name="isShowSidebarProfs" /></td><td>Show proficiencies in sidebar</td></tr><tr><td align="center" style="width:5px"><input type="checkbox" name="isColumnInventory" /></td><td>Use column view for item inventory (<span style="color:red">Downloadable/Custom Local Fonts only!</span>)</td></tr><tr><td align="center" style="width:5px"><input type="checkbox" name="isHideHVLogo" /></td><td>Hide HentaiVerse logo</td></tr><tr><td align="center" style="width:5px"><input type="checkbox" name="isChangePageTitle" /></td><td>Change HentaiVerse page title: <input type="text" name="customPageTitle" size="40" /></td></tr><tr><td colspan="2"><b>Battle Enhancement:</b></td></tr><tr><td align="center" style="width:5px"><input type="checkbox" name="isShowHighlight" /></td><td>Highlight battle log</td></tr><tr><td align="center" style="width:5px;padding-left:20px"><input type="checkbox" name="isAltHighlight" /></td><td style="padding-left:10px">Use alternate highlighting</td></tr><tr><td align="center" style="width:5px"><input type="checkbox" name="isShowDivider" /></td><td>Show turn divider</td></tr><tr><td align="center" style="width:5px"><input type="checkbox" name="isShowSelfDuration" /></td><td>Show self effect durations</td></tr><tr><td align="center" style="width:5px"><input type="checkbox" name="isShowRoundReminder" /></td><td>Final Round Reminder - Minimum <input type="text" name="reminderMinRounds" size="1" maxLength="3" style="text-align:right" /> Rounds</td></tr><tr><td align="center" style="width:5px"><input type="checkbox" name="isShowEndStats" /></td><td>Show Battle Summary</td></tr><tr><td align="center" style="width:5px"><input type="checkbox" name="isAlertGem" /></td><td>Alert on Powerup drops</td></tr><tr><td colspan="2" style="padding-left:10px">Display Monster Stats:</td></tr><tr><td align="center" style="width:5px;padding-left:20px"><input type="checkbox" name="isShowMonsterHP" /></td><td style="padding-left:10px">Show monster HP (<span style="color:red">Estimated</span>)</td></tr><tr><td align="center" style="width:5px;padding-left:40px"><input type="checkbox" name="isShowMonsterHPPercent" /></td><td style="padding-left:10px">Show monster HP in percentage</td></tr><tr><td align="center" style="width:5px;padding-left:20px"><input type="checkbox" name="isShowMonsterMP" /></td><td style="padding-left:10px">Show monster MP percentage</td></tr><tr><td align="center" style="width:5px;padding-left:20px"><input type="checkbox" name="isShowMonsterElements" /></td><td style="padding-left:10px">Show monster resistances (<span style="color:red">Original Bestiary only!</span>)</td></tr><tr><td align="center" style="width:5px;padding-left:20px"><input type="checkbox" name="isShowMonsterDuration" /></td><td style="padding-left:10px">Show monster effect durations</td></tr><tr><td colspan="2"><b>Tracking Functions:</b></td></tr><tr><td align="center" style="width:5px"><input type="checkbox" name="isTrackStats" /></td><td>Track Battle Statistics</td></tr><tr><td align="center" style="width:5px"><input type="checkbox" name="isTrackItems" /></td><td>Track Item Drops</td></tr><tr><td align="center" style="width:5px"><input type="checkbox" name="isTrackRewards" /></td><td>Track Arena Rewards</td></tr><tr><td align="center" style="width:5px"><input type="checkbox" name="isTrackShrine" /></td><td>Track Shrine (<span style="color:red">Downloadable/Custom Local Fonts only!</span>)</td></tr><tr><td style="padding-left:20px" colspan="2"><input type="button" class="_resetAll" value="Reset" title="Reset all tracking data." /></td></tr><tr><td colspan="2"><b>HP Warning System:</b></td></tr><tr><td colspan="2" style="padding-left:10px">Spark Warning:</td></tr><tr><td align="center" style="width:5px;padding-left:20px"><input type="checkbox" name="isWarnSparkTrigger" /></td><td>Alert when Spark of Life triggers</td></tr><tr><td align="center" style="width:5px;padding-left:20px"><input type="checkbox" name="isWarnSparkExpire" /></td><td>Alert when Spark of Life expires</td></tr><tr><td colspan="2" style="padding-left:10px">Alert Mode:</td></tr><tr><td align="center" style="width:5px;padding-left:20px"><input type="checkbox" name="isHighlightQC" /></td><td>Highlight Quickcast - <span style="color:orange">Orange</span>: <input type="text" name="warnOrangeLevel" size="1" maxLength="2" style="text-align:right" />% HP; <span style="color:red">Red</span>: <input type="text" name="warnRedLevel" size="1" maxLength="2" style="text-align:right" />% HP</td></tr><tr><td align="center" style="width:5px;padding-left:20px"><input type="checkbox" name="isShowPopup" /></td><td>Alert Message - <input type="text" name="warnAlertLevel" size="1" maxLength="2" style="text-align:right" />% HP</td></tr><tr><td align="center" style="width:5px;padding-left:30px"><input type="checkbox" name="isNagHP" /></td><td style="padding-left:10px">Nag Mode - Alert message appears every turn your HP is critical</td></tr><tr><td colspan="2" style="padding-left:10px">Battle Type:</td></tr><tr><td align="center" style="width:5px;padding-left:20px"><input type="checkbox" name="isWarnH" /></td><td style="padding-left:10px">Hourly encounters</td></tr><tr><td align="center" style="width:5px;padding-left:20px"><input type="checkbox" name="isWarnA" /></td><td style="padding-left:10px">Arena</td></tr><tr><td align="center" style="width:5px;padding-left:20px"><input type="checkbox" name="isWarnGF" /></td><td style="padding-left:10px">Grindfest</td></tr><tr><td align="center" style="width:5px;padding-left:20px"><input type="checkbox" name="isWarnIW" /></td><td style="padding-left:10px">Item World</td></tr></table><hr /><table class="_settings" cellspacing="0" cellpadding="2" style="width:100%"><tr><td align="center"><input type="button" class="_resetSettings" value="Default Settings" title="Reset settings to default."/></td><td align="center"><input type="button" class="_masterReset" value="MASTER RESET" title="Deletes all of STAT\'s saved data and settings."/></td></tr></table>';
	$("#pane6").html(a);
	if (_settings.isShowHighlight) {
		$("input[name=isShowHighlight]").attr("checked", "checked")
	}
	if (_settings.isAltHighlight) {
		$("input[name=isAltHighlight]").attr("checked", "checked")
	}
	if (_settings.isShowDivider) {
		$("input[name=isShowDivider]").attr("checked", "checked")
	}
	if (_settings.isShowEndStats) {
		$("input[name=isShowEndStats]").attr("checked", "checked")
	}
	if (_settings.isShowMonsterHP) {
		$("input[name=isShowMonsterHP]").attr("checked", "checked")
	}
	if (_settings.isShowMonsterHPPercent) {
		$("input[name=isShowMonsterHPPercent]").attr("checked", "checked")
	}
	if (_settings.isShowMonsterMP) {
		$("input[name=isShowMonsterMP]").attr("checked", "checked")
	}
	if (_settings.isShowMonsterElements) {
		$("input[name=isShowMonsterElements]").attr("checked", "checked")
	}
	if (_settings.isShowMonsterDuration) {
		$("input[name=isShowMonsterDuration]").attr("checked", "checked")
	}
	if (_settings.isShowSelfDuration) {
		$("input[name=isShowSelfDuration]").attr("checked", "checked")
	}
	if (_settings.isShowSidebarProfs) {
		$("input[name=isShowSidebarProfs]").attr("checked", "checked")
	}
	if (_settings.isShowRoundReminder) {
		$("input[name=isShowRoundReminder]").attr("checked", "checked")
	}
	$("input[name=reminderMinRounds]").attr("value", _settings.reminderMinRounds);
	if (_settings.isAlertGem) {
		$("input[name=isAlertGem]").attr("checked", "checked")
	}
	if (_settings.isHideHVLogo) {
		$("input[name=isHideHVLogo]").attr("checked", "checked")
	}
	if (_settings.isChangePageTitle) {
		$("input[name=isChangePageTitle]").attr("checked", "checked")
	}
	$("input[name=customPageTitle]").attr("value", _settings.customPageTitle);
	if (_settings.isColumnInventory) {
		$("input[name=isColumnInventory]").attr("checked", "checked")
	}
	if (_settings.isTrackStats) {
		$("input[name=isTrackStats]").attr("checked", "checked")
	}
	if (_settings.isTrackRewards) {
		$("input[name=isTrackRewards]").attr("checked", "checked")
	}
	if (_settings.isTrackShrine) {
		$("input[name=isTrackShrine]").attr("checked", "checked")
	}
	if (_settings.isTrackItems) {
		$("input[name=isTrackItems]").attr("checked", "checked")
	}
	if (_settings.warnMode[0]) {
		$("input[name=isWarnH]").attr("checked", "checked")
	}
	if (_settings.warnMode[1]) {
		$("input[name=isWarnA]").attr("checked", "checked")
	}
	if (_settings.warnMode[2]) {
		$("input[name=isWarnGF]").attr("checked", "checked")
	}
	if (_settings.warnMode[3]) {
		$("input[name=isWarnIW]").attr("checked", "checked")
	}
	if (_settings.isHighlightQC) {
		$("input[name=isHighlightQC]").attr("checked", "checked")
	}
	$("input[name=warnOrangeLevel]").attr("value", _settings.warnOrangeLevel);
	$("input[name=warnRedLevel]").attr("value", _settings.warnRedLevel);
	if (_settings.isShowPopup) {
		$("input[name=isShowPopup]").attr("checked", "checked")
	}
	$("input[name=warnAlertLevel]").attr("value", _settings.warnAlertLevel);
	if (_settings.isNagHP) {
		$("input[name=isNagHP]").attr("checked", "checked")
	}
	if (_settings.isWarnSparkTrigger) {
		$("input[name=isWarnSparkTrigger]").attr("checked", "checked")
	}
	if (_settings.isWarnSparkExpire) {
		$("input[name=isWarnSparkExpire]").attr("checked", "checked")
	}
	$("input[name=isShowHighlight]").click(saveSettings);
	$("input[name=isAltHighlight]").click(saveSettings);
	$("input[name=isShowDivider]").click(saveSettings);
	$("input[name=isShowEndStats]").click(saveSettings);
	$("input[name=isShowMonsterHP]").click(saveSettings);
	$("input[name=isShowMonsterHPPercent]").click(saveSettings);
	$("input[name=isShowMonsterMP]").click(saveSettings);
	$("input[name=isShowMonsterElements]").click(saveSettings);
	$("input[name=isShowMonsterDuration]").click(saveSettings);
	$("input[name=isShowSelfDuration]").click(saveSettings);
	$("input[name=isShowSidebarProfs]").click(reminderAndSaveSettings);
	$("input[name=isShowRoundReminder]").click(saveSettings);
	$("input[name=reminderMinRounds]").change(saveSettings);
	$("input[name=isAlertGem]").click(saveSettings);
	$("input[name=isHideHVLogo]").click(saveSettings);
	$("input[name=isChangePageTitle]").click(saveSettings);
	$("input[name=customPageTitle]").change(saveSettings);
	$("input[name=isColumnInventory]").click(saveSettings);
	$("input[name=isTrackStats]").click(saveSettings);
	$("input[name=isTrackRewards]").click(saveSettings);
	$("input[name=isTrackShrine]").click(saveSettings);
	$("input[name=isTrackItems]").click(saveSettings);
	$("input[name=isWarnSparkTrigger]").click(saveSettings);
	$("input[name=isWarnSparkExpire]").click(saveSettings);
	$("input[name=isWarnH]").click(saveSettings);
	$("input[name=isWarnA]").click(saveSettings);
	$("input[name=isWarnGF]").click(saveSettings);
	$("input[name=isWarnIW]").click(saveSettings);
	$("input[name=isHighlightQC]").click(saveSettings);
	$("input[name=warnOrangeLevel]").change(saveSettings);
	$("input[name=warnRedLevel]").change(saveSettings);
	$("input[name=isShowPopup]").click(saveSettings);
	$("input[name=warnAlertLevel]").change(saveSettings);
	$("input[name=isNagHP]").click(saveSettings);
	$("._resetSettings").click(function () {
			if (confirm("Reset Settings to default?")) {
				_settings.reset()
			}
		});
	$("._resetAll").click(function () {
			if (confirm("Reset All Tracking data?")) {
				HVResetTracking()
			}
		});
	$("._masterReset").click(function () {
			if (confirm("This will delete ALL HV data saved in localStorage.\nAre you sure you want to do this?")) {
				HVMasterReset()
			}
		})
}
function saveSettings() {
	_settings.isShowHighlight = $("input[name=isShowHighlight]").get(0).checked;
	_settings.isAltHighlight = $("input[name=isAltHighlight]").get(0).checked;
	_settings.isShowDivider = $("input[name=isShowDivider]").get(0).checked;
	_settings.isShowEndStats = $("input[name=isShowEndStats]").get(0).checked;
	_settings.isShowMonsterHP = $("input[name=isShowMonsterHP]").get(0).checked;
	_settings.isShowMonsterHPPercent = $("input[name=isShowMonsterHPPercent]").get(0).checked;
	_settings.isShowMonsterMP = $("input[name=isShowMonsterMP]").get(0).checked;
	_settings.isShowMonsterElements = $("input[name=isShowMonsterElements]").get(0).checked;
	_settings.isShowMonsterDuration = $("input[name=isShowMonsterDuration]").get(0).checked;
	_settings.isShowSelfDuration = $("input[name=isShowSelfDuration]").get(0).checked;
	_settings.isShowSidebarProfs = $("input[name=isShowSidebarProfs]").get(0).checked;
	_settings.isShowRoundReminder = $("input[name=isShowRoundReminder]").get(0).checked;
	_settings.reminderMinRounds = $("input[name=reminderMinRounds]").get(0).value;
	_settings.isAlertGem = $("input[name=isAlertGem]").get(0).checked;
	_settings.isHideHVLogo = $("input[name=isHideHVLogo]").get(0).checked;
	_settings.isChangePageTitle = $("input[name=isChangePageTitle]").get(0).checked;
	_settings.customPageTitle = $("input[name=customPageTitle]").get(0).value;
	_settings.isColumnInventory = $("input[name=isColumnInventory]").get(0).checked;
	_settings.isTrackStats = $("input[name=isTrackStats]").get(0).checked;
	_settings.isTrackRewards = $("input[name=isTrackRewards]").get(0).checked;
	_settings.isTrackShrine = $("input[name=isTrackShrine]").get(0).checked;
	_settings.isTrackItems = $("input[name=isTrackItems]").get(0).checked;
	_settings.isWarnSparkTrigger = $("input[name=isWarnSparkTrigger]").get(0).checked;
	_settings.isWarnSparkExpire = $("input[name=isWarnSparkExpire]").get(0).checked;
	_settings.isHighlightQC = $("input[name=isHighlightQC]").get(0).checked;
	_settings.warnOrangeLevel = $("input[name=warnOrangeLevel]").get(0).value;
	_settings.warnRedLevel = $("input[name=warnRedLevel]").get(0).value;
	_settings.isShowPopup = $("input[name=isShowPopup]").get(0).checked;
	_settings.warnAlertLevel = $("input[name=warnAlertLevel]").get(0).value;
	_settings.isNagHP = $("input[name=isNagHP]").get(0).checked;
	_settings.warnMode[0] = $("input[name=isWarnH]").get(0).checked;
	_settings.warnMode[1] = $("input[name=isWarnA]").get(0).checked;
	_settings.warnMode[2] = $("input[name=isWarnGF]").get(0).checked;
	_settings.warnMode[3] = $("input[name=isWarnIW]").get(0).checked;
	_settings.save()
}
function reminderAndSaveSettings() {
	loadProfsObject();
	if (!isProfTotalsRecorded() && $("input[name=isShowSidebarProfs]").get(0).checked) {
		alert('Please visit the Character Stats page at least once\nwith either the "Use Downloable Fonts" or "Custom\nLocal Font" setting enabled, to allow STAT to record\nyour current proficiencies. STAT cannot record this\ndata while HentaiVerse Font Engine is enabled.')
	}
	saveSettings()
}
function initItemsView() {
	$("#leftpane").hide();
	GM_addStyle("#hv_item_grid * {font-family:arial,helvetica,sans-serif !important;font-size:9pt !important;font-weight:bold !important;line-height:72% !important;padding-top:2px;text-transform:capitalize;}#_health, #_mana, #_spirit, #_other, #_infusion, #_scroll, #_special div div div {cursor:pointer;}#_artifact, #_trophy, #_event, #_token, #_crystal div div div {cursor:default;}#_left {width:194px;height:660px;float:left;overflow:auto;}#_right {width:206px;height:660px;float:left;overflow:auto;}._spacer {padding:1px;float:right;width:194px;}");
	var a = 11101;
	var k = 11201;
	var e = 11301;
	var l = 11401;
	var f = 12101;
	var d = 13101;
	var b = 19101;
	var i = 20001;
	var c = 30001;
	var g = 32001;
	var h = 40001;
	var j = 50001;
	$("#leftpane").before("<div id='hv_item_grid' style='width:404px;height:660px;text-align:left;float:left;position:relative;'><div id='_left'><div id='_health'><div class='_spacer'></div></div><div id='_mana'><div class='_spacer'></div></div><div id='_spirit'><div class='_spacer'></div></div><div id='_other'><div class='_spacer'></div></div><div id='_special'><div class='_spacer'></div></div><div id='_infusion'><div class='_spacer'></div></div><div id='_scroll'><div class='_spacer'></div></div><div id='_token'><div class='_spacer'></div></div><div id='_crystal'><div class='_spacer'></div></div><div id='_artifact'><div class='_spacer'></div></div><div id='_trophy'><div class='_spacer'></div></div><div id='_event'><div class='_spacer'></div></div></div><div id='_right'></div></div>");
	$("#item_pane > table > tbody > tr").each(function () {
			var o = $(this);
			var n = o.children("td").eq(0).children("div").eq(0).attr("id").match(/\d+/)[0];
			var m = o.children("td").eq(0).children("div").eq(0);
			m.children().eq(0).children().eq(0).html(o.children("td").eq(0).text() + "(" + o.children("td").eq(1).text() + ")");
			m.click(function () {
					select_item(this)
				});
			if (n >= a && n < k) {
				$("#_health ._spacer").before(m)
			} else {
				if (n >= k && n < e) {
					$("#_mana ._spacer").before(m)
				} else {
					if (n >= e && n < l) {
						$("#_spirit ._spacer").before(m)
					} else {
						if (n >= l && n < f) {
							$("#_other ._spacer").before(m)
						} else {
							if (n >= f && n < d) {
								$("#_infusion ._spacer").before(m)
							} else {
								if (n >= d && n < b) {
									$("#_scroll ._spacer").before(m)
								} else {
									if (n >= b && n < i) {
										$("#_special ._spacer").before(m)
									} else {
										if (n >= i && n < c) {
											$("#_artifact ._spacer").before(m)
										} else {
											if (n >= c && n < g) {
												$("#_trophy ._spacer").before(m)
											} else {
												if (n >= g && n < h) {
													$("#_event ._spacer").before(m)
												} else {
													if (n >= h && n < j) {
														$("#_token ._spacer").before(m)
													} else {
														if (n >= j) {
															$("#_crystal ._spacer").before(m)
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			m.children().eq(0).removeAttr("style").css("width", m.children().width());
			m.removeAttr("style").css({
					"float" : "right",
					width : "200px",
					padding : "2px 1px"
				})
		});
	$("#_crystal").appendTo("#_right");
	$("#_artifact").appendTo("#_right");
	$("#_trophy").appendTo("#_right");
	$("#_event").appendTo("#_right")
}
function captureShrine() {
	if ($("#messagebox").html() != undefined) {
		loadShrineObject();
		var a = $(".cmb6:eq(0) div:eq(4)").text();
		if (a.match(/power/i)) {
			var b = $(".cmb6:eq(2) div:eq(4)").text();
			_shrine.artifactsTraded++;
			if (b.match(/ability point/i)) {
				_shrine.artifactAP++
			} else {
				if (b.match(/crystal/i)) {
					_shrine.artifactCrystal++
				} else {
					if (b.match(/increased/ig)) {
						_shrine.artifactStat++
					} else {
						if (b.match(/(\d) hath/i)) {
							_shrine.artifactHath++;
							_shrine.artifactHathTotal += parseInt(RegExp.$1)
						} else {
							if (b.match(/energy drink/ig)) {
								_shrine.artifactItem++
							}
						}
					}
				}
			}
		} else {
			if (a.match(/item/i)) {
				var c = $(".cmb6:eq(3) div:eq(4)").text().replace(/(^|\s)([a-z])/g, function (d, f, e) {
							return f + e.toUpperCase()
						}).replace(" Of ", " of ").replace(" The ", " the ");
				_shrine.trophyArray.push(c)
			}
		}
		_shrine.save()
	}
	return
}
function isBattle() {
	return ($("#togpane_log").length > 0)
}
function isBattleOver() {
	return ($("#battleform .btcp").length > 0)
}
function isItemInventoryPage() {
	return document.location.href.match(/s=character&ss=it/i)
}
function isCharacterPage() {
	return document.getElementById("pattrform")
}
function isHentaiVerse() {
	return ($(".stuffbox").length)
}
function isShrinePage() {
	return document.location.href.match(/s=Bazaar&ss=ss/i)
}
function isHVFontEngine() {
	return !$(".clb .cbl .fd10").eq(0).text().match(/Health points/i)
}
function loadOverviewObject() {
	if (_overview == null) {
		_overview = new HVCacheOverview();
		_overview.load()
	}
}
function loadStatsObject() {
	if (_stats == null) {
		_stats = new HVCacheStats();
		_stats.load()
	}
}
function loadProfsObject() {
	if (_profs == null) {
		_profs = new HVCacheProf();
		_profs.load()
	}
}
function loadRewardsObject() {
	if (_rewards == null) {
		_rewards = new HVCacheRewards();
		_rewards.load()
	}
}
function loadShrineObject() {
	if (_shrine == null) {
		_shrine = new HVCacheShrine();
		_shrine.load()
	}
}
function loadDropsObject() {
	if (_drops == null) {
		_drops = new HVCacheDrops();
		_drops.load()
	}
}
function loadSettingsObject() {
	if (_settings == null) {
		_settings = new HVSettings();
		_settings.load()
	}
}
function loadRoundObject() {
	if (_round == null) {
		_round = new HVRound();
		_round.load()
	}
}
function getMonsterElementsById(a, b) {
	if (b == 1) {
		a.imperv = "-";
		a.resist = "Wind,Holy";
		a.majWeak = "Fire,Cold";
		a.minWeak = "-"
	} else {
		if (b == 2) {
			a.imperv = "-";
			a.resist = "Holy,Dark";
			a.majWeak = "Fire,Elec";
			a.minWeak = "-"
		} else {
			if (b == 3) {
				a.imperv = "-";
				a.resist = "Fire,Holy";
				a.majWeak = "Cold,Elec";
				a.minWeak = "-"
			} else {
				if (b == 4) {
					a.imperv = "-";
					a.resist = "Cold,Elec";
					a.majWeak = "Holy,Dark";
					a.minWeak = "Fire"
				} else {
					if (b == 5) {
						a.imperv = "-";
						a.resist = "Cold,Wind";
						a.majWeak = "Fire,Dark";
						a.minWeak = "-"
					} else {
						if (b == 6) {
							a.imperv = "-";
							a.resist = "Fire,Dark";
							a.majWeak = "Cold,Holy";
							a.minWeak = "-"
						} else {
							if (b == 7) {
								a.imperv = "-";
								a.resist = "Wind,Dark";
								a.majWeak = "Fire,Holy";
								a.minWeak = "-"
							} else {
								if (b == 8) {
									a.imperv = "-";
									a.resist = "Fire,Cold";
									a.majWeak = "Elec,Holy";
									a.minWeak = "Wind"
								} else {
									if (b == 9) {
										a.imperv = "-";
										a.resist = "Cold,Holy";
										a.majWeak = "Wind";
										a.minWeak = "Fire"
									} else {
										if (b == 10) {
											a.imperv = "-";
											a.resist = "Fire,Elec";
											a.majWeak = "Wind,Dark";
											a.minWeak = "Holy"
										} else {
											if (b == 11) {
												a.imperv = "-";
												a.resist = "Fire,Wind";
												a.majWeak = "Cold,Elec";
												a.minWeak = "-"
											} else {
												if (b == 12) {
													a.imperv = "-";
													a.resist = "Fire,Elec,Holy";
													a.majWeak = "Dark";
													a.minWeak = "Wind"
												} else {
													if (b == 13) {
														a.imperv = "-";
														a.resist = "Elec,Dark";
														a.majWeak = "Fire,Holy";
														a.minWeak = "Cold"
													} else {
														if (b == 14) {
															a.imperv = "-";
															a.resist = "Cold,Holy";
															a.majWeak = "Elec,Dark";
															a.minWeak = "Fire"
														} else {
															if (b == 15) {
																a.imperv = "-";
																a.resist = "Cold,Dark";
																a.majWeak = "Fire,Holy";
																a.minWeak = "Wind"
															} else {
																if (b == 16) {
																	a.imperv = "-";
																	a.resist = "Cold,Elec,Wind,Holy,Dark";
																	a.majWeak = "Fire";
																	a.minWeak = "Soul"
																} else {
																	if (b == 17) {
																		a.imperv = "-";
																		a.resist = "Fire,Elec,Wind,Holy,Dark";
																		a.majWeak = "Cold";
																		a.minWeak = "-"
																	} else {
																		if (b == 18) {
																			a.imperv = "-";
																			a.resist = "Fire,Cold,Elec,Wind,Dark";
																			a.majWeak = "Holy";
																			a.minWeak = "Soul"
																		} else {
																			if (b == 19) {
																				a.imperv = "-";
																				a.resist = "Fire,Cold,Wind,Holy,Dark";
																				a.majWeak = "Elec";
																				a.minWeak = "Soul"
																			} else {
																				if (b == 20) {
																					a.imperv = "-";
																					a.resist = "Fire,Cold,Elec,Holy,Dark";
																					a.majWeak = "Wind";
																					a.minWeak = "Soul"
																				} else {
																					if (b == 21) {
																						a.imperv = "-";
																						a.resist = "Elem,Crush,Slash";
																						a.majWeak = "Holy,Dark,Pierce";
																						a.minWeak = "-"
																					} else {
																						if (b == 22) {
																							a.imperv = "-";
																							a.resist = "Elem,Crush,Pierce";
																							a.majWeak = "Holy,Dark,Slash";
																							a.minWeak = "-"
																						} else {
																							if (b == 23) {
																								a.imperv = "-";
																								a.resist = "Elem,Slash,Pierce";
																								a.majWeak = "Holy,Dark,Crush";
																								a.minWeak = "-"
																							} else {
																								if (b == 24) {
																									a.imperv = "-";
																									a.resist = "Elem,Holy,Dark,Phys";
																									a.majWeak = "-";
																									a.minWeak = "Soul"
																								} else {
																									if (b == 25) {
																										a.imperv = "-";
																										a.resist = "Fire,Holy";
																										a.majWeak = "Wind,Dark";
																										a.minWeak = "Elec"
																									} else {
																										if (b == 26) {
																											a.imperv = "-";
																											a.resist = "Wind,Dark";
																											a.majWeak = "Fire,Holy";
																											a.minWeak = "Elec"
																										} else {
																											if (b == 27) {
																												a.imperv = "-";
																												a.resist = "Fire,Cold,Wind,Holy,Dark";
																												a.majWeak = "Soul,Elec";
																												a.minWeak = "-"
																											} else {
																												if (b == 28) {
																													a.imperv = "-";
																													a.resist = "Fire,Elec,Wind,Holy,Dark";
																													a.majWeak = "Soul,Cold";
																													a.minWeak = "-"
																												} else {
																													if (b == 29) {
																														a.imperv = "-";
																														a.resist = "Fire,Cold,Elec,Holy,Dark";
																														a.majWeak = "Soul,Wind";
																														a.minWeak = "-"
																													} else {
																														if (b == 30) {
																															a.imperv = "-";
																															a.resist = "Cold,Elec,Wind,Holy,Dark";
																															a.majWeak = "Soul,Fire";
																															a.minWeak = "-"
																														} else {
																															if (b == 31) {
																																a.imperv = "Elem,Holy,Phys";
																																a.resist = "Soul";
																																a.majWeak = "Dark";
																																a.minWeak = "-"
																															} else {
																																if (b == 32) {
																																	a.imperv = "Elem,Dark,Phys";
																																	a.resist = "Soul";
																																	a.majWeak = "Holy";
																																	a.minWeak = "-"
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
function getRelativeTime(b) {
	var a = (arguments.length > 1) ? arguments[1] : new Date();
	var c = parseInt((a.getTime() - b) / 1000);
	if (c < 60) {
		return "less than a minute ago"
	} else {
		if (c < 120) {
			return "about a minute ago"
		} else {
			if (c < (60 * 60)) {
				return (parseInt(c / 60)).toString() + " minutes ago"
			} else {
				if (c < (120 * 60)) {
					return "about an hour ago"
				} else {
					if (c < (24 * 60 * 60)) {
						return "about " + (parseInt(c / 3600)).toString() + " hours ago"
					} else {
						if (c < (48 * 60 * 60)) {
							return "1 day ago"
						} else {
							return (parseInt(c / 86400)).toString() + " days ago"
						}
					}
				}
			}
		}
	}
}
function browserIsChrome() {
	return navigator.userAgent.match("Chrome")
}
if (browserIsChrome()) {
	unsafeWindow = window;
	function GM_addStyle(a) {
		var b = document.createElement("style");
		b.textContent = a;
		document.getElementsByTagName("head")[0].appendChild(b)
	}
	function GM_getValue(b, a) {
		var c = localStorage.getItem(b);
		if (c == "false") {
			return false
		}
		return c || a
	}
	function GM_deleteValue(a) {
		localStorage.removeItem(a)
	}
	function GM_log(a) {
		console.log(a)
	}
	function GM_setValue(a, b) {
		localStorage.setItem(a, b)
	}
	function GM_getResourceText(a) {}
	
}
function cssAdded() {
	var a = document.createElement("div");
	a.setAttribute("id", "cssdiv");
	a.setAttribute("style", "visibility:hidden");
	$("body").append(a);
	return
}
function cssInserted() {
	return ($("#cssdiv").length > 0)
}
function HVResetTracking() {
	_overview.reset();
	_stats.reset();
	_rewards.reset();
	_shrine.reset();
	_drops.reset()
}
function HVMasterReset() {
	deleteFromStorage(HV_OVERVIEW);
	deleteFromStorage(HV_STATS);
	deleteFromStorage(HV_PROF);
	deleteFromStorage(HV_REWARDS);
	deleteFromStorage(HV_SHRINE);
	deleteFromStorage(HV_DROPS);
	deleteFromStorage(HV_SETTINGS);
	deleteFromStorage(HV_ROUND);
	deleteFromStorage(HV_ALERT);
	deleteFromStorage(HV_EQUIP)
}
function clone(a) {
	if (a == null || typeof(a) != "object") {
		return a
	}
	if (a instanceof Array) {
		return a.slice()
	}
	for (var b in a) {
		if (!a.hasOwnProperty(b)) {
			continue
		}
		this[b] = (a[b] === undefined) ? undefined : clone(a[b])
	}
}
function loadFromStorage(c, b) {
	var a = localStorage.getItem(b);
	if (a != null) {
		c.cloneFrom(JSON.parse(a));
		c.isLoaded = true
	}
}
function saveToStorage(b, a) {
	localStorage.setItem(a, JSON.stringify(b))
}
function deleteFromStorage(a) {
	localStorage.removeItem(a)
}
function HVRound() {
	this.load = function () {
		loadFromStorage(this, HV_ROUND)
	};
	this.save = function () {
		saveToStorage(this, HV_ROUND)
	};
	this.reset = function () {
		deleteFromStorage(HV_ROUND)
	};
	this.cloneFrom = clone;
	this.monsters = [];
	this.currRound = 0;
	this.maxRound = 0;
	this.arenaNum = 0;
	this.dropChances = 0;
	this.battleType = 0;
	this.lastTurn = -1;
	this.kills = 0;
	this.aAttempts = 0;
	this.aHits = [0, 0];
	this.aOffhands = [0, 0];
	this.aDomino = [0, 0, 0, 0, 0, 0];
	this.aCounters = [0, 0];
	this.dDealt = [0, 0, 0];
	this.sHits = [0, 0];
	this.sResists = 0;
	this.dDealtSp = [0, 0];
	this.sAttempts = 0;
	this.sInterfs = 0;
	this.absArry = [0, 0, 0];
	this.mAttempts = 0;
	this.mHits = [0, 0];
	this.mSpells = 0;
	this.pDodges = 0;
	this.pEvades = 0;
	this.pParries = 0;
	this.pBlocks = 0;
	this.pResists = 0;
	this.dTaken = [0, 0];
	this.coalesce = 0;
	this.eTheft = 0;
	this.channel = 0;
	this.overStrikes = 0;
	this.cureTotals = [0, 0, 0];
	this.cureCounts = [0, 0, 0];
	this.isLoaded = false
}
function HVCacheOverview() {
	this.load = function () {
		loadFromStorage(this, HV_OVERVIEW)
	};
	this.save = function () {
		this.totalRounds = this.roundArray[0] + this.roundArray[1] + this.roundArray[2] + this.roundArray[3];
		saveToStorage(this, HV_OVERVIEW)
	};
	this.reset = function () {
		deleteFromStorage(HV_OVERVIEW)
	};
	this.cloneFrom = clone;
	this.startTime = 0;
	this.lastHourlyTime = 0;
	this.exp = 0;
	this.credits = 0;
	this.lastEquipTime = 0;
	this.lastEquipName = "";
	this.equips = 0;
	this.lastArtTime = 0;
	this.lastArtName = "";
	this.artifacts = 0;
	this.roundArray = [0, 0, 0, 0];
	this.totalRounds = 0;
	this.isLoaded = false
}
function HVCacheStats() {
	this.load = function () {
		loadFromStorage(this, HV_STATS)
	};
	this.save = function () {
		saveToStorage(this, HV_STATS)
	};
	this.reset = function () {
		deleteFromStorage(HV_STATS)
	};
	this.cloneFrom = clone;
	this.rounds = 0;
	this.kills = 0;
	this.aAttempts = 0;
	this.aHits = [0, 0];
	this.aOffhands = [0, 0];
	this.sAttempts = 0;
	this.aDomino = [0, 0, 0, 0, 0, 0];
	this.aCounters = [0, 0];
	this.dDealt = [0, 0, 0];
	this.sHits = [0, 0];
	this.sInterfs = 0;
	this.sResists = 0;
	this.dDealtSp = [0, 0];
	this.absArry = [0, 0, 0];
	this.mAttempts = 0;
	this.dTaken = [0, 0];
	this.mHits = [0, 0];
	this.pDodges = 0;
	this.pEvades = 0;
	this.pParries = 0;
	this.pBlocks = 0;
	this.pResists = 0;
	this.mSpells = 0;
	this.overStrikes = 0;
	this.coalesce = 0;
	this.eTheft = 0;
	this.channel = 0;
	this.cureTotals = [0, 0, 0];
	this.cureCounts = [0, 0, 0];
	this.isLoaded = false
}
function HVCacheProf() {
	this.load = function () {
		loadFromStorage(this, HV_PROF)
	};
	this.save = function () {
		saveToStorage(this, HV_PROF)
	};
	this.reset = function () {
		deleteFromStorage(HV_PROF)
	};
	this.cloneFrom = clone;
	this.elemTotal = 0;
	this.divineTotal = 0;
	this.forbidTotal = 0;
	this.depTotal = 0;
	this.supportTotal = 0;
	this.curativeTotal = 0;
	this.weapProfTotals = [0, 0, 0, 0];
	this.armorProfTotals = [0, 0, 0, 0];
	this.isLoaded = false
}
function HVCacheRewards() {
	this.load = function () {
		loadFromStorage(this, HV_REWARDS)
	};
	this.save = function () {
		this.totalRwrds = this.artRwrd + this.eqRwrd + this.itemsRwrd;
		saveToStorage(this, HV_REWARDS)
	};
	this.reset = function () {
		deleteFromStorage(HV_REWARDS)
	};
	this.cloneFrom = clone;
	this.eqRwrd = 0;
	this.eqRwrdArry = [];
	this.itemsRwrd = 0;
	this.itemRwrdArry = [];
	this.itemRwrdQtyArry = [];
	this.artRwrd = 0;
	this.artRwrdArry = [];
	this.artRwrdQtyArry = [];
	this.tokenDrops = [0, 0, 0];
	this.totalRwrds = 0;
	this.isLoaded = false
}
function HVCacheShrine() {
	this.load = function () {
		loadFromStorage(this, HV_SHRINE)
	};
	this.save = function () {
		this.totalRewards = this.trophyArray.length + this.artifactsTraded;
		saveToStorage(this, HV_SHRINE)
	};
	this.reset = function () {
		deleteFromStorage(HV_SHRINE)
	};
	this.cloneFrom = clone;
	this.artifactsTraded = 0;
	this.artifactStat = 0;
	this.artifactAP = 0;
	this.artifactHath = 0;
	this.artifactHathTotal = 0;
	this.artifactCrystal = 0;
	this.artifactItem = 0;
	this.trophyArray = [];
	this.totalRewards = 0;
	this.isLoaded = false
}
function HVCacheDrops() {
	this.load = function () {
		loadFromStorage(this, HV_DROPS)
	};
	this.save = function () {
		saveToStorage(this, HV_DROPS)
	};
	this.reset = function () {
		deleteFromStorage(HV_DROPS)
	};
	this.cloneFrom = clone;
	this.dropChances = 0;
	this.itemArry = ["[Lesser Health Potion]", "[Scroll of Swiftness]", "[Average Health Potion]", "[Scroll of Shielding]", "[Greater Health Potion]", "[Scroll of Warding]", "[Superior Health Potion]", "[Scroll of the Avatar]", "[Godly Health Potion]", "[Scroll of Absorption]", "[Health Elixir]", "[Scroll of Shadows]", "[Lesser Mana Potion]", "[Scroll of Life]", "[Average Mana Potion]", "[Scroll of the Gods]", "[Greater Mana Potion]", "[Infusion of Flames]", "[Superior Mana Potion]", "[Infusion of Frost]", "[Godly Mana Potion]", "[Infusion of Lightning]", "[Mana Elixir]", "[Infusion of Storms]", "[Lesser Spirit Potion]", "[Infusion of Divinity]", "[Average Spirit Potion]", "[Infusion of Darkness]", "[Greater Spirit Potion]", "[Infusion of Gaia]", "[Superior Spirit Potion]", "[Soul Stone]", "[Godly Spirit Potion]", "[Flower Vase]", "[Spirit Elixir]", "[Last Elixir]", "[Token of Blood]", "[Bubble-Gum]", "[Token of Healing]", "[Crystal of Flames]", "[Chaos Token]", "[Crystal of Frost]", "[Crystal of Vigor]", "[Crystal of Lightning]", "[Crystal of Finesse]", "[Crystal of Tempest]", "[Crystal of Swiftness]", "[Crystal of Devotion]", "[Crystal of Fortitude]", "[Crystal of Corruption]", "[Crystal of Cunning]", "[Crystal of Quintessence]", "[Crystal of Knowledge]", " "];
	this.itemQtyArry = new Array(this.itemArry.length);
	this.itemQtyArry.init(0);
	this.itemDrop = 0;
	this.eqArray = [];
	this.eqDrop = 0;
	this.artArry = [];
	this.artQtyArry = [];
	this.artDrop = 0;
	this.isLoaded = false
}
function HVSettings() {
	this.load = function () {
		loadFromStorage(this, HV_SETTINGS)
	};
	this.save = function () {
		saveToStorage(this, HV_SETTINGS)
	};
	this.reset = function () {
		deleteFromStorage(HV_SETTINGS)
	};
	this.cloneFrom = clone;
	this.isTrackStats = true;
	this.isTrackRewards = false;
	this.isTrackShrine = false;
	this.isTrackItems = false;
	this.isWarnSparkTrigger = true;
	this.isWarnSparkExpire = true;
	this.isHighlightQC = true;
	this.warnOrangeLevel = 40;
	this.warnRedLevel = 35;
	this.warnAlertLevel = 25;
	this.isShowPopup = true;
	this.isNagHP = false;
	this.warnMode = [true, true, false, false];
	this.isShowHighlight = true;
	this.isAltHighlight = false;
	this.isShowDivider = true;
	this.isShowEndStats = true;
	this.isShowMonsterHP = true;
	this.isShowMonsterHPPercent = false;
	this.isShowMonsterMP = true;
	this.isShowMonsterElements = false;
	this.isShowMonsterDuration = true;
	this.isShowSelfDuration = true;
	this.isShowSidebarProfs = false;
	this.isShowRoundReminder = false;
	this.reminderMinRounds = 3;
	this.isAlertGem = true;
	this.isHideHVLogo = false;
	this.isChangePageTitle = false;
	this.customPageTitle = "HV";
	this.isColumnInventory = false
}
function HVMonster() {
	this.id = 0;
	this.maxHp = 0;
	this.currHp = 0;
	this.name = ""
}
function ElementalStats() {
	this.resist = "";
	this.imperv = "";
	this.majWeak = "";
	this.minWeak = ""
};
 