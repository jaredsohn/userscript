// ==UserScript==
// @name         MediaWiki LinkToEditUser
// @namespace    https://userscripts.org/people/5587
// @description  Gives on userpages of mediawikis a link to Special:EditUser (you'll need mw-extension EditUser on that wiki).
// @downloadURL  https://userscripts.org/scripts/source/170935.user.js
// @grant        none
// @include      /wiki/(Benutzer|User).*/
// @include      /title=(Benutzer|User):.*&action=edit/
// @updateURL    https://userscripts.org/scripts/source/170935.meta.js
// @version      1.0.1
// @date         2013-06-16
// @creator      Arne Dieckmann (aka "Mithrandir")
// ==/UserScript==

var h1First = document.evaluate("//h1[@id='firstHeading']//span", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null);
var userName = h1First.snapshotItem(0).innerHTML.replace(/ /g,"+").replace(/“/g,"").replace(/\/.*/g,"");
userName = encodeURI(userName.substring(userName.lastIndexOf(":")+1));

var ulMenu = document.evaluate("//div[@id='p-cactions']//div//ul", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null);
var liChConf = ulMenu.snapshotItem(0).appendChild(document.createElement('li'));

liChConf.innerHTML='<a href="/index.php?title=Special:EditUser&amp;username='+userName+'">Konfiguration</a>';