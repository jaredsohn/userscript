// ==UserScript==
// @name           XBL Delete Message Button
// @namespace      vol
// @description    Adds a delete message button to the message center
// @include        http://live.xbox.com/en-US/profile/MessageCenter/ViewMessages.aspx
// ==/UserScript==

var allrows = document.getElementsByTagName('tr');
for (var x = 0, row; row = allrows[x]; x++) {
	var message_id = row.innerHTML.match(/mx=\d+/);
	if (message_id != null) {
		row.innerHTML = row.innerHTML + "<td style='padding:10px'><a href='http://live.xbox.com/en-US/profile/MessageCenter/RemoveMessage.aspx?" + message_id + "&amp;bk=0' class='XbcMessageButton'><font color=red>Delete</font></a></td>";
	}
}
