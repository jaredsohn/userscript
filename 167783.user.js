// ==UserScript==
// @name        Outlook.com - Visible Shortcuts
// @namespace   discon-ns/
// @include     https://*.mail.live.com/*
// @version     1
// @grant none
// ==/UserScript==
function go(id, tt, color)
{
    var el = document.querySelector("#" + id);
    if (!el) return;
    el.innerHTML = tt
        .replace("[", '<span style="color:' + color + '">')
        .replace("]", "</span>");
}
go("NewMessage", "[N]ew", "#F0F");
go("Reply", "[R]eply", "#0F0");
go("DeleteMessages", "[Del]ete", "#F00");
go("Archive", "Archiv[e]", "#F80");
go("MarkAsJunk", "[J]unk", "#F00");
go("MoveTo", "Mo[v]e to", "#F80");
go("Categorize", "[C]ategories", "#F80");
go("MarkAsUnread", "Mark [u]nread", "#F80");
go("MarkAsRead", "Mark read [Q]", "#F80");
go("MarkAsFlagged", "Flag [Ins]", "#F80");
go("MarkAsUnflagged", "Unflag [Ins]", "#F80");
