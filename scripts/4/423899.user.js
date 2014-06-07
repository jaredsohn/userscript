// ==UserScript==
// @name		Disable Confluence Editor (TinyMCE) Keyboard Shortcuts
// @author              Marc Tamsky
// @namespace	        about:blank
// @version             1.0.1
// @description		disable keyboard shortcuts for Confluence editor:  https://jira.atlassian.com/browse/CONF-21908
// @match        	https://confluence.example.com/*
// ==/UserScript==

function main() {
    // is there an editor?
    if ( typeof(tinyMCE) == "object") {
	// is it active?
	var ae = tinyMCE.activeEditor;
	// replace shortcuts object with emptyness:
	(ae) ? ae.shortcuts={} : undefined;
   }
}

setTimeout(function(){
    var script = document.createElement('script');
    script.appendChild(document.createTextNode('('+ main + ') ();'));
    (document.body || document.head || document.documentElement).appendChild(script);
    }, 5000);


// For Posterity:  None of the following work for the editor-in-iframe:
//
// setTimeout( function(){ main(); }, 5000);
//
// main();
//
// document.addEventListener("DOMContentLoaded", function() {
//   main();
// });
//
// DEBUG version of last line:
//      (ae) ? ae.shortcuts={} : alert("no hit"); 
