// ==UserScript==
// @name       zhihu-reply-tip
// @namespace  https://github.com/QingYun/
// @version    0.1
// @description  显示被引用的用户的最近一条评论
// @match      http://www.zhihu.com/*
// @copyright  2012+, QingYun
// ==/UserScript==

var HIDE_STYLE = "display: none";

function hasClass(node, className) {
	return node && node.classList && node.classList.contains(className);
}

function createReplyTipNode() {
    var a = document.createElement("a");
    a.setAttribute("href", "#");
    a.setAttribute("class", "like zm-comment-op-link");
    
    var i = document.createElement("i");
    i.setAttribute("class", "zg-icon zg-icon-comment-reply");
    
    a.appendChild(i);
    a.appendChild(document.createTextNode("查看 TA 的最近一条评论"));
    
    return a;
}

function createQuoteBlockNode(content) {
	var bq = document.createElement("blockquote");
    bq.setAttribute("style", HIDE_STYLE);
    
    var p = document.createElement("p");
    p.appendChild(document.createTextNode(content));
    
    bq.appendChild(p);
    
    return bq;
}

function latestReply(commentItems, userLookingFor, endIndex) {
    for (var i = endIndex - 1; i >= 0 ; i--) {
        var curUser = commentItems[i].querySelector(".zg-link").textContent;
        if (curUser ==  userLookingFor) {
            return commentItems[i].querySelector(".zm-comment-content").textContent;
        }
    }
}

function addOneReplyTip(commentItems, targetIndex) {
    var curItem = commentItems[targetIndex];
    if (curItem.querySelector(".zm-comment-hd .like") !== null) 
        return ;
    
    var headNode = curItem.querySelector(".zm-comment-hd");
    if (headNode.childNodes.length > 3) {
        var referredUser;
        if (headNode.firstChild.nodeValue == "\n匿名用户")
            referredUser = headNode.querySelectorAll(".zg-link")[0];
        else
            referredUser = headNode.querySelectorAll(".zg-link")[1];
        
        if (referredUser) {
            var replyTip = createReplyTipNode();
            var referredReply = latestReply(commentItems, referredUser.textContent, targetIndex);
            var q = null;
            replyTip.addEventListener("click", function() {
                if (q === null) {
                    q = createQuoteBlockNode(referredReply);
                    var content = curItem.querySelector(".zm-comment-content");
                    content.parentNode.insertBefore(q, content);
                }
                
                if (q.getAttribute("style") == HIDE_STYLE)
                    q.removeAttribute("style");
                else
                    q.setAttribute("style", HIDE_STYLE);
            });
            
            curItem.querySelector(".zm-comment-hd").appendChild(replyTip);
        }
    }
}

function addReplyTips(commentList) {
    var commentItems = commentList.querySelectorAll(".zm-item-comment");
    for (var i = 0; i < commentItems.length; i++) {
        addOneReplyTip(commentItems, i);
    }
}

(function(){
    var addReplyTipTimer;
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type == "childList") {
                var firstAddedNode = mutation.addedNodes.length && mutation.addedNodes[0];
                var firstRemovedNode = mutation.removedNodes.length && mutation.removedNodes[0];
                
                if (hasClass(firstAddedNode, "zm-comment-box") && hasClass(firstRemovedNode, "zm-comment-box"))
                    addReplyTips(mutation.addedNodes[0].querySelector(".zm-comment-list"));
                else if (hasClass(firstAddedNode, "zm-item-comment")) {
                	if (addReplyTipTimer) clearTimeout(addReplyTipTimer);
                    addReplyTipTimer = setTimeout(function() {
                    	addReplyTips(mutation.target);
                    }, 100);
                }
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true
        , subtree: true
        , attributes: false
        , characterData: false
    });
})();