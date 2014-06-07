// ==UserScript==
// @name          Sfe Espionage Explorer Detached
// @namespace     http://imaginarydevelopment.com/Sfc
// @description   Starfleet Commander : Parse and summarize all espionage reports in your inbox (this one does not auto-update or require the site to be up)
// @include       http://playstarfleet.com/messages*
// @include       http://www.playstarfleet.com/messages*
// @include       http://playstarfleet.com/messages?*
// @include       http://www.playstarfleet.com/messages?*
// @exclude       http://facebook.com/*
// @exclude       http://www.facebook.com/*
// ==/UserScript==

(function () {
	/* Copyright 2010 Imaginary Development. All rights reserved*/
	var repeatIfQuerified = true;
	function DoOnceJquerified() {
		if (typeof ($jq) == 'undefined') {
			if (typeof ($) != 'undefined') {
				$jq = $;
			} else {
				return alert('$jq->jquerify not defined');
			}
		}
		Number.prototype.Thousand = function () { return this * 1000; };
		Number.prototype.Million = function () { return this.Thousand() * 1000; };
		Number.prototype.Billion = function () { return this.Million() * 1000; };
		//http://www.tek-tips.com/faqs.cfm?fid=6620
		String.prototype.startsWith = function (str)
		{ return (this.match("^" + str) == str) }

		if ($jq('html#facebook').length > 0) {
			alert("Script doesn't work in facebook");
			throw ("Facebook detected");
		}
		if ($jq('div#content.messages').length != 1) {
			alert('This script is for your starfleet commander message inbox');
			throw "Not on message screen";
		}


		//Analyzer


		function BaseShip() {
			this.Attack = -1;
			this.Shield = -1;
			this.Hull = -1;
			this.MakesDebris = null;

			this.InitializeAll = function (attack, shield, hull, makesDebris, ore, crystal, hydro, battleCalc) {
				this.Attack = attack;
				this.Shield = shield;
				this.Hull = hull;
				this.MakesDebris = makesDebris || 0;
				this.OreCost = ore || 0;
				this.CrystalCost = crystal || 0;
				this.HydrogenCost = hydro || 0;
				this.BattleCalc = battleCalc;
			}; //end InitializeAll
			this.Debris = function (count) {
				if (this.MakesDebris === 1) {
					return { OreDebris: (this.OreCost * count * .3) || 0, CrystalDebris: (this.CrystalCost * count * .3) || 0 };
				} // end if
				return { OreDebris: 0, CrystalDebris: 0 };
			}; //End Debris function
		} //end BaseShip type

		function GetShipBases(shipClass) {
			var result = new BaseShip();
			result.Name = shipClass;
			switch (shipClass) {
				case 'Hermes':
				case 'Hermes_class': result.InitializeAll(0, 0, 100, 1, 0, 1000, 0, 1); break;
				case 'Helios':
				case 'Solar_satellite': result.InitializeAll(1, 1, 200, 1, 0, 2000, 500, 14); break;
				case 'Artemis':
				case 'Artemis_class': result.InitializeAll(50, 10, 400, 1, 3000, 1000, 0, 4); break;
				case 'Atlas':
				case 'Atlas_class': result.InitializeAll(5, 10, 400, 1, 2000, 2000, 0, 2); break;
				case 'Apollo':
				case 'Apollo_class': result.InitializeAll(150, 25, 850, 1, 6000, 2500, 0, 5); break;
				case 'Charon':
				case 'Charon_class': result.InitializeAll(1, 25, 800, 1, 4000, 4000, 1000, 15); break;
				case 'Hercules':
				case 'Hercules_class': result.InitializeAll(5, 25, 1200, 1, 6000, 6000, 0, 3); break;
				case 'Dionysus':
				case 'Dionysus_class': result.InitializeAll(1, 10, 1600, 1, (10).Thousand(), 6000, 2000, 6); break;
				case 'Poseidon':
				case 'Poseidon_class': result.InitializeAll(400, 50, 2700, 1, 20000, 7000, 2000, 7); break;
				case 'Gaia':
				case 'Gaia_class': result.InitializeAll(50, 100, 3000, 1, (10).Thousand(), (20).Thousand(), (10).Thousand(), 8); break;
				case 'Athena':
				case 'Athena_class': result.InitializeAll(1000, 200, 6000, 1, (45).Thousand(),
                     (15).Thousand(), 0, 9); break;
				case 'Ares':
				case 'Ares_class': result.InitializeAll(1000, 500, 7500, 1, (50).Thousand(), (25).Thousand(),
                     (15).Thousand(), 10); break;
				case 'Hades':
				case 'Hades_class': result.InitializeAll(700, 400, 7000, 1,
                        (30).Thousand(), (40).Thousand(), (15).Thousand(), 11); break;
				case 'Prometheus':
				case 'Prometheus_class': result.InitializeAll(2000, 500, (11).Thousand(), 1, (60).Thousand(), (50).Thousand(), (15).Thousand(), 12); break;
				case 'Zeus':
				case 'Zeus_class': result.InitializeAll((200).Thousand(), (50).Thousand(), (900).Thousand(), 1, (5).Million(), (4).Million(), (1).Million(), 13); break;
				case 'Hephaestus':
				case 'Roaming_planet': result.InitializeAll(0, (150).Thousand(), (4).Million(), 1, (20).Million(), (20).Million(), (10).Million(), 16); break;
				case 'Missile':
				case 'Missile Battery':
				case 'Missile_turret': result.InitializeAll(80, 20, 200, 0, 2000, 0, 0, 1); break;
				case 'Laser':
				case 'Laser Cannon':
				case 'Laser_turret': result.InitializeAll(100, 25, 200, 0, 1500, 500, 0, 2); break;
				case 'Pulse':
				case 'Pulse_cannon': result.InitializeAll(250, 100, 800, 0, 6000, 2000, 0, 3); break;
				case 'Particle':
				case 'Particle_cannon': result.InitializeAll(150, 500, 800, 0, 2000, 6000, 0, 4); break;
				// case ABM?                     
				case 'Large':
				case 'Large Decoy':
				case 'Large_decoy': result.InitializeAll(0, (10).Thousand(), (10).Thousand(), 0, (50).Thousand(), (50).Thousand(), 0, 8); break;

				case 'Decoy': result.InitializeAll(0, 2000, 2000, 0, (10).Thousand(), (10).Thousand(), 0, 7); break;
				// case IBM?                                                                
				case 'Gauss':
				case 'Gauss_cannon': result.InitializeAll(1100, 200, 3500, 0, (20).Thousand(), (15).Thousand(), 2000, 5); break;

				case 'Plasma':
				case 'Plasma_turret': result.InitializeAll(3000, 300, (10).Thousand(), 0, (50).Thousand(), (50).Thousand(), (30).Thousand(), 6); break;

				default:
					break;
			} // end switch
			return result;
		} //end function Get Ship Bases

		function ResourceSummary(totalAmount) {
			if (typeof (totalAmount) != 'number')
				throw "Invalid total";
			if (totalAmount < (1).Million())
				return '' + Math.round(totalAmount / 1000);
			if (totalAmount < (1).Billion()) {
				return '' + Math.round(totalAmount / (1).Million()) + 'm';
			}
			return '' + Math.round(totalAmount / (1).Billion()) + 'b';

		}

		function DebrisSummary(ore, crystal) {
			if (typeof (ore) != 'number')
				throw "Invalid oreDebris";
			if (typeof (crystal) != 'number')
				throw "Invalid crystalDebris";
			return '' + Math.ceil((ore + crystal) / 20000);
		}

		function ShipSummary(shipCount) {
			if (typeof (shipCount) != 'number')
				throw "Invalid shipCount";
			return shipCount;
		}

		function BattleCalcLink(queryParams) {
			return '<a target="_blank" href="' + queryParams + '">BattleCalc</a>';
		}
		//Parse Report
		function ParseReport(reportDom, to) {
			var espionageText = $jq(reportDom).text();
			var resourceTotal = 0;
			var oreDebris = 0;
			var crystalDebris = 0;
			var shipTotal = 0;
			var defenseTotal = 0;
			var urlInit = false;
			var url = 'http://www.battlecalc.com/?';
			//could optimize start index being reused or lopping off used parts of search text?
			$jq.each(['ore', 'crystal', 'hydrogen'], function (index, value) {
				var resourceIndex = espionageText.search(EspionageTypeSearch(value));
				if (resourceIndex >= 0) {
					var resourceCount = EspionageTypeCount(espionageText, resourceIndex);
					resourceTotal += resourceCount;
					if (urlInit === true)
						url += '&';
					urlInit = true;
					url += value + '=' + resourceCount;
				}
			}); //each each loop
			$jq.each(['Hermes', 'Helios', 'Artemis', 'Atlas', 'Apollo', 'Charon', 'Hercules',
                    'Dionysus', 'Poseidon', 'Gaia', 'Athena', 'Ares', 'Hades', 'Prometheus', 'Zeus',
                     'Missile', 'Laser', 'Pulse', 'Particle', 'Decoy', 'Gauss', 'Plasma', 'Large'], function (index, value) {
                     	var shipIndex = -1;
                     	var searchText = value;
                     	switch (value) {
                     		case 'Laser':
                     			searchText = 'Laser\\s*Cannon'; break;
                     		case 'Plasma':
                     			searchText = 'Plasma\\s*Cannon'; break;
                     		case 'Missile':
                     			searchText = 'Missile\\s*Battery'; break;
                     		case 'Pulse':
                     			searchText = 'Pulse\\s*Cannon'; break;
                     		case 'Particle':
                     			searchText = 'Particle\\s*Cannon'; break;
                     		case 'Large':
                     			searchText = 'Large\\s*Decoy'; break;
                     		default:
                     			break;
                     	}
                     	shipIndex = espionageText.search(EspionageTypeSearch(searchText));
                     	if (shipIndex >= 0) {
                     		var shipCount = EspionageTypeCount(espionageText, shipIndex);

                     		var ship = GetShipBases(value);
                     		if (typeof (ship) == 'undefined')
                     			return true;
                     		if (ship.MakesDebris === 1)
                     			shipTotal += shipCount;
                     		else
                     			defenseTotal += shipCount;
                     		if (typeof (ship.BattleCalc) != 'undefined') {

                     			if (urlInit === true)
                     				url += '&';
                     			urlInit = true;
                     			url += 'def' + (ship.MakesDebris === 1 ? 'ship' : 'ens') + ship.BattleCalc + '=' + shipCount;
                     		}
                     		//calculate debris
                     		if (typeof (ship.Debris) != 'undefined') {
                     			var debris = ship.Debris(shipCount);
                     			oreDebris += debris.OreDebris;
                     			crystalDebris += debris.CrystalDebris;
                     		}


                     	}
                     }); //end ships and defenses
			$jq.each(['Armor', 'Weapons', 'Shield'], function (index, tech) {
				var shipIndex = espionageText.search(EspionageTypeSearch(tech));
				if (shipIndex >= 0) {
					var techLevel = EspionageTypeCount(espionageText, shipIndex);
					var param = null;
					switch (tech) {
						case 'Armor':
							param = 'defarmour'; break;
						case 'Weapons':
							param = 'defweapon'; break;
						case 'Shield':
							param = 'defshield'; break;

					}
					if (typeof (param) == 'string') {
						if (urlInit === true)
							url += '&';
						urlInit = true;
						url += param + '=' + techLevel;

					}
				}
			});

            $jq(to).html(BattleCalcLink( url  )+'\n<br />');
			$jq.each(['Ore\\s*Mine', 'Crystal\\s*Mine', 'Hydrogen\\s*Synthesizer'], function (index, mine) {

				var mineRegexp = new RegExp(mine + '\\s*:\\s*');
				var mineMatch = mineRegexp.exec(espionageText);
				if (mineMatch == null)
					return false;
				var mineIndex = mineMatch.index;
				if (mineIndex >= 0) {

					var mineLevel = EspionageTypeCount(espionageText, mineIndex);
					var mineFormula = function () { return mineLevel * Math.pow(1.1, mineLevel); };

					switch (mine) {

						case 'Ore\\s*Mine':
							var outputHr = 30 * mineFormula() + 20;
							$jq(to).html($jq(to).html() + 'Ore/Day:' + Math.round(outputHr * 24) + '\n<br />');
							break;
						case 'Crystal\\s*Mine':
							var outputHr = 20 * mineFormula() + 10;
							$jq(to).html($jq(to).html() + 'Crystal/Day:' + Math.round(outputHr * 24) + '\n<br />');
							break;
						case 'Hydrogen\\s*Synthesizer':
							var outputHr = 12 * mineFormula();
							$jq(to).html($jq(to).html() + 'Hydrogen/Day:' + Math.round(outputHr * 24));
							break;
					}

				}
			});
			return {
				Plunder: ResourceSummary(resourceTotal / 2),
				Atlas: (Math.ceil(resourceTotal / 10000)),
				Ships: ShipSummary(shipTotal),
				Recyclers: DebrisSummary(oreDebris, crystalDebris),
				Defenses: defenseTotal //,
				//Url: url
			};
		}
		function EspionageTypeCount(input, index) {
			var shortInput = input.substr(index);
			var matches = shortInput.match('[0-9]+[,0-9]*[0-9]*');
			var match = matches[0];
			return parseInt(match.replace(/,/g, ''), 10);
		}

		//function SanitizeEspionage(input) {
		//return input.replace('Anti-Ballistic Missile', 'ABM').replace(/ /g, '');
		// }
		function EspionageTypeSearch(type) {
			return type + '\s*[a-zA-z ]*\s*:\s*';
		}
		//End ParseReports
		//Get message titles first so you can attach to them later
		var reports = $jq("table#messages tbody tr.message").has("td.subject:contains('Espionage Report for')");
		reports.each(function (index, reportHeader) {

			//get sender for final summary location
			var senderTd = $jq('td.sender', reportHeader);
			//get actual report
			//var msgContent = $jq("+ tr.message_content", reportHeader);
			var msgContent = $jq(reportHeader).next('tr.message_content');
			var report = $jq('div.text', $jq(msgContent));
			var to = $jq('div.to', $jq(msgContent));
			if (report.length !== 1)
				throw "Failed to find report content";
			var summaryData = ParseReport(report, to);

			// { Plunder: ResourceSummary(resourceTotal / 2), Ships: ShipSummary(shipTotal),
			//	Debris: DebrisSummary(oreDebris, crystalDebris), Defenses: defenseTotal, Url: url};
			var summary = "A:" + (summaryData.Atlas) + ',S' + summaryData.Ships + ',R' + summaryData.Recyclers +
                                ',D:' + summaryData.Defenses;
			//display summary
			$jq(senderTd).html('<span title="Plunder,Ships,Recyclers,Defenses">' + summary + '</span>');
		});
		// end *analyzer*

	} //end doOnceJquerified


	var el = document.createElement('div'), b = document.getElementsByTagName('body')[0]; otherlib = false, msg = ''; el.style.position = 'fixed'; el.style.height = '32px'; el.style.width = '220px'; el.style.marginLeft = '-110px'; el.style.top = '0'; el.style.left = '50%'; el.style.padding = '5px 10px 5px 10px'; el.style.zIndex = 1001; el.style.fontSize = '12px'; el.style.color = '#222'; el.style.backgroundColor = '#f99'; if (typeof jQuery != 'undefined') {
		msg = 'EspionageExplorer loaded. This page already using jQuery v' + jQuery.fn.jquery;
		if (repeatIfQuerified)
			DoOnceJquerified();
		return showMsg();
	} else if (typeof $ == 'function') { otherlib = true; } function getScript(url, success) { var script = document.createElement('script'); script.src = url; var head = document.getElementsByTagName('head')[0], done = false; script.onload = script.onreadystatechange = function () { if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) { done = true; success(); } }; head.appendChild(script); } getScript('http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js', function () {
		if (typeof jQuery == 'undefined') { msg = 'Sorry, but jQuery wasn\'t able to load'; } else {

			msg = 'EspionageExplorer loaded. jQuerified with v' + jQuery.fn.jquery; if (otherlib) { msg += ' and noConflict(). Use $jq(), not $().'; }
			/* Begin AjaxBookmarklet.js */
			DoOnceJquerified();
			/* End AjaxBookmarklet.js */
		} return showMsg();
	}); function showMsg() { el.innerHTML = msg; b.appendChild(el); window.setTimeout(function () { if (typeof jQuery == 'undefined') { b.removeChild(el); } else { jQuery(el).fadeOut('slow', function () { jQuery(this).remove(); }); if (otherlib) { $jq = jQuery.noConflict(); } } }, 2500); }
})();
