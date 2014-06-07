scr_meta=<><![CDATA[
// ==UserScript==
// @name           Neobux 2+
// @description    Calculates the age of referrals and days without click. Displays total clicks,total clicks average and provides detailed income statistics. 
// @include        http://www.neobux.com/?u=c&s*
// @include        https://www.neobux.com/?u=c&s*
// @include        http://www.neobux.com/?u=c
// @include        https://www.neobux.com/?u=c
// @exclude        http://www.neobux.com/?u=c&s=rba
// @exclude        https://www.neobux.com/?u=c&s=rba

// @version        2.1.5
// @updateNote      v2.1.5 = Update to the 2.1.4 fixes: (hopefully) fixed the issue where script wouldn't store number of direct refs


// ==/UserScript==
]]></>.toString();

/*
CHANGELOG:
--27/09/2009 v2.1.5:
* Update to the prematurely uploaded v2.1.4 'fix' which was incomplete & needed more thorough testing 
* The script should now capture the Infinity and NaN errors and display a 'N/A (Error)' or  instead

--27/09/2009 v2.1.4:
* Semi-Major bug fix: fixed issue where script wouldn't store number of direct refs

-- 25/09/2009 v2.1.3:
* Minor bug fix: Corrected the 5 & 3 day averages

-- 19/09/2009 v2.1.2:
* Moved position of 'var refGraphLength = 10;' so that it is defined before all of script which should hopefully fix the problems that ultimates were having

-- 18/09/2009 v2.1.1:
* Fixed the error where setting the interval higher that 7 via the menu would cause an error
* Credit for finding the bug & providing a fix: Lehoi

-- 17/09/2009 v2.1.0:
* Partial fix to account for change to 7-day graphs
* Added autoupdater

-- 07/09/2009 v2.0.0: 
* Due to the YouCubez ad being on the left-hand side, I've moved it over to the right-hand side.. This allows everybody to view it..
* I've added a fix that will allow the script to detect how many referrals you have in total - it requires a visit to your 'Rented' and 'Direct' referral pages though..

--> Known bugs: 
* 'Net' in the 'last 15 days' section removed due to it only taking into account the last 15 days expenses but only 10 days income .. will be added back in one of the next updates
*/


var debug = false;
if(!debug) { function GM_log() {}; }

// TODO:
// - Maybe have language variables included as a @require?
// --> Other ideas
// - Clean up code
// - Clean up appearence of script on pages
// - Sleep
// - Make a YouCubez and non- YouCubez version
// --> Most likely set it as an option...


// Language Strings
var lang_totalClickAvg = "Total Click Avg.";
var lang_lastdaysClickAvg = "Click Avg.";
var lang_totalClicks = "Total Clicks";
var lang_clickedToday = "Clicked Today";
var lang_clickedYday = "Clicked Yesterday";
var lang_others = "Others";
var lang_dailyNetIncome = "Daily Net Income";
var lang_dailyAvgIncome = "Daily Avg. Income";
var lang_dailyAvgExpenses = "Daily Avg. Expenses";
var lang_dailyAvgTransfers = "Daily Avg. Tra.";
var lang_statsSum = "Statistics Summary";
var lang_today = "Today";
var lang_yesterday = "Yesterday";
var lang_rented = "Rented";
var lang_direct = "Direct";
var lang_clicks = "Clicks";
var lang_avg = "Average";
var lang_ravg = "R.Average";
var lang_avgs = "Averages";
var lang_expenses = "Expenses";
var lang_recycle = "Recycle";
var lang_autopay = "Autopay";
var lang_renew = "Renew";
var lang_net = "Net";
var lang_last15daysSums = "Last 15 Days Totals";
var lang_recycled = "Recycled";
var lang_autopaid = "Autopaid";
var lang_updateScript = "Update Script";
var lang_refferal2RenewCounts = "Referrals to be Renewed";
var lang_recycledLast15days = "Recycled in Last 15 Days";
var lang_autopaidLast15days = "Autopaid in Last 15 Days";
var lang_dailyAvgEarnings = "Daily Avg. Earnings";
var lang_setAVGDays = "Set Days value for Average Interval";
var lang_avgDaysMsg = "Please enter days value for Averages.";
var lang_showSTDDEV = "Show Standard Deviation";
var lang_on = "On";
var lang_off = "Off";
//var updtlinkEN = "http://userscripts.org/scripts/source/49339.user.js";
// End Language Strings

var refGraphLength = 10;

var MSPD = 86400000; //MilliSeconds Per Day
var Today = new Date();
var Yesterday = new Date()
Yesterday.setDate(Today.getDate() - 1);
var english = true;


var currentPageLocation = window.location.href;

if (currentPageLocation.indexOf('s=r') > 0 && !(currentPageLocation.indexOf('sp=1') > 0)) { 
  if (currentPageLocation.indexOf('ss3=2') > 0) { 
    // Get # of rented refs
    GM_log('Get # of rented refs');
    var NoOfRefsString = document.evaluate('//h1[contains(.,"REFERRALS")]',
          document,
            null,
           XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
           null).snapshotItem(0);

    //GM_log('NoOfRefsString = '+NoOfRefsString);
    GM_log('NoOfRefsString.textContent = '+NoOfRefsString.textContent);
    var NoRentedRefs;
      if(NoOfRefsString.textContent.match(/\d+/)) {
        NoRentedRefs = parseInt(NoOfRefsString.textContent.match(/\d+/));
      } else {
        NoRentedRefs = 0;
      }

    GM_setValue("neobux2_NoRentedRefs",NoRentedRefs);
    GM_log("neobux2_NoRentedRefs = "+NoRentedRefs);
    
  } else if (currentPageLocation.indexOf('ss3=1') > 0) { 

    var NoOfRefsString = document.evaluate('//h1[contains(.,"REFERRALS")]',
          document,
            null,
           XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
           null).snapshotItem(0);
           
    GM_log('NoOfRefsString.textContent = '+NoOfRefsString.textContent);
    
    var NoDirectRefs;
      if(NoOfRefsString.textContent.match(/\d+/)) {
        NoDirectRefs = parseInt(NoOfRefsString.textContent.match(/\d+/));
      } else {
        NoDirectRefs = 0;
      }
    
    GM_setValue("neobux2_NoDirectRefs",NoDirectRefs);
    GM_log("neobux2_NoDirectRefs = "+NoDirectRefs);
  }
}

////// ***** START ACTUAL CODE ***** ///////

// Set default values to zero
var accType = 0;
accType = findAccType();

