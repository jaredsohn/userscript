// ==UserScript==
// @name           Flower comment signature
// @namespace      http://userscripts.org/users/231678
// @description    Inserts a signature in Flower's comment area.
// @include        /https://flower\.[a-z\.]+/browse/[A-Z]{4}-[0-9]+/
// ==/UserScript==

function go() {
    var greeting = 'Hi ';
    var close = 'Best Regards';

    var comments = document.querySelectorAll("div.activity-comment");

    var userName = document.querySelector('#header-details-user-fullname').innerHTML;
    var userNameFormated = userName.substring(userName.indexOf(',')+2,userName.length) + ' ' + userName.substring(0,userName.indexOf(','));

    var lastCommentName;
    var lastCommentFirstName;

    //only get the last commenter's name if there are more than 1 comment. the first one is usually not relevant
    if (comments.length > 1) {
        lastCommentName = comments[comments.length-1].children[0].children[2].children[0].innerHTML;
        lastCommentFirstName = lastCommentName.substring(lastCommentName.indexOf(',') + 2,lastCommentName.length) + ',';
                
        //if last commenter was you, search for previous ones from last to first
        if (lastCommentName == userName) {
            for (var i = 1; i < comments.length - 1; i++) {
                lastCommentName = comments[comments.length-1-i].children[0].children[2].children[0].innerHTML;
                lastCommentFirstName = lastCommentName.substring(lastCommentName.indexOf(',') + 2,lastCommentName.length) + ',';
                
                //stops if it finds a different name
                if (lastCommentName != userName) {
                    break;
                } else {
                    lastCommentFirstName = '';                    
                }                
            }        
        }
    } else {
        lastCommentFirstName = '';
    }
    
    if (lastCommentFirstName == '') {
        greeting = '';
    }

    document.getElementById("comment").innerHTML =  greeting + lastCommentFirstName + '\n\n\n' + close + ',\n' + userNameFormated;
}

document.getElementById('footer-comment-button').addEventListener('click', go, false);