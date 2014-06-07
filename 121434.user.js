// ==UserScript==
// @name                Hide Annoying Wikipedia Donation Request
// @namespace	        http://userscripts.org/users/neatwolf
// @description	        Safely and efficiently hides the annoying Wikipedia donation request. It autoupdates to accomodate possible Wikipedia changes.
// @date		2011-12-26
// @version		1.0
// @author		Alessandro Salvati
// @include		http*://*.wikipedia.*
// @include		http*://wikipedia.*
// @license		GPL version 3; http://www.gnu.org/copyleft/gpl.html
// @require		http://sizzlemctwizzle.com/updater.php?id=121434&days=1
// ==/UserScript==

document.getElementById("siteNotice").style.display = "none";

//I'll update the script soon, to better refine it. It'll inform you automatically when a new version is available.