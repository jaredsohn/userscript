// ==UserScript==
// @name  Weather Update
// @include        http://www.cc98.org/dispbbs.asp*
// @run-at         document-end
// ==/UserScript==
 
var xmlhttpReq = null;

 function getXHR()
 {
     if (window.XMLHttpRequest) {
         xmlhttpReq = new XMLHttpRequest();
     } else if (window.ActiveXObject) {
         xmlhttpReq = new ActiveXObject("Microsoft.XMLHTTP");
     }
 }

 function getWeather()
 {
     getXHR();
     xmlhttpReq.onreadystatechange = function (response)
     {
         if (xmlhttpReq.readyState == 4 && xmlhttpReq.status == 200) {
             showWeather();
         }
     };
     xmlhttpReq.open("get", "http://webservice.webxml.com.cn/WebServices/WeatherWS.asmx/getWeather?theCityCode=2057&theUserID=", true);
     xmlhttpReq.send();
 }

 function showWeather()
 {
     var xmlDoc = xmlhttpReq.responseXML.documentElement;
     var items = xmlDoc.getElementsByTagName("string");
     var str = items[i].firstChild.nodeValue;

     document.getElementById("content").innerText = str;

 }