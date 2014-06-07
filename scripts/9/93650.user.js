// ==UserScript==
// @name           plikwmig.pl
// @namespace      plikwmig.pl
// @description    Pobieraj szybciej!
// @include        http://*
// @exclude        https://*
// ==/UserScript==

var $;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

// All your GM code must be inside this function
    function letsJQuery() {
    
function addBar(data) {
    document.getElementsByTagName("body")[0].innerHTML += "<div  id=\"plikwmig\" style=\"z-index: 1000; position: fixed; top: 0px; left: 0px\; background:url('http://plikwmig.pl/static/plugin_bar_bkg.png') repeat-x; height: 25px; width: 100%;\">\
    <div onclick=\"document.forms['send'].submit();return false;\" style=\"float: left; width: 99%\">\
    <div style=\"float: left; margin-left: 3px; margin-top: 5px; margin-right: 5px;\"><img src=\"http://plikwmig.pl/static/plugin/icon_color_16px.png\"></div>\
    <div style=\"margin-left: 17px; width: 570px;\">\
    <form name=\"send\"action=\"https://plikwmig.pl/download\" method=\"POST\" style=\"display: none\">\
    <input type=\"text\" name=\"links\" value=\""+data+"\">\
    </form>\
    <p style=\"font-family: verdana; font-size: 14px; margin-top: 5px; margin-left: 5px; font-weight: normal; color: #000;\">Kliknij tutaj aby pobraÄ za pomocÄ Plik W Mig</p></div></div>\
    <div stlye=\"width: 12px;\"><p style=\"margin-top: 6px; font-size: 12px; font-decoration: bold;\" onclick=\"document.getElementById('plikwmig').style.display='none'\">X</p></div>\
    </div>";   
}


    var SERVICES = ["rapidshare.com/", "megaupload.com/", "fileserve.com/", "megavideo.com/", "turbobit.com/", "filesonic.com/", "hotfile.com/"];
    var EXPRS = ["(http://)?(www\\.)?rapidshare\\.com/files/(.*)/[a-zA-Z0-9._+-]+", "(http://)?(www\\.)?megaupload\\.com/\\?d=\\w+", "(http://)?(www\\.)?megavideo\\.com/\\?v=\\w+", "(http://)?(www\\.)?fileserve\\.com/file/([a-zA-Z0-9-+_.]+)", "(http://)?(www\\.)?turbobit\\.net/\\w+.html", "(http://)?(www\\.)?filesonic\\.com/file/[a-zA-Z0-9]+(/\[a-zA-Z0-9./_-]+)?", "(http://)?(www\\.)?rapidshare.com/#!download(.*)+", "(http://)?(www\\.)?hotfile\\.com/dl/([0-9]+)/([a-zA-Z0-9+]+)/(.*)"];
    var MU_EXPRS = ["http://www\\.megavideo\.com/v/([A-Z0-9]+)([a-z0-9]{32})1?", "http://(wwwstatic\\.)?megavideo\\.com/mv_player.swf\\?.*?([?;&]v=)+([A-Z0-9]+)"];
    
      url = document.domain;
      if(url.match("^www") ) {
        url = url.slice(4);
      }
      url = url + "/";

      if(SERVICES.indexOf(url) != -1){
        for(expr in EXPRS) {
          if(window.location.href.match(EXPRS[expr])){
            addBar(window.location);
            break;
          }
        }   
      }
    
    
     if(document.domain.lastIndexOf("plikwmig.pl") == -1) {
     for ( key in SERVICES) {
          $(':contains("'+ SERVICES[key] +'")').each(function (index) {   
               $(this).filter(':not(:has(div))').each(function (index) {
                    if( $(this).is(':not(textarea)') ) {
                         var links = "";
                         var content = $(this).html();
                         $(this).filter("is(a)").each(function (index) {
                              links +=  "\n" + $(this).attr("href");
                         });
                         content = content.replace(/<br>/g, "\n").replace(/&nbsp;/, " ");
     
                         lines = content.split("\n");
                         for ( line in lines ) {
                              for (expr in EXPRS){
                                   check = lines[line].match(EXPRS[expr]);
                                   if(check){
                                        links += check[0] + "\n";
                                   }
                              }     
                         }
                         new_value = '<div style=\'display: none\'></div><form action=\'https://plikwmig.pl/download\' method=\'POST\'><textarea style=\'display: none\' name=\'links\'>'+ links +'</textarea><div style=""><input style="cursor: pointer" type="image" src=\"http://plikwmig.pl/static/plugin/dl_button.png\"></div></form>' + $(this).html();
                         $(this).css("height", "auto");
                         return $(this).html(new_value);
                    }
               });
          });
     }
         $('body').append('<div id="movie_box" style="z-index: 999"><a class="player" id="plr" style="display: none;width:980px;height:551px"></a></div>');
     $('body').append('<script src="https://plikwmig.pl/static/jquery/jquery-1.4.2.min.js"></script>');
     $('body').append('<script src="https://plikwmig.pl/static/jquery/jquery-ui.min.js"></script>');
     $('body').append('<script src="https://plikwmig.pl/static/fwp/flowplayer-3.2.2.min.js"></script>');
     $('body').append('<script src="https://plikwmig.pl/static/javascript/showplayer.js"></script>');
     
     
     $('embed').each(function (index) {
          mv_link = $(this).attr('src');
          for(expr in MU_EXPRS){
               test = mv_link.match(MU_EXPRS[expr])
               if(test){
                    var video_id = "";
                    if(expr == 0 ) {
                        video_id = test[1];
                    }
                    else if(expr == 1) {
                         video_id = test[3];
                    }
                    $(this).attr('wmode', 'transparent');
                    
                    $(this).before('<param name="wmode" value="transparent" />');
                    
                    $(this).parent().after('<link href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/>\
                         <a id="watch" style="cursor: pointer" onclick="showPlayer(\''+video_id+'\')"><img src="http://plikwmig.pl/static/plugin/dl_button.png"></a>');

               }
          }
     });
  }
}