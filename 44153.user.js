// ==UserScript==
// @name           TPG Graphs
// @namespace      http://www.myoffice24x7.com
// @include        https://cyberstore.tpg.com.au/your_account/index.php?function=checkaccountusage
// @require        http://code.jquery.com/jquery-latest.js
// @require        http://users.tpg.com.au/vzorin/date.js
// @require        http://users.tpg.com.au/vzorin/jquery.flot_edit.js

// ==/UserScript==

var SCRIPT_VERSION = 0.22;
var SCRIPT_URL = "http://userscripts.org/scripts/source/44153.user.js";

var billingMonthStart = null;
var sessionData = []; // 0: Login IP, 1: Session Start, 2: Duration, 3: Peak, 4: Offpeak, 5: Cost

var firstSessionOfThisMonth = -1; 
var lastSessionOfThisMonth = -1; 
var rowCount = 0; // Index of the current (then total of) session row 

var pUsed = null;
var opUsed = null;

var sPUsage = 0;
var sOpUsage = 0;

var funcs = [ [ getGraphTypeCaption(), swapGraphType ],
              [ "Last Month", lastMonth ],
              [ "Next Month", nextMonth ],
              [ "Update Script!", getUpdate ]
            ];

(function () 
{  
  // Check its a peak/offpeak plan
  if(!(/Off-Peak Download used:/.test(document.body.innerHTML))) {
    return;
  }
  
  // Billing date
  var bmMatch = document.body.innerHTML.match(/Expiry Date:<\/b> (\d+ \w+ \d+)/);
  
  // Table containing all the sessions
  var sessionLogTable = $("th").parents("table");
    
  if(bmMatch != null && sessionLogTable != null)
  {
    sessionLogTable = sessionLogTable[0];
    billingMonthStart = new Date(bmMatch[1]);
    billingMonthStart.add({days: 1});
    billingMonthStart.add({months: -1});
  }
  else
  {
   alert("Script is broken, contact author");
    return;
  }

  for(var i = 0; i < 6; i++) 
  {
    sessionData[i] = [];
  }

  // Peak and Offpeak totals as reported by TPG (not by sum of sessions)
  pUsed = parseFloat(document.body.innerHTML.match(/Peak Download used: ([\d|\.]+)\b/)[1]);
  opUsed = parseFloat(document.body.innerHTML.match(/Off-Peak Download used: ([\d|\.]+)\b/)[1]);
          
  // Parse each row of the session table (skpping first two rows, the headers)
  $("tr:gt(1)", sessionLogTable).each(function()
  {
    var cells = this.childNodes;
    if(cells.length == 13)
    {
      var tIdx = 0;
      for(var i = 0; i < cells.length; i++) 
      {
        var elem = cells[i];
        if(elem.nodeType == 1 && elem.nodeName == "TD") 
        { 
          sessionData[tIdx++][rowCount] = elem.innerHTML;
        }
      }
      rowCount++;       
    }  
  });
  
  // Insert the graph placeholder and the functions/buttons table
  $(createEle("div", "phdiv", "width:600px;height:300px;padding-bottom: 10px;")).insertBefore($(sessionLogTable));    
  $(createEle("table", "statsTable", "font-size: 10px; text-align: center; padding-bottom: 10px; width: 100%;")).insertBefore($(sessionLogTable));
  
  // Add a div under TPG's 'Expiry Date' section for extra stats
  $("td[@align=right]:contains('Peak Download used:'):last").append($(createEle("div", "statsDiv")));  
  $("td[@valign=top]:contains('Expiry Date:'):last").append($(createEle("div", "leftStatsDiv")));  

  // Add each button
  $("#statsTable").append($(createEle("tr", "funcTr", null)));
  for(var i = 0; i < funcs.length; i++)
  {
    var td = createEle("td", "func_" + i, "background-color: #DDD7E6; cursor: default; width: " + (100 / funcs.length) + "%;");
    td.style.MozUserSelect = "none";
    $(td).click(funcs[i][1]);
    $(td).text(funcs[i][0]);  
    $("#funcTr").append($(td));
  }
  
  regraph();
  checkUpdates();
  
})();


