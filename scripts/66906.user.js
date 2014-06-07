// coding: utf-8
// ==UserScript==
// @name		Testeeeeeeee
// @version	130
// @author		oliezekat
// @namespace	useless-navy.ikariam
// @description	Hide resources transports in Army advisor view. And hide troops movements in Merchant-Navy view. Require Ikariam v.0.3.x game server.
// @include	http://s*.ikariam.*/*
// @exclude	http://support.ikariam.*/*
// ==/UserScript==

if (!UselessNavy) var UselessNavy = {};

UselessNavy =
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
	PoweredBy:		 '',
	
	/* Script metas */
	ScriptName:		 'Ikariam Useless Navy',
	Version:		 130,
	HomePage:		 '',
	ScriptURL:		 '',
	UserScriptsID:	 42907
	};
	
UselessNavy.Init = function()
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
	
	this.PoweredBy		  = '<p style="text-align: right;">';
	this.PoweredBy		 += 'Enhanced by <a target="_blank" href="'+this.HomePage+'"><b>'+this.ScriptName+'</b></a> (v. <i>'+this.Version+'</i>).';
	if (this.DB.Options['AvailableVersion'] > this.Version)
		this.PoweredBy += ' <a href="'+this.ScriptURL+'?version='+this.DB.Options['AvailableVersion']+'.user.js'+'" style="color: red;"><b>NEW RELEASE V. <i>'+this.DB.Options['AvailableVersion']+'</i> AVAILABLE !</b></a>';
	this.PoweredBy		 += '</p>';

	if (this.Ikariam.View() =='militaryAdvisorMilitaryMovements')
		{
		this.ViewIsMilitaryMovements();
		}
	else if (this.Ikariam.View() == 'merchantNavy')
		{
		this.ViewIsMerchantNavy();
		}
		
	this.Log.Add('End !');
	};
	
UselessNavy.ViewIsMilitaryMovements = function()
	{
	this.Set_Common_Styles();
	this.Set_MilitaryMovements_Styles();
	this.Insert_MilitaryMovements_Header();
	this.Insert_Footer();
	this.Ikariam.Fetch_FleetMovements(this.DB.FleetMovements);
	this.Prepend_MilitaryMovements();
	this.Select_MilitaryMovements_Tab();
	this.CheckScriptUpdate();
	};
	
UselessNavy.Prepend_MilitaryMovements = function()
	{
	var nbMO = 0;
	var nbGT = 0;
	var nbFT = 0;
	
	var resMi = this.DOM.Get_Nodes("//div[@id='fleetMovements']//table[contains(@class, 'locationEvents')]/tbody/tr/td/img[contains(@src, 'mission_')]");
	if (resMi.snapshotLength > 0)
		{
		for (var i=0; i < resMi.snapshotLength; i++)
			{
			var tr = resMi.snapshotItem(i).parentNode.parentNode;
			var tds = tr.getElementsByTagName("td");
				
			var fleetId = tds[1].id;
			
			if ((fleetId != '') && (this.DB.FleetMovements[fleetId] != undefined))
				{
				var FleetMovement = this.DB.FleetMovements[fleetId];
				
				var isMO = false;
				var isGT = false;
				var isFT = false;
				
				if (FleetMovement.hostile == true)
					{
					isMO = true;
					}
				else if (FleetMovement.own == true)
					{
					if (FleetMovement.mission == 'trade')
						{
						isGT = true;
						}
					else if (FleetMovement.mission == 'transport')
						{
						isGT = true;
						}
					else
						{
						isMO = true;
						}
					}
				else
					{
					if (FleetMovement.mission == 'trade')
						{
						isFT = true;
						}
					else if (FleetMovement.mission == 'transport')
						{
						isFT = true;
						}
					else
						{
						isMO = true;
						}
					}
					
				if (isMO == true)
					{
					nbMO++;
					this.DOM.Add_ClassName(tr, 'unMO');
					}
				else if (isGT == true)
					{
					nbGT++;
					this.DOM.Add_ClassName(tr, 'unGT');
					}
				else if (isFT == true)
					{
					nbFT++;
					this.DOM.Add_ClassName(tr, 'unFT');
					}
				}
			}
		}
		
	// Update header counters
	var self = this;
	var unMOb = document.getElementById("unMOb");
	if (unMOb != null)
		{
		unMOb.innerHTML = '<em>Ações militares ('+nbMO+')</em>';
		unMOb.addEventListener('click', function() { self.Select_MilitaryMovements_Tab('MO'); }, false);
		}
	var unGTb = document.getElementById("unGTb");
	if (unGTb != null)
		{
		unGTb.innerHTML = '<em>Meus trasportes ('+nbGT+')</em>';
		unGTb.addEventListener('click', function() { self.Select_MilitaryMovements_Tab('GT'); }, false);
		}
	var unFTb = document.getElementById("unFTb");
	if (unFTb != null)
		{
		unFTb.innerHTML = '<em>Trasporte de outras nações('+nbFT+')</em>';
		unFTb.addEventListener('click', function() { self.Select_MilitaryMovements_Tab('FT'); }, false);
		}
	};
	
