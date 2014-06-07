// ==UserScript==
// @name        DL T411 + Couleur du Ratio
// @namespace   Torrent 411
// @description Ajouter un bouton DL
// @include     http://www.t411.me/*
// @grant       none
// ==/UserScript==

$.fn.addT411DownloadColumn = function() {
  return this.each(function() {
    var id = this.href.split('?')[1]; // Should be something like 'id=1234'
    var newTdElement = $("<td></td>");
    if( id != undefined && id.match(/id=[0-9]+/) ) {
      var newLinkHtml = '<a href="/torrents/download/?' + id + '"><img src="http://thepiratebay.se/static/img/dl.gif"/></a>';
      var newLinkElement = $(newLinkHtml);
      newLinkElement.css("float","left");
      newLinkElement.css("padding-left","7px");
      newLinkElement.appendTo(newTdElement);
    }
    newTdElement.insertBefore($(this).parent());
  });
};

// New distinct column header for downloading
var newThElement = $("<th>DL</th>");
newThElement.insertBefore( $('th:contains(NFO)') );

// Insert all the buttons in the new column
$('a.nfo').addT411DownloadColumn();

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


