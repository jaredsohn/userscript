
// ==UserScript==
// @name           Facebook Auto invite
// @author         frank38
// @version        1.6.3
// @namespace      http://www.facebook.com
// @description    In friend selector page, quick pick defined friend list and auto submit (if enabled), you can set the friend list for each application (bookmarked), *it doesn't work for all applications.*
// @require        http://frank38.googlepages.com/jquery132_with_qs.js
// @include		   *facebook.com/*
// @exclude        *facebook.com/ajax/*
// ==/UserScript==

var fbID;
var fbName;
var appMsg = '';

var checker = setInterval(function () {
	if (typeof unsafeWindow.presence !== 'undefined') {
		fbID = unsafeWindow.presence.user;
		clearInterval(checker);
		fbInvite();
	}
}, 100);

	
function fbInvite() {
	clearInterval(checker);
	fbName = unsafeWindow.presence.name;
	
	// {UserID{NAME, IMG}}
	var friendList = eval(GM_getValue(fbID + "_friendList", "({})"));
	
	// {ApplicationID{NAME, IMG, URL, DISPLAY}}
	var applicationList = eval(GM_getValue(fbID + "_applicationList", "({})")); 
	
	// {ApplicationID{NAME, ENABLE, SELF, CONFIRM, COUNT, INVITELIST{USERID:userNAME}}}
	var inviteList = eval(GM_getValue(fbID + "_inviteList", "({})"));
	
	var curAppId;
	var checker;

	//friend selector 1
	if($("#friends:visible").length) {
		getSelector('1');
	}
	//friend selector 2 (lite)
	if($(".unselected_list:visible").length) {
		getSelector('2');
	}
	
	//==============================================================
	// update application and friend list (toggle applicationDock
	//==============================================================
	function update() {
		if(typeof unsafeWindow.applicationDock == 'undefined'){
			$(unsafeWindow.document.getElementById('presence_applications_tab')).click();
			//toggleApplicationDock();
			var checker=setInterval(function(){
				if(typeof unsafeWindow.applicationDock == 'undefined')
					return;
				clearInterval(checker);
				$('#fbi_invite').hide();
				AjaxRequest();
				$('#fbi_invite').show();
			}, 0);
		} else {
			AjaxRequest();
		}
	}
	
	//==============================================================
	// find selector
	//==============================================================
	function getSelector(type) {
		if(!$('.page_built_by').length)
			return;
		curAppId = $('.page_built_by').html().match(/(id=)(\d+)/)[2];
		
		if(!inviteList[curAppId] || !inviteList[curAppId].ENABLE)
			return;

		// include self
		if(inviteList[curAppId].SELF) {
			if (type == '1') {
				htm = '<li userid="' + fbID + '">';
				htm += '<a onclick="fs.click(this.parentNode); return false;" href="#">';
				htm += '<span class="square" style="background-image: url(http://static.ak.fbcdn.net/pics/q_silhouette.gif); "></span/>';
				htm += '</span><strong>' + fbName + '</strong><br/><span class="network"/></a></li>';
				$("#friends").prepend(htm);
				
				hiddenHtm = '<input type="hidden" fb_protected="true" name="ids[]" value="' + fbID + '"/>';
				
			}
			if (type == '2') { //lite selector
				htm1 = '<label class="clearfix">';
				htm1 += '<input id="ids[]" class="inputcheckbox" type="checkbox" fb_protected="true" value="' + fbID + '" name="ids[]"/><span> ' + fbName + ' </span>';
				htm1 += '</label>';
				$(".unselected_list").prepend(htm1);
			}
		}

		
		//dom = $("#friends > li[userid]");
		tempList = inviteList[curAppId].INVITELIST;
		
		if(type == '1') {
			hiddenHtm = '';
			$.each(tempList, function (i, obj) {
				hiddenHtm += '<input type="hidden" fb_protected="true" name="ids[]" value="' + i + '"/>';
			});
			if(inviteList[curAppId].SELF) {
				hiddenHtm += '<input type="hidden" fb_protected="true" name="ids[]" value="' + fbID + '"/>';
			}
			$("#fb_multi_friend_selector").append(hiddenHtm);
			$(unsafeWindow.document.getElementById("send")).click();
			
			if(inviteList[curAppId].hasMSG) { //personal message
				appMsg = inviteList[curAppId].MSG;
				personalMsg();
			}
			
			if(inviteList[curAppId].CONFIRM) { //auto confirm
				autoConfirm();
			}
		}
		
		if(type == '2') { //lite
			$.each(inviteList[curAppId].INVITELIST, function (i, obj) {
				/*
				Append friend into the selector that if you have been sent invite to these friends today
				(you can't find these friends in friend selector)
				*/
				if(!$('input[value="' + i + '"]').length) {  
					htm1 = '<label class="clearfix">';
					htm1 += '<input id="ids[]" class="inputcheckbox" type="checkbox" fb_protected="true" value="' + i + '" name="ids[]"/><span> ' + friendList[i].NAME + ' </span>';
					htm1 += '</label>';
					$(".unselected_list").prepend(htm1);
				}
				$('input[value="' + i + '"]').attr('checked',true);
			});
			if(inviteList[curAppId].SELF)
				$('input[value="' + fbID + '"]').attr('checked',true);
			$(unsafeWindow.document.getElementById("send")).click();
			
			if(inviteList[curAppId].hasMSG) { //personal message
				appMsg = inviteList[curAppId].MSG;
				personalMsg();
			}
			if(inviteList[curAppId].CONFIRM) { //auto confirm
				autoConfirm();
			}
		}
	}



	//==============================================================
	// personal message
	//==============================================================
	function personalMsg() {
		sendit = unsafeWindow.document.getElementsByName("sendit");
		if (!sendit.length) {
			window.setTimeout(personalMsg, 1000);
		} else {
			$('#personal_msg_add').css('display', 'none');
			$('textarea#message').attr('value', unescape(appMsg));
			$('#personal_msg_box').css('display', '');
		}
	}

	//==============================================================
	// Auto Submit invite
	//==============================================================
	function autoConfirm() {
		sendit = unsafeWindow.document.getElementsByName("sendit");
		(!sendit.length) ? window.setTimeout(autoConfirm, 1000) : $(sendit).click();
	}

	//==============================================================
	// Ajax request for update
	//==============================================================
	function AjaxRequest() {
		//GM_xmlhttpRequest({
		$.ajax({
		    type: 'GET',
		    url: 'http://www.facebook.com/ajax/typeahead_search.php?__a=1',
		    cache: false,
		    success: function(responseDetails) {
				var j = 0;
				var k = 0;
				
				typeahead = eval('(' + responseDetails.substring(9) + ')').payload.entries;
				tempAppList = unsafeWindow.applicationDock.bookmarks;
				
				friendList = eval('({})');
				
				//friends
				$.each(typeahead, function (i, obj) {
					if(obj.ty=='u') { 
						friendList[obj.i] = {NAME:obj.t, IMG:obj.it};
						j++;
					}
				});
				
				newAppList = eval('({})');
				
				$.each(tempAppList, function (i, obj) {
					if(obj.is_fb_app)
						return;
					isDisplay = 'block';
					if(applicationList[i]) {
						isDisplay = applicationList[i].DISPLAY;
					}
					newAppList[i] = {NAME:obj.name, IMG:obj.new_icon_img, URL:obj.href, DISPLAY:isDisplay};
					k++;
				});
				applicationList = newAppList;
				GM_setValue(fbID + "_friendList", uneval(friendList));
				GM_setValue(fbID + "_applicationList", uneval(applicationList));
				settingPage();
			},
			error: function () {
				settingPage();
			}
		});
	}
	//==============================================================
	// Setting page (Application)
	//==============================================================
	function settingPage(){
		applicationList = eval(GM_getValue(fbID + "_applicationList", "({})")); 
		if(!$('#fbi_invite').length) {
		    settingHtml  = '<div id="fbi_invite" class="fbi_invite pop_container_advanced">123';
			settingHtml += '</div>';
			$('#content').append(settingHtml);
		}
		$('#fbi_invite').html('');
		$('#fbi_invite').show();
		//var settingHtml  = '<div id="fbi_invite" class="fbi_invite pop_container_advanced">';
		fbi_inviteHtml = '<div class="dialog_content fbi_dialog_content">';
		fbi_inviteHtml += '<h2 class="dialog_title fbi_dialog_title"><span style="display:block;">Edit Application</span></h2>';
		fbi_inviteHtml += '<div class="dialog_body fbi_dialog_body" style="338px;">';
		fbi_inviteHtml += '<div style="padding:5px; background-color:#F0F0F0;">';
		fbi_inviteHtml += '<a id="fbi_Hide_toggle"> [Toggle Hide / Show] </a>';
		fbi_inviteHtml += '<a id="fbi_Hide" style="float:right"> [Hide / Show selected]</a>';
		fbi_inviteHtml += '</div>';
		fbi_inviteHtml += '<ul id="fbi_appList" class="fbi_List" style="height:90%;">';
		$.each(applicationList, function (i, obj) {
			hasSet = 0;
			isEnable = true;
			DISPLAY = '';
			displayStr = '';
			if(inviteList[i]) {
				hasSet = inviteList[i].COUNT;
				isEnable = inviteList[i].ENABLE;
				
			}
			if(obj.DISPLAY == 'none') {
				DISPLAY = 'fbi_hide';
				displayStr = '[Hidden]';
			}
			
			if(isEnable)
				fbi_inviteHtml += '<li id="' + i + '" alt="' + obj.NAME + '" class="' + DISPLAY + '" style="margin:3px; padding:3px;">' + obj.IMG + ' <span>' + obj.NAME + '</span>&nbsp;<span id="settingCount_' + i + '">(' + hasSet + ')</span><span style="float:right;" class="hideApp">' + displayStr + '</span></li>';
			else
				fbi_inviteHtml += '<li id="' + i + '" alt="' + obj.NAME + '" title="Disabled" class="' + DISPLAY + ' fbi_disabled" style=" margin:3px; padding:3px;">' + obj.IMG + ' <span>' + obj.NAME + '</span>&nbsp;<span id="settingCount_' + i + '">(' + hasSet + ') </span><span style="float:right;" class="hideApp">' + displayStr + '</span></li>';
			
		});
		fbi_inviteHtml += '</ul>';
		fbi_inviteHtml += '</div>';
		fbi_inviteHtml += '<div class="dialog_buttons fbi_dialog_buttons">';
		fbi_inviteHtml += '<input id="fbi_Update" class="inputsubmit" type="button" value="Update" /> ';
		fbi_inviteHtml += '<input id="fbi_EditApp" class="inputsubmit" type="button" value="Edit" /> ';
		fbi_inviteHtml += '<input id="fbi_closeSetting" class="inputsubmit" type="button" value="Close" />';
		fbi_inviteHtml += '</div>';
		fbi_inviteHtml += '</div>';
		//settingHtml += '</div>';
			
		$('#fbi_invite').html(fbi_inviteHtml); 
		
		// toggle hide / show applications
		$('#fbi_Hide_toggle').bind('click', function () {
			$('#fbi_appList > li.fbi_hide').toggle();
		});
		
		// hide / show applications
		$('#fbi_Hide').bind('click', function () {
			$.each($("#fbi_appList > li.fbi_selected"), function (i, obj) {
				if($(obj).hasClass('fbi_hide')) {
					applicationList[$(obj).attr('id')].DISPLAY = 'block';
					$(obj).removeClass('fbi_hide');
					$(obj).removeClass('fbi_selected');
					$(obj).find('span.hideApp').html('');
				} else {
					applicationList[$(obj).attr('id')].DISPLAY = 'none';
					$(obj).removeClass('fbi_selected');
					$(obj).addClass('fbi_hide');
					$(obj).find('span.hideApp').html('[Hidden]');
				}
			});
			
			GM_setValue(fbID + "_applicationList", uneval(applicationList));
		});
		
		//change class
		$('#fbi_appList li').bind('click', function () {
			if(!$(this).hasClass('fbi_selected')) {
				if($(this).attr('title') == 'Disabled') {
					$(this).removeClass('fbi_disabled');
				}
				$(this).addClass('fbi_selected');
			} else {
				if($(this).attr('title') == 'Disabled') {
					$(this).addClass('fbi_disabled');
				}
				$(this).removeClass('fbi_selected');
			}
		});
		
		// open friend selector
		$('#fbi_EditApp').live('click', function EditApp() {
			friendSelector();
		});
		
		// close
		$('#fbi_closeSetting').live('click', function() {
			$('#fbi_invite').hide();
		});
		
		// update friend list and application list
		$('#fbi_Update').live('click', function() {
			update();
		});
	}
	
	//==============================================================
	// friend selector
	//==============================================================
	function friendSelector() {
		if($('#fbi_selector').length)
			$('#fbi_selector').remove();
		selectedApp = $('#fbi_appList li.fbi_selected');
		if(!selectedApp.length)
			return;
		$('#fbi_invite').hide();
		var appListStr = '';
		var viewAppId = '';
		$.each(selectedApp, function (i, obj){
			if (inviteList[$(obj).attr('id')]) {
				viewAppId = $(obj).attr('id');
				appListStr = uneval(inviteList[$(obj).attr('id')].INVITELIST);
				return false;
			}
		});
		
		var selectorHtml  = '<div id="fbi_selector" class="fbi_selector pop_container_advanced">';
			selectorHtml += '<div class="dialog_content fbi_dialog_content">'; 
			selectorHtml += '<h2 class="dialog_title fbi_dialog_title">';
			if(selectedApp.length > 1)
				selectorHtml += '<span style="display:block;">Select Friend <font color="#FFF55C"><strong>(' + selectedApp.length + ' applications has been seleted, only show first one.)</strong></font></span></h2>';
			else
				selectorHtml += '<span style="display:block;">Select Friend</span></h2>';
			selectorHtml += '<div style="padding:2px; background-color:#F0F0F0;"><span> For: </span>';
			$.each(selectedApp, function (i, obj) {
				selectorHtml += '<img src="' + $(obj).find('img').attr('src') + '" alt="' + $(obj).find('span').html() +'"/> ';
			});
			selectorHtml += '<div id="fbi_info" style="float:right;">';
			selectorHtml += '<span id="fbi_counter"></span>&nbsp;|&nbsp;&nbsp;';
			selectorHtml += '</div>';
			selectorHtml += '</div>';
			selectorHtml += '<div class="dialog_body fbi_dialog_body" style="height:414px">';
			selectorHtml += '<ul id="fbi_friendList" class="fbi_List" >'; //fb_multi_friend_selector
			$.each(friendList, function (i, obj) {
				if(appListStr.indexOf(i.toString()) !== -1)
					selectorHtml += '<li id="' + i + '" style="margin:3px; padding:3px; float:left; width:149px;" class="fbi_selected"><span class="fbi_square" style="background-image:url(' + obj.IMG + ');"></span><strong>' + obj.NAME + '</strong></li>';
				else {
					selectorHtml += '<li id="' + i + '" style="margin:3px; padding:3px; float:left; width:149px;"><span class="fbi_square" style="background-image:url(' + obj.IMG + ');"></span><strong>' + obj.NAME + '</strong></li>';
				}
			});
			selectorHtml += '</ul>';
			selectorHtml += '<ul id="fbi_selectedFriendList" class="fbi_List" style="display:none;">';
			selectorHtml += '</ul>';
			selectorHtml += '</div>';
			selectorHtml += '<div class="dialog_buttons fbi_dialog_buttons">';
			
			selectorHtml += '<div style="text-align:left;">';
			selectorHtml += '<span style="padding:2px 10px 3px"><input id="fbi_msg" type="checkbox"/><label for="fbi_msg" title="personal message">Personal Message</label></span>';
			selectorHtml += '<span style="padding:2px 10px 3px"><input id="fbi_self" type="checkbox" /><label for="fbi_self">Include self</label></span>';
			selectorHtml += '<span style="padding:2px 10px 3px"><input id="fbi_enable" type="checkbox" checked="true" /><label for="fbi_enable">Enable</label></span>';
			selectorHtml += '<span style="padding:2px 10px 3px"><input id="fbi_confirm" type="checkbox" checked="" /><label for="fbi_confirm">Auto Confirm</label></span>';
			selectorHtml += '</div>';
			selectorHtml += '<input type="text" id="fbi_msg_text" style="float:left; width:280px; margin-left:30px;"/>';
			
			selectorHtml += '<input id="fbi_Save" class="inputsubmit" type="button" value="Save" /> ';
			selectorHtml += '<input id="fbi_closeSelector" class="inputsubmit" type="button" value="close" />';
			selectorHtml += '</div>';
			selectorHtml += '</div>';
			selectorHtml += '</div>';
			
		$('#content').append(selectorHtml);
		
		//personal message
		$('#fbi_msg , #fbi_msg + label').toggle(function () {
			$('#fbi_msg').attr('checked', true);
			$('#fbi_msg_text').attr('disabled', '');
		}, function () {
			$('#fbi_msg').attr('checked', '');
			$('#fbi_msg_text').attr('disabled', true);
		});
		//});
		
		// selected counter
		$('#fbi_counter').html('<a><strong>(' + $('#fbi_friendList li.fbi_selected').length + ')</strong></a>');
		
		// close friend selector
		$('#fbi_closeSelector').live('click', function () {
			$('#fbi_invite').show();
			$('#fbi_selector').hide();
		});
		
		// save
		$('#fbi_Save').bind('click', function () {
			saveSetting(selectedApp);
		});
		
		// load config
		if (inviteList[viewAppId]) {
			$('#fbi_self').attr('checked', inviteList[viewAppId].SELF);
			$('#fbi_enable').attr('checked', inviteList[viewAppId].ENABLE);
			$('#fbi_confirm').attr('checked', inviteList[viewAppId].CONFIRM);
			$('#fbi_msg').attr('checked', inviteList[viewAppId].hasMSG);
			$('#fbi_msg_text').attr('value', unescape(inviteList[viewAppId].MSG));
			if(inviteList[viewAppId].hasMSG) {
				$('#fbi_msg_text').attr('disabled', '');
			} else {
				$('#fbi_msg_text').attr('disabled', true);
			}
		}
		
		// chang select class
		$('#fbi_friendList li').bind('click', function () {
			if(!$(this).hasClass('fbi_selected')) {
				$(this).addClass('fbi_selected');
			} else {
				$(this).removeClass('fbi_selected');
			}
			$('#fbi_counter').html('<a><strong>(' + $('#fbi_friendList li.fbi_selected').length + ')</strong></a>');
		});
		
		// friend selected list
		$('#fbi_selectedFriendList li').live('click', function () {
			$('#fbi_friendList > #' + $(this).attr('id')).removeClass('fbi_selected');
			$('#fbi_counter').html('<a><strong>(' + $('#fbi_friendList li.fbi_selected').length + ')</strong></a>');
			$(this).remove();
		});
		
		// quicksearch plug-in
		$('ul#fbi_friendList li').quicksearch({
			position: 'prepend',
			labelText: 'Search : ',
			attached: 'div#fbi_info',
			loaderText: '',
			inputClass: 'fbi_search',
			loaderClass: 'fbi_search',
			delay: 800
		});

		$('#quicksearch').addClass('fbi_search');
		
		// toggle show all/selected friends
		$('#fbi_counter').toggle(
			function () {
				$('#fbi_selectedFriendList').toggle();
				$('#fbi_friendList').toggle();
				$('#fbi_selectedFriendList').append($('#fbi_friendList > li.fbi_selected').clone());
			},
			function () {
				$('#fbi_selectedFriendList').toggle();
				$('#fbi_friendList').toggle();
				$('#fbi_selectedFriendList > li ').remove();
			}
		);
	}
	
	//==============================================================
	// Save setting
	//==============================================================
	function saveSetting(selectedApp) {
		selectedFriends = $('#fbi_friendList li.fbi_selected');
		var enable = $('#fbi_enable').attr('checked');
		var self = $('#fbi_self').attr('checked');
		var confirm = $('#fbi_confirm').attr('checked');
		var hasmsg = $('#fbi_msg').attr('checked');
		var _msg = $('#fbi_msg_text').attr('value');
		
		if(!_msg)
			_msg = '';
		msg = escape(unescape(_msg));
		
		tempFriendList = eval('({})');
		
		var friendCount = 0;
		$.each(selectedFriends, function (i, obj){
			tempFriendList[$(obj).attr('id')] = friendList[$(obj).attr('id')].NAME;
			friendCount++;
		});
		if(self) {
			tempFriendList[fbID] = fbName;
			friendCount++;
		}
		
		////////////////////////////
		//inviteList = eval('({})');
		////////////////////////////
		
		$.each(selectedApp, function (i, obj){
			inviteList[$(obj).attr('id')] = {NAME:applicationList[$(obj).attr('id')].NAME, ENABLE:enable, SELF:self, CONFIRM:confirm, COUNT:friendCount, hasMSG:hasmsg, MSG:msg, INVITELIST:eval('('+uneval(tempFriendList)+')')};
			$('#settingCount_' + $(obj).attr('id')).html('(' + friendCount + ')');
			if(!enable) {
				$('#fbi_appList li#' + $(obj).attr('id')).addClass('fbi_disabled');
				$('#fbi_appList li#' + $(obj).attr('id')).attr('title', 'Disabled');
				$('#fbi_appList li#' + $(obj).attr('id')).removeClass('fbi_selected');
			} else {
				$('#fbi_appList li#' + $(obj).attr('id')).removeClass('fbi_disabled');
				$('#fbi_appList li#' + $(obj).attr('id')).attr('title', '');
			}
		});
		GM_setValue(fbID + "_inviteList", uneval(inviteList));
		
		$('#fbi_invite').show();
		$('#fbi_selector').hide();
		
	}

	//==============================================================
	// GM Style
	//==============================================================
	GM_addStyle('.fbi_invite {left:200px; top:100px; min-width:300px; height:400px; margin:auto; z-index:200; position:fixed; overflow:visible;}');
	GM_addStyle('.fbi_selector {left:200px; top:100px; width:500px; margin:auto; z-index:201; position:fixed; overflow:visible;}');
	GM_addStyle('.fbi_selected {background-color: #526EA6; color:#fff;}');
	GM_addStyle('.fbi_disabled {background-color: #FFEBE8;}');
	GM_addStyle('.fbi_hide {display:none;}');
	//GM_addStyle('.fbi_selectdisabled {background-color: #731A8F; color:#fff;}');
	
	GM_addStyle('.fbi_dialog_content {background:#fff; height:94%; border-color:#555555;}');
	GM_addStyle('.fbi_dialog_title {border-color:#3B5998; color:#fff; padding:3px; background:#6D84B4;}');
	GM_addStyle('.fbi_dialog_body {background:#fff; height:90%; }');
	GM_addStyle('.fbi_List {overflow-y:auto; overflow-x:hidden; height:100%;}');
	GM_addStyle('.fbi_List > li {cursor:pointer;}');
	GM_addStyle('.fbi_dialog_buttons {background:#F2F2F2; padding:7px;}');
	GM_addStyle('.fbi_ListEditor_ListName {background:#F2F2F2; overflow:hidden; padding:7px;}');
	GM_addStyle('.fbi_square {background-color:#FFFFFF;background-position:2px 2px;background-repeat:no-repeat;border:1px solid #E0E0E0;display:block;float:left;height:50px;margin-right:5px;padding:2px;position:relative;width:50px;z-index:1;}');
	GM_addStyle('.fbi_search {float:right;}');
	GM_addStyle('.fbi_search {float:right; height:12px; width:}');

	//command
	//GM_registerMenuCommand("Invite setting ...", settingPage);
	htm = '<div id="inviteSetting" class="fb_menu_item apps">';
	htm += '<a class="fb_menu_item_link" href="#" onclick="return false"><small> </small>Invite Setup</a></div>';
	$('#fb_menu_settings_dropdown').append(htm);
	
	$('#inviteSetting').live('click', function () {
		settingPage();
	});
}