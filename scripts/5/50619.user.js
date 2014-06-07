// ==UserScript==
// @name           GLB AI Enhancer v 2.0
// @namespace      rockitsauce
// @description    Some helpful utilities to enhance the AI interface. 
// @include        http://goallineblitz.com/game/team_defense_ai.pl?team_id=*
// @include        http://goallineblitz.com/game/team_offense_ai.pl?team_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.14/jquery-ui.min.js
// ==/UserScript==


$(document).ready( function() {
	var el = {
		clipboardmarkup: "<fieldset id='clipboard' class='content_container' style='top: 0px; left: 0px; padding-left: 10px; text-align: left; position: absolute; z-index: 9999;'><legend id='clipboard_title' class='nonalternating_color' style='padding: 2px 10px; cursor: pointer;'><u>Clipboard</u></legend>Actions:<ul id='action_list' style='list-style-type: disc; cursor: pointer; margin-left: 15px;'><li style='list-style-type: disc;'><a id='copy_selected'>Copy</a></li><li style='list-style-type: disc;'><a id='paste_selected'>Paste</a></li></ul><style>a { cursor: pointer; } li { margin: 2px; } .list_selected { background-color: Orange; }</style><div id='clippy' style='padding-right: 5px; overflow: -moz-scrollbars-vertical;'>Input(s):<ul id='input_list' style='cursor: pointer; margin-left: 15px; list-style: none;'></ul>Output(s): <ul id='output_list' style=' cursor: pointer; margin-left: 15px; list-style: none;'></ul></div></fieldset>",
		totalcalc: "<span id='total' style='border: 1px solid black; margin-left: 10px; padding-left: 10px; background-color: #C0C0C0; font-weight: bold;'></span>",
		runcalc: "<span id='runtotal' style='border: 1px solid black; margin-left: 10px; padding-left: 10px; background-color: #9933CC; font-weight: bold;'></span>",
		passcalc: "<span id='passtotal' style='border: 1px solid black; margin-left: 10px; padding-left: 10px; background-color: #99FF99; font-weight: bold;'></span>",
		item: function() {
			return "<li><span id='delete_copy' style='margin-right: 3px;'>[x]</span>" + property.selected.name + "<span id='value' style='display: none;'>" + fn.stringify(property.selected) + "</span></li>";
		}
	};
	
	var property = {
		ai_type: "",
		selected: {
			object: {},
			type: "",
			name: "",
			custom: "",
			values: []
		},
		stored: {
			type: "",
			name: "",
			custom: "",
			values: []
		}
	};
	
	var fn = {
		stringify: function(s) {
			return s.type + "," + s.name + "," + s.custom + "," + s.values.join(",");
		},
		parse: function(str) {
			var input = str.split(",");
			property.stored.type = input[0];
			property.stored.name = input[1];
			property.stored.custom = input[2];
			for (i = 3; i <= input.length; i++) {
				property.stored.values.push(input[i]);
			}
		},
		select: function() {
			fn.reset_selected();
			$(this).css('border', '1px dashed darkblue');
			
			// gather data
			property.selected.object = this;
			property.selected.type = $(this).is('.content_container.ai_input') ? 'input' : 'output';
			$(':input', property.selected.object).each( function() {
				property.selected.values.push($(this).val());
			});
			property.selected.name = $('.input_name :input, .output_name :input', property.selected.object).val();
			property.selected.custom = $('span:eq(0)', property.selected.object).text();

			return fn;
		},
		pick: function() {
			fn.reset_stored();
			fn.parse($('#value', this).text());
			$(this).addClass('list_selected');
			return fn;
		},
		reset_stored: function() {
			$('#clippy li').removeClass('list_selected');
			property.stored.type = "";
			property.stored.name = "";
			property.stored.custom = "";
			property.stored.values = [];
			return fn;
		},
		reset_selected: function() {
			$(property.selected.object).css('border', '1px solid #A0A0A0');
			property.selected.object = null;
			property.selected.type = "";
			property.selected.name = "";
			property.selected.values = [];
			property.selected.custom = "";
			return fn;
		},
		copy: function() {
			fn.reset_stored();
			var container = $('#' + property.selected.type + '_list');
			container.append(el.item());
			
			var newitem = $('li:last', container);
			fn.parse($('#value', newitem).text());
			newitem.addClass('list_selected');
			
			return fn.save();
		},
		paste: function() {
			if ($(this).is('.content_container.ai_input') && property.stored.type == 'output') return fn;
			$('.input_name :input, .output_name :input', property.selected.object).val(property.stored.name);
			$('span:eq(0)', property.selected.object).text(property.stored.custom);
			$(':input', property.selected.object).each( function(i) {
				$(this).val(property.stored.values[i]);
			});
			return fn;
		},
		copyallinput: function() { return fn; },
		copyalloutput: function() { return fn; },
		save: function() {
			GM_setValue(property.ai_type, $('#clippy').html());
			return fn;
		},
		remove: function() {
			$(this).parent().remove();
			fn.reset_stored().save();
		},
		insert: function() {
			// override internal script that inserts new input/output
			return fn;
		},
		scroll: function() {
			$('#clipboard').css('top', $(this).scrollTop());
		},
		change: function() {
			fn.calculate($(this).parents('.outputs'));
		},
		calculate: function(ctr) {
			var total = 0; var run = 0; var pass = 0;
			
			$('.content_container', ctr).each( function() {
				var t = parseInt($('.output_bias :input', this).val());
				total += isNaN(t) ? 0 : t;
				$('.output_option:contains("Play Type")', this).each( function() {
					var sel = $(':input', this).val();
					if (sel.match('Run'))
						run += isNaN(t) ? 0 : t;
					else if (sel.match('Pass'))
						pass += isNaN(t) ? 0 : t;
				});
			});
			
			$('#total', ctr.prev()).html(total + "%");
			$('#passtotal', ctr.prev()).html(pass + "%");
			$('#runtotal', ctr.prev()).html(run + "%");
		},
		setup: function() {
			if (window.location.href.indexOf('offense') > -1)
				property.ai_type = 'offense';
			else
				property.ai_type = 'defense';
			
			// element appending
			$('body').append(el.clipboardmarkup);
			$('#clippy').css('max-height', $(window).height() - 20 + 'px');
			var saved = GM_getValue(property.ai_type);
			if (saved) {
				$('#clippy').html(saved)
				$('li').removeClass('list_selected');
			}
			
			if (property.ai_type == "offense")
				$('.outputs:contains("+")').append(el.passcalc).append(el.runcalc);
			$('.outputs:contains("+")').append(el.totalcalc);
			
			
			// event binding
			$(window).bind('scroll', fn.scroll);
			$('#clipboard').draggable({ handle: 'legend' });
			
			$('.content_container.ai_input, .content_container.ai_output').live('click', fn.select);
			$('#copy_all_input').bind('click', fn.copyallinput);
			$('#copy_all_output').bind('click', fn.copyalloutput);
			$('#copy_selected').bind('click', fn.copy);
			$('#paste_selected').bind('click', fn.paste);
			$('#clippy li').live('click', fn.pick);
			$('#delete_copy').live('click', fn.remove);
			
			$('.output_bias :input').bind('change', fn.change);
			
			$('.outputs:odd').each( function() {
				fn.calculate($(this));
			});
		}
	};
	
	fn.setup();
});