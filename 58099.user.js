// ==UserScript==
// @name           IGN Breadcrumb Editor
// @namespace      HAK_Falco
// @description:   Attempts to edit links to make the vesti board look better
//@include      http://boards.ign.com/*

// ==/UserScript==

(var pageBodyStr = document.body.outerHTML)
(pageBodyStr = pageBodyStr.replace("teh_vestibule/b", "board.asp?brd="))
(pageBodyStr = pageBodyStr.replace("teh_vestibule/b5296", "board.asp?brd=5926"))
(document.body.innerHTML = pageBodyStr)
