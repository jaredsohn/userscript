// ==UserScript==
// @name            ASMB Ignorance
// @author          Galaxian
// @namespace       127.0.0.1
// @include         http://boards.adultswim.com/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// ==/UserScript==
  
  
    if(window.location.pathname.indexOf("viewprofilepage") != -1){
      if(!GM_getValue("ignored")){
        var setupignored = [];
        setupignored.push("filler01");
        setupignored.push("filler02");
        GM_setValue("ignored", JSON.stringify(setupignored));
      }
      
      var thisUser = $('.viewprofilepagebanner .login-bold').html();
      var ignored = [];
      ignored = JSON.parse(GM_getValue("ignored"));
      for (x=0;x<ignored.length;x++) {
            if (thisUser == ignored[x]) {
              var unhateButton = document.createElement('a');
              $(unhateButton).css({'cursor':'pointer', 'color':'white', 'font-size':'22px'});
              $(unhateButton).html(" ☺");
              $(unhateButton).addClass('unfucker');
              $(unhateButton).attr('title', 'Click to remove from ignore');
              $('.viewprofilepagebanner .UserName').parent().append(unhateButton);
            }
      }
      if($.inArray(thisUser, ignored) == -1) {
              var hateButton = document.createElement('a');
              $(hateButton).css({'cursor':'pointer', 'color':'white', 'font-size':'8px'});
              $(hateButton).html(" ☹").css('font-size','22px');
              $(hateButton).addClass('fucker');
              $(hateButton).attr('title', 'Click to hide all posts from this asshole.');
              
              $('.viewprofilepagebanner .UserName').parent().append(hateButton);
      }
      
      $('.fucker').live("click", function(){
        $(this).html(" ☺").css('font-size','22px');
        $(this).addClass("unfucker");
        $(this).removeClass("fucker");
        var irritant = $(this).parent().find('.login-bold').html();
        var ignored = [];
        
        ignored = JSON.parse(GM_getValue("ignored"));
        
        ignored.push(irritant);
        GM_setValue("ignored", JSON.stringify(ignored));
      });
      
      $('.unfucker').live("click", function(){
        $(this).html(" ☹").css('font-size','22px');
        $(this).addClass("fucker");
        $(this).removeClass("unfucker");
        var irritant = $(this).parent().find('.login-bold').html();
        var ignored = [];
        ignored = JSON.parse(GM_getValue("ignored"));
        var index = $.inArray(irritant, ignored);
        ignored.splice(index,1);
        GM_setValue("ignored", JSON.stringify(ignored));
      });
      
      
      
      if($('.UserProfileSummary').find('.login-bold').html() == $('#viewUserProfile').html()){
        var clearignore = document.createElement('a');
        $(clearignore).attr("id", "clearignore");
        $(clearignore).html("clear ignore list");
        $(clearignore).css({"font-size":"10px", "text-decoration":"none", "cursor":"pointer"});
        $('.UserProfileSummary').append(clearignore);
        $("#clearignore").click(function(){
            GM_deleteValue("ignored");
        });
      }
    }
    
    
    
    $('.lia-list-row').each(function(){
      var ignored = [];
      ignored = JSON.parse(GM_getValue("ignored"));
      var user = $(this).find('.UserName').find('.login-bold').html();
      for (x=0;x<ignored.length;x++) {
            if (user == ignored[x]) {
              $(this).hide();
            }
          }

    });
    
    $('.lia-quilt-forum-message').each(function(){
      var ignored = [];
      ignored = JSON.parse(GM_getValue("ignored"));
      var user = $(this).find('.UserName').find('.login-bold').html();
      for (x=0;x<ignored.length;x++) {
            if (user == ignored[x]) {
              $(this).hide();
              var showhidden = document.createElement('a');
              $(showhidden).css({'cursor':'pointer', 'color':'white'});
              $(showhidden).html("ignored user - click to view");
              $(showhidden).addClass('defucker');
              $(showhidden).attr('title', 'Click to remove from ignore');
              $(this).parent().append(showhidden);
              $('.defucker').live("click", function(){
                $(this).parent().find('.lia-quilt-forum-message').show();
                $(this).html("click again to re-hide");
                $(this).addClass("refucker");
                $(this).removeClass("defucker");
              });
              $('.refucker').live("click", function(){
                $(this).parent().find('.lia-quilt-forum-message').hide();
                $(this).html("ignored user - click to view");
                $(this).addClass("defucker");
                $(this).removeClass("refucker");
              });
            }
          }
      
    });
  
