// ==UserScript==
// @id             ScriptOptionsMod
// @namespace      http://userscripts.org/users/bsod
// @name           Script Options (Mod)
// @description    Adds a configurable options dialogue to user scripts. Based on http://userscripts.org/scripts/show/106223
// @author         bsod
// @version        1.0.0
// @date           2011-08-07
// @website        http://userscripts.org/users/bsod
//
//
// ==/UserScript==
/******************************************

 v1.0.0 - Initial Release (Added support for text inputs)
 
 *******************************************/


Config = {
	dialog:null,
	buttons:null,
	title:null,
	scriptName:null,
	options:{},
	dialogConfig:{
		draggable:true,
		modal:true,
		width:600
	},
	lang:{
		'en':{
			Cancel:'Cancel',
			Save:'Save & Reload Page',
			Options:'Options'
		}
	},
	open:function() {
		if(Config.dialog == null) {
			
			Config.dialog = document.createElement('div');
			
			var html = '<div class="bcConfigDialog"><div id="bcScriptOptionContent' + Config._guid + '" style="">';
			
			var tabHtml = '';
			var contentHtml = '';
			
			// create tabs
			var i = 0;
			for(var tabLabel in Config.options) {
				tabHtml += '<li><a href="#tabs-' + i + Config._guid + '">' + tabLabel + '</a></li>';
				contentHtml += '<div id="tabs-' + i + Config._guid + '">' +
									'<table class="bcOptionsFields">';
					
				// insert options
				for(var optionKey in Config.options[tabLabel]) {
					var option = Config.options[tabLabel][optionKey];
					var name = 'bcOpt_' + optionKey + Config._guid;
					contentHtml += '<tr>';

					if(option.type == 'html') {
						contentHtml += '<td colspan="2">' + option.text;
						
					} else {
						contentHtml += '<td class="label"><label for="' + name + '">' + 
							(typeof(option.label) == 'string' ? option.label : '&nbsp;') + '</label></td>' +
							'<td><label for="' + name + '">';
						switch(option.type) {
							case 'checkbox':
								contentHtml += '<input type="checkbox" name="' + name + '"' +
								(Config.get(optionKey) ? 'checked' : '') + '/>';
								break;
							case 'select':
								contentHtml += '<select name="' + name + '">';
								for(var val in option.options) {
									contentHtml += '<option value="' + val + '"' +
										(Config.get(optionKey) == val ? ' selected' : '') + 
										'>' + option.options[val] + '</option>';
								}
								contentHtml += '</select>';
								break;
							case 'text':
								contentHtml += '<input type="text" name="' + name + '" value="' + Config.get(optionKey) + '" />';
								break;

						}
						if(typeof(option.description) == 'string') {
							contentHtml += ' &nbsp; ' + option.description;
						}
						contentHtml += '</label>';
					}
					contentHtml += '</td></tr>';
				}
				
				contentHtml += '</table></div>';
				i++;
			}
			
			if(tabHtml != '') {
				html += '<ul>' + tabHtml + '</ul>';
				html += contentHtml;
			}
			
			html += '</div></div>';
			
			Config.dialog.innerHTML = html;
					
			// set up dialog title
			Config.dialog.title = Config.title == null ? Config.getText('Options') : Config.title;
			if(Config.scriptName != null) {
				Config.dialog.title = Config.scriptName + ' ' + Config.dialog.title;
			}
			
			if(Config.buttons == null) {
				Config.buttons = {};
				Config.buttons[Config.getText('Save')] = function() {
					Config.save();
					document.location = document.location;
				};
				Config.buttons[Config.getText('Cancel')] = function() {
					$( this ).dialog("close" );
				};
			}
			
			Config.dialogConfig.closeText = Config.getText('Cancel');
			Config.dialogConfig.buttons = Config.buttons;
		}
		try {	// suppress any stupid errors so we can keep going
			$(Config.dialog).dialog(Config.dialogConfig);
		} catch(e) {}
		// implement option tabs
		try {
			$("#bcScriptOptionContent" + Config._guid).tabs();
		} catch(e) {}
		
	},
	close:function() {
		$(Config.dialog).dialog("close");
	},
	save:function() {
		
		for(var tabLabel in Config.options) {
			// insert options
			for(var optionKey in Config.options[tabLabel]) {
				var option = Config.options[tabLabel][optionKey];
				var name = 'bcOpt_' + optionKey + Config._guid;
				var val = null;
				switch(option.type) {
					case 'checkbox':
						val = $('input[name="' + name + '"]').attr('checked') ? true : false;
						break;
					case 'select':
						val = $('select[name="' + name + '"]').val();
						break;
					case 'text':
						val = $('input[name="' + name + '"]').attr('value');
						break;
				}
				
				Config.set(optionKey, val);
			}
		}
	},
	get:function(optionKey) {
		var val = GM_getValue(optionKey, null);
		if(val == null) {
			// get option
			for(var tabLabel in Config.options) {
				// insert options
				for(var optionKeyTest in Config.options[tabLabel]) {
					if(optionKeyTest == optionKey) {
						var option = Config.options[tabLabel][optionKeyTest];
						if(typeof(option['default']) != 'undefined') {
							return(option['default']);
						} else {
							return null;
						}
					}
				}
			}
		} else {
			return val
		}
	},
	set:function(optionKey, val) {
		GM_setValue(optionKey, val);
	},
	getText:function(key) {
		return Config.lang.en[key];
	},
	_guid:''
}

GM_addStyle(
	'.bcConfigDialog .ui-tabs .ui-tabs-nav li a { padding:0.25em 0.75em !important; }' +
	'.bcConfigDialog .ui-tabs > .ui-widget-header { background:none; border-width:0 0 1px 0; border-radius:0; }' +
	'.bcConfigDialog .ui-tabs .ui-tabs-nav { padding-left:0; }' +
	'.bcConfigDialog .ui-widget-content { border:none; }' +
	'.bcConfigDialog .ui-tabs-panel { border:1px solid #aaa; border-width:0 1px 1px; }' +
	'.ui-dialog-buttonpane { border:none !important; }' +
	'.ui-dialog .ui-dialog-content { padding:0; }' +
	'.bcOptionsFields .label { font-weight:bold; }' +
	'.bcOptionsFields a { text-decoration:underline; }'
);