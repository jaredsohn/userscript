// ==UserScript==
// @name           Spickmich Newschat Auto "Nur Freunde"
// @version        1.0
// @namespace      http://userscripts.org/users/269252
// @author         Snehonja
// @description    Aktiviert standardmäßig den "Nur für Freunde" Haken
// @include        http://www.spickmich.de/home
// @include        http://spickmich.de/home
// @run-at         document-end
// ==/UserScript==

document.getElementById("nc-friends-checkbox").checked = true;