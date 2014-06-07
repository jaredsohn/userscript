// ==UserScript==
// @name		UserScript.org Group Script Page Install Links
// @author		Erik Vold
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated	2009-10-22
// @lastupdated	2009-10-24
// @namespace	usoGroupScriptInstallLinks
// @include		http://userscripts.org/groups/*/scripts?*
// @include		http://userscripts.org/groups/*/scripts#*
// @include		http://userscripts.org/groups/*/scripts
// @version		0.1
// @description	Adds install links to the scripts listed in userscript.org groups.
// ==/UserScript==

(function(){
	var usoGroupScriptInstallLinks={
		init:function(){
			var script,install,src,title,desc,scripts=document.evaluate("//table/tbody/tr/td[@class='script-meat']", document, null, 7, null);
			for(var i=0;i<scripts.snapshotLength;i++){
				script=scripts.snapshotItem(i);
				title=script.getElementsByClassName("title")[0];
				desc=script.getElementsByClassName("desc")[0];

				src=title.href.replace(/show/i,"source")+".user.js";

				install=document.createElement("a");
				install.href=src;
				install.innerHTML="<img title='Install' src='http://www.helexis.com/gfx/arrow_download.gif' />";
				install.setAttribute("style","vertical-align:baseline;padding:2px;");
				install.title="Install";

				script.insertBefore(install,title);
			}
		}
	}
	usoGroupScriptInstallLinks.init();
})();