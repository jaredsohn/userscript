// ==UserScript==
// @name          Magento Products Mass Deletion
// @namespace     http://tristan.rivoallan.net
// @description   Adds mass deletion capabilities to the products datagrid.
// @author        Tristan Rivoallan
// @homepage      http://tristan.rivoallan.net
// @include       http://your/url/here/*
// ==/UserScript==

/*
 * PLEASE NOTE : This is a quick & dirty hack. It gets the job done with some caveats :
 *
 *   - It breaks the top rollover menu (because of jquery / prototype incompatibility
 *   - It generates a heavy load on the server. That's because all deletion request are issued simultaneously.
 */

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://code.jquery.com/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait()
{
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; applyFix(); }
}
GM_wait();

function applyFix()
{
    $('#productGrid_table tr').each(
        function ()
        {
            var url_edit = $(this).attr('id');
            if (url_edit)
            {
                var url_delete = url_edit.toString().replace(/(edit)/, 'delete');
                var href_delete = '<a class="del_product" href="'+url_delete+'">X</a>';
                $(this).prepend(href_delete);
            }
        }
    );

    
    var href_delete_all = '<a href="#" onclick="confirm(\'This will delete all products displayed on this page. Are you sure ?\');$(\'a.del_product\').each(function(){var del_href = $(this).attr(\'href\');$.get(del_href);});">Delete All</a>';
    $('table.actions tr td.filter-actions').append(href_delete_all);
}

