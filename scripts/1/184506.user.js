// ==UserScript==
// @name        Dead Frontier
// @namespace   Tempo para dead Frontier
// @description temp
// @include     http://fairview.deadfrontier.com/onlinezombiemmo/index.php?page=21
// @version     1
// ==/UserScript==

var barra="javascript:%20$('.design2010:first').before('<div%20style=\"background-color:black;font-size:%2035px;\"%20align=\"center\"><b%20id=\"h\"%20style=\"color:red;\"%20size=\"50\">0</b><b%20style=\"color:blue;\">:</b><b%20id=\"m\"%20style=\"color:orange;font-size:%2035px;\"%20>00</b><b%20style=\"color:blue;\">:</b><b%20id=\"s\"%20style=\"color:blue;font-size:%2035px;\">00</b></div>');%20b();%20function%20b(){%20var%20s=$('#s').text();%20s++;%20var%20h=$('#h').text();%20$('#s').html(s);%20/*Configura%C3%A7%C3%A3o%20de%20segundos*/%20if($('#s').text()==60){%20$('#s').html('00');%20var%20m=$('#m').text();%20m++;%20$('#m').html(m);%20}%20if($('#s').text().length==1){%20$('#s').html('0'+s);%20}%20/*Configura%C3%A7%C3%A3o%20dos%20minutos*/%20if($('#m').text()==60){%20$('#m').html('00');%20var%20h=$('#h').text();%20h++;%20$('#h').html(h);%20}%20if($('#m').text().length==1){%20$('#m').html('0'+m);%20}%20/*configura%C3%A7%C3%A3o%20em%20horas*/%20if($('#h').text().length==1){%20$('#h').html('0'+h);%20}%20setTimeout('b()',%201000);%20}%20void(0);"


location.replace('javascript:'+barra+';void(0);');