UselessNavy.Select_MilitaryMovements_Tab = function(filter)
	{
	// filter = MO, GT, or FT
	if (filter == undefined) filter = 'MO';
	
	var tabs = this.DOM.Get_Nodes("//div[@id='UselessNavyHeader']//li");
	if (tabs.snapshotLength > 0)
		{
		for (var i=0; i < tabs.snapshotLength; i++)
			{
			var li = tabs.snapshotItem(i);
			
			this.DOM.Remove_ClassName(li,'selected');
			}
		}
		
	var unXXb = document.getElementById("un"+filter+"b");
	if (unXXb != null)
		{
		this.DOM.Add_ClassName(unXXb.parentNode,'selected');
		}
	
	var resMi = this.DOM.Get_Nodes("//div[@id='fleetMovements']//table[contains(@class, 'locationEvents')]/tbody/tr/td/img[contains(@src, 'mission_')]");
	if (resMi.snapshotLength > 0)
		{
		for (var i=0; i < resMi.snapshotLength; i++)
			{
			var tr = resMi.snapshotItem(i).parentNode.parentNode;
			
			if (this.DOM.Has_ClassName(tr,'un'+filter))
				{
				this.DOM.Remove_ClassName(tr,'useless');
				}
			else
				{
				this.DOM.Add_ClassName(tr,'useless');
				}
			}
		}
		
	var combatsInProgress = document.getElementById('combatsInProgress');
	if (combatsInProgress != null)
		{
		if (filter == 'MO')
			{
			combatsInProgress.style.display = 'block';
			}
		else
			{
			combatsInProgress.style.display = 'none';
			}
		}
		
	this.Hide_Useless_MilitaryMovements();
	};
	
UselessNavy.ViewIsMerchantNavy = function()
	{
	this.Set_Common_Styles();
	this.Set_MerchantNavy_Styles();
	this.Insert_Footer();
	if (this.Ikariam.Is_Version_032x())
		{
		this.Ikariam.Fetch_MerchantNavy_Boxes(this.DB.MerchantBoxes);
		this.Insert_MerchantNavy_Header();
		if (this.DB.Options.Prefs.ExpandPayloads)
			{
			this.Expand_MerchantNavy_Payloads();
			}
		else
			{
			this.Collapse_MerchantNavy_Payloads();
			}
		}
	else
		{
		// Old style for v. 0.3.1
		// Soon deprecated
		this.Hide_Military_Movements();
		}
	this.CheckScriptUpdate();
	};
	
UselessNavy.Collapse_MerchantNavy_Payloads = function()
	{
	var mainviewDIV = document.getElementById("mainview");
	if (mainviewDIV != null)
		{
		this.DOM.Remove_ClassName(mainviewDIV,'unExpandPayloads');
		}
	
	// Add button
	var div = document.getElementById("UselessNavyFooter");
	if (div != null)
		{
		var sHTML = '<a id="ExpandAllPayloads" class="button" href="javascript://void(0);">Expand every payloads</a>'+this.PoweredBy;
		div.innerHTML = sHTML;
		
		var ExpandAllPayloads = document.getElementById("ExpandAllPayloads");
		var self = this;
		ExpandAllPayloads.addEventListener('click', function() { self.Expand_MerchantNavy_Payloads(); }, false);
		}
		
	this.DB.Options.Prefs.ExpandPayloads = false;
	this.DB.Save_Options();
	};
	
UselessNavy.Expand_MerchantNavy_Payloads = function()
	{
	var mainviewDIV = document.getElementById("mainview");
	if (mainviewDIV != null)
		{
		this.DOM.Add_ClassName(mainviewDIV,'unExpandPayloads');
		}
	
	// Add button
	var div = document.getElementById("UselessNavyFooter");
	if (div != null)
		{
		var sHTML = '<a id="CollapseAllPayloads" class="button" href="javascript://void(0);">Collapse every payloads</a>'+this.PoweredBy;
		div.innerHTML = sHTML;
		
		var CollapseAllPayloads = document.getElementById("CollapseAllPayloads");
		var self = this;
		CollapseAllPayloads.addEventListener('click', function() { self.Collapse_MerchantNavy_Payloads(); }, false);
		}
		
	this.DB.Options.Prefs.ExpandPayloads = true;
	this.DB.Save_Options();
	};
	
UselessNavy.Insert_MerchantNavy_Header = function()
	{
	var mainview = document.getElementById("mainview");
	var divs = mainview.getElementsByTagName("div");
	
	var HeaderHTML = '';
	HeaderHTML += '<ul class="yui-nav">';
	var boxId;
	var lastBoxId = '';
	for (boxId in this.DB.MerchantBoxes)
		{
		HeaderHTML += '<li><a id="unTab'+boxId+'" boxid="'+boxId+'" href="javascript://void(0);"><em>'+this.DB.MerchantBoxes[boxId].title+' ('+this.DB.MerchantBoxes[boxId].length+')</em></a></li>';
		lastBoxId = boxId;
		}
	HeaderHTML += '</ul>';
	
	var UselessNavyHeader = document.createElement('div');
	UselessNavyHeader.setAttribute("class", 'yui-navset');
	UselessNavyHeader.id = 'UselessNavyHeader';
	UselessNavyHeader.innerHTML = HeaderHTML;
	
	mainview.insertBefore(UselessNavyHeader, divs[1]);
	
	this.Handlers.Attach_MerchantNavy_Tabs_Events();
	
	this.Select_MerchantNavy_Tab(lastBoxId);
	};
	
