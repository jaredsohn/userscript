// ==UserScript==
// @name           Facebook Toplu İstek Yönetimi
// @namespace      FacebookIstekYonetimi
// @description    Facebook isteklerini toplu olarak kabul edin veya reddedin.
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @include        http://www.facebook.com/reqs.php*
// @include        https://www.facebook.com/reqs.php*
// @version        0.1.7
// @license        GNU General Public Licence
//
// @history
// 0.1.4 Fix problem with friend request
// 0.1.5 Add All friend suggestions after accept friend request //don't work
// 0.1.6 Fix problem with friend request
// 0.1.7 Fix problem with #contentArea
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
		$div.append('<br />Arkadaslik Istekleri: ');
		$input = $('<input type="button" value="Hepsini Onayla" />')
					.click(function() {
						click_all(friend_connect_str + ' input[name=actions[accept]]');
					});
		$div.append($input);
		$input = $('<input type="button" value="Hepsini Reddet" />')
					.click(function() {
						click_all(friend_connect_str + ' input[name=actions[reject]]');
					});
		$div.append($input);

		// Add All Friend Suggestions after Accept Friend Request
		/*
		$input = $('<input type="button" value="Add All Friend Suggestions" />')
					.click(function() {
						click_all('.objectListItem .UIImageBlock .SuggestionActionContainer a');
					});
		$div.append($input);
		*/
	} else if ($friend_connect > 1) {
		alert('Facebook Request Admin don\'t work');
	}


	// FRIEND SUGGESTIONS
	if($("#friend_suggestion input:first").length > 0)
	{
		alert('a');
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

		$input = $('<input type="button" value="Hepsini Onayla" />')
					.click(function() {
						click_all('#friend_suggestion input[name=actions[accept]]');
					});
		$div.append($input);
		$input = $('<input type="button" value="Hepsini Reddet" />')
					.click(function() {
						$("#friend_suggestion input[name=actions[reject]]").click();
					});
		$div.append($input);
	}


	// EVENTS
	if($("#event_invite input:first").length > 0)
	{
		$div.append('<br />Events: ');
		$input = $('<input type="button" value="Say No to All" />')
					.click(function() {
						click_all('#event_invite input[name=actions[reject]]');
					});
		$div.append($input);
	}


	// GROUP INVITES
	if($("#group_invite input:first").length > 0)
	{
		$div.append('<br />Group invites: ');
		$input = $('<input type="button" value="Hepsini Onayla" />')
					.click(function() {
						click_all('#group_invite input[name=actions[accept]]');
					});
		$div.append($input);
		$input = $('<input type="button" value="Hepsini Reddet" />')
					.click(function() {
						click_all('#group_invite input[name=actions[reject]]');
					});
		$div.append($input);
	}


	// PAGE SUGGESTIONS
	if($("#fbpage_fan_confirm input:first").length > 0)
	{
		$div.append('<br />Fan Pages: ');
		$input = $('<input type="button" value="Hepsini Onayla" />')
					.click(function() {
						click_all('#fbpage_fan_confirm input[name=actions[accept]]');
					});
		$div.append($input);
		$input = $('<input type="button" value="Hepsini Reddet" />')
					.click(function() {
						click_all('#fbpage_fan_confirm input[name=actions[reject]]');
					});
		$div.append($input);
	}


	// ACCEPT ALL
	if($div.children().length > 0)
	{
		$input =
				$('<input type="button" value="Bütün Istekleri Reddet" />')
					.click(function() {
						click_all('input[name=actions[reject]]');
						$(this).parent().hide();
					});
		$div.prepend($input);
	}
	// ACCEPT ALL
	if($div.children().length > 0)
	{
		$input =
				$('<input type="button" value="Bütün Arkadaslari Onayla" />')
					.click(function() {
						click_all('input[name=actions[accept]]');
						$(this).parent().hide();
					});
		$div.prepend($input);
	}

	$("#contentArea").prepend($div);


});



