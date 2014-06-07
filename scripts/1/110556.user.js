// ==UserScript==
// @name           Userscripts.org Search
// @description    Simply puts the searchbox on top of all pages on userscripts.org
// @author         Popeen
// @include        *userscripts.org*
// @version        1.1
// ==/UserScript==

var logo = document.createElement("div");
logo.innerHTML = "<div style='position: absolute;'><form style='border-spacing: 0px; margin: 0px; padding: 0px; space: 0px;' action='http://www.userscripts.org/scripts/search' method='get' name='form_name'><input style='border-spacing: 0px; margin: 0px; padding: 0px; space: 0px;' name='q' placeholder='Search scripts' title='Search' type='text' value='' /><input name='submit' type='submit' value='Search' /></form><img src='http://static.ak.fbcdn.net/rsrc.php/v1/yp/r/kk8dc2UJYJ4.png' width='0' height='0' onload='document.forms.form_name.q.focus()'/></div>";
document.body.insertBefore(logo, document.body.firstChild);