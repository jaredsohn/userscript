// ==UserScript==
// @name           HOMMK ImproveUI
// @namespace      Tilk
// @description    HOMMK ImproveUI by Tilk
// @include        http://mightandmagicheroeskingdoms.ubi.com/play
// ==/UserScript==
var userId;
var stackInfosArray = new Array();
var ressourceCodes = new Array("GOLD", "WOOD", "ORE", "MERCURY", "CRYSTAL", "SULFUR", "GEM");
var ressourceNamesFR = new Array("Or", "Bois", "Minerai", "Mercure", "Cristaux", "Soufre", "Gemmes");
var ressourceDesired = 'GOLD';
var quantityDesired;

function findRessourceNameFR( ressourceCode )
{
	var returnName = '';
	var index = -1;
	for (var i = 0; i < ressourceCodes.length; i++)
	{
		if (ressourceCodes[i].toUpperCase() == ressourceCode.toUpperCase() )
		{
			index = i;
		}
	}
	if (index > -1)
	{
		returnName = ressourceNamesFR[index];
	}
	return returnName;
}

function getActualVariables()
{
	var InputRessource = document.getElementById("SideBar" + userId + "SelectRessource");
	if ( InputRessource != null)
	{
		for each ( element in InputRessource.getElementsByTagName("option") )
		{
			if ( element.selected )
			{
				ressourceDesired = element.value;
			}
		}
	}
	var InputQuantity = document.getElementById("SideBar" + userId + "SelectQuantity");
	if (InputQuantity != null)
	{
		var InputValue = InputQuantity.value;
		if (InputValue != null)
		{
			InputValue = InputValue.replace("[^0-9]","");
			if ( InputValue >= 0 )
			{
				quantityDesired = InputValue;
			}
		}
	}
	
}

function addZeroIfNecessary( number )
{
	var returnValue;
	if ( number < 10 )
	{
		returnValue = '0'+number;
	}
	else
	{
		returnValue = number;
	}
	return returnValue;
}

