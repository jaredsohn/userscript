// ==UserScript==
// @name           Hath Exchange Local Time and Ratios
// @namespace      e-hentai
// @include        http://g.e-hentai.org/hathexchange.php*
// @version        1.1
// ==/UserScript==

var uso_id = 73572;
var script_version = '1.1';

function updateCheck() {
  // Only search for update once per 48h
  var now = Math.round(Date.now() / 1000);
  var last_check = GM_getValue("update_check", 0);
  if(last_check + (60 * 60 * 48) > now) return;

  //GM_log("Checking for update ... ");
  GM_setValue("update_check", now);
  GM_xmlhttpRequest({
    method: "GET",
    url: "http://userscripts.org/scripts/source/" + uso_id + ".meta.js",
    onload: function(response) {
      // Find the latest script version
      var m = response.responseText.match(/\n\/\/\s*@version\s*([^\s]+)/);
      if(m && m[1] != script_version) {
        //GM_log("Update available.");

        // Find the script name
        m = response.responseText.match(/\n\/\/\s*@name\s*([^\s][^\r\n]+)/);
        var name = '';
        if(m) name = '"' + m[1] + '" ';

        // Show an update message
        var div = document.createElement('div');
        div.style.backgroundColor = '#F5F5DC';
        div.style.borderBottom = '1px solid black';
        div.style.height = '18px';

        var a = document.createElement('a');
        a.textContent = 'An update is available for the ' + name + 'Greasemonkey script. Click on this text to download it.';
        a.style.fontSize = '15px';
        a.href = 'http://userscripts.org/scripts/show/' + uso_id;

        var span = document.createElement('span');
        span.style.cursor = 'pointer';
        span.style.cssFloat = 'right';
        span.style.fontWeight = 'bold';
        span.style.padding = '0px 2px 0px 2px';
        span.style.marginRight = '5px';
        span.style.border = '1px solid black';
        span.style.backgroundColor = '#D5D5BC';
        span.style.height = '14px';
        span.textContent = 'X';
        span.addEventListener('click', function(e) {
          div.parentNode.removeChild(div);
        }, true);

        div.appendChild(a);
        div.appendChild(span);
        document.body.insertBefore(div, document.body.firstChild);
      }
    }
  });
}

updateCheck();

/* Open auctions table headers:
<tr>
 <th style="text-align:center; width:100px">Seller</th>
 <th style="text-align:right; width:100px">Time</th>
 <th style="text-align:right; width:100px">Volume</th>

 <th style="text-align:right; width:100px">Starting Bid</th>
 <th style="text-align:right; width:100px">Current Bid</th>
 <th style="width:20px"></th>
 <th style="text-align:center">Buyout Auction</th>
 <th style="text-align:center">Bid on Auction</th>
</tr>
*/
/* Exchange history table headers:
<tr>
 <th style="width:100px">Seller</th>
 <th style="width:70px; text-align:right">Ended</th>
 <th style="width:100px; text-align:right">Volume</th>

 <th style="width:100px; text-align:right">Starting Bid</th>
 <th style="width:100px; text-align:right">Buyout</th>
 <th style="width:100px; text-align:right">Winning Bid</th>
 <th style="width:130px; padding-left:20px">Winner</th>
</tr>
*/

var g_gp2c_equiv = 1;
var g_http_req = null;
var g_status_box = null;

function britishIntegerNotation(number) {
  // We don't care about floating point numbers ...
  var num_str = '' + Math.round(number);
  var result = '';

  var matches;
  while(matches = num_str.match(/^(.+)(...)$/)) {
    result = ',' + matches[2] + result;
    num_str = matches[1];
  }

  return num_str + result;
}

/** Return the next non-text sibling of <node>.
 */
function nextSibling(node) {
  var node = node.nextSibling;
  try {
    while(node.data) node = node.nextSibling;
  } catch(e) {}
  return node;
}

/** Return the previous non-text sibling of <node>.
 */
function previousSibling(node) {
  var node = node.previousSibling;
  try {
    while(node.data) node = node.previousSibling;
  } catch(e) {}
  return node;
}

/** Return the first non-text child of <node>.
 */
function firstChild(node) {
  var node = node.firstChild;
  try {
    while(node.data) node = node.nextSibling;
  } catch(e) {}
  return node;
}

/** Return the last non-text child of <node>.
 */
function lastChild(node) {
  var node = node.lastChild;
  try {
    while(node.data) node = node.previousSibling;
  } catch(e) {}
  return node;
}

// First, find the table which shows the open auctions and the recent ones
var tables = document.getElementsByTagName("table");
var main_table = null;
var hist_table = null;

