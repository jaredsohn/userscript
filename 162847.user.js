// ==UserScript==
// @name 			Skip Link-Results.com
// @id				skip_link_results_com
// @version			1
// @author			GammaRay360
// @namespace	  	null
// @description		skip forum links from Link-Results.com to original link
// @license			GPL v3 or later version
// @downloadURL		null
// @updateURL		null
// @run-at			document-end

// @include		*http://link-results.com/?lid=*
// ==/UserScript==

window.location = document.getElementsByTagName("h2")[0].children[1].href