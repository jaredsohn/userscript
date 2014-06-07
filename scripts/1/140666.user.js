// ==UserScript==
// @name           Facebook quick poke
// @author         frank38
// @version        1.2.7
// @namespace      http://www.facebook.com
// @description    Facebook quick poke
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @include		   http://*.facebook.com/*
// @exclude        http://*.facebook.com/ajax/*
// ==/UserScript==

(typeof unsafeWindow.channelManager !== 'undefined') ? GM_setValue('_fbID', unsafeWindow.channelManager.user) : (typeof unsafeWindow.presence !== 'undefined') ? GM_setValue('_fbID', unsafeWindow.presence.user) : (typeof unsafeWindow.buddyList !== 'undefined') ? GM_setValue('_fbID', unsafeWindow.buddyList.user) : null;
(unsafeWindow.document.getElementById('fb_dtsg') !== null) ? GM_setValue('_fb_dtsg', unsafeWindow.document.getElementById('fb_dtsg').value) : null;
(unsafeWindow.document.getElementById('post_form_id') !== null) ? GM_setValue('_formId', unsafeWindow.document.getElementById('post_form_id').value) : null;

PokeList = '';
var fbID = GM_getValue('_fbID', null);
var fb_dtsg = GM_getValue('_fb_dtsg', null);
var formId = GM_getValue('_formId', null);
var poke_history = eval(GM_getValue('_poke_history', '({})'));

	//=============================================
	// binding event.
	//=============================================
		GM_addStyle('.poke_span, .comment_poke_span {display:none; cursor:pointer; padding-left:4px; padding-right:4px;}');
		//-----------------------
		// poke button @ ActionLinks
		//-----------------------
		$("#content").live('click', function() {
			$(".UIIntentionalStream_Content > div > div:not(.has_span)").each(function() {
				id = null;
				tmpUrl = $(this).find("h3 > a").attr("href");
				tmpID = $(this).find("h3 > a").attr("href");
				name = $(this).parent().find(".GenericStory_Pic").attr('alt');
				
				if(/(id=)(\d+)/i.test(tmpID)){
					id = tmpID.match(/(id=)(\d+)/i)[2];
				} else {
					tmpID = $(this).parent().find(".GenericStory_Pic").attr("src");
					if (/(\/q)(\d+)/i.test(tmpID))
						id = tmpID.match(/(\/q)(\d+)/i)[2];
				}
				if (!id)
					return;
				isPoked = '';
				if(PokeList.indexOf(id) !== -1)
					isPoked = ' <img src="http://www.facebook.com/images/icons/alert.gif" title="' + name + ' poked you !!" />';
				htm = unescape("\u0020\u00b7\u0020") + '<span class="poke_span" title="' + name + '" poke_id="' + id + '" profile_url="' + tmpUrl + '">';
				htm += '<img src="http://www.facebook.com/images/icons/poke.gif" />' + isPoked + '</span>';
				if($(this).find("form > span > div").length)
					$(this).find(".UIActionLinks.UIActionLinks_bottom.UIIntentionalStory_Info  .UIImageBlock_Content").append(htm);
				else 
					$(this).find(".UIActionLinks.UIActionLinks_bottom.GenericStory_Info").append(htm);
				$(this).addClass('has_span');
				$(".poke_span").fadeIn(500);
			});

			//-----------------------
			// poke button @ wall comment
			//-----------------------
			$(".ufi_section.UIImageBlock.clearfix:not(.has_span)").each(function() {
				id = null;
				tmpUrl = $(this).find("a").attr("href");
				tmpID = $(this).find("a").attr("href");
				name = $(this).find("a").attr("title");
				
				if (/(id=)(\d+)/i.test(tmpID)) {
					id = tmpID.match(/(id=)(\d+)/i)[2];
				} else {
					tmpID = $(this).find("a > img").attr("src");
					if(/(\/q)(\d+)/i.test(tmpID))
						id = tmpID.match(/(\/q)(\d+)/i)[2];
				}
				if(!id)
					return;
				isPoked = '';
				if(PokeList.indexOf(id) !== -1)
					isPoked = ' <img src="http://www.facebook.com/images/icons/alert.gif" title="' + name + ' poked you !!" />';
				htm = unescape("\u0020\u00b7\u0020");
				htm += '<span class="comment_poke_span" title="' + name + '" poke_id="' + id + '" profile_url="' + tmpUrl + '">';
				htm += '<img src="http://www.facebook.com/images/icons/poke.gif" />' + isPoked + '</span>';
				$(this).find("div:first").find("div:last").append(htm);
				$(this).addClass('has_span');
				$(".comment_poke_span").fadeIn(500);
			});
			
			//-----------------------
			// poke button @ profile page
			//-----------------------
			/*
			$("#profile_minifeed > div:not(.has_span)").each(function () {
				id = null;
				tmpUrl = $(this).find("a").attr("href");
				tmpID = $(this).find("a").attr("href");
				name = $(this).find(".UIIntentionalStory_Pic").attr('title');
				
				if(/(id=)(\d+)/i.test(tmpID)){
					id = tmpID.match(/(id=)(\d+)/i)[2];
				} else {
					tmpID = $(this).find(".UIIntentionalStory_Pic > img").attr("src");
					if (/(\/q)(\d+)/i.test(tmpID))
						id = tmpID.match(/(\/q)(\d+)/i)[2];
				}
				if (!id)
					return;
				isPoked = '';
				if(PokeList.indexOf(id) !== -1)
					isPoked = ' <img src="http://www.facebook.com/images/icons/alert.gif" title="' + name + ' poked you !!" />';
				htm = unescape("\u0020\u00b7\u0020") + '<span class="poke_span" title="' + name + '" poke_id="' + id + '" profile_url="' + tmpUrl + '">';
				htm += '<img src="http://www.facebook.com/images/icons/poke.gif" />' + isPoked + '</span>';
				if($(this).find("form > span > div").length)
					$(this).find(".UIActionLinks.UIActionLinks_bottom.UIIntentionalStory_Info").append(htm);
				else //UIActionLinks UIActionLinks_bottom UIIntentionalStory_Info
					$(this).find(".UIActionLinks.UIActionLinks_bottom.GenericStory_Info").append(htm);
				$(this).addClass('has_span');
				$(".poke_span").fadeIn(500);
			});
			*/
		});
		
		//-----------------------
		// click poke from ActionLinks
		//-----------------------
		$(".poke_span:not(.has_poked)").live("click", function() {
			//$(this).parent().find(".poke_msg").fadeIn();
			$(this).addClass("has_poked");
			id = $(this).attr("poke_id");
			name = $(this).attr("title");
			url = $(this).attr("profile_url");
			$(this).find('img:first').attr('src','http://b.static.ak.fbcdn.net/rsrc.php/zBS5C/hash/7hwy7at6.gif');
			
			checkPokeStatus (null, id, name, url, $(this), "home");
			
		});
		
		//-----------------------
		// click poke from comment
		//-----------------------
		$(".comment_poke_span:not(.comment_has_poked)").live("click", function () {
			$(this).addClass("comment_has_poked");
			id = $(this).attr("poke_id");
			name = $(this).attr("title");
			url = $(this).attr("profile_url");
			$(this).find('img:first').attr('src','http://b.static.ak.fbcdn.net/rsrc.php/zBS5C/hash/7hwy7at6.gif');
			checkPokeStatus (null, id, name, url, $(this), "comment");
		});
		
		//-----------------------
		// click poke all button
		//-----------------------
		$('#poke_all_button').live('click', function () {
			if(!$('.ind_poke:visible').length)
				return;
			checked = $('.ind_poke').find('input:visible');
			$('#qp_poke_button').css('visibility', 'hidden');
			$('#poke_all_list').css('cursor', 'not-allowed');
			$('#poke_all_list').attr('disabled', 'true');
			pokeSelected(checked, 0, 'all');
		});
		
		//-----------------------
		// click poke selected button
		//-----------------------
		$('#poke_selected_button').live('click', function () {
			if(!$('.ind_poke:visible').length)
				return;
			checked = $('.ind_poke').find('input[checked=true]');
			$('#qp_poke_button').css('visibility', 'hidden');
			$('#poke_all_list').css('cursor', 'not-allowed');
			$('#poke_all_list').attr('disabled', 'true');
			pokeSelected(checked, 0, 'all');
		});
		
		//-----------------------
		// click poke at UIPokes
		//-----------------------
		$('.doPoke').live('click', function () {
			if($(this).hasClass('UIPokes_has_poked'))
				return;
			$(this).attr('src', 'http://b.static.ak.fbcdn.net/rsrc.php/zBS5C/hash/7hwy7at6.gif');
			$(this).addClass('UIPokes_has_poked');
			id = $(this).attr('poke_id');
			url = $(this).parent().parent().find('a:first').attr('href');
			name = $(this).parent().parent().find('a:first').text();
			checkPokeStatus ($(this).attr('poke_href'), id ,name, url , $(this), "UIPokes");
		});
		
		//-----------------------
		// clear poked information  xxxxxxxxxxxxxx
		//-----------------------
		$('#clear_poke_info').live('click', function () {
			$('#auto_poke_info > div').remove();
		});
		
		$('#toggle_poke_info').live('click', function () {
			$('#auto_poke_info').slideToggle(300);
		});
		
		//-----------------------
		// poke all list 
		//-----------------------
		$('#poke_all_list').live('click', function () {
			poke_list = $('#auto_poke_list > div');
			$('#qp_poke_button').css('visibility', 'hidden');
			$('#poke_all_list').css('cursor', 'not-allowed');
			$('#poke_all_list').attr('disabled', 'true');
			pokeSelected(poke_list, 0, 'poke_list');
		});
		
		//-----------------------
		// set GM value
		//-----------------------
			// enable / disalbe auto re-poke
		$('#auto_poke_all, .auto_poke_all').live('click', function () {
			GM_setValue('_poke_type', $('#auto_poke_all').attr('value'));
		});
		
			// re-poke type : selected
		$('#auto_poke_select, .auto_poke_select').live('click', function () {
			GM_setValue('_poke_type', $('#auto_poke_select').attr('value'));
		});
		
			// re-poke type : all
		$('#auto_poke, .auto_poke').live('click', function () {
			if($('#auto_poke').attr('checked'))
				GM_setValue('_enable_auto_poke', true);
			else 
				GM_setValue('_enable_auto_poke', false);
		});
		
			// enable / disable poke history
		$('#poke_history, .poke_history').live('click', function () {
			if($('#poke_history').attr('checked'))
				GM_setValue('_enable_poke_history', true);
			else
				GM_setValue('_enable_poke_history', false);
		});
		
		//-----------------------
		// toggle auto re-poke setup
		//-----------------------
		$('#auto_poke_setup').live('click', function () {
			$('.lazy_poke').slideToggle(300);
			$('.add_to_list').toggle();
			$('.poke_list').hide();
		});
		
		//-----------------------
		// toggle poke list
		//-----------------------
		$('#toggleList').live('click', function () {
			$('.poke_list').slideToggle(300);
		});
		
		//-----------------------
		// add to auto re-poke list
		//-----------------------
		$('.add_to_list').live('click', function () {
			id = $(this).parent().find('.doPoke').attr('poke_id');
			if(id == fbID)
				return;
			target = $('#auto_poke_list > div[uid='+id+']');
			if($(target).length) {
				$(target).animate( { border:"1px #3B5998 solid" }, 2000)
						 .animate( { border:"0px " }, 1000);
				return;
			}
			name = $(this).parent().parent().find('a:first').text();
			href = $(this).parent().parent().find('a:first').attr('href');
			html = '<div uid="' + id + '" style="margin:3px 10px; padding:2px;">';
			html += '<a href="' + href + '">' + name + '</a>';
			html += '<span class="auto_poke_list" style="cursor:pointer;padding-left:10px; height:14px;">';
			html += '<img src="http://frank38.googlepages.com/poke_.gif" poke_id="' + id + '" title="Poke now !!" />';
			html += '</span> ';
			html += '<label class="remove_from_list" style="float:right" title="Remove this one">[X]</label>';
			html += '</div>';
			$('#auto_poke_list').append(html);
		});
		
		//-----------------------
		// quick poke in auto re-poke list
		//-----------------------
		$('.auto_poke_list').live('click', function () {
			if($(this).hasClass('poke_list_has_poke'))
				return;
			$(this).find('img').attr('src', 'http://b.static.ak.fbcdn.net/rsrc.php/zBS5C/hash/7hwy7at6.gif');
			id = $(this).find('img').attr('poke_id');
			
			url = $(this).parent().find('a:first').attr('href');
			name = $(this).parent().find('a:first').text();
			
			checkPokeStatus ('', id, name, url, $(this).find('img'), "auto_poke_list");
			$(this).addClass('poke_list_has_poke');
		});
		
		//-----------------------
		// remove from auto re-poke list
		//-----------------------
		$('.remove_from_list').live('click', function () {
			$(this).parent().remove();
			list = eval(GM_getValue('_poke_list', '({})'));
			id = $(this).attr('uid');
			delete list[id];
			GM_setValue("_poke_list", uneval(list));
		});
		
		//-----------------------
		// save poke list
		//-----------------------
		$('#save_list').live('click',  function () {
			new_list = eval('({})');
			$.each($('#auto_poke_list > div'), function (i, obj) {
				new_list[$(obj).attr('uid')] = {name:$(obj).find('a').text(), url:$(obj).find('a').attr('href')};
			});
			GM_setValue("_poke_list", uneval(new_list));
			$('.lazy_poke').slideToggle(300);
			$('.add_to_list').toggle();
			$('.poke_list').hide();
		});
		
		//-----------------------
		// add ticked checkbox to poke list.
		//-----------------------
		$('#add_to_list').live('click', function () {
			list = eval(GM_getValue('_poke_list', '({})'));
			$.each($('.ind_poke').find('input[checked=true]'), function (i, obj) {
				id = $(obj).parent().find('img.doPoke').attr('poke_id');
				
				if(id == fbID) // skip self
					return;
				if(list[id])
					return;
				
				name = $(obj).parent().parent().find('a:first').text();
				href = $(obj).parent().parent().find('a:first').attr('href');
				//alert(id + '\n' + name + '\n' + href);
				html = '<div uid="' + id + '" style="margin:3px 10px; padding:2px;">';
				html += '<a href="' + href + '">' + name + '</a>';
				html += '<span class="auto_poke_list" style="cursor:pointer;padding-left:10px;height:14px;"><img src="http://frank38.googlepages.com/poke_.gif" poke_id="' + id + '" title="Poke now !!" /></span>';
				html += '<label class="remove_from_list" style="float:right">[X]</label>';
				html += '</div>';
				$('#auto_poke_list').append(html);
			});
		});
		
		$('#toggle_history').live('click', function () {
			$('#poke_history_list').slideToggle(300);
		});
		$('.toggle_history').live('click', function () {
			$('.poke_history_list').slideToggle(300);
		});
		//-----------------------
		// create elements to #pagelet_pokebox
		//-----------------------
		if($('div.ind_poke').length) {
			text = $('#pagelet_pokebox').find('div.UITitle.UITitle_h5').text() + ' ';
			
			poke_button = '<span style="text-align:center; display:block;" id="qp_poke_button">';
			poke_button += 	'<img id="poke_all_button" style="background:#D9DFEA; cursor:pointer; height:14px !important; margin-left:5px;" class="inputsubmit" src="http://frank38.googlepages.com/poke_all.gif" title="Poke All !!" /> ';
			poke_button += 	'<img id="poke_selected_button" class="inputsubmit" style="background:#D9DFEA; cursor:pointer; height:14px !important; margin-left:5px;" src="http://frank38.googlepages.com/poke_selected.gif" title="Poke Selected !!" /> ';
			poke_button += 	' <img id="auto_poke_setup" style="height:14px margin-left:8px; !important; cursor:pointer;" src="http://www.facebook.com/images/icons/accessibility.gif" title="Auto re-poke setup..." />';
			poke_button += '</span>';
			
			poke_button += '<div class="lazy_poke" style="display:none; width:98%; border:2px solid #D9DFEA; background:#F0F0F0;">';
			poke_button += 		'<h2 style="padding:5px;text-align:center;"> Auto re-poke setup </h2>';
			poke_button += 		'<input id="auto_poke" type="checkbox" style="margin-left:10px;" title="Enable \/ Disable auto re-poke"/> ';
			poke_button += 		'<label for="auto_poke" class="auto_poke" title="Enable \/ Disable auto re-poke"> Auto re-poke </label> ';
			poke_button += 		'<br><hr style="width:90%; border:1px dotted;">';
			poke_button += 		'<input id="auto_poke_all" class="poke_type" type="radio" name="lazy_poke_setup" style="margin-left:30px;" title="Auto re-poke all" value="0"/> ';
			poke_button += 		'<label for="auto_poke_all" class="auto_poke_all" title="Auto re-poke all"> All </label>';
			poke_button += 		'<input id="auto_poke_select" class="poke_type" type="radio" name="lazy_poke_setup" style="margin-left:20px;" title="Auto re-poke in the list of people" value="1"/> ';
			poke_button += 		'<label for="auto_poke_select" class="auto_poke_select" title="Auto re-poke in the list of people"> Only in list </label>';
			poke_button += 		' &nbsp;<label id="toggleList" title="Show/Hide list">[Show]</label><br>';
			poke_button += '</div>';
			
			poke_button += '<div class="poke_list" style="display:none; width:98%; border:2px solid #D9DFEA; background:#F0F0F0;">';
			poke_button += 		'<h2 style="padding:5px;text-align:center;"> Poke List </h2>';
			poke_button += 	'<div id="auto_poke_list">';
			
			poke_button += '</div>';
			poke_button += '<hr style="width:90%">';
			poke_button += '<span style="text-align:right; display:block">';
			poke_button += 	'<input type="button" value="Poke all" title="Poke all in the list !!" class="inputsubmit" id="poke_all_list" style="margin: 5px 5px 5px 0px; cursor:pointer;"/>';
			poke_button += 	'<input type="button" value="Save" title="Save list" class="inputsubmit" id="save_list" style="margin: 5px 5px;cursor:pointer;"/>';
			poke_button += 	'<input type="button" value="Add " title="Add ticked friend(s) to the auto re-poke list" class="inputsubmit" id="add_to_list" style="margin: 5px 5px 0px 5px;cursor:pointer;"/>';
			poke_button += '</span>';
			poke_button += '</div>';
			poke_button +='<p>';
			
			$('div.UIPokes').prepend(poke_button);
			
			// poke information
			poke_info = '<hr><span id="toggle_poke_info" class="UITitle UITitle_h5" style="cursor:pointer;"><img src="http://www.facebook.com/images/icons/connect_new.gif" title="Show history"/> Poke Information </span> <label id="clear_poke_info"> [Clear]</label>';
			poke_info += '<div id="auto_poke_info" style="display:none; width:98%; border:2px solid #D9DFEA; background:#F0F0F0;">';
			poke_info += '<h3 style="padding:5px;text-align:center;">Poke information</h3> <hr style="width:95%"/>';
			poke_info += '</div><hr>';
			$('div.UIPokes').parent().parent().append(poke_info);
			
			// poke history
			poke_history = '<span class="toggle_history" class="UITitle UITitle_h5" style="cursor:pointer;">';
			poke_history += '<img src="http://www.facebook.com/images/icons/analytics.gif" title="Show history"/> Poke history </span>';
			poke_history += '<div class="poke_history_list" style="display:none; width:98%; border:2px solid #D9DFEA; background:#F0F0F0;">';
			poke_history += '<h3 style="padding:5px;text-align:center;">Poke History</h3> <hr style="width:95%"/>';
			poke_history +=	'<input id="poke_history" type="checkbox" style="margin-left:10px;" title="Enable \/ Disable poke history"/> ';
			poke_history +=	'<label for="poke_history" class="poke_history" title="Enable \/ Disable poke history"> Enable Poke history</label> ';
			poke_history += '<hr>';
			poke_history += '<div id="poke_history_list" style="">';
			poke_history += '</div>';
			poke_history += '</div><hr>';
			$('div.UIPokes').parent().parent().append(poke_history);

			pokeIcon();
		}
	
	/**********************************************/

	//=============================================
	// insert elements to UIPokes
	//=============================================
	function pokeIcon () {
		list = eval(GM_getValue('_poke_list', '({})'));
		
		$('.ind_poke').each(function () {
			$(this).html('<span style="float:right;height:14px;">' + $(this).html().replace(/\-/,'&nbsp;') + '<span class="pipe">|</span><input type="checkbox" /><a class="add_to_list" title="Add to auto re-poke list." style="display:none;">+</a></span>');
			$(this).find('a:first').insertBefore($(this).find('span:first'));
		});
		
		$.each($('.ind_poke').find('a:eq(1)'), function (i, obj) {
			poke_ID = '';
			a_text = $(obj).text();
			a_href = 'http://www.facebook.com' + $(obj).attr('href');
			$(obj).attr('href', '#');
			poke_ID = a_href.match(/(uid=)(\d+)/i)[2];
			PokeList += poke_ID + ',';
			img = '<img class="doPoke" style="cursor:pointer;height:14px !important; margin-right:5px;" src="http://frank38.googlepages.com/poke_.gif" poke_href="' + a_href + '" poke_id="' + poke_ID + '" title="' + a_text + '" />';
			$(img).insertBefore($(obj));
			$(obj).hide();
		});
		
		$.each($('.ind_poke').find('a:eq(2)'), function (i, obj) {
			a_text = $(obj).text();
			img = '<img style="height:14px !important; margin-right:5px; margin-left:5px;" src="http://frank38.googlepages.com/remove_.png" title="' + a_text + '" />';
			$(obj).html(img);
		});
		
		
		enable = GM_getValue('_enable_auto_poke', false);
		history_enable = GM_getValue('_enable_poke_history', false);
		poke_type = GM_getValue('_poke_type', '1');
		(enable) ? $('#auto_poke').attr('checked', true) : $('#auto_poke').attr('checked', false);
		(poke_type == 1) ? $('.poke_type[value=1]').attr('checked', true) : $('.poke_type[value=0]').attr('checked', true);
		(history_enable) ? $('#poke_history').attr('checked', true) : $('#poke_history').attr('checked', false) ;
		
		 
		if(uneval(list).length == 4) // empty
			return;
		
		//append list
		html = '';
		$.each(list, function (i, obj){
			html += '<div uid="' + i + '" style="margin:3px 10px; padding:2px;">';
			html += '<a href="' + obj.url + '">' + obj.name + '</a>';
			html += '<span class="auto_poke_list" style="cursor:pointer;padding-left:10px;height:14px;"><img src="http://frank38.googlepages.com/poke_.gif" poke_id="' + i + '" title="Poke now !!" /></span>';
			html += '<label class="remove_from_list" style="float:right">[X]</label>';
			html += '</div>';
			target = $('img[poke_id=' + i + ']');
			if($(target).length && enable)  // tick in list.
				$(target).parent().find('input').attr('checked', true);
		});
		$('#auto_poke_list').append(html);
		
		//-----------------------
		// auto re-poke (if enabled)
		//-----------------------
		if(enable) {
			// auto re-poke all, tick all checkbox.
			if(poke_type == '0') {
				target = $('div.ind_poke').find('input[checked!=true]');
				$.each(target, function (i, obj) {
					$(obj).attr('checked', true);
				});
			}
			
			if(!$('.ind_poke:visible').length)
				return;
			
			target = $('div.ind_poke').find('input[checked=true]');
			$('#qp_poke_button').css('visibility', 'hidden');
			$('#poke_all_list').css('cursor', 'not-allowed');
			$('#poke_all_list').attr('disabled', 'true');
			pokeSelected(target, 0, 'all');
		}
		
		//-----------------------
		// show poke history (if enabled)
		//-----------------------
		if(history_enable) {
			poke_history = eval(GM_getValue('_poke_history', '({})'));
			if(!poke_history[fbID])
				return;
			
			$.each(poke_history[fbID], function (i, obj) {
				html = '<div id="poke_history_' + i + '" style="margin-left:2px;">';
				html += '<img src="http://www.facebook.com/images/icons/poke.gif" style="margin-left:2px; margin-right:5px;"> ';
				html += '<a href="' + obj.url + '" style="margin-left:2px; margin-right:5px;">' + obj.name + '</a> ';
				html += '<span style="float:right; margin-right:5px;">';
				html += '<img src="http://www.facebook.com/images/icons/check_mark.gif"/> ';
				html += '<label>(' + obj.success.count.toString() + ')</label>';
				html += '</span>';
				html += '</div>';
				$('#poke_history_list').append(html);
			});
			history_length = $('#poke_history_list > div').length;
			$('#poke_history_list').parent().find('h3').text('Poke History (' + history_length + ')');
		}
	}
	/**********************************************/

	//=============================================
	// poke selected/all
	//=============================================
	function pokeSelected(poke_items, index, listType) {
		if($(poke_items).length == index) {
			$('#qp_poke_button').css('visibility', 'visible');
			$('#poke_all_list').css('cursor', 'pointer');
			$('#poke_all_list').attr('disabled', '');
			return;
		}
		
		obj = '';
		id = '';
		url = '';
		from = '';
        
		if(listType == 'all') {
			obj = $(poke_items).eq(index).parent().find('.doPoke');
			$(poke_items).eq(index).attr('checked', '');
			id = $(obj).attr('poke_id');
			url = $(obj).parent().parent().find('a:first').attr('href');
			name = $(obj).parent().parent().find('a:first').text();
			from = 'UIPokes';
			
		}
		if(listType == 'poke_list') {
			obj = $(poke_items).eq(index).find('span.auto_poke_list').find('img');
			id = $(poke_items).eq(index).attr('uid');
			name = $(poke_items).eq(index).find('a:first').text();
			url = $(poke_items).eq(index).find('a:first').attr('href');
			from = 'auto_poke_list';
		}
		if(fbID == id) {
			$(obj).attr('src', 'http://frank38.googlepages.com/poke_.gif');
			pokeSelected(poke_items, index+1, listType);
			return;
		}

		$(obj).attr('src', 'http://b.static.ak.fbcdn.net/rsrc.php/zBS5C/hash/7hwy7at6.gif');
		
        //-----------------------
        // post poke request
        //-----------------------
        $.ajax({
            type: "POST",
            url: "http://www.facebook.com/poke.php",
            dataType: "html",
            data: "post_form_id=" + formId + "&id=" + id + "&confirmed=1&pokeback=0&fb_dtsg=" + fb_dtsg + "&post_form_id_source=AsyncRequest&__a=1",
            success: function (response) {
            	if($(response).find('#standard_error').length) {
            		str = $(response).find('#standard_error').text();
            		pokeStatus(obj, str, from, 'cantpoke', name, url, id);
            	} else {
            		pokeStatus(obj, "poked!!", from, 'poked', name, url, id);
            	}
            	pokeSelected(poke_items, index+1, listType);
            },
            error: function (xhr) {
            	pokeStatus(obj, 'Ajax request error!', from, 'err', name, url, id);
            	pokeSelected(poke_items, index+1, listType);
            }
        });
	}
	/**********************************************/
	
	//=============================================
	// check poke status
	//=============================================
	function checkPokeStatus(poke_url, id, name, url, obj, from) {
		_url = '';
		if(from == "UIPokes")
			_url = poke_url + '&__d=1&__a=1';
		else
			_url = "http://www.facebook.com/ajax/poke_dialog.php?uid=" + id + "&can_poke=" + id + "&pokeback=0&failed_captcha=0&__d=1&__a=1";
		$.ajax({
            type: "GET",
            url: _url,
            success: function(html) { // parse the response!
	            json = eval('(' + html.substring(9) + ')').payload;
	            msg = $(json.body).text();
	            htm = $(json.body).html();
	            if(json.buttons.length != 2) { //poked or can't poke
	            	// I have no idea that how to get error message...
	            	if(msg.indexOf('Sorry') !== -1 || msg.indexOf('\u62b1\u6b49') !== -1 || msg.indexOf('\u7533\u3057\u8a33\u3042\u308a\u307e\u305b\u3093\u304c') !== -1 || msg.indexOf('Non puoi') !== -1 || msg.indexOf('\u0044\u00e9\u0073\u006f\u006c\u00e9') !== -1 || msg.indexOf('Leider kannst') !== -1 || msg.indexOf('\u0418\u0437\u0432\u0438\u043d\u0438\u0442\u0435') !== -1){
	            	//if(msg.indexOf(name) == -1) {
	            		pokeStatus(obj, msg, from, 'err', name, url, id);
	            	} else {
	            		pokeStatus(obj, msg, from, 'cantpoke', name, url, id);
	            	}
	            	return;
	            }
                pokeNow(id, obj, from, formId, fb_dtsg, fbID, name, url);
            },
            error: function (xhr) {
            	pokeStatus(obj, 'Ajax request error!', from, 'err', name, url, id);
        	}
		});
	}
	/**********************************************/
	
	//=============================================
	// poke target
	//=============================================
	function pokeNow(id, obj, from, formId, fb_dtsg, fbID, name, url) {
		$.ajax({
            type: "POST",
            url: "http://www.facebook.com/poke.php",
            dataType: "html",
            data: "post_form_id=" + formId + "&id=" + id + "&confirmed=1&pokeback=0&fb_dtsg=" + fb_dtsg + "&post_form_id_source=AsyncRequest&__a=1",
            success: function (response) {
            	if($(response).find('#standard_error').length) {
            		str = $(response).find('#standard_error').text();
            		pokeStatus(obj, str, from, 'cantpoke', name, url, id);
            	} else if(id == fbID) {
            		pokeStatus(obj, "You poke self !!", from, 'poked', name, url, id);
            	} else {
            		pokeStatus(obj, "poked!!", from, 'poked', name, url, id);
            	}
            },
            error: function (xhr) {
            	pokeStatus(obj, 'Ajax request error!', from, 'err', name, url, id);
            }
        });
	}
	/**********************************************/

	//=============================================
	// show poke status
	//=============================================
	function pokeStatus(obj, msg, from, status, name, url, id) {
		img = '<img src="http://www.facebook.com/images/icons/check_mark.gif" title="' + msg + '" />';
		
		if(status == 'cantpoke') 
			img = '<img src="http://www.facebook.com/images/icons/alert.gif" title="' + msg + '" />';
		
		if(status == 'err')
			img = '<img src="http://www.facebook.com/images/icons/block.gif" title="' + msg + '" />';
		
		//-----------------------
		// from home
		//-----------------------
		if(from === "home") {
			$(obj).parent().find(".poke_span").html(img);
		}
		
		//-----------------------
		// from comment
		//-----------------------
		if(from === "comment") {
			$(obj).parent().find(".comment_poke_span").html(img);
		}
		
		//-----------------------
		// from UIPokes
		//-----------------------
		if(from === "UIPokes") {
			if(status === "err") {
				$(obj).attr('src', 'http://www.facebook.com/images/icons/alert.gif');
			} else {
				$(obj).attr('src', 'http://www.facebook.com/images/icons/check_mark.gif');
			}
			if(status === "poked")
				$(obj).parent().parent().fadeOut(1000);//, function () {
					//if(!$('.ind_poke:visible').length) {
					//	$('#pagelet_pokebox').hide();
					//}
			//});
		}
		
		//-----------------------
		// from auto re-poke list
		//-----------------------
		if(from === "auto_poke_list") {
			$(obj).parent().html(img);
		}
		
		_status = 'success';
		if (status == 'cantpoke')
			_status = 'alert';
		if(status == 'err')
			_status = 'error';
		pokeInfo(img, name, id, url, _status);
	}
	/**********************************************/

	//=============================================
	// poke information.
	//=============================================
	function pokeInfo(img, name, id, url, status) {
		$('#auto_poke_info').show();
		html = '<div style="margin-left:3px; margin-bottom:2px;">';
		html += '<img src="http://www.facebook.com/images/icons/poke.gif" style="margin-left:5px; margin-right:5px;"> ';
		html += '<a href="' + url + '" style="margin-left:5px; margin-right:5px;">' + name + '</a> &nbsp;';
		html += img;
		html += '</div>';
		//$(html).insertBefore($('#clear_poke_info'));
		$('#auto_poke_info').append(html);
		
		enable = GM_getValue('_enable_poke_history', false);
		if(enable)
			pokeHistory(img, name, id, url, status);
	}
	/**********************************************/
	
	
	//=============================================
	// poke information.
	//=============================================
	function pokeHistory(img, name, id, url, status) {
		if(status == 'error') // no log error msg.
			return;
		if (status == 'alert')
			return;
		if(!fbID)
			return;
		success_count = 0;
		alert_count = 0;
		
		if(!poke_history[fbID]) { 
			poke_history[fbID] = {}; // new account
		} else if(!poke_history[fbID][id]) {
				poke_history[fbID][id] = {}; // new record
		} else {
			success_count = poke_history[fbID][id].success.count;
			alert_count = poke_history[fbID][id].alert.count;
		}
		
		if (status == 'alert') {
			_img = 'http://www.facebook.com/images/icons/alert.gif';
			alert_count += 1;
		}
		if (status == 'success') {
			_img = 'http://www.facebook.com/images/icons/check_mark.gif';
			success_count += 1;
		}
		
		total = alert_count + success_count;
		/*
		facebook ID {
			friend id {
				name,
				url,
				total,
				success {
					count,
					image
				},
				alert { 
					count,
					image
				},
			},
			...
		}
		*/
		poke_history[fbID][id] = {name:name, url:url, total:success_count,success:{count:success_count, img:'http://www.facebook.com/images/icons/check_mark.gif'}, alert:{count:alert_count, img:'http://www.facebook.com/images/icons/alert.gif'}};
		GM_setValue("_poke_history", uneval(poke_history));

		$('#poke_history').show();
		if($('#poke_history_'+id).length) {
			$('#poke_history_'+id).find('label').html('(' + success_count.toString() + ')');
		} else {
			html = '<div id="poke_history_' + id + '" style="margin-left:2px;">';
			html += '<img src="http://www.facebook.com/images/icons/poke.gif" style="margin-left:2px; margin-right:5px;"> ';
			html += '<a href="' + url + '" style="margin-left:2px; margin-right:5px;">' + name + '</a> ';
			html += '<span style="float:right; margin-right:5px;">';
			html += '<img src="'+ _img + '"/>';
			html += '<label>(' + success_count.toString() + ')</label>';
			html += '</span>';
			html += '</div>';
			$('#poke_history_list').append(html);
		}
		history_length = $('#poke_history_list > div').length;
		$('#poke_history_list').parent().find('h3').text('Poke History (' + history_length + ')');
	}
	/**********************************************/
//});
//http://www.facebook.com/profile.php?poke&id=