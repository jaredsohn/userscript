// ==UserScript==
// @name           Auto Redirect to Megaupload from QSS mrbrownee70
// @namespace      http://userscripts.org/scripts/show/85051
// @author         http://userscripts.org/users/33172
// @description    Redirects you to the correct Megaupload link from QSS (Quicksilverscreen's) mrbrownee70. You must have the MegaUpload Player script for this to work.
// @version        1.0
// @date           8/31/2010
// @include        http://www.mrbrownee70.com/mega.php?url=*
// @include        http://www.mrbrownee70.com/mu.php?url=*
// ==/UserScript==


location.href = location.href.substring(location.href.lastIndexOf('http'));