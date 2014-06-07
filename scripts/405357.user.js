// ==UserScript==
// @name                UW Social Media Lab
// @author              Chet Manley
// @version             0.1
// @description         UW Social Media Lab
// @include             https://www.mturkcontent.com/*
// @include				https://s3.amazonaws.com/mturk_bulk/hits/*
// @require				http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

$(document).ready(function () {
    $(window).keyup(function (e) {
        e.preventDefault();
        
        if (!$('input, textarea').is(':focus')) {
            var key = (e.keyCode ? e.keyCode : e.which);
            switch (key) {
                case 49:
                    $('input[value="Person"]').prop('checked',true);
                    break;
                case 50:
                    $('input[value="Group"]').prop('checked',true);
                    break;
                case 51:
                    $('input[value="No"]').prop('checked',true);
                    break;
                case 52:
                    $('input[value="Broken"]').prop('checked',true);
                    break;
                case 52:
                    $('#mturk_form').submit();
                    break;
                default:
                    break;
            }
        }
    });
});