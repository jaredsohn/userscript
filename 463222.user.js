// ==UserScript==
// @name           TF2 Outpost Bump All
// @namespace      elvissteinjr
// @description    Simple script adding a button to add all trades at once. Button only appears if there is a bumpable trade.
// @include        *tf2outpost.com/trades
// ==/UserScript==

if (document.getElementsByClassName("icon_bump").length > 0)
{
    document.getElementById("modules").innerHTML = '<div align="right"><input style="background-attachment: scroll; background-clip: border-box; background-color: transparent; background-image: linear-gradient(to bottom, #EA960A, #CD620B); background-origin: padding-box; background-position: 0% 0%; background-repeat: repeat; background-size: auto; border-bottom-color: currentColor; border-bottom-left-radius: 6px; border-bottom-right-radius: 6px; border-bottom-style: none; border-bottom-width: medium; border-left-color: transparent; border-left-style: solid; border-left-width: 2px; border-right-color: transparent; border-right-style: solid; border-right-width: 2px; border-top-color: #F6A827; border-top-left-radius: 6px; border-top-right-radius: 6px; border-top-style: solid; border-top-width: 1px; display: inline-block; font-size: 10.5pt; font-weight: 700; min-width: 114px; padding-bottom: 11px; padding-left: 12px; padding-right: 12px; padding-top: 11px; text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.400); color: #FFFFFF; padding: 5px; margin: 5px; margin-top: 0px;" class="subm" type="button" name="submit" value="Bump all trades" onclick="javascript:$(\'.trade_bump\').click();this.style = \'display: none\';"></div>' + document.getElementById("modules").innerHTML;
}
