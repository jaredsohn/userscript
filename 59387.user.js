// ==UserScript==
// @name           Neo-Game Reload
// @description    Rediseñado para universos nuevos, cumple funciones de Neogame -  v1.4.2
// @include        http://*.ogame.*/game/index.php?page=*
// @include        http://*.ogame.*/game/index.php?page=movement*
// ==/UserScript==





(function () {
	var mywindow;
	try { mywindow = unsafeWindow; }
	catch (e) { mywindow = window; }
	
	if (mywindow.AntiGame_started) return;
	mywindow.AntiGame_started = 1;
	
	var AntiGame_lang = {};
	
	AntiGame_lang.LabelsES =
	{
		lbl_missAttack: 'Ataque',
		lbl_missColony: 'Colonizacion',
		lbl_missDeploy: 'Desplegar',
		lbl_missDestroy: 'Destruir',
		lbl_missEspionage: 'Espionaje',
		lbl_missExpedition: 'Expedicion',
		lbl_missFederation: 'Confederation',
		lbl_missHarvest: 'Reciclaje',
		lbl_missHold: 'Mantener Posicion',
		lbl_missTransport: 'Transporte',
		
		lbl_shipSCargo: 'Carga Pequeña',
		lbl_shipLCargo: 'Carga Grande',
		lbl_shipLFighter: 'Cazador Ligero',
		lbl_shipHFighter: 'Cazador Pesado',
		lbl_shipCruiser: 'Crucero',
		lbl_shipBattleship: 'Nave de Batalla',
		lbl_shipColonizator: 'Colonzador',
		lbl_shipRecycler: 'Reciclador',
		lbl_shipSpy: 'Sondas',
		lbl_shipBomber: 'Bombardero',
		lbl_shipDestroyer: 'Destructor',
		lbl_shipRIP: 'Estrella de la Muerte',
		lbl_shipBCruiser: 'Acorazado',
		lbl_shipSatellite: 'Satelite Solar'
		
	}
	
	AntiGame_lang.InterfaceES =
	{
		opt_languageName: 'Español',
	
		opt_title: 'Opciones AntiGame',
		opt_btnOk: 'Aceptar',
		opt_btnCancel: 'Cancelar',
		opt_btnDefault: 'Por Defecto',

		opt_language: 'Lenguaje',
		opt_autocopyCoords: 'Auto-copiar coordenadas',
		opt_showLocalTime: "Muestra el horario local (solo las horas)",
		opt_blockAutoComplete: 'Bloquear Auto-Completar en Firefox',
		
		opt_galaxyShowRank: 'Mostrar ranking de jugadores y alianzas en el sistema',
		opt_galaxyRankColor: 'Jugadores y alianzas en colores',
		
		opt_galaxyDebrisMin: 'tamaño mínimo de los escombros para destacar (0 para desactivar)',
		opt_galaxyDebrisColor: 'Color de los escombros',
		
		opt_msg_showPlunder: 'Mostrar el robo en los informes de espionaje',
		opt_msg_fixColors: 'Fijar los colores de los informes de combate',
		
		opt_showDeficient: 'Mostrar los recursos deficientes',

		
		opt_missionPriority: 'Prioridad de Mision',
		
		opt_mvmt_expandFleets: 'Mostrar naves de carga necesarias',
		opt_mvmt_showReversal: 'Mostrar tiempo de retorno de las naves',
		
		opt_missAttack: 'Color de Mision: Ataque',
		opt_missColony: 'Color de Mision: Colonizacion',
		opt_missDeploy: 'Color de Mision: Depliegue',
		opt_missDestroy: 'Color de Mision: Destruir',
		opt_missEspionage: 'Color de Mision: Espionaje',
		opt_missExpedition: 'Color de Mision: Expedicion',
		opt_missFederation: 'Color de Mision: Confederacion',
		opt_missHarvest: 'Color de Mision: Reciclar',
		opt_missHold: 'Color de Mision: Mantener Posicion',
		opt_missTransport: 'Color de Mision: Transporte',
		
		// these label are shown in Options
		lbl_missAttack: 'Ataque',
		lbl_missColony: 'Colonizacion',
		lbl_missDeploy: 'Depliegue',
		lbl_missDestroy: 'Destruir',
		lbl_missEspionage: 'Espionaje',
		lbl_missExpedition: 'Expedicion',
		lbl_missFederation: 'Confederacion',
		lbl_missHarvest: 'Reciclaje',
		lbl_missHold: 'Mantener Posicion',
		lbl_missTransport: 'Transporte',

		
		lbl_TotalCapacity: 'Capacidad Total',
		lbl_mvmt_Return: 'R',
		lbl_mvmt_Expedition: 'E',
		
		lbl_resourses: 'Rescursos',
		lbl_debris: 'Escombros',
		lbl_total: 'Total',
		lbl_loot: 'Saqueo',
		lbl_metal: 'Metal',
		lbl_crystal: 'Cristal',
		
		lbl_deficientRes: 'Buscando recursos'

	}
	
	AntiGame_lang.LabelsEN =
	{
		lbl_missAttack: 'Attack',
		lbl_missColony: 'Colonization',
		lbl_missDeploy: 'Deploy',
		lbl_missDestroy: 'Destroy',
		lbl_missEspionage: 'Espionage',
		lbl_missExpedition: 'Expedition',
		lbl_missFederation: 'Federation',
		lbl_missHarvest: 'Harvest',
		lbl_missHold: 'Hold',
		lbl_missTransport: 'Transport',
		
		lbl_shipSCargo: 'Small Cargo',
		lbl_shipLCargo: 'Large Cargo',
		lbl_shipLFighter: 'Light Fighter',
		lbl_shipHFighter: 'Heavy Fighter',
		lbl_shipCruiser: 'Cruiser',
		lbl_shipBattleship: 'Battleship',
		lbl_shipColonizator: 'Colony Ship',
		lbl_shipRecycler: 'Recycler',
		lbl_shipSpy: 'Espionage Probe',
		lbl_shipBomber: 'Bomber',
		lbl_shipDestroyer: 'Destroyer',
		lbl_shipRIP: 'Deathstar',
		lbl_shipBCruiser: 'Battlecruiser',
		lbl_shipSatellite: 'Solar Satellite'
		
	}
	
	AntiGame_lang.InterfaceEN =
	{
		opt_languageName: 'English',
	
		opt_title: 'AntiGame Options',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Cancel',
		opt_btnDefault: 'Default',

		opt_language: 'Language',
		opt_autocopyCoords: 'Auto-copy coordinates',
		opt_showLocalTime: "Show local time instead of server's (hours only)",
		opt_blockAutoComplete: 'Block Auto-Complete in Firefox',
		
		opt_galaxyShowRank: 'Show player/alliance ranks in Galaxy view',
		opt_galaxyRankColor: 'Player/alliance ranks color',
		
		opt_galaxyDebrisMin: 'Minimal size of debris to highlight (0 to turn off)',
		opt_galaxyDebrisColor: 'Color of highlighted debris',
		
		opt_msg_showPlunder: 'Show plunder in spy reports',
		opt_msg_fixColors: 'Fix colors of combat reports',
		
		opt_showDeficient: 'Show deficient resources',

		
		opt_missionPriority: 'Mission priority',
		
		opt_mvmt_expandFleets: 'Show fleet ships and cargo',
		opt_mvmt_showReversal: 'Show reversal time for fleets',
		
		opt_missAttack: 'Mission color: Attack',
		opt_missColony: 'Mission color: Colonization',
		opt_missDeploy: 'Mission color: Deploy',
		opt_missDestroy: 'Mission color: Destroy',
		opt_missEspionage: 'Mission color: Espionage',
		opt_missExpedition: 'Mission color: Expedition',
		opt_missFederation: 'Mission color: Federation',
		opt_missHarvest: 'Mission color: Harvest',
		opt_missHold: 'Mission color: Hold',
		opt_missTransport: 'Mission color: Transport',
		
		// these label are shown in Options
		lbl_missAttack: 'Attack',
		lbl_missColony: 'Colonization',
		lbl_missDeploy: 'Deploy',
		lbl_missDestroy: 'Destroy',
		lbl_missEspionage: 'Espionage',
		lbl_missExpedition: 'Expedition',
		lbl_missFederation: 'Federation',
		lbl_missHarvest: 'Harvest',
		lbl_missHold: 'Hold',
		lbl_missTransport: 'Transport',

		
		lbl_TotalCapacity: 'Total capacity',
		lbl_mvmt_Return: 'R',
		lbl_mvmt_Expedition: 'E',
		
		lbl_resourses: 'Resources',
		lbl_debris: 'Debris',
		lbl_total: 'Total',
		lbl_loot: 'Loot',
		lbl_metal: 'Metal',
		lbl_crystal: 'Crystal',
		
		lbl_deficientRes: 'Missing resources'

	}
	
	
	AntiGame_lang.LabelsRU =
	{
		lbl_missAttack: 'Атака',
		lbl_missColony: 'Колонизировать',
		lbl_missDeploy: 'Оставить',
		lbl_missDestroy: 'Уничтожить',
		lbl_missEspionage: 'Шпионаж',
		lbl_missExpedition: 'Экспедиция',
		lbl_missFederation: 'Совместная атака',
		lbl_missHarvest: 'Переработать',
		lbl_missHold: 'Удержать',
		lbl_missTransport: 'Транспорт',
		
		lbl_shipSCargo: 'Малый транспорт',
		lbl_shipLCargo: 'Большой транспорт',
		lbl_shipLFighter: 'Лёгкий истребитель',
		lbl_shipHFighter: 'Тяжёлый истребитель',
		lbl_shipCruiser: 'Крейсер',
		lbl_shipBattleship: 'Линкор',
		lbl_shipColonizator: 'Колонизатор',
		lbl_shipRecycler: 'Переработчик',
		lbl_shipSpy: 'Шпионский зонд',
		lbl_shipBomber: 'Бомбардировщик',
		lbl_shipDestroyer: 'Уничтожитель',
		lbl_shipRIP: 'Звезда смерти',
		lbl_shipBCruiser: 'Линейный крейсер',
		lbl_shipSatellite: 'Солнечный спутник'
		
	}
	
	AntiGame_lang.InterfaceRU =
	{
		opt_languageName: 'Русский',
				
		opt_title: 'Настройки AntiGame',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Отмена',
		opt_btnDefault: 'По умолчанию',

		opt_language: 'Язык',
		opt_autocopyCoords: 'Авто-вставка координат',
		opt_showLocalTime: 'Показывать локальное время вместо серверного (только часы)',
		opt_blockAutoComplete: 'Отключить Авто-Заполнение в Firefox',
		
		opt_galaxyShowRank: 'Показывать рейтинг игрока/альянса в Галактике',
		opt_galaxyRankColor: 'Цвет для рейтинга игрока/альянса',
		opt_galaxyDebrisMin: 'Минимальный размер ПО для подсветки (0 - не подсвечивать)',
		opt_galaxyDebrisColor: 'Цвет подсвеченного ПО',
		
		opt_msg_showPlunder: 'Показывать возможную добычу в шпионских докладах',
		opt_msg_fixColors: 'Исправить цвета боевых докладов',
		
		opt_showDeficient: 'Показывать недостающие ресурсы',
		
		opt_missionPriority: 'Приоритет задания',
		
		opt_mvmt_expandFleets: 'Показывать состав и груз флотов',
		opt_mvmt_showReversal: 'Показывать время возврата флота при отзыве',
		
		opt_missAttack: 'Цвет флота, задание: Атака',
		opt_missColony: 'Цвет флота, задание: Колонизировать',
		opt_missDeploy: 'Цвет флота, задание: Оставить',
		opt_missDestroy: 'Цвет флота, задание: Уничтожить',
		opt_missEspionage: 'Цвет флота, задание: Шпионаж',
		opt_missExpedition: 'Цвет флота, задание: Экспедиция',
		opt_missFederation: 'Цвет флота, задание: Совместная атака',
		opt_missHarvest: 'Цвет флота, задание: Переработать',
		opt_missHold: 'Цвет флота, задание: Удержать',
		opt_missTransport: 'Цвет флота, задание: Транспорт',

		// these label are shown in Options
		lbl_missAttack: 'Атака',
		lbl_missColony: 'Колонизировать',
		lbl_missDeploy: 'Оставить',
		lbl_missDestroy: 'Уничтожить',
		lbl_missEspionage: 'Шпионаж',
		lbl_missExpedition: 'Экспедиция',
		lbl_missFederation: 'Совместная атака',
		lbl_missHarvest: 'Переработать',
		lbl_missHold: 'Удержать',
		lbl_missTransport: 'Транспорт',

		
		lbl_TotalCapacity: 'Суммарная вместимость',
		lbl_mvmt_Return: 'В',
		lbl_mvmt_Expedition: 'Э',
		
		lbl_resourses: 'Ресурсы',
		lbl_debris: 'Лом',
		lbl_total: 'Всего',
		lbl_loot: 'Добыча',
		lbl_metal: 'Металл',
		lbl_crystal: 'Кристалл',
		
		lbl_deficientRes: 'Ресурсов не хватает'
	}
			

	var Options =
	{
		// 1 - attack
		// 2 - federation
		// 3 - transport
		// 4 - deploy
		// 5 - hold
		// 6 - espionage
		// 7 - colonization
		// 8 - recycle
		// 9 - destroy
		// 15 - expedition
		mission1: 6,
		mission2: 1,
		mission3: 4,
		mission4: 3,
		mission5: 9,
		
		missAttack: '#66CC33',
		missColony: '#C1C1C1',
		missDeploy: '#666666',
		missDestroy: '#FFFF99',
		missEspionage: '#FFCC66',
		missExpedition: '#5555BB',
		missFederation: '#CC6666',
		missHarvest: '#CEFF68',
		missHold: '#80A0C0',
		missTransport: '#A0FFA0',
		missMissile: '#FFCC66',
		
		mvmt_expandFleets: true,
		mvmt_showReversal: true,
		
		fleet_showCapacity: true,

		galaxyShowRank: true,
		galaxyRankColor: '#DDDDDD',
		
		galaxyDebrisMin: 10000,
		galaxyDebrisColor: '#FF0000',
		galaxyRank10: '#FFFF40',
		galaxyRank50: '#FFDF00',
		galaxyRank100: '#FFBF00',
		galaxyRank200: '#FF8F00',
		galaxyRank800: '#33FF33',
		galaxyRank0: '#305060',
		
		msg_showPlunder: true,
		msg_fixColors: true,


		blockAutoComplete: true,
		autocopyCoords: true,
		showLocalTime: true,
		showFinishTime: true,
		showDeficient : true,
		
		language: '',
		Labels: null,
		Interface: null,
		
		saveOptions: function()
		{
			try {
				var str = '';

				for (var i in Options) {
					var param = Options[i];
					var type = typeof(param);
					if (type == 'number' || type == 'string' || type == 'boolean') {
						if (str != '') str +='&';
						str += i+'='+param;
					}
				}
				Utils.setValue('antigame', str);
			}
			catch (e) { Utils.log(e); }
		},
		
		loadOptions: function()
		{
			try {
				var str = Utils.getValue('antigame');
				if (!str) return;
				
				str = str.split('&');

				for (var i=0; i<str.length; i++) {
					var pair = str[i].split('=');
					if (!pair || pair.length != 2) continue;

					var param = Options[pair[0]];
					switch (typeof(param))
					{
						case('number'): Options[pair[0]] = parseInt(pair[1]); break;
						case('string'): Options[pair[0]] = pair[1]; break;
						case('boolean'): Options[pair[0]] = (pair[1]=='true' ? true: false); break;
						default: ;
					}
				}
			}
			catch (e) { Utils.log(e); }

		},
		
		setOptionWithValidation: function(name, value)
		{
			var oldtype = this.getValueType(Options[name]);
			var newtype = this.getValueType(value);
			if ( (oldtype != 'number' && oldtype != 'color') || oldtype == newtype )
			{	
				if (oldtype == 'color')
					value = value.toUpperCase();
				Options[name] = value;
			}
		},
		
		getValueType: function(value)
		{
			if (!value) return typeof(value);
			
			var val = value.toString();
			
			if ( val.replace(/\d{1,10}/i, '') == '' ) return 'number';
			if ( val.replace(/#[A-F\d]{6,6}/i, '') == '' ) return 'color';
			
			return 'string';
		},
		
		insertCSSRules: function()
		{
			Utils.insertCSSRule('#anti_options_window { ' +
				'position:absolute; '+
				'left: 200px; ' +
				'top:100px; ' +
				'width:500px; ' +
				//'height:300px; ' +
				'background:#202025; ' +
				'border: 1px solid black; ' +
				'z-index:1000; ' +
				'}');

			Utils.insertCSSRule('#anti_options_window div { ' +
				'padding: 10px; ' +
				'}');

			Utils.insertCSSRule('#anti_options_window #content { ' +
				'text-align: left;' +
				'max-height: 400px;' +
				'overflow:auto;' +
				'border: 1px black dashed;' +
				'}');

			Utils.insertCSSRule('#anti_options_window #content td { ' +
				'padding: 0.2em;' +
				'text-align: left;' +
				'font-size: 11px;' +
				'}');

			Utils.insertCSSRule('#anti_options_window input[type="text"] { ' +
				'width: 8em;' +
				'}');
				
			Utils.insertCSSRule('#anti_options_window option { ' +
				'width: 7em;' +
				'}');


			Utils.insertCSSRule('.anti_button { ' +
				'display: block; ' +
				'float: left; ' +
				'width: 50px; ' +
				'background:#442233; ' +
				'border: 2px black solid;' +
				'text-decoration: none;' +
				'margin: 0px 5px;' +
				'padding: 2px 5px;' +
				'}');
			Utils.insertCSSRule('.anti_button:hover { ' +
				'background:#664466; ' +
				'}');
		},

		addOptionsButton: function()
		{
			try {
				var $ = Utils.unsafeWindow().$;
				var item = $('#menuTable li:last').clone(true);
				
				item.find('.menu_icon').remove();
				item.find('.menubutton')
					.attr('href','javascript:void(0)')
					.attr('id','btnAntiOptions')
					.bind('click', Options.showWindow)
					.find('.textlabel').html('Antigame');
				item.appendTo('#menuTable');
			}
			catch (e) { Utils.log(e); }
		},

		hideWindow: function(save)
		{
			try {
				var $ = Utils.unsafeWindow().$;
				
				if (save) {
					var inputs = $('#anti_options_window input, #anti_options_window select');

					for (var i=0; i<inputs.length; i++) {
						var item = inputs.eq(i);
						var id = item.attr('id');
						var param = Options[id];

						if (typeof(param) == 'boolean')
							Options[id] = item.attr('checked');

						else if ( (typeof(param) == 'string' || typeof(param) == 'number') ) {
							Options.setOptionWithValidation(id, item.attr('value'))
						}
					}
					
					Options.saveOptions();
				}

				$('#anti_options_window').addClass('hidden');
			}
			catch (e) { Utils.log(e); }
		},

		showWindow: function()
		{
			try {
				var $ = Utils.unsafeWindow().$;
				
				if ($('#anti_options_window').length == 0) Options.createWindow();

				var inputs = $('#anti_options_window input, #anti_options_window select');
				
				for (var i=0; i<inputs.length; i++) {
					var item = inputs.eq(i);
					var param = Options[item.attr('id')];
					
					if (typeof(param) == 'boolean' && param)
						item.attr('checked', param);

					else if ( (typeof(param) == 'string' || typeof(param) == 'number') )
						item.attr('value', param);
				}

				$('#anti_options_window .color').trigger('keyup');

				$('#anti_options_window').removeClass('hidden');
			}
			catch (e) { Utils.log(e); }
		},

		changeInputColor: function(e)
		{
			try {
				if (Options.getValueType(e.target.value) == 'color')
					e.target.style.backgroundColor = e.target.value;
			}
			catch (e) {Utils.log(e); }
			return true;
		},
		
		createWindow: function()
		{
			function createButton(id) {
				var str = '<a class="anti_button" id="'+id+'" href="javascript:void(0)">'+Options.Interface['opt_'+id]+'</a>';
				return str;
			}
			
			function addSection(label, content, newrow) {
				if(typeof(newrow) == 'undefined') newrow = true;

				var str = '<td class="label">'+label+'</td><td class="input">'+content+'</td>';
				if (newrow) str = '<tr>' + str + '</tr>';

				return str;
			}

			function createSelect(id, options, label, newrow) {
				if(typeof(newrow) == 'undefined') newrow = true;
				if(typeof(label) == 'undefined' || label == '-auto-') label = Options.Interface['opt_'+id];

				var str = '';

				for (var i=0; i<options.length; i++) {
					str += '<option value="'+options[i].value+'">'+options[i].text+'</option>';
				}

				str = '<select id="'+id+'">' + str + '</select>';
				str = addSection(label, str, newrow);
				return str;
			}

			function createInput(id,label,newrow) {
				var param = Options[id];
				var type, class_attr='';
				if (typeof(param)=='boolean') type = 'checkbox';
				if ((typeof(param) == 'string' || typeof(param) == 'number') ) type = 'text';

				if(!type) return;
				
				if (Options.getValueType(param) == 'color') class_attr = 'class="color"';

				if(typeof(newrow) == 'undefined') newrow = true;
				
				if(typeof(label) == 'undefined' || label == '-auto-') label = Options.Interface['opt_'+id];

				var str = addSection(label, '<input id="'+id+'" type="'+type+'" '+class_attr+'>', newrow);
				return str;
			}

			var $ = Utils.unsafeWindow().$;
			
			var missions = [
				{value:1, text:Options.Interface.lbl_missAttack},
				{value:3, text:Options.Interface.lbl_missTransport},
				{value:4, text:Options.Interface.lbl_missDeploy},
				{value:5, text:Options.Interface.lbl_missHold},
				{value:6, text:Options.Interface.lbl_missEspionage},
				{value:9, text:Options.Interface.lbl_missDestroy},
				];
				
			var language_list = [];
			for (var i in AntiGame_lang) {
				var str = i.toString().match(/^Interface([A-Z]{2,3})$/);
				if (str)
					language_list.push( {value: str[1], text: AntiGame_lang[i].opt_languageName} );
			}

			missions.sort( function (a,b) { return (a.text==b.text) ? 0 :  (a.text<b.text) ? -1 : 1 } );

			var div = document.createElement('div');
			div.className = 'hidden';
			div.id = 'anti_options_window';
			div.innerHTML =
				'<div id="title">'+Options.Interface.opt_title+'</div>' + 
				'<div id="content"><table>' +
					createSelect('language', language_list) +
					createInput('autocopyCoords') +
					createInput('showLocalTime') +
					createInput('blockAutoComplete') +
					createInput('galaxyShowRank') +
					createInput('galaxyRankColor') +
					createInput('galaxyDebrisMin') +
					createInput('galaxyDebrisColor') +
					createInput('msg_showPlunder') +
					createInput('msg_fixColors') +
					createInput('showDeficient') +
					createSelect('mission1', missions, Options.Interface.opt_missionPriority) +
					createSelect('mission2', missions, '') +
					createSelect('mission3', missions, '') +
					createSelect('mission4', missions, '') +
					createSelect('mission5', missions, '') +
					createInput('mvmt_expandFleets') +
					createInput('mvmt_showReversal') +
					createInput('missAttack') +
					createInput('missColony') +
					createInput('missDeploy') +
					createInput('missDestroy') +
					createInput('missEspionage') +
					createInput('missExpedition') +
					createInput('missFederation') +
					createInput('missHarvest') +
					createInput('missHold') +
					createInput('missTransport') +
					createInput('missHarvest') +
				'</table></div>' +
				'<div id="control">' + 
					createButton('btnOk') + createButton('btnCancel') + 
				'<div style="clear:both; padding: 0px"></div></div>';
			document.body.appendChild(div);
			
			$('#btnOk').bind('click', function() { setTimeout( function () {Options.hideWindow(true);}, 0)} );
			$('#btnCancel').bind('click', function() { Options.hideWindow(false);} );
			$('#anti_options_window .color')
				.bind('change', Options.changeInputColor)
				.bind('keyup', Options.changeInputColor);
		},
		
		copyMissingProperties: function(src, parent, strChild)
		{
			var dst = parent[strChild];
			if (!dst) {
				parent[strChild] = src;
				return;
			}
			
			if (src === dst) return;

			for (i in src) {
				if ( !dst[i] || typeof(src[i]) != typeof(dst[i]) )
					dst[i] = src[i];
			}
		},

		readResLabels: function()
		{
			function getValueFromId(id) {
				var node = document.getElementById(id);
				if (!node || !node.title) return;
				
				return node.title.match(/\|<B>\s*(.+):\s*<\/B>/i)[1];
			}
			
			this.Labels.lbl_metal = getValueFromId('metal_box');
			this.Labels.lbl_crystal = getValueFromId('crystal_box');
			this.Labels.lbl_deuterium = getValueFromId('deuterium_box');
		},
		
		getServerLang: function()
		{
			var lang = "EN";
			
			var url = document.location.href;
			server = url.match(/http:\/\/([^\\\/]+[\\\/])/i);
			
			if (server) server = server[1].toUpperCase();
			server = server.replace(/\\/i, '/');
			
			if 		(server.indexOf('AR.OGAME.ORG/') > -1)  lang = 'AR'; // Argentina
			else if (server.indexOf('BA.OGAME.ORG/') > -1)  lang = 'BA'; // Balkan countries
			else if (server.indexOf('BG.OGAME.ORG/') > -1)  lang = 'BG'; // Bulgaria
			else if (server.indexOf('OGAME.COM.BR/') > -1)  lang = 'BR'; // Brasil
			else if (server.indexOf('CN.OGAME.ORG/') > -1)  lang = 'CN'; // China
			else if (server.indexOf('OGAME.CZ/') > -1)  lang = 'CZ'; // Czech Republic
			else if (server.indexOf('OGAME.DE/') > -1)  lang = 'DE'; // Germany
			else if (server.indexOf('OGAME.DK/') > -1)  lang = 'DK'; // Denmark
			else if (server.indexOf('OGAME.ORG/') > -1) lang = 'EN'; // UK
			else if (server.indexOf('OGAME.COM.ES/') > -1)  lang = 'ES'; // Spain
			else if (server.indexOf('FI.OGAME.ORG/') > -1)  lang = 'FI'; // Finnland
			else if (server.indexOf('OGAME.FR/') > -1)  lang = 'FR'; // France
			else if (server.indexOf('OGAME.GR/') > -1)  lang = 'GR'; // Greece
			else if (server.indexOf('OGAME.HU/') > -1)  lang = 'HU'; // Hungary
			else if (server.indexOf('OGAME.IT/') > -1)  lang = 'IT'; // Italy
			else if (server.indexOf('OGAME.JP/') > -1)  lang = 'JP'; // Japan
			else if (server.indexOf('OGAME2.CO.KR/') > -1)  lang = 'KR'; // Korea
			else if (server.indexOf('OGAME.LT/') > -1)  lang = 'LT'; // Lithuania
			else if (server.indexOf('OGAME.LV/') > -1)  lang = 'LV'; // Latvia
			else if (server.indexOf('MX.OGAME.ORG/') > -1)  lang = 'MX'; // Mexico
			else if (server.indexOf('OGAME.NL/') > -1)  lang = 'NL'; // Netherlands
			else if (server.indexOf('OGAME.NO/') > -1)  lang = 'NO'; // Norway
			else if (server.indexOf('OGAME.ONET.PL/') > -1)  lang = 'PL'; // Poland
			else if (server.indexOf('OGAME.COM.PT/') > -1)  lang = 'PT'; // Portugal
			else if (server.indexOf('OGAME.RO/') > -1)  lang = 'RO'; // Romania
			else if (server.indexOf('OGAME.RU/') > -1)  lang = 'RU'; // Russia
			else if (server.indexOf('OGAME.SE/') > -1)  lang = 'SE'; // Sweden
			else if (server.indexOf('OGAME.SI/') > -1)  lang = 'SI'; // Slovenia
			else if (server.indexOf('OGAME.SK/') > -1)  lang = 'SK'; // Slovakia
			else if (server.indexOf('OGAME.COM.TR/') > -1)  lang = 'TR'; // Turkey
			else if (server.indexOf('OGAME.TW/') > -1)  lang = 'TW'; // Taiwan
			else if (server.indexOf('OGAME.US/') > -1 ) lang = 'EN'; // USA
			
			return lang;
		},
		
		initLang: function()
		{
			var server_lang = this.getServerLang();
			if (!this.language) this.language = server_lang;
			
			var external_langpack = Utils.unsafeWindow().AntiGame_lang;
			if (external_langpack)
				for (var i in external_langpack)
					AntiGame_lang[i] = external_langpack[i];

			this.Interface = AntiGame_lang['Interface'+this.language];
			this.Labels = AntiGame_lang['Labels'+server_lang];
						
			this.copyMissingProperties(AntiGame_lang.LabelsEN, this, 'Labels');
			this.copyMissingProperties(AntiGame_lang.InterfaceEN, this, 'Interface');
			
			this.readResLabels();
		},
		
		Init: function()
		{
			this.insertCSSRules();
			this.loadOptions();
			
			this.initLang();
			this.addOptionsButton();

		}
	}


	// =======================================================================
	// Date/Time functions
	// =======================================================================

	var DateTime = 
	{
		TimeDelta: 0,
		TimeZoneDelta: 0,

		getTimeDelta: function()
		{
			if (Utils.isCurrentPage('showmessage,eventList'))
			{
				this.TimeZoneDelta = parseInt(Utils.getValue('TimeZoneDelta', 0));
				return;
			}
			
			this.TimeDelta = 0;
			if (!Utils.script) return;
			
			var str = Utils.script.innerHTML.match(/timeDelta\s*=\s*(\d+)\s*\-\s*localTS/i);
			if (!str) return;
			
			var serverTime = parseInt(str[1]);
			
			if (!serverTime) return;

			var now = new Date();
			
			// server time (using current timezone) - local time
			this.TimeDelta = now.getTime() - serverTime;

			// timezone correction
			this.TimeZoneDelta =	Date.parse(this.formatDate		(now,'[m]/[d]/[Y] [H]:[i]:[s]')) -
									Date.parse(this.formatDateServer(now,'[m]/[d]/[Y] [H]:[i]:[s]'));

			if (!Utils.isCurrentPage('showmessage,eventList'))
				Utils.setValue('TimeZoneDelta', this.TimeZoneDelta);

		},

		LZ: function(x)
		{
			return (x<0||x>9?"":"0") + x;
		},

		getDatePart: function (date)
		{ 
			return Date.UTC(date.getFullYear(),date.getMonth(),date.getDate()); 
		},
		
		getFinishTime: function(tick)
		{
			var date = new Date();
			date.setTime(date.getTime() + parseInt(tick)*1000);
			return date;
		},
		
		formatDate: function (date, format)
		{
			var str = "";
			try {
				if (!format || format=="") {
					format = '[H]:[i]:[s]';
					var now = new Date();

					if (this.getDatePart(now) != this.getDatePart(date) )
						format = '[d]/[m] ' + format;
				}
				
				var str = format;
				
				str = str.replace("[d]",this.LZ(date.getDate()));
				str = str.replace("[m]", this.LZ(date.getMonth()+1));
				str = str.replace("[Y]", date.getFullYear());
				str = str.replace("[y]", date.getFullYear().toString().substr(2,4));
				str = str.replace("[H]", this.LZ(date.getHours()));
				str = str.replace("[i]", this.LZ(date.getMinutes()));
				str = str.replace("[s]",this.LZ(date.getSeconds()));
			}
			catch (e) { Utils.log(e); }

			return str;
		},
		
		formatDateServer: function (date, format)
		{
			if (!format || format=="") {
				format = '[H]:[i]:[s]';
				var now = new Date();

				if (this.getDatePart(now) != this.getDatePart(date) )
					format = '[d]/[m] ' + format;
			}

			return Utils.unsafeWindow().getFormatedDate(date.getTime(), format);
		},

		parse: function (strDate, format, log)
		{
			strDate = strDate.toString();
			var str = format.match(/\[[dmyYHis]\]/g);
			
			if (!str || !str.length) return null;

			var rx = format;
			rx = rx.replace(/\./g,'\\.');
			rx = rx.replace(/\//g,'\\/');
			rx = rx.replace(/\-/g,'\\-');
			
			var index = {};

			for (var i=0; i<str.length; i++) {
				var token = str[i];
				if (token == '[Y]') rx = rx.replace(token, '(\\d{4,4})');
				else if (token == '[y]') rx = rx.replace(token, '(\\d{2,2})');
				else rx = rx.replace(token, '(\\d{1,2})');

				token = token.substr(1,1);
				index[token] = i+1;
			}
			
			str = strDate.match(new RegExp(rx, ''));
			
			
			if (!str || !str.length) return null;
			
			
			var date = new Date();
			
			if (str[index.s]) date.setSeconds(str[index.s]);
			if (str[index.i]) date.setMinutes(str[index.i]);
			if (str[index.H]) date.setHours(str[index.H]);
			
			if (str[index.Y]) date.setFullYear(str[index.Y]);
			else if (str[index.y]) {
				var year = date.getFullYear();
				year = Math.floor(year / 100) * 100 + str[index.y];
				if (year > date.getFullYear()) year -= 100;
				date.setFullYear(year);
			}
			
			if (str[index.m]) date.setMonth(str[index.m] - 1);
			if (str[index.d]) date.setDate(str[index.d]);

			return date;
		},
		
		parse2: function(strDate, timeFormat, dateFormat)
		{
			if (!strDate) return null;
			
			if (!timeFormat) {
				timeFormat = '[H]:[i]:[s]';
				dateFormat = '[d].[m].[Y]';
			}

			var str = strDate.toString();

			if (!dateFormat)
			{
				return this.parse(str, timeFormat, true);
			}
			else 
			{
				var time = this.parse(str, timeFormat);
				var date = this.parse(str, dateFormat);

				if (!date && !time) return null;

				var newDate = new Date();

				if (date) {
					newDate.setFullYear(date.getFullYear());
					newDate.setMonth(date.getMonth());
					newDate.setDate(date.getDate());
				}

				if (time) {
					newDate.setHours(time.getHours());
					newDate.setMinutes(time.getMinutes());
					newDate.setSeconds(time.getSeconds());
				}
				
				return newDate;
			}
		},
		
		convertDateServer2Local: function(date)
		{
			var newDate = new Date();
			newDate.setTime( date.getTime() + this.TimeZoneDelta );
			return newDate;
		},
		
		convertStringServer2Local: function (strDate, timeFormat, dateFormat)
		{
			if (!timeFormat) {
				timeFormat = '[H]:[i]:[s]';
				dateFormat = '[d].[m].[Y]';
			}

			var oldDate = this.parse2(strDate, timeFormat, dateFormat);
			if (!oldDate) return strDate;

			var newDate = this.convertDateServer2Local(oldDate);
			
			var str = strDate.toString();
			str = str.replace(this.formatDate(oldDate,timeFormat), this.formatDate(newDate,timeFormat));
			
			if (dateFormat) str = str.replace(this.formatDate(oldDate,dateFormat), this.formatDate(newDate,dateFormat));
			
			return str;
		},
		
		changeOgameClocks2Local: function()
		{
			var code =	'window.old_getFormatedDate = window.getFormatedDate; ' +
						'window.getFormatedDate = function (date,format) ' +
						'{ return window.old_getFormatedDate(date+'+DateTime.TimeZoneDelta+', format); };'
					;
			Utils.runScript(code);
		},
		
		Init: function()
		{
			this.getTimeDelta();
			
			if (Options.showLocalTime)
				this.changeOgameClocks2Local();
		}
	}


	// =======================================================================
	// misc functions
	// =======================================================================
	var Utils =
	{
		// wrappers for GM functions
		setValue: function ( cookieName, cookieValue )
		{
			if (Utils.isFirefox)
				GM_setValue(cookieName, cookieValue);
				
			else {
			if( !cookieName ) { return; }
				var lifeTime = 31536000;
				document.cookie = escape( cookieName ) + "=" + escape( Utils.getRecoverableString( cookieValue ) ) +
					";expires=" + ( new Date( ( new Date() ).getTime() + ( 1000 * lifeTime ) ) ).toGMTString() + ";path=/";
			}
		},

		getValue: function ( cookieName, oDefault )
		{
			if (Utils.isFirefox)
				return GM_getValue(cookieName, oDefault);
				
			else {
				var cookieJar = document.cookie.split( "; " );
				for( var x = 0; x < cookieJar.length; x++ ) {
					var oneCookie = cookieJar[x].split( "=" );
					if( oneCookie[0] == escape( cookieName ) ) {
						try {
							eval('var footm = '+unescape( oneCookie[1] ));
						} catch(e) { return oDefault; }
						return footm;
					}
				}
				return oDefault;
			}
		},

		log: function (str)
		{
			if (Utils.isFirefox)
				GM_log(str);
			else if (Utils.isOpera)
				window.opera.postError(str);
		},
		
		getRecoverableString: function(oVar,notFirst)
		{
			var oType = typeof(oVar);
			if( ( oType == 'null' ) || ( oType == 'object' && !oVar ) ) {
				//most browsers say that the typeof for null is 'object', but unlike a real
				//object, it will not have any overall value
				return 'null';
			}
			if( oType == 'undefined' ) { return 'window.uDfXZ0_d'; }
			if( oType == 'object' ) {
				//Safari throws errors when comparing non-objects with window/document/etc
				if( oVar == window ) { return 'window'; }
				if( oVar == document ) { return 'document'; }
				if( oVar == document.body ) { return 'document.body'; }
				if( oVar == document.documentElement ) { return 'document.documentElement'; }
			}
			if( oVar.nodeType && ( oVar.childNodes || oVar.ownerElement ) ) { return '{error:\'DOM node\'}'; }
			if( !notFirst ) {
				Object.prototype.toRecoverableString = function (oBn) {
					if( this.tempLockIgnoreMe ) { return '{\'LoopBack\'}'; }
					this.tempLockIgnoreMe = true;
					var retVal = '{', sepChar = '', j;
					for( var i in this ) {
						if( i == 'toRecoverableString' || i == 'tempLockIgnoreMe' || i == 'prototype' || i == 'constructor' ) { continue; }
						if( oBn && ( i == 'index' || i == 'input' || i == 'length' || i == 'toRecoverableObString' ) ) { continue; }
						j = this[i];
						if( !i.match(basicObPropNameValStr) ) {
							//for some reason, you cannot use unescape when defining peoperty names inline
							for( var x = 0; x < cleanStrFromAr.length; x++ ) {
								i = i.replace(cleanStrFromAr[x],cleanStrToAr[x]);
							}
							i = '\''+i+'\'';
						} else if( window.ActiveXObject && navigator.userAgent.indexOf('Mac') + 1 && !navigator.__ice_version && window.ScriptEngine && ScriptEngine() == 'JScript' && i.match(/^\d+$/) ) {
							//IE mac does not allow numerical property names to be used unless they are quoted
							i = '\''+i+'\'';
						}
						retVal += sepChar+i+':'+getRecoverableString(j,true);
						sepChar = ',';
					}
					retVal += '}';
					this.tempLockIgnoreMe = false;
					return retVal;
				};
				Array.prototype.toRecoverableObString = Object.prototype.toRecoverableString;
				Array.prototype.toRecoverableString = function () {
					if( this.tempLock ) { return '[\'LoopBack\']'; }
					if( !this.length ) {
						var oCountProp = 0;
						for( var i in this ) { if( i != 'toRecoverableString' && i != 'toRecoverableObString' && i != 'tempLockIgnoreMe' && i != 'prototype' && i != 'constructor' && i != 'index' && i != 'input' && i != 'length' ) { oCountProp++; } }
						if( oCountProp ) { return this.toRecoverableObString(true); }
					}
					this.tempLock = true;
					var retVal = '[';
					for( var i = 0; i < this.length; i++ ) {
						retVal += (i?',':'')+getRecoverableString(this[i],true);
					}
					retVal += ']';
					delete this.tempLock;
					return retVal;
				};
				Boolean.prototype.toRecoverableString = function () {
					return ''+this+'';
				};
				Date.prototype.toRecoverableString = function () {
					return 'new Date('+this.getTime()+')';
				};
				Function.prototype.toRecoverableString = function () {
					return this.toString().replace(/^\s+|\s+$/g,'').replace(/^function\s*\w*\([^\)]*\)\s*\{\s*\[native\s+code\]\s*\}$/i,'function () {[\'native code\'];}');
				};
				Number.prototype.toRecoverableString = function () {
					if( isNaN(this) ) { return 'Number.NaN'; }
					if( this == Number.POSITIVE_INFINITY ) { return 'Number.POSITIVE_INFINITY'; }
					if( this == Number.NEGATIVE_INFINITY ) { return 'Number.NEGATIVE_INFINITY'; }
					return ''+this+'';
				};
				RegExp.prototype.toRecoverableString = function () {
					return '\/'+this.source+'\/'+(this.global?'g':'')+(this.ignoreCase?'i':'');
				};
				String.prototype.toRecoverableString = function () {
					var oTmp = escape(this);
					if( oTmp == this ) { return '\''+this+'\''; }
					return 'unescape(\''+oTmp+'\')';
				};
			}
			if( !oVar.toRecoverableString ) { return '{error:\'internal object\'}'; }
			var oTmp = oVar.toRecoverableString();
			if( !notFirst ) {
				//prevent it from changing for...in loops that the page may be using
				delete Object.prototype.toRecoverableString;
				delete Array.prototype.toRecoverableObString;
				delete Array.prototype.toRecoverableString;
				delete Boolean.prototype.toRecoverableString;
				delete Date.prototype.toRecoverableString;
				delete Function.prototype.toRecoverableString;
				delete Number.prototype.toRecoverableString;
				delete RegExp.prototype.toRecoverableString;
				delete String.prototype.toRecoverableString;
			}
			return oTmp;
		},
				
		unsafeWindow: function()
		{
			if (Utils.isFirefox) return unsafeWindow;
			else return window;
		},

		blockAutocomplete: function()
		{
			var forms = document.getElementsByTagName('form');
			for (var i=0; i<forms.length; i++) 
				forms[i].setAttribute('autocomplete','off');
		},

		checkRedesign: function()
		{
			return (this.unsafeWindow().$ || this.isCurrentPage('showmessage')) ? true : false;
		},
		
		createStyleSheet: function()
		{
			document.getElementsByTagName('head')[0].appendChild(document.createElement("style"));
			Utils.stylesheet = document.styleSheets[document.styleSheets.length-1];
		},
		
		createShip: function (name, metal, crystal)
		{
			var ship = new Object();
			ship.name = name;
			ship.metal = metal;
			ship.crystal = crystal;
			
			return ship;
		},
		
		formatNumber: function (num)
		{
			var str = '' + num;
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test(str)) {
				str = str.replace(rgx, '$1' + '.' + '$2');
			}

			return str;
		},
		
		getDocScript: function()
		{
			var scripts = document.getElementsByTagName('script');
			this.script = null;
			
			var n = 0;

			for (var i=0; i<scripts.length; i++)
				if (!scripts[i].src && ! (this.isCurrentPage('messages') && n++ == 0)) {
					this.script = scripts[i];
					break;
				}

		},
		
	    insertAfter: function (newElement,targetElement)
		{
			if (!newElement || !targetElement) return;
			
			var parent = targetElement.parentNode;
			if(parent.lastchild == targetElement)
				parent.appendChild(newElement);
			else
				parent.insertBefore(newElement, targetElement.nextSibling);
		},

		insertCSSRule: function (rule)
		{
			Utils.stylesheet.insertRule(rule, 0);
		},
		
		isCurrentPage: function (page)
		{
			var pages = page.split(',');
			var url = window.location.href;
			for (var i=0; i<pages.length; i++)
				if (url.indexOf('index.php?page='+pages[i]) >-1 )
					return true;
					
			return false;
		},
		
		runScript: function (code)
		{
			if (!code || code=="") return;
			document.location.href = 'javascript:'+code+';void(0);';
		},
		
		runEventHandler: function (id, event)
		{
			
			var node = document.getElementById(id);
			if (!node) return;
			
			var evt;
			if (event == 'click' || event == 'mouseup') {
				evt = document.createEvent("MouseEvents");
				evt.initMouseEvent(event, true, true, Utils.unsafeWindow(),  0, 0, 0, 0, 0, false, false, false, false, 0, null);
			}
			else if (event == 'change' || event == 'focus') {
				var evt = document.createEvent("HTMLEvents");
				evt.initEvent(event, true, false);
			}
			else if (event == 'keyup' || event == 'keypress') {
			}
			
			if (evt) node.dispatchEvent(evt);
			
		},
		
		XPath: function(path, context, type)
		{
			try {
				if (!context) context = document;
				if (!type) type = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
				return document.evaluate(path, context, null, type, null)
			}
			catch (e) {Utils.log(e); }
		},
		
		parseInt: function(str)
		{
			if (!str) return null;
			str = str.replace(/(\d+)kk/i, '$1'+'000000');
			return parseInt(str.replace(/[^\d\-]/g, ''));
		},

		extractInt: function(str, rx)
		{
			if (!str) return null;
			str = str.toString();
			
			if (!rx)
				return Utils.parseInt(str);

			str = str.match(rx);
			if (!str) return null;
			else return Utils.parseInt(str[1]);
		},
		
		getIntById: function(id, property, rx) {
			var node = document.getElementById(id);
			property = property || 'innerHTML';
			if (!node || !node[property]) return null;
			return Utils.extractInt(node[property], rx);
		},
		
		getIntByXPath: function(xpath, property, rx)
		{
			property = property || 'innerHTML';
			var node = Utils.XPath(xpath);
			if (!node.snapshotLength) return null;
			return Utils.extractInt(node.snapshotItem(0)[property], rx);
		},

		Init: function()
		{
			this.createStyleSheet();
			
			this.isOpera = (window.opera) ? true : false;
			this.isFirefox = (window.navigator.userAgent.indexOf('Firefox') > -1 ) ? true : false;
			
			this.getDocScript();
		}
	}


	// functions to create simple table like 
	// 		<title>
	// <label:> <value>
	// <label:> <value>
	
	var SimpleTable =
	{
		addCell: function(_key, _value, _value_class, _id)
		{
			if (typeof(_key) == 'undefined') _key = '';
			if (typeof(_value) == 'undefined') _value = '';
			
			this.data[this.data.length] = { key: _key, value: _value, value_class: _value_class, id: _id };
		},
		
		addHref: function (key, value, id)
		{
			if (typeof(key) == 'undefined') key = '';
			if (typeof(value) == 'undefined') value = '';
			var str = '<a href="javascript:void(0)" id="'+id+'">'+value+'</a>';
			this.addCell(key, str, this.href_class || '', id);
		},
		
		createTableString: function(values_in_row)
		{
			function addAttr(attr, value) {
				return (value ? attr+'="'+value+'" ' : '');
			}
			
			values_in_row = values_in_row || 1;
			var str = '';
			for (var i=0; i<Math.ceil(this.data.length/values_in_row); i++)
			{
				str += '<tr>';
				for (var j=0; j<values_in_row; j++) {
					var cell = this.data[i*values_in_row+j];
					if (!cell) continue;
					str +=	'<td '+addAttr('class', this.key_class)+'>' + (cell.key ? cell.key+':' : ' ') + '</td>' +
							'<td '+ addAttr('class', cell.value_class || this.value_class) +
									addAttr('id', cell.id)+'>' + Utils.formatNumber(cell.value) + '</td>';
				}
				
				str += '</tr>';
			}
			str = '<tbody><tr>' + 
						'<th class="'+this.title_class+'" colspan="'+values_in_row*2+'">' + this.title +'</th>' +
					'</tr>' + str + '</tbody>';
			return str;
		},

		init: function(title, title_class, key_class, value_class)
		{
			this.title = title || '';
			this.title_class = title_class || '';
			this.key_class = key_class || '';
			this.value_class = value_class || '';
			this.data = new Array();
		}
	};
	

	
	// =======================================================================
	// functions for Coords storing
	// =======================================================================
	var Coords = 
	{
		get: function ()
			{
				return Utils.getValue('Coords');
			},

		parse: function (str, reg, extract, save)
			{
				var found = false;
				var matches = str.match(reg);
				if (!matches) return false;

				for (var i=0; i<matches.length; i++)
				{
					var coords = matches[i].toString();
					if (extract) coords = coords.replace(reg,"$1");


					var temp = coords.split(':');
					var g = parseInt(temp[0]);
					var s = parseInt(temp[1]);
					var p = parseInt(temp[2]);
					if (g+"" == temp[0] && s+"" == temp[1] && p+"" == temp[2] &&
						!(g < 1 || g > 50) && !(s < 1 || s > 499 || (s > 100 && g > 9)) && !(p < 1 || p > 16))
					{
						if (save) 
							this.set(coords);
						found = true;
						break;
					}
				}

				return found;
			},
			
		read: function(str, save)
			{
				if (typeof(save) == 'undefined') save = true;
				
				if(str.length > 0)
				{
					if (this.parse(str, /\[(\d{1,2}:\d{1,3}:\d{1,2})\]/gi,true, save))
						return true;
					else if (this.parse(str, /\d{1,2}:\d{1,3}:\d{1,2}/gi,false, save))
						return true;
					else {
						str = str.replace(/[>\s\[\(](\d{1,2})[:\.\-\/\s](\d{1,3})[:\.\-\/\s](\d{1,2})[\s\]\)<,\.]/gi,"$1:$2:$3");
						str = str.replace(/^(\d{1,2})[:\.\-\/\s](\d{1,3})[:\.\-\/\s](\d{1,2})[\s\]\)<,\.]/gi,"$1:$2:$3");
						str = str.replace(/[>\s\[\(](\d{1,2})[:\.\-\/\s](\d{1,3})[:\.\-\/\s](\d{1,2})$/gi,"$1:$2:$3");
						str = str.replace(/^(\d{1,2})[:\.\-\/\s](\d{1,3})[:\.\-\/\s](\d{1,2})$/gi,"$1:$2:$3");
						return this.parse(str, /\d{1,2}:\d{1,3}:\d{1,2}/gi,false, save);
					}
				}
				return false;
			},
			
		saved: function()
			{
				return Utils.getValue('CoordsFlag');
			},
			
		set: function (value)
			{
				Utils.setValue('Coords', value); 
				Utils.setValue('CoordsFlag', '1');
			},
			
		onMouseUp: function(e) {
			if ((!e) || ((e.ctrlKey) && (!e.keyCode))) return;
			
			var targetclassname = e.target.toString();

			try {
				if(targetclassname.match(/InputElement|SelectElement|OptionElement/i) || targetclassname.match(/object XUL/i))
					return;

				if(e.target.ownerDocument.designMode)
					if(e.target.ownerDocument.designMode.match(/on/i))
						return;

				Coords.read(window.getSelection().toString());
			}
			catch(e) {
				Utils.log(e);
			}
		},
		
		Init: function()
		{
			document.addEventListener('mouseup', function (e){ Coords.onMouseUp(e); }, false);
		}
	
	}
	
	
	var EventList =
	{
		changeTime: function()
		{
			var nodes = Utils.XPath('//LI[@class="arrivalTime"]');
			
			for (var i=0; i<nodes.snapshotLength; i++) {
				var node = nodes.snapshotItem(i);
				node.innerHTML = DateTime.convertStringServer2Local(node.innerHTML, '[H]:[i]:[s]');
			}
		},
	
		Run: function()
		{
			if (Options.showLocalTime)
				this.changeTime();
		}
	}
	
	
	var FinishTime = 
	{
		addConstructionTime: function (id, time)
		{
			if ( !id || !time || isNaN(time)) return;


			var tbody = document.getElementById(id).parentNode.parentNode.parentNode;

			var newRow = document.createElement('tr');
			newRow.className = 'data green';
			newRow.appendChild(document.createElement('td'));
			newRow.appendChild(document.createElement('td'));
			
			//newRow.firstChild.innerHTML = Options.Interface.lbl_Until+':';
			newRow.firstChild.className = 'text_align_right';
			newRow.lastChild.innerHTML = DateTime.formatDate(DateTime.getFinishTime(time));
			newRow.lastChild.className = 'finishTime';
			tbody.appendChild(newRow);
		},
		
		
		ShowConstructions: function ()
		{
			var script = Utils.script;
			if (!script) return;

			Utils.insertCSSRule('.finishTime { padding-left: 12px }');
			Utils.insertCSSRule('.green { color: green; }');

			// buildings and research
			var str = script.innerHTML.match(/baulisteCountdown\(getElementByIdWithCache\(["']\w+["']\)\,\s*\d*/gi);

			if (str)
				for (var i=0; i<str.length; i++)
				{
					var res = str[i].match(/["'](\w+)["']\)\,\s*(\d*)/i);
					FinishTime.addConstructionTime(res[1], res[2]);
				}

			// shipyard
			str = script.innerHTML.match(/shipCountdown\((\s*getElementByIdWithCache\(["']\w+["']\)\,)+(\s*\d*\,){3,3}/i);

			if (str) {
				str[2] = str[2].match(/(\d+)/)[0];
				FinishTime.addConstructionTime('shipAllCountdown', str[2]);
			}
		}
	}


	// =======================================================================
	// functions for Fleet movement view
	// =======================================================================
	var FleetMovement = 
	{
		fleetXPath: '//*[@id="inhalt"]/descendant::*[contains(@class,"fleetDetails") and contains(@id,"fleet")]',
		
		addReversalTimeBox: function(fleet)
		{
			var reversal = fleet.getElementsByClassName('reversal')[0] ? 1 : 0;
			if (!reversal) return;

			var tip = document.evaluate('//*[@id="'+ fleet.id +'"]/descendant::*[contains(@class,"origin")]/*[@class="tips4"]', 
					document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			tip = tip.snapshotItem(0);

			if(!tip) return;

			var str = tip.getAttribute('title');
			if (!str) return;

			var date = DateTime.parse2(str);
			if (!date) return;
			
			date = DateTime.convertDateServer2Local(date);

			var span = document.createElement('span');
			span.className = 'reversalTime';
			span.setAttribute('title', date.getTime());

			fleet.insertBefore(span, fleet.getElementsByClassName('openDetails')[0]);
			this.updateReversalClock();
		},

		updateReversalClock: function()
		{
			try {
				var spans = document.getElementsByClassName('reversalTime');
				for (var i=0; i<spans.length; i++)
				{
					var date = new Date();
					var start = spans[i].getAttribute('title');
					if (!start) continue;

					start = parseInt(start);
					
					date.setTime( (date.getTime() - DateTime.TimeDelta) * 2 - start );
					
					if (Options.showLocalTime)
						spans[i].innerHTML = DateTime.formatDate(date);
					else 
						spans[i].innerHTML = DateTime.formatDateServer(date);
				}
			}
			catch (e) { Utils.log(e); }
		},
		
		correctTimes: function(fleet)
		{
			var times = document.evaluate('//*[@id="'+ fleet.id +'"]/descendant::*[contains(@class,"absTime")]', 
					document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					
			for (var i=0 ; i < times.snapshotLength; i++ )
			{
				var node = times.snapshotItem(i);
				node.innerHTML = DateTime.convertStringServer2Local(node.innerHTML);
			}
			
			var times = document.evaluate('//*[@id="'+ fleet.id +'"]/*[@class="starStreak"]/descendant::*[@class="tips4"]', 
					document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

			for (var i=0 ; i < times.snapshotLength; i++ )
			{
				var node = times.snapshotItem(i);
				node.title = DateTime.convertStringServer2Local(node.title);
			}

		},
		
		getDetails: function (div)
		{
			var result = new Object();
			var string = "";

			var cells = div.getElementsByTagName('td');

			for (var i=0; i<cells.length; i++) {
				if (cells[i].colSpan=="2") {
					result.ships = string;
					string = "";
				}
				else {
					if (cells[i].className!="value" && string!="") string += " ";
					string += cells[i].innerHTML;
				}
			}

			result.cargo = string;
			return result;
		},

		getMissionClass: function (fleet)
		{
			var mission = fleet.getElementsByClassName('mission')[0];
			var mclass = "";
			
			switch(mission.innerHTML) {
				case (Options.Labels.lbl_missAttack): mclass = "ownattack"; break;
				case (Options.Labels.lbl_missHold): mclass = "ownhold"; break;
				case (Options.Labels.lbl_missColony): mclass = "owncolony"; break;
				case (Options.Labels.lbl_missDeploy): mclass = "owndeploy"; break;
				case (Options.Labels.lbl_missHarvest): mclass = "ownharvest"; break;
				case (Options.Labels.lbl_missTransport): mclass = "owntransport"; break;
				case (Options.Labels.lbl_missFederation): mclass = "ownfederation"; break;
				case (Options.Labels.lbl_missDestroy): mclass = "owndestroy"; break;
				case (Options.Labels.lbl_missEspionage): mclass = "ownespionage"; break;
				case (Options.Labels.lbl_missExpedition): mclass = "ownexpedition"; break;
				default: mclass = "owntransport";
			}
			
			return mclass;
		},

		insertCSSRules: function ()
		{
			if (Options.mvmt_expandFleets) {
				Utils.insertCSSRule(".detailsOpened .starStreak  {background:none}");
				Utils.insertCSSRule(".anti_fleetDetails {left:60px; width:290px; white-space:normal; padding:0px 7px; font-size:0.9em; text-align:left; line-height:1.2em}");

				Utils.insertCSSRule(".ownattack { color: "+Options.missAttack+" }");
				Utils.insertCSSRule(".owncolony { color: "+Options.missColony+" }");
				Utils.insertCSSRule(".owndeploy { color: "+Options.missDeploy+" }");
				Utils.insertCSSRule(".owndestroy { color: "+Options.missDestroy+" }");
				Utils.insertCSSRule(".ownespionage { color: "+Options.missEspionage+" }");
				Utils.insertCSSRule(".ownexpedition { color: "+Options.missExpedition+" }");
				Utils.insertCSSRule(".ownfederation { color: "+Options.missFederation+" }");
				Utils.insertCSSRule(".ownharvest { color: "+Options.missHarvest+" }");
				Utils.insertCSSRule(".ownhold { color: "+Options.missHold+" }");
				Utils.insertCSSRule(".owntransport { color: "+Options.missTransport+" } ");
				Utils.insertCSSRule(".ownmissile { color: "+Options.missMissile+" } ");
			}
			
			if (Options.mvmt_showReversal)
				Utils.insertCSSRule(".reversalTime { position: absolute; top: 43px; left: 555px; color: yellow;} ");
		},

		myOpenCloseFleet: function (id, change)
		{
			var fleet = document.getElementById(id);
			var span = fleet.getElementsByClassName('starStreak')[0];
			var details = fleet.getElementsByClassName('anti_fleetDetails')[0];

			var opened = fleet.className.match('detailsOpened') ? 1 : 0;
			
			// original OGame handler will be executed first
			// so if change=true then className has been already changed

			if ( change && !opened ) {

				span.removeAttribute("style");
				fleet.removeAttribute("style");

			}
			else if ( opened ) {
				var details_height = parseInt(details.offsetHeight);
				var span_height = parseInt(span.offsetHeight);
				var fleet_height = parseInt(fleet.offsetHeight);
				var dif = details_height - span_height + 2;

				if (dif>0) {
					span_height += dif;
					fleet_height += dif;
					
					span.setAttribute("style","height:"+span_height+"px");
					fleet.setAttribute("style","height:"+fleet_height+"px");
				}
			}
		},
		
		myOpenCloseAll: function ()
		{
			var fleets = Utils.XPath(FleetMovement.fleetXPath);

			for (var i=0; i<fleets.snapshotLength; i++) {
				FleetMovement.myOpenCloseFleet(fleets.snapshotItem(i).id, 1);
			}
		},


		expandFleet: function (fleet)
		{
				var id = fleet.id.replace(/\D+/g, '');

				if (!id) return;

				var details = document.getElementById('details'+id);

				var newNode = document.createElement('div');
				newNode.setAttribute('class', 'anti_fleetDetails fixed '+this.getMissionClass(fleet));

				var res = this.getDetails(details);
				newNode.innerHTML = res.ships+'<br/><br/>'+res.cargo;

				var span = fleet.getElementsByClassName('starStreak')[0];
				var picto = span.getElementsByClassName('route')[0];

				picto.setAttribute('style','display:none');
				Utils.insertAfter(newNode, picto);
				
				var mission = fleet.getElementsByClassName('mission')[0];
				var reversal = fleet.getElementsByClassName('reversal')[0] ? 1 : 0;
				var next = fleet.getElementsByClassName('nextMission')[0] ? 1 : 0;

				if (!reversal && next)
					mission.innerHTML += ' ('+Options.Interface.lbl_mvmt_Expedition+')';
				else if (!reversal)
					mission.innerHTML += ' ('+Options.Interface.lbl_mvmt_Return+')';

				// set 'openDetails' button handler
				var btn = fleet.getElementsByClassName('openDetails')[0].getElementsByTagName('a')[0];
				btn.addEventListener("click", function (){ setTimeout(function (){ FleetMovement.myOpenCloseFleet(fleet.id, 1); }, 0); }, false);


				// invoke the handler
				this.myOpenCloseFleet(fleet.id, 0);
		},

		Run: function()
		{
			if (!Options.mvmt_expandFleets && !Options.mvmt_showReversal) return;

			this.insertCSSRules();

			var fleets = Utils.XPath(FleetMovement.fleetXPath);

			for (var i=0; i<fleets.snapshotLength; i++) {
				var fleet = fleets.snapshotItem(i);
				if (Options.mvmt_expandFleets) this.expandFleet(fleet);
				if (Options.mvmt_showReversal) this.addReversalTimeBox(fleet);
				if (Options.showLocalTime) this.correctTimes(fleet);

			}

			if (Options.mvmt_expandFleets) {
				// set 'closeAll' button handler
				var btn = Utils.XPath('//*[@id="inhalt"]/descendant::*[contains(@class,"closeAll")]/A');
				btn = btn.snapshotItem(0);
				btn.addEventListener("click", function (){ setTimeout(FleetMovement.myOpenCloseAll, 0); }, false);
			}
			
			if (Options.mvmt_showReversal)
				setInterval(FleetMovement.updateReversalClock, 200);
		}
	}


	// =======================================================================
	// functions for Send fleet pages
	// =======================================================================
	var FleetSend = 
	{
		showCapacity: function ()
		{
			try {
				txtFields = Utils.XPath('//*[contains(@class,"fleetValues")]');
				
				var sum;
				sum = 0;
				
				for ( var i=0; i<txtFields.snapshotLength; i++ ) {
					txt = txtFields.snapshotItem(i);
					switch (txt.id) {
						case 'ship_202': capacity = 5000; break;  //l.cargo
						case 'ship_203': capacity = 25000; break; //h.cargo
						case 'ship_204': capacity = 50; break; //l.fighter
						case 'ship_205': capacity = 100; break; //h.fighter
						case 'ship_206': capacity = 800; break; //cruiser
						case 'ship_207': capacity = 1500; break; //battleship
						case 'ship_208': capacity = 7500; break; //colonizator
						case 'ship_209': capacity = 20000; break; //recycler
						case 'ship_211': capacity = 500; break; //bomber
						case 'ship_213': capacity = 2000; break; //destroyer
						case 'ship_214': capacity = 1000000; break; //RIP
						case 'ship_215': capacity = 750; break; //battle cruiser
						default: capacity = 0; break;
					}

					if (!isNaN(txt.value)) sum += txt.value * capacity;
				}

				sum = Utils.formatNumber(sum);

				document.getElementById('total_capacity').innerHTML = sum;
			}
			catch (e) {Utils.log(e);}
			
			return true;
		},
		
		setCapacityHandler: function ()
		{
			// text input fileds
			var txtFields = Utils.XPath('//*[@class="fleetValues"]');
			for ( var i=0; i<txtFields.snapshotLength; i++ ) {
				txt = txtFields.snapshotItem(i);
				
				txt.addEventListener("change", FleetSend.showCapacity, false);
				txt.addEventListener("keyup", FleetSend.showCapacity, false);
				txt.addEventListener("focus", FleetSend.showCapacity, false);
			}

			// 'max of this type' buttons
			var xpath = '//*[@class="max tips"] | //*[@class="buildingimg"]/*[@class="tips"] | //*[@class="allornonewrap"]/descendant::*[@class="tips"]';
			buttons = document.evaluate( xpath,	document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

			for (var i=0 ; i < buttons.snapshotLength; i++ )
			{
				buttons.snapshotItem(i).addEventListener("click", FleetSend.showCapacity, false);
			}
		},

		setShips: function(ship_id, cnt)
		{
			var node = document.getElementById(ship_id);
			if (!node || node.disabled) return;
			node.value = cnt;
			Utils.runEventHandler(ship_id,'change');
		},

		ShowCapacity_Run: function()
		{
			var parent = Utils.XPath('//*[@class="allornonewrap"]').snapshotItem(0);
			if(!parent) return;


			Utils.insertCSSRule('.total_capacity td {padding: 2px 5px;}');
			Utils.insertCSSRule('#total_capacity {color: green;}');
			Utils.insertCSSRule('td.capacity_href {text-decoration: underline; color: #5577EE;}');
			
			var res = Utils.getIntById('resources_metal') + Utils.getIntById('resources_crystal') + Utils.getIntById('resources_deuterium');
			var scargo = Math.ceil(res/5000);
			var lcargo = Math.ceil(res/25000);
			
			var newDiv = document.createElement('div');
			newDiv.className = 'fleft total_capacity';
			SimpleTable.init();
			SimpleTable.key_class = 'capacity_key';
			SimpleTable.href_class = 'capacity_href';
			SimpleTable.addCell(Options.Interface.lbl_resourses, res);
			SimpleTable.addCell();
			SimpleTable.addHref(Options.Labels.lbl_shipSCargo, scargo, 'SCargo');
			SimpleTable.addHref(Options.Labels.lbl_shipLCargo, lcargo, 'LCargo');
			SimpleTable.addCell(Options.Interface.lbl_TotalCapacity,0, '', 'total_capacity');
			newDiv.innerHTML = '<table>' + SimpleTable.createTableString(2) + '</table>'
			
			Utils.insertAfter(newDiv, parent.firstChild.nextSibling);
			
			document.getElementById('SCargo').addEventListener('click', function (){ FleetSend.setShips('ship_202', scargo); return true; }, false );
			document.getElementById('LCargo').addEventListener('click', function (){ FleetSend.setShips('ship_203', lcargo); return true; }, false );
			
			this.setCapacityHandler();
		},

		SetCoords: function ()
		{
			if (!Coords.saved()) return;

			//check whether the coords have been already set
			var items = Utils.XPath('//*[@id="inhalt"]/descendant::*[@class="fleetStatus"]/UL/LI');

			for (var i=0; i<items.snapshotLength; i++)
				if ( Coords.read(items.snapshotItem(i).innerHTML, false) )
					return;
			
			var coords = Coords.get().split(':');
			
			document.getElementById('galaxy').value = coords[0];
			document.getElementById('system').value = coords[1];
			document.getElementById('position').value = coords[2];

			Utils.runEventHandler('galaxy', 'change');
		},
		
		SetMission: function ()
		{
			// if mission is set then do nothing
			if (Utils.XPath('//*[@id="missions"]/descendant::*[contains(@id,"missionButton") and contains(@class,"selected")]').snapshotLength > 0)
				return;

			// look for the first 'on' mission
			var missions = new Array(
				Options.mission1, Options.mission2, Options.mission3, Options.mission4, Options.mission5,
				1,3,4,5,6,9
				);

			for (var i=0; i<missions.length; i++) {
				if (missions[i]>0 && document.getElementById('button' + missions[i]).className == 'on' )
				{
					Utils.runEventHandler('missionButton' + missions[i], 'click');
					break;
				}
			}
		}
	}
	
	
	// =======================================================================
	// functions for Galaxy view
	// =======================================================================
	var Galaxy =
	{
		showCurrent: function(row)
		{
			var url = window.location.href;
			coords = url.match(/galaxy=(\d{1,2})&system=(\d{1,3})&position=(\d{1,2})/i);
			if (!coords) coords = url.match(/galaxy=(\d{1,2})&system=(\d{1,3})&planet=(\d{1,2})/i);
			
			if (!coords) return;

			var galaxy = document.getElementById('galaxy_input').value;
			var system = document.getElementById('system_input').value;
			var position = row.getElementsByClassName('position')[0].innerHTML;

			if (coords[1]!=galaxy || coords[2]!=system || coords[3]!=position)
				return;

			row.style.borderStyle = 'dashed';
			row.style.borderColor = 'yellow';
			row.style.borderWidth = '1px';
			document.getElementById('galaxytable').style.borderCollapse='collapse';
		},
		
		showDebris: function (row)
		{
			var debris = row.getElementsByClassName('debris')[0];

			var link = debris.getElementsByClassName('TTgalaxy')[0];
			if(!link) return;
			
			var img = link.getElementsByTagName('img')[0];
			img.setAttribute('style', 'display:none');

			// getting resources of this DF
			var content = debris.getElementsByClassName('debris-content');
			var resources = new Array();
			var sum = 0;

			for ( var i=0; i<content.length; i++) {
				var res = ''+content[i].innerHTML.split(' ')[1];

				resources[i] = res;
				res = res.replace(/\./g, '');

				sum += parseInt(res);
			}
			

			// creating a new DIV element
			newNode = document.createElement('div');
			newNode.setAttribute('class','anti_debris');

			var style = 'color:#CCCCCC; padding: 1px; text-align:center;';
			if (sum>Options.galaxyDebrisMin && Options.galaxyDebrisMin>0) style += 'background-color:'+Options.galaxyDebrisColor+';';

			newNode.setAttribute('style', style);
			newNode.innerHTML = ''+resources[0]+'<br/>'+resources[1];

			Utils.insertAfter(newNode, img);
		},


		showRank: function (row) 
		{
			player = row.getElementsByClassName('playername')[0];
			rank = player.getElementsByClassName('rank')[0];

			if (!rank) return;
			rank = rank.innerHTML.replace (/\D+/gi, '');
			
			if (!isNaN(rank) && rank!="")
			{
				newNode = document.createElement('span');
				newNode.setAttribute('class','anti_rank');
				newNode.innerHTML = ' '+rank;
				
				rank = parseInt(rank);
				color=Options.galaxyRankColor;
				
				if (rank==0) color=Options.constRank0;
				else if (rank<=10) color=Options.galaxyRank10;
				else if (rank<=50) color=Options.galaxyRank50;
				else if (rank<=100) color=Options.galaxyRank100;
				else if (rank<=200) color=Options.galaxyRank200;
				else if (rank<=800) color=Options.galaxyRank800;
				
				newNode.setAttribute('style','color:'+color);
				
				player.appendChild(newNode);
			}
		},

		showAllyRank: function (row) 
		{
			ally = row.getElementsByClassName('allytag')[0];
			rank = ally.getElementsByClassName('rank')[0];
			members = ally.getElementsByClassName('members')[0];

			if (!rank) return;
			
			rank = rank.innerHTML.replace (/\D+/gi, '');
			members = members.innerHTML.replace (/\D+/gi, '');
			
			var str = '';
			if (rank && !isNaN(rank)) str += ' '+rank;
			if (members && !isNaN(members)) str += '/'+members;
			
			if (str)
			{
				newNode = document.createElement('span');
				newNode.setAttribute('class','anti_allyrank');
				newNode.innerHTML = ' '+str;

				color=Options.galaxyRankColor;
				newNode.style.color = color;

				ally.appendChild(newNode);
			}
		},
		
		onDOMNodeInserted: function(e)
		{
			if(!e || !e.target || !e.target.id) return;
			if( e.target.id == "galaxytable")  Galaxy.RedrawGalaxy();
		},
		
		RedrawGalaxy: function ()
		{
			try {
				document.body.removeEventListener("DOMNodeInserted", Galaxy.onDOMNodeInserted, false);
			
				var rows = document.getElementById('galaxyContent').getElementsByClassName('row');
				for ( var i=0; i<rows.length; i++ ) {
					var row = rows[i];
					
					if (Options.galaxyShowRank) {
						Galaxy.showRank(row);
						Galaxy.showAllyRank(row);
					}
					Galaxy.showDebris(row);
					Galaxy.showCurrent(row);
				}
				
				document.body.addEventListener("DOMNodeInserted", Galaxy.onDOMNodeInserted, false);	
			}
			catch(e) { Utils.log(e); }
		},

		Run: function()
		{
			document.body.addEventListener("DOMNodeInserted", Galaxy.onDOMNodeInserted, false);	
		}
	}

		
	// =======================================================================
	// functions for Plunder calculation
	// =======================================================================

	var Plunder = 
	{
		ships: Array (	Utils.createShip('SCargo', 2000, 2000),
						Utils.createShip('LCargo', 6000, 6000),
						Utils.createShip('LFighter', 3000, 1000),
						Utils.createShip('HFighter', 6000, 4000),
						Utils.createShip('Cruiser', 20000, 7000),
						Utils.createShip('Battleship', 45000, 15000),
						Utils.createShip('Colonizator', 10000, 20000),
						Utils.createShip('Recycler', 10000, 6000),
						Utils.createShip('Spy', 0, 1000),
						Utils.createShip('Bobmer', 50000, 25000),
						Utils.createShip('Destroyer', 60000, 50000),
						Utils.createShip('RIP', 5000000, 4000000),
						Utils.createShip('BCruiser', 30000, 40000),
						Utils.createShip('Satellite', 0, 2000)
					),

		readValue: function(cell)
		{
			return parseInt(cell.innerHTML.replace(/\D/g, ''));
		},

		insertTable: function(container, mytable)
		{
			var table = document.createElement('table');
			table.className = 'fleetdefbuildings spy plunder';
			mytable.title_class = 'area plunder';	
			mytable.key_class = 'plkey plunder';
			mytable.value_class = 'plvalue plunder';
			table.innerHTML = mytable.createTableString(2);

			container.appendChild(table);
		},

		showPlunder: function (report)
		{
			var cells = report.getElementsByClassName('fragment')[0].getElementsByTagName('td');

			var metal = Plunder.readValue(cells[1]);
			var crystal = Plunder.readValue(cells[3]);
			var deuterium = Plunder.readValue(cells[5]);
			
			var total = metal + crystal + deuterium;

			metal /= 2;
			crystal /= 2;
			deuterium /= 2;

			var capacity_needed =
				Math.max(	metal + crystal + deuterium,
							Math.min(	(2 * metal + crystal + deuterium) * 3 / 4,
										(2 * metal + deuterium)
									)
						);

			var small_cargos = Math.ceil(capacity_needed/5000);
			var large_cargos = Math.ceil(capacity_needed/25000);

			SimpleTable.init(Options.Interface.lbl_resourses);
			SimpleTable.addCell(Options.Interface.lbl_total, total);
			SimpleTable.addCell(Options.Interface.lbl_loot, Math.floor(total/2));
			SimpleTable.addCell(Options.Labels.lbl_shipLCargo, large_cargos);
			SimpleTable.addCell(Options.Labels.lbl_shipSCargo, small_cargos);
			
			Plunder.insertTable(report, SimpleTable);
		},

		showDebris: function (report)
		{
			var fleet = report.getElementsByClassName('fleetdefbuildings spy')[0];
			if (!fleet) return;

			var cells = fleet.getElementsByClassName('key');

			var first = 0, metal = 0, crystal = 0;
			for (var i=0; i<cells.length; i++) 
			{
				var txt = cells[i].innerHTML;
				var cntNode  = cells[i].nextSibling;

				for (var j=first; j<Plunder.ships.length; j++)
				{ 	
					var ship = Plunder.ships[j];
					var label = Options.Labels['lbl_ship'+ship.name];

					if (label && txt.indexOf(label) > -1)
					{
						var cnt = Plunder.readValue(cntNode);
						metal += cnt * ship.metal;
						crystal += cnt * ship.crystal;
						first = j;
						break;
					}
				}
			}
			
			metal *= 0.3;
			crystal *= 0.3;
			var total = metal + crystal;
			
			SimpleTable.init(Options.Interface.lbl_debris);
			SimpleTable.addCell(Options.Interface.lbl_metal, metal);
			SimpleTable.addCell(Options.Interface.lbl_crystal, crystal);
			SimpleTable.addCell(Options.Interface.lbl_total, total);
			SimpleTable.addCell(Options.Labels.lbl_shipRecycler, Math.ceil(total/20000));
			
			Plunder.insertTable(report, SimpleTable);
		},

		Show: function(container)
		{
			var rows = container.getElementsByClassName('material spy');

			for (var i=0; i<rows.length; i++) {
				var report = rows[i].parentNode;
				if (report.getAttribute("plunder_done") != "done") {
					report.setAttribute("plunder_done","done");
					Plunder.showPlunder(report);
					Plunder.showDebris(report);
				}
			}
		}

	}


	var Messages = 
	{
		changeNodesTime: function (xpath, format)
		{
			nodes = Utils.XPath(xpath);

			for (var i = 0; i < nodes.snapshotLength; i++)
				{
					var node = nodes.snapshotItem(i);
					if (node.getAttribute("timefix_done") == 'done') continue;
					node.setAttribute("timefix_done","done");
					node.innerHTML = DateTime.convertStringServer2Local(node.innerHTML, format);
				}
		},
		
		changeTimes: function()
		{
			var nodes;
			
			if (Utils.isCurrentPage('messages'))
			{
				this.changeNodesTime(
					'//*[@id="mailz"]/TBODY/TR[contains(@class,"entry")]/*[@class="date"]',
					'[d].[m].[Y] [H]:[i]:[s]' );
					
				this.changeNodesTime(
					'//*[@id="mailz"]/TBODY/TR[contains(@id,"spioDetails")]/descendant::*[@class="material spy"]/TBODY/TR/TH',
					'[m]-[d] [H]:[i]:[s]' );
			}

			else if (Utils.isCurrentPage('showmessage'))
			{
				this.changeNodesTime(
					'//*[contains(@class,"infohead")]/TABLE/TBODY/TR[last()]/TD',
					'[d].[m].[Y] [H]:[i]:[s]' );

				this.changeNodesTime(
					'//*[@class="material spy"]/TBODY/TR/TH',
					'[m]-[d] [H]:[i]:[s]' );
					
				this.changeNodesTime(
					'//*[@id="battlereport"]/P',
					'[d].[m].[Y] [H]:[i]:[s]' );

			}

		},

		Show: function()
		{
			try {
				var container;
				if (document.location.href.indexOf("=showmessage") != -1) {
					container = document.getElementById("messagebox");
				} else {
					container = document.getElementById("messageContent");
				}
				
				if (!container) return;
				
				if (Options.msg_showPlunder) {
					Plunder.Show(container);
				}

				if (Options.showLocalTime) {
					Messages.changeTimes();
				}

			}
			catch(e) {
				Utils.log(e);
			}
		},

		Run: function()
		{
			Utils.insertCSSRule(".plkey { width: 30% }");
			Utils.insertCSSRule(".plvalue { width: 20% }");
			Utils.insertCSSRule(".plunder { border: 1px solid grey !important; }");
			Utils.insertCSSRule("table.plunder { border-collapse: collapse; }");
			Utils.insertCSSRule(".plkey, .plvalue { padding: 5px !important; }");

			this.Show();

			if ( Utils.isCurrentPage('messages') )
				setInterval(this.Show,1000);

		}

	}

	
	// =======================================================================
	// Deficient resources calculation
	// =======================================================================
	
	var Resources = 
	{
		res_array: ['metal', 'crystal', 'deuterium'],
		currentRes: {}, 
		costRes: {},
		
		showDeficient: function(e)
		{
			try{
				var container = e.target;
				if (container.id != 'content') return;

				container = Utils.XPath('//*[@id="detail"]/DIV[@class="pic"]').snapshotItem(0);
				if (!container) return;

				SimpleTable.init(Options.Interface.lbl_deficientRes);
				
				var sum = 0;
				
				for (var i=0; i<this.res_array.length; i++) {
					var attr = this.res_array[i];
					
					this.currentRes[attr] = Utils.getIntById('resources_'+attr);
					
					this.costRes[attr] = Utils.getIntByXPath(
						'//*[@id="content"]/descendant::*[@id="resources"]/LI[contains(@title,"'+Options.Labels['lbl_'+attr]+'")]/SPAN');
						
					var def = this.costRes[attr] - this.currentRes[attr];
					if (def>0) {
						SimpleTable.addCell(Options.Labels['lbl_'+attr], def, attr);
						sum += def;
					}
				}

				if (sum == 0) return;
				
				var html = '<table>'+SimpleTable.createTableString()+'</table>';
				
				SimpleTable.init('');
				SimpleTable.addCell(Options.Labels.lbl_shipSCargo, Math.ceil(sum/5000));
				SimpleTable.addCell(Options.Labels.lbl_shipLCargo, Math.ceil(sum/25000));
				
				html += '<table>'+SimpleTable.createTableString()+'</table>';
				
				container.style.backgroundImage = 'none';

				var node = document.createElement('div');
				node.id = 'deficient';
				node.innerHTML = html;

				container.appendChild(node);
			}
			catch (e) { Utils.log(e) }

		},

		insertCSSRules: function()
		{
			Utils.insertCSSRule('#deficient table tr td, #deficient table tr th {' +
				'padding: 2px;' +
				'font-size: 11px;' +
				'color: grey;' +
				'font-family: "Arial";' +
				'}');
		},

		Run: function()
		{
			this.insertCSSRules();
			var container = document.getElementById('planet');
			container.addEventListener('DOMNodeInserted', function(e){Resources.showDeficient(e)}, false);
		}
	}
	
	var Stats = {
		showStatsDifs: function(e)
		{
			if (e.relatedNode.getAttribute("id") != "statisticsContent")
				return;
			if (e.target.getAttribute("class") != "content")
				return;
			allStats = document.evaluate ('//*[@class="overmark" or @class="undermark"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var i = 0; i < allStats.snapshotLength; i++)
				allStats.snapshotItem (i).innerHTML = allStats.snapshotItem (i).getAttribute ("title");
		},

		Run: function()
		{
			document.getElementById ('statisticsContent').addEventListener ("DOMNodeInserted", function (e) { Stats.showStatsDifs (e); }, false);
		}
	}

	try	{
		// REMINDER: these objects should be initialized strictly in the following order:
		// Utils, Options, DateTime
		
		Utils.Init();

		// checking whether we have redesign at this server
		if (!Utils.checkRedesign()) return;
		
		Options.Init();
		DateTime.Init();
		
		if (Options.autocopyCoords)
			Coords.Init();

		var url = window.location.href;

		if (Options.blockAutoComplete && !Utils.isCurrentPage('movement')) {
			Utils.blockAutocomplete();
		}

		if ( Utils.isCurrentPage('fleet1') ) {
			if (Options.fleet_showCapacity) FleetSend.ShowCapacity_Run();
		}
		else if ( Utils.isCurrentPage('fleet2') ) {
			if (Options.autocopyCoords) FleetSend.SetCoords();
		}
		else if ( Utils.isCurrentPage('fleet3') ) {
			FleetSend.SetMission();
		}
		else if ( Utils.isCurrentPage('galaxy') ) {
			Galaxy.Run();
		}
		else if ( Utils.isCurrentPage('movement') ) {
			FleetMovement.Run();
		}
		else if ( Utils.isCurrentPage('eventList') ) {
			EventList.Run();
		}
		else if ( Utils.isCurrentPage('showmessage,messages') ) {
			if ( Options.msg_fixColors && Utils.isCurrentPage('messages') )
			{
				Utils.insertCSSRule('.combatreport_ididattack_iwon { color: #00B000; }');
				Utils.insertCSSRule('.combatreport_ididattack_ilost { color: #D02222; }');
				Utils.insertCSSRule('.combatreport_ididattack_draw { color: #C0C000; }');
			}

			Messages.Run();
		}
		else if ( Utils.isCurrentPage('statistics') ) {
			Stats.Run();
		}
		else if ( Utils.isCurrentPage('overview,resources,shipyard,station') ) {
			if (Options.showFinishTime) FinishTime.ShowConstructions();
		}
		
		if ( Utils.isCurrentPage('resources,station,research,shipyard') && Options.showDeficient )
			Resources.Run();
		
	}
	catch (e) { 
		Utils.log(e);
	}


//recursos en vuelo
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ('/game/index.php?page=movement') == -1)
		return;
	// You might want to translate these two in your own language:
	const totalStr = "Total:";
	const titleStr = "Recursos Totales en Vuelo: ";
	const colors = ["deepskyblue", "deepskyblue", "deepskyblue", "darkturquoise"];	// MetalColor, CrystalColor, DeuteriumColor, TitleColor
	const below = false;
	const onlyToCurrent = true;
	var expanded;
	if (typeof GM_setValue == "function") // greasemonkey
		expanded = GM_getValue ("expanded", false);
	else if (typeof PRO_setValue == "function") // ie7pro
		expanded = PRO_getValue ("expanded", false);
	else
		expanded = below;
	var div;
	var planetRes = [0, 0, 0];
	var curPlanet = "";
	var curPlanetCoords = "";
	document.getElementsByClassName = function (cl)
	{
		var retnode = [];
		var myclass = new RegExp ('\\b' + cl + '\\b');
		var elem = this.getElementsByTagName ('*');
		for (var i = 0; i < elem.length; i++)
		{
			var classes = elem [i].className;
			if (myclass.test (classes))
				retnode.push (elem [i]);
		}
		return retnode;
	}
	function doTable ()
	{
		function addDots (n)
		{
			n += '';
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test (n))
				n = n.replace (rgx, '$1' + '.' + '$2');
			return n;
		}
		function createFontElement (text, color)
		{
			var myFont = document.createElement ("font");
			myFont.color = color;
			var myTextNode = document.createTextNode (text);
			myFont.appendChild (myTextNode);
			return myFont;
		}
		function createCell (row, text, width, alignment, color)
		{
			var myTd = row.insertCell (-1);
			myTd.style.width = width;
			myTd.style.paddingRight = "1em";
			myTd.style.paddingLeft  = "1em";
			myTd.setAttribute ("align", alignment);
			myTd.setAttribute ("nowrap", true);
			myTd.appendChild (createFontElement (text, color));
		}
		function addEvent (el, evt, fxn)
		{
			if (el.addEventListener)
				el.addEventListener (evt, fxn, false); // for standards
			else if (el.attachEvent)
				el.attachEvent ("on" + evt, fxn); // for IE
			else el ['on' + evt] = fxn; // old style, but defeats purpose of using this function
		}
		var mya;
		var span = document.createElement ("span");
		span.className = "current";
		if ((mya != null) && (mya.onclick != null))
			mya.removeEventListenet ("click", redrawTable, false);
		var mySpan = document.createElement ("span");
		mya = document.createElement ("a");
		mya.setAttribute ("href", "#");
		var myImg = document.createElement ("img");
		myImg.style.position = "absolute";
		mya.appendChild (myImg);
		mySpan.appendChild (mya);
		if (expanded)
		{
			planetRes [0] = parseInt (document.getElementById ("resources_metal").innerHTML.replace (/\D+/gi, ""));
			planetRes [1] = parseInt (document.getElementById ("resources_crystal").innerHTML.replace (/\D+/gi, ""));
			planetRes [2] = parseInt (document.getElementById ("resources_deuterium").innerHTML.replace (/\D+/gi, ""));
			resInfo [curPlanet] [3] = 0;
			for (var i = 0; i < 3; i++)
			{
				resInfo [curPlanet] [i] = ((onlyToCurrent) ? toPlanet [i] : resInfo [totalStr] [i]) + planetRes [i];
				resInfo [curPlanet] [3] += resInfo [curPlanet] [i];
			}
			var myTable = document.createElement ("table");
			myTable.setAttribute ("border", "2");
			myTable.setAttribute ("bordercolor", "yellow");
			myTable.setAttribute ("rules", "all");
			myTable.setAttribute ("width", "100%");
			var myTr = myTable.insertRow (-1);
			createCell (myTr, titleStr, "24%", "center", colors [3]);
			for (var i = 0; i < 3; i++)
				createCell (myTr, rstrings [i], "19%", "center", colors [i]);
			createCell (myTr, totalStr, "19%", "center", colors [3]);
			myImg.style.left = "96%";
			myImg.style.top = "0%";
			myImg.setAttribute ("src", "img/layout/fleetCloseAll.gif");
			myTr.lastChild.setAttribute ("height", "23");
			myTr.lastChild.appendChild (mySpan);
			for (var resIndex in resInfo)
				if (resInfo [resIndex] [3] > 0)
				{
					myTr = myTable.insertRow (-1);
					myText = resIndex;
					if ((resIndex != curPlanet) && (resIndex != totalStr))
						myText += ' (' + addDots (resInfo [resIndex] [4]) + ')';
					createCell (myTr, myText, "24%", "center", (resIndex != totalStr) ? "silver" : colors [3]);
					for (var i = 0; i < 3; i++)
						createCell (myTr, addDots (resInfo [resIndex] [i]), "19%", "right", "silver");
					createCell (myTr, addDots (resInfo [resIndex] [3]), "19%", "right", "silver");
				}
			span.appendChild (myTable);
		}
		else
		{
			span.style.marginLeft = "6px";
			span.style.color = "silver";
			span.appendChild (createFontElement (titleStr, colors [3]));
			span.appendChild (createFontElement (rstrings [0], colors [0]));
			span.appendChild (document.createTextNode (" " + addDots (resInfo [totalStr] [0])));
			span.appendChild (document.createTextNode (", "));
			span.appendChild (createFontElement (rstrings [1], colors [1]));
			span.appendChild (document.createTextNode (" " + addDots (resInfo [totalStr] [1])));
			span.appendChild (document.createTextNode (", "));
			span.appendChild (createFontElement (rstrings [2], colors [2]));
			span.appendChild (document.createTextNode (" " + addDots (resInfo [totalStr] [2])));
			span.appendChild (document.createTextNode ("."));
			mySpan.style.cssFloat = "right";
			mySpan.style.styleFloat = "right";
			mySpan.style.marginRight = "28px";
			myImg.style.bottom = "0%";
			myImg.setAttribute ("src", "img/layout/fleetOpenAll.gif");
			span.appendChild (mySpan);
		}
		div.appendChild (span);
		if (below)
			document.getElementById ("inhalt").appendChild (div);
		else
		{
			var fleetDetails = document.getElementsByClassName ("fleetDetails");
			fleetDetails [0].parentNode.insertBefore (div, fleetDetails [0]);
		}
		addEvent (mya, "click", redrawTable);
	}
	function redrawTable ()
	{
		while (div.hasChildNodes ())
			div.removeChild (div.firstChild);
		div.parentNode.removeChild (div);
		expanded = ! expanded;
		if (typeof GM_setValue == "function") // greasemonkey
			GM_setValue ("expanded", expanded);
		else if (typeof PRO_setValue == "function") // ie7pro
			PRO_setValue ("expanded", expanded);
		doTable ();
	}
	if (document.getElementById ("resourcesInFlight") != null)
		return;
	var resInfo = new Object;
	var directions = new Array ();
	var flightTypes = new Array ();
	var destinations = new Array ();
	var origins = new Array ();
	var myRes = new Array (0, 0, 0);
	var allFlights = document.getElementsByClassName ("mission");
	for (var i = 0; i < allFlights.length; i++)
		flightTypes [i] = allFlights [i].innerHTML;
	allFlights = document.getElementsByClassName ("quantity basic2");
	for (var i = 0; i < allFlights.length; i++)
		directions [i] = (allFlights [i].firstChild.getAttribute ("src").indexOf ("reverse") != -1) ? "<" : ">";
	allFlights = document.getElementsByClassName ("originCoords tips");
	for (var i = 0; i < allFlights.length; i++)
		origins [i] = allFlights [i].firstChild.innerHTML;
	allFlights = document.getElementsByClassName ("destinationCoords tips");
	for (var i = 0; i < allFlights.length; i++)
		destinations [i] = (directions [i] == "<") ? origins [i] : allFlights [i].firstChild.innerHTML;
	var flightCargo = new Object;
	allFlights = document.getElementsByClassName ("fleetinfo");
	for (var i = 0; i < allFlights.length; i++)
	{
		var trs = allFlights [i].getElementsByTagName ("tr");
		var any = false;
		for (var j = 0; j < 3; j++)
		{
			myRes [j] = parseInt (trs [trs.length - 3 + j].getElementsByTagName ("td") [1].innerHTML.replace (/\D+/gi, ""));
			if (myRes [j] > 0)
				any = true;
		}
		flightCargo [i] = new Array (myRes [0], myRes [1], myRes [2]);
		var type = directions [i] + flightTypes [i];
		if (resInfo [type])
		{
			for (var j = 0; j < 3; j++)
				resInfo [type] [j] += myRes [j];
			if (any)
				resInfo [type] [4] += 1;
		}
		else
			resInfo [type] = new Array (myRes [0], myRes [1], myRes [2], 0, (any) ? 1 : 0);
	}
	var li = document.getElementById ("metal_box");
	var rstrings = ["", "", ""];
	rstrings [0] = li.getAttribute ("title").split (/[<>]/) [2];
	li = document.getElementById ("crystal_box");
	rstrings [1] = li.getAttribute ("title").split (/[<>]/) [2];
	li = document.getElementById ("deuterium_box");
	rstrings [2] = li.getAttribute ("title").split (/[<>]/) [2];
	allFlights = document.getElementsByClassName ("planet-name");
	for (var i = 0; i < allFlights.length; i++)
		if (allFlights [i].parentNode.className.indexOf (" active ") != -1)
		{
			curPlanet = ((onlyToCurrent) ? "=>" : "+") + allFlights [i].innerHTML;
			break;
		}
	allFlights = document.getElementsByClassName ("planet-koords");
	for (var i = 0; i < allFlights.length; i++)
		if (allFlights [i].parentNode.className.indexOf (" active ") != -1)
		{
			curPlanetCoords = allFlights [i].innerHTML;
			break;
		}
	resInfo [totalStr]  = new Array (0, 0, 0, 0, 0);
	resInfo [curPlanet] = new Array (0, 0, 0, 0, 0);
	toPlanet = new Array (0, 0, 0);
	for (var i = 0; i < destinations.length; i++)
	{
		if (destinations [i] == curPlanetCoords)
			for (var j = 0; j < 3; j++)
				toPlanet [j] += flightCargo [i] [j];
	}
	planetRes [0] = parseInt (document.getElementById ("resources_metal").innerHTML.replace (/\D+/gi, ""));
	planetRes [1] = parseInt (document.getElementById ("resources_crystal").innerHTML.replace (/\D+/gi, ""));
	planetRes [2] = parseInt (document.getElementById ("resources_deuterium").innerHTML.replace (/\D+/gi, ""));
	for (var resIndex in resInfo)
		resInfo [resIndex] [3] = 0;
	for (var resIndex in resInfo)
		for (var i = 0; i < 3; i++)
		{
			if (resIndex == curPlanet)
				resInfo [curPlanet] [i] = ((onlyToCurrent) ? toPlanet [i] : resInfo [totalStr] [i]) + planetRes [i];
			else if (resIndex != totalStr)
				resInfo [totalStr] [i] += resInfo [resIndex] [i];
			resInfo [resIndex] [3] += resInfo [resIndex] [i];
		}
	if (resInfo [totalStr] [3] > 0)
	{
		div = document.createElement ("div");
		div.setAttribute ("id", "resourcesInFlight");
		div.className = "fleetDetails detailsOpened";
		div.style.height = "auto";
		div.style.fontWeight = "bold";
		div.style.lineHeight = "18px";
		doTable ();
	}
}


}) ()
