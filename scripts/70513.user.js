// ==UserScript==
// @name           FB Account Multi-Login
// @namespace      http://mesak.wablog.info 
// @description    Fast login your facebook account!
// @include		http://*.facebook.com/*
// @include		https://*.facebook.com/*
// @include		http://facebook.com/*
// @include		https://facebook.com/*
// @timestamp   1265809861
// @version 1.4
// ==/UserScript==
/*
	Thank Facebook Fixer author
	A lot of programs here, the source reference Facebook Fixer.
	
*/
var timestamp = 1265809861;
var user_Account = new Array();
var bodyClass = document.body.className.split(" ");
var setLang = GM_getValue("setLang");
var HOME_URL = "http://www.facebook.com/home.php";
var LOGIN_URL = HOME_URL;
var LOGOUT_URL = $x1('//a[contains(@href,"logout.php")]');
var postion ;
var indexClass;
//alert(LOGOUT_URL+"\n"+typeof(LOGOUT_URL));
if(LOGOUT_URL){
	var LOGOUT_URL = LOGOUT_URL.toString();
	postion = 'pageNav';
	indexClass = "";
}else{
	var LOGOUT_URL="";
	postion = 'fb_menubar_core';
	indexClass = "fb_menu";
}
//alert(LOGOUT_URL+"\n"+typeof(LOGOUT_URL));
//var appUserID = document.body.innerHTML.match(/app_content_[0-9]+/).toString().match(/\d+/g).toString();
var IMG_LOAD = 	'R0lGODlhEAAQALMPAHp6evf394qKiry8vJOTk83NzYKCgubm5t7e3qysrMXFxe7u7pubm7S0tKOjo////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCAAPACwAAAAAEAAQAAAETPDJSau9NRDAgWxDYGmdZADCkQnlU7CCOA3oNgXsQG2FRhUAAoWDIU6MGeSDR0m4ghRa'+
				'7JjIUXCogqQzpRxYhi2HILsOGuJxGcNuTyIAIfkECQgADwAsAAAAABAAEAAABGLwSXmMmjhLAQjSWDAYQHmAz8GVQPIESxZwggIYS0AIATYAvAdh8OIQJwRAQbJkdjAlUCA6KfU0VEmyGWgWnpNfcEAoAo6SmWtBUtCuk9gjwQKeQAeWYQAHIZICKBoKBncTEQAh+QQJ'+
				'CAAPACwAAAAAEAAQAAAEWvDJORejGCtQsgwDAQAGGWSHMK7jgAWq0CGj0VEDIJxPnvAU0a13eAQKrsnI81gqAZ6AUzIonA7JRwFAyAQSgCQsjCmUAIhjDEhlrQTFV+lMGLApWwUzw1jsIwAh+QQJCAAPACwAAAAAEAAQAAAETvDJSau9L4QaBgEAMWgEQh0CqALCZ0pB'+
				'KhRSkYLvM7Ab/OGThoE2+QExyAdiuexhVglKwdCgqKKTGGBgBc00Np7VcVsJDpVo5ydyJt/wCAAh+QQJCAAPACwAAAAAEAAQAAAEWvDJSau9OAwCABnBtQhdCQjHlQhFWJBCOKWPLAXk8KQIkCwWBcAgMDw4Q5CkgOwohCVCYTIwdAgPolVhWSQAiN1jcLLVQrQbrBV4'+
				'EcySA8l0Alo0yA8cw+9TIgAh+QQFCAAPACwAAAAAEAAQAAAEWvDJSau9WA4AyAhWMChPwXHCQRUGYARgKQBCzJxAQgXzIC2KFkc1MREoHMTAhwQ0Y5oBgkMhAAqUw8mgWGho0EcCx5DwaAUQrGXATg6zE7bwCQ2sAGZmz7dEAAA7';
