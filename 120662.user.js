// ==UserScript==
// @name           Sort New Google Bar
// @author         www.fineemb.com
// @description    Allows you to tweak the new Google menu
// @website        http://userscripts.org/scripts/show/120662
// @version        0.60
//
// @updateURL      http://userscripts.org/scripts/source/120662.user.js
//
// @include        https://*.google.*
// @include        http://*.google.*
// @require 	   http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js
// @resource       customCSS http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/smoothness/jquery-ui.css
//
// ==/UserScript==

//GM_deleteValue('tng');
var theme = 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/smoothness/images/';
var newCSS = GM_getResourceText ("customCSS");
GM_addStyle (newCSS);
GM_addStyle('.gb_unreadbox { display:none;}'+
			'.gb_unread { position: absolute;line-height: 20px;bottom: 5px;padding: 0 10px;font-size: 14px;font-weight: bold;border-radius: 2px 2px 2px 2px;color: white;background-color: #CC3C29;right: 0;z-index: 1000;margin: 8px;}'+
			'.gb_unread a{color: #FFF}'+
			'.unreaditem { display:none;min-height: 44px;position: absolute;width:450px;top:-1px;left:192px;z-index: 100000;background:#fff;white-space: normal;border: #ccc 1px solid;color: #444;-moz-box-shadow: -1px 1px 1px rgba(0,0,0,.2);-webkit-box-shadow: 0 2px 4px rgba(0,0,0,.2);box-shadow: 0 2px 4px rgba(0,0,0,.2);}'+
			'.itemcontent .uricontent{padding:10px;max-height:300px;overflow-y: auto;}'+
			'.urib, .uric { left: -10px;border-style: solid solid dashed dashed;border-color: transparent #ccc transparent transparent;border-width: 10px 10px 10px 0;display: -moz-inline-box;display: inline-block;font-size: 0;height: 0;line-height: 0;position: absolute;top: 0;width: 0;z-index: 1000;margin: 10px 10px 10px 0;}'+
			'.uric { left: -9px;border-color: transparent #fff transparent transparent;}'+
			'.uricontent > a { position: relative;border-bottom: 1px solid #dedfe4; background-color:#fff; display:block; text-decoration:none; color:#666;}'+
			'.uricontent > a:hover { background-color:#edf0f9;}'+
			'.ats , .atst{font: normal 11px arial,sans-serif;}'+
			'.atst{position: absolute;right: 16px;top: 14px;}'+
			'.itemcontent{left:450px;top:-45px;min-height:88px;width:520px;}'+
			'.itemcontent>.urib, .itemcontent>.uric{top:44px}'+
			'.itemcontent img{max-width:480px}'+
			'#dialog-form label, #dialog-form input {display: block;}'+
			'#dialog-form input.text { margin-bottom:8px; width:95%; padding: .4em; }'+
			'#dialog-form fieldset {padding: 0;border: 0;margin-top: 25px;border-image: initial;}'+
			'#imgresults img{margin: 0 5px;background: #ddd;padding: 2px;width: 32px;height: 32px;}'+
			'.validateTips { border: 1px solid transparent; padding: 0.3em; }'+
			'.ui-widget {font-family: arial,sans-serif;font-size: 12px;}'+
			'.ui-dialog .ui-state-error { padding: .3em; }'+
			'.ui-sortable-placeholder{display: block;background-color:#B81414;color:#FFF;}'+
			'.ui-sortable-placeholder-delitem{background:#f00;}'+
			'.ui-sortable-placeholder::before{content: "Delete!";font-weight: bold;line-height:44px;margin-left: 64px;}'+
			'.ui-state-default, .ui-widget-content .ui-state-default, .ui-widget-header .ui-state-default{background-color: #4d90fe;background-image: -webkit-gradient(linear,left top,left bottom,from(#4d90fe),to(#4787ed));background-image: -webkit-linear-gradient(top,#4d90fe,#4787ed);background-image: -moz-linear-gradient(top,#4d90fe,#4787ed);background-image: -ms-linear-gradient(top,#4d90fe,#4787ed);background-image: linear-gradient(top,#4d90fe,#4787ed);border: 1px solid #3079ed;-moz-border-radius: 2px;-webkit-border-radius: 2px;border-radius: 2px;-webkit-user-select: none;color: #fff;font-weight: bold;font-size: 11px;height: 29px;min-width: 54px;text-align: center;padding: 0 8px;}'+
			'.ui-state-hover, .ui-widget-content .ui-state-hover, .ui-widget-header .ui-state-hover, .ui-state-focus, .ui-widget-content .ui-state-focus, .ui-widget-header .ui-state-focus{border: 1px solid #2f5bb7;background-color: #357ae8;background-image: -webkit-linear-gradient(top,#4d90fe,#357ae8);background-image: -moz-linear-gradient(top,#4d90fe,#357ae8);background-image: linear-gradient(top,#4d90fe,#357ae8);-webkit-box-shadow: 0 1px 1px rgba(0,0,0,.1);-moz-box-shadow: 0 1px 1px rgba(0,0,0,.1);box-shadow: 0 1px 1px rgba(0,0,0,.1);}'+
			'.ui-state-active, .ui-widget-content .ui-state-active, .ui-widget-header .ui-state-active {-moz-box-shadow: inset 0 1px 2px rgba(0,0,0,.3);-webkit-box-shadow: inset 0 1px 2px rgba(0,0,0,.3);box-shadow: inset 0 1px 2px rgba(0,0,0,.3);}'+
			'.ui-dialog{box-shadow: 0 2px 4px rgba(0,0,0,.2);-moz-box-shadow: -1px 1px 1px rgba(0,0,0,.2);-webkit-box-shadow: 0 2px 4px rgba(0,0,0,.2);}'+
			'.ui-dialog .ui-dialog-titlebar-close{display:none;}'+
			'.ui-widget-content {background: transparent;background: #fff;}'+
			'.ui-widget-overlay {background: transparent;}'+
			'.ui-icon, .ui-widget-content .ui-icon, .ui-widget-header .ui-icon {background: transparent;}'+
			'.ui-widget-header{border:none;background:transparent;color:#666;}'+
			'.ui-widget-content{color:#666}'+
			'.ui-corner-all, .ui-corner-top, .ui-corner-left, .ui-corner-tl { -moz-border-radius-topleft: 0; -webkit-border-top-left-radius: 0; -khtml-border-top-left-radius: 0; border-top-left-radius: 0; }'+
			'.ui-corner-all, .ui-corner-top, .ui-corner-right, .ui-corner-tr { -moz-border-radius-topright: 0; -webkit-border-top-right-radius: 0; -khtml-border-top-right-radius: 0; border-top-right-radius: 0; }'+
			'.ui-corner-all, .ui-corner-bottom, .ui-corner-left, .ui-corner-bl { -moz-border-radius-bottomleft: 0;-webkit-border-bottom-left-radius: 0; -khtml-border-bottom-left-radius: 0; border-bottom-left-radius: 0; }'+
			'.ui-corner-all, .ui-corner-bottom, .ui-corner-right, .ui-corner-br {-moz-border-radius-bottomright:0;-webkit-border-bottom-right-radius:0;-khtml-border-bottom-right-radius:0; border-bottom-right-radius: 0; }');



