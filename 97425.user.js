// ==UserScript==
// @name           Mr. Wizard's Link-a-Nator modified
// @description    Facebook MafiaWars Tools
// ==/UserScript==

/*
	Credits :
	Pete Lundrigan (Pistol Pete) Author
	Martin Hedman - Bunches of Guidance and Encouragement, http://www.spockholm.com/mafia/
	Mohamed Hafiz for contributing code, http://www.facebook.com/profile.php?id=543666686
	All fans who contribute with item id's for new free gifts.
	Mr. Wizard added his Magic but still all credits go to Pete for the wonderful job he did creating Link-a-Nator.
*/

javascript: (function() {
    //try { //begin big try
		if (navigator.appName == 'Microsoft Internet Explorer') {
            alert('You are using Internet Explorer, this bookmarklet will not work.\nUse Firefox or Chrome instead.');
            return;
        }

        if (document.getElementById('app10979261223_iframe_canvas')) {
            window.location.href = document.getElementById('app10979261223_iframe_canvas').src;
            return;
        }
        else if (document.getElementsByClassName('canvas_iframe_util')[0]) {
            window.location.href = document.getElementsByClassName('canvas_iframe_util')[0].src;
            return;
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
                document.getElementById('mw_zbar').parentNode.removeChild(document.getElementById('mw_zbar'));
            }
            catch (fberr) { }
        }

        // from Yevgen Silant'yev, http://joyka.pp.ua/
        function getMWURL() {
            str = document.location;
            str = str.toString();
            beg = str.substring(0, str.indexOf('?') + 1);
            str = str.substring(str.indexOf('?') + 1);
            str = str.split('&');
            mid = '';
            for (var i = 0; i < str.length; i++) {
                if (str[i].indexOf('sf_xw_') == 0) { mid = mid + str[i] + '&'; }
            }
            return beg + mid;
        }
	    var version = 'Link-a-Nator v2.02 beta',
	    banner1_path = 'http://informantpodcast.com/wp-content/uploads/2010/10/InformantPodcast_banner.png',
	    banner2_path = 'http://i572.photobucket.com/albums/ss161/kissrocks98/banner-1.jpg',
        MWURL = getMWURL(),
        sf_xw_sig = /sf_xw_sig=([a-fA-F0-9]+)/.exec(MWURL),
        content = document.getElementById('popup_fodder'),
		mw_url = 'http://apps.facebook.com/inthemafia/profile.php?id=%7B%22user%22%3A%22ID%22%7D',
		fb_url = 'http://www.facebook.com/profile.php?id=',
        userid = /'sf_xw_user_id': '(.+)'/.exec(document.body.innerHTML)[1],
        freegiftname = [],
		freegiftid = [],
		tinylinksforpublish='Free-Gift Links:  ';

		try { var fbuserid = /'uid': ([0-9]*)/.exec(document.body.innerHTML)[1]; }
        catch (ignoree) {
            var fbuserid = FB.Facebook.apiClient.get_session().uid + '';
        }

		// createCookie from Vern's Toolkit http://vern.com/mwtools/
		function createCookie(name,value) {
			// expire 7 days from now
			var expires = new Date();
			expires.setDate(expires.getDate()+7);
			document.cookie = name+"="+value+";expires="+expires.toGMTString()+"; path=/";
		}

		// readCookie from Vern's Toolkit http://vern.com/mwtools/
		function readCookie(name) {
			var i,
				cookie,
				nameEQ = name+"=",
				cookieArray = document.cookie.split(";");
			for (i=0; i< cookieArray.length; i++) {
				cookie = cookieArray[i];
				while (cookie.charAt(0)==' ')
					cookie = cookie.substring(1,cookie.length);
				if (cookie.indexOf(nameEQ) == 0)
					return cookie.substring(nameEQ.length,cookie.length);
			}
			return null;
		}
		
		var bitly_username = 'bitly_username';
		var bitly_apikey = 'bitly_apikey';
		var mwprofilelink = '';
		var promotelink = '';
		var crimespreelink = '';
		var giftkeycookie = '';
		function read_settings() {
			var settings = readCookie('linkanator_settings');
			if (settings == null || settings == 'undefined') {
				settings = bitly_username+'|'+bitly_apikey+'|'+mwprofilelink+'|'+promotelink+'|'+crimespreelink+'|'+giftkeycookie;
				createCookie('linkanator_settings',settings);
			}
			var parameters = settings.split('|');
			if (parameters.length < 6) {
				settings = bitly_username+'|'+bitly_apikey+'|'+mwprofilelink+'|'+promotelink+'|'+crimespreelink+'|'+giftkeycookie;
				createCookie('linkanator_settings',settings);
				parameters = settings.split('|');
			}
			bitly_username = parameters[0];
			bitly_apikey = parameters[1];
			mwprofilelink = parameters[2];
			promotelink = parameters[3];
			crimespreelink = parameters[4];
			giftkeycookie =  parameters[5];
		}
		function write_settings() {
			var settings = bitly_username+'|'+bitly_apikey+'|'+mwprofilelink+'|'+promotelink+'|'+crimespreelink+'|'+giftkeycookie;
			createCookie('linkanator_settings',settings);
		}
		read_settings();
		
		//Load free gift page before starting
		var freegifts = [];
		function giftObject(name,id) {
			this.name = name;
			this.id = parseInt(id);
		}		

		//Add special links here
		freegifts['Shotgun Blast'] = new giftObject('Shotgun Blast',473);		
		freegifts['Secret Stash'] = new giftObject('Secret Stash',474);
		freegifts['Button Camera'] = new giftObject('Button Camera',458);
		freegifts['Gas Can'] = new giftObject('Gas Can',457);
		freegifts['Local Informant'] = new giftObject('Local Informant',456);					
		freegifts['Cooked Books'] = new giftObject('Cooked Books',445);
		freegifts['Hidden Charges'] = new giftObject('Hidden Charges',444);		
		//Italy Build
		freegifts['Italian Hardwood'] = new giftObject('Italian Hardwood',401);
		freegifts['Marble Slab'] = new giftObject('Marble Slab',402);		
		//Vegas Build
		freegifts['Cinder Block'] = new giftObject('Cinder Block',161);
		freegifts['Concrete'] = new giftObject('Concrete',163);
		freegifts['Construction Tool'] = new giftObject('Construction Tool',164);
		freegifts['Steel Girder'] = new giftObject('Steel Girder',162);
		freegifts['Slot Machine'] = new giftObject('Slot Machine',160);
		freegifts['Casino Dealer'] = new giftObject('Casino Dealer',165);
		freegifts['Chef'] = new giftObject('Chef',166);
		freegifts['Poker Table'] = new giftObject('Poker Table',167);
		freegifts['Bellhop'] = new giftObject('Bellhop',168);
		//Vegas Vault
		freegifts['Security Camera'] = new giftObject('Security Camera',169);
		freegifts['Reinforced Steel'] = new giftObject('Reinforced Steel',170);
		freegifts['Deposit Box'] = new giftObject('Deposit Box',171);
		freegifts['Motion Sensor'] = new giftObject('Motion Sensor',172);
		freegifts['Magnetic Lock'] = new giftObject('Magnetic Lock',173);
		//Zoo Build
		freegifts['Aquarium'] = new giftObject('Aquarium',417);
		freegifts['Big Cage'] = new giftObject('Big Cage',418);
		freegifts['Bird Cage'] = new giftObject('Bird Cage',419);
		freegifts['Feeding Trough'] = new giftObject('Feeding Trough',420);
		freegifts['Terrarium'] = new giftObject('Terrarium',421); 
		//Others
		freegifts['Blue Mystery Bag'] = new giftObject('Blue Mystery Bag',100);
		freegifts['Red Mystery Bag'] = new giftObject('Red Mystery Bag',86);
		freegifts['Mystery Shipment'] = new giftObject('Mystery Shipment',405);
		freegifts['Fearsome Animal'] = new giftObject('Fearsome Animal',151);		
		freegifts['Special Part'] = new giftObject('Special Part',189);		
		freegifts['Raw Meat'] = new giftObject('Raw Meat',440);
		freegifts['Exotic Animal Feed'] = new giftObject('Exotic Animal Feed',422);
		freegifts['+2 Mafia Members'] = new giftObject('+2 Mafia Members',438); 
		freegifts['Crew Mission'] = new giftObject('Crew Mission',441);
		//Chop Shop
		freegifts['Cement Blocks'] = new giftObject('Cement Blocks',70);
		freegifts['Power Tools'] = new giftObject('Power Tools',71);
		freegifts['Car Lift'] = new giftObject('Car Lift',72);
		freegifts['Acetylene Torches'] = new giftObject('Acetylene Torches',73);
		freegifts['Shipping Container'] = new giftObject('Shipping Container',74);
		//Weapon Depot
		freegifts['Arc Welder'] = new giftObject('Arc Welder',75);
		freegifts['Buzzsaw'] = new giftObject('Buzzsaw',76);
		freegifts['Gunpowder'] = new giftObject('Gunpowder',77);
		freegifts['Gun Drill'] = new giftObject('Gun Drill',78);
		freegifts['Forge'] = new giftObject('Forge',79);
		//Armory
		freegifts['Hammer'] = new giftObject('Hammer',181);
		freegifts['Rivet'] = new giftObject('Rivet',182);
		freegifts['Furnace'] = new giftObject('Furnace',183);
		freegifts['Vice'] = new giftObject('Vice',184);
		freegifts['Anvil'] = new giftObject('Anvil',185);
		//Free Money
		freegifts['Thai Baht'] = new giftObject('Thai Baht',80);
		freegifts['Rack of Chips'] = new giftObject('Rack of Chips',152);
		freegifts['Satchel of Lira'] = new giftObject('Satchel of Lira',210);
		freegifts['Brazil Cash'] = new giftObject('Brazil Cash',462);
		//NY Consumables
		freegifts['Untraceable Cellphone'] = new giftObject('Untraceable Cellphone',116);
		freegifts['Set of Illegal Transaction Records'] = new giftObject('Set of Illegal Transaction Records',118);
		freegifts['Set of Blackmail Photos'] = new giftObject('Set of Blackmail Photos',119);
		freegifts['Computer Set-up'] = new giftObject('Computer Set-up',120);
		freegifts['Wiretap Device'] = new giftObject('Wiretap Device',114);
		

		var inputs = document.getElementsByClassName("freegift_box");
		var manual = false;
		if (inputs.length > 0 && !manual) {
			//document.getElementById('spock_status').innerHTML ='Loading Links....';
			for(i = 0; i < inputs.length; i++) {
				var input = inputs[i];
				if(input.id.indexOf("freegift_box_") == 0) {
					//freegifts[freegifts.length] = new giftObject(input.childNodes[3].childNodes[3].textContent,input.id.substring(13));
					freegifts[input.childNodes[3].childNodes[3].textContent] = new giftObject(input.childNodes[3].childNodes[3].textContent,input.id.substring(13));
				}
			}
		}
		else {
			do_ajax('inner_page','remote/html_server.php?xw_controller=freegifts&xw_action=view',1,1,0,0);
			javascript:window.location = "javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://cheesefactory.us/bmore789/scripts/Link-a-nator.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B"
		}
		
        function myRandom(min, max) {
            return min + Math.floor(Math.round((Math.random() * (max - min))));
        }
        function unix_timestamp() {
            return parseInt(new Date().getTime().toString().substring(0, 10))
        }
        var config_html =
      '<style type="text/css">' +
      '.messages img{margin:0 3px;vertical-align:top};' +
      '#close{display:inline};' +
      '</style>' +
      '<form name="spockform">' +
      '<table class="messages">' +
      '<tr><td colspan="3"><a href="http://informantpodcast.com" target="_blank"><img src="'+banner1_path+'" alt="The Informant Podcast - Where Family is first"></a></td></tr>'+
      '<tr><td colspan="3"><center><a href="http://www.facebook.com/pages/Mistyfied-Mafia-Wars-Pimping/110945468937858" target="_blank"><img src="'+banner2_path+'" alt="Mistyfied Mafia Wars & Pimping - Where smart players go to add friends"></a></center></td></tr>'+
      '<tr><td colspan="3" align="right" style="text-align:right;font-size:0.8em;"><a href="http://www.spockholm.com/mafia/bookmarklets.php" alt="Spockholm Mafia Tools" target="_top">Team Spockholm</a> - ' + version + ' - <a href="http://cheesefactory.us/bmore789/Home.html" alt="Mystified Mafia Tools" target="_top">Mr. Wizard style</a> - <a href="http://www.spockholm.com/mafia/donate.php?MysteryBagger" alt="Buy Spockholm a beer" target="_blank">PintWare</a> (Donate) - <a href="#" id="close"><img src="http://www.spockholm.com/mafia/stop.gif" title="Close" width="16" height="16"></a></td></tr>' +
	  '<tr><td>Status:</td><td colspan="2" id="spock_status">Select what links to create and press buttons below.</td></tr>'+
      '<tr>' +
		'<td valign="top">General Links:</td>' +
		'<td colspan="2">'+
			'<div id="fbProfile"></div>'+
			'<div id="mwProfile">'+(/http/.test(mwprofilelink)?'<span class="good">Mafia Wars Profile: </span>'+mwprofilelink+' <span class="more_in">(from cookie)</span>':'<span class="more_in">Profile, not loaded yet.')+'</div>'+
			'<div id="promote">'+(/http/.test(promotelink)?'<span class="good">Promote: </span>'+promotelink+' <span class="more_in">(from cookie)</span>':'<span class="more_in">Promote link, not loaded yet.')+'</div>'+
			'<div id="crimespree">'+(/http/.test(crimespreelink)?'<span class="good">Crime Spree: </span>'+crimespreelink+' <span class="more_in">(from cookie)</span>':'<span class="more_in">Crime Spree, not loaded yet.')+'</div>'+
			'<div id="giftkey">'+(/[a-fA-F0-9]{32}/.test(giftkeycookie)?'<span class="good">Gift Key for the <a href="http://www.spockholm.com/mafia/index.php?key='+giftkeycookie+'">Mafia Gift Linker</a>: </span>'+giftkeycookie+' <span class="more_in">(from cookie)</span>':'<span class="more_in">GiftKey, not loaded yet.')+'</div></td>'+
			//'<td><a class="sexy_button" id="general">General Links</a></td>'+
	  '</tr>'+
	  '<tr><td colspan="3"><a class="sexy_button" id="general">Generate General Links</a></br></td></tr>'+
	  '<tr id="select_row">'+
		'<td valign="top">Select links:<br /><a href="#" id="all">Select ALL</a><br /><br /><a href="#" id="common">Common</a><br /><a href="#" id="italy">Italy</a><br /><a href="#" id="vegas">Vegas</a><br /><a href="#" id="zoo">Zoo</a><br /><a href="#" id="Others">Specials</a><br /><a href="#" id="Vault">Vault</a><br /><a href="#" id="Chop">Chop</a><br /><a href="#" id="Weapon">Weapon</a><br /><a href="#" id="Armory">Armory</a><br /><a href="#" id="Money">Money</a><br /><a href="#" id="Consumables">Consumables</a></td>'+
		//'<td valign="top">Select links:</td>'+
		'<td colspan="2"><form name="gift_selection" id="gift_selection"><table width="100%"><tr>';
		var count = 1;
		for (x in freegifts) {
			config_html += '<td><input type="checkbox" name="freegift" value="'+freegifts[x].id+'" id="'+freegifts[x].name+'">'+freegifts[x].name+'</td>';
			config_html += (count%4 == 0)?'</tr><tr>':'';
			count++;
		}
		//console.log('count is: '+count);
		if (count%4 != 0) { //do some padding on the last row
			count--;
			while (count%4 != 0) {
				config_html += '<td>&nbsp;</td>';
				count++;
			}
		}
	  config_html += '</tr></table></form></td></tr>'+
	  '<tr><td>Select Service:</td><td colspan="2">'+
	  	'<form id="service_select">'+
		'<label><input type="radio" name="service_selected" value="tinyurl1">Public Tiny</label>'+
		'<label><input type="radio" name="service_selected" value="tinyurl2" checked="checked">Spockholm Tiny</label>'+
		'<label><input type="radio" name="service_selected" value="bitly">bit.ly</label>'+
		'<label><input type="radio" name="service_selected" value="none">None</label>&nbsp;'+
	  '</form>'+
	  '</td></tr>'+
	  '<tr><td></td><td colspan="2">&nbsp;<span id="service_info" class="energy_highlight">Spockholm TinyURL service, can be overloaded.</span></td></tr>'+
	  '<tr id="bitly_row" style="display:none;">'+
		'<td>bit.ly info:</td>'+
		//'<td colspan="2">Username:<input id="bitly_username" type="text" value="'+bitly_username+'"> API key:<input id="bitly_apikey" type="text" value="'+bitly_apikey+'"> (<a href="http://bit.ly/a/your_api_key">Get key here</a>)</td>'+
		'<td colspan="2">Username:<input id="bitly_username" type="text" value="'+bitly_username+'"> API key:<input id="bitly_apikey" type="text" value="'+bitly_apikey+'"> (<a href="http://bit.ly/a/your_api_key">Get key here</a>)</td>'+
	  '</tr>'+
	  '<tr><td><a class="sexy_button" id="generate">Generate Free Gifts</a></td><td colspan="2"><a class="sexy_button" id="publish" style="display:none;">Publish to Wall</a>&nbsp;Look for an open window or tab after choosing Publish to Wall option.</td></tr>'+
	  '<tr><td>Status:</td><td colspan="2" id="wizard_status">Select what links to create and press buttons below.</td></tr>'+
	  '<tr id="free_row" style="display:none;"><td valign="top">Free Gift Links:</td>' +
		'<td colspan="2"><textarea id="gift_list" class="instructions" rows="10" cols="60"></textarea></td>'+
	  '</tr>' +
      '<tr id="tiny_row" style="display:none;">' +
		'<td valign="top">TinyURL Links:</td>' +
		'<td colspan="2"><textarea id="tiny_gift_list" class="instructions" rows="10" cols="60"></textarea></td>'+
	  '</tr>' +
      '<tr id="forum_row" style="display:none;">' +
		'<td valign="top">Forum Links:</td>' +
		'<td colspan="2"><textarea id="forum_gift_list" class="instructions" rows="10" cols="60"></textarea></td>'+
	  '</tr>' +
      '</table>' +
      '</form>';

		create_div();
		//$('#bitly_row').hide();
		
		document.getElementById('fbProfile').innerHTML = '<span class="good">Facebook: </span>'+fb_url+fbuserid;
		document.getElementById('general').onclick = function () {
			//msg('Loading the general links...');
			getGiftKey();
			getTinyMwLink('http://apps.facebook.com/inthemafia/track.php?next_controller=stats&next_action=view&next_params=%7B%22user%22%3A%22$ID%22%7D'.replace('$ID',fbuserid));
			//getTinyPromoteLink('http://apps.facebook.com/inthemafia/track.php?next_controller=group&next_action=view&next_params=%7B%22promote%22%3A%22yes%22%2C%22pid%22%3A%22p%7C$ID%22%7D'.replace('$ID',fbuserid));
			getTinyPromoteLink('http://apps.facebook.com/inthemafia/track.php?next_controller=group&next_action=view&next_params={%22promote%22:%22yes%22,%22pid%22:%22$ID%22}'.replace('$ID',userid));
			getNewCrimeSpreeLink('http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=safehouse&xw_action=safehouse_request&xw_city=1&tmp=&cb=&xw_client_id=8&ajax=1&liteload=1&fbml_iframe=1');
		};
		document.getElementById('common').onclick = function () {
			//alert($('input[value=100]').is(':checked'));
			$('input[value=100]').attr('checked')?$('input[value=100]').attr('checked', false):$('input[value=100]').attr('checked', true);	
			$('input[value=86]').attr('checked')?$('input[value=86]').attr('checked', false):$('input[value=86]').attr('checked', true);		
			return false;
		};		
		document.getElementById('italy').onclick = function () {
			$('input[value=401]').attr('checked')?$('input[value=401]').attr('checked', false):$('input[value=401]').attr('checked', true);
			$('input[value=402]').attr('checked')?$('input[value=402]').attr('checked', false):$('input[value=402]').attr('checked', true);			
			$('input[value=444]').attr('checked')?$('input[value=444]').attr('checked', false):$('input[value=444]').attr('checked', true);
			$('input[value=445]').attr('checked')?$('input[value=445]').attr('checked', false):$('input[value=445]').attr('checked', true);
			$('input[value=210]').attr('checked')?$('input[value=210]').attr('checked', false):$('input[value=210]').attr('checked', true);
			return false;
		};		
		document.getElementById('zoo').onclick = function () {
			$('input[value=417]').attr('checked')?$('input[value=417]').attr('checked', false):$('input[value=417]').attr('checked', true);
			$('input[value=418]').attr('checked')?$('input[value=418]').attr('checked', false):$('input[value=418]').attr('checked', true);
			$('input[value=419]').attr('checked')?$('input[value=419]').attr('checked', false):$('input[value=419]').attr('checked', true);
			$('input[value=420]').attr('checked')?$('input[value=420]').attr('checked', false):$('input[value=420]').attr('checked', true);
			$('input[value=421]').attr('checked')?$('input[value=421]').attr('checked', false):$('input[value=421]').attr('checked', true);
			return false;
		};		
		document.getElementById('vegas').onclick = function () {
			$('input[value=160]').attr('checked')?$('input[value=160]').attr('checked', false):$('input[value=160]').attr('checked', true);
			$('input[value=161]').attr('checked')?$('input[value=161]').attr('checked', false):$('input[value=161]').attr('checked', true);
			$('input[value=162]').attr('checked')?$('input[value=162]').attr('checked', false):$('input[value=162]').attr('checked', true);
			$('input[value=163]').attr('checked')?$('input[value=163]').attr('checked', false):$('input[value=163]').attr('checked', true);
			$('input[value=164]').attr('checked')?$('input[value=164]').attr('checked', false):$('input[value=164]').attr('checked', true);
			$('input[value=165]').attr('checked')?$('input[value=165]').attr('checked', false):$('input[value=165]').attr('checked', true);
			$('input[value=166]').attr('checked')?$('input[value=166]').attr('checked', false):$('input[value=166]').attr('checked', true);
			$('input[value=167]').attr('checked')?$('input[value=167]').attr('checked', false):$('input[value=167]').attr('checked', true);
			$('input[value=168]').attr('checked')?$('input[value=168]').attr('checked', false):$('input[value=168]').attr('checked', true);		
			return false;
		};		
		document.getElementById('Others').onclick = function () {
			$('input[value=405]').attr('checked')?$('input[value=405]').attr('checked', false):$('input[value=405]').attr('checked', true);
			$('input[value=151]').attr('checked')?$('input[value=151]').attr('checked', false):$('input[value=151]').attr('checked', true);
			$('input[value=209]').attr('checked')?$('input[value=209]').attr('checked', false):$('input[value=209]').attr('checked', true);
			$('input[value=189]').attr('checked')?$('input[value=189]').attr('checked', false):$('input[value=189]').attr('checked', true);			
			$('input[value=422]').attr('checked')?$('input[value=422]').attr('checked', false):$('input[value=422]').attr('checked', true);
			$('input[value=440]').attr('checked')?$('input[value=440]').attr('checked', false):$('input[value=440]').attr('checked', true);
			$('input[value=438]').attr('checked')?$('input[value=438]').attr('checked', false):$('input[value=438]').attr('checked', true);							
			$('input[value=456]').attr('checked')?$('input[value=456]').attr('checked', false):$('input[value=456]').attr('checked', true);
			$('input[value=457]').attr('checked')?$('input[value=457]').attr('checked', false):$('input[value=457]').attr('checked', true);	
			$('input[value=458]').attr('checked')?$('input[value=458]').attr('checked', false):$('input[value=458]').attr('checked', true);
			$('input[value=441]').attr('checked')?$('input[value=441]').attr('checked', false):$('input[value=441]').attr('checked', true);			
			$('input[value=474]').attr('checked')?$('input[value=474]').attr('checked', false):$('input[value=474]').attr('checked', true);
			$('input[value=473]').attr('checked')?$('input[value=473]').attr('checked', false):$('input[value=473]').attr('checked', true);			
			return false;
		};		
		document.getElementById('Vault').onclick = function () {
			$('input[value=169]').attr('checked')?$('input[value=169]').attr('checked', false):$('input[value=169]').attr('checked', true);
			$('input[value=170]').attr('checked')?$('input[value=170]').attr('checked', false):$('input[value=170]').attr('checked', true);
			$('input[value=171]').attr('checked')?$('input[value=171]').attr('checked', false):$('input[value=171]').attr('checked', true);
			$('input[value=172]').attr('checked')?$('input[value=172]').attr('checked', false):$('input[value=172]').attr('checked', true);
			$('input[value=173]').attr('checked')?$('input[value=173]').attr('checked', false):$('input[value=173]').attr('checked', true);		
			return false;
		};		
		document.getElementById('Chop').onclick = function () {
			$('input[value=70]').attr('checked')?$('input[value=70]').attr('checked', false):$('input[value=70]').attr('checked', true);
			$('input[value=71]').attr('checked')?$('input[value=71]').attr('checked', false):$('input[value=71]').attr('checked', true);
			$('input[value=72]').attr('checked')?$('input[value=72]').attr('checked', false):$('input[value=72]').attr('checked', true);
			$('input[value=73]').attr('checked')?$('input[value=73]').attr('checked', false):$('input[value=73]').attr('checked', true);
			$('input[value=74]').attr('checked')?$('input[value=74]').attr('checked', false):$('input[value=74]').attr('checked', true);		
			return false;
		};		
		document.getElementById('Weapon').onclick = function () {
			$('input[value=79]').attr('checked')?$('input[value=79]').attr('checked', false):$('input[value=79]').attr('checked', true);
			$('input[value=75]').attr('checked')?$('input[value=75]').attr('checked', false):$('input[value=75]').attr('checked', true);
			$('input[value=76]').attr('checked')?$('input[value=76]').attr('checked', false):$('input[value=76]').attr('checked', true);
			$('input[value=77]').attr('checked')?$('input[value=77]').attr('checked', false):$('input[value=77]').attr('checked', true);
			$('input[value=78]').attr('checked')?$('input[value=78]').attr('checked', false):$('input[value=78]').attr('checked', true);		
			return false;
		};		
		document.getElementById('Armory').onclick = function () {
			$('input[value=181]').attr('checked')?$('input[value=181]').attr('checked', false):$('input[value=181]').attr('checked', true);
			$('input[value=182]').attr('checked')?$('input[value=182]').attr('checked', false):$('input[value=182]').attr('checked', true);
			$('input[value=183]').attr('checked')?$('input[value=183]').attr('checked', false):$('input[value=183]').attr('checked', true);
			$('input[value=184]').attr('checked')?$('input[value=184]').attr('checked', false):$('input[value=184]').attr('checked', true);
			$('input[value=185]').attr('checked')?$('input[value=185]').attr('checked', false):$('input[value=185]').attr('checked', true);		
			return false;
		};		
		document.getElementById('Money').onclick = function () {
			$('input[value=80]').attr('checked')?$('input[value=80]').attr('checked', false):$('input[value=80]').attr('checked', true);
			$('input[value=152]').attr('checked')?$('input[value=152]').attr('checked', false):$('input[value=152]').attr('checked', true);
			$('input[value=210]').attr('checked')?$('input[value=210]').attr('checked', false):$('input[value=210]').attr('checked', true);
			$('input[value=462]').attr('checked')?$('input[value=462]').attr('checked', false):$('input[value=462]').attr('checked', true);		
			return false;
		};		
		document.getElementById('Consumables').onclick = function () {
			$('input[value=116]').attr('checked')?$('input[value=116]').attr('checked', false):$('input[value=116]').attr('checked', true);
			$('input[value=118]').attr('checked')?$('input[value=118]').attr('checked', false):$('input[value=118]').attr('checked', true);
			$('input[value=119]').attr('checked')?$('input[value=119]').attr('checked', false):$('input[value=119]').attr('checked', true);
			$('input[value=120]').attr('checked')?$('input[value=120]').attr('checked', false):$('input[value=120]').attr('checked', true);
			$('input[value=114]').attr('checked')?$('input[value=114]').attr('checked', false):$('input[value=114]').attr('checked', true);		
			return false;
		};
		document.getElementById('all').onclick = function () {
			$('input[value=100]').attr('checked')?$('input[value=100]').attr('checked', false):$('input[value=100]').attr('checked', true);	
			$('input[value=86]').attr('checked')?$('input[value=86]').attr('checked', false):$('input[value=86]').attr('checked', true);		
			$('input[value=401]').attr('checked')?$('input[value=401]').attr('checked', false):$('input[value=401]').attr('checked', true);
			$('input[value=402]').attr('checked')?$('input[value=402]').attr('checked', false):$('input[value=402]').attr('checked', true);			
			$('input[value=417]').attr('checked')?$('input[value=417]').attr('checked', false):$('input[value=417]').attr('checked', true);
			$('input[value=418]').attr('checked')?$('input[value=418]').attr('checked', false):$('input[value=418]').attr('checked', true);
			$('input[value=419]').attr('checked')?$('input[value=419]').attr('checked', false):$('input[value=419]').attr('checked', true);
			$('input[value=420]').attr('checked')?$('input[value=420]').attr('checked', false):$('input[value=420]').attr('checked', true);
			$('input[value=421]').attr('checked')?$('input[value=421]').attr('checked', false):$('input[value=421]').attr('checked', true);
			$('input[value=160]').attr('checked')?$('input[value=160]').attr('checked', false):$('input[value=160]').attr('checked', true);
			$('input[value=161]').attr('checked')?$('input[value=161]').attr('checked', false):$('input[value=161]').attr('checked', true);
			$('input[value=162]').attr('checked')?$('input[value=162]').attr('checked', false):$('input[value=162]').attr('checked', true);
			$('input[value=163]').attr('checked')?$('input[value=163]').attr('checked', false):$('input[value=163]').attr('checked', true);
			$('input[value=164]').attr('checked')?$('input[value=164]').attr('checked', false):$('input[value=164]').attr('checked', true);
			$('input[value=165]').attr('checked')?$('input[value=165]').attr('checked', false):$('input[value=165]').attr('checked', true);
			$('input[value=166]').attr('checked')?$('input[value=166]').attr('checked', false):$('input[value=166]').attr('checked', true);
			$('input[value=167]').attr('checked')?$('input[value=167]').attr('checked', false):$('input[value=167]').attr('checked', true);
			$('input[value=168]').attr('checked')?$('input[value=168]').attr('checked', false):$('input[value=168]').attr('checked', true);
			$('input[value=405]').attr('checked')?$('input[value=405]').attr('checked', false):$('input[value=405]').attr('checked', true);
			$('input[value=151]').attr('checked')?$('input[value=151]').attr('checked', false):$('input[value=151]').attr('checked', true);
			$('input[value=209]').attr('checked')?$('input[value=209]').attr('checked', false):$('input[value=209]').attr('checked', true);
			$('input[value=189]').attr('checked')?$('input[value=189]').attr('checked', false):$('input[value=189]').attr('checked', true);			
			$('input[value=169]').attr('checked')?$('input[value=169]').attr('checked', false):$('input[value=169]').attr('checked', true);
			$('input[value=170]').attr('checked')?$('input[value=170]').attr('checked', false):$('input[value=170]').attr('checked', true);
			$('input[value=171]').attr('checked')?$('input[value=171]').attr('checked', false):$('input[value=171]').attr('checked', true);
			$('input[value=172]').attr('checked')?$('input[value=172]').attr('checked', false):$('input[value=172]').attr('checked', true);
			$('input[value=173]').attr('checked')?$('input[value=173]').attr('checked', false):$('input[value=173]').attr('checked', true);
			$('input[value=70]').attr('checked')?$('input[value=70]').attr('checked', false):$('input[value=70]').attr('checked', true);
			$('input[value=71]').attr('checked')?$('input[value=71]').attr('checked', false):$('input[value=71]').attr('checked', true);
			$('input[value=72]').attr('checked')?$('input[value=72]').attr('checked', false):$('input[value=72]').attr('checked', true);
			$('input[value=73]').attr('checked')?$('input[value=73]').attr('checked', false):$('input[value=73]').attr('checked', true);
			$('input[value=74]').attr('checked')?$('input[value=74]').attr('checked', false):$('input[value=74]').attr('checked', true);
			$('input[value=79]').attr('checked')?$('input[value=79]').attr('checked', false):$('input[value=79]').attr('checked', true);
			$('input[value=75]').attr('checked')?$('input[value=75]').attr('checked', false):$('input[value=75]').attr('checked', true);
			$('input[value=76]').attr('checked')?$('input[value=76]').attr('checked', false):$('input[value=76]').attr('checked', true);
			$('input[value=77]').attr('checked')?$('input[value=77]').attr('checked', false):$('input[value=77]').attr('checked', true);
			$('input[value=78]').attr('checked')?$('input[value=78]').attr('checked', false):$('input[value=78]').attr('checked', true);
			$('input[value=181]').attr('checked')?$('input[value=181]').attr('checked', false):$('input[value=181]').attr('checked', true);
			$('input[value=182]').attr('checked')?$('input[value=182]').attr('checked', false):$('input[value=182]').attr('checked', true);
			$('input[value=183]').attr('checked')?$('input[value=183]').attr('checked', false):$('input[value=183]').attr('checked', true);
			$('input[value=184]').attr('checked')?$('input[value=184]').attr('checked', false):$('input[value=184]').attr('checked', true);
			$('input[value=185]').attr('checked')?$('input[value=185]').attr('checked', false):$('input[value=185]').attr('checked', true);
			$('input[value=80]').attr('checked')?$('input[value=80]').attr('checked', false):$('input[value=80]').attr('checked', true);
			$('input[value=152]').attr('checked')?$('input[value=152]').attr('checked', false):$('input[value=152]').attr('checked', true);
			$('input[value=210]').attr('checked')?$('input[value=210]').attr('checked', false):$('input[value=210]').attr('checked', true);
			$('input[value=116]').attr('checked')?$('input[value=116]').attr('checked', false):$('input[value=116]').attr('checked', true);
			$('input[value=118]').attr('checked')?$('input[value=118]').attr('checked', false):$('input[value=118]').attr('checked', true);
			$('input[value=119]').attr('checked')?$('input[value=119]').attr('checked', false):$('input[value=119]').attr('checked', true);
			$('input[value=120]').attr('checked')?$('input[value=120]').attr('checked', false):$('input[value=120]').attr('checked', true);
			$('input[value=114]').attr('checked')?$('input[value=114]').attr('checked', false):$('input[value=114]').attr('checked', true);
			$('input[value=422]').attr('checked')?$('input[value=422]').attr('checked', false):$('input[value=422]').attr('checked', true);
			$('input[value=440]').attr('checked')?$('input[value=440]').attr('checked', false):$('input[value=440]').attr('checked', true);
			$('input[value=438]').attr('checked')?$('input[value=438]').attr('checked', false):$('input[value=438]').attr('checked', true);						
			$('input[value=444]').attr('checked')?$('input[value=444]').attr('checked', false):$('input[value=444]').attr('checked', true);
			$('input[value=445]').attr('checked')?$('input[value=445]').attr('checked', false):$('input[value=445]').attr('checked', true);					
			$('input[value=456]').attr('checked')?$('input[value=456]').attr('checked', false):$('input[value=456]').attr('checked', true);
			$('input[value=457]').attr('checked')?$('input[value=457]').attr('checked', false):$('input[value=457]').attr('checked', true);	
			$('input[value=458]').attr('checked')?$('input[value=458]').attr('checked', false):$('input[value=458]').attr('checked', true);
			$('input[value=441]').attr('checked')?$('input[value=441]').attr('checked', false):$('input[value=441]').attr('checked', true);	
			$('input[value=462]').attr('checked')?$('input[value=462]').attr('checked', false):$('input[value=462]').attr('checked', true);			
			$('input[value=474]').attr('checked')?$('input[value=474]').attr('checked', false):$('input[value=474]').attr('checked', true);
			$('input[value=473]').attr('checked')?$('input[value=473]').attr('checked', false):$('input[value=473]').attr('checked', true);			
			return false;
		};		
		document.getElementById('service_select').onchange = function () {
			if($("input[name='service_selected']:checked").val() == 'bitly') {
				$('#bitly_row').show();
				$('#service_info').html('Using your own account will lessen public server load. And you can track clicks.');
				bitly_username = document.getElementById('bitly_username').value;
				bitly_apikey = document.getElementById('bitly_apikey').value;
				write_settings();
			}
			if($("input[name='service_selected']:checked").val() == 'tinyurl1') {
				$('#bitly_row').hide();
				$('#service_info').html('Public TinyURL service, can hit quota limits.');
			}
			if($("input[name='service_selected']:checked").val() == 'tinyurl2') {
				$('#bitly_row').hide();
				$('#service_info').html('Spockholm TinyURL service, can be overloaded.');
			}
			if($("input[name='service_selected']:checked").val() == 'none') {
				$('#bitly_row').hide();
				$('#service_info').html('Do not make short urls, only long.');
			}
			//return false;
		};
		
		var freelinks = [];
		document.getElementById('generate').onclick = function () {
			//use jQuery to populate freelinks with the selected items
			$('input:checkbox[name=freegift]:checked').map(function() {
				freelinks.push({id:this.value,name:this.id});
			}).get();
			
			//show textareas
			$('#free_row').show();
			$('#tiny_row').show();
			$('#forum_row').show();
			document.getElementById('tiny_gift_list').value +='=================================\n' + new Date() + '\n=================================\n';
			document.getElementById('forum_gift_list').value +='=================================\n' + new Date() + '\n=================================\n';
			bitly_username = document.getElementById('bitly_username').value;
			bitly_apikey = document.getElementById('bitly_apikey').value;
			write_settings();
			
			document.getElementById('publish').onclick = FBsetStatus;
			//start loading links
			nextLink();
		};
	
		function nextLink() {
			if (freelinks.length > 0) {
				//console.log('Generating link for: '+freelinks[0].name);
				var wait1 = 1;
				var wait2 = 3;
				var wait = myRandom(parseInt(wait1),parseInt(wait2));
				
				function f() {
					getNewGiftLink(freelinks[0].name,freelinks[0].id);
					freelinks = freelinks.slice(1);
				}
				pausing(wait,'Loading next link in...',f);
			}
			else {
				msg('Done with all the links, you can press the button again to create a new set.');
				$('#publish').show();
			}
		}
		
		function create_div() {
			if (document.getElementById('spockdiv')) {
				document.getElementById('spockdiv').innerHTML = config_html;
			}
			else {
				var spock_div = document.createElement("div");
				spock_div.id = 'spockdiv';
				spock_div.innerHTML = config_html;
				content.insertBefore(spock_div, content.firstChild);
			}
		}
			
		// deliberate pause from Vern's toolkit.js, http://vern.com/mwtools/
		// given a number of seconds, an optional message and a resume
		// function, will pause a few seconds and then execute the function
		function pausing(seconds,message,resume_func) {
			// if the message was left out, shuffle things a bit
			if (typeof(message) == 'function') {
				resume_func = message;
				message = null;
			}
			if (message)
				message=message;
			else
			message='Pausing';
			msg(message+' <span id="seconds">'+seconds+' second'+(seconds==1?'':'s')+'</span>...');
			//var me = this;
			var timer = setInterval(function(){//)
				seconds--;
				if (document.getElementById('seconds'))
					document.getElementById('seconds').innerHTML=seconds+' second'+(seconds==1?'':'s');
				else
					clearInterval(timer);
				if (seconds<=0) {
					clearInterval(timer);
					if (typeof(resume_func) == 'function')
						resume_func();
				}
			},1000);
		}
			function FBsetStatus(){
                //status1 = document.getElementById('tiny_gift_list').value;
                var winopts='width=750,height=500,toolbar=0,directories=0,menubar=0,scrollbars=1,resizable=1';
                var fbsharelink='http://www.facebook.com/connect/prompt_feed.php?&message='+ escape(tinylinksforpublish +'     Mistyfied Spocking!!!');
    	 		window.open(fbsharelink,'Temp Window'+count, winopts);
           
            }

		function getNewGiftLink(itemname,id) {
			var baglink = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=requests&xw_action=friend_selector&xw_city=3&tmp=&cb=&req_controller=freegifts&free_gift_id='+id+'&free_gift_cat=1&xw_client_id=8&ajax=1&liteload=1&fbml_iframe=1';
			msg('Loading Gift Link: '+itemname);
			$.ajax({
				type: "POST",
				url: baglink,
				data: {
					'sf_xw_user_id': userid,
					'sf_xw_sig': local_xw_sig
				},
				success: function(response) {
					document.getElementById('gift_list').value += itemname +' ' +new Date().toString()+'\n\n' +/<fb:req-choice url='(.*?)' label/.exec(response)[1] + '\n\n';
					msg('Loading TinyUrl for: '+itemname);
					if ($("input[name='service_selected']:checked").val() == 'none') {
						var longurl = /<fb:req-choice url='(.*?)' label/.exec(response)[1];
						document.getElementById('tiny_gift_list').value += itemname + ': ' + longurl + '\n';
						document.getElementById('forum_gift_list').value += '[url=' + longurl + ']' + itemname + '[/url]\n';
						//tinylinksforpublish += itemname + ': ' + longurl + '    ';
						nextLink();
					}
					else {
						getNewTinyLink(/<fb:req-choice url='(.*?)' label/.exec(response)[1],itemname);
					}
				}
			});
		}
		
		function getNewTinyLink(strurl,itemname) {
			if ($("input[name='service_selected']:checked").val() == 'tinyurl1') {
				$.getJSON("http://json-tinyurl.appspot.com/?&callback=?",
				{url: strurl},
				function (data) {
					document.getElementById('tiny_gift_list').value += itemname + ': ' + data.tinyurl + '\n';
					document.getElementById('forum_gift_list').value += '[url=' + data.tinyurl + ']' + itemname + '[/url]\n';
					tinylinksforpublish += itemname + ': ' + data.tinyurl + '    ';
					nextLink();
				});
			}
			if ($("input[name='service_selected']:checked").val() == 'tinyurl2') {
				$.getJSON("http://www.exellerate.com/mafia/urlshortner/multiple-url-shortener.php/?&callback=?",
				{url: strurl},
				function(data){
					document.getElementById('tiny_gift_list').value += itemname +': '+data.tinyurl + '\n';
					document.getElementById('forum_gift_list').value += '[url='+data.tinyurl +']'+ itemname + '[/url]\n';
					tinylinksforpublish += itemname +': '+data.tinyurl + '    ';
					nextLink();
				});
			}
			if ($("input[name='service_selected']:checked").val() == 'bitly') {
				$.getJSON("http://api.bit.ly/v3/shorten?login="+bitly_username+"&apiKey="+bitly_apikey+"&longUrl=" + escape(strurl) + "&format=json&callback=?",
				function(data){
					document.getElementById('tiny_gift_list').value += itemname+': '+data.data.url+'\n';
					document.getElementById('forum_gift_list').value += '[url='+data.data.url + ']'+itemname+'[/url]\n';
					tinylinksforpublish += itemname+': '+data.data.url+'    ';
					nextLink();
				});
			}
		}
		
		function getTinyMwLink(strurl) {
			var tinyurl='';
			//$.getJSON("http://json-tinyurl.appspot.com/?&callback=?",
			//$.getJSON("http://tinyurl.com/api-create.php?",
			//	{url: strurl},
			//	function(data){
			//		document.getElementById('mwProfile').innerHTML = '<span class="good">Mafia Wars Profile: </span>'+data.tinyurl;
			//	}
			//);
			if ($("input[name='service_selected']:checked").val() == 'tinyurl1') {
				$.getJSON('http://json-tinyurl.appspot.com/?&callback=?', 
				{url: strurl}, 
				function(data){
					document.getElementById('mwProfile').innerHTML = '<span class="good">Mafia Wars Profile: </span>'+ data.tinyurl;
					mwprofilelink = data.tinyurl;
					write_settings();
				});
			}
			if ($("input[name='service_selected']:checked").val() == 'tinyurl2') {
				$.getJSON('http://www.exellerate.com/mafia/urlshortner/multiple-url-shortener.php/?&callback=?', 
				{url: strurl}, 
				function(data){
					document.getElementById('mwProfile').innerHTML = '<span class="good">Mafia Wars Profile: </span>'+ data.tinyurl;
					mwprofilelink = data.tinyurl;
					write_settings();
				});
			}
			if ($("input[name='service_selected']:checked").val() == 'bitly') {
				$.getJSON("http://api.bit.ly/v3/shorten?login="+bitly_username+"&apiKey="+bitly_apikey+"&longUrl=" + escape(strurl) + "&format=json&callback=?",
				function(data){
					document.getElementById('mwProfile').innerHTML = '<span class="good">Mafia Wars Profile: </span>'+ data.data.url;
					mwprofilelink = data.data.url;
					write_settings();
				});
			}
			if ($("input[name='service_selected']:checked").val() == 'none') {
				document.getElementById('mwProfile').innerHTML = '<span class="good">Mafia Wars Profile: </span>'+ strurl;
				mwprofilelink = strurl;
				write_settings();
			}
		}
		
		function getTinyPromoteLink(strurl) {
			var tinyurl='';
			if ($("input[name='service_selected']:checked").val() == 'tinyurl1') {
				$.getJSON("http://json-tinyurl.appspot.com/?&callback=?",
				{url: strurl},
				function(data){
					document.getElementById('promote').innerHTML = '<span class="good">Promote: </span>' + data.tinyurl;
					promotelink = data.tinyurl;
					write_settings();
				});
			}
			if ($("input[name='service_selected']:checked").val() == 'tinyurl2') {
				$.getJSON("http://www.exellerate.com/mafia/urlshortner/multiple-url-shortener.php/?&callback=?",
				{url: strurl},
				function(data){
					document.getElementById('promote').innerHTML = '<span class="good">Promote: </span>' + data.tinyurl;
					promotelink = data.tinyurl;
					write_settings();
				});
			}
			if ($("input[name='service_selected']:checked").val() == 'bitly') {
				$.getJSON("http://api.bit.ly/v3/shorten?login="+bitly_username+"&apiKey="+bitly_apikey+"&longUrl=" + escape(strurl) + "&format=json&callback=?",
				function(data){
					document.getElementById('promote').innerHTML = '<span class="good">Promote: </span>' + data.data.url;
					promotelink = data.data.url;
					write_settings();
				});
			}
			if ($("input[name='service_selected']:checked").val() == 'none') {
				document.getElementById('promote').innerHTML = '<span class="good">Promote: </span>'+ strurl;
				promotelink = strurl;
				write_settings();
			}
		}
		
		function getGiftKey(){
			var giftkeylink = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=gift&xw_action=view&xw_city=1&xw_person='+userid+'&xw_client_id=8';
			$.ajax({
				type: "POST",
				url: giftkeylink,
				data: {
					'ajax':1,
					'liteload':1,
					'sf_xw_user_id': userid,
					'sf_xw_sig': local_xw_sig
				},
				success: function(response) {
					var giftkey = /name="gift_key" value="(.+)"/.exec(response)[1];
					document.getElementById('giftkey').innerHTML = '<span class="good">Gift Key for the <a href="http://www.spockholm.com/mafia/index.php?key='+giftkey+'">Mafia Gift Linker</a>: </span>'+giftkey;
					giftkeycookie = giftkey;
					write_settings();
				}
			});
		}
		
		function getNewCrimeSpreeLink(strurl) {
			//var crimespreeurl = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=safehouse&xw_action=safehouse_request&xw_city=1&tmp=&cb=&xw_client_id=8&ajax=1&liteload=1&fbml_iframe=1';
			$.ajax({
				type: "POST",
				url: strurl,
				data: {
					'sf_xw_user_id': userid,
					'sf_xw_sig': local_xw_sig
				},
				success: function(response) {
					if ($("input[name='service_selected']:checked").val() == 'none') {
						var longurl = /<fb:req-choice url='([^']+)'/.exec(response)[1];
						document.getElementById('crimespree').innerHTML = '<span class="good">Crime Spree:</span> ' + longurl;
						crimespreelink = longurl;
						write_settings();
					}
					else {
						getTinyCrimeLink(/<fb:req-choice url='([^']+)'/.exec(response)[1]);
					}
				}
			});
		}
		
		function getTinyCrimeLink(strurl) {
			if ($("input[name='service_selected']:checked").val() == 'tinyurl1') {
				$.getJSON("http://json-tinyurl.appspot.com/?&callback=?",
				{url: strurl},
				function(data){
					document.getElementById('crimespree').innerHTML = '<span class="good">Crime Spree:</span> ' + data.tinyurl;
					crimespreelink = data.tinyurl;
					write_settings();
				});
			}
			if ($("input[name='service_selected']:checked").val() == 'tinyurl2') {
				$.getJSON("http://www.exellerate.com/mafia/urlshortner/multiple-url-shortener.php/?&callback=?",
				{url: strurl},
				function(data){
					document.getElementById('crimespree').innerHTML = '<span class="good">Crime Spree:</span> ' + data.tinyurl;
					crimespreelink = data.tinyurl;
					write_settings();
				});
			}
			if ($("input[name='service_selected']:checked").val() == 'bitly') {
				$.getJSON("http://api.bit.ly/v3/shorten?login="+bitly_username+"&apiKey="+bitly_apikey+"&longUrl=" + escape(strurl) + "&format=json&callback=?",
				function(data){
					document.getElementById('crimespree').innerHTML = '<span class="good">Crime Spree:</span> ' + data.data.url;
					crimespreelink = data.data.url;
					write_settings();
				});
			}
		}

		document.getElementById('close').onclick = function(e) {
			document.getElementById("popup_fodder").removeChild(document.getElementById("spockdiv"));
			return false;
		};
		function msg(s) {
			document.getElementById('spock_status').innerHTML = s;
			document.getElementById('wizard_status').innerHTML = s;
		}
		function mwlink(s) {
			return '<span class="more_in">[<a href="' + mw_url.replace(/ID/, s) + '">MW</a>]</span>';
		}
		function fblink(s) {
			return '<span class="more_in">[<a href="' + fb_url + s + '">FB</a>]</span>';
		}
		function fblink2(s) {
			return '<a href="' + fb_url + friends[0] + '">' + s + '</a>';
		}

	//testing to add analytics
	function loadContent(file){
		var head = document.getElementsByTagName('head').item(0)
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
	var pageTracker = _gat._getTracker("UA-20419663-1");
	pageTracker._trackPageview();
	pageTracker._trackPageview("/script/Link_a_Nator"); 
	} catch(err) {}
	//end analytics

    //}   // end try
/*     catch (mainerr) {
        var spock_div = document.getElementById('spockdiv');
        if (spock_div) {
            spock_div.innerHTML = '';
        }
        alert('Some error occured, Link-a-nator not loaded.\nDid you run it on your gift page or unframed MW page?\nIf you did, report the message below (NOT THIS TEXT) to Spockholm:\n\n' + version + '\n' + mainerr);
    } */
} ())