var IMG_DEL =	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHMSURBVHjapFO/S0JRFP4UIUJIqMWgLQzalAyKIN4TxNXJoZaGIPwHXNMt/A+C1pZabKgQQd9kQ4pS0KBUi4MNNgT+ev54nXPeVTRoqQvfu+ee7zvnnnPvfQ7LsvCf4ZLvSZi/ScIpQScYv+g1QoGQEv15zk4wHo0k2BmJYJzNskB3XuTnkoyPQxKsNLwRnJTEycZwOJRgDAbgmdYF82hfmwSzzb4fGkni4DPoHu5K9sVw2I5wu9HNZKDagXDRKNBuy6Kbywm3ePlgSAUD0zQI+tftLdDrAa0WOIB8BYYEk4851rCWY1Qb1IJpYum6bNCsf97f0xZdoNHAUiwmYJt9zLFGaTFNMOj3ZbF882yQrX9ks0CnA9RqNshmH3OsmY1xqRampz21PR6g2bRtr3dOM6ubq+B9b1Uju7AWjwNvb3YVDLLZxxxrZmPkFurbK9NH4kskgHxeyHqpJLMvGLS3DYVQT6cnt2P4HluY3ILGpy3Bd3dy2i/F4uS0dbbldohjjbod+51wBU+bC5Z1dWZZBzsCXhM05hSviUbxrJU1cdJCZcMlTzng96NSrUqJZM89ZfJLizOaVKA2TEqC8rrjTz/T1quq4D/jW4ABAF7lQOO4C9PnAAAAAElFTkSuQmCC';
var AccMenuStyle =	'#fb_menubar_mua{ position:relative; }'+
					'#fb_menubar_mua:hover ul, #fbf-bookmarks:hover li { display:block; }'+
					// The following line is based on: #navAccountLink img
					'#fb_menubar_mua .img { background:url(/rsrc.php/z8S5R/hash/ez3x5cuc.png) no-repeat -137px 0; height:4px; left:5px; position:relative; top:-2px; width:7px; }'+
					// The following line is based on: #navAccount ul
					'#fb_menubar_mua ul { background:#fff;border:1px solid #333;border-bottom:2px solid #2d4486;display:none;margin-right:-1px;margin-top:-1px;min-width:200px;padding:10px 0 5px;position:absolute;right:0;_right:-1px;top:100%;*width:100%;_width:200px;z-index:1 }'+
					// The following line is based on: #navAccount ul a
					'#fb_menubar_mua ul a {color:#3a579a;display:block;font-weight:normal;height:auto;_margin-right:-25px;padding:4px 10px 5px;white-space:nowrap;*white-space:auto;_white-space:nowrap}'+
					// The following line is based on: #navAccount ul a:hover, #navAccount ul a:focus, #navAccount ul a:active
					'#fb_menubar_mua ul a:hover, #fbf-bookmarks ul a:focus, #fbf-bookmarks ul a:active {background:#6d84b4;border-bottom:1px solid #3b5998;border-top:1px solid #3b5998;color:#fff;padding:3px 10px 4px}'+
					// The following line is based on: #navAccount li
					'#fb_menubar_mua li {display:block;float:none}'+
					// The following line is based on: .openToggler #navAccountLink
					'#fb_menubar_mua:hover #fb_menubar-link {background-color:#fff;color:#333;height:22px;position:relative;z-index:3}'+
					'#fb_menubar_mua span img{position:relative; left:-10px; top:2px; width:16px;height:16px;}'+
					'.fb_menu #fb_menubar-link{color:#333;padding:5px;}'+
					'.fb_menu #fb_menubar-link:hover{color:#000;padding:5px;}';