for(var i = 0 ; i < tables.length ; ++i) {
  var table = tables[i];
  if(table.rows.length < 1) continue;
  if(table.rows[0].cells.length < 7) continue;

  var header = table.rows[0].cells[0];
  if(!header.nodeName.match(/^th$/i)) continue;
  if(!header.textContent.match(/^Seller$/)) continue;

  header = table.rows[0].cells[1];
  if(!header.nodeName.match(/^th$/i)) continue;
  if(header.textContent.match(/^Time$/)) {
    main_table = table;
  } else if(header.textContent.match(/^Ended$/)) {
    hist_table = table;
  }
}

/* {cell, bid_ammount, new_bid_type} */
var new_bid_table = new Array();

if(main_table != null) {
  // Next, for each row, find the auction time left and convert it to a
  // local time. Also compute the auction ratio.
  var cur_time = (new Date()).getTime();
  var _now = (new Date()).toLocaleTimeString();
  var use_12h = _now.indexOf('PM') != -1 || _now.indexOf('AM') != -1;

//   if(main_table.rows[0].cells.length >= 4) {
//     main_table.rows[0].cells[4].style.width = '120px';
//   }

  for(var i = 1 ; i < main_table.rows.length ; ++i) {
    if(main_table.rows[i].cells.length != 7) continue;

    var cell = main_table.rows[i].cells[1];
    var matches = cell.textContent.match(/^(?:(\d+)(D)\s*)?(?:(\d+)(H)\s*)?(?:(\d+)(M))?/);
    if(!matches) continue;  // that's a bug ...

    var days = 0;
    var hours = 0;
    var minutes = 0;

    for(var j = 1 ; j < matches.length ; j += 2) {
      if(matches[j + 1] == 'D') days = matches[j];
      else if(matches[j + 1] == 'H') hours = matches[j];
      else if(matches[j + 1] == 'M') minutes = matches[j];
      else if(matches[j + 1]) {
        alert('Warning: unknown date unit (' + matches[j + 1] + ').');
      }
    }

    var end_time = cur_time + ((hours * 60 * 60) + (minutes * 60)) * 1000;
    var end_date = new Date();
    end_date.setTime(end_time);

    var hour = end_date.getHours();
    var day_period = null;
    if(use_12h) {
      if(hour == 24) hour = 0;  // useless
      if(hour / 12 >= 1) {
        day_period = 'PM';
        hour -= 12;
      } else day_period = 'AM';
      if(hour == 0) hour = 12;
    }
    if(hour < 10) hour = '0' + hour;
    var minute = end_date.getMinutes();
    if(minute < 10) minute = '0' + minute;

    // Don't display the full date if the auction ends in the next 24h
    if(end_time > cur_time + (24 * 60 * 60 * 1000)) {
      var year = end_date.getFullYear();
      var month = end_date.getMonth() + 1;
      if(month < 10) month = '0' + month;
      var day = end_date.getDate();
      if(day < 10) day = '0' + day;

      cell.innerHTML = cell.textContent + '<br>('
                       + year + '-' + month + '-' + day + ' '
                       + hour + ':' + minute
                       + (day_period != null ? (' ' + day_period) : '')
                       + ')';
    } else {
      cell.textContent += ' (' + hour + ':' + minute
                          + (day_period != null ? (' ' + day_period) : '')
                          + ')';
    }

    cell = main_table.rows[i].cells[2];
    matches = cell.textContent.match(/^([0-9,]+)\s*Hath$/);
    if(!matches) continue;  // that's a bug ...
    var bid_ammount = matches[1].replace(/,/g, '');

    cell = main_table.rows[i].cells[4];
    matches = cell.textContent.match(/^\((\d+)\)\s*([0-9,]+)\s*(GP|C)$/);
    if(matches) {
      // If there's no match, that's either a bug or there may be no bid yet ...
      var bid_count = matches[1];
      var bid_value = matches[2].replace(/,/g, '');
      var bid_type  = matches[3];

      showRatio(cell, cell.textContent, bid_value, bid_ammount, bid_type);
    }

    var bid_tables = main_table.rows[i].cells[6].getElementsByTagName('TABLE');
    if(bid_tables.length < 1) continue; // that's a bug ...
    var buy_table = bid_tables[0];

    var bo_offset = 0;
    if(buy_table.rows[0].cells.length >= 4) {
      // There is a buyout price
      bo_offset = 1;
    }

    var new_row = document.createElement('tr');
    if(bo_offset) {
      cell = document.createElement('td');
      cell.style.textAlign = 'right';
      cell.style.padding = '0px';
      cell.width = '100px';
      new_row.appendChild(cell);
    }
    cell = document.createElement('td');
    cell.colSpan = 2;
    cell.style.textAlign = 'right';
    cell.style.padding = '0px';
    new_row.appendChild(cell);
    buy_table.rows[0].parentNode.appendChild(new_row);  // parentNode = <tbody>
    buy_table.style.borderCollapse = 'collapse';

    buy_table.rows[0].cells[bo_offset].rowSpan = 2;
    buy_table.rows[0].cells[bo_offset].valign = 'middle';
    if(bo_offset == 0) buy_table.rows[0].cells[bo_offset].style.width = '180px';
    buy_table.rows[0].cells[bo_offset + 1].rowSpan = 2;
    buy_table.rows[0].cells[bo_offset + 1].valign = 'middle';

    if(bo_offset) {
      var buyout_content = buy_table.rows[0].cells[0].textContent;
      cell = buy_table.rows[1].cells[0];
  
      matches = buyout_content.match(/^([0-9,]+)\s*(GP|C)$/);
      if(!matches) continue;  // that's a bug ...
  
      var buyout_value = matches[1].replace(/,/g, '');
      var buyout_type  = matches[2];
      showRatio(cell, '', buyout_value, bid_ammount, buyout_type);
    }

    var new_bid_input = firstChild(buy_table.rows[0].cells[bo_offset + 1]);
    cell = buy_table.rows[1].cells[bo_offset];

//     matches = new_bid_input.value.match(/^\s*([0-9]+)\s*$/);
//     if(!matches) continue;  // that's a bug ...

//     var new_bid_value = matches[1];
    var new_bid_type = buy_table.rows[0].cells[bo_offset + 2].textContent;
    showRatio(cell, '', new_bid_input.value, bid_ammount, new_bid_type);

    if(document.addEventListener) {
      new_bid_input.id = 'new_bid_input_' + new_bid_table.length;
      new_bid_table.push(new Array(cell, bid_ammount, new_bid_type));

      // Won't work outside of Firefox
      new_bid_input.addEventListener('change', onBidChange, false);
      new_bid_input.addEventListener('keyup', onBidChange, false);
    }
  }
}

