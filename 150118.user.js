// ==UserScript==
// @name        Go to jobs.bg last page
// @namespace   jobsBgLastPage
// @description This user script can be usefull when  you have made a search in http://www.jobs.bg page and from result page want to go to last page of pagination. It created a button with text "Go to last page." When user clicks on this button, script follows pagination and goes to the last page. Click on link around to next page (avoid following page one by one, because this will be slower). 
// @include     http://www.jobs.bg/front_job_search.php*
// @include     https://www.jobs.bg/front_job_search.php*
// @grant       GM_getValue
// @grant       GM_setValue
// @run-at document-end
// @version     1
// @author Georgi Naumov gonaumov@gmail.com 
// ==/UserScript==
(function () {
    var linkToNext = document.evaluate('//a[@class="pathlink" and contains(.,">>") and contains(@href,"#paging")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    
    if (GM_getValue('goToLastPageOfPagination', false) == true && linkToNext.singleNodeValue != null) {
        var biggerNumberLink = document.evaluate('//a[@class="pathlink" and not(contains(.,">>")) and contains(@href,"#paging")][last()]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        
        if (biggerNumberLink.singleNodeValue != null) {
            var event = document.createEvent("MouseEvents");
            event.initEvent("click", true, true);
            biggerNumberLink.singleNodeValue.dispatchEvent(event);
        } else {
            GM_setValue('goToLastPageOfPagination', false);
        }
    }
    else if(linkToNext.singleNodeValue == null) {
        GM_setValue('goToLastPageOfPagination', false);
    }
    else {
        var changeSearchLink = document.evaluate('//a[descendant::nobr[.="Промени Търсенето"]]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        
        if (changeSearchLink.singleNodeValue != null) {
            var newButton = document.createElement("INPUT");
                newButton.setAttribute("type", "button");
                newButton.setAttribute("value", "Go to last page.");
                newButton.addEventListener("click", function() {
                    GM_setValue('goToLastPageOfPagination', true);
                    window.location.reload(true);
                }, false);
                
            changeSearchLink.singleNodeValue.parentNode.parentNode.appendChild(newButton);
        }
    }
})();