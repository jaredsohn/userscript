// ==UserScript==
// @name           Cumulative Statistics Only
// @namespace      paymo
// @include        http://jhclark.paymo.biz/dashboard/overview/
// ==/UserScript==

(function () {
var tags = document.getElementsByTagName('div');
for (var key in tags)
with (tags[key])
if (getAttribute('id') == 'header') style.display = 'none';
else if (getAttribute('id') == 'footer') style.display = 'none';
else if (getAttribute('class') == 'section_title') style.display = 'none';
else if (getAttribute('class') == 'project') style.display = 'none';
else if (getAttribute('class') == 'halfbox') style.display = 'none';
//else if (getAttribute('class') == 'halfbox_left') style.align = 'center';
})();