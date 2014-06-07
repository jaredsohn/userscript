// ==UserScript==
// @name               Special Forces script
// @author		Peter Denev
// @version		2.20
// @uso:version 2.20
// @include		http://*erepublik.com/*
// @description    skype: bioioga
// ==/UserScript==

//var pd_form_url = "https://spreadsheets.google.com/spreadsheet/viewform?formkey=dFlwX0Y4SDE2OWpUMk1NMGExWVY0THc6MA#gid=136";
//var pd_form_url = "https://spreadsheets.google.com/spreadsheet/viewform?formkey=dHFVZFJJelZlSHZYaUptRWtzVGNzUkE6MA#gid=136";
var pd_form_url = "http://www.sf.pm-army.info/application/online";

/*

*/

pd_form_url_1 = pd_form_url.substring(pd_form_url.lastIndexOf("formkey=")+8, pd_form_url.lastIndexOf("#"));
pd_form_url_2 = pd_form_url.substring(0, pd_form_url.lastIndexOf("?"));



function createCookie(name,value,min) {
	if (min) {
		var date = new Date();
		date.setTime(date.getTime()+(min*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

Object.prototype.serialize = function() {
	var response = "{";
	for (var p in this) {
		if (this.hasOwnProperty(p))
			response += "'"+ p + "':'" + this[p].serialize() + "',";
	}
	return response.substr(0, response.length-1) + "}";
}

Array.prototype.serialize = function() {
	var response = "[";
	for (var i = 0; i < this.length; i++) {
		response += this[i].serialize() + ",";
	}
	return response.substr(0, response.length-1) + "]";
}

Number.prototype.serialize = function() {
	return this;
}
String.prototype.serialize = function() {
	return this;
}
Boolean.prototype.serialize = function() {
	return this;
}
Function.prototype.serialize = function() {
	return this.toString();
}


if(window.location.href.substr(0, 49) == "http://www.erepublik.com/en/military/battlefield/" | window.location.href.substr(0, 49) == "http://www.erepublik.com/bg/military/battlefield/")
{
	
	var loc = window.location.href;	
	var earmy = new Object();
	var battleName = 'Erepublik';	
	var battle_code = loc.substring(loc.indexOf('battlefield/')+12);
	var cookie_last_report = 'earmy_last_report_'+battle_code;
	
	earmy.vanish = function(obj)
	{
				
		obj.style.position = "absolute";
		obj.style.top = "-9999px";
		obj.style.left = "-9999px";

	}
	
	checkVersion = function(){
				
		var rand = Math.random();
		var ifr = document.createElement("iframe");
		ifr.width = "0";
		ifr.height = "0";
		ifr.src = 'http://mcm-priboy.bg/other/check_version.php?script_name=earmy-damage-9.user.js&version=2.05';
		ifrId = "earmydamagecheck"+ rand;
		ifr.name = ifrId;
		ifr.id = ifrId;
		earmy.vanish(ifr);
		document.body.appendChild(ifr);
			
		
	}
	
	cssAdd = function(){
		var cssElement = document.createElement('style');
		cssElement.setAttribute('type','text/css');		
		//var historyBtn = '.beta_notice_middle{ cursor:pointer; opacity: 0.6; -moz-border-radius: 3px; border-radius: 3px; -webkit-border-radius: 3px; display:block; bottom:2px; } ';
		//var historyBtnHover = '.beta_notice_middle:hover{ opacity: 0.8; } ';
		var earmy_last_report_span = '.earmy_last_report_span:hover{cursor:pointer; font-weight: bold; } ';
		//var earmy_last_del_report_span = '#earmy_last_del_report_span:hover{cursor:pointer; font-weight: bold; } ';
		
		cssElement.innerHTML = earmy_last_report_span;		
		document.head.appendChild(cssElement);
	}
	

	earmy.reportDamage = function(name, dmg, round, battle, eday, time, wall, p_id)
	{
		
		var rand = Math.random();
		
		var form = document.createElement("form");
		form.method = "POST";
		//form.action = "https://spreadsheets.google.com/formResponse?hl=bg&formkey=" + pd_form_url_1 + "&ifq";
		form.action="http://www.sf.pm-army.info/application/online";
		//form.action = pd_form_url_2;
		form.name = "form";
		form.id = "tehform_" + rand;
		//form.target = "nemoasezapra" + rand;
		form.target = "_blank";
		
		
		var f_eday = document.createElement("input");
		f_eday.type = "text";
		f_eday.name = "entry.6.single";
		earmy.vanish(f_eday);
		
		var f_name = document.createElement("input");
		f_name.type = "text";
		f_name.name = "entry.0.single";
		earmy.vanish(f_name);
		
		var f_round = document.createElement("input");
		f_round.type = "text";
		f_round.name = "entry.1.single";
		earmy.vanish(f_round);
		
		var f_dmg = document.createElement("input");
		f_dmg.type = "text";
		f_dmg.name = "entry.2.single";
		earmy.vanish(f_dmg);	
		
		
		var f_screenShot = document.createElement("input");
		f_screenShot.type = "text";
		f_screenShot.name = "entry.3.single";
		earmy.vanish(f_screenShot);
			
			
		var f_battle = document.createElement("input");
		f_battle.type = "text";
		f_battle.name = "entry.5.single";
		earmy.vanish(f_battle);
		
		
		var f_check = document.createElement("input");
		f_check.type = "text";
		f_check.name = "entry.7.single";
		earmy.vanish(f_check);
				
		var f_pagenum = document.createElement("input");
		f_pagenum.type = "hidden";
		f_pagenum.value = "0";
		f_pagenum.name = "pageNumber";
		
		var f_backup = document.createElement("input");
		f_backup.type = "hidden";
		f_backup.value = "";
		f_backup.name = "backupCache";
		
		var f_wall = document.createElement("input");
		f_wall.type = "text";
		f_wall.name = "entry.4.single";
		earmy.vanish(f_wall);
		
		var f_id = document.createElement("input");
		f_id.type = "text";
		f_id.name = "f_id";
		earmy.vanish(f_id);

		var f_submit = document.createElement("input");
		f_submit.type = "submit";
		f_submit.value = "Изпращане";
		f_submit.name = "submit";
		earmy.vanish(f_submit);

		var f_isHuman = document.createElement("input");
		f_isHuman.type = "hidden";
		f_isHuman.value = "0";
		f_isHuman.name = "entry.8.single";
		earmy.vanish(f_isHuman);
						
		
		form.appendChild(f_eday);
		form.appendChild(f_name);		
		form.appendChild(f_round);
		form.appendChild(f_dmg);
		form.appendChild(f_screenShot);		
		form.appendChild(f_battle);
		form.appendChild(f_wall);
		form.appendChild(f_id);
		form.appendChild(f_check);
		form.appendChild(f_pagenum);
		form.appendChild(f_backup);
		form.appendChild(f_submit);
		form.appendChild(f_isHuman);
		document.body.appendChild(form);
		
		/*
		var ifr = document.createElement("iframe");
		ifr.width = "0";
		ifr.height = "0";
		ifr.name = "nemoasezapra" + rand;
		earmy.vanish(ifr);
		ifr.appendChild(form);
		document.body.appendChild(ifr);		
		*/	
					
		f_eday.value = 'еДен '+ eday;
		f_name.value = name;
		f_dmg.value = dmg;
		f_round.value = round;
		f_screenShot.value = 'script ';		
		//f_battle.value = battle+' / стена: '+wall+' / време: '+time;
		f_battle.value = battle;
		f_wall.value = wall;
		f_id.value = p_id;
		var battle_code = loc.substring(loc.indexOf('battlefield/')+12);
		f_check.value = round*dmg*battle_code*(100-27);
		
		
		//timeOutIt(form,0);
		//sendIt(form);		
		
		
		alert("Отчетът Ви ще бъде изпратен. Моля, не затваряйте прозореца докато зарежда!");
		//form.submit();
		f_submit.click();		
				
		//document.body.removeChild(form);
		
		/*
		document.getElementById("total_damage").innerHTML += "<br><font style='color:green;font-weight:bold;'>+" + dmg + "</h3>";
		*/
	}
		

	earmy.getName = function()
	{
		/*
		var contUserName = document.getElementsByClassName('user_info')[0];			
		return contUserName.getElementsByTagName('a')[0].innerHTML;
		*/
		var contUserName = document.getElementsByClassName('user_section')[0];			
		return contUserName.getElementsByClassName('user_avatar')[0].title;//user_avatar		
		
	}
	
	earmy.getId = function()
	{
		var contUserName = document.getElementsByClassName('user_section')[0];			
		var temp_url = contUserName.getElementsByClassName('user_avatar')[0].href;	
		 return 	temp_url.split('profile/')[1].split('/')[0];
		
	}

	earmy.getDamage = function()
	{

		return parseInt((document.getElementById("total_damage").getElementsByTagName('strong')[0].innerHTML).replace('&nbsp;',''));

 }
	earmy.getTime = function()
	{

		return document.getElementById("battle_countdown").innerHTML;		

	}

	earmy.getRound = function()
{
return parseInt((parseInt(document.getElementById("left_campaign_points").getElementsByTagName('strong')[0].innerHTML) + parseInt(document.getElementById("right_campaign_points").getElementsByTagName('strong')[0].innerHTML))/11)+1;
}

	earmy.wall_full = function(){
		if(document.getElementById('blue_domination_f')){
			var blue_wall = document.getElementById('blue_domination_f').innerHTML;
		}else{
			var blue_wall = document.getElementById('blue_domination').innerHTML;
		}
		return blue_wall;
	}
	
	  
	earmy.getBattle = function()
	{
		var battle_code = loc.substring(loc.indexOf('battlefield/')+12);
		if(document.getElementsByClassName('regionLink').length>0){
			var battle_title = document.getElementsByClassName('regionLink')[0].title;	
		}else{
			var battle_title = document.getElementById('pvp_header').getElementsByTagName('h2')[0].innerHTML;
		}
		//return  battle_code+ ' -  ' +battle_title;
		return battle_title;
	}
		
	earmy.getEday =  parseInt(document.getElementsByClassName('eday')[0].innerHTML
				.split('strong>')[1].replace('</','').replace(',',''));

	
	earmy.lastDamage = 0;

			
	var reportTimeOut = function(){
		document.getElementsByClassName('myUnicClass')[0].style.display= 'none';	
		setTimeout(report, 2000);
	}
	
	var oldReports = function(){
		var last_report = eval('(' + readCookie(cookie_last_report) + ')');
		
		if(last_report){			
			alert('Последен отчет за тази битка: Щета:'+ last_report.damage+'; Рунд:'+last_report.round);
			var otg = confirm('Да изпратя ли отчета отново?');
			if(otg==true){
				earmy.reportDamage(last_report.name, last_report.damage, last_report.round, last_report.battleName, last_report.eday, last_report.battleTime, last_report.wall);
			}			
		}else{
			alert('Няма записан отчет все още!');
		}
			
	}
		
	var oldReportDel = function(){
		var last_report = eval('(' + readCookie(cookie_last_report) + ')');
		
		if(last_report){			
			alert('Последен отчет за тази битка: Щета:'+ last_report.damage+'; Рунд:'+last_report.round);
			var otg = confirm('Да НУЛИРАМ ли този отчет?');
			if(otg==true){
				earmy.reportDamage(last_report.name, parseInt(last_report.damage)*(-1), last_report.round, last_report.battleName, last_report.eday, last_report.battleTime, last_report.wall);
			}			
		}else{
			alert('Няма записан отчет все още!');
		}
			
	}
		
	var report = function() {	
		
		//alert(readCookie('eRepReportScreen'));
		document.getElementsByClassName('myUnicClass')[0].style.display= 'none';		
		earmy.lastDamage = earmy.getDamage();
		var cookieVars = new Object();
		cookieVars.name = earmy.getName();
		cookieVars.damage = earmy.lastDamage;
		cookieVars.round = earmy.getRound();
		cookieVars.battleName = battleName;
		cookieVars.eday = earmy.getEday;	
		cookieVars.battleTime = earmy.getTime();	
		cookieVars.wall = earmy.wall_full();	
			
		createCookie(cookie_last_report,cookieVars.serialize(),24);
		//alert(earmy.getEday);
		//alert(readCookie(cookie_last_report));
		//var last_report = eval('(' + readCookie(cookie_last_report) + ')');
		//alert(last_report.eday);
		
		earmy.reportDamage(earmy.getName(), earmy.lastDamage, earmy.getRound(), battleName, earmy.getEday, earmy.getTime(), earmy.wall_full(), earmy.getId());
				
		//document.getElementsByClassName('myUnicClass')[0].style.display= 'block';
		
	}
	
	var reportEnd = function() {	
		var otg = confirm('Рундът е свършил и искате да пратите отчет?');
		if(otg==true){
		
			//alert(readCookie('eRepReportScreen'));
			document.getElementsByClassName('myUnicClass')[0].style.display= 'none';		
			earmy.lastDamage = earmy.getDamage();
			var cookieVars = new Object();
			cookieVars.name = earmy.getName();
			cookieVars.damage = earmy.lastDamage;
			cookieVars.round = earmy.getRound()-1; // diferent from report
			cookieVars.battleName = battleName;
			cookieVars.eday = earmy.getEday;	
			cookieVars.battleTime = earmy.getTime();	
			cookieVars.wall = earmy.wall_full();	
				
			createCookie(cookie_last_report,cookieVars.serialize(),24);
			//alert(earmy.getEday);
			//alert(readCookie(cookie_last_report));
			//var last_report = eval('(' + readCookie(cookie_last_report) + ')');
			//alert(last_report.eday);
			
			earmy.reportDamage(earmy.getName(), earmy.lastDamage, earmy.getRound(), battleName, earmy.getEday, earmy.getTime(), earmy.wall_full());
					
			//document.getElementsByClassName('myUnicClass')[0].style.display= 'block';
		}
		
	}
	
	

	earmy.main = function()
	{
		cssAdd();
		earmy.lastDamage = earmy.getDamage();		
		/*
		var div = document.getElementById("logo");
		div.innerHTML = "<br><img src='http://www.studiolan.com/Bulgaria_flag.gif' width='50' height='30'><br />www.pm-army.info<br> BGBox ,TriEdgeAI & Peter Denev<br>";
		*/
		var logoAddon = document.createElement('pre');		  
		logoAddon.innerHTML = '<br />www.pm-army.info :: BGBox & Peter Denev';		
		logoAddon.setAttribute('id','scriptLogo');
		logoAddon.setAttribute('style','left: -150px;position: relative;top: 90px; color: #999;');		

		document.getElementById("logo").appendChild(logoAddon);
		/**/
		
		var newa = document.createElement('a');		  

		newa.setAttribute('id','health_warning');
		newa.setAttribute('class','myUnicClass');
		newa.setAttribute('style','display:block; top:-60px;');
		newa.setAttribute('href','javascript:;');	
		
		newa.innerHTML = 'Отчети!';		
		newa.addEventListener('click', report, false);
		
		document.getElementsByClassName('action_holder')[0].appendChild(newa);
		
		/*
		var beta2_oldRepors_img = document.getElementsByClassName('beta_notice_middle')[0];		
		beta2_oldRepors_img.src='http://www.lonza.com/group/en/company/about/history.naviimg.0.0.10.._navititle_.000000.gif';
		beta2_oldRepors_img.addEventListener('click', oldReports, false);
		beta2_oldRepors_img.setAttribute('title','eArmy Report History');
		*/
			
		var last_report_span = document.getElementById('earmy_last_report_span');
		last_report_span.addEventListener('click', oldReports, false);
		
		var last_report_del_span = document.getElementById('earmy_last_report_del_span');
		last_report_del_span.addEventListener('click', oldReportDel, false);
		
		//var logoReport = document.getElementById('logoReport');
		//logoReport.addEventListener('click', reportEnd, false);
		
		//add reportEnd
		
		
		var newReportEnd = document.createElement('a');	
		//newReportEnd.setAttribute('id','reportEnd');
		newReportEnd.setAttribute('class','earmy_last_report_span');
		newReportEnd.setAttribute('href','javascript:;');	
		newReportEnd.setAttribute('style','position: relative; left: 240px; top: 65px;');	
		newReportEnd.innerHTML = '&lt;&lt; Report &gt;&gt;';		
		newReportEnd.addEventListener('click', reportEnd, false);
		document.getElementById('battle_end').appendChild(newReportEnd);
		
		var newReportEndNext = document.createElement('a');		
		//newReportEndNext.setAttribute('id','reportEnd');
		newReportEndNext.setAttribute('class','earmy_last_report_span');
		newReportEndNext.setAttribute('href','javascript:;');	
		newReportEndNext.setAttribute('style','position: relative; left: 240px; top: 65px;');	
		newReportEndNext.innerHTML = '&lt;&lt; Report &gt;&gt;';		
		newReportEndNext.addEventListener('click', reportEnd, false);		
		document.getElementById('battle_loader').appendChild(newReportEndNext);

		
		
	
	}
	
	
	//checkVersion();
	battleName = earmy.getBattle();
	setTimeout(earmy.main, 1000);
	

}