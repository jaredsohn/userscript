// ==UserScript==
// @name           TVTorrents My Uploads
// @namespace      TVTorrents
// @description    Enhances the TVTorrrents 'My Uploads' page, displaying totals for Swarm, Uploaders and Downloaders and sorting the rows when table headers are clicked.
// @include        http://www.tvtorrents.com/loggedin/my/uploads.do
// @include        https://www.tvtorrents.com/loggedin/my/uploads.do
// @include        http://tvtorrents.com/loggedin/my/uploads.do
// @include        https://tvtorrents.com/loggedin/my/uploads.do
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


// keep track of which column the table is sorted by
// and whether it is sorted ascending or descending.
var sortColumn = 0;
var sortAscending = true;


$(document).ready(function() {
    var table = $('#body_span tr[class=rub]').parent();
    //put the swarm total into the swarm header and set up sorting for this column
    var total = 0;
    $('#body_span tr[class=list_even] td:nth-child(5)').each(function(){
        kb = $(this).text();
        kb = kb.substring(0, kb.length -5) // remove the ' kB/s' from the end
        total -= $.trim(kb);
    })
    total = total * -1;
    $('#body_span tr[class=rub] td:nth-child(5)').html("Swarm<br/>" + total + "&nbsp;kB/s").click(function(){
       swarmSort(table, 4);
    }).css("cursor", "pointer");
    
    // put the total number of downloaders into the DL:ers header and set up sorting for this column
    total = 0;
    $('#body_span  tr[class=list_even] td:nth-child(4)').each(function(){
        total -= $.trim($(this).text());
    })
    total = total * -1;
    $('#body_span tr[class=rub] td:nth-child(4)').html("DL:ers<br/>" + total).click(function(){
       integerSort(table, 3);
    }).css("cursor", "pointer");
    
    // put the total number of uploaders into the UL:ers header and set up sorting for this column
    total = 0;
    $('#body_span  tr[class=list_even] td:nth-child(3)').each(function(){
        total -= $.trim($(this).text());
    })
    total = total * -1;
    $('#body_span tr[class=rub] td:nth-child(3)').html("UL:ers<br/>" + total).click(function(){
       integerSort(table, 2);
    }).css("cursor", "pointer");
 
   // add click event to Title header to sort by Titles and add total torrent count to header
    $('#body_span tr[class=rub] td:nth-child(2)').html("Title (total: " + $('tr[class=list_even]', table).length + ")").click(function(){
       alphaSort(table, 1);
    }).css("cursor", "pointer");
     
     // add click event to Show header to sort by Shows
    $('#body_span tr[class=rub] td:nth-child(1)').click(function(){
       alphaSort(table, 0);
    }).css("cursor", "pointer");
     
 
});


// sets sortColumn and SortAscending which are used
// to alternate ascending/descending sorts when the same column
// is clicked again.
function setSortType(column){
   if (sortColumn == column){
      sortAscending = ! sortAscending;
   } else {
      sortAscending = true;
   }
   sortColumn = column;
}


// sorts the table numerically on the passed column
function integerSort($table, column){ 
    var rows =  $('tr[class=list_even]', $table).get();
    setSortType(column);
    rows.sort(function(a,b){
        var valA = parseInt($(a).children('td').eq(column).text());
        var valB = parseInt($(b).children('td').eq(column).text());
        valA = isNaN(valA) ? 0 : valA;
        valB = isNaN(valB) ? 0 : valB;
        if (valA > valB) return sortAscending ? 1 : -1;
        if (valA < valB) return sortAscending ? -1 : 1;
        return 0;
    })
    $.each(rows, function(index, row) {
       $table.append(row)
    })
}


// sorts the table alphanumerically on the passed column
function alphaSort($table, column){ 
    var rows =  $('tr[class=list_even]', $table).get();
    setSortType(column);
    rows.sort(function(a,b){
        var valA = $(a).children('td').eq(column).text();
        var valB = $(b).children('td').eq(column).text();
        if (valA > valB) return sortAscending ? 1 : -1;
        if (valA < valB) return sortAscending ? -1 : 1;
        return 0;
    })
    $.each(rows, function(index, row) {
       $table.append(row)
    })
}


// sorts the table numerically based on the swarm column
function swarmSort($table, column){
    var rows =  $('tr[class=list_even]', $table).get();
    var column = 4;
    setSortType(column);
    rows.sort(function(a,b){
      var valA = $(a).children('td').eq(column).text();
      var valB = $(b).children('td').eq(column).text();
      valA = parseInt(valA.substring(0, valA.length -5)); // remove the ' kB/s' from the end
      valB = parseInt(valB.substring(0, valB.length -5));
      valA = isNaN(valA) ? 0 : valA;
      valB = isNaN(valB) ? 0 : valB;
      if (valA > valB) return sortAscending ? 1 : -1;
      if (valA < valB) return sortAscending ? -1 : 1;
      return 0;
    })
    $.each(rows, function(index, row) {
       $table.append(row)
    })
}



