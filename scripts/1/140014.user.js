// ==UserScript==
// @id           Spiegel.de_-_column_fix_&_rearrange
// @name         Spiegel.de - column fix & rearrange
// @namespace    https://userscripts.org/scripts/show/140014
// @description  Fixiert die Kolumnen (Politik, Wissenschaft, Kultur etc.) in der unteren Hälfte von Spiegel Online in einer beliebigen Reihenfolge. Sie werden unterhalb eines frei wählbaren "Startpunktes" eingefügt. / Fixes the position of Spiegel Online columns (Politik, Wissenschaft, Kultur etc., from below a chosable "marker") while their order can be rearranged freely.
// @forum        https://userscripts.org/topics/96977
// @version      2.1
// @updateURL    https://userscripts.org/scripts/source/140014.meta.js
// @downloadURL  https://userscripts.org/scripts/source/140014.user.js
// @include      http*://www.spiegel.de/
// @include      http*://www.spiegel.de/index.html
// @firstrelease 2012-08-03
// @lastupdate   2013-06-09
// ==/UserScript==

// 0. Startpunkt-Variablen
// 0. Start marker variables
var first = document.getElementsByClassName('teaser hp-first-article topicspecial clearfix')[0]; // erster Artikel / first article
var main = document.getElementsByClassName('hp-teasers-box clearfix')[0]; // alle dem ersten Artikel folgenden Artikel (werden als ein "Block" gehandhabt) bis "Videos" / all articles following the first one (treated as one "block") up to "Videos"
var videos = document.getElementsByClassName('commonpager mumelei-5-pics asset-box inline-pic-credit clearfix')[0]; // Videos
var aktuell = document.getElementsByClassName('hpheftkasten hp-gradient clearfix')[0]; // Der Spiegel - Aktuell aus dem Magazin
var kolumnisten = document.getElementsByClassName('asset-box asset-hp-special clearfix')[0]; // S.P.O.N. - Die Kolumnisten
var boerse = document.getElementsByClassName('boersenboxhp hp-gradient clearfix')[0]; // Börse
var fussball = document.getElementsByClassName('ressort-teaser-box fussball fbtickerboxhp hp-hatching')[0]; // Fussball
var augenblick = document.getElementsByClassName('asset-box asset-augenblick clearfix')[0]; // Augenblick - Die Bilder des Tages
var empfehlungen = document.getElementsByClassName('asset-box asset-mixed-imagetypes clearfix')[0]; // Empfehlungen der Redaktion

// 1. Hier die Reihenfolge der Kolumnen wie gewünscht bearbeiten
// 1. Arrange columns in the order in which you want them to appear here
var columns = ['panorama', 'wissenschaft', 'politik', 'einestages', 'netzwelt', 'kultur', 'gesundheit', 'uniundschule', 'karriere', 'reise', 'merian', 'spam', 'wirtschaft', 'auto', 'sport'];

// 2. Hier Variable aus 0. eintragen (in diesem Fall "Videos"), um den Bereich zu bestimmen, unterhalb dessen die neu geordneten Kolumnen beginnen sollen
// 2. Enter variable from 0. (in this case "Videos") here in order to set marker from below which rearranged columns start
var previous = videos

// Code
for (var i=0; i < columns.length; i++) {
  var column = document.getElementsByClassName('clearfix module-box ' + columns[i]);
  if (column[0]) {
    insertAfter(column[0], previous);
    previous = column[0];
  }
}

function insertAfter(newNode, refNode){
  if(newNode && refNode){
    if(refNode.nextSibling) refNode.parentNode.insertBefore(newNode, refNode.nextSibling);
    else refNode.parentNode.appendChild(newNode);
  }
}