var timer = null;
var attemptCount = 0;
var mousefalg = true;
var session_token;

// Code to activate the new Google Toolbar if it's not activated yet.
// Thanks to @Boondoklife: http://userscripts.org/scripts/review/119530
var getRootURL = function () {return /https?:\/\/[a-zA-Z0-9]+\.([^\/]+)/i.exec(document.URL)[1];};
var checkNewBar = function () {
   if (document.cookie.indexOf("ID=03fd476a699d6487") == -1 || document.cookie.indexOf("TM=1322688084") == -1) {
      var newCookie = "PREF=ID=03fd476a699d6487:U=88e8716486ff1e5d:FF=0:LD=en:CR=2:TM=1322688084:LM=1322688085:S=McEsyvcXKMiVfGds; path=/; domain=.";
      newCookie += getRootURL();
      document.cookie = newCookie;
      window.location.reload()}
};

//Userscript Updater Generator
var updater = {
	id:        "120662",
	version:   0.60,
	check:     function(bAlert) {
        if (bAlert === undefined)    bAlert = true;
        GM_xmlhttpRequest({
            method: "GET",
            url:    "http://userscripts.org/scripts/source/120662.meta.js",
            onload: function(xhr) {
                var meta = xhr.responseText;
                var ver = meta.match(/\/\/\s*@version\s*(\S+)/);
                if (ver == null)   return;
                else    ver = Number(ver[1]);
                var root = updater;
                if (ver > root.version) {
					if(document.getElementById('gbtem')){
					if(!document.getElementById('gb_gm_msg')){
						document.getElementById('gbtem').innerHTML+='<span id="gb_gm_msg" class="gb_unread">-</span>';
					}
				}
                    document.getElementById('gb_gm_msg').innerHTML=('<a href="http://userscripts.org/scripts/show/120662" title="Click get a new version">Get new version '+ver+'</a>');
					document.getElementById('gb_gm_msg').style.display = 'inline';
					//$('#gb_gm_msg').click(function(){})
                } else if (bAlert)    {};
            }
        });
    },
}

