// ==UserScript==
// @name           Anti Newline
// @namespace      http://02ch.su/b/no-long-posts
// @description    Long posts used to be soooooooooooo long. Until now
// @include        http://02ch.su/*
// @include        http://02ch.jp/*
// @include        http://www.02ch.su/*
// @include        http://www.02ch.jp/*
// ==/UserScript==



/*
  FORCED ANONYMITY LICENSE v1.0
  =============================
  This program is free software. Redistribution and use, with or without
  modification, are permitted provided that the following conditions are met:

    * Any redistributions must retain this notice.
    * The author and all contributors of this program must remain anonymous.

  As an exception, non-anonymous code modifications (contributions) to this
  program are allowed if the modification:

    * Fixes some secirity threat the program poses (security fixes).
    * Fixes some misbehavior which is generally considered extremely annoying.

  This program is distributed in hope that it will be useful
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
*/

// Version history:
//  * 1.00: Initial version.

// Да покарает ЧВ всех вайперов онально.
// Скрипт написан на благо всем живым существам.

var posts = document.evaluate(".//blockquote[count(.//br)>20]", document.getElementById("delform"), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < posts.snapshotLength; i++)
//	posts.snapshotItem(i).setAttribute ("style", "height: 100px; overflow: hidden; text-overflow: ellipsis; color: gray; font-size: xx-small; font-weight: 100;");
	posts.snapshotItem(i).setAttribute ("style", "display: none;");