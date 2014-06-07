// ==UserScript==
// @name           MyDDO Sort Lottery Entries
// @namespace      http://forums.ddo.com/showthread.php?t=322786
// @description    Sorts the Lottery Entries tables by: date descending, server, character, lottery name; Filters to only show entries less than 22 days old (since any older would have expired in your in-game mailbox).
// @include        http://my.ddo.com/*
// ==/UserScript==

function sortTable(table) {
  var today = new Date();
  var rows = Array.prototype.slice.call(table.getElementsByTagName('tr'), 0);

  for (var i=0, row; row = rows[i]; i++) {
//GM_log(row.innerHTML);
	if ( row.innerHTML.search('<td class="left right pad"') == -1 ) {
//GM_log('removing row:' + rows.splice(i,1));
		rows.splice(i,1);
		i--;
	}
  }
  
  rows.sort(function(a,b) {
    var adate = getRowDate(a);
    var bdate = getRowDate(b);
    var aurl = getRowURL(a);
    var burl = getRowURL(b);
    var aname = getRowName(a);
    var bname = getRowName(b);
//GM_log('x='+x+';y='+y);

    return ((adate != bdate) ? bdate - adate : ((aurl < burl) ? -1 : ((aurl > burl) ? 1 : ((aname < bname) ? -1 : ((aname > bname) ? 1 : 0)))));

	//return getRowValue(b) - getRowValue(a);
  });

//clear the table
while (table.firstChild) {
  table.removeChild(table.firstChild);
}

//add in-order the rows that aren't too old
  for (var i=0, row; row = rows[i]; i++) {
//GM_log(row.innerHTML);
//GM_log(getRowAge(row));
  if(getRowAge(row) < 22 ) {
      table.appendChild(row);
      }
  }
  
  function getRowAge(row) {
  //GM_log('localtime hrs:' + today.getTime()/(1000*60*60) + ' UTC offset hrs:' + today.getTimezoneOffset()/60 + ' 5 hrs:' + (5) + ' RowDate hrs:' + getRowDate(row)/(1000*60*60));
  //GM_log('localtime hrs + UTC offset hrs - 5 hrs (Eastern TZ worst-case) - RowDate hrs:' + (today.getTime()/(1000*60*60) + today.getTimezoneOffset()/60 - 5 - getRowDate(row)/(1000*60*60)));
  //GM_log('Row Age in days:' + (today.getTime()/(1000*60*60) + today.getTimezoneOffset()/60 - 5 - getRowDate(row)/(1000*60*60))/24);
    return (today.getTime()/(1000*60*60) + today.getTimezoneOffset()/60 - 5 - getRowDate(row)/(1000*60*60))/24;
  }
  function getRowDate(row) {
//GM_log('sorting row: ' + row.cells[0].innerHTML);
//GM_log(row.cells[0].getElementsByClassName('lotteryEndDate')[0].innerHTML + ':' + Date.parse(row.cells[0].getElementsByClassName('lotteryEndDate')[0].innerHTML));
    return Date.parse(row.cells[0].getElementsByClassName('lotteryEndDate')[0].innerHTML);
  }
  function getRowURL(row) {
    return row.cells[0].getElementsByTagName('a')[0].getAttribute('href').toLowerCase();
  }
  function getRowName(row) {
    return row.cells[0].getElementsByTagName('table')[0].nextSibling.nodeValue.toLowerCase();
  }
}

//GM_log('hello world');

var gradtables = document.getElementsByClassName('gradient_table');
//GM_log(gradtables.length);
for (i = 0; i < gradtables.length; i++) {
	if ( gradtables[i].getAttribute('id') == 'lotterysignups' ) {
//GM_log('found a lotterysignups table');
		sortTable(gradtables[i])
	}
}
