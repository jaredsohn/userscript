// coding: utf-8
// ==UserScript==
// @name		Ikariam x500 Payloads
// @version	23
// @author		oliezekat
// @namespace	x500-payloads.ikariam
// @description	Add buttons on views where you need to set resources payload.
// @include	http://s*.ikariam.*/*
// @include	http://s*.*.ikariam.*/*
// @exclude	http://support.ikariam.*/*
// @exclude	http://board.*.ikariam.*/*
// ==/UserScript==

if (!x500Payloads) var x500Payloads = {};

x500Payloads =
	{
	/* Requires modules */
	Log:			 {},
	DOM:			 {},
	Ikariam:		 {},
	DB:				 {},
	Updater:		 {},
	
	StartTime:		 0,
	LogEnabled:		 false,
	View:			 '',
	EnhancedBy:		 '',
	
	/* Script metas */
	ScriptName:		 '500x Payloads',
	Version:		 23,
	HomePage:		 '',
	ScriptURL:		 '',
	UserScriptsID:	 95243
	};

x500Payloads.Init = function()
	{
	this.StartTime		 = new Date().getTime();
	this.HomePage		 = 'http://userscripts.org/scripts/show/'+this.UserScriptsID;
	this.ScriptURL		 = 'http://userscripts.org/scripts/source/'+this.UserScriptsID+'.user.js';

	/* Init Log */
	this.Log.Init(this);
	this.Log._Enabled = this.LogEnabled;
	this.Log.Add('Start...');
	
	this.DOM.Init(this);
	this.Ikariam.Init(this);
	this.DB.Init(this);
	this.DB.Load_Options();
	this.Updater.Init(this);
	
	this.EnhancedBy = 'Enhanced by <a target="_blank" href="'+this.HomePage+'"><b>'+this.ScriptName+'</b></a> (v. <i>'+this.Version+'</i>).';
	if (this.DB.Options['AvailableVersion'] > this.Version)
		this.EnhancedBy += ' <a href="'+this.ScriptURL+'?version='+this.DB.Options['AvailableVersion']+'.user.js'+'" style="color: red;"><b>NEW RELEASE V. <i>'+this.DB.Options['AvailableVersion']+'</i> AVAILABLE !</b></a>';

	if (this.Ikariam.View() =='transport')
		{
		this.View_Transport();
		}
	else if (this.Ikariam.View() =='branchOffice')
		{
		this.View_BranchOffice();
		}
	else if (this.Ikariam.View() =='takeOffer')
		{
		this.View_TakeOffer();
		}
	else if (this.Ikariam.View() =='colonize')
		{
		this.View_Colonize();
		}
	else if (this.Ikariam.View() =='resource')
		{
		this.View_Resource();
		}
	else if (this.Ikariam.View() =='tradegood')
		{
		this.View_Resource();
		}
		
	this.Log.Add('End !');
	};
	
x500Payloads.CheckScriptUpdate = function()
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
	
x500Payloads._CompareScriptUpdate = function(availableVersion)
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
	
