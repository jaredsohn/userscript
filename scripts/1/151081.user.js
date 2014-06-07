// ==UserScript==
// @name        Clanwar Assistant
// @namespace   MoswarClan
// @description MoswarClan
// @include     http://*.moswar.ru/clan/warstats/*
// @include     http://*.moswar.ru/clan/profile/warstats/*
// @version     1.04
// ==/UserScript==

var $;
var strPlayer = '';
var aNeedings = [];
var difServerTime;

var strDT = "0123456789.:";

function GetArchCount(){
	if (GM_getValue('clanwarToothes',"")=="") return 0;
	var aData = GM_getValue('clanwarToothes',"").split(';');
	return aData.length;
}

function ParseTime(strTime){
	var dt = strTime.split(' ');
	var date = dt[1].split('.');
	var time = dt[0].split(':');
	return new Date(date[2],date[1]-1,date[0],time[0],time[1],time[2],0);
}

function inDT(chValue){
	return strDT.indexOf(chValue)>=0;
}

function StringSplice(strValue,iStart,iCount){
	var chValue = strValue.split("");
	chValue.splice(iStart,iCount);
	return chValue.join("");
}

function ClearString(strValue){
	var i=0;
	while (i<strValue.length){
		if (inDT(strValue[i])){
			i++;
		}else{
			strValue = StringSplice(strValue,i,1);
		}
	}
	return strValue;
}

function subString(str,strSt,strEn){
	var iPos1 = str.indexOf(strSt)+strSt.length;
	var iPos2 = str.indexOf(strEn,iPos1);
	return str.substr(iPos1,iPos2-iPos1);
}

function toDebug(strText){
	if ($("#idDebug").html()=='&nbsp;'){
		$("#idDebug").html(strText);
		return;
	}
	$("#idDebug").html($("#idDebug").html()+'<br />'+strText);
}

function AddDivElement(idValue,strStyle,jqElement){
	var newElement = $('<div id="'+idValue+'" style="'+strStyle+'">&nbsp;</div>');
	if (jqElement==undefined) jqElement = $('body');
	jqElement.append(newElement);
}

function GetToothNick(){
}

function inArray(array,element){
	for (var i=0;i<array.length;i++){
		if (array[i]==element) return true;
	}
	return false;
}

function isStoredTime(strHref){
	if (GM_getValue('clanwarToothes',"")=="") return false;
	var aData = [];
	if (GM_getValue('clanwarToothes',"").indexOf(';')>=0){
		aData = GM_getValue('clanwarToothes',"").split(';');
	}else{
		aData[0]=GM_getValue('clanwarToothes',"");
	}
	for (var i=0;i<aData.length;i++){
		var aValues = aData[i].split(',');
		if (aValues[0]==strHref) {
			return aValues[1];
		}
	}
	return false;
}

function StoreTime(strHref,time){
	if (GM_getValue('clanwarToothes',"")==""){
		GM_setValue('clanwarToothes',strHref+','+time);
	}else{
		GM_setValue('clanwarToothes',GM_getValue('clanwarToothes',"")+';'+strHref+','+time);
	}
	UpdateClearButton();
}

function GetFightTime(href){
	$.get(href,function (data){
		var innerData = subString(data,'<a href="'+href+'"','script type');
		innerData = subString(innerData,'<br>','<');
		var strTime = subString(innerData,'>','(');
		var strDate = subString(innerData,'(',')');
		strTime = ClearString(strTime);
		strDate = ClearString(strDate);
		$("#idCurrentOp").html('<center><b>Подготовка данных:</b></center><hr />3-х секундное ожидание');
		setTimeout(function (){
			StoreTime(href,strTime+' '+strDate);
		},100);
	});
}

