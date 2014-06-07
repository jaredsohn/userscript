// ==UserScript==
// @name           Travian User Changer
// @author		   Vahid Eskandar - vahid_vision@yahoo.com
// @author         Update by Dream1 // منصور العتيبي
// @namespace      *.travian.*
// @version 	   2.0.0
// @include        *.travian.*
// @exclude        *forum.travian.*
// ==/UserScript==


mlang="com";
checkLang();

switch (mlang) {
        case "com":default:
                titlestring = ["UserName?", "Password?","What is your travian server prefix? (Example: com, ir, ...)","What is your travian server number? (Example: 1, 2, ...)","What is your travian server kind? (Example: tx, tc, ...)","User","changed","added","Deleted","Not Found","Travian User Changer","Add","Change","Remove","About"];
                break;
        case "ae":
        case "sa":
        case "sy":
        case "eg":
                titlestring = ["أسم المستخدم؟", "كلمة المرور؟","ماهو اختصار السيرفر؟ (على سبيل المثال: com, ae, ...)","ماهو رقم السيرفر؟ (على سبيل المثال: 1, 2, ...)","ماهو نوع السيرفر؟ (على سبيل المثال: tx, tc, ...)","اسم المستخدم","تم تعديله","تم اضافته","تم حذفه","غير موجود",
                "التنقل بين العضويات","أضافة","تغيير","حذف","حول"];
                break;
                
}

function $e(aType, iHTML){var ret = document.createElement(aType); if (iHTML) ret.innerHTML = iHTML; return ret;};

function getServer(i){return GM_getValue('tuc_user_server_' + i,'ir');}; //Get server prefix
function getServerNu(i){return GM_getValue('tuc_user_servernumber_' + i,'1');}; //Get server number
function getServerKi(i){return GM_getValue('tuc_user_serverkind_' + i,'tx');}; //Get server number

function CreateCI(txt, fevent, ttitle){
	var li = document.createElement("li");
	var ret = document.createElement('a');
	ret.setAttribute('style','color:#555; cursor: pointer;');
	ret.title=ttitle;
	ret.appendChild(document.createTextNode(txt));
	ret.addEventListener('click', fevent, false);
	li.appendChild(ret);
	return li;
}

function RemoveCookies(s, n, t){
	window.location = 'http://'+ t + n + '.travian.' + s + '/login.php?del_cookie'
}

function Logout(s, n, t){
	window.location = 'http://' + t + n + '.travian.' + s + '/logout.php'
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
	var t=getServerKi(i)
	var n=getServerNu(i)
	
	Logout(s,n,t);
	RemoveCookies(s,n,t);
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

function setUser(name, pass, userver, servernu, serverki){
	if (!name) name=prompt(titlestring[0]);
	if (!name) return;
	if (!pass) pass=prompt(titlestring[1]);
	var i=1;
	for (i=1;i<=10;i++){
		if (getUsers(i)==name){
			if (!userver) userver=prompt(titlestring[2],GM_getValue('tuc_user_server_' + i,'ir'));
			if (!servernu) servernu=prompt(titlestring[3],GM_getValue('tuc_user_servernumber_' + i,'1'));
			if (!serverki) serverki=prompt(titlestring[4],GM_getValue('tuc_user_serverkind_' + i,'tx'));
			GM_setValue('tuc_user_pass_' + i,pass);
			GM_setValue('tuc_settings_server',userver);
			GM_setValue('tuc_user_server_' + i,userver);
			GM_setValue('tuc_user_servernumber_' + i,servernu);
			GM_setValue('tuc_user_serverkind_' + i,serverki);
			alert(titlestring[5] +" (" + name + ") "+titlestring[6]+".");
			break;
		} else if (!getUsers(i)){
			if (!userver) userver=prompt(titlestring[2],'ir');
			if (!servernu) servernu=prompt(titlestring[3],'1');
			if (!serverki) serverki=prompt(titlestring[4],'tx');
			GM_setValue('tuc_user_name_' + i,name);
			GM_setValue('tuc_user_pass_' + i,pass);
			GM_setValue('tuc_user_server_' + i,userver);
			GM_setValue('tuc_user_servernumber_' + i,servernu);
			GM_setValue('tuc_user_serverkind_' + i,serverki);
			alert(titlestring[5] +" (" + name + ") "+titlestring[7]+".");
			break;
		}
	}
	window.location.reload();
}

function delUser(name){
	if (!name) name=prompt(titlestring[0]);
	if (!name) return;
	var i=1;
	for (i=1;i<=10;i++){
		if (getUsers(i)==name){
			GM_deleteValue('tuc_user_name_' + i);
			GM_deleteValue('tuc_user_pass_' + i);
			alert(titlestring[5] +" (" + name + ") "+titlestring[8]+".");
			window.location.reload();
			return;
		}
	}
	alert(titlestring[5] +" (" + name + ") "+titlestring[9]+".");
}

function getUsers(nitem){
	var name = GM_getValue('tuc_user_name_' + nitem,'');
	return name;
}

function main(){
	table = document.evaluate('//div[@id="side_info"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0); //assuming there is exactly one table
	
	GM_addStyle('#mdream { text-align:left; background-color:rgba(255,255,255,0.9);border-radius:5px;padding:5px;margin:4px auto;width:160px;box-shadow:0 0 2px #222; }'+
	'#mdream h1 {font-size:12px;color:#333;text-align:left;}'+
	'#mdream li {list-style:none;padding-left:5px;}');
	if(mlang="ae"|| "sa"|| "sy"|| "eg"){
		GM_addStyle('#mdream {text-align:right;}' +
		'#mdream h1 {text-align:right;}');	
	}
	var pra = $e('div');
	pra.id = 'mdream';
	pra.innerHTML = "<h1><b>"+titlestring[10]+":</b></h1>";
		var i=1;
	for (i=1;i<=10;i++){
		var name=getUsers(i);
		if (name){
			pra.appendChild(CreateCI(name, function(){CUser(this.text)},getServer(i) + getServerNu(i) + getServerKi(i)));
		}
	}
	pra.appendChild(CreateCI(titlestring[11]+" / "+titlestring[12], function(){setUser()},""));
	pra.appendChild(CreateCI(titlestring[13], function(){delUser()},""));
	pra.appendChild(CreateCI(titlestring[14], function(){alert("Created by Vahid Eskandar\nDeveloper: Dream1\nتطوير : منصور العتيبي\nCopyright © 2011-2012")},""));

	
	table.appendChild(pra);
	window.addEventListener('load', Login, false);
}

function checkLang()
{
  var host = window.location.hostname;
  hosts = host.split(".");
  mlang = hosts[hosts.length-1];
}

main();
