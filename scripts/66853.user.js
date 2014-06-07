// ==UserScript==
// @name      BOFA
// @namespace http://bofa.amulder.modwest.com/bofa.user.js
// @description script to let you have nicknames for your Bank of America payees. Click "Create Nickname" to make a new one, or click an existing nickname to change it.
// @include *BPQuickPay.jsp*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==


function getkey(td0, td1)
{ // make the hashkey out of trimmed text from td0 and td1 (acct name and number)
    // var atext = td0.find("a").text().replace(/^\s+|\s+$/g,"");
    var atext = jQuery.trim(td0.find("a").text());
    td1b = td1.clone();
    td1b.find("div").remove(); // get rid of our stuff so we can find orig content that was on page
    // var acct = td1.text().replace(/^\s+|\s+$/g,"");    
    var acct = jQuery.trim(td1b.text());
    return atext + ' ' + acct;
}

$(document).ready(function() {
    // unsafeWindow.console.log("testing firebug after jq");    
    $("#fBPQuickPay table.borderDetail tr:gt(0)").each(function() {
        var td0 = $(this).find("td:eq(0).cellDetail");
        var td1 = $(this).find("td:eq(1).cellDetail");
        var hashkey = getkey(td0, td1);

        var nick = GM_getValue(hashkey, '');
        if(nick == '')
            nick = '<span style="color: blue;">create nickname</span>';

        td1.append("<div class='nickdiv'><a href='#' class='editnick'>" + nick + "</a></div>");
    }); 

    $("a.editnick").click(function() {
        var nickdiv = $(this).parent();
        nickdiv.append("<input class='editnick' type=text value='" + 
                       ($(this).text() != "create nickname" ? $(this).text() : "")+"'>");
        $(this).hide(); // hide the anchor with the click bound to it
        var input = nickdiv.children("input"); // .trigger('focus') throws exception w GM?
        input.bind('change', function() { 
            var nickdiv = $(this).parent();
            var newval = $(this).val();
            nickdiv.find("a.editnick").text(newval).show();
            var td1 = nickdiv.parent();
            var td0 = td1.prev();
            var hashkey = getkey(td0, td1);
            GM_setValue(hashkey, newval);
            $(this).remove();
        });
        return false;
    });
});