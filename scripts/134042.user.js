// ==UserScript==
// @name        Admin select loggings
// @namespace   http://userscrips.org/
// @description Select all teams with inactivity higher than 50 days in the Admin Sokker loggings page
// @include     http://online.sokker.org/admin_login.php*
// @version     0.1
// ==/UserScript==

var checkbox, days, aux, aux_days;
/*  Read all checkboxes */
checkbox = document.getElementsByTagName('input');
/* Read the <strong> elements */
aux = document.getElementsByTagName('strong');
for (var i=0; i<checkbox.length; i++) {
  aux_days = aux[i*2].childNodes[0].nodeValue;
  /* Get the number of inactivity days */
  days = aux_days.split(" ");
  if (parseInt(days) > 50)
  {
    checkbox[i].checked = true;
  }
}