UselessNavy.Select_MerchantNavy_Tab = function(boxIdSelected)
	{
	var tabs = this.DOM.Get_Nodes("//div[@id='UselessNavyHeader']//li");
	if (tabs.snapshotLength > 0)
		{
		for (var i=0; i < tabs.snapshotLength; i++)
			{
			var li = tabs.snapshotItem(i);
			
			this.DOM.Remove_ClassName(li,'selected');
			}
		}
		
	var unXXb = document.getElementById("unTab"+boxIdSelected);
	if (unXXb != null)
		{
		this.DOM.Add_ClassName(unXXb.parentNode,'selected');
		}
		
	var boxId;
	for (boxId in this.DB.MerchantBoxes)
		{
		var contentBox = document.getElementById(boxId);
		if (boxId == boxIdSelected)
			{
			contentBox.style.display = 'block';
			}
		else
			{
			contentBox.style.display = 'none';
			}
		}
	};
	
UselessNavy.Insert_MilitaryMovements_Header = function()
	{
	var mainview = document.getElementById("mainview");
	var combatsInProgress = document.getElementById("combatsInProgress");
	
	var HeaderHTML = '';
	HeaderHTML += '<ul class="yui-nav">';
	HeaderHTML += '<li><a id="unMOb" href="javascript://void(0);"></a></li>';
	HeaderHTML += '<li><a id="unGTb" href="javascript://void(0);"></a></li>';
	HeaderHTML += '<li><a id="unFTb" href="javascript://void(0);"></a></li>';
	HeaderHTML += '</ul>';
	
	var UselessNavyHeader = document.createElement('div');
	UselessNavyHeader.setAttribute("class", 'yui-navset');
	UselessNavyHeader.id = 'UselessNavyHeader';
	UselessNavyHeader.innerHTML = HeaderHTML;
	
	mainview.insertBefore(UselessNavyHeader, combatsInProgress);
	};
	
UselessNavy.Insert_Footer = function()
	{
	var div = document.getElementById("UselessNavyFooter");
	if (div == null)
		{
		div = document.createElement('div');
		div.id = 'UselessNavyFooter';
		var mainview = document.getElementById("mainview");
		mainview.appendChild(div);
		}
		
	div.innerHTML = this.PoweredBy;
	};
	
UselessNavy.CheckScriptUpdate = function()
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
	
UselessNavy._CompareScriptUpdate = function(availableVersion)
	{
	this.Log.Add('Available version: '+availableVersion);
	if (availableVersion != 0)
		{
		availableVersion = parseInt(availableVersion);
		
		if ((availableVersion > this.Version) && ((this.DB.Options['AvailableVersion'] == undefined) || (availableVersion > this.DB.Options['AvailableVersion'])))
			{
			if (confirm("Do you want to install \""+this.ScriptName+"\" v. "+availableVersion+" ?"))
				{
				GM_openInTab(this.ScriptURL+'?version='+availableVersion+'.user.js');
				}
			}
		
		this.DB.Options['AvailableVersion'] = availableVersion;
		this.DB.Options['LastCheckUpdate'] = this.StartTime;
		this.DB.Save_Options();
		}
	};
	
UselessNavy.Set_Common_Styles = function()
	{
	// define CSS 
	var default_style = <><![CDATA[
	#UselessNavyFooter {margin-bottom: 10px;}
	]]></>.toXMLString();
	GM_addStyle(default_style);
	};
		

UselessNavy.Set_MilitaryMovements_Styles = function()
	{
	// define CSS 
	var default_style = <><![CDATA[
	/* Fix v. 0.3.2 bug */
	#combatsInProgress .eventbar .status { float: none !important; margin-right: 470px; }
	#combatsInProgress .eventbar .nextEventETA { float: none !important; margin-right: 0px !important;}
	
	#fleetMovements tr td {color: #542C0F !important;}
	#fleetMovements tr td a { color: #1F09F8; display: block; clear: right;}
	#fleetMovements tr.useless td { color: #CB9B6A !important; }
	#fleetMovements tr.useless td a { color: #9090FF !important; }
	#fleetMovements tr.hostile td,
	#fleetMovements tr.hostile td a { color: #F71F1F !important;}
	]]></>.toXMLString();
	GM_addStyle(default_style);
	};
		
