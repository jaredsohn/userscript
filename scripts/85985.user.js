// ==UserScript==
// @name          Jogger.pl - kategorie + AJAX w edycji wpisu
// @namespace     http://jogger.pl/
// @description   Dodaje AJAX do formularza tworzenia kategorii przy edycji newsa
// @include       https://login.jogger.pl/entries/compose/add/
// @include       https://login.jogger.pl/entries/compose/edit/
// @copyright     Michał "D4rky" Matyas, http://nerdblog.pl ; BSD License
// ==/UserScript==

function ajaxCategorySubmit()
{
	$("form").unbind('submit');
	$("form").submit(function(e) 
	{
		var category_value = $("input[name=addCategory]").attr("value");
		
		if ( category_value.length != undefined )
		{
			$.post(document.location.href, 
				   { op: 'add', 
					 token: $("#token").attr("value"), 
					 addCategory: category_value,
					 submitAddCategory: 'Dodaj' 
				   }, 
				  function(data) 
				  {
				  	$("div.sidebar").html(
				  	data.substring(data.indexOf('<div class="sidebar">')+21, 
				  	data.indexOf('<!-- sidebar -->')-6)); 

				  	ajaxCategorySubmit();
					$("input[name=addCategory]").focus();
				  });

			e.preventDefault(); 
		}
	});
}

// Content Scope Runner hack
// Makes script work in Google Chrome
var script = document.createElement('script');

// This way script is injected into document scope and can use jQuery calls
script.appendChild(
       document.createTextNode(
                ajaxCategorySubmit + ' ajaxCategorySubmit();'
                )
);

document.getElementsByTagName('head')[0].appendChild(script);