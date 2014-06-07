// ==UserScript==
// @name       RYM: bandcamp tracklist formatter
// @version    0.1
// @description  converts tracklist copied from bandcamp to RYM format
// @match      https://rateyourmusic.com/releases/ac?*
// @copyright  2012+, thought_house
// ==/UserScript==
var target = document.getElementById('advancedhelp').getElementsByTagName('td')[0];
var newButton = document.createElement('a');
function formatFromBandcamp() {
 
    var box = document.getElementById('track_advanced');
    var str = box.value;
    str = str.replace(/\.\n/g, '|');
    str = str.replace(/ (?=\w\w:\w\w\n)/g, '|');
    str = str.replace(/ (?=\w\w:\w.$)/g, '|');
    box.value = str;
    
}
newButton.className = 'ratingbutton';
newButton.addEventListener('click', formatFromBandcamp, false);
newButton.innerHTML = 'Format bandcamp tracklist';
target.appendChild(newButton);