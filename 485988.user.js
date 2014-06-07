// ==UserScript==
// @name        Animelyrics show translation
// @namespace   http://userscripts.org/users/669860
// @include     http://www.animelyrics.com/*.jis
// @version     1
// @grant       none
// ==/UserScript==



var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js", function() {
    var loc = $(location).attr('href');
    var loc2 = loc.split('.');
    loc2[loc2.length - 1] = "htm";
    var loc3 = loc2.join('.');
    
    $.get(loc3, [], function(res){
       var elem = $(res).find("tbody tbody");
       elem.css("float", "left");
       elem.css("display", "inline-block");
       elem.find("tr").first().remove();
       var kanji = $("#kanji");
       kanji.css("float", "left");
       kanji.css("display", "inline-block");
       kanji.after(elem);
    });
    //alert($(location).attr('pathname'));
});

