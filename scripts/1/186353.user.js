// ==UserScript==
// @name       Free Skype Premium Vouchers
// @version    Final
// @description  Free Skype premium vouchers
// @include    *collaboration.skype.com/promotion/*
// @copyright  2013+, Varosion
// ==/UserScript==
var number = 0;
function updateDiv(){
    if(number <= 2) {
    //get new content through ajax
    $("#id_email").attr("value", "varosion@gmail.com");
	document.querySelectorAll("button[type='submit']")[0].click();
    $('.panel__content').load(document.URL +  '.panel__content');
    number++;
    } else {
        location.reload();
    }
}

setInterval(updateDiv, 5000); // that's 5 seconds