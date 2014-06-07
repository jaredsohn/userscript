// ==UserScript==
// @name          Hide who to follow
// @version       0.1
// @namespace     http://erichlotto.com/projects
// @description   destroy the who to follow tab on twitter
// @include       http://twitter.com/
// @include       https://twitter.com/
// ==/UserScript==

document.getElementById('recommended_users').innerHTML = '';
