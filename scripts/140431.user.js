// ==UserScript==
// @name           BvS Top Contributor SonS game
// @namespace      Ren Po Ken
// @description    Fills yesterday's top contributor in the free SNAKEMAN game text field.
// @include        http://*animecubed.com/billy/bvs/village.*
// ==/UserScript==

first = document.getElementById("yesterrep").innerHTML.indexOf('<br>')+4;
last = document.getElementById("yesterrep").innerHTML.indexOf(' - ');
SonS = document.getElementById("yesterrep").innerHTML.slice(first, last);
field = document.evaluate("//input[@name='freesnake']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
field.snapshotItem(0).value = SonS;