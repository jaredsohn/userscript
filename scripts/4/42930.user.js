// ==UserScript==
// @name		MusicBrainz: Mini Sidebar
// @description		A script that adds a mini sidebar to the top right of the screen, thus allowing you to turn the sidebar off completely :)
// @version		2009-02-23
// @author		navap
// @namespace		http://musicbrainz.org
//
// @include		http://musicbrainz.org/*
// @exclude		http://*musicbrainz.org/mod/inlinemod.html*

// ==/UserScript==
//**************************************************************************//




addGlobalStyle('#GS {position: absolute; top: 0px;	right: 0px;	padding: 5px; color: #736DAB; font-size: 0.75em; font-weight: bold; background: #FFBB55; border-left: 2px solid #736DAB; border-bottom: 2px solid #736DAB;} #GS a {color: #736DAB;} #GS a:hover {color: white;} #GS_search {text-align: right;} #GS_search select {margin-left: 4px;} #GS_links {margin-bottom: 5px;}');


// div_GS_search

var aquery = document.createElement("input");
aquery.setAttribute("type", "checkbox");
aquery.setAttribute("name", "adv");

var input = document.createElement("input");
input.setAttribute("type", "text");
input.setAttribute("name", "query");

var artist = document.createElement("option");
artist.appendChild(document.createTextNode("Artists"));
artist.setAttribute("value", "artist");

var release = document.createElement("option");
release.appendChild(document.createTextNode("Releases"));
release.setAttribute("value", "release");

var track = document.createElement("option");
track.appendChild(document.createTextNode("Tracks"));
track.setAttribute("value", "track");

var label = document.createElement("option");
label.appendChild(document.createTextNode("Labels"));
label.setAttribute("value", "label");

var annotation = document.createElement("option");
annotation.appendChild(document.createTextNode("Annotations"));
annotation.setAttribute("value", "annotation");

var freedb = document.createElement("option");
freedb.appendChild(document.createTextNode("FreeDB"));
freedb.setAttribute("value", "freedb");

var select = document.createElement("select");
select.setAttribute('name', 'type');
select.appendChild(artist);
select.appendChild(release);
select.appendChild(track);
select.appendChild(label);
select.appendChild(annotation);
select.appendChild(freedb);

var form = document.createElement("form");
form.action= "http://musicbrainz.org/search/textsearch.html";
form.appendChild(aquery);
form.appendChild(input);
form.appendChild(select);

var div_GS_search = document.createElement('div');
div_GS_search.setAttribute('id', 'GS_search');
div_GS_search.appendChild(form);


// div_GS_links

var link_profile = document.createElement("a");
link_profile.href = "http://musicbrainz.org/show/user/";
link_profile.appendChild(document.createTextNode("Profile"));

var link_subartists = document.createElement("a");
link_subartists.href = "http://musicbrainz.org/mod/search/pre/subscriptions.html";
link_subartists.appendChild(document.createTextNode("Subscribed artists"));

var link_subedits = document.createElement("a");
link_subedits.href = "http://musicbrainz.org/mod/search/pre/subscriptions-editors.html";
link_subedits.appendChild(document.createTextNode("Subscribed editors"));

var link_searchedits = document.createElement("a");
link_searchedits.href = "http://musicbrainz.org/mod/search/index.html";
link_searchedits.appendChild(document.createTextNode("Search edits"));

var div_GS_links = document.createElement('div');
div_GS_links.setAttribute('id', 'GS_links');
div_GS_links.appendChild(link_subartists);
div_GS_links.appendChild(document.createTextNode(" | "));
div_GS_links.appendChild(link_subedits);
div_GS_links.appendChild(document.createTextNode(" | "));
div_GS_links.appendChild(link_searchedits);
div_GS_links.appendChild(document.createTextNode(" | "));
div_GS_links.appendChild(link_profile);


// div_GS

var div_GS = document.createElement('div');
div_GS.setAttribute('id', 'GS');
div_GS.appendChild(div_GS_links);
div_GS.appendChild(div_GS_search);


// Taken from http://diveintogreasemonkey.org/patterns/add-css.html

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

document.getElementsByTagName("body")[0].appendChild(div_GS);
