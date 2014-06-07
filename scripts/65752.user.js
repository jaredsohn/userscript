// ==UserScript==
// @name            hi5-uncheck-other-contacts
// @identifier      http://userscripts.org/scripts/source/65752.user.js
// @description     Uncheck for other contacts to page import contacts
// @namespace       http://userscripts.org/users/125537
// @include         http://*.hi5.com/friend/processImportContacts.do
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// @require         http://buzzy.hostoi.com/AutoUpdater.js
// @author          http://www.dotek.info
// @copyright       2010, Dotek.info
// @date            2010-01-05
// @license         Creative Commons CC-BY-SA; http://creativecommons.org/licenses/by-sa/3.0/
// @version         0.1
// @unwrap
// ==/UserScript==

var script_id = 65752;
var script_version = '0.1';

if($("table").is(".email-list")) {
    $("input[name='allyeah'][value='0']").attr("checked","checked");
    $("#othercontacts input").removeAttr("checked");
    $("#allcontacts").show();
}