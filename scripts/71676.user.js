// ==UserScript==
// @name           Group Admin Forum Bonus
// @namespace      gafb@kwierso.com
// @description    Add the "Edit" button to forum posts!
// @include        http://roosterteeth.com/groups/forum/viewTopic.php?id=*
// @include        http://redvsblue.com/groups/forum/viewTopic.php?id=*
// @include        http://achievement.com/groups/forum/viewTopic.php?id=*
// @include        http://*.roosterteeth.com/groups/forum/viewTopic.php?id=*
// @include        http://roosterteethcomics.com/groups/forum/viewTopic.php?id=*
// @include        http://captaindynamic.com/groups/forum/viewTopic.php?id=*
// ==/UserScript==

(function() {
    var lotsoftd = document.getElementById("pageContent").getElementsByTagName("tr")[0]
                    .getElementsByTagName("tbody")[0].getElementsByTagName("td");

    var posts = getElementsByClass(lotsoftd, "comment");
    var altPosts = getElementsByClass(lotsoftd, "comment altComment");

    for(var i = 0; i < posts.length; i++) {
        var header = getElementsByClass(posts[i].getElementsByTagName("td"), "header")[1];
        var span = header.getElementsByTagName("div")[0].getElementsByTagName("span")[2].getElementsByTagName("span")[3];
        if(span) {
            if(span.getElementsByTagName("a")[0].innerHTML == "<b>Censor</b>") {
                var clone = span.cloneNode(true);
                var link = clone.getElementsByTagName("a")[0]
                link.href = link.href.replace("censor", "edit");
                link.removeAttribute("onclick");
                link.innerHTML = "<b>Edit</b>";
                span.parentNode.appendChild(clone);
            }
        }
    }

    for(var i = 0; i < altPosts.length; i++) {
        var header = getElementsByClass(altPosts[i].getElementsByTagName("td"), "header")[1];
        var span = header.getElementsByTagName("div")[0].getElementsByTagName("span")[2].getElementsByTagName("span")[3];
        if(span) {
            if(span.getElementsByTagName("a")[0].innerHTML == "<b>Censor</b>") {
                var clone = span.cloneNode(true);
                var link = clone.getElementsByTagName("a")[0]
                link.href = link.href.replace("censor", "edit");
                link.removeAttribute("onclick");
                link.innerHTML = "<b>Edit</b>";
                span.parentNode.appendChild(clone);
            }
        }
    }
})();

function getElementsByClass(elements, className) {
    var classElements = new Array();
    
    for(var i =0; i < elements.length; i++) {
        if(elements[i].className == className) {
            classElements.push(elements[i]);
        }
    }
    
    return classElements;
}
