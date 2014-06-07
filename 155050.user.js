// ==UserScript==
// @name        Viewupdates
// @namespace   http://www.kinkondemand.com
// @include     http://www.kinkondemand.com/kod/*
// @version     1
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==

function ModifyKodView() {
    //fix css to allow width of div's to be 100%
    $(".shootPreviewImage, .shootInfoContainer").css('width', '100%');
    $(".shootDetails").css('position', 'relative');
    //for each div replace with data from hyperlinks
    $(".shootPreviewImage a").each(

    function () {
        var myUrl = $(this).attr('href');
        myUrl += '?c=1 div.shootsFullContainer';
        $(this).load(myUrl, function() {
            //as the retrieve data from hyperlink has incosistent table structure
            //re-organize table structure with 2 columns per row
            var tableToRestruct = $(this).find("div.shootsFullContainer tbody");
            var imageCells = $(tableToRestruct).find("td").removeAttr("rowspan colspan").clone();
            $(tableToRestruct).children().remove();
            var trObj;
            for (idx = 0; idx < imageCells.length; idx++) {
                if (idx % 2 == 0) {
                    trObj = $(tableToRestruct).append('<tr></tr>');
                }
                $(tableToRestruct).find("tr:last-child").append(imageCells[idx]);
            }
            //replace all small images with 620 px images
            $(this).find("img").each(function () {
                var val = $(this).attr('src');
                $(this).attr('src', val.replace(/\/i\/h\/\d\d\d/, '/i/h/620'));
            });
        });
    });



}

//Main Section
var KINKS = {
    view: {
        kodmod: ModifyKodView
    }
};

KINKS.view.kodmod();

