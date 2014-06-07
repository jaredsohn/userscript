// ==UserScript==
// @name           Readability automaton
// @namespace      readability_automaton
// @version        2
// @description    Click yes/read confirmation for readability link.
// @include        https://www.readability.com/save?url=*
// @include        http://www.readability.com/save?url=*
// @include        https://www.readability.com/read?url=*
// @include        http://www.readability.com/read?url=*
// ==/UserScript==

var read_link = document.getElementById('read-link');
if (read_link) {
  read_link.click()
}
else {
  var save_forms = document.getElementsByTagName('form');
  if (save_forms) {
    save_forms[0].submit();
  }
}