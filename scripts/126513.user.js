// ==UserScript==

// @name          GrantMonkey's Table Sorter

// @namespace     http://www.estream.globaliq.com.au

// @description   A basic script to sort any table alphabetically when clicked.

// @include       *

// ==/UserScript==

alert('test');
    var $sort = this;
    var $table = $('table');
    var $rows = $('tr',$table);
    $rows.sort(function(a, b){
        var keyA = $('td:eq(0)',a).text();
        var keyB = $('td:eq(0)',b).text();
        if($($sort).hasClass('asc')){
            return (keyA &gt; keyB) ? 1 : 0;
        } else {
            return (keyA &lt; keyB) ? 1 : 0;
        }
    });
    $.each($rows, function(index, row){
      $table.append(row);
    });