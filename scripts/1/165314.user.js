// ==UserScript==

// @name          FaceBook BirthDays to Google calendar

// @namespace     http://www.sovas.lv

// @description   Add BirthDays to Google Calendar. Can remake to add all events to calendar

// @include      *www.facebook.com/events/list*

// ==/UserScript==

console.clear();

var eveLink = 'http://www.google.com/calendar/event?action=TEMPLATE';
var callenderIco = '<img width="15" height="16" alt="" src="http://static.ak.fbcdn.net/rsrc.php/v2/yG/r/lRTMK---jRJ.png" class="mrs fbCalendarHeaderIcon customimg img">';

function getGoogleEventDate(unix_timestamp){
    //20130427T100000 new Date().getTime()
	date = new Date(unix_timestamp);
	var dateReturn = '' + date.getFullYear();
    var month = date.getMonth() + 1;
    dateReturn += logicTimeUnit(month) + logicTimeUnit(date.getDate()) + 'T' + logicTimeUnit(date.getHours())+ logicTimeUnit(date.getMinutes()) + logicTimeUnit(date.getSeconds());    
	return dateReturn;
}

function logicTimeUnit(tUnit){
    if (tUnit < 10){
       return '0' +  tUnit;
    }else{
       return '' +  tUnit;
    }
}


function generateGoogleEventLink(param){
    //&dates=20130427T100000/20130427T130000
    var link = eveLink + '&dates=';
    link +=  getGoogleEventDate(param.start) + '%2F' + getGoogleEventDate(param.end);
    
    link += '&text=' + encodeURIComponent(param.text);
    link += '&location=' + encodeURIComponent(param.location);
    link += '&details=' + encodeURIComponent(param.details);
    
    return link;
}



/**timeNow = new Date().getTime();
console.log(generateGoogleEventLink({start : timeNow , end : timeNow , text : "Sumināts" , location : "M ājās" , details : 'Nafig' })); **/



/// part when get location
function putAdditionalLink(matchClass){
    var elems = document.getElementsByTagName('*'), i;
    for (i in elems) {
        if((' ' + elems[i].className + ' ').indexOf(' ' + matchClass + ' ')  > -1) {
            if (elems[i].innerHTML == 'Birthdays'){
                date = extractBirthDate(elems[i]);
                subject = extractPerson(elems[i]);
                
                googleLink = generateGoogleEventLink({start : date , end : date , text : subject , location : "" , details : '' })
                
                elems[i].innerHTML += ' <a href="'+ googleLink +'" target="_blank"> ' + callenderIco + '</a>';
                
            }
        }
    }
    
}

function extractBirthDate(element){
    mainTab = element.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    
    var childHood = mainTab.getElementsByTagName('*'), i;
    var dateEmentClass = 'uiHeaderTitle';
    for (i in childHood) {
        if((' ' + childHood[i].className + ' ').indexOf(' ' + dateEmentClass + ' ')  > -1) {
    dateString = childHood[i].innerHTML;
    dateArray = dateString.split(",");
    month = extractMonthNumber(dateArray[1].split(" ")[1]);
    day = dateArray[1].split(" ")[2].trim();
    year = dateString.split(",")[2].trim();
    
    timestamp = new Date(year , month , day).getTime();
    
    //console.log(getGoogleEventDate(timestamp));
    
    return timestamp;
}

}
}

function extractMonthNumber(name){
var month= {};
month["January"]= 0;
month["February"]=1;
month["March"]=2;
month["April"]=3;
month["May"]=4;
month["June"]=5;
month["July"]=6;
month["August"]=7;
month["September"]=8;
month["October"]=9;
month["November"]=10;
month["December"]=11;

return month[name];
}

function extractPerson(element){
    realNode = element.parentNode.parentNode;
    detailNode = 'fbCalendarItemContent';
    var jubChild = realNode.getElementsByTagName('*'), i;
    
    for (i in jubChild) {
        if((' ' + jubChild[i].className + ' ').indexOf(' ' + detailNode + ' ')  > -1) {
           return jubChild[i].childNodes[0].childNodes[0].childNodes[0].childNodes[0].getAttribute("aria-label");
        
        }}
    

}

putAdditionalLink('fbCalendarLabel');