function findSessionRange()
{  
  function findSessionAfter(theDate, startIdx)
  {
    if(startIdx == null || startIdx < 0)
    {
      startIdx = 0;
    }
    for(var i = startIdx; i < rowCount; i++) 
    {
      var sessionEnd = new Date(sessionData[1][i]);
      var sd = durationToDate(sessionData[2][i]);
      
      sessionEnd.add({ milliseconds: sd.getTime()});    
                                                   
      if(sessionEnd.isAfter(theDate)) 
      {
        return i;
      }   
    } 
    return -1;
  }

  firstSessionOfThisMonth = findSessionAfter(billingMonthStart);
  lastSessionOfThisMonth = -1;
    
  if(firstSessionOfThisMonth == -1)
  {   
    return false;
  }

  var lastDayOfMonth = new Date(billingMonthStart.getTime());
  lastDayOfMonth.add({days: -1, months: 1, hours: 23, minutes: 59, seconds: 59});
  
  /* If drawing the current billing month just return last row from sessions */
  if(lastDayOfMonth.isAfter(new Date()))
  {
    lastSessionOfThisMonth = rowCount - 1;
    return true;
  }
  
  while(lastSessionOfThisMonth == -1)
  {
    lastSessionOfThisMonth = findSessionAfter(lastDayOfMonth, firstSessionOfThisMonth);
    
    /* If final session of month hasnt yet been drawn, -15m until we find it */
    if(lastSessionOfThisMonth == -1)
    {
      lastDayOfMonth.add({minutes: -15});
    }
    else
    {
      break;
    }
  }
  
  /* Check if this month simply has no data */
  if(lastSessionOfThisMonth - firstSessionOfThisMonth == 0)
  {
    return false;
  }  
  
  return lastSessionOfThisMonth != -1;
}

function createPlot() 
{
  var offpeakPlot = [];
  var peakPlot = [];
  var peakUsage = 0;
  var offpeakUsage = 0;
  
  var graphType = GM_getValue("tpg_graph_type");
  if(graphType == null || graphType.length <= 0) 
  {
    GM_setValue("tpg_graph_type", "totals");
    graphType = "totals";
  }
  
  sPUsage = 0;
  sOpUsage = 0;
  
  for(var i = firstSessionOfThisMonth; i <= lastSessionOfThisMonth; i++)
  {
    var sessionStart = new Date(sessionData[1][i]);
    var sessionEnd = new Date(sessionData[1][i]);
    var sd = durationToDate(sessionData[2][i]);
    
    sPUsage += parseFloat(sessionData[3][i]);;
    sOpUsage += parseFloat(sessionData[4][i]);
    
    sessionEnd.add({ milliseconds: sd.getTime()});
      
    if(graphType == "totals")
    {  
      peakUsage += parseFloat(sessionData[3][i]);
      offpeakUsage += parseFloat(sessionData[4][i]);
      
      peakPlot.push([sessionEnd.getTime(), peakUsage]);
      offpeakPlot.push([sessionEnd.getTime(), offpeakUsage]);
      
    }
    else if(graphType == "individual")
    {
      peakUsage = sessionData[3][i];
      offpeakUsage = sessionData[4][i];   
                     
      peakPlot.push([sessionStart.getTime(), peakUsage]);   
      offpeakPlot.push([sessionStart.getTime(), offpeakUsage]);
    }
            
  } 
      
  var maxd = new Date(billingMonthStart.getTime());
  maxd.add({months: 1});
  
  var plotConfiguration = 
  {
    xaxis: { mode: "time", 
             min: billingMonthStart.getTime(),
             max: maxd.getTime(), 
             tickSize: [ 2, "day" ], 
             timeformat: "%d/%m",             
           },
    yaxis: {
      tickFormatter: function(val, axis) {
        return strFormatMb(val);
      }
    },
    legend: { position: 'ne' },
    grid: { borderWidth: 0 }
  };
  
  /* Move the legend to NE if its first half of month */
  var halfMonth = new Date(billingMonthStart.getTime());
  halfMonth.add({days: 15});
  if(new Date().isAfter(halfMonth))
  {
    plotConfiguration["legend"]["position"] = "nw";
  }
    
  if(graphType == "totals")
  {
    plotConfiguration["lines"] = { show: true };
    plotConfiguration["points"] = { show: true };
  } 
  else if(graphType == "individual")
  {
    plotConfiguration["bars"] = { show: true, align: "center", lineWidth: 1 };
  }
  
  var dPeak = [];
  var dOffpeak = []
  
  /* If in current month, graph the difference between sum(sessions) and tpg reported totals */
  if(graphType == "totals" && maxd.isAfter(new Date()))
  {   
    if(pUsed > peakPlot[peakPlot.length - 1][1] || opUsed > offpeakPlot[offpeakPlot.length - 1][1])
    {
      dPeak.push(peakPlot[peakPlot.length - 1]);
      dPeak.push([
                   new Date().getTime(),
                   pUsed
                 ]);
      dOffpeak.push(offpeakPlot[offpeakPlot.length - 1]);
      dOffpeak.push([
                      new Date().getTime(),
                      opUsed
                    ]);
    }
  }
  
  $.plot($("#phdiv"),
      [ 
        {
          data: dPeak,
          points: { show: false },
          color: "#edc240"
        },
        {
          data: dOffpeak,
          points: { show: false },
          color: "#afd8f8"
        },
        { 
          data: peakPlot, 
          label: "Peak Usage", 
          color: "#edc240"
        },
        { 
          data: offpeakPlot, 
          label: "Off-Peak Usage",
          color: "#afd8f8"
        },
      ], 
      plotConfiguration
  );

 }
 
