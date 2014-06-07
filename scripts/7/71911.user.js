// ==UserScript==
// @name Orkut community Go to Last Page after Reply
// @author  http://www.orkut.com/Profile.aspx?uid=15880589108847070733
// @namespace
// @description Navigates to last page by default when u reply on communities
// @include http://www.orkut.com/Main#CommMsgs?cmm**&*tid*=**&na=4*
// @include *&na=4* 
// @require http://sizzlemctwizzle.com/updater.php?id=71911&days=2
// ==/UserScript==

window.location.href = window.location.href.replace(/na=4/, 'na=2');