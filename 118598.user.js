// ==UserScript==
// @name           Trailers Everywhere
// @description    Watch trailers on imdb.com film pages even if "Watch Trailer" button is missing on some of them
// @namespace      http://userscripts.org/users/116116
// @include        http://www.imdb.com/title/*
// @require        http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js
// @grant          none
// @version        1.4 - 24th Feb 2013
// ==/UserScript==

// v1.4 - 24th Feb 2013
// *script working again (reflecting the change of the structure of the movies titles)
//
// v1.3 - 31st Aug 2012
// *script working again (using $.getJSON() instead of $.get() now, so JSON object, not string, is fetched from youtube)
// *improved film title getting
// *metadata block imperative "@grant" added
//
// v1.2 - 24th May 2012
// *"Embedding disabled by request" error message problem solved
//
// v1.1 - 20th Jan 2012
// *"original trailers not playing" issue fixed, Tampermonkey needed for Chrome to work
//
// v1.0 - 20th Nov 2011
// *initial release


  var $ = unsafeWindow.jQuery;

  var yt_video_url;

  film_title = $("#overview-top .header .itemprop").text();

  //need to use json version (with parameter alt=json) because otherway the request from imdb.com is not successfull
  api_url = "http://gdata.youtube.com/feeds/api/videos?orderby=relevance&max-results=1&alt=json&format=5&vq=trailer%20" + film_title;
  
  buttons_wrapper = $("#overview-bottom");
  code_to_add = '<a id="button116116" class="btn large primary title-trailer" style="height: 20px;" onclick="return false;" href="">YouTube Trailer</a>';
  
  //check if Watch Trailer button is already on page
  if(!($("a.title-trailer, buttons_wrapper").length)){
  buttons_wrapper.prepend(code_to_add);
  }
  
  function show_youtube_video(){

    $.getJSON(api_url, function(data){

              id_link = data.feed.entry[0].id["$t"];
              youtube_id = id_link.substr(42);
              embed_youtube='<div id="embed_youtube_116116" style="position: absolute; left: 60px; top: -50px;z-index: 1001;"><object width="853" height="510"><param name="movie" value="http://www.youtube.com/v/' + youtube_id + '?version=3&amp;hl=en_US&amp;rel=0&amp;autoplay=1"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><param name="wmode" value="transparent"></param><embed src="http://www.youtube.com/v/'+ youtube_id + '?version=3&amp;hl=en_US&amp;rel=0&amp;autoplay=1" type="application/x-shockwave-flash" width="853" height="510" allowscriptaccess="always" allowfullscreen="true" wmode="transparent"></embed></object></div>';
              
              buttons_wrapper.append(embed_youtube);
              
              overlay116116 = '<div id="overlay116116" style="display: none; position: absolute; top: 0; left: 0; width: 100%; background-color:#000; opacity: 0.9; z-index: 1000;"></div>';
        
              $("body").append(overlay116116);
              body_height=$("body").height();
              $("#overlay116116").height(body_height).fadeIn(300);
              $("#embed_youtube_116116").append(close116116);
              
              $("#overlay116116, #close116116").click(function(){
  
                $("#embed_youtube_116116 object, #embed_youtube_116116").remove();
                $("#overlay116116").remove();
                $("#close116116").remove();
  
              });
                     
    });//end of ajax
             
                   
  } //end of show_youtube_video() function
  
  $("#button116116").click(function(){ 
    show_youtube_video();
  });
  
  // Close button image in base64
  close116116='<img id="close116116" style="position: absolute; top: -12px; right: -15px; cursor: pointer;" src="data:image/png;base64,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" />';