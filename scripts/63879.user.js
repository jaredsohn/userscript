// ==UserScript==
// @name           FB Multi comptes
// @namespace      Staffy based on http://mesak.wablog.info 
// @description    Fast login your facebook account!
// @include		http://*.facebook.com/*
// @include		https://*.facebook.com/*
// @include		http://facebook.com/*
// @include		https://facebook.com/*
// @version 1.1
// ==/UserScript==
var user_Account = new Array();
var bodyClass = document.body.className.split(" ");
var setLang = GM_getValue("setLang");
var HOME_URL = "http://www.facebook.com/home.php";
var LOGIN_URL = HOME_URL;
if($('fb_menu_logout')){
	var LOGOUT_URL = $('fb_menu_logout').firstChild.getAttribute("href");
}

var LOGIN_OBJ
//var appUserID = document.body.innerHTML.match(/app_content_[0-9]+/).toString().match(/\d+/g).toString();
var IMG_LOAD = 	'R0lGODlhEAAQALMPAHp6evf394qKiry8vJOTk83NzYKCgubm5t7e3qysrMXFxe7u7pubm7S0tKOjo////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCAAPACwAAAAAEAAQAAAETPDJSau9NRDAgWxDYGmdZADCkQnlU7CCOA3oNgXsQG2FRhUAAoWDIU6MGeSDR0m4ghRa'+
				'7JjIUXCogqQzpRxYhi2HILsOGuJxGcNuTyIAIfkECQgADwAsAAAAABAAEAAABGLwSXmMmjhLAQjSWDAYQHmAz8GVQPIESxZwggIYS0AIATYAvAdh8OIQJwRAQbJkdjAlUCA6KfU0VEmyGWgWnpNfcEAoAo6SmWtBUtCuk9gjwQKeQAeWYQAHIZICKBoKBncTEQAh+QQJ'+
				'CAAPACwAAAAAEAAQAAAEWvDJORejGCtQsgwDAQAGGWSHMK7jgAWq0CGj0VEDIJxPnvAU0a13eAQKrsnI81gqAZ6AUzIonA7JRwFAyAQSgCQsjCmUAIhjDEhlrQTFV+lMGLApWwUzw1jsIwAh+QQJCAAPACwAAAAAEAAQAAAETvDJSau9L4QaBgEAMWgEQh0CqALCZ0pB'+
				'KhRSkYLvM7Ab/OGThoE2+QExyAdiuexhVglKwdCgqKKTGGBgBc00Np7VcVsJDpVo5ydyJt/wCAAh+QQJCAAPACwAAAAAEAAQAAAEWvDJSau9OAwCABnBtQhdCQjHlQhFWJBCOKWPLAXk8KQIkCwWBcAgMDw4Q5CkgOwohCVCYTIwdAgPolVhWSQAiN1jcLLVQrQbrBV4'+
				'EcySA8l0Alo0yA8cw+9TIgAh+QQFCAAPACwAAAAAEAAQAAAEWvDJSau9WA4AyAhWMChPwXHCQRUGYARgKQBCzJxAQgXzIC2KFkc1MREoHMTAhwQ0Y5oBgkMhAAqUw8mgWGho0EcCx5DwaAUQrGXATg6zE7bwCQ2sAGZmz7dEAAA7';
var IMG_DEL = 	'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADtSURBVHjajFC7DkFREJy9iXg0t+EHRKJDJSqRuIVaJT7AF+jR+xuNRiJyS8WlRaHWeOU+kBy7eyKhs8lk'+
				'JrOzZ3OWzMAD15gxYhB+yzAm0ndez+eYMYLngdkIf2vpSYbCfsNkOx07n8kgWa1UpptNII5VR/M56Nyt6Qq33bbhQsHy6aR0WSyEyEmiCG6vR2ffB65X4HCwYC2e9CTjJGGok4/7Hcjl+ImLBWv1uCRDu3peV5eGQ2C5/P1zq4X9dGpXP+LYhmYz4HbDMQgUosWTnmQo'+
				'KKf0htVKBZvtFsx6S9bm48ktaV3EXwd/CzAAVjt+gHT5me0AAAAASUVORK5CYII=';
