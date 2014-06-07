// ==UserScript==
// @name        Forum closing
// @namespace   http://dev.webnaute.net
// @description Fermer les forums qu'on ne veut pas voir
// @include     http://forum.lesroyaumes.com/index.php*
// @include     http://forum.lesroyaumes.com
// @exclude     http://forum.lesroyaumes.com/index.php?c=*
// @version     1
// ==/UserScript==
//
var cats = document.getElementsByClassName("catLeft");
var i;

unsafeWindow.addcookiecat = function(cat,val) {
    document.cookie = "cat"+cat+"display = "+val+";expires=Tue, 19 Jan 2038 03:14:07 GMT";
    document.location.reload();
}

unsafeWindow.delcookiecat = function(cat) {
    document.cookie = "cat"+cat+"display = 0;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.location.reload();
}

function getcookiecat(cat)
{
    var cookie = document.cookie;
    var cat = "cat" + cat + "display=";
    var idx = cookie.indexOf(cat);
    if (idx < 0) return 0;
    return cookie.charAt(idx + cat.length);
}

var to_remove = new Array();
var to_down = new Array();
var to_up = new Array();
var to_keep = new Array();
var ma_gargotte = new Array();
for (i = 0 ; i < cats.length ; ++i) {
    var tr = cats[i].parentNode;
    if (tr.nextSibling == undefined) {
        tr.nb_f = 0;
    } else if (tr.nextSibling.nextSibling == undefined) {
        tr.nb_f = 1;
    } else {
        var trloop = tr;
        for (var j = 0 ; trloop.nextSibling != undefined ; ++j) {
            trloop = trloop.nextSibling;
            if (trloop.nodeName == "TR") {
                cn = trloop.getElementsByTagName("td")[0].className;
                if (cn == "catLeft") break;
            }
        }
        tr.nb_f = j;
    }

    if (tr.nb_f < 2) {
        to_remove.push(tr);
    } else {
        var forum_uri = cats[i].getElementsByTagName("a")[0].href;
        var forumid =  forum_uri.substr(forum_uri.indexOf("c=") + 2);
        var pos = getcookiecat(forumid);
        if (pos == 3) {
            cats[i].innerHTML += ' <a href="javascript:delcookiecat('+forumid+')">Ne plus cacher</a>';
        } else if (pos == 1) {
            cats[i].innerHTML += ' <a href="javascript:delcookiecat('+forumid+')">Plus favori</a>';
        } else {
            cats[i].innerHTML += ' <a href="javascript:addcookiecat('+forumid+',1)">Favori</a> <a href="javascript:addcookiecat('+forumid+',3)">Cacher</a>';
        }
        if (i == 0) cats[i].innerHTML += " (ma gargotte)";
        if (pos == 1) {
            var trloop = tr;
            for (var r = 0 ; r <= tr.nb_f ; ++r) {
                to_up.push(trloop);
                trloop = trloop.nextSibling;
            }
        } else if (i == 0 || pos != 3) { // Ne jamais cacher la gargote courante
            var trloop = tr;
            for (var r = 0 ; r <= tr.nb_f ; ++r) {
                to_keep.push(trloop);
                trloop = trloop.nextSibling;
            }
        } else {
            for (var r = 0 ; r < tr.nb_f ; ++r) {
                tr.parentNode.removeChild(tr.nextSibling);
            }
            to_down.push(tr);
        }
    }

}

// Insérer des nodes au milieu du tableau marche mal, on le réécrit donc complètement
while (to_remove.length > 0) {
    var tr = to_remove.shift();
    tr.parentNode.removeChild(tr);
}


while (to_up.length > 0) {
    var tr = to_up.shift();
    tr.parentNode.appendChild(tr);
}

while (to_keep.length > 0) {
    var tr = to_keep.shift();
    tr.parentNode.appendChild(tr);
}

while (to_down.length > 0) {
    var tr = to_down.shift();
    tr.parentNode.appendChild(tr);
}

