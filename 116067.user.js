// JavaScript Document
// ==UserScript==
// @name           Tool Messaggi Ikariam v2
// @autor          holyschmidt (MOD By Destructor3) (http://userscripts.org/users/50784)
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @homepage       http://userscripts.org/scripts/show/83061
// @description    Collezione di utilities per i messaggi.
// @include        http://s*.ikariam.*/index.php*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require        http://www.betawarriors.com/bin/gm/57377user.js
// @require        http://www.betawarriors.com/bin/gm/57756user.js
// @require        http://www.betawarriors.com/bin/gm/62718user.js 
// @version        0.06
// @exclude        http://board.ikariam.*/*
// @exclude        http://support*.ikariam.*/*
//
// @history        0.06MOD Aggiunto supporto alla lingua italiana, implementati nuovi colori.
// @history        0.06 Fixed bug in "global" circular button.
// @history        0.04 Removed unrequired dependency.
// @history        0.03 Added circular button options.
// @history        0.02 Unread priority messages were not bolded.
// @history        0.01 Initial Version.
//
// ==/UserScript==

ScriptUpdater.check(83061, "0.06");
 
Config.prefix = document.domain;
//Config.footerHtml = '<div>Help support this script\'s continued development &nbsp; &nbsp; <a target="_blank" href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=B8E3NFWUXUH4W&lc=US&item_name=holyschmidt%20scripting%20services&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_LG%2egif%3aNonHosted"><img src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif" style="vertical-align:middle;" title="Suggested donatioation $5-$10 but any and all amounts are appreciated"></a></div>';
Config.reloadOnSave = true;
Config.scriptName = "Tool Messaggi v2";
Config.settings = {
	"Bottoni":{
		fields:{
			globalCircular:{
				type:'checkbox',
				label:'Globale',
				text:'Mostra Bottone per l\'invio di circolare',
				value:true,
			},
			messageCircular:{
				type:'checkbox',
				label:'Risposta in circolare',
				text:'Mostra il bottone di risposta tramite circolare',
				value:true,
			},
		},
	},
	"Evidenziatore":{
		fields:{
			messageHighlighting:{
				type:'checkbox',
				label:'Attivato',
				text:'Attivare la funzione di evidenziatore?',
				value:true,
			},
			Spazio1:{
				type:'html',
				label:'',
				text:'',
				value:'</br>',
			},
			priorityBgColor:{
				type:'select',
				label:'Colore Lista 1',
				text:'Colore per i giocatori della prima lista',
				options:{
					'Blu':'#728FCE',
					'Azzurro':'#B3F0F0',					
					'Verde Scuro':'#4E8975',
					'Verde Erba':'#4DB549',
					'Giallo':'#FFFF00',
					'Arancione':'#EAAA5C',
					'Rosso':'#F62817',
					'Rosa':'#ECB8B8',	
					'Viola':'#A987E3',
				},
				value:'#4E8975',
			},
			priorityPlayers:{
				type:'text',
				label:'Giocatori',
				text:'Giocatori Lista 1 (separati da una virgola).',
				value:'',
			},
			Spazio2:{
				type:'html',
				label:'',
				text:'',
				value:'</br></br>',
			},
			priorityBgColor2:{
				type:'select',
				label:'Colore Lista 2',
				text:'Colore per i giocatori della seconda lista',
				options:{
					'Blu':'#728FCE',
					'Azzurro':'#B3F0F0',					
					'Verde Scuro':'#4E8975',
					'Verde Erba':'#4DB549',
					'Giallo':'#FFFF00',
					'Arancione':'#EAAA5C',
					'Rosso':'#F62817',
					'Rosa':'#ECB8B8',	
					'Viola':'#A987E3',									
				},
				value:'#4E8975',
			},
			priorityPlayers2:{
				type:'text',
				label:'Giocatori',
				text:'Giocatori Lista 2 (separati da una virgola).',
				value:'',
			},
			Spazio3:{
				type:'html',
				label:'',
				text:'',
				value:'</br></br>',
			},
			priorityBgColor3:{
				type:'select',
				label:'Colore Lista 3',
				text:'Colore per i giocatori della terza lista',
				options:{
					'Blu':'#728FCE',
					'Azzurro':'#B3F0F0',					
					'Verde Scuro':'#4E8975',
					'Verde Erba':'#4DB549',
					'Giallo':'#FFFF00',
					'Arancione':'#EAAA5C',
					'Rosso':'#F62817',
					'Rosa':'#ECB8B8',	
					'Viola':'#A987E3',									
				},
				value:'#4E8975',
			},
			priorityPlayers3:{
				type:'text',
				label:'Giocatori',
				text:'Giocatori Lista 3 (separati da una virgola).',
				value:'',
			},
			Spazio4:{
				type:'html',
				label:'',
				text:'',
				value:'</br></br>',
			},
			priorityBgColor4:{
				type:'select',
				label:'Colore Lista 4',
				text:'Colore per i giocatori della quarta lista',
				options:{
					'Blu':'#728FCE',
					'Azzurro':'#B3F0F0',					
					'Verde Scuro':'#4E8975',
					'Verde Erba':'#4DB549',
					'Giallo':'#FFFF00',
					'Arancione':'#EAAA5C',
					'Rosso':'#F62817',
					'Rosa':'#ECB8B8',	
					'Viola':'#A987E3',									
				},
				value:'#4E8975',
			},
			priorityPlayers4:{
				type:'text',
				label:'Giocatori',
				text:'Giocatori Lista 4 (separati da una virgola).',
				value:'',
			},
		},
	},
	"Info":{
		html:'	<p><a href="http://userscripts.org/scripts/show/' + ScriptUpdater.scriptId + '" target="_blank" style="font-weight:bold !important;">' +
				Config.scriptName + ' v' + ScriptUpdater.scriptCurrentVersion +
				'</a> by <a href="http://userscripts.org/users/holyschmidt" target="_blank">holyschmidt</a>, versione MOD by Destructor3\
				<p>Questo script permette di evidenziare i messaggi di quei giocatori "più importanti", come il proprio Leader, e di separare i giocatori in "liste" da colorare in modi diversi</p>',
		fields:{
			debugMode:{
				type:'checkbox',
				label:'Modalità Debug',
				text:'Mostra tempo di esecuzione script',
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
			'#728FCE':'#4863A0', // Blu(leggero)
			'#4E8975':'#306754', // Verde(leggero)
			'#F62817':'#C11B17', // Rosso(leggero)
			'#FFFF00':'#C8B560', // Giallo(leggero)
			'#4DB549':'#268722', // Verde Chiaro(leggero)
			'#ECB8B8':'#EC8080', // Rosa(leggero)
			'#B3F0F0':'#3DEEEE', // Azzurro(leggero)
			'#EAAA5C':'#E5830C', // Arancione(leggero)		
			'#A987E3':'#793EDF', // Viola(leggero)
			
			
						
		},
	},
	init:function()
	{
		IkaTools.addOptionsLink("Tool Messaggi v2");
		switch ($('body').attr('id'))
		{
		case 'diplomacyAdvisor':
			Messages.stylize();
			Messages.stylize2();
			Messages.stylize3();
			Messages.stylize4();
			Messages.addButtons();
			Messages.highlight();
			Messages.highlight2();
			Messages.highlight3();
			Messages.highlight4();
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
					'<a class="button" href="?view=sendIKMessage&msgType=51&allyId=' + Messages.ally + '" title="Nuova Circolare">' +
					'Invia Circolare' +
					'</a>' +
					'</div>'
				);
			}
			else {
				$('td.selection').prepend(
					'<div style="width:50%; float:right; text-align:right;">' +
					'<a class="button" href="?view=diplomacyAdvisorAlly" title="Non conosco la tua alleanza. Click per salvare.">' +
					'Salva Alleanza (solo la prima volta)' +
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
						$('a.button:eq(0)', this).after(' <a class="button" href="' + url + '" title="Rispondi a tutti">Rispondi in Circolare</a>');
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
	highlight2:function()
	{
		if (Config.get('messageHighlighting'))
		{
			var priorityPlayers = Config.get('priorityPlayers2');
			$('#messages tr.entry').each(function() {
				var player = $("td a[href='#']", this).text();
				if (priorityPlayers.indexOf(player) >= 0) {
					$(this).addClass('IkariamPriorityMessages2');
					$(this).click(function() {
						if (!$(this).hasClass('IkariamPriorityMessages2')) {
							$(this).addClass('IkariamPriorityMessages2');
						}
					});
				}
			});
		}
	},
	highlight3:function()
	{
		if (Config.get('messageHighlighting'))
		{
			var priorityPlayers = Config.get('priorityPlayers3');
			$('#messages tr.entry').each(function() {
				var player = $("td a[href='#']", this).text();
				if (priorityPlayers.indexOf(player) >= 0) {
					$(this).addClass('IkariamPriorityMessages3');
					$(this).click(function() {
						if (!$(this).hasClass('IkariamPriorityMessages3')) {
							$(this).addClass('IkariamPriorityMessages3');
						}
					});
				}
			});
		}
	},
	highlight4:function()
	{
		if (Config.get('messageHighlighting'))
		{
			var priorityPlayers = Config.get('priorityPlayers4');
			$('#messages tr.entry').each(function() {
				var player = $("td a[href='#']", this).text();
				if (priorityPlayers.indexOf(player) >= 0) {
					$(this).addClass('IkariamPriorityMessages4');
					$(this).click(function() {
						if (!$(this).hasClass('IkariamPriorityMessages4')) {
							$(this).addClass('IkariamPriorityMessages4');
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
	stylize2:function()
	{
		var color = Config.get('priorityBgColor2');
		GM_addStyle(
			'.IkariamPriorityMessages2:hover { cursor:pointer; background-color: ' + Messages.ColorSwatch.hover[color] + '; }' +
			'.IkariamPriorityMessages2 { background-color: ' + color + '; }'
		);
	},
	stylize3:function()
	{
		var color = Config.get('priorityBgColor3');
		GM_addStyle(
			'.IkariamPriorityMessages3:hover { cursor:pointer; background-color: ' + Messages.ColorSwatch.hover[color] + '; }' +
			'.IkariamPriorityMessages3 { background-color: ' + color + '; }'
		);
	},
	stylize4:function()
	{
		var color = Config.get('priorityBgColor4');
		GM_addStyle(
			'.IkariamPriorityMessages4:hover { cursor:pointer; background-color: ' + Messages.ColorSwatch.hover[color] + '; }' +
			'.IkariamPriorityMessages4 { background-color: ' + color + '; }'
		);
	},
	
}

Messages.init();
