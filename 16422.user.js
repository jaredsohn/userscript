// ==UserScript==
//@Credits        Rodrigo Lacerda [http://www.orkut.com/Profile.aspx?uid=1707700121110059969] 
// @name           View Locked Scrapbook
// @namespace      http://www.ougarena.com
// @description    View Locked Scrapbook
// @include        http://www.orkut.com/*
// ==/UserScript==

/* Credits to Rodrigo Lacerda [http://www.orkut.com/Profile.aspx?uid=1707700121110059969]  for making that site.. and last part of this script */
javascript:if((document.getElementsByTagName('div').item(10).innerHTML.indexOf('This content has been set to private by the profile owner.')>=0) || (document.getElementsByTagName('div').item(10).innerHTML.indexOf('Este conteúdo foi definido como particular pelo dono do perfil.')>=0)){document.location='http://rodlac.freetzi.com/ViewScraps.php?uid='+encodeURIComponent(location.href);}