GM_addStyle(AccMenuStyle);

	if (!GM_getValue)
	{
		alert(T('UPDATEGM'));
		return;
	}
	//default:
	var defaultLang = {
	'TITLE'					:'Multi-Login',
	'ADDACCOUNT'			:'Add Account',
	'ADDACCOUNTBUTTON'		:'Add Facebook Account.',
	'NAMENULL'				:'Usernames and passwords cannot contain commas.',
	'CLSACCOUNT'			:'Delete All Account',
	'CLSACCOUNTDOWN'		:'Clear finish!',
	'LOGINACCOUNT'			:'Login Account',
	'USERNICK'				:'User Nick:',
	'USERNAME'				:'User Account:',
	'USERPASS'				:'User Password:',
	'NONEED'				:'(Optional)',
	'SETTING'				:'Settings',
	'CTITLE'				:'Custom Title',
	'UPDATE'				:'Update Script',
	'NEEDUP'				:'New Version!',
	'LANGUAGE'				:'Default Language',
	'OK'					:'OK',
	'CANCEL'				:'Cancel',
	'UPDATEGM'				:'You need the newest version of Greasemonkey to run this script. Please upgrade.'
	}
	switch (setLang)
	{
		case "zh_hk":
		case "zh_tw":
			var faceLang = {
	'TITLE'					:'Multi-Login',
	'ADDACCOUNT'			:'Add Account',
	'ADDACCOUNTBUTTON'		:'Add Facebook Account.',
	'NAMENULL'				:'Usernames and passwords cannot contain commas.',
	'CLSACCOUNT'			:'Delete All Account',
	'CLSACCOUNTDOWN'		:'Clear finish!',
	'LOGINACCOUNT'			:'Login Account',
	'USERNICK'				:'User Nick:',
	'USERNAME'				:'User Account:',
	'USERPASS'				:'User Password:',
	'NONEED'				:'(Optional)',
	'SETTING'				:'Settings',
	'CTITLE'				:'Custom Title',
	'UPDATE'				:'Update Script',
	'NEEDUP'				:'New Version!',
	'LANGUAGE'				:'Default Language',
	'OK'					:'OK',
	'CANCEL'				:'Cancel',
	'UPDATEGM'				:'You need the newest version of Greasemonkey to run this script. Please upgrade.'
			}
		break;
		case "zh_cn":
			var faceLang = {
	'TITLE'					:'Multi-Login',
	'ADDACCOUNT'			:'Add Account',
	'ADDACCOUNTBUTTON'		:'Add Facebook Account.',
	'NAMENULL'				:'Usernames and passwords cannot contain commas.',
	'CLSACCOUNT'			:'Delete All Account',
	'CLSACCOUNTDOWN'		:'Clear finish!',
	'LOGINACCOUNT'			:'Login Account',
	'USERNICK'				:'User Nick:',
	'USERNAME'				:'User Account:',
	'USERPASS'				:'User Password:',
	'NONEED'				:'(Optional)',
	'SETTING'				:'Settings',
	'CTITLE'				:'Custom Title',
	'UPDATE'				:'Update Script',
	'NEEDUP'				:'New Version!',
	'LANGUAGE'				:'Default Language',
	'OK'					:'OK',
	'CANCEL'				:'Cancel',
	'UPDATEGM'				:'You need the newest version of Greasemonkey to run this script. Please upgrade.'
			}
		break;
		case "fr_fr":
			var faceLang = {
	'TITLE'					:'Multi-Login',
	'ADDACCOUNT'			:'Add Account',
	'ADDACCOUNTBUTTON'		:'Add Facebook Account.',
	'NAMENULL'				:'Usernames and passwords cannot contain commas.',
	'CLSACCOUNT'			:'Delete All Account',
	'CLSACCOUNTDOWN'		:'Clear finish!',
	'LOGINACCOUNT'			:'Login Account',
	'USERNICK'				:'User Nick:',
	'USERNAME'				:'User Account:',
	'USERPASS'				:'User Password:',
	'NONEED'				:'(Optional)',
	'SETTING'				:'Settings',
	'CTITLE'				:'Custom Title',
	'UPDATE'				:'Update Script',
	'NEEDUP'				:'New Version!',
	'LANGUAGE'				:'Default Language',
	'OK'					:'OK',
	'CANCEL'				:'Cancel',
	'UPDATEGM'				:'You need the newest version of Greasemonkey to run this script. Please upgrade.'
			}
		break;
		case "es_LA":
		case "es_ES":
			var faceLang = {
	'TITLE'					:'Multi-Login',
	'ADDACCOUNT'			:'Add Account',
	'ADDACCOUNTBUTTON'		:'Add Facebook Account.',
	'NAMENULL'				:'Usernames and passwords cannot contain commas.',
	'CLSACCOUNT'			:'Delete All Account',
	'CLSACCOUNTDOWN'		:'Clear finish!',
	'LOGINACCOUNT'			:'Login Account',
	'USERNICK'				:'User Nick:',
	'USERNAME'				:'User Account:',
	'USERPASS'				:'User Password:',
	'NONEED'				:'(Optional)',
	'SETTING'				:'Settings',
	'CTITLE'				:'Custom Title',
	'UPDATE'				:'Update Script',
	'NEEDUP'				:'New Version!',
	'LANGUAGE'				:'Default Language',
	'OK'					:'OK',
	'CANCEL'				:'Cancel',
	'UPDATEGM'				:'You need the newest version of Greasemonkey to run this script. Please upgrade.'
			}
		break;
	}
	var cTitle = GM_getValue("ctitle");
	if(cTitle){faceLang['TITLE'] = cTitle;}
	if(GM_getValue("update")){
		var d = new Date();
		var checktime = GM_getValue("LastUpdate");
		if(checktime - d.getTime() > 604800){
			FBFUpdateCheck(timestamp);
			GM_setValue("LastUpdate",d.getTime());
		}
		
	}
	$elem("li",'', {"id":"fb_menubar_mua","class":indexClass}, {},$(postion) );
	$elem("ul",'', {"id":"fb_menu_account_list"}, {}, $('fb_menubar_mua'))
	$elem("a", T('TITLE')+'<img src="http://static.ak.fbcdn.net/rsrc.php/z12E0/hash/8q2anwu7.gif" class="img" style="background:url(\'/rsrc.php/z8S5R/hash/ez3x5cuc.png\') no-repeat scroll -137px 0 transparent; height:4px; left:5px; position:relative; top:-2px; width:7px;">', {"href":"#","id":"fb_menubar-link"}, {"padding-right":"16px"}, $('fb_menubar_mua'));
	//registerMenuCommand(T('ADDACCOUNTBUTTON'), addAccountBox);
	LoadAccount();

	function FBFUpdateCheck(t) {
		// new: http://userscripts.org/scripts/source/63761.meta.js old: http://userscripts.org/scripts/review/63761
		GM_xmlhttpRequest({url:"http://userscripts.org/scripts/source/63761.meta.js",method:"GET",
				onload:function (r){
					var checktime = r.responseText.match(/@version\s+(\d+)/).toString().replace("@version ","");
					//alert(t+"\n"+checktime+"\n"+typeof(checktime));
					if(t != checktime){
						$('version').style.display = "";
					};
				}
		});
	}
	function registerMenuCommand(name, func) {
		if (typeof GM_registerMenuCommand !== 'undefined') { return GM_registerMenuCommand(name, func); }
	}
	function LoadAccount(){
		user_Account = GM_getValue("user_Account");
		$('fb_menu_account_list').innerHTML = null;	
		if (typeof(user_Account) != "undefined" && user_Account != "")
		{
			user_Account = user_Account.split(',');
			for( x in user_Account){
				var us = user_Account[x].split('|||');
				if(us[0]==""){var userAccName = us[1];}else{var userAccName = us[0];}
				var accItemLink = $elem("li",'',{} , {}, $('fb_menu_account_list'));
				$elem("span",'<img src="data:image/png;base64,'+IMG_DEL+'" border="0"/>',{"id":"del_"+x ,"style":"float:right;cursor:crosshair;"}, {}, accItemLink).addEventListener('click', function(){delAccount(this.id)}, false);
				$elem("a",userAccName,{"id":"us_"+x ,"href":"javascript://" ,"class":"fb_menu_item_link"}, {}, accItemLink).addEventListener('click', function(){changeAccount(this.id)}, false);
				}
		}
		$elem("li",'<div style="padding:2px 0 0; margin:2px 5px 0; border-top:1px solid #E0E0E0;"></div>',{} , {}, $('fb_menu_account_list'));
		$elem("li",'<a id="fbf-ADDACCOUNT">' + T('ADDACCOUNT')+'</a>',{} , {}, $('fb_menu_account_list')).addEventListener('click', addAccountBox, false);
		$elem("li",'<a id="fbf-CLSACCOUNT">' + T('CLSACCOUNT')+'</a>',{} , {}, $('fb_menu_account_list')).addEventListener('click', clsAccount, false);
		$elem("li",'<a id="fbf-SETTING">' + T('SETTING')+'</a>',{} , {}, $('fb_menu_account_list')).addEventListener('click', SettingBox, false);
		$elem("li",'<a href="http://userscripts.org/scripts/show/63761" target="_blank"><font color="red"><b>===['+ T('NEEDUP')+']===</b></font></a>',{"id":"version"} , {"display":"none"}, $('fb_menu_account_list'));
	}
	function changeAccount(id){
		var id = id.replace("us_","");
		var UserDate = user_Account[id].split('|||');
		var U = UserDate[1];
		var P = UserDate[2];
		var Msg = '<div class="generic_dialog_popup" style="top: 125px;">'+
					'	<div class="pop_container_advanced">'+
					'		<div id="pop_content" class="pop_content">'+
					'			<h2 class="dialog_title"><span>' + T('LOGINACCOUNT') + '</span>'+
					'			</h2>'+
					'			<div class="dialog_content">'+
					'				<div class="dialog_body" id="MsgBox" style="text-align:center"><img src="data:image/gif;base64,'+IMG_LOAD+'"></div>'+
					'			</div>'+
					'		</div>'+
					'	</div>'+
					'</div>';
		var LoginBox = $elem("div",Msg,{"class":"generic_dialog pop_dialog","id":"LoginBox"}, {}, document.body);
		if(LOGOUT_URL){
			var opt ={
				url: LOGOUT_URL,
				method: "HEAD",
				onload: function(response) {
					if(response.readyState == 4){
						LoginPage(response.statusText,U,P);
					}
				}
			}
			GM_xmlhttpRequest(opt);
		}else{
			LoginPage("OK",U,P);
		}
	}
	function LoginPage(STATE,U,P){
		if(STATE=="OK"){
			GM_xmlhttpRequest({
				url:LOGIN_URL,
				method:"HEAD",
				onload:function(response){
						LoginAct(response.responseText,U,P);
					}
				});
		}else{
			window.location.href = LOGIN_URL;
		}
	}
	function LoginAct(pageText,U,P){
		pageText = pageText.match("<form.+</form>").toString();
		 var LoginStyle = '.login_page .title_header{margin:0 0 10px 0;padding:0 0 10px 0}' + 
		 '.login_page .login_page_spacer{height:35px}' + 
		 '.login_page .title_header h2.no_icon{background:transparent none repeat scroll 0;margin:0;padding:0}' + 
		 '.login_page #loginform{clear:left;margin:auto;padding:15px 0;text-align:left;width:380px}' + 
		 '.login_page #loginform p{line-height:16px;margin:10px 0;text-align:left}' + 
		 '.login_page #loginform p.reset_password{margin-bottom:0;padding-bottom:0}' + 
		 '.login_page .apinote{margin:10px auto;width:450px;background:#fff}' + 
		 '.login_page .apinote h2{font-size:13px;margin-bottom:6px}' + 
		 '.login_page .dialog_buttons{background-color:#f2f2f2;border-top:1px solid #ccc;text-align:right;padding:8px 10px;margin:0 -40px}' + 
		 '.login_page .dialog_buttons .logged_in_as{float:left;width:240px;margin-top:3px;text-align:left}' + 
		 '.login_page .dialog_buttons .register_link{float:left;text-align:left;margin-top:4px;font-weight:bold}' + 
		 '.login_page #email{direction:ltr}' + 
		 '.login_page #booklet #content{padding:40px 40px 0 40px;float:none;width:auto}' + 
		 '.login_page #booklet #loginform{padding:20px 0;margin-bottom:5px}' + 
		 '.form_row{padding:0 0 8px 0;text-align:left}' + 
		 '.form_row label{display:block;float:left;padding:3px 0;width:100px}' + 
		 '.form_row input{margin:0}' + 
		 '.form_row .inputtext, .inputpassword{width:175px}' + 
		 '.form_row .checkbox{float:left;width:15px;margin:5px 4px 2px 0}' + 
		 '.persistent{color:#333;display:block;font-size:12px;font-weight:normal;line-height:16px;padding:3px 0 3px 100px}' + 
		 '#buttons{padding:5px 0 0 100px;text-align:left}' + 
		 '#buttons input{margin:0 2px 0 0}' + 
		 '#buttons label{float:none;width:auto}' + 
		 '.reset_password{padding-left:100px}' + 
		 '.reset_password label{float:none;font-weight:normal;width:auto}' + 
		 '.reset #content{padding:20px}' + 
		 '#bootloader_css_login_css { height: 42px; }';
		GM_addStyle(LoginStyle);
		$('MsgBox').innerHTML = pageText;
		$('email').value = U;
		$('pass').value = P;
		$('login_form').submit();
	}
	
	function SettingBox(){
	var Msg = '<div class="generic_dialog_popup" style="top: 125px;">'+
		'	<div class="pop_container_advanced">'+
		'		<div id="pop_content" class="pop_content">'+
		'			<h2 class="dialog_title"><span>' + T('SETTING') + '</span>'+
		'			</h2>'+
		'			<div class="dialog_content">'+
		'				<div class="dialog_body">'+
		'					<div class="clearfix"><table>'+
		'						<tr><td width="120">'+T('CTITLE')+'</td><td><input id="ctitle" type="text" name="ctitle" size="20" /></td></tr>'+
		'						<tr><td>'+T('UPDATE')+'</td><td><input type="checkbox" name="update" id="update" value="1" /></td></tr>'+
		'						<tr><td>'+T('LANGUAGE')+'</td><td><select name="setLang" id="setLang">'+LangSet()+'</select></td></tr>'+
		'					</table></div>'+
		'					<div class="dialog_buttons">'+
		'						<input class="inputsubmit" type="button" name="ok" id="ok" value="'+T('OK')+'"/>'+
		'						<input class="inputsubmit inputaux" type="button" name="cancel" id="cancel"  value="'+T('CANCEL')+'"/>'+
		'					</div>'+
		'				</div>'+
		'			</div>'+
		'		</div>'+
		'	</div>'+
		'</div>';
		var addBox = $elem("div",Msg,{"class":"generic_dialog pop_dialog","id":"addBox"}, {}, document.body);
		$('ok').addEventListener('click', function(){
			//alert($('setLang').value+"+"+$('update').checked+"+"+$('ctitle').value);
			GM_setValue("setLang",$('setLang').value);
			GM_setValue("update",$('update').value);
			GM_setValue("ctitle",$('ctitle').value);
			addBox.parentNode.removeChild(addBox);
		}, false);
		$('cancel').addEventListener('click', function(){addBox.parentNode.removeChild(addBox);}, false);
	}
	function LangSet(){
		var lang = {"zh_tw":"繁體中文","zh_cn":"简体中文","fr_fr":'Français',"es_ES":'Español',"en_US":'English'};
		var temp=""; //selected 
		for (x in lang){
			var selected = (setLang == x)?"selected":"";
			temp += '<option value="'+x+'" '+selected+'>'+lang[x]+'</option>'
		}
		return temp;
	}
	function delAccount(id){
		var id = id.replace("del_","");
		ArrrRemove(user_Account,id);
		GM_setValue('user_Account', user_Account.toString());
		LoadAccount();
	}
	function clsAccount(){
		GM_setValue("user_Account","");
		alert(T('CLSACCOUNTDOWN'));
		LoadAccount();
	}
	function addAccountBox(){
		var Msg = '<div class="generic_dialog_popup" style="top: 125px;">'+
		'	<div class="pop_container_advanced">'+
		'		<div id="pop_content" class="pop_content">'+
		'			<h2 class="dialog_title"><span>' + T('ADDACCOUNT') + '</span>'+
		'			</h2>'+
		'			<div class="dialog_content">'+
		'				<div class="dialog_body">'+
		'					<div class="clearfix"><table>'+
		'						<tr><td>'+T('USERNICK')+'</td><td><input id="usernicks" type="text" autocomplete="off" name="usernicks" size="20" />'+T('NONEED')+'</td></tr>'+
		'						<tr><td>'+T('USERNAME')+'</td><td><input id="usernames" type="text" autocomplete="off" name="usernames" size="20" /></td></tr>'+
		'						<tr><td>'+T('USERPASS')+'</td><td><input id="passwords" type="password" name="passwords" size="20" /></td></tr>'+
		'					</table></div>'+
		'					<div class="dialog_buttons">'+
		'						<input class="inputsubmit" type="button" name="ok" id="ok" value="'+T('OK')+'"/>'+
		'						<input class="inputsubmit inputaux" type="button" name="cancel" id="cancel"  value="'+T('CANCEL')+'"/>'+
		'					</div>'+
		'				</div>'+
		'			</div>'+
		'		</div>'+
		'	</div>'+
		'</div>';
		var addBox = $elem("div",Msg,{"class":"generic_dialog pop_dialog","id":"addBox"}, {}, document.body);
		$('ok').addEventListener('click', function(){addAccount();}, false);
		$('cancel').addEventListener('click', function(){addBox.parentNode.removeChild(addBox);}, false);
	}
	function addAccount(){
		var n = $('usernicks').value;
		var u = $('usernames').value;
		var p = $('passwords').value;
		if (u != null && p != null){
			if ((u.indexOf(',') != -1) || (p.indexOf(',') != -1)){
				alert( T('NAMENULL'));
			}else{
					var newAccount = n + "|||" + u + "|||" + p;
					var uA = GM_getValue('user_Account') + ',' + newAccount;
					if (uA.indexOf(',') == 0){uA = uA.replace(",","");}
					GM_setValue('user_Account', uA);
					LoadAccount();
			}
			
		}
		$('addBox').parentNode.removeChild($('addBox'));
	}
	function T(texto)
	{
		texto = texto.toUpperCase();
		try 
		{
			return faceLang[texto] == undefined ? defaultLang[texto] : faceLang[texto];
		} 
		catch (e) 
		{
			return '!' + texto + '!';
		}
	}
	// Parse a date
	// Get element by id
	function $(id,root){return root ? root.getElementById(id) : document.getElementById(id);}
	// Get element(s) by class name
	function $c(className,root){
		if (document.getElementsByClassName) {
			return root ? root.getElementsByClassName(className) : document.getElementsByClassName(className);
		} else {
			var elms = $x('//*[contains(@class,"'+className+'")]',root);
			var buffer = new Array();
			for (var i=0; i<elms.snapshotLength; i++) { buffer.push(elms.snapshotItem(i)); }
			return buffer;
		}
	}
	function $x1(xpath,root) { return document.evaluate(xpath,(root?root:document),null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; }
	function $c1(className,root){
		if (document.getElementsByClassName) { return root ? root.getElementsByClassName(className)[0] : document.getElementsByClassName(className)[0]; }
		else { return $x1('//*[contains(@class,"'+className+'")][1]',root); }
	}
	function $elem(tag, content, attributes, style, parent)
	{
		var ret = document.createElement(tag);
		if (content) 
			ret.innerHTML = content;
		
		if (attributes) 
			for (a in attributes) 
				ret.setAttribute(a, attributes[a]);
		
		if (style) 
			for (a in style) 
				ret.style[a] = style[a];
		
		if (parent) 
		{
			parent = (typeof(parent) == 'string') ? get(parent) : parent;
			parent.appendChild(ret);
		}
		return ret;
	}
	function ArrrRemove(arr,key){
		arr.splice(key,1);
	}
	if(!setLang){
		for(x in bodyClass){
			if(bodyClass[x].indexOf("Locale") != -1){
				setLang = bodyClass[x].toLowerCase().replace("locale_","");
				GM_setValue("setLang",setLang);
				
			}
		}
	}