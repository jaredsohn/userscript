// ==UserScript==
// @name Teeda_bot
// @author morze
// @version 0.74
// @description example
// @unwrap
// @run-at document-end
// @include http://Wap.teeda.play.tegos.ru*
// @match http://Wap.teeda.play.tegos.ru*
// ==/UserScript==


/*
Done	Кнопки швидкого переміщення.
Done	Зробити кнопку вкл/викл звук.
Done	Звук на інші події. (Напад на території).
		Звук на території раз в 5 хв.
		Пиття еліксирів.
>>>		Написати менюшку.
>>>		В менюшці чи використовувати в роботі удар.
		Мінімальний рівень ХП для еліксирів.		
Done	Скупщик:
*/



(function(){
	if ((location.hostname !== "Wap.teeda.play.tegos.ru") && (location.hostname !== "teeda.play.tegos.ru"))
		return;
	var unsafeWindow= this.unsafeWindow;
	(function(){
		var test_scr= document.createElement("script");
		var tid= ("t" + Math.random() + +(new Date())).replace(/\./g, "");
		test_scr.text= "window."+tid+"=true";
		document.querySelector("body").appendChild(test_scr);
		if (typeof(unsafeWindow) == "undefined" || !unsafeWindow[tid]) {
		if (window[tid]) {
			unsafeWindow= window;
		} else {
			var scr= document.createElement("script");
			scr.text= "(" +
			(function() {
				var el= document.createElement('unsafeWindow');
				el.style.display= 'none';
				el.onclick=function(){return window};
				document.body.appendChild(el);
			}).toString() + ")()";
			document.querySelector("body").appendChild(scr);
			this.unsafeWindow= document.querySelector("unsafeWindow").onclick();
			unsafeWindow= window.unsafeWindow;
		};
		}
	})();
	
	debugger;
	
	var minElHP 	= parseInt(localStorage.getItem('minElHP'));
	var minHP 		= parseInt(localStorage.getItem('minHP'));
	var TBS			= parseInt(localStorage.getItem('TBS')); // Time Between Shots;	
	var Host 		= 'http://' + location.hostname + '/';
	var PlaySound 	= [localStorage.getItem('sound0'),localStorage.getItem('sound1'),localStorage.getItem('sound2'),localStorage.getItem('sound3')];
	
	
	function QLink(name, link)
	{
		this.name = name;
		this.link = Host + link;
	}

	var Links = [
		new QLink('Main', 'game'),
		new QLink('Персонаж', 'user'),
		new QLink('Почта', 'mail'),
	   new QLink('Работа', 'craft'),
		new QLink('Охота', 'hunting'),
		new QLink('Штурм', 'assault'),
		new QLink('Поход', 'hike'),
		new QLink('Аванпост', 'outpost'),
		new QLink('Окресности', 'surroundings/4'), 
		new QLink('Торговля', 'game/trade'),
		new QLink('Таверна', 'tavern'),
		new QLink('Скупщик', 'knacker'),
		new QLink('Территории', 'territory'),
		new QLink('Территории гильдии', 'clan/territories'),
		new QLink('Гильдия', 'clan/main'),
		new QLink('Горн', 'clan/message/1060'),
		new QLink('Чат Гильдии', 'chat/clan'),
		new QLink('Форум Гильдии', 'forum_clan'),
		new QLink('Форум общий', 'forum'),
		new QLink('Амуниция', 'user/equip'),
		new QLink('Мешок', 'user/bag'),
		new QLink('Сферы', 'user/spheres'),
		new QLink('Достижения', 'user/achieve'),
		new QLink('Настройки бота', 'users/info/127717')
	];
	
	var MyDIVLinks = '<div id="QLinks" style="position:fixed;top:5px;right:5px;text-color:#FFF">';
	for (var i = 0; i < Links.length; ++i)
		MyDIVLinks += '<p><a href="'+Links[i].link+'">'+Links[i].name+'</a></p>';
	MyDIVLinks += '</div>';


	var DivStyle = "height:200px;position:fixed;top:5px;left:5px;";
	
	var button1Name = "Disable";
	var button1OnClick = "{localStorage.setItem('type', '0');window.location.reload();}";
	var button1 = '<p><input type="button" value="'+button1Name+'" onclick="'+button1OnClick+'"></p>';
	
	var button2Name = "Work";
	var button2OnClick = "{localStorage.setItem('type', '1');window.location.reload();}";
	var button2 = '<p><input type="button" value="'+button2Name+'" onclick="'+button2OnClick+'"></p>';
	
	var button3Name = "Attack";
	var button3OnClick = "{localStorage.setItem('type', '2');window.location.reload();}";
	var button3 = '<p><input type="button" value="'+button3Name+'" onclick="'+button3OnClick+'"></p>';
	
	var button4Name = "Knacker";
	var button4OnClick = "{localStorage.setItem('type', '3');window.location.reload();}";
	var button4 = '<p><input type="button" value="'+button4Name+'" onclick="'+button4OnClick+'"></p>';

	var button8Name = "Outpost";
	var button8OnClick = "{localStorage.setItem('type', '4');window.location.reload();}";
	var button8 = '<p><input type="button" value="'+button8Name+'" onclick="'+button8OnClick+'"></p>';

	var button5Name = "Reload";
	var button5OnClick = "{localStorage.setItem('type', '9');window.location.reload();}";
	var button5 = '<p><input type="button" value="'+button5Name+'" onclick="'+button5OnClick+'"></p>';
	
	var SoundOn = localStorage.getItem('sound');
	if (!SoundOn)
		localStorage.setItem('sound', '1');
	SoundOn = localStorage.getItem('sound');
	var NewSound = (SoundOn == '1') ? '0' : '1';
	var button6Name = "Sound is " + (SoundOn != '1' ? 'Off' : 'On');
	var button6OnClick = "{debugger;localStorage.setItem('sound',"+ NewSound+");window.location.reload();}";
	var button6 = '<p><input type="button" value="'+button6Name+'" onclick="'+button6OnClick+'"></p>';

	var ElOn = localStorage.getItem('ElOn');
	if (!SoundOn)
		localStorage.setItem('ElOn', '1');
	ElOn = localStorage.getItem('ElOn');
	var NewElOn = (ElOn == '1') ? '0' : '1';
	var button9Name = "Elixir is " + (ElOn != '1' ? 'Off' : 'On');
	var button9OnClick = "{debugger;localStorage.setItem('ElOn',"+ NewElOn+");window.location.reload();}";
	var button9 = '<p><input type="button" value="'+button9Name+'" onclick="'+button9OnClick+'"></p>';
	
	var button7Name = "DeleteLastMessage";
	var button7OnClick = "{var ss = document.getElementsByClassName('b2')[1].childNodes[1].childNodes[2].href;ss = ss.replace('details','remove');location.href=ss;}";
	var button7 = '<p><input type="button" value="'+button7Name+'" onclick="'+button7OnClick+'"></p>';
	
	function PlayAudio()
	{
		var audioOrig = new Audio();
		audioOrig.src = '	http://psychic3d.free.fr/extra_fichiers/sons/sonar.wav';
		if (SoundOn == '1')
		audioOrig.play();
	}

	
	var MyDIV = '<div id="MyDIV" style="' + DivStyle + '"><form action="">' + button1 + button2 + button3 + button4 + button8 + button5 + button9 + button6 + ((location.href.indexOf("/mail/") + 1)?button7:" ") + '</form></div>'
	document.body.innerHTML = document.body.innerHTML + MyDIV + MyDIVLinks;
		
	var imgTag = document.getElementsByTagName('img');
	for (var i=0; i<imgTag.length; ++i)
	{
		if (imgTag[i].src == (Host + 'img/icons/g1.gif') && PlaySound[0]=='1')
			PlayAudio();
		if (imgTag[i].src == (Host + 'img/icons/g2.gif') && PlaySound[1]=='1')
			PlayAudio();
		if (imgTag[i].src == (Host + 'img/icons/g3.gif') && PlaySound[2]=='1')
			PlayAudio();
		if (imgTag[i].src == (Host + 'img/icons/g4.gif') && PlaySound[3]=='1')
			PlayAudio();
	}
	
	var type = localStorage.getItem('type');
	if (!type)
		localStorage.setItem('type', '0');
	var BotType = 'Disable';
	if (type == 1) BotType = 'Work';
	if (type == 2) BotType = 'Attack';
	if (type == 3) BotType = 'Knacker';
	if (type == 4) BotType = 'Outpost';
	if (type == 9) BotType = 'Reload';
	document.getElementById('MyDIV').innerHTML += '<p>' + BotType + '</p>';
	

	/*
	//DEMO
	var DemoStart = localStorage.getItem('DS998');
	var NowTime = new Date().getTime();
	if (!DemoStart)
		localStorage.setItem('DS998',NowTime.toString());
	
	DemoStart = localStorage.getItem('DS998');
	DemoStart = parseInt(DemoStart);
	
	document.getElementById('MyDIV').innerHTML += '<p>DemoTime: ' + ((NowTime - DemoStart)/1000) + '</p>';
	
	if ((NowTime - DemoStart) > 1000*60*20)
	{
		document.getElementById('MyDIV').innerHTML = '<p style="font-size:72px">DemoEND</p>';
		return;
	}
	*/
	if (document.title == "Герои Тиды")
	{
		setTimeout(function() {window.location.reload()}, 37*1000);
	}
	if (location.href.indexOf('chat')+1) // Chat Reload
	{
		var ChatMessage = document.getElementsByClassName("box_inter")[0].getElementsByClassName("body")[0].getElementsByClassName("b2")[1].getElementsByTagName("p")[0].getElementsByTagName("span")[2].innerText;
		if (localStorage.getItem("LastChatMessage") != ChatMessage)
		{
			localStorage.setItem("LastChatMessage",ChatMessage);
			var audioOrig = new Audio();
			audioOrig.src = 'http://cafe.bevocal.com/libraries/audio/female1/en_us/common/beep_end.wav';
			if (SoundOn == '1')
			audioOrig.play();
		}
		setTimeout(function() { if (!document.getElementsByClassName('inp')[0].value)window.location.reload()}, 7*1000);
		return;
	}
	if (location.href == (Host + 'users/info/127717') ) // Bot Menu
	{
		if (!localStorage.getItem('WorkAttack'))
		{
		localStorage.setItem('WorkAttack','0');
		}
		if (!localStorage.getItem('sound0'))
		{
		localStorage.setItem('sound0','1');
		}
		if (!localStorage.getItem('sound1'))
		{
		localStorage.setItem('sound1','1');
		}
		if (!localStorage.getItem('sound2'))
		{
		localStorage.setItem('sound2','1');
		}
		if (!localStorage.getItem('sound3'))
		{
		localStorage.setItem('sound3','1');
		}
		
		document.body.innerHTML = '<div>' + '<p><input type="button" value="Горняк" onclick="{localStorage.setItem(\'profession\', \'0\');window.location.reload();}"></p>' + '<p><input type="button" value="Рыбак" onclick="{localStorage.setItem(\'profession\', \'1\');window.location.reload();}"></p>' + '<p><input type="button" value="Лесоруб" onclick="{localStorage.setItem(\'profession\', \'2\');window.location.reload();}"></p>' + '<p><input type="button" value="Каменщик" onclick="{localStorage.setItem(\'profession\', \'3\');window.location.reload();}"></p>' + '<br />' + '<p><input type="button" value="Бить в работе?" onclick="{localStorage.setItem(\'WorkAttack\',\''+ ((parseInt(localStorage.getItem('WorkAttack')) + 1) % 2).toString() + '\');window.location.reload();}"></p>' + '</div>';
		
		document.body.innerHTML += '<div>' + '<p>Уровень жизни при котором убегать с охоты</p><input id="MHP" type="text" value="'+ localStorage.getItem('minHP') +'">';
		document.body.innerHTML += '<p onclick="{localStorage.setItem(\'minHP\', document.getElementById(\'MHP\').value);window.location.reload();}">Change</p></div>';
		
		document.body.innerHTML += '<div>' + '<p>Уровень жизни при котором пить еликсир</p><input id="MEHP" type="text" value="'+ localStorage.getItem('minElHP') +'">';
		document.body.innerHTML += '<p onclick="{localStorage.setItem(\'minElHP\', document.getElementById(\'MEHP\').value);window.location.reload();}">Change</p></div>';
		
		document.body.innerHTML += '<div>' + '<p>Время между ударами</p><input id="TBS" type="text" value="'+ localStorage.getItem('TBS') +'">';
		document.body.innerHTML += '<p onclick="{localStorage.setItem(\'TBS\', document.getElementById(\'TBS\').value);window.location.reload();}">Change</p></div>';
		
		document.body.innerHTML += '<div>' + '<p>Настройки звука</p>' + 
		'<p><input type="button" value="'+localStorage.getItem('sound0')+' - Новая вещь" onclick="{localStorage.setItem(\'sound0\',\''+ ((parseInt(localStorage.getItem('sound0')) + 1) % 2).toString() + '\');window.location.reload();}"></p>' +
		'<p><input type="button" value="'+localStorage.getItem('sound1')+' - Новое сообщение" onclick="{localStorage.setItem(\'sound1\',\''+ ((parseInt(localStorage.getItem('sound1')) + 1) % 2).toString() + '\');window.location.reload();}"></p>' +
		'<p><input type="button" value="'+localStorage.getItem('sound2')+' - Поломанная вещь" onclick="{localStorage.setItem(\'sound2\',\''+ ((parseInt(localStorage.getItem('sound2')) + 1) % 2).toString() + '\');window.location.reload();}"></p>' +
		'<p><input type="button" value="'+localStorage.getItem('sound3')+' - Нападение на территорию" onclick="{localStorage.setItem(\'sound3\',\''+ ((parseInt(localStorage.getItem('sound3')) + 1) % 2).toString() + '\');window.location.reload();}"></p>' +
		'</div>';
			
		document.body.innerHTML += MyDIV + MyDIVLinks;
		var profes = localStorage.getItem('profession');
		if (profes == '0') profes = 'Горняк';else
		if (profes == '1') profes = 'Рыбак';else
		if (profes == '2') profes = 'Лесоруб';else
		if (profes == '3') profes = 'Каменщик';
		document.getElementById('MyDIV').innerHTML += '<p>' + profes + '</p>';
		document.getElementById('MyDIV').innerHTML += '<p>' + (localStorage.getItem('WorkAttack')=='0'?'Не б':'Б') + 'ить в работе</p>';
		return;
	}	
	
	if (type == '9' )//Reload
	{
		setTimeout(function() {window.location.reload();}, 1500);
	}
	else
	if (type == '1' )//Work
	{
		if (document.forms.length > 0)
		{
			for (var FInd = 0; FInd < document.forms.length; ++FInd)
			if (document.forms[FInd].elements['Time'])
			{
				debugger;
				var profession = localStorage.getItem('profession');
				if (!profession)
					localStorage.setItem('profession', '2');
				profession = parseInt(localStorage.getItem('profession'));
				/*
				0 - Горняк
				1 - Рыбак
				2 - Лесоруб
				3 - Каменщик
				*/
				document.forms[FInd].elements['Prof'][profession].checked = true;
				document.forms[FInd].elements['Time'].selectedIndex = 0;
															/*
															0 - 5 min
															1 - 15 min
															2 - 30 min
															3 - 1 hour
															*/
				document.forms[FInd].submit();
				return;
			}
		}
		TagA = document.getElementsByTagName("a");
		if ((location.href.indexOf('craft')+1) && !(location.href.indexOf('user/craft')+1))
		{
			var link;
			var t;
			
			for (var i = 0; i < TagA.length; ++i)
				if (TagA[i].innerHTML == "Обновить")
				{
					link = TagA[i].href;
					t = 10;
					break;
				}
				
			for (var i = 0; i < TagA.length; ++i)
				if (TagA[i].innerHTML == "вернуться")
				{
					t = 1;
					link = TagA[i].href;
					break;
				}
			for (var i = 0; i < TagA.length; ++i)
				if (TagA[i].innerHTML == "убить монстров")
				{
					t = 1;
					link = TagA[i].href;
					break;
				}
			setTimeout(function() { location.href = link}, t*1000);
		}else
		if (location.href.indexOf('battle')+1)
		{
			var link = location.href;
			for (var i = 0; i < TagA.length; ++i)
					if (TagA[i].innerHTML == "покинуть бой")
					{
						link = TagA[i].href;
						t = 1;
						break;
					}
					
			TagA = document.getElementsByClassName("active_s");
			var HP = document.getElementsByClassName("h1b brt")[0].childNodes[1].childNodes[2].innerHTML;
			
			if (document.getElementsByClassName("disable_s").length)
				link = document.getElementsByClassName("disable_s")[0].href;
			var t = 3;
			var d = new Date().getTime();
			
			var timestr = localStorage.getItem('time');
			if (!timestr)
				localStorage.setItem('time',d.toString());
			timestr = localStorage.getItem('time');
			t = parseInt(timestr);
			
			
			debugger;
			
			document.getElementById('MyDIV').innerHTML += '<p>' + HP + '</p>';
			if ((d-t >= TBS) && (localStorage.getItem('WorkAttack') == '1'))
			{
				localStorage.setItem('time',d.toString());
				setTimeout(function() {location.href = TagA[0].href}, 500);
			}
			else
			{
				t = 3;
				for (var i = TagA.length-1; i > 0; --i)
					if (TagA[i].childNodes[2])
					if (TagA[i].childNodes[2].wholeText)
					if (TagA[i].childNodes[2].wholeText.indexOf('сфера') + 1)
					if (TagA[i].childNodes[3].innerHTML == "")
					{
						link = TagA[i].href;
						t = 0.25;
					}
					
				setTimeout(function() {location.href = link}, t * 1000);
			}
		}else
		{
			setTimeout(function() {location.href = Links[1].link;}, 20 * 1000);
		}
	}
	else
	if (type == '2' )/*Attack*/
	{//alert('2');
		var TagA = document.getElementsByClassName("active_s");
		if (location.href.indexOf('outpost')+1)
		{
			for (var i = 0; i < document.links.length; ++i)
			{
				if (document.links[i].href.indexOf('/join/')+1)
				{
					setTimeout(function() {location.href = document.links[i].href;}, 3000);
					return;
				}
			}
			setTimeout(function() {window.location.reload();}, 3000);
			return;
		}
		if (!TagA.length)
		{
			setTimeout(function() {location.href = 'http://teeda.play.tegos.ru/craft?r=1392497884.4389'}, 30 * 1000);
			return;
		}else
		if (TagA.length == 1  && !document.getElementsByClassName("disable_s").length)
		{
			setTimeout(function() {location.href = TagA[0].href},300);
			return;
		}
		if (TagA[0].getElementsByTagName('img')[0].src.indexOf('hunting')+1)//EndOfHunt
		{
		//alert('5');
			window.onload = function()
			{
				var canvas = document.createElement('canvas');
				canvas.width = 110;
				canvas.height = 15;
				//canvas.hidden = true;
				document.body.appendChild(canvas);
				
				var ctx = canvas.getContext("2d");
				ctx.drawImage(TagA[0].getElementsByTagName('img')[0],0,0);
					function F( y,  x)
						{
							return (y*wi+x)*4;
						}
				a = ctx.getImageData(0,0,110,15);
				wi = a.width;
				he = a.height;
				var Wcnt = 0;
				for (var i = 0; i < wi*he*4; i+=4)
				{
					//Якщо значення Green = 0, то піксел буде білим, інакше - чорним.
					if (a.data[i+1] == 0 && a.data[i] != 0)
					{
						a.data[i+0] = 255;//R
						a.data[i+1] = 255;//G
						a.data[i+2] = 255;//B
						++Wcnt;
					}else
					{
						a.data[i+0] = 0;//R
						a.data[i+1] = 0;//G
						a.data[i+2] = 255;//B
					}
					a.data[i+3] = 255;//Alpha (прозорість 0 - прозорий, 255 - непрозорий)
				}
				ctx.putImageData(a,0,0);
				if (Wcnt == 0)
				{
					setTimeout(function() {location.href = TagA[0].href}, 5000);
				}else
				{
					setTimeout(function() {location.href = TagA[1].href}, 5000);
				}
			};
			return;
		}
		if (!(location.href.indexOf("hunting")+1))
			var HP = document.getElementsByClassName("h1b brt")[0].childNodes[1].childNodes[2].innerHTML;
		else
			var HP = document.getElementsByClassName("h1b brt")[0].childNodes[1].childNodes[1].innerHTML;
		if (parseInt(HP) < minHP)
		{
			for (var i = 0; i < TagA.length; ++i)
				if (TagA[i].href.indexOf('hunting/exit')+1)
					{
						setTimeout(function() {location.href = TagA[i].href}, 350);
						return;
					}
		}
		if (HP < minElHP && ElOn)
		{
			var IMAGES = document.getElementsByTagName("img");
			for (var i = 0; i < IMAGES.length; ++i)
				if (IMAGES[i].src.indexOf("f30.png")+1)
				{
					location.href = IMAGES[i].nextSibling.href;
				}
		}
		var link = location.href;
		if (document.getElementsByClassName("disable_s").length)
			link = document.getElementsByClassName("disable_s")[0].href;
		var t = 3;
		var d = new Date().getTime();
		
		var timestr = localStorage.getItem('time');
		if (!timestr)
			localStorage.setItem('time',d.toString());
		timestr = localStorage.getItem('time');
		t = parseInt(timestr);
		
		
		debugger;
		
		document.getElementById('MyDIV').innerHTML += '<p>' + HP + '</p>';
		document.title = HP + " : " + document.title; 
		if ((d-t >= TBS))
		{
		if (TagA[0].childNodes[2])
		{
			localStorage.setItem('time',d.toString());
			setTimeout(function() {location.href = TagA[0].href}, 250);
		}else 	setTimeout(function() {window.location.reload();}, 300);
		}else
		{
			var t = 3;
			for (var i = TagA.length-1; i > 0; --i)
			if (TagA[i].innerText=='воскреснуть')
			{
				link = TagA[i].href;
			}else
			if (TagA[i].childNodes[2]){
			if (TagA[i].childNodes[2].wholeText){
			if (TagA[i].childNodes[2].wholeText.indexOf('сфера') + 1)
			{
				if (TagA[i].childNodes[3].innerHTML == "")
				{
					link = TagA[i].href;
					t = 0.25;
				}
			}}}
			setTimeout(function() {location.href = link}, t * 1000);
		}
		
	}
	else
	if (type == '3')/*Knacker*/
	{
	debugger;
		var TagWh = document.getElementsByClassName("white");
		
		for (var i = 12; i>0; --i)
		if (TagWh[0].previousSibling.src.indexOf(i.toString()) + 1)
		{
			var loc = Host + 'knacker/sell/'+i.toString()+'/'+TagWh[0].innerHTML;
			location.href = loc;
			return;
		}
	}
	else
	if (type == '4' )/*Outpost*/
	{
		setTimeout(function() {window.location.reload();}, 10000);
		document.body.innerHTML += '<div id=OUT >Ololo</div>';
		GM_xmlhttpRequest(
		{
			method: "GET",
			url: Host + "outpost",
			onload: function(resp) {
				var doc = document.getElementById('OUT');
				doc.innerHTML = resp.responseText;
				for (var i = 0; i < 3; ++i)
					if ((doc.getElementsByClassName('l1')[i].getElementsByTagName('a')[0].href.indexOf('/show/')+1)&&(doc.getElementsByClassName('l1')[i].getElementsByClassName('red').length))
					{
						PlayAudio();
						localStorage.setItem('type', '2');
						location.href = doc.getElementsByClassName('l1')[i].getElementsByTagName('a')[0].href;
						return;
					}
			}
		});
	}
	
	
	
})();