// ==UserScript==
// @name           MyBrute Pupil Linkifier
// @namespace      http://userscripts.org/users/escgoat
// @description    turns new pupil and pupil levelup messages into links
// @include        http://*.mybrute.com/cellule*
// @include        http://*.elbruto.es/cellule*
// @include        http://*.labrute.fr/cellule*
// @version        1.31
// ==/UserScript==
/*
    Version History:
    1.31 - minor fix for dots in winner names
    1.3 - links to opponent cells are now added for win/loss log entries
    1.2 - very minor update to correct handling of single and multiple dots in and/or at the end of pupil names (hopefully) 
    1.1 - added support for labrute.fr and elbruto.es
    1.0 - initial release
*/
// Credits:  Credits go almost entirely to kuNDze as this was originally based on a small   
//	 portion of his "myBrute info" script (http://userscripts.org/scripts/show/55996)
//
////



function makeLink(brute) {
    return "http://" + brute + cellend;
}
function fixName(brute) {
    brute = brute.replace(/-/g, "-");
    brute = brute.replace(/\.{2,}/g, ".");
    brute = brute.replace(/^\s+|\s+$/g, "");
    brute = brute.replace(/\.+$/, "");
    brute = brute.replace(/ /g, "-");
    brute = brute.replace(/[^a-z0-9\.\-]/ig, "");
    
    return brute;
}
function getNewPupilName(s) {
    s = s.replace(newpupstart, "");
    s = s.replace(newpupend, "");
    return s;
}
function getLevelupPupilName(s) {
    s = s.replace(pupupstart, "");
    s = s.replace(pupupend, "*");
    s = s.split("*")[0];
    return s;
}
function getLoserName(s){
    s = s.replace(fwinstart1, "");
    s = s.replace(fwinstart2, "");
    s = s.replace(fwinend, "");
    return s;
}
function getWinnerName(s){
    s = s.replace(flossend, "");
    return s;
}

    var loc = document.location.host.match(/.+\.(.+)\..+/)[1];
    if (loc.search("mybrute") != -1){
        var cellend = ".mybrute.com/cellule";
        var newpupstart = /New pupil: /;
        var newpupend = / !/;
        var pupupstart = /The pupil /;
        var pupupend = / goes to level /;
        var fwinstart1 = /Your Brute has crushed /;
        var fwinstart2 = /Your Brute has survived to /;
        var fwinend = /\.$/;
        var flossend = /\shas\s.+\./;
        }        
    else if (loc.search("elbruto") != -1) { 
        var cellend = ".elbruto.es/cellule";
        var newpupstart = /Nuevo alumno: /;
        var newpupend = /\./;
        var pupupstart = /El alumno /;
        var pupupend = / pasa al nivel /;
        var fwinstart1 = /Tu Bruto ha aplastado a /;
        var fwinstart2 = /Tu Bruto ha sobrevivido a /;
        var fwinend = /\.$/;
        var flossend = /\sha\s.+\./;
        }
    else {
        var cellend = ".labrute.fr/cellule";
        var newpupstart = /Nouvel élève : /;
        var newpupend = / !/;
        var pupupstart = /L'élève /;
        var pupupend = / passe niveau /
        var fwinstart1 = /Ta brute a écrasé /;
        var fwinstart2 = /Ta brute a survécu à /;
        var fwinend = /\.$/;
        var flossend = /\sa\s.+\sta\sbrute\./;
        ;}   
 
    var pup = document.getElementsByClassName('log log-child');
    for (var i = 0; i < pup.length; i++) {
        var lmain = pup[i].getElementsByClassName('lmain')[0];
        lmain.innerHTML = '<a href="' + makeLink(fixName(getNewPupilName(lmain.innerHTML))) + '" onmouseover="mt.js.Tip.show(this,\'Click here to visit the pupil.\',null)" onmouseout="mt.js.Tip.hide()">' + lmain.innerHTML + '</a>';
    }

    pup = document.getElementsByClassName('log log-childup');
    for (var i = 0; i < pup.length; i++) {
        var lmain = pup[i].getElementsByClassName('lmain')[0];
        lmain.innerHTML = '<a href="' + makeLink(fixName(getLevelupPupilName(lmain.innerHTML))) + '" onmouseover="mt.js.Tip.show(this,\'Click here to visit the pupil.\',null)" onmouseout="mt.js.Tip.hide()">' + lmain.innerHTML + '</a>';
    }
    
    var flog = document.getElementsByClassName('log log-win');
    for (var i = 0; i < flog.length; i++) {
        var lmain = flog[i].getElementsByClassName('lmain')[0];
        var lmaintxt = lmain.getElementsByTagName('a')[0];
        lmain.innerHTML = lmain.innerHTML + ' <a href="' + makeLink(fixName(getLoserName(lmaintxt.innerHTML))) + '" style="background-color: rgb(0, 0, 0); font-size: x-small; color: rgb(153, 255, 255);" onmouseover="mt.js.Tip.show(this,\'Click here to visit the opponent.\',null)" onmouseout="mt.js.Tip.hide()">' + 'CELL' + '</a>';
    }

    flog = document.getElementsByClassName('log log-lose');
    for (var i = 0; i < flog.length; i++) {
        var lmain = flog[i].getElementsByClassName('lmain')[0];
        var lmaintxt = lmain.getElementsByTagName('a')[0];
        lmain.innerHTML = lmain.innerHTML + '<a href="' + makeLink(fixName(getWinnerName(lmaintxt.innerHTML))) + '" style="background-color: rgb(0, 0, 0); font-size: x-small; color: rgb(255, 153, 255);" onmouseover="mt.js.Tip.show(this,\'Click here to visit the opponent.\',null)" onmouseout="mt.js.Tip.hide()">' + 'CELL' + '</a>';
    }
    

