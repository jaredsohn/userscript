// ==UserScript==
// @name			Userscripts.org Script Versions Tab
// @author			Erik Vergobbi Vold
// @namespace		userscriptsOrgScriptVersionsTab
// @include			/http:\/\/userscripts\.org\/(scripts|topics|reviews)\/.*/i
// @include			http://userscripts.org/scripts/*
// @include			http://userscripts.org/topics/*
// @include			http://userscripts.org/reviews/*
// @match			http://userscripts.org/scripts/*
// @match			http://userscripts.org/topics/*
// @match			http://userscripts.org/reviews/*
// @version			0.2.5
// @license			MPL 2.0
// @datecreated		2009-08-13
// @lastupdated		2013-07-13
// @description		Adds a Versions tab to script pages on userscripts.org
// ==/UserScript==

(function(){
	var scriptNav = document.getElementById("script-nav");
	if ( !scriptNav ) return;

	var headingDiv=document.getElementById("heading");
	if(!headingDiv) return;

	var scriptID=document.evaluate('.//div[@id="details"]//a[contains(@href,"/scripts/show/")]',headingDiv,null,9,null).singleNodeValue;
	if(!scriptID) {
		scriptID = (document.location.href.match( /\/scripts\/show\/\d+/i )+"").match( /\d+/i );
		if(!scriptID) return;
	}
	else scriptID = scriptID.href.match(/\d+/i);

	var newLink = document.createElement( "a" );
	newLink.href = "http://userscripts.org/scripts/versions/" + scriptID;
	newLink.innerHTML = "Versions";

	var newTabEle = document.createElement( "li" );
	newTabEle.appendChild( newLink );

	// is versions page?
	if( document.location.href.match( /\/versions\/\d+/i ) ) {
		newTabEle.setAttribute( "class", "menu current" );
		var numOfVersions = document.evaluate("//div[@id='content']/ul/li/a/text()[contains(.,'changes')]", document, null, 7, null);
		newLink.innerHTML += " <span>" + numOfVersions.snapshotLength + "</span>";
		GM_addStyle( "#script-nav li.current { padding: 0; }" );
	}
	else newTabEle.setAttribute( "class", "menu" );

	scriptNav.appendChild( newTabEle );

	return;
})();
