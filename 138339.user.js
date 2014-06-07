// ==UserScript==
// @name        Apple Developer Team select Rename
// @description Changes Team name by adding Team ID
// @author      Taras Kalapun <t.kalapun@gmail.com>
// @include     http*://developer.apple.com/devcenter/selectTeam*
// ==/UserScript==
teams = document.getElementById("teams")
for (var i=0; i<teams.length; i++){
  teams.options[i].text = teams.options[i].text+" ("+teams.options[i].value+")"
}