// ==UserScript==
// @name           CivForum.de Extended
// @autor          Masqurin
// @namespace      http://www.civforum.de/member.php?u=13778
// @date           2009-10-30
// @version        v1.02
// @source         http://userscripts.org/scripts/show/58026
// @description    Erweitert die Moeglichkeiten des CivForum.de
// @include        http://*civforum.de/showthread.php*
// @include        http://*civforum.de/forumdisplay.php*
// @include        http://*civforum.de/newreply.php*
// @include        http://*civforum.de/newthread.php*
// @include        http://*civforum.de/editpost.php*
// ==/UserScript==

if(document.URL.indexOf("showthread") != -1)
{
    BottomNavigation(1);
}
else if(document.URL.indexOf("forumdisplay") != -1)
{
    BottomNavigation(2);
}
else if(document.URL.indexOf("newthread") != -1 || document.URL.indexOf("newreply") != -1 || document.URL.indexOf("editpost"))
{
    document.addEventListener("focus", function() { Attachments() }, false);
}


function BottomNavigation(option)
{
    var CivNav = document.evaluate("//span[contains(@class, 'navbar')]", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    var TmpNav = CivNav.iterateNext();
    if(!TmpNav) { return; }
    var AddNav = "\n<!-- CivForum.de Extended Navigation -->\n<br />\n<table class=\"tborder\" cellpadding=\"6\" cellspacing=\"1\" border=\"0\" width=\"100%\" align=\"center\">\n <tr>\n <td class=\"alt1\" colspan=\"2\">\n";
    while(TmpNav)
    {
        AddNav += "   <span class=\"navbar\">" + TmpNav.innerHTML + "</span>\n";
        TmpNav  = CivNav.iterateNext();
    }
    AddNav += "  </td>\n </tr>\n</table>\n<!-- / CivForum.de Extended Navigation -->\n";
    if(option == 1)
    {
        var Space = document.evaluate("//div[contains(@class, 'smallfont')][contains(@align, 'center')]/a[contains(@rel, 'nofollow')]", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
        TmpNav    = Space.iterateNext();
        if(!TmpNav) { return; }
        CivNav           = TmpNav.parentNode;
        var ExtNav       = document.createElement('div');
        ExtNav.innerHTML = AddNav;
        CivNav.appendChild(ExtNav);
    }
    else if(option == 2)
    {
        var Space  = document.evaluate("//table[contains(@style, 'margin-top')]", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
        TmpNav     = Space.iterateNext();
        if(!TmpNav) { return; }
        CivNav           = TmpNav.parentNode;
        var ExtNav       = document.createElement('div');
        ExtNav.innerHTML = AddNav;
        CivNav.appendChild(ExtNav);
    }
}

function Attachments()
{
    var AttID, CivAtt2, Check, TmpAtt2;
    var count   = 0;
    var CivAtt1 = document.evaluate("//div[contains(@id, 'attachlist')]/div/div//a[@href]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var TmpAtt1 = CivAtt1.snapshotItem(count);
    while(TmpAtt1)
    {
        CivAtt2 = document.evaluate("//div[contains(@id, 'attachlist')]/div/div", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        TmpAtt2 = CivAtt2.snapshotItem(count);
        AttID   = TmpAtt1.href;
        if(AttID.length > 75)
        {
            AttID   = AttID.substring(51,57);
        }
        else
        {
            AttID   = AttID.substring(47,53);
        }
        switch(count)
        {
            case 0: var AttButton0 = CreateButton(1, AttID);
                    AttButton0.addEventListener("click", function() { InsertBBCode(1, AttButton0.id) }, false);
                    var AttButton1 = CreateButton(2, AttID);
                    AttButton1.addEventListener("click", function() { InsertBBCode(2, AttButton1.id) }, false);
                    break;
            case 1: var AttButton2 = CreateButton(1, AttID);
                    AttButton2.addEventListener("click", function() { InsertBBCode(1, AttButton2.id) }, false);
                    var AttButton3 = CreateButton(2, AttID);
                    AttButton3.addEventListener("click", function() { InsertBBCode(2, AttButton3.id) }, false);
                    break;
            case 2: var AttButton4 = CreateButton(1, AttID);
                    AttButton4.addEventListener("click", function() { InsertBBCode(1, AttButton4.id) }, false);
                    var AttButton5 = CreateButton(2, AttID);
                    AttButton5.addEventListener("click", function() { InsertBBCode(2, AttButton5.id) }, false);
                    break;
            case 3: var AttButton6 = CreateButton(1, AttID);
                    AttButton6.addEventListener("click", function() { InsertBBCode(1, AttButton6.id) }, false);
                    var AttButton7 = CreateButton(2, AttID);
                    AttButton7.addEventListener("click", function() { InsertBBCode(2, AttButton7.id) }, false);
                    break;
            case 4: var AttButton8 = CreateButton(1, AttID);
                    AttButton8.addEventListener("click", function() { InsertBBCode(1, AttButton8.id) }, false);
                    var AttButton9 = CreateButton(2, AttID);
                    AttButton9.addEventListener("click", function() { InsertBBCode(2, AttButton9.id) }, false);
                    break;
        }
        Check = TmpAtt2.innerHTML;
        if(!Check.match("Attachment-ID"))
        {
            TmpAtt2.innerHTML = TmpAtt2.innerHTML + "<span> (Attachment-ID: " + AttID + ")</span> ";
            switch(count)
            {
                case 0: TmpAtt2.appendChild(AttButton0);
                        TmpAtt2.appendChild(AttButton1);
                        break;
                case 1: TmpAtt2.appendChild(AttButton2);
                        TmpAtt2.appendChild(AttButton3);
                        break;
                case 2: TmpAtt2.appendChild(AttButton4);
                        TmpAtt2.appendChild(AttButton5);
                        break;
                case 3: TmpAtt2.appendChild(AttButton6);
                        TmpAtt2.appendChild(AttButton7);
                        break;
                case 4: TmpAtt2.appendChild(AttButton8);
                        TmpAtt2.appendChild(AttButton9);
                        break;
            }
        }
        count++;
        TmpAtt1 = CivAtt1.snapshotItem(count);
    }
}

function CreateButton(setting, AttID)
{
    var AttButton;
    if(setting == 1)
    {
        AttButton                  = document.createElement("input");
        AttButton.id               = AttID;
        AttButton.type             = "Button";
        AttButton.value            = "Einfügen";
        AttButton.title            = "Klicken um [ATT2]" + AttID + "[/ATT2] einzufügen";
        AttButton.style.fontWeight = "normal";
        AttButton.style.fontSize   = "11px";
        AttButton.style.fontFamily = "verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif";
    }
    else if(setting == 2)
    {
        AttButton                  = document.createElement("input");
        AttButton.id               = AttID;
        AttButton.type             = "Button";
        AttButton.value            = "Zentriert";
        AttButton.title            = "Klicken um [CENTER][ATT2]" + AttID + "[/ATT2][/CENTER] einzufügen";
        AttButton.style.fontWeight = "normal";
        AttButton.style.fontSize   = "11px";
        AttButton.style.fontFamily = "verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif";
    }
    return AttButton;
}

function InsertBBCode(setting, AttID)
{
    var Insert;
    var TextArea = document.getElementById("vB_Editor_001_textarea");
    var startPos = TextArea.selectionStart;
    var endPos   = TextArea.selectionEnd;
    switch(setting)
    {
        case 1: Insert = "[ATT2]" + AttID + "[/ATT2]\n"; break;
        case 2: Insert = "[CENTER][ATT2]" + AttID + "[/ATT2][/CENTER]\n"; break;
    }
    TextArea.value = TextArea.value.substring(0, startPos) + Insert + TextArea.value.substring(endPos, TextArea.value.length);
}