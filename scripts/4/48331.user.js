// ==UserScript==
// @name           Edit Posts
// @namespace      editpost@kwierso.com
// @description    asdfasdfa
// @include        http://*.roosterteeth.com/groups/forum/viewTopic.php?id=*
// @include        http://roosterteeth.com/groups/forum/viewTopic.php?id=*
// @include        https://*.roosterteeth.com/groups/forum/viewTopic.php?id=*
// @include        https://roosterteeth.com/groups/forum/viewTopic.php?id=*
// ==/UserScript==

(function() {
    var allComments = getAllComments(document);


    for(i in allComments) {
        createEditButton(allComments[i], document);
    }
})();

function getAllComments(elem) {

    var allComment = [];
    var allElems = elem.getElementsByTagName("*");
    var holder;
    for(i in allElems) {
        if(allElems[i].className == "comment" || allElems[i].className == "comment altComment") {
            allComment.push(allElems[i].getElementsByTagName("tr")[0].getElementsByTagName("span")[5].parentNode);
        }
    }

return allComment;
}

function createEditButton(comment, doc) {
    if(!comment.innerHTML.match("censor"))
        return;
    var clone;
    var censor = comment.getElementsByTagName("b")[comment.getElementsByTagName("b").length-1].parentNode.parentNode;
    var holder;
    clone = censor.cloneNode(true);

    var bEl = doc.createElement("b");
    bEl.innerHTML = "Edit";
    var aEl = doc.createElement("a");
    aEl.href = censor.getElementsByTagName("a")[0].href.replace(/censor/, "edit");
    aEl.style.color = "rgb(222, 106, 20)";
    aEl.className = "small";
    aEl.appendChild(bEl);
    clone.replaceChild(aEl, clone.getElementsByTagName("a")[0]);
    comment.appendChild(clone);
    comment.appendChild(censor);
}