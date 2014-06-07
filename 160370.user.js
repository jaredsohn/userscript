// ==UserScript==
// @name             Mailer Delete [GW]
// @description		 Удаляет синдикатную рассылку
// @include			 http://www.ganjawars.ru/sms.php*
// @version          1.0
// @download		 http://ganjascript.ru/mailerDel.user.js
// @author           (Савик)
// ==/UserScript==

(function working() {
	var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
	var parent = root.document;
	var newM = false;
	var sTime = /(.*?):(.*?)\, \d* игроков онлайн/.exec(parent.body.innerHTML);
	var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
	var now = new Date();
	var selDate = 0;
	var msglist = [];
	
	
	if (/<b>Удаление сообщений<\/b>/.test(parent.body.innerHTML)) {
		var ajaxSc = parent.createElement('script');
		ajaxSc.innerHTML = 'function ajax(url,rmethod,param,async,onsuccess,onfailure,isForm,xTime){var xmlHttpRequest = new XMLHttpRequest();xmlHttpRequest.open(rmethod, url, async);if (isForm) {xmlHttpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");xmlHttpRequest.setRequestHeader("Content-length", param.length);xmlHttpRequest.setRequestHeader("Referer", "http://www.ganjawars.ru/sms.php?page_id2=0&page_id1="+xTime);}xmlHttpRequest.send(param);var timeout = setTimeout(function(){ xmlHttpRequest.abort(); }, 10000);xmlHttpRequest.onreadystatechange = function (){if (xmlHttpRequest.readyState != 4) return;clearTimeout(timeout);if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200 && typeof onsuccess != "undefined") onsuccess(xmlHttpRequest);	else if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status != 200 && typeof onfailure != "undefined") onfailure(xmlHttpRequest);}};';
		parent.body.appendChild(ajaxSc);
		var ie = (navigator.userAgent.indexOf('MSIE') != -1);
		var inputs = parent.getElementsByTagName('input');
		for (var i = 0; i < inputs.length; i++)
			if (/Удалить/.test(inputs[i].getAttribute('name'))) {
				inputs[i].setAttribute('value','Удалить сообщения');
				inputs[i].setAttribute('id','delBut');
				if (!ie) {
					inputs[i].removeAttribute('onclick');
					inputs[i].addEventListener('submit', function() { return false; }, false);
					inputs[i].addEventListener('click', delBClick, false);
				}
				else {
					inputs[i].onclick = null;
					inputs[i].onsubmit = null;
					inputs[i].attachEvent('onclick', delBClick);
				}
			}
		var selObj = parent.getElementsByTagName('select');
		for (var i = 0; i < selObj.length; i++)
			if (/to_kill/.test(selObj[i].getAttribute('name'))) {
				selObj[i].innerHTML += '<option value="5">Рассылка</option>';
				if (!ie)
					selObj[i].addEventListener('change', selFChange, false);
				else
					selObj[i].attachEvent('change', selFChange);
			}
	}
	
	function paintBut(){
		var delBut = document.getElementById('delBut');
		if (/Удалить сообщения/.test(delBut.getAttribute('value')))
			delBut.setAttribute('value','•');
		else if (delBut.getAttribute('value').length < 15)
			delBut.setAttribute('value', delBut.getAttribute('value')+'•');
		else delBut.setAttribute('value','•');
	}
	
	function delBClick(e) {
		setInterval(paintBut, 500);
		var selObj = parent.getElementsByTagName('select');
		var sendForm;
		var selVal = '0';
		var selInd = '0';
		var forms = parent.getElementsByTagName('form');
		for (var i = 0; i < forms.length; i++) {
			if (/\/sms.php/.test(forms[i].getAttribute('action'))) sendForm = forms[i];
		}
		for (var i = 0; i < selObj.length; i++)
			if (/to_kill/.test(selObj[i].getAttribute('name'))) {
				selVal = selObj[i].options[selObj[i].selectedIndex].value;
				selInd = i;
			}
		if (selVal == '5') {
			selDate = selObj[selInd+1].options[selObj[selInd+1].selectedIndex].value;
			now.setHours(Number(sTime[1]));
			now.setMinutes(Number(sTime[2]));
			now.setDate(now.getDate() - Number(selDate));
			now = now.getTime();
			deleteFrom('0');
		} else {
			sendForm.submit();
		}
		e.preventDefault();
	}		
	
	function deleteFrom(page) {
		url = 'http://www.ganjawars.ru/sms.php?page_id2=0&page_id1=' + page;
		ajax(url, 'GET', null, true, function(xml) {
				var node = document.createElement('div');
				node.innerHTML = xml.responseText;
				var trs = node.getElementsByTagName('tr');
				for (var i = 0; i < trs.length; i++) {
					if ((/ffffff/.test(trs[i].getAttribute('bgcolor'))) || 
						(/f0fff0/.test(trs[i].getAttribute('bgcolor')))){
						if (/<b>#\d*<\/b>/.test(trs[i].innerHTML)) {
							var mDate = /"><nobr>(.*?):(.*?) (.*?) (.*?)&nbsp;/.exec(trs[i].innerHTML);
							var mTime = new Date();
							mTime.setDate(Number(mDate[3]));
							mTime.setHours(Number(mDate[1]));
							mTime.setMinutes(Number(mDate[2]));
							mTime.setMonth(monthNames.indexOf(mDate[4]));
							mTime = mTime.getTime();
							if (mTime < now){
								if (!newM) {
									if (!/color="red"/.test(trs[i].innerHTML)) {
										msglist.push(/;id=(.*?)"/.exec(trs[i].innerHTML)[1]+':'+/name=".*\[(.*?)\]" value=/.exec(trs[i].innerHTML)[1]);
									}
								} else {
									msglist.push(/;id=(.*?)"/.exec(trs[i].innerHTML)[1]+':'+/name=".*\[(.*?)\]" value=/.exec(trs[i].innerHTML)[1]);
								}
							} else {
								delMsgList();
								return;
							}
						}
					}
				}
				var re = new RegExp('page_id2=0&amp;page_id1='+(Number(/red">(.*?)</.exec(node.innerHTML)[1])+1));
				if (re.test(node.innerHTML)){
					deleteFrom(/red">(.*?)</.exec(node.innerHTML)[1]);
				} else delMsgList();
			},
			function(xml) {
				alert('Ошибка 002: Невозможно удалить сообщения: сервер не отвечает.');
				document.location.href = document.location.href;
			}, false);
	}
	
	function delMsgList(){
		var uri = 'http://www.ganjawars.ru/sms.php';
		var data = 'page=0';
		var iter = 0;
		var xTime = 0;
		for (var i = 0; i < msglist.length; i++) {
			var helper = msglist[i].split(':');
			if (Number(helper[1]) > iter) {
				data += '&killin['+helper[1]+']='+helper[0];
				iter = Number(helper[1]);
			} else {
				setTimeout('ajax("'+uri+'", "POST", "'+data+'", true, function() {return true;}, function() { alert("Ошибка 003: Невозможно удалить сообщения: сервер не отвечает."); document.location.href = document.location.href;}, true,'+xTime+')', (xTime*1000+10));
				xTime++;
				data = 'page=0' + '&killin['+helper[1]+']='+helper[0];
				iter = helper[1];
			}
		}
		if (data.length > 26)
			setTimeout('ajax("'+uri+'", "POST", "'+data+'", true, function(xml) { alert("Сообщения успешно удалены"); document.location.href = "http://www.ganjawars.ru/sms.php";},	function() {alert("Ошибка 004: Невозможно удалить сообщения: сервер не отвечает.");document.location.href = document.location.href;}, true, '+xTime+')', (xTime*1000+500));
		else alert('Ошибка 001: Писем рассылки не найдено');
	}
	
	function selFChange(e) {
		var inputs = parent.getElementsByTagName('input');
		var selVal = e.target.options[e.target.selectedIndex].value;
		for (var i = 0; i < inputs.length; i++) {
			if ((/kill_important/.test(inputs[i].getAttribute('name'))) ||
				(/keep_friends/.test(inputs[i].getAttribute('name')))){
				if (selVal == '5') inputs[i].disabled = true;
				else inputs[i].disabled = false;
			} else if (/kill_unread/.test(inputs[i].getAttribute('name'))) {
				if (selVal == '5') {
					if (inputs[i].getAttribute('value') != '0') {
						inputs[i].checked = true; 
						newM = true;
						inputs[i].addEventListener('click',setNewM,false);
					} else {
						inputs[i].checked = false; 
						newM = false;
						inputs[i].addEventListener('click',setNewM,false);
					}
				} else {
					if (inputs[i].getAttribute('value') != '1') {
						inputs[i].checked = true; 
						newM = false;
						inputs[i].addEventListener('click',setNewM,false);
					} else {
						inputs[i].checked = false; 
						newM = true;
						inputs[i].addEventListener('click',setNewM,false);
					}
				}
			}
		}
	}
	
	function setNewM(e) {
		if (e.target.getAttribute('value') == '0') newM = false;
		else newM = true;
	}
	
	function ajax(url, rmethod, param, async, onsuccess, onfailure, isForm, xTime) {
		var xmlHttpRequest = new XMLHttpRequest();
		xmlHttpRequest.open(rmethod, url, async);
		if (isForm) {
			xmlHttpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			xmlHttpRequest.setRequestHeader('Content-length', param.length);
			xmlHttpRequest.setRequestHeader('Referer', 'http://www.ganjawars.ru/sms.php?page_id2=0&page_id1='+xTime);
		}
		xmlHttpRequest.send(param);
		var timeout = setTimeout(function(){ xmlHttpRequest.abort(); }, 10000);
		xmlHttpRequest.onreadystatechange = function () {
			if (xmlHttpRequest.readyState != 4) return;
			clearTimeout(timeout);
			if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200 && typeof onsuccess != 'undefined') onsuccess(xmlHttpRequest);
			else if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status != 200 && typeof onfailure != 'undefined') onfailure(xmlHttpRequest);
		}
	};
})();