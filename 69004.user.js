// ==UserScript== 
// @name           Neobux 2+ (v3) for chrome
// @namespace      http://userscripts.org/users/kiillerman1
// @author         kiillerman1
// @modded_from    kwah

// @description    This script provides detailed statistics for your Neobux account and referrals (eg: ages of referrals, recent income/outcome averages, plus more!)

// @include        http://www.neobux.com/?u=c&s*
// @include        https://www.neobux.com/?u=c&s*
// @include        http://www.neobux.com/?u=c
// @include        https://www.neobux.com/?u=c
// @exclude        http://www.neobux.com/?u=c&s=rba
// @exclude        https://www.neobux.com/?u=c&s=rba

////version = major.minor.date.time //date.time = yymmdd.hhmm (GMT)
// @version        3.0.100215.0141
// @updateNote     3.0 = The first 'real' release of v3, under the WTFPL license v2; 091211.1616 = Fixed error where the cost of golden pack is counted twice when calculating the total expenses for each referral

// @license        WTFPL v2 - Do What You Want To Public License v2; http://sam.zoy.org/wtfpl/
// @license        "Everyone is permitted to copy and distribute verbatim or modified copies of this license document, and changing it is allowed **as long as the name is changed** [emphasis mine]". 

// ==/UserScript== 


// GM_log('Neobux 2+ (v3 Experimental)');


function GM_listValues() {
  var cookies  = document.cookie.replace(/ /g,"").split(";");
  var arr=new Array();
  for (var i = 0; i < cookies.length; i++){
    cookiePair = cookies[i].split("=");
    if(cookiePair[0].indexOf("script")>-1) {
      arr.push(cookiePair[0]);
    }
  }
  return arr;
}

function GM_setValue( cookieName, cookieValue) {
  cookieName="script"+cookieName;
	if( !cookieName ) { return; }
	document.cookie = cookieName+ "="+cookieValue+"#"+(typeof cookieValue)+
		";expires=31536000;path=/";
}

function GM_getValue( cookieName, oDefault ) {
  cookieName="script"+cookieName;
	var cookieJar = document.cookie.split( ";");
	for( var x = 0; x < cookieJar.length; x++ ) {
		var oneCookie = cookieJar[x].split("=");
		if( oneCookie[0].indexOf(cookieName)>=0) {
      var split = oneCookie[1].split("#");
      if(split[1].toLowerCase()=="boolean") {
      var footm = eval(split[0]);
      } else {
			var footm = split[0];
      }
      return footm;
		}
	}
	return oDefault;
}

var logging = false;
if(!logging) { function GM_log() {}; }


var newDialog_Style = "\
  #modalContainer {\
    background-color: transparent;\
    position: absolute;\
    width: 100%;\
    height: 100%;\
    top: 0px;\
    left: 0px;\
    z-index: 10000;\
    background-image: url(tp.png); /* required by MSIE to prevent actions on lower z-index elements */\
  }\
\
  #alertBox {\
    position: relative;\
    width: 300px;\
    min-height: 100px;\
    margin-top: 50px;\
    border: 2px solid #000;\
    background-color: #F2F5F6;\
    background-image: url(alert.png);\
    background-repeat: no-repeat;\
    background-position: 20px 30px;\
  }\
\
  #modalContainer > #alertBox {\
    position: fixed;\
  }\
\
  #alertBox h1 {\
    margin: 0;\
    font: bold 0.9em verdana,arial;\
    background-color: #78919B;\
    color: #FFF;\
    border-bottom: 1px solid #000;\
    padding: 2px 0 2px 5px;\
  }\
\
  #alertBox p {\
    font-family: verdana,arial;\
    padding: 10px;\
    margin: 10px;\
    height: auto;\
  }\
\
  #alertBox textarea {\
    font-family: monospace,courier new,verdana,arial;\
    font-size: x-small;\
    margin: 15px;\
    margin-top: 0px;\
    height: auto;\
    width: 85%;\
  }\
\
  #alertBox #closeBtn {\
    display: block;\
    position: relative;\
    margin: 15px auto;\
    padding: 3px;\
    border: 2px solid #000;\
    width: 70px;\
    font: 0.7em verdana,arial;\
    text-transform: uppercase;\
    text-align: center;\
    color: #FFF;\
    background-color: #78919B;\
    text-decoration: none;\
  }\
";



// over-ride the alert method only if this a newer browser.
// Older browser will see standard alerts
// if(document.getElementById) {
  // window.alert = function(txt) {
    // createExportDialog(txt);
  // }
// }

function createExportDialog(txt,exportText,ALERT_TITLE,ALERT_BUTTON_TEXT,exportText_reversed,event) {
  var textareaContents = exportText;
  if(event.ctrlKey && event.altKey && exportText_reversed) { var textareaContents = exportText_reversed; }
  
  createCustomAlert(txt,textareaContents,ALERT_TITLE,ALERT_BUTTON_TEXT);
}

function createCustomAlert(txt,textareaContents,ALERT_TITLE,ALERT_BUTTON_TEXT) {
// constants to define the title of the alert and button text.
  if(!txt) { var txt = ''; }
  if(!textareaContents) { var textareaContents = ''; }
  if(!ALERT_TITLE) { var ALERT_TITLE = "Oops!"; }
  if(!ALERT_BUTTON_TEXT) { var ALERT_BUTTON_TEXT = "Ok"; }
  
  // shortcut reference to the document object
  var d = document;

  // if the modalContainer object already exists in the DOM, bail out.
  if(d.getElementById("modalContainer")) return;

  // create the modalContainer div as a child of the BODY element
  var mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
  mObj.id = "modalContainer";
   // make sure its as tall as it needs to be to overlay all the content on the page
  mObj.style.height = document.documentElement.scrollHeight + "px";

  // create the DIV that will be the alert 
  var alertObj = mObj.appendChild(d.createElement("div"));
  alertObj.id = "alertBox";
  
  
  var newDialogStyle = alertObj.appendChild(d.createElement('style'));
    newDialogStyle.setAttribute('type','text/css');
    newDialogStyle.innerHTML = newDialog_Style;
    
    
  // MSIE doesnt treat position:fixed correctly, so this compensates for positioning the alert
  if(d.all && !window.opera) alertObj.style.top = document.documentElement.scrollTop + "px";
  
  // center the alert box
  alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth)/2 + "px";

  // create an H1 element as the title bar
  var h1 = alertObj.appendChild(d.createElement("h1"));
  h1.appendChild(d.createTextNode(ALERT_TITLE));

  if(txt != '')
  {
    // create a paragraph element to contain the txt argument
    var msg = alertObj.appendChild(d.createElement("p"));
    msg.innerHTML = txt;
  }
  
  if(textareaContents != '')
  {
    // create a textarea
    
    var textarea = alertObj.appendChild(d.createElement("center")).appendChild(d.createElement("textarea"));
    textarea.value = textareaContents;
    
    var maxHeight = 300;

    var adjustedHeight = textarea.clientHeight;
    if ( !maxHeight || maxHeight > adjustedHeight )
    {
      adjustedHeight = Math.max(textarea.scrollHeight, adjustedHeight);
      if ( maxHeight ) {
        adjustedHeight = Math.min(maxHeight, adjustedHeight);
      }
      if ( adjustedHeight > textarea.clientHeight ) {
        textarea.style.height = adjustedHeight + "px";
      }
    }

  }
  
  // create an anchor element to use as the confirmation button.
  var btn = alertObj.appendChild(d.createElement("a"));
  btn.id = "closeBtn";
  btn.appendChild(d.createTextNode(ALERT_BUTTON_TEXT));
  btn.href = "#";
  // set up the onclick event to remove the alert when the anchor is clicked
  btn.addEventListener('click', function() { removeCustomAlert(); }, false);
  
}

// removes the custom alert from the DOM
function removeCustomAlert() {
  document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
}






var loggingLevel = [0];
// Log Type::
// x = debugging;
// 0 = No Logging;
// 1 = Log Everything;
// 2 = Function Calls;
// 3 = CurrentPage Reasoning;
// 4 = CurrentPage outcome;
// 5 = Account stats;
// 6 = Graph details;
// 7 = Referral details;
// 8 = Manipulating preferences;
// 9 = NumDaysSince ;
// 10 = graphProperties();
// 11 = neobuxString();
// 12 = graphProperties() && referral details --> detailed

  var today = new function() {};
  var yesterday = new function() {};
  var recent = new function() {};

  var testing = false;


function customLogger(logMessage,logType)
{
  
  if(typeof GM_log == 'undefined') { function GM_log(message) { alert(message); }; }
  
  if(loggingLevel.indexOf(0) >= 0)
  {
    var override_disableLogging = true; 
  }
  else if(loggingLevel.indexOf(1) >= 0) 
  {
    var override_enableLogging = true; 
  }
  else
  {  
    for (var i = 0; i < loggingLevel.length; i++)
    {
     if(logType.toString().indexOf(loggingLevel[i]) >= 0)
      {
        var showMessage = true;
      }
    }
  }
  
  // GM_log('override_disableLogging = '+override_disableLogging+'\n'+
  // 'override_enableLogging = '+override_enableLogging+'\n'+
  // 'showMessage = '+showMessage);
  
  if((showMessage && !override_disableLogging) || override_enableLogging)
  {
    GM_log('Log Message [type: '+logType+']: \n'+logMessage);
  }
}

//DEFINE Language Strings used by Neobux ::
var neobuxLangStrings = {
// Language strings for the actual Neobux website 
// -> To allow the script to run both in English and Portugese
  "EN" : {
    'noClicks': 'No clicks',
    'today': 'Today',
    'yesterday': 'Yesterday',
    'REFERRALS': 'REFERRALS',
  },

  "PT" : {
    'noClicks': 'Sem cliques',
    'today': 'Hoje',
    'yesterday': 'Ontem',
    'REFERRALS': 'REFERIDOS',
  }
}

//DEFINE Language Strings used by the Script ::
var scriptLangStrings = {
  // Language Strings used by the script
  // List of country codes: http://www.iso.org/iso/english_country_names_and_code_elements

  "EN" : {
    //English = EN
    // REFERRAL STATISTICS PAGE
    'totalClickAvg': 'Total Click Avg.',
    'lastdaysClickAvg': 'Click Avg.',
    'totalClicks': 'Total Clicks',
    'clickedToday': 'Clicked Today',
    'clickedYday': 'Clicked Yesterday',
    'others': 'Others',
    'dailyNetIncome': 'Daily Net Income',
    'avgIncome': 'Avg. Income',
    'avgExpenses': 'Avg. Expenses',
    'avgTransfers': 'Avg. Transfers.',
    // STATISTICS SUMMARY (SIDEBAR)
    'statsSum': 'Statistics Summary',
    'today': 'Today',
    'yesterday': 'Yesterday',
    'rented': 'Rented',
    'direct': 'Direct',
    'clicks': 'Clicks',
    'avg': 'avg',
    'avgs': 'avgs',
    'average': 'Average',
    'raverage': 'R.Average', // 'Real Average'
    'averages': 'Averages',
    'expenses': 'Expenses',
    'Recycle': 'Recycle',
    'autopay': 'Autopay',
    'renew': 'Renew',
    'net': 'Net',
    'projectedNet': 'Projected Net',
    'last': 'Last',
    'totals': 'Totals',
    'Days': 'Days',
    'recycled': 'Recycled',
    'autopaid': 'Autopaid',
    'updateScript': 'Update Script',
    'refferalsToBeRenewed': 'Referrals to be Renewed',
    'recycledLast': 'Recycled in Last',
    'autopaidLast': 'Autopaid in Last',
    'totalReferrals': 'Total Referrals:',
    'income': 'Income',
    'stats': 'Stats',
    'summary': 'Summary',
    'projectedIncome': 'Projected Income',
    'zeroClickers': 'Zero-Clickers',
    // FLAGS
    'W': 'W', // White Flag
    'R': 'R', // Red Flag
    'O': 'O', // Orange Flag
    'Y': 'Y', // Yellow Flag
    'G': 'G', // Green Flag
    // REFERRAL PROFIT POPUP
    'referral': 'Referral',
    'expenses': 'Expenses',
    'goldenFee': 'Golden fee',
    'goldenPackFee': 'Golden-Pack fee',
    'totalExpenses': 'Total Expenses',
    'perRefPerDay': 'per ref per day',
    'minimumAverage': 'Minimum average',
    'toBreakEven': 'to break even',
    'grossIn': 'Gross In',
    'grossOut': 'Gross Out',
    'currentProfit': 'Current profit',
    'incl': 'incl', // 'Including'
    'recycle': 'recycle',
    'netProfit': 'Net Profit',
    'daysToPayForOwnRecycle': 'Days to pay for own recycle',
    'day': 'day',
    // UPDATES
    'newUpdateFoundFor': 'A new update has found for:',
    'updateDesc': 'update note',
    'updateNow': 'Update Now',
    'remindMeLater': 'Remind me Later',
    'dismiss': 'Dismiss',
    'forUpdates': 'for updates',
    'for': 'for',
    'enableUpdates': '%s: Enable updates',
    'disableUpdates': 'Disable',
    'updates': 'updates',
    'noUpdatesAvailableFor ': 'No updates available for %s',
    'autoUpdates': 'Automatic update',
    'newVersionAvailable': 'A new version of the %s user script is available',
    'currentVersion': 'Current version: %s',
    'availableVersion': 'Available version: %s',
    'notesAboutTheAvailableVersion': 'Notes about the available version:\n%s',
    'doYouWishToUpdateTo': 'Do you wish to update to v%s?',
    'doYouWishToTurnOffAutoUpdates': 'Do you want to turn off auto updating for this script?',
    'autoUpdatesCanBeReenabled': 'Automatic updates can be re-enabled for this script from the User Script Commands submenu.',
    // MENUS
    'setAVGDays': 'Set Days value for Average Interval',
    'avgDaysMsg': 'Please enter days value for Averages.',
    'showSTD': 'Show Standard Deviation',
    'on': 'On',
    'off': 'Off',
    'error': 'Error',
    'days': 'days',
    'editUpdateFrequency': 'Edit Update Frequency',
    'checkForUpdates': '%s: Check for updates',
  }
}


//DEFINE Classes used by the Script ::
var currentPage = new function ()
{
// Information about the page currently being viewed:

  this.URL = document.location.href;
  this.name = getCurrentPage('location');
  this.language = getCurrentPage('language');
  customLogger('currentPage:: \n\n'+
  'this.URL = '+this.URL+'\n'+
  'this.name = '+this.name+'\n'+
  'this.language = '+this.language, 4);
};
  customLogger('currentPage:: \n\n'+
  'currentPage.URL = '+currentPage.URL+'\n'+
  'currentPage.name = '+currentPage.name+'\n'+
  'currentPage.language = '+currentPage.language, 4);

// Store how large the graphs are expected to be
// Recent changes to graphs mean that those that show
// click data are only 10-days long
var graphSettings = new function(getSet)
{
  if(!getSet) { var getSet = 'get'; }
  this.refGraphLength = manipulatePrefs('refGraphLength',10,getSet);
  this.regularGraphLength = manipulatePrefs('regularGraphLength',15,getSet);
}


