// ==UserScript==
// @name        RoosterTeeth Sponsor Chat Enhanced
// @namespace   http://roosterteeth.com/Samutz
// @description Adds a few improvements to the sponsor chat.
// @include     http://roosterteeth.com/chat/*
// @include     http://achievementhunter.com/chat/*
// @version     1.1
// @grant       none
// ==/UserScript==

var RTSCE_Settings = {
	'RTSCE_LightboxImages': 0,
	'RTSCE_EmbedYoutube': 0,
	'RTSCE_StripColors': 0,
	'RTSCE_HoverSpoiler': 0,
	'RTSCE_BetterMentions': 0,
	'RTSCE_LastMessage': 0
};

function addScript(url){
    var s = document.createElement('script');
    s.src = url;
    s.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(s);
}
function addStyleSheet(url){
    var s = document.createElement('link');
    s.href = url;
	s.rel = 'stylesheet';
    s.type = 'text/css';
	s.media = 'screen';
    document.getElementsByTagName('head')[0].appendChild(s);
}

// RT already loads jQuery 1.6
// addScript('http://code.jquery.com/jquery.min.js');

// Lightbox for images
addScript('http://samutz.com/greasemonkey/RTSCE/jquery.lightbox-0.5.min.js');
addStyleSheet('http://samutz.com/greasemonkey/RTSCE/jquery.lightbox-0.5.css');

// cross-browser unsafeWindow
var bGreasemonkeyServiceDefined     = false;
try {
    if (typeof Components.interfaces.gmIGreasemonkeyService === "object") {
        bGreasemonkeyServiceDefined = true;
    }
}
catch (err) {
    //Ignore.
}
if ( typeof unsafeWindow === "undefined"  ||  ! bGreasemonkeyServiceDefined) {
    unsafeWindow    = ( function () {
        var dummyElem   = document.createElement('p');
        dummyElem.setAttribute ('onclick', 'return window;');
        return dummyElem.onclick ();
    } ) ();
}


// wait for jQuery and the Pusher subscription load
function RTSCE_wait()
{		
	// check for things already on page that we want to use
	if (
		typeof unsafeWindow.jQuery == 'undefined'
		|| typeof unsafeWindow.chatPush == 'undefined'
		|| typeof unsafeWindow.presenceChannel == 'undefined'
		|| typeof unsafeWindow.meUsername == 'undefined'
		|| typeof unsafeWindow.chatDelay == 'undefined'
	) {
		window.setTimeout(RTSCE_wait,100);
	}
	else {
		jQuery = $ = unsafeWindow.jQuery;
		chatPush = unsafeWindow.chatPush;
		presenceChannel = unsafeWindow.presenceChannel;
		meUsername = unsafeWindow.meUsername;
		unsafeWindow.chatDelay = 0;
		RTSCE_run();
	}
}
RTSCE_wait();

// let's jQuery!
function RTSCE_run()
{
	// settings
	$('div#chatUsersBox').prepend(
		'<a href="javascript:;" id="chatRTSCEToggleSettings"><div class="titleLine">RTSCE Settings</div></a>'
		+ '<div id="chatRTSCESettings">'
			+ '<input type="checkbox" style="width:auto;" id="RTSCE_LightboxImages"> <label for="RTSCE_LightboxImages">Lightbox Images</label><br/>'
			+ '<input type="checkbox" style="width:auto;" id="RTSCE_EmbedYoutube"> <label for="RTSCE_EmbedYoutube">Embed Youtube Links</label><br/>'
			+ '<input type="checkbox" style="width:auto;" id="RTSCE_StripColors"> <label for="RTSCE_StripColors">Strip Colors</label><br/>'
			+ '<input type="checkbox" style="width:auto;" id="RTSCE_HoverSpoiler"> <label for="RTSCE_HoverSpoiler">Hover Spoiler</label><br/>'
			+ '<input type="checkbox" style="width:auto;" id="RTSCE_BetterMentions"> <label for="RTSCE_BetterMentions">Better Mentions</label><br/>'
			+ '<input type="checkbox" style="width:auto;" id="RTSCE_LastMessage"> <label for="RTSCE_LastMessage">Last Message Time</label><br/>'
			+ '<br/>'
			+ '<a href="javascript:;" id="chatRTSCESaveSettings">Save & Reload</a> &middot; <a href="javascript:;" id="chatRTSCECancelSettings" class="lightMain">Cancel</a><br/>'
			+ '<br/>'
		+ '</div>'
	);
	
	$('div#chatRTSCESettings').hide();
	
	$('a#chatRTSCEToggleSettings').click(function(){
		if ($('div#chatRTSCESettings').is(':visible')) {
			$('div#chatRTSCESettings').slideUp('fast');
			reload_settings();
		} else {
			$('div#chatRTSCESettings').slideDown('fast');
		}
	});
	
	$('a#chatRTSCECancelSettings').click(function(){
		$('div#chatRTSCESettings').slideUp('fast');
		reload_settings();
	});
	
	$('a#chatRTSCESaveSettings').click(function(){
		var date = new Date();
		date.setTime(date.getTime()+(24*60*60*365));
		var expires = date.toGMTString();
		
		for (var setting in RTSCE_Settings) {
			if ($('input#'+setting).is(':checked')) {
				document.cookie = setting+'=1; expires='+expires+'; path=/; domain=.'+document.domain;
			} else {
				document.cookie = setting+'=0; expires=0; path=/; domain=.'+document.domain;
			}
		}
		
		window.location.reload();
	});
	
	reload_settings();
	
	// case insensitive version of :contains
	jQuery.expr[':'].Contains = function(a, i, m) { 
		return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0; 
	};
	
	chatPush.bind('pusher:subscription_succeeded', function(){
		// format existing messages
		format_messages();
		
		// try again in a few seconds in case messages weren't ready yet
		setTimeout(function(){format_messages()}, 2000);
	});

	chatPush.bind('newChat', function(arr){
		// format new messages
		format_messages();
		
		if (RTSCE_Settings['RTSCE_LastMessage']==1) {
			// update last message time
			if ($('div.chatMember'+arr.uid).has('div.chatDetails').length) {
				$('div.chatMember'+arr.uid+' div.chatDetails').html(arr.when);
			} else {
				$('div.chatMember'+arr.uid).append('<div class="chatDetails small">'+arr.when+'</div>');
			}
		}
	});
	
	if (RTSCE_Settings['RTSCE_LastMessage']==1) {
		// get last message time directly from existing messages when joining chat
		presenceChannel.bind('pusher:subscription_succeeded', function(){
			var members = presenceChannel.members;

			members.each(function(member) {
				var member_id = member.info['id'];
				if ($('div.chatFrom'+member_id).has('span.updateWhen').length) {
					var when = $('div.chatFrom'+member_id+' span.updateWhen').wrap('<p/>').html();
					$('div.chatFrom'+member_id+' span.updateWhen').unwrap();
					if ($('div.chatMember'+member_id).has('div.chatDetails').length) {
						$('div.chatMember'+member_id+' div.chatDetails').html(when);
					} else {
						$('div.chatMember'+member_id).append('<div class="chatDetails small">'+when+'</div>');
					}
				}
			});
		});
	}
}

