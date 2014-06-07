// ==UserScript==
// @name           Accept All/Reject All [Friend Request,Group,Fan Page] By Rezqie Aprilio
// @namespace      FacebookAdminRequest
// @description    Accept or Reject Facebook Request By Rezqie Aprilio
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @include        http://www.facebook.com/reqs.php*
// @version        0.1.6
// @license        GNU General Public Licence
//
// @history
// 0.1.4 Fix problem with friend request
// 0.1.5 Add All friend suggestions after accept friend request //don't work
// 0.1.6 Fix problem with friend request
// ==/UserScript==

$(window).ready(function() {

	var $input, $div = $('<div />');


	function click_all(el_str, index)
	{
		if (typeof index === 'undefined')
			index = 0;
		try {
			//$(el_str+':eq('+index+')').css('border', '1px solid #faa'); // only for debugging purposes
			$(el_str+':eq('+index+')').click();
		} catch(e) {
		}

		if ($(el_str+':eq('+index+')').length == 0)
			return;
		else
			click_all(el_str, (index+1) );
	}


	// FRIEND REQUEST
	//var friend_connect_str = "#friend_connect";		// method 1
	var friend_connect_str = "ul.pbm";					// method 2
	var $friend_connect = $(friend_connect_str + ' input:first').length;
	if($friend_connect == 1)
	{
		$div.append('<br />Permintaan Pertemanan ');
		$input = $('<input type="button" value="[SuaNk'GiE]Setujui semuanya" />')
					.click(function() {
						click_all(friend_connect_str + ' input[name=actions[accept]]');
					});
		$div.append($input);
		$input = $('<input type="button" value="[SuaNk'GiE]Tolak Semuanya" />')
					.click(function() {
						click_all(friend_connect_str + ' input[name=actions[reject]]');
					});
		$div.append($input);

		// Add All Friend Suggestions after Accept Friend Request By Rezqie Aprilio
		/*
		$input = $('<input type="button" value="[SuaNk'GiE]Add smua usulan pertemanan" />')
					.click(function() {
						click_all('.objectListItem .UIImageBlock .SuggestionActionContainer a');
					});
		$div.append($input);
		*/
	} else if ($friend_connect > 1) {
		alert('[SuaNk'GiE] [SuaNk'GiE][SuaNk'GiE][SuaNk'GiE][SuaNk'GiE] :D');
	}


	// FRIEND SUGGESTIONS
	if($("#friend_suggestion input:first").length > 0)
	{
		$div.append('<br />Friend suggestions: ');
		var $thiss = $('div#friend_suggestion');

		// Facebook Frind Suggest FIX
		var $rama = null;
		$('form', $thiss).each(function(index) {
			if ($rama === null)
				$rama = $(this).parent();
			else
				$(this).appendTo($rama);
		});

		$input = $('<input type="button" value="[SuaNk'GiE]Setujui Semuanya" />')
					.click(function() {
						click_all('#friend_suggestion input[name=actions[accept]]');
					});
		$div.append($input);
		$input = $('<input type="button" value="[SuaNk'GiE]Tolak Semuanya" />')
					.click(function() {
						$("#friend_suggestion input[name=actions[reject]]").click();
					});
		$div.append($input);
	}


	// EVENTS
	if($("#event_invite input:first").length > 0)
	{
		$div.append('<br />Acara ');
		$input = $('<input type="button" value="[SuaNk'GiE]Katakan Tidak Untuk Semuanya" />')
					.click(function() {
						click_all('#event_invite input[name=actions[reject]]');
					});
		$div.append($input);
	}


	// GROUP INVITES
	if($("#group_invite input:first").length > 0)
	{
		$div.append('<br />Group Invite ');
		$input = $('<input type="button" value="[SuaNk'GiE]Setujui semuanya untuk bergabung :D" />')
					.click(function() {
						click_all('#group_invite input[name=actions[accept]]');
					});
		$div.append($input);
		$input = $('<input type="button" value="[SuaNk'GiE]Tolaaaaaaaakkk semuanya" />')
					.click(function() {
						click_all('#group_invite input[name=actions[reject]]');
					});
		$div.append($input);
	}


	// PAGE SUGGESTIONS
	if($("#fbpage_fan_confirm input:first").length > 0)
	{
		$div.append('<br />Fan Pages: ');
		$input = $('<input type="button" value="[SuaNk'GiE]Setujui semuanya" />')
					.click(function() {
						click_all('#fbpage_fan_confirm input[name=actions[accept]]');
					});
		$div.append($input);
		$input = $('<input type="button" value="[SuaNk'GiE]Tolak semuanya" />')
					.click(function() {
						click_all('#fbpage_fan_confirm input[name=actions[reject]]');
					});
		$div.append($input);
	}


	// ACCEPT ALL
	if($div.children().length > 0)
	{
		$input =
				$('<input type="button" value="[SuaNk'GiE]Tolakkk semua Permintaan T.T" />')
					.click(function() {
						click_all('input[name=actions[reject]]');
						$(this).parent().hide();
					});
		$div.prepend($input);
	}


	$(".UITwoColumnLayout_Content").prepend($div);




});