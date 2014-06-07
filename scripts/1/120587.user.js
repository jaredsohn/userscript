// ==UserScript==
// @name           QR-code Catalog Onliner.by
// @namespace      QR-Onliner
// @description    Adds QR-code to the seller on the catalog page Onliner.by
// @version        0.1
// @author         Morgen
// @source         http://forum.onliner.by/viewtopic.php?t=2123528
// @include        http://catalog.onliner.by/prodoffers/*
// ==/UserScript==

var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js", function() {
	var prodTitle = $.trim($('td.ppimage img').attr('title'));
	$('table.potable tr').each(function() {
		var mecard = new Object();
		var tdPrice = $(this).find('td.poprice');
		if ( tdPrice.length ) {
			mecard.title = prodTitle;
			mecard.price = $.trim(tdPrice.find('nobr').text());
			mecard.priceby = $.trim(tdPrice.find('div').text());
			mecard.seller = $.trim($(this).find('td:nth-child(2) img').attr('title'));
			mecard.phones = $(this).find('td:nth-child(2) div').html().replace(/8 <b>/ig, '+375').replace(/<\/b>/ig, '').replace(/\(0/ig, '').replace(/[ \(\)]/ig, '').split('<br>');
			
			var qrcodeText = 'MECARD:';
			qrcodeText = qrcodeText+'N:'+mecard.title+' '+mecard.seller+';';
			for (var i = 0; i < mecard.phones.length; i++) {
				if (mecard.phones[i] != '' && qrcodeText.indexOf(mecard.phones[i]) == -1) qrcodeText = qrcodeText+'TEL:'+mecard.phones[i]+';';
			}
			qrcodeText = qrcodeText+'NOTE:'+mecard.price+' ('+mecard.priceby+');;';
			
			tdPrice.append('<div style="text-align: center; padding: 5px;"><img src="http://chart.apis.google.com/chart?cht=qr&chld=L|0&chs=90x90&chl='+encodeURIComponent(qrcodeText)+'" width="90" height="90" alt="" /></div>');
		}
	});
});