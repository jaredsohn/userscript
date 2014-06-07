// ==UserScript==
// @name           quotify
// @namespace      stackoverflow
// @description    replace questions and answers by semi-random comments
// @include        http://meta.stackoverflow.com/*

// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @author         Benjamin Dumke
// ==/UserScript==

sources = [9134, 9953, 7931];
quotes = [];

(function(){


    function get_a_quote() {
        if (quotes.length == 0) {
            pos = Math.floor(Math.random() * sources.length);
            qurl = "/questions/" + sources[pos];
            sources.splice(pos, 1)
            $($.ajax({async: false, url: qurl}).responseText).find(".comment-text").each(
                function(){quotes.push($($(this).html().replace(/ .&nbsp;<.*/, "")+"</div>").text())}
                )
            quotes.sort(function(a, b) { return Math.random() - 0.5 });
        }
        return quotes.pop()
    }
    // remove the text first, so there's no chance to read it until the ajax returns
    $(".post-text").each(function(){ $(this).text("") });
    $(".comments").closest("td").hide()
    $(".post-text").each(function(){ $(this).text(get_a_quote()) });

})()