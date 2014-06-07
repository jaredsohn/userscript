// ==UserScript==
// @name          Kansalaisen Karttapaikka Fetch_map - tool
// @namespace     http://kino.wippiespace.com/
// @description   Generates a batch command for Fetch_map-tool that fetches a map of a current position in Kansalaisen Karttapaikka.
// @include       http://kansalaisen.karttapaikka.fi/*
// ==/UserScript==
// last update:2.1.2009
// version 0.02
//  please let me know if the script stops working, email kino at kolumbus dot fi

function gup( name )
	// Thanks to Netlobo.com for this function
	// http://www.netlobo.com/url_query_string_javascript.html
	{
	  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	  var regexS = "[\\?&]"+name+"=([^&#]*)";
	  var regex = new RegExp( regexS );
	  var results = regex.exec( window.location.href );
	  if( results == null )
	    return "";
	  else
	    return results[1];
	}

var scale = '1:' + gup('scale');
var ypos = gup('cy');
var xpos = gup('cx');

var fmap = document.createElement("div");
fmap.id = "fetch_map_tool";

var pre = '<p><input type="text" onFocus="select();" size="100" id="fetch_map_command"  value="';
var fetch_map_command = 'FETCH_MAP kartannimi ' + ypos + ' ' + xpos + ' 2 2 ' + scale;
var after = '"></p>';
fmap.innerHTML= (pre + fetch_map_command + after);

document.body.insertBefore(fmap, (document.getElementById("footer")).parentNode);