UselessNavy.Display_Military_Movements = function()
	{
	// Soon deprecated
	var HiddenMovements = 0;
	var nodes = UselessNavy.DOM.Get_Nodes("//div[@id='mainview']//td[contains(@class, 'mission')]");
	if (nodes != null)
		{
		for (var i=0; i < nodes.snapshotLength; i++)
			{
			var tr = nodes.snapshotItem(i).parentNode;
			var tds = tr.getElementsByTagName("td");
			var nETA = tds[4];
			var nRET = tds[5];
			
			if (tr.style.display == 'none')
				{
				tr.style.display = 'table-row';
				if ((nETA.id != '') || (nRET.id != '')) tr.nextSibling.style.display = 'table-row';
				HiddenMovements++;
				
				tr.parentNode.parentNode.parentNode.parentNode.style.display = '';
				}
			}
		}
	
	var div = document.getElementById("UselessNavyFooter");
	if (div != null)
		{
		var sHTML = '<a id="HideUselessMovements" class="button" href="javascript://void(0);">Escoder os movimentos adicionais ('+HiddenMovements+') </a> displayed for your pleasure.'+UselessNavy.PoweredBy;
		div.innerHTML = sHTML;
		
		var HideUselessMovements = document.getElementById("HideUselessMovements");
		HideUselessMovements.addEventListener('click', UselessNavy.Hide_Military_Movements, false);
		}
		
	};
	
UselessNavy.Hide_Military_Movements = function()
	{
	// Soon deprecated
	var HiddenMovements = 0;
	var nodes = UselessNavy.DOM.Get_Nodes("//div[@id='mainview']//td[contains(@class, 'mission')]");
	if (nodes != null)
		{
		for (var i=0; i < nodes.snapshotLength; i++)
			{
			//GM_log("mission: "+nodes.snapshotItem(i).textContent);
			var mayHide = false;
			var tr = nodes.snapshotItem(i).parentNode;
			var tds = tr.getElementsByTagName("td");
			var nETA = tds[4];
			var nRET = tds[5];
			
			if (tr.parentNode.parentNode.parentNode.parentNode.id == 'plunderingTransports') mayHide = true;
			if (UselessNavy.DOM.Has_ClassName(tr.parentNode.parentNode,'table01')) mayHide = true;

			if ((nETA.id != '') || (nRET.id != ''))
				{
				var trPayload = tr.nextSibling;
				var payload = trPayload.getElementsByTagName("img");
				if (payload.length > 0)
					{
					for (var j = 0; j < payload.length; j++)
						{
						if (payload[j].src.indexOf('wood') > 0)
							{
							mayHide = false;
							break;
							}
						else if (payload[j].src.indexOf('wine') > 0)
							{
							mayHide = false;
							break;
							}
						else if (payload[j].src.indexOf('marble') > 0)
							{
							mayHide = false;
							break;
							}
						else if (payload[j].src.indexOf('glass') > 0)
							{
							mayHide = false;
							break;
							}
						else if (payload[j].src.indexOf('sulfur') > 0)
							{
							mayHide = false;
							break;
							}
						else if (payload[j].src.indexOf('slinger') > 0)
							{
							mayHide = true;
							}
						else if (payload[j].src.indexOf('swordsman') > 0)
							{
							mayHide = true;
							}
						else if (payload[j].src.indexOf('phalanx') > 0)
							{
							mayHide = true;
							}
						else if (payload[j].src.indexOf('spearman') > 0)
							{
							mayHide = true;
							}
						else if (payload[j].src.indexOf('archer') > 0)
							{
							mayHide = true;
							}
						else if (payload[j].src.indexOf('marksman') > 0)
							{
							mayHide = true;
							}
						else if (payload[j].src.indexOf('gyrocopter') > 0)
							{
							mayHide = true;
							}
						else if (payload[j].src.indexOf('steamgiant') > 0)
							{
							mayHide = true;
							}
						else if (payload[j].src.indexOf('bombardier') > 0)
							{
							mayHide = true;
							}
						else if (payload[j].src.indexOf('ram') > 0)
							{
							mayHide = true;
							}
						else if (payload[j].src.indexOf('catapult') > 0)
							{
							mayHide = true;
							}
						else if (payload[j].src.indexOf('mortar') > 0)
							{
							mayHide = true;
							}
						else if (payload[j].src.indexOf('medic') > 0)
							{
							mayHide = true;
							}
						else if (payload[j].src.indexOf('cook') > 0)
							{
							mayHide = true;
							}
						}
					}
				}
			
			if (mayHide == true)
				{
				tr.style.display = 'none';
				UselessNavy.DOM.Add_ClassName(tr, 'useless');
				if ((nETA.id != '') || (nRET.id != '')) tr.nextSibling.style.display = 'none';
				HiddenMovements++;
				
				if (tr.parentNode.parentNode.parentNode.parentNode.style.display != 'block')
					tr.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
				}
			else
				{
				tr.parentNode.parentNode.parentNode.parentNode.style.display = 'block';
				}
			}
		}
	
	// Add button to display hidden movements
	var div = document.getElementById("UselessNavyFooter");
	if (div != null)
		{
		var sHTML = '<a id="DisplayUselessMovements" class="button" href="javascript://void(0);">Mostrar '+HiddenMovements+' outro(s) movimento(s)</a> hidden for your convenience.'+UselessNavy.PoweredBy;
		div.innerHTML = sHTML;
		
		var DisplayUselessMovements = document.getElementById("DisplayUselessMovements");
		DisplayUselessMovements.addEventListener('click', UselessNavy.Display_Military_Movements, false);
		}
		
	};
		
