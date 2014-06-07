// ==UserScript==
// @name            OGame:Timer
// @namespace       localhost
// @author          Asiman
// @include         http://*.ogame.*/game/index.php?page=*
// @copyright		2013, LogServer.net
// @license         GNU
// @version 		1.1
// @homepage        http://userscripts.org/scripts/show/162698
// ==/UserScript==

var document = unsafeWindow.document;
var localStorage = unsafeWindow.localStorage;
var $ = unsafeWindow.$;

$.getScript( '/cdn/js/greasemonkey/version-check.js', function()
{
    (unsafeWindow || window).oGameVersionCheck('Timer (LogServer.net)','5.3.4','http://userscripts.org/scripts/show/162698');
} );

function AddTimer()
{
   var OGameClock = $("li[class*='OGameClock']").eq(0).find('span');
   var fTime = OGameClock[0].innerHTML.split(':');
        var fHour = fTime[0];
   var arrivalTime = $("td[class*='arrivalTime']");
   for (var i=0; i < arrivalTime.length; i++)
    {
        if (!($("#OGTID"+i).val()))
        {
        var sTime = arrivalTime[i].innerHTML.split(':');
        var sHour = sTime[0];
        var sMinutes = sTime[1];
        var sSeconds = sTime[2];
        strPattern = /\s\D/;
		while (sSeconds.search(new RegExp(strPattern)) != -1)
			sSeconds = sSeconds.replace(new RegExp(strPattern), "");
        var div = document.createElement("div");
            var arrHTML = '';
                arrHTML += '<input type="text" id="OGTID'+i+'" value="1" style="display:none;"/>';
                arrHTML += '<a href="http://timer.logserver.net/index.php?sHour='+sHour+'&sMinutes='+sMinutes+'&sSeconds='+sSeconds+'&fHour='+fHour+'" target="_blank"><font color="#00CC00">T</font></a>&nbsp;';
                arrHTML += '<a href="http://timer.logserver.net/index.php?sHour='+sHour+'&sMinutes='+(sMinutes-1)+'&sSeconds='+sSeconds+'&fHour='+fHour+'" target="_blank"><font color="#FFFF00">T(-1)</font></a>&nbsp;';
                arrHTML += '<a href="http://timer.logserver.net/index.php?sHour='+sHour+'&sMinutes='+(sMinutes-3)+'&sSeconds='+sSeconds+'&fHour='+fHour+'" target="_blank"><font color="#FF0000">T(-3)</font></a>';
                div.innerHTML = arrHTML;
            arrivalTime[i].appendChild(div);
        }
    }

}
setInterval (AddTimer, 1000);