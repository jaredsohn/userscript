// ==UserScript==
// @name          WebAsyst Forum BB Editor
// @namespace     http://forum.webasyst.ru/
// @description   WebAsyst Forum BB Editor
// @include       http://forum.webasyst.ru/*
// @require       http://ssfree.ru/js/jquery.min.js
// @require       http://ssfree.ru/js/jquery.markitup.js
// @require       http://ssfree.ru/js/jquery.dimensions.js
// @require       http://ssfree.ru/js/prettify.min.js
// ==/UserScript==

var myBbcodeSettings = {
  nameSpace: "bbcode", 
  markupSet: [
      {name:'Bold', key:'B', openWith:'[b]', closeWith:'[/b]'}, 
      {name:'Italic', key:'I', openWith:'[i]', closeWith:'[/i]'}, 
      {name:'Underline', key:'U', openWith:'[u]', closeWith:'[/u]'}, 
      {name:'Colors', openWith:'[color=[![Color]!]]', closeWith:'[/color]', dropMenu: [
          {name:'Yellow', openWith:'[color=yellow]', closeWith:'[/color]', className:"col1-1" },
          {name:'Orange', openWith:'[color=orange]', closeWith:'[/color]', className:"col1-2" },
          {name:'Red', openWith:'[color=red]', closeWith:'[/color]', className:"col1-3" },
          {name:'Blue', openWith:'[color=blue]', closeWith:'[/color]', className:"col2-1" },
          {name:'Purple', openWith:'[color=purple]', closeWith:'[/color]', className:"col2-2" },
          {name:'Green', openWith:'[color=green]', closeWith:'[/color]', className:"col2-3" },
          {name:'White', openWith:'[color=white]', closeWith:'[/color]', className:"col3-1" },
          {name:'Gray', openWith:'[color=gray]', closeWith:'[/color]', className:"col3-2" },
          {name:'Black', openWith:'[color=black]', closeWith:'[/color]', className:"col3-3" }
      ]},
      {separator:'---------------' },
      {name:'Picture', key:'P', replaceWith:'[img][![Url]!][/img]'}, 
      {name:'Link', key:'L', openWith:'[url=[![Url]!]]', closeWith:'[/url]', placeHolder:'Адрес ссылки...'},
      {separator:'---------------' },
      {name:'Quotes', openWith:'[quote]', closeWith:'[/quote]'}, 
      {name:'Code', openWith:'[code]', closeWith:'[/code]'}, 
      {separator:'---------------' },
      {name:'Clean', className:"clean", replaceWith:function(h) { return h.selection.replace(/\[(.*?)\]/g, "") } }
   ]
}


$(document).ready(function()
{
	var head = document.getElementsByTagName('head')[0];
	
	var css_href1 = 'http://ssfree.ru/js/simple/style.css';
	var css_href2 = 'http://ssfree.ru/js/bbcode/style.css';
	var css_href3 = 'http://ssfree.ru/js/prettify.css';
	
	$(document.createElement('link')).attr({type: 'text/css', href: css_href1, rel: 'stylesheet'}).appendTo(head);
	$(document.createElement('link')).attr({type: 'text/css', href: css_href2, rel: 'stylesheet'}).appendTo(head);
	$(document.createElement('link')).attr({type: 'text/css', href: css_href3, rel: 'stylesheet'}).appendTo(head);

	$('textarea[name=req_message]').markItUp(myBbcodeSettings);
	$('textarea.markItUpEditor').css({'width': 650});	

	$('body').find('div.codebox').each(function(i,f){ 
		$(f).find('pre').addClass('prettyprint');
	});

	$('body').find('div.incqbox h4').each(function(i,f){ 
		$(f).append('&nbsp;<em>(нажмите для того чтобы отобразить/скыть)</em>'); 
		$(f).next().css({"display":"none"});
	});

	$('body').find('div.postleft dt').each(function(i,f){ 
		$(f).append("&nbsp;<a href='#' class='goname' title='Обратиться по имени'><img src='http://ssfree.ru/js/img/Profile.png' /></a>"); 
	});

	$('body').find('div.postfootright ul').each(function(i,f){ 
		$(f).append("|&nbsp;<a href='#' class='quickquote' title='Цитировать быстро'>Цитировать быстро</a>"); 
	});


	function focusarea(){
		document.getElementsByName("req_message")[0].focus();
	};

	$('a.goname').bind('click',function(){
		$('textarea.markItUpEditor').append("[b]"+$(this).prev().text()+":[/b]"+"\u000A"); 
		$('html, body').animate({ scrollTop: $("textarea.markItUpEditor").offset().top }, 1000);
		var t = setTimeout(focusarea,1000);
		return false;
	
	}); 

	$('a.quickquote').bind('click',function(){
		var who = $(this).parents("div.inbox").find("div.postleft dt strong").text();
		if(window.getSelection().toString()){ 
			$('textarea.markItUpEditor').append("[quote="+who+"]"+window.getSelection().toString()+"[/quote]"+"\u000A"); 	
			$('html, body').animate({ scrollTop: $("textarea.markItUpEditor").offset().top }, 1000);
			var t = setTimeout(focusarea,1000);
		}else{
			alert('Сначала нужно выделить текст!');
		};
		
		return false;
	
	}); 

	$("div.incqbox h4").toggle(
	function() {
		$(this).next().css({"display":"block"});
	}, 
	function() {
		$(this).next().css({"display":"none"});
	});


	prettyPrint();

});