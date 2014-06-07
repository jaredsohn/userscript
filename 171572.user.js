// ==UserScript==
// @name        Dota2Lounge display profit
// @namespace   Neadequant
// @description Adds to MyProfile page of dota2lounge.com table that shows how many items you won/lost in total, today, last week and from specific date
// @include     http://dota2lounge.com/myprofile
// @include     http://*.dota2lounge.com/myprofile
// @grant       none
// @version     2.0.1
// @updateURL   https://userscripts.org/scripts/source/171572.meta.js
// @downloadURL https://userscripts.org/scripts/source/171572.user.js
// @require		https://raw.github.com/RobinHerbots/jquery.inputmask/2.x/js/jquery.inputmask.js
// @require		https://raw.github.com/RobinHerbots/jquery.inputmask/2.x/js/jquery.inputmask.extensions.js
// @require		https://raw.github.com/RobinHerbots/jquery.inputmask/2.x/js/jquery.inputmask.date.extensions.js
// @require		https://raw.github.com/carhartl/jquery-cookie/master/jquery.cookie.js
// ==/UserScript==
String.prototype.contains = function (it) { return this.indexOf(it) != -1; };
function GetDomainName()
{
	var domain_name = window.location.hostname;
	return domain_name;
}



function dateParse(dateStr)
{
if (dateStr)
 {
    var dateString = dateStr;
    var reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
	var dateArray = reggie.exec(dateString); 
	var dateObject = new Date(
        (+dateArray[1]),
        (+dateArray[2])-1, // Careful, month starts at 0!
        (+dateArray[3]),
        (+dateArray[4]),
        (+dateArray[5]),
        (+dateArray[6])
	);
    return dateObject;
	}
	return undefined;
}

function dateParseSimple(dateStr)
{
 if (dateStr)
 {
    var dateString = dateStr;
    var reggie = /(\d{2})\.(\d{2})\.(\d{4})/;
	var dateArray = reggie.exec(dateString); 
	if (dateArray)
	{
	var dateObject = new Date(
        (+dateArray[3]),
        (+dateArray[2])-1, // Careful, month starts at 0!
        (+dateArray[1]),
0,0,0	);

    return dateObject;
	}
	}
	return undefined;
}

function getMatchDate(resultTd)
{

	var trElement = $(resultTd).parent();

	var tdLast = $(trElement).find("td").last();

    var matchDate = $(tdLast).html();

    return dateParse(matchDate);
}

function set_cookie (name, value, expires_year, expires_month, expires_day, path, domain, secure)
{
	var cookie_string = name + "=" + escape(value);
	if (expires_year)
	{
		var expires = new Date (expires_year, expires_month, expires_day);
		cookie_string += "; expires=" + expires.toGMTString();
	}
 
	if (path)
	{
		cookie_string += "; path=" + escape(path);
	}
 
	if (domain)
	{
		cookie_string += "; domain=" + escape(domain);
	}
	if (secure)
	{
		cookie_string += "; secure";
	}
	document.cookie = cookie_string;
	console.log(cookie_string);
}

function delete_cookie (cookie_name)
{
	var cookie_date = new Date (); 
	cookie_date.setTime (cookie_date.getTime() - 1);
	document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
}

function get_cookie (cookie_name)
{
var cookie = document.cookie;
var parts = cookie.split(';');

var neededCookie;

if (parts)
{
	for (var i = 0; i < parts.length; i++)
	{
		if (parts[i].indexOf(cookie_name) != -1)
		{
			neededCookie = parts[i];
			break;
		}
	}
}

if (neededCookie)
	neededCookie=neededCookie.split('=')[1];

return neededCookie;

}

var COOKIE_NAME = 'D2L_date_items';

