// ==UserScript==
// @name        O52 fix missing text for setup on ru
// @namespace   8arlock
// @include     http://*.ogame.ru/game/index.php?page=preferences
// @version     2
// ==/UserScript==
(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ('/game/index.php?page=preferences') == -1)
		return;
	var ingalaxy = document.getElementsByName ("preserveSystemOnPlanetChange");
	if ((ingalaxy != null) && (ingalaxy.length > 0))
	{
		ingalaxy[0].parentNode.previousElementSibling.textContent = "Cохранить галактику / систему при изменении планеты :";
	}
	var overlay = document.getElementsByName ("popups[notices]");
	if ((overlay != null) && (overlay.length > 0))
	{
		overlay[0].parentNode.parentNode.parentNode.previousElementSibling.children[0].textContent = "Оверлеи";
		overlay[0].parentNode.previousElementSibling.textContent = "Заметки в дополнительном окне :";
	}
	overlay = document.getElementsByName ("popups[combatreport]");
	if ((overlay != null) && (overlay.length > 0))
	{
		overlay[0].parentNode.previousElementSibling.textContent = "Подробные боевые доклады в дополнительном окне :";
	}
}
)();