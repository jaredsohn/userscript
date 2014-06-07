// ==UserScript==
// @name        T411 Ratio Manager
// @namespace   t411
// @description Donne une couleur a votre ratio en fonction de son niveau.
// @include     http://www.t411.me/*
// @version     1.0
// @grant       none
// ==/UserScript==

(function (d) {
	var ratio = d.getElementsByClassName('rate');
	if (ratio[0].textContent.replace(',', '.') > 1)
	{
		ratio[0].outerHTML = "<strong title=\"Ratio OK !\" class=\"rate\" style=\"color:green;\">" + ratio[0].textContent + "</strong>";
	} else if (ratio[0].textContent.replace(',', '.') < 1 && ratio[0].textContent.replace(',', '.') > 0.80)
	{
		ratio[0].outerHTML = "<strong title=\"Vous devriez seeder un peu plus !\" class=\"rate\" style=\"color:orange;\">" + ratio[0].textContent + "</strong>";
	} else if (ratio[0].textContent.replace(',', '.') > 0.80)
	{
		ratio[0].outerHTML = "<strong title=\"Attention !\nBloquage du compte en dessous de 0.75 !\" class=\"rate\" style=\"color:red;\">" + ratio[0].textContent + "</strong>";
	}
})(document);