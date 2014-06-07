// ==UserScript==
// @name		OSW SVN Ticket Link Creator
// @namespace	        http://www.one-stop-webshop.nl
// @version		0.4
// @description	        STLC creates links from SupportDesk ticket number and B-Leader ticket url.
// @match		http://svn.one-stop-webshop.nl:3000/issues*
// @match		http://svn.one-stop-webshop.nl:3000/projects/p*
// @copyright	        2013+, Daniel van der Mierden<daniel@one-stop-webshop.nl>
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
$(document).ready(function() {
    /* FEATURE 1 */
    // specific for issue page, for example http://svn.one-stop-webshop.nl:3000/issues/5867;
    // convert Support Desk ticket ID to form + clickable link
    var ticket = $("table.attributes th:contains('nummer')").next('td').html();
   
    // replace ondlbclick with onclick if you just want to click once.
    var h = "<form action='https://support.oswshop.nl/support/staff/index.php?/Tickets/Search/TicketID' method='post' target='_blank' id='fl' ondblclick='$(this).submit(); return false;'>" +
    		"<input type='text' name='query' value='"+ticket+"' style='background-color:transparent; border:0; margin:0; padding:0; color: #0071BC;'></form>";
    
    // actually replace ID with form.
    $("table.attributes th:contains('nummer')").next('td').html(h);

   	/* FEATURE 2 */ 
	// create clickable link from B-Leader url text
    $("td:contains('helpdesk.b-leader')").each(function() {
    	var u = $(this).html();
        var tu = "<a href='"+u+"' target='_blank'>"+u+"</a>";
        $(this).html(tu);
    })

    
    /* FEATURE 3 */
    // issue list; for example http://svn.one-stop-webshop.nl:3000/issues?query_id=134
    // convert Support Desk ticket ID to form + clickable link.
    $("td.cf_7").each(function() {
        var ticket = $(this).html();
        // replace ondlbclick with onclick if you just want to click once.
        var h = "<form action='https://support.oswshop.nl/support/staff/index.php?/Tickets/Search/TicketID' method='post' target='_blank' id='fl' ondblclick='$(this).submit(); return false;'>" +
    	"<input type='text' name='query' value='"+ticket+"' style='background-color:transparent; border:0; margin:0; padding:0; color: #0071BC;'></form>";
        // actually replace ID with form.
        $(this).html(h);
    })
})