// ==UserScript==
// @name           Mirar los Alumnos solo dando click
// @namespace      http://kings-darkness.es.tl
// @description    Mirar los Alumnos solo dando click
// @include        http://*.mybrute.com/cellule*
// @include        http://*.elbruto.es/cellule*
// @include        http://*.labrute.fr/cellule*
// @version        1.2
// ==/UserScript==
/*
    Version History:
    1.2 - very minor update to correct handling of single and multiple dots in
          and/or at the end of pupil names (hopefully)
    1.1 - added support for labrute.fr and elbruto.es
    1.0 - initial release
*/
// Credits: most credit goes to kuNDze as this is based on a small portion of the code 
//	 used in the "myBrute info" script (http://userscripts.org/scripts/show/55996)
//
////



function makeLink(brute) {
    return "http://" + brute + cellend;
}
function fixName(brute) {
    brute = brute.replace(/-/g, "-");
    brute = brute.replace(/\.{2,}/g, ".");
    brute = brute.replace(/^\s+|\s+$/g, "");
    brute = brute.replace(/\.+$/g, "");
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

    var loc = document.location.host.match(/.+\.(.+)\..+/)[1];
    if (loc.search("mybrute") != -1){
        var cellend = ".mybrute.com/cellule";
        var newpupstart = /New pupil: /;
        var newpupend = / !/;
        var pupupstart = /The pupil /;
        var pupupend = / goes to level /;}
    else if (loc.search("elbruto") != -1) { 
        var cellend = ".elbruto.es/cellule";
        var newpupstart = /Nuevo alumno: /;
        var newpupend = /\./;
        var pupupstart = /El alumno /;
        var pupupend = / pasa al nivel /;}
    else {
        var cellend = ".labrute.fr/cellule";
        var newpupstart = /Nouvel élève : /;
        var newpupend = / !/;
        var pupupstart = /L'élève /;
        var pupupend = / passe niveau /;}   
 
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
