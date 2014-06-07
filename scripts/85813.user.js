// ==UserScript==
// @name            Google SSL Redirect
// @namespace       http://tegasinho.blogspot.com
// @description     Use Google (Search Engine Only) with SSL (https)
// @include         http://www.google.*
// @include         http://google.*
// @version         0.02
// ==/UserScript==

<!-- Google SSL Redirect-->
<!-- Edited by tegasinho -->
<!-- If you modify this script,please don´t delete this lines -->

location.href = location.href.replace(/http\:/, 'https:');
