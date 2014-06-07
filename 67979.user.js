// ==UserScript==
// @name          gDate2Cal_SP 0.1
// @namespace     http://ajaxorized.com/gdate2cal
// @description   UserScript to replace dates in gmail with links to google calendar (Spanish Version)
// @include       http://mail.google.com/*
// @include             https://mail.google.com/*
// @author              Willem Spruijt & Alberto Benbunan
// ==/UserScript==

var curDate = new Date();
var messageCount = 0;

var aRegExpMonthsSp = 'Enero|Febrero|Marzo|Abril|Mayo|Junio|Julio|Agosto|Septiembre|Setiembre|Octubre|Noviembre|Diciembre';
var aRegExpMonthsSpShort = 'Ene|Feb|Mar|Abr|May|Jun|Jul|Ago|Sep|Sept|Oct|Nov|Dic';
var aRegExpMonthsEn = 'January|February|March|April|May|June|July|August|September|October|November|December';var aRegExpMonthsEnShort = 'Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec';var aRegExpMonth = aRegExpMonthsSp + '|' + aRegExpMonthsSpShort + '|' + aRegExpMonthsEn + '|' + aRegExpMonthsEnShort;

var getMonthByStr = function(strMonth) {
        
        if(strMonth == 'Enero' || strMonth == 'enero' || strMonth == 'ene' || strMonth == 'Ene' || strMonth == 'January' || strMonth == 'january' || strMonth == 'Jan' || strMonth == 'jan') return '1';        if(strMonth == 'Febrero' || strMonth == 'febrero' || strMonth == 'Feb' || strMonth == 'feb' || strMonth == 'February' || strMonth == 'february')    return '2';                if(strMonth == 'Marzo' || strMonth == 'marzo' || strMonth == 'Mar' || strMonth == 'mar' || strMonth == 'March' || strMonth == 'march')    return '3';        if(strMonth == 'Abril' || strMonth == 'abril' || strMonth == 'Abr' || strMonth == 'abr'  || strMonth == 'April' || strMonth == 'april')    return '4';             if(strMonth == 'Mayo' || strMonth == 'mayo' || strMonth == 'May' || strMonth == 'may')    return '5';        if(strMonth == 'Junio' || strMonth == 'junio' || strMonth == 'Jun' || strMonth == 'jun'  || strMonth == 'June' || strMonth == 'june')    return '6';
        if(strMonth == ''Julio' || strMonth == 'julio' || strMonth == 'Jul' || strMonth == 'jul'  || strMonth == 'July' || strMonth == 'july')    return '7';
        if(strMonth == 'Agosto' || strMonth == 'agosto' || strMonth == 'Ago' || strMonth == 'ago'  || strMonth == 'August' || strMonth == 'august'  || strMonth == 'Aug' || strMonth == 'aug')             return '8';                if(strMonth == 'Septiembre' || strMonth == 'septiembre' || strMonth == 'sep' || strMonth == 'Sep' || strMonth == 'sept' || strMonth == 'Sept'  || strMonth == 'September' || strMonth == 'september'  || strMonth == 'Septembre' || strMonth == 'septembre') return '9';        if(strMonth == 'Octubre' || strMonth == 'Oct' || strMonth == 'octubre' || strMonth == 'Oct'  || strMonth == 'October' || strMonth == 'october'  || strMonth == 'Octobre' || strMonth == 'octobre')         return '10';        if(strMonth == 'Noviembre' || strMonth == 'noviembre' || strMonth == 'Nov' || strMonth == 'nov'  || strMonth == 'November' || strMonth == 'november'  || strMonth == 'Novembre' || strMonth == 'novembre')               return '11';        if(strMonth == 'Diciembre' || strMonth == 'diciembre' || strMonth == 'Dic' || strMonth == 'dic'  || strMonth == 'December' || strMonth == 'december'  || strMonth == 'decembre' || strMonth == 'Decembre')           return '12';}                

var buildGCalLink = function(sYear, iMonth, iDay) {
        var sDate = sYear;
        
        if(iMonth.length == 1) sDate += '0';
        sDate += iMonth;
        
        if(iDay.length == 1) sDate += '0';
        sDate += iDay;
        var sLink = 'https://www.google.com/calendar/render?mode=week&date='+sDate;
        sLink = '<a href = "'+sLink+'" target = "_blank">'+aMatch[0]+'</a>';
        
        return sLink;
}

var getYearByMonth = function(sMonth, sYear) {
//alert(sYear);
        if(sYear) {
                var sYear = sYear;
        } else {
    var iMonth = parseInt(sMonth);
                var iCurMonth = curDate.getMonth() + 1;
                if(iMonth >= iCurMonth) {
                        iYear = curDate.getFullYear();
                } else {
                        iYear = curDate.getFullYear() + 1;
                }
                sYear = iYear.toString();
        }
        return sYear;        
}

var replaceDates = function() {
        
        var messageCount = 0;
        
        // if(document.getElementById('msgs')) {              
        while(document.getElementById('mb_'+messageCount)) {
                var msgHtml = document.getElementById('mb_'+messageCount).innerHTML; // Prototype, we miss you :(
                
    var sNewMsgHtml = msgHtml;  
                // Try to match the patterns  
                //var sRegExp1 = new RegExp("([0-9]+)(er|st)?\\s*("+aRegExpMonthsEn+")\\s*(20([0-9]{2}))", "gi"); 
                var sRegExp2 = new RegExp("([0-9]+)-([0-9]+)(-20([0-9]{2}))?(-([0-9]{2}))?", "g");
                var sRegExp3 = new RegExp("([0-9]+)\/([0-9]+)(\/20([0-9]{2}))?(\/([0-9]{2}))?", "g");
                var sRegExp4 = new RegExp("([0-9]+)\\s*("+aRegExpMonth+")\\s*(20([0-9]{2}))?", "gi");
        
                while(aMatch = sRegExp2.exec(msgHtml)) {
                        //alert("2:"+aMatch[0]+"_"+aMatch[1]+"_"+aMatch[2]+"_"+aMatch[3]+"_"+aMatch[4]+"_"+aMatch[5]);
                        var sMonth = aMatch[2];
                        var sDay = aMatch[1];
                        //var sYear = '20'+aMatch[3];
                        if(aMatch[4])
                        var sYear = getYearByMonth(sMonth, '20'+aMatch[4]);
                else var sYear = getYearByMonth(sMonth, aMatch[4]);
                        var sLink = buildGCalLink(sYear, sMonth, sDay);
                        sNewMsgHtml = sNewMsgHtml.replace(aMatch[0], sLink);
                }
        
                while(aMatch = sRegExp3.exec(msgHtml)) {
                        //alert("3:"+aMatch[0]+"_"+aMatch[1]+"_"+aMatch[2]+"_"+aMatch[3]+"_"+aMatch[4]+"_"+aMatch[5]);
                        var sMonth = aMatch[2];
                        var sDay = aMatch[1];
                        //var sYear = '20'+aMatch[3];
                        if(aMatch[4])
                  var sYear = getYearByMonth(sMonth, '20'+aMatch[4]);
                        else var sYear = getYearByMonth(sMonth, aMatch[4]);
                        var sLink = buildGCalLink(sYear, sMonth, sDay);                                
                        sNewMsgHtml = sNewMsgHtml.replace(aMatch[0], sLink);
                }
                
        /*    while(aMatch = sRegExp1.exec(msgHtml)) {
                alert("1:"+aMatch[0]+"_"+aMatch[1]+"_"+aMatch[2]+"_"+aMatch[3]+"_"+aMatch[4]+"_"+aMatch[5]);
                      var sMonth = getMonthByStr(aMatch[3]);
                      var sDay = aMatch[1];   
                      var sYear = getYearByMonth(sMonth, aMatch[3]);
                      var sLink = buildGCalLink(sYear, sMonth, sDay);                                 
                      var replaceRegexp = new RegExp(aMatch[0], "g");
                      sNewMsgHtml = sNewMsgHtml.replace(replaceRegexp, sLink);        
              }*/

                while(aMatch = sRegExp4.exec(msgHtml)) {
                        //alert("4:"+aMatch[0]+"_"+aMatch[1]+"_"+aMatch[2]+"_"+aMatch[3]+"_"+aMatch[4]+"_"+aMatch[5]);
                        var sMonth = getMonthByStr(aMatch[2]);
                        var sDay = aMatch[1];    
      var sYear = getYearByMonth(sMonth, aMatch[3]);
                        var sLink = buildGCalLink(sYear, sMonth, sDay);                        
                        var replaceRegexp = new RegExp(aMatch[0], "g");
                        sNewMsgHtml = sNewMsgHtml.replace(replaceRegexp, sLink);     
                }                

                
                document.getElementById('mb_'+messageCount).innerHTML = sNewMsgHtml;  
                messageCount++;
        }
}

replaceDates();