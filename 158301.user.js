// ==UserScript==
// @name           Planejador
// @namespace      www.pointdownloads.net
// @description    This script will give you many premium features and lots more - Tribalwars Premium Hack 2013 Official: Arabic (العربية), Czech (Český), Dutch (Nederlands), English, Portuguese (Português).
// @autor          FernandoXLR
// @updateURL      http://http://userscripts.org/scripts/review/158301.meta.js
// @downloadURL    http://http://userscripts.org/scripts/review/158301.user.js
// @include        http*://*.die-staemme.de/*
// @include        http*://*.staemme.ch/*
// @include        http*://*.tribalwars.net/*
// @include        http*://*.tribalwars.nl/*
// @include        http*://*.plemiona.pl/*
// @include        http*://*.tribalwars.se/*
// @include        http*://*.tribalwars.com.br/*
// @include        http*://*.tribos.com.pt/*
// @include        http*://*.divokekmeny.cz/*
// @include        http*://*.bujokjeonjaeng.org/*
// @include        http*://*.triburile.ro/*
// @include        http*://*.voyna-plemyon.ru/*
// @include        http*://*.fyletikesmaxes.gr/*
// @include        http*://*.tribalwars.no.com/*
// @include        http*://*.divoke-kmene.sk/*
// @include        http*://*.klanhaboru.hu/*
// @include        http*://*.tribalwars.dk/*
// @include        http*://*.plemena.net/*
// @include        http*://*.tribals.it/*
// @include        http*://*.klanlar.org/*
// @include        http*://*.guerretribale.fr/*
// @include        http*://*.guerrastribales.es/*
// @include        http*://*.tribalwars.fi/*
// @include        http*://*.tribalwars.ae/*
// @include        http*://*
// @include        http*://*.tribalwars.co.uk/*
// @include        http*://*.vojnaplemen.si/*
// @include        http*://*.genciukarai.lt/*
// @include        http*://*.wartribes.co.il/*
// @include        http*://*.plemena.com.hr/*
// @include        http*://*.perangkaum.net/*
// @include        http*://*.tribalwars.jp/*
// @include        http*://*.tribalwars.bg/*
// @include        http*://*.tribalwars.asia/*
// @include        http*://*.tribalwars.us/*
// @include        http*://*.tribalwarsmasters.net/*
// @include        http*://*.perangkaum.net/*
// @version        3.2.0.037
// @grant          none
// ==/UserScript==
/*!
 * Relaxeaza Tribal Wars Advanced v1.6
 * Release 09/01/13.
 * relaxeaza.tw@gmail.com
 *
 * v1.1 03/02/12
 * novo: Função para renomear relatórios.
 * novo: Função para renomear comandos na visualização.
 * alterado: Largura do display de configuração aumentada para melhor visualização.
 * bugfix: Erros de digitação na ajuda no display de configuração.
 * novo: Adicionada checkboxes para poder renomear apenas aldeias selecionadas.
 * novo: Filtro de aldeias na visualização.
 * novo: Contador de tropas em visualizações > tropas.
 * novo: Função para calcular recursos exatos em uma aldeia apartir de um relatório de espionagem.
 *
 * v1.2 07/02/12
 * novo: Assistente de Farm automático.
 * alterado: Algumas melhoras na performance do script.
 *
 * v1.3 22/02/12
 * novo: Construção e demolição em massa.
 * novo: Função para cancelar todas as construções/demolições.
 * novo: Farmador automatico.
 * bugfix: Bug ao mostrar a pontuação mínima/máxima da função de obter coordenadas.
 * novo: Atalho para ataque direto na função de calcular recursos.
 * novo: Imagem indicando que o script está trabalhando ao renomear aldeias/relatórios/comandos.
 * novo: Função para selecionar aldeias por rácio de tropas de ataque e defesa.
 * novo: Pesquisa em Massa.
 * novo: Opção para cancelar todas as pesquisas.
 *
 * v1.3.1 24/02/12
 * alterado: Assistente de Farm -> Os ataques começam mais rapido quando o Assistente de Farm é iniciado.
 * novo: Assistente de Farm -> Mostrará o log dos ataques enquanto são enviados.
 * bugfix: Engine -> Erro em algumas funções quando usado apartir do Modo de Férias
 *
 * v1.3.2 24/05/12
 * alterado: Configurações -> Layout do tooltip de ajuda no display configurações.
 * novo: Função de lembrete.
 * alterado: Coletor de Coordenadas -> Cores dos identificadores de coletor de coordenadas foram alteradas para melhor visualização.
 * alterado: Coletor de Coordenadas -> Agora as configurações de pontuação mínima e máxima das funções de obter coordenadas no mapa e no perfil de jogadores são configuradas na própria página.
 * novo: Alterador de Grupos -> Agora é possivel alterar os grupos das aldeias em qualquer modo de visualização
 * novo: Planeador de Ataques -> Envio de ataques em horários programados.
 * alterado: Assistente de Farm -> Agora o assistent de farm também usa a opção C quando disponível.
 *
 * v1.3.3 04/08/12
 * novo: Selecionador -> Função para selecionar aldeias especificas na visualização, como aldeias com tropas de ataque, defesa, etc.
 * novo: Mensagens -> Area para troca de mensagens com o desenvolvedor. (perguntas, sugestões...)
 *
 * v1.3.4 15/08/12
 * alterado: Mensagens -> Forma para troca de mensagens com o desenvolvedor foi melhorada.
 *
 * v1.4 19/08/12
 * alterado: Planeador de Ataques -> No campo Horário o valor é sempre o último horário inserido.
 * alterado: Planeador de Ataques -> Ao adicionar as coordenadas da aldeia atacante automaticamente será adicionada todas as tropas da aldeia nos campos das unidades.
 * novo: Planeador de Ataques -> Agora é possivel adicionar apoio aos ataques programados.
 * novo: Planeador de Ataques -> Foi adicionado um log de comandos para melhor visualização dos ataques/apoios e ataques com problemas.
 * alterado: Mensagens -> A troca de mensagens deixou de ser "Contato" para "Mensagens".
 * alterado: Mensagens -> Proteção contra envio de multiplas mensagens (spam).
 * alterado: Coletor de Coordenadas Manual -> Ao clicar em uma aldeia que já foi selecionada, ela será removidada da lista de coordenadas.
 * alterado: Engine -> Os icones das ferramentas que são usadas em qualquer página do jogo foram movidas para uma barra independente.
 * alterado: Farmador Automático -> Deixará de ser executado apenas na Praça e o modo de uso será parecido com o Planeador de Ataques.
 * alterado: Farmador Automático -> Agora o Farmador Automático pode ser executado de qualquer página do jogo.
 * alterado: Farmador Automático -> O design foi reformulado.
 *
 * v1.4.1 20/08/12
 * novo: Farmador Automático -> Foi adicionado um log de ataques.
 *
 * v1.4.2 21/08/12
 * bugfix: Farmador Automático -> O problema do "Não há tropas na aldeia" foi solucionado.
 * bugfix: Farmador Automático -> O problema da opção "Caso não tenha tropas usar o que tiver" foi solucionado.
 *
 * v1.4.3 22/08/12
 * bugfix: Farmador Automático -> Problema na detecção do tempo em que as tropas em andamento retornariam arrumado.
 *
 * v1.4.4 26/08/12
 * bugfix: Construtor Automático -> Problema que cancelava todas ordens de contruções foi concertado.
 * novo: Area exclusiva para sugestões para o script.
 *
 * v1.4.5 27/08/12
 * novo: Visualização Avançada -> Adiciona ferramentas premium na página de visualização para jogadores sem conta premium.
 *
 * v1.5 05/09/12
 * novo: Renomeador de Aldeias -> Agora é possivel renomear aldeias em massa e aldeias individuais em contas sem premium.
 * novo: Renomeador de Aldeias -> Máscaras foram adicionadas para ter mais opções de manipulação dos nomes das aldeias (apenas para usuarios sem premiumm, por enquanto).
 * novo: Visualização Avançada -> Modo "Combinado" foi adicionado aos modos de visulização (sem premium).
 * bugfix: Farmador Automático -> Problema que não dava continuidade aos ataques após retornarem foi concertado.
 *
 * v1.5.1 06/10/12
 * removido: Sugestões -> Por falta de um servidor próprio.
 * removido: Mensagens -> Por falta de um servidor próprio.
 * bugfix: O script não estava funcionando em outros servidores além de br/pt. Agora está funcionando.
 *
 * v1.6 09/01/13
 * removido: Bloco de notas.
 * removido: Opção de "enviar o que tiver" do AutoFarm foi retirado.
 * novo: Opção para ativar e desativar o AutoFarm.
 * novo: Anti-Ban -> Foi adicionado o Tempo Aleatório no AutoFarm, opção que faz com que o tempo entre um ataque e o outro fique entre 0-10 segundos, simulando um jogando normal.
 * novo: Anti-Ban -> Adicionado junto ao AutoFarm sistema que carrega páginas aleatórias do jogo, simulando um jogando normal.
 * novo: varias melhoras de performace adicionada ao script, trabalhando com varias aldeias mais facilmente.
 * novo: Na visualização de aldeias foi adicionado um checkbox para selecionar todos os outros checkbox.
 * bugfix: Na visualização combinada para não premiuns apenas mostrava as tropas recrutadas no quartel e não as do estabulo/oficina.
 * bugfix: Alguns bugs das visualizações para jogadores sem premium foram reparados.
 * bugfix: Gerador de mapas na classificação não estava funcionando. Arrumado.
 * bugfix: Calculador de recursos apartir dos relatorios foi reformulado.
 */

win = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
$ = win.jQuery;

version = '3.2.0.037';
if (win.game_data != null) win.game_data.version_hack = version;

function trim(str) {
	return str.replace(/^\s+|\s+$/g, "");
}

function sleep(milliSeconds){
	var startTime = new Date().getTime();
	while (new Date().getTime() < startTime + milliSeconds);
}


