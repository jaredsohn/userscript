// ==UserScript==
// @name           Toggle OKCupid Anonymous Button
// @namespace      http://userscripts.org/users/42648
// @description    Adds a widget to okcupid.com/* pages for you to view and change your current "browse anonymously" setting.
// @include        http://www.okcupid.com/*
// @exclude		   http://www.okcupid.com/settings*
// @require        http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

GM_addStyle(
	'#anonalert_wrapper {'+
		'position:fixed;'+
		'top:5px;'+
		'left:5px;'+
		'z-index:1000;'+
	'}'+

	'#anonalert_div {'+
		'text-align:center;'+
		'font-size:15px;'+
		'color:black;'+
		'background-color:white;'+
		'padding:15px;'+
		'border-radius:5px;'+
		'border:2px solid black;'+
	'}'+
	
	'#anonalert_switchBtn {'+
		'position: absolute;'+
		'z-index: 1001;'+
		'left: 64px;'+
	'}'+
	
	'#anonalert_arrow {'+
		'position: absolute;'+
		'background-color: gray;'+
		'width: 100%;'+
		'height: 100%;'+
		'top: 0px;'+
		'left: 0px;'+
		'opacity: 0.6;'+
		'color:white;'+
		'cursor:pointer;'+
		'border-radius:5px;'+
	'}'+
	
	'#anonalert_arrow #hide_arrow {'+
		'margin-top:10px;'+
		'font-size: 135px;'+
	'}'+
	
	'#show_arrow {'+
		'position: absolute;'+
		'right: 4px;'+
		'font-size: 14px;'+
		'top: 5px;'+
	'}'+
	
	'#anonalert_small_switchBtn {'+
		'position: absolute;'+
		'padding: 0px 0px;'+
		'font-size: 10px;'+
	'}'
);

red   = '#DE2828';
green = '#5EB33D';
ajaxLoaderURL = 'http://upload.wikimedia.org/wikipedia/commons/d/de/Ajax-loader.gif';

$('body').append('<div id="anonalert_wrapper"><div id="anonalert_div"><img src="'+ ajaxLoaderURL +'" /><br />Getting anonymous status...</div></div>');


build_anon_message();


function build_anon_message() {
	GM_xmlhttpRequest({
		method: 'GET', 
		url: 'http://www.okcupid.com/settings', 
		onload: function(response) {
			warningColor = $('#browse_anon', response.responseText).is(':checked') ? green : red;
			
			$('#anonalert_div')
				.html('You are currently<br />'+ ( warningColor == green ? '' : 'NOT<br />' ) +'browsing anonymously.<div id="anonalert_arrow" style="display:none;" title="Minimize"><div id="hide_arrow">&larr;</div></div>')
				.css({'background-color':warningColor,'padding-bottom':'50px'})
				.mouseover(function() { $('#anonalert_arrow').show(); })
				.mouseout(function() { $('#anonalert_arrow').hide(); });
			
			$('#anonalert_wrapper').append('<button id="anonalert_switchBtn">SWITCH</button>').children('#anonalert_switchBtn')
				.click(function() { switch_anon_browsing(); }) //onClick won't work
				.css('top',( warningColor == green ? 70 : 85 ) +'px'); 
				
			$('#anonalert_arrow').click(function() { 
				if ( $('#anonalert_wrapper').css('left') == '5px' ) { //clicking to hide the widget
					$('#anonalert_wrapper').animate({'left':'-193px'},250, function(){
						$('#anonalert_arrow').append('<div id="show_arrow">&#9658;</div>').children('#show_arrow')
							.css('top',( warningColor == green ? 38 : 45 ) +'px');
						
						$('#anonalert_wrapper').append('<button id="anonalert_small_switchBtn" title="SWITCH">S</button>')
						.children('#anonalert_small_switchBtn')
						.css('top',$('#anonalert_switchBtn').css('top'))
						.animate({'right':'4px'}, 500)
						.click(function() {
							switch_anon_browsing();
						});
					});
					$('#anonalert_arrow').attr('title','Restore');
					GM_setValue('hidden',1);
				} else { //clicking to show the widget
					$('#show_arrow, #anonalert_small_switchBtn').remove();
					$('#anonalert_wrapper').animate({'left':'5px'},250);
					$('#anonalert_arrow').attr('title','Minimize');
					GM_setValue('hidden',0);
				}
			});
			
			if ( GM_getValue('hidden') == 1 && $('#anonalert_wrapper').css('left') == '5px' ) 
				setTimeout( function() { $('#anonalert_arrow').click(); }, 500 );
		}
	});
}

function switch_anon_browsing() {
	//The fastest way to do this is to send a query string to okcupid.com/settings but if you only send one name/value pair it disables all other settings so we have to scrape the user's current settings.
	
	$('#anonalert_wrapper').animate({'left':'5px'},250);
	$('#anonalert_wrapper').html('<div id="anonalert_div" style="left:5px;"><img src="'+ ajaxLoaderURL +'" /><br />Getting anonymous status...</div>');
	
	GM_xmlhttpRequest({
		method: 'GET', 
		url: 'http://www.okcupid.com/settings', 
		onload: function(response) {
			qString  = 'http://www.okcupid.com/settings?general=1&submitbutton=1&email_pri=';
			qString += escape( $('#email_pri', response.responseText).val() );
			qString += '&wikiprofileprivacy='+ $('#wiki_privacy').val(); //This is probably going to change very soon
			
			$('#general_settings input[type=checkbox]', response.responseText).each(function() {
				if ( $(this).is(':checked') && $(this).attr('id') != 'browse_anon' ) qString += '&'+ $(this).attr('name') +'='+ $(this).val();
			});
			
			if ( $('#browse_anon:checked', response.responseText).length == 0 ) qString += '&browseprofilesanonymously=1';
			
			GM_xmlhttpRequest({
				method: 'GET', 
				url: qString, 
				onload: function() { 
					build_anon_message(); 
				}
			});
		}
	});
}