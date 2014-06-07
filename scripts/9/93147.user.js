// ==UserScript==
// @name           grepoMap
// @author         Huck80 (Krishna)
// @namespace      Huck
// @include        http://*.grepolis.*/game/map*
// @version        1.4
// @description    Display towns and farms informations on Grepolis map 
// @source         http://userscripts.org/scripts/show/82399
// ==/UserScript==

/*
*  Based on http://userscripts.org/scripts/show/79520
*
*  1.4 done flag moved
*  1.3 : +red border forl filtered towns using grpm_FILTER : 
*  - points_mini : Points minimum
* 	
			var towns = _wmap.mapData.getTowns(
				_wmap.mapTiles.tile.x, 
				_wmap.mapTiles.tile.y, 
				_wmap.mapTiles.tileCount.x, 
				_wmap.mapTiles.tileCount.y
			);
			for (var townNr in towns ){
				var town = towns[townNr];
				if (!done[town.id]){
				if ( town.mood ){
					var tel = $('#farm_town_'+town.id);
					if (tel && tel.length > 0){
						var clsTrade = ( town.mood>=80 && town.ratio>=1)?' mTrade':'';
						tel.html( '<table class="mFInfo'+clsTrade+'"><tr><td><span class="mTownname">'+town.name+'</span></td><td>	done[town.id]=true;
					}
				}else if (town.player_name.points){
				   var tw = $("#town_"+town.id);
					if (tw && tw.length > 0){
            var cls = '';
            if (town.player_name == uW.Game.player_name){
           N0 FUNCTION!!!!!!