// ==UserScript==
// @name           Crosslinker Beautifier
// @namespace      sarmento.org
// @description    Enhances a little bit the Crosslinker plugin page in WP self-hosted
// @include        */wp-admin/tools.php?page=crosslinker
// ==/UserScript==

document.getElementsByName('linker_word')[0].style.width='550px';
document.getElementsByName('linker_uri')[0].style.width='550px';
document.getElementsByName('linker_attr')[0].style.width='550px';

document.getElementsByName('linker_word')[0].focus();