// Information about the users account
var myAccount = new function ()
{
  this.name = document.getElementById('t_conta').textContent;
  this.rentedRefCount = getNumberOfRefs('Rented');
  this.directRefCount = getNumberOfRefs('Direct');
  this.getTotalRefCount = this.rentedRefCount   + this.directRefCount  ;
  this.accountType = getAccountType();
  this.autopayLimit = getAutoPayLimit(this.accountType);
  this.autopayCost = getAutoPayCost(this.accountType);
  this.recycleCost = getRecycleCost(this.accountType);
  this.renewalFee = function (renewalPeriod) { return getRenewalFees(renewalPeriod); }
  this.goldenPackCost = getGoldenPackCost(this.accountType);
  
  if(this.accountType == 6) { this.ownClickValue = 0.02; }
                       else { this.ownClickValue = 0.01; }
  if(this.accountType == 0) { this.referralClickValue = 0.005; }
                       else { this.referralClickValue = 0.01; }
  
  if(testing) { this.accountType = 6; } // For testing purposes - must be removed 
  
  customLogger('myAccount:: \n\n'+
  'this.name = '+this.name+'\n'+
  'this.accountType = '+this.accountType+'\n'+
  'this.rentedRefCount = '+this.rentedRefCount  +'\n'+
  'this.directRefCount = '+this.directRefCount  +'\n'+
  'this.getTotalRefCount = '+this.getTotalRefCount+'\n'+
  'this.autopayLimit = '+this.autopayLimit+'\n'+
  'this.autopayCost = '+this.autopayCost+'\n'+
  'this.ownClickValue = '+this.ownClickValue+'\n'+
  'this.referralClickValue = '+this.referralClickValue,5);

  // This will later be used to get & store a local copy of user statistics.
  // this.avgSpentOnRecycles = the average amount spent on recycling each day
  this.stats = new function(getSet)
  {
    if(!getSet) { var getSet = 'get'; }
    // TODO: Fetch this value automatically
    this.avgSpentOnRecycles = 2.608;
  }

  // Get user preferences
  this.preferences = new function (getSet)
  {
    if(!getSet) { var getSet = 'get'; }
    
    // Script Settings
    this.scriptLanguage = manipulatePrefs('scriptLanguage','EN',getSet);
    this.updateFrequency = manipulatePrefs("updateFrequency",120,getSet);
    
    // Flags
    this.textifyFlag = manipulatePrefs('textifyFlag',true,getSet);
    this.textifyFlag_prexfix = manipulatePrefs('textifyFlag_prexfix',' | ',getSet);
    
    // Account Settings
    this.renewalPeriod = manipulatePrefs('renewalPeriod',90,getSet); // 30days | 60days (equiv. of autopay) | 90days
    
    // Average column
    this.showExactAverage = manipulatePrefs('showExactAverage',true,getSet);
    this.exactAverageSeperator = manipulatePrefs('exactAverageSeperator',' | ',getSet);
    this.replaceWithExactAverage = manipulatePrefs('replaceWithExactAverage',false,getSet);
    
    // Last Click column:
    this.numeriseLastClick = manipulatePrefs('numeriseLastClick',true,getSet);
    this.fullerLastClickTimers = manipulatePrefs('fullerLastClickTimers',true,getSet);
    this.lastClickTimer_shortFormat = manipulatePrefs('lastClickTimer_shortFormat',false,getSet);
    this.replaceLastClick = manipulatePrefs('replaceLastClick',false,getSet);
    
    // Owned Since column:
    this.numeriseReferralSince = manipulatePrefs('numeriseReferralSince',true,getSet);
    this.fullerOwnedSinceTimers = manipulatePrefs('fullerOwnedSinceTimers',true,getSet);
    this.ownedSinceTimer_shortFormat = manipulatePrefs('ownedSinceTimer_shortFormat',true,getSet);
    this.replaceOwnedSince = manipulatePrefs('replaceOwnedSince',false,getSet);
    
    // Profit Column
    this.showProfitColumn = manipulatePrefs('showProfitColumn',true,getSet);
    this.includeRecycleCostInProfitColumn = manipulatePrefs('includeRecycleCostInProfitColumn',false,getSet);
    this.profit_Prefix = manipulatePrefs('profit_Prefix','$',getSet);





    
    // Time Periods for 'smaller' 10day graphs
    this.timePeriod_s1 = manipulatePrefs('timePeriod_s1',5,getSet);
    this.timePeriod_s2 = manipulatePrefs('timePeriod_s2',7,getSet);
    this.timePeriod_s3 = manipulatePrefs('timePeriod_s3',graphSettings.refGraphLength,getSet)||"ASDASD";

    //Time Periods for larger 15day graphs
    this.timePeriod_1 = manipulatePrefs('timePeriod_1',5,getSet);
    this.timePeriod_2 = manipulatePrefs('timePeriod_2',10,getSet);
    this.timePeriod_3 = manipulatePrefs('timePeriod_3',graphSettings.regularGraphLength,getSet);

    //Time Period for 'recent' section of the Referral statistics sidebar
    this.timePeriod_recent = manipulatePrefs('timePeriod_recent',7,getSet);
  };

  // Get Preferences for Ultimate-Only Features
  this.ultimatePreferences = new function (getSet)
  {
    if(!getSet) { var getSet = 'get'; }
    

    this.showRecentAverage = manipulatePrefs('showRecentAverage',true,getSet);
    this.minigraphAvgInterval = manipulatePrefs('minigraphAvgInterval',5,getSet);

    // Ratio of Standard deviation and Average (RSA) Column
    this.showRSAColumn = manipulatePrefs('showRSAColumn',true,getSet);
    this.SD_Prefix = manipulatePrefs('SD_Prefix','',getSet);
    
    // A7 Column
    this.showA7Column = manipulatePrefs('showA7Column',true,getSet);
    this.A7_Prefix = manipulatePrefs('SD_Prefix','',getSet);
    
    // A10 Column
    this.showA10Column = manipulatePrefs('showA10Column',true,getSet);
    this.A10_Prefix = manipulatePrefs('SD_Prefix','',getSet);
    
    // Standard Deviation (SDEV / SD) Column
    this.showSDEVColumn = manipulatePrefs('showSDEVColumn',true,getSet);
    this.SDEV_Prefix = manipulatePrefs('SD_Prefix','',getSet);

  };

};

// mathematical function.. calc num^2
Math.square = function(num) 
{
  return num*num;
};

// Object that will hold the data about the current graph
function graphProperties(values,totals)
{ 
  this.value = new function() { 
    var i = 1; var tmp = [0]; 
    do{ 
      tmp[i] = values[i-1]; 
      if(isNaN(tmp[i]) || !isFinite(tmp[i])) 
      {
        tmp[i] = -1; 
      }
    } while(i++ < values.length); 
    return tmp; 
  };
  
  this.totals = new function() {
    var i = 1; var tmp = [0] 
    do{ 
      tmp[i] = tmp[i-1] + parseFloat(values[i-1]);
      if(isNaN(tmp[i]) || !isFinite(tmp[i])) 
      {
        tmp[i] = -1; 
      }
    } while(i++ < values.length); 
    return tmp;
  };
  
  this.today = values[0];
  this.yesterday = values[1];
  this.recent = totals[7];
  
  this.mean = new function() { 
    var i = 1; var tmp = [0]; 
    do{
      tmp[i] = totals[i-1] / (i);
      
      if(isNaN(tmp[i]) || !isFinite(tmp[i])) 
      {
        tmp[i] = -1; 
      }
      
      customLogger('i = '+i+'\n'+
      'totals[i] = '+totals[i]+'\n'+
      'totals[i-1] = '+totals[i-1]+'\n'+
      'totals[i-2] = '+totals[i-2]+'\n'+
      'tmp[i] = '+tmp[i],12);
      
    } while(i++ < totals.length); 
    return tmp;
  };
  
  this.variance = new Stats(values).variance;
  this.sdev = new Stats(values).sdev;

  
    customLogger('values = '+values+'\n'+
  'totals = '+totals+'\n'+
  'this.today = '+this.today+'\n'+
  'this.yesterday = '+this.yesterday+'\n'+
  'this.value = '+this.value+'\n'+
  'this.totals = '+this.totals+'\n'+
  'this.mean = '+this.mean+'\n'+
  'this.variance = '+this.variance+'\n'+
  'this.sdev = '+this.sdev+'\n'+
  'totals.length = '+totals.length+'\n'+
  'this.value.length = '+this.value.length,[7,10,12]);
}




var MSPD = 86400000; //MilliSeconds Per Day
var Today = new Date();
var Yesterday = new Date();
Yesterday.setDate(Today.getDate() - 1);
        
var startTime_atSWITCH = new Date().getTime();
var timer_getDaysTilPaidOwnRecycle = new Array();

var img_yellowBackground = 'http://img200.imageshack.us/img200/5423/yellowbg.png';
var img_redBackground = 'http://img268.imageshack.us/img268/1234/redbg.png';
var img_greenBackground = 'http://img51.imageshack.us/img51/3718/greenbgv.png';
var img_grayBackground = 'http://img199.imageshack.us/img199/9953/graybg.png';
var img_statSidebarBackground = 'http://img24.imageshack.us/img24/326/statbgtaller.png';

// data: URLs for background images - prevents needing to be reliant upon imageshack 
// I'm unsure of speed benefits - fewer HTTP requests vs larger .js and lack of cacheing
var img_yellowBackground = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAATCAYAAAC6PNwaAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kFDxMvJrcX2NgAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAQElEQVQI12P882z5fwYGBgaWv9/uMkAYf35AGb9/Qhh/4CJ/fsKkfqBLEaX4J2ErYIr///8NYfz795+BgYGBAQCdpjiwzLjePgAAAABJRU5ErkJggg==';
var img_redBackground = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAATCAYAAABRC2cZAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kFDxQaKhnfQMAAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAL0lEQVQI12P4f2zff6Z/L58xMP399YuB6e+vn3AWjPsHlwROdQx//jAw/fv/nwEAnxA3fzsYxb4AAAAASUVORK5CYII=';
var img_greenBackground = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAATCAYAAABRC2cZAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kFDxMwFyuT1nwAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAPUlEQVQI12O48mzhf6Z3X+8wMP3+/YOB6fefH8isX39+MjD9/v0dKgbhoin5jRD7DlXy998vBqb///4zAACOjzgn5DtdSQAAAABJRU5ErkJggg==';
var img_grayBackground = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAdCAYAAABrAQZpAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kFDxQUDrtfiZ8AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAUElEQVQI10WMIQ6AQBADJ/0yFslfCY5wAsS2i7mAqZmZsqxba9wPAubEQeWgqkJxI8eoKig2cjLBn+3HgfqT20HdQS6jTmZGg5Ka8n8wrpMX+VxBlx4CdKwAAAAASUVORK5CYII=';
var img_statSidebarBackground_smaller = 'data:image/png;base64,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';
var img_statSidebarBackground = 'data:image/png;base64,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';


// Make spaces etc appear properly without needing to use &nbsp;
document.body.style.whiteSpace = 'pre-wrap';


//BEGIN Script Content::

switch(currentPage.name)
{
  case 'rentedRefListing':
    if(myAccount.rentedRefCount > 0)
    {
      referralPage();
    }
    break;
  case 'directRefListing':
    if(myAccount.directRefCount > 0)
    {
      referralPage();
    }
    break;
  case 'accSummary':
    accSummaryPage();
    break;
  case 'refStats':
    refStatsPage();
    break;
}






//END Script Content



function refStatsPage()
{
  // Grab the embeds that have a height='140'
  // these embeds are the 'big' graphs (NOT the projected average graphs)
  var xpathEmbeds = "//embed[@height='140']";
  var xpathResults_embeds = document.evaluate(xpathEmbeds,
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null );

  var embeds;
  var chartXML;


  customLogger('xpathResults_embeds.snapshotLength = '+xpathResults_embeds.snapshotLength,6);
  for (var graphNumber = 0, length = xpathResults_embeds.snapshotLength; graphNumber < length; graphNumber++)
  {
    embed = xpathResults_embeds.snapshotItem(graphNumber);
    chartXML = embed.getAttribute('flashvars').split('dataXML=')[1].replace("caption='' ","");
    
    // Process the chartXML that has just been extracted
    processGraphData(graphNumber,chartXML,embed);
    // Insert details about each graph
    insertGraphAverages(embed,graphNumber);
  }
  
  // Insert the 'sidebar statistics' area
  insertSidebar();
  
  
     recent.IN = new Array();
     recent.OUT = new Array();
     recent.net = new Array();
    for (var i = 1; i < rentedClicks.totals.length; i++)
    {
      recent.IN[i] = myAccount.referralClickValue * (rentedClicks.totals[i] + directClicks.totals[i]);
      recent.OUT[i] = recycleCost.totals[i] + autopayCost.totals[i] + renewalCost.totals[i];
      recent.net[i] = (recent.IN[i] - recent.OUT[i]).toFixed(3);
    }


  // Insert summary data at the very bottom of the page
  var masterTable = document.getElementById(embed.id+"Div").parentNode.parentNode.parentNode;
  var newRow = document.createElement("TR");
    newRow.style.height = "15px";
  var newCol = document.createElement("TD");
    newCol.colSpan = 2;
    newCol.style.backgroundColor = "#AAAAAA";// "#c1f5c1";
    newCol.style.fontFamily = "verdana";
    newCol.style.fontWeight = "bold";
    newCol.style.height = "20px";
    newCol.style.fontSize = "9px";
    newCol.style.border = "1px solid #aaaaaa";
    newCol.style.backgroundImage = "url('" + img_grayBackground + "')";
    newCol.style.width = "170px";
    newCol.style.textAlign = "left";
    newCol.style.verticalAlign = "middle";
    newRow.appendChild(newCol);
  
  var spacer = '<small><small>  |  </small></small>';
  newCol.innerHTML = "<font style='font-size:9px;color:#ffffff'> | "+localString('dailyNetIncome')+" :"+
  " ("+myAccount.preferences.timePeriod_s3+") $"+parseFloat(recent.net[myAccount.preferences.timePeriod_s3]).toFixed(3)+spacer+
  " ("+myAccount.preferences.timePeriod_s2+") $"+parseFloat(recent.net[myAccount.preferences.timePeriod_s2]).toFixed(3)+spacer+
  " ("+myAccount.preferences.timePeriod_s1+") $"+parseFloat(recent.net[myAccount.preferences.timePeriod_s1]).toFixed(3)+spacer+
  " (3) $"+parseFloat(recent.net[3]).toFixed(3)+spacer+
  " (2) $"+parseFloat(recent.net[2]).toFixed(3)+spacer+
  " (1) $"+parseFloat(recent.net[1]).toFixed(3)+
  "</font>";

  // Insert the row that contains the account summary data 
  masterTable.appendChild(newRow);
  
}

