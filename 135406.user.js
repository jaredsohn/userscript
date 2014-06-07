// ==UserScript==

// @name          Perl's 4Chan retardation disabler

// @namespace     http://www.jimmi.es

// @description   Disables stupid-ass music on /b/.

// @include       http://boards.4chan.org/b*

// ==/UserScript==

stupidfuckingsong = document.getElementsByTagName("embed")[0];
stupidfuckingsong.parentNode.removeChild(stupidfuckingsong);

fr = document.getElementsByTagName("iframe")[1];
fr.src = null;