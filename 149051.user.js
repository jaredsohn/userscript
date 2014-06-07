// ==UserScript==
// @name        fishing
// @namespace   bkpr
// @include     http://www.ereality.ru/core/
// @version     2
// ==/UserScript==

var intervalID = -1;
var start_button;

createButtonStart();


function getMainFrame()
{
	return document.getElementById('main').contentWindow.document;
}


function createButtonStart()
{
	if(!getMainFrame())
	{
		alert("Ошибка. Главный фрейм не найден");
		return;
	}
	start_button = document.createElement("button");
	start_button.style.width = "100px";
	start_button.style.color = "black";
	start_button.style.background = "white";
	start_button.style.zIndex = "1000";
	start_button.style.position = "absolute";
	start_button.style.margin = "20px";
	start_button.style.border = "5px";
	start_button.innerHTML = "Start script";

	start_button.onclick = startButtonClick;
	document.body.appendChild(start_button);

}

function startButtonClick()
{
	if(intervalID != -1)
	{
		if(confirm("Прервать скрипт?"))
		{
			clickButtonGet();
		}
		return;
	}
	var mainFrame = getMainFrame();
	if(!mainFrame)
	{
		alert("Ошибка. Главный фрейм не найден");
		return;
	}
	clickFishButton(mainFrame);
}

function checkWeb()
{
	var mainFrame = getMainFrame();
	var conteiner = mainFrame.getElementById("td_wrk");
	if(conteiner && conteiner.style.display == "none")
	{
		return;
	}
	
	if(conteiner.innerHTML.indexOf("(+0%)") == -1)
	{
		for(var i = 0; i < conteiner.childNodes.length; i++)
		{
			if(conteiner.childNodes[i].innerHTML == "Достать")
			{
				conteiner.childNodes[i].click();
				clearInterval(intervalID);
				intervalID = -1;
				setTimeout(startButtonClick,1000);
				return;
			}
		}
		clearInterval(intervalID);
		intervalID = -1;
		alert("Ошибка. Кнопка 'Достать' не найдена. Скрипт остановлен");
		return ;
	}

}

function clickButtonGet()
{
	start_button.innerHTML = "Start script";
	var mainFrame = getMainFrame();
	var conteiner = mainFrame.getElementById("td_wrk");
	if(conteiner && conteiner.style.display == "none")
	{
		return;
	}

	for(var i = 0; i < conteiner.childNodes.length; i++)
	{
		if(conteiner.childNodes[i].innerHTML == "Достать")
		{
			conteiner.childNodes[i].click();
			clearInterval(intervalID);
			intervalID = -1;
			return;
		}
	}

}

function clickFishButton(mainFrame)
{
	var button_conteiner = mainFrame.getElementById("p_res");
	start_button.innerHTML = "Stop script";
	if(!button_conteiner)
	{
		alert("Ошибка. Контейнер с кнопкой 'Ловить' не найден");
		return;
	}

	for(var i = 0; i < button_conteiner.childNodes.length; i++)
	{
		if(button_conteiner.childNodes[i].innerHTML == "Крабы: Ловить")
		{
			intervalID = window.setInterval(checkWeb,5000);
			button_conteiner.childNodes[i].click();
			return;
		}
	}
	alert("Ошибка. Кнопка 'Ловить' не найдена");
}



