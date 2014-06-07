// ==UserScript==
// @name           pom spotter
// @namespace      pom
// @include        http://torax.outwar.com/*
// ==/UserScript==

<!-- this spotter only works if no raid is up -->

var file = 'F:\\muziek\\rock - metal\\Stone Sour\\Stone Sour - Come What(ever) May\\09 - Stone Sour - Socio.mp3';	<!-- location of the file firefox should play when a god is spottet -->
var enabled = true;	<!-- turns the spotter on or off: true = on, false = off -->

var gods = new Array();
<!-- old gods -->


<!-- lords gods -->
gods['Lord Varan'] = new Array();
gods['Lord Varan']['spotted'] = false;	<!-- turns on the spotter for a specific god: true = on, false = off -->

gods['Lord Narada'] = new Array();
gods['Lord Narada']['spotted'] = false;	<!-- turns on the spotter for a specific god: true = on, false = off -->

<!-- pot gods -->
gods['Ebliss, Fallen Angel of Despair'] = new Array();
gods['Ebliss, Fallen Angel of Despair']['spotted'] = false;	<!-- turns on the spotter for a specific god: true = on, false = off -->

gods['Brutalitar, Lord of the Underworld'] = new Array();
gods['Brutalitar, Lord of the Underworld']['spotted'] = false;	<!-- turns on the spotter for a specific god: true = on, false = off -->

<!-- foundry gods -->
gods['Tsort'] = new Array();
gods['Tsort']['spotted'] = false;	<!-- turns on the spotter for a specific god: true = on, false = off -->

<!-- ceos gods -->
gods['Baron Mu, Dark Rider of the Undead'] = new Array();
gods['Baron Mu, Dark Rider of the Undead']['spotted'] = false;	<!-- turns on the spotter for a specific god: true = on, false = off -->

gods['Freezebreed, The Frozen Manipulator'] = new Array();
gods['Freezebreed, The Frozen Manipulator']['spotted'] = true;	<!-- turns on the spotter for a specific god: true = on, false = off -->	

gods['Melt Bane, The Forbidden Demon Dragon'] = new Array();
gods['Melt Bane, The Forbidden Demon Dragon']['spotted'] = false;	<!-- turns on the spotter for a specific god: true = on, false = off -->	

gods['Lakebane'] = new Array();
gods['Lakebane']['spotted'] = false;	<!-- turns on the spotter for a specific god: true = on, false = off -->

<!-- new gods -->
gods['Sylvanna TorLai'] = new Array();
gods['Sylvanna TorLai']['spotted'] = false;	<!-- turns on the spotter for a specific god: true = on, false = off -->

gods['Lacuste of the Swarm'] = new Array();
gods['Lacuste of the Swarm']['spotted'] = false;	<!-- turns on the spotter for a specific god: true = on, false = off -->

gods['Anvilfist'] = new Array();
gods['Anvilfist']['spotted'] = false;	<!-- turns on the spotter for a specific god: true = on, false = off -->

gods['Gorganus of the Wood'] = new Array();
gods['Gorganus of the Wood']['spotted'] = false;	<!-- turns on the spotter for a specific god: true = on, false = off -->

gods['Ormsul the Putrid'] = new Array();
gods['Ormsul the Putrid']['spotted'] = false;	<!-- turns on the spotter for a specific god: true = on, false = off -->


Array.prototype.contains = function(obj) {
  for (variable in  gods)
  {
	if(variable == obj)
	{
		return true;
	}
  }  
  return false;
}


String.prototype.startsWith = function(str)
{return (this.match("^"+str)==str);}

function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

function refresh(){
	location.href=location.href;
}

if ( document.URL.indexOf("ow_community") != -1 ) {

	var doc = document;
	if (doc && doc != null && enabled)
	{
		<!--doc.getElementsByTagName('body')[0].innerHTML = doc.getElementsByTagName('body')[0].innerHTML  + 'function statspopup(e, thetext, thecolor, thewidth){	alert("schaap"); }';	 -->
		
		var indexNewGuardian = doc.getElementsByTagName('body')[0].innerHTML.indexOf('guardians:');
		var godfound = false;
		if(indexNewGuardian != -1)
		{
			var indexEndNewGuardian = doc.getElementsByTagName('body')[0].innerHTML.indexOf('</td>',indexNewGuardian);
		
			var html = doc.getElementsByTagName('body')[0].innerHTML.substring(parseFloat(indexNewGuardian) + 22, indexEndNewGuardian).split('<br>');
			
			for(var i = 0; i < html.length; i++)
			{
				var godname = html[i].substring(0,html[i].indexOf('has'));
				
				if(gods.contains(trim(godname)))
				{
					if(gods[trim(godname)]['spotted'])
					{
						godfound = true;
						location.href = 'file:///' + file;
					}
				}
			}			
		}
		if(!godfound){	refresh();	}
	}
}
