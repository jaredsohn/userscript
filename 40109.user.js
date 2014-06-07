// ==UserScript==
// @name           Sfpl.org Amazon Links
// @description    On the search results for the San Francisco Public Library, add links to Amazon pages
// @namespace      spfl
// @author         Alissa Huskey
// @include        http://sflib1.sfpl.org/search~S1?/*, https://sflib1.sfpl.org/search~S1?
// ==/UserScript==

url = "";
base_url = 'http://www.amazon.com/gp/search/ref=sr_adv_b/?field-isbn=';
(function() {
	all_tables = document.getElementsByTagName('table');
  tables = new Array();

  for (var i = 0; i < all_tables.length; i++)
  {
    if (all_tables[i].className == 'bibDetail')
    {
      tables.push(all_tables[i]);
    }
  }

  header_table = tables[0];
  data_table = tables[1];

  trs = data_table.getElementsByTagName('tr');
  for (var x = 0; x < trs.length; x++)
  {
    tds = trs[x].getElementsByTagName('td');
    if (tds[0].innerHTML == "ISBN")
    {
      field =  tds[1].innerHTML.split(' ');
      isbn = field[0];
      url = base_url + isbn;
    }
  }

    tr = document.createElement('tr');
    th = document.createElement('td');
    td = document.createElement('td');
    link = document.createElement('a');
    link.setAttribute('href', url);
    title = document.createTextNode('find on amazon.com');

    header_table.appendChild(tr);

    tr.appendChild(th);
    tr.appendChild(td);
    td.appendChild(link);
    link.appendChild(title);

})();
