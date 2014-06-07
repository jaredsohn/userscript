// coding: utf-8
// ==UserScript==
// @name		Ikariam Savaş Raporları Still
// @namespace	triumphal-arch-11x.ikariam
// @description	Savaş raporu detaylı hammadde ve toplam yagma ve hammadde toplamı(www.ikariam.forumm.biz)
// @author		celal
// @version	142
// @include	http://s*.ikariam.*/*
// @exclude	http://support.ikariam.*/*
// ==/UserScript==

/*
This project is inspired by these scripts (or parts of them) to design Triumphal Arch :
Ikariam Multi-Page Combat Report Viewer
http://userscripts.org/scripts/show/45439
Ikariam Attack Counter (for 0.3.0)
http://userscripts.org/scripts/show/45285
Ikariam Attack Counter (for 0.2.8)
http://userscripts.org/scripts/show/31603
*/

if (!TriumphalArch)	var TriumphalArch = {};

TriumphalArch =
	{
	/* Requires modules */
	Log:			 {},
	DOM:			 {},
	Str:			 {},
	Ikariam:		 {},
	DB:				 {},
	Handlers:		 {},
	Updater:		 {},
	
	StartTime:		 0,
	LogEnabled:		 false,
	
	/* Script metas */
	ScriptName:		 'Ikariam Triumphal Arch',
	Version:		 142,
	HomePage:		 '',
	ScriptURL:		 '',
	UserScriptsID:	 47093
	};

TriumphalArch.Init = function()
	{
	this.StartTime		 = new Date().getTime();
	this.HomePage		 = 'http://userscripts.org/scripts/show/'+this.UserScriptsID;
	this.ScriptURL		 = 'http://userscripts.org/scripts/source/'+this.UserScriptsID+'.user.js';
	
	/* Init Log */
	this.Log.Init(this);
	this.Log._Enabled = this.LogEnabled;
	this.Log.Add('Start...');
	
	this.DOM.Init(this);
	this.Str.Init(this);
	this.Ikariam.Init(this);
	this.DB.Init(this);
	this.DB.Load_Options();
	this.Handlers.Init(this);
	this.Updater.Init(this);
	
	if (this.Ikariam.View() == 'militaryAdvisorCombatReports')
		{
		this.ViewIsCombatReports();
		}
	else if (this.Ikariam.View() == 'militaryAdvisorReportView')
		{
		if (this.Ikariam.Fetch_CombatId() != 0)
			{
			this.ViewIsCombatReport();
			}
		else if (this.Ikariam.Fetch_DetailedCombatId() != 0)
			{
			this.ViewIsDetailedCombatReport();
			}
		}
	else if (this.Ikariam.View() == 'militaryAdvisorMilitaryMovements')
		{
		
		}
	else if (this.Ikariam.View() == 'island')
		{
		this.ViewIsIsland();
		}
	else if (this.Ikariam.View() == 'worldmap_iso')
		{
		this.ViewIsWorldMap();
		}
		
	this.Log.Add('End !');
	};
	
TriumphalArch.CheckScriptUpdate = function()
	{
	if ((this.DB.Options['LastCheckUpdate'] == undefined) || (this.DB.Options['LastCheckUpdate'] < this.StartTime - (1000 * 60 * 60 * 24)))
		{
		var self = this;
		var ScriptURL = 'http://userscripts.org/scripts/source/'+this.UserScriptsID+'.meta.js?since='+this.StartTime;
		this.Updater.Check(ScriptURL, function(availableVersion) { self._CompareScriptUpdate(availableVersion); });
		}
	else
		{
		this.Log.Add('Not need check update today');
		}
	};
	
TriumphalArch._CompareScriptUpdate = function(availableVersion)
	{
	this.Log.Add('Available version: '+availableVersion);
	if (availableVersion != 0)
		{
		availableVersion = parseInt(availableVersion);
		
		if ((availableVersion > this.Version) && ((this.DB.Options['AvailableVersion'] == undefined) || (availableVersion > this.DB.Options['AvailableVersion'])))
			{
			if (confirm(this.DB.Get_Text('DoUpgrade',this.ScriptName,availableVersion)))
				{
				GM_openInTab(this.ScriptURL+'?version='+availableVersion+'.user.js');
				}
			}
		
		this.DB.Options['AvailableVersion'] = availableVersion;
		this.DB.Options['LastCheckUpdate'] = this.StartTime;
		this.DB.Save_Options();
		}
	};
	
TriumphalArch.PreProcessing = function()
	{
	this.DB.Load_Texts();
	this.DB.Load_Filters();
	
	this.DB.Load_CombatReports();
	this.DB.Load_Stats();
	this.Merge_Old_CombatReports();
	this.Remove_Old_CitiesStats();
	
	this.Ikariam.Fetch_CitiesSelect(this.DB.Cities, true);
	this.Fetch_CombatReports_Cities(this.DB.Cities);
	this.DB.Generate_CitiesNames(this.DB.Cities);
	};
	
TriumphalArch.Remove_Old_CitiesStats = function()
	{
	// Processings counters
	stDelCities	 = 0;
	stDel		 = 0;
	stSaved		 = 0;
	
	var StatsId;
	for (StatsId in this.DB.Stats)
		{
		if (this.DB.Stats[StatsId].deletedcity == true)
			{
			stDelCities++;
			
			
			}
		stSaved++;
		}
		
	this.Log.Add('Remove old cities stats : '+stDelCities+' deleted cities => '+stDel+' cities stats removed, and '+stSaved+' cities stats saved.');
	};
	
TriumphalArch.Merge_Old_CombatReports = function()
	{
	var crTimeLimit = new Date();
	// GameForge servers are germany time-zoned 
	/*
	crTimeLimit.setTime(crTimeLimit.getTime() -
		this.Ikariam.CombatReport_MaxTime() -
		(crTimeLimit.getTimezoneOffset()*60*1000));
	*/
	crTimeLimit.setTime(this.Ikariam.serverTime() - this.Ikariam.CombatReport_MaxTime());
	
	// Processings counters
	crNotTimed	 = 0;
	crOld		 = 0;
	crNoId		 = 0;
	crRecent	 = 0;
	crDel		 = 0;
	
	var CombatId;
	for (CombatId in this.DB.CombatReports)
		{
		var crTime = this.DB.CombatReports[CombatId].time;
		
		if ((crTime == undefined) || (crTime == 0))
			{
			// May delete it
			crNotTimed++;
			if (delete this.DB.CombatReports[CombatId]) crDel++;
			}
		else if (crTime <= crTimeLimit.getTime())
			{
			// Old
			crOld++;
			
			var crCityId = this.DB.CombatReports[CombatId].tcityid;
			if ((crCityId == undefined) || (crCityId == 0))
				{
				if (this.DB.CombatReports[CombatId].tBarbarianVillage == true)
					{
					// keep battles against barbarians
					var crCityName = this.DB.CombatReports[CombatId].tcityname;
					this.DB.Insert_CombatReport_Stats(crCityName, this.DB.CombatReports[CombatId]);
					
					if (delete this.DB.CombatReports[CombatId]) crDel++;
					}
				else
					{
					// Unknown city
					crNoId++;
					
					if (delete this.DB.CombatReports[CombatId]) crDel++;
					}
				}
			else
				{
				this.DB.Insert_CombatReport_Stats(crCityId, this.DB.CombatReports[CombatId]);
				
				if (delete this.DB.CombatReports[CombatId]) crDel++;
				}
			}
		else
			{
			// recent
			crRecent++;
			}
		}
	
	if (crDel > 0)
		{
		this.DB.Save_Stats();
		this.DB.Save_CombatReports();
		}
	
	this.Log.Add('Merge old CRs : '+crNotTimed+' CR without time, '+crOld+' old CR ('+crNoId+' without city ID) => '+crDel+' CR deleted, and '+crRecent+' recents CR.');
	};
	
TriumphalArch.Fetch_CombatReports_Cities = function(database)
	{
	var DefaultCityNameFilter	 = this.DB.Get_Filter('DefaultCityName');

	var CombatId;
	for (CombatId in this.DB.CombatReports)
		{
		if (this.DB.CombatReports[CombatId].confirmed != true) continue;
		
		var CityName = this.DB.CombatReports[CombatId].tcityname;
		if ((CityName == undefined) || (CityName == '') || (CityName == DefaultCityNameFilter)) continue;
		
		var CityId = this.DB.CombatReports[CombatId].tcityid;
		if ((CityId == undefined) || (CityId == 0)) continue;
		
		if (database[CityId] == undefined)
			{
			//this.Log.Add('Registered city['+CityId+']: "'+CityName+'"');
			database[CityId] = new this.Ikariam.City_Object();
			database[CityId].id = CityId;
			database[CityId].name = CityName;
			if (this.DB.CombatReports[CombatId].tplayername != undefined)
				database[CityId].playername = this.DB.CombatReports[CombatId].tplayername;
			}
		if (database[CityId].knownTime > this.DB.CombatReports[CombatId].time)	database[CityId].knownTime = this.DB.CombatReports[CombatId].time;
		}
	};
	
TriumphalArch.Get_CombatReport_Title = function(CombatId)
	{
	var CombatTitle = '';
	
	if (this.DB.CombatReports[CombatId] != undefined)
		{
		CombatTitle = this.DB.CombatReports[CombatId].title;
		
		if (this.DB.hasTexts())
			{
			var tcityname = this.DB.CombatReports[CombatId].tcityname;
			if ((tcityname != undefined) && (tcityname != ''))
				{
				if (this.DB.CombatReports[CombatId].navy == true)
					{
					CombatTitle = this.DB.Get_Text('SeaBattleNear',tcityname);
					}
				else
					{
					CombatTitle = this.DB.Get_Text('BattleFor',tcityname);
					}
				}
			}
		}
	
	return CombatTitle;
	};
	
TriumphalArch.ViewIsCombatReport = function()
	{
	this.Log.Add('View is CR: '+this.Ikariam.Fetch_CombatId());
	
	this.PreProcessing();
	
	this.Ikariam.Fetch_CombatReport(this.DB.CombatReports);
	
	this.DB.Save_CombatReports();
	};
	
TriumphalArch.ViewIsDetailedCombatReport = function()
	{
	this.Log.Add('View is CR: '+this.Ikariam.Fetch_CombatId());
	
	this.PreProcessing();
	
	this.Ikariam.Fetch_DetailedCombatReport(this.DB.CombatReports);
	
	this.DB.Save_CombatReports();
	};
	
TriumphalArch.ViewIsCombatReports = function()
	{
	this.PreProcessing();
	
	this.Ikariam.Fetch_CombatReports(this.DB.CombatReports);
	this.Complete_CombatReports();
	this.DB.Save_CombatReports();
	
	this.DB.Generate_Stats();
	
	this.Set_Common_Styles();
	this.Set_CombatReports_Styles();
	this.Insert_CombatReports_Header();
	if (this.Ikariam.CombatReports_StartValue() == 0)
		{
		this.Insert_Next_CombatReports(0);
		}
	else
		{
		this.Insert_CombatReports_Stats();
		}
	this.Insert_Footer();
	
	this.CheckScriptUpdate();
	
	this.Handlers.Attach_CombatReports_Events();
	};
	
TriumphalArch.ViewIsWorldMap = function()
	{
	this.PreProcessing();
	
	this.DB.Generate_Stats();
	
	this.Set_Common_Styles();
	//this.Set_WorldMap_Styles();
	//this.Insert_WorldMap_IslandsInfos();
	};
	
TriumphalArch.ViewIsIsland = function()
	{
	this.PreProcessing();
	
	this.DB.Generate_Stats();
	
	this.Set_Common_Styles();
	this.Set_Island_Styles();
	this.Insert_Island_CitiesInfos();
	};
	
TriumphalArch.Complete_CombatReports = function()
	{
	var DefaultCityNameFilter	 = this.DB.Get_Filter('DefaultCityName');
	var BarbarianVillageFilter	 = this.DB.Get_Filter('BarbarianVillage');
	var SeaBattleNearFilter		 = this.DB.Get_Filter('SeaBattleNear');
	var BattleForFilter			 = this.DB.Get_Filter('BattleFor');
	var regSBN					 = new RegExp(SeaBattleNearFilter, "i");
	var regBF					 = new RegExp(BattleForFilter, "i");
	
	var combatId;
	for (combatId in this.DB.CombatReports)
		{
		var combatTitle = this.DB.CombatReports[combatId].title;
		
		// Try to fetch city name from combat title
		var tcityname = '';
		if (this.DB.hasFilters() == true)
			{
			var RegExpRes = regSBN.exec(combatTitle);
			if (RegExpRes != null)
				{
				this.DB.CombatReports[combatId].navy = true;
				tcityname = this.Str.Trim(RegExpRes[1]);
				}
				
			var RegExpRes = regBF.exec(combatTitle);
			if (RegExpRes != null)
				{
				tcityname = this.Str.Trim(RegExpRes[1]);
				}
				
			if (tcityname == '')
				{
				this.Log.Add('CR['+combatId+'] city name not detected.');
				//this.DB._hasFilters = false; 
				if (this.DB.CombatReports[combatId].tcityname == undefined)
					{
					this.DB.CombatReports[combatId].tcityname = '';
					}
					
				if (this.DB.CombatReports[combatId].tcityname != '')
					{
					tcityname = this.DB.CombatReports[combatId].tcityname;
					this.DB.CombatReports[combatId].deletedcity = true;
					}
				}
			else
				{
				this.DB.CombatReports[combatId].tcityname = tcityname;
				
				// Check if barbarian village
				if (tcityname == BarbarianVillageFilter)
					{
					this.Log.Add('CR['+combatId+'] city is barbarian village.');
					this.DB.CombatReports[combatId].tBarbarianVillage = true;
					this.DB.CombatReports[combatId].confirmed = true;
					}
				}
			}
			
		// Try to complete data from DB
		if ((this.DB.CombatReports[combatId].confirmed == undefined) || (this.DB.CombatReports[combatId].confirmed == false))
			{
			if ((tcityname != '') && (tcityname != DefaultCityNameFilter))
				{
				if (this.DB.CombatReports[combatId].tcityid == undefined)
					{
					if ((this.DB.CitiesNames[tcityname] != undefined) && (this.DB.CitiesNames[tcityname].Ids != undefined))
						{
						var CityId = 0;
						var lastTime = 0;
						for (CityId in this.DB.CitiesNames[tcityname].Ids)
							{
							var knownTime = this.DB.CitiesNames[tcityname].Ids[CityId];
							if ((lastTime == 0) || (lastTime <= knownTime))
								{
								this.DB.CombatReports[combatId].tcityid = CityId;
								lastTime = knownTime;
								}
							}
						this.Log.Add('Detected city['+this.DB.CombatReports[combatId].tcityid+']: "'+tcityname+'"');
						}
					}
					
				if (this.DB.CombatReports[combatId].own == undefined)
					{
					if ((this.DB.CitiesNames[tcityname] != undefined) && (this.DB.CitiesNames[tcityname].own == true))
						{
						this.DB.CombatReports[combatId].own = true;
						}
					}
				}
				
			if ((this.DB.CombatReports[combatId].tcityid != undefined) && (this.DB.CombatReports[combatId].tcityid != 0))
				{
				var tcityid = this.DB.CombatReports[combatId].tcityid;
				
				if ((this.DB.Stats[tcityid] != undefined) && (this.DB.Stats[tcityid].own != undefined))
					{
					this.DB.CombatReports[combatId].own = this.DB.Stats[tcityid].own;
					}
					
				if ((this.DB.Stats[tcityid] != undefined) && (this.DB.Stats[tcityid].islandid != undefined) && (this.DB.Stats[tcityid].islandid != 0))
					{
					this.DB.CombatReports[combatId].tislandid = this.DB.Stats[tcityid].islandid;
					}
					
				if ((this.DB.Stats[tcityid] != undefined) && (this.DB.Stats[tcityid].deletedcity != undefined))
					{
					this.DB.CombatReports[combatId].deletedcity = this.DB.Stats[tcityid].deletedcity;
					}
					
				if ((this.DB.CombatReports[combatId].tplayername == undefined) || (this.DB.CombatReports[combatId].tplayername == ''))
					{
					if ((this.DB.Stats[tcityid] != undefined) && (this.DB.Stats[tcityid].playername != undefined) && (this.DB.Stats[tcityid].playername != ''))
						{
						this.DB.CombatReports[combatId].tplayername = this.DB.Stats[tcityid].playername;
						}
					}
				}
				
			this.DB.CombatReports[combatId].confirmed = false;
			}
		
		}
	};
	
