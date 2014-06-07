// ==UserScript==
// @name           hitlist expansion
// @namespace      pom
// @include        http://torax.outwar.com/*
// ==/UserScript==
var options = document.getElementsByTagName('option');

var levelLimits = new Array();
levelLimits['OutwarName'] = new Array();
levelLimits['OutwarName']['lowest'] = 45;
levelLimits['OutwarName']['highest'] = 70;

levelLimits['OutwarName2'] = new Array();
levelLimits['OutwarName2']['lowest'] = 40;
levelLimits['OutwarName2']['highest'] = 62;


Array.prototype.contains = function(obj) {
  for (variable in levelLimits)
  {
	if(variable === obj)
	{
		return true;
	}
  }  
  return false;
}


function getPlayerName (number) {
	var id;
	
	for (var i = 0; i < options.length; i++)
	{
		if(options[i].selected)
		{
			if(options[i].innerHTML == '---------')
			{
				id = options[i].value;					
			}
		}
	}

	if(id > 0)
	{
		for (var i = 0; i < options.length; i++)
		{
			if(options[i].value == id && options[i].innerHTML != '---------')
			{
		
				id = options[i].innerHTML;
			}
		}
	}
	else
	{
		for (var i = 0; i < options.length; i++)
		{
			if(options[i].selected)
			{
		
				id = options[i].innerHTML;
			}
		}
	}
	return id;
}

String.prototype.startsWith = function(str)
{return (this.match("^"+str)==str)}



if ( document.URL.indexOf("hitlist") != -1 ) {
	var doc = document;
	// check we have document object
    if (doc && doc != null)
	{
		var name = getPlayerName();
		//getting all links
		var aLinks = doc.links;
		if (aLinks && aLinks != null && aLinks.length > 0 )
		{
			var statLink = '';
			var levels = new Array();
			var count = 0;
			// loop through all the links on a page
			for (var i = 0; i < aLinks.length; i++){
				//checks if we got the right links
				if(aLinks[i].href.startsWith("javascript:attackWindow"))
				{
					var row = aLinks[i].parentNode.parentNode;
					var playerLevel = row.getElementsByTagName('td')[2].innerHTML;	//level of the character
					var playerLevel = playerLevel.split('>')[1].split('<')[0];
					if(levelLimits.contains(name))
					{
					
						if(playerLevel >= levelLimits[name]['lowest'] && playerLevel <= levelLimits[name]['highest'] )
						{
							var pieces = aLinks[i].href.split("'");	//getting the id of a player
							aLinks[i].href = "profile.php?id=" + pieces[3];	//setting a new link
							aLinks[i].target = "_blank";	//making sure it's opening in a new tab							
							
							if(levels[playerLevel] == undefined)
							{
								levels[playerLevel] = 1;
							}
							else
							{
								levels[playerLevel] += 1;
							}
							count++;
						}
						else
						{
							var link = row.getElementsByTagName('td')[1];
							var playerName = link.getElementsByTagName('a')[1].innerHTML;
							link.innerHTML = playerName;
						}
					}
					else
					{
						var pieces = aLinks[i].href.split("'");	//getting the id of a player
						aLinks[i].href = "profile.php?id=" + pieces[3];	//setting a new link
						aLinks[i].target = "_blank";	//making sure it's opening in a new tab	
						
						if(levels[playerLevel] == undefined)
						{
							levels[playerLevel] = 1;
						}
						else
						{
							levels[playerLevel] += 1;
						}
						count++;
					}
				}
				else if(aLinks[i].href.startsWith("http://torax.outwar.com/crew_hitters.php") && aLinks[i].className == '')
				{
					statLink = aLinks[i];					
				}				
           }
		   var stats = ''
		   /*
		   for(var key in levels)
		   {
				stats += ', ' + levels[key] + ' lvl ' + key;
		   }
		   */
		  
		   statLink.innerHTML = count + ' targets ' + stats;
		   statLink.addEventListener('mouseover',function () {
				statspopup(event,'beh');
			},false)
		   
		}
	}
}




