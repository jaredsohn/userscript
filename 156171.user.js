// ==UserScript==
// @name        Netvibes Tab Shortcut
// @namespace   http://userscripts.org/users/133248
// @description Adds a shortcut link to the right of the tabs in netvibes
// @include     http://www.netvibes.com/*
// ==/UserScript==

var myhref = "http://gmail.com";
var mytitle = "Gmail";

var shorcutimg = "data:imapge/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAsVJREFUSInVlUFrHVUUx39z79znVNOWbhrtIgvfK4UgggubteC6XXTpUhPd+gGCdOum+hlcFtQaF2qhHyBoqQihgjDkKcFGqa/xWefee869LmaMz8wreelK/3BguDPn/5v/OQMD/3cVM9cD4BKwfOT8JMrAPnAfCADlzM1L29vb10ej0ZmnNAegruvp2traeyLy7VHA+dFodGYymcRbn91aEY22tBZrS6w1WGux1gKgKaGiqP5T1pZ69cqV8XA4XHLOPT8PYAA++fTjla3Pt1adKxm4Ac6VOOconaMsLQUFooJEIcZIjEKIgRgFVSneenN9j5kRzwIAaJrGppRIKaGqGFNAUZABVQU4vCfd26eUyCnRNN52Nk8G5JRRUUxRUFCweuEBr7z4uAXN7D7nxM+TZ/ji3jIiioiSU+rtpAfQpIhEIJNyZufHJa5drlm7eNBr/m58lq3tc20aETRp7xnTA2hq5xoiwQd+f5y4fnOVvd9O9ZpTToQQuoqoLpJAlBBC+9UYg3MF717b5cK5P3vNOWW8DyRVVBMqsgBAheADxlqsNVy9/JDXX37Ya4R22d77bukJ0f6IegARxYeANQZjDK+99Iii2+20Kfjym9OsnE+8enHaAQIppTbFIglEhOA9pgM0sXVvYskb77/Azq6lGhR8+E7B6VMB37QJUkqILLRkxfvQleerrwcA3LlXcfd7ofGeyUHDxo3nuH23wnt/WDInQQ+QcybnjKoSo/DR7YL7Y8MPP7VA37RmB1PPjZuGGCOqSs65Zz4XcFQhwtsfPIuoOYS3dVxnq94O5mln17H/qAL6Mz5OvQRVVc11+XVyvPlM72G+2QQJYH19fZxzLpqmsZxAVVXpxsbGuPOcC/ilruvpcDhc2tzc3DuJ+YzKuq7/iDE++PvgX7/MsixXnXPLLLD8JyjFGPdFZAfwT+nxH9NfEvS2QmJH4uEAAAAASUVORK5CYII=";

nodeInsert = document.evaluate(
    "//div[@class='uwa-scroller-wrapper']/ul",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

var myLink = document.createElement("a");
myLink.href = myhref;
myLink.title = mytitle;
myLink.target = "_blank";
nodeInsert.snapshotItem(0).appendChild(myLink);

myIcon = document.createElement("img");
myIcon.src = shorcutimg;
myIcon.class="icon";
myIcon.height="24";
myIcon.width="24";

myLink.appendChild(myIcon);
