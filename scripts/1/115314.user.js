// ==UserScript==
// @id             move-ogs-messages@http://userscripts.org/users/102549
// @name           move-ogs-messages
// @version        1.0
// @namespace      http://userscripts.org/users/102549
// @author         David Shockley
// @description    Move messages to the right side of the go board on OGS
// @include        http://www.online-go.com/games/board.php*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @run-at         document-end
// ==/UserScript==
messages_container = $('#messages-wrapper').closest('fieldset.controls');
$('td.mainboardpanel:first').closest('tr').append(messages_container);
messages_container.wrap('<td class="mainboardpanel"/>');
