// ==UserScript==
// @name        Toggl-Button YouTrack
// @namespace   https://github.com/jurgenhaas/toggl-button-greasemonkey
// @version     1.0-rc.1
// @include     http*://youtrack.*/*
// @include     http*://*/youtrack/*
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_info
// @grant       GM_registerMenuCommand
// @require     https://raw.githubusercontent.com/jurgenhaas/toggl-button-greasemonkey/v1.0-rc.1/TogglLibrary.js
// @require     http://sizzlemctwizzle.com/422156.js
// @resource    togglStyle https://raw.githubusercontent.com/jurgenhaas/toggl-button-greasemonkey/v1.0-rc.1/TogglLibrary.css
// ==/UserScript==

new TogglButtonGM('.fsi-layout.container', function (elem) {
  var description, projectIds = [],
    numElem = elem.querySelector('.issueId', elem),
    titleElem = elem.querySelector('.issue-summary', elem),
    projectElem = document.querySelector('.fsi-properties .fsi-property .regCC a'),
    linkElem = document.querySelector('.fsi-content .links-panel .links .link');

  description = titleElem.textContent.trim();
  if (numElem !== null) {
    description = numElem.textContent.trim() + " " + description;
  }

  if (projectElem !== null) {
    projectIds.push(projectElem.textContent.trim());
  }
  if (linkElem !== null) {
    projectIds.push(linkElem.textContent.trim());
  }

  return {
    className: 'youtrack',
    description: description,
    projectIds: projectIds
  };
});
