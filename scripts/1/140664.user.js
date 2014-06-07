// ==UserScript==
// @name             All battles user info [GW]
// @description      Скрипт для автоматического подсчета количества проведенных боев персонажем за последний месяц (соотношение синдовых и общего количества)
// @include			 http://www.ganjawars.ru/info.php?id=*
// @version          1.00
// @author           Bl(a)de
// ==/UserScript==


(function () {	
	var sindId = 1992;
	var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
	var request = new XMLHttpRequest();
	function BID(id){return root.document.getElementById(id)};
	function DCE(elem){return document.createElement(elem)};
	function SEND_REQ(url, method, param, async){
		request.open(method, url, async);
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
		request.send(param);
	}
	function REQ(url, method, param, async, onsuccess, onfailure) {
       request.open(method, url, async);
       request.send(param);
       if (request.readyState == 4 && request.status == 200 && typeof onsuccess != 'undefined') onsuccess(request);
       else if (request.readyState == 4 && request.status != 200 && typeof onfailure != 'undefined') onfailure(request);
	}
	function strToTs(str){
		var rrr=/(\d+)\.(\d+)\.(\d+) (\d+):(\d+)/i.exec(str);
		if (rrr==null){
			return false;
		}
		var res = new Date(months[rrr[2]*1]+' '+rrr[1]*1+', 20'+rrr[3]*1+' '+rrr[4]*1+':'+rrr[5]*1+':00 GMT');
		res=res.getTime();
		return res;
	}
	function inMySind(data) {
		var sindsArray = new Array();
		sindsArray = data.split(',');
		if ((sindsArray[0] == sindId) || (sindsArray[1] == sindId)) {
			return true;
		} else return false;
	}
	function printRes() {
		var percnt = 100*countSindBattles/(countSindBattles+countOtherBattles);
		var str = '<span style="font-size:13px; font-weight:bold; text-alegn:center; color:blue;">Статистика проведенных боев за последние '+countDays+' дней(я)</span><br />&nbsp;';
		str += '<table class=wb width=500 cellspacing=1 cellpadding=1 align=center><tr><td class=wb style="background-color:#cccccc; font-weight:bold; color:green; text-align:center;">Всего боев</td><td class=wb style="background-color:#cccccc; font-weight:bold; color:green; text-align:center;">Синдовых</td><td class=wb style="background-color:#cccccc; font-weight:bold; color:green; text-align:center;">Других</td><td class=wb style="background-color:#cccccc; font-weight:bold; color:green; text-align:center;">% синдовых</td></tr>';
		str += '<tr><td class=wb style="background-color:#eeeeee; font-weight:bold; color:red; text-align:center;">'+(countSindBattles+countOtherBattles)+'</td><td class=wb style="background-color:#eeeeee; font-weight:bold; color:red; text-align:center;">'+countSindBattles+'</td><td class=wb style="background-color:#eeeeee; font-weight:bold; color:red; text-align:center;">'+countOtherBattles+'</td><td class=wb style="background-color:#eeeeee; font-weight:bold; color:red; text-align:center;">'+percnt.toFixed(2)+'%</td></tr>';
		str += '</table><br />&nbsp;';
		BID('result').innerHTML = str;
	}
	function getUserBattlesList(page) {
		REQ('http://www.ganjawars.ru/info.warstats.php?id='+persId+'&page_id='+page, 'GET', null, false, function (req) {aSpan.innerHTML = req.responseText;});
		if (aSpan.innerHTML.indexOf('Извините, доступ к списку закрыт: игрок находится в бою или в заявке.') >= 0) {
			BID('result').innerHTML = 'Извините, доступ к списку закрыт: игрок находится в бою или в заявке. Заходите немного позже!';
		} else {
			var found=false;
			var myregexp = /warlog\.php\?bid=\d+\"><font color=\"green\">(\d+)\.(\d+)\.(\d+) (\d+):(\d+)<\/font>[^|]+\|[^|]+\|\d+=\d+\|\d+=\d+\|[^|]+\|([^x]+)x([^|]+)\| --->/ig;
			match = myregexp.exec(aSpan.innerHTML);
			if (match!=null) BID('result').innerHTML = 'Обрабатываем страницу логов №'+(page+1);
			var s = '';
			while (match!=null){
				found=true;
				s=match[1]+'.'+match[2]+'.'+match[3]+' '+match[4]+':'+match[5];
				var battleDate=strToTs(s);
				var def = ((nowDate-battleDate)/3600000).toFixed(1);
				if (def <= 24*countDays) {
					if (inMySind(match[6]) || inMySind(match[7])){		
						countSindBattles++;
					} else {
						countOtherBattles++;
					}
				} else {
					if ((countSindBattles+countOtherBattles) != 0) root.setTimeout(function(){printRes();},1000);
					else {
						found = false;
					}
					break;
				}
				match = myregexp.exec(aSpan.innerHTML);				
			}
			if ((match==null)&&(found)){
				root.setTimeout(function(){getUserBattlesList(page+1);},1000);
			} else if (!found && s != ''){
				BID('result').innerHTML = 'За указанный период персонаж не воевал. Дата последнего боя: <font color=red>'+s+'</font>';
			} else if (match==null){
				BID('result').innerHTML = 'Извините, но протоколы боев персонажа сейчас недоступны!<br />Возможно персонаж в бою или в заявке на бой, либо же протоколы скрыты.<br />Попробуйте запустить скрипт немного позже.';
			}else {
				root.setTimeout(function(){printRes();},1000);
			}
		}
		
		
	}
	function getNowDate() {
		REQ('http://www.ganjawars.ru/syndicate.log.php?id='+sindId, 'GET', null, false, function (req) {aSpan.innerHTML = req.responseText;});
		var date = /<font color=\"green\">(\d+)\.(\d+)\.(\d+) (\d+):(\d+)<\/font>\&nbsp\;\&nbsp\;\&nbsp\;/i.exec(aSpan.innerHTML);
		if(date != null) {
			var temp = parseInt(BID('countDaysInp').value);
			if (isNaN(temp) || temp == '') {
				alert('Некорректно указано количество дней!');
				return;
			} else countDays = temp;
			BID('result').innerHTML = 'Скрит запущен! Ждем...';
			var s=date[1]+'.'+date[2]+'.'+date[3]+' '+date[4]+':'+date[5];
			nowDate = strToTs(s);
			countSindBattles = 0;
			countOtherBattles = 0;
			setTimeout(function(){getUserBattlesList(0);}, 1000);
		} else {
			alert('Извините, но скрипт остановлен из-за ошибки!');
		}
		
	}
	
	function getPersId() {
		var res = '';
		res=/id=(\d+)/i.exec(root.location.href);
    	res=res[1];
		return res;
	}
	function getCountDays() {
		BID('result').innerHTML = 'Введите количество дней для анализа: <input type="text" id="countDaysInp" value="10" size="4" maxlength="3" /> <input type="button" id="startScriptBtn" value="Вперед >>" />';
		BID('startScriptBtn').addEventListener('click', function(){getNowDate();}, true);
	}
	
	
	var aSpan = DCE('span');
	var months=new Array();
	var persId = getPersId();
	months[1]='January';months[2]='February';months[3]='March';months[4]='April';months[5]='May';months[6]='June';months[7]='July';months[8]='August';
    months[9]='September';months[10]='October';months[11]='November';months[12]='December';
	var nowDate = 0;
	var countDays = 30;
	var countSindBattles = 0;
	var countOtherBattles = 0;
    var b=root.document.getElementsByTagName('b');
    for (var i=0;i<b.length;i++){		
		if (b[i].textContent=='Статистика'){ 
			var span = DCE('span');
			span.style.color='blue';
			span.id='status';
			span.innerHTML = '<b>&nbsp;&nbsp;<a href="#" style="color:red; cursor:pointer; text-decoration:underline;" id="startStat" title="Узнать количество синдовых/общих боев за указанное количество дней!" onclick="return false;">[Количество проведенных боев]</a><br /><br /><span id="result">Нажмите на ссылку выше чтобы запустить скрипт!</span></b>';
			b[i].parentNode.appendChild(span);
			//BID('startStat').addEventListener('click', function(){getNowDate();}, true);
			BID('startStat').addEventListener('click', function(){getCountDays();}, true);
			break;
		}
    }
})();