//var IMG_DEL_16 =	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHMSURBVHjapFO/S0JRFP4UIUJIqMWgLQzalAyKIN4TxNXJoZaGIPwHXNMt/A+C1pZabKgQQd9kQ4pS0KBUi4MNNgT+ev54nXPeVTRoqQvfu+ee7zvnnnPvfQ7LsvCf4ZLvSZi/ScIpQScYv+g1QoGQEv15zk4wHo0k2BmJYJzNskB3XuTnkoyPQxKsNLwRnJTEycZwOJRgDAbgmdYF82hfmwSzzb4fGkni4DPoHu5K9sVw2I5wu9HNZKDagXDRKNBuy6Kbywm3ePlgSAUD0zQI+tftLdDrAa0WOIB8BYYEk4851rCWY1Qb1IJpYum6bNCsf97f0xZdoNHAUiwmYJt9zLFGaTFNMOj3ZbF882yQrX9ks0CnA9RqNshmH3OsmY1xqRampz21PR6g2bRtr3dOM6ubq+B9b1Uju7AWjwNvb3YVDLLZxxxrZmPkFurbK9NH4kskgHxeyHqpJLMvGLS3DYVQT6cnt2P4HluY3ILGpy3Bd3dy2i/F4uS0dbbldohjjbod+51wBU+bC5Z1dWZZBzsCXhM05hSviUbxrJU1cdJCZcMlTzng96NSrUqJZM89ZfJLizOaVKA2TEqC8rrjTz/T1quq4D/jW4ABAF7lQOO4C9PnAAAAAElFTkSuQmCC';
var IMG_BUTTON ='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';
var AccMenuStyle = 	'.fb_menu_dropdown .acc_addimg small{background:transparent url(data:image/png;base64,'+IMG_BUTTON+') no-repeat -17px top}\n'+
					'.fb_menu_dropdown .acc_accimg small{background:transparent url(data:image/png;base64,'+IMG_BUTTON+') no-repeat -17px -16px}\n'+
					'.fb_menu_dropdown .acc_clsimg small{background:transparent url(data:image/png;base64,'+IMG_BUTTON+') no-repeat -17px -32px}\n'+
					'.fb_menu_dropdown .acc_addimg .fb_menu_item_link:hover small{background-position:left top}\n'+
					'.fb_menu_dropdown .acc_accimg .fb_menu_item_link:hover small{background-position:left -16px}\n'+
					'.fb_menu_dropdown .acc_clsimg .fb_menu_item_link:hover small{background-position:left -32px}\n';
