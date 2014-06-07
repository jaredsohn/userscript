// ==UserScript==
// @name           CalcEnergy
// @namespace      http://willden.org/shawn
// @description    Calculate muzzle energies from velocities
// @include        http://www.ballisticsbytheinch.com/*
// @include        http://ballisticsbytheinch.com/*
// ==/UserScript==

window.calcEnergy = function(velocity, weight) {
   return Math.round(weight * velocity * velocity / 450395);
}

window.getRows = function(table) {
    return document.evaluate('.//tr', table, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

window.getCells = function(row) {
    return document.evaluate('.//td', row, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

window.extractWeights = function(table) {

    var rows = getRows(table);
    var row = rows.snapshotItem(0);

    var cells = getCells(row);
    var re  = new RegExp("(\\d+) gr.");

    var weights = new Array();
    for (var i = 1; i < cells.snapshotLength; ++i) {
      var cell = cells.snapshotItem(i);
      var text = cell.textContent;
      var match = re.exec(text);
      weights[i] = match[1];
    }

    return weights;
}

window.addEnergies = function(table, weights) {
    var rows = getRows(table);

    for (var i = 0; i < rows.snapshotLength; ++i) {
        var cells = getCells(rows.snapshotItem(i));
        for (var j = 0; j < cells.snapshotLength; ++j) {
            var cell = cells.snapshotItem(j);
            var text = cell.textContent;
            if (!isNaN(text)) {
                var energy = calcEnergy(text, weights[j]);
                cell.innerHTML = text + '<br/>' + energy;
            }
        }
    }
}

var dataTables = document.evaluate('/html/body/table[2]/tbody//table', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var weights = extractWeights(dataTables.snapshotItem(0));

for (var i = 0; i < dataTables.snapshotLength; ++i)
    addEnergies(dataTables.snapshotItem(i), weights);