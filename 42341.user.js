// ==UserScript==
// @name           Recon Report It Link Automation
// @namespace      trey_allen@hotmail.com
// @include        http://*.roosterteeth.com/forum/viewTopic.php?id=2213737&*
// @include        http://*.roosterteeth.com/editMe.php?a=forumPosts&i=*&return=*2213737*
// @include        http://*.roosterteeth.com/forum/viewTopic.php?id=2220461&*
// @include        http://*.roosterteeth.com/editMe.php?a=forumPosts&i=*&return=*2220461*
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
        postBox.value += "[link=http://rvb.roosterteeth.com/members/profile.php?uid=415734]" +
                    "[img]http://img.photobucket.com/albums/v289/TreyAllen/th_JustReportItSmall.jpg[/img][/link]\n" +
                    "[color=grey][i](Click to PM the Mod)[/color][/i]\n"
        postBox.focus();
    }, false);
    button.className = "small";
    button.innerHTML = "<b>Report It!</b>";
    button.title = "Click Here to Paste the Report It! Links!";
    buttoncell.appendChild(button);
    buttoncell.appendChild(document.createTextNode(" ] "));
    postRow.insertBefore(buttoncell, postRow.childNodes[2]);
})();