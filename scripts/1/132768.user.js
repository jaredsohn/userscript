// ==UserScript==
// @name           J-STAGE SEARCH by Enter
// @namespace      autocapitalism
// @include        https://www.jstage.jst.go.jp/*
// @include        http://www.jstage.jst.go.jp/*
// ==/UserScript==
(function() {

    var tabs = new Array("//div[@id='search-tab1']/", "//div[@id='search-tab2']/",
            "//div[@id='search-tab3']/", "//div[@id='search-tab4']/");
    
    for (i = 0; i < tabs.length; i++) {
        var tab = tabs[i];
        var searchInput = document.evaluate(tab +"input[@class='searchfield']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        
        searchInput.addEventListener('keypress', function(event){
                if(event.keyCode == 13) {
                    var pos = "//div[@id='" +this.parentNode.id.toString() +"']/";
                    if (tabs[3] != pos){
                        var button = document.evaluate(pos +"input[@class='searchbutton Search']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                    } else {
                        var button = document.evaluate(pos +"input[@class='searchbutton GO']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                    }
                    var e = document.createEvent('MouseEvents');
                    e.initEvent('click', true, false);
                    button.dispatchEvent(e);
                }
            }, true);
    }

})();