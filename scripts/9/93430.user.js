// ==UserScript==
// @name           Caribic Islands Fail Spyclean
// @namespace      Caribic Islands
// @description    Markiert fehlgeschlagene und doppelte Spionagen zum löschen
// @include        http://s*.caribicislands.org/s4/index.php?sid=*&p=message*
// ==/UserScript==

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  ~~~~~~~~~~~~~~~~~~~ S T A R T ~~~~~~~~~~~~~~~~~~~
  ~~~~~~~~~~~~~~ F U N K T I O N E N ~~~~~~~~~~~~~~
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

// Suchen einer Textpassage zwischen 2 bestimmten Punkten
function str_search (from, to, subject) {  return subject.split(from)[1].split(to)[0];  }

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  ~~~~~~~~~~~~~~ F U N K T I O N E N ~~~~~~~~~~~~~~
  ~~~~~~~~~~~~~~~~~~~~ E N D E ~~~~~~~~~~~~~~~~~~~~
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


var NewsTableRows = new Array();
    NewsTableRows = document.getElementsByTagName('table')[8].getElementsByTagName('tr');

if (document.getElementsByName('show_cat')[0].value == 6) {
  var Koords = new Array();
  var NewElement = 0;  
  var exist = 0;

  for(var i=0; i<NewsTableRows.length; i++) {
    if (NewsTableRows[i].getElementsByTagName('td').length == 5 && NewsTableRows[i].getElementsByTagName('td')[0].getElementsByTagName('img')[0]) {
      var Status = str_search('research','.gif', NewsTableRows[i].getElementsByTagName('td')[2].getElementsByTagName('img')[0].src);
      var Koordinaten = str_search(' (','.)', NewsTableRows[i].getElementsByTagName('td')[2].getElementsByTagName('a')[0].innerHTML);
      if (Status == 1) {       
      
        for (var i2=0; i2<NewElement; i2++) {
          if (Koords[i2] == Koordinaten) {
             exist = 1; 
             NewsTableRows[i].getElementsByTagName('td')[4].getElementsByTagName('input')[0].checked = 'checked';
          }
        }
        if (exist == 0) var NewElement = Koords.push(Koordinaten);
        exist = 0;
      }
      else  NewsTableRows[i].getElementsByTagName('td')[4].getElementsByTagName('input')[0].checked = 'checked';
    }
  }
// Dropdown auf loeschen stellen
  document.getElementsByName('do_action')[0].getElementsByTagName('option')[1].selected = 'selected';  // Auswahl des Dropdown auf löschen
}