// ==UserScript==
// @name           Add Facebook Bookmarks
// @author         frank38
// @version        2.8.4
// @namespace      http://www.facebook.com/frank38
// @description    you can customize more facebook bookmarks
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @include		   http://*.facebook.com/*
// @exclude        http://*.facebook.com/ajax/*
// ==/UserScript==

var fbID;

// check if get facebook id
var checker = setInterval(function () {
	if (typeof unsafeWindow.presence !== 'undefined') {
		fbID = unsafeWindow.presence.user;
		clearInterval(checker);
		addFacebookBookmarks();
	}
	if ($(".custom_icon_garden").length)
		clearInterval(checker);
}, 100);
/*
if(typeof unsafeWindow.channelManager !== 'undefined') {
	fbID = unsafeWindow.channelManager.user;
	addFacebookBookmarks();
} else if (typeof unsafeWindow.presence !== 'undefined') {
	fbID = unsafeWindow.presence.user;
	addFacebookBookmarks();
} else if (typeof unsafeWindow.buddyList !== 'undefined') {
	fbID = unsafeWindow.buddyList.user;
	addFacebookBookmarks();
}

$(document).ready(function () {
	if(fbID)
		return;
	try { fbID = unsafeWindow.presence.user; }
	catch (x) {	return;	}
	addFacebookBookmarks();
});
*/
function addFacebookBookmarks() {
	clearInterval(checker);
	if(!fbID || $('#addbookmarks').length)
		return;
	$("#icon_garden").width("auto");
	app_list = eval(GM_getValue(fbID + "_app_list", "({})"));
	custom_app_list = eval(GM_getValue(fbID + "_custom_app_list", "({})"));
	custom_app = eval(GM_getValue(fbID + "_custom_app", "({})"));
	//init
	if(uneval(app_list).length == 4) {
		updateApplication(null);
	}
	ParseJSON(custom_app_list, null);
	//=======================================================
	// parse data.
	//=======================================================
	function ParseJSON(data, setup) {
		if(!setup) {
			custom_app_list = eval(GM_getValue(fbID + "_custom_app_list", "({})"));
			$.each(data, function (i, app) {
				htm = "<div id=\"application_icon_garden_" + custom_app_list[i].ID + "\" class=\"icon_garden_elem custom_icon_garden\">";
				htm += "<a id=\"application_icon_garden_link_" + custom_app_list[i].ID +"\" class=\"UITooltip\" onclick=\"\" ";
				if(custom_app_list[i].appTarget)
					htm += ' target="_blank" ';
				htm += " href=\"" + unescape(custom_app_list[i].appUrl).replace(/\"/gm, "'") + "\">" + custom_app_list[i].appImg;
				htm += "<span class=\"UITooltip_Wrap left\"><span class=\"UITooltip_Text\">";
				htm += unescape(custom_app_list[i].appName.replace(/\\/g, "%")) + "</span></span></a></div>";
				$("#application_icon_garden_root").append(htm);
			});
			htm = '<div id="addbookmarks" class="fb_menu_item apps">';
			if(!$('#bookmarks_setup').length)
				htm += '<a id="bookmarks_setup" class="fb_menu_item_link" href="#" onclick="return false"><small> </small>Bookmarks Setup</a></div>';
			$('#fb_menu_settings_dropdown').append(htm);
		}
		
		//-------------------------------------------------------
		// loading application data
		//-------------------------------------------------------
		if(setup == "load") {
			
			htm = '<div id="td_app_list" class="afb_listContent">';
			htm += '<h2 class="afb_h2">Bookmarks list</h1>';
			
			//-------------------------------------------------------
			// BOOKMARKED APPLICATION LIST
			//-------------------------------------------------------
			htm += '<ul id="ul_app_list" class="droptrue afb_list">';
			_custom_app_list = uneval(GM_getValue(fbID + "_custom_app_list", "({})"));
			$.each(data, function (i, app) {
				if(_custom_app_list.indexOf(i) != -1)
					ishidden = 'afb_hidden';
				else
					ishidden = '';
				
				info = i + "," + app.name + "," + app.href.replace(/\\/g, "");
				if(app.new_icon_img.replace(/\\/g, "").toString().match("rsrc.php")) {
					info += ',' + app.new_icon_img.toString().replace(/\\/g, '').match(/(src=)(http:\/\/w{0,3}[a-zA-Z0-9_\-.:#/~}]+)/)[2];
					info += ',false';
					htm += '<li id="b_' + i + '" title="' + unescape(app.name.replace(/\\/g, '%')) + '" info="' + info + '" class="afb_list_li ' + ishidden + '">' + app.new_icon_img.replace('class=', 'class=\"').toString().replace(' src', '\" src').toString().replace(/\\/g, '') + ' <span>' + unescape(app.name.replace(/\\/g, '%')) + '</span></li>';
				}
				else {
					info += ',' + app.new_icon_img.replace(/\\/g, '').match(/(src=)(http:\/\/w{0,3}[a-zA-Z0-9_\-.:#/~}]+)/)[2];
					info += ',false';
					htm += '<li id="b_' + i + '" title="' + unescape(app.name.replace(/\\/g, '%')) + '" info="' + info + '" class="afb_list_li ' + ishidden + '">' + app.new_icon_img.replace(/\\/g, '') + ' <span>' + unescape(app.name.replace(/\\/g, '%')) + '</span></li>';
				}
				//}
			});
			htm += '</ul></div>';
			///
			htm += '<div class="afb_listContent">';
			htm += '<table style="height:100%; width:10px;">';
			htm += '<tr><td valign="center">';
			htm += '<input id="afb_Add1" class="inputsubmit afb_inputsubmit" type="button" value="' + unescape('\u2192') + '" />';
			htm += '</td></tr></table>';
			htm += '</div>';
			
			//-------------------------------------------------------
			// DISPLAY LIST
			//-------------------------------------------------------
			htm += '<div id="td_display_list" class="afb_listContent">';
			htm += '<h2 class="afb_h2">Display items</h1>';
			htm += '<ul id="ul_display_list" class="droptrue afb_list" style="max-height:480px;">';
			
			custom_app_list = eval(GM_getValue(fbID + "_custom_app_list", "({})"));
			_custom_app = uneval(GM_getValue(fbID + "_custom_app", "({})"));
			
			isSetting = '';
			for (i in custom_app_list) {
				isCustom = '';
				appimg = '#';
				isTarget = false;
				if(_custom_app.indexOf(custom_app_list[i].ID) != -1) {
					isCustom = ' afb_Custom';
					isSetting += custom_app_list[i].ID + ',';
				}
				if(custom_app_list[i].appTarget)
					isTarget = true;
				appimg = custom_app_list[i].appImg.toString().match(/(ht|f)tp:\/\/w{0,3}[a-zA-Z0-9_\-.:#/~}]+/gim);
				info = custom_app_list[i].ID + "," + custom_app_list[i].appName + "," + custom_app_list[i].appUrl + ',' + appimg + ',' + isTarget;
				htm += '<li id="d_' + custom_app_list[i].ID + '" title="' + unescape(custom_app_list[i].appName.replace(/\\/g, '%')) + '" info="' + info + '" class="afb_list_li ' + isCustom + '" index="' + i + '">' + custom_app_list[i].appImg + ' <span>' + unescape(custom_app_list[i].appName.replace(/\\/g, '%')) + '</span></li>';
			}
			htm += '</ul>';
			htm += '<span style="display: block; text-align: center;">';
			htm += '<input id="afb_up" class="inputsubmit afb_inputsubmit" type="button" value="' + unescape('\u2191') + '" /> ';
			htm += '<input id="afb_down" class="inputsubmit afb_inputsubmit" type="button" value="' + unescape('\u2193') + '" /> ';
			htm += '<input id="afb_del" class="inputsubmit afb_inputsubmit" type="button" value="X" /> ';
			htm += '<input id="afb_edit" class="inputsubmit afb_inputsubmit" type="button" value="Edit" />';
			htm += '</span>';
			htm += '</div>';
			htm += '<div class="afb_listContent">';
			htm += '<table style="height:100%;width:10px;">';
			htm += '<tr><td valign="center">';
			htm += '<input id="afb_Add2" class="inputsubmit afb_inputsubmit" type="button" value="' + unescape('\u2190') + '" />';
			htm += '</td></tr></table>';
			htm += '</div>';

			//-------------------------------------------------------
			// CUSTOM APPLICATION LIST
			//-------------------------------------------------------
			htm += '<div id="td_custom_app" class="afb_listContent">';
			htm += '<h2 class="afb_h2">Customize link</h1>';
			htm += '<ul id="ul_custom_app" class="droptrue afb_list" style="max-height:480px;">';
			
			custom_app = eval(GM_getValue(fbID + "_custom_app", "({})"));
			for (i in custom_app) {
				ishidden = '';
				isTarget = false;
				if(isSetting.indexOf(custom_app[i].ID) != -1) {
					ishidden = 'afb_hidden';
				}
				if(custom_app[i].appTarget)
					isTarget = true;
				appimg = custom_app[i].appImg.toString().match(/(ht|f)tp:\/\/w{0,3}[a-zA-Z0-9_\-.:#/~}]+/gim);
				info = custom_app[i].ID + "," + custom_app[i].appName + "," + custom_app[i].appUrl + ',' + appimg + ',' + isTarget;
				htm += '<li id="c_' + custom_app[i].ID + '" title="' + unescape(custom_app[i].appName.replace(/\\/g, '%')) + '" info="' + info + '" class="custom_app afb_list_li ' + ishidden + '">' + custom_app[i].appImg + ' <span>' + unescape(custom_app[i].appName.replace(/\\/g, '%')) + '</span></li>';
			}
			htm += '</ul>';
			htm += '<span style="display:block; text-align: center;">';
			htm += '<input id="add_custom_app" type="button" class="inputsubmit afb_inputsubmit" value="New"> ';
			htm += '<input id="del_custom_app" type="button" class="inputsubmit afb_inputsubmit" value="Del"> ';
			htm += '<input id="edit_custom_app" type="button" class="inputsubmit afb_inputsubmit" value="Edit">';
			htm += '</span>';
			htm += '</div>';
			return htm;
		}
		
		//-------------------------------------------------------
		// from update application list
		//-------------------------------------------------------
		if(setup == "update") {
			htm = '<h2 class="afb_h2">Bookmarks list</h1>';
			htm += '<ul id="ul_app_list" class="droptrue afb_list">';
			$.each(data, function (i, app) {
				if(_custom_app_list.indexOf(i) != -1)
					ishidden = 'afb_hidden';
				else
					ishidden = '';
				
				info = i + "," + app.name + "," + app.href.replace(/\\/g, "");
				if(app.new_icon_img.replace(/\\/g, "").toString().match("rsrc.php")) {
					info += ',' + app.new_icon_img.toString().replace(/\\/g, '').match(/(src=)(http:\/\/w{0,3}[a-zA-Z0-9_\-.:#/~}]+)/)[2];
					info += ',false';
					htm += '<li id="b_' + i + '" title="' + unescape(app.name.replace(/\\/g, '%')) + '" info="' + info + '" class="afb_list_li ' + ishidden + '">' + app.new_icon_img.replace('class=', 'class=\"').toString().replace(' src', '\" src').toString().replace(/\\/g, '') + ' ' + unescape(app.name.replace(/\\/g, '%')) + '</li>';
				}
				else {
					info += ',' + app.new_icon_img.replace(/\\/g, '').match(/(src=)(http:\/\/w{0,3}[a-zA-Z0-9_\-.:#/~}]+)/)[2];
					info += ',false';
					htm += '<li id="b_' + i + '" title="' + unescape(app.name.replace(/\\/g, '%')) + '" info="' + info + '" class="afb_list_li ' + ishidden + '">' + app.new_icon_img.replace(/\\/g, '') + ' ' + unescape(app.name.replace(/\\/g, '%')) + '</li>';
				}
			});
			htm += "</ul>";
			return htm;
		}
	}
	
	//=======================================================
	// update application list
	//=======================================================
	function updateApplication (val) {
		if(!val) {
			GM_xmlhttpRequest({
			    method: 'GET',
			    url: 'http://www.facebook.com/ajax/app_dock.php?__a=1',
			    headers: {
			        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			        'Accept': 'application/atom+xml,application/xml,text/xml',
			    },
			    onload: function(responseDetails) {
					apps = eval('(' + responseDetails.responseText.match(/(new applicationdock\()(.+)(\}\},)(.+)(\}\},)/i)[2].replace(/\\"/g, '"').replace(/\\\\\"/g, "") + "}}" + ')');
					
					unsafeWindow.window.setTimeout(function () {
						GM_setValue(fbID + "_app_list", uneval(apps));
					}, 0);
					ParseJSON(apps, "load");
				},
				onerror: function () {
					alert('got some error, please try again.');
				}
			});
		}
		if(val) {
			GM_xmlhttpRequest({
	            method: "GET",
	            url: "http://www.facebook.com/ajax/app_dock.php?__a=1",
	            headers: {
			        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			        'Accept': 'application/atom+xml,application/xml,text/xml',
			    },
	            onload: function(html) { // parse the response
	            	apps = eval('(' + html.responseText.match(/(new applicationdock\()(.+)(\}\},)(.+)(\}\},)/i)[2].replace(/\\"/g, '"').replace(/\\\\\"/g, "") + "}}" + ')');
	            	unsafeWindow.window.setTimeout(function () {
						GM_setValue(fbID + "_app_list", uneval(apps));
					}, 0);
	            	$("#td_app_list").html(ParseJSON(app_list, "update"));
	            	ParseJSON(apps, "load");
	            },
	            onerror: function () {
	            	alert('got some error, please try again.');
	        	}
			});
		}
	}

	//=======================================================
	// click event
	//=======================================================
	
	// select item
	$('#ul_app_list li, #ul_custom_app li, #ul_display_list li').live('click', function () {
		_selected = $(this).parent().find('.afb_selected');
		
		if($(this).hasClass('afb_selected')) {
			$(this).removeClass('afb_selected');
		} else {
			$(this).parent().find('.afb_selected').removeClass('afb_selected');
			$(this).addClass('afb_selected');
		}
	});
	
	// order up
	$('#afb_up').live('click', function () {
		selected = $('#ul_display_list li.afb_selected');
		if(!selected.length) {
			afb_msg(null);
			return;
		}
		afb_msg(' ');
		if($(selected).attr('index') == 0)
			return;
		
		var index = $(selected).attr('index');
		index--;
		
		preNode = $(selected).parent().find('li[index='+ index +']');
		$(selected).attr('index', index);
		clone = $("<li>").append($(selected).clone()).remove().html();
		$(preNode).attr('index', index+1);
		$(clone).insertBefore($(preNode));
		$(selected).remove();
	});
	
	// order down
	$('#afb_down').live('click', function () {
		selected = $('#ul_display_list li.afb_selected');
		if(!selected.length) {
			afb_msg(null);
			return;
		}
		afb_msg(' ');
		if($(selected).attr('index') == $(selected).parent().children().length - 1)
			return;
		
		var index = $(selected).attr('index');
		index++;
		preNode = $(selected).parent().find('li[index='+ index +']');
		$(selected).attr('index', index);
		clone = $("<li>").append($(selected).clone()).remove().html();
		$(preNode).attr('index', index-1);
		$(clone).insertAfter($(preNode));
		$(selected).remove();
	});
	
	// add to display list from bookmark list
	$('#afb_Add1').live('click', function () {
		selected = $('#ul_app_list li.afb_selected').clone();
		if(!selected.length) {
			afb_msg(null);
			return;
		}
		afb_msg(' ');
		$('#ul_app_list li.afb_selected').addClass('afb_hidden');
		$('#ul_app_list li.afb_selected').removeClass('afb_selected');
		$(selected).removeClass('afb_selected');
		index = $('#ul_display_list li').length;
		$(selected).attr('index',  index);
		$(selected).appendTo($('#ul_display_list'));
	});
	
	// add to display list from custom app list
	$('#afb_Add2').live('click', function () {
		
		selected = $('#ul_custom_app li.afb_selected').clone();
		if(!selected.length) {
			afb_msg(null);
			return;
		}
		afb_msg(' ');
		$('#ul_custom_app li.afb_selected').addClass('afb_hidden');
		$('#ul_custom_app li.afb_selected').removeClass('afb_selected');
		$(selected).removeClass('afb_selected');
		$(selected).addClass('afb_Custom');
		index = $('#ul_display_list li').length;
		$(selected).attr('index',  index);
		$(selected).appendTo($('#ul_display_list'));
	});
	
	// delete from display list
	$('#afb_del').live('click', function () {
		selected = $('#ul_display_list li.afb_selected');
		if(!selected.length) {
			afb_msg(null);
			return;
		}
		afb_msg(' ');
		del_id = $(selected).attr('id').substring(1);
		$(selected).remove();
		//re-build index
		$.each($('#ul_display_list li'), function (i, element){
			$(element).attr('index', i);
		});
		$('#b'+del_id+' , #c'+del_id).removeClass('afb_hidden');
	});
	
	// delete from custom list
	$('#del_custom_app').live('click', function () {
		$('#ul_custom_app li.afb_selected').remove();
	});
	
	// update button
	$("#update_app").live("click", function () {
		$("#td_app_list").html("<img src='http://b.static.ak.fbcdn.net/rsrc.php/zBS5C/hash/7hwy7at6.gif' style='padding:20px;'/>");
		updateApplication(true);
	});
	
	// save setting page
	$("#app_display_set").live("click", function () {
		saveDisplay($("#app_display_item").attr("value"));
		$("#app_display").hide();
	});
	
	// close setting page
	$("#app_display_cancel").live("click", function () {
		$("#app_display").hide();
	});
	
	// Edit custom application item
	$('#edit_custom_app').live('click', function () {
		selected = $('#ul_custom_app li.afb_selected');
		if(!selected.length){
			afb_msg(null);
			return;
		}
		afb_msg(' ');
		info = $(selected).attr('info').split(',');
		if(info[3] == '#') {
			info[3] = 'default';
		}
		$('#app_display').addClass('afb_editing');
		$('#app_display').removeClass('afb_addnew');
		editApp(selected, info, $(selected).attr('id'));
	});
	
	// edit display list item.
	$('#afb_edit').live('click', function () {
		
		selected = $('#ul_display_list li.afb_selected');
		if(!selected.length){
			afb_msg(null);
			return;
		}
		afb_msg(' ');
		info = $(selected).attr('info').split(',');
		if(info[3] == '#') {
			info[3] = 'default';
		}
		$('#app_display').addClass('afb_editing');
		$('#app_display').removeClass('afb_addnew');
		editApp(selected, info, $(selected).attr('id'));
	});
	
	//save edit application
	$('#afb_edit_save').live('click', function () {
		_ID = $("#afb_edit_id").text();
		_Name = $("#afb_edit_name").attr("value").toString();
		_Url = escape(unescape($("#afb_edit_url").attr("value").toString()));
		_Img = $(editing_li).find('img').attr('src');
		_target = $('#afb_edit_target').attr('checked');
		
		if(/http:\/\/w{0,3}[a-zA-Z0-9_\-.:#/~}]+/.test($('#afb_edit_img').attr('value')))
			_Img = $("#afb_edit_img").attr("value").toString();
			
		info = _ID + ',' + _Name + ',' + _Url + ',' + _Img + ',' + _target ;
		
		$(editing_li).find('img').attr('src', _Img);
		$(editing_li).attr('info', info);
		$(editing_li).find('span').html(_Name);
		
		
		$('#afb_edit_app li').remove();
		$('#afb_edit_app').hide();
		$('div.afb_dialog_body').show();
		$('#app_display').removeClass('afb_addnew');
		$('#app_display').removeClass('afb_editing');
	});
	
	//cancel edit application
	$('#afb_edit_cancel').live('click', function () {
		$('#afb_edit_app li').remove();
		$('#afb_edit_app').hide();
		$('div.afb_dialog_body').show();
		$('#app_display').removeClass('afb_addnew');
		$('#app_display').removeClass('afb_editing');
	});
	
	// icon selector
	$('#afb_edit_select_img option').live('click', function () {
		$('#afb_edit_img').attr('value', 'http://www.facebook.com/images/icons/' + $(this).attr('value') + '.gif')
	});
	$('#afb_custom_select_img option').live('click', function () {
		$('#custom_img').attr('value', 'http://www.facebook.com/images/icons/' + $(this).attr('value') + '.gif')
	});
	
	// setup
	$('#addbookmarks').live('click', function () {
		setDisplay();
	});

	//=======================================================
	// add new custom application
	//=======================================================
	$("#add_custom_app").live("click", function () {
		
		$('#custom_app').show();
		$('#custom_id').html(Math.ceil(Math.random()*(1000000-999999999)+999999999));
		$('#custom_name').attr('value', '');
		$('#custom_url').attr('value', '');
		$('#custom_img').attr('value', '');
		
		$('div.afb_dialog_body').hide();
		
		$('#app_display').removeClass('afb_editing');
		$('#app_display').addClass('afb_addnew');
		
		// confirm add a new application
		$("#custom_ok").one("click", function () {
			_htm = '';
			_ID = $("#custom_id").html();
			_Name = $("#custom_name").attr("value").toString();
			_Url = escape(unescape($("#custom_url").attr("value").toString()));
			
			_target = false;
			if($("#custom_target").attr('checked'))
				_target = true; //open new tab
			
			_ImgSrc = 'http://www.facebook.com/images/icons/favicon.gif';
			
			if(/http:\/\/w{0,3}[a-zA-Z0-9_\-.:#/~}]+/i.test($("#custom_img").attr("value").toString()))
				_ImgSrc = $("#custom_img").attr("value").toString().match(/http:\/\/w{0,3}[a-zA-Z0-9_\-.:#/~}]+/i);
				
			_Img = '<img src=\"' + _ImgSrc + '\" alt=\"' + _Name + '\" style=\"width:16px; height:16px;\"/>';
			info = _ID + ',' + _Name + ',' + _Url + ',' + _ImgSrc + ',' + _target;
			_htm = '<li id="c_' + _ID + '" title="' + unescape(_Name.replace(/\\/g, '%')) + '" info="' + info + '" class="custom_app afb_list_li">' + _Img + ' <span>' + unescape(_Name.replace(/\\/g, '%')) + '</span></li>';
			
			$('#ul_custom_app').append(_htm);
			$('#custom_app').hide();
			$('div.afb_dialog_body').show();
			$('#app_display').removeClass('afb_addnew');
			$('#app_display').removeClass('afb_editing');
		});
		
		// cancel add a new application
		$("#custom_cancel").live("click", function () {
			$('#custom_app').hide();
			$('div.afb_dialog_body').show();
			$('#app_display').removeClass('afb_addnew');
			$('#app_display').removeClass('afb_editing');
		});
	});
	
	//=======================================================
	
	//=======================================================
	// Setting page
	//=======================================================
	function setDisplay() {
		if($("#app_display").length) {
			$("#app_display").show();
			return;
		}
		icons = new Array('_hidden','accessibility','ad','add_iphone','add_photo','ads_and_pages','affiliation','alert','analytics','answers','audioplayer','beacon','block','blog','bookmark','calendar','camera','canada_flag','chart','check_mark','comment','comments','connect','connect_new','credits_plus','dev_app','developer','discussion','down_arrow_blue','edit_applications','edit_profile','election','email','email_application','email_web','event','external_link','family','favicon','fbfile','fbml','fbpage','fbpage_add','feed','feed_comments','flash','friend','friend_finder','friend_gal','friend_gal_pink','friend_guy','friend_mob','friend_suggestion','gift','great','group','halt','hd','hidden','hourglass','im','im_away','im_offline','im_online','install_app','invite','iphone','iphone_photo','like','like_on','link','location_target','magnifying_glass','marketplace','message','message_16','mini_comment','mini_credit','mini_thumb','mob_album','mobile','mobile_16','mobile_app','mobile_note','mobile_photo','motion','music','new_feature','news','note','notifications','pagefooter_bullet','people_directory','people_directory_16','photo','photos_notes','poke','polls','popout_window','post','privacy','privacy_lock','relationship','relationship_remove','request_button_icon','requests','reviews','sampling','security','see_more','see_more_down','settings','share','share_button_large','share_button_small','share_plus','short_note','social_ad','star_half','star_off','star_on','stream','term','translations','up_arrow_blue','updates','verified','video','wall_arrow_down','wall_arrow_ltr','wall_arrow_rtl','wall_post');
		htm = '<div id="app_display" class="afb_main pop_container_advanced" >';
		htm += '<div class="dialog_content afb_dialog_content">';
		htm += 		'<div class="afb_header">';
		htm += 			'<h1 class="afb_h1">Custom Facebook Bookmarks</h1>';
		htm += 		'</div>';
		htm +=		'<div id="afb_edit_app" style="display:none;">';
		htm +=			'<table>';
		htm += 				'<tr><td align="right">';
		htm += 				'<span class="afb_edit">ID : </span></td><td><label id="afb_edit_id"></label>';
		htm +=  			'</td></tr><tr><td align="right">';
		htm +=  			'<span class="afb_edit">Name : </span></td><td><input id="afb_edit_name" type="text" value="" style="width:300px;" />';
		htm +=  			'</td></tr><tr><td align="right">';
		htm +=  			'<span class="afb_edit">Url : </span></td><td><input id="afb_edit_url" type="text" value="" style="width:280px;"/>';
		htm +=				'<input id="afb_edit_target" type="checkbox" title="Open new Tab"/>';
		htm +=  			'</td></tr><tr><td align="right">';
		htm +=  			'<span class="afb_edit">Image : </span></td><td><input id="afb_edit_img" type="text" value="" style="width:230px;"/> or ';
		htm +=				'<select id="afb_edit_select_img" style="width:50px">';
		for (i in icons) {
			iconUrl = 'http://www.facebook.com/images/icons/' + icons[i] + '.gif';
			htm +=				'<option value="' + icons[i] + '" style="height:16px; padding-top:1px; background:url(\'' + iconUrl + '\') no-repeat;"></option>';
		}
		htm +=				'</select>';
		htm +=  			'</td></tr><tr><td align="right"></td>';
		htm +=  			'<td><input id="afb_edit_save" class="inputsubmit afb_inputsubmit" type="button" value="Save" /> <input id="afb_edit_cancel" class="inputsubmit afb_inputsubmit" type="button" value="Cancel" />';
		htm +=  			'</td></tr>';
		htm += 			'</table>';
		htm +=		'</div>'; //edit application
		htm +=		'<div id="custom_app" style="display:none;">'; // add new application
		htm += 			'<h2 class="afb_h2">Customize a link</h2>';
		htm += 				'<table>';
		htm += 					'<tr><td align="right">';
		htm += 					'<span class="afb_edit">ID : </span></td><td><label id="custom_id"></label>';
		htm += 					'</td></tr><tr><td align="right">';
		htm += 					'<span class="afb_edit">Name : </span></td><td><input id="custom_name" type="text" value="" style="width:300px;" />';
		htm += 					'</td></tr><tr><td align="right">';
		htm += 					'<span class="afb_edit">Url : </span></td><td><input id="custom_url" type="text" value="" style="width:280px;"/>';
		htm +=					'<input id="custom_target" type="checkbox" title="Open new Tab"/>';
		htm += 					'</td></tr><tr><td align="right">';
		htm += 					'<span class="afb_edit">Image : </span></td><td><input id="custom_img" type="text" value="" style="width:230px;"/> or ';
		htm +=				'<select id="afb_custom_select_img" style="width:50px">';
		for (i in icons) {
			iconUrl = 'http://www.facebook.com/images/icons/' + icons[i] + '.gif';
			htm += 				'<option value="' + icons[i] + '" style="height:16px; padding-top:1px; background:url(\'' + iconUrl + '\') no-repeat;"></option>';
		}
		htm +=				'</select>';
		htm += 					'</td></tr><tr><td align="right"></td>';
		htm += 					'<td><input id="custom_ok" class="inputsubmit afb_inputsubmit" type="button" value="Save" /> <input id="custom_cancel" class="inputsubmit afb_inputsubmit" type="button" value="Cancel" />';
		htm += 				'</td></tr>';
		htm += 			'</table>';
		htm +=		'</div>'; 
		htm += 		'<div class="afb_dialog_body">';
		htm += 			'<div style="height:529px;">';
		htm += 				ParseJSON(app_list, "load");
		htm += 			'</div>';
		htm +=			'<div class="afb_foo">';
		htm +=				'<span style="margin-left: 5px; float:left;padding-top:14px;">';
		htm +=					'<input type="button" id="update_app" class="inputsubmit afb_inputsubmit" value="Update bookmarks list" style="float:left;">';
		htm +=				'</span>';
		htm += 				'<span class="afb_msg">';
		htm += 				'</span>';
		htm += 				'<span class="afb_toolbar">';
		htm += 					'<input type="button" id="app_display_set" class="inputsubmit afb_inputsubmit" value="Save"> ';
		htm += 					'<input type="button" id="app_display_cancel" class="inputsubmit afb_inputsubmit" value="cancel">';
		htm += 				'</span>';
		htm +=			'</div>';
		htm +=		'</div>';
		htm += 	'</div>';
		
		htm += '</div>';
		
		$("body").append(htm);
		//$(htm).insertBefore($('#content'));
	}
	
	var editing_li;
	//=======================================================
	// Edit application.
	//=======================================================
	function editApp(selected_li, info, li_id) {
		$('#afb_edit_app').show();
		
		$('#afb_edit_id').text(info[0]);
		$('#afb_edit_name').attr('value', unescape(info[1].replace(/\\/g, '%')));
		$('#afb_edit_url').attr('value', info[2]);
		$('#afb_edit_img').attr('value', info[3]);
		if(info[4] == 'true')
			$('#afb_edit_target').attr('checked', true);
		else
			$('#afb_edit_target').attr('checked', '');
		
		$('div.afb_dialog_body').hide();
		editing_li = selected_li;
		editSelecte = $("<li>").append($(selected_li).clone()).remove().html();
		$(editSelecte).prependTo($('#afb_edit_app'));
	}

	function afb_msg(msg) {
		if(!msg)
			msg = 'Need selecte a item.';
		$('.afb_msg').html(msg);
		$('.afb_msg').show();
	}
	
	function saveDisplay(val) {
		_set_custom_app_list = eval('({})');
		$("#ul_display_list li").each(function (i) {
			this_app = $(this).attr("info").split(",");
			_ID = this_app[0];
			_appName = this_app[1];
			_appUrl = this_app[2];
			_appImg = "<img class=\"" + $(this).find("img:first").attr("class") + "\" src=\"" + this_app[3] + "\" alt=\"" + _appName + "\" style=\"width:16px; height:16px;\"/>";
			_appTarget = false;
			if(this_app[4])
				if(this_app[4] == 'true')
					_appTarget = true;

			_set_custom_app_list[i] = {ID:_ID, appName:_appName, appUrl:_appUrl, appImg:_appImg, appTarget:_appTarget};
		});
		_custom_app = eval('({})');
		$("#ul_custom_app li").each(function (i) {
			cthis_app = $(this).attr("info").split(",");
			_cID = cthis_app[0];
			_cappName = cthis_app[1];
			_cappUrl = cthis_app[2];
			_cappImg = "<img class=\"" + $(this).find("img:first").attr("class") + "\" src=\"" + cthis_app[3] + "\" alt=\"" + _cappName + "\" style=\"width:16px; height:16px;\"/>";
			_cappTarget = false;
			if(cthis_app[4])
				if(cthis_app[4] == 'true')
					_cappTarget = true;
			
			_custom_app[i] = {ID:_cID, appName:_cappName, appUrl:_cappUrl, appImg:_cappImg, appTarget:_cappTarget};
		});
		
		unsafeWindow.window.setTimeout(function () {
			GM_setValue(fbID + "_custom_app_list", uneval(_set_custom_app_list));
			GM_setValue(fbID + "_custom_app", uneval(_custom_app));
			custom_app_list = eval(GM_getValue(fbID + "_custom_app_list", "({})"));
		}, 0);
		
		//clear current
		$(".custom_icon_garden").remove();
		ParseJSON(_set_custom_app_list, null);
	}
	
	//=======================================================
	// css
	//=======================================================
	GM_addStyle('.afb_main {top:50px; left:50px; height:600px; width:624px; z-index:999; position:fixed; overflow:visible;}');
	GM_addStyle('.afb_header {height:23px;position:relative;}');
	GM_addStyle('.afb_dialog_content {background:#fff; border-color:#555555; position:absolute;}');
	GM_addStyle('.afb_dialog_body {height:577px;position:relative;}');
	GM_addStyle('.afb_foo {height:48px;position:relative; background-color:#F2F2F2; text-align: center;}');
	GM_addStyle('.afb_toolbar {margin-right: 5px; float:right;padding-top:14px;}');
	GM_addStyle('.afb_listContent {float:left; height:96%;}');
	GM_addStyle('.afb_h1 {border-color:#3B5998; color:#fff; padding:3px; background:#6D84B4; text-align:center;}');
	GM_addStyle('.afb_h2 {text-align:center;}');
	GM_addStyle('.afb_list {width:170px; overflow-y:auto; overflow-x:hidden; max-height:508px; height:auto;list-style-type: none; float: left; margin-right: 0 10px 0 10px; padding: 3px;}');
	GM_addStyle('.afb_list_li { cursor: pointer; margin: 3px; padding: 3px; font-size: 1.2em; border:1px solid;}');
	GM_addStyle('.afb_selected {background-color: #526EA6; color:#fff;}');
	GM_addStyle('.afb_hidden {display:none;}');
	GM_addStyle('.afb_Custom {border-color:#FF0000; }');
	GM_addStyle('.afb_inputsubmit {font-size:14px; padding:2px 10px 3px;}');
	GM_addStyle('.afb_edit {font-size:14px; margin:5px; display:block;}');
	GM_addStyle('.afb_editing {width:373px; height:212px;}');
	GM_addStyle('.afb_addnew {width:373px; height:196px;}');
	
	//GM_registerMenuCommand("Setup bookmarks...", setDisplay);
	
}