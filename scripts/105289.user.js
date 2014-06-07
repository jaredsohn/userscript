// ==UserScript==
// @name           USO Links
// @namespace      http://userscripts.org/users/tim
// @description    Add's shortcuts links to the login status bar.
// @include        http://userscripts.org/*
// @include        https://userscripts.org/*
// @license        MIT (See file header)
// @copyright      (c) 2011 Tim Smart
// ==/UserScript==

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

var LINKS =
  { 'New Script'     : '/scripts/new'
  , 'Manage Scripts' : '/home/scripts'
  , 'Favorites'      : '/home/favorites'
  , 'Comments'       : '/home/comments'
  , 'Topics'         : '/home/posts'
  , 'Settings'       : '/home/settings'
  }

/**
 * Creates a <li> with a link.
 *
 * @param {String} name
 * @param {String} path
 * @return {HtmlElement}
 */
function createLink (name, path) {
  var li = document.createElement('li')
    , a  = document.createElement('a')

  a.setAttribute('style', 'font-weight: normal;')
  a.setAttribute('href', path)
  a.textContent = name

  li.appendChild(a)

  return li
}

// Check for the /home link
var home = document.evaluate(
  './/ul[@class="login_status"]/li/a[@href="/home"]'
, document
, null
, XPathResult.FIRST_ORDERED_NODE_TYPE
, null
)
  .singleNodeValue

var first = true
var name  = null
var link  = null

// The user is not logged in
if (!home) {
  return
}

home = home.parentNode

// Logged in, and ready for awesome.
for (name in LINKS) {
  link = createLink(name, LINKS[name])
  if (first === false) {
    link.style.marginLeft = '0.5em'
  }
  first = false

  home.parentNode.insertBefore(link, home.nextSibling)
  home = link
}

})();
