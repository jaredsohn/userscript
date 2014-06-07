// ==UserScript==
// @name        nic.ir
// @namespace   nic.ir_select_all_domains
// @include     https://www.nic.ir/My_Domains*
// @version     0.01
// @grant       none
// ==/UserScript==

if (typeof jQuery == 'undefined') exit();
$(document).ready(init);
function init()
{
    $('form[method=POST] > table.listing-table > tbody > tr > th:first').html('<input type="checkbox" id="selectAll" />');
    e = $('input[id=selectAll]');
    e.click(function()
    {
        $("input[id^='domain__']").attr('checked', e.prop('checked'));
    });
}
