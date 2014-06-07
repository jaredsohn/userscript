// coding: utf-8
// ==UserScript==
// @name		Empire Board ARexx
// @namespace	empire-board.ikariam
// @version	5
// @author		oliezekat
// @description	DO NOT INSTALL this script which is an API for Ikariam Empire Board add-ons.
// @include	http://s*.ikariam.*/*
// @include	http://s*.*.ikariam.*/*
// @exclude	http://support.ikariam.*/*
// @exclude	http://board.*.ikariam.*/*
// ==/UserScript==

/* Common API for Empire Board Add-ons */

if (!EmpireBoard) var EmpireBoard = { ARexx: null, DOM: null, Ikariam: null };

if (!EmpireBoard.DOM)
	{
	EmpireBoard.DOM =
		{
		_Parent:		 null
		};
	
	EmpireBoard.DOM.Init = function(parent)
		{
		this._Parent = parent;
		};
		
	EmpireBoard.DOM.Get_Nodes = function(path, root)
		{
		var contextNode = root ? root.evaluate ? root : root.ownerDocument : document;
		return contextNode.evaluate(path, contextNode, null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		};
	
	EmpireBoard.DOM.Has_Node = function(path, root)
		{
		var value = this.Get_Nodes(path, root);
		if (value.snapshotLength >= 1)
			{
			return true;
			}
		else
			{
			return false;
			}
		};
		
	EmpireBoard.DOM.Init(EmpireBoard);
	}

if (!EmpireBoard.Ikariam)
	{
	EmpireBoard.Ikariam =
		{
		_Parent:				 null,
		_IsLogged:				 null
		};
	
	EmpireBoard.Ikariam.Init = function(parent)
		{
		this._Parent = parent;
		};
		
	EmpireBoard.Ikariam.Is_Logged = function()
		{
		if (this._IsLogged == null)
			{
			this._IsLogged = this._Parent.DOM.Has_Node("//div[@id='GF_toolbar']//li[contains(@class,'logout')]");
			}
			
		return this._IsLogged;
		};

	EmpireBoard.Ikariam.Insert_Warning = function(message, title)
		{
		var notices = document.getElementById('notices');
		if (notices == null)
			{
			notices = document.createElement('div');
			notices.id = 'notices';
			var mainview = document.getElementById("mainview");
			var buildingDescription = this._Parent.DOM.Get_Nodes("//div[@id='mainview']/div[contains(@class,'buildingDescription')]");
			if (buildingDescription.snapshotLength >= 1)
				{
				mainview.insertBefore(notices, buildingDescription.snapshotItem(0).nextSibling);
				}
			else
				{
				var contentBox = document.createElement('div');
				contentBox.setAttribute("class", "contentBox");
				contentBox.appendChild(notices);
				//mainview.appendChild(contentBox);
				mainview.insertBefore(contentBox, mainview.getElementsByTagName("h1")[0].nextSibling);
				}
			}
		notices.innerHTML = notices.innerHTML+'<div class="warning"><h5>'+title+'</h5><p>'+message+'</p></div>';
		};

	EmpireBoard.Ikariam.Init(EmpireBoard);
	}

if (!EmpireBoard.ARexx)
	{
	// ARexx* is a common component for Empire Board add-ons.
	// (*) Addon Register for Embedded Execution.
	
	EmpireBoard.ARexx =
		{
		_Parent:		 null,
		
		/* ARexx metas */
		ScriptName:		 'Empire Board ARexx',
		Version:		 5,
		HomePage:		 '',
		ScriptURL:		 '',
		UserScriptsID:	 60774
		};
		
	/* Constructor */
		
	EmpireBoard.ARexx.Init = function(parent)
		{
		this._Parent = parent;
		};
		
	/* Public methods */
		
	EmpireBoard.ARexx.RegisterAddOn = function(AddOn)
		{
		if (this._Parent.Ikariam.Is_Logged() == true)
			{
			var EmpireBoardFrame = null;
			var isOK = true;
			
			EmpireBoardFrame = document.getElementById("EmpireBoard");
			if (EmpireBoardFrame == null)
				{
				isOK = false;
				}
			else if (EmpireBoardFrame.hasAttribute('version') == false)
				{
				isOK = false;
				}
			else if (parseInt(EmpireBoardFrame.getAttribute('version')) < AddOn.EmpireBoardRequiredVersion)
				{
				isOK = false;
				}
			
			if (isOK == false)
				{
				// Empire Board not found, not ready, or wrong priority
				this._Parent.Ikariam.Insert_Warning('Require <a href="http://userscripts.org/scripts/show/41051">Ikariam Empire Board</a> version '+AddOn.EmpireBoardRequiredVersion+' (or higher) with highest priority than this add-on.', AddOn.AddOnName);
				return false;
				}
			else if (EmpireBoardFrame.innerHTML == '')
				{
				// Empire Board is probably disabled into some pages
				return false;
				}
			else if (isOK == true)
				{
				AddOn._Parent = this._Parent;
				
				AddOn.ARexxVersion = this.Version;
				
				// Complete Add-On meta
				if ((AddOn.UserScriptsID != undefined) && (AddOn.UserScriptsID != 0))
					{
					if ((AddOn.HomePage == undefined) || (AddOn.HomePage == ''))
						{
						AddOn.HomePage = 'http://userscripts.org/scripts/show/'+AddOn.UserScriptsID;
						}
					}
				
				// Ready to start
				AddOn.Init(this._Parent);
				
				// Register into Empire Board settings
				var EmpireBoardAddons = document.getElementById("EmpireBoardAddons");
				if (EmpireBoardAddons != null)
					{
					var li = document.createElement('li');
					li.setAttribute("arexx", this.Version);
					if ((AddOn.UserScriptsID != undefined) && (AddOn.UserScriptsID != 0))
						{
						li.setAttribute("userscriptsid", AddOn.UserScriptsID);
						}
					
					var AddOnTitle = '';
					if ((AddOn.HomePage != undefined) && (AddOn.HomePage != ''))
						{
						AddOnTitle = '<a href="'+AddOn.HomePage+'" target="_blank">'+AddOn.AddOnName+'</a>';
						}
					else
						{
						AddOnTitle = '<a>'+AddOn.AddOnName+'</a>';
						}
					if ((AddOn.Version != undefined) && (AddOn.Version != '') && (AddOn.Version != 0))
						{
						AddOnTitle += ' (v. <i>'+AddOn.Version+'</i>)';
						li.setAttribute("version", AddOn.Version);
						}
					AddOnTitle += '.';
					li.innerHTML = AddOnTitle;
					
					EmpireBoardAddons.appendChild(li);
					}
				
				return true;
				}
			}
		else
			{
			// User not logged
			return false;
			}
		};

	/* Private methods */
	
	// Deprecated
	EmpireBoard.ARexx.DOM_Get_Nodes = function(query)
		{
		return this._Parent.DOM.Get_Nodes(query);
		};
	
	// Deprecated
	EmpireBoard.ARexx.Ikariam_Insert_Warning = function(message, title)
		{
		return this._Parent.Ikariam.Insert_Warning(message, title);
		};

	// Attach ARexx to EmpireBoard
	EmpireBoard.ARexx.Init(EmpireBoard);
	}