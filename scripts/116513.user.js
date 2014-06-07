// ==UserScript==
// @name           SP T
// @author         gvozden
// @description    SP T
// @include        http://apps.facebook.com/inthemafia/*
// @include        https://apps.facebook.com/inthemafia/*
// @include        http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include        https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @match          http://apps.facebook.com/inthemafia/*
// @match          https://apps.facebook.com/inthemafia/*
// @match          http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @match          https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @version     SP T
// ==/UserScript==
// $Id: spockholm_toolbar_lite.user.js,v 1.5 2011-09-26 12:07:04 martin Exp $

javascript:(function(){
	var version = 'Spockholm Mafia Toolbar v1.0',
	spocklet = 'spocktoolbar',
	scripts = [],
	autocomplete_list = [], autocomplete_reverse={},
	backup = false,
	config = {
		inactive: {},
		own: [{
			name: 'Checklist Server',
			src: 'http://spocklet.com/bookmarklet/checklist-server-beta.js',
			page: 'index',
			active: false
		},{
			name: 'Checklist',
			src: 'http://spocklet.com/bookmarklet/checklist-beta.js',
			page: 'index',
			active: true
		}],
		settings: {
			heal: true,
			bank: false,
			dataversion: 1,
		}
	},
	updates = { added: [], updated: [] };
	var toolbar_logo = 'http://cdn.spocklet.com/toolbar-logo.png';
	var exportimg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAANCAIAAADAGxJNAAAABnRSTlMA/wAAAP+JwC+QAAAAXklEQVR4nJ2SSRLAIAgEe1L5/5cnhyxGC4jRI9jTFiiSY5y1BNhjW1KBbanHFnpHfzOnKsSit6lLHfSVJ9MvMIAWGP9lDOxRvY1EkvE9tKs+72lBk0y3jGIVz/XxBx21XxkUaHSVNgAAAABJRU5ErkJggg==';
	var exportimg2 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAANCAIAAADAGxJNAAAA5klEQVR4nGNgIB0wMjAw/P//H12UkRGPHiZcEsgGoRnJAmdN2tp05Nb2///+C/AL33t2G90IiJOQ9SzYM/kRwxlVA8n/////+P5HUUoV03i4Nqjb9txYw87F8v///39//+Pxyn9kPd++ff/////Pb79Z//HwPmPGrYvhP9xtikKaj3dcjFS0fffvO9tPLjx6GOFh/fnbx09f3t/Zs+LnpxdS2k46dv64NCDcxsvFLy2mIKVm9vvH97+MDAz//0MQI1JwwRmI+Pn47f2vPz+fvHk27+LcR2/vYbUBwcZMBwhpvAmCBAAA08lk4Hv9CQEAAAAASUVORK5CYII=';

	var http = 'http://';
	if (/https/.test(document.location)) {
		http = 'https://';
	}
	var preurl = http+'facebook.mafiawars.zynga.com/mwfb/remote/html_server.php';

	add_spocklet('Assassin-a-Nator','http://spocklet.com/bookmarklet/assassin-a-nator.js','fight');
	add_spocklet('RepeatJob','http://spocklet.com/bookmarklet/repeatjob.js','job2');
	add_spocklet('RepeatJob Redux','http://spocklet.com/bookmarklet/repeatjob.redux.js','job5');
	add_spocklet('RepeatJob Brazil/Chicago','http://spocklet.com/bookmarklet/repeatjob-brazil.js','job7');
	add_spocklet('Robber BG','http://spocklet.com/bookmarklet/robber.bg.js','robbing');
	add_spocklet('Property Manager','http://spocklet.com/bookmarklet/property.manager.js','index');
	add_spocklet('Switch','http://spocklet.com/bookmarklet/switch.js','stats');
	add_spocklet('Link-a-Nator','http://spocklet.com/bookmarklet/link-a-nator.js','index');
	add_spocklet('Get-a-Nator','http://spocklet.com/bookmarklet/free_gift_get_a_nator.js','index');
	add_spocklet('Family Friends','http://spocklet.com/bookmarklet/family_friends.js','index');
	add_spocklet('Family Boss Fighter','http://spocklet.com/bookmarklet/family-boss-fighter.js','Epicclanboss');
	add_spocklet('Inventory History','http://spocklet.com/bookmarklet/inventory_history.js','index');
	add_spocklet('Stats History','http://spocklet.com/bookmarklet/history.js','index');
	add_spocklet('Mafia Manager','http://spocklet.com/bookmarklet/mafia_history.js','index');
	add_spocklet('Family Manager','http://spocklet.com/bookmarklet/family_history.js','index');

	function add_spocklet(name,src,page) {
		scripts.push({
			"name" : name,
			"src" : src,
			"page" : page,
		});
	}
	function load_spocklet(src) {
		if (/javascript/.test(src)) {
			eval(src);
		}
		else {
			var a = document.createElement("script");
			a.type = "text/javascript";
			if (backup && /spocklet.com/.test(src)) {
				src = src.replace(/spocklet.com/,'backup.spocklet.com');
			}
			a.src = src+"?"+Math.random();
			document.getElementsByTagName("head")[0].appendChild(a);
		}
	}
	function write_scripts() {
		autocomplete_list = []; autocomplete_reverse={};

		var html = '<ul style="padding-left: 0; margin-left: 0; margin-top: 0; margin-bottom: 0; list-style-type: none;">'
		for (var i = 0; i < scripts.length; i++) {
			if (!config.inactive[i]) {
				html += '<li><a href="#" class="spocklet_button '+scripts[i].page+'" style="display: block; padding: 5px; width: 150px; border-bottom: 1px solid #000;" src="'+scripts[i].src+'">'+scripts[i].name+'</a></li>'
			}
			autocomplete_list.push(scripts[i].name); autocomplete_reverse[scripts[i].name]=scripts[i].src;
		}
		for (var i = 0; i < config.own.length; i++) {
			if (config.own[i].active) {
				html += '<li><a href="#" class="spocklet_button '+config.own[i].page+'" style="display: block; padding: 5px; width: 150px; border-bottom: 1px solid #000;" src="'+config.own[i].src+'">'+config.own[i].name+'</a></li>'
			}
			autocomplete_list.push(config.own[i].name); autocomplete_reverse[config.own[i].name]=config.own[i].src;
		}

		html += '</ul>';
		$('#'+spocklet+'_spocklets_menu').html(html);
		$('.spocklet_button').unbind('click').bind('click',function() {
			load_spocklet($(this).attr('src'));
		});
		$('.spocklet_button').hover(
			function () {
				$(this).css({'background-color':'#999'});
			},
			function () {
				$(this).css({'background-color':'#333'});
			}
		);
		$('#'+spocklet+'_spocklets_header').toggle(
			function() {
				$('#'+spocklet+'_spocklets_menu').css('display','block');
			},
			function() {
				$('#'+spocklet+'_spocklets_menu').css('display','none');
			}
		);
		$('#'+spocklet+'_search').autocomplete({
			source: autocomplete_list,
			select:function(event,ui){
				var name=ui.item.label;
				load_spocklet(autocomplete_reverse[name]);
				setTimeout(function(){$('#'+spocklet+'_search').val('')},1000);
			},
			open: function(event, ui) { $('.ui-autocomplete').css('z-index','100'); }
		});
	}
	function write_family_id() {
		if (!User.familyid && $('#clan_profile_link').text()) {
			User.familyid = atob(unescape(/%22%3A%22([a-zA-Z0-9%]+)%22%7D/.exec($('#clan_profile_link').text())[1]));
		}
	}
	function log(s) {
		$('#'+spocklet+'_log').append(s);
	}
	function remove_zynga_banners() {
		$('#popup_fodder_zmc #pop_zmc').remove();
		$('#mw_like_button').remove();
		$('iframe[name="mafiawars_zbar"]').parent().remove();
		$('#snapi_zbar').parent().remove();
		$('#zbar').parent().remove();
		$('#mafia_two_banner').remove();
		if ($('#'+spocklet+'_closeloading').length==0) {
			$('#LoadingOverlay > div').css("display","block").append('<div id="'+spocklet+'_closeloading"><a href="#" alt="Close Revolver (Spockholm Toolbar feature)" title="Close Revolver (Spockholm Toolbar feature)" onclick="$(\'#LoadingOverlay\').hide(); $(\'#LoadingBackground\').hide(); return false;">close</a></div>')
		}
		window.travelToMwTwo = function(){
			MW.Track.count('action','city_travel','to_mw2');
			window.open("//apps.facebook.com/mafiawars-two/?src=xpromo&aff=mafiawars&crt=launch_r1");
		};

		window.resizeIframe = function() {};
	}
	function remove_pop_bg() {
		$('.pop_bg').each(function() {
			if ($(this).css('display') == 'block') {
				$(this).css('display','none');
			}
		});
	}
	function calculate_brazil_jobs() {
		var user_max_energy = parseInt(User.energy);
		var exp_need = parseInt(User.exp_to_next_level);
		var max_exp = 0;
		var max_ratio = 0;
		var min_left = 99999;
		$('.jobs > .job').each(function() {
			var energy = $(this).find('li.energy:last').attr('current_value');
			var exp = $(this).find('li.experience:last').attr('current_value');
			var ratio = parseFloat(exp/energy).toFixed(2);
			var times = parseInt(user_max_energy / energy);
			var left = parseInt(user_max_energy % energy);
			var total_exp = parseInt(times * exp);
			if (total_exp > max_exp) {
				max_exp = total_exp;
			}
			if (ratio > max_ratio) {
				max_ratio = ratio;
			}
			if (left < min_left) {
				min_left = left;
			}
		});

		$('.jobs > .job').each(function() {
			var name = $(this).find('h4').text().trim();
			if (!/Gaining/.test(name)) {
				var energy = $(this).find('li.energy:last').attr('current_value');
				if (parseInt(energy) > user_max_energy) {
					$(this).find('li.energy').html('<span class="bad">'+energy+'</span>');
				}
				var exp = $(this).find('li.experience:last').attr('current_value');
				var ratio = parseFloat(exp/energy).toFixed(2);
				var times = parseInt(user_max_energy / energy);
				var left = parseInt(user_max_energy % energy);
				var total_exp = parseInt(times * exp);
				if (ratio == max_ratio) {
					$(this).css('background-color','#003500');
				}
				$(this).find('h4').html(name+' x'+times+' <span'+(ratio == max_ratio?' class="good"':'')+'>('+ratio+')</span> Gaining: <span'+(max_exp == total_exp?' class="good"':'')+'>'+total_exp+'exp '+(total_exp > exp_need?'<span class="energy_highlight">(level!)</span>':'')+'</span> Left: <span'+(min_left == left?' class="good"':'')+'>'+left+'</span>')
			}
		});
	}

	function calculate_cuba_jobs() {
		var user_max_energy = parseInt(User.energy);
		var exp_need = parseInt(User.exp_to_next_level);
		var max_exp = 0;
		var max_ratio = 0;
		var min_left = 99999;

		$('tr[id^="city_job_"]').each(function() {
			var energy = $(this).find('span.energy').text();
			var exp = $(this).find('span.experience').text();
			var ratio = parseFloat(exp/energy).toFixed(2);
			var times = parseInt(user_max_energy / energy);
			var left = parseInt(user_max_energy % energy);
			var total_exp = parseInt(times * exp);
			if (total_exp > max_exp) {
				max_exp = total_exp;
			}
			if (ratio > max_ratio) {
				max_ratio = ratio;
			}
			if (left < min_left) {
				min_left = left;
			}
		});

		$('tr[id^="city_job_"]').each(function() {
			var energy = $(this).find('span.energy').text();
			var exp = $(this).find('span.experience').text();
			var ratio = parseFloat(exp/energy).toFixed(2);
			var times = parseInt(user_max_energy / energy);
			var left = parseInt(user_max_energy % energy);
			var total_exp = parseInt(times * exp);
			$(this).find('span.job_loot_chance').html(' x'+times+' <span'+(ratio == max_ratio?' class="good"':'')+'>('+ratio+')</span><br /><span'+(max_exp == total_exp?' class="good"':'')+'>'+total_exp+'exp '+(total_exp > exp_need?'<span class="energy_highlight">(level!)</span>':'')+'</span>')
		});
	}

	function stats_update() {
		var d, d2, d3;
		var energy_ratio = parseFloat(User.exp_to_next_level/User.energy);
		var stamina_ratio = parseFloat(User.exp_to_next_level/User.stamina);
		var combined_ratio = parseFloat(User.exp_to_next_level/(User.energy+User.stamina));
		Math.abs(energy_ratio) < 10 ? (d = 2) : (d = 0);
		Math.abs(stamina_ratio) < 10 ? (d2 = 2) :(d2 = 0);
		Math.abs(combined_ratio) < 10 ? (d3 = 2) : (d3 = 0);
		if (energy_ratio == 'Infinity') { energy_ratio = 0; d = 0; }
		if (stamina_ratio == 'Infinity') { stamina_ratio = 0; d2 = 0; }
		if (combined_ratio == 'Infinity') { combined_ratio = 0; d3 = 0; }
		$('#'+spocklet+'_ratios').html('<span id="'+spocklet+'_stats_update" style="cursor:pointer;" alt="Click to update" title="Click to update">Exp Need</span>: <span class="energy_highlight">'+User.exp_to_next_level+'</span> (<span class="energy_highlight">'+(energy_ratio).toFixed(d)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif" width="12" height="12" title="Exp needed per Energy">)(<span class="energy_highlight">'+(stamina_ratio).toFixed(d2)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="12" height="12" title="Exp needed per Stamina">) <span class="more_in">'+(combined_ratio).toFixed(d3)+'</span>');

		var city = $('#mw_city_wrapper').attr('class').substr(7);
		var page = User.page;
		if ((city == 7 || city == 8) && page == 'job') {
			calculate_brazil_jobs();
		}
		if (city == 2 && page == 'job') {
			calculate_cuba_jobs();
		}
	}

	function saveConfig(){
		window.localStorage.setItem(spocklet+'_config_'+User.trackId,JSON.stringify(config));
	}

	function loadConfig(){
		try {
			var cookie=window.localStorage.getItem(spocklet+'_config_'+User.trackId);
			if (cookie) {
				var newconfig=JSON.parse(cookie);
				config=newconfig;
			}
		} catch(ignore) {}
	}
	loadConfig();

	function showConfigItems(){
		var i,j,htmlact='<table width="100%"><tr><th>Spocklet</th><!--th>Link</th><th>Page</th--><th>Actions</th></tr>',
			htmlown=htmllib=htmlin=htmlact, htmlbuttons='',htmlincount=0,htmlowncount=0,htmllibcount=0, sorted=[];
		var changes={}, firstRunAfterUpdate=false;
		htmlbuttons=
		'<a href="#" id="'+spocklet+'_cfgadditem" class="sexy_button_new green short" title="Add new Spocklet" alt="Add new Spocklet"><span><span>Add new Spocklet</span></span></a> &nbsp; '+
		'<a href="#" id="'+spocklet+'_cfgaddjson" class="sexy_button_new green short" title="Import Spocklet from code" alt="Import Spocklet from code"><span><span>Import Spocklet from code</span></span></a>';

		for(var i=0;i<scripts.length;i++){
			sorted.push(i);
		}
		sorted.sort(function(a,b){
			if (scripts[a].name>scripts[b].name) {
				return 1;
			} else if (scripts[a].name<scripts[b].name) {
				return -1;
			} else {
				return 0;
			}
		});

		for(j=0;j<sorted.length;j++){
			i=sorted[j];
			var changed="";
			if(firstRunAfterUpdate){
				if(changes.added[i]){
					changed=' <img alt="new!" src="'+newimg+'" /> ';
				} else if(changes.changed[i]){
					changed=" (changed) ";
				}

			}
			var name = scripts[i].name;
			var s='<tr><td style="padding: 2px; border-bottom: 1px solid #999; background-color:'+(!config.inactive[i]?'green':'')+'"><a href="#" alt="'+name+'" title="'+name+'" class="'+spocklet+'_cfgitem" cfgid="'+i+'"><span><span style="color: '+(!config.inactive[i]?'#FFF':'')+'">'+changed+name+'</span></span></a></td>'+
			'<!--td style="border-bottom: 1px solid #999;"><span title="'+scripts[i].src+'">script</span></td>'+
			'<td style="border-bottom: 1px solid #999;">'+scripts[i].page+'</td-->'+
			'<td style="border-bottom: 1px solid #999;"></td>'+
			'</tr>';
			htmlin+=s;htmlincount++;
		}

		for(i=0;i<config.own.length;i++) {
			var name=config.own[i].name;
			var s='<tr><td style="padding: 2px; border-bottom: 1px solid #999; background-color:'+(config.own[i].active?'green':'')+'"><a href="#" alt="'+name+'" title="'+name+'" class="'+spocklet+'_cfgitem2" cfgid="'+i+'"><span><span style="color: '+(config.own[i].active?'#FFF':'')+'">'+name+'</span></span></a></td>'+
			'<!--td style="border-bottom: 1px solid #999;"><span title="'+config.own[i].src+'">script</span></td>'+
			'<td style="border-bottom: 1px solid #999;">'+config.own[i].page+'</td-->'+
			'<td style="border-bottom: 1px solid #999;">'+
			'&nbsp;<a href="#" class="'+spocklet+'_cfgitemdel" cfgid="'+i+'" title="delete item"><img src="http://mwfb.static.zgncdn.com/mwfb/graphics/empire/icon_X_close_small.png" /></a>'+
			'&nbsp;<a href="#" class="'+spocklet+'_cfgitemexp" cfgid="'+i+'" title="export item"><img src="'+exportimg+'" /></a>'+
			'&nbsp;<a href="#" class="'+spocklet+'_cfgitemexp2" cfgid="'+i+'" title="export item to fanpage"><img src="'+exportimg2+'" /></a> '+
			'</td></tr>';

			htmlown+=s;htmlowncount++;

		}
		htmlin+='</table><br />';
		htmlown+='</table><br />';
		htmllib+='</table><br />';

		$('#'+spocklet+'_listinactive').html(htmlin);
		$('#'+spocklet+'_listown').html(htmlown+htmlbuttons);
		//$('#'+spocklet+'_listlib').html('(Loading...)');
		$('#'+spocklet+'_tab1count').html(htmlincount);
		$('#'+spocklet+'_tab2count').html(htmlowncount);
		//$('#'+spocklet+'_tab3count').html(htmllibcount);

		$('#'+spocklet+'_listtabs').tabs();

		$('#'+spocklet+'_cfgbank').attr('checked',config.settings.bank?'checked':'');
		$('#'+spocklet+'_cfgheal').attr('checked',config.settings.heal?'checked':'');

		$('.'+spocklet+'_cfgitemdel').click(function(){
			var i=parseInt($(this).attr("cfgid"));
			config.own.splice(i,1);
			saveConfig();
			showConfigItems();
			write_scripts();
			return false;
		});
		$('.'+spocklet+'_cfgitemexp').click(function(){
			var i=$(this).attr("cfgid");
			FB.ui({
				method: 'feed',
				name: 'Import this to your Spockholm Toolbar: '+config.own[i].name,
				link: 'http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php',
				picture: toolbar_logo,
				description: btoa(JSON.stringify(config.own[i]))
			});
		});
		$('.'+spocklet+'_cfgitemexp2').click(function(){
			var i=$(this).attr("cfgid");
			FB.ui({
				method: 'send',
				name: 'Import this to your Spockholm Toolbar: '+config.own[i].name,
				link: 'http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php',
				picture: toolbar_logo,
				description: btoa(JSON.stringify(config.own[i])),
				to: '173236399415354'
			});
		});
		$('.'+spocklet+'_cfgitem').click(function(){
			var i=$(this).attr("cfgid");
			if (config.inactive[i]) {
				delete config.inactive[i];
				saveConfig();
				showConfigItems();
				write_scripts();
			} else {
				config.inactive[i]=true;
				saveConfig();
				showConfigItems();
				write_scripts();
			}
			return false;
		});
		$('.'+spocklet+'_cfgitem2').click(function(){
			var i=$(this).attr("cfgid");
			config.own[i].active=!config.own[i].active;
			saveConfig();
			showConfigItems();
			write_scripts();
			return false;
		});

		$('#'+spocklet+'_cfgadditem').click(function(){
			var name=prompt('Please enter the name of the spocklet.');
			var src=prompt('Please enter the URL of the spocklet. Hint: Should begin with "http://" and end with ".js".');
			if (src && name) {
				config.own.push({ name:name, src:src, page:'', active:true});
				saveConfig();
				showConfigItems();
				write_scripts();
			}
		});

		$('#'+spocklet+'_cfgaddjson').click(function(){
			var code,json=prompt("Please paste the code");
			json=json.replace(/[^a-zA-Z0-9\=\/\+\-\_]/g,'');
			try {
				code=JSON.parse(atob(json));
			} catch(e) { code=null; }
			if(code && code.name && code.src){
				config.own.push(code);
				saveConfig();
				showConfigItems();
				write_scripts();
			} else {
				alert("Error occured. Maybe code was wrong!");
			}

		});
		$("#"+spocklet+"_config").show();
	}

	function isFramed(){
		try {
			if (parent.window.location.href) {
				return false;
			}
		} catch(e) {
			return true;
		}
	}
	$('head').append('<link media="all" type="text/css" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.14/themes/ui-darkness/jquery-ui.css" rel="stylesheet">');

	$('#spockholm_toolbar').html(
		'<div id="'+spocklet+'_header" style="display:inline; padding-left: 5px; padding-right: 5px;"><a href="http://www.facebook.com/mafiatools/" target="_blank" class="sexy_button_new short white" title="'+version+' - Click to visit Fan Page" alt="'+version+' - Click to visit Fan Page" style="margin-top:3px;"><span><span><img src="'+toolbar_logo+'" width="18" height="16" /></span></span></a></div>'+
			'&nbsp;<div id="'+spocklet+'_spocklets_header" style="display:inline; width: 150px; padding-right: 5px;"><a href="#" class="sexy_button_new short black" title="Click to show/hide Spocklets" alt="Click to show/hide	Spocklets"><span><span style="background: url(http://mwfb.static.zgncdn.com/mwfb/graphics/dropdown_travel_arrow.gif) no-repeat scroll right 50%; margin-right: 15px;">SPOCKLETS</span></span></a>'+
			'<div id="'+spocklet+'_spocklets_menu" style="display:none; z-index:999; background-color: #333; position: absolute; left:60px;"></div>'+
		'</div>'+
		'<div style="float:right;">'+
			'<div style="display:inline;"><input class="ui-widget" size=13 style="border: 1px solid #888888; -moz-border-radius: 3px; border-radius: 3px; -webkit-border-radius: 2px;padding 0;background: #000; margin-top:2px; color: #FFF;" id="'+spocklet+'_search"></div> &nbsp;'+
			'&nbsp;<div id="'+spocklet+'_ratios" style="display:inline; border-right: 1px solid #000; padding-right: 5px;"></div>'+
			'&nbsp;<div style="display:inline;"><a href="http://www.spockholm.com/mafia/donate.php?toolbar" id="'+spocklet+'_donate" class="sexy_button_new short black" target="_blank" title="Support Team Spockholm with a cup of Coffee" alt="Support Team Spockholm with a cup of Coffee"><span><span><span class="cash"></span></span></span></a></div>'+
//			'&nbsp;<div style="display:inline; padding-right: 5px; clear:both;"><a href="#" id="'+spocklet+'_framemode" class="sexy_button_new short black" title="Toggle frame mode" alt="Toggle frame mode"><span><span><img src="http://spocklet.com/bookmarklet/'+(isFramed()?'uf.png':'frame.png')+'" /></span></span></a></div>'+
			'&nbsp;<div style="display:inline; padding-right: 5px; clear:both;"><a href="#" id="'+spocklet+'_config_toggle" class="sexy_button_new short black" title="Click to open Config" alt="Click to open Config"><span><span><img src="http://mwfb.static.zgncdn.com/mwfb/graphics/v3/icon_hammer_wrench.png" /></span></span></a></div>'+
		'</div>'+
		'<div id="'+spocklet+'_config" style="z-index:1001; display:none; position: absolute; top: -40px; left: 0px;">'+
		'	<div style="display: block; left: 40px;" class="pop_box" id=""><h3 style="text-align:center;cursor:move;">Spockholm Toolbar Config</h3><a class="pop_close" id="'+spocklet+'_cfgclose" href="#"></a>'+
		'		<div style="padding: 15px 15px 0px 15px;">'+
		'		<table><tr><td valign="top">'+
		'		<h4>Display options</h4>'+
		'		<nobr><label><input type="checkbox" id="'+spocklet+'_cfgheal" checked /> Enable 1-click healing</nobr></label><br />'+
		//'		<nobr><label><input type="checkbox" id="'+spocklet+'_cfgbank" /> Enable 1-click banking (experimental)</nobr></label><br />'+
		'		'+
		'		</td><td valign="top">'+
		'		<h4>Short FAQ</h4><ul>'+
		'		<li><span style="cursor:pointer;" onclick="$(\'#spfaq1\').toggle();"><u>Where can I find the healing button?</u></span><br />'+
		'		<span id="spfaq1" style="display:none;">Click on the heart-icon next to the "Health" stats. It will blink on success.</span></li>'+
//		'		<li><span style="cursor:pointer;" onclick="$(\'#spfaq2\').toggle();"><u>Where can I find the banking button?</u></span><br />'+
//		'		<span id="spfaq2" style="display:none;">Click on the money-icon next to the "Bank" stats. It will blink on success.</span></li>'+
		'		<li><span style="cursor:pointer;" onclick="$(\'#spfaq5\').toggle();"><u>How can I contribute to the "Fan-Library"?</u></span><br />'+
		'		<span id="spfaq5" style="display:none;">Use the export icon <img src="'+exportimg2+'" /> to submit your item to the <a href="http://www.facebook.com/groups/173236399415354/" target="_blank">fan-group</a>. Provide a good description and then Team Spockholm will add it to the library.</span></li>'+
		'		</ul></td></tr></table>'+
		'		<h4>Configure your Spocklets</h4>'+
		'		<div id="'+spocklet+'_listtabs"><ul><li><a href="#sptabs1">Standard Spocklets (<span id="'+spocklet+'_tab1count"></span>)</a></li>'+
		'		<li><a href="#sptabs2">Own Spocklets (<span id="'+spocklet+'_tab2count"></span>)</a></li>'+
//		'		<li><a href="#sptabs3">Fan-Library (<span id="'+spocklet+'_tab3count"></span>)</a></li>'+
		'		</ul>'+
		'		<div id="sptabs1">'+
		'		<div id="'+spocklet+'_listinactive" class="'+spocklet+'_list">'+
		'		</div>'+
		'		</div>'+
		'		<div id="sptabs2">'+
		'		<div id="'+spocklet+'_listown" class="'+spocklet+'_list">'+
		'		</div>'+
		'		</div>'+
		'		</div>'+
		'		<br />'+
		'		</div>'+
		'	</div>'+
		'</div>'
	);

	$('#spockholm_toolbar').css({
		'background-color': '#333',
		'z-index': '1000',
		'display': 'block',
		'color': '#FFF',
		'height':'30px',
		'margin-top': '2px',
		'margin-bottom': '5px',
		'background-image': 'url("http://mwfb.static.zgncdn.com/mwfb/graphics/map_based_jobs/expert_view/expertview_nav_mid.gif")',
		'border-color': '#000000'
	});

	$('#'+spocklet+'_cfgheal,#'+spocklet+'_cfgbank').click(function(){
		config.settings.bank=($('#'+spocklet+'_cfgbank:checked').length>0);
		config.settings.heal=($('#'+spocklet+'_cfgheal:checked').length>0);
		saveConfig();
	});

	$("#"+spocklet+'_config').draggable({ handle: "h3" });
	$("#"+spocklet+'_config').disableSelection();

	$('#'+spocklet+'_config_toggle').click(function(){
		if ($('#'+spocklet+'_config').css('display') == 'none') {
			showConfigItems();
			$('#'+spocklet+'_config_toggle').removeClass('black').addClass('green');
		}
		else {
			$('#'+spocklet+'_config').hide();
			$('#'+spocklet+'_config_toggle').removeClass('green').addClass('black');
		}
		return false;
	});

	$('#'+spocklet+'_framemode').click(function(){
		if (isFramed()) {
			alert(1);
			window.location.href='http://facebook.mafiawars.zynga.com/mwfb/index.php?skip_req_frame=1&mwcom=1';
		} else {
			alert(2);
			window.location.href='http://apps.facebook.com/inthemafia/';
		}
	});

	$('#'+spocklet+'_cfgclose').click(function(){
		//$("#"+spocklet+"_config").hide();
		$('#'+spocklet+'_config_toggle').trigger('click');
		return false;
	});

	$('h4.health').click(function(){
		if (config.settings.heal) {
			$(this).css('color','gray');
			User.clicks++;
			var params = {
				'ajax': 1,
				'sf_xw_user_id': User.id,
				'sf_xw_sig': local_xw_sig,
				'liteload': 1,
				'cb': User.id+parseInt(new Date().getTime().toString().substring(0, 10)),
				'xw_client_id': 8,
				'xw_city': 1,
				'xcity': 1,
				'xw_person': User.id.substr(2),
				'clicks': User.clicks
			};
			$.ajax({
				type: "POST",
				url: preurl+'?xw_controller=hospital&xw_action=heal',
				data: params,
				success: function (response) {
					var o = jQuery.parseJSON(response.replace(/^(\s\d\s+)/,''));
					try {
						user_fields_update(o.user_fields);
						user_info_update(o.user_fields, o.user_info);
						if (/The doctor healed/.test(o.hospital_message)) {
							$('h4.health').css('color','white').effect('pulsate');
							//user_health
						} else {
	//						$("#spwm_heal").effect('explode');
						}
						} catch(ignoreerror) {
						}

				}
			});
		}
		return false;
	}).css('cursor','pointer');

	// $('.cash_stats').css('cursor','pointer').click(function(ui){
		// if (ui.offsetX<55) {
			// if (config.settings.bank) {
				// $('.bank_deposit a:first').trigger('click'); setTimeout(function(){depositAll($('#deposit_amount').val(), '');$('#stat_cash_cont h4').effect('pulsate');setTimeout(function(){$('.pop_box:contains("The Bank") a.pop_close').trigger('click');},1000) },1000); // lame 1-click-banking
				// return false;
			// }
		// }
	// });

	$('#'+spocklet+'_stats_update').click(function() {
		stats_update();
	});
	$('body').ajaxComplete(function(e,xhr,settings) {
		var city = $('#mw_city_wrapper').attr('class').substr(7);
		var page = User.page;
		$('#'+spocklet+'_log').html(page+' '+city);
		setTimeout(remove_pop_bg,1000);
		if (page == 'clan') {
			write_family_id();
		}
		stats_update();
		$('#travel_menu a:last').attr('title','Open Mafia Wars 2 in new window');
	});

	write_scripts();
	stats_update();
	setTimeout(remove_zynga_banners, 2500);
	travelToMwTwo = function travelToMwTwo() {
		MW.Track.count("action", "city_travel", "to_mw2");
		window.open("//apps.facebook.com/mafiawars-two/?src=xpromo&aff=mafiawars&crt=launch_r1");
	}
	
})()