var directRefs;
var stats = true;
var self = false;
var sumDirectIncome = 0;
var directIncome = 0;
var directIncome5 = 0;
var directIncome3 = 0;
var sumRentedIncome = 0;
var rentedIncome = 0;
var rentedIncome5 = 0;
var rentedIncome3 = 0;
var recycleCost = 0;
var autopayCost = 0;
var autoPay = 0;
var autoPay5 = 0;
var autoPay10 = 0;
var recyclePay = 0;
var recyclePay5 = 0;
var recyclePay10 = 0;
var directClicksYday = 0;
var rentedClicksYday = 0;
var autoPayCostYday = 0;
var recycleCostYday = 0;
var renewCostYday = 0;
var directClicksTday = 0;
var rentedClicksTday = 0;
var autoPayCostTday = 0;
var recycleCostTday = 0;
var renewCostTday = 0;
var recycledIn15days = 0;
var autopaidIn15days = 0;
var perRecycleCost = 0.08;
var todayClickers = 0;
var ydayClickers = 0;
var otherClickers = 0;
var totalrenewCost = 0;
var left7 = 0;
var left30 = 0;
var left60 = 0;
var left90 = 0;
var left90plus = 0;
var leftAuto = 0;

var refClickMultiplier = 0.005;
var selfClickMultiplier = 0.01;

// Find which page the script is currently running on
if(window.location.href.match('ss3=2')) {
  directRefs = false;
  stats = false;
}
if(window.location.href.indexOf('s=r&') > 0 && window.location.href.indexOf('ss3=1') > 0) {
  directRefs = true;
  stats = false;
}
if(window.location.href.indexOf('s=rs')>0) {
  directRefs = false;
  stats = true;
}
if(window.location.href.indexOf('u=c&s=i')>0 || window.location.href.match('u=c'+'$')==('u=c')) {
  self = true;
}

GM_log('directRefs = '+directRefs);
GM_log('stats = '+stats);
GM_log('self = '+self);

if(!stats) {
  var mainTable = document.evaluate('//td[@class="bgt"]/ancestor::tbody[1]',
      document,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null).snapshotItem(0);
      
  var rows = mainTable.getElementsByTagName('tr');
  english = true;
  if(rows[0].childNodes[1].innerHTML.match('Referido')) english = false;
}

// Define which columns we need to look in to find the correct info
if(directRefs) {
  var col_AVG = 6;
  var col_CLICKS = 5;
  var col_LAST = 4;  
  var col_SINCE = 3;
} else {
  var col_AVG = 8;
  var col_CLICKS = 7;  
  var col_LAST = 6;
  var col_SINCE = 4;  
}

var clickSum = 0;
var grandAVG = 0;
var refCount = 0;
var infoLabel = null;
var statsXML = "";
var last7daysAvg = 0;
var avgdayinterval = 7;
var showstddev = GM_getValue("neobux2showstddev");
var avginttemp = GM_getValue("neobux2avginterval");

if(typeof avginttemp != "undefined") {
  avgdayinterval = avginttemp;
}

function avgdaysCommand() {
  avgdayinterval = prompt(lang_avgDaysMsg,avgdayinterval);
  try{
    if((avgdayinterval>1) && (avgdayinterval <= refGraphLength)) {
      avgdayinterval = parseInt(avgdayinterval);
      GM_setValue("neobux2avginterval",avgdayinterval);
      location.reload();
    }
  }catch(err) {
  }
};

function stddevCommand() {
  if(typeof showstddev=="undefined") {
    GM_setValue("neobux2showstddev",false);
    showstddev = false;
  } else if(showstddev) {
    GM_setValue("neobux2showstddev",false);
    showstddev = false;
  } else {
    GM_setValue("neobux2showstddev",true);
    showstddev = true;
  }
  location.reload();
}

// mathematical function.. calc num^2
function square(num) {
  return num*num;
};

