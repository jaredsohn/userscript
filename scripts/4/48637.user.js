// ==UserScript==
// @name           VZ Startseiten-Tuner
// @namespace      http://www.jd-blog.de
// @description    Hilft euch, die Starseite von studiVZ, sch¸lerVZ oder meinVZ nach euren W¸nschen anzupassen.
// @include        http://*schuelervz.net/Start*
// @include        http://*studivz.net/Start*
// @include        http://*meinvz.net/Start*
// ==/UserScript==

if (GM_getValue("Werbung") == null || GM_getValue("Werbung") == "no") {
GM_registerMenuCommand("VST: Werbung aus", werbung_aus);
} else {
GM_registerMenuCommand("VST: Werbung an", werbung_an);
var element = document.getElementById('Grid-Advertising-Top');
if (element) {
element.parentNode.removeChild(element);
}
var element = document.getElementById('Grid-Advertising-Right');
if (element) {
element.parentNode.removeChild(element);
}
var element = document.getElementById('showcase_staticContent');
if (element) {
element.parentNode.removeChild(element);
}
var element = document.getElementById('ad125x125');
if (element) {
element.parentNode.removeChild(element);
}
} // Ende Werbung

if (GM_getValue("Teaser") == null || GM_getValue("Teaser") == "no") {
GM_registerMenuCommand("VST: Teaser aus", teaser_aus);
} else {
GM_registerMenuCommand("VST: Teaser an", teaser_an);
var element = document.getElementById('startLeft').childNodes[2];
if (element) {
element.parentNode.removeChild(element);
}
} // Ende Teaser

if (GM_getValue("Buschfunk") == null || GM_getValue("Buschfunk") == "no") {
GM_registerMenuCommand("VST: Buschfunk aus", buschfunk_aus);
} else {
GM_registerMenuCommand("VST: Buschfunk an", buschfunk_an);
var element = document.getElementById('Mod-Feedbox-Snipplet');
if (element) {
element.parentNode.removeChild(element);
}
} // Ende Buschfunk

if (GM_getValue("Gruscheln") == null || GM_getValue("Gruscheln") == "no") {
GM_registerMenuCommand("VST: Gruscheln aus", gruscheln_aus);
} else {
GM_registerMenuCommand("VST: Gruscheln an", gruscheln_an);
var element = document.getElementById('Gruscheln_Overview');
if (element) {
element.parentNode.removeChild(element);
}
} // Ende Gruscheln

if (GM_getValue("Geburtstage") == null || GM_getValue("Geburtstage") == "no") {
GM_registerMenuCommand("VST: Geburtstage aus", geburtstage_aus);
} else {
GM_registerMenuCommand("VST: Geburtstage an", geburtstage_an);
var element = document.getElementById('Birthday_Overview');
if (element) {
element.parentNode.removeChild(element);
}
} // Ende Geburtstage

if (GM_getValue("Views") == null || GM_getValue("Views") == "no") {
GM_registerMenuCommand("VST: Besucher aus", views_aus);
} else {
GM_registerMenuCommand("VST: Besucher an", views_an);
var element = document.getElementById('Visitors');
if (element) {
element.parentNode.removeChild(element);
}
} // Ende Views

if (GM_getValue("Kds") == null || GM_getValue("Kds") == "no") {
GM_registerMenuCommand("VST: Kennst du schon aus", kds_aus);
} else {
GM_registerMenuCommand("VST: Kennst du schon an", kds_an);
var element = document.getElementById('Mod-Kdk-Snipplet');
if (element) {
element.parentNode.removeChild(element);
}
} // Ende Kds

function werbung_aus() {
GM_setValue("Werbung", "yes");
location.reload();
}

function werbung_an() {
GM_setValue("Werbung", "no");
location.reload();
}

function teaser_aus() {
GM_setValue("Teaser", "yes");
location.reload();
}

function teaser_an() {
GM_setValue("Teaser", "no");
location.reload();
}

function buschfunk_aus() {
GM_setValue("Buschfunk", "yes");
location.reload();
}

function buschfunk_an() {
GM_setValue("Buschfunk", "no");
location.reload();
}

function gruscheln_aus() {
GM_setValue("Gruscheln", "yes");
location.reload();
}

function gruscheln_an() {
GM_setValue("Gruscheln", "no");
location.reload();
}

function geburtstage_aus() {
GM_setValue("Geburtstage", "yes");
location.reload();
}

function geburtstage_an() {
GM_setValue("Geburtstage", "no");
location.reload();
}

function views_aus() {
GM_setValue("Views", "yes");
location.reload();
}

function views_an() {
GM_setValue("Views", "no");
location.reload();
}

function kds_aus() {
GM_setValue("Kds", "yes");
location.reload();
}

function kds_an() {
GM_setValue("Kds", "no");
location.reload();
}