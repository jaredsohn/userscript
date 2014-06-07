// ==UserScript==
// @name        poazywarka wykopo i zakopowiczów
// @namespace   wykozakopokazywanie
// @description Skrypt pokazuje przy komentarzy czy ktoś zakopał / wykopał dane znalezisko
// @include     http://*wykop.pl/link/*
// @version     1.01
// ==/UserScript==


if (typeof $ == 'undefined') {
		if (unsafeWindow.jQuery) {
			var $ = unsafeWindow.jQuery;
			main();
		} else {
			addJQuery(main);
		}
	} else {
		main();
	}
function main(){
	$(document).ready(function(){
			var id = /link\/(\d*)\//.exec(document.location.pathname)[1];
			$.ajax({
				dataType: "json",
				url: "http://www.wykop.pl/ajax/link/dug/"+id
			}).done(function(data){
			   var data = $("<div>").html(data.html);
				var people = data.find('span.abs');
				people.each(function(i,e){
					$('strong[class="fbold"]').filter(function(){ return $(this).text() === e.innerHTML;}).parent().next().after($('<span>').css({'font-weight': 'bold', 'padding-left': '5px', 'color': '#367AA9'}).text("wykopał"));
				});
				
			});
			
			$.ajax({
				dataType: "json",
				url: "http://www.wykop.pl/ajax/link/buried/"+id
			}).done(function(data){
			   var data = $("<div>").html(data.html);
				var people = data.find('span.hvline');
				var reason = data.find('tr td:nth-child(2)');
				people.each(function(i,e){
					$('strong[class="fbold"]').filter(function(){ return $(this).text() === e.innerHTML;}).parent().next().after($('<span>').css({'font-weight': 'bold', 'padding-left': '5px', 'color': '#FF5917'}).text(reason[i].innerHTML));	
				});
			});
	})
}
function addJQuery(callback) {
	var script = document.createElement("script");
	script.textContent = "(" + callback.toString() + ")();";
	document.body.appendChild(script);
}