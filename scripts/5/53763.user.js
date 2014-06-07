// ==UserScript==
// @name           crew profile expansion
// @namespace      pom crew profile
// @include        http://torax.outwar.com/crew_profile.php*
// ==/UserScript==

String.prototype.startsWith = function(str)
{return (this.match("^"+str)==str)}


function getCrewName (number) {
	var links = document.links;
	for(var l = 0; l < links.length; l++)
	{
		if(links[l].href.startsWith('http://torax.outwar.com/crew_raidresults'))
		{
			var crewnameParts = links[l].textContent.split('\'')[0].split(' ');
			var crewname = '';
			for(var i = 1; i < crewnameParts.length; i++)
			{
				crewname += crewnameParts[i] + ' ';
			}
			return crewname;
		}
	}
}

if ( document.URL.indexOf("crew_profile") != -1 ) {
	
	var doc = document;
	if (doc && doc != null)
	{
		var crewname = getCrewName();
		var tables = doc.getElementsByTagName('table');	//fetching all the tabels	
		for (var t = 0; t < tables.length; t++){	//running through all the tables		
			if(tables[t].border >= '1' && crewname != 'Results ')	//getting the one that contains the crew members	
			{
				var rows = tables[t].getElementsByTagName('tr');
				for (var r = 0; r < rows.length; r++){	//running through all the rows
					var cells = rows[r].getElementsByTagName('td');	//fetching the cells of the current row

					if(cells[0].innerHTML == '<b>Rank</b>')
					{
						rows[r].innerHTML = rows[r].innerHTML + '<td><b>&nbsp;</b></td>'
					}
					else
					{						
						var link = rows[r].getElementsByTagName('a')[0].href;
						rows[r].innerHTML = rows[r].innerHTML + '<td><a href="' + link + '" target="_blank"><img alt="Attack!" src="images/atk_player_icon.jpg" valign="center" border="0"></a></td><td><form method="POST" action="crew_hitlist.php" TARGET="_blank"><input type="hidden" name="hitname" value="' + cells[1].textContent + '"><input type="hidden" name="hitreason" value="' + crewname + '"><input NAME="addToHitlist" type="image" src="http://torax.outwar.com/images/rareicon.jpg" ></form></td>'
					}
					
				}
				
			}	
		}		
	}
}



      	