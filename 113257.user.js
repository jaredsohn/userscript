// ==UserScript==
// @id             anyTimeToDast
// @name           Show me DAST (DeviantArt Server Time)
// @version        1.1.1
// @namespace      Jezisheck.anyTimeToDast
// @author         Jezisheck <jezisheck@jezisheck.cz> http://jezisheck.cz/
// @homepageURL    http://jezisheck.cz/
// @description    [Also works in Chrome!] This script injects current date and time used by deviantART servers which is GMT-7 aka DAST. It aims to be used by group administrators as in some places there is time expressed in server's timezone. The displayed format can not be customized at the moment but you can do it by yourself in the source code on line 20. The time will be updated every 10 seconds. NOTE: The time is derived from your current system time, just shifted by according number of hours. Also, it is possible that the time will be shifted due to daylight saving time shift after 2011/11/06. I will revise this script after that time of year will occur if necessary.
// @match          http://*.deviantart.com/*
// @run-at         document-idle
// ==/UserScript==

// jQuery insertion workaround for Chrome from http://stackoverflow.com/questions/2588513/why-doesnt-jquery-work-in-chrome-user-scripts-greasemonkey
var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js", function() {

  jQuery.noConflict();

  var getTimeString = function() {
    var formatString = "%year%/%month%/%day% %hour%:%minute% DAST";
    var localTime = new Date();
    var localMilis = localTime.getTime();
    
    var localOffset = localTime.getTimezoneOffset();
    var utcMilis = localMilis + (localOffset*60000);
    
    var dastMilis = utcMilis - 25200000; // -7 hours
    var dastTime = new Date(dastMilis);
    
    
    var dastString = formatString;
    
    
    dastString = dastString.replace("%year%", dastTime.getFullYear());
    
    dastString = dastString.replace("%month%", dastTime.getMonth()+1);
    
    dastString = dastString.replace("%day%", dastTime.getDate());
    
    dastString = dastString.replace("%hour%", dastTime.getHours());
    
    if( dastTime.getMinutes() < 10 ) dastString = dastString.replace("%minute%", "0"+dastTime.getMinutes());
    else dastString = dastString.replace("%minute%", dastTime.getMinutes());
    
    //if( dastTime.getSeconds() < 10 ) dastString = dastString.replace("%second%", "0"+dastTime.getSeconds());
    //else dastString = dastString.replace("%second%", dastTime.getSeconds());
  
    return dastString;
  }
  
  
  var showTime = function() {
    var dastString = getTimeString();
  
    var targeElement = jQuery("table#overhead td.oh-gap").first();
    
    if(targeElement) {
      var dastHtml = "<span id='anyTimeToDastInjection' style='display:none'>" + dastString + "</span>";
      targeElement.css("line-height", "3.7");
      targeElement.css("text-align", "center");
      targeElement.html(dastHtml);
      jQuery("#anyTimeToDastInjection").show(2000);
      return true;
    } else { return false; }
  }
  
  
  var updateTime = function() {
    var dastString = getTimeString();
  
    var targeElement = jQuery("#anyTimeToDastInjection").first();
    
    if(targeElement) {
      targeElement.html(dastString);
      setTimeout(updateTime,10000);
      return true;
    } else { return false; }
  }


  if( showTime() ) setTimeout(updateTime,10000);

});

