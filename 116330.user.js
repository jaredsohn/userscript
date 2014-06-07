// ==UserScript==
// @name           grepoShowFarm
// @author         wBw + balping + ChM
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
			".mFInfo { color:#E6D3AE; font-size:0.7em; border:0px; margin-top:10px;margin-left:20px;text-shadow:0.1em 0.1em 0.2em black;}"+
			".mFOK { color:#40E040;  }"+
			".mFDanger { color:#E80000;}"+
			".mFCaution { color:#FCAD00;}"+
			"</style>" );
			
			// Define limit for safe harvesting (requires developped diplomacy)
			var lim1 = 60;
			var lim2 = 80;
			
			// Mood increase rate: 58.835 units per 24h as defined here
			// http://wiki.en.grepolis.com/wiki/Talk:Farming_villages

			// Time in milliseconds to increase mood by 1% in a world with speed 1
			// var ratio = 24.47522733067052*60000 *2;
			var ratio = 3600000;
			
			for (var townNr in towns )
			{
				var town = towns[townNr];
			
				if ( town.mood )
				{
					var delay = "";
					if( lim2 > town.mood )
					{
						// compute time when mood will reach limit with upper rounding
						var now = new Date();
						var end = new Date( (lim2 - town.mood + parseInt(now.getTime()/ratio)) * ratio );

						// format display value
						if( now.getDate() != end.getDate() )
							delay = '+';
						delay += parseInt( end.getHours() );
						min = parseInt( end.getMinutes() );
						if( min < 10 )
							delay += ':0'+min;
						else
							delay += ':'+min;
					}

					var tel = $("#farm_town_"+town.id );
					if (tel && tel.length > 0)
					{
						var style = "mFOK";
						if( town.mood < lim1 )
							style = "mFDanger";
						else if( town.mood < lim2 )
							style = "mFCaution";
						
						tel.html( '<table class=mFInfo><tr><td align="center">' + delay +'&nbsp;' + '<span class="' + style + '">'  
							+ town.mood+ '%&nbsp;'+town.strength+'%</span></td></tr>'
							+ ((town.mood < 80) ? "" : '<tr><td><span class="resource_' + town.demand + '_icon"></span><span style="color:#E0E0E0;" class="popup_ratio">' 
							+ town.ratio + '</span><span class="resource_' + town.offer + '_icon"></span></td></tr>') + '</table>');
					}
				}
			}
		}
	}		
};

setTimeout( init, 250 );