//Google Reader Unread Count
var timeout = null;
var interval = 60000;
var step = 30000;
var minInterval = 60000;
var maxInterval = 360000;

function timeDifference(laterdate, earlierdate) {
	var difference = laterdate.getTime() - earlierdate.getTime();
	var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
	difference -= daysDifference * 1000 * 60 * 60 * 24;
	var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
	difference -= hoursDifference * 1000 * 60 * 60;
	var minutesDifference = Math.floor(difference / 1000 / 60);
	difference -= minutesDifference * 1000 * 60;
	var secondsDifference = Math.floor(difference / 1000);
	if (daysDifference > 1) {
		return daysDifference + ' days ago';
	} else if (daysDifference == 1) {
		return daysDifference + ' day ago';
	} else if (daysDifference < 1 && hoursDifference > 1) {
		return hoursDifference + ' hours ago';
	} else if (hoursDifference == 1) {
		return hoursDifference + ' hour ago';
	} else if (hoursDifference < 1 && minutesDifference > 1) {
		return minutesDifference + ' mins ago';
	}
	if (minutesDifference == 1) {
		return minutesDifference + ' min ago';
	} else {
		return secondsDifference + ' sec ago';
	}
}
function ReaderEditTag(){
}

// ajax function to request a new session token and try marking items read again
function get_session_token(item_id){
	GM_xmlhttpRequest(
	{
		method: "GET",
		url: "https://www.google.com/reader/api/0/token" ,
		onload: function(response)
		{
			if (response.status == 200)
			{
				session_token = response.responseText;
				GM_log(session_token);
				if(item_id)mark_items_read(item_id,true);
			}
			else
				GM_log('Error occurred in get_session_token().');
		}
	});
};

