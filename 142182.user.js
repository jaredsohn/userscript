// ==UserScript==
// @name           Soundcloud Disable Comments
// @description    Remove comment elements from Soundcloud waveforms.
// @namespace      http://userscripts.org/users/tim
// @include        http://soundcloud.com/*
// @include        https://soundcloud.com/*
// @copyright      2012 Tim Smart
// @license        MIT. Full license in source code.
// ==/UserScript==

// The MIT License
//
// Copyright (c) 2012 Tim Smart
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files
// (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge,
// publish, distribute, sublicense, and/or sell copies of the Software, and
// to permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
// CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
// SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

;(function () {

// For multiple environments.
var unsafe    = unsafeWindow || window
// Find a MutationObserver constructor.
var MutationObserver  = unsafe.MutationObserver

if (!MutationObserver && unsafe.WebKitMutationObserver) {
  MutationObserver = unsafe.WebKitMutationObserver
}

// ====
// Remove comments when found

function removeComments () {
  var commentBubbles      = document.querySelectorAll('div.commentBubble')
  var commentPlaceholders = document.querySelectorAll('div.commentPlaceholder')
  var commentForms        = document.querySelectorAll('div.commentForm')
  var wrappers            = document.querySelectorAll('div.waveform__scene')
  var canvases            = null
  var element             = null

  for (var i = 0, il = commentBubbles.length; i < il; i++) {
    element = commentBubbles[i]
    element.parentNode.removeChild(element)
  }
  for (var i = 0, il = commentPlaceholders.length; i < il; i++) {
    element = commentPlaceholders[i]
    element.parentNode.removeChild(element)
  }
  for (var i = 0, il = commentForms.length; i < il; i++) {
    element = commentForms[i]
    element.parentNode.removeChild(element)
  }
  for (var i = 0, il = wrappers.length; i < il; i++) {
    element  = wrappers[i]
    canvases = element.querySelectorAll('canvas')

    if (3 === canvases.length) {
      element = canvases[1]
      element.parentNode.removeChild(element)
    }
  }
}

var observer  = new MutationObserver(removeComments)
observer.observe(document, { childList : true, subtree : true })
removeComments()

})();

/* vim: set expandtab sts=2 ts=2 sw=2 tw=80 ft=javascript :*/
