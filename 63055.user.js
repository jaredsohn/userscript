// ==UserScript==
// @name           Tunisia-sat Script
// @namespace      TnSat
// @description    un nouveau script pour le forum
// @include        http://www.tunisia-sat.com/*
// ==/UserScript==
	

	table = document.evaluate( '//img[@title="إضافة رد"]',
								document,
								null,
								XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
								null );

	if ( table.snapshotItem(1) ){ //si le deuxieme element existe
		replybtn = table.snapshotItem(1); // le collecter ...
		replybtn.setAttribute("style","position: fixed; bottom: 0px; right: 0px;"); //le positionner ...
	}
