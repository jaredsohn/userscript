// ==UserScript==
// @name        MTurk Time Tracker
// @namespace   localhost
// @author      ThirdClassInternationalMasterTurker
// @description Manual time tracking for MTurk. Use with MTurk Status Page Chart.
// @include     https://www.mturk.com/mturk/*
// @exclude     https://www.mturk.com/mturk/status*
// @version     0.3.5
// @downloadURL https://userscripts.org/scripts/source/145785.user.js
// @updateURL   https://userscripts.org/scripts/source/145785.user.js
// @grant       none
// ==/UserScript==

//
// 2012-09-14 First public release by ThirdClassInternationalMasterTurker
//
// 2012-09-15 0.3 Added some HIT tracking.
//                Show number of hits, time, estimated reward and hourly rate for latest activity
//                and projected earnings and hourly rate for today.
//
// 2012-09-16 0.3.1 Bug fix
//            0.3.2 Better use of caching
//
// 2012-09-19 0.3.3 exclude https://www.mturk.com/mturk/status*
//
// 2012-10-11 0.3.4 Bug fix in format_date() (Integer/String mixup)
//
// 2012-12-02 0.3.5: Added @downloadURL and @updateURL
//

/* ------------------------------------------------------------------------- */
TRACK_HITS = true;
/* ------------------------------------------------------------------------- */

// Stolen from Today's Projected Earnings (http://userscripts.org/scripts/show/95331)
function getHTTPObject()  
{ 
   if (typeof XMLHttpRequest != 'undefined')
   { 
      return new XMLHttpRequest();
   }
   try
   { 
      return new ActiveXObject("Msxml2.XMLHTTP");
   } 
   catch (e) 
   { 
      try
      { 
         return new ActiveXObject("Microsoft.XMLHTTP"); 
      } 
      catch (e) {} 
   } 
   return false;
}

// Stolen from Today's Projected Earnings (http://userscripts.org/scripts/show/95331)
function process_page(link)
{
   var page = getHTTPObject();
   page.open("GET", link, false);      
   page.send(null);
   return parse_data(page.responseText); 
}

// Partly stolen from Today's Projected Earnings (http://userscripts.org/scripts/show/95331)
function parse_data(page_text) {
   var sub_total = 0;
   var rejected_rewards = 0;
   var rejected = 0;
   var index = 0;
   var page_html = document.createElement('div');
   var data = { hits: 0, rewards: 0, rejected: 0, rejected_rewards: 0 };
   page_html.innerHTML = page_text;

   var amounts = page_html.getElementsByClassName('statusdetailAmountColumnValue');
   var statuses = page_html.getElementsByClassName('statusdetailStatusColumnValue');

   for(var k = 0; k < amounts.length; k++)
   {
      if(statuses[k].innerHTML == 'Rejected') {
         data.rejected += 1;
         index = amounts[k].innerHTML.indexOf('$');
         data.rejected_rewards += parseFloat(amounts[k].innerHTML.substring(index+1));
      }
      else {
         index = amounts[k].innerHTML.indexOf('$');
         data.rewards += parseFloat(amounts[k].innerHTML.substring(index+1));
      }
   }
   data.hits = amounts.length;
   return data;
}

// Gets status details for given date (MMDDYYYY)
function getHITData(dataDate, cache) {
  var page;
  var data;
  var status = {hits:0,rewards:0, full_pages:0, full_page_rewards: 0, pages_fetched: 0, time: 0};
  if (typeof dataDate == 'undefined') dataDate = format_date(convert_timezone(new Date()));
  if (typeof cache == 'undefined') cache = true;

  if (localStorage["STATUS " + dataDate]) {
    status = JSON.parse(localStorage["STATUS " + dataDate]);
    if (status.time && (status.time > convert_timezone(new Date()).getTime() - 43200000 )) {
      page = status.full_pages+1;
      status.hits = status.full_pages*25;
      status.rewards = status.full_page_rewards;
      status.pages_fetched = 0;
    }
    else {
      status = {hits:0,rewards:0, full_pages:0, full_page_rewards: 0, pages_fetched: 0, time: 0};
    }
  }
  else {
    page = 1;
  }
  for(page; page < 150; page++)
  {
     detailed_status_page_link = "https://www.mturk.com/mturk/statusdetail?sortType=All&pageNumber=" + page + "&encodedDate=" + dataDate;            
     data = process_page(detailed_status_page_link);
     status.pages_fetched += 1;

     if (data.hits == 0)
       break;

     if (data.hits == 25) {
       status.full_pages += 1;
       status.full_page_rewards += data.rewards;
     }
     status.hits += data.hits;
     status.rewards += data.rewards;
     
  }
  status.time = convert_timezone(new Date()).getTime();

  if (cache) {
    localStorage["STATUS " + dataDate] = JSON.stringify(status);
  }
  return status;
}

function getHITDataFromCache(dataDate) {
  if (typeof dataDate == 'undefined') dataDate = format_date(convert_timezone(new Date()));

  if (localStorage["STATUS " + dataDate])
    return JSON.parse(localStorage["STATUS " + dataDate]);
  return null;
}

