// ==UserScript==
// @name           Городской информатор (Citizin alerter)
// @version        0.1.7   
// @author         Wiisley, maintained by immortalnights (перевод by Victor I hakergtr@yandex.ru)
// @homepage       http://ika-info.ucoz.ru
// @namespace      http://ikariamlibrary.com/
// @description    Сообщает, если ваш город заполнен людьми
// @require        http://script.betterday.co.uk/modules/settings.js
// @require        http://ika-info.ucoz.ru/scripts/Script_updater/script_updater.user.js
// @include        http://s*.ikariam.*/index.php*
// @exclude        http://board.ikariam.*/*
// @history        0.1.7 Исправлены проблемы при просмотре оккупированного города. 
// @history        0.1.5 Добавлена дополнительная проверка для нахождения столицы города - если количество имеющихся городов равно 1, то по умолчанию город отмечается как столица. Полностью переделано меню Настройки. 
// @history        0.1.4 Исправлена проблема с некоторыми серверами отчетность об ошибке на экране города.
// @history        0.1.3 Небольшие обновления вместимости города для Ikariam 0.3.
// @history        0.1.2 Ошибка возникала, когда происходила ошибка входа в игру.   
// @history        0.1.1 Вопросы, касающиеся уведомления, были исправлены. 
// ==/UserScript==

// --ScriptUpdater (added by ika-info.ucoz.ru)--
ScriptUpdater.check(64508, '0.1.7');
// --/ScriptUpdater--
sVersion = "0.1.7";
var title = document.title.split(' ');
var server = title[title.length-1];

var oSettings = new settingsHandler(server);

getElementsByClass = function(inElement, className, findIn) 
{
  var all = inElement.getElementsByTagName('*');
  var elements = [];
  for (var e = 0; e < all.length; e++) 
  {
    if (findIn == true) 
    {
        if (all[e].className.indexOf(className) > 0) 
        {
            elements[elements.length] = all[e];
        }
    } else {
        if (all[e].className == className) 
        {
            elements[elements.length] = all[e];
        }
    }
  }
  return elements;
};

/**
*	Parses a string of format 123,456 to an int in format 123456
*/
function toInt(string)
{
	var temp,result;
	temp = string.split(',');
	result = '';
	for(var i=0; i < temp.length; i++)
	{
		result += temp[i];
	}
	return parseInt(result);
}

Array.prototype.last = function()
{
	return this[this.length - 1]
}

/**
 *	Returns the name of the city
 */
function getCityName()
{
	var city_raw = document.getElementById('citySelect')[document.getElementById('citySelect').selectedIndex].innerHTML.split(" ");
	return city_raw[city_raw.length-1];
}

/**
*	Returns the max number of citizens for given townhall level. 
*/
window.getMaxCitizens = function(lvl)
{
	var townhall = new Array();
	townhall[1]  = 60;
	townhall[2]  = 96;
	townhall[3]  = 142;
	townhall[4]  = 200;
	townhall[5]  = 262;
	townhall[6]  = 332;
	townhall[7]  = 410;
	townhall[8]  = 492;
	townhall[9]  = 580;
	townhall[10] = 672;
	townhall[11] = 769;
	townhall[12] = 870;
	townhall[13] = 976;
	townhall[14] = 1086;
	townhall[15] = 1200;
	townhall[16] = 1320;
	townhall[17] = 1440;
	townhall[18] = 1566;
	townhall[19] = 1696;
	townhall[20] = 1828;
	townhall[21] = 1964;
	townhall[22] = 2102;
	townhall[23] = 2246;
	townhall[24] = 2390;

	return townhall[lvl];
} 

