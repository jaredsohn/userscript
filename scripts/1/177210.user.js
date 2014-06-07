// ==UserScript==
// @name        AutoExpandNewComments_YahooBlog
// @grant       none
// @include     http://blog.yahoo.com/time_is_changing*
// ==/UserScript==

var button = document.createElement("a");
button.setAttribute("style", "position:absolute; top:130px");
button.innerHTML ="[自動處理](看更多回應)";
button.onclick = loadMoreComments;
document.getElementsByTagName("body")[0].appendChild(button);

var button2 = document.createElement("a");
button2.setAttribute("style", "position:absolute; top:150px");
button2.innerHTML ="(顯示全部回覆 共?則)";
button2.onclick = loadCloseReplys;
document.getElementsByTagName("body")[0].appendChild(button2);

var button3 = document.createElement("a");
button3.setAttribute("style", "position:absolute; top:170px");
button3.innerHTML ="(看更多回覆)";
button3.onclick = loadMoreReplies;
document.getElementsByTagName("body")[0].appendChild(button3);

var button4 = document.createElement("a");
button4.setAttribute("style", "position:absolute; top:190px");
button4.innerHTML ="(按[+])";
button4.onclick = openingPlus;
document.getElementsByTagName("body")[0].appendChild(button4);


var countComments = 0;
var countCloseReplys = 0;
var countMoreReplies = 0;

function loadMoreComments() {
    button.innerHTML ="[Loading more comments...("+countComments+")]";
    if(document.getElementsByClassName("action-load-more-comments")[0]) {
        countComments++;
        clickLink(document.getElementsByClassName("action-load-more-comments")[0]);
        setTimeout(loadMoreComments,800);
    } else {
        loadCloseReplys();
    }
}
function loadCloseReplys() {
    button.innerHTML ="[Loading closed replies...("+countCloseReplys+")]";
    if(document.getElementsByClassName("action-show-all-reply close")[0]) {
        countCloseReplys++;
        clickLink(document.getElementsByClassName("action-show-all-reply close")[0]);
        setTimeout(loadCloseReplys,800);
    } else {
        if(document.getElementsByClassName("action-show-all-reply loading")[0]) {
            setTimeout(loadCloseReplys,800);
        } else {
            setTimeout(loadMoreReplies,800);
        }
    }
}
function loadMoreReplies() {
    button.innerHTML ="[Opening more Replies...("+countMoreReplies+")]";
    if(document.getElementsByClassName("action-load-more-replies")[0]) {
        countMoreReplies++;
        clickLink(document.getElementsByClassName("action-load-more-replies")[0]);
        setTimeout(loadMoreReplies,800);
    } else {
        setTimeout(openingPlus,800);
    }
}
function openingPlus() {
    button.innerHTML ="[Opening [+]...]";
    var pluss = document.getElementsByClassName("ico default-ico action-expand-comment");
    for(var n=0;n<pluss.length;n++) {
        clickLink(pluss[n]);
    }
    button.innerHTML ="";
}

//############################# Click Event #############################
function mouseEvent(parent, type) {
    var evt = parent.ownerDocument.createEvent('MouseEvents');
    evt.initMouseEvent(type, true, true,parent.ownerDocument.defaultView, 1, 0, 0, 0, 0, false, false, false,false, 0, null);
    return parent.dispatchEvent(evt);
}
function click(parent) {
    return mouseEvent(parent, 'click');
}
function clickLink(target) {
    var notCanceled = click(target);
    if(target.tagName=="A" && notCanceled) window.location.href = target.href;
}
//########################################################################