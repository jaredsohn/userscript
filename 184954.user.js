// ==UserScript==
// @name       show the hidden optimizely account (including test budget/quota)
// @namespace  https://optimizely.com/
// @version    0.1
// @description  For users of Optimizely who want to check their monthly testing quota but don't have owner/admin rights
// @match      https://www.optimizely.com/account
// @copyright  2012+, You
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// ==/UserScript==


$('#plan_info').show();