function reload_settings()
{
	for (var setting in RTSCE_Settings) {
		if (getCookie(setting) == '1') {
			RTSCE_Settings[setting] = 1;
			$('input#'+setting).prop('checked', true);
		} else {
			RTSCE_Settings[setting] = 0;
			$('input#'+setting).prop('checked', false);
		}
	}
}

function format_messages()
{
	// lightbox for images
	if (RTSCE_Settings['RTSCE_LightboxImages']==1) {
		$('div.chatMessage a').has('img').lightBox();
	}

	if (RTSCE_Settings['RTSCE_EmbedYoutube']==1) {
		// embed youtube videos
		$('div.chatMessage a[href^="http://www.youtube.com/watch"],'
			+'div.chatMessage a[href^="http://youtu.be/"],'
			+'div.chatMessage a[href^="https://www.youtube.com/watch"],'
			+'div.chatMessage a[href^="https://youtu.be/"]'
		).click(function(e){
			e.preventDefault();
			ytid = get_youtube_id(this.href);
			
			$('div#chatUserEmbed').remove();
			$('div#chatHolder').prepend('<div id="chatUserEmbed"><iframe width="854" height="510" src="http://www.youtube.com/embed/'+ytid+'?autoplay=1" frameborder="0" allowfullscreen autoplay><\/iframe><div style="text-align:right"><a href="javascript:;" id="chatCloseUserEmbed">Close Video</a></div></div>');
			$('a#chatCloseUserEmbed').click(function(){
				$('div#chatUserEmbed').remove();
			});
		});
		
		// color youtube links
		$('div.chatMessage a[href^="http://www.youtube.com/watch"],'
			+'div.chatMessage a[href^="http://youtu.be/"],'
			+'div.chatMessage a[href^="https://www.youtube.com/watch"],'
			+'div.chatMessage a[href^="https://youtu.be/"]'
		).addClass('lightMain');
	}
	
	// strip colors
	if (RTSCE_Settings['RTSCE_StripColors']==1) {
		$('div.chatMessage').find('span[style^="color"]').contents().unwrap();
	}
	
	// show spoiler on hover
	if (RTSCE_Settings['RTSCE_HoverSpoiler']==1) {
		$('span[style^="background-color"]').hover(function(){
			$(this).css('color','black');
		},function(){
			$(this).css('color','#DDDDDD');
		});
	}
	
	
	if (RTSCE_Settings['RTSCE_BetterMentions']==1) {
		// and a red border for staff, just because
		$('div.chatMessageLevel1').css('border','1px solid #B22222');
		$('div.chatMessageLevel2').css('border','1px solid #B22222');
		$('div.chatMessageLevel3').css('border','1px solid #B22222');
		$('div.chatMessageLevel4').css('border','1px solid #B22222');
		
		// make @ mentions more noticable (i can barely see the background on my laptop)
		$('div.chatReplyToMe').css('border','1px solid #94C7F9');
		
		// also highlight messages containing my username that don't have an @
		$('div.individualChatMessage ').has('div.chatMessage:Contains('+meUsername+')').css('border','1px solid #94C7F9').addClass('chatReplyToMe');
	}
}

function get_youtube_id (url)
{
	var myregexp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
	var videoID = url.match(myregexp)[1];
	return videoID;
}


function getCookie(c_name)
{
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++) {
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name) {
			return unescape(y);
		}
	}
}