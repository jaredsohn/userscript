// ==UserScript==
// @name           Ebay Motors Thumbnail Killer
// @namespace      7null.com/GM_scripts
// @description    rips image from listing page and uses for thumbnail on search results
// @include        http://motors.shop.ebay.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
var counter = -1;
$('.pic img').height(225).width(300);
$('.pdn').remove();
var doit = {
    init: function sevennull() {

        function do_it(link_inside, counter) {

            GM_xmlhttpRequest({
                method: "GET",
                url: link_inside,
                onload: function (result) {
                    var dataforparse = result.responseText;
                    var imgwanted = dataforparse.match(/\http[\"ï¿½\']{0,1}[^\"\'\>]*.jpg*(?!height="300")/i);
                    $('.pic img').eq(counter).attr('src', imgwanted);
                }
            });
        }


        $('.v4lnk').each(function () {
            var urlebay = $(this).attr('href');
           counter=counter+1;
            do_it(urlebay,counter);
        });


    }
};
doit.init();



