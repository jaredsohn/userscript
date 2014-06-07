// ==UserScript==
// @name       Doodle or Die Helper
// @namespace  moozilla
// @version    0.1
// @description  adds colors and shit
// @include    http://doodle.no.de/
// ==/UserScript==

//attempt to reset toolbar after page loads (this doesn't work)
window.addEventListener ("load", addTools, false);

function addTools ()
{
    //reset tool bar
    $('.tools').empty();
    
    //add colors
    for(var i=0;i<6;i++){for(var j=0;j<6;j++){for(var k=0;k<6;k++){txt = '#'+'0369cf'.substr(i,1)+'0369cf'.substr(j,1)+'0369cf'.substr(k,1);$('.tools').append("<a href='#drawing' data-color='" + txt + "'style='width: 7px; height: 7px; padding: 0; spacing: 0; background: " + txt + ";'></a> ");}}}
    
    //add sizes and clear button
    
    $.each([1, 2, 3, 4, 5, 10, 15, 20, 50, 100], function() {
        $('.tools').append("<a href='#drawing' data-size='" + this + "' style='background: #ccc'>" + this + "</a> ");
    });

//   $('<input type="button" value="Clear">').click(function(){
//       document.location = document.location.href;
//   }).appendTo($('.tools'));
}