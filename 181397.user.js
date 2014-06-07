// ==UserScript==
// @name       F&RT
// @namespace  http://fandrt.com
// @version    0.2
// @description  Allows you to Favorite & Retweet in one go. 
// @include     https://twitter.com/*
// @include     http://twitter.com/*
// @copyright  Stuart Frisby
// ==/UserScript==

GM_addStyle(".promoted-tweet { display: none;}");
GM_addStyle(".promoted-account { display: none;}");

var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js", function() {
    function fart(e) {
    e.preventDefault();
    $(this).parent().siblings('li.action-fav-container').children('a:first').click();
    $(this).parent().siblings('li.action-rt-container').children('a:first').click();
}


$(document).on('mouseover', 'li.expanding-stream-item div.content', function() {
    if($(this).find('ul.tweet-actions').children('li.action-fart-container').length === 0) {
        var li = $('<li class="action-fart-container"></li>');
        var a = $('<a style="font-family: Baskerville; font-style: italic;" href="#">&amp;</a>');
        a.on('click', fart);
        li.append(a);
        $(this).find('ul.tweet-actions').children('li.action-rt-container').after(li);
    }
 });
});


function addStyle(css)
{
    var newstyle = document.createElement("style");
    newstyle.setAttribute("type", "text/css");
    newstyle.appendChild(document.createTextNode(css));
    document.getElementsByTagName("head")[0].appendChild(newstyle);
}

var css = "*[class^=promoted] {display: none !important}";

(function applyCSS(){var h=document.getElementsByTagName("head");if(h&&h[0]){addStyle(css);}else{setTimeout(applyCSS,100)}})();