if(!stats) {
// if(!stats) 
GM_log("'stats' = false");

  GM_registerMenuCommand('Neobux 2+:'+lang_setAVGDays, avgdaysCommand);
  GM_registerMenuCommand('Neobux 2+:'+lang_showSTDDEV+" [ "+(showstddev?lang_on:lang_off)+" ] ", stddevCommand);
  var avgIndex = 0;
  var refClickAvgs = new Array();
  var refClickSTDDEVs = new Array();
  var lastdaysAvgSum = 0;
  if(accType==6) {
    var tmpCount = 0;
    var scripts = document.getElementsByTagName("script");
    var mtxCode = "";
    for(var x = 0;x < scripts.length;x++) {
      if(scripts[x].innerHTML.indexOf("var mtx=") > -1) {
        mtxCode = scripts[x].innerHTML;
        var delimIndex = mtxCode.indexOf(";");
        mtxCode = mtxCode.substring(0,delimIndex);
        break;
      }
    }
    eval(mtxCode);
    
    for(var i = 0;i<mtx.length;i++) {
      var clickData = mtx[i][14];
      if(clickData!=0) {
        tmpCount = 0;
        for(var j = (refGraphLength - avgdayinterval); j<refGraphLength; j++) {
          tmpCount = tmpCount + parseInt(clickData.substring(j,j+1));
        }
        refClickAvgs.push(tmpCount/avgdayinterval);
        tmpCount = 0;
        for(var j = (refGraphLength - avgdayinterval); j<refGraphLength; j++) {
          tmpCount = tmpCount + square(parseInt(clickData.substring(j,j+1))-refClickAvgs[refClickAvgs.length-1]);
        }
        refClickSTDDEVs.push(Math.sqrt(tmpCount/(avgdayinterval-1)));
      } else {
        refClickAvgs.push(0);
        refClickSTDDEVs.push(0);
      }
      lastdaysAvgSum = lastdaysAvgSum - (-refClickAvgs[i]);
    }
    lastdaysAvg = lastdaysAvgSum/mtx.length;
  }
  
  
  for(var i=1; i<rows.length; i++) {
    
    if(rows[i].childNodes.length < 7) {
      if(rows[i].childNodes.length==1 && rows[i].childNodes[0].innerHTML=='&nbsp;') {
        rows[i].childNodes[0].style.backgroundImage = "url('http://img199.imageshack.us/img199/9953/graybg.png')";
        rows[i].childNodes[0].style.height= "25px";
        var tempHTML = "<font style='font-size:9px;color:#FFFFFF;font-weight:bold;'>&nbsp;|&nbsp; "+lang_totalClicks+" : "+clickSum+
        "&nbsp;|&nbsp; "+lang_totalClickAvg+" : "+formatDec((grandAVG/refCount),3);
        
        if(accType==6) { tempHTML = tempHTML + "&nbsp;|&nbsp; "+lang_lastdaysClickAvg+" ("+avgdayinterval+") : "+formatDec(lastdaysAvg,3); }
        
        tempHTML = tempHTML + "&nbsp;| &nbsp;"+lang_clickedToday+" : " + todayClickers+
        "&nbsp;| &nbsp;"+lang_clickedYday+": " + ydayClickers+
        "&nbsp;| &nbsp;"+lang_others+" : " + otherClickers+
        "</font>";
        
        rows[i].childNodes[0].innerHTML = tempHTML;
      }
      continue;  
    } else {
      avgIndex++;
    }
        
    var tmpDate = rows[i].childNodes[col_SINCE].innerHTML.replace('&nbsp;','');
    var numDays = Math.max(1,NumDaysSince(tmpDate));
    rows[i].childNodes[col_SINCE].innerHTML = "" + tmpDate + "<font style='font-size:9px;color:#777777'> (" + numDays + ")</font>";
    
    if((rows[i].childNodes[col_AVG].innerHTML.indexOf("-.---"))<0) {
      grandAVG = grandAVG - (-(rows[i].childNodes[col_AVG].innerHTML.replace('&nbsp;','')));
      clickSum = clickSum - (-(rows[i].childNodes[col_CLICKS].innerHTML.replace('&nbsp;','')));
      refCount++;
    }
    
    var tmpDateLastClick = rows[i].childNodes[col_LAST].innerHTML.replace('&nbsp;','');
    
    if(tmpDateLastClick.match('No clicks') || tmpDateLastClick.match('Sem cliques')) {
      var inactiveDays = numDays;
    } else {
      var inactiveDays = NumDaysSince(tmpDateLastClick);
    }
    rows[i].childNodes[col_LAST].innerHTML = "" + tmpDateLastClick + "<font style='font-size:9px;color:#777777'> [" + inactiveDays + "]</font>";
    
    if(accType==6) {
      rows[i].childNodes[col_AVG].innerHTML = rows[i].childNodes[col_AVG].innerHTML+"/ "+formatDec(refClickAvgs[avgIndex-1],3);
      if(showstddev) {
        rows[i].childNodes[col_AVG].innerHTML = rows[i].childNodes[col_AVG].innerHTML +"/ "+formatDec(refClickSTDDEVs[avgIndex-1],3);
      }
    }
    
    if(inactiveDays==0) { todayClickers++; }
      else if(inactiveDays==1) { ydayClickers++; }
      else { otherClickers++; }
  }
  //GM_log(clickSum+"    "+(grandAVG/refCount));
  
} 
  else {
// 'stats' = not false
GM_log("'stats' = not false");

  // Grob the embeds that have a height='140'
  // these embeds are the 'big' graphs (NOT the projected average graphs)
  var xpathEmbeds = "//embed[@height='140']";
  var embeds2 = document.evaluate(xpathEmbeds,
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null );

  var embeds = new Array();

  for(i=0; i<embeds2.snapshotLength; i++) { embeds[i] = embeds2.snapshotItem(i); }


  var statCount = 0;
  for(var i = 0;i < 7 && i <embeds.length ;i++) {
    if(self) {
    GM_log('showAvgStats(embeds[i],i) : i = '+i);
      showAvgStats(embeds[i],i);
    } else {
    GM_log('showAvgStats(embeds[i],statCount) : statCount = '+statCount);
      showAvgStats(embeds[i],statCount);
      statCount ++;
    }
  }

//end


  var netRentedIncome = rentedIncome-(autoPay+recyclePay);
  var netRentedIncome5 = rentedIncome5-(autoPay5+recyclePay5);
  var netrentedIncome3 = rentedIncome3-(autoPay10+recyclePay10);
  if(!self) {
    GM_log('if(!self)');
    //alert(netRentedIncome-(-directIncome));
    GM_log('embeds.length = '+embeds.length);
      var masterTable = document.getElementById(embeds[0].id+"Div").parentNode.parentNode.parentNode;
      var newRow = document.createElement("TR");
      newRow.style.height = "15px";
      var newCol = document.createElement("TD");
      newCol.colSpan = 2;
      newCol.style.backgroundColor = "#c1f5c1";
      newCol.style.fontFamily = "verdana";
      newCol.style.fontWeight = "bold";
      newCol.style.height = "20px";
      newCol.style.fontSize = "9px";
      newCol.style.border = "1px solid #aaaaaa";
      newCol.style.backgroundImage = "url('http://img199.imageshack.us/img199/9953/graybg.png')";
      newCol.style.width = "170px";
      newCol.style.textAlign = "left";
      newCol.style.verticalAlign = "middle";
      newRow.appendChild(newCol);
      newCol.innerHTML = " &nbsp;<font style='font-size:9px;color:#ffffff'>&nbsp; "+lang_dailyNetIncome+" : &nbsp;(15)&nbsp; $"+ 
      formatDec(((netRentedIncome-(-directIncome))+""),3)+" &nbsp;(10) &nbsp;$"+
      formatDec(((netrentedIncome3-(-directIncome3))+""),3)+" &nbsp;(5) &nbsp;$"+
      formatDec(((netRentedIncome5-(-directIncome5))+""),3)+"</font>";
      masterTable.appendChild(newRow);
      //addDonation(masterTable);
    

// kwah //

  var xpath = '//h1[contains(.,"REFERRALS")]';
  var xpathResult = document.evaluate(xpath,
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null ).snapshotItem(0);

  GM_log('xpathResult.snapshotLength='+xpathResult.snapshotLength);
  // GM_log('xpathResult.parentNode = '+xpathResult.parentNode);

        infoLabel = document.createElement("TD");
        infoLabel.style.verticalAlign = "top";
        infoLabel.style.paddingTop = "15px";
        infoLabel.style.paddingLeft = "4px";
        infoLabel.style.height = "535px";
        infoLabel.style.width = "170px";
        infoLabel.style.backgroundImage = "url('http://img267.imageshack.us/img267/2784/statbg.png')";
        infoLabel.style.backgroundRepeat = "no-repeat";
        infoLabel.style.marginLeft = "40px";
        
        
        var avg_today = formatDec(((rentedClicksTday-(-directClicksTday))/getRefCount()),3);
        if (isNaN(avg_today)) { avg_today = '<i>N/A (Error)</i>'; }
          else if (!isFinite(avg_today)) { avg_today = '<i>N/A (zero refs)</i>'; }
        var avg_yesterday = formatDec(((rentedClicksYday-(-directClicksYday))/getRefCount()),3);
        if (isNaN(avg_yesterday)) { avg_yesterday = '<i>N/A (Error)</i>'; }
          else if (!isFinite(avg_yesterday)) { avg_yesterday = '<i>N/A (zero refs)</i>'; }
        
        var ravg_today = formatDec(((rentedClicksTday-(-directClicksTday)-(recycleCostTday*100))/getRefCount()),3);
        if (isNaN(ravg_today)) { ravg_today = '<i>N/A (Error)</i>'; }
          else if (!isFinite(ravg_today)) { ravg_today = '<i>N/A (zero refs)</i>'; }
        var ravg_yesterday = formatDec(((rentedClicksYday-(-directClicksYday)-(recycleCostYday*100))/getRefCount()),3);
        if (isNaN(ravg_yesterday)) { ravg_yesterday = '<i>N/A (Error)</i>'; }
          else if (!isFinite(ravg_yesterday)) { ravg_yesterday = '<i>N/A (zero refs)</i>'; }
        
        infoLabel.innerHTML = "<font style='font-size:10px;color:#444444'><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+lang_statsSum+"<br/>"+
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total Referrals: "+getRefCount()+"</b>"+
        "<font style='font-size:9px;'><br></br>"+
        "<font style='font-size:9px;color:#aaaaaa'>"+
        "<br><b>[ "+lang_today+" ]</b></font><b> - "+lang_net+" : $"+formatDec(((((rentedClicksTday-(-directClicksTday))*refClickMultiplier)-(recycleCostTday-(-autoPayCostTday)-(-renewCostTday)))),3)+"</b></br>"+
        "<hr width= '155px' height='1px' color='#cccccc'/>"+
        "<b> - "+lang_clicks+"</b></br>"+
        "<br> &nbsp;&nbsp;- "+lang_rented+" : "+rentedClicksTday+"</br>"+
        "<br> &nbsp;&nbsp;- "+lang_direct+" : "+directClicksTday+"</br>"+
        "<br> &nbsp;&nbsp;- "+lang_avg+" : "+avg_today+"</br>"+
        "<br> &nbsp;&nbsp;- "+lang_ravg+" : "+ravg_today+"</br>"+
        "<br><b> - "+lang_expenses+"</b></br>"+
        "<br> &nbsp;&nbsp;- "+lang_recycle+" : $"+recycleCostTday+"</br>"+
        "<br> &nbsp;&nbsp;- "+lang_autopay+" : $"+autoPayCostTday+"</br>"+
        "<br> &nbsp;&nbsp;- "+lang_renew+" : $"+renewCostTday+"</br>"+
        "<br><font style='font-size:9px;color:#aaaaaa'><br/><b>[ "+lang_yesterday+" ]</b></font><b> - "+lang_net+" : $"+formatDec(((((rentedClicksYday-(-directClicksYday))*refClickMultiplier)-(recycleCostYday-(-autoPayCostYday)-(-renewCostYday)))),3)+"</b></br>"+
        "<hr width= '155px' height='1px' color='#cccccc'/>"+
        "<b> - "+lang_clicks+"</b></br>"+
        "<br> &nbsp;&nbsp;- "+lang_rented+" : "+rentedClicksYday+"</br>"+
        "<br> &nbsp;&nbsp;- "+lang_direct+" : "+directClicksYday+"</br>"+
        "<br> &nbsp;&nbsp;- "+lang_avg+" : "+avg_yesterday+"</br>"+
        "<br> &nbsp;&nbsp;- "+lang_ravg+" : "+ravg_yesterday+"</br>"+
        "<br><b> - "+lang_expenses+"</b></br>"+
        "<br> &nbsp;&nbsp;- "+lang_recycle+" : $"+recycleCostYday+"</br>"+
        "<br> &nbsp;&nbsp;- "+lang_autopay+" : $"+autoPayCostYday+"</br>"+
        "<br> &nbsp;&nbsp;- "+lang_renew+" : $"+renewCostYday+"</br>"+
        "<br><font style='font-size:9px;color:#aaaaaa'><br><b>[ "+lang_last15daysSums+" ]</b></font>"+
        "<hr width= '155px' height='1px' color='#cccccc'/>"+
        "<b> - "+lang_recycle+" : </b>$"+formatDec(recycleCost,3)+
        "<br><b> - "+lang_autopay+" : </b>$"+formatDec(autopayCost,3)+
        "<br><b> - "+lang_renew+" : </b>$"+formatDec(totalrenewCost,3)+
        "<br><b> - "+lang_recycled+" : </b>"+formatDec((recycledIn15days),0)+    //" &nbsp;["+perRecycleCost+"]</br>"+
        "<br><b> - "+lang_autopaid+" : </b>"+formatDec((autopaidIn15days),0)+    //" &nbsp;["+getAutoPayCost()+"]</br>"+
        //"<br><b> - "+lang_net+" : </b>$"+formatDec(((sumRentedIncome-(-sumDirectIncome))-(recycleCost-(-autopayCost)-(-totalrenewCost))),3)+"</br>"+
        "<p/>";
        

//// *** INSERT STATISTICS SUMMARY INTO PAGE *** ////
  // var locationToInsert = xpathResult.parentNode.parentNode.parentNode.parentNode.parentNode.childNode[0]; // left hand side // NOT WORKING YET
  // var locationToInsert = xpathResult.parentNode.parentNode.parentNode.parentNode.parentNode; // right hand side
  var locationToInsert = xpathResult.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode; // right hand side
  locationToInsert.appendChild(infoLabel);
  
  //// enlarge the width of the page to accomodate the extra column and add a little padding to make it look nicer ////
  locationToInsert.parentNode.parentNode.removeAttribute('width');
  locationToInsert.parentNode.parentNode.setAttribute('cellspacing','5px');

        // stats in xml format
        statsXML="&lt;neostats&gt;n"+
        "&lt;datetime&gt;"+Today.getTime()+"&lt;/datetime&gt;n"+
        "&lt;today&gt;n"+
        "&lt;clicks&gt;n"+
        "&lt;rented&gt;"+rentedClicksTday+"&lt;/rented&gt;n"+
        "&lt;direct&gt;"+directClicksTday+"&lt;/direct&gt;n"+
        "&lt;avg&gt;"+((rentedClicksTday-(-directClicksTday))/getRefCount())+"&lt;/avg&gt;n"+
        "&lt;realavg&gt;"+((rentedClicksTday-(-directClicksTday)-(recycleCostTday*100))/getRefCount())+"&lt;/realavg&gt;n"+
        "&lt;/clicks&gt;n"+
        "&lt;expenses&gt;n"+
        "&lt;recycle&gt;"+recycleCostTday+"&lt;/recycle&gt;n"+
        "&lt;autopay&gt;"+autoPayCostTday+"&lt;/autopay&gt;n"+
        "&lt;renew&gt;"+renewCostTday+"&lt;/renew&gt;n"+
        "&lt;/expenses&gt;n"+
        "&lt;/today&gt;n"+
        "&lt;yesterday&gt;n"+
        "&lt;clicks&gt;n"+
        "&lt;rented&gt;"+rentedClicksYday+"&lt;/rented&gt;n"+
        "&lt;direct&gt;"+directClicksYday+"&lt;/direct&gt;n"+
        "&lt;avg&gt;"+((rentedClicksYday-(-directClicksYday))/getRefCount())+"&lt;/avg&gt;n"+
        "&lt;realavg&gt;"+((rentedClicksYday-(-directClicksYday)-(recycleCostYday*100))/getRefCount())+"&lt;/realavg&gt;n"+
        "&lt;/clicks&gt;n"+
        "&lt;expenses&gt;n"+
        "&lt;recycle&gt;"+recycleCostYday+"&lt;/recycle&gt;n"+
        "&lt;autopay&gt;"+autoPayCostYday+"&lt;/autopay&gt;n"+
        "&lt;renew&gt;"+renewCostYday+"&lt;/renew&gt;n"+
        "&lt;/expenses&gt;n"+
        "&lt;/yesterday&gt;n"+
        "&lt;/neostats&gt;";;

  }
}

