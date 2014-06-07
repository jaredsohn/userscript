// ==UserScript==
// @name           Debattfjerner
// @namespace      http://rune.klapp.no/
// @description    Fjerner de irriterende debattene fra norske nettaviser
// @version        1.10
// @include        http://www.dagbladet.no/*
// @include        http://www.vg.no/*
// @include        http://www.kjendis.no/*
// @include        http://www.aftenposten.no/*
// @include        http://nrk.no/*
// @include        http://www.nrk.no/*
// @include        http://www.itavisen.no/*
// @include		   http://www.adressa.no/*
// @include		   http://tb.no/*
// @include		   http://www.sb.no/*
// ==/UserScript==


var db_debattfelt = document.getElementById('disqus_thread');
if (db_debattfelt) {
    db_debattfelt.parentNode.removeChild(db_debattfelt);
}

var vg_debattfelt = document.getElementByTagName('fb:comments');
if (vg_debattfelt) {
    vg_debattfelt.parentNode.removeChild(vg_debattfelt);
}

var twinglyfelt = document.getElementById('tw_link_widget');
if (twinglyfelt) {
    twinglyfelt.parentNode.removeChild(twinglyfelt);
}


var nrk_debattfelt = document.getElementById('articlecomments');
if (nrk_debattfelt) {
    nrk_debattfelt.parentNode.removeChild(nrk_debattfelt);
}


var it_debattfelt = document.getElementById('storyCommentsArea');
if (it_debattfelt) {
    it_debattfelt.parentNode.removeChild(it_debattfelt);
}


var adressa_debattfelt = document.getElementById('debate');
if (adressa_debattfelt) {
    adressa_debattfelt.parentNode.removeChild(adressa_debattfelt);
}


var tb_debattfelt = document.getElementById('commentlistcontainer');
if (tb_debattfelt) {
    tb_debattfelt.parentNode.removeChild(tb_debattfelt);
}