function SortNeedings(){
	for (var i=0;i<aNeedings.length;i++){
		var minI = i;
		for (var j=i+1;j<aNeedings.length;j++){
			if (aNeedings[minI]['dtValue']==undefined){
			minI = j;
continue;
			}
			if (aNeedings[j]['dtValue']==undefined){
continue;
			}
			if (aNeedings[j]['dtValue']<aNeedings[minI]['dtValue']) minI = j;
		}	
		if (minI==i) continue;
		var store = aNeedings[minI];
		aNeedings[minI] = aNeedings[i];
		aNeedings[i] = store;
	}
}

function takeTime(strValue){
	var dt = strValue.split(' ');
	return dt[0];
}

function SetTimers(){

	var dtNow = new Date();
	dtNow.setMilliseconds(dtNow.getMilliseconds()+difServerTime);
	dtNow.setHours(dtNow.getHours()-1);
		
	for (var i=0;i<aNeedings.length;i++){
		if (aNeedings[i]['lastFigth']==undefined) continue;
		var spHRef = aNeedings[i]['hRef'].split('/');
		var tId = 'idT'+spHRef[2];
		
		var difTime = dtNow.valueOf()-aNeedings[i]['dtValue'];
		difTime = parseInt(difTime/1000);
		
		if (difTime<-60){
			$("#"+tId).html("<span style='text-weight:normal;color:black;'>"+difTime+"</span>");
		}else if (difTime<60){
			$("#"+tId).html("<span style='text-weight:normal;color:green;'>"+difTime+"</span>");
		}else{
			$("#"+tId).html("<span style='text-weight:normal;color:gray;'>"+difTime+"</span>");
		}
		//$("#"+tId).html();
	}
	
	setTimeout(SetTimers,1000);
}

function TakeTime(){
	for (var i=0;i<aNeedings.length;i++){
		if (aNeedings[i]['lastFigth']==undefined) continue;
		if (isStoredTime(aNeedings[i]['lastFigth']) == false){
			$("#idCurrentOp").html('<center><b>Подготовка данных:</b></center><hr />Запрос последнего зуба: <i>'+aNeedings[i]['nickName']+'</i>');
			GetFightTime(aNeedings[i]['lastFigth']);
			setTimeout(TakeTime,3000);
			return;
		}else{
			aNeedings[i]['dtValue'] = ParseTime(isStoredTime(aNeedings[i]['lastFigth'])).valueOf();
            aNeedings[i]['element'].html(aNeedings[i]['nickName']+"<span style='text-weight:normal;color:green;'>("+isStoredTime(aNeedings[i]['lastFigth'])+")</span>");
        }
	}	
	
	SortNeedings();
	
	$("#idCurrentOp").html('');
	
	for (var i=0;i<aNeedings.length;i++){
		var spHRef = aNeedings[i]['hRef'].split('/');
		var tId = 'idT'+spHRef[2];
		var strAnchor = '<a href="'+aNeedings[i]['hRef']+'">'+aNeedings[i]['nickName']+'&nbsp;'+aNeedings[i]['strLvl']+'</a>';
		var strTd = "<td onclick='alleyAttack("+spHRef[2]+", 1, 0);'>&gt;!&lt;</td>";
		
		if (aNeedings[i]['lastFigth']==undefined) {
			$("#MainToothTable").append('<tr><td>'+strAnchor+"</td>"+strTd+"<td colspan='2'><span style='text-weight:normal;color:red;'>Не известно...</span></td></tr>");
			continue;
		}
		
		$("#MainToothTable").append('<tr><td>'+strAnchor+"</td>"+strTd+"<td><span style='text-weight:normal;color:green;'>("+takeTime(isStoredTime(aNeedings[i]['lastFigth']))+")</span></td><td id='"+tId+"'>&nbsp;</td></tr>");
	}
	
	SetTimers();
}

