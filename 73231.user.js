// ==UserScript==
// @name           تغییر دهنده کاربر تراویان
// @author		   وحید اسکندری - vahid_vision@yahoo.com  - ترجمه و تغییر : کیوان سهرابلو - k.sohrabloo.k@gmail.com
// @namespace      *.travian.*
// @version 	   1.0.1
// @include        http://*.travian.ir/*.php*
// @exclude        *forum.travian.*
// ==/UserScript==

function $e(aType, iHTML){var ret = document.createElement(aType); if (iHTML) ret.innerHTML = iHTML; return ret;};

function getServer(i){return GM_getValue('tuc_user_server_' + i,'ir');}; //Get server prefix
function getServerNu(i){return GM_getValue('tuc_user_servernumber_' + i,'6');}; //Get server number

function CreateCI(txt, fevent, ttitle){
	var ret = document.createElement('a');
	ret.setAttribute('style','cursor: pointer;');
	ret.title=ttitle;
	ret.appendChild(document.createTextNode(txt));
	ret.addEventListener('click', fevent, false);
	return ret;
}

function RemoveCookies(n){
	window.location = 'http://s' + n + '.travian.ir/login.php?del_cookie'
}

function Logout(n){
	window.location = 'http://s' + n + '.travian.ir/logout.php'
}

function CUser(name){
	if (!name) return;
	GM_setValue("tuc_data_un",name);
	var i=1;
	for (i=1;i<=10;i++){
		if (getUsers(i)==name){
			break;
		}
	}
	var n=getServerNu(i)
	
	Logout(n);
	RemoveCookies(n);
}

function Login(){
	var name=GM_getValue("tuc_data_un");
	if (!name)return;
	GM_setValue("tuc_data_un","");
	document.forms[0].elements.namedItem("name").value=name;
	var i=1;
	for (i=1;i<=10;i++){
		if (getUsers(i)==name){
			document.forms[0].elements.namedItem("password").value=GM_getValue('tuc_user_pass_' + i);
			document.forms[0].submit();
			break;
		}
	}
}

function setUser(name, pass, userver, servernu){
	if (!name) name=prompt("نام کاربری");
	if (!name) return;
	if (!pass) pass=prompt("رمز عبور");
	var i=1;
	for (i=1;i<=10;i++){
		if (getUsers(i)==name){
			if (!userver) userver='ir';
			if (!servernu) servernu=prompt("(... شماره سرور را وارد کنید (مانند 1، 2 و",GM_getValue('tuc_user_servernumber_' + i,'6'));
			GM_setValue('tuc_user_pass_' + i,pass);
			GM_setValue('tuc_settings_server',userver);
			GM_setValue('tuc_user_server_' + i,userver);
			GM_setValue('tuc_user_servernumber_' + i,servernu);
			alert(".تغییر یافت\"" + name + "\" کاربر");
			break;
		} else if (!getUsers(i)){
			if (!userver) userver='ir';
			if (!servernu) servernu=prompt("(... شماره سرور را وارد کنید (مانند 1، 2 و",'6');
			GM_setValue('tuc_user_name_' + i,name);
			GM_setValue('tuc_user_pass_' + i,pass);
			GM_setValue('tuc_user_server_' + i,userver);
			GM_setValue('tuc_user_servernumber_' + i,servernu);
			alert(".اضافه شد \"" + name + "\" کاربر");
			break;
		}
	}
	window.location.reload();
}

function delUser(name){
	if (!name) name=prompt("نام کاربری");
	if (!name) return;
	var i=1;
	for (i=1;i<=10;i++){
		if (getUsers(i)==name){
			GM_deleteValue('tuc_user_name_' + i);
			GM_deleteValue('tuc_user_pass_' + i);
			alert(".حذف شد \"" + name + "\" کاربر");
			window.location.reload();
			return;
		}
	}
	alert(".یافت نشد \"" + name + "\" کاربر");
}

function getUsers(nitem){
	var name = GM_getValue('tuc_user_name_' + nitem,'');
	return name;
}

function main(){
	table = document.evaluate('//div[@id="side_navi"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0); //assuming there is exactly one table
	
	var pra = $e('p');
	pra.appendChild($e('hr'));
	pra.appendChild($e('b', 'تغییر دهنده کاربر'));
	pra.appendChild($e('hr'));
	pra.appendChild(CreateCI("اضافه /  تغییر", function(){setUser()},""));
	pra.appendChild(CreateCI("حذف", function(){delUser()},""));
	pra.appendChild(CreateCI("درباره", function(){alert("کاری از وحید اسکندری\nEmail: vahid_vision@yahoo.com\nترجمه و تغییر از کیوان سهرابلو\nk.sohrabloo.k@gmail.com")},""));
	pra.appendChild($e('hr'));
	pra.appendChild($e('b', 'کاربر ها'));
	pra.appendChild($e('hr'));
	var i=1;
	for (i=1;i<=10;i++){
		var name=getUsers(i);
		if (name){
			pra.appendChild(CreateCI(name, function(){CUser(this.text)},getServer(i) + getServerNu(i)));
		}
	}
	
	table.appendChild(pra);
	window.addEventListener('load', Login, false);
}

main();
