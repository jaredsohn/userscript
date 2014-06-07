// ==UserScript==
// @name           Multiaccount
// @namespace      glad
// @description    Multiaccount search
// @include        http://s*.gladiatus.it/admin/index.php?action=module&modName=PlayerEditor
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// ==/UserScript==


// Trova Modifica Alleanza
var testo = $('ul#module_menu').last().append('<li class="multi"><a href="#">Multi</a></li>');