function formatTime(msec) {
    if (isNaN(msec))
      return "-";
    var seconds = Math.floor(msec / 1000) % 60;
    var minutes = Math.floor((msec / 1000) / 60) % 60;
    var hours = Math.floor(((msec / 1000) / 60) / 60) % 24;

    if (hours > 0)
      seconds = "";
    else
      seconds = "" + seconds + "s";
    minutes == 0 ? minutes = "" : minutes = "" + minutes + "m ";
    hours == 0   ? hours = "" : hours = "" + hours + "h ";

    return hours + minutes + seconds;
}

function format_date(t) {
  var dateString = '';
  var tempMonth = t.getMonth()+1;
  var tempDate = t.getDate();
  if (tempMonth < 10) tempMonth = '0' + tempMonth;
  if (tempDate < 10) tempDate = '0' + tempDate;
  dateString = '' + tempMonth + tempDate + t.getFullYear();
  return dateString;
}

// FIX!? 
function convert_timezone(t) {
  d = new Date();
  utc = d.getTime() + (d.getTimezoneOffset() * 60000);

  // What is MTurk timezone. UTC-8??
  t_mturk = new Date(utc + (3600000*-8));

  return t_mturk;
}

function formatTime(msec) {
    if (isNaN(msec))
      return "-";
    var seconds = Math.floor(msec / 1000) % 60;
    var minutes = Math.floor((msec / 1000) / 60) % 60;
    var hours = Math.floor(((msec / 1000) / 60) / 60) % 24;

    if (hours > 0)
      seconds = "";
    else
      seconds = "" + seconds + "s";
    minutes == 0 ? minutes = "" : minutes = "" + minutes + "m ";
    hours == 0   ? hours = "" : hours = "" + hours + "h ";

    return hours + minutes + seconds;
}

function worked_today() {
    var today = parseInt(localStorage[format_date(convert_timezone(new Date()))]);
    var status = getHITDataFromCache();
    if (isNaN(today))
      today = 0;

    if (status == null)
      stat_line = "";
    else
      stat_line = " (~$" + status.rewards.toFixed(2) + " = $" + (status.rewards/(today/1000/60/60)).toFixed(2) + "/h)";
      

    if (localStorage["LOG"] == "true") {
      today += (convert_timezone(new Date()).getTime()) - parseInt(localStorage["LOG START"]);

      var time = time_worked();
      return formatTime(today) + stat_line + ") <br><span style=\"color: red\"> Working...</span> " + formatTime(time);
    }

    return formatTime(today) + stat_line + "<br> " + localStorage["LATEST ACTIVITY"];
}
function time_worked() {
  if (localStorage["LOG"] && localStorage["LOG"] == "true") {
    var t = convert_timezone(new Date());
    start = new Date(parseInt(localStorage["LOG START"]));
    return (t.getTime()-start.getTime());
  }
  return 0;
}

// FIX handle midnights...
function toggle_logger() {
  var t = convert_timezone(new Date());

  if (localStorage["LOG"] == "true") {
    localStorage["LOG"] = "false";
    start = new Date(parseInt(localStorage["LOG START"]));
    var today = parseInt(localStorage[format_date(t)]);
    if (isNaN(today))
      today = 0;
    var time_used = t.getTime()-start.getTime();
    localStorage[format_date(t)] = "" + (today + (t.getTime()-start.getTime()));
    this.style.color = 'green';
    this.textContent = 'Start';

    if (TRACK_HITS) {
      var prev_status = getHITDataFromCache();
      var status = getHITData();

      var hits_done = status.hits - prev_status.hits;
      var rewards   = status.rewards - prev_status.rewards;

      localStorage["LATEST ACTIVITY"] = "HITS: " + hits_done + " REWARD: $" + rewards.toFixed(2) +
                                        " TIME: " + formatTime(time_used) + " $" + (rewards/(time_used/1000/60/60)).toFixed(2) + "/h";
    }
  }
  else {
    localStorage["LOG"] = "true";
    localStorage["LOG START"] = t.getTime();
    this.style.color = 'red';
    this.textContent = 'Stop';

    if (TRACK_HITS) {
      getHITData();
    }
  }
};

if (true) {
  /* temporary fix */
  for (var i=0; i<7; i++)
  {
    if (localStorage["" + (2032+i)])
    {
      alert("MTurk Time Tracker fixing: " + "101" + i + "2012");
      localStorage["101" + i + "2012"] = localStorage["" + (2032+i)];
      delete localStorage["" + (2032+i)];
    }
  }
  /* ------------- */

  var elements = document.getElementsByClassName('header_links');
  var newrow = document.createElement('tr');
  elements[0].parentNode.parentNode.parentNode.appendChild(newrow);
  newrow.innerHTML += "<td><button type=\"button\" id=\"toggle_logger\">X</button>" +
                      "Worked today: <span id=\"worked_today\">" + worked_today() + "</span></td>";
  toggle_button = document.getElementById('toggle_logger');
  toggle_button.addEventListener("click", toggle_logger, false);
  localStorage["LOG"] == "true" ? toggle_button.style.color = 'red' : toggle_button.style.color = 'green';
  localStorage["LOG"] == "true" ? toggle_button.textContent = 'Stop' : toggle_button.textContent = 'Start';

  worked = document.getElementById('worked_today');
  setInterval(function(){worked.innerHTML = worked_today();},1000);
  setInterval(function(){  localStorage["LOG"] == "true" ? toggle_button.style.color = 'red' : toggle_button.style.color = 'green';
  localStorage["LOG"] == "true" ? toggle_button.textContent = 'Stop' : toggle_button.textContent = 'Start';},5000);
}
else {
//
}
