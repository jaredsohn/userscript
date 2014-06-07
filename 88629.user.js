// ==UserScript==
// @name           Sorter CURIT
// @namespace      http://zawardo.it
// @include        http://iter*.*.curit.it/iter/*
// @include        http://pr*.curit.it/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require	   http://yourjavascript.com/1231215885/jquery.tablesorter.min.js
// @require    http://yourjavascript.com/39327951312/jquery-cookie.js


// ==/UserScript==
var tmpStorage=[];
$(".dataTable tr.header > *").each(function() {tmpStorage.push($(this).text());});
$(".dataTable tr.header").remove();
$(".dataTable").prepend('<thead><tr></tr></thead>');
for(var i=0; i<tmpStorage.length; i++) {
	$(".dataTable thead tr").append('<th>'+tmpStorage[i]+'</th>');
}
var cookie=$.cookie('sortatore');
if (!cookie) {
    $(".dataTable").tablesorter();
} else {
    $(".dataTable").tablesorter({ 
        // set forced sort on the fourth column and i decending order. 
        sortList: [[cookie,0]] 
    });
}
$(".dataTable thead tr th").css({'cursor':'pointer', 'background-color' : 'yellow'});
$(".dataTable thead tr th").click(function() {
    var index = $(".dataTable thead tr th").index( this );
    $.cookie('sortatore', index, { expires:1});
});

var ultimoPaginatore = $("a[href$='pageSize=100']" );
ultimoPaginatore.clone().attr('href', ultimoPaginatore.attr('href')+'0').append("0").insertAfter(ultimoPaginatore);