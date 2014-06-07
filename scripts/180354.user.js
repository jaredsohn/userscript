// ==UserScript==
// @name        DobrijZmej RSI Russian [forum]
// @namespace   https://forums.robertsspaceindustries.com/
// @description Руссификация форума игры Star Citizen
// @include     https://forums.robertsspaceindustries.com/*
// @version     1
// @grant       none
// ==/UserScript==
$.fn.zmejReplace = function(strFrom, strTo){
   if($(this).size()){
      return($(this).html($(this).html().replace(strFrom, strTo)));
   }
}


   $("*").each(function(i,elem){
      if($(elem).css("font-family").toLowerCase().indexOf('electrolize') >= 0){
         $(elem).css("font-family", "Verdana,Arial,Tahoma");
      }
   });

   $("a[class~='navgroup'][href='https://robertsspaceindustries.com/about-rsi'] span").html("О САЙТЕ");
   $("a[class~='navgroup'][href='https://robertsspaceindustries.com/comm-link'] span").html("НОВОСТИ");
   $("a[class~='navgroup'][href='/'] span").html("СООБЩЕСТВО");
   $("a[class~='navgroup'][href='https://robertsspaceindustries.com/pledge'] span").html("ПОКУПКИ");
   $("a[class~='navgroup'][href='https://robertsspaceindustries.com/account/settings'] span").html("КАБИНЕТ");

      // подменю "О сайте"
   $("a[class~='subnav-link'][href='/about-rsi']").html("<span class='block trans-02s abs-overlay'></span>О КОМПАНИИ");
   $("a[class~='subnav-link'][href='/press']").html("<span class='block trans-02s abs-overlay'></span>В ПРЕССЕ");
   $("a[class~='subnav-link'][href='/funding-goals']").html("<span class='block trans-02s abs-overlay'></span>ЦЕЛИ ФИНАНСИРОВАНИЯ");
   //$("a[class~='subnav-link'][href='']").html("<span class='block trans-02s abs-overlay'></span>КОМАНДА")

   $("a[class~='subnav-link'][href='https://robertsspaceindustries.com/about-rsi']").html("<span class='block trans-02s abs-overlay'></span>О КОМПАНИИ");
   $("a[class~='subnav-link'][href='https://robertsspaceindustries.com/press']").html("<span class='block trans-02s abs-overlay'></span>В ПРЕССЕ");
   $("a[class~='subnav-link'][href='https://robertsspaceindustries.com/funding-goals']").html("<span class='block trans-02s abs-overlay'></span>ЦЕЛИ ФИНАНСИРОВАНИЯ");

      // подменю "Новости"
   $("a[class~='subnav-link'][href='https://robertsspaceindustries.com/comm-link']").html("<span class='block trans-02s abs-overlay'></span>ВСЕ");
   $("a[class~='subnav-link'][href='https://robertsspaceindustries.com/comm-link/transmission']").html("<span class='block trans-02s abs-overlay'></span>ТРАНСЛЯЦИИ");
   $("a[class~='subnav-link'][href='https://robertsspaceindustries.com/comm-link/citizens']").html("<span class='block trans-02s abs-overlay'></span>ОТ ГРАЖДАН");
   $("a[class~='subnav-link'][href='https://robertsspaceindustries.com/comm-link/engineering']").html("<span class='block trans-02s abs-overlay'></span>ОТ ИНЖЕНЕРОВ");
   //$("a[class~='subnav-link'][href='https://robertsspaceindustries.com/comm-link/spectrum-dispatch']").html("<span class='block trans-02s abs-overlay'></span>")

      // подменю "Сообщество"
   $("a[class~='subnav-link'][href='https://forums.robertsspaceindustries.com']").html("<span class='block trans-02s abs-overlay'></span>ФОРУМ");
   $("a[class~='subnav-link'][href='https://robertsspaceindustries.com/community/chat']").html("<span class='block trans-02s abs-overlay'></span>ЧАТ");

      // подменю "Покупки"
   $("a[class~='subnav-link'][href='https://robertsspaceindustries.com/pledge']").html("<span class='block trans-02s abs-overlay'></span>ПЛЕДЖИ");

      // подменю "Star Citizen"
   $("a[class~='subnav-link'][href='https://robertsspaceindustries.com/about-the-game']").html("<span class='block trans-02s abs-overlay'></span>ОБ ИГРЕ");
   $("a[class~='subnav-link'][href='https://robertsspaceindustries.com/ship-specs']").html("<span class='block trans-02s abs-overlay'></span>ПАРАМЕТРЫ КОРАБЛЕЙ");
   $("a[class~='subnav-link'][href='https://robertsspaceindustries.com/hangar-module']").html("<span class='block trans-02s abs-overlay'></span>МОДУЛЬ АНГАРА");



      // Форум
   $(".PermaLink a").html("Ссылка");
   $(".CommentFlag a").html("Жалоба");
   $(".CommentQuote a").html("Цитата");
   $(".QuoteFolding").html("» показать предыдущую цитату");
   $(".CommentForm .H").html("Написать комментарий");
   $(".PreviewButton").html("Предпросмотр");
   $(".WriteButton").html("Редактор");
   $(".DraftButton").html("Сохранить");
   $("#Form_PostComment").val("Отправить");
   $(".NewDiscussion").html("Создать тему");

   $(".time > .MItem").each(function(i,elem){
      $(elem).html($(elem).html().replace("Posted:", "Написано:"));
      $(elem).html($(elem).html().replace("Edited:", "Исправлено:"));
   });