var to = null;
// Need to look at this function to figure out exactly what it does...
function addDonation(master) {
  var donMsg = "Support Neobux 2+";
  var dataDiv = document.createElement("DIV");
    dataDiv.id ="datadiv";
    dataDiv.style.visibility= "hidden";
    dataDiv.innerHTML=statsXML;
  document.body.appendChild(dataDiv);
  
    var donCode = "<script>new Tip('xmlbtn', 'XML',{style:'darkgrey',width:'auto',stem:'topMiddle',delay:'0',hook:{tip:'topMiddle',target:'bottomMiddle'}});</script>"+
    "<img id='xmlbtn' src='http://img217.imageshack.us/img217/4053/exporttoxml.gif'/ onclick="+
    "var w = window.open();var dd = document.getElementById('datadiv');w.document.writeln('<pre>'+dd.innerHTML+'</pre>');"+
    ">&nbsp;&nbsp;&nbsp;"+
    "<a href="+updtlinkEN+"><img id ='updtBtn' border='0' src='http://img517.imageshack.us/img517/4164/updater.png'></a>"+
    "<script>new Tip('updtBtn', '"+lang_updateScript+"',{style:'darkgrey',width:'auto',stem:'topMiddle',delay:'0',hook:{tip:'topMiddle',target:'bottomMiddle'}});</script>"+
    "&nbsp;&nbsp;&nbsp;<form action='https://www.paypal.com/cgi-bin/webscr' method='post'><input type='hidden' name='cmd' value='_s-xclick'>"+
    "<input type='hidden' name='encrypted' value='-----BEGIN PKCS7-----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-----END PKCS7-----'><input type='image' id='donationbtn' src='http://img39.imageshack.us/img39/9104/paypalicon.gif' border='0' name='submit'><script>new Tip('donationbtn', '"+donMsg+"',{style:'darkgrey',width:'auto',stem:'topMiddle',delay:'0',hook:{tip:'topMiddle',target:'bottomMiddle'}});</script><img alt='' border='0' src='https://www.paypal.com/en_US/i/scr/pixel.gif' width='1' height='1'></form>";
  
  var donDiv = document.createElement("DIV");
    donDiv.style.textAlign = "center";
    donDiv.innerHTML = donCode;
  master.appendChild(donDiv);
}

