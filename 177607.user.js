// ==UserScript==
// @name Sortowanie Mikrobloga
// @description Sortuje wpisy z mikrobloga po ilosci plusow oraz dodaje przycisk do posortowania odpowiedzi do posta wg. plusow.
// @version 1.1
// @author JackBauer
// @include http://www.wykop.pl/mikroblog/*
// @include http://www.wykop.pl/tag/*
// @include http://www.wykop.pl/wpis/*
// ==/UserScript== 

// Przycisk w prawym gornym rogu do sortowania wpisow
if(!isOnSinglePostPage()) $("div.wrapper div.fright.margintop35").append('<a href="#" class="button" style="width: 150px;text-align: center;" id="mikroblog_sort_posts">Sortuj wpisy po plusach</a>');

// Przyciski przy poscie po najechaniu (obok zglos, ulubiony itp.) do sortowania odpowiedzi do danego wpisu
$("#activities-stream > li").find("span.votes.hoverup.dnone.cac:first").prepend('<a href="#" class="small mikroblog_sort_responses">sortuj odpowiedzi po plusach</a> |');

// Sortowanie wpisow na stronie glownej mikrobloga i stronie tagow
$("#mikroblog_sort_posts").click(function(){
    
    var first_post = $("#activities-stream > li:first-child").clone().css("display", "none");
    var last_post = $("#activities-stream > li:last-child").clone().css("display", "none");
    var posts = sortPostsByVotes($("#activities-stream > li"));
    
    $("#activities-stream > li").remove();
    $("#activities-stream").append(first_post);
    $("#activities-stream").append(posts);
    $("#activities-stream").append(last_post);
});

// Sortowanie odpowiedzi do wpisow
responsesLoaded = false;
$(".mikroblog_sort_responses").click(function(e){
    e.preventDefault();
    var post = $(this).parents("li:first");
    
    if(isOnSinglePostPage())
    {
        var posts = sortPostsByVotes($(".subcomments > li", post));
            
        $(".subcomments > li", post).remove();
        $(".subcomments", post).append(posts);
    } else {
        responsesLoaded = false;
        $(".subcomments", post).prepend('<li style="display: none" class="loadingResponses"></li>');
        $(".showAllComments", post).click();
        
        sortWhenLoaded(post);
    }
});

function sortWhenLoaded(post)
{
    setTimeout(function(){
        if($(".loadingResponses", post).length <= 0 && !responsesLoaded)
        {
            var posts = sortPostsByVotes($(".subcomments > li", post));
            
            $(".subcomments > li", post).remove();
            $(".subcomments", post).append(posts);
            
            $("html, body").animate({scrollTop: ($(".subcomments", post).offset().top - 100) + "px"});
            
            responsesLoaded = true;
        } else {
            sortWhenLoaded(post);
        }
    }, 200);
}

function sortPostsByVotes(selector)
{
    if(!selector instanceof jQuery) selector = $(selector);
    var posts = selector.sort(function(a, b){
        var a_votes = new String($(a).find("span.votC span").html());
        var b_votes = new String($(b).find("span.votC span").html());
        
        if(a_votes != "0") a_votes = a_votes.substr(1);
        if(b_votes != "0") b_votes = b_votes.substr(1);
        
        var a_pluses = parseInt(a_votes);
        var b_pluses = parseInt(b_votes);

        if(a_pluses > b_pluses)
        {
            return -1;
        } else {
            return 1;
        }
    });
    
    return posts;
}

function isOnSinglePostPage()
{
    return location.href.substr(0, 24) == "http://www.wykop.pl/wpis";
}