function computeResults()
{
	getActualVariables();
	
	if ( stackInfosArray.length > 0 )
	{
		for each ( element in stackInfosArray )
		{
			// Masquer les héros si la cité est collapsed
			if ( element[0] != null && element[0] > 0 )
			{
				// RegionCity139761SummaryViewHeroList
				var RegionCitySummaryViewHeroList = document.getElementById('RegionCity' + element[0] + 'SummaryViewHeroList');
				if ( RegionCitySummaryViewHeroList != null )
				{
					RegionCitySummaryViewHeroList.innerHTML = '';
				}
				// RegionCity139761SummaryViewCenterMapButton
				var RegionCitySummaryViewCenterMapButton = document.getElementById('RegionCity' + element[0] + 'SummaryViewCenterMapButton');
				if ( RegionCitySummaryViewCenterMapButton != null )
				{
					RegionCitySummaryViewCenterMapButton.setAttribute('class', 'hidden');
				}
				// RegionCity139761SummaryViewOpenRegionButton
				var RegionCitySummaryViewOpenRegionButton = document.getElementById('RegionCity' + element[0] + 'SummaryViewOpenRegionButton');
				if ( RegionCitySummaryViewOpenRegionButton != null )
				{
					RegionCitySummaryViewOpenRegionButton.setAttribute('class', 'hidden');
				}
				// RegionCity139761SummaryViewRegionCityName
				var RegionCitySummaryViewRegionCityName = document.getElementById('RegionCity' + element[0] + 'SummaryViewRegionCityName');
				if ( RegionCitySummaryViewRegionCityName != null )
				{
					// RegionCity139761CompleteViewHeroList
					var RegionCityCompleteViewHeroList = document.getElementById('RegionCity' + element[0] + 'CompleteViewHeroList');
					if ( RegionCityCompleteViewHeroList != null && RegionCityCompleteViewHeroList.innerHTML == '')
					{
						RegionCitySummaryViewRegionCityName.innerHTML = '<span style="color:green;">' + element[1] + '</span>';
					}
					else 
					{
						RegionCitySummaryViewRegionCityName.innerHTML = '<span style="color:red;">' + element[1] + '</span>';
					}
				}
			}
		}
	}

	var html = '';	
	
	if ( quantityDesired == 0)
	{
		html = html+ 'Saisissez la quantité désirée.';
	}
	else 
	{
		if (stackInfosArray.length > 0 && (ressourceDesired.length > 0 && quantityDesired > -1))
		{
			for each ( element in stackInfosArray )
			{
				var infosNumber = element.length;
				html = html + '<div class="size10"><span style="text-decoration:underline;font-weight:bold;">' + element[1] + '</span>: ';
				for(var i = 2; i < (infosNumber-2); i++)
				{
					var Ressource = element[i];
					if (Ressource.length > 0)
					{
						if ( Ressource[0].toUpperCase() == ressourceDesired.toUpperCase() )
						{
							var quantity = quantityDesired - Ressource[1];
							if ( quantity <= 0 )
							{
								if ( quantityDesired == 1 )
								{
									html = html+ ' Vous poss&eacute;dez '+ quantityDesired +' unit&eacute;';
								}
								else
								{
									html = html+ ' Vous poss&eacute;dez '+ quantityDesired +' unit&eacute;s';
								}
								if ( ressourceDesired == "GOLD" )
								{
									html = html + ' d\''+ findRessourceNameFR(ressourceDesired) + '.';
								}
								else
								{
									html = html + ' de '+ findRessourceNameFR(ressourceDesired) + '.';
								}
							}
							else
							{
								if ( Ressource[2] <= 0 )
								{
									html = html+ 'Jamais';
								}
								else
								{
									var timeDisplay = '';
									var incomePerSecond = Ressource[2] / (3600*24);
									var time = Math.round(quantity / incomePerSecond);									
									var now = new Date();
									if ( incomePerSecond > 0 && ressourceDesired != "GOLD")
									{
										var actualTime = (now.getHours()*3600)+(now.getMinutes()*60)+(now.getSeconds());
										var timeToProduceOne = (3600*24) / Ressource[2];
										var dayProduction = 0;
										var temp = actualTime;
										while (temp >= timeToProduceOne)
										{
											dayProduction++;
											temp = temp - timeToProduceOne;
										}
										var timeSinceLastOne = actualTime - (dayProduction * timeToProduceOne); 
										time = time - timeSinceLastOne;
										time = Math.round(time);
									}
									var endDate = new Date();
									endDate.setTime(now.getTime() + (time *1000));
									if ( time >= (3600*24) )
									{
										var days = 0;
										while ( (days+1) * (3600*24) <= time)
										{
											days++;
										}
										time = time - days *(3600*24);
										timeDisplay = timeDisplay + days + 'j ';
									}
									if ( time >= 3600 )
									{
										var hours = 0;
										while ( (hours+1) * 3600 <= time)
										{
											hours++;
										}
										time = time - hours * 3600;
										timeDisplay = timeDisplay + hours + 'h ';
									}
									if ( time >= 60 )
									{
										var minutes = 0;
										while ( (minutes+1) * 60 <= time)
										{
											minutes++;
										}
										time = time - minutes * 60;
										timeDisplay = timeDisplay + minutes + 'm ';
									}
									if ( time > 0 )
									{
										timeDisplay = timeDisplay + time + 's';
									}
									html = html + timeDisplay;
									if ( endDate != null )
									{
										html = html + ' (';
										if ( endDate.getDate() != now.getDate() && endDate.getMonth() != endDate.getMonth() )
										{
											html = html + 'Le ' + addZeroIfNecessary(endDate.getDate()) + '/' + addZeroIfNecessary(endDate.getMonth()+1);
										}
										else if ( endDate.getDate() != now.getDate() && endDate.getMonth() == endDate.getMonth() )
										{
											html = html + 'Le ' + addZeroIfNecessary(endDate.getDate()) + '/' + addZeroIfNecessary(endDate.getMonth()+1);
										}
										else
										{
											html = html + 'Aujourd\'hui'; 
										}
										if ( endDate.getFullYear() != now.getFullYear())
										{
											html = html + '/' + endDate.getFullYear();
										}
										html = html + ' &agrave; ' + addZeroIfNecessary(endDate.getHours()) + ':' + addZeroIfNecessary(endDate.getMinutes())+')';
									}
								}
							}
							
						}
					}
				}
				html = html + '</div>';				
			}
		}
	}
	return html;
}

