// ==UserScript==
// @name           Chess.com Theme Changer
// @namespace      http://userscripts.org/users/WB3000
// @description    Change Board Pieces and Design
// @include        http://www.chess.com/echess/game.html?id=*
// @include        http://www.chess.com/echess/conditions.html?id=*
// ==/UserScript==

// CHANGE THIS NUMBER TO THE CORRESPONDING VALUES BELOW! Ex: 4 for the red board.
var Board_Image_Index = 0;

// The Styles...
var boards = new Array();
boards[0] = 'brown|.gif';
boards[1] = 'green|.gif';
boards[2] = 'blue|.gif';
boards[3] = 'grey|.gif';
boards[4] = 'red|.gif';
boards[5] = 'orange|.gif';
boards[6] = 'pink|.gif';
boards[7] = 'purple|.gif';
boards[8] = 'tan|.gif';
boards[9] = 'blackwhite|.gif';
boards[10] = 'winboard|.gif';
boards[11] = 'woodlight|.jpg';
boards[12] = 'woodmid|.jpg';
boards[13] = 'wooddark|.jpg';
boards[14] = 'woodolive|.jpg';
boards[15] = 'metal|.jpg';
boards[16] = 'marblegreen|.jpg';
boards[17] = 'marbleblue|.jpg';
boards[18] = 'marblebrown|.jpg';

var images_url = 'http://images.chesscomfiles.com/js/chess/images/chess/boards/';

// Locate board sizes (60, 30, etc...)
var boardUrl = document.getElementById('chess_com_emailboard_1_boardarea').style.background;
var boardSize = (boardUrl.match(/\d+/));

var new_img_url = images_url + boards[Board_Image_Index].replace('|', ('/' + boardSize));
var new_style = '#chess_com_emailboard_1_boardarea { background: url(' + new_img_url + ') !important; }';

// Changes the image...
addGlobalStyle(new_style);

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}