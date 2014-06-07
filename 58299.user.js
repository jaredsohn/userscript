// ==UserScript==
// @name           LFTO And P&CE Link Automation
// @namespace      LFTOPCE@kwierso.com
// @include        http://roosterteethcomics.com/forum/viewTopic.php?id=2186795&*
// @include        http://roosterteethcomics.com/editMe.php?a=forumPosts&i=*&return=*2186795*
// @include        http://redvsblue.com/forum/viewTopic.php?id=2186795&*
// @include        http://redvsblue.com/editMe.php?a=forumPosts&i=*&return=*2186795*
// @include        http://*.roosterteeth.com/forum/viewTopic.php?id=2186795&*
// @include        http://*.roosterteeth.com/editMe.php?a=forumPosts&i=*&return=*2186795*
// @include        http://roosterteeth.com/forum/viewTopic.php?id=2186795&*
// @include        http://roosterteeth.com/editMe.php?a=forumPosts&i=*&return=*2186795*
// @include        http://achievementhunter.com/forum/viewTopic.php?id=2186795&*
// @include        http://achievementhunter.com/editMe.php?a=forumPosts&i=*&return=*2186795*

// @include        http://roosterteethcomics.com/forum/viewTopic.php?id=2214518&*
// @include        http://roosterteethcomics.com/editMe.php?a=forumPosts&i=*&return=*2214518*
// @include        http://redvsblue.com/forum/viewTopic.php?id=2214518&*
// @include        http://redvsblue.com/editMe.php?a=forumPosts&i=*&return=*2214518*
// @include        http://*.roosterteeth.com/forum/viewTopic.php?id=2214518&*
// @include        http://*.roosterteeth.com/editMe.php?a=forumPosts&i=*&return=*2214518*
// @include        http://roosterteeth.com/forum/viewTopic.php?id=2214518&*
// @include        http://roosterteeth.com/editMe.php?a=forumPosts&i=*&return=*2214518*
// @include        http://achievementhunter.com/forum/viewTopic.php?id=2214518&*
// @include        http://achievementhunter.com/editMe.php?a=forumPosts&i=*&return=*2214518*
// ==/UserScript==

(function() {
    try {
        var postRow = document.getElementById("Post").getElementsByTagName("tr")[1];
    } catch (e) {
        var postRow = document.getElementById("Edit Post").getElementsByTagName("tr")[1];
    }

    var postBox = document.getElementsByTagName("textarea")[0];
    var buttoncell = document.createElement("td");
    buttoncell.vAlign = "bottom";
    buttoncell.appendChild(document.createTextNode(" [ "));

    var button = document.createElement("a");
    if(document.URL.match("2214518") == "2214518") {
        //This is in the LFTO thread
        button.addEventListener("click", function () {
            postBox.value += "[link=/groups/forum/viewTopic.php?id=14588#t1][img]http://i605.photobucket.com/albums/tt138/Prophet_of_Food3/mybannerv4.png[/img][/link]\n\n";
            postBox.focus();
        }, false);

        button.className = "small";
        button.innerHTML = "<b>LFTO</b>";
        button.title = "Click Here to Paste LFTO Links!";
    } else {
        //Do the PCE Blog Link here
                button.addEventListener("click", function () {
            postBox.value += "Just as a reminder, all replies go in the " +
                             "[link=http://" + document.domain + "/forum/viewTopic.php?id=2186937]" +
                             "Blog Commentary Thread.[/link]\n\n";
            postBox.focus();
        }, false);

        button.className = "small";
        button.innerHTML = "<b>Post Link to Commentary Thread</b>";
        button.title = "Click Here to Paste the link to the Blog Commentary thread!";
    }
    buttoncell.appendChild(button);
    buttoncell.appendChild(document.createTextNode(" ] "));
    try {
        postRow.insertBefore(buttoncell, postRow.childNodes[2]);
    } catch(e) {
        getTitleElements(document.forms.namedItem("post").getElementsByTagName("table")[0]).appendChild(document.createTextNode(" - "));
        getTitleElements(document.forms.namedItem("post").getElementsByTagName("table")[0]).appendChild(button);
    }
})();

function getTitleElements(elem) {
    var allElems = elem.getElementsByTagName("td");
    var titleElem = [];
    for(i in allElems)
        if(allElems[i].className == "title")
            titleElem.push(allElems[i]);

    return titleElem[0];
}
