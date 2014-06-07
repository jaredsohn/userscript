// ==UserScript==
// @name           	WarGroup Filter [GW]
// @namespace      	гном убийца
// @description    	Фильтр групповых боев. (v 3.0.25.04.11.0823)
// @include        	http://www.ganjawars.ru/wargroup.php?war=armed*
// @include        	http://www.ganjawars.ru/wargroup.php?war=gwars*
// @include			http://www.ganjawars.ru/wargroup.php?war=street*
// ==/UserScript==

(function() {

var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

var tables = document.getElementsByTagName('table');
var index = 0;
var key = 0;
var links = ['http://www.ganjawars.ru/wargroup.php?war=armed', 'http://www.ganjawars.ru/wargroup.php?war=gwars', 'http://www.ganjawars.ru/wargroup.php?war=street'];

/////////////////////////////////////////////////////////////////////////////////////////////////// Парсим вариант запуска

for(var i = 0; i < 3; i++){
	if(location.href.indexOf(links[i])!= -1){
		key = i
		mainWork();
		break;
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////// Главная функция

function mainWork(){
	
	for(var i=0, len = tables.length; i < len; i++ ){
		if(tables[i].rows[0].cells[0].textContent == 'Старт'){
			index = i;
			break;
		}
	}
	
	var level_min = getingCoockie('levelmin');
	var level_max = getingCoockie('levelmax');
	
		if(!level_min){ level_min = 5; document.cookie="levelmin=5;path=/;";} else{ level_min = parseInt(level_min, 10); }
		if(!level_max){ level_max = 50; document.cookie="levelmax=50;path=/;";} else{ level_max = parseInt(level_max, 10); }
	
	 var a = document.getElementsByTagName('a');
	 for (i = 0,len = a.length; i < len; i++) {
	 	if(a[i].textContent.indexOf('Назад') != -1 && a[i].href == 'http://www.ganjawars.ru/war/'){
	 		var linckBack = a[i];
	 			break;
	 	}
	 }
		
	 var inputSpan = document.createElement('span'); 	 
	 	 inputSpan.innerHTML = 	' | Фильтр с : <select id="levelMin" value="" style=" font-weight: 500; font-family: Verdana; background-color: rgb(245, 255, 245); font-size: 12px; text-align: center; width: 50px; border-style: none;">'+ createOptions('lmin_') + '</select> по : <select id="levelMax" value="" style=" font-weight: 500; font-family: Verdana; background-color: rgb(245, 255, 245); font-size: 12px; text-align: center; width: 50px; border-style: none;">'+ createOptions('lmax_') + '</select> <input type="button" id="saveButton" value="»»" style="cursor: pointer; font-weight: 500; font-family: Verdana; background-color: rgb(245, 255, 245); font-size: 12px; border-style: none;" />';
	 	 
	 linckBack.parentNode.insertBefore(inputSpan, linckBack.nextSibling);
	 
	 BID('lmin_'+level_min).selected = true;
	 BID('lmax_'+level_max).selected = true;
	 BID('saveButton').addEventListener('click', saveLevels, true);
	 
	 for(var i=0; i < 3; i++){
	 	dataFilter(index + i, level_min, level_max);
	 	if(key != 0){break;}
	 }
}

/////////////////////////////////////////////////////////////////////////////////////////////////// Фильтрующая функция

function dataFilter(index, level_min, level_max){
	if(tables[index]!= null){
		var tr = tables[index].getElementsByTagName('tr');
		
		for(var i=1, len = tr.length; i < len; i++ ){
			if(tr[i] != null){
				var level = parseInt((tr[i].cells[4].textContent.split(' vs ')[0]).split('-')[1], 10);	
				
				if((level_min > level) || (level > level_max)){
					tr[i].style.display = 'none';
				}
			}
		}
		
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////// Сохраняем настройки в куки

function saveLevels(){
	var level_min = BID('levelMin').value;
	var level_max = BID('levelMax').value;
	
	document.cookie="levelmin=" + level_min + ";path=/;";
	document.cookie="levelmax=" + level_max + ";path=/;";
	
	document.location.href = links[key];
}

/////////////////////////////////////////////////////////////////////////////////////////////////// Составляем код оптионов

function createOptions(value){
	var htmlCode = '';
	for(var i = 5; i <= 50; i++){
		htmlCode += '<option id="' + value + i + '">' + i + '</option>';
	}
	return htmlCode;
}

/////////////////////////////////////////////////////////////////////////////////////////////////// Упрощаем поиск

function BID(id){elem = root.document.getElementById(id); return elem};
    
/////////////////////////////////////////////////////////////////////////////////////////////////// Взять куки.

function getingCoockie(param){
	var cookie_txt = document.cookie;
 		cookie_txt = cookie_txt.split(";");
 	
 	for(var i=0, len = cookie_txt.length; i < len; i++){
 		if (cookie_txt[i].indexOf(param) != -1){
 			var answer = cookie_txt[i].split("=")[1];
 			
 			return answer;
 		}
 	}
 	return false;
}

/////////////////////////////////////////////////////////////////////////////////////////////////// Конец.

})();