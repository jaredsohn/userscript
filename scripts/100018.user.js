// ==UserScript==
// @name           	Payloads +/-500
// @version	0.1
// @author		snchun
// @namespace     Ikariam Payloads
// @description    Add +/-500
// @include     http://*.ikariam.*/*
// @exclude    http://board.ikariam.*/*
// @exclude    http://*.ikariam.*/*?view=options
// @exclude    http://*.ikariam.*/*?view=highscore
// @exclude    http://*.ikariam.*/pillory.php
// ==/UserScript==

if (!IkaPayloads) var IkaPayloads = {};

IkaPayloads =
	{
	View: '',
	
	EnhancedBy: 'Enhanced by <a target="_blank" href="http://userscripts.org/scripts/show/51384"><b>Ikariam Payloads</b></a>.',

	Init: function()
		{
		IkaPayloads.DOM.Init(this);

		// Fetch view name
		try
			{
			IkaPayloads.View = document.getElementsByTagName("body")[0].id;
			}
		catch (e)
			{
			var url_view = /[\?&]view=([a-zA-Z0-9\-_]+)/.exec(document.URL);
			if (url_view != null) IkaPayloads.View = RegExp.$1;
			}
		if (IkaPayloads.View =='transport')
			{
			IkaPayloads.View_Transport('transport');
			}
		else if (IkaPayloads.View =='branchOffice')
			{
			IkaPayloads.View_BranchOffice();
			}
		else if (IkaPayloads.View =='takeOffer')
			{
			IkaPayloads.View_TakeOffer();
			}
		else if (IkaPayloads.View =='colonize')
			{
			IkaPayloads.View_Transport('colonize');
			}
		},
		
	View_Transport: function(colon)
		{
		var nodes = IkaPayloads.DOM.Get_Nodes("//ul[@class='resourceAssign']/li");
		if (nodes != null)
			{
			// define CSS 
			var default_style = <><![CDATA[
			#mainview ul.resourceAssign { width: 750px; }
			#container .resourceAssign input.textfield { top: -25px; left:400px; }
			input.IkaPayloads1 { position: absolute; top: 0px; left: 520px; margin: 0px; padding: 2px 7px; }
			input.IkaPayloads1:active { padding: 3px 7px 1px 7px; }
			input.IkaPayloads2 { position: absolute; top: 0px; left: 550px; margin: 0px; padding: 2px 5px; }
			input.IkaPayloads2:active { padding: 3px 5px 1px 5px; }
			input.IkaPayloads3 { position: absolute; top: 0px; left: 579px; margin: 0px; padding: 2px 0px; }
			input.IkaPayloads3:active { padding: 3px 0px 1px 0px; }
			input.IkaPayloads4 { position: absolute; top: 0px; left: 612px; margin: 0px; padding: 2px 0px; }
			input.IkaPayloads4:active { padding: 3px 0px 1px 0px; }
			input.IkaPayloads5 { position: absolute; top: 0px; left: 645px; margin: 0px; padding: 2px 0px; }
			input.IkaPayloads5:active { padding: 3px 0px 1px 0px; }
			]]></>.toXMLString();
			GM_addStyle(default_style);
			
			// Add buttons
			for (var i=0; i < nodes.snapshotLength; i++)
				{
				var li = nodes.snapshotItem(i);
				var Good = li.className;
				var Good2 = li.className;
				
				if (colon =='colonize')
					{
					if (Good == 'wood') Good = 'resource';
					if (Good == 'glass') Good = 'crystal';
					if ((i+1) == nodes.snapshotLength) break;
					}
				
				// create button1
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "-";
				input.setAttribute("class", "button IkaPayloads1");
				input.setAttribute("title", "-500 "+Good2);
				input.setAttribute("textfield", "textfield_"+Good);
				input.addEventListener('click', IkaPayloads.Dec_500_Event, false);
				li.appendChild(input);
				// create button2
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+";
				input.setAttribute("class", "button IkaPayloads2");
				input.setAttribute("title", "+500 "+Good2);
				input.setAttribute("textfield", "textfield_"+Good);
				input.addEventListener('click', IkaPayloads.Add_500_Event, false);
				li.appendChild(input);
				// create button3
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+1k";
				input.setAttribute("class", "button IkaPayloads3");
				input.setAttribute("title", "+1000 "+Good2);
				input.setAttribute("textfield", "textfield_"+Good);
				input.addEventListener('click', IkaPayloads.Add_1k_Event, false);
				li.appendChild(input);
				// create button4
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+2k";
				input.setAttribute("class", "button IkaPayloads4");
				input.setAttribute("title", "+2000 "+Good2);
				input.setAttribute("textfield", "textfield_"+Good);
				input.addEventListener('click', IkaPayloads.Add_2k_Event, false);
				li.appendChild(input);
				// create button5
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+5k";
				input.setAttribute("class", "button IkaPayloads5");
				input.setAttribute("title", "+5000 "+Good2);
				input.setAttribute("textfield", "textfield_"+Good);
				input.addEventListener('click', IkaPayloads.Add_5k_Event, false);
				li.appendChild(input);
				}
			}
			
		// Add footer
		IkaPayloads.Insert_Footer();
		},
				
	View_TakeOffer: function()
		{
		var nodes = IkaPayloads.DOM.Get_Nodes("//div[@id='mainview']//td[@class='input']/input");
		if (nodes != null)
			{
			// define CSS 
			var default_style = <><![CDATA[
			input.IkaPayloads1 { margin: 0px; margin-left: 5px; padding: 2px 7px; }
			input.IkaPayloads1:active { padding: 2px 7px; }
			input.IkaPayloads2 { margin: 0px; padding: 2px 5px; }
			input.IkaPayloads2:active { padding: 2px 5px; }
			input.IkaPayloads3 { margin: 0px; padding: 2px 0px; }
			input.IkaPayloads3:active { padding: 2px 0px; }
			input.IkaPayloads4 { margin: 0px; padding: 2px 0px; }
			input.IkaPayloads4:active { padding: 2px 0px; }
			input.IkaPayloads5 { margin: 0px; padding: 2px 0px; }
			input.IkaPayloads5:active { padding: 2px 0px; }
			]]></>.toXMLString();
			GM_addStyle(default_style);
			
			// Add buttons
			for (var i=0; i < nodes.snapshotLength; i++)
				{
				var textfield = nodes.snapshotItem(i);
				var td = textfield.parentNode;
				
				// create button5
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+5k";
				input.setAttribute("class", "button IkaPayloads5");
				input.setAttribute("title", "+5000");
				input.setAttribute("textfield", textfield.id);
				input.addEventListener('click', IkaPayloads.Add_5k_Event, false);
				td.insertBefore(input, textfield.nextSibling);
				// create button4
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+2k";
				input.setAttribute("class", "button IkaPayloads4");
				input.setAttribute("title", "+2000");
				input.setAttribute("textfield", textfield.id);
				input.addEventListener('click', IkaPayloads.Add_2k_Event, false);
				td.insertBefore(input, textfield.nextSibling);
				// create button3
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+1k";
				input.setAttribute("class", "button IkaPayloads3");
				input.setAttribute("title", "+1000");
				input.setAttribute("textfield", textfield.id);
				input.addEventListener('click', IkaPayloads.Add_1k_Event, false);
				td.insertBefore(input, textfield.nextSibling);
				// create button2
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+";
				input.setAttribute("class", "button IkaPayloads2");
				input.setAttribute("title", "+500");
				input.setAttribute("textfield", textfield.id);
				input.addEventListener('click', IkaPayloads.Add_500_Event, false);
				td.insertBefore(input, textfield.nextSibling);
				// create button1
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "-";
				input.setAttribute("class", "button IkaPayloads1");
				input.setAttribute("title", "-500");
				input.setAttribute("textfield", textfield.id);
				input.addEventListener('click', IkaPayloads.Dec_500_Event, false);
				td.insertBefore(input, textfield.nextSibling);
				}
			}
			
		// Add footer
		IkaPayloads.Insert_Footer();
		},
		
	View_BranchOffice: function()
		{
		var nodes = IkaPayloads.DOM.Get_Nodes("//table[@class='tablekontor']//td/input");
		if (nodes != null)
			{
			// define CSS 
			var default_style = <><![CDATA[
			input.IkaPayloads1 { margin: 0px; margin-left: 5px; margin-bottom: 2px; padding: 2px 7px; }
			input.IkaPayloads1:active { padding: 2px 7px; }
			input.IkaPayloads2 { margin: 0px; padding: 2px 5px; }
			input.IkaPayloads2:active { padding: 2px 5px; }
			input.IkaPayloads3 { margin: 0px; padding: 2px 0px; }
			input.IkaPayloads3:active { padding: 2px 0px; }
			input.IkaPayloads4 { margin: 0px; padding: 2px 0px; }
			input.IkaPayloads4:active { padding: 2px 0px; }
			input.IkaPayloads5 { margin: 0px; padding: 2px 0px; }
			input.IkaPayloads5:active { padding: 2px 0px; }
			]]></>.toXMLString();
			GM_addStyle(default_style);
			
			// Add buttons
			for (var i=0; i < nodes.snapshotLength; i=i+2)
				{
				var textfield = nodes.snapshotItem(i);
				var td = textfield.parentNode;
				
				// create button5
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+5k";
				input.setAttribute("class", "button IkaPayloads5");
				input.setAttribute("title", "+5000");
				input.setAttribute("textfield", textfield.id);
				input.addEventListener('click', IkaPayloads.Add_5k_Event, false);
				td.insertBefore(input, textfield.nextSibling);
				// create button4
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+2k";
				input.setAttribute("class", "button IkaPayloads4");
				input.setAttribute("title", "+2000");
				input.setAttribute("textfield", textfield.id);
				input.addEventListener('click', IkaPayloads.Add_2k_Event, false);
				td.insertBefore(input, textfield.nextSibling);
				// create button3
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+1k";
				input.setAttribute("class", "button IkaPayloads3");
				input.setAttribute("title", "+1000");
				input.setAttribute("textfield", textfield.id);
				input.addEventListener('click', IkaPayloads.Add_1k_Event, false);
				td.insertBefore(input, textfield.nextSibling);
				// create button2
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+";
				input.setAttribute("class", "button IkaPayloads2");
				input.setAttribute("title", "+500");
				input.setAttribute("textfield", textfield.id);
				input.addEventListener('click', IkaPayloads.Add_500_Event, false);
				td.insertBefore(input, textfield.nextSibling);
				// create button1
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "-";
				input.setAttribute("class", "button IkaPayloads1");
				input.setAttribute("title", "-500");
				input.setAttribute("textfield", textfield.id);
				input.addEventListener('click', IkaPayloads.Dec_500_Event, false);
				td.insertBefore(input, textfield.nextSibling);
				}
			}
			
		// Add footer
		IkaPayloads.Insert_Footer();
		},

	Add_500_Event: function(e)
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
		var input = document.getElementById(TextfieldID);
		if (input.value == '') input.value = 0;
		// Increase value or complete to x500 value
		input.value = Math.floor(parseInt(input.value)/500)*500 + 500;
		
		// fire event
		var evt = document.createEvent("KeyEvents");
		evt.initKeyEvent('keyup', true, true, window, false, false, false, false, 13, 0);
		input.dispatchEvent(evt);
		},
		
	Add_1k_Event: function(e)
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
		var input = document.getElementById(TextfieldID);
		if (input.value == '') input.value = 0;
		// Increase value by 1000 and complete to x500 value
		input.value = Math.floor(parseInt(input.value)/500)*500 + 1000;
		
		// fire event
		var evt = document.createEvent("KeyEvents");
		evt.initKeyEvent('keyup', true, true, window, false, false, false, false, 13, 0);
		input.dispatchEvent(evt);
		},
		
	Add_2k_Event: function(e)
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
		var input = document.getElementById(TextfieldID);
		if (input.value == '') input.value = 0;
		// Increase value by 2000 and complete to x500 value
		input.value = Math.floor(parseInt(input.value)/500)*500 + 2000;
		
		// fire event
		var evt = document.createEvent("KeyEvents");
		evt.initKeyEvent('keyup', true, true, window, false, false, false, false, 13, 0);
		input.dispatchEvent(evt);
		},
		
	Add_5k_Event: function(e)
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
		var input = document.getElementById(TextfieldID);
		if (input.value == '') input.value = 0;
		// Increase value by 5000 and complete to x500 value
		input.value = Math.floor(parseInt(input.value)/500)*500 + 5000;
		
		// fire event
		var evt = document.createEvent("KeyEvents");
		evt.initKeyEvent('keyup', true, true, window, false, false, false, false, 13, 0);
		input.dispatchEvent(evt);
		},
		
	Dec_500_Event: function(e)
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
		var input = document.getElementById(TextfieldID);
		if (input.value == '') input.value = 0;
		// Decrease value or complete to x500 value
		input.value = Math.floor((parseInt(input.value)+499)/500)*500 - 500;
		
		// fire event
		var evt = document.createEvent("KeyEvents");
		evt.initKeyEvent('keyup', true, true, window, false, false, false, false, 13, 0);
		input.dispatchEvent(evt);
		},
		
	Insert_Footer: function()
		{
		var div = document.createElement('div');
		div.id = 'IkaPayloadsFooter';
		div.setAttribute("style", "margin-bottom: 10px; text-align: right;");
		div.innerHTML = IkaPayloads.EnhancedBy;
		var mainview = document.getElementById("mainview");
		mainview.appendChild(div);
		}
	};


IkaPayloads.DOM =
	{
	_Parent: null
	};
	
IkaPayloads.DOM.Init = function(parent)
	{
	this._Parent = parent;
	};
	
IkaPayloads.DOM.Get_Nodes = function(query)
	{
	return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	};
	
IkaPayloads.Init();