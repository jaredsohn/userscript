// ==UserScript==
// @name        Koding Most Liked Toggle
// @namespace   koding.com
// @description Adds the ability to show or hide the "Most Liked" posts
// @include     *koding.com*
// @version     1
// @grant       none
// ==/UserScript==

var most_liked_enabled = true;

function addui(){
    try{
    if(!$("#ui_toggle_most_liked").length > 0){
        if($("span.title").length > 0){
            $("span.title").parent().prepend("<div id='ui_toggle_most_liked'></div>");
            $("span.title").first().css("color","green");
            $("span.title").first().click(function(){
                if(most_liked_enabled){
                    $("span.title").first().parent().next().css("display","none")
                    $("span.title").first().css("color","grey");
                }else{
                    $("span.title").first().parent().next().css("display","")
                    $("span.title").first().css("color","green");
                }
                
                most_liked_enabled = !most_liked_enabled;
            });
            return;
        }
    }
    }catch(ex){console.log(ex.message);}
    
    setTimeout(addui, 500);
}


addui();
