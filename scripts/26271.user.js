//Created by Rob Mitchell
// --------------------------------------------------------------------
//  This will convert the Sang Run gauge to the bridge gauge
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Sang Run to Bridge Conversion
// @namespace     
// @description   Adds the Bridge Gauge to the American Whitewater page for the Upper Yough.  The Bridge gauge is the primary gauge used by kayakers.
// @include       http://www.americanwhitewater.org/*
// @include       
// @exclude       
// ==/UserScript==

function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

var river_level, bridge_level, sang_run_level, srElement,river_stats_div ;
var river_name, river_level_div, friendsville_level,river_max,river_min;
var river_min_max_div;

  river_level_div = xpath("//div[@class='rv-unit']");
  river_stats_div = xpath("//h2"); 
river_min_max_div = xpath("//table[@class='nodecoration']");
		river_min = river_min_max_div.snapshotItem(1);
       river_name = river_stats_div.snapshotItem(1).textContent;

if (river_name == "3. Upper (Sang Run Road to Friendsville)") 
  
  {

	friendsville_level = river_level_div.snapshotItem(0).textContent;
	bridge_level = friendsville_level - 1.25;
	river_level_div.snapshotItem(0).textContent = 'Bridge: ' + bridge_level + ' | ' + 'Friendsville: ' + friendsville_level ;

  }



