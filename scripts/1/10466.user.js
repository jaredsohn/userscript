// ==UserScript==
// @name           Jaiku: AutoLink
// @description    Creates links out of @username and #channel.
// @source         http://jonas.lemonad.org/arkiv/2007/07/jaiku_autolinking_greasemonkey/
// @namespace      http://jonas.lemonad.org/
// @identifier     http://userscripts.org/scripts/source/10466.user.js
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
var alltextnodes, text, tmp, tmp2;
alltextnodes = document.evaluate(
    "//h2//text()|//p//text()",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for(var i=0; i<alltextnodes.snapshotLength; i++) {
  text = alltextnodes.snapshotItem(i);
  if(text.nodeValue.match(/[@#]([a-zA-Z0-9]+)/))
  {
    tmp = text.nodeValue.replace(/@([a-zA-Z0-9]+)/g, "<a href=\"http://$1.jaiku.com\">@$1</a>");
    tmp = tmp.replace(/#([a-zA-Z0-9]+)/g, "<a href=\"http://jaiku.com/channel/$1\">#$1</a>");

    if(text.parentNode.childNodes.length > 1)
    {
      tmp2 = document.createElement('span');
      tmp2.innerHTML = tmp;
      text.parentNode.replaceChild(tmp2, text);
    }
    else
    {
      text.parentNode.innerHTML = tmp;
    }
  }
}