// ajax function to mark items in the item clauses to read
function mark_items_read(item_id,is_final){
	GM_log('Mark item read');
	var mark_result = true;

	GM_xmlhttpRequest(
	{
		method: 'POST',
		url: 'http://www.google.com/reader/api/0/edit-tag?output=json',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		data: 'a=user/-/state/com.google/read&async=true&T=' + session_token + '&i='+item_id,
		onload: function(response)
		{
			if (response.responseText != 'OK')
				mark_result = false;
		
			// finalize until all pending requests are responded	
			if (mark_result)
			{
				GM_log('Marked target items('+item_id+') as read.');
				showReadList();
				showUnreadCount();
			}
			else if ((response.responseHeaders.indexOf('X-Reader-Google-Bad-Token') != -1) && !is_final)
			{
				// session token is expired
				// request new one and remark
				get_session_token(item_id);
			}
			else
			{
				GM_log('Error occurred in prepare_item_clauses().'+response.responseText);
			}
		}
	});
};
function showUnreadCount(){
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'https://www.google.com/reader/api/0/unread-count?all=true&output=json',
		headers: {
			'Accept': 'text/javascript',
		},
		onload: function(responseDetails) {
			var RT = responseDetails.responseText;
			var data = eval("("+RT+")");
			var unreadcounts = data.unreadcounts;
			if(unreadcounts.length==0){
				$('#gb_32_unread').hide();
			}else{
				for (var i = 0; i < unreadcounts.length; i++) {
					var unreadcount = unreadcounts[i];
					if (unreadcount.id.indexOf('reading-list') > -1) {
						var count = unreadcount.count;
						$('#igb_32_unread  .gb_unread').html(count);
						$('#igb_32_unread').show();
				  }
				}
			}
		}
	});
}
function showGmailList(){
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'https://mail.google.com/mail/feed/atom',
		headers: {
			'Accept': 'text/xml',
		},
		onload: function(responseDetails) {
			var xml = $.parseXML(responseDetails.responseText);
			var count = $(xml).find('fullcount').text();
			var today = new Date();
			var offset = (today.getTimezoneOffset() / 60);
				today.setDate(today.getDate());
			var dateDiff;				
			$('#igb_23_uricontent').empty();
			$(xml).find("entry").each(function() {
				dateDiff = $(this).find("issued").text();
				dateDiff = new Date(dateDiff.substr(0, 4), dateDiff.substr(5, 2) - 1, dateDiff.substr(8, 2), dateDiff.substr(11, 2) - offset, dateDiff.substr(14, 2),dateDiff.substr(17, 2), 0); //new Date(year, month, day, hours, minutes, seconds, milliseconds)
				dateDiff = timeDifference(today, dateDiff);
				var title = $('<span style="white-space: nowrap;width: 330px;padding: 8px 16px;padding-right: 104px;text-overflow: ellipsis;overflow: hidden;line-height: 27px;position: relative;display: block;"><span class="ats">' + $(this).find("author").find("name").text() + '</span> &raquo; <span>' + $(this).find("title").text() + '</span></span><span class="atst"">' + dateDiff+ '</span>');
				 
				var content = $(this).find("summary").text();
					content = $('<div class="unreaditem itemcontent"><span class="urib"></span><span class="uric"></span><div class="uricontent">'+content+'</div></div>');
				var a = $('<a  href="' + $(this).find("link").attr("href") + '" target="_blank"></a>');
					a.append(title).append(content);
					a.hover(function(){
						$(this).children().last().show();
					},function(){
						$(this).children().last().hide();
					});

				$('#igb_23_uricontent').append(a);
			});
			
			$('#igb_23_unread .gb_unread').html(count);
			$('#igb_23_unread').show();
			
			if(count === '0')
			$('#igb_23_unread').hide();
		}
	});
}
function showReadList(){
	GM_log('Show read list');
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'https://www.google.com/reader/api/0/stream/contents/user/-/state/com.google/reading-list?xt=user%2F-%2Fstate%2Fcom.google%2Fread&n=10&client=scroll',
		headers: {
			'Accept': 'text/javascript',
		},
		onload: function(responseDetails) {
			var RT = responseDetails.responseText;
			if(RT.match('xt.0'))return;
			var data1 = eval("("+RT+")");

			var items = data1.items;
			var count = items.length;
			if(count == 0){
				$('#igb_32_unread').hide();
			}else{
				var today = new Date();
				var offset = (today.getTimezoneOffset() / 60);
					today.setDate(today.getDate());
				var dateDiff;
				$('#igb_32_uricontent').empty();
				for (var i = 0; i < count; i++) {
					dateDiff = items[i].timestampUsec;
					dateDiff = new Date(parseInt(dateDiff,10)); //new Date(year, month, day, hours, minutes, seconds, milliseconds)
					dateDiff = timeDifference(today, dateDiff);
					
					var markread = $('<span class="gbqfb" data-id="'+items[i].id+'" style="position: absolute;right: 16px;top: 12px;height:16px;line-height: 16px;display:none;">Mark as read</span>');
						markread.click(function(event){  
							// do something 
							GM_log('This ID : '+this.getAttribute('data-id'));
							mark_items_read(this.getAttribute('data-id'),false);
							$(this).parent().hide(500);
							return false;
						})  
					var title = $('<span style="white-space: nowrap;width: 330px;padding: 8px 16px;padding-right: 104px;text-overflow: ellipsis;overflow: hidden;line-height: 27px;position: relative;display: block;"><span class="ats">' + items[i].origin.title + '</span> &raquo; <span>' + items[i].title + '</span></span><span class="atst">' + dateDiff+ '</span>');

					var content;
					if(items[i].summary){
						content = items[i].summary.content;
					}else if(items[i].content){
						content = items[i].content.content;
					}else{
						content = '';
					}
						content = $('<div class="unreaditem itemcontent"><span class="urib"></span><span class="uric"></span><div class="uricontent"><h1>'+items[i].title+'</h1><p>'+content+'</p></div></div>');
						content.click(function(event){return false;})
						
					var a = $('<a  data-id="'+items[i].id+'"href="' + items[i].alternate[0].href + '" target="_blank"></a>');
						a.append(title).append(markread).append(content);
						a.hover(function(){
							$(this).children('.itemcontent,.gbqfb').show();
						},function(){
							$(this).children('.itemcontent,.gbqfb').hide();
						});
					
					$('#igb_32_uricontent').append(a);
				}
			}
			
		}
	});
	
}
//Check unread conut
function checkUnreadCount() {
	GM_log('checkUnreadCount');
	
	showUnreadCount()
	showGmailList();
}