UselessNavy.Set_MerchantNavy_Styles = function()
	{
	// define CSS 
	var default_style = <><![CDATA[
	#merchantNavy #mainview table tr.useless td { color: #CB9B6A !important; }
	#merchantNavy #mainview table tr.useless td a { color: #9090FF !important; }
	#merchantNavy .unExpandPayloads table div.pulldown div.btn { display: none !important;}
	#merchantNavy .unExpandPayloads table div.pulldown div.content {height: auto !important;}
	]]></>.toXMLString();
	GM_addStyle(default_style);
	};
		
UselessNavy.Set_MilitaryMovements_Alt_ClassNames = function()
	{
	var nodes = this.DOM.Get_Nodes("//table[contains(@class, 'locationEvents')]//img[contains(@src, 'mission_')]");
	if (nodes != null)
		{
		var LastAlt = true;
		for (var i=0; i < nodes.snapshotLength; i++)
			{
			var tr = nodes.snapshotItem(i).parentNode.parentNode;
			
			if (tr.style.display == 'none')
				{
				// Ignore hidden row
				}
			else
				{
				if (LastAlt == true)
					{
					this.DOM.Remove_ClassName(tr,'alt');
					LastAlt = false;
					}
				else
					{
					this.DOM.Add_ClassName(tr,'alt');
					LastAlt = true;
					}
				}
			}
		}
	};
		
UselessNavy.Show_Useless_MilitaryMovements = function()
	{
	var HiddenTransports = 0;
	var nodes = this.DOM.Get_Nodes("//table[contains(@class, 'locationEvents')]//img[contains(@src, 'mission_')]");
	if (nodes != null)
		{
		for (var i=0; i < nodes.snapshotLength; i++)
			{
			var tr = nodes.snapshotItem(i).parentNode.parentNode;
			
			if (this.DOM.Has_ClassName(tr,'useless'))
				{
				tr.style.display = 'table-row';
				HiddenTransports++;
				}
			}
		}
		
	// Reset Alt classnames
	this.Set_MilitaryMovements_Alt_ClassNames();
	
	var div = document.getElementById("UselessNavyFooter");
	if (div != null)
		{
		var sHTML = '<a id="HideUselessNavy" class="button" href="javascript://void(0);">Esconder outro(s) movimento(s) ('+HiddenTransports+')</a> displayed for your pleasure.'+this.PoweredBy;
		div.innerHTML = sHTML;
		
		var HideUselessNavy = document.getElementById("HideUselessNavy");
		var self = this;
		HideUselessNavy.addEventListener('click', function() { self.Hide_Useless_MilitaryMovements(); }, false);
		}
		
	};
	
UselessNavy.Hide_Useless_MilitaryMovements = function()
	{
	var HiddenTransports = 0;
	var resMi = this.DOM.Get_Nodes("//div[@id='fleetMovements']//table[contains(@class, 'locationEvents')]/tbody/tr/td/img[contains(@src, 'mission_')]");
	if (resMi.snapshotLength > 0)
		{
		for (var i=0; i < resMi.snapshotLength; i++)
			{
			var tr = resMi.snapshotItem(i).parentNode.parentNode;
			
			if (this.DOM.Has_ClassName(tr,'useless'))
				{
				tr.style.display = 'none';
				HiddenTransports++;
				}
			else
				{
				tr.style.display = 'table-row';
				}
			}
		}
		
	// Reset Alt classnames
	this.Set_MilitaryMovements_Alt_ClassNames();
		
	// Add button to display hidden transports
	var div = document.getElementById("UselessNavyFooter");
	if (div != null)
		{
		var sHTML = '<a id="DisplayUselessNavy" class="button" href="javascript://void(0);">Todos os movimento ('+HiddenTransports+')(s)</a> hidden for your convenience.'+this.PoweredBy;
		div.innerHTML = sHTML;
		
		var DisplayUselessNavy = document.getElementById("DisplayUselessNavy");
		var self = this;
		DisplayUselessNavy.addEventListener('click', function() { self.Show_Useless_MilitaryMovements(); }, false);
		}
		
	};
	
UselessNavy.DB =
	{
	_Parent: null,
	Prefix:				 null,
	Options:			 {},
	FleetMovements:		 {},
	MerchantBoxes:		 {}
	};
	
UselessNavy.DB.Init = function(parent, host)
	{
	// Requires: Ikariam
	this._Parent = parent;
	if (host == undefined) host = this._Parent.Ikariam.Host();
	
	var prefix = host;
	prefix = prefix.replace('.ikariam.', '-');
	prefix = prefix.replace('.', '-');
	this.Prefix = prefix;
	};
		
UselessNavy.DB.Serialize = function(data)
	{
	return uneval(data);
	};

UselessNavy.DB.UnSerialize = function(data)
	{
	return eval(data);
	};
	
UselessNavy.DB.Load_Options = function()
	{
	this.Options = this.UnSerialize(GM_getValue(this.Prefix+'.Opt', false)) || {};
	
	if (this.Options.Prefs == undefined)					 this.Options.Prefs = {};
	if (this.Options.Prefs.ExpandPayloads == undefined)		 this.Options.Prefs.ExpandPayloads = false;
	};
	
UselessNavy.DB.Save_Options = function()
	{
	GM_setValue(this.Prefix+'.Opt', this.Serialize(this.Options));
	};
	
