// ==UserScript==
// @name        Toggl-Button GitHub
// @namespace   https://github.com/jurgenhaas/toggl-button-greasemonkey
// @version     1.0-rc.1
// @include     http*://github.com/*
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_info
// @grant       GM_registerMenuCommand
// @require     https://raw.githubusercontent.com/jurgenhaas/toggl-button-greasemonkey/v1.0-rc.1/TogglLibrary.js
// @require     http://sizzlemctwizzle.com/423257.js
// @resource    togglStyle https://raw.githubusercontent.com/jurgenhaas/toggl-button-greasemonkey/v1.0-rc.1/TogglLibrary.css
// ==/UserScript==

new TogglButtonGM('#js-discussion-header', function (elem) {
  var description, projectIds = [],
    numElem = elem.querySelector('.gh-header-number', elem),
    titleElem = elem.querySelector('.js-issue-title', elem),
    authorElem = document.querySelector('.url.fn'),
    projectElem = document.querySelector('.js-current-repository');

  description = titleElem.textContent.trim();
  if (numElem !== null) {
    description = numElem.textContent.trim() + " " + description;
  }

  if (authorElem !== null) {
    projectIds.push(authorElem.textContent.trim());
  }
  if (projectElem !== null) {
    projectIds.push(projectElem.textContent.trim());
  }

  return {
    className: 'github',
    description: description,
    projectIds: projectIds
  };
});
