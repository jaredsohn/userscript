// ==UserScript==
// @name            Hack Forums Today's post counter
// @namespace       Snorlax
// @description     Counts how many posts you've posted today.
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include         *hackforums.net/*
// @grant           GM_setValue
// @grant           GM_getValue
// @grant           GM_deleteValue
// @version         1.03
// ==/UserScript==

$("#panel a[href*='finduser&uid']").click(function() {
    GM_setValue("clicked", 1);
});

URL = window.location.href;
//var total = "<a href='javascript:void(0);' id='loadPosts' class='smalltext'>Click to load</a>";
var total = 0;
var postAmount = 0;
var page = 1;

if(URL.indexOf("hackforums.net/search.php") > -1) {
    threadsPerPage = $("td[class*='trow']").find("a[href*='member.php']").length;
    console.log("Displaying " + threadsPerPage + " threads per page");
    if(GM_getValue("clicked") == 1) {
        $("strong:contains('Search Results')").append(" - Today's total post count: <span id='totaltoday'> " + total + " <a href='javascript:void(0);' id='loadPosts' class='smalltext'>Click to load</a></span>");
        $("#loadPosts").click(function() {
            getpage();
            $(this).parent().html("0");
        });
        GM_setValue("clicked", 0);
    } else {
        GM_setValue("clicked", 0);
    }
}

function getpage(){
    console.log("Fetching page " + page);
    $.ajax({
        type: "GET",
        url: URL + "&page=" + page,
        async: true,
        data: "",
        success: function(data){
            checkpage(data)
        }
    });
}

function checkpage(data){
    page++;
    console.log("Success");
    postAmount = $(data).find("td[class*='trow'] > .smalltext:contains('Today,')").length;
    console.log("Found " + postAmount + " posts");
    total += postAmount;
    console.log("Added to total: " + total);
    $('#totaltoday').text(total);
    if(postAmount == threadsPerPage){
       	getpage();
    }
}