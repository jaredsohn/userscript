// ==UserScript==
// @name           grepoMap
// @author         LudoO
// @namespace      ludoo
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
*  - points_maxi : Points minimum
*  - size_mini : Size minimum
*  - size_maxi : Size maximum
*  - noally : No alliance
*
* sample : grpm_FILTER={points_mini:4000,points_maxi:8000};
*/
(function(){
	var ff = (typeof unsafeWindow !== 'undefined');
  var uW = ((ff)?unsafeWindow:window), $ = uW.jQuery;
  uW.grpm_FILTER =  uW.grpm_FILTER||{points_mini:4000,noally:true};
  var last = {x:0,y:0}, done={}, _wmap = uW.WMap;
	$('head').append(
			"<style type='text/css'>"+
			".mFInfo { color:#FFCC66; font-size:0.7em; border:0px; margin-top:0px;margin-left:20px;text-shadow:0.1em 0.1em 0.2em black;z-index:9999;}"+
			".mFOK { color:#40E040;  }"+
			".mTownname { color:#FFFFFF;  }"+
			".mFDanger { color:#FF3333;}"+
			".mTrade { border:1px solid yellow;  }"+
			".mMe { border:1px solid white; -moz-border-radius:10px;-webkit-border-radius:10px;}"+
			".mTrgt { border:1px solid red;}"+
			"</style>" );
			
function overlay() {
	_wmap = uW.WMap;
	if ( _wmap && _wmap.mapData ){			
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
						tel.html( '<table class="mFInfo'+clsTrade+'"><tr><td><span class="mTownname">'+town.name+'</span></td><td><span class="townname">'+(town.player_name||'')+'</span></td></tr><tr><td align="center"><span class="' 
						+ (( town.mood < 70 ) ? "mFDanger" : "mFOK" )+'">'
						+town.mood+ '%</span>&nbsp;'+town.strength+'%</td></tr><tr><td><span class="resource_' + town.demand + '_icon"></span><span style="color:#E0E0E0;" class="popup_ratio">' + town.ratio + '</span><span class="resource_' + town.offer + '_icon"></span></td></tr></table>');
						done[town.id]=true;
					}
				}else if (town.player_name){
				   var tw = $("#town_"+town.id);
					if (tw && tw.length > 0){
            var cls = '';
            if (town.player_name == uW.Game.player_name){
              cls += ' mMe';
            }else{
              var ok=0;
              if (typeof uW.grpm_FILTER.points_mini !=='undefined'){
                ok=(ok>=0 && town.points>=uW.grpm_FILTER.points_mini)?1:-1;
              }
              if (ok>=0 && typeof uW.grpm_FILTER.points_maxi !=='undefined'){
                ok=(town.points<=uW.grpm_FILTER.points_maxi)?1:-1;
              }
              if (ok>=0 && uW.grpm_FILTER.noally && !town.alliance_name ){
                ok=(!town.alliance_name)?1:-1;
              }
              if (ok>=0 && typeof uW.grpm_FILTER.size_mini !=='undefined'){
                ok=(town.size>=uW.grpm_FILTER.size_mini)?1:-1;
              }
              if (ok>=0 && typeof uW.grpm_FILTER.size_maxi !=='undefined'){
                ok=( town.size<=uW.grpm_FILTER.size_maxi)?1:-1;
              }
              if (ok>=0){
                cls += ' mTrgt';
              }
            }
						tw.html( '<table class="mFInfo'+cls+'"><tr>'+
						'<td><span class=mTownname><b>'+town.name+'</b> ('+town.points+'-'+town.size+')</span></td></tr>'+
						//'<tr><td><span class=townname>'+(town.player_name||'')+'</span></td></tr>'+
						//'<tr><td><span class=townname>'+(town.alliance_name||'')+'</span></td>'+
						'</tr></table>');
						done[town.id]=true;
					}
				}
				}
			}
		}
}

setTimeout( overlay, 100 );

function createSequence(method, fcn, scope){
        return (typeof fcn != 'function') ?
                this :
                function(){
                    var retval = method.apply(this || window, arguments);
                    fcn.apply(scope || this || window, arguments);
                    return retval;
         };
}
_wmap.setMoveContainerPos=createSequence(_wmap.setMoveContainerPos, overlay);

})();