// ==UserScript==
// @name           FQR
// @author         none
// @version        0.0.0
// @namespace      
// @description    Facebook quick request (beta), please enable(set to true) the "dom.allow_scripts_to_close_windows" in about:config
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @include		   *.facebook.com/*
// ==/UserScript==

var exclude_apps = [{Name:"myownisland"}, { Name:"inthemafia"}, { Name:"onthefarm"}, { Name:"cafeworld"}, { Name:"vampiresgame"}, { Name:"yoville"}, { Name:"coasterkingdom"}];
var unable_apps = []//[{Name:"myownisland"}];

var fbID;
var fbName;
var version = '1.2.7';

//==================================================
// facebook "click_add_platform_app" function
//==================================================
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://b.static.ak.fbcdn.net/rsrc.php/z3AGE/hash/5u4cd6p7.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);
GM_JQ.src = 'http://b.static.ak.fbcdn.net/rsrc.php/z928F/hash/8peylnff.js';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

//--------------------------------------------------
	
if($('#fb_menubar_core').length) {
	$("#fb_menubar_core").append("<li id=\"fb_menu_request\" class=\"fb_menu\"><a class=\"fb_menu_link\" href=\"#\" onclick=\"return false;\" title=\"Click to open\">Request</a> </li>");
	fbqRequest();
}

function fbqRequest() {
	c_url = unescape(GM_getValue("confirmUrl", "null"));
	isOnRequest = GM_getValue("OnRequest", false);

	if(isOnRequest) {
		var unable = false;
		GM_setValue("OnRequest", false);
		GM_setValue("confirmUrl", "null");
		$.each(unable_apps, function(i){
			if(window.location.toString().match(unable_apps[i].Name)) {
				unable = true; // need manually confirm
			}
		});
		if(unable) {
		    GM_setValue("Executing", false);
		    unable = false;
		} else {
			Redirect(c_url);
		}
	}
}

$("#close_request").live('click', function () {
	$("#fb_request").hide();
});

$("#fb_menu_request").live('click', function () {
	if($("#fb_menu_request_div").length) {
		$("#fb_request").show();
		return;
	}
	html = '<div id="fb_request" class="generic_dialog pop_dialog full_bleed">';
	html += '<div class="generic_dialog_popup" style="top:100px;min-width:800px;"';
	html += '<div class="pop_content">';
	html += '<div class="pop_container_advanced">';
	html += '<h2 class="dialog_title"><span>Requests (' + version + ')</span></h2>';
	html += '<div class="dialog_content">';
	html += '<div class="dialog_body" style="max-height: 600px;">';
	html += '<table><tr><td valign="top" style="border-right:1px solid;">';
	html += '<div id="fb_menu_request_div" style="background:#FFFFFF;max-width:200px;">';
	html += '</div>';
	html += '</td><td valign="top">';
	html += '<div id="fb_request_content" style="background:#FFFFFF;height:100%;overflow-y:auto;overflow-x:hidden;max-height:590px;width:600px;">';
	html += '</div>';
	html += '</td></tr></table>';
	html += '</div>';
	html += '<div class="dialog_buttons">';
	html += '<span id="fb_request_msg" style="color:#FF0000; float:left; font-size:14px;"></span>';
	html += '<span id="fb_request_queue"> </span>';
	html += '<input id="update_request" class="inputsubmit" type="button" value="Update" title="Update request"/>';
	html += '<input id="reset_request" class="inputsubmit" type="button" value="Reset" title="Reset request status"/>';
	html += '<input id="close_request" class="inputsubmit" type="button" value="Close" />';
	html += '</div>';
	html += '</div>';
	html += '</div>';
	html += '</div>';
	html += '</div>';
	html += '</div>';
	$('body').append(html);
	
	fbAjax();
});

$("#update_request").live('click', function () {
	$("#fb_menu_request_div").html('');
	$("#fb_request_content").html('');
	$('#fb_request_queue').html(' ');
	fbAjax();
});

$("#fb_menu_request_div > a").live('mouseover', function () {
	$("#fb_request_content > div").hide();
	$("#fb_menu_request_div > a").find("h4").removeClass("request_hovered");
	if($("#" + $(this).attr("class")).find('table').length > 0) {
		$("#" + $(this).attr("class")).show();
	} else {
		$(this).fadeOut(1000);
		$("#" + $(this).attr("class")).hide();
	}
	$(this).find("h4").addClass("request_hovered");
});
GM_addStyle('.request_hovered {background:#5C75AA; color:#FFFFFF}');
//==================================================
// load reqs.php content
//==================================================
function fbAjax() {
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: 'http://www.facebook.com/reqs.php',
	    headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	        'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	    onload: parseReqs,
	    onreadystatechange: function () {
	    	//$("#fb_menu_request_div").html("<img src='http://b.static.ak.fbcdn.net/rsrc.php/zBS5C/hash/7hwy7at6.gif' style=\"width:28px; height:21px; padding:5px;\">");
	    	$("#fb_request_msg").html('<img src="http://b.static.ak.fbcdn.net/rsrc.php/zBS5C/hash/7hwy7at6.gif" style="width:24px; height:17px; padding:5px;"/>');
	    	$("#fb_request_msg").show();
	    }
	});
}
//--------------------------------------------------

//==================================================
// append reqs.php content
//==================================================
function parseReqs(details) {
	html = details.responseText;
	var reqsDivs = $(html).find(".UITwoColumnLayout_Content > div > div");
	var reqsSpans = $(html).find(".UITwoColumnLayout_Content > div > div > span:first");
	$("#fb_menu_request_div").html('');
	htm = "";

	//parse html
	$.each(reqsDivs, function (i) {
		var li = $(this).find("span:first").html();
		if($(this).attr("id").match("friend") || $(this).attr("id").match("fbpage"))
			return;
		
		link_html = "<a href='http://www.facebook.com/reqs.php#" + $(this).attr("id") + "' class=\"req_" + $(this).attr("id") + "\" style=\"\">" + li + "</a>";

		$("#fb_menu_request_div").append(link_html);
		
		htm += "<div id=\"req_" + $(this).attr("id") + "\" class=\"req_div\" style=\"display:none;\">";
		
		// 1.2.7 batch commands.
		htm += '<span style="display:block; text-align:left; padding-left:50px;">';
		htm += '<strong style="font-size:14px; color:#6D84B4;">Batch : </strong>';
		htm += '<input id="accept_all" type="button" value="Accept All" class="inputsubmit" title="Accept all of requests of this application"/> ';
		htm += '<input id="skip_all" type="button" value="Skip All" class="inputsubmit" title="Skip all of requests of this application"/>';
		htm += '</span>';
		
		htm += "<ol style=\"list-style-type:none; padding-left:3px; \">";
		divs = $(this).find(".confirm");
		$.each(divs, function (j) {
			btnonclick = $(this).find(".buttons").find("input");
			
			$.each(btnonclick, function(k) {
				onclick = $("<div>").append($(this).clone()).remove().html();
				cmd = onclick.toString().match(/click_add_platform_app\(.+;/i);
				btnhtm = "<input class=\"inputbutton action_button\" id=\"\" name=\"_btn_" + k + "\" value=\"" + $(this).attr('value') + "\" type=\"button\" title=\"" + cmd + "\"> ";
				$(this).parent().append(btnhtm);
				$(this).attr("id", "_btn_" + k);
				$(this).hide();
			});
			htm += "<li style=\"padding-top:5px;\">" + $(this).html() + "<span class=\"p_loading\"></span></li>";
		});
		htm += "</ol></div>";
	})
	
	$("#fb_request_content").html(htm);
	$("#fb_menu_request_div > a").find("h4").css("padding", "2px");
	$("#fb_request_msg").fadeOut(2000, function () {
		$(this).css('opacity', '');
	});
}

// batch command - accept all
$('#accept_all').live('click', function () {
	if(checkExec())
		return;
	doms = $(this).parent().parent().find('li').find('input.inputbutton.action_button:first');
	post_form_id = $("#post_form_id").val();
	fbReqAjax(null, null, post_form_id, null, null, doms, 0);
	return;
});

// batch command - skip all
$('#skip_all').live('click', function () {
	if(checkExec())
		return;
	doms = $(this).parent().parent().find('li').find('input.inputbutton.action_button:last');
	GM_setValue("Executing", true);
	$.each(doms, function (i) {
		$('#fb_request_queue').html('processing : ' + parseInt(i+1) + ' / ' + $(doms).length);
		para = $(this).attr("title").toString().match(/\((.+)\)/)[1].replace(/\'/g, "").split(',');
		$(doms).parent().parent().parent().parent().parent().parent().find(".p_loading").html("Skip...").fadeOut(2000);//, function() {
		$(doms).parent().parent().parent().parent().parent().parent().find("table:first").remove();
		unsafeWindow.click_add_platform_app(para[0], para[1], para[2], para[3], para[4], null);
	});
	$('#fb_request_queue').html($('#fb_request_queue').html() + ' (Done)');
	GM_setValue("Executing", false);
});

$(".inputbutton.action_button").live('click', function () {
	onclick = $(this).attr("title");
	para = onclick.match(/\((.+)\)/)[1].replace(/\'/g, "").split(',');
	isExecuting = GM_getValue("Executing", false);
	if(checkExec())
		return;
	GM_setValue("Executing", true);
	
	//skip this request
	if(onclick.match(/\,\s{0,1}null/)) {
		$(this).parent().parent().parent().parent().parent().fadeOut(200, function() {
			$(this).parent().find(".p_loading").html("Skip...").fadeOut(2000, function(){
				$(this).parent().find("table:first").remove();
			});
		    GM_setValue("Executing", false);
			//$(_thisDom).parent().find("#" + $(_thisDom).attr("name")).click(); //will get error..
			unsafeWindow.click_add_platform_app(para[0], para[1], para[2], para[3], para[4], null);
		});
	} else { //accept this request
		url = onclick.match(/(((f|ht){1}tp:\/\/)[-a-zA-Z0-9@:%_\+.~#?&\/\/\=\;]+)/i)[1];
		////////////////
		(typeof unsafeWindow.channelManager !== 'undefined') ? 	fbID = unsafeWindow.channelManager.user : (typeof unsafeWindow.presence !== 'undefined') ? fbID = unsafeWindow.presence.user : (typeof unsafeWindow.buddyList !== 'undefined') ? fbID = unsafeWindow.buddyList.user : null;
		para = para.toString().replace("null", fbID);
		////////////////
		app_id = onclick.match(/(app\(\d+,)([\s])(\d+)/)[3];
		post_form_id = $("#post_form_id").val();
		fbReqAjax(url, app_id, post_form_id, $(this), para, null, null);
	}
});

//==================================================
// check Executing status.
//==================================================
function checkExec() {
	isExecuting = GM_getValue("Executing", false);
	if(isExecuting) {
		$("#fb_request_msg").html('A request is processing...please wait.');
		$("#fb_request_msg").show(function (){
			$(this).fadeOut(2000, function () {
			$(this).css('opacity', '');
			});
		});
		return true;
	}
	return false;
}
//--------------------------------------------------

//==================================================
// ajax accept request
//==================================================
function fbReqAjax(_url, app_id, post_form_id, _dom, para, _doms, index) {
	if(index != null) {
		if(index == $(_doms).length) {
			GM_setValue("Executing", false);
			$('#fb_request_queue').html($('#fb_request_queue').html() + ' (Done)');
			return;
		}
		GM_setValue("Executing", true);
		$('#fb_request_queue').html('processing : ' + parseInt(index+1) + ' / ' + $(doms).length);
		p_dom = $(_doms).eq(index).parent().parent().parent().parent().parent();
		this_dom = $(_doms).eq(index);
		onclick = $(this_dom).attr('title').toString();
		para = onclick.match(/\((.+)\)/)[1].replace(/\'/g, "").split(',');
		_url = onclick.match(/(((f|ht){1}tp:\/\/)[-a-zA-Z0-9@:%_\+.~#?&\/\/\=\;]+)/i)[1];
		app_id = onclick.match(/(app\(\d+,)([\s])(\d+)/)[3];
		////////////////
		(typeof unsafeWindow.channelManager !== 'undefined') ? 	fbID = unsafeWindow.channelManager.user : (typeof unsafeWindow.presence !== 'undefined') ? fbID = unsafeWindow.presence.user : (typeof unsafeWindow.buddyList !== 'undefined') ? fbID = unsafeWindow.buddyList.user : null;
		para = para.toString().replace("null", fbID);
		////////////////
	} else {
		p_dom = $(_dom).parent().parent().parent().parent().parent();
	}
	var _para = para.split(',');
	
	c_url = 'http://www.facebook.com/ajax/ct.php?app_id=' + app_id + '&action_type=3&post_form_id=' + post_form_id + '&position=3&';
	
	// exclude applications
	$.each(exclude_apps, function(i){
		if(_url.match(exclude_apps[i].Name)) {
			GM_setValue("OnRequest", true);
			GM_setValue("confirmUrl", escape(c_url));
			//GM_setValue("Executing", true);
			GM_openInTab(_url);
			$(p_dom).parent().find("table").fadeOut(500);
			unsafeWindow.click_add_platform_app(_para[0], _para[1], _para[2], _para[3], _para[4], null);
			return;
		}
	});
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: _url,
	    headers: {
			'User-Agent':window.navigator.userAgent,
			'Accept':'text/*',
			'Content-type':'application/x-www-form-urlencoded'
	    },
	    onload: function(responseDetails) {
    		p_url = 'http://www.facebook.com/ajax/ct.php?app_id=' + app_id + '&action_type=3&post_form_id=' + post_form_id + '&position=3&' + Math.random().toString();
	    	GM_xmlhttpRequest({
			    method: 'GET',
			    url: p_url,
			    headers: {
					'User-Agent':window.navigator.userAgent,
					'Accept':'text/*',
					'Content-type':'application/x-www-form-urlencoded'
			    },
			    onload: function(responseDetails) {
			    	$(p_dom).parent().find(".p_loading").html('done').fadeOut(2000);
			    	$(p_dom).parent().find("table").remove();
			    	unsafeWindow.click_add_platform_app(_para[0], _para[1], _para[2], _para[3], _para[4], null);
			    	unsafeWindow.window.setTimeout(function () {
			    		GM_setValue("Executing", false);
			    	}, 0);
			    	if(index != null)
						fbReqAjax(null, null, post_form_id, null, null, _doms, index+1);
			    },
			    onerror: function(responseDetails) {
			    	$("#fb_request_msg").html('Post error.');
					$("#fb_request_msg").show(function (){
						$(this).fadeOut(2000, function () {
						$(this).css('opacity', '');
						});
					});
			    	unsafeWindow.window.setTimeout(function () {
			    		GM_setValue("Executing", false);
			    	}, 0);
			    	if(index != null)
						fbReqAjax(null, null, post_form_id, null, null, _doms, index+1);
			    }
			});
	    },
	    onreadystatechange: function() {
	    	$(p_dom).parent().find(".p_loading").html("<img src='http://b.static.ak.fbcdn.net/rsrc.php/zBS5C/hash/7hwy7at6.gif'>");
	    	$(p_dom).parent().find("table").hide();
	    },
	    onerror: function (responseDetails) {
	    	$(p_dom).parent().find(".p_loading").html("authorization fault, please try again.");
	    	$(p_dom).parent().find("table").show();
	    	$(p_dom).parent().find(".p_loading").fadeOut(1000);
	    	unsafeWindow.window.setTimeout(function () {
	    		GM_setValue("Executing", false);
	    	}, 0);
	    }
	});
}
//--------------------------------------------------

//==================================================
// for exclude applications, send request and close window
//==================================================
function Redirect(c_url) {
	if(c_url.match("myownisland")) { // for island Paradise
    	GM_setValue("Executing", false);
		//return;
	} else {
		
		if(c_url != "null") {
			c_url += Math.random().toString();
			GM_xmlhttpRequest({
			    method: 'POST',
			    url: c_url, 
			    headers: {
					'User-Agent':window.navigator.userAgent,
					'Accept':'text/*',
					'Content-type':'application/x-www-form-urlencoded'
			    },
			    onload: function(responseDetails) {
			    	unsafeWindow.window.setTimeout(function () {
			    		GM_setValue("Executing", false);
			    	//	GM_setValue("OnRequest", false);
					//	GM_setValue("confirmUrl", "null");
			    	}, 0);
			    	closeWindow();
			    }
			});
		}
	}
}
//--------------------------------------------------

//==================================================
// close window
//==================================================
function closeWindow() {
	window.open('','_parent','');
	window.close();
}
//--------------------------------------------------

//==================================================
// Reset request status
//==================================================
$("#reset_request").live('click', function () {
	GM_setValue("Executing", false);
	GM_setValue("OnRequest", false);
	GM_setValue("confirmUrl", "null");
	$("#fb_request_msg").html('Done.');
	$("#fb_request_msg").show(function (){
		$(this).fadeOut(2000, function () {
		$(this).css('opacity', '');
		});
	});
});