// ==UserScript==
// @name           Wallbase Total Results Viewer
// @description    Add information of total walls and total pages
// @include http://wallbase.cc/search*
// ==/UserScript==






var total_pages=Math.ceil(opt.results_count/opt.thpp);

$(".results-info").html("");
$(".subhead").after("<div style='text-align:center;color: rgb(225, 158, 86);font-size: 1.5rem;' class='results-info'><div class='total-results'> Total Results :"+opt.results_count+"</div><div class='total-pages'> Total Pages: "+total_pages+"</div></div>");


$( document ).ajaxComplete(function() {
    check();
});

function check(){
    $('.tit').each(function() {
        if(!$(this).hasClass("edited")){
            $(this).addClass("edited");
            $(this).text("Page "+$(this).text()+" of " + total_pages);
        }
    });
}


