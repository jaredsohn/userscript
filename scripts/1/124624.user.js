// ==UserScript==
// @name           JIRA Link Style
// @require				 http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @author         Jesse Bilsten
// @namespace      level-studios
// @description    Changes link styles to show underlines
// @include        http://quality.level-studios.com/*
// @version        1.0
// ==/UserScript==

/*
 * Version History
 * 
 * 1.0 - Added style for underline
 *
 */

GM_addStyle((<><![CDATA[
	.content a,
  #issue-description a,
  .mod-content a,
  .breadcrumbs a {
    text-decoration:underline !important;
	}
  .labels a,
  #votes-val a,
  #watchers-val a {
    text-decoration:none !important;
  }
]]></>).toString());

