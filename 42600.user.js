// coding: utf-8
// ==UserScript==
// @name           	Red Pot
// @version	10
// @author		oliezekat
// @namespace     red-pot.ikariam
// @description    NOT INSTALL THIS SCRIPT. Ce n'est pas vos questions qui sont indiscrètes, mais la réponse ^^
// @include    	http://*.ika-world.com/*
// @include    	http://miw.miaouw.net/*
// ==/UserScript==

if (!RedPot) var RedPot = {};

RedPot =
	{
	DOM:		 {},
	DB:			 {},
	IkaWorld:	 {},
	MIW:		 {},
	
	Host: 		'',
	View: 		'',
	Country: 	'',
	World: 		0,
	Ally: 		'',
	Page: 		0,

	Log: function(sHTML)
		{
		var ul = document.getElementById('RedPotLog');
		if (ul != null)
			{
			var li = document.createElement('li');
			li.innerHTML = sHTML;
			ul.appendChild(li);
			}
		}
	};
	
RedPot.Init = function()
	{
	this.DOM.Init(this);
	
	// Load previous data
	RedPot.DB.Load();

	// Detect host
	RedPot.Host = /\/\/([\.\-a-z0-9]+)/.exec(document.URL);
	RedPot.Host = RegExp.$1;
	//window.status = 'RedPot.Host='+RedPot.Host;
	
	if ((RedPot.Host == 'www.ika-world.com') || (RedPot.Host == 'fr.ika-world.com'))
		{
		RedPot.IkaWorld.Init(this);
		}
	else if (RedPot.Host == 'miw.miaouw.net')
		{
		RedPot.MIW.Init(this);
		}

	};

RedPot.DOM =
	{
	_Parent: null
	};
	
RedPot.DOM.Init = function(parent)
	{
	this._Parent = parent;
	};

RedPot.DOM.HTML_to_Integer = function(sHTML, defaultValue)
	{
	var temp = ""+sHTML;
	temp = temp.replace(/[^0-9]+/g, "");
	temp = parseInt(temp);
	if (defaultValue != undefined && ((temp == undefined) || (""+temp == "NaN")))
		{
		return defaultValue;
		}
	return temp;
	};

RedPot.DOM.Add_ClassName = function(oElm, strClassName)
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
	
RedPot.DOM.Get_Nodes = function(query)
	{
	return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	};
	
RedPot.DOM.Get_First_Node = function(path)
	{
	var value = this.Get_Nodes(path);
	if (value.snapshotLength == 1)
		{
		return value.snapshotItem(0);
		}
	return null;
	};
		
	
RedPot.DOM.Has_ClassName = function(oElm, strClassName)
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
	
