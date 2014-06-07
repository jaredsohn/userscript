// ==UserScript==
// @name           GMXMail_select_delete
// @namespace       http://service.gmx.net/de/cgi/g.fcgi/mail/
// @description    Select the 1st option "delete" ("Löschen") in the combobox instead of option no. 0 "select here" ("Aktion wählen")
// @include        http://service.gmx.net/de/cgi/g.fcgi/mail/index?*
// ==/UserScript==
var cbCommand = document.getElementById('COMMAND');
if (cbCommand) {
    cbCommand.selectedIndex = 1;
}