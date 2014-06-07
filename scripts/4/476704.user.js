// ==UserScript==
// @name                Mejoras IA
// @author              Runy69
// @description 	Añade mejoras en http://ice-apple.com/
// @include             http://ice-apple.com/game/index.php/*
// @version             1.0
// @require		http://code.jquery.com/jquery-latest.js
// ==/UserScript==

var cart = document.getElementById('zt-cart');
cart.remove();

var search = document.getElementById('zt-search');
search.id = 'zt-cart'

var url = location.toString();
setTimeout(function(){url.reload()},1000*60*15);

var aurl = url.split("/");
var type = aurl[6];


$(function(){
    $('.vs268').prepend('<div id="cross" style="width: 15px; height: 15px; float: left; margin-left: 3px;"><img src="http://ia-tools.tk/error.png"/></div>');
    $('#cross').click(function(){
        $('.vs268').hide();
    });
    setInterval(function(){
		$(".vs106").load(location.href+" .vs106 > *","");
        if(type=="article")
        {
            $(".vs257").load(location.href+" .vs257 > *","");
        	$(".vs258").load(location.href+" .vs258 > *","");
        }else if(type=="index")
        {
            $(".vs240").load(location.href+" .vs240 > *","");
        }
    }, 1000*60);
});