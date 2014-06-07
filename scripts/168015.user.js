// ==UserScript==
// @name       JIRA: Autorefresh Issue List
// @namespace  http://www.dustinjsparks.com
// @version    0.1
// @description  This autorefreshes the issue list on jira.example.com/issues/?filter=-1. Also adds a quick-link to My Issues to the main navigation bar (saves a click to the dropdown).
// @match      *://jira.*
// @include    *://jira.*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
$(function() {
    var issueCount = document.querySelectorAll('.issuerow').length;
    var showNotification = false;
    
    function eventFire(el, etype)
    {
      if (el.fireEvent) {
        (el.fireEvent('on' + etype));
      } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
      }
    }
    
    function refreshTable()
    {
        var currentIssueCount = document.querySelectorAll('.issuerow').length;
        eventFire(document.querySelector('.refresh-table'), 'click');
        
        if( currentIssueCount != issueCount )
        {
            issueCount = currentIssueCount;
        }
    }
    
    setInterval(refreshTable, 15000);
	
    $($('.aui-dd-parent.lazy')[$('.aui-dd-parent.lazy').length-1]).after('<li class="aui-dd-parent lazy"><a class="lnk" href="/issues/?filter=-1" id="find_link" accesskey="f" title="View your current, open, issues.">My Open Issues</a></li>');
});


// @copyright  2012+, Pixelmixer
// ==/UserScript==