function processGraphData(graphNumber,chartXML,embed)
{
// Function that extracts the data from each graph
  customLogger('graphNumber = '+graphNumber, 6);
  
  var doc = new DOMParser().parseFromString(chartXML, "text/xml");
  var docRoot = doc.childNodes[0];
  var sets = docRoot.getElementsByTagName("set");

  var stats = new Array();
  var dates = new Array();
  var values = new Array();
  var totals = new Array();

  // Extract the dates & values from the chart data
  for (var j = 0; j < sets.length; j++)
  {
    dates[j] = sets[j].getAttribute('label');
    values[j] = parseFloat(sets[j].getAttribute("value"));
  }

  // Reverse the order of the data so that the most recent data is first
  // (unless the graph being processed is the scheduled rental payments graph)
  if(graphNumber !== 6)
  {
    dates.reverse();
    values.reverse();
  }
  
  
  // Calculate running totals for the data in the graph
  var totals = new Array();
  for (var i = 0, length = values.length; i < length; i++)
  {
    if(i == 0) { totals[i] = values[i] }
    else { totals[i] = totals[i-1] + values[i]; }
  }
  
  
  
  // Attach the graphProperties to the relevant variable name
  if(currentPage.name == 'refStats')
  {
  // Variable names for the Referral Statistics page
    switch(graphNumber)
    {
      case 0:
        directClicks = new graphProperties(values,totals);
        
        var projectedDirect = document.evaluate('//embed[@height="80"]',
          document,
          null,
          XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
          null).snapshotItem(0);

        var regex = /pointer value='([0-9]\.[0-9][0-9])/;
        
        directClicks.today_projected = parseFloat(regex.exec(projectedDirect.parentNode.innerHTML)[1]);
        customLogger('directClicks.today_projected = '+directClicks.today_projected,5);
        break;
      case 1:
        rentedClicks = new graphProperties(values,totals);
        
        var projectedDirect = document.evaluate('//embed[@height="80"]',
          document,
          null,
          XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
          null).snapshotItem(1);

        var regex = /pointer value='([0-9]\.[0-9][0-9])/;
        
        rentedClicks.today_projected = parseFloat(regex.exec(projectedDirect.parentNode.innerHTML)[1]);
        customLogger('rentedClicks.today_projected = '+rentedClicks.today_projected,5);
        break;
      case 2:
        recycleCost = new graphProperties(values,totals);
        break;
      case 3:
        autopayCost = new graphProperties(values,totals);
        break;
      case 4:
        renewalCost = new graphProperties(values,totals);
        break;
      case 5:
        transfersToRentalBalance = new graphProperties(values,totals);
        break;
      case 6:
        rentalsDue = new graphProperties(values,totals);
        break;
    }
  }
  else if(currentPage.name == 'accSummary')
  {
  // variable / graph names for the Account Summary page
    switch(graphNumber)
    {
      case 0:
        ownClicks = new graphProperties(values,totals);
        break;
      case 1:
        ownClicks_Local = new graphProperties(values,totals);
        break;
    }
  }
}


function insertSidebar()
{
// Function which inserts the 'Statistics Sidebar' to the side of the page

  // Location to insert the sidebar
  var xpath = '//h1[contains(.,"REFERRALS")]';
  var xpathResult = document.evaluate(xpath,
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null ).snapshotItem(0);
    
  // var locationToInsert = xpathResult.parentNode.parentNode.parentNode.parentNode.parentNode.childNode[0]; // left hand side // NOT WORKING YET
  // var locationToInsert = xpathResult.parentNode.parentNode.parentNode.parentNode.parentNode; // right hand side
  var locationToInsert = xpathResult.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode; // right hand side

  // // customLogger('xpathResult.snapshotLength='+xpathResult.snapshotLength,'x');
  // customLogger('xpathResult.parentNode = '+xpathResult.parentNode,'x');
 
  
    today.income = myAccount.referralClickValue * (rentedClicks.today + directClicks.today);
    today.projectedRentedClicks = rentedClicks.today_projected * myAccount.rentedRefCount;
    today.projectedDirectClicks = directClicks.today_projected * myAccount.directRefCount;
    today.projectedIncome = myAccount.referralClickValue * (today.projectedRentedClicks + today.projectedDirectClicks);
    today.expenses = recycleCost.today + autopayCost.today + renewalCost.today;
    today.netIncome = (today.income - today.expenses).toFixed(3);

    yesterday.income = myAccount.referralClickValue * (rentedClicks.yesterday + directClicks.yesterday);
    yesterday.expenses = recycleCost.yesterday + autopayCost.yesterday + renewalCost.yesterday;
    yesterday.netIncome = (yesterday.income - yesterday.expenses).toFixed(3);

    recent.income = new Array();
    recent.expenses = new Array();
    recent.netIncome = new Array();
    
    customLogger('rentedClicks.totals.length = '+rentedClicks.totals.length,5);
    
    for (var i = 0; i < rentedClicks.totals.length; i++)
    {
      recent.income[i] = myAccount.referralClickValue * (rentedClicks.totals[i] + directClicks.totals[i]);
      recent.expenses[i] = recycleCost.totals[i] + autopayCost.totals[i] + renewalCost.totals[i];
      recent.netIncome[i] = (recent.income[i] - recent.expenses[i]).toFixed(3);
    }

    today.directAverage = (directClicks.today / myAccount.directRefCount).toFixed(3);
    yesterday.directAverage = (directClicks.yesterday / myAccount.directRefCount).toFixed(3);
    recent.directAverage = (directClicks.recent / myAccount.directRefCount).toFixed(3);

    if(!myAccount.directRefCount > 0)
    {
      today.directAverage = 'N/A';
      yesterday.directAverage = 'N/A';
      recent.directAverage = 'N/A';
    }

    today.rentedAverage = (rentedClicks.today / myAccount.rentedRefCount).toFixed(3);
    yesterday.rentedAverage = (rentedClicks.yesterday / myAccount.rentedRefCount).toFixed(3);
    recent.rentedAverage = ((rentedClicks.recent / myAccount.preferences.timePeriod_recent) / myAccount.rentedRefCount).toFixed(3);
    
    today.rentedRAverage = ((rentedClicks.today - (recycleCost.today*100)) / myAccount.rentedRefCount).toFixed(3);
    yesterday.rentedRAverage = ((rentedClicks.yesterday - (recycleCost.yesterday*100)) / myAccount.rentedRefCount).toFixed(3);
    recent.rentedRAverage = (((rentedClicks.recent - (recycleCost.recent*100)) / myAccount.preferences.timePeriod_recent) / myAccount.rentedRefCount).toFixed(3);

    if(!myAccount.rentedRefCount > 0)
    {
      today.rentedAverage = 'N/A';
      today.rentedRAverage = 'N/A';
      yesterday.rentedAverage = 'N/A';
      yesterday.rentedRAverage = 'N/A';
      recent.rentedAverage = 'N/A';
      recent.rentedRAverage = 'N/A';
    }

    today.totalRAverage = (((rentedClicks.today + directClicks.today) - (recycleCost.today*100)) / myAccount.getTotalRefCount).toFixed(3);
    yesterday.totalRAverage = (((rentedClicks.yesterday + directClicks.yesterday) - (recycleCost.yesterday*100)) / myAccount.getTotalRefCount).toFixed(3);
    recent.totalRAverage = (((rentedClicks.recent + directClicks.recent) - (recycleCost.recent*100)) / myAccount.getTotalRefCount).toFixed(3);
    
    if(myAccount.directRefCount == 0 && myAccount.rentedRefCount == 0)
    {
      today.totalRAverage = 'N/A <small>(zero refs)</small>';
      yesterday.totalRAverage = 'N/A <small>(zero refs)</small>';
      recent.totalRAverage = 'N/A <small>(zero refs)</small>';
    }
    
    today.income = (rentedClicks.today + directClicks.today) * myAccount.referralClickValue;
    today.expenses = recycleCost.today + autopayCost.today + renewalCost.today;
    
    yesterday.income = (rentedClicks.yesterday + directClicks.yesterday) * myAccount.referralClickValue;
    yesterday.expenses = recycleCost.yesterday + autopayCost.yesterday + renewalCost.yesterday;
    
    recent.income = (rentedClicks.recent + directClicks.recent) * myAccount.referralClickValue;
    recent.expenses = recycleCost.recent + autopayCost.recent + renewalCost.recent;

    var infoLabel = document.createElement("TD");
      infoLabel.style.verticalAlign = "top";
      infoLabel.style.paddingTop = "3px";
      infoLabel.style.paddingLeft = "8px";
      infoLabel.style.height = "535px";
      infoLabel.style.width = "182px";
      infoLabel.style.backgroundImage = "url('" + img_statSidebarBackground + "')";
    // if(myAccount.getTotalRefCount >=  1000) { infoLabel.style.width = "182px"; infoLabel.style.backgroundImage = "url('http://img223.imageshack.us/img223/2784/statbg.png')"; }
                                      // else { infoLabel.style.width = "170px"; infoLabel.style.backgroundImage = "url('http://img267.imageshack.us/img267/2784/statbg.png')"; }
      infoLabel.style.backgroundRepeat = "no-repeat";
      infoLabel.style.marginLeft = "40px";
    
    var sidebarStyle = document.createElement('style');
    sidebarStyle.innerHTML = "\
      span.sidebarContent\
      {\
        font-family: Verdana, Arial, Helvetica, sans-serif;\
        font-size: x-small !important;\
      }\
      div.sidebarDetails\
      {\
        font-size: 95%;\
        margin-left: 5px;\
      }\
\
      h4\
      {\
        color: #444;\
        padding-left: 40px;\
        margin-top: 10px;\
        margin-bottom:2px\
      }\
      h5\
      {\
        margin-top: 7px;\
        margin-bottom:2px\
      }\
      h6\
      {\
        font-size: xx-small !important;\
        margin-top: 2px;\
        margin-bottom:2px\
      }\
      .bold\
      {\
        font-weight: bold;\
      }\
      .grey\
      {\
        color: #aaa;\
      }\
      ";
      
    infoLabel.innerHTML = (""+
      "<span class='sidebarContent'>"+
      "<span class='sidebarHeader'>"+
      "<h4 class='bold'>"+localString('statsSum')+"<br>"+
      localString('totalReferrals')+" "+myAccount.getTotalRefCount+"</h4>"+
      "</span>"+

      "<h5 class='bold'><span class='grey'>[ "+localString('today')+" ]</span> - "+localString('net')+" : $"+today.netIncome+"</h5>"+
      "<hr width= '155px' height='1px' color='#cccccc'/>"+

        "<h6> - "+localString('income')+"</h6>"+
        "<div class='sidebarDetails'>"+
          "- "+localString('rented')+" : "+rentedClicks.today+" / $"+(rentedClicks.today*myAccount.referralClickValue).toFixed(3)+"<br>"+
          "- "+localString('direct')+" : "+directClicks.today+" / $"+(directClicks.today*myAccount.referralClickValue).toFixed(3)+"<br>"+
        "<i>"+localString('projectedIncome')+":</i><br>"+
          "- "+localString('rented')+" : "+today.projectedRentedClicks.toFixed(1)+" / $"+(today.projectedRentedClicks * myAccount.referralClickValue).toFixed(3)+"<br>"+
          "- "+localString('direct')+" : "+today.projectedDirectClicks.toFixed(1)+" / $"+(today.projectedDirectClicks * myAccount.referralClickValue).toFixed(3)+"<br>"+
        "</div>"+
        "<h6> - "+localString('expenses')+"</h6>"+
        "<div class='sidebarDetails'>"+
          "- "+localString('Recycle')+" : $"+recycleCost.today.toFixed(2)+"<br>"+
          "- "+localString('autopay')+" : $"+autopayCost.today.toFixed(2)+"<br>"+
          "- "+localString('renew')+" : $"+renewalCost.today.toFixed(2)+"<br>"+
        "</div>"+
        "<h6> - "+localString('stats')+"</h6>"+
        "<div class='sidebarDetails'>"+
          "- "+localString('rented')+" "+localString('avg')+" : "+today.rentedAverage+"<br>"+
          "- "+localString('direct')+" "+localString('avg')+" : "+today.directAverage+"<br>"+
          "- "+localString('raverage')+" : "+today.totalRAverage+"<br>"+
        "</div>"+
        "<h6> - "+localString('totals')+"</h6>"+
        "<div class='sidebarDetails'>"+
          "- "+localString('income')+" : $"+today.income.toFixed(3)+"<br>"+
          "- "+localString('expenses')+" : $"+(today.expenses).toFixed(3)+"<br>"+
          "- "+localString('net')+" : $"+(today.income - today.expenses).toFixed(3)+"<br>"+
          "- "+localString('projectedNet')+" : $"+(today.projectedIncome - today.expenses).toFixed(3)+"<br>"+
        "</div>"+
        
      "<h5 class='bold'><span class='grey'>[ "+localString('yesterday')+" ]</span> - "+localString('net')+" : $"+yesterday.netIncome+"</h5>"+
      "<hr width= '155px' height='1px' color='#cccccc'/>"+

        "<h6> - "+localString('income')+"</h6>"+
        "<div class='sidebarDetails'>"+
          "- "+localString('rented')+" : "+rentedClicks.yesterday+" / $"+(rentedClicks.yesterday*myAccount.referralClickValue).toFixed(3)+"<br>"+
          "- "+localString('direct')+" : "+directClicks.yesterday+" / $"+(directClicks.yesterday*myAccount.referralClickValue).toFixed(3)+"<br>"+
        "</div>"+
        "<h6> - "+localString('expenses')+"</h6>"+
        "<div class='sidebarDetails'>"+
          "- "+localString('Recycle')+" : $"+recycleCost.yesterday.toFixed(2) +"<br>"+
          "- "+localString('autopay')+" : $"+autopayCost.yesterday.toFixed(2) +"<br>"+
          "- "+localString('renew')+" : $"+renewalCost.yesterday.toFixed(2) +"<br>"+
        "</div>"+
        "<h6> - "+localString('stats')+"</h6>"+
        "<div class='sidebarDetails'>"+
          "- "+localString('rented')+" "+localString('avg')+" : "+yesterday.rentedAverage +"<br>"+
          "- "+localString('direct')+" "+localString('avg')+" : "+yesterday.directAverage +"<br>"+
          "- "+localString('raverage')+" : "+yesterday.totalRAverage +"<br>"+
        "</div>"+
        "<h6> - "+localString('totals')+"</h6>"+
        "<div class='sidebarDetails'>"+
          "- "+localString('income')+" : $"+yesterday.income.toFixed(3)+"<br>"+
          "- "+localString('expenses')+" : $"+(yesterday.expenses).toFixed(3)+"<br>"+
          "- "+localString('net')+" : $"+(yesterday.income - yesterday.expenses).toFixed(3)+"<br>"+
        "</div>"+
        
      "<h5 class='bold'><span class='grey'>["+localString('last')+" "+myAccount.preferences.timePeriod_recent+" "+localString('Days')+"]</span> - "+localString('net')+" : $"+recent.netIncome[myAccount.preferences.timePeriod_recent]+"</h5>"+
      "<hr width= '155px' height='1px' color='#cccccc'/>"+

        "<h6> - "+localString('income')+"</h6>"+
        "<div class='sidebarDetails'>"+
          "- "+localString('rented')+" : "+rentedClicks.recent+" / $"+(rentedClicks.recent*myAccount.referralClickValue).toFixed(3)+"<br>"+
          "- "+localString('direct')+" : "+directClicks.recent+" / $"+(directClicks.recent*myAccount.referralClickValue).toFixed(3)+"<br>"+
        "</div>"+
        "<h6> - "+localString('expenses')+"</h6>"+
        "<div class='sidebarDetails'>"+
          "- "+localString('Recycle')+" : $"+recycleCost.recent.toFixed(2) +"<br>"+
          "- "+localString('autopay')+" : $"+autopayCost.recent.toFixed(2) +"<br>"+
          "- "+localString('renew')+" : $"+renewalCost.recent.toFixed(2) +"<br>"+
        "</div>"+
        "<h6> - "+localString('stats')+"</h6>"+
        "<div class='sidebarDetails'>"+
          "- "+localString('rented')+" "+localString('avg')+" : "+recent.rentedAverage +"<br>"+
          "- "+localString('direct')+" "+localString('avg')+" : "+recent.directAverage +"<br>"+
          "- "+localString('raverage')+" : "+recent.totalRAverage +"<br>"+
        "</div>"+
        "<h6> - "+localString('totals')+"</h6>"+
        "<div class='sidebarDetails'>"+
          "- "+localString('income')+" : $"+recent.income.toFixed(3)+"<br>"+
          "- "+localString('expenses')+" : $"+recent.expenses.toFixed(3)+"<br>"+
          "- "+localString('net')+" : $"+(recent.income - recent.expenses).toFixed(3)+"<br>"+
        "</div>"+
      "</span>");

    
    infoLabel.appendChild(sidebarStyle);

  //// *** INSERT STATISTICS SUMMARY INTO PAGE *** ////
  locationToInsert.appendChild(infoLabel);

  //// enlarge the width of the page to accomodate the extra column and add a little padding to make it look nicer ////
  locationToInsert.parentNode.parentNode.removeAttribute('width');
  locationToInsert.parentNode.parentNode.setAttribute('cellspacing','5px');

}