function showAvgStats(embed,index) {
// GM_log('index = '+index);
  var statDiv = document.getElementById(embed.id+"Div");
  var setSum = 0;
  var setSum10days = 0;
  var setSum5days = 0;
  var setSum3days = 0;
  var statFlashVars = embed.getAttribute("flashvars");
  var alterIndex = statFlashVars.indexOf("<set");
  var setXML = statFlashVars.substring(alterIndex,statFlashVars.length);

  if(index == 6) {
    var xmlTmp = "";
    while(setXML.indexOf("<vLine")>-1) {
      var vline = setXML.indexOf("<vLine");
      xmlTmp = xmlTmp + setXML.substring(0,vline);
      setXML = setXML.substring(vline,setXML.length);
      var setIndex = setXML.indexOf("<set");
      setXML = setXML.substring(setIndex,setXML.length);
    }
    setXML = xmlTmp + setXML;
  }
  
  if(statFlashVars.indexOf("<trendLines>")>-1) { alterIndex = setXML.indexOf("<trendLines>"); }
    else { alterIndex = setXML.indexOf("<styles>"); }

  setXML = setXML.substring(0,alterIndex);
  setXML = setXML.replace(/\/>/g,">_</set>");
  setXML = "<data>"+setXML+"</data>";

  var parser = new DOMParser();
  var doc = parser.parseFromString(setXML,"text/xml");
  var docRoot = doc.childNodes[0];
  
  if(docRoot.tagName == "data") {
    var sets = docRoot.getElementsByTagName("set");
    var apLimit = getAutoPayLimit();
    
    for(var i=0; i < sets.length; i++) {
    // GM_log('i = '+i);
    
      if(index == 6) {
        // GM_log('index == 6');
        var refs = + parseInt(sets[i].getAttribute("value")*1000)/1000;
        
        if(i<7) { left7 = left7 + refs; }
        
        if(i<apLimit) { leftAuto = leftAuto + refs; }
        else if(i<30) { left30 = left30 + refs; }
        else if(i<60) { left60 = left60 + refs; }
        else if(i<90) { left90 = left90 + refs; }
        else { left90plus = left90plus + refs; }
        
      } else {
        // GM_log('else: index !== 6');
        if(i<refGraphLength && i>=(refGraphLength-5)) { 
          setSum5days = setSum5days + parseInt(sets[i].getAttribute("value")*1000)/1000; 
          GM_log('setSum5days = '+setSum5days); 
        }
        if(i<refGraphLength && i>=(refGraphLength-3)) { 
          setSum3days = setSum3days + parseInt(sets[i].getAttribute("value")*1000)/1000; 
          GM_log('setSum3days = '+setSum3days);
        }
        
        if(i == (refGraphLength-2)) { // refGraphLength-2 = yesterday (counting starts from 0)
          switch(index) {
            case 0: directClicksYday = parseInt(sets[i].getAttribute("value")*1000)/1000; break;
            case 1: rentedClicksYday = parseInt(sets[i].getAttribute("value")*1000)/1000; break;
            GM_log('directClicksYday = '+directClicksYday);
            GM_log('rentedClicksYday = '+rentedClicksYday);
          }
          
        } else if(i == (refGraphLength-1)) {// refGraphLength-1 = today (counting starts from 0)
          switch(index) {
            case 0: directClicksTday = parseInt(sets[i].getAttribute("value")*1000)/1000; break;
            case 1: rentedClicksTday = parseInt(sets[i].getAttribute("value")*1000)/1000; break;
            GM_log('directClicksYday = '+directClicksYday);
            GM_log('rentedClicksYday = '+rentedClicksYday);
          }
          
        } else if(i == 14) {
          setSum10days = setSum10days + parseInt(sets[i].getAttribute("value")*1000)/1000;
          switch(index) {
            case 2: recycleCostTday = parseInt(sets[i].getAttribute("value")*1000)/1000; break;
            case 3: autoPayCostTday = parseInt(sets[i].getAttribute("value")*1000)/1000; break;
            case 4: renewCostTday = parseInt(sets[i].getAttribute("value")*1000)/1000; break;
            GM_log('recycleCostTday = '+recycleCostTday);
            GM_log('autoPayCostTday = '+autoPayCostTday);
            GM_log('renewCostTday = '+renewCostTday);
          }
          
        } else if(i == 13) {
          setSum10days = setSum10days + parseInt(sets[i].getAttribute("value")*1000)/1000;
          switch(index) {
            case 2: recycleCostYday = parseInt(sets[i].getAttribute("value")*1000)/1000; break;
            case 3: autoPayCostYday = parseInt(sets[i].getAttribute("value")*1000)/1000; break;
            case 4: renewCostYday = parseInt(sets[i].getAttribute("value")*1000)/1000; break;
            GM_log('recycleCostTday = '+recycleCostTday);
            GM_log('autoPayCostTday = '+autoPayCostTday);
            GM_log('renewCostTday = '+renewCostTday);
          }
        }
        
        setSum = setSum + parseInt(sets[i].getAttribute("value")*1000)/1000;
        GM_log('setSum = '+setSum);
      }
    }
    
    if(index == 4) { totalrenewCost = setSum; }
    
    var avgLabel = document.createElement("DIV");
      avgLabel.style.width = "318px";
      avgLabel.style.height = "14px";
      avgLabel.style.fontFamily = "verdana";
      avgLabel.style.fontWeight = "bold";
      avgLabel.style.fontSize = "9px";
      avgLabel.style.color = "#555555";
      avgLabel.style.textAlign = "left";
      avgLabel.style.borderLeft = "1px solid #aaaaaa";
      avgLabel.style.borderRight = "1px solid #aaaaaa";
      avgLabel.style.borderBottom = "1px solid #aaaaaa";
      avgLabel.style.backgroundColor = "#ffdd00";
      avgLabel.style.backgroundImage = "url('http://img200.imageshack.us/img200/5423/yellowbg.png')";
      avgLabel.style.top = statDiv.style.height;
      statDiv.style.height = (parseInt(statDiv.style.height)-(-20))+"px";
      avgLabel.style.color = "#444444";
    
    if(index < 2) { // direct & rented ref graphs
      avgLabel.innerHTML = "&nbsp;"+lang_avgs+" :&nbsp; ("+refGraphLength+") &nbsp;" + formatDec((setSum / refGraphLength),3)+"  &nbsp;(5) &nbsp;"+formatDec((setSum5days / 5),3)+"  &nbsp;(3) &nbsp;"+formatDec((setSum3days / 3),3)+"&nbsp;";
      statDiv.appendChild(avgLabel);
    }
    
    var dailyEarnLabel = dailyEarnLabel = document.createElement("DIV");
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
      dailyEarnLabel.style.backgroundImage = "url('http://img51.imageshack.us/img51/3718/greenbgv.png')";
      dailyEarnLabel.style.top = statDiv.style.height;
      statDiv.style.height = (parseInt(statDiv.style.height)-(-20))+"px";
      dailyEarnLabel.style.color = "#444444";
    
    var earnStr = "";
    
    if(!self) {
      if(index < 2) {
        switch(accType) {
          case 0:
            refClickMultiplier = 0.005; break;
          case 1:
            refClickMultiplier = 0.01; break;
          default:
            refClickMultiplier = 0.01; 
        }
        
        earnStr = " &nbsp;"+lang_dailyAvgIncome+" : ("+refGraphLength+") $" + formatDec(((setSum / refGraphLength)*refClickMultiplier),3)+
        " &nbsp;(5) &nbsp;$"+formatDec(((setSum5days / 5)*refClickMultiplier),3)+
        " &nbsp;(3) &nbsp;$"+formatDec(((setSum3days / 3)*refClickMultiplier),3);
        
        if(index == 0) {          //direct
          sumDirectIncome = setSum*refClickMultiplier;
          directIncome = (setSum / refGraphLength)*refClickMultiplier;
          directIncome5 = (setSum5days / 5)*refClickMultiplier;
          directIncome3 = (setSum3days / 3)*refClickMultiplier;
        } else {              //rented
          sumRentedIncome = setSum*refClickMultiplier;
          rentedIncome = (setSum / refGraphLength)*refClickMultiplier;
          rentedIncome5 = (setSum5days / 5)*refClickMultiplier;
          rentedIncome3 = (setSum3days / 3)*refClickMultiplier;
        }
        
      } else {
        // !(index <2)
        if(index < 5) { // red bar on recycle & autopay & one more month
          earnStr = " &nbsp;"+lang_dailyAvgExpenses+" : (15) $" + + formatDec((setSum / 15),3)+
          " &nbsp;(10) &nbsp;$"+formatDec((setSum10days / 10),3)+
          " &nbsp;(5) &nbsp;$"+formatDec((setSum5days / 5),3);
            dailyEarnLabel.style.backgroundImage = "url('http://img268.imageshack.us/img268/1234/redbg.png')";
        
        } else {
          if(index == 5 ) { // transfers
            earnStr = " &nbsp;"+lang_dailyAvgTransfers+" : (15) $" + + formatDec((setSum / 15),3)+
            " &nbsp;(10) &nbsp;$"+formatDec((setSum10days / 10),3)+
            " &nbsp;(5) &nbsp;$"+formatDec((setSum5days / 5),3);
              dailyEarnLabel.style.backgroundImage = "url('http:img199.imageshack.us/img199/9953/graybg.png')"
              dailyEarnLabel.style.color = "#eeeeee";

          
          } else if(index == 6) { // scheduled renewals
            earnStr =" &nbsp;"+lang_refferal2RenewCounts+" :&nbsp;&nbsp;&nbsp; (0-7) "+left7+
            "&nbsp;&nbsp;&nbsp; (0-"+getAutoPayLimit()+") "+leftAuto+
            "&nbsp;&nbsp;&nbsp; ("+getAutoPayLimit()+"-30) "+left30+
            "&nbsp;&nbsp;&nbsp; (30-60) "+left60+
            "&nbsp;&nbsp;&nbsp; (60-90) "+left90+
            "&nbsp;&nbsp;&nbsp; (90+) "+(getRefCount()-leftAuto-left30-left60-left90);
              dailyEarnLabel.style.backgroundImage = "url('http://img200.imageshack.us/img200/5423/yellowbg.png')"
              dailyEarnLabel.style.width="658px";
              dailyEarnLabel.style.borderTop = "1px solid #aaaaaa";
          }
        }
        
        if(index == 2) {      //recycle
          switch(accType) {
            case 0: perRecycleCost = 0.08; break;
            case 1: perRecycleCost = 0.08; break;
            case 2: perRecycleCost = 0.07; break;
            case 3: perRecycleCost = 0.08; break;
            case 4: perRecycleCost = 0.07; break;
            case 5: perRecycleCost = 0.08; break;
            case 6: perRecycleCost = 0.05; break;
            case 7: perRecycleCost = 0.08; break;
            default: perRecycleCost = 0.08;
          }
          
          recycledIn15days = (setSum/perRecycleCost);
          recycleCost = setSum;
          avgLabel.innerHTML = "&nbsp;"+lang_recycledLast15days+" : "+ formatDec((setSum/perRecycleCost));
          statDiv.appendChild(avgLabel);
          recyclePay = setSum / 15;
          recyclePay10 = setSum10days/ 10;
          recyclePay5 = setSum5days / 5;
          
        } else if(index == 3) {          //autopay
          var perAutoPayCost = 0.0085;
          perAutoPayCost = getAutoPayCost();
          autopayCost = setSum;
          autopaidIn15days = (setSum/perAutoPayCost);
          avgLabel.innerHTML = "&nbsp;"+lang_autopaidLast15days+" : "+ formatDec((setSum/perAutoPayCost));
          statDiv.appendChild(avgLabel);
          autoPay = setSum / 15;
          autoPay5 = setSum5days / 5;
          autoPay10 = setSum10days / 10;
        }
      }
      
    } else {
    // own clicks page
      switch(accType) {
        case 0: selfClickMultiplier = 0.01; break;
        case 1: selfClickMultiplier = 0.01; break;
        case 2: selfClickMultiplier = 0.012; break;
        case 3: selfClickMultiplier = 0.012; break;
        case 4: selfClickMultiplier = 0.015; break;
        case 5: selfClickMultiplier = 0.015; break;
        case 6: selfClickMultiplier = 0.02; break;
        case 7: selfClickMultiplier = 0.01; break;
        default: selfClickMultiplier = 0.01;
      }
      
      earnStr = " &nbsp;"+lang_dailyAvgEarnings+"  : (refGraphLength) $" + formatDec(((setSum / refGraphLength)*selfClickMultiplier),3)+
      " &nbsp;(5) &nbsp;$"+formatDec(((setSum5days / 5)*selfClickMultiplier),3)+
      " &nbsp;(3) &nbsp;$"+formatDec(((setSum3days / 3)*selfClickMultiplier),3);
    }
    
    dailyEarnLabel.innerHTML = earnStr;
    statDiv.appendChild(dailyEarnLabel);
  }
}
  
