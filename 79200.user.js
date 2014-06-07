// ==UserScript==
// @name           Ikariam BF Trading Post AND Research
// @namespace      tradingPost.Ikariam
// @description    Show all offer in the same page and show research in all wanted page
// @include        http://s*.ikariam.*/index.php*
// @exclude        http://support.ikariam.*/*
// ==/UserScript==

/*
ChangeLog:
v1.3.0 - 2010/06/19
	* Corrige un bug pour les pages académie
	* Le calcul du temps restant se fait après les données reçues
	* fixed a bug: une valeur pour le module recherche n'était pas définie correctement
v1.2.0 - 2010/06/18
	+ Ajout du module de recherche à la version précedente
v1.1 - 2010/06/18:
	* Refonte globale du script (mise sous forme objet)
	* Suppression du module recherche (en cours de développement)
	* Ajout des options permettant de sélectionner un ou plusieurs types de ressources pour le comptoir
v1.0 - 2010/06/15 - First version
*/

var TradingPostAndResearch = function ()
{
	var version = '1.2.0';
	var Cookies =
	{
		activated: false,
		previousPage: undefined,
		previousTime: undefined,
		research: undefined,
		researchAcademy: undefined,
		researchArmy: undefined,
		researchMarine: undefined,
		researchEconomy: undefined,
		researchEarnPoints: undefined,
		researchScience: undefined,
		researchFirst: undefined,
		researchPerHour: undefined,
		showTradingBois: undefined,
		showTradingVin: undefined,
		showTradingMarbre: undefined,
		showTradingCristal: undefined,
		showTradingSoufre: undefined,
		trading: '',
		tradingMin: '',
		tradingMax: '',
		exists: function (cookieName)
		{
			if (!this.activated)
			{
				Utils.alert ('exists', new Error ('You must first initialized Cookies!'));
				return false;	
			}
			switch (cookieName)
			{
				case 'IkariamPreviousPage':
				case 'IkariamPreviousTime':
				case 'IkariamResearchFirst':
				case 'IkariamShowResearch':
				case 'IkariamresearchACademy':
				case 'IkariamresearchArmy':
				case 'IkariamresearchMarine':
				case 'IkariamresearchScience':
				case 'IkariamresearchEconomy':
				case 'IkariamResearchEarnPoints':
				case 'IkariamResearchPerHour':
				case 'IkariamShowTradingBois':
				case 'IkariamShowTradingVin':
				case 'IkariamShowTradingMarbre':
				case 'IkariamShowTradingCristal':
				case 'IkariamShowTradingSoufre':
				case 'IkariamShowTrading':
				case 'IkariamTradingMin':
				case 'IkariamTradingMax':
					return true;
				default:
					return false;
			}
			return false;
		},
		init: function ()
		{
			if (this.activated == true)
				return;
			this.previousPage = 'IkariamPreviousPage';
			this.previousTime = 'IkariamPreviousTime';
			this.research = 'IkariamShowResearch';
			this.researchAcademy = 'IkariamresearchACademy';
			this.researchArmy = 'IkariamresearchArmy';
			this.researchMarine = 'IkariamresearchMarine';
			this.researchEconomy = 'IkariamresearchEconomy';
			this.researchEarnPoints = 'IkariamResearchEarnPoints';
			this.researchScience = 'IkariamresearchScience';
			this.researchFirst = 'IkariamResearchFirst';
			this.researchPerHour = 'IkariamResearchPerHour';
			this.showTradingBois = 'IkariamShowTradingBois';
			this.showTradingVin = 'IkariamShowTradingVin';
			this.showTradingMarbre = 'IkariamShowTradingMarbre';
			this.showTradingCristal = 'IkariamShowTradingCristal';
			this.showTradingSoufre = 'IkariamShowTradingSoufre';
			this.trading = 'IkariamShowTrading';
			this.tradingMin = 'IkariamTradingMin';
			this.tradingMax = 'IkariamTradingMax';
			this.activated = true;
		}
	}
	
	var DateTime =
	{
		activated: false,
		currentTime: 0,
		init: function ()
		{
			if (this.activated == true)
				return;
			this.currentTime = Math.floor ((new Date ()).getTime () / 1000);
		},
		showTimeLeft: function (string)
		{
			if (! Research.ResearchRegExp.test (string))
				return '<font style="color:#993300;font-weight:bold">' + string.replace (/: /, '</font><br />');

			const researchPerHour = Utils.getValue (Cookies.researchPerHour, 0);
			if (researchPerHour == 0)
				return '<font style="color:#993300;font-weight:bold">' + string.replace (/: .*$/, '</font><br />impossible');
				
			var date = new Date ();
			const regularExp = Research.ResearchRegExp.exec (string);
			var timeSpend =  parseInt (Math.floor ((new Date()).getTime () / 1000) - this.currentTime);
			var neededPoints = parseInt (regularExp[2]) - (Utils.getValue (Cookies.researchEarnPoints, 0) + timeSpend * (researchPerHour / 3600));
			var timeLeft = parseInt (neededPoints / (researchPerHour / 3600));
			
			//alert (timeLeft);
			var second = timeLeft % 60;
			var minute = Math.floor (timeLeft / 60) % 60;
			var hour = Math.floor (timeLeft / 3600) % 24;
			var day = Math.floor (timeLeft / 86400);
			
			var returnValue = '';
			if (day > 0)
			{
				returnValue += day + 'j ';
				if (hour < 10)
					hour = '0' + hour;
			}

			returnValue += hour + 'h ';
			if (minute < 10)
				returnValue += '0';
			returnValue += minute + 'mn ';
			if (second < 10)
				returnValue += '0';
			returnValue += second + 's';
			return '<font style="color:#993300;font-weight:bold">' + regularExp[1] + '</font>: \n<br /><div style="font-weight: bold;width: 100%;margin: auto;text-align: center;">' + returnValue + '</div>\n';
		},
		updateTime: function ()
		{
			if (document.getElementById ('Ikariam_ResearchMarine'))
				document.getElementById ('Ikariam_ResearchMarine').innerHTML = DateTime.showTimeLeft (Utils.getValue(Cookies.researchMarine, 0));
			if (document.getElementById ('Ikariam_ResearchEconomy'))
				document.getElementById ('Ikariam_ResearchEconomy').innerHTML = DateTime.showTimeLeft (Utils.getValue(Cookies.researchEconomy, 0));
			if (document.getElementById ('Ikariam_ResearchScience'))
				document.getElementById ('Ikariam_ResearchScience').innerHTML = DateTime.showTimeLeft (Utils.getValue(Cookies.researchScience, 0));
			if (document.getElementById ('Ikariam_ResearchArmy'))
				document.getElementById ('Ikariam_ResearchArmy').innerHTML = DateTime.showTimeLeft (Utils.getValue(Cookies.researchArmy, 0));
			setTimeout(DateTime.updateTime, 1000);
		}
	}
	
	var Game =
	{
		init: function ()
		{
			Cookies.init ();
			Option.init ();
			Utils.init ();
			DateTime.init ();
			Menu.init ();
			if (Utils.isCurrentPage ('researchAdvisor'))
				PageResearch.launch ();
			else if (Utils.isCurrentPage ('academy'))
				PageAcademy.launch ();
			Research.init ();
			if (Utils.isCurrentPage ('branchOffice') && Utils.getValue (Cookies.trading,true) == true)
				Trading.launch ();
			Utils.setValue (Cookies.previousPage, Option.currentViewName);
		}
	}
	
	var Menu =
	{
		divMenu: undefined,
		show_options: false,
		addGroupOption: function (groupName)
		{
			var title = document.createElement ('h4');
			title.textContent = groupName;
			this.divMenu.appendChild (title);
		},
		createMenuButton: function ()
		{
			const ulTags = document.getElementsByTagName('ul');
			var myUl = ulTags[ulTags.length - 1];
			for (i = 0; i < ulTags.length; i++)
			{
				if (ulTags[i].innerHTML.indexOf ('class="help"><a') != -1)
				{
					myUl = ulTags[i];
					break;
				}
			}
			var li = document.createElement ('li');
			li.className = 'textLabel';
			
			var menuLink = document.createElement('a');
			menuLink.id = 'script_menu';
			menuLink.setAttribute ('href', '#');
			menuLink.textContent = 'script menu';
			li.appendChild (menuLink);
			myUl.appendChild (li);
		},
		showOption: function ()
		{
			if (document.getElementById ('script_options').style.visibility == 'visible')
				document.getElementById ('script_options').style.visibility = 'hidden'; 
			else
				document.getElementById ('script_options').style.visibility = 'visible';
		},
		createOption: function (text, input_type, input_id, cookieSet)
		{
			var li = Utils.createMenuItem ('', 'name', Utils.createSpan ('', 'textLabel', text));
			var input = document.createElement ('input');
			input.setAttribute ('type', input_type);
			input.setAttribute ('size', '1');
			input.id = input_id;
			if (input_type == 'checkbox')
			{
				if (input_id == 'show_research')
				{
					if (Utils.getValue (cookieSet, '').indexOf (Option.currentViewName) != -1)
						input.checked = true;
					Utils.addEvent (input, 'click', function () { 
						if (input.checked == false)
						{
							var value = '';
							var elts = Utils.getValue (cookieSet, '').split ('|');
							for (var i = 0; i < elts.length; i++)
							{
								if (elts[i] == Option.currentViewName)
									continue;
								if (value != '')
									value += '|';
								value += elts[i];
							}
							Utils.setValue (cookieSet, value);
						}
						else if (Utils.getValue (cookieSet, '').indexOf (Option.currentViewName) == -1)
							Utils.setValue (cookieSet, Utils.getValue (cookieSet, '') + '|' + Option.currentViewName);
						Research.update (input.checked);
						});
				}
				else
				{
					if (Utils.getValue (cookieSet, false) == true)
						input.checked = true;
					Utils.addEvent (input, 'click', function () { Utils.setValue (cookieSet, input.checked == true)});
					if (input_id == 'show_research_first')
						Utils.addEvent (input, 'click', function () { Research.updateFirst ();});
				}
			}
			else if (input_type == 'text')
			{
				input.value = Utils.getValue (cookieSet, 0);
				Utils.addEvent (input, 'change', function () {
					var value = parseInt(document.getElementById(input_id).value);
					if (value == undefined || value < 0 || value > 99)
						return;
					Utils.setValue (cookieSet, value);
				});
			}
			li.appendChild (input);
			
			return li;
		},
		createMenuDiv: function ()
		{
			this.divMenu = Utils.createDiv ('script_options');
			this.divMenu.setAttribute ('style', 'position:fixed;z-index:100;top:5px;left:5px');
			
			var title = document.createElement ('h3');
			title.textContent = 'Options';
			this.divMenu.appendChild (title);
			this.divMenu.appendChild (document.createElement ('br'));
			
			this.addGroupOption ('Commerce');	
			
			var ul = Utils.createMenu ('', 'cityinfo');
			ul.appendChild (this.createOption ('Activer', 'checkbox', 'show_all_trades', Cookies.trading));
			ul.appendChild (this.createOption ('Afficher bois', 'checkbox', 'show_bois', Cookies.showTradingBois));
			ul.appendChild (this.createOption ('Afficher vin', 'checkbox', 'show_vin', Cookies.showTradingVin));
			ul.appendChild (this.createOption ('Afficher marbre', 'checkbox', 'show_marbre', Cookies.showTradingMarbre));
			ul.appendChild (this.createOption ('Afficher cristal', 'checkbox', 'show_cristal', Cookies.showTradingCristal));
			ul.appendChild (this.createOption ('Afficher soufre', 'checkbox', 'show_soufre', Cookies.showTradingSoufre));
			ul.appendChild (this.createOption ('Cout min a l\'unite', 'text', 'change_min_commerce', Cookies.tradingMin));
			ul.appendChild (this.createOption ('Cout max a l\'unite', 'text', 'change_max_commerce', Cookies.tradingMax));
			this.divMenu.appendChild (ul);
			this.addGroupOption ('Recherche');
			ul = Utils.createMenu ('', 'cityinfo');	
			ul.appendChild (this.createOption ('Activer pour cette page', 'checkbox', 'show_research', Cookies.research));
			ul.appendChild (this.createOption ('Seulement la prochaine', 'checkbox', 'show_research_first', Cookies.researchFirst));
			this.divMenu.appendChild (ul);
			this.divMenu.style.visibility = 'hidden';
			document.getElementById (Option.currentViewName).appendChild (this.divMenu);
		},
		init: function ()
		{
			this.insertCSSRule ();
			this.createMenuDiv ();
			this.createMenuButton ();
			document.getElementById ('script_menu').setAttribute ('onClick', 'javascript:if (document.getElementById (\'script_options\').style.visibility == \'visible\')				document.getElementById (\'script_options\').style.visibility = \'hidden\'; 			else				document.getElementById (\'script_options\').style.visibility = \'visible\';');
		},
		insertCSSRule: function ()
		{
			Utils.insertCSSRule('#script_options { background-color: #F6EBBA; background-image: url("' + Utils.server + 'skin/layout/bg_sidebox_header.jpg");	background-repeat: no-repeat;background-attachment: scroll;	background-position: 0% 0%;	font-size: 10px; padding: 0px 10px 10px 5px;} ');
			Utils.insertCSSRule('#script_options input{ width: 20px; text-align: center; margin-right: 5px; margin-left: 5px;}');
			Utils.insertCSSRule('#script_options li {text-align: right;}	');
			Utils.insertCSSRule('#script_options h3, #script_options h4 {color: #993333;}');
			Utils.insertCSSRule('#script_options h3{	height:24px; padding-top: 2px;line-height: 24px;font-weight: bold;text-align: center;}');
			Utils.insertCSSRule('#script_options h4{font-size: 12px;}');
		}
	}
	
	var Option =
	{
		lang: undefined,
		monde: undefined,
		currentViewName: undefined,
		init: function ()
		{
			this.currentViewName = document.getElementsByTagName ('body')[0].id;
			var match = location.href.match (/http:\/\/s([0-9]+)\.([^\.]*)\.ikariam\.com/);
			if (match)
			{
				this.monde = match[1];
				this.lang = match[2];
			}
		}
	}
	
	var PageAcademy =
	{
		getCurrentAcademyResearchPerHour: function ()
		{
			return parseInt (document.getElementById ('valueResearch').textContent. substr (1));
		},
		launch: function ()
		{
			if (Utils.getValue (Cookies.previousPage, '') == 'academy')
			{
				var researchPerHour = Utils.getValue (Cookies.researchPerHour, 0) - Utils.getValue (Cookies.researchAcademy, 0);
				researchPerHour += this.getCurrentAcademyResearchPerHour ();
				Utils.setValue (Cookies.researchPerHour, researchPerHour);
			}
			Utils.setValue (Cookies.researchAcademy, this.getCurrentAcademyResearchPerHour ());
		}
	}
	
	var PageResearch =
	{
		launch: function ()
		{
			var searchName = new Array ();
			var h4Tags = document.getElementsByTagName('h4');
			for (var i = 0; i < h4Tags.length; i++)
			{
				var name = h4Tags[i].textContent.replace(/^\s+/g,'').replace(/\s+$/g,'');
				searchName.push (name);
			}
			
			var liTags = document.getElementsByTagName('li');
			var researchType = 0;
			
			for (var i = 0; i < liTags.length; i++)
			{
				if (liTags[i].className == 'points')
				{
					ResearchPoints = parseInt (/ ?(([0-9]{1,3}[\.,])*[0-9]{1,3})/.exec (liTags[i].innerHTML)[0].replace (/[\.,]/g, ''));
					Utils.setValue (Cookies.researchEarnPoints, ResearchPoints);
					continue;
				}		
				if (liTags[i].className == 'time')
				{
					ResearchTime = parseInt (/ ?(([0-9]{1,3}[\.,])*[0-9]{1,3})/.exec (liTags[i].innerHTML)[0].replace (/[\.,]/g, ''));
					Utils.setValue (Cookies.researchPerHour, ResearchTime);
					continue;
				}
				if (liTags[i].className.indexOf ('researchType') != -1)
				{
					var points = -1;
					var time = -1;
					if (liTags[i].innerHTML.indexOf("Pas assez de points") != -1)
					{
						line = liTags[i].textContent.substring(liTags[i].textContent.indexOf("Pas assez de points"));
						points = parseInt (/ ?(([0-9]{1,3}[\.,])*[0-9]{1,3})/.exec (line)[0].replace (/[\.,]/g, ''));
					}
						
					if (points >= 0)
						searchName[researchType] += ': ' + points;
					else
						searchName[researchType] += ': impossible';
					researchType++;
				}
			}
			Utils.setValue (Cookies.researchMarine, searchName[0]);
			Utils.setValue (Cookies.researchEconomy, searchName[1]);
			Utils.setValue (Cookies.researchScience, searchName[2]);
			Utils.setValue (Cookies.researchArmy, searchName[3]);
		}
	}
	
	var Research =
	{
		ResearchRegExp: /(.*): ([0-9]+)/,
		divElement: undefined,
		addContent: function ()
		{
			var content = '';
			if (Utils.getValue (Cookies.researchPerHour, 0) == 0)
				content += '<div style="width: 100%;margin: auto;text-align: center;">Aucune recherche possible</div><br />\n';
			else
			{		
				if (Utils.getValue (Cookies.researchFirst, false) == false)
					content +='<div style="width: 100%;margin: auto;text-align: center;" id="Ikariam_ResearchMarine">'
							+ DateTime.showTimeLeft (Utils.getValue (Cookies.researchMarine, 'marine: unknown'))
							+ '</div>'
							+ '<div style="width: 100%;margin: auto;text-align: center;" id="Ikariam_ResearchEconomy">'
							+ DateTime.showTimeLeft (Utils.getValue (Cookies.researchEconomy, 'economie: unknown'))
							+ '</div>'
							+ '<div style="width: 100%;margin: auto;text-align: center;" id="Ikariam_ResearchScience">'
							+ DateTime.showTimeLeft (Utils.getValue (Cookies.researchScience, 'science: unknown'))
							+ '</div>'
							+ '<div style="width: 100%;margin: auto;text-align: center;" id="Ikariam_ResearchArmy">'
							+ DateTime.showTimeLeft (Utils.getValue (Cookies.researchArmy, 'armee: unknown'))
							+ '</div>';
				else
				{
					var marine = economy = science = army = minimum = -1;
					if (this.ResearchRegExp.test (Utils.getValue (Cookies.researchMarine, 'marine: -1')))
					{
						marine = parseInt (this.ResearchRegExp.exec (Utils.getValue (Cookies.researchMarine, 'marine: -1'))[2]);
						minimum = marine;
					}
					if (this.ResearchRegExp.test (Utils.getValue (Cookies.researchEconomy, 'economie: -1')))
					{
						economy = parseInt (this.ResearchRegExp.exec (Utils.getValue (Cookies.researchEconomy, 'economie: -1'))[2]);
						if (minimum == -1)
							minimum = economy;
						else if (economy != -1)
							minimum = Math.min (economy, minimum);
					}
					if (this.ResearchRegExp.test (Utils.getValue (Cookies.researchScience, 'science: -1')))
					{
						science = parseInt (this.ResearchRegExp.exec (Utils.getValue (Cookies.researchScience, 'science: -1'))[2]);
						if (minimum == -1)
							minimum = science;
						else if (science != -1)
							minimum = Math.min (science, minimum);
					}
					if (this.ResearchRegExp.test (Utils.getValue (Cookies.researchArmy, 'armee: unknown')))
					{
						army = parseInt (this.ResearchRegExp.exec (Utils.getValue (Cookies.researchArmy, 'armee: unknown'))[2]);
						if (minimum == -1)
							minimum = army;
						else if (army != -1)
							minimum = Math.min (army, minimum);
					}
					if (minimum == -1)
						content += '<div style="width: 100%;margin: auto;text-align: center;">Aucune recherche possible</div><';
					else
					{
						if (marine == minimum)
							content +='<div style="width: 100%;margin: auto;text-align: center;" id="Ikariam_ResearchMarine">'
									+ DateTime.showTimeLeft (Utils.getValue (Cookies.researchMarine))
									+ '</div>';
						if (economy == minimum)
							content +='<div style="width: 100%;margin: auto;text-align: center;" id="Ikariam_ResearchEconomy">'
									+ DateTime.showTimeLeft (Utils.getValue (Cookies.researchEconomy))
									+ '</div>';
						if (science == minimum)
							content +='<div style="width: 100%;margin: auto;text-align: center;" id="Ikariam_ResearchScience">'
									+ DateTime.showTimeLeft (Utils.getValue (Cookies.researchScience))
									+ '</div>';
						if (army == minimum)
							content +='<div style="width: 100%;margin: auto;text-align: center;" id="Ikariam_ResearchArmy">'
									+ DateTime.showTimeLeft (Utils.getValue (Cookies.researchArmy))
									+ '</div>';
					}
				}
			}
			document.getElementById ('showResearchTimeLeft').innerHTML = content;
		},
		create: function ()
		{
			var researchType = 0;

			if (!this.divElement)
			{
				var divTags = document.getElementsByTagName('div');
				// looking for the left pan menu
				for (var i = divTags.length - 1; i >= 0; i--)
				{
					if (divTags[i].className.indexOf ('dynamic') == -1)
						continue;
					this.divElement = divTags[i];
					break;
				}
			}
			var h3 = document.createElement ('h3');
			h3.className = 'header';
			h3.textContent = 'Prochaine(s) Recherche(s)';
			
			var div = Utils.createDiv ('researchContentId', '', h3);
			
			if (Utils.getValue (Cookies.research, '').indexOf(Option.currentViewName) == -1)
				div.style.display = 'none';
			var div2 = Utils.createDiv ('showResearchTimeLeft', 'content');
			div.appendChild (div2);
			div.appendChild (Utils.createDiv ('', 'footer'));
			this.divElement.appendChild (div);
			this.addContent ();
			// call the timeout manager (to update elements)
			DateTime.updateTime ();
		},
		init: function ()
		{
			this.updatePoint();
			this.create ();
		},
		update: function (bool)
		{
			if (bool)
				document.getElementById ('researchContentId').style.display = '';
			else
				document.getElementById ('researchContentId').style.display = 'none';
		},
		updateFirst: function () // show only the first terminating research or not
		{
			document.getElementById ('showResearchTimeLeft').innerHTML = '';
			this.addContent ();
		},
		updatePoint: function ()
		{
			var spendTime = DateTime.currentTime - Utils.getValue (Cookies.previousTime, DateTime.currentTime);
			if (spendTime <= 0)
				return;
			GM_log (DateTime.currentTime + ' - ' + Utils.getValue (Cookies.previousTime, DateTime.currentTime) + ' - ' + Math.floor (spendTime * (Utils.getValue (Cookies.researchPerHour, 0) / 3600)));
			Utils.setValue (Cookies.researchEarnPoints, Utils.getValue (Cookies.researchEarnPoints, 0) + Math.floor (spendTime * (Utils.getValue (Cookies.researchPerHour, 0) / 3600)));
			Utils.setValue (Cookies.previousTime, DateTime.currentTime);
		},
		updateTime: function ()
		{
			if (document.getElementById ('Ikariam_ResearchMarine'))
				document.getElementById ('Ikariam_ResearchMarine').innerHTML = DateTime.showTimeLeft (Utils.getValue(Cookies.researchMarine, 0));
			if (document.getElementById ('Ikariam_ResearchEconomy'))
				document.getElementById ('Ikariam_ResearchEconomy').innerHTML = DateTime.showTimeLeft (Utils.getValue(Cookies.researchEconomy, 0));
			if (document.getElementById ('Ikariam_ResearchScience'))
				document.getElementById ('Ikariam_ResearchScience').innerHTML = DateTime.showTimeLeft (Utils.getValue(Cookies.researchScience, 0));
			if (document.getElementById ('Ikariam_ResearchArmy'))
				document.getElementById ('Ikariam_ResearchArmy').innerHTML = DateTime.showTimeLeft (Utils.getValue(Cookies.researchArmy, 0));
			setTimeout(Research.updateTime, 1000);
		}
	}
	
	var Trading =
	{
		id: undefined,
		minCost: 0,
		maxCost: 0,
		position: undefined,
		view: 'branchOffice',
		type: 444,
		range: 1,
		createTbody: function ()
		{

			var resultTable = document.getElementsByTagName('table')[2];
			resultTable.innerHTML = resultTable.innerHTML.substr (0, resultTable.innerHTML.indexOf ('</tr>') + 4);
			for (var i = this.minCost; i < this.maxCost; i++)
			{
				var monDiv = document.createElement ('tbody');
				monDiv.id = 'ikaComptoir_' + i;
				resultTable.appendChild (monDiv);
			}
		},
		getPrice: function (line)
		{
			if (! /.*[^0-9][0-9]+ <img src="[^"]*" \/> par pièce/.test (line))
				return 999;
			return parseInt (/.*[^0-9]([0-9]+) <img src="[^"]*" \/> par pièce/.exec (line)[1]);
		},
		init: function ()
		{
		
			this.minCost = Utils.getValue (Cookies.tradingMin, 0);
			this.maxCost = Utils.getValue (Cookies.tradingMax, 0);
			var rangeSelect = Utils.getInput ('range', 'select');
			this.range = rangeSelect.options[rangeSelect.selectedIndex].value;
			var inputs = document.getElementsByTagName ('input');
			for (i = 0; i < inputs.length; i++)
			{
				if (inputs[i].getAttribute ('name') == 'id')
				{
					this.id = inputs[i].value;
					continue;
				}
				if (inputs[i].getAttribute ('name') == 'position')
				{
					this.position = inputs[i].value;
					continue;
				}
				if (inputs[i].getAttribute ('name') == 'type' && inputs[i].checked)
				{
					this.type = inputs[i].value;
					continue;
				}
			}
		},
		
		launch: function ()
		{
			this.init ();
			if (this.type != 444)
				return;
			this.createTbody ();
			if (Utils.getValue (Cookies.showTradingBois, false))
				this.requestRessource ('resource');
			if (Utils.getValue (Cookies.showTradingVin, false))
				this.requestRessource (1);
			if (Utils.getValue (Cookies.showTradingMarbre, false))
				this.requestRessource (2);
			if (Utils.getValue (Cookies.showTradingCristal, false))
				this.requestRessource (3);
			if (Utils.getValue (Cookies.showTradingSoufre, false))
				this.requestRessource (4);
		},
		requestRessource: function (resourceType)
		{
			if (this.id == undefined || this.position == undefined)
				return;
			GM_xmlhttpRequest({
				method:'POST',
				url: Utils.server + '/index.php',
				data:'id=' + this.id + "&position=" + this.position + "&view=branchOffice&type=444&searchResource=" + resourceType + "&range=" + this.range,
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Content-type': 'application/x-www-form-urlencoded',
					'Accept': 'application/atom+xml,application/xml,text/xml',
					'Referer': Utils.server + '/index.php', 
					'Cookie': document.cookie
				},
				onload:Trading.getResultCount
			});
		},
		getResultCount: function (responseDetails)
		{
			var goodResource = '';
			var response = responseDetails.responseText;
			response = response.substr (response.indexOf ('Résultats'));
			response = response.substr (response.indexOf ('<table'));
			response = response.substr (response.indexOf ('>') + 1, response.indexOf ('</table>'));
			response = response.substr (response.indexOf ('</tr>') + 4);
			
			while (response.indexOf ('<tr') != -1)
			{
				var line = response.substr (response.indexOf ('<tr'), response.indexOf ('</tr>') + 4);
				var price = Trading.getPrice (line);
				if (price < Trading.maxCost && price >= Trading.minCost)
				{
					var div = document.getElementById ('ikaComptoir_' + price);
					div.innerHTML += line;
				}
				response = response.substr (response.indexOf ('</tr>') + 4);
			}
		}
	}
	
	var Utils =
	{
		initialized: false,
		server: '',
		inputElements: '',
		addEvent: function (obj, type, fn)
		{
			if (obj.addEventListener)
				obj.addEventListener (type, fn, false);
			else if (obj.attachEvent)
			{
				obj["e"+type+fn] = fn;
				obj[type+fn] = function () { obj["e"+type+fn]( window.event ); }
				obj.attachEvent ("on"+type, obj[type+fn]) ;
			}
		},
		alert: function (functionName, error)
		{
			alert (functionName + ':' + error.lineNumber + ':' + error.message);
		},
		createDiv: function (id, className, child)
		{
			var div = document.createElement('div');
			if (id)
				div.id = id;
			if (className)
				div.className = className;
			if (child)
			{
				if (typeof (child) == 'string')
					div.textContent = child;
				else
					div.appendChild (child);
			}
			return div;
		},
		createImg: function(id, className, src, rel, height, width)
		{
			var img = document.createElement ('img');
			
			if (id)
				img.id = id;
				
			if (className)
				img.className = className;
				
			if (src)
				img.setAttribute ('src', src);
			if (rel)
				img.setAttribute ('rel', rel);
				
			img.setAttribute ('height', height);				
			img.setAttribute ('width', width);
			
			return img;
		},
		createLinks: function (id, className, href, child)
		{
			var a = document.createElement('a');
			
			if (id)
				a.id = id;
			if (className)
				a.className = className;
			a.setAttribute ('href', href);
			var target = '_self';
			if (href.indexOf ('http://') == 0 && href.indexOf ('/game/') == -1)
				target = '_blank';
			
			a.setAttribute ('target', target);
			if (child)
			{
				switch (typeof(child))
				{
					case 'object':
						a.appendChild (child);
						break;
					default:
						a.textContent = child;
						break;
				}
			}
			return a;
		},
		createMenu: function (id, className, child)
		{
			var ul = document.createElement ('ul');
			if (id)
				ul.id = id;
			if (className)
				ul.className = className;
			if (child)
				switch (typeof(child))
				{
					case 'object':
						ul.appendChild (child);
						break;
					default:
						ul.textContent = child;
						break;
				}
			return ul;
		},
		createMenuItem: function (id, className, child)
		{
			var li = document.createElement ('li');
			if (id)
				li.id = id;
			if (className)
				li.className = className;
			if (child)
				switch (typeof(child))
				{
					case 'object':
						li.appendChild (child);
						break;
					default:
						li.textContent = child;
						break;
				}
			return li;	
		},
		createSpan: function (id, className, child)
		{
			var span = document.createElement ('span');
			if (id)
				span.id = id;
			if (className)
				span.className = className;
			if (child)
				switch (typeof(child))
				{
					case 'object':
						span.appendChild (child);
						break;
					default:
						span.textContent = child;
						break;
				}
			return span;
		},
		createStyleSheet: function()
		{
			document.getElementsByTagName('head')[0].appendChild(document.createElement("style"));
			this.stylesheet = document.styleSheets[document.styleSheets.length-1];
		},
		getElementById: function (idname)
		{
			if (typeof (document.getElementById(idname)) == 'object')
				return document.getElementById(idname);
			if (this.debug)
				Utils.alert ('getElementById', new Error ('Unknown Element with Id ' + idname));
			return this.unusedElement;
		},
		getElementsByTagName: function (tagName)
		{
			var tagsName = document.getElementsByTagName (tagName);
			if (tagsName && tagsName.length > 0)
				return tagsName;
			if (this.debug)
				Utils.alert ('getElementsByTagName', new Error ('Unknown Element with tagname ' + tagName));
			return this.unusedElement;
		},
		getFirstTagName: function (tagName)
		{
			var firstTagName = document.getElementsByTagName (tagName);
			if (firstTagName && firstTagName.length > 0)
				return firstTagName[0];
			if (this.debug)
				Utils.alert ('getFirstTagName', new Error ('Unknown Element with tagname ' + tagName));
			return this.unusedElement;
		},
		getHref: function (getName)
		{
			if (location.href.indexOf ('&' + getName + '=') == -1 && location.href.indexOf ('?' + getName + '=') == -1)
				return undefined;
			var vars = location.href.split ('?')[1].split ('&');
			for (var i = 0; i < vars.length; i++)
			{
				var curVar = vars[i].split ('=');
				if (curVar[0] == getName)
					return curVar[1];
			}
			return undefined;
		},
		// inputType: 1 => input, 2 => select
		getInput: function (inputName, inputType)
		{
			if (inputType == null)
				inputType = 'input';
			var inputs = document.getElementsByTagName (inputType);

			
			if (this.inputElements.indexOf (inputName) != -1)
			{
				var split = this.inputElements.substr(0, this.inputElements.indexOf (inputName)).split ('|');
				split = parseInt (split[split.length - 1].split (':')[0]);
				return inputs[split];
			}
			for (j = 0; j < inputs.length; j++)
			{
				var name = inputs[j].getAttribute('name');
				if (this.inputElements != '')
					this.inputElements += '|';
				this.inputElements += j + ':' + name;
				if (name == inputName)
					return inputs[j];
			}
			return undefined;
		},
		getValue: function (cookieName, cookieValue)
		{
			if (!Cookies.exists (cookieName))
			{
				Utils.alert ('getValue', new Error ('unknown cookie: ' + arguments.callee.caller));
				return;
			}
			return GM_getValue (cookieName + 'monde' + Option.monde, cookieValue);
		},
		init: function ()
		{
			if (this.initialized == true)
				return;
			this.createStyleSheet ();
			Option.currentViewName = this.getFirstTagName ('body').id;
			if (!Option.currentViewName || Option.currentViewName == '')
				Option.currentViewName = this.getHref ('view');
			this.initialized = true;
			this.server = location.href.split ('index.php')[0];
		},
		insertCSSRule: function (rule)
		{
			Utils.stylesheet.insertRule(rule, 0);
		},
		isCurrentPage: function (page)
		{
			var pages = page.toLowerCase().split(',');
			for (var i=0; i<pages.length; i++)
				if (pages[i] == Option.currentViewName.toLowerCase())
					return true;	
			return false;
		},
		setValue: function (cookieName, cookieValue)
		{
			if (!Cookies.exists (cookieName))
			{
				Utils.alert ('setValue', new Error ('unknown cookie: ' + arguments.callee.caller));
				return;
			}
			GM_setValue (cookieName + 'monde' + Option.monde, cookieValue);
		},
		textToNumber: function (text)
		{
			return parseInt(Utils.trim(text.replace(/[\.,]/g, '')));
		},
		trim: function (text)
		{
			if (!text)
				return '';
			return text.replace(/^\s+/g,'').replace(/\s+$/g,'');
		}
	}
	Game.init ();

}

if (window.navigator.userAgent.indexOf('Chrome') > -1 && window.google)
	document.location.href = 'javascript:('+TradingPostAndResearch+')();void(0);';
else
	TradingPostAndResearch();