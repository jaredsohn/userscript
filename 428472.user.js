// ==UserScript==
// @name           Sind Send Mails 2.0 [GW]
// @namespace      гном убийца
// @description    Синдовый расльщик почты 2.0! С данным об игроках основго синда и кучей дополнительных опций. (v. 2.0.17.06.11.1540)
// @include        http://www.ganjawars.ru/syndicate.php?id=*
// ==/UserScript==

(function(){

var request = new XMLHttpRequest();
var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

var aSpan = DCE('span');
var sId = 0;
var allDataKey = 0;

var hashData = '';
var onlineCount = 0;

var coutGroups = 0;
var coutLvlGroups = 1;

var meChInGroup = [0, 0, 0];

var rightLineId = [];

var urls = {'scills':'http://images.ganjawars.ru/i/wargroup/',
			'sindmail':'http://s3kat0r.com/images/sindmail/',
			'rank':'http://images.ganjawars.ru/img/rank',
			'info':'http://www.ganjawars.ru/info.php?id=',
			'sind':'http://www.ganjawars.ru/syndicate.php?id=',
			'tbg':'http://images.ganjawars.ru/img/tbg.gif',
			'sindico':'http://images.ganjawars.ru/img/synds/',
			'sms':'http://www.ganjawars.ru/sms-create.php'};

var ico = {'pest':urls.scills+'skill_combat_pistols.gif',
		   'gren':urls.scills+'skill_combat_explosives.gif',
		   'avto':urls.scills+'skill_combat_auto.gif',
		   'puli':urls.scills+'skill_combat_heavy.gif',
		   'drob':urls.scills+'skill_combat_sgun.gif',
		   'snip':urls.scills+'skill_combat_snipe.gif',
		   'uncheck':urls.sindmail+'unchecked.png',
		   'check':urls.sindmail+'checked.png',
		   'send':urls.sindmail+'send.png',
		   'sended':urls.sindmail+'sended.png',
		   'sending':urls.sindmail+'sending.png'};
		   
var nScills = new Array('pest', 'gren', 'avto', 'puli', 'drob', 'snip');
var tScills = {'pest':0, 'gren':1, 'avto':2, 'puli':3, 'drob':4, 'snip':5};

//////////////////////////////////////////////////////////// Проверка версии браузреа и адреса страницы.
		   
if(location.href.indexOf(urls.sind)!= -1){
	if(typeof(root.localStorage) == 'undefined' ){
 		alert('Sind Send Mails 2.0 [GW]: Ваш браузер не поддерживает LocalStorage(), обновите браузер или удалите скрипт.');
 	}else{
 		createLink();
 	}
}

//////////////////////////////////////////////////////////// Создаем нужный линк на рассыльщик, и запускаем все в работу.

function createLink(){
	var shref = BTN('a');
	
	sId = /^http:\/\/www\.ganjawars\.ru\/syndicate\.php\?id=(\d+)/.exec(location.href)[1];

	for(i=0; i < shref.length; i++){
	   if(shref[i].innerHTML == 'Политика'){
	      var politics = shref[i];
	   }
	   if(shref[i].innerHTML == 'Состав') {
	      var members = shref[i];
	   }
	}
	
	var newHref = urls.sind + sId + '&page=members&sind=mail';
	
	var newLinkSindMail = DCE('span');
	
	if(newHref == location.href){
		newLinkSindMail.innerHTML = ' | <a href="' + newHref + '" style="font-weight: bold;">Рассыльщик</a>';
		members.style.fontWeight = 'normal';
		main();
	}else{
		newLinkSindMail.innerHTML = ' | <a href="' + newHref + '">Рассыльщик</a>';
	}
	
	politics.parentNode.insertBefore(newLinkSindMail, politics.nextSibling);
}

//////////////////////////////////////////////////////////// Главная функция, в ней все стартует, и вешаются все онклики.

function main(){
	
	document.body.style.overflowY = 'scroll';
	
	var keySind = parseMySindId();
	
	var tables = BTN('table');
	var table = findTable(tables, 'Состав синдиката');
	
	var membersData = parseMembersList(table);
	
		if(keySind){
			hashData = localStorage.getItem('gk_sind_list');
			
			if(hashData == null){
				hashData = '';
				localStorage.setItem('gk_sind_list', '');
			}
			
			hashData = convertToObject(hashData);
			hashData = cleansData(membersData, hashData);
			
			membersData = splitData(membersData, hashData);
			
			convertAndSet(hashData, 0);
		}
		
		createNewMainTable(table);
		
	var onlineData = clone(membersData);
		onlineData = parseOnlineList(onlineData, (urls.sind + sId + '&page=online'));
	
	
		BID('content').innerHTML = createNewList(membersData, 'offTab', 0, keySind) + createNewList(onlineData, 'onTab', 1, keySind);
		
		
		for(var i in membersData){
    		BID('offTab_'+ i + '_mailbox').addEventListener('click', function(x){return function(){setStatusOffLine(x, membersData)}}(i), true);
    		
    		if(onlineData[i] != null){
    			BID('onTab_'+ i + '_mailbox').addEventListener('click', function(x){return function(){setStatusOnLine(x, onlineData)}}(i), true);
    		}
    	}
    	
    	BID('offTab_selectAll').addEventListener('click', function(){selectAll(membersData, 'offTab_');}, true);
    	BID('onTab_selectAll').addEventListener('click', function(){selectAll(onlineData, 'onTab_');}, true);
    	
    	for(var i = 0; i < 10; i++){
    		var groupBox = BID('offTab_group_' + i);
    		
    		if(groupBox != null){
    			groupBox.addEventListener('click', function(x){return function(){selectGroups(x, membersData)}}(i), true);
    			coutGroups++;
    		}else{
    			break;
    		}
    	}
    	
    var boxGetAllData = BID('getAllData');
    var boxSendMail = BID('sendMail');
    
    	if(boxSendMail != null && boxGetAllData != null){
    		boxGetAllData.addEventListener('click', function(){selectTypeWork(0);}, true);
    		boxSendMail.addEventListener('click', function(){selectTypeWork(1);}, true);
    	}
    	
    	BID('offTab_buttonStart').addEventListener('click', function(){runUp(0, membersData, membersData)}, true);
    	BID('onTab_buttonStart').addEventListener('click', function(){runUp(1, onlineData, membersData)}, true);
    	
    
		for(var i = 1; i < 5; i++){
			var box_lvlGroups_off = BID('offTab_tops_' + i);
			if(box_lvlGroups_off != null){
				coutLvlGroups++;
				box_lvlGroups_off.addEventListener('click', function(x){return function(){selectLvlGroups(x, membersData, 'offTab_')}}(i), true);
			}else{
				break;
			}
		}
		
		for(var i = 1; i < 5; i++){
			var box_lvlGroups_on = BID('onTab_tops_' + i);
			if(box_lvlGroups_on != null){
				box_lvlGroups_on.addEventListener('click', function(x){return function(){selectLvlGroups(x, onlineData, 'onTab_')}}(i), true);
			}else{
				break;
			}
		}
}

//////////////////////////////////////////////////////////// Работаем с номером синда, возвращем - основа или нет.

function parseMySindId(){
	
	var myId = getingCoockie('uid');
	var timeNow = getHours();
	var mySindId = 0;
	
	var sindMailData = localStorage.getItem('gk_sindMailData');
	
	if(sindMailData == null){
		
		mySindId = getSindId(urls.info + myId);
		sindMailData = {'id':myId, 'time':timeNow, 'sindId':mySindId};
		localStorage.setItem('gk_sindMailData', JSON.stringify(sindMailData));
		
	}else{
		
		sindMailData = JSON.parse(sindMailData);
		
		if((timeNow - sindMailData.time) > 24 && myId == sindMailData.id){
			
			mySindId = getSindId(urls.info + myId);
			sindMailData = {'id':myId, 'time':timeNow, 'sindId':mySindId};
			localStorage.setItem('gk_sindMailData', JSON.stringify(sindMailData));
			
		}else{
			mySindId = sindMailData.sindId;
		}
	}
	
	return mySindId == sId ? true : false;
}

//////////////////////////////////////////////////////////// Инсертим в рабочие данные, данные из памяти.

function splitData(membersData, hashData){
	for(var i in hashData){
			membersData[i].allData 	  = 1;
			membersData[i].levelChar  = hashData[i].levelChar;
			membersData[i].levelSind  = hashData[i].levelSind;
			membersData[i].scills 	  = hashData[i].scills;
			membersData[i].levelGroup = parseInt(hashData[i].levelChar/10, 10);
	}
	return membersData;
}

//////////////////////////////////////////////////////////// Создаем новую таблицу, обертку под данные.

function createNewMainTable(table){
	var nTable = DCE('span');
		nTable.innerHTML = '<center>'+
								'<div style="width: 597px; height: 26px; background: url(http://i.ganjafoto.ru/1/72/34/1723422.jpg) no-repeat;" id="tab_bg">'+
									'<div style="width:380px; height: 25px; float: left; text-align:left;">&nbsp;<i><u>Синдовый рассыльщик почты</u>:</i></div>'+
									'<div style="width:108px; height: 25px; float: left; cursor: pointer;" id="tab_1"></div>'+
									'<div style="width:108px; height: 25px; float: left; cursor: pointer;" id="tab_2"></div>'+
								'</div>'+
							'</center>'+
							'<table align="center" width="597" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">'+
								'<tr>'+
									'<td colspan="3" style="border: solid 1px #339933; border-top-style:none; background: #f0fff0; height:75px;" id="content" align="center"><br>Загрузка...<br></td>'+
								'</tr>'+
							'</table><br><br>';
		
	table.parentNode.insertBefore(nTable, table.nextSibling);
    table.parentNode.removeChild(table);
    
    BID('tab_1').addEventListener('click', function(){setBG(0);}, true);
    BID('tab_2').addEventListener('click', function(){setBG(1);}, true);
}

//////////////////////////////////////////////////////////// Парсим состав синда, набивая рабочие данные.

function parseMembersList(table){
	var hash = {};
	var tr = table.rows;
	var membersData = new Array();
	
	for(var i = 1, len = tr.length; i < len; i++){
		var cellContent = tr[i].cells[1].childNodes[0];
		var childs = cellContent.childElementCount;
		
		var idSind = 0;
		var nameChar = 'null';
		var idChar = 0;
		var sindRank = 0;
		
		if(childs == 2){
			idChar 	 = /^http:\/\/www\.ganjawars\.ru\/info\.php\?id=(\d+)/.exec(cellContent.childNodes[1].href)[1];
			idSind 	 = /^http:\/\/www\.ganjawars\.ru\/syndicate\.php\?id=(\d+)/.exec(cellContent.childNodes[0].href)[1];
			nameChar = cellContent.childNodes[1].textContent;
		}else{
			idChar   = /^http:\/\/www\.ganjawars\.ru\/info\.php\?id=(\d+)/.exec(cellContent.childNodes[0].href)[1];
			nameChar = cellContent.childNodes[0].textContent;
		}
		
			cellContent = tr[i].cells[2].childNodes[0];
			childs = cellContent.childElementCount;
			
		if(childs){
			sindRank = /^http:\/\/images\.ganjawars\.ru\/img\/rank(\d+)\.gif/.exec(cellContent.childNodes[0].src)[1];
		}
		
		var levelChar = '-';
		var levelSind = '-';
		
		var allData = 0;
		
		var scills = new Array({'type':'null', 'level':0}, {'type':'null', 'level':0}, {'type':'null', 'level':0});
		var groups = Math.ceil(i/70) - 1;
		
		hash[idChar] = {'allData':allData, 'nameChar':nameChar,'idSind':idSind, 'sindRank':sindRank, 'levelChar':levelChar, 'levelSind':levelSind, 'scills':scills, 'checked':0, 'group':groups, 'levelGroup':0};
		rightLineId[i - 1] = idChar;
		
	}
	//alert(JSON.stringify(hash));
	return hash;
}

//////////////////////////////////////////////////////////// Парсим онлайн список, для создания онлайн списка игроков.

function parseOnlineList(membersData, url){
	
	REQ(url, 'GET', null, false, function (req) {aSpan.innerHTML = req.responseText;});
	
	var tables = aSpan.getElementsByTagName('table');
	var hash = {};
	
	for(var i=0, len = tables.length; i < len; i++ ){
		var tmp = tables[i].rows[0].cells[0].textContent;
		if(/\d+ бойцов онлайн/i.test(tmp)) {
			var table = tables[i];
			break;
		}
	}
	
	var hrefs = table.getElementsByTagName('a');
	
	for(var i = 0, len = hrefs.length; i < len; i++){
		if(hrefs[i].href.indexOf(urls.info) != -1){
			var tmpId = (hrefs[i].href).split('=')[1];
				hash[tmpId] = membersData[tmpId];
				onlineCount ++;
		}
	}
	
	return hash;
}

//////////////////////////////////////////////////////////// Функция создания 2х таблиц, всех персов и онлайн состава.

function createNewList(membersData, tableId, hide, keySind){
	
	var hideStyle = hide ? 'display: none;' : 'display: block;';
	var html = '<div style="' + hideStyle + '" id="' + tableId + '"><br><table align="center" width="566" cellpadding="0" cellspacing="0" class="wb">';
	var icoSind = '';
	var count = 0;
	
	for(var i=0, len = rightLineId.length; i < len; i++){
		
		var tID = rightLineId[i];
		
		if(membersData[tID] != null){
			
			if(!(count % 70) && tableId == 'offTab'){
				html += '<tr height="26" bgcolor="#d0eed0"><td colspan="9" align="center"><i>Группа '+ (Math.ceil(count/70) + 1) +'<i></td></tr>';
			}
			
			if(!count && tableId == 'onTab'){
				html += '<tr height="26" bgcolor="#d0eed0"><td colspan="9" align="center"><i>' + onlineCount + ' бойцов онлайн<i></td></tr>';
			}
			
			var color = count % 2 ? 'bgcolor="#f8faf8"' : 'bgcolor="#e7f8e7"';
			
			if(membersData[tID].allData){
				var scill = membersData[tID].scills;
				var contentTD =	'<div style="float:left; width:34px;"><img border="0" src="' + ico[scill[0].type] + '"></div>'+
								'<div style="float:left; width:34px; color:green;">[<b>' + scill[0].level + '</b>]</div>'+
								'<div style="float:left; width:34px;"><img border="0" src="' + ico[scill[1].type] + '"></div>'+
								'<div style="float:left; width:34px; color:green;">[<b>' + scill[1].level + '</b>]</div>'+
								'<div style="float:left; width:34px;"><img border="0" src="' + ico[scill[2].type] + '"></div>'+
								'<div style="float:left; width:34px; color:green;">[<b>' + scill[2].level + '</b>]</div>';
					allDataKey = 1;
			}else{
				var contentTD = '-';
			}
			
			if(membersData[tID].idSind){
				icoSind = '<img width="20" height="14" border="0" title="#' + membersData[tID].idSind + '" src="' + urls.sindico + membersData[tID].idSind + '.gif">';
			}else{
				icoSind = '<img width="20" height="14" border="0" title="Нет основного синдиката" src="' + urls.tbg + '">';
			}
			
			html += '<tr height="26" ' + color + '>'+
						'<td class="wb" align="center" style="width: 28px;">'+
							'<a href="http://www.ganjawars.ru/syndicate.php?id=' + membersData[tID].idSind + '">'+
								icoSind +
							'</a>'+
						'</td>'+
						'<td class="wb" style="width: 150px;">'+
							'&nbsp;'+
							'<a href="http://www.ganjawars.ru/info.php?id=' + tID + '" style="text-decoration: none;">'+
								'<b>'+membersData[tID].nameChar+'</b>'+
							'</a>'+
						'</td>'+
						'<td class="wb" width="31" style="vertical-align:middle;">'+
							'<img width="4" height="13" src="' + urls.tbg + '">'+
							'<img width="23" height="13" src="' + urls.rank + membersData[tID].sindRank+'.gif">'+
						'</td>'+
						'<td class="wb" align="center" style="width: 30px; font-weight: 800; color: #cd5454;" id="'+ tableId + tID + '_level">'+
							  membersData[tID].levelChar +
						'</td>'+
						'<td class="wb" align="center" style="width: 30px; font-weight: 800; color: #0000ff;" id="'+ tableId + tID + '_slevel">'+
							  membersData[tID].levelSind +
						'</td>'+
						'<td class="wb" align="center" vailgn="middle" id="'+ tableId + tID + '_scills">'+
							contentTD +
						'</td>'+
						'<td class="wb" style="width: 26px;" align="center">'+
							'<input type="checkbox" id="' + tableId + '_' + tID + '_mailbox" />'+
						'</td>'+
						'<td class="wb" style="width: 26px;" align="center">'+
							'<img width="26" height="26" border="0" src="' + ico.uncheck + '" id="' + tableId + '_' + tID + '_status" />'+
						'</td>'+
						'<td class="wb" style="width: 26px;" align="center">'+
							'<img width="26" height="26" border="0" src="' + ico.send + '" id="' + tableId + '_' + tID + '_statusmail" />'+
						'</td>'+
					'</tr>';
					
			count++;
		}
	}
	
	var getDataButton = '';
	var groupsBox = '';
	var levelsRow = '';
	
	if(tableId == 'offTab' && keySind){
		getDataButton = '<tr height="16">'+
							'<td colspan="4"></td>'+
						'</tr>'+
						'<tr height="26">'+
							'<td width="25" align="center"><input type="radio" checked id="sendMail" /></td><td width="232">&nbsp;<b>Отправка почты</b></td>'+
							'<td width="25" align="center"><input type="radio" id="getAllData" /></td><td>&nbsp;<b>Сбор данных об игроках</b></td>'+
						'</tr>';
	}
	
	if(tableId == 'offTab' && count > 70){
		groupsBox = '<tr height="26">';
		for(var i = 0, len = Math.ceil(count/70); i < len; i++){
			if(!(i % 2) && i){
				groupsBox += '</tr><tr height="26">';
			}
			groupsBox +='<td width="25" align="center"><input type="checkbox" id="' + tableId + '_group_' + i + '" /></td><td width="232">&nbsp;<i>Выбрать группу '+(i+1)+'</i></td>';	
		}
		groupsBox += '</tr>';
	}
	
	if(allDataKey){
		levelsRow = '<tr height="16"><td colspan="4"></td></tr>'+
					'<tr height="26">'+
						'<td width="25" align="center"><input type="checkbox" id="' + tableId + '_tops_1"/></td><td width="232">&nbsp;<i>Выбрать 10 - 19 lvl</i></td>'+
						'<td width="25" align="center"><input type="checkbox" id="' + tableId + '_tops_2"/></td><td>&nbsp;<i>Выбрать 20 - 29 lvl</i></td>'+
					'</tr>'+
					'<tr height="26">'+
						'<td width="25" align="center"><input type="checkbox" id="' + tableId + '_tops_3"/></td><td width="232">&nbsp;<i>Выбрать 30 - 39 lvl</i></td>'+
						'<td width="25" align="center"><input type="checkbox" id="' + tableId + '_tops_4"/></td><td>&nbsp;<i>Выбрать 40 - 49 lvl</i></td>'+
					'</tr>';
	}
	
	html += 		'<tr>'+
						'<td align="center" class="wb" colspan="9" align="center">'+
							'<table width="514" align="center">'+
								'<tr height="18"><td colspan="4"></td></tr>'+
								'<tr height="26">'+
									'<td colspan="4">&nbsp;<b>Тема:</b>&nbsp;<input value="" type="text" style="width: 461px;" id="' + tableId + '_subj_out"></td>'+
								'</tr>'+
								'<tr height="26">'+
									'<td colspan="4">&nbsp;<b>Сообщение:</b></td>'+
								'</tr>'+
								'<tr>'+
									'<td colspan="4"><textarea style="width: 508px; height: 150px; overflow-y: scroll;" id="' + tableId + '_msg_out"></textarea></td>'+
								'</tr>'+
								'<tr height="26">'+
									'<td width="25" align="center"><input type="checkbox" id="' + tableId + '_selectAll" /></td><td colspan="3">&nbsp;<b>Выбрать всех</b></td>'+
								'</tr>'+
									groupsBox +
									levelsRow +
									getDataButton +
								'<tr height="40">'+
									'<td colspan="4" align="center" valign="bottom"><input type="button" id="' + tableId + '_buttonStart" value="Отправить" /></td>'+
								'</tr>'+
								'<tr height="18"><td colspan="4" id="' + tableId + '_countChecked" align="right" valign="bottom" style="font-size: 9px; font-style: italic;" title="Возможен бан почты за рассылку более 75 писем за один раз!">Отмечено: 0</td></tr>'+
							'</table>'+
						'</td>'+
					'</tr>'+
				'</table><br>'+
			'</div>';
	
	return html;
}

//////////////////////////////////////////////////////////// Жмакнута кнопка "Старт", определяем чего делать.

function runUp(key, tData, atData){
	if(key){
		runUpPrepareCollection(tData, atData, 0, 'onTab_');
	}else{
		if(BID('offTab_buttonStart').value == 'Собрать'){
			runUpPrepareCollection(tData, atData, 1, 'offTab_');
		}else{
			runUpPrepareCollection(tData, atData, 0, 'offTab_');
		}
	}
}

//////////////////////////////////////////////////////////// Определили, готовимся к выполеннию полученной задачи, парся отмеченных.

function runUpPrepareCollection(otData, atData, key, tabId){
	var array = [];
	var j = 0;
	
	
	for(var i=0, len = rightLineId.length; i < len; i++){
		var tID = rightLineId[i];
		
		if(otData[tID]!= null){
			if(otData[tID].checked){
				array[j] = tID;
				j++;
			}
		}
	}
	
	if(array.length){
		
		setActivAllGroups(true, atData);
		
		if(key){
			dataCollection(0, array.length, array, atData);
		}else{
			
			var param 	 = getLopata(urls.sms);
			var subj_out = convert(BID(tabId + 'subj_out').value);
	        var msg_out  = convert(BID(tabId + 'msg_out').value);
			
			setTimeout(function(){sendMails(0, array.length, array, atData, tabId, param.lopata, param.outmail, subj_out, msg_out);}, 750);
		}
	}else{
		alert('Вы никого не выбрали!');
		return;
	}
}

//////////////////////////////////////////////////////////// Отсылаем почту.

function sendMails(i, maxIndex, dataArray, atData, tabId, lopata, outmail, subj_out, msg_out){
	if(i < maxIndex){
		var mail_to = convert(atData[dataArray[i]].nameChar);
	  	var param = 'postform=1&outmail=' + outmail + '&lopata=' + lopata + '&mailto=' + mail_to + '&subject=' + subj_out + '&msg=' + msg_out;
	  	
  		if(i > 0){
			BID(tabId + dataArray[i - 1] + '_statusmail').src = ico.sended;
		}
		
		BID(tabId + dataArray[i] + '_statusmail').src = ico.sending;
		
		SEND_REQ(urls.sms, 'POST', param, false);
  		outmail++;
  		
  		i++;
  		setTimeout(function(){sendMails(i, maxIndex, dataArray, atData, tabId, lopata, outmail, subj_out, msg_out)}, 6000);
	}else{
		BID(tabId + dataArray[i - 1] + '_statusmail').src = ico.sended;
		setActivAllGroups(false, atData);
	}
}

//////////////////////////////////////////////////////////// Собираем данные по игрокам, их левелы, и умелки.

function dataCollection(i, maxIndex, dataArray, atData){
		if(i < maxIndex){
			REQ(urls.info + dataArray[i], 'GET', null, false, function (req) {aSpan.innerHTML = req.responseText;});
			
			if(i != 0){
				BID('offTab_' + dataArray[i - 1] + '_statusmail').src = ico.sended;
			}
			
			BID('offTab_' + dataArray[i] + '_statusmail').src = ico.sending;
			
			var level = 0;
			var levelSind = 0;
			var tmp = new Array;
			var scill = new Array;
			
			var tables = aSpan.getElementsByTagName('table');
			var	table = findTable(tables, 'Боевой:');
			var tr = findTable(tables, 'пистолетами:').rows;
				
				level = table.rows[0].cells[1].childNodes[0].textContent;
			
			var li = aSpan.getElementsByTagName('li');
		
			for(var j = 0, len = li.length; j < len; j++){
				if(li[j].textContent.indexOf('Основной синдикат:') != -1){
					levelSind = li[j].getElementsByTagName('b')[2].textContent;
				}
			}
			
			for(var j = 0, len = tr.length; j < len; j++){
				var b = tr[j].cells[1].getElementsByTagName('b')[0];
				var exp = b.nextSibling.nodeValue;
					exp = parseInt(exp.substring(2, exp.length-2), 10);
					tmp[j] = {'type':nScills[j], 'level':b.textContent, 'exp':exp};
			}
			scill = find3MaxScill(tmp);
			
			hashData[dataArray[i]] = {'data':1, 'levelChar':level, 'levelSind':levelSind, 'scills':scill};
			
			insertInTable(dataArray[i], level, levelSind, scill);
			
			i++;
			setTimeout(function(){dataCollection(i, maxIndex, dataArray, atData)}, 1500);
		}else{
			BID('offTab_' + dataArray[i - 1] + '_statusmail').src = ico.sended;
			convertAndSet(hashData, 0);
			setActivAllGroups(false, atData);
		}
	
}

//////////////////////////////////////////////////////////// Определяем 3 максимальные умелки.

function find3MaxScill(array){
	var hash = new Array;
	
	for(var i = 0; i < 3; i++){
		
		var current = 0;
		var index = 0;
		
		for(var j = 0, len = array.length; j < len; j++){
			if(current < array[j].exp){
				current = array[j].exp;
				index = j;
			}
		}
		
		if(array[index].level.indexOf('/')!= -1){
			array[index].level = parseInt(array[index].level.split('/')[1], 10) + 20;
		}
		
		hash[i] = {'type':nScills[index], 'level':array[index].level};
		array[index].exp = -1;
	}
	return hash;
}

//////////////////////////////////////////////////////////// Для данных в памяти, чтобы не юзать JSON, конвертим сами в объект.

function convertToObject(string){
	var hash = {};
	if(string.indexOf('|')!= -1){
		var data = string.split('|');
		for(var i=0, len = data.length - 1; i < len; i++){
			data[i] = data[i].split(':');
			
			hash[data[i][0]] = {'data':data[i][1], 'levelChar':data[i][2], 'levelSind':data[i][3], 'scills':[{'type':nScills[data[i][4]], 'level':data[i][5]}, {'type':nScills[data[i][6]], 'level':data[i][7]}, {'type':nScills[data[i][8]], 'level':data[i][9]}]};
		}
	}
	return hash;
}

//////////////////////////////////////////////////////////// А здесь наоборот, из объекта, в строке нужного типа, и либо в суем в локал сторедж, либо, возвращаем результ.

function convertAndSet(object, key){
	var string = '';
	
	for(var i in object){
		string += i + ':' + object[i].data + ':' + object[i].levelChar + ':' + object[i].levelSind + ':' + tScills[object[i].scills[0].type] + ':' + object[i].scills[0].level  + ':' + tScills[object[i].scills[1].type] + ':' + object[i].scills[1].level + ':' + tScills[object[i].scills[2].type] + ':' + object[i].scills[2].level + '|';
	}
	
	if(key){ return string; }else{ localStorage.setItem('gk_sind_list', string);}
}

//////////////////////////////////////////////////////////// Подчищаем в памяти тех игроков которых нет в списке синда. Покойтесь с миром ;)

function cleansData(membersData, hashData){
	for(var i in hashData){
		if(membersData[i] == null){
			delete hashData[i];
		}
	}
	return hashData;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////// DINAMIC INTERFACE /////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////// При переключении "вкладок", меняем фоновую картинку, обман зрения короче.

function setBG(key){
	if(key){
		BID('tab_bg').style.background = 'url(http://i.ganjafoto.ru/1/72/34/1723421.jpg) no-repeat';
		BID('offTab').style.display = 'none';
		BID('onTab').style.display = 'block';
	}else{
		BID('tab_bg').style.background = 'url(http://i.ganjafoto.ru/1/72/34/1723422.jpg) no-repeat';
		BID('offTab').style.display = 'block';
		BID('onTab').style.display = 'none';
	}
}

//////////////////////////////////////////////////////////// Тута, в памяти помечаем нужных, при отдельных кликах на чекбоксах.

function setStatusOffLine(index, tData){
	var url = BID('offTab_' + index + '_status');
		url.src = url.src == ico.uncheck ? ico.check : ico.uncheck;
		 tData[index].checked = tData[index].checked ? 0 : 1;
		
		metersChecked(tData, 'offTab_');
}

function setStatusOnLine(index,  tData){
	var url = BID('onTab_' + index + '_status');
		url.src = url.src == ico.uncheck ? ico.check : ico.uncheck;
		tData[index].checked = tData[index].checked ? 0 : 1;
		
		metersChecked(tData, 'onTab_');
}

//////////////////////////////////////////////////////////// А тут при клике на бокс "Выбрать всех", это и делаем.

function selectAll(tData, idTable){
	var key =  BID(idTable + 'selectAll').checked;
	
	for(var i in tData){
		if(key){
			selectOne(i, idTable, tData);
		}else{
			deselectOne(i, idTable, tData);
		}
	}
	
	if(idTable == 'offTab_'){
		setActivGroupsOff(key, 0);
	}else{
		setActivGroupsOn(key, 0);
	}

	metersChecked(tData, idTable);
}

//////////////////////////////////////////////////////////// Тут тоже, но только порядковые группы.

function selectGroups(group, tData){
	var key = BID('offTab_group_' + group).checked;

	for(var i in tData){
		if(tData[i].group == group){
			if(key){
				selectOne(i, 'offTab_', tData);
			}else{
				deselectOne(i, 'offTab_', tData);
			}
		}
	}
	
	if(key){meChInGroup[0]++;}else{meChInGroup[0]--;}
	
	setActivGroupsOff(key, 2);
	metersChecked(tData, 'offTab_');
}

//////////////////////////////////////////////////////////// И здесь, но уже группы по левелам.

function selectLvlGroups(group, tData, tabId){
	var key = BID(tabId + 'tops_' + group).checked;

	for(var i in tData){
		if(tData[i].levelGroup == group){
			if(key){
				selectOne(i, tabId, tData);
			}else{
				deselectOne(i, tabId, tData);
			}
		}
	}
	
	if(tabId == 'offTab_'){
		if(key){meChInGroup[1]++;}else{meChInGroup[1]--;}; setActivGroupsOff(key, 1);
	}else{
		if(key){meChInGroup[2]++;}else{meChInGroup[2]--;};setActivGroupsOn(key, 1);
	}
	metersChecked(tData, tabId);
}

//////////////////////////////////////////////////////////// Регулируем активность чекбоксов, на оффлайн вкладке.

function setActivGroupsOff(status, key){
	if(key){
		if(key == 2){
			if(status){
				setActivGroup_1('offTab_', status);
				setActivGroup_3('offTab_', status);
			}else{
				if(!meChInGroup[0]){
					setActivGroup_1('offTab_', status);
					setActivGroup_3('offTab_', status);
				}
			}
		}else{
			if(status){
				setActivGroup_1('offTab_', status);
				setActivGroup_2(status);
			}else{
				if(!meChInGroup[1]){
					setActivGroup_1('offTab_', status);
					setActivGroup_2(status);
				}
			}
		}
	}else{
		setActivGroup_2(status);
		setActivGroup_3('offTab_', status);
	}
}

//////////////////////////////////////////////////////////// Регулируем активность чекбоксов, на онлайн вкладке.

function setActivGroupsOn(status, key){
	if(key){
		if(status){
			setActivGroup_1('onTab_', status);
		}else{
			if(!meChInGroup[2]){
				setActivGroup_1('onTab_', status);
			}
		}
	}else{
		setActivGroup_3('onTab_', status);
	}
}

//////////////////////////////////////////////////////////// Полностью, все гасим или включаем.

function setActivAllGroups(status, tData){
	setActivGroup_1('offTab_', status);
	setActivGroup_1('onTab_', status);
	setActivGroup_2(status);
	setActivGroup_3('offTab_', status);
	setActivGroup_3('onTab_', status);
	BID('offTab_buttonStart').disabled = status;
	BID('onTab_buttonStart').disabled = status;
	
	BID('offTab_subj_out').disabled = status;
	BID('onTab_subj_out').disabled = status;
	
	BID('offTab_msg_out').disabled = status;
	BID('onTab_msg_out').disabled = status;
	
	for(var i in tData){
		var offLineBox = BID('offTab_'+ i + '_mailbox');
		var onLineBox = BID('onTab_'+ i + '_mailbox');
	
		if(onLineBox != null){
			onLineBox.disabled = status;
		}
		offLineBox.disabled = status;
	}
}

//////////////////////////////////////////////////////////// Конкретное управление группами чекбосов.

function setActivGroup_1(tabId, status){ BID(tabId + 'selectAll').disabled = status;}
function setActivGroup_2(status){ for(var i=0; i < coutGroups; i++){ BID('offTab_group_' + i).disabled = status;}}
function setActivGroup_3(tabId, status){for(var i=1; i < coutLvlGroups; i++){BID(tabId + 'tops_' + i).disabled = status;}}

//////////////////////////////////////////////////////////// Дочерние функции для отметки одной записи, или снятия выделения.

function selectOne(index, idTable, tData){
	BID(idTable + index + '_status').src = ico.check;
	BID(idTable + index + '_mailbox').checked = true;
	
	tData[index].checked = 1;
}

function deselectOne(index, idTable, tData){
	BID(idTable + index + '_status').src = ico.uncheck;
	BID(idTable + index + '_mailbox').checked = false;
	
	tData[index].checked = 0;
}

//////////////////////////////////////////////////////////// Меняем текст на кнопке, сбор данных, или же синдрассылка.

function selectTypeWork(key){
	var boxGetAllData = BID('getAllData');
    var boxSendMail = BID('sendMail');
    var buttonStart = BID('offTab_buttonStart');
    
    if(key){
    	boxGetAllData.checked = false;
    	buttonStart.value = 'Отправить';
    }else{
    	boxSendMail.checked = false;
    	buttonStart.value = 'Собрать';
    }
}

//////////////////////////////////////////////////////////// Во время сбора данных, инсертим собранное в таблицу.

function insertInTable(id, level, levelSind, scill){
	var htmlScills = '<div style="float:left; width:34px;"><img border="0" src="' + ico[scill[0].type] + '"></div>'+
					 '<div style="float:left; width:34px; color:green;">[<b>' + scill[0].level + '</b>]</div>'+
					 '<div style="float:left; width:34px;"><img border="0" src="' + ico[scill[1].type] + '"></div>'+
					 '<div style="float:left; width:34px; color:green;">[<b>' + scill[1].level + '</b>]</div>'+
					 '<div style="float:left; width:34px;"><img border="0" src="' + ico[scill[2].type] + '"></div>'+
					 '<div style="float:left; width:34px; color:green;">[<b>' + scill[2].level + '</b>]</div>';
					 
	var onScills = BID('onTab' + id + '_scills');
	
	if( onScills!= null){
		onScills.innerHTML = htmlScills;
		
		BID('onTab' + id + '_level').innerHTML = level;
		BID('onTab' + id + '_slevel').innerHTML = levelSind;
	}
					 
	BID('offTab' + id + '_scills').innerHTML = htmlScills;
	BID('offTab' + id + '_level').innerHTML = level;
	BID('offTab' + id + '_slevel').innerHTML = levelSind;
}

//////////////////////////////////////////////////////////// Подсчет отмеченых полей.

function metersChecked(tData, tabId){
	var countChecked = 0;

	for(var i in tData){
		if(tData[i].checked){
			countChecked++;
		}
	}
		
	if(countChecked > 70){
		BID(tabId + 'countChecked').style.color = '#ff0000';
	}else{
		BID(tabId + 'countChecked').style.color = '#000000';
	}
	
	BID(tabId + 'countChecked').innerHTML = 'Отмечено: ' + countChecked;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////// API ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////// Клонируем объект.

function clone(obj){
	if(obj == null || typeof(obj) != 'object')
		return obj;
	var temp = new obj.constructor(); 
	for(var key in obj)
		temp[key] = clone(obj[key]);
	return temp;
}

//////////////////////////////////////////////////////////// Ищем таблицы.

function findTable(tables, text){
	for(var i=0, len = tables.length; i < len; i++ ){
		if(tables[i].rows[0] != null){
			if(tables[i].rows[0].cells[0].textContent == text){
				return tables[i];
			}
		}
	}
	return null;
}

//////////////////////////////////////////////////////////// Взять куки.

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

//////////////////////////////////////////////////////////// Дергаем номер основы.

function getSindId(url){
	REQ(url, 'GET', null, false, function (req) {aSpan.innerHTML = req.responseText;});
	
	var mySindId = aSpan.getElementsByTagName('ul');
		
	for(var i=0, len = mySindId.length; i < len; i++){
		if(mySindId[i].textContent.indexOf('Основной синдикат:') != -1){
			return (mySindId[i].getElementsByTagName('a')[0].href).split('=')[1];
		}
	}
	return 0;
}

//////////////////////////////////////////////////////////// Дергаем лопату.

function getLopata(url){
	REQ(url, 'GET', null, false, function (req) {aSpan.innerHTML = req.responseText;});
	
	var inputs = aSpan.getElementsByTagName('input'); 
     
     for(var i=0; i < inputs.length; i++){
         if(inputs[i].name == 'outmail'){
            var outmail = parseInt(inputs[i].value, 10);
         }
         if(inputs[i].name == 'lopata'){
            var lopata = inputs[i].value;
         }
     }
     
     return {'outmail':outmail, 'lopata':lopata};
}

//////////////////////////////////////////////////////////// Дергаем часы.

function getHours(){
	var currentTime = new Date();
	var time = Math.floor(((currentTime.getTime() / 1000) / 60) / 60);
	return parseInt(time, 10);
}

//////////////////////////////////////////////////////////// Конвертим строку в вид для отправки.

function convert(str){
   var win = {1040:192,1041:193,1042:194,1043:195,1044:196,1045:197,1046:198,1047:199,1048:200,1049:201,1050:202,1051:203,1052:204,1053:205,1054:206,1055:207,1056:208,1057:209,1058:210,1059:211,1060:212,1061:213,1062:214,1063:215,1064:216,1065:217,1066:218,1067:219,1068:220,1069:221,1070:222,1071:223,1072:224,1073:225,1074:226,1075:227,1076:228,1077:229,1078:230,1079:231,1080:232,1081:233,1082:234,1083:235,1084:236,1085:237,1086:238,1087:239,1088:240,1089:241,1090:242,1091:243,1092:244,1093:245,1094:246,1095:247,1096:248,1097:249,1098:250,1099:251,1100:252,1101:253,1102:254,1103:255,1025:168,1105:184,8470:185};        
    var ret = '';
    for (i=0; i<str.length; i++){
		var n = str.charCodeAt(i);
		if (win[n]) n = win[n];
		if (n < 16)
			ret += '%0'+n.toString(16);
		else
			ret += '%'+n.toString(16);
    }
    return ret;
}

//////////////////////////////////////////////////////////// Запрос на сбор инфы, и ее отправку.

function REQ(url, method, param, async, onsuccess, onfailure) {
       request.open(method, url, async);
       request.send(param);
       if (request.readyState == 4 && request.status == 200 && typeof onsuccess != 'undefined') onsuccess(request);
       else if (request.readyState == 4 && request.status != 200 && typeof onfailure != 'undefined') onfailure(request);
}

function SEND_REQ(url, method, param, async){
    request.open(method, url, async);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.send(param);
}

//////////////////////////////////////////////////////////// Упрощаем поиск

function BID(id){return root.document.getElementById(id)};
function BTN(name){return root.document.getElementsByTagName(name)};
function DCE(elem){return document.createElement(elem)};

})();