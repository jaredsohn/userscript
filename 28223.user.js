// ==UserScript==
// @name           OTR::EPG-Calendar on Top
// @namespace      http://www.onlinetvrecorder.com
// @description    Set the calendar on top
// @include        *onlinetvrecorder.com/index.php*aktion=newepgschedule*
// ==/UserScript==

(function (){
    var now = new Date();
    var mouth = now.getMonth()+1;
    var year = now.getFullYear()
    
    for(var y=year;y<year+2;y++){
    for(var m=1;m<13;m++){
    var id = 'calendar_'+m+''+y;
    var cal = document.getElementById(id);
    if (cal){
        cal.style.position='fixed';
	cal.style.left='0px';
        cal.style.top='0px';
        cal.style.backgroundColor='white';
	cal.style.MozOpacity=0.8;
    }
    }
    }
})();