function initCount() {
	$('#gbzc').mouseenter(function(){checkUnreadCount();});
	if(document.getElementById('gb_32')){
		if(!document.getElementById('igb_32_unread')){
			$('#gb_32').append('<span id="igb_32_unread" class="gb_unreadbox"><span class="gb_unread">0</span><div id="igb_32_uri" class="unreaditem"><span class="urib"></span><span class="uric"></span><div id="igb_32_uricontent" class="uricontent"><p>Loading...</p></div></div></span>');
		}
		$('#igb_32_unread').hover(function() {$('#igb_32_uri').show();},function(){$('#igb_32_uri').hide();});
		$('#igb_32_unread .gb_unread').mouseenter(function() {showReadList();});
		//$('#igb_32_unread').mouseenter(function(){showReadList();$('#igb_32_uri').show();});
		//$('#igb_32_unread').mouseout(function(){$('#igb_32_uri').hide();});
	}
	//Gmail
	if(document.getElementById('gb_23')){
		if(!document.getElementById('igb_23_unread')){
			$('#gb_23').append('<span id="igb_23_unread" class="gb_unreadbox"><span class="gb_unread">0</span><div id="igb_23_uri" class="unreaditem"><span class="urib"></span><span class="uric"></span><div id="igb_23_uricontent" class="uricontent"><p>None</p></div></div></span>');
		}
		$('#igb_23_unread').hover(function() {clearInterval(timeout);$('#igb_23_uri').show();},function(){$('#igb_23_uri').hide();showGmailList();});
	}

	checkUnreadCount();	
}

function updateTips( t ) {
	var tips = $( ".validateTips" );
	tips
		.html( t )
		.addClass( "ui-state-highlight" );
	setTimeout(function() {
		tips.removeClass( "ui-state-highlight", 1500 );
	}, 500 );
}

function checkRegexp( o, regexp, n ) {
	if ( !( regexp.test( o.val() ) ) ) {
		o.addClass( "ui-state-error" );
		updateTips( n );
		return false;
	} else {
		return true;
	}
}

