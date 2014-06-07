// ==UserScript==
// @name           CardKingdom Image Hovers
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @namespace      test
// @description    Creates Image Popups
// @include        http://cardkingdom.com/*
// @include        https://cardkingdom.com/*
// @include        http://*.cardkingdom.com/*
// @include        https://*.cardkingdom.com/*
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
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
        var x,y;
        $('body').append("<div id='floatimage'></div>");
        $('#floatimage').css({'top': 200+"px",'left':200+"px",'position':'absolute'});
        $('html').mousemove(function(e){
        x = e.pageX;
        y = e.pageY;
        $('#floatimage').css({'top': y+2+"px",'left':x+2+"px"});
        });
    $('.grid a').hover(function(e){ 
        var img_name = $(this).html().split('<')[0];
        console.log(img_name);
                img_name = img_name.replace(/ /g,'_');
                img_name = img_name.replace(/'/g,'');
                img_name = img_name.replace(/,/g,'');
        var img_url = 'http://www.wizards.com/global/images/magic/general/' + img_name + '.jpg'; 
                var img = 'http://www.wizards.com/global/images/magic/general/' + img_name + '.jpg';
                $('#floatimage').append("<img src='"+img_url+"' onerror='this.style.display=\"none\"' />");
                console.log(img_url);
                $('#floatimage').css({'top': y+2+"px",'left':x+2+"px"});
    },
        function(){
        $('#floatimage').empty();
        }); 
}

// load jQuery and execute the main function
addJQuery(main);
