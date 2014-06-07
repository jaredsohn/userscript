// ==UserScript==
// @name           PROPERTY MANAGER (mod)
// @namespace      Delete_tester
// @description    Bookmarklet loader for the Spockholm Mafia Tools
// @include        http://apps.facebook.com/inthemafia/*
// @include        https://apps.facebook.com/inthemafia/*
// @include        http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include        https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @match          http://apps.facebook.com/inthemafia/*
// @match          https://apps.facebook.com/inthemafia/*
// @match          http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @match          https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// ==/UserScript==

javascript:(function(){
	var spocklet = 'prop_man',
	version = 'Property Manager v1.10';
	var debug=false;

	if (navigator.appName == 'Microsoft Internet Explorer') {
		alert('You are using Internet Explorer, this bookmarklet will not work.\nUse Firefox or Chrome instead.');
		return;
	}
	if (/apps.facebook.com.inthemafia/.test(document.location)) {
		window.location.href = 'http://facebook.mafiawars.zynga.com/mwfb/index2.php?skip_req_frame=1&mwcom=1';
	}
	else if (document.getElementById('some_mwiframe')) {
		window.location.href = document.getElementById('some_mwiframe').src;
		return;
	}
	else {
		document.body.parentNode.style.overflowY = "scroll";
		document.body.style.overflowX = "auto";
		document.body.style.overflowY = "auto";
		try {
			document.evaluate('//div[@id="mw_city_wrapper"]/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).style.margin = "auto";
			if (typeof FB != 'undefined') {
				FB.CanvasClient.stopTimerToSizeToContent;
				window.clearInterval(FB.CanvasClient._timer);
				FB.CanvasClient._timer = -1;
			}
			document.getElementById('snapi_zbar').parentNode.parentNode.removeChild(document.getElementById('snapi_zbar').parentNode);
		} catch (fberr) {}
		//Revolving Revolver of Death from Arun, http://arun.keen-computing.co.uk/?page_id=33
		$('#LoadingBackground').hide();
		$('#LoadingOverlay').hide();
		$('#LoadingRefresh').hide();
		
		//workaround to kill the resizer calls
		try {
			iframeResizePipe = function() {};
			if (navigator.appVersion.indexOf('Chrome') > -1) {
				delete Array.prototype.indexOf;
			}
		} catch(e) { }
	}
	//</unframe>
	try {
		var timer,
		stats = {
			"money_gained": 0,
			"items_crafted": 0
		};
		var collect_url = {
			1: "html_server.php?xw_controller=propertyV2&xw_action=collectall&xw_city=1&requesttype=json",
			4: "html_server.php?xw_controller=propertyV2&xw_action=collectall&xw_city=4&requesttype=json",
			5: "html_server.php?xw_controller=propertyV2&xw_action=collectall&xw_city=5",
			6: "html_server.php?xw_controller=propertyV2&xw_action=collectall&xw_city=6",
			7: "html_server.php?xw_controller=propertyV2&xw_action=collectall&xw_city=7",
			8: "html_server.php?xw_controller=propertyV2&xw_action=collectall&xw_city=8"
		};

		// workaround, because item-ids are not available if you call the crafting page when crafting is not available (only v1/v3)
		var all_items = {"Random Common":1,"Sonic Five":25,"Midnight":39,"Random Rare":2,"General Ulysses":26,"Palermo Luxury":40,"Tasmanian":3,"Sleek":41,"CM Santiago R10":4,"Rebel 2":5,"Sirroco 9Z":11,"Russian Dazatz 45":6,"Solar Flare":7,"Andresen 420si":12,"Thai XS Max":8,"Trio Napoli":9,"Red Angel":10,"Mugati Sport":13,"Hunter 'Spy' XS":14,"Day Rider 2K":27,"Sportster":42,"Extended Cab 640":43,"Blazing Santoku":49,"Random Common Weapon":15,"Double Dare":50,"Random Uncommon Weapon":16,"Random Rare Weapon":17,"\"Need a Jump?\"":51,"Ninja Sai":18,"First Blood":19,"Ultrasonic Gun":20,"Laser Guided RPG":21,"Robber's Utility Belt":22,"Railgun":23,"Plasma Rifle":24,"Dirty Trick":44,"Electric Prod":45,"Hack Blade":46,"Pair of Stun Knuckles":47,"Wasper Knife":48,"Welding Mask":54,"Random Common Armor":29,"Random Uncommon Armor":30,"Sprinting Shoes":55,"Random Rare Armor":31,"Forearm Guard":56,"Plastic Legging":32,"Mariner's Suit":33,"Pressure Suit":34,"Sleek Torso Guard":35,"Full Body Armor":36,"MNU Suit":37,"Power Armor":38,"Desert Eyes":89,"Spotted Vest":90,"Five Finger Fortification":91,"Strong Arm":92,"Stout Shoulders":93,"Fennec Fox":60,"Amur LeopardLimited Time":82,"Spur Tortoise":61,"Philippine Eagle":62,"Bobcat":63,"Secretary Raptor":64,"Brown Recluse Spider":65,"Tiger Shark":66,"Black Mamba":67,"Gharial":68,"Warthog":69,"Coconut Crab":84,"Malayan Tiger":85,"Raccoon":86,"Snow Monkey":87,"Wildebeest":88, "Cormorant1":1, "Cormorant2":2, "Cormorant3":3, "Italian Housekeeper1":4, "Italian Housekeeper2":5, "Italian Housekeeper3":6, "Perini-R1":7, "Perini-R2":8, "Perini-R3":9, "Perini-R4":10, "Aluminum Bat1":1, "Aluminum Bat2":2, "Aluminum Bat3":3, "Padded Jersey1":4, "Padded Jersey2":5, "Padded Jersey3":6, "Sports Fanatic1":7, "Sports Fanatic2":8, "Sports Fanatic3":9, "Sports Fanatic4":10, "Thigh Will Be Done1":1,"Thigh Will Be Done2":2,"Thigh Will Be Done3":3,"Fallen Angel Arm1":4,"Fallen Angel Arm2":5,"Fallen Angel Arm3":6, "Flanger1":7,"Flanger2":8,"Flanger3":9,"Flanger4":10, "Tail Gunner1":1,"Tail Gunner2":2,"Tail Gunner3":3,"Mamacita1":4,"Mamacita2":5,"Mamacita3":6,"Front Door1":7,"Front Door2":8,"Front Door3":9,"Front Door4":10, "Kung-Fu Outfit1":1, "Kung-Fu Outfit2":2, "Kung-Fu Outfit3":3,"Nun Chucks1":4,"Nun Chucks2":5,"Nun Chucks3":6,"Sensei1":7,"Sensei2":8,"Sensei3":9,"Sensei4":10,"Grave Digger1":1,"Grave Digger2":2,"Grave Digger3":3,"Care Taker1":4,"Care Taker2":5,"Care Taker3":6,"Mummy1":7,"Mummy2":8,"Mummy3":9,"Mummy4":10};

		// workaround, because item-ids are not available if your property is already at max level (only v1)
		var begging_items = [
			{"itemid":"532","property":11,"name":"CINDER BLOCK","img":"http://mwfb.static.zgncdn.com/mwfb/graphics/item_cinderblock_01.png"},
			{"itemid":"533","property":11,"name":"POWER TOOL","img":"http://mwfb.static.zgncdn.com/mwfb/graphics/item_powertools_01.png"},
			{"itemid":"534","property":11,"name":"LIFT","img":"http://mwfb.static.zgncdn.com/mwfb/graphics/item_carlift_01.png"},
			{"itemid":"535","property":11,"name":"TORCH","img":"http://mwfb.static.zgncdn.com/mwfb/graphics/item_acetylenetorches_01.png"},
			{"itemid":"536","property":11,"name":"CONTAINER","img":"http://mwfb.static.zgncdn.com/mwfb/graphics/item_shippingcontainers_01.png"},
			//{"itemid":"2319","property":11,"name":"SPECIAL PART","img":"http://mwfb.static.zgncdn.com/mwfb/graphics/item_parts_01.png"},
			{"itemid":"660","property":12,"name":"FORGE","img":"http://mwfb.static.zgncdn.com/mwfb/graphics/item_forge_01.gif"},
			{"itemid":"656","property":12,"name":"WELDER","img":"http://mwfb.static.zgncdn.com/mwfb/graphics/item_arcwelder_01.gif"},
			{"itemid":"657","property":12,"name":"BUZZSAW","img":"http://mwfb.static.zgncdn.com/mwfb/graphics/item_electronicwhetstone_01.gif"},
			{"itemid":"658","property":12,"name":"GUNPOWDER","img":"http://mwfb.static.zgncdn.com/mwfb/graphics/item_gunpowder_01.gif"},
			{"itemid":"659","property":12,"name":"DRILL","img":"http://mwfb.static.zgncdn.com/mwfb/graphics/item_gundrill_01.gif"},
			{"itemid":"2196","property":13,"name":"HAMMER","img":"http://mwfb.static.zgncdn.com/mwfb/graphics/item_hammer_01.png"},
			{"itemid":"2197","property":13,"name":"RIVET","img":"http://mwfb.static.zgncdn.com/mwfb/graphics/item_rivets_01.png"},
			{"itemid":"2183","property":13,"name":"FURNACE","img":"http://mwfb.static.zgncdn.com/mwfb/graphics/item_furnace_01.png"},
			{"itemid":"2184","property":13,"name":"VICE","img":"http://mwfb.static.zgncdn.com/mwfb/graphics/item_vice_01.png"},
			{"itemid":"2185","property":13,"name":"ANVIL","img":"http://mwfb.static.zgncdn.com/mwfb/graphics/item_anvil_01.png"},
			{"itemid":"4605","property":14,"name":"AQUARIUM","img":"http://mwfb.static.zgncdn.com/mwfb/graphics/item_aquarium_01.png"},
			{"itemid":"4606","property":14,"name":"BIG CAGE","img":"http://mwfb.static.zgncdn.com/mwfb/graphics/item_bigcage_01.png"},
			{"itemid":"4607","property":14,"name":"BIRD CAGE","img":"http://mwfb.static.zgncdn.com/mwfb/graphics/item_birdcage_01.png"},
			{"itemid":"4608","property":14,"name":"FEEDING TROUGH","img":"http://mwfb.static.zgncdn.com/mwfb/graphics/item_feedingtrough_01.png"},
			{"itemid":"4609","property":14,"name":"TERRARIUM","img":"http://mwfb.static.zgncdn.com/mwfb/graphics/item_terrarium_01.png"},			
		];
		
		var upgrade_properties, craft_todo, errorcount=0, repeatrun=true, restartrun=true, returnCity=1;
		
		var logo = '<a href="http://www.spockholm.com/mafia/testing.php#PropMan" target="_blank"><img src="http://www.mafia-tools.com/uploads/banner-spockholm-mafia-tools.png#PropMan" alt="Spockholm Mafia Tools" title="Spockholm Mafia Tools" width="425" height="60" /></a>';
		var style = 
			'<style type="text/css">'+
			'	.messages {border: 1px solid #888888; margin-bottom: 5px; -moz-border-radius: 5px; border-radius: 5px; -webkit-border-radius: 5px;}'+
			'	.messages img{margin:0 3px;vertical-align:middle}'+
			'	.messages input {border: 1px solid #888888; -moz-border-radius: 3px; border-radius: 3px; -webkit-border-radius: 2px;padding 0;background: #000; color: #FFF; width: 32px;}'+
			'	.'+spocklet+'_showrp { cursor: pointer; display:none; }'+
			'</style>';

		var spocklet_html = 
			'<table class="messages">'+
			'	<tr><td colspan="3" align="center" style="text-align:center;">'+logo+'<br />'+
			'		<a href="http://www.spockholm.com/mafia/donate.php#PropMan" id="'+spocklet+'_donate" class="sexy_button_new short white" target="_blank" title="Like what we do? Donate to Team Spockholm" alt="Like what we do? Donate to Team Spockholm"><span><span>Donate</span></span></a>'+
			'		&nbsp;<a href="http://mwlootlady.blogspot.com/2011/05/property-manager-by-team-spockholm.html" id="'+spocklet+'_help" class="sexy_button_new short" target="_blank" title="Get help" alt="Get help"><span><span>Help</span></span></a>'+
			'		&nbsp;<a href="#" id="'+spocklet+'_enablerp" class="sexy_button_new short red sexy_coin_new" target="_blank" title="Get help" alt="Get help"><span><span>Enable RP spending</span></span></a>'+
			'		&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="good">'+version+'</span>'+
			'		&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<a href="#" id="'+spocklet+'_close" class="sexy_button_new short red" title="Close PropMan" alt="Close PropMan"><span><span>Close</span></span></a>'+
			'	</td></tr>'+
			'	<tr>'+
			'		<td colspan="3"><hr alt="Separator Line" /></td>'+
			'	</tr>'+
			'	<tr class="'+spocklet+'_showload">'+
			'		<td valign="top" colspan="3">'+
			'		Loading data...<br />'+
			'		<div id="progressbar" style="margin-left:100px; margin-right:100px;"></div>'+
			'		Status: <span class="good" id="'+spocklet+'_loadlog"></span>'+ 
			'		</td>'+
			'	</tr>'+		
			'	<tr class="'+spocklet+'_showrun">'+
			'	<td valign="top"><a href="#" id="'+spocklet+'_switch_craft">Crafting:</a></td>'+
			'		<td colspan="2" id="'+spocklet+'_section_craft">'+
			'		<span id="'+spocklet+'_section_craft_selects"></span>'+
		'			<a href="#" id="'+spocklet+'_crafting" class="sexy_button_new short green" style="display:none;" title="Craft Items" alt="Craft Items"><span><span>Craft Items</span></span></a>'+
			'	</td>'+
			'	</tr>'+
			'	<tr class="'+spocklet+'_showrun">'+
			'	<td valign="top">Log:</td>'+
			'		<td colspan="2" id="'+spocklet+'_log"><br />'+
			'	</td>'+
			'	</tr>'+
			'	<tr class="'+spocklet+'_showrun">'+
			'	<td valign="top"><a href="#" id="'+spocklet+'_switch_repeat">Repeating:</a></td>'+
			'		<td colspan="2" id="'+spocklet+'_section_repeat"><span id="'+spocklet+'_repeat">'+
			'			'+
			'			</span></td>'+
			'	</tr>'+
			'	<tr class="'+spocklet+'_showrun">'+
			'	<td valign="top"><a href="#" id="'+spocklet+'_switch_restart">Restart:</td>'+
			'		<td colspan="2" id="'+spocklet+'_section_restart">Restart Collecting: <input id="restart_collect" name="'+spocklet+'_savecookie" type="checkbox" checked /> Restart Crafting: <input id="restart_craft" name="'+spocklet+'_savecookie" type="checkbox" checked /> Every <input type="text" name="'+spocklet+'_savecookie" id="restart_wait" /> min '+
			'		<a href="#" id="'+spocklet+'_runrestart" class="sexy_button_new short green" title="Go" alt="Go"><span><span>Go</span></span></a> <span id="'+spocklet+'_restart_timer"></span>'+
			'	</td>'+
			'	</tr>'+
			'</table>';

		
		function create_div() {
			if ($('#'+spocklet+'_main').length == 0) {
				$('#inner_page').before('<div id="'+spocklet+'_main"></div>');
				$('#'+spocklet+'_main').append(style+spocklet_html);
			}
			else {
				$('#'+spocklet+'_main').html(style+spocklet_html);
			}
			$('head').append('<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" type="text/css" />');
		}

		var logs = [];
		var extralog = [];
		function logtrunc(message) {
			//var limit = parseInt($('#'+spocklet+'_logsize').val());
			var limit = 100;
			var keep = /spock/;
			logs.unshift(message);
			if (limit > 0) {
				if (logs.length>limit) {
					message=logs.pop();
					if ((keep.test) && (keep.test(message)))
							extralog.unshift(message);
				}
			}
			$('#'+spocklet+'_log').html(logs.concat(extralog,'').join('<br />'));
		}
		function unix_timestamp() {
			return parseInt(new Date().getTime().toString().substring(0, 10))
		}

		// createCookie from Vern's Toolkit http://vern.com/mwtools/
		function createCookie(name,value) {
		// expire one month from now
			var expires = new Date();
			expires.setDate(expires.getDate()+30);
			document.cookie = name+"="+value+";expires="+expires.toGMTString()+"; path=/";
		}

		// readCookie from Vern's Toolkit http://vern.com/mwtools/
		function readCookie(name) {
			var i,cookie,nameEQ = name+"=",cookieArray = document.cookie.split(";");
			for (i=0; i< cookieArray.length; i++) {
				cookie = cookieArray[i];
				while (cookie.charAt(0)==' ') cookie = cookie.substring(1,cookie.length);
				if (cookie.indexOf(nameEQ) == 0) return cookie.substring(nameEQ.length,cookie.length);
			}
			return null;
		}

		function saveForm(cookiename) {
			tagname=spocklet+'_savecookie';
			var output=new Object();
			var inputs = $(':input[name="'+tagname+'"]');
			for (var i=0;i<inputs.length;i++) {
				switch(inputs[i].type) {
					case 'select-one':
					output[inputs[i].id]=inputs[i].selectedIndex;
					break;
					case 'text':
					output[inputs[i].id]=inputs[i].value;
					break;
					case 'checkbox':
					output[inputs[i].id]=inputs[i].checked;
					break;
					default: alert(inputs[i].type);
				}
			}
			createCookie(cookiename,JSON.stringify(output));
		}

		function loadForm(cookiename) {
			cookie=readCookie(cookiename);
			input=JSON.parse(cookie);
			for(name in input) {
				try {
					var el=$(':input[id="'+name+'"]')[0];
				if(el){
					switch (el.type) {
						case 'select-one':
							el.selectedIndex=input[name];
							$(el).trigger('change');
						break;
						case 'text':
							el.value=input[name];
						break;
						case 'checkbox':
							el.checked=input[name];
						break;
					}
				}				
				} catch(e) { }	
			}
		}

		function dump(arr,level) {
		var dumped_text = "";
		if(!level) level = 0;

		//The padding given at the beginning of the line.
		var level_padding = "";
		for(var j=0;j<level+1;j++) level_padding += "    ";
		if(typeof(arr) == 'object') { //Array/Hashes/Objects
		 for(var item in arr) {
		  var value = arr[item];
		 
		  if(typeof(value) == 'object') { //If it is an array,
		   dumped_text += level_padding + "'" + item + "' ...\n";
		   dumped_text += dump(value,level+1);
		  } else {
		   dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
		  }
		 }
		} else { //Stings/Chars/Numbers etc.
		 dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
		}
		return dumped_text;
		} 	
				
		
		function log(s) {
			logtrunc(s);
			for (x in stats) {
				if ($('#'+spocklet+'_'+x)) {
					$('#'+spocklet+'_'+x).html(stats[x]);
				}
			}
		}

		function loadlog(s,num,sum) {
			if (num<sum) {
			$('')
				$('#'+spocklet+'_loadlog').html(s);
				try {
					$('#progressbar').progressbar({	value: num/sum*100 });
				} catch(ignore) {
				}
				$('.'+spocklet+'_showrun').hide();
				$('.'+spocklet+'_showload').show();
			} else {
				$('.'+spocklet+'_showrun').show();
				$('.'+spocklet+'_showload').hide();
			}
			
		}
		
		function format_in(i) {
			var h,m,s;
			h=Math.floor(i/3600);
			i-=h*3600;
			m=Math.floor(i/60);
			s=i-m*60;
			return (h<10?'0':'')+h+':'+(m<10?'0':'')+m+':'+(s<10?'0':'')+s;
		}
		
		function format_items(have,need,img,name) {
			var ret="";
			if (img) {
				if (img.match("icon_cash_italy") ||img.match("icon_cash_bangkok") || img.match("brz_real_sm") || img.match("base64")) {
					ret+='<img width=16 height=16 style="margin:4px;" alt="'+name+'" title="'+name+'" src="'+img+'" />';
				} else {
					ret+='<img width=32 height=32 alt="'+name+'" title="'+name+'" src="'+img+'" />';
				}
			}
			if ((have===undefined) || (have===NaN) || (have==='')) {
				ret+='<span class="good">'+need+'</span>';
			} else {
				need=parseInt(need); have=parseInt(have);
				ret+='<span class="'+(have<need?'bad':'good')+'">'+have+'/'+need+'</span>';
			}
			return ret;
		}
		try {
			var userid =/sf_xw_user_id': '(.+)'/.exec(document.body.innerHTML)[1];
			var personid = /([a-z]\|([0-9]+))/.exec(userid)[2];
		} catch(e) {
			alert("The game is not loaded correctly. Please close the tab and open a new unframed page.");
			return;
		}
		var craftinfo=new Object();
		var propinfo=new Object();
		var properties_to_collect = [];
		var rp_enabled=false;
		
		function errorreport(e) {
			line=e.lineNumber;
			filename=e.fileName;
			version='$Revision: 1.54 $'; if (m=/Revision: ([\d\.]+) \$$/.exec(version)){ version=m[1]; } else { version='unknown' }
			info=dump(e);
			url='http://slotmachine.spocklet.com/error.php'+
				'?line='+line+
				'&spocklet='+spocklet+
				'&filename='+escape(filename)+
				'&version='+version+
				'&info='+escape(info);
			allow=readCookie("spockholm_errortracking");
			if (debug) {
				alert(dump(e));
			} else {
				if (allow==null) {
					if(confirm("The script created an error. Press ok to send the error description to spockholm so we can fix it soon!")) {
						createCookie("spockholm_errortracking", "yes");
						allow="yes";
					} else {
						createCookie("spockholm_errortracking", "no");
						allow="no";
					}
				}	
				if (allow=="yes") {			
					createCookie("spockholm_errortracking", "yes");
					$.ajax({
						type:"GET",
						url:url,
						cache: false
					});
				}
			}
		}		
		function request(url, handler, errorhandler) {
			if (url.indexOf('cb=') == -1) {
				url += '&cb='+userid+unix_timestamp();
			}
			if (url.indexOf('tmp=') == -1) {
				url += '&tmp='+unix_timestamp();
			}
			var http = 'http://';
			if (/https/.test(document.location)) {
				http = 'https://';
			}
			var preurl = http+'facebook.mafiawars.zynga.com/mwfb/remote/';
			var params = {
				'ajax': 1,
				'liteload': 1,
				'sf_xw_user_id': userid,
				'sf_xw_sig': local_xw_sig,
				'xw_client_id': 8,
				'skip_req_frame': 1
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
		
		function travel(destination, handler, errorhandler) {
			var params = {
				'destination': destination,
				'from': 'hospital',
				'tmp': unix_timestamp(),
				'cb': userid+unix_timestamp(),
				'xw_person': personid,			
				'xw_client_id': 8,
				'ajax': 1, 
				'liteload': 1,
				'sf_xw_sig': local_xw_sig,
				'sf_xw_user_id': userid
			};
			var http = 'http://';
			if (/https/.test(document.location)) {
				http = 'https://';
			}
			$.ajax({
				type: 'POST',
				data: params,
				url: http+'facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=travel&xw_action=travel',
				success: handler,
				error: errorhandler
			});	
		}
		
		function parse_property_v3(msg) {
			function getItemStar(img) {
				if (img.indexOf('_bronze_')!=-1) { return 1; }
				if (img.indexOf('_silver_')!=-1) { return 2; }
				if (img.indexOf('_gold_')!=-1) { return 3; }
				if (img.indexOf('_ruby_')!=-1) { return 4; }
				return 0;
			}
			var m,p=$(msg);
			window.eike=p;
			window.eike2=msg;
			p.find('.pop_box > .master').each(function(){
				var q=$(this);
				if(this.id.indexOf('props')==0) {
					var r=craftinfo[this.id.substr(8)]={ items:[] };
					q.find('.cs_outer').each(function(){
						var s=$(this);
						//var level=parseInt(s.find('.cs_recipe_card_banner > span').text().substr(6));
						var name=s.find('.cd_item_name').text();
						var item={};
						item={};
						item.name=name;
						
						if (s.find('.cs_buy_button > a').length>0) {
							
						}
						if(m=/rec_id=(\d+)\&/.exec(s.find('.cs_buy_button > a').attr('href'))){
							item.itemid=parseInt(m[1]);
						} else if(m=/recipe=(\d+)\&/.exec(s.find('.cs_buy_button > a').attr('href'))){
							item.itemid=parseInt(m[1]);
						} else {
							item.itemid=-1;
						}
				
						//item.itemid=s.find('.cs_item_image > img').attr('item_id');
						
						item.img=s.find('.cs_item_image > img').attr('src');
						item.level = getItemStar(item.img);
						item.defense=s.find('.cs_defense').text();
						item.attack=s.find('.cs_attack').text();
						//console.log(s.find('.cs_item_stats').html());
						var t=s.find('.cs_item_stats').find('.cs_bonus,.attack,.defense,.stamina,.energy,.health');
						if (t.length>0) {
							if (t.hasClass('cs_bonus')) {
								item.special="";
								t.each(function(){
									if ($(this).find("img").attr("alt")) {
										item.special+=$(this).find("img").attr("alt") + $(this).text() + ' ';
									} else {
										item.special+=$(this).text() + ' ';
									}
								});
							} else {
								item.special=t.attr('class') + ' ' + t.text();
							}
						} else if (m=/alt=\"(\w+)\"\>.nbsp.(.*)$/.exec(s.find('.cs_item_stats').html())) {
							item.special=m[1] + ' ' + m[2];
						}
						item.locked=s.find('.cs_buy_button').text().indexOf('Locked')!=-1;
						item.reqitems=[];
						s.find('.cs_ingredient').each(function(){
							var t=$(this);
							var u={};
							var m=t.find('.num_items').text().split('/');
							u.have=parseInt(m[0]);
							u.need=parseInt(m[1]);
							u.img=t.find('img').attr("src");
							u.name=t.find('img').attr("title");
							item.reqitems.push(u);
						});
						r.items.push(item);
						r.speedup=parseInt(q.find('.sexy_coin_new:contains("Build Now")').text().replace(/[^\d]/g,''));
						r.waittime=parseInt(q.find('.buildTimer > span').text());
						if (r.waittime>10000000) { // v3 properties use absolute time here
							r.waittime-=unix_timestamp();
							if (r.waittime<0) { r.waittime=0; }
						}
						
						
						
					});
					
					
					
				} else if (this.id.indexOf('upgrade')==0) {
					// parse property upgrade info NY
					var i,m,nums={'1':1, 'chop_shop':11, 'weapons_depot':12,'armory':13,'private_zoo':14 };
					if (!propinfo["New York"]) { propinfo["New York"]={ properties:{}, items:{} }; }
					
					propinfo["New York"].properties[nums[this.id.substr(10)]]={ parts:[] };
					var o=propinfo["New York"].properties[nums[this.id.substr(10)]];
					var q=propinfo["New York"].items;
					
					$(this).find('.cs_sleeve .upgrade_card_outer').each(function(){
						var r=$(this);
						var itemid=parseInt(r.find('.upgrade_card_item > img').attr('item_id'));
						var p={ id:itemid };
						if (!q[itemid]) {
							q[itemid]={};
							q[itemid].name=r.find('.upgrade_card_name').text().trim();
							q[itemid].have=parseInt(r.find('.upgrade_card_amounts > span:first').text().trim());
							q[itemid].img=r.find('.upgrade_card_item > img').attr('src');
						}
						p.need=parseInt(r.find('.upgrade_card_amounts > span:last').text().trim());
						o.parts.push(p);
					});
				}
			})
//			console.log(JSON.parse(JSON.stringify(propinfo)));
			if (m=/currentCityId\'\].\=.parseInt\(\"(\d)\"\)/.exec(msg)) {
				returnCity=parseInt(m[1]);
			}
		}
		
		
		function parse_crafting_v2(msg,o,prop) {
			var i;
			data=jQuery.parseJSON(msg);
			data2=jQuery.parseJSON(data.data);
			o.items=new Array();
			o.level=data2.properties[prop].level;
			for(i in data2.properties[prop].purchase_items) {
				var itemsource=data2.properties[prop].purchase_items[i];
				var item=new Object();
				item.name=itemsource.name;
				item.attack=itemsource.attack;
				item.defense=itemsource.defense;
				item.special=itemsource.special_ability_text;
				item.itemid=itemsource.id;
				item.locked=itemsource.unlock_level>o.level;
				item.reqitems=new Array();
				if(itemsource.price!="0"){
					item.reqitems.push(new Object());
					item.reqitems[0].need=parseInt(itemsource.price);
					item.reqitems[0].have=parseInt(data2.cash)+parseInt(data2.acct_balance);
					item.reqitems[0].img=(prop==6?'http://mwfb.static.zgncdn.com/mwfb/graphics/icon_cash_italy_16x16_02.png':'http://mwfb.static.zgncdn.com/mwfb/graphics/brz_real_sm.png');
				}
				if(itemsource.rp!="0"){
					item.reqitems.push(new Object());
					item.reqitems[1].need=parseInt(itemsource.rp);
					item.reqitems[1].have=parseInt(data2.rp);
					item.reqitems[1].img='http://mwfb.static.zgncdn.com/mwfb/graphics/large_coin.gif';
				}
				o.items.push(item);
			}
			o.waittime=parseInt(data2.properties[prop].last_purchase_time_stamp)+parseInt(data2.properties[prop].purchase_refresh_rate)-unix_timestamp();
			if (o.waittime<0) { o.waittime=0; }
			o.speedup=data2.properties[prop].cost_of_speed_up_value;
			o.available_purchases=data2.properties[prop].available_purchases;
		}
		
		function parse_propinfo_v2(msg,city) {
			propinfo[city]=new Object();
			var o=propinfo[city],i,j;
			data=jQuery.parseJSON(msg);
			data2=jQuery.parseJSON(data.data);
			o.properties=new Object();
			for(i=0;i<data2.properties.length;i++) {
				o.properties[i]=new Object();
				o.properties[i].level=data2.properties[i].level;
				o.properties[i].maxlevel=data2.properties[i].maxlevel;
				o.properties[i].id=data2.properties[i].id;
				o.properties[i].name=data2.properties[i].name;
				o.properties[i].type=data2.properties[i].type;
				o.properties[i].nextask=parseInt(parseInt((data2.ask_friends_next_time)-unix_timestamp())/3600);
				o.properties[i].parts=new Array();
				for(j=0;j<data2.properties[i].parts_required.length;j++) {
					o.properties[i].parts.push({ id:data2.properties[i].parts_required[j].id,need:data2.properties[i].parts_required[j].quantity });
				}
			}
			o.items=new Object();
			for(i=0;i<data2.items.length;i++) {
				o.items[data2.items[i].id]=new Object();
				o.items[data2.items[i].id].name=data2.items[i].name;
				o.items[data2.items[i].id].have=data2.items[i].num_owned;
				o.items[data2.items[i].id].img=data2.items[i].image_url;
			}
		}
		
		function parse_crafting(msg,o) {
			var jmsg=$(msg),m;
			o.items=new Array();
			jmsg.find('li[id*=VehicleObject]').each(function(index,element){
				var item=new Object();
				item.name=$.trim($(element).find('#RecipeName'+index).text());
				item.reqitems=new Array();
				item.attack=$(element).find('.sexy_attack').text().replace(' Attack','');
				item.defense=$(element).find('.sexy_defense').text().replace(' Defense','');
				item.special=$(element).find('#ItemSpecial'+index).text().trim();
				item.locked=$(element).find('.sexy_lock').length>0;
				
				if(m=/recipe=(\d+)\&/.exec($(element).find('#BuildButton'+index).html())){
					item.itemid=parseInt(m[1]);
				} else {
					item.itemid=-1;
				}
				$(element).find('.req_item').each(function(index2,element2){
					var req=new Object();
					var m=$(element2).find('span').text().split('/');
					req.have=parseInt(m[0]);
					req.need=parseInt(m[1]);
					req.img=$(element2).find('img').prop('src');
					req.itemid=$(element2).find('img').prop('item_id');
					req.name=$(element2).find('img').prop('title');
					item.reqitems.push(req);			
				});
				o.items.push(item);
			});
			if(m=/CountdownTimer\(pageCount, (\d+),/.exec(msg)) {
				o.waittime=parseInt(m[1]);
			} else {
				o.waittime=0;
			}
					
			if (m=/Build Now for (\d+)/.exec(jmsg.find('div[id*=Timer]').html())) {
				o.speedup=m[1];
			} else {
				o.speedup=0;
			}
		}
		
		function parse_propinfo_all(msg,city){
			var nycashimg='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAABVElEQVR4nGNgoBwUrNKc+84SlywzModLgNk9R8o6StRcKNXdx9k3xO2XxJVbxz4jq2FEVl2ySUPBkNuQLRVZRVVF3fb+51jscssVm/7K8PTXGae/zhCRZ+PiZ47qkT39dca2q5OQlbHAWUoWnD++//rD9peBgUHPi+/i1o/LSh6/uFvz/eNf7E4KaBA1C+O3Fc2Di3x69ae8qO7Kzi/YNQhIs6QsluDkY3KUKkRWce/k95TAKjgXEUr8UsynVnwWkGF6w3VSkdfi/7//EMTBw6QuZn3gwAF0G/J3Cx+Z8/Xsyh98Eky63hwmEZxwqYmub7HYIGPMpOrI+vXdv6cX/r68/VvBkpmF8//fv/9uHfx578gfLH7QDWAxjWFjQAWfXv7b2fjz86v/WDQwMDCoODEJKzLKmTOx8zA+PPHv7f1/d/b9+/WVgQCwymaMWMhESBXtAAARCn7dpYHSQgAAAABJRU5ErkJggg==';
			var m,data,data2,i,currency={"Bangkok":"B$","New York":"$"},currencyimg={"Bangkok":"http://mwfb.static.zgncdn.com/mwfb/graphics/icon_cash_bangkok_16x16_01.gif","New York":nycashimg};
			if (m=/flashvars.=.(\{.*\});swfobject/.exec(msg)) {
				data=eval('('+m[1]+')');
				data2=JSON.parse(unescape(data.mw_data));
	//			alert(dump(data2));
				if (!propinfo[city]) { propinfo[city]={}; }
				o=propinfo[city];
				if (!o.properties) { o.properties=new Object(); }
				
				for(i=0;i<data2.length;i++) {
					if (!o.properties[data2[i].property_id]) { o.properties[data2[i].property_id]={}; }
					p=o.properties[data2[i].property_id];
					p.level=data2[i].level;
					p.maxlevel=data2[i].maxlevel;
					p.id=data2[i].property_id;
					p.type=data2[i].type;
					if (!p.parts) {
						p.parts=[{ id: "-1", need: data2[i].upgrade_cost }];
					}
					p.name=data2[i].name.replace('+',' ');
				}
				if (!o.items) { o.items={}; }
				o.items["-1"]={ name:currency[city], have:'', img:currencyimg[city] };
			}
		}
		
		function parse_propinfo_chop(msg,name){
			var i,m,pop=$(msg).find('div.pop_box'),m,nums={'chopshop':11, 'weaponsdepot':12,'armory':13,'zoo':14, 'port':6, 'blackmarket':2,'workshop':1 };
			var o=propinfo["New York"].properties[nums[name]];
			var p=[],q=propinfo["New York"].items;
			var divs=pop.find("div > div:contains(' of ')");
			if (m=/You can ask friends for help again in (\d+) h/.exec(pop.text())) {
				o.nextask=parseInt(m[1]);
			} else {
				o.nextask=-1;
			}
			for(i=0;i<divs.length;i++) {
				var text=$(divs[i]).find("div:contains(' of ')");
				var img=$(divs[i]).find("img.item_with_preview");
				if(m=/([\s\w]+) \((\d+) of (\d+)\)/.exec(text.text())){
					p[p.length]={}; q[img.prop('item_id')]={};
					
					p[p.length-1].id=img.prop('item_id');
					p[p.length-1].need=m[3];
					q[img.prop('item_id')].name=$.trim(m[1]);
					q[img.prop('item_id')].img=img.prop('src');
					q[img.prop('item_id')].have=m[2];
				}
			}
			o.parts=p;
			
		}
		
		function update_craftinfo() {
			var i,j,h,debugout=[],html='',
			names={ '1':'Sports Bar','2':'Venetian Condo','3':'Tads Gun Shop','4':'Biker Clubhouse','5':'Martial Arts Dojo','7':'Cemetery','6':'Botanical Garden','weapons_depot':'Weapons Depot','armory':'Armory','chop_shop':'Chop Shop','private_zoo':'Private Zoo','port':'Italy Port','blackmarket':'Brazil Blackmarket','workshop':'Brazil Workshop','speakeasy':'Chicago Speakeasy','warehouse':'Chicago Warehouse' };
			for(i in craftinfo) {
				html+=names[i]+': <select id="buildoptions_'+i+'" class="buildoptions" disabled="disabled" name="'+spocklet+'_savecookie"><option value="0">Select '+names[i]+' build</option></select><span id="buildinfo_'+i+'"></span><span id="buildreqs_'+i+'"></span><br />';
			}
			$('#'+spocklet+'_section_craft_selects').html(html);
						
			for(i in craftinfo) {
				$('#buildoptions_'+i).html('<option value="-1">--- do not craft ---</option>')
				for(j in craftinfo[i].items) {
					var name=(craftinfo[i].items[j].locked?'(locked) ':'')+craftinfo[i].items[j].name + ' ('+craftinfo[i].items[j].attack+'A,'+craftinfo[i].items[j].defense+'D'+(craftinfo[i].items[j].special?' '+craftinfo[i].items[j].special:'')+')';
					$('#buildoptions_'+i).append(new Option(name,j));
					var tmpitem={}; tmpitem[craftinfo[i].items[j].name]=craftinfo[i].items[j].itemid;
					debugout.push(tmpitem);
				}
				$('#buildoptions_'+i).prop('disabled','');
				var html="";
				html+=(craftinfo[i].waittime==0?' craft now':' craft in '+format_in(craftinfo[i].waittime)+'s')+' ';
				html+=(craftinfo[i].speedup?'or <a href="#" '+(rp_enabled?' style="display:inline-block;"':'')+'id="'+spocklet+'_speedcraft_'+i+'" class="'+spocklet+'_speedcraft sexy_button_new short red sexy_coin_new '+spocklet+'_showrp"><span><span>speedup for '+craftinfo[i].speedup+'</span></span></a>':'');
				$('#buildinfo_'+i).html(html);
				
				// set buttons
				$('#buildoptions_'+i).change(function(){
					try {
						var spanid=this.id.replace('buildoptions','buildreqs');
						var shopname=this.id.replace('buildoptions_','');
						var num=parseInt($(this).val());
						
						var html;
						if (craftinfo[shopname].available_purchases) {
							html="x"+craftinfo[shopname].available_purchases+"<br />";
						} else {
							html="<br />";
						}
							
						var can=999999;
						for(h in craftinfo[shopname].items[num].reqitems) {
							var item=craftinfo[shopname].items[num].reqitems[h];
							html+=format_items(item.have,item.need,item.img,item.name);
								if (parseInt(item.have/item.need)<can) {
									can=parseInt(item.have/item.need)
								}
						}
						html+=' max: '+(can==999999?'unlimited':can)+'. ';
						$('#'+spanid).html(html);
						$('#'+spocklet+"_craftrepeatitem_"+shopname).html(craftinfo[shopname].items[num].name+', max: '+(can==999999?'unlimited':can));
					} catch (ignore) {}
				});
				$('#buildoptions_'+i).trigger('change');
			}
			//console.log(JSON.stringify(debugout));
			// speed up buttons
			
			$('.'+spocklet+'_speedcraft').click(function(){
				var shop=/_speedcraft_(\w+)$/.exec(this.id)[1],nums={'chopshop':11, 'weaponsdepot':12,'armory':13,'zoo':14, 'port':6, 'blackmarket':2,'workshop':1 };
				var shopnum=nums[shop];
				if (shopnum>10) { // NY
					request('html_server.php?xw_controller=PropertyV2&xw_action=speedup&xw_city=1&tmp=&cb=&xw_person='+personid+'&mwcom=1&building_type='+shopnum+'&city=1&module=',function(msg){
						request('html_server.php?xw_controller=propertyV2&xw_action=open_chop_crafting&xw_city=1&xw_person='+personid+'&mwcom=1&building_type='+shopnum+'&xw_client_id=8',function(msg){
							craftinfo[shop]=new Object();
							parse_crafting(msg,craftinfo[shop]);
							update_craftinfo();
						});
					});
				} else if (shopnum>5) { // Italy
					alert('Speedup in Italy? You crazy?');
				} else { // Brazil
					alert('Speedup in Brazil? You crazy?');
				}
			});
			
		}
		
		function update_propinfo() {
			var html="",city,prop,i;
			var beginfo_tmp=[];
			var cityid={"New York":1,"Brazil":7,"Italy":6,"Vegas":5, "Chicago":8};
			for(city in propinfo){
				html+="<br /><b><u>City: "+city+"</u></b><br />";
				var o=propinfo[city];
				
				for(prop in o.properties) {
					var p=propinfo[city].properties[prop];
					html+="<b>Property: "+p.name+" Level "+p.level+(p.maxlevel>0?"/"+p.maxlevel:'')+"</b>"+(p.nextask?", ask "+(p.nextask>0?'in '+p.nextask+' hours':'now'):"")+"<br />";
					if ((p.maxlevel==0) || (p.level<p.maxlevel)) {
						html+='<a href="#" id="upgradelink_'+cityid[city]+'_'+p.id+'" class="upgradelink sexy_button_new short white"><span><span>Upgrade</span></span></a> <span id="upgrademsg_'+cityid[city]+'_'+p.id+'"></span><br />';
						for(i=0;i<p.parts.length;i++){
							var q=p.parts[i], r=o.items[q.id], askcode,buycode;
							html+=format_items(r.have,q.need,r.img,r.name);
							if (q.id!=-1) { // no ask for money ;)
								if (city=="New York") {
									askcode='do_ajax("popup_permanence", "remote/html_server.php?xw_controller=propertyV2&xw_action=cs_post_item_feed&xw_city=1&tmp=&cb=&xw_person='+personid+'&mwcom=1&item='+q.id+'&building_type='+p.id+'", 1, 0, 0, 0)';
								} else {
									askcode='do_ajax("popup_fodder", "remote/html_server.php?xw_controller=propertyV2&xw_action=askForHelp&xw_city='+cityid[city]+'&tmp=&cb=&xw_person='+personid+'&mwcom=1&city='+cityid[city]+'&building_type='+p.id+'&item_type=1&item_id='+q.id+'", 1)';
								}
								html+=' <a href="#" onclick=\''+askcode+'; return false;\' class="sexy_button_new short"><span><span>Ask</span></span></a> ';
								
							}
						}
					}
					
					for(i=0;i<p.parts.length;i++){
						var q=p.parts[i], r=o.items[q.id], askcode;
						if(q.id!=-1) {
							var item_tmp={itemid: q.id,property:p.id,name:r.name, img:r.img};
							beginfo_tmp.push(item_tmp);
						}
					}
					html+="<br />";
				}
				html+="<br />";
			}
			//console.log(JSON.stringify(beginfo_tmp));
			$('#'+spocklet+"_upgrading").html(html);
			// upgrade links
			$('.upgradelink').click(function(){
				var m;
				if (m=/upgradelink_(\d+)_(\d+)$/.exec(this.id)) {
					//       html_server.php?xw_controller=propertyV2&xw_action=open_chop_pop&xw_city=1&tmp=&cb=&xw_person=&mwcom=1&building_type=14&xw_client_id=8&ajax=1&clicks=128&liteload=1&sf_xw_sig=&sf_xw_user_id=p%7C
					request('html_server.php?xw_controller=propertyV2&xw_action=buy&xw_city='+m[1]+'&tmp=&cb=&xw_person='+personid+'&mwcom=1&building_type='+m[2]+'&city='+m[1]+'&xw_client_id=8&requesttype=json',function(msg){
					data=jQuery.parseJSON(msg);
						data2=jQuery.parseJSON(data.data);
						if (data2.success_message) {
							$('#upgrademsg_'+m[1]+'_'+m[2]).html(data2.success_message);
							$('#upgrademsg_'+m[1]+'_'+m[2]).animate({ color: "green" }, 500, "swing" ,function() { $('#upgrademsg_'+m[1]+'_'+m[2]).animate({ color: "white" }, 500); });
						} else if (data2.description) {
							$('#upgrademsg_'+m[1]+'_'+m[2]).html(data2.description);
							$('#upgrademsg_'+m[1]+'_'+m[2]).animate({ color: "green" }, 500, "swing" ,function() { $('#upgrademsg_'+m[1]+'_'+m[2]).animate({ color: "white" }, 500); });
						} else if (data2.result) {
							$('#upgrademsg_'+m[1]+'_'+m[2]).html(data2.result);
							$('#upgrademsg_'+m[1]+'_'+m[2]).animate({ color: "green" }, 500, "swing" ,function() { $('#upgrademsg_'+m[1]+'_'+m[2]).animate({ color: "white" }, 500); });
						} else {
							$('#upgrademsg_'+m[1]+'_'+m[2]).html('Upgrade not sucessful!');
							$('#upgrademsg_'+m[1]+'_'+m[2]).animate({ color: "green" }, 500, "swing" ,function() { $('#upgrademsg_'+m[1]+'_'+m[2]).animate({ color: "white" }, 500); });
						}
					});
				}
				return false;			
			});
		}
		
		
		function update_beginfo() {
			var i,num=0,html="<span class='bad'>Please note. Begging may not work even if it says \"Ask now\". This may have different reasons, nothing we can do about it. Please do not report this as a bug!</span><br />",
				city,cityid={"New York":1,"Brazil":7,"Italy":6,"Vegas":5, "Chicago":8},doneitems={};
			// NY
			html+="<br /><b><u>City: New York</u></b><br />";
			for(i=0;i<begging_items.length;i++){
				var item=begging_items[i];
				if (num!=item.property) { 
					num=item.property; 
					html+='<br />'+(propinfo["New York"].properties[item.property].nextask<0?"Ask now!":'Ask in '+propinfo["New York"].properties[item.property].nextask+' hours')+'<br />';  
				}
				var askcode='do_ajax("popup_permanence", "remote/html_server.php?xw_controller=propertyV2&xw_action=cs_post_item_feed&xw_city=1&tmp=&cb=&xw_person='+personid+'&mwcom=1&item='+item.itemid+'&building_type='+item.property+'", 1, 0, 0, 0)';
				html+='<img width=32 height=32 alt="'+item.name+'" title="'+item.name+'" src="'+item.img+'" style="cursor:pointer;" onclick=\''+askcode+'; return false;\' /> ';
			}
			// rest
			for(city in propinfo){
				if (cityid[city]>4) {
					html+="<br /><b><u>City: "+city+"</u></b><br />"+(propinfo[city].properties[1].nextask<0?"Ask now!":"Ask in "+propinfo[city].properties[1].nextask+" hours")+"<br />";
					var o=propinfo[city];
					
					for(prop in o.properties) {
						var p=propinfo[city].properties[prop];
						for(i=0;i<p.parts.length;i++){
							var q=p.parts[i], r=o.items[q.id], askcode;
							if (!doneitems[q.id+city]) {
								askcode='do_ajax("popup_fodder", "remote/html_server.php?xw_controller=propertyV2&xw_action=askForHelp&xw_city='+cityid[city]+'&tmp=&cb=&xw_person='+personid+'&mwcom=1&city='+cityid[city]+'&building_type='+p.id+'&item_type=1&item_id='+q.id+'", 1)';
								html+='<img width=32 height=32 alt="'+r.name+'" title="'+r.name+'" src="'+r.img+'" style="cursor:pointer;" onclick=\''+askcode+'; return false;\' /> ';
								doneitems[q.id+city]=1;
							}
						}
					}
				}
			}
			$('#'+spocklet+'_parts').html(html);
		}	
		function update_repeatinfo() {
			var m,i,html="",city,cityid={"New York":1, "Brazil":7,"Italy":6,"Vegas":5, "Chicago":8};
			for(city in propinfo){
				if (cityid[city]<5) {
					for(prop in propinfo[city].properties) {	
						var p=propinfo[city].properties[prop];
						if ((p.maxlevel<=0) || (p.level<p.maxlevel)) {
							html+="<b>Property: "+p.name+"</b> Level: "+p.level+(p.maxlevel>0?", Max Level: "+p.maxlevel:'')+" upgrade to: <input type='text' class='"+spocklet+"_upgraderepeat' id='"+spocklet+"_upgraderepeat_"+p.id+"_"+cityid[city]+"_"+p.level+"' value='"+p.level+"' /><span id='"+spocklet+"_upgraderepeatlog_"+p.id+'_'+cityid[city]+"'></span><br />";
						}
					}
				}
			}
			html+='<a href="#" id="'+spocklet+'_upgraderepeat" class="sexy_button_new green short"><span><span>Upgrade all properties</span></span></a> ';
			html+='<a href="#" style="display:none;" id="'+spocklet+'_upgraderepeatstop" class="sexy_button_new red short"><span><span>Stop upgrading</span></span></a><br />';
			
			craftallowed=['chop_shop','weapons_depot','armory','private_zoo'];
			for(i in craftallowed) {
				
				html+='<b>'+craftallowed[i]+"</b> craft <span id='"+spocklet+"_craftrepeatitem_"+craftallowed[i]+"'></span> <input type='text' class='"+spocklet+"_craftrepeat' id='"+spocklet+"_craftrepeat_"+craftallowed[i]+"' value='0' /> times. <span id='"+spocklet+"_craftrepeatlog_"+craftallowed[i]+"'></span><br />";
			}
			html+='<a href="#" id="'+spocklet+'_craftrepeat" class="sexy_button_new short red sexy_coin_new '+spocklet+'_showrp"><span><span>Craft selected items</span></span></a> Needs RP spending enabled!<br />';
			html+='<a href="#" style="display:none;" id="'+spocklet+'_craftrepeatstop" class="sexy_button_new short red"><span><span>Stop crafting</span></span></a><br />';
			
			
			$('#'+spocklet+'_repeat').html(html);

			$('#'+spocklet+'_upgraderepeat').click(function(){
				upgrade_properties=[]; errorcount=0; repeatrun=true;
				$('.'+spocklet+'_upgraderepeat').each(function(){
					if (m=/_upgraderepeat_(\d+)_(\d+)_(\d+)$/.exec(this.id)) {
						var cid=m[2],pid=m[1],count=(parseInt($(this).val())-parseInt(m[3]));
						if(count>0) {
							upgrade_properties.push({ "city":cid,"prop":pid,"count": count});
							$('#'+spocklet+'_upgraderepeatlog_'+pid+'_'+cid).html('Upgrading this one x'+count);
						}
					}
				});
				$('#'+spocklet+'_upgraderepeat').css('display','none');
				$('#'+spocklet+'_upgraderepeatstop').css('display','inline-block').click(function(){ 
					repeatrun=false; 
					$('#'+spocklet+'_upgraderepeat').css('display','inline-block');
					$('#'+spocklet+'_upgraderepeatstop').css('display','none');
					return false;
				});
				upgrade_repeat();
				return false;
			});
			$('#'+spocklet+'_craftrepeat').click(function(){
				craft_todo=[]; errorcount=0; craftrun=true;
				$('.'+spocklet+'_craftrepeat').each(function(){
					if (m=/_craftrepeat_(\w+)$/.exec(this.id)) {
						var count=parseInt($(this).val()), prop=m[1];
						if (count>0) {
							craft_todo.push({ "prop":prop,"count":count });
							$('#'+spocklet+'_craftrepeatlog_'+prop).html('Crafting this one x'+count);
						}
					}
				});
				craft_repeat();
				return false;
			});			
			
		}
		
		function get_property_info(){
			loadlog('Switch NY Properties',1,11);
			select_v3('1,2,3,4,5',function(){
				loadlog('NY Crafting',2,11);
				request('html_server.php?xw_controller=LimitedTimeProperty&xw_action=showProperties&xw_city=1&tmp=&cb=&xw_person='+personid+'&mwcom=1&view_tab=build&page_click=viewV2&from=property&prop_id=1&xw_client_id=8',function(msg){
					parse_property_v3(msg);
					loadlog('Switch NY Properties',3,11);
					select_v3('weapons_depot,armory,chop_shop,private_zoo,7',function(){
						loadlog('NY Crafting II',4,11);
						request('html_server.php?xw_controller=LimitedTimeProperty&xw_action=showProperties&xw_city=1&tmp=&cb=&xw_person='+personid+'&mwcom=1&view_tab=build&page_click=viewV2&from=property&prop_id=1&xw_client_id=8',function(msg){
							parse_property_v3(msg);
							loadlog('Travel to NY',5,11);
							travel(1,function(){
								loadlog('Read NY Properties',6,11);
								request('html_server.php?xw_controller=propertyV2&xw_action=view&xw_city=6&tmp=&cb=&xw_person='+personid+'&mwcom=1&xw_client_id=8',function(msg){
									parse_propinfo_all(msg,'New York');
									loadlog('Read Italy Properties',7,11);
									request('html_server.php?xw_controller=propertyV2&xw_action=createData&xw_city=6&tmp=&cb=&xw_person='+personid+'&city=6',function(msg){
										craftinfo.port=new Object();
										parse_crafting_v2(msg, craftinfo.port,6);
										// parse_propinfo_v2(msg,"Italy");
										
										loadlog('Read Brazil Properties',8,11);
										request('html_server.php?xw_controller=propertyV2&xw_action=createData&xw_city=6&tmp=&cb=&xw_person='+personid+'&city=7',function(msg){
											craftinfo.blackmarket=new Object();
											parse_crafting_v2(msg, craftinfo.blackmarket,2);
											// parse_propinfo_v2(msg,"Brazil");
											craftinfo.workshop=new Object();
											parse_crafting_v2(msg, craftinfo.workshop,1);
											
											// loadlog('Read Vegas Properties',9,11);
											// request('html_server.php?xw_controller=propertyV2&xw_action=createData&xw_city=6&tmp=&cb=&xw_person='+personid+'&city=5',function(msg){
												// parse_propinfo_v2(msg,"Vegas");
												
												loadlog('Read Chicago Properties',10,11);
												request('html_server.php?xw_controller=propertyV2&xw_action=createData&xw_city=8&tmp=&cb=&xw_person='+personid+'&city=8',function(msg){
													// parse_propinfo_v2(msg,"Chicago");
													craftinfo.speakeasy=new Object();
													parse_crafting_v2(msg, craftinfo.speakeasy,1);
													craftinfo.warehouse=new Object();
													parse_crafting_v2(msg, craftinfo.warehouse,2);
													update_craftinfo();
													update_propinfo();
													// update_beginfo();
													update_repeatinfo();
													loadForm(spocklet+'_savesettings');
													$('#'+spocklet+'_crafting').css('display','');
													loadlog('done',11,11);
												});
											// });
										});
									});
								});
							});
						});
					});
				});
			});
			
		}
		
		function craft_repeat() {
			var nums={'chop_shop':11, 'weapons_depot':12,'armory':13,'private_zoo':14, '1':15, 'port':6, 'blackmarket':2,'workshop':1 };
			if((craft_todo.length>0) && repeatrun) {
				var item=craft_todo[0], shopnum=nums[item.prop];
				request('html_server.php?xw_controller=PropertyV2&xw_action=speedup&xw_city=1&tmp=&cb=&xw_person='+personid+'&mwcom=1&building_type='+shopnum+'&city=1&module=',function(msg){
					craft_v1(item.prop,shopnum,function(){
						item.count--;
						if (item.count==0) {
							craft_todo.shift();
							$('#'+spocklet+'_craftrepeatlog_'+item.prop).html('Done crafting.');
						} else {
							$('#'+spocklet+'_craftrepeatlog_'+item.prop).html('Crafting this one x'+item.count);
						}
						craft_repeat();
					});
				},function(){
					errorcount++;
					if(errorcount>=3) {
						log('Too many errors, stopping');
					} else {
						log('Error #'+errorcount+', trying again');
						upgrade_repeat();
					}
				});
			} else {
				$('#'+spocklet+'_upgraderepeat').css('display','inline-block');
				$('#'+spocklet+'_upgraderepeatstop').css('display','none');
			}
			
		}
		
		function upgrade_repeat() {
			if ((upgrade_properties.length>0) && repeatrun) {
				var item=upgrade_properties[0];
				request('html_server.php?xw_controller=propertyV2&xw_action=buy&xw_city='+item.city+'&tmp=&cb=&xw_person='+personid+'&mwcom=1&building_type='+item.prop+'&city='+item.city+'&xw_client_id=8&requesttype=json',function(msg){
					item.count--;
					if (item.count==0) {
						upgrade_properties.shift();
						$('#'+spocklet+'_upgraderepeatlog_'+item.prop+'_'+item.city).html('Done upgrading.');
					} else {
						$('#'+spocklet+'_upgraderepeatlog_'+item.prop+'_'+item.city).html('Upgrading this one x'+item.count);
					}
					upgrade_repeat();
				},function(){
					errorcount++;
					if(errorcount>=3) {
						log('Too many errors, stopping');
					} else {
						log('Error #'+errorcount+', trying again');
						upgrade_repeat();
					}
				});
			} else {
				$('#'+spocklet+'_upgraderepeat').css('display','inline-block');
				$('#'+spocklet+'_upgraderepeatstop').css('display','none');
			}
		}
		
		function craft_v1(shopname,num,handler) {
			var itemnum=$('#buildoptions_'+shopname).val();
			if (!craftinfo[shopname].items[itemnum]) {
				handler();
				return;
			}
			var itemid=craftinfo[shopname].items[itemnum].itemid;
			if (itemid==-1) {
				if (all_items[craftinfo[shopname].items[itemnum].name]) { itemid=all_items[craftinfo[shopname].items[itemnum].name]; }
			}
			
			if (itemid!=-1) {
				var url='html_server.php?xw_controller=propertyV2&xw_action=craft&xw_city=1&recipe='+itemid+'&building_type='+num;
				request(url,function(msg){
					var m;
					if (m=/You built (.*?)\./.exec(msg)){
						log('You built a '+m[1]+'.');
					} else if (m=/You got (.*?)\./.exec(msg)){
						log('You got '+m[1]+'.');
					} else {
						log('Crafting '+shopname+' not sucessful!');
					}
					if (returnCity==0) {
						if (m=/currentCityId\'\].\=.parseInt\(\"(\d)\"\)/.exec(msg)) {
							returnCity=parseInt(m[1]);
						}
					}
					handler();
				});
			} else {
				handler();
			}
		}
		
		// craft in italy/vegas/brazil
		function craft_v2(shopname,num,city,handler) {
			var itemnum=$('#buildoptions_'+shopname).val();
			if (!craftinfo[shopname].items[itemnum]) {
				handler();
				return;
			}
			var itemid=craftinfo[shopname].items[itemnum].itemid;
			
			if (itemid==-1) {
				handler();
				return;
			}
			
			var url='html_server.php?xw_controller=propertyV2&xw_action=portBuyItem&xw_city='+city+'&xw_person='+personid+'&mwcom=1&building_type='+num+'&city='+city+'&id='+itemid+'&xw_client_id=8&ajax=1&clicks='+User.clicks+'&liteload=0';
			request(url,function(msg){
				try {
					data=jQuery.parseJSON(msg);
					data2=jQuery.parseJSON(data.data);
					log(data2.purchase_message);
					if (data2.available_purchases && (data2.available_purchases>0)) {
						// repeat buy?
					}
				} catch(ignore) {}
				handler();
			});
		}
		
		// craft using the limitedTimeProperty controller
		function craft_v3(shopname,num,handler) {
			var itemnum=$('#buildoptions_'+shopname).val();
			
			if (!craftinfo[shopname]) {
				handler();
				return;
			}
			
			if (!craftinfo[shopname].items[itemnum]) {
				handler();
				return;
			}
			var itemid=craftinfo[shopname].items[itemnum].itemid;

			if (itemid==-1) {
				if (all_items[craftinfo[shopname].items[itemnum].name]) { itemid=all_items[craftinfo[shopname].items[itemnum].name]; }
				if (all_items[craftinfo[shopname].items[itemnum].name + craftinfo[shopname].items[itemnum].level]) { itemid=all_items[craftinfo[shopname].items[itemnum].name + craftinfo[shopname].items[itemnum].level]; }
			}
			
			if (itemid!=-1) {
				select_v3('weapons_depot,armory,chop_shop,private_zoo,'+shopname,function(){
					var url='html_server.php?xw_controller=limitedTimeProperty&xw_action=build&xw_city=1&xw_person='+personid+'&mwcom=1&rec_id='+itemid+'&prop_id='+num+'&xw_client_id=8';
					request(url,function(msg){
						var m;
						if (m=/You built (.*?)\./.exec(msg)){
							log('You built a '+m[1]+'.');
						} else if (m=/You got (.*?)\./.exec(msg)){
							log('You got '+m[1]+'.');
						} else {
							log('Crafting '+shopname+' not sucessful!');
						}
						handler();
					});
				});
			} else {
				handler();
				return;
			}
		}
		
		/*
				maybe... just a thought... this could be done easier...
		*/
		function craft_items() {
			returnCity=0;
			craft_v1('chop_shop',11,function(){
				craft_v1('weapons_depot',12,function(){
					craft_v1('armory',13,function(){
						craft_v1('private_zoo',14,function(){
							craft_v3('1',1,function(){ // sports bar!
								craft_v3('2',2,function(){ // italian dings
									craft_v3('3',3,function(){ // gun shop
										craft_v3('4',4,function(){ // thingy
											craft_v3('5',5,function(){ // mojo
												craft_v3('7',7,function(){ // Cemetery
													travel(6,function(){
														craft_v2('port',7,6,function(){
															travel(7,function(){
																craft_v2('blackmarket',3,7,function(){
																	craft_v2('workshop',2,7,function(){
																		travel(8,function(){
																			craft_v2('warehouse',3,8,function(){
																				craft_v2('speakeasy',2,8,function(){
																					if (returnCity!=0) {
																						travel(returnCity,function(){
																							log("Travel back to starting city");
																						});
																					}
																				});
																			});	
																		});
																	});
																});
															});
														});
													});
												});
											});
										});
									});
								});
							});
						});
					});
				});
			});
		}

		function select_v3(property, callback){ // will always select the "main 4" plus one of the new properties
			var props=property;
			request('html_server.php?xw_controller=LimitedTimeProperty&xw_action=saveProperties&xw_city=1&xw_person='+User.id.substr(2)+'&mwcom=1&properties='+props+'&xw_client_id=8',function(){
				callback();
			});
		}
		
		function crew_member(id,slot,handler) {
			request('html_server.php?xw_controller=CityCrew&xw_action=activate&xw_city='+id+'&tmp=&cb=&xw_person='+personid+'&mwcom=1&isajax=1&crew_city='+id+'&crew_type=prop&crew_dsp_type=prop&crew_slot='+slot+'&xw_client_id=8',function(msg){
				handler();
			});
		}
		
			
		var nextrun=0;
		function run_restart(){
			if ($('#restart_craft')[0].checked) {
				setTimeout(run_restart,1000*60); // check back every minute
				if (nextrun<unix_timestamp()) { // do action
					if ($('#restart_craft')[0].checked) {
						setTimeout(craft_items, 40000); // wait 20s before crafting
					}					
					nextrun=unix_timestamp()+60*parseInt($('#restart_wait').val());
				}
				$('#'+spocklet+'_restart_timer').html('Next run in '+parseInt((nextrun-unix_timestamp())/60)+' minutes');
			} else {
				$('#'+spocklet+'_restart_timer').html('Nothing to do, stopped.');
			}
		}	


		function bind_buttons() {
			$('#'+spocklet+'_close').click(function() {
				run = false;
				clearTimeout(timer);
				$('#'+spocklet+'_main').remove();
				document.getElementById('user_stats').getElementsByClassName('experience')[0].innerHTML = 'Experience to Level Up <strong><span id="exp_to_next_level" style="text-align: right; float: right; min-width: 3 min-width: 30px;">Spock on!</span></strong>';
			});		
			$('#'+spocklet+'_crafting').click(function() {
				saveForm(spocklet+'_savesettings');
				craft_items();
				return false;
			});
			$('#'+spocklet+'_runrestart').click(function() {
				run_restart();
				return false;
			});
			$('#'+spocklet+'_enablerp').click(function() {
				if (confirm('Do you really want to enable RP spending functions? There is no more confirmation popup. You click, you spend! Don\'t come to us and whine about it.')) {
					$('.'+spocklet+'_showrp').css('display','inline-block');
					$(this).removeClass("red").addClass("green");
					$(this).html('<span><span>RP Spending Enabled</span></span>');
					rp_enabled=true;
				}
				return false;
			});
			$('[id*="_switch_"]').click(function() {
				var m=/_switch_(\w+)$/.exec(this.id);
				var section=$('#'+spocklet+'_section_'+m[1]);
				if(section.css("display")=="none") {
					section.show();
				} else {
					section.hide();
				}
				return false;
			});
			
		}
		
		function initialize() {
			//do stuff needed, fetch variables etc
			create_div();
			bind_buttons();
			get_property_info();
		}
		
		initialize();

	} catch(e) {
		errorreport(e);
	}
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
		pageTracker._trackPageview("/script/PropertyManager");
	}
	catch(err) {}
	//end analytics
})()