function saveset(){
	//save setting
	var i,as,json={};
	var list1 = [];
	var list2 = [];
	var tmpids = {};
	as = $('#gbzc a[id^="gb_"]');
	//GM_log('as');
	as.each(function(i){
		//
		if(!tmpids[this.id]){
			if(this.id != 'gb_add'){
				if(this.parentNode.parentNode.id === 'gbzc'){list1.push(this.id);}
				if(this.parentNode.parentNode.parentNode.id === 'gbdi'){list2.push(this.id);}
				if(this.parentNode.parentNode.id === 'gbdi'){list2.push(this.id);}
				//GM_log(this.id);
			}
		}
		tmpids[this.id] = true;
	});
	list2.push('gb_add');
	json.g=list1;
	json.m=list2;
	
	//GM_log('setData:'+JSON.stringify(json));
	GM_setValue('tng', JSON.stringify(json));
	
	//rederw
	
	//第二列
	
	var gbtem = $('#gbtem').clone(true);
	var gbdi = $('#gbdi').clone(true);
	gbdi.html('');
	gbdi.append('<div id="gbmb" style="visibility: hidden; "></div>');
	var n = list1.length;
	var h = Math.ceil(list2.length/n);
	for(var i = 0;i < h; i++){
		var tmp = $('<div id="gbm'+(i+1)+'" class="gbmasc"></div>');
		for(var j = 0; j < n; j++){
			if(i*n+j+1>list2.length){
				tmp.append('<span class="gbmasph"></span>');
			}else{
				tmp.append($('<span class="gbmtc"></span>').append($('#'+list2[i*n+j]).attr('class','gbmt')));
			}
		}
		gbdi.append(tmp);
	}
	gbdi.append(gbtem);
	
	//第一列
	var html1=[];
	$.each(list1, function(i, n){
		html1.push($('<li class="gbt"></li>').append($('#'+list1[i]).attr('class','gbzt')));
	});
	//GM_log('rederw'+ html1);
	
	$("#gbzc .gbt").remove();
	$.each(html1, function(i, n){$('#gbtm').before(n);});
	
	
	$("#gbdi").replaceWith(gbdi);
	$('#gbd').width(192*h+2);
	$('#gbd').height(44*(n+1));
	
	//
	$('.gbzt').mouseover(function(){
		$(this).attr('class','gbzt gbzt-hvr');
	}).mouseout(function(){
		$(this).removeClass("gbzt-hvr");
	});
	$('.gbmt').mouseover(function(){
		$(this).addClass("gbmt-hvr");
	}).mouseout(function(){
		$(this).removeClass("gbmt-hvr");
	});
}
//
function main(){
	
	var ServerList = $('#gbzc a[id^="gb_"]').clone(true);
	var Lists2 = $('#gbdi').clone(true);
	var localeData;
		localeData=GM_getValue('tng');
	GM_log('LocaleData:'+localeData);
	if(localeData){
		var data=JSON.parse(localeData);
		var html1 = [];
		var html2 = [];
		for(l = 0; l < data.g.length; l++){
			var gl = ServerList.filter('#'+data.g[l])[0];
			if(gl){
				$(gl).attr('class','gbzt');
				html1.push($('<li class="gbt"></li>').append($(gl)));
			}
			if(data.g[l].match('gb_i_')){
				var itemdata = JSON.parse(GM_getValue(data.g[l]));
				html1.push($('<li class="gbt"><a id="'+data.g[l]+'" href="'+itemdata.url+'" class="gbzt"><span style="background-image: url('+itemdata.icon+');background-position: 0 0;" class="gbtb2"></span><span class="gbts">'+itemdata.name+'</span></a></li>'));
			}
		}
		for(l = 0; l < data.m.length; l++){
			var ml = ServerList.filter('#'+data.m[l])[0];
			if(ml){
				$(ml).attr('class','gbmt');
				html2.push($('<span class="gbmtc"></span>').append($(ml)));
			}
			if(data.m[l].match('gb_i_')){
				var itemdata = JSON.parse(GM_getValue(data.m[l]));
				html2.push($('<span class="gbmtc"><a id="'+data.m[l]+'" href="'+itemdata.url+'" class="gbmt"><span style="background-image: url('+itemdata.icon+');background-position: 0 0;" class="gbtb2"></span><span class="gbts">'+itemdata.name+'</span></a></span>'));
			}
		}
		html2.push($('<span class="gbmtc"><a id="gb_add" class="gbmt"><span id="gbgsi" style="top: 15px;z-index: 1001;left: 25px;"></span><span class="gbts">Add</span></a></span>'));
		$('#gbm1').empty();
		$.each(html2, function(i, n){$('#gbm1').append(n);});
		
		$('#gbtm').removeClass("gbt");
		$("#gbzc .gbt").remove();
		$.each(html1, function(i, n){$('#gbtm').before(n);});
		
		saveset();
	}else{
		//default item
		$('#gbzc a[id^="gb_"]:last:parent').insertAfter('<span class="gbmtc"><a id="gb_add" class="gbmt"><span id="gbgsi" style="top: 15px;z-index: 1001;left: 25px;"></span><span class="gbts">Add</span></a></span>');
		saveset();
	}
	
	//GM_log('gbtm content:'+$( '#gbzc' ).html());
	
	$( '#gbzc' ).sortable({items: '.gbt,.gbmtc', opacity: 0.6, zIndex: 10000, forcePlaceholderSize: true, cancel: '#gbtem,#gb_add:parent'}); 
	$( '#gbzc' ).bind('sort', function(event, ui) {
		if(ui.placeholder.context.previousSibling && ui.placeholder.context.previousSibling.firstChild.id === 'gb_add'){
			//$(ui.helper.context.firstChild).children('.gbts').css('background','red');
			$(ui.placeholder.context).css('visibility','visible');
		}else{
			//$(ui.helper.context.firstChild).children('.gbts').css('background','');
			$(ui.placeholder.context).css('visibility','hidden');
		}
	});
	$( '#gbzc' ).bind('sortupdate', function(event, ui) {
			
		if(ui.item.context.previousElementSibling && ui.item.context.previousElementSibling.firstChild.id === 'gb_add' && ui.item.context.firstChild.id.match('gb_i_')){
		
			//del
			GM_log('del');
			$(ui.item.context.firstChild).children('.gbts').css('background','yellow');
			$(ui.item.context).remove();
			GM_deleteValue(ui.item.context.firstChild.id);
			
		}else{
		
			//item sortable
			GM_log('item sortable');
			$(ui.item.context.firstChild).children('.gbts').css('background','');
		}
		saveset();
		initCount();

	});
	
	//init dialog
	var iadd = $('<div id="dialog-form" title="Add Menu Items"><p class="validateTips">All form fields are required.</p><form><fieldset><label for="name">Name</label><input type="text" name="itemsname" id="itemsname" class="text ui-widget-content ui-corner-all" /><label for="password">Url</label><input type="text" name="itemsurl" id="itemsurl" value="" class="text ui-widget-content ui-corner-all" /><label for="email">Icon (32px * 32px, PNG)</label><input type="text" name="itemsicon" id="itemsicon" value="" class="text ui-widget-content ui-corner-all" /></fieldset></form><div id="imgresults"></div></div>')
	$('body').append(iadd);

	$('#itemsname').keyup(function(){
		var keys = $(this).val();
		if (keys.length > 2) {
			
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://ajax.googleapis.com/ajax/services/search/images?v=1.0&q='+keys+'+32&as_filetype=png&imgsz=icon&rsz=8',
				headers: {'Accept': 'text/json',},
				onload: function(responseDetails) {
					var json = eval("(" + responseDetails.responseText + ")");
					GM_log(json);
					$("#imgresults").empty();
					var results = json.responseData.results;
					for (var i = 0; i < results.length; i++) {
						var result = results[i];
						if(result.width == '32' && result.height == '32'){
							var imgDom = $('<img src="'+result.unescapedUrl+'"></img>');
								imgDom.click(function(){
									$('#itemsicon').val($(this).attr("src"));
								})
							$("#imgresults").append(imgDom);
						}
					}
					$("#imgresults").append($('<p>The results from google, for reference only</p>'));
				},
			});
		}
	});
	
	var name = $( "#itemsname" ),
		icon = $( "#itemsicon" ),
		url = $( "#itemsurl" ),
		allFields = $( [] ).add( name ).add( url ).add( icon );
	
	iadd.dialog({
			autoOpen: false,
			height: 390,
			width: 400,
			position: [30,71],
			modal: true,
			buttons: {
				"Create an item": function() {
					var bValid = true;
					allFields.removeClass( "ui-state-error" );

					bValid = bValid && checkRegexp( name, /([0-9a-z_!\-\s])+$/i, "Name may consist of a-z, 0-9, underscores, begin with a letter." );
					// From jquery.validate.js (by joern), contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
					bValid = bValid && checkRegexp( url,  /((http|https):\/\/([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)/ig, "Please enter a valid URL.</br> eg. http://www.google.com" );
					//https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=Facebook&as_filetype=jpg&imgsz=icon
					bValid = bValid && checkRegexp( icon, /((http|https):\/\/([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)/ig, "Please enter a valid icon URL.</br> eg. http://www.google.com/images/icons/product/search-32.png" );

					if ( bValid ) {
					
						//add item
						var newitem = {};
							newitem.name = name.val();
							newitem.icon = icon.val();
							newitem.url = url.val();
							newitem.id = 'gb_i_'+((name.val()).match(/[a-zA-Z0-9-_:\.]/g)).join('');
							
						$("#gbzc > li:last-child").before('<li class="gbt"><a id="'+newitem.id+'" href="'+url.val()+'" class="gbzt"><span style="background-image: url('+icon.val()+');background-position: 0 0;" class="gbtb2"></span><span class="gbts">'+name.val()+'</span></a></li>');

						GM_setValue(newitem.id, JSON.stringify(newitem));
						
						saveset();
						
						$( this ).dialog( "close" );
					}
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			},
			close: function() {
				allFields.val( "" ).removeClass( "ui-state-error" );
			}
	});

	$('#gb_add').click(function(){
		iadd.dialog( "open" );
		return false;
	});
	setTimeout(initCount, 0);
}

function init(){
	attemptCount += 1;
	if (attemptCount > 10) { // To stop the timers on "dumb" pages
		clearInterval(timer);
		return;
	}
	//no new bar
	var newbar = document.getElementById('gbz');
	if(!newbar)return;
	if(!(newbar.className).match("gbm"))return;
	clearInterval(timer);
	GM_log('init');
	get_session_token();
	main();
	updater.check();
}

timer = setInterval(init, 0);

	