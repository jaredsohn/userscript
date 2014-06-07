
// ==UserScript==
// @name        GOAL
// @namespace   http://localhost
// @description Change
// @include     http://www.goal.com/*/table
// @version     1
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==

$(function(){
    function percent_of_GP( gp, val){
       return parseInt( (100*val)/gp,10)
    }

    $('.teamStandings tbody tr').each(function(){
      var $cells=$(this).find('td')
       var gp=parseInt($cells.eq(4).text(),10) ;
       $cells.slice(5,8).each(function(){
          $(this).html(function(i, html){
            return percent_of_GP( gp,html)+'%'
          })
       });       
    });
});

$(function(){
    function percent_of_GP( gp, val){
       return parseInt( (100*val)/gp,10)
    }

    $('.teamStandings tbody tr').each(function(){
      var $cells=$(this).find('td')
	  var x1=parseInt($cells.eq(8).text(),10) ;
	  var x2=parseInt($cells.eq(9).text(),10) ;
	  var x3=parseInt($cells.eq(10).text(),10) ;
      var gp=x1+x2+x3 ;
       $cells.slice(8,11).each(function(){
          $(this).html(function(i, html){
            return percent_of_GP( gp,html)+'%'
          })
       });       
    });
});

$(function(){
    function percent_of_GP( gp, val){
       return parseInt( (100*val)/gp,10)
    }

    $('.teamStandings tbody tr').each(function(){
      var $cells=$(this).find('td')
      var x1=parseInt($cells.eq(11).text(),10) ;
	  var x2=parseInt($cells.eq(12).text(),10) ;
	  var x3=parseInt($cells.eq(13).text(),10) ;
      var gp=x1+x2+x3 ;
       $cells.slice(11,14).each(function(){
          $(this).html(function(i, html){
            return percent_of_GP( gp,html)+'%'
          })
       });       
    });
});

//$("table.Newuser > tbody > tr:eq(1) table td:eq(0)").addClass("buttonClose")

var pari = 1
var usato = false
/*
$('.teamStandings tbody tr').each(function() {
var $cells = $(this).find('td');
var x1 = parseInt($cells.eq(8).text(), 10);
var x2 = parseInt($cells.eq(9).text(), 10);
var x3 = parseInt($cells.eq(10).text(), 10);
var y1 = parseInt($cells.eq(11).text(), 10);
var y2 = parseInt($cells.eq(12).text(), 10);
var y3 = parseInt($cells.eq(13).text(), 10);

	if ((x2 / (x1 + x2 + x3)) * 100 >= 60) {
		$("tr").removeClass("rowOne");
		$("tr").removeClass("rowTwo");
		$(this).addClass("mandi");
		$(this).css('backgroundColor', '#EFEF00');
	}

	if ((y2 / (y1 + y2 + y3)) * 100 >= 60) {
		$("tr").removeClass("rowOne");
		$("tr").removeClass("rowTwo");
		$(this).addClass("mandi");
		$(this).css('backgroundColor', '#EFEF00');
	}
});
*/

$('.teamStandings tbody tr').each(function() {
var $cells = $(this).find('td');
var x1 = parseInt($cells.eq(8).text(), 10);
var x2 = parseInt($cells.eq(9).text(), 10);
var x3 = parseInt($cells.eq(10).text(), 10);
var y1 = parseInt($cells.eq(11).text(), 10);
var y2 = parseInt($cells.eq(12).text(), 10);
var y3 = parseInt($cells.eq(13).text(), 10);

	if (((x2 / (x1 + x2 + x3)) * 100 >= 60) || ((y2 / (y1 + y2 + y3)) * 100 >= 60)) {
		$("tr").removeClass("rowOne");
		$("tr").removeClass("rowTwo");
		$(this).addClass("mandi");
		$(this).css('backgroundColor', '#EFEF00');
	}
});


