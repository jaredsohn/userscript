// ==UserScript==
// @name        HuPrioScript 1.01
// @namespace   HuPrioScript 1.01
// @author      HeartlessPirate
// @version     1.01
// @description hu_do_script_1_01
// @include     http://www.erepublik.com/*
// ==/UserScript==

var $;
function initializeDO(){
    if($('#orderContainer')!=null){
        $("#orderContainer").after('<iframe id="hu_do" width="333" height="317" scrolling="no" frameborder="0" align="middle" src="http://hm.erephungary.hu/public/hmscript/index.php" marginheight="0" marginwidth="0" style="border: none; background: none; box-shadow: none;"></iframe>');
    }
    if ($('#notification_area') != null){
        $('#notification_area').css('display','none');       
    }    
};

function waitJQuery() {
        if (typeof(unsafeWindow.jQuery) != 'function') {
                setTimeout(function () { waitJQuery(); }, 200);
        }
        else {
                $ = unsafeWindow.jQuery;
                initializeDO();
        }
}

waitJQuery();