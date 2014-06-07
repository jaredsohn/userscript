// ==UserScript==
// @name        Messerforum
// @namespace   http://www.chilicon.de/messerforum
// @description Messerforum userfreundlicher machen
// @include     http://www.messerforum.net/*
// @grant       none
// @version     1.1
// ==/UserScript==

// var testoutput = document.createElement('p');
// testoutput.appendChild(document.createTextNode('Version 16'));

// var printtest = document.getElementById('ad_global_below_navbar');
// printtest.parentNode.insertBefore(testoutput, printtest);

///////////////////////////////////////////////////////////////////////////////
// Link "Heutige Beiträge" immer vor "Neue Beiträge" setzen

// Link Definition
var heutelink = document.createElement('a');
heutelink.setAttribute('href', 'search.php?do=getdaily&amp;contenttype=vBForum_Post');
heutelink.appendChild(document.createTextNode('Heutige Beiträge'));

// Foren-Übersicht
var mfneu = document.getElementById('vbflink_newposts');
if (mfneu != null) {    
    var vbqlink = document.createElement('li');
    vbqlink.id = "my_vbqlink_posts";
    vbqlink.appendChild(heutelink);
    mfneu.parentNode.insertBefore(vbqlink, mfneu);
}

// Foren-Such-Ergebnisseite oder Artikelansicht
mfneu = document.getElementById('vbnew_newposts');
if (mfneu != null) {
    var vbnew = document.createElement('li');
    vbnew.id = "my_vbnew_posts";
    vbnew.appendChild(heutelink);
    mfneu.parentNode.insertBefore(vbnew, mfneu);
}

///////////////////////////////////////////////////////////////////////////////
// Liste mit den Suchergebnissen rausgreifen, falls eine da

var searchbits = document.getElementById('searchbits');
if (searchbits != null) {

    // Alle Items untersuchen
    for (var sbititemi=0; sbititemi<searchbits.childNodes.length; sbititemi++) {

        // Alle LI Items von Threads rausgreifen
        var sbititem = searchbits.childNodes[sbititemi];
        if ((sbititem.nodeName == "LI") && (sbititem.id.match(/thread_/))) {
            var threadnr = sbititem.id.replace(/thread_/, '');

            // alle A Items rausziehen...
            var atags = sbititem.getElementsByTagName("a");
            for (var atagi=0; atagi<atags.length; atagi++) {
                var atag = atags[atagi];
                var atagid = atag.id;
                //... und wenns passt, den Link in einer neuen Seite aufmachen
                if ((atagid == ('thread_gotonew_' + threadnr)) ||
                    (atagid == ('thread_title_' + threadnr))) {
                    atag.target = "_blank";
                }
            }
        }
    }
}
