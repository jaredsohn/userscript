// ==UserScript==
// @name           Slim LinkedIn
// @namespace      slimlinkedin
// @description    Remove fluff from LinkedIn.
// @include        http://www.linkedin.com/*
// @version        1.0
// ==/UserScript==

function eid(id) {
  return document.getElementById(id);
}
eid('linkedin-today').style.display = 'none';
eid('feed-wrapper').style.display = 'none';
eid('feed-nhome').style.display = 'none';
