// ==UserScript==
// @name        mv-shortcuts
// @namespace   santialbo/mv
// @include     http://www.mediavida.com/*
// @require     http://cdn.craig.is/js/mousetrap/mousetrap.min.js
// @version     1.2
// ==/UserScript==

var url = "http://www.mediavida.com/";
var urlforo = "http://www.mediavida.com/foro/";
var userid = document.getElementsByClassName("lu")[0].innerHTML;

Mousetrap.bind('p', function() { window.location.href = url + "id/" + userid; });
Mousetrap.bind('a', function() { window.location.href = url + "notificaciones"; });
Mousetrap.bind('f', function() { window.location.href = url + "foro/favoritos"; });
Mousetrap.bind('m', function() { window.location.href = url + "mensajes"; });
Mousetrap.bind('s', function() { window.location.href = url + "foro/spy"; });
Mousetrap.bind('/', function() { document.getElementById("sbii").focus(); });

// foros
Mousetrap.bind('g a', function() { window.location.href = urlforo + "anime-manga"; });
Mousetrap.bind('g c', function() { window.location.href = urlforo + "cine"; });
Mousetrap.bind('g d', function() { window.location.href = urlforo + "deportes"});
Mousetrap.bind('g e', function() { window.location.href = urlforo + "electronica-gadgets"; });
Mousetrap.bind('g f', function() { window.location.href = urlforo + "feda"; });
Mousetrap.bind('g g', function() { window.location.href = urlforo + "moviles-tablets"; });
Mousetrap.bind('g h', function() { window.location.href = urlforo + "hard-soft"; });
Mousetrap.bind('g j', function() { window.location.href = urlforo + "juegos"; });
Mousetrap.bind('g l', function() { window.location.href = urlforo + "libros"; });
Mousetrap.bind('g m', function() { window.location.href = urlforo + "motor"; });
Mousetrap.bind('g o', function() { window.location.href = urlforo + "off-topic"; });
Mousetrap.bind('g t', function() { window.location.href = urlforo + "tv"; });
Mousetrap.bind('g v', function() { window.location.href = urlforo + "videos"; });
Mousetrap.bind('g w', function() { window.location.href = urlforo + "dev"; });
Mousetrap.bind('g z', function() { window.location.href = urlforo + "mediavida"; });

Mousetrap.bind('x x x', function() { // Display all spoilers
    Array.forEach(document.getElementsByClassName("spoiler"), function(spoiler) {
        spoiler.setAttribute("class", "spoiler more less");
        var hiddendiv = document.getElementById(spoiler.getAttribute("rel"));
        hiddendiv.setAttribute("style", "");
        Array.forEach(hiddendiv.getElementsByTagName("img"), function(img) {
            unsafeWindow.imgLimit(img);
        });
    });
});

//Thread shortcuts
var re = /http:\/\/www.mediavida.com\/foro\/[^\/]+\/.+-(\d+)(?:\/(\d+))?(?:#.*)?/
var res = re.exec(document.URL);
if (res){
    Mousetrap.bind('r', function() { window.location.href = urlforo + "post.php?tid=" + res[1]; });
}
