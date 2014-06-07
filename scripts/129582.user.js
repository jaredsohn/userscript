// ==UserScript==
// @name          Pikabu Hide Visted News 2
// @version       2.0
// @include       http://pikabu.ru/*
// @author        Rarex
// ==/UserScript==
try{
var main = function () {
$('<div>Скрыть</br>просмотренное</div>').css({fontSize: '14px', cursor:'pointer', color:'#5190B8', margin :'35px 10px 0 0'}).appendTo( $('#to_top_link') ).bind('click',hidevisited);
$(window).bind('keyup', function(e){ if(e.which == 72){ hidevisited() } })
};


var script = document.createElement('script');
script.type = "text/javascript";
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);
}catch(e){}