function swapGraphType() 
{
  var curType = GM_getValue("tpg_graph_type");
  if(curType == "totals")
  {
    curType = "individual";    
  }
  else
  {
    curType = "totals";
  }
  GM_setValue("tpg_graph_type", curType);
  $("#func_0").text(getGraphTypeCaption());
  regraph();
}

function getGraphTypeCaption() 
{
  var curType = GM_getValue("tpg_graph_type");
  if(curType == "totals")
  {
    return "Show Sessions";
  }
  else
  {
    return "Show Growth";
  }
}

// Dirty hard patched into flot
// Really need to do this less expensively
function getBarWidth(time)
{
  function getSessionByTime(time, start, end)
  {
    if(start < 0)
    {
      start = firstSessionOfThisMonth;
    }
    if(end < 0)
    {
      end = lastSessionOfThisMonth;
    }
    var reqTime = new Date(time);
    for(var i = start; i <= end; i++)
    {
      var d = new Date(sessionData[1][i]);
      if(d.equals(reqTime))
      {
        return i;
      }
    }
    return -1;
  }

  var reqTime = new Date(time);
  var reqSess = getSessionByTime(reqTime, -1, -1);
  
  if(reqSess != -1)
  {
    return durationToDate(sessionData[2][reqSess]).getTime();
  }
  
  return 1;
}

function nextMonth()
{
  billingMonthStart.add({months: 1});
  if(!regraph())
  {
    billingMonthStart.add({months: -1});
  }
}

function lastMonth()
{
  billingMonthStart.add({months: -1});
  if(!regraph())
  {
    billingMonthStart.add({months: 1});
  }
}

function createEle(tagName, tid, tstyle)
{
  var ele = document.createElement(tagName);
  if(tid != null)
  {
    ele.setAttribute("id", tid);
  }
  if(tstyle != null)
  {
    ele.setAttribute("style", tstyle);
  }
  return ele;
}

function regraph()
{
  if(!findSessionRange())
  {
    alert("There is no usage data for the billing period starting: " 
        + (billingMonthStart.getDate()) + "/" 
        + (billingMonthStart.getMonth() + 1) + "/"
        + billingMonthStart.getFullYear());
    
    return false;
  }
  else
  {
    createPlot();
    generateStats();
    return true;
  }
}

function checkUpdates()
{
    GM_setValue("tpg_graph_update", "NO");
    GM_xmlhttpRequest(
    {
      method: 'GET',
      url: SCRIPT_URL +"?source",
      onload: function(result) 
      {
        if (!result.responseText.match(/var SCRIPT_VERSION = ([\d|\.]+);/)) 
        {      
          alert("SCRIPT_VERSION pattern broke");
          $("#func_3").remove();    
        }
        else if(SCRIPT_VERSION >= parseFloat(RegExp.$1))
        {
          $("#func_3").remove();
        }
        else
        {
          GM_setValue("tpg_graph_update", "YES");
        }
        result = null;
    }
  });
}

