// ==UserScript==
// @name		UserScripts.org Install Link On All Script Pages
// @author		Erik Vold
// @namespace	userscriptsOrgInstallLinkOnAllScriptPages
// @include		/https?:\/\/userscripts\.org\/(scripts\/[^\/]*|topics|reviews)\/.*/i
// @include		http*://userscripts.org/scripts/*/*
// @include		http*://userscripts.org/topics/*
// @include		http*://userscripts.org/reviews/*
// @match		http://userscripts.org/scripts/*/*
// @match		http://userscripts.org/topics/*
// @match		http://userscripts.org/reviews/*
// @version		0.3
// @datecreated	2009-08-15
// @lastupdated	2013-07-13
// @homepageURL http://userscripts.org/scripts/show/55774
// @license		MPL 2.0
// @description	This userscript will add the install link for userscripts on userscripts.org to all pages associated to the script.
// ==/UserScript==

(function(){
	var installDiv = document.getElementById("install_script");
	if (installDiv)
      return;

	var contentDiv = document.querySelector("#section > .container");
	if(!contentDiv)
	  return;

	var headingDiv = document.getElementById("heading");
	if(!headingDiv)
	  return;

	var scriptID=document.evaluate('.//div[@id="details"]//a[contains(@href,"/scripts/show/")]',headingDiv,null,9,null).singleNodeValue;
	if (!scriptID)
	  return;
	scriptID = scriptID.href.match(/\d+/i);

	installDiv = document.createElement("div");
	installDiv.setAttribute('id', "install_script");
	installDiv.innerHTML = '<a title="Install" class="userjs" href="http://userscripts.org/scripts/source/' + scriptID + '.user.js">Install</a>';

	contentDiv.insertBefore(installDiv, headingDiv);
})();