//// **** FUNCTIONS that are used later in script **** ////

// Calculate the number of days since the date 'tmp'
// Will work with 'today' & 'yesterday' too
function NumDaysSince (tmp) {
  var tmpDate = tmp.split(' ');
  if(tmpDate.length>1) {
    var tt = tmpDate[1].split(":");
  } else {
    var tt = new Array(2);
    tt[0] = "00";
    tt[1] = "00";
  }
  if(tmpDate[0].match("Today") || tmpDate[0].match("Hoje")) {
    var Since = new Date( Today.getFullYear(), Today.getMonth(), Today.getDate(), tt[0], tt[1] );
  } else if(tmpDate[0].match("Yesterday") || tmpDate[0].match("Ontem")) {
    var Since = new Date( Yesterday.getFullYear(), Yesterday.getMonth(), Yesterday.getDate(), tt[0], tt[1] );
  } else {
    var Since = new Date(tmpDate[0] + (tmpDate.length>1 ? " " + tmpDate[1] : ""));
  }
  
  var numDays = Math.floor((Today - Since) / MSPD);

  return numDays;
}

// Format Decimal numbers correctly
function formatDec(val,sig) {
  var r = "";
  var pointIndex = (val+"").indexOf(".");
  if(pointIndex >0) {
    if(sig==null) {
      sig = 0;
    }
    r = (val+"").substring(0,(pointIndex-(-sig-1)));
  } else {
    r = val;
  }
  return r;
}

