// ==UserScript==
// @name          Auto-Back
// @namespace     http://ThreeTENSeven.com
// @description   Script to automatically go "back" when unintentionally travelling to a previously determined "unwanted" domain or page (You have to manually set which pages or domains to include before the script will begin to function for them)
// @include       http://securedns.comodo.com/main?*
// ==/UserScript==

javascript:history.go(-1);