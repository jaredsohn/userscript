// ==UserScript==
// @name           	Неиспользуемый транспорт в Икариам
// @version	9
// @author		oliezekat, перевод на Русский язык by Vit'OS (hakergtr@yandex.ru)
// @namespace     useless-navy.ikariam
// @description    Скрывает транспорты с ресурсами и сухопутные передвижения войск в Военном советнике. Для версий Икариам 0.3.х.
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

if (!UselessNavy) var UselessNavy = {};

UselessNavy =
	{
	View: '',
	DOM : {},
	PoweredBy: '<br>   <br>Powered by <a target="_blank" href="http://userscripts.org/scripts/show/42907"><b>Useless Navy</b></a>. Перевод на Русский язык by <a href="mailto:hakergtr@yandex.ru"><b>VitOS</b></a>',
	
	Init: function()
		{
		// Fetch view name
		try
			{
			UselessNavy.View = document.getElementsByTagName("body")[0].id;
			}
		catch (e)
			{
			var url_view = /[\?&]view=([a-zA-Z0-9\-_]+)/.exec(document.URL);
			if (url_view != null) UselessNavy.View = RegExp.$1;
			}
		// window.status = 'UselessNavy.View=' + UselessNavy.View;
		
		if (UselessNavy.View =='militaryAdvisorMilitaryMovements')
			{
			UselessNavy.Set_Useless_Merchant_Navy_Styles();
			UselessNavy.Hide_Merchant_Navy();
			}
		else if (UselessNavy.View == 'merchantNavy')
			{
			UselessNavy.Set_Useless_Military_Movements_Styles();
			UselessNavy.Hide_Military_Movements();
			}
		},
		
	Set_Useless_Merchant_Navy_Styles: function()
		{
		// define CSS 
		var default_style = <><![CDATA[
		#militaryAdvisorMilitaryMovements tr.useless td,
		#militaryAdvisorMilitaryMovements tr.useless td a { color: #9090FF !important; }
		]]></>.toXMLString();
		GM_addStyle(default_style);
		},
		
	Hide_Merchant_Navy: function()
		{
		var HiddenTransports = 0;
		var nodes = UselessNavy.DOM.Get_Nodes("//div[@id='fleetMovements']//table[contains(@class, 'locationEvents')]//img[contains(@src, 'mission_trade') or contains(@src, 'mission_deployfleet') or contains(@src, 'mission_transport')]");
		if (nodes != null)
			{
			for (var i=0; i < nodes.snapshotLength; i++)
				{
				var mayHide = true;
				var tr = nodes.snapshotItem(i).parentNode.parentNode;
				
				// Check if military fleet
				var tds = tr.getElementsByTagName("td");
				var payload = tds[2].innerHTML;
				if (payload.indexOf('ship_ram') > 0)
					{
					mayHide = false;
					}
				else if (payload.indexOf('ship_ballista') > 0)
					{
					mayHide = false;
					}
				else if (payload.indexOf('ship_flamethrower') > 0)
					{
					mayHide = false;
					}
				else if (payload.indexOf('ship_catapult') > 0)
					{
					mayHide = false;
					}
				else if (payload.indexOf('ship_steamboat') > 0)
					{
					mayHide = false;
					}
				else if (payload.indexOf('ship_mortar') > 0)
					{
					mayHide = false;
					}
				else if (payload.indexOf('ship_submarine') > 0)
					{
					mayHide = false;
					}
				
				if (mayHide == true)
					{
					tr.style.display = 'none';
					UselessNavy.DOM.Add_ClassName(tr, 'useless');
					HiddenTransports++;
					}
				}
			}
			
		// Add button to display hidden transports
		var div = document.getElementById("UselessNavyFooter");
		if (div == null)
			{
			div = document.createElement('div');
			div.id = 'UselessNavyFooter';
			var mainview = document.getElementById("mainview");
			mainview.appendChild(div);
			}
			
		var sHTML = '<a id="DisplayUselessNavy" class="button" href="javascript://void(0);">Показать '+HiddenTransports+' использующийся(хся) транспорт(ов)</a> информация скрыта для вашего удобства. '+UselessNavy.PoweredBy+'<br><br>';
		div.innerHTML = sHTML;
		
		var DisplayUselessNavy = document.getElementById("DisplayUselessNavy");
		DisplayUselessNavy.addEventListener('click', UselessNavy.Display_Merchant_Navy, false);
		},
		
	Display_Merchant_Navy: function()
		{
		var HiddenTransports = 0;
		var nodes = UselessNavy.DOM.Get_Nodes("//table[contains(@class, 'locationEvents')]//img[contains(@src, 'mission_')]");
		if (nodes != null)
			{
			for (var i=0; i < nodes.snapshotLength; i++)
				{
				var tr = nodes.snapshotItem(i).parentNode.parentNode;
				
				if (tr.style.display == 'none')
					{
					tr.style.display = 'table-row';
					HiddenTransports++;
					}
				}
			}
		
		var div = document.getElementById("UselessNavyFooter");
		if (div == null)
			{
			div = document.createElement('div');
			div.id = 'UselessNavyFooter';
			var mainview = document.getElementById("mainview");
			mainview.appendChild(div);
			}
			
		var sHTML = '<a id="HideUselessNavy" class="button" href="javascript://void(0);">Убрать '+HiddenTransports+' использующийся(хся) транспорт(ов)</a> информация показана для вашего удобства. '+UselessNavy.PoweredBy+'<br><br>';
		div.innerHTML = sHTML;
		
		var HideUselessNavy = document.getElementById("HideUselessNavy");
		HideUselessNavy.addEventListener('click', UselessNavy.Hide_Merchant_Navy, false);
		},
		
	Set_Useless_Military_Movements_Styles: function()
		{
		// define CSS 
		var default_style = <><![CDATA[
		#merchantNavy #mainview table tr.useless td { color: #CB9B6A !important; }
		#merchantNavy #mainview table tr.useless td a { color: #9090FF !important; }
		]]></>.toXMLString();
		GM_addStyle(default_style);
		},
		
	Hide_Military_Movements: function()
		{
		var HiddenMovements = 0;
		var nodes = UselessNavy.DOM.Get_Nodes("//div[@id='mainview']//td[contains(@class, 'mission')]");
		if (nodes != null)
			{
			for (var i=0; i < nodes.snapshotLength; i++)
				{
				GM_log("mission: "+nodes.snapshotItem(i).textContent);
				var mayHide = false;
				var tr = nodes.snapshotItem(i).parentNode;
				var tds = tr.getElementsByTagName("td");
				var nETA = tds[4];
				var nRET = tds[5];
				
				if (nETA.id == '') continue;
				if (nRET.id == '') continue;
				
				if (tr.parentNode.parentNode.parentNode.parentNode.id == 'plunderingTransports') mayHide = true;
				
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
				
				if (mayHide == true)
					{
					tr.style.display = 'none';
					UselessNavy.DOM.Add_ClassName(tr, 'useless');
					tr.nextSibling.style.display = 'none';
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
		if (div == null)
			{
			div = document.createElement('div');
			div.id = 'UselessNavyFooter';
			var mainview = document.getElementById("mainview");
			mainview.appendChild(div);
			}
			
		var sHTML = '<a id="DisplayUselessMovements" class="button" href="javascript://void(0);">Показать '+HiddenMovements+' использующийся(хся) транспорт(ов)</a> информация скрыта для вашего удобства. '+UselessNavy.PoweredBy+'<br><br>';
		div.innerHTML = sHTML;
		
		var DisplayUselessMovements = document.getElementById("DisplayUselessMovements");
		DisplayUselessMovements.addEventListener('click', UselessNavy.Display_Military_Movements, false);
		},
		
	Display_Military_Movements: function()
		{
		var HiddenMovements = 0;
		var nodes = UselessNavy.DOM.Get_Nodes("//div[@id='mainview']//td[contains(@class, 'mission')]");
		if (nodes != null)
			{
			for (var i=0; i < nodes.snapshotLength; i++)
				{
				var tr = nodes.snapshotItem(i).parentNode;
				
				if (tr.style.display == 'none')
					{
					tr.style.display = 'table-row';
					tr.nextSibling.style.display = 'table-row';
					HiddenMovements++;
					
					tr.parentNode.parentNode.parentNode.parentNode.style.display = '';
					}
				}
			}
		
		var div = document.getElementById("UselessNavyFooter");
		if (div == null)
			{
			div = document.createElement('div');
			div.id = 'UselessNavyFooter';
			var mainview = document.getElementById("mainview");
			mainview.appendChild(div);
			}
			
		var sHTML = '<a id="HideUselessMovements" class="button" href="javascript://void(0);">Убрать '+HiddenMovements+' использующийся(хся) транспорт(ов)</a> информация скрыта для вашего удобства. '+UselessNavy.PoweredBy+'<br><br>';
		div.innerHTML = sHTML;
		
		var HideUselessMovements = document.getElementById("HideUselessMovements");
		HideUselessMovements.addEventListener('click', UselessNavy.Hide_Military_Movements, false);
		}
	}

UselessNavy.DOM =
	{
	Get_Nodes: function(query)
		{
		return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		},
						
	Add_ClassName: function(oElm, strClassName)
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
		}
		
	};
	
UselessNavy.Init();
