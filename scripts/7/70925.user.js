// ==UserScript==
// @name           Travian User Changer
// @author		   Vahid Eskandar - vahid_vision@yahoo.com
// @namespace      *.travian.*
// @version 	   1.0.0
// @include        *.travian.*
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
	window.location = 'http://s' + n + '.travian.' + s + '/login.php?del_cookie'
}

function Logout(s, n){
	window.location = 'http://s' + n + '.travian.' + s + '/logout.php'
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
	if (!name) name=prompt("UserName?");
	if (!name) return;
	if (!pass) pass=prompt("Password?");
	var i=1;
	for (i=1;i<=10;i++){
		if (getUsers(i)==name){
			if (!userver) userver=prompt("What is your travian server prefix? (Example: com, ir, ...)",GM_getValue('tuc_user_server_' + i,'ir'));
			if (!servernu) servernu=prompt("What is your travian server number? (Example: 1, 2, ...)",GM_getValue('tuc_user_servernumber_' + i,'1'));
			GM_setValue('tuc_user_pass_' + i,pass);
			GM_setValue('tuc_settings_server',userver);
			GM_setValue('tuc_user_server_' + i,userver);
			GM_setValue('tuc_user_servernumber_' + i,servernu);
			alert("User (" + name + ") changed.");
			break;
		} else if (!getUsers(i)){
			if (!userver) userver=prompt("What is your travian server prefix? (Example: com, ir, ...)",'ir');
			if (!servernu) servernu=prompt("What is your travian server number? (Example: 1, 2, ...)",'1');
			GM_setValue('tuc_user_name_' + i,name);
			GM_setValue('tuc_user_pass_' + i,pass);
			GM_setValue('tuc_user_server_' + i,userver);
			GM_setValue('tuc_user_servernumber_' + i,servernu);
			alert("User (" + name + ") added.");
			break;
		}
	}
	window.location.reload();
}

function delUser(name){
	if (!name) name=prompt("UserName?");
	if (!name) return;
	var i=1;
	for (i=1;i<=10;i++){
		if (getUsers(i)==name){
			GM_deleteValue('tuc_user_name_' + i);
			GM_deleteValue('tuc_user_pass_' + i);
			alert("User (" + name + ") Deleted");
			window.location.reload();
			return;
		}
	}
	alert("User (" + name + ") Not Found");
}

function getUsers(nitem){
	var name = GM_getValue('tuc_user_name_' + nitem,'');
	return name;
}

function main(){
	table = document.evaluate('//div[@id="side_navi"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0); //assuming there is exactly one table
	
	var pra = $e('p');
	pra.appendChild($e('hr'));
	pra.appendChild(CreateCI("Add / Change", function(){setUser()},""));
	pra.appendChild(CreateCI("Remove", function(){delUser()},""));
	pra.appendChild(CreateCI("About", function(){alert("Created by Vahid Eskandar\nEmail: vahid_vision@yahoo.com")},""));
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
