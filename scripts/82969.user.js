// ==UserScript==
// @name           Premium bar for grepolis
// @namespace      www.grepolis.com
// @description    Premium bar for grepolis 
// @include        http://*.grepolis.*/game/*
// @exclude	   http://forum.*.grepolis.*/* 
// @version        0.4.2 last update
// @require        http://userscripts.org/scripts/source/89114.user.js
// ==/UserScript==.
//last update
//new bar code
//stop bar from moving 
//add grepolis Stat tab--http://userscripts.org/scripts/source/89114
//did try to stop 2nd bar from moving but it did not work




//START OF MAP/FARM
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
			".mFInfo { color:#FFCC66; font-size:13px; border:1px; margin-top:10px;margin-left:20px;text-shadow:1px 1px 2px red;}"+
			".mFOK { color:#00ff00;  }"+
			".mFDanger { color:#ae0eae;}"+
			"</style>" );
			
			for (var townNr in towns )
			{
				var town = towns[townNr];
			
				if ( town.mood )
				{
					var tel = $("#farm_town_"+town.id );
					if (tel && tel.length > 0)
					{
						tel.html( '<table class=mFInfo><tr><td align="center"><span class="' 
						+ (( town.mood < 70 ) ? "mFDanger" : "mFOK" )+'">'
						+town.mood+ '%</span>&nbsp;'+town.strength+'%</td></tr><tr><td><span class="resource_' + town.demand + '_icon"></span><span style="color:#000000;" class="popup_ratio">' + town.ratio + '</span><span class="resource_' + town.offer + '_icon"></span></td></tr></table>');
					}
				}
			}
		}
	}		
};

setTimeout( init, 250 );
setTimeout( init, 250 );
//END OF MAP/FARM

// START REMOVE GREPOLIS FROM TAB
var matches = {
"^http://[a-z0-9\s]+\.grepolis\.com/": "^grepolis - "
};

for (var url in matches) {
    if (location.href.match(new RegExp(url))) {
        document.title = document.title.replace(new RegExp(matches[url],'i'),'');
        break;
    }
}
//END OF REMOVE GREPOLIS FROM TAB
//START OF PREMIUM BAR CODE
function do_romplayer_script() {
html_insert_it(window.document,document.getElementById('header'),'<ul class="toolbar" style="position:absolute; top:65px; left:125px"><li><a href="building_main?action=index&town_id={town}&h={token}"><IMG src="/images/game/toolbar/main.png" alt="Senat" width="16" height="16" align="middle" border="1"></a></li>      <li><a href="building_barracks?action=index&town_id={town}&h={token}"><img src="http://static.grepolis.com/images/game/toolbar/barracks.png" alt="" width="16" height="16" /> </a></li>     <li><a href="building_docks?action=index&town_id={town}&h={token}"><img src="http://static.grepolis.com/images/game/toolbar/docks.png" alt="" width="16" height="16" />  </a></li><li><a href="building_place?action=index&town_id={town}&h={token}"><img src="/images/game/toolbar/place.png" alt="" width="16" height="16" />  </a></li><li><a href="building_academy?action=index&town_id={town}&h={token}"><img src="/images/game/toolbar/academy.png" alt="" width="16" height="16" />  </a></li><li><a href="building_market?action=index&town_id={town}&h={token}"><img src="/images/game/toolbar/trade.png" alt="" width="16" height="16" />  </a></li><li><a href="building_hide?action=index&town_id={town}&h={token}"><img src="http://uk6.tribalwars.co.uk/graphic/buildings/hide.png" alt="" width="16" height="16" />  </a></li><li><a href="building_farm?action=index&town_id={town}&h={token}"><img src="/images/game/res/pop.png" alt="" width="16" height="16" />  </a></li><li><a href="building_temple?action=index&town_id={town}&h={token}"><img src="http://static.grepolis.com/images/game/res/favor.png" alt="" width="16" height="16" />  </a></li><li><a href="building_stoner?action=index&town_id={town}&h={token}"><img src="http://static.grepolis.com/images/game/res/stone.png" alt="" width="16" height="16" />  </a></li><li><a href="building_lumber?action=index&town_id={town}&h={token}"><img src="http://static.grepolis.com/images/game/res/wood.png" alt="" width="16" height="16" />  </a></li><li><a href="building_ironer?action=index&town_id={town}&h={token}"></a></li><li><a href="/game/building_ironer?town_id=1471"<img src="http://static.grepolis.com/images/game/res/iron.png" alt="" width="16" height="16" />  </a></li><li><a href="http://www.grepolismaps.org/" target="_blank"><img src="http://i51.tinypic.com/iej80y.jpg" alt="" width="20" height="20" />  </a></li><li><a href="http://www.grepostats.com/" target="_blank"><img src="http://i52.tinypic.com/280se91.jpg" alt="" width="20" height="20" />  </a></li><li><a href="../../../admin/auth?world_id=master&redirect=%2Fadmin%2Fauto%3Faction%3Dauth/" target="_blank"><img src="http://static.grepolis.com/images/game/start/favicon.ico" alt="" width="18" height="18" />  </a></li><li><a href="http://userscripts.org/scripts/source/82969.user.js" target="_blank"><img src="http://userscripts.org/images/script_icon.png" alt="" width="13" height="13" />  </a></li> ',false,false);
}; // Ends do_romplayer_script
window.addEventListener("load", function() { do_romplayer_script() }, false);
var gromplayerBundle = Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService);
var mystrings = gromplayerBundle.createBundle("chrome://romplayer/locale/romplayerCore.properties");
var romplayerromplayercouldntfi1 = mystrings.GetStringFromName("romplayerromplayercouldntfi1");
var romplayerthisusuallyhappens = mystrings.GetStringFromName("romplayerthisusuallyhappens");


function insertAfter(newNode, target) {
    var parent = target.parentNode;
    var refChild = target.nextSibling;
    if(refChild != null)
parent.insertBefore(newNode, refChild);
    else
parent.appendChild(newNode);
};
function html_insert_it(doc, element, new_html, before, insert_as_block) {
  var new_element;
  if (insert_as_block) {
    new_element = doc.createElement ("DIV");
  } else {
    new_element = doc.createElement ("SPAN");
  };
  new_element.innerHTML = new_html;
  if (before) {
      element.parentNode.insertBefore(new_element, element);
  } else {
      insertAfter(new_element, element);
  };
};
// END OF BAR CODE