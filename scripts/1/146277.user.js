// ==UserScript==
// @name        MTurk Extended HIT Search
// @author      ThirdClassInternationalMasterTurker
// @namespace   localhost
// @description Adds extended ability to search HITs you have worked on
// @include     https://www.mturk.com/mturk/statusdetail*
// @version     0.9.7
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require     http://code.highcharts.com/highcharts.js
// ==/UserScript==

//
// 2012-09-17 First public release by ThirdClassInternationalMasterTurker
//
// 2012-09-18 0.9.1 disable buttons when searching and more pretty search results
//            0.9.2 Fixed bug: Approved - Pending Payment didn't match
//                  proper status colours
//
// 2012-09-20 0.9.3 Improved use of caching. Much faster searches after first use.
//
// 2012-09-21 0.9.4 added 'Paid AND Approved' category and donut chart
//            0.9.5 better colors for donut
//
// 2012-09-22 0.9.6 hide donut container when not needed
// 
// 2012-09-22 0.9.7 Bug fix in format_date() (Integer/String mixup)
//

var ALL_HITS = [];
var ONLY_THIS_DAY;

function prepare_donut(donutData, type) {
  if (type == '---')
    return;
  var countHits = true;
  if (type.match('REWARDS'))
    countHits = false;

  var tmpData = {};
  var topRequesters = [];
  var topHits = [];
  var sum = 0;

  for (var i=0; i < donutData.length; i++) {
    var requesterName = donutData[i][1] + " (" + donutData[i][7] + ")";
    var hitTitle = donutData[i][3];
    var hitReward = donutData[i][4];
    sum += (countHits) ? 1 : hitReward;

    if (tmpData[requesterName]) {
      tmpData[requesterName]['HITS'] += (countHits) ? 1 : hitReward;
    }
    else {
      tmpData[requesterName] = {};
      tmpData[requesterName]['HITS'] = (countHits) ? 1 : hitReward;
    }
    if (tmpData[requesterName][hitTitle])
      tmpData[requesterName][hitTitle] += (countHits) ? 1 : hitReward;
    else
      tmpData[requesterName][hitTitle] = (countHits) ? 1 : hitReward;

  }

  for (var key in tmpData) {
    topRequesters.push({name: key, y: tmpData[key]['HITS']});
  }
  topRequesters.sort(function(a,b){return b.y-a.y});

  var colors = Highcharts.getOptions().colors;

  for (var i=0; i<topRequesters.length; i++) {
    var tmpHits = [];
    topRequesters[i].color = colors[i];
    for (var key2 in tmpData[topRequesters[i].name]) {
      if (key2 != 'HITS') {
        tmpHits.push({name: key2, y: tmpData[topRequesters[i].name][key2], color: colors[i]});
      }
    }
    tmpHits.sort(function(a,b){return b.y-a.y});
    for (var j=0; j<tmpHits.length ; j++) {
      var brightness = 0.2 - (j / tmpHits.length) / 5;
      tmpHits[j].color = Highcharts.Color(colors[i]).brighten(brightness).get();
    }
    topHits = topHits.concat(tmpHits);
  }

  document.getElementById('container').style.display = 'block';


  chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container',
                type: 'pie'
            },
            title: {
                text: 'Requesters and HITs matching your latest search'
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            plotOptions: {
                pie: {
                    shadow: false,
                    dataLabels: { enabled: true}
                }
            },
            tooltip: {
                    animation: false,
        	    valuePrefix: (countHits)? '' : '$',
        	    valueSuffix: (countHits)? ' HITs' : '',
                    valueDecimals: (countHits)? 0 : 2,
                    pointFormat: (countHits)? '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> (of all ' + sum + ' HITs)<br/>' :
                                              '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> (of all $' + sum.toFixed(2) + ')<br/>'
            },
            series: [{
                name: 'Requesters',
                data: topRequesters,
                size: '60%',
                dataLabels: {
                    formatter: function() {
                        if (countHits) {
                          return this.y/sum >= 0.20 ? this.point.name: null;
                        }
                        else {
                          return this.y/sum >= 0.20 ? this.point.name : null;
                        }
                    },
                    color: 'black',
                    distance: -10
                }
            }, {
                name: 'HITs',
                data: topHits,
                innerSize: '60%',
                dataLabels: {
                    formatter: function() {
                        if (countHits) {
                          return this.y/sum > 0.05 ? this.point.name : null;
                        }
                        else {
                          return this.y/sum > 0.05 ? this.point.name : null;
                        }
                    },
                    color: 'black',
                }
            }]
  });
}

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
function process_page(link, date)
{
   var page = getHTTPObject();
   page.open("GET", link, false);      
   page.send(null);
   return parse_data(page.responseText, date); 
}

