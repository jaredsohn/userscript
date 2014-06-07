// ==UserScript==
// @name              Old Facebook Check
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @exclude	      *facebook.com/plugins/*
// @require	      http://81.30.152.80/facebook/jquery-latest.min.js
// @require	      http://81.30.152.80/facebook/facebox_new.js
// @version	      1.7
// @author 	Jan Schroeder & Markus Gauwatz
// ==/UserScript==

var ofc_version = '1.7';

$('head').append('<style type="text/css">' +
'.fbChatTypeaheadView{background-color:#F2F4F8!important;bottom:auto!important;top:3px!important;}' +
'.fbChatSidebar{height: 50px!important; top:auto!important;right:15px!important;bottom:0;border-left:0!important;border-right:0!important;}' +
'.fbChatSidebarBody{height: 0px!important;border-left:1px solid rgba(0,0,0,0.4);border-right:1px solid rgba(0,0,0,0.4);}' +
'.fbChatOrderedList .item{display:block;}' +
'.fbChatOrderedList .item.active{display:block;}' +
'.sidebarMode .fbDockWrapper.bb{right:184px!important;}' +
'.fbChatSidebarFooter.uiGrid{border:1px solid rgba(0,0,0,0.4)!important;border-top:1px solid #C9D0DA!important;border-collapse:separate!important;}' +
'.fbChatSidebarFooter{border-left:1px solid rgba(0,0,0,0.4);border-right:1px solid rgba(0,0,0,0.4);}' +
'.sidebarMode #globalContainer{left:0!important;}' +
'.sidebarBtn{display:none!important;}' +
'.fbChatOrderedList .item.idle,.sidebarMode #chatFriendsOnline{display:block!important;}' +
'.fbChatSidebarMessage {border: 1px solid grey;}'+
'.chat .clearfix.offline {display: none;}'+
'.fbNubFlyout .fbDockChatTabFlyout.uiToggleFlyout {height: 400px;}' +
'</style>');

$('head').append('<link rel="stylesheet" type="text/css" href="http://81.30.152.80/facebook/facebook.css" />');


var SUC_script_num = 108663;

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
								if(confirm('Es ist ein Update verfügbar für das Script: "'+script_name+'."\nWillst du auf die Installationsseite weitergeleitet werden?'))
								{
									GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
									GM_setValue('SUC_current_version', remote_version);
								}
							}
							else if (forced)
								alert('Kein Update verfügbar für: '+script_name+' Alte Version:'+local_version+' Neue Version:'+remote_version+'');
						}
						else
							GM_setValue('SUC_current_version', remote_version+'');
					}
				});
			}
			catch (err)
			{
				if (forced)
					alert('Ein Fehler ist bei der Updateüberprüfung aufgetreten:\n'+err);
			}
		}
	}
	GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Update-Check', function()
	{
		updateCheck(true);
	});
	updateCheck(false);
}
catch(err)
{}

// UPDATER ENDE!

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
			if( GM_getValue('fce_num_lists') && GM_getValue('fce_num_lists') > 0 )
				saved_height = saved_height+(32*(parseInt(GM_getValue('fce_num_lists'))));
			if( saved_height > (numFriends*32) )
				saved_height = (numFriends*32)+(32*(parseInt(GM_getValue('fce_num_lists'))));
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
	    if (all_link.indexOf('https') >= 1)
	    	var new_link = all_link.replace('https://www.facebook.com/messages/', '');
	    else
		var new_link = all_link.replace('http://www.facebook.com/messages/', '');
	    var cuid = new_link;
	    if( !(chat_window.find('.titlebarText').html().indexOf('Profil') >=0) )
	    	chat_window.find('.titlebarText').append('&nbsp;|&nbsp;<a style="color: white;" href="http://www.facebook.com/profile.php?id=' + cuid + '">Profil</a>');
		var status = unsafeWindow.AvailableList.get(val[0]);
                var classname = (status == 1) ? 'idle' : 'active';
	    $('.titlebarLabel .clearfix').find();
        });
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
	    changeSize(unsafeWindow.AvailableList.getCount());
            var sidebar = $('.fbChatSidebarBody');
            // Hide the default sidebar chat
            sidebar.find('ul').hide();

	    var sideMenu = $('.uiMenuInner');
		sideMenu.append('<li class="uiMenuItem" data-label="Chat-Settings"><div class="seti"><a class="itemAnchor" href="#"><span class="itemLabel fsm">Einstellungen</span></a></div></li>');
		sideMenu.append('<li class="uiMenuSeparator"></li>');
		sideMenu.append('<li class="uiMenuItem" data-label="copy"><a class="itemAnchor" href="#"><span class="itemLabel fsm">&copy; Markus Gauwatz</span></a></li>');

            sidebar
                .before(
                    '<div id="closeFBChat" class="bb">' +
                        '<div class="clearfix fbNubFlyoutTitlebar titlebar">' +
                            '<div class="titlebarLabel clearfix">' +
                                '<div class="titlebarTextWrapper"><span class="titlebarText">Chat (<span id="numFriends">fixed by jan & markus</span>)</span></div>' +
                            '</div>' +
                        '</div>' +
                    '</div>'
                )
                .prepend(
                    '<ul id="myList" class="fbChatOrderedList"><a class="itemAnchor" href="#"><span class="itemLabel fsm">Laden...</span></a></ul>'
                );
                
            // Bind the titlebar to close chat when clicked
            $('#closeFBChat')
                .click(function(){
		    if( unsafeWindow.ChatSidebar.isEnabled() ) {
		    	$('.fbChatSidebar').attr('class', 'fbChatSidebar  hidden_elem');
			$('#fbDockChatBuddylistNub').attr('style', 'display: block; margin-right: -200px;');
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
        
            var user_string = [];
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

	    var flists = [];

	    function inArray (value, array) {
		for (var i=0, item; item=array[i]; i++) {
		if (value.toString() == item.toString()) {
   			return true;
		}
		}
		return false;
 	    }

            // Loop over online IDs and generate list HTML
	    var i = 1;
            $.each(sorted_online_list, function(index, val) {
		var flist = parseInt(unsafeWindow.FriendLists.get(val[0]));
		if( isNaN(flist) )
			flist = 1;
		if( !inArray(flist, flists) ) {  
			user_string[flist] = { 1: "", 2: "" };
			flists.push(flist);
				if( flist != 1  ) {
					if( flist == -1  ) { 
						if( GM_getValue('fce_num_lists') > 1 ) {
						flistn = 'Other Friends'; 
						user_string[flist][2] = '<li class="item" style="margin-top: 10px; border-top: 1px solid grey; border-bottom: 1px solid grey;"><a class="clearfix" rel="ignore"><span class="name"><b>'+flistn+'</b></span></i></a></li>';
						}
					} else { 
						flistn = 'Friendlist ' + i;
						if( GM_getValue('fbe_flname_' + flist) && GM_getValue('fbe_flname_' + flist) != '')
							flistn = GM_getValue('fbe_flname_' + flist);
						if( i != 1 )
							var margin = 'margin-top: 10px;';
						user_string[flist][2] = '<li class="item" style="border-top: 1px solid grey; border-bottom: 1px solid grey;'+ margin +'"><div class="listing" lid="'+flist+'"><a class="clearfix" rel="ignore">' +
									'<span class="name"><b>'+flistn+'</b></span></a></div></li>';
						i++;
					}
					
				}
		}
                var user = unsafeWindow.ChatUserInfos[val[0]];
                var status = unsafeWindow.AvailableList.get(val[0]);
                var classname = (status == 1) ? 'idle' : 'active';
		if( GM_getValue('fce_show_pics') && GM_getValue('fce_show_pics') == 0 ) {
			var pic = '';
			var height = 'style="padding-top: -11px; height: 22px;"';
		} else {
			var pic = '<img class="pic" src="' + user.thumbSrc + '">';
			var height = '';
		}
                user_string[flist][status] +=  '<li '+height+' class="item ' + classname + '" uid="' + val[0] + '">' +
						'<a class="clearfix" '+height+'rel="ignore">' + pic +
                                                '<span class="name">' + user.name + '</span>' +
                                                '<i class="status img sp_3xd8gf sx_94f6be"></i>' +
                                            '</a>' +
                                        '</li>';
            });
	    if( !inArray('1',flists) )
	    	GM_setValue('fce_num_lists', flists.length);
	    else
	    	GM_setValue('fce_num_lists', 0);
            // Append the list HTML to the list
	    flists.sort(function(a, b) {return (a > b) ? -1 : 1; })
	    $.each(flists, function(index, value) {
  		list.append( user_string[value][2] + user_string[value][1] );
	    });
            // Bind the items in the list to open the appropriate chat dialog when clicked
            list.find('li')
                .click(function(e){
		    location.href = "javascript:void(chatDisplay._focusTab("+$(this).attr('uid')+"));";
                    return false;
                });

	    $('.listing')
                .click(function(e){
		    if( GM_getValue('fbe_flname_' + $(this).attr('lid')) )
			var value = 'value = "'+GM_getValue('fbe_flname_' + $(this).attr('lid'))+'"';
		    else
			var value = '';
		    $.facebox('Please type in the name of the Friendlist: <input class="fl_name" fl_id="'+$(this).attr('lid')+'" ' + value + ' type="text"><br><input type="submit" id="test1" class="flsaveb" value="save"><div class="flreturn"></div>');
                });
	    $('.flsaveb')
		.click(function(e){
		    $(".flreturn").text('saved!');
			GM_setValue('fbe_flname_' + $('.fl_name').attr('fl_id'), $('.fl_name').val());
		    $.facebox.close();
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
			var saved_pics = GM_getValue('fce_show_pics');
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
			if( saved_pics == 1 ) {
				var pics1 = 'selected';
			} else {
				var pics0 = 'selected';
			}
			jQuery.facebox('<center><b>H&ouml;he der Chatbar (px): <input type="text" id="winsize" value="' + saved_height + '" size="2"><br>H&ouml;he des Konversationschats:<br>' +
				'<input type="radio" name="consizchooser" '+disp2+' value="2"/>Gross<br><input type="radio" '+disp1+' id="test1" name="consizchooser" value="1"/>Normal<br>' +
				'Zeige Profilbilder: <select name="picchooser" id="picchooser"><option '+pics0+' value="0">Nein</option><option '+pics1+' value="1">Ja</option></select>' +
				'</b><br><input type="submit" id="test1" class="winsend" value="Speichern"><div class="winreturn"></div>');
	    	});
		$(".winsend").bind('click', function() {
			$(".winreturn").text('Gespeichert!');
			GM_setValue('fbe_chat_height', $("#winsize").val());
			GM_setValue('fbe_con_size', parseInt($("input[name='consizchooser']:checked").val()));
			GM_setValue('fce_show_pics', $('#picchooser').val());
			$.facebox.close();
   	 	});
		ProfilLinks();
	    }
        }
    }

})();