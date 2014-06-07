// ==UserScript==
// @name        MTurk Status Page Chart
// @namespace   localhost
// @author      ThirdClassInternationalMasterTurker
// @description Adds some, hopefully slightly useful, eyecandy to your status page
// @include     https://www.mturk.com/mturk/status
// @version     1.6
// @downloadURL https://userscripts.org/scripts/source/145103.user.js
// @updateURL   https://userscripts.org/scripts/source/145103.user.js
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require     http://code.highcharts.com/highcharts.js
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

//
// 2012-09-07 First public release by ThirdClassInternationalMasterTurker
// 
// 2012-09-09 Version 1.1 Minor fix to make it work on both pages (when over 30 days)
//                    1.2 Another fix, @included too many pages
//
// 2012-09-14 Version 1.3 Added support for time tracking statistics with MTurk Time Tracker script
//
// 2012-09-19 Version 1.4 You can modify work time by clicking it on status page
//
// 2012-12-02 Version 1.5: Added @downloadURL and @updateURL
//
// 2012-12-12 Version 1.6: Added options dialog
//

// --- DEFAULT SETTINGS ------------------------------------------------ //
// Set your own target earnings here
var EARNINGS_OK   = 10;
var EARNINGS_HIGH = 20;

// Change background colour or font colour (true/false)
var COLOUR_ROWS = true;
// Apply colours to rows with pending hits (true/false)
var COLOUR_PENDING_ROWS = false;

// Make quick links for rejected and pending hits (true/false)
var LINK_REJECTED = true;
var LINK_PENDINGS = true;

// Background colours (no effect if COLOUR_ROW is false)
var COLOUR_HIGH_ODD  = '#44DD44';
var COLOUR_HIGH_EVEN = '#88EE88';
var COLOUR_OK_ODD    = '#f1f3eb';
var COLOUR_OK_EVEN   = '#FFFFFF';
var COLOUR_LOW_ODD   = '#FF5555';
var COLOUR_LOW_EVEN  = '#FF8888';

var COLOUR_PENDING_ODD  = '#FFFF66';
var COLOUR_PENDING_EVEN = '#FFFFAA';


// Font colours (no effect if COLOUR_ROW is true)
var COLOUR_PENDING     = '#FFFF66';
var COLOUR_REJECTED    = '#FF0000';
var COLOUR_APPROVED    = 'green';
var COLOUR_EARNINGS    = 'orange';
var COLOUR_HOURLY_RATE = 'black';
var COLOUR_LOW         = '#FF0000';
var COLOUR_OK          = '#000000';
var COLOUR_HIGH        = '#008000';

// Set this false if you don't want borders around rejects
// '2px solid red' adds red borders
var BORDER_STYLE_REJECTED = false; //'2px solid red';

var DRAW_BAR_CHART = true;
// -------------------------------------------------------------------- //
var ROWS = [];