TriumphalArch.Insert_Island_CitiesInfos = function()
	{
	var DefaultCityNameFilter	 = this.DB.Get_Filter('DefaultCityName');

	var CitiesInfos = this.DOM.Get_Nodes("//div[@id='mainview']/ul[@id='cities']/li/ul[contains(@class,'cityinfo')]");
	if (CitiesInfos != null)
		{
		var bashTimeLimit = new Date();
		// GameForge servers are germany time-zoned 
		/*
		bashTimeLimit.setTime(bashTimeLimit.getTime() -
					this.Ikariam.Bash_Delay() -
					(bashTimeLimit.getTimezoneOffset()*60*1000));
		
		*/
		bashTimeLimit.setTime(this.Ikariam.serverTime() - this.Ikariam.Bash_Delay());
		
		var crTimeLimit = new Date();
		// GameForge servers are germany time-zoned 
		/*
		crTimeLimit.setTime(crTimeLimit.getTime() -
			this.Ikariam.CombatReport_MaxTime() -
			(crTimeLimit.getTimezoneOffset()*60*1000));
		*/
		crTimeLimit.setTime(this.Ikariam.serverTime() - this.Ikariam.CombatReport_MaxTime());
		
		// Create ordered (by date) array of combat report's indexes under bash delay
		//var CRs = this.DB.Get_TimeOrdered_CombatReportsIds(bashTimeLimit);
		var CRs = this.DB.Get_TimeOrdered_CombatReportsIds(crTimeLimit);
		
		function FetchDestinationCityId(sHTML)
			{
			var CityId = null;
			var resReg = /[\?&]{1}destinationCityId=([0-9]+)[\&\"]{1}/i.exec(sHTML);
			if (resReg != null)
				{
				CityId = parseInt(resReg[1]);
				}
			return CityId;
			}

		for (var i = 0; i < CitiesInfos.snapshotLength; i++)
			{
			var ul = CitiesInfos.snapshotItem(i);
			var lis = ul.getElementsByTagName("li");
			var cityName = this.Str.Trim(lis[0].childNodes[1].textContent);
			var isBarbarianVillage = false;
			
			var cityId = null;
			var cityLocation = ul.parentNode;
			var ulActions = cityLocation.getElementsByTagName("ul")[1];
			var lisActions = ulActions.getElementsByTagName("li");
			for (var k = 0; k < lisActions.length; k++)
				{
				var liAction = lisActions[k];
				cityId = FetchDestinationCityId(this.Str.UnAmp(liAction.innerHTML));
				if (cityId != null)
					{
					// Found
					break;
					}
				}
				
			this.Log.Add('Detect city['+cityId+',"'+cityName+'"]');
			// Todo: support while current city is on island to resolve cityId=null
			
			// Todo: fetch city level
			var cityLevel = null;
			
			var crWon = '?';
			var crLost = '?';
			var crBash = '?';
			var CityStats = this.DB.Get_CityStats(cityId, cityName);
			if (CityStats != null)
				{
				crWon = CityStats.won;
				crLost = CityStats.lost;
				crBash = CityStats.bash;

				if (CityStats.own == true)
					{
					crBash = '-';
					}
					
				this.Log.Add('CityStats['+cityId+',"'+cityName+'"]: navyWon='+CityStats.navyWon+', navyLost='+CityStats.navyLost+', plunders='+CityStats.plunders+'');
				}
			else continue;
				
				
			if ((cityId != 0) && (this.DB.Cities[cityId] != undefined) && (this.DB.Cities[cityId].own == true))
				{
				crBash = '-';
				}
				
			var BashClass = "taBash";
			if ((crBash == '?') || (crBash == '-'))
				{
				// No more class
				}
			else if (crBash >= 6)
				{
				BashClass += " taRed";
				}
			else if (crBash >= 5)
				{
				BashClass += " taOrange";
				}
			else
				{
				BashClass += " taGreen";
				}
				
			var LastBattles = '';
			var BattlesNbr = 0;
			for (var j = 0; j < CRs.length; j++)
				{
				var CombatId = CRs[j];
				if ((cityId != 0) && (this.DB.CombatReports[CombatId].tcityid != undefined) && (this.DB.CombatReports[CombatId].tcityid != 0) && (this.DB.CombatReports[CombatId].tcityid != cityId))
					{
					
					}
				else if ((cityId != 0) && (cityName == DefaultCityNameFilter) && (this.DB.CombatReports[CombatId].tcityid != cityId))
					{
					
					}
				else if (cityName == this.DB.CombatReports[CombatId].tcityname)
					{
					var CombatTime			 = new Date(this.DB.CombatReports[CombatId].time);
					var CombatLocalTime		 = new Date(this.DB.CombatReports[CombatId].time-this.Ikariam.serverTimeOffset());
					var BattleClass = '';
					if (this.DB.CombatReports[CombatId].running == true) BattleClass = 'running';
					if (this.DB.CombatReports[CombatId].won == true) BattleClass = 'won';
					if (this.DB.CombatReports[CombatId].lost == true) BattleClass = 'lost';
					if (this.DB.CombatReports[CombatId].navy == true) BattleClass += ' navy';
					if (this.DB.CombatReports[CombatId].new == true) BattleClass += ' new';
					
					var crLoot = '';
					if ((this.DB.CombatReports[CombatId].own == true) || (this.DB.CombatReports[CombatId].isAttacked == true))
						{
						// ignore
						}
					else if (this.DB.CombatReports[CombatId].loot != undefined)
						{
						var ResType;
						for (ResType in this.DB.CombatReports[CombatId].loot)
							{
							var ResValue = this.DB.CombatReports[CombatId].loot[ResType];
							var ResIcon = '<img src="'+this.Ikariam.Get_ResourceIcon_ImgSrc(ResType)+'"'+
									' title="'+this.Str.FormatBigNumber(ResValue)+' '+this.DB.Get_Text(ResType)+'"/>';
									
							crLoot += ResIcon;
							if (ResValue > 500) crLoot += ResIcon;
							if (ResValue > 2000) crLoot += ResIcon;
							if (ResValue > 5000) crLoot += ResIcon;
							if (ResValue > 10000) crLoot += ResIcon;
							}
						}
						
					var crConfirmed = '';
					if (this.DB.CombatReports[CombatId].confirmed != true)
						{
						crConfirmed = '<sup class="taUnConfirmed"><img src="skin/icons/wichtig.gif" /></sup>';
						}
					
					LastBattles += '<li class="'+BattleClass+'">'+
							'<a href="/index.php?view=militaryAdvisorReportView&combatId='+CombatId+'"'+
							' title="'+CombatLocalTime.toLocaleString()+'">'+
							this.Ikariam.Get_CombatReport_DateTime(CombatTime)+
							crConfirmed+
							'</a>'+
							' '+crLoot+
							'</li>';
							
					BattlesNbr++;
					if (BattlesNbr >= 6) break;
					}
				}
			
			var LastBattle = '';
			if (LastBattles != '')
				{
				LastBattles = 
						'<span class="textLabel">'+this.DB.Get_Text('Battles')+': </span>'+
						'<ul>'+
						LastBattles+
						'</ul>';
				}
			else if ((CityStats.lastTime != undefined) && (CityStats.lastTime > 0))
				{
				var CombatTime		 = new Date(CityStats.lastTime);
				var CombatLocalTime	 = new Date(CityStats.lastTime-this.Ikariam.serverTimeOffset());
				LastBattle = '<li class="name taLastBattle"><span class="textLabel"><nobr>'+
							this.DB.Get_Text('LastBattle')+': </nobr></span>'+
							'<nobr title="'+CombatLocalTime.toLocaleString()+'">'+this.Ikariam.Get_CombatReport_DateTime(CombatTime, true)+'</nobr>'+
							'</li>';
				}
			
			var Battlefield = '';
			if ((CityStats.battlefieldwall != undefined) && (CityStats.battlefieldwall > 0))
				{
				var WallIcon = '<img src="skin/layout/icon-wall.gif"/>';
						
				var crBattlefield = '';
				for (var w=1; w <= CityStats.battlefieldwall; w++)
					{
					crBattlefield += WallIcon;
					}
				
				Battlefield = '<li class="name taBattlefield"><span class="textLabel"><nobr>'+
							this.DB.Get_Text('BattleField')+': </nobr></span>'+
							'<nobr>'+crBattlefield+'</nobr>'+
							'</li>';
				}
				
			ul.innerHTML = ul.innerHTML +
				Battlefield+
				'<li class="name taStats" title="'+this.DB.Get_Text('BattlesWLB')+'">'+
				'<span class="textLabel"><nobr>'+this.DB.Get_Text('WLB')+': </nobr></span>'+
				crWon+' / '+crLost+' / <span class="'+BashClass+'">'+crBash+'</span>'+
				'</li>'+
				'<li class="name taLastBattles">'+
				LastBattles+
				'</li>'+
				LastBattle;
			}
		}
	};
	
TriumphalArch.Insert_CombatReports_Header = function()
	{
	var Operations = this.DOM.Get_Nodes("//table[contains(@class,'operations')]");
	if ((Operations != null) && (Operations.snapshotLength > 0))
		{
		var node = Operations.snapshotItem(0);
		var HeaderSubject = '';
		if (this.Ikariam.CombatReports_StartValue() == 0)
			{
			HeaderSubject = this.DB.Get_Text('BattlesXXXhrs',24);
			}
		else
			{
			HeaderSubject = this.DB.Get_Text('Battles');
			}
		node.innerHTML = 
				'<thead class="taHeader"><tr>\n' + 
				'<th class="empty"></th>\n' +
				'<th class="empty"></th>\n' +
				'<th class="date empty"></th>\n' +
				'<th class="subject">'+HeaderSubject+'</th>\n' +
				'<th class="empty"></th>\n' +
				'<th nowrap class="taIslands"><img align="absmiddle" src="skin/layout/icon-world.gif" /></th>\n' +
				'<th nowrap colspan=3 title="'+this.DB.Get_Text('BattlesWLB')+'">'+this.DB.Get_Text('WonLostBash')+'</th>\n' +
				'<th nowrap class="taLoots">'+this.DB.Get_Text('Loots')+'</th>\n' +
				'<th class="empty"></th>\n' +
				'</tr></thead>'+
				node.innerHTML;
		}
	};
	
TriumphalArch.Insert_Next_CombatReports = function(numMax)
	{
	if (numMax == undefined) numMax = 10;
	
	var Subjects = this.DOM.Get_Nodes("//table[contains(@class,'operations')]/tbody/tr/td[contains(@class,'subject')]");
	if ((Subjects != null) && (Subjects.snapshotLength > 0))
		{
		var lastSubject = Subjects.snapshotItem(Subjects.snapshotLength - 1);
		var lastCR = lastSubject.parentNode;
		var Operations = this.DOM.Get_First_Node("//table[contains(@class,'operations')]/tbody");
		
		var bashTimeLimit = new Date();
		// GameForge servers are germany time-zoned 
		/*
		bashTimeLimit.setTime(bashTimeLimit.getTime() -
					this.Ikariam.Bash_Delay() -
					(bashTimeLimit.getTimezoneOffset()*60*1000));
		
		*/
		bashTimeLimit.setTime(this.Ikariam.serverTime() - this.Ikariam.Bash_Delay());
		
		var bashTimeLimitUTC = new Date();
		bashTimeLimitUTC.setTime(this.Ikariam.serverTime() - this.Ikariam.serverTimeOffset() - this.Ikariam.Bash_Delay());
		
		// Create ordered (by date) array of combat report's indexes under bash delay
		var CRs = this.DB.Get_TimeOrdered_CombatReportsIds(bashTimeLimit);
		
		var NumAdded = 0;
		for (var j = Subjects.snapshotLength; j < CRs.length; j++)
			{
			if (NumAdded >= numMax) break;
			
			var CombatId = CRs[j];
			var CombatTime = new Date(this.DB.CombatReports[CombatId].time);
			
			// this.Log.Add("Insert combat report: "+CombatId);
			var tr = document.createElement('tr');
			tr.setAttribute("combatid", CombatId);
			
			var td = document.createElement('td');
			td.setAttribute("class", "empty");
			tr.appendChild(td);
			
			// Checkbox
			var td = document.createElement('td');
			td.innerHTML = '<input type="checkbox" name="combatId[' + CombatId + ']" value="1" />';
			tr.appendChild(td);
			
			// Date
			var td = document.createElement('td');
			td.setAttribute("class", "date");
			td.innerHTML = this.Ikariam.Get_CombatReport_DateTime(CombatTime);
			tr.appendChild(td);
			
			// Title
			var td = document.createElement('td');
			var SubjectClass = "subject";
			if (this.DB.CombatReports[CombatId].new == true) SubjectClass += ' new';
			if (this.DB.CombatReports[CombatId].won == true)
				{
				SubjectClass += ' won';
				}
			else if (this.DB.CombatReports[CombatId].lost == true)
				{
				SubjectClass += ' lost';
				}
			else if (this.DB.CombatReports[CombatId].running == true)
				{
				SubjectClass += ' running';
				}
			td.setAttribute("class", SubjectClass);
			td.innerHTML = '<a href="/index.php?view=militaryAdvisorReportView&combatId=' +
						CombatId +
						'" title="' + this.DB.CombatReports[CombatId].title + '">' +
						this.DB.CombatReports[CombatId].title +
						'</a>';
			tr.appendChild(td);
			
			var td = document.createElement('td');
			td.setAttribute("class", "empty");
			tr.appendChild(td);
			
			lastCR = Operations.insertBefore(tr, lastCR.nextSibling);
			NumAdded++;
			}
		
		// Footer
		var taNextCR = document.getElementById("taNextCR");
		if (taNextCR == null)
			{
			var tr = document.createElement('tr');
			tr.setAttribute("class", 'taNextCR');
			
			var td = document.createElement('td');
			td.setAttribute("class", "empty");
			td.setAttribute("colspan", "3");
			tr.appendChild(td);
			
			var taNextCR = document.createElement('td');
			taNextCR.id = 'taNextCR';
			taNextCR.title = this.DB.Get_Text('SinceX', bashTimeLimitUTC.toLocaleString());
			taNextCR.innerHTML = '<span id="taRangeNextCR"></span> | <a id="taButtonNextCR" href="javascript://void(0);"></a>'+
								'<br/>'+
								this.DB.Get_Text('UnConfirmedCR','<img src="skin/icons/wichtig.gif" />');
			tr.appendChild(taNextCR);
			
			var td = document.createElement('td');
			td.setAttribute("class", "empty");
			td.setAttribute("colspan", "2");
			tr.appendChild(td);
			
			var td = document.createElement('td');
			td.id = 'taSumWon';
			tr.appendChild(td);
			
			var td = document.createElement('td');
			td.id = 'taSumLost';
			tr.appendChild(td);
			
			var td = document.createElement('td');
			td.id = 'taSumBash';
			tr.appendChild(td);
			
			var td = document.createElement('td');
			td.id = 'taSumLoots';
			td.setAttribute("rowspan", "4");
			tr.appendChild(td);
			
			var td = document.createElement('td');
			td.setAttribute("class", "empty");
			tr.appendChild(td);
			
			Operations.insertBefore(tr, lastCR.nextSibling);
			}
		
		if (NumAdded < (CRs.length - Subjects.snapshotLength))
			{
			var taRangeNextCR = document.getElementById("taRangeNextCR");
			taRangeNextCR.innerHTML = '1-'+(NumAdded+Subjects.snapshotLength)+' / '+(CRs.length);
			var taButtonNextCR = document.getElementById("taButtonNextCR");
			taButtonNextCR.innerHTML = this.DB.Get_Text('NextXXXCR', (CRs.length - Subjects.snapshotLength - NumAdded));
			}
		else
			{
			taNextCR.innerHTML = '1-'+(NumAdded+Subjects.snapshotLength)+' / '+Math.max(CRs.length,(NumAdded+Subjects.snapshotLength))+' | '+this.DB.Get_Text('NoMoreCR')+
								'<br/>'+
								this.DB.Get_Text('UnConfirmedCR','<img src="skin/icons/wichtig.gif" />');
			}
		
		}
	
	this.Insert_CombatReports_Stats();
	};
	
TriumphalArch.Insert_CombatReports_Stats = function()
	{
	this.Log.Add("Insert stats about battles");
	
	var Subjects = this.DOM.Get_Nodes("//table[contains(@class,'operations')]/tbody/tr/td[contains(@class,'subject')]");
	if (Subjects != null)
		{
		var sumWon = 0;
		var sumLost = 0;
		var sumLoots	 = {};
		sumLoots.wood	 = 0;
		sumLoots.wine	 = 0;
		sumLoots.marble	 = 0;
		sumLoots.glass	 = 0;
		sumLoots.sulfur	 = 0;
		
		var setAlt = false;
		for (var i=0; i < Subjects.snapshotLength; i++)
			{
			var Subject = Subjects.snapshotItem(i);
			var tr = Subjects.snapshotItem(i).parentNode;
			if (setAlt == true)
				{
				this.DOM.Add_ClassName(tr, 'alt');
				setAlt = false;
				}
			else
				{
				this.DOM.Remove_ClassName(tr, 'alt');
				setAlt = true;
				}
			
			var CombatId = tr.getAttribute('combatid');
			if ((CombatId == null) || (CombatId == '') || (CombatId == 0) || (this.DB.CombatReports[CombatId] == undefined)) continue;
			
			if (this.DB.CombatReports[CombatId].won == true)
				{
				sumWon++;
				}
			else if (this.DB.CombatReports[CombatId].lost == true)
				{
				sumLost++;
				}
				
			var crLoot = '';
			if ((this.DB.CombatReports[CombatId].own == true) || (this.DB.CombatReports[CombatId].isAttacked == true))
				{
				// Ignore
				}
			else if (this.DB.CombatReports[CombatId].loot != undefined)
				{
				var ResType;
				for (ResType in this.DB.CombatReports[CombatId].loot)
					{
					var ResValue = this.DB.CombatReports[CombatId].loot[ResType];
					var ResIcon = '<img src="'+this.Ikariam.Get_ResourceIcon_ImgSrc(ResType)+'"'+
							' title="'+this.Str.FormatBigNumber(ResValue)+' '+this.DB.Get_Text(ResType)+'"/>';
							
					crLoot += ResIcon;
					if (ResValue > 500) crLoot += ResIcon;
					if (ResValue > 2000) crLoot += ResIcon;
					if (ResValue > 5000) crLoot += ResIcon;
					if (ResValue > 10000) crLoot += ResIcon;
					
					sumLoots[ResType] = sumLoots[ResType] + parseInt(ResValue);
					}
				}
			
			if (this.DOM.Has_ClassName(tr, 'taStats') == false)
				{
				var cityName			 = this.DB.CombatReports[CombatId].tcityname;
				var cityId				 = this.DB.CombatReports[CombatId].tcityid;
				var islandId			 = this.DB.CombatReports[CombatId].tislandid;
				var CombatTitle			 = this.Get_CombatReport_Title(CombatId);
				var CombatTime			 = new Date(this.DB.CombatReports[CombatId].time);
				var CombatLocalTime		 = new Date(this.DB.CombatReports[CombatId].time-this.Ikariam.serverTimeOffset());
				var DeletedCity			 = this.DB.CombatReports[CombatId].deletedcity;
				var crWon	 = '?';
				var crLost	 = '?';
				var crBash	 = '?';
				
				var CityStats = this.DB.Get_CityStats(cityId, cityName);
				if (CityStats != null)
					{
					crWon = CityStats.won;
					crLost = CityStats.lost;
					if (this.DB.CombatReports[CombatId].tBarbarianVillage == true)
						{
						crBash = '-';
						}
					else if ((this.DB.CombatReports[CombatId].own == true) || (this.DB.CombatReports[CombatId].isAttacked == true))
						{
						crBash = '-';
						}
					else if (this.DB.CombatReports[CombatId].isEmpty == true)
						{
						crBash = '-';
						}
					else crBash = CityStats.bash;
					
					if (CityStats.deletedcity == true) DeletedCity = CityStats.deletedcity;
					if ((CityStats.islandid != undefined) && (CityStats.islandid != 0)) islandId = CityStats.islandid;
					}
					
				if (this.DB.CombatReports[CombatId].running == true)
					{
					var crWon = '-';
					var crLost = '-';
					}
				
				if (this.DB.CombatReports[CombatId].navy == true)
					{
					this.DOM.Add_ClassName(tr, 'taNavy');
					}
				
				var tds = tr.getElementsByTagName("td");
				
				// Apply short date/time
				tds[2].innerHTML = this.Ikariam.Get_CombatReport_DateTime(CombatTime,true);
				tds[2].title = CombatLocalTime.toLocaleString();
				
				var alinks = tds[3].getElementsByTagName("a");
					
				// Prevent deleted cities
				alinks[0].title = CombatTitle;
				if (DeletedCity == true)
					{
					if (this.DB.CombatReports[CombatId].navy == true)
						{
						alinks[0].innerHTML = this.DB.Get_Text('SeaBattleNear','<s>'+cityName+'</s>');
						}
					else
						{
						alinks[0].innerHTML = this.DB.Get_Text('BattleFor','<s>'+cityName+'</s>');
						}
					}
				else alinks[0].innerHTML = CombatTitle;
				
				if ((this.DB.CombatReports[CombatId].own == true) || (this.DB.CombatReports[CombatId].isAttacked == true))
					{
					
					}
				else if ((this.DB.CombatReports[CombatId].tplayername != undefined) && (this.DB.CombatReports[CombatId].tplayername != ''))
					{
					alinks[0].innerHTML = this.Str.Trim(alinks[0].innerHTML) + ' ('+this.DB.CombatReports[CombatId].tplayername+')';
					}
				
				if (this.DB.CombatReports[CombatId].confirmed != true)
					{
					alinks[0].innerHTML = this.Str.Trim(alinks[0].innerHTML) + '<sup class="taUnConfirmed"><img src="skin/icons/wichtig.gif" /></sup>';
					}
					
				if (((this.DB.CombatReports[CombatId].own == true) || (this.DB.CombatReports[CombatId].isAttacked == true)) && (this.DB.CombatReports[CombatId].attackers != undefined))
					{
					tds[3].innerHTML += '<div class="taAttackers">vs '+this.DB.CombatReports[CombatId].attackers+'</div>';
					}
					
				var BashClass = "taBash";
				if ((crBash == '?') || (crBash == '-'))
					{
					// No more class
					}
				else if (crBash >= 6)
					{
					BashClass += " taRed";
					}
				else if (crBash >= 5)
					{
					BashClass += " taOrange";
					}
				else
					{
					BashClass += " taGreen";
					}
					
				var crIsland = '';
				if ((cityId != undefined) && (cityId != 0))
					{
					if ((islandId != undefined) && (islandId != 0))
						{
						crIsland = '<a href="./?view=island&id='+islandId+'&selectCity='+cityId+'" title="'+cityName+'"><img align="absmiddle" src="skin/layout/icon-island.gif" /></a>';
						}
					else if (DeletedCity != true)
						{
						crIsland = '<a href="./?view=island&cityId='+cityId+'" title="'+cityName+'"><img align="absmiddle" src="skin/layout/icon-island.gif" /></a>';
						}
					}
				
				tr.innerHTML = tr.innerHTML +
						'<td class="taIsland" nowrap>'+
							crIsland+
							'</td>\n' +
						'<td class="taWon" nowrap>'+
							crWon+
							'&nbsp;</td>\n' +
						'<td class="taLost" nowrap>'+
							crLost+
							'&nbsp;</td>\n' +
						'<td class="'+BashClass+'" nowrap>'+
							crBash+
							'&nbsp;</td>\n' +
						'<td class="taLoot" nowrap>'+crLoot+'</td>\n'+
						'<td class="empty"></td>\n';
						
				this.DOM.Add_ClassName(tr, 'taStats');
				}
			}
		
		var taSumWon = document.getElementById("taSumWon");
		if (taSumWon != null)
			{
			taSumWon.innerHTML = sumWon+'&nbsp;';
			}
		
		var taSumLost = document.getElementById("taSumLost");
		if (taSumLost != null)
			{
			taSumLost.innerHTML = sumLost+'&nbsp;';
			}
			
		var taSumLoots = document.getElementById("taSumLoots");
		if (taSumLoots != null)
			{
			var sumLootsHTML = '';
			var totalLoots = 0;
			var ResType;
			for (ResType in sumLoots)
				{
				totalLoots += parseInt(sumLoots[ResType]);
				var ResIcon = '<img class="'+ResType+'" src="'+this.Ikariam.Get_ResourceIcon_ImgSrc(ResType)+'" />';
				if (sumLoots[ResType] > 0) sumLootsHTML += '<nobr title="'+this.Str.FormatBigNumber(sumLoots[ResType])+' '+this.DB.Get_Text(ResType)+'">'+this.Str.FormatBigNumber(sumLoots[ResType])+' '+ResIcon+'</nobr><br>';
				}
			if (totalLoots > 0) sumLootsHTML += '<nobr title="'+this.Str.FormatBigNumber(totalLoots)+'">= '+this.Str.FormatBigNumber(totalLoots)+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</nobr>';
			taSumLoots.innerHTML = sumLootsHTML;
			}
		}
	};
	
TriumphalArch.Set_Common_Styles = function()
	{
	// define CSS 
	var default_style = <><![CDATA[
	.taGreen { color: green; }
	.taRed { color: red; font-weight: bold;}
	.taOrange { color: orange; font-weight: bold;}
	
	p.taFooter { margin-bottom: 10px; font-size: 11px;}
	]]></>.toXMLString();
	GM_addStyle(default_style);
	};
	
TriumphalArch.Set_Island_Styles = function()
	{
	// define CSS 
	var default_style = <><![CDATA[
	li.taBattlefield {clear: both}
	li.taBattlefield img {max-height: 12px; margin-right: 1px !important; display: inline !important;}
	li.taStats {clear: both}
	li.taStats .textLabel {width: auto !important; min-width: 80px; }
	li.taLastBattles .textLabel {width: auto !important;}
	li.taLastBattles ul { clear: both;}
	li.taLastBattles ul li { font-weight: normal; margin: 0px !important; line-height: 15px !important; height: 15px; padding-top: 3px; padding-bottom: 3px; padding-left: 33px !important; padding-right: 10px !important; border-bottom: 1px solid #F6EBBC;}
	li.taLastBattles ul li { background-image: url(skin/characters/military/x40_y40/y40_swordsman_faceright.gif); background-position: -3px -4px; background-repeat: no-repeat; }
	li.taLastBattles ul li.running { background-image: url(skin/advisors/military/bang_soldier.gif); background-position: -1px -4px;}
	li.taLastBattles ul li.navy { background-image: url(skin/characters/fleet/40x40/ship_ballista_r_40x40.gif);background-position: -3px -7px;}
	li.taLastBattles ul li.won a {color: green;}
	li.taLastBattles ul li.lost a {color: red;}
	li.taLastBattles ul li.new a {font-weight: bold;}
	li.taLastBattles ul li.running a { color: black; }
	li.taLastBattles ul li img {max-height: 11px; margin: 0px !important; margin-right: -8px !important; display: inline !important;}
	li.taLastBattles ul li .taUnConfirmed img { margin-right: 0px !important; }
	]]></>.toXMLString();
	GM_addStyle(default_style);
	};
	
TriumphalArch.Set_CombatReports_Styles = function()
	{
	// define CSS 
	var default_style = <><![CDATA[
	table.operations {margin-bottom: 0px !important;}
	table.operations {background-color: #FAEAC6;}
	
	table.operations thead tr th.subject {text-align: left;}
	table.operations thead tr th.taIslands img { border: none; max-height: 15px;}
	table.operations thead tr th.taLoots {text-align: center; border-width: 1px; border-color: #FDF1D4; border-left-style: solid;}
	
	table.operations tbody tr.taStats {background-color: #FDF7DD;}
	table.operations tbody tr.alt {background-color: #FDF1D4;}
	
	table.operations tbody tr.taStats td.date { min-width: 120px; }
	table.operations tbody tr.taStats td.subject { background-image: url(skin/characters/military/x40_y40/y40_swordsman_faceright.gif); background-position: 0px -4px; background-repeat: no-repeat; padding-left: 42px !important; border-bottom: 1px solid #FDF1D4;}
	table.operations tbody tr.taNavy td.subject { background-image: url(skin/characters/fleet/40x40/ship_ballista_r_40x40.gif);background-position: 0px -6px;}
	table.operations tbody tr.taStats td.running { background-image: url(skin/advisors/military/bang_soldier.gif); background-position: 0px -4px;}
	table.operations tbody tr.taNavy td.running { background-image: url(skin/advisors/military/bang_ship.gif);background-position: 0px -1px;}
	table.operations tbody tr.taStats td.subject .taAttackers {font-size: 10px; color: #CB9B6A;}
	
	table.operations tbody tr.taStats td.taIsland img { border: none; max-height: 15px;}
	
	table.operations tbody tr.taStats td.taWon,
	table.operations tbody tr.taStats td.taLost,
	table.operations tbody tr.taStats td.taBash {text-align: right; }
	table.operations tbody tr.taStats td.taLost,
	table.operations tbody tr.taStats td.taBash {border-width: 1px; border-color: #FAEAC6; }
	table.operations tbody tr.taStats td.taLost { border-left-style: solid; border-right-style: solid;}
	table.operations tbody tr.taStats td.taBash { border-right-style: solid;}
	
	table.operations tbody tr.taStats td.taLoot {text-align: left; padding-right: 10px !important; }
	table.operations tbody tr.taStats td.taLoot img {max-height: 13px; margin-right: -8px;}
	
	table.operations td.empty { width: auto !important; padding: 0px !important;}
	
	#taNextCR { color: #CB9B6A; font-size: 11px;}
	#taNextCR a { font-weight: bold;}
	#taSumWon,
	#taSumLost,
	#taSumBash {color: #CB9B6A;text-align: right; border-width: 1px; border-color: #FDF1D4; border-right-style: solid; }
	#taSumLoots {text-align: right; color: #CB9B6A; font-size: 9px;}
	#taSumLoots img { min-width: 13px; max-height: 9px;}
	]]></>.toXMLString();
	GM_addStyle(default_style);
	
	};
	
TriumphalArch.Insert_Footer = function()
	{
	this.Log.Add('Add footer...');
	
	var htmlInner = '';
	htmlInner += '<p class="taFooter" style="text-align: right;">';
	htmlInner += this.DB.Get_Text('EnhancedBy','<a target="_blank" href="'+this.HomePage+'"><b>'+this.ScriptName+'</b></a>','<i>'+this.Version+'</i>');
	if (this.DB.Options['AvailableVersion'] > this.Version)
		htmlInner += ' <a href="'+this.ScriptURL+'?version='+this.DB.Options['AvailableVersion']+'.user.js'+'" style="color: red;"><b>'+this.DB.Get_Text('NewVersion','<i>'+this.DB.Options['AvailableVersion']+'</i>')+'</b></a>';
	htmlInner += '</p>';

	var formElt = document.getElementById('mainview');
	formElt.innerHTML = formElt.innerHTML + htmlInner;
	
	if (this.DB.hasFilters() != true)
		{
		formElt.innerHTML = formElt.innerHTML + '<p class="taFooter" style="text-align: left;"><span style="color: red;">Not support <b>'+this.Ikariam.Host()+'</b> with <b>'+this.Ikariam.Language()+'</b> language</span> ; some features disabled. <i>Check updates or help us</i>...</p>';
		}
	};
	
TriumphalArch.DB =
	{
	_Parent: null,
	Prefix:				 null,
	Filters:			 null,
	_hasFilters:		 false,
	Texts:				 null,
	_hasTexts:			 false,
	CombatReports:		 {},
	Stats:				 {},
	Cities:				 {},
	CitiesNames:		 {},
	Options:			 {}
	};
	
TriumphalArch.DB.Init = function(parent, host)
	{
	// Requires: Ikariam
	this._Parent = parent;
	if (host == undefined) host = this._Parent.Ikariam.Host();
	
	var prefix = host;
	prefix = prefix.replace('.ikariam.', '-');
	prefix = prefix.replace('.', '-');
	this.Prefix = prefix;
	};

TriumphalArch.DB.Load_Texts = function(lang)
	{
	// Requires: Ikariam
	var Texts = {};
	if (lang == undefined) lang = this._Parent.Ikariam.Language();
	
	/*
	%1, %2,  and %3 are magical keywords to insert data into localized texts
	*/

	// ikariam.org (english as default language)
	Texts['en']					 = {};
	Texts['en'].DIR				 = ''; // Leave blank or set rtl for Right-to-Left languages
	Texts['en'].BattleFor		 = "Battle for %1"; // %1=city name
	Texts['en'].SeaBattleNear	 = "Sea battle near %1"; // %1=city name
	Texts['en'].Battles			 = "Battles";
	Texts['en'].LastBattle		 = "Last battle";
	Texts['en'].BattlesXXXhrs	 = "Battles while last %1hrs"; // %1=elapsed hours
	Texts['en'].WonLostBash		 = "won / lost / bash"; // Set short-names if too long
	Texts['en'].NoMoreCR		 = "no more recents combat reports.";
	Texts['en'].NextXXXCR		 = "next %1 recents combat reports..."; // %1=number
	Texts['en'].BattlesWLB		 = "Battles: Won / Lost / Bash";
	Texts['en'].WLB				 = "W. / L. / Bash"; // Set abbreviate letters
	Texts['en'].UnConfirmedCR	 = "(%1) combat report not confirmed."; // %1=asterisk symbol
	Texts['en'].Loots			 = "Loots";
	Texts['en'].wood			 = "wood";
	Texts['en'].wine			 = "wine";
	Texts['en'].marble			 = "marble";
	Texts['en'].glass			 = "crystal";
	Texts['en'].sulfur			 = "sulphur";
	Texts['en'].DoUpgrade		 = "Do you want to install \"%1\" v. %2 ?"; // %1=script name %2=script version
	Texts['en'].EnhancedBy		 = "Enhanced by %1 (v. %2)."; // %1=script name %2=script version
	Texts['en'].NewVersion		 = "NEW RELEASE V. %1 AVAILABLE !"; // %1=script version
	Texts['en'].BattleField		 = "Battlefield"; // NB: translate it with short text for island view
	Texts['en'].SinceX			 = "Since %1"; // %1=local date/time

	// ae.ikariam.com
	Texts['ae']					 = {};
	Texts['ae'].DIR				 = 'rtl';
	Texts['ae'].BattleFor		 = "معركة %1";
	Texts['ae'].SeaBattleNear	 = "معركة بحرية بالقرب من %1";
	Texts['ae'].WonLostBash		 = "bash / lost / won"; 
	Texts['ae'].BattlesWLB		 = "Battles: Bash / Lost / Won";
	Texts['ae'].WLB				 = "Bash / L. / W."; 
	
	// ikariam.de by simon.thesorcerer
	Texts['de']					 = {};
	Texts['de'].BattleFor		 = "Schlacht um %1";
	Texts['de'].SeaBattleNear	 = "Seekampf vor %1";
	Texts['de'].Battles			 = "Schlachten";
	Texts['de'].BattlesXXXhrs	 = "Schlachten innerhalb der letzten %1 Stunden";
	Texts['de'].WonLostBash		 = "Gewonnen / Verloren / Bash";
	Texts['de'].NoMoreCR		 = "Keine weiteren Kampfberichte in den letzten 24 Stunden";
	Texts['de'].NextXXXCR		 = "Noch %1 weitere Kampfberichte in den letzten 24 Stunden...";
	Texts['de'].BattlesWLB		 = "Schlachten: Gewonnen / Verloren / Bash";
	Texts['de'].WLB				 = "G. / V. / Bash";
	Texts['de'].UnConfirmedCR	 = "(%1) Kampfbericht nicht bestätigt.";
	Texts['de'].Loots			 = "Beute";
	Texts['de'].wood			 = "Baumaterial";
	Texts['de'].wine			 = "Wein";
	Texts['de'].marble			 = "Marmor";
	Texts['de'].glass			 = "Kristallglas";
	Texts['de'].sulfur			 = "Schwefel";
	Texts['de'].DoUpgrade		 = "Wollen Sie \"%1\" v. %2 installieren?";
	Texts['de'].EnhancedBy		 = "Kampfberichteübersicht erweitert durch %1 (v. %2).";
	Texts['de'].NewVersion		 = "NEUE VERSION V. %1 VERFÜGBAR!";
	Texts['de'].BattleField		 = "Schlachtfeld";
	Texts['de'].SinceX			 = "Seit %1";
	
	// ikariam.com.br by  RaphaelPH    
	Texts['br']					 = {};
	Texts['br'].BattleFor		 = "Batalha por #%1";
	Texts['br'].SeaBattleNear	 = "Batalha no mar perto de %1";
	Texts['br'].Battles			 = "Batalhas";
	Texts['br'].BattlesXXXhrs	 = "Batalhas nas últimas %1hrs";
	Texts['br'].WonLostBash		 = "Vit. / Der. / Bash";
	Texts['br'].NoMoreCR		 = "Sem relatório de combate recente.";
	Texts['br'].NextXXXCR		 = "Próximo(s) %1 relatório(s) de combate recente...";
	Texts['br'].BattlesWLB		 = "Batalhas: Vitórias / Derrotas / Bash";
	Texts['br'].WLB				 = "V. / D. / Bash";
	Texts['br'].UnConfirmedCR	 = "(%1) relatório(s) de combate não confirmado(s).";
	Texts['br'].Loots			 = "Saques";
	Texts['br'].wood			 = "madeira";
	Texts['br'].wine			 = "vinho";
	Texts['br'].marble			 = "mármore";
	Texts['br'].glass			 = "cristal";
	Texts['br'].sulfur			 = "enxofre";
	
	// ikariam.bg by samkijot
	Texts['bg']					 = {};
	Texts['bg'].BattleFor		 = "Битка за %1";
	Texts['bg'].SeaBattleNear	 = "Морска битка за %1";
	Texts['bg'].Battles			 = "Битки";
	Texts['bg'].BattlesXXXhrs	 = "За последните %1 часа";
	Texts['bg'].WonLostBash		 = "победа / загуба / башинг";
	Texts['bg'].NoMoreCR		 = "Няма нови доклади.";
	Texts['bg'].NextXXXCR		 = "Следващ %1 доклад ...";
	Texts['bg'].BattlesWLB		 = "Битки: Победа / Загуба / Башинг";
	Texts['bg'].WLB				 = "П. / З. / Башинг";
	Texts['bg'].UnConfirmedCR	 = "(%1) непотвърден доклад.";
	Texts['bg'].Loots			 = "Заграбено"
	Texts['bg'].wood			 = "Дърво";
	Texts['bg'].wine			 = "Вино";
	Texts['bg'].marble			 = "Мрамор";
	Texts['bg'].glass			 = "Кристал";
	Texts['bg'].sulfur			 = "Сяра";

	// ikariam.cz
	Texts['cz']					 = {};
	Texts['cz'].BattleFor		 = "Bitva o %1";
	Texts['cz'].SeaBattleNear	 = "Námořní bitva poblíž %1";
	Texts['cz'].Loots			 = "Kořist";
	Texts['cz'].wood			 = "Dřevo";
	Texts['cz'].wine			 = "Víno";
	Texts['cz'].marble			 = "Mramor";
	Texts['cz'].glass			 = "Sklo";
	Texts['cz'].sulfur			 = "Síra";

	// ikariam.dk by Supergoof
	Texts['dk']					 = {};
	Texts['dk'].BattleFor		 = "Kamp ved %1";
	Texts['dk'].SeaBattleNear	 = "Hav kamp nær %1";
	Texts['dk'].Battles			 = "Kampe";
	Texts['dk'].BattlesXXXhrs	 = "Kampe de sidste %1 timer";
	Texts['dk'].WonLostBash		 = "Vundet / Tabt / Bash";
	Texts['dk'].NoMoreCR		 = "Ikke flere kamprapporter over de sidste 24 timer.";
	Texts['dk'].NextXXXCR		 = "Næste %1 kamprapporter...";
	Texts['dk'].BattlesWLB		 = "Kampe: Vundet / Tabt / Bash";
	Texts['dk'].WLB				 = "V. / T. / Bash";
	Texts['dk'].UnConfirmedCR	 = "(%1) ubekræftede kamprapporter.";
	Texts['dk'].Loots			 = "Bytte";
	Texts['dk'].wood			 = "Træ";
	Texts['dk'].wine			 = "Vin";
	Texts['dk'].marble			 = "Marmor";
	Texts['dk'].glass			 = "Krystal";
	Texts['dk'].sulfur			 = "Svovl";
	
	// ikariam.es, ar.ikariam.com by 0sama
	Texts['es']					 = {};
	Texts['es'].BattleFor		 = "Batalla en %1";
	Texts['es'].SeaBattleNear	 = "Batalla marítima frente a %1";
	Texts['es'].Battles			 = "Batallas";
	Texts['es'].BattlesXXXhrs	 = "Batallas en las últimas %1hrs";
	Texts['es'].WonLostBash		 = "Gan / Perd / Golpe";
	Texts['es'].NoMoreCR		 = "No hay más informes de guerra recientes";
	Texts['es'].NextXXXCR		 = "Siguientes %1 informes de guerra...";
	Texts['es'].BattlesWLB		 = "Batallas: Gan / Perd / Golpe";
	Texts['es'].WLB				 = "G. / P. / Golpe";
	Texts['es'].UnConfirmedCR	 = "(%1) informes de guerra no confirmados.";
	Texts['es'].Loots			 = "Botín";
	
	// fi.ikariam.com by DeFe
	Texts['fi']					 = {};
	Texts['fi'].BattleFor		 = "Kaupungin %1 taistelu";
	Texts['fi'].SeaBattleNear	 = "Meritaistelu kaupungin %1 lähivesillä";
	Texts['fi'].Battles			 = "Taistelut";
	Texts['fi'].BattlesXXXhrs	 = "Taistelut viimeseltä %1 tunnilta";
	Texts['fi'].WonLostBash		 = "Voitto / Häviö / Bash";
	Texts['fi'].NoMoreCR		 = "ei enempää tuoreita taisteluraportteja.";
	Texts['fi'].NextXXXCR		 = "seuraava %1 tuore taisteluraportti...";
	Texts['fi'].BattlesWLB		 = "Taistelut: Voitto / Häviö / Bash";
	Texts['fi'].WLB				 = "V. / H. / Bash";
	Texts['fi'].UnConfirmedCR	 = "(%1) taistelu raporttia ei ole vahvistettu.";
	Texts['fi'].Loots			 = "Saalis";
	Texts['fi'].wood			 = "Puu";
	Texts['fi'].wine			 = "Viini";
	Texts['fi'].marble			 = "Marmori";
	Texts['fi'].glass			 = "Kristalli";
	Texts['fi'].sulfur			 = "Rikki";
	Texts['fi'].DoUpgrade		 = "Haluatko asentaa \"%1\" v. %2 ?";
	Texts['fi'].EnhancedBy		 = "Enhanced by %1 (v. %2).";
	Texts['fi'].NewVersion		 = "Uusi versio v. %1 saatavilla !";
	
	// ikariam.fr
	Texts['fr']					 = {};
	Texts['fr'].BattleFor		 = "Bataille de %1";
	Texts['fr'].SeaBattleNear	 = "Bataille navale de %1";
	Texts['fr'].Battles			 = "Batailles";
	Texts['fr'].LastBattle		 = "Dern. bataille";
	Texts['fr'].BattlesXXXhrs	 = "Dernières batailles depuis %1h";
	Texts['fr'].WonLostBash		 = "vict. / déf. / bash";
	Texts['fr'].NoMoreCR		 = "pas d'autres rapports de combat récents.";
	Texts['fr'].NextXXXCR		 = "%1 autre rapports de combat récents...";
	Texts['fr'].BattlesWLB		 = "Batailles: Victoires / Défaites / Bash";
	Texts['fr'].WLB				 = "V. / D. / Bash";
	Texts['fr'].UnConfirmedCR	 = "(%1) rapport de combat non-confirmé."; 
	Texts['fr'].Loots			 = "Butins";
	Texts['fr'].wood			 = "bois";
	Texts['fr'].wine			 = "vin";
	Texts['fr'].marble			 = "marbre";
	Texts['fr'].glass			 = "cristal";
	Texts['fr'].sulfur			 = "soufre";
	Texts['fr'].DoUpgrade		 = "Voulez-vous installer la version %2 du script \"%1\" ?";
	Texts['fr'].EnhancedBy		 = "Amélioré par le script %1 (version %2).";
	Texts['fr'].NewVersion		 = "NOUVELLE VERSION %1 DISPONIBLE !";
	Texts['fr'].BattleField		 = "Ch. bataille";
	Texts['fr'].SinceX			 = "Depuis %1";
	
	// ikariam.gr by panoz and Napoleon I
	Texts['gr']					 = {};
	Texts['gr'].BattleFor		 = "Μάχη για %1";
	Texts['gr'].SeaBattleNear	 = "Ναυμαχία κοντά στην %1";
	Texts['gr'].Battles			 = "Μάχες";
	Texts['gr'].BattlesXXXhrs	 = "Μάχες το τελευταίο %1ωρο";
	Texts['gr'].WonLostBash		 = "Νίκες Ήττες Επιθ.";
	Texts['gr'].NoMoreCR		 = "Δεν υπάρχουν άλλες πρόσφατες αναφορές μαχών.";
	Texts['gr'].NextXXXCR		 = "Επόμενες %1 πρόσφατες αναφορές μαχών...";
	Texts['gr'].BattlesWLB		 = "Μάχες: Νίκες / Ήττες / Επιθέσεις";
	Texts['gr'].WLB				 = "Νίκες / Ήττες / Επιθέσεις";
	Texts['gr'].UnConfirmedCR	 = "(%1) αναφορά μάχης μη επιβεβαιωμένη.";
	Texts['gr'].Loots			 = "Λάφυρα";
	Texts['gr'].wood			 = "Οικοδομικό Υλικό";
	Texts['gr'].wine			 = "Κρασί";
	Texts['gr'].marble			 = "Μάρμαρο";
	Texts['gr'].glass			 = "Κρύσταλλο";
	Texts['gr'].sulfur			 = "Θείο";
	Texts['gr'].DoUpgrade		 = "Θέλεις να εγκαταστήσεις \"%1\" v. %2 ?";
	Texts['gr'].EnhancedBy		 = "Διαμορφωμένο από το %1 (v. %2).";
	Texts['gr'].NewVersion		 = "ΝΕΑ ΕΚΔΟΣΗ V. %1 ΔΙΑΘΕΣΙΜΗ !";
	Texts['gr'].BattleField		 = "Πεδίο Μάχης";
	
	// ikariam.hu by Sracz66 
	Texts['hu']					 = {};
	Texts['hu'].BattleFor		 = "Csata ezért: %1";
	Texts['hu'].SeaBattleNear	 = "Tengeri csata: %1";
	Texts['hu'].Battles			 = "Csaták";
	Texts['hu'].BattlesXXXhrs	 = "Csaták az elmúlt %1 órában";
	Texts['hu'].WonLostBash		 = "gy. / v. / Z!"; 
	Texts['hu'].NoMoreCR		 = "Nincs több friss jelentés.";
	Texts['hu'].NextXXXCR		 = "Következő %1 legfrissebb jelentés...";
	Texts['hu'].BattlesWLB		 = "Csaták: Gy. / V. / Zúzás"; 
	Texts['hu'].WLB				 = "Gy. / V. / Zúzás"; 
	Texts['hu'].UnConfirmedCR	 = "(%1) olvasatlan jelentés."; 
	Texts['hu'].Loots			 = "Fosztások";
	Texts['hu'].wood			 = "fa";
	Texts['hu'].wine			 = "bor";
	Texts['hu'].marble			 = "márvány";
	Texts['hu'].glass			 = "kristály";
	Texts['hu'].sulfur			 = "kén";
	
	// ikariam.it by maumau321
	Texts['it']					 = {};
	Texts['it'].BattleFor		 = "Battaglia per %1";
	Texts['it'].SeaBattleNear	 = "Battaglia navale vicino a %1";
	Texts['it'].Battles			 = "Battaglie";
	Texts['it'].BattlesXXXhrs	 = "Battaglie nelle ultime %1 ore";
	Texts['it'].WonLostBash		 = "vinte / perse / bash";
	Texts['it'].NoMoreCR		 = "nessun combattimento recente.";
	Texts['it'].NextXXXCR		 = "prossimi %1 report di combattimento...";
	Texts['it'].BattlesWLB		 = "Battaglie: Vinte / Perse / Bash";
	Texts['it'].WLB				 = "V. / P. / Bash";

	// ikariam.nl by Londo and Boudewijn 
	Texts['nl']					 = {};
	Texts['nl'].BattleFor		 = "Gevecht voor %1";
	Texts['nl'].SeaBattleNear	 = "Zeegevecht bij %1";
	Texts['nl'].Battles			 = "Gevechten";
	Texts['nl'].LastBattle		 = "Laatste gevecht";
	Texts['nl'].BattlesXXXhrs	 = "Gevechten van de laaste %1 uur";
	Texts['nl'].WonLostBash		 = "win. / verl. / herh.";
	Texts['nl'].NoMoreCR		 = "Niet meer recente gevechtsrapporten.";
	Texts['nl'].NextXXXCR		 = "volgende %1 recente gevechtsrapporten...";
	Texts['nl'].BattlesWLB		 = "Gevechten: Winnaar / Verliezer / Herhalingen";
	Texts['nl'].WLB				 = "W. / V. / Herh.";
	Texts['nl'].UnConfirmedCR	 = "(%1) Gevechtsrapport niet bevestigd.";
	Texts['nl'].Loots			 = "Buit";
	Texts['nl'].wood			 = "hout";
	Texts['nl'].wine			 = "wijn";
	Texts['nl'].marble			 = "marmer";
	Texts['nl'].glass			 = "kristalglas";
	Texts['nl'].sulfur			 = "zwavel";
	Texts['nl'].DoUpgrade		 = "\"%1\" v. %2 installeren?";
	Texts['nl'].EnhancedBy		 = "Verbeterd door %1 (v. %2).";
	Texts['nl'].NewVersion		 = "NIEUWE VERSIE V. %1 BESCHIKBAAR!";
	Texts['nl'].BattleField		 = "Slagveld";

	// ikariam.pl by Sihulagen
	Texts['pl']					 = {};
	Texts['pl'].BattleFor		 = "Bitwa pod %1";
	Texts['pl'].SeaBattleNear	 = "Bitwa morska w pobliżu %1"; 
	Texts['pl'].Battles			 = "Bitwa";
	Texts['pl'].BattlesXXXhrs	 = "Bitwy z ostatnich %1hrs"; 
	Texts['pl'].WonLostBash		 = "wygrane / przegrane / bash";
	Texts['pl'].NoMoreCR		 = "Brak więcej raportów.";
	Texts['pl'].NextXXXCR		 = "next %1 najnowsze raporty wojenne..."; 
	Texts['pl'].BattlesWLB		 = "Bitwa: Wygrane / Przegrane / Bash";
	Texts['pl'].WLB				 = "W. / P. / Bash";
	Texts['pl'].UnConfirmedCR	 = "(%1) Niepotwierdzone raporty."; 
	Texts['pl'].Loots			 = "Łupy";
	
	// ikariam.com.pt
	Texts['pt']					 = {};
	Texts['pt'].BattleFor		 = "Batalha por %1";
	Texts['pt'].SeaBattleNear	 = "Batalha no mar perto de %1";
	Texts['pt'].Battles			 = "Batalhas";
	Texts['pt'].BattlesXXXhrs	 = "Batalhas nas últimas %1hrs";
	Texts['pt'].WonLostBash		 = "Vit. / Der. / Bash"; 
	Texts['pt'].NoMoreCR		 = "Sem relatório(s) de combate recente.";
	Texts['pt'].NextXXXCR		 = "Próximo(s) %1 relatório(s) de combate recente...";
	Texts['pt'].BattlesWLB		 = "Batalhas: Vitórias / Derrotas / Bash";
	Texts['pt'].WLB				 = "V. / D. / Bash"; 
	Texts['pt'].UnConfirmedCR	 = "(%1) relatório(s) de combate não confirmado(s).";
	Texts['pt'].Loots			 = "Saques";
	Texts['pt'].wood			 = "madeira";
	Texts['pt'].wine			 = "vinho";
	Texts['pt'].marble			 = "mármore";
	Texts['pt'].glass			 = "cristal";
	Texts['pt'].sulfur			 = "enxofre";
	
	// ikariam.ro by xiss, siskin
	Texts['ro']					 = {};	
	Texts['ro'].BattleFor		 = "Luptă terestră pentru %1";
	Texts['ro'].SeaBattleNear	 = "Luptă navală lângă %1";
	Texts['ro'].Battles			 = "Lupte";
	Texts['ro'].BattlesXXXhrs	 = "Lupte in ultimele %1 ore";
	Texts['ro'].WonLostBash		 = "Victorii / Înfrângeri / bash";
	Texts['ro'].NoMoreCR		 = "nu mai sunt rapoarte recente.";
	Texts['ro'].NextXXXCR		 = "următoarele %1 rapoarte de luptă recente...";
	Texts['ro'].BattlesWLB		 = "Lupte: Victorii / Înfrângeri / Bash";
	Texts['ro'].WLB				 = "V. / I. / Bash";
	Texts['ro'].UnConfirmedCR	 = "(%1) raportul nu a fost confirmat.";
	Texts['ro'].Loots			 = "Bunuri:";
	Texts['ro'].wood			 = "lemn";
	Texts['ro'].wine			 = "vin";
	Texts['ro'].marble			 = "marmură";
	Texts['ro'].glass			 = "cristal";
	Texts['ro'].sulfur			 = "sulf";
	
	// ikariam.rs by shobra
	Texts['rs']					 = {};
	Texts['rs'].BattleFor		 = "Борба за %1";
	Texts['rs'].SeaBattleNear	 = "Поморска битка поред %1";
	Texts['rs'].Battles			 = "Борбе";
	Texts['rs'].BattlesXXXhrs	 = "Борбе током последњих %1ч";
	Texts['rs'].WonLostBash		 = "доб. / изг. / баш.";
	Texts['rs'].NoMoreCR		 = "Нема више недавних извештаја.";
	Texts['rs'].NextXXXCR		 = "Следећих %1 недавних извештаја...";
	Texts['rs'].BattlesWLB		 = "Борбе: Добијене / Изгубљене / Башинг";
	Texts['rs'].WLB				 = "Д. / И. / Башинг";
	Texts['rs'].UnConfirmedCR	 = "(%1) извештај није потврђен.";
	Texts['rs'].Loots			 = "Плен";
	Texts['rs'].wood			 = "дрво";
	Texts['rs'].wine			 = "вино";
	Texts['rs'].marble			 = "мермер";
	Texts['rs'].glass			 = "кристал";
	Texts['rs'].sulfur			 = "сумпор";
	
	// ikariam.ru by Гуляка, Merlin7
	Texts['ru']					 = {}; 
	Texts['ru'].BattleFor		 = "Битва за %1"; 
	Texts['ru'].SeaBattleNear	 = "Морская битва у %1";
	Texts['ru'].Battles			 = "Битвы";
	Texts['ru'].BattlesXXXhrs	 = "Битвы за последние %1 часа(ов)";
	Texts['ru'].WonLostBash		 = "Поб / Пор / Баш";
	Texts['ru'].NoMoreCR		 = "нет отчетов.";
	Texts['ru'].NextXXXCR		 = "следующие %1 отчетов...";
	Texts['ru'].BattlesWLB		 = "Битвы: Побед / Поражений / Башинг";
	Texts['ru'].WLB				 = "Пб/Пр/Баш";
	Texts['ru'].UnConfirmedCR	 = "(%1) неподтвержденный отчет.";
	Texts['ru'].Loots			 = "Добыча";
	Texts['ru'].wood			 = "Стройматериалы";
	Texts['ru'].wine			 = "Виноград";
	Texts['ru'].marble			 = "Мрамор";
	Texts['ru'].glass			 = "Хрусталь";
	Texts['ru'].sulfur			 = "Сера";
	
	// ikariam.net by  c0sm0    
	Texts['tr']					 = {};
	Texts['tr'].BattleFor		 = "%1 şehri için savaş";
	Texts['tr'].SeaBattleNear	 = "%1 şehri sularında deniz muharebesi";
	Texts['tr'].Battles			 = "Savaşlar";
	Texts['tr'].BattlesXXXhrs	 = "Son %1 saatin savaş raporları";
	Texts['tr'].WonLostBash		 = "Zafer / Yenlg / Sefer";
	Texts['tr'].NoMoreCR		 = "başka savaş raporu yok.";
	Texts['tr'].NextXXXCR		 = "sıradaki %1 savaş raporu...";
	Texts['tr'].BattlesWLB		 = "Savaşlar: Zafer / Yenilgi / Sefer";
	Texts['tr'].WLB				 = "Z. / Y. / Sefer";
	Texts['tr'].UnConfirmedCR	 = "(%1) onaylanmamış savaş raporları.";
	Texts['tr'].Loots			 = "ganimet";
	Texts['tr'].wood			 = "odun";
	Texts['tr'].wine			 = "üzüm";
	Texts['tr'].marble			 = "mermer";
	Texts['tr'].glass			 = "kristal";
	Texts['tr'].sulfur			 = "sülfür";
	
	// ikariam.tw by robertliu
	Texts['tw']					 = {};
	Texts['tw'].BattleFor		 = "%1 之戰"; 
	Texts['tw'].SeaBattleNear	 = "%1 海域的海戰"; 
	Texts['tw'].Battles			 = "戰鬥";
	Texts['tw'].BattlesXXXhrs	 = "最近 %1 小時的戰鬥"; 
	Texts['tw'].WonLostBash		 = "勝利 / 失敗 / 濫攻";
	Texts['tw'].NoMoreCR		 = "沒有更多戰鬥報告.";
	Texts['tw'].NextXXXCR		 = "下 %1 個戰鬥報告..."; 
	Texts['tw'].BattlesWLB		 = "戰鬥: 勝利 / 失敗 / 濫攻";
	Texts['tw'].WLB				 = "勝 / 負 / 濫攻"; 
	Texts['tw'].UnConfirmedCR	 = "(%1) 戰鬥報告尚未確認."; 
	Texts['tw'].Loots			 = "戰利品";
	Texts['tw'].wood			 = "木材";
	Texts['tw'].wine			 = "葡萄酒";
	Texts['tw'].marble			 = "大理石";
	Texts['tw'].glass			 = "水晶";
	Texts['tw'].sulfur			 = "硫磺";

	// ikariam.com.ua by dizzy
	Texts['ua']					 = {};
	Texts['ua'].BattleFor		 = "Битва за %1";
	Texts['ua'].SeaBattleNear	 = "Морська битва під %1";
	Texts['ua'].Battles			 = "Битва";
	Texts['ua'].BattlesXXXhrs	 = "Битви з останніх %1 год";
	Texts['ua'].WonLostBash		 = "виграні / програні / баш";
	Texts['ua'].NoMoreCR		 = "Немає більше звітів.";
	Texts['ua'].NextXXXCR		 = "Наступні %1 найновші військові рапорти...";
	Texts['ua'].BattlesWLB		 = "Битви: Виграні / Програні / Баш";
	Texts['ua'].WLB				 = "В. / П. / Баш";
	Texts['ua'].UnConfirmedCR	 = "(%1) Непідтверджені звіти.";
	Texts['ua'].Loots			 = "Награбовано"
	Texts['ua'].wood			 = "Дерево";
	Texts['ua'].wine			 = "Вино";
	Texts['ua'].marble			 = "Мармур";
	Texts['ua'].glass			 = "Кришталь";
	Texts['ua'].sulfur			 = "Сірка"; 
	
	// ikariam.vn by Minh Truong & fansipang
	Texts['vn']					 = {};
	Texts['vn'].BattleFor		 = "Trận chiến tại %1";
	Texts['vn'].SeaBattleNear	 = "Thủy chiến tại %1";
	Texts['vn'].Battles			 = "Trận chiến";
	Texts['vn'].BattlesXXXhrs	 = "Các trận chiến trong vòng %1 giờ";
	Texts['vn'].WonLostBash		 = "Thắng / Thua / Bash";
	Texts['vn'].NoMoreCR		 = "không còn trận chiến nào trong ngày.";
	Texts['vn'].NextXXXCR		 = "%1 trận chiến kế tiếp...";
	Texts['vn'].BattlesWLB		 = "Các trận chiến: Thắng / Thua / Bash";
	Texts['vn'].WLB				 = "Thắng/Thua/Bash"; 
	Texts['vn'].UnConfirmedCR	 = "(%1) thông báo trận chiến chưa được xác nhận.";
	Texts['vn'].Loots			 = "Chiến lợi phẩm";
	Texts['vn'].wood			 = "Gỗ";
	Texts['vn'].wine			 = "Nho";
	Texts['vn'].marble			 = "Cẩm thạch";
	Texts['vn'].glass			 = "Thủy tinh";
	Texts['vn'].sulfur			 = "Lưu huỳnh";

	// ba.ikariam.com by Bianced
	Texts['yu']					 = {};
	Texts['yu'].BattleFor		 = "Bitka za %1";
	Texts['yu'].SeaBattleNear	 = "Pomorska bitka za %1";
	Texts['yu'].Battles			 = "Bitke";
	Texts['yu'].BattlesXXXhrs	 = "Bitke u zadnjih %1sata";
	Texts['yu'].WonLostBash		 = "dob. / izg. / bash.";
	Texts['yu'].NoMoreCR		 = "Nema više nedavnih izvještaja.";
	Texts['yu'].NextXXXCR		 = "Slijedećih %1 nedavnih izvještaja...";
	Texts['yu'].BattlesWLB		 = "Borbe: Dobivene / Izgubljene / Bashin";
	Texts['yu'].WLB				 = "D. / I. / Bashing";
	Texts['yu'].UnConfirmedCR	 = "(%1) izvještaj nije potvrđen.";
	Texts['yu'].Loots			 = "Plijen";
	Texts['yu'].wood			 = "drvo";
	Texts['yu'].wine			 = "vino";
	Texts['yu'].marble			 = "mramor";
	Texts['yu'].glass			 = "kristal";
	Texts['yu'].sulfur			 = "sumpor";

	/* Aliased languages */
	
	// ikariam.com.br
	//Texts['br'] = Texts['pt']; // Some differences
	
	// Espanol (not sure)
	Texts['ar'] = Texts['es'];
	Texts['mx'] = Texts['es'];
	Texts['cl'] = Texts['es'];
	Texts['co'] = Texts['es'];
	Texts['ve'] = Texts['es'];
	Texts['pe'] = Texts['es'];

	// ikariam.com
	Texts['us'] = Texts['en'];

	// ikariam.hk
	Texts['hk'] = Texts['tw'];
	
	if ((lang != undefined) && (lang != '') && (Texts[lang] != undefined))
		{
		this.Texts = Texts['en'];
		// Merge array while use english as default language
		var tkey;
		for (tkey in Texts[lang])
			{
			this.Texts[tkey] = Texts[lang][tkey];
			}
		this._hasTexts = true;
		}
	else
		{
		this.Texts = Texts['en'];
		this._hasTexts = false;
		}
	};
	
TriumphalArch.DB.Load_Filters = function(lang)
	{
	var Filters = {};
	if (lang == undefined) lang = this._Parent.Ikariam.Language();
	
	// Common filters (not used yet)
	Filters['all']					 = {};
	Filters['all'].BattleTitleDate	 = "^(.+)\\s+\((.+)\)$";
	Filters['all'].DefaultCityName	 = "Polis";

	// ikariam.org
	Filters['en']					 = {};
	Filters['en'].BattleFor			 = "^battle\\s+for\\s+(.*)$"; // To detect city name (see combat reports list page)
	Filters['en'].SeaBattleNear		 = "^sea\\s+battle\\s+near\\s+(.*)$"; // To detect city name (see combat reports list page)
	Filters['en'].PlayerFromCity	 = "^(.+)\\s+from\\s+(.*)$"; // To detect city and player name (see combat report)
	Filters['en'].CityOfPlayer		 = ""; // Set only if PlayerFromCity's filter could not work for your language (while display city name before player name)
	// To support v. 0.3.2 features. You may set filters as displayed in game
	Filters['en'].BarbarianVillage	 = "Barbarian Village"; // City name under v. 0.3.2
	Filters['en'].Barbarians		 = "Barbarians"; // User name under v. 0.3.2
	Filters['en'].DeletedPlayer		 = "Deleted player"; 
	
	// ikariam.es, ar.ikariam.com by 0sama
	Filters['es']					 = {};
	Filters['es'].BattleFor			 = "^batalla\\s+en\\s+(.*)$";
	Filters['es'].SeaBattleNear		 = "^batalla\\s+marítima\\s+frente\\s+a\\s+(.*)$";
	Filters['es'].PlayerFromCity	 = "^(.+)\\s+de\\s+(.*)$";
	
	// ikariam.de
	Filters['de']					 = {};
	Filters['de'].BattleFor			 = "^Schlacht\\s+um\\s+(.*)$";
	Filters['de'].SeaBattleNear		 = "^Seekampf\\s+vor\\s+(.*)$";
	Filters['de'].PlayerFromCity	 = "^(.+)\\s+aus\\s+(.*)$";
	Filters['de'].BarbarianVillage	 = "Barbarendorf";
	Filters['de'].Barbarians		 = "Barbaren";
	Filters['de'].DeletedPlayer		 = "Gelöschter Spieler";
	
	// ikariam.fr
	Filters['fr']					 = {};
	Filters['fr'].BattleFor			 = "^bataille\\s+de\\s+(.*)$";
	Filters['fr'].SeaBattleNear		 = "^bataille\\s+navale\\s+de\\s+(.*)$";
	Filters['fr'].PlayerFromCity	 = "^(.+)\\s+de\\s+(.*)$";
	Filters['fr'].BarbarianVillage	 = "Village Barbare";
	Filters['fr'].Barbarians		 = "Barbares";
	Filters['fr'].DeletedPlayer		 = "Joueur supprimé"; 
	
	// ae.ikariam.com
	Filters['ae']					 = {};
	Filters['ae'].BattleFor			 = "^معركة\\s+(.*)$"; 
	Filters['ae'].SeaBattleNear		 = "^معركة بحرية بالقرب من\\s+(.*)$"; 
	Filters['ae'].PlayerFromCity	 = "^(.+)\\s+من\\s+(.*)$";
	
	// ikariam.it
	Filters['it']					 = {};
	Filters['it'].BattleFor			 = "^battaglia\\e+per\\s+(.*)$";
	Filters['it'].SeaBattleNear		 = "^battaglia\\e+navale\\i+vicino\\o+a+(.*)$";

	// ikariam.nl
	Filters['nl']					 = {};
	Filters['nl'].BattleFor			 = "^gevecht\\s+voor\\s+(.*)$";
	Filters['nl'].SeaBattleNear		 = "^zeegevecht\\s+bij\\s+(.*)$";
	Filters['nl'].PlayerFromCity	 = "^(.+)\\s+uit\\s+(.*)$";
	Filters['nl'].BarbarianVillage	 = "Barbarendorp";
	Filters['nl'].Barbarians		 = "Barbaren";
	Filters['nl'].DeletedPlayer		 = "Verwijderde speler";

	// ikariam.pl
	Filters['pl']					 = {};
	Filters['pl'].BattleFor			 = "^bitwa\\s+pod\\s+(.*)$";
	Filters['pl'].SeaBattleNear		 = "^morska\\s+bitwa\\s+w pobliżu\\s+(.*)$";
	Filters['pl'].PlayerFromCity	 = "^(.+)\\s+z\\s+(.*)$";
	
	// ikariam.com.pt
	Filters['pt']					 = {};
	Filters['pt'].BattleFor			 = "^batalha\\s+por\\s+#?(.*)$";
	Filters['pt'].SeaBattleNear		 = "^batalha\\s+no\\s+mar\\s+perto\\s+de\\s+(.*)$"; 
	
	// ikariam.ru
	Filters['ru']					 = {};
	Filters['ru'].BattleFor			 = "^Битва\\s+за\\s+(.*)$";
	Filters['ru'].SeaBattleNear		 = "^Морская\\s+битва\\s+у\\s+(.*)$";
	Filters['ru'].PlayerFromCity	 = "^(.+)\\s+из\\s+(.*)$";
	
	// ikariam.vn
	Filters['vn']					 = {};
	Filters['vn'].BattleFor			 = "^Trận\\s+chiến\\s+ở\\s+(.*)$";
	Filters['vn'].SeaBattleNear		 = "^Thủy\\s+chiến\\s+gần\\s+(.*)$";
	Filters['vn'].PlayerFromCity	 = "^(.+)\\s+từ\\s+thành\\s+phố\\s+(.*)$";
	
	// ikariam.ro
	Filters['ro']					 = {};
	Filters['ro'].BattleFor			 = "^batalie\\s+pentru\\s+(.*)$";
	Filters['ro'].SeaBattleNear		 = "^lupta\\s+pe\\s+mare\\s+pe\\s+aproape\\s+(.*)$";
	Filters['ro'].PlayerFromCity	 = "^(.+)\\s+de\\s+la\\s+(.*)$";
	
	// ikariam.bg
	Filters['bg'] = {};
	Filters['bg'].BattleFor			 = "^Битка\\s+за\\s+(.*)$";
	Filters['bg'].SeaBattleNear		 = "^Морска\\s+битка\\s+за\\s+(.*)$";
	
	// ikariam.gr
	Filters['gr']					 = {};
	Filters['gr'].BattleFor			 = "^Μάχη\\s+για\\s+(.*)$";
	Filters['gr'].SeaBattleNear		 = "^Ναυμαχία\\s+κοντά\\s+στην\\s+(.*)$";
	Filters['gr'].PlayerFromCity	 = "^(.+)\\s+από\\s+(.*)$"; 

	// ikariam.rs by shobra
	Filters['rs']					 = {};
	Filters['rs'].BattleFor			 = "^Борба\\s+за\\s+(.*)$";
	Filters['rs'].SeaBattleNear		 = "^Поморска\\s+битка\\s+поред\\s+(.*)$";
	Filters['rs'].PlayerFromCity	 = "^(.+)\\s+из\\s+(.*)$";
	
	// ikariam.net by c0sm0 
	Filters['tr']					 = {};
	Filters['tr'].BattleFor			 = "^(.*)\\s+şehri\\s+için\\s+savaş$";
	Filters['tr'].SeaBattleNear		 = "^(.*)\\s+sularında\\s+deniz\\s+muharebesi$";
	Filters['tr'].PlayerFromCity	 = "^(.+)\\s+dan\\s+(.*)$";
	
	// ikariam.hu
	Filters['hu']					 = {};
	Filters['hu'].BattleFor			 = "^csata\\s+(.*)\\s+városáért$"; 
	Filters['hu'].SeaBattleNear		 = "^tengeri\\s+csata\\s+(.*)\\s+közelében$";
	Filters['hu'].PlayerFromCity	 = "^(.+)\\s+innen\\s+(.*)$";

	// ikariam.tw
	Filters['tw']					 = {};
	Filters['tw'].BattleFor			 = "^(.*)\\s+之戰$"; 
	Filters['tw'].SeaBattleNear		 = "^(.*)\\s+海域的海戰$";
	Filters['tw'].PlayerFromCity	 = ""; // Not supported by this server, use CityOfPlayer's filter
	Filters['tw'].CityOfPlayer		 = "^來自\\s+(.*)\\s+的\\s+(.+)$";
	
	// ikariam.com.ua by dizzy
	Filters['ua']					 = {};
	Filters['ua'].BattleFor			 = "^Битва\\s+за\\s+(.*)$";
	Filters['ua'].SeaBattleNear		 = "^Морська\\s+битва\\s+під\\s+(.*)$";
	Filters['ua'].PlayerFromCity	 = "^(.+)\\s+z\\s+(.*)$";

	// ba.ikariam.com by Bianced
	Filters['yu']					 = {};
	Filters['yu'].BattleFor			 = "^Borba\\s+za\\s+(.*)$";
	Filters['yu'].SeaBattleNear		 = "^Pomorska\\s+borba\\s+za\\s+(.*)$";
	Filters['yu'].PlayerFromCity	 = "^(.+)\\s+iz\\s+(.*)$";

	// ikariam.dk by Supergoof
	Filters['dk']					 = {};
	Filters['dk'].BattleFor			 = "^Kamp\\s+ved\\s+(.*)$";
	Filters['dk'].SeaBattleNear		 = "^hav\\s+kamp\\s+nær\\s+(.*)$";
	Filters['dk'].PlayerFromCity	 = "^(.+)\\s+fra\\s+(.*)$";
	
	// fi.ikariam.com
	Filters['fi']					 = {};
	Filters['fi'].BattleFor			 = "^Kaupungin\\s+taistelu\\s+(.*)$";
	Filters['fi'].SeaBattleNear		 = "^Meritaistelu\\s+Kaupungin\\s+lähivesillä\\s+(.*)$";
	Filters['fi'].PlayerFromCity	 = "^(.+)\\s+kaupungista\\s+(.*)$";
	
	// ikariam.cz
	Filters['cz']					 = {};
	Filters['cz'].BattleFor			 = "^bitva\\s+o\\s+(.*)$";
	Filters['cz'].SeaBattleNear		 = "^námořní\\s+bitva\\s+poblíž\\s+(.*)$"; // Todo
	Filters['cz'].PlayerFromCity	 = "^(.+)\\s+z\\s+(.*)$";

	/* Aliased languages */
	
	// ikariam.com.br
	Filters['br'] = Filters['pt'];
	
	// ikariam.com
	Filters['us'] = Filters['en'];
	
	// Espanol (not sure)
	Filters['ar'] = Filters['es'];
	Filters['mx'] = Filters['es'];
	Filters['cl'] = Filters['es'];
	Filters['co'] = Filters['es'];
	Filters['ve'] = Filters['es'];
	Filters['pe'] = Filters['es'];
	
	// ikariam.hk
	Filters['hk'] = Filters['tw'];
	
	// Common filters
	this.Filters = Filters['all'];
	
	if ((lang != undefined) && (lang != '') && (Filters[lang] != undefined))
		{
		// Merge language and common filters in same array
		var tkey;
		for (tkey in Filters[lang])
			{
			this.Filters[tkey] = Filters[lang][tkey];
			}

		this._hasFilters = true;
		return true;
		}
	else
		{
		this._hasFilters = false;
		return false;
		}
	};
	
TriumphalArch.DB.hasFilters = function()
	{
	if (this.Filters == null) this.Load_Filters();
	
	return this._hasFilters;
	}
		
TriumphalArch.DB.hasTexts = function()
	{
	if (this.Texts == null) this.Load_Texts();
	
	return this._hasTexts;
	}
	
TriumphalArch.DB.Get_Text = function(key, s1, s2, s3, s4, s5, s6)
	{
	var Output = '';
	if (s1 == undefined) s1 = '';
	if (s2 == undefined) s2 = '';
	if (s3 == undefined) s3 = '';
	if (s4 == undefined) s4 = '';
	if (s5 == undefined) s5 = '';
	if (s6 == undefined) s6 = '';
	
	if ((this.Texts != undefined) && (this.Texts != null) && (this.Texts[key] != undefined))
		{
		Output = this.Texts[key];
		Output = Output.replace('%1', s1);
		Output = Output.replace('%2', s2);
		Output = Output.replace('%3', s3);
		Output = Output.replace('%4', s4);
		Output = Output.replace('%5', s5);
		Output = Output.replace('%6', s6);
		}
	else
		{
		Output = key;
		}
	
	return Output;
	};
	
TriumphalArch.DB.Get_Filter = function(key)
	{
	var Output = '';
	
	if ((this.hasFilters() == true) && (this.Filters[key] != undefined))
		{
		Output = this.Filters[key];
		}
	
	return Output;
	};
	
TriumphalArch.DB.CityName_Object = function()
	{
	var CityName = new Object;
	
	CityName.Ids		 = {};
	//this.own			 = undefined;
	
	return CityName;
	};
	
TriumphalArch.DB.Generate_CitiesNames = function(database)
	{
	var DefaultCityNameFilter	 = this.Get_Filter('DefaultCityName');

	var CityId;
	for (CityId in database)
		{
		CityName = database[CityId].name;
		if ((CityName != '') && (CityName != DefaultCityNameFilter))
			{
			if (this.CitiesNames[CityName] == undefined)
				{
				this.CitiesNames[CityName] = new this.CityName_Object();
				}
			if ((database[CityId].own != undefined) && (database[CityId].own == true))
				{
				this.CitiesNames[CityName].own = true;
				this.CitiesNames[CityName].Ids[CityId] = database[CityId].knownTime;
				}
			else
				{
				this.CitiesNames[CityName].Ids[CityId] = database[CityId].knownTime;
				}
			//this._Parent.Log.Add('Registered city['+CityId+']: "'+CityName+'"');
			}
		}
	};
	
TriumphalArch.DB.Stats_Object = function()
	{
	var StatsObject = new Object;
	//StatsObject.cityname			 = '';
	//StatsObject.cityid			 = 0;
	//StatsObject.own			 = false;
	//StatsObject.islandid			 = 0;
	//StatsObject.playername		 = '';
	//StatsObject.playerid			 = 0; //todo
	//StatsObject.battlefieldwall		 = 0; // Not wall level, number of wall units on battlefield : 0, 3, 5, or 7
	
	//StatsObject.deletedcity		 = false;
	
	StatsObject.won			 = 0;
	StatsObject.lost		 = 0;
	StatsObject.navyWon		 = 0;
	StatsObject.navyLost	 = 0;
	StatsObject.plunders	 = 0;
	//StatsObject.loots		 = {};
	
	StatsObject.bash		 = 0;
	StatsObject.firstTime	 = 0;
	StatsObject.lastTime	 = 0;

	return StatsObject;
	};

TriumphalArch.DB.Get_TimeOrdered_CombatReportsIds = function(DateLimit)
	{
	// Create ordered (by date) array of combat report's indexes under bash delay
	var CRs = [];
	var CombatId;
	for (CombatId in this.CombatReports)
		{
		if (this.CombatReports[CombatId].time < DateLimit.getTime()) continue;
		CRs.push(CombatId);
		}
	var CombatReports = this.CombatReports; // Need local pointer for function below. Cf "this" conflict usage...
	
	function compareCR( a, b )
		{
		if (CombatReports[a].time < CombatReports[b].time) return 1;
		if (CombatReports[a].time > CombatReports[b].time) return -1;
		return 0;
		}
	CRs.sort(compareCR);
	
	return CRs;
	};
	
TriumphalArch.DB.Get_CityStats = function(CityId, CityName)
	{
	var DefaultCityNameFilter	 = this.Get_Filter('DefaultCityName');

	var CityStats = null;
	if ((CityId != undefined) && (CityId != null) && (CityId != 0) && (this.Stats[CityId] != undefined))
		{
		CityStats = new this.Stats_Object();
		var fName;
		for (fName in this.Stats[CityId])
			{
			CityStats[fName] = this.Stats[CityId][fName];
			}
		
		if ((CityName != undefined) && (CityName != '') && (CityName != DefaultCityNameFilter) && (this.Stats[CityName] != undefined))
			{
			CityStats.won = CityStats.won + this.Stats[CityName].won;
			CityStats.lost = CityStats.lost + this.Stats[CityName].lost;
			CityStats.bash = CityStats.bash + this.Stats[CityName].bash;
			CityStats.navyWon = CityStats.navyWon + this.Stats[CityName].navyWon;
			CityStats.navyLost = CityStats.navyLost + this.Stats[CityName].navyLost;
			}
		}
	else if ((CityName != undefined) && (CityName != '') && (this.Stats[CityName] != undefined))
		{
		CityStats = new this.Stats_Object();
		var fName;
		for (fName in this.Stats[CityName])
			{
			CityStats[fName] = this.Stats[CityName][fName];
			}
		}
	return CityStats;
	};
	
TriumphalArch.DB.Insert_CombatReport_Stats = function(StatsId, CombatReport)
	{
	if (this.Stats[StatsId] == undefined)
		{
		this.Stats[StatsId] = new this.Stats_Object();
		
		if ((this.Cities[StatsId] != undefined) && (this.Cities[StatsId].own == true))
			{
			this.Stats[StatsId].own = true;
			}
		}
	
	if (CombatReport.won == true)
		{
		this.Stats[StatsId].won++;
			
		if (CombatReport.navy == true)
			{
			this.Stats[StatsId].navyWon++;
			}
		}
	else if (CombatReport.lost == true)
		{
		this.Stats[StatsId].lost++;
			
		if (CombatReport.navy == true)
			{
			this.Stats[StatsId].navyLost++;
			}
		}
		
	if (CombatReport.loot != undefined)
		{
		if (this.Stats[StatsId].loots == undefined)
			this.Stats[StatsId].loots = {};
		
		var hasPillaged = false;
		var ResType;
		for (ResType in CombatReport.loot)
			{
			var ResValue = CombatReport.loot[ResType];
			if (ResValue > 0)
				{
				if (this.Stats[StatsId].loots[ResType] == undefined)
					this.Stats[StatsId].loots[ResType] = 0;
				
				this.Stats[StatsId].loots[ResType] += ResValue;
				
				hasPillaged = true;
				}
			}
		
		if (hasPillaged == true)
			{
			this.Stats[StatsId].plunders++;
			}
		}
	
	if (CombatReport.time > 0)
		{
		if ((CombatReport.confirmed == true) && (CombatReport.time >= this.Stats[StatsId].lastTime))
			{
			// Complete unknown data from confirmed CR
			if ((CombatReport.tcityname != undefined) && (CombatReport.tcityname != ''))
				this.Stats[StatsId].cityname = CombatReport.tcityname;
			
			if ((CombatReport.tcityid != undefined) && (CombatReport.tcityid != 0))
				this.Stats[StatsId].cityid = CombatReport.tcityid;
			
			if (CombatReport.own == true)
				this.Stats[StatsId].own = true;
				
			if (CombatReport.deletedcity == true)
				this.Stats[StatsId].deletedcity = true;
			
			if ((CombatReport.tislandid != undefined) && (CombatReport.tislandid != 0))
				this.Stats[StatsId].islandid = CombatReport.tislandid;
			
			if ((CombatReport.tplayername != undefined) && (CombatReport.tplayername != ''))
				this.Stats[StatsId].playername = CombatReport.tplayername;
			
			if (CombatReport.tbattlefieldwall != undefined)
				{
				if (this.Stats[StatsId].battlefieldwall == undefined)
					{
					this.Stats[StatsId].battlefieldwall = CombatReport.tbattlefieldwall;
					}
				else if (this.Stats[StatsId].battlefieldwall < CombatReport.tbattlefieldwall)
					{
					this.Stats[StatsId].battlefieldwall = CombatReport.tbattlefieldwall;
					}
				}
			}
		
		if ((this.Stats[StatsId].own != true) && (CombatReport.own != true) && (CombatReport.isAttacked != true) && (CombatReport.tBarbarianVillage != true) && (CombatReport.isEmpty != true))
			{
			var bashTimeLimit = new Date();
			// GameForge servers are germany time-zoned 
			/*
			bashTimeLimit.setTime(bashTimeLimit.getTime() -
						this.Ikariam.Bash_Delay() -
						(bashTimeLimit.getTimezoneOffset()*60*1000));
			
			*/
			bashTimeLimit.setTime(this._Parent.Ikariam.serverTime() - this._Parent.Ikariam.Bash_Delay());
				
			if (CombatReport.time >= bashTimeLimit.getTime())
				{
				this.Stats[StatsId].bash++;
				}
			}
			
		if (this.Stats[StatsId].firstTime == 0)
			{
			this.Stats[StatsId].firstTime = CombatReport.time;
			}
		else if (this.Stats[StatsId].firstTime > CombatReport.time)
			{
			this.Stats[StatsId].firstTime = CombatReport.time;
			}
			
		if (this.Stats[StatsId].lastTime == 0)
			{
			this.Stats[StatsId].lastTime = CombatReport.time;
			}
		else if (this.Stats[StatsId].lastTime < CombatReport.time)
			{
			this.Stats[StatsId].lastTime = CombatReport.time;
			}
		}
	};
	
TriumphalArch.DB.Generate_Stats = function()
	{
	this._Parent.Log.Add('Add current CRs to stats...');

	var DefaultCityNameFilter	 = this.Get_Filter('DefaultCityName');

	var CombatId;
	for (CombatId in this.CombatReports)
		{
		var targetCityName = this.CombatReports[CombatId].tcityname;
		var targetCityId = this.CombatReports[CombatId].tcityid;
		
		if ((targetCityId != undefined) && (targetCityId != 0))
			{
			this.Insert_CombatReport_Stats(targetCityId, this.CombatReports[CombatId]);
			}
		else if ((targetCityName != undefined) && (targetCityName != '') && (targetCityName != DefaultCityNameFilter))
			{
			this.Insert_CombatReport_Stats(targetCityName, this.CombatReports[CombatId]);
			}
		else continue;
		}
	};
		
TriumphalArch.DB.Serialize = function(data)
	{
	return uneval(data);
	};

TriumphalArch.DB.UnSerialize = function(data)
	{
	return eval(data);
	};
	
TriumphalArch.DB.Load = function()
	{
	//this.Load_CombatReports();
	};
	
TriumphalArch.DB.Load_CombatReports = function()
	{
	this.CombatReports = this.UnSerialize(GM_getValue(this.Prefix+'.CR', false)) || {};
	};
	
TriumphalArch.DB.Load_Options = function()
	{
	this.Options = this.UnSerialize(GM_getValue(this.Prefix+'.Opt', false)) || {};
	};
	
TriumphalArch.DB.Load_Stats = function()
	{
	this.Stats = this.UnSerialize(GM_getValue(this.Prefix+'.Stats', false)) || {};
	};
	
TriumphalArch.DB.Save = function()
	{
	//this.Save_CombatReports();
	};
	
TriumphalArch.DB.Save_Options = function()
	{
	GM_setValue(this.Prefix+'.Opt', this.Serialize(this.Options));
	};
	
TriumphalArch.DB.Save_CombatReports = function()
	{
	GM_setValue(this.Prefix+'.CR', this.Serialize(this.CombatReports));
	};
	
TriumphalArch.DB.Save_Stats = function()
	{
	GM_setValue(this.Prefix+'.Stats', this.Serialize(this.Stats));
	};
	
TriumphalArch.Ikariam =
	{
	_Parent:		 null,
	_View:			 null,
	_Host:			 null,
	_Server:		 null,
	_Language:		 null,
	_Version:		 null,
	_serverTime:	 null,
	_IsV031x:		 null,
	_IsV032x:		 null
	};
	
TriumphalArch.Ikariam.Init = function(parent)
	{
	this._Parent = parent;
	};

TriumphalArch.Ikariam.View = function()
	{
	if (this._View == null)
		{
		this._View = '';
		
		// Fetch view name
		try
			{
			this._View = document.getElementsByTagName("body")[0].id;
			}
		catch (e)
			{
			var url_view = /[\?&]view=([a-zA-Z0-9\-_]+)/.exec(document.URL);
			if (url_view != null) this._View = RegExp.$1;
			}
		}
		
	return this._View;
	};
	
TriumphalArch.Ikariam.Host = function()
	{
	if (this._Host == null)
		{
		this._Host = '';
		
		this._Host = document.location.host;
		}
		
	return this._Host;
	};
	
TriumphalArch.Ikariam.Server = function(host)
	{
	if (this._Server == null)
		{
		if (host == undefined) host = this.Host();
		this._Server = '';
		
		var parts = host.split(".");
		var idx = 0;
		if (parts[0] == 'www') idx++;
		this._Server = parts[idx];
		}
	
	return this._Server;
	};

TriumphalArch.Ikariam.Language = function()
	{
	if (this._Language == null)
		{
		this._Language = '';
		
		var sCode = '';
		var scripts = document.getElementsByTagName("script");
		for (var j = 0; j < scripts.length; j++)
			{
			var nScript = scripts[j];
			sCode = nScript.innerHTML;
			if (sCode.indexOf('LocalizationStrings') >= 0)
				{
				break;
				}
			}
		
		if (sCode != '')
			{
			var reg = /LocalizationStrings\['language'\]\s+=\s+'(.+)';/;
			var res = reg.exec(sCode);
			if (res != null) this._Language = res[1];
			}
			
		this._Parent.Log.Add('Language: '+this._Language);
		}
	
	return this._Language;
	};
	
TriumphalArch.Ikariam.Version = function()
	{
	// Requires: DOM
	if (this._Version == null)
		{
		this._Version = '';
		
		this._Version = this._Parent.DOM.Get_First_Node_TextContent("//div[@id='GF_toolbar']//li[@class='version']//span[@class='textLabel']",'');
		}
	
	return this._Version;
	};
	
TriumphalArch.Ikariam.serverTime = function()
	{
	if (this._serverTime == null)
		{
		if ((unsafeWindow.IKARIAM != undefined) && (unsafeWindow.IKARIAM.phpSet != undefined) && (unsafeWindow.IKARIAM.phpSet.serverTime != undefined))
			{
			this._serverTime = parseInt(unsafeWindow.IKARIAM.phpSet.serverTime)*1000+this.serverTimeOffset();
			this._Parent.Log.Add('serverTime: '+this._serverTime+'ms');
			}
		else
			{
			this._serverTime = 0;
			}
		}
	
	return this._serverTime;
	};
	
TriumphalArch.Ikariam.serverTimeOffset = function()
	{
	// GameForge servers are germany time-zoned . May check while summer time, arf :o(
	return (60*60*1000);
	};
	
TriumphalArch.Ikariam.CombatReports_StartValue = function()
	{
	if (this._CombatReports_StartValue == undefined)
		{
		this._CombatReports_StartValue = parseInt(this._Parent.DOM.Get_First_Node_Value("//form[@id='finishedReports']/input[@name='start']", 0));
		//this._Parent.Log.Add('CombatReports_StartValue = '+this._CombatReports_StartValue);
		}
	
	return this._CombatReports_StartValue;
	};
	
TriumphalArch.Ikariam.Bash_Delay = function()
	{
	return (1000*60*60*24);
	};
	
TriumphalArch.Ikariam.CombatReport_MaxTime = function()
	{
	return (1000*60*60*24*8*1);
	};
	
TriumphalArch.Ikariam.Grab_CombatReport_Title = function(rootElt)
	{
	// rootElt may be td.subject object of combat report, or object which contain link to combat report
	// Requires: Str
	
	var resID = '';
	var alinks = rootElt.getElementsByTagName("a");
	for (var k=0; k < alinks.length; k++)
		{
		var resReg = /[\?&]{1}combatId=([0-9]+)&?/i.exec(alinks[k].href);
		if (resReg != null)
			{
			resID = this._Parent.Str.Trim(alinks[k].title);
			break;
			}
		}
	
	return resID;
	};
	
// NB: return true if higher than 0.3.1
TriumphalArch.Ikariam.Is_Version_031x = function()
	{
	// Requires: Str
	if (this._IsV031x == null)
		{
		if (this._Parent.Str.Compare_Versions('0.3.1', this.Version()) >= 0)
			{
			this._IsV031x = true;
			this._Parent.Log.Add("Ikariam server is v.0.3.1 or higher");
			}
		else
			{
			this._IsV031x = false;
			}
		}
	
	return this._IsV031x;
	};
	
// NB: return true if higher than 0.3.2
TriumphalArch.Ikariam.Is_Version_032x = function()
	{
	// Requires: Str
	if (this._IsV032x == null)
		{
		if (this._Parent.Str.Compare_Versions('0.3.2', this.Version()) >= 0)
			{
			this._IsV032x = true;
			this._Parent.Log.Add("Ikariam server is v.0.3.2 or higher");
			}
		else
			{
			this._IsV032x = false;
			}
		}
	
	return this._IsV032x;
	};
	
TriumphalArch.Ikariam.Trim_Coords = function(str)
	{
	return this._Parent.Str.Trim_Accodances(str);
	};
	
TriumphalArch.Ikariam.City_Object = function()
	{
	var City = new Object;
	
	City.id			 = 0;
	City.name		 = '';
	//City.playername	 = '';
	//City.islandid		 = 0;
	
	City.knownTime	 = new Date().getTime();
	
	//City.own			 = false;
	//City.occupied		 = false;
	//City.deployed		 = false;
	
	//City.selected		 = false;
	
	return City;
	};
	
TriumphalArch.Ikariam.Fetch_IslandCities = function(database)
	{
	if (database == undefined)			 database = {};
	
	};
			
TriumphalArch.Ikariam.Fetch_CitiesSelect = function(database, includeForeign)
	{
	// Requires: DOM, Str
	if (database == undefined)			 database = {};
	if (includeForeign == undefined)	 includeForeign = false; // not used yet
	
	var Options = this._Parent.DOM.Get_Nodes("//select[@id='citySelect']/option");
	if (Options != null)
		{
		for (var i=0; i < Options.snapshotLength; i++)
			{
			var Option = Options.snapshotItem(i);
			
			// Occupied city ?
			var isOccupied = false;
			if (this._Parent.DOM.Has_ClassName(Option,'occupiedCities'))
				{
				isOccupied = true;
				}
			
			// Deployed troops into allied city
			var isDeployed = false;
			if (this._Parent.DOM.Has_ClassName(Option,'deployedCities'))
				{
				isDeployed = true;
				}
				
			if ((includeForeign == false) && ((isOccupied == true) || (isDeployed == true))) continue;
			
			var CityId = parseInt(Option.value);
			
			if (database[CityId] == undefined)
				{
				database[CityId] = new this.City_Object();
				}
			
			database[CityId].id = CityId;
			database[CityId].name = this._Parent.Str.Trim(this.Trim_Coords(Option.textContent));
			if (isOccupied == true)
				{
				database[CityId].occupied = true;
				}
			else if (isDeployed == true)
				{
				database[CityId].deployed = true;
				}
			else
				{
				database[CityId].own = true;
				}
			
			if (Option.selected == true) database[CityId].selected = true;
			
			this._Parent.Log.Add('Fetch select list: city ['+CityId+'], '+database[CityId].name+', selected='+database[CityId].selected);
			}
		}
	
	return database;
	};
	
TriumphalArch.Ikariam.Fetch_DetailedCombatId = function(sURL)
	{
	if (sURL == undefined) sURL = document.URL;
	var DetailedCombatId = 0;
	var url_DetailedCombatId = /[\?&]{1}detailedCombatId=([0-9]+)/.exec(sURL);
	if (url_DetailedCombatId != null) DetailedCombatId = parseInt(url_DetailedCombatId[1]);
	
	return DetailedCombatId;
	};
	
TriumphalArch.Ikariam.Fetch_CombatId = function(sURL)
	{
	if (sURL == undefined) sURL = document.URL;
	var CombatId = 0;
	var url_CombatId = /[\?&]{1}combatId=([0-9]+)/.exec(sURL);
	if (url_CombatId != null) CombatId = parseInt(url_CombatId[1]);
	
	return CombatId;
	};
	
TriumphalArch.Ikariam.Get_CombatReport_DateTime = function(CombatTime, withYear)
	{
	// Requires: Str
	
	if (withYear == undefined) withYear = false;
	
	if (withYear == true)
		{
		var CombatDate = this._Parent.Str.TwoDigit(CombatTime.getUTCDate()) + '.' + this._Parent.Str.TwoDigit(CombatTime.getUTCMonth()+1) + '.'+CombatTime.getUTCFullYear()+' ' + this._Parent.Str.TwoDigit(CombatTime.getUTCHours()) + ':' + this._Parent.Str.TwoDigit(CombatTime.getUTCMinutes());
		}
	else
		{
		var CombatDate = this._Parent.Str.TwoDigit(CombatTime.getUTCDate()) + '.' + this._Parent.Str.TwoDigit(CombatTime.getUTCMonth()+1) + '. ' + this._Parent.Str.TwoDigit(CombatTime.getUTCHours()) + ':' + this._Parent.Str.TwoDigit(CombatTime.getUTCMinutes());
		}
	
	return CombatDate;
	};
	
TriumphalArch.Ikariam.Fetch_DetailedCombatReport = function(database)
	{
	if (this.Is_Version_032x())
		{
		// Fix for v. 0.3.2
		return this._Fetch_DetailedCombatReport_v032(database);
		}
	else
		{
		return this._Fetch_DetailedCombatReport_v031(database);
		}
	};
	
TriumphalArch.Ikariam._Fetch_DetailedCombatReport_v032 = function(database)
	{
	// Requires: Str
	var combatId = this.Fetch_DetailedCombatId();
	if (combatId == 0) return null;
	
	if (database[combatId] == undefined)
		{
		database[combatId] = this.CombatReport_Object();
		}
	else
		{
		database[combatId].new = false;
		}
		
	
	
	return database[combatId];
	};
	
TriumphalArch.Ikariam._Fetch_DetailedCombatReport_v031 = function(database)
	{
	// Requires: Str
	var combatId = this.Fetch_DetailedCombatId();
	if (combatId == 0) return null;
	
	if (database[combatId] == undefined)
		{
		database[combatId] = this.CombatReport_Object();
		}
	else
		{
		database[combatId].new = false;
		}
		
	var LootNodes = this._Parent.DOM.Get_Nodes("//div[@id='troopsReport']//ul[contains(@class, 'resources')]/li");
	if (LootNodes != null)
		{
		database[combatId].loot = {};
		for (var i=0; i < LootNodes.snapshotLength; i++)
			{
			var LootRes = LootNodes.snapshotItem(i);
			var ResType = LootRes.className;
			var ResAmount = this._Parent.Str.To_Integer(LootRes.childNodes[1].textContent);
			if (database[combatId].loot[ResType] == undefined) database[combatId].loot[ResType] = 0;
			database[combatId].loot[ResType] += ResAmount;
			this._Parent.Log.Add('Loot '+ResAmount+' '+ResType);
			}
		}
	
	return database[combatId];
	};
	
TriumphalArch.Ikariam.Fetch_CombatReport = function(database)
	{
	if (this.Is_Version_032x())
		{
		// Fix for v. 0.3.2
		return this._Fetch_CombatReport_v032(database);
		}
	else
		{
		return this._Fetch_CombatReport_v031(database);
		}
	};
	
TriumphalArch.Ikariam._Fetch_CombatReport_v032 = function(database)
	{
	var combatId = this.Fetch_CombatId();
	if (combatId == 0) return null;
	
	if (database[combatId] == undefined)
		{
		database[combatId] = this.CombatReport_Object();
		}
	else
		{
		database[combatId].new = false;
		}
		
	var isConfirmed			 = false;
	var tBarbarianVillage	 = false;
	var tDeletedCity		 = false;
	var tCityName			 = '';
	var isAttacked			 = null;
	var isEmpty				 = false;
	
	// Use previous city name if exists
	if ((database[combatId].tcityname != undefined) && (database[combatId].tcityname != ''))
		{
		tCityName = database[combatId].tcityname;
		}
		
	// Fix old bug for deleted players
	var DeletedPlayerFilter = this._Parent.DB.Get_Filter('DeletedPlayer');
	if ((database[combatId].tplayername != undefined) && (database[combatId].tplayername == DeletedPlayerFilter))
		{
		database[combatId].tplayername = '';
		}
	
	// Fetch city name and check if deleted city
	var BattleTitleDateFilter	 = this._Parent.DB.Get_Filter('BattleTitleDate');
	var regBTD					 = new RegExp(BattleTitleDateFilter, "i");
	
	var BattleTitleH3 = this._Parent.DOM.Get_First_Node("//div[@id='troopsReport']/div/h3[contains(@class,'header')]");
	if (BattleTitleH3 != null)
		{
		var combatTitle = this._Parent.Str.Trim(BattleTitleH3.childNodes[0].textContent);
		this._Parent.Log.Add('combatTitle: "'+combatTitle+'"');
		
		// Try to fetch city name from combat title
		var SeaBattleNearFilter		 = this._Parent.DB.Get_Filter('SeaBattleNear');
		var BattleForFilter			 = this._Parent.DB.Get_Filter('BattleFor');
		var regSBN					 = new RegExp(SeaBattleNearFilter, "i");
		var regBF					 = new RegExp(BattleForFilter, "i");

		var cityname = '';
		if (this._Parent.DB.hasFilters() == true)
			{
			var RegExpRes = regSBN.exec(combatTitle);
			if (RegExpRes != null)
				{
				database[combatId].navy = true;
				cityname = this._Parent.Str.Trim(RegExpRes[1]);
				}
				
			var RegExpRes = regBF.exec(combatTitle);
			if (RegExpRes != null)
				{
				cityname = this._Parent.Str.Trim(RegExpRes[1]);
				}
				
			if (cityname == '')
				{
				this._Parent.Log.Add('CR title without city name => deleted player or city.');
					
				if (tCityName != '')
					{
					tDeletedCity = true;
					}
				}
			else
				{
				tCityName = cityname;
				this._Parent.Log.Add('tCityName: "'+tCityName+'"');
				}
			}
		}
		
	// Check if barbarian village
	var BarbarianVillageFilter	 = this._Parent.DB.Get_Filter('BarbarianVillage');
	if ((tCityName != '') && (tCityName == BarbarianVillageFilter))
		{
		tBarbarianVillage = true;
		}
		
	// Search result city ID from Winner summary
	var ResultCities = this._Parent.DOM.Get_Nodes("//div[@id='troopsReport']//div[contains(@class, 'result')]//a[contains(@href, 'cityId=')]");
	if (ResultCities != null)
		{
		//this._Parent.Log.Add(ResultCities.snapshotLength);
		for (var i=0; i < ResultCities.snapshotLength; i++)
			{
			var ResultCity = ResultCities.snapshotItem(i);
			var rcityname = this._Parent.Str.Trim(ResultCity.textContent);
			if (rcityname == tCityName)
				{
				var resReg = /[\?&]{1}cityId=([0-9]+)&?/i.exec(ResultCity.href);
				if (resReg != null)
					{
					var rcityid = parseInt(resReg[1]);
					if (rcityid != combatId)
						{
						database[combatId].tcityid = rcityid;
						isConfirmed = true;
						this._Parent.Log.Add(''+rcityname+' CityId='+rcityid);
						break;
						}
					else
						{
						this.Insert_Warning('This combat report n°'+combatId+' have a bug into Winners summary : URL of city named "'+rcityname+'" contains wrong cityId argument.', this._Parent.ScriptName);
						}
					}
				}
			}
		}
		
	// Filters to parse defenders/attackers lists
	var PlayerFromCityFilter	 = this._Parent.DB.Get_Filter('PlayerFromCity');
	var CityOfPlayerFilter		 = this._Parent.DB.Get_Filter('CityOfPlayer');
	var BarbariansFilter		 = this._Parent.DB.Get_Filter('Barbarians');
	var regSplit	 = new RegExp(",", "i");
	var regPFC		 = new RegExp(PlayerFromCityFilter, "i");
	var regCOP		 = new RegExp(CityOfPlayerFilter, "i");
	
	var DefendersDIV = this._Parent.DOM.Get_First_Node("//div[contains(@class,'defender')]");
	if (DefendersDIV != null)
		{
		if (this._Parent.DOM.Has_ClassName(DefendersDIV,'textgreen') == true)
			{
			isAttacked = true;
			}
		
		var Defenders = '';
		var tcityid = 0;
		var tplayername = '';
		
		var DefendersSPAN = DefendersDIV.getElementsByTagName("span")[0];
		var resDefenders = DefendersSPAN.textContent.split(regSplit);
		var resDefendersHTML = DefendersSPAN.innerHTML.split(regSplit);
		var lastPlayerName = '';
		for (i = 0; i < resDefenders.length; i++)
			{
			var playername = '';
			var cityname = '';
			
			if (this._Parent.DB.hasFilters() == true)
				{
				var Defender = ' '+this._Parent.Str.Trim(resDefenders[i])+' ';
				if (PlayerFromCityFilter != '')
					{
					var RegExpRes = regPFC.exec(Defender);
					if (RegExpRes != null)
						{
						playername = this._Parent.Str.Trim(RegExpRes[1]);
						cityname = this._Parent.Str.Trim(RegExpRes[2]);
						}
					}
				else if (CityOfPlayerFilter != '')
					{
					var RegExpRes = regCOP.exec(Defender);
					if (RegExpRes != null)
						{
						cityname = this._Parent.Str.Trim(RegExpRes[1]);
						playername = this._Parent.Str.Trim(RegExpRes[2]);
						}
					}
					
				if (playername != '') lastPlayerName = '';
				}
				
			var DefenderHTML = resDefendersHTML[i];
			// Fetch city id and missing city name
			var cityid = 0;
			var resReg = /[\?&;]{1}cityId=([0-9]+)\"\>(.*)\<\/\a/i.exec(DefenderHTML);
			if (resReg != null)
				{
				cityid = parseInt(resReg[1]);
				if (cityname == '') cityname = this._Parent.Str.Trim(resReg[2]);
				if (cityid == combatId)
					{
					cityid = 0;
					this.Insert_Warning('This combat report n°'+combatId+' have a bug into Defenders list : URL of city named "'+cityname+'" contains wrong cityId argument.', this._Parent.ScriptName);
					}
				}
				
			// Fetch player id (but not used) and missing player name
			var playerid = 0;
			var resReg = /[\?&;]{1}receiverId=([0-9]+)\"\>(.*)\<\/\a/i.exec(DefenderHTML);
			if (resReg != null)
				{
				playerid = parseInt(resReg[1]);
				if (playername == '') playername = this._Parent.Str.Trim(resReg[2]);
				}
			
			// Previous playername if only city name
			if ((playername == '') && (lastPlayerName != '')) playername = lastPlayerName;
				
			// May keep this fix ?
			if ((playername != '') && (cityname == '') && (tplayername == '') && (tCityName != ''))
				{
				cityname = tCityName;
				}
				
			this._Parent.Log.Add('Fetch defender: "'+cityname+'"('+playername+')');
				
			if ((playername != '') && (cityname != ''))
				{
				if ((cityid == 0) && (playername == BarbariansFilter))
					{
					// To support barbarians
					tBarbarianVillage = true;
					//cityname = this._Parent.DB.Get_Filter('BarbarianVillage');
					//cityname = database[combatId].tcityname;
					// Defenders list display short city name for barbarian
					cityname = tCityName;
					}
					
				// Probably target city
				if (cityname == tCityName)
					{
					if (tplayername == '')
						{
						tplayername = playername;
						}
					
					if (tcityid == 0)
						{
						tcityid = cityid;
						}
					}
				
				if (Defenders != '') Defenders += ',';
				if (playername == DeletedPlayerFilter) playername = '';
				Defenders += cityname+' ('+playername+')';
				}
				
			lastPlayerName = playername;
			}
		
		if (Defenders != '')
			{
			database[combatId].defenders = Defenders;
			this._Parent.Log.Add('Defenders: '+Defenders);
			}
			
		if (tplayername != '')
			{
			if (tplayername == DeletedPlayerFilter)
				{
				tplayername = '';
				tDeletedCity = true;
				}
			else
				{
				database[combatId].tplayername = tplayername;
				this._Parent.Log.Add('tplayername: '+tplayername);
				}
			}
			
		if (tcityid != 0)
			{
			database[combatId].tcityid = tcityid;
			isConfirmed = true;
			this._Parent.Log.Add(''+tCityName+' CityId='+tcityid);
			}
		}
	else
		{
		// Probably empty CR
		isEmpty = true;
		}
	
	var AttackersDIV = this._Parent.DOM.Get_First_Node("//div[contains(@class,'attacker')]");
	if (AttackersDIV != null)
		{
		if (this._Parent.DOM.Has_ClassName(AttackersDIV,'textgreen') == true)
			{
			isAttacked = false;
			}
			
		if (this._Parent.DB.hasFilters() == true)
			{
			if ((PlayerFromCityFilter != '') || (CityOfPlayerFilter != ''))
				{
				var Attackers = '';
				
				var AttackersSPAN = AttackersDIV.getElementsByTagName("span")[0];
				var resAttackers = AttackersSPAN.textContent.split(regSplit);
				for (i = 0; i < resAttackers.length; i++)
					{
					var Attacker = ' '+this._Parent.Str.Trim(resAttackers[i])+' ';
					var playername = '';
					var cityname = '';
					if (PlayerFromCityFilter != '')
						{
						var RegExpRes = regPFC.exec(Attacker);
						if (RegExpRes != null)
							{
							playername = this._Parent.Str.Trim(RegExpRes[1]);
							cityname = this._Parent.Str.Trim(RegExpRes[2]);
							}
						}
					else if (CityOfPlayerFilter != '')
						{
						var RegExpRes = regCOP.exec(Attacker);
						if (RegExpRes != null)
							{
							cityname = this._Parent.Str.Trim(RegExpRes[1]);
							playername = this._Parent.Str.Trim(RegExpRes[2]);
							}
						}
						
					if ((playername != '') && (cityname != ''))
						{
						if (Attackers != '') Attackers += ',';
						if (playername == DeletedPlayerFilter) playername = '';
						Attackers += cityname+' ('+playername+')';
						}
					}
				
				if (Attackers != '')
					{
					database[combatId].attackers = Attackers;
					this._Parent.Log.Add('Attackers: '+Attackers);
					}
				}
			}
		}
	
	// Search battlefield wall
	var armies			 = this._Parent.DOM.Get_Nodes("//div[@id='troopsReport']//th/div[contains(@class,'army')]");
	var remainingUnits	 = this._Parent.DOM.Get_Nodes("//div[@id='troopsReport']//td/div[contains(@class,'remainingUnits')]");
	if ((armies.snapshotLength > 0) && (armies.snapshotLength == remainingUnits.snapshotLength))
		{
		var WallIndex = null;
		for (var i=0; i < armies.snapshotLength; i++)
			{
			if (this._Parent.DOM.Has_ClassName(armies.snapshotItem(i),'s314') == true)
				{
				WallIndex = i;
				break;
				}
			}
		if (WallIndex != null)
			{
			var resReg = /([0-9]+)\s+\(\-([0-9]+)\)/i.exec(remainingUnits.snapshotItem(WallIndex).textContent);
			if (resReg != null)
				{
				database[combatId].tbattlefieldwall = parseInt(resReg[1])+parseInt(resReg[2]);
				this._Parent.Log.Add('CR['+combatId+'].tbattlefieldwall = '+database[combatId].tbattlefieldwall);
				}
			}
		}
	
	// Fetch loots
	var LootNodes = this._Parent.DOM.Get_Nodes("//div[@id='troopsReport']//ul[contains(@class, 'resources')]/li");
	if (LootNodes != null)
		{
		database[combatId].loot = {};
		for (var i=0; i < LootNodes.snapshotLength; i++)
			{
			var LootRes = LootNodes.snapshotItem(i);
			var LootDIV = LootRes.parentNode.parentNode;
			var resReg = /[\?&;]{1}receiverId=([0-9]+)&?/i.exec(LootDIV.innerHTML);
			if (resReg != null)
				{
				// Another player loot
				}
			else
				{
				var ResType = LootRes.className;
				var ResAmount = this._Parent.Str.To_Integer(LootRes.childNodes[1].textContent);
				if (database[combatId].loot[ResType] == undefined) database[combatId].loot[ResType] = 0;
				database[combatId].loot[ResType] += ResAmount;
				this._Parent.Log.Add('Loot '+ResAmount+' '+ResType);
				}
			}
		}
		
	/* Store results */
		
	if (isAttacked != null)
		{
		database[combatId].isAttacked = isAttacked;
		//this._Parent.Log.Add('isAttacked: '+isAttacked);
		}
		
	if (tDeletedCity == true)
		{
		database[combatId].deletedcity = true;
		isConfirmed = true;
		this._Parent.Log.Add('tDeletedCity: '+tDeletedCity);
		}
		
	if (tBarbarianVillage == true)
		{
		database[combatId].tBarbarianVillage = true;
		if (tCityName == '') tCityName = BarbarianVillageFilter;
		isConfirmed = true;
		this._Parent.Log.Add('tBarbarianVillage: '+tBarbarianVillage);
		}
		
	if (isEmpty == true)
		{
		database[combatId].isEmpty = true;
		isConfirmed = true;
		this._Parent.Log.Add('Empty combat report');
		}
		
	if (tCityName != '')
		{
		database[combatId].tcityname = tCityName;
		}
		
	if (isConfirmed == true)
		{
		database[combatId].confirmed = true;
		this._Parent.Log.Add('isConfirmed: '+isConfirmed);
		}
		
	return database[combatId];
	};
	
TriumphalArch.Ikariam._Fetch_CombatReport_v031 = function(database)
	{
	var combatId = this.Fetch_CombatId();
	if (combatId == 0) return null;
	
	if (database[combatId] == undefined)
		{
		database[combatId] = this.CombatReport_Object();
		}
	else
		{
		database[combatId].new = false;
		}
		
	var BattleNode = this._Parent.DOM.Get_First_Node("//ul[@id='battleReportDetail']//td[contains(@class, 'battle')]");
	if (BattleNode != null)
		{
		var alinks = BattleNode.getElementsByTagName("a");
		
		database[combatId].tcityname = this._Parent.Str.Trim(alinks[0].textContent);
		this._Parent.Log.Add('CR['+combatId+'].tcityname = "'+database[combatId].tcityname+'"');
		
		var resReg = /[\?&]{1}selectCity=([0-9]+)&?/i.exec(alinks[0].href);
		if (resReg != null)
			{
			var tcityid = parseInt(resReg[1]);
			database[combatId].tcityid = tcityid;
			this._Parent.Log.Add('CR['+combatId+'].tcityid = '+tcityid+'');
			
			if ((this._Parent.DB.Cities[tcityid] != undefined) && (this._Parent.DB.Cities[tcityid].own == true))
				{
				database[combatId].own = true;
				this._Parent.Log.Add('CR['+combatId+'] target city is own');
				}
			else database[combatId].own = false;
			}
		
		var resReg = /[\?&]{1}id=([0-9]+)&?/i.exec(alinks[0].href);
		if (resReg != null)
			{
			database[combatId].tislandid = parseInt(resReg[1]);
			this._Parent.Log.Add('CR['+combatId+'].tislandid = '+database[combatId].tislandid+'');
			}
		
		// Sea battle ?
		var imgs = BattleNode.getElementsByTagName("img");
		if (imgs[0].src.indexOf('ship') > 0)
			{
			database[combatId].navy = true;
			this._Parent.Log.Add('CR['+combatId+'].navy = '+database[combatId].navy);
			}
		
		// Search targeted player name
		if (this._Parent.DB.hasFilters() == true)
			{
			var PlayerFromCityFilter = this._Parent.DB.Get_Filter('PlayerFromCity');
			var CityOfPlayerFilter = this._Parent.DB.Get_Filter('CityOfPlayer');
			if ((PlayerFromCityFilter != '') || (CityOfPlayerFilter != ''))
				{
				var tbody = BattleNode.parentNode.parentNode;
				var trs = tbody.getElementsByTagName("tr");
				var VSnodes = trs[1].getElementsByTagName("td");
				var regSplit = new RegExp("<br ?/?>", "i");
				var regPFC = new RegExp(PlayerFromCityFilter, "i");
				var regCOP = new RegExp(CityOfPlayerFilter, "i");
				
				var tplayername = '';
				var isAttacked = null;
				
				var Defenders = '';
				var resDefenders = VSnodes[2].innerHTML.split(regSplit);
				for (i = 0; i < resDefenders.length; i++)
					{
					var Defender = this._Parent.Str.Trim(resDefenders[i]);
					if (Defender != '')
						{
						var playername = '';
						var cityname = '';
						if (PlayerFromCityFilter != '')
							{
							var RegExpRes = regPFC.exec(Defender);
							if (RegExpRes != null)
								{
								playername = this._Parent.Str.Trim(RegExpRes[1]);
								cityname = this._Parent.Str.Trim(RegExpRes[2]);
								}
							}
						else if (CityOfPlayerFilter != '')
							{
							var RegExpRes = regCOP.exec(Defender);
							if (RegExpRes != null)
								{
								cityname = this._Parent.Str.Trim(RegExpRes[1]);
								playername = this._Parent.Str.Trim(RegExpRes[2]);
								}
							}
						
						if ((playername != '') && (cityname != ''))
							{
							if (Defenders != '') Defenders += ',';
							Defenders += cityname+' ('+playername+')';
							
							if (tplayername == '')
								{
								if (cityname == database[combatId].tcityname)
									{
									tplayername = playername;
									}
								}
							if (isAttacked == null)
								{
								if ((this._Parent.DB.CitiesNames[cityname] != undefined) && (this._Parent.DB.CitiesNames[cityname].own == true))
									{
									isAttacked = true;
									}
								}
							}
						}
					}
				if (Defenders != '')
					{
					database[combatId].defenders = Defenders;
					this._Parent.Log.Add('Defenders: '+Defenders);
					}
				
				var Attackers = '';
				var resAttackers = VSnodes[0].innerHTML.split(regSplit);
				for (i = 0; i < resAttackers.length; i++)
					{
					var Attacker = this._Parent.Str.Trim(resAttackers[i]);
					if (Attacker != '')
						{
						var playername = '';
						var cityname = '';
						if (PlayerFromCityFilter != '')
							{
							var RegExpRes = regPFC.exec(Attacker);
							if (RegExpRes != null)
								{
								playername = this._Parent.Str.Trim(RegExpRes[1]);
								cityname = this._Parent.Str.Trim(RegExpRes[2]);
								}
							}
						else if (CityOfPlayerFilter != '')
							{
							var RegExpRes = regCOP.exec(Attacker);
							if (RegExpRes != null)
								{
								cityname = this._Parent.Str.Trim(RegExpRes[1]);
								playername = this._Parent.Str.Trim(RegExpRes[2]);
								}
							}
							
						if ((playername != '') && (cityname != ''))
							{
							if (Attackers != '') Attackers += ',';
							Attackers += cityname+' ('+playername+')';
							
							if (tplayername == '')
								{
								if (cityname == database[combatId].tcityname)
									{
									tplayername = playername;
									}
								}
							if (isAttacked == null)
								{
								if ((this._Parent.DB.CitiesNames[cityname] != undefined) && (this._Parent.DB.CitiesNames[cityname].own == true))
									{
									isAttacked = false;
									}
								}
							}
						}
					}
				if (Attackers != '')
					{
					database[combatId].attackers = Attackers;
					this._Parent.Log.Add('Attackers: '+Attackers);
					}
				
				if (tplayername != '')
					{
					database[combatId].tplayername = tplayername;
					this._Parent.Log.Add('tplayername: '+tplayername);
					}
					
				if (isAttacked != null)
					{
					database[combatId].isAttacked = isAttacked;
					this._Parent.Log.Add('isAttacked: '+isAttacked);
					}
				}
			}
		
		database[combatId].confirmed = true;
		}

	// Fetch loots
	var LootNodes = this._Parent.DOM.Get_Nodes("//ul[@id='battleReportDetail']//ul[contains(@class, 'resources')]/li");
	if (LootNodes != null)
		{
		database[combatId].loot = {};
		for (var i=0; i < LootNodes.snapshotLength; i++)
			{
			var LootRes = LootNodes.snapshotItem(i);
			var ResType = LootRes.className;
			var ResAmount = this._Parent.Str.To_Integer(LootRes.childNodes[1].textContent);
			if (database[combatId].loot[ResType] == undefined) database[combatId].loot[ResType] = 0;
			database[combatId].loot[ResType] += ResAmount;
			this._Parent.Log.Add('Loot '+ResAmount+' '+ResType);
			}
		}
	
	return database[combatId];
	};
	
TriumphalArch.Ikariam.Get_ResourceIcon_ImgSrc = function(ResType)
	{
	return 'skin/resources/icon_'+ResType+'.gif';
	};
	
TriumphalArch.Ikariam.CombatReport_Object = function()
	{
	var CombatReport = new Object;
	
	CombatReport.title		 = '';
	CombatReport.time		 = 0;
	//this.isEmpty		 = false;
	
	//this.new			 = false;
	//this.won			 = false;
	//this.lost			 = false;
	//this.running		 = false;
	//this.navy			 = false;
	//this.confirmed		 = false;
	
	//this.tcityname		 = '';
	//this.tcityid		 = 0;
	//this.own			 = false;
	//this.tislandid		 = 0;
	//this.tplayername	 = '';
	//this.tplayerid		 = 0; // Todo
	//this.tbattlefieldwall	 = 0; // Not wall level, number of wall units on battlefield : 0, 3, 5, or 7
	//this.tBarbarianVillage	 = false;
	
	//this.deletedcity		 = false;
	
	//this.attackers		 = '';
	//this.defenders		 = '';
	
	//this.isAttacked		 = false;
	
	//this.loot			 = {};
	
	return CombatReport;
	};
		
TriumphalArch.Ikariam.Fetch_CombatReports = function(database)
	{
	this._Parent.Log.Add('Start fetch CR...');
	if (database == undefined) database = {};
	
	var Subjects = this._Parent.DOM.Get_Nodes("//table[contains(@class,'operations')]/tbody/tr/td[contains(@class,'subject')]");
	if ((Subjects != null) && (Subjects.snapshotLength > 0))
		{
		this._Parent.Log.Add('Subjects.snapshotLength = '+Subjects.snapshotLength);
		
		function grabCombatId(rootElt)
			{
			var resID = 0;
			var alinks = rootElt.getElementsByTagName("a");
			for (var k=0; k < alinks.length; k++)
				{
				var resReg = /[\?&]{1}combatId=([0-9]+)&?/i.exec(alinks[k].href);
				if (resReg != null)
					{
					resID = resReg[1];
					break;
					}
				}
			
			return resID;
			}
		
		function parseDateTime(string)
			{
			var s = string.replace(/^0*/, '');
			if (s == '')
				{
				return 0;
				}
			else
				{
				return parseInt(s);
				}
			}
		
		function parseCombatTime_v031(sdate)
			{
			var day			= 1;
			var month		= 0;
			var year		= 1970;
			var hours		= 0;
			var minutes		= 0;
			var seconds		= 0;
			var mseconds	= 0;
			
			var now = new Date();
			var dateMatch	= /(\d+)\.(\d+)\.\s+(\d+):(\d+)/.exec(sdate);
			day			= parseDateTime(dateMatch[1]);
			month		= parseDateTime(dateMatch[2]) - 1;
			year		= now.getFullYear();
			if (month > now.getMonth()) year = year - 1; // Deal with december-january
			hours		= parseDateTime(dateMatch[3]);
			minutes		= parseDateTime(dateMatch[4]);
			seconds		= 0;
			mseconds	= 0;
			
			return Date.UTC(year, month, day, hours, minutes, seconds, mseconds);
			}
			
		function parseCombatTime_v032(sdate)
			{
			var day			= 1;
			var month		= 0;
			var year		= 1970;
			var hours		= 0;
			var minutes		= 0;
			var seconds		= 0;
			var mseconds	= 0;
			
			var now = new Date();
			var dateMatch	= /(\d+)\.(\d+)\.\d+\s+(\d+):(\d+):(\d+)/.exec(sdate);
			day			= parseDateTime(dateMatch[1]);
			month		= parseDateTime(dateMatch[2]) - 1;
			year		= now.getFullYear();
			if (month > now.getMonth()) year = year - 1; // Deal with december-january
			hours		= parseDateTime(dateMatch[3]);
			minutes		= parseDateTime(dateMatch[4]);
			seconds		= parseDateTime(dateMatch[5]);
			mseconds	= 0;
			
			return Date.UTC(year, month, day, hours, minutes, seconds, mseconds);
			}
			
		for (var i=0; i < Subjects.snapshotLength; i++)
			{
			var Subject = Subjects.snapshotItem(i);
			
			var combatId = grabCombatId(Subject);
			if (combatId != 0)
				{
				if (database[combatId] == undefined)
					{
					database[combatId] = new this.CombatReport_Object();
					}
				
				database[combatId].title		 = this.Grab_CombatReport_Title(Subject);
				database[combatId].new			 = this._Parent.DOM.Has_ClassName(Subject, 'new');
				database[combatId].won			 = this._Parent.DOM.Has_ClassName(Subject, 'won');
				database[combatId].lost			 = this._Parent.DOM.Has_ClassName(Subject, 'lost');
				database[combatId].running		 = this._Parent.DOM.Has_ClassName(Subject, 'running');
				
				var tr = Subjects.snapshotItem(i).parentNode;
				var tds = tr.getElementsByTagName("td");
					
				if (this.Is_Version_032x())
					{
					// Fix for v. 0.3.2
					database[combatId].time = parseCombatTime_v032(tds[2].textContent);
					}
				else
					{
					database[combatId].time = parseCombatTime_v031(tds[2].textContent);
					}
				
				// Set attributes for next features
				tr.setAttribute("combatid", combatId);
				//tr.setAttribute("combattime", database[combatId].time);
				}
			}
		}
	
	return database;
	};
	
TriumphalArch.Ikariam.Insert_Warning = function(message, title)
	{
	var notices = document.getElementById('notices');
	if (notices == null)
		{
		notices = document.createElement('div');
		notices.id = 'notices';
		var mainview = document.getElementById("mainview");
		var buildingDescription = this._Parent.DOM.Get_First_Node("//div[@id='mainview']/div[contains(@class,'buildingDescription')]");
		if (buildingDescription != null)
			{
			mainview.insertBefore(notices, buildingDescription.nextSibling);
			}
		}
	notices.innerHTML = notices.innerHTML+'<div class="warning"><h5>'+title+'</h5><p>'+message+'</p></div>';
	};
	
TriumphalArch.DOM =
	{
	_Parent: null
	};
	
TriumphalArch.DOM.Init = function(parent)
	{
	this._Parent = parent;
	};

TriumphalArch.DOM.Get_Nodes = function(query)
	{
	return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	};
	
TriumphalArch.DOM.Get_First_Node = function(path)
	{
	var value = this.Get_Nodes(path);
	if (value.snapshotLength >= 1)
		{
		return value.snapshotItem(0);
		}
	return null;
	};
	
TriumphalArch.DOM.Get_First_Node_Value = function(path, defaultValue)
	{
	var value = this.Get_First_Node(path);
	if (value != null)
		{
		return value.value;
		}
	else return defaultValue;
	};
	
TriumphalArch.DOM.Get_First_Node_TextContent = function(path, defaultValue)
	{
	var value = this.Get_First_Node(path);
	if (value != null)
		{
		return value.textContent;
		}
	else return defaultValue;
	};
	
TriumphalArch.DOM.Has_ClassName = function(oElm, strClassName)
	{
	var arrayClassNames = oElm.className.split(' ');
	var Found = false;
	var arrayClassNamesLength = arrayClassNames.length;
	for (var k=0; k<arrayClassNamesLength; k++)
		{
		if (arrayClassNames[k] == strClassName)
			{
			Found = true;
			break;
			}
		}
	return Found;
	};

TriumphalArch.DOM.Add_ClassName = function(oElm, strClassName)
	{
	/*
	Copyright Robert Nyman, http://www.robertnyman.com
	Free to use if this text is included
	*/
	var strCurrentClass = oElm.className;
	if (!new RegExp(strClassName, "i").test(strCurrentClass))
		{
		oElm.className = strCurrentClass + ((strCurrentClass.length > 0)? " " : "") + strClassName;
		}
	};
	
TriumphalArch.DOM.Remove_ClassName = function(oElm, strClassName)
	{
	/*
	Copyright Robert Nyman, http://www.robertnyman.com
	Free to use if this text is included
	*/
	var oClassToRemove = new RegExp((strClassName + "\s?"), "i");
	oElm.className = oElm.className.replace(oClassToRemove, "").replace(/^\s?|\s?$/g, "");
	};
	
TriumphalArch.Str =
	{
	_Parent: null
	};
	
TriumphalArch.Str.Init = function(parent)
	{
	this._Parent = parent;
	};
	
TriumphalArch.Str.Trim = function(str)
	{ 
	if (str != undefined)
		{
		str = str.replace(/&nbsp;/gi, " ");
		str = str.replace(/\t/gi, " ");
		str = str.replace(/\v/gi, "");
		str = str.replace(/\f/gi, "");
		str = str.replace(/\n/gi, "");
		str = str.replace(/\r/gi, "");
		//str = str.replace(/\e/gi, "");
		str = str.replace(/\s/gi, " ");
		
		while(str.charAt(0) == (" "))
			{ 
			str = str.substring(1);
			}
		while(str.charAt(str.length-1) == " " )
			{ 
			str = str.substring(0,str.length-1);
			}
		}
	return str;
	};

// Replace &amp; HTML entities
TriumphalArch.Str.UnAmp = function(str)
	{
	str = str.replace(/&amp;/gi, "&");
	
	return str;
	};
	
TriumphalArch.Str.Trim_Brackets = function(str)
	{
	str = str.replace(/\(.+\)/gi, "");
	
	return str;
	};
	
TriumphalArch.Str.Trim_Accodances = function(str)
	{
	str = str.replace(/\[.+\]/gi, "");
	
	return str;
	};
	
TriumphalArch.Str.TwoDigit = function(val)
	{
	val = parseInt(val);
	if (val == 0)
		{
		val = "00";
		}
	else if (val < 10)
		{
		return "0"+val;
		}
	return val;
	};
	
TriumphalArch.Str.FormatBigNumber = function(num, alwaysShowSign)
	{
	var s = ""+num;
	if (num == undefined || s == "NaN")
		{
		return "-";
		}
	if (num == "?")
		{
		return num;
		}
		
	var negative = "";
	if (s.substring(0, 1) == "-")
		{
		negative = "-";
		s = s.substring(1);
		}
	else if (alwaysShowSign == true)
		{
		negative = "+";
		}
		
	var i = s.length-3;
	while (i > 0)
		{
		s = s.substring(0, i) + "." + s.substring(i);
		i -= 3;
		}
	return negative + s;
	};
	
/*
v1 & v2 as "v.00.00.00 0000"

return 0 if v2 = v1
	 1 if v2 > v1
	-1 if v2 < v1
*/
TriumphalArch.Str.Compare_Versions = function(v1, v2)
	{
	var result = 0;
	
	// remove "v."
	v1 = v1.replace(/v\./gi, "");
	v2 = v2.replace(/v\./gi, "");
	
	// build number use space separator
	v1 = v1.replace(/ /gi, ".");
	v2 = v2.replace(/ /gi, ".");

	// Parse numbers
	var vn1 = v1.split('.');
	var vn2 = v2.split('.');
	
	// Convert as integer
	for (var i = 0; i < vn1.length; i++)
		{
		vn1[i] = parseInt(vn1[i]);
		}
	for (var j = 0; j < vn2.length; j++)
		{
		vn2[j] = parseInt(vn2[j]);
		}
		
	for (var k = 0; k < vn1.length; k++)
		{
		if (vn2[k] == undefined)
			{
			if (vn1[k] > 0) result = -1;
			break;
			}
		else if (vn2[k] > vn1[k])
			{
			result = 1;
			break;
			}
		else if (vn2[k] < vn1[k])
			{
			result = -1;
			break;
			}
		}
	if ((result == 0) && (vn2.length > vn1.length))
		{
		if (vn2[vn1.length] > 0)
			{
			result = 1;
			}
		else if (vn2[vn2.length-1] > 0)
			{
			result = 1;
			}
		}
		
	//this._Parent.Log.Add(v1+" vs "+v2+" = "+result);
	
	return result;
	};
	
TriumphalArch.Str.To_Integer = function(str, defaultValue)
	{
	// Support signed integers
	var temp = ""+str;
	temp = temp.replace(/[^-0-9]+/g, "");
	temp = parseInt(temp);
	if (defaultValue != undefined && (temp == undefined || (""+temp == "NaN")))
		{
		return defaultValue;
		}
	return temp;
	};

TriumphalArch.Handlers =
	{
	_Parent: null
	};
	
TriumphalArch.Handlers.Init = function(parent)
	{
	this._Parent = parent;
	};
	
TriumphalArch.Handlers.Attach_CombatReports_Events = function()
	{
	var taButtonNextCR = document.getElementById("taButtonNextCR");
	if (taButtonNextCR != null)
		{
		var self = this;
		taButtonNextCR.addEventListener('click', function(e) { self.taButtonNextCR_Click_Event(e); }, false);
		}
	};
	
TriumphalArch.Handlers.taButtonNextCR_Click_Event = function(e)
	{
	this._Parent.Insert_Next_CombatReports();
	};
	
TriumphalArch.Log =
	{
	_Parent: null,
	_Enabled: false
	};
	
TriumphalArch.Log.Init = function(parent)
	{
	this._Parent = parent;
	};
	
TriumphalArch.Log.Add = function(msg)
	{
	if (this._Enabled == true)
		{
		GM_log(msg);
		}
	};
	
TriumphalArch.Updater =
	{
	_Parent:			 null,
	_ScriptURL:			 '',
	_availableVersion:	 0
	};
	
TriumphalArch.Updater.Init = function(parent)
	{
	this._Parent = parent;
	};
	
// CallBackFct function receive available version number (or 0 value if failed) as argument, and XMLHTTP response
TriumphalArch.Updater.Check = function(ScriptURL, CallBackFct)
	{
	this._availableVersion	 = 0;
	this._ScriptURL			 = ScriptURL;
	var self = this;
	
	GM_xmlhttpRequest({
		method:				"GET",
		url:				ScriptURL,
		headers:			{ Accept:"text/javascript; charset=UTF-8" },
		overrideMimeType:	"application/javascript; charset=UTF-8",
		onload:				function(response) { self._ParseScript(response, CallBackFct); }
		});
	};
	
TriumphalArch.Updater._ParseScript = function(response, CallBackFct)
	{
	var availableVersion = 0;
	
	if (response.status == 200)
		{
		var resReg = /@version\s+(\d+)/.exec(response.responseText);
		if (resReg != null)
			{
			availableVersion = resReg[1];
			}
		}
		
	this._availableVersion = availableVersion;
	
	if (typeof CallBackFct == 'function')
		{
		CallBackFct.call(this._Parent, availableVersion, response);
		}
	};
	
TriumphalArch.Init();

