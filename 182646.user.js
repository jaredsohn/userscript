// ==UserScript==
// @name           farmBot [GW]
// @author         Эм... кому надо, тот знает =)
// @description    Работает на ферме, как негр)
// @include 	   http://www.ganjawars.ru/ferma.php*
// ==/UserScript==

(function farmBot() {
	var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window; // найдем окно, вызвавшее скрипт
	var parent = root.document; // для простоты кода, обозначим документ-папашу)
	var state = localStorage.getItem('stateBot'); // текущий режим бота
	var enable = localStorage.getItem('fbEnbl'); // включатель бота
	var ot = localStorage.getItem('otTime'); // от ...
	var ido = localStorage.getItem('doTime'); // и до ... секунд перед обновлением страницы
	var tick = Number(localStorage.getItem('tick')); // осталось секунд до обновления
	var dlina = Number(localStorage.getItem('dlina')); // грядки в длину
	var visota = Number(localStorage.getItem('visota')); // грядки в высоту
	// принудительное отключение:
	// enable = false;
// Поехали!)
	function getRandomInt(min, max)
	{
	    return Math.floor(Math.random() * (max - min + 1)) + Number(min);
	}
	if ((enable == 'null') || (enable == null)) {
		enable = true;
		localStorage.setItem('fbEnbl', 'true');
	} else {
		if (enable == 'true') enable = true;
		else enable = false;
	}	
	if ((state == 'null') || (state == null)) {
		state = 0;
		localStorage.setItem('stateBot', '0');
	}
	if ((dlina == 'null') || (dlina == null)) {
		dlina = 2;
		visota = 2;
		localStorage.setItem('dlina', '2');
		localStorage.setItem('visota', '2');
	}
	if ((ot == 'null') || (ot == null)) {
		ot = 500;
		ido = 1000;
		localStorage.setItem('otTime', '500');
		localStorage.setItem('doTime', '1000');
	}
	if (parent.location.href.indexOf('/ferma.php') >= 0) {
		if (enable) {
			if (state == 0) {
				var inputs = parent.getElementsByTagName('input');
				var links = parent.getElementsByTagName('a');
				var schet = 0;
				for (var i = 0; i < inputs.length; i++) {
					if (inputs[i].getAttribute('value').indexOf('Посадить') != -1) {
						inputs[i].click();
						schet++;
						break;
					}
				}
				for (i = 0; i < links.length; i++) {
					if (links[i].innerHTML.indexOf('Вскопать') != -1) {
						root.location.href = 'http://www.ganjawars.ru' + links[i].getAttribute('href');
						schet++;
						break;
					} else if (links[i].innerHTML.indexOf('Собрать урожай') != -1) {
						root.location.href = 'http://www.ganjawars.ru' + links[i].getAttribute('href');
						schet++;
						break;
					} else if (links[i].innerHTML.indexOf('Полить ') != -1) {
						root.location.href = 'http://www.ganjawars.ru' + links[i].getAttribute('href');
						schet++;
						break;
					} else if (links[i].innerHTML.indexOf('Убрать ') != -1) {
						root.location.href = 'http://www.ganjawars.ru' + links[i].getAttribute('href');
						schet++;
						break;
					}
				}
				if (schet == 0) {
					uri = parent.location.href;
					x = Number(uri.substring(uri.indexOf('x=')+2,uri.indexOf('x=')+3));
					y = Number(uri.substring(uri.indexOf('y=')+2,uri.indexOf('y=')+3));
					if (x < (dlina-1)) {
						parent.location.href = 'http://www.ganjawars.ru/ferma.php?x='+String(x+1)+'&y='+y;
					} else if ((dlina-1) && (y < (visota-1))) {
						parent.location.href = 'http://www.ganjawars.ru/ferma.php?x=0&y='+String(y+1);
					} else {
						localStorage.setItem('stateBot', '1');
						parent.location.href = 'http://www.ganjawars.ru/ferma.php?x=0&y=0';
					}
				}
			} else if (state == 1) {
				if (tick-1 <= 0)
					localStorage.setItem('tick', getRandomInt(ot, ido));
				else
					localStorage.setItem('tick', tick);
				setInterval(overtime, 1000);
			}
		}
		if (state == 1) {
			var options = parent.createElement('div');
			options.setAttribute('id', 'opt');
			if (localStorage.getItem('oldx') > 0)
				options.setAttribute('style', 'padding: 7px; cursor:default; opacity:0.7; position:absolute; top:'+localStorage.getItem('oldy')+'px; left:'+localStorage.getItem('oldx')+'px; width:400px; height:200px; background-color:black; color:white;');
			else 
				options.setAttribute('style', 'padding: 7px; cursor:default; opacity:0.7; position:absolute; top:350px; left:550px; width:400px; height:200px; background-color:black; color:white;');
			options.innerHTML = '&nbsp;&nbsp;<b>Бот для фермы GW v2.1</b>';
			//// Выключалка
				var stater = parent.createElement('div');
				stater.setAttribute('id', 'stater');
				if (enable) {
					stater.innerHTML = '<b style="text-decoration:blink;">Включен</b>';
					stater.setAttribute('style', 'color:green; cursor:pointer; position:absolute; top:10px; left: 340px;');
				} else {
					stater.innerHTML = '<b>Выключен</b>';
					stater.setAttribute('style', 'color:red; cursor:pointer; position:absolute; top:10px; left: 340px;');
				}
				options.appendChild(stater);
				stater.addEventListener('click', function (){
					if (confirm("Изменить состояние бота?")) {
						if (enable) {localStorage.setItem('fbEnbl', 'false'); localStorage.setItem('tick','3')}
						else {localStorage.setItem('fbEnbl', 'true');}
						root.document.location.href = 'http://www.ganjawars.ru/ferma.php?x=0&y=0';
					}
				}, false);
			////////////
			//// таймер:
				var timer = parent.createElement('div');
				timer.setAttribute('id', 'time');
				timer.setAttribute('style', 'padding:7px 0px 5px 0px;');
				timer.innerHTML = '<b>Таймер: 00:00</b>';
				options.appendChild(timer);
			////////////
			//// настройка таймера:
				var timerOpt = parent.createElement('div');
				timerOpt.setAttribute('id', 'time');
				timerOpt.innerHTML = '<b>Интервал: </b>';
					var timerOpt1 = parent.createElement('input'); // от
					timerOpt1.setAttribute('value', ot);
					timerOpt1.setAttribute('size', '5');
					timerOpt1.setAttribute('id', 'otT');
					timerOpt1.setAttribute('onkeyup', 'localStorage.setItem("otTime",this.value);');
					var timerOpt2 = parent.createElement('input'); // до
					timerOpt2.setAttribute('value', ido);
					timerOpt2.setAttribute('size', '5');
					timerOpt2.setAttribute('onkeyup', 'localStorage.setItem("doTime",this.value);');
					timerOpt1.setAttribute('id', 'doT');
					timerOpt.appendChild(timerOpt1);
					timerOpt.innerHTML += ' - ';
					timerOpt.appendChild(timerOpt2);
					timerOpt.innerHTML += ' сек.';
				options.appendChild(timerOpt);
			////////////
			//// Длинномер)
				var feld = parent.createElement('table');
				var text = '';
				feld.setAttribute('style', 'position:absolute; top:35px; left:235px;');
				for (var i = 1; i < 8; i++) {
					text += '<tr>';
					for (var j = 1; j < 8; j++) {
						if ((i>visota) || (j>dlina)) {
							text += '<td width="20px" height="22px" id="'+i+j+'" onClick="localStorage.setItem(\'visota\',this.innerHTML.substring(0,1)); localStorage.setItem(\'dlina\',this.innerHTML.substring(1)); document.location.href=\'http://www.ganjawars.ru/ferma.php?x=0&y=0\'" onMouseMove="for (var ii = 1; ii < '+(i+1)+'; ii++) { for (var jj = 1; jj < '+(j+1)+'; jj++) {if (document.getElementById(String(ii)+jj).getAttribute(\'class\') != \'sel\') document.getElementById(String(ii)+jj).setAttribute(\'style\',\'background-color:#f0fff0; color:#f0fff0;cursor:pointer;\')}}" onMouseOut="for (var ii = 1; ii < '+(i+1)+'; ii++) { for (var jj = 1; jj < '+(j+1)+'; jj++) {if (document.getElementById(String(ii)+jj).getAttribute(\'class\') != \'sel\') document.getElementById(String(ii)+jj).setAttribute(\'style\',\'background-color:#C0DDC0; color:#C0DDC0;cursor:pointer;\')}}" style="background-color:#C0DDC0; color:#C0DDC0;">'+i+j+'</td>';
						} else {
							text += '<td width="20px" class="sel" height="22px" id="'+i+j+'" onClick="localStorage.setItem(\'visota\',this.innerHTML.substring(0,1)); localStorage.setItem(\'dlina\',this.innerHTML.substring(1)); document.location.href=\'http://www.ganjawars.ru/ferma.php?x=0&y=0\'" style="background-color:#f0fff0; color:#f0fff0;cursor:pointer;">'+i+j+'</td>';
						}
					}
					text += '</tr>';
				}
				feld.innerHTML = text;
				options.appendChild(feld);
			////////////
			//// Размеры поля:
				var fsize = parent.createElement('div');
				fsize.setAttribute('style', 'padding:7px 0px 0px 0px;');
				fsize.innerHTML = '<b>Размер поля: '+dlina+'x'+visota+'</b>';
				options.appendChild(fsize);
			////////////
			////////////
			//// Инфоблок:
				var fsize = parent.createElement('div');
				fsize.setAttribute('style', 'padding:10px 0px 0px 0px; width:225px;');
				fsize.innerHTML = '<b>Таймер</b> - время, через которое обновится страница.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>Интервал</b> - настройка таймера (применяется автоматически). <b>Размер поля</b> - "площадь" работы бота. На указанных полях будет проводиться обработка растений.';
				options.appendChild(fsize);
			////////////
			parent.getElementsByTagName('body')[0].appendChild(options);
			options.addEventListener('mouseUp',delKoor,false);
			options.addEventListener('mouseDown',saveKoor,false);
		}
	}
	function overtime() {
				var tick = Number(localStorage.getItem('tick'));
				if ((tick-1) == 0) {
					localStorage.setItem('stateBot', '0');
					parent.location.href = 'http://www.ganjawars.ru/ferma.php?x=0&y=0';
				} else {
					localStorage.setItem('tick', tick-1);
					var timer = parent.getElementById('time');	
					timer.innerHTML = '<b>Таймер: ' + formatTimeleft(tick-1) + '</b>';
				}
			}
	function formatTimeleft(timeleftValue) {
		if (timeleftValue > 0) {
			var tlCalc = timeleftValue;
			var tlMin = Math.floor(tlCalc / 60);
			tlMin = ((tlMin < 10) ? "0" : "") + tlMin;
			tlCalc = tlCalc - (tlMin * 60);
			tlCalc = ((tlCalc < 10) ? "0" : "") + tlCalc;
			return(tlMin + ":" + tlCalc);
		} else {
			return("00:00:00");
		}
	}
	function clearSelection() {
		if(document.selection && document.selection.empty) {
			document.selection.empty();
		} else if(window.getSelection) {
			var sel = window.getSelection();
			sel.removeAllRanges();
		}
	}	
	function saveKoor () {
		var options = parent.getElementById('opt');	
		localStorage.setItem('x', window.event.clientX-options.offsetLeft);
		localStorage.setItem('y', window.event.clientY-options.offsetTop);
		var x = window.event.clientX-options.offsetLeft;
		var y = window.event.clientX-options.offsetTop;
		options.removeEventListener('mouseDown',saveKoor);
		options.addEventListener('mouseMove',moveKoor,false);
	}
	function moveKoor () {
		var options = parent.getElementById('opt');
		var deltaX = window.event.clientX - localStorage.getItem('x');
		var deltaY = window.event.clientY - localStorage.getItem('y');
		options.setAttribute('style', 'padding: 10px; cursor:move; opacity:0.7; position:absolute; left:'+deltaX+'px; top:'+deltaY+'px; width:400px; height:200px; background-color:black; color:white;');
		clearSelection();
	}
	function delKoor () {
		var options = document.getElementById("opt");	
		options.addEventListener("mouseDown",saveKoor,false); 
		options.removeEventListener("mouseMove",moveKoor); 
		var oldStyle = options.getAttribute("style"); 
		options.setAttribute("style", oldStyle.replace("move","default")); 
		localStorage.setItem("oldx", options.offsetLeft);	
		localStorage.setItem("oldy", options.offsetTop);
	}
})();