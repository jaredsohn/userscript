// ==UserScript==
// @name        AHOI POLLOI MOL ZWOI
// @namespace   apmz
// @description Größere Bilder, lesbare Texte, die Leere killt er, und nutzte Äxte.
// @include     http://ahoipolloi.blogger.de/stories/*
// @version     2
// ==/UserScript==

(function () {
  // Einstellungen
  var maximalerZoomfaktor = 2
  // Abkürzungen
  var response = document.getElementById("response-body")
  var story = response.firstElementChild
  var bildContainer = story.firstElementChild
  var meta = bildContainer.nextElementSibling
  var nav = meta.nextElementSibling
  var bild = bildContainer.firstElementChild
  var style = document.styleSheets[0]
  var rules = style.cssRules 
  var maxBreite = parseInt(bild.clientWidth)*maximalerZoomfaktor

  // Bild breiter machen
  var randMitte = story.clientWidth - bildContainer.clientWidth
  var neueBreite = document.getElementById("response-body").clientWidth - 600 - 2*randMitte // 600 = Kommentare, randMitte = randAussen, 15 = ?
  if (neueBreite > maxBreite) neueBreite = maxBreite
  var neueHoehe = bild.clientHeight / bild.clientWidth * neueBreite
  story.style.width = neueBreite+"px"
  neueBreite -= randMitte
  bildContainer.style.width = neueBreite+"px"
  bild.height = neueHoehe
  bild.width = neueBreite

  // Metas anpassen
  story.removeChild(nav)
  response.insertBefore(nav,response.children[1])
  story.removeChild(meta)
  response.insertBefore(meta,response.children[1])
  style.insertRule("#response-body>.meta { display: block; font-weight: bold; margin-right: "+randMitte+"px }", rules.length)
  style.insertRule("#response-body>.meta>* { float: left; margin-bottom: "+randMitte/2+"px; padding-right: "+randMitte+"px }", rules.length)
  style.insertRule("#response-body>.meta>.commentcounter { float: right; padding-left: "+randMitte+"px }", rules.length)
  style.insertRule(".story.topic { font-size: inherit; font-weight: bold; margin-bottom: "+randMitte/2+"px }", rules.length)
  style.insertRule(".story.topic>a { font-weight: normal }", rules.length)
  style.insertRule(".story.nav { width: auto; height: auto; font-size: inherit; font-weight: bold }", rules.length)
  
  // Überschriften ermöglichen
  document.styleSheets[0].insertRule(".commenttext::first-line { font-weight: bold }",rules.length)
})()