x500Payloads.View_Transport = function()
	{
	var nodes = x500Payloads.DOM.Get_Nodes("//ul[@class='resourceAssign']/li");
	if (nodes != null)
		{
		// define CSS 
		var default_style = <><![CDATA[
		#mainview ul.resourceAssign { width: 660px; }
		#container .resourceAssign li { padding:0px; background-position:0 center;}
		#container .resourceAssign .sliderinput { margin:0 0 0 30px; width:400px;}
		#container .resourceAssign input.textfield { margin-top: 2px; position:relative;top:-26px;margin-left:-5px;}
		input.x500Payloads,
		input.x500Payloads:active {margin: 0px; padding: 1px 3px; margin-top: 3px; font-size: 10px; }
		input.x500Payloads { position: absolute; top: 3px;}
		]]></>.toXMLString();
		GM_addStyle(default_style);
		
		// Add buttons
		for (var i=0; i < nodes.snapshotLength; i++)
			{
			var li = nodes.snapshotItem(i);
			var Good = li.className;
			
			// create button
			var input = document.createElement('input');
			input.type = "button";
			input.value = "+5k";
			input.title = "Add 5000 goods";
			input.style.left = '616px';
			input.setAttribute("class", "button x500Payloads");
			input.setAttribute("textfield", "textfield_"+Good);
			input.setAttribute("amount", 5000);
			input.addEventListener('click', x500Payloads.Add_500_Event, false);
			li.appendChild(input);
			
			// create button
			var input = document.createElement('input');
			input.type = "button";
			input.value = "+1k";
			input.title = "Add 1000 goods";
			input.style.left = '578px';
			input.setAttribute("class", "button x500Payloads");
			input.setAttribute("textfield", "textfield_"+Good);
			input.setAttribute("amount", 1000);
			input.addEventListener('click', x500Payloads.Add_500_Event, false);
			li.appendChild(input);
			
			// create button
			var input = document.createElement('input');
			input.type = "button";
			input.value = "+500";
			input.title = "Add 500 goods";
			input.style.left = '534px';
			input.setAttribute("class", "button x500Payloads");
			input.setAttribute("textfield", "textfield_"+Good);
			input.setAttribute("amount", 500);
			input.addEventListener('click', x500Payloads.Add_500_Event, false);
			li.appendChild(input);
			
			// create button
			var input = document.createElement('input');
			input.type = "button";
			input.value = "–";
			input.title = "Remove 500 goods";
			input.style.left = '508px';
			input.setAttribute("class", "button x500Payloads");
			input.setAttribute("textfield", "textfield_"+Good);
			input.setAttribute("amount", -500);
			input.addEventListener('click', x500Payloads.Add_500_Event, false);
			li.appendChild(input);
			
			var maxId = 'slider_'+Good+'_max';
			var maxLink = document.getElementById(maxId);
			maxLink.setAttribute("textfield", "textfield_"+Good);
			maxLink.addEventListener('click', x500Payloads.Max_500_Event, false);
			}
		}
		
	// Add footer
	x500Payloads.Insert_Footer();
	
	this.CheckScriptUpdate();
	};
			
x500Payloads.View_TakeOffer = function()
	{
	var nodes = x500Payloads.DOM.Get_Nodes("//div[@id='mainview']//td[@class='input']/input");
	if (nodes != null)
		{
		// define CSS 
		var default_style = <><![CDATA[
		input.x500Payloads,
		input.x500Payloads:active { margin: 0px; padding: 1px 4px; margin-left: 3px; font-size: 10px; }
		]]></>.toXMLString();
		GM_addStyle(default_style);
		
		// Add buttons
		for (var i=0; i < nodes.snapshotLength; i++)
			{
			var textfield = nodes.snapshotItem(i);
			var textfieldId = textfield.id;
			var td = textfield.parentNode;
			
			// create button
			var input = document.createElement('input');
			input.type = "button";
			input.value = "+5k";
			input.title = "Add 5000 goods";
			input.setAttribute("class", "button x500Payloads");
			input.setAttribute("textfield", textfieldId);
			input.setAttribute("amount", 5000);
			input.addEventListener('click', x500Payloads.Add_500_Event, false);
			td.insertBefore(input, textfield.nextSibling);
			
			// create button
			var input = document.createElement('input');
			input.type = "button";
			input.value = "+1k";
			input.title = "Add 1000 goods";
			input.setAttribute("class", "button x500Payloads");
			input.setAttribute("textfield", textfieldId);
			input.setAttribute("amount", 1000);
			input.addEventListener('click', x500Payloads.Add_500_Event, false);
			td.insertBefore(input, textfield.nextSibling);
			
			// create button
			var input = document.createElement('input');
			input.type = "button";
			input.value = "+500";
			input.title = "Add 500 goods";
			input.setAttribute("class", "button x500Payloads");
			input.setAttribute("textfield", textfieldId);
			input.setAttribute("amount", 500);
			input.addEventListener('click', x500Payloads.Add_500_Event, false);
			td.insertBefore(input, textfield.nextSibling);
			
			// create button
			var input = document.createElement('input');
			input.type = "button";
			input.value = "–";
			input.title = "Remove 500 goods";
			input.setAttribute("class", "button x500Payloads");
			input.setAttribute("textfield", textfieldId);
			input.setAttribute("amount", -500);
			input.addEventListener('click', x500Payloads.Add_500_Event, false);
			td.insertBefore(input, textfield.nextSibling);
			
			var maxId = textfieldId.replace('textfield_','')+'Max';
			var maxLink = document.getElementById(maxId);
			maxLink.setAttribute("textfield", textfieldId);
			maxLink.addEventListener('click', x500Payloads.Max_500_Event, false);
			}
		}
		
	// Add footer
	x500Payloads.Insert_Footer();
	
	this.CheckScriptUpdate();
	};
	
