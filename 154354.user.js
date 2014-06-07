// ==UserScript==
// @name       RYM: Disable double posting
// @version    0.1
// @include    http://rateyourmusic.com/board_new_message?*
// @copyright  2012+, AnniesBoobs
// ==/UserScript==
inputs = document.getElementsByTagName('input');

for (i=0; i<inputs.length; i++){
    if (inputs[i].value == 'Post Now >'){
        x = inputs[i];
        break;
    }
}

function hide(){
    x.style.display = 'none';   
}

x.addEventListener('click', hide, false);