if (typeof GM_getValue !== 'undefined')
{
  var CONFIG_DIALOG = null;

  if (GM_getValue('EARNINGS_OK') !== undefined)
    EARNINGS_OK = GM_getValue('EARNINGS_OK');
  if (GM_getValue('EARNINGS_HIGH') !== undefined)
    EARNINGS_HIGH = GM_getValue('EARNINGS_HIGH');
  if (GM_getValue('DRAW_BAR_CHART') !== undefined)
    DRAW_BAR_CHART = GM_getValue('DRAW_BAR_CHART');

    

  function config_dialog_close_func(save, inputs)
  {
    return function()
    {
      if (save == false)
      {
        inputs[0].value = EARNINGS_OK;
        inputs[1].value = EARNINGS_HIGH;
        if (DRAW_BAR_CHART == true)
          inputs[2].checked = true;     
      }
      else
      {
        var error = false;
        try {
          EARNINGS_OK = parseInt(inputs[0].value);
          EARNINGS_HIGH = parseInt(inputs[1].value);
          DRAW_BAR_CHART = inputs[2].checked == true;
          GM_setValue('EARNINGS_OK', EARNINGS_OK);
          GM_setValue('EARNINGS_HIGH', EARNINGS_HIGH);
          GM_setValue('DRAW_BAR_CHART', DRAW_BAR_CHART);
          if (EARNINGS_HIGH <= EARNINGS_OK)
            error = true;
        }
        catch(err)
        {
          error = true;
        }
        if (error)
          return;
        
        for (var i=0; i<ROWS.length; i++)
        {
          var row = ROWS[i];
          if (row.pending == 0 && row.earnings < EARNINGS_OK)
            row.element.style.backgroundColor = (i%2 == 1) ? COLOUR_LOW_ODD : COLOUR_LOW_EVEN;
          else if (row.pending == 0 && row.earnings > EARNINGS_HIGH)
            row.element.style.backgroundColor = (i%2 == 1) ? COLOUR_HIGH_ODD : COLOUR_HIGH_EVEN;
          else if (row.pending == 0)
            row.element.style.backgroundColor = (i%2 == 1) ? COLOUR_OK_ODD : COLOUR_OK_EVEN;
        }
      }
      CONFIG_DIALOG.style.display = 'none';
    };  
} 

  function config_dialog()
  {
    if (CONFIG_DIALOG == null)
    {
      CONFIG_DIALOG = document.createElement('div');
      CONFIG_DIALOG.style.display = 'block';

      CONFIG_DIALOG.style.position = 'fixed';
      CONFIG_DIALOG.style.width = '500px';
      CONFIG_DIALOG.style.height = '100px';
      CONFIG_DIALOG.style.left = '50%';
      CONFIG_DIALOG.style.right = '50%';
      CONFIG_DIALOG.style.margin = '-250px auto auto -250px';
      CONFIG_DIALOG.style.top = '400';
      CONFIG_DIALOG.style.padding = '10px';
      CONFIG_DIALOG.style.border = '2px';
      CONFIG_DIALOG.style.textAlign = 'center';
      CONFIG_DIALOG.style.verticalAlign = 'middle';
      CONFIG_DIALOG.style.borderStyle = 'solid';
      CONFIG_DIALOG.style.borderColor = 'black';
      CONFIG_DIALOG.style.backgroundColor = 'white';
      CONFIG_DIALOG.style.color = 'black';
      CONFIG_DIALOG.style.zIndex = '100';

      var inputs = [];
      inputs[0] = document.createElement('input');
      inputs[1] = document.createElement('input');
      inputs[2] = document.createElement('input');
      var label0 = document.createElement('label');
      var label1 = document.createElement('label');
      var label2 = document.createElement('label');

      label0.textContent = 'Earnings OK: $';
      label1.textContent = 'Earnings High: $';
      label2.textContent = 'Draw Bar Chart: ';
  
      inputs[0].maxLength = '3';
      inputs[0].size = '3';
      inputs[0].defaultValue = EARNINGS_OK;
      inputs[1].maxLength = '3';
      inputs[1].size = '3';
      inputs[1].defaultValue = EARNINGS_HIGH;
      inputs[2].setAttribute('type', 'checkbox');
      if (DRAW_BAR_CHART == true)
        inputs[2].checked = true;
      else
        inputs[2].checked = false;
      label0.title = inputs[0].title = 'If earnings for a day is less than this, day is coloured red';
      label1.title = inputs[1].title = 'If earnings for a day is more than this, day is coloured green';
      label2.title = inputs[2].title = 'Draw Bar Chart at the bottom of the page';

      var save_button = document.createElement('button');
      save_button.textContent = 'Save';
      save_button.addEventListener("click", config_dialog_close_func(true, inputs), false);
      save_button.style.margin = '5px';
      var cancel_button = document.createElement('button');
      cancel_button.textContent = 'Cancel';
      cancel_button.addEventListener("click", config_dialog_close_func(false, inputs), false);
      cancel_button.style.margin = '5px';

      CONFIG_DIALOG.appendChild(label0);
      CONFIG_DIALOG.appendChild(inputs[0]);
      CONFIG_DIALOG.appendChild(document.createElement('br'));
      CONFIG_DIALOG.appendChild(label1);
      CONFIG_DIALOG.appendChild(inputs[1]);
      CONFIG_DIALOG.appendChild(document.createElement('br'));
      CONFIG_DIALOG.appendChild(label2);
      CONFIG_DIALOG.appendChild(inputs[2]);
      CONFIG_DIALOG.appendChild(document.createElement('br'));
      CONFIG_DIALOG.appendChild(cancel_button);
      CONFIG_DIALOG.appendChild(save_button);
      document.body.appendChild(CONFIG_DIALOG);
    }
    else
    {
      CONFIG_DIALOG.style.display = 'block';
    }  
  }

  function config_func()
  {
    return function()
    {
      config_dialog();
    };  
  }

  var config_button = document.createElement('button');
  var title = document.getElementsByClassName('IKnowYou')[0];
  config_button.textContent = 'Status Page Options';
  config_button.addEventListener("click", config_func(), false);
  title.appendChild(config_button);
}
/* ----------------------------------------------------------------------------------- */

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

function formatHourlyRate(dollars, msec, formatForTable) {
  if (dollars == 0 || isNaN(msec))  {
    if (formatForTable)
      return "-";
    return 0;
  }
  var rate = (dollars/(msec/1000/60/60));

  if (formatForTable)
    return "$" + rate.toFixed(2);
  return rate;
}

