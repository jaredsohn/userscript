// ==UserScript==
// @name           Facebook-Chat-Napsterzing
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @exclude	      *facebook.com/plugins/*
// @require	    http://code.jquery.com/jquery-latest.min.js
// @require	    http://www.hajanet.de/facebox/facebox_new.js
// @author 	Napsterzing
// ==/UserScript==
// Copyright: Napsterzing
// All rights reserved!
// Facebook Chat-Enhancer
// Lets the new Facebook Chat-Bar looks like the old one!
// http://www.napsterzing.co.cc :: www.napsterzing.co.cc!
// This one was the first version of the old Chat, so please do not believe the others!
// Stylesheets

$('head').append('<style type="text/css">' +
'.fbChatTypeaheadView{background-color:#F2F4F8!important;bottom:auto!important;top:3px!important;}' +
'.fbChatSidebar{height: 50px!important; top:auto!important;right:15px!important;bottom:0;border-left:0!important;border-right:0!important;}' +
'.fbChatSidebarBody{height: 0px!important;border-left:1px solid rgba(0,0,0,0.4);border-right:1px solid rgba(0,0,0,0.4);}' +
'.fbChatOrderedList .item{display:none;}' +
'.fbChatOrderedList .item.active{display:block;}' +
'.sidebarMode .fbDockWrapper.bb{right:184px!important;}' +
'.fbChatSidebarFooter.uiGrid{border:1px solid rgba(0,0,0,0.4)!important;border-top:1px solid #C9D0DA!important;border-collapse:separate!important;}' +
'.fbChatSidebarFooter{border-left:1px solid rgba(0,0,0,0.4);border-right:1px solid rgba(0,0,0,0.4);}' +
'.sidebarMode #globalContainer{left:0!important;}' +
'.sidebarBtn{display:none!important;}' +
'.fbChatOrderedList .item.idle,.sidebarMode #chatFriendsOnline{display:block!important;}' +
'.fbChatSidebarMessage {border: 1px solid grey;}'+
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
  	copyright.innerHTML = '<br><br><center><a href="http://www.napsterzing.co.cc">Chat Enhancer</a><br><b>Chat Enhancer</center></b>';
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
            	(".fbChatSidebar").attr('style', 'height: 107px !important');
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

/*    function ProfilLinks() {
        $('.fbNubFlyoutTitlebar').each(function() {
            
            if (chat_window.find('.uiMenuInner').children().eq(0).attr('data-label') != "Prof") 
            {
                var all_link = $(this).find('.uiMenuInner').find('.itemAnchor').attr('href');
                var profil_id = all_link.replace('https://www.facebook.com/messages/','');
		var profil_id = all_link.replace('http://www.facebook.com/messages/','');
                $(this).find('.uiMenuInner')
                    .prepend(
                        '<li class="uiMenuItem " data-label="Profil anzeigen">' + 
                            '<a class="itemAnchor" rel="ignore" href="http://www.facebook.com/profile.php?id=' + profil_id + '" tabindex="0" role="menuitem">' +
                                '<span class="itemLabel fsm">Profil anzeigen</span>' +
                            '</a>' +
                        '</li>'
                    );
            }
        });
    } 

*/
    function firstload () {
	if( !GM_getValue('fce_firstload') ) {
		jQuery.facebox('<center><h3>Hello, and thanks for loading the new Facebook Chat Enhancer!</h3><span style="font-size:160px;">:)</span><br>You can now adjust the height of the Chatbar yourself!<br>You only have to click the little gear (wheel)' +
 				'on the bottom left inside of the chatbar and then click on "Chat-Settings"!<br><br><b>Thanks for supporting me so much! :)</b><br><h1>HAVE FUN!</h1><br><input type="submit" value="close" class="closefirst"></center>' + 
				'<div style="float: right; text-align: right;">&copy; www.napsterzing.co.cc</div>');
		$('.closefirst').bind('click', function() {$.facebox.close();});
		GM_setValue('fce_firstload', true);
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
	    firstload();
	    changeSize(unsafeWindow.AvailableList.getCount());
            var sidebar = $('.fbChatSidebarBody');
            // Hide the default sidebar chat
            sidebar.find('ul').hide();

	    var sideMenu = $('.uiMenuInner');
		sideMenu.append('<li class="uiMenuItem" data-label="Chat-Settings"><div class="seti"><a class="itemAnchor" href="#"><span class="itemLabel fsm">Chat-Settings</span></a></div></li>');
		sideMenu.append('<li class="uiMenuSeparator"></li>');
		sideMenu.append('<li class="uiMenuItem" data-label="www.napsterzing.co.cc"><a  class="itemAnchor" href="http://www.napsterzing.co.cc"><span class="itemLabel fsm">&copy; www.napsterzing.co.cc</span></a></li>');

            // Insert the titlebar to the sidebar
            sidebar
                .before(
                    '<div id="closeFBChat" class="bb">' +
                        '<div class="clearfix fbNubFlyoutTitlebar titlebar">' +
                            '<div class="titlebarLabel clearfix">' +
                                '<div class="titlebarTextWrapper"><span class="titlebarText">Chat (<span id="numFriends">Napsterzing</span>)</span></div>' +
                            '</div>' +
                        '</div>' +
                    '</div>'
                )
                .prepend(
                    '<ul id="myList" class="fbChatOrderedList"><a class="itemAnchor" href="#"><span class="itemLabel fsm">Loading</span></a></ul>'
                );
                
            // Bind the titlebar to close chat when clicked
            $('#closeFBChat')
                .click(function(){
                    unsafeWindow.ChatSidebar.toggle();
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
			var saved_height = GM_getValue('fbe_chat_height');
			if( saved_height ) {
				saved_height = parseInt(saved_height);
				$(".fbChatSidebar").attr('style', 'height: ' + (saved_height + 50 + 15) +'px !important');
            			$(".fbChatSidebarBody").attr('style', 'height: ' + (saved_height + 15) +'px !important');
			} else {
				saved_height = '';
			}
			jQuery.facebox('<b>Size of the Chatbar (px): <input type="text" id="winsize" value="' + saved_height + '" size="2"></b><br><center><input type="submit" class="winsend" value="save"><div class="winreturn"></div>');
	    	});
		$("#winsize").bind('change', function() {
			$(".winreturn").text('saved!');
			GM_setValue('fbe_chat_height', $("#winsize").val());
			$.facebox.close();
   	 	});
	    }
        }
    }

})();