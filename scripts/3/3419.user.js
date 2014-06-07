// ==UserScript==

// @name           Del.icio.us: Bundle-management dimmer
// @namespace      http://fennecfoxen.org/misc/grease/
// @description    Changes the look of del.icio.us's tag bundle manager. Tags in 'another bundle' will now appear grey; unbundled tags will remain blue and tags in this bundle remain red with pink background. This makes it easier for compulsive organizers who want to bundle EVERYTHING to see what they just haven't bundled yet.
// @include        http://del.icio.us/settings/*/bundle*
// ==/UserScript==


x = document.styleSheets[0];
x.insertRule("#bundle-edit .used { color: grey; border: none; }", y = x.cssRules.length - 1);
x.insertRule("#bundle-edit .member { color: red; }",y);
