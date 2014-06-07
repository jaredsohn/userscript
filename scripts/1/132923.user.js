// ==UserScript==
// @name 		TopScript
// @namespace 		http://userscripts.org/scripts/show/132923
// @description 	Some addons for THE-WEST!
// @author 		Nicholas Slepchenko
// @include 		http://*.the-west.*/game.php*
// @exclude 		file://*
// @version		1.3.0
// @website 		http://vk.com/nicholas.slepchenko
// ==/UserScript==

var Notification = 
{
	notifications : new Object,
	count : 0,
	show : function showNotifications (data)
	{
		if (data.type == "TypeUser" && data.from.name != playerName)
		{
			var message = data.from.name+": "+data.message;
			message = message.replace(message.match(/\/\d{3}/), "");
		
			this.count++;
			
			var ico;
			
			switch (data.to.room)
			{
				case "town":
					ico = "http://www.the-west.ru/images/chat/channelpic-town.png";
				break;
				
				case "alliance":
					ico = "http://www.the-west.ru/images/chat/channelpic-alliance.png";
				break;
				
				case "county":
					ico = "http://www.the-west.ru/images/chat/channelpic-county.png";
				break;
				
				case "fortbattleroom":
					ico = "http://www.the-west.ru/images/class_choose/symbol_soldier_small_chat.png";
				break;
			}
			
			if (data.to.name == playerName) 
				ico = "http://www.the-west.ru/images/chat/smiley_smile.png";
			
			this.notifications[this.count] = webkitNotifications.createNotification
			(
				"", 
				data.to.title || "Личное сообщение", 
				message
			);
			
			this.notifications[this.count].onclick = function ()
			{
				window.focus();
				this.cancel();
				document.getElementById('chatwindow_say').focus();
			};
			
			this.notifications[this.count].ondisplay = function()
			{
				setTimeout(function() 
				{
					for (var key in Notification.notifications) 
					{
						Notification.notifications[key].cancel();
					}
				}, 5000);
			};
			
			this.notifications[this.count].show();
		}
	}
};

