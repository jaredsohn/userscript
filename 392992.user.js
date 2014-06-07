// ==UserScript==
// @name           SecDisBoFi
// @description    SecDisBoFi
// ==/UserScript==

/*
	Copyright Spockholm Mafia Tools
	$Id: secretboss.js,v 1.13 2014-02-19 20:55:53 martin Exp $
*/

javascript:(function (){
	var spocklet = 'sdbf',
	version = 'Secret District Boss Fighter',
	run = false,
	user_health = parseInt(User.health) || 0,
	debug = false,
	nextcombo = 0,
	items = {},
	combos = {},
	stats = {
		"xp": function() {
			return parseInt(this.xp_start-User.exp_to_next_level)
		},
		"xp_start": parseInt(User.exp_to_next_level),
		"stamina": 0,
		"ratio": function() {
			return parseFloat(this.xp()/this.stamina).toFixed(2);
		},
		"stamina_used": 0
	};
	
	$('body').bind('ajaxComplete.sdbf',function(e,xhr,settings) {
		var text = xhr.responseText,m;
		if (xp = /xp_earned..(\d+)/.exec(text)) {
			//console.log(stats.xp());
			stats.stamina += stats.stamina_used;
			//log('Gained <span class="experience">'+stats.xp()+'</span>');
		}
		if (m=/bossDefeated...true/.test(text)) {
			log('<span class="good">Boss Defeated!</span>');
		}
		if (/You must have at least 20 to fight/.exec(text)) {
			heal();
		}
		else if (run) {
			click_attack_button();
		}
		else {
			log('Stopped...');
		}
	});
	
	function click_attack_button() {
		var button = $('#attackBtn > a:first','div.bossfightv2') || null;
		var health_need = parseInt(JSON.parse(button.attr('requirements')).health+10) || 30;
		if (User.health < health_need) {
			heal();
		}
		else if($('#'+spocklet+'_combos').val()==5){
			var full = $('.full_consumable:first');
			if(full.length > 0){
				full.click();
			}
			else{
				log('No more consumables');
			}
		}
		else if ($('#'+spocklet+'_combos').val()!="No") {
			var button;
			//var combos={"green":[2,4,4,3],"orange":[1,2,4,3],"red":[4,1,4,2]};
			if(nextcombo>3) { nextcombo = 0; }
			//console.log(nextcombo);
			//console.log(nextcombo);
			
			var next=combos[$('#'+spocklet+'_combos').val()][nextcombo];
			var next_id=items[next].div_id;
			//var next=combos[$('#'+spocklet+'_combos').val()][nextcombo];
			
			nextcombo++;
			// check if exists!
			if($('#'+next_id).length>0){
				$('#'+next_id).trigger('click');
			} else {
				// whatever?
			}
		}
		else {
			var target='';
			var button = $('#attackBtn > a:first','div.bossfightv2') || null;
			var stamina_need = parseInt(JSON.parse(button.attr('requirements')).stamina) || 180;
			stats.stamina_used = parseInt(stamina_need);
			var health_need = parseInt(JSON.parse(button.attr('requirements')).health+10) || 30;
			if (User.stamina < stamina_need) {
				log('<span class="bad">Out of stamina!</span>');
				$('#'+spocklet+'_toggle_attack').trigger('click');
			}
			else if (User.health < health_need) {
				heal();
			}
			else if (button) {
				button.trigger('click');
				//stats.stamina += stamina_need;
				log('Attacking '+target+' ('+stamina_need+' stamina)');
			}
			else {
				log('No more targets, stopping');
				$('#'+spocklet+'_toggle_attack').trigger('click');
			}
		}
	}
	function timestamp() {
		return parseInt(new Date().getTime().toString().substring(0, 10));
	}

	function heal() {
		log('Healing');
		var preurl = '//facebook-ca2.mafiawars.zynga.com/mwfb/remote/html_server.php?';
		var url = 'xw_controller=hospital&xw_action=heal&xw_city=&xcity=1';
		var params = {
			'ajax': 1,
			'xw_client_id': 8,
			'liteload': 1,
			'sf_xw_user_id': User.id,
			'sf_xw_sig': local_xw_sig,
			'clicks': User.clicks
		};
		$.ajax({
			type: "POST",
			url: preurl+url,
			data: params,
			cache: false,
			success: function (response) {
				var object = JSON.parse(response.replace(/^(\s\d\s+)/,''));
				user_health = parseInt((/user_health":([\d]+),/.exec(response))[1]);
				user_fields_update(object.user_fields);
				user_info_update(object.user_fields, object.user_info);
				if (object.heal_success == 1) {
					//$('#'+spocklet+'_heal').removeClass('red black').fadeOut('fast').addClass('green').fadeIn('fast');
					$('#'+spocklet+'_heal').removeClass('red black').addClass('green');
					setTimeout(function() { $('#'+spocklet+'_heal').removeClass('red green').addClass('black'); }, 5000);
					log('Heal success');
					heal_time = timestamp();
				}
				else {
					//$('#'+spocklet+'_heal').removeClass('green black').fadeOut('fast').addClass('red').fadeIn('fast');
					$('#'+spocklet+'_heal').removeClass('green black').addClass('red');
					setTimeout(function() { $('#'+spocklet+'_heal').removeClass('red green').addClass('black'); }, 5000);
					log('Heal fail!');
				}
			}
		});
	}
	
	function create_control_box() {
		var box_html =
		'<div id="'+spocklet+'_main" style="text-align:center;">'+
			'<span id="'+spocklet+'_header">'+version+'</span><br />'+
			//'<a href="http://www.spockholm.com/mafia/donate.php" target="_blank">Spockholm Mafia Tools</a><br />'+
			'<a href="#" id="'+spocklet+'_heal" class="sexy_button_new short black"><span><span><img src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon-health.gif"> <span id="'+spocklet+'_healtimer">0</span></span></span></a>&nbsp;'+
			'<a href="#" id="'+spocklet+'_toggle_attack" class="sexy_button_new short black sexy_attack_new"><span><span>Attack</span></span></a>&nbsp;'+
			'<a href="#" id="'+spocklet+'_close" class="sexy_button_new short black"><span><span><img src="http://mwfb.static.zgncdn.com/mwfb/graphics/black_close_button_14x14_01.gif" /></span></span></a><br />'+
			'<br />Use combos <select id="'+spocklet+'_combos" title="Select a combo to use, double check it is unlocked first!"><option>No</option><option value=1>Green</option><option value=2>Orange</option><option value=3>Red</option><option value=4>Consumable Only</option><option value=5>All Consumables</option></select><br />'+
			'<br /><br />'+
			'<span id="'+spocklet+'_status"></span><br />'+
			'<span id="'+spocklet+'_log"></span>'+
		'</div>';

		if ($('#'+spocklet+'_main').length > 0) {
			$('#'+spocklet+'_main').html(box_html);
		}
		else {
			$('#inner_page').append(box_html);
		}
		$('#'+spocklet+'_toggle_attack').toggle(
			function() {
				run = true;
				$(this).addClass('green').removeClass('black');
				click_attack_button();
			},
			function () {
				run = false;
				$(this).addClass('black').removeClass('green');
			}
		);
		$('#'+spocklet+'_heal').click(function() {
			heal();
			return false;
		});

		$('#'+spocklet+'_close').click(function() {
			run = false;
			$('#'+spocklet+'_main').remove();
			$('body').unbind('ajaxComplete.sdbf');
		});

		$('#'+spocklet+'_header').mouseover(function() {
			$(this).css('cursor', 'move');
		});
		$('#'+spocklet+'_main').draggable({containment: "window"});

		var position = $('#inner_page').position();
		$('#'+spocklet+'_main').css({
			'padding':'5px',
			'background':'#c0c0c0',
			'color':'#000',
			'position':'fixed',
			'top': '350px',
			'left': '250px',
			'z-index':'100',
			'width':'275px',
			'border':'2px solid #888',
			'-moz-border-radius':'3px',
			'border-radius':'3px',
			'-webkit-border-radius':'2px'
		});
	}
   
	function read_combos() {
		$('div[id^="bfv2_combo_img_"]','#comboPop').each(function(){
			var id = $(this).prop('id');
			if (combo = /_(\d)_(\d)/.exec(id)) {
				var combo_id = combo[1];
				var item_id = parseInt($(this).find('img:first').attr('item_id'));
			   
				if (!Util.isset(items[item_id])) {
					var name = $(this).find('img:first').prop('title');
					var count = parseInt($('#spbf_fight_page_consumable_corner_number_'+item_id).text());
					var div_id = $('#spbf_fight_page_consumable_corner_number_'+item_id).parent().prop('id');
					items[item_id] = { "name": name , "id": item_id, "div_id": div_id, "count": count };
				}
			   
				if (Util.isset(combos[combo_id])) {
					combos[combo_id].push(item_id);
				}
				else {
					combos[combo_id] = [];
					combos[combo_id].push(item_id);
				}
			}
		});
		var consumable = parseInt($('#consumable_4 > div:first').attr('id').replace(/spbf_fight_page_consumable_corner_number_/,''),10);
		combos[4] = [consumable,consumable,consumable,consumable];
		if (debug) {
			console.log(combos);
			console.log(items);
		}
	}
	read_combos();
	heal();
//	console.log(combos);
//	console.log(items);
		
	function log(s) {
		if (debug) {
			console.log(s);
		}
		else {
			var log_limit = 15;
			var count = parseInt($('#'+spocklet+'_log > p').size());
			$('#'+spocklet+'_status').html('<span class="experience">'+stats.xp()+'</span> <span class="stamina">'+stats.stamina+'</span> Ratio: '+stats.ratio());
			if (count == log_limit) {
				$('#'+spocklet+'_log > p:first').remove();
				$('#'+spocklet+'_log').append('<p style="margin: 0;">'+s+'</p>');
			}
			else {
				$('#'+spocklet+'_log').append('<p style="margin: 0;">'+s+'</p>');
			}
		}
	}

	create_control_box();
}())