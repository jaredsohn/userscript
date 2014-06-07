// ==UserScript==
// @name       bbgleitzeit script
// @namespace  http://devnetik.de/
// @version    0.4.7
// @description  bbleitzeit enhancer
// @match      http://bbgleitzeit/
// @copyright  2013+, michael malura
// @require http://code.jquery.com/jquery-latest.js
// @resource       jQueryUICSS          http://strd6.com/stuff/jqui/theme/ui.all.css
// @resource    customCSS http://fonts.googleapis.com/css?family=Roboto
// ==/UserScript==

var newCSS = GM_getResourceText ("customCSS");
GM_addStyle (newCSS);

$('body').css('font','14px/18px Arial, Tahoma, Verdana, sans-serif');

var dates = new Array();
var times = new Array();

var rows = $('#GridView1').find('tr');

var previousRow = 0;

rows.each(function(index, value){
    if (index == 0){
        $(this).append($('<th>'));
        $(this).children().last().html("Differenz");

        $(this).append($('<th>'));
        $(this).children().last().html("Gesamt");
    } else {
        $(this).append($('<td>'));
        $(this).children().last().addClass("diff");

        $(this).append($('<td>'));
        $(this).children().last().addClass("gesamt");
    }
    
    var currentStatus = $(this).children('td').eq(1).text();
    //console.log(currentStatus);
    if(currentStatus=='Krank' || currentStatus=='Urlaub'|| currentStatus=='Seminar'|| currentStatus=='Gleitzeit'|| currentStatus=='Reise'|| currentStatus=='Urlaub 1/2 Tag'){
        $(this).children('td').eq(6).html('08:00');
    }else if (previousRow != 0){

        var dateHtml = $(this).children().eq(2).html();
		var timeHtml = $(this).children().eq(3).html();
        
        var previousDateHtml = previousRow.children().eq(2).html();
        var previousTimeHtml = previousRow.children().eq(3).html();
        
        if (dateHtml == previousDateHtml) {
            var currentTimeSplit = timeHtml.split(':')
            var currentTimeDateObject = new Date(2000, 0, 1,  parseInt(currentTimeSplit[0]),  parseInt(currentTimeSplit[1]));
            
            var previousTimeSplit = previousTimeHtml.split(':')
            var previousTimeDateObject = new Date(2000, 0, 1,  parseInt(previousTimeSplit[0]),  parseInt(previousTimeSplit[1]));
            
            var msec = (currentTimeDateObject - previousTimeDateObject);
            
            var hh = Math.floor(msec / 1000 / 60 / 60);
            msec -= hh * 1000 * 60 * 60;
            var mm = Math.floor(msec / 1000 / 60);
            
            var previousStatus = previousRow.children().eq(1).html();
           
            if (previousStatus=='Abwesend'){
                $(this).children('td').eq(5).html((hh < 10 ? ("0"+hh):hh) + ":" + (mm < 10 ? ("0"+mm):mm)).css('font-weight', 'normal').css('font-size', '10px').addClass('pause');
            } else {                
                $(this).children('td').eq(5).html((hh < 10 ? ("0"+hh):hh) + ":" + (mm < 10 ? ("0"+mm):mm)).css('font-weight', 'bold').addClass('arbeit');
            }                        
            
            if (previousStatus=='Urlaub 1/2 Tag'){
                $(this).children('td').eq(5).html('04:00').css('font-weight', 'normal').css('font-size', '10px').addClass('pause');
            }      
        }
        
        if ($.inArray(dateHtml, dates)==-1){
                dates.push(dateHtml);
        }
        
    }
    
    if (index != 0) {
		previousRow = $(this);
    }
});

currentDateTimeUpdateFoo();
var timerId = setInterval(currentDateTimeUpdateFoo, 5000);

function currentDateTimeUpdateFoo(){
                $.each(dates, function(index, value){
        var rowsThatContainsValue = $("tr td:contains('" + value + "')");
    
        var backupMinutes = 0;
        var overallTimeMinutes = 0;
        
        rowsThatContainsValue.parent().children('.arbeit').each(function(i, v){
            var timeValueString = $(this).html();
            var splitValue = timeValueString.split(':');
            
            overallTimeMinutes += parseInt(splitValue[0])*60;
            overallTimeMinutes += parseInt(splitValue[1]);
        });
        
        backupMinutes += overallTimeMinutes;
        var hh = Math.floor(overallTimeMinutes / 60);
        overallTimeMinutes -= hh * 60;    
        
        var resultString = (hh < 10 ? ("0"+hh):hh) + ":" + (overallTimeMinutes < 10 ? ("0" + overallTimeMinutes) : overallTimeMinutes);
        rowsThatContainsValue.last().parent().children('td').last().html(resultString);  
        
        var lastElement = rowsThatContainsValue.last().parent().children().eq(1).html();
        if (lastElement != 'Gehen' && lastElement != 'Urlaub 1/2 Tag' && lastElement != 'Krank'){
            var lastElementTime = rowsThatContainsValue.last().parent().children().eq(3).html();
      
            var currentDate = new Date();
            
            var split = lastElementTime.split(':')
            var dObject = new Date(currentDate.getYear()<999?currentDate.getYear()+1900:currentDate.getYear(), currentDate.getMonth(), currentDate.getDate(),  parseInt(split[0]),  parseInt(split[1]));
            
            //console.log(currentDate);
            //console.log(dObject);
            
            var msec = (currentDate - dObject);
    
            var minutes = Math.floor(msec/1000/60);
            var sec = currentDate.getSeconds();
           
            backupMinutes += minutes;
            
            var newHours = Math.floor(backupMinutes / 60);
            backupMinutes -= newHours * 60;
            var newMinuts = backupMinutes;
    
            
            resultString = (newHours < 10 ? ("0"+newHours):newHours) + ":" + (newMinuts < 10 ? ("0" + newMinuts) : newMinuts) + ":"  +  (sec < 10 ? ("0" + sec) : sec);
            rowsThatContainsValue.last().parent().children('td').last().html(resultString);
            document.title = resultString;
        }      
    }); 
}