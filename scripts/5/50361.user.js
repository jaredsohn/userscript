// ==UserScript==
// @name           Group Images Reverser
// @namespace      gir@kwierso.com
// @description    Reverse the images in the groups!
// @include        http://*roosterteeth.com/groups/images/?id=*
// ==/UserScript==

(function() {
    var pageContent = document.getElementById("pageContent");
    pageContent = pageContent.getElementsByTagName("table")[0]
                             .getElementsByTagName("tbody")[0]
                             .getElementsByTagName("tr")[0]
                             .getElementsByTagName("td")[0]
                             .getElementsByTagName("div")[0]
                             .getElementsByTagName("table")[0]
                             .getElementsByTagName("tbody")[0]
                             .getElementsByTagName("tr")[0]
                             .getElementsByTagName("td")[0]
                             .getElementsByTagName("table")[0]
                             .getElementsByTagName("tbody")[0];

    var trs = [];
    var tds = [];

    for(i in pageContent.childNodes) {
        trs.push(pageContent.childNodes[i]);
    }

    for(i in trs) {
        for(j in trs[i].childNodes) {
            if(trs[i].childNodes[j].childNodes.length > 0)
                tds.push(trs[i].childNodes[j].cloneNode(true));
        }
    }
    
    pageContent.innerHTML = "<tr>";
    var count = 0;

    for(i = tds.length - 1; i >= 0; i--) {
        if(count == 3) {
            pageContent.appendChild(document.createElement("tr"));
            count = 0;
        }
        
        pageContent.childNodes[pageContent.childNodes.length - 1].appendChild(tds[i]);
        count = count + 1;
    }
})();