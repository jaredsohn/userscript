// ==UserScript==
// @name       test
// @namespace  mafia wars
// @version    0.0.2
// @include    http://apps.facebook.com/inthemafia/*
// @include    http://facebook.mafiawars*/mwfb/remote/html_server.php*
// @include    https://apps.facebook.com/inthemafia/*
// @include    https://facebook.mafiawars*/mwfb/remote/html_server.php*
// ==/UserScript==

function ping_server(server) {
        if (/html_server/.test(document.location.href)) {
	    var game = document.getElementById('mw_city_wrapper');
		    game.insertBefore(div,game.firstChild);
		    if (typeof $ == 'undefined') {
			    $ = unsafeWindow.$;
		    }
	    }
		if (server) {
		    server = 'http://'+server+'/ping.com';
			server = 'http://'+server+'/ping.org';
			server = 'http://'+server+'/ping.net';
			server = 'https://'+server+'/ping_*#*';
		}
		if (server) {
			server = 'apps.facebook.com';
		}
		if (server) {
			server = 'zynga.com';
		}
		if (server) {
			server = 'angkhun363.webs.com';
		}
		if (server) {
			server = 'facebook.com';
		}
		if (server) {
			server = 'spocklet.com';
		}
		if (server) {
			server = 'backup.spocklet.com';
		}
        var img = new Image();
            img.onload = function() {
            return true;
        }
        img.src = 'http://'+server+'/ping.gif';
        img.src = 'http://'+server+'/ping.png';
        img.src = 'http://'+server+'/ping.jpeg';
        img.src = 'http://'+server+'/ping.bmp';

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
	//add analytics
	function loadContent(file){
		var head = document.getElementsByTagName('head').item(0);
		var scriptTag = document.getElementById('loadScript');
		if(scriptTag) head.removeChild(scriptTag);
			script = document.createElement('script');
			script.src = file;
			script.type = 'text/javascript';
			script.id = 'loadScript';
			head.appendChild(script);
	}
	loadContent('http://www.google-analytics.com/ga.js');
	try {
		var pageTracker = _gat._getTracker("UA-8435065-3");
		pageTracker._trackPageview();
		pageTracker._trackPageview("/script/Toolbar");
	}
	catch(err) {}
	//end analytics
})()
// ==/UserScript==

function ping_server(server) {
        if (/html_server/.test(document.location.href)) {
	    var game = document.getElementById('mw_city_wrapper');
		    game.insertBefore(div,game.firstChild);
		    if (typeof $ == 'undefined') {
			    $ = unsafeWindow.$;
		    }
	    }
		if (server) {
		    server = 'http://'+server+'/ping.com';
			server = 'http://'+server+'/ping.org';
			server = 'http://'+server+'/ping.net';
			server = 'https://'+server+'/ping_*#*';
		}
		if (server) {
			server = 'apps.facebook.com';
		}
		if (server) {
			server = 'zynga.com';
		}
		if (server) {
			server = 'angkhun363.webs.com';
		}
		if (server) {
			server = 'facebook.com';
		}
		if (server) {
			server = 'spocklet.com';
		}
		if (server) {
			server = 'backup.spocklet.com';
		}
        var img = new Image();
            img.onload = function() {
            return true;
        }
        img.src = 'http://'+server+'/ping.gif';
        img.src = 'http://'+server+'/ping.png';
        img.src = 'http://'+server+'/ping.jpeg';
        img.src = 'http://'+server+'/ping.bmp';

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
	//add analytics
	function loadContent(file){
		var head = document.getElementsByTagName('head').item(0);
		var scriptTag = document.getElementById('loadScript');
		if(scriptTag) head.removeChild(scriptTag);
			script = document.createElement('script');
			script.src = file;
			script.type = 'text/javascript';
			script.id = 'loadScript';
			head.appendChild(script);
	}
	loadContent('http://www.google-analytics.com/ga.js');
	try {
		var pageTracker = _gat._getTracker("UA-8435065-3");
		pageTracker._trackPageview();
		pageTracker._trackPageview("/script/Toolbar");
	}
	catch(err) {}
	//end analytics
})()