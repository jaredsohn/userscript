// ==UserScript==
// @name           Atomuhrzeit
// @author         kernpunkt
// @description    Zeigt die Atomuhrzeit in der Titelleiste an.
// @include        http://www.uhrzeit.org
// ==/UserScript==

window.setInterval(
                  function AtomuhrzeitInTitle()
                    {
                      var x = document.getElementById("anzeige").firstChild.data;
                      window.document.title = x; //.substring(10,18);
                    }
                    , 1000);