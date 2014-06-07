// ==UserScript==
// @name        mmmturkeybacon Add AutoAccept Checkbox to HIT Preview
// @author      mmmturkeybacon
// @description Adds AutoAccept Checkbox to a HIT Preview
// @namespace   http://userscripts.org/users/523367
// @match       https://*.mturk.com/mturk/preview?*
// @require     http://code.jquery.com/jquery-latest.min.js
// @downloadURL http://userscripts.org/scripts/source/293122.user.js
// @updateURL   http://userscripts.org/scripts/source/293122.meta.js
// @version     1.0
// @grant       none
// ==/UserScript==

    
$(document).ready(function()
{
    var is_preview = $('input[type="hidden"][name="isAccepted"][value="false"]').length > 0;
    if (is_preview)
    {
        $('td[nowrap=""][align="center"]:contains("Want to work on this HIT?")').each(function()
        {
            var $parent_table = $(this).parent().parent();
            $parent_table.append('<tr><td colspan="3"></td><td></td></tr>');
            $parent_table.append('<tr><td valign="bottom" nowrap="" height="26" align="center" colspan="3"><a style="display: block;" name="autoAcceptCheckboxWrapper"><input type="checkbox" onclick="javascript:toggleAllCheckboxes(this);" value="on" name="autoAcceptEnabled"></input>Automatically accept the next HIT</a></td></tr>');         
        });
    }
    
});
