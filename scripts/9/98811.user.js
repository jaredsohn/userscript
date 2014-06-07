// ==UserScript==
// @name           Link-a-Nator v2.11 beta
// @author         Spockholm - Modified by: DrMorbius
// @description    Creates MW Gift Links
// ==/UserScript==
/*
	$Id: link-a-nator.js,v 1.65 2011-10-28 06:25:58 eike Exp $
	Credits :
	Pete Lundrigan (Pistol Pete) Author
	Martin Hedman - Bunches of Guidance and Encouragement, http://www.spockholm.com/mafia/
	Mohamed Hafiz for contributing code, http://www.facebook.com/profile.php?id=543666686
	Brandon Venery- for new Gifting Fix.
	All fans who contribute with item id's for new free gifts.
*/

javascript: (function() {
    //try { //begin big try
		if (document.getElementById('blueBar')) {
			 //Credits to Toenailsin for this new fix (and Spockholm)
			 // Load the iframe
			
			 //Thanks to spockholm & 'Chris' for the unframe code
			 for (var i = 0; i < document.forms.length; i++) {
			   if (document.forms[i].action.indexOf('index2.php')!=-1) {
				  document.forms[i].target = '';
				  document.forms[i].submit();
				  return false;
			   }
			 }
		}
       else if (document.getElementsByClassName('canvas_iframe_util')[0]) {
            for (var i = 0; i < document.forms.length; i++)
			{if (/^canvas_iframe_post/.test(document.forms[i].id))
			{
				document.forms[i].target = '';
				document.forms[i].submit();
				return;
			}
		}
	}
	else if (document.getElementById('some_mwiframe')) {
		//for mafiawars.com unframing
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
			//Temp disable to get things working properly
			//document.getElementById('snapi_zbar').parentNode.parentNode.removeChild(document.getElementById('snapi_zbar').parentNode);

		} catch (fberr) {}
		//Revolving Revolver of Death from Arun, http://arun.keen-computing.co.uk/?page_id=33
		$('#LoadingBackground').hide();
		$('#LoadingOverlay').hide();
		$('#LoadingRefresh').hide();
	}
	//end unframe code
	//hack to kill the resizer calls
	iframeResizePipe = function() {};
	
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
	    var version = 'Link-a-Nator v2.19 beta (Modified by: Dr.Morbius)',
		xw_city = $('#mw_city_wrapper').attr('class').substr(7),
        MWURL = getMWURL(),
        sf_xw_sig = /sf_xw_sig=([a-fA-F0-9]+)/.exec(MWURL),
        content = document.getElementById('popup_fodder'),
		mw_url = 'http://apps.facebook.com/inthemafia/profile.php?id=%7B%22user%22%3A%22ID%22%7D',
		fb_url = 'http://www.facebook.com/profile.php?id=',
        //userid = /'sf_xw_user_id': '(.+)'/.exec(document.body.innerHTML)[1],
        userid = User.id,
        freegiftname = [],
		freegiftid = [],
		tinylinksforpublish='Free-Gift Links:  ';
		var stopimg = 'data:image/gif;base64,R0lGODlhEAAQANUAAP8A//////9fX/+Pj/9/f/93d/+Ojv9wcP90dP+Vlf97e/9tbf+Rkf+YmP+cnP+amv9paf9qav+EhP+Kiv+Cgv9nZ/+vr/+hof+Wlv+fn/+1tf+qqv+lpf+8vP+0tP91df+UlP/Bwf9lZf94eP9zc/+Dg/9xcf+2tv/Z2f/Y2P/V1f+Li/+dnf9ubv/X1/+Zmf/Nzf+AgP+Hh/9kZP+/v//Q0P+mpgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAaOQIAQMBAYjYOhEiDwoFIuVc0iWDJhHZujgXlYaNWhIHTKbBMMw+SyCQ9emkwggDbMKQ9CUnDhOOYBdnMEEgVVAixngIMKBQiHDw11gASNCAeHGJOLjgcLhyBplICeEFUDJQMTjAVzCxAzSUwrMhSVna8VYUICEjGWnhG6VgIkIx8mLREiu0tFRwKyVtNWQQA7';
		var spocklet = 'l_a_n';
		// try { var fbuserid = /'uid': ([0-9]*)/.exec(document.body.innerHTML)[1]; }
        // catch (ignoree) {
            // var fbuserid = FB.Facebook.apiClient.get_session().uid + '';
        // }
		var fbuserid = User.trackId;
		var banners = [
			//'<a href="http://www.mafiawars-maniac.com/" target="_blank" onclick="javascript:pageTracker._trackPageview(\'/script/mwm-lan\'); alt="mafiawars-maniac.com" title="mafiawars-maniac.com"><img src="http://www.exellerate.com/mafia/740x38.png" width="740" height="38" style="margin:0 0 22px 0;" /></a>',
			'<a href="http://informantpodcast.com" target="_blank"><img src="http://informantpodcast.com/wp-content/uploads/2010/10/InformantPodcast_banner.png" alt="The Informant Podcast - Where Family is first" width="740" height="38" style="margin:0 0 22px 0;" /></a>',
			'<a href="http://www.spockholm.com/mafia/external.php#Link-a-Nator" target="_blank"><img src="http://www.mafia-tools.com/uploads/banner-spockholm-mafia-tools.png#Link-a-Nator" alt="Spockholm Mafia Tools" title="Spockholm Mafia Tools" width="425" height="60" style="margin:0 160px 0 155px;" /></a>'
		];
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
		var minienergylink= '';
		var giftkeycookie = '';
		var brazilcrewlink = '';
		var missioncrewlink = '';
		var secretstashcookie = '';
		var mwwarhelplink = '';
		var savetodatabase = false;

		var http = 'http://';
			if (/https/.test(document.location)) {
			http = 'https://';
		}
		var preurl = http+'facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?';
		
		FB.init({
			appId  : '10979261223',
			status : true, // check login status
			cookie : true, // enable cookies to allow the server to access the session
			frictionlessRequests : true
		});
		
		function read_settings() {
			var settings = readCookie('linkanator_settings');
			if (settings == null || settings == 'undefined') {
				settings = bitly_username+'|'+bitly_apikey+'|'+mwprofilelink+'|'+promotelink+'|'+crimespreelink+'|'+ giftkeycookie +'|'+ minienergylink+'|'+ secretstashcookie + '|' + mwwarhelplink + '|' + savetodatabase;
				createCookie('linkanator_settings',settings);
			}
			var parameters = settings.split('|');
			if (parameters.length < 10) {
				settings = bitly_username+'|'+bitly_apikey+'|'+mwprofilelink+'|'+promotelink+'|'+crimespreelink+'|'+ giftkeycookie +'|'+ minienergylink+'|'+ secretstashcookie + '|' + mwwarhelplink + '|' + savetodatabase;
				createCookie('linkanator_settings',settings);
				parameters = settings.split('|');
			}
			bitly_username = parameters[0];
			bitly_apikey = parameters[1];
			mwprofilelink = parameters[2];
			promotelink = parameters[3];
			crimespreelink = ''; //parameters[4];
			giftkeycookie =  parameters[5];
			minienergylink = parameters[6];
			secretstashcookie = ''; parameters[7];
			mwwarhelplink = parameters[8];
			savetodatabase = parameters[9]=="true";
		}
		function write_settings() {
			var settings = bitly_username+'|'+bitly_apikey+'|'+mwprofilelink+'|'+promotelink+'|'+crimespreelink+'|'+ giftkeycookie +'|'+ minienergylink+'|'+ secretstashcookie + '|' + mwwarhelplink + '|' + savetodatabase;
			createCookie('linkanator_settings',settings);
		}
		read_settings();
		
		//Load free gift page before starting
		var freegifts = [];
		function giftObject(name,id,cat,color) {
			this.name = camelize(name);
			this.id = parseInt(id);
			this.cat = cat;
			this.color = color;
		}		

		//Add special links here
		//We could add every object that works, but have decided on only using what has been featured on the free gift page.
		//Adding stuff that is not meant to be giftable by Zynga could be considered exploiting
		freegifts['Blue Mystery Bag'] = new giftObject('Blue Mystery Bag*',527,1);
		freegifts['Red Mystery Bag'] = new giftObject('Red Mystery Bag*',86,1);
		freegifts['Special Part'] = new giftObject('Special Part*',189,1);
		//Amory Build
		freegifts['Hammer'] = new giftObject('Hammer*',181,1,'#FF9966');
		freegifts['Rivet'] = new giftObject('Rivet*',182,1,'#FF9966');
		freegifts['Furnace'] = new giftObject('Furnace*',183,1,'#FF9966');
		freegifts['Vice'] = new giftObject('Vice*',184,1,'#FF9966');
		freegifts['Anvil'] = new giftObject('Anvil*',185,1,'#FF9966');
		//Italy Build
		freegifts['Italian Hardwood'] = new giftObject('Italian Hardwood*',401,1,'#00CC00');
		freegifts['Marble Slab'] = new giftObject('Marble Slab*',402,1,'#00CC00');
		//freegifts['Stone Column'] = new giftObject('Stone Column*',403,1,'#00CC00'); removed from freegiftables by Zynga
		//freegifts['Terracotta Tiles'] = new giftObject('Terracotta Tiles*',404,1,'#00CC00'); removed from freegiftables by Zynga
		//Vegas Build
		freegifts['Cinder Block'] = new giftObject('Cinder Block*',161,1,'#FFCC00');
		freegifts['Concrete'] = new giftObject('Concrete*',163,1,'#FFCC00');
		freegifts['Construction Tool'] = new giftObject('Construction Tool*',164,1,'#FFCC00');
		freegifts['Steel Girder'] = new giftObject('Steel Girder*',162,1,'#FFCC00');
		freegifts['Slot Machine'] = new giftObject('Slot Machine*',160,1,'#FFCC00');
		freegifts['Casino Dealer'] = new giftObject('Casino Dealer*',165,1,'#FFCC00');
		freegifts['Chef'] = new giftObject('Chef*',166,1,'#FFCC00');
		freegifts['Poker Table'] = new giftObject('Poker Table*',167,1,'#FFCC00');
		freegifts['Bellhop'] = new giftObject('Bellhop*',168,1,'#FFCC00');
		//Zoo Build
		freegifts['Aquarium'] = new giftObject('Aquarium*',417,1,'#996633');
		freegifts['Big Cage'] = new giftObject('Big Cage*',418,1,'#996633');
		freegifts['Bird Cage'] = new giftObject('Bird Cage*',419,1,'#996633');
		freegifts['Feeding Trough'] = new giftObject('Feeding Trough*',420,1,'#996633');
		freegifts['Terrarium'] = new giftObject('Terrarium*',421,1,'#996633');
		freegifts['Exotic Animal Feed'] = new giftObject('Exotic Animal Feed*',422,1,'#996633');		
		
		freegifts['Rare Secret Drop'] = new giftObject('Rare Secret Drop*',400,1);
		freegifts['Stamina Pack'] = new giftObject('Stamina Pack*',492,1);
		//freegifts['Time Capsule'] = new giftObject('Time Capsule*',4231,1);
		//freegifts['Coffin'] = new giftObject('Coffin*',434,1);
		
		freegifts['Hidden Charges'] = new giftObject('Hidden Charges*',444,1);
		freegifts['Cooked Book'] = new giftObject('Cooked Book*',445,1);
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
		
		freegifts['Reinforced Steel'] = new giftObject('Reinforced Steel*',170,1);
		freegifts['Cement Blocks'] = new giftObject('Cement Blocks*',70,1);
		freegifts['Power Tools'] = new giftObject('Power Tools*',71,1);

		//freegifts['Hollow Point'] = new giftObject('Hollow Point*',477,1);
		//freegifts['A19 Riot Shield'] = new giftObject('A19 Riot Shield*',478,1);
		freegifts['Life Saver'] = new giftObject('Life Saver*',502,1);
		//freegifts['Jungle Map'] = new giftObject('Jungle Map*',512,1);
		freegifts['Casa Grande Reservation'] = new giftObject(' Casa Grande Reservation!*',515,1);
		
		
		//Chicago
		freegifts['Union Worker'] = new giftObject('Union Worker*',1000,1,'#996633')
		freegifts['Carpenter Nails'] = new giftObject('Carpenter Nails*',1001,1,'#996633');
		freegifts['Lath Strips'] = new giftObject('Lath Strips*',1002,1,'#996633');
		freegifts['Iron Cast'] = new giftObject('Iron Cast*',1003,1,'#996633');
		freegifts['Douglas Fir Beams'] = new giftObject('Douglas Fir Beams*',1004,1,'#996633');
		
		function read_free_gifts() {
			var url = 'xw_controller=freegifts&xw_action=view&xw_city=1&mwcom=1';
			//msg('Loading Free_gifts...');
			request(url,function(s){ parse_read_free_gifts(s); });
		}

		function parse_read_free_gifts(response) {
			if (typeof allCats == 'undefined') {
				allCats = JSON.parse(/allCats.*?(\{.*\})/.exec(response)[1]);
			}
			var inputs = $(response).find('.freegift_box');
			var manual = false;
			if (inputs.length > 0 && !manual) {
				//document.getElementById('spock_status').innerHTML ='Loading Links....';
				for(i = 0; i < inputs.length; i++) {
					var input = inputs[i];
					if(input.id.indexOf("freegift_box_") == 0) {
						//freegifts[freegifts.length] = new giftObject(input.childNodes[3].childNodes[3].textContent,input.id.substring(13));
						freegifts[camelize($(input).find('.freegift_box_itemname').text())] = new giftObject($(input).find('.freegift_box_itemname').text(),input.id.substring(13),allCats[input.id.substring(13)]);
					}
				}
				str = '<tr>';
				var count = 1;
				for (x in freegifts) {
					str += '<td><input type="checkbox" name="freegift" value="'+freegifts[x].id+'" cat="'+freegifts[x].cat+'" id="'+freegifts[x].name.replace(/\*/,'')+'"><span style="color:'+freegifts[x].color+';">'+freegifts[x].name+'</span></td>';
					str += (count%4 == 0)?'</tr><tr>':'';
					count++;
				}
				if (count%4 != 0) { //do some padding on the last row
					count--;
					while (count%4 != 0) {
						str += '<td>&nbsp;</td>';
						count++;
					}
				}
					
					str += '</tr>';
					$('#free_gifts_loaded').html(str);
			
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

			}
			else {}
		}

        function myRandom(min, max) {
            return min + Math.floor(Math.round((Math.random() * (max - min))));
        }
        function unix_timestamp() {
            return parseInt(new Date().getTime().toString().substring(0, 10));
        }
        var config_html =
      '<style type="text/css">' +
      '.messages img{margin:0 3px;vertical-align:top};' +
      '#close{display:inline};' +
      '</style>' +
      '<form name="spockform">' +
      '<table class="messages" style="margin-bottom:10px;">' +
      '<tr><td colspan="3" id="'+spocklet+'_banner"></td></tr>'+
      '<tr><td colspan="3" align="right" style="text-align:right;font-size:1.0em;">'
		+version+
		'&nbsp; <a href="http://www.spockholm.com/mafia/testing.php" id="'+spocklet+'_link" class="sexy_button_new short" target="_blank" title="Spockholm Mafia Tools" alt="Spockholm Mafia Tools"><span><span>Spockholm Mafia Tools</span></span></a>'+
		'&nbsp; <a href="http://www.spockholm.com/mafia/donate.php#RepeatJobBrazil" id="'+spocklet+'_donate" class="sexy_button_new short white" target="_blank" title="Like what we do? Donate to Team Spockholm" alt="Like what we do? Donate to Team Spockholm"><span><span>Donate</span></span></a>'+
		'&nbsp; <a href="#" id="'+spocklet+'_close" class="sexy_button_new short red" title="Close Link-a-Nator" alt="Close Link-a-Nator"><span><span>Close</span></span></a>'+
	  '</td></tr>' +
	  '<tr><td colspan="3"><hr /></td></tr>'+
	  '<tr><td>Status:</td><td colspan="2" id="spock_status">Select what links to create and press buttons below.</td></tr>'+
      '<tr>' +
		'<td valign="top">General Links:</td>' +
		'<td colspan="2">'+
			'<div id="fbProfile"></div>'+
			'<div id="mwProfile"><input type="checkbox" name="general_links" value="mwProfile" checked="checked">'+(/http/.test(mwprofilelink)?'<span class="good">Mafia Wars Profile: </span>'+mwprofilelink+' <span class="more_in">(from cookie)</span>':'<span class="more_in">Profile, not loaded yet.')+'</div>'+
			'<div id="warhelp"><input type="checkbox" name="general_links" value="warhelp" checked="checked">'+(/http/.test(mwwarhelplink)?'<span class="good">War Help: </span>'+mwwarhelplink+' <span class="more_in">(from cookie)</span>':'<span class="more_in">War help link, not loaded yet.')+'</div>'+
			'<div id="promote"><input type="checkbox" name="general_links" value="promote" checked="checked">'+(/http/.test(promotelink)?'<span class="good">Promote: </span>'+promotelink+' <span class="more_in">(from cookie)</span>':'<span class="more_in">Promote link, not loaded yet.')+'</div>'+
			'<div id="crimespree"><input type="checkbox" name="general_links" value="crimespree">'+(/http/.test(crimespreelink)?'<span class="good">Crime Spree: </span>'+crimespreelink+' <span class="more_in">(from cookie)</span>':'<span class="more_in">Crime Spree, not loaded yet.')+'</div>'+
			'<div id="energy"><input type="checkbox" name="general_links" value="energy" checked="checked">'+(/http/.test(minienergylink)?'<span class="good">Mini Energy Pack: </span>'+minienergylink+' <span class="more_in">(from cookie)</span>':'<span class="more_in">Mini Energy Pack, not loaded yet.')+'</div>'+
			'<div id="missioncrew"><input type="checkbox" name="general_links" value="missioncrew" checked="checked"><span class="more_in">Mission Crew, if needed.</div>'+
			'<div id="brazilcrew"><input type="checkbox" name="general_links" value="brazilcrew" checked="checked"><span class="more_in">Brazil Crew.</div>'+
			'<div id="secretstash"><input type="checkbox" name="general_links" value="secretstash">'+(/http/.test(secretstashcookie)?'<span class="good">Secret Stash: </span>'+secretstashcookie+' <span class="more_in">(from cookie)</span>':'<span class="more_in">Secret Stash')+'</div>'+
			'<div id="giftkey"><input type="checkbox" name="general_links" value="giftkey">'+(/[a-fA-F0-9]{32}/.test(giftkeycookie)?'<span class="good"><a href="http://www.spockholm.com/mafia/index.php?key='+giftkeycookie+'">Mafia Gift Linker</a> secret key: </span>'+giftkeycookie+' <span class="more_in">(from cookie)</span>':'<span class="more_in">GiftKey, not loaded yet.')+' <span class="more_in">(Do not share with others!)</a></div></td>'+
	  '</tr>'+
	  '<tr><td colspan="3"><a href="#" class="sexy_button_new short orange" id="general"><span><span>Generate General Links</span></span></a> This button will update the links above.</td></tr>'+
	  '<tr><td colspan="3"><hr /></td></tr>'+
	  '<tr id="select_row">'+
		'<td valign="top">Free Gifts:<br /><a href="#" id="common" style="color:#FFFFFF;">Common</a><br /><a href="#" id="armory" style="color:#FF9966;">Armory</a><br /><a href="#" id="vegas" style="color:#FFCC00;">Vegas</a><br /><a href="#" id="italy" style="color:#00CC00;">Italy</a><br /><a href="#" id="zoo" style="color:#996633;">Zoo</a><br /><a href="#" id="lan_chicago" style="color:#996633;">Chicago</a><br /><a href="#" id="select_all" style="color:#CC0000;">All</a><br /><a href="#" id="select_none" style="color:#CCCC00;">None</a></td>'+
		'<td colspan="2"><form name="gift_selection" id="gift_selection"><table width="100%" id="free_gifts_loaded">'+
	  '</table></form></td></tr>'+
	  '<tr><td></td><td colspan="2"><span class="more_in">Items marked with * are manually added and could stop working at any time.</span><br /><span class="bad">Zynga decides what works and what does not.</span></td>'+
	  '<tr><td><span class="bad">Select Service:</span></td><td colspan="2">'+
	  	'<form id="service_select">'+
		'<label><input type="radio" name="service_selected" value="spockon" checked="checked">Spockon</label>'+
		'<label><input type="radio" name="service_selected" value="tinyurl1">Public Tiny</label>'+
		'<label><input type="radio" name="service_selected" value="tinyurl2">Spockholm Tiny</label>'+
		'<label><input type="radio" name="service_selected" value="bitly">bit.ly</label>'+
		'<label><input type="radio" name="service_selected" value="none">None</label>&nbsp;'+
	  '</form>'+
	  '</td></tr>'+
	  '<tr><td></td><td colspan="2">&nbsp;<span id="service_info" class="energy_highlight">Preferred, use the fast and secure spockon service.</span></td></tr>'+
	  '<tr id="bitly_row" style="display:none;">'+
		'<td>bit.ly info:</td>'+
		'<td colspan="2">Username:<input id="bitly_username" type="text" value="'+bitly_username+'"> API key:<input id="bitly_apikey" type="text" value="'+bitly_apikey+'"> (<a href="http://bit.ly/a/your_api_key">Get key here</a>)</td>'+
	  '</tr>'+
	  '<tr><td colspan="3"><a href="#" class="sexy_button_new short orange" id="generate"><span><span>Generate Free Gifts</span></span></a> &nbsp; <a href="#" class="sexy_button_new short orange" id="publish" style="display:none;"><span><span>Publish to Wall</span></span></a> &nbsp; <a href="#" class="sexy_button_new short orange" id="publishgroup" style="display:none;"><span><span>Publish to Group</span></span></a><span id="publishinfo"></span>&nbsp;Look for an open window or tab after clicking Publish to Wall button.</td></tr>'+
	  '<tr><td colspan="3"><a href="#" class="sexy_button_new short white" id="'+spocklet+'_linkodatabase" style="display:none;"><span><span>Publish to family link-o-database</span></span></a> <span id="'+spocklet+'_linkodatabase_result"></span><br>'+
	  '<label><input type="checkbox" class="nochange" id="'+spocklet+'_autolinkodatabase"'+(savetodatabase?' checked':'')+'>Send to database automatically after creation.</label><a href="http://spockon.me/linkodatabase" target="_blank"><img src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon-help.gif"></a></td></tr>'+
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
      '<tr id="note_row" style="display:none;">' +
		'<td valign="top">Note Links:</td>' +
		'<td colspan="2"><textarea id="note_gift_list" class="instructions" rows="10" cols="60">Free Gift Links - '+new Date().toString()+'\n</textarea></td>'+
	  '</tr>' +
      '</table>' +
      '</form>';

		create_div();
		//$('#bitly_row').hide();
		read_free_gifts();
		
		document.getElementById('fbProfile').innerHTML = '<span class="good">Facebook: </span>'+fb_url+fbuserid;
		var general = [];
		$('#general').click(function () {
			$('input:checkbox[name=general_links]:checked').each(function() {
				general.push(this.value);
				//console.log('value:'+this.value);
			});
			nextGeneralLink();
		});
		function nextGeneralLink() {
			if (general.length > 0) {
				var wait1 = 1;
				var wait2 = 3;
				var wait = myRandom(parseInt(wait1),parseInt(wait2));
				var func;
				if (general[0] === 'mwProfile') {
					var func = function func(){ getTinyMwLink('http://apps.facebook.com/inthemafia/track.php?next_controller=stats&next_action=view&next_params=%7B%22user%22%3A%22$ID%22%7D'.replace('$ID',fbuserid)); }
				}
				if (general[0] === 'promote') {
					//var func = function func(){ getTinyPromoteLink('http://apps.facebook.com/inthemafia/track.php?next_controller=group&next_action=view&next_params=%7B%22promote%22%3A%22yes%22%2C%22pid%22%3A%22$ID%22%7D'.replace('$ID',userid.substr(2))); }
					var func = function func(){ getTinyPromoteLink('http://apps.facebook.com/inthemafia/track.php?next_controller=group&next_action=view&next_params=%7B%22promote%22%3A%22yes%22%2C%22pid%22%3A%22$ID%22%7D'.replace('$ID',fbuserid)); }
				}
				if (general[0] === 'crimespree') {
					var func = function func(){ 	getNewCrimeSpreeLink(preurl+'xw_controller=safehouse&xw_action=safehouse_request&xw_city=1&tmp=&cb=&xw_client_id=8&ajax=1&liteload=1&fbml_iframe=1'); }
				}
				if (general[0] === 'energy') {
					var func = function func(){ getNewMiniEnergyLink(preurl+'xw_controller=requests&xw_action=friend_selector_simple&xw_city=7&xw_person='+fbuserid+'&mwcom=1&req_type=simple&req_name=mini_pack&xw_client_id=8&ajax=1&liteload=1&fbml_iframe=1'); }
				}
				if (general[0] === 'missioncrew') {
					var func = function func(){ getMissionCrewLink(); }
				}
				if (general[0] === 'brazilcrew') {
					var func = function func(){ getTinyBrazilCrew('xw_controller=requests&xw_action=friend_selector_simple&xw_city=6&req_type=simple&req_name=city_crew&xw_client_id=8&ajax=1&liteload=1&fbml_iframe=1'); }
				}
				if (general[0] === 'secretstash') {
					var func = function func(){ getTinyStash('xw_controller=requests&xw_action=friend_selector_simple&xw_city=6&req_type=simple&req_name=stash_raiders&extra_params=%7B%22rarity%22%3A25%2C%22item_id%22%3A7030%2C%22stash_id%22%3A0%7D&xw_client_id=8&ajax=1&liteload=1&fbml_iframe=1'); }
				}
				if (general[0] === 'giftkey') {
					var func = function func(){ getGiftKey(); }
				}
				if (general[0] === 'warhelp') {
					var func = function func(){ getWarHelpLink('http://apps.facebook.com/inthemafia/track.php?next_controller=war&next_action=view&zy_track=feed&sendkey=&next_params=%7B%22leader_id%22%3A%22p%7C$ID%22%7D&ref=nf'.replace('$ID',userid.replace('p|',''))); }
				}
					
				general = general.slice(1);
				pausing(wait,'Loading next general link in...',func);
			}
			else {
				msg('Done with all the general links...');
			}
		}
		document.getElementById('common').onclick = function () {
			$('input[value=100]').attr('checked')?$('input[value=100]').attr('checked', false):$('input[value=100]').attr('checked', true);
			$('input[value=86]').attr('checked')?$('input[value=86]').attr('checked', false):$('input[value=86]').attr('checked', true);
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
		document.getElementById('lan_chicago').onclick = function () {
			$('input[value=1000]').attr('checked')?$('input[value=1000]').attr('checked', false):$('input[value=1000]').attr('checked', true);
			$('input[value=1001]').attr('checked')?$('input[value=1001]').attr('checked', false):$('input[value=1001]').attr('checked', true);
			$('input[value=1002]').attr('checked')?$('input[value=1002]').attr('checked', false):$('input[value=1002]').attr('checked', true);
			$('input[value=1003]').attr('checked')?$('input[value=1003]').attr('checked', false):$('input[value=1003]').attr('checked', true);
			$('input[value=1004]').attr('checked')?$('input[value=1004]').attr('checked', false):$('input[value=1004]').attr('checked', true);
			return false;
		};	
	
		$('#select_all').click(function () {
		$('#spockdiv input:checkbox').not('.nochange').each(function(){
				$(this).attr('checked', true);
			});
			return false;
		});
		$('#select_none').click(function () {
			$('#spockdiv input:checkbox').not('.nochange').each(function(){
				$(this).attr('checked', false);
			});
			return false;
		});
		
		$('#'+spocklet+'_autolinkodatabase').click(function() {
			savetodatabase=($(this).attr('checked')=="checked");
		});
		

		if (bitly_username != 'bitly_username') {
			$("input[name='service_selected']")[3].click();
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
			if($("input[name='service_selected']:checked").val() == 'spockon') {
				$('#bitly_row').hide();
				$('#service_info').html('Preferred, use the fast and secure spockon service.');
			}
			//return false;
		};
		
		var freelinks = [];
		document.getElementById('generate').onclick = function () {
			//use jQuery to populate freelinks with the selected items
			$('input:checkbox[name=freegift]:checked').map(function() {
				freelinks.push({id:this.value,name:this.id,cat:$(this).attr('cat')});
			}).get();
			
			//show textareas
			$('#free_row').show();
			$('#tiny_row').show();
			$('#forum_row').show();
			$('#note_row').show();
			//DrMorbius
			/*
			document.getElementById('tiny_gift_list').value +=  new Date() + '\n\nAdd Me: http://www.facebook.com/addfriend.php?id=' + fbuserid + 
			*/
			document.getElementById('tiny_gift_list').value +=  new Date() + '\n\nPromote: ' + promotelink + '\nCrime Spree: ' + crimespreelink + '\nMini Energy: ' + minienergylink + '\nMission Crew: ' + missioncrewlink + '\nBrazil Crew: ' + brazilcrewlink + '\nSecret Stash: ' + secretstashcookie + '\n';
			document.getElementById('forum_gift_list').value += new Date() + '\n';
			
			bitly_username = document.getElementById('bitly_username').value;
			bitly_apikey = document.getElementById('bitly_apikey').value;
			write_settings();
			
			document.getElementById('publish').onclick = FBsetStatus;
			document.getElementById('publishgroup').onclick = FBPostGroup;
			var tmplinks = [];
			$('input:checkbox[name=freegift]:checked').map(function() {
				tmplinks.push(this.value);
			}).get();
			createCookie('spockholm_giftitems', tmplinks.join('|'));
			//start loading links
			nextLink();
		};
		$('#'+spocklet+'_donate').effect("pulsate", { times:1 }, 750);
		
		function nextLink() {
			if (freelinks.length > 0) {
				//console.log('Generating link for: '+freelinks[0].name);
				var wait1 = 1;
				var wait2 = 3;
				var wait = myRandom(parseInt(wait1),parseInt(wait2));
				
				function f() {
					getNewGiftLink(freelinks[0].name.replace(/\*/,''),freelinks[0].id,freelinks[0].cat);
					freelinks = freelinks.slice(1);
				}
				pausing(wait,'Loading next link in...',f);
			}
			else {
				msg('Done with all the links, you can press the button again to create a new set.');
				$('#publish').show();
				$('#publishgroup').show();
				$('#'+spocklet+'_linkodatabase').show();
				$('#publish').effect("pulsate", { times:1 }, 750);
				$('#publishgroup').effect("pulsate", { times:1 }, 750);
				if (tinylinksforpublish.length > 235) {
					$('#publishinfo').html('<span class="bad">Caution!</span> Post is '+parseInt(tinylinksforpublish.length+16)+' characters, it might not fit into one post.<br />');
				}
				if (savetodatabase) {
					$('#'+spocklet+'_linkodatabase').trigger('click');
				};
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
				$('head').append('<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" type="text/css" />');
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
			//var fbsharelink='http://www.facebook.com/connect/prompt_feed.php?&message='+ escape(tinylinksforpublish +'     SPOCK ON!!!');
			var body = tinylinksforpublish +'     SPOCK ON!!!';
			FB.login(function (response) {},{ perms: 'publish_stream' });
			FB.api('/me/feed', 'post', { message: body }, function(response) {
				if (!response || response.error) {
					msg('<span class="bad">Error occured:</span> '+response.error.message);
					$('#publish').removeClass('orange').addClass('red');
				}
				else {
					$('#publish').removeClass('orange').addClass('green');
					msg('<span class="good">Successfully posted</span> to your wall, view your post <a href="http://www.facebook.com/'+response.id.replace(/_/,'/posts/')+'">here</a>.')
				}
			});
			//window.open(fbsharelink,'Temp Window1', winopts);
		}
		
		function FBPostGroup(){
			var body = tinylinksforpublish +'     SPOCK ON!!!';
			FB.login(function (response) {},{ perms: 'publish_stream' });
			FB.ui({
				method: 'send',
				name: 'Giftlinks',
//				link: params.link,
//				picture: params.picture,
				description: body,
//				to: $('#'+spocklet+'_selectable').val()
			}, function(response) {
				if (!response || response.error) {
					msg('<span class="bad">Error occured:</span> '+response.error.message);
					$('#publish').removeClass('orange').addClass('red');
				}
				else {
					$('#publish').removeClass('orange').addClass('green');
					msg('<span class="good">Successfully posted</span> to your wall, view your post <a href="http://www.facebook.com/'+response.post_id.replace(/_/,'/posts/')+'">here</a>.')
				}
			});
		}

		function getNewGiftLink(itemname,id,cat) {
			var baglink = preurl+'xw_controller=requests&xw_action=friend_selector&xw_city='+xw_city+'&tmp=&cb=&req_controller=freegifts&free_gift_id='+id+'&free_gift_cat='+cat+'&xw_client_id=8&ajax=1&liteload=1&fbml_iframe=1';
			msg('Loading Gift Link: '+itemname);
			$.ajax({
				type: "POST",
				url: baglink,
				data: {
					'sf_xw_user_id': userid,
					'sf_xw_sig': local_xw_sig
				},
				success: function(response) {
					var newgiftsys = 'http://apps.facebook.com/inthemafia/track.php?req_class=FreeGiftsRequest&uid=0&zy_track=request&code=&value={"from":"'+User.id+'","value":"appinvite_giftinterstitial_page"}&ztrack_category=free_gift&ztrack_subcategory=&ztrack_creative=free_gift&next_controller=freegifts&next_action=accept_gift&next_params='
					document.getElementById('gift_list').value += itemname +' ' +new Date().toString()+'\n\n' +newgiftsys+escape(/MW.Request.setData\(\'(.*?)\'\);/.exec(response)[1]) + '\n\n';
					msg('Loading TinyUrl for: '+itemname);
					if ($("input[name='service_selected']:checked").val() == 'none') {
						var longurl = newgiftsys+escape(/MW.Request.setData\('(.*?)'\);/.exec(response)[1]);
						document.getElementById('tiny_gift_list').value += itemname + ': ' + longurl + '\n';
						document.getElementById('forum_gift_list').value += '[url=' + longurl + ']' + itemname + '[/url]\n';
						document.getElementById('note_gift_list').value += '<a href="'+ longurl+'">'+itemname+'</a>\n';
						//tinylinksforpublish += itemname + ': ' + longurl + '    ';
						nextLink();
					}
					else {
						//getNewTinyLink(/<fb:req-choice url='([^']+)'/.exec(response)[1],itemname);
						getNewTinyLink(newgiftsys+escape(/MW.Request.setData\('(.*?)'\);/.exec(response)[1]),itemname);
					}
				}
			});
		}
		
		/*
			generic url shortened
			handler is the function which is called if url is shortened, nohandler if "none" is selected
		*/
		function getTinyLink(strurl, handler, nohandler) {
			strurl = strurl.replace(/https/,'http');
			if ($("input[name='service_selected']:checked").val() == 'tinyurl1') {
				$.getJSON("http://json-tinyurl.appspot.com/?&callback=?",
					{url: strurl},
					function (data) {
						handler(data.tinyurl);
					}
				);
			}
			else if ($("input[name='service_selected']:checked").val() == 'tinyurl2') {
				$.getJSON("http://www.exellerate.com/mafia/urlshortner/multiple-url-shortener.php/?&callback=?",
					{url: strurl},
					function(data){
						handler(data.tinyurl);
					}
				);
			}
			else if ($("input[name='service_selected']:checked").val() == 'bitly') {
				$.getJSON("http://api.bit.ly/v3/shorten?login="+bitly_username+"&apiKey="+bitly_apikey+"&longUrl=" + escape(strurl) + "&format=json&callback=?",
					function(data){
						handler(data.data.url);
					}
				);
			}
			else if ($("input[name='service_selected']:checked").val() == 'spockon') {
				$.ajax({
					type: "GET",
					dataType: "jsonp",
					url: 'http://spockon.me/api.php?action=shorturl&format=jsonp&url='+escape(strurl),
					crossDomain: true,
					success: function (msg){
						handler(msg.shorturl);
					}
				});			
			}
			else {
				if (nohandler) {
					nohandler();
				}
			}
		}
		
		function getNewTinyLink(strurl,itemname) {
			getTinyLink(strurl,function(shorturl){
				document.getElementById('tiny_gift_list').value += itemname + ': ' + shorturl + '\n';
				document.getElementById('forum_gift_list').value += '[url=' + shorturl + ']' + itemname + '[/url]\n';
				document.getElementById('note_gift_list').value += '<a href="'+ shorturl+'">'+itemname+'</a>\n';
				tinylinksforpublish += itemname + ': ' + shorturl + '    ';
				nextLink();
			});
		}
		
		function getTinyMwLink(strurl) {
			getTinyLink(strurl,function(shorturl){
				$('#mwProfile').html('<span class="good">Mafia Wars Profile: </span>'+shorturl);
				mwprofilelink = shorturl;
				write_settings();
				nextGeneralLink();
			},function(){
				$('#mwProfile').html('<span class="good">Mafia Wars Profile: </span>'+strurl);
				mwprofilelink = strurl;
				write_settings();
				nextGeneralLink();
			});
		}
		
		function getTinyEnergyLink(strurl) {
			getTinyLink(strurl,function(shorturl){
				document.getElementById('energy').innerHTML = '<span class="good">Mini Energy Pack: </span>' + shorturl;
				minienergylink = shorturl;
				write_settings();
			},function(){
				document.getElementById('energy').innerHTML = '<span class="good">Mini Energy Pack: </span>'+ strurl;
				minienergylink = strurl;
				write_settings();
				nextGeneralLink();
			});
		}

		function getTinyStash(strurl) {
			var url = 'xw_controller=secretStash&xw_action=view&mwcom=1&type=secret_stash';
			request(url,function(text) {
				if (data = /data\d = (\{.*\});/.exec(text)) {
					var data = jQuery.parseJSON(data[1]);
					var extra_params = '{"rarity":'+data.rarity+',"item_id":'+data.item_id+',"stash_id":'+data.stash_id+'}';
					var strurl = 'xw_controller=requests&xw_action=friend_selector_simple&xw_city=&req_type=simple&req_name=stash_raiders&extra_params='+encodeURIComponent(extra_params)+'&xw_client_id=8&ajax=1&liteload=1&fbml_iframe=1';
					//var name = $(text).find('.stash_item_name:first').html();
					request(strurl,function(text){
						var m;
						if (m=/req-choice url\=\'([^\']+)\'/.exec(text)) {
							getTinyLink(m[1], function(shorturl){
								document.getElementById('secretstash').innerHTML = '<span class="good">Secret Stash: </span>' + shorturl;
								secretstashcookie = shorturl;
								write_settings();
								nextGeneralLink();
							});
						}
					});
				}
				else {
					$('#secretstash').html('No active Secret Stash');
				}
			});
		}
		
		function getTinyBrazilCrew(strurl) {
			request(strurl,function(text){
				var m;
				if (m=/req-choice url\=\'([^\']+)\'/.exec(text)) {
					getTinyLink(m[1], function(shorturl){
						document.getElementById('brazilcrew').innerHTML = '<span class="good">Brazil Crew: </span>' + shorturl;
						brazilcrewlink = shorturl;
//						write_settings();
						nextGeneralLink();
					});
				}
			});
		}
		
		function getMissionCrewLink(){
			var questnum,giftnum,m,found=false;
			$('.task_buttons').each(function(){
				if (m=/showQuestRequestFriendSelector\((\d+),\d,(\d+),\d\)/.exec(this.innerHTML)) {
					giftnum=m[1];
					questnum=m[2];
					if (questnum) {
						found=true;
						request('xw_controller=requests&xw_action=friend_selector&xw_city=7&mwcom=1&req_controller=freegifts&free_gift_id='+giftnum+'&free_gift_cat=1&quest='+questnum+'&task=1&xw_client_id=8&ajax=1&liteload=1&fbml_iframe=1',function(text){
							var m;
							if (m=/req-choice url\=\'([^\']+)\'/.exec(text)) {
								getTinyLink(m[1], function(shorturl){
									document.getElementById('missioncrew').innerHTML = '<span class="good">Mission Crew: </span>' + shorturl;
									missioncrewlink = shorturl;
								});
							}
							nextGeneralLink();
						});
					}
				}
			});
			if (!found) {
				document.getElementById('missioncrew').innerHTML = '<span class="good">Mission Crew: </span>No active Mission found!';
				nextGeneralLink();
			}
		}
	
		function getTinyPromoteLink(strurl) {
			getTinyLink(strurl,function(shorturl){
				document.getElementById('promote').innerHTML = '<span class="good">Promote: </span>' + shorturl;
				promotelink = shorturl;
				write_settings();
				nextGeneralLink();
			},function(){
				document.getElementById('promote').innerHTML = '<span class="good">Promote: </span>'+ strurl;
				promotelink = strurl;
				write_settings();
				nextGeneralLink();
			});
		}
		
		function getWarHelpLink(strurl) {
			getTinyLink(strurl,function(shorturl){
				document.getElementById('warhelp').innerHTML = '<span class="good">War Help: </span>' + shorturl;
				mwwarhelplink = shorturl;
				write_settings();
				nextGeneralLink();
			},function(){
				document.getElementById('warhelp').innerHTML = '<span class="good">War Help: </span>'+ strurl;
				mwwarhelplink = strurl;
				write_settings();
				nextGeneralLink();
			});
		}
		
		function getGiftKey(){
			var giftkeylink = preurl+'xw_controller=gift&xw_action=view&xw_city=1&xw_person='+userid+'&xw_client_id=8';
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
					document.getElementById('giftkey').innerHTML = '<span class="good"><a href="http://www.spockholm.com/mafia/index.php?key='+giftkey+'">Mafia Gift Linker</a> secret key: </span>'+giftkey;
					giftkeycookie = giftkey;
					write_settings();
					nextGeneralLink();
				}
			});
		}
		
		function getNewCrimeSpreeLink(strurl) {
			//var crimespreeurl = 'http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=safehouse&xw_action=safehouse_request&xw_city=1&tmp=&cb=&xw_client_id=8&ajax=1&liteload=1&fbml_iframe=1';
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
					nextGeneralLink();
				}
			});
		}
		function getNewMiniEnergyLink(strurl) {
			//var energyurl = 'http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=index&xw_action=accept_energy_req&xw_city=1&tmp=&cb=&xw_client_id=8&ajax=1&liteload=1&fbml_iframe=1';
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
						document.getElementById('energy').innerHTML = '<span class="good">Energy:</span> ' + longurl;
						minienergylink = longurl;
						write_settings();
					}
					else {
						getTinyEnergyLink(/<fb:req-choice url='([^']+)'/.exec(response)[1]);
					}
					nextGeneralLink();
				}
			});
		}
		
		
		function getTinyCrimeLink(strurl) {
			getTinyLink(strurl,function(shorturl){
				document.getElementById('crimespree').innerHTML = '<span class="good">Crime Spree:</span> ' + shorturl;
				crimespreelink = shorturl;
				write_settings();
				nextGeneralLink();
			});
		}

		$('#'+spocklet+'_close').click(function() {
			$('#spockdiv').remove();
			clearInterval(banner_rotation);
		});
		
		$('#'+spocklet+'_linkodatabase').click(function(){
			var links=$('#tiny_gift_list').val();
			var allinks=links.split("\n");
			var linklist=[]; var namelist=[],m;
			for(var link=0;link<allinks.length;link++) {
				if (m=/^(.*): http:..spockon.me.(.*)$/.exec(allinks[link])) {
					linklist[m[1]]=m[2];
					namelist.push(m[1]);
				}
			}
			if (namelist.length>0) {
				if (User.familyId) {
					sendLinksToDatabase(User.familyId,namelist,linklist);					
				} else {
					requestme('xw_controller=clan&xw_action=view&xw_city=7',function(response){
						var match, famid=0;
						try {
							famid=atob(unescape(/%22%3A%22([a-zA-Z0-9%]+)%22%7D/.exec(response)[1]));
						} catch(noid){}
						if (famid>0) {
							User.familyId=famid;
							sendLinksToDatabase(famid,namelist,linklist);
						} else {
							$('#'+spocklet+'_linkodatabase_result').html("You are not in a family. Please join one to use this feature!").css('color','red');
						}
					});
				}
			} else {
				$('#'+spocklet+'_linkodatabase_result').html("Link-o-database can only work with spockon.me links!");
			}
			return false;
		});

	function sendLinksToDatabase(famid,namelist,linklist){
		$.ajax({
			url:'http://spockon.me/lod/lod-api.php?&r='+Math.random()+'&user=1&family='+famid+'&action=setcats&data='+encodeURIComponent(namelist.join(';')),
			dataType: "jsonp",
			jsonpCallback: 'jsonp'+unix_timestamp()+parseInt(Math.random()*1000),
			success: function(data) {
				var linkstring="";
				for(var i in data) {
					linkstring+=data[i]+':'+linklist[i]+',';
				}
				$.ajax({
					url:'http://spockon.me/lod/lod-api.php?&r='+Math.random()+'&user=1&family='+famid+'&action=postgifts&user='+fbuserid+'&data='+encodeURIComponent(linkstring),
					dataType: "jsonp",
					jsonpCallback: 'jsonp'+unix_timestamp()+parseInt(Math.random()*1000),
					success: function(data) {
						if (data.error) {
							$('#'+spocklet+'_linkodatabase_result').html(data.error).css('color','red');
						} else {
							$('#'+spocklet+'_linkodatabase_result').html(data.added+' links added to database');
							$('#'+spocklet+'_linkodatabase').removeClass('white').addClass('green');
						}
					}
				});
			}
		});		
	}

	function requestme(url, handler, errorhandler) {
		if (url.indexOf('cb=') == -1) {
			url += '&cb='+userid+unix_timestamp();
		}
		if (url.indexOf('tmp=') == -1) {
			url += '&tmp='+unix_timestamp();
		}
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
		
		
		var banner = 0;
		var banner_rotation = setInterval(function(){
			banner++;
			if (banner > banners.length-1) {
				banner = 0;
			}
			$('#'+spocklet+'_banner').html(banners[banner]);
		},5000);
		$('#'+spocklet+'_banner').html(banners[banner]);
		
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
		function camelize(str) {
			return str.toLowerCase().replace(/\b[a-z]/g, cnvrt);
			function cnvrt() {
				return arguments[0].toUpperCase();
			}
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