// ==UserScript==
// @name           Neobux Server Time
// @namespace      http://userscripts.org/users/kwah
// @description      Displays both your local time and the Neobux's server time in the corner of your page
// @include        http://www.neobux.com/*
// @include        https://www.neobux.com/*
// @exclude        http://www.neobux.com/v/*
// @exclude        https://www.neobux.com/v/*
// @attriubtion    kwah
// @version        2.0
// ==/UserScript==

var debug = false;

if(!debug){
  function GM_log(){}
}

if(GM_getValue("FirstUse",1)==1){
  GM_setValue("FirstUse",0);
  alert("Welcome and enjoy your use of this greasemonkey script =] \nIn order for the script to function correctly, you must first visit your 'view advertisements' link.\n\nIf the script does not work after visiting your 'view advertisements' link, please contact 'kwah' at UserScripts.org or at Neobux.");
}

var LocalDateTime = new Date();

var localTime = GetLocalTime();
var serverTime;

if(GM_getValue("SetupComplete",0)==1){
  GM_log("SetupComplete == 1, serverTime = GetServerTime()");
  serverTime = GetServerTime();
} else {
  GM_log("SetupComplete == 0, serverTime = '<a href=\"http://www.neobux.com/?u=v\">Ver Anúncios</a>'");
  serverTime = '<a href="http://www.neobux.com/?u=v">Ver Anúncios</a>';
}


var location = document.evaluate('//td[@id="mnbl"]',
  document,
  null,
  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
  null).snapshotItem(0);

 GM_log('Local: ' + localTime + ' Server: ' + serverTime);
var Container = document.createElement('span');
  Container.setAttribute('style','text-align: right; font-family: courier new, verdana; margin-top: 0px;');


var tmpText = 'Hora Local: ' + localTime + ' . Hora do Servidor: ' + serverTime;
tmpText = document.createTextNode(tmpText);
Container.appendChild(tmpText);
location.appendChild(Container);

IsAdPage();

/*******************************************
*************** FUNCTIONS ******************
*******************************************/
 
function GetLocalTime() {

  var localHours = LocalDateTime.getHours()
  var localMinutes = LocalDateTime.getMinutes();
  var localSeconds = LocalDateTime.getSeconds();

  if (localHours < 10){
    localHours = "0" + localHours;
  }
  if (localMinutes < 10){
    localMinutes = "0" + localMinutes;
  }
  if (localSeconds < 10){
    localSeconds = "0" + localSeconds;
  }

return localHours + ":" + localMinutes; //+ ":" + localSeconds;
}

function GetServerTime() {

  var serverOffsetGMT;
  var TimeOffset = parseFloat(GM_getValue('serverOffsetGMT',0));
GM_log('TimeOffset = '+TimeOffset);
  
  if (TimeOffset < 0){
  GM_log('TimeOffset < 0');
    TimeOffset_Hour = Math.ceil(TimeOffset);
  GM_log('TimeOffset - Math.floor(TimeOffset) = '+ (TimeOffset - Math.floor(TimeOffset)));
    TimeOffset_Minute = Math.round((TimeOffset - Math.ceil(TimeOffset)) * 60);
  } else if (TimeOffset > 0){
  GM_log('TimeOffset > 0');
    TimeOffset_Hour = Math.floor(TimeOffset);  
  GM_log('TimeOffset - Math.floor(TimeOffset) = '+TimeOffset - Math.floor(TimeOffset));
    TimeOffset_Minute = Math.round((TimeOffset - Math.floor(TimeOffset)) * 60);  
  }

 GM_log('TimeOffset_Hour = '+TimeOffset_Hour);
 GM_log('TimeOffset_Minute = '+TimeOffset_Minute);

  var currentTime = new Date();

  // Check that the adjustment to the timezone hasn't caused time to be negative
  var localHours = LocalDateTime.getHours();
  var localMinutes = LocalDateTime.getMinutes();
  
  var serverHours = localHours + TimeOffset_Hour;
  if (serverHours < 0){
    serverHours = serverHours + 24;
  }
  var serverMinutes = localMinutes + TimeOffset_Minute;
  if (serverMinutes < 0){
    serverMinutes = serverMinutes + 60;
  }
  
  GM_log('serverHours = '+serverHours);
  GM_log('serverMinutes = '+serverMinutes);
  
    // Add leading zeros to the digits
  if (serverHours < 10){
    var serverHours = "0" + serverHours;
  }
  if (serverMinutes < 10){
    var serverMinutes = "0" + serverMinutes;
  }
  var serverSeconds = LocalDateTime.getSeconds()
  if (serverSeconds < 10){
    var serverSeconds = "0" + serverSeconds;
  }
  
  GM_log('serverHours = '+serverHours);
  GM_log('serverMinutes = '+serverMinutes);
  GM_log('serverSeconds = '+serverSeconds);
  
  // Return the time in the format HH:MM(:SS optional)
  return serverHours + ":" + serverMinutes; // + ":" + serverSeconds;
}

function GetTimeOffset() {

  // Hunt for the current server time
  var locationOfTime = document.evaluate('  //b[contains(.,"A hora actual do servidor é:")]',
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null).snapshotItem(0);

  // var String = 'A hora actual do servidor é: 2009/06/07 20:46';
  var String = locationOfTime.innerHTML;

  // Get rid of the unnecessary stuff at the beginning
  var dateTimeString = String.split(": ")[1]; // eg: 2009/06/07 20:05
  // GM_log('dateTimeString = '+dateTimeString);

  dateTimeString = dateTimeString.split(" ");
  // GM_log('dateTimeString = '+dateTimeString);

    var date = dateTimeString[0].split("/");
  // GM_log('date [yyyy,mm,dd] = '+date);
    var year = date[0];
    var month = date[1];
    var day = date[2];

    var time = dateTimeString[1].split(":");
  // GM_log('time [hh,mm] = '+time);
    var hour = time[0];
    var minute = time[1];

  // GM_log('day/month/year hour:minute = '+day+'/'+month+'/'+year+' '+hour+':'+minute+'\n');

  var ServerDateTime = new Date();
  ServerDateTime.setFullYear(year,(month-1),day);
  ServerDateTime.setHours(hour,minute);

  // GM_log('ServerDateTime = '+ServerDateTime+'\n');

  var ServerTime = ServerDateTime.getTime();
  var LocalTime = LocalDateTime.getTime();
  var one_hour = 1000*60*60;

  var Difference = (ServerTime - LocalTime)/(one_hour);
  Difference = Math.floor(Difference*1000)/1000;
  // GM_log('Difference = '+Difference);

return Difference;

}

function IsAdPage() {

  var CurrentUrl = document.location.href;
  
  var RegExp_AdPage = /^http[s]?:\/\/www\.neobux\.com\/\?u\=v/;
  var IsMatch = RegExp_AdPage.test(CurrentUrl);

  var serverOffsetGMT;
  if(IsMatch){
    serverOffsetGMT = 0 + GetTimeOffset();
    GM_setValue('serverOffsetGMT',String(serverOffsetGMT));
  }
  
  if(GM_getValue("SetupComplete",0)==0){
    GM_setValue("SetupComplete",1);
    if(GM_getValue("SetupComplete",0)==1){
      alert("Congratulations, the script should now be setup correctly. \n\nIf the script does not work after visiting your 'view advertisements' link, please contact 'kwah' at UserScripts.org or at Neobux.");
    } else {
      alert("There was a problem setting this script up. Please try refreshing this page.\n\nIf the script still does not work, please contact 'kwah' at UserScripts.org or at Neobux.");
    }
  }
}