UselessNavy.Ikariam =
	{
	_Parent:		 null,
	_View:			 null,
	_Host:			 null,
	_Server:		 null,
	_Language:		 null,
	_Version:		 null,
	_IsV031x:		 null,
	_IsV032x:		 null
	};
	
UselessNavy.Ikariam.Init = function(parent)
	{
	this._Parent = parent;
	};
	
UselessNavy.Ikariam.View = function()
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
	
UselessNavy.Ikariam.Host = function()
	{
	if (this._Host == null)
		{
		this._Host = '';
		
		this._Host = document.location.host;
		}
		
	return this._Host;
	};
	
UselessNavy.Ikariam.Version = function()
	{
	// Requires: DOM
	if (this._Version == null)
		{
		this._Version = '';
		
		this._Version = this._Parent.DOM.Get_First_Node_TextContent("//div[@id='GF_toolbar']//li[@class='version']//span[@class='textLabel']",'');
		}
	
	return this._Version;
	};
	
// NB: return true if higher than 0.3.2
UselessNavy.Ikariam.Is_Version_032x = function()
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
	
UselessNavy.Ikariam.FleetMovement_Object = function()
	{
	var FleetMovement			 = new Object;
	
	//FleetMovement.own				 = false;
	//FleetMovement.hostile			 = false;
	
	FleetMovement.time			 = 0;
	
	//FleetMovement.summary			 = '';
	//FleetMovement.hasFleet			 = false;
	//FleetMovement.hasGoods			 = false;
	//FleetMovement.hasArmy			 = false;
	
	//FleetMovement.oCityId			 = 0;
	//FleetMovement.oCityName			 = '';
	//FleetMovement.oPlayerName			 = '';
	//FleetMovement.toLeft				 = false;
	//FleetMovement.mission			 = '';
	// Values: deployarmy, deployfleet, plunder, blockade, defend, defend_port, trade, transport, occupy
	//FleetMovement.toRight			 = false;
	//FleetMovement.tCityId			 = 0;
	//FleetMovement.tCityName			 = '';
	//FleetMovement.tPlayerName			 = '';
	
	//FleetMovement.hasAction			 = false;
	
	return FleetMovement;
	};
	