RedPot.DB =
	{
	_Parent: null,
	Islands: {},
	Cities: {},
	Players: {},
	Allies: {},
		
	Save: function()
		{
		GM_setValue('Islands', RedPot.DB.Serialize(RedPot.DB.Islands));
		GM_setValue('Cities', RedPot.DB.Serialize(RedPot.DB.Cities));
		GM_setValue('Players', RedPot.DB.Serialize(RedPot.DB.Players));
		GM_setValue('Allies', RedPot.DB.Serialize(RedPot.DB.Allies));
		},
		
	Load: function()
		{
		RedPot.DB.Islands = RedPot.DB.UnSerialize(GM_getValue('Islands', ''));
		if (RedPot.DB.Islands == null || RedPot.DB.Islands == undefined || RedPot.DB.Islands == "")
			{
			RedPot.DB.Islands = new Object();
			}
		RedPot.DB.Cities = RedPot.DB.UnSerialize(GM_getValue('Cities', ''));
		if (RedPot.DB.Cities == null || RedPot.DB.Cities == undefined || RedPot.DB.Cities == "")
			{
			RedPot.DB.Cities = new Object();
			}
		RedPot.DB.Players = RedPot.DB.UnSerialize(GM_getValue('Players', ''));
		if (RedPot.DB.Players == null || RedPot.DB.Players == undefined || RedPot.DB.Players == "")
			{
			RedPot.DB.Players = new Object();
			}
		RedPot.DB.Allies = RedPot.DB.UnSerialize(GM_getValue('Allies', ''));
		if (RedPot.DB.Allies == null || RedPot.DB.Allies == undefined || RedPot.DB.Allies == "")
			{
			RedPot.DB.Allies = new Object();
			}
		},
	
	Get_Island: function(x, y, World, Country)
		{
		if (Country == undefined)
			Country = RedPot.Country;
		if (World == undefined)
			World = RedPot.World;
			
		if (RedPot.DB.Islands[Country] == undefined)
			{
			RedPot.DB.Islands[Country] = {};
			}
			
		if (RedPot.DB.Islands[Country][World] == undefined)
			{
			RedPot.DB.Islands[Country][World] = {};
			}
			
		var xy = x+':'+y;
		if (RedPot.DB.Islands[Country][World][xy] == undefined)
			{
			RedPot.DB.Islands[Country][World][xy] = {};
			}
			
		return RedPot.DB.Islands[Country][World][xy];
		},
		
	Set_Island_ID: function(Island, ID)
		{
		Island.ID = ID;
		},
		
	Get_Island_ID: function(Island)
		{
		return Island.ID;
		},
		
	Get_City: function(ID, World, Country)
		{
		if (Country == undefined)
			Country = RedPot.Country;
		if (World == undefined)
			World = RedPot.World;
			
		if (RedPot.DB.Cities[Country] == undefined)
			{
			RedPot.DB.Cities[Country] = {};
			}
			
		if (RedPot.DB.Cities[Country][World] == undefined)
			{
			RedPot.DB.Cities[Country][World] = {};
			}
			
		if (RedPot.DB.Cities[Country][World][ID] == undefined)
			{
			RedPot.DB.Cities[Country][World][ID] = {};
			RedPot.DB.Set_City_ID(RedPot.DB.Cities[Country][World][ID], ID);
			RedPot.Log('Add city: '+ID);
			}
			
		return RedPot.DB.Cities[Country][World][ID];
		},
		
	Set_City_ID: function(City, ID)
		{
		City.ID = ID;
		},
		
	Get_City_ID: function(City)
		{
		return City.ID;
		},
		
	Set_City_Name: function(City, Name)
		{
		City.Name = Name;
		},
		
	Set_City_IslandID: function(City, IslandID)
		{
		City.IslandID = parseInt(IslandID);
		},
		
	Set_City_PlayerID: function(City, PlayerID)
		{
		City.PlayerID = PlayerID;
		},
		
	Get_City_PlayerID: function(City)
		{
		return City.PlayerID;
		},
		
	Attach_City_to_Island: function(City, Island)
		{
		if (Island.Cities == undefined)
			{
			Island.Cities = {};
			}
			
		var CityID = RedPot.DB.Get_City_ID(City);
		
		if (Island.Cities[CityID] == undefined)
			{
			Island.Cities[CityID] = {};
			Island.Cities[CityID].ID = CityID;
			}
			
		RedPot.DB.Set_City_IslandID(City, RedPot.DB.Get_Island_ID(Island));
		},
		
	Get_Player: function(ID, World, Country)
		{
		if (Country == undefined)
			Country = RedPot.Country;
		if (World == undefined)
			World = RedPot.World;
			
		if (RedPot.DB.Players[Country] == undefined)
			{
			RedPot.DB.Players[Country] = {};
			}
			
		if (RedPot.DB.Players[Country][World] == undefined)
			{
			RedPot.DB.Players[Country][World] = {};
			}
			
		if (RedPot.DB.Players[Country][World][ID] == undefined)
			{
			RedPot.DB.Players[Country][World][ID] = {};
			RedPot.DB.Set_Player_ID(RedPot.DB.Players[Country][World][ID], ID);
			}
			
		return RedPot.DB.Players[Country][World][ID];
		},
		
	Set_Player_ID: function(Player, ID)
		{
		Player.ID = ID;
		},
		
	Set_Player_Name: function(Player, Name)
		{
		Player.Name = Name;
		},
		
	Set_Player_AllyID: function(Player, AllyID)
		{
		Player.AllyID = AllyID;
		},
		
	Get_Player_AllyID: function(Player)
		{
		return Player.AllyID;
		},
		
	Get_Ally: function(ID, World, Country)
		{
		if (Country == undefined)
			Country = RedPot.Country;
		if (World == undefined)
			World = RedPot.World;
			
		if (RedPot.DB.Allies[Country] == undefined)
			{
			RedPot.DB.Allies[Country] = {};
			}
			
		if (RedPot.DB.Allies[Country][World] == undefined)
			{
			RedPot.DB.Allies[Country][World] = {};
			}
			
		if (RedPot.DB.Allies[Country][World][ID] == undefined)
			{
			RedPot.DB.Allies[Country][World][ID] = {};
			RedPot.DB.Set_Ally_ID(RedPot.DB.Allies[Country][World][ID], ID);
			}
			
		return RedPot.DB.Allies[Country][World][ID];
		},
		
	Set_Ally_ID: function(Ally, ID)
		{
		Ally.ID = ID;
		},
		
	Set_Ally_Tag: function(Ally, Tag)
		{
		Ally.Tag = Tag;
		},
		
	Get_Ally_Tag: function(Ally)
		{
		return Ally.Tag;
		}
	};
		
