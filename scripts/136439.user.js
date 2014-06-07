// ==UserScript==
// @name        ClapAlongForum Tools
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require     https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js
// @namespace   sols9.com
// @description Utilities for ClapAlong forum
// @include     http://forum.clapalong.com/*
// @version     1
// ==/UserScript==

$("#breadcrumb .floatcontainer").append('<li class="navbit" style="float:right;background-image:none"><a id="register">1-click Register</a></li>');
$("#breadcrumb .floatcontainer").append('<li class="navbit" style="float:right;background-image:none"><a href="private.php">Private Messages</a></li>');
$("#breadcrumb .floatcontainer").append('<li class="navbit" style="float:right;background-image:none"><a href="usercp.php">Settings</a></li>');
$("#breadcrumb .floatcontainer").append('<link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/>');
$("#navtabs").remove();
$("#navbar").remove();
$("#announcements").remove();
$(".footer").remove();
$(".cb").remove();
$(".claps_list").remove();
$("#forum_info_options").css('display', ''); //restore forum options

$(".l_42").remove(":contains('Claps')");
$(".l_42").remove(":contains('Upload')");




$("#register").on("click",function() {
  register();
});

//auto accept rules
var url = document.URL;
if (url = "http://forum.clapalong.com/misc.php?do=vsarules&doredir=1&cfrset=1")
{
	$('input[name=cafr_agree]').attr('checked', true);
	$('#agree_vsaafr').submit();
}

function genRandomString(len) {
	var chars = "0123456789abcdefghiklmnopqrstuvwxyz";
	var string_length = len;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
}

function register(){
	var msg = {
		'-1':'Please enter your Email.',
		'-2':'Please enter your password.',
		'-3':'Password doesn\'t match.',
		'-4':'Email already registered.',
		'-5':'Time out.'
		};
	var email = genRandomString(9)+"@yopmail.com";
	var password = genRandomString(12);
	
	var date = new Date();
	var key = date.getTime();
	
	var regurl='http://member.clapalong.com/register/reg/source/clapalong/utm_campaign/clapalong/email/'+email+'/pwd/'+password+'/repwd/'+password+'/callback/jsonpTempFunc.k'+key;
	
	var headers_get = {
		"Host":"member.clapalong.com",
		"User-agent":navigator.userAgent, 
		"Accept":"*/*", 
		"Accept-Language":"en-us,en;q=0.5",
		"Accept-Encoding":"gzip, deflate",
		"Connection": "keep-alive",
		"Referer": "http://www.clapalong.com/?action=user!reg&tpl=reg"
		};
	
	GM_xmlhttpRequest(
			{
				method: "GET",
				url: regurl,
				headers: headers_get,
				onerror: function (e) { alert("No Internet?"); },
				onload: function (e)
				{
					var response = e.responseText;
					var match = response.match(/\('(-?\d)'\)/i);
					var status = (match[1]);
					
					if (status<0) alert(msg['status']);
					else registered(email,password);
				}
			});
			
}

function registered(email,password)
{
	var date = new Date();
	var key = date.getTime();
	var $dialog = $('<div></div>')
		.html('Email: '+email+" | Password: "+password+"<br>Login url: http://member.clapalong.com/login/userlogin/email/"+email+"/password/"+password+"/callback/jsonpTempFunc.k"+key)
		.dialog({
			autoOpen: false,
			title: 'Sucessfully Registered',
			zIndex: 1100000
		});
	$dialog.dialog('open');
}