// ==UserScript==
// @name       Jenkings auto submit
// @namespace  http://use.i.E.your.homepage/
// @version    0.7
// @description  Automate your jenkins submits, for free !
// @match      http://reviewboard.dzine.be/r/*
// @copyright  2013, You
// ==/UserScript==

(function(){
    var $ = unsafeWindow.$;
    var clicked = false;
    var submitJenkings = $(".actions-container .actions").prepend("<li id='jenkingsSubmit' class='primary'> <a href='#'> Submit to jenkins </a></li>");
       
    $("#jenkingsSubmit").on("click", function (){
        if (clicked)
            return;
        var RRID = window.location.pathname.split("/")[2];
        if (!confirm("Are you sure you want to submit this to jenkins ?"))
        	return;
        clicked = true;        
        $("#jenkingsSubmit").css("background-color", "rgb(201, 201, 201)");   
        var postData = "name=RR_ID&value=" + RRID + "&json=%7B%22parameter%22%3A+%7B%22name%22%3A+%22RR_ID%22%2C+%22value%22%3A+%22" + RRID + "%22%7D%7D&Submit=Build"
        var headers = {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Charset": "UTF-8,*;q=0.5",
            "Accept-Encoding": "gzip,deflate,sdch",
            "Origin": "http://jenkins.dzine.be",
            "Accept-Language": "en-US,en;q=0.8,nl;q=0.6",
            "Cache-Control": "max-age=0",
            "Host": "jenkins.dzine.be",
            "Content-Type": "application/x-www-form-urlencoded",
            "Pragma": "no-cache",
            "Proxy-Connection": "keep-alive",
            "Referer": "http://jenkins.dzine.be/job/ReviewBoard%20-%20Commit%20request/build?delay=0sec"//,
            //"User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.64 Safari/537.31"
        }
        
        $.post(
            "http://jenkins.dzine.be/job/ReviewBoard%20-%20Commit%20request/build?delay=0sec",
            postData,
            function(response) {
                console.log("post to jenkins successful");
            }
        ).fail(function(xhr, textStatus, errorThrown) {
            console.log(xhr.responseText);
        });
    });
}())
