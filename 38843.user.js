// ==UserScript==
// @name           ESPN FBA Player Rater
// @namespace      http://ellab.org/
// @description    ESPN FBA Player Rater
// @include        http://games.espn.go.com/fba/playerrater*
// ==/UserScript==

function EspnFbaRater() {
  this.isChrome = false;
  this.enabled = true;
}

EspnFbaRater.prototype.init = function() {
  if (navigator.userAgent.match(/Chrome/)) {
    this.enabled = document.location.href.indexOf('http://games.espn.go.com/fba/playerrater') == 0;
    this.isChrome = true;
  }

  if (this.enabled && document.body) this.functionPrinciple();
}

EspnFbaRater.prototype.checkLoadData = function() {
  var table = document.getElementById('playertable_0');
  for (var i=2;i<table.rows.length;i++) {
    if (!table.rows[i].cells[1].innerHTML) {
      this.loadData(table.rows[i]);
      break;
    }
  }
}

EspnFbaRater.prototype.processData = function(t, tr) {
  var prk = t.match(/<strong>PRK:<\/strong> ([\d\.]+)/);
  if (prk) {
    tr.cells[1].innerHTML = prk[1];
  }
  else {
    tr.cells[1].innerHTML = '---';
  }

  var own = t.match(/<strong>%OWN: <\/strong>([\d\.]+)/);
  if (own) {
    tr.cells[2].innerHTML = own[1];
  }
  else {
    tr.cells[2].innerHTML = '---';
  }

  var adp = t.match(/<strong>ADP:<\/strong> ([\d\.]+)/);
  if (adp) {
    adp = adp[1];
    tr.cells[3].innerHTML = adp;
    var rank = parseInt(tr.cells[0].textContent, 10);
    var diff = (adp * 10 - rank * 10) / 10;
    if (diff == parseInt(diff, 10)) {
      diff += '.0';
    }

    tr.cells[4].innerHTML = (adp > rank?'+':'') + diff;
  }
  else {
    tr.cells[3].innerHTML = '---';
    tr.cells[4].innerHTML = '---';
  }
}

EspnFbaRater.prototype.loadData = function(tr) {
  var efr = this;

  tr.cells[1].innerHTML = '...';
  var pid = tr.getAttribute('id').match(/\d+$/)[0];
  var client = new XMLHttpRequest();
  client.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var t = this.responseText;
      efr.processData(t, tr);
      efr.checkLoadData();
    }
  };
  client.open('GET', 'http://games.espn.go.com/fba/format/playerpop/overview?playerId=' + pid + '&playerIdType=playerId&seasonId=2009');
  client.send(null);
}

EspnFbaRater.prototype.doADP = function() {
  var table = document.getElementById('playertable_0');

  table.rows[0].cells[0].setAttribute('colspan', 6);
  var td = document.createElement('td');
  td.innerHTML = 'PRK';
  td.title = 'Positional Rank';
  td.className = 'playertableData';
  table.rows[1].insertBefore(td, table.rows[1].cells[1]);
  td = document.createElement('td');
  td.innerHTML = '%OWN';
  td.title = '% of leagues in which player is owned';
  td.className = 'playertableData';
  table.rows[1].insertBefore(td, table.rows[1].cells[2]);
  td = document.createElement('td');
  td.innerHTML = 'ADP';
  td.title = 'Average Draft Position';
  td.className = 'playertableData';
  table.rows[1].insertBefore(td, table.rows[1].cells[3]);
  td = document.createElement('td');
  td.innerHTML = 'Diff';
  td.title = 'ADP - Rank';
  td.className = 'playertableData';
  table.rows[1].insertBefore(td, table.rows[1].cells[4]);

  for (var i=2;i<table.rows.length;i++) {
    var tr = table.rows[i];
    var td = document.createElement('td');
    td.style.textAlign = 'right';
    tr.insertBefore(td, tr.cells[1]);
    td = document.createElement('td');
    td.style.textAlign = 'right';
    tr.insertBefore(td, tr.cells[2]);
    td = document.createElement('td');
    td.style.textAlign = 'right';
    tr.insertBefore(td, tr.cells[3]);
    td = document.createElement('td');
    td.style.textAlign = 'right';
    tr.insertBefore(td, tr.cells[4]);
    if (i<7) this.checkLoadData();
  }
}

EspnFbaRater.prototype.functionPrinciple = function() {
  var res = document.evaluate("//td[@id='maincontainertblcell']//div[contains(@class,'toolSetShell')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (!res) return;

  var efr = this;

  res.appendChild(document.createTextNode(' | '));
  var a = document.createElement('a');
  a.innerHTML = 'View More Info';
  a.href = 'javascript:void(0)';
  a.addEventListener('click', function(e) {
    e.target.parentNode.appendChild(document.createTextNode(e.target.innerHTML));
    e.target.parentNode.removeChild(e.target);
    efr.doADP();
  }, false);
  res.appendChild(a);
}

new EspnFbaRater().init();