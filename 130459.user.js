// JavaScript Document
// ==UserScript==
// @name           Ikariam Tool Circolari
// @autor          Paolo19JD
// @license        Privata By Paolo19JD
// @homepage       /
// @description    Send Quick Circular Messagge
// @include        http://s*.ikariam.*/index.php*
// @include        http://s*.ikariam.*/index.php*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require        http://www.betawarriors.com/bin/gm/57377user.js
// @require        http://www.betawarriors.com/bin/gm/57756user.js
// @require        http://www.betawarriors.com/bin/gm/62718user.js 
// @version        0.01
// @exclude        http://board.ikariam.*/*
// @exclude        http://support*.ikariam.*/*
// @history        0.01 Initial Version.
//
// ==/UserScript==

ScriptUpdater.check(83061, "0.06");
 
Config.prefix = document.domain;
Config.reloadOnSave = true;
Config.scriptName = "Messages Utilities v2";
Config.settings = {
	"Buttons":{
		fields:{
			globalCircular:{
				type:'checkbox',
				label:'Global',
				text:'Show global circular button',
				value:true,
			},
			messageCircular:{
				type:'checkbox',
				label:'Resource Links',
				text:'Show single message circular button',
				value:true,
			},
		},
	},
	"Highlighting":{
		fields:{
			messageHighlighting:{
				type:'checkbox',
				label:'Enabled',
				text:'Enable message highlighting?',
				value:true,
			},
			priorityBgColor:{
				type:'select',
				label:'Color',
				text:'What is the background color be of priority messages?',
				options:{
					'Blue':'#728FCE',
					'Green':'#4E8975',
					'Red':'#F62817',
					'Yellow':'#FFFF00',
				},
				value:'#4E8975',
			},
			priorityPlayers:{
				type:'text',
				label:'Players',
				text:'Highlighted players (comma separated).',
				value:'',
			},
		},
	},
	"About":{
		html:'	<p><a href="http://userscripts.org/scripts/show/' + ScriptUpdater.scriptId + '" target="_blank" style="font-weight:bold !important;">' +
				Config.scriptName + ' v' + ScriptUpdater.scriptCurrentVersion +
				'</a> by <a href="http://userscripts.org/users/holyschmidt" target="_blank">holyschmidt</a>\
				<p>This script is used to highlight messages containing specific keywords or those from \"high-priority\" players.</p>',
		fields:{
			debugMode:{
				type:'checkbox',
				label:'Debug Mode',
				text:'show script execution time',
				value:false,
			}
		}
	}
	
}

Messages = 
{
	ally:GM_getValue(Config.prefix + '.alliance', false),
	ColorSwatch:{
		hover:{
			'#728FCE':'#4863A0', // Blue(ish)
			'#4E8975':'#306754', // Green(ish)
			'#F62817':'#C11B17', // Red(ish)
			'#FFFF00':'#C8B560', // Yellow(ish)
		},
	},
	init:function()
	{
		IkaTools.addOptionsLink("Messages Utilities v2");
		switch ($('body').attr('id'))
		{
		case 'diplomacyAdvisor':
			Messages.stylize();
			Messages.addButtons();
			Messages.highlight();
		break;
		case 'diplomacyAdvisorAlly':
			Messages.saveAlliance();
		break;
		}
	},
	addButtons:function()
	{
		if (Config.get('globalCircular')) {
			if (Messages.ally) {
				$('td.selection').prepend(
					'<div style="width:50%; float:right; text-align:right;">' +
					'<a class="button" href="?view=sendIKMessage&msgType=51&allyId=' + Messages.ally + '" title="New Circular">' +
					'<b>New Circular</b>' +
					'</a>' +
					'</div>'
				);
			}
			else {
				$('td.selection').prepend(
					'<div style="width:50%; float:right; text-align:right;">' +
					'<a class="button" href="?view=diplomacyAdvisorAlly" title="Alliance unknown. Click to save.">' +
					'<b>Save Alliance</b>' +
					'</a>' +
					'</div>'
				);
			}
		}
		if (Config.get('messageCircular') && Messages.ally) {
			$('tr.text td.reply').each(function() {
				$('span:eq(0)', this).each(function() {
					if ($("a[title='Answer All']", this).size() == 0) {
						var url = $('a:get(0)', this).attr('href').replace(/receiverId=[0-9]*/, 'allyId=' + Messages.ally) + '&msgType=51';
						$('a.button:eq(0)', this).after(' <a class="button" href="' + url + '" title="Answer All">Circular</a>');
					}
				});
			});
		}
	},
	highlight:function()
	{
		if (Config.get('messageHighlighting'))
		{
			var priorityPlayers = Config.get('priorityPlayers');
			$('#messages tr.entry').each(function() {
				var player = $("td a[href='#']", this).text();
				if (priorityPlayers.indexOf(player) >= 0) {
					$(this).addClass('IkariamPriorityMessages');
					$(this).click(function() {
						if (!$(this).hasClass('IkariamPriorityMessages')) {
							$(this).addClass('IkariamPriorityMessages');
						}
					});
				}
			});
		}
	},
	saveAlliance:function()
	{
		GM_setValue(Config.prefix + '.alliance', $("a[href*='allyId=']").attr('href').match(/allyId=[0-9]*/).join('').replace('allyId=',''));
	},
	stylize:function()
	{
		var color = Config.get('priorityBgColor');
		GM_addStyle(
			'.IkariamPriorityMessages:hover { cursor:pointer; background-color: ' + Messages.ColorSwatch.hover[color] + '; }' +
			'.IkariamPriorityMessages { background-color: ' + color + '; }'
		);
	},
}

Messages.init();