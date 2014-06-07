// ==UserScript==
// @name           HTML Log
// @namespace      kol.interface.unfinished
// @description    Intepretes your KOL quest log as HTML.
// @include        http://*kingdomofloathing.com/questlog.php?which=4*
// @include        http://127.0.0.1:*/questlog.php?which=4*
// ==/UserScript==

// version 1.1.1
//  Added ability to insert current pwdhash into ingame urls
//   the text "pwd=" will have the current pwdhash inserted right
//   after the = character.
// version 1.1
//  Some regexp matching to allow a few wiki-style formatting codes
//   <<X|Y>> links to the in-game url path X, with linked text Y 
//           (the "X|" part is optional, defaulting to Y|)
//   [[X|Y]] links to the kolwiki for X, with linked text Y 
//           (the "X|" part is optional, defaulting to Y|)
//     in the url translation spaces are converted to underscores
//   '''X''' makes X bold
//   ''X'' makes X italic
//   note: this is not real parsing; you cannot nest bold in italic etc.
//  Translate ampersands so they can be used.
// version 1.0

var wiki='http://kol.coldfront.net/thekolwiki/index.php/';


function findPwdhash() {
    var somef=window.parent.frames;
    var goo = null;
    for(var j=0;j<somef.length;j++) {
        if (somef[j].name=="charpane") {
            goo=somef[j];
            var page = goo.document.documentElement.innerHTML;
            var find = 'pwdhash = ';
            if (page.indexOf(find) >= 0) {
                var i = page.indexOf(find);
                var j = find.length;
                var ps = page.substr(i+j+2);
                var foundit = page.substr(i+j+1,ps.indexOf('"')+1);
                return foundit;
            }
        }
    }
    return null;
}

function insertHTML() {
    var listing = document.getElementsByTagName('form');
    for (var i=0;i<listing.length;i++) {
        var x = listing[i];
        if (x.getAttribute('action')=='questlog.php?which=4') {
            var z = document.createElement('div');
            var ta = document.getElementsByTagName('textarea')[0];
            if (ta) {
                var v = ta.innerHTML.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
                // handle [[X|kol wiki link]]
                var links=v.split('[[');
                var newv=links[0];
                for (var j=1;j<links.length;j++) {
                    var bits=links[j].split(']]');
                    var url;
                    if (bits[0].indexOf('|')>=0) {
                        // replacement url
                        var morebits=bits[0].split('|');
                        url='<a href="'+wiki+morebits[0].replace(/\s/g,'_')+'">'+morebits[1]+'</a>';
                    } else {
                        linkname=bits[0];
                        url='<a href="'+wiki+bits[0].replace(/\s/g,'_')+'">'+bits[0]+'</a>';
                    }
                    newv += url+bits[1];
                }
                v=newv;
                // handle <<X|ingame link>>
                links=v.split('<<');
                newv=links[0];
                var pwdhash = 'pwd='+findPwdhash();
                for (var j=1;j<links.length;j++) {
                    var bits=links[j].split('>>');
                    var url;
                    if (bits[0].indexOf('|')>=0) {
                        // replacement url
                        var morebits=bits[0].split('|');
                        if (morebits[0].indexOf('pwd=')>=0)
                            morebits[0]=morebits[0].replace(/pwd=/g,pwdhash);
                        url='<a href="'+morebits[0].replace(/\s/g,'_')+'">'+morebits[1]+'</a>';
                    } else {
                        if (bits[0].indexOf('pwd=')>=0)
                            bits[0]=bits[0].replace(/pwd=/g,pwdhash);
                        url='<a href="'+bits[0].replace(/\s/g,'_')+'">'+bits[0]+'</a>';
                    }
                    newv += url+bits[1];
                }
                v=newv;
                //v = v.replace(/\[\[([^\]]*)\]\]/g,'<a href="'+wiki+'/$1'.replace(/\s/g,'_')+'">$1</a>');
                // handle bold, italics
                v = v.replace(/\'\'\'([^\']*)\'\'\'/g,'<b>$1</b>');
                v = v.replace(/\'\'([^\']*)\'\'/g,'<i>$1</i>');
                z.innerHTML=v;
                x.parentNode.insertBefore(z,x);
            } 
        }
    }
}


insertHTML();
