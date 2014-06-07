// ==UserScript==
// @name          Tapuz forums - hiding obtrusive elements
// @namespace     http://www.tapuzon.co.il
// @description   Hide obtrusive elements from Tapuz forums page. Namely, the sidebar on the left and banner on page top.
// @include       http://www.tapuz.co.il/Forums2008/ForumPage.aspx?ForumId=*
// ==/UserScript==

function findAndHideDivByClass(classname) {
        var divCollection = document.getElementsByTagName("div");
        for (var i=0; i<divCollection.length; i++) {
            if(divCollection[i].getAttribute("class") == classname) {
                divCollection[i].style.display='none';
            } 
        }
    }

findAndHideDivByClass('sideBarForum');
document.getElementById('TopBannerDiv').style.display='none';