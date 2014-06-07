// ==UserScript==
// @name           Twitter simplifier
// @namespace      namespace
// @description    A button labeled "Hide all that other mumbo jumbo" so I can click it like a boss!
// @include        https://twitter.com/*
// ==/UserScript==



var a = document.getElementById('global-actions');
a.innerHTML+="<li class=\"hidy\" >\
            <a id=\"show\" data-component-term=\"discover_nav\" style=\"margin-left:28px;margin-top:0px;padding-top:8px;padding-bottom:20px;\" href=\"#\" class=\"js-hover\" onclick=\"$('.dashboard').fadeOut(300,function(){$('.content-main').animate({width:'837px'});});$('#show').fadeOut(100,function(){$('#global-actions li:last').addClass('active');$('#hide').fadeIn();});\">\
               Hide all that other<br/>mumbo jumbo\
            </a>\
			<a id=\"hide\" data-component-term=\"discover_nav\" style=\"display:none;margin-left:28px;margin-top:0px;padding-top:8px;padding-bottom:20px;\" href=\"#\" class=\"js-hover\" onclick=\"$('.content-main').animate({width:'522px'},400,function(){$('.dashboard').fadeIn();});$('#hide').fadeOut(100,function(){$('#global-actions li:last').removeClass('active');$('#show').fadeIn();});\">Show all that other<br/>mumbo jumbo\
            </a>\
          </li>";	
		  	
a.onload="$('.larry-topbar').css('left','52%');"