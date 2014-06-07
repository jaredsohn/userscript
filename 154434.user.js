// ==UserScript==
// @name        Dailyrush Enchancement
// @namespace   Gregers Boye-Jacobsen
// @copyright      © 2011 Gregers Boye-Jacobsen
// @description Tilføjer mulighed for at gemme noter om brugerne, og giver en popup-login box.
// @include     http://www.dailyrush.dk/*
// @grant unsafeWindow
// @version     3.0.2a
// ==/UserScript==
var $ = unsafeWindow.jQuery;
$('document').ready(function(){
    $('.userinfo').each(function(){
    
        var user = $(this).children('a').text();
        var note = unsafeWindow.localStorage.getItem(user);
        $(this).children('small').children('br:first-child').before('<div class="noteBox"></div>').remove();
        if(note)
          $(this).children('small').children('.noteBox').text(note);
    
        $(this).children('small').append('<a href="#" class="add_user_note">Note</a>');
    });
    
    $('.add_user_note').on('click', function(e){
        e.preventDefault();
        $(this).after('<div class="noteForm"><input type="text" style="width: 90%;" /><br /><input value="Gem" type="button" class="infoBtn"/></div>');
    });

    $('.userinfo').on('click', '.infoBtn', function(e){
    
        var parent = $(this).closest('.userinfo').children('a').text();
        var info = $(this).siblings('input[type="text"]').val();
        $(this).closest('small').children('.noteBox').text(info);
     
        if(info == "")
            unsafeWindow.localStorage.removeItem(parent);
        else
            unsafeWindow.localStorage.setItem(parent, info);

        $(this).parent('.noteForm').hide();
    });
    
    $('body').append('<div id="overlay"></div>');
 
        
    var overlayStyle = {
            "display": "none",
        "width": "100%",
        "top": 0,
        "height": "100%",
        "position": "fixed",
        "background-color": "rgba(170,170,170, 0.5)",
        "z-index": "1000" 
    }
        
    $('#overlay').css(overlayStyle);
  
});