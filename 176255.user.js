// ==UserScript==
// @id             github-title-swtich@erikvold.com
// @name           Github Title Switch
// @version        1.0
// @author         Erik Vold
// @description    Switches X - Y/Z to be Y/Z - X in the document title
// @include        https://github.com/*/*/*
// @run-at         document-end
// ==/UserScript==

let title = document.title.replace(/^(.*)\s[-|·]\s([^\/]+\/[^\/]+)$/gi, "$2 - $1");
document.title = title;
