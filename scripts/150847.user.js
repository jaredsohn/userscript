// ==UserScript==
// @name       Jira updated ticket highlighter
// @namespace  http://www.paperg.com/
// @version    1.0
// @description  A user js script for enhancing Atlassian Jira's ticket displays, requires that both the "updated" and "last viewed" columns be available in the ticket display.
// @match      *paperg.atlassian.net/secure/IssueNavigator.jspa*
// @copyright  2012+, Andrew Gu
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// ==/UserScript==

/*

HOTKEYS

CTRL+L to show/hide the last viewed column
CTRL+U to toggle highlighting for tickets that you've never touched

*/


(function () {
    var lastViewHidden = false;
    var highlightUntouchedTickets = true;
    
    function toggleLastViewedColumn(){
        if (lastViewHidden) {
            $("table#issuetable th.headerrow-lastViewed").show();
            $("table#issuetable td.lastViewed").show();
        }
        else {
            $("table#issuetable th.headerrow-lastViewed").hide();
            $("table#issuetable td.lastViewed").hide();
        }
        
        lastViewHidden = !lastViewHidden;
    }
    
    function checkCtrlKey(ev, key_str) {
        return (ev.which == key_str.toLowerCase().charCodeAt(0) || ev.which == key_str.toUpperCase().charCodeAt(0)) && ev.ctrlKey;
    };
    
    function bindHotkeys() {
        $(window).keydown(function(evnt){
            // CTRL+L to hide/show last viewed column.
            if (checkCtrlKey(evnt, 'l'))
            {
                evnt.preventDefault();
                toggleLastViewedColumn();
                return false;
            }
            // CTRL+U to toggle highlighting of never-touched tickets.
            else if (checkCtrlKey(evnt, 'u'))
            {
                evnt.preventDefault();
                highlightUntouchedTickets = !highlightUntouchedTickets;
                checkTickets();
                return false;
            }
        });
    };
    
    function checkTickets() {
        $("table#issuetable tr.issuerow").each(function(index, elem) {
            var updateTime = $("td.updated > span > time", elem).attr("datetime");
            var viewedTime = $("td.lastViewed > span > time", elem).attr("datetime");
            
            // Check if both are validly returned values
            if (!!updateTime && !!viewedTime 
                && updateTime > viewedTime) 
            {
                $(elem).css("font-weight", "bold");
            }
            else if (!viewedTime && highlightUntouchedTickets)
            {
                //$j(elem).css("font-style", "italic");
                $(elem).css("font-weight", "bold");
            }
            else
            {
                $(elem).css("font-weight", "normal");
            }
        });
    };
    
    $(document).ready(function(){
        toggleLastViewedColumn();
        checkTickets();
        bindHotkeys();
    });
})();