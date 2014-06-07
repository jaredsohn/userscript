// ==UserScript==
// @name           wigBotUI
// @namespace      http://www.sofiawars.com/*
// @description    wigBotUI
// @include        http://www.sofiawars.com/*
// ==/UserScript==
unsafeWindow.ShowIntrest = function(){		
	var storageData = GM_getValue("wigBotDayStorage","");
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
	sRes = '<table id="wigBotStats" style="display:'+((GM_getValue('wigBotStatsVis',true)==true) ? '' : 'none')+';">'+sRes+'</table>';
	sRes = '<div id="wigBotStatsCaption" style="height:20px;width:100%;margin:0 auto;background-color:#409999;border: 0px black solid;text-align: center;color:#FFFFFF;">Статистика лучших нападений</div>'+sRes;
	SetupTextByID("usersStat",sRes);
}
unsafeWindow.SetupData = function(){
	if (GM_getValue("wigBotOn",false)==true){
		SetupTextByID("wigBotOn","Включен");
	}else{
		SetupTextByID("wigBotOn","Выключен");
	}	
	if (GM_getValue("wigBotMetroDig",false)==true){
		SetupTextByID("wigBotMetroDig","Копаем в метро");
	}else{
		SetupTextByID("wigBotMetroDig","Не копаем в метро");
	}
	if (GM_getValue("wigBotMoneyToOre",false)==true){
		SetupTextByID("wigBotMoneyToOre","Скидываем деньги моне");
	}else{
		SetupTextByID("wigBotMoneyToOre","Копим средства");
	}
	if (GM_getValue("wigBotCreatePetrs",false)==true){
		SetupTextByID("wigBotCreatePetrs","Варим петрики");
	}else{
		SetupTextByID("wigBotCreatePetrs","Собираем руду");
	}
	if (GM_getValue("wigBotHntrs",false)==true){
		SetupTextByID("wigBotHntrs","Охотимся в ОК");
	}else{
		SetupTextByID("wigBotHntrs","Не охотимся в ОК");
	}
	if (GM_getValue("wigFarm",false)==true){
		SetupTextByID("wigFarm","Фарм включен");
	}else{
		SetupTextByID("wigFarm","Фарм выключен");
	}
	SetupTextByID("wigBotCountAtack",GM_getValue("wigBotCountAtackDay",0));
	SetupTextByID("wigBotCountMoney",GM_getValue("wigBotCountMoneyDay",0)+' ('+parseInt(GM_getValue("wigBotCountMoneyDay",0)/GM_getValue("wigBotCountAtackDay",0))+')');
	SetupTextByID("wigBotCountAtackLevel",GM_getValue("wigBotCountAtack",0));
	SetupTextByID("wigBotCountMoneyLevel",GM_getValue("wigBotCountMoney",0)+' ('+parseInt(GM_getValue("wigBotCountMoney",0)/GM_getValue("wigBotCountAtack",0))+')');
	SetupTextByID("wigBotReachCount",GM_getValue("wigBotReachCount",0));
	SetupTextByID("wigBotPoorCount",GM_getValue("wigBotPoorCount",0));
	
	SetupTextByID("wigBotKirka",GM_getValue("wigBotKirkaCount",0));
	
	//alert(GM_getValue("wigBotPetricks")+" "+GM_getValue("wigBotLastUpdate"));
	
	SetupTextByID("wigBotPetricks",OutOnlyTime((new Date(GM_getValue("wigBotPetricks",0)*1000))));
}


