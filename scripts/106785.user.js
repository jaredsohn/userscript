// ==UserScript==
// @name           Pokazywanie obrazków w komentarzach Wykopu
// @namespace      http://userscripts.org/users/364624/
// @description    Kliknij na linka do obrazka, zeby go zobaczyc. Kliknij na obrazek, zeby go ukryc.
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        http://www.wykop.pl/link/*
// ==/UserScript==

// znajduje linki do obrazków:
$(".comment p a[href$=.jpg], .comment p a[href$=.gif], .comment p a[href$=.png]").click(function(e){
	e.preventDefault();
	
	// laduje je pod nimi:
	$('<img src="' + $(this).attr('href') + '" style="max-width: 400px; display: none;" />')
		.insertAfter($(this))
		.fadeIn("slow")
		.bind("click", function(e){
			// usuwam obrazek po kliknieciu na niego:
			$(this).fadeOut("fast").remove();
		});
});