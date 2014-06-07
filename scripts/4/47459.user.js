// ==UserScript==
// @name           Remove MiZzPrIcE's double returns
// @namespace      rmdr@kwierso.com
// @description    Replace mizzprice's double returns with something else
// @include        http://*.roosterteeth.com/forum/viewTopic.php?id=2214518*
// @include        http://roosterteeth.com/forum/viewTopic.php?id=2214518*
// ==/UserScript==

(function() {
    var allPriceComments = getPriceComments(getAllComments(document));
    var allCommentPosts = [];

    for(i in allPriceComments) {
        fixComment(allPriceComments[i]);
    }
})();

function getAllComments(doc) {
    var allTD = doc.getElementsByTagName("td");
    var allComments = [];
    
    for(i in allTD) {
        if(allTD[i].className == "comment" || allTD[i].className == "comment altComment")
            allComments.push(allTD[i]);
    }
    return allComments;
}

function getPriceComments(allComments) {
    var allPriceComments = [];
    for(i in allComments) {
        if(allComments[i].getElementsByTagName("b")[0].innerHTML == "MiZzPrIcE" ||
           allComments[i].getElementsByTagName("b")[0].innerHTML == "13islucky") {
            allPriceComments.push(allComments[i]);
        }
    }

    return allPriceComments;
}

function fixComment(comment) {
    var allTD = comment.getElementsByTagName("td");
    var allCommentPosts = [];
    
    for(i in allTD) {
        if(allTD[i].className == "commentPost")
            allCommentPosts.push(allTD[i]);
    }

    allCommentPosts[0].innerHTML = allCommentPosts[0].innerHTML.replace(/\<br\>\<br\>/g, "");

    allCommentPosts[0].innerHTML = allCommentPosts[0].innerHTML.replace(/\<\/i\>\<\/a\>:\<\/\i>/g, "</i></a>:</i><br><br>");

    allCommentPosts[0].innerHTML = allCommentPosts[0].innerHTML.replace(/\<i\>In reply to /g, "<br><br><i>In reply to ");
//alert(allCommentPosts[0].innerHTML);
    allCommentPosts[0].innerHTML = allCommentPosts[0].innerHTML.replace("								<br><br><i>In reply to ", "<i>In reply to ");


}