UselessNavy.Ikariam.Fetch_FleetMovements = function(database)
	{
	// Require: DOM, Str
	var StartTime = new Date().getTime();
	this._Parent.Log.Add('Start fetch movements...');
	if (database == undefined) database = {};
	
	function grabCityID(rootElt)
		{
		var resID = 0;
		var alinks = rootElt.getElementsByTagName("a");
		for (var k=0; k < alinks.length; k++)
			{
			var resReg = /[\?&]{1}cityId=([0-9]+)&?/i.exec(alinks[k].href);
			if (resReg != null)
				{
				resID = parseInt(resReg[1]);
				break;
				}
			}
		
		return resID;
		}

	var resMi = this._Parent.DOM.Get_Nodes("//div[@id='fleetMovements']//table[contains(@class, 'locationEvents')]/tbody/tr/td/img[contains(@src, 'mission_')]");
	if (resMi.snapshotLength > 0)
		{
		this._Parent.Log.Add('Found '+resMi.snapshotLength+' fleets');
		
		// heures
		var mTimers = {};
		var scripts = document.getElementsByTagName("script");
		for (var j = 0; j < scripts.length; j++)
			{
			// search getCountdown
			var nScript = scripts[j];
			var sCode = nScript.innerHTML;
			if (sCode.indexOf('getCountdown') >= 0)
				{
				var aCodeLines = sCode.split(';');
				for (var i=0; i < aCodeLines.length-1; i++)
					{
					if (aCodeLines[i].indexOf('getCountdown') >= 0)
						{
						var sValues = aCodeLines[i].substring(aCodeLines[i].indexOf('{')+1,aCodeLines[i].indexOf('}'));
						var sParts = sValues.split(',');
						
						var sPart0 = sParts[0].split(':');
						var enddate = 1000*parseInt(this._Parent.Str.Trim(sPart0[1]));
						
						var sPart1 = sParts[1].split(':');
						var currentdate = 1000*parseInt(this._Parent.Str.Trim(sPart1[1]));
						
						var sID = sParts[2].substring(sParts[2].indexOf('"')+1,sParts[2].indexOf('"',sParts[2].indexOf('"')+2));
						
						mTimers[sID] = StartTime + (enddate - currentdate);
						}
					}
				}
			}
		
		for (var i=0; i < resMi.snapshotLength; i++)
			{
			var tr = resMi.snapshotItem(i).parentNode.parentNode;
			var tds = tr.getElementsByTagName("td");
				
			var fleetId = tds[1].id;
			
			if (fleetId != '')
				{
				if (database[fleetId] == undefined)
					{
					database[fleetId] = new this.FleetMovement_Object();
					}
					
				database[fleetId].own			 = this._Parent.DOM.Has_ClassName(tr,'own');
				database[fleetId].hostile		 = this._Parent.DOM.Has_ClassName(tr,'hostile');
				
				if (mTimers[fleetId] != undefined)
					{
					database[fleetId].time			 = mTimers[fleetId];
					}
				else 
					{
					database[fleetId].time			 = mTimers['nexEventETA1'];
					}
				
				database[fleetId].summary = this._Parent.Str.Trim(tds[2].childNodes[0].textContent);
				var payload = tds[2].innerHTML;
				
				// Has fleet ?
				var hasFleet = false;
				if (payload.indexOf('ship_ram') > 0)
					{
					hasFleet = true;
					}
				else if (payload.indexOf('ship_ballista') > 0)
					{
					hasFleet = true;
					}
				else if (payload.indexOf('ship_flamethrower') > 0)
					{
					hasFleet = true;
					}
				else if (payload.indexOf('ship_catapult') > 0)
					{
					hasFleet = true;
					}
				else if (payload.indexOf('ship_steamboat') > 0)
					{
					hasFleet = true;
					}
				else if (payload.indexOf('ship_mortar') > 0)
					{
					hasFleet = true;
					}
				else if (payload.indexOf('ship_submarine') > 0)
					{
					hasFleet = true;
					}
				if (hasFleet == true)
					{
					database[fleetId].hasFleet = true;
					}
				
				// Has Goods ?
				var hasGoods = false;
				if (hasFleet == true)
					{
					// Impossible
					}
				else if (payload.indexOf('wood') > 0)
					{
					hasGoods = true;
					}
				else if (payload.indexOf('wine') > 0)
					{
					hasGoods = true;
					}
				else if (payload.indexOf('marble') > 0)
					{
					hasGoods = true;
					}
				else if (payload.indexOf('glass') > 0)
					{
					hasGoods = true;
					}
				else if (payload.indexOf('sulfur') > 0)
					{
					hasGoods = true;
					}
				if (hasGoods == true)
					{
					database[fleetId].hasGoods = true;
					}
				
				// Has Army ?
				var hasArmy = false;
				if (hasFleet == true)
					{
					// Impossible
					}
				else if (payload.indexOf('slinger') > 0)
					{
					hasArmy = true;
					}
				else if (payload.indexOf('swordsman') > 0)
					{
					hasArmy = true;
					}
				else if (payload.indexOf('phalanx') > 0)
					{
					hasArmy = true;
					}
				else if (payload.indexOf('spearman') > 0)
					{
					hasArmy = true;
					}
				else if (payload.indexOf('archer') > 0)
					{
					hasArmy = true;
					}
				else if (payload.indexOf('marksman') > 0)
					{
					hasArmy = true;
					}
				else if (payload.indexOf('gyrocopter') > 0)
					{
					hasArmy = true;
					}
				else if (payload.indexOf('steamgiant') > 0)
					{
					hasArmy = true;
					}
				else if (payload.indexOf('bombardier') > 0)
					{
					hasArmy = true;
					}
				else if (payload.indexOf('ram') > 0)
					{
					hasArmy = true;
					}
				else if (payload.indexOf('catapult') > 0)
					{
					hasArmy = true;
					}
				else if (payload.indexOf('mortar') > 0)
					{
					hasArmy = true;
					}
				else if (payload.indexOf('medic') > 0)
					{
					hasArmy = true;
					}
				else if (payload.indexOf('cook') > 0)
					{
					hasArmy = true;
					}
				if (hasArmy == true)
					{
					database[fleetId].hasArmy = true;
					}
				
				database[fleetId].oCityId = grabCityID(tds[3]);
				database[fleetId].oCityName = this._Parent.Str.Trim(tds[3].childNodes[0].textContent);
				var oPlayerName = this._Parent.Str.Trim(tds[3].childNodes[1].textContent);
				oPlayerName = oPlayerName.substring(1,oPlayerName.length-1);
				database[fleetId].oPlayerName = oPlayerName;
				
				database[fleetId].tPlayerName = tPlayerName;
				database[fleetId].toLeft = (tds[4].innerHTML != '') ? true : false;
				database[fleetId].mission = /mission_([_a-z]+)\.[a-z]+/i.exec(resMi.snapshotItem(i).src)[1];
				database[fleetId].toRight = (tds[6].innerHTML != '') ? true : false;
				
				database[fleetId].tCityId = grabCityID(tds[7]);
				database[fleetId].tCityName = this._Parent.Str.Trim(tds[7].childNodes[0].textContent);
				var tPlayerName = this._Parent.Str.Trim(tds[7].childNodes[1].textContent);
				tPlayerName = tPlayerName.substring(1,tPlayerName.length-1);
				database[fleetId].tPlayerName = tPlayerName;
				
				database[fleetId].hasAction = (tds[8].innerHTML != '') ? true : false;
				
				this._Parent.Log.Add('Detect fleet['+fleetId+']: oCityId='+database[fleetId].oCityId+', tCityId['+database[fleetId].tCityId+']: '+database[fleetId].tCityName+' ('+database[fleetId].tPlayerName+'), time='+database[fleetId].time+', mission='+database[fleetId].mission);
				}
			}
		}
	
	return database;
	};
	
UselessNavy.Ikariam.MerchantNavyBox_Object = function()
	{
	var MerchantNavyBox				 = new Object;
	
	MerchantNavyBox.title			 = '';
	
	
	return MerchantNavyBox;
	};
	
