// ==UserScript==
// // @name          Winkey Disable
// // @description   Simple script to turn off annoying winkey usage by websites (Atlassian Confluence f.e.). Keep winkey only for window managers (like Awesome WM)!
// // @include       *
//
// // ==/UserScript==
//

function disable_winkey(event){
    if (event.keyCode == 91){
        event.preventDefault();
        event.stopPropagation();
    };
};

addEventListener("keydown", disable_winkey, true);
addEventListener("keypress", disable_winkey, true);
addEventListener("keyup", disable_winkey, true);