x500Payloads.Set_BranchOffice_Style = function()
	{
	var default_style = <><![CDATA[
	#branchOffice #container #mainview table.tablekontor td.select { padding-left:0px; width: auto; }
	input.x500Payloads,
	input.x500Payloads:active { margin: 0px; padding: 1px 4px; margin-left: 3px; font-size: 10px; }
	]]></>.toXMLString();
	
	GM_addStyle(default_style);
	};
	
x500Payloads.View_BranchOffice = function()
	{
	var nodes = this.DOM.Get_Nodes("//table[@class='tablekontor']//td/input");
	if (nodes != null)
		{
		var self = this;
		
		this.Set_BranchOffice_Style();
		
		// Add buttons to increase or decrease payload
		for (var i=0; i < nodes.snapshotLength; i=i+2)
			{
			var textfield = nodes.snapshotItem(i);
			var td = textfield.parentNode;
			
			// create button
			var input = document.createElement('input');
			input.type = "button";
			input.value = "+5k";
			input.title = "Add 5000 goods";
			input.setAttribute("class", "button x500Payloads");
			input.setAttribute("textfield", textfield.id);
			input.setAttribute("amount", 5000);
			input.addEventListener('click', x500Payloads.Add_500_Event, false);
			td.insertBefore(input, textfield.nextSibling);
			
			// create button
			var input = document.createElement('input');
			input.type = "button";
			input.value = "+1k";
			input.title = "Add 1000 goods";
			input.setAttribute("class", "button x500Payloads");
			input.setAttribute("textfield", textfield.id);
			input.setAttribute("amount", 1000);
			input.addEventListener('click', x500Payloads.Add_500_Event, false);
			td.insertBefore(input, textfield.nextSibling);
			
			// create button
			var input = document.createElement('input');
			input.type = "button";
			input.value = "+500";
			input.title = "Add 500 goods";
			input.setAttribute("class", "button x500Payloads");
			input.setAttribute("textfield", textfield.id);
			input.setAttribute("amount", 500);
			input.addEventListener('click', x500Payloads.Add_500_Event, false);
			td.insertBefore(input, textfield.nextSibling);
			
			// create button
			var input = document.createElement('input');
			input.type = "button";
			input.value = "–";
			input.title = "Remove 500 goods";
			input.setAttribute("class", "button x500Payloads");
			input.setAttribute("textfield", textfield.id);
			input.setAttribute("amount", -500);
			input.addEventListener('click', x500Payloads.Add_500_Event, false);
			td.insertBefore(input, textfield.nextSibling);
			}
			
		// Add buttons to increase or decrease prices
		for (var i=1; i < nodes.snapshotLength; i=i+2)
			{
			var textfield = nodes.snapshotItem(i);
			var td = textfield.parentNode;
			
			var input = document.createElement('input');
			input.type = "button";
			input.value = "+5";
			input.title = "Add 5 gold";
			input.setAttribute("class", "button x500Payloads");
			input.setAttribute("textfield", textfield.id);
			input.setAttribute("amount", 5);
			input.setAttribute("rounded", 1);
			input.addEventListener('click', x500Payloads.Add_500_Event, false);
			td.insertBefore(input, textfield.nextSibling);
			
			var input = document.createElement('input');
			input.type = "button";
			input.value = "+";
			input.title = "Add 1 gold";
			input.setAttribute("class", "button x500Payloads");
			input.setAttribute("textfield", textfield.id);
			input.setAttribute("amount", 1);
			input.setAttribute("rounded", 1);
			input.addEventListener('click', x500Payloads.Add_500_Event, false);
			td.insertBefore(input, textfield.nextSibling);
			
			var input = document.createElement('input');
			input.type = "button";
			input.value = "–";
			input.title = "Remove 1 gold";
			input.setAttribute("class", "button x500Payloads");
			input.setAttribute("textfield", textfield.id);
			input.setAttribute("amount", -1);
			input.setAttribute("rounded", 1);
			input.addEventListener('click', x500Payloads.Add_500_Event, false);
			td.insertBefore(input, textfield.nextSibling);
			}
		}
		
	// Add footer
	x500Payloads.Insert_Footer();
	
	this.CheckScriptUpdate();
	};
	
