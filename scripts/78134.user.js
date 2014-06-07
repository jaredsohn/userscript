// ==UserScript==
// @name           Cambridge Journals full-screen article
// @namespace      geological-supplies.com/scripts
// @description    Don't display journal articles in iframes, just display the PDF without the clutter.
// @include        http://journals.cambridge.org*/action/displayFulltext*
// @exclude        http://journals.cambridge.org*/action/displayFulltext*pagecode
// ==/UserScript==

window.location.href = window.location.href + "&pageCode=100101";