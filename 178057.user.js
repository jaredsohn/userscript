// ==UserScript==
// @name       Fix Twitter connect button
// @namespace  casiotone.org
// @version    1.0
// @description  Fixes the connect button on Twitter to default to Interactions instead of Mentions.
// @include      https://twitter.com*
// @copyright  None
// ==/UserScript==

document.querySelectorAll('[data-global-action=connect] a')[0].setAttribute('href', '/i/connect');