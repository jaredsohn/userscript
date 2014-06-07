// ==UserScript==
// @name           Improved Remember the Milk Overview
// @namespace      http://userscripts.org/scripts/show/38591
// @description    Replaces the overview page in Remember the Milk with an iframe of the RTM gadget
// @include        http://www.rememberthemilk.com/*
// ==/UserScript==

var overviewtabs, overview, RTMGadget;

//full node containing tabs & list has no id, so it is assigned using a child node

overviewtabs = document.getElementById('overviewtabs');
overview = overviewtabs.parentNode

//RTM gadget

RTMGadget = document.createElement("div");

//replace tabs & list with iframe of RTM gadget

if (overview) {
    	RTMGadget.innerHTML = '<iframe src ="http://www.rememberthemilk.com/services/modules/googleig/" ' +
		'width="100%" height="400px" frameborder="0"></iframe>';

    	overview.parentNode.replaceChild(RTMGadget, overview);
}