if ( document.URL.indexOf("crew_hitters") != -1 ) {
	var doc = document;
	
	// check we have document object12:26 10-3-2010
    if (doc && doc != null)
	{
			
		var name = getPlayerName();
		var results = new Array();
		
		var table = document.getElementById('AutoNumber1');
		table.style.width = '100%';
		var rows = table.getElementsByTagName('tr');
		//storring all the resulsts
		for (var i = 2; i < rows.length; i++)
		{

			var element = rows[i].getElementsByTagName('td');
			
			var currentPlayerName = element[0].innerHTML.split(">")[1].split("<")[0];
			var hits = element[2].innerHTML;
			var exp = element[3].innerHTML;
			
			results[currentPlayerName] = new Array();
			results[currentPlayerName]['hits'] = hits;
			results[currentPlayerName]['exp'] = exp;			
		}
		//replacing values
		rows[1].innerHTML += '<div align="center">Average strip</div>' ;
		var cellsRow1 = rows[1].getElementsByTagName('td');
		for(var r1 = 0; r1 < cellsRow1.length; r1++)
		{
			if(r1 == 1)
			{
				cellsRow1[r1].style.width = '15%';
			}
			else
			{
				cellsRow1[r1].style.width = '20%';
			}
		}
		
		for (var i = 2; i < rows.length; i++)
		{		
			
			var element = rows[i].getElementsByTagName('td');
			
			var currentPlayerName = element[0].innerHTML.split(">")[1].split("<")[0];
			
			var hits = element[2].innerHTML;
			var exp = element[3].innerHTML;
			
			//callculating hits
			//since parseFlaot can't work with ,
			currentPlayerHits = results[currentPlayerName]['hits'];
			currentPlayerHits = currentPlayerHits.split(',');
			currentPlayerHits = parseFloat(currentPlayerHits[0] + currentPlayerHits[1]);
			
			if(results[name] == undefined) { results[name] = new Array(); results[name]['hits'] = '0'; results[name]['exp'] = '0'; }
			nameHits = results[name]['hits'];		
			nameHits = nameHits.split(',');
			nameHits = parseFloat(nameHits[0] + nameHits[1]);
			
			if(parseFloat(currentPlayerHits) - parseFloat(nameHits) > 0)
			{	
				resultHits = parseFloat(currentPlayerHits) - parseFloat(nameHits);
				element[2].innerHTML = element[2].innerHTML  + "&nbsp;&nbsp;&nbsp;&nbsp;" + '<font color="red"> + (' + resultHits + ')</font>';				
			}
			else if(parseFloat(currentPlayerHits) - parseFloat(nameHits) < 0)
			{				
				resultHits = parseFloat(nameHits) - parseFloat(currentPlayerHits);
				element[2].innerHTML = element[2].innerHTML  + "&nbsp;&nbsp;&nbsp;&nbsp;" + '<font color="lime"> - (' + resultHits + ')</font>';				
			}	
			
			//callculating exp
			currentPlayerExp = results[currentPlayerName]['exp'];
			currentPlayerExp = currentPlayerExp.split(',');
			currentPlayerExp = parseFloat(currentPlayerExp.join(""));
			
			nameExp = results[name]['exp'];
			nameExp = nameExp.split(',');
			nameExp = parseFloat(nameExp.join(""));		
			
			
			
			if(parseFloat(currentPlayerExp) - parseFloat(nameExp) > 0)
			{
				resultHits = parseFloat(currentPlayerExp) - parseFloat(nameExp);				
				element[3].innerHTML = element[3].innerHTML  + "&nbsp;&nbsp;&nbsp;&nbsp;" + '<font color="red"> + (' + resultHits + ')</font>';				
			}
			else if(parseFloat(currentPlayerExp) - parseFloat(nameExp) < 0)
			{				
				resultHits = parseFloat(nameExp) - parseFloat(currentPlayerExp);				
				element[3].innerHTML = element[3].innerHTML  + "&nbsp;&nbsp;&nbsp;&nbsp;" + '<font color="lime"> - (' + resultHits + ')</font>';				
			}	
			
			//callculating average strip
			nameAverageStrip = Math.round(parseFloat(nameExp) / parseFloat(nameHits));
			currentPlayerAverageStrip = Math.round(parseFloat(currentPlayerExp) / parseFloat(currentPlayerHits));
			
			if(parseFloat(currentPlayerAverageStrip) - parseFloat(nameAverageStrip) > 0)
			{
				resultAverageStrip = parseFloat(currentPlayerAverageStrip) - parseFloat(nameAverageStrip);
				rows[i].innerHTML += '<td bgcolor="' + element[3].bgColor + '">' + Math.round(parseFloat(currentPlayerExp) / parseFloat(currentPlayerHits)) +' XP'  + "&nbsp;&nbsp;&nbsp;&nbsp;" + '<font color="red"> + (' + resultAverageStrip + ')</font>' + '</td>';
			}
			else if(parseFloat(currentPlayerAverageStrip) - parseFloat(nameAverageStrip) < 0)
			{
				resultAverageStrip = parseFloat(nameAverageStrip) - parseFloat(currentPlayerAverageStrip);
				rows[i].innerHTML += '<td bgcolor="' + element[3].bgColor + '">' + Math.round(parseFloat(currentPlayerExp) / parseFloat(currentPlayerHits)) +' XP'  + "&nbsp;&nbsp;&nbsp;&nbsp;" + '<font color="lime"> - (' + resultAverageStrip + ')</font>' + '</td>';
			}
			else
			{
				rows[i].innerHTML += '<td bgcolor="' + element[3].bgColor + '">' + currentPlayerAverageStrip +' XP'  + "&nbsp;&nbsp;&nbsp;&nbsp;" + '</td>';
			}
		}
	}
}