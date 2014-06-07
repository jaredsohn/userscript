// ==UserScript==
// @name           Shoutbox for all
// @namespace      http://www.milestails.com
// @description    Shows a shoutbox on all TSR pages except those with shoutboxes already (Chat, Backroom and Lounge).
// @include        http://www.thestudentroom.co.uk/*
// @exclude       http://www.thestudentroom.co.uk/forumdisplay.php?f=91
// @exclude       http://www.thestudentroom.co.uk/forumdisplay.php?f=143
// @exclude       http://www.thestudentroom.co.uk/forumdisplay.php?f=33
// @exclude       http://www.thestudentroom.co.uk/wiki/*
// ==/UserScript==
// Created by MilesTails

var shoutbox = document.createElement("div");
shoutbox.innerHTML = '<script type="text/javascript" src="http://static.thestudentroom.co.uk/clientscript/vbulletin_shoutbox.js"></script> '+
'<table cellpadding="0" cellspacing="0" border="0" width="100%"> '+
    '<thead> '+
        '<tr>'+ 
            '<td class="bar" style="width: 95%"> '+
                '<div class="bar_corner_left">&nbsp;</div> '+
                '<span class="whitetext_bold">Shoutbox</span> '+
            '</td> '+
            '<td class="bar" style="width: 5%"> '+
                '<div class="bar_corner_right">&nbsp;</div> '+
                '<a style="float:right" href="#top" onclick="return toggle_collapse(\'pigshoutbox\')"><img id="collapseimg_pigshoutbox" src="http://static.thestudentroom.co.uk/newlayout/images/misc/red/widget_buttons/collapse_tcat.gif" alt="" border="0" /></a> '+
            '</td> '+
        '</tr> '+
        '<tr> '+
            '<td class="grey_bar" colspan="2" align="center"> '+
                '<a href="../arcade.php">Arcade</a>&nbsp;|&nbsp;'+
                '<a href="../colour.php">Username Colour</a>&nbsp;|&nbsp;'+
                '<a href="../buddies.php">Buddy Spy</a> '+
            '</td> '+
        '</tr> '+
    '</thead> '+
    '<tbody id="collapseobj_pigshoutbox" style=""> '+
        '<tr>'+ 
            '<td colspan="2" valign="top"> '+
                '<div class="spacer5">&nbsp;</div> '+
                '<div style="width: 100%;"> '+
                    '<iframe src="shoutbox.php?do=online" width="100%" height="34" scrolling="auto" frameborder="0" name="onlineshoutbox" id="onlineshoutbox" style="border: solid 1px #CCCCCC; border-collapse: collapse;"></iframe> '+
                '</div> '+
                '<div class="spacer5">&nbsp;</div> '+
                '<div style="width: 100%;"> '+
                    '<iframe src="shoutbox.php?do=frame" width="100%" height="250" scrolling="auto" frameborder="0" name="pigshoutbox" id="pigshoutbox" style="border: solid 1px #CCCCCC; border-collapse: collapse;"></iframe> '+
                '</div> '+
            '</td> '+
        '</tr> '+
         '<tr> '+
            '<td colspan="2"> '+
                '<!-- div class="shout_grey_outer" --> '+
                    '<!-- Shout grey box --> '+
                    '<div class="shout_grey_top clear"> '+
                        '<form target="pigshoutbox" action="shoutbox.php" method="post" name="shoutbox" onsubmit="return doFormStuff();"> '+
                            '<input type="hidden" name="do" value="shout" /> '+
                            '<input type="hidden" name="altmessage" value="" /> '+
                            '<div class="shout_grey_bar_empty">&nbsp;</div> '+
                            '<a href="#" onclick="window.open(\'sbox.php?do=smilies&amp;elem=1\',\'sbox\'); return false"> '+
                            '<img src="http://static.thestudentroom.co.uk/newlayout/images/misc/icon10.gif" alt="" border="0" /></a> '+
                            '<input name="message" size="60" class="bginput" /> '+
                            '<input type="image" src="http://static.thestudentroom.co.uk/newlayout/images/buttons/shout.gif" name="submit" value="Shout!" class="bginput" accesskey="s" /> '+
                            '<div style="position: absolute; right: 10px; bottom: 10px;"> '+
                            '<a href="shoutbox.php?do=old" target="pigshoutbox">old shouts</a> '+
                            '</div> '+
                          '</form> '+
                    '</div> '+ 
                    '<!-- Whisper grey box--> '+
                    '<div class="shout_grey_bottom clear"> '+
                        '<form target="pigshoutbox" action="shoutbox.php" method="post" name="shoutbox2" onsubmit="return doFormStuff2();"> '+
                            '<input type="hidden" name="do" value="whisper" /> '+
                            '<input type="hidden" name="altwhisper" /> '+
                            '<div class="shout_grey_bar_corner_left">&nbsp;</div> '+
                            '<div class="shout_grey_bar_corner_right">&nbsp;</div> '+
                            '<div class="shout_grey_bar_content"> '+
                               '<a href="#" onclick="window.open(\'sbox.php?do=smilies&amp;elem=2\',\'sbox\'); return false"> '+
                               '<img src="http://static.thestudentroom.co.uk/images/smilies/smile.gif" alt="" border="0" /></a> '+
                               '<input name="whisper" size="60" class="bginput whisper_input" /> '+
                                'Username:<input name="target" size="25" class="bginput whisper_input" /> '+
                                '<input type="image" align="bottom" src="http://static.thestudentroom.co.uk/newlayout/images/buttons/whisper.gif" name="submit" value="Whisper!" class="bginput whisper_input" /> '+
                            '</div>'+ 
                        '</form> '+
                    '</div> '+
                '<!-- /div --> '+
            '</td> '+
        '</tr>'+ 
    '</tbody> '+
'</table>';


navbar = document.getElementById('pagenav_menu');
if (navbar) {
    navbar.parentNode.insertBefore(shoutbox, navbar.nextSibling);
}