(function() {
	// elemento do tempo atual do jogo
	var $serverTime = jQuery( '#serverTime' ),
	// elemento da data atual do jogo
	$serverDate = jQuery( '#serverDate' ),
	// conteudo da página atual do jogo
	$contentValue = jQuery( '#content_value' ),
	// pega o "modo" que esta na página de visualização de aldeias
	overview = ( document.getElementById( 'overview' ) || { value: 'production' }).value,
	// elemento do tooltip usado no script
	$tooltip = jQuery( '<div id="twa-tooltip" style="position:absolute;display:none;z-index:9999;background:#111;color:#ccc;padding:4px;-webkit-border-radius:2px;-moz-border-radius:2px;box-shadow:1px 1px 3px #333"/>' ).appendTo( 'body' ),
	// tabela com as funções utilizadas na visualização de aldeias
	$overviewTools;
	
	var twa = {
		// versão atual do script
		version: '1.6',
		// adiciona icones na barra de ferramentas do script
		addIcon: function( options ) {
			jQuery( 'table.twa-bar' ).show().find( '> tbody > tr' ).append( '<td><table class="header-border"><tbody><tr><td><table class="box menu nowrap"><tbody><tr><td class="box-item" style="height: 22px;">' + ( options.img ? '<img src="' + options.img + '" style="position:absolute">' : '' ) + '<a ' + ( options.img ? 'style="margin-left:17px" ' : '' ) + 'href="#" id="' + options.id + '">' + options.name + '</a></td></tr></tbody></table></td></tr><tr class="newStyleOnly"><td class="shadow"><div class="leftshadow"></div><div class="rightshadow"></div></td></tr></tbody></table></td>' );
			
			// caso o tamanho não seja definido é utilizado o tamanho do corpo da pagina
			var width = options.width ? options.width : $contentValue.width(),
			// conteudo exibido ao abrir
			content = jQuery( '<div id="' + options.id + '-content" class="popup_content" style="width:' + width + 'px;padding:5px;border:2px solid #840;z-index:999;display:none;position:absolute">' + options.html + '</div>' ).appendTo( document.body ).center().css( 'top', $contentValue.offset().top );
			
			// adiciona evento para abrir conteudo ao clicar no icone
			document.getElementById( options.id ).onclick = function() {
				content.toggle();
				
				return false;
			};
			
			return content;
		},
		storage: function( props, value, type ) {
			var name = type ? memory[ type ] : memory.settings;
			type = type ? 'data' : 'settings';
			
			if ( props === true ) {
				localStorage[ name ] = JSON.stringify( twa[ type ] );
			} else if ( typeof props === 'string' ) {
				if ( !value ) {
					return twa[ type ][ props ];
				} else {
					twa[ type ][ props ] = value;
					localStorage[ name ] = JSON.stringify( twa[ type ] );
					
					return value;
				}
			}
			
			return true;
		},
		url: function( screen, vid ) {
			return game_data.link_base_pure.replace( /village=\d+/, 'village=' + ( vid || game_data.village.id ) ) + screen;
		},
		ready: function( callback ) {
			var inits = 0,
				completes = 0;
			
			function ready() {
				if ( completes === inits ) {
					inits && twa.storage( true, null, 'data' );
					callback();
				}
			}
			
			if ( !twa.data.builds && ++inits ) {
				function buildNames() {
					twa.data.builds = {};
					
					$.get(twa.url( 'main' ), function( html ) {
						if ( jQuery( '#hide_completed:checked', html ).length ) {
							return $.post(jQuery( '#hide_completed', html ).attr( 'onclick' ).toString().split( "'" )[ 1 ], {
								hide_completed: false
							}, buildNames);
						}
						
						jQuery( '#buildings a:has(img[src*=buildings])', html ).each(function() {
							twa.data.builds[ jQuery( this ).text().trim() ] = this.href.match( /\=(\w+)$/ )[ 1 ];
						});
						
						ready( ++completes );
					});
				}
				
				buildNames();
			}
			
			if ( !twa.data.world && ++inits ) {
				twa.data.world = {};
				
				$.get('interface.php?func=get_config', function( xml ) {
					jQuery( 'config > *', xml ).each(function( index, elem ) {
						if ( index < 4 ) {
							twa.data.world[ elem.nodeName ] = jQuery( elem ).text();
						} else {
							jQuery( '*', elem ).each(function () {
								twa.data.world[ this.nodeName ] = Number( jQuery( this ).text() );
							});
						}
					});
					
					ready( ++completes );
				});
			}
			
			if ( !twa.data.units && ++inits ) {
				twa.data.units = {};
				
				$.get('interface.php?func=get_unit_info', function( xml ) {
					jQuery( 'config > *', xml ).each(function() {
						if ( this.nodeName !== 'militia' ) {
							twa.data.units[ this.nodeName ] = {
								speed: Math.round( Number( jQuery( 'speed', this ).text() ) ) * 60,
								carry: Number( jQuery( 'carry', this ).text() ),
								pop: Number( jQuery( 'pop', this ).text() )
							};
						}
					});
					
					ready( ++completes );
				});
			}
			
			ready();
		},
		config: function() {
			console.log( 'twa.config()' );
			
			jQuery( 'head' ).append('<style>' +
			'#di {background:#c1d9ff;border:1px solid #3a5774;font-family:arial;font-size:12px;padding:4px;position:absolute;z-index:99999}' +
			'#di textarea {border:1px solid #999;width:280px;height:80px;font-size:12px}' +
			'#di input[type="text"],#di select {border:1px solid #999;width:70px;margin:0 2px;font-size:12px}' +
			'#di button {border:1px solid #999;margin:3px}' +
			'#di .di {background:#fff;padding:5px}' +
			'#di a {color:blue;font-weight:400;text-decoration:underline}' +
			'#di h1 {background:#e4e4e4;border-bottom:1px solid #c4c4c4;border-top:1px solid #fff;color:#333;font-size:13px;font-weight:700;line-height:20px;margin:0;padding:0 7px}' +
			'#di p,#di label {margin:3px 0;display:block}' +
			'#he {background:#e0edfe;cursor:move;font-size:14px;font-weight:700;padding: 4px 20px 4px 10px}' +
			'#twa-tooltip{display:none;position:absolute;width:300px;padding:4px 4px 3px;background:#000;opacity:0.8;color:#fff;font-size:12px;border:1px solid #000;-moz-border-radius:2px;-webkit-border-radius:2px;border-radius:2px}' +
			'</style>' );
			
			// html da lista de linguagens disponiveis no script
			var langs = createStringList( '<select style="width:120px" name="lang">', languages, '</select>' ),
			// html do conteudo da tela de configurações
			html = '<div id="di" style="width:400px"><div id="twa-tooltip"></div><div id="he">' + lang.config.title.springf( twa.data.version ) + '</div><div id="co"><label>Language: ' + langs + '</label>',
			// lista de configurações para serem ativadas/desativadas
			settingList = {
				coords: [ 'mapcoords', 'profilecoords', 'mapidentify', 'mapmanual' ],
				graphicstats: [ 'rankinggraphic', 'allygraphic', 'profilestats' ],
				other: [ 'autofarm', 'lastattack', 'reportfilter', 'villagefilter', 'reportrename', 'commandrename', 'renamevillages', 'mapgenerator', 'reportcalc', 'troopcounter', 'assistentfarm', 'building', 'research', 'changegroups', 'attackplanner', 'selectvillages', 'overview' ]
			};
			
			for ( var item in settingList ) {
				var list = settingList[ item ];
				
				html += '<h1>' + lang.config[ item ] + '</h1><div class="di">';
				
				for ( var i = 0, name; i < list.length; name = list[ ++i ] ) {
					html += '<label tooltip="' + lang.config.tooltip[ list[ i ] ] + '"><input type="checkbox" name="' + list[ i ] + '"/> ' + lang.config[ list[ i ] ] + '</label>';
				}
				
				html += '</div>';
			}
			
			html += '<h1 style="text-align:center"><button id="sa">' + lang.config.save + '</button></h1></div></div>';
			
			// adiciona o html das configurações no corpo da pagina
			jQuery( 'body' ).append( html );
			
			// adiciona os dados das configurações nas entradas de configuração
			for ( var name in twa.settings ) {
				if ( name[ 0 ] !== '_' ) {
					document.getElementsByName( name )[ 0 ][ typeof twa.settings[ name ] === 'boolean' ? 'checked' : 'value' ] = twa.settings[ name ];
				}
			}
			
			// adiciona os tooltips de ajuda nas entradas de configuração
			jQuery( '#di [tooltip]' ).tooltip();
			
			// deixa a tela de configuração "arrastavel" e centralizado na tela
			jQuery( '#di' ).draggable({
				handle: '#he'
			}).center();
			
			// ao clicar no botão "Salvar" as configuração são salvas
			jQuery( '#sa' ).click(function() {
				jQuery( '#di input' ).each(function() {
					twa.settings[ this.name ] = this.type === 'checkbox' ? this.checked : this.value;
				});
				
				twa.settings.lang = jQuery( '[name=lang]' ).val();
				twa.storage( true );
				
				alert( lang.config.savealert );
			});
		},
		mapElement: function( data, css ) {
			var img = jQuery( '#map_village_' + data.vid );
			var pos = data.pos || [ 0, 0 ];
			
			var elem = jQuery( '<div/>' ).css($.extend(css, {
				top: Number( img.css( 'top' ).replace( 'px', '' ) ) + pos[ 0 ],
				left: Number( img.css( 'left' ).replace( 'px', '' ) ) + pos[ 1 ],
				zIndex: 10,
				position: 'absolute'
			}));
			
			data.id && elem.attr( 'id', data.id );
			data.html && elem.html( data.html );
			data.Class && elem.addClass( data.Class );
			css.borderRadius && elem.attr( 'style', elem.attr( 'style' ) + '-moz-border-radius:' + css.borderRadius + 'px;-webkit-border-radius:' + css.borderRadius + 'px' );
			
			img.parent().prepend( elem );
		},
		mapVillages: function( callback ) {
			var village;
			
			for ( var x = 0; x < TWMap.size[ 1 ]; x++ ) {
				for ( var y = 0; y < TWMap.size[ 0 ]; y++ ) {
					var coord = TWMap.map.coordByPixel( TWMap.map.pos[ 0 ] + ( TWMap.tileSize[ 0 ] * y ), TWMap.map.pos[ 1 ] + ( TWMap.tileSize[ 1 ] * x ) );
					
					if ( village = TWMap.villages[ coord.join( '' ) ] ) {
						village.player = TWMap.players[ village.owner ];
						
						if ( typeof village.points === 'string' ) {
							village.points = Number( village.points.replace( '.', '' ) );
						}
						
						callback.call( village, coord );
					}
				}
			}
		},
		mapCoords: {
			init: function() {
				console.log('twa.mapCoords()');
				
				jQuery( '#map_whole' ).after('<br/><table class="vis" width="100%" id="twa-getcoords"><tr><th>' + lang.mapcoords.getcoords + ' <a href="#" id="twa-mapcoords-refresh">» ' + lang.mapcoords.update + '</a></th></tr><tr><td style="text-align:center"><textarea style="width:100%;background:none;border:none;resize:none;font-size:11px"></textarea></td></tr><tr><td id="twa-getcoords-options"><label><input type="checkbox" name="_mapplayers"> ' + lang.mapcoords.mapplayers + '</label> ' + lang.mapcoords.min + ': <input name="_mapplayersmin" style="width:35px"> ' + lang.mapcoords.max + ': <input name="_mapplayersmax" style="width:35px"><br/><label><input name="_mapabandoneds" type="checkbox"> ' + lang.mapcoords.mapabandoneds + '</label> ' + lang.mapcoords.min + ': <input name="_mapabandonedsmin" style="width:35px"> ' + lang.mapcoords.max + ': <input name="_mapabandonedsmax" style="width:35px"></td></tr></table>' );
				
				var timeout;
				
				jQuery( '#twa-getcoords-options input' ).each(function() {
					this[ this.type === 'checkbox' ? 'checked' : 'value' ] = twa.settings[ this.name ];
				}).change(function() {
					var elem = this;
					
					clearTimeout(timeout);
					
					timeout = setTimeout(function() {
						var value = elem[ elem.type === 'checkbox' ? 'checked' : 'value' ];
						
						twa.settings[ elem.name ] = elem.type === 'checkbox' ? value : Number( value );
						twa.storage( true );
					}, 1000);
				});
				
				jQuery( '#twa-mapcoords-refresh' ).click(function() {
					return twa.mapCoords._do();
				});
				
				twa.mapCoords._do();
			},
			_do: function() {
				var get;
				var coords = [];
				
				jQuery( '.twa-identify' ).remove();
				
				twa.mapVillages(function( coord ) {
					if ( this.owner === '0' ) {
						get = twa.settings._mapabandoneds && this.points > Number( twa.settings._mapabandonedsmin ) && this.points < Number( twa.settings._mapabandonedsmax );
					} else {
						get = twa.settings._mapplayers && this.points > Number( twa.settings._mapplayersmin ) && this.points < Number( twa.settings._mapplayersmax );
					}
					
					if ( get ) {
						coords.push( coord.join( '|' ) );
						
						if ( twa.settings.mapidentify ) {
							twa.mapElement({
								id: 'twa-mapcoords' + this.id,
								vid: this.id,
								Class: 'twa-identify',
								pos: [ twa.settings.lastattack && game_data.player.premium ? 15 : 25, 38 ]
							}, {
								width: 7,
								height: 7,
								borderRadius: 10,
								background: 'green',
								border: '1px solid #000',
								opacity: 0.7
							});
						}
					}
				});
				
				jQuery( '#twa-getcoords textarea' ).html( coords.join( ' ' ) );
				
				return false;
			}
		},
		mapManual: function() {
			console.log('twa.mapManual()');
			
			jQuery( '#map_whole' ).after( '<br/><table class="vis" width="100%" id="twa-mapmanual"><tr><th>' + lang.mapmanual.getcoords + '</th></tr><tr><td style="text-align:center"><textarea style="width:100%;background:none;border:none;resize:none;font-size:11px"></textarea></td></tr></table>' );
			
			var input = jQuery( '#twa-mapmanual textarea' );
			var coords = [];
			var village;
			
			TWMap.map._handleClick = function( event ) {
				var coord = this.coordByEvent( event );
				
				if ( village = TWMap.villages[ coord.join( '' ) ] ) {
					coord = coord.join('|');
					
					if ( coords.indexOf( coord ) < 0 ) {
						coords.push( coord );
						input.val( coords.join( ' ' ) );
						
						twa.mapElement({
							id: 'twa-manual-' + village.id,
							vid: village.id,
							Class: 'twa-mapmanual',
							pos: [ twa.settings.lastattack && game_data.player.premium ? 15 : 25, twa.settings.mapidentify ? 28 : 38 ]
						}, {
							width: 7,
							height: 7,
							borderRadius: 10,
							background: 'red',
							border: '1px solid #000',
							opacity: 0.7
						});
					} else {
						coords.remove( coords.indexOf( coord ) );
						input.val( coords.join( ' ' ) );
						jQuery( '#twa-manual-' + village.id ).remove();
					}
				}
				
				return false;
			}
		},
		profileCoords: function() {
			console.log( 'twa.profileCoords()' );
			
			var points;
			var coords = [];
			var tr = document.getElementById( 'villages_list' ).getElementsByTagName( 'tr' );
			
			for ( var i = 1; i < tr.length; i++ ) {
				if ( i + 1 === tr.length && !tr[ i ].getElementsByTagName( 'td' )[ 2 ] ) {
					break;
				}
				
				points = Number( tr[ i ].getElementsByTagName( 'td' )[ 2 ].innerHTML.replace( '<span class="grey">.</span>', '' ) );

				if ( points > twa.settings._profilecoordsmin && points < twa.settings._profilecoordsmax ) {
					coords.push( tr[ i ].getElementsByTagName( 'td' )[ 1 ].innerHTML );
				}
			}
			
			jQuery( '#villages_list' ).before( '<table class="vis" id="twa-profilecoords" width="100%"><tr><th>' + lang.profilecoords.everycoords + '</th></tr><tr><td><textarea style="width:100%;background:none;border:none;resize:none;font-size:11px">' + coords.join(' ') + '</textarea></td></tr><tr><td><label><input style="width:40px" name="_profilecoordsmin"/> ' + lang.profilecoords.min + '</label><br/><label><input style="width:40px" name="_profilecoordsmax"/> ' + lang.profilecoords.max + '</label></td></tr></table><br/>' );
			
			var timeout;
			
			jQuery( '#twa-profilecoords input ').each(function() {
				this.value = twa.settings[ this.name ];
			}).change(function() {
				var elem = this;
				
				clearTimeout( timeout );
				
				timeout = setTimeout(function () {
					twa.settings[ elem.name ] = Number( elem.value );
					twa.storage( true );
				}, 1000);
			});
		},
		profileGraphic: function() {
			console.log( 'twa.profileGraphic()' );
			
			var id = location.search.match( /id=(\d+)/ )[ 1 ];
			var mode = game_data.screen === 'info_player' ? 'player' : 'tribe';
			var url = 'http://' + game_data.world + '.tribalwarsmap.com/' + game_data.market + '/';
			var points = url + 'graph/p_' + mode + '/' + id;
			var oda = url + 'graph/oda_' + mode + '/' + id;
			var odd = url + 'graph/odd_' + mode + '/' + id;
			var html = '<table class="vis" width="100%" id="twa-graphic"><tr><th><a href="' + url + 'history/' + mode + '/' + id + '">' + lang.profilegraphic.stats + ' <img src="http://www.hhs.gov/web/images/exit_disclaimer.png"/></a></th></tr><tr><td style="text-align:center"><p><img src="' + points + '"/></p><img src="' + oda + '"/><p><img src="' + odd + '"/></p></td></tr></table>';
			
			mode === 'player' ? jQuery( '.vis:not([id^=twa]):eq(2)' ).after( '<br/>' + html ) : jQuery( '#content_value > table tr:first' ).append( '<td valign="top">' + html + '</td>' );
		},
		lastAttack: function() {
			console.log( 'twa.lastAttack()' );
			
			if ( !jQuery( '#show_popup' ).is( ':checked' ) || !jQuery( '#map_popup_attack' ).is( ':checked' ) ) {
				return false;
			}
			
			jQuery( '.twa-lastattack' ).remove();
			
			twa.mapVillages(function() {
				$.ajax({
					url: 'game.php?village=' + this.id + '&screen=overview&json=1&source=873',
					dataType: 'json',
					id: this.id,
					success: function( data ) {
						if ( data[ 0 ].attack ) {
							var last = data[ 0 ].attack.time.split( /\s[A-z]/ )[ 0 ].split( '.' );
							last = new Date( [ last[ 1 ], last[ 0 ], '20' + last[ 2 ] ].join( ' ' ) ).getTime();
							
							var now = $serverDate.text().split( '/' );
							now = new Date( [ now[ 1 ], now[ 0 ], now[ 2 ], $serverTime.text() ].join( ' ' ) ).getTime();
							
							var time = new Date( now - last ).getTime();
							var year = Math.floor( time / 31536E6 );
							var day = Math.floor( time / 864E5 );
							var hour = Math.floor( time / 36E5 );
							var min = Math.floor( time / 6E4 );
							var format;
							
							if ( year == 1 ) {
								format = year + ' ' + lang.lastattack.year;
							} else if ( year > 1 ) {
								format = year + ' ' + lang.lastattack.years;
							} else if ( day > 1 ) {
								format = day + lang.lastattack.days + ' ' + ( hour % 24 ) + 'h';
							} else if ( hour > 0 ) {
								min = min % 60;
								min = min < 10 ? '0' + min : min;
								hour = hour < 10 ? '0' + hour : hour;
								format = hour + ':' + min + 'h';
							} else {
								min = min < 10 ? '0' + min : min;
								format = '00:' + min + 'm';
							}
							
							twa.mapElement({
								vid: this.id,
								html: format,
								Class: 'twa-lastattack',
								pos: [ 25, 2 ]
							}, {
								width: 45,
								height: 10,
								fontSize: 8,
								borderRadius: 5,
								color: '#fff',
								textAlign: 'center',
								background: '#111',
								border: '1px solid #000',
								opacity: 0.7
							});
						}
					}
				});
			});
			
			return true;
		},
		mapGenerator: function() {
			console.log( 'twa.mapGenerator()' );
			
			var base;
			var type = /ally/.test( game_data.mode ) ? 't' : 'p';
			var colors = '00ff00 999999 823c0a b40000 f40000 0000f4 880088 f0c800 00a0f4 ff8800 ffff00 e0d3b8 04b45f 04b4ae 81f7f3 be81f7 fa58f4 ff0088 ffffff f7be81'.split( ' ' );
			var zoom = 120;
			var x = 500;
			var y = 500;
			
			if ( /con/.test( game_data.mode ) ) {
				base = jQuery( '#con_player_ranking_table, #con_ally_ranking_table' );
				zoom = 320;
				
				var con = jQuery( 'h3' ).html().match( /\d+/ )[ 0 ];
				con = con.length === 1 ? '0' + con : con;
				
				x = con[ 1 ] + '50';
				y = con[ 0 ] + '50';
			} else if ( /kill/.test( game_data.mode ) ) {
				base = jQuery( '#kill_player_ranking_table, #kill_ally_ranking_table' ).next();
			} else if ( game_data.mode === 'awards' ) {
				base = jQuery( '#award_ranking_table' );
			} else {
				type === 't' && jQuery( '#ally_ranking_table tr:first th:eq(1)' ).width( 150 );
				base = jQuery( '#player_ranking_table, #ally_ranking_table' );
			}
			
			base.find( 'tr:not(:first)' ).each(function( i ) {
				jQuery( 'td:eq(1)', this ).prepend( '<input class="map-item" type="checkbox" style="margin:0px;margin-right:20px" color="' + colors[ i ] + '" id="' + this.getElementsByTagName( 'a' )[ 0 ].href.match( /id\=(\d+)/ )[ 1 ] + '"/>' );
			}).eq( -1 ).after( '<tr><td colspan="8"><input type="button" id="twa-mapgenerator" value="' + lang.mapgenerator.generate + '"/> <label><input type="checkbox" id="checkall"/> <strong>' + lang.mapgenerator.selectall + '</strong></label></td></tr>' );
			
			jQuery( '#twa-mapgenerator ').click(function() {
				var url = 'http://' + game_data.market + '.twstats.com/' + game_data.world + '/index.php?page=map&';
				
				jQuery( '.map-item' ).each(function( i ) {
					i++;
					
					if ( this.checked ) {
						url += type + 'i' + i + '=' + this.id + '&' + type + 'c' + i + '=' + this.getAttribute( 'color' ) + '&';
					}
				});
				
				url += 'zoom=' + zoom + '&centrex=' + x + '&centrey=' + y + '&nocache=1&fill=000000&grid=1&kn=1&bm=1';
				
				window.open( url );
			});
			
			jQuery( '#checkall' ).click(function() {
				jQuery( '.map-item' ).attr( 'checked', this.checked );
			});
		},
		tooltipGraphic: function() {
			console.log('twa.tooltipGraphic()');
			
			jQuery( '<input type="hidden" id="twa-tooltipgraphic" />' ).appendTo( 'body' );
			
			jQuery( '#content_value a[href*=info_player], #content_value a[href*=info_ally]' ).each(function() {
				if ( /id=\d+/.test( this.href ) ) {
					var src = 'http://' + game_data.world + '.tribalwarsmap.com/' + game_data.market + '/graph/p_' + ( /info_player/.test( this.href ) ? 'player' : 'tribe' ) + '/' + this.href.match( /id=(\d+)/ )[ 1 ];
					
					new Image().src = src;
					this.setAttribute( 'tooltip', '<img src="' + src + '">' );
					
					jQuery.tooltip( this );
				}
			});
		},
		reportFilter: function() {
			console.log( 'twa.reportFilter()' );
			
			jQuery( '#report_list' ).before( '<table class="vis" width="100%"><tr><th>' + lang.reportfilter.search + ' <input type="text" id="twa-reportfinder" style="padding:1px 2px;border:1px solid silver;border-radius:2px;-webkit-border-radius:2px;-moz-border-radius:2px;height:15px"/></th></tr></table>' );
			
			jQuery( '#twa-reportfinder' ).keyup(function() {
				var param = this.value.toLowerCase();
				
				jQuery( '#report_list tr:not(:first, :last)' ).each(function() {
					this.style.display = jQuery( this ).text().toLowerCase().indexOf( param ) < 0 ? 'none' : 'block';
				});
			});
			
			selectAll = function( form, checked ) {
				jQuery( '#report_list tr:not(:first, :last):visible input[type=checkbox]' ).attr( 'checked', checked );
			};
		},
		villageFilter: function() {
			console.log('twa.villageFilter()');
			
			var villagesExpr = '.overview_table tr:not(:first)';
			var nameExpr = 'span[id^=label_text]';
			var timeout;
			
			switch(jQuery('#overview').val()) {
				case 'units':
					villagesExpr = '.overview_table tbody';
				break;
				case 'commands':
				case 'incomings':
					villagesExpr = '.overview_table tr.nowrap';
					nameExpr = 'span[id^=labelText]';
				break;
			}
			
			var villages = jQuery( villagesExpr ).get();
			
			jQuery( '#twa-overviewtools' ).show().append( '<tr><td>' + lang.villagefilter.search + ' <input type="text" id="twa-villagefilter" style="padding:1px 2px;border:1px solid silver;border-radius:2px;-webkit-border-radius:2px;-moz-border-radius:2px;height:15px"/></td></tr>' );
			
			jQuery( '#twa-villagefilter' ).keyup(function () {
				var param = this.value.toLowerCase();
				
				clearTimeout( timeout );
				
				timeout = setTimeout(function() {
					for ( var i = 0; i < villages.length; i++ ) {
						villages[ i ].style.display = villages[ i ].getElementsByTagName( 'span' )[ 1 ].innerHTML.toLowerCase().indexOf( param ) < 0 ? 'none' : '';
					}
				}, 200);
			});
			
			selectAll = function( form, checked ) {
				jQuery( '.overview_table tr.nowrap:visible input[type=checkbox]' ).attr( 'checked', checked );
			};
		},
		troopCounter: function() {
			console.log( 'twa.troopCounter()' );
			
			jQuery( '#units_table' ).after( '<table id="twa-troopcounter" class="vis" style="width:100%;margin:0 auto"><thead>' + jQuery( '#units_table thead' ).html() + '</thead><tbody>' + jQuery( '#units_table tbody:first' ).html() + '</tbody></table>' );
			
			var units = {};
			var table = document.getElementById( 'twa-troopcounter' );
			var img = document.getElementById( 'units_table' ).getElementsByTagName( 'tr' )[ 0 ].getElementsByTagName( 'img' );
			var tbody = document.getElementById( 'units_table' ).getElementsByTagName( 'tbody' );
			var mytr = table.getElementsByTagName( 'tbody' )[ 0 ].getElementsByTagName( 'tr' );
			
			for ( var i = 0; i < img.length; i++ ) {
				units[ img[ i ].src.match( /_(\w+)\.png/ )[ 1 ] ] = [
					[ i + 2, 0 ],
					[ i + 1, 0 ],
					[ i + 1, 0 ],
					[ i + 1, 0 ]
				];
			}
			
			for ( var i = 0; i < tbody.length; i++ ) {
				var tr = tbody[ i ].getElementsByTagName( 'tr' );
				
				for ( var j = 0; j < tr.length; j++ ) {
					for ( var name in units ) {
						units[ name ][ j ][ 1 ] += Number( tr[ j ].getElementsByTagName( 'td' )[ units[ name ][ j ][ 0 ] ].innerHTML );
					}
				}
			}
			
			jQuery( 'td:first', table ).empty().width( jQuery( '#units_table td:first' ).width() );
			jQuery( 'th:first', table ).html( 'Contagem de Tropas:' );
			jQuery( 'th:last, td:has(a)', table ).remove();
			
			for ( var i = 0; i < mytr.length; i++ ) {
				for ( var name in units ) {
					var td = mytr[ i ].getElementsByTagName( 'td' )[ units[ name ][ i ][ 0 ] ];
					
					td.className = 'unit-item' + ( units[ name ][ i ][ 1 ] == 0 ? ' hidden' : '' );
					td.innerHTML = units[ name ][ i ][ 1 ];
				}
			}
		},
		reportCalc: function( necessary2farm ) {
			var orderUnits = [ 'knight', 'light', 'marcher', 'heavy', 'spear', 'axe', 'archer', 'sword' ],
				necessaryUnits = {},
				options = twa.settings._reportcalc;
			
			// caso não tenha executado a função antes...
			if ( !document.getElementById( 'twa-reportCalc' ) ) {
				console.log( 'twa.reportCalc()' );
				
				var checkbox = '',
					icons = '',
					inputs = '',
					tds = 0;
				
				for ( var name in twa.data.units ) {
					if ( name === 'spy' || name === 'catapult' || name === 'ram' || name === 'snob' ) {
						continue;
					}
					
					tds++;
					checkbox += '<td style="text-align:center"><input type="checkbox" class="' + name + '" style="margin:-1px -2px -2px" ' + ( options.actives.indexOf( name ) >= 0 ? 'checked="true"' : '' ) + '/></td>';
					icons += '<td style="text-align:center"><img src="http://cdn.tribalwars.net/graphic/unit/unit_' + name + '.png" style="width:15px"/></td>';
					inputs += '<td style="text-align:center;height:18px" name="' + name + '"></td>';
				}
				
				jQuery( 'table[width=470]' ).before( ( '<table class="vis" id="twa-reportCalc" style="width:478px"><tr><th colspan="' + tds + '">' + lang.reportcalc.unitscalc + '</th></tr><tr><td colspan="' + tds / 2 + '"><label><input type="checkbox" id="twa-currentVillage"> ' + lang.reportcalc.currentvillage + '</label></td><td colspan="' + tds / 2 + '"><label><input style="width:25px;border:1px solid #ccc" value="' + twa.settings._reportcalc.spy + '" id="twa-spys"/> Enviar exploradores.</label></td></tr><tr id="twa-activeUnits">__checkbox</tr><tr>__icons</tr><tr id="twa-results">__inputs</tr></table><table style="width:478px;display:none" class="vis" id="twa-attack"><tr><td><a href="#">» ' + lang.reportcalc.attack + '</a></td></tr></table>' ).replace( '__checkbox', checkbox ).replace( '__icons', icons ).replace( '__inputs', inputs ) );
				
				// ao alterar as opções executa a função novamente com os novos paramentros
				jQuery( '#twa-activeUnits input, #twa-spys, #twa-currentVillage' ).change(function() {
					if ( this.id === 'twa-spys' ) {
						twa.settings._reportcalc.spy = isNaN( this.value ) ? 0 : Number( this.value );
					} else if ( this.id === 'twa-currentVillage' ) {
						twa.settings._reportcalc.currentVillage = this.checked;
					} else {
						twa.settings._reportcalc.actives = [];
						
						jQuery( '#twa-activeUnits input:checked' ).each(function() {
							twa.settings._reportcalc.actives.push( this.className );
						});
					}
					
					twa.storage( true );
					document.getElementById( 'twa-attack' ).style.display = 'none';
					twa.reportCalc( necessary2farm );
				});
			}
			
			jQuery( '#twa-results td' ).html( '' );
			
			if ( !necessary2farm ) {
				necessary2farm = 0;
				
				// recursos descobertos na aldeia
				var discovery = jQuery( '#attack_spy tr:first td' ).text().trim().replace( /\./g, '' ).split( '  ' ),
				// leveis dos edificios da aldeia
				buildsLvl = jQuery( '#attack_spy tr:last td:last' ).text().replace( /\t/g, '' ).split( '\n' ),
				builds = {};
				buildsLvl = buildsLvl.splice( 1, buildsLvl.length - 2 );
				
				for ( var i = 0; i < buildsLvl; i++ ) {
					var build = buildsLvl[ i ].split( /\s\(/ ),
						level = build[ 1 ].match( /\d+/ );
					
					builds[ twa.data.builds[ build[ 0 ] ] ] = Number( level );
				}
				
				// calcula o tanto que o esconderijo protege
				var hideSize = builds.hide === 0 ? 0 : Math.round( 150 * Math.pow( 40 / 3, ( builds.hide - 1 ) / 9 ) ),
				// calcula o tamanho do armazem
				storageSize = ( builds.storage === 0 ? 1000 : Math.round( 1000 * Math.pow( 400, ( builds.storage - 1 ) / 29 ) ) ) - hideSize,
				// coordenadas da aldeia atacante
				attCoords = jQuery( '#attack_info_att tr:eq(1) a' ).text().match( /\s\((\d+)\|(\d+)\)\s\w+$/ ),
				// coordenadas da aldeia que será farmada
				defCoords = jQuery( '#attack_info_def tr:eq(1) a' ).text().match( /\s\((\d+)\|(\d+)\)\s\w+$/ ),
				// calcula a distancia entre as aldeias
				distance = Math.sqrt( Math.pow( Number( attCoords[ 1 ] ) - Number( defCoords[ 1 ] ), 2 ) + Math.pow( Number( attCoords[ 2 ] ) - Number( defCoords[ 2 ] ), 2 ) ),
				// leveis das minas
				resLvl = [ builds.wood || 0, builds.stone || 0, builds.iron || 0 ],
				farthest = 0;
				
				// calcula o tempo que as tropas levariam para chegar na aldeia
				for ( var i = 0; i < orderUnits.length; i++ ) {
					if ( twa.data.units[ orderUnits[ i ] ] ) {
						var time = twa.data.units[ orderUnits[ i ] ].speed * ( distance / twa.data.world.unit_speed ),
							hour = Math.floor( time / 3600 ),
							min = Math.floor( ( time - ( hour * 3600 ) ) / 60 ),
							times = parseFloat( hour + '.' + min );
						
						if ( times > farthest ) {
							farthest = times;
						}
					}
				}
				
				var timeCommand = String( farthest ).split( '.' );
				
				// calcula a quantidade de recursos que a aldeia produzira enquanto as tropas chegam
				discovery.map(function( item, i ) {
					var prod = resLvl[ i ] === 0 ? 5 * twa.data.world.speed : Math.round( 30 * Math.pow( 80, ( resLvl[ i ] - 1 ) / 29 ) ) * twa.data.world.speed;
					
					item = Number( item );
					item += ( hour * prod ) + min * ( prod / 60 ) + ( timeCommand[ 0 ] * prod ) + ( timeCommand[ 1 ] * ( prod / 60 ) );
					
					if ( item > storageSize ) {
						item = storageSize;
					}
					
					necessary2farm += item;
				});
			}
			
			// id do jogador atacante
			var attpid = jQuery( '#attack_info_att a:first' ).attr( 'href' ).match( /id=(\d+)/ )[ 1 ],
			// id da aldeia atacante
			attvid = jQuery( '#attack_info_att tr:eq(1) a' ).attr( 'href' ).match( /id=(\d+)/ )[ 1 ],
			// coordenadas da aldeia atacante
			coords = jQuery( '#attack_info_def a[href*=info_village]' ).text().match( /.*\((\d+)\|(\d+)\)\sK\d{1,2}/ ).slice( 1, 3 ),
			vid = game_data.village.id;
			
			// se o atacante for voce mesmo...
			if ( attpid === game_data.player.id ) {
				// caso esteja para atacar a aldeia atual, ira seleciona-la, se não, usará a aldeia atacante para atacar novamente
				vid = jQuery( '#twa-currentVillage:checked' ).length ? game_data.village.id : attvid;
			}
			
			// carrega a pagina do praça de reunião para obter as tropas atuais da aldeia
			jQuery.get(twa.url( 'place', vid ), function( html ) {
				var units = {};
				
				// pega a quantidade de unidades
				for ( var unit in twa.data.units ) {
					units[ unit ] = Number( jQuery( '[name=' + unit + ']', html ).next().text().match( /\d+/ )[ 0 ] );
				}
				
				// faz o loop em todas unidades que podem ser usadas para farmar
				for ( var i = 0; i < orderUnits.length; i++ ) {
					var unit = orderUnits[ i ];
					
					// caso a unidade esteja selecionada para atacar...
					if ( twa.data.units[ unit ] && jQuery( '#twa-activeUnits input.' + unit + ':checked' ).length ) {
						// capacidade de farm da unidade
						var carry = twa.data.units[ unit ].carry,
						// capacidade que todas unidades juntas podem farmar
						carryLimit = units[ unit ] * carry;
						
						// caso possa farmar alguma coisa...
						if ( carryLimit ) {
							// se as unidades podem farmar mais do que é preciso...
							if ( carryLimit >= necessary2farm ) {
								// calcula quantas unidades são necessarias para farmar 100% e pula para a etapa de enviar o ataque
								necessaryUnits[ unit ] = Math.ceil( necessary2farm / carry );
								
								break;
							// se não há unidades sulficientes para farmar tudo...
							} else {
								// adiciona todas as unidades
								necessaryUnits[ unit ] = units[ unit ];
								// reduz a quantidade de unidades necessarias para calcular com a proxima unidade...
								necessary2farm -= carryLimit;
							}
						}
					}
				}
				
				var min = 0,
					elemUnits = document.getElementById( 'twa-results' );
				
				for ( var unit in necessaryUnits ) {
					document.getElementsByName( unit )[ 0 ].innerHTML = necessaryUnits[ unit ];
				}
				
				if ( options.spy && units.spy >= options.spy ) {
					min++;
					necessaryUnits.spy = options.spy;
				}
				
				// ao clicar no botão para enviar ataque...
				document.getElementById( 'twa-attack' ).onclick = function() {
					jQuery.post(twa.url( 'place&try=confirm', vid ), jQuery.extend({
						x: coords[ 0 ],
						y: coords[ 1 ],
						attack: true
					}, necessaryUnits), function( html ) {
						var error = jQuery( '#error', html );
						
						// caso tenha algum erro no ataque...
						if ( error.text() ) {
							return alert( lang.reportcalc.error + ' ' + error.text() );
						}
						
						var form = jQuery( 'form', html );
						
						// confirma o ataque e envia
						jQuery.post(form[ 0 ].action, form.serialize(), function() {
							alert( lang.reportcalc.success );
						});
					});
					
					return false;
				};
				
				document.getElementById( 'twa-attack' ).style.display = Object.keys( necessaryUnits ).length <= min ? 'none' : '';
			});
		},
		addCheckbox: function() {
			console.log('twa.addCheckbox()');
			
			var table,
				tr;
			
			if ( game_data.mode === 'commands' || game_data.mode === 'incomings' || game_data.mode === 'groups' ) {
				return;
			} else if ( game_data.mode === 'units' ) {
				table = document.getElementById( 'units_table' );
				
				var tbody = table.getElementsByTagName( 'tbody' ),
					th = table.getElementsByTagName( 'th' )[ 0 ],
					tbodyTr;
				
				th.innerHTML = '<input type="checkbox" style="margin:0px" id="twa-selectAll"/> ' + th.innerHTML;
				
				for ( var i = 0; i < tbody.length; i++ ) {
					tbodyTr = tbody[ i ].getElementsByTagName( 'tr' )[ 0 ];
					tbodyTr.getElementsByTagName( 'td' )[ 0 ].innerHTML = '<input type="checkbox" name="village_ids[]" class="addcheckbox" style="margin:0px" value="' + jQuery( 'a[href*="village="]:first', tbody[ i ] )[ 0 ].href.match( /village=(\d+)/ )[ 1 ] + '"/>' + tbodyTr.getElementsByTagName( 'td' )[ 0 ].innerHTML;
				}
			} else {
				tr = jQuery( '.overview_table' )[ 0 ].getElementsByTagName( 'tr' );
				
				for ( var i = 0; i < tr.length; i++ ) {
					tr[ i ].innerHTML = ( !i ? '<th><input type="checkbox" style="margin:0px" id="twa-selectAll"/></th>' : '<td><input type="checkbox" name="village_ids[]" class="addcheckbox" style="margin:0px" value="' + jQuery( 'a[href*="village="]:first', tr[ i ] )[ 0 ].href.match( /village=(\d+)/ )[ 1 ] + '"/></td>' ) + tr[ i ].innerHTML;
				}
			}
			
			document.getElementById( 'twa-selectAll' ).onclick = function() {
				jQuery( 'input.addcheckbox:visible' ).attr( 'checked', this.checked );
			};
		},
		selectVillages: {
			init: function() {
				console.log('twa.selectVillages()');
				
				// todos os modos
				var modes = twa.selectVillages.modes;
					ready = false;
				
				// verifica se tem existe algum filtro para o visualização atual
				for ( var name in modes ) {
					if ( overview === modes[ name ][ 0 ] ) {
						ready = true;
					}
				}
				
				// caso tenha, adiciona o menu com as opções
				if ( ready ) {
					jQuery( '#twa-overviewtools' ).show().append( '<tr><td>' + lang.selectvillages.selectvillages + ' <span id="twa-selectvillages"></span></td></tr>' );
				}
				
				// pega a ordem das unidades
				jQuery( '#combined_table tr:first th:has(img[src*="unit/unit"]) img' ).each(function() {
					twa.selectVillages.tools.unitsorder.push( this.src.match( /unit_(\w+)/ )[ 1 ] );
				});
				
				// executa todos os fitros possiveis para a visualização atual
				for ( var name in modes ) {
					if ( overview === modes[ name ][ 0 ] ) {
						modes[ name ][ 1 ]();
					}
				}
			},
			modes: {
				// seleciona aldeias com tropas de ataque
				unitsattack: ['combined', function() {
					// todas as aldeias da tabela
					var villages = jQuery( '#combined_table tr:gt(0)' );
					
					// cria o checkbox
					// ao alterar seleciona/deseleciona as aldeias com ataque
					jQuery( '<input type="checkbox" id="twa-selectvillages-unitsattack"/>' ).change(function() {
						var i,
							units,
							popatt,
							popdef;
						
						// loop em todas aldeias
						for( i = 0; i < villages.length; i++) {
							// pega todas unidades da aldeia
							units = twa.selectVillages.tools.getunits( villages[ i ] );
							// pega a quantidade de tropas de ataque da aldeias
							popatt = twa.selectVillages.tools.getpop( 'att', units );
							// pega a quantidade de tropas de defesa da aldeias
							popdef = twa.selectVillages.tools.getpop( 'def', units );
							
							if ( popatt > popdef ) {
								jQuery( '.addcheckbox', villages[ i ] ).attr( 'checked', this.checked );
							}
						}
					// adiciona label ao checkbox e envia elementos para o menu
					}).add( ' <label for="twa-selectvillages-unitsattack">' + lang.selectvillages.unitsattack + '</label>' ).appendTo( '#twa-selectvillages' );
				}],
				unitsdefence: ['combined', function() {
					// todas as aldeias da tabela
					var villages = jQuery( '#combined_table tr:gt(0)' );
					
					// cria o checkbox
					// ao alterar seleciona/deseleciona as aldeias com defesa
					jQuery( '<input type="checkbox" id="twa-selectvillages-unitsdefence"/>' ).change(function() {
						var i,
							units,
							popatt,
							popdef;
						
						// loop em todas aldeias
						for( i = 0; i < villages.length; i++) {
							// pega todas unidades da aldeia
							units = twa.selectVillages.tools.getunits( villages[ i ] );
							// pega a quantidade de tropas de ataque da aldeias
							popatt = twa.selectVillages.tools.getpop( 'att', units );
							// pega a quantidade de tropas de defesa da aldeias
							popdef = twa.selectVillages.tools.getpop( 'def', units );
							
							if ( popatt < popdef ) {
								jQuery( '.addcheckbox', villages[ i ] ).attr( 'checked', this.checked );
							}
						}
					// adiciona label ao checkbox e envia elementos para o menu
					}).add( ' <label for="twa-selectvillages-unitsdefence">' + lang.selectvillages.unitsdefence + '</label>' ).appendTo( '#twa-selectvillages' );
				}],
				unitsnob: ['combined', function() {
					// todas as aldeias da tabela
					var villages = jQuery( '#combined_table tr:not(:first)' );
					
					// cria o checkbox
					// ao alterar seleciona/deseleciona as aldeias com nobres
					jQuery( '<input type="checkbox" id="twa-selectvillages-unitsnob">' ).change(function() {
						var units,
							i;
						
						// loop em todas aldeias
						for ( i = 0; i < villages.length; i++ ) {
							// pega todas unidades da aldeia
							units = twa.selectVillages.tools.getunits( villages[ i ] );
							
							// verifica se tem nobres na aldeia, se tiver, seleciona
							if ( units.snob > 0 ) {
								jQuery( '.addcheckbox', villages[ i ] ).attr( 'checked', this.checked );
							}
						}
					// adiciona label ao checkbox e envia elementos para o menu
					}).add( ' <label for="twa-selectvillages-unitsnob">' + lang.selectvillages.unitsnob + '</label>' ).appendTo( '#twa-selectvillages' );
				}]
			},
			tools: {
				// pega todas tropas da aldeia
				getunits: function( village ) {
					var elems = jQuery('.unit-item', village),
						units = {};
					
					elems = elems.add(elems.next().last());
					
					for ( var i = 0; i < twa.selectVillages.tools.unitsorder.length; i++ ) {
						units[ twa.selectVillages.tools.unitsorder[ i ] ] = Number( elems.eq( i ).text() );
					}
					
					return units;
				},
				// pega a população usada pegas unidades passadas
				getpop: function( type, units ) {
					var pop = 0,
						unit,
						i = 0;
					
					switch( type ) {
						case 'att':
							for ( ; i < twa.selectVillages.tools.unitsatt.length; i++ ) {
								unit = twa.selectVillages.tools.unitsatt[ i ];
								pop += units[ unit ] * twa.data.units[ unit ].pop;
							}
						break;
						case 'def':
							for ( ; i < twa.selectVillages.tools.unitsdef.length; i++ ) {
								unit = twa.selectVillages.tools.unitsdef[ i ];
								pop += units[ unit ] * twa.data.units[ unit ].pop;
							}
						break;
						case 'all':
							for ( i in units ) {
								if ( twa.data.units[ units[ i ] ] ) {
									pop += units[ i ] * twa.data.units[ units[ i ] ].pop;
								}
							}
						break;
					}
					
					return pop;
				},
				unitsatt: [ 'axe', 'light', 'marcher', 'ram', 'catapult', 'knight', 'snob' ],
				unitsdef: [ 'light', 'sword', 'archer', 'heavy' ],
				unitsorder: []
			}
		},
		// nao testado - apenas com premium
		// renomeia comandos/relatórios
		rename: {
			init: function( expr, type, id ) {
				console.log( 'twa.rename()' );
				
				var elem = jQuery( expr );
				
				if ( expr !== '.overview_table' ) {
					elem = elem.parent();
				}
				
				elem.before( '<table class="vis" width="100%"><tr><th>' + lang.rename.rename + ' ' + type + ': <input type="text" id="twa-' + id + '" style="padding:1px 2px;border:1px solid red;border-radius:2px;-webkit-border-radius:2px;-moz-border-radius:2px;height:15px"/> <input type="button" value="' + lang.rename.rename + '"/><label><input type="checkbox" id="twa-onlyselected"/> ' + lang.rename.only + ' ' + type + ' ' + lang.rename.selected + '</label> <img src="http://www.preloaders.net/preloaders/252/preview.gif" style="width:25px;display:none" id="twa-loader"/></th></tr></table>' );
			},
			reports: function() {
				twa.rename.init( '#report_list', lang.rename.report, 'reportrename' );
				
				twa.rename._do({
					entry: '#twa-reportrename',
					input: '#report_list tr:not(:first, :last):visible input:not([type=checkbox])',
					inputChecked: '#report_list tr:not(:first, :last):visible:has(input:checked) input:not([type=checkbox])'
				});
			},
			commands: function() {
				twa.rename.init('.overview_table', lang.rename.commands, 'commandrename', 'o');
				jQuery('.overview_table input[type=checkbox]').removeAttr('disabled');

				twa.rename._do({
					entry: '#twa-commandrename',
					input: '.overview_table tr:not(:first, :last):visible input[id^=editInput]',
					inputChecked: '.overview_table tr:not(:first, :last):visible:has(input:checked) input[id^=editInput]'
				});
			},
			_do: function(o) {
				function handle(go) {
					if(!this.val() || this.val().length < (o.min || 1) || this.val().length > (o.max || 255)) {
						return this.css('border', '1px solid red');
					} else {
						this.css('border', '1px solid silver');
					}

					if(!go) {
						return;
					}

					jQuery(jQuery('#twa-onlyselected:checked').length ? o.inputChecked : o.input).val(this.val()).next().click();
				}

				jQuery(o.entry).keyup(function (event) {
					handle.call(jQuery(this), event.keyCode === 13);
					return false;
				}).keypress(function (event) {
					return event.keyCode !== 13;
				});

				jQuery(o.entry).next().click(function () {
					handle.call(jQuery(this).prev(), true);
				});
			}
		},
		// nao testado - apenas com premium
		assistentfarm: {
			id: 0,
			init: function() {
				console.log('twa.assistentfarm()');

				jQuery('h3:first').append(' <span id="twa-assistentfarm">(' + lang.assistentfarm.auto + ')</span>');
				jQuery('#farm_units').parent().after('<div class="vis" style="overflow:auto;height:100px"><table style="width:100%"><tr id="twa-assistent-log"><th><h4>' + lang.assistentfarm.log + '</h4></th></tr></table></div>');
				twa.assistentfarm.prepare();
			},
			log: function(log, error) {
				jQuery('#twa-assistent-log').after('<tr><td>' + (twa.assistentfarm.id++) + ': <img src="' + (error ? '/graphic/delete_small.png' : '/graphic/command/attack.png') + '"/> ' + log + '</td></tr>');
			},
			prepare: function() {
				var elems = [];
				var index = 0;

				$.get(location.href, function(html) {
					jQuery('#am_widget_Farm table tr[class]', html).each(function () {
						elems.push(this);
					});

					setInterval(function () {
						twa.assistentfarm.attack(elems[index]);

						if(++index === elems.length) {
							index = 0;
						}
					}, 5000);
				});
			},
			attackHandler: {
				sendUnits: function(village, template, name) {
					$.ajax({
						type: 'post',
						url: Accountmanager.send_units_link,
						data: {
							target: village,
							template_id: template
						},
						village: name,
						success: function(complete) {
							complete = JSON.parse(complete);

							if(complete.success) {
								twa.assistentfarm.log(complete.success.replace('\n', ' ') + ' ' + lang.assistentfarm.onvillage + ' ' + this.village);
							} else if(complete.error) {
								twa.assistentfarm.log(complete.error + ' ' + lang.assistentfarm.onvillage + ' ' + this.village, true);
							}
						}
					});
				},
				reportAttack: function(village, report, name) {
					$.ajax({
						type: 'post',
						url: Accountmanager.send_units_link_from_report,
						data: {
							report_id: report
						},
						village: name,
						success: function(complete) {
							complete = JSON.parse(complete);

							if(complete.success) {
								twa.assistentfarm.log(complete.success.replace('\n', ' ') + ' ' + lang.assistentfarm.onvillage + ' ' + this.village);
							} else if(complete.error) {
								twa.assistentfarm.log(complete.error + ' ' + lang.assistentfarm.onvillage + ' ' + this.village, true);
							}
						}
					});
				}
			},
			attack: function(elem) {
				var icon_a = jQuery('.farm_icon_a:not(.farm_icon_disabled)', elem);
				var icon_b = jQuery('.farm_icon_b:not(.farm_icon_disabled)', elem);
				var icon_c = jQuery('.farm_icon_c:not(.farm_icon_disabled)', elem);
				var index = icon_c.length ? 10 : icon_a.length ? 8 : icon_b.length ? 9 : 0;
				var data = jQuery('td:eq(' + index + ') a', elem).attr('onclick').toString().match(/(\d+), (\d+)/);

				twa.assistentfarm.attackHandler[index === 10 ? 'reportAttack' : 'sendUnits'](data[1], data[2], jQuery('td:eq(3) a', elem).html());
			}
		},
		autofarm: {
			init: function() {
				console.log( 'twa.autofarm()' );
				
				var content = twa.addIcon({
					name: lang.autofarm.autofarm,
					id: 'twa-autofarm',
					img: 'http://cdn.tribalwars.com.br/graphic/command/attack.png',
					html: '<style>#twa-autofarm-units input{width:30px;text-align:center}#twa-autofarm-content img{margin-left:5px;margin-right:2px}</style><h2>' + lang.autofarm.autofarm + '</h2><span class="twa-autofarm-options"><table width="100%" class="vis"><tr><td id="twa-autofarm-units"></td></tr><tr><td><strong>' + lang.autofarm.coords + '</strong><br/><textarea style="width:584px;height:90px;font-size:12px" name="coords">' + twa.settings._autofarm.coords.join(' ') + '</textarea></td></tr><tr><td><label><input type="checkbox" name="protect"/> ' + lang.autofarm.protect + '</label></td></tr><tr><td><label><input type="checkbox" name="random"/> ' + lang.autofarm.random + '</label></td></tr><tr><th><input type="button" value="' + lang.autofarm.start + '" id="twa-autofarm-start"/></th></tr></table><h3>' + lang.autofarm.log + '</h3><div style="overflow:auto;height:150px"><table id="twa-autofarm-log" style="width:100%" class="vis"></table></div>'
				}),
				units = document.getElementById( 'twa-autofarm-units' ),
				timeout;
				
				for ( var name in twa.data.units ) {
					units.innerHTML += '<img src="http://cdn.tribalwars.net/graphic/unit/unit_' + name + '.png" style="margin-bottom:-4px"/> <input name="' + name + '" style="width:30px;border:1px solid #ccc"/>';
				}
				
				content.find( ':input[name]' ).each(function() {
					var type = 'units';
					
					if ( this.type === 'checkbox' ) {
						this.checked = twa.settings._autofarm[ this.name ];
						this.onchange = function() {
							twa.settings._autofarm[ this.name ] = this.checked;
							twa.storage( true );
						};
					} else {
						if ( this.type === 'text' ) {
							this.value = twa.settings._autofarm.units[ this.name ] || 0;
						} else {
							this.value = twa.settings._autofarm.coords.join( ' ' );
							type = 'coords';
						}
						
						jQuery( this ).onlyNumbers().keydown(function( event ) {
							var elem = this;
							this.value = this.value.replace( /\s+/, ' ' ).replace( /[|]+/, '|' );
							
							clearTimeout( timeout );
							
							timeout = setTimeout(function() {
								if ( elem.type === 'text' ) {
									twa.settings._autofarm.units[ elem.name ] = twa.autofarm.data[ elem.name ] = Number( elem.value );
								} else {
									var coords = elem.value.split( /\s+/ ),
										correctCoords = [];
									
									for ( var i = 0; i < coords.length; i++ ) {
										if ( /-?\d{1,3}\|-?\d{1,3}/.test( coords[ i ] ) ) {
											correctCoords.push( coords[ i ] );
										}
									}
									
									twa.settings._autofarm.coords = correctCoords;
									twa.autofarm.next( true );
								}
								
								twa.storage( true );
							}, 500);
						});
					}
				});
				
				document.getElementById( 'twa-autofarm-start' ).onclick = function() {
					twa.autofarm.attack();
				};
				
				for ( var timer in timers ) {
					timers[ timer ].reload = false;
				}
				
				for ( name in twa.data.units ) {
					twa.autofarm.data[ name ] = twa.settings._autofarm.units[ name ];
				}
				
				if ( twa.settings._autofarm.index >= twa.settings._autofarm.coords.length ) {
					twa.settings._autofarm.index = 0;
				}
				
				if ( twa.settings._autofarm.coords.length ) {
					twa.autofarm.coord = twa.settings._autofarm.coords[ twa.settings._autofarm.index ].split( '|' );
				}
				
				twa.autofarm.logElem = document.getElementById( 'twa-autofarm-log' );
			},
			log: function( log, error ) {
				twa.autofarm.logElem.innerHTML = '<tr><td><strong>' + ( $serverTime.text() + ' ' + $serverDate.text() ) + ':</strong> <img src="' + ( error ? '/graphic/delete_small.png' : '/graphic/command/attack.png' ) + '"/> ' + log + '</td></tr>' + twa.autofarm.logElem.innerHTML;
				
				return twa.autofarm;
			},
			attack: function( units, tryAgain ) {
				if ( !tryAgain ) {
					twa.autofarm.data.x = twa.autofarm.coord[ 0 ];
					twa.autofarm.data.y = twa.autofarm.coord[ 1 ];
				}
				
				if ( units ) {
					for ( var unit in units ) {
						twa.autofarm.data[ unit ] = units[ unit ];
					}
				}
				
				jQuery.post(twa.url( 'place&try=confirm' ), twa.autofarm.data, function( html ) {
					if ( jQuery( 'img[src="/game.php?captcha"]', html ).length ) {
						return false;
					}
					
					var error = jQuery( '#error', html );
					
					if ( error.text() ) {
						var time = twa.autofarm.commands( html ),
							troops = twa.autofarm.troops( html ),
							text = false;
						
						// quando há comandos em andamento e sem tropas na aldeia
						if ( time && !troops ) {
							!twa.autofarm.nolog && twa.autofarm.log( lang.autofarm.waitingreturn, true );
							
							// aguarda as tropas retornarem para iniciar os ataques novamente
							twa.autofarm.delay(function() {
								this.attack( false, true );
							}, time).nolog = true;
						// quando não há tropas em andamento nem tropas na aldeia
						} else if ( !time && !troops ) {
							!twa.autofarm.nolog && twa.autofarm.log( lang.autofarm.notroops, true );
							
							// tenta iniciar os ataques a cada 10 segundos (caso tropas sejam recrutadas)
							twa.autofarm.delay(function() {
								this.attack( false, true );
							}, 10000).nolog = true;
						// se houver tropas na aldeia, apenas envia.
						} else if ( troops ) {
							twa.autofarm.attack( troops, true );
						}
						
						return;
					}
					
					// caso a aldeia atacada tenha dono e a opção de proteção esteja ativada, passa para a proxima coordenada.
					if ( twa.settings._autofarm.protect && jQuery( 'form a[href*=player]', html ).length ) {
						return twa.autofarm.next();
					}
					
					var form = jQuery( 'form', html );
					
					jQuery.post(form[ 0 ].action, form.serialize(), function() {
						twa.autofarm.log( lang.autofarm.success.springf( twa.autofarm.coord.join( '|' ) ) ).next();
						twa.autofarm.nolog = false;
					});
				});
				
				return twa.autofarm;
			},
			delay: function( callback, time ) {
				setTimeout(function() {
					callback.call( twa.autofarm );
				}, time);
				
				return twa.autofarm;
			},
			commands: function( html ) {
				var line = jQuery( 'table.vis:last tr:not(:first)', html ),
					returning = line.find( '[src*=cancel], [src*=back], [src*=return]' ),
					going = line.find( '[src*=attack]' ),
					time = returning.length ? returning : going.length ? going : false,
					going = going.length ? 2 : 1;
				
				if ( !time ) {
					return false;
				}
				
				if ( time = time.eq( 0 ).parent().parent().find( '.timer' ).text() ) {
					time = time.split( ':' );
					
					return ( ( time[ 0 ] * 36E5 ) + ( time[ 1 ] * 6E4 ) + ( time[ 2 ] * 1E3 ) ) * going;
				}
			},
			troops: function( html ) {
				var troops = {},
					unit,
					amount;
				
				var inputs = jQuery( '.unitsInput', html ).get();
				
				for ( var i = 0; i < inputs.length; i++ ) {
					unit = inputs[ i ].id.split( '_' )[ 2 ];
					amount = Number( inputs[ i ].nextElementSibling.innerHTML.match( /\d+/ )[ 0 ] );
					
					if ( amount != 0 && twa.settings._autofarm.units[ unit ] && amount >= twa.settings._autofarm.units[ unit ] ) {
						troops[ unit ] = amount;
					}
				}
				
				return !$.isEmptyObject( troops ) ? troops : false;
			},
			next: function( check ) {
				if ( !check ) {
					twa.settings._autofarm.index++;
				}
				
				if ( twa.settings._autofarm.index >= twa.settings._autofarm.coords.length ) {
					twa.settings._autofarm.index = 0;
				}
				
				twa.storage( true );
				
				if ( twa.settings._autofarm.coords.length ) {
					twa.autofarm.coord = twa.settings._autofarm.coords[ twa.settings._autofarm.index ].split( '|' );
				}
				
				if ( !check ) {
					if ( twa.settings._autofarm.random ) {
						twa.autofarm.delay(function() {
							twa.autofarm.attack();
						}, Math.random() * 10000);
					} else {
						twa.autofarm.attack();
					}
				}
				
				return twa.autofarm;
			},
			pageLoad: function() {
				var pages = [ 'overview', 'main', 'mail&mode=mass_out', 'recruit', 'barracks', 'place', 'ranking&mode=player&from=1&lit=1', 'ally', 'forum', 'stone', 'premium', 'reports', 'mail', 'settings', 'map' ];
				
				setTimeout(function() {
					jQuery.get( twa.url( pages[ Math.floor( Math.random() * pages.length ) ] ), function() { console.log(this.url); twa.autofarm.pageLoad(); } );
				}, Math.random() * 20000);
			},
			data: { attack: true },
			coord: [],
			nolog: false
		},
		// nao testado - apenas com premium
		building: {
			init: function() {
				console.log('twa.building()');
				
				jQuery('#twa-overviewtools').show().append('<tr id="twa-building"><th><label><input type="radio" checked name="twa-building" id="twa-building-build"/> ' + lang.building.buildtitle + ' <img src="graphic/questionmark.png" width="13" title="' + lang.building.buildhelp + '"/></label> <a href="#" id="twa-cancel-builds">» ' + lang.building.cancelbuilds + '</a></th></tr><tr><td class="twa-buildings"></td></tr><tr><th><label><input type="radio" name="twa-building" id="twa-building-destroy"/> ' + lang.building.destroytitle + ' <img src="graphic/questionmark.png" width="13" title="' + lang.building.destroyhelp + '"/></label> <a href="#" id="twa-cancel-destroy">» ' + lang.building.canceldestroy + '</a></th></tr><tr><td class="twa-buildings"></td></tr><tr><th>' + lang.building.help + '</th></tr>');
				
				jQuery('#twa-building-build, #twa-building-destroy').click(function () {
					if((BuildingOverview._display_type === 1 && this.id === 'twa-building-destroy') || (BuildingOverview._display_type === 0 && this.id === 'twa-building-build')) {
						return;
					}

					BuildingOverview.show_all_upgrade_buildings(this.id === 'twa-building-destroy');
				});
				
				jQuery('#twa-cancel-builds, #twa-cancel-destroy').unbind('click').click(function () {
					if(confirm(lang.building.confirmcancel.springf(this.id === 'twa-cancel-destroy' ? lang.building.demolitions : lang.building.buildings))) {
						twa.building.cancel(this.id === 'twa-cancel-destroy');
					}
				
					return false;
				});
				
				if(BuildingOverview._display_type === false) {
					BuildingOverview.show_all_upgrade_buildings();
				} else if(BuildingOverview._display_type) {
					jQuery('#twa-building-destroy').attr('checked', true);
				}
				
				for(var i = 0; i < 2; i++) {
					var td = jQuery('.twa-buildings').eq(i);
					
					for(var build in twa.data.builds) {
						build = twa.data.builds[build];
						
						td.append('<img src="graphic/buildings/' + build + '.png"/> <input type="text" style="width:25px" name="' + build + '" value="' + twa.settings[i ? '_buildingdestroy' : '_buildingbuild'][build] + '"/> ');
					}
				}
				
				var timeout;

				jQuery('.twa-buildings').each(function (tableIndex) {
					jQuery('input', this).keyup(function () {
						var index = tableIndex;
						var elem = this;

						clearTimeout(timeout);

						setTimeout(function () {
							twa.settings[index ? '_buildingdestroy' : '_buildingbuild'][elem.name] = elem.value;
							twa.storage(true);
						}, 2000);
					}).keypress(function (event) {
						return event.charCode > 47 && event.charCode < 58 && this.value.length < 3;
					});
				});

				jQuery('#buildings_table tr:first th:has(img[src*=buildings]) a').click(function () {
					return twa.building._do(jQuery('img', this)[0].src.match(/\/([a-z]+)\.png/)[1], BuildingOverview._display_type);
				});
			},
			_do: function(build, destroy) {
				var url = jQuery('#upgrade_building_link').val();
				var max = destroy ? 5 : twa.settings._buildingmaxorders;
				var limit = Number(jQuery('.twa-buildings').eq(destroy).find('input[name=' + build + ']').val());

				jQuery('#buildings_table tr:not(:first)').each(function () {
					var vid = this.className.match(/\d+/)[0];
					
					if(BuildingOverview._upgrade_villages[vid].buildings[build]) {
						var curOrders = jQuery('td:last li:has(.build-status-light[style*=' + (destroy ? 'red' : 'green') + ']) img[src*="' + build + '.png"]', this);
						var cur = Number(jQuery('.b_' + build + ' a', this).text()) + curOrders.length;
						
						for(var orders = jQuery('#building_order_' + vid + ' img').length / 2; orders < max; orders++) {
							if(destroy ? cur-- > limit : cur++ < limit) {
								$.ajax({
									url: url.replace(/village=\d+/, 'village=' + vid),
									data: {
										id: build,
										destroy: destroy,
										force: 1
									},
									async: false,
									dataType: 'json',
									success: function(complete) {
										if(complete.success) {
											if(!jQuery('#building_order_' + vid).length) {
												var ul = jQuery('<ul class="building_order" id="building_order_' + vid + '"></ul>');

												BuildingOverview.create_sortable(ul);
												jQuery('#v_' + vid + ' td:last').append(ul);
											}

											jQuery('#building_order_' + vid).html(complete.building_orders);
										}
									}
								});
							}
						}
					}
				});

				return false;
			},
			cancel: function(destroy) {
				jQuery('li:has(.build-status-light[style*=' + (destroy ? 'red' : 'green') + ']) .build-cancel-icon img').click();
			}
		},
		// nao testado - apenas com premium
		research: {
			init: function() {
				console.log('twa.research()');

				jQuery('.overview_table').before('<table class="vis" width="100%" id="twa-research"><tr><th>' + lang.research.help + ' <a href="#" id="twa-research-cancel">» ' + lang.research.cancel + '</a></th></tr></table>');

				jQuery('#twa-research-cancel').click(function () {
					if(confirm(lang.research.confirmcancel)) {
						twa.research.cancel();
					}

					return false;
				});

				jQuery('#techs_table tr:first a:has(img)').click(function () {
					return twa.research._do(this.href.match(/order=(\w+)/)[1]);
				});
			},
			_do: function(unit) {
				var villages = document.getElementById('techs_table').getElementsByTagName('tr');

				for(var i = 1; i < villages.length; i++) {
					var vid = villages[i].id.split('_')[1];

					if(document.getElementById(vid + '_' + unit)) {
						$.ajax({
							type: 'post',
							url: TechOverview.urls.ajax_research_link.replace(/village=\d+/, 'village=' + vid),
							data: { tech_id: unit },
							dataType: 'json',
							vid: vid,
							success: function(complete) {
								if(complete.success) {
									document.getElementById('village_tech_order_' + this.vid).innerHTML = complete.tech_order;
									TechOverview.change_dot(jQuery('#' + this.vid + '_' + unit), this.vid, unit, 'brown');

									if(game_data.village.id == this.vid) {
										jQuery('#wood').html(complete.resources[0]);
										jQuery('#stone').html(complete.resources[1]);
										jQuery('#iron').html(complete.resources[2]);
										startTimer();
									}
								}
							}
						});
					}
				}

				return false;
			},
			cancel: function() {
				jQuery('#techs_table div.tech-cancel-icon img').each(function () {
					var data = this.onclick.toString().match(/cancel_research_order\((\d+), (\d+), '(\w+)'\)/);

					$.ajax({
						url: TechOverview.urls.ajax_cancel_tech_order_link.replace(/village=\d+/, 'village=' + data[1]),
						dataType: 'json',
						type: 'post',
						data: {
							tech_order_id: data[2]
						},
						name: data[3],
						vid: data[1],
						success: function(complete) {
							if(complete.success) {
								document.getElementById('village_tech_order_' + this.vid).innerHTML = complete.tech_order;
								TechOverview.restore_dot(this.vid, this.name);
							}
						}
					});
				});
			}
		},
		changegroups: {
			init: function() {
				console.log('twa.changegroups()');

				jQuery('#twa-overviewtools').show().append('<tr id="twa-changegroups"><td>' + lang.changegroups.changegroups + ' <select id="twa-group" name="selected_group"></select> <input type="submit" value="' + lang.changegroups.add + '" name="add_to_group"/> <input type="submit" value="' + lang.changegroups.remove + '" name="remove_from_group"/> <input type="submit" value="' + lang.changegroups.move + '" name="change_group"/> <img src="http://www.preloaders.net/preloaders/252/preview.gif" style="width:25px;display:none" id="twa-loader"/></td></tr>');

				jQuery('#twa-changegroups input').click(function () {
					twa.changegroups.change(this);
				});

				var elemGroups = document.getElementById('twa-group');
				var groups = twa.changegroups.getgroups();

				for(var id in groups) {
					elemGroups.innerHTML += '<option value="' + id + '" name="village_ids[]">' + groups[id] + '</option>';
				}

				jQuery('#combined_table tr.nowrap')
			},
			change: function(button) {
				jQuery('#twa-loader').show();

				var data = jQuery('[name="village_ids[]"], [name=selected_group]').serializeArray();
				data.push({
					name: button.name,
					value: button.value
				});

				console.log(data);

				$.post(twa.url('overview_villages') + '&mode=groups&action=bulk_edit_villages&h=' + game_data.csrf, data, function() {
					jQuery('#twa-loader').hide();
				});
			},
			getgroups: function() {
				var groups = {};

				jQuery('#group_table tr:not(:first, :last) td[id^=show_group] a').each(function () {
					groups[this.href.match(/edit_group=(\d+)/)[1]] = this.innerHTML;
				});

				return groups;
			}
		},
		attackplanner: {
			villages: {},
			init: function() {
				console.log('twa.attackplanner()');
				
				var inputUnits = '';
				
				for ( var name in twa.data.units ) {
					inputUnits += '<td><img src="http://cdn.tribalwars.net/graphic/unit/unit_' + name + '.png" style="margin-bottom:-4px"/> <input style="width:33px;border:1px solid #aaa;text-align:center" class="twa-units" unit="' + name + '"/></td>';
				}
				
				var content = twa.addIcon({
					name: lang.attackplanner.attackplanner,
					id: 'twa-attackplanner',
					img: 'http://cdn.tribalwars.com.br/graphic/command/attack.png',
					html: ( '<style>#twa-attackplanner-content td{padding:3px}</style><h2>' + lang.attackplanner.attackplanner + '</h2><h3>' + lang.attackplanner.addcommand + '</h3><table class="vis" width="100%"><tr><th colspan="4">' + lang.attackplanner.attacker + '</th><th colspan="4">' + lang.attackplanner.target + '</th><th colspan="4">' + lang.attackplanner.time + '</th><th colspan="4">' + lang.attackplanner.support + '</th></tr><tr><td colspan="4"><input tooltip="xxx|yyy" style="width:90px;border:1px solid red;text-align:center" name="from"/></td><td colspan="4"><input style="width:90px;border:1px solid red;text-align:center" tooltip="xxx|yyy" name="to"/></td><td colspan="4"><input name="time" tooltip="hh:mm:ss dd/mm/yyyy" value="' + twa.data.attackplanner.lastTime + '" style="width:200px;border:1px solid #aaa;text-align:center"/></td><td><input name="support" type="checkbox"/></td></tr></table><table width="100%" class="vis"><tr><th colspan="12">' + lang.attackplanner.troops + '</th></tr><tr>__inputUnits</tr></table><h3>' + lang.attackplanner.commands + '</h3><table class="vis" width="100%" id="twa-commands"><tr><th>' + lang.attackplanner.attacker + '</th><th>' + lang.attackplanner.target + '</th><th>' + lang.attackplanner.time + '</th><th>' + lang.attackplanner.type + '</th><th>' + lang.attackplanner.troops + '</th><th>' + lang.attackplanner.remove + '</th></tr></table><h3>' + lang.attackplanner.commandssended + '</h3><div style="overflow:auto;height:150px"><table id="twa-attackplanner-log" style="width:100%" class="vis"></table></div>' ).replace( '__inputUnits', inputUnits )
				}),
				valid = { from: false, to: false, time: validTime( twa.data.attackplanner.lastTime ) },
				timeout = false,
				// a cada botão pressionado verifica se os dados inseridos estão corretos
				inputs = jQuery( 'input', content ).keyup(function( event ) {
					if ( this.name === 'time' ) {
						if ( /[^\d\:\/\s]/g.test( this.value ) ) {
							this.value = this.value.replace( /[^\d\:\/\s]/g, '' );
						}
						
						this.style.border = '1px solid ' + ( ( valid.time = validTime( this.value ) ) ? '#aaa' : 'red' );
					} else if ( this.name === 'from' || this.name === 'to' ) {
						if ( /[^\d|]/g.test( this.value ) ) {
							this.value = this.value.replace( /[^\d|]/g, '' );
						}
						
						this.style.border = '1px solid ' + ( /^\d{1,3}\|\d{1,3}$/.test( this.value ) && ( valid[ this.name ] = true ) ? '#aaa' : 'red' );
					} else if ( /[^\d]/g.test( this.value ) ) {
						this.value = this.value.replace( /[^\d]/g, '' );
					}
					
					// caso o botão pressionado seja Enter e todos os campos estejam corretos, envia o comando.
					if ( event.keyCode === 13 && valid.from && valid.to && valid.time ) {
						twa.attackplanner.add();
					}
				});
				
				// adiciona os tooltips nos inputs para melhor identificação
				inputs.slice( 0, 3 ).tooltip();
				
				// caso a entrada com o tempo e data esteja invalida, arruma a borda do input
				if ( !valid.time ) {
					inputs[ 2 ].style.border = '1px solid red';
				}
				
				// pega as tropas atuais da aldeia e adiciona nas entradas
				// das unidades que serão usadas no ataque/apoio
				inputs[ 0 ].onkeydown = function() {
					if ( !valid.from ) {
						return true;
					}
					
					var coords = this.value;
					clearTimeout( timeout );
					
					timeout = setTimeout(function() {
						// envia requisição ajax para pegar as informações da aldeia
						twa.attackplanner.villageInfo(coords, function( data, coords ) {
							jQuery.get(twa.url( 'place', data.id ), function( html ) {
								// loop em todos as inputs de unidades na praça de reunião e
								// adiciona aos inputs do a Attack Planner.
								jQuery( '.unitsInput', html ).each(function( i ) {
									var unit = Number( this.nextElementSibling.innerHTML.match( /\d+/ )[ 0 ] );
									inputs[ i + 4 ].value = unit > 0 ? unit : '';
								});
							});
						});
					}, 500);
				};
				
				// ao iniciar o Attack Planner e adiciona os comandos na tabela
				twa.attackplanner.update(function () {
					setInterval(function() {
						twa.attackplanner.checkAttacks();
					}, 1000);
				});
			},
			// adiciona os comandos na lista de espera
			add: function() {
				var inputs = jQuery( '#twa-attackplanner-content input' );
				
				// salva o horario usado para usa-lo na proxima utilização do Attack Planner
				twa.data.attackplanner.lastTime = inputs[ 2 ].value = jQuery.trim( inputs[ 2 ].value );
				
				// caso as entradas das coordenadas seja iguais, envia um erro
				if ( inputs[ 0 ].value === inputs[ 1 ].value ) {
					return alert( lang.attackplanner.errorequal );
				}
				
				var inserted = false,
				// transformando a data em mili segundos
				data = inputs[ 2 ].value.split( ' ' ),
				inputDate = data[ 1 ].split( '/' ),
				// objeto com os dados do comando
				attackData = {
					target: inputs[ 1 ].value,
					village: inputs[ 0 ].value,
					time: new Date( inputDate[ 1 ] + '/' + inputDate[ 0 ] + '/' + inputDate[ 2 ] + ' ' + data[ 0 ] ).getTime(),
					units: {},
					support: inputs[ 3 ].checked
				};
				
				for ( var i = 4; i < inputs.length; i++ ) {
					if ( Number( inputs[ i ].value ) ) {
						attackData.units[ inputs[ i ].getAttribute( 'unit' ) ] = Number( inputs[ i ].value );
						inserted = true;
					}
				}
				
				if ( !inserted ) {
					return alert( lang.attackplanner.errorunits );
				}
				
				// salva o comando na lista e atualiza a tabela
				twa.data.attackplanner.commands.push( attackData );
				twa.attackplanner.update();
				twa.storage( true, null, 'data' );
			},
			// faz a atualização da tabela que mostras os comandos que serão enviados.
			// é executado sempre que um comando é adicionado, removido ou enviado.
			update: function( callback ) {
				if ( !twa.attackplanner.mailLink ) {
					// pega o codigo "csrf" para usar nas requisições de previsão de mensagem,
					// metodo usado para obter informações das coordenadas.
					jQuery.get(twa.url( 'mail' ), function( html ) {
						twa.attackplanner.mailLink = this.url + '&mode=new&action=send&h=' + html.match( /"csrf":"(\w+)"/ )[ 1 ];
						twa.attackplanner.update( callback );
					});
				}
				
				// caso tenha comandos para atualizar...
				if ( twa.data.attackplanner.commands.length ) {
					// pega todos os comandos e ordena por tempo
					var commands = twa.data.attackplanner.commands.sort(function( a, b ) {
						return a.time - b.time;
					}),
					commandList = jQuery( '#twa-commands' );
					// remove todos os comandos da tabela
					commandList.find( 'tr:not(:first)' ).remove();
					
					var date, hour, min, sec,
						day, month, year, units, i,
						unit, tr, _html,
						// html usado em cada comando na tabela
						html = '<tr id="__id"><td class="coord __from"><img src="http://www.preloaders.net/preloaders/252/preview.gif" style="width:25px" class="load"/></td><td class="coord __target"><img src="http://www.preloaders.net/preloaders/252/preview.gif" style="width:25px" class="load"/></td><td>__time</td><td>__type</td><td>__units</td><td><a href="#" class="remove"><img src="/graphic/delete.png"/></a></td></tr>';
					
					// loop em todos os comandos
					for ( i = 0; i < commands.length; i++ ) {
						// formatando o tempo
						date = new Date( commands[ i ].time );
						hour = date.getHours();
						min = date.getMinutes();
						sec = date.getSeconds();
						day = date.getDate();
						month = date.getMonth() + 1;
						year = date.getFullYear();
						units = [];
						
						hour = hour < 10 ? '0' + hour : hour;
						min = min < 10 ? '0' + min : min;
						sec = sec < 10 ? '0' + sec : sec;
						day = day < 10 ? '0' + day : day;
						month = month < 10 ? '0' + month : month;
						
						for ( unit in commands[ i ].units ) {
							units.push( '<img src="http://cdn.tribalwars.net/graphic/unit/unit_' + unit + '.png"/> ' + commands[ i ].units[ unit ] );
						}
						
						// adicionando os dados ao html
						_html = html.replace( '__id', i )
						.replace( '__from', commands[ i ].village )
						.replace( '__target', commands[ i ].target )
						.replace( '__time', hour + ':' + min + ':' + sec + ' ' + day + '/' + month + '/' + year )
						.replace( '__type', commands[ i ].support ? lang.attackplanner.support : lang.attackplanner.attack )
						.replace( '__units', units.join( ' ' ) );
						
						// ao clicar remove comando da lista de espera e remove o elemento da tabela
						jQuery( _html ).appendTo( commandList ).find( '.remove' ).click(function() {
							var elem = this.parentNode.parentNode;
							
							twa.data.attackplanner.commands.remove( Number( elem.id ) );
							elem.parentNode.removeChild( elem );
							twa.storage( true, null, 'data' );
							
							return false;
						});
					}
					
					// loop em todas as coordenadas dos comandos na tabela
					commandList.find( '.coord' ).each(function() {
						var coords = this.className.split( ' ' )[ 1 ];
						
						// caso ja tenha pegado as informações da coordenada, insere na tabela
						if ( twa.attackplanner.villages[ coords ] ) {
							if ( twa.attackplanner.villages[ coords ].error ) {
								this.innerHTML = lang.attackplanner.errorcoords.springf( coords );
								
								return true;
							}
							
							this.innerHTML = '<a href="' + twa.url( 'info_village&id=' + twa.attackplanner.villages[ coords ].id ) + '">' + twa.attackplanner.villages[ coords ].name + '</a>';
						// caso nao tenha pegado as informações ainda...
						} else {
							var elem = this;
							
							// pegas as informações e joga na tabela
							twa.attackplanner.villageInfo(coords, function( data, coords ) {
								if ( data.error ) {
									elem.innerHTML = lang.attackplanner.errorcoords.springf( coords );
									
									return true;
								}
								
								elem.innerHTML = '<a href="' + twa.url( 'info_village&id=' + data.id ) + '">' + data.name + '</a>';
							});
						}
					});
				// caso nao tenha comandos, limpa a tabela
				} else {
					jQuery( '#twa-commands tr:not(:first)' ).remove();
				}
				
				callback && callback();
			},
			// obtem nome e id apartir de uma coordenada
			villageInfo: function( coords, callback ) {
				// caso já tenha pegado as informações apenas as retorna
				if ( twa.attackplanner.villages[ coords ] ) {
					return callback( twa.attackplanner.villages[ coords ] );
				} else {
					twa.attackplanner.villages[ coords ] = false;
				}
				
				// envia requisição para o preview da mensagem
				jQuery.post(twa.attackplanner.mailLink, {
					extended: 0,
					preview: 1,
					to: game_data.player.name,
					subject: '0',
					text: '[coord]' + coords + '[/coord]'
				}, function( html ) {
					var elem = jQuery( 'td[style="background-color: white; border: solid 1px black;"] a', html );
					
					twa.attackplanner.villages[ coords ] = elem.length ? {
						error: false,
						name: elem.text(),
						id: elem.attr( 'href' ).match( /id=(\d+)/ )[ 1 ]
					} : {
						error: true
					};
					
					callback( twa.attackplanner.villages[ coords ], coords );
				});
			},
			// verifica o tempo dos comandos, caso esteja no horario, envia.
			checkAttacks: function() {
				// data atual do jogo
				var date = $serverDate.text().split( '/' ),
					now = new Date( date[ 1 ] + '/' + date[ 0 ] + '/' + date[ 2 ] + ' ' + $serverTime.text() ).getTime(),
					length = twa.data.attackplanner.commands.length,
					removes = [];
				
				for ( var i = 0; i < length; i++ ) {
					// caso o horario programado para o envio ja tenha passado, envia.
					if ( now > twa.data.attackplanner.commands[ i ].time ) {
						twa.attackplanner.attack( twa.data.attackplanner.commands[ i ] );
						// remove o comando da lista e da tabela
						twa.data.attackplanner.commands.remove( i );
						removes.push( i );
					}
				}
				
				// verifica se teve alguma alteração na lista de comandos
				if ( length !== twa.data.attackplanner.commands.length ) {
					// faz um loop em todos os comandos que foram enviados e os remove da tabela
					for ( var i = 0; i < removes.length; i++ ) {
						jQuery( '#twa-commands tr:eq( ' + removes[ i ] + ' )' ).remove();
					}
					
					// salva os dados
					twa.storage( true, null, 'data' );
				}
			},
			// envia os comandos
			attack: function( command ) {
				// antes de enviar os comandos sempre é pegado o "id" da aldeia
				twa.attackplanner.villageInfo(command.village, function( village ) {
					// coordenadas da aldeia alvo
					var target = command.target.split( '|' ),
						// objeto com os dados de envio do comando
						data = jQuery.extend({
							x: target[ 0 ],
							y: target[ 1 ]
						}, command.units),
						// nome da aldeia usada para o comando
						village = twa.attackplanner.villages[ command.village ].name,
						// nome da aldeia alvo
						target = twa.attackplanner.villages[ command.target ].name,
						units = '',
						logElem = document.getElementById( 'twa-attackplanner-log' );
					
					// verifica se o comando é um ataque ou apoio e adiciona ao objeto de dados
					data[ command.support ? 'support' : 'attack' ] = true;
					
					for ( var name in command.units ) {
						units += '<img src="http://cdn.tribalwars.net/graphic/unit/unit_' + name + '.png"/> ' + command.units[ name ] + ' ';
					}
					
					// envia a requisição ajax para enviar o comando
					jQuery.post(twa.url( 'place&try=confirm', village.id ), data, function( html ) {
						// pega o elemento de erro do comando
						var error = jQuery( '#error', html ),
							// horario atual do jogo
							time = '<strong>' + ( $serverTime.text() + ' ' + $serverDate.text() ) + ':</strong>';
						
						// caso tenha algum erro, adiciona ao log e para o comando
						if ( error.text() ) {
							return logElem.innerHTML = '<tr><td>' + time + ' ' + error.text() + '</td></tr>' + logElem.innerHTML;
						}
						
						var form = jQuery( 'form', html );
						
						// confirma e envia o ataque e adiciona ao log
						jQuery.post(form[ 0 ].action, form.serialize(), function() {
							logElem.innerHTML = '<tr><td>' + time + ' <img src="/graphic/command/' + ( command.support ? 'support' : 'attack' ) + '.png"/> ' + lang.attackplanner.success.springf( command.support ? lang.attackplanner.support : lang.attackplanner.attack, command.village, command.target, units ) + '</td></tr>' + logElem.innerHTML;
						});
					});
				});
			},
			id: 0
		},
		// falta adicionar alguns textos nas traduções:
		// - no html inicial
		// - erros de argumentos nas funções das mascaras
		renamevillages: {
			init: function() {
				$overviewTools.show().append( '<tr><td>Renomear aldeias: <input type="text" id="twa-renamevillages" style="padding:1px 2px;border:1px solid red;border-radius:2px;-webkit-border-radius:2px;-moz-border-radius:2px;height:15px"/> <a href="http://code.google.com/p/tribalwars-scripts/wiki/Renomeador_de_Aldeias" target="_blank">(Máscaras)</a> <label><input type="checkbox" id="twa-onlyselected"/> Apenas aldeias selecionadas.</label></td></tr>');
				
				// ao digitar verifica se é possivel renomear, caso seja, altera a
				// cor da borda no input, caso precine "Enter" é renomeado as aldeias
				document.getElementById( 'twa-renamevillages' ).onkeyup = function( event ) {
					if ( !this.value || this.value.length < 3 ) {
						this.style.border = '1px solid red';
					}
					
					this.style.border = '1px solid silver';
					
					if ( event.keyCode === 13 ) {
						twa.renamevillages.newname = this.value;
						twa.renamevillages.prepare( document.getElementById( 'twa-onlyselected' ).checked );
					}
				};
				
				// pega a chave "crsf" para poder ser usado na requisição de
				// renomear caso o usuario não seja premium
				jQuery.get(twa.url( 'main' ), function( html ) {
					twa.renamevillages.hkey = jQuery( 'form', html )[ 0 ].action.match( /h=(\w+)/ )[ 1 ];
				});
				
				// caso o jogador tenha premium, apenas adiciona a entrada para renomear todas aldeias
				if ( game_data.player.premium ) {
					twa.renamevillages.mode = twa.renamevillages.modes[ overview ];
				// caso não tenha premium...
				} else {
					// adiciona a opção de renomear aldeias individualmente
					twa.renamevillages.individual();
					// pega o modo usado para usar na informações repassadas pelas mascaras ao renomear
					twa.renamevillages.mode = twa.renamevillages.modes.nopremium[ twa.settings.overview ? twa.settings._overviewmode : 'nooverview' ];
				}
			},
			// substitue as mascaras pelas informações corretas
			replace: function( name, elem ) {
				// {nome}, {nome()}, {nome( ... )}
				return name.replace(/\{([^}]+)\}/g, function( part, name ) {
					// pegas os dados dentro da mascara passado
					name = name.match(/([^(]+)(?:\s?\(([^)]+)\))?/);
					
					// nome da função passado pela mascara
					var fn = name[1].toLowerCase(),
						args = [];
					
					// verifica se foi passado argumentos
					if ( name[ 2 ] ) {
						// divide os argumentos pelas virgulas
						args = jQuery.trim( name[ 2 ] ).split( /\s*,\s*/ );
					}
					
					// verifica se a função passada existe nas funções que funcionam em qualquer modo
					if ( twa.renamevillages.modes.all[ fn ] ) {
						return twa.renamevillages.modes.all[ fn ].apply( this, args );
					// verifica se a função passada existe na lista de funções do modo atual
					} else if ( twa.renamevillages.mode[ fn ] ) {
						return twa.renamevillages.mode[ fn ].apply( jQuery( elem ), args );
					// caso não exista função a passada retorna a mascara inteira
					} else {
						return part;
					}
				});
			},
			prepare: function( selected ) {
				var elems = jQuery( '.overview_table tr[class]' + ( selected ? ':has(.addcheckbox:checked)' : '' ) ).get(),
					name;
				
				for ( var i = 0; i < elems.length; i++ ) {
					// substitue as mascaras
					name = twa.renamevillages.replace( twa.renamevillages.newname, elems[ i ] );
					// chama função para renomear a aldeia
					twa.renamevillages.rename( elems[ i ].getElementsByTagName( 'span' )[ 2 ].id.split( '_' )[ 1 ], name );
				}
			},
			rename: function( vid, name ) {
				// envia requisição ajax para renomear a aldeia
				jQuery.post(twa.url( 'main&action=change_name&h=' + twa.renamevillages.hkey, vid ), { name: name }, function( html ) {
					// pega o id da aldeia
					var vid = this.url.match( /village=(\d+)/ )[ 1 ],
						elem = document.getElementById( 'label_text_' + vid );
					
					elem.innerHTML = name + elem.innerHTML.match( /\s\(\d+\|\d+\)\s\w+$/ )[ 0 ];
				});
			},
			individual: function() {
				// pega todas as aldeias da tabela
				var elems = jQuery( '.overview_table tr[class]' ).get(),
					vid,
					span;
				
				for ( var i = 0; i < elems.length; i++ ) {
					span = elems[ i ].getElementsByTagName( 'span' )[ 0 ];
					// id da aldeia
					vid = span.id.split( '_' )[ 1 ];
					
					// ao clicar no botão de renomear, renomeia
					elems[ i ].getElementsByTagName( 'input' )[ 1 ].onclick = function() {
						if ( game_data.player.premium ) {
							var elem = document.getElementById( 'edit_input_' + vid );
							
							elem.value = twa.renamevillages.replace( elem.value, elems[ i ] );
							elem.nextElementSibling.click();
						} else {
							twa.renamevillages.rename( vid, twa.renamevillages.replace( document.getElementById( 'edit_input_' + vid ).value, elems[ i ] ) );
							
							document.getElementById( 'edit_' + vid ).style.display = 'none';
							document.getElementById( 'label_' + vid ).style.display = '';
						}
					};
					
					// cria o icone para clicar e mostrar o campo para pesquisa
					jQuery( '<a>' ).addClass( 'rename-icon' ).click(function() {
						document.getElementById( 'edit_' + vid ).style.display = '';
						document.getElementById( 'label_' + vid ).style.display = 'none';
					}).appendTo( span );
				}
			},
			modes: {
				// funções usadas em visualização sem conta premium
				nopremium: {
					// funções usadas na visualização basica do jogo
					nooverview: {
						points: function() { return this.find( 'td:eq(2)' ).text(); },
						wood: function() { return this.find( 'td:eq(3)' ).text().split( ' ' )[ 0 ]; },
						stone: function() { return this.find( 'td:eq(3)' ).text().split( ' ' )[ 1 ]; },
						iron: function() { return this.find( 'td:eq(3)' ).text().split( ' ' )[ 2 ]; },
						storage: function() { return this.find( 'td:eq(4)' ).text(); },
						farmused: function() { return this.find( 'td:eq(5)' ).text().split( '/' )[ 0 ]; },
						farmtotal: function() { return this.find( 'td:eq(5)' ).text().split( '/' )[ 1 ]; },
						current: function() { return jQuery.trim( this.find( 'td:first' ).text() ).match( /(.*) \(\d+\|\d+\)\s\w{3}.?$/ )[ 1 ]; },
						x: function() { return jQuery.trim( this.find( 'td:eq(1)' ).text() ).match( /.* \((\d+)\|\d+\)\s\w{3}.?$/ )[ 1 ]; },
						y: function() { return jQuery.trim( this.find( 'td:eq(1)' ).text() ).match( /.* \(\d+\|(\d+)\)\s\w{3}.?$/ )[ 1 ]; }
					},
					// funções usadas na visualização Produção do proprio script
					production: {
						points: function() { return this.find( 'td:eq(1) span:last' ).text().split( ' ' )[ 0 ]; },
						wood: function() { return this.find( 'td:eq(2)' ).text(); },
						stone: function() { return this.find( 'td:eq(3)' ).text(); },
						iron: function() { return this.find( 'td:eq(4)' ).text(); },
						storage: function() { return this.find( 'td:eq(5)' ).text(); },
						farmused: function() { return this.find( 'td:eq(1) span:last' ).html().match( /\((\d+)/ )[ 1 ]; },
						farmtotal: function() { return this.find( 'td:eq(1) span:last' ).html().match( /\/(\d+)\)/ )[ 1 ]; },
						current: function() { return $.trim(this.find( 'td:eq(1) a:first' ).text()).match( /(.*) \(\d+\|\d+\)\s\w{3}.?$/ )[ 1 ] },
						x: function() { return $.trim(this.find( 'td:eq(1) a:first' ).text()).match( /.* \((\d+)\|\d+\)\s\w{3}.?$/ )[ 1 ]; },
						y: function() { return $.trim(this.find( 'td:eq(1) a:first' ).text()).match( /.* \(\d+\|(\d+)\)\s\w{3}.?$/ )[ 1 ]; }
					},
					// funções usadas na visualização Combinada do proprio script
					combined: {
						points: function() { return this.find( 'td:eq(1) span:last' ).text().split( ' ' )[ 0 ]; },
						farmused: function() { return this.find( 'td:eq(7) a' ).text().split( '/' )[ 0 ]; },
						farmtotal: function() { return this.find( 'td:eq(7) a' ).text().split( '/' )[ 1 ]; },
						current: function() { return jQuery.trim( this.find( 'td:eq(1) a:first' ).text() ).match( /(.*) \(\d+\|\d+\)\s\w{3}.?$/ )[ 1 ] },
						x: function() { return jQuery.trim( this.find( 'td:eq(1) a:first' ).text() ).match( /.* \((\d+)\|\d+\)\s\w{3}.?$/ )[ 1 ]; },
						y: function() { return jQuery.trim( this.find( 'td:eq(1) a:first' ).text() ).match( /.* \(\d+\|(\d+)\)\s\w{3}.?$/ )[ 1 ]; },
						unit: function( unit ) {
							if ( !twa.data.units[ unit ] ) {
								UI.ErrorMessage( 'Renomeador de Aldeias - Argumento inválido: {unit(' + unit + ')} Correto: {unit(UNIDADE)}' );
								return '{unit(ERROR)}';
							}
							
							var index = twa.renamevillages.modes.nopremium.combined.unit.cache;
							
							if ( !index ) {
								index = {};
								
								jQuery( '.overview_table tr:first th' ).each(function( i ) {
									var img = jQuery( 'img[src*=unit_]', this );
									
									if ( img.length ) {
										index[ img[ 0 ].src.match( /unit_(\w+)\./)[ 1 ] ] = i;
									}
								});
								
								twa.renamevillages.modes.nopremium.combined.unit.cache = index;
							}
							
							return this[ 0 ].getElementsByTagName( 'td' )[ index[ unit ] ].innerHTML;
						}
					}
				},
				// funções que podem ser usadas em qualquer modo
				all: {
					random: function( min, max ) {
						min = Number( min || 0 );
						max = Number( max || 10000 );
						
						if ( isNaN( min ) || isNaN( max ) ) {
							UI.ErrorMessage('Renomeador de Aldeias - Argumento inválido: {random(' + min + ', ' + max + ')} Correto: {random(NUMERO, NUMERO)}');
							return '{random(ERROR)}';
						}
						
						return Math.floor( Math.random() * ( max - min + 1 ) + min );
					}
				}
			}
		},
		overview: {
			init: function() {
				$overviewTools.show().append( '<tr><td>' + lang.overview.changemode + ' <select id="twa-overview-modes"></select> (' + lang.overview.needreload + ')</td></tr>' );
				
				var modes = document.getElementById( 'twa-overview-modes' );
				
				// ao alterar o modo de visualização salva para a proxima utilização
				modes.onchange = function() {
					twa.settings._overviewmode = this.value;
					twa.storage( true );
					
					if ( twa.settings.renamevillages ) {
						if ( game_data.player.premium ) {
							twa.renamevillages.mode = twa.renamevillages.modes[ overview ];
						} else {
							twa.renamevillages.mode = twa.renamevillages.modes.nopremium[ twa.settings.overview ? twa.settings._overviewmode : 'nooverview' ];
						}
					}
				};
				
				for ( var mode in twa.overview.modes ) {
					modes.innerHTML += '<option value="' + mode + '"' + ( twa.settings._overviewmode === mode ? ' selected="selected"' : '' ) + '>' + lang.overview[ mode ] + '</option>';
				}
				
				// caso o tamanho da pagina do jogo seja pequena é enviado
				// um aviso que é melhor visualizado maior que 1000px
				if ( jQuery( '.maincell' ).width() < 950 ) {
					$contentValue.prepend( '<p><b>' + lang.overview.warning + '</b></p>' );
				}
				
				// insere a nova tabela e remove a antiga
				jQuery( '.overview_table' ).before( twa.overview.modes[ twa.settings._overviewmode ]() ).remove();
			},
			modes: {
				production: function() {
					var table = buildFragment( '<table id="production_table" class="vis overview_table" width="100%"><thead><tr><th width="400px">Aldeia</th><th style="width:50px;text-align:center">Madeira</th><th style="width:50px;text-align:center">Argila</th><th style="width:50px;text-align:center">Ferro</th><th style="width:46px;text-align:center"><span class="icon header ressources"></span></th><th style="width:53px;text-align:center"><img src="http://cdn2.tribalwars.net/graphic/overview/trader.png"/></th><th>Contruções</th><th>Pesquisas</th><th>Recrutamento</th></tr></thead></table>' ),
						elems = jQuery( '.overview_table tr[class]' ).get(),
						vid,
						village,
						points,
						storage,
						resource,
						resourceHtml,
						resourceNames,
						farm,
						amount,
						span;
					
					for ( var i = 0; i < elems.length; i++ ) {
						// id da aldeia
						vid = elems[ i ].getElementsByTagName( 'td' )[ 0 ].getElementsByTagName( 'a' )[ 0 ].href.match( /village=(\d+)/ )[ 1 ];
						// clona o elemento com nome e entrada para renomear
						village = elems[ i ].getElementsByTagName( 'td' )[ 0 ].cloneNode( true );
						span = village.getElementsByTagName( 'span' )[ 0 ];
						// armazem da aldeia
						storage = elems[ i ].getElementsByTagName( 'td' )[ 3 ].innerHTML;
						// recursos
						resource = elems[ i ].getElementsByTagName( 'td' )[ 2 ].innerHTML.replace( /<\/?span( class="[^\d]+")?>|\.|\s$/g, '' ).split( ' ' );
						resourceHtml = '';
						resourceNames = [ 'wood', 'stone', 'iron' ];
						farm = elems[ i ].getElementsByTagName( 'td' )[ 4 ].innerHTML;
						
						for ( var j = 0; j < 3; j++ ) {
							resourceHtml += '<td style="text-align:center;padding:0 2px;font-size:12px">' + resource[ j ] + '<div style="width:100%;height:2px;border:1px solid #aaa"><div style="width:' + ( resource[ j ] / storage * 100 ) + '%;background:#ccc;height:2px"></div></div></td>';
						}
						
						span.style.display = 'block';
						span.style[ 'float' ] = 'left'
						
						table.innerHTML += '<tr class="twa-overview-' + vid + '"><td style="line-height:10px;white-space:nowrap">' + village.innerHTML + '<span style="text-align:right;font-size:9px;display:block;float:right;margin-left:30px">' + elems[ i ].getElementsByTagName( 'td' )[ 1 ].innerHTML + ' pontos (' + farm + ')</span></td>' + resourceHtml + '<td style="text-align:center">' + storage + '</td><td class="market" style="text-align:center"></td><td class="builds" style="text-align:center"></td><td class="research" style="text-align:center"></td><td class="recruit" style="text-align:center"></td></tr>';
						
						// pega os dados do mercado para adicionar na tabela
						jQuery.get(twa.url( 'market', vid ), function( html ) {
							var traders = jQuery( 'th:first', html );
							
							table.getElementsByTagName( 'td' )[ 6 ].innerHTML = traders.length ? '<a href="' + twa.url( 'market' ) + '">' + traders[ 0 ].innerHTML.match( /\d+\/\d+/ )[ 0 ] + '</a>' : '0/0';
						});
						
						// pega os edificios que estão em contrução para adicionar na tabela
						jQuery.get(twa.url( 'main', vid ), function( html ) {
							var imgs = '',
								builds = jQuery( '#buildqueue tr:gt(0)', html ).get();
							
							for ( var i = 0; i < builds.length; i++ ) {
								imgs += '<img style="margin-right:2px" src="' + jQuery( '#buildings tr:not(:first) td:has(a:contains(' + jQuery.trim( jQuery( 'td:first', builds[ i ] ).text().split( ' (' )[ 0 ] ) + ')) img', html )[ 0 ].src + '" tooltip="' + builds[ i ].getElementsByTagName( 'td' )[ 2 ].innerHTML + '"/>';
							}
							
							table.getElementsByTagName( 'td' )[ 7 ].innerHTML = imgs;
						});
						
						// pega as unidades em recrutamento para adicionar na tabela
						jQuery.get(twa.url( 'train', vid ), function( html ) {
							var imgs = '',
								recruits = jQuery( '.trainqueue_wrap tr[class]', html).get(),
								data,
								unit;
							
							for ( var i = 0; i < recruits.length; i++ ) {
								data = recruits[ i ].getElementsByTagName( 'td' )[ 0 ].innerHTML.match( /(\d+)\s(.*)/ );
								data[ 2 ] = data[ 2 ].split( ' ' ).length === 1 ? data[ 2 ].slice( 0, 7 ) : data[ 2 ];
								
								imgs += '<img src="' + jQuery( '#train_form table tr[class] td:contains(' + data[ 2 ] + ') img', html )[ 0 ].src + '" tooltip="' + data[ 1 ] + '"/>';
							}
							
							table.getElementsByTagName( 'td' )[ 8 ].innerHTML = imgs;
							// adiciona o tooltip ao passar o mouse no icone da unidade
							jQuery( 'img[tooltip]', table.getElementsByTagName( 'td' )[ 8 ] ).tooltip();
						});
						
						// pega as pesquisas em andamento para adicionar na tabela
						jQuery.get(twa.url( 'smith', vid ), function( html ) {
							var imgs = '',
								researchs = jQuery('#current_research tr[class]', html).get();
							
							for ( var i = 0; i < researchs.length; i++ ) {
								imgs += '<img src="' + jQuery( '#tech_list img[alt=' + researchs[ i ].getElementsByTagName( 'td' )[ 0 ].innerHTML + ']', html )[ 0 ].src + '" tooltip="' + researchs[ i ].getElementsByTagName( 'td' )[ 2 ].innerHTML + '"/>';
							}
							
							table.getElementsByTagName( 'td' )[ 9 ].innerHTML = imgs;
							jQuery( 'img[tooltip]', table.getElementsByTagName( 'td' )[ 9 ] ).tooltip();
						});
					}

					jQuery( '.overview_table' ).replaceWith( table );
				},
				combined: function() {
					var table = buildFragment( '<table id="combined_table" class="vis overview_table" width="100%"><thead>' + createStringList( '<style>.overview_table th{text-align:center}</style><tr><th width="400px" style="text-align:left">Aldeia</th><th><img src="http://cdn2.tribalwars.net/graphic/overview/main.png"/></th><th><img src="http://cdn2.tribalwars.net/graphic/overview/barracks.png"/></th><th><img src="http://cdn2.tribalwars.net/graphic/overview/stable.png"/></th><th><img src="http://cdn2.tribalwars.net/graphic/overview/garage.png"/></th><th><img src="http://cdn2.tribalwars.net/graphic/overview/smith.png"/></th><th><img src="http://cdn2.tribalwars.net/graphic/overview/farm.png"/></th>', twa.data.units, '<th><img src="http://cdn2.tribalwars.net/graphic/unit/unit_{0}.png"/></th>', true ) + '<th><img src="http://cdn2.tribalwars.net/graphic/overview/trader.png"/></th></tr></thead></table>' ),
						elems = jQuery( '.overview_table tr[class]' ).get(),
						tds,
						vid,
						village,
						unit;
					
					// função para obter as informações de recrutamento, construções e pesquisas
					function insert( expr, html, elem ) {
						var img = document.createElement( 'img' ),
							recruits = [],
							// pega todas as produções em andamento
							queues = jQuery( expr + ' tr[class]', html ).get(),
							length = queues.length;
						
						// caso tenha alguma produção em andamento
						if ( length ) {
							// faz o loop em cada uma delas
							for ( var j = 0; j < length; j++ ) {
								// caso seja a ultima, adiciona a informação do tempo de término ao final
								j === length - 1
									? recruits.push( queues[ j ].getElementsByTagName( 'td' )[ 1 ].innerHTML + ' - ' + queues[ j ].getElementsByTagName( 'td' )[ 2 ].innerHTML )
									: recruits.push( queues[ j ].getElementsByTagName( 'td' )[ 1 ].innerHTML );
							}
							
							// altera a imagem para "produzindo" e adiciona o titulo com a lista de todas as produções
							img.title = recruits.join( ', ' );
							img.src = 'http://cdn2.tribalwars.net/graphic/overview/prod_running.png';
						} else {
							img.src = 'http://cdn2.tribalwars.net/graphic/overview/prod_avail.png';
						}
						
						elem.appendChild( img );
					}
					
					// faz o loop em todas as aldeias da tabela
					for ( var i = 0; i < elems.length; i++ ) {
						// clona o elemento com nome e entrada para renomear
						village = elems[ i ].getElementsByTagName( 'td' )[ 0 ].cloneNode( true );
						// id da aldeia
						vid = village.getElementsByTagName( 'a' )[ 0 ].href.match( /village=(\d+)/ )[ 1 ];
						
						// novo HTML da aldeia na tabela
						table.innerHTML += '<tr class="' + elems[ i ].className + ' twa-overview-' + vid + '">' + createStringList( '<td style="line-height:10px;white-space:nowrap">' + village.innerHTML + '<span style="text-align:right;font-size:9px;display:block;float:right;margin-left:30px">' + elems[ i ].getElementsByTagName( 'td' )[ 1 ].innerHTML + ' pontos</span></td><td class="main"></td><td class="barracks"></td><td class="stable"></td><td class="garage"></td><td class="smith"></td><td><a href="' + twa.url( 'farm', vid ) + '">' + elems[ i ].getElementsByTagName( 'td' )[ 4 ].innerHTML + '</a></td>', twa.data.units, '<td class="unit-item {0}"></td>', true ) + '<td class="market"></td></tr>';
						
						// todos os elementos TD da aldeia na tabela
						tds = table.getElementsByTagName( 'tr' )[ elems.length ].getElementsByTagName( 'td' );
						
						// obtem as informações das contruções
						jQuery.get(twa.url( 'main' ), function( html ) {
							insert( '#buildqueue', html, tds[ 2 ] );
						});
						
						jQuery.get(twa.url( 'train' ), function( html ) {
							// obtem a quantidade de tropas na aldeia
							var troops = {},
								troopsElem = jQuery( '#train_form tr[class]', html ).get(),
								unit,
								unitElem,
								unitIndex = 8;
							
							for ( var i = 0; i < troopsElem.length; i++ ) {
								// nome da unidade
								unit = troopsElem[ i ].getElementsByTagName( 'td' )[ 0 ].getElementsByTagName( 'img' )[ 0 ].src.match( /unit_(\w+)\./ )[ 1 ];
								// adiciona a quantidade de tropas no objeto
								troops[ unit ] = Number( troopsElem[ i ].getElementsByTagName( 'td' )[ 6 ].innerHTML.split( '/' )[ 0 ] );
							}
							
							for ( var name in twa.data.units ) {
								unitElem = tds[ unitIndex++ ];
								
								// caso tenha alguma unidade, adiciona a tabela
								if ( troops[ name ] ) {
									unitElem.innerHTML = troops[ name ];
								} else {
									// caso nao tenha nenhuma unidade, adiciona 0 e adiciona a classe
									unitElem.innerHTML = '0';
									unitElem.className += ' hidden';
								}
							}
							
							// obtem as informações dos recrutamentos
							insert( '#trainqueue_wrap_barracks', html, tds[ 3 ] );
							insert( '#trainqueue_wrap_stable', html, tds[ 4 ] );
							insert( '#trainqueue_wrap_garage', html, tds[ 5 ] );
						});
						
						// obtem as informações das pesquisas
						jQuery.get(twa.url( 'smith' ), function( html ) {
							insert( '#current_research', html, tds[ 6 ] );
						});
						
						// obtem as informações do mercado
						jQuery.get(twa.url( 'market' ), function( html ) {
							var elem = jQuery( 'th:first', html )[ 0 ];
							
							if ( !elem ) {
								return tds[ tds.length - 1 ].innerHTML = '-';
							}
							
							tds[ tds.length - 1 ].innerHTML = '<a href="' + twa.url( 'market' ) + '">' + elem.innerHTML.match( /(\d+\/\d+)/ )[ 1 ] + '</a>';
						});
					}
					
					return table;
				}
			}
		}
	};
	
	jQuery( '#header_info' ).after( '<table id="header_info" class="twa-bar" style="display:none" cellspacing="0" align="left"><tr></tr></table>' );
	
	// remove um item de um array
	Array.prototype.remove = function( from, to ) {
		var rest = this.slice( ( to || from ) + 1 || this.length );
		this.length = from < 0 ? this.length + from : from;
		return this.push.apply( this, rest );
	}
	// furmata um numero de milesimos para hh:mm:ss
	Number.prototype.format = function() {
		var hours = Math.floor( this / 36E5 ),
			min = Math.floor( this / 6E4 ) % 60,
			sec = ( this / 1000 ) % 60,
			str = hours + ':';
		
		if ( min < 10 ) {
			str += '0';
		}
		
		str += min + ':';
		
		if ( sec < 10 ) {
			str += '0';
		}
		
		return str += sec;
	}
	// substitue partes do string pelos argumentos passados
	String.prototype.springf = function() {
		var args = arguments;
		
		return this.replace(/{(\d+)}/g, function( match, number ) {
			return typeof args[ number ] != 'undefined' ? args[ number ] : match;
		});
	};
	// centraliza um elemento na tela
	jQuery.fn.center = function() {
		var $win = jQuery( window );
		
		return this.css( 'position', 'absolute' )
			.css( 'top', Math.max( 0, ( ( $win.height() - this.outerHeight() ) / 2 ) + $win.scrollTop() ) + 'px' )
			.css( 'left', Math.max( 0, ( ( $win.width() - this.outerWidth() ) / 2 ) + $win.scrollLeft() ) + 'px' );
	};
	// permite apenas numeros, barras, espaços
	jQuery.fn.onlyNumbers = function( type ) {
		return this.keydown(function( e ) {
			var key = e.charCode || e.keyCode || 0;
			
			if ( e.ctrlKey ) {
				return true;
			}
			
			return ( key == 8 || key == 9 || key == 46 || key == 32 || ( type === 'coords' && e.shiftKey && key == 226 ) || ( key >= 37 && key <= 40 ) || ( key >= 48 && key <= 57 ) || ( key >= 96 && key <= 105 ) );
		});
	};
	// verifica se um tempo é maior que o tempo atual do jogo
	function validTime( dateTime ) {
		var valid = false;
		
		if ( /^(\d+):(\d+):(\d+) (\d+)\/(\d+)\/(\d{4})$/.test( dateTime ) ) {
			var data = dateTime.split( ' ' ),
				inputDate = data[ 1 ].split( '/' ),
				currentDate = $serverDate.text().split( '/' );
			
			valid = ( new Date( inputDate[ 1 ] + '/' + inputDate[ 0 ] + '/' + inputDate[ 2 ] + ' ' + data[ 0 ] ) ) > ( new Date( currentDate[ 1 ] + '/' + currentDate[ 0 ] + '/' + currentDate[ 2 ] + ' ' + $serverTime.text() ) );
		}
		
		return valid;
	}
	// adiciona um tooltip a um elemento que tem o atributo "tooltip"
	jQuery.fn.tooltip = jQuery.tooltip = function( elems ) {
		( this.jquery ? this : jQuery( elems ) ).mouseenter(function() {
			$tooltip.html( this.getAttribute( 'tooltip' ) );
			
			var css = jQuery( this ).offset();
				css.top -= $tooltip.height() + 10;
				css.left += 23;
			
			$tooltip.css( css ).show();
		}).mouseout(function() {
			$tooltip.hide();
		});
	};
	// facilita criar strings que vão arrays inteiros no meio
	function createStringList( start, object, springf, key ) {
		var str = start || '',
			i,
			n,
			val;
		
		if ( object.length ) {
			for ( i = 0; i < object.length; i++ ) {
				str += springf ? springf.springf( object[ i ] ) : object[ i ];
			}
		} else {
			for ( n in object ) {
				val = key ? n : object[ n ];
				str += springf ? springf.springf( val ) : val;
			}
		}
		
		return str;
	}
	
	function buildFragment( html ) {
		var elem = document.createElement( 'div' );
		elem.innerHTML = html;
		
		return elem.firstElementChild;
	}
	
	// nome do items salvos em localStorage
	var memory = {
		settings: 'TWASettings' + game_data.player.id,
		data: 'TWAData' + game_data.player.id
	},
	// servidor atual do jogo
	market = game_data.market === 'br' ? 'pt' : game_data.market,
	newversion = false;
	
	// configurações e dados salvos
	twa.settings = localStorage[ memory.settings ] ? JSON.parse( localStorage[ memory.settings ] ) : false;
	twa.data = localStorage[ memory.data ] ? JSON.parse( localStorage[ memory.data ] ) : false;
	
	// caso não esteja na versão atual do script ou o script
	// não tenha sido executado nenhum vez ainda cria uma nova
	// configuração padrão para o script
	if((function() {
		// caso não exista as configurações ou os dados salvos
		// cria nova configuração
		if ( !twa.settings || !twa.data ) {
			return true;
		// caso a versão usada não seja a atual do script
		// cria novas configurações
		} else if ( twa.data.version !== twa.version ) {
			twa.data.version = twa.version;
			// salva as configurações e dados antigos para serem
			// repassados ao novo e não perdelas
			twa.oldSettings = twa.settings;
			twa.oldData = twa.data;
			newversion = true;
			
			return true;
		}
	})()) {
		localStorage[ memory.settings ] = JSON.stringify(twa.settings = jQuery.extend({
			mapcoords: true,
			profilecoords: true,
			_profilecoordsmin: 0,
			_profilecoordsmax: 12500,
			_mapplayers: true,
			_mapplayersmin: 0,
			_mapplayersmax: 1000,
			_mapabandoneds: true,
			_mapabandonedsmin: 0,
			_mapabandonedsmax: 12500,
			mapidentify: true,
			mapmanual: true,
			lastattack: true,
			rankinggraphic: true,
			allygraphic: true,
			profilestats: true,
			reportfilter: true,
			villagefilter: true,
			reportrename: true,
			commandrename: true,
			troopcounter: true,
			mapgenerator: true,
			reportcalc: true,
			_reportcalc: { actives: [ 'knight', 'light', 'marcher', 'spear' ], spy: 1, currentVillage: false },
			assistentfarm: true,
			autofarm: true,
			_autofarm: { protect: true, index: 0, units: {}, coords: [], random: true },
			building: true,
			_buildingbuild: { main: 20, barracks: 25, stable: 20, garage: 10, snob: 1, smith: 20, place: 1, statue: 1, market: 10, wood: 30, stone: 30, iron: 30, farm: 30, storage: 30, hide: 0, wall: 20 },
			_buildingdestroy: { main: 20, barracks: 25, stable: 20, garage: 10, snob: 1, smith: 20, place: 1, statue: 1, market: 10, wood: 30, stone: 30, iron: 30, farm: 30, storage: 30, hide: 0, wall: 20 },
			_buildingmaxorders: 5,
			research: true,
			changegroups: true,
			attackplanner: true,
			selectvillages: true,
			overview: true,
			_overviewmode: 'production',
			renamevillages: true,
			lang: market
		}, twa.oldSettings || {}));
		
		localStorage[memory.data] = JSON.stringify(twa.data = jQuery.extend({
			version: twa.version,
			attackplanner: {
				commands: [],
				lastTime: $serverTime.text() + ' ' + $serverDate.text()
			}
		}, twa.oldData || {}));
	}
	
	var languages = {
		en: {
			lang: 'English',
			config: {
				tooltip: {
					autofarm: 'Allows farm several villages automatically.',
					mapcoords: 'Allow to obtain map coords.',
					profilecoords: 'Allow to obtain village coords from player profile.',
					mapidentify: 'Add a mark in the villages that were obtained coordinates.',
					mapmanual: 'Allows you to obtain coordinates of villages from the map just clicking them.',
					rankinggraphic: 'Shows a pontuation graph on ranking page on hover over the name of player/tribe.',
					allygraphic: 'Shows a pontuation graph on members tribe on hover over the name of any player.',
					profilestats: 'Shows an area with multiple charts of a player/tribe in the same profile.',
					lastattack: 'Shows how much time has passed since the last attack on the map.',
					reportfilter: 'Shows a search field by title on report page.',
					villagefilter: 'Shows a field of search on overview page to search villages by name.',
					reportrename: 'Shows a field of search on report page to rename reports.',
					commandrename: 'Shows a field to rename commands on overview.',
					villagerename: 'Shows a field to rename villages on overview.',
					mapgenerator: 'Generate TW Stats maps from ranking page allowing select players or tribes that will be included on the map.',
					reportcalc: 'Makes calculating the amount of resources they currently have in starting a village of a spy report and shows the amount of troops needed to farm.',
					troopcounter: 'Makes the calculation of the amount of troops that has all the villages visible in views> troops. The amount is shown on the bottom.',
					assistentfarm: 'Make automatic attacks from the Assistent Farm page.',
					building: 'Mass constructions and demolitions in overview of buildings.',
					research: 'Mass research on overview page (just simple blacksmith, for now).',
					changegroups: 'Allows change in mass groups from any page of views.',
					attackplanner: 'Attacks with scheduled time automatically. Note: You must leave a tab with the script running in the game for the attacks being made??!',
					selectvillages: 'Function to select specific villages in overview, as villages with troops attack, defense, and with noble etc ...',
					overview: 'Add premium options on overview page for users without premium account.',
					renamevillages: 'Allow rename mass village on overview.'
				},
				title: 'Relaxeaza TWAdvanced v{0}',
				coords: 'Coords',
				autofarm: 'Auto Farmer.',
				mapcoords: 'Get map coords.',
				profilecoords: 'Get profile player coords.',
				mapidentify: 'Identify on get coords',
				mapmanual: 'Obtain coordinates manually',
				graphicstats: 'Graphics and Statistics',
				rankinggraphic: 'Ponctuation graphic on ranking.',
				allygraphic: 'Ponctuation graphic on members tribe.',
				profilestats: 'Shows stats of a player on player/trible profile.',
				lastattack: 'Show time of last attack on map.',
				reportfilter: 'Search field on reports.',
				villagefilter: 'Search villages on overview.',
				reportrename: 'Rename field to rename reports.',
				commandrename: 'Rename field to rename commands on overview.',
				villagerename: 'Field to rename villages on overview.',
				mapgenerator: 'Generate map from ranking page.',
				reportcalc: 'Calculate amount of resources in a village.',
				troopcounter: 'Calculate amount of troops.',
				assistentfarm: 'Auto-Farm Assistent',
				building: 'Mass builder/demolition.',
				research: 'Massive search Units',
				changegroups: 'Change groups on overview.',
				attackplanner: 'Attack planner',
				selectvillages: 'Village picker.',
				overview: 'Advanced overview.',
				savealert: 'Settings have been saved!',
				save: 'Save',
				other: 'Other options',
				renamevillages: 'Village renamer.'
			},
			mapcoords: {
				getcoords: 'Coords obtained',
				update: 'Update',
				mapplayers: 'Obtain player coords.',
				min: 'Min',
				max: 'Max',
				mapabandoneds: 'Obtain abandoneds coords.'
			},
			mapmanual: {
				getcoords: 'Coords obtained manually'
			},
			profilecoords: {
				everycoords: 'All coords',
				min: 'Min points.',
				max: 'Max points.'
			},
			profilegraphic: {
				stats: 'Stats'
			},
			lastattack: {
				year: 'year',
				years: 'years',
				days: 'd'
			},
			mapgenerator: {
				generate: 'Generate map',
				selectall: 'Select all'
			},
			reportfilter: {
				search: 'Report search:'
			},
			villagefilter: {
				search: 'Village search:'
			},
			reportcalc: {
				neededunits: 'Necessary units',
				currentvillage: 'Use troops of current village',
				unitscalc: 'Units calculated:',
				attack: 'Attack with these troops ',
				error: 'An error occurred on send attack:',
				success: 'Attack successfully sent!'
			},
			selectvillages: {
				selectvillages: 'Select villages:',
				unitsattack: 'with offense troops',
				unitsdefence: 'with deffense troops',
				unitsnob: 'with nobles'
			},
			rename: {
				rename: 'Rename',
				only: 'Only',
				selected: 'selected',
				report: 'reports',
				villages: 'villages',
				commands: 'commands'
			},
			assistentfarm: {
				auto: 'Auto',
				log: 'Assistent Farm Log',
				onvillage: 'on village'
			},
			autofarm: {
				farm: 'Farmer',
				autofarm: 'Auto-Farmer',
				coords: 'Coordinates:',
				protect: 'Protection - Don\'t send attack if village has an owner.',
				random: 'Random Time - Attacks are sent at a time between 0-10 seconds. (To complicate the detection of Auto Farm)',
				start: 'Start attacks',
				pause: 'Pause attacks',
				log: 'Attacks log',
				waitingreturn: 'There is no troops on the village right now. Waiting for troops come back!',
				notroops: 'There is no troops on the village.',
				success: 'Attacks sent in village {0}.'
			},
			building: {
				buildtitle: 'Mass Builder - Buildings',
				buildhelp: 'The buildings will be built to level indicated below!',
				cancelbuilds: 'Cancel all builders',
				destroytitle: 'Mass Demolition - Buildings',
				destroyhelp: 'The buildings will be demolished to the level indicated below!',
				canceldestroy: 'Cancel all demolitions',
				help: 'Click on the icon below the buildings to start construction on the building mass clicked.',
				demolitions: 'demolitions',
				buildings: 'builders',
				confirmcancel: 'Are you sure cancel all {0}?'
			},
			research: {
				help: 'Click the icon of the units below to start searching mass unit clicked.',
				cancel: 'Cancel all researches?',
				confirmcancel: 'Ara you sure cancel all researches?'
			},
			changegroups: {
				changegroups: 'Change groups of selected villages:',
				add: 'Add',
				remove: 'Remove',
				move: 'Move'
			},
			attackplanner: {
				planner: 'Plannet',
				attackplanner: 'Attack planner',
				addcommand: 'Add comand',
				attacker: 'Attacker village',
				target: 'Village target',
				time: 'Send time',
				support: 'Support',
				attack: 'Attack',
				troops: 'Troops',
				commands: 'Commands',
				type: 'Type',
				remove: 'Remove',
				commandssended: 'Commands sent',
				errorequal: '',
				errorunits: 'You aren\'t entered any unit!',
				errorcoords: 'Coords {0} doesn\'t exist.',
				success: '{0} send on village {1} to village {2} with the troops: {3}'
			},
			overview: {
				warning: '* The advanced visualization is best viewed with the window width above 1000px. (Settings -> Settings)',
				combined: 'Combined',
				production: 'Production',
				changemode: 'Change overview mode',
				needreload: 'You need to refresh page'
			}
		},
		sk: {
			lang: 'Slovak',
			config: {
				tooltip: {
					autofarm: 'Umožňuje niekoľko dedín poľnohospodár automaticky',
					mapcoords: 'Umožòuje zobrazi súradníce na mape.',
					profilecoords: 'Umožòuje zobrazi súradnice všetkých dedín hráèa.',
					mapidentify: 'Pridá udalos v dedinách, kde boli získané súradnice.',
					mapmanual: 'Umožòuje získa súradnice dedín v mape kliknutím na ne.',
					rankinggraphic: 'Ukazuje graf rastu v tabu¾ke každého hráèa alebo kmeòa.',
					allygraphic: 'Zobrazuje štatistiky vybraného kmeòa.',
					profilestats: 'Zobrazuje štatistiky vybraného hráèa.',
					lastattack: 'Ukazuje, ko¾ko èasu uplynulo od posledného útoku na mape.',
					reportfilter: 'Filter oznámení.',
					villagefilter: 'Filter dedín.',
					reportrename: 'Premenováva všetky alebo len vybrané oznámenia.',
					commandrename: 'Premenováva vybrané útoky.',
					villagerename: 'Premenováva vybrané dediny.',
					mapgenerator: 'TW Stats vygeneruje mapu vybraného hráèa alebo kmeòa.',
					reportcalc: 'Automaticky vypoèíta ko¾ko vojakov treba posla na kompletné vyfarmenie barbarky (potrebný špeh v predchádzajúcom útoku). ',
					troopcounter: 'Spoèítavá vojská. Zobrazenie> Jednotky. Suma sa zobrazí v dolnej èasti.',
					assistentfarm: 'Automaticky odosiela útoky v náh¾ade.',
					building: 'Stavia a búra budovy v náh¾ade.',
					research: 'Automaticky vyskúma všetky výskumy (zatia¾ len pre jednoduchý výskum).',
					changegroups: 'Umožnuje zmeni skupinu pre skupinu jednotlivých dedín.',
					attackplanner: 'Napadá dediny automaticky. Poznámka: Musíte opusti kartu a skript necha spustený!',
					selectvillages: 'Funkcia pre výber konkrétnej dediny v zobrazení, ako napr. útoèná dedina, obranná, šåachtic ...',
					overview: 'Pridat prémiové možnosti na stránke náhladu pre užívatelov bez premium úctu.',
					renamevillages: 'Premenovanie dedín v individuálnej a hromadnej prezeranie dedín.'
				},
				title: 'Relaxeaza TWAdvanced v{0}',
				coords: 'Súradnice',
				autofarm: 'Automatické Farma.',
				mapcoords: 'Získa súradnice na mape.',
				profilecoords: 'Získa súradnice z profilu hráèa.',
				mapidentify: 'Identifikova k získaniu súradníc',
				mapmanual: 'Zada súradnice ruène.',
				graphicstats: 'Grafy a štatistiky.',
				rankinggraphic: 'Bodový graf',
				allygraphic: 'Bodový graf kmeòa.',
				profilestats: 'Zobrazi štatistiky pre hráèa / kmeò.',
				lastattack: 'Zobrazi èas posledného útoku na mape.',
				reportfilter: 'Filter oznámenii.',
				villagefilter: 'Filter dediny v náh¾ade.',
				reportrename: 'Premenováva oznámenie.',
				commandrename: 'Premenováva útoky.',
				villagerename: 'Premenováva dediny.',
				mapgenerator: 'Generator mapy pod¾a predvolených bodov',
				reportcalc: 'Poèíta presne suroviny v dedine.',
				troopcounter: 'Vypoèítava množstvo vojakov.',
				assistentfarm: 'Autofarmiaci pomocník.',
				building: 'Stavanie / búranie budov.',
				research: 'Výskum.',
				changegroups: 'Zmena skupín v náh¾ade.',
				attackplanner: 'Plánovaè útokov.',
				selectvillages: 'Výber dedín.',
				overview: 'Advanced vizualizácie.',
				savealert: 'Nastavenia boli uložené!',
				save: 'Uložit',
				other: 'Dalšie možnosti',
				renamevillages: 'Renamer dediny'
			},
			mapcoords: {
				getcoords: 'Súradnice získané.',
				update: 'Aktualizova.',
				mapplayers: 'Získáva súradníce hráèov.',
				min: 'Minimálna.',
				max: 'Maximálna.',
				mapabandoneds: 'Súradnice barbariek získané.'
			},
			mapmanual: {
				getcoords: 'Suradnice, zadané ruène'
			},
			profilecoords: {
				everycoords: 'Všetky súradnice.',
				min: 'Minimálne hranica bodov.',
				max: 'Maximálna hranica bodov.'
			},
			profilegraphic: {
				stats: 'Štatistika.'
			},
			lastattack: {
				year: 'rok',
				years: 'rokov',
				days: 'd'
			},
			mapgenerator: {
				generate: 'Generova mapu',
				selectall: 'Vybra všetko'
			},
			reportfilter: {
				search: 'H¾ada oznámenia:'
			},
			villagefilter: {
				search: 'H¾ada dediny:'
			},
			reportcalc: {
				neededunits: 'Požadované vojsko:',
				currentvillage: 'Použitie vojska z aktuálnej dediny.',
				unitscalc: 'Vojsko vypoèíta:',
				attack: 'Útoèi s týmito vojakmi',
				error: 'Chyba!',
				success: 'Útok úspešne odoslaný!'
			},
			selectvillages: {
				selectvillages: 'Vybra dediny:',
				unitsattack: 'Vojská útoèia',
				unitsdefence: 'S obrannými jednotkami',
				unitsnob: 'So š¾achtami'
			},
			rename: {
				rename: 'Premenova',
				only: 'Iba',
				selected: 'Vybraný',
				report: 'Oznámenie',
				villages: 'Dediny',
				commands: 'Povely'
			},
			assistentfarm: {
				auto: 'Automatický',
				log: 'Logy',
				onvillage: 'Dedina'
			},
			autofarm: {
				farm: 'Farmenie',
				autofarm: 'Automatické farmenie',
				coords: 'Súradnice:',
				protect: 'Ochrana - Nebudú posielané útoky ak má dedina majite¾a.',
				random: 'Random Time - Útoky sú odosielané v čase medzi 0-10 sekúnd. (To komplikuje detekciu Auto Farm)',
				start: 'Štart',
				pause: 'Pozastavi útoky',
				log: 'Logy:',
				waitingreturn: 'Nie sú žiadne jednotky v dedine.Èaká sa na vracajúcich sa vojakov!',
				notroops: 'V dedine nie sú žiadne jednotky.',
				success: 'Útoky na dedinu odoslané {0}.'
			},
			building: {
				buildtitle: 'Hromadné stavenie - Budovy',
				buildhelp: 'Budovy budú postavené na úroveò uvedenú nižšie!',
				cancelbuilds: 'Zruši všetky príkazy na stavbu',
				destroytitle: 'Hromadné búranie - Budovy',
				destroyhelp: 'Budovy budú zbúrané na úroveò uvedenú nižšie!',
				canceldestroy: 'Zruši všetky demolácie',
				help: 'Kliknite na ikonu budovy, pre zaèatie automatického stavania.',
				demolitions: 'Búranie',
				buildings: 'Budovy',
				confirmcancel: 'Ste si istí, že chcete zruši všetky {0}?'
			},
			research: {
				help: 'Kliknite na ikonu výskum pre zaèatie hromadného skúmania',
				cancel: 'Zruši všetky skúmania',
				confirmcancel: 'Ste si istí, že chcete zruši všetky skúmania?'
			},
			changegroups: {
				changegroups: 'Zmena skupiny vybraných dedín:',
				add: 'Prida',
				remove: 'Odstráni',
				move: 'Pohyb'
			},
			attackplanner: {
				planner: 'Plánovaè',
				attackplanner: 'Plánovaè útokov',
				addcommand: 'Prida príkaz',
				attacker: 'Útoèiaca dedina',
				target: 'Cie¾',
				time: 'Doba dopadu',
				support: 'Podpora',
				attack: 'Útok',
				troops: 'Jednotky',
				commands: 'Príkazy',
				type: 'Typ',
				remove: 'Odstráni',
				commandssended: 'Odoslané útoky',
				errorequal: 'Súradnice dediny útoènika nemožu by rovnaké ako súradnice dediny cie¾a!',
				errorunits: 'Nezadali ste žiadnu jednotku!',
				errorcoords: 'Cie¾ {0} neexistuje!',
				success: '{0} Poslané z dedine {1} do dediny {2} s nasledujucími vojakmi {3}'
			},
			overview: {
				warning: '* Pokroèilá vizualizácia je optimalizovaná pre šírku okna nad 1000px. (Nastavenia -> Nastavenia)',
				combined: 'Kombinovaný',
				production: 'Produkcia',
				changemode: 'Zmena režimu zobrazenia',
				needreload: 'Potrebujete aktualizova stránku'
			}
		},
		pt: {
			lang: 'Português',
			config: {
				tooltip: {
					autofarm: 'Permite farmar várias aldeias automaticamente.',
					mapcoords: 'Permite obter coordenadas do mapa.',
					profilecoords: 'Permite obter coordenadas de aldeias apartir do perfil de um jogador.',
					mapidentify: 'Adiciona uma marcação nas aldeias que foram obtidas coordenadas.',
					mapmanual: 'Permite obter coordenadas de aldeias no mapa clicando nelas.',
					rankinggraphic: 'Mostra um gráfico de pontuação na classificação ao passar o mouse sobre o nome de algum jogador ou tribo.',
					allygraphic: 'Mostra um gráfico de pontuação na página de membros de uma tribo ao passar o mouse sobre o nome de algum jogador.',
					profilestats: 'Mostra uma área com vários gráficos de um jogador ou uma tribo no perfil do mesmo.',
					lastattack: 'Mostra quanto tempo se passou desde o último ataque no mapa.',
					reportfilter: 'Mostra um campo de pesquisa por título na página de relatórios.',
					villagefilter: 'Mostra um campo de pesquisa na visualização para pesquisar aldeias por nome.',
					reportrename: 'Mostra um campo na página de relatórios para renomear todos ou apenas os selecionados.',
					commandrename: 'Mostra um campo na visualização para renomear todas os comandos de apenas uma vez.',
					villagerename: 'Mostra um campo na visualização das aldeias para renomear todas as aldeias de apenas uma vez.',
					mapgenerator: 'Gera mapas do TW Stats direto da classificação permitindo selecionar os jogadores ou tribos que estaram incluidos no mapa.',
					reportcalc: 'Faz o calculo da quantidade de recursos que tem atualmente em uma aldeia apartir de um relatório de espionagem e mostra a quantidade de tropas necessárias para farmar.',
					troopcounter: 'Faz o calculo da quantidade de tropas que tempo todas as aldeias visiveis em visualizações > tropas. A quantidade é mostrada no final da página.',
					assistentfarm: 'Faz ataques automáticos apartir da página do Assistente de Farm.',
					building: 'Faz construções e demolições em massa na visualização dos edifícios.',
					research: 'Faz pesquisas em massa apartir da página de visualização de pesquisas (apenas ferreiro simples, por enquanto).',
					changegroups: 'Permite alterar grupos em massa apartir de qualquer página das visualizações.',
					attackplanner: 'Faz ataques programados com horário automaticamente. Obs.: é preciso deixar uma aba com o script rodando no jogo para os ataques serem efetuados!',
					selectvillages: 'Função para selecionar aldeias especificas na visualização, como aldeias com tropas de ataque, defesa, com nobres e etc...',
					overview: 'Adiciona opções premium na página de visualização para usuários sem conta premium.',
					renamevillages: 'Permite renomear aldeias em massa e individuais na visualização de aldeias.'
				},
				title: 'Relaxeaza TWAdvanced v{0}',
				coords: 'Coordenadas',
				autofarm: 'Farmador automático.',
				mapcoords: 'Obter coordenadas do mapa.',
				profilecoords: 'Obter coordenadas por perfil.',
				mapidentify: 'Identificar ao obter coordenadas',
				mapmanual: 'Obter coordenadas manualmente',
				graphicstats: 'Gráficos & Estatísticas',
				rankinggraphic: 'Gráfico de pontuação na classificação.',
				allygraphic: 'Gráfico de pontuação em membros da tribo.',
				profilestats: 'Mostrar estatísticas de um jogador/tribo no perfil.',
				lastattack: 'Mostrar tempo do último ataque no mapa.',
				reportfilter: 'Campo de pesquisa nos relatórios.',
				villagefilter: 'Pesquisa de aldeias na visualização.',
				reportrename: 'Campo para renomear relatórios.',
				commandrename: 'Campo para renomear comandos na visualização.',
				villagerename: 'Campo para renomear aldeias na visualização.',
				mapgenerator: 'Gerar mapa apartir da classificão.',
				reportcalc: 'Calcula recursos exatas em uma aldeia.',
				troopcounter: 'Calcula a quantidade de tropas.',
				assistentfarm: 'Assistente de Farm automático.',
				building: 'Construção/demolição em massa.',
				research: 'Pesquisa em massa.',
				changegroups: 'Alterar grupos na visualização.',
				attackplanner: 'Planeador de ataques.',
				selectvillages: 'Selecionador de aldeias.',
				overview: 'Visualização avançada.',
				savealert: 'As configurações foram salvas!',
				save: 'Salvar',
				other: 'Outras opções',
				renamevillages: 'Renomeador de aldeias'
			},
			mapcoords: {
				getcoords: 'Coordenadas obtidas',
				update: 'Atualizar',
				mapplayers: 'Obter coordenadas de jogadores.',
				min: 'Mínimo',
				max: 'Máximo',
				mapabandoneds: 'Obter coordenadas de abandonadas.'
			},
			mapmanual: {
				getcoords: 'Coordenadas obtidas manualmente'
			},
			profilecoords: {
				everycoords: 'Todas coordenadas',
				min: 'Pontuação mínima.',
				max: 'Pontuação máxima.'
			},
			profilegraphic: {
				stats: 'Estatísticas'
			},
			lastattack: {
				year: 'ano',
				years: 'anos',
				days: 'd'
			},
			mapgenerator: {
				generate: 'Gerar mapa',
				selectall: 'Selecionar todos'
			},
			reportfilter: {
				search: 'Pesquisar relatórios:'
			},
			villagefilter: {
				search: 'Pesquisar aldeias:'
			},
			reportcalc: {
				neededunits: 'Unidades necessárias:',
				currentvillage: 'Usar tropas da aldeia atual',
				unitscalc: 'Unidades calculadas:',
				attack: 'Atacar com essas tropas',
				error: 'Ocorreu o seguinte erro ao enviar o ataque:',
				success: 'Ataque enviado com sucesso!'
			},
			selectvillages: {
				selectvillages: 'Selecionar aldeias:',
				unitsattack: 'com tropas de ataque',
				unitsdefence: 'com tropas de defesa',
				unitsnob: 'com nobres'
			},
			rename: {
				rename: 'Renomear',
				only: 'Apenas',
				selected: 'selecionados',
				report: 'relatórios',
				villages: 'aldeias',
				commands: 'comandos'
			},
			assistentfarm: {
				auto: 'Automático',
				log: 'Farm Assistent Log',
				onvillage: 'na aldeia'
			},
			autofarm: {
				farm: 'Farmador',
				autofarm: 'Farmador Automático',
				coords: 'Coordenadas:',
				protect: 'Proteção - Não enviar ataques caso a aldeia tenha dono.',
				random: 'Tempo Aleatório - Os ataques são enviados em um tempo entre 0-10 segundos. (Para dificultar a detecção do Auto Farm)',
				start: 'Iniciar ataques',
				pause: 'Pausar ataques',
				log: 'Log de ataques:',
				waitingreturn: 'Não há tropas na aldeia no momento. Aguardando tropas retornarem!',
				notroops: 'Não existem tropas na aldeia.',
				success: 'Ataque enviado na aldeia {0}.'
			},
			building: {
				buildtitle: 'Construção em Massa - Edifícios',
				buildhelp: 'Os edifícios serão construidos até o nível indicado abaixo!',
				cancelbuilds: 'Cancelar todas as contruções',
				destroytitle: 'Demolição em Massa - Edifícios',
				destroyhelp: 'Os edifícios serão demolidos até o nível indicado abaixo!',
				canceldestroy: 'Cancelar todas as demolições',
				help: 'Clique no icone dos edifícios abaixo para iniciar a construção em massa do edifício clicado.',
				demolitions: 'demolições',
				buildings: 'construções',
				confirmcancel: 'Tem certeza que deseja cancelar todas as {0}?'
			},
			research: {
				help: 'Clique no icone das unidades abaixo para iniciar a pesquisa em massa da unidade clicada.',
				cancel: 'Cancelar todas as pesquisas',
				confirmcancel: 'Tem certeza que deseja cancelar todas as pesquisas?'
			},
			changegroups: {
				changegroups: 'Alterar grupos das aldeias selecionadas:',
				add: 'Adicionar',
				remove: 'Remover',
				move: 'Mover'
			},
			attackplanner: {
				planner: 'Planeador',
				attackplanner: 'Planeador de ataque',
				addcommand: 'Adicionar comando',
				attacker: 'Aldeia atacante',
				target: 'Aldeia alvo',
				time: 'Horário de envio',
				support: 'Apoio',
				attack: 'Ataque',
				troops: 'Tropas',
				commands: 'Comandos',
				type: 'Tipo',
				remove: 'Remover',
				commandssended: 'Comandos enviados',
				errorequal: 'As coordenadas da aldeia atacante não pode ser a mesma da aldeia de destino!',
				errorunits: 'Você não inseriu nenhuma unidade!',
				errorcoords: 'A coordenada {0} não existe.',
				success: '{0} enviado da aldeia {1} para a aldeia {2} com as seguintes tropas: {3}'
			},
			overview: {
				warning: '* A visualização avançada é melhor visualizada com a largura da janela acima de 1000px. (Configurações -> Configurações)',
				combined: 'Combinado',
				production: 'Produção',
				changemode: 'Alterar modo de visualização',
				needreload: 'Necessita atualizar página'
			}
		}
	};
	
	var lang = !languages[ twa.settings.lang ] ? languages.pt : languages[ twa.settings.lang ];
	
	if ( newversion ) {
		UI.addConfirmBox( 'Relaxeaza Tribal Wars Advanced - Version ' + twa.version + '. <p><b>News:</b> <a href="http://code.google.com/p/tribalwars-scripts/wiki/Relaxeaza_Tribal_Wars_Advanced#Histórico_de_atualizações">HERE</a></p>', function() {} );
	}
	
	twa.ready(function() {
		switch( game_data.screen ) {
			case 'map':
				( twa.settings._mapplayers || twa.settings._mapabandoneds ) && !document.getElementById( 'twa-getcoords' ) && twa.mapCoords.init();
				twa.settings.mapmanual && !document.getElementById( 'twa-mapmanual' ) && twa.mapManual();
				twa.settings.lastattack && game_data.player.premium && twa.lastAttack();
			break;
			case 'info_player':
				twa.settings.profilecoords && !document.getElementById( 'twa-profilecoords' ) && twa.profileCoords();
				twa.settings.profilestats && !document.getElementById( 'twa-graphic' ) && twa.profileGraphic();
			break;
			case 'info_ally':
				twa.settings.profilestats && !document.getElementById( 'twa-graphic' ) && twa.profileGraphic();
			break;
			case 'info_member':
				twa.settings.allygraphic && game_data.screen === 'info_member' && !document.getElementById( 'twa-tooltipgraphic' ) && twa.tooltipGraphic();
			break;
			case 'ranking':
				twa.settings.mapgenerator && !document.getElementById( 'twa-mapgenerator' ) && game_data.mode !== 'awards' && game_data.mode !== 'wars' && game_data.mode !== 'secrets' && twa.mapGenerator();
				twa.settings.rankinggraphic && !document.getElementsByClassName( 'twa-tooltipgraphic' ).length && twa.tooltipGraphic();
			break;
			case 'overview_villages':
				$overviewTools = jQuery( '<table class="vis" id="twa-overviewtools" style="display:none" width="100%"><tr><th>Tribal Wars Advanced</th></tr></table>' ).insertBefore( '.overview_table' );
				
				twa.settings.overview && !document.getElementById( 'twa-overview' ) && !game_data.player.premium && twa.overview.init();
				twa.settings.renamevillages && !document.getElementById( 'twa-villagerename' ) && twa.renamevillages.init();
				twa.settings.commandrename && overview === 'commands' && !document.getElementById( 'twa-commandrename' ) && twa.rename.commands();
				twa.settings.villagefilter && overview !== 'trader' && !document.getElementById( 'twa-villagefilter' ) && twa.villageFilter();
				overview !== 'trader' && overview !== 'groups' && overview !== 'commands' && !document.getElementsByClassName( 'twa-addcheckbox' ).length && twa.addCheckbox();
				twa.settings.troopcounter && overview === 'units' && !document.getElementById( 'twa-troopcounter' ) && twa.troopCounter();
				twa.settings.changegroups && game_data.player.premium && overview !== 'groups' && overview !== 'trader' && !document.getElementById( 'twa-changegroups' ) && twa.changegroups.init();
				twa.settings.building && overview === 'buildings' && !document.getElementById( 'twa-building' ) && twa.building.init();
				twa.settings.research && overview === 'tech' && !document.getElementById( 'twa-research' ) && twa.research.init();
				twa.settings.selectvillages && game_data.player.premium && twa.selectVillages.init();
			break;
			case 'report':
				twa.settings.reportcalc && /view\=\d+/.test( location.href ) && document.getElementById( 'attack_spy' ) && twa.reportCalc();
				twa.settings.reportfilter && !document.getElementById( 'twa-reportfinder' ) && twa.reportFilter();
				twa.settings.reportrename && game_data.player.premium && !document.getElementById( 'twa-reportrename' ) && twa.rename.reports();
			break;
			case 'am_farm':
				twa.settings.assistentfarm && game_data.player.farm_manager && !document.getElementsByClassName( 'error' ).length && !document.getElementById( 'twa-assistentfarm' ) && twa.assistentfarm.init();
			break;
			case 'settings':
				!document.getElementById( 'di' ) && twa.config();
			break;
		}
		
		twa.settings.attackplanner && !document.getElementById( 'twa-attackplaner' ) && twa.attackplanner.init();
		twa.settings.autofarm && !document.getElementById( 'twa-placefarm' ) && twa.autofarm.init();
	});
	
	window.twa = twa;
})();