unsafeWindow.GetPlayerFights = function(playerID){
	var storageData = GM_getValue("wigBotDayStorage","");
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
	var visPanel = GM_getValue('wigBotPanelVis',true);
	var html = "";
	if (visPanel==true){
		html = 
'<div id="wigBotPanel" style="height:500px;width:250px;position:fixed;top:0;left:0;z-index:3;margin:0 auto;background-color:#e0ffff;border: 1px black solid;">'+
'<div id="wigBotCaption" style="height:20px;width:100%;margin:0 auto;background-color:#409999;border: 0px black solid;text-align: center;color:#FFFFFF;">Основные параметры</div>'+
	'<center><table id="wigBotTable">'
	}else{
		html = 
'<div id="wigBotPanel" style="height:20px;width:250px;position:fixed;top:0;left:0;z-index:3;margin:0 auto;background-color:#e0ffff;border: 1px black solid;">'+
'<div id="wigBotCaption" style="height:20px;width:100%;margin:0 auto;background-color:#409999;border: 0px black solid;text-align: center;color:#FFFFFF;">Основные параметры</div>'+
	'<center><table id="wigBotTable" style="display:none">'
	}
	html += 
		'<tr><td style="text-align: center;" colspan="2">'+
				'<a href="" id="wigBotOn" onClick="return false;">non</a>'+
		'</td></tr>'+
		'<tr><td style="text-align: center;" colspan="2">'+
				'<a href="" id="wigBotMetroDig" onClick="return false;">non</a>'+
		'</td></tr>'+
		'<tr><td style="text-align: center;" colspan="2">'+
				'<a href="" id="wigBotMoneyToOre" onClick="return false;">non</a>'+
		'</td></tr>'+
		'<tr><td style="text-align: center;" colspan="2">'+
				'<a href="" id="wigBotCreatePetrs" onClick="return false;">non</a>'+
		'</td></tr>'+
		'<tr><td style="text-align: center;" colspan="2">'+
				'<a href="" id="wigBotHntrs" onClick="return false;">non</a>'+
		'</td></tr>'+
		'<tr><td style="text-align: center;" colspan="2">'+
				'<a href="" id="wigFarm" onClick="return false;">non</a>'+
		'</td></tr>'+
		'<tr><td colspan="2">'+
				'&nbsp;'+
		'</td></tr>'+
		'<tr><td>'+
				'Нападений за сутки '+'</td><td>'+'<a id="wigBotCountAtack">nan</a>'+
		'</td></tr>'+
		'<tr><td>'+
				'Награблено за сутки '+'</td><td>'+'<a id="wigBotCountMoney">nan</a>'+
		'</td></tr>'+
		'<tr><td>'+
				'Нападений на уровне '+'</td><td>'+'<a id="wigBotCountAtackLevel">nan</a>'+
		'</td></tr>'+
		'<tr><td>'+
				'Награблено на уровне '+'</td><td>'+'<a id="wigBotCountMoneyLevel">nan</a>'+
		'</td></tr>'+
		'<tr><td>'+
				'Больше 1000 украдено'+'</td><td>'+'<a id="wigBotReachCount">nan</a>'+
		'</td></tr>'+
		'<tr><td>'+
				'Меньше 300 украдено'+'</td><td>'+'<a id="wigBotPoorCount">nan</a>'+
		'</td></tr>'+
		'<tr><td colspan="2">'+
				'&nbsp;'+
		'</td></tr>'+
		'<tr><td>'+
				'Петрики произведуться '+'</td><td>'+'<a id="wigBotPetricks">nan</a>'+
		'</td></tr>'+
		'<tr><td>'+
				'Сейф кончиться '+'</td><td>'+'<a id="wigBotSafe">nan</a>'+
		'</td></tr>'+
		'<tr><td>'+
				'Связи кончаться '+'</td><td>'+'<a id="wigBotSvyazi">nan</a>'+
		'</td></tr>'+
		'<tr><td colspan="2">'+
				'&nbsp;'+
		'</td></tr>'+
		'<tr><td>'+
				'Кирки осталось '+'</td><td>'+'<a id="wigBotKirka">nan</a>'+
		'</td></tr>'+
		'<tr><td>'+
				'Гейгера осталось '+'</td><td>'+'<a id="wigBotGager">nan</a>'+
		'</td></tr>'+
		'<tr><td>'+
				'Каски осталось '+'</td><td>'+'<a id="wigBotKaska">nan</a>'+
		'</td></tr>'+
		'<tr><td colspan="2">'+
				'&nbsp;'+
		'</td></tr>'+
		'<tr><td  style="text-align: center;" colspan="2">'+
				'Следующие действия'+
		'</td></tr>'+
		'<tr><td style="text-align: center;" colspan="2">'+
				'<div id="wigBotNextAction"></div>'+
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
el2.innerHTML = '<div id="usersStat" style="height:' + ((GM_getValue('wigBotStatsVis',true)==true) ? '500px' : '20px') + ';width:600px;position:fixed;top:0;left:251px;z-index:2;margin:0 auto;background-color:#e0ffff;border: 1px black solid;">&nbsp;</div>';
document.body.appendChild(el2);
var el3 = document.createElement("div");
//var heightStats = 
el3.innerHTML = '<div id="userStat" style="height:' + ((GM_getValue('wigBotUserVis',true)==true) ? '500px' : '20px') + ';width:150px;position:fixed;top:21px;left:0px;z-index:2;margin:0 auto;background-color:#e0ffff;border: 1px black solid;">&nbsp;</div>';
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
	if((event.target.getAttribute('id') == 'wigBotOn')||
	   (event.target.getAttribute('id') == 'wigBotMetroDig')||
	   (event.target.getAttribute('id') == 'wigBotMoneyToOre')||
	   (event.target.getAttribute('id') == 'wigBotCreatePetrs')||
	   (event.target.getAttribute('id') == 'wigBotHntrs')||
	   (event.target.getAttribute('id') == 'wigFarm')) {
		var gm_value = GM_getValue(event.target.id,false);
		GM_setValue(event.target.id,(gm_value==false));
		unsafeWindow.SetupData();
		return;
	}
	if (event.target.getAttribute('id') == 'wigBotCaption'){
		if (document.getElementById('wigBotTable').style.display == ''){
			document.getElementById('wigBotTable').style.display = 'none';
			document.getElementById('wigBotPanel').style.height = '20px';
			GM_setValue('wigBotPanelVis',false);
		}else{
			document.getElementById('wigBotTable').style.display = '';
			document.getElementById('wigBotPanel').style.height = '500px';
			GM_setValue('wigBotPanelVis',true);
		}
	}
	if (event.target.getAttribute('id') == 'wigBotStatsCaption'){
		if (document.getElementById('wigBotStats').style.display == ''){
			document.getElementById('wigBotStats').style.display = 'none';
			document.getElementById('usersStat').style.height = '20px';
			GM_setValue('wigBotStatsVis',false);
		}else{
			document.getElementById('wigBotStats').style.display = '';
			document.getElementById('usersStat').style.height = '500px';
			GM_setValue('wigBotStatsVis',true);
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