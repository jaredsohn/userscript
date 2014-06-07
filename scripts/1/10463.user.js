// ==UserScript==
// @name           Jaiku: More Context for Comments
// @description    Shows more of the original presence text when displaying comments.
// @source         http://jonas.lemonad.org/arkiv/2007/07/more_context_for_jaiku_comment/
// @namespace      http://jonas.lemonad.org/
// @identifier     http://userscripts.org/scripts/source/10463.user.js
// @version        0.1.0
// @include        http://jaiku.com/*
// @include        http://*.jaiku.com/*
// ==/UserScript==
/*
BEGIN LICENSE BLOCK
  Copyright (C) 2007 Jonas Nockert

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  See http://www.gnu.org/licenses/
END LICENSE BLOCK
*/
var allcomments, comment;
allcomments = document.evaluate(
  "//li[@class='comment']//p[@class='meta']//a[@title]",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);

for(var i=0; i<allcomments.snapshotLength; i++) {
  comment = allcomments.snapshotItem(i);
  comment.firstChild.nodeValue = comment.title;
}
