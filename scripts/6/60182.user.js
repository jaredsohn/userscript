// ==UserScript==
// @name           facebook stream content simple filter
// @author         frank38
// @version        1.4.1
// @namespace      http://www.facebook.com/
// @description    facebook stream content simple filter
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require        http://frank38.googlepages.com/jquery.livequery.js
// @include		   http://www.facebook.com/*
// @include        http://lite.facebook.com/*
// ==/UserScript==

var ignoreList = eval(GM_getValue("_ignoreList", "({})"));
var version = '1.4.1';

GM_addStyle('.hidden_content{display:none; border:#FF0000 solid 1px;}');
GM_addStyle('.lite_filter {border: 1px solid ; background: #FFF; z-index: 999; width: 500px; position: absolute; top: 50px; left: 100px;}');
if($('#fb_menubar_core').length) {
	if(!$("#fb_menu_blocked").length) {
		html = '<li id="fb_menu_blocked" class="fb_menu"><a class="fb_menu_link showBlock" onclick="return false" title="Click to show/hide blocked content(s)">';
		html += 'Blocked (<span id="block_counter">0</span>)</a>';
		
		html += '<div id="fb_menu_blocked_dropdown" class="fb_menu_dropdown clearfix">';
		html += '<div class="fb_menu_item">';
		html += '<a class="fb_menu_item_link fb_filter_setup">Setup</a>';
		html += '</div>';
		html += '</div>';
		html += '</li>';
		$('#fb_menubar_core').append(html);
	}
}

if($('#navigation').length) {
	if(!$('#lite_filter').length) {
		html = '<a id="lite_filter" class="showBlock" href="#" onclick="return false">Block (';
		html += '<span id="lite_block_counter">0</span>)</a>';
		$('#navigation').append(html);
	}
}

//lite
if(window.location.toString().match(/lite.facebook/)) {
	$('#home_stream > li:not(.processed_content):not(.hidden_content)').livequery(function () {
		$(this).addClass('processed_content');
		ignoreList = eval(GM_getValue("_ignoreList", "({})"));
		for(i in ignoreList) {
			if(ignoreList[i].ignoreCase)
				regStr = eval("/"+unescape(ignoreList[i].Filter)+"/im");
			else
				regStr = eval("/"+unescape(ignoreList[i].Filter)+"/m");
			
			if($(this).html().toString().match(regStr)) {
				
				matchStr = $(this).html().toString().match(regStr);
				$(this).html($(this).html().replace(regStr, '<strong style="color:#F00; text-decoration: line-through;">' + matchStr + '</strong>'));
				$(this).addClass('hidden_content');
				$('#lite_block_counter').html($('.hidden_content').length);
				$(this).removeClass('processed_content');
			}
		}
	});
	
	$('html').live('click', function () {
		$('#home_stream > li:not(.processed_content):not(.hidden_content)').each(function () {
			$(this).addClass('processed_content');
			ignoreList = eval(GM_getValue("_ignoreList", "({})"));
			for(i in ignoreList) {
				if(ignoreList[i].ignoreCase)
					regStr = eval("/"+unescape(ignoreList[i].Filter)+"/im");
				else
					regStr = eval("/"+unescape(ignoreList[i].Filter)+"/m");
				
				if($(this).html().toString().match(regStr)) {
					
					matchStr = $(this).html().toString().match(regStr);
					$(this).html($(this).html().replace(regStr, '<strong style="color:#F00; text-decoration: line-through;">' + matchStr + '</strong>'));
					$(this).addClass('hidden_content');
					$('#lite_block_counter').html($('.hidden_content').length);
					$(this).removeClass('processed_content');
				}
			}
		});
	});
} else {
	$('#content').live('click', function () {
		$(".UIIntentionalStream_Content.UIStream > div:not(.processed_content):not(.hidden_content)").each(function () {
			$(this).addClass('processed_content');
			ignoreList = eval(GM_getValue("_ignoreList", "({})"));
			for(i in ignoreList) {
				if(ignoreList[i].ignoreCase)
					regStr = eval("/"+unescape(ignoreList[i].Filter)+"/im");
				else
					regStr = eval("/"+unescape(ignoreList[i].Filter)+"/m");
				if($(this).html().toString().match(regStr)) {
					
					matchStr = $(this).html().toString().match(regStr);
					$(this).html($(this).html().replace(regStr, '<strong style="color:#F00; text-decoration: line-through;">' + matchStr + '</strong>'));
					$(this).addClass('hidden_content');
					$('#block_counter').html($('.hidden_content').length);
					$(this).removeClass('processed_content');
				}
			}
		});
	});

	$(".UIIntentionalStream_Content.UIStream > div:not(.processed_content):not(.hidden_content)").livequery(function () {
		$(this).addClass('processed_content');
		ignoreList = eval(GM_getValue("_ignoreList", "({})"));
		for(i in ignoreList) {
			if(ignoreList[i].ignoreCase)
				regStr = eval("/"+unescape(ignoreList[i].Filter)+"/im");
			else
				regStr = eval("/"+unescape(ignoreList[i].Filter)+"/m");
			
			if($(this).html().toString().match(regStr)) {
				
				matchStr = $(this).html().toString().match(regStr);
				$(this).html($(this).html().replace(regStr, '<strong style="color:#F00; text-decoration: line-through;">' + matchStr + '</strong>'));
				$(this).addClass('hidden_content');
				$('#block_counter').html($('.hidden_content').length);
				$(this).removeClass('processed_content');
			}
		}
	});
}
$(".showBlock").live("click", function() {
	$(".hidden_content").show();
	$(".processed_content").hide();
	$(this).addClass('hideBlock');
	$(this).removeClass('showBlock');
});

