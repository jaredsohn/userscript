// ==UserScript==
// @id           github-old-dl-btn@erikvold.com
// @name         Use Old GitHub Downloads Button
// @namespace    erikvold
// @include      /^https?:\/\/github\.com\/[^\/]+\/[^\/]+/
// @match        http://github.com/*/*
// @noframes
// @updateURL    https://userscripts.org/scripts/source/88790.meta.js
// @homepage     http://userscripts.org/scripts/show/88790
// @datecreated  2010-10-24
// @lastupdated  2010-10-24
// @version      0.1.1
// @author       Erik Vergobbi Vold <erikvvold@gmail.com>
// @license      MIT
// @description  This user script will bring the old 'downloads' link back, and remove the new one.
// ==/UserScript==

(function(d, gh) {
var dlBtn = d.getElementById("download_button");
if(dlBtn) dlBtn.parentNode.removeChild(dlBtn);

var networkLi = d.evaluate("//ul[contains(@class, 'tabs')]/li/a[@highlight='repo_network']", document, null, 9, null).singleNodeValue.parentNode;
if(!networkLi || !gh || !gh.nameWithOwner) return;

var newLi = d.createElement("li");
var newA = d.createElement("a");
newA.setAttribute("highlight", "repo_downloads");
newA.setAttribute("href", "http://github.com/" + gh.nameWithOwner + "/downloads");
newA.innerHTML = "Downloads";
newLi.appendChild(newA);

var tabs = networkLi.parentNode;
tabs.insertBefore(newLi, networkLi);
tabs.insertBefore(networkLi, newLi);

if ("downloads" != gh.controllerName) return;
newA.setAttribute("class", "selected");

})(document, unsafeWindow.GitHub);
