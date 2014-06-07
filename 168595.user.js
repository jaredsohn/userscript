	

    // ==UserScript==
    // @name  TPK - Mining
    // @namespace     http://wut.wut
    // @description   Durdurrr 2
    // @include   http://*tpkrpg.net*/mine.php*
    // @include   https://*tpkrpg.net*/mine.php*
    // @author        Queen
    // ==/UserScript==
     
    function addJQuery(callback) {
      var script = document.createElement("script");
      script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
      script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
        document.body.appendChild(script);
      }, false);
      document.body.appendChild(script);
    }
     
    // the guts of this userscript
    function main() {
     
      jQ(document).ready(function() {
     
            var x = Math.round((Math.random() * 99) + 500);
            var y = Math.round((Math.random() * 70) + 340);
     
            eval("var myfunc = mine");
        myfunc(x, y);
     
            jQ("#mineContent").bind('DOMSubtreeModified', function() {
     
                    if (jQ('div[id$="timer"]').text() == 'You can mine now.') {
     
                            newId = $("#post_code").attr("value");
     
                            var x = Math.round((Math.random() * 99) + 900);
                            var y = Math.round((Math.random() * 70) + 240);
     
                jQ("#post_code").fadeOut('50').delay('100').fadeIn('50', function() {
     
                    eval("var myfunc = mine" + newId);
                    myfunc(x, y);
                })
                    }
     
         
            })
      })
    }
     
    // load jQuery and execute the main function
    addJQuery(main);