// Partly stolen from Today's Projected Earnings (http://userscripts.org/scripts/show/95331)
function parse_data(page_text, date) {
   var index = 0;
   var page_html = document.createElement('div');
   page_html.innerHTML = page_text;

   var requesters = page_html.getElementsByClassName('statusdetailRequesterColumnValue');
   var titles = page_html.getElementsByClassName('statusdetailTitleColumnValue');
   var amounts = page_html.getElementsByClassName('statusdetailAmountColumnValue');
   var statuses = page_html.getElementsByClassName('statusdetailStatusColumnValue');
   var feedbacks = page_html.getElementsByClassName('statusdetailRequesterFeedbackColumnValue');

   var requesterName;
   var hitTitle;
   var hitReward;
   var hitStatus;
   var requesterId;

   for(var k = 0; k < amounts.length; k++)
   {
      requesterName = requesters[k].textContent;
      requesterLink = requesters[k].childNodes[1].href;
      hitTitle      = titles[k].textContent;
      index = amounts[k].innerHTML.indexOf('$');
      hitReward     = parseFloat(amounts[k].innerHTML.substring(index+1));
      hitStatus     = statuses[k].innerHTML;
      hitFeedback   = feedbacks[k].textContent;
      index = 12 + requesterLink.search("requesterId=");
      index = requesterLink.search("requesterId=");
      requesterId = requesterLink.substring(index+12, requesterLink.lastIndexOf('&'));

      ALL_HITS.push([date, requesterName, requesterLink, hitTitle, hitReward, hitStatus, hitFeedback, requesterId]);
   }

   return amounts.length;
}