function change_time(date) {
  return function() {
    oldTime = localStorage[date];
    newTime = prompt('Time worked on ' + date + ' (H:MM)\nInsert - to empty time\nReload page to see all changes', "");

    if (newTime != null && newTime != "") {
      if (newTime.match("^-$")) {
        localStorage.removeItem(date);
        document.getElementById(date).innerHTML = "-";;
      }
      else if (!newTime.match('[0-2]?[0-9]:[0-5][0-9]')) {
        alert("Invalid time!");
      }
      else {
        var t = newTime.split(':');
        hours = parseInt(t[0]);
        minutes = parseInt(t[1]);
        newTime = ((hours*60+minutes)*60000);
        if (newTime < 0 || newTime >= 86400000)
          alert("Invalid time!");
        else {
          localStorage[date] = newTime;
          document.getElementById(date).innerHTML = formatTime(newTime);
        }
      }
    }
  }
}

function clear_localstorage() {
  if (confirm("Press OK to clear all data from Local Storage!"))
    localStorage.clear();
};

function clear_cache_items() {
  if (confirm("Press OK to clear Time Tracker Cache items from Local Storage!")) {
    for (i=0; i<=localStorage.length-1; i++) {  
        key = localStorage.key(i);
        if (key.match('STATUS_'))
          localStorage.removeItem(key);
    }
  }
};