function Start(){
	AddDivElement('idMain','position:absolute;top:0px;left:0px;width:250px;background:#BBBBFF;border:1px solid #000;');
	
	$('#idMain').html('<table id="MainToothTable"></table><br /><div id="idCurrentOp"></div><br /><div><center><a href="#" id="idResetStorage" onclick="return false;">Сбросить архив ('+GetArchCount()+')</a></center></div>');
	
	AddDivElement('idDebug','background:#BBBB88;display:none;',$('#idMain'));
	
	var dtNow = new Date();
	var dtSerTime = new Date(parseInt($("#servertime").attr('rel'))*1000);
	//difServerTime
	
	difServerTime=dtSerTime.valueOf()-dtNow.valueOf();
	
	strPlayer = $("#personal b").eq(0).html();
	strPlayer = strPlayer.substr(0,strPlayer.length-5);
	
	var iMyIndex = -1;
	var elMyTooth;
	var aMyTooth = [];
	
	for (var i=0;i<$("tr[rel=clan1]").length;i++){
		if ($("tr[rel=clan1]").eq(i).children().eq(0).children().eq(0).children().eq(2).html()==strPlayer){
			iMyIndex=i;
			elMyTooth = $("tr[rel=clan1]").eq(i).children().eq(1).children(); 
		}
	}
	
	for (var i=0;i<elMyTooth.length;i++){
		//var strNick = 
		aMyTooth[i] = subString(elMyTooth.eq(i).html(),'title="Зуб персонажа ','"></i>');
	}
		
	
	var iCount = 0;
	
	var aEnemys = [];
	for (var i=0;i<$("tr[rel=clan2]").length;i++){
		if($("tr[rel=clan2]").eq(i).children().eq(1).html().indexOf('не важно')>=0) continue;
		$("tr[rel=clan2]").eq(i).children().eq(0).children().eq(0).children().eq(0).hide();
		$("tr[rel=clan2]").eq(i).children().eq(0).children().eq(0).children().eq(1).hide();
		var strCurrentElement = $("tr[rel=clan2]").eq(i).children().eq(0).children().eq(0).children().eq(2);
			var strLevel = $("tr[rel=clan2]").eq(i).children().eq(0).children().eq(0).children().eq(3).html();
		if($("tr[rel=clan2]").eq(i).children().eq(1).html().indexOf('без потерь')>=0) {
			aNeedings[aNeedings.length] = {
				nickName: strCurrentElement.html(),
				hRef: strCurrentElement.attr('href'),
				strLvl: strLevel
			}
			continue;
		}
		aEnemys[aEnemys.length] = {
			nickName: strCurrentElement.html(),
			hRef: strCurrentElement.attr('href')
		}
		if (inArray(aMyTooth,strCurrentElement.html())){
			//$("tr[rel=clan2]").eq(i).hide();
			strCurrentElement.html('<strike style="font-weight:normal;"><i>'+strCurrentElement.html()+'</i></strike>');
		}else{
			var toothes = $("tr[rel=clan2]").eq(i).children().eq(1).children();
			if (toothes.length==0){
				aNeedings[aNeedings.length] = {
					nickName: strCurrentElement.html(),
					hRef: strCurrentElement.attr('href'),
					strLvl: strLevel
				}
			
			}
			if (toothes.length==3){
				strCurrentElement.html('<strike style="font-weight:normal;"><i>'+strCurrentElement.html()+'</i></strike>');
				continue;
			}
			var hRef = toothes.eq(toothes.length-1).attr('href');
			aNeedings[aNeedings.length] = {
				nickName: strCurrentElement.html(),
				hRef: strCurrentElement.attr('href'),
				strLvl: strLevel,
				lastFigth: hRef,
				element: strCurrentElement
			}
		}
	}
	
	TakeTime();
}


function Init(){
	if (unsafeWindow.jQuery === undefined) {
		setTimeout(Init,500);
	} else {
	  $ = unsafeWindow.jQuery;
	  Start();
	}	
}
Init();

function UpdateClearButton(){
	$("#idResetStorage").html('Сбросить архив ('+GetArchCount()+')');
}

function ClearArchive(){
	GM_setValue('clanwarToothes',"");
	UpdateClearButton();
}

document.addEventListener('click', function(event) {
	if (event.target.id=='idResetStorage'){
		ClearArchive();
		return true;
	}	
}, true);