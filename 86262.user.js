// ==UserScript==
// @name            Warez-BB Graveyard Posts Filter
// @description     Filters graveyard entries in search. This includes personal searches, also (View your topics and View your posts).
// @include         http://www.warez-bb.org/search.php*
// @copyright       xKernel.
// ==/UserScript==


(function()
{

function FilterWebpage() {
	var rows = document.getElementsByClassName("forumline")[0].getElementsByTagName('tr');
	for ( var i = 1; i < rows.length; i++ ){
		if(rows[i].getElementsByTagName('td')[1].getElementsByTagName('a')[0].innerHTML.match(/Graveyard/))
		{
			rows[i].style.display='none';
		}

	}
};

FilterWebpage();

})();