// Get the number of referrals that the user has
// Function modified by kwah - will grab the number of referrals that the user has
// from the 'Direct Referrals' and 'Rented Referrals' pages.
// NOTE: Requires the user to visit these pages after installing the script
function getRefCount() {

var DirectRefCount = parseInt(GM_getValue('neobux2_NoDirectRefs',0));
var RentedRefCount = parseInt(GM_getValue('neobux2_NoRentedRefs',0));

var TotalRefs = DirectRefCount + RentedRefCount;

  return TotalRefs;
}

// Find the user's account type
// Used later to define autopay costs etc
function findAccType() {
  var spans = document.getElementsByTagName("span");
  var acc = 0;
  for(var i= 0;i < spans.length;i++) {
    if(spans[i].innerHTML.indexOf("[Standard")==1) { return 0; }
  }
  var divs = document.getElementsByTagName("DIV");
  for(var j=0;j<divs.length;j++) {
    var divClass = divs[j].getAttribute("class");
    if(divClass!=null) {
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
function getAutoPayLimit() {
  switch(accType) {
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
function getAutoPayCost() {
  var statTotalRefs = getRefCount();
  var autoPayCost = 0.0085;
  switch(accType) {
    case 0:
      if(statTotalRefs < 501) { perAutoPayCost = 0.0085; }
      else if(statTotalRefs < 1001) { perAutoPayCost = 0.009; }
      else if(statTotalRefs < 1251) { perAutoPayCost = 0.0095;}
      else if(statTotalRefs < 1751) { perAutoPayCost = 0.01; }
      else { perAutoPayCost = 0.0105; }
      break;
      
    case 1:
      if(statTotalRefs < 501) { perAutoPayCost = 0.006; }
      else if(statTotalRefs < 751) { perAutoPayCost = 0.0065; }
      else if(statTotalRefs < 1251) { perAutoPayCost = 0.007; }
      else if(statTotalRefs < 1501) { perAutoPayCost = 0.0075; }
      else if(statTotalRefs < 1751) { perAutoPayCost = 0.008; }
      else { perAutoPayCost = 0.008; }
      break;
      
    case 2:
      if(statTotalRefs < 501) { perAutoPayCost = 0.006; }
      else if(statTotalRefs < 751) { perAutoPayCost = 0.0065; }
      else if(statTotalRefs < 1251) { perAutoPayCost = 0.007; }
      else if(statTotalRefs < 1501) { perAutoPayCost = 0.0075; }
      else if(statTotalRefs < 1751) { perAutoPayCost = 0.008; }
      else { perAutoPayCost = 0.008; }
      break;
      
    case 3:
      if(statTotalRefs < 751) { perAutoPayCost = 0.006; }
      else if(statTotalRefs < 1001) { perAutoPayCost = 0.0065; }
      else if(statTotalRefs < 1501) { perAutoPayCost = 0.007; }
      else if(statTotalRefs < 1751) { perAutoPayCost = 0.0075; }
      else { perAutoPayCost = 0.008; }
      break;
      
    case 4:
      if(statTotalRefs < 501) { perAutoPayCost = 0.006; }
      else if(statTotalRefs < 751) { perAutoPayCost = 0.0065; }
      else if(statTotalRefs < 1251) { perAutoPayCost = 0.007; }
      else if(statTotalRefs < 1501) { perAutoPayCost = 0.0075; }
      else if(statTotalRefs < 1751) { perAutoPayCost = 0.008; }
      else { perAutoPayCost = 0.008; }

      break;
      
    case 5:
      if(statTotalRefs < 1001) { perAutoPayCost = 0.006; }
      else if(statTotalRefs < 1251) { perAutoPayCost = 0.0065; }
      else if(statTotalRefs < 1751) { perAutoPayCost = 0.007; }
      else { perAutoPayCost = 0.0075; }
      break;
      
    case 6:
      if(statTotalRefs < 1251) { perAutoPayCost = 0.006; }
      else if(statTotalRefs < 1501) { perAutoPayCost = 0.0065; }
      else { perAutoPayCost = 0.007; }
      break;
      
    case 7:
      if(statTotalRefs < 251) { perAutoPayCost = 0.0075; }
      else if(statTotalRefs < 1001) { perAutoPayCost = 0.008; }
      else if(statTotalRefs < 1251) { perAutoPayCost = 0.0085; }
      else if(statTotalRefs < 1751) { perAutoPayCost = 0.009; }
      else { perAutoPayCost = 0.0095; }
      break;
      
    default:
      perAutoPayCost = 0.0085;
  }
  return perAutoPayCost;
}

  
  
  
//*********************
// ** UPDATER CODE **
//*********************

  GM_registerMenuCommand("Neobux 2+: Edit Update Frequency", editUpdateFrequency);

// Grab the update frequency for use in the updater script
var updateFrequency = GM_getValue("updateFrequency",120);

AnotherAutoUpdater = {
// Config values, change these to match your script
 id: '51040', // Script id on Userscripts.org
// days: 2, // Days to wait between update checks
 days: 1000*60*updateFrequency,
 
// Don't edit after this line, unless you know what you're doing ;-)
 name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1],
 time: new Date().getTime(),
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
      url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
      onload: function(xpr) {AnotherAutoUpdater.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion = /\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
    this.xname = /\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
    
    if ( (this.xversion) && (this.xname[1] == this.name) ) {
      GM_log('this.xversion == '+this.xversion);
      this.xversion = parseFloat(this.xversion[1]);
      GM_log('this.xversion == '+this.xversion);
      this.xname = this.xname[1];
    } else {
      if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) 
      GM_setValue('updated_'+this.id, 'off');
      return false;
    }
    
    if(this.xupdateNote=/\/\/\s*@updateNote\s+(.*)\s*\n/i.exec(xpr.responseText)) {
      this.xupdateNote = this.xupdateNote[1];
      GM_log('this.xupdateNote == '+this.xupdateNote);
      this.updateNotice = this.xupdateNote;
    } else {
      this.updateNotice = '';
    } 
    
    
    
    // otherVerIsNewerVersion(currentVer,otherVer) ?
    var hasBeenUpdated = otherVerIsNewerVersion(this.version,this.xversion);
    GM_log('hasBeenUpdated = '+hasBeenUpdated);
    
    if (hasBeenUpdated) {
      GM_log('Newer version available');
      if (confirm('A new version of the '+this.xname+' user script is available.\n\nCurrent version: '+this.version+'\nAvailable version: '+this.xversion+'\n\nNotes about the Available version:\n'+this.updateNotice+'\n\nDo you wish to update to v'+this.xversion+'?')) {
        GM_log('New version being downloaded.');
        GM_setValue('updated_'+this.id, this.time+'');
        top.location.href = 'https://userscripts.org/scripts/source/'+this.id+'.user.js';
      } else {
        GM_log('New version declined');
        if(confirm('Do you want to turn off auto updating for this script?')) {
          GM_log('AutoUpdates turned off');
          GM_setValue('updated_'+this.id, 'off');
          GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated_'+this.id, new Date().getTime()+''); 
          AnotherAutoUpdater.call(true);});
          alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
        } 
        GM_setValue('updated_'+this.id, this.time+'');
      }
    } else {
      GM_log('New version NOT available');
      if(response) alert('No updates available for '+this.name);
      GM_setValue('updated_'+this.id, this.time+'');
    }
  },
  
 check: function() {
    if (GM_getValue('updated_'+this.id, 0) == 0) GM_setValue('updated_'+this.id, this.time+'');
    
    if ( (GM_getValue('updated_'+this.id, 0) != 'off') && (+this.time > (+GM_getValue('updated_'+this.id, 0) + (this.days))) ) {
        this.call();
    } else if (GM_getValue('updated_'+this.id, 0) == 'off') {
        GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true);});
    }
        GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.check(true);});
  }

};