function displayRegionsInfos()
{
	if ( stackInfosArray.length > 0)
	{
		var divRessourceCalculator = document.createElement("div");
		divRessourceCalculator.id = 'SideBar' + userId + 'RegionCityList';
		divRessourceCalculator.setAttribute('class', 'regionCity');
		divRessourceCalculator.setAttribute('style', 'margin-top:-20px;');
		var html = '<div style="margin-left: 5px;">';
		html = html + '<div class="boldFont size12">Ressources : Temps d\'attente estim&eacute;</div>';
		// AFFICHAGE
		// for each ( element in stackInfosArray )
		// {
			// var infosNumber = element.length;
			// html = html+ '<div class="boldFont size14">' + element[1] + '</div><div class="size10">';
			// for(var i = 2; i < (infosNumber-2); i++)
			// {
				// var Ressource = element[i];
				// if (Ressource.length > 0)
				// {
					// html = html+ findRessourceNameFR(Ressource[0]) + ' -> ' + Ressource[1] + ' (+' + Ressource[2] + ')<br />';
				// }
			// }
			// html = html + '</div>';			
		// }
		// FIN AFFICHAGE
		// FORMULAIRE
		html = html + '<div class="boldFont size10">Ressource <select id="SideBar' + userId + 'SelectRessource">'
		for ( var i = 0; i < ressourceCodes.length; i++)
		{
			html = html + '<option value="' + ressourceCodes[i] + '">' + findRessourceNameFR(ressourceCodes[i]) + '</option>';
		}
		html = html + '</select>'
		html = html + ' - Quantit&eacute; <input id="SideBar' + userId + 'SelectQuantity" type="text" size="7" />'
		html = html + '</div>'
		// FIN FORMULAIRE
		// RESULTAT
		html = html + '<div id="SideBar' + userId + 'CalculResult" class="boldFont size10">'+ computeResults() + '</div>';
		// FIN RESULTAT
		html = html + '</div>';
		divRessourceCalculator.innerHTML = html;
		document.getElementById('SideBar' + userId + 'Content').appendChild(divRessourceCalculator);
	}
}

function getRegionCityInfos()
{
	var RegionCityList = document.getElementById("SideBar" + userId + "RegionCityList");
	stackInfosArray = new Array();
				
	for each ( RegionCityElement in RegionCityList.getElementsByTagName("div") )
	{
		if ( RegionCityElement.id.indexOf("CompleteViewRessourceStackList") > 0 )
		{
			var RegionCityNumber = RegionCityElement.id.replace('RegionCity','').replace('CompleteViewRessourceStackList','');
			if ( RegionCityNumber > 0 )
			{
				var regionCityArray = new Array();
				regionCityArray.push(RegionCityNumber);
				regionCityArray.push(document.getElementById('RegionCity'+RegionCityNumber+'CompleteViewRegionCityName').innerHTML);
				for each ( CityStack in RegionCityElement.getElementsByTagName("div") )
				{
					if ( CityStack.id.indexOf("Stack") > 0)
					{
						var cityStackArray = new Array();
						var CityStackName = CityStack.id.substring(CityStack.id.indexOf('CompleteView')).replace('CompleteView','').replace('Stack','');
						if ( CityStackName.length > 0 && CityStackName.indexOf('Ressource') < 0 )
						{
							var quantity = -1;
							var income = -1;							
							for each ( StackInfo in CityStack.getElementsByTagName("div") )
							{
								if ( StackInfo.id.indexOf("Quantity") > 0)
								{
									quantity = StackInfo.innerHTML.replace(' ','');
								}
								if ( StackInfo.id.indexOf("Income") > 0)
								{
									income = StackInfo.innerHTML.replace(' ','').replace('+','');									
								}
								if ( quantity > -1 && income > -1 )
								{
									cityStackArray.push(CityStackName, quantity, income);
									quantity = -1;
									income = -1;
								}
							}
						}
						regionCityArray.push(cityStackArray);
					}
				}
				stackInfosArray.push(regionCityArray);
			}
		}
	}
	
	var goldQuantity = 0; var woodQuantity = 0; var oreQuantity = 0; var mercuryQuantity = 0; var crystalQuantity = 0; var sulfurQuantity = 0; var gemQuantity = 0;
	var goldIncome = 0; var woodIncome = 0; var oreIncome = 0; var mercuryIncome = 0; var crystalIncome = 0; var sulfurIncome = 0; var gemIncome = 0;
	for each ( element in stackInfosArray )
	{
		var infosNumber = element.length;
		for(var i = 2; i < (infosNumber-2); i++)
		{
			var Ressource = element[i];
			if (Ressource.length > 0)
			{
				switch (Ressource[0].toUpperCase()) {
					case "GOLD":
						goldQuantity = goldQuantity + Ressource[1];
						goldIncome = goldIncome + Ressource[2];
						break;
					case "WOOD":
						woodQuantity = woodQuantity + Ressource[1];
						woodIncome = woodIncome + Ressource[2];
						break;
					case "ORE":
						oreQuantity = oreQuantity + Ressource[1];
						oreIncome = oreIncome + Ressource[2];
						break;
					case "MERCURY":
						mercuryQuantity = mercuryQuantity + Ressource[1];
						mercuryIncome = mercuryIncome + Ressource[2];
						break;
					case "CRYSTAL":
						crystalQuantity = crystalQuantity + Ressource[1];
						crystalIncome = crystalIncome + Ressource[2];
						break;
					case "SULFUR":
						sulfurQuantity = sulfurQuantity + Ressource[1];
						sulfurIncome = sulfurIncome + Ressource[2];
						break;
					case "GEM":
						gemQuantity = gemQuantity + Ressource[1];
						gemIncome = gemIncome + Ressource[2];
						break;
				}
			}
		}
	}
	
	if ( stackInfosArray.length > 1 )
	{
		var regionCityArray = new Array();
		regionCityArray.push(1);
		regionCityArray.push('Global');
		regionCityArray.push(new Array("GOLD", goldQuantity, goldIncome));
		regionCityArray.push(new Array("WOOD", woodQuantity, woodIncome));
		regionCityArray.push(new Array("ORE", oreQuantity, oreIncome));
		regionCityArray.push(new Array("MERCURY", mercuryQuantity, mercuryIncome));
		regionCityArray.push(new Array("CRYSTAL", crystalQuantity, crystalIncome));
		regionCityArray.push(new Array("SULFUR", sulfurQuantity, sulfurIncome));
		regionCityArray.push(new Array("GEM", gemQuantity, gemIncome));						
		stackInfosArray.push(regionCityArray);
	}
}

