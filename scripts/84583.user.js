// ==UserScript==
// @name           Ebay.com thumbnail replacer 
// @namespace      7null.com/GM_scripts
// @description    Replaces thumbnails with primary listing image - ebaymotors script is available also.
// @include        http://*hop.ebay.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
var counter = -1;
$('a .img').height(225).width(300);
var doit = {
    init: function sevennull() {

        function do_it(link_inside, counter) {

            GM_xmlhttpRequest({
                method: "GET",
                url: link_inside,
                onload: function (result) {
                    var dataforparse = result.responseText;
                    var imgwanted2 = dataforparse.match(/\http[\"|\']{0,1}[^\"\'\>]*.jpg(?=" id)/i);
                    //var imgwanted2 = imgwanted.match(/\http[\"|\']{0,1}[^\"\'\>]*.jpg/i);
                    if (imgwanted2 !==null){
                    $('a .img').eq(counter).attr('src', imgwanted2);}
                }
            });
        }


        $('.vip').each(function () {
            var urlebay = $(this).attr('href');
           counter=counter+1;
            do_it(urlebay,counter);
        });


    }
};
doit.init();



