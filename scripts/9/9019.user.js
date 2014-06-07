// ==UserScript==
// @name           Link to other team's Injury Report.
// @namespace      http://www.baseballsimulator.com
// @description    Adds a link to a team's front office page.
// @include        *sportingnews.com/baseball/stratomatic/*/team/team_other.html?user_id=*
// ==/UserScript==

var other_team_id = document.evaluate("//input[@name='other_team_id']/@value",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
other_team_id = other_team_id.snapshotItem(0);

var myLink = document.createElement("a");


var sendMessageLink = document.evaluate("//td/a[contains(@href,'/trade/compose_message.html')]",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

sendMessageLink = sendMessageLink.snapshotItem(0);
var sendMessageLink2 = String(sendMessageLink);
var other_user_id = sendMessageLink2.substr(sendMessageLink2.indexOf('other_user_id') + 14);
var year = sendMessageLink2.substr(sendMessageLink2.indexOf('stratomatic/') + 12, 4);

var other_team_name = document.evaluate("//td/span[contains(@style,'font')]/text()",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
other_team_name = other_team_name.snapshotItem(0);

myLink.innerHTML = '<br><a href="/baseball/stratomatic/' + year + '/home_good.html?user_id=' + other_user_id + '">' + other_team_name.nodeValue +' Injury Report</a>';

sendMessageLink.parentNode.appendChild(myLink,sendMessageLink);

