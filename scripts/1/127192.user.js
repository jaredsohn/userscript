// ==UserScript==
// @name           MySchool - Multi upload
// @namespace      http://userscripts.org/users/65243
// @description    Upload multiple files at the same time!
// @include        https://myschool.ru.is/myschool/?*verkID=*
// ==/UserScript==

document.forms["form1"].elements["FILE"].setAttribute("multiple", "multiple");