/*   $(".MItem").ajaxComplete(function(){
         // код выполняется каждый раз после загрузки аякса
      alert("!!!");
   });*/

   $(".AuthorInfo > .posts").each(function(i,elem){
      $(elem).html($(elem).html().replace("Posts:", "Постов:"));
   });

   $(".QuoteAuthor").each(function(i,elem){
      $(elem).html($(elem).html().replace(" said:", " писал:"));
   });

      // Профиль на форуме, пункты слева под аватаром
   if(window.location.toString().toLowerCase().indexOf('forums.robertsspaceindustries.com') >= 0){
      $(".FilterMenu .AllCategories").zmejReplace(' Categories', ' Категории');
      $(".FilterMenu .Discussions").zmejReplace(' Recent Discussions', ' Последние Темы');
      $(".FilterMenu .Activities").zmejReplace(' Activity', ' Активность');
      $(".FilterMenu .MyBookmarks").zmejReplace(' My Bookmarks', ' Мои Закладки');
      $(".FilterMenu .MyDiscussions").zmejReplace(' My Discussions', ' Мои Темы');
//      $((".FilterMenu .AllCategories")).html($((".FilterMenu .AllCategories")).html().replace(" Categories", " Категории"));
//      $((".FilterMenu .Discussions")).html($((".FilterMenu .Discussions")).html().replace(" Recent Discussions", " Последние Темы"));
//      $((".FilterMenu .Activities")).html($((".FilterMenu .Activities")).html().replace(" Activity", " Активность"));
//      $((".FilterMenu .MyBookmarks")).html($((".FilterMenu .MyBookmarks")).html().replace(" My Bookmarks", " Мои Закладки"));
//      $((".FilterMenu .MyDiscussions")).html($((".FilterMenu .MyDiscussions")).html().replace(" My Discussions", " Мои Темы"));
   }
      // Профиль на форуме, раздел "Закладки"
   if(window.location.toString().toLowerCase().indexOf('forums.robertsspaceindustries.com/discussions/bookmarked') >= 0){
      $(".HomepageTitle").html("Мои закладки"); 
      $(".labels > .title-container").html("Темы"); 
      $(".labels > .started-by").html("Автор"); 
      $(".labels > .replies").html("Ответов"); 
      $(".labels > .views").html("Просм."); 
      $(".labels > .most-recent").html("Последний ответ"); 

      $(".Discussions .CommentCount").each(function(i,elem){
         $(elem).html($(elem).html().replace("comments", "сообщений"));
      });
      $(".Discussions .NewCommentCount").each(function(i,elem){
         $(elem).html($(elem).html().replace("New", "Новых"));
      });
   };
