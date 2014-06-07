// ==UserScript==
// @name                TCWarBase
// @version             20070827.2
// @author              hexkid
// @description         Change WarBase layout
// @namespace           http://tcbasic.com/more/greasemonkey.html
// @include             http://torncity.com/*
// @include             http://www.torncity.com/*
// @include             http://torn.com/*
// @include             http://www.torn.com/*
// @include             http://127.0.0.1/*
// ==/UserScript==

// TCbasic

if (document.location.href.match(/\/factions\.php\?step=hitlist/)) {
  var TABLEs = document.getElementsByTagName('table');
  var lastTable;
  var targets = new Array();
  for (var i=0; i<TABLEs.length; ++i) {
    if (TABLEs[i].hasAttribute('width') && (TABLEs[i].getAttribute('width')=='85%')) {
      if (TABLEs[i].getElementsByTagName('td')[0].hasAttribute('colspan')) {
        var TRs = TABLEs[i].getElementsByTagName('tr');
        var faction = '(none)';
        for (var j=0; j<TRs.length; ++j) {
          if (TRs[j].hasAttribute('bgcolor')) {
            var TDs = TRs[j].getElementsByTagName('td');
            if (TRs[j].getAttribute('bgcolor')=='#999999') {
              faction = TDs[0].innerHTML.replace(/^.*(<a.*)$/, '$1');
            } else {
              if (TDs[4].innerHTML.match(/^0$/)) {
                if (!TDs[3].innerHTML.match(/Not In Torn City/)) {
                  if (!TDs[7].innerHTML.match(/In Fed/)) {
                    targets.push(Array(faction, TDs[1].innerHTML, TDs[2].innerHTML, TDs[6].innerHTML, TDs[7].innerHTML));
                  }
                }
              }
            }
          }
        }
        lastTable = TABLEs[i];
        TABLEs[i].style.display = 'none';
      }
    }
  }
  targets.sort(byLevelName);
  var clr = new Array('#dfdfdf', '#cccccc');
  var newtbl = document.createElement('table');
  newtbl.innerHTML = '<tr><td colspan="6"><i>Members of factions you are at war with</i></td></tr>';
  newtbl.innerHTML += '<tr bgcolor="#999999"><td><b>Faction</b></td><td><b>Enemy</b></td><td><b>Level</b></td><td><b>Attack</b></td><td><b>Online</b></td></tr>';
  for (var i=0; i<targets.length; ++i) {
    newtbl.innerHTML += '<tr bgcolor="' + clr[i%2] + '"><td>' + targets[i].join('</td><td>') + '</td></tr>';
  }
  lastTable.parentNode.insertBefore(newtbl, lastTable);
}

function byLevelName(a, b) {
  if (a[2] != b[2]) return (1*b[2]) - (1*a[2]);
  var nameA = a[1].replace(/<a.*>(.*)<\/a>\s/, '$1').toLowerCase();
  var nameB = b[1].replace(/<a.*>(.*)<\/a>\s/, '$1').toLowerCase();
  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0;
}