x500Payloads.Set_Resource_Style = function()
	{
	var default_style = <><![CDATA[
	input.x500Payloads,
	input.x500Payloads:active { margin: 0px; padding: 1px 4px; margin-left: 3px; font-size: 10px; }
	]]></>.toXMLString();
	
	GM_addStyle(default_style);
	};
	
x500Payloads.View_Resource = function()
	{
	this.Set_Resource_Style();
	
	var donate = document.getElementById("donate");
	if (donate != null)
		{
		var donateWood = document.getElementById("donateWood");

		// create button
		var input = document.createElement('input');
		input.type = "button";
		input.value = "+5k";
		input.title = "Add 5000 woods";
		input.setAttribute("class", "button x500Payloads");
		input.setAttribute("textfield", 'donateWood');
		input.setAttribute("amount", 5000);
		input.addEventListener('click', x500Payloads.Add_500_Event, false);
		donate.insertBefore(input, donateWood.nextSibling);

		// create button
		var input = document.createElement('input');
		input.type = "button";
		input.value = "+1k";
		input.title = "Add 1000 woods";
		input.setAttribute("class", "button x500Payloads");
		input.setAttribute("textfield", 'donateWood');
		input.setAttribute("amount", 1000);
		input.addEventListener('click', x500Payloads.Add_500_Event, false);
		donate.insertBefore(input, donateWood.nextSibling);

		// create button
		var input = document.createElement('input');
		input.type = "button";
		input.value = "+500";
		input.title = "Add 500 woods";
		input.setAttribute("class", "button x500Payloads");
		input.setAttribute("textfield", 'donateWood');
		input.setAttribute("amount", 500);
		input.addEventListener('click', x500Payloads.Add_500_Event, false);
		donate.insertBefore(input, donateWood.nextSibling);

		// create button
		var input = document.createElement('input');
		input.type = "button";
		input.value = "–";
		input.title = "Remove 500 woods";
		input.setAttribute("class", "button x500Payloads");
		input.setAttribute("textfield", 'donateWood');
		input.setAttribute("amount", -500);
		input.addEventListener('click', x500Payloads.Add_500_Event, false);
		donate.insertBefore(input, donateWood.nextSibling);
				
		var br = document.createElement('br');
		donate.insertBefore(br, donateWood.nextSibling);
		}
	
	// Add footer
	x500Payloads.Insert_Footer();
	
	this.CheckScriptUpdate();
	};
	
