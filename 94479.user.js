// ==UserScript==
// @name           Wortfilter sei gegangen
// @namespace      krautchan
// @version        3
// @description    Entfernt die Wortfilter auf Krautchan
// @include        http://krautchan.net/*
// @include        http://krautchan.net/*/*
// @include        http://krautchan.net/*/*/*
// @include        http://krautchan.net/*/*/*/*
// @include        http://krautchan.net/*/*/*/*/*
// @include        http://krautchan.net/*/*/*/*/*/*
// ==/UserScript==
//
var allPosts;
allPosts = document.evaluate(
    '//*[starts-with(@id, "post_text")]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

var thisPost;
for (var i = 0; i < allPosts.snapshotLength; i++) {
    thisPost = allPosts.snapshotItem(i);
    postText = thisPost.innerHTML;
    //idealerweise in der umgekehrten Reihenfolge wie auf Krautchan gefiltert wird1
    thisPost.innerHTML=thisPost.innerHTML.
        replace(/(Jassir Arafat|Annette von Droste-Hülshoff|Heinz Sielmann|Paul Breitner|Jodie Foster|Sexy Cora|Ludwig      Boltzmann)/g, "<abbr title='$1'>Steve Krömer</abbr>").
        replace(/(Skeletor|Aquaman|Danger Mouse|Tank Girl|Morpheus|Professor X|Flash Gordon|Radioactive Man|Doctor Octopus)/g, "<abbr title='$1'>stevinho</abbr>").
        replace(/(P([^a-zA-Z]*)e([^a-zA-Z]*)s([^a-zA-Z]*)t)/gi, "<abbr title='$1'>M$2a$3r$4a</abbr>").
        replace(/(Sören)/gi, "<abbr title='$1'>Kevin</abbr>").
        replace(/(Ansgar)/gi, "<abbr title='$1'>Justin</abbr>").
        replace(/(PENIS)/g, "<abbr title='$1'>xD</abbr>").
        replace(/(Vagina-Style)/g, "<abbr title='$1'>gnihihi</abbr>").
        replace(/(Dwight D.)/g, "<abbr title='$1'>Sascha</abbr>").
        replace(/(Eisenhower)/g, "<abbr title='$1'>Lobo</abbr>").
        replace(/(Liechtenstein)/g, "<abbr title='$1'>lachschon</abbr>").
        replace(/(Arbeitsamt)/g, "<abbr title='$1'>4fuckr</abbr>").
        replace(/(Lepra)/g, "<abbr title='$1'>Lena</abbr>").
        replace(/(Turing-vollständig)/g, "<abbr title='$1'>schwul</abbr>").
        replace(/(Süleyman der Prächtige)/g, "<abbr title='$1'>Sarrazin</abbr>").
        replace(/(Harkonnen)/g, "<abbr title='$1'>Guttenberg</abbr>").
        replace(/(harkonnen)/g, "<abbr title='$1'>guttenberg</abbr>").
        replace(/(Dissertation)/gi, "<abbr title='$1'>Kopierpaste</abbr>").
        replace(/(Thales von Milet)/g, "<abbr title='$1'>Enke</abbr>")
}