/** Change the bid ratio whenever the user value is changed.
 */
function onBidChange(ev) {
  var new_bid_input = ev.target;
  var idx = new_bid_input.id.substr(14);
  var new_bid_array = new_bid_table[idx];

  if(!new_bid_input.value.match(/^\d+$/)) {
    new_bid_array[0].innerHTML = 'Invalid ammount';
    return;
  }

  showRatio(new_bid_array[0], '', new_bid_input.value, new_bid_array[1], new_bid_array[2]);
}

if(hist_table != null) {
  var C_ratio_sum = 0.0;
  var C_ratio_count = 0;
  var GP_ratio_sum = 0.0;
  var GP_ratio_count = 0;

  for(var i = 1 ; i < hist_table.rows.length ; ++i) {
    if(hist_table.rows[i].cells.length != 7) continue;

    var cell = hist_table.rows[i].cells[2];
    var matches = cell.textContent.match(/^([0-9,]+)\s*Hath$/);
    if(!matches) continue;  // that's a bug ...
    var bid_ammount = matches[1].replace(/,/g, '');

    cell = hist_table.rows[i].cells[5];
    matches = cell.textContent.match(/^([0-9,]+)\s*(GP|C)$/);
    if(!matches) continue;  // that's a bug or there may be no bid yet ...

    var bid_value = matches[1].replace(/,/g, '');
    var bid_type  = matches[2];

    cell.innerHTML = cell.textContent + '<br>['
                     + britishIntegerNotation(bid_value / bid_ammount)
                     + ' ' + bid_type + '/Hath]';

    if(bid_type == 'C') {
      C_ratio_sum += bid_value / bid_ammount;
      ++C_ratio_count;
    } else {
      GP_ratio_sum += bid_value / bid_ammount;
      ++GP_ratio_count;
    }
  }

  var row = document.createElement('tr');

  var cell = document.createElement('td');
  cell.colSpan = 3;
  cell.style.borderTop = 'thin solid';
  cell.style.textAlign = 'right';
  cell.innerHTML = 'Mean ratios:';
  row.appendChild(cell);

  cell = document.createElement('td');
  cell.colSpan = 4;
  cell.style.borderTop = 'thin solid';
  cell.style.textAlign = 'center';
  cell.innerHTML = britishIntegerNotation(C_ratio_count > 0 ? C_ratio_sum / C_ratio_count : 0)
                   + ' C/Hath';
  row.appendChild(cell);

  hist_table.rows[0].parentNode.appendChild(row); // parentNode = <tbody>
}

function showRatio(cell, text, bid_value, bid_ammount, bid_type) {
  cell.innerHTML = (text.length > 0 ? (text + '<br>') : '')
                   + '[' + britishIntegerNotation(bid_value / bid_ammount)
                   + ' ' + bid_type + '/Hath]';
}
