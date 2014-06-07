// ==UserScript==
// @name           	Ikariam x500, x1000 Payloads
// @version	4
// @author		oliezekat / Darkbond
// @namespace     x500-payloads.ikariam
// @description    crée un bouton qui ajoute 500 ressources et un autre bouton qui ajoute 1000 ressources quand vous transférez d'une ville a une autre ou quand vous ètes sur le comptoir ...
// @include     http://*.ikariam.*/*
// @exclude    http://board.ikariam.*/*
// @exclude    http://*.ikariam.*/*?view=options
// @exclude    http://*.ikariam.*/*?view=highscore
// @exclude    http://*.ikariam.*/*?view=premium
// @exclude    http://*.ikariam.*/*?view=premiumPayment
// @exclude    http://*.ikariam.*/pillory.php
// @exclude    http://ikariam.ogame-world.com/*
// @exclude    http://www.ika-world.com/*
// @exclude    http://ikariamap.com/*
// ==/UserScript==

if (!x500Payloads) var x500Payloads = {};


x500Payloads =
	{
	DOM: {},
	View: '',
	EnhancedBy: '',

	Init: function()
		{
		x500Payloads.DOM.Init(this);
		
		// Fetch view name
		try
			{
			x500Payloads.View = document.getElementsByTagName("body")[0].id;
			}
		catch (e)
			{
			var url_view = /[\?&]view=([a-zA-Z0-9\-_]+)/.exec(document.URL);
			if (url_view != null) x500Payloads.View = RegExp.$1;
			}
		//window.status = 'x500Payloads.View=' + x500Payloads.View;
		
		if (x500Payloads.View =='transport')
			{
			x500Payloads.View_Transport();
			}
		else if (x500Payloads.View =='branchOffice')
			{
			x500Payloads.View_BranchOffice();
			}
		else if (x500Payloads.View =='takeOffer')
			{
			x500Payloads.View_TakeOffer();
			}
		else if (x500Payloads.View =='colonize')
			{
			x500Payloads.View_Colonize();
			}
		// Oh my god! I had forgot view's name while launch new colony. And I coudn't try this now :o(  .oO(hope I will not forget...)
		},



View_Transport: function()
		{
		var nodes = x500Payloads.DOM.Get_Nodes("//ul[@class='resourceAssign']/li");
var x1000Payloads = x500Payloads;
		var nodes2 = x1000Payloads.DOM.Get_Nodes("//ul[@class='resourceAssign2']/li");
		if (nodes != null)
			{
			// define CSS 
			var default_style = <><![CDATA[
			#mainview ul.resourceAssign { width: 650px; }
			#container .resourceAssign input.textfield { top: 9px; }
			input.x500Payloads { position: absolute; top: 6px; left: 510px; margin: 00px; }
			]]></>.toXMLString();
			GM_addStyle(default_style);
			var button2
			button = button2
			
			// Add buttons
			for (var i=0; i < nodes.snapshotLength; i++)
				{
				
				var li = nodes.snapshotItem(i);
				var Good = li.className;
				
				// create button
				var input = document.createElement('input');
				
				input.type = "button";
			    input.value = "+500";
				input.setAttribute("class", "button x500Payloads");
				input.setAttribute("textfield", "textfield_"+Good);
				input.addEventListener('click', x500Payloads.Add_500_Event, false);
				li.appendChild(input);
				}

			}if (nodes2 != null){
			// define CSS 
			var default_style2 = <><![CDATA[
			#mainview ul.resourceAssign2 { width: 650px; }
			#container .resourceAssign2 input.textfield { top: 9px; }
			input.x1000Payloads { position: absolute; top: 6px; left: 580px; margin: 00px; }
			]]></>.toXMLString();
			GM_addStyle(default_style2);


			for (var i=0; i < nodes.snapshotLength; i++)
				{
				var li = nodes.snapshotItem(i);
				var Good = li.className;
				
				// create button
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+1000";
				input.setAttribute("class", "button x1000Payloads");
				input.setAttribute("textfield", "textfield_"+Good);
				input.addEventListener('click', x1000Payloads.Add_1000_Event, false);
				li.appendChild(input);
				}
			{
				
}
}
		// Add footer
		x500Payloads.Insert_Footer();
		},



	View_TakeOffer: function()
		{
		var nodes = x500Payloads.DOM.Get_Nodes("//div[@id='mainview']//td[@class='input']/input");
var x1000Payloads = x500Payloads;
		var nodes2 = x1000Payloads.DOM.Get_Nodes("//div[@id='mainview']//td[@class='input']/input");
		if (nodes != null)
			{
			// define CSS 
			var default_style = <><![CDATA[
			input.x500Payloads { margin: 0px; margin-left: 5px; }
			]]></>.toXMLString();
			GM_addStyle(default_style);
			
			// Add buttons
			for (var i=0; i < nodes.snapshotLength; i++)
				{
				var textfield = nodes.snapshotItem(i);
				var td = textfield.parentNode;
				
				// create button
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+500";
				input.setAttribute("class", "button x500Payloads");
				input.setAttribute("textfield", textfield.id);
				input.addEventListener('click', x500Payloads.Add_500_Event, false);
				td.insertBefore(input, textfield.nextSibling);
				}
			}
		if (nodes2 != null)
			{
			// define CSS 
			var default_style2 = <><![CDATA[
			input.x1000Payloads { margin: 0px; margin-left: 5px; }
			]]></>.toXMLString();
			GM_addStyle(default_style2);
			
			// Add buttons
			for (var i=0; i < nodes.snapshotLength; i++)
				{
				var textfield = nodes.snapshotItem(i);
				var td = textfield.parentNode;
				
				// create button
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+1000";
				input.setAttribute("class", "button x1000Payloads");
				input.setAttribute("textfield", textfield.id);
				input.addEventListener('click', x1000Payloads.Add_1000_Event, false);
				td.insertBefore(input, textfield.nextSibling);
				}
			}
		// Add footer
		x500Payloads.Insert_Footer();
		},
		





	View_BranchOffice: function()
		{
		var nodes = x500Payloads.DOM.Get_Nodes("//table[@class='tablekontor']//td/input");
	var x1000Payloads = x500Payloads;
		var nodes2 = x1000Payloads.DOM.Get_Nodes("//table[@class='tablekontor']//td/input");
		if (nodes != null)
			{
			// define CSS 
			var default_style = <><![CDATA[
			input.x500Payloads { margin: 0px; margin-left: 5px; margin-bottom: 2px;}
			]]></>.toXMLString();
			GM_addStyle(default_style);
			
			// Add buttons
			for (var i=0; i < nodes.snapshotLength; i=i+2)
				{
				var textfield = nodes.snapshotItem(i);
				var td = textfield.parentNode;
				
				// create button
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+500";
				input.setAttribute("class", "button x500Payloads");
				input.setAttribute("textfield", textfield.id);
				input.addEventListener('click', x500Payloads.Add_500_Event, false);
				td.insertBefore(input, textfield.nextSibling);
				}
		}if (nodes2 != null)
			{
			// define CSS 
			var default_style2 = <><![CDATA[
			input.x1000Payloads { margin: 0px; margin-left: 5px; margin-bottom: 2px;}
			]]></>.toXMLString();
			GM_addStyle(default_style2);

			
			for (var i=0; i < nodes.snapshotLength; i=i+2)
				{
				var textfield = nodes.snapshotItem(i);
				var td = textfield.parentNode;
				
				// create button
				var input = document.createElement('input');
				input.type = "button";
			    input.value = "+1000";
				input.setAttribute("class", "button x1000Payloads");
				input.setAttribute("textfield", textfield.id);
				input.addEventListener('click', x1000Payloads.Add_1000_Event, false);
				td.insertBefore(input, textfield.nextSibling);
				}
			}
		// Add footer
		x500Payloads.Insert_Footer();
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


	Add_1000_Event: function(e)
		{
		if (!e) { e = window.event; }
		var obj = e.srcElement ? e.srcElement : e.target;
		while (obj.tagName != 'INPUT')
			{
			obj = obj.parentNode;
			}
		var button2 = obj;
		
		// unfocus button
		button2.blur();	
		
		var TextfieldID = button2.getAttribute('textfield');
		var input = document.getElementById(TextfieldID);
		if (input.value == '') input.value = 0;
		// Increase value or complete to x1000 value
		input.value = Math.floor(parseInt(input.value)/1000)*1000 + 1000;
		
		// fire event
		var evt = document.createEvent("KeyEvents");
		evt.initKeyEvent('keyup', true, true, window, false, false, false, false, 13, 0);
		input.dispatchEvent(evt);
		},

Insert_Footer: function()
		{
		var div = document.createElement('div');
		div.id = 'x500PayloadsFooter';
		div.setAttribute("style", "margin-bottom: 10px; text-align: right;");
		div.innerHTML = x500Payloads.EnhancedBy;
		var mainview = document.getElementById("mainview");
		mainview.appendChild(div);
		}
	};
	
x500Payloads.View_Colonize = function()
	{
	var nodes = x500Payloads.DOM.Get_Nodes("//ul[@class='resourceAssign']/li");
	if (nodes != null)
		{
		// define CSS 
		var default_style = <><![CDATA[
		#mainview ul.resourceAssign { width: 580px; }
		#container .resourceAssign input.textfield { top: 9px; }
		input.x500Payloads { position: absolute; top: 6px; left: 510px; margin: 0px; }
		#container .resourceAssign .summary {left: 500px !important;}
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
			input.value = "+500";
			input.setAttribute("class", "button x500Payloads");
			input.setAttribute("textfield", "textfield_"+Good);
			input.addEventListener('click', x500Payloads.Add_500_Event, false);
			li.appendChild(input);
			}
		}
		
	// Add footer
	x500Payloads.Insert_Footer();
	};

x500Payloads.DOM =
	{
	_Parent: null
	};
	
x500Payloads.DOM.Init = function(parent)
	{
	this._Parent = parent;
	};
	
x500Payloads.DOM.Get_Nodes = function(query)
	{
	return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	};
						
	
x500Payloads.Init();
