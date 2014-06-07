// ==UserScript==
// @name        mmmturkeybacon Checkpoint Creator
// @author      mmmturkeybacon
// @description Adds checkboxes next to HIT links so that you can set a checkpoint.
//              A checkpoint will notify you that you've already seen a HIT by
//              changing the HIT link to display the date the checkpoint was set. A
//              well-placed checkpoint is useful when browsing HITs by creation date
//              (newest first) because it will alert you that you've already seen the
//              checkpoint HIT and probably all the HITs that come after it.
//              It's best to place a checkpoint on a HIT that won't be recreated
//              because recreated HITs jump to the first page.
//              mmmturkeybacon Color Coded Search with Checkpoints has the same
//              functionality built-in. So if you have that installed you don't
//              need this script.
// @namespace   http://userscripts.org/users/523367
// @match       https://*.mturk.com/mturk/viewhits*
// @match       https://*.mturk.com/mturk/findhits*
// @match       https://*.mturk.com/mturk/sorthits*
// @match       https://*.mturk.com/mturk/searchbar*
// @match       https://*.mturk.com/mturk/viewsearchbar*
// @match       https://*.mturk.com/mturk/sortsearchbar*
// @match       https://*.mturk.com/mturk/preview?*
// @match       https://*.mturk.com/mturk/statusdetail*
// @match       https://*.mturk.com/mturk/return*
// @require     http://code.jquery.com/jquery-latest.min.js
// @downloadURL http://userscripts.org/scripts/source/304981.user.js
// @updateURL   http://userscripts.org/scripts/source/304981.meta.js
// @version     1.3
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

//var CHECKPOINT_COLOR = "#00AAAA"; // dark green-blue
var CHECKPOINT_COLOR = "#000000"; // black
var CHECKPOINT_MESSAGE = "CHECKPOINT REACHED!";
//var CHECKPOINT_MESSAGE = "YOU SHALL NOT PASS!";

var is_HIT = $("input[type='hidden'][name='isAccepted']").length > 0;
if (is_HIT)
{
    // not on a search page so quit
    return;
}

// This script won't place a checkbox next to HITs for which you are not
// qualified that don't have a link.
$('a[href^="/mturk/preview?groupId="]').each(function()
{
    var checkbox = document.createElement('INPUT');
    checkbox.type = 'checkbox';
    checkbox.name = $(this).attr('href').slice(23); // groupId
    checkbox.checked = GM_getValue(checkbox.name+'_checked', false);
    checkbox.addEventListener('click', set_checkpoint);  
    //checkbox.addEventListener('click', (function(checkbox,$link_obj){return function(){set_checkpoint(checkbox,$link_obj);};})(checkbox,$(this)) );  
    checkbox.style.cssText ='vertical-align:middle;';
    $(this).after(checkbox);
    mark_checkpoint(checkbox, $(this));
});

function set_checkpoint(e)
{
    var caller = e.target || e.srcElement;
    var d = new Date();
    GM_setValue(caller.name+'_checked', caller.checked);
    GM_setValue(caller.name+'_date', '['+d.toLocaleDateString()+'] ');
}

function mark_checkpoint(checkbox, $link_obj)
{
    if (checkbox.checked == true)
    {
        var checkpoint_date = GM_getValue(checkbox.name+'_date');
        $link_obj.closest('table[width="100%"][cellspacing="0"][cellpadding="0"][border="0"][height="100%"]').css('border', '50px solid '+CHECKPOINT_COLOR);
        $link_obj.text(checkpoint_date+CHECKPOINT_MESSAGE);
    }
}