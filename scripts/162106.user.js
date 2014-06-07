// ==UserScript==
// @name       Imgur Whore
// @namespace  http://blindbartemais.deviantart.com/
// @version    0.1
// @description  useful for whores of imgur.
// @match      http://imgur.com/gallery/*
// @match      http://imgur.com/user/*
// @copyright  2013+, Sean Loper
// ==/UserScript==

var main = function () {
    
    // use $ or jQuery here, however the page is using it
    $(document).ready(function() {
        // put all your jQuery goodness in here.
        $('ul.user-nav').append('<li><a class="downall" href="#">Downvote All</a></li>');
        $('ul.user-nav').append('<li><a class="upall" href="#">Upvote All</a></li>');
        $("a.downall").click(function() {
            $.each($('.down'), function(){ $(this).click() });
        });
        $("a.upall").click(function() {
            $.each($('.up'), function(){ $(this).click() });
        });
        //$('div.textbox.image-arrows.nospace').append('<span original-title="Dislike" id="mainDownArrow" class="arrow down  title" type="image">YELLOW</span>');
    });
    
};

// Inject our main script
var script = document.createElement('script');
script.type = "text/javascript";
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);