// ==UserScript==
// @name           Komentarze do wykopu
// @namespace      www.wykop.pl
// @description    Skrypt dodający opcję "idź do następnej nieprzeczytanej" do każdego nowego komentarza
// @require        http://code.jquery.com/jquery-1.3.2.min.js
// @include        http://wykop.pl/link/*
// @include        http://*.wykop.pl/link/*
// ==/UserScript==

//document.write('ahahaha');

if ($('.user-panel').length) //jeśli jest zalogowany
{
//// konfiguracja

//// koniec konfiguracji


// sprawdzamy czy są jakieś nieprzeczytane
if ($('.newcomment:first').length)
	{
		//jeśli są to dodajemy opcję: "idź do pierwszej nieczytanej"
		var id = $('.newcomment:first').attr('id');

		var a = '<li><span class="before">|</span><a href="#'+id+'">idź do nieprzeczytanej</a></li>';
		$('#hide-readed').parent().before(a)
		// a teraz przy każdym nowym dodajemy 'idź do następnej nieprzeczytanej'
		$('.newcomment').each(function(i)
			{
				var commentBody = $('.newcomment');
				var l=commentBody.length;
				if (i==(l-1)) return false;
				var id = $(commentBody[i+1]).attr('id');
				var a = '<li class="link"><a href="#'+id+'">idź do następnej nieprzeczytanej</a></li>';
				$(this).find('.options').prepend(a);
			}
		);
		
	}

}