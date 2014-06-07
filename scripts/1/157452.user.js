// ==UserScript==
// @name       SC Chatroll Dev Highlight
// @description	Work in progress for cleaning up Star Citizen's Chatroll
// @namespace  http://www.elfindreams.com
// @version    1.1
// @include		http://chatroll.com/embed/chat/roberts-space-industries*
// ==/UserScript==

var dev_hashes = [
  'a2J8sWXv8Wp',
  'jo4dHEh_nz0',
  'bwjtCBj9Slh', 
  'y5HhYoJfdEX',
  'LdBw7TVO-5X',
  'g9K2MozPC8h',
  'uiCF9SYLIyP',
  'y5HhYoJfdEX',
  'uSJ4V0d2PnP',
  '\39 PVwZO3iVQ_',
  '\35 2kNJBM2et4',
  'U026O7da-B-',    // Jason Spangler, CTO
  'tdgZBCm34so',    // Chris Smith, vehicle artist
  'WugkHzYZe7-',    // Zane, webui
  'I4Mwlu7V32Z',    // Chris Olivia, Chief Visual Officer
  'faaroEtatNI',    // Jason Spangler, second account
  'g9K2MozPC8h',    // Sumasshu, gameplay programmer
  'OG6QCLy8GWt',    // Adam Poole, Associate Producer
  'UhKLA6sDIiM',    // Michael Morlan, (Viewmaster)
  'TJRVeNzNn89',    // Rob Irving, Designopotamus, lead designer
  'X7y4xhrgM1U'     // Rico Acosta, Rico.CIG, IT Director
];   

for (x in dev_hashes) {
  GM_addStyle('.' + dev_hashes[x] + ' .message-content span.message-text ' +
              '{ background-color: white; color: black; font-weight: bold;}'); 
}