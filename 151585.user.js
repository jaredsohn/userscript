// ==UserScript==
// @name        Rezultati Main Leagues in Top
// @namespace   rezultati
// @include     *.rezultati.com*
// @version     1
// ==/UserScript==
/*--- To "refire" our Greasemonkey code on AJAX changes, we wrap it in
    a function and call it on a DOM change event.
*/

var zGbl_DOM_ChangeTimer                = '';
var bGbl_ChangeEventListenerInstalled   = false;


window.addEventListener ("load", MainAction, false);


function MainAction ()
{
    if (!bGbl_ChangeEventListenerInstalled)
    {
        bGbl_ChangeEventListenerInstalled   = true;
        document.addEventListener ("DOMSubtreeModified", HandleDOM_ChangeWithDelay, false);
    }
		$(".table-main").prepend($("span[class='name']:contains('FRANCUSKA: Ligue 1')").parent().parent().parent().parent().parent());
	$(".table-main").prepend($("span[class='name']:contains('NIZOZEMSKA: Eredivisie')").parent().parent().parent().parent().parent());
	$(".table-main").prepend($("span[class='name']:contains('NJEMAČKA: Bundesliga')").parent().parent().parent().parent().parent());
	$(".table-main").prepend($("span[class='name']:contains('ŠPANJOLSKA: Primera Division')").parent().parent().parent().parent().parent());
	$(".table-main").prepend($("span[class='name']:contains('EUROPA: Liga Prvaka')").parent().parent().parent().parent().parent());
	$(".table-main").prepend($("span[class='name']:contains('ENGLESKA: Premier League')").parent().parent().parent().parent().parent());
	$(".table-main").prepend($("span[class='name']:contains('ITALIJA: Serie A')").parent().parent().parent().parent().parent());
	$(".table-main").prepend($(".sport-label"));
}


function HandleDOM_ChangeWithDelay (zEvent)
{

    if (typeof zGbl_DOM_ChangeTimer == "number")
    {
        clearTimeout (zGbl_DOM_ChangeTimer);
        zGbl_DOM_ChangeTimer = '';
    }
    zGbl_DOM_ChangeTimer     = setTimeout (function() { MainAction (); }, 222); //-- 222 milliseconds
}
