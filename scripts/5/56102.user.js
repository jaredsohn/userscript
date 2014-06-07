// ==UserScript==
// @name ScrollAll
// @version 1.0
// @namespace http://zij.habrahabr.ru
// @description Allows to scroll page with mouse being over a scrollable element.
// @author ZIJ
// @include http://www.google.com/reader/*
// @include https://www.google.com/reader/*
// ==/UserScript==

// <settings><параметры>
var maxScrolls = 4          // number of stalled scrolls // количество скроллов "в холостую", 1s
var hideTime = 4000         // time without scrollbars   // время без скроллбаров, ms
var checkInterval = 2000    // minimal DOM scan interval // минимальный интервал проверки DOM, ms
// </параметры></settings>

var DOMModified = false
var scrollCount = 0
var lastScrollTop = -1
var lastScrollTime = 0

document.addEventListener("DOMSubtreeModified", function() { DOMModified = true }, false)

var I = setInterval(scan, checkInterval)

function scan() {    // searching scrollable elements // поиск элементов с прокруткой
  if (DOMModified) {
    DOMModified = false
    for each (element in document.getElementsByTagName("*")) {
      if (IsScrollable(element)) {
        element.addEventListener("DOMMouseScroll", handleScroll, false)
      }
    }
  }
}

function IsScrollable(element) {    // checking against scrollability // проверка на скроллибельность
  if (element.scrollHeight > element.clientHeight) {
    with (window.getComputedStyle(element, null)) {
      return (overflow == "scroll") || (overflow == "auto")
    }
  } else return false
}

function handleScroll(event) {    // detecting stalled scrolls // определение скроллов "в холостую"
  if (event.timeStamp != lastScrollTime) {
    var newScrollTop = event.currentTarget.scrollTop
    if (newScrollTop == lastScrollTop) {
      scrollCount++
      if (scrollCount >= maxScrolls) {
        scrollCount = 0
        hideScrollbars(event.currentTarget)
      }
    }else {
      scrollCount = 0
      lastScrollTop = newScrollTop
    }
    lastScrollTime = event.timeStamp
  }
}

function hideScrollbars(element) {    // locking scrolling for a while // блокировка скроллинга на время
  var prev = window.getComputedStyle(element, null).overflow
  element.style.overflow = "hidden"
  setTimeout(function() { element.style.overflow = prev }, hideTime)
}