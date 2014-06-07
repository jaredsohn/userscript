// ==UserScript==
// @name           short traffic 4dorms
// @author      Aleksey "Junior" Kuzmin
// @namespace      dorms
// @include        https://dorms.spbu.ru/
// ==/UserScript==


var formContent = document.forms[0].innerHTML;
var trafText = "";
var trafInBytes = "";

for (i=0;i<formContent.length;i++)
{
	if(formContent[i] == "<") 
		break;
	else
		trafText += formContent[i];
}

//Обрезаем текст справа и слева
trafText = trafText.slice(19,-6);

//Убираем пробелы из числа
for (i=0;i<trafText.length;i++)
{
	if(trafText[i] != " ")
		trafInBytes += trafText[i];
}

//Конвертируем в нормальные единцы ( а-ля "134.4 Mb")  
trafText = convertTraf(trafInBytes);

//Создадаём параграф, содержащий остаток трафика
var textBlock = document.createElement('p');
textBlock.innerHTML = trafText;
textBlock.id = 'shortTraf';

//Добавляем в тело
document.getElementsByTagName("body")[0].appendChild(textBlock);


//Удаляем всю нечисть
document.getElementsByTagName("body")[0].removeChild(document.getElementsByTagName("center")[0]);
document.getElementsByTagName("body")[0].removeChild(document.getElementsByTagName("font")[0]);

//Добавляем стили для красоты =)
var styleBlock = document.createElement('style');
var pageStyle = "";
pageStyle += "body {background-color: #222 !important;}";
pageStyle += "p#shortTraf{display: block !important;font-family: georgia, Tahoma, sans-serif !important;font-size: 56px !important;color: #F2863F !important;margin: 100px 0 0 40% !important;}";
styleBlock.innerHTML = pageStyle;
document.getElementsByTagName("head")[0].appendChild(styleBlock);


//Функция конвертирования в адекватные единицы измерения трафика
function convertTraf(inbytes)
{
var trafValue;
var trafUnits;

	if(inbytes > 1024*1024*1024)
	{
		trafValue = inbytes/1024/1024/1024;
		trafUnits = "Gb";
	}
	else
	{
		if(inbytes > 1024*1024)
		{
			trafValue = inbytes/1024/1024;
			trafUnits = "Mb";
		}
		else
		{
			if(inbytes > 1024)
			{
				trafValue = inbytes/1024;
				trafUnits = "Kb";
			}
			else
			{
				trafValue = inbytes;
				trafUnits = "bytes";
			}
		}
	}
	trafValue = String(trafValue);
	trafValue = trafValue.slice(0,(trafValue.indexOf(".")+2));
	return trafValue + " " + trafUnits;
}

