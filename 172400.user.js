// ==UserScript==
// @name           SWBotUI
// @namespace      http://www.sofiawars.com/*
// @description    SWBotUI
// @include        http://www.sofiawars.com/*
// ==/UserScript==
unsafeWindow.ShowIntrest = function(){		
	var storageData = GM_getValue("SWBotDayStorage","");
	var storageArray = storageData.split(';');
	
	var usersArray = [];
	function sMoney(i, ii) { 
		if (parseInt(i[1]) > parseInt(ii[1])) return -1;
		if (parseInt(i[1]) < parseInt(ii[1])) return 1;
		return 0;
	}
	function sAvarage(i, ii) { 
		if (parseInt(i[3]) > parseInt(ii[3])) return -1;
		if (parseInt(i[3]) < parseInt(ii[3])) return 1;
		return 0;
	}

	function sAvarage2(i, ii) { 
		if (parseInt(i[1])/parseInt(i[2])<400) return 1;
		if (parseInt(ii[1])/parseInt(ii[2])<400) return -1;
		if (parseInt(i[2]) > parseInt(ii[2])) return -1;
		if (parseInt(i[2]) < parseInt(ii[2])) return 1;
		if (parseInt(i[3]) > parseInt(ii[3])) return -1;
		if (parseInt(i[3]) < parseInt(ii[3])) return 1;
		return 0;
	}

	for (i=0;i<storageArray.length;i++){
		var recordArray = storageArray[i].split(',');
		if (recordArray[1]=="") continue;
		if (recordArray[2]=="") recordArray[2]=0;
		if (usersArray[recordArray[1]]==undefined){
			usersArray[recordArray[1]]=[recordArray[1],parseInt(recordArray[2]),1,recordArray[3]];
			if (usersArray[recordArray[1]][3].length>9) usersArray[recordArray[1]][3] = usersArray[recordArray[1]][3].substr(0,9)+'...';
		}else{
			usersArray[recordArray[1]][1]+=parseInt(recordArray[2]);
			usersArray[recordArray[1]][2]++;
		}
	}
	
	var indUsersArray = [];
	
	for (var property in usersArray) {
        indUsersArray[indUsersArray.length] = [property,usersArray[property][1],usersArray[property][2],usersArray[property][1]/usersArray[property][2],usersArray[property][3]];
    }

	
	//indUsersArray.sort(sMoney);
	indUsersArray.sort(sMoney);
	
	var sRes = "";
	var i=0;
	
	for (i=0;(i<28)&&(i<indUsersArray.length);i++){
		sRes += '<tr><td><a href="/player/'+indUsersArray[i][0]+'/">'+indUsersArray[i][4]+'</a></td><td>'+indUsersArray[i][1]+'</td><td>'+indUsersArray[i][2]+'</td>';
		if (indUsersArray[28+i]!=undefined){
			sRes += '<td><a href="/player/'+indUsersArray[28+i][0]+'/">'+indUsersArray[28+i][4]+'</a></td><td>'+indUsersArray[28+i][1]+'</td><td>'+indUsersArray[28+i][2]+'</td>';
		}else{
			sRes += '<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>';
		}
		if (indUsersArray[56+i]!=undefined){
			sRes += '<td><a href="/player/'+indUsersArray[56+i][0]+'/">'+indUsersArray[56+i][4]+'</a></td><td>'+indUsersArray[56+i][1]+'</td><td>'+indUsersArray[56+i][2]+'</td>';
		}else{
			sRes += '<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>';
		}
		if (indUsersArray[84+i]!=undefined){
			sRes += '<td><a href="/player/'+indUsersArray[84+i][0]+'/">'+indUsersArray[84+i][4]+'</a></td><td>'+indUsersArray[84+i][1]+'</td><td>'+indUsersArray[84+i][2]+'</td></tr>';
		}else{
			sRes += '<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>';
		}
	}
	sRes += '<tr style="background-color:#60BBBB"><td colspan=4><b>Всего</b></td><td colspan=4><b>'+indUsersArray.length+'</b></td><td colspan=4><b>игроков</b></td></tr>';
	sRes = '<table id="SWBotStats" style="display:'+((GM_getValue('SWBotStatsVis',true)==true) ? '' : 'none')+';">'+sRes+'</table>';
	sRes = '<div id="SWBotStatsCaption" style="height:20px;width:100%;margin:0 auto;background-color:#409999;border: 0px black solid;text-align: center;color:#FFFFFF;">Статистика лучших нападений</div>'+sRes;
	SetupTextByID("usersStat",sRes);
}
unsafeWindow.SetupData = function(){
	if (GM_getValue("SWBotOn",false)==true){
		SetupTextByID("SWBotOn","Включен");
	}else{
		SetupTextByID("SWBotOn","Выключен");
	}	
	if (GM_getValue("SWBotMetroDig",false)==true){
		SetupTextByID("SWBotMetroDig","Копаем в метро");
	}else{
		SetupTextByID("SWBotMetroDig","Не копаем в метро");
	}
	if (GM_getValue("SWBotMoneyToOre",false)==true){
		SetupTextByID("SWBotMoneyToOre","Скидываем деньги моне");
	}else{
		SetupTextByID("SWBotMoneyToOre","Копим средства");
	}
	if (GM_getValue("SWBotCreatePetrs",false)==true){
		SetupTextByID("SWBotCreatePetrs","Варим петрики");
	}else{
		SetupTextByID("SWBotCreatePetrs","Собираем руду");
	}
	if (GM_getValue("SWBotHntrs",false)==true){
		SetupTextByID("SWBotHntrs","Охотимся в ОК");
	}else{
		SetupTextByID("SWBotHntrs","Не охотимся в ОК");
	}
	if (GM_getValue("wigFarm",false)==true){
		SetupTextByID("wigFarm","Фарм включен");
	}else{
		SetupTextByID("wigFarm","Фарм выключен");
	}
	SetupTextByID("SWBotCountAtack",GM_getValue("SWBotCountAtackDay",0));
	SetupTextByID("SWBotCountMoney",GM_getValue("SWBotCountMoneyDay",0)+' ('+parseInt(GM_getValue("SWBotCountMoneyDay",0)/GM_getValue("SWBotCountAtackDay",0))+')');
	SetupTextByID("SWBotCountAtackLevel",GM_getValue("SWBotCountAtack",0));
	SetupTextByID("SWBotCountMoneyLevel",GM_getValue("SWBotCountMoney",0)+' ('+parseInt(GM_getValue("SWBotCountMoney",0)/GM_getValue("SWBotCountAtack",0))+')');
	SetupTextByID("SWBotReachCount",GM_getValue("SWBotReachCount",0));
	SetupTextByID("SWBotPoorCount",GM_getValue("SWBotPoorCount",0));
	
	SetupTextByID("SWBotKirka",GM_getValue("SWBotKirkaCount",0));
	
	//alert(GM_getValue("SWBotPetricks")+" "+GM_getValue("SWBotLastUpdate"));
	
	SetupTextByID("SWBotPetricks",OutOnlyTime((new Date(GM_getValue("SWBotPetricks",0)*1000))));
}


