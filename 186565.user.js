// ==UserScript==

// @name           Collage Links
// @namespace      http://missing.li.nk/
// @description    Additional links on torrent pages with regards to collages. Written by Neobenedict.
// @include        http*://tracker.deepbassnine.com/torrents.php*id=*
// @include        http*://tracker.beathau5.com/torrents.php*id=*
// @include        http*://*what.cd/torrents.php*id=*
// @version        1.00
// @date           2013

// ==/UserScript==

function strstr(haystack, needle, bool) {
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/strstr    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    var pos = 0;

    haystack += "";
    pos = haystack.indexOf(needle); if (pos == -1) {
        return false;
    } else {
        if (bool) {
            return haystack.substr(0, pos);
        } else {
            return haystack.slice(pos);
        }
    }
}

var collageTable = document.getElementById('collages');

if (collageTable) {
    var collageLoop = collageTable.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    for (i = collageLoop.length - 1; i >= 1; i--) {
        var collageTDs = collageLoop[i].getElementsByTagName('td');
        
        var collageA = collageTDs[0];
        var collageID = strstr(collageA.getElementsByTagName('a')[0].getAttribute('href'),'=',false).substring(1);
        collageA.innerHTML += "&nbsp;[<a target=\"_blank\" href=\"/collages.php?action=edit&collageid=" + collageID + "\">Edit</a>] "; 
        
        var collageB = collageTDs[1];
        collageB.innerHTML += "&nbsp;[<a target=\"_blank\" href=\"/collages.php?action=manage&collageid=" + collageID + "\">Manage</a>] ";
    }
}