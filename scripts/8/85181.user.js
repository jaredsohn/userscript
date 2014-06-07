// ==UserScript==
// @name           Links Reset value
// @include        http://www.electrobuzz.net/resetlinkvalue
// @description    This will reset Links value of GM
// @version		   0.1
// ==/UserScript==

// Release Notes
// 0.1
// -initial code
// End Release Notes

GM_setValue("Links", "asfasf"); 
GM_deleteValue("Links");
alert('Links Value deleted!');
	