function refreshResults()
{
	getRegionCityInfos();
	document.getElementById("SideBar" + userId + "CalculResult").innerHTML = computeResults();
}

function doJob()
{
	var SideBarContainer = document.getElementById("SideBarContainer");
	if ( SideBarContainer != null )
	{
		var list = SideBarContainer.getElementsByTagName("div");
		if ( list != null && list.length > 0 )
		{
			if ( list[0].id.length > 0)
			{
				userId = list[0].id.replace('SideBar','');
			}
		}
	}

	document.getElementById("SideBar" + userId + "ReferralSeparator").innerHTML = '';
	
	var div = document.createElement("div");
	div.setAttribute("style", "position:absolute; right:475px; bottom:1px; height:25px; white-space:nowrap;");
	div.innerHTML = '<b>Jactari</b> : <a target="_blank" href="http://mmhk.jactari.info/h%C3%A9ros" hreflang="fr">Héros</a> | <a target="_blank" href="http://mmhk.jactari.info/art%C3%A9facts" hreflang="fr">Artéfacts</a> | <a target="_blank" href="http://mmhk.jactari.info/b%C3%A2timents" hreflang="fr">Bâtiments</a> | <a target="_blank" href="http://mmhk.jactari.info/cr%C3%A9atures" hreflang="fr">Créatures</a> | <a target="_blank" href="http://mmhk.jactari.info/sorts" hreflang="fr">Sorts</a> | <a target="_blank" href="http://mmhk.jactari.info/combat" hreflang="fr">Combat</a>';
	document.getElementById("Container").appendChild(div);
    
	getRegionCityInfos();

	displayRegionsInfos();

	setInterval( refreshResults, 1000 );
}

window.addEventListener(
    'load', 
    function(){ setTimeout(doJob,2000); },
    true);
// ==UserScript==
// @name           Script Update Checker
// @namespace      http://www.crappytools.net
// @description    Code to add to any Greasemonkey script to let it check for updates.
// @include        *
// ==/UserScript==

// NOTES:
// Feel free to copy this into any script you write; that's what it's here for. A credit and/or URL back to here would be appreciated, though.
// I was careful to use as few variables as I could so it would be easy to paste right into an existing script. All the ones you need to set are at the very top.
// The target script needs to be uploaded to userscripts.org. The update checks will -not- increase the install count for the script there.
// This script is set up to check for updates to itself by default. It may be a good idea to leave it like this.

var SUC_script_num = 84278; // Change this to the number given to the script by userscripts.org (check the address bar)

try
{
	function updateCheck(forced)
	{
		if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
		{
			try
			{
				GM_xmlhttpRequest(
				{
					method: 'GET',
					url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
					headers: {'Cache-Control': 'no-cache'},
					onload: function(resp)
					{
						var local_version, remote_version, rt, script_name;
						
						rt=resp.responseText;
						GM_setValue('SUC_last_update', new Date().getTime()+'');
						remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
						local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
						if(local_version!=-1)
						{
							script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
							GM_setValue('SUC_target_script_name', script_name);
							if (remote_version > local_version)
							{
							    document.getElementById("hommk-user-info").innerHTML = 'There is an <a href="http://userscripts.org/scripts/show/'+SUC_script_num+'">update</a> available for the user script';

							
							
								if(forced && confirm('There is an update available for the user script "'+script_name+'."\nWould you like to go to the install page now?'))
								{
									GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
									GM_setValue('SUC_current_version', remote_version);
								}
							}
							else if (forced)
								alert('No update is available for "'+script_name+'."');
						}
						else
							GM_setValue('SUC_current_version', remote_version+'');
					}
				});
			}
			catch (err)
			{
				if (forced)
					alert('An error occurred while checking for updates:\n'+err);
			}
		}
	}
	GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function()
	{
		updateCheck(true);
	});
	//updateCheck(false); // moved to init()
}
catch(err)
{}