if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') AnotherAutoUpdater.check();

var currentVer;
var otherVer;


// CUSTOM FUNCTION -- Compares two version numbers
// Returns true if current version < 'other' version
function otherVerIsNewerVersion(currentVer_input,otherVer_input) {

GM_log('currentVer_input = '+currentVer_input);
GM_log('otherVer_input = '+otherVer_input);


var otherVerIsNewer;

currentVer = currentVer_input.toString().split('.');
if(currentVer[0]) { current_MajVer = currentVer[0]; } else { current_MajVer = 0; } 
if(currentVer[1]) { current_MinVer = currentVer[1]; } else { current_MinVer = 0; }
if(currentVer[2]) { current_BugVer = currentVer[2]; } else { current_BugVer = 0; }

otherVer = otherVer_input.toString().split('.');
if(otherVer[0]) { other_MajVer = otherVer[0]; } else { other_MajVer = 0; } 
if(otherVer[1]) { other_MinVer = otherVer[1]; } else { other_MinVer = 0; }
if(otherVer[2]) { other_BugVer = otherVer[2]; } else { other_BugVer = 0; }

GM_log('current_MajVer,current_MinVer,current_BugVer = '+current_MajVer+','+current_MinVer+','+current_BugVer);
GM_log('other_MajVer,other_MinVer,other_BugVer = '+other_MajVer+','+other_MinVer+','+other_BugVer);

  if(current_MajVer < other_MajVer) {
    otherVerIsNewer = true;
    GM_log('Reason: current_MajVer < other_MajVer');
  } else if(current_MajVer == other_MajVer) {
    if((current_MinVer < other_MinVer)) {
      otherVerIsNewer = true;
      GM_log('Reason: current_MajVer == other_MajVer');
    } else if((current_MinVer == other_MinVer) && (current_BugVer < other_BugVer)) {
      otherVerIsNewer = true;
      GM_log('Reason: (current_MinVer == other_MinVer) && (current_BugVer < other_BugVer)');
    } else {
      otherVerIsNewer = false;
      GM_log('Reason: current_MinVer == other_MinVer');
    }
  } else {
    otherVerIsNewer = false;
    GM_log('Reason: current_MajVer > other_MajVer');
  }
  
  GM_log('otherVerIsNewerVersion(currentVer_input,otherVer_input) = '+otherVerIsNewer);
  return otherVerIsNewer;
  
}


//******************
//**MENU FUNCTIONS**
//******************
// Function called from the Menu to edit how often the script checks for updates
function editUpdateFrequency() {
  var updateFrequency = parseFloat(GM_getValue('updateFrequency',10));
  
  var updateFrequency_Input = prompt('Please enter how often you would like to check for updates (minutes).',updateFrequency);
      GM_log("updateFrequency_Input = "+updateFrequency_Input);
    updateFrequency = parseFloat(updateFrequency_Input);
      GM_log("updateFrequency = "+updateFrequency);

  try {
    if(updateFrequency>=0 && updateFrequency<1440){
      GM_setValue('updateFrequency',String(updateFrequency));
      GM_setValue("AutoDetectTimeOffset",false);
      
      alert("Settings applied sucessfully. Neobux Server Time will now check for updates every "+updateFrequency+" minutes.");
    }
  } catch(err) {
    GM_log("Error = "+err);
    GM_log("updateFrequency = "+updateFrequency);
    alert("An error occured! Please retry then report this error. \n\nNOTE: minimum = 0minutes, maximum = 1440 (24hrs), 1.5mins = 90seconds.");
  }
}