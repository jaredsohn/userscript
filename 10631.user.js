// ==UserScript==
// @name	4chan #Fortune Remover
// @author	David Duke, edited by ParagonOfEvil
// @date	07-12-2007
// @version	v1.1
// @description Disables #fortune when forced anonymous is on.
// @include	http://*.4chan.org/*
// ==/UserScript==
nameField = document.evaluate('//input[@name="name"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
nameField.setAttribute('value',' ');