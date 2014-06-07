// ==UserScript==
// @name           Editor Enhancements
// @description    Adds various enhancements for editing questions
// @namespace      StackOverflow
// @include        http://stackoverflow.com/*
// @include        http://meta.stackoverflow.com/*
// @include        http://serverfault.com/*
// @include        http://superuser.com/*
// @author         Jon Seigel - http://stackoverflow.com/users/164901/jon-seigel
// ==/UserScript==

(

function()
{
	window.addEventListener
	(
		"load",
		function()
		{
			$ = unsafeWindow.jQuery;
			
			$('.question-hyperlink').each
			(
				function()
				{
					var questionId = $(this).attr('href').split('/')[2];
					
					var editLink = document.createElement('a');
					editLink.href = '/posts/' + questionId + '/edit';
					editLink.innerHTML = "Edit";
					
					var editBar = document.createElement('span');
					editBar.style.fontSize = '85%';
					editBar.style.verticalAlign = 'middle';
					editBar.appendChild(editLink);

					$(this).parents("div.summary").append(editBar);
				}
			);
		},
		false
	);
}

)();