// ==UserScript==
// @name           IAE Calendar
// @author         Thibault Vernadat, Michel Kuhm
// @namespace      http://intranet.iae-grenoble.fr/index/accueil
// @description    Permet de télécharger son agenda au format ICS
// @include        http://intranet.iae-grenoble.fr/index/accueil
// @grant       none
// ==/UserScript==

     function convertJsonToICS() {
        var url = "http://intranet.iae-grenoble.fr/full-calendar/evenements?"+
        "planningType=0&" +
        "start=" +generateTimeStampStart() + "&" +
        "end=" + generateTimeStampEnd() + "&" + 
        "_=" + fakeTimeStamp();
        createICSFile(parseJSON(HttpRequest(url)));
   }
   
   function parseJSON(str){
      var obj = JSON.parse(str);
      var intitule, salle, start, end, ICSContent;
      ICSContent = "BEGIN:VCALENDAR\r\n"+
                   "VERSION:2.0\r\n"+
                   "METHOD:PUBLISH\r\n"+
                   "PRODID:-//Michel et Thibault/version 1.0\r\n"+
                   "CALSCALE:GREGORIAN\r\n";
                   
        for(var i = 0; i < obj.length ; i++) {
            /* Parse fields */
            intitule = obj[i].title.split("(")[0]; // titre
            salle = obj[i].title.split("(")[1].split(")")[0]; //lieu
            start = obj[i].start ; // start time
            end = obj[i].end; // end time
            
            /* Add entry to ICS content */
            ICSContent += "BEGIN:VEVENT\r\n" +
                "DTSTAMP:" + parseDateToICSDate(start)+"\r\n" +
                "DTSTART:" + parseDateToICSDate(start)+"\r\n" +
                "DTEND:" + parseDateToICSDate(end)+"\r\n" +
                "SUMMARY:" + intitule + "\r\n"+
                "LOCATION:" + salle + "\r\n"+
                "DESCRIPTION:\r\n"+
                "END:VEVENT\r\n";
        }
        ICSContent += "END:VCALENDAR";
        return ICSContent;
   }
   
   function createICSFile(content) {
	window.open("data:text/calendar;filename=calendar.ics;charset=utf8," + escape(content));
   }
   
   function parseDateToICSDate(date) {
       var annee = date.split("-")[0];
       var mois = date.split("-")[1];
       var jour = date.split("-")[2].split(" ")[0];
       var heure = date.split(" ")[1].split(":")[0];
       var min = date.split(" ")[1].split(":")[1];
       var sec = date.split(" ")[1].split(":")[2];
       return annee + mois + jour + "T" + heure + min + sec;
   }
   
   function generateTimeStampStart(){ 
       var ladate=new Date();
       var year;
       if (ladate.getMonth() < 9){
           year =  ladate.getFullYear()-1;
       } else {
           year =  ladate.getFullYear();
       }
       var month = 10;
       var day = 01;
       var tmpDate = year + "," + day + "," + month;
       var startDate = new Date(year,8,1,0,0,0,0);
       return startDate.getTime()/1000;
   }
   
   function generateTimeStampEnd() {
       var ladate=new Date();
       var year;
       if (ladate.getMonth < 9){
           year =  ladate.getFullYear()+1;
       } else {
           year =  ladate.getFullYear();
       }
       var month = 8;
       var day = 31;
       var tmpDate = year + "," + day + "," + month;
       var startDate = new Date(year,8,1,0,0,0,0);
       return startDate.getTime()/1000;
   }
   
   function fakeTimeStamp() {
       return "1392727508433";
   }
   function HttpRequest(url){
        var pageRequest = false; //variable to hold ajax object
        /*@cc_on
           @if (@_jscript_version >= 5)
              try {
              pageRequest = new ActiveXObject("Msxml2.XMLHTTP")
              }
              catch (e){
                 try {
                 pageRequest = new ActiveXObject("Microsoft.XMLHTTP")
                 }
                 catch (e2){
                 pageRequest = false
                 }
              }
           @end
        @*/

        if (!pageRequest && typeof XMLHttpRequest != 'undefined')
           pageRequest = new XMLHttpRequest();
        
        if (pageRequest){ //if pageRequest is not false
           pageRequest.open('GET', url, false); //get page synchronously 
           pageRequest.send(null);
           if (window.location.href.indexOf("http")==-1 || pageRequest.status==200)
              return pageRequest.responseText;
           }
        }

	function modifyPage(){
        var exportButton = document.createElement("input");
       exportButton.setAttribute("type","button");
       exportButton.setAttribute("name","Get Calendar");
       exportButton.setAttribute("value","Get Calendar");
       exportButton.addEventListener('click', convertJsonToICS, true);
       document.getElementById('left_section').appendChild(exportButton);
    }

    modifyPage();

/*
Exception: Unterminated string constant (37:17)
raise@resource://gre/modules/devtools/acorn.js:226
readString@resource://gre/modules/devtools/acorn.js:840
getTokenFromCode@resource://gre/modules/devtools/acorn.js:650
readToken@resource://gre/modules/devtools/acorn.js:697
getToken@resource://gre/modules/devtools/acorn.js:141
prettyFast@resource://gre/modules/devtools/pretty-fast.js:707
self.onmessage@resource://gre/modules/devtools/server/actors/pretty-print-worker.js:39

*/
