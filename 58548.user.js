// ==UserScript==
// @name           Facebook - MythMonger Reload
// @namespace      http://userscripts.org/users/103527
// @include        http://apps.facebook.com/mythmonger/*
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @require        http://plugins.jquery.com/files/jquery.timers-1.1.3.js.txt
// ==/UserScript==

$(document).ready(function() {
    
    if ($("title").text() != "MythMonger on Facebook | Puzzle"){
        $(document).oneTime(15*60*1000, function() {
                location.href="http://apps.facebook.com/mythmonger/";
        });
    }
    
    if ($(".canvas_error_page").html() != null ) {
        $(document).oneTime(30000, function() {
            location.href="http://apps.facebook.com/mythmonger/";
        });
    }
    
   $(".playbutton").everyTime(15000,function() {
        if ($(this).css('display') != "none"){
            //alert($("title").text());
            if ($("title").text() != "MythMonger on Facebook | Puzzle"){

                function makeClick(){
                    //alert("runnings")
                    function fireEvent(obj,evt){
                      var fireOnThis = obj;
                       if( document.createEvent ) {
                             var evObj = document.createEvent('MouseEvents');
                             evObj.initEvent( evt, true, false );
                             fireOnThis.dispatchEvent(evObj);
                       } else if( document.createEventObject ) {
                             fireOnThis.fireEvent('on'+evt);
                       }
                    }
                    /*
                    
                    x = f.onclick.toString().replace("function onclick(event) {","").replace('(new Image).src = "',"").replace(" return true;\n}","");
                    alert(x);*/
                    //x = x +" onclick();"
                    //eval(x)
                    f = document.getElementById("app79378246206_playbutton");
                    /*fireEvent(f,'click');*/
                    location.href=f.href
                }
                
                var script = document.createElement("script");
                script.type = "application/javascript";
                script.innerHTML = "(" + makeClick + ")();";
                
                document.body.appendChild(script);
            }
        }
    });
});


