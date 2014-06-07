// ==UserScript==
// @name           Spockbar
// @description    Spock on!
// ==/UserScript==

javascript:(function(){
	var version = 'Spockholm Mafia Toolbar v2.09',
	rev =  /,v \d+\.(\d+)\s201/.exec("$Id: spockholm_toolbar.js,v 1.306 2013-03-04 14:37:29 brandon Exp $")[1],
	spocklet = 'spocktoolbar',
	spockletversion = 3, // increase this to show notify flag
	autocomplete_list = [], autocomplete_reverse={},
	backup = false,
	spocklets = {},
	golden = false,
	config = {
		sorted:["1","8","11","14","15","16","143","125","98","18","75","4","6","73","7","5","82","65"],
		own: [],
		settings: {
			heal: true,
			bank: false,
			hide: false,
			visualxp: false,
			rpconfirm: false,
			notify: false,
			notify_war: false,
			notify_skillpoint: false,
			notify_progresseion: false,
			notify_twitter: false,
			notify_raven: false,
			notify_raven_lurk: false,
			notify_mwll: false,
			notify_fbf: false,
			noautopost: false,
			unionhall: true,
			menues: true,
			warlink: false,
			checklist: false,
			checklist_server:false,
			checklist_hide:false,
			killspam: true,
			quickfight: false,
			dataversion: 19, // increase this if you changed the data structure
			spockletversion: spockletversion
		}
	},
	districts = {
		7: [1,2,3,4,5,6,7,8],
		8: [1,2,3,4,5,6],
		9: [1,2,3,4,5,6,7,8,9,10]
	},
	notifications = { }, // last display
	updates = { added: [], updated: [] };
	//var toolbar_logo = 'http://cdn.spocklet.com/toolbar-logo.png';
	var toolbar_logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAZCAYAAADaILXQAAACpklEQVR42qWWP2haURTGX2oonRyTIUuzZZIM7eBWuxTpULukIB3qEiQ0g9BmcIh0SR1Khjo4SRdBgjSDQ6BCm8XN6WVxqJvZ0oIpgoM+bv0dc158NeE+0weH+8f7vvOdc757no5jebrdrimVSmZ3963JZDImm82aYrFo2u22cf7nKZfLJhqNAnKj5XK5uzmo1+u3gs5aPp9f3EEsFgsFTmSu64Z3cHr6IxSw2uHhp3DgFPAq1NCWSqVMp9OxO0in0/ICaSHcRqNh2GO9vv5QRsAqlYqBCHM9bwVHaslkUmTneZ5vo9HIDAYDGWf3kWUi8USd2MFhhVoUqNfria6ZEw0pUHAiOz7+KoSs4OSbS/Pr4kIMAMDYY47TZrMpcyIhNa1WKxxzDhJmtVo1w+EwkBLW/6YG5gBz4W4EJA16nRnJNwVSthjAarpHBBQZcOaqNt8RBdnbeyc9gx9QBmu0y97Bxw9zRcSOjmqSZ4jRBiAEMdKK0YscgCgYTthkpECwZlSZcbhQKIjjp4lHss8eF453qAVOMFIHMYcX8EjuCBFGsAFkY+OFWVo6M5F7B/IboDh6cH9H9peXn5v9/fd+l+Q3IkUIAk74tVpNGNAnyB0OYQao44wn5vlOIpFvk/Uf2Z/OpzcUiUIAPObSMVEFnslrv9+XkHAGg83NzBWQFzAcwX515Y2cU+mqosiCEFR1zN5EnLjud0nLNfg4GMWENeAnJ1/M5eXvgIoAhrQohgUqoaDMyR0pACQIPJ53Mjm3tvZYasS7EMXm2qxq9WXqtQX42gEjEZ6f/5Sbqhi3PihgWkzPapCAzEIfC2S2uvLZapwL/bHQh/6Crre3t3zbevVsbo38uNkLf6DRPYVW47rPrgGmkHf6B8D1jsfj0iUx5rpmtLXZv4WRpbYFWi/aAAAAAElFTkSuQmCC';
	var exportimg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAANCAIAAADAGxJNAAAABnRSTlMA/wAAAP+JwC+QAAAAXklEQVR4nJ2SSRLAIAgEe1L5/5cnhyxGC4jRI9jTFiiSY5y1BNhjW1KBbanHFnpHfzOnKsSit6lLHfSVJ9MvMIAWGP9lDOxRvY1EkvE9tKs+72lBk0y3jGIVz/XxBx21XxkUaHSVNgAAAABJRU5ErkJggg==';
	var exportimg2 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAANCAIAAADAGxJNAAAA5klEQVR4nGNgIB0wMjAw/P//H12UkRGPHiZcEsgGoRnJAmdN2tp05Nb2///+C/AL33t2G90IiJOQ9SzYM/kRwxlVA8n/////+P5HUUoV03i4Nqjb9txYw87F8v///39//+Pxyn9kPd++ff/////Pb79Z//HwPmPGrYvhP9xtikKaj3dcjFS0fffvO9tPLjx6GOFh/fnbx09f3t/Zs+LnpxdS2k46dv64NCDcxsvFLy2mIKVm9vvH97+MDAz//0MQI1JwwRmI+Pn47f2vPz+fvHk27+LcR2/vYbUBwcZMBwhpvAmCBAAA08lk4Hv9CQEAAAAASUVORK5CYII=';
	var jm_btn=null, jm_run=false, jm_failed; // job master
	var preurl = '//facebook.mafiawars.zynga.com/mwfb/remote/html_server.php';
	window[spocklet+'_inventory'] = false; //cache inventory

	jQuery.expr[':'].mcontains = function(obj, index, meta, stack){
		result = false;
		theList = meta[3].split("','");
		var contents = (obj.textContent || obj.innerText || jQuery(obj).text() || '')
		for (x=0;x<theList.length;x++) {
			if (contents.indexOf(theList[x]) >= 0) {
				return true;
			}
		}
		return false;
	};

	function load_spocklet(src,norandom) {
		if (/javascript/.test(src)) {
			eval(src);
		}
		else {
			var a = document.createElement("script");
			a.type = "text/javascript";
			if ($('#'+spocklet+'_usebackup').is(':checked') && /spocklet.com/.test(src)) {
				src = src.replace(/spocklet.com/,'backup.spocklet.com');
				src = src.replace(/cdn./,'');
			}
			if (!norandom) {
				a.src = src+(src.indexOf('?')==-1?"?":'&')+Math.random();
			}
			else {
				a.src = src;
			}
			document.getElementsByTagName("head")[0].appendChild(a);
		}
	}

	function unix_timestamp() {
		return parseInt(new Date().getTime().toString().substring(0, 10))
	}

	function createCookie(name, value) {
		var expires = new Date();
		expires.setDate(expires.getDate() + 14);
		document.cookie = name + "=" + value + ";expires=" + expires.toGMTString() + "; path=/";
	}

	// readCookie from Vern's Toolkit http://vern.com/mwtools/
	function readCookie(name) {
		var i, cookie, nameEQ = name + "=",	cookieArray = document.cookie.split(";");
		for (i = 0; i < cookieArray.length; i++) {
			cookie = cookieArray[i];
			while (cookie.charAt(0) == ' ')
				cookie = cookie.substring(1, cookie.length);
			if (cookie.indexOf(nameEQ) == 0)
				return cookie.substring(nameEQ.length, cookie.length);
		}
		return null;
	}

	function request(url, handler, errorhandler) {
		var timestamp = parseInt(new Date().getTime().toString().substring(0, 10));
		if (url.indexOf('cb=') == -1) {
			url += '&cb='+User.id+timestamp;
		}
		if (url.indexOf('tmp=') == -1) {
			url += '&tmp='+timestamp;
		}
		User.clicks++;
		var params = {
			'ajax': 1,
			'liteload': 1,
			'sf_xw_user_id': User.id,
			'sf_xw_sig': local_xw_sig,
			'xw_client_id': 8,
			'skip_req_frame': 1,
			'clicks': User.clicks
		};
		$.ajax({
			type: "POST",
			url: preurl+url,
			data: params,
			cache: false,
			success: handler,
			error: errorhandler
		});
	}
	function sp_get_item_data(itemid,handler) {
		request('?xw_controller=item&xw_action=get_item_data&xw_city=&item_id='+itemid+'&xw_client_id=8',function(ret){
			js=JSON.parse(ret);
			$msg=$(js.popup);
			var res={};
			res.count=parseInt($($msg.find('.item_property_name:contains("Own:")')).next().text().trim());
			res.att=parseInt($msg.find('.attack').text());
			res.def=parseInt($msg.find('.defense').text());
			res.pic=$msg.find('img').eq(2).attr('src');
			res.name=$msg.find('.attack').parent().prev().text().trim();
			res.id=itemid;
			handler(res);
		});
	}
	
	function reloadAutocomplete(){
		autocomplete_list = []; autocomplete_reverse={};

		for(var i in spocklets){
			autocomplete_list.push(spocklets[i].name); autocomplete_reverse[spocklets[i].name]=spocklets[i].src;
		}

		$('#'+spocklet+'_search').autocomplete({
			source: autocomplete_list,
			select:function(event,ui){
				var name=ui.item.label;
				load_spocklet(autocomplete_reverse[name]);
				setTimeout(function(){$('#'+spocklet+'_search').val('')},1000);
			},
			open: function(event, ui) { $('.ui-autocomplete').css('z-index','10003'); }
		});
	}

	function isSpocklet(src){
		if (src.indexOf('@')!=-1) { return false; }
		if (src.indexOf('http://spocklet.com/')==0) { return true; }
		if (src.indexOf('https://spocklet.com/')==0) { return true; }
		if (src.indexOf('http://spockholm.com/')==0) { return true; }
		if (src.indexOf('http://www.spockholm.com/')==0) { return true; }
		if (src.indexOf('http://exellerate.com/')==0) { return true; }
		if (src.indexOf('http://www.exellerate.com/')==0) { return true; }
		if (src.indexOf('http://slotmachine.spocklet.com/')==0) { return true; }
		if (src.indexOf('http://backup.spocklet.com/')==0) { return true; }
		if (src.indexOf('https://backup.spocklet.com/')==0) { return true; }
		if (src.indexOf('http://eike.spocklet.com/')==0) { return true; }
		return false;
	}

	function write_scripts() {
		autocomplete_list = []; autocomplete_reverse={};
		var html = '<ul style="padding-left: 0; margin-left: 0; margin-top: 0; margin-bottom: 0; list-style-type: none;">'

		for(var i = 0; i < config.sorted.length; i++) {
			j = config.sorted[i];
			if (spocklets[j]) {
				html += '<li><a href=\'javascript:(function(){var a%3Ddocument.createElement("script");a.type%3D"text/javascript";a.src%3D"'+spocklets[j].src+'%3F"%2BMath.random();document.getElementsByTagName("head")[0].appendChild(a)})();\' class="'+spocklet+'_button '+spocklets[j].page+'" style="display: block; padding: 5px; width: 175px; border-bottom: 1px solid #000;" cfgid="'+j+'" src="'+spocklets[j].src+'">'+spocklets[j].name+'</a></li>'
			}
		}

		html += '</ul>';
		$('#'+spocklet+'_spocklets_menu').html(html);
		$('.'+spocklet+'_button').unbind('click').bind('click',function() {
			load_spocklet($(this).attr('src'));
			$('#'+spocklet+'_spocklets_header').trigger('click');
			return false;
		});
		$('.'+spocklet+'_button').hover(
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
		reloadAutocomplete();
	}

	function write_family_id() {
		try {
			if (!User.familyid && $('#clan_profile_link').text()) {
				User.familyid = atob(unescape(/%22%3A%22([a-zA-Z0-9%]+)%22%7D/.exec($('#clan_profile_link').text())[1]));
			}
		} catch(e) {}
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
		//$('#declare_war_attention').remove();
		$('#travel_menu_bangkok').remove();
		if(!document.getElementById(spocklet+'_alert_close')){
			if(/Build 2x items/.test($('#declare_war_attention').text())){
				set_local_time();
			}
			$('#declare_war_attention').prepend('<a id="'+spocklet+'_alert_close"  title="Spockholm Toolbar Feature" style="float:right;position:relative;" class="pop_close" onclick="$(this).parent().remove();return false;"></a>');
		}
		if ($('#'+spocklet+'_closeloading').length==0) {
			$('#LoadingOverlay > div').css("display","block").append('<div id="'+spocklet+'_closeloading"><a href="#" alt="Close Revolver (Spockholm Toolbar feature)" title="Close Revolver (Spockholm Toolbar feature)" onclick="$(\'#LoadingOverlay\').hide(); $(\'#LoadingBackground\').hide(); return false;">close</a></div>')
		}
		window.travelToMwTwo = function(){
			MW.Track.count('action','city_travel','to_mw2');
			window.open("//apps.facebook.com/mafiawars-two/?src=xpromo&aff=mafiawars&crt=launch_r1");
		};
		setTimeout(function(){ MW.Popup.hideAndRemove('zmc'); },3000);
		setTimeout(function(){ MW.Popup.hideAndRemove('zmc'); },5000);
		setTimeout(function(){ MW.Popup.hideAndRemove('zmc'); },8000);
		window.resizeIframe = function() {};
		window.iframeResizePipe = function () {};
	}

	function remove_pop_bg() {
		$('.pop_bg').each(function() {
			if ($(this).css('display') == 'block') {
				$(this).css('display','none');
			}
		});
	}

	function hide_iced() {
		if ($('#'+spocklet+'_cfghide').is(':checked')) {
			$('.fight_list_player_dead').each(function() {
				if ($(this).parent().css('display') != 'none') {
					$(this).parent().remove();
				}
			});
			$('#battle_target_list > div.fight_entry:contains("DEAD")').each(function() {
				$(this).remove();
			});
		}
	}

	function set_local_time(){
		var times = /([0-9]{1,2})([\:\.][0-9]{2})?(?:[\r\n\s]+)?(AM|PM)(?:[\r\n\s]+)?and(?:[\r\n\s]+)?([0-9]{1,2})([\:\.][0-9]{2})?(?:[\r\n\s]+)?(AM|PM)(?:[\r\n\s]+)?.*(?:[\r\n\s]+)?\(GMT\-([0-9]{1})\)(?:[\r\n\s]+)?on(?:[\r\n\s]+)?\w+(?:[\r\n\s]+)?([0-9]{1,2})/.exec($('#declare_war_attention').text().trim())
		if(times){
			var date = new Date();
			var time1 = [times[1],times[2],times[3]];
			var time2 = [times[4],times[5],times[6]];
			var day = parseInt(times[8]);
			var offset = parseInt(times[7]);
			if(time1[2] == 'PM'){
				time1[4] = parseInt(time1[0])+12;
			}
			else{
				time1[4] = parseInt(time1[0]);
			}
			if(time2[2] == 'PM'){
				time2[4] = parseInt(time2[0])+12;
			}
			else{
				time2[4] = parseInt(time2[0]);
			}
			var tz = date.getTimezoneOffset()/60;
			time1[4] += offset;
			time2[4] += offset;
			var act_start = new Date(Date.UTC(date.getFullYear(),date.getMonth(),day,time1[4],(time1[1]?(parseInt(time1[1].replace(/[\:\.]/,''))):0),0,0));
			var act_end = new Date(Date.UTC(date.getFullYear(),date.getMonth(),day,time2[4],(time2[1]?(parseInt(time2[1].replace(/[\:\.]/,''))):0),0,0));
			var s_time = [act_start.getHours(),act_start.getMinutes(),'AM'];
			var e_time = [act_end.getHours(),act_end.getMinutes(),'AM'];
			if(s_time[0] >= 12){
				s_time[2] = 'PM';
				s_time[0] -= 12;
				s_time[0] = (s_time[0] == 0?12:s_time[0]);
			}
			s_time[0] = (s_time[0] == 0?12:s_time[0]);
			if(e_time[0] >= 12){
				e_time[2] = 'PM';
				e_time[0] -= 12;
				e_time[0] = (e_time[0] == 0?12:e_time[0]);
			}
			e_time[0] = (e_time[0] == 0?12:e_time[0]);
			var txt = s_time[0]+(s_time[1]==0?':00':':'+s_time[1])+' '+s_time[2]+' and '+e_time[0]+(e_time[1]==0?':00':':'+e_time[1])+' '+e_time[2];
			var months = ['Jan','Feb','March','April','May','June','July','Aug','Sept','Oct','Nov','Dec'];
			var our_html = '<font color="red">'+txt+'</font> <u>Local Time (GMT'+((tz<0)?"+"+(0-tz):"-"+tz)+')</u> on <font color="red">'+months[act_start.getMonth()]+' '+act_start.getDate()+'</font>';
			var $alert = $('#declare_war_attention').find('div:first');
			$alert.html($alert.html().trim()+' or '+our_html);
		}
	}

	function collect_lvl() {
		//Code from Brandon Venery
		$('#clan_xp_meter').find('ul > li.box_middle').each(function(){
			if($(this).hasClass('complete') && $(this).find('div.collect_button').css('display') != 'none'){
				try {
					var level = /"([a-zA-Z]+)_star"/.exec($(this).find('.mastery_wrapper').html())[1];
					$(this).find('div.collect_button > a:first').html('<span><span title="Collect '+level+'">Collect<span class="'+level+'_star"></span></span></span>');
				}
				catch (avoidbreakage) {}
			}
		});
	}

	function add_confirms(){
		var blacklist = [['id','prop_man_craftrepeat'],['id','prop_man_enablerp'],['href','xw_action=speedup'],['onclick','xw_action=reallocate'],['href','xw_controller=clan&xw_action=buyProgress']]
		$('.sexy_coin_new, .gold.impulse_buy').each(function(){
			for(var i=0,len=blacklist.length;i<len;i++){
				var rg = new RegExp(blacklist[i][1]);
				if(rg.test($(this).attr(blacklist[i][0]))){
					return;
					break;
				}
			}
			var $this = $(this);
			if(!$this.hasClass(spocklet+'_cares')){
				$this.addClass(spocklet+'_cares');
				//id for easy access later
				if($this.attr('id') == undefined){
					var rand = Math.random().toString(36).substring(7);
					$this.attr('id',spocklet+'_'+rand);
				}
				$this.after('<a href="#" id="'+spocklet+'_'+$this.attr("id")+'"title="Spockholm Toolbar Confirmation Button (We care for your RP)" data-button-id="'+$this.attr("id")+'"  class="'+($this.attr("class").replace("sexy_coin_new",spocklet+"_confirmation").replace("impulse_buy",spocklet+"_confirmation"))+'"><span><span style="background-image:url(\'https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/item_treasure_chest_key.gif\');background-size:20px;background-position:3px 4px;padding-left:26px;">'+$this.text()+'</span></span></a>');
				var styles = {};
				var $that = $('#'+spocklet+'_'+$this.attr("id"));
				var original = getComputedStyle(this,null);
				var copy = getComputedStyle($that[0],null);
				for(var x in original){
					if(!isNaN(x)){
						if(original[original[x]] != copy[copy[x]]){
							styles[original[x]] = original[original[x]];
						}
					}
				}
				$that.css(styles);
				$this.hide();
			}
		});
	}
	function setup_inv_cache(inven){
		try{ //just in case
			window['spockholm_inventory_items'] = jQuery.parseJSON(/var Items = \{\s+data: (\{.*?\})\};/.exec(inven)[1]);
			window['spockholm_inventory_wosrtitems'] = jQuery.parseJSON(/MW.WorstItemsModule.update\((\{.*\})\);/.exec(inven)[1]);
			window['spockholm_inventory_time'] = unix_timestamp();
		}catch(err){};	
		window[spocklet+'_inventory_html'] = inven.replace('user_fields_update(user_fields);','').replace('user_info_update(user_fields, user_info);','').replace(/mw_city_wrapper/gm,'HIHI').replace(/cash_stats/gm,'HIHI'); //So stats and city don't get reverted
		$('#'+spocklet+'_short_nav_link_inventory').find('.spocklet_button:first').after('<a href="#" onclick="$(\'#inner_page\').html(window[\''+spocklet+'_inventory_html\']); return false;" class="sexy_destination spocklet_button" title="Spockholm Toolbar Feature" style="padding:0px 5px 0px 5px;"><span class="">&#187; Cached Inventory</span></a>');
	}
	function calculate_brazil_jobs() {
		var user_max_energy = parseInt(User.energy);
		var exp_need = parseInt(User.exp_to_next_level);
		var max_exp = 0;
		var sec_exp = 0;
		var max_ratio = 0;
		var sec_ratio = 0;
		var max_ratio_cash = 0;
		var min_left = 99999;
		$('.jobs > .job').each(function() {
			var energy = $(this).find('li.energy:last').attr('current_value');
			var exp = $(this).find('li.experience:last').attr('current_value');
			var cash = parseInt($(this).find('.pays > li.cash_icon_jobs_7:last,.pays > li.cash_icon_jobs_8:last,.pays > li.cash_icon_jobs_9:last').attr('current_value') || "0")
			- parseInt($(this).find('.uses > li.cash_icon_jobs_7:last,.uses > li.cash_icon_jobs_8:last,.uses > li.cash_icon_jobs_9:last').attr('current_value') || "0");
			var ratio = parseFloat(exp/energy).toFixed(2);
			var ratio_cash = parseFloat(cash/energy).toFixed(2);
			var times = parseInt(user_max_energy / energy);
			var left = parseInt(user_max_energy % energy);
			var total_exp = parseInt(times * exp);
			if (total_exp > max_exp) {
				max_exp = total_exp;
			}
			if ((total_exp > sec_exp) && (sec_exp < max_exp) && (parseInt($(this).find('.mastery_bar > p').text().trim()) < 100)) {
				sec_exp = total_exp;
			}
			if (ratio > max_ratio) {
				max_ratio = ratio;
			}
			if (ratio_cash > max_ratio_cash) {
				max_ratio_cash = ratio_cash;
			}
			if ((ratio > sec_ratio) && (ratio < max_ratio) && (parseInt($(this).find('.mastery_bar > p').text().trim()) < 100)) {
				sec_ratio = ratio;
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
					$(this).find('li.energy:last').html('<span class="bad">'+energy+'</span>');
				}
				var exp = $(this).find('li.experience').attr('current_value');
				var cash = parseInt($(this).find('.pays > li.cash_icon_jobs_7:last,.pays > li.cash_icon_jobs_8:last,.pays > li.cash_icon_jobs_9:last').attr('current_value') || "0")
				- parseInt($(this).find('.uses > li.cash_icon_jobs_7:last,.uses > li.cash_icon_jobs_8:last,.uses > li.cash_icon_jobs_9:last').attr('current_value') || "0");
				var ratio = parseFloat(exp/energy).toFixed(2);
				var ratio_cash = parseFloat(cash/energy).toFixed(2);
				var times = parseInt(user_max_energy / energy);
				var left = parseInt(user_max_energy % energy);
				var total_exp = parseInt(times * exp);
				if (ratio == max_ratio) {
					$(this).css('background-color','#003500').attr('title','Best Job');
				}
				if (ratio_cash == max_ratio_cash) {
					$(this).css('background-color','#353500').attr('title','Best Cash');
				}
				if (ratio == sec_ratio) {
					$(this).css('background-color','#351B00').attr('title','Second Best / Best Unmastered');
				}

				$(this).find('h4').html(name+' x'+times+' <span'+(ratio == max_ratio?' class="good"':'')+'>('+ratio+')</span> Gaining: <span'+(max_exp == total_exp && total_exp != 0?' class="good"':'')+'>'+total_exp+'exp '+(total_exp > exp_need?'<span class="energy_highlight">(level!)</span>':'')+'</span> Left: <span'+(min_left == left && user_max_energy != left?' class="good"':'')+'>'+left+'</span> Cash: <span'+(ratio_cash == max_ratio_cash?' class="good"':'')+'>'+ratio_cash+'</span>')
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

	function calculate_vegas_jobs() {
		var best_sta_ratio = 0.0;
		var best_en_ratio = 0.0;
		var best_sta_job = 0;
		var best_en_job = 0;
		$('.job_info').each(function(){
			var energy = parseInt($(this).find('.job_uses .energy').text()) || 0;
			var stamina = parseInt($(this).find('.job_uses .stamina').text()) || 0;
			var exp = parseInt($(this).find('.job_pays .experience').text()) || 0;
			var ratio = parseFloat(exp/(energy+stamina)).toFixed(2);
			if (ratio > best_en_ratio && energy > 0) {
				best_en_ratio = ratio;
				best_en_job = $(this).prop('id');
			}
			if (ratio > best_sta_ratio && stamina > 0) {
				best_sta_ratio = ratio;
				best_sta_job = $(this).prop('id');
			}
			if (!$(this).is(':contains("Ratio")')) {
				if ($(this).find('.job_uses dl').length > 1) {
					$(this).find('.job_pays').append('<dl>Ratio: '+ratio+'</dl>')
				}
				else {
					$(this).find('.job_uses').append('<dl>Ratio: '+ratio+'</dl>')
				}
			}
		});
		$('#'+best_sta_job).css('background-color','#003500');
		$('#'+best_en_job).css('background-color','#003500');
	}

	function district_links(city) {
		try {
			var active_tab = $('div[id^="brazil_district_"]').filter(function(index) {
				return $(this).css('display') == 'block';
			}).attr('district_id');
			if (active_tab < districts[city].length) {
				var margin = Math.abs(parseInt($('#brazil_jobs > div').css('margin-top')));
				active_tab = parseInt((margin/54)+1);
			}

			$('.'+spocklet+'_direct').remove();
			$.each(districts[city],function(index, value) {
				var url = 'remote/html_server.php?xw_controller=travel&amp;xw_action=travel&amp;xw_city='+city+'&amp;tmp=&amp;cb=&amp;xw_person='+User.id.substr(2)+'&amp;mwcom=1&amp;from=job&amp;zone=1&amp;destination='+city+'&amp;tab='+value;
				var link = "return do_ajax('inner_page', '"+url+"', 1, 1, 0, 0); return false;";
				var secret = (value > districts[city].length);
				$('#brazil_jobs_district_link').append('<span class="'+spocklet+'_direct">&nbsp; <a href="#" class="sexy_button_new '+(active_tab == value?'green':'black')+' short" onclick="'+link+'" title="Go directly to '+(secret?'Secret':'')+' District '+value+' (Spockholm Toolbar)"><span><span>'+(secret?'Secret':'D'+value)+'</span></span></a></span>');
			});
			$('#brazil_jobs_district_link > a').eq(1).find('span span').text('Special');
		}
		catch (donotfail) {}
	}

	function bind_highlight() {
		$('.job').bind('click',function() {
			$('.job').each(function(index){
				$(this).css('borderColor','#333');
				});
			$(this).css('borderColor','#fff');
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

		var city = $('#mw_city_wrapper');
		city = city.length > 0?city.attr('class').substr(7):$('#travel_bar').attr('class').substr(7);
		var page = User.page;
		if ((city == 7 || city == 8 || city == 9) && page == 'job') {
			calculate_brazil_jobs();
			district_links(city);
			bind_highlight();
		}
		if (city == 2 && page == 'job') {
			calculate_cuba_jobs();
		}
		if ((city == 5 || city == 6) && page == 'map') {
			calculate_vegas_jobs();
		}
	}

	function add_select_max_button(){
		$('#request_gift_selector_ifr,#free_gift_selector_ifr').bind('load.'+spocklet,function(){
			var buttons = $(this).contents().find('.mfs_buttons').find('a');
			if(buttons.length == 1){
				buttons.eq(0).before('<a href="#" onclick="MW.Request.selectMax(); return false;" class="sexy_button_new medium green" style="margin-right: 10px;" title="Spockholm Toolbar Feature"><span><span>SELECT MAX</span></span></a>');
			}
		});
	}

	function add_next_prev(){
		if($('.'+spocklet+'_looping').length == 0){
			$('.empire_featured_roundel:first').before('<td title="Spockholm Toolbar Feature" style="width: 40px;background-size: 30px 20px;background-position: center;" class="empire_featured_roundel '+spocklet+'_looping prev">Prev</td>');
			$('.empire_featured_roundel:last').after('<td title="Spockholm Toolbar Feature" style="width: 40px;background-size: 30px 20px;background-position: center;" class="empire_featured_roundel '+spocklet+'_looping next">Next</td>');
			$('.'+spocklet+'_looping').click(function(){
				var dir = 'prev';
				if($(this).hasClass('next')) dir = 'next';
				var modules = $('.empire_featured_roundel:not(.disabled,#'+spocklet+'_HP_panel_but,.'+spocklet+'_looping)');
				var active = $('.empire_featured_roundel_active');
				if(parseInt(active.text()) == parseInt(modules.eq(modules.length-1).text()) && dir == 'next'){
					modules.eq(0).click();
				}
				else if(parseInt(active.text()) == parseInt(modules.eq(0).text()) && dir == 'prev'){
					modules.eq(modules.length-1).click();
				}
				else if(dir == 'prev'){
					modules.eq(parseInt(active.text())-2).click()
				}
				else if(dir == 'next'){
					modules.eq(parseInt(active.text())).click()
				}
				else{
					//alert('something went horribly wrong.....');
					//probably true, but we don't have to tell anyone
				}
			});
			try { // because kind of untested ;-)
				$('#empire_featured_roundel_1').parent().find('td:first').before('<span id="spmover"></span> &nbsp; ');
				$('.empire_featured_roundel').each(function(){if(this.id.indexOf('empire_featured_roundel')!=-1) { var id=this.id.substr(24);var name=$('#empire_featured_'+id+' > div > div:first').attr('id').replace('Module','');$(this).attr('title',name); }});
				if(!document.getElementById('social_module_daily_take_div')){
					$('.empire_featured_roundel').hover(function(){$('#spmover').html($(this).attr('title'));},function(){$('#spmover').html('');});
				}
			} catch(e) {}
		}
	}
	function image_names(h){
		//helper function for belows
		var images = [];
		var re = /\/mwfb\/(?:content\/)?graphics\/(.*)\.[png|jpg]/g,match;
		while (match = re.exec(h)) {
			images.push(match[1]);
		}
		return images.join('');
	}
	function ArenaModule() {
		try {
			if(document.getElementById('arena_module_cont')) {
				if(!$('#arena_module_cont').attr('spdone')) {
					var perc,number,width=$('.arena_module_mastery_progress').css('width');
					if(width.indexOf('%')==-1) {
						perc=parseInt(width)/parseInt($('.arena_module_mastery_meter').css('width'));
					} else {
						perc=parseInt(width)/100;
					}
					if(perc<0.25) { number=perc*25*4; }
					else if(perc<0.5) { number=25+((perc-0.25)*25*4); }
					else if(perc<0.75) { number=50+((perc-0.5)*75*4); }
					else { number=125+((perc-0.75)*125*4); }
					$('.arena_module_mastery_level').html('Earned Crests for this event: ~'+parseInt(number)).attr('title','Brought to you by Team Spockholm');
					$('#arena_module_cont').attr('spdone', true);
				}
			}
		} catch(e) {}
	}
	
	function HP_Mod2(){
		var saves = window.localStorage.getItem(spocklet+'_HP_mods_'+User.trackId)||null;
		if(saves) { saves = JSON.parse(saves) } else { saves={}; }
		if(document.getElementById(spocklet+'_HP_panel_but')) return;
		var gear = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABh0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzT7MfTgAAAkNJREFUOI2lU01IlFEUPfd7X86k05BGm4gg3LhrE2q0iEqoyBZCBoGFSUGbqFWtpMzatGtjLScJW5iCLSTIFm0qo8X0vzACaSojcaZxmu/d9/PdFo7iaAnR3dzFuee8c8/lkYjgfypYC3yVzXa9zmbb15qhlQ5eTE52EdHZZDLZXS6X3wD4Ultb1651lBGR3uaWlkfL58OVisyavI93a62nvPcgQqMx5oP3HmEY2r86eDwxcZyILolI2Vq7SySGCEoAFBHWEwWoqVn3BKDNInJ+f1vbRJUDY/ijMXY7gLSIQEQuFIvzGQpIbUilzhHRFWbeQ8BMTTLxedUKc3Nz+TAM3wPUqpQaONrZeXOZ0777w8M7vPcdEMmWfpXMIhAAwGAm0+icn2LNrYYZQRCM/yHwcWYGMx901n0avJPZtCTgnJ121nYw8zutNay1O1eyrbXNWkdg5qfW2kOxj/NLAj2nz7jZ2R/PIh0loqiMQiF/8cHY2IFF8ujIyLGfhcIpHUWIoqh25vu35909PXFVBkqFHax5Cwg5rXmrjqKHt28NvBVByFo3GWNAAU1D0JRIJPcBGK06IwBc7u1NqVAdIaIhiQUgABWYAkIcx3tjJy/7rl0tVYW4FHV/f8k712CYvxLRYWtMZK3JUUDthnkm9r5hORkASC30jQDqASQ8oNKpVF2xVMp1nzxxwzlXuDt073p9Or0tXyzOKyAGwADyTqRAIoKQSFXyCHzFuAJCJzJPRKSAlAdc5UHBgohzIn7VZ/rX+g2TSkW30NvjeAAAAABJRU5ErkJggg==';
		var play_pause = $('#empire_featured_roundel_playpause');
		if(play_pause.hasClass('pause')) play_pause.trigger('click');
		play_pause.after('<td class="empire_featured_roundel_blank"></td><td id="'+spocklet+'_HP_panel_but" class="empire_featured_roundel"><img src="'+gear+'" style="vertical-align:middle;margin-top:2pt;"></td>');
		$('#featured_carousel_parent').find('div:first').find('div:last').before('<div id="'+spocklet+'_control_panel_con" style="height:200px;position:absolute;top:0px;left:0px;display:none;"><div class="clearfix" style="clear: both;"><div id="'+spocklet+'_control_panel" style="width: 760px; height: 200px"></div></div></div>');
		var ui = '<ul style="height:157px;overflow-y:auto;overflow-x:hidden;width:250px;float:right;text-align:center;list-style:none;">';
		var style = '<style type="text/css">.'+spocklet+'_green{background-color:green;} .'+spocklet+'_yellow{background-color:#FFAD5C;} .'+spocklet+'_red{background-color:red;}</style>';
		$('#'+spocklet+'_control_panel_con').prepend(style);
		$('div[id^="empire_featured_"]').each(function(){
			var i = $(this).find("div > div").attr("id");
			if(saves && saves[i]){
				if(saves[i].stage.indexOf('yellow') > 0 && saves[i].text){
					if(saves[i].text != image_names($('#'+i).html())){
						saves[i].stage = spocklet+'_green';
					}
				}
				if(saves[i].stage.indexOf('red') > 0||saves[i].stage.indexOf('yellow') > 0){
					$(this).hide();
					var id = $('#'+i).parent().parent().attr('id').replace('featured_','featured_roundel_');
					$('#'+id).addClass('disabled').hide().prev('.empire_featured_roundel_blank').hide();
				}
			}
			$('.empire_featured_roundel:not(.disabled,#'+spocklet+'_HP_panel_but,.'+spocklet+'_looping)').each(function(i,e){
				$(this).text(i+1);
			});
			ui += '<li class="'+spocklet+'_hidemodule '+(saves[i]?(saves[i].stage):(spocklet+"_green"))+'" style="padding:2px;border-bottom: 1px solid white;">'+i+'</li>';
		});
		ui += '</ul>';
		$('#'+spocklet+'_control_panel').html(ui);
		HP_module_save();
		$('.empire_featured_roundel:not(.disabled,#'+spocklet+'_HP_panel_but,.'+spocklet+'_looping)').eq(0).click();
		$('.'+spocklet+'_hidemodule').click(function(){
			var hide = true;
			if($(this).hasClass(spocklet+'_green')){
				$(this).removeClass(spocklet+'_green').addClass(spocklet+'_yellow');
			}
			else if($(this).hasClass(spocklet+'_yellow')){
				$(this).removeClass(spocklet+'_yellow').addClass(spocklet+'_red');
			}
			else{
				$(this).removeClass(spocklet+'_red').addClass(spocklet+'_green');
				hide = false;
			}
			var mod = $('#'+$(this).text()).parent().parent();
			var id = mod.attr('id').replace('featured_','featured_roundel_');
			if(hide){
				$('#'+id).addClass('disabled').hide().prev('.empire_featured_roundel_blank').hide();
			}
			else{
				$('#'+id).removeClass('disabled').show().prev().show();
			}
			$('.empire_featured_roundel:not(.disabled,#'+spocklet+'_HP_panel_but,.'+spocklet+'_looping)').each(function(i,e){
				$(this).text(i+1);
			});
			HP_module_save();
		});
		$('.empire_featured_roundel:not(#'+spocklet+'_HP_panel_but)').click(function(){
			$('#'+spocklet+'_control_panel_con').hide();
		});
		$('#'+spocklet+'_HP_panel_but').click(function(){
			$('#featured_carousel_parent').find('div:first').children().hide();
			$('#'+spocklet+'_control_panel_con').toggle();
		});
	}
	function HP_module_save(){
		var saves = window.localStorage.getItem(spocklet+'_HP_mods_'+User.trackId)||null;
		if(saves) { saves = JSON.parse(saves) } else { saves={}; }
		var stages = {2:spocklet+'_red',1:spocklet+'_yellow',0:spocklet+'_green'};
		$('.'+spocklet+'_hidemodule').each(function(){
			var id = $(this).text();
			var str = null;
			if($(this).hasClass(spocklet+'_yellow')){
				str = image_names($('#'+id).html());
			}
			var stage = 0;
			for(x in stages){
				if(stages[x] == ($(this).attr('class').replace(spocklet+'_hidemodule ',''))){
					stage = x;
					break;
				}
			}
			saves[id] = {'stage':stages[stage],'text':str};
		});
		try {
			window.localStorage.setItem(spocklet+'_HP_mods_'+User.trackId,JSON.stringify(saves));
		}catch(e) {
			alert('Spockholm Toolbar reporting:\nYour localstorage is probably full, please run Cookie-a-Nator from the toolbar and select "Delete Junk". Error message was: '+e.toString());
		}
	}

	function war_ids(){
		if ($('#'+spocklet+'_cfgwarlink').is(':checked')) {
			$('.war_status img').each(function(i,e){
				if (!($(this).hasClass(spocklet) || ($(this).next().length > 0 && ((!$(this).next().hasClass('war_x')) && ($(this).parent().parent().parent().parent().hasClass('attack_callout') || $(this).parent().parent().hasClass('attack_callout')))))) {
					if (m=/(\d+)_(\d+)_q.jpg/.exec($(this).attr('src'))) {
						var place = $(this).position();
						$(this).addClass(spocklet).after('<div id="war_'+spocklet+'_'+i+'" style="background-color:black;background-image:url(\'https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/map_based_jobs/expert_view/expertview_nav_mid_ro.gif\');z-index:20;position:absolute;height:47px;top:'+place.top+'px;left:'+place.left+'px;opacity:0;width:50px;text-align:center;padding:5px;background-repeat:no-repeat;background-size: 100% 100%;"><span><a href="http://www.facebook.com/profile.php?id='+m[1]+'" target="new">Facebook</a></span><br/><span><a onclick="do_ajax(\'inner_page\', \'remote/html_server.php?xw_controller=stats&xw_action=view&user='+m[1]+'\', 1, 1, 0, 0);">Mafia Wars</a></span></div>');
						$('#war_'+spocklet+'_'+i).hover(function(){$(this).stop(true,true).animate({'width':"+=50px",'opacity':'1','left':'-=20px'}, 300)},function(){$(this).stop(true,true).animate({'width':"-=50px",'opacity':'0','left':'+=20px'}, 300)});
					}
				}
			});
		}
	}

	function mission_walkthrough() {
	    if (document.getElementById('quest_tray_inner')) {
	        if (!$("#quest_tray_inner").attr('spdone')) {
	            $('div[id^="quest_"]').each(function () {
	                var m;
	                if (m = /quest_(\d+)_details/.exec(this.id)) {
	                    var value = m[1],
						url = 'http://www.mafiawarslootlady.com/search?q=Mission%20'+encodeURI($(this).find('h2:first').text().trim())+'&by-date=true',
						divid = '';
	                    switch (true){
							//Web of Lies
	                        case (value >= 6371 && value <= 6380):
								url = 'http://www.mafiawarslootlady.com/2012/05/web-of-lies-walkthrough-parts-1-8.html';
								divid = '_mission_walkthrough_4';
	                            break;

	                        //Cornerstone
	                        case (value >= 6381 && value <= 6390):
	                            url = 'http://www.mafiawarslootlady.com/2012/06/cornerstone-limited-time-mission.html';
								divid = '_mission_walkthrough_4';
	                            break;

	                        //Oriental Retribution
	                        case (value >= 6391 && value <= 6399):
								url = 'http://www.mafiawarslootlady.com/2012/07/oriental-retribution-limited-time.html';
								divid = '_mission_walkthrough_4';
	                            break;

	                        //Oversouls
	                        case (value >= 6421 && value <= 6430):
								url = 'http://www.mafiawarslootlady.com/2012/09/oversouls-mission-walk-through.html';
								divid = '_mission_walkthrough_4';
	                            break;

	                        //The Hit List
	                        case (value >= 6431 && value <= 6440):
								url = 'http://www.mafiawarslootlady.com/2012/10/the-hit-list-limited-time-mission_3.html';
								divid = '_mission_walkthrough_4';
	                            break;

	                        //Skate or Die
	                        case (value >= 6441 && value <= 6450):
								url = 'http://www.mafiawarslootlady.com/2012/10/skate-or-die-limited-time-mission.html';
								divid = '_mission_walkthrough_4';
	                            break;

	                        //Space and Miles
	                        case (value >= 6451 && value <= 6460):
								url = 'http://www.mafiawarslootlady.com/2012/11/space-and-miles-limited-time-mission_2193.html';
								divid = '_mission_walkthrough_4';
	                            break;
							 //Jingle Physics
	                        case (value >= 6461 && value <= 6470):
								url = 'http://www.mafiawarslootlady.com/2012/12/jingle-physics-mission-walkthrough.html';
								divid = '_mission_walkthrough_4';
	                            break;
							//Blockbuster Blitz
	                        case (value >= 6471 && value <= 6480):
								url = 'http://www.mafiawarslootlady.com/2013/01/blockbuster-blitz-limited-time-mission.html';
								divid = '_mission_walkthrough_4';
	                            break;

	                        //London City missions
	                        case (value >= 8111 && value <= 8209):
								url = 'http://mwlootlady.blogspot.com/2012/02/complete-extreme-mission-list.html';
	                            divid = '_mission_walkthrough_5';
	                            break;

	                        //Walkthrough Extreme
	                        case (value >= 9000 && value <= 9020):
								url = 'http://mwlootlady.blogspot.com/2012/02/complete-extreme-mission-list.html';
	                            divid = '_mission_walkthrough_extreme';
	                            break;
	                        default:
								break;
	                    }
	                    $('#quest_tray_inner').attr('spdone', 'true');
	                    $('#quest_'+value+'_details').find('h2').append('<small><a id="'+spocklet+divid+'" href="'+url+'" target="_blank" title="Brought to you by Spockholm Toolbar">(Link to walkthrough)</a></small>');
	                }
	            });
	        }
	    }
	}

	function leaderboard_clickable_profiles(){
		if(document.getElementById('leaderboard_cont')) {
			$('#leaderboard_cont').find('li').each(function(){
				var name = $(this).find('.name').text();
				var ajax = "do_ajax('inner_page', 'remote/html_server.php?xw_controller=stats&xw_action=view&user="+$(this).attr('id')+"', 1, 1, 0, 0)";
				$(this).find('.name').html('<a href="#" onclick="'+ajax+'">'+name+'</a>');
			});
		}
	}

	function battle_check(){
		if (document.getElementById('pop_zmc')) {
			var m;
			// thanks brandon v
			$('.state_accept:contains("Accept Battle")').each(function(){
				var cbut = $(this).find('#confirm_btn').data('events').click[0].handler;
				if (m=/duration\=(\d+)/.exec(cbut)){
					if (m[1]=="14400") {
						$(this).find('a:first span span').html("Accept 4h battle");
					} else {
						$(this).find('a:first span span').html("Accept 1h battle");
					}
				}
				if (m=/opponent_id\=(\d+)/.exec(cbut)){
					var html,txt=$(this).parent().find('div:last p:first').text().trim();
					var id=m[1];
					if (m=/^\s*(.*) is challenging you/.exec(txt)) {
						html='Request from '+m[1]+'. <br /><a target="_blank" href="http://apps.facebook.com/inthemafia/family.php?id=%7B%22id%22%3A%22'+btoa(id)+'%22%7D">Family Profile</a> <a target="_blank" href="http://spockon.me/familyrank/family-'+id+'">Family-Rank</a>';
						$(this).parent().find('div:last p:first').html(html);
					}
				}
			});
		}
	}

	function dropdownmenu(){
		if (config.settings.menues) {
			if (!$('#mw_navigation').attr('spdone')) {
				var shortlinks = {
	                "nav_link_fight": [
						{"name": "Fight", "link": "fight&xw_action=view"},
						{"name": "&#187; Rivals","link": "fight&xw_action=view&tab=1"},
						{"name": "Rob","link": "robbing&xw_action=view"},
						{"name": "War","link": "war&xw_action=view"},
						{"name": "Hitlist","link": "hitlist&xw_action=view"}
					],
	                "nav_link_inventory": [
						{"name": "Inventory","link": "inventory&xw_action=view"},
						{"name": "City Store","link": "item&xw_action=view"},
						{"name": "Collections","link": "collection&xw_action=view"},
						{"name": "&#187; Brazil","link": "collection&xw_action=view&selected_city=7&filter_col=1"},
						{"name": "&#187; London","link": "collection&xw_action=view&selected_city=9&filter_col=1"},
						{"name": "Gifting","link": "gift&xw_action=view"},
						{"name": "Boosts","link": "expendable&xw_action=view"}
					],
	                "nav_link_events": [
						{"name": "Bossfights","link": "Epicclanboss&xw_action=list_view"},
						{"name": "&#187; Raven","link": "socialmission&xw_action=operations_view"},
						{"name": "My Ops","link": "socialmission&xw_action=view"},
						{"name": "My Mafia Ops","link": "socialmission&xw_action=view&type=helper"}
					],
	                "nav_link_profile": [
						{"name": "Profile","link": "stats&xw_action=view"},
						{"name": "Items","link": "inventory&xw_action=view"},
						{"name": "Achievements","link": "achievement&xw_action=view"},
						{"name": "Daily Fix","link": "DailyFix&xw_action=view"}
					],
	                "nav_link_mafia": [
						{"name": "Family","link": "clan&xw_action=view"},
						{"name": "&#187; Roster","link": "clan&xw_action=view&tab=3"},
						{"name": "&#187; Perks","link": "clan&xw_action=view&tab=2"},
						{"name": "&#187; Battle","link": "clan&xw_action=view&tab=4"},
						{"name": "&#187; Property","link": "clan&xw_action=view&tab=5"},
						{"name": "Recruit","link": "recruit&xw_action=view"},
						{"name": "My Mafia","link": "group&xw_action=view"},
						{"name": "Free Gifts","link": "freegifts&xw_action=view"}
					],
					"nav_link_properties_unlock": [
						{"name": "&#187; Global Properties", "link": "propertyV2&xw_action=view&default_tab="},
						{"name": "&#187; City Properties", "link": "propertyV2&xw_action=view&default_tab=local"}
					],
					"nav_link_jobs_unlock": [],
					"arena_nav_unlock": [
						{"name":"Spartacus","script": "https://spocklet.com/bookmarklet/spartacus.js"},
					],
					"nav_link_godfather_unlock": [
						{"name":"VIP","link": "marketplace&xw_action=view&category=15"},
						{"name":"Daniela's Deal","link": "marketplace&xw_action=view&category=17"},
						{"name":"Trader Goh","link": "marketplace&xw_action=view&category=12"},
						{"name":"Skillpoints","link": "marketplace&xw_action=view&category=2&subtype=-1&favor_type=1&favor_id=4%2C18%2C19%2C20"},
						{"name":"Fight Club","link": "marketplace&xw_action=view&category=8"},

					]
	            };

				$('#game_nav > .arena_link').attr('id','arena_nav_unlock'); // arena button bugfix
				
				for(var id in shortlinks) {
					$('#'+id).append('<div id="'+spocklet+'_short_'+id+'"></div>');
					$('#'+spocklet+'_short_'+id).css({"position":"absolute","z-index": "20", "display": "none","-moz-border-bottom-colors": "none", "-moz-border-image": "none", "-moz-border-left-colors": "none", "-moz-border-right-colors": "none", "-moz-border-top-colors": "none", "border-color": "#CDCDCD", "border-style": "solid", "border-width": "0 1px 1px", "font-size": "12px", "font-weight": "bold", "margin": "0 2px", "margin":"0px", "text-align":"left","min-width":(parseInt($('#'+id).css('width'))-2)+'px' });
					$('#'+id).hover(
						function(){
							$('#'+spocklet+'_short_'+this.id).css('display','block');
						},
						function(){
							$('#'+spocklet+'_short_'+this.id).css('display','none');
						}
					);
					$('#'+spocklet+'_short_'+id).html('');
					for(var i=0;i<shortlinks[id].length;i++){
						if(shortlinks[id][i].link) {
							$('#'+spocklet+'_short_'+id).append('<a href="#" onclick="do_ajax(\'inner_page\', \'remote/html_server.php?xw_controller='+shortlinks[id][i].link+'\', 1, 1, 0, 0);return false;" class="sexy_destination spocklet_button" title="Spockholm Toolbar Feature" style="padding:0px 5px 0px 5px;"><span class="">'+shortlinks[id][i].name+'</span></a>');
						} else {
							$('#'+spocklet+'_short_'+id).append('<a href="#" onclick="$.getScript(\''+shortlinks[id][i].script+'\');return false;" class="sexy_destination spocklet_button" title="Spockholm Toolbar Feature" style="padding:0px 5px 0px 5px;"><span class="">'+shortlinks[id][i].name+'</span></a>');
						}
					}
				}
				$('#mw_navigation').attr('spdone','true');
			}
		}
	}
	function district_dropdown() {
		var active_city = $('#mw_city_wrapper');
		active_city = active_city.length > 0?active_city.attr('class').substr(7):$('#travel_bar').attr('class').substr(7);
		var link_city = $('#mw_navigation').attr('spcity');
		if (active_city != link_city) {
			$('#'+spocklet+'_short_nav_link_jobs_unlock').html('');
			$('#mw_navigation').attr('spcity','0');

			if (Util.isset(districts[active_city]) && districts[active_city].length > 0) {
				$.each(districts[active_city],function(index,value) {
					var name ='&#187; District '+value+(value > 100?' Secret':'');
					var link = 'travel&xw_action=travel&xw_city='+active_city+'&tmp=&cb=&xw_person='+User.id.substr(2)+'&mwcom=1&from=job&zone=1&destination='+active_city+'&tab='+value;
					$('#'+spocklet+'_short_nav_link_jobs_unlock').append('<a href="#" onclick="do_ajax(\'inner_page\', \'remote/html_server.php?xw_controller='+link+'\', 1, 1, 0, 0);return false;" class="sexy_destination spocklet_button" title="Spockholm Toolbar Feature" style="padding:0px 5px 0px 5px;"><span class="">'+name+'</span></a>');
				});
				$('#mw_navigation').attr('spcity',active_city);
			}
		}
	}

	function job_master(){
		if (!$('.jobs').attr('spdone')) {
			$('.jobs > .job').each(function(){
				if (parseInt($(this).find('.mastery_bar > p').text().trim())<100) {
					html=' <a class="'+spocklet+'_masterjob sexy_button_new sexy_call_new medium green mw_new_ajax_feed" style="min-width:0px;" title="Spockholm Toolbar Feature" href="#"><span><span>Full</span></span></a> ';
					$(this).find('.sexy_energy_new').before(html);
				} else {
					html=' <a class="'+spocklet+'_masterjob sexy_button_new sexy_call_new medium red mw_new_ajax_feed" style="min-width:0px;" title="Spockholm Toolbar Feature" href="#"><span><span>Burn</span></span></a> ';
					$(this).find('.sexy_energy_new').before(html);
				}
			});
			$('a[id*="btn_dojob"]').css('min-width','1px').find('span > span').text('One');
			$('.jobs').attr('spdone',"true");

			function isAllowedUrl(url){
				return ((url.indexOf('xw_controller=job&xw_action=dojob')!=-1) || (url.indexOf('xw_controller=job&xw_action=buy_required_items')!=-1) || (url.indexOf('xw_controller=Job&xw_action=eliminateBandit')!=-1));
			}

			function jm_stop($this,burn){
				$('body').unbind('ajaxComplete.SpockholmJobMaster');
				if(!burn){
					$this.removeClass('orange').addClass('green').find('span > span').text('Full');
				}
				else{
					$this.removeClass('orange').addClass('red').find('span > span').text('Burn');
				}
				jm_run=false;
			}

			$('.'+spocklet+'_masterjob').click(function(){
				var burn=$(this).text().indexOf('Burn')!=-1;
				var $this=$(this);
				if(!jm_run) {
					jm_run=true;
					jm_failed=0;
					jm_btn=$(this).parent().find('a[id*="btn_dojob"]');
					$(this).removeClass('green red').addClass('orange').find('span > span').text('pause');
					$('body').unbind('ajaxComplete.SpockholmJobMaster');
					$('body').bind('ajaxComplete.SpockholmJobMaster',function(e,xhr,settings) {
						if (jm_run) {
							if (isAllowedUrl(settings.url)) {
								// my call
								var data;
								try {
									data=JSON.parse(xhr.responseText);
								} catch(e) {}
								if(data){
									if(data.jobResult){
										if (data.jobResult.lootBandit.length>0) {
											// try eliminate
											$this.parent().parent().find('.bandit-eliminate-btn > a').trigger('click');
										} else if(data.jobResult.masteryTotal<100) {
											// next
											jm_btn.trigger('click');
										} else {
											// done
											if(burn) {
												jm_btn.trigger('click');
											} else {
												jm_stop($this,burn);
											}
										}
									} else if (data.data.info) {
										// bandit killed
										jm_btn.trigger('click');
									} else {
										if(data.data.impulseBuy.success==1) {
											jm_btn.trigger('click');
										} else if (data.data.impulseBuy.message.indexOf('You need the following items for this job')!=-1) {
											// try buy items
											$('p:contains("You need the following items for this job")').parent().find('a.green').trigger('click');
										} else if (data.data.impulseBuy.message.indexOf('You do not have enough energy')!=-1) {
											// out of energy, stop.
											jm_stop($this,burn);
										} else if (data.data.impulseBuy.message.indexOf('These loot drops are needed for this job')!=-1) {
											jm_stop($this,burn);
										} else {
											jm_stop($this,burn);
										}
									}
								} else {
									// no json reply, must be error
									if(jm_failed++>10){
										jm_stop($this,burn);
									}
								}
							} else {
								// not my call
								if(jm_failed++>10) {
									jm_stop($this,burn);
								}
							}
						}
					});
					jm_btn.trigger('click');
				} else {
					$(this).removeClass('orange').addClass('green').find('span > span').text('Full');
					jm_run=false;
				}

			});
			// consumables
			if($('.lootCollectionBar').length==0) { // skip for SD
				var cons={},names={};
				$('.job .item_with_preview').each(function(){
					var src=$(this).attr('src');
					var id=parseInt($(this).attr('item_id'));
					var name=$(this).attr('title');
					cons[id]=src;
					names[id]=name;
				});

				var html='<div class="lootCollectionBar"><div class="fl" style="margin: 7px 40px 0 15px;">Consumables:</div>';

				var list=[];
				for(var id in cons) {
					list.push(id);
					html+=
					'<div class="fl" style="margin-right: 20px;">'+
					'<div class="fl" style="height: 32px;"> <img src="'+cons[id]+'" alt="'+names[id]+'" title="'+names[id]+'" style="height: 32px; width: 32px;" class="item_with_preview" item_id="'+id+'"> </div>'+
					'<div class="fl" id="loot_bar_count_'+id+'" style="margin: 7px 0 0 5px;">&times; ??</div><div class="cb"></div>'+
					'</div>';
				}
				html+='<div class="fl" id="'+spocklet+'_lootcount_update" style="margin: 0px 0px 0px 0px;  font-size: 10px;color:grey;">Click button<br />to show &gt;&gt;</div>';

				html+='<div class="fl" style="margin-right: 0px;margin-top:5px;float:right;"><a href="#" id="'+spocklet+'_lootcountrefresh" class="sexy_button_new short black" title="Refresh count" alt="Refresh count" data-ids="['+list.join(',')+']"><span><span><img style="margin-right: 2px;padding-top: 1px;" src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/action_box_icon_refresh.gif"></span></span></a></div>'+
				'<div class="fl" style="margin: 7px 42px 0px 0px; float:right; font-size: 12px;">by Team Spockholm</div>'+
				'<div class="cb"></div>'+
				'</div>';
				$('.jobs').prepend(html);

				$('#'+spocklet+'_lootcountrefresh').click(update_lootcount);
				// update_lootcount();
			}
		}
	}
	function update_lootcount(){
		$('#'+spocklet+'_lootcount_update').remove();
		var consumablelist;
		function update_lootcount_next(){
			if(consumablelist.length>0) {
				var nextid=consumablelist.shift();
				sp_get_item_data(nextid,function(res){
					$('#loot_bar_count_'+res.id).html('&times; '+res.count);
					update_lootcount_next();
				});
			}
		}
		consumablelist=JSON.parse($('#'+spocklet+'_lootcountrefresh').attr('data-ids'));
		for(var i=0;i<consumablelist.length;i++){
			$('#loot_bar_count_'+consumablelist[i]).html('??');
		}
		update_lootcount_next();

	}

	function showxp(msg) {
		if(msg && (msg.indexOf("user_fields")!=-1)) {
			try {
				json=JSON.parse(msg);
				if (json.user_fields.xp_earned>0) {
					$('.'+spocklet+'_xpupdate').remove();
					$('#user_stats').append('<div class="'+spocklet+'_xpupdate" style="position:absolute;font-size:50px;color:red;"> &nbsp; &nbsp; +'+json.user_fields.xp_earned+' XP</div>');
					$('.'+spocklet+'_xpupdate').delay(1000).fadeOut(2000,function(){$(this).remove();});
				}
			} catch (e) {
				var m;
				if (m=/user_fields..xp_earned.. . parseInt\(.(\d+).\)/.exec(msg)) {
					var xp=parseInt(m[1]);
					if(xp>0) {
						$('.'+spocklet+'_xpupdate').remove();
						$('#user_stats').append('<div class="'+spocklet+'_xpupdate" style="position:absolute;font-size:50px;color:red;"> &nbsp; &nbsp; +'+xp+' XP</div>');
						$('.'+spocklet+'_xpupdate').delay(1000).fadeOut(2000,function(){$(this).remove();});
					}
				}
			}
		}
	}
	function ravencombos(){
		if($('#bossv2_wrapper').length>0){
			if($('#bossv2_wrapper').attr('spdone')!="true") {
				$('#bossv2_wrapper').attr('spdone',"true");
				$.getScript('//spocklet.com/bookmarklet/combonator.js');
			}
		}
	}


	function profile_show_ids(){
	//Add Profiles
		if($('#'+spocklet+'_profileids').length==0) {
			try {
				$link=$('#profile_link');
				if($link.length==0) {
					$link=$('strong.good:contains("profile.php")');
				}
				var mwid = 'n/a';
				var a;
				if(a = /"user":"(.*)"/.exec(decodeURIComponent($link.text().trim()))){
					mwid = atob(a[1]);
				}
				$link.after('<span id="'+spocklet+'_profileids"><span style="display:block;" id="'+spocklet+'_mwid"></span><span style="display:block;" id="'+spocklet+'_fbid"></span><span style="display:block;" id="'+spocklet+'_famid"></span><span style="display:block;" id="'+spocklet+'_respect"></span></span>');
				$('#'+spocklet+'_mwid').text('MWID: '+mwid);
				// code from switch by Pete Dillman
				var m;
				if ((m=/user%2522.*?%2522([0-9A-Za-z%]+)%2522/.exec(document.getElementById('mainDiv').innerHTML)) || (m=/user%22.*?%22([0-9A-Za-z%]+)%22/.exec(document.getElementById('mainDiv').innerHTML))) {
					$('#'+spocklet+'_fbid').html('FBID: <a href="http://www.facebook.com/profile.php?id='+atob(m[1].replace(/%253D/g,'=').replace(/%3D/g,'='))+'" target="_blank">'+atob(m[1].replace(/%253D/g,'=').replace(/%3D/g,'='))+'</a>');
				}
				var clan = $('.stats_title_text').find('a');
				if(clan.length > 0){
					//&id=NTAzNw==
					var m;
					if(m = /\&id\=(.*)\&/.exec(decodeURIComponent(clan.eq(0).attr('href')))){
						var famid = atob(m[1]);
						$('#'+spocklet+'_famid').html('Fam. Id: <a href="http://spockon.me/familyrank/family-'+famid+'" target="_blank">'+famid+'</a>');
					}
				}
				var html='<a href="#" id="'+spocklet+'_loadrespect">Load respect</a>';
				$('#'+spocklet+'_respect').html(html);
				$('#'+spocklet+'_loadrespect').click(function(){
					request('?xw_controller=Arena&xw_action=getSingleUserData&pid='+mwid.substr(2)+'&xw_client_id=8',function(msg){
						var json=JSON.parse(msg);
						for(var id in json.data.result) {
							var respect=json.data.result[id].playerRespect;
							var mwrating=json.data.result[id].defenseFlag + json.data.result[id].mafiaDefenseFlag;
							var mwsecret=(json.data.result[id].defenseFlag==1?'Has more def skills':'Has less def skills')+' and '+(json.data.result[id].mafiaDefenseFlag==1?'has more mafia def':'has less mafia def');
							$('#'+spocklet+'_respect').html('Respect: <span class="respect">'+respect+'</span> <span title="'+mwsecret+'">('+(mwrating==0?'Easy':(mwrating==2?'Hard':'Normal'))+')</span>');
						}
					});
				});
				
			}catch(ignore){}
		}
   }
	function achievements_cleanup(){
		//Cleanup achievements make titles clickable

			if (!$(".ach_achievements .title:contains('New York')").attr('spdone')){
				$(".ach_achievements .title").attr('spdone', 'true').attr('title','Another Groovy Spockification').attr('style','cursor:pointer').append('<span STYLE="font-size: 10pt;"> (Click to expand/collapse)</span>').prepend('<img src="http://t3.gstatic.com/images?q=tbn:4TZreCjs_a1eDM:http://www.venice.coe.int/images/plus.png"> ');
				$(".title:contains('My Achievements')").after('<div id="spexpcollapse" STYLE="font-size: 10pt;cursor:pointer;"><img src="http://t3.gstatic.com/images?q=tbn:4TZreCjs_a1eDM:http://www.venice.coe.int/images/plus.png"> Expand All</div>');
				$(".ach_ach").hide();
				$('.ach_not_earned').parent().show();
			}

			if(!document.getElementById(spocklet+'_achieves_notdone')){
			  var list = $('ul.ach_achievements:first');
			  var not_done = $('.ach_ach_date.ach_not_earned');
			  list.append('<div class="title" id="'+spocklet+'_achieves_notdone">Achievements Left to Complete ('+not_done.length+')</div>');
			  not_done.each(function(){
			  	var $that = $(this);
			   	var clone = $that.parent().clone();
			  	 list.append(clone);
			  	 $('.ach_ach:last').find('div.ach_ach_date:first').text($that.text()+' ['+$that.parent().prevAll('.title:first').text().replace('(Click to expand/collapse)','') +']');
			  });
			}
  			//toggle the componenet with class .title next elements.
 			$(".ach_achievements .title").unbind('click.'+spocklet).bind('click.'+spocklet,function(){
 					$(this).nextUntil(".title").stop(true,true).slideToggle('slow',function(){$('.ach_not_earned').parent().show();});
    				$(this).find('img').attr('src',function(i,src){
       					 return (src.indexOf('plus.png') != -1)? 'http://t1.gstatic.com/images?q=tbn:1PS9x2Ho4LHpaM:http://www.unesco.org/ulis/imag/minus.png' :'http://t3.gstatic.com/images?q=tbn:4TZreCjs_a1eDM:http://www.venice.coe.int/images/plus.png';
  					});

  			});


  			$("#spexpcollapse").unbind('click.'+spocklet).bind('click.'+spocklet,function(){

       				 $(this).html(function(i,html) {
            			if (html.indexOf('Expand') != -1 ){
               				html = html.replace('Expand','Collapse');
               				$(".ach_ach").show();

           				} else {
            				html = html.replace('Collapse','Expand');
            				$(".ach_ach").hide();

           				 }
           				 return html;
        			});
        			$(this).find('img').attr('src',function(i,src){
       					 return (src.indexOf('plus.png') != -1)? 'http://t1.gstatic.com/images?q=tbn:1PS9x2Ho4LHpaM:http://www.unesco.org/ulis/imag/minus.png' :'http://t3.gstatic.com/images?q=tbn:4TZreCjs_a1eDM:http://www.venice.coe.int/images/plus.png';
  					});
			});
	}
   function profile_cleanup(){
   		//Mod Silliest Game Feature Ever!!!
		$("a:contains('Ask Mafia to Attack')").text('Ask Mafia to Attack').attr('title','BEWARE!! Using this silly feature can bring down the wrath of an entire Mafia.\nA Team Spockholm Public Service Announcement');
		//Cleanup
		$("a:contains('Add to Hitlist')").text('Hitlist');
		//Cleanup Inventory make titles clickable
			if (!$(".title:contains('Weapons')").attr('spdone')){
				$(".nice_list").hide();
				$(".stats_finance_section").hide();
				$(".title:mcontains('Finances','Weapons','Armor','Vehicles','Animals','Henchmen','Boosts')").attr('spdone', 'true').attr('title','Another Groovy Spockification').attr('style','cursor:pointer').append('<span STYLE="font-size: 10pt;"> (Click to expand/collapse)</span>').prepend('<img src="http://t3.gstatic.com/images?q=tbn:4TZreCjs_a1eDM:http://www.venice.coe.int/images/plus.png"> ');
				$(".title:contains('Finances')").before('<div id="spexpcollapse" STYLE="font-size: 10pt;cursor:pointer;"><img src="http://t3.gstatic.com/images?q=tbn:4TZreCjs_a1eDM:http://www.venice.coe.int/images/plus.png"> Expand All</div>');
			}
  			//toggle the componenet with class msg_body
 			$(".title:mcontains('Weapons','Armor','Vehicles','Animals','Henchmen','Boosts')").unbind('click.'+spocklet).bind('click.'+spocklet,function(){
    				$(this).next(".nice_list").stop(true,true).slideToggle(500);
    				$(this).find('img').attr('src',function(i,src){
       					 return (src.indexOf('plus.png') != -1)? 'http://t1.gstatic.com/images?q=tbn:1PS9x2Ho4LHpaM:http://www.unesco.org/ulis/imag/minus.png' :'http://t3.gstatic.com/images?q=tbn:4TZreCjs_a1eDM:http://www.venice.coe.int/images/plus.png';
  					});
  			});
  			$(".title:contains('Finances')").unbind('click.'+spocklet).bind('click.'+spocklet,function(){
    				$(".stats_finance_section").stop(true,true).slideToggle(500);
    				$(this).find('img').attr('src',function(i,src){
       					 return (src.indexOf('plus.png') != -1)? 'http://t1.gstatic.com/images?q=tbn:1PS9x2Ho4LHpaM:http://www.unesco.org/ulis/imag/minus.png' :'http://t3.gstatic.com/images?q=tbn:4TZreCjs_a1eDM:http://www.venice.coe.int/images/plus.png';
  					});

  			});
  			$("#spexpcollapse").unbind('click.'+spocklet).bind('click.'+spocklet,function(){

       				 $(this).html(function(i,html) {
            			if (html.indexOf('Expand') != -1 ){
               				html = html.replace('Expand','Collapse');
               				$(".nice_list").show();
							$(".stats_finance_section").show();
           				} else {
            				html = html.replace('Collapse','Expand');
            				$(".nice_list").hide();
							$(".stats_finance_section").hide();
           				 }
           				 return html;
        			});
        			$(this).find('img').attr('src',function(i,src){
       					 return (src.indexOf('plus.png') != -1)? 'http://t1.gstatic.com/images?q=tbn:1PS9x2Ho4LHpaM:http://www.unesco.org/ulis/imag/minus.png' :'http://t3.gstatic.com/images?q=tbn:4TZreCjs_a1eDM:http://www.venice.coe.int/images/plus.png';
  					});
			});
   }

   	function skill_popup_5(){
		if ($('#skill_popuptemplate .sexy_skill_5').length==0) {
			$('#skill_popuptemplate li.clearfix > a').each(function(){
				$(this).before($(this).clone().wrap('<div>').parent().html().replace('sexy_skill_1','sexy_skill_5').replace('upgrade_amt=1','upgrade_amt=5'));
				$(this).parent().find('.sexy_skill_5').attr('title','By Spockholm Toolbar');
			});
		}
	}

	function unionhall3(){
		if(MW.PropertiesV2HPMod) { // only on homepage
			if(typeof MW.PropertiesV2HPMod.spockPostCollect == 'undefined'){
				MW.PropertiesV2HPMod.getConfirmationMarkup = function(label, value) {
					return '<div class="">' + label + ': ' + value + '</div>';
				}
				MW.PropertiesV2HPMod.spockPostCollect = function(msg, context){
					$(context).hide();
					var data = JSON.parse(msg.data);
					var markup = '';
					if (data.CASH && data.CASH != 0) {
						markup += MW.PropertiesV2HPMod.getConfirmationMarkup('Cash', data.CASH);
					}
					if (data.STAMINA && data.STAMINA > 0) {
						markup += MW.PropertiesV2HPMod.getConfirmationMarkup('Stamina', data.STAMINA);
					}
					if (data.ENERGY && data.ENERGY > 0) {
						markup += MW.PropertiesV2HPMod.getConfirmationMarkup('Energy', data.ENERGY);
					}
					if(data.SPECIALREWARD_NAME && data.SPECIALREWARD_NAME != ''){
						markup += MW.PropertiesV2HPMod.getConfirmationMarkup('Prec. Item', '<span title="Spockified feature!">'+data.SPECIALREWARD_NAME+data.SPECIALREWARD_IMAGE.replace(/75px/g,'25px').replace('border:0px;','vertical-align:middle;padding-left:5px;')+'</span>');
					}
					if (markup != '') {
						$('#propv2-confirmation-other').html(markup);
					}
					else {
						$('#propv2-confirmation-other').html('');
					}
					$('#propv2-confirmation-craft').parent().hide();
					$('#propv2-hp-confirmation').height(250).show();
				}
			}
			if (!$('#PropertiesV2Module').attr('spdone')) {
				$('#propv2-coll-brazil-cont li:last').before('<a title="Cast Taskmaster (Spockholm Toolbar)" style="margin: 10px 0px 10px 0px; height:35px;" href="#" class="sexy_button_new short green '+spocklet+'_unionhallcollect" data-city="7"><span><span>Taskmaster</span></span></a>');
				$('#propv2-coll-chicago-cont li:last').before('<a title="Cast Taskmaster (Spockholm Toolbar)" style="margin: 10px 0px 10px 0px; height:35px;" href="#" class="sexy_button_new short green '+spocklet+'_unionhallcollect" data-city="8"><span><span>Taskmaster</span></span></a>');
				$('#propv2-coll-london-cont li:last').before('<a title="Cast Taskmaster (Spockholm Toolbar)" style="margin: 10px 0px 10px 0px; height:35px;" href="#" class="sexy_button_new short green '+spocklet+'_unionhallcollect" data-city="9"><span><span>Taskmaster</span></span></a>');
				$('.'+spocklet+'_unionhallcollect').click(function(){
					$(this).addClass('disabled');
					var $this=$(this);
					var city=parseInt($(this).attr('data-city'));
					var crew=1; // taskmaster

					var url='?xw_controller=CityCrew&xw_action=activate&xw_city='+city+'&tmp=&cb=&mwcom=1&isajax=1&crew_city='+city+'&crew_type=prop&crew_dsp_type=prop&crew_slot='+crew+'&xw_client_id=8';
					request(url,function(msg){
						try {
							var json=JSON.parse(msg);
							$this.after(' Taskmaster:'+json.data.crewstatus + ' ' + json.data.crewmsg);
						} catch(e) {}
					},function(msg){
						$this.after(' <font color="red">Error while trying to use crew.</font>');
					});
					return false;
				});
				if($('.'+spocklet+'_unionhallcollect').length>0) {
					$('#PropertiesV2Module').attr('spdone', 'true');
				}
				try {
					var shref = $('#propv2-collectall-7').find('a:first').attr('href').replace('&js=1&version=v2','');
					$('#propv2-collectall-7').find('a:first').attr('callback','MW.PropertiesV2HPMod.spockPostCollect').attr('href',shref);
					$('#propv2-coll-7-5,#propv2-coll-7-6,#propv2-coll-7-7').each(function(){
						var link = $(this).find('.action > a');
						if (link.attr('href')) {
							link.attr('callback','MW.PropertiesV2HPMod.spockPostCollect').attr('href',link.attr('href').replace('&js=1&version=v2','')).html('Collect+').attr('title','Collect Gems with Spockholm Toolbar');
						}
					});
				}
				catch (ignoreerr){}
				$('.m_collect_all_btn').after('<a href="#" class="sexy_button_new sexy_button_new short black impulse_buy m_collect_all_btn" id="'+spocklet+'_collect_all_confirm" title="Spockholm Collect All w/ Confirmation"><span><span style="background-image:url(\'https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/item_treasure_chest_key.gif\');background-size:20px;background-position:3px 4px;padding-left:26px;">Collect All</span></span></a>');
				$('.m_collect_all_btn:first').css({'position':'fixed','left':'-999999px'}).hide();
				$('#'+spocklet+'_collect_all_confirm').click(function(){
					if(confirm('Do you really want to collect ALL those properties?')){
						$('.m_collect_all_btn:first').trigger('click');
						$(this).hide();
					}
				});
			}
		}
		
	}

	function check_notifications(){
		try {
			var notif=JSON.parse(window.localStorage.getItem(spocklet+'_notif_'+User.trackId));
			notif.test=1;
			notifications=notif;
		} catch(e){ }

		if(config.settings.notify_progression){
			if(!notifications.progression) { notifications.progression=0; }
			if(parseInt(notifications.progression)+3600<unix_timestamp()) {
				if($('#clan_xp_meter .complete').length>0){
					window.webkitNotifications.createNotification('https://zyngapv.hs.llnwd.net/e6/mwfb/graphics/map_based_jobs/mastery_stars_med_81x30_02.png', 'Collect your Family Progression now!', 'Remaining time: '+$('#clanXpResetTimer').text()).show();

					notifications.progression=unix_timestamp();
				}
			}
		}

		if(config.settings.notify_war){
			if(!notifications.war) { notifications.war=0; }
			if(parseInt(notifications.war)+3600<unix_timestamp()) {
				if($('#clan_xp_icon .userInClanBattleShow').css('display')=="block"){
					window.webkitNotifications.createNotification('https://zyngapv.hs.llnwd.net/e6/mwfb/graphics/clan/battle/battle_is_on.png', 'Family Battle running against '+$('#clanQuestBarName2').text(), 'Remaining time: '+$('#clanBattleQuestTimeEnd').text()).show();
					notifications.war=unix_timestamp();
				}
			}
		}

		if(config.settings.notify_skillpoint){
			if(!notifications.skillpoint) { notifications.skillpoint=0; }
			if(parseInt(notifications.skillpoint)+900<unix_timestamp()) {
				notifications.skillpoint=unix_timestamp();
				request('?xw_controller=marketplace&xw_action=marketplace_category&xw_city=1&category=2&subtype=-1&favor_type=1&favor_id=4%2C18%2C19%2C20',function(msg){
					if(/mwfb\/graphics\/huge_buy_reallocate_01.png/.test(msg)){
						window.webkitNotifications.createNotification('https://zyngapv.hs.llnwd.net/e6/mwfb/graphics/huge_buy_reallocate_01.png', 'Skillpoint reallocation', 'Skillpoint reallocation is active!').show();
					}
				});
			}
		}

		if(config.settings.notify_twitter){
			if(!notifications.twitter) { notifications.twitter=0; }
			if(parseInt(notifications.twitter)+600<unix_timestamp()) {
				notifications.twitter=unix_timestamp();
				$.ajax({
					dataType: "jsonp",
					jsonpCallback: 'jsonp'+unix_timestamp()+parseInt(Math.random()*1000),
					url: "https://api.twitter.com/1/statuses/user_timeline.json?screen_name=spockholm&count=2" ,
					success: function(msg){
						var last=readCookie(spocklet+'_twitterupdate');
						for(var i=0;i<msg.length;i++){
							var twit=msg[i];
							var posttime=Date.parse(twit.created_at);

							if(posttime>parseInt(last)) {
								var notification=window.webkitNotifications.createNotification(twit.user.profile_image_url, 'Spockholm-Info via Twitter: @spockholm ', twit.text)
								notification.onclick = function() { window.open('https://twitter.com/#!/spockholm'); };
								notification.show();
							}
						}
						last=(new Date()).getTime();
						createCookie(spocklet+'_twitterupdate',last);
					}
				});
			}
		}
		
		if(config.settings.notify_mwll) {
			if(!notifications.mwll) { notifications.mwll=0; }
			if(parseInt(notifications.mwll)+900<unix_timestamp()) {
				notifications.mwll=unix_timestamp();
				if(!notifications.mwll_last) { notifications.mwll_last=0; }
				$.ajax({
					dataType: "jsonp",
					jsonpCallback: 'jsonp'+unix_timestamp()+parseInt(Math.random()*1000),
					url: "https://www.googleapis.com/blogger/v3/blogs/4747349059586729593/posts?key=AIzaSyCmZHs5JanXZS1mYE07JfZRigmX6XioG_M" ,
					success: function(msg){
						for(var i=0;i<msg.items.length;i++){
							var item=msg.items[i];
							var posttime=(new Date(item.published)).getTime()/1000;
							if(posttime>notifications.mwll_last) {
								var img=$(item.content.replace('<img','<noimg')).find('noimg:first').attr('src') || item.author.image.url;
								var notification=window.webkitNotifications.createNotification(img, 'New MWLL-post', item.title);
								//notification.onclick = function() { window.open('https://twitter.com/#!/spockholm'); };
								notification.show();							
							}
						}
						notifications=JSON.parse(window.localStorage.getItem(spocklet+'_notif_'+User.trackId));
						notifications.mwll_last=unix_timestamp();
						window.localStorage.setItem(spocklet+'_notif_'+User.trackId, JSON.stringify(notifications));
						
					}
				});
			}
		}
		if(config.settings.notify_fbf) {
			if(!notifications.fbf) { notifications.fbf=0; }
			if(parseInt(notifications.fbf)+600<unix_timestamp()) {
				notifications.fbf=unix_timestamp();
				request('?xw_controller=Epicclanboss&xw_action=list_view&xw_client_id=8&mwcom=1',function(msg){
					if(msg.indexOf('Get More Ammo')!=-1){
						var notification=window.webkitNotifications.createNotification('https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/epicbossfight/bosses/MickGouda/bossfightOperationsMickGouda_BG.jpg', 'Bossfight is active!', 'Family boss fight is active now');
						notification.show();
					} else if (msg.indexOf('<span>Collect</span>')!=-1){
						var notification=window.webkitNotifications.createNotification('https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/epicbossfight/bosses/MickGouda/bossfightOperationsMickGouda_BG.jpg', 'Bossfight is not collected!', 'Collect your previous boss fight loot now!');
						notification.show();
					}
				});
			}
		}
		if(config.settings.notify_raven) {
			if(!notifications.raven) { notifications.raven=0; }
			if(parseInt(notifications.raven)+600<unix_timestamp()) {
				notifications.raven=unix_timestamp();
				request('?xw_controller=socialmission&xw_action=operations_view&type=bossfight&xw_client_id=8',function(msg){
					if(msg.indexOf('THE RAVEN')!=-1){
						var timeleft=/time_left: (\d+)/.exec(msg);
						if(timeleft) { timeleft=timeleft[1]; } else { timeleft=""; }
						var notification=window.webkitNotifications.createNotification('https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/bossfightv2/bossPics/raven/Fight-Assassin-Pic.png', 'Raven is active for next '+tl(timeleft), 'Kill him now or collect consumables!');
						notification.show();
					}
				});
			}
		}
		if(config.settings.notify_raven_lurk) {
			if(!notifications.raven_lurk) { notifications.raven_lurk=0; }
			if(parseInt(notifications.raven_lurk)+1800<unix_timestamp()) {
				notifications.raven_lurk=unix_timestamp();
				request('?xw_controller=index&xw_action=view',function(msg){
					if(msg.indexOf('raven/watch_out_01.png')!=-1){
						var notification=window.webkitNotifications.createNotification('https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/bossfightv2/bossPics/raven/Fight-Assassin-Pic.png', 'Raven is lurking', 'Find him now or collect consumables!');
						notification.show();
					}
				});
			}
		}
		try {
			window.localStorage.setItem(spocklet+'_notif_'+User.trackId, JSON.stringify(notifications));
		} catch(e){ }
	}

	function tl(i){
		var h=Math.floor(i/3600);
		i-=h*3600;
		var m=Math.floor(i/60);
		return h+':'+(m<10?'0':'')+m+'h';

	}

	function nospamposts(){
		if(config.settings.killspam) {
			MW.COGS.doCOGSPublish=(function(){});
		}
	}

	function noautopost(onoff){
		if(onoff) {
			// turn on
			if(!MW.Feed2) {
				MW.Feed2 = MW.Feed;
				// thanks Brandon
				MW.Feed = function(feed,fallback){
					feed.autoPublish = false;
					MW.Feed2(feed,fallback);
				}
			}
		} else {
			if(MW.Feed2) {
				// turn off
				MW.Feed=MW.Feed2;
				delete MW.Feed2;
			}
		}
	}

	function float_toolbar() {
		$(document).bind('scroll',function(){
			var scroll = $(document).scrollTop();
			var display = $('#'+spocklet+'_config').css('display');
			var display2 = $('#'+spocklet+'_spocklets_menu').css('display');
			if (scroll > 10 && (display == 'none') && (display2 == 'none')) {
				$('#spockholm_toolbar').css({'position':'fixed'});
			}
			else {
				$('#spockholm_toolbar').css({'position':''});
			}
		});
	}

	// TODO: Pete
	function quickfighter(xhr){
		$('#wrapper_items_won').remove();
		var msg = xhr.responseText.replace(/^[\s\d\s]+/,'');
		try{if(msg.charAt(0) == '{'){msg = JSON.parse(xhr.responseText);}}catch(err){msg = null;}
		if(msg && msg.fight_result && msg.fight_result.feed_js){
			var ice;
			try{
				ice = /description:'(.*)', userMessage:/.exec(msg.fight_result.feed_js)[1].replace(/\\/g,'');
			}catch(iceerr){};
			if(ice && !document.getElementById(spocklet+'_copy_ice')){
				$('#fight_wrapper').after('<textarea id="'+spocklet+'_icetext" style="float:right;width:250px;height:94px;margin-top:-25px;">'+ice+'</textarea>');
				$('#'+spocklet+'_icetext').focus().select();
				ZeroClipboard.setMoviePath('http://spocklet.com/bookmarklet/res/ZeroClipboard.swf');
				ice = ice.split('. ')[0];
				$('.fv2_defender_overlay_brag_action').find('a:first').removeClass('medium').addClass('short').html('<span><span>Share</span></span>').after('<a href="#" style="margin-left:8px;" class="sexy_button_new short green" style="display:none;" id="'+spocklet+'_copy_ice"><span><span>Copy Ice</span></span></a>');
				var clip = new ZeroClipboard.Client();
				clip.addEventListener('complete', function(client, text) {
					$('#'+spocklet+'_copy_ice').addClass('disabled').html('<span><span>Copied</span></span>');
				});
				clip.addEventListener('onLoad', function(){
					$('#'+spocklet+'_copy_ice').show();
				});
				clip.setText(ice);
				clip.glue(spocklet+'_copy_ice')
				if(document.getElementById('iced_event_iced_popup')){
					$('#iced_event_iced_popup').hide();
					var ices = $('#iced_event_iced_status_fightstats_count').text().replace(/[^0-9]/g,'');
					var needed = $('#iced_event_iced_status_mastery_level_next_text').text().replace(/[^0-9]/g,'');
					$('#fight_wrapper').after('<div id="'+spocklet+'_icestats" style="padding-left:30px;float:left;width:250px;height:94px;margin-top:-25px;">Event Ices: '+ices+'<br/>Ices Needed: '+needed+'<br/><a class="mw_new_ajax" href="javascript:void(0);" onclick="$(\'#iced_event_iced_popup\').parent().show();$(\'#iced_event_iced_popup\').show();return false;">Show Popup</a></div>');
					setTimeout(function(){$('#iced_event_iced_popup').parent().hide()},100);
				}
			}
		}
	}

	function saveConfig(){
		try {
			window.localStorage.setItem(spocklet+'_config_'+User.trackId,JSON.stringify(config));
		} catch(e) {
			alert('Your localstorage is probably full, please run Cookie-a-Nator from the toolbar and "Delete Junk". Error message was: '+e.toString());
		}
	}

	function loadConfig(){
		try {
			var cookie=window.localStorage.getItem(spocklet+'_config_'+User.trackId);
			if (cookie) {
				var newconfig=JSON.parse(cookie);
				config=newconfig;
			}
			if (config.settings.dataversion<19) {
				config.settings.spockletversion = spockletversion;
				config.settings.dataversion=19;
				config.settings.notify_fbf = false;
				saveConfig();
			}
			if (config.settings.spockletversion != spockletversion) {
				config.settings.spockletversion = spockletversion;
				loadSpocklets(true); // force reload
				setTimeout(showNotify,1000);
				saveConfig();
			}
		} catch(ignore) {}
	}
	loadConfig();

	function showNotify(){
		$('#'+spocklet+'_spocklets_header').after('<span id="'+spocklet+'_newlabel" class="'+spocklet+'_label important" style="cursor:pointer;">New Spocklets!</span>');
		$('#'+spocklet+'_newlabel').click(function(){ $('#'+spocklet+'_config_toggle').trigger('click'); $(this).remove(); });
		$('#'+spocklet+'_newlabel').effect("pulsate", { times:10 }, 1000,function(){ $(this).remove(); });
	}

	function loadSpocklets(force){
		// check if it can be used from cache
		var usecache=false, cacheSpocklets;
		try {
			var cacheSpocklets = JSON.parse(window.localStorage.getItem(spocklet+'_cache_'+User.trackId));
			if (cacheSpocklets && (cacheSpocklets.updated>unix_timestamp()-86400)) {
				usecache = true;
			}
			if (force) { usecache = false; }
		} catch(e) {}
		if (usecache) {
			loadSpockletList(cacheSpocklets.list);
		} else {
			var password=readCookie(spocklet+'_goldpw');
			$.ajax({
				dataType: "jsonp",
				jsonpCallback: 'jsonp'+unix_timestamp()+parseInt(Math.random()*1000),
				timeout: 20000,
				data: {
					r:Math.random(),
					user:User.trackId,
					pass:password,
					desc:1
				},
				url: "//spockon.me/tb/list-o-spocklets.php" ,
				success: function(msg){
					try {
						window.localStorage.setItem(spocklet+'_cache_'+User.trackId,JSON.stringify({updated:unix_timestamp(),list:msg}));
					} catch(e) {
						alert('Spockholm Toolbar reporting:\nYour localstorage is probably full, please run Cookie-a-Nator from the toolbar and "Delete Junk". Error message was: '+e.toString());
					}
					loadSpockletList(msg);
				},
				error: function(msg) {
					try {
						if (cacheSpocklets) {
							//cache exists
							loadSpockletList(cacheSpocklets.list);
						}
						else {
							//no cache, but try local items
							alert('Spockholm Toolbar reporting: He is dead, Jim!\n\n- The spocklet list failed to load from Spockholm server.\n- Local cache backup list failed too.\n\nToolbar can now only show manually added spocklets.\nTo avoid this, do not clear local cache.\n\nRead more and add spocklets on:\nhttp://www2.spockholm.com');
							loadSpockletList();
						}
					}
					catch (e) {
						alert('Spockholm Toolbar reporting:\nFailed to load Spocklet list (no-cache). Failed to load local spocklet list (no-server). Error message was: '+e.toString());
					}
				}
			});
		}
	}
	loadSpocklets();

	function loadSpockletList(msg){
		spocklets={};
		if (msg) {
			for(var i=0;i<msg.length;i++){
				spocklets[msg[i].SpockletID]={ name:msg[i].SpockletName, src:msg[i].PrimaryURL, backup:msg[i].BackupURL, tag:msg[i].tstatus, desc:$('<div>'+msg[i].Description+'</div>').text() };
			}
		}
		for(var i=0;i<config.own.length;i++) {
			spocklets["o"+i]=config.own[i];
		}
		write_scripts();
	}

	function sptag(tag){
		switch(tag) {
			case "beta": return '<span class="'+spocklet+'_label important">beta!</span>'; break;
			case "new": return '<span class="'+spocklet+'_label notice">new!</span>'; break;
			case "updated": return '<span class="'+spocklet+'_label warning">updated!</span>'; break;
			default: return '';
		}
	}

	function showConfigItems(){
		var i,j,htmlact='<table width="100%"><tr><th>Spocklet</th><!--th>Link</th><th>Page</th--><th>Actions</th></tr>',
			htmlown=htmllib=htmlin=htmlact, htmlbuttons='',htmlincount=0,htmlowncount=0,htmllibcount=0, sorted=[];
		var changes={}, firstRunAfterUpdate=false;
		htmlbuttons=
		'<a href="#" id="'+spocklet+'_cfgadditem" class="sexy_button_new green short" title="Add new Spocklet" alt="Add new Spocklet"><span><span>Add new Spocklet</span></span></a> &nbsp; '+
		'<a href="#" id="'+spocklet+'_cfgaddjson" class="sexy_button_new green short" title="Import Spocklet from code" alt="Import Spocklet from code"><span><span>Import Spocklet from code</span></span></a>';

		for(var i in spocklets){
			if(i.indexOf("o")==-1) {
				sorted.push(i);
			}
		}
		sorted.sort(function(a,b){
			if (spocklets[a].name>spocklets[b].name) {
				return 1;
			} else if (spocklets[a].name<spocklets[b].name) {
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
			var name = spocklets[i].name;
			var active = config.sorted.indexOf(i)!=-1;

			var s='<tr><td style="padding: 2px; border-bottom: 1px solid #999; background-color:'+(active?'green':'')+'"><a href="#" alt="'+spocklets[i].desc+'" title="'+spocklets[i].desc+'" class="'+spocklet+'_cfgitem" cfgid="'+i+'"><span><span style="color: '+(active?'#FFF':'')+'">'+changed+name+'</span></span> '+sptag(spocklets[i].tag)+'</a></td>'+
			'<!--td style="border-bottom: 1px solid #999;"><span title="'+spocklets[i].src+'">script</span></td>'+
			'<td style="border-bottom: 1px solid #999;">'+spocklets[i].page+'</td-->'+
			'<td style="border-bottom: 1px solid #999;"></td>'+
			'</tr>';
			htmlin+=s;htmlincount++;
		}

		for(i=0;i<config.own.length;i++) {
			var name=config.own[i].name;
			var active = config.sorted.indexOf("o"+i)!=-1;

			var s='<tr><td style="padding: 2px; border-bottom: 1px solid #999; background-color:'+(active?'green':'')+'"><a href="#" alt="'+name+'" title="'+name+'" class="'+spocklet+'_cfgitem" cfgid="o'+i+'"><span><span style="color: '+(active?'#FFF':'')+'">'+name+'</span></span></a></td>'+
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
		$('#'+spocklet+'_tab1count').html(htmlincount);
		$('#'+spocklet+'_tab2count').html(htmlowncount);

		$('#'+spocklet+'_listtabs').tabs();

		$('#'+spocklet+'_cfgbank').prop('checked',config.settings.bank);
		$('#'+spocklet+'_cfgheal').prop('checked',config.settings.heal);
		$('#'+spocklet+'_cfghide').prop('checked',config.settings.hide);
		$('#'+spocklet+'_cfgnotify').prop('checked',config.settings.notify);
		$('#'+spocklet+'_cfgnotify_war').prop('checked',config.settings.notify_war);
		$('#'+spocklet+'_cfgnotify_skillpoint').prop('checked',config.settings.notify_skillpoint);
		$('#'+spocklet+'_cfgnotify_progression').prop('checked',config.settings.notify_progression);
		$('#'+spocklet+'_cfgnotify_twitter').prop('checked',config.settings.notify_twitter);
		$('#'+spocklet+'_cfgnotify_fbf').prop('checked',config.settings.notify_fbf);
		$('#'+spocklet+'_cfgnotify_raven').prop('checked',config.settings.notify_raven);
		$('#'+spocklet+'_cfgnotify_raven_lurk').prop('checked',config.settings.notify_raven_lurk);
		$('#'+spocklet+'_cfgnotify_mwll').prop('checked',config.settings.notify_mwll);
		$('#'+spocklet+'_cfgnoautopost').prop('checked',config.settings.noautopost);
		$('#'+spocklet+'_cfgkillspam').prop('checked',config.settings.killspam);
		$('#'+spocklet+'_cfgquickfight').prop('checked',config.settings.quickfight);
		$('#'+spocklet+'_cfgmenues').prop('checked',config.settings.menues);
		$('#'+spocklet+'_cfgwarlink').prop('checked',config.settings.warlink);

		$('#'+spocklet+'_cfgchecklist').prop('checked',config.settings.checklist);
		$('#'+spocklet+'_cfgchecklist_server').prop('checked',config.settings.checklist_server);
		$('#'+spocklet+'_cfgchecklist_hide').prop('checked',config.settings.checklist_hide);

		$('#'+spocklet+'_cfgvisualxp').prop('checked',config.settings.visualxp);
		$('#'+spocklet+'_cfgrpconfirm').prop('checked',config.settings.rpconfirm);
		$('#'+spocklet+'_cfgunionhall').prop('checked',config.settings.unionhall);

		$('.'+spocklet+'_cfgitemdel').click(function(){
			var i=parseInt($(this).attr("cfgid"));
			config.own.splice(i,1);
			// bad workaround for a problem: config.own is an array list, but config.sorted used the id. so if you delete #i, all number >i must be decreased by one.
			// using an object instead of array would have been smarter. Will maybe change that later.
			for(var j=0;j<config.sorted.length;j++){
				if(config.sorted[j].substr(0,1)=="o") {
					var k=parseInt(config.sorted[j].substr(1));
					if(k>i) {
						config.sorted[j]="o"+(k-1);
					}
					if(k==i) {
						config.sorted.splice(j,1);
						j--;
					}
				}
			}
			// same fix for spocklets
			for(var i=0;i<config.own.length;i++) {
				spocklets["o"+i]=config.own[i];
			}
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
				link: 'http://apps.facebook.com/inthemafia/track.php?next_controller=index&next_action=view&next_params=%7B%22spockholm_toolbar%22%3A%22'+escape(btoa(JSON.stringify(config.own[i])))+'%22%7D',
				picture: 'http://cdn.spocklet.com/toolbar-logo.png',
				description: 'Click the link, and '+config.own[i].name+' will be automatically added to your toolbar!'
			});
		});
		$('.'+spocklet+'_cfgitemexp2').click(function(){
			var i=$(this).attr("cfgid");
			FB.ui({
				method: 'send',
				name: 'Import this to your Spockholm Toolbar: '+config.own[i].name,
				link: 'http://apps.facebook.com/inthemafia/track.php?next_controller=index&next_action=view&next_params=%7B%22spockholm_toolbar%22%3A%22'+escape(btoa(JSON.stringify(config.own[i])))+'%22%7D',
				picture: 'http://cdn.spocklet.com/toolbar-logo.png',
				description: 'Click the link, and '+config.own[i].name+' will be automatically added to your toolbar!',
				to: '173236399415354'
			});
		});
		$('.'+spocklet+'_cfgitem').click(function(){
			var i=$(this).attr("cfgid");
			if (config.sorted.indexOf(i)==-1) {
				config.sorted.push(i);
			} else {
				config.sorted.splice(config.sorted.indexOf(i),1);
			}
			saveConfig();
			showConfigItems();
			write_scripts();
			return false;
		});

		$('#'+spocklet+'_cfgadditem').click(function(){
			var name=prompt('Please enter the name of the spocklet.');
			var m,src,presrc=prompt('Please enter the URL of the spocklet or the complete bookmarklet code.');
			if (m=/(https?:\/\/.*\.js\?.*)$/.exec(presrc)) {
				src=m[1];
			} else if (m=/(https?:\/\/.*\.js)/.exec(presrc)) {
				src=m[1];
			} else {
				alert("No script found");
			}
			if (src && name) {
				config.own.push({ name:name, src:src, page:''});
				config.sorted.push("o"+(config.own.length-1));
				spocklets["o"+(config.own.length-1)]=config.own[config.own.length-1];
				saveConfig();
				showConfigItems();
				write_scripts();
			}
		});

		$('#'+spocklet+'_cfgaddjson').click(function(){
			var code,json=prompt("Please paste the code");
			json=json.replace(/[^a-zA-Z0-9\=\/\+\-\_]/g,'');
			add_code(json);
		});
		$("#"+spocklet+"_config").show();
	}

	function add_code(json) {
		try {
			code=JSON.parse(atob(json));
		} catch(e) { code=null; }
		if(code && code.name && code.src){
			var really=false;
			if(isSpocklet(code.src)) {
				config.own.push(code);
				config.sorted.push("o"+(config.own.length-1));
				spocklets["o"+(config.own.length-1)]=config.own[config.own.length-1];
				saveConfig();
				showConfigItems();
				write_scripts();
				alert(code.name+' has been added to your toolbar.');
			} else {
				$('#popup_fodder').append('<div id="'+spocklet+'_dialog">!!! Warning! The code you are adding is not from a trusted source (no Spockholm Code) !!!\r\nMalicious code can do anything with your account, from reading your stats to sending your items. \r\nDo you really want to add that unknown script?</div>');
				$('#'+spocklet+'_dialog').dialog({
						title:"Warning!", position:['center',50], width:500, buttons: { "Yes, I know the risk": function() {
						config.own.push(code);
						config.sorted.push("o"+(config.own.length-1));
						spocklets["o"+(config.own.length-1)]=config.own[config.own.length-1];
						saveConfig();
						showConfigItems();
						write_scripts();
						alert(code.name+' has been added to your toolbar.');
						$(this).remove();
					},
					"No, I want to be safe": function(){
						$(this).remove();
					}
				} });
			}
		} else {
			alert("Error occured. Maybe code was wrong!");
		}
	}

	// get controller from the url
	// credits to David Cabrera from the MWAddon. Great idea!!
	function add_plugin(){
		var m,code;
		if(m=/spockholm_toolbar=(ey[^\&]+)&/.exec(document.location.href)){
			code=m[1];
			add_code(unescape(code));
		}
	}

	$('head').append('<link media="all" type="text/css" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.14/themes/ui-darkness/jquery-ui.css" rel="stylesheet">');
	var goldencolor = "hsl(46,65%,52%)";
	var goldenbackground = 'background-image:-webkit-linear-gradient(top, #000000, '+goldencolor+');'+
		'background-image:-moz-linear-gradient(top, #000000, '+goldencolor+');'+
		'background-image:-o-linear-gradient(top, #000000, '+goldencolor+');'+
		'background-image:linear-gradient(to bottom, #000000, '+goldencolor+');';
	var defaultcolor = "#333333";
	var background = 'background-image:-webkit-linear-gradient(top, #000000, '+defaultcolor+');'+
		'background-image:-moz-linear-gradient(top, #000000, '+defaultcolor+');'+
		'background-image:-o-linear-gradient(top, #000000, '+defaultcolor+');'+
		'background-image:linear-gradient(to bottom, #000000, '+defaultcolor+');';

	$('#spockholm_toolbar').html(
		'<style type="text/css">'+
		'.'+spocklet+'_golden {'+goldenbackground+'}'+
		'.'+spocklet+'_label{padding:1px 3px 2px;font-size:9.75px;font-weight:bold;color:#ffffff;text-transform:uppercase;white-space:nowrap;background-color:#bfbfbf;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;}.'+spocklet+'_label.important{background-color:#c43c35;} .'+spocklet+'_label.warning{background-color:#f89406;}.'+spocklet+'_label.notice { background-color: #62cffc;}'+
		'.'+spocklet+'_notgolden {'+background+'}'+
		'</style>'+
		'<div id="'+spocklet+'_header" style="display:inline; padding-left: 5px; padding-right: 5px;"><a href="http://www.facebook.com/mafiatools/" target="_blank" class="sexy_button_new short white" title="'+version+' - Click to visit Fan Page" alt="'+version+' - Click to visit Fan Page" style="margin-top:3px;"><span><span><img src="'+toolbar_logo+'" width="18" height="16" /></span></span></a></div>'+
			'&nbsp;<div id="'+spocklet+'_spocklets_header" style="display:inline; width: 175px; padding-right: 5px;"><a href="#" class="sexy_button_new short black" title="Click to show/hide Spocklets" alt="Click to show/hide	Spocklets"><span><span style="background: url(http://mwfb.static.zgncdn.com/mwfb/graphics/dropdown_travel_arrow.gif) no-repeat scroll right 50%; margin-right: 15px;">SPOCKLETS</span></span></a>'+
			'<div id="'+spocklet+'_spocklets_menu" style="display:none; z-index:10004; background-color: #333; position: absolute; left:60px;"></div>'+
		'</div>'+
		'<div style="float:right;">'+
			'<div style="display:inline;"><input class="ui-widget" size=13 style="border: 1px solid #888888; -moz-border-radius: 3px; border-radius: 3px; -webkit-border-radius: 2px;padding 0;background: #000; margin-top:2px; color: #FFF;" id="'+spocklet+'_search" value="Search..." title="Search for Spocklets"></div> &nbsp;'+
			'&nbsp;<div id="'+spocklet+'_ratios" style="display:inline; border-right: 1px solid #000; padding-right: 5px;"></div>'+
			'&nbsp;<div style="display:inline;"><a href="http://www.spockholm.com/mafia/donate.php?toolbar" id="'+spocklet+'_donate" class="sexy_button_new short black" target="_blank" title="Support Team Spockholm with a cup of Coffee" alt="Support Team Spockholm with a cup of Coffee"><span><span><span class="cash"></span></span></span></a></div>'+
			'&nbsp;<div style="display:inline;"><a href="#" id="'+spocklet+'_sync" class="'+spocklet+'_goldbackup sexy_button_new short black" title="Click to sync server" alt="Click to sync server"><span><span><img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/action_box_icon_refresh.gif" /></span></span></a></div>'+
			'&nbsp;<div style="display:inline; padding-right: 5px; clear:both;"><a href="#" id="'+spocklet+'_config_toggle" class="sexy_button_new short black" title="Click to open Config" alt="Click to open Config"><span><span><img src="http://mwfb.static.zgncdn.com/mwfb/graphics/v3/icon_hammer_wrench.png" /></span></span></a></div>'+
		'</div>'+
		'<div id="'+spocklet+'_config" style="z-index:1001; display:none; position: absolute; top: -40px; left: 0px;">'+
		'	<div style="display: block; left: 40px;" class="pop_box" id=""><h3 style="text-align:center;cursor:move;">Spockholm Toolbar Config</h3><a class="pop_close" id="'+spocklet+'_cfgclose" href="#"></a>'+
		'		<div style="padding: 15px 15px 0px 15px;">'+
		'		<table><tr><td valign="top">'+
		'		<h4>Display options</h4>'+
		'		<nobr><label><input type="checkbox" id="'+spocklet+'_cfgheal" checked /> Enable 1-click healing</label></nobr><br />'+
		'		<nobr><label><input type="checkbox" id="'+spocklet+'_cfgbank" checked /> Enable 1-click banking</label></nobr><br />'+
		'		<nobr><label><input type="checkbox" id="'+spocklet+'_cfgserver" /> Enable golden toolbar (<a href="http://spockon.me/tb/account.php" title="Golden Toolbar Account Page">needs account</a>)</label></nobr><br />'+
		'		<nobr><label><input type="checkbox" id="'+spocklet+'_usebackup" /> Use backup server (load scripts from alternative server)</label></nobr><br />'+
		'		<nobr><label><input type="checkbox" id="'+spocklet+'_cfghide" /> Hide iced targets on Fightlist and Battle Board</label></nobr><br />'+
		'		<nobr><label><input type="checkbox" id="'+spocklet+'_cfgvisualxp" /> Experience Visualizer (may decrease performance!)</label></nobr><br />'+
		'		<nobr><label><input type="checkbox" id="'+spocklet+'_cfgnoautopost" /> Disable Autopost</label></nobr><br />'+
		'		<nobr><label><input type="checkbox" id="'+spocklet+'_cfgrpconfirm" /> Add confirmation to RP spending</label></nobr><br />'+
		'		<nobr><label><input type="checkbox" id="'+spocklet+'_cfgunionhall" /> Improve Unionhall 3.0</label></nobr><br />'+
		'		<nobr><label><input type="checkbox" id="'+spocklet+'_cfgmenues" /> Show Dropdown-Menues </label></nobr><br />'+
		'		<nobr><label><input type="checkbox" id="'+spocklet+'_cfgwarlink" /> Show FB/MW links on War page </label></nobr><br />'+
		'		<nobr><label><input type="checkbox" id="'+spocklet+'_cfgnotify" /> Show notifications (highly experimental!)</label></nobr><br />'+
		'		<nobr> &nbsp; <label><input type="checkbox" id="'+spocklet+'_cfgnotify_progression" /> Family Progression not collected</label></nobr><br />'+
		'		<nobr> &nbsp; <label><input type="checkbox" id="'+spocklet+'_cfgnotify_war" /> Family Battle running</label></nobr><br />'+
		'		<nobr> &nbsp; <label><input type="checkbox" id="'+spocklet+'_cfgnotify_skillpoint" /> Skill point re-allocation</label></nobr><br />'+
		'		<nobr> &nbsp; <label><input type="checkbox" id="'+spocklet+'_cfgnotify_twitter" /> Spockholm News</label></nobr><br />'+
		'		<nobr> &nbsp; <label><input type="checkbox" id="'+spocklet+'_cfgnotify_mwll" /> MW Loot Lady blog news '+sptag('new')+'</label></nobr><br />'+
		'		<nobr> &nbsp; <label><input type="checkbox" id="'+spocklet+'_cfgnotify_fbf" /> Family Boss Fight active '+sptag('new')+'</label></nobr><br />'+
		'		<nobr> &nbsp; <label><input type="checkbox" id="'+spocklet+'_cfgnotify_raven" /> Raven is active</label></nobr><br />'+
		'		<nobr> &nbsp; <label><input type="checkbox" id="'+spocklet+'_cfgnotify_raven_lurk" /> Raven is lurking</label></nobr><br />'+
		'		<nobr><a href="#" id="'+spocklet+'_cfgsortnow"> Sort list now</a><br />'+
		'		<nobr><a href="#" id="'+spocklet+'_loadlist"> Force reload Spocklets</a><br />'+
		'		'+
		'		</td><td valign="top">'+
		'		<h4>Short FAQ</h4><ul>'+
		'		<li><span style="cursor:pointer;" onclick="$(\'#spfaq1\').toggle();"><u>Where can I find the healing button?</u></span><br />'+
		'		<span id="spfaq1" style="display:none;">Click on the heart-icon next to the "Health" stats. It will blink on success.</span></li>'+
		'		<li><span style="cursor:pointer;" onclick="$(\'#spfaq2\').toggle();"><u>Where can I find the banking button?</u></span><br />'+
		'		<span id="spfaq2" style="display:none;">Click on the Dollar-icon next to the "Cash" stats. It will blink on success.</span></li>'+
		'		<li><span style="cursor:pointer;" onclick="$(\'#spfaq5\').toggle();"><u>How can I contribute to the "Fan-Library"?</u></span><br />'+
		'		<span id="spfaq5" style="display:none;">Use the export icon <img src="'+exportimg2+'" /> to submit your item to the <a href="http://www.facebook.com/groups/173236399415354/" target="_blank">fan-group</a>. Provide a good description and then Team Spockholm will add it to the library.</span></li>'+
		'		<li><span>Toolbar Build: '+rev+'</span></li>'+
		'		</ul><br />'+
		'		<nobr><label><input type="checkbox" id="'+spocklet+'_cfgquickfight" /> Streamline Fightmodule </label>'+sptag('beta')+'</nobr><br />'+
		'		<nobr><label><input type="checkbox" id="'+spocklet+'_cfgchecklist" /> Autostart Checklist </label></nobr><br />'+
		'		<nobr> &nbsp; <label><input type="checkbox" id="'+spocklet+'_cfgchecklist_server" /> Use Checklist server</label></nobr><br />'+
		'		<nobr> &nbsp; <label><input type="checkbox" id="'+spocklet+'_cfgchecklist_hide" /> Start minimized</label></nobr><br />'+
		'		<nobr><label><input type="checkbox" id="'+spocklet+'_cfgkillspam" /> Disable Zynga Spam </label></nobr><br />'+
		'		</td></tr></table>'+
		'		<h4>Configure your Spocklets</h4>'+
		'		<div id="'+spocklet+'_listtabs"><ul><li><a href="#sptabs1">Standard Spocklets (<span id="'+spocklet+'_tab1count"></span>)</a></li>'+
		'		<li><a href="#sptabs2">Own Spocklets (<span id="'+spocklet+'_tab2count"></span>)</a></li>'+
		'		<li><a id="'+spocklet+'_groupload" href="#sptabs3">Toolbar Group</a></li>'+
		'		</ul>'+
		'		<div id="sptabs1">'+
		'		<div id="'+spocklet+'_listinactive" style="overflow: scroll; height: 600px;" class="'+spocklet+'_list">'+
		'		</div>'+
		'		</div>'+
		'		<div id="sptabs2">'+
		'		<div id="'+spocklet+'_listown" class="'+spocklet+'_list">'+
		'		</div>'+
		'		</div>'+
		'		<div id="sptabs3">'+
		'		<div id="'+spocklet+'_listgroup" class="'+spocklet+'_list" style="text-align: center;">'+
		'		<img src="http://zyngapv.hs.llnwd.net/e6/mwfb/graphics/socialmissions/ajax-loader.gif" alt="Loading...Please wait" style="width:100px;height:100px;"/>'+
		'		</div>'+
		'		</div>'+
		'		</div>'+
		'		<br />'+
		'		</div>'+
		'	</div>'+
		'</div>'+
		'<div id="'+spocklet+'_syncpop" style="z-index:1002; display:none; position: absolute; top: -40px; left: 0px;">'+
		'	<div style="display: block; left: 40px;" class="pop_box" id=""><h3 style="text-align:center;cursor:move;">Sync with server</h3><a class="pop_close" onclick="$(\'#'+spocklet+'_sync\').click();" href="#"></a>'+
		'		<div style="padding: 15px 15px 0px 15px;">'+
		'		<div><a href="#" id="'+spocklet+'_loadnow" class="sexy_button_new short green"><span><span>Load settings from server</span></span></a></div>'+
		'		<div id="'+spocklet+'_loadlog"></div><br />'+
		'		<div><a href="#" id="'+spocklet+'_savenow" class="sexy_button_new short green"><span><span>Save settings to server</span></span></a></div>'+
		'		<div id="'+spocklet+'_savelog"></div>'+
		'		<br /><br /></div>'+
		'	</div>'+
		'</div>'
	);
	$('.'+spocklet+'_gold').hide();
	$('.'+spocklet+'_goldbackup').hide();

	$('#spockholm_toolbar').css({
		'background-color': '#333333',
		'z-index': '10002',
		'display': 'block',
		'color': '#FFF',
		'height':'33px',
		'width':'760px',
		'margin-top': '2px',
		'margin-bottom': '5px',
		'border-color': '#000000',
		'-moz-border-radius': '5px',
	    'border-radius': '5px',
	    '-webkit-border-radius': '5px'
	}).addClass(spocklet+'_notgolden');
	$('#'+spocklet+'_groupload').click(function(){
		if(!$(this).hasClass('loaded')){
			$(this).addClass('loaded');
			var access_token = FB.getAuthResponse().accessToken;
			FB.api('/173236399415354/feed?limit=50&access_token='+access_token, function(response){
				var good_posts = [];
				for(var x=0;x<response.data.length;x++) {
					var object = response.data[x];
					if(object.name && /Import this to your Spockholm Toolbar/.test(object.name)){
						good_posts.push(object);
					}
				}
				var html = '<table width="100%"><tbody>';
				for(var i=0,len=good_posts.length;i<len;i++){
					try{
						var obj = good_posts[i];
						var json = JSON.parse(atob(/toolbar":"(.*)"/.exec(decodeURIComponent(obj.link))[1]));
						var name = json.name;
						var poster = obj.from;
						var descrip = obj.message?obj.message:'';
						var time = obj.created_time.substr(0,10); //(new Date(obj.created_time)).toLocaleDateString().split(',')[1];
						var code = btoa(JSON.stringify(json));
						html += '<tr>'+
							'<td><img style="vertical-align:middle;width:25px;height:25px;" src="https://graph.facebook.com/'+poster.id+'/picture?type=square" />&nbsp;'+poster.name+'</td>'+
							'<td>&nbsp;'+name+'</td>'+
							'<td>&nbsp;'+time+'</td>'+
							'<td><a href="#" data-code="'+code+'" class="'+spocklet+'_add_group_item" style="color: #FFD927;">Add</a></td>'+
							'</tr>'+
							'<tr><td colspan="4" style="border-bottom: 1px solid #999;max-width:570px;word-break:break-all;">&nbsp;'+descrip+'</td></tr>';
					}catch(e){}
				}
				html += '</tbody></table>';
				$('#'+spocklet+'_listgroup').html(html);
				$('.'+spocklet+'_add_group_item').click(function(){
					add_code($(this).data('code'));
				});
			});
		}
	});
	$('#'+spocklet+'_cfgheal,#'+spocklet+'_cfgbank, #'+spocklet+'_cfghide, #'+spocklet+'_cfgvisualxp, #'+spocklet+'_cfgunionhall, #'+spocklet+'_cfgrpconfirm, #'+spocklet+'_cfgwarlink').click(function(){
		config.settings.bank=($('#'+spocklet+'_cfgbank:checked').length>0);
		config.settings.heal=($('#'+spocklet+'_cfgheal:checked').length>0);
		config.settings.hide=($('#'+spocklet+'_cfghide:checked').length>0);
		config.settings.visualxp=($('#'+spocklet+'_cfgvisualxp:checked').length>0);
		config.settings.rpconfirm=($('#'+spocklet+'_cfgrpconfirm:checked').length>0);
		config.settings.unionhall=($('#'+spocklet+'_cfgunionhall:checked').length>0);
		config.settings.warlink=($('#'+spocklet+'_cfgwarlink:checked').length>0);
		saveConfig();
	});

	$('#'+spocklet+'_cfgmenues').click(function(){
		if(config.settings.menues) {
			alert('This requires a reload of your game.');
		}
		config.settings.menues=($('#'+spocklet+'_cfgmenues:checked').length>0);
		saveConfig();
	});

	$('#'+spocklet+'_cfgchecklist,#'+spocklet+'_cfgchecklist_server,#'+spocklet+'_cfgchecklist_hide,').click(function(){
		config.settings.checklist=($('#'+spocklet+'_cfgchecklist:checked').length>0);
		config.settings.checklist_server=($('#'+spocklet+'_cfgchecklist_server:checked').length>0);
		config.settings.checklist_hide=($('#'+spocklet+'_cfgchecklist_hide:checked').length>0);
		saveConfig();
	});

	$('#'+spocklet+'_cfgnoautopost').click(function(){
		config.settings.noautopost=($('#'+spocklet+'_cfgnoautopost:checked').length>0);
		// turn on/off
		noautopost(config.settings.noautopost);
		saveConfig();
	});

	$('#'+spocklet+'_cfgquickfight').click(function(){
		config.settings.quickfight=($('#'+spocklet+'_cfgquickfight:checked').length>0);
		if(config.settings.quickfight){
			$.getScript('//spocklet.com/bookmarklet/res/ZeroClipboard.js',function(){
				ZeroClipboard.setMoviePath( 'http://spocklet.com/bookmarklet/res/ZeroClipboard.swf' );
			});
		}
		saveConfig();
	});

	$('#'+spocklet+'_cfgkillspam').click(function(){
		// turn on/off
		if(config.settings.killspam) {
			alert('This requires a reload of your game. And do you really want to turn them on again???');
		} else {
			nospamposts();
		}
		config.settings.killspam=($('#'+spocklet+'_cfgkillspam:checked').length>0);
		saveConfig();
	});

	$('#'+spocklet+'_cfgnotify_war,#'+spocklet+'_cfgnotify_progression,#'+spocklet+'_cfgnotify_skillpoint,#'+spocklet+'_cfgnotify_fbf').click(function(){
		config.settings.notify_war=($('#'+spocklet+'_cfgnotify_war:checked').length>0);
		config.settings.notify_progression=($('#'+spocklet+'_cfgnotify_progression:checked').length>0);
		config.settings.notify_skillpoint=($('#'+spocklet+'_cfgnotify_skillpoint:checked').length>0);
		config.settings.notify_fbf=($('#'+spocklet+'_cfgnotify_fbf:checked').length>0);
		saveConfig();
	});

	$('#'+spocklet+'_cfgnotify_twitter,#'+spocklet+'_cfgnotify_mwll,#'+spocklet+'_cfgnotify_raven,#'+spocklet+'_cfgnotify_raven_lurk').click(function(){
		config.settings.notify_mwll=($('#'+spocklet+'_cfgnotify_mwll:checked').length>0);
		config.settings.notify_twitter=($('#'+spocklet+'_cfgnotify_twitter:checked').length>0);
		config.settings.notify_raven=($('#'+spocklet+'_cfgnotify_raven:checked').length>0);
		config.settings.notify_raven_lurk=($('#'+spocklet+'_cfgnotify_raven_lurk:checked').length>0);
		saveConfig();
	});

	$('#'+spocklet+'_cfgnotify').click(function(){
		if(!window.webkitNotifications) {
			alert('Unsupported browser, use Chrome or install Firefox-Addon "HTML Desktop Notifications"');
			return false;
		}

		if (window.webkitNotifications.checkPermission() != 0) {
			alert('Please select "Allow" from the above bar to show the notifications');
			window.webkitNotifications.requestPermission();
		}

		config.settings.notify=($('#'+spocklet+'_cfgnotify:checked').length>0);
		saveConfig();
	});

	$('#'+spocklet+'_cfgserver').click(function(){
		if (!$('#'+spocklet+'_cfgserver')[0].checked) {
			if (confirm("Really disable server mode?")) {
				createCookie(spocklet+'_goldpw','');
				$('.'+spocklet+'_gold').hide();
				$('#'+spocklet+'_donate').show();
				$('#spockholm_toolbar').removeClass(spocklet+'_golden').addClass(spocklet+'_notgolden');

			} else {
				return false;
			}
		} else {
			enableServerMode();
		}
	});

	$('#'+spocklet+'_sync').click(function(){
		if ($('#'+spocklet+'_syncpop').css('display') == 'none') {
			$('#'+spocklet+'_syncpop').show();
			$('#'+spocklet+'_sync').removeClass('black').addClass('green');
		}
		else {
			$('#'+spocklet+'_syncpop').hide();
			$('#'+spocklet+'_sync').removeClass('green').addClass('black');
		}
		return false;
	});

	$('#'+spocklet+'_loadnow').click(function(){
		loadFromServer();
	});

	$('#'+spocklet+'_savenow').click(function(){
		html='<p>Select scripts to backup</p>';
		html+='<p><label><input type="checkbox" id="'+spocklet+'_tb">Toolbar</label></p>';
		html+='<p><label><input type="checkbox" id="'+spocklet+'_ah">Assassin-a-Nator</label></p>';
		html+='<p><label><input type="checkbox" id="'+spocklet+'_sh">Stats History</label></p>';
		html+='<p><label><input type="checkbox" id="'+spocklet+'_ih">Inventory History</label></p>';
		html+='<p><label><input type="checkbox" id="'+spocklet+'_mm">Mafia Manager</label></p>';
		html+='<p><label><input type="checkbox" id="'+spocklet+'_fm">Family Manager</label></p>';
		html+='<p><label><input type="checkbox" id="'+spocklet+'_bh">Battle History</label></p>';
		html+='<a href="#" id="'+spocklet+'_savenow2" class="sexy_button_new short green"><span><span>Save selected settings now</span></span></a>';
		$('#'+spocklet+'_savelog').html(html);
		$('#'+spocklet+'_savenow2').click(function(){
			save2server();
		});
	});

	$('#'+spocklet+'_cfgsortnow').click(function(){
		try { $('#'+spocklet+'_config > div').css('left',$('#'+spocklet+'_config > div')[0].offsetLeft+200+'px') } catch(e) {}
		$('#'+spocklet+'_spocklets_menu').trigger('click');
		$('#'+spocklet+'_spocklets_menu ul').append('<li><a href="#" id="'+spocklet+'_finishsort" style="display: block; padding: 5px; width: 175px; border-bottom: 1px solid #000; color:red;" >Finished sorting</a></li>');
		alert("You can sort your spocklets now by moving them around in the menu");

		$('#'+spocklet+'_spocklets_menu ul').sortable({
			update:function(a,b){
				var newsort=[];
				$('#'+spocklet+'_spocklets_menu ul li a').each(function(){
					if ($(this).attr("cfgid")) {
						newsort.push($(this).attr("cfgid"));
					}
				});
				config.sorted=newsort;
			}
		});
		$('#'+spocklet+'_finishsort').click(function(){
			write_scripts();
			return false;
		});
	});

	$('#'+spocklet+'_loadlist').click(function(){
		loadSpocklets(true);
		return false;
	});

	function save2server(){
		var ts=unix_timestamp();
		if (golden) {
			var data={"_t":ts};
			if ($('#'+spocklet+'_tb').is(':checked')) {
				data.Toolbar=JSON.parse(window.localStorage.getItem(spocklet+'_config_'+User.trackId));
			}
			if ($('#'+spocklet+'_sh').is(':checked')) {
				data["Stats History"]=JSON.parse(window.localStorage.getItem('stat_hist_history_'+User.trackId));
			}
			if ($('#'+spocklet+'_ih').is(':checked')) {
				data["Inventory History"]=JSON.parse(window.localStorage.getItem('inv_hist_history_'+User.trackId));
			}
			if ($('#'+spocklet+'_mm').is(':checked')) {
				data["Mafia Manager"]=JSON.parse(window.localStorage.getItem('mafia_hist_history_'+User.trackId));
			}
			if ($('#'+spocklet+'_fm').is(':checked')) {
				data["Family Manager"]=JSON.parse(window.localStorage.getItem('family_hist_history_'+User.trackId));
			}
			if ($('#'+spocklet+'_ah').is(':checked')) {
				data["Assassin-a-Nator"]=JSON.parse(window.localStorage.getItem('aan_cookie'));
			}
			if ($('#'+spocklet+'_bh').is(':checked')) {
				data["Battle History"]=JSON.parse(window.localStorage.getItem('battleresults_history_'+User.trackId));
			}

			saveBackupToServer(btoa(encodeURIComponent(JSON.stringify(data))));
			//checkBackupOnServer(ts,0);
		}
	}

	function checkBackupOnServer(ts,count) {
		setTimeout(function(){
			readBackupFromServer(function(backupdata){
				alert(ts+':'+backupdata['_t']);
			});
		},1000);
	}

	function saveBackupToServer(data){
		var password=readCookie(spocklet+'_goldpw');
		$.ajax({
			url:'http://spockon.me/tb/backup_put.php',
			data: {
				r:Math.random(),
				user:User.trackId,
				pass:password,
				cookie:data,
				action:"write"
			},
			dataType: "json",
			type:"post",
			success: function(data) {
				if(data.status=="writeok") {
					alert("Backup saved!");
				} else {
					alert("Error trying to save backup.");
				}
			}
		});
	}

	function readBackupFromServer(callback) {
		var password=readCookie(spocklet+'_goldpw');
		$.ajax({
			url:'http://spockon.me/tb/backup.php',
			data: {
				r:Math.random(),
				user:User.trackId,
				pass:password,
				action:"read"
			},
			dataType: "jsonp",
			jsonpCallback: 'jsonp'+unix_timestamp()+parseInt(Math.random()*1000),
			success: function(data) {
				if (data.status=='readok') {
					var backupdata=JSON.parse(decodeURIComponent(atob(data.cookie)));
					callback(backupdata);
				} else if (data.status=='authfail') {
					alert('No record found!');
				} else if (data.status=='nodata') {
					alert('No saved data found.');
				} else {
					alert('Other error.');
				}
			}
		});
	}

	function loadFromServer(){
		if (golden) {
			$('#'+spocklet+'_loadlog').text('Fetching data from server...');
			readBackupFromServer(function(backupdata){
				$('#'+spocklet+'_loadlog').text('Loading done.');
				if(backupdata["_t"]){
					// new backup
					var html='<p>Found backup:</p>From: '+(new Date(parseInt(backupdata["_t"])*1000)).toLocaleString()+'<br />';
					for(var script in backupdata){
						if(script!='_t'){
							var count=0,last=0,ago=0;
							try {
								for(var i in backupdata[script]) { count++; last=i; }
							} catch (e) { count=1; last=0 }
							if(parseInt(last)>1000000) {
								ago=parseInt((unix_timestamp()-parseInt(last))/86400) + ' days ago';
								html+='<a href="#" data-script="'+script+'" class="'+spocklet+'_buload">Combine '+script+' data</a> ('+count+' datasets, last '+ago+', size '+JSON.stringify(backupdata[script]).length+'b)</br>';
							} else if(parseInt(last)>0) {
								html+='<a href="#" data-script="'+script+'" class="'+spocklet+'_buload">Combine '+script+' data</a> ('+count+' datasets, last number #'+last+', size '+JSON.stringify(backupdata[script]).length+'b)</br>';
							} else {
								html+='<a href="#" data-script="'+script+'" class="'+spocklet+'_buload">Load '+script+' settings</a></br>';
							}

						}
					}
					$('#'+spocklet+'_loadlog').html(html);
					$('.'+spocklet+'_buload').click(function(){
						var scriptname=$(this).attr('data-script');
						load_backup_data(scriptname,backupdata);
					});
				} else {
					// old style backup
					config=backupdata;
					saveConfig();
					write_scripts();
					$('#'+spocklet+'_loadlog').html("Backup loaded.");
				}
			});
		}
	}

	function load_backup_data(scriptname,backupdata) {
		var data;
		switch(scriptname) {
		case "Toolbar":
			config=backupdata["Toolbar"];
			saveConfig();
			showConfigItems();
			write_scripts();
			break;
		case "Stats History":
			data=JSON.parse(window.localStorage.getItem('stat_hist_history_'+User.trackId));
			for(var i in backupdata[scriptname]) {
				data[i]=backupdata[scriptname][i];
			}
			window.localStorage.setItem('stat_hist_history_'+User.trackId,JSON.stringify(data));
			break;
		case "Inventory History":
			data=JSON.parse(window.localStorage.getItem('inv_hist_history_'+User.trackId));
			for(var i in backupdata[scriptname]) {
				data[i]=backupdata[scriptname][i];
			}
			window.localStorage.setItem('inv_hist_history_'+User.trackId,JSON.stringify(data));
			break;
		case "Mafia Manager":
			data=JSON.parse(window.localStorage.getItem('mafia_hist_history_'+User.trackId));
			for(var i in backupdata[scriptname]) {
				data[i]=backupdata[scriptname][i];
			}
			window.localStorage.setItem('mafia_hist_history_'+User.trackId,JSON.stringify(data));
			break;
		case "Family Manager":
			data=JSON.parse(window.localStorage.getItem('family_hist_history_'+User.trackId));
			for(var i in backupdata[scriptname]) {
				data[i]=backupdata[scriptname][i];
			}
			window.localStorage.setItem('family_hist_history_'+User.trackId,JSON.stringify(data));
			break;
		case "Assassin-a-Nator":
			// overwrite only
			data=JSON.parse(window.localStorage.getItem('aan_cookie'));
			window.localStorage.setItem('aan_cookie',JSON.stringify(backupdata[scriptname]));
			break;
		case "Battle History":
			data=JSON.parse(window.localStorage.getItem('battleresults_history_'+User.trackId));
			for(var i in backupdata[scriptname]) {
				data[i]=backupdata[scriptname][i];
			}
			window.localStorage.setItem('battleresults_history_'+User.trackId,JSON.stringify(data));
			break;
		}
		$('#'+spocklet+'_loadlog').html("Backup loaded.");
	}


	function enableServerMode(){
		// check if server mode can be enabled
		var mwid=User.id;
		var fbid=User.trackId;
		var serverurl='https://spockon.me/tb/verify.php';
		var password=readCookie(spocklet+'_goldpw');
		if (!password) {
			password=prompt("Please enter your account password");
		}
		var url=serverurl+'?r='+Math.random()+'&user='+fbid+'&wmid='+mwid+'&pass='+escape(password)+'&action=validate';
		$.ajax({
			url:url,
			dataType: "jsonp",
			jsonpCallback: 'jsonp'+unix_timestamp()+parseInt(Math.random()*1000),
			success: function(data) {
				if (data.success==true) {
					// set password cookie
					createCookie(spocklet+'_goldpw',password);
					// enable server mode
					$('#spockholm_toolbar').removeClass(spocklet+'_notgolden').addClass(spocklet+'_golden');
					$('.'+spocklet+'_gold').show();
					if(data.backup==true){
						$('.'+spocklet+'_goldbackup').show();
					}
					$('#'+spocklet+'_cfgserver')[0].checked=true;
					golden=true;
					$('#'+spocklet+'_donate').hide();
				} else {
					alert('No record found.');
					createCookie(spocklet+'_goldpw','');
					$('#spockholm_toolbar').removeClass(spocklet+'_golden').addClass(spocklet+'_notgolden');
					$('#'+spocklet+'_cfgserver')[0].checked=false;
				}
			}
		});
	}
	if (readCookie(spocklet+'_goldpw')) {
		enableServerMode();
	}

	$("#"+spocklet+'_config').draggable({ handle: "h3" });
	$("#"+spocklet+'_config').disableSelection();

	$("#"+spocklet+'_syncpop').draggable({ handle: "h3" });
	$("#"+spocklet+'_syncpop').disableSelection();

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
					}
					catch(ignoreerror) {}
				}
			});
		}
		return false;
	}).css('cursor','pointer');

	$('#stat_cash_cont h4').click(function(event,ui){
		if(config.settings.bank) {

			if($(event.target).hasClass('bank_deposit')) {
				// user clicked on bank, return true;
				return true;
			} else {
				$('#stat_cash_cont h4').css('color','gray');
				var city = $('#mw_city_wrapper');
				city = city.length > 0?city.attr('class').substr(7):$('#travel_bar').attr('class').substr(7);
				switch (parseInt(city)) {
					case 5:
						var url = '?xw_controller=propertyV2&xw_action=doaction&doaction=ActionBankDeposit&building_type=6&city=5&amount='+User.cash;
						break;
					default:
						var url = '?xw_controller=bank&xw_action=deposit_all';
						break;
				}
				request(url,function(response){
					var o = jQuery.parseJSON(response.replace(/^(\s\d\s+)/,''));
					try {
						user_fields_update(o.user_fields);
						user_info_update(o.user_fields, o.user_info);
						if(o.deposit_message) {
							var cash=$(o.deposit_message).find('span.money').text();
							var amount=parseInt(cash.replace(/[^\d]/g,''));
							if(amount>0) {
								$('.cur_cash').text('banked '+cash);
								$('#stat_cash_cont h4').css('color','white').effect('pulsate');
							}
						}
					} catch (ignoreerror) {}
				});
			}
			return false;
		}
	}).css('cursor','pointer');


	$('#'+spocklet+'_stats_update').click(function() {
		stats_update();
		collect_lvl();
	});
	$('.'+spocklet+'_confirmation').live('click',function(){
		var text = $(this).text().trim();
		if(confirm('Are you sure you want to '+(text == ""?"purchase that":text)+'?')){
			$('#'+$(this).attr('data-button-id')).trigger('click');
			return true;
		}
		return false;
	});
	$('body').bind('ajaxComplete.spockholmToolbar',function(e,xhr,settings) {
		var city = $('#mw_city_wrapper');
		city = city.length > 0?city.attr('class').substr(7):$('#travel_bar').attr('class').substr(7);
		var page = User.page;
		$('#'+spocklet+'_log').html(page+' '+city);
		setTimeout(remove_pop_bg,1000);
		if (config.settings.rpconfirm) {
			add_confirms();
		}
		if (page == 'clan') {
			write_family_id();
		}
		if (page == 'fight') {
			hide_iced();
		}
		setTimeout(stats_update,500);
		collect_lvl();
		battle_check();
		mission_walkthrough();
		leaderboard_clickable_profiles();
		skill_popup_5();
		//zmc_check();
		if (config.settings.visualxp) {
			showxp(xhr.responseText);
		}
		if(config.settings.notify) {
			check_notifications();
		}
		if(page == 'index') {
			if(config.settings.unionhall){
				unionhall3();
			}
			add_next_prev();
			HP_Mod2();
			ArenaModule();
		}
		if(page=="stats") {
			profile_cleanup();
			//Don't ask me why, but the Facebook ID actually works with this
			setTimeout(profile_show_ids,1);
		}
		if(page=='achievement'){achievements_cleanup();}
		if(page=="job") {
			job_master();
		}
		// for pete
		if(page=="fight") {
			if(config.settings.quickfight) {
				quickfighter(xhr);
			}
		}
		if(!window[spocklet+'_inventory_html'] && /xw_controller=inventory&xw_action=view&from_controller=inventory/.test(settings.url)){
			setup_inv_cache(xhr.responseText);
		}
		if(document.getElementById('declare_war_head')){
			//can't do page == 'war' because zynga doesn't update right
			war_ids();
		}
		if(page=="socialmission") {
			// raven?
			ravencombos();
		}
		dropdownmenu();
		setTimeout(district_dropdown, 500);
	});

	write_scripts();
	stats_update();
	float_toolbar();
	nospamposts();
	add_select_max_button();
	ArenaModule();	
	setTimeout(remove_zynga_banners, 2500);

	$('#exp_fight, #exp_job, #exp_craft, #exp_social').bind('click',function(){
		setTimeout(collect_lvl,10000);
	});
	$('#'+spocklet+'_search').bind('click',function(){
		$(this).val('');
	});

	// plugins
	if (document.location.href.indexOf('spockholm_toolbar')!=-1) {
		setTimeout(add_plugin,9000);
	}

	// noautopost
	if(config.settings.noautopost) {
		// try disable autopost
		// thanks Brandon Venery
		noautopost(true);
	}
	// killspam
	if(config.settings.killspam) {
		// try disable autopost
		// thanks Brandon Venery
		nospamposts();
	}

	if(config.settings.checklist) {
		if(config.settings.checklist_server) {
			load_spocklet('https://spocklet-spockholmmafiato.netdna-ssl.com/checklist-server-beta.js',true);
		} else {
			load_spocklet('https://spocklet-spockholmmafiato.netdna-ssl.com/checklist-beta.js',true);
		}
		if(config.settings.checklist_hide) {
			function hide_checklist(){
				if($('#sphide').length>0) {
					$('#sphide').trigger('click');
				} else {
					setTimeout(hide_checklist,1000);
				}
			}
			hide_checklist();
		}
	}
	$('#mainDiv').append('<a href="#" id="copyable"></a><span id="copy_container"></span>');
	//load ours by default to fix Zynga bullet issue
	//use ajax so it caches
	// $.ajax({
		// dataType: "script",
		// cache: true,
		// url: '//spocklet.com/bookmarklet/res/ZeroClipboard.js?v1'
	// }).done(function(){
		// if(config.settings.quickfight){
			// ZeroClipboard.setMoviePath( 'http://spocklet.com/bookmarklet/res/ZeroClipboard.swf' );
		// }
	// });
	

	//Load secret district
	$('a[id^="travel_menu_secret_"]').each(function(){
		var link = $(this).prop('onclick');
		var tab = /tab=(\d+)/.exec(link)[1];
		var city = /destination=(\d+)/.exec(link)[1];
		if (city > 0 && tab > 0) {
			districts[city].push(tab);
		}
	});

	// repair font
	$('#mw_city_wrapper > b > b').css('font-weight','normal');
	
})()