// ==UserScript==
// @name           RT - Add Username to Page Titles
// @namespace      rtrcpt@kwierso.com
// @description    Adds username to the document title on comment pages
// @include        http://roosterteeth.com/members/comments/index.php?uid=*
// @include        http://*.roosterteeth.com/members/comments/index.php?uid=*
// @include        http://strangerhood.com/members/comments/index.php?uid=*
// @include        http://achievementhunter.com/members/comments/index.php?uid=*
// @include        http://redvsblue.com/members/comments/index.php?uid=*
// @include        http://roosterteethcomics.com/members/comments/index.php?uid=*
// @include        http://roosterteeth.com/members/journal/index.php?uid=*
// @include        http://*.roosterteeth.com/members/journal/index.php?uid=*
// @include        http://strangerhood.com/members/journal/index.php?uid=*
// @include        http://achievementhunter.com/members/journal/index.php?uid=*
// @include        http://redvsblue.com/members/journal/index.php?uid=*
// @include        http://roosterteethcomics.com/members/journal/index.php?uid=*
// @include        http://roosterteeth.com/members/comments/?uid=*
// @include        http://*.roosterteeth.com/members/comments/?uid=*
// @include        http://strangerhood.com/members/comments/?uid=*
// @include        http://achievementhunter.com/members/comments/?uid=*
// @include        http://redvsblue.com/members/comments/?uid=*
// @include        http://roosterteethcomics.com/members/comments/?uid=*
// @include        http://roosterteeth.com/members/journal/?uid=*
// @include        http://*.roosterteeth.com/members/journal/?uid=*
// @include        http://strangerhood.com/members/journal/?uid=*
// @include        http://achievementhunter.com/members/journal/?uid=*
// @include        http://redvsblue.com/members/journal/?uid=*
// @include        http://roosterteethcomics.com/members/journal/?uid=*
// ==/UserScript==

(function() {
    var theCrumb = new Array();
    var allTD = document.getElementsByTagName("td");
    for(i in allTD) {
        if(allTD[i].className == "crumbTd") {
            theCrumb = allTD[i];
            break;
        }
    }
    if(document.URL.match("comments"))
        document.title = document.title.replace("User", theCrumb.getElementsByTagName("b")[0].innerHTML +"'s");
    else if(document.URL.match("journal"))
        document.title = document.title.replace("Journal", theCrumb.getElementsByTagName("b")[0].innerHTML +"'s Journal");
})();