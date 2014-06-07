// ==UserScript==
// @name         AutoCheck_diigo
// @version      1.0
// @author       Chen Xi
// @e-mail       imchenxi@gmail.com
// @description  Auto Check the checkbox
// @include      http://www.diigo.com/post*
// ==/UserScript==

ReadLater = document.getElementById('unreadCheckbox');
ReadLater.checked = true;

Private = document.getElementById('privateInput');
Private.checked = true;

//addToList = document.getElementById('addToList');
//addToList.checked = true;

//toggleAddToList(addToList);