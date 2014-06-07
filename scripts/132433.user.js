// ==UserScript==
// @name           RODE Wiki auto delete
// @namespace      http://userscripts.org/scripts/show/132433
// @description    Auto deletes rode wiki user pages that were blocked
// @include        http://wiki.rodeonline.com/index.php?title=User:*&action=delete
// ==/UserScript==
document.getElementById('wpDeleteReasonList').value = "Advert";
document.getElementById('wpReason').value = "";
document.forms[0].submit();