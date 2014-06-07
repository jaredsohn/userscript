// ==UserScript==
// @name           NoWordAds
// @namespace      http://userscripts.org/users/Phoenix35
// @author         Phoenix35
// @description    Remove wordsads
// @include        *
// ==/UserScript==

window.addEventListener("load",    // This is because word-advertisings are added after the document is loaded
                        function(){
                         // e.g : http://www.hackthissite.org/
                         var aKona = new XPathEvaluator().evaluate("//a[contains(@class, 'kLink')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                         for(let i=0, alng=aKona.snapshotLength; i<alng; i++) {
                             aKona.snapshotItem(i).removeAttribute("id");
                         }
                         
                         // e.g : http://www.generation-gpu.fr/
                         var aiAs = new XPathEvaluator().evaluate("//a[contains(@class, 'iAs')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                         for(let i=0, alng=aiAs.snapshotLength; i<alng; i++) {
                             aiAs.snapshotItem(i).removeAttribute("itxtdid");
                         }
                        },
                        false);