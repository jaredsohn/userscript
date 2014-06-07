// ==UserScript==
// @name        Fischer's SC+ Lite
// @namespace   http://roosterteeth.com/FischerX
// @updateURL	https://userscripts.org/scripts/source/457227.meta.js
// @downloadURL	https://userscripts.org/scripts/source/457227.user.js
// @description Adds a few improvements to the sponsor chat.
// @include     http://roosterteeth.com/chat/*
// @include     http://achievementhunter.com/chat/*
// @version     1.2
// @grant       none
// ==/UserScript==

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

var bGreasemonkeyServiceDefined     = false;
try {
    if (typeof Components.interfaces.gmIGreasemonkeyService === "object") {
        bGreasemonkeyServiceDefined = true;
    }
}

catch (err) {
}

if ( typeof unsafeWindow === "undefined"  ||  ! bGreasemonkeyServiceDefined) {
    unsafeWindow    = ( function () {
        var dummyElem   = document.createElement('p');
        dummyElem.setAttribute ('onclick', 'return window;');
        return dummyElem.onclick ();
    } ) ();
}

function FSCP_wait()
{		
	if (
		typeof unsafeWindow.jQuery == 'undefined'
		|| typeof unsafeWindow.chatPush == 'undefined'
		|| typeof unsafeWindow.presenceChannel == 'undefined'
		|| typeof unsafeWindow.meUsername == 'undefined'
		|| typeof unsafeWindow.chatDelay == 'undefined'
	) {
		window.setTimeout(FSCP_wait,100);
	}
	else {
		jQuery = $ = unsafeWindow.jQuery;
		chatPush = unsafeWindow.chatPush;
		presenceChannel = unsafeWindow.presenceChannel;
		meUsername = unsafeWindow.meUsername;
		unsafeWindow.chatDelay = 0;
		FSCP_run();
	}
}
FSCP_wait();

function FSCP_run()
{
$('div#chatUsersBox').prepend(
		'<div class="titleLine">FSC+Lite Is Running</div></a>');
		
	chatPush.bind('pusher:subscription_succeeded', function(){
		// format existing messages
		format_messages();
		
		// try again in a few seconds in case messages weren't ready yet
		setTimeout(function(){format_messages()}, 2000);
	});
	
	    
	chatPush.bind('newChat', function(arr){
		// format new messages
		format_messages();

			// update last message time
			if ($('div.chatMember'+arr.uid).has('div.chatDetails').length) {
				$('div.chatMember'+arr.uid+' div.chatDetails').html(arr.when);
			} else {
				$('div.chatMember'+arr.uid).append('<div class="chatDetails small">'+arr.when+'</div>');
			}

	});
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
		
function format_messages()
{
	
	// strip colors
		$('div.chatMessage').find('span[style^="color"]').contents().unwrap();
		

 //Give @Zack his red fill #FBF3F3
$('div.chatMessageLevel1').css('background-color','#FBF3F3');
		// and a red border for staff, just because

		$('div.chatMessageLevel2').css('border','1px solid #B22222');
		$('div.chatMessageLevel3').css('border','1px solid #B22222');
		$('div.chatMessageLevel4').css('border','1px solid #B22222');
		
		// make @ mentions more noticable (i can barely see the background on my laptop)
		$('div.chatReplyToMe').css('border','1px solid #94C7F9');
		
		// also highlight messages containing my username that don't have an @
		$('div.individualChatMessage ').has('div.chatMessage:Contains('+meUsername+')').css('border','1px solid #94C7F9').addClass('chatReplyToMe');
	
		$('div.individualChatMessage ').has('div.chatUser:Contains("MadsNielsen")').remove();
        $('div.individualChatMessage ').has('div.chatUser:Contains("Sinof1000")').remove();
	}
	}
	