UselessNavy.Ikariam.Fetch_MerchantNavy_Boxes = function(boxesDB)
	{
	this._Parent.Log.Add('Start fetch MerchantNavy boxes...');
	if (boxesDB == undefined) boxesDB = {};
	
	var contentBoxes = this._Parent.DOM.Get_Nodes("//div[@id='mainview']/div[contains(@class, 'contentBox')]");
	if (contentBoxes.snapshotLength > 0)
		{
		this._Parent.Log.Add('Found '+contentBoxes.snapshotLength+' contentBox');
		
		for (var i=0; i < contentBoxes.snapshotLength; i++)
			{
			var contentBox = contentBoxes.snapshotItem(i);
			var boxId = contentBox.id;
			if (boxId == '')
				{
				boxId = 'contentBox'+(i+1);
				contentBox.id = boxId;
				}
			
			if (boxesDB[boxId] == undefined)
				{
				boxesDB[boxId] = new this.MerchantNavyBox_Object();
				}
				
			var h3s = contentBox.getElementsByTagName("h3");
			boxesDB[boxId].title = h3s[0].textContent;
			
			var Missions = this._Parent.DOM.Get_Nodes("//div[@id='mainview']/div[@id='"+boxId+"']//td[contains(@class, 'mission')]");
			boxesDB[boxId].length = Missions.snapshotLength;
			
			this._Parent.Log.Add('contentBox['+boxId+']: '+boxesDB[boxId].title+', '+boxesDB[boxId].length+' missions');
			}
		}
	
	return boxesDB;
	};

UselessNavy.Handlers =
	{
	_Parent: null
	};
	
UselessNavy.Handlers.Init = function(parent)
	{
	this._Parent = parent;
	};
	
UselessNavy.Handlers.Attach_MerchantNavy_Tabs_Events = function()
	{
	var self = this;
	
	for (boxId in this._Parent.DB.MerchantBoxes)
		{
		var liTab = document.getElementById("unTab"+boxId);
		liTab.addEventListener('click', function(e) { self.MerchantNavy_Tab_Click_Event(e); }, false);
		}
	};

UselessNavy.Handlers.MerchantNavy_Tab_Click_Event = function(e)
	{
	if (!e) { e = window.event; }
	var obj = e.srcElement ? e.srcElement : e.target;
	while (obj.tagName != 'A')
		{
		obj = obj.parentNode;
		}
	var button = obj;
	var boxId = button.getAttribute('boxid');
	
	this._Parent.Select_MerchantNavy_Tab(boxId);
	};
		
UselessNavy.DOM =
	{
	_Parent: null,
	};

UselessNavy.DOM.Init = function(parent)
	{
	this._Parent = parent;
	};

UselessNavy.DOM.Get_Nodes = function(query)
	{
	//return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	return document.evaluate(query, document, null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	};
	
UselessNavy.DOM.Get_First_Node = function(path)
	{
	var value = this.Get_Nodes(path);
	if (value.snapshotLength >= 1)
		{
		return value.snapshotItem(0);
		}
	return null;
	};
	
UselessNavy.DOM.Get_First_Node_TextContent = function(path, defaultValue)
	{
	var value = this.Get_First_Node(path);
	if (value != null)
		{
		return value.textContent;
		}
	else return defaultValue;
	};
	
UselessNavy.DOM.Has_ClassName = function(oElm, strClassName)
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

UselessNavy.DOM.Add_ClassName = function(oElm, strClassName)
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
	
UselessNavy.DOM.Remove_ClassName = function(oElm, strClassName)
	{
	/*
	Copyright Robert Nyman, http://www.robertnyman.com
	Free to use if this text is included
	*/
	var oClassToRemove = new RegExp((strClassName + "\s?"), "i");
	oElm.className = oElm.className.replace(oClassToRemove, "").replace(/^\s?|\s?$/g, "");
	};
	
UselessNavy.Log =
	{
	_Parent: null,
	_Enabled: false
	};
	
UselessNavy.Log.Init = function(parent)
	{
	this._Parent = parent;
	};
	
UselessNavy.Log.Add = function(msg)
	{
	if (this._Enabled == true)
		{
		GM_log(msg);
		}
	};

UselessNavy.Updater =
	{
	_Parent:			 null,
	_ScriptURL:			 '',
	_availableVersion:	 0
	};
	
UselessNavy.Updater.Init = function(parent)
	{
	this._Parent = parent;
	};
	
// CallBackFct function receive available version number (or null value if failed) as argument
UselessNavy.Updater.Check = function(ScriptURL, CallBackFct)
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
	
UselessNavy.Updater._ParseScript = function(response, CallBackFct)
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
	
/* Lib for strings processes */
UselessNavy.Str =
	{
	_Parent: null
	};
	
UselessNavy.Str.Init = function(parent)
	{
	this._Parent = parent;
	};
	
UselessNavy.Str.Trim = function(str)
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
	
UselessNavy.Str.Trim_Accodances = function(str)
	{
	str = str.replace(/\[.+\]/gi, "");
	
	return str;
	};
/*
v1 & v2 as "v.00.00.00 0000"

return 0 if v2 = v1
	 1 if v2 > v1
	-1 if v2 < v1
*/
UselessNavy.Str.Compare_Versions = function(v1, v2)
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
	
UselessNavy.Init();