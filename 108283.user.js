// ==UserScript==
// @name              Facebook-Chat
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @exclude	      *facebook.com/plugins/*
// @require	      http://code.jquery.com/jquery-latest.min.js
// @require	      http://www.hajanet.de/facebox/facebox_new.js
// @version	      2.8
// @author 	Jan Schroeder
// ==/UserScript==
// Copyright: Jan Schroeder!!
// All rights reserved!
// Facebook Chat-Enhancer
// Lets the new Facebook Chat-Bar looks like the old one!
// http://hajanet.de :: hajanet websolutions!
// This one was the first version of the old Chat, so please do not believe the others!
// Stylesheets

$('head').append('<style type="text/css">' +
'.fbChatTypeaheadView{background-color:#F2F4F8!important;bottom:auto!important;top:3px!important;}' +
'.fbChatSidebar{height: 50px!important; top:auto!important;left:15px!important;bottom:0;border-right:0!important;border-left:0!important;}' +
'.fbChatSidebarBody{height: 0px!important;border-right:1px solid rgba(0,0,0,0.4);border-left:1px solid rgba(0,0,0,0.4);}' +
'.fbChatOrderedList .item{display:block;}' +
'.fbChatOrderedList .item.active{display:block;}' +
'.sidebarMode .fbDockWrapper.bb{left:184px!important;}' +
'.fbChatSidebarFooter.uiGrid{border:1px solid rgba(0,0,0,0.4)!important;border-top:1px solid #C9D0DA!important;border-collapse:separate!important;}' +
'.fbChatSidebarFooter{border-right:1px solid rgba(0,0,0,0.4);border-left:1px solid rgba(0,0,0,0.4);}' +
'.sidebarMode #globalContainer{right:0!important;}' +
'.sidebarBtn{display:none!important;}' +
'.fbChatOrderedList .item.idle,.sidebarMode #chatFriendsOnline{display:block!important;}' +
'.fbChatSidebarMessage {border: 1px solid grey;}'+
'.chat .clearfix.offline {display: none;}'+
'.fbNubFlyout .fbDockChatTabFlyout.uiToggleFlyout {height: 400px;}' +
'</style>');

$('head').append('<link rel="stylesheet" type="text/css" href="http://www.hajanet.de/facebox/facebox.css" />');

// Update-Funktion!

var SUC_script_num = 107107; // Change this to the number given to the script by userscripts.org (check the address bar)

try
{
	function updateCheck(forced)
	{
		if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
		{
			try
			{
				GM_xmlhttpRequest(
				{
					method: 'GET',
					url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
					headers: {'Cache-Control': 'no-cache'},
					onload: function(resp)
					{
						var local_version, remote_version, rt, script_name;
						
						rt=resp.responseText;
						GM_setValue('SUC_last_update', new Date().getTime()+'');
						remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
						local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
						if(local_version!=-1)
						{
							script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
							GM_setValue('SUC_target_script_name', script_name);
							if (remote_version > local_version)
							{
								if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?'))
								{
									GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
									GM_setValue('SUC_current_version', remote_version);
								}
							}
							else if (forced)
								alert('No update is available for "'+script_name+'."');
						}
						else
							GM_setValue('SUC_current_version', remote_version+'');
					}
				});
			}
			catch (err)
			{
				if (forced)
					alert('An error occurred while checking for updates:\n'+err);
			}
		}
	}
	GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function()
	{
		updateCheck(true);
	});
	updateCheck(false);
}
catch(err)
{}

// UPDATER ENDE!
function insertIntoBody() {
	var copyright = document.createElement('span');
  	copyright.innerHTML = '<br><br><center><a href="http://www.hajanet.de">Chat Enhancer programmed by hajanet websolutions</a><br><b>Chat Enhancer , Copyright, Jan Schroeder, Dueren 2011!</center></b>';
	document.getElementsByTagName('body')[0].appendChild(copyright);
}

window.addEventListener('load', insertIntoBody, true);

(function(){

    var load_interval       = 100;
    var update_interval     = 2000;
    var load_timer          = setInterval (function() { load(); }, load_interval);
    var update_timer        = setInterval (function() { update(); }, update_interval);

    var list;

    function changeOffline() {
	if ($('.fbChatSidebarMessage').is(':visible')) {
	    $('#numFriends').html('Offline');
	    $('#fbDockChatBuddylistNub').find('.label').text( 'Chat (Offline)' );
            $(".fbChatSidebar").attr('style', 'height: 107px !important');
            $(".fbChatSidebarBody").attr('style', 'height: 0px !important');
        }
    }

    function changeSize(numFriends) {
	if ($('.fbChatSidebarMessage').is(':visible')) {
	    	$('#numFriends').html('Offline');
	    	$('#fbDockChatBuddylistNub').find('.label').text( 'Chat (Offline)' );
            	$(".fbChatSidebar").attr('style', 'height: 107px !important');
            	$(".fbChatSidebarBody").attr('style', 'height: 0px !important');
	    	return true;
        } else {
		var window_height = $(unsafeWindow).height();
		var saved_height = GM_getValue('fbe_chat_height');
		if( saved_height ) {
			saved_height = parseInt(saved_height);
			if( saved_height > (numFriends*32) )
				saved_height = numFriends*32;
			if( saved_height > (window_height-125) )
				saved_height = window_height-125;
			if( saved_height < 200 )
				saved_height = 200;
			if( $(".fbChatSidebar").height() != (saved_height + 50 + 15) ) {
				$(".fbChatSidebar").attr('style', 'height: ' + (saved_height + 50 + 15) +'px !important');
            			$(".fbChatSidebarBody").attr('style', 'height: ' + (saved_height + 15) +'px !important');
			}
		  }  else {
			$(".fbChatSidebar").attr('style', 'height: ' + (500 + 50 + 15) +'px !important');
            		$(".fbChatSidebarBody").attr('style', 'height: ' + (500 + 15) +'px !important');
		  }
		return false;
	}
    }
  
  function changeConversationSize() {
	var window_height = $(unsafeWindow).height();
	var saved_con_height = GM_getValue('fbe_con_size');
	var large_h = parseInt(400);
	if( saved_con_height ) {
		if( large_h > (window_height-125) )
				large_h = window_height-125;
		if( saved_con_height == 2 ) {
			if( $(".fbNubFlyout").height() != (large_h+50) ) {
				$('.fbNubFlyoutBody').css('height', large_h +'px');
				$('.fbNubFlyout').css('height', (large_h+50) + 'px');
			}
		}
	}
    }

 function ProfilLinks() {
        $('.fbNubFlyoutTitlebar').each(function() {
            var chat_window = $(this);
            var menu = chat_window.find('.uiMenuInner');
	    all_link = $(this).find('.uiMenuInner').find('.itemAnchor').attr('href');
	    if (all_link.search('https'))
	    	var new_link = all_link.replace('https://www.facebook.com/messages/', '');
	    else
		var new_link = all_link.replace('http://www.facebook.com/messages/', '');
	    var cuid = new_link;
	    if( !(chat_window.find('.titlebarText').html().indexOf('Profile') >=0) )
	    	chat_window.find('.titlebarText').append('&nbsp;|&nbsp;<a style="color: white;" href="http://www.facebook.com/profile.php?id=' + cuid + '">Profile</a>');
        });
    }

    var fce_version = '2.8';
    function firstload () {
	if( !GM_getValue('fce_firstload') || fce_version != GM_getValue('fce_inst_version')) {
		jQuery.facebox('<center><h3>Hello, and thanks for loading the new Facebook Chat Enhancer!</h3><br>' +
				'<h2>Please add the new FB Chat Enhancer Fanpage!<br><a href="http://www.facebook.com/pages/FB-Chat-Enhancer/196158403772097">Click Here</a>' +
				'<h1 style="color:red">NEW FEATURE:</h1><b>You will find a setting to change the size of the conversation window!<br>You\'ll see a link to the Profile in the conversation header!</b><br><br>' +
				'<span style="font-size:160px;">:)</span><br>You can now adjust the height of the Chatbar yourself!<br>You only have to click the little gear (wheel)' +
 				'on the bottom right inside of the chatbar and then click on "Chat-Settings"!<br>The second thing you will find there, is a point to change the size of the conversation window!<br><br>' +
				'<b>Thanks for supporting me so much! :)</b><br><h1>HAVE FUN!</h1><br><br>' +
				'CHANGELOG:<br>' +
				'2011-07-25 (02:55 PM): Setting to adjust the size of the conversation window, Link to the profile in the conversation header!<br>' +
				'2011-07-26 (12:07 AM): Fixed the Bug, which only shows some people online!<br>'+
				'2011-07-26 (03:53 PM): Fixed a bug, where the chatbar doesnt open!<br><br>' +
				'2011-07-27 (11:53 AM): Fixed \'loading\'-Bug in Applications e.g. Zynga Poker' +
				'<input type="submit" value="close" class="closefirst"></center>' + 
				'<div style="float: left; text-align: left;">&copy; hajanet.de</div>');
		$('.closefirst').bind('click', function() {$.facebox.close();});
		GM_setValue('fce_firstload', true);
		// Set Version GMCookie
		GM_setValue('fce_inst_version', fce_version);
	}
    }

    function load () {
        if (window.navigator.vendor.match(/Google Inc./) || window.navigator.vendor.match(/Google/)) {
            var div = document.createElement("div");
            div.setAttribute("onclick", "return window;");
            unsafeWindow = div.onclick();
        }
        // If the chat has loaded
        if (unsafeWindow.chatDisplay && unsafeWindow.chatDisplay.loaded) {
	    if( GM_getValue('sidestat') == 'true' ) { unsafeWindow.ChatSidebar.enable(); }
	    if( GM_getValue('sidestat') == 'false' ) { unsafeWindow.ChatSidebar.disable(); }
	    unsafeWindow.ChatConfig.set({"sidebar.minimum_width":0});
	    firstload();
	    changeSize(unsafeWindow.AvailableList.getCount());
            var sidebar = $('.fbChatSidebarBody');
            // Hide the default sidebar chat
            sidebar.find('ul').hide();

	    var sideMenu = $('.uiMenuInner');
		sideMenu.append('<li class="uiMenuItem" data-label="Chat-Settings"><div class="seti"><a class="itemAnchor" href="#"><span class="itemLabel fsm">Chat-Settings</span></a></div></li>');
		sideMenu.append('<li class="uiMenuSeparator"></li>');
		sideMenu.append('<li class="uiMenuItem" data-label="FB Chat Enhancer Fanpage"><a  class="itemAnchor" href="http://www.facebook.com/pages/FB-Chat-Enhancer/196158403772097"><span class="itemLabel fsm">FB Chat Enhancer Fanpage</span></a></li>');
		sideMenu.append('<li class="uiMenuItem" data-label="hajanet.de"><a  class="itemAnchor" href="http://www.hajanet.de"><span class="itemLabel fsm">&copy; hajanet.de</span></a></li>');
		sideMenu.append('<li class="uiMenuItem" data-label="FCE v'+fce_version+'"><a  class="itemAnchor" href="http://userscripts.org/scripts/show/107107"><span class="itemLabel fsm">FCE v'+fce_version+'</span></a></li>');

            // Insert the titlebar to the sidebar
            sidebar
                .before(
                    '<div id="closeFBChat" class="bb">' +
                        '<div class="clearfix fbNubFlyoutTitlebar titlebar">' +
                            '<div class="titlebarLabel clearfix">' +
                                '<div class="titlebarTextWrapper"><span class="titlebarText">צ'אט (<span id="numFriends">fixed by jan</span>)</span></div>' +
                            '</div>' +
                        '</div>' +
                    '</div>'
                )
                .prepend(
                    '<ul id="myList" class="fbChatOrderedList"><a class="itemAnchor" href="#"><span class="itemLabel fsm">טוען</span></a></ul>'
                );
                
            // Bind the titlebar to close chat when clicked
            $('#closeFBChat')
                .click(function(){
		    if( unsafeWindow.ChatSidebar.isEnabled() ) {
		    	$('.fbChatSidebar').attr('class', 'fbChatSidebar  hidden_elem');
			$('#fbDockChatBuddylistNub').attr('style', 'display: block; margin-left: -200px;');
			GM_setValue('sidestat', 'false');
		    }
                });
		$('.fbNubButton')
                .click(function(){
		    	$('#fbDockChatBuddylistNub').attr('style', '');
			$('.fbChatSidebar').attr('class', 'fbChatSidebar');
			GM_setValue('sidestat', 'true');
                });

            // Define the new list object
            list = $('#myList');
            clearInterval(load_timer);
        }
    }

    function update() 
    {
        // If the chat has loaded
        if (unsafeWindow.chatDisplay && unsafeWindow.chatDisplay.loaded) {
	    if( !changeSize(unsafeWindow.AvailableList.getCount()) ) {
	    var search = $('.inputsearch');
            var search_field = $('.fbChatSidebarFooter').find('input').last();
        
            var user_string = { 1: "", 2: "" };
            var online = unsafeWindow.AvailableList.getAvailableIDs();
            // Empty friends list
            list.empty();
	    var closedButton = $('#fbDockChatBuddylistNub');
	    closedButton.find('.label').text( 'Chat ('+unsafeWindow.AvailableList.getCount()+')' );
            // Update friends online counter
            $('#numFriends').html(unsafeWindow.AvailableList.getCount());
            // Generate User List
            online_list = {};
            $.each(online, function(index, val) {
                online_list[val] = unsafeWindow.ChatUserInfos[val];
            });
            // Sort List
            var sorted_online_list = [];
            for (var id in online_list)
                sorted_online_list.push([id, unsafeWindow.ChatUserInfos[id].name]);
            sorted_online_list.sort(function(a, b) {return (a[1] < b[1]) ? -1 : 1; })

            // Loop over online IDs and generate list HTML
            $.each(sorted_online_list, function(index, val) {
                var user = unsafeWindow.ChatUserInfos[val[0]];
                var status = unsafeWindow.AvailableList.get(val[0]);
                var classname = (status == 1) ? 'idle' : 'active';
                
                user_string[status] +=  '<li class="item ' + classname + '" uid="' + val[0] + '">' +
						'<a class="clearfix" rel="ignore">' +
                                                '<img class="pic" src="' + user.thumbSrc + '">' +
                                                '<span class="name">' + user.name + '</span>' +
                                                '<i class="status img sp_3xd8gf sx_94f6be"></i>' +
                                            '</a>' +
                                        '</li>';
            });
            
            // Append the list HTML to the list
            list.append(user_string[2] + user_string[1]);
            
            // Bind the items in the list to open the appropriate chat dialog when clicked
            list.find('li')
                .click(function(e){
		    location.href = "javascript:void(chatDisplay._focusTab("+$(this).attr('uid')+"));";
                    return false;
                });

	    changeConversationSize();
	    
            search.keyup(function(){
                    if (search_field.val() != "") 
                        list.hide(); 
                    else 
                        list.show();
                })
                .blur(function(){
                    search.val("");
                    list.show();
                });

	    	$('.seti').bind('click', function() {
			var saved_height = parseInt(GM_getValue('fbe_chat_height'));
			var saved_consize = GM_getValue('fbe_con_size');
			var ichecked = [];
			if( saved_height ) {
				saved_height = parseInt(saved_height);
			} else {
				saved_height = '500';
			}
			if( saved_consize == 2 ) {
				var disp2 = 'checked="checked"';
			} else {
				var disp1 = 'checked="checked"';
			}
			jQuery.facebox('<center><b>Size of the Chatbar (px): <input type="text" id="winsize" value="' + saved_height + '" size="2"><br>Size of the Conversation Window:<br>' +
				'<input type="radio" name="consizchooser" '+disp2+' value="2"/>Large<br><input type="radio" '+disp1+' id="test1" name="consizchooser" value="1"/>Normal' +
				'</b><br><input type="submit" id="test1" class="winsend" value="save"><div class="winreturn"></div>');
	    	});
		$(".winsend").bind('click', function() {
			$(".winreturn").text('saved!');
			GM_setValue('fbe_chat_height', $("#winsize").val());
			GM_setValue('fbe_con_size', parseInt($("input[name='consizchooser']:checked").val()));
			$.facebox.close();
   	 	});
		ProfilLinks();
	    }
        }
    }

})();