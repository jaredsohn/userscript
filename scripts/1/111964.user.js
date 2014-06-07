// ==UserScript==
// @name		Rarbg
// @namespace	Rarbg
// @include        http://rarbg.com/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

$(function()
{
//if(!(window.jQuery && window.jQuery.fn.jquery == '1.3.2')) {var s = document.createElement('script');s.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js');s.setAttribute('type', 'text/javascript');document.getElementsByTagName('head')[0].appendChild(s);}
		var first = true;
		jQuery("table.lista-rounded tbody tr td table.lista2t tbody tr.lista2").each(function()
		{
		    var link =  jQuery("td.lista:eq(1) a[onmouseover]",this);
		
		    if (link.length) 
		    {
		        var link = link.attr("onmouseover").toString();
		        var myregexp = /src=\\'(.*?)\\'/ig;
				var url = myregexp.exec(link)[1];
		        jQuery("td.lista img", this).attr("src", url);
		    }
		});
});