$(".hideBlock").live("click", function() {
	$(".hidden_content").hide();
	$(".processed_content").show();
	$(this).addClass('showBlock');
	$(this).removeClass('hideBlock');
});

$(".toggleAll").live("click", function() {
	$(".processed_content").show();
});

$('.fb_filter_setup').live('click', function () {
	setDisplay();
});

GM_registerMenuCommand("Facebook Filter setup", setDisplay);

function setDisplay() {
	if($("#fb_ignore_setting").length) {
		return;
	}
	ignoreList = eval(GM_getValue("_ignoreList", "({})"));
	
	html = '<div id="fb_ignore_setting" class="generic_dialog pop_dialog full_bleed" style="z-index:999;">';
	html += '<div class="generic_dialog_popup" style="top:100px;"';
	html += '<div class="pop_content">';
	html += '<div class="pop_container_advanced">';
	html += '<h2 class="dialog_title"><span>Filter (' + version + ')</span></h2>';
	html += '<div class="dialog_content">';
	html += '<div class="dialog_body" style="max-height: 600px;">';
	html += '<div id="fb_ignore_div" style="background:#FFFFFF;">';
	html += '<table><tr><td valign="top">';
	html += '&nbsp;New : <input id="ignoreFilter" type="text" />';
	html += '<input id="ignoreCase" type="checkbox" /><label for="ignoreCase"> Ignore case </label>';
	html += '<input id="ignoreAdd" type="button" value="Add" class="inputsubmit" /> ';
	html += '</td></tr>';
	html += '<td valign="top">';
	html += "<ul id=\"fb_ignoreList\" style=\"padding-left:10px;;padding-top:3px;padding-bottom:3px;\">";
	$.each(ignoreList, function(i, filter) {
		html += '<li>';
		html += '<span class="fb_filter">' + unescape(filter.Filter).toString().replace(/\\\//gim, '\/') + '</span>';
		if(filter.ignoreCase == true) {
			html += '<span class="ignoreCase" style="color:#F00;"> (Ignore case) </span> ';
		}
		html += '<label class="ignoreDel" style="float:right;">[X]</label></li>';
	});
	html += "</ul>";
	html += '</td></tr></table>';
	
	html += '</div>';
	html += '</div>';
	html += '<div class="dialog_buttons">';
	html += '<input id="fb_ignoreClose" class="inputsubmit" type="button" value="Close" />';
	html += '</div>';
	html += '</div>';
	html += '</div>';
	html += '</div>';
	html += '</div>';
	html += '</div>';
	
	if(window.location.toString().match(/lite.facebook/)) {
		$("body").prepend(html);
		$('#fb_ignore_setting').addClass('lite_filter');
	}
	else
		$("body").append(html);
	
}

$("#fb_ignoreClose").live('click', function () {
		$("#fb_ignore_setting").remove();
	});
	
	//click edit Button
	$(".ignoreEdit").live("click", function(evl) {
		$("#ignoreFilter").attr("value", $(this).parent().text());
		$("#ignoreAdd").attr("value", "Edit");
	});
	
	$(".ignoreDel").live("click", function(evl) {
		$(this).parent().remove();
		writeValue();
	});
	
	//click add button
	$("#ignoreAdd").live('click', function() {
		_filter = $("#ignoreFilter").attr("value");
		if(!_filter.length || !_filter.match(/[^\s]/ig))
			return;
		_ignoreCase = $('#ignoreCase').attr('checked');
		_isRegExp = $('#isRegExp').attr('checked');
		
		html = '<li>';
		html += '<span class="fb_filter">' + _filter + '</span>';
		if(_ignoreCase == true) {
			html += '<span class="ignoreCase" style="color:#F00;"> (ignore Case) </span>';
		}
		html += '<label class="ignoreDel" style="float:right;">[X]</label></li>';
		
		$("#fb_ignoreList").append(html);
		
		writeValue();
	});
	
	function writeValue() {
		_ignoreList = eval('({})');
		
		$('#fb_ignoreList li').find('span.fb_filter').each(function(i) {
			str = $(this).html().replace(/\//gim, '\\/').replace(/\"/gim,'\\"');
			ignore = false;
			isreg = false;
			if($(this).parent().find('span').hasClass('ignoreCase')) {
				ignore = true;
			}
			_ignoreList[i] = {Filter:escape(unescape(str)), ignoreCase:ignore, isRegExp:isreg};
		});
		
		GM_setValue("_ignoreList", uneval(_ignoreList));
		ignoreList = eval(GM_getValue("_ignoreList", "({})"));
	}