unsafeWindow.GetPlayerFights = function(playerID){
	var storageData = GM_getValue("SWBotDayStorage","");
	var storageArray = storageData.split(';');
	
	var Fights = []
	
	var AllMoney = 0;
	
	for (i=0;i<storageArray.length;i++){
		var recordArray = storageArray[i].split(',');
		if (recordArray[1]=="") continue;
		if (recordArray[1]!=playerID) continue;
		if(recordArray[2]=="") recordArray[2]=0;
		Fights[Fights.length] = recordArray;
		
		AllMoney = AllMoney + parseInt(recordArray[2]);
	}
	
	if (Fights.length==0) return "Нет Данных";
	
	var Avarage = AllMoney/Fights.length;
	
	var resStr = '<table><tr><td><a href="/player/'+Fights[0][1]+'/">'+Fights[0][3]+'</a></td><td>Среднее: '+Avarage+'</td></tr>';
	for (var i=0;i<Fights.length;i++){
		resStr += '<table><tr><td>'+Fights[i][0]+'</td><td>Среднее: '+Fights[i][2]+'</td></tr>';
	}
	
	return resStr+'</table>';
}

function getFormHTML(){
	var visPanel = GM_getValue('SWBotPanelVis',true);
	var html = "";
	if (visPanel==true){
		html = 
'<div id="SWBotPanel" style="height:500px;width:250px;position:fixed;top:0;right:0;z-index:3;margin:0 auto;background-color:#e0ffff;border: 1px black solid;">'+
'<div id="SWBotCaption" style="height:20px;width:100%;margin:0 auto;background-color:#409999;border: 0px black solid;text-align: center;color:#FFFFFF;">Основные параметры</div>'+
	'<center><table id="SWBotTable">'
	}else{
		html = 
'<div id="SWBotPanel" style="height:20px;width:250px;position:fixed;top:0;left:0;z-index:3;margin:0 auto;background-color:#e0ffff;border: 1px black solid;">'+
'<div id="SWBotCaption" style="height:20px;width:100%;margin:0 auto;background-color:#409999;border: 0px black solid;text-align: center;color:#FFFFFF;">Основные параметры</div>'+
	'<center><table id="SWBotTable" style="display:none">'
	}
	html += 
		'<tr><td style="text-align: center;" colspan="2">'+
				'<a href="" id="SWBotOn" onClick="return false;">non</a>'+
		'</td></tr>'+
		'<tr><td style="text-align: center;" colspan="2">'+
				'<a href="" id="SWBotMetroDig" onClick="return false;">non</a>'+
		'</td></tr>'+
		'<tr><td style="text-align: center;" colspan="2">'+
				'<a href="" id="SWBotMoneyToOre" onClick="return false;">non</a>'+
		'</td></tr>'+
		'<tr><td style="text-align: center;" colspan="2">'+
				'<a href="" id="SWBotCreatePetrs" onClick="return false;">non</a>'+
		'</td></tr>'+
		'<tr><td style="text-align: center;" colspan="2">'+
				'<a href="" id="SWBotHntrs" onClick="return false;">non</a>'+
		'</td></tr>'+
		'<tr><td style="text-align: center;" colspan="2">'+
				'<a href="" id="wigFarm" onClick="return false;">non</a>'+
		'</td></tr>'+
		'<tr><td colspan="2">'+
				'&nbsp;'+
		'</td></tr>'+
		'<tr><td>'+
				'Нападений за сутки '+'</td><td>'+'<a id="SWBotCountAtack">nan</a>'+
		'</td></tr>'+
		'<tr><td>'+
				'Награблено за сутки '+'</td><td>'+'<a id="SWBotCountMoney">nan</a>'+
		'</td></tr>'+
		'<tr><td>'+
				'Нападений на уровне '+'</td><td>'+'<a id="SWBotCountAtackLevel">nan</a>'+
		'</td></tr>'+
		'<tr><td>'+
				'Награблено на уровне '+'</td><td>'+'<a id="SWBotCountMoneyLevel">nan</a>'+
		'</td></tr>'+
		'<tr><td>'+
				'Больше 1000 украдено'+'</td><td>'+'<a id="SWBotReachCount">nan</a>'+
		'</td></tr>'+
		'<tr><td>'+
				'Меньше 300 украдено'+'</td><td>'+'<a id="SWBotPoorCount">nan</a>'+
		'</td></tr>'+
		'<tr><td colspan="2">'+
				'&nbsp;'+
		'</td></tr>'+
		'<tr><td>'+
				'Петрики произведуться '+'</td><td>'+'<a id="SWBotPetricks">nan</a>'+
		'</td></tr>'+
		'<tr><td>'+
				'Сейф кончиться '+'</td><td>'+'<a id="SWBotSafe">nan</a>'+
		'</td></tr>'+
		'<tr><td>'+
				'Связи кончаться '+'</td><td>'+'<a id="SWBotSvyazi">nan</a>'+
		'</td></tr>'+
		'<tr><td colspan="2">'+
				'&nbsp;'+
		'</td></tr>'+
		'<tr><td>'+
				'Кирки осталось '+'</td><td>'+'<a id="SWBotKirka">nan</a>'+
		'</td></tr>'+
		'<tr><td>'+
				'Гейгера осталось '+'</td><td>'+'<a id="SWBotGager">nan</a>'+
		'</td></tr>'+
		'<tr><td>'+
				'Каски осталось '+'</td><td>'+'<a id="SWBotKaska">nan</a>'+
		'</td></tr>'+
		'<tr><td colspan="2">'+
				'&nbsp;'+
		'</td></tr>'+
		'<tr><td  style="text-align: center;" colspan="2">'+
				'Следующие действия'+
		'</td></tr>'+
		'<tr><td style="text-align: center;" colspan="2">'+
				'<div id="SWBotNextAction"></div>'+
		'</td></tr>'+
	'</table></center>'+
'</div>';
	return html;
}

