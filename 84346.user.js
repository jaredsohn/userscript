// ==UserScript==
// @name           Statystyki na mapie
// @author         Wszechmogący
// @include        http://*.grepolis.*/game/map*
// @description    Skrypt dodaje zakładkę z wykresami punktów i rankingu gracza po kliknięciu na jego miasto.
// ==/UserScript== 
(function () {
	//access to window object cross-browser
	var uW;
	if (typeof unsafeWindow === 'object'){
		uW = unsafeWindow;
	} else {
		uW = window;
	}

	//get jQuery
	var $ = uW.jQuery;

	//add a console function
	var l;
	if (typeof uW.console === 'object' && typeof uW.console.log === 'function') {
		l = uW.console.log;
	} else {
		l = function () {
			return false;
		};
	}
	//Object.create() by Douglas Crockford
	if(typeof Object.create !== 'function'){
		Object.create = function (o) {
			var F = function () {};
			F.prototype = o;
			return new F();
		};
	} 

	var GrepoStat = (function () {
		var TownInfo;
		var init_old;
		var PlayerID = 0;

		var init_new = function () {
			AppendStatTab();
			return init_old.apply(TownInfo, arguments);
		};

		var AppendStatTab = function () {
			var Tabs = $("#town_info_tabs");
			if (Tabs.html() == null) {
				window.setTimeout(AppendStatTab, 100);
				return;
			}
			$('#info_tab_window_bg').tabs("add", "#town_stats", "<img src='http://hitskin.com/themes/14/07/25/i_statistics.png' style='position: relative; top: 4px; left: 4px;' />");

			$('#info_tab_window_bg').bind("tabsload", TabLoad);
			$('#info_tab_window_bg').bind("tabsselect", TabSelect);
		};

		var TabLoad = function (event, ui) {
			if (ui.index == 0) {
				var href = $("#towninfo_towninfo .list_item_left a").attr("href");
				PlayerID = getUrlVars(href)["player_id"];
			}
		};
		var TabSelect = function (event, ui) {
			if (ui.index == 6) {
				var world = window.location.host.split('.')[0];
				var stats="<p id='Stats' style='height:280px;width:460px;margin:5px 10px;overflow:auto;'>";
				stats+="Punkty:<br /><img src='http://pl.grepostats.com/image/"+world+"/graph?action=player&type=points&player_id="+PlayerID+"' />";
				stats+="<br />Ranking:<br /><img src='http://pl.grepostats.com/image/"+world+"/graph?action=player&type=rank&player_id="+PlayerID+"' />";
				stats+="</p>";
				$(ui.panel).after(stats);
			}
			else
			{
				$("#Stats").remove();
			}
		};

		return function () {
			if (document.URL.indexOf("game/map") != -1) 
			{
				TownInfo = uW.TownInfo;
				init_old = TownInfo.init;
				TownInfo.init = init_new;
			}
		};
	}());

	GrepoStat();
}());

function getUrlVars(path) {
	var vars = {};
	var parts = path.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
	});
	return vars;
}