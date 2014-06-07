// ==UserScript==
// @name          Tibia Guild Who's Online
// @namespace     http://www.erig.net/
// @description   Shows which characters are online on a guild page
// @include       http://www.tibia.com/community/?subtopic=guilds*
// @version       0.8
// @author        Erig (http://www.erig.net/)
// ==/UserScript==

// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need FireFox http://www.mozilla.org/products/firefox and 
// the Firefox extension called Greasemonkey: http://greasemonkey.mozdev.org/
// Install the Greasemonkey extension then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Tibia Guild Who's Online", and click Uninstall.
//
// --------------------------------------------------------------------


(function() {
    var header;
    var request;
    var players = [];
    var oplayers = [];
    var oplayers_l = [];
    var oplayers_v = [];
    var players_o = [];
    var tab;

    hideonline = function() {
        var find = 'table[' + tab + ']/tbody//tr/td[2]/a/text()';
        var result1 = document.evaluate(find, parent, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var c = 0; c < result1.snapshotLength; c++) {
            player = result1.snapshotItem(c);
            player.parentNode.parentNode.parentNode.style.display = '';

            var player2 = player.textContent;
            player2 = player2.replace(/(\xa0|&#160;|&nbsp;| )/g, ' ');

            player.parentNode.parentNode.innerHTML = players_o[player2];
        }

        header.innerHTML = header.origHTML + ' (<a href="/" onclick="return showonline()" style="color: green">[Show Online]</a>) <span style="font-size: 9px">Guild Members: ' + members + '</span>';
        return false;
    }
    unsafeWindow.hideonline = hideonline;

    var find = '/html/body/div/div/div/div[2]/div/div/div/div[5]/div/div/table/tbody/tr/td[2]';

    var result2 = document.evaluate(find, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    var parent = result2.iterateNext();

    if (parent == null)
        return;

    function findworld(find) {
        var result3 = document.evaluate(find, parent, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
        var worldline = result3.iterateNext().textContent;
        var regex = new RegExp('The guild was founded on (.+?) on', 'g');
        if (worldline.match(regex)) {
            var m = regex.exec(worldline);
            if (m)
                return m[1];
        }
        else
            return '';
    }

    var world = findworld('text()[3]');
    if (world == '')
        world = findworld('text()[2]');
    if (world == '')
        return;

    tab = 2;

    var find = 'table[' + tab + ']/tbody//tr/td[2]/a/text()';
    var result5 = document.evaluate(find, parent, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    if (result5.snapshotLength == 0) {
        tab = 3;
        find = 'table[' + tab + ']/tbody//tr/td[2]/a/text()';
        result5 = document.evaluate(find, parent, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    }

    for (var c = 0; c < result5.snapshotLength; c++) {
        player = result5.snapshotItem(c);
        player = player.textContent;
        player = player.replace(/(\xa0|&#160;|&nbsp;| )/g, ' ');
        players[player] = player;
    }

    var members = result5.snapshotLength;

    var find = 'table[' + tab + ']/tbody/tr/td';
    var result4 = document.evaluate(find, parent, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    header = result4.iterateNext();
    header.origHTML = header.innerHTML;
    header.innerHTML = header.origHTML + ' (<a href="/" onclick="return showonline()" style="color: green">[Show Online]</a>) <span style="font-size: 9px">Guild Members: ' + members + '</span>';

    httprecv = function() {
        if (request.readyState != 4)
            return;

        oplayers = [];
        oplayers_l = [];
        oplayers_v = [];

        var text = request.responseText;
        // subtopic=character&name=.+?>(.+?)</A></TD><TD.*?>(.+?)</TD><TD.*?>(.+?)</TD></TR>
        var regex = new RegExp('subtopic=characters&name=.+?">(.+?)<', 'g');
        var regex = new RegExp('subtopic=characters&name=.+?>(.+?)</A></TD><TD.*?>(.+?)</TD><TD.*?>(.+?)</TD></TR>', 'g');

        var matches = 0;

        while((m = regex.exec(text)) != null) {
            matches++;

            m[1] = m[1].replace(/(\xa0|&#160;|&nbsp;| )/g, ' ');

            if (players[m[1]] != null) {
                oplayers[m[1]] = m[1];
                oplayers_l[m[1]] = m[2];

                var voc = m[3].replace(/(\xa0|&#160;|&nbsp;| )/g, ' ');
                if (voc == 'Knight')               voc = 'K';
                else if (voc == 'Elite Knight')    voc = 'EK';
                else if (voc == 'Paladin')         voc = 'P';
                else if (voc == 'Royal Paladin')   voc = 'RP';
                else if (voc == 'Sorcerer')        voc = 'S';
                else if (voc == 'Master Sorcerer') voc = 'MS';
                else if (voc == 'Druid')           voc = 'D';
                else if (voc == 'Elder Druid')     voc = 'ED';
                else if (voc == 'None')            voc = 'ROOK';
                else                               voc = '?';

                oplayers_v[m[1]] = voc;
            }
        }

        var onlinecount = 0;
        var player_rank = ''; var player_rank_showed = false;

        var find = 'table[' + tab + ']/tbody//tr/td[2]/a/text()';
        var result6 = document.evaluate(find, parent, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var c = 0; c < result6.snapshotLength; c++) {
            player = result6.snapshotItem(c);
            var player2 = player.textContent;
            player2 = player2.replace(/(\xa0|&#160;|&nbsp;| )/g, ' ');

            players_o[player2] = player.parentNode.parentNode.innerHTML;

            if (player.parentNode.parentNode.parentNode.firstChild.innerHTML.replace(/(\xa0|&#160;|&nbsp;| )/g, ' ').replace(/^\s+|\s+$/g,'') != '') {
                player_rank = player.parentNode.parentNode.parentNode.firstChild.innerHTML.replace(/(\xa0|&#160;|&nbsp;| )/g, ' ').replace(/^\s+|\s+$/g,'');
                player_rank_showed = false;
            }

            if (oplayers[player2] == null)
                player.parentNode.parentNode.parentNode.style.display = 'none';
            else {
                onlinecount++;
                if (player_rank_showed == false) { player.parentNode.parentNode.parentNode.firstChild.innerHTML = player_rank; player_rank_showed = true; }
                player.parentNode.parentNode.innerHTML += ' <span style="font-size: 9px; color: black"> (' + oplayers_l[player2] + ' / ' + oplayers_v[player2] + ')</span>';
            }
        }

        header.innerHTML = header.origHTML + ' (<a href="/" onclick="return hideonline()" style="color: green">[Show All]</a>) <span style="font-size: 9px">Guild Members: ' + members + ' &nbsp; Guild Online: ' + onlinecount + ' &nbsp; Total Online on ' + world + ': ' + matches + '</span>';
    };

    showonline = function() {
        request = new XMLHttpRequest();
        request.onreadystatechange = httprecv;
        var time = new Date();
        time = time.getTime();

        var url = 'http://www.tibia.com/community/?subtopic=whoisonline&world=' + world + '&rand=' + time;
        request.open('GET', url);
        request.send(null);
        return false;
    }
    unsafeWindow.showonline = showonline;
})();
