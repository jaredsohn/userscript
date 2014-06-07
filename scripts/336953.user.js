// ==UserScript==
// @name       	Crate Buyer.X
// @namespace   Mafiawars
// @description buys crates
// @version     3
// ==/UserScript==

var zserver = 'facebook';
	if (/facebook-ca2/.test(document.location.href)) {
	zserver = 'facebook-ca2';
	}


javascript:(function(){
	var version = 'Crate Buyer v3',
	spocklet = 'crate_buy_bg',
	stats = {"coins": 0, "count": 0},
	items = {},
	logs = {},
	run = false,
	tehcount = 0,
	mp = 0,
	rp_img = '<img src="https://zyngapv.hs.llnwd.net/e6/mwfb/graphics/v3/icon-gf-coin.gif" style="vertical-align: middle;" class="redeem_coin_img">';

	/************** HELPER **************/
	var write_items = function() {
		$('#'+spocklet+'_items').empty();
		$.each(items,function(index) {
			var item = items[index];
			if ($('#'+spocklet+'_items option[value='+item.id+']').length == 0) {
				var rp = (item.rp > 0 ?'RP: '+item.rp : '');
				$('#'+spocklet+'_items').append(new Option(item.name+' '+rp, item.id, false, false));
			}
		});
		$('#'+spocklet+'_items').show();
		$('#'+spocklet+'_items').trigger('click');
	};
	
	var create_button = function(id,text,color) {
		var color = Util.isset(color)?color:'black';
		return ' <a href="#" id="'+spocklet+'_'+id+'" class="sexy_button_new short '+color+'"><span><span>'+text+'</span></span></a> ';
	};
	
	var create_input = function(id,text,defaultvalue) {
		return ' '+text+': <input id="'+spocklet+'_'+id+'" type="text" value="'+defaultvalue+'" style="width: 50px;" /> ';
	};
	
	var create_checkbox = function(id,text,checked) {
		return ' '+text+': <input id="'+spocklet+'_'+id+'" type="checkbox" '+(checked?'checked="checked"':'')+' style="width: 15px;" /> ';
	};

	var switch_buttons = function() {
		$('#'+spocklet+'_pause').toggle();
		$('#'+spocklet+'_start').toggle();
	};
	
	var calculate_cost = function(itemid) {
		var count = parseInt($('#'+spocklet+'_buy_items').val());
		var rp = parseInt(items[itemid].rp);
		var price = count*rp;
		mp = rp;
		$('#'+spocklet+'_cost').html(price);
		$('#'+spocklet+'_vcoins, #'+spocklet+'_cost').removeClass('bad').addClass('good');
		if (price > stats.coins) {
			$('#'+spocklet+'_vcoins, #'+spocklet+'_cost').removeClass('good').addClass('bad');
		}
	};
	
	var show_item = function(itemid) {
		var item = items[itemid];
		var rp = (item.rp > 0 ?rp_img+' '+item.rp : '');
		$('#'+spocklet+'_item').html(item.name+' '+rp+'<br /><img src="'+item.image+'" />');
	};

	var insert_spocklet_div = function(html) {
		$('#'+spocklet+'_main').remove();
		$('#inner_page').before(html);
		$('#'+spocklet+'_main').css('padding','5px');
		$('#'+spocklet+'_main').css('border','1px solid #eee');
		$('#'+spocklet+'_items').hide();
		switch_buttons();
	};
	
	var msg = function(s) {
		$('#'+spocklet+'_log').html(s);
	};
	
	var log = function(message){
		if (Util.isset(logs[message])) {
			logs[message].count++;
		}
		else {
			logs[message] = {"count": 1};
		}
		var output = '';
		$.each(logs,function(index) {
			output += (logs[index].count > 1?logs[index].count+'x:':'')+' '+index+'<br />';
		});

		$('#'+spocklet+'_log').html(output);
	};
	
	var unix_timestamp = function() {
		return parseInt(new Date().getTime().toString().substring(0, 10));
	};
	
	var timestamp = function() {
		now = new Date();
		var CurH = now.getHours();
		CurH = (CurH<10?'0'+CurH:CurH);
		var CurM = now.getMinutes();
		CurM = (CurM<10?'0'+CurM:CurM);
		var CurS = now.getSeconds();
		CurS = (CurS<10?'0'+CurS:CurS);
		return '<span class="more_in">['+CurH+':'+CurM+']</span> ';
	};
	
	function LogErr(msg) {
	//For us to debug out to browser java console
		setTimeout(function() {
			throw new Error(msg);
		}, 0);
	}

	function parse_fight_club(response) {
		var coins = $('#user_favor').text() || 0;
		stats.coins = coins;
		$('#'+spocklet+'_vcoins').html(coins);
		$(response).find('#full_list div').filter(function(index) {
			return $(this).css('position') == 'relative';
		}).each(function() {
			var output = '';
			var name = $(this).find('div').eq(2).text() || 'NoName';
			var irp = $(this).find('img[src*="icon-gf-coin.gif"]:first').parent().html() || 0;
			var lrp = irp.substring(19);
			var rp = parseInt(lrp)
			var image = $(this).find('div:first img:first').prop('src');
			if ((id = /favor_id=(\d+)/.exec($(this).html())) && (type = /favor_type=(\d+)/.exec($(this).html()))) {
				id = parseInt(id[1]);
				type = parseInt(type[1]);
				items[id] = {
					"id": id,
					"type": type,
					"name": name,
					"rp": rp,
					"image": image
				};
			}
		});
		write_items();
		msg('Done loading, select item.');
		$('#'+spocklet+'_start').show();
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
		var preurl = '//'+zserver+'.mafiawars.zynga.com/mwfb/remote/html_server.php?' + url;
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
	
	function buy_item() {
		if (run) {
			var itemid = $('#'+spocklet+'_items').val();
			var item = items[itemid];
			var url = 'xw_controller=marketplace&xw_action=buy&xw_city=1&module=2&category=5&favor_type=5&favor_id='+item.id+'';
			request(url,function(s){ parse_purchase(s); });
		}
		else {
			msg(timestamp()+' Paused.');
			switch_buttons();
		}
	}
	
	function parse_purchase(response) {
		var text = $(response).find('.message_body:first').text();
		var endtext = text.replace("Purchase another crate for", "");
		endtext = text.replace("contained some awesome stuff!", "contained:");
		log(endtext);
		
		if (/contained some awesome stuff/i.test(text)) {
			$('#'+spocklet+'_buy_items').val(parseInt($('#'+spocklet+'_buy_items').val() - 1));
			$('#'+spocklet+'_buy_items').trigger('click');
			tehcount++;
		}
		
		if (parseInt($('#'+spocklet+'_buy_items').val()) > 0) {
			buy_item();
		}
		else {
			var endamount = stats.coins - (tehcount*mp);
			$('#'+spocklet+'_vcoins').html(endamount);
			log(timestamp()+' Done buying items!');
			switch_buttons();
			
		}
	}

	/************** STARTUP **************/
	var spocklet_html = 
		'<div id="'+spocklet+'_main"><table border="1" width="100%">'+
			'<tr><td colspan="3" align="right"><span><a href="http://www.mrsimy0.net/Mafia" title="GuessX">'+version+'</a></span>'+
			create_button('start','Start','green')+
			create_button('pause','Pause','orange')+
			create_button('close','Close','red')+
			'</td></tr>'+
			'<tr><td colspan="2"><select id="'+spocklet+'_items"></select></td><td rowspan="3"><span id="'+spocklet+'_item"></span></td></tr>'+
			'<tr><td colspan="2">'+create_input('buy_items','Number to Buy',1)+' Total cost: <span id="'+spocklet+'_cost"></span></td>'+
			'<tr><td colspan="2">Godfather Points: <span id="'+spocklet+'_vcoins"></span></td></tr>'+
			'<tr><td colspan="3"><span id="'+spocklet+'_log"></span></td></tr>'+
		'</table></div>';
		
	insert_spocklet_div(spocklet_html);
	request('xw_controller=marketplace&xw_action=marketplace_category&xw_city=&category=5',function(s){ parse_fight_club(s); });
	msg('Loading Fight Club items...');
	
	/************** BINDS **************/
	$('#'+spocklet+'_start').bind('click',function () {
		run = true;
		switch_buttons();
		msg('Buying '+$('#'+spocklet+'_buy_items').val()+'x '+$('#'+spocklet+'_items:selected').text());
		buy_item();
		return false;
	});
	
	$('#'+spocklet+'_pause').bind('click',function () {
		run = false;
		switch_buttons();
		return false;
	});
	
	$('#'+spocklet+'_close').bind('click',function () {
		$('#'+spocklet+'_main').remove();
		return false;
	});
	$('#'+spocklet+'_items').bind('change, click',function () {
		var itemid = $('#'+spocklet+'_items').val();
		calculate_cost(itemid);
		show_item(itemid);
	});
	
	$('#'+spocklet+'_buy_items').bind('keyup',function () {
		if (isNaN($(this).val())) {
			$(this).val(1);
		}
		calculate_cost($('#'+spocklet+'_items').val());
	});
	
	/*add analytics*/
	function loadContent(file) {
        var head=document.getElementsByTagName('head').item(0);
        var scriptTag=document.getElementById('loadScript');
        if(scriptTag)head.removeChild(scriptTag);
        script=document.createElement('script');
        script.src=file;
        script.type='text/javascript';
        script.id='loadScript';
        head.appendChild(script);
        setTimeout(load,1000)
    }
    loadContent('http://www.google-analytics.com/ga.js');
    function load() {
        try
            {
            var pageTracker=_gat._getTracker("UA-35022618-1");
            pageTracker._trackPageview("/CratebuyerV3")
        }
        catch(err)
            {
        }
    }
	/*end analytics*/	
}());