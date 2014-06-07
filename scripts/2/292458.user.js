// ==UserScript==
// @name       Хуурын Зүрх Сугалагч
// @namespace  http://tsetsee-life.blogspot.com
// @version    0.2
// @description 
// @match      https://www.xyyp.mn/*
// @copyright  2012+, You
// ==/UserScript==
$(document).ready(function(){
if($('#xyyp').length == 0){
    	$('.desc').append("<input type='text' id='xyyp' style='width:100%' value='"+jwplayer.apply().config.file+"'/>");
}
});
