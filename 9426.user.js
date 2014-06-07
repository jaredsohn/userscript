// ==UserScript==
// @name           Google search result cleaner
// @namespace      google
// @description    google search result cleaner
// @include        http://www.google.*
// ==/UserScript==

(function() {
gm_google_search_cleaner = function() {
    this.init();
}
gm_google_search_cleaner.prototype = {
    links:null,
    visitedColor:"",
    nbVisitedLinks: 0,
    init: function() {
        // get visited color ( http://linuxfr.org/comments/834721.html#834721 )
        var link = document.body.appendChild(document.createElement('a'));
        link.href = document.location;
        this.visitedColor = document.defaultView.getComputedStyle(link, null).getPropertyValue("color").toString();
        document.body.removeChild(link);
        // get all results links
        var res = document.getElementById("res");
        if(!res) {
            return;
        }
        this.links = new Array();
        this.visitedLinks = new Array();
        var links = res.getElementsByTagName("a");
        for(var i = 0; i < links.length; i++) {
            var link = links[i];
            if(link.className != 'l') {
                continue;
            }
            this.links.push(link);
        }
        // update
        this.updatePage();
    },
    updatePage: function() {
        // for each result link, see if visited or not, an hide if visited
        this.links.forEach(function(link) {
                if(link.parentNode.parentNode.style.display == 'none') {
                    return;
                }
                if(document.defaultView.getComputedStyle(link, null).getPropertyValue("color").toString() == this.visitedColor) {
                    link.parentNode.parentNode.style.display = 'none';
                    this.nbVisitedLinks++;
                }
            }, this);
        var me = this;
        var timeout = setTimeout(function() {
                me.updatePage();
            }, 1000);

        // if all links visited, go to next page
        if(this.links.length != this.nbVisitedLinks) {
            return;
        }
        clearTimeout(timeout);
        var nextPage = document.getElementById('nn');
        if(!nextPage) {
            return;
        }
        nextPage = nextPage.parentNode;
        if(!nextPage) {
            return;
        }
        document.location = nextPage.href;
    }
}
var gmGoogleSearchCleaner = new gm_google_search_cleaner();
})();
