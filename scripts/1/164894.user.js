// ==UserScript==
// @name          BvS Village Yesterday Report
// @description   Improvement for the Yesterday's report on the Village Page
// @include       http://*animecubed.com/billy/bvs/village.html
// @version       1.1
// @history       1.0 Initial release
// @history       1.1 Fix for Kage Tools
// ==/UserScript==

function addStyle(css) {
    var head = document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = css;
    head.appendChild(style);
}

function getPlayerData() {
    var activePlayers = {};
    var idlingPlayers = [];
    var parseFunctions = {};

    var addPlayerData = function(playerName, key, value) {
        if (playerName === 'None') {
            return;
        }
        if (!activePlayers[playerName]) {
            activePlayers[playerName] = {};
        }

        activePlayers[playerName][key] = value;
    };
    parseFunctions['Contributions:'] = function(node) {
        var split = node.textContent.split(' - ');
        var playerName = split[0];
        var contribution = split[1];

        addPlayerData(playerName, 'contribution', contribution);
    };
    parseFunctions['Collectors:'] = function(node) {
        addPlayerData(node.textContent, 'villageAction', 1);
    };
    parseFunctions['Patrollers:'] = function(node) {
        addPlayerData(node.textContent, 'villageAction', 2);
    };
    parseFunctions['Repairers:'] = function(node) {
        addPlayerData(node.textContent, 'villageAction', 3);
    };
    parseFunctions['Paper-pushers:'] = function(node) {
        addPlayerData(node.textContent, 'villageAction', 4);
    };
    parseFunctions['Resuppliers:'] = function(node) {
        addPlayerData(node.textContent, 'villageAction', 5);
    };
    parseFunctions['Sappers:'] = function(node) {
        addPlayerData(node.textContent, 'villageAction', 6);
    };
    parseFunctions['Lazy Ninja:'] = function(node) {
        var result = /([\w ]+)(\((\d+) days Idle\))?/.exec(node.textContent);
        var playerName = result[1].replace(/\s+$/, '');
        var daysIdle = result[3] || 1;
        idlingPlayers.push({
            name: playerName,
            idle: daysIdle
        });
    };

    var emptyParseFunction = function(message) {
        return function() {
            console.log(message);
        };
    };
    var parseNodeFunction = emptyParseFunction('empty parse function for village report');

    var nodes = document.getElementById('yesterrep').childNodes;
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (/^b$/i.test(node.nodeName)) {
            parseNodeFunction = parseFunctions[node.textContent] || emptyParseFunction(node.textContent);
        }
        if (/^#text$/i.test(node.nodeName)) {
            parseNodeFunction(node);
        }
    }

    return {
        activePlayers: activePlayers,
        idlingPlayers: idlingPlayers
    };
}

function createTextTd(text) {
    var td = document.createElement('td');
    td.appendChild(document.createTextNode(text));
    return td;
}

function createVillageActionTd(action) {
    var td = document.createElement('td');
    if (action) {
        var img = document.createElement('img');
        img.setAttribute('src', '/billy/layout/actionmark' + action + '.gif');
        td.appendChild(img);
    }
    return td;
}

function createPlayerTd(playerName) {
    var td = document.createElement('td');
    var link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'lookup.html?player=' + playerName);
    link.appendChild(document.createTextNode(playerName));
    td.appendChild(link);
    return td;
}

function addActivePlayersReport(activePlayers) {
    var container = document.getElementById('newyesterrep');

    var header = document.createElement('b');
    header.appendChild(document.createTextNode('Active players:'));
    container.appendChild(header);
    container.appendChild(document.createElement('br'));

    var table = document.createElement('table');
    table.setAttribute('class', 'reportTable');
    for (var i in activePlayers) {
        var tr = document.createElement('tr');
        if (activePlayers[i].villageAction) {
            tr.appendChild(createVillageActionTd(activePlayers[i].villageAction));
        } else {
            tr.appendChild(createTextTd(''));
        }
        tr.appendChild(createPlayerTd(i));
        tr.appendChild(createTextTd(activePlayers[i].contribution || 0));

        table.appendChild(tr);
    }

    container.appendChild(table);

    container.appendChild(document.createElement('br'));
}

function addIdlingPlayersReport(idlingPlayers) {
    var container = document.getElementById('newyesterrep');

    idlingPlayers.sort(function(a, b) {
        return b.idle - a.idle;
    });

    var header = document.createElement('b');
    header.appendChild(document.createTextNode('Idling players:'));
    container.appendChild(header);
    container.appendChild(document.createElement('br'));

    var table = document.createElement('table');
    table.setAttribute('class', 'reportTable');
    for (var i = 0; i < idlingPlayers.length; i++) {
        var tr = document.createElement('tr');

        tr.appendChild(createPlayerTd(idlingPlayers[i].name));
        tr.appendChild(createTextTd(idlingPlayers[i].idle));

        table.appendChild(tr);
    }

    container.appendChild(table);
}

(function() {
    var data = getPlayerData();

    var container = document.getElementById('yesterrep');
    container.style.display = 'none';

    var newContainer = document.createElement('div');
    newContainer.id = 'newyesterrep';
    newContainer.style.height = '15em';
    newContainer.style.overflow = 'auto';
    newContainer.style.overflowX = 'hidden';
    container.parentNode.appendChild(newContainer);
    var link = document.evaluate("//a[contains(@href, 'yesterrep')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
    link.href = link.href.replace('yesterrep', 'newyesterrep');
    
    addActivePlayersReport(data.activePlayers);
    addIdlingPlayersReport(data.idlingPlayers);

    addStyle([
        'table.reportTable {border-spacing: 0;}',
        'table.reportTable td {font-size: 12px; padding: 0 5px;}',
        'table.reportTable td a {color: black; text-decoration: none;}'
    ].join('\n'));
})();
