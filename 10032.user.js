// ==UserScript==
// @name           Exite Spammer Removal
// @namespace      http://www.combocentral.de
// @description    Removes all Spammers and will be updated everytime a new spammer apears
// @include        http://www.exitemod.com/forums/*
// @include        http://exitemod.com/forums/*

// ==/UserScript==

    var tbody = document.getElementsByTagName('tbody')
    for (var i=1; i<tbody.length; i++){
        if ((tbody[i].innerHTML.match('showuser=1133">myg0t_owns_yuo</a></span>')) || (tbody[i].innerHTML.match('showuser=1128">MPMES</a></span>'))|| (tbody[i].innerHTML.match('showuser=1129">myg0t</a></span>'))|| (tbody[i].innerHTML.match('showuser=1116">thespammer69</a></span>'))|| (tbody[i].innerHTML.match('showuser=962">thisisseth</a></span>'))) {
            var d2 = tbody[i].parentNode; 
            d2.parentNode.removeChild(tbody[i].parentNode.nextSibling)
			d2.parentNode.removeChild(tbody[i].parentNode)
			i--;
        }
    }
	