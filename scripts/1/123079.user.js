// ==UserScript==
// @name family-boss-fighter
// @namespace http://userscripts.org/scripts/show/113315
// @Gift-Blaster v0.21 beta 
// @description  http://spocklet.com/bookmarklet/giftblaster.js
// @copyright  - spockholm
// ==/UserScript==
/*
	$Id: giftblaster.js,v 1.21 2011-12-29 22:23:46 eike Exp $
	Send out gifts to a big bunch of people
	Author: Eike, Team Spockholm
*/


javascript:(function (){
	var spocklet='giftblast',
	debug=false,
	expert=false,
	explist=[],
	option='',
	rev=/,v \d+\.(\d+)\s201/.exec("$Id: giftblaster.js,v 1.21 2011-12-29 22:23:46 eike Exp $")[1],
	version = 'Gift-Blaster v0.'+rev+' beta';
	function giftObject(name,id,cat,color) {
		this.name = camelize(name);
		this.id = parseInt(id);
		this.cat = cat;
		this.color = color;
	}	
	var freegifts={};
	var allCats = {"487":8,"503":1,"523":1,"100":1,"504":1,"189":1,"422":1,"493":4,"417":1,"418":1,"438":1,"1005":1,"458":1,"456":1,"457":1};
		freegifts['Blue Mystery Bag'] = new giftObject('Blue Mystery Bag*',527,1);
//		freegifts['Red Mystery Bag'] = new giftObject('Red Mystery Bag*',86,1);
		freegifts['Special Part'] = new giftObject('Special Part*',189,1);
		//Amory Build
		//freegifts['Hammer'] = new giftObject('Hammer*',181,1,'#FF9966');
		//freegifts['Rivet'] = new giftObject('Rivet*',182,1,'#FF9966');
		//freegifts['Furnace'] = new giftObject('Furnace*',183,1,'#FF9966');
		//freegifts['Vice'] = new giftObject('Vice*',184,1,'#FF9966');
		//freegifts['Anvil'] = new giftObject('Anvil*',185,1,'#FF9966');
		//Italy Build
		//freegifts['Italian Hardwood'] = new giftObject('Italian Hardwood*',401,1,'#00CC00');
		//freegifts['Marble Slab'] = new giftObject('Marble Slab*',402,1,'#00CC00');
		//freegifts['Stone Column'] = new giftObject('Stone Column*',403,1,'#00CC00'); removed from freegiftables by Zynga
		//freegifts['Terracotta Tiles'] = new giftObject('Terracotta Tiles*',404,1,'#00CC00'); removed from freegiftables by Zynga
		//Vegas Build
		//freegifts['Cinder Block'] = new giftObject('Cinder Block*',161,1,'#FFCC00');
		//freegifts['Concrete'] = new giftObject('Concrete*',163,1,'#FFCC00');
		//freegifts['Construction Tool'] = new giftObject('Construction Tool*',164,1,'#FFCC00');
		//freegifts['Steel Girder'] = new giftObject('Steel Girder*',162,1,'#FFCC00');
		//freegifts['Slot Machine'] = new giftObject('Slot Machine*',160,1,'#FFCC00');
		//freegifts['Casino Dealer'] = new giftObject('Casino Dealer*',165,1,'#FFCC00');
		//freegifts['Chef'] = new giftObject('Chef*',166,1,'#FFCC00');
		//freegifts['Poker Table'] = new giftObject('Poker Table*',167,1,'#FFCC00');
		//freegifts['Bellhop'] = new giftObject('Bellhop*',168,1,'#FFCC00');
		//Zoo Build
		freegifts['Aquarium'] = new giftObject('Aquarium*',417,1,'#996633');
		//freegifts['Big Cage'] = new giftObject('Big Cage*',418,1,'#996633');
		//freegifts['Bird Cage'] = new giftObject('Bird Cage*',419,1,'#996633');
		//freegifts['Feeding Trough'] = new giftObject('Feeding Trough*',420,1,'#996633');
		//freegifts['Terrarium'] = new giftObject('Terrarium*',421,1,'#996633');
		//freegifts['Exotic Animal Feed'] = new giftObject('Exotic Animal Feed*',422,1,'#996633');		
		
		freegifts['Rare Secret Drop'] = new giftObject('Rare Secret Drop*',400,1);
		freegifts['Stamina Pack'] = new giftObject('Stamina Pack*',492,1);
		//freegifts['Time Capsule'] = new giftObject('Time Capsule*',4231,1);
		//freegifts['Coffin'] = new giftObject('Coffin*',434,1);
		
		//freegifts['Hidden Charges'] = new giftObject('Hidden Charges*',444,1);
		//freegifts['Cooked Book'] = new giftObject('Cooked Book*',445,1);
		//Tree parts
		//freegifts['Ornaments'] = new giftObject('Ornaments',431,1,'#B80000');
		//freegifts['Tree Lights'] = new giftObject('Tree Lights',432,1,'#B80000');
		//freegifts['Candy Cane'] = new giftObject('Candy Cane',433,1,'#B80000');
		//Brazil
		//freegifts['Brazilian Timbers'] = new giftObject('Brazilian Timbers',2679,1,'#B80000');
		//freegifts['Construction Worker'] = new giftObject('Construction Worker',2678,1,'#B80000');
		//freegifts['Button Camera'] = new giftObject('Button Camera*',458,1);
		//freegifts['Gas Can'] = new giftObject('Gas Can*',457,1);
		//freegifts['Local Informant'] = new giftObject('Local Informant*',456,1);
		
		//freegifts['Reinforced Steel'] = new giftObject('Reinforced Steel*',170,1);
		//freegifts['Cement Blocks'] = new giftObject('Cement Blocks*',70,1);
		//freegifts['Power Tools'] = new giftObject('Power Tools*',71,1);

		//freegifts['Hollow Point'] = new giftObject('Hollow Point*',477,1);
		//freegifts['A19 Riot Shield'] = new giftObject('A19 Riot Shield*',478,1);
		//freegifts['Life Saver'] = new giftObject('Life Saver*',502,1);
		//freegifts['Jungle Map'] = new giftObject('Jungle Map*',512,1);
		//freegifts['Casa Grande Reservation'] = new giftObject(' Casa Grande Reservation!*',515,1);

		freegifts['Camouflage'] = new giftObject('Camouflage*',484,1);
		
		
		//Chicago
		//freegifts['Union Worker'] = new giftObject('Union Worker*',1000,1,'#996633')
		//freegifts['Carpenter Nails'] = new giftObject('Carpenter Nails*',1001,1,'#996633');
		//freegifts['Lath Strips'] = new giftObject('Lath Strips*',1002,1,'#996633');
		//freegifts['Iron Cast'] = new giftObject('Iron Cast*',1003,1,'#996633');
		//freegifts['Douglas Fir Beams'] = new giftObject('Douglas Fir Beams*',1004,1,'#996633');
		
		freegifts['Brazil/Chicago Crew'] = new giftObject('Brazil/Chicago Crew',-2,-2,'#ff0000');
		if($('#quest_tray_inner .task_buttons span:contains("Ask Now")').length>0) {
			freegifts['Mission Crew Help'] = new giftObject('Mission Crew Help',-1,-1,'#ff0000');
		}
		if($('#quest_7000_details .action-buttons span > span:contains("Ask"):first').length>0) {
			freegifts['Mission Crew Help'] = new giftObject('Mission Crew Help',-1,-1,'#ff0000');
		}
		freegifts['Energy Pack'] = new giftObject('Energy Pack',-3,-3,'#ff0000');
		freegifts['Power Pack'] = new giftObject('Power Pack',503,1,'#ff0000');
		freegifts['Bonus Payment'] = new giftObject('Bonus Payment',-4,-4,'#ff0000');

		

	if (navigator.appName == 'Microsoft Internet Explorer') {
		alert('You are using Internet Explorer, this bookmarklet will not work.\nUse Firefox or Chrome instead.');
		return;
	}
	if (/m.mafiawars.com/.test(document.location)) {
		window.location.href = document.location+'?iframe=1';
	}
	else if (/apps.facebook.com.inthemafia/.test(document.location)) {
		//Credits to Christopher(?) for this new fix
		for (var i = 0; i < document.forms.length; i++) {
			if (/canvas_iframe_post/.test(document.forms[i].id) && document.forms[i].target == "mafiawars") {
				document.forms[i].target = '';
				document.forms[i].submit();
				return;
			}
		}
	}
	else if (document.getElementById('some_mwiframe')) {
		// new mafiawars.com iframe
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
	}
	//end unframe code

	//hack to kill the resizer calls
	iframeResizePipe = function() {};

	
	var http = 'http://';
	if (/https/.test(document.location)) {
		http = 'https://';
	}
	var preurl = http+'facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?';
	var ids = [];
	var allFriends=[];
	var logs=[];
	var run=false;
	var total_ids=0;

	//setup the initial html
	var style = '<style type="text/css">'+
		'.messages {border: 1px solid #888888; margin-bottom: 5px; -moz-border-radius: 5px; border-radius: 5px; -webkit-border-radius: 5px;}'+
		'.messages img{margin:0 3px;vertical-align:middle}'+
		'.messages input {border: 1px solid #888888; -moz-border-radius: 3px; border-radius: 3px; -webkit-border-radius: 2px;padding 0;background: #000; color: #FFF; width: 32px;}'+
	'</style>';

	var logo = '<a href="http://www.spockholm.com/mafia/testing.php" target="_blank"><img src="http://www.mafia-tools.com/uploads/banner-spockholm-mafia-tools.png" alt="Spockholm Mafia Tools" title="Spockholm Mafia Tools" width="425" height="60" style="margin-bottom: 5px;" /></a>';

	var spocklet_html =
	'<div id="'+spocklet+'_main">'+
		style+
		'<table class="messages">'+
		'<tr><td colspan="3" align="center" style="text-align:center;">'+logo+'<br />'+
			'<a href="http://www.spockholm.com/mafia/donate.php" id="'+spocklet+'_donate" class="sexy_button_new short white" target="_blank" title="Like what we do? Donate to Team Spockholm" alt="Like what we do? Donate to Team Spockholm"><span><span>Donate</span></span></a>'+
			'&nbsp;<a href="http://spockon.me/forum/topic/how-to-write-a-proper-bug-report" id="'+spocklet+'_help" class="sexy_button_new short" target="_blank" title="Get help" alt="Get help"><span><span>Help</span></span></a>'+
			'&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="good">'+version+'</span>'+
			'&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<a href="#" id="'+spocklet+'_stop" class="sexy_button_new short orange" title="Stop" alt="Stop"><span><span>Stop</span></span></a>'+
			'&nbsp;<a href="#" id="'+spocklet+'_close" class="sexy_button_new short red" title="Close" alt="Close"><span><span>Close</span></span></a>'+
		'</td></tr>'+
		'<tr><td colspan="3"><hr /></td></tr>'+
		'<tr><td colspan="3">'+
		'選擇禮物: <input style="display:'+(debug?'':'none')+';" id="'+spocklet+'_giftid" type="text" value="400" /><span id="'+spocklet+'_option">載入禮物中...</span><br />'+
		'填入收禮者 UID 或點下面按鈕  [<span id="'+spocklet+'_numids">0</span>]:<br /><textarea cols=90 rows=8 id="'+spocklet+'_list"></textarea><br />'+
		'<a style="display:'+(debug?'':'none')+';" href="#" id="'+spocklet+'_create" class="sexy_button_new short green" title="Send" alt="Send"><span><span>Create Links</span></span></a> '+
		'Load: <a href="#" id="'+spocklet+'_family" class="sexy_button_new short yellow" title="List from gift page" alt="Send"><span><span>Family (g)</span></span></a> '+
		'<a href="#" id="'+spocklet+'_mafia" class="sexy_button_new short yellow" title="List from gift page" alt="Send"><span><span>Mafia (g)</span></span></a> '+
		'<a href="#" id="'+spocklet+'_FBFriends" class="sexy_button_new short yellow" title="List from gift page" alt="Send"><span><span>FB Friends (g)</span></span></a> '+
		'<a href="#" id="'+spocklet+'_FB_all" class="sexy_button_new short yellow" title="Complete list" alt="Send"><span><span>FB Friends (a)</span></span></a> '+
		'<a href="#" id="'+spocklet+'_fam_all" class="sexy_button_new short yellow" title="Complete list" alt="Send"><span><span>Family (a)</span></span></a> '+
		'<a href="#" id="'+spocklet+'_loadlist" class="sexy_button_new short yellow" title="Own saved list" alt="Send"><span><span>Own list</span></span></a> '+
		'<a href="#" id="'+spocklet+'_savelist" class="sexy_button_new short red" title="Save own list" alt="Send"><span><span>Save list</span></span></a> '+
		'<br /><br /><a href="#" id="'+spocklet+'_start" class="sexy_button_new short green" title="Send" alt="Send"><span><span>Start sending</span></span></a> '+
		
		'</td></tr>'+
		'<tr style="display:'+(debug?'':'none')+';"><td colspan="3">'+
		'Gift Params:<br /><textarea cols=90 rows=8 id="'+spocklet+'_params"></textarea><br />'+
		'<a href="#" id="'+spocklet+'_getparams" class="sexy_button_new short green" title="Send" alt="Send"><span><span>Get Gift Params</span></span></a> '+
		'</td></tr>'+
		'<tr style="display:'+(debug?'':'none')+';"><td colspan="3">'+
		'Gift Send link:<br /><textarea cols=90 rows=8 id="'+spocklet+'_gslink"></textarea><br />'+
		'</td></tr>'+
		'<tr style="display:'+(debug?'':'none')+';"><td colspan="3">'+
		'Gift link:<br /><textarea cols=90 rows=8 id="'+spocklet+'_giftlink"></textarea><br />'+
		'</td></tr>'+
		'<tr><td colspan="3">進度: <br /><div id="'+spocklet+'_progressbar"></div></td></tr>'+
		'<tr><td colspan="3"><span id="'+spocklet+'_log"></span></td></tr>'+
		'</table>'+
	'</div>';

	function create_div() {
		//setup the spockdiv
		if ($('#'+spocklet+'_main').length == 0) {
			$('#inner_page').before(spocklet_html);
		}
		else {
			$('#'+spocklet+'_main').remove();
			$('#inner_page').before(spocklet_html);
		}
	}
	create_div();
	load_free_gifts();
	load_free_gifts_friends_lists();

	/************** HANDLER **************/
	$('#'+spocklet+'_create').click(function() {
		ids=$('#'+spocklet+'_list').val().split(',');
		create_links();
		return false;
	});
	$('#'+spocklet+'_start').click(function() {
		start_sending();
		run=true;
		return false;
	});

	$('#'+spocklet+'_stop').click(function() {
		run=false;
		return false;
	});
	
	$('#'+spocklet+'_close').click(function() {
		run=false;
		$('#'+spocklet+'_main').remove();
		return false;
	});
	
	$('#'+spocklet+'_getparams').click(function() {
		log('Creating Params');
		getParams(function(){});
		return false;
	});		

	$('#'+spocklet+'_mafia').click(function() {
		$('#'+spocklet+'_list').val(allFriends[2]);
		$('#'+spocklet+'_numids').text(allFriends[2].length);
		return false;
	});

	$('#'+spocklet+'_family').click(function() {
		$('#'+spocklet+'_list').val(allFriends[12]);
		$('#'+spocklet+'_numids').text(allFriends[12].length);
		return false;
	});	
	
	$('#'+spocklet+'_FBFriends').click(function() {
		$('#'+spocklet+'_list').val(allFriends[3]);
		$('#'+spocklet+'_numids').text(allFriends[3].length);
		return false;
	});	
	$('#'+spocklet+'_FB_all').click(function() {
		load_mafia_ids();
		return false;
	});	
	$('#'+spocklet+'_fam_all').click(function() {
		load_family_ids();
		return false;
	});		
	$('#'+spocklet+'_loadlist').click(function() {
		try {
			$('#'+spocklet+'_list').val(window.localStorage.getItem(spocklet+'_userlist'));
			$('#'+spocklet+'_numids').text(window.localStorage.getItem(spocklet+'_userlist').split(/,/).length);
			log('User list loaded');
		} catch(egal) {} 
		return false;
	});
	$('#'+spocklet+'_savelist').click(function() {
		try {
			window.localStorage.setItem(spocklet+'_userlist',$('#'+spocklet+'_list').val());
			log('User list saved');
		} catch(egal) {}
		return false;
	});	
	
	/********************** BUSINESS FUNCTIONS ******************/
	
	//load_free_gifts_friends_lists
	function load_free_gifts_friends_lists() {
		request('xw_controller=requests&xw_action=friend_selector&xw_city=1&tmp=&cb=&req_controller=freegifts&free_gift_id=1500&free_gift_cat=1&xw_client_id=8&ajax=1&liteload=1&fbml_iframe=1',function(msg){
			var n;
			
			if (n=/MW.Request.setTabFriendLists\((.*?)\);/.exec(msg)) {
				allFriends=JSON.parse(n[1]);
				window.eike=allFriends;
				log('User Data Loaded');
			}
	
		});
	}

// get MW ids and put them into the list
	function load_mafia_ids(){
		ids=[];		
		FB.getLoginStatus(function(response) {
			var access_token;
			if (Util.isset(response.authResponse)) {
				access_token = response.authResponse.access_token;
				FB.api('/me/friends?access_token=' +access_token,function(response){
					for (x in response.data) {
						ids.push(response.data[x].id);
					}
					$('#'+spocklet+'_list').val(ids.join(','));
					$('#'+spocklet+'_numids').text(ids.length);
					log('Mafia Loaded');
				});
			} 
			else if (Util.isset(response.session)) {
				access_token = response.session.access_token;
				FB.api('/me/friends?access_token=' +access_token,function(response){
					for (x in response.data) {
						ids.push(response.data[x].id);
					}
					$('#'+spocklet+'_list').val(ids.join(','));
					$('#'+spocklet+'_numids').text(ids.length);
					log('Mafia Loaded');
				});
			} 
			else {
				if (Util.isset(response.error)) {
					alert(response.error.type+': '+response.error.message);
				}
				else {
					alert('Facebook call failed, Please reload Mafia Wars and try again');
				}
			}
		});
	}

	// Get family ids and put them into the list
	function load_family_ids() {
		ids=[];
		request('xw_controller=clan&xw_action=view&xw_city=1&xw_person='+User.id.substr(2)+'&mwcom=1&xw_client_id=8',function(page) {
			var jpage=$('<div>'+page+'</div>');
			jpage.find('#member_list').find('.member_info').each(function(){
				try {
					var fbid = 0, m;
					if (m = /\d+_(\d+)_\d+/.exec($(this).find('.clan_member_pic').attr('src'))) {
						fbid = m[1];
					}
					if(fbid) {
						ids.push(fbid);
					}
				}
				catch (uglybypass) {}
			});
			$('#'+spocklet+'_list').val(ids.join(','));
			$('#'+spocklet+'_numids').text(ids.length);
			log('Family Loaded');
		});
	}	
	
	function start_sending(){
		ids=$('#'+spocklet+'_list').val().split(',');
		total_ids=ids.length;
		log('<span class="bad">Starting sending process. Warning, this can be slow. Be patient.</span>');
		if(expert) {
			for(var i=0;i<explist.length;i++){
				explist[i].num=parseInt(total_ids*parseFloat(explist[i].perc)/100);
			}
		} else {
			explist=[{item:$('#'+spocklet+'_sel option:selected').text(),num:total_ids}];
		}
		run=true;
		process_all();
	}
		
		
	
	// repeating function to send all gifts
	function process_all(){
		if(ids.length>0 && run && (explist.length>0)){
			//console.log(JSON.parse(JSON.stringify(explist)));
			var giftname=explist[0].item;
			$('#'+spocklet+'_giftid').val(giftname);
			
			var num=explist[0].num;
			if(num>50) { num=50; }
			explist[0].num-=num;
			if(explist[0].num==0) { explist.shift(); }
			//console.log(JSON.parse(JSON.stringify(explist)));
			
			var tmpids = ids.slice(0,num);
			var idlist= tmpids.join(',');
			ids=ids.slice(num);
			$('#'+spocklet+'_list').val(ids.join(','));
			$('#'+spocklet+'_numids').text(ids.length);
			
			log('Sending '+tmpids.length+' '+giftname+', '+(total_ids-ids.length)+' of '+total_ids+' done');
			$('#'+spocklet+'_progressbar').progressbar({	value: (total_ids-ids.length)/total_ids*100 });
			getParams(function(){
				var link='xw_controller=requests&xw_action=postSend&xw_city=&tmp&cb=&xw_person='+User.id.substr(2)+'&rid='+(parseInt(Math.random()*1000000000))+'&data='+($('#'+spocklet+'_params').val().trim())+'&to='+idlist;
				request(link,function(msg){
					try {
						var $msg=$((JSON.parse(msg)).data.reqsentmsg);
						log($msg.find('div:first').text());
					} catch(e) {}
					process_all();
				});
			});
		} else {
			if(run){
				run=false;
				log('Done, all sent.');
			} else {
				log('Stopped');
			}
		}
		
		
	}
	
	// Load free gifts and add them to the select field
	function load_free_gifts() {
		request('xw_controller=freegifts&xw_action=view&xw_city=1&tmp=&cb=&xw_person='+User.id.substr(2)+'&mwcom=1&popup=1&showFriends=&friendSnid=undefined&ref=hud_icon&xw_client_id=8&ajax=1&liteload=1&fbml_iframe=1',function(msg){
			var m,gifts={},html='<select id="'+spocklet+'_sel">';
			if(m=/allCats \= (\{[^\}]*\})/.exec(msg)) {
				allCats=JSON.parse(m[1]);
			}


			$(msg).find('div[id*=freegift_box_inner_]').each(function(){ 
				var name=camelize($(this).find('.freegift_box_itemname').text());
				var id=this.id.substr(19);
				var catid=allCats[id];
				freegifts[name] = new giftObject(name,id,catid);
			
			});
			option='';	
			for(var i in freegifts){
				option+='<option style="background-color:'+freegifts[i].color+';">'+i+'</option>';
			}
			html+=option+'</select> &nbsp; <a href="#" id="'+spocklet+'_expert" >expert mode</a>';
			
			$('#'+spocklet+'_option').html(html);
			$('#'+spocklet+'_sel').change(function(){
				$('#'+spocklet+'_giftid').val($(this).val());
				if($(this).val()=='Mission Crew Help') {
					alert('You only need a few of these. So please be gentle and don\'t spam your mafia too much with Mission Crew requests.');
				}
			}).trigger('change');
			
			$('#'+spocklet+'_expert').click(function() {
				expert=true;
				load_expert_mode();
				return false;
			});	
			
		});
	}
	
	function load_expert_mode(){
		var html='';
		html='<select id="'+spocklet+'_sel">'+option+'</select> <a href="#" id="'+spocklet+'_addexpert" ><img src="https://zyngapv.hs.llnwd.net/e6/mwfb/graphics/requests/plus.png" /></a><br>';
		html+='<div id="'+spocklet+'_expert_list"></div>';
		$('#'+spocklet+'_option').html(html);
		show_expert();

		$('#'+spocklet+'_addexpert').click(function(){
			explist.push({item:$('#'+spocklet+'_sel').val(),perc:0});
			show_expert();
			return false;

		});
		function show_expert(){
			var html='';
			for(var i=0;i<explist.length;i++){
				html+='<span data-id="'+i+'">'+explist[i].item+' x <input type=number step=0.1 min=0 max=100 value='+explist[i].perc.toFixed(1)+' style="width:100px;" />%</span><br />';
			}
			$('#'+spocklet+'_expert_list').html(html);
			$('#'+spocklet+'_expert_list > span > input').change(function(){
				id=parseInt($(this).parent().attr('data-id'));
				explist[id].perc=parseFloat($(this).val().replace(',','.'));
				//console.log(explist);
			}).click(function(){$(this).trigger('change')});
		}
		
	}
	
	
	// load mission crew if there is one
	function getParams_Missioncrew(callback){
		var url,catnum,idnum,questnum,tasknum,m,found=false;

		$('.task_buttons,.action-buttons').each(function(){
			if (m=/showQuestRequestFriendSelector\((\d+),(\d+),(\d+),(\d+)\)/.exec(this.innerHTML)) {
				idnum=parseInt(m[1]);
				catnum=parseInt(m[2]);
				questnum=parseInt(m[3]);
				tasknum=parseInt(m[4]);
				if (questnum) {
					found=true;
					url=getQuestReqUrl(idnum,catnum,questnum,tasknum).substr(23);
					request(url,function(msg){
						if(m=/MW.Request.setData\(\'([^\']*)\'/.exec(msg)){
							$('#'+spocklet+'_params').val(m[1]);
							callback();
						}
					});
				}
			}
		});
	}
	
	function getParams_CityCrew(callback){
		request('xw_controller=requests&xw_action=pop_mfs&xw_city=8&tmp=&cb=&xw_person='+User.id.substr(2)+'&mwcom=1&request_id=city_crew_brazil&xw_client_id=8',function(msg){
			if(m=/MW.Request.setData\(\'([^\']*)\'/.exec(msg)){
				$('#'+spocklet+'_params').val(m[1]);
				callback();
			}
		});
//		MW.Request.setData('{"from_user":"p|95497006","cckey":"1b485f1f798d035cd967737ef7ae117d","time_id":"1323333909","city_id":"8","type":1,"time":1323333909,"hash":"a383463df7609012db9f23514c659c5d"}');
	}	
	
	function getParams_payment(callback){
		request('xw_controller=requests&xw_action=friend_selector&xw_city=8&tmp=&cb=&xw_person='+User.id.substr(2)+'&mwcom=1&req_controller=socialmission&mystery=1&xw_client_id=8',function(msg){
			if(m=/MW.Request.setData\(\'([^\']*)\'/.exec(msg)){
				$('#'+spocklet+'_params').val(m[1]);
				callback();
			}
		})
		//xw_controller=requests&xw_action=friend_selector&xw_city=7&tmp=617e8c2bee1688ddc116446725a02e32&cb=664732502ece11e1b11a6befa2604d61&xw_person=95497006&mwcom=1&req_controller=socialmission&mystery=1&xw_client_id=8&ajax=1&liteload=1&fbml_iframe=1
	}
		
	function getParams_otherID(id,callback){
		request('xw_controller=requests&xw_action=pop_mfs&xw_city=8&tmp=&cb=&xw_person='+User.id.substr(2)+'&mwcom=1&request_id='+id+'&xw_client_id=8',function(msg){
			if(m=/MW.Request.setData\(\'([^\']*)\'/.exec(msg)){
				$('#'+spocklet+'_params').val(m[1]);
				callback();
			}
		});
		
//		MW.Request.setData('{"from_user":"p|95497006","cckey":"1b485f1f798d035cd967737ef7ae117d","time_id":"1323333909","city_id":"8","type":1,"time":1323333909,"hash":"a383463df7609012db9f23514c659c5d"}');
	}
	
	// Create activate gift link, just used for testing
	function create_links(){
		var idlist=ids.slice(0,40).join(',');
		var link=preurl+'xw_controller=requests&xw_action=postSend&xw_city=&tmp&cb=&xw_person='+User.id.substr(2)+'&rid='+(parseInt(Math.random()*1000000000))+'&data='+($('#'+spocklet+'_params').val().trim())+'&to='+idlist;
		$('#'+spocklet+'_gslink').val(link);
		create_giftlink();
	}
	
	// Create gift link, just used for testing
	function create_giftlink(){
		var data=JSON.parse($('#'+spocklet+'_params').val());
		var link=preurl+'xw_controller=freegifts&xw_action=accept_gift&xw_city=1&tmp=&cb=&xw_person=&mwcom=1&from_user=p%7C'+User.id.substr(2)+'&from_user_ppid=p%7C'+User.id.substr(2)+'&time_id='+data.time+'&loop=&gkey='+data.gkey+'&item_cat='+data.item_cat+'&item_id='+data.item_id+'&giftback_key='+data.giftback_key+'&mult=1&zmc=&event_hash='+data.hash+'&et=3012&src=2&quest=&task=&creative=3&stash_slot_id=&stash_time=&stash_hash=&prop_id=&prop_tid=&prop_key=&request2=1&fbrid=';

		$('#'+spocklet+'_giftlink').val(link);

		
		
	}
	
	// Read the params needed for sending the gift
	function getParams(callback){
		var m;
		var giftname=$('#'+spocklet+'_giftid').val();
		var id=freegifts[giftname].id,cat=freegifts[giftname].cat;
		if ((id==-1) && (cat==-1)) {
			// mission crew link
			getParams_Missioncrew(callback);
		} else if ((id==-2) && (cat==-2)) {
			// city crew link
			getParams_CityCrew(callback);
		} else if ((id==-3) && (cat==-3)) {
			// energy pack
			getParams_otherID('energy',callback);
		} else if ((id==-4) && (cat==-4)) {
			// bonus payment
			getParams_payment(callback);
		} else {
			request('xw_controller=requests&xw_action=friend_selector&xw_city=7&tmp=&cb=&xw_person='+User.id.substr(2)+'&mwcom=1&req_controller=freegifts&friendSnid=undefined&free_gift_id='+id+'&free_gift_cat='+cat+'&xw_client_id=8&ajax=1&liteload=1&fbml_iframe=1',function(msg){
				if(m=/MW.Request.setData\(\'([^\']*)\'/.exec(msg)){
					$('#'+spocklet+'_params').val(m[1]);
					callback();
				}
			});
		}
	}

	
//			MW.Request.setData('{"from_user":"p|95497006","from_user_ppid":"p|95497006","time_id":"1322638872","loop":"c83555e443934fe312565ee53ae7c9da","item_cat":"1","item_id":"527","gkey":"e751c0bc1709b9d948c307e16a46e99e","giftback_key":"4130cfb5edeee8ddee28b4f8bc1f164d","mult":"1","activehustle":"send_gifts","over_9000":"true","exclude_type":"%EXCLUDE_TYPE%","simple_key":"11308216451322638872","type":4,"time":1322638872,"hash":"c12652ddf63dfc927140b885aa99a7d4"}');

	/************** HELPER **************/
	function log(message){
		message='<span class="more_in">'+timestamp()+'</span> '+message;
		var limit = 20;
		logs.unshift(message);
		if (limit > 0) {
			if (logs.length>limit) {
				message=logs.pop();
			}
		}
		$('#'+spocklet+'_log').html(logs.join('<br />'));
	}	
	
	function unix_timestamp() {
		return parseInt(new Date().getTime().toString().substring(0, 10));
	}
	
	function timestamp() {
		now = new Date();
		var CurH = now.getHours();
		CurH = (CurH<10?'0'+CurH:CurH);
		var CurM = now.getMinutes();
		CurM = (CurM<10?'0'+CurM:CurM);
		var CurS = now.getSeconds();
		CurS = (CurS<10?'0'+CurS:CurS);
		return '<span class="more_in">['+CurH+':'+CurM+']</span> ';
	}	

	
	function request(url, handler, errorhandler) {
		var timestamp = parseInt(new Date().getTime().toString().substring(0, 10));
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
	
	function camelize(str) {
		return str.toLowerCase().replace(/\b[a-z]/g, cnvrt);
		function cnvrt() {
			return arguments[0].toUpperCase();
		}
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
		pageTracker._trackPageview("/script/Giftblaster");
	}
	catch(err) {}
	//end analytics
})()