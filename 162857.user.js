// ==UserScript==
// @name        WP
// @namespace   http://userscripts.org/users/hsnappr
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @include     *.wikipedia.org/wiki/*
// @version     1
// ==/UserScript==

//$("#content").load('http://en.wikipedia.org/wiki/Gmail #content')
$('a').click(function(){

    var link = this.href
    $(this).removeAttr('href')
    //$(this).stop()
    var k = $(this)

    //alert(link)
    d=document.createElement('div');
    $(d).attr("id", link)
    
        .insertAfter(k) //insert after the link
        .height(300)
        .css("overflow", "scroll")
        .html("Loading...")
        .load(link +' #content', function(){$(this).prepend($(b))})
        .hide()
        .slideToggle(1000)    //$(this).remove();
        /*.queue(function(){
          k.unbind('click')  
        })*/
        //.append($(b))
        //})
        //.hide()
        //.slideToggle(300)
         
        //.
        //.delay(2500)
        //.slideToggle(300)
        //.queue(function() {
    //      $(this).remove();
     //  });
    
    b = document.createElement('button');
    $(b).text("Close")
        .css('postion', "fixed")
        .css('top', 0)
        .css('left', 0)
        .click(function(){$(d).slideToggle(1000)
                              //.hide()  
                              .queue(function(){  
                                    k.attr('href', link)
                                    $(this).remove()
                                })
                })
        //.appendTo($(d))
}) //end of click function


