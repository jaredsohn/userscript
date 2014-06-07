// ==UserScript==
// @name           link nator
// @author         spockholm
// @description     apasajalah
// ==/UserScript==

/*
	Credits :
	Pete Lundrigan (Pistol Pete) Author
	Martin Hedman - Bunches of Guidance and Encouragement, http://www.spockholm.com/mafia/
	Mohamed Hafiz for contributing code, http://www.facebook.com/profile.php?id=543666686
	All fans who contribute with item id's for new free gifts.
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
	    var version = 'Team Spockholm - Link-a-Nator v2.03 beta',
	    banner_path = 'http://informantpodcast.com/wp-content/uploads/2010/10/InformantPodcast_banner.png',
        MWURL = getMWURL(),
        sf_xw_sig = /sf_xw_sig=([a-fA-F0-9]+)/.exec(MWURL),
        content = document.getElementById('popup_fodder'),
		mw_url = 'http://apps.facebook.com/inthemafia/profile.php?id=%7B%22user%22%3A%22ID%22%7D',
		fb_url = 'http://www.facebook.com/profile.php?id=',
        userid = /'sf_xw_user_id': '(.+)'/.exec(document.body.innerHTML)[1],
        freegiftname = [],
		freegiftid = [],
		tinylinksforpublish='Free-Gift Links:  ';
		var stopimg = 'data:image/gif;base64,R0lGODlhEAAQANUAAP8A//////9fX/+Pj/9/f/93d/+Ojv9wcP90dP+Vlf97e/9tbf+Rkf+YmP+cnP+amv9paf9qav+EhP+Kiv+Cgv9nZ/+vr/+hof+Wlv+fn/+1tf+qqv+lpf+8vP+0tP91df+UlP/Bwf9lZf94eP9zc/+Dg/9xcf+2tv/Z2f/Y2P/V1f+Li/+dnf9ubv/X1/+Zmf/Nzf+AgP+Hh/9kZP+/v//Q0P+mpgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAaOQIAQMBAYjYOhEiDwoFIuVc0iWDJhHZujgXlYaNWhIHTKbBMMw+SyCQ9emkwggDbMKQ9CUnDhOOYBdnMEEgVVAixngIMKBQiHDw11gASNCAeHGJOLjgcLhyBplICeEFUDJQMTjAVzCxAzSUwrMhSVna8VYUICEjGWnhG6VgIkIx8mLREiu0tFRwKyVtNWQQA7';

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
		function giftObject(name,id,color) {
			this.name = name;
			this.id = parseInt(id);
			this.color = color;
		}		

		//Add special links here
		freegifts['Mystery Bag'] = new giftObject('Mystery Bag*',100);
		freegifts['Red Mystery Bag'] = new giftObject('Red Mystery Bag*',86);
		freegifts['Special Part'] = new giftObject('Special Part*',189);
		freegifts['Secret Drop'] = new giftObject('Secret Drop*',400);
		
		//Amory Build
		freegifts['Hammer'] = new giftObject('Hammer*',181,'#FF9966');
		freegifts['Rivet'] = new giftObject('Rivet*',182,'#FF9966');
		freegifts['Furnace'] = new giftObject('Furnace*',183,'#FF9966');
		freegifts['Vice'] = new giftObject('Vice*',184,'#FF9966');
		freegifts['Anvil'] = new giftObject('Anvil*',185,'#FF9966');
		//Italy Build
		freegifts['Italian Hardwood'] = new giftObject('Italian Hardwood*',401,'#00CC00');
		freegifts['Marble Slab'] = new giftObject('Marble Slab*',402,'#00CC00');
		//freegifts['Stone Column'] = new giftObject('Stone Column*',403,'#00CC00');
		//freegifts['Terracotta Tiles'] = new giftObject('Terracotta Tiles*',404,'#00CC00');
		//Vegas Build
		freegifts['Cinder Block'] = new giftObject('Cinder Block*',161,'#FFCC00');
		freegifts['Concrete'] = new giftObject('Concrete*',163,'#FFCC00');
		freegifts['Construction Tool'] = new giftObject('Construction Tool*',164,'#FFCC00');
		freegifts['Steel Girder'] = new giftObject('Steel Girder*',162,'#FFCC00');
		freegifts['Slot Machine'] = new giftObject('Slot Machine*',160,'#FFCC00');
		freegifts['Casino Dealer'] = new giftObject('Casino Dealer*',165,'#FFCC00');
		freegifts['Chef'] = new giftObject('Chef*',166,'#FFCC00');
		freegifts['Poker Table'] = new giftObject('Poker Table*',167,'#FFCC00');
		freegifts['Bellhop'] = new giftObject('Bellhop*',168,'#FFCC00');
		//Zoo Build
		freegifts['Aquarium'] = new giftObject('Aquarium*',417,'#996633');
		freegifts['Big Cage'] = new giftObject('Big Cage*',418,'#996633');
		freegifts['Bird Cage'] = new giftObject('Bird Cage*',419,'#996633');
		freegifts['Feeding Trough'] = new giftObject('Feeding Trough*',420,'#996633');
		freegifts['Terrarium'] = new giftObject('Terrarium*',421,'#996633');
		freegifts['Exotic Animal Feed'] = new giftObject('Exotic Animal Feed*',422,'#996633');	
//Weapon Build
freegifts['Arc Welder'] = new giftObject('Arc Welder*',75);
freegifts['Buzzsaw'] = new giftObject('Buzzsaw*',76);
freegifts['Gunpowder'] = new giftObject('Gunpowder*',77);
freegifts['Gun Drill'] = new giftObject('Gun Drill*',78);
freegifts['Forge'] = new giftObject('Forge*',79);

		
		//Tree parts
		//freegifts['Ornaments'] = new giftObject('Ornaments',431,'#B80000');
		//freegifts['Tree Lights'] = new giftObject('Tree Lights',432,'#B80000');
		//freegifts['Candy Cane'] = new giftObject('Candy Cane',433,'#B80000');

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
			if(confirm('Not on the free gift page, should I load it?')) {
				do_ajax('inner_page','remote/html_server.php?xw_controller=freegifts&xw_action=view',1,1,0,0);
				return;
			}
			else {
				//die silently
				return;
			}
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
      '<tr><td colspan="3"><a href="http://informantpodcast.com" target="_blank"><img src="'+banner_path+'" alt="The Informant Podcast - Where Family is first"></a></td></tr>'+
      '<tr><td colspan="3" align="right" style="text-align:right;font-size:0.9em;">' + version + ' - <a href="http://www.spockholm.com/mafia/bookmarklets.php" target="_top">Spockholm Mafia Tools</a> - <a href="http://www.spockholm.com/mafia/donate.php?Link-a-Nator" alt="Buy Spockholm a beer" target="_blank">Donate Beer/Coffee</a>  - <a href="#" id="close"><img src="'+stopimg+'" title="Close" width="16" height="16"></a></td></tr>' +
	  '<tr><td colspan="3"><hr /></td></tr>'+
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
		'<td valign="top">Select links:<br /><a href="#" id="common" style="color:#FFFFFF;">Common</a><br /><a href="#" id="armory" style="color:#FF9966;">Armory</a><br /><a href="#" id="vegas" style="color:#FFCC00;">Vegas</a><br /><a href="#" id="italy" style="color:#00CC00;">Italy</a><br /><a href="#" id="zoo" style="color:#996633;">Zoo</a><br /><a href="#" id="Weapon" style="color:#996633;">Weapon</a></td>'+
		//'<td valign="top">Select links:</td>'+
		'<td colspan="2"><form name="gift_selection" id="gift_selection"><table width="100%"><tr>';
		var count = 1;
		for (x in freegifts) {
			config_html += '<td><input type="checkbox" name="freegift" value="'+freegifts[x].id+'" id="'+freegifts[x].name.replace(/\*/,'')+'"><span style="color:'+freegifts[x].color+';">'+freegifts[x].name+'</span></td>';
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
	  '<tr><td></td><td colspan="2"><span class="more_in">&nbsp; Items marked with * are manually added and could stop working at any time.</span></td>'+
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
			$('input[value=100]').attr('checked')?$('input[value=100]').attr('checked', false):$('input[value=100]').attr('checked', true);
			$('input[value=86]').attr('checked')?$('input[value=86]').attr('checked', false):$('input[value=86]').attr('checked', true);
			$('input[value=400]').attr('checked')?$('input[value=400]').attr('checked', false):$('input[value=400]').attr('checked', true);

			return false;
		};
		document.getElementById('armory').onclick = function () {
			$('input[value=181]').attr('checked')?$('input[value=181]').attr('checked', false):$('input[value=181]').attr('checked', true);
			$('input[value=182]').attr('checked')?$('input[value=182]').attr('checked', false):$('input[value=182]').attr('checked', true);
			$('input[value=183]').attr('checked')?$('input[value=183]').attr('checked', false):$('input[value=183]').attr('checked', true);
			$('input[value=184]').attr('checked')?$('input[value=184]').attr('checked', false):$('input[value=184]').attr('checked', true);
			$('input[value=185]').attr('checked')?$('input[value=185]').attr('checked', false):$('input[value=185]').attr('checked', true);
			return false;
		};
		document.getElementById('italy').onclick = function () {
			$('input[value=401]').attr('checked')?$('input[value=401]').attr('checked', false):$('input[value=401]').attr('checked', true);
			$('input[value=402]').attr('checked')?$('input[value=402]').attr('checked', false):$('input[value=402]').attr('checked', true);
			//$('input[value=403]').attr('checked')?$('input[value=403]').attr('checked', false):$('input[value=403]').attr('checked', true);
			//$('input[value=404]').attr('checked')?$('input[value=404]').attr('checked', false):$('input[value=404]').attr('checked', true);
			return false;
		};
		
		
		document.getElementById('zoo').onclick = function () {
			$('input[value=417]').attr('checked')?$('input[value=417]').attr('checked', false):$('input[value=417]').attr('checked', true);
			$('input[value=418]').attr('checked')?$('input[value=418]').attr('checked', false):$('input[value=418]').attr('checked', true);
			$('input[value=419]').attr('checked')?$('input[value=419]').attr('checked', false):$('input[value=419]').attr('checked', true);
			$('input[value=420]').attr('checked')?$('input[value=420]').attr('checked', false):$('input[value=420]').attr('checked', true);
			$('input[value=421]').attr('checked')?$('input[value=421]').attr('checked', false):$('input[value=421]').attr('checked', true);
			$('input[value=422]').attr('checked')?$('input[value=422]').attr('checked', false):$('input[value=422]').attr('checked', true);
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
		
		document.getElementById('Weapon').onclick = function () {
			$('input[value=75]').attr('checked')?$('input[value=75]').attr('checked', false):$('input[value=75]').attr('checked', true);
$('input[value=76]').attr('checked')?$('input[value=76]').attr('checked', false):$('input[value=76]').attr('checked', true);
$('input[value=77]').attr('checked')?$('input[value=77]').attr('checked', false):$('input[value=77]').attr('checked', true);
$('input[value=78]').attr('checked')?$('input[value=78]').attr('checked', false):$('input[value=78]').attr('checked', true);
$('input[value=79]').attr('checked')?$('input[value=79]').attr('checked', false):$('input[value=79]').attr('checked', true);

		
			return false;
		};
		
			var cookie=readCookie('spockholm_giftitems');
			
			if (cookie){
				var giftlist=cookie.split('|');
				$('input:checkbox[name=freegift]:checked').map(function() {
				$('input[value='+this.value+']').attr('checked', false)
				}).get();
				for(i=0;i<giftlist.length;i++){
					$('input[value='+giftlist[i]+']').attr('checked', true);
				}
			}

		if (bitly_username!='bitly_username') {
			$("input[name='service_selected']")[2].click();
		}

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
			
			bitly_username = document.getElementById('bitly_username').value;
			bitly_apikey = document.getElementById('bitly_apikey').value;
			write_settings();
			
			document.getElementById('publish').onclick = FBsetStatus;
			var tmplinks = [];
			$('input:checkbox[name=freegift]:checked').map(function() {
			tmplinks.push(this.value);
			}).get();
			createCookie('spockholm_giftitems', tmplinks.join('|'));
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
					getNewGiftLink(freelinks[0].name.replace(/\*/,''),freelinks[0].id);
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
                var fbsharelink='http://www.facebook.com/connect/prompt_feed.php?&message='+ escape(tinylinksforpublish +'     SPOCK ON!!!');
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
						//getNewTinyLink(/<fb:req-choice url='([^']+)'/.exec(response)[1],itemname);
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
	loadContent('http://localhost/xampp/ga.js');
	try {
	var pageTracker = _gat._getTracker("UA-8435065-3");
	pageTracker._trackPageview();
	pageTracker._trackPageview("/script/Link-a-Nator"); 
	} catch(err) {}
	//end analyticss

    //}   // end try
/*     catch (mainerr) {
        var spock_div = document.getElementById('spockdiv');
        if (spock_div) {
            spock_div.innerHTML = '';
        }
        alert('Some error occured, Link-a-nator not loaded.\nDid you run it on your gift page or unframed MW page?\nIf you did, report the message below (NOT THIS TEXT) to Spockholm:\n\n' + version + '\n' + mainerr);
    } */
} ())