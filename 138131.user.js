// ==UserScript==
// @name       PrevNext posts
// @namespace  http://yoksel.ru/
// @description  Add to page prevnext navigation for scrolling posts on page. Works only with Exressive
// @include    *livejournal.com*
// @require    https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

GM_addStyle(" \
    .prevnext-posts { \
        position: fixed; \
        bottom: 10px; \
        right: 10px; \
        width: 80px; \
        font-size: 25px; \
        } \
    .nav-item { \
        cursor: pointer; \
        } \
        .prev-post { \
            float: left;  \
            } \
        .next-post { \
            float: right;  \
            text-align: right; \
            } \
        .no-link { \
            display: none; \
            } \
");
            
$.noConflict(); 
jQuery(document).ready(function($) {
    
    var prevnext_links = "";
    
    var top = $(window).scrollTop();
    
    var posts = {};
    
    var count_posts = 1;// like lenght
    
    $(".post-asset").each(function(i,e){
        
        var id = $(this).attr("id");
        var e_offset = $(this).offset();
        
        posts[i] = {
            "id" : id,
            "top" : e_offset.top
            };
        count_posts = i;
    });
    
    if(count_posts > 1){
        prevnext_links = "<div class=\"prevnext-posts\"><div class=\"prev-post nav-item\"><a class=\"prev-link\" href=\"#\">&larr;</a></div>";
        prevnext_links += "<div class=\"next-post nav-item\"><a href=\"#\" class=\"next-link\">&rarr;</a></div></div>";
        $("body").append(prevnext_links);
        }
   
    get_current_post();
    
    function get_current_post(){
        var real_top = $(window).scrollTop();
        var top = real_top + $(window).height()/3;
        
        var prev_link = "";
        var next_link = "";
        
        $.each(posts,function(i,el){
            // clear links
            var el_id = el.id;
            var el_top = el.top;
            
            var prev_num = Number(i) - 1;
            var next_num = Number(i) + 1;
            var next_top = $("body").height();
            
            // get next top
            if(next_num < count_posts){
               next_top = posts[next_num].top;
               }
            
            if(top >= el_top && top < next_top){  
                
                prev_link = "";
                next_link = "";
                
                if(i > 0){
                   prev_link = "#" + posts[prev_num].id;
                   }
                if(i < count_posts ){
                   next_link = "#" + posts[next_num].id;
                   }
              }
              
            });// END FOREACH
            
        
            $(".prev-link").attr("href",prev_link);
            $(".next-link").attr("href",next_link);
            
            if(prev_link == ""){
                $(".prev-link").addClass("no-link");
                }
                else {
                    $(".prev-link").removeClass("no-link");
                    }
            
            if(next_link == ""){
                $(".next-link").addClass("no-link");
                }
                else {
                    $(".next-link").removeClass("no-link");
                    }
            
    }
    
    
    $(".prev-link,.next-link").click(function(){
        if($(this).attr("href") == ""){
            return false;
        }
        else{
            get_current_post();
            }
        });
    $(window).scroll(function(){
        get_current_post();
        });
            
});
   

                     