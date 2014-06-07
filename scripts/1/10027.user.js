// ==UserScript==
// @name           Exite Anti-myg0t
// @namespace      http://nextilnet.com
// @description    Removes all the myg0t tards
// @include        http://www.exitemod.com/forums/*
// @include        http://exitemod.com/forums/*

// ==/UserScript==

    var tbody = document.getElementsByTagName('tbody')
    for (var i=1; i<tbody.length; i++){
        if ((tbody[i].innerHTML.match('showuser=1133">myg0t_owns_yuo</a></span>')) || (tbody[i].innerHTML.match('showuser=1128">MPMES</a></span>'))) {
            var d2 = tbody[i].parentNode; 
            d2.parentNode.removeChild(tbody[i].parentNode.nextSibling)
			d2.parentNode.removeChild(tbody[i].parentNode)
			i--;
        }
    }
	