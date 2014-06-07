// ==UserScript==
// @name           GLB AI Enhancer
// @namespace      rockitsauce
// @description    Some helpful utilities to enhance the Defensive AI interfact. 
// @include        http://goallineblitz.com/game/team_defense_ai.pl?team_id=*
// @include        http://goallineblitz.com/game/team_offense_ai.pl?team_id=*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.5.2/jquery-ui.min.js 
// @require        http://userscripts.org/scripts/source/42683.user.js
// ==/UserScript==


$(document).ready( function() {
	// settings for edit.  change to false if you want the input or output hidden on page load
	var settings = {
		show_input_on_load: true,
		show_output_on_load: true
	}
	
	var elements = {
		clipboard: "<fieldset id='clipboard' style='top: 0px; left: 0px; padding-left: 10px; border: 1px solid black; text-align: left; position: absolute; z-index: 9999; background-color: lightgray;'><legend id='clipboard_title' style='padding: 2px 10px; cursor: pointer; background-color: DarkBlue; color: white; font-weight: bold; text-align: center;'><u>Clipboard</u></legend><div id='clippy' style='padding-right: 5px; overflow: -moz-scrollbars-vertical;'><style>li { margin: 2px; } .list_selected { background-color: Orange; }</style>Input (<a id='copyallinput'>copy all</a>):<ul id='input_list' style='cursor: pointer; margin-left: 15px; list-style: none;'></ul>Output (<a id='copyalloutput'>copy all</a>): <ul id='output_list' style=' cursor: pointer; margin-left: 15px; list-style: none;'></ul></div></fieldset>",
		totalcalc: "<span id='total' style='border: 1px solid black; margin-left: 10px; padding-left: 10px; background-color: #C0C0C0; font-weight: bold;'></span>",
		runcalc: "<span id='runtotal' style='border: 1px solid black; margin-left: 10px; padding-left: 10px; background-color: #9933CC; font-weight: bold;'></span>",
		passcalc: "<span id='passtotal' style='border: 1px solid black; margin-left: 10px; padding-left: 10px; background-color: #99FF99; font-weight: bold;'></span>",
		img_style: '<style>.img { border:1px solid #052C05;height:190px;width:277px;} .name {background-color: darkblue;color: white;font-weight: bold;font-family: Verdana, Arial, san-serif;} .container {text-align: center;} .selector {padding: 3px; width: 277px;} #play_view {text-align: center; 3px solid black; overflow-x: hidden; overflow-y: auto; width: 277px; height: 207px; background-color: darkblue;}</style>',
		img_div: '<div class="container" style="background-color: white; border: 3px dotted gold; position: absolute; z-index: 9999; display: none;"><div class="selector"><select id="play_type"></select><span id="close" style="cursor: pointer;">     [ close ]</span></div><div id="play_view"></div></div>',
		base: 'http://goallineblitz.com/images/plays/'
	}
	
	var methods = {
		toggleOutput: function(sender) {
			var cur = $(sender).html();
			$(sender).html(cur == '[+] Show Outputs' ? '[-] Hide Outputs' : '[+] Show Outputs');
			$(sender).parent().next().toggle('fast');
		},
		toggleInput: function(sender) {
			var cur = $(sender).html();
			$(sender).html(cur == '[+] Show Input' ? '[-] Hide Input' : '[+] Show Input');
			$(sender).next().next().next().toggle('fast');
		},
		moveClipboard: function() {
			$('#clipboard').css('top', $(this).scrollTop());
		},
		copy: function(ctl, target) {
			// get output values
			var container = $(ctl).parent().next().next();
			var value_array = '';
			$(':input', container).each( function() {
				value_array += $(this).val() + ",";
			});
			var play_span = $('span:eq(0)', container); 
			
			// reset selected items
			$('#' + target + '_list li').removeClass('list_selected');
			
			// get name label
			var name = $(ctl).parent().prev();
			value_array += $(':input', name).val() + ","; // output name
			value_array += play_span.text(); // play display name
			
			// add copied item to the clipboard
			var appendage = '<li class="list_selected"><span id="delete_copy" style="margin-right: 3px;">[x]</span>' + $(':input', name).val() + '<span id="value" style="display: none;">' + value_array + '</span></li>';
			$('#' + target + '_list li').each( function() {
				if ($(this).text() == '[x]' + $(':input', name).val() + value_array)
					$(this).remove();
			});
			
			$('#' + target + '_list').prepend(appendage);
			
			methods.setCookie();
			methods.bind();
		},
		paste: function(ctl, target) {
			var container = $(ctl).parent().next().next();
			var clipboard = $('#' + target + '_list');
			var value_array = $('.list_selected', clipboard).children('#value').text();
			var data = value_array.split(",");
			
			$(':input', container).each( function(i) {
				$(this).val(value_array.split(",")[i]);
			});
			
			if (target == 'output') {
				var name = $(ctl).parent().prev();
				$('span:eq(0)', container).text(data[data.length-1]);
				$(':input', name).val(data[data.length-2]);
			}
			
			//specific_play_name_11697901_24859757
			var _id = $('span:eq(0)', container).attr('id');
		},
		calc: function(container) {
			var total = 0; var run = 0; var pass = 0;
			$('.output_bias', container).each( function() {
				var t = parseInt($(':input:visible', this).val());
				total += isNaN(t) ? 0 : t;
				$('.output_option:contains("Play Type")', $(this).next()).each( function() {
					var sel = $(':input', this).val();
					if (sel.match('Run'))
						run += isNaN(t) ? 0 : t;
					else if (sel.match('Pass'))
						pass += isNaN(t) ? 0 : t;
				});
			});
			
			$('#total', container).html(total + "%");
			$('#passtotal', container).html(pass + "%");
			$('#runtotal', container).html(run + "%");
		},
		puts: [ 'input', 'output' ],
		ai: function() {
			if (window.location.href.indexOf('offense') > -1)
				return 'offense';
			return 'defense';
		}(),
		setCookie: function() {
			$.each(this.puts, function(i, put) {
				GM_setValue(methods.ai + put, $('#' + put + '_list').html());
			});
		},
		getCookie: function() {
			$.each(this.puts, function(i, put) {
				$('#' + put + '_list').html(GM_getValue(methods.ai + put));
			});
		},
		bind: function() {
			$.each(methods.puts, function(i, type) {
				$('#' + type + '_list li').click( function() {
					$('#' + type + '_list li').removeClass('list_selected');
					$(this).addClass('list_selected');
				});
			});
			
			// handle copies item removal
			$('span:contains("[x]")', $('#clippy')).click( function() {
				$(this).parent().remove();
				methods.setCookie();
			});			
		},
		output: null,
		load: function(ctl, info, name) {
			// add play settings
			var inputs = $('div:eq(4)', methods.output);
			$(':input', inputs).each( function(i) {
				$(this).val(info.split(",")[i]);
			});
			
			// add play name
			$(':input:eq(0)', methods.output).val(name);
		},
		init: function() {
			if (!settings.show_output_on_load) {
				$('.showhideoutput').each( function() {
					methods.toggleOutput(this);
				});
			}
			if (!settings.show_input_on_load) {
				$('.showhideinput').each( function() {
					methods.toggleInput(this);
				});
			}
			$('#clipboard').draggable({ handle: 'legend' });
			$('.ai_input').each( function() {
				methods.calc($(this).parent());
			});
			
			methods.getCookie();
			methods.bind();
		}
	}
	
			
// inject clipboard
	$('body').append(elements.clipboard);
	
//inject hide & show links 
	$('a:contains("Add New Output")').after("&nbsp;&nbsp;<a class='showhideoutput'>[-] Hide Outputs</a>");
	$('a:contains("Add new Input")').after("&nbsp;&nbsp;<a class='showhideinput'>[-] Hide Input</a>");
	
// inject copy & paste links
	$('a:contains("Delete This Input")').parent()
		.append("&nbsp;|&nbsp;<a class='copy_input'>Copy Input</a>")
		.append("&nbsp;|&nbsp;<a class='paste_input'>Paste Input</a>");
	$('a:contains("Delete This Output")').parent()
		.append("&nbsp;|&nbsp;<a class='copy_output'>Copy Output</a>")
		.append("&nbsp;|&nbsp;<a class='paste_output'>Paste Output</a>");

	if (methods.ai == 'offense') {
		$('body').append(elements.img_div);
		$('head').append(elements.img_style);
		$('.showhideoutput').after(elements.passcalc).after(elements.runcalc);

		// append hyperlink for play loading
		$('.output_name a:contains("Hide/Show Options")').after(" | <a id='load_play' style='cursor: pointer; font-size: 8pt;'>Load Play</a>");
		$('a:contains("Load Play")').bind('click', function() {
			var context = $('.container');
			methods.output = $(this).parent().parent();
			context
				.css('left', $(this).offset().left)
				.css('top', $(this).offset().top)
				.show();
		});
		
		// add images to the display html
		$('#play_type').append("<option />");
		$.each(plays, function(name, obj) {
			$('#play_type').append("<option value='" + name + "'>" + name + "</option>");
		});
		
		// add click events to images
		$('#play_type').bind('change', function() {
			var type = $(this).val();
			var view = $('#play_view');

			$('#play_view').html('');
			$.each(plays[type], function(i, play) {
				view.append('<span class="name">' + play.name + '</span><span style="display: none;">' + play.data + '</span><img class="img" src="' + elements.base + play.image + '" />');		
			});
			$('img', view).bind('click', function() {
				var info = $(this).prev().text();
				var name = $(this).prev().prev().text();
				methods.load('', info, name); 
				$('.container').hide();
			});	
		});
		
		$('#close').bind('click', function() {
			$('.container').hide();
		});	
	}
	$('.showhideoutput').after(elements.totalcalc);
	
//layout adjustments 
	$('a', elements.clipboard).css('cursor', 'pointer');
	var h = $(window).height() - 20;
	$('#clippy').css('max-height', h + 'px');
	$('.quarter a').css('cursor', 'pointer').css('font-size', '8pt').css('font-weight', 'bold');
	//$('.input_name :input').width(375);
	//$('.input_delete').width(385);
	//$('.output_delete').width(300);
	//$('.output_name :input').width(245);
	
// event binding
	$('.showhideinput').bind('click', function() {	methods.toggleInput(this); });
	$('.showhideoutput').bind('click', function() {	methods.toggleOutput(this); });
	$('#copyallinput').click( function() {
		$('.copy_input').each( function(i) {
			methods.copy(this, 'input');
		});	
	});

	$('#copyalloutput').click( function() {
		$('.copy_output').each( function(i) {
			methods.copy(this, 'output');
		});
	});
	// copy events
	$('.copy_input').bind('click', function() {	methods.copy(this, 'input'); });
	$('.copy_output').bind('click', function() { methods.copy(this, 'output'); });
	
	// paste events
	$('.paste_input').bind('click', function() { methods.paste(this, 'input'); });			
	$('.paste_output').bind('click', function() { methods.paste(this, 'output'); });
	
	$('.output_bias :input').bind('keyup change', function() {
		methods.calc($(this).parent().parent().parent().parent().parent());
	});
	
	$(window).bind('scroll', methods.moveClipboard);
	
	methods.init();
});