function itemsTotalFromDate(matches, fromDate, isWin, oldItems)
{
	var items = oldItems;
	
	if (!items)
	{		
		items = {
			Rare: 0,
			Uncommon: 0,
			Common: 0
		};
	}
	
	$.each(matches, function (index) {
    	//alert(index);
         var matchDate = getMatchDate(matches[index]);
		 //alert("" + matchDate);
            
        var tr = matches[index].parentNode;
        if (isWin)
		{
			tr = $(tr).next().next();		
		}		
		else
			tr = $(tr).next();
		
		var doCheck = !fromDate;		
		if (!doCheck)
		{			
			doCheck = matchDate >= fromDate;			
		}
		
		if (doCheck)
        {
			if (isWin)
			{
				$.each(items, function (rarity) {					
					var rarCount = tr.find('.' + rarity);
					if (rarCount)
						items[rarity] += rarCount.length;			
				});
			}
			else
			{
				$.each(items, function (rarity) {
					var rarCount = tr.find('.' + rarity);
					if (rarCount)
						items[rarity] -= rarCount.length;			
				});
			}
        }        
    });
	
	
	
	return items;
}

function getToday()
{
	var dt = new Date();
    var today = new Date(dt.getFullYear(),dt.getMonth(),dt.getDate(),0,0,0,0);
	
	return today;
}

function getWeekAgo()
{
	var today = getToday();
	var week = new Date();
    week.setDate(today.getDate()-7);
	
	return week;
}

function getCookieDate()
{
	var cookieDateStr = get_cookie(COOKIE_NAME);
	var cookieDate;

	if (cookieDateStr)
		cookieDate = dateParseSimple(cookieDateStr);
	return cookieDate;
}

function getCookieDateStr()
{
	var cookieDateStr = get_cookie(COOKIE_NAME);
	
	return cookieDateStr;
}

function getTableHeader()
{
	var table = '<table style="text-align: center;width:550px">'
	table = table + '<tr><td></td><td style="padding: 0px 5px;">Rare</td><td style="padding: 0px 5px;">Uncommon</td><td style="padding: 0px 5px;">Common</tr>';
	
	return table;
}

function getTableFooter()
{
	var table = '<tr><td></td><td style="padding: 0px 5px;">&nbsp;</td><td style="padding: 0px 5px;"></td><td style="padding: 0px 5px;"></tr>';
	table = table + '</table>';
	
	return table;
}


function getTableRow(title, items)
{
	
	if (items)
	{
	var spans = $.map(items, function (count, rarity) {
        return '<span title="' + rarity + 's" class="' + rarity + '">' + count + '</span>';
    });
	//alert(spans);
	return '<tr><td style="text-align: left; ">' + title + ':</td><td>' + spans.join(' </td><td> ') + '</td></tr>';
	}
	
	return '<tr><td style="text-align: left; ">' + title + ':</td><td colspan="3"></td></tr>';
	
	
}



