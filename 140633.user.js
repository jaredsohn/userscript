// ==UserScript==
// @name           mTurk Transaction History Details for International Workers
// @namespace      Mturk
// @include        https://amazonpayments.amazon.com/acc-mgmt-ui/actions/ViewTransactionsAction.do*
// ==/UserScript==

var table = document.getElementsByClassName('grayHead_black_text')[0].parentNode.parentNode,
    rows = table.rows,
    
    $ = function (id) {
      return document.getElementById(id);
    },
    
    ls = function (key, value)
    {
      if ( value == undefined ) {
        return localStorage.getItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    },
    
    formateDate = function (timestamp, format) {
      var tmp = '',
          date = new Date(timestamp),
          $d = ( tmp = date.getDate() ) > 9 ? tmp : '0' + tmp,
          $m = ( tmp = date.getMonth()+1 ) > 9 ? tmp : '0' + tmp,
          $y = date.getFullYear(),
          $h = ( tmp = date.getHours() ) > 9 ? tmp : '0' + tmp,
          $i = ( tmp = date.getMinutes() ) > 9 ? tmp : '0' + tmp,
          $s = ( tmp = date.getSeconds() ) > 9 ? tmp : '0' + tmp;
      
      return format ? eval("'' + " + format) : ''+$y+"-"+$m+"-"+$d+" "+$h+":"+$i;
    },
    
    links = [], tIds = [], className, i=2, len, row, tCell, amounts = [], dates = [],
    data = ls('payments') ? JSON.parse( ls('payments') ) : {};

if ( rows.length < 4 ) { return; }

GM_addStyle(
  '#csv_export { position: fixed; height: 90%; width: 90%; left: 4%; top: 4%; padding: .5%; background: #FFF; border: solid 3px #000; }'+
  '#csv_export a { position: absolute; right: -3px; top: -3px; width: 20px; height: 20px; line-height: 18px; font-weight: bold; border: 3px solid #000; background: #FFF; color: #000; text-decortation: none; text-align: center; font-size: 20px; }'+
  '#csv_export textarea { display: block; width: 100%; height: 100%; font-family:monospace; }'
);

rows[1].innerHTML += '<td align="center" valign="top" class="grayHead_black_text" nowrap>Requester</td><td align="center" valign="top" class="grayHead_black_text" nowrap>Assigments</td><td align="center" valign="top" class="grayHead_black_text" nowrap colspan="2">Approved between</td>';

for (len = rows.length-1; i<len; i++) {
  row = rows[i];
  tCell = row.cells[1];
  
  links[i] = tCell.innerHTML.match(/href="\.\.(.+?)"/)[1];
  tIds[i] = tCell.innerHTML.match(/fetchDetail\('(.+?)'\)/)[1];
  tCell.innerHTML = tCell.innerHTML.replace(/Amazon Account Balance Transfer | - Mechanical Turk Prepaid HITs/g, '');
  amounts[i] = parseInt( (row.cells[2].innerHTML + row.cells[3].innerHTML).replace(/\D/g, ''), 10);
  dates[i] = (new Date( row.cells[0].innerHTML )).getTime() / 1000;
  
  className = (i%2 ? 'whiteHead' : 'ltgrayHead');
  rows[i].innerHTML += '<td align="left" valign="top" nowrap class="'+className+'">Loading...</td><td align="left" valign="top" nowrap class="'+className+'"></td><td align="left" valign="top" nowrap class="'+className+'"></td><td align="left" valign="top" nowrap class="'+className+'"></td>';
};

if ( JSON.stringify(data).length > 2 ) {
  rows[rows.length-1].innerHTML += '<td align="right" colspan="3"><button type="button" id="clear_cache">Clear Cache</button> <button type="button" id="generate_csv">Export</button></td>';
  
  $('clear_cache').addEventListener('click', function () {
    if ( confirm('Are you sure?') ) {
      ls( 'payments', JSON.stringify({}) );
    }
  }, false);
  
  $('generate_csv').addEventListener('click', function () {
    var csv = ["Transaction ID","Requester","Assigments","From","To","Transaction Date","Amount"].join('\t')+'\r\n',
        tmp = [], div = document.createElement('div');
    
    for ( p in data ) {
      tmp = data[p];
      tmp.unshift(p);
      tmp[5] = formateDate(tmp[5]*1000);
      tmp[6] = tmp[6] / 100;
      csv += '"'+tmp.join('"\t"')+'"\r\n';
    }
    if ( !$('csv_export') ) {
      document.body.appendChild(div);
      div.id = 'csv_export';
      div.innerHTML = '<a href="#" onclick="this.parentNode.style.display=\'none\'">X</a><textarea id="csv_text"></textarea>';
    } else {
      $('csv_export').style.disaply = 'block';
    }
    $('csv_text').value = csv;
    
  }, false);
}

var i = 2;
if (links.length) {
  setTimeout(fetchDetails, 10);
}

function fetchDetails() {
  if ( data[tIds[i]] ) {
    populateData( i, data[tIds[i]] );
    i++;
    fetchDetails();
  } else if ( links[i] ) {
    GM_xmlhttpRequest({
      method: "GET",
      url: 'https://amazonpayments.amazon.com/acc-mgmt-ui'+links[i].replace('&amp;', '&'),
      headers: {
        "Cookie": document.cookie,
        "Referer": location.href
      },
      onload: function(response) {
        var m = response.responseText.match(/Payment from requester (.+?)<\/td>/)
        var details = m ? m[1].split(/ for | between | and /) : ['', '', '', ''];
        details[1] = details[1].replace(/approved|granted/g, '');
        details[4] = dates[i];
        details[5] = amounts[i];
        populateData( i, details );
        
        data[ tIds[i] ] = details;
        
        i++;
        setTimeout(fetchDetails, 500);
      }
    });
  } else {
    ls( 'payments', JSON.stringify(data) );
  }
}

function populateData( i, data ) {
  rows[i].cells[4].innerHTML = data[0];
  rows[i].cells[5].innerHTML = data[1];
  rows[i].cells[6].innerHTML = data[2];
  rows[i].cells[7].innerHTML = data[3];  
}