x500Payloads.Max_500_Event = function(e)
	{
	if (!e) { e = window.event; }
	var obj = e.srcElement ? e.srcElement : e.target;
	while (obj.tagName != 'A')
		{
		obj = obj.parentNode;
		}
	var button = obj;
	
	// unfocus button
	button.blur();
	
	var TextfieldID = button.getAttribute('textfield');
	
	var Amount = 0;
	if (button.hasAttribute('amount'))
		{
		Amount = parseInt(button.getAttribute('amount'));
		}
	var Rounded = 500;
	if (button.hasAttribute('rounded'))
		{
		Rounded = parseInt(button.getAttribute('rounded'));
		}
	
	var PrevMax = 0;
	if (button.hasAttribute('prevmax'))
		{
		PrevMax = parseInt(button.getAttribute('prevmax'));
		}
	
	var input = document.getElementById(TextfieldID);
	if (input.value == '') input.value = 0;
	
	// Increase value or complete to x500 value
	var origValue = parseInt(input.value);
	if ((Amount > 0) && (origValue < Amount)) origValue = Amount;
	
	var newValue = origValue;
	if (newValue < Rounded)
		{
		// Do nothing
		}
	else
		{
		newValue = Math.floor(newValue/Rounded)*Rounded;
		}
	
	// Tip to allow double-click
	if ((PrevMax == 0) || (PrevMax != newValue))
		{
		input.value = newValue;
		button.setAttribute("PrevMax", newValue);
		}
	else
		{
		input.value = origValue;
		button.setAttribute("PrevMax", origValue);
		}
	
	// fire event
	var evt = document.createEvent("KeyEvents");
	evt.initKeyEvent('keyup', true, true, window, false, false, false, false, 13, 0);
	input.dispatchEvent(evt);
	}
	
x500Payloads.Add_500_Event = function(e)
	{
	if (!e) { e = window.event; }
	var obj = e.srcElement ? e.srcElement : e.target;
	while (obj.tagName != 'INPUT')
		{
		obj = obj.parentNode;
		}
	var button = obj;
	
	// unfocus button
	button.blur();
	
	var TextfieldID = button.getAttribute('textfield');
	
	var Amount = 500;
	if (button.hasAttribute('amount'))
		{
		Amount = parseInt(button.getAttribute('amount'));
		}
	var Rounded = 500;
	if (button.hasAttribute('rounded'))
		{
		Rounded = parseInt(button.getAttribute('rounded'));
		}
	
	var input = document.getElementById(TextfieldID);
	if (input.value == '') input.value = 0;
	
	// Increase value or complete to x500 value
	var newValue = parseInt(input.value);
	if (Amount >= 0)
		{
		newValue = Math.floor(newValue/Rounded)*Rounded + Amount;
		}
	else
		{
		newValue = Math.floor(newValue/Rounded)*Rounded;
		if (newValue == parseInt(input.value)) newValue = newValue + Amount;
		}
	if (newValue <= 0) newValue = 0;
	input.value = newValue;
	
	// fire event
	var evt = document.createEvent("KeyboardEvent");
	if (evt.initKeyboardEvent)
		{
		evt.initKeyboardEvent('keyup', true, true, window, false, false, false, false, 13, 0);
		}
	else
		{
		evt.initKeyEvent('keyup', true, true, window, false, false, false, false, 13, 0);
		}
	
	input.dispatchEvent(evt);
	};
	
x500Payloads.Insert_Footer = function()
	{
	var div = document.createElement('div');
	div.id = 'x500PayloadsFooter';
	div.setAttribute("style", "margin-bottom: 10px; text-align: right;");
	div.innerHTML = x500Payloads.EnhancedBy;
	var mainview = document.getElementById("mainview");
	mainview.appendChild(div);
	};
	