GM_addStyle(AccMenuStyle);

	if (!GM_getValue)
	{
		alert(T('UPDATEGM'));
		return;
	}
	//LangSel(setLang);
	//Start();
	//function LangSel(setLang){
	
		switch (setLang)
		{
			case "zh-tw":
				var faceLang = {
				'ADDACCOUNT'			:'新增帳號',
				'ADDACCOUNTBUTTON'		:'新增 Facebook 帳號',
				'NAMENULL'				:'帳號密碼格式輸入錯誤！',
				'CLSACCOUNT'			:'清空 Facebook 帳號',
				'CLSACCOUNTDOWN'		:'清空完畢！',
				'LOGINACCOUNT'			:'登入帳號',
				'USERNICK'				:'名稱：',
				'USERNAME'				:'帳號：',
				'USERPASS'				:'密碼：',
				'NONEED'				:'(選填)',
				'OK'					:'確定',
				'CANCEL'				:'取消',
				'UPDATEGM'				:'你需要更新你的 Greasemonkey 元件！'
				}
			break;
			case "zh-cn":
				var faceLang = {
				'ADDACCOUNT'			:'添加帐号',
				'ADDACCOUNTBUTTON'		:'添加 Facebook 帐号',
				'NAMENULL'				:'帐号密码格式输入错误！',
				'CLSACCOUNT'			:'清除 Facebook 帐号',
				'CLSACCOUNTDOWN'		:'清除完毕！',
				'LOGINACCOUNT'			:'登入帐号',
				'USERNICK'				:'名称：',
				'USERNAME'				:'帐号：',
				'USERPASS'				:'密码：',
				'NONEED'				:'(选填)',
				'OK'					:'确定',
				'CANCEL'				:'取消',
				'UPDATEGM'				:'你需要更新你的 Greasemonkey 元件！'
				}
			break;
			default:
				var faceLang = {
				'ADDACCOUNT'			:'Ajouter un compte',
				'ADDACCOUNTBUTTON'		:'Nouveau compte Facebook',
				'NAMENULL'				:'Compte format de mot de passe, typo! ',
				'CLSACCOUNT'			:'Supprimer vos comptes Facebook',
				'CLSACCOUNTDOWN'		:'Effacement terminer! ',
				'LOGINACCOUNT'			:'ID de connexion',
				'USERNICK'				:'Nom:',
				'USERNAME'				:'Nom d\'utilisateur: ',
				'USERPASS'				:'Mot de passe:',
				'NONEED'				:'(Optionnel)',
				'OK'					:'OK',
				'CANCEL'				:'Annuler',
				'UPDATEGM'				:'Vous devez mettre à jour vos composants Greasemonkey! '
				}
			break;
			case "us":
				var faceLang = {
				'ADDACCOUNT'			:'Add Account',
				'ADDACCOUNTBUTTON'		:'Add Facebook Account.',
				'NAMENULL'				:'Usernames and passwords cannot contain commas.',
				'CLSACCOUNT'			:'Empty Account',
				'CLSACCOUNTDOWN'		:'Clear finish!',
				'LOGINACCOUNT'			:'Login Account',
				'USERNICK'				:'User Nick:',
				'USERNAME'				:'User Account:',
				'USERPASS'				:'User Password:',
				'NONEED'				:'(Optional)',
				'OK'					:'OK',
				'CANCEL'				:'Cancel',
				'UPDATEGM'				:'You need the newest version of Greasemonkey to run this script. Please upgrade.'
				}
			break;
		}
		
	//}
	//function Start(){
		//hovered
		if($('fb_menu_account') == null){
			$elem("ul",'', {"class": "fb_menu_list","id":"fb_menubar_mua"}, {}, $('fb_menubar'));
			$elem("li",'<a style="" href="#" class="fb_menu_link">FB Multi comptes</a>', {"class": "fb_menu","id":"fb_menu_account"}, {}, $('fb_menubar_mua'))
			$('fb_menu_account').addEventListener('mouseover', function(){this.setAttribute("class","fb_menu hovered");}, false);
			$('fb_menu_account').addEventListener('mouseout', function(){this.setAttribute("class","fb_menu");}, false);
		}

			var t0 = $elem("div",'', {"class": "fb_menu_dropdown clearfix","id":"fb_menu_Account_dropdown"}, {}, $('fb_menu_account'));
			var accountList = $elem("div",'',{"id":"accountList"}, {}, t0);
			var t2 = $elem("div",'',{"class": "fb_menu_separator"}, {}, t0);
			var t1 = $elem("div",'',{"class": "fb_menu_item acc_addimg","id":"ADDACCOUNT"}, {}, t0);
			var t2 = $elem("a","<small> </small>"+ T('ADDACCOUNT') ,{"class":"fb_menu_item_link"}, {}, t1).addEventListener('click', addAccountBox, false);
			var t1 = $elem("div",'',{"class": "fb_menu_item acc_clsimg","id":"CLSACCOUNT"}, {}, t0);
			var t3 = $elem("a","<small> </small>"+ T('CLSACCOUNT') ,{"class":"fb_menu_item_link"}, {}, t1).addEventListener('click', clsAccount, false);
			registerMenuCommand(T('ADDACCOUNTBUTTON'), addAccountBox);
			LoadAccount();
	//}
	function registerMenuCommand(name, func) {
		if (typeof GM_registerMenuCommand !== 'undefined') { return GM_registerMenuCommand(name, func); }
	}
	function LoadAccount(){
		user_Account = GM_getValue("user_Account");
		accountList.innerHTML = null;
		if (typeof(user_Account) != "undefined" && user_Account != "")
		{
			user_Account = user_Account.split(',');
			for( x in user_Account){
				var us = user_Account[x].split('|||');
				if(us[0]==""){var userAccName = us[1];}else{var userAccName = us[0];}
				var accItemLink = $elem("a",'',{"class":"fb_menu_item acc_accimg"} , {}, accountList);
				$elem("a",'<img src="data:image/png;base64,'+IMG_DEL+'" border="0"/>',{"id":"del_"+x ,"style":"float:right;margin:-18px 6px; 0 0"}, {}, accountList).addEventListener('click', function(){delAccount(this.id)}, false);
				$elem("div","<small>  </small>"+userAccName,{"id":"us_"+x ,"class":"fb_menu_item_link"}, {}, accItemLink).addEventListener('click', function(){changeAccount(this.id)}, false);			}
		}
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
		'						<tr><td>Compte：</td><td><input id="usernicks" type="text" autocomplete="off" name="usernicks" size="20" />(Option)</td></tr>'+
		'						<tr><td>Email：</td><td><input id="usernames" type="text" autocomplete="off" name="usernames" size="20" /></td></tr>'+
		'						<tr><td>Pass：</td><td><input id="passwords" type="password" name="passwords" size="20" /></td></tr>'+
		'					</table></div>'+
		'					<div class="dialog_buttons">'+
		'						<input class="inputsubmit" type="button" name="ok" id="ok" value="Oui"/>'+
		'						<input class="inputsubmit inputaux" type="button" name="cancel" id="cancel"  value="Non"/>'+
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
			return faceLang[texto] == undefined ? '!' + texto + '!' : faceLang[texto];
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
	for(x in bodyClass){
		if(bodyClass[x].indexOf("Locale") != -1){
			setLang = bodyClass[x].toLowerCase().replace("locale_","");
			GM_setValue("setLang",setLang);
		}
	}