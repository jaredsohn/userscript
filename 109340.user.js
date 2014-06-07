// ==UserScript==
// @name           pq_smilies_extended
// @namespace      quake.ingame.de
// @include        http://quake.ingame.de/forum/*
// ==/UserScript==


replaceSmilies = function() { 
    var smilies = {":uglydaumen:": "[img]http://i.imgur.com/vYcCK.gif[/img]",
                   ":nana:": "[IMG]http://i.imgur.com/NYpht.gif[/IMG]",
                   ":irre:": "[IMG]http://i.imgur.com/Cms8v.gif[/IMG]",
                   ":love:": "[IMG]http://i.imgur.com/kvKJF.gif[/IMG]",
                   ":maddaumen:": "[IMG]http://i.imgur.com/QgzJz.gif[/IMG]",
                   ":clap:": "[IMG]http://i.imgur.com/iKiVQ.gif[/IMG]",
                   ":uglyclap:": "[IMG]http://i.imgur.com/1fSMr.gif[/IMG]",
                   ":hm:": "[IMG]http://i.imgur.com/V2TbT.gif[/IMG]",
                   ":whine:": "[IMG]http://i.imgur.com/0Nd2c.png[/IMG]",
                   ":hail:": "[IMG]http://i.imgur.com/T7G3h.gif[/IMG]",
                   ":rose:": "[IMG]http://i.imgur.com/7FXVn.gif[/IMG]",
                   ":omg:": "[IMG]http://i.imgur.com/mrE75.gif[/IMG]",
                   ":madw00t:": "[IMG]http://i.imgur.com/ckT5a.png[/IMG]"}
    
    var QR = "vB_Editor_QR_textarea";
    var Q01 = "vB_Editor_001_textarea";
    
    if (document.getElementById(QR) != null)
    {
        var active = QR;
    } 
    else if (document.getElementById(Q01) != null)
    {
        var active = Q01;
    }

    for (var sm in smilies)
    {
        if(document.getElementById(active).value.match(new RegExp(sm)))
        {
            var scrollPos = document.getElementById(active).scrollTop;
            var caretPos = document.getElementById(active).selectionStart;

            document.getElementById(active).value = document.getElementById(active).value.replace(new RegExp(sm, "g"), smilies[sm]);

            document.getElementById(active).scrollTop = scrollPos;

            var caretPosStart = caretPos - sm.length;
            var caretPosEnd = caretPosStart + smilies[sm].length; 
            document.getElementById(active).setSelectionRange(caretPosEnd, caretPosEnd);
        }
    }
}


if(document.getElementById("vB_Editor_QR_textarea") != null || document.getElementById("vB_Editor_001_textarea") != null)
{
    window.setInterval(replaceSmilies, 250);
}