function insertGraphAverages(embed,graphNumber)
{
// Function to insert the statistics below graphs
  var statDiv = document.getElementById(embed.id+"Div");
  var earnStr;
  
  var avgLabel = document.createElement("DIV");
    avgLabel.style.width = (parseInt(embed.width) - 2 - 3) + 'px';
    avgLabel.style.height = "14px";
    avgLabel.style.fontFamily = "verdana";
    avgLabel.style.fontWeight = "bold";
    avgLabel.style.fontSize = "9px";
    avgLabel.style.color = "#555555";
    avgLabel.style.verticalAlign = "middle";
    avgLabel.style.textAlign = "left";
    avgLabel.style.borderLeft = "1px solid #aaaaaa";
    avgLabel.style.borderRight = "1px solid #aaaaaa";
    avgLabel.style.borderBottom = "1px solid #aaaaaa";
    avgLabel.style.backgroundColor = "#ffdd00";
    avgLabel.style.backgroundImage = "url('" + img_yellowBackground + "')";
    avgLabel.style.whiteSpace = 'nowrap';
    avgLabel.style.paddingLeft = '3px';
    avgLabel.style.top = statDiv.style.height;
    statDiv.style.height = (parseInt(statDiv.style.height) + 20) + 'px';
    avgLabel.style.color = "#444444";
    avgLabel.innerHTML = ' ';

  var dailyEarnLabel = dailyEarnLabel = document.createElement("DIV");
    dailyEarnLabel.style.width = (parseInt(embed.width) - 2 - 3) + 'px';
    dailyEarnLabel.style.height = "14px";
    dailyEarnLabel.style.fontFamily = "verdana";
    dailyEarnLabel.style.fontWeight = "bold";
    dailyEarnLabel.style.fontSize = "9px";
    dailyEarnLabel.style.verticalAlign = "middle";
    dailyEarnLabel.style.textAlign = "left";
    dailyEarnLabel.style.borderLeft = "1px solid #aaaaaa";
    dailyEarnLabel.style.borderRight = "1px solid #aaaaaa";
    dailyEarnLabel.style.borderBottom = "1px solid #aaaaaa";
    dailyEarnLabel.style.backgroundColor = "#8899aa";    //"#7fac21";
    dailyEarnLabel.style.whiteSpace = 'nowrap';
    dailyEarnLabel.style.paddingLeft = '3px';
    dailyEarnLabel.style.top = statDiv.style.height;
    dailyEarnLabel.innerHTML = ' ';
    
    statDiv.style.height = (parseInt(statDiv.style.height)-(-20))+"px";
  
  var graphLabel = new Array();
  if(currentPage.name == 'refStats')
  {
  // Code to insert stats below graphs on the Referral Statistics page
    if(graphNumber == 0)
    {
    // Direct clicks 
      dailyEarnLabel.style.backgroundImage = "url('" + img_greenBackground + "')";
      dailyEarnLabel.style.color = "#444444";

      avgLabel.innerHTML = localString('averages')+" :"+
      " ("+myAccount.preferences.timePeriod_s3+") "+(directClicks.mean[myAccount.preferences.timePeriod_s3]).toFixed(3)+
      " ("+myAccount.preferences.timePeriod_s2+") "+(directClicks.mean[myAccount.preferences.timePeriod_s2]).toFixed(3)+
      " ("+myAccount.preferences.timePeriod_s1+") "+(directClicks.mean[myAccount.preferences.timePeriod_s1]).toFixed(3)+"";
      statDiv.appendChild(avgLabel);

      earnStr = " "+localString('avgIncome')+" :"+
      " ("+myAccount.preferences.timePeriod_s3+") $"+((directClicks.mean[myAccount.preferences.timePeriod_s3])*myAccount.referralClickValue).toFixed(3)+
      " ("+myAccount.preferences.timePeriod_s2+") $"+((directClicks.mean[myAccount.preferences.timePeriod_s2])*myAccount.referralClickValue).toFixed(3)+
      " ("+myAccount.preferences.timePeriod_s1+") $"+((directClicks.mean[myAccount.preferences.timePeriod_s1])*myAccount.referralClickValue).toFixed(3);
      
      graphLabel[graphNumber] = 'Direct Referral clicks credited';
      graphData = directClicks.value;
      
    }
    else if(graphNumber == 1)
    {
    // Rented clicks
      dailyEarnLabel.style.backgroundImage = "url('" + img_greenBackground + "')";
      dailyEarnLabel.style.color = "#444444";

      avgLabel.innerHTML = localString('averages')+" :"+
      " ("+myAccount.preferences.timePeriod_s3+") "+(rentedClicks.mean[myAccount.preferences.timePeriod_s3]).toFixed(2)+
      " ("+myAccount.preferences.timePeriod_s2+") "+(rentedClicks.mean[myAccount.preferences.timePeriod_s2]).toFixed(2)+
      " ("+myAccount.preferences.timePeriod_s1+") "+(rentedClicks.mean[myAccount.preferences.timePeriod_s1]).toFixed(2)+"";
      statDiv.appendChild(avgLabel);

      earnStr = " "+localString('avgIncome')+" :"+
      " ("+myAccount.preferences.timePeriod_s3+") $"+((rentedClicks.mean[myAccount.preferences.timePeriod_s3])*myAccount.referralClickValue).toFixed(3)+
      " ("+myAccount.preferences.timePeriod_s2+") $"+((rentedClicks.mean[myAccount.preferences.timePeriod_s2])*myAccount.referralClickValue).toFixed(3)+
      " ("+myAccount.preferences.timePeriod_s1+") $"+((rentedClicks.mean[myAccount.preferences.timePeriod_s1])*myAccount.referralClickValue).toFixed(3);
      
      graphLabel[graphNumber] = 'Rented Referral clicks credited';
      graphData = rentedClicks.value;
      
    }
    else if(graphNumber == 2)
    {
    // Recycle graph
      dailyEarnLabel.style.backgroundImage = "url('" + img_redBackground + "')";
      dailyEarnLabel.style.color = "#444444";

      avgLabel.innerHTML = localString('recycledLast')+" "+myAccount.preferences.timePeriod_3+" "+localString('days')+":"+
      " "+(recycleCost.totals[myAccount.preferences.timePeriod_3] / myAccount.recycleCost).toFixed(0)+
      " ($"+recycleCost.totals[myAccount.preferences.timePeriod_3].toFixed(3)+")";
      statDiv.appendChild(avgLabel);

      customLogger('recycleCost.totals[myAccount.preferences.timePeriod_3] = '+recycleCost.totals[myAccount.preferences.timePeriod_3]+'\n'+
      'recycleCost.totals[myAccount.preferences.timePeriod_2] = '+recycleCost.totals[myAccount.preferences.timePeriod_2]+'\n'+
      'recycleCost.totals[myAccount.preferences.timePeriod_1] = '+recycleCost.totals[myAccount.preferences.timePeriod_1],6);

      earnStr = " "+localString('avgExpenses')+" :"+
      " ("+myAccount.preferences.timePeriod_3+") $"+(recycleCost.mean[myAccount.preferences.timePeriod_3]).toFixed(3)+
      " ("+myAccount.preferences.timePeriod_2+") $"+(recycleCost.mean[myAccount.preferences.timePeriod_2]).toFixed(3)+
      " ("+myAccount.preferences.timePeriod_1+") $"+(recycleCost.mean[myAccount.preferences.timePeriod_1]).toFixed(3);
      
      graphLabel[graphNumber] = 'Recycling Costs';
      graphData = recycleCost.value;
      
    }
    else if(graphNumber == 3)
    {
    // Autopay graph
      dailyEarnLabel.style.backgroundImage = "url('" + img_redBackground + "')";
      dailyEarnLabel.style.color = "#444444";

      avgLabel.innerHTML = localString('autopaidLast')+" "+myAccount.preferences.timePeriod_3+" "+localString('days')+":"+
      " "+(autopayCost.totals[myAccount.preferences.timePeriod_3] / myAccount.autopayCost).toFixed(0)+
      " ($"+autopayCost.totals[myAccount.preferences.timePeriod_3].toFixed(3)+")";
      statDiv.appendChild(avgLabel);

      customLogger('autopayCost.totals[myAccount.preferences.timePeriod_3] = '+autopayCost.totals[myAccount.preferences.timePeriod_3]+'\n'+
      'autopayCost.totals[myAccount.preferences.timePeriod_2] = '+autopayCost.totals[myAccount.preferences.timePeriod_2]+'\n'+
      'autopayCost.totals[myAccount.preferences.timePeriod_1] = '+autopayCost.totals[myAccount.preferences.timePeriod_1],6);

      earnStr = " "+localString('avgExpenses')+" :"+
      " ("+myAccount.preferences.timePeriod_3+") $"+(autopayCost.mean[myAccount.preferences.timePeriod_3]).toFixed(3)+
      " ("+myAccount.preferences.timePeriod_2+") $"+(autopayCost.mean[myAccount.preferences.timePeriod_2]).toFixed(3)+
      " ("+myAccount.preferences.timePeriod_1+") $"+(autopayCost.mean[myAccount.preferences.timePeriod_1]).toFixed(3);
      
      graphLabel[graphNumber] = 'Autopay Costs';
      graphData = autopayCost.value;
      
    }
    else if(graphNumber == 4)
    {
    // One more month
      dailyEarnLabel.style.backgroundImage = "url('" + img_redBackground + "')";
      dailyEarnLabel.style.color = "#444444";

      earnStr = " "+localString('avgExpenses')+" :"+
      " ("+myAccount.preferences.timePeriod_3+") $"+(renewalCost.mean[myAccount.preferences.timePeriod_3]).toFixed(3)+
      " ("+myAccount.preferences.timePeriod_2+") $"+(renewalCost.mean[myAccount.preferences.timePeriod_2]).toFixed(3)+
      " ("+myAccount.preferences.timePeriod_1+") $"+(renewalCost.mean[myAccount.preferences.timePeriod_1]).toFixed(3);
      
      graphLabel = 'Renewal Costs';
      graphData = renewalCost.value;
      
    }
    else if(graphNumber == 5)
    {
    // Transfers
      earnStr = " "+localString('avgTransfers')+" :"+
        " ("+myAccount.preferences.timePeriod_3+") $"+(transfersToRentalBalance.mean[myAccount.preferences.timePeriod_3]).toFixed(3)+
        " ("+myAccount.preferences.timePeriod_2+") $"+(transfersToRentalBalance.mean[myAccount.preferences.timePeriod_2]).toFixed(3)+
        " ("+myAccount.preferences.timePeriod_1+") $"+(transfersToRentalBalance.mean[myAccount.preferences.timePeriod_1]).toFixed(3);
      dailyEarnLabel.style.backgroundImage = "url('" + img_grayBackground + "')";
      dailyEarnLabel.style.color = "#eeeeee";
      
      graphLabel[graphNumber] = 'Transfers To Rental Balance';
      graphData = transfersToRentalBalance.value;
      
    }
    else if(graphNumber == 6)
    {
    // Rentals due
      dailyEarnLabel = dailyEarnLabel = document.createElement("DIV");
        dailyEarnLabel.style.width = "318px";
        dailyEarnLabel.style.height = "14px";
        dailyEarnLabel.style.fontFamily = "verdana";
        dailyEarnLabel.style.fontWeight = "bold";
        dailyEarnLabel.style.fontSize = "9px";
        dailyEarnLabel.style.textAlign = "left";
        dailyEarnLabel.style.borderLeft = "1px solid #aaaaaa";
        dailyEarnLabel.style.borderRight = "1px solid #aaaaaa";
        dailyEarnLabel.style.borderBottom = "1px solid #aaaaaa";
        dailyEarnLabel.style.backgroundColor = "#8899aa";    //"#7fac21";
        dailyEarnLabel.style.backgroundImage = "url('" + img_greenBackground + "')";
        dailyEarnLabel.style.top = statDiv.style.height;
        statDiv.style.height = (parseInt(statDiv.style.height)-(-20))+"px";
        dailyEarnLabel.style.color = "#444444";

      var rentingPeriod_7 = rentalsDue.totals[7];
      var rentingPeriod_autopay = rentalsDue.totals[myAccount.autopayLimit];
      var rentingPeriod_autopayTo30 = (rentalsDue.totals[30] - rentalsDue.totals[myAccount.autopayLimit]);
      var rentingPeriod_30to60 = (rentalsDue.totals[60] - rentalsDue.totals[30]);
      var rentingPeriod_60to90 = (rentalsDue.totals[90] - rentalsDue.totals[60]);
      var rentingPeriod_90plus = (myAccount.rentedRefCount  -rentalsDue.totals[90]);

      customLogger('\nrentalsDue.totals[7] = '+rentalsDue.totals[7]+'\n'+
      'rentalsDue.totals[myAccount.autopayLimit] = '+rentalsDue.totals[myAccount.autopayLimit]+'\n'+
      'rentalsDue.totals[30] = '+rentalsDue.totals[30]+'\n'+
      'rentalsDue.totals[60] = '+rentalsDue.totals[60]+'\n'+
      'rentalsDue.totals[90] = '+rentalsDue.totals[90],6);

      customLogger('\nrentingPeriod_7 = '+rentingPeriod_7+'\n'+
      'rentingPeriod_autopay = '+rentingPeriod_autopay+'\n'+
      'rentingPeriod_autopayTo30 = '+rentingPeriod_autopayTo30+'\n'+
      'rentingPeriod_30to60 = '+rentingPeriod_30to60+'\n'+
      'rentingPeriod_60to90 = '+rentingPeriod_60to90+'\n'+
      'rentingPeriod_90plus = '+rentingPeriod_90plus,5);





      var spacer = '<small><small>  |  </small></small>';

      earnStr = " | " + localString('refferalsToBeRenewed') + " : " + 
        "(0-7) " + rentingPeriod_7 + spacer + 
        "(0-" + myAccount.autopayLimit + ") " + rentingPeriod_autopay + spacer + 
        "(" + myAccount.autopayLimit + "-30) " +  rentingPeriod_autopayTo30 + spacer + 
        "(30-60) " + rentingPeriod_30to60 + spacer + 
        "(60-90) " + rentingPeriod_60to90 + spacer + 
        "(90+) " + rentingPeriod_90plus;

        dailyEarnLabel.style.backgroundImage = "url('" + img_yellowBackground + "')";
        dailyEarnLabel.style.width="658px";
        dailyEarnLabel.style.borderTop = "1px solid #aaaaaa";
      
      graphLabel[graphNumber] = 'Scheduled Renewals';
      graphData = rentalsDue.value;
      
    }
  }
  else if(currentPage.name == 'accSummary')
  {
  // Code to insert stats below graphs on the Account Summary page
    if(graphNumber == 0)
    {
    // Own clicks (server time)
      avgLabel.innerHTML = localString('averages')+" :"+
      " ("+myAccount.preferences.timePeriod_s3+") "+(ownClicks.mean[myAccount.preferences.timePeriod_s3]).toFixed(3)+
      " ("+myAccount.preferences.timePeriod_s2+") "+(ownClicks.mean[myAccount.preferences.timePeriod_s2]).toFixed(3)+
      " ("+myAccount.preferences.timePeriod_s1+") "+(ownClicks.mean[myAccount.preferences.timePeriod_s1]).toFixed(3)+"";
      statDiv.appendChild(avgLabel);

      earnStr = " "+localString('avgIncome')+" :"+
      " ("+myAccount.preferences.timePeriod_s3+") $"+((ownClicks.mean[myAccount.preferences.timePeriod_s3])*myAccount.ownClickValue).toFixed(3)+
      " ("+myAccount.preferences.timePeriod_s2+") $"+((ownClicks.mean[myAccount.preferences.timePeriod_s2])*myAccount.ownClickValue).toFixed(3)+
      " ("+myAccount.preferences.timePeriod_s1+") $"+((ownClicks.mean[myAccount.preferences.timePeriod_s1])*myAccount.ownClickValue).toFixed(3);
      
      dailyEarnLabel.style.backgroundImage = "url('" + img_grayBackground + "')";
      dailyEarnLabel.style.color = "#eeeeee";
      
      graphLabel[graphNumber] = 'Personal Clicks';
      graphData = ownClicks.value;
      
    }
    else if(graphNumber == 1)
    {
    // Own clicks (local time)
      avgLabel.innerHTML = localString('averages')+" :"+
      " ("+myAccount.preferences.timePeriod_s3+") "+(ownClicks_Local.mean[myAccount.preferences.timePeriod_s3]).toFixed(3)+
      " ("+myAccount.preferences.timePeriod_s2+") "+(ownClicks_Local.mean[myAccount.preferences.timePeriod_s2]).toFixed(3)+
      " ("+myAccount.preferences.timePeriod_s1+") "+(ownClicks_Local.mean[myAccount.preferences.timePeriod_s1]).toFixed(3)+"";
      statDiv.appendChild(avgLabel);

      earnStr = " "+localString('avgIncome')+" :"+
      " ("+myAccount.preferences.timePeriod_s3+") $"+((ownClicks_Local.mean[myAccount.preferences.timePeriod_s3])*myAccount.ownClickValue).toFixed(3)+
      " ("+myAccount.preferences.timePeriod_s2+") $"+((ownClicks_Local.mean[myAccount.preferences.timePeriod_s2])*myAccount.ownClickValue).toFixed(3)+
      " ("+myAccount.preferences.timePeriod_s1+") $"+((ownClicks_Local.mean[myAccount.preferences.timePeriod_s1])*myAccount.ownClickValue).toFixed(3);
      
      dailyEarnLabel.style.backgroundImage = "url('" + img_grayBackground + "')";
      dailyEarnLabel.style.color = "#eeeeee";
      
      graphLabel[graphNumber] = 'Own Clicks';
      graphData = ownClicks_Local.value;
      
    }
  }

  dailyEarnLabel.innerHTML = earnStr;
  statDiv.appendChild(dailyEarnLabel);
  
  // Add Export Links
  
  // Create and insert wrapper for export 'tabs'
  var exportTabsWrapper = document.createElement('div');
    // exportTabsWrapper.style.position = 'absolute';
    exportTabsWrapper.style.float = 'left';
    exportTabsWrapper.style.position = 'relative';
    exportTabsWrapper.style.bottom = '-3px';
    exportTabsWrapper.id = 'exportTabsWrapper_'+graphNumber;
    exportTabsWrapper.style.width = (parseFloat(embed.width) - 5) + 'px';;
    exportTabsWrapper.innerHTML = ' ';
    
  statDiv.insertBefore(exportTabsWrapper,embed);
  
  
  // Define the export 'tabs'
  var csvExportTab = document.createElement('div');
  var tsvExportTab = document.createElement('div');
  var xmlExportTab = document.createElement('div');
  var textExportTab = document.createElement('div');

  var exportTabStyle = '-moz-border-radius: 0.6em 0.6em 0px 0px; font-size: xx-small; padding: 0px 7px; margin-right: 7px; text-align: center; cursor: pointer;'; 
  
  csvExportTab.setAttribute('style',exportTabStyle);
    csvExportTab.style.backgroundColor = '#ecd';
    csvExportTab.style.cssFloat = 'left';
    // csvExportTab.style.width = '20px';
    csvExportTab.className = 'csvExportTab exportTab';
    csvExportTab.id = 'csvExportTab_'+graphNumber;
  csvExportTab.innerHTML = 'CSV';
  
  tsvExportTab.setAttribute('style',exportTabStyle);
    tsvExportTab.style.backgroundColor = '#edc';
    tsvExportTab.style.cssFloat = 'left';
    // tsvExportTab.style.width = '20px';
    tsvExportTab.className = 'tsvExportTab exportTab';
    tsvExportTab.id = 'tsvExportTab_'+graphNumber;
  tsvExportTab.innerHTML = 'TSV';
  
  
  xmlExportTab.setAttribute('style',exportTabStyle);
    xmlExportTab.style.backgroundColor = '#cde';
    xmlExportTab.style.cssFloat = 'left';
    // xmlExportTab.style.width = '20px';
    xmlExportTab.class = 'xmlExportTab exportTab';
    xmlExportTab.id = 'xmlExportTab_'+graphNumber;
  xmlExportTab.innerHTML = 'XML';
    
  textExportTab.setAttribute('style',exportTabStyle);
    textExportTab.style.backgroundColor = '#dce';
    textExportTab.style.cssFloat = 'left';
    // textExportTab.style.width = '20px';
    textExportTab.class = 'textExportTab exportTab';
    textExportTab.id = 'textExportTab_'+graphNumber;
  textExportTab.innerHTML = 'Text';
  
  
  // var textAreaContents_text = '';
  // var textAreaContents_CSV = '';
  // var textAreaContents_TSV = '';
    // textAreaContents_text += graphData[i] + '\n';
    // textAreaContents_CSV += currentDate + ',' + graphData[i] + ',\n';
    // textAreaContents_TSV += currentDate + '\t' + graphData[i] + '\t\n';
    
    
    var line_text = new Array();
    var line_CSV = new Array();
    var line_TSV = new Array();
    
  for(var i = 1; i <= graphData.slice(1).length; i++)
  {
    var date = new Date()
    if(graphNumber != 6 ) { date.setDate(Today.getDate() - i + 1); }
    else { date.setDate(Today.getDate() + i - 1); }
    var currentDate = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
    
    line_text[i-1] = graphData[i];
    line_CSV[i-1] = currentDate + ',' + graphData[i];
    line_TSV[i-1] = currentDate + '\t' + graphData[i];
    
  }
  
  var textAreaContents_text = line_text.join('\n');
  var textAreaContents_CSV = line_CSV.join(',\n');
  var textAreaContents_TSV = line_TSV.join('\t\n');
  
  var textAreaContents_reverse_text = line_text.reverse().join('\n');
  var textAreaContents_reverse_CSV = line_CSV.reverse().join(',\n');
  var textAreaContents_reverse_TSV = line_TSV.reverse().join('\t\n');
  
  // Insert 'Export as CSV' Tab and attach click event
  document.getElementById('exportTabsWrapper_'+graphNumber).appendChild(csvExportTab);
  csvExportTab.addEventListener('click', function(event) 
    { 
      var textareaContents = textAreaContents_CSV;
      // if(event.ctrlKey && event.altKey) { 
      if(event.shiftKey) { 
        var textareaContents = textAreaContents_reverse_CSV; 
      }
      createCustomAlert(graphLabel[graphNumber]+':',textareaContents,'Exporting to CSV..'); 
    }, false);
  
  // Insert 'Export as TSV' Tab and attach click event
  document.getElementById('exportTabsWrapper_'+graphNumber).appendChild(tsvExportTab);
  tsvExportTab.addEventListener('click', function(event) 
    { 
      var textareaContents = textAreaContents_TSV;
      if(event.shiftKey) { 
        var textareaContents = textAreaContents_reverse_TSV; 
      }
      createCustomAlert(graphLabel[graphNumber]+':',textareaContents,'Exporting to TSV..'); 
    }, false);
  
  // Insert 'Export as XML' Tab and attach click event
  // document.getElementById('exportTabsWrapper_'+graphNumber).appendChild(xmlExportTab);
  // xmlExportTab.addEventListener('click', function(event) { createExportDialog(graphLabel[graphNumber]+':',textAreaContents_CSV,'Exporting to XML..',event); }, false);
  
  // Insert 'Export as Text' Tab and attach click event
  document.getElementById('exportTabsWrapper_'+graphNumber).appendChild(textExportTab);
  textExportTab.addEventListener('click', function(event) 
    { 
      var textareaContents = textAreaContents_text;
      if(event.shiftKey) { 
        var textareaContents = textAreaContents_reverse_text; 
      }
      createCustomAlert(graphLabel[graphNumber]+':',textareaContents,'Exporting as text..'); 
    }, false);
  
  
  
  // var embedPosition = findPos(embed);
  // var insertedItemHeight = parseInt(window.getComputedStyle(document.getElementById('csvExportTab_'+graphNumber),null).height);
    // exportTabsWrapper.style.left = (embedPosition[0])+'px';
    // exportTabsWrapper.style.top = (embedPosition[1]-insertedItemHeight)+'px';
    
    
}


