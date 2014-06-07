// ==UserScript==
// @name HattrickPlayersNickname
// @namespace HattrickPlayersNickname
// @description Adds option to give players nicknames
// @include http://www*.hattrick.org/Club/Players/Player.aspx?PlayerID=*
// ==/UserScript==

btn_submit = document.getElementById('ctl00_ctl00_CPContent_CPSidebar_ucOwnerActions_btnSubmitNickname');
submit_data = document.getElementById('ctl00_ctl00_CPContent_CPSidebar_ucOwnerActions_ucNickName_inputBox');
allH1 = document.getElementsByTagName('h1');

for (i=0; i<allH1.length; i++) {
PlayerName = allH1[i].innerHTML.replace(/^\s+|\s+$/g, '');
PlayerName = PlayerName.substr(PlayerName.indexOf('</span>')+7, PlayerName.length);
PlayerName = PlayerName.replace(/^\s+|\s+$/g, '');
PlayerName = PlayerName.substr(0, PlayerName.indexOf(' <span>'));

allH1[i].innerHTML = allH1[i].innerHTML.replace(PlayerName, PlayerName+' '+GM_getValue(PlayerName, ''));
}

//Function for storing players nickname
function setNickname(){
  GM_setValue(PlayerName, submit_data.value);
}

//Modified attribute and event listener on present "set nickname button".
btn_submit.setAttribute("type", "button");
btn_submit.addEventListener('click', setNickname(), false);