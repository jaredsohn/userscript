// ==UserScript==
// @name         	subsubmanga
// @description    	Boton leer todo y retira publicidad
// @require			http://code.jquery.com/jquery-1.7.1.min.js
// @include        	http://submanga.com/*
// ==/UserScript==

jQuery(document).ready(function(){	
	$('.p728td').remove();
	$('.p300h').remove();
	$('.p180').remove();
	$('#t .l').append(' > <a id="leer"  style="color:#fff;font-family: sans-serif;font-size: 10px; padding: 5px 10px;cursor: pointer;	border: 0;    border-radius: 15px;		background: #bf1b04;">leer todo</a> ');
	$('#leer').click(function(){
		array=$('div > a > img').attr('src').split('/');
		array[array.length-1]='';
		url=array.join('/');
		con=1;
		$('#t').next().empty();
		 while($("select option[value='"+con+"']").text()!=''){
		     $('#t').next().append('<img width="100%" src="'+url+con+'.jpg"/><br/><br/>');
		     if(con==100){break;}
		     con++;
		 }
	});

	});

