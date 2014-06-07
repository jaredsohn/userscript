// ==UserScript==
// @name           CrashPlan PRO server
// @namespace      http://probackup.nl/turn-off-mail-settings-autocomplete
// @description    Add autocomplete=off properties to mail server credentials settings in the web admin of CrashPlan PRO server
// @include        https://*/manage/server/settings_mail.vtl?serverId=*&tid=*
// ==/UserScript==

var elmUsername = document.getElementById('externalEmailUsername');
var elmPassword = document.getElementById('externalEmailPassword');

elmUsername.setAttribute('autocomplete', 'off')
elmPassword.setAttribute('autocomplete', 'off')