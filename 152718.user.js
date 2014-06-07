// ==UserScript==
// @name        Ikariam Report sellers or buyers from same alliance
// @namespace   ikariamscript.webege.com
// @description Notice if sellers or buyers are players from the same alliance
// @include     http://s*.*.ikariam.com/*
// @downloadURL https://userscripts.org/scripts/source/152718.user.js
// @updateURL   https://userscripts.org/scripts/source/152718.meta.js
// @version     0.2
// ==/UserScript==
$('#city').bind("ajaxComplete", function(e, xhr, settings) {
	var usersAlleance = JSON.parse(window.localStorage.getItem('usersAlleance')) || [];
	$('#allyMemberList tr').each(function() {
		var c = 0;
		$(this).find('td').each(function() {
			if(c++ == 1) {
				if($.inArray($(this).html(), usersAlleance) < 0) {
					usersAlleance.push($(this).html());
				}
			}
		});
	});
	if(usersAlleance.length > 0) {
		window.localStorage.setItem('usersAlleance', JSON.stringify(usersAlleance));
	}
	var usersAlleance = JSON.parse(window.localStorage.getItem('usersAlleance')) || [];
	$('#branchOffice tr').each(function() {
		var c = 0;
		$(this).find('td.short_text80').each(function() {
			if(c++ == 0) {
				var text = $(this).html();
				var regex = /\((.*)\)/;
				var result = regex.exec(text)[1];
				if($.inArray(result, usersAlleance) > -1) {
					$(this).html(text.replace(regex, "<b>$1</b>"));
				}
			}
		});
	});
});