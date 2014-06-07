// ==UserScript==
// @name Orkut community Go to Last Page after Reply
// @author  http://www.orkut.com/Profile.aspx?uid=5864958054912067163
// @namespace
// @description Navigates to last page by default when u reply on communities
// @include http://www.orkut.com/CommMsgs.aspx*&na=4
// ==/UserScript==

window.location.href = window.location.href.replace(/na=4/, 'na=2');