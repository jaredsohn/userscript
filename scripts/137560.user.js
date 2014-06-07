// ==UserScript==
// @name   screencleaner
// @version 1
// @description Version 1
// @author  d4nz
// ==/UserScript==
var $burnGuard = $('<div>').attr('id','burnGuard').css({
    'background-color':'#FF00FF',
    'width':'1px',
    'height':$(document).height()+'px',
    'position':'absolute',
    'top':'0px',
    'left':'0px',
    'display':'none'
}).appendTo('body');

var colors = ['#FF0000','#00FF00','#0000FF'], color = 0, delay = 5000, scrollDelay = 1000;
function burnGuardAnimate()
{
    color = ++color % 3;
    var rColor = colors[color];
    $burnGuard.css({
        'left':'0px',
        'background-color':rColor,
    }).show().animate({
        'left':$(window).width()+'px'
    },scrollDelay,function(){
        $(this).hide();
    });
    setTimeout(burnGuardAnimate,delay);
}
setTimeout(burnGuardAnimate,delay);