function itemTotals(data) {
    var items;
    var itemsToday;    
    var itemsWeek;
	var itemsCookie;
    
    var today = getToday();        
    var week = getWeekAgo();
	var cookieDateStr = getCookieDateStr();
	var cookieDate = getCookieDate();    
    var matchesWon = $(data).find('.won').parents('td');
	var matchesLost = $(data).find('.lost').parents('td');
	
	items = itemsTotalFromDate(matchesWon, undefined,  true);
	
	itemsToday = itemsTotalFromDate(matchesWon, today,  true);
	itemsWeek = itemsTotalFromDate(matchesWon, week,  true);
	if (cookieDate)
		itemsCookie = itemsTotalFromDate(matchesWon, cookieDate,  true);
	
	items = itemsTotalFromDate(matchesLost, undefined,  false, items);
	
	itemsToday = itemsTotalFromDate(matchesLost, today,  false, itemsToday);
	itemsWeek = itemsTotalFromDate(matchesLost, week,  false, itemsWeek);
	if (cookieDate)
		itemsCookie = itemsTotalFromDate(matchesLost, cookieDate,  false, itemsCookie);

	var inputButton = '<input id="cookieDateInput"  type="text" value="' + cookieDateStr + '" class="filter" style="width:100px; height:18px; float:none;"/>';
//	var input = document.createElement('a');
//	a.id = 'setDateButton';
//	a.class = 'button';
//	a.style = 'float:none;height:18px;';
//	a.onclick = 
	
	if (navigator.userAgent.indexOf('Opera') != -1)
		inputButton += '<a id="setDateButton" class=\'button\' style=\'float:none;height:18px;\' onclick="setCookieDate();">*</a>';    
	//else	
//		inputButton += '<a id="setDateButton" class=\'button\' style=\'float:none;height:18px;\' onclick="$.cookie("' + COOKIE_NAME + '", $(\'#cookieDateInput\').val());">*</a>';    
	//inputButton += '<a id="setDateButton" class=\'button\' style=\'float:none;height:18px;\' onclick="$.cookie("example", "01.01.2013");">*</a>';    
	
	//inputButton += '<a id="setDateButton" class=\'button\' style=\'float:none;height:18px;\'>*</a>';    
	var inputRow = inputButton;
	
	var table = getTableHeader();
	table += getTableRow('Item score today', itemsToday);


	

	table += getTableRow('Item score last week', itemsWeek);
	table += getTableRow('Item score total', items);
//	if (cookieDate)
	if (navigator.userAgent.indexOf('Opera') != -1)
		{
			table += getTableRow('Item score from ' + inputRow, itemsCookie);	
		}
	table += getTableFooter();	
	//<a id=\'pickDateButton\' class=\'button\' style=\'float:none;\' onclick="$(\'#pickDateButton\').datePicker()">date</a>
	
	var buttonTable = table ;
	var fullInfo = '<div id="myItemCount">' + buttonTable + '</div>';
	
	
	var myInfo = document.getElementById('myItemCount');
	if(myInfo)
	{
		myInfo.innerHTML = buttonTable;		
	}
	else
		$('#inprofile .half br:eq(4)').after(fullInfo);
	
	$("#cookieDateInput").keyup(function(event){
    if(event.keyCode == 13){
        $("#setDateButton").click();
		
	$('#cookieDateInput').inputmask('d.m.y', { 'placeholder': '-' });
	
//	$("#setDateButton").click(function(event){ setCookieDate(); });
	
    }
});
	
//	$("#cookieDateInput").inputmask("d.m.y",{ 
//	"oncomplete": function(){ alert('Ввод завершен'); }, 
//	"onincomplete": function(){ alert('Заполнено не до конца'); },
//	"oncleared": function(){ alert('Очищено'); }
//});
	//$('h1').after(inputButton);
    
}

  function setCookieDate()
{
	set_cookie(COOKIE_NAME , $('#cookieDateInput').val(),9999,1,1 ); 
//	location.reload();
	 $.get('/ajax/betHistory.php', itemTotals);
}

function addScript( ) {

    // include jQuery
	var headID = document.getElementsByTagName("head")[0];         
	
	var newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.id = 'imputMask';    
	newScript.src = 'https://raw.github.com/RobinHerbots/jquery.inputmask/2.x/js/jquery.inputmask.js';
    headID.appendChild(newScript);
	
	var newScriptExt = document.createElement('script');
    newScriptExt.type = 'text/javascript';
    newScriptExt.id = 'imputMaskExtension';    
	newScriptExt.src = 'https://raw.github.com/RobinHerbots/jquery.inputmask/2.x/js/jquery.inputmask.extensions.js';
    headID.appendChild(newScriptExt);
		
	var newScript1 = document.createElement('script');
    newScript1.type = 'text/javascript';
    newScript1.id = 'myjQuery';
    
	newScript1.src = 'https://raw.github.com/RobinHerbots/jquery.inputmask/2.x/js/jquery.inputmask.date.extensions.js';
    headID.appendChild(newScript1);   	
	
  }
  

  function addScriptChrome( ) {

     // include jQuery
	var headID = document.getElementsByTagName("head")[0];         
	
	
	var newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.id = 'imputMask';    
	//newScript.src = 'http://code.jquery.com/jquery-2.0.2.min.js';
	newScript.value = '<SCRIPT type="text/javascript" >function set_cookie (name, value, expires_year, expires_month, expires_day, path, domain, secure){$.cookie("' + COOKIE_NAME +'", value);}</SCRIPT>';

    headID.appendChild(newScript);
	
	//addScript();	
  }
  
  

if (navigator.userAgent.indexOf('Opera') != -1 && GetDomainName().contains('dota2lounge.com'))
{
    window.addEventListener('load', function (e)  {
		addScript();
        $.get('/ajax/betHistory.php', itemTotals);
    }, false);
}
else
{
	addScriptChrome();
	$.get('/ajax/betHistory.php', itemTotals);
}