if (true)
{
	if (navigator.vendor == "Google Inc.")
	{
		chatcontrol.addListener(function(e){if (localStorage["ns_notificationEnable"] && localStorage["ns_notificationEnable"]=="true") Notification.show(e);});
	}
	
	if (localStorage.getItem('nsMessageReaded') == null || localStorage['nsMessageReaded'] != 4)
	{
		showMessage("<span style='font-weight: bold'>Для Google Chrome появилась возможность вывода уведомлений.</span><br><span>Если браузер свёрнут, то уведомления всё равно будут показываться. Уведомления содержат сообщения которые приходят в чат. Они разделенны на внутригородские, альянсовские, фортовые и личные. Если при свёрнутом браузере или на другой вкладе показалось уведомление, и на него нажать, то вы сразу перейдёте к вкладке с THE-WEST.</span></center>", "Cюрприз от Tashunka Witko!");
		localStorage['nsMessageReaded'] = 4;
	}
	
	var onClick = function (e)
	{
		if (e.target.name == "fortbattle")
		{
			if (!e.shiftKey)
			{
				pastNick("[player]");
			}
			else
			{
				pastNick("смена [player]");
			}
		}
	};
	
	var pastNick = function (top)
	{
		document.getElementById('chatwindow_say').value += top+document.getElementsByClassName('fort_battle_poster')[0].childNodes[3].childNodes[0].childNodes[1].innerHTML+"[/player] ";
		document.getElementById('chatwindow_say').focus();
	};

	switch (navigator.vendor)
	{
		case "Google Inc.":
			document.addEventListener("click", onClick);
		break;
	
		case "":	
			document.addEventListener("dblclick", onClick);	
		break;
	}

	document.getElementsByTagName('label')[0].parentNode.innerHTML = "<a id='nsChatControls' title='Управление чатом' class='button_wrap button' style='float: left;'><img id='nsRights' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIgAAACICAYAAAA8uqNSAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAALmSURBVHja7N2/TvJQGMDht/IvUjdJGJkddGZ0Z/YOXLwDJgfvwStwZTTOjs4mxtnEQRIGTARi09rvAtR8gzkq+DyjxBxafpRT0lOyuq4DPrNlFyAQBIJAEAgCQSAIBIGAQBAIAkEgCASBIBAEgkBAIAgEgZBSc1M37OzsrJ5MJtFqtZKOUxRFHB0dxenpaSaQNdLr9aLVakW/3086zmw2i16v5wiybpbLZXQ6naiqKu0ObDZjuVyag2CSCgJBIAgEgSAQBIJAEAgCAYEgEASCQPgtmpu+gW9vb15lRxAEgkAQCAJBIAgEIjb4e5B+vx+DwSA6nU7Sceq6jjzPNzaQzA8K4SMGgSAQBMKfOYu5ubmpO51OvL6+Jt+I4XD47t4cl5eX9d3dXTSbaU/Utre3YzAYxGg0evcczs/P69VqlXT8PM/j+fk5xuNxtlaB3N/fR13XkfosaXd398O/397exmQyiXa7nXT8+Xwex8fHMRqN3j12fX0dj4+PScevqiqqqorxeLxeR5C6rpO/OBERWfbxG6fdbke3203+HcXW1tan15zkeR47Ozv//f+vaDQa8fT0ZA6CSSoCQSAIBIGAQBAIAkEgCASBIBAEgkBAIAgEgSAQBIJAEAgC4a9Jti4my7IoiiL5wqnP1p0URRHL5TLKskw6/nw+/3Rty2KxiJeXl6TjF0Xx5bU1PxLI3t5efNfSy48cHBxEo9H4tqWXHzk8PIzvWnqZ7I3uBjKYgyAQBIJA+DOnuT/t4uKivrq6+pbbYA6Hwzg5OckEskam02k8PDwkvz/IYrGI/f19HzGYg4BAEAgCQSAIhN9v4383N+W1Eo4gCMQuQCAIBIEgEASCQBAIAgGBIBAEgkAQCL/Qxl4P0u12oyzLaDQaSccpyzK63a5A1s1sNovVahXT6TTpOEVRxGw229hA3B8EcxAEgkAQCAJBIAgEgYBAEAgCQSAIBIEgEASCQEAgCASBIBB+zr8BANwHtuClI6swAAAAAElFTkSuQmCC' height='18' widht='18' style='-moz-user-select:none;'></img></a>";
	document.getElementById('nsChatControls').onclick = function(e){showMessage("<span style='font-weight: bold;'>Тема чата: </span><input type='theme' autocomplete='on' id='inputTheme' style='width:79%'></input><br><br><span style='font-weight: bold; width:100%'>Очистить чат: </span><img src=\'http://www.veryicon.com/icon/png/Internet%20%26%20Web/Web%20Development%203/action%20delete%20sharp%20thick.png\' style=\'cursor: pointer;\' onclick=\'chatcontrol.sendText(\"/clear\")\' title=\'Очистить чат\'></img><br><br><span style='font-weight: bold'>Права чата: </span><img src=\'http://www.the-west.ru/images/chat/servicegrade_general.png\' style=\'cursor: pointer;\' title=\'Генерал\' onclick=\'chatcontrol.sendText(\"/rights Генерал\")\'></img><img src=\'http://www.the-west.ru/images/chat/servicegrade_captain.png\' style=\'cursor: pointer;\' title=\'Капитан\' onclick=\'chatcontrol.sendText(\"/rights Капитан\")\'></img><img src=\'http://www.the-west.ru/images/chat/servicegrade_private.png\' style=\'cursor: pointer;\' title=\'Рядовой\' onclick=\'chatcontrol.sendText(\"/rights Рядовой\")\'></img><img src=\'http://www.the-west.ru/images/chat/servicegrade_recruit.png\' style=\'cursor: pointer;\' title=\'Рекрут\' onclick=\'chatcontrol.sendText(\"/rights Рекрут\")\'></img><img src=\'http://www.the-west.ru/images/chat/servicegrade_reservist.png\' style=\'cursor: pointer;\' title=\'Резервист\' onclick=\'chatcontrol.sendText(\"/rights Резервист\")\'></img><br><br><label id='ns_notificationsLabel' style='cursor: pointer;'><input type='checkbox' id='ns_notificationsEnable'><span style='font-weight: bold'> Включить оповещения</span></label>", "Управление чатом", undefined, undefined, undefined, true);inputTheme.onkeydown = function(e){if (e.keyCode==13)if(inputTheme.value != ""){chatcontrol.sendText("/topic "+inputTheme.value);}else{chatcontrol.sendText("/topic");}};var ns_sheckBoxNotify = document.getElementById('ns_notificationsEnable'); ns_sheckBoxNotify.checked = (localStorage["ns_notificationEnable"] && localStorage["ns_notificationEnable"]=="true"); ns_sheckBoxNotify.onclick = function(){localStorage["ns_notificationEnable"] = ns_sheckBoxNotify.checked; if (navigator.vendor != 'Google Inc.') ns_notificationsLabel.parentNode.removeChild('ns_notificationsLabel');};};

var tl_addTimerDiv = function ()
{
	var refNode = document.getElementById("health_bar");
	var newNode = document.createElement("div");
	
	newNode.innerHTML = '<div id="tl_timeLeft" style="position: relative;left: 110px;">00:00:00</div>';
	refNode.appendChild(newNode);
}

}
else
{
	new HumanMessage("Скрипт не предназначен для вас!", {type:"defined"});
}