function referralPage()
{
console.log("referal page");
// Function that runs on the Referral Listings pages
  var header = document.getElementsByTagName('H1')[0];
  var pageContent = header.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
console.log(header, pageContent);
  var renewalPeriod = 0;
  var renewalCost = 0;
  var renewalCostPerRefPerDay = 0;
  var goldenFeePerRefPerDay = 0;
  var goldenPackFeePerRefPerDay = 0;
  var expensesPerRefPerDay = 0;
  var minBreakEvenAvgExcludingRecycles = 0;
 
  if(currentPage.name == 'rentedRefListing')
  {
  console.log("current is rent");
    // Define the column indexes
    var col_FLAG = 1;
    var col_NAME = 3;
    var col_SINCE = 4;
    var col_NEXTPAYMENT = 5;
    var col_LAST = 6;
    var col_CLICKS = 7;
    var col_AVG = 8;
    var colHeader_AVG = 6;
  
    // CALCULATE REFERRAL EXPENSES PER DAY AND MIN BREAK EVEN AVERAGE
    renewalPeriod = myAccount.preferences.renewalPeriod; 
    renewalCost = myAccount.renewalFee(renewalPeriod); // Cost of renewing for the renewing period
    
    // Cost of renewing, per ref per day::
    renewalCostPerRefPerDay = renewalCost / renewalPeriod;
    
    if(myAccount.accountType > 0) 
    {
      // Cost of golden & golden packs per ref, per day
      goldenFeePerRefPerDay = ((90 / 365) / myAccount.rentedRefCount);
      goldenPackFeePerRefPerDay = ((myAccount.goldenPackCost / 365) / myAccount.rentedRefCount);
    }
    
    // Calculate how much referrals cost per day
    expensesPerRefPerDay = renewalCostPerRefPerDay + goldenFeePerRefPerDay + goldenPackFeePerRefPerDay;
    
    // Calculate the minimum average needed to pay for the expenses of each ref each day
    minBreakEvenAvgExcludingRecycles = expensesPerRefPerDay / myAccount.referralClickValue;
  
  }
  else if(currentPage.name == 'directRefListing')
  {
    // Define the column indexes
    var col_NAME = 1;
    var col_CAMEFROM = 2;
    var col_SINCE = 3;
    var col_LAST = 4;
    var col_CLICKS = 5;
    var col_AVG = 6;
    var colHeader_AVG = 6;
  }
  else
  {
    GM_log('Error defining column indexes - currentPage.name is unknown.');
  }

  var sumOfAverages = 0;
  var clickSum = 0;
  var activeRefCount = 0;
  var refCount = -1;

  var todayClickers = 0;
  var ydayClickers = 0;
  var zeroClickers = 0;
  var otherClickers = 0;
  
  var currencySymbol_A10 = '';
  var currencySymbol_A7 = '';
  var currencySymbol_RSA = '';
  var currencySymbol_SD = '';
  var currencySymbol_Profit = '$';
  
  var minigraphs = new Array();
  
  // mainTable = the table which shows the referrals are contained
  var mainTable = document.evaluate('//td[@class="bgt"]/ancestor::tbody[1]',
      document,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null).snapshotItem(0);

      console.log(mainTable);
  var rows = mainTable.rows;
  var headerRow = rows[0];
  console.log(rows, headerRow);
  
  
  // If the user wishes to view either extra column, allow the page to expand by removing the fixed width attribute of the content wrapper
  if((myAccount.ultimatePreferences.showRSAColumn == true || myAccount.preferences.showProfitColumn) && (myAccount.rentedRefCount > 0))
  {
      pageContent.removeAttribute('width')
      pageContent.setAttribute('cellspacing','5px');
  }
  
  headerRow.childNodes[colHeader_AVG].innerHTML += '<small> | Exact Avg.</small>';
  
  
  // Ultimate-only columns::
  // Ultimate's minigraphs will not be shown if there are more than 100 referrals per page
  
  // Check how many referrals are being shown per page
  // If the user has fewer than 10 referrals, the option to select the # of referrals is not present, thus refsPerPage must be set manually
  var refsPerPageSelector = document.getElementById('rlpp');
  if(refsPerPageSelector != null) { 
    var refsPerPage = parseInt(refsPerPageSelector.options[refsPerPageSelector.selectedIndex].value);
  } else {
    var refsPerPage = 10; 
  }
  
  if(refsPerPage <= 100 && myAccount.accountType == 6)
  {
    // 'A10' column == Average for the last 10 days
    if(myAccount.ultimatePreferences.showA10Column == true)
    {
      var new_headerAvg_10 = document.createElement('td');
        new_headerAvg_10.setAttribute('class','bgt');
        new_headerAvg_10.setAttribute('nowrap','');
        new_headerAvg_10.setAttribute('align','center');
        new_headerAvg_10.innerHTML = '<b><font class="branco">A10</font></b>';

      headerRow.appendChild(new_headerAvg_10);
    }
    
    // 'A7' column == Average for the last 7 days
    if(myAccount.ultimatePreferences.showA7Column == true)
    {
      var new_headerAvg_7 = document.createElement('td');
        new_headerAvg_7.setAttribute('class','bgt');
        new_headerAvg_7.setAttribute('nowrap','');
        new_headerAvg_7.setAttribute('align','center');
        new_headerAvg_7.innerHTML = '<b><font class="branco">A7</font></b>';
        
        headerRow.appendChild(new_headerAvg_7);
    }
    
    // 'SDEV' column == Average for the last 7 days
    if(myAccount.ultimatePreferences.showSDEVColumn == true)
    {
      var new_headerSDEV = document.createElement('td');
        new_headerSDEV.setAttribute('class','bgt');
        new_headerSDEV.setAttribute('nowrap','');
        new_headerSDEV.setAttribute('align','center');
        new_headerSDEV.innerHTML = '<b><font class="branco">SD</font></b>';
        
        headerRow.appendChild(new_headerSDEV);
    }
    
    // 'RSA' column == Ratio of standard deviation / average (mean)
    if(myAccount.ultimatePreferences.showRSAColumn == true)
    {
      var new_headerRSA = document.createElement('td');
        new_headerRSA.setAttribute('class','bgt');
        new_headerRSA.setAttribute('nowrap','');
        new_headerRSA.setAttribute('align','center');
        new_headerRSA.innerHTML = '<b><font class="branco">RSA</font></b>';

      headerRow.appendChild(new_headerRSA);
    }
  }
  
  
  // 'Profit' column can be viewed by all members
  console.dir(myAccount);
  if(myAccount.preferences.showProfitColumn == true)
  {
    var new_headerPROFIT = document.createElement('td');
      new_headerPROFIT.setAttribute('class','bgt');
      new_headerPROFIT.setAttribute('nowrap','');
      new_headerPROFIT.setAttribute('align','center');
      new_headerPROFIT.innerHTML = '<b><font class="branco">Profit</font></b>';
    console.log("he", headerRow);
    headerRow.appendChild(new_headerPROFIT);
  }
  
  // Fetch the script that contains referral listing data
  var xpathMtx = "//script[contains(.,'var mtx=')]";
  var xpathResults_mtx = document.evaluate(xpathMtx,
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null ).snapshotItem(0);
  
  // Fetch the useful part of the script and replace the ';' that got removed by split()
  var mtxCode = xpathResults_mtx.innerHTML.split(';')[0] + ';';
  mtxCode = mtxCode.replace(/([0-9]+\.*[0-9]*)([,|\]])/g,"'$1'$2");
  
  customLogger('xpathResults_mtx = '+xpathResults_mtx+'\n'+
  'mtxCode = '+mtxCode,7);
  
  // Run the code in mtxCode (var mtx=[...];)
  eval(mtxCode);
  
  // Ultimate-only columns::
  // Ultimate's minigraphs will not be shown if there are more than 100 referrals per page
  if(refsPerPage <= 100 && myAccount.accountType == 6)
  {
    // mtx.length = # of referrals shown on current page
    for (var z = 0; z < mtx.length; z++) 
    {

      var clickData = mtx[z][14].toString();
      var clickData_array = new Array();
      
      customLogger('clickData = '+clickData,7);
      
      // Make the minigraph data more useable by splitting it into an array
      if(clickData != '0')
      {
        clickData.split('');    
        for(var i = 0; i < clickData.length; i++) {
         clickData_array[i] = parseInt(clickData[i]);
        }
      }
      else
      {
        clickData_array = [0,0,0,0,0,0,0,0,0,0];
      }
      
      // Now reverse the order of the array so that the most recent days are first ([0] == today, [1] == yesterday)
      clickData_array.reverse();

      customLogger('typeof clickData_array = '+typeof clickData_array+'\n'+
      'clickData_array = '+clickData_array,7);
      
      // Extract the stats from the minigraph data
      var minigraphClickData = new Array();
      var minigraphClickSums = new Array();
      var minigraphClickAvgs = new Array();

      for (var m = 0; m < clickData_array.length; m++)
      {
        minigraphClickData[m] = parseInt(clickData_array[m]);
      }

      for (var s = 0; s < minigraphClickData.length; s++)
      {
        if(s == 0) { minigraphClickSums[s] = minigraphClickData[s]; }
        else { minigraphClickSums[s] = minigraphClickSums[s-1] + minigraphClickData[s]; }
        
        minigraphClickAvgs[s] = minigraphClickSums[s] / (s);
        
        customLogger('s = '+s+'\n'+
        'minigraphClickData[s] = '+minigraphClickData[s]+'\n'+
        'minigraphClickSums[s-1] = '+minigraphClickSums[s-1]+'\n'+
        'minigraphClickSums[s] = '+minigraphClickSums[s]+'\n'+
        'minigraphClickAvgs[s] = '+minigraphClickAvgs[s],12);
        
      }
      
      minigraphs[z] = new graphProperties(minigraphClickData,minigraphClickSums);
    }
  }

      
  // Loop through the displayed referrals 
  for (var rowCounter = 1; rowCounter < (rows.length - 1); rowCounter++)
  {
    var currentRow = rows[rowCounter];
    
    // If the row isn't blank, process it
    if(currentRow.textContent != '' && currentRow.childNodes.length > 1)
    {
      refCount++;
      customLogger('rowCounter = '+rowCounter+'\n'+
      'currentRow = '+currentRow+'\n'+
      'refCount = '+refCount,7);
      
      // 
      var refFlag = currentRow.childNodes[col_FLAG];
      var refName = currentRow.childNodes[col_NAME];
      var refOwnedSince = currentRow.childNodes[col_SINCE];
      var refLastClick = currentRow.childNodes[col_LAST];
      var refTotalClicks = currentRow.childNodes[col_CLICKS];
      var refOverallAvg = currentRow.childNodes[col_AVG];

      // Columns specific to the direct referrals page
      if(currentPage.name == 'directRefListing') 
      { 
        var refCameFrom = currentRow.childNodes[col_CAMEFROM]; 
        var refNextPayment = currentRow.childNodes[col_NEXTPAYMENT]; 
      }
      
      if(myAccount.preferences.textifyFlag && currentPage.name == 'rentedRefListing')
      {
        currentRow.childNodes(0).setAttribute("width", 15);
        refFlag.setAttribute("width", 45);
        // Get the flag colour of the referral
        if(refFlag.innerHTML.indexOf('flag0.gif') > 0) {
          var flagColour = localString('W');
        }
        else if(refFlag.innerHTML.indexOf('flag1.gif') > 0) {
          var flagColour = localString('R');
        }
        else if(refFlag.innerHTML.indexOf('flag2.gif') > 0) {
          var flagColour = localString('O');
        }
        else if(refFlag.innerHTML.indexOf('flag3.gif') > 0) {
          var flagColour = localString('Y');
        }
        else if(refFlag.innerHTML.indexOf('flag4.gif') > 0) {
          var flagColour = localString('G');
        }
        
        refFlag.innerHTML += myAccount.preferences.textifyFlag_prexfix + flagColour;
      }
      
      // Extract the 'wholeDays' data from the table
      var numDaysOwned_raw = refOwnedSince.innerHTML.replace('&nbsp;', '');
      var lastClick_raw = refLastClick.innerHTML.replace('&nbsp;', '');
      
      
      // Calculate the number of days referral has been owned and convert this to a 'fuller' version [x days, y hours, z mins]
      // If {column}_shortFormat == true, it will return [x d, y h, z m] instead
      // If 'fullerSinceTimers' is set to false, NumDaysSince () will return only the whole number of days that have passed

      
      var numDaysOwned_summarised = NumDaysSince ( numDaysOwned_raw , 'mins' , myAccount.preferences.fullerOwnedSinceTimers , myAccount.preferences.ownedSinceTimer_shortFormat , 'daysOwned');
      
      // If the referral has not clicked yet, the referral has been inactive for as long as it has been owned
      // Else the referral has been inactive since the date of its last click
      if(lastClick_raw.match( neobuxString('noClicks') )) 
      {
        var inactiveDays = NumDaysSince ( numDaysOwned_raw , 'days' , myAccount.preferences.fullerLastClickTimers , myAccount.preferences.lastClickTimer_shortFormat , 'lastClick');
        var accurateLastClick = NumDaysSince ( numDaysOwned_raw , 'decimal' , myAccount.preferences.fullerLastClickTimers , myAccount.preferences.fullerLastClickTimers , false , 'lastClick');
      } 
      else 
      {
        var inactiveDays = NumDaysSince ( lastClick_raw , 'days' , myAccount.preferences.fullerLastClickTimers , myAccount.preferences.lastClickTimer_shortFormat , 'lastClick');
        var accurateLastClick = NumDaysSince ( lastClick_raw , 'decimal' , myAccount.preferences.fullerLastClickTimers , myAccount.preferences.fullerLastClickTimers , false , 'lastClick');
      }
      
      
      // Insert the summarised date / 'time elapsed' to the cell
      // If user preference is to not replace the whole cell, append to end of existing cell contents, else replace the cell contents
      
      // 'Owned Since' column
      if(!myAccount.preferences.replaceOwnedSince){
        refOwnedSince.innerHTML = numDaysOwned_raw + "<font style='font-size:9px; color:#777777'> (" + numDaysOwned_summarised + ")</font>";
      } else {
        refOwnedSince.innerHTML = "<font style='font-size:9px; color:#777777'>" + numDaysOwned_summarised + "</font>";
      }
      
      // 'Last Click' column
      if(!myAccount.preferences.replaceLastClick) {
        refLastClick.innerHTML = lastClick_raw + "<font style='font-size: 9px; color:#777777'> [" + inactiveDays + "]</font>";
      } else {
        refLastClick.innerHTML = "<font style='font-size: 9px; color: #777777'>" + inactiveDays + "</font>";
      }
      
      var accurateOwnedSince = NumDaysSince ( numDaysOwned_raw , 'decimal', myAccount.preferences.fullerOwnedSinceTimers , false , 'ownedSince');
      var accurateAverage = parseInt(refTotalClicks.textContent) / accurateOwnedSince;
      
      GM_log('parseInt(refTotalClicks.textContent) = '+parseInt(refTotalClicks.textContent)+'\n'+
      'accurateOwnedSince = '+accurateOwnedSince+'\n'+
      'accurateAverage = '+accurateAverage);
      
      if(myAccount.preferences.showExactAverage) 
      {
        // Replace the displayed average (accurate to a 24hour period) with one that that is more accurate
        // (takes hours and minutes into account)


        
        if(myAccount.preferences.replaceWithExactAverage) {
          refOverallAvg.innerHTML = (accurateAverage).toFixed(3)
        }
        else
        {
          refOverallAvg.innerHTML = refOverallAvg.innerHTML + '<small>' + myAccount.preferences.exactAverageSeperator + (accurateAverage).toFixed(3) + '</small>';
        }
      }

      

      // Update the overall statistics for the single page of referrals (data used for bar at bottom of the referral listing page)
      if(parseFloat(refOverallAvg.textContent) > 0)
      {
        sumOfAverages += parseFloat(refOverallAvg.textContent);
        clickSum += parseInt(refTotalClicks.textContent);
        activeRefCount++;
      }
      
      // Keep a tally of how many referrals clicked today / yesterday / never / other
      if(parseInt(refTotalClicks.textContent) == 0) { zeroClickers++; }
        else if(Math.floor(accurateLastClick) == 0) { todayClickers++; }
        else if(Math.floor(accurateLastClick) == 1) { ydayClickers++; }
        else { otherClickers++; }
      
      
      
      // INSERT EXTRA COLUMNS // 
      
      // Ultimate-only columns::
      // Ultimate's minigraphs will not be shown if there are more than 100 referrals per page
      if(refsPerPage <= 100 && myAccount.accountType == 6)
      {
        // 'A10' column == Average for the last 10 days
        if(myAccount.ultimatePreferences.showA10Column == true)
        {
          var newCol_AVG_10 = document.createElement('td');
            newCol_AVG_10.setAttribute('class','l');
            newCol_AVG_10.setAttribute('nowrap','');
            newCol_AVG_10.style.backgroundColor = window.getComputedStyle(refName,null).backgroundColor;
            
          var colAVG_text_10 = minigraphs[refCount].mean[10].toFixed(2);




            newCol_AVG_10.innerHTML = "<font style='font-size:9px;color:#000000'>" + currencySymbol_A10 + colAVG_text_10 + "</font>";
          
          currentRow.appendChild(newCol_AVG_10);
        }

        // 'A7' column == Average for the last 7 days
        if(myAccount.ultimatePreferences.showA7Column == true)
        {
          var newCol_AVG_7 = document.createElement('td');
            newCol_AVG_7.setAttribute('class','l');
            newCol_AVG_7.setAttribute('nowrap','');
            newCol_AVG_7.style.backgroundColor = window.getComputedStyle(refName,null).backgroundColor;
            
          var colAVG_text_7 = minigraphs[refCount].mean[7].toFixed(2);




            newCol_AVG_7.innerHTML = "<font style='font-size:9px;color:#000000'>" + currencySymbol_A7 + colAVG_text_7 + "</font>";
          
          currentRow.appendChild(newCol_AVG_7);
        }
        
        // 'SDEV' column == Average for the last 7 days
        if(myAccount.ultimatePreferences.showSDEVColumn == true)
        {
          var newCol_SDEV = document.createElement('td');
            newCol_SDEV.setAttribute('class','l');
            newCol_SDEV.setAttribute('nowrap','');
            newCol_SDEV.style.backgroundColor = window.getComputedStyle(refName,null).backgroundColor;
            
          var colSDEV_text = minigraphs[refCount].sdev.toFixed(2);




            newCol_SDEV.innerHTML = "<font style='font-size:9px;color:#777777'>" + currencySymbol_SD + colSDEV_text + "</font>";
          
          currentRow.appendChild(newCol_SDEV);
        }
        
        // 'RSA' column == Ratio of standard deviation / average (mean)
        if(myAccount.ultimatePreferences.showRSAColumn == true)
        {
          var newCol_RSA = document.createElement('td');
            newCol_RSA.setAttribute('class','l');
            newCol_RSA.setAttribute('nowrap','');
            newCol_RSA.style.backgroundColor = window.getComputedStyle(refName,null).backgroundColor;
          
          var colRSA_text = (minigraphs[refCount].sdev / minigraphs[refCount].mean[10]).toFixed(2);




            newCol_RSA.innerHTML = "<font style='font-size:9px;color:#777777'>" + currencySymbol_RSA + colRSA_text + "</font>";
          
          currentRow.appendChild(newCol_RSA);
        }
      }



      // 'Profit' column can be viewed by all members
      if(myAccount.preferences.showProfitColumn)
      {
        
        // Retrieve numerical version of numDaysOwned and other details about the current individual referral
        var numDaysOwned_decimal = NumDaysSince ( numDaysOwned_raw , 'wholeDays' , myAccount.preferences.fullerLastClickTimers , false , 'lastClick');
        
        var refClicks = parseInt(refTotalClicks.innerHTML);
        var refID = refName.textContent.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
        var indivAvg = accurateAverage;
        
        
        // Calculate the gross income and expenses for the referral (accurate to the minute)
        var grossIn = (refClicks * myAccount.referralClickValue);
        
        if(currentPage.name == 'rentedRefListing') { var grossOut = numDaysOwned_decimal * expensesPerRefPerDay; }
        else if(currentPage.name == 'directRefListing') { grossOut = 0; }
        else { grossOut = 1000; }
        
        var netProfit_exclRecycles = (grossIn - grossOut);
        var netProfit_inclRecycles = (grossIn - grossOut) - (myAccount.recycleCost);
        
        var profitPerDay = (indivAvg * myAccount.referralClickValue) - expensesPerRefPerDay;
        
        customLogger('currentPage.name = '+currentPage.name+'\n'+
        'numDaysOwned_decimal = '+numDaysOwned_decimal+'\n'+
        'expensesPerRefPerDay = '+expensesPerRefPerDay+'\n'+
        'grossOut = '+grossOut+'\n'+
        'grossIn = '+grossIn+'\n'+
        'myAccount.recycleCost = '+myAccount.recycleCost+'\n'+
        'netProfit_exclRecycles = '+netProfit_exclRecycles+'\n'+
        'netProfit_inclRecycles = '+netProfit_inclRecycles,7);
        
        // Calculate the net income of the individual referral slot
        
        // If the user wishes to include the cost of recycling in the profit column, include the recycle fee 
        // in the gross expenses for the referral
        if(!myAccount.preferences.includeRecycleCostInProfitColumn || (currentPage.name == 'directRefListing')) 
        { 
          var PROFIT = netProfit_exclRecycles;
        } 
        else
        {
          var PROFIT = netProfit_inclRecycles;
        }
        
        
        // Calculate how many days it will take for the referral to pay for its own recycle
        // --> Assumes that the referral has clicked consistently at the current average 
        // --> Odd results from this will be shown if the referral has vastly changing click patterns
        // --> Will return 'More than '+dayLimit+' days' if it will take > dayLimit days to pay for own recycle (dayLimit: default = 30)
        var daysTilPaidOwnRecycle = getDaysTilPaidOwnRecycle(indivAvg,netProfit_exclRecycles,expensesPerRefPerDay);
        if(!isNaN(daysTilPaidOwnRecycle)) 
        {
          var daysLeftToRepay = daysTilPaidOwnRecycle - numDaysOwned_decimal;
        } 
        else 
        {
          if(parseFloat(indivAvg) < parseFloat(minBreakEvenAvgExcludingRecycles)) 
          {
            var daysTilPaidOwnRecycle = 'Never';
          }
          var daysLeftToRepay = 'N/A';
        }
        
        
        // Create the new 'Profit' column
        var newCol_PROFIT = document.createElement('td');
          newCol_PROFIT.setAttribute('class','l');
          newCol_PROFIT.setAttribute('nowrap','');
          newCol_PROFIT.setAttribute('style','border-right: 1px solid rgb(170, 170, 170);');
          newCol_PROFIT.style.backgroundColor = window.getComputedStyle(refName,null).backgroundColor;
          
          newCol_PROFIT.id = 'Profit_'+refID; // This ID is used by 'prototip' as an anchor to attach the tooltip to
          


        // If the net profit is negative, format it differently
        if(PROFIT >= 0) 
        {
          newCol_PROFIT.innerHTML = "<font style='font-size:9px; color:6F6;'>" + currencySymbol_Profit + PROFIT.toFixed(3) + "</font>";
        }
        else 
        {
          newCol_PROFIT.innerHTML = "<font style='font-size:9px; color:F88; font-style:italic;'>" + currencySymbol_Profit + PROFIT.toFixed(3) + "</font>"; 
        }
        
        // Insert the new 'Profit' column
        currentRow.appendChild(newCol_PROFIT);
        
        
        // If the current page is the rented referral listing page, create and insert the tooltips
        if(currentPage.name == 'rentedRefListing')
        {
          var tipContent = '<p>Referral: <b>'+refID+'</b></p>'+
          '<hr>'+
          '<i><small>Expenses</small></i><br>'+
          'Renewals <i><small>('+renewalPeriod+' day renewal)</small></i> = <b>$'+renewalCostPerRefPerDay.toFixed(5)+'</b><br>';
          
          // Add Golden / Golden Pack-specific lines to the tooltip
          if(myAccount.accountType == 1){ tipContent = tipContent + 'Golden fee <i><small>(per ref per day)</small></i> = <b>$'+goldenFeePerRefPerDay.toFixed(5)+'</b><br>'; }
          if(myAccount.accountType > 1){ tipContent = tipContent + 'Golden-Pack fee <i><small>(per ref per day)</small></i> = <b>$'+goldenPackFeePerRefPerDay.toFixed(5)+'</b><br>';}
          
          tipContent = tipContent + 
          'Total Expenses <i><small>(per ref per day)</small></i> = <b>$'+expensesPerRefPerDay.toFixed(5)+'</b><br>'+
          '<br>'+
          
          'Minimum average <i><small>(to break even)</small></i> = <b>'+minBreakEvenAvgExcludingRecycles.toFixed(3)+'</b><br>'+
          'Gross In = <b>$'+grossIn.toFixed(5)+'</b><br>'+
          'Gross Out = <b>$'+grossOut.toFixed(5)+'</b><br>'+
          'Current profit = <b>$'+netProfit_exclRecycles.toFixed(5)+'</b><br>'+
          'Current profit <i><small>(incl '+recycleCost+' recycle)</small></i> = <b>$'+netProfit_inclRecycles.toFixed(5)+'</b><br>'+
          '<br>'+
          
          '<i><small>@ Average = <b>'+indivAvg.toFixed(3)+'</b></small></i>:<br>'+
          'Net Profit <i><small>(per day)</small></i> = <b>$'+profitPerDay.toFixed(5)+'</b><br>'+
          'Days to pay for own recycle = <b>'+daysTilPaidOwnRecycle+'</b><br>';
          
          if(!isNaN(daysTilPaidOwnRecycle)) { 
            tipContent = tipContent + '= <i>day # <b>'+(daysTilPaidOwnRecycle + numDaysOwned_decimal)+'</b></i><br>';
          }
          
          tipContent = tipContent + '<br>';
          
          
          // Create and insert a new script node for the prototip tooltip javascript code to be run from
          var script = document.createElement('script');
          var text = document.createTextNode("new Tip('Profit_"+refID+"','"+tipContent+"',{style: 'darkgrey', width: 'auto', stem: 'rightTop', delay: '0.01', hook: {tip: 'rightTop', mouse: true}, offset: {x:-14, y:-9}})");
            script.type = 'text/javascript';
            script.appendChild(text);
            
          currentRow.appendChild(script);
        }
      }
    }
  }
  
  // SUMMARY ROW @ bottom of the referral listing table // 
  var footerRow = rows[rows.length - 1];
  // Set the size of the bottom row to match the size of the header row to accomodate for extra columns that have been added
  footerRow.childNodes[0].colSpan = rows[1].cells.length;
  
  
  var totalClickAvg = sumOfAverages / activeRefCount;
  if(isNaN(totalClickAvg)) { totalClickAvg = 0; }

  var footerRow_text = "<font style='font-size:9px;color:#FFFFFF;font-weight:bold;'>"+
  " | "+localString('totalClicks')+" : "+clickSum+
  " | "+localString('totalClickAvg')+" : "+(totalClickAvg).toFixed(3);

  if(myAccount.accountType == 6)
  {
    footerRow_text = footerRow_text + " | "+localString('lastdaysClickAvg')+" ("+myAccount.ultimatePreferences.minigraphAvgInterval+") : "+(minigraphClickAvgs[myAccount.ultimatePreferences.minigraphAvgInterval]).toFixed(3);
  }

  footerRow_text = footerRow_text +
  " | "+localString('clickedToday')+" : " + todayClickers+
  " | "+localString('clickedYday')+": " + ydayClickers+
  " | "+localString('zeroClickers')+" : " + zeroClickers+
  " | "+localString('others')+" : " + otherClickers+
  "</font>";

    footerRow.childNodes[0].style.backgroundImage = "url('" + img_grayBackground + "')";
    footerRow.childNodes[0].style.height= "25px";

  footerRow.childNodes[0].innerHTML = footerRow_text;
}


