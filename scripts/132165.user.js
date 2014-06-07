// ==UserScript==
// @name           HideUsers
// @namespace      http://yoksel.ru/
// @description    Hide comments of the selected users
// @include        *livejournal.com*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

GM_addStyle("  \
   .hidden-comment-text {  \
       padding: 0px 5px;  \
       background: #f5f5f5;  \
       border: 1px solid #EEE;  \
       font-style: italic;  \
       font-size: 12px;  \
       color: #777;  \
       border-radius: 3px;  \
       }       \
   .hidden-comment .b-leaf-inner,  \
   .hidden-comment .comment-head,  \
   .hidden-comment .comment-text,  \
   .hidden-comment .comment-menu,  \
   .hidden-comment .comment-meta {  \
       display: none;   \
       margin: 0;  \
      }  \
   .hidden-comment.comment-inner {  \
       margin: 0 0 10px 0;  \
      }     \
   .hidden-comment-show .b-leaf-inner,  \
   .hidden-comment-show .comment-meta,  \
   .hidden-comment-show .comment-head,  \
   .hidden-comment-show .comment-text,  \
   .hidden-comment-show .comment-menu {  \
       display: block;  \
       padding: 5px !important;  \
       border: 1px dotted #DDD;  \
       background: #f7f7f7;  \
      }     \
   .hidden-comment-toggle {  \
       padding: 0 0 0 10px;  \
       cursor: pointer;  \
       color: #333;  \
       }  \
   .hide_user {  \
       visibility: hidden;  \
       cursor: pointer;  \
       vertical-align: middle;  \
       }  \
   .comment-meta .hide_user {  \
       vertical-align: bottom;  \
       }      \
   .b-leaf-hover .hide_user,  \
   .comment-head:hover .hide_user,  \
   .comment-meta:hover .hide_user{  \
       visibility: visible;  \
       }  \
");

$.noConflict(); 
jQuery(document).ready(function($) {
    

  if($(".b-leaf").length > 0 || $(".entry-comments").length > 0 || $(".comments-body").length > 0){
        console.log("Скрипт загружен");
        
        var users = {};
        var users_list = GM_listValues();
        if (users_list.length > 0){
            for(var i in users_list) {
                var username = users_list[i];
                users[username] = username;
            }
          }
        
        // обертки комментов, стиль страницы
        var page_style = "default";
        var elem_username = ".b-leaf-username-name";
        var comments_item = $(".b-leaf").not(".b-leaf-collapsed");
        
        if($(".entry-comments").length > 0){
            comments_item = $(".comment-wrap").not(".partial");
            page_style = "minimalism";
            elem_username = ".comment-head .ljuser";     
            }
            else if($(".comments-body").length > 0){
                comments_item = ".comment-inner";
                page_style = "expressive";
                elem_username = ".commenter-name .ljuser";     
                }
                
        // добавляем иконку для скрытия комментов к имени юзера
        $(comments_item).each(function(i,e){
            var user = get_username($(this));
            var this_id = get_comment_id($(this));
       
            var hidecomments_icon = "<span class='hide_user' data-username='"+ user +"' data-parent-id='"+this_id+"'>\
                                    <img src='http://img-fotki.yandex.ru/get/6209/5091629.74/0_63420_d2820eed_orig'/></span>";
            $(elem_username,$(this)).after(hidecomments_icon);     
            });

        //скрываем комменты от заданных юзеров
        hide_comments_by_user("all"); 

        //скрыть/раскрыть все комменты пользователя по клику на иконку рядом с именем пользователя
        $(".hide_user").click(function(){
            var user = $(this).attr("data-username");
            var comment_id = $(this).attr("data-parent-id");
            if(GM_getValue(user) == user ){
                GM_deleteValue(user); 
                show_comments_by_user(user);
              }
              else {
                GM_setValue(user,user);
                hide_comments_by_user(user);  
                }
            });    

         //свернуть/развернуть скрытый коммент
         $(".hidden-comment-toggle").live("click", function(){
            var show_id = $(this).attr("data-parent-id");
            var is_visible = $(this).attr("data-visible");

            var obj = "#"+show_id;

            if(page_style == "expressive"){
                    obj = $(comments_item,"#"+show_id);
                    }

            if(is_visible == "0"){
                    $(this).attr("data-visible","1");
                    $(this).text("Скрыть");
                    $(obj).addClass("hidden-comment-show");
                }
                else {
                    $(this).attr("data-visible","0");
                    $(this).text("Показать");
                    $(obj).removeClass("hidden-comment-show");
                    }
            });       
        
    }// end If
    
    function hide_comments_by_user(hide_user) {
        $(comments_item).each(function(i,e){
            var user = get_username($(this));
            var this_id = get_comment_id($(this));

            var is_hide = false;

            if(hide_user == "all" && users[user] != undefined){
                is_hide = true;
                }
            else if(user == hide_user){
                is_hide = true;
                }

            if(is_hide == true){
                var hidden_comment_text = "<span class='hidden-comment-text'>\
                                           Комментарий от " + user + " \
                                           <span class='hidden-comment-toggle' data-parent-id='"+this_id+"' data-visible='0'>Показать</span>\
                                           </span>";

                $(this).prepend(hidden_comment_text);
                $(this).addClass("hidden-comment");
                }
            });
    }    
    function show_comments_by_user(show_user) {
        $(comments_item).each(function(i,e){
            var user = get_username($(this));

            if(user == show_user){
                $(".hidden-comment-text",$(this)).remove();  
                $(this).removeClass("hidden-comment");
                $(this).removeClass("hidden-comment-show");
                }
         });
    }

    function get_username(obj){
      var user = obj.attr("data-displayname");
      if(page_style == "minimalism" || page_style == "expressive"){
          user = $(elem_username,obj).attr("lj:user");
          }
      return user;
    } 

    function get_comment_id(obj){
      var comment_id = obj.attr("id");
      if(page_style == "expressive"){
          comment_id = $(obj).parent().attr("id");
          }
      return comment_id;
    }  
        
});