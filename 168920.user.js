// ==UserScript== 
// @name    Friendfeed Timeago 
// @namespace   Friendfeed-TimeAgo
// @description Shows comment adding date-times next to comments on Friendfeed.
// @include http://friendfeed.com/* 
// @include https://friendfeed.com/* 
// ==/UserScript== 

function addCommentDates() {
    comments = document.getElementsByClassName("comment");
    for (var i=0; i<comments.length; i++) {
        comment = comments[i];
        commentDate = comment.getElementsByClassName("quote")[0]["title"];
        commentDate = " (" + commentDate + ") ";
        console.log(commentDate);
        console.log(comment.getElementsByClassName("comment_date_box"));
        if (comment.getElementsByClassName("comment_date_box").length == 0) {
            console.log(1);
            commentDateBox = document.createElement("span");
            commentDateBox.setAttribute("class", "comment_date_box");
            commentDateBox.setAttribute("style", "color:#666;font-size:10px;");
            commentDateBox.textContent = commentDate;
            var containerElement = undefined;

            console.log("000");
            console.log(comment.getElementsByClassName("via"));
            console.log("111");
            if (comment.getElementsByClassName("via").length) {
                console.log("via'ya ekleniyorum");
                containerElement = comment.getElementsByClassName("via")[0];
                containerElement.appendChild(commentDateBox);
            } else if (comment.getElementsByClassName("l_profile").length) {
                console.log("l_profile'a ekleniyorum");
                containerElement = comment.getElementsByClassName("l_profile")[0];
                containerElement.appendChild(commentDateBox);
            }
        } else {
            console.log("There is a comment_date_box element and it is here: ");
            console.log(comment.getElementsByClassName("comment_date_box"));
            commentDateBox = comment.getElementsByClassName("comment_date_box")[0];
            commentDateBox.textContent = commentDate;
        }
    }
    console.log("finished");
}

window.addEventListener("load", timeago, false);
function timeago() {
    addCommentDates();
    setInterval(function() { addCommentDates() },10000);
}