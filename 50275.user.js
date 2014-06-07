// ==UserScript==
// @name           farmmanager focus
// @namespace      http://np.bmaker.net/*
// @description    fokusiert das input text feld beim seitenladen automatisch
// @include        http://np.bmaker.net/tools/farmmanager.php*
// ==/UserScript==


// @version 1.0

// get doc
getdoc = window.document;
getdoc.getElementsByName("report")[0].focus();
