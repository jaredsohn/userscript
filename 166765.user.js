// ==UserScript==
// @id             highlightNewPost
// @name           Highlight new posts for Baidu Tieba
// @version        1.0
// @namespace      simon
// @author         Simon Chan
// @description    Help you focus on new posts.
// @include        http://tieba.baidu.com/f*
// @run-at         document-end
// ==/UserScript==

var list = localStorage.getItem("highlightNewPostList");
list = list ? JSON.parse(list) : {};

var css = ".highlightNewPost_old { opacity: .5 !important; }";
GM_addStyle(css);

function findOldPosts() {
    var posts = document.getElementsByClassName("j_thread_list");
    for (var i = 0, post; post = posts[i++];) {
        var data = JSON.parse(post.getAttribute("data-field"));
        if (data["id"] in list && list[data["id"]] == data["reply_num"])
            post.classList.add("highlightNewPost_old");
        else
            list[data["id"]] = data["reply_num"];
    }
    localStorage.setItem("highlightNewPostList", JSON.stringify(list));
}
findOldPosts();

var listContainer = document.getElementById("content_leftList");
new MutationObserver(findOldPosts).observe(listContainer, { childList: true });
listContainer.addEventListener("click", function (e) {
    if (e.target.nodeType == document.ELEMENT_NODE &&
        e.target.tagName == "A" &&
        e.target.className == "j_th_tit") {
        var li = e.target.parentNode.parentNode.parentNode.parentNode;
        if (!li.classList.contains("highlightNewPost_old"))
            li.classList.add("highlightNewPost_old");
    }
});