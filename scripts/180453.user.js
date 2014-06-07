// ==UserScript==
// @name        RemoteControl XS4ALL WebTV
// @description Adds a "remote control" to XS4ALL WebTV so you can choose your channel using the numeric keypad. It adds small numbers to the stationlist at the botton, which you can directly input to jump to this station. Hitting numeric *, it will display an alternative guide of all the channels and their currently playing program. It also adds the numeric plus to surf channels, so now both the numeric + and - work.
// @namespace   http://userscripts.org/users/nlsurfman
// @include     https://webtv.xs4all.nl/*
// @version     1.1
// ==/UserScript==

var STARTUP_DELAY = 1000;
var CHANGE_CHANNEL_DELAY = 1000;
var OSD_HIDE_DELAY = 2000;
var OSD_FADE_SPEED = 250;

var $ = unsafeWindow.jQuery;
var osdInput = '';
var osdTimer;

var myChannels = new Array();

$().ready( function () {
	$('body').append('<style>#osdNumber, #osdName {color:#00FF00; font-size: 110px; position: absolute; top: 0; font-family: Arial, sans-serif; display:none; z-index:10; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black}"></style>');
	$('body').append('<style>.osdNumberMini {color: #00FF00; font-size: 8px;}</style>');
	$('body').append('<style>#osdOverview { display:none; background-color: #000000; padding: 10px; height: 80%;  left: 50%;  margin-left: -200px;  opacity: 0.8;  overflow-y: scroll;  position: absolute;  top: 40px;  width: 400px;  z-index: 10;}</style>');
	$('body').append('<style>#osdOverview ul li { margin-bottom: 5px; }</style>');
	$('body').append('<style>#osdOverview ul li a:hover, #osdOverview ul li a.current { color: #0F0 }</style>');
	$('body').append('<style>.overview-now { color: #CCC; font-size: 14px; font-style: italic; }</style>');
	$('body').append('<div id="osdNumber" style="right: 0;"></div>');
	$('body').append('<div id="osdName" style="left: 0;"></div>');
	$('body').append('<div id="osdOverview"><ul></ul></div>');
	
	setTimeout( function() {
		var osd = 1;
		for ( var channel in unsafeWindow.wtv.channels ) {
			myChannels[osd] = unsafeWindow.wtv.channels[channel];
			
			var link = $('<a/>', {
					text: osd + '  ' + myChannels[osd].name,
					href: '#'
				});
			link.attr('data-channel-id', myChannels[osd].id);
			link.attr('data-channel-num', osd);
			
			link.click(function() {
				osdInput = $(this).attr('data-channel-num');
				updateOSD();
				changeChannel();
			});

			var li = $('<li>');
			link.appendTo(li);
			li.append('<div class="overview-now"></div>');
			li.appendTo('#osdOverview ul');
						
			osd++;
		}
		
		$('#osdOverview').blur( function() {
				hideOverview();
			}
		);
		
		$('#channellist li').each( function(index) {
			$(this).prepend('<div class="osdNumberMini">' + (index + 1) + '</div');
		});
		
		
		
	}, STARTUP_DELAY);

	
	$(window).bind( 'keydown', function( event) {
		if ( event.which == 107 ) {
			//add numeric plus for channel surfing
			unsafeWindow.playNextChannel();
		}
		else if ( event.which == 106 ) {
			showOverview();
		}
	    else if( event.which >= 48 && event.which <= 57 || event.which >= 96 && event.which <= 105 ) {
			clearTimeout(osdTimer);
			
			var input = '';
			if( event.which >= 48 && event.which <= 57) {
				input = event.which - 48;
			}
			else if ( event.which >= 96 && event.which <= 105 ){
				input = event.which - 96;
			}

			if ( osdInput.length < 2) {
				osdInput  += '' + input;
				updateOSD();
				
				osdTimer = setTimeout( function() {
					changeChannel();
				}, CHANGE_CHANNEL_DELAY);
			}
		}
		else if (  event.which == 13 ) {
			changeChannel();
			event.preventDefault();
		}
	});
});

function updateOSD() {
	var $n = $('#osdNumber');
	$n.html(osdInput);
	if ( osdInput != '' ) {
		$n.fadeIn( OSD_FADE_SPEED );
	}
	else {
		setTimeout( function() {
			$n.fadeOut( OSD_FADE_SPEED );
		}, OSD_HIDE_DELAY);
	}
}

function changeChannel() {
	clearTimeout(osdTimer);
	if ( myChannels[osdInput]) {
		hideOverview();
		var channel = myChannels[osdInput]
		$n = $('#osdName');
		$n.html( channel.name);
		$n.fadeIn(OSD_FADE_SPEED);

		unsafeWindow.playChannel( channel.id );
		
		setTimeout( function() {
			$n.fadeOut(OSD_FADE_SPEED);
		}, OSD_HIDE_DELAY);
	}
	
	osdInput = '';
	updateOSD();
}

function showOverview() {
	var o = $('#osdOverview');
	o.fadeIn(OSD_FADE_SPEED, function() {
		var currentChannel = unsafeWindow.wtv.now_playing.id;
		var $a = o.find('ul li a');
		$a.each( function() {
			var channel = $(this).attr('data-channel-id');
			var program = unsafeWindow.guideGetProgram( unsafeWindow.epgIdForChannelId( channel));
			if ( typeof program !== 'undefined') {
				$(this).parent().find('div').html(program.title);
			}

		});
		$a.removeClass('current');
		$a.filter( "[data-channel-id='" + currentChannel + "']").addClass('current');

	});
	o.focus();
}

function hideOverview() {
	$('#osdOverview').fadeOut(OSD_FADE_SPEED);
}