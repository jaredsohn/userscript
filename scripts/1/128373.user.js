// ==UserScript==
// @name           Helgon - Betatest - Status
// @namespace      http://userscripts.org/users/khaosmat
// @description    This userscript replaces the inactive status icons with transparent ones
// @include        http://beta.helgon.se/*
// ==/UserScript==

var replace = {
    'http://beta.helgon.se/_static/i/ico/gu.gif': 'http://i42.tinypic.com/35mjcso.gif',
    'http://beta.helgon.se/_static/i/ico/ma.gif': 'http://i41.tinypic.com/315mtdz.gif',
    'http://beta.helgon.se/_static/i/ico/di.gif': 'http://i43.tinypic.com/2j3i4gp.gif',
    'http://beta.helgon.se/_static/i/ico/ga.gif': 'http://i41.tinypic.com/9h0v3o.gif',
    'http://beta.helgon.se/_static/i/ico/fo.gif': 'http://i44.tinypic.com/2079to3.gif',
    'http://beta.helgon.se/_static/i/ico/fr.gif': 'http://i41.tinypic.com/nx19vl.gif�'
};

var target = document.getElementsByTagName('img');

for (icon in target)
    for (img in replace)
        if (target[icon].src == img)
            target[icon].src = replace[img];