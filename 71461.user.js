// ==UserScript==
// @name           Travian User Changer
// @author		   Chvanikoff aka The Best (author of the original source is undefined)
// @namespace      *.travian.*
// @version 	   1.0.4
// @include        http://*.travian*.*/*.php*
// @exclude        *forum.travian.*
// ==/UserScript==

function $e(aType, iHTML){var ret = document.createElement(aType); if (iHTML) ret.innerHTML = iHTML; return ret;};

function getServer(i){return GM_getValue('tuc_user_server_' + i,'ir');}; //Get server prefix
function getServerNu(i){return GM_getValue('tuc_user_servernumber_' + i,'1');}; //Get server number

function CreateCI(txt, fevent, ttitle){
	var ret = document.createElement('a');
	ret.setAttribute('style','cursor: pointer;');
	ret.title=ttitle;
	ret.appendChild(document.createTextNode(txt));
	ret.addEventListener('click', fevent, false);
	return ret;
}

function RemoveCookies(s, n){
    n = (n == 'speed') ? 'speed' : ''+n;
	window.location = 'http://' + n + '.travian.' + s + '/login.php'
}

function Logout(s, n){
    n = (n == 'speed') ? 'speed' : 's'+n;
	window.location = 'http://' + n + '.travian.' + s + '/logout.php'
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
	var s=getServer(i)
	var n=getServerNu(i)
	
	Logout(s,n);
	RemoveCookies(s,n);
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
	if (!name) name=prompt("إسم العضوية ؟");
	if (!name) return;
	if (!pass) pass=prompt("الرقم السري ؟");
	var i=1;
	for (i=1;i<=10;i++){
		if (getUsers(i)==name){
			if (!userver) userver=prompt("ماهو سيرفر العضوية ؟ مثال (ae , com.sa)",GM_getValue('tuc_user_server_' + i,'org'));
			if (!servernu) servernu=prompt("ماهو رقم السيرفر ؟ مثال (s1 , speed1) (السوري = Sy1 , Sy2 ..إلخ)",GM_getValue('tuc_user_servernumber_' + i,'1'));
			GM_setValue('tuc_user_pass_' + i,pass);
			GM_setValue('tuc_settings_server',userver);
			GM_setValue('tuc_user_server_' + i,userver);
			GM_setValue('tuc_user_servernumber_' + i,servernu);
			alert("الحساب (" + name + ") تم تغييره.");
			break;
		} else if (!getUsers(i)){
			if (!userver) userver=prompt("ماهو سيرفر العضوية ؟ مثال (ae , com.sa)",'org');
			if (!servernu) servernu=prompt("ماهو رقم السيرفر ؟ مثال (s1 , speed1) (السوري = Sy1 , Sy2 ..إلخ)",'1');
			GM_setValue('tuc_user_name_' + i,name);
			GM_setValue('tuc_user_pass_' + i,pass);
			GM_setValue('tuc_user_server_' + i,userver);
			GM_setValue('tuc_user_servernumber_' + i,servernu);
			alert("الحساب (" + name + ") تم إضافته.");
			break;
		}
	}
	window.location.reload();
}

function delUser(name){
	if (!name) name=prompt("إسم العضوية ؟");
	if (!name) return;
	var i=1;
	for (i=1;i<=10;i++){
		if (getUsers(i)==name){
			GM_deleteValue('tuc_user_name_' + i);
			GM_deleteValue('tuc_user_pass_' + i);
			alert("الحساب (" + name + ") تم إزالته");
			window.location.reload();
			return;
		}
	}
	alert("الحساب (" + name + ") غير موجود");
}

function getUsers(nitem){
	var name = GM_getValue('tuc_user_name_' + nitem,'');
	return name;
}

function main(){
	table = document.evaluate('//div[@id="side_navi"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0); //assuming there is exactly one table
	
	var pra = $e('p');
    pra.appendChild($e('hr'));
    pra.appendChild($e('b', 'User Changer'));
	pra.appendChild($e('hr'));
	pra.appendChild(CreateCI("إضافة عضوية", function(){setUser()},""));
	pra.appendChild(CreateCI("إزالة عضوية", function(){delUser()},""));
	pra.appendChild(CreateCI("عـنَّـا", function(){alert("تم التعريب بواسطة Ăł.ĬvĬłҜ حصرياً Ar-Travian.com")},""));
    pra.appendChild($e('hr'));
    pra.appendChild($e('b', 'العضويات'));
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