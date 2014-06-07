// ==UserScript==
// @name        mmmturkeybacon Survey Row Highlighter
// @author      mmmturkeybacon
// @description Highlights rows in surveys to make it easier to see
//              which question you are answering.
// @namespace   http://userscripts.org/users/523367
// @match       http://*.qualtrics.com/*
// @match       https://*.qualtrics.com/*
// @match       http://*.surveymonkey.com/*
// @match       https://*.surveymonkey.com/*
// @match       https://docs.google.com/forms*
// @downloadURL http://userscripts.org/scripts/source/400656.user.js
// @updateURL   http://userscripts.org/scripts/source/400656.meta.js
// @version     0.9
// @grant       none
// ==/UserScript==

/* based on the following stackoverflow snippets:
 *http://stackoverflow.com/questions/4007353/how-to-highlight-table-row-on-hover-using-css-only
 *http://stackoverflow.com/questions/4847313/dynamically-add-css-to-page-via-javascript
 */
var style = document.createElement('style')
style.type = 'text/css'
style.innerHTML = 'tr.ChoiceRow:hover {background-color: lightyellow;}'; // qualtrics
style.innerHTML += ' tr.matrixRow:hover {background-color: lightyellow;}'; // surveymonkey
style.innerHTML += ' tr.matrixAltRow:hover {background-color: lightyellow;}'; // survey monkey
style.innerHTML += ' tr.ss-gridrow:hover {background-color: lightyellow;}'; // google
document.getElementsByTagName('head')[0].appendChild(style)