function getUpdate()
{
  if(GM_getValue("tpg_graph_update") == "YES")
  {
    /*GM_openInTab(SCRIPT_URL);*/
    document.location.href = SCRIPT_URL;
    $("#func_3").remove();
  }
}

function strFormatMb(val)
{
  if(val == 0)
  {         
    return "0.00G";
  }
  else 
  {
    return (val / 1000).toFixed(1) + "G";
  }
}

function generateStats()
{
  function stat(val)
  {
    $("#statsDiv").append("<div>" + val + "</div>");
  }
  
  function leftStat(val)
  {
    $("#leftStatsDiv").append("<div>" + val + "</div>");
  }  
  
  $("#statsDiv").empty();
  $("#leftStatsDiv").empty();
  
  stat("&nbsp;");
  leftStat("&nbsp;");
  
  var numSessions = lastSessionOfThisMonth - firstSessionOfThisMonth + 1;
  
  var monthEnd = new Date(billingMonthStart.getTime());
  monthEnd.add({ months: 1, milliseconds: -1 });
  monthEnd = monthEnd.getTime();
  
  var pSessTotal = 0;
  var opSessTotal = 0;

  var meanSessionTime = 0;
  for(var idx = firstSessionOfThisMonth; idx <= lastSessionOfThisMonth; idx++)
  {
    //var sessionData = []; // 0: Login IP, 1: Session Start, 2: Duration, 3: Peak, 4: Offpeak, 5: Cost
    var sd = durationToDate(sessionData[2][idx]).getTime() / 1000;
    meanSessionTime += sd;
    
    pSessTotal += parseFloat(sessionData[3][idx]);
    opSessTotal += parseFloat(sessionData[4][idx]);
  }
      
  // Projected totals & old totals
  var lastSessionEnd = new Date(sessionData[1][lastSessionOfThisMonth]);
  lastSessionEnd.add({milliseconds: durationToDate(sessionData[2][lastSessionOfThisMonth]).getTime()});
  
  var diff = (new Date().getTime() / 1000) - (lastSessionEnd.getTime(0) / 1000);
  var percThroughPeriod = -1;
  
  /* Check that any sessions exists for the current month */
  if(lastSessionEnd.getTime() > billingMonthStart.getTime())
  {
    percThroughPeriod = (lastSessionEnd.getTime() - billingMonthStart.getTime())  / (monthEnd - billingMonthStart.getTime());
  }
  
  if(percThroughPeriod >= 0 && percThroughPeriod  < 1)
  {   
    stat("Peak Projection: " + strFormatMb(pUsed / percThroughPeriod));
    stat("Off-Peak Projection: " + strFormatMb(opUsed / percThroughPeriod));
  } 
  else
  {
    stat("Peak Used: " + strFormatMb(pSessTotal));
    stat("Off-Peak Used: " + strFormatMb(opSessTotal));
  }
  
  leftStat("<b>Data ends:</b> " 
                          + lastSessionEnd.toString("dd/MM/yy HH:mm:ss") 
                          + " (-" + sDurationToStr(diff) + ")");
  /*leftStat("&nbsp;");
                        
  // Mean Session Time
  meanSessionTime /= numSessions;
  leftStat("Mean Session Time: " + sDurationToStr(meanSessionTime));
  leftStat("&nbsp;");

  var elapsedDiff = Math.round(((lastSessionEnd.getTime(0) / 1000) - (billingMonthStart.getTime() / 1000)) / 86400);
  leftStat("Avg. Peak per day: " + strFormatMb(sPUsage / elapsedDiff));
  leftStat("Avg. Off-Peak per day: " + strFormatMb(sOpUsage / elapsedDiff));*/
}

function sDurationToStr(val)
{
  return Math.floor(val / 3600) + "h " + Math.round((val / 60) % 60) + "m"
}

function durationToDate(sd)
{
    var zeroTime = new Date(0);
    zeroTime.add({hours: sd.substring(0,2), 
                    minutes: sd.substring(3,5), 
                    seconds: sd.substring(6,8)});
    return zeroTime;
}