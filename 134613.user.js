// ==UserScript==
// @name           Quake Live SAM Presets
// @namespace      http://userscripts.org/users/469998
// @description    Store/recall Quake Live Start-a-Match settings
// @include        http://*.quakelive.com/*
// @exclude        http://*.quakelive.com/forum/*
// ==/UserScript==

// contentEval taken from http://userscripts.org/scripts/show/100842
function contentEval(source) {
	if ('function' == typeof source) {
		source = '(' + source + ')();';
	}
	var script = document.createElement('script');
	script.setAttribute('type', 'application/javascript');
	script.textContent = source;
	document.body.appendChild(script);
	document.body.removeChild(script);
}

contentEval(function () {
	if (typeof quakelive != 'object') { return; }
	if (typeof amplify.store("GM_sampresets") != 'object') {
		amplify.store('GM_sampresets',{
			'#playquake':'{"maps":["spidercrossings","japanesecastles","ironworks","troubledwaters","shiningforces","courtyard","campercrossings","reflux"],"cvars":{"g_gametype":5,"teamsize":4,"g_timeoutCount":4,"g_timeoutLen":60,"g_password":"pq","web_location":"18"}}',
			'#tdmpickup':'{"maps":["purgatory","dreadfulplace","hiddenfortress","intervention","deepinside","grimdungeons","realmofsteelrats","tornado"],"cvars":{"g_gametype":3,"g_timeoutCount":4,"g_timeoutLen":60,"g_password":"tdm","mercylimit":50,"web_location":"18"}}',
			'#dompickup':'{"maps":["hiddenfortress","overkill","devilish","asylum","campgrounds","blackcathedral"],"cvars":{"g_gametype":10,"g_timeoutCount":4,"g_timeoutLen":60,"g_password":"pq","scorelimit":200,"g_domNeutralFlag":1,"web_location":"18"}}'
		});
	}
	var oldControlsClicked = quakelive.mod_startamatch.sections.advanced.controlsClicked;
	quakelive.mod_startamatch.sections.advanced.controlsClicked = function () {
		if ($(this).data('handler') == 'import') {
			var oldqlPrompt = qlPrompt;
			qlPrompt = function (settings) {
				var presetOpts = '',presets = amplify.store('GM_sampresets'),i;
				for (i in presets) {
					presetOpts += $('<div/>').append($('<option/>', {text:i,id:i})).html();
				}
				settings.body = 'Load preset: <select style="width:175px;text-align:center;" id="GM_samload"><option value="">' +
					(presetOpts ? 'Select...' : '(empty)') + '</option>' + presetOpts + '</select> <a href="javascript:void(0)" \
					style="color: #CA3827;" id="GM_samdelete">(delete)</a><br/><br/>' + settings.body;
				var oldOk = settings.ok;
				settings.ok = function () {
					amplify.store('GM_sampresets', presets);
					if (!$('#sam_import').val()) {
						$('#sam_import').val(JSON.stringify(quakelive.mod_startamatch.settings));
					}
					return oldOk();
				}
				var ret = oldqlPrompt.apply(this, arguments);
				$('#GM_samload').change(function () {
					$('#sam_import').val(amplify.store('GM_sampresets')[$(this).val()]);
				});
				$('#GM_samdelete').click(function () {
					var select = $('#GM_samload')
						if (select.val()) {
							delete presets[select.val()];
							if (select.children().length == 2) {
								select.empty().append('<option value="">(empty)</option>');
							} else {
								select.children(':selected').remove();
							}
							$('#sam_import').val('');
						}
				});
				return ret;
			}
			var ret = oldControlsClicked.apply(this, arguments);
			qlPrompt = oldqlPrompt;
			return ret;
		} else if ($(this).data('handler') == 'export') {
			var oldqlPrompt = qlPrompt;
			qlPrompt = function (settings) {
				var presetOpts = '',i;
				for (i in amplify.store('GM_sampresets')) {
					presetOpts += $('<div/>').append($('<option/>', {text:i,id:i})).html();
				}
				settings.body += '<br/><div style="margin:6px 0px 11px"><span style="display:none" id="GM_samheadless"><input \
					type="checkbox" id="GM_samsavehost"/> Include hostname?</span> <input type="checkbox" id="GM_samsaveloc"/>\
					Include location?</div>\Save as preset: <select id="GM_samsave" style="text-align:center;"><option value="\
					">(new)</option>' + presetOpts + '</select><input style="text-align:center" type="text" id="GM_samsavename"/>';
				settings.alert = false;
				settings.ok = function () {
					var select = $('#GM_samsave').val();
					var name = $('#GM_samsave').children(':selected').index() ? select : $('#GM_samsavename').val();
					if (!name) {
						qlHidePrompt();
						return;
					} else {
						var tmp = amplify.store('GM_sampresets');
						tmp[name] = $('#sam_import').val();
						amplify.store('GM_sampresets', tmp);
						qlHidePrompt();
					}
				}
				var ret = oldqlPrompt.apply(this, arguments);
				if (quakelive.headless) {
					$('#GM_samheadless').show();
				}
				$('#GM_samsavehost').change(function () {
					if (!quakelive.mod_startamatch.getCvar('sv_hostname').isDefault) {
						var tmp = JSON.parse($('#sam_import').val());
						if ($('#GM_samsavehost').prop('checked')) {
							tmp.cvars['sv_hostname'] = quakelive.mod_startamatch.settings.cvars.sv_hostname;
						} else {
							delete tmp.cvars['sv_hostname'];
						}
						$('#sam_import').val(JSON.stringify(tmp));
					}
				});
				$('#GM_samsaveloc').change(function () {
					if (!quakelive.mod_startamatch.getCvar('web_location').isDefault) {
						var tmp = JSON.parse($('#sam_import').val());
						if ($('#GM_samsaveloc').prop('checked')) {
							tmp.cvars['web_location'] = quakelive.mod_startamatch.settings.cvars.web_location;
						} else {
							delete tmp.cvars['web_location'];
						}
						$('#sam_import').val(JSON.stringify(tmp));
					}
				});
				$('#GM_samsave').change(function () {
					var namebox = $('#GM_samsavename');
					if ($(this).children(':selected').index()) {
						namebox.prop('disabled', true).css('background-color', '#eee').val('OVERWRITE');
					} else {
						namebox.prop('disabled', false).css('background-color', '').val('');
					}
				});
				return ret;
			}
			var ret = oldControlsClicked.apply(this, arguments);
			qlPrompt = oldqlPrompt;
			return ret;
		} else {
			return oldControlsClicked.apply(this, arguments);
		}
	}
});
