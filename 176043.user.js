// ==UserScript==
// @name        The West Tombola Exporter (sp)
// @namespace   TWTE
// @version     1.3.8 
// @include     http://*.the-west.*/game.php*
// ==/UserScript==
(function (fn) {
        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.textContent = '(' + fn.toString() + ')();';
        document.head.appendChild(script);
    })
(function () {
	TWTE = {
		script : {
			version : '1.3.8',
			updateURL : 'http://stewue.bplaced.net/twte/updater.js',
			scriptURL : 'http://stewue.bplaced.net/twte/twte.user.js',
			uploadURL : 'http://stewue.bplaced.net/twte/upload.php'
		},
		init : function ()
		{
			TWTE.Updater.check();
			window.setTimeout("TWTE.ScriptAPI.init()", 1000);
			TWTE.Modifiaction();
			TWTE.Exporter.info('');
			if(localStorage.getItem('TWTE_automatic')=='yes') window.setTimeout("TWTE.Exporter.manual('automatic')", 1000);
		},
		Modifiaction : function ()
		{
			west.wof.WheelofFortune.prototype.process = function(action, data, callback, context, window) 
			{
		        data = data || {};
		        data.action = action;
		        data.wofid = this.id;
		        var that = this;
		        Ajax.remoteCall("wheeloffortune", "gamble", data, function(resp) {
		            if (resp.error) {
		                return new UserMessage(resp.msg, UserMessage.TYPE_ERROR).show();
		            }else{
						TWTE.Importer(resp, data.wofid);
					}
		            EventHandler.signal("inventory_changed");
		            typeof callback === "function" && callback.call(context || this, resp);
		        }, window);
		    }
		},
		/* Importieren und in localStorage speichern - Importar y guardar en localStorage (sp) */
		Importer : function (resp, type)
		{
			if(type !=3 && type!= 5) return;
			
			var data = $.parseJSON(TWTE.Cache.load('TWTE'));
			var data_player = $.parseJSON(TWTE.Cache.load('TWTE_player'));
			
			
			if(type=='3')
			{
				var type = 'fair'; 
				var construction = 0;// Stufe auswählen - Selecciona un nivel (sp) /
				var item_id = resp.picked[0];
				var category = resp.picked[1];
			}
			if(type=='5')
			{
				var type = 'october';
				var construction = resp.construction_id; // Stufe auswählen - Selecciona un nivel (sp) /
				var item_id = resp.itemId;
				var category = resp.itemEnhance;
			}
			
			if(typeof item_id != 'undefined' && typeof category != 'undefined')
			{
				/* Upload Statistik - Actualizar Estadísticas (sp) */
				if(!$.isArray(data)) data = [];
				data.push({'type' : type, 'construction' : construction, 'item_id' : item_id, 'category' : category});
				
				/* Spieler Statistik - Estadísticas del jugador (sp)*/			
				if(typeof data_player[type] =='undefined') data_player[type] = {};			
				if(typeof data_player[type][category]=='undefined') data_player[type][category] = {};
				if(typeof data_player[type][category][item_id]=='undefined') data_player[type][category][item_id] = 0;
				data_player[type][category][item_id]++;
				
				TWTE.Cache.save(data, 'TWTE');
				TWTE.Cache.save(data_player, 'TWTE_player');
			}
		},
		/* Exporter - Exportador (sp) */
		Exporter : {
			info : function (user)
			{
				if(user != 'yes' && (localStorage.getItem('TWTE_automatic')=='yes' || localStorage.getItem('TWTE_automatic')=='no') ) return; // Abbrechen
				var dialog = new west.gui.Dialog("TWTE - Actualización automática", "Lo ganado en la rifa se carga automáticamente en el servidor, no hay que preocuparse de nada. Esta configuración puede cambiarse cuando lo desee.", west.gui.Dialog.SYS_QUESTION)
					.addButton("Sí, actualizar automáticamente", function () { localStorage.setItem('TWTE_automatic', 'yes') })
					.addButton("No, solo actualizar manualmente", function () { localStorage.setItem('TWTE_automatic', 'no') })
	                .show();	
			},
			text : function (name)
			{
				new west.gui.Dialog('Exporter')
					.setText('<textarea cols=60 rows=20>' + TWTE.Cache.load(name) + '</textarea>')
					.setModal(true,true,{bg:"http://public.beta.the-west.net//images/curtain_bg.png",opacity:0.7})
					.show();
			},
			manual : function (type)
			{
				var form = '<form name="TWTE_Form" action="'+TWTE.script.uploadURL+"?"+(new Date).getTime()+'" method="post">';
					form += '<input style="display:none" type="text" name="data" value="' + encodeURIComponent(JSON.stringify(TWTE.Cache.load('TWTE'))) + '" />';
                    form += '<input style="display:none" type="text" name="world" value="' + window.location.host + '" />';
                    form += '<input style="display:none" type="text" name="player" value="' + Character.name + '" />';
                    form += "</form>";
                    form += '<script type="text/javascript">document.forms.TWTE_Form.submit();</script>';
				
				$('#TWTE_iframe').remove();
				var iframe = $('<iframe id="TWTE_iframe" width="1px" height="1px" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no" allowtransparency="false" style="display:none;" />').appendTo('body');
				var doc = iframe.get(0).contentWindow.document || iframe.get(0).contentDocument.document;
				doc.write(form);
				
				$(window).on("message", function(e) {
					if(e.originalEvent.origin=='http://stewue.bplaced.net')
					{
						TWTE.Exporter.msg(e.originalEvent.data, type);	
					}				
				});
			},
			msg : function (msg, type)
			{
				if(msg=='sucessful')
				{
					if(type=='automatic')
					{
						new UserMessage("Sus datos de TWTE se han subido automáticamente con éxito.", UserMessage.TYPE_SUCCESS).show();
					}else{
						new UserMessage("Los datos se han exportado con éxito.", UserMessage.TYPE_SUCCESS).show();
					}
					localStorage.removeItem('TWTE');
				}else if(msg=='nodata' && type!='automatic'){
					new UserMessage("¡No has subido ningún dato nuevo desde que se vació la caché!", UserMessage.TYPE_ERROR).show();
				}else if(msg=='missed' && type!='automatic'){
					new UserMessage("¡Carga incompleta!", UserMessage.TYPE_ERROR).show();
				}else if(type!='automatic'){
					new UserMessage("¡Error al cargar! ¡Por favor, identifíquese!", UserMessage.TYPE_ERROR).show();
				}			
			}
		},
		
		/* Statistik - Estadísticas (sp) */
		Window : {
			open : function ()
			{
				this.win = wman.open('TWTE',null,'noreload tw2gui_window_notabs').setMiniTitle("TWTE - Estadísticas").setTitle("TWTE - Estadísticas").setSize(500,500);
				
				var text = '';
				var data = $.parseJSON(TWTE.Cache.load('TWTE_player'));
				var firsttype = true;
				for(var type in data)
				{
					(!firsttype) ? text += '<br/><br/><br/><br/>' : firsttype=false;
					var onetype = data[type];
					text += '<h3>'+this.getType(type)+'</h3>';
					var firstcategory = true;
					for(var category in onetype)
					{				
						(!firstcategory) ? text += '<br/><br/><br/><br/>' : firstcategory=false;
						var onecaregory = onetype[category]
						text += '<h5>'+this.getCategory(category)+'</h5>';
						var count = 0;
						for(var item_id in onecaregory)
						{
							count++;
							var amount = onecaregory[item_id];
							var popup = new ItemPopup(ItemManager.get(item_id)).getXHTML().escapeHTML();
							text += '<div class="item item_inventory" title="'+popup+'"><img width="53" height="53" src="'+ItemManager.get(item_id).image+'" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="margin-left:3px;margin-top:4px;"><span class="count" style="display: block;"><p>'+amount+'</p></span></div>';	
						}
						
						for(var i=0; i<Math.floor(count/7); i++) text += '<br/><br/><br/><br/>';
					}
				}
				
				var scrollbar=new west.gui.Scrollpane();
	            jQuery(scrollbar.getMainDiv()).css("height","410px");
	            scrollbar.appendContent(text+'<br/><br/><br/><br/><br/>');
	    
	            this.win.appendToContentPane(scrollbar.getMainDiv());
			},
			getType : function (type)
			{
				var text = '-';
				switch(type)
				{
					case 'fair' : text = 'Feria'; break;
					case 'october' : text = 'Octoberfest'; break;
				}
				return text;
			},
			getCategory : function(id)
			{
				var text = '-';
				switch(id)
				{
					case '0' : text = 'Muy a menudo'; break;
					case '1' : text = 'A menudo'; break;
					case '2' : text = 'Raros'; break;
					case '3' : text = 'Muy raros'; break;
					case '25' : text = 'Común'; break;
					case '150' : text = 'Raros'; break;
					case '800' : text = 'Muy raros'; break;
				}
				return text;
			},
			
			/* Falsche Statistikeinträge entfernen - Eliminar entradas de Estadísticas incorrectas (sp) */
			cleaner : function()
			{
				var data = $.parseJSON(TWTE.Cache.load('TWTE_player'));
				var new_data = {};
				for(var type in data)
				{
					if(typeof type != 'string') continue; // Fehler löschen - Borrar error
					new_data[type] = {}; // Neues Object type - Crear tipos de objeto
	
					var onetype = data[type];
					for(var category in onetype)
					{				
						var options = ["0","1","2","3","25","150","800"];
						if(options.indexOf(category)=="-1") continue; // Fehler löschen	- Borrar error	 				
						new_data[type][category] = {}; // Neues Object category - Crear categorías de objeto
						
						var onecaregory = onetype[category]
						for(var item_id in onecaregory)
						{
							if(item_id=='undefined') continue; // Fehler löschen - Borrar error
							
							new_data[type][category][item_id] = onecaregory[item_id]; // Neues Object item_id mit anzahl - Crear objetos por id_item
						}
					}
				}
				
				TWTE.Cache.save(new_data, 'TWTE_player');
			}
		},
		
		/* Cachesystem - Caché de sistema (sp) */
		Cache : {
			save : function (obj, name)
			{
				localStorage.setItem(name, encodeURIComponent(JSON.stringify(obj)));	
			},
			load : function (name)
			{
				if(localStorage.getItem(name) === null)
				{
					TWTE.Cache.save({}, name);
				}
				return decodeURIComponent(localStorage.getItem(name));
			},
			clear : function(name)
		    {
				new west.gui.Dialog("Eliminar datos locales de TWTE", "¡Confirmar que quiere eliminar todos los datos!", west.gui.Dialog.SYS_QUESTION)
					.addButton("Sí", function () {localStorage.removeItem(name);})
					.addButton("No", function () {})
                	.show();	
		    }
		},
		
		/* Updater - Actualizador (sp) */
		Updater : {
			check : function ()
			{
				$.getScript(TWTE.script.updateURL+"?"+(new Date).getTime());
			},
			answer : function (version)
			{
				if(version>TWTE.script.version)
				{
					var dialog = new west.gui.Dialog("TWTE - Actualizar", "<span>Hay una actualización disponible para TWTE.<br /><b>Nueva Versión : " + version + ".</b><br />¿Desea realizar la actualización ahora?</span>", west.gui.Dialog.SYS_QUESTION);
						dialog.addButton("Sí", function () {dialog.hide(); location.href = TWTE.script.scriptURL;})
						.addButton("No", function () {})
	                	.show();	
				}
			}
		},
		
		/* Inno API - API de Innogames (sp) /
		ScriptAPI : {
			init : function ()
			{
				this.window = TheWestApi.register('TWTE', 'The West Tombola Exporter', '2.05', '2.071', 'stewue', 'http://forum.the-west.de/showthread.php?t=64240'); 
				this.window.setGui('<a onclick="TWTE.Exporter.manual(\'\')">manuell exportieren und auf den Server hochladen</a><br/><a href="http://stewue.bplaced.net/twte/" target="_blank">weltweite Statistik</a><br/><a onclick="TWTE.Window.open()">eigene Statistik öffnen</a><br/><a onclick="TWTE.Exporter.info(\'yes\');">automatischer Upload Einstellungen</a><br/><a onclick="TWTE.Exporter.text(\'TWTE\')">manuelle Ausgabe (Exporter)</a><br/><a onclick="TWTE.Exporter.text(\'TWTE_player\')">manuelle Ausgabe (Statistik)</a><br/><a onclick="TWTE.Cache.clear(\'TWTE\')">Exporter löschen</a><br/><a onclick="TWTE.Cache.clear(\'TWTE_player\')">Statistik löschen</a><br/><a onclick="TWTE.Window.cleaner()">Statistik fehlerhafte Einträge löschen</a><br/>');
			}
		}
	};
	
	TWTE.init();
});