// Gets status details for given date (MMDDYYYY)
function getHITData(dataDate) {
  var page = 1;
  var total_hits = 0;

  if (localStorage["HITS " + dataDate]) {
    var tempHITs = JSON.parse(localStorage["HITS " + dataDate]);
    ALL_HITS = ALL_HITS.concat(tempHITs);
    return tempHITs.length;
  }


  for(page; page < 150; page++)
  {
     detailed_status_page_link = "https://www.mturk.com/mturk/statusdetail?sortType=All&pageNumber=" + page + "&encodedDate=" + dataDate;            
     var hits = process_page(detailed_status_page_link, dataDate);
     if (hits == 0)
       break;
     total_hits += hits;

     // Let the user know that something is happening
     if (Math.random() > 0.9)
       update_status_label("<span style=\"color:red\">Please wait: script monkeys are trying to orded bananas from amazon.com with gift certificates</span>");
     else if (Math.random() > 0.95)
       update_status_label("<span style=\"color:red\">Please wait: hungry script monkeys are not eating bananas</span>");
     else if (Math.random() > 0.4)
       update_status_label("<span style=\"color:red\">Please wait: script monkeys are working</span>");
     else
       update_status_label("<span style=\"color:red\">Please wait: script monkeys are taking naps</span>");
     sleep(1000);
  }

  return total_hits;
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

// FIX!? 
function convert_timezone(t) {
  d = new Date();
  utc = d.getTime() + (d.getTimezoneOffset() * 60000);

  // What is MTurk timezone. UTC-8??
  t_mturk = new Date(utc + (3600000*-8));

  return t_mturk;
}

function update_status_label(new_status) {
  document.getElementById('status_label').innerHTML = new_status;
}

function sleep(naptime, date) {
  var sleeping = true;
  var now = new Date();
  var alarm;
  var startingMSeconds = now.getTime();
  while(sleeping) {
    alarm = new Date();

    /* Let's try to do something useful while monkeys are "sleeping" */
    if (typeof date !== 'undefined' && !localStorage["HITS " + date]) {
      var tempHITs = [];
      var i = 0;
      var done = true;
      while (i<ALL_HITS.length && done) {
        if (ALL_HITS[i][0] == date) {
          tempHITs.push(ALL_HITS[i]);
          if (!(ALL_HITS[i][5] == 'Rejected' || ALL_HITS[i][5] == 'Paid'))
            done = false;
        }
        i++;
      }
      if (done && tempHITs.length > 0) {
        // All this days HITs are either accepted or rejected
        localStorage["HITS " + date] = JSON.stringify(tempHITs);
      }
    }
    /**/

    alarmMSeconds = alarm.getTime();
    if (alarmMSeconds - startingMSeconds > naptime)
      sleeping = false;
  }
}

function start_search() {
  document.getElementById('search_button').disabled = true;
  

  if (ALL_HITS.length > 0 && !ONLY_THIS_DAY)
    update_status_label("<span style=\"color:green\">Script monkeys are using cached data</span>");
  else if (ALL_HITS.length > 0 && document.getElementById('select').value.match("this day"))
    update_status_label("<span style=\"color:green\">Lazy script monkeys are using cached data</span>");
  else
    update_status_label("<span style=\"color:red\">Please wait: script monkeys are fetching relevant pages</span>");
  setTimeout( do_search, 1000);
}

function do_search() {
  var search_term = document.getElementById('search_term').value;
  var select_status = document.getElementById('status_select').value;
  var select = document.getElementById('select').value;
  var donut_select = document.getElementById('donut_select').value;
  var hits = 0;
  var only_this_day = false;
  var index = 12 + window.location.href.search("encodedDate=");
  var this_day = window.location.href.substr(index, 8);
  donut_select.disabled = true;
  select_status.disabled = true;
  select.disabled = true;
  search_term.disabled = true;


  if (select.match("this day"))
    only_this_day = true;

  if (ALL_HITS.length == 0 || (ONLY_THIS_DAY && !only_this_day)) {
    var about_today = ( new Date((new Date()).getTime() + 1000*60*60*24) );

    if (only_this_day) {
      hits += getHITData(this_day);
      ONLY_THIS_DAY = true;
      update_status_label("<span style=\"color:green\">This days all HITs fetched</span>");
      //if (!localStorage["HITS " + this_day])
      //  sleep(0, this_day);
    }
    else {
      ALL_HITS = [];
      for (var i=0; i<46; i++) {
        hits += getHITData(format_date(about_today));
        update_status_label("<span style=\"color:red\">Please wait: fetching all status pages can take several minutes...</span>");
        if (i>3 && (localStorage["HITS " + format_date(about_today)] === undefined))
          sleep(1000, format_date(about_today));
        else if (i <=3)
          sleep(1000);
        else
          update_status_label("<span style=\"color:orange\">Script monkeys found cached bananas!!!</span>");

        about_today.setDate(about_today.getDate()-1);
      }
      ONLY_THIS_DAY = false;
      update_status_label("<span style=\"color:green\">All HITs fetched</span>");
    }
  }
  else {
    update_status_label("Search powered by non-amazonian script monkeys");
  }

  resultsWindow = window.open();
  resultsWindow.document.write("<html><head><title>Status Detail Search Results</title></head><body>\n");
  resultsWindow.document.write("<h1>HITs matching your search:</h1>\n");
  resultsWindow.document.write('<table style="border: 1px solid black;border-collapse:collapse;width:90%;margin-left:auto;margin-right:auto;">\n');
  resultsWindow.document.write('<tr style="background-color:lightgrey"><th>Date</th><th>Requester</th><th>HIT Title</th><th>Reward</th><th>Status</th><th>Feedback</th></tr>\n');
  // [date, requesterName, requesterLink, hitTitle, hitReward, hitStatus, hitFeedback, requesterId]
  var donutData = [];
  var odd;
  var matches = 0;
  var sum = 0;
  var stats = {"REQUESTER_STATS": {}, "REWARD_STATS": {}, "HIT_STATS": {}};
  for (var i=0; i<ALL_HITS.length; i++) {
    if (!only_this_day || ALL_HITS[i][0] == this_day) {
      if (select_status == "---" || ALL_HITS[i][5].match(select_status)) {
        if (search_term == "" || (ALL_HITS[i][0] + ' ' + ALL_HITS[i][1] + ' ' + ALL_HITS[i][3] + ' $' + ALL_HITS[i][4].toFixed(2) + ' ' + 
                                  ALL_HITS[i][5] + ' ' + ALL_HITS[i][6] + ' ' + ALL_HITS[i][7]).match(search_term))
        {
          if (donut_select != '---')
            donutData.push(ALL_HITS[i]);
          odd = (matches % 2 == 0);
          sum += ALL_HITS[i][4];
          matches += 1;
          resultsWindow.document.write(format_hit_line(ALL_HITS[i], odd, status_color(ALL_HITS[i][5])));
        }
      }
    }
  }
  resultsWindow.document.write('<tr style="background-color:lightgrey"><th></th><th></th><th></th><th>$' + sum.toFixed(2) + '</th><th></th><th></th></tr>\n');
  resultsWindow.document.write("</table>");
  resultsWindow.document.write("<p>Found " + matches + " matching HITs.</p>");
  resultsWindow.document.write("</body></html>")
  resultsWindow.document.close();

  if (donut_select == '---') {
    document.getElementById('container').style.display = 'none';
  }
  else {
    prepare_donut(donutData, donut_select);
    document.getElementById('container').style.display = 'block';
  }

  setTimeout( function() { update_status_label("Search powered by non-amazonian script monkeys"); }, 3000);
  document.getElementById('search_button').disabled = false;
  status_select.disabled = false;
  select.disabled = false;
  search_term.disabled = false;
  donut_select.disabled = false;

}

function status_color(status) {
  var color = "green";

  if (status.match("Pending Approval"))
    color = "orange";
  else if (status.match("Rejected"))
    color = "red";

  return color;
}

function format_hit_line(hit, odd, status_color) {
  var line = '<tr style="background-color:';
  if (odd)
    line += '#f1f3eb';
  else
    line += 'white';
  line += '" valign=top>';
  line += '<td>' + hit[0] + '</td>';
  line += '<td style="width:165px"><a href="' + hit[2]+ '" title="Contact this Requester">' + hit[1] + '</a></td>';
  line += '<td style="width:213px">' + hit[3] + '</td>';
  line += '<td style="width:45px">$' + hit[4].toFixed(2) + '</td>';
  line += '<td style="color:' + status_color + '; width:55px">' + hit[5]+ '</td>';
  line += '<td><div style="width:225px; overflow:hidden">' + hit[6]+ '</div></td>';
  line += '</tr>\n';
  return line;
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

if (true) {
  var searchbar = document.getElementById('searchbar');
  var my_bar = document.createElement('div');
  var search_button = document.createElement('button');
  var select = document.createElement('select');
  var status_select = document.createElement('select');
  var label = document.createElement('label');
  var label2 = document.createElement('label');
  var input = document.createElement('input');
  var donut_select = document.createElement('select');

  var donut_options = [];
  donut_options[0] = document.createElement("option");
  donut_options[1] = document.createElement("option");
  donut_options[2] = document.createElement("option");
  donut_options[0].text = "---";
  donut_options[1].text = "Donut Chart HITS";
  donut_options[2].text = "Donut Chart REWARDS";
  donut_options[0].value = "---";
  donut_options[1].value = "HITS";
  donut_options[2].value = "REWARDS";

  var options = [];
  options[0] = document.createElement("option");
  options[1] = document.createElement("option");
  options[0].text = "Show this days ALL";
  options[1].text = "Show ALL";

  var status_options = [];
  status_options[0] = document.createElement("option");
  status_options[1] = document.createElement("option");
  status_options[2] = document.createElement("option");
  status_options[3] = document.createElement("option");
  status_options[4] = document.createElement("option");
  status_options[5] = document.createElement("option");
  status_options[0].text = "Pending Approval";
  status_options[0].style.color = "orange"; 
  status_options[1].text = "Rejected";
  status_options[1].style.color = "red"; 
  status_options[2].text = "Approved - Pending Payment";
  status_options[2].style.color = "green"; 
  status_options[3].text = "Paid";
  status_options[3].style.color = "green"; 
  status_options[4].text = "Paid AND Approved";
  status_options[4].style.color = "green"; 
  status_options[5].text = "---";
  status_options[0].value = "Pending Approval";
  status_options[1].value = "Rejected";
  status_options[2].value = "Approved";
  status_options[3].value = "Paid";
  status_options[4].value = "Paid|Approved";
  status_options[5].value = "---";


  search_button.setAttribute('id', "search_button");
  input.setAttribute('id', "search_term");
  select.setAttribute('id', "select");
  status_select.setAttribute('id', "status_select");
  label.setAttribute('id', "status_label");
  donut_select.setAttribute('id', "donut_select");

  (searchbar.parentNode).insertBefore(my_bar, searchbar.nextSibling.nextSibling.nextSibling.nextSibling);
  my_bar.appendChild(donut_select);
  my_bar.appendChild(select);
  my_bar.appendChild(status_select);
  my_bar.appendChild(label2);
  my_bar.appendChild(input);
  my_bar.appendChild(search_button);
  my_bar.appendChild(label);
  (my_bar.parentNode).insertBefore(label, my_bar.nextSibling);

  var donut = document.createElement('div');
  donut.setAttribute('id', "container");
  (my_bar.parentNode).insertBefore(donut, my_bar);
  donut.style.display = 'none';

  my_bar.style.textAlign = "float";
  search_button.textContent = "Search";
  label2.textContent = " HITs matching: ";
  input.value = "";
  label.textContent = "Please upgrade to MTurk HIT DataBase (http://userscripts.org/scripts/show/149548)";
  for (var i=0; i<options.length; i++)
    select.options.add(options[i]);
  for (var i=0; i<status_options.length; i++)
    status_select.options.add(status_options[i]);
  for (var i=0; i<donut_options.length; i++)
    donut_select.options.add(donut_options[i]);

  search_button.addEventListener("click", start_search, false);
}