RedPot.DB.Serialize = function(data)
	{
	return uneval(data);
	};

RedPot.DB.UnSerialize = function(data)
	{
	return eval(data);
	};
	
RedPot.IkaWorld =
	{
	_Parent: null,
	Get_Cities_Form_Options: function()
		{
		var land = RedPot.DOM.Get_First_Node("//select[@name='land']/option[@selected='selected']");
		RedPot.Country = land.value;
		var welt = RedPot.DOM.Get_First_Node("//select[@name='welt']/option[@selected='selected']");
		RedPot.World = parseInt(welt.value);
		var allianz = RedPot.DOM.Get_First_Node("//input[@name='allianz']");
		RedPot.Ally = allianz.value;
		var seite = RedPot.DOM.Get_First_Node("//input[@name='seite']");
		if (seite == null)
			{
			RedPot.Page = 1;
			}
		else
			{
			RedPot.Page = parseInt(seite.value);
			}
		}
		
	
	};
	
RedPot.IkaWorld.Init = function(parent)
	{
	this._Parent = parent;
	
	// Set menu caption
	var naviDIV = document.getElementById('navi');
	if (naviDIV != null)
		{
		var sHTML = '<div><ul id="RedPotLog"><u>Red Pot log:</u><br><li>Starting...</li></ul></div>';
		naviDIV.innerHTML = naviDIV.innerHTML + sHTML;
		}
	
	// Detect view
	var url_view = /[\?&]view=([a-zA-Z0-9\-_]+)/.exec(document.URL);
	if (url_view != null) this._Parent.View = RegExp.$1;
	this._Parent.Log('View: '+this._Parent.View);
	
	// Process by views
	if (this._Parent.View == 'suche_stadt')
		{
		// Config DataBase
		this.Get_Cities_Form_Options();
		this._Parent.Log('Country: '+this._Parent.Country);
		this._Parent.Log('World: '+this._Parent.World);
		
		// Search cities
		this.Fetch_Cities();
		}
	else if (this._Parent.View == 'weltkarte')
		{
		// Display map
		}		
	
	};
	
RedPot.IkaWorld.Fetch_Cities = function()
	{
	var nodes = this._Parent.DOM.Get_Nodes("//form//td[@class='c1']");
	if (nodes != null)
		{
		var CitiesCount = nodes.snapshotLength;
		this._Parent.Log('Detect '+CitiesCount+' cities');
		for (var i=0; i < nodes.snapshotLength; i++)
			{
			var tr = nodes.snapshotItem(i).parentNode;
			var tds = tr.getElementsByTagName("td");
			
			// Island coords
			var CityX = parseInt(tds[6].textContent);
			var CityY = parseInt(tds[7].textContent);
			var Island = this._Parent.DB.Get_Island(CityX, CityY);
			
			// Island Id
			var td4 = tds[8].innerHTML;
			var url_args = /id=([0-9]+)/.exec(td4);
			if (url_args != null)
				{
				var IslandID = parseInt(RegExp.$1);
				this._Parent.DB.Set_Island_ID(Island, IslandID);
				}
			
			// Ally
			var td1href = tds[1].getElementsByTagName("a")[0].href;
			var AllyID = this._Parent.DOM.HTML_to_Integer(td1href, 0);
			var Ally = this._Parent.DB.Get_Ally(AllyID);
			var AllyTag = tds[1].textContent;
			this._Parent.DB.Set_Ally_Tag(Ally, AllyTag);
			
			// Player
			var td0href = tds[0].getElementsByTagName("a")[0].href;
			var PlayerID = this._Parent.DOM.HTML_to_Integer(td0href);
			var Player = this._Parent.DB.Get_Player(PlayerID);
			var PlayerName = tds[0].textContent;
			this._Parent.DB.Set_Player_Name(Player, PlayerName);
			this._Parent.DB.Set_Player_AllyID(Player, AllyID);
			
			// City
			var url_args = /selectCity=([0-9]+)/.exec(tds[3].innerHTML);
			if (url_args != null)
				{
				var CityID = parseInt(RegExp.$1);
				var City = this._Parent.DB.Get_City(CityID);
				var CityName = tds[3].textContent;
				this._Parent.DB.Set_City_Name(City, CityName);
				this._Parent.DB.Set_City_PlayerID(City, PlayerID);
				this._Parent.DB.Attach_City_to_Island(City, Island);
				}
			}
		}
		
	this._Parent.DB.Save();
	};

