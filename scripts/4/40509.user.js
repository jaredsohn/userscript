// ==UserScript==
// @name           LFTO Link Automation
// @namespace      LFTO@kwierso.com
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
    button.addEventListener("click", function () {
        postBox.value += "[link=http://www.roosterteeth.com/members/journal/entry.php?id=2295026]" +
                    "[img]http://s922.photobucket.com/albums/ad62/KrazyNerd/ShiznoBanner480px.png[/img][/link]\n\n" +
                    "[link=http://www.roosterteeth.com/members/journal/entry.php?id=2174766]Read this.[/link]\n" +
                    "[link=http://www.roosterteeth.com/groups/profile.php?id=55]Then read this.[/link]\n\n" +
                    "[link=http://www.roosterteeth.com/groups/forum/viewTopic.php?id=4374]Off-topic chatter goes here![/link]\n\n";
        postBox.focus();
    }, false);

    button.className = "small";
    button.innerHTML = "<b>LFTO</b>";
    button.title = "Click Here to Paste LFTO Links!";
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
