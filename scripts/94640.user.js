// ==UserScript==
// @name				سيكربت يقوم بتلوين المزارع في الشكل العام من تعريب أخوكم محمد احمد 20
// @namespace			none
// @description			تلوين المزارع 
// @include			http://*/game.php?*
// ==/UserScript==



var column_number = (document.body.innerHTML.match(/arrow_down.png/)) ? 5 : 4;
var tables = document.getElementsByTagName('table');
function zagrody_multi() {
  for (i = tables.length-1; i >= 0; i--)
  {
    if (tables[i].getElementsByTagName('tr').length == 0) continue;
    var tr = tables[i].getElementsByTagName('tr')[0];
    if (tr.getElementsByTagName('th').length == 0) continue;
    if (tr.getElementsByTagName('th')[0].innerHTML.replace(/<.*?>/gi, "") != "القريه" ) continue;
    rows = tables[i].getElementsByTagName('tr');
    break;
  }
  try {
   for (i = 1; i < rows.length; i++)
   {
  	var text = rows[i].getElementsByTagName('td')[column_number].innerHTML;
	  var occupied = text.substr(0, text.indexOf("/"));
  	var capacity = text.substr( text.indexOf("/") + 1, text.length - text.indexOf("/") - 1 );  
	  var zapelnienie = occupied / capacity
    
    if (zapelnienie < 0.40 ) {
	    rows[i].getElementsByTagName('td')[column_number].style.color = "grey";
    }
    if ((zapelnienie >= 0.40 ) && (zapelnienie < 0.70 )) {
	    rows[i].getElementsByTagName('td')[column_number].style.color = "#6DE377";
    }
    if ((zapelnienie >= 0.70 ) && (zapelnienie < 0.90 )) {
	    rows[i].getElementsByTagName('td')[column_number].style.color = "#A67A42";
    }
    if ((zapelnienie >= 0.90 ) && (zapelnienie < 1.00 )) {
	    rows[i].getElementsByTagName('td')[column_number].style.color = "orange";
    }
    if (zapelnienie == 1.00)	{
	    rows[i].getElementsByTagName('td')[column_number].style.color = "red";
    }
   }
  } catch (evt) {};
}

zagrody_multi();