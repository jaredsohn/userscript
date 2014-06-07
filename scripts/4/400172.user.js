// ==UserScript==
// @name       Renovate Information box
// @namespace  http://production.mcb.dk/
// @version    0.1
// @description  Make a better look & feel of the Information box 
// @include http://production.mcb.dk/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @copyright  2012+, You
// ==/UserScript==


$('#informationContainer').find("button[class*='aligned-dropdown-button']").text("Information (F2)");


//$('style').append("@media screen and (min-width: 1730px) { #informationContent{margin-right:0 !important; margin-top:0 !important;}}");
GM_addStyle("\
@media screen and (min-width: 1730px) { \
#informationContent{\
margin-right:0 !important; \
margin-top:0 !important; \
}\
}");

$('#informationContent').css(
    {
        'width':'800',
        'box-shadow':'1px 1px 16px #aaa',
        'border':'1px solid #CEDCE7'
    });


/* ==Renovate the allocation grid== */
GM_addStyle("\
#information-allocated .col-name{\
width:140px !important; \
border-left:1px solid #d1dde8 !important; \
}\
#information-allocated .col-projectname{\
width:200px !important; \
}\
#information-week .table .progress{\
width:100px !important; \
}");
/* ==/Renovate the allocation grid== */

/* ==Assign custom shortcut to ESC key to close the Information box== */
$('body').on('keyup.projects',function(event) {
    var inputFocused = $('input,textarea,select').is(':focus');
    switch(event.which)
    {
        case 27: // Escape - Close search
            $('#informationContent').hide();
            event.preventDefault();
            break;
        default:
            //code to be executed if n is different from case 1 and 2
    }
});
/* ==/Assign custom shortcut to ESC key to close the Information box== */