// ==UserScript==
// @name Rekrutierungszähler
// @author         blackmole
// @namespace none      
// @include        http://ch*.staemme.ch/game.php*screen=overview_villages&mode=prod
// ==/UserScript==

(function() {
  var check_group = false;
  var trans = {
    'village': 'Dorf',
    'group_all': ' >alle< '
  };

  function get_element_childs(node) {
    var element_childs = [];
    for(var i = 0, len = node.childNodes.length; i < len; ++i) {
      if (node.childNodes[i].nodeType == 1) {
        element_childs.push(node.childNodes[i]);
      }
    }
    return element_childs;
  }

  function check_overview() {
    var url = location.href + '';
    if (url.search(/screen=overview_villages&mode=prod/) == -1) {
      return false;
    }

    if (!check_group) {
      return true;
    }
    
    var strongs = document.getElementsByTagName('strong');
    for (var i = 0, len = strongs.length; i < len; ++i) {
      if (strongs[i].firstChild.nodeValue == trans['group_all']) {
        return true;
      }
    }
    
    return false;
  }
  
  function find_tbody() {
    var ths = document.getElementsByTagName('th');
    for (var i = 0, len = ths.length; i < len; ++i) {
      if (ths[i].firstChild.nodeValue == 'Dorf') {
        return ths[i].parentNode.parentNode;
      }
    }
  }

  function generate_unit_prod_dom(unit_prod) {
    var table = document.createElement('table');
    var heading_row = document.createElement('tr');
    var unit_row = document.createElement('tr');
    table.appendChild(heading_row);
    table.appendChild(unit_row);
    for (var unit in unit_prod) {
      var th = document.createElement('th');
      var img = document.createElement('img');
      img.setAttribute('src', 'graphic/unit/unit_' + unit + '.png');
      th.appendChild(img);
      heading_row.appendChild(th);

      var td = document.createElement('td');
      var text = document.createTextNode(unit_prod[unit]);
      td.appendChild(text);
      unit_row.appendChild(td);
    }

    return table;
  }

  if (!check_overview()) {
    if (check_group) {
      location.href = 'game.php?screen=overview_villages&mode=prod&group=0';
    } else {
      location.href = 'game.php?screen=overview_villages&mode=prod';
    }
    return;
  }
  
  var unit_prod = {};
  var tbody = find_tbody();
  var rows = get_element_childs(tbody);
  for (var i = 1, len = rows.length; i < len; i++) {
    var images = get_element_childs(get_element_childs(rows[i])[7]);
    for (var j = 0, lenj = images.length; j < lenj; ++j) {
      var img = images[j];
      var matches = /unit_(\w+)\.png/.exec(img.getAttribute('src'));
      var cnt = img.getAttribute('title').split('-');
      var unit_name = matches[1];
      if (typeof(unit_prod[unit_name]) == 'undefined') {
        unit_prod[unit_name] = 0;
      }
      unit_prod[unit_name] += parseInt(cnt[0], 10);
    }
  }
  
  tbody.parentNode.parentNode.insertBefore(generate_unit_prod_dom(unit_prod), tbody.parentNode);
})();