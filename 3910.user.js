// ==UserScript==
// @name        Axia College Keep Alive
// @author      Lukas Fragodt
// @namespace   http://lukas.fragodt.com/
// @description Prevents Axia's ecampus from logging you out due to inactivity.
// @include     https://ecampus.wintu.edu/*
// @exclude     https://ecampus.wintu.edu/
// ==/UserScript==

//Requests courselist from the server every 14.5 minutes to prevent .NET session
//from expiring.

if (getCookie('wiuLock') == 1) {
  //If the script is already running, check again every 30 seconds.
  var wiuWait = setInterval(function() {
    if (getCookie('wiuLock') == 0) {
      document.cookie = 'wiuLock=1;expires=-1;path=/';
      window.setInterval(function() {
        GM_xmlhttpRequest({
           method:"GET",
           url:"https://ecampus.wintu.edu/secure/courseList.asp",
           headers:{
             "User-Agent":"Mozilla/4.0 (compatible) Greasemonkey",
             "Accept":"text/*"
           },
           onload: function(responseDetails) {},
           onerror: function(responseDetails) {}
        });
      }, 870000);
      clearInterval(wiuWait);
    }
  },30000);
} else {
  document.cookie = 'wiuLock=1;expires=-1;path=/';
  window.setInterval(function() { 
    GM_xmlhttpRequest({
      method:"GET",
      url:"https://ecampus.wintu.edu/secure/courseList.asp",
      headers:{
        "User-Agent":"Mozilla/4.0 (compatible) Greasemonkey",
        "Accept":"text/*"
      },
      onload: function(responseDetails) {},
      onerror: function(responseDetails) {}
    });
  }, 870000);
}

function getCookie(name) {
  var cookies = document.cookie;
  var splitCookie = cookies.split(";");
  var findVal = name + '=';
  for (var i = 0; i < splitCookie.length; i++) {
    if (splitCookie[i].indexOf(findVal) != -1) {
      return splitCookie[i].substring(findVal.length+1,splitCookie[i].length);
    }
  }
}

//Let other tabs/windows know we're done.
function wiuUnload() {
  document.cookie = 'wiuLock=0;expires=-1;path=/';
}

addEventListener('unload',wiuUnload,true);
document.unload = wiuUnload;