(function() {
var rows = document.evaluate('//tr[@class]',
           document,
           null,
           XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 

var container = document.createElement('div');
var chart;
var options = {
    chart: {
        renderTo: 'container',
        margin: [100,100,100,100],
        zoomType: 'xy'
    },
    title: {
        text: ''
    },
    xAxis: [{
        categories: [],
        labels: {
            rotation: 90,
            align: 'left'
        },
    }],
           yAxis: [{ // Primary yAxis
                minorTickInterval: 'auto',
                gridLineWidth: 2,
                max: null,
                min: 0,
                labels: {
                    formatter: function() {
                        return this.value +' HITs';
                    },
                },
                title: {
                    text: 'HITs',
                }
            }, { // Secondary yAxis
                minorTickInterval: 'auto',
                gridLineWidth: 2,
                allowDecimals: true,
                max: null,
                min: 0,
                minRange: 10,
                title: {
                    text: 'Earnings',
                },
                labels: {
                    formatter: function() {
                        return '\$' + this.value;
                    },
                },
                opposite: true
            }, {
                minorTickInterval: 'auto',
                gridLineWidth: 2,
                allowDecimals: true,
                max: null,
                min: 0,
                minRange: 10,
                title: {
                    text: 'Hourly Rate',
                },
                labels: {
                    formatter: function() {
                        return '\$' + this.value + '/h';
                    },
                },
                opposite: true
            }],
    plotOptions: {
       series: {
            stacking: 'normal'
        },
        column: {
            pointPadding: 0,
            groupPadding: 0.05,
        }
    },
    series: [{
        name: 'pending',
        color: COLOUR_PENDING,
        type: 'column',
        yAxis: 0,
        data: []
    }, {
        name: 'rejected',
        color: COLOUR_REJECTED,
        type: 'column',
        yAxis: 0,
        data: []
   }, {
        name: 'approved',
        color: COLOUR_APPROVED,
        type: 'column',
        yAxis: 0,
        data: []
   }, {
        name: 'earnings',
        color: COLOUR_EARNINGS,
        type: 'spline',
        yAxis: 1,
        stack: 1,
        data: []
   }, {
        name: '$/h',
        color: COLOUR_HOURLY_RATE,
        type: 'spline',
        yAxis: 2,
        stack: 2,
        data: []
   }]
};

container.id = 'container';
container.height = 400;
container.width  = '800';

document.body.appendChild(container);

var data =[];
var data2 =[];
var data3 =[];
var data4 =[];
var data5 =[];
var data6 =[];

for (var i=0;i<rows.snapshotLength;i++) {
  var row = rows.snapshotItem(i);

  if (row.cells.length != 6)
    continue;
  if (row.className.match('grayHead')) {
    // extra columns only if using time tracker script
    if (localStorage["LOG START"] != undefined)
      row.innerHTML += "<th>Time</th><th>$/h</th>";
    continue;
  }
  if (row.className.match('odd|even') == null) {
    continue;
  }

  var odd = row.className.match('odd');
  var approved = parseInt(row.cells[2].innerHTML);
  var rejected = parseInt(row.cells[3].innerHTML);
  var pending  = parseInt(row.cells[4].innerHTML);
  var earnings = row.cells[5].childNodes[0].innerHTML;
  var dollars = parseFloat(earnings.slice(earnings.search('\\$')+1));
  var date = row.cells[0].childNodes[1].href.substr(53);

  ROWS.push({element: row, earnings: dollars, pending: pending});

  data.unshift(pending);
  data2.unshift(rejected);
  data3.unshift(approved);
  data4.unshift(dollars);

  data5.unshift(row.cells[0].textContent.replace(/, 20../, ""));

  if (pending > 0) {
    row.cells[4].style.color = COLOUR_PENDING;
  }

  if (parseInt(row.cells[3].innerHTML) > 0) {
    row.cells[3].style.color = COLOUR_REJECTED;
  }

  if (COLOUR_ROWS) {
    if (pending != 0 && !COLOUR_PENDING_ROWS) {
      if (odd)
        row.style.backgroundColor = COLOUR_PENDING_ODD;
      else
        row.style.backgroundColor = COLOUR_PENDING_EVEN;
    }


    if ((pending == 0 || COLOUR_PENDING_ROWS) && dollars >= EARNINGS_HIGH) {
      if (odd)
        row.style.backgroundColor = COLOUR_HIGH_ODD;
      else
        row.style.backgroundColor = COLOUR_HIGH_EVEN;
    }
    else if ((pending == 0 || COLOUR_PENDING_ROWS) && dollars < EARNINGS_OK) {
      if (odd)
        row.style.backgroundColor = COLOUR_LOW_ODD;
      else
        row.style.backgroundColor = COLOUR_LOW_EVEN;
    }
    else if (pending == 0 || COLOUR_PENDING_ROWS) {
      if (odd)
        row.style.backgroundColor = COLOUR_OK_ODD;
      else
        row.style.backgroundColor = COLOUR_OK_EVEN;
    }
  }
  else {
    if ((pending == 0 || COLOUR_PENDING_ROWS) && dollars < EARNINGS_OK) {
        row.cells[5].style.color = COLOUR_LOW;
    }
    else if ((pending == 0 || COLOUR_PENDING_ROWS) && dollars >= EARNINGS_HIGH) {
        row.cells[5].style.color = COLOUR_HIGH;
    }
    else if (pending == 0 || COLOUR_PENDING_ROWS) {
        row.cells[5].style.color = COLOUR_OK;
    }
  }

  if (LINK_REJECTED && rejected > 0) {
    row.cells[3].innerHTML = '<a href="' + row.cells[0].childNodes[1].href + '&sortType=Rejected">' + rejected + '</a>';
  }
  if (LINK_PENDINGS && pending > 0) {
    row.cells[4].innerHTML = '<a href="' + row.cells[0].childNodes[1].href + '&sortType=Pending">' + pending + '</a>';
  }
  if (BORDER_STYLE_REJECTED && rejected > 0) {
    row.cells[3].style.border = BORDER_STYLE_REJECTED;
  }

  // extra columns only if using time tracker script
  if (localStorage["LOG START"] != undefined) {
    row.innerHTML += "<td style=\"text-align:right\" class=\"timeWorked\" id=\"" + date + "\">" + formatTime(parseInt(localStorage[date])) + "</td>";
    row.innerHTML += "<td style=\"text-align:right\">" + formatHourlyRate(dollars, parseInt(localStorage[date]), true) + "</td>";
    data6.unshift(formatHourlyRate(dollars, parseInt(localStorage[date]), false));
  }
}
/* ----------------------------------------------------------------------------------- */

options.series[0].data = data;
options.series[1].data = data2;
options.series[2].data = data3;
options.series[3].data = data4;
options.series[4].data = data6;
options.xAxis[0].categories = data5;

if (DRAW_BAR_CHART == true)
{
  $(document).ready(function() {
        chart = new Highcharts.Chart(options);
     });
}
})();

var clear_storage_button = document.createElement('button');
var clear_cache_button = document.createElement('button');
clear_storage_button.textContent = 'Clear Local Storage';
clear_cache_button.textContent = 'Clear Time Tracker Cache';

document.body.appendChild(document.createElement('hr'));
document.body.appendChild(clear_storage_button);
document.body.appendChild(clear_cache_button);
clear_storage_button.addEventListener("click", clear_localstorage, false);
clear_cache_button.addEventListener("click", clear_cache_items, false);


if (localStorage["LOG START"] != undefined) {
  var tds = document.getElementsByClassName('timeWorked');
  for (var i=0; i<tds.length; i++) {
    var a = tds[i].id;
    tds[i].addEventListener("click", change_time(tds[i].id), false);
  }
}

