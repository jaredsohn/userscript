// ==UserScript==
// @name			deviantART Outgoing Link Auto Redirector
// @author			KodokuRyuu
// @description		Automatically redirects outgoing links on deviantART ignoring deviantART's "safety" page.
// @copyright		2013, KodokuRyuu (http://userscripts.org/users/506725)
// @license			(CC) Attribution 3.0 Unported; http://creativecommons.org/licenses/by/3.0/
// @version			1.0.1
// @include			http://www.deviantart.com/users/outgoing?*
// @include			https://www.deviantart.com/users/outgoing?*
// @run-at			document-start
// ==/UserScript==

location.assign(location.href.substring(location.href.indexOf('?')+1));