function accSummaryPage()
{
// Function that runs on the Account Summary page
customLogger('Account Summary Page',4);
  
  // The graphs on this page all have height='130'
  // Grab them then process the data
  var xpathEmbeds = "//embed[@height='130']";
  var xpathResults_embeds = document.evaluate(xpathEmbeds,
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null );

  var embed;
  var chartXML;

  customLogger('xpathResults_embeds.snapshotLength = '+xpathResults_embeds.snapshotLength,6);
  for (var graphNumber = 0, length = xpathResults_embeds.snapshotLength; graphNumber < length; graphNumber++)
  {
    // Grab the data from the graphs
    embed = xpathResults_embeds.snapshotItem(graphNumber);
    chartXML = embed.getAttribute('flashvars').split('dataXML=')[1].replace("caption='' ","");
    
    // Process the data within the graphs
    processGraphData(graphNumber,chartXML,embed);
    // Insert the processed data 
    insertGraphAverages(embed,graphNumber);
  }

}


//Definitions of Functions used by the script:::
//Functions used by classes::

function getAccountType()
{
  var spans = document.getElementsByTagName("span");
  var acc = 0;
  for (var i = 0; i < spans.length; i++) 
  {
    if(spans[i].innerHTML.indexOf("[Standard") == 1) { return 0; }
  }
  var divs = document.getElementsByTagName("DIV");
  for (var j = 0; j < divs.length; j++) 
  {
    var divClass = divs[j].getAttribute("class");
    if(divClass != null) 
    {
      //alert(divClass);
      if(divClass.indexOf("c-emerald")>0) { if(acc<2)acc = 2; }
      else if(divClass.indexOf("c-sapphire")>0) { if(acc<3)acc = 3; }
      else if(divClass.indexOf("c-platinum")>0) { if(acc<4)acc = 4; }
      else if(divClass.indexOf("c-diamond")>0) { if(acc<5)acc = 5; }
      else if(divClass.indexOf("c-ultimate")>0) { if(acc<6)acc = 6; }
      else if(divClass.indexOf("c-pioneer")>0) { if(acc<1)acc = 7; }
      else if(divClass.indexOf("c-golden")>0) { if(acc<1)acc = 1; }
    }
  }
  return acc;
}


