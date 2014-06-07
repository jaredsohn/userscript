// ==UserScript==
// @name           [BFSU] Ikariam - voir les recherches partout
// @namespace      Ikariam BFSU
// @include        http://s*.ikariam.*/index.php*
// @exclude        http://support.ikariam.*
// ==/UserScript==

var IkariamResearch = function ()
{
	var mywindow;
	try { mywindow = unsafeWindow; }
	catch (e) { mywindow = window; }

	if (!mywindow.BFSU_started)
	{
		var url = 'http://userscripts.org/scripts/show/80007';
		alert ('Vous devez installer le script [BFSU] BlackFantome Script Utilities\n'
				+ 'Ce script est disponible à cette adresse: ' + url + '\n'
				+ 'Une fois ceci fait, placez le script au dessus de celui-ci dans la liste');
		return;
	}

	var $ = mywindow.$;
	var Cookies = mywindow.Cookies;
	var DateTime = mywindow.DateTime;
	var Options = mywindow.Options;
	var Tools = mywindow.Tools;
	
	var Actions =
	{
		activate: function ()
		{
			const check = Tools.getValue ('ResearchShow', true);
			Tools.setValue ('ResearchShow', !check);
			var value = Tools.getValue ('ResearchShowPage','|');
			const check_page = value.indexOf ('|' + Options.current_page + '|') != -1;
			$('#research_script').eq (0).css ('display', !check && check_page ? '' : 'none');
		},
		// uncheck the "cette page: afficher" when we click on the "Recherche" panel
		unCheckThis: function ()
		{
			$('div h4:contains("Recherche")').eq(0).parent().find ('input').eq (1).attr ('checked', '');
			$('#research_script').eq (0).css ('display', 'none');
			
			var new_value = Tools.getValue ('ResearchShowPage','|');
			const check = new_value.indexOf ('|' + Options.current_page + '|') != -1;
			if (check)
			{
				new_value = '|';
				var split = Tools.getValue ('ResearchShowPage','|'). split ('|');
				for (var i = 1; i < split.length - 1; i++)
				{
					if (split[i] == Options.current_page)
						continue;
					new_value += split[i] + '|';
				}
				Tools.setValue ('ResearchShowPage', new_value);
			}
		},
		show: function ()
		{			
			var new_value = Tools.getValue ('ResearchShowPage','|');
			const check = new_value.indexOf ('|' + Options.current_page + '|') != -1;
			if (!check)
			{
				Tools.setValue ('ResearchShowPage', new_value + Options.current_page + '|');
				$('#research_script').eq (0).css ('display', Tools.getValue ('ResearchShow')? '': 'none');
				return;
			}
			new_value = '|';
			var split = Tools.getValue ('ResearchShowPage','|'). split ('|');
			for (var i = 1; i < split.length - 1; i++)
			{
				if (split[i] == Options.current_page)
					continue;
				new_value += split[i] + '|';
			}
			Tools.setValue ('ResearchShowPage', new_value);
			$('#research_script').eq (0).css ('display', 'none');
		},
		showAll: function ()
		{
			const check = Tools.getValue ('ResearchShowAll', true);
			Tools.setValue ('ResearchShowAll', !check);
			if (check)
			{
				$('#search_0').eq (0).css ('display', 'none');
				$('#search_1').eq (0).css ('display', 'none');
				$('#search_2').eq (0).css ('display', 'none');
				$('#search_3').eq (0).css ('display', 'none');
				$('.show_min_research').each (function () {this.style.display = ''});
			}
			else
			{
				$('#search_0').eq (0).css ('display', '');
				$('#search_1').eq (0).css ('display', '');
				$('#search_2').eq (0).css ('display', '');
				$('#search_3').eq (0).css ('display', '');
			}
		}
	}
	
	var PageAcademy =
	{
		init: function ()
		{
			if (!Tools.isCurrentPage ('Academy'))
				Tools.setValue ('ResearchPerHourTown', -1);
		},
		parse: function ()
		{
			if ($('#valueResearch').size () == 0)
				return;
			var research_value = $('#valueResearch').eq (0).text ();
			if (research_value.substr (0, 1) != '+')
				research_value = 0;
			else
				research_value = parseInt (research_value.substr (1));
			
			var old_research = Tools.getValue ('ResearchPerHourTown');
			var all_research = Tools.getValue ('ResearchPerHour');
			var new_all_research = all_research;
			if (old_research != -1)
			{
				new_all_research += research_value - old_research;
				Tools.setValue ('ResearchPerHour', Math.max (0, new_all_research));
			}
			Tools.setValue ('ResearchPerHourTown', research_value);
		}
	}
	
	var PageResearch =
	{
		parse: function ()
		{
			var searchName = new Array ();
			var h4Tags = $('#currentResearch h4');
			for (var i = 0; i < h4Tags.size (); i++)
			{
				var name = Tools.trim (h4Tags.eq (i).text ());
				searchName.push (name + ':');
			}
			
			var researchType = 0;
			
			const earn_points = Tools.getNumber ($('li.points').eq(0).text ().split (': ')[1]);
			Tools.setValue ('ResearchEarnPoints', '0' + earn_points);
			const per_hour = Tools.getNumber ($('li.time').eq(0).text ().split (': ')[1]);
			Tools.setValue ('ResearchPerHour', per_hour);
			
			var researches = $('ul.researchTypes li.researchType');
			for (var i = 0; i < researches.length; i++)
			{
				var pts = -2;
				if (researches.eq (i).find ('li.researchPoints').size () != 0)
					pts = Tools.getNumber (researches.eq (i).find ('li.researchPoints').eq (0).text ());
				
				if (pts >= 0)
					searchName[researchType] += pts;
				else if (researches.eq (i).find ('div.researchButton').size () != 0)
					searchName[researchType] += '-1';
				else
					searchName[researchType] += '-2';
					researchType++;
			}
			
			Tools.setValue ('ResearchMarine', searchName[0]);
			Tools.setValue ('ResearchEconomy', searchName[1]);
			Tools.setValue ('ResearchScience', searchName[2]);
			Tools.setValue ('ResearchArmy', searchName[3]);
		}
	
	}
	
	var Research =
	{
		addOption: function ()
		{
			Options.addModule ('Recherche', Tools.getValue ('ResearchShow', true), Actions.activate);
			const show = Tools.getValue ('ResearchShowPage', '').indexOf (Options.current_page) != -1;
			Options.addOption ('Recherche', 'check_cette page: afficher', show, Actions.show);
			const showAll = Tools.getValue ('ResearchShowAll', true);
			Options.addOption ('Recherche', 'check_tout afficher', showAll, Actions.showAll);
		},
		addCookie: function ()
		{
			Cookies.addCookie ('ResearchShow', true);
			Cookies.addCookie ('ResearchShowPage', '|researchAdvisor|city|Academy|');
			Cookies.addCookie ('ResearchShowAll', true);
			Cookies.addCookie ('ResearchPerHour', -1);
			Cookies.addCookie ('ResearchPerHourTown', -1);
			Cookies.addCookie ('ResearchEarnPoints', '00');
			Cookies.addCookie ('ResearchMarine', 'unknown:0');
			Cookies.addCookie ('ResearchEconomy', 'unknown:0');
			Cookies.addCookie ('ResearchScience', 'unknown:0');
			Cookies.addCookie ('ResearchArmy', 'unknown:0');
		},
		createInfo: function ()
		{
			this.insertCSSRule ();
			if ($('#research_script').size () != 0 || $('div.dynamic').size == 0)
				return;
			var menu = $('div.dynamic').eq (0).clone (true);
			menu.attr({'id': 'research_script'})
				.find ('h3')
					.text ('Temps de recherche')
					.click(Actions.unCheckThis)
			;
			menu.find ('.content').remove ();
			const show = Tools.getValue ('ResearchShowPage', '').indexOf (Options.current_page) != -1;
			if (Tools.getValue ('ResearchShow') == false || show == false)
				menu.css ('display', 'none');
			$('div.dynamic').eq ($('div.dynamic').size () - 1).after (menu);
			
			const per_hour = Tools.getValue ('ResearchPerHour');

			if (per_hour < 0)
			{
				$('#research_script h3').after ('<p class="new_script">Allez sur la page Recherche</p>');
				return;
			}
			else if (per_hour == 0)
			{
				$('#research_script h3').after ('<p class="no_scientist">Vos chercheurs font grève</p>');
				return;
			}
			var elts = new Array ();
			var research = Tools.getValue ('ResearchMarine').split (':');
			elts.push (research[0]);
			elts.push (research[1]);
			var research = Tools.getValue ('ResearchEconomy').split (':');
			elts.push (research[0]);
			elts.push (research[1]);
			var research = Tools.getValue ('ResearchScience').split (':');
			elts.push (research[0]);
			elts.push (research[1]);
			var research = Tools.getValue ('ResearchArmy').split (':');
			elts.push (research[0]);
			elts.push (research[1]);
			
			const earn_pts = parseFloat(Tools.getValue ('ResearchEarnPoints').substr (1));
			var who_show = -1;
			for (var i = 3; i >= 0; i--)
			{
				var curr = parseInt (elts[2 * i + 1]);
				if (curr > 0)
					who_show = who_show <= 0 ? curr : Math.min (curr, who_show);
			}
			const only_min = Tools.getValue ('ResearchShowAll') == false;
			
			for (var i = 3; i >= 0; i--)
			{
				var time_content = 'construction impossible';
				var time = Math.floor ((parseFloat (elts[2 * i + 1], 10) - earn_pts) * 3600 / per_hour);

				var show_min = false;
				if (parseInt (elts[2 * i + 1]) > 0)
				{
					if (time < 0)
					{
						time_content = 'construction possible';
						show_min = true;
					}
					else
					{
						show_min = (who_show > 0 && parseInt (elts[2 * i + 1]) <= who_show);
						time_content = DateTime.toString2 (time);
					}
				}
				var content = $('<div></div>')
					.attr({'id': 'search_' + i})
					.css ('display', show_min || !only_min? '':'none' );
				if (show_min)
					content.addClass ('show_min_research');
				content.append ($('<span></span'));
				content.find ('span').eq (0).text (elts[2*i])
						.addClass ('researchName');
				content.append (document.createElement ('br'));
				content.append ($('<span></span'))
				content.find ('span').eq (1)
						.attr({
							'id': 'research_' + i,
							'rel': time})
						.text (time_content);
				$('#research_script h3').after (content);
			}
		},
		insertCSSRule: function ()
		{
			Tools.insertCSSRule ('#research_script {text-align:center;}');
			Tools.insertCSSRule ('#research_script p.new_script {color: #FF0000; font-weight:bold; font-size:14px}');
			Tools.insertCSSRule ('#research_script p.no_scientist {color: #990000;}');
			Tools.insertCSSRule ('#research_script .researchName {color: #993300;font-weight:bold}');
		},
		updateCookies: function ()
		{
			var earn = parseFloat (Tools.getValue ('ResearchEarnPoints').substr (1));
			var per_hour = Tools.getValue ('ResearchPerHour');
			if (per_hour == 0)
				return;

			var spend = DateTime.current_time - DateTime.previous_time;
			earn += (spend * per_hour) / (3600 * 1000);
			Tools.setValue ('ResearchEarnPoints', '0' + earn);
		}
	}
	
	var TimeOut =
	{
		updateResearchTime: function ()
		{
			var time = (new Date ()).getTime () - DateTime.current_time;
			time = Math.round (time / 1000);
			for (var i =0; i < 4; i++)
			{
				if ($('#research_' + i).size() == 0 || $('#research_' + i).eq(0).attr ('rel') < 0)
					continue;
				var time_left = parseInt ($('#research_' + i).eq(0).attr ('rel')) - time;
				
				$('#research_' + i).eq(0).text (DateTime.toString2 (time_left));
			}
			setTimeout (TimeOut.updateResearchTime, 1000);
		}
	
	}
	
	Research.addCookie ();
	Research.addOption ();
	Research.updateCookies ();
	PageAcademy.init ();
	
	if (Tools.isCurrentPage('researchAdvisor'))
		PageResearch.parse ();
	else if (Tools.isCurrentPage ('Academy'))
		PageAcademy.parse ();
	
	Research.createInfo ();
	TimeOut.updateResearchTime ();
}

if (window.navigator.userAgent.indexOf('Chrome') > -1 && window.google)
	document.location.href = 'javascript:('+IkariamResearch+')();void(0);';
else
	IkariamResearch();