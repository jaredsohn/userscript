// ==UserScript==
// @name           astroempires free +
// @description    Removes the adds table and also adds some upgrade features to free players such as the structures and fleet advanced views
// @namespace      bamba.astroempries
// @include        http://*.astroempires.com/*
// @exclude        http://forum.astroempires.com/*
// @exclude        *.astroempires.com/home.aspx*
// @exclude        *.astroempires.com/login.aspx*
// ==/UserScript==

var scriptVersion=9.0;

try
{
	if(document!=null)
	{
		var addTable=document.getElementById("advertising");
		if(addTable!=null)
		{
			addTable.parentNode.removeChild(addTable);
		}

		//if in empire tab
		var locationStr=document.location+"";
		if(locationStr.indexOf(".astroempires.com/empire.aspx")!=-1)
		{
			var table=document.getElementById("main-header-nav_menu");
			if(table!=null)
			{
				var div=document.createElement('div');
				table.appendChild(div);
				var buttonTable=document.createElement('table');
				buttonTable.id="plugin_button_table";
				div.appendChild(buttonTable);
				var tr=document.createElement('tr');
				buttonTable.appendChild(tr);
				var td=document.createElement('td');
				tr.appendChild(td);
				if((locationStr.indexOf("?")==-1)||(locationStr.indexOf("view=bases_events")!=-1)||(locationStr.indexOf("plugin_refresh=on")!=-1))
				{
					var buttonElmement=document.createElement('input');
					buttonElmement.type="button";
					buttonElmement.title='Show Extended Info (base, fleet and scanner tables)';
					buttonElmement.value='Extra Info';
					td.appendChild(buttonElmement);
					buttonElmement.addEventListener("click",getExtendedInfoImpl,true);
				}

				var refreshOn=false;
				if(locationStr.indexOf("plugin_refresh=on")!=-1)
				{
					refreshOn=true;
				}

				var buttonElmement=document.createElement('input');
				buttonElmement.type="button";
				var td=document.createElement('td');
				tr.appendChild(td);
				td.appendChild(buttonElmement);
				if(refreshOn)
				{
					buttonElmement.title='Stop Auto Refresh';
					buttonElmement.value='Stop';
					buttonElmement.addEventListener("click",stopAutoRefresh,true);

					var autoRefreshAfterTimeout=function()
					{
						try
						{
							if(document!=null)
							{
								var locationStr=document.location+"";
								var index=locationStr.indexOf(".astroempires.com");
								var newLocation=locationStr.substring(0,index)+".astroempires.com/empire.aspx?plugin_refresh=on";
								document.location=newLocation;
							}
						}
						catch(error)
						{
							handleError(error);
						}
					}
					window.setTimeout(autoRefreshAfterTimeout,15000);
				}
				else
				{
					buttonElmement.title='Start Auto Refresh';
					buttonElmement.value='Start';
					buttonElmement.addEventListener("click",startAutoRefresh,true);
				}
			}
		}
	}
}
catch(error)
{
	handleError(error);
}
function handleError(error)
{
}
function startAutoRefresh()
{
	navigate("empire.aspx?plugin_refresh=on");
}
function stopAutoRefresh()
{
	navigate("empire.aspx");
}
function navigate(urlSuffix)
{
	try
	{
		if(document!=null)
		{
			var locationStr=document.location+"";
			var index=locationStr.indexOf(".astroempires.com");
			var newLocation=locationStr.substring(0,index)+".astroempires.com/"+urlSuffix;
			document.location=newLocation;
		}
	}
	catch(error)
	{
		handleError(error);
	}
}
function updateBaseInfo(url,eventsTable,baseStructuresArray,output)
{
	try
	{
		if(document!=null)
		{
			var locationStr=document.location+"";
			if(locationStr.indexOf(".astroempires.com/empire.aspx")!=-1)
			{
				if((locationStr.indexOf("?")==-1)||(locationStr.indexOf("view=bases_events")!=-1)||(locationStr.indexOf("plugin_refresh=on")!=-1))
				{
					var index=output.indexOf("select name='base'");
					if(index!=-1)
					{
						index=output.indexOf("selected='selected'",index);
						if(index!=-1)
						{
							index=output.indexOf("&nbsp;",index);
							if(index!=-1)
							{
								index=index+"&nbsp;".length
								var endIndex=output.indexOf("&nbsp;",index);
								var baseName=output.substring(index,endIndex);

								var baseStructuresItem=null;
								for(var i=0;i<baseStructuresArray.length;i++)
								{
									baseStructuresItem=baseStructuresArray[i];
									if(baseStructuresItem.url==url)
									{
										baseStructuresItem.baseName=baseName;
										break;
									}
								}

								index=output.indexOf("<th>Structures</th><th>Level</th>",endIndex);
								if(index!=-1)
								{
									index=output.indexOf("<tr ",index);
									if(index!=-1)
									{
										for(loop=0;loop<5;loop++)
										{
											index=output.indexOf("<td>",index);
											if(index!=-1)
											{
												index=index+"<td>".length;
												endIndex=output.indexOf("</td>",index);
												if(endIndex!=-1)
												{
													var names=output.substring(index,endIndex);
													var namesArray=names.split("<br />");
													index=output.indexOf("<td>",endIndex);
													if(index!=-1)
													{
														index=index+"<td>".length;
														endIndex=output.indexOf("</td>",index);
														if(endIndex!=-1)
														{
															var count=output.substring(index,endIndex);
															var countArray=count.split("<br />");

															for(var k=0;k<countArray.length;k++)
															{
																if(namesArray[k].length>0)
																{
																	baseStructuresItem.addStructure(namesArray[k],countArray[k]);
																}
															}

															index=endIndex;
														}
													}
												}
											}
											else
											{
												break;
											}
										}
									}
								}
							}
						}
					}
					
					//add header
					var html="<tr class='listing-header' align='center'><td></td>";
					for(var i=0;i<baseStructuresArray.length;i++)
					{
						var baseStructuresItem=baseStructuresArray[i];
						if(baseStructuresItem.baseName!=null)
						{
							html=html+"<td>&nbsp;&nbsp;&nbsp;<a href='"+baseStructuresItem.url+"'>"+baseStructuresItem.baseName+"</a>&nbsp;&nbsp;&nbsp;</td>";
						}
					}
					html=html+"</tr>";

					var structureNames=new Array("Urban Structures","Biosphere Modification",
						"Solar Plants","Gas Plants","Fusion Plants","Antimatter Plants",
						"Terraform","Multi-Level Platforms",
						"Metal Refineries","Robotic Factories","Nanite Factories","Android Factories","Orbital Base",
						"Spaceports","Crystal Mines","Economic Centers",
						"Shipyards","Orbital Shipyards",
						"Research Labs",
						"Jump Gate","Capital",
						"Command Centers","Barracks","Laser Turrets","Missile Turrets","Plasma Turrets","Ion Turrets",
						"Photon Turrets","Disruptor Turrets","Deflection Shields","Planetary Shield","Planetary Ring");
					var color="green";
					for(var i=0;i<structureNames.length;i++)
					{
						var lineHTML="<tr align='center'><td>&nbsp;&nbsp;"+structureNames[i]+"&nbsp;&nbsp;</td>";

						var found=false;
						for(var j=0;j<baseStructuresArray.length;j++)
						{
							var baseStructuresItem=baseStructuresArray[j];
							if(baseStructuresItem.baseName!=null)
							{
								if(structureNames[i]=="Metal Refineries")
								{
									color="white";
								}
								else if(structureNames[i]=="Spaceports")
								{
									color="orange";
								}
								else if(structureNames[i]=="Shipyards")
								{
									color="yellow";
								}
								else if(structureNames[i]=="Research Labs")
								{
									color="lightblue";
								}
								else if(structureNames[i]=="Command Centers")
								{
									color="red";
								}
								count=baseStructuresItem.getStructureCount(structureNames[i]);
								if(count!="0")
								{
									found=true;
								}
								lineHTML=lineHTML+"<td><b><span style='color:"+color+"'>"+count+"</span></b></td>";
							}
						}

						lineHTML=lineHTML+"</tr>";
						
						if(found)
						{
							html=html+lineHTML;
						}
					}

					var tableHtml="<table border='1' width='100%' class='layout listing sorttable'>"+html+"</table>";
					
					var newTableElement=document.getElementById("structure_table_div");
					newTableElement.innerHTML=tableHtml;
				}
			}
		}
	}
	catch(error)
	{
		handleError(error);
	}
}
function setBaseRequest(urlPrefix,bases,currentIndex,url,eventsTable,baseStructuresArray,incomingFleetsInfo,systemLocations)
{
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function()
	{
		try
		{
			if((xmlhttp.readyState==4)&&(xmlhttp.status==200))
			{
				var output=xmlhttp.responseText;
				updateBaseInfo(url,eventsTable,baseStructuresArray,output);
				startBaseRequest(urlPrefix,bases,currentIndex+1,eventsTable,baseStructuresArray,incomingFleetsInfo,systemLocations);
			}
		}
		catch(internalError)
		{
			handleError(internalError);
		}
	};
	xmlhttp.open("POST",url,true);
	xmlhttp.send(null);
}
function startBaseRequest(urlPrefix,bases,currentIndex,eventsTable,baseStructuresArray,incomingFleetsInfo,systemLocations)
{
	if(bases.length>currentIndex)
	{
		var url=urlPrefix+bases[currentIndex];
		setBaseRequest(urlPrefix,bases,currentIndex,url,eventsTable,baseStructuresArray,incomingFleetsInfo,systemLocations);
	}
	else
	{
		var locationStr=document.location+"";
		var nameIndexStart=locationStr.indexOf("//")+2;
		var nameIndexEnd=locationStr.indexOf(".",nameIndexStart);
		var serverName=locationStr.substring(nameIndexStart,nameIndexEnd);

		//start HTTP requests to get fleet info
		var xmlhttp=new XMLHttpRequest();
		xmlhttp.onreadystatechange=function()
		{
			try
			{
				if((xmlhttp.readyState==4)&&(xmlhttp.status==200))
				{
					var output=xmlhttp.responseText;
					handleFleetsRequest(eventsTable,serverName,output,incomingFleetsInfo,systemLocations);
				}
			}
			catch(internalError)
			{
				handleError(internalError);
			}
		};
		var url="http://"+serverName+".astroempires.com/fleet.aspx";
		xmlhttp.open("POST",url,true);
		xmlhttp.send(null);
	}
}
function updateFleetInfo(url,eventsTable,fleetItemsArray,output)
{
	try
	{
		var index=output.indexOf("select name='fleet'");
		if(index!=-1)
		{
			index=output.indexOf("selected='selected'",index);
			if(index!=-1)
			{
				index=output.indexOf("&nbsp;",index);
				if(index!=-1)
				{
					index=index+"&nbsp;".length
					var endIndex=output.indexOf("&nbsp;",index);
					var fleetName=output.substring(index,endIndex);

					var fleetItems=null;
					for(var i=0;i<fleetItemsArray.length;i++)
					{
						fleetItems=fleetItemsArray[i];
						if(fleetItems.url==url)
						{
							fleetItems.name=fleetName;
							break;
						}
					}

					var index=output.indexOf("Units");
					if(index!=-1)
					{
						output=output.substring(index);

						var found=false;
						var start=0;
						do
						{
							found=false;
							index=output.indexOf("<b>",start);
							if(index!=-1)
							{
								index=index+"<b>".length;
								var endIndex=output.indexOf("</b>",index);
								if(endIndex!=-1)
								{
									var itemName=output.substring(index,endIndex);

									index=output.indexOf("<td align='center'>",endIndex);
									if(index!=-1)
									{
										index=index+"<td align='center'>".length;
										endIndex=output.indexOf("</td>",index);
										if(endIndex!=-1)
										{
											itemCount=output.substring(index,endIndex);
											fleetItems.addItem(itemName,itemCount);
											found=true;
											start=endIndex;
										}
									}
								}
							}
						}
						while(found);
					}

					//get size
					index=output.indexOf("Fleet Size: ");
					if(index!=-1)
					{
						index=index+"Fleet Size: ".length;
						var endIndex=output.indexOf("<",index);
						if(endIndex!=-1)
						{
							fleetSize=output.substring(index,endIndex);
							fleetItems.addItem("Fleet Size",fleetSize);
						}
					}
				}
			}
		}

		//add header
		var html="<tr class='listing-header' align='center'><td></td>";
		for(var i=0;i<fleetItemsArray.length;i++)
		{
			var fleetItems=fleetItemsArray[i];
			if(fleetItems.name!=null)
			{
				html=html+"<td>&nbsp;&nbsp;&nbsp;<a href='"+fleetItems.url+"'>"+fleetItems.name+"</a>&nbsp;&nbsp;&nbsp;</td>";
			}
		}
		html=html+"</tr>";

		var unitNames=new Array("Fighters","Bombers","Heavy Bombers","Ion Bombers",
			"Corvette","Destroyer","Frigate","Ion Frigate","Cruiser","Heavy Cruiser",
			"Carrier","Fleet Carrier",
			"Battleship","Dreadnought","Titan","Leviathan","Death Star",
			"Scout Ship","Recycler","Outpost Ship",
			"Fleet Size");
		var color=null;
		for(var i=0;i<unitNames.length;i++)
		{
			var lineHTML="<tr align='center'><td>&nbsp;&nbsp;"+unitNames[i]+"&nbsp;&nbsp;</td>";

			var found=false;
			for(var j=0;j<fleetItemsArray.length;j++)
			{
				var fleetItems=fleetItemsArray[j];
				if(fleetItems.name!=null)
				{
					count=fleetItems.getItemCount(unitNames[i]);
					if(count!="0")
					{
						found=true;
					}
					
					if(unitNames[i]=="Fleet Size")
					{
						count="<b><span style='color:green'>"+count+"</span></b>";
					}

					lineHTML=lineHTML+"<td>"+count+"</td>";
				}
			}

			lineHTML=lineHTML+"</tr>";
			
			if(found)
			{
				html=html+lineHTML;
			}
		}

		var tableHtml="<table border='1' width='100%' class='layout listing sorttable'>"+html+"</table>";
		
		var newTableElement=document.getElementById("fleet_table_div");
		newTableElement.innerHTML=tableHtml;
	}
	catch(internalError)
	{
		handleError(internalError);
	}
}
function setFleetRequest(serverName,urlPrefix,fleets,currentIndex,url,eventsTable,fleetItemsArray,incomingFleetsInfo,systemLocations)
{
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function()
	{
		try
		{
			if((xmlhttp.readyState==4)&&(xmlhttp.status==200))
			{
				var output=xmlhttp.responseText;
				updateFleetInfo(url,eventsTable,fleetItemsArray,output);
				startFleetRequest(serverName,urlPrefix,fleets,currentIndex+1,eventsTable,fleetItemsArray,incomingFleetsInfo,systemLocations)
			}
		}
		catch(internalError)
		{
			handleError(internalError);
		}
	};
	xmlhttp.open("POST",url,true);
	xmlhttp.send(null);
}
function startFleetRequest(serverName,urlPrefix,fleets,currentIndex,eventsTable,fleetItemsArray,incomingFleetsInfo,systemLocations)
{
	if(fleets.length>currentIndex)
	{
		var url=urlPrefix+fleets[currentIndex];
		setFleetRequest(serverName,urlPrefix,fleets,currentIndex,url,eventsTable,fleetItemsArray,incomingFleetsInfo,systemLocations);
	}
	else
	{
		var locationStr=document.location+"";
		var nameIndexStart=locationStr.indexOf("//")+2;
		var nameIndexEnd=locationStr.indexOf(".",nameIndexStart);
		var serverName=locationStr.substring(nameIndexStart,nameIndexEnd);

		//start HTTP requests to get scanner info
		startScannerRequest(eventsTable,serverName,incomingFleetsInfo,systemLocations,0);
	}
}
function handleFleetsRequest(eventsTable,serverName,output,incomingFleetsInfo,systemLocations)
{
	try
	{
		var fleets=new Array();
		var found=false;
		var start=0;
		do
		{
			found=false;
			var index=output.indexOf("fleet.aspx?fleet=",start);
			if(index!=-1)
			{
				var endIndex=output.indexOf("'",index);
				index=index+"fleet.aspx?fleet=".length;
				if(endIndex!=-1)
				{
					found=true;
					start=endIndex;
					
					var fleetsID=output.substring(index,endIndex);
					if((fleetsID.indexOf("action")==-1)&&(fleetsID.indexOf("view")==-1)&&(fleetsID.indexOf("Size")==-1))
					{
						fleets.push(fleetsID);
					}
				}
			}
		}
		while(found);

		var urlPrefix="http://"+serverName+".astroempires.com/fleet.aspx?fleet=";
		var fleetItemsArray=new Array();
		for(var i=0;i<fleets.length;i++)
		{
			var url=urlPrefix+fleets[i];
			var fleetItems=new FleetItems(url);
			fleetItemsArray.push(fleetItems);
		}
		startFleetRequest(serverName,urlPrefix,fleets,0,eventsTable,fleetItemsArray,incomingFleetsInfo,systemLocations);
	}
	catch(internalError)
	{
		handleError(internalError);
	}
}
function updateScannerInfoForAstro(eventsTable,serverName,incomingFleetsInfo,systemLocation,astroLocation,output)
{
	//get base name if available
	var baseName=null;
	try
	{
		var index=output.indexOf("base.aspx?base=");
		if(index!=-1)
		{
			index=output.indexOf(">",index);
			if(index!=-1)
			{
				var endIndex=output.indexOf("<",index);
				if(index<endIndex)
				{
					baseName=output.substring(index+1,endIndex);
				}
			}
		}
	}
	catch(internalError)
	{
		handleError(internalError);
	}

	var found=false;
	var start=0;
	var shouldDraw=false;
	do
	{
		found=false;
		var index=output.indexOf("id='timer",start);
		if(index!=-1)
		{
			index=output.indexOf("fleet.aspx?fleet=",index);
			if(index!=-1)
			{
				index=index+"fleet.aspx?fleet=".length;
				var endIndex=output.indexOf("'",index);
				var fleetID=null;
				if(endIndex!=-1)
				{
					fleetID=output.substring(index,endIndex);
				}
				index=output.indexOf(">",index);
				if(index!=-1)
				{
					endIndex=output.indexOf("<",index);
					if(endIndex!=-1)
					{
						found=true;
						start=endIndex;

						var size=output.substring(index+1,endIndex);

						var suffixOutput=output.substring(0,index);
						var index=suffixOutput.lastIndexOf("Player level");
						if(index!=-1)
						{
							index=suffixOutput.indexOf(">",index);
							if(index!=-1)
							{
								var endIndex=suffixOutput.indexOf("<",index);
								if(endIndex!=-1)
								{
									var player=suffixOutput.substring(index+1,endIndex);

									var fleet=null;
									var foundFleet=false;
									for(var i=0;i<incomingFleetsInfo.length;i++)
									{
										fleet=incomingFleetsInfo[i];
										if(fleet.systemLocation==systemLocation)
										{
											foundFleet=true;
											break;
										}
									}
									if(foundFleet)
									{
										foundFleet=false;
										var astroFleet=null;
										for(var i=0;i<fleet.items.length;i++)
										{
											astroFleet=fleet.items[i];
											if(astroFleet.astroLocation==astroLocation)
											{
												foundFleet=true;
												break;
											}
										}
										if(!foundFleet)
										{
											astroFleet=new AstroIncomingFleet(astroLocation,baseName);
											fleet.items.push(astroFleet);
										}
										var astroFleetItem=new AstroIncomingFleetItem();
										astroFleetItem.player=player;
										astroFleetItem.size=size;
										astroFleetItem.fleetID=fleetID;
										astroFleet.items.push(astroFleetItem);
										shouldDraw=true;
									}
								}
							}
						}
					}
				}
			}
		}
	}
	while(found);

	if(shouldDraw)
	{
		//add header
		var html="<tr class='listing-header' align='center'>";
		html=html+"<td>&nbsp;&nbsp;&nbsp;Target Base&nbsp;&nbsp;&nbsp;</td>";
		html=html+"<td>&nbsp;&nbsp;&nbsp;Target Astro&nbsp;&nbsp;&nbsp;</td>";
		html=html+"<td>&nbsp;&nbsp;&nbsp;Player&nbsp;&nbsp;&nbsp;</td>";
		html=html+"<td>&nbsp;&nbsp;&nbsp;Size&nbsp;&nbsp;&nbsp;</td>";
		html=html+"</tr>";
		
		for(var i=0;i<incomingFleetsInfo.length;i++)
		{
			systemFleet=incomingFleetsInfo[i];
				
			for(var j=0;j<systemFleet.items.length;j++)
			{
				var astroFleet=systemFleet.items[j];

				for(var k=0;k<astroFleet.items.length;k++)
				{
					var fleet=astroFleet.items[k];

					baseName=astroFleet.baseName;
					if(baseName==null)
					{
						baseName="";
					}

					html=html+"<tr align='center'>";
					var url="http://"+serverName+".astroempires.com/map.aspx?loc="+astroFleet.astroLocation;
					if(baseName.length>0)
					{
						html=html+"<td>&nbsp;&nbsp;&nbsp<a href='"+url+"'>"+baseName+"</a>&nbsp;&nbsp;&nbsp;</td>";
					}
					else
					{
						html=html+"<td>&nbsp;&nbsp;&nbsp"+baseName+"&nbsp;&nbsp;&nbsp;</td>";
					}
					html=html+"<td>&nbsp;&nbsp;&nbsp<a href='"+url+"'>"+astroFleet.astroLocation+"</a>&nbsp;&nbsp;&nbsp;</td>";
					html=html+"<td>&nbsp;&nbsp;&nbsp;"+fleet.player+"&nbsp;&nbsp;&nbsp;</td>";
					if((fleet.fleetID==null)||(fleet.fleetID.length==0))
					{
						html=html+"<td>&nbsp;&nbsp;&nbsp;"+fleet.size+"&nbsp;&nbsp;&nbsp;</td>";
					}
					else
					{
						url="http://"+serverName+".astroempires.com/fleet.aspx?fleet="+fleet.fleetID;
						html=html+"<td>&nbsp;&nbsp;&nbsp;<a href='"+url+"'>"+fleet.size+"</a>&nbsp;&nbsp;&nbsp;</td>";
					}
					html=html+"</tr>";
				}
			}
		}
		var tableHtml="<table border='1' width='100%' class='layout listing sorttable'>"+html+"</table>";
		
		var newTableElement=document.getElementById("scanner_table_div");
		newTableElement.innerHTML=tableHtml;
	}
}
function setScannerRequestForAstro(eventsTable,serverName,incomingFleetsInfo,systemLocation,astroLocation)
{
	var url="http://"+serverName+".astroempires.com/map.aspx?loc="+astroLocation;
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function()
	{
		try
		{
			if((xmlhttp.readyState==4)&&(xmlhttp.status==200))
			{
				var output=xmlhttp.responseText;
				updateScannerInfoForAstro(eventsTable,serverName,incomingFleetsInfo,systemLocation,astroLocation,output);
			}
		}
		catch(internalError)
		{
			handleError(internalError);
		}
	};
	xmlhttp.open("POST",url,true);
	xmlhttp.send(null);
}
function updateScannerInfo(eventsTable,serverName,incomingFleetsInfo,locationStr,output)
{
	var astros=new Array();
	var found=false;
	var start=0;
	var index=null;
	var endIndex=null;
	var amount=null;
	var astroLocation=null
	do
	{
		found=false;
		amount=null;
		index=null;
		endIndex=null;

		index=output.indexOf("astro_icons_",start);
		if(index!=-1)
		{
			endIndex=output.indexOf("'",index);
			index=index+"astro_icons_".length;
			if(endIndex!=-1)
			{
				found=true;
				start=endIndex;
				astroLocation=output.substring(index,endIndex);
				index=output.indexOf("- Incoming: ",start);
				if(index!=-1)
				{
					var nextAtroIndex=output.indexOf("astro_icons_",start);
					if(index<nextAtroIndex)
					{
						index=index+"- Incoming: ".length;
						endIndex=output.indexOf("'",index);
						if(endIndex!=-1)
						{
							start=endIndex;
							amount=output.substring(index,endIndex);

							if((amount!=null)&&(amount.length>0))
							{
								if(amount!="0")
								{
									var fleet=null;
									var foundFleet=false;
									for(var i=0;i<incomingFleetsInfo.length;i++)
									{
										fleet=incomingFleetsInfo[i];
										if(fleet.systemLocation==locationStr)
										{
											foundFleet=true;
											break;
										}
									}
									if(!foundFleet)
									{
										fleet=new SystemIncomingFleet(locationStr);
										incomingFleetsInfo.push(fleet);
									}
									setScannerRequestForAstro(eventsTable,serverName,incomingFleetsInfo,locationStr,astroLocation);
								}
							}
						}
					}
				}
			}
		}
	}
	while(found);
}
function setScannerRequest(eventsTable,serverName,incomingFleetsInfo,locationStr,systemLocations,currentIndex)
{
	var url="http://"+serverName+".astroempires.com/map.aspx?loc="+locationStr;
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function()
	{
		try
		{
			if((xmlhttp.readyState==4)&&(xmlhttp.status==200))
			{
				var output=xmlhttp.responseText;
				updateScannerInfo(eventsTable,serverName,incomingFleetsInfo,locationStr,output);
				startScannerRequest(eventsTable,serverName,incomingFleetsInfo,systemLocations,currentIndex+1);
			}
		}
		catch(internalError)
		{
			handleError(internalError);
		}
	};
	xmlhttp.open("POST",url,true);
	xmlhttp.send(null);
}
function startScannerRequest(eventsTable,serverName,incomingFleetsInfo,systemLocations,currentIndex)
{
	if(systemLocations.length>currentIndex)
	{
		setScannerRequest(eventsTable,serverName,incomingFleetsInfo,systemLocations[currentIndex],systemLocations,currentIndex);
	}
}
function getExtendedInfoImpl()
{
	try
	{
		if(document!=null)
		{
			var locationStr=document.location+"";
			if(locationStr.indexOf(".astroempires.com/empire.aspx")!=-1)
			{
				if((locationStr.indexOf("?")==-1)||(locationStr.indexOf("view=bases_events")!=-1)||(locationStr.indexOf("plugin_refresh=on")!=-1))
				{
					var nameIndexStart=locationStr.indexOf("//")+2;
					var nameIndexEnd=locationStr.indexOf(".",nameIndexStart);
					var serverName=locationStr.substring(nameIndexStart,nameIndexEnd);

					var eventsTable=document.getElementById("empire_events");

					if(eventsTable!=null)
					{
						//create HTML div for each section
						var newTableElement=document.getElementById("structure_table_div");
						if(newTableElement!=null)
						{
							newTableElement.innerHTML="";
						}
						else
						{
							newTableElement=document.createElement('div');
							newTableElement.id="structure_table_div";
							newTableElement.style.className="box3_box-title-pad box-title-pad";
							eventsTable.appendChild(newTableElement);
						}
						newTableElement=document.getElementById("fleet_table_div");
						if(newTableElement!=null)
						{
							newTableElement.innerHTML="";
						}
						else
						{
							newTableElement=document.createElement('div');
							newTableElement.id="fleet_table_div";
							newTableElement.style.className="box3_box-title-pad box-title-pad";
							eventsTable.appendChild(newTableElement);
						}
						newTableElement=document.getElementById("scanner_table_div");
						if(newTableElement!=null)
						{
							newTableElement.innerHTML="";
						}
						else
						{
							newTableElement=document.createElement('div');
							newTableElement.id="scanner_table_div";
							newTableElement.style.className="box3_box-title-pad box-title-pad";
							eventsTable.appendChild(newTableElement);
						}
						var scannerTable=newTableElement;
						newTableElement=document.getElementById("info_div");
						if(newTableElement!=null)
						{
							newTableElement.innerHTML="";
						}
						else
						{
							newTableElement=document.createElement('div');
							newTableElement.id="info_div";
							newTableElement.style.className="box3_box-title-pad box-title-pad";
							newTableElement.innerHTML="astroempires free +, version: "+scriptVersion;
							eventsTable.appendChild(newTableElement);
						}

						//get initial info for base table
						var eventsTableHTML=eventsTable.innerHTML;
						var bases=new Array();
						var found=false;
						var start=0;
						do
						{
							found=false;
							var index=eventsTableHTML.indexOf("base.aspx?base=",start);
							if(index!=-1)
							{
								var endIndex=eventsTableHTML.indexOf("\"",index);
								index=index+"base.aspx?base=".length;
								if(endIndex!=-1)
								{
									found=true;
									start=endIndex;
									
									var baseID=eventsTableHTML.substring(index,endIndex);
									if(baseID.indexOf("view")==-1)
									{
										bases.push(baseID);
									}
								}
							}
						}
						while(found);
						var urlPrefix="http://"+serverName+".astroempires.com/base.aspx?base=";
						var baseStructuresArray=new Array();
						for(var i=0;i<bases.length;i++)
						{
							var url=urlPrefix+bases[i];
							var baseStructuresItem=new BaseStructures(url);
							baseStructuresArray.push(baseStructuresItem);
						}
						var baseURLPreifx=urlPrefix;

						//get initial info for scanner table
						var baseLocations=new Array();
						found=false;
						start=0;
						do
						{
							found=false;
							var index=eventsTableHTML.indexOf("map.aspx?loc=",start);
							if(index!=-1)
							{
								var endIndex=eventsTableHTML.indexOf("\"",index);
								index=index+"map.aspx?loc=".length;
								if(endIndex!=-1)
								{
									found=true;
									start=endIndex;
									
									var baseLocation=eventsTableHTML.substring(index,endIndex);
									baseLocations.push(baseLocation);
								}
							}
						}
						while(found);
						var systemLocations=new Array();
						var systemLocationsMap=new Array();
						for(var i=0;i<baseLocations.length;i++)
						{
							var baseLocation=baseLocations[i];
							index=baseLocation.lastIndexOf(":");
							var systemLocation=baseLocation.substring(0,index);
							if(systemLocationsMap[systemLocation]==null)
							{
								systemLocationsMap[systemLocation]=true;
								systemLocations.push(systemLocation);
							}
						}
						//add header
						var html="<tr class='listing-header' align='center'>";
						html=html+"<td>&nbsp;&nbsp;&nbsp;Target Base&nbsp;&nbsp;&nbsp;</td>";
						html=html+"<td>&nbsp;&nbsp;&nbsp;Target Astro&nbsp;&nbsp;&nbsp;</td>";
						html=html+"<td>&nbsp;&nbsp;&nbsp;Player&nbsp;&nbsp;&nbsp;</td>";
						html=html+"<td>&nbsp;&nbsp;&nbsp;Size&nbsp;&nbsp;&nbsp;</td>";
						html=html+"</tr>";
						html=html+"<tr align='center'>";
						html=html+"<td>&nbsp;&nbsp;&nbsp-&nbsp;&nbsp;&nbsp;</td>";
						html=html+"<td>&nbsp;&nbsp;&nbsp-&nbsp;&nbsp;&nbsp;</td>";
						html=html+"<td>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;</td>";
						html=html+"<td>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;</td>";
						html=html+"</tr>";
						var tableHtml="<table border='1' width='100%' class='layout listing sorttable'>"+html+"</table>";
						scannerTable.innerHTML=tableHtml;
						var incomingFleetsInfo=new Array();
						
						//start HTTP requests to get base info
						startBaseRequest(baseURLPreifx,bases,0,eventsTable,baseStructuresArray,incomingFleetsInfo,systemLocations);
					}
				}
			}
		}
	}
	catch(error)
	{
		handleError(error);
	}
}
function BaseStructures(url)
{
	this.url=url;
	this.baseName=null;
	this.structures=new Array();

	this.addStructure=function(name,count)
	{
		this.structures[name]=count;
	}
	this.getStructureCount=function(name)
	{
		var count=0;
		if(this.structures[name]!=null)
		{
			count=this.structures[name];
		}

		return count;
	}
}
function FleetItems(url)
{
	this.url=url;
	this.name=null;
	this.items=new Array();

	this.addItem=function(name,count)
	{
		this.items[name]=count;
	}
	this.getItemCount=function(name)
	{
		var count=0;
		if(this.items[name]!=null)
		{
			count=this.items[name];
		}

		return count;
	}
}
function FleetItems(url)
{
	this.url=url;
	this.name=null;
	this.items=new Array();

	this.addItem=function(name,count)
	{
		this.items[name]=count;
	}
	this.getItemCount=function(name)
	{
		var count=0;
		if(this.items[name]!=null)
		{
			count=this.items[name];
		}

		return count;
	}
}
function SystemIncomingFleet(systemLocation)
{
	this.systemLocation=systemLocation;
	this.items=new Array();

	this.addFleet=function(name,fleet)
	{
		this.items[name]=fleet;
	}
	this.getFleets=function(name)
	{
		var fleet=null;
		if(this.items[name]!=null)
		{
			fleet=this.items[name];
		}

		return fleet;
	}
}
function AstroIncomingFleet(astroLocation,baseName)
{
	this.astroLocation=astroLocation;
	this.baseName=baseName;
	this.items=new Array();
}
function AstroIncomingFleetItem()
{
	this.player=null;
	this.size=null;
	this.fleetID=null;
}