function getNumberOfRefs(refType)
{
  customLogger('||- getRefsFunction.. refType = '+refType, 2);
  
  // If the current referrals page matches the requested 'refType', grab the number of refs from the page and store the value
  // Else the current page and requested 'refType' are mismatched so grab the number of refs from the stored values
  
  if((currentPage.name == 'rentedRefListing' && refType == 'Rented') || (currentPage.name == 'directRefListing' && refType == 'Direct'))
  {
    var noOfRefsString = document.evaluate('//h1[contains(.,"'+neobuxString("REFERRALS")+'")]',
      document,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null).snapshotItem(0);
    // If there are some digits on the page within <h1></h1> tags, grab them 
    // Bugfix: This will match the '30' in the error message alerting the user that they must be at least 30 days old to have direct refs
    // --> Test for a colon ':' to prevent this happening
    if(noOfRefsString.textContent.match(/\d+/) && noOfRefsString.textContent.match(':')) 
    {
      var numberOfRefs = parseInt(noOfRefsString.textContent.match(/\d+/)); 
    } 
    else 
    {
      // If digits cannot be found, set the number of refs to zero (0)
      var numberOfRefs = 0; 
    }
    
    // Store the number of detected referrals
    var numberOfRefs = manipulatePrefs('numberOf'+refType+'Refs',numberOfRefs,'set');
  }
  
  
  // Now that the stored values have been updated / created, retrieve and return them
  switch(refType)
  {
    case 'Rented':
      var numberOfRefs = manipulatePrefs('numberOfRentedRefs','N/A','get');
      customLogger('getting numberOfRefs ('+refType+') = '+numberOfRefs,'get');
      break;
      
    case 'Direct':
      var numberOfRefs = manipulatePrefs('numberOfDirectRefs','N/A','get');
      customLogger('getting numberOfRefs ('+refType+') = '+numberOfRefs,'get');
      break;
  }
  return numberOfRefs;
}



function getAutoPayLimit(accountType)
{
// Function that returns the autopay limit for each account type

  customLogger('||- getAutoPayLimit()',2);
  customLogger('accountType = '+accountType,2);
    // 0 == Standard
    // 1 == Golden
    // 2 == Emerald
    // 3 == Sapphire
    // 4 == Platinum
    // 5 == Diamond
    // 6 == Ultimate
    // 7 == Pioneer

  switch(accountType)
  {
    case 0: return 20; break;
    case 1: return 20; break;
    case 2: return 20; break;
    case 3: return 18; break;
    case 4: return 20; break;
    case 5: return 14; break;
    case 6: return 10; break;
    case 7: return 20; break;
  }
}





