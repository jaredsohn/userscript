// ==UserScript==
// @name           Fast KA-ELMS
// @description    Entfernt die nervige Wartezeit beim Karlsruher ELMS-Server der MSDNAA.
// @include        https://www.stud.uni-karlsruhe.de/~usath/elms/index.html?
// ==/UserScript==

window.addEventListener("load"
                       , function() { window.setTimeout('document.getElementById("elms0").style.display = "none";' +
                                                        'document.getElementById("elms1").style.display = "block";', 10); }
                       , false);
