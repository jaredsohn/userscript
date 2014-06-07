// ==UserScript==
// @name       RYM: Hide polls on Off Topic
// @version    0.2
// @include    http://rateyourmusic.com/boards*board_id*6
// @copyright  2012+, AnniesBoobs
// ==/UserScript==
rows = document.getElementsByClassName('mbgen')[0].getElementsByTagName('tr');
for (r=0; r<rows.length; r++){
    if (rows[r].getElementsByClassName('smallgray')[0] != undefined){
        if (rows[r].getElementsByClassName('smallgray')[0].innerHTML.indexOf('[Poll]') >= 0 && rows[r].getElementsByTagName('td')[1].innerHTML.indexOf('dunya') < 0){rows[r].style.display = 'none'}
    }
}