function getRecycleCost(accountType)
{

  // Set the defaults for each account type
  switch(accountType)
  {
    case 0: var defaultRecycleCost = 0.08; break;
    case 1: var defaultRecycleCost = 0.08; break;
    case 2: var defaultRecycleCost = 0.07; break;
    case 3: var defaultRecycleCost = 0.08; break;
    case 4: var defaultRecycleCost = 0.07; break;
    case 5: var defaultRecycleCost = 0.08; break;
    case 6: var defaultRecycleCost = 0.05; break;
    case 7: var defaultRecycleCost = 0.08; break;
    default: var defaultRecycleCost = 0.08; break;
  }
  
  // If the current page is the rented referral listings,
  // store the *actual* recycle cost
  if(currentPage.name == 'rentedRefListing')
  {
    var tmp = document.body.innerHTML.match(/var p\=\[([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*)\]/);
    recycleCost = tmp[2];
    manipulatePrefs('recycleCost',recycleCost,'set');
  }
  
  // If the varibable 'recycleCost' hasn't been set yet, this will return defaultRecycleCost
  // --> if the referral listings pages haven't been viewed yet
  // else this will return recycleCost (the actual recycle cost retrieved from the page)
  
  return manipulatePrefs('recycleCost',defaultRecycleCost,'get');
  
}


function getRenewalFees(renewalPeriod)
{
  if(!renewalPeriod) { renewalPeriod = 60; }
  
    var renewCost30 = 0;
    var renewCost60 = 0;
    var renewCost90 = 0;
    
  if(currentPage.name == 'rentedRefListing')
  {
    var tmp = document.body.innerHTML.match(/var p\=\[([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*)\]/);
    renewCost30 = tmp[3];
    renewCost60 = tmp[4];
    renewCost90 = tmp[5];
    
    manipulatePrefs('renewalFees_30days',renewCost30,'set');
    manipulatePrefs('renewalFees_60days',renewCost60,'set');
    manipulatePrefs('renewalFees_90days',renewCost90,'set');
  }
  
  this._30days = manipulatePrefs('renewalFees_30days',renewCost30,'get');
  this._60days = manipulatePrefs('renewalFees_60days',renewCost60,'get');
  this._90days = manipulatePrefs('renewalFees_90days',renewCost90,'get');
  
  // Return the default renewal period 
  return manipulatePrefs('renewalFees_'+renewalPeriod+'days',renewCost60,'get');
}


function getGoldenPackCost(accountType)
{
// Function that returns the cost of purchasing each account type


  switch(accountType)
  {
    // Standard
    case 0: return 0; break;
    
    // Golden
    case 1: return 0; break;
    
    // Emerald
    case 2: return 290; break;
    
    // Sapphire
    case 3: return 290; break;
    
    // Platinum
    case 4: return 490; break;
    
    // Diamond
    case 5: return 490; break;
    
    // Ultimate
    case 6: return 890; break;
    
    // Pioneer
    case 7: return 0; break;
  }

}


function getAutoPayCost(accountType)
{
// Function that returns the autopay cost (per referral) for each account type

  customLogger('||- getAutoPayCost()',2);
  customLogger('accountType = '+accountType,2);
  
  var totalRentedRefs = getNumberOfRefs('Rented');
  var perAutoPayCost = 0;
  
  switch(accountType)
  {
    case 0:
      if(totalRentedRefs < 501) { perAutoPayCost = 0.0085; }
      else if(totalRentedRefs < 1001) { perAutoPayCost = 0.009; }
      else if(totalRentedRefs < 1251) { perAutoPayCost = 0.0095;}
      else if(totalRentedRefs < 1751) { perAutoPayCost = 0.01; }
      else { perAutoPayCost = 0.0105; }
      break;

    case 1:
      if(totalRentedRefs < 501) { perAutoPayCost = 0.006; }
      else if(totalRentedRefs < 751) { perAutoPayCost = 0.0065; }
      else if(totalRentedRefs < 1251) { perAutoPayCost = 0.007; }
      else if(totalRentedRefs < 1501) { perAutoPayCost = 0.0075; }
      else if(totalRentedRefs < 1751) { perAutoPayCost = 0.008; }
      else { perAutoPayCost = 0.008; }
      break;

    case 2:
      if(totalRentedRefs < 501) { perAutoPayCost = 0.006; }
      else if(totalRentedRefs < 751) { perAutoPayCost = 0.0065; }
      else if(totalRentedRefs < 1251) { perAutoPayCost = 0.007; }
      else if(totalRentedRefs < 1501) { perAutoPayCost = 0.0075; }
      else if(totalRentedRefs < 1751) { perAutoPayCost = 0.008; }
      else { perAutoPayCost = 0.008; }
      break;

    case 3:
      if(totalRentedRefs < 751) { perAutoPayCost = 0.006; }
      else if(totalRentedRefs < 1001) { perAutoPayCost = 0.0065; }
      else if(totalRentedRefs < 1501) { perAutoPayCost = 0.007; }
      else if(totalRentedRefs < 1751) { perAutoPayCost = 0.0075; }
      else { perAutoPayCost = 0.008; }
      break;

    case 4:
      if(totalRentedRefs < 501) { perAutoPayCost = 0.006; }
      else if(totalRentedRefs < 751) { perAutoPayCost = 0.0065; }
      else if(totalRentedRefs < 1251) { perAutoPayCost = 0.007; }
      else if(totalRentedRefs < 1501) { perAutoPayCost = 0.0075; }
      else if(totalRentedRefs < 1751) { perAutoPayCost = 0.008; }
      else { perAutoPayCost = 0.008; }
      break;

    case 5:
      if(totalRentedRefs < 1001) { perAutoPayCost = 0.006; }
      else if(totalRentedRefs < 1251) { perAutoPayCost = 0.0065; }
      else if(totalRentedRefs < 1751) { perAutoPayCost = 0.007; }
      else { perAutoPayCost = 0.0075; }
      break;

    case 6:
      if(totalRentedRefs < 1251) { perAutoPayCost = 0.006; }
      else if(totalRentedRefs < 1501) { perAutoPayCost = 0.0065; }
      else { perAutoPayCost = 0.007; }
      break;

    case 7:
      if(totalRentedRefs < 251) { perAutoPayCost = 0.0075; }
      else if(totalRentedRefs < 1001) { perAutoPayCost = 0.008; }
      else if(totalRentedRefs < 1251) { perAutoPayCost = 0.0085; }
      else if(totalRentedRefs < 1751) { perAutoPayCost = 0.009; }
      else { perAutoPayCost = 0.0095; }
      break;
  }
  return perAutoPayCost;
}





function getCurrentPage(requestType)
{
  customLogger('|| - getCurrentPage(requestType)',2);

  var DocumentLocation = document.location.href;

  if(requestType == 'location')
  {
    try {
      var urlVariables = DocumentLocation.split('?')[1].split('&');
      customLogger("DocumentLocation.split('?')[1] = "+ urlVariables,3);
    } catch(err) {
      customLogger('Error = '+err,3);
      customLogger('No URL variables available',3);
    }

    customLogger('urlVariables = '+urlVariables,3);
    // customLogger('urlVariables.toString() = '+urlVariables.toString(),3);
    var currentPage;

    if (urlVariables.indexOf('s=rs') >=  0) {
    customLogger('s=rs, therefore referral statistics',3);
    currentPage = 'refStats';

    } else if (urlVariables.indexOf('RentedRefListings') >=  0) {
      customLogger("indexOf('RentedRefListings'), therefore rented referral listings",3);
      currentPage = 'rentedRefListing';

    } else if (urlVariables.indexOf('u=c') >=  0 && urlVariables.indexOf('s=r') >=  0) {
    customLogger('u=c and s=r, therefore referral listings',3);

      if (urlVariables.indexOf('ss3=1') >=  0) {
        customLogger('ss3=1, therefore direct referral listings',3);
        currentPage = 'directRefListing';
      } else if (urlVariables.indexOf('ss3=2') >=  0) {
        customLogger('ss3=1, therefore direct referral listings',3);
        currentPage = 'rentedRefListing';
      }

    } else if (urlVariables.indexOf('u=v') >=  0) {
    customLogger('u=v, therefore view advertisements page',3);

    } else if (DocumentLocation.indexOf('/v/') >=  0) {
    customLogger('/v/, therefore in the forums',3);
    currentPage = 'viewing an advertisement';

    } else if (DocumentLocation.search(/[\?u=c]$/) >=  0) {
    customLogger('?u=c, therefore account summary (from top bar)',3);
    currentPage = 'accSummary';

    } else if (DocumentLocation.search(/[\?u=c&s=i]$/) >=  0) {
    customLogger('?u=c&s=i, therefore account summary (from sidebar)',3);
    currentPage = 'accSummary';

    } else if (DocumentLocation.indexOf('/rel/bl/') >=  0) {
    customLogger('/rel/bl/, therefore account export data',3);
    currentPage = 'accExport';

    } else if (DocumentLocation.indexOf('/forum/') >=  0) {
    customLogger('/forum/, therefore in the forums',3);
    currentPage = 'forums';

    } else if (DocumentLocation.indexOf('/refstat/') >=  0) {
    customLogger('/refstat/, therefore referral graph',3);
    currentPage = 'referralGraph';

    } else if (DocumentLocation.indexOf('#Neobux2Config') >=  0) {
    customLogger('#Neobux2Config, therefore referral graph',3);
    currentPage = 'scriptConfig';

    } else {
    customLogger('unknown page',3);
    currentPage = 'unknown';
    }

    return currentPage;
  }
  else if(requestType == 'language')
  {
    if(document.body.innerHTML.indexOf(' src="http://neobux.cachefly.net/imagens/band1.png"') > 0)
    {
      customLogger('currentPage.language = "PT"',4);
      return 'PT';
    }
    else if(document.body.innerHTML.indexOf(' src="http://neobux.cachefly.net/imagens/band2.png"') > 0)
    {
      customLogger('currentPage.language = "EN"',4);
      return 'EN';
    }
    else
    {
      GM_log('Error: Defaulting pageLang to EN');
      return 'EN';
    }
  }
}




/** Compares two objects using
 * built-in JavaScript operators. */
function ascend(a, b) {
    if (a < b)
        return -1;
    else if (a > b)
        return 1;
    return 0;
}


/** Returns an object that contains the count, sum,
 * minimum, median, maximum, mean, variance, and
 * standard deviation of the series of numbers stored
 * in the specified array.  This function changes the
 * specified array by sorting its contents. */
function Stats(data) {
    this.count = data.length;

    /* Sort the data so that all seemingly
     * insignificant values such as 0.000000003 will
     * be at the beginning of the array and their
     * contribution to the mean and variance of the
     * data will not be lost because of the precision
     * of the CPU. */
    data.sort(ascend);

    /* Since the data is now sorted, the minimum value
     * is at the beginning of the array, the median
     * value is in the middle of the array, and the
     * maximum value is at the end of the array. */
    this.min = data[0];
    var middle = Math.floor(data.length / 2);
    if ((data.length % 2) != 0) {
        this.median = data[middle];
    }
    else {
        this.median = (data[middle - 1] + data[middle]) / 2;
    }
    this.max = data[data.length - 1];

    /* Compute the mean and variance using a
     * numerically stable algorithm. */
    var sqsum = 0;
    this.mean = data[0];
    for (var i = 1;  i < data.length;  ++i) 
    {
        var x = data[i];
        var delta = x - this.mean;
        var sweep = i + 1.0;
        this.mean += delta / sweep;
        sqsum += delta * delta * (i / sweep);
    }
    this.sum = this.mean * this.count;
    this.variance = sqsum / this.count;
    this.sdev = Math.sqrt(this.variance);
}





/** Returns a string that shows all the properties and
 * their values for this Stats object. */
Stats.prototype.toString = function() {
    var s = 'tu';
    for (var attr in this) 
    {
        if (typeof(this[attr]) != 'function') 
        {
            s += '  ' + attr + ' ' + this[attr];
        }
    }
    return s;
}







// Functions used by script::
function getDaysTilPaidOwnRecycle(indivAvg,currentProfit,expensesPerRefPerDay)
{
  var incomePerRefPerDay = indivAvg * myAccount.referralClickValue;
  var dayCounter = 0;
  var indivProfit = new Array();
  var dayLimit = 30;
  var profitNeeded = myAccount.recycleCost - currentProfit;
  
  // Pre-Calculate the amount of profit that will be made after dayCounter days at indivAvg clicks per day
  do
  {
    dayCounter++;
    indivProfit[dayCounter] = dayCounter * (incomePerRefPerDay - expensesPerRefPerDay);
  } while (dayCounter < dayLimit); 
  
  
  customLogger('incomePerRefPerDay = '+incomePerRefPerDay+'\n'+
  'expensesPerRefPerDay = '+expensesPerRefPerDay+'\n'+
  'currentProfit = '+currentProfit+'\n'+
  'indivProfit = '+indivProfit+'\n'+
  'profitNeeded = '+profitNeeded,7);
  
  // If currentProfit is less than the cost of recycling, return number of days until currentProfit > recycleCost
  // Else return 'N/A' to signify that the referral has already generated enough profit to pay for its own recycle
  if(myAccount.recycleCost > currentProfit)
  {
    // Find the point where projected individual profit will be equal to or greater than 
    // the amount of profit needed to pay for its own recycle
    var numberOfDays = 1;
    while(indivProfit[numberOfDays] < profitNeeded) 
    {
      numberOfDays++;
    } 
    
    // Check whether the numberOfDays is unreasonably large
    // If it is unreasonably large (default max: 30 days), then return a message saying this
    if(numberOfDays > dayLimit) 
    {
      numberOfDays = 'More than '+dayLimit+' days'; 
    }
    
    return numberOfDays;
  }
  else
  {
    return 'N/A';
  }
}

function _duff8() {
  var i = R % 8;
  if( i > 0 ) {
    do {
      /*dummy();*/
    }
    while( --i );
  }
  i = parseInt( R / 8 );
  if( i>0 ) {
    do {
      /*dummy();*/
      /*dummy();*/
      /*dummy();*/
      /*dummy();*/
      /*dummy();*/
      /*dummy();*/
      /*dummy();*/
      /*dummy();*/
    }
    while( --i );
  }
}

function findPos(element)
{
  var obj = element;
  var posX = obj.offsetLeft;
  var posY = obj.offsetTop;

  while(obj.offsetParent)
  {
    posX = posX + obj.offsetParent.offsetLeft;
    posY = posY + obj.offsetParent.offsetTop;
    
    if(obj == document.getElementsByTagName('body')[0])
    {
      break
    }
    else
    {
      obj = obj.offsetParent;
    }
  }
  
return [posX,posY];
}





function localString(key,text) 
{
  var string;
  var language = myAccount.preferences.scriptLanguage;
  
  try {
    if (!scriptLangStrings[language][key]) 
    {
      GM_log('Error getting local string. Requested key: '+key); 
    }
    else 
    {
      string = scriptLangStrings[language][key]; 
      if (text) { string = string.replace('%s', text); }
    }
  } catch(e) {
    GM_log('Error getting local string. Requested key: '+key); 
  }

  return string;
}





function neobuxString(key) 
{
  var pageLanguage = currentPage.language;
  // var pageLanguage = 'EN';
  
  customLogger('key = '+key+'\n'+
  'currentPage.language = '+currentPage.language+'\n'+
  'pageLanguage = '+pageLanguage,11);
  
  if (neobuxLangStrings[pageLanguage][key]) 
  {
    var string = neobuxLangStrings[pageLanguage][key]; 
  }
  else
  {
    GM_log('Error getting neobux string. Requested key: '+key); 
  }

  return string;
}





function manipulatePrefs(pref,defaultValue,type)
{
//return defaultValue;
  if(type == 'set') 
  {
      return GM_setValue(pref,defaultValue); 
    
  }
  else if(type == 'get') 
  {
      if(GM_listValues().indexOf("script"+pref) >=  0)
      {
        return GM_getValue(pref,defaultValue);
      }
      else
      {
        GM_setValue(pref,defaultValue);
        return GM_getValue(pref,defaultValue);
      }
  }
  else
  {
    return defaultValue;
  }
}

// Calculate the number of days since the date 'tmp'
// Will work with the words 'today' & 'yesterday' too
function NumDaysSince (longDate,detail,fullerTimer,shortFormat,column)
{
  if(!shortFormat) { var shortFormat = false; }
  
  customLogger('longDate = ' + longDate + '\n' + 
  'detail = ' + detail + '\n' + 
  'shortFormat = ' + shortFormat + '\n' + 
  'column = ' + column,9);
  
  // var fullerSinceTimer = myAccount.preferences.fullerSinceTimers;
  var fullerSinceTimer = fullerTimer;
  
  // Clean the input string and split it to [0] = date, [1] = time
  var longDate = longDate.replace('&nbsp;','').split(' ');
  
  // If longDate is a date with time (eg, 'owned since' column), longDate[1] == time
  // If longDate is just a date (eg, 'last click' column), longDate.length == 1
  if(longDate.length > 1) 
  {
    var tt = longDate[1].split(":");
  } 
  else 
  {
    var tt = new Array(2);
    tt[0] = "00";
    tt[1] = "00";
  }

  
  if(longDate[0].match(neobuxString('today'))) {
    var Since = new Date( Today.getFullYear(), Today.getMonth(), Today.getDate(), tt[0], tt[1] );
  } 
  else if(longDate[0].match(neobuxString('yesterday'))) {
    var Since = new Date( Yesterday.getFullYear(), Yesterday.getMonth(), Yesterday.getDate(), tt[0], tt[1] );
  } 
  else {
    var Since = new Date(longDate[0] + (longDate.length > 1 ? " " + longDate[1] : ""));
  }
  
  var timeElapsed = '';
  var dateDiff = (Today - Since) / MSPD;
  var wholeDaysOwned = Math.floor(dateDiff);
  var wholeHoursOwned = Math.floor((dateDiff - wholeDaysOwned) * 24);
  var wholeMinsOwned = Math.floor((((dateDiff - wholeDaysOwned) * 24) - wholeHoursOwned) * 60 );
  
  
  if(fullerSinceTimer || detail == 'decimal') 
  {
    if(detail == 'decimal') 
    {
      timeElapsed = dateDiff;
    }
    else if(detail != 'days' && detail != 'hrs' && detail != 'mins' && detail != 'wholeDays' && detail != 'decimal') 
    {
      GM_log('Variable "detail" not valid');
    }
    else
    {
      if(!shortFormat)
      {
        var day_text = ' day';
        var days_text = ' days';
        var hr_text = ' hr';
        var hrs_text = ' hrs';
        var min_text = ' min';
        var mins_text = ' mins';
      }
      else
      {
        var day_text = 'd';
        var days_text = 'd';
        var hr_text = 'h';
        var hrs_text = 'h';
        var min_text = 'm';
        var mins_text = 'm';
      }
      
      var spacer = ', ';
      
      if(detail == 'days' || detail == 'hrs' || detail == 'mins')
      {
        if(wholeDaysOwned != 1) { timeElapsed  += wholeDaysOwned + days_text; } 
        else { timeElapsed  += wholeDaysOwned + day_text; }
      }
      if(detail == 'hrs' || detail == 'mins') 
      { 
        if(wholeHoursOwned != 1) { timeElapsed  += spacer + wholeHoursOwned +  hrs_text; } 
        else { timeElapsed  += spacer + wholeHoursOwned +  hr_text; }
      }
      if(detail == 'mins') 
      {
        if(wholeMinsOwned != 1) { timeElapsed  += spacer + wholeMinsOwned + mins_text; } 
        else { timeElapsed  += spacer + wholeMinsOwned + min_text; }
      }
    }
  }
  
  if((!fullerSinceTimer || detail == 'wholeDays') && detail != 'decimal') 
  {
    timeElapsed = Math.floor(dateDiff);
  }
  
  customLogger('longDate = ' + longDate + '\n' + 
  'detail = ' + detail + '\n' + 
  'dateDiff = ' + dateDiff + '\n' + 
  'wholeDaysOwned = ' + wholeDaysOwned + '\n' + 
  'wholeHoursOwned = ' + wholeHoursOwned + '\n' + 
  'wholeMinsOwned = ' + wholeMinsOwned + '\n' + 
  'timeElapsed =  + ' + timeElapsed,9);

  return timeElapsed;
}





function getRenewalCost(renewalPeriod)
{
  customLogger('renewalPeriod = ' + renewalPeriod,2);
  switch(renewalPeriod)
  {
    case 30:
      return renewCost30;
      break;
    case 60:
      return renewCost60;
      break;
    case 90:
      return renewCost90;
      break;
    default:
      return 0;
      break;
  }
}

// GM_log(GM_listValues());
