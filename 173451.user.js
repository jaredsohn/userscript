// ==UserScript==
// @name        Webdesignnews go to url
// @namespace   webdesignnews
// @include     http://www.webdesign-ne.ws/
// @version     1
// ==/UserScript==

window.location.href = $('body a[rel=bookmark]').attr('href');