var hrefPage2 = top.location.href.substr(20);
if (hrefPage2.substr(0,3)!='/@/') {
var el = document.createElement("div");
el.innerHTML = getFormHTML();
document.body.appendChild(el);
var el2 = document.createElement("div");
//var heightStats = 
el2.innerHTML = '<div id="usersStat" style="height:' + ((GM_getValue('SWBotStatsVis',true)==true) ? '500px' : '20px') + ';width:600px;position:fixed;top:0;left:251px;z-index:2;margin:0 auto;background-color:#e0ffff;border: 1px black solid;">&nbsp;</div>';
document.body.appendChild(el2);
var el3 = document.createElement("div");
//var heightStats = 
el3.innerHTML = '<div id="userStat" style="height:' + ((GM_getValue('SWBotUserVis',true)==true) ? '500px' : '20px') + ';width:150px;position:fixed;top:21px;left:0px;z-index:2;margin:0 auto;background-color:#e0ffff;border: 1px black solid;">&nbsp;</div>';
document.body.appendChild(el3);

unsafeWindow.ShowIntrest();

unsafeWindow.SetupData();

function waitForJquery(){
	if (typeof unsafeWindow.jQuery == 'undefined') {  
		window.setTimeout(waitForJquery, 100);
	} else {
		$ = unsafeWindow.jQuery;
		MainScript($);
		//your code here
	}
}
waitForJquery();

document.addEventListener('click', function(event) {
	if((event.target.getAttribute('id') == 'SWBotOn')||
	   (event.target.getAttribute('id') == 'SWBotMetroDig')||
	   (event.target.getAttribute('id') == 'SWBotMoneyToOre')||
	   (event.target.getAttribute('id') == 'SWBotCreatePetrs')||
	   (event.target.getAttribute('id') == 'SWBotHntrs')||
	   (event.target.getAttribute('id') == 'wigFarm')) {
		var gm_value = GM_getValue(event.target.id,false);
		GM_setValue(event.target.id,(gm_value==false));
		unsafeWindow.SetupData();
		return;
	}
	if (event.target.getAttribute('id') == 'SWBotCaption'){
		if (document.getElementById('SWBotTable').style.display == ''){
			document.getElementById('SWBotTable').style.display = 'none';
			document.getElementById('SWBotPanel').style.height = '20px';
			GM_setValue('SWBotPanelVis',false);
		}else{
			document.getElementById('SWBotTable').style.display = '';
			document.getElementById('SWBotPanel').style.height = '500px';
			GM_setValue('SWBotPanelVis',true);
		}
	}
	if (event.target.getAttribute('id') == 'SWBotStatsCaption'){
		if (document.getElementById('SWBotStats').style.display == ''){
			document.getElementById('SWBotStats').style.display = 'none';
			document.getElementById('usersStat').style.height = '20px';
			GM_setValue('SWBotStatsVis',false);
		}else{
			document.getElementById('SWBotStats').style.display = '';
			document.getElementById('usersStat').style.height = '500px';
			GM_setValue('SWBotStatsVis',true);
		}
	}
	unsafeWindow.SetupData();
	return false;
}, false);

document.addEventListener ("mouseover",function(event) {
	if (event.target.href != undefined){
		if(event.target.href.substr(0,28)=="http://www.sofiawars.com/player/"){
			var UserID = event.target.href.substr(28).replace(new RegExp("/",'g'),'');
			//alert(UserID);
			
			document.getElementById('userStat').innerHTML = unsafeWindow.GetPlayerFights(UserID);
		}
	}

},false);
}