x500Payloads.View_Colonize = function()
	{
	var nodes = x500Payloads.DOM.Get_Nodes("//ul[@class='resourceAssign']/li");
	if (nodes != null)
		{
		// define CSS 
		var default_style = <><![CDATA[
		#mainview ul.resourceAssign { width: 620px; }
		#container .resourceAssign input.textfield { top: 9px; }
		input.x500Payloads,
		input.x500Payloads:active {margin: 0px; padding: 1px 3px; margin-top: 3px; font-size: 10px; }
		input.x500Payloads { position: absolute; top: 6px; }
		#container .resourceAssign .summary {left: 540px !important;}
		]]></>.toXMLString();
		GM_addStyle(default_style);
		
		// Add buttons
		for (var i=0; i < nodes.snapshotLength; i++)
			{
			var li = nodes.snapshotItem(i);
			var Good = li.className;
			if ((Good == undefined) || (Good == '')) continue;
			
			// Fix for colonize
			if (Good == 'wood') Good = 'resource';
			if (Good == 'glass') Good = 'crystal';
			
			// create button
			var input = document.createElement('input');
			input.type = "button";
			input.value = "+1k";
			input.title = "Add 1000 goods";
			input.style.left = '578px';
			input.setAttribute("class", "button x500Payloads");
			input.setAttribute("textfield", "textfield_"+Good);
			input.setAttribute("amount", 1000);
			input.addEventListener('click', x500Payloads.Add_500_Event, false);
			li.appendChild(input);
			
			// create button
			var input = document.createElement('input');
			input.type = "button";
			input.value = "+500";
			input.title = "Add 500 goods";
			input.style.left = '534px';
			input.setAttribute("class", "button x500Payloads");
			input.setAttribute("textfield", "textfield_"+Good);
			input.setAttribute("amount", 500);
			input.addEventListener('click', x500Payloads.Add_500_Event, false);
			li.appendChild(input);
			
			// create button
			var input = document.createElement('input');
			input.type = "button";
			input.value = "–";
			input.title = "Remove 500 goods";
			input.style.left = '508px';
			input.setAttribute("class", "button x500Payloads");
			input.setAttribute("textfield", "textfield_"+Good);
			input.setAttribute("amount", -500);
			input.addEventListener('click', x500Payloads.Add_500_Event, false);
			li.appendChild(input);
			}
		}
		
	// Add footer
	x500Payloads.Insert_Footer();
	
	this.CheckScriptUpdate();
	};

x500Payloads.DOM =
	{
	_Parent: null
	};
	
x500Payloads.DOM.Init = function(parent)
	{
	this._Parent = parent;
	};
	
x500Payloads.DOM.Get_Nodes = function(path, root)
	{
	var contextNode = root ? root.evaluate ? root : root.ownerDocument : document;
	return contextNode.evaluate(path, contextNode, null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	};
	
x500Payloads.Log =
	{
	_Parent: null,
	_Enabled: false
	};
	
x500Payloads.Log.Init = function(parent)
	{
	this._Parent = parent;
	};
	
x500Payloads.Log.Add = function(msg)
	{
	if (this._Enabled == true)
		{
		GM_log(msg);
		}
	};

x500Payloads.Updater =
	{
	_Parent:			 null,
	_ScriptURL:			 '',
	_availableVersion:	 0
	};
	
x500Payloads.Updater.Init = function(parent)
	{
	this._Parent = parent;
	};
	
// CallBackFct function receive available version number (or null value if failed) as argument
x500Payloads.Updater.Check = function(ScriptURL, CallBackFct)
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
	
x500Payloads.Updater._ParseScript = function(response, CallBackFct)
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
	
x500Payloads.DB =
	{
	_Parent: null,
	Prefix:				 null,
	Options:			 {}
	};
	
x500Payloads.DB.Init = function(parent, host)
	{
	// Requires: Ikariam
	this._Parent = parent;
	if (host == undefined) host = this._Parent.Ikariam.Host();
	
	var prefix = host;
	prefix = prefix.replace('.ikariam.', '-');
	prefix = prefix.replace('.', '-');
	this.Prefix = prefix;
	};
		
x500Payloads.DB.Serialize = function(data)
	{
	return uneval(data);
	};

x500Payloads.DB.UnSerialize = function(data)
	{
	return eval(data);
	};
	
x500Payloads.DB.Load_Options = function()
	{
	this.Options = this.UnSerialize(GM_getValue(this.Prefix+'.Opt', false)) || {};
	};
	
x500Payloads.DB.Save_Options = function()
	{
	GM_setValue(this.Prefix+'.Opt', this.Serialize(this.Options));
	};
	
x500Payloads.Ikariam =
	{
	_Parent:		 null,
	_View:			 null,
	_Host:			 null
	};
	
x500Payloads.Ikariam.Init = function(parent)
	{
	this._Parent = parent;
	};
	
x500Payloads.Ikariam.Host = function()
	{
	if (this._Host == null)
		{
		this._Host = '';
		
		this._Host = document.location.host;
		}
		
	return this._Host;
	};
	
x500Payloads.Ikariam.View = function()
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
	
x500Payloads.Init();