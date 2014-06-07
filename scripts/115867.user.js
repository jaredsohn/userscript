// ==UserScript==
// @name           Flashback Ticker
// @namespace      flashback
// @description    Flashback Ticker ger nytt liv till Flashbacks "Nya Ämnen"
// @include        https://*.flashback.org/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.js
// @require        https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.js
// ==/UserScript==
$(document).ready(function() {
	var AJAXComplete = true;
	var currentPage = location.href;
	var updateRate = 7000;
	var currentPageLast = currentPage.substr(-10);
	if(currentPageLast == "nya-inlagg") {
		updateRate = 3000;
	}
	var citeradeInlaggURL = $('.top-menu-sub').children().next().next().next().next().find('a').attr('href');
	citeradeInlaggURL = "https://www.flashback.org"+citeradeInlaggURL;
	console.log(citeradeInlagg);

	window.setInterval(function(){
//Kolla efter nya trådar och inlägg //
		if(currentPageLast == "nya-inlagg" || currentPageLast == "/nya-amnen") {
			var topThreadOld = $('#threadslist tbody tr').next();
			var topThreadOldHTML = $(topThreadOld).html();
			var topThreadOldName = $(topThreadOld).children().eq(1).children().eq(0).html();
			var topThreadNew = "";
			var topThreadNewHTML = "";
			var topThreadNewName= "";
			if(AJAXComplete = false) {
				} else {
				$.ajax({
					type: "GET",
					cache: false,
					url: currentPage,
					dataType: "html",
					beforeSend:  function() {
						AJAXComplete = false;
					},
					success : function(data) {
						topThreadNew = $(data).find('#threadslist tbody tr').next();
						topThreadNewHTML = $(topThreadNew).html();
						topThreadNewName = $(topThreadNew).children().eq(1).children().eq(0).html();
						var topThreadNewTags = "<tr>"+topThreadNewHTML+"</tr>";
						if(topThreadNewName == topThreadOldName) {
							//Inget händer här
						} else {
							$('#threadslist tbody tr:first').after(topThreadNewTags);
							$('#threadslist tbody tr:first').next().find('td').next().addClass('newThread');
							$('.newThread:first').effect("highlight", {}, 60000);
						}
						AJAXComplete = true;
					}
				});

		}
	}
	//Kolla efter nya citeringar
//https://www.flashback.org/sok/quote=DigGaN?sp=1&so=d
//DigGaN

				$.ajax({
					type: "GET",
					cache: false,
					url: citeradeInlaggURL,
					dataType: "html",
					beforeSend:  function() {

					},
					success : function(data) {
						
					}
				});
	}, updateRate);
});