RedPot.MIW =
	{
	_Parent: null,
	Init: function(parent)
		{
		// Set menu caption
		var sHTML = '<h2><i>Red-Pot</i></h2>';
		sHTML += '<ul>';
		sHTML += '<li><a allyid="5060" colorname="Orange" class="RedPotDrawAlly" href="javascript://void(0);">Comp. Com. Pacifiques [CCP]</a></li>';
		
		sHTML += '<li><a allyid="7898" colorname="Red" class="RedPotDrawAlly" href="javascript://void(0);">les 7 Nains [l7N]</a></li>';
		
		sHTML += '<li><a allyid="1623" colorname="LawnGreen" class="RedPotDrawAlly" href="javascript://void(0);">Union des Maires de l\'Archipel [UMA]</a></li>';
		sHTML += '<li><a allyid="6102" colorname="Blue" class="RedPotDrawAlly" href="javascript://void(0);">Aemilia de Rome [AdR]</a></li>';
		/*
		
		sHTML += '<li><a allyid="6160" colorname="Red" class="RedPotDrawAlly" href="javascript://void(0);">[ATA 2]</a></li>';
		sHTML += '<li><a allyid="157" colorname="Purple" class="RedPotDrawAlly" href="javascript://void(0);">Spartianas [SPA]</a></li>';
		sHTML += '<li><a allyid="5330" colorname="LawnGreen" class="RedPotDrawAlly" href="javascript://void(0);">Union Citoyenne [U_C]</a></li>';
		sHTML += '<li><a allyid="610" colorname="Blue" class="RedPotDrawAlly" href="javascript://void(0);">[EMP]</a></li>';
		sHTML += '<li><a allyid="2462" colorname="Blue" class="RedPotDrawAlly" href="javascript://void(0);">[HERO]</a></li>';
		sHTML += '<li><a allyid="2285" colorname="Blue" class="RedPotDrawAlly" href="javascript://void(0);">[-TB-]</a></li>';

		sHTML += '<li><a allyid="6573" colorname="Red" class="RedPotDrawAlly" href="javascript://void(0);">[QBC]</a></li>';
		sHTML += '<li><a allyid="6570" colorname="Red" class="RedPotDrawAlly" href="javascript://void(0);">[CHIPS]</a></li>';
		
		sHTML += '<li><a allyid="6102" colorname="LawnGreen" class="RedPotDrawAlly" href="javascript://void(0);">Luxembourg 2 [LUX 2]</a></li>';
		sHTML += '<li><a allyid="487" colorname="LawnGreen" class="RedPotDrawAlly" href="javascript://void(0);">Marchands Garous [-MG-]</a></li>';
		sHTML += '<li><a allyid="6516" colorname="LawnGreen" class="RedPotDrawAlly" href="javascript://void(0);">Les lycans [LYC]</a></li>';

		sHTML += '<li><a allyid="1315" colorname="Blue" class="RedPotDrawAlly" href="javascript://void(0);">Force-Honneur [F-H]</a></li>';
		sHTML += '<li><a allyid="5056" colorname="Blue" class="RedPotDrawAlly" href="javascript://void(0);">Les Templiers [--T--]</a></li>';
		sHTML += '<li><a allyid="5850" colorname="Blue" class="RedPotDrawAlly" href="javascript://void(0);">Les Fils du Temple [AcT]</a></li>';
		sHTML += '<li><a allyid="6068" colorname="Orange" class="RedPotDrawAlly" href="javascript://void(0);">Mine des 7 Nains [M7N]</a></li>';
		sHTML += '<li><a allyid="6608" colorname="Magenta" class="RedPotDrawAlly" href="javascript://void(0);">NUL [ZZZ]</a></li>';
		
		sHTML += '<li><a allyid="5610" colorname="Red" class="RedPotDrawAlly" href="javascript://void(0);">Proelium Empire [P E]</a></li>';

		sHTML += '<li><a allyid="5398" colorname="LawnGreen" class="RedPotDrawAlly" href="javascript://void(0);">The Focus Evil [-FE-]</a></li>';
		sHTML += '<li><a allyid="5107" colorname="Magenta" class="RedPotDrawAlly" href="javascript://void(0);">Armada Empire [ARMA]</a></li>';
		*/
		sHTML += '</ul>';
		sHTML += '<p><u>Log:</u></p>';
		sHTML += '<ul id="RedPotLog"><li>Starting...</li></ul>';
		var Plugins = document.getElementById("Plugins");
		var div = document.createElement('div');
		div.id = 'RedPot';
		div.setAttribute("class", "SideBox");
		div.innerHTML = sHTML;
		Plugins.appendChild(div);
		
		var sInfos = document.getElementById("sInfos");
		var p = document.createElement('p');
		p.innerHTML = '<label>Cities :</label><ul id="sCities"></ul>';
		sInfos.appendChild(p);
		
		// Set DataBase
		RedPot.Country = 'fr';
		RedPot.World = 5;
		RedPot.Log('Country: '+RedPot.Country);
		RedPot.Log('World: '+RedPot.World);
		
		// attach events
		var nodes = RedPot.DOM.Get_Nodes("//a[contains(@class,'RedPotDrawAlly')]");
		for (var i=0; i<nodes.snapshotLength; i++)
			{
			nodes.snapshotItem(i).addEventListener('click', RedPot.MIW.Draw_Ally_Event, false);
			}
			
		var nodes = RedPot.DOM.Get_Nodes("//table[@id='Map']/tbody/tr/td");
		for (var i=0; i<nodes.snapshotLength; i++)
			{
			nodes.snapshotItem(i).addEventListener('click', RedPot.MIW.Click_Island_Event, false);
			}
		},
		
	Click_Island_Event: function(e)
		{
		if (!e) { e = window.event; }
		var obj = e.srcElement ? e.srcElement:e.target;
		while (obj.tagName != 'TD')
			{
			obj = obj.parentNode;
			}
		
		if (RedPot.DOM.Has_ClassName(obj, 'Island'))
			{
			var sHTML = '';
			var IslandX = obj.getAttribute('x');
			var IslandY = obj.getAttribute('y');
			var Island = RedPot.DB.Get_Island(IslandX, IslandY);
			if (Island.Cities != undefined)
				{
				var CityID;
				for (CityID in Island.Cities)
					{
					var City = RedPot.DB.Get_City(CityID);
					var Player = RedPot.DB.Get_Player(City.PlayerID);
					var Ally = RedPot.DB.Get_Ally(Player.AllyID);
					sHTML += '<li>'+City.Name+' ('+Player.Name+') ['+Ally.Tag+']</li>';
					}
				}
			
			var sCities = document.getElementById("sCities");
			sCities.innerHTML = sHTML;
			}
		},
		
	Draw_Ally_Event: function(e)
		{
		var obj = e.srcElement ? e.srcElement:e.target;
		while (obj.tagName != 'A')
			{
			obj = obj.parentNode;
			}
		var AllyID = obj.getAttribute("allyid");
		var ColorName = obj.getAttribute("colorname");
		RedPot.MIW.Draw_Ally(AllyID, ColorName);
		},
		
	Draw_Ally: function(AllyID, cColorName, bColorName)
		{
		if (bColorName == undefined) bColorName = cColorName;
		
		var Ally = RedPot.DB.Get_Ally(AllyID);
		RedPot.Log('Request for ['+RedPot.DB.Get_Ally_Tag(Ally)+'] ally');
		
		// Search islands
		var nodes = RedPot.DOM.Get_Nodes("//table[@id='Map']//td[contains(@class, 'Island')]");
		//RedPot.Log('Found '+nodes.snapshotLength+' islands');
		var count = 0;
		for (var i=0; i < nodes.snapshotLength; i++)
			{
			var node = nodes.snapshotItem(i);
			var IslandX = node.getAttribute('x');
			var IslandY = node.getAttribute('y');
			var Island = RedPot.DB.Get_Island(IslandX, IslandY);
			if (Island.Cities != undefined)
				{
				var foundAlly = false;
				var CityID;
				for (CityID in Island.Cities)
					{
					var City = RedPot.DB.Get_City(CityID);
					var PlayerID = RedPot.DB.Get_City_PlayerID(City);
					var Player = RedPot.DB.Get_Player(PlayerID);
					if (RedPot.DB.Get_Player_AllyID(Player) == AllyID)
						{
						foundAlly = true;
						count++;
						}
					}
					
				if (foundAlly == true)
					{
					RedPot.DOM.Add_ClassName(node, 'c'+cColorName);
					RedPot.DOM.Add_ClassName(node, 'b'+bColorName);
					}
				}
			}
		RedPot.Log('Found '+count+' cities');
		}
	};
	
RedPot.Init();