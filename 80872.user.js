// ==UserScript==
// @name           grepoShowFarm
// @author         wBw + balping
// @license        Do what you want!
// @namespace      wBs_
// @include        http://*.grepolis.*/game/map*
// @version        2.0
// ==/UserScript==

var uW;
if (typeof unsafeWindow === 'object'){
	uW = unsafeWindow;
} else {
	uW = window;
}


function init () {

	
	//get jQuery
	var $ = uW.jQuery;


	with( uW )
	{
		if ( WMap && WMap.mapData )
		{
			var towns = WMap.mapData.getTowns(
				WMap.mapTiles.tile.x, 
				WMap.mapTiles.tile.y, 
				WMap.mapTiles.tileCount.x, 
				WMap.mapTiles.tileCount.y
			);
			
			$('head').append(
			"<style type='text/css'>"+
			".mFInfo { color:#FFCC66; font-size:0.7em; border:0px; margin-top:10px;margin-left:20px;text-shadow:0.1em 0.1em 0.2em black;}"+
			".mFOK { color:#40E040;  }"+
			".mFDanger { color:#E80000;}"+
			"</style>" );
			
			for (var townNr in towns )
			{
				var town = towns[townNr];
			
				if ( town.mood )
				{
					var min = ((100-town.mood)/5)*60;
					var minm = min%60;
					var h = (min-minm)/60;

					var today=new Date();

					var tel = $("#farm_town_"+town.id );
					if (tel && tel.length > 0)
					{
						tel.html( '<table class=mFInfo><tr><td align="center"><span class="' 
						+ (( town.mood < 70 ) ? "mFDanger" : "mFOK" )+'">'
						+h+":"+minm+'&nbsp;'+town.mood+ '%</span>&nbsp;'+town.strength+'%</td></tr><tr><td><span class="resource_' + town.demand + '_icon"></span><span style="color:#E0E0E0;" class="popup_ratio">' + town.ratio + '</span><span class="resource_' + town.offer + '_icon"></span></td></tr></table>');
					}
				}
			}
		}
	}		
};

setTimeout( init, 250 );