window.addEventListener('load',  function() 
{
	try
	{
		if (document.getElementById('errorLoggedOut') != null)
		{
			return; // Don't do anything on the error page
		}
		var city = getCityName();

		// Check if the city page is loaded, chech if this city is the capital and store the townhall level
		if (document.getElementById('city') != null)
		{
			bCapitalFound = false;
			var positions = document.getElementById('locations');	
			for (var i = 0; i < positions.childNodes.length; i++)
			{
				if (positions.childNodes[i].className == "palace")
				{
					bCapitalFound = true;
					GM_setValue(server+'_ca_capital',city);
				}
				
				if (positions.childNodes[i].className == "townHall")
				{
					var aTownLevel = (positions.childNodes[i].childNodes[3].title.split(" "));
					GM_setValue(server+'_ca_'+city+'_townHall_lvl', parseInt(aTownLevel.last()));
				}
			}
			
			if (!bCapitalFound)
			{
				var oChangeCityForm = document.getElementById('changeCityForm');
				if (oChangeCityForm)
				{
					var oTownList = getElementsByClass(oChangeCityForm, "optionList", false);
					if (oTownList[0])
					{
						if (oTownList[0].childNodes.length == 1)
						{
							bCapitalFound = true;
							GM_setValue(server+'_ca_capital',city);
						}
					}
				}
			}
		}
		
		// Get the stored info
		var bCapital         = (city == GM_getValue(server+'_ca_capital'));
		var iTownHallLevel   = GM_getValue(server+'_ca_'+city+'_townHall_lvl',1);
		var iThreshold    = oSettings.getSetting('threshold',90);
		var bWellDigging  = oSettings.getSetting('research_wellDigging', true);
		var bHoliday      = oSettings.getSetting('research_holiday',false);
		var bUtopia       = oSettings.getSetting('research_utopia', false);
		var bMessage      = oSettings.getSetting('display_message', false);
		
		var max_citizen = getMaxCitizens(iTownHallLevel);
		if (bCapital)	
		{
			if (bWellDigging)
			{
				max_citizen += 50;
			}
			if (bUtopia)
			{
				max_citizen += 200;
			}
		}
		if (bHoliday)
		{
			max_citizen += 50;
		}
		
		var cur_citizen = 0;
		if (document.getElementById('value_inhabitants'))
		{
			cur_citizen = toInt(document.getElementById('value_inhabitants').innerHTML.split('(')[1]);
		}
		
		// Color the numbr of citizens
		if ((cur_citizen/max_citizen) > iThreshold/100 )
		{
			document.getElementById('value_inhabitants').style.color = 'firebrick';
		}
		
		if ( cur_citizen == max_citizen )
		{
			if (bMessage) 
			{
				// Added v0.1.1 by immortalnights. This ensures the user is in a town view before showing a message
				if (document.getElementById('position0'))
				{
					alert("Внимание, ваш город полон горожанами!");
				}
			}
			document.getElementById('value_inhabitants').style.fontWeight = 'bold';
		}
			
		// Add options menu
		if (document.getElementById('options') != null)
		{
			var allElements = document.getElementsByTagName('form');
			for (var i = 0; i < allElements.length; i++)
			{
				var thisElement = allElements[i];
				if (thisElement.elements[i].value == 'Options')
				{
					var oResearchOptions = new settingsGroup("Исследования", oSettings);
					
					oResearchOptions.addControl({
							type: "check",
							component: {
								 title: "Колодец",
								 default: bWellDigging,
								 name: "research_wellDigging"
							}
					 });
					 
					oResearchOptions.addControl({
							type: "check",
							component: {
								 title: "Выходной",
								 default: bHoliday,
								 name: "research_holiday"
							}
					 });
					
					oResearchOptions.addControl({
							type: "check",
							component: {
								 title: "Утопии",
								 default: bUtopia,
								 name: "research_utopia"
							}
					 });
					 
					var oParameterOptions = new settingsGroup("Параметры", oSettings);
					 
					oParameterOptions.addControl({
							type: "number",
							component: {
								 title: "Заполнение (%)",
								 default: iThreshold,
								 name: "threshold"
							}
					 });
					 
					oParameterOptions.addControl({
							type: "check",
							component: {
								 title: "Предупреждающее сообщение",
								 default: bMessage,
								 name: "display_message"
							}
					 });
				
					var oDialog = new settingsDialog("Городской информатор v"+sVersion+"", oSettings);
				 
					oDialog.addGroup(oResearchOptions);
					oDialog.addGroup(oParameterOptions);
					oDialog.addSubmit("Сохранить изменения");
					 
					document.getElementById("mainview").insertBefore(oDialog.output(), document.getElementById("vacationMode"));
				}
			}
		}
	}
	catch(er){alert("Citizin Alerter has encountered an error\nPlease post a message on the Ikariam Library forums quoting the error below and which page it was received on.\n" + er)}
	},
	true);
