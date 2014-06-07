// ==UserScript==
// @name           Mod History Retitle
// @namespace      modhistoryretitle@kwierso.com
// @description    Retitles Mod History Pages according to what's being shown
// @include        http*://roosterteeth.com/members/modHistoryView.php?*
// @include        http*://strangerhood.com/members/modHistoryView.php?*
// @include        http*://roosterteethcomics.com/members/modHistoryView.php?*
// @include        http*://achievementhunter.com/members/modHistoryView.php?*
// @include        http*://redvsblue.com/members/modHistoryView.php?*
// @include        http*://*.roosterteeth.com/members/modHistoryView.php?*
// ==/UserScript==

(function(){
    var lastCrumb;
    var allEls = document.getElementsByTagName("a");

    for(i in allEls) {
        if(allEls[i].className == "crumbLink crumbLinkLast") {
            lastCrumb = allEls[i].getElementsByTagName("b")[0];
            break;
        }
    }

    var historyType = document.URL.split("?a=")[1].split("&")[0];
    switch(historyType) {
        case "imageComments":
            lastCrumb.innerHTML = "Image Comment";
            document.title = document.title.replace("Mod History", "Mod History - " + lastCrumb.innerHTML);
            break;
        case "journal":
            lastCrumb.innerHTML = "Journal Entry";
            document.title = document.title.replace("Mod History", "Mod History - " + lastCrumb.innerHTML);
            break;
        case "forumPosts":
            lastCrumb.innerHTML = "Forum Post";
            document.title = document.title.replace("Mod History", "Mod History - " + lastCrumb.innerHTML);
            break;
        case "journalComments":
            lastCrumb.innerHTML = "Journal Comment";
            document.title = document.title.replace("Mod History", "Mod History - " + lastCrumb.innerHTML);
            break;
        case "groupPosts":
            lastCrumb.innerHTML = "Group Forum Post";
            document.title = document.title.replace("Mod History", "Mod History - " + lastCrumb.innerHTML);
            break;
        case "userComments":
            lastCrumb.innerHTML = "User Comment";
            document.title = document.title.replace("Mod History", "Mod History - " + lastCrumb.innerHTML);
            break;
        case "images":
            lastCrumb.innerHTML = "Image";
            document.title = document.title.replace("Mod History", "Mod History - " + lastCrumb.innerHTML);
            break;
        case "groupNewsComments":
            lastCrumb.innerHTML = "Group News Comment";
            document.title = document.title.replace("Mod History", "Mod History - " + lastCrumb.innerHTML);
            break;
        case "groupImageComments":
            lastCrumb.innerHTML = "Group Image Comment";
            document.title = document.title.replace("Mod History", "Mod History - " + lastCrumb.innerHTML);
            break;
        case "newsComments":
            lastCrumb.innerHTML = "News Comment";
            document.title = document.title.replace("Mod History", "Mod History - " + lastCrumb.innerHTML);
            break;
        case "archiveComments":
            lastCrumb.innerHTML = "Video Comment";
            document.title = document.title.replace("Mod History", "Mod History - " + lastCrumb.innerHTML);
            break;
        default:
            console.log("Mod History Retitle is not set up to handle '